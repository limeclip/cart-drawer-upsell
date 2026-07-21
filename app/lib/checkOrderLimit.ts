import prisma from "../db.server";

export type OrderLimitReason = "trial_ended" | "limit_exceeded" | null;

export type OrderLimitCheck = {
  isAllowed: boolean;
  planName: string;
  orderLimit: number;
  orderCount: number;
  isTrialActive: boolean;
  isSubscriptionActive: boolean;
  reason: OrderLimitReason;
};

export const PAYMENT_REQUIRED_MESSAGE =
  "Order limit exceeded. Please upgrade your plan.";
export const TRIAL_ENDED_MESSAGE =
  "Your trial has ended. Upgrade to continue using all features.";

export async function checkOrderLimit(shop: string): Promise<OrderLimitCheck> {
  const subscription = await prisma.shopSubscription.findUnique({
    where: { shop },
  });

  if (!subscription) {
    return {
      isAllowed: true,
      planName: "starter",
      orderLimit: 99,
      orderCount: 0,
      isTrialActive: false,
      isSubscriptionActive: true,
      reason: null,
    };
  }

  const { orderLimit, orderCount, planName, trialEndsAt, isActive } = subscription;

  const isTrialActive = trialEndsAt ? new Date(trialEndsAt) > new Date() : false;
  const isSubscriptionActive = isActive && (isTrialActive || !trialEndsAt);

  if (!isSubscriptionActive) {
    return {
      isAllowed: false,
      planName,
      orderLimit,
      orderCount,
      isTrialActive,
      isSubscriptionActive: false,
      reason: "trial_ended",
    };
  }

  if (orderCount >= orderLimit) {
    return {
      isAllowed: false,
      planName,
      orderLimit,
      orderCount,
      isTrialActive,
      isSubscriptionActive,
      reason: "limit_exceeded",
    };
  }

  return {
    isAllowed: true,
    planName,
    orderLimit,
    orderCount,
    isTrialActive,
    isSubscriptionActive,
    reason: null,
  };
}
