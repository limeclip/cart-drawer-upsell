export const STOREFRONT_API_VERSION = "2026-04";

export function normalizeShopDomain(shop: string): string {
  return shop.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
