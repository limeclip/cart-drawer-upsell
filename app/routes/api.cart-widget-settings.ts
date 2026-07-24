import type { LoaderFunctionArgs } from "react-router";

import { loadCartWidgetSettings } from "../lib/cartWidgetSettings.server";
import { normalizeShopDomain } from "../lib/storefront.shared";

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
  const shopParam = url.searchParams.get("shop") || "";

  if (!shopParam) {
    return Response.json(
      { error: "Missing shop" },
      { status: 400, headers: corsHeaders() },
    );
  }

  const shop = normalizeShopDomain(shopParam);
  const { settings } = await loadCartWidgetSettings(shop);

  return Response.json({ settings, shop }, { headers: corsHeaders() });
};
