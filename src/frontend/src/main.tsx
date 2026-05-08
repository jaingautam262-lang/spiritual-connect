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
import ConnectionStatus from "./components/ConnectionStatus";
// TikTok Pixel — loaded as a side-effect script block
declare global {
  interface Window {
    ttq: unknown;
    TiktokAnalyticsObject: string;
  }
}
{
  const _w = window as any;
  _w.TiktokAnalyticsObject = "ttq";
  if (!_w.ttq) {
    _w.ttq = [];
  }
  const ttq = _w.ttq;
  ttq.methods = [
    "page",
    "track",
    "identify",
    "instances",
    "debug",
    "on",
    "off",
    "once",
    "ready",
    "alias",
    "group",
    "enableCookie",
    "disableCookie",
  ];
  const setAndDefer = (obj: any, method: string) => {
    obj[method] = (...args: unknown[]) => {
      obj.push([method, ...args]);
    };
  };
  for (let _i = 0; _i < ttq.methods.length; _i++)
    setAndDefer(ttq, ttq.methods[_i]);
  ttq.instance = (id: string) => {
    const e = ttq._i?.[id] || [];
    for (let _n = 0; _n < ttq.methods.length; _n++)
      setAndDefer(e, ttq.methods[_n]);
    return e;
  };
  ttq.load = (e: string, n?: unknown) => {
    const scriptUrl = "https://analytics.tiktok.com/i18n/pixel/events.js";
    ttq._i = ttq._i || {};
    ttq._i[e] = [];
    ttq._i[e]._u = scriptUrl;
    ttq._t = ttq._t || {};
    ttq._t[e] = +new Date();
    ttq._o = ttq._o || {};
    ttq._o[e] = n || {};
    const scriptEl = document.createElement("script");
    scriptEl.type = "text/javascript";
    scriptEl.async = true;
    scriptEl.src = `${scriptUrl}?sdkid=${e}&lib=ttq`;
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode?.insertBefore(scriptEl, firstScript);
  };
  ttq.load("TIKTOKNATIVEPLACEHOLDERID");
  ttq.page();
}

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
          <ConnectionStatus />
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
