import type { AdminApiContext } from "@shopify/shopify-app-react-router/server";

export type UpsellProduct = {
  id: string;
  title: string;
  handle: string;
  imageUrl: string | null;
  variantId: string;
  price: number;
};

const UPSELL_PRODUCTS_BY_IDS_QUERY = `#graphql
  query UpsellProductsByIds($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        id
        title
        handle
        featuredImage {
          url
        }
        variants(first: 1) {
          nodes {
            id
            price
          }
        }
      }
    }
  }
`;

function parsePrice(value: string | undefined): number {
  const parsed = Number.parseFloat(value ?? "0");
  return Number.isFinite(parsed) ? parsed : 0;
}

export function toProductGid(id: string): string {
  if (id.startsWith("gid://")) {
    return id;
  }
  return `gid://shopify/Product/${id}`;
}

function mapGraphqlProduct(node: {
  id?: string;
  title?: string;
  handle?: string;
  featuredImage?: { url?: string } | null;
  variants?: { nodes?: Array<{ id?: string; price?: string }> };
}): UpsellProduct | null {
  const variant = node.variants?.nodes?.[0];
  if (!node.id || !variant?.id) {
    return null;
  }

  return {
    id: node.id,
    title: node.title ?? node.id,
    handle: node.handle ?? "",
    imageUrl: node.featuredImage?.url ?? null,
    variantId: variant.id,
    price: parsePrice(variant.price),
  };
}

export async function fetchUpsellProductsByIds(
  admin: AdminApiContext,
  ids: string[],
): Promise<UpsellProduct[]> {
  if (ids.length === 0) {
    return [];
  }

  const response = await admin.graphql(UPSELL_PRODUCTS_BY_IDS_QUERY, {
    variables: { ids },
  });
  const payload = (await response.json()) as {
    data?: {
      nodes?: Array<{
        id?: string;
        title?: string;
        handle?: string;
        featuredImage?: { url?: string } | null;
        variants?: { nodes?: Array<{ id?: string; price?: string }> };
      } | null>;
    };
  };

  return (payload.data?.nodes ?? [])
    .map((node) => (node ? mapGraphqlProduct(node) : null))
    .filter((product): product is UpsellProduct => product !== null);
}
