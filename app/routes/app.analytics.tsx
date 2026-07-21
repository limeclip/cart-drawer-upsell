import { useEffect, useMemo, useRef, useState } from "react";
import type { LoaderFunctionArgs } from "react-router";
import { useFetcher, useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import {
  Banner,
  BlockStack,
  Box,
  Card,
  DataTable,
  InlineStack,
  Layout,
  Page,
  Select,
  Spinner,
  Text,
} from "@shopify/polaris";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { getAnalyticsResponse, type AnalyticsResponse } from "../lib/analytics.server";
import { authenticate } from "../shopify.server";
import styles from "../styles/analytics-page.module.css";

type LoaderData = AnalyticsResponse;

type AnalyticsApiResponse = AnalyticsResponse & {
  error?: string;
};

type AnalyticsPeriod = "7d" | "30d" | "month";

const PERIOD_OPTIONS: Array<{ labelKey: string; value: AnalyticsPeriod }> = [
  { labelKey: "period_7d", value: "7d" },
  { labelKey: "period_30d", value: "30d" },
  { labelKey: "period_month", value: "month" },
];

function isValidPeriod(value: string): value is AnalyticsPeriod {
  return value === "7d" || value === "30d" || value === "month";
}

function parsePeriod(value: string): AnalyticsPeriod {
  return isValidPeriod(value) ? value : "7d";
}

function formatChartDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00`);
  return parsed.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function formatCurrency(value: number): string {
  return `$${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <div className={styles.metricCard} style={{ padding: "16px" }}>
        <BlockStack gap="100">
          <Text as="p" variant="bodySm" tone="subdued">
            {label}
          </Text>
          <p className={styles.metricValue}>{value}</p>
        </BlockStack>
      </div>
    </Card>
  );
}

