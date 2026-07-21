import type { ActionFunctionArgs } from "react-router";

import { applyPaidSubscription } from "../lib/subscription.server";
import { authenticate } from "../shopify.server";

type AppSubscriptionWebhookPayload = {
  app_subscription?: {
    name?: string;
    status?: string;
  };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { shop, topic, payload } = await authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop}`);

  const subscriptionPayload = payload as AppSubscriptionWebhookPayload;
  const appSubscription = subscriptionPayload.app_subscription;

  if (
    appSubscription?.status?.toUpperCase() === "ACTIVE" &&
    typeof appSubscription.name === "string"
  ) {
    await applyPaidSubscription(shop, appSubscription.name);
  }

  return new Response();
};
