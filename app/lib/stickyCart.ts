import {
  Box as BoxIcon,
  Gift,
  Handbag,
  Heart,
  Package,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  Star,
  type LucideIcon,
} from "lucide-react";

export type StickyCartIcon =
  | "ShoppingCart"
  | "Bag"
  | "Basket"
  | "ShoppingBag"
  | "Heart"
  | "Star"
  | "Gift"
  | "Package"
  | "Box";

export type StickyCartCountShape = "circle" | "rectangle";

export type StickyCartPosition =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left";

export type StickyCartSettings = {
  enabled: boolean;
  icon: StickyCartIcon;
  shapeSize: number;
  iconSize: number;
  roundness: number;
  shapeColor: string;
  iconColor: string;
  countShape: StickyCartCountShape;
  countColor: string;
  countBackground: string;
  showItemCount: boolean;
  hideWhenEmpty: boolean;
  displayOnMobile: boolean;
  positionDesktop: StickyCartPosition;
  positionMobile: StickyCartPosition;
};

export const STICKY_CART_ICON_OPTIONS: Array<{
  key: StickyCartIcon;
  Icon: LucideIcon;
}> = [
  { key: "ShoppingCart", Icon: ShoppingCart },
  { key: "Bag", Icon: Handbag },
  { key: "Basket", Icon: ShoppingBasket },
  { key: "ShoppingBag", Icon: ShoppingBag },
  { key: "Heart", Icon: Heart },
  { key: "Star", Icon: Star },
  { key: "Gift", Icon: Gift },
  { key: "Package", Icon: Package },
  { key: "Box", Icon: BoxIcon },
];

const STICKY_CART_ICONS = STICKY_CART_ICON_OPTIONS.map((option) => option.key);

const POSITION_OPTIONS: StickyCartPosition[] = [
  "bottom-right",
  "bottom-left",
  "top-right",
  "top-left",
];

const LEGACY_ICON_MAP: Record<string, StickyCartIcon> = {
  cart: "ShoppingCart",
  "shopping-cart": "ShoppingCart",
  bag: "Bag",
  basket: "Basket",
  "shopping-bag": "ShoppingBag",
  suitcase: "Package",
  heart: "Heart",
  star: "Star",
  gift: "Gift",
  package: "Package",
  box: "Box",
};

export function isStickyCartDefault(settings: StickyCartSettings): boolean {
  return (
    JSON.stringify(settings) === JSON.stringify(createDefaultStickyCart())
  );
}

export function createDefaultStickyCart(): StickyCartSettings {
  return {
    enabled: true,
    icon: "ShoppingCart",
    shapeSize: 56,
    iconSize: 24,
    roundness: 50,
    shapeColor: "#000000",
    iconColor: "#ffffff",
    countShape: "circle",
    countColor: "#ffffff",
    countBackground: "#c21414",
    showItemCount: true,
    hideWhenEmpty: false,
    displayOnMobile: true,
    positionDesktop: "bottom-right",
    positionMobile: "bottom-right",
  };
}

function normalizeIcon(raw: unknown, fallback: StickyCartIcon): StickyCartIcon {
  if (typeof raw !== "string") {
    return fallback;
  }

  if (STICKY_CART_ICONS.includes(raw as StickyCartIcon)) {
    return raw as StickyCartIcon;
  }

  return LEGACY_ICON_MAP[raw.toLowerCase()] ?? fallback;
}

export function parseStickyCart(raw: unknown): StickyCartSettings {
  const defaults = createDefaultStickyCart();

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return defaults;
  }

  const entry = raw as Record<string, unknown>;
  const countShape = entry.countShape;
  const positionDesktop = entry.positionDesktop;
  const positionMobile = entry.positionMobile;

  return {
    enabled:
      typeof entry.enabled === "boolean" ? entry.enabled : defaults.enabled,
    icon: normalizeIcon(entry.icon, defaults.icon),
    shapeSize:
      typeof entry.shapeSize === "number"
        ? entry.shapeSize
        : Number(entry.shapeSize) || defaults.shapeSize,
    iconSize:
      typeof entry.iconSize === "number"
        ? entry.iconSize
        : Number(entry.iconSize) || defaults.iconSize,
    roundness:
      typeof entry.roundness === "number"
        ? entry.roundness
        : Number(entry.roundness) || defaults.roundness,
    shapeColor:
      typeof entry.shapeColor === "string"
        ? entry.shapeColor
        : defaults.shapeColor,
    iconColor:
      typeof entry.iconColor === "string" ? entry.iconColor : defaults.iconColor,
    countShape:
      countShape === "circle" || countShape === "rectangle"
        ? countShape
        : defaults.countShape,
    countColor:
      typeof entry.countColor === "string"
        ? entry.countColor
        : defaults.countColor,
    countBackground:
      typeof entry.countBackground === "string"
        ? entry.countBackground
        : defaults.countBackground,
    showItemCount:
      typeof entry.showItemCount === "boolean"
        ? entry.showItemCount
        : defaults.showItemCount,
    hideWhenEmpty:
      typeof entry.hideWhenEmpty === "boolean"
        ? entry.hideWhenEmpty
        : defaults.hideWhenEmpty,
    displayOnMobile:
      typeof entry.displayOnMobile === "boolean"
        ? entry.displayOnMobile
        : defaults.displayOnMobile,
    positionDesktop: POSITION_OPTIONS.includes(
      positionDesktop as StickyCartPosition,
    )
      ? (positionDesktop as StickyCartPosition)
      : defaults.positionDesktop,
    positionMobile: POSITION_OPTIONS.includes(
      positionMobile as StickyCartPosition,
    )
      ? (positionMobile as StickyCartPosition)
      : defaults.positionMobile,
  };
}

export function getStickyCartIconComponent(icon: StickyCartIcon): LucideIcon {
  return (
    STICKY_CART_ICON_OPTIONS.find((option) => option.key === icon)?.Icon ??
    ShoppingCart
  );
}

export function getBorderRadius(shapeSize: number, roundness: number): string {
  if (roundness >= 50) {
    return "50%";
  }

  const radiusPx = Math.min(shapeSize / 2, Math.max(0, roundness));
  return `${radiusPx}px`;
}
