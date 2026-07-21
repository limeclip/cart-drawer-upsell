const SUPPRESSED_CLASS = "cart-drawer-upsell-theme-suppressed";
const SUPPRESSED_ATTR = "data-cart-drawer-upsell-suppressed";
const STYLE_ID = "cart-drawer-upsell-theme-suppress-style";
const PATCHED_ATTR = "data-cart-drawer-upsell-dialog-patched";

const OUR_ROOT_SELECTOR =
  "#cart-drawer-root, #sticky-cart-root, [data-cart-drawer-upsell]";

const THEME_DRAWER_SELECTORS = [
  "cart-drawer",
  "cart-notification",
  "#CartDrawer",
  "#cart-drawer",
  "#sidebar-cart",
  "#side-cart",
  ".cart-drawer",
  ".drawer--cart",
  ".mini-cart",
  ".side-cart",
  ".ajaxcart",
  "[data-drawer='cart']",
  "[data-drawer-target='cart']",
  "[data-cart-drawer]",
  "[data-section-type='cart-drawer']",
  "[id*='cart-drawer' i]",
  "[id*='CartDrawer']",
  "[class*='cart-drawer' i]",
  "[class*='CartDrawer']",
  "dialog[id*='cart' i]",
  "dialog[class*='cart' i]",
];

const CART_NOTIFICATION_SELECTORS = [
  "cart-notification",
  ".cart-notification",
  ".cart-popup",
  "[data-cart-notification]",
  "[data-cart-popup]",
];

type SuppressedState = {
  inlineDisplay: string;
  inlineVisibility: string;
  inlinePointerEvents: string;
  inlineOpacity: string;
  ariaHidden: string | null;
  hadOpenAttr: boolean;
  wasDialogOpen: boolean;
  activeClasses: string[];
};

type DialogMethodOverrides = {
  showModal: () => void;
  show: () => void;
};

const suppressedElements = new Map<Element, SuppressedState>();
const dialogMethodOverrides = new WeakMap<HTMLDialogElement, DialogMethodOverrides>();

let ourCartDrawerOpen = false;
let suppressionObserver: MutationObserver | null = null;
let dialogInterceptionObserver: MutationObserver | null = null;
let notificationObserver: MutationObserver | null = null;
let suppressFrameId: number | null = null;

export function setOurCartDrawerOpen(open: boolean): void {
  ourCartDrawerOpen = open;

  if (open) {
    requestAnimationFrame(() => {
      suppressThemeCartDrawers();
    });
  }
}

export function isOurCartDrawerOpen(): boolean {
  return ourCartDrawerOpen;
}

function isOurElement(element: Element): boolean {
  return Boolean(element.closest(OUR_ROOT_SELECTOR));
}

function ensureSuppressStyles(): void {
  if (document.getElementById(STYLE_ID)) {
    return;
  }

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    #cart-drawer-root {
      position: relative;
      z-index: 2147483647;
    }

    .${SUPPRESSED_CLASS},
    [${SUPPRESSED_ATTR}="true"] {
      display: none !important;
      visibility: hidden !important;
      pointer-events: none !important;
      opacity: 0 !important;
    }
  `;
  document.head.appendChild(style);
}

function getElementDescriptor(element: Element): string {
  const id = element.id ? `#${element.id}` : "";
  const className =
    typeof element.className === "string"
      ? element.className
      : element.getAttribute("class") ?? "";
  const ariaLabel = element.getAttribute("aria-label") ?? "";
  return `${element.tagName.toLowerCase()}${id} ${className} ${ariaLabel}`.toLowerCase();
}

