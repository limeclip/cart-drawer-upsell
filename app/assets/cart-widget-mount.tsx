import { createRoot, type Root } from "react-dom/client";



import { CartDrawer } from "../components/CartDrawer";

import { StickyCart } from "../components/StickyCart";

import type { CartWidgetSettings } from "../lib/cartModules";

import { setStorefrontToken } from "../lib/cartWidgetConfig";

import {
  installCartClickInterceptor,
  installGlobalCartChangeNotifier,
} from "../lib/cartTrigger";

import { startThemeCartDialogInterception, setOurCartDrawerOpen, startThemeCartDrawerSuppression } from "../lib/themeCartDrawer";

import { useStorefrontCart } from "../lib/useStorefrontCart";



declare global {

  interface Window {

    Shopify?: { shop?: string };

    CartDrawerUpsell?: { open: () => void; close: () => void };

    __CartDrawerUpsellLoaded?: boolean;

    __cartDrawerClickInstalled?: boolean;

    __cartDrawerPendingOpen?: boolean;

  }

}



function getAppOrigin(): string {

  const script = document.currentScript;

  if (script instanceof HTMLScriptElement && script.src) {

    return new URL(script.src).origin;

  }



  return "";

}



function injectWidgetStyles(): void {

  const script = document.currentScript;

  if (!(script instanceof HTMLScriptElement) || !script.src) {

    return;

  }



  const cssHref = script.src.replace(/\.js(\?.*)?$/, ".css$1");

  const existing = document.querySelector(`link[data-cart-drawer-widget-css="true"]`);

  if (existing instanceof HTMLLinkElement && existing.href === cssHref) {

    return;

  }



  const link = document.createElement("link");

  link.rel = "stylesheet";

  link.href = cssHref;

  link.setAttribute("data-cart-drawer-widget-css", "true");

  document.head.appendChild(link);

}



function getShopDomain(): string | null {

  return window.Shopify?.shop ?? null;

}



async function loadWidgetConfig(appOrigin: string, shop: string) {

  const response = await fetch(

    `${appOrigin}/api/cart-widget-settings?shop=${encodeURIComponent(shop)}`,

    { credentials: "omit" },

  );



  if (!response.ok) {

    throw new Error(`Failed to load cart widget settings (${response.status})`);

  }



  return response.json() as Promise<{

    settings: CartWidgetSettings;

    shop: string;

    storefrontToken?: string;

  }>;

}



type StickyCartRootProps = {

  settings: CartWidgetSettings;

};



function StickyCartRoot({ settings }: StickyCartRootProps) {

  const { itemCount } = useStorefrontCart();



  const handleOpen = () => {

    window.CartDrawerUpsell?.open();

  };



  return (

    <StickyCart

      settings={settings.stickyCart}

      itemCount={itemCount}

      onOpen={handleOpen}

    />

  );

}


function openCartDrawerFromTheme() {



  setOurCartDrawerOpen(true);

  startThemeCartDialogInterception();

  startThemeCartDrawerSuppression();


  window.setTimeout(() => {
    startThemeCartDrawerSuppression();
    startThemeCartDialogInterception();
  }, 50);


  if (window.CartDrawerUpsell?.open) {
    window.CartDrawerUpsell.open();
  } else {
    window.__cartDrawerPendingOpen = true;
  }
}

function installThemeIntegrations() {

  if (window.__cartDrawerClickInstalled) {

    return;

  }

  window.__cartDrawerClickInstalled = true;

  installCartClickInterceptor(openCartDrawerFromTheme);

  installGlobalCartChangeNotifier(() => {

    window.setTimeout(() => {

      startThemeCartDialogInterception();

      startThemeCartDrawerSuppression();

    }, 0);


  });

}



async function bootstrap() {

  installThemeIntegrations();



  if (window.__CartDrawerUpsellLoaded) {

    return;

  }

  window.__CartDrawerUpsellLoaded = true;



  injectWidgetStyles();



  const shop = getShopDomain();

  if (!shop) {

    console.warn("[CartDrawerUpsell] window.Shopify.shop is not available");

    return;

  }



  let drawerRootElement = document.getElementById("cart-drawer-root");

  if (!drawerRootElement) {

    drawerRootElement = document.createElement("div");

    drawerRootElement.id = "cart-drawer-root";

    drawerRootElement.setAttribute("data-cart-drawer-upsell", "true");

    document.body.appendChild(drawerRootElement);

  }



  let stickyRootElement = document.getElementById("sticky-cart-root");

  if (!stickyRootElement) {

    stickyRootElement = document.createElement("div");

    stickyRootElement.id = "sticky-cart-root";

    document.body.appendChild(stickyRootElement);

  }



  const appOrigin = getAppOrigin();

  if (!appOrigin) {

    console.warn("[CartDrawerUpsell] Could not determine app origin from script tag");

    return;

  }



  try {

    const config = await loadWidgetConfig(appOrigin, shop);



    if (config.storefrontToken) {

      setStorefrontToken(config.storefrontToken);

    }



    const drawerRoot: Root = createRoot(drawerRootElement);

    drawerRoot.render(
      <CartDrawer shop={config.shop || shop} settings={config.settings} />,
    );

    startThemeCartDialogInterception();
    startThemeCartDrawerSuppression();



    const stickyRoot: Root = createRoot(stickyRootElement);

    stickyRoot.render(<StickyCartRoot settings={config.settings} />);

  } catch (error) {

    console.error("[CartDrawerUpsell] Failed to initialize cart drawer", error);

  }

}



if (document.readyState === "loading") {

  installThemeIntegrations();

  document.addEventListener("DOMContentLoaded", () => {

    void bootstrap();

  });

} else {

  void bootstrap();

}

