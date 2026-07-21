import { useEffect, useState } from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { I18nextProvider } from "react-i18next";
import { AppProvider as PolarisAppProvider } from "@shopify/polaris";
import enPolaris from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";

import i18n from "./lib/i18n";
import { useColorScheme } from "./lib/useColorScheme";
import "./styles/app.css";

declare global {
  interface Window {
    __SHOP_LOCALE__?: string;
  }
}

function ThemeWrapper() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    document.documentElement.setAttribute("data-color-scheme", colorScheme);
  }, [colorScheme]);

  return <Outlet />;
}

export default function App() {
  const [, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("i18nextLng");
    const shopLocale = window.__SHOP_LOCALE__ || "en";
    const lang = saved || shopLocale || "en";
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <I18nextProvider i18n={i18n}>
          <PolarisAppProvider i18n={enPolaris}>
            <ThemeWrapper />
          </PolarisAppProvider>
        </I18nextProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
