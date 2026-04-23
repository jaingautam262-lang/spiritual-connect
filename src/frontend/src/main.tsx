import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// CRITICAL: React and ReactDOM must be imported first before any other modules
// to ensure the scheduler (unstable_scheduleCallback) is initialized.
import React from "react";
import { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import AppLoadingScreen from "./components/AppLoadingScreen";
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
      retry: 1,
      staleTime: 30_000,
    },
  },
});

// Lazily import App to ensure React is fully initialized before
// any @caffeineai/core-infrastructure modules load (fixes createContext crash)
const App = lazy(() => import("./App"));

// Lazily import InternetIdentityProvider to defer its initialization after React
// is available in the module scope — avoids "Cannot read createContext of undefined"
const InternetIdentityProviderLazy = lazy(() =>
  import("@caffeineai/core-infrastructure").then((mod) => ({
    default: mod.InternetIdentityProvider,
  })),
);

function Root() {
  return (
    <Suspense fallback={<AppLoadingScreen />}>
      <InternetIdentityProviderLazy>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </InternetIdentityProviderLazy>
    </Suspense>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <Root />
    </QueryClientProvider>
  </ErrorBoundary>,
);
