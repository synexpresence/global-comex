import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Use outside Lovable's managed build (e.g. CI); only .output/public is uploaded.
export default defineConfig({
  // TanStack prerenders HTML during the build; no server files are deployed.
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
    prerender: { enabled: true, autoStaticPathsDiscovery: false },
  },
});