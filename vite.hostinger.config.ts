import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Use outside Lovable's managed build (e.g. CI); only .output/public is uploaded.
export default defineConfig({
  nitro: { preset: "static" },
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