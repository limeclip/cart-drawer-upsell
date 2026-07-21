import {
  BILLING_PLAN_GROWTH,
  BILLING_PLAN_PRO,
  BILLING_PLAN_STARTER,
} from "./plans";
import { authenticate, type BillingPlanName } from "../shopify.server";

const BILLING_PLAN_NAMES = new Set<string>([
  BILLING_PLAN_STARTER,
  BILLING_PLAN_GROWTH,
  BILLING_PLAN_PRO,
]);

function isBillingPlanName(plan: string): plan is BillingPlanName {
  return BILLING_PLAN_NAMES.has(plan);
}

const REAUTH_URL_HEADER = "X-Shopify-API-Request-Failure-Reauthorize-Url";

function extractConfirmationUrl(error: unknown): string | null {
  if (!(error instanceof Response)) {
    return null;
  }

  const reauthUrl = error.headers.get(REAUTH_URL_HEADER);
  if (reauthUrl) {
    return reauthUrl;
  }

  const location = error.headers.get("Location");
  if (!location) {
    return null;
  }

  try {
    const redirectUrl = new URL(
      location,
      process.env.SHOPIFY_APP_URL || "http://localhost",
    );
    const exitIframe = redirectUrl.searchParams.get("exitIframe");
    if (exitIframe) {
      return exitIframe;
    }
  } catch {
    // Fall through to raw location check.
  }

  return location.startsWith("http") ? location : null;
}

export async function requestPlanConfirmationUrl(
  request: Request,
  plan: string,
  returnUrl: string,
): Promise<string> {
  const { billing } = await authenticate.admin(request);

  if (!isBillingPlanName(plan)) {
    throw new Error("Invalid billing plan");
  }

  try {
    await billing.request({
      plan,
      isTest: process.env.NODE_ENV !== "production",
      returnUrl,
    });
  } catch (error) {
    const confirmationUrl = extractConfirmationUrl(error);
    if (confirmationUrl) {
      return confirmationUrl;
    }
    throw error;
  }

  throw new Error("Billing request did not return a confirmation URL");
}
