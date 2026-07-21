import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  publicDir: false,
  plugins: [tsconfigPaths()],
  esbuild: {
    jsx: "automatic",
  },
  build: {
    outDir: "public/assets",
    emptyOutDir: false,
    lib: {
      entry: "app/assets/cart-widget.js",
      formats: ["iife"],
      name: "CartDrawerUpsell",
      fileName: () => "cart-widget.js",
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        assetFileNames: "cart-widget.[ext]",
      },
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
});
