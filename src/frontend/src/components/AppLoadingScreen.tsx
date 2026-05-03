import { useEffect } from "react";

export default function AppLoadingScreen() {
  // Hide the HTML loading overlay the moment this React component mounts —
  // that means React has hydrated and the Suspense is resolving.
  useEffect(() => {
    const el = document.getElementById("app-loading");
    if (el) {
      el.classList.add("hidden");
      setTimeout(() => el.parentNode?.removeChild(el), 400);
    }
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6"
      style={{ background: "#1a0f00" }}
      aria-live="polite"
      aria-label="Loading Spiritual Connect"
      data-ocid="app.loading_state"
    >
      {/* Pulsing Om Symbol */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: 80, height: 80 }}
      >
        <span
          className="absolute inset-0 rounded-full opacity-25 animate-ping"
          style={{ background: "oklch(0.68 0.20 48)" }}
          aria-hidden="true"
        />
        <div
          className="relative z-10 flex items-center justify-center w-full h-full rounded-full"
          style={{
            background: "oklch(0.68 0.20 48 / 0.1)",
            border: "1px solid oklch(0.68 0.20 48 / 0.3)",
          }}
        >
          <span
            className="text-4xl select-none leading-none"
            style={{ color: "oklch(0.78 0.14 75)" }}
            aria-hidden="true"
          >
            ॐ
          </span>
        </div>
      </div>

      <div className="text-center space-y-1">
        <h1
          className="text-xl font-semibold tracking-wide"
          style={{ color: "oklch(0.92 0.06 72)", fontFamily: "serif" }}
        >
          Spiritual Connect
        </h1>
        <p
          className="text-xs tracking-widest uppercase"
          style={{ color: "oklch(0.60 0.04 55)" }}
        >
          Loading…
        </p>
      </div>

      <div
        className="w-40 h-0.5 rounded-full overflow-hidden"
        style={{ background: "oklch(0.25 0.05 30)" }}
        aria-hidden="true"
      >
        <div
          className="h-full rounded-full"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.78 0.14 75), oklch(0.68 0.20 48))",
            animation: "sc-shimmer 1.4s ease-in-out infinite",
            width: "40%",
          }}
        />
      </div>

      <style>{`
        @keyframes sc-shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
      `}</style>
    </div>
  );
}
