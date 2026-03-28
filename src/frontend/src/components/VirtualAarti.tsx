import { useState } from "react";

export default function VirtualAarti() {
  const [dyiaLit, setDiyaLit] = useState(false);
  const [bellRinging, setBellRinging] = useState(false);
  const [conchBlowing, setConchBlowing] = useState(false);
  const [_bellRipples, setBellRipples] = useState(0);
  const [_conchWaves, setConchWaves] = useState(0);

  const lightDiya = () => setDiyaLit(true);

  const ringBell = () => {
    setBellRinging(true);
    setBellRipples((p) => p + 1);
    setTimeout(() => setBellRinging(false), 1000);
  };

  const blowConch = () => {
    setConchBlowing(true);
    setConchWaves((p) => p + 1);
    setTimeout(() => setConchBlowing(false), 1500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="ornamental-border rounded-2xl p-6 md:p-10 bg-card text-center">
        <h2
          className="font-heading text-2xl font-bold mb-2"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          🪔 Virtual Aarti
        </h2>
        <p className="font-body text-sm text-muted-foreground mb-8">
          Light the diya, ring the bell, and blow the conch to perform your
          virtual aarti
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-8">
          {/* Diya */}
          <div className="flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={lightDiya}
              className="relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: dyiaLit
                  ? "radial-gradient(circle, oklch(0.88 0.18 75) 0%, oklch(0.68 0.20 48) 50%, oklch(0.45 0.15 35) 100%)"
                  : "oklch(0.93 0.02 75)",
                boxShadow: dyiaLit
                  ? "0 0 40px oklch(0.78 0.14 75 / 0.6), 0 0 80px oklch(0.68 0.20 48 / 0.3)"
                  : "none",
                border: "2px solid oklch(0.78 0.14 75 / 0.3)",
              }}
            >
              {dyiaLit ? (
                <div className="relative">
                  <span className="text-5xl">🪔</span>
                  <div
                    className="absolute -top-6 left-1/2 -translate-x-1/2 w-3 h-8 rounded-full animate-flame"
                    style={{
                      background:
                        "linear-gradient(to top, oklch(0.68 0.20 48), oklch(0.88 0.18 75), oklch(0.95 0.05 80))",
                    }}
                  />
                </div>
              ) : (
                <span className="text-5xl opacity-50">🪔</span>
              )}
            </button>
            <p
              className="font-heading font-semibold text-sm"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              {dyiaLit ? "✨ Diya Lit!" : "Click to Light Diya"}
            </p>
          </div>

          {/* Bell */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <button
                type="button"
                onClick={ringBell}
                className="w-28 h-28 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background: bellRinging
                    ? "oklch(0.78 0.14 75 / 0.2)"
                    : "oklch(0.93 0.02 75)",
                  border: "2px solid oklch(0.78 0.14 75 / 0.3)",
                  animation: bellRinging
                    ? "bell-shake 0.5s ease-in-out"
                    : "none",
                }}
              >
                <span
                  className="text-5xl"
                  style={{
                    display: "inline-block",
                    animation: bellRinging
                      ? "bell-shake 0.3s ease-in-out 3"
                      : "none",
                  }}
                >
                  🔔
                </span>
              </button>
              {bellRinging && (
                <div
                  className="absolute inset-0 rounded-full animate-ripple pointer-events-none"
                  style={{ border: "2px solid oklch(0.78 0.14 75 / 0.5)" }}
                />
              )}
            </div>
            <p
              className="font-heading font-semibold text-sm"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              {bellRinging ? "🔔 Ringing..." : "Click to Ring Bell"}
            </p>
          </div>

          {/* Conch */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <button
                type="button"
                onClick={blowConch}
                className="w-28 h-28 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background: conchBlowing
                    ? "oklch(0.55 0.12 200 / 0.15)"
                    : "oklch(0.93 0.02 75)",
                  border: "2px solid oklch(0.78 0.14 75 / 0.3)",
                }}
              >
                <span className="text-5xl">🐚</span>
              </button>
              {conchBlowing && (
                <>
                  <div
                    className="absolute inset-0 rounded-full animate-ripple pointer-events-none"
                    style={{ border: "2px solid oklch(0.55 0.12 200 / 0.4)" }}
                  />
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      border: "2px solid oklch(0.55 0.12 200 / 0.3)",
                      animation: "ripple 1s ease-out 0.3s forwards",
                    }}
                  />
                </>
              )}
            </div>
            <p
              className="font-heading font-semibold text-sm"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              {conchBlowing ? "🐚 Blowing..." : "Click to Blow Conch"}
            </p>
          </div>
        </div>

        {dyiaLit && (
          <div
            className="p-4 rounded-xl border"
            style={{
              background: "oklch(0.78 0.14 75 / 0.08)",
              borderColor: "oklch(0.78 0.14 75 / 0.2)",
            }}
          >
            <p
              className="font-heading text-sm italic"
              style={{ color: "oklch(0.45 0.12 35)" }}
            >
              ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे।
              <br />
              भक्त जनों के संकट, दास जनों के संकट, क्षण में दूर करे।
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
