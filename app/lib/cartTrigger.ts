const CART_CLASS_PATTERNS = [
  /cart[-_]?(?:drawer|icon|link|toggle|trigger|button|count|bubble)/i,
  /header[-_]?(?:cart|icon[-_]cart)/i,
  /(?:mini[-_]?)?cart[-_]?bubble/i,
  /js[-_]?(?:cart|drawer|toggle[-_]?cart)/i,
  /icon[-_]?cart/i,
  /cart[-_]?summary/i,
];

const CART_ID_PATTERNS = [
  /^cart(-icon|-drawer|-toggle|-link|-count|-bubble)?$/i,
  /^CartDrawer/i,
  /^site[-_]cart/i,
  /cart[-_]icon/i,
];

function isInsideOurWidget(element: Element): boolean {
  return Boolean(
    element.closest("#cart-drawer-root") ||
      element.closest("#sticky-cart-root") ||
      element.closest("[data-cart-drawer-upsell]"),
  );
}

function isEditableField(element: Element): boolean {
  const tag = element.tagName.toLowerCase();

  if (
    tag === "input" ||
    tag === "textarea" ||
    tag === "select" ||
    tag === "option" ||
    tag === "label"
  ) {
    return true;
  }

  if (element instanceof HTMLElement && element.isContentEditable) {
    return true;
  }

  return Boolean(
    element.closest(
      "input, textarea, select, option, label, [contenteditable=''], [contenteditable='true'], [contenteditable='plaintext-only'], [data-cart-drawer-upsell-input]",
    ),
  );
}

function shouldIgnoreClickTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) {
    return true;
  }

  if (isEditableField(target)) {
    return true;
  }

  if (isInsideOurWidget(target)) {
    return true;
  }

  if (isAddToCartContext(target)) {
    return true;
  }

  return false;
}

function isAddToCartContext(element: Element): boolean {
  return Boolean(
    element.closest('form[action*="/cart/add"]') ||
      element.closest('[action*="/cart/add"]') ||
      element.closest("[data-type='add-to-cart-form']") ||
      element.closest("product-form") ||
      element.closest("[data-product-form]") ||
      element.closest(".product-form") ||
      element.closest("[name='add']"),
  );
}

function normalizePathname(pathname: string): string {
  return pathname.replace(/\/+$/, "").toLowerCase() || "/";
}

