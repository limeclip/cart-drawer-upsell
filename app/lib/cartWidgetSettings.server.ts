import type { Prisma } from "@prisma/client";

import prisma from "../db.server";
import { parseCartWidgetSettings } from "./cartModules";
import { checkOrderLimit } from "./checkOrderLimit";
import { normalizeShopDomain } from "./storefront.shared";

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

export async function loadCartWidgetSettings(shop: string) {
  const normalizedShop = normalizeShopDomain(shop);

  const record = await prisma.cartSettings.upsert({
    where: { shop: normalizedShop },
    create: {
      subscription: subscriptionConnectOrCreate(normalizedShop),
    } satisfies Prisma.CartSettingsCreateInput,
    update: {},
  });

  const limitCheck = await checkOrderLimit(normalizedShop);
  const settings = parseCartWidgetSettings(
    record as unknown as Record<string, unknown>,
  );

  return {
    shop: normalizedShop,
    settings: {
      ...settings,
      isAllowed: limitCheck.isAllowed,
      planName: limitCheck.planName,
    },
  };
}
