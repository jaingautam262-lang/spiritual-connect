export default function AppLoadingScreen() {
  return (
    <div
      className="min-h-screen bg-background flex flex-col items-center justify-center gap-6"
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
          className="absolute inset-0 rounded-full animate-ping opacity-25 bg-primary"
          aria-hidden="true"
        />
        <div className="relative z-10 flex items-center justify-center w-full h-full rounded-full bg-primary/10 border border-primary/30">
          <span
            className="text-4xl text-primary select-none leading-none"
            aria-hidden="true"
          >
            ॐ
          </span>
        </div>
      </div>

      {/* App name */}
      <div className="text-center space-y-1">
        <h1 className="font-display text-xl font-semibold text-foreground tracking-wide">
          Spiritual Connect
        </h1>
        <p className="text-xs text-muted-foreground tracking-widest uppercase">
          Loading…
        </p>
      </div>

      {/* Animated progress bar */}
      <div
        className="w-40 h-0.5 bg-muted rounded-full overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="h-full bg-primary rounded-full"
          style={{
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
