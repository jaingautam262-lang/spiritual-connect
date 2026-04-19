import { InternetIdentityProvider } from "@caffeineai/core-infrastructure";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <Suspense fallback={<AppLoadingScreen />}>
      <QueryClientProvider client={queryClient}>
        <InternetIdentityProvider>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </InternetIdentityProvider>
      </QueryClientProvider>
    </Suspense>
  </ErrorBoundary>,
);
