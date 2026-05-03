import { fileURLToPath, URL } from "url";
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import environment from "vite-plugin-environment";

const ii_url =
  process.env.DFX_NETWORK === "local"
    ? `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:8081/`
    : `https://identity.internetcomputer.org/`;

process.env.II_URL = process.env.II_URL || ii_url;
process.env.STORAGE_GATEWAY_URL =
  process.env.STORAGE_GATEWAY_URL || "https://blob.caffeine.ai";

export default defineConfig({
  logLevel: "error",
  build: {
    emptyOutDir: true,
    sourcemap: false,
    minify: true,
    commonjsOptions: {
      include: [/node_modules/],
    },
    rollupOptions: {
      output: {
        // CRITICAL: React core + scheduler MUST be in the same chunk, loaded first.
        // This prevents "Failed to resolve module specifier 'scheduler'" which
        // happens when scheduler lands in a chunk that loads before react-dom.
        manualChunks: (id) => {
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/scheduler/")
          ) {
            return "react-core";
          }
          // Everything else: let Rollup auto-split
        },
      },
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
  optimizeDeps: {
    // Force fresh pre-bundling so esbuild resolves scheduler as a bundled module
    // (not a bare specifier). This prevents the browser from ever seeing "scheduler"
    // as a raw import that it cannot resolve.
    force: true,
    include: [
      "react",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "react-dom",
      "react-dom/client",
      "scheduler",
      "scheduler/tracing",
    ],
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      target: "es2020",
    },
  },
  esbuild: {
    define: {
      global: "globalThis",
    },
    target: "es2020",
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
    environment(["II_URL"]),
    environment(["STORAGE_GATEWAY_URL"]),
    react(),
  ],
  resolve: {
    alias: [
      {
        find: "declarations",
        replacement: fileURLToPath(new URL("../declarations", import.meta.url)),
      },
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
      // CRITICAL: Map "scheduler" to its production CJS file directly.
      // Without this, Rollup's CommonJS transform wraps require("scheduler")
      // as a virtual external (?commonjs-external) which the browser can't resolve.
      {
        find: "scheduler",
        replacement: path.resolve(
          fileURLToPath(new URL(".", import.meta.url)),
          "../../node_modules/.pnpm/scheduler@0.26.0/node_modules/scheduler/cjs/scheduler.production.js"
        ),
      },
    ],
    // Deduplicate React + scheduler — ensures only ONE copy exists across all chunks.
    dedupe: ["react", "react-dom", "react-dom/client", "scheduler", "@dfinity/agent"],
  },
});
