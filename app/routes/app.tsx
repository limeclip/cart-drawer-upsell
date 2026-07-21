import type { HeadersFunction, LoaderFunctionArgs } from "react-router";
import { Outlet, useLoaderData, useRouteError } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { AppProvider } from "@shopify/shopify-app-react-router/react";
import { useTranslation } from "react-i18next";

import { authenticate } from "../shopify.server";
import { createCartWidgetScriptTag } from "../lib/scriptTag.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);

  try {
    await createCartWidgetScriptTag(admin);
  } catch (error) {
    console.error("Failed to sync cart widget script tag:", error);
  }

  // Запрашиваем основной язык магазина через GraphQL
  let shopLocale = "en";
  try {
    const response = await admin.graphql(
      `query { shop { primaryLocale } }`
    );
    const data = await response.json();
    shopLocale = data.data?.shop?.primaryLocale || "en";
  } catch (error) {
    console.error("Failed to fetch shop primary locale:", error);
  }

  return {
    apiKey: process.env.SHOPIFY_API_KEY || "",
    shopLocale,
  };
};

function AppNav() {
  const { t } = useTranslation();

  return (
    <s-app-nav>
      <s-link href="/app">{t("settings_title")}</s-link>
      <s-link href="/app/sticky-cart">{t("sticky_cart")}</s-link>
      <s-link href="/app/analytics">{t("analytics")}</s-link>
      <s-link href="/app/plans">{t("plans")}</s-link>
      <s-link href="/app/additional">Additional page</s-link>
    </s-app-nav>
  );
}

export default function App() {
  const { apiKey, shopLocale } = useLoaderData<typeof loader>();

  if (typeof window !== "undefined") {
    window.__SHOP_LOCALE__ = shopLocale;
  }

  return (
    <AppProvider embedded apiKey={apiKey}>
      <AppNav />
      <Outlet />
    </AppProvider>
  );
}

export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