function isThemeCartDrawerCandidate(element: Element): boolean {
  if (isOurElement(element)) {
    return false;
  }

  const tag = element.tagName.toLowerCase();
  if (tag === "cart-drawer" || tag === "cart-notification") {
    return true;
  }

  for (const selector of THEME_DRAWER_SELECTORS) {
    try {
      if (element.matches(selector)) {
        return true;
      }
    } catch {
      // Ignore invalid selectors in older browsers/themes.
    }
  }

  const descriptor = getElementDescriptor(element);
  const role = element.getAttribute("role") ?? "";

  if (
    (role === "dialog" || tag === "dialog") &&
    /cart|basket|bag|drawer|mini[- ]?cart|side[- ]?cart/.test(descriptor)
  ) {
    return true;
  }

  if (
    element.hasAttribute("open") &&
    /cart|drawer|mini[- ]?cart|side[- ]?cart/.test(descriptor)
  ) {
    return true;
  }

  return false;
}

function findThemeCartDrawerElements(): Element[] {
  const found = new Set<Element>();

  for (const selector of THEME_DRAWER_SELECTORS) {
    try {
      document.querySelectorAll(selector).forEach((element) => {
        if (isThemeCartDrawerCandidate(element)) {
          found.add(element);
        }
      });
    } catch {
      // Ignore invalid selectors in older browsers/themes.
    }
  }

  document.querySelectorAll("dialog[open], [role='dialog'], dialog").forEach((element) => {
    if (isThemeCartDrawerCandidate(element)) {
      found.add(element);
    }
  });

  for (const element of Array.from(found)) {
    element.querySelectorAll("dialog").forEach((dialog) => {
      if (!isOurElement(dialog)) {
        found.add(dialog);
      }
    });
  }

  return Array.from(found);
}

export function findThemeCartDialogElements(): HTMLDialogElement[] {
  const dialogs = new Set<HTMLDialogElement>();

  for (const element of findThemeCartDrawerElements()) {
    if (element instanceof HTMLDialogElement) {
      dialogs.add(element);
    }
  }

  document.querySelectorAll("dialog").forEach((element) => {
    if (element instanceof HTMLDialogElement && isThemeCartDrawerCandidate(element)) {
      dialogs.add(element);
    }
  });

  return Array.from(dialogs);
}

function collectActiveClasses(element: Element): string[] {
  const candidates = ["active", "is-open", "drawer--is-open", "menu-opening", "opened"];
  return candidates.filter((className) => element.classList.contains(className));
}

function closeThemeDialog(dialog: HTMLDialogElement): void {
  if (!dialog.open) {
    return;
  }

  try {
    dialog.close();
  } catch {
    // Some themes throw if the dialog was not opened via showModal/show.
  }
}

function forceHideElement(element: Element): void {
  if (!(element instanceof HTMLElement)) {
    return;
  }

  element.style.setProperty("display", "none", "important");
  element.style.setProperty("visibility", "hidden", "important");
  element.style.setProperty("pointer-events", "none", "important");
  element.style.setProperty("opacity", "0", "important");
}

function suppressElement(element: Element): void {
  if (isOurElement(element) || suppressedElements.has(element)) {
    return;
  }

  const htmlElement = element instanceof HTMLElement ? element : null;
  const dialogElement = element instanceof HTMLDialogElement ? element : null;
  const wasDialogOpen = Boolean(dialogElement?.open);

  if (dialogElement) {
    closeThemeDialog(dialogElement);
  }

  suppressedElements.set(element, {
    inlineDisplay: htmlElement?.style.display ?? "",
    inlineVisibility: htmlElement?.style.visibility ?? "",
    inlinePointerEvents: htmlElement?.style.pointerEvents ?? "",
    inlineOpacity: htmlElement?.style.opacity ?? "",
    ariaHidden: element.getAttribute("aria-hidden"),
    hadOpenAttr: element.hasAttribute("open"),
    wasDialogOpen,
    activeClasses: collectActiveClasses(element),
  });

  element.classList.add(SUPPRESSED_CLASS);
  element.setAttribute(SUPPRESSED_ATTR, "true");
  element.setAttribute("aria-hidden", "true");

  if (element.hasAttribute("open")) {
    element.removeAttribute("open");
  }

  for (const className of collectActiveClasses(element)) {
    element.classList.remove(className);
  }

  forceHideElement(element);
}

