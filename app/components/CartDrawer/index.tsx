import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { ChevronLeft, ChevronRight, GiftIcon, Truck, X } from "lucide-react";

import {
  applyFirstDiscount,
  formatCountdown,
  formatMoney,
  getDiscountRules,
  getNextDiscountRule,
  getUpsellProductIds,
  normalizeUpsellModule,
  PAID_MODULE_IDS,
  type CartWidgetSettings,
  type DiscountRule,
  type ModuleId,
} from "../../lib/cartModules";
import { trackAnalyticsEvent } from "../../lib/analyticsEvents";
import { getStorefrontToken } from "../../lib/cartWidgetConfig";
import {
  addItem,
  applyDiscount,
  loadCart,
  removeItem,
  updateAttributes,
  updateItem,
  updateNote,
  type ThemeCart,
} from "../../lib/storefrontWidget";
import {
  normalizeShopDomain,
  STOREFRONT_API_VERSION,
} from "../../lib/storefront.shared";
import {
  setOurCartDrawerOpen,
  startThemeCartDialogInterception,
  startThemeCartDrawerSuppression,
} from "../../lib/themeCartDrawer";
import styles from "./CartDrawer.module.css";

export type { ThemeCart, ThemeCartItem } from "../../lib/storefrontWidget";

type UpsellProduct = {
  id: string;
  title: string;
  price: number;
  imageUrl: string | null;
  variantId: string;
  handle: string;
};

type CartDrawerProps = {
  shop: string;
  settings: CartWidgetSettings;
};

const UPSELL_PRODUCTS_QUERY = `#graphql
  query UpsellProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        id
        title
        handle
        featuredImage {
          url
        }
        variants(first: 1) {
          nodes {
            id
            price {
              amount
            }
          }
        }
      }
    }
  }
`;

function parseAmount(value: string | undefined): number {
  const parsed = Number.parseFloat(value ?? "0");
  return Number.isFinite(parsed) ? parsed : 0;
}

function toProductGid(id: string): string {
  if (id.startsWith("gid://")) {
    return id;
  }
  return `gid://shopify/Product/${id}`;
}

function variantIdFromGid(gid: string): number {
  const match = gid.match(/ProductVariant\/(\d+)/);
  if (match) {
    return Number.parseInt(match[1], 10);
  }
  const numeric = Number.parseInt(gid, 10);
  return Number.isFinite(numeric) ? numeric : 0;
}

function centsToAmount(cents: number): number {
  return cents / 100;
}

function getProductPageUrl(handle?: string): string | null {
  if (!handle) {
    return null;
  }
  return `/products/${handle}`;
}

function getStorefrontApiUrl(shop: string): string {
  const domain = normalizeShopDomain(shop);
  return `https://${domain}/api/${STOREFRONT_API_VERSION}/graphql.json`;
}

function getStorefrontHeaders(token: string): Record<string, string> {
  return {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": token,
  };
}

function TrashIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 6V4.5C6 3.67157 6.67157 3 7.5 3H12.5C13.3284 3 14 3.67157 14 4.5V6M4 6H16M7 6V16.5C7 17.3284 7.67157 18 8.5 18H11.5C12.3284 18 13 17.3284 13 16.5V6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrustBadges({
  badges,
  textColor,
}: {
  badges: string[];
  textColor: string;
}) {
  const labelMap: Record<string, string> = {
    visa: "VISA",
    paypal: "PayPal",
    mc: "MC",
  };

  return (
    <div className={styles.trustBadges}>
      {badges.map((badge) => (
        <span
          key={badge}
          className={styles.trustBadge}
          style={{ color: textColor }}
        >
          {labelMap[badge] ?? badge.toUpperCase()}
        </span>
      ))}
    </div>
  );
}

