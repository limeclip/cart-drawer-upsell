import type { LoaderFunctionArgs } from "react-router";

import {
  checkOrderLimit,
  PAYMENT_REQUIRED_MESSAGE,
} from "../lib/checkOrderLimit";
import { normalizeShopDomain } from "../lib/storefront.shared";
import {
  fetchUpsellProductsByIds,
  toProductGid,
} from "../lib/upsellProducts.server";
import { unauthenticated } from "../shopify.server";

function corsHeaders(): HeadersInit {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "no-store",
  };
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  const url = new URL(request.url);
  const shopParam = url.searchParams.get("shop") ?? "";
  const productIdsParam = url.searchParams.get("productIds") ?? "";

  if (!shopParam) {
    return Response.json(
      { error: "Missing shop" },
      { status: 400, headers: corsHeaders() },
    );
  }

  const shop = normalizeShopDomain(shopParam);
  const limitCheck = await checkOrderLimit(shop);

  if (!limitCheck.isAllowed) {
    return Response.json(
      { error: PAYMENT_REQUIRED_MESSAGE },
      { status: 402, headers: corsHeaders() },
    );
  }

  const rawIds = productIdsParam
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  if (rawIds.length === 0) {
    return Response.json({ products: [] }, { headers: corsHeaders() });
  }

  try {
    const { admin } = await unauthenticated.admin(shop);
    const products = await fetchUpsellProductsByIds(
      admin,
      rawIds.map(toProductGid),
    );

    return Response.json({ products }, { headers: corsHeaders() });
  } catch (error) {
    console.error("[api.upsell-products] Failed to load products:", error);
    return Response.json(
      { error: "Shop session not found" },
      { status: 404, headers: corsHeaders() },
    );
  }
};
