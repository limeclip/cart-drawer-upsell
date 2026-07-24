import { Fragment, useCallback, useEffect, useMemo, useRef, useState, type HTMLAttributes, type ReactNode } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  FileText,
  Gift,
  GiftIcon,
  GripVertical,
  LayoutDashboard,
  Package,
  Percent,
  ShieldCheck,
  ShoppingCart,
  StickyNote,
  Tag,
  Ticket,
  Trash2Icon,
  TrashIcon,
  Truck,
  type LucideIcon,
} from "lucide-react";
import type { LoaderFunctionArgs } from "react-router";
import { useFetcher, useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import { useAppBridge } from "@shopify/app-bridge-react";
import {
  Banner,
  BlockStack,
  Box,
  Button,
  Card,
  Checkbox,
  Collapsible,
  InlineStack,
  Layout,
  Modal,
  Page,
  ProgressBar,
  Select,
  Spinner,
  Text,
  TextField,
} from "@shopify/polaris";

import { authenticate } from "../shopify.server";
import { checkOrderLimit } from "../lib/checkOrderLimit";
import { isCartSettingsDefault } from "../lib/cartModules";
import { DEFAULT_UPSELL_MODULE, normalizeUpsellModule } from "../lib/cartModules";
import prisma from "../db.server";
import styles from "../styles/settings-page.module.css";

type DiscountType = "percent" | "fixed" | "free_shipping";

type DiscountRule = {
  threshold: number;
  type: DiscountType;
  value: number;
};

type StoreProduct = {
  id: string;
  title: string;
  price: number;
  imageUrl: string | null;
  handle: string;
};

type UpsellProduct = StoreProduct;

type PreviewCartItem = StoreProduct & {
  quantity: number;
};

type ModuleId =
  | "top_bar"
  | "timer"
  | "free_shipping"
  | "cart_products"
  | "dynamic_discounts"
  | "upsell"
  | "trust_badges"
  | "gift_wrap"
  | "order_notes"
  | "discount_code"
  | "discounts_row"
  | "subtotal_row"
  | "checkout_button"
  | "footer";

type ModuleEntry = {
  enabled: boolean;
  [key: string]: unknown;
};

type ModulesState = Record<ModuleId, ModuleEntry>;

type Subscription = {
  planName: string;
  orderLimit: number;
  orderCount: number;
  trialEndsAt: string | null;
  isActive: boolean;
  usedPercent: number;
};

type LoaderData = {
  cartProducts: StoreProduct[];
  upsellProducts: StoreProduct[];
  upsellProductIds: string[];
  isAllowed: boolean;
  reason: "trial_ended" | "limit_exceeded" | null;
};

type UpsellLoaderData = {
  upsellProducts: StoreProduct[];
};

const DEFAULT_MODULE_ORDER: ModuleId[] = [
  "top_bar",
  "timer",
  "free_shipping",
  "cart_products",
  "dynamic_discounts",
  "upsell",
  "trust_badges",
  "gift_wrap",
  "order_notes",
  // "discount_code",
  "discounts_row",
  "subtotal_row",
  "checkout_button",
  "footer",
];

const MODULE_LABEL_KEYS: Record<ModuleId, string> = {
  top_bar: "module_top_bar",
  timer: "module_timer",
  free_shipping: "module_free_shipping",
  cart_products: "module_cart_products",
  dynamic_discounts: "module_dynamic_discounts",
  upsell: "module_upsell",
  trust_badges: "module_trust_badges",
  gift_wrap: "module_gift_wrap",
  order_notes: "module_order_notes",
  discount_code: "module_discount_code",
  discounts_row: "module_discounts_row",
  subtotal_row: "module_subtotal_row",
  checkout_button: "module_checkout_button",
  footer: "module_footer",
};

const MODULE_ICONS: Record<ModuleId, LucideIcon> = {
  top_bar: LayoutDashboard,
  timer: Clock,
  free_shipping: Truck,
  cart_products: ShoppingCart,
  dynamic_discounts: Tag,
  upsell: Package,
  trust_badges: ShieldCheck,
  gift_wrap: Gift,
  order_notes: StickyNote,
  discount_code: Ticket,
  discounts_row: Percent,
  subtotal_row: DollarSign,
  checkout_button: ArrowRight,
  footer: FileText,
};

function createDefaultModules(): ModulesState {
  return {
    top_bar: {
      enabled: true,
      title: "My cart",
      showItemCount: true,
      backgroundColor: "#ffffff",
      textColor: "#000000",
    },
    timer: {
      enabled: false,
      minutes: 10,
      text: "Your cart will expire in {{timer}} ⏰",
      textColor: "#000000",
      backgroundColor: "#f5f5f5",
      behavior: "remove_items",
    },
    free_shipping: {
      enabled: true,
      threshold: 50,
      text: "You are $X away from free shipping!",
      barColor: "#000000",
    },
    cart_products: {
      enabled: true,
    },
    dynamic_discounts: {
      enabled: false,
      rules: [] as DiscountRule[],
      barColor: "#000000",
    },
    upsell: { ...DEFAULT_UPSELL_MODULE, productIds: [] as string[] },
    trust_badges: {
      enabled: true,
      badges: ["visa", "paypal", "mc"],
    },
    gift_wrap: {
      enabled: false,
      price: 5,
      text: "Gift Wrap",
    },
    order_notes: {
      enabled: false,
      placeholder: "Add special instructions",
    },
    discount_code: {
      enabled: false,
      placeholder: "Discount code",
    },
    discounts_row: {
      enabled: true,
    },
    subtotal_row: {
      enabled: true,
      format: "Subtotal: ${{amount}}",
    },
    checkout_button: {
      enabled: true,
      text: "checkout",
      textKey: "checkout",
      color: "#000000",
      textColor: "#ffffff",
      borderRadius: "4px",
    },
    footer: {
      enabled: false,
      text: "",
      links: [] as string[],
    },
  };
}

const PAID_MODULE_IDS: ModuleId[] = [
  "timer",
  "upsell",
  "gift_wrap",
  "dynamic_discounts",
];

const DEFAULT_SUBSCRIPTION: Subscription = {
  planName: "starter",
  orderLimit: 99,
  orderCount: 0,
  trialEndsAt: null,
  isActive: true,
  usedPercent: 0,
};

const PREVIEW_STYLE = {
  text: { color: "#000000" },
  muted: { color: "#666666" },
  widgetBg: { backgroundColor: "#ffffff" },
  progressTrack: { backgroundColor: "#e0e0e0" },
  progressFill: { backgroundColor: "#000000" },
  trustBadge: { color: "#888888", fontSize: "11px", fontWeight: 600 as const },
  upsellAddBtn: {
    padding: "4px 10px",
    border: "1px solid #000000",
    borderRadius: "6px",
    backgroundColor: "#ffffff",
    color: "#000000",
    fontSize: "12px",
    fontWeight: 600 as const,
    cursor: "pointer" as const,
  },


};

const CART_PRODUCTS_QUERY = `#graphql
  query CartPreviewProducts($first: Int!) {
    products(first: $first) {
      nodes {
        id
        title
        handle
        featuredImage {
          url
        }
        variants(first: 1) {
          nodes {
            price
          }
        }
      }
    }
  }
`;

const PRODUCTS_BY_IDS_QUERY = `#graphql
  query UpsellProductsByIds($ids: [ID!]!) {
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
            price
          }
        }
      }
    }
  }
`;

function parsePrice(value: string | undefined): number {
  const parsed = Number.parseFloat(value ?? "0");
  return Number.isFinite(parsed) ? parsed : 0;
}

function mapGraphqlProduct(node: {
  id?: string;
  title?: string;
  handle?: string;
  featuredImage?: { url?: string } | null;
  variants?: { nodes?: Array<{ price?: string }> };
}): StoreProduct | null {
  if (!node.id || !node.title) {
    return null;
  }

  return {
    id: node.id,
    title: node.title,
    handle: node.handle ?? "",
    price: parsePrice(node.variants?.nodes?.[0]?.price),
    imageUrl: node.featuredImage?.url ?? null,
  };
}

async function fetchFirstProducts(
  admin: Awaited<ReturnType<typeof authenticate.admin>>["admin"],
  count: number,
): Promise<StoreProduct[]> {
  const response = await admin.graphql(CART_PRODUCTS_QUERY, {
    variables: { first: count },
  });
  const payload = (await response.json()) as {
    data?: {
      products?: {
        nodes?: Array<{
          id?: string;
          title?: string;
          handle?: string;
          featuredImage?: { url?: string } | null;
          variants?: { nodes?: Array<{ price?: string }> };
        }>;
      };
    };
  };

  return (payload.data?.products?.nodes ?? [])
    .map(mapGraphqlProduct)
    .filter((product): product is StoreProduct => product !== null);
}

async function fetchProductsByIds(
  admin: Awaited<ReturnType<typeof authenticate.admin>>["admin"],
  ids: string[],
): Promise<StoreProduct[]> {
  if (ids.length === 0) {
    return [];
  }

  const response = await admin.graphql(PRODUCTS_BY_IDS_QUERY, {
    variables: { ids },
  });
  const payload = (await response.json()) as {
    data?: {
      nodes?: Array<{
        id?: string;
        title?: string;
        handle?: string;
        featuredImage?: { url?: string } | null;
        variants?: { nodes?: Array<{ price?: string }> };
      } | null>;
    };
  };

  return (payload.data?.nodes ?? [])
    .map((node) => (node ? mapGraphqlProduct(node) : null))
    .filter((product): product is StoreProduct => product !== null);
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request);
  const url = new URL(request.url);

  if (url.searchParams.get("intent") === "upsell") {
    const ids =
      url.searchParams
        .get("productIds")
        ?.split(",")
        .map((id) => id.trim())
        .filter(Boolean) ?? [];
    const upsellProducts = await fetchProductsByIds(admin, ids);
    return Response.json({ upsellProducts } satisfies UpsellLoaderData);
  }

  const cartProducts = await fetchFirstProducts(admin, 3);

  const settings = await prisma.cartSettings.findUnique({
    where: { shop: session.shop },
  });
  const { modules } = settings
    ? parseModulesFromApi(settings as unknown as Record<string, unknown>)
    : { modules: createDefaultModules() };
  const upsellProductIds = getUpsellProductIds(modules);
  const upsellProducts =
    upsellProductIds.length > 0
      ? await fetchProductsByIds(admin, upsellProductIds)
      : [];

  const { isAllowed, reason } = await checkOrderLimit(session.shop);

  return {
    cartProducts,
    upsellProducts,
    upsellProductIds,
    isAllowed,
    reason,
  } satisfies LoaderData;
};