function isThemeCartNotification(element: Element): boolean {
  if (isOurElement(element)) {
    return false;
  }

  const tag = element.tagName.toLowerCase();
  if (tag === "cart-notification") {
    return true;
  }

  for (const selector of CART_NOTIFICATION_SELECTORS) {
    try {
      if (element.matches(selector)) {
        return true;
      }
    } catch {
      // Ignore invalid selectors in older browsers/themes.
    }
  }

  return false;
}

function findThemeCartNotificationElements(): Element[] {
  const found = new Set<Element>();

  for (const selector of CART_NOTIFICATION_SELECTORS) {
    try {
      document.querySelectorAll(selector).forEach((element) => {
        if (isThemeCartNotification(element)) {
          found.add(element);
        }
      });
    } catch {
      // Ignore invalid selectors in older browsers/themes.
    }
  }

  return Array.from(found);
}

export function suppressThemeCartNotification(): void {
  ensureSuppressStyles();

  for (const element of findThemeCartNotificationElements()) {
    if (suppressedElements.has(element)) {
      continue;
    }


    suppressElement(element);
  }
}

function startThemeCartNotificationObserver(): void {
  if (notificationObserver) {
    return;
  }

  notificationObserver = new MutationObserver((mutations) => {
    let shouldSuppress = false;

    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof Element)) {
            continue;
          }

          if (isThemeCartNotification(node)) {
            shouldSuppress = true;
          }

          for (const selector of CART_NOTIFICATION_SELECTORS) {
            try {
              node.querySelectorAll(selector).forEach((element) => {
                if (isThemeCartNotification(element)) {
                  shouldSuppress = true;
                }
              });
            } catch {
              // Ignore invalid selectors in older browsers/themes.
            }
          }
        }
      }

      if (
        mutation.type === "attributes" &&
        mutation.target instanceof Element &&
        isThemeCartNotification(mutation.target) &&
        (mutation.attributeName === "class" ||
          mutation.attributeName === "open" ||
          mutation.attributeName === "aria-hidden")
      ) {
        shouldSuppress = true;
      }
    }

    if (shouldSuppress) {
      suppressThemeCartNotification();
    }
  });

  if (document.body) {
    notificationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "open", "aria-hidden"],
    });
  }
}

function shouldBlockThemeDialogOpen(): boolean {
  return ourCartDrawerOpen;
}

function patchThemeCartDialog(dialog: HTMLDialogElement): void {
  if (isOurElement(dialog) || dialog.hasAttribute(PATCHED_ATTR)) {
    return;
  }

  if (!isThemeCartDrawerCandidate(dialog)) {
    return;
  }

  const originalShowModal = HTMLDialogElement.prototype.showModal.bind(dialog);
  const originalShow = HTMLDialogElement.prototype.show.bind(dialog);

  dialogMethodOverrides.set(dialog, {
    showModal: originalShowModal,
    show: originalShow,
  });

  dialog.showModal = () => {
    if (shouldBlockThemeDialogOpen()) {
      suppressElement(dialog);
      return;
    }

    originalShowModal();
  };

  dialog.show = () => {
    if (shouldBlockThemeDialogOpen()) {
      suppressElement(dialog);
      return;
    }

    originalShow();
  };

  dialog.setAttribute(PATCHED_ATTR, "true");
}

function unpatchThemeCartDialog(dialog: HTMLDialogElement): void {
  const originals = dialogMethodOverrides.get(dialog);
  if (!originals) {
    return;
  }

  dialog.showModal = originals.showModal;
  dialog.show = originals.show;
  dialogMethodOverrides.delete(dialog);
  dialog.removeAttribute(PATCHED_ATTR);
}

export function patchThemeCartDialogs(): void {
  findThemeCartDialogElements().forEach(patchThemeCartDialog);
}

export function suppressThemeCartDrawers(): void {
  ensureSuppressStyles();
  patchThemeCartDialogs();
  findThemeCartDrawerElements().forEach(suppressElement);
  findThemeCartDialogElements().forEach(suppressElement);
  suppressThemeCartNotification();
}

