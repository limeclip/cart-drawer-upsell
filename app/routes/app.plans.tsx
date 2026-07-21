import { useCallback, useEffect, useState } from "react";
import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData, useRevalidator, useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import {
  Banner,
  BlockStack,
  Box,
  Button,
  Card,
  Collapsible,
  InlineStack,
  Layout,
  Page,
  ProgressBar,
  Text,
} from "@shopify/polaris";
import { ChevronDown } from "lucide-react";

import { checkOrderLimit } from "../lib/checkOrderLimit";
import { PLANS, normalizePlanId, type Plan } from "../lib/plans";
import {
  getShopSubscription,
  syncShopSubscription,
  type ShopSubscriptionData,
} from "../lib/subscription.server";
import {
  formatTrialDate,
  isTrialActive,
} from "../lib/subscription.utils";
import { authenticate } from "../shopify.server";
import styles from "../styles/plans-page.module.css";

type LoaderData = {
  subscription: ShopSubscriptionData;
  plans: Plan[];
  isAllowed: boolean;
  reason: "trial_ended" | "limit_exceeded" | null;
};

const FAQ_ITEMS = [
  { questionKey: "faq_q1", answerKey: "faq_a1" },
  { questionKey: "faq_q2", answerKey: "faq_a2" },
  { questionKey: "faq_q3", answerKey: "faq_a3" },
] as const;

function getPlanFeatures(
  plan: Plan,
  t: (key: string, options?: Record<string, unknown>) => string,
): string[] {
  return [
    t("plan_feature_orders", { count: plan.ordersLimit }),
    t("plan_feature_trust_badges"),
    t("plan_feature_urgency_timer"),
    t("plan_feature_free_shipping"),
    t("plan_feature_upsell_slider"),
    t("plan_feature_upsell_toggle"),
    t("plan_feature_payment_icons"),
    t("plan_feature_easy_setup"),
    t("plan_feature_customization"),
  ];
}

function FaqItem({
  question,
  answer,
  expanded,
  onToggle,
}: {
  question: string;
  answer: string;
  expanded: boolean;
  onToggle: () => void;
}) {
  const id = question.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className={styles.faqItem}>
      <button
        type="button"
        className={styles.faqTrigger}
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={`faq-${id}`}
      >
        <span className={styles.faqTriggerText}>{question}</span>
        <ChevronDown
          size={18}
          className={`${styles.faqChevron} ${expanded ? styles.faqChevronExpanded : ""}`}
          aria-hidden="true"
        />
      </button>
      <Collapsible
        open={expanded}
        id={`faq-${id}`}
        transition={{ duration: "200ms", timingFunction: "ease-in-out" }}
      >
        <div className={styles.faqContent}>
          <p className={styles.faqAnswer}>{answer}</p>
        </div>
      </Collapsible>
    </div>
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);

  await syncShopSubscription(
    request,
    session.shop,
  );

  const subscription = await getShopSubscription(session.shop);
  const { isAllowed, reason } = await checkOrderLimit(session.shop);

  return {
    subscription,
    plans: PLANS,
    isAllowed,
    reason,
  } satisfies LoaderData;
};

