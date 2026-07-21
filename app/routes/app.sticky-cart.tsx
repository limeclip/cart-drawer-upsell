import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import {
  Banner,
  BlockStack,
  Box,
  Button,
  Card,
  InlineStack,
  Layout,
  Modal,
  Page,
  Select,
  Spinner,
  Text,
  TextField,
  RangeSlider,
} from "@shopify/polaris";

import prisma from "../db.server";
import { checkOrderLimit } from "../lib/checkOrderLimit";
import {
  createDefaultStickyCart,
  getBorderRadius,
  getStickyCartIconComponent,
  isStickyCartDefault,
  parseStickyCart,
  STICKY_CART_ICON_OPTIONS,
  type StickyCartCountShape,
  type StickyCartPosition,
  type StickyCartSettings,
} from "../lib/stickyCart";
import { authenticate } from "../shopify.server";
import settingsStyles from "../styles/settings-page.module.css";
import styles from "../styles/sticky-cart-page.module.css";

type LoaderData = {
  modules: Record<string, unknown>;
  moduleOrder: unknown;
  isAllowed: boolean;
  reason: "trial_ended" | "limit_exceeded" | null;
};

const PREVIEW_ITEM_COUNT = 3;

function parseJsonRecord(raw: unknown): Record<string, unknown> {
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw) as unknown;
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed as Record<string, unknown>;
      }
    } catch {
      return {};
    }
  }

  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    return raw as Record<string, unknown>;
  }

  return {};
}

function getPositionStyle(position: StickyCartPosition): React.CSSProperties {
  switch (position) {
    case "bottom-left":
      return { bottom: 20, left: 20 };
    case "top-right":
      return { top: 20, right: 20 };
    case "top-left":
      return { top: 20, left: 20 };
    case "bottom-right":
    default:
      return { bottom: 20, right: 20 };
  }
}

function ModuleToggle({
  checked,
  onChange,
  label,
  disabled = false,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      aria-disabled={disabled}
      disabled={disabled}
      className={`${settingsStyles.moduleToggle} ${checked ? settingsStyles.moduleToggleOn : ""} ${disabled ? settingsStyles.moduleToggleDisabled : ""}`}
      onClick={() => {
        if (disabled) {
          return;
        }
        onChange(!checked);
      }}
    >
      <span className={settingsStyles.moduleToggleKnob} />
    </button>
  );
}

function ColorField({
  label,
  value,
  onChange,
  disabled = false,
  helpText,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  helpText?: string;
}) {
  return (
    <InlineStack gap="400" blockAlign="end" wrap={false}>
      <Box minWidth="0" width="100%">
        <TextField
          label={label}
          value={value}
          onChange={onChange}
          autoComplete="off"
          disabled={disabled}
          helpText={helpText}
          connectedRight={
            <input
              type="color"
              className={`${settingsStyles.colorSwatch} ${disabled ? settingsStyles.colorSwatchDisabled : ""}`}
              value={value}
              onChange={(event) => onChange(event.target.value)}
              aria-label={label}
              disabled={disabled}
            />
          }
        />
      </Box>
    </InlineStack>
  );
}