function AnalyticsChart({
  title,
  data,
  dataKey,
  valueFormatter,
}: {
  title: string;
  data: Array<Record<string, string | number>>;
  dataKey: string;
  valueFormatter: (value: number) => string;
}) {
  return (
    <Card>
      <div className={styles.chartCard} style={{ padding: "16px" }}>
        <div className={styles.chartTitle}>
          <Text as="h3" variant="headingMd">
            {title}
          </Text>
        </div>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
            >
              <CartesianGrid stroke="#e3e3e3" strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={formatChartDate}
                stroke="#6d7175"
                tick={{ fill: "#6d7175", fontSize: 12 }}
              />
              <YAxis
                stroke="#6d7175"
                tick={{ fill: "#6d7175", fontSize: 12 }}
                tickFormatter={(value: number) => valueFormatter(value)}
              />
              <Tooltip
                labelFormatter={(label) => formatChartDate(String(label))}
                formatter={(value) => {
                  const numeric =
                    typeof value === "number"
                      ? value
                      : Number.parseFloat(String(value ?? 0));
                  return [valueFormatter(Number.isFinite(numeric) ? numeric : 0), title];
                }}
                contentStyle={{
                  border: "1px solid #e3e3e3",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey={dataKey}
                name={title}
                stroke="#111111"
                strokeWidth={2}
                dot={{ r: 3, fill: "#111111" }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const url = new URL(request.url);
  const period = parsePeriod(url.searchParams.get("period") ?? "7d");

  return getAnalyticsResponse(session.shop, period);
};

export default function AnalyticsPage() {
  const { t } = useTranslation();
  const loaderData = useLoaderData<LoaderData>();
  const fetcher = useFetcher<AnalyticsApiResponse>();

  const [period, setPeriod] = useState<AnalyticsPeriod>(loaderData.period);
  const isInitialPeriod = useRef(true);

  useEffect(() => {
    if (isInitialPeriod.current) {
      isInitialPeriod.current = false;
      return;
    }

    fetcher.load(`/api/analytics?period=${period}`);
  }, [period]);

  const fetcherError =
    fetcher.data && "error" in fetcher.data ? fetcher.data.error : undefined;

  const analytics =
    fetcher.data && !fetcherError ? fetcher.data : loaderData;
  const isLoading = fetcher.state === "loading";

  const periodOptions = useMemo(
    () =>
      PERIOD_OPTIONS.map((option) => ({
        label: t(option.labelKey),
        value: option.value,
      })),
    [t],
  );

  const convertedChartData = useMemo(
    () =>
      analytics.dailyConvertedCarts.map((point) => ({
        date: point.date,
        count: point.count,
      })),
    [analytics.dailyConvertedCarts],
  );

  const revenueChartData = useMemo(
    () =>
      analytics.dailyRevenue.map((point) => ({
        date: point.date,
        revenue: point.revenue,
      })),
    [analytics.dailyRevenue],
  );

  const upsellRows = useMemo(
    () =>
      analytics.bestPerformingUpsells.map((item) => [
        item.productTitle,
        String(item.addCount),
        formatCurrency(item.revenue),
      ]),
    [analytics.bestPerformingUpsells],
  );

  return (
    <Page title={t("analytics")} >
    <div style={{  paddingBottom: "16px" }}>
      <Layout>
        {fetcherError && (
          <Layout.Section>
            <Banner tone="critical" title={t("load_error")}>
              <p>{fetcherError}</p>
            </Banner>
          </Layout.Section>
        )}

        <Layout.Section>
          <InlineStack align="end">
            <div className={styles.periodSelect}>
              <Select
                label={t("analytics")}
                labelHidden
                options={periodOptions}
                value={period}
                onChange={(value) => setPeriod(parsePeriod(value))}
              />
            </div>
          </InlineStack>
        </Layout.Section>

        {isLoading ? (
          <Layout.Section>
            <InlineStack align="center" blockAlign="center">
              <Spinner accessibilityLabel={t("loading")} size="large" />
            </InlineStack>
          </Layout.Section>
        ) : (
          <>
            <Layout.Section>
              <div className={styles.metricGrid}>
                <MetricCard label={t("total_carts")} value={String(analytics.totalCarts)} />
                <MetricCard label={t("cart_views")} value={String(analytics.cartViews)} />
                <MetricCard
                  label={t("abandoned_carts")}
                  value={String(analytics.abandonedCarts)}
                />
                <MetricCard
                  label={t("converted_carts")}
                  value={String(analytics.convertedCarts)}
                />
                <MetricCard
                  label={t("conversion_rate")}
                  value={`${analytics.conversionRate}%`}
                />
                <MetricCard
                  label={t("total_revenue")}
                  value={formatCurrency(analytics.totalRevenue)}
                />
                <MetricCard
                  label={t("average_order_value")}
                  value={formatCurrency(analytics.averageOrderValue)}
                />
              </div>
            </Layout.Section>

            <Layout.Section>
              <BlockStack gap="400">
                <AnalyticsChart
                  title={t("converted_carts")}
                  data={convertedChartData}
                  dataKey="count"
                  valueFormatter={(value) => String(value)}
                />
                <AnalyticsChart
                  title={t("total_revenue")}
                  data={revenueChartData}
                  dataKey="revenue"
                  valueFormatter={formatCurrency}
                />
              </BlockStack>
            </Layout.Section>

            <Layout.Section>
              <Card>
                <Box padding="400">
                  <BlockStack gap="400">
                    <Text as="h3" variant="headingMd">
                      {t("best_performing_upsells")}
                    </Text>

                    {upsellRows.length === 0 ? (
                      <p className={styles.emptyState}>{t("no_data")}</p>
                    ) : (
                      <DataTable
                        columnContentTypes={["text", "numeric", "numeric"]}
                        headings={[t("product"), t("adds"), t("revenue")]}
                        rows={upsellRows}
                      />
                    )}
                  </BlockStack>
                </Box>
              </Card>
            </Layout.Section>
          </>
        )}
      </Layout>
      </div>
    </Page>
  );
}
