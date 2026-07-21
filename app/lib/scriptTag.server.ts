import type { AdminApiContext } from "@shopify/shopify-app-react-router/server";

const SCRIPT_TAG_HANDLE = "cart-drawer-upsell-widget";

const SCRIPT_TAG_CREATE = `#graphql
  mutation ScriptTagCreate($input: ScriptTagInput!) {
    scriptTagCreate(input: $input) {
      scriptTag {
        id
        src
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const SCRIPT_TAGS_QUERY = `#graphql
  query ScriptTags($first: Int!) {
    scriptTags(first: $first) {
      nodes {
        id
        src
      }
    }
  }
`;

const SCRIPT_TAG_DELETE = `#graphql
  mutation ScriptTagDelete($id: ID!) {
    scriptTagDelete(id: $id) {
      deletedScriptTagId
      userErrors {
        field
        message
      }
    }
  }
`;

export function getCartWidgetScriptSrc(): string {
  const appUrl = (process.env.SHOPIFY_APP_URL || "").replace(/\/$/, "");
  return `${appUrl}/assets/cart-widget.js`;
}

function isCartWidgetScriptTag(src: string): boolean {
  return (
    src.includes("/assets/cart-widget.js") ||
    src.includes("/apps/cart-widget/script.js")
  );
}

async function listCartWidgetScriptTags(
  admin: AdminApiContext,
): Promise<Array<{ id: string; src: string }>> {
  const response = await admin.graphql(SCRIPT_TAGS_QUERY, {
    variables: { first: 50 },
  });

  const payload = (await response.json()) as {
    data?: {
      scriptTags?: {
        nodes?: Array<{ id: string; src: string }>;
      };
    };
    errors?: Array<{ message: string }>;
  };

  const nodes = payload.data?.scriptTags?.nodes ?? [];
  return nodes.filter((node) => isCartWidgetScriptTag(node.src));
}

async function deleteScriptTagById(
  admin: AdminApiContext,
  id: string,
): Promise<void> {
  const response = await admin.graphql(SCRIPT_TAG_DELETE, {
    variables: { id },
  });

  const payload = (await response.json()) as {
    data?: {
      scriptTagDelete?: {
        deletedScriptTagId?: string | null;
        userErrors?: Array<{ message: string }>;
      };
    };
    errors?: Array<{ message: string }>;
  };

  const userErrors = payload.data?.scriptTagDelete?.userErrors ?? [];
  if (userErrors.length > 0) {
    throw new Error(userErrors.map((error) => error.message).join(", "));
  }
}

export async function createCartWidgetScriptTag(
  admin: AdminApiContext,
): Promise<{ id: string; src: string }> {
  const src = getCartWidgetScriptSrc();

  if (!process.env.SHOPIFY_APP_URL) {
    throw new Error("SHOPIFY_APP_URL is not configured");
  }

  const existingTags = await listCartWidgetScriptTags(admin);

  for (const tag of existingTags) {
    await deleteScriptTagById(admin, tag.id);
  }

  const response = await admin.graphql(SCRIPT_TAG_CREATE, {
    variables: {
      input: {
        src,
        displayScope: "ONLINE_STORE",
        cache: false,
      },
    },
  });

  const payload = (await response.json()) as {
    data?: {
      scriptTagCreate?: {
        scriptTag?: { id: string; src: string } | null;
        userErrors?: Array<{ message: string }>;
      };
    };
    errors?: Array<{ message: string }>;
  };

  const userErrors = payload.data?.scriptTagCreate?.userErrors ?? [];
  if (userErrors.length > 0) {
    throw new Error(userErrors.map((error) => error.message).join(", "));
  }

  const scriptTag = payload.data?.scriptTagCreate?.scriptTag;
  if (!scriptTag) {
    throw new Error("Failed to create script tag");
  }

  return scriptTag;
}

export async function deleteCartWidgetScriptTag(
  admin: AdminApiContext,
): Promise<boolean> {
  const existingTags = await listCartWidgetScriptTags(admin);

  if (existingTags.length === 0) {
    return false;
  }

  for (const tag of existingTags) {
    await deleteScriptTagById(admin, tag.id);
  }

  return true;
}

export { SCRIPT_TAG_HANDLE };
