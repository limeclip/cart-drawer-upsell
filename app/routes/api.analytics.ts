import type { LoaderFunctionArgs } from "react-router";

import {
  getAnalyticsResponse,
  parseAnalyticsPeriod,
} from "../lib/analytics.server";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const { session } = await authenticate.admin(request);
    const url = new URL(request.url);
    const period = parseAnalyticsPeriod(url.searchParams.get("period"));
    const data = await getAnalyticsResponse(session.shop, period);

    return Response.json(data);
  } catch (error) {
    console.error("[api.analytics] Failed to load analytics:", error);
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to load analytics",
      },
      { status: 500 },
    );
  }
};
