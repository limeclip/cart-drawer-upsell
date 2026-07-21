export type ThemeCartItem = {
  key: string;
  title: string;
  price: number;
  quantity: number;
  line_price: number;
  image: string | null;
  url: string;
  variant_id: number;
};

export type ThemeCart = {
  token?: string;
  note: string | null;
  attributes: Record<string, string>;
  total_price: number;
  item_count: number;
  items: ThemeCartItem[];
  currency?: string;
  items_subtotal_price?: number;
  cart_level_discount_applications?: Array<{
    title?: string;
    total_allocated_amount?: number;
  }>;
};

async function parseCartResponse(response: Response): Promise<ThemeCart | null> {
  if (!response.ok) {
    return null;
  }

  return (await response.json()) as ThemeCart;
}

export async function loadCart(): Promise<ThemeCart | null> {
  const response = await fetch("/cart.js", { credentials: "same-origin" });
  return parseCartResponse(response);
}

export async function addItem(
  variantId: number,
  quantity = 1,
): Promise<ThemeCart | null> {
  const response = await fetch("/cart/add.js", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({
      items: [{ id: variantId, quantity }],
    }),
  });

  return parseCartResponse(response);
}

export async function removeItem(lineItemKey: string): Promise<ThemeCart | null> {
  const response = await fetch("/cart/change.js", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({ id: lineItemKey, quantity: 0 }),
  });

  return parseCartResponse(response);
}

export async function updateItem(
  lineItemKey: string,
  quantity: number,
): Promise<ThemeCart | null> {
  const response = await fetch("/cart/change.js", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({ id: lineItemKey, quantity }),
  });

  return parseCartResponse(response);
}

export async function updateNote(note: string): Promise<ThemeCart | null> {
  const response = await fetch("/cart/update.js", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({ note }),
  });

  return parseCartResponse(response);
}

export async function updateAttributes(
  attributes: Record<string, string>,
): Promise<ThemeCart | null> {
  const response = await fetch("/cart/update.js", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({ attributes }),
  });

  return parseCartResponse(response);
}

export async function applyDiscount(code: string): Promise<ThemeCart | null> {
  const response = await fetch("/cart/update.js", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({ discount: code }),
  });

  return parseCartResponse(response);
}
