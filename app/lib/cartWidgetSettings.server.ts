import prisma from "../db.server";
import { parseCartWidgetSettings } from "./cartModules";
import { checkOrderLimit } from "./checkOrderLimit";
import { normalizeShopDomain } from "./storefront.shared";

export async function loadCartWidgetSettings(shop: string) {
  const normalizedShop = normalizeShopDomain(shop);

  let record = await prisma.cartSettings.findUnique({
    where: {
      shop: normalizedShop,
    },
  });

  if (!record) {
    try {
      record = await prisma.cartSettings.create({
        data: {
          subscription: {
            connectOrCreate: {
              where: {
                shop: normalizedShop,
              },
              create: {
                shop: normalizedShop,
              },
            },
          },
        },
      });
    } catch (error) {
      record = await prisma.cartSettings.findUnique({
        where: {
          shop: normalizedShop,
        },
      });

      if (!record) {
        throw error;
      }
    }
  }

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
