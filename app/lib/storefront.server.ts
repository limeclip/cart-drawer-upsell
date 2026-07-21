import { createStorefrontClient } from "@shopify/hydrogen-react";

import {
  normalizeShopDomain,
  STOREFRONT_API_VERSION,
} from "./storefront.shared";

export function getStorefrontToken(): string {
  return process.env.SHOPIFY_STOREFRONT_TOKEN ?? "";
}

export function createShopStorefrontClient(shop: string) {
  const storeDomain = normalizeShopDomain(shop);
  const publicStorefrontToken = getStorefrontToken();

  if (!publicStorefrontToken) {
    throw new Error("SHOPIFY_STOREFRONT_TOKEN is not configured");
  }

  return createStorefrontClient({
    publicStorefrontToken,
    storeDomain: `https://${storeDomain}`,
    storefrontApiVersion: STOREFRONT_API_VERSION,
  });
}

export { STOREFRONT_API_VERSION };