function parseUpsellProductIds(data: unknown): string[] {
  if (typeof data === "string") {
    try {
      return parseUpsellProductIds(JSON.parse(data) as unknown);
    } catch {
      return [];
    }
  }
  if (!Array.isArray(data)) {
    return [];
  }
  return data.filter((id): id is string => typeof id === "string");
}

function parseDiscountRules(data: unknown): DiscountRule[] {
  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .map((rule) => {
      if (!rule || typeof rule !== "object") {
        return null;
      }
      const entry = rule as Record<string, unknown>;
      const type = entry.type;
      if (type !== "percent" && type !== "fixed" && type !== "free_shipping") {
        return null;
      }
      return {
        threshold:
          typeof entry.threshold === "number" ? entry.threshold : Number(entry.threshold) || 0,
        type,
        value: typeof entry.value === "number" ? entry.value : Number(entry.value) || 0,
      };
    })
    .filter((rule): rule is DiscountRule => rule !== null);
}

function parseModuleOrder(data: unknown): ModuleId[] {
  let raw: unknown = data;
  if (typeof data === "string") {
    try {
      raw = JSON.parse(data) as unknown;
    } catch {
      return [];
    }
  }
  if (!Array.isArray(raw)) {
    return [];
  }
  return raw.filter(
    (id): id is ModuleId =>
      typeof id === "string" && DEFAULT_MODULE_ORDER.includes(id as ModuleId),
  );
}

function normalizeModuleOrder(parsed: ModuleId[]): ModuleId[] {
  const known = parsed.filter((id) => DEFAULT_MODULE_ORDER.includes(id));
  const knownSet = new Set(known);
  const missing = DEFAULT_MODULE_ORDER.filter((id) => !knownSet.has(id));

  if (known.length === 0) {
    return [...DEFAULT_MODULE_ORDER];
  }

  if (missing.length === 0) {
    return known;
  }

  const result = [...known];
  for (const id of missing) {
    const defaultIdx = DEFAULT_MODULE_ORDER.indexOf(id);
    let insertAt = 0;
    for (let i = defaultIdx - 1; i >= 0; i -= 1) {
      const prevId = DEFAULT_MODULE_ORDER[i];
      const prevIdx = result.indexOf(prevId);
      if (prevIdx !== -1) {
        insertAt = prevIdx + 1;
        break;
      }
    }
    result.splice(insertAt, 0, id);
  }

  return result;
}

function parseJsonRecord(data: unknown): Record<string, unknown> | null {
  let raw = data;
  if (typeof data === "string") {
    try {
      raw = JSON.parse(data) as unknown;
    } catch {
      return null;
    }
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return null;
  }
  return raw as Record<string, unknown>;
}

function mergeModules(
  defaults: ModulesState,
  saved: Record<string, unknown>,
): ModulesState {
  const result = { ...defaults };

  for (const id of DEFAULT_MODULE_ORDER) {
    const savedMod = saved[id];
    if (!savedMod || typeof savedMod !== "object" || Array.isArray(savedMod)) {
      continue;
    }
    const entry = savedMod as Record<string, unknown>;
    result[id] = {
      ...defaults[id],
      ...entry,
      enabled:
        typeof entry.enabled === "boolean"
          ? entry.enabled
          : defaults[id].enabled,
    };

    if (id === "dynamic_discounts") {
      result[id].rules = parseDiscountRules(entry.rules);
      if (typeof entry.barColor === "string") {
        result[id].barColor = entry.barColor;
      }
    }
    if (id === "upsell") {
      result[id] = normalizeUpsellModule({
        ...(defaults[id] as Record<string, unknown>),
        ...entry,
        enabled:
          typeof entry.enabled === "boolean"
            ? entry.enabled
            : defaults[id].enabled,
      });
    }
    if (id === "trust_badges" && Array.isArray(entry.badges)) {
      result[id].badges = entry.badges.filter(
        (badge): badge is string => typeof badge === "string",
      );
    }
    if (id === "footer" && Array.isArray(entry.links)) {
      result[id].links = entry.links;
    }
  }

  return result;
}

function migrateLegacyToModules(
  data: Record<string, unknown>,
  defaults: ModulesState,
): ModulesState {
  const buttonTextKey =
    typeof data.buttonTextKey === "string"
      ? data.buttonTextKey === "add_to_cart"
        ? "checkout"
        : data.buttonTextKey
      : "checkout";

  return {
    ...defaults,
    top_bar: {
      ...defaults.top_bar,
      backgroundColor:
        typeof data.backgroundColor === "string"
          ? data.backgroundColor
          : defaults.top_bar.backgroundColor,
      textColor:
        typeof data.textColor === "string"
          ? data.textColor
          : defaults.top_bar.textColor,
    },
    timer: {
      ...defaults.timer,
      enabled:
        typeof data.enableTimer === "boolean"
          ? data.enableTimer
          : defaults.timer.enabled,
      minutes:
        typeof data.timerMinutes === "number"
          ? data.timerMinutes
          : defaults.timer.minutes,
    },
    free_shipping: {
      ...defaults.free_shipping,
      enabled:
        typeof data.enableFreeShippingBar === "boolean"
          ? data.enableFreeShippingBar
          : defaults.free_shipping.enabled,
      threshold:
        typeof data.freeShippingThreshold === "number"
          ? data.freeShippingThreshold
          : defaults.free_shipping.threshold,
    },
    dynamic_discounts: {
      ...defaults.dynamic_discounts,
      enabled:
        typeof data.enableDynamicDiscounts === "boolean"
          ? data.enableDynamicDiscounts
          : defaults.dynamic_discounts.enabled,
      rules: parseDiscountRules(data.discountRules),
    },
    upsell: {
      ...defaults.upsell,
      enabled:
        typeof data.enableUpsell === "boolean"
          ? data.enableUpsell
          : defaults.upsell.enabled,
      productIds: parseUpsellProductIds(data.upsellProductIds),
    },
    gift_wrap: {
      ...defaults.gift_wrap,
      enabled:
        typeof data.enableGiftWrap === "boolean"
          ? data.enableGiftWrap
          : defaults.gift_wrap.enabled,
      price:
        typeof data.giftWrapPrice === "number"
          ? data.giftWrapPrice
          : defaults.gift_wrap.price,
    },
    checkout_button: {
      ...defaults.checkout_button,
      text: buttonTextKey,
      textKey: buttonTextKey,
      color:
        typeof data.buttonColor === "string"
          ? data.buttonColor
          : defaults.checkout_button.color,
    },
  };
}

function parseModulesFromApi(data: Record<string, unknown>): {
  modules: ModulesState;
  moduleOrder: ModuleId[];
} {
  const defaults = createDefaultModules();
  const savedModules = parseJsonRecord(data.modules);
  const hasSavedModules =
    savedModules !== null && Object.keys(savedModules).length > 0;

  const modules = hasSavedModules
    ? mergeModules(defaults, savedModules)
    : migrateLegacyToModules(data, defaults);

  const parsedOrder = parseModuleOrder(data.moduleOrder);

  return {
    modules,
    moduleOrder: normalizeModuleOrder(parsedOrder),
  };
}

function modulesToLegacyPayload(modules: ModulesState) {
  const timer = modules.timer;
  const freeShipping = modules.free_shipping;
  const giftWrap = modules.gift_wrap;
  const upsell = modules.upsell;
  const dynamicDiscounts = modules.dynamic_discounts;
  const checkout = modules.checkout_button;
  const topBar = modules.top_bar;

  const textKey = String(checkout.textKey ?? checkout.text ?? "checkout");

  return {
    backgroundColor: String(topBar.backgroundColor ?? "#ffffff"),
    textColor: String(topBar.textColor ?? "#000000"),
    buttonColor: String(checkout.color ?? "#000000"),
    buttonTextKey: textKey,
    enableTimer: Boolean(timer.enabled),
    timerMinutes: Number(timer.minutes ?? 10),
    enableFreeShippingBar: Boolean(freeShipping.enabled),
    freeShippingThreshold: Number(freeShipping.threshold ?? 50),
    enableGiftWrap: Boolean(giftWrap.enabled),
    giftWrapPrice: Number(giftWrap.price ?? 5),
    enableUpsell: Boolean(upsell.enabled),
    upsellProductIds: parseUpsellProductIds(upsell.productIds),
    enableDynamicDiscounts: Boolean(dynamicDiscounts.enabled),
    discountRules: parseDiscountRules(dynamicDiscounts.rules),
  };
}