function CartDrawerInner({ shop, settings }: CartDrawerProps) {
  const {
    modules,
    moduleOrder,
    backgroundColor,
    textColor,
    isAllowed = true,
  } = settings;
  const globalTextColor =
    textColor ?? String(modules.top_bar.textColor ?? "#000000");
  const paidFeaturesAllowed = isAllowed;
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState<ThemeCart | null>(null);
  const [cartLoading, setCartLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [timerSecondsLeft, setTimerSecondsLeft] = useState(600);
  const [timerHidden, setTimerHidden] = useState(false);
  const timerExpiredHandledRef = useRef(false);
  const prevCartItemCountRef = useRef<number | null>(null);
  const cartCountInitializedRef = useRef(false);
  const [orderNotes, setOrderNotes] = useState("");
  const orderNotesInitializedRef = useRef(false);
  const noteSaveTimeoutRef = useRef<number | null>(null);
  const [discountCode, setDiscountCode] = useState("");
  const [giftWrapSelected, setGiftWrapSelected] = useState(false);
  const [upsellProducts, setUpsellProducts] = useState<UpsellProduct[]>([]);
  const [upsellCarouselIndex, setUpsellCarouselIndex] = useState(0);

  const discountRules = useMemo(() => getDiscountRules(modules), [modules]);
  const upsellProductIds = useMemo(
    () => getUpsellProductIds(modules),
    [modules],
  );

  const refreshCart = useCallback(async () => {
    const nextCart = await loadCart();
    if (nextCart) {
      setCart(nextCart);
    }
    return nextCart;
  }, []);

  const handleOpen = useCallback(async () => {
    if (open) {
      return;
    }


    startThemeCartDrawerSuppression();
    setOurCartDrawerOpen(true);
    setOpen(true);
    setCartLoading(true);
    const nextCart = await refreshCart();
    setCartLoading(false);

    trackAnalyticsEvent({
      shop,
      eventType: "cart_viewed",
      cartId: nextCart?.token ?? "unknown",
    });
  }, [refreshCart, shop]);

  const handleClose = useCallback(() => {
    setOpen(false);

    setOurCartDrawerOpen(false);

    window.setTimeout(() => {
      startThemeCartDrawerSuppression();
      startThemeCartDialogInterception();
    }, 0);

  }, []);

  useEffect(() => {
    return () => {
      setOurCartDrawerOpen(false);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function initCart() {
      setCartLoading(true);
      const initialCart = await loadCart();
      if (!cancelled && initialCart) {
        setCart(initialCart);
      }
      if (!cancelled) {
        setCartLoading(false);
      }
    }

    void initCart();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    window.CartDrawerUpsell = {
      open: () => {
        void handleOpen();
      },
      close: handleClose,
    };

    if (window.__cartDrawerPendingOpen) {
      window.__cartDrawerPendingOpen = false;
      void handleOpen();
    }

    return () => {
      delete window.CartDrawerUpsell;
    };
  }, [handleClose, handleOpen]);

  useEffect(() => {
    if (window.__cartDrawerFetchPatched) {
      return;
    }
    window.__cartDrawerFetchPatched = true;

    const originalFetch = window.fetch.bind(window);
    window.fetch = (...args: Parameters<typeof fetch>) => {
      const input = args[0];
      let url = "";

      if (typeof input === "string") {
        url = input;
      } else if (input instanceof Request) {
        url = input.url;
      }

      const promise = originalFetch(...args);

      if (
        url.includes("/cart/add") ||
        url.includes("/cart/add.js")
      ) {
        promise
          .then((response) => {
            if (response.ok) {
              window.setTimeout(() => {
                void handleOpen();
              }, 150);
            }
          })
          .catch(() => { });
      }

      return promise;
    };

    return () => {
      window.fetch = originalFetch;
      window.__cartDrawerFetchPatched = false;
    };
  }, [handleOpen]);

  useEffect(() => {
    const handleFormSubmit = async (event: Event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;

      const action = form.getAttribute("action") || "";
      if (action.includes("/cart/add")) {
        // Предотвращаем стандартную отправку и редирект
        event.preventDefault();
        event.stopImmediatePropagation();
        event.stopPropagation();

        // Отправляем данные формы через fetch
        try {
          const formData = new FormData(form);
          const response = await fetch(action, {
            method: form.method || "POST",
            body: formData,
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Accept": "application/json",
            },
          });

          if (response.ok) {
            // Обновляем корзину и открываем виджет
            await refreshCart();
            await handleOpen();
          } else {
            // Если ошибка, можно показать сообщение
            console.error("[CartDrawerUpsell] Failed to add item to cart");
          }
        } catch (error) {
          console.error("[CartDrawerUpsell] Error adding item to cart", error);
        }
      }
    };

    document.addEventListener("submit", handleFormSubmit, true);
    return () => {
      document.removeEventListener("submit", handleFormSubmit, true);
    };
  }, [handleOpen, refreshCart]);

  useEffect(() => {
    if (cart?.note === undefined) {
      return;
    }

    if (!orderNotesInitializedRef.current) {
      setOrderNotes(cart.note ?? "");
      orderNotesInitializedRef.current = true;
      return;
    }

    if (document.activeElement?.getAttribute("data-cart-order-notes") !== "true") {
      setOrderNotes(cart.note ?? "");
    }
  }, [cart?.note]);

  useEffect(() => {
    return () => {
      if (noteSaveTimeoutRef.current !== null) {
        window.clearTimeout(noteSaveTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setGiftWrapSelected(cart?.attributes?._gift_wrap === "yes");
  }, [cart?.attributes?._gift_wrap]);

  const cartItems = cart?.items ?? [];
  const currencyCode = cart?.currency ?? "USD";
  const cartSubtotal = centsToAmount(
    cart?.items_subtotal_price ?? cart?.total_price ?? 0,
  );
  const itemCount = cart?.item_count ?? 0;

  const resetTimer = useCallback(() => {
    const minutes = Number(modules.timer.minutes ?? 10);
    setTimerSecondsLeft(minutes * 60);
    setTimerHidden(false);
    timerExpiredHandledRef.current = false;
  }, [modules.timer.minutes]);

  const resetTimerIfNeeded = useCallback(() => {
    if (
      !paidFeaturesAllowed ||
      !modules.timer.enabled ||
      String(modules.timer.behavior ?? "remove_items") !== "reset_on_add"
    ) {
      return;
    }

    resetTimer();
  }, [
    paidFeaturesAllowed,
    modules.timer.enabled,
    modules.timer.behavior,
    resetTimer,
  ]);

  const handleCartCountIncrease = useCallback(
    (nextCount: number) => {
      if (!cartCountInitializedRef.current) {
        prevCartItemCountRef.current = nextCount;
        cartCountInitializedRef.current = true;
        return;
      }

      if (nextCount > (prevCartItemCountRef.current ?? 0)) {
        resetTimerIfNeeded();
      }

      prevCartItemCountRef.current = nextCount;
    },
    [resetTimerIfNeeded],
  );

  useEffect(() => {
    handleCartCountIncrease(itemCount);
  }, [itemCount, handleCartCountIncrease]);

  useEffect(() => {
    const handleExternalCartUpdate = () => {
      void refreshCart().then((nextCart) => {
        if (!nextCart) {
          return;
        }
        handleCartCountIncrease(nextCart.item_count ?? 0);
      });
    };

    document.addEventListener("cartdrawer:updated", handleExternalCartUpdate);
    document.addEventListener("cart:updated", handleExternalCartUpdate);
    window.addEventListener("cart:updated", handleExternalCartUpdate);

    return () => {
      document.removeEventListener("cartdrawer:updated", handleExternalCartUpdate);
      document.removeEventListener("cart:updated", handleExternalCartUpdate);
      window.removeEventListener("cart:updated", handleExternalCartUpdate);
    };
  }, [handleCartCountIncrease, refreshCart]);

  const dynamicDiscountEnabled =
    paidFeaturesAllowed && Boolean(modules.dynamic_discounts.enabled);
  const { total: discountedSubtotal, discountAmount, appliedRule } =
    applyFirstDiscount(cartSubtotal, dynamicDiscountEnabled, discountRules);

  const giftWrapPrice = Number(modules.gift_wrap?.price ?? 5);
  const giftWrapAmount =
    paidFeaturesAllowed && giftWrapSelected && modules.gift_wrap?.enabled
      ? giftWrapPrice
      : 0;
  const subtotalWithGiftWrap = discountedSubtotal + giftWrapAmount;

  const freeShippingThreshold = Number(modules.free_shipping.threshold ?? 50);
  const shippingRemaining = Math.max(freeShippingThreshold - cartSubtotal, 0);
  const shippingProgress = Math.min(
    (cartSubtotal / Math.max(freeShippingThreshold, 1)) * 100,
    100,
  );
  const freeShippingUnlocked = cartSubtotal >= freeShippingThreshold;

  const dispatchCartAction = useCallback(
    async (
      action:
        | { type: "update"; lineItemKey: string; quantity: number }
        | { type: "remove"; lineItemKey: string }
        | { type: "add"; variantId: number; quantity: number }
        | { type: "note"; note: string }
        | { type: "attributes"; attributes: Record<string, string> }
        | { type: "discount"; code: string },
    ) => {
      setActionLoading(true);

      let updated: ThemeCart | null = null;

      switch (action.type) {
        case "update":
          updated = await updateItem(action.lineItemKey, action.quantity);
          break;
        case "remove":
          updated = await removeItem(action.lineItemKey);
          break;
        case "add":
          updated = await addItem(action.variantId, action.quantity);
          break;
        case "note":
          updated = await updateNote(action.note);
          break;
        case "attributes":
          updated = await updateAttributes(action.attributes);
          break;
        case "discount":
          updated = await applyDiscount(action.code);
          break;
      }

      if (updated) {
        setCart(updated);
        document.dispatchEvent(new CustomEvent("cartdrawer:updated"));
      }

      setActionLoading(false);
    },
    [],
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleClose]);

  useEffect(() => {
    if (!paidFeaturesAllowed || !modules.timer.enabled) {
      timerExpiredHandledRef.current = false;
      return;
    }

    const minutes = Number(modules.timer.minutes ?? 10);
    setTimerSecondsLeft(minutes * 60);
    setTimerHidden(false);
    timerExpiredHandledRef.current = false;

    const intervalId = window.setInterval(() => {
      setTimerSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [modules.timer.enabled, modules.timer.minutes, open, paidFeaturesAllowed]);

  useEffect(() => {
    if (
      !paidFeaturesAllowed ||
      !modules.timer.enabled ||
      timerSecondsLeft > 0
    ) {
      if (timerSecondsLeft > 0) {
        timerExpiredHandledRef.current = false;
      }
      return;
    }

    if (timerExpiredHandledRef.current) {
      return;
    }

    timerExpiredHandledRef.current = true;
    const behavior = String(modules.timer.behavior ?? "remove_items");

    if (behavior === "remove_items") {
      for (const item of cartItems) {
        void dispatchCartAction({
          type: "remove",
          lineItemKey: item.key,
        });
      }
    } else if (behavior === "hide_timer") {
      setTimerHidden(true);
    }
  }, [
    timerSecondsLeft,
    modules.timer.enabled,
    modules.timer.behavior,
    cartItems,
    dispatchCartAction,
    paidFeaturesAllowed,
  ]);

  useEffect(() => {
    if (
      !paidFeaturesAllowed ||
      !modules.upsell.enabled ||
      upsellProductIds.length === 0
    ) {
      setUpsellProducts([]);
      return;
    }

    const storefrontToken = getStorefrontToken();
    if (!storefrontToken) {
      setUpsellProducts([]);
      return;
    }

    let cancelled = false;
    const normalizedIds = upsellProductIds.map(toProductGid);

    async function loadUpsellProducts() {
      try {
        const response = await fetch(getStorefrontApiUrl(shop), {
          method: "POST",
          headers: getStorefrontHeaders(storefrontToken),
          body: JSON.stringify({
            query: UPSELL_PRODUCTS_QUERY,
            variables: { ids: normalizedIds },
          }),
        });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as {
          data?: {
            nodes?: Array<{
              id?: string;
              title?: string;
              handle?: string;
              featuredImage?: { url?: string } | null;
              variants?: {
                nodes?: Array<{
                  id?: string;
                  price?: { amount?: string };
                }>;
              };
            } | null>;
          };
        };

        if (cancelled) {
          return;
        }

        const products =
          payload.data?.nodes
            ?.filter((node): node is NonNullable<typeof node> => Boolean(node?.id))
            .map((node) => ({
              id: node.id!,
              title: node.title ?? node.id!,
              handle: node.handle ?? "",
              imageUrl: node.featuredImage?.url ?? null,
              price: parseAmount(node.variants?.nodes?.[0]?.price?.amount),
              variantId: node.variants?.nodes?.[0]?.id ?? "",
            }))
            .filter((product) => Boolean(product.variantId)) ?? [];

        setUpsellProducts(products);
      } catch {
        if (!cancelled) {
          setUpsellProducts([]);
        }
      }
    }

    void loadUpsellProducts();

    return () => {
      cancelled = true;
    };
  }, [modules.upsell.enabled, shop, upsellProductIds, paidFeaturesAllowed]);

  const handleNoteBlur = useCallback(() => {
    if (orderNotes !== (cart?.note ?? "")) {
      void dispatchCartAction({ type: "note", note: orderNotes });
    }
  }, [cart?.note, dispatchCartAction, orderNotes]);

  const handleNoteChange = useCallback(
    (value: string) => {
      setOrderNotes(value);

      if (noteSaveTimeoutRef.current !== null) {
        window.clearTimeout(noteSaveTimeoutRef.current);
      }

      noteSaveTimeoutRef.current = window.setTimeout(() => {
        void dispatchCartAction({ type: "note", note: value });
      }, 600);
    },
    [dispatchCartAction],
  );

  const handleApplyDiscount = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      const code = discountCode.trim();
      if (!code) {
        return;
      }
      void dispatchCartAction({ type: "discount", code });
    },
    [discountCode, dispatchCartAction],
  );

  const handleGiftWrapChange = useCallback(
    (checked: boolean) => {
      setGiftWrapSelected(checked);
      const existingAttributes = { ...(cart?.attributes ?? {}) };
      if (checked) {
        existingAttributes['Gift Wrap'] = "yes";
      } else {
        delete existingAttributes['Gift Wrap'];
      }
      void dispatchCartAction({
        type: "attributes",
        attributes: existingAttributes,
      });
    },
    [cart?.attributes, dispatchCartAction],
  );

  const handleCheckout = useCallback(() => {
    window.location.href = "/checkout";
  }, []);

  const handleAddUpsell = useCallback(
    (product: UpsellProduct) => {
      trackAnalyticsEvent({
        shop,
        eventType: "added_to_cart",
        productId: product.id,
        productTitle: product.title,
        variantId: product.variantId,
      });

      setUpsellProducts((prev) => prev.filter((p) => p.id !== product.id));
      void dispatchCartAction({
        type: "add",
        variantId: variantIdFromGid(product.variantId),
        quantity: 1,
      });
    },
    [dispatchCartAction, shop],
  );

  const cartVariantIds = useMemo(
    () => new Set(cartItems.map((item) => item.variant_id)),
    [cartItems],
  );

  const visibleUpsellProducts = useMemo(
    () =>
      upsellProducts.filter(
        (product) =>
          !cartVariantIds.has(variantIdFromGid(product.variantId)),
      ),
    [upsellProducts, cartVariantIds],
  );

  useEffect(() => {
    setUpsellCarouselIndex(0);
  }, [visibleUpsellProducts.length, modules.upsell.layout]);

  const isLoading = actionLoading || cartLoading;

  const renderCartLines = () => {
    if (isLoading && cartItems.length === 0) {
      return <p className={styles.emptyCart} style={{ color: globalTextColor }}>Loading cart...</p>;
    }

    if (cartItems.length === 0) {
      return <p className={styles.emptyCart} style={{ color: globalTextColor }}>Your cart is empty</p>;
    }

    return cartItems.map((item) => {
      const unitPrice = centsToAmount(item.price);
      const quantity = item.quantity ?? 1;
      const productUrl = item.url || null;

      const imageNode = item.image ? (
        <img
          src={item.image}
          alt={item.title}
          className={styles.lineImage}
          width={72}
          height={72}
        />
      ) : (
        <div className={styles.lineImagePlaceholder} />
      );

      return (
        <div key={item.key} className={styles.lineItem}>
          {productUrl ? (
            <a href={productUrl} className={styles.lineImageLink}>
              {imageNode}
            </a>
          ) : (
            imageNode
          )}
          <div className={styles.lineDetails}>
            {productUrl ? (
              <a href={productUrl} className={styles.lineTitleLink}>
                <p className={styles.lineTitle} style={{ color: globalTextColor }}>
                  {item.title}
                </p>
              </a>
            ) : (
              <p className={styles.lineTitle} style={{ color: globalTextColor }}>
                {item.title}
              </p>
            )}
            <p className={styles.linePrice} style={{ color: globalTextColor }}>
              {formatMoney(unitPrice, currencyCode)}
            </p>
            <div className={styles.qtyRow}>
              <button
                type="button"
                className={styles.qtyBtn}
                onClick={() => {
                  if (quantity <= 1) {
                    void dispatchCartAction({
                      type: "remove",
                      lineItemKey: item.key,
                    });
                    return;
                  }
                  void dispatchCartAction({
                    type: "update",
                    lineItemKey: item.key,
                    quantity: quantity - 1,
                  });
                }}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className={styles.qtyValue} style={{ color: globalTextColor }}>
                {quantity}
              </span>
              <button
                type="button"
                className={styles.qtyBtn}
                onClick={() => {
                  void dispatchCartAction({
                    type: "update",
                    lineItemKey: item.key,
                    quantity: quantity + 1,
                  });
                }}
                aria-label="Increase quantity"
              >
                +
              </button>
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => {
                  void dispatchCartAction({
                    type: "remove",
                    lineItemKey: item.key,
                  });
                }}
                aria-label="Remove item"
                style={{ color: globalTextColor }}
              >
                <TrashIcon />
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderModule = (moduleId: ModuleId) => {
    if (!paidFeaturesAllowed && PAID_MODULE_IDS.includes(moduleId)) {
      return null;
    }

    const mod = modules[moduleId];
    if (!mod?.enabled) {
      return null;
    }

    switch (moduleId) {
      case "top_bar": {
        const title = String(mod.title ?? "My cart");
        return (
          <div key={moduleId} className={styles.header} style={{ borderColor: "rgba(128, 128, 128, 0.5)" }}>
            <h2 className={styles.title} style={{ color: globalTextColor }}>
              {title}
              {mod.showItemCount ? ` (${itemCount})` : ""}
            </h2>
          </div>
        );
      }
      case "timer": {
        if (timerHidden) {
          return null;
        }

        const timerText = String(mod.text ?? "").replace(
          "{{timer}}",
          formatCountdown(timerSecondsLeft),
        );
        return (
          <div
            key={moduleId}
            className={styles.timer}
            style={{
              backgroundColor: String(mod.backgroundColor ?? "#f5f5f5"),
              color: String(mod.textColor ?? globalTextColor),
            }}
          >
            {timerText ||
              `Your cart will expire in ${formatCountdown(timerSecondsLeft)}`}
          </div>
        );
      }
      case "free_shipping": {
        const remainingAmount = formatMoney(shippingRemaining, currencyCode);
        const freeShippingText = freeShippingUnlocked
          ? "You've unlocked free shipping!"
          : String(mod.text ?? "").replace("$X", remainingAmount) ||
          `You are ${remainingAmount} away from free shipping!`;
        return (
          <div key={moduleId} className={styles.shipping}>
            <p className={styles.shippingText} style={{ color: globalTextColor }}>
              {freeShippingText}
            </p>
            <div className={styles.progressRow}>
              <div className={styles.progressTrack}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${shippingProgress}%`,
                    backgroundColor: String(mod.barColor ?? "#000000"),
                  }}
                />
              </div>
              <Truck
                size={16}
                className={styles.progressIcon}
                aria-hidden="true"
                style={{ color: globalTextColor }}
              />
            </div>
          </div>
        );
      }
      case "cart_products":
        return <Fragment key={moduleId}>{renderCartLines()}</Fragment>;
      case "dynamic_discounts": {
        if (discountRules.length === 0) {
          return null;
        }

        const nextRule = getNextDiscountRule(cartSubtotal, discountRules);
        if (!nextRule) {
          return (
            <p
              key={moduleId}
              className={styles.dynamicDiscountText}
              style={{ color: globalTextColor }}
            >
              {/* All available discounts applied */}
            </p>
          );
        }

        const remainingToNext = Math.max(nextRule.threshold - cartSubtotal, 0);
        const progress = Math.min(
          (cartSubtotal / Math.max(nextRule.threshold, 1)) * 100,
          100,
        );
        const discountLabel = getUpcomingDiscountLabel(nextRule);

        return (
          <div key={moduleId} className={styles.dynamicDiscount}>
            <p className={styles.dynamicDiscountText} style={{ color: globalTextColor }}>
              Add {formatMoney(remainingToNext, currencyCode)} more to get{" "}
              {discountLabel}
            </p>
            <div className={styles.dynamicDiscountBarWrap}>
              <div className={styles.progressTrack}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${progress}%`,
                    backgroundColor: String(mod.barColor ?? "#000000"),
                  }}
                />
              </div>
            </div>
          </div>
        );
      }
      case "upsell": {
        const upsellSettings = normalizeUpsellModule(
          mod as Record<string, unknown>,
        );
        const upsellCount = upsellSettings.count;
        const productsToShow =
          upsellCount === 0
            ? visibleUpsellProducts
            : visibleUpsellProducts.slice(0, upsellCount);

        if (productsToShow.length === 0) {
          return null;
        }

        const isCarousel = upsellSettings.layout === "carousel";
        const isGrid = upsellSettings.layout === "grid";
        const safeCarouselIndex =
          productsToShow.length > 0
            ? upsellCarouselIndex % productsToShow.length
            : 0;
        const currentProduct = productsToShow[safeCarouselIndex];

        const renderUpsellGridProduct = (product: UpsellProduct) => {
          const productUrl = getProductPageUrl(product.handle);

          const imageNode = product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              className={styles.upsellGridImage}
            />
          ) : (
            <div className={styles.upsellGridImage} />
          );

          return (
            <div key={product.id} className={styles.upsellGridItem}>
              {productUrl ? (
                <a href={productUrl} className={styles.upsellImageLink}>
                  {imageNode}
                </a>
              ) : (
                imageNode
              )}
              {productUrl ? (
                <a
                  href={productUrl}
                  className={styles.upsellTitleLink}
                  style={{ color: upsellSettings.textColor }}
                >
                  {product.title}
                </a>
              ) : (
                <span style={{ color: upsellSettings.textColor, fontWeight: 500 }}>
                  {product.title}
                </span>
              )}
              <span style={{ color: upsellSettings.text2Color }}>
                {formatMoney(product.price, currencyCode)}
              </span>
              <button
                type="button"
                className={styles.upsellAddBtn}
                style={{
                  backgroundColor: upsellSettings.buttonColor,
                  color: upsellSettings.buttonTextColor,
                  borderColor: upsellSettings.buttonColor,
                }}
                onClick={() => handleAddUpsell(product)}
              >
                {upsellSettings.buttonText}
              </button>
            </div>
          );
        };

        const renderUpsellProduct = (product: UpsellProduct) => {
          const productUrl = getProductPageUrl(product.handle);

          const imageNode = product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              className={styles.upsellImage}
            />
          ) : (
            <div className={styles.upsellImage} />
          );

          return (
            <div key={product.id} className={styles.upsellItem}>
              {productUrl ? (
                <a href={productUrl} className={styles.upsellImageLink}>
                  {imageNode}
                </a>
              ) : (
                imageNode
              )}
              <div className={styles.upsellMeta}>
                {productUrl ? (
                  <a
                    href={productUrl}
                    className={styles.upsellTitleLink}
                    style={{ color: upsellSettings.textColor }}
                  >
                    {product.title}
                  </a>
                ) : (
                  <span style={{ color: upsellSettings.textColor }}>
                    {product.title}
                  </span>
                )}
                <span style={{ color: upsellSettings.text2Color }}>
                  {formatMoney(product.price, currencyCode)}
                </span>
              </div>
              <button
                type="button"
                className={styles.upsellAddBtn}
                style={{
                  backgroundColor: upsellSettings.buttonColor,
                  color: upsellSettings.buttonTextColor,
                }}
                onClick={() => handleAddUpsell(product)}
              >
                {upsellSettings.buttonText}
              </button>
            </div>
          );
        };

        const handlePrevUpsell = () => {
          setUpsellCarouselIndex(
            (prev) =>
              (prev - 1 + productsToShow.length) % productsToShow.length,
          );
        };

        const handleNextUpsell = () => {
          setUpsellCarouselIndex(
            (prev) => (prev + 1) % productsToShow.length,
          );
        };

        return (
          <div
            key={moduleId}
            className={styles.upsellBlock}
            style={{ backgroundColor: upsellSettings.backgroundColor }}
          >
            {upsellSettings.title ? (
              <p
                className={styles.upsellTitle}
                style={{
                  textAlign: upsellSettings.titleAlign,
                  color: upsellSettings.titleColor,
                  fontSize: `${upsellSettings.titleFontSize}px`,
                }}
              >
                {upsellSettings.title}
              </p>
            ) : null}
            {isGrid ? (
              <div className={styles.upsellGrid}>
                {productsToShow.map((product) =>
                  renderUpsellGridProduct(product),
                )}
              </div>
            ) : isCarousel ? (
              <>
                <div className={styles.upsellCarousel}>
                  {productsToShow.length > 1 ? (
                    <button
                      type="button"
                      className={styles.upsellNavBtn}
                      onClick={handlePrevUpsell}
                      aria-label="Previous"
                    >
                      <ChevronLeft
                        size={20}
                        color={upsellSettings.arrowsColor}
                      />
                    </button>
                  ) : null}
                  {currentProduct ? renderUpsellProduct(currentProduct) : null}
                  {productsToShow.length > 1 ? (
                    <button
                      type="button"
                      className={styles.upsellNavBtn}
                      onClick={handleNextUpsell}
                      aria-label="Next"
                    >
                      <ChevronRight
                        size={20}
                        color={upsellSettings.arrowsColor}
                      />
                    </button>
                  ) : null}
                </div>
                {productsToShow.length > 1 ? (
                  <p
                    className={styles.upsellCarouselPagination}
                    style={{ color: upsellSettings.text2Color }}
                  >
                    {safeCarouselIndex + 1} / {productsToShow.length}
                  </p>
                ) : null}
              </>
            ) : (
              <div
                className={`${styles.upsellList} ${styles.upsellListHorizontal}`}
              >
                {productsToShow.map((product) => renderUpsellProduct(product))}
              </div>
            )}
          </div>
        );
      }
      case "trust_badges":
        return (
          <TrustBadges
            key={moduleId}
            textColor={globalTextColor}
            badges={
              Array.isArray(mod.badges)
                ? (mod.badges as string[])
                : ["visa", "paypal", "mc"]
            }
          />
        );
      case "gift_wrap":
        return (
          <div key={moduleId} className={styles.giftWrap}>
            <label className={styles.giftWrapLabel}>
              <input
                type="checkbox"
                checked={giftWrapSelected}
                onChange={(event) => handleGiftWrapChange(event.target.checked)}
                className={styles.giftWrapCheckbox}
              />
              <GiftIcon size={16}  aria-hidden="true" style={{ color: globalTextColor }} />
              <span style={{ color: globalTextColor }}>
                {String(mod.text ?? "Gift Wrap")}{" "}
              </span>
            </label>
            <span style={{ color: globalTextColor }}>
              {formatMoney(Number(mod.price ?? 5), currencyCode)}
            </span>
          </div>
        );
      case "order_notes":
        return (
          <input
            key={moduleId}
            type="text"
            value={orderNotes}
            data-cart-order-notes="true"
            data-cart-drawer-upsell-input="true"
            onChange={(event) => handleNoteChange(event.target.value)}
            onBlur={handleNoteBlur}
            placeholder={String(mod.placeholder ?? "Add special instructions")}
            className={styles.input}
            style={{
              color: globalTextColor,
              backgroundColor: backgroundColor,
              borderColor: "rgba(128, 128, 128, 0.5)", // всегда виден
            }}
          />
        );
      case "discount_code":
        return (
          <form
            key={moduleId}
            className={styles.discountRow}
            onSubmit={handleApplyDiscount}
          >
            <input
              type="text"
              value={discountCode}
              data-cart-drawer-upsell-input="true"
              onChange={(event) => setDiscountCode(event.target.value)}
              placeholder={String(mod.placeholder ?? "Discount code")}
              className={`${styles.input} ${styles.discountInput}`}
              style={{ color: globalTextColor }}
            />
            <button type="submit" className={styles.applyBtn}>
              Apply
            </button>
          </form>
        );
      case "discounts_row": {
        const hasDynamicDiscount = dynamicDiscountEnabled && appliedRule;
        const appliedDiscounts = cart?.cart_level_discount_applications ?? [];

        if (!hasDynamicDiscount && appliedDiscounts.length === 0) {
          return null;
        }

        return (
          <Fragment key={moduleId}>
            {hasDynamicDiscount && (
              <div className={styles.discountLine} style={{ color: globalTextColor }}>
                <span>{getAppliedDiscountLabel(appliedRule!)}</span>
                {discountAmount > 0 && (
                  <span className={styles.discountAmount} style={{ color: globalTextColor }}>
                    − {formatMoney(discountAmount, currencyCode)}
                  </span>
                )}
              </div>
            )}
            {appliedDiscounts.map((entry, index) => (
              <div
                key={`${entry.title ?? "discount"}-${index}`}
                className={styles.discountLine}
                style={{ color: globalTextColor }}
              >
                <span>{entry.title ?? "Discount"}</span>
                {entry.total_allocated_amount ? (
                  <span className={styles.discountAmount} style={{ color: globalTextColor }}>
                    − {formatMoney(centsToAmount(entry.total_allocated_amount), currencyCode)}
                  </span>
                ) : null}
              </div>
            ))}
          </Fragment>
        );
      }
      case "subtotal_row": {
        const format = String(mod.format ?? "Subtotal: ${{amount}}");
        const amountText = subtotalWithGiftWrap.toFixed(2);
        const subtotalText = format.replace("{{amount}}", amountText);
        const [label] = subtotalText.split(":");
        return (
          <div key={moduleId} className={styles.subtotal} style={{ color: globalTextColor, borderColor: "rgba(128, 128, 128, 0.5)" }}>
            <span>{label?.trim() || "Subtotal"}</span>
            <span>{formatMoney(subtotalWithGiftWrap, currencyCode)}</span>
          </div>
        );
      }
      case "checkout_button": {
        const checkoutText = String(mod.textKey ?? mod.text ?? "Checkout");
        return (
          <button
            key={moduleId}
            type="button"
            className={styles.checkoutBtn}
            style={{
              backgroundColor: String(mod.color ?? "#000000"),
              color: String(mod.textColor ?? "#ffffff"),
              borderRadius: String(mod.borderRadius ?? "4px"),
              border: "none",
            }}
            onClick={handleCheckout}
            disabled={itemCount === 0}
          >
            {checkoutText === "checkout" ? "Checkout" : checkoutText}
          </button>
        );
      }
      case "footer": {
        const footerText = String(mod.text ?? "");
        if (!footerText) {
          return null;
        }
        return (
          <p key={moduleId} className={styles.footer} style={{ color: globalTextColor }}>
            {footerText}
          </p>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div data-cart-drawer-upsell="true">
      <div
        className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          handleClose();
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape" || event.key === "Enter") {
            handleClose();
          }
        }}
        role="button"
        tabIndex={open ? 0 : -1}
        aria-hidden={!open}
      />
      <aside
        className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
        style={{ backgroundColor, color: globalTextColor }}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <button
          type="button"
          className={styles.closeBtn}
          onClick={handleClose}
          aria-label="Close cart"
        >
         <X size={16} color={globalTextColor} />
        </button>

        <div className={styles.content}>
          {moduleOrder.map((moduleId) => renderModule(moduleId))}
        </div>
      </aside>
    </div>
  );
}

function getUpcomingDiscountLabel(rule: DiscountRule): string {
  if (rule.type === "percent") {
    return `${rule.value}% off`;
  }
  if (rule.type === "fixed") {
    return `$${rule.value} off`;
  }
  return "free shipping";
}

function getAppliedDiscountLabel(rule: DiscountRule): string {
  if (rule.type === "percent") {
    return `${rule.value}% discount`;
  }
  if (rule.type === "fixed") {
    return `$${rule.value} discount`;
  }
  return "Free shipping discount";
}

export function CartDrawer(props: CartDrawerProps) {
  return <CartDrawerInner {...props} />;
}

export default CartDrawer;

declare global {
  interface Window {
    CartDrawerUpsell?: { open: () => void; close: () => void };
    __cartDrawerFetchPatched?: boolean;
    __cartDrawerPendingOpen?: boolean;
  }
}
