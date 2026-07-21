import { authenticate } from "app/shopify.server";
import prisma from "../db.server";
import {
  BILLING_PLAN_GROWTH,
  BILLING_PLAN_PRO,
  getPlanById,
} from "./plans";

export type ShopSubscriptionData = {
  planName: string;
  orderLimit: number;
  orderCount: number;
  trialEndsAt: string | null;
  isActive: boolean;
  usedPercent: number;
};

export async function getShopSubscription(
  shop: string,
): Promise<ShopSubscriptionData> {
  const subscription = await prisma.shopSubscription.upsert({
    where: { shop },
    create: {
      shop,
      planName: "starter",
      orderLimit: 99,
      orderCount: 0,
    },
    update: {},
  });

  const usedPercent =
    subscription.orderLimit > 0
      ? (subscription.orderCount / subscription.orderLimit) * 100
      : 0;

  return {
    planName: subscription.planName,
    orderLimit: subscription.orderLimit,
    orderCount: subscription.orderCount,
    trialEndsAt: subscription.trialEndsAt?.toISOString() ?? null,
    isActive: subscription.isActive,
    usedPercent,
  };
}

function billingPlanNameToPlanId(name: string): "starter" | "growth" | "pro" {
  if (name === BILLING_PLAN_GROWTH) {
    return "growth";
  }
  if (name === BILLING_PLAN_PRO) {
    return "pro";
  }
  return "starter";
}

export async function applyPaidSubscription(
  shop: string,
  billingPlanName: string,
): Promise<void> {
  const planId = billingPlanNameToPlanId(billingPlanName);
  const plan = getPlanById(planId);

  await prisma.shopSubscription.upsert({
    where: { shop },
    create: {
      shop,
      planName: planId,
      orderLimit: plan?.ordersLimit ?? 99,
      isActive: true,
      trialEndsAt: null,
      orderCount: 0,
    },
    update: {
      planName: planId,
      orderLimit: plan?.ordersLimit ?? 99,
      isActive: true,
      trialEndsAt: null,
    },
  });
}

export async function syncShopSubscription(
  request: Request,
  shop: string,
) {
  const { billing } = await authenticate.admin(request);

  const subscriptions = await billing.check({
    plans: ["Starter", "Growth", "Pro"],
    isTest: true,
  });

  const activePlan = subscriptions.appSubscriptions?.[0];

  if (!activePlan) {
    return;
  }

  await applyPaidSubscription(shop, activePlan.name);
}