function getUpsellProductIds(modules: ModulesState): string[] {
  return parseUpsellProductIds(modules.upsell.productIds);
}

function getDiscountRules(modules: ModulesState): DiscountRule[] {
  return parseDiscountRules(modules.dynamic_discounts.rules);
}

function mapSubscriptionFromApi(data: Record<string, unknown>): Subscription {
  return {
    planName:
      typeof data.planName === "string"
        ? data.planName
        : DEFAULT_SUBSCRIPTION.planName,
    orderLimit:
      typeof data.orderLimit === "number"
        ? data.orderLimit
        : DEFAULT_SUBSCRIPTION.orderLimit,
    orderCount:
      typeof data.orderCount === "number"
        ? data.orderCount
        : DEFAULT_SUBSCRIPTION.orderCount,
    trialEndsAt:
      typeof data.trialEndsAt === "string" ? data.trialEndsAt : null,
    isActive:
      typeof data.isActive === "boolean"
        ? data.isActive
        : DEFAULT_SUBSCRIPTION.isActive,
    usedPercent:
      typeof data.usedPercent === "number"
        ? data.usedPercent
        : DEFAULT_SUBSCRIPTION.usedPercent,
  };
}

function getPlanLabelKey(planName: string): string {
  const normalized = planName.toLowerCase();
  if (normalized === "growth" || normalized === "pro") {
    return normalized;
  }
  return "starter";
}