function scheduleThemeCartDrawerSuppression(): void {
  if (suppressFrameId !== null) {
    window.cancelAnimationFrame(suppressFrameId);
  }

  suppressFrameId = window.requestAnimationFrame(() => {
    suppressFrameId = null;
    suppressThemeCartDrawers();
  });
}

export function startThemeCartDialogInterception(): void {
  patchThemeCartDialogs();

  if (dialogInterceptionObserver) {
    return;
  }

  dialogInterceptionObserver = new MutationObserver((mutations) => {
    let shouldPatch = false;
    let shouldSuppress = false;

    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof Element)) {
            continue;
          }

          if (node instanceof HTMLDialogElement && isThemeCartDrawerCandidate(node)) {
            shouldPatch = true;
            if (shouldBlockThemeDialogOpen()) {
              shouldSuppress = true;
            }
          }

          node.querySelectorAll("dialog").forEach((dialog) => {
            if (dialog instanceof HTMLDialogElement && isThemeCartDrawerCandidate(dialog)) {
              shouldPatch = true;
              if (shouldBlockThemeDialogOpen()) {
                shouldSuppress = true;
              }
            }
          });
        }
      }

      if (
        mutation.type === "attributes" &&
        mutation.target instanceof HTMLDialogElement &&
        mutation.attributeName === "open" &&
        isThemeCartDrawerCandidate(mutation.target) &&
        shouldBlockThemeDialogOpen()
      ) {
        shouldSuppress = true;
      }
    }

    if (shouldPatch) {
      patchThemeCartDialogs();
    }

    if (shouldSuppress) {
      scheduleThemeCartDrawerSuppression();
    }
  });

  dialogInterceptionObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["open"],
  });
}

export function stopThemeCartDialogInterception(): void {
  dialogInterceptionObserver?.disconnect();
  dialogInterceptionObserver = null;

  findThemeCartDialogElements().forEach((dialog) => {
    unpatchThemeCartDialog(dialog);
  });
}

export function startThemeCartDrawerSuppression(): void {
  suppressThemeCartDrawers();
  scheduleThemeCartDrawerSuppression();
  startThemeCartDialogInterception();
  startThemeCartNotificationObserver();

  if (suppressionObserver) {
    return;
  }

  suppressionObserver = new MutationObserver(() => {
    scheduleThemeCartDrawerSuppression();
  });

  suppressionObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class", "open", "aria-hidden", "style", "hidden"],
  });
}

export function stopThemeCartDrawerSuppression(): void {
  if (suppressFrameId !== null) {
    window.cancelAnimationFrame(suppressFrameId);
    suppressFrameId = null;
  }

  suppressionObserver?.disconnect();
  suppressionObserver = null;

  for (const [element, state] of suppressedElements.entries()) {
    element.classList.remove(SUPPRESSED_CLASS);
    element.removeAttribute(SUPPRESSED_ATTR);

    if (element instanceof HTMLElement) {
      if (state.inlineDisplay) {
        element.style.display = state.inlineDisplay;
      } else {
        element.style.removeProperty("display");
      }

      if (state.inlineVisibility) {
        element.style.visibility = state.inlineVisibility;
      } else {
        element.style.removeProperty("visibility");
      }

      if (state.inlinePointerEvents) {
        element.style.pointerEvents = state.inlinePointerEvents;
      } else {
        element.style.removeProperty("pointer-events");
      }

      if (state.inlineOpacity) {
        element.style.opacity = state.inlineOpacity;
      } else {
        element.style.removeProperty("opacity");
      }
    }

    if (state.ariaHidden === null) {
      element.removeAttribute("aria-hidden");
    } else {
      element.setAttribute("aria-hidden", state.ariaHidden);
    }

    // Do not restore open/active state — theme drawer must stay closed after our widget closes.
  }

  suppressedElements.clear();
}
