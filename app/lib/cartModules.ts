export type DiscountType = "percent" | "fixed" | "free_shipping";

export type DiscountRule = {
  threshold: number;
  type: DiscountType;
  value: number;
};

export type ModuleId =
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

export type ModuleEntry = {
  enabled: boolean;
  [key: string]: unknown;
};

export type UpsellLayout = "horizontal" | "carousel" | "grid";
export type UpsellTitleAlign = "left" | "center" | "right";

export type UpsellModuleEntry = ModuleEntry & {
  enabled: boolean;
  count: number;
  layout: UpsellLayout;
  productIds: string[];
  title: string;
  titleAlign: UpsellTitleAlign;
  titleColor: string;
  titleFontSize: number;
  buttonText: string;
  buttonColor: string;
  buttonTextColor: string;
  backgroundColor: string;
  textColor: string;
  text2Color: string;
  arrowsColor: string;
};

export const DEFAULT_UPSELL_MODULE: UpsellModuleEntry = {
  enabled: false,
  count: 3,
  layout: "horizontal",
  productIds: [],
  title: "You may also like",
  titleAlign: "left",
  titleColor: "#000000",
  titleFontSize: 14,
  buttonText: "Add",
  buttonColor: "#000000",
  buttonTextColor: "#ffffff",
  backgroundColor: "#f9f9f9",
  textColor: "#000000",
  text2Color: "#666666",
  arrowsColor: "#000000",
};

export type ModulesState = Record<ModuleId, ModuleEntry>;

import { parseStickyCart, type StickyCartSettings } from "./stickyCart";

export type CartWidgetSettings = {
  modules: ModulesState;
  moduleOrder: ModuleId[];
  backgroundColor: string;
  textColor: string;
  stickyCart: StickyCartSettings;
  isAllowed: boolean;
  planName: string;
};

export const PAID_MODULE_IDS: ModuleId[] = [
  "timer",
  "upsell",
  "gift_wrap",
  "dynamic_discounts",
];

export const DEFAULT_MODULE_ORDER: ModuleId[] = [
  "top_bar",
  "free_shipping",
  "timer",
  "cart_products",
  "dynamic_discounts",
  "upsell",
  "gift_wrap",
  "order_notes",
  "discounts_row",
  "subtotal_row",
  "checkout_button",
  "trust_badges",
  "footer",
];

export function createDefaultModules(): ModulesState {
  return {
    top_bar: {
      enabled: true,
      title: "My cart",
      showItemCount: true,
      backgroundColor: "#ffffff",
      textColor: "#000000",
    },
    timer: {
      enabled: true,
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

function parseDiscountRules(raw: unknown): DiscountRule[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw
    .map((entry) => {
      if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
        return null;
      }
      const rule = entry as Record<string, unknown>;
      const threshold = Number(rule.threshold);
      const value = Number(rule.value);
      const type = rule.type;

      if (
        !Number.isFinite(threshold) ||
        !Number.isFinite(value) ||
        (type !== "percent" && type !== "fixed" && type !== "free_shipping")
      ) {
        return null;
      }

      return { threshold, value, type };
    })
    .filter((rule): rule is DiscountRule => rule !== null);
}

function parseUpsellProductIds(raw: unknown): string[] {
  if (!Array.isArray(raw)) {
    return [];
  }
  return raw.filter((id): id is string => typeof id === "string");
}

function parseUpsellLayout(raw: unknown, legacyStyle?: unknown): UpsellLayout {
  if (raw === "horizontal" || raw === "carousel" || raw === "grid") {
    return raw;
  }
  if (legacyStyle === "carousel") {
    return "carousel";
  }
  return "horizontal";
}

function parseUpsellTitleAlign(raw: unknown): UpsellTitleAlign {
  if (raw === "left" || raw === "center" || raw === "right") {
    return raw;
  }
  return DEFAULT_UPSELL_MODULE.titleAlign;
}

export function normalizeUpsellModule(
  entry: Record<string, unknown>,
): UpsellModuleEntry {
  const defaults = DEFAULT_UPSELL_MODULE;

  return {
    enabled:
      typeof entry.enabled === "boolean" ? entry.enabled : defaults.enabled,
    count: Number.isFinite(Number(entry.count))
      ? Number(entry.count)
      : defaults.count,
    layout: parseUpsellLayout(entry.layout, entry.style),
    productIds: parseUpsellProductIds(entry.productIds),
    title: typeof entry.title === "string" ? entry.title : defaults.title,
    titleAlign: parseUpsellTitleAlign(entry.titleAlign),
    titleColor:
      typeof entry.titleColor === "string"
        ? entry.titleColor
        : defaults.titleColor,
    titleFontSize: Number.isFinite(Number(entry.titleFontSize))
      ? Number(entry.titleFontSize)
      : defaults.titleFontSize,
    buttonText:
      typeof entry.buttonText === "string"
        ? entry.buttonText
        : defaults.buttonText,
    buttonColor:
      typeof entry.buttonColor === "string"
        ? entry.buttonColor
        : defaults.buttonColor,
    buttonTextColor:
      typeof entry.buttonTextColor === "string"
        ? entry.buttonTextColor
        : defaults.buttonTextColor,
    backgroundColor:
      typeof entry.backgroundColor === "string"
        ? entry.backgroundColor
        : defaults.backgroundColor,
    textColor:
      typeof entry.textColor === "string" ? entry.textColor : defaults.textColor,
    text2Color:
      typeof entry.text2Color === "string"
        ? entry.text2Color
        : defaults.text2Color,
    arrowsColor:
      typeof entry.arrowsColor === "string"
        ? entry.arrowsColor
        : defaults.arrowsColor,
  };
}

function parseJsonRecord(raw: unknown): Record<string, unknown> | null {
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw) as unknown;
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed as Record<string, unknown>;
      }
    } catch {
      return null;
    }
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return null;
  }
  return raw as Record<string, unknown>;
}

