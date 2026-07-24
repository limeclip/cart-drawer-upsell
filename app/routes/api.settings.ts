import type { Prisma } from "@prisma/client";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";

import prisma from "../db.server";
import { buildDefaultCartSettingsUpdate } from "../lib/cartModules";
import {
  checkOrderLimit,
  PAYMENT_REQUIRED_MESSAGE,
} from "../lib/checkOrderLimit";
import { authenticate } from "../shopify.server";

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

type SettingsInput = {
  reset?: boolean;
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
  buttonTextKey?: string;
  enableTimer?: boolean;
  timerMinutes?: number;
  enableFreeShippingBar?: boolean;
  freeShippingThreshold?: number;
  enableGiftWrap?: boolean;
  giftWrapPrice?: number;
  enableUpsell?: boolean;
  upsellProductIds?: Prisma.InputJsonValue;
  enableDynamicDiscounts?: boolean;
  discountRules?: Prisma.InputJsonValue;
  modules?: Prisma.InputJsonValue;
  moduleOrder?: Prisma.InputJsonValue;
};

function parseSettingsBody(body: SettingsInput) {
  const data: {
    backgroundColor?: string;
    textColor?: string;
    buttonColor?: string;
    buttonTextKey?: string;
    enableTimer?: boolean;
    timerMinutes?: number;
    enableFreeShippingBar?: boolean;
    freeShippingThreshold?: number;
    enableGiftWrap?: boolean;
    giftWrapPrice?: number;
    enableUpsell?: boolean;
    upsellProductIds?: Prisma.InputJsonValue;
    enableDynamicDiscounts?: boolean;
    discountRules?: Prisma.InputJsonValue;
    modules?: Prisma.InputJsonValue;
    moduleOrder?: Prisma.InputJsonValue;
  } = {};

  if (typeof body.backgroundColor === "string") {
    data.backgroundColor = body.backgroundColor;
  }
  if (typeof body.textColor === "string") {
    data.textColor = body.textColor;
  }
  if (typeof body.buttonColor === "string") {
    data.buttonColor = body.buttonColor;
  }
  if (typeof body.buttonTextKey === "string") {
    data.buttonTextKey = body.buttonTextKey;
  }
  if (typeof body.enableTimer === "boolean") {
    data.enableTimer = body.enableTimer;
  }
  if (typeof body.timerMinutes === "number") {
    data.timerMinutes = body.timerMinutes;
  }
  if (typeof body.enableFreeShippingBar === "boolean") {
    data.enableFreeShippingBar = body.enableFreeShippingBar;
  }
  if (typeof body.freeShippingThreshold === "number") {
    data.freeShippingThreshold = body.freeShippingThreshold;
  }
  if (typeof body.enableGiftWrap === "boolean") {
    data.enableGiftWrap = body.enableGiftWrap;
  }
  if (typeof body.giftWrapPrice === "number") {
    data.giftWrapPrice = body.giftWrapPrice;
  }
  if (typeof body.enableUpsell === "boolean") {
    data.enableUpsell = body.enableUpsell;
  }
  if (body.upsellProductIds !== undefined) {
    data.upsellProductIds = body.upsellProductIds;
  }
  if (typeof body.enableDynamicDiscounts === "boolean") {
    data.enableDynamicDiscounts = body.enableDynamicDiscounts;
  }
  if (body.discountRules !== undefined) {
    data.discountRules = body.discountRules;
  }
  if (body.modules !== undefined) {
    data.modules = body.modules;
  }
  if (body.moduleOrder !== undefined) {
    data.moduleOrder = body.moduleOrder;
  }

  return data;
}

function subscriptionConnectOrCreate(shop: string): Prisma.ShopSubscriptionCreateNestedOneWithoutSettingsInput {
  return {
    connectOrCreate: {
      where: { shop },
      create: { shop },
    },
  };
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const { session } = await authenticate.admin(request);
    const shop = session.shop;

    let settings = await prisma.cartSettings.findUnique({
      where: {
        shop,
      },
      include: {
        subscription: true,
      },
    });

    if (!settings) {
      try {

        await prisma.shopSubscription.upsert({
          where: {
            shop,
          },
          update: {},
          create: {
            shop,
          },
        });


        settings = await prisma.cartSettings.create({
          data: {
            shop,
          },
          include: {
            subscription: true,
          },
        });


      } catch {

        settings = await prisma.cartSettings.findUnique({
          where: {
            shop,
          },
          include: {
            subscription: true,
          },
        });


        if (!settings) {
          throw new Error("Failed to create cart settings");
        }

      }
    }

    return Response.json(settings);
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to load settings",
      },
      { status: 500 },
    );
  }
};

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

    let body: SettingsInput;
    try {
      body = (await request.json()) as SettingsInput;
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    if (body.reset === true) {
      const existingSettings = await prisma.cartSettings.findUnique({
        where: { shop },
        select: { modules: true },
      });
      const existingModules = parseJsonRecord(existingSettings?.modules);
      const stickyCart = existingModules.sticky_cart;
      const defaultData = buildDefaultCartSettingsUpdate(stickyCart);
      const resetPayload = {
        ...defaultData,
        modules: defaultData.modules as Prisma.InputJsonValue,
        moduleOrder: defaultData.moduleOrder as Prisma.InputJsonValue,
        upsellProductIds: defaultData.upsellProductIds as Prisma.InputJsonValue,
        discountRules: defaultData.discountRules as Prisma.InputJsonValue,
      };

      const settings = await prisma.cartSettings.upsert({
        where: { shop },
        create: {
          ...resetPayload,
          subscription: subscriptionConnectOrCreate(shop),
        } satisfies Prisma.CartSettingsCreateInput,
        update: resetPayload,
        include: {
          subscription: true,
        },
      });

      return Response.json(settings);
    }

    const settingsData = parseSettingsBody(body);

    // --- НОВЫЙ КОД: мержим modules с существующими ---
const existingSettings = await prisma.cartSettings.findUnique({
  where: { shop },
  select: { modules: true },
});

if (existingSettings?.modules && settingsData.modules) {
  const existingModules = existingSettings.modules as Record<string, unknown> || {};
  // Создаём копию новых модулей, чтобы не мутировать исходный объект
  const newModules = { ...(settingsData.modules as Record<string, unknown>) };

  // Если в существующих есть sticky_cart, а в новых нет — добавляем
  if (existingModules.sticky_cart && !newModules.sticky_cart) {
    newModules.sticky_cart = existingModules.sticky_cart;
    settingsData.modules = newModules as Prisma.InputJsonValue;
  }
}
// --- КОНЕЦ НОВОГО КОДА ---

    const settings = await prisma.cartSettings.upsert({
      where: { shop },
      create: {
        ...settingsData,
        subscription: subscriptionConnectOrCreate(shop),
      } satisfies Prisma.CartSettingsCreateInput,
      update: settingsData,
      include: {
        subscription: true,
      },
    });

    return Response.json(settings);
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to save settings",
      },
      { status: 500 },
    );
  }
};
