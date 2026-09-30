import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// TanStack prerenders each route in CI; only .output/client is uploaded.
export default defineConfig({
  nitro: false,
  vite: { build: { outDir: ".output" } },
  tanstackStart: {
    server: { entry: "server" },
    pages: [
      { path: "/" },
      { path: "/quem-somos" },
      { path: "/servicos" },
      { path: "/blog" },
      { path: "/contato" },
    ],
    prerender: { enabled: true, autoStaticPathsDiscovery: false, crawlLinks: false },
  },
});