function parseModuleOrder(raw: unknown): ModuleId[] {
  if (!Array.isArray(raw)) {
    return [...DEFAULT_MODULE_ORDER];
  }

  const validIds = new Set<ModuleId>(DEFAULT_MODULE_ORDER);
  return raw.filter((id): id is ModuleId => {
    return typeof id === "string" && validIds.has(id as ModuleId);
  });
}

function normalizeModuleOrder(order: ModuleId[]): ModuleId[] {
  const seen = new Set<ModuleId>();
  const normalized: ModuleId[] = [];

  for (const id of order) {
    if (!seen.has(id)) {
      seen.add(id);
      normalized.push(id);
    }
  }

  for (const id of DEFAULT_MODULE_ORDER) {
    if (!seen.has(id)) {
      normalized.push(id);
    }
  }

  return normalized;
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

export function modulesToLegacyPayload(modules: ModulesState) {
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

export function buildDefaultCartSettingsUpdate(preserveStickyCart?: unknown) {
  const modules = createDefaultModules();
  const modulesPayload: Record<string, unknown> = { ...modules };

  if (preserveStickyCart !== undefined) {
    modulesPayload.sticky_cart = preserveStickyCart;
  }

  return {
    modules: modulesPayload,
    moduleOrder: [...DEFAULT_MODULE_ORDER],
    ...modulesToLegacyPayload(modules),
  };
}

export function isCartSettingsDefault(
  modules: ModulesState,
  moduleOrder: ModuleId[],
): boolean {
  const defaults = createDefaultModules();
  const defaultOrder = DEFAULT_MODULE_ORDER;

  if (moduleOrder.length !== defaultOrder.length) {
    return false;
  }

  for (let index = 0; index < defaultOrder.length; index += 1) {
    if (moduleOrder[index] !== defaultOrder[index]) {
      return false;
    }
  }

  for (const id of DEFAULT_MODULE_ORDER) {
    if (JSON.stringify(modules[id]) !== JSON.stringify(defaults[id])) {
      return false;
    }
  }

  return true;
}

export function parseModulesFromApi(data: Record<string, unknown>): {
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

export function parseCartWidgetSettings(
  data: Record<string, unknown>,
): CartWidgetSettings {
  const { modules, moduleOrder } = parseModulesFromApi(data);
  const topBar = modules.top_bar;
  const savedModules = parseJsonRecord(data.modules);

  return {
    modules,
    moduleOrder,
    backgroundColor: String(topBar.backgroundColor ?? "#ffffff"),
    textColor: String(data.textColor ?? topBar.textColor ?? "#000000"),
    stickyCart: parseStickyCart(savedModules?.sticky_cart),
    isAllowed: true,
    planName: "starter",
  };
}

export function getDiscountRules(modules: ModulesState): DiscountRule[] {
  return parseDiscountRules(modules.dynamic_discounts.rules);
}

export function getUpsellProductIds(modules: ModulesState): string[] {
  return parseUpsellProductIds(modules.upsell.productIds);
}

export function formatCountdown(totalSeconds: number): string {
  const safeSeconds = Math.max(0, totalSeconds);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function formatMoney(amount: number, currencyCode = "USD"): string {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
}

export function applyFirstDiscount(
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

  const rule =
    discountRules.find((entry) => subtotal >= entry.threshold) ?? null;
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

export function getNextDiscountRule(
  subtotal: number,
  rules: DiscountRule[],
): DiscountRule | null {
  return (
    [...rules]
      .filter((rule) => rule.threshold > subtotal)
      .sort((a, b) => a.threshold - b.threshold)[0] ?? null
  );
}