export default function PlansPage() {
  const { t, i18n } = useTranslation();
  const { subscription, plans, isAllowed, reason } = useLoaderData<LoaderData>();
  const revalidator = useRevalidator();
  const [searchParams, setSearchParams] = useSearchParams();
  const [upgradingPlanId, setUpgradingPlanId] = useState<string | null>(null);
  const [upgradeError, setUpgradeError] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const currentPlanId = normalizePlanId(subscription.planName);
  const trialActive = isTrialActive(subscription.trialEndsAt);
  const trialDate = formatTrialDate(subscription.trialEndsAt, i18n.language);
  const showTrial = trialActive && trialDate;
  const daysLeft = subscription.trialEndsAt
    ? Math.ceil(
      (new Date(subscription.trialEndsAt).getTime() - Date.now()) /
      (1000 * 60 * 60 * 24),
    )
    : 0;

  useEffect(() => {
    if (searchParams.get("upgraded") !== "true") {
      return;
    }

    void revalidator.revalidate();

    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("upgraded");
    setSearchParams(nextParams, { replace: true });
  }, [revalidator, searchParams, setSearchParams]);

  const handleChoosePlan = useCallback(
    async (planId: string) => {
      setUpgradingPlanId(planId);
      setUpgradeError(null);

      try {
        const response = await fetch("/api/subscription/upgrade", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ planId }),
        });

        const payload = (await response.json()) as {
          confirmationUrl?: string;
          error?: string;
        };

        if (!response.ok || !payload.confirmationUrl) {
          throw new Error(payload.error || t("upgrade_error"));
        }

        window.open(payload.confirmationUrl, "_top");
      } catch (error) {
        setUpgradeError(
          error instanceof Error ? error.message : t("upgrade_error"),
        );
      } finally {
        setUpgradingPlanId(null);
      }
    },
    [t],
  );

  return (
    <Page title={t("plans")}>
      <div style={{ paddingBottom: "16px" }}>
        <BlockStack gap="500">
          {upgradeError && (
            <Banner tone="critical" onDismiss={() => setUpgradeError(null)}>
              {upgradeError}
            </Banner>
          )}

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
              {trialActive && (
                <Box paddingBlockEnd="400">
                  <Banner tone="info" title={t("trial_active")}>
                    {t("trial_active_message", { days: daysLeft })}
                  </Banner>
                </Box>
              )}
              <Card>
                <BlockStack gap="400">
                  <Text as="h2" variant="headingMd">
                    {t("current_plan")}
                  </Text>

                  <span className={styles.currentPlanBadge}>
                    {t(currentPlanId)}
                  </span>

                  {showTrial && (
                    <Text as="p" tone="subdued">
                      {t("trial_ends", { date: trialDate })}
                    </Text>
                  )}

                  <BlockStack gap="200">
                    <ProgressBar
                      progress={Math.min(subscription.usedPercent, 100)}
                      size="small"
                    />
                    <Text as="p" tone="subdued">
                      {t("orders_used", {
                        used: subscription.orderCount,
                        limit: subscription.orderLimit,
                      })}
                    </Text>
                  </BlockStack>
                </BlockStack>
              </Card>
            </Layout.Section>
          </Layout>

          <div className={styles.plansGrid}>
            {plans.map((plan) => {
              const isCurrentPlan = plan.id === currentPlanId;
              const shouldDisable =
                (trialActive ||
                  (subscription.isActive && subscription.trialEndsAt === null)) &&
                isCurrentPlan;
              const isUpgrading = upgradingPlanId === plan.id;
              const planFeatures = getPlanFeatures(plan, t);

              return (
                <Card key={plan.id}>
                  <div className={styles.planCard}>
                    <div className={styles.planCardBody}>
                      <BlockStack gap="200">
                        <Text as="h3" variant="headingMd">
                          {plan.name}
                        </Text>
                        <p className={styles.planPrice}>
                          ${plan.price.toFixed(2)}
                          <Text as="span" tone="subdued" variant="bodySm">
                            {" "}
                            / mo
                          </Text>
                        </p>
                      </BlockStack>

                      <ul className={styles.planFeatures}>
                        {planFeatures.map((feature) => (
                          <li key={feature} className={styles.planFeatureItem}>
                            <span
                              className={styles.planFeatureBullet}
                              aria-hidden="true"
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className={styles.planCardFooter}>
                        <Button
                          fullWidth
                          variant={shouldDisable ? "secondary" : "primary"}
                          disabled={shouldDisable}
                          loading={isUpgrading}
                          onClick={() => handleChoosePlan(plan.id)}
                        >
                          {shouldDisable ? t("current_plan") : t("choose_plan")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">
                {t("faq_title")}
              </Text>

              <BlockStack gap="0">
                {FAQ_ITEMS.map((item, index) => (
                  <FaqItem
                    key={item.questionKey}
                    question={t(item.questionKey)}
                    answer={t(item.answerKey)}
                    expanded={expandedFaq === index}
                    onToggle={() =>
                      setExpandedFaq((current) =>
                        current === index ? null : index,
                      )
                    }
                  />
                ))}
              </BlockStack>
              <button
                className={styles.faqContact}
                style={{
                  color: 'inherit',
                  textDecoration: 'underline',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  font: 'inherit',
                }}
                onClick={() => {
                  const target = window.top || window;
                  target.location.href = 'mailto:hello@rootly.cc';
                }}
              >
                {t("faq_contact")}
              </button>
            </BlockStack>
          </Card>
        </BlockStack>
      </div>
    </Page>
  );
}