function StickyCartPreview({ settings }: { settings: StickyCartSettings }) {
  const Icon = getStickyCartIconComponent(settings.icon);
  const positionStyle = getPositionStyle(settings.positionDesktop);
  const borderRadius = getBorderRadius(settings.shapeSize, settings.roundness);
  const previewItemCount = settings.hideWhenEmpty ? 0 : PREVIEW_ITEM_COUNT;
  const showCount =
    settings.showItemCount && settings.enabled && previewItemCount > 0;
  const isHidden = !settings.enabled || previewItemCount === 0;
  const { t } = useTranslation();

  if (isHidden) {
    return (
      <div className={styles.previewFrame}>
        <span className={styles.previewPageHint}>{t("sticky_cart_storefront_preview")}</span>
      </div>
    );
  }

  return (
    <div className={styles.previewFrame}>
      <span className={styles.previewPageHint}>{t("sticky_cart_storefront_preview")}</span>
      <div
        className={styles.stickyButton}
        style={{
          ...positionStyle,
          width: settings.shapeSize,
          height: settings.shapeSize,
          backgroundColor: settings.shapeColor,
          borderRadius,
        }}
      >
        <Icon size={settings.iconSize} color={settings.iconColor} strokeWidth={2} />
        {showCount ? (
          <span
            className={`${styles.stickyCount} ${settings.countShape === "circle"
              ? styles.stickyCountCircle
              : styles.stickyCountRectangle
              } ${styles.stickyCountTopRight}`}
            style={{
              color: settings.countColor,
              backgroundColor: settings.countBackground,
            }}
          >
            {previewItemCount}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function SettingToggleRow({
  label,
  checked,
  onChange,
  disabled = false,
  showUpgradeHint = false,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  showUpgradeHint?: boolean;

}) {
  const { t } = useTranslation();
  return (
    <div className={styles.settingRow}>
      <span className={styles.settingRowLabel}>{label}</span>
      <InlineStack gap="200" blockAlign="center">
        <ModuleToggle
          checked={checked}
          onChange={onChange}
          label={label}
          disabled={disabled}
        />
        {showUpgradeHint && (
          <Text as="span" tone="subdued">
            <span className={settingsStyles.lockedBadge}>🔒 {t('upgrade')}</span>
          </Text>
        )}
      </InlineStack>
    </div>
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);

  const settings = await prisma.cartSettings.findUnique({
    where: { shop: session.shop },
  });

  const { isAllowed, reason } = await checkOrderLimit(session.shop);

  return {
    modules: parseJsonRecord(settings?.modules),
    moduleOrder: settings?.moduleOrder ?? null,
    isAllowed,
    reason,
  } satisfies LoaderData;
};

export default function StickyCartPage() {
  const { t } = useTranslation();
  const { isAllowed, reason, ...loaderData } = useLoaderData<typeof loader>();

  const fieldsLocked = !isAllowed;
  const lockedHelpText = fieldsLocked ? `🔒 ${t('available_in_paid')}` : undefined;

  const [allModules, setAllModules] = useState<Record<string, unknown>>({});
  const [moduleOrder, setModuleOrder] = useState<unknown>(null);
  const [stickyCart, setStickyCart] = useState<StickyCartSettings>(
    createDefaultStickyCart(),
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);
  const [showResetSuccess, setShowResetSuccess] = useState(false);

  const previewSettings = stickyCart;
  const isDefaultSettings = useMemo(
    () => isStickyCartDefault(stickyCart),
    [stickyCart],
  );

  useEffect(() => {
    let cancelled = false;

    async function loadSettings() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/settings");
        if (!response.ok) {
          const payload = (await response.json()) as { error?: string };
          throw new Error(payload.error || t("load_error"));
        }

        const settingsData = (await response.json()) as Record<string, unknown>;
        if (cancelled) {
          return;
        }

        const modules = parseJsonRecord(settingsData.modules);
        setAllModules(modules);
        setModuleOrder(settingsData.moduleOrder ?? loaderData.moduleOrder);
        setStickyCart(parseStickyCart(modules.sticky_cart));
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error ? loadError.message : t("load_error"),
          );
          const modules = loaderData.modules;
          setAllModules(modules);
          setModuleOrder(loaderData.moduleOrder);
          setStickyCart(parseStickyCart(modules.sticky_cart));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadSettings();

    return () => {
      cancelled = true;
    };
  }, [loaderData.moduleOrder, loaderData.modules, t]);

  const updateStickyCart = useCallback(
    (patch: Partial<StickyCartSettings>) => {
      setStickyCart((prev) => ({ ...prev, ...patch }));
    },
    [],
  );

  const countShapeOptions = useMemo(
    () => [
      { label: "Circle", value: "circle" },
      { label: "Rectangle", value: "rectangle" },
    ],
    [],
  );

  const positionOptions = useMemo(
    () => [
      { label: "Bottom Right", value: "bottom-right" },
      { label: "Bottom Left", value: "bottom-left" },
      { label: "Top Right", value: "top-right" },
      { label: "Top Left", value: "top-left" },
    ],
    [],
  );

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    setShowSuccess(false);

    try {
      const mergedModules = {
        ...allModules,
        sticky_cart: stickyCart,
      };

      const response = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          modules: mergedModules,
          ...(moduleOrder !== null && moduleOrder !== undefined
            ? { moduleOrder }
            : {}),
        }),
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error || t("save_error"));
      }

      const savedSettings = (await response.json()) as Record<string, unknown>;
      const savedModules = parseJsonRecord(savedSettings.modules);
      setAllModules(savedModules);
      setModuleOrder(savedSettings.moduleOrder ?? moduleOrder);
      setStickyCart(parseStickyCart(savedModules.sticky_cart));
      setShowSuccess(true);
    } catch (saveErr) {
      setSaveError(
        saveErr instanceof Error ? saveErr.message : t("save_error"),
      );
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    setResetting(true);
    setResetError(null);
    setShowResetSuccess(false);

    try {
      const response = await fetch("/api/sticky-cart/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reset: true }),
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error || t("reset_error"));
      }

      const savedSettings = (await response.json()) as Record<string, unknown>;
      const savedModules = parseJsonRecord(savedSettings.modules);
      setAllModules(savedModules);
      setModuleOrder(savedSettings.moduleOrder ?? moduleOrder);
      setStickyCart(parseStickyCart(savedModules.sticky_cart));
      setResetModalOpen(false);
      setShowResetSuccess(true);
    } catch (resetErr) {
      setResetError(
        resetErr instanceof Error ? resetErr.message : t("reset_error"),
      );
    } finally {
      setResetting(false);
    }
  };

  const renderSettingsCard = (title: string, children: ReactNode) => (
    <Card>
      <BlockStack gap="400">
        <Text as="h2" variant="headingMd">
          {title}
        </Text>
        {children}
      </BlockStack>
    </Card>
  );

  if (loading) {
    return (
      <Page title={t("sticky_cart")}>
        <Box padding="800">
          <InlineStack align="center">
            <Spinner accessibilityLabel={t("loading")} size="large" />
          </InlineStack>
        </Box>
      </Page>
    );
  }

  return (
    <Page
      title={t("sticky_cart")}
      primaryAction={{
        content: t("save"),
        onAction: handleSave,
        loading: saving,
      }}
      secondaryActions={
        !isDefaultSettings
          ? [
              {
                content: t("reset_to_default"),
                onAction: () => {
                  setResetError(null);
                  setResetModalOpen(true);
                },
                disabled: saving || resetting,
              },
            ]
          : undefined
      }
    >
      <Modal
        open={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        title={t("reset_confirm_title")}
        primaryAction={{
          content: t("reset_to_default"),
          onAction: handleReset,
          loading: resetting,
          destructive: true,
        }}
        secondaryActions={[
          {
            content: t("cancel"),
            onAction: () => setResetModalOpen(false),
          },
        ]}
      >
        <Modal.Section>
          <Text as="p">{t("reset_confirm_message")}</Text>
        </Modal.Section>
      </Modal>
      <div style={{ paddingBottom: "26px" }}>
        <BlockStack gap="400">
          {error ? (
            <Banner tone="warning" onDismiss={() => setError(null)}>
              {error}
            </Banner>
          ) : null}

          {saveError ? (
            <Banner tone="critical" onDismiss={() => setSaveError(null)}>
              {saveError}
            </Banner>
          ) : null}

          {showSuccess ? (
            <Banner tone="success" onDismiss={() => setShowSuccess(false)}>
              {t("save_success")}
            </Banner>
          ) : null}

          {resetError ? (
            <Banner tone="critical" onDismiss={() => setResetError(null)}>
              {resetError}
            </Banner>
          ) : null}

          {showResetSuccess ? (
            <Banner tone="success" onDismiss={() => setShowResetSuccess(false)}>
              {t("reset_success")}
            </Banner>
          ) : null}

          {!isAllowed && (
            <Banner
              tone="warning"
              title={
                reason === "trial_ended"
                  ? t("trial_ended")
                  : t("limit_exceeded")
              }
            >
              <BlockStack gap="300">
                <Text as="p">
                  {reason === "trial_ended"
                    ? t("trial_ended_message")
                    : t("limit_exceeded_message")}
                </Text>
                <InlineStack gap="300">
                  <a href="/app/plans" target="_top" style={{ textDecoration: 'none' }}>
                    <Button>{t("upgrade_plan")}</Button>
                  </a>
                </InlineStack>
              </BlockStack>
            </Banner>
          )}

          <Layout>
            <Layout.Section>
              <BlockStack gap="400">
                <Card>
                  <SettingToggleRow
                    label={t("sticky_cart_enable")}
                    checked={stickyCart.enabled}
                    onChange={(checked) => updateStickyCart({ enabled: checked })}
                  />
                </Card>

                {renderSettingsCard(
                  t("select_icon"),
                  <div
                    className={`${styles.iconGrid} ${fieldsLocked ? styles.iconGridDisabled : ""}`}
                  >
                    {STICKY_CART_ICON_OPTIONS.map(({ key, Icon }) => {
                      const selected = stickyCart.icon === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          className={`${styles.iconOption} ${selected ? styles.iconOptionSelected : ""
                            }`}
                          aria-label={key}
                          aria-pressed={selected}
                          disabled={fieldsLocked}
                          onClick={() => updateStickyCart({ icon: key })}
                        >
                          <Icon size={22} strokeWidth={2} />
                        </button>
                      );
                    })}
                  </div>,
                )}

                {renderSettingsCard(
                  t("sticky_cart_shape_and_size"),
                  <BlockStack gap="400">
                    <RangeSlider
                      label={t("sticky_cart_shape_size")}
                      value={stickyCart.shapeSize}
                      onChange={(value) => {
                        const numValue = typeof value === 'number' ? value : (Array.isArray(value) ? value[0] : 40);
                        updateStickyCart({ shapeSize: numValue });
                      }}
                      min={40}
                      max={96}
                      step={2}
                      output
                      disabled={fieldsLocked}
                      helpText={lockedHelpText}
                    />
                    <RangeSlider
                      label={t("sticky_cart_icon_size")}
                      value={stickyCart.iconSize}
                      onChange={(value) => {
                        const numValue = typeof value === 'number' ? value : (Array.isArray(value) ? value[0] : 12);
                        updateStickyCart({ iconSize: numValue });
                      }}
                      min={12}
                      max={40}
                      step={1}
                      output
                      disabled={fieldsLocked}
                      helpText={lockedHelpText}
                    />
                    <RangeSlider
                      label={t("sticky_cart_roundness")}
                      value={stickyCart.roundness}
                      onChange={(value) => {
                        const numValue = typeof value === 'number' ? value : (Array.isArray(value) ? value[0] : 0);
                        updateStickyCart({ roundness: numValue });
                      }}
                      min={0}
                      max={50}
                      step={1}
                      output
                      disabled={fieldsLocked}
                      helpText={lockedHelpText}
                    />
                  </BlockStack>
                )}

                {renderSettingsCard(
                  t("sticky_cart_colors"),
                  <BlockStack gap="400">
                    <ColorField
                      label={t("sticky_cart_shape_color")}
                      value={stickyCart.shapeColor}
                      onChange={(value) => updateStickyCart({ shapeColor: value })}
                      disabled={fieldsLocked}
                      helpText={lockedHelpText}
                    />
                    <ColorField
                      label={t("sticky_cart_icon_color")}
                      value={stickyCart.iconColor}
                      onChange={(value) => updateStickyCart({ iconColor: value })}
                      disabled={fieldsLocked}
                      helpText={lockedHelpText}
                    />
                    <Select
                      label={t("sticky_cart_count_shape")}
                      options={countShapeOptions}
                      value={stickyCart.countShape}
                      onChange={(value) =>
                        updateStickyCart({
                          countShape: value as StickyCartCountShape,
                        })
                      }
                      disabled={fieldsLocked}
                      helpText={lockedHelpText}
                    />
                    <ColorField
                      label={t("sticky_cart_count_color")}
                      value={stickyCart.countColor}
                      onChange={(value) => updateStickyCart({ countColor: value })}
                      disabled={fieldsLocked}
                      helpText={lockedHelpText}
                    />
                    <ColorField
                      label={t("sticky_cart_count_background")}
                      value={stickyCart.countBackground}
                      onChange={(value) =>
                        updateStickyCart({ countBackground: value })
                      }
                      disabled={fieldsLocked}
                      helpText={lockedHelpText}
                    />
                  </BlockStack>,
                )}

                {renderSettingsCard(
                  t("sticky_cart_extra_settings"),
                  <BlockStack gap="300">
                    <SettingToggleRow
                      label={t("sticky_cart_show_item_count")}
                      checked={stickyCart.showItemCount}
                      onChange={(checked) =>
                        updateStickyCart({ showItemCount: checked })
                      }
                      disabled={fieldsLocked}
                      showUpgradeHint={fieldsLocked}
                    />
                    <SettingToggleRow
                      label={t("sticky_cart_hide_when_empty")}
                      checked={stickyCart.hideWhenEmpty}
                      onChange={(checked) =>
                        updateStickyCart({ hideWhenEmpty: checked })
                      }
                      disabled={fieldsLocked}
                      showUpgradeHint={fieldsLocked}
                    />
                    <SettingToggleRow
                      label={t("sticky_cart_display_on_mobile")}
                      checked={stickyCart.displayOnMobile}
                      onChange={(checked) =>
                        updateStickyCart({ displayOnMobile: checked })
                      }
                      disabled={fieldsLocked}
                      showUpgradeHint={fieldsLocked}
                    />
                  </BlockStack>,
                )}

                {renderSettingsCard(
                  t("sticky_cart_position"),
                  <InlineStack gap="400" wrap={false} blockAlign="end">
                    <Box width="100%">
                      <Select
                        label={t("sticky_cart_position_desktop")}
                        options={positionOptions}
                        value={stickyCart.positionDesktop}
                        onChange={(value) =>
                          updateStickyCart({
                            positionDesktop: value as StickyCartPosition,
                          })
                        }
                        disabled={fieldsLocked}
                        helpText={lockedHelpText}
                      />
                    </Box>
                    <Box width="100%">
                      <Select
                        label={t("sticky_cart_position_mobile")}
                        options={positionOptions}
                        value={stickyCart.positionMobile}
                        onChange={(value) =>
                          updateStickyCart({
                            positionMobile: value as StickyCartPosition,
                          })
                        }
                        disabled={fieldsLocked}
                        helpText={lockedHelpText}
                      />
                    </Box>
                  </InlineStack>
                )}
              </BlockStack>
            </Layout.Section>

            <Layout.Section variant="oneThird">
              <div className={styles.previewCard}>
                <Card>
                  <BlockStack gap="400">
                    <Text as="h2" variant="headingMd">
                      {t("preview")}
                    </Text>
                    <StickyCartPreview settings={previewSettings} />
                  </BlockStack>
                </Card>
              </div>
            </Layout.Section>
          </Layout>
        </BlockStack>
      </div>
    </Page>
  );
}
