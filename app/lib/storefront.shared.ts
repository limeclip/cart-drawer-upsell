export function normalizeShopDomain(shop: string): string {
  return shop.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