function formatCountdown(totalSeconds: number): string {
  const safeSeconds = Math.max(0, totalSeconds);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function formatTrialDate(
  trialEndsAt: string | null,
  locale: string,
): string | null {
  if (!trialEndsAt) {
    return null;
  }

  const date = new Date(trialEndsAt);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toLocaleDateString(locale === "uk" ? "uk-UA" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatMoney(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

function calculateCartSubtotal(items: PreviewCartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function applyFirstDiscount(
  subtotal: number,
  enableDynamicDiscounts: boolean,
  discountRules: DiscountRule[],
): {
  total: number;
  discountAmount: number;
  appliedRule: DiscountRule | null;
} {
  if (!enableDynamicDiscounts || discountRules.length === 0) {
    return { total: subtotal, discountAmount: 0, appliedRule: null };
  }

  const rule = discountRules.find((entry) => subtotal >= entry.threshold) ?? null;
  if (!rule) {
    return { total: subtotal, discountAmount: 0, appliedRule: null };
  }

  if (rule.type === "percent") {
    const discountAmount = subtotal * (rule.value / 100);
    return {
      total: Math.max(0, subtotal - discountAmount),
      discountAmount,
      appliedRule: rule,
    };
  }

  if (rule.type === "fixed") {
    const discountAmount = Math.min(rule.value, subtotal);
    return {
      total: Math.max(0, subtotal - discountAmount),
      discountAmount,
      appliedRule: rule,
    };
  }

  return { total: subtotal, discountAmount: 0, appliedRule: rule };
}

// function getAppliedDiscountMessage(
//   rule: DiscountRule,
//   discountAmount: number,
//   t: (key: string, options?: Record<string, unknown>) => string,
// ): string {
//   if (rule.type === "percent") {
//     return t("saved_percent_amount", {
//       percent: rule.value,
//       amount: discountAmount.toFixed(2)
//     });
//   }
//   if (rule.type === "fixed") {
//     return t("saved_fixed_amount", {
//       amount: discountAmount.toFixed(2)
//     });
//   }
//   return t("saved_free_shipping");
// }
function getNextDiscountRule(
  subtotal: number,
  rules: DiscountRule[],
): DiscountRule | null {
  return (
    [...rules]
      .filter((rule) => rule.threshold > subtotal)
      .sort((a, b) => a.threshold - b.threshold)[0] ?? null
  );
}

function getUpcomingDiscountLabel(
  rule: DiscountRule,
  t: (key: string, options?: Record<string, unknown>) => string,
): string {
  if (rule.type === "percent") {
    return `${rule.value}% off`;
  }
  if (rule.type === "fixed") {
    return `$${rule.value} off`;
  }
  return t("free_shipping_discount").toLowerCase();
}

// Возвращает только текст скидки (без суммы)
function getAppliedDiscountLabel(
  rule: DiscountRule,
  t: (key: string, options?: Record<string, unknown>) => string,
): string {
  if (rule.type === "percent") {
    return t("saved_percent", { value: rule.value });
  }
  if (rule.type === "fixed") {
    return t("saved_fixed", { value: rule.value });
  }
  return t("saved_free_shipping");
}

// Возвращает отформатированную сумму скидки со знаком минус
function getDiscountAmountDisplay(discountAmount: number): string {
  return `- ${formatMoney(discountAmount)}`;
}

function discountTypeLabel(type: DiscountType, t: (key: string) => string): string {
  if (type === "percent") {
    return t("percent");
  }
  if (type === "fixed") {
    return t("fixed");
  }
  return t("free_shipping_discount");
}

function mapPickerProduct(product: {
  id: string;
  title?: string;
  handle?: string;
  images?: Array<{ originalSrc?: string; url?: string }>;
  variants?: Array<{ price?: string }>;
}): UpsellProduct {
  return {
    id: product.id,
    title: product.title ?? product.id,
    handle: product.handle ?? "",
    price: parsePrice(product.variants?.[0]?.price),
    imageUrl: product.images?.[0]?.originalSrc ?? product.images?.[0]?.url ?? null,
  };
}

// function TrashIcon() {
//   return (
//     <svg
//       width="16"
//       height="16"
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       aria-hidden="true"
//     >
//       <path
//         d="M6 6V4.5C6 3.67157 6.67157 3 7.5 3H12.5C13.3284 3 14 3.67157 14 4.5V6M4 6H16M7 6V16.5C7 17.3284 7.67157 18 8.5 18H11.5C12.3284 18 13 17.3284 13 16.5V6"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// }

function TrustBadges({
  badges,
  textColor,
}: {
  badges: string[];
  textColor?: string;
}) {
  const labelMap: Record<string, string> = {
    visa: "VISA",
    paypal: "PayPal",
    mc: "MC",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "12px",
        alignItems: "center",
        paddingTop: "4px",
      }}
    >
      {badges.map((badge) => (
        <span
          key={badge}
          style={{
            ...PREVIEW_STYLE.trustBadge,
            color: textColor ?? PREVIEW_STYLE.trustBadge.color,
          }}
        >
          {labelMap[badge] ?? badge.toUpperCase()}
        </span>
      ))}
    </div>
  );
}

type ModuleAccordionCardProps = {
  id: ModuleId;
  label: string;
  enabled: boolean;
  expanded: boolean;
  onToggleEnabled: (checked: boolean) => void;
  onToggleExpanded: () => void;
  dragHandleProps?: HTMLAttributes<HTMLDivElement>;
  toggleDisabled?: boolean;
  showUpgradeHint?: boolean;
  children: ReactNode;
};

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
      className={`${styles.moduleToggle} ${checked ? styles.moduleToggleOn : ""} ${disabled ? styles.moduleToggleDisabled : ""}`}
      onClick={(event) => {
        event.stopPropagation();
        if (disabled) {
          return;
        }
        onChange(!checked);
      }}
    >
      <span className={styles.moduleToggleKnob} />
    </button>
  );
}

function ModuleAccordionCard({
  id,
  label,
  enabled,
  expanded,
  onToggleEnabled,
  onToggleExpanded,
  dragHandleProps,
  toggleDisabled = false,
  showUpgradeHint = false,
  children,
}: ModuleAccordionCardProps) {
  const ModuleIcon = MODULE_ICONS[id];
  const { t } = useTranslation();
  return (
    <Card padding="0">
      <div className={styles.moduleCard} onClick={onToggleExpanded}>
        <div className={styles.moduleCardHeader}>
          <div
            className={styles.moduleDragHandle}
            {...dragHandleProps}
            onClick={(event) => event.stopPropagation()}
            aria-label="Drag to reorder"
          >
            <GripVertical size={20} color="#888888" />
          </div>
          <span className={styles.moduleIcon} aria-hidden="true">
            <ModuleIcon size={16} color="#888888" />
          </span>
          <span className={styles.moduleTitle}>{label}</span>
          <div className={styles.moduleCardActions}>
            <InlineStack gap="200" blockAlign="center">
              <ModuleToggle
                checked={enabled}
                onChange={onToggleEnabled}
                label={label}
                disabled={toggleDisabled}
              />
              {showUpgradeHint && (
                <Text as="span" tone="subdued">
                  <span className={styles.lockedBadge}>🔒 {t('upgrade')}</span>
                </Text>
              )}
            </InlineStack>
          </div>
          <ChevronDown
            size={20}
            color="#888888"
            className={`${styles.moduleChevron} ${expanded ? styles.moduleChevronExpanded : ""}`}
            aria-hidden="true"
          />
        </div>
        <Collapsible
          open={expanded}
          id={`module-collapsible-${id}`}
          transition={{ duration: "200ms", timingFunction: "ease-in-out" }}
        >
          <div
            className={styles.moduleSettings}
            onClick={(event) => event.stopPropagation()}
          >
            <BlockStack gap="400">{children}</BlockStack>
          </div>
        </Collapsible>
      </div>
    </Card>
  );
}

function SortableModuleAccordionCard(
  props: Omit<ModuleAccordionCardProps, "dragHandleProps">,
) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <ModuleAccordionCard
        {...props}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
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
              className={`${styles.colorSwatch} ${disabled ? styles.colorSwatchDisabled : ""}`}
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


export default function AppIndex() {
  const { t, i18n } = useTranslation();
  const shopify = useAppBridge();
  const { cartProducts, upsellProducts: loaderUpsellProducts, isAllowed, reason } =
    useLoaderData<typeof loader>();
  const upsellFetcher = useFetcher<UpsellLoaderData>();

  const [modules, setModules] = useState<ModulesState>(createDefaultModules());
  const [moduleOrder, setModuleOrder] = useState<ModuleId[]>([
    ...DEFAULT_MODULE_ORDER,
  ]);
  const [expandedModules, setExpandedModules] = useState<
    Partial<Record<ModuleId, boolean>>
  >({});
  const [upsellProducts, setUpsellProducts] = useState<UpsellProduct[]>(
    loaderUpsellProducts,
  );
  const [hiddenPreviewUpsellIds, setHiddenPreviewUpsellIds] = useState<string[]>(
    [],
  );
  const [upsellCarouselIndex, setUpsellCarouselIndex] = useState(0);
  const [previewCartItems, setPreviewCartItems] = useState<PreviewCartItem[]>([]);
  const [subscription, setSubscription] = useState<Subscription>(
    DEFAULT_SUBSCRIPTION,
  );
  const [newDiscountRule, setNewDiscountRule] = useState<DiscountRule>({
    threshold: 100,
    type: "percent",
    value: 10,
  });
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(600);
  const timerExpiredHandledRef = useRef(false);
  const [orderNotes, setOrderNotes] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);
  const [showResetSuccess, setShowResetSuccess] = useState(false);

  const upsellProductIds = useMemo(
    () => getUpsellProductIds(modules),
    [modules],
  );
  const discountRules = useMemo(() => getDiscountRules(modules), [modules]);
  const upsellProductIdsKey = upsellProductIds.join(",");
  const isDefaultSettings = useMemo(
    () => isCartSettingsDefault(modules, moduleOrder),
    [modules, moduleOrder],
  );
  const globalTextColor = String(modules.top_bar.textColor ?? "#000000");
  const backgroundColor = modules.top_bar.backgroundColor ?? "#ffffff";
  const previewTextStyle = useMemo(
    () => ({ color: globalTextColor }),
    [globalTextColor],
  );

  const updateModule = useCallback(
    (id: ModuleId, patch: Partial<ModuleEntry>) => {
      setModules((prev) => ({
        ...prev,
        [id]: { ...prev[id], ...patch },
      }));
    },
    [],
  );

  const resetTimerIfNeeded = useCallback(() => {
    if (
      modules.timer.enabled &&
      String(modules.timer.behavior ?? "remove_items") === "reset_on_add"
    ) {
      const minutes = Number(modules.timer.minutes ?? 10);
      setTimerSecondsLeft(minutes * 60);
      timerExpiredHandledRef.current = false;
    }
  }, [modules.timer.enabled, modules.timer.behavior, modules.timer.minutes]);

  const toggleModuleExpanded = useCallback((id: ModuleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    setModuleOrder((items) => {
      const oldIndex = items.indexOf(active.id as ModuleId);
      const newIndex = items.indexOf(over.id as ModuleId);
      if (oldIndex === -1 || newIndex === -1) {
        return items;
      }
      return arrayMove(items, oldIndex, newIndex);
    });
  }, []);

  useEffect(() => {
    setPreviewCartItems(
      cartProducts.map((product) => ({
        ...product,
        quantity: 1,
      })),
    );
  }, [cartProducts]);

  useEffect(() => {
    if (!modules.timer.enabled) {
      timerExpiredHandledRef.current = false;
      return;
    }

    const minutes = Number(modules.timer.minutes ?? 10);
    setTimerSecondsLeft(minutes * 60);
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
  }, [modules.timer.enabled, modules.timer.minutes]);

  useEffect(() => {
    if (!modules.timer.enabled || timerSecondsLeft > 0) {
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
      setPreviewCartItems([]);
    } else if (behavior === "hide_timer") {
      updateModule("timer", { enabled: false });
    }
  }, [
    timerSecondsLeft,
    modules.timer.enabled,
    modules.timer.behavior,
    updateModule,
  ]);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const [settingsResponse, subscriptionResponse] = await Promise.all([
          fetch("/api/settings"),
          fetch("/api/subscription"),
        ]);

        if (!settingsResponse.ok) {
          const payload = (await settingsResponse.json()) as { error?: string };
          throw new Error(payload.error || t("load_error"));
        }

        if (!subscriptionResponse.ok) {
          const payload = (await subscriptionResponse.json()) as {
            error?: string;
          };
          throw new Error(payload.error || t("load_error"));
        }

        const settingsData = (await settingsResponse.json()) as Record<
          string,
          unknown
        >;
        const subscriptionData = (await subscriptionResponse.json()) as Record<
          string,
          unknown
        >;

        if (!cancelled) {
          const parsed = parseModulesFromApi(settingsData);
          setModules(parsed.modules);
          setModuleOrder(parsed.moduleOrder);
          setSubscription(mapSubscriptionFromApi(subscriptionData));
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error ? loadError.message : t("load_error"),
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadData();

    return () => {
      cancelled = true;
    };
  }, [t]);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (upsellProductIds.length === 0) {
      setUpsellProducts([]);
      return;
    }

    const loadedIds = [...upsellProducts.map((product) => product.id)].sort().join(",");
    const targetIds = [...upsellProductIds].sort().join(",");
    if (loadedIds === targetIds && upsellProducts.length > 0) {
      return;
    }

    upsellFetcher.load(
      `/app?intent=upsell&productIds=${encodeURIComponent(upsellProductIdsKey)}`,
    );
  }, [loading, upsellProductIdsKey]);

  useEffect(() => {
    setHiddenPreviewUpsellIds((prev) =>
      prev.filter((id) => upsellProductIds.includes(id)),
    );
  }, [upsellProductIdsKey, upsellProductIds]);

  useEffect(() => {
    if (upsellFetcher.data?.upsellProducts) {
      setUpsellProducts(upsellFetcher.data.upsellProducts);
    }
  }, [upsellFetcher.data]);

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    setShowSuccess(false);

    try {
      const legacyPayload = modulesToLegacyPayload(modules);
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          modules,
          moduleOrder,
          ...legacyPayload,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error || t("save_error"));
      }

      const savedSettings = (await response.json()) as Record<string, unknown>;
      const parsed = parseModulesFromApi(savedSettings);
      setModules(parsed.modules);
      setModuleOrder(parsed.moduleOrder);

      if (getUpsellProductIds(parsed.modules).length > 0) {
        upsellFetcher.load(
          `/app?intent=upsell&productIds=${encodeURIComponent(
            getUpsellProductIds(parsed.modules).join(","),
          )}`,
        );
      } else {
        setUpsellProducts([]);
      }

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
      const response = await fetch("/api/settings", {
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
      const parsed = parseModulesFromApi(savedSettings);
      setModules(parsed.modules);
      setModuleOrder(parsed.moduleOrder);
      setExpandedModules({});
      setOrderNotes("");
      setDiscountCode("");
      setAppliedCouponCode(null);
      setHiddenPreviewUpsellIds([]);
      setUpsellCarouselIndex(0);

      if (getUpsellProductIds(parsed.modules).length > 0) {
        upsellFetcher.load(
          `/app?intent=upsell&productIds=${encodeURIComponent(
            getUpsellProductIds(parsed.modules).join(","),
          )}`,
        );
      } else {
        setUpsellProducts([]);
      }

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

  const handleSelectProducts = async () => {
    try {
      type PickerProduct = {
        id: string;
        title?: string;
        images?: Array<{ originalSrc?: string; url?: string }>;
        variants?: Array<{ price?: string }>;
      };

      const selected = await shopify.resourcePicker({
        type: "product",
        multiple: true,
        selectionIds: upsellProductIds.map((id) => ({ id })),
      });

      if (!selected) {
        return;
      }

      const selection: PickerProduct[] = Array.isArray(selected)
        ? (selected as PickerProduct[])
        : [];

      const products = selection.map((product: PickerProduct) =>
        mapPickerProduct(product),
      );

      setUpsellProducts(products);
      updateModule("upsell", {
        productIds: products.map((product) => product.id),
      });
    } catch {
      // Merchant cancelled or picker unavailable
    }
  };

  const handleRemoveUpsellProduct = (productId: string) => {
    setUpsellProducts((prev) => prev.filter((product) => product.id !== productId));
    updateModule("upsell", {
      productIds: upsellProductIds.filter((id) => id !== productId),
    });
  };

  const handleAddDiscountRule = () => {
    updateModule("dynamic_discounts", {
      rules: [...discountRules, { ...newDiscountRule }],
    });
  };

  const handleRemoveDiscountRule = (index: number) => {
    updateModule("dynamic_discounts", {
      rules: discountRules.filter((_, ruleIndex) => ruleIndex !== index),
    });
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setPreviewCartItems((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );

    if (delta > 0) {
      resetTimerIfNeeded();
    }
  };

  const handleSetCartQuantity = (productId: string, rawQuantity: string) => {
    const quantity = Number.parseInt(rawQuantity, 10);
    if (!Number.isFinite(quantity) || quantity < 1) {
      return;
    }

    setPreviewCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setPreviewCartItems((prev) =>
      prev.filter((item) => item.id !== productId),
    );
  };

  const handleAddUpsellToCart = (product: StoreProduct) => {
    setPreviewCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setHiddenPreviewUpsellIds((prev) =>
      prev.includes(product.id) ? prev : [...prev, product.id],
    );
    resetTimerIfNeeded();
  };

  const planLabelKey = getPlanLabelKey(subscription.planName);
  const trialDate = formatTrialDate(subscription.trialEndsAt, i18n.language);


  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
  };

  const isPaidModule = (moduleId: ModuleId) =>
    PAID_MODULE_IDS.includes(moduleId);
  const isModuleFieldsDisabled = (moduleId: ModuleId) =>
    isPaidModule(moduleId) && !isAllowed;

  const lockedFieldHelpText = (fieldsDisabled: boolean, existing?: string) =>
    fieldsDisabled ? `🔒 ${t('available_in_paid')}` : existing ?? undefined;

  const cartSubtotal = useMemo(
    () => calculateCartSubtotal(previewCartItems),
    [previewCartItems],
  );

  const { total: afterDynamicDiscount, discountAmount, appliedRule } = useMemo(
    () =>
      applyFirstDiscount(
        cartSubtotal,
        Boolean(modules.dynamic_discounts.enabled),
        discountRules,
      ),
    [cartSubtotal, modules.dynamic_discounts.enabled, discountRules],
  );

  const couponDiscountAmount = useMemo(() => {
    if (!appliedCouponCode) {
      return 0;
    }
    return cartSubtotal * 0.1;
  }, [appliedCouponCode, cartSubtotal]);

  const discountedSubtotal = useMemo(
    () => Math.max(0, afterDynamicDiscount - couponDiscountAmount),
    [afterDynamicDiscount, couponDiscountAmount],
  );

  const handleApplyDiscountCode = useCallback(() => {
    const code = discountCode.trim();
    if (!code) {
      setAppliedCouponCode(null);
      return;
    }
    setAppliedCouponCode(code);
  }, [discountCode]);

  const freeShippingThreshold = Number(modules.free_shipping.threshold ?? 50);

  const freeShippingUnlocked =
    Boolean(modules.free_shipping.enabled) &&
    (cartSubtotal >= freeShippingThreshold ||
      appliedRule?.type === "free_shipping");

  const shippingProgress = modules.free_shipping.enabled
    ? freeShippingUnlocked
      ? 100
      : Math.min(
        (cartSubtotal / Math.max(freeShippingThreshold, 1)) * 100,
        100,
      )
    : 0;

  const shippingRemaining = Math.max(freeShippingThreshold - cartSubtotal, 0);

  const displayedUpsellProducts = useMemo(() => {
    return upsellProductIds
      .map((id) => upsellProducts.find((product) => product.id === id))
      .filter((product): product is UpsellProduct => product !== undefined);
  }, [upsellProductIds, upsellProducts]);

  const previewUpsellProducts = useMemo(() => {
    if (!modules.upsell.enabled || upsellProductIds.length === 0) {
      return [];
    }
    return displayedUpsellProducts.filter(
      (product) => !hiddenPreviewUpsellIds.includes(product.id),
    );
  }, [
    modules.upsell.enabled,
    upsellProductIds.length,
    displayedUpsellProducts,
    hiddenPreviewUpsellIds,
  ]);

  useEffect(() => {
    setUpsellCarouselIndex(0);
  }, [previewUpsellProducts.length, modules.upsell.layout]);

  const checkoutTextKey = String(
    modules.checkout_button.textKey ?? modules.checkout_button.text ?? "checkout",
  );

  const timerBehaviorOptions = useMemo(
    () => [
      { label: "Remove items", value: "remove_items" },
      { label: "Hide timer", value: "hide_timer" },
      { label: t("timer_behavior_reset"), value: "reset_on_add" },
    ],
    [t],
  );

  const upsellLayoutOptions = useMemo(
    () => [
      { label: t("horizontal"), value: "horizontal" },
      { label: t("carousel"), value: "carousel" },
      { label: t("upsell_grid"), value: "grid" },
    ],
    [t],
  );

  const titleAlignOptions = useMemo(
    () => [
      { label: t("align_left"), value: "left" },
      { label: t("align_center"), value: "center" },
      { label: t("align_right"), value: "right" },
    ],
    [t],
  );

  const renderModuleSettings = (moduleId: ModuleId) => {
    const fieldsDisabled = isModuleFieldsDisabled(moduleId);

    switch (moduleId) {
      case "top_bar":
        return (
          <>
            <TextField
              label={t("module_top_bar")}
              value={String(modules.top_bar.title ?? "")}
              onChange={(value) => updateModule("top_bar", { title: value })}
              autoComplete="off"
            />
            <Checkbox
              label={t("show_item_count")}
              checked={Boolean(modules.top_bar.showItemCount)}
              onChange={(checked) =>
                updateModule("top_bar", { showItemCount: checked })
              }
            />
          </>
        );
      case "timer":
        return (
          <>
            <TextField
              label={t("timer_minutes")}
              type="number"
              value={String(modules.timer.minutes ?? 10)}
              onChange={(value) =>
                updateModule("timer", { minutes: Number(value) || 0 })
              }
              autoComplete="off"
              min={1}
              disabled={fieldsDisabled}
              helpText={lockedFieldHelpText(fieldsDisabled)}
            />
            <TextField
              label={t("timer_text")}
              value={String(modules.timer.text ?? "")}
              onChange={(value) => updateModule("timer", { text: value })}
              autoComplete="off"
              helpText={lockedFieldHelpText(fieldsDisabled, "{{timer}}")}
              disabled={fieldsDisabled}
            />
            <ColorField
              label={t("text_color")}
              value={String(modules.timer.textColor ?? "#000000")}
              onChange={(value) => updateModule("timer", { textColor: value })}
              disabled={fieldsDisabled}
              helpText={lockedFieldHelpText(fieldsDisabled)}
            />
            <ColorField
              label={t("background_color")}
              value={String(modules.timer.backgroundColor ?? "#f5f5f5")}
              onChange={(value) =>
                updateModule("timer", { backgroundColor: value })
              }
              disabled={fieldsDisabled}
              helpText={lockedFieldHelpText(fieldsDisabled)}
            />
            <Select
              label={t("timer_behavior")}
              options={timerBehaviorOptions}
              value={String(modules.timer.behavior ?? "remove_items")}
              onChange={(value) => updateModule("timer", { behavior: value })}
              disabled={fieldsDisabled}
              helpText={lockedFieldHelpText(fieldsDisabled)}
            />
          </>
        );
      case "free_shipping":
        return (
          <>
            <TextField
              label={t("shipping_threshold")}
              type="number"
              value={String(modules.free_shipping.threshold ?? 50)}
              onChange={(value) =>
                updateModule("free_shipping", {
                  threshold: Number(value) || 0,
                })
              }
              autoComplete="off"
              min={0}
            />
            <TextField
              label={t("free_shipping")}
              value={String(modules.free_shipping.text ?? "")}
              onChange={(value) =>
                updateModule("free_shipping", { text: value })
              }
              autoComplete="off"
              helpText="$X"
            />
            <ColorField
              label={t("bar_color")}
              value={String(modules.free_shipping.barColor ?? "#000000")}
              onChange={(value) =>
                updateModule("free_shipping", { barColor: value })
              }
            />
          </>
        );
      case "cart_products":
        return (
          <Text as="p" tone="subdued">
            {t("cart_products_hint")}
          </Text>
        );
      case "dynamic_discounts":
        return (
          <>
            <TextField
              label={t("threshold")}
              type="number"
              value={String(newDiscountRule.threshold)}
              onChange={(value) =>
                setNewDiscountRule((prev) => ({
                  ...prev,
                  threshold: Number(value) || 0,
                }))
              }
              autoComplete="off"
              min={0}
              disabled={fieldsDisabled}
              helpText={lockedFieldHelpText(fieldsDisabled)}
            />
            <Select
              label={t("discount_type")}
              options={discountTypeOptions}
              value={newDiscountRule.type}
              onChange={(value) =>
                setNewDiscountRule((prev) => ({
                  ...prev,
                  type: value as DiscountType,
                }))
              }
              disabled={fieldsDisabled}
              helpText={lockedFieldHelpText(fieldsDisabled)}
            />
            {newDiscountRule.type !== "free_shipping" && (
              <TextField
                label={t("discount_value")}
                type="number"
                value={String(newDiscountRule.value)}
                onChange={(value) =>
                  setNewDiscountRule((prev) => ({
                    ...prev,
                    value: Number(value) || 0,
                  }))
                }
                autoComplete="off"
                min={0}
                disabled={fieldsDisabled}
                helpText={lockedFieldHelpText(fieldsDisabled)}
              />
            )}
            <Button onClick={handleAddDiscountRule} disabled={fieldsDisabled}>
              {t("add_rule")}
            </Button>
            <ColorField
              label={t("progress_bar_color")}
              value={String(modules.dynamic_discounts.barColor ?? "#000000")}
              onChange={(value) =>
                updateModule("dynamic_discounts", { barColor: value })
              }
              disabled={fieldsDisabled}
              helpText={lockedFieldHelpText(fieldsDisabled)}
            />
            {discountRules.length > 0 && (
              <BlockStack gap="200">
                {discountRules.map((rule, index) => (
                  <InlineStack
                    key={`${rule.threshold}-${rule.type}-${index}`}
                    align="space-between"
                    blockAlign="center"
                    wrap={false}
                  >
                    <Text as="span">
                      {formatMoney(rule.threshold)} ·{" "}
                      {discountTypeLabel(rule.type, t)}
                      {rule.type !== "free_shipping"
                        ? ` · ${rule.value}${rule.type === "percent" ? "%" : ""}`
                        : ""}
                    </Text>
                    <Button
                      variant="plain"
                      onClick={() => handleRemoveDiscountRule(index)}
                      disabled={fieldsDisabled}
                    >
                      {t("remove")}
                    </Button>
                  </InlineStack>
                ))}
              </BlockStack>
            )}
          </>
        );
      case "upsell": {
        const upsellSettings = normalizeUpsellModule(
          modules.upsell as Record<string, unknown>,
        );
        return (
          <>
            <Select
              label={t("upsell_layout")}
              options={upsellLayoutOptions}
              value={upsellSettings.layout}
              onChange={(value) => updateModule("upsell", { layout: value })}
              disabled={fieldsDisabled}
              helpText={lockedFieldHelpText(fieldsDisabled)}
            />
            <TextField
              label={t("upsell_count")}
              type="number"
              value={String(upsellSettings.count)}
              onChange={(value) =>
                updateModule("upsell", { count: Number(value) || 0 })
              }
              autoComplete="off"
              min={0}
              helpText={lockedFieldHelpText(fieldsDisabled, t("upsell_count_help"))}
              disabled={fieldsDisabled}
            />
            <Text as="p" variant="bodyMd" fontWeight="semibold">
              {t("upsell_header_settings")}
            </Text>
            <TextField
              label={t("upsell_title")}
              value={upsellSettings.title}
              onChange={(value) => updateModule("upsell", { title: value })}
              autoComplete="off"
              disabled={fieldsDisabled}
              helpText={lockedFieldHelpText(fieldsDisabled)}
            />
            <Select
              label={t("title_alignment")}
              options={titleAlignOptions}
              value={upsellSettings.titleAlign}
              onChange={(value) =>
                updateModule("upsell", { titleAlign: value })
              }
              disabled={fieldsDisabled}
              helpText={lockedFieldHelpText(fieldsDisabled)}
            />
            <ColorField
              label={t("title_color")}
              value={upsellSettings.titleColor}
              onChange={(value) =>
                updateModule("upsell", { titleColor: value })
              }
              disabled={fieldsDisabled}
            />
            <TextField
              label={t("title_font_size")}
              type="number"
              value={String(upsellSettings.titleFontSize)}
              onChange={(value) =>
                updateModule("upsell", {
                  titleFontSize: Number(value) || DEFAULT_UPSELL_MODULE.titleFontSize,
                })
              }
              autoComplete="off"
              min={10}
              disabled={fieldsDisabled}
              helpText={lockedFieldHelpText(fieldsDisabled)}
            />
            <Text as="p" variant="bodyMd" fontWeight="semibold">
              {t("upsell_button_settings")}
            </Text>
            <TextField
              label={t("button_text")}
              value={upsellSettings.buttonText}
              onChange={(value) =>
                updateModule("upsell", { buttonText: value })
              }
              autoComplete="off"
              disabled={fieldsDisabled}
              helpText={lockedFieldHelpText(fieldsDisabled)}
            />
            <ColorField
              label={t("button_color")}
              value={upsellSettings.buttonColor}
              onChange={(value) =>
                updateModule("upsell", { buttonColor: value })
              }
              disabled={fieldsDisabled}
            />
            <ColorField
              label={t("button_text_color")}
              value={upsellSettings.buttonTextColor}
              onChange={(value) =>
                updateModule("upsell", { buttonTextColor: value })
              }
              disabled={fieldsDisabled}
            />
            <Text as="p" variant="bodyMd" fontWeight="semibold">
              {t("upsell_styles")}
            </Text>
            <ColorField
              label={t("background_color")}
              value={upsellSettings.backgroundColor}
              onChange={(value) =>
                updateModule("upsell", { backgroundColor: value })
              }
              disabled={fieldsDisabled}
            />
            <ColorField
              label={t("product_name_color")}
              value={upsellSettings.textColor}
              onChange={(value) => updateModule("upsell", { textColor: value })}
              disabled={fieldsDisabled}
            />
            <ColorField
              label={t("price_color")}
              value={upsellSettings.text2Color}
              onChange={(value) =>
                updateModule("upsell", { text2Color: value })
              }
              disabled={fieldsDisabled}
            />
            <ColorField
              label={t("arrows_color")}
              value={upsellSettings.arrowsColor}
              onChange={(value) =>
                updateModule("upsell", { arrowsColor: value })
              }
              disabled={fieldsDisabled}
            />
            <Button
              onClick={() => void handleSelectProducts()}
              disabled={fieldsDisabled}
            >
              {t("select_products")}
            </Button>
            {upsellProductIds.length > 0 && (
              <BlockStack gap="200">
                <Text as="p" variant="bodyMd" fontWeight="semibold">
                  {t("selected_products")}
                </Text>
                {upsellFetcher.state === "loading" &&
                  displayedUpsellProducts.length === 0 ? (
                  <InlineStack gap="200" blockAlign="center">
                    <Spinner size="small" />
                    <Text as="span" tone="subdued">
                      {t("loading")}
                    </Text>
                  </InlineStack>
                ) : (
                  displayedUpsellProducts.map((product) => (
                    <InlineStack
                      key={product.id}
                      align="space-between"
                      blockAlign="center"
                      wrap={false}
                    >
                      <BlockStack gap="100">
                        <Text as="span">{product.title}</Text>
                        <Text as="span" tone="subdued">
                          {formatMoney(product.price)}
                        </Text>
                      </BlockStack>
                      <Button
                        variant="plain"
                        onClick={() => handleRemoveUpsellProduct(product.id)}
                        disabled={fieldsDisabled}
                      >
                        {t("remove")}
                      </Button>
                    </InlineStack>
                  ))
                )}
              </BlockStack>
            )}
          </>
        );
      }
      case "trust_badges":
        return (
          <TextField
            label={t("module_trust_badges")}
            value={(modules.trust_badges.badges as string[] | undefined)?.join(
              ", ",
            ) ?? "visa, paypal, mc"}
            onChange={(value) =>
              updateModule("trust_badges", {
                badges: value
                  .split(",")
                  .map((badge) => badge.trim())
                  .filter(Boolean),
              })
            }
            autoComplete="off"
            helpText="visa, paypal, mc"
          />
        );
      case "gift_wrap":
        return (
          <>
            <TextField
              label={t("gift_wrap_price")}
              type="number"
              value={String(modules.gift_wrap.price ?? 5)}
              onChange={(value) =>
                updateModule("gift_wrap", { price: Number(value) || 0 })
              }
              autoComplete="off"
              min={0}
              disabled={fieldsDisabled}
              helpText={lockedFieldHelpText(fieldsDisabled)}
            />
            <TextField
              label={t("gift_wrap")}
              value={String(modules.gift_wrap.text ?? "")}
              onChange={(value) => updateModule("gift_wrap", { text: value })}
              autoComplete="off"
              disabled={fieldsDisabled}
              helpText={lockedFieldHelpText(fieldsDisabled)}
            />
          </>
        );
      case "order_notes":
        return (
          <TextField
            label={t("placeholder")}
            value={String(modules.order_notes.placeholder ?? "")}
            onChange={(value) =>
              updateModule("order_notes", { placeholder: value })
            }
            autoComplete="off"
          />
        );
      case "discount_code":
        return (
          <TextField
            label={t("placeholder")}
            value={String(modules.discount_code.placeholder ?? "")}
            onChange={(value) =>
              updateModule("discount_code", { placeholder: value })
            }
            autoComplete="off"
          />
        );
      case "discounts_row":
        return (
          <Text as="p" tone="subdued">
            {t("discounts")}
          </Text>
        );
      case "subtotal_row":
        return (
          <TextField
            label={t("subtotal_format")}
            value={String(modules.subtotal_row.format ?? "")}
            onChange={(value) =>
              updateModule("subtotal_row", { format: value })
            }
            autoComplete="off"
            helpText="{{amount}}"
          />
        );
      case "checkout_button":
        return (
          <>
            <TextField
              label={t("button_text")}
              value={checkoutTextKey}
              onChange={(value) =>
                updateModule("checkout_button", { text: value, textKey: value })
              }
              helpText={t(checkoutTextKey, { defaultValue: checkoutTextKey })}
              autoComplete="off"
            />
            <ColorField
              label={t("button_color")}
              value={String(modules.checkout_button.color ?? "#000000")}
              onChange={(value) =>
                updateModule("checkout_button", { color: value })
              }
            />
            <ColorField
              label={t("button_text_color")}
              value={String(modules.checkout_button.textColor ?? "#ffffff")}
              onChange={(value) =>
                updateModule("checkout_button", { textColor: value })
              }
            />
            <TextField
              label={t("border_radius")}
              value={String(modules.checkout_button.borderRadius ?? "4px")}
              onChange={(value) =>
                updateModule("checkout_button", { borderRadius: value })
              }
              placeholder="4px"
              autoComplete="off"
            />
          </>
        );
      case "footer":
        return (
          <TextField
            label={t("footer_text")}
            value={String(modules.footer.text ?? "")}
            onChange={(value) => updateModule("footer", { text: value })}
            autoComplete="off"
          />
        );
      default:
        return null;
    }
  };

  const renderCartItemsPreview = () => {
    if (previewCartItems.length === 0) {
      return (
        <p style={{ ...previewTextStyle, margin: 0, fontSize: "13px" }}>
          {t("no_products")}
        </p>
      );
    }

    return previewCartItems.map((item) => (
      <div
        key={item.id}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "13px",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            style={{
              width: "60px",
              height: "60px",
              objectFit: "cover",
              borderRadius: "6px",
              border: "1px solid #e0e0e0",
            }}
          />
        ) : (
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "6px",
              backgroundColor: "#e0e0e0",
            }}
          />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
        <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        <span style={{ fontWeight: 500, color: globalTextColor }}>{item.title}</span>
        <span style={{ color: globalTextColor }}>
          {formatMoney(item.price * item.quantity)}
        </span>
      </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              marginTop: "6px",
            }}
          >
            <button
              type="button"
              className={styles.qtyBtn}
              onClick={() => handleUpdateCartQuantity(item.id, -1)}
              aria-label="-"
              style={{
                color: globalTextColor,
                borderColor: "rgba(128, 128, 128, 0.5)", // всегда виден
              }}
            >
              −
            </button>
            <span
            style={{
              width: "30px",
              height: "24px",
              textAlign: "center",
              fontSize: "12px",
              lineHeight: "24px",
              color: globalTextColor,
            }}
          >
            {item.quantity}
          </span>
            <button
              type="button"
              className={styles.qtyBtn}
              onClick={() => handleUpdateCartQuantity(item.id, 1)}
              aria-label="+"
              style={{
                color: globalTextColor,
                borderColor: "rgba(128, 128, 128, 0.5)", // всегда виден
              }}
            >
              +
            </button>
            <button
              type="button"
              className={styles.removeBtn}
              style={{ marginLeft: "auto" }}
              onClick={() => handleRemoveFromCart(item.id)}
              aria-label={t("remove")}
            >
              <TrashIcon size={16} aria-hidden="true" style={{ color: globalTextColor }} />
            </button>
          </div>
        </div>
      </div>
    ));
  };

  const renderPreviewModule = (moduleId: ModuleId) => {
    const mod = modules[moduleId];
    if (!mod.enabled) {
      return null;
    }

    switch (moduleId) {
      case "top_bar": {
        const itemCount = previewCartItems.reduce(
          (sum, item) => sum + item.quantity,
          0,
        );
        const title = String(mod.title ?? "My cart");
        return (
          <div
            key={moduleId}
            className={styles.previewHeader}
            style={{
              borderColor: "rgba(128, 128, 128, 0.5)", // всегда виден
            }}
          >
            <p className={styles.previewTitle} style={previewTextStyle}>
              {title}
              {mod.showItemCount ? ` (${itemCount})` : ""}
            </p>
          </div>
        );
      }
      case "timer": {
        const timerText = String(mod.text ?? "").replace(
          "{{timer}}",
          formatCountdown(timerSecondsLeft),
        );
        return (
          <div
            key={moduleId}
            className={styles.previewTimer}
            style={{
              backgroundColor: String(mod.backgroundColor ?? "#f5f5f5"),
              color: String(mod.textColor ?? globalTextColor),
            }}
          >
            {timerText || t("timer_remaining", { time: formatCountdown(timerSecondsLeft) })}
          </div>
        );
      }
      case "free_shipping": {
        const remainingAmount = `$${shippingRemaining.toFixed(0)}`;
        const freeShippingText = freeShippingUnlocked
          ? t("free_shipping_unlocked")
          : String(mod.text ?? "").replace("$X", remainingAmount) ||
          t("free_shipping_progress", {
            amount: shippingRemaining.toFixed(0),
          });
        return (
          <div key={moduleId} className={styles.previewShipping}>
            <p
              className={styles.previewShippingTextBold}
              style={{ color: globalTextColor }}
            >
              {freeShippingText}
            </p>
            <div className={styles.previewShippingBarWrap}>
              <div
                className={styles.previewShippingBar}
                style={PREVIEW_STYLE.progressTrack}
              >
                <div
                  className={styles.previewShippingFill}
                  style={{
                    backgroundColor: String(mod.barColor ?? "#000000"),
                    width: `${shippingProgress}%`,
                  }}
                />
              </div>
              <Truck size={16}  aria-hidden="true" style={{ color: globalTextColor }} />
            </div>
          </div>
        );
      }
      case "cart_products":
        return (
          <Fragment key={moduleId}>{renderCartItemsPreview()}</Fragment>
        );
      case "dynamic_discounts": {
        if (discountRules.length === 0) {
          return null;
        }

        const nextRule = getNextDiscountRule(cartSubtotal, discountRules);

        if (!nextRule) {
          return (
            <></>
            // <p
            //   key={moduleId}
            //   className={styles.previewDynamicDiscountText}
            //   style={{ color: globalTextColor }}
            // >
            //   {t("all_discounts_applied")}
            // </p>
          );
        }

        const remainingToNext = Math.max(nextRule.threshold - cartSubtotal, 0);
        const dynamicDiscountProgress = Math.min(
          (cartSubtotal / Math.max(nextRule.threshold, 1)) * 100,
          100,
        );

        return (
          <div key={moduleId} className={styles.previewDynamicDiscounts}>
            <p
              className={styles.previewDynamicDiscountText}
              style={{ color: globalTextColor }}
            >
              {t("add_more_to_get", {
                amount: remainingToNext.toFixed(0),
                discount: getUpcomingDiscountLabel(nextRule, t),
              })}
            </p>
            <div className={styles.previewShippingBarWrap}>
              <div
                className={styles.previewShippingBar}
                style={PREVIEW_STYLE.progressTrack}
              >
                <div
                  className={styles.previewShippingFill}
                  style={{
                    width: `${dynamicDiscountProgress}%`,
                    backgroundColor: String(
                      modules.dynamic_discounts.barColor ?? "#000000",
                    ),
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
            ? previewUpsellProducts
            : previewUpsellProducts.slice(0, upsellCount);

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

        const renderPreviewUpsellProduct = (product: UpsellProduct) => (
          <div
            key={product.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "13px",
              width: isCarousel ? "100%" : "100%",
              flex: isCarousel ? 1 : undefined,
              minWidth: 0,
              justifyContent: "space-between",
            }}
          >
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.title}
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  border: "1px solid #e0e0e0",
                  flexShrink: 0,
                }}
              />
            ) : (
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "6px",
                  backgroundColor: "#e0e0e0",
                  flexShrink: 0,
                }}
              />
            )}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "2px",
                minWidth: 0,
              }}
            >
              <span style={{ fontWeight: 600, color: upsellSettings.textColor }}>
                {product.title}
              </span>
              <span style={{ color: upsellSettings.text2Color }}>
                {formatMoney(product.price)}
              </span>
            </div>
            <button
              type="button"
              style={{
                padding: "4px 10px",
                border: `1px solid ${upsellSettings.buttonColor}`,
                borderRadius: "6px",
                backgroundColor: upsellSettings.buttonColor,
                color: upsellSettings.buttonTextColor,
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
              onClick={() => handleAddUpsellToCart(product)}
            >
              {upsellSettings.buttonText}
            </button>
          </div>
        );

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
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "12px",
              borderRadius: "10px",
              backgroundColor: upsellSettings.backgroundColor,
            }}
          >
            {upsellSettings.title ? (
              <p
                style={{
                  margin: 0,
                  textAlign: upsellSettings.titleAlign,
                  color: upsellSettings.titleColor,
                  fontSize: `${upsellSettings.titleFontSize}px`,
                  fontWeight: 600,
                }}
              >
                {upsellSettings.title}
              </p>
            ) : null}
            {isGrid ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                  marginTop: "8px",
                }}
              >
                {productsToShow.map((product) => (
                  <div
                    key={product.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      minWidth: 0,
                    }}
                  >
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        style={{
                          width: "100%",
                          aspectRatio: "1/1",
                          objectFit: "cover",
                          borderRadius: "6px",
                          border: "1px solid #e0e0e0",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          aspectRatio: "1/1",
                          borderRadius: "6px",
                          backgroundColor: "#e0e0e0",
                        }}
                      />
                    )}
                    <span
                    className={styles.upsellTitleText}
                      style={{
                        fontWeight: 500,
                        color: upsellSettings.textColor,
                        fontSize: "13px",
                      }}
                    >
                      {product.title}
                    </span>
                    <span
                      style={{
                        color: upsellSettings.text2Color,
                        fontSize: "13px",
                      }}
                    >
                      {formatMoney(product.price)}
                    </span>
                    <button
                      type="button"
                      style={{
                        ...PREVIEW_STYLE.upsellAddBtn,
                        backgroundColor: upsellSettings.buttonColor,
                        color: upsellSettings.buttonTextColor,
                        borderColor: upsellSettings.buttonColor,
                        padding: "6px 12px",
                        width: "100%",
                        textAlign: "center",
                      }}
                      onClick={() => handleAddUpsellToCart(product)}
                    >
                      {upsellSettings.buttonText}
                    </button>
                  </div>
                ))}
              </div>
            ) : isCarousel ? (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  {productsToShow.length > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevUpsell}
                      aria-label={t("previous")}
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        padding: 0,
                        flexShrink: 0,
                      }}
                    >
                      <ChevronLeft
                        size={20}
                        color={upsellSettings.arrowsColor}
                      />
                    </button>
                  ) : null}
                  {currentProduct
                    ? renderPreviewUpsellProduct(currentProduct)
                    : null}
                  {productsToShow.length > 1 ? (
                    <button
                      type="button"
                      onClick={handleNextUpsell}
                      aria-label={t("next")}
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        padding: 0,
                        flexShrink: 0,
                      }}
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
                    style={{
                      margin: 0,
                      textAlign: "center",
                      fontSize: "12px",
                      color: upsellSettings.text2Color,
                    }}
                  >
                    {safeCarouselIndex + 1} / {productsToShow.length}
                  </p>
                ) : null}
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {productsToShow.map((product) =>
                  renderPreviewUpsellProduct(product),
                )}
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
          <div
            key={moduleId}
            className={styles.previewGiftWrap}
            style={{ color: globalTextColor }}
          >
            <div className={styles.previewGiftWrapText}>
              <GiftIcon size={16}  aria-hidden="true" style={{ color: globalTextColor }} />
              <span>{String(mod.text ?? t("gift_wrap"))}</span>
            </div>
            <span>{formatMoney(Number(mod.price ?? 5))}</span>
          </div>
        );
      case "order_notes":
        return (
          <input
            key={moduleId}
            type="text"
            value={orderNotes}
            onChange={(event) => setOrderNotes(event.target.value)}
            placeholder={String(
              mod.placeholder ?? t("order_notes_placeholder"),
            )}
            className={styles.previewInput}
            style={{
              color: globalTextColor,
              backgroundColor: "transparent",
              borderColor: "rgba(128, 128, 128, 0.5)",
            }}
          />
        );
      case "discount_code":
        return (
          <div key={moduleId} className={styles.previewDiscountCode}>
            <input
              type="text"
              value={discountCode}
              onChange={(event) => setDiscountCode(event.target.value)}
              placeholder={String(mod.placeholder ?? "")}
              className={styles.previewDiscountCodeInput}
              style={{ color: globalTextColor }}
            />
            <button
              type="button"
              className={styles.previewApplyBtn}
              onClick={handleApplyDiscountCode}
            >
              {t("apply")}
            </button>
          </div>
        );
      case "discounts_row": {
        const hasDynamicDiscount =
          modules.dynamic_discounts.enabled && appliedRule;
        const hasCouponDiscount =
          appliedCouponCode !== null && couponDiscountAmount > 0;

        if (!hasDynamicDiscount && !hasCouponDiscount) {
          return null;
        }

        return (
          <Fragment key={moduleId}>
            {hasDynamicDiscount && (
              <div
                className={styles.previewDiscountRow}
                style={{ color: globalTextColor }}
              >
                <span>{getAppliedDiscountLabel(appliedRule, t)}</span>
                {discountAmount > 0 && (
                  <span className={styles.previewDiscountAmount}>
                    {getDiscountAmountDisplay(discountAmount)}
                  </span>
                )}
              </div>
            )}
            {hasCouponDiscount && (
              <div
                className={styles.previewDiscountRow}
                style={{ color: globalTextColor }}
              >
                <span>
                  {t("coupon")}: {appliedCouponCode}
                </span>
                <span className={styles.previewDiscountAmount}>
                  {getDiscountAmountDisplay(couponDiscountAmount)}
                </span>
              </div>
            )}
          </Fragment>
        );
      }
      case "subtotal_row": {
        const format = String(mod.format ?? "Subtotal: ${{amount}}");
        const subtotalText = format.replace(
          "{{amount}}",
          discountedSubtotal.toFixed(2),
        );
        return (
          <div
            key={moduleId}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "13px",
              fontWeight: 600,
              paddingTop: "4px",
              borderTop: "1px solid #e0e0e0",
              borderColor: "rgba(128, 128, 128, 0.5)",
              color: globalTextColor,
            }}
          >
            <span>{subtotalText.split(":")[0] || t("subtotal")}</span>
            <span>
              {subtotalText.includes("$")
                ? `$${discountedSubtotal.toFixed(2)}`
                : formatMoney(discountedSubtotal)}
            </span>
          </div>
        );
      }
      case "checkout_button":
        return (
          <button
            key={moduleId}
            type="button"
            className={styles.previewButton}
            style={{
              backgroundColor: String(mod.color ?? "#000000"),
              color: String(mod.textColor ?? "#ffffff"),
              borderRadius: String(mod.borderRadius ?? "4px"),
              border: "none",
            }}
          >
            {t(checkoutTextKey)}
          </button>
        );
      case "footer": {
        const footerText = String(mod.text ?? "");
        if (!footerText) {
          return null;
        }
        return (
          <p
            key={moduleId}
            style={{
              ...previewTextStyle,
              margin: 0,
              fontSize: "11px",
              textAlign: "center",
            }}
          >
            {footerText}
          </p>
        );
      }
      default:
        return null;
    }
  };

  const discountTypeOptions = useMemo(
    () => [
      { label: t("percent"), value: "percent" },
      { label: t("fixed"), value: "fixed" },
      { label: t("free_shipping_discount"), value: "free_shipping" },
    ],
    [t],
  );

  if (loading) {
    return (
      <Page title={t("settings_title")}>
        <div className={styles.loadingWrap}>
          <InlineStack gap="300" blockAlign="center">
            <Spinner accessibilityLabel={t("loading")} size="large" />
            <Text as="span" tone="subdued">
              {t("loading")}
            </Text>
          </InlineStack>
        </div>
      </Page>
    );
  }

  return (
    <div className={styles.page} style={{ position: "relative", maxWidth: '1300px', margin: '0 auto', padding: '0 20px', bottom: "16px", paddingBottom: "16px", paddingTop: "16px" }}>

      <Page
        fullWidth
        title={t("settings_title")}
        titleMetadata={
          <div style={{ display: "inline-block", width: "130px" }}>
            <Select
              label=""
              labelHidden
              options={[
                { label: "English", value: "en" },
                { label: "Español", value: "es" },
                { label: "Français", value: "fr" },
                { label: "Deutsch", value: "de" },
                { label: "Italiano", value: "it" },
                { label: "Українська", value: "uk" },
              ]}
              value={i18n.language}
              onChange={(value) => changeLanguage(value)}
            />
          </div>
        }
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
        <BlockStack gap="500">
          {error && (
            <Banner tone="critical" title={t("load_error")}>
              <p>{error}</p>
            </Banner>
          )}

          {saveError && (
            <Banner tone="critical" title={t("save_error")}>
              <p>{saveError}</p>
            </Banner>
          )}

          {showSuccess && (
            <Banner
              tone="success"
              title={t("save_success")}
              onDismiss={() => setShowSuccess(false)}
            />
          )}

          {resetError && (
            <Banner tone="critical" title={t("reset_error")}>
              <p>{resetError}</p>
            </Banner>
          )}

          {showResetSuccess && (
            <Banner
              tone="success"
              title={t("reset_success")}
              onDismiss={() => setShowResetSuccess(false)}
            />
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
              <BlockStack gap="500">
                <Card padding="0">
                  <div className={styles.appearanceCard}>
                    <h2 className={styles.appearanceTitle}>{t("appearance")}</h2>
                    <ColorField
                      label={t("background_color")}
                      value={String(modules.top_bar.backgroundColor ?? "#ffffff")}
                      onChange={(value) =>
                        updateModule("top_bar", { backgroundColor: value })
                      }
                    />
                    <ColorField
                      label={t("text_color")}
                      value={String(modules.top_bar.textColor ?? "#000000")}
                      onChange={(value) =>
                        updateModule("top_bar", { textColor: value })
                      }
                    />
                  </div>
                </Card>

                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={moduleOrder}
                    strategy={verticalListSortingStrategy}
                  >
                    <BlockStack gap="500">
                      {moduleOrder.map((moduleId) => (
                        <SortableModuleAccordionCard
                          key={moduleId}
                          id={moduleId}
                          label={t(MODULE_LABEL_KEYS[moduleId])}
                          enabled={modules[moduleId].enabled}
                          expanded={Boolean(expandedModules[moduleId])}
                          toggleDisabled={isModuleFieldsDisabled(moduleId)}
                          showUpgradeHint={isModuleFieldsDisabled(moduleId)}
                          onToggleEnabled={(checked) =>
                            updateModule(moduleId, { enabled: checked })
                          }
                          onToggleExpanded={() => toggleModuleExpanded(moduleId)}
                        >
                          {renderModuleSettings(moduleId)}
                        </SortableModuleAccordionCard>
                      ))}
                    </BlockStack>
                  </SortableContext>
                </DndContext>

                <Card>
                  <BlockStack gap="400">
                    <Text as="h2" variant="headingMd">
                      {t("plan")}
                    </Text>

                    <InlineStack gap="200" blockAlign="center">
                      <span className={styles.planBadge}>
                        {t(planLabelKey)}
                        {trialDate && (
                          <span className={styles.trialDate}>
                            · {t("trial")}: {trialDate}
                          </span>
                        )}
                      </span>
                    </InlineStack>

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

                    {!isAllowed && (
                      <InlineStack gap="300">
                        <Button url="/app/plans">{t("upgrade")}</Button>
                      </InlineStack>
                    )}
                  </BlockStack>
                </Card>
              </BlockStack>
            </Layout.Section>
            <div style={{ width: '450px', flexShrink: 0 }}>
              <Layout.Section >
                <div className={styles.previewCard}>
                  <Card>
                    <BlockStack gap="500">
                      <Text as="h2" variant="headingMd">
                        {t("preview")}
                      </Text>

                      <div
                        className={styles.previewWidget}
                        style={{
                          backgroundColor: String(
                            modules.top_bar.backgroundColor ?? "#ffffff",
                          ),
                          color: globalTextColor,
                        }}
                      >
                        <div className={styles.previewBody}>
                          {moduleOrder.map((moduleId) =>
                            renderPreviewModule(moduleId),
                          )}
                        </div>
                      </div>
                    </BlockStack>
                  </Card>
                </div>
              </Layout.Section>
            </div>
          </Layout>
        </BlockStack>
      </Page>
    </div>
  );
}
