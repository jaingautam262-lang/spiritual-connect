// CRITICAL: React must be the VERY FIRST import — before any other module.
// This guarantees React (and scheduler) are initialized before any component code runs.
import React from "react";
import ReactDOM from "react-dom/client";

// Remove the loading overlay once React is initialized.
// Called right after render() — no setTimeout, no requestAnimationFrame delays.
function removeOverlay() {
  const overlay = document.getElementById("loading-overlay");
  if (overlay) {
    overlay.style.transition = "opacity 0.3s ease";
    overlay.style.opacity = "0";
    setTimeout(() => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 320);
  }
}

// Safety net: if any JS error fires before React mounts, still remove the overlay
// so users never see a permanently stuck loading screen.
window.addEventListener("error", (e) => {
  console.error("[GlobalError]", e.message, e.filename, e.lineno, e.error);
  removeOverlay();
});
window.addEventListener("unhandledrejection", (e) => {
  console.error("[UnhandledRejection]", e.reason);
  removeOverlay();
});

// Runtime guard — verify React bundled correctly before rendering anything.
if (
  typeof React === "undefined" ||
  typeof React.createContext === "undefined"
) {
  removeOverlay();
  document.body.innerHTML = `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;
      flex-direction:column;gap:16px;background:#1a0f00;color:#FFD700;
      font-family:sans-serif;padding:24px;text-align:center">
      <div style="font-size:48px">ॐ</div>
      <h1 style="font-size:20px;font-weight:600;margin:0">Spiritual Connect</h1>
      <p style="font-size:14px;opacity:0.7;margin:0">React failed to initialize. Please reload the page.</p>
      <button onclick="window.location.reload()"
        style="background:#b45309;color:#fff;border:none;border-radius:6px;
          padding:10px 20px;cursor:pointer;font-size:14px;margin-top:8px">
        Reload Page
      </button>
    </div>`;
  throw new Error(
    "[main] React.createContext is undefined — bundle init failed",
  );
}

import { InternetIdentityProvider } from "@caffeineai/core-infrastructure";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// App is imported EAGERLY (not lazy) to avoid Suspense deadlock.
// Lazy loading App with 140+ pages causes Suspense to stay forever on error.
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import { LanguageProvider } from "./contexts/LanguageContext";
import "./index.css";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 30_000,
      throwOnError: false,
    },
  },
});

function Root() {
  return (
    <ErrorBoundary>
      <InternetIdentityProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </InternetIdentityProvider>
    </ErrorBoundary>
  );
}

const rootEl = document.getElementById("root");
if (!rootEl) {
  removeOverlay();
  throw new Error("[main] #root element not found in DOM");
}

ReactDOM.createRoot(rootEl).render(
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <Root />
    </QueryClientProvider>
  </ErrorBoundary>,
);

// Remove overlay immediately after render() is called —
// React is now running and will paint the first frame.
removeOverlay();
