import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";

import prisma from "../db.server";
import {
  checkOrderLimit,
  PAYMENT_REQUIRED_MESSAGE,
} from "../lib/checkOrderLimit";
import { normalizeShopDomain } from "../lib/storefront.shared";

const ALLOWED_EVENT_TYPES = new Set([
  "added_to_cart",
  "viewed",
  "clicked",
  "cart_viewed",
]);

function corsHeaders(): HeadersInit {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "no-store",
  };
}

type UpsellEventBody = {
  shop?: string;
  productId?: string;
  productTitle?: string;
  variantId?: string;
  eventType?: string;
  orderId?: string;
  cartId?: string;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  return Response.json(
    { error: "Method not allowed" },
    { status: 405, headers: corsHeaders() },
  );
};

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  if (request.method !== "POST") {
    return Response.json(
      { error: "Method not allowed" },
      { status: 405, headers: corsHeaders() },
    );
  }

  try {
    let body: UpsellEventBody;
    try {
      body = (await request.json()) as UpsellEventBody;
    } catch {
      return Response.json(
        { error: "Invalid JSON body" },
        { status: 400, headers: corsHeaders() },
      );
    }

    const shopParam = body.shop ?? "";
    if (!shopParam) {
      return Response.json(
        { error: "Missing shop" },
        { status: 400, headers: corsHeaders() },
      );
    }

    const eventType = body.eventType ?? "";
    if (!ALLOWED_EVENT_TYPES.has(eventType)) {
      return Response.json(
        { error: "Invalid eventType" },
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

    if (eventType === "cart_viewed") {
      const cartId = body.cartId ?? "unknown";
      await prisma.cartEvent.create({
        data: {
          shop,
          cartId,
          eventType: "cart_viewed",
        },
      });

      return Response.json({ ok: true }, { headers: corsHeaders() });
    }

    const productId = body.productId ?? "";
    const productTitle = body.productTitle ?? "";
    const variantId = body.variantId ?? "";

    if (!productId || !variantId) {
      return Response.json(
        { error: "Missing productId or variantId" },
        { status: 400, headers: corsHeaders() },
      );
    }

    await prisma.upsellEvent.create({
      data: {
        shop,
        productId,
        productTitle,
        variantId,
        eventType,
        orderId: body.orderId ?? null,
      },
    });

    return Response.json({ ok: true }, { headers: corsHeaders() });
  } catch (error) {
    console.error("[api.events.upsell] Failed to save event:", error);
    return Response.json(
      { error: "Failed to save event" },
      { status: 500, headers: corsHeaders() },
    );
  }
};
