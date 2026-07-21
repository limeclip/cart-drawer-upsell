import type { Prisma } from "@prisma/client";
import type { ActionFunctionArgs } from "react-router";

import prisma from "../db.server";
import {
  checkOrderLimit,
  PAYMENT_REQUIRED_MESSAGE,
} from "../lib/checkOrderLimit";
import { createDefaultStickyCart } from "../lib/stickyCart";
import { authenticate } from "../shopify.server";

type ResetInput = {
  reset?: boolean;
};

function parseJsonRecord(raw: unknown): Record<string, unknown> {
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw) as unknown;
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed as Record<string, unknown>;
      }
    } catch {
      return {};
    }
  }

  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    return raw as Record<string, unknown>;
  }

  return {};
}

function subscriptionConnectOrCreate(
  shop: string,
): Prisma.ShopSubscriptionCreateNestedOneWithoutSettingsInput {
  return {
    connectOrCreate: {
      where: { shop },
      create: { shop },
    },
  };
}

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const { session } = await authenticate.admin(request);
    const shop = session.shop;

    const limitCheck = await checkOrderLimit(shop);
    if (!limitCheck.isAllowed) {
      return Response.json({ error: PAYMENT_REQUIRED_MESSAGE }, { status: 402 });
    }

    let body: ResetInput;
    try {
      body = (await request.json()) as ResetInput;
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    if (body.reset !== true) {
      return Response.json({ error: "Invalid request" }, { status: 400 });
    }

    const existingSettings = await prisma.cartSettings.findUnique({
      where: { shop },
      select: { modules: true, moduleOrder: true },
    });
    const existingModules = parseJsonRecord(existingSettings?.modules);
    const mergedModules = {
      ...existingModules,
      sticky_cart: createDefaultStickyCart(),
    };

    const settings = await prisma.cartSettings.upsert({
      where: { shop },
      create: {
        modules: mergedModules,
        moduleOrder: existingSettings?.moduleOrder ?? [],
        subscription: subscriptionConnectOrCreate(shop),
      } satisfies Prisma.CartSettingsCreateInput,
      update: {
        modules: mergedModules,
      },
      include: {
        subscription: true,
      },
    });

    return Response.json(settings);
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to reset sticky cart",
      },
      { status: 500 },
    );
  }
};
