import "@shopify/shopify-app-react-router/adapters/node";
import type { AdminApiContext } from "@shopify/shopify-app-react-router/server";
import {
  ApiVersion,
  AppDistribution,
  BillingInterval,
  shopifyApp,
} from "@shopify/shopify-app-react-router/server";
import type { BillingConfigSubscriptionLineItemPlan } from "@shopify/shopify-api";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import prisma from "./db.server";
import { createCartWidgetScriptTag } from "./lib/scriptTag.server";
import {
  BILLING_PLAN_GROWTH,
  BILLING_PLAN_PRO,
  BILLING_PLAN_STARTER,
} from "./lib/plans";

function createBillingPlan(
  amount: number,
): BillingConfigSubscriptionLineItemPlan {
  return {
    trialDays: 14,
    lineItems: [
      {
        amount,
        currencyCode: "USD",
        interval: BillingInterval.Every30Days,
      },
    ],
  };
}

const billingConfig = {
  [BILLING_PLAN_STARTER]: createBillingPlan(9.99),
  [BILLING_PLAN_GROWTH]: createBillingPlan(14.99),
  [BILLING_PLAN_PRO]: createBillingPlan(24.99),
};

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.October25,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  future: {
    expiringOfflineAccessTokens: true,
  },
  billing: billingConfig,
  hooks: {
    afterAuth: async ({ admin }: { admin: AdminApiContext }) => {
      try {
        await createCartWidgetScriptTag(admin);
      } catch (error) {
        console.error("Failed to install cart widget script tag:", error);
      }
    },
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
});

export default shopify;
export const apiVersion = ApiVersion.October25;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;

export type BillingPlanName =
  | typeof BILLING_PLAN_STARTER
  | typeof BILLING_PLAN_GROWTH
  | typeof BILLING_PLAN_PRO;