export function isCartPageHref(href: string): boolean {
  const trimmed = href.trim();
  if (!trimmed || trimmed === "#" || trimmed.startsWith("javascript:")) {
    return false;
  }

  try {
    const url = new URL(trimmed, window.location.origin);
    const path = normalizePathname(url.pathname);

    if (path.includes("/cart/add")) {
      return false;
    }

    if (path === "/cart") {
      return true;
    }

    return /\/cart$/.test(path);
  } catch {
    const lower = trimmed.toLowerCase();
    return (
      lower === "/cart" ||
      lower.startsWith("/cart?") ||
      lower.startsWith("/cart#") ||
      /^\/[a-z]{2}(-[a-z]{2})?\/cart(\?|#|$)/i.test(lower)
    );
  }
}

function hasCartDataAttribute(element: Element): boolean {
  for (const attr of element.attributes) {
    const name = attr.name.toLowerCase();
    const value = attr.value.toLowerCase();

    if (!name.startsWith("data-")) {
      continue;
    }

    if (
      name.includes("cart") &&
      (name.includes("drawer") ||
        name.includes("toggle") ||
        name.includes("open") ||
        name.includes("icon") ||
        name.includes("link") ||
        name.includes("trigger"))
    ) {
      return true;
    }

    if (name === "data-action" && /cart|drawer|toggle/i.test(value)) {
      return true;
    }

    if (name === "data-drawer-target" && /cart/i.test(value)) {
      return true;
    }
  }

  return false;
}

function getElementText(element: Element): string {
  return [
    element.getAttribute("aria-label"),
    element.getAttribute("title"),
    element.getAttribute("aria-labelledby")
      ? document.getElementById(element.getAttribute("aria-labelledby")!)?.textContent
      : null,
    element.textContent,
  ]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function isCartRelatedText(text: string): boolean {
  if (!text || text.length > 48) {
    return false;
  }

  return /\b(cart|basket|bag|кошик|корзин|panier|warenkorb|carrito|carrello|carrinho)\b/i.test(
    text,
  );
}

function matchesCartClassOrId(element: Element): boolean {
  if (element.id && CART_ID_PATTERNS.some((pattern) => pattern.test(element.id))) {
    return true;
  }

  const className =
    typeof element.className === "string"
      ? element.className
      : element.getAttribute("class") ?? "";

  return CART_CLASS_PATTERNS.some((pattern) => pattern.test(className));
}

function isLikelyCartControl(element: Element): boolean {
  if (matchesCartClassOrId(element) || hasCartDataAttribute(element)) {
    return true;
  }

  const ariaControls = element.getAttribute("aria-controls") ?? "";
  if (ariaControls && /cart|drawer/i.test(ariaControls)) {
    return true;
  }

  const ariaLabel = getElementText(element);
  if (isCartRelatedText(ariaLabel)) {
    return true;
  }

  return false;
}

function isInteractiveCartElement(element: Element): boolean {
  if (
    element instanceof HTMLAnchorElement ||
    element instanceof HTMLButtonElement ||
    element.getAttribute("role") === "button" ||
    element.hasAttribute("tabindex")
  ) {
    return true;
  }

  if (element.tagName.toLowerCase() === "summary") {
    return true;
  }

  const tag = element.tagName.toLowerCase();
  if (tag === "cart-drawer" || tag === "cart-notification") {
    return true;
  }

  const style = window.getComputedStyle(element);
  if (style.cursor === "pointer") {
    return true;
  }

  return Boolean(
    element.closest("header, .header, .site-header, #shopify-section-header, .shopify-section-header"),
  );
}

export function findCartTrigger(target: EventTarget | null): Element | null {
  if (!(target instanceof Element)) {
    return null;
  }

  if (shouldIgnoreClickTarget(target)) {
    return null;
  }

  let element: Element | null = target;

  while (element && element !== document.documentElement) {
    if (shouldIgnoreClickTarget(element)) {
      return null;
    }

    if (element instanceof HTMLAnchorElement) {
      const href = element.getAttribute("href") ?? "";
      if (isCartPageHref(href)) {
        return element;
      }
    }

    if (isLikelyCartControl(element) && isInteractiveCartElement(element)) {
      return element;
    }

    element = element.parentElement;
  }

  return null;
}

function findCartPageLink(target: EventTarget | null): HTMLAnchorElement | null {
  if (!(target instanceof Element)) {
    return null;
  }

  let element: Element | null = target;

  while (element && element !== document.documentElement) {
    if (isInsideOurWidget(element)) {
      return null;
    }

    if (element instanceof HTMLAnchorElement) {
      const href = element.getAttribute("href") ?? element.href ?? "";
      if (isCartPageHref(href)) {
        return element;
      }
    }

    element = element.parentElement;
  }

  return null;
}

function openDrawerFromCartEvent(
  event: Event,
  onOpen: () => void,
  logMessage: string,
  handled: { value: boolean },
  lastOpenTime: { value: number },
): boolean {
  const now = Date.now();

  if (now - lastOpenTime.value < 1000 || handled.value) {
    return true;
  }

  handled.value = true;
  lastOpenTime.value = now;



  event.preventDefault();
  event.stopImmediatePropagation();
  event.stopPropagation();

  onOpen();

  window.setTimeout(() => {
    handled.value = false;
  }, 1000);

  return true;
}

export function installCartClickInterceptor(onOpen: () => void): () => void {
  const handled = { value: false };
  const lastOpenTime = { value: 0 };

  const handleCartOpen = (event: Event) => {

    if (
      event.target instanceof Element &&
      !isInsideOurWidget(event.target) &&
      event.target.closest('a[href="/cart"]')
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }

    if (shouldIgnoreClickTarget(event.target)) {
      return;
    }

    const cartPageLink = findCartPageLink(event.target);
    if (cartPageLink) {
      openDrawerFromCartEvent(
        event,
        onOpen,
        "[CartDrawerUpsell] cart page navigation blocked",
        handled,
        lastOpenTime,
      );
      return;
    }

    const trigger = findCartTrigger(event.target);
    if (!trigger) {
      return;
    }

    openDrawerFromCartEvent(
      event,
      onOpen,
      "[CartDrawerUpsell] cart trigger detected",
      handled,
      lastOpenTime,
    );
  };

  document.addEventListener("pointerdown", handleCartOpen, {
    capture: true,
    passive: false,
  });

  document.addEventListener("click", handleCartOpen, {
    capture: true,
    passive: false,
  });

  return () => {
    document.removeEventListener("pointerdown", handleCartOpen, {
      capture: true,
    });

    document.removeEventListener("click", handleCartOpen, {
      capture: true,
    });
  };
}
import { suppressThemeCartNotification } from "./themeCartDrawer";

export function installGlobalCartChangeNotifier(
  onCartChange: () => void,
): () => void {
  const notify = () => {
    onCartChange();
    document.dispatchEvent(new CustomEvent("cartdrawer:updated"));
  };

  const handleDocumentEvent = () => {
    notify();
  };

  const suppressNotificationOnCartEvent = () => {
    window.setTimeout(() => {
      suppressThemeCartNotification();
    }, 0);
  };

  document.addEventListener("cart:updated", handleDocumentEvent);
  document.addEventListener("cart:change", handleDocumentEvent);
  window.addEventListener("cart:updated", handleDocumentEvent);
  document.addEventListener("cart:change", suppressNotificationOnCartEvent);
  document.addEventListener("cart:updated", suppressNotificationOnCartEvent);

  const isCartMutationUrl = (url: string): boolean =>
    url.includes("/cart/add") ||
    url.includes("/cart/change") ||
    url.includes("/cart/update") ||
    url.includes("/cart/clear");

  const patchFetch = () => {
    if (window.__cartDrawerGlobalFetchPatched) {
      return;
    }
    window.__cartDrawerGlobalFetchPatched = true;

    const originalFetch = window.fetch.bind(window);
    window.fetch = (...args: Parameters<typeof fetch>) => {
      const input = args[0];
      let url = "";

      if (typeof input === "string") {
        url = input;
      } else if (input instanceof Request) {
        url = input.url;
      } else if (input instanceof URL) {
        url = input.href;
      }

      const promise = originalFetch(...args);

      if (isCartMutationUrl(url)) {
        promise
          .then((response) => {
            if (response.ok) {
              window.setTimeout(notify, 100);
            }
          })
          .catch(() => {});
      }

      return promise;
    };
  };

  const patchXHR = () => {
    if (window.__cartDrawerGlobalXhrPatched) {
      return;
    }
    window.__cartDrawerGlobalXhrPatched = true;

    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function patchedOpen(
      method: string,
      url: string | URL,
      async?: boolean,
      username?: string | null,
      password?: string | null,
    ) {
      const resolvedUrl = typeof url === "string" ? url : url.href;
      (this as XMLHttpRequest & { __cartDrawerUrl?: string }).__cartDrawerUrl =
        resolvedUrl;
      return originalOpen.call(
        this,
        method,
        url,
        async ?? true,
        username ?? undefined,
        password ?? undefined,
      );
    };

    XMLHttpRequest.prototype.send = function patchedSend(
      ...args: Parameters<typeof XMLHttpRequest.prototype.send>
    ) {
      const xhrUrl = (this as XMLHttpRequest & { __cartDrawerUrl?: string })
        .__cartDrawerUrl;

      this.addEventListener("load", () => {
        if (xhrUrl && isCartMutationUrl(xhrUrl) && this.status >= 200 && this.status < 300) {
          window.setTimeout(notify, 100);
        }
      });

      return originalSend.apply(this, args);
    };
  };

  patchFetch();
  patchXHR();

  const countSelectors = [
    "[data-cart-count]",
    ".cart-count-bubble",
    "#cart-icon-bubble",
    ".cart-count",
    "[id*='cart-count']",
    "[class*='cart-count']",
  ];

  const observedElements = new Set<Element>();
  let observer: MutationObserver | null = null;

  const attachObservers = () => {
    for (const selector of countSelectors) {
      document.querySelectorAll(selector).forEach((element) => {
        if (observedElements.has(element)) {
          return;
        }
        observedElements.add(element);
        observer?.observe(element, {
          childList: true,
          characterData: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["data-cart-count", "class"],
        });
      });
    }
  };

  observer = new MutationObserver(() => {
    window.setTimeout(notify, 50);
  });

  attachObservers();

  const domObserver = new MutationObserver(() => {
    attachObservers();
  });

  domObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  return () => {
    document.removeEventListener("cart:updated", handleDocumentEvent);
    document.removeEventListener("cart:change", handleDocumentEvent);
    window.removeEventListener("cart:updated", handleDocumentEvent);
    document.removeEventListener("cart:change", suppressNotificationOnCartEvent);
    document.removeEventListener("cart:updated", suppressNotificationOnCartEvent);
    observer?.disconnect();
    domObserver.disconnect();
  };
}

declare global {
  interface Window {
    __cartDrawerGlobalFetchPatched?: boolean;
    __cartDrawerGlobalXhrPatched?: boolean;
    __cartDrawerPendingOpen?: boolean;
    __cartDrawerClickInstalled?: boolean;
  }
}
