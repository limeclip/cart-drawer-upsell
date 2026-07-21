/// <reference types="vite/client" />
/// <reference types="@react-router/node" />

interface ImportMetaEnv {
  readonly SHOPIFY_STOREFRONT_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
