import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";

import {
  createCartWidgetScriptTag,
  deleteCartWidgetScriptTag,
  getCartWidgetScriptSrc,
} from "../lib/scriptTag.server";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);

  return Response.json({
    src: getCartWidgetScriptSrc(),
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);

  if (request.method === "POST") {
    try {
      const scriptTag = await createCartWidgetScriptTag(admin);
      return Response.json({ scriptTag });
    } catch (error) {
      return Response.json(
        {
          error:
            error instanceof Error
              ? error.message
              : "Failed to create script tag",
        },
        { status: 500 },
      );
    }
  }

  if (request.method === "DELETE") {
    try {
      const deleted = await deleteCartWidgetScriptTag(admin);
      return Response.json({ deleted });
    } catch (error) {
      return Response.json(
        {
          error:
            error instanceof Error
              ? error.message
              : "Failed to delete script tag",
        },
        { status: 500 },
      );
    }
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 });
};
