import { useCallback, useEffect, useState } from "react";

import { loadCart, type ThemeCart } from "./storefrontWidget";

const CART_POLL_INTERVAL_MS = 5000;

function isCartMutationUrl(url: string): boolean {
  return (
    url.includes("/cart/add") ||
    url.includes("/cart/change") ||
    url.includes("/cart/update") ||
    url.includes("/cart/clear")
  );
}

function getFetchUrl(input: RequestInfo | URL): string {
  if (typeof input === "string") {
    return input;
  }
  if (input instanceof Request) {
    return input.url;
  }
  return input.href;
}

export function useStorefrontCart() {
  const [cart, setCart] = useState<ThemeCart | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const nextCart = await loadCart();
    if (nextCart) {
      setCart(nextCart);
    }
    return nextCart;
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      setLoading(true);
      await refresh();
      if (!cancelled) {
        setLoading(false);
      }
    }

    void init();

    const pollId = window.setInterval(() => {
      void refresh();
    }, CART_POLL_INTERVAL_MS);

    const handleFocus = () => {
      void refresh();
    };

    const handleCartUpdated = () => {
      void refresh();
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("cartdrawer:updated", handleCartUpdated);

    return () => {
      cancelled = true;
      window.clearInterval(pollId);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("cartdrawer:updated", handleCartUpdated);
    };
  }, [refresh]);

  useEffect(() => {
    if (window.__cartCountFetchPatched) {
      return;
    }
    window.__cartCountFetchPatched = true;

    const previousFetch = window.fetch.bind(window);
    window.fetch = (...args: Parameters<typeof fetch>) => {
      const url = getFetchUrl(args[0]);
      const promise = previousFetch(...args);

      if (isCartMutationUrl(url)) {
        promise
          .then((response) => {
            if (response.ok) {
              document.dispatchEvent(new CustomEvent("cartdrawer:updated"));
            }
          })
          .catch(() => {});
      }

      return promise;
    };
  }, []);

  return {
    cart,
    itemCount: cart?.item_count ?? 0,
    loading,
    refresh,
  };
}

declare global {
  interface Window {
    __cartCountFetchPatched?: boolean;
  }
}
