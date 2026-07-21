import type { ActionFunctionArgs } from "react-router";

import prisma from "../db.server";
import { authenticate } from "../shopify.server";

type CartWebhookPayload = {
  id?: string | number;
  token?: string;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const { shop, topic, payload } = await authenticate.webhook(request);

    console.log(`Received ${topic} webhook for ${shop}`);

    const cartPayload = payload as CartWebhookPayload;
    const cartId = String(cartPayload.id ?? cartPayload.token ?? "");

    if (!cartId) {
      console.error("[webhooks.carts.create] Missing cart id in payload");
      return new Response("Missing cart id", { status: 400 });
    }

    await prisma.cartEvent.create({
      data: {
        shop,
        cartId,
        eventType: "created",
      },
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("[webhooks.carts.create] Failed to process webhook:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
