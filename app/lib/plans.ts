export type PlanId = "starter" | "growth" | "pro";

export type Plan = {
  id: PlanId;
  name: string;
  price: number;
  ordersLimit: number;
  trialDays: number;
};

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 9.99,
    ordersLimit: 99,
    trialDays: 7,
  },
  {
    id: "growth",
    name: "Growth",
    price: 14.99,
    ordersLimit: 199,
    trialDays: 7,
  },
  {
    id: "pro",
    name: "Pro",
    price: 24.99,
    ordersLimit: 499,
    trialDays: 7,
  },
];

export const BILLING_PLAN_STARTER = "Starter";
export const BILLING_PLAN_GROWTH = "Growth";
export const BILLING_PLAN_PRO = "Pro";

const PLAN_ID_TO_BILLING_KEY: Record<PlanId, string> = {
  starter: BILLING_PLAN_STARTER,
  growth: BILLING_PLAN_GROWTH,
  pro: BILLING_PLAN_PRO,
};

export function getBillingPlanKey(planId: string): string | null {
  if (planId in PLAN_ID_TO_BILLING_KEY) {
    return PLAN_ID_TO_BILLING_KEY[planId as PlanId];
  }
  return null;
}

export function getPlanById(planId: string): Plan | undefined {
  return PLANS.find((plan) => plan.id === planId);
}

export function normalizePlanId(planName: string): PlanId {
  const normalized = planName.toLowerCase();
  if (normalized === "growth" || normalized === "pro") {
    return normalized;
  }
  return "starter";
}
