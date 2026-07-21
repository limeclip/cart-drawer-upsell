import type { ActionFunctionArgs } from "react-router";
import type { Prisma } from "@prisma/client";

import prisma from "../db.server";
import { authenticate } from "../shopify.server";

type OrderLineItem = {
  id?: number;
  product_id?: number;
  variant_id?: number;
  title?: string;
  quantity?: number;
  price?: string;
  sku?: string;
};

type OrderWebhookPayload = {
  id?: number;
  cart_token?: string;
  total_price?: string;
  currency?: string;
  line_items?: OrderLineItem[];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const { shop, topic, payload } = await authenticate.webhook(request);

    console.log(`Received ${topic} webhook for ${shop}`);

    const orderPayload = payload as OrderWebhookPayload;
    const orderId = String(orderPayload.id ?? "");
    const totalPrice = Number.parseFloat(orderPayload.total_price ?? "0");
    const currency = orderPayload.currency ?? "USD";
    const items = (orderPayload.line_items ?? []).map((item) => ({
      id: item.id ?? null,
      productId: item.product_id ?? null,
      variantId: item.variant_id ?? null,
      title: item.title ?? "",
      quantity: item.quantity ?? 0,
      price: item.price ?? "0",
      sku: item.sku ?? null,
    }));

    await prisma.shopSubscription.upsert({
      where: { shop },
      create: {
        shop,
        planName: "starter",
        orderLimit: 99,
        orderCount: 1,
      },
      update: {
        orderCount: {
          increment: 1,
        },
      },
    });

    if (orderId) {
      await prisma.orderEvent.create({
        data: {
          shop,
          orderId,
          totalPrice: Number.isFinite(totalPrice) ? totalPrice : 0,
          currency,
          items: items as Prisma.InputJsonValue,
        },
      });

      if (orderPayload.cart_token) {
        await prisma.cartEvent.create({
          data: {
            shop,
            cartId: orderPayload.cart_token,
            eventType: "converted",
          },
        });
      }
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("[webhooks.orders.create] Failed to process webhook:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
