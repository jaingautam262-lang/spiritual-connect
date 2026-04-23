import { fileURLToPath, URL } from "url";
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
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split large stotra/data files into their own chunk
          if (
            id.includes("part26Stotras") ||
            id.includes("part27Stotras") ||
            id.includes("stotraData")
          ) {
            return "stotra-data-main";
          }
          if (
            id.includes("part12Stotras") ||
            id.includes("part13") ||
            id.includes("part14") ||
            id.includes("part15") ||
            id.includes("part16") ||
            id.includes("part17") ||
            id.includes("part18") ||
            id.includes("part19")
          ) {
            return "stotra-data-a";
          }
          if (
            id.includes("part20") ||
            id.includes("part21") ||
            id.includes("part22") ||
            id.includes("part23") ||
            id.includes("part24") ||
            id.includes("part25")
          ) {
            return "stotra-data-b";
          }
          if (
            id.includes("stutiData_5") ||
            id.includes("stutiData_6") ||
            id.includes("stutiData_7") ||
            id.includes("stutiData_8")
          ) {
            return "stuti-data-b";
          }
          if (
            id.includes("stutiData_1") ||
            id.includes("stutiData_2") ||
            id.includes("stutiData_3") ||
            id.includes("stutiData_4")
          ) {
            return "stuti-data-a";
          }
          if (
            id.includes("sahasranamaData_a") ||
            id.includes("sahasranamaData_b") ||
            id.includes("sahasranamaData")
          ) {
            return "sahasranama-data";
          }
          if (id.includes("holyBooksData")) {
            return "holy-books-data";
          }
          if (id.includes("kavachData")) {
            return "kavach-data";
          }
          if (
            id.includes("ashtakamData_A1") ||
            id.includes("ashtakamData_A2") ||
            id.includes("ashtakamData_A3") ||
            id.includes("ashtakamData_A4")
          ) {
            return "ashtakam-data-a";
          }
          if (
            id.includes("ashtakamData_A5") ||
            id.includes("ashtakamData_A6") ||
            id.includes("ashtakamData_A7") ||
            id.includes("ashtakamData_B1") ||
            id.includes("ashtakamData_B2")
          ) {
            return "ashtakam-data-b";
          }
          if (
            id.includes("ashtakamData_B3") ||
            id.includes("ashtakamData_B4") ||
            id.includes("ashtakamData_B5") ||
            id.includes("ashtakamData_B6") ||
            id.includes("ashtakamData_B7") ||
            id.includes("ashtakamData_C1") ||
            id.includes("ashtakamData_C2") ||
            id.includes("ashtakamData_C3") ||
            id.includes("ashtakamData_C4") ||
            id.includes("ashtakamDataA") ||
            id.includes("ashtakamDataB") ||
            id.includes("ashtakamDataC")
          ) {
            return "ashtakam-data-c";
          }
          if (id.includes("aartiData") || id.includes("chalisaData") || id.includes("mantraData")) {
            return "devotional-data";
          }
          if (id.includes("shopData")) {
            return "shop-data";
          }
          if (id.includes("node_modules")) {
            if (
              id.includes("@dfinity") ||
              id.includes("@noble") ||
              id.includes("@motoko") ||
              id.includes("borc") ||
              id.includes("agent")
            ) {
              return "dfinity-vendor";
            }
            // Keep react/react-dom isolated to ensure scheduler initializes first
            if (
              id.includes("/react-dom/") ||
              id.includes("/react/") ||
              id.includes("scheduler")
            ) {
              return "react-core";
            }
            if (id.includes("tanstack") || id.includes("lucide")) {
              return "react-vendor";
            }
            return "vendor";
          }
        },
      },
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-dom/client", "scheduler"],
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
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
    ],
    dedupe: ["@dfinity/agent", "react", "react-dom"]
  },
});
