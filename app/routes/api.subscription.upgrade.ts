import type { ActionFunctionArgs } from "react-router";

import { requestPlanConfirmationUrl } from "../lib/billing.server";
import { getBillingPlanKey } from "../lib/plans";
import { authenticate } from "app/shopify.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  if (request.method !== "POST") {
    return Response.json(
      { error: "Method not allowed" },
      { status: 405 },
    );
  }

  try {
    const body = (await request.json()) as {
      planId?: string;
    };

    const planId = body.planId?.trim();

    if (!planId) {
      return Response.json(
        { error: "Plan ID is required" },
        { status: 400 },
      );
    }

    const billingPlan = getBillingPlanKey(planId);

    if (!billingPlan) {
      return Response.json(
        { error: "Invalid plan ID" },
        { status: 400 },
      );
    }


    const returnUrl = new URL(
      "/app/plans",
      process.env.SHOPIFY_APP_URL,
    );

    returnUrl.searchParams.set(
      "shop",
      session.shop,
    );
    returnUrl.searchParams.set("upgraded", "true");

    const confirmationUrl =
      await requestPlanConfirmationUrl(
        request,
        billingPlan,
        returnUrl.toString(),
      );


    return Response.json({
      confirmationUrl,
    });

  } catch (error) {
    console.error("Billing error:", error);

    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create billing request",
      },
      {
        status: 500,
      },
    );
  }
};
