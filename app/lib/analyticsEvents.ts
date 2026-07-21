type AnalyticsEventPayload = {
  shop: string;
  eventType: string;
  productId?: string;
  productTitle?: string;
  variantId?: string;
  orderId?: string;
  cartId?: string;
};

let cachedAppOrigin = "";

function getAppOrigin(): string {
  if (cachedAppOrigin) {
    return cachedAppOrigin;
  }

  const scripts = document.querySelectorAll('script[src*="cart-widget"]');
  for (const script of scripts) {
    if (script instanceof HTMLScriptElement && script.src) {
      cachedAppOrigin = new URL(script.src).origin;
      return cachedAppOrigin;
    }
  }

  return "";
}

export function trackAnalyticsEvent(payload: AnalyticsEventPayload): void {
  const appOrigin = getAppOrigin();
  if (!appOrigin) {
    console.warn("[CartDrawerUpsell] Could not determine app origin for analytics");
    return;
  }

  void fetch(`${appOrigin}/api/events/upsell`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "omit",
    body: JSON.stringify(payload),
  }).catch((error) => {
    console.error("[CartDrawerUpsell] Failed to send analytics event:", error);
  });
}
