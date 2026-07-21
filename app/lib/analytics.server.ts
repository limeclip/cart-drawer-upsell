import prisma from "../db.server";

export type AnalyticsPeriod = "7d" | "30d" | "month";

export type AnalyticsData = {
  totalCarts: number;
  cartViews: number;
  abandonedCarts: number;
  convertedCarts: number;
  conversionRate: number;
  totalRevenue: number;
  averageOrderValue: number;
  dailyConvertedCarts: Array<{ date: string; count: number }>;
  dailyRevenue: Array<{ date: string; revenue: number }>;
  bestPerformingUpsells: Array<{
    productId: string;
    productTitle: string;
    addCount: number;
    revenue: number;
  }>;
};

export type AnalyticsResponse = AnalyticsData & {
  period: AnalyticsPeriod;
};

type OrderItem = {
  productId?: number | string | null;
  price?: string | number;
  quantity?: number;
};

export function parseAnalyticsPeriod(value: string | null): AnalyticsPeriod {
  if (value === "30d" || value === "month") {
    return value;
  }
  return "7d";
}

export function getPeriodStartDate(period: AnalyticsPeriod): Date {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  switch (period) {
    case "30d":
      start.setDate(start.getDate() - 29);
      return start;
    case "month":
      start.setDate(1);
      return start;
    case "7d":
    default:
      start.setDate(start.getDate() - 6);
      return start;
  }
}

function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildDateRange(startDate: Date, endDate: Date): string[] {
  const dates: string[] = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    dates.push(formatDateKey(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

function normalizeProductId(id: string | number | null | undefined): string {
  if (id === null || id === undefined) {
    return "";
  }

  const value = String(id);
  const gidMatch = value.match(/Product\/(\d+)/);
  if (gidMatch) {
    return gidMatch[1];
  }

  return value;
}

function parseOrderItems(raw: unknown): OrderItem[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw as OrderItem[];
}

export async function getAnalyticsData(
  shop: string,
  period: AnalyticsPeriod,
): Promise<AnalyticsData> {
  const startDate = getPeriodStartDate(period);
  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);

  const dateFilter = {
    shop,
    createdAt: {
      gte: startDate,
      lte: endDate,
    },
  };

  const [cartEvents, orderEvents, upsellEvents] = await Promise.all([
    prisma.cartEvent.findMany({
      where: dateFilter,
      select: {
        eventType: true,
        createdAt: true,
      },
    }),
    prisma.orderEvent.findMany({
      where: dateFilter,
      select: {
        totalPrice: true,
        items: true,
        createdAt: true,
      },
    }),
    prisma.upsellEvent.findMany({
      where: {
        ...dateFilter,
        eventType: "added_to_cart",
      },
      select: {
        productId: true,
        productTitle: true,
      },
    }),
  ]);

  const totalCarts = cartEvents.filter((event) => event.eventType === "created").length;
  const cartViews = cartEvents.filter((event) => event.eventType === "cart_viewed").length;
  const abandonedCarts = cartEvents.filter((event) => event.eventType === "abandoned").length;
  const convertedCarts = cartEvents.filter((event) => event.eventType === "converted").length;

  const conversionRate =
    totalCarts > 0 ? Number(((convertedCarts / totalCarts) * 100).toFixed(1)) : 0;

  const totalRevenue = orderEvents.reduce((sum, order) => sum + order.totalPrice, 0);
  const averageOrderValue =
    orderEvents.length > 0
      ? Number((totalRevenue / orderEvents.length).toFixed(2))
      : 0;

  const dateRange = buildDateRange(startDate, endDate);

  const convertedByDate = new Map<string, number>();
  for (const event of cartEvents) {
    if (event.eventType !== "converted") {
      continue;
    }
    const date = formatDateKey(event.createdAt);
    convertedByDate.set(date, (convertedByDate.get(date) ?? 0) + 1);
  }

  const dailyConvertedCarts = dateRange.map((date) => ({
    date,
    count: convertedByDate.get(date) ?? 0,
  }));

  const revenueByDate = new Map<string, number>();
  for (const order of orderEvents) {
    const date = formatDateKey(order.createdAt);
    revenueByDate.set(date, (revenueByDate.get(date) ?? 0) + order.totalPrice);
  }

  const dailyRevenue = dateRange.map((date) => ({
    date,
    revenue: Number((revenueByDate.get(date) ?? 0).toFixed(2)),
  }));

  const upsellAdds = new Map<
    string,
    { productId: string; productTitle: string; addCount: number }
  >();

  for (const event of upsellEvents) {
    const key = normalizeProductId(event.productId);
    if (!key) {
      continue;
    }

    const existing = upsellAdds.get(key) ?? {
      productId: event.productId,
      productTitle: event.productTitle,
      addCount: 0,
    };

    existing.addCount += 1;
    if (!existing.productTitle && event.productTitle) {
      existing.productTitle = event.productTitle;
    }

    upsellAdds.set(key, existing);
  }

  const upsellProductIds = new Set(upsellAdds.keys());
  const revenueByProduct = new Map<string, number>();

  for (const order of orderEvents) {
    const items = parseOrderItems(order.items);

    for (const item of items) {
      const key = normalizeProductId(item.productId);
      if (!key || !upsellProductIds.has(key)) {
        continue;
      }

      const price = Number.parseFloat(String(item.price ?? "0"));
      const quantity = item.quantity ?? 1;
      const lineRevenue = (Number.isFinite(price) ? price : 0) * quantity;

      revenueByProduct.set(key, (revenueByProduct.get(key) ?? 0) + lineRevenue);
    }
  }

  const bestPerformingUpsells = Array.from(upsellAdds.entries())
    .map(([key, data]) => ({
      productId: data.productId,
      productTitle: data.productTitle,
      addCount: data.addCount,
      revenue: Number((revenueByProduct.get(key) ?? 0).toFixed(2)),
    }))
    .sort((a, b) => b.revenue - a.revenue || b.addCount - a.addCount);

  return {
    totalCarts,
    cartViews,
    abandonedCarts,
    convertedCarts,
    conversionRate,
    totalRevenue: Number(totalRevenue.toFixed(2)),
    averageOrderValue,
    dailyConvertedCarts,
    dailyRevenue,
    bestPerformingUpsells,
  };
}

export async function getAnalyticsResponse(
  shop: string,
  period: AnalyticsPeriod,
): Promise<AnalyticsResponse> {
  const data = await getAnalyticsData(shop, period);
  return {
    period,
    ...data,
  };
}
