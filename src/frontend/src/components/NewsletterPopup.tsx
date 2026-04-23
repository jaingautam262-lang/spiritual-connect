import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useAddNewsletterSubscription } from "../hooks/useQueries";

const DISMISSED_KEY = "newsletter_dismissed_at";
const DISMISS_DAYS = 7;
const PAGE_LOAD_DELAY_MS = 2000;
const SCROLL_POPUP_GAP_MS = 30000;

const EXCLUDED_PATHS = [
  "/",
  "/admin-cms",
  "/dashboard",
  "/payment-success",
  "/payment-failure",
];
const SCROLL_ELIGIBLE_PATHS = [
  "/calculator/name-numerology",
  "/calculator/birth-chart",
  "/numerology",
  "/horoscope",
  "/astrologer",
  "/blog",
];

function isDismissed(): boolean {
  try {
    const raw = localStorage.getItem(DISMISSED_KEY);
    if (!raw) return false;
    const ts = Number.parseInt(raw, 10);
    return Date.now() - ts < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function markDismissed() {
  try {
    localStorage.setItem(DISMISSED_KEY, String(Date.now()));
  } catch {
    // ignore
  }
}

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [source, setSource] = useState<"popup-load" | "popup-scroll">(
    "popup-load",
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const scrollPopupScheduledRef = useRef(false);
  const location = useLocation();
  const subscribe = useAddNewsletterSubscription();

  const currentPath = location.pathname;
  const isExcluded = EXCLUDED_PATHS.includes(currentPath);
  const isScrollEligible = SCROLL_ELIGIBLE_PATHS.some((p) =>
    currentPath.startsWith(p),
  );

  useEffect(() => {
    if (isExcluded || isDismissed()) return;

    const timer = setTimeout(() => {
      if (!isDismissed()) {
        setSource("popup-load");
        setVisible(true);
      }
    }, PAGE_LOAD_DELAY_MS);

    return () => clearTimeout(timer);
  }, [isExcluded]);

  useEffect(() => {
    if (!isScrollEligible || scrollPopupScheduledRef.current) return;

    const handleScroll = () => {
      if (visible || isDismissed()) return;
      const pageHeight = document.body.scrollHeight - window.innerHeight;
      if (pageHeight <= 0) return;
      const scrollPct = window.scrollY / pageHeight;
      if (scrollPct >= 0.5) {
        scrollPopupScheduledRef.current = true;
        window.removeEventListener("scroll", handleScroll);

        if (isDismissed()) return;

        const raw = localStorage.getItem(DISMISSED_KEY);
        if (raw) {
          // Previously dismissed but outside the 7-day window — enforce a
          // short gap so the scroll popup doesn't fire immediately after a
          // page-load popup for returning users.
          const ts = Number.parseInt(raw, 10);
          const gap = Date.now() - ts;
          if (gap < SCROLL_POPUP_GAP_MS) return;
        }

        setSource("popup-scroll");
        setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrollEligible, visible]);

  function handleDismiss() {
    markDismissed();
    setVisible(false);
  }

  function handleBackdropKey(e: React.KeyboardEvent) {
    if (e.key === "Escape" || e.key === "Enter") handleDismiss();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    try {
      await subscribe.mutateAsync({ email, name: name || undefined, source });
      setSuccess(true);
      setTimeout(() => {
        setVisible(false);
        setSuccess(false);
        setEmail("");
        setName("");
      }, 2500);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
    }
  }

  if (!visible) return null;

  return (
    <dialog
      open
      className="fixed inset-0 z-[9999] m-0 flex h-full w-full items-center justify-center p-4 bg-transparent"
      aria-labelledby="newsletter-popup-title"
      data-ocid="newsletter.dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 cursor-pointer"
        style={{ background: "oklch(0.08 0.04 25 / 0.75)" }}
        role="button"
        tabIndex={0}
        aria-label="Close newsletter popup"
        onClick={handleDismiss}
        onKeyDown={handleBackdropKey}
      />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background:
            "linear-gradient(145deg, oklch(0.16 0.07 22), oklch(0.12 0.05 20))",
          border: "1px solid oklch(0.78 0.14 75 / 0.3)",
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={handleDismiss}
          data-ocid="newsletter.close_button"
          aria-label="Close newsletter popup"
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full transition-colors hover:bg-white/10"
          style={{ color: "oklch(0.70 0.06 60)" }}
        >
          <X className="h-4 w-4" />
        </button>

        {/* Om header decoration */}
        <div
          className="px-6 pt-6 pb-4 text-center"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.25 0.12 48 / 0.4), transparent)",
          }}
        >
          <div className="text-4xl mb-1 leading-none" aria-hidden="true">
            ॐ
          </div>
          <div
            className="w-16 h-0.5 mx-auto rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.78 0.14 75), transparent)",
            }}
          />
        </div>

        <div className="px-6 pb-6">
          {success ? (
            <div className="py-6 text-center space-y-2">
              <div className="text-3xl" aria-hidden="true">
                🙏
              </div>
              <p
                className="font-heading font-semibold text-lg"
                style={{ color: "oklch(0.85 0.12 75)" }}
              >
                धन्यवाद! / Thank you!
              </p>
              <p
                className="text-sm font-body"
                style={{ color: "oklch(0.70 0.05 55)" }}
              >
                आप हमारे आध्यात्मिक परिवार का हिस्सा बन गए हैं।
              </p>
            </div>
          ) : (
            <>
              <h2
                id="newsletter-popup-title"
                className="font-heading font-bold text-xl text-center mb-1"
                style={{ color: "oklch(0.88 0.10 75)" }}
              >
                आध्यात्मिक ज्ञान पाएं
              </h2>
              <p
                className="text-center text-sm font-body mb-5"
                style={{ color: "oklch(0.65 0.05 55)" }}
              >
                Receive daily mantras, festival alerts & spiritual wisdom
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <Label
                    htmlFor="popup-name"
                    className="text-xs font-body mb-1 block"
                    style={{ color: "oklch(0.70 0.06 60)" }}
                  >
                    नाम / Name (Optional)
                  </Label>
                  <Input
                    id="popup-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    data-ocid="newsletter.name_input"
                    className="border font-body text-sm"
                    style={{
                      background: "oklch(0.20 0.06 22)",
                      borderColor: "oklch(0.78 0.14 75 / 0.25)",
                      color: "oklch(0.88 0.06 75)",
                    }}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="popup-email"
                    className="text-xs font-body mb-1 block"
                    style={{ color: "oklch(0.70 0.06 60)" }}
                  >
                    ईमेल / Email{" "}
                    <span style={{ color: "oklch(0.68 0.20 48)" }}>*</span>
                  </Label>
                  <Input
                    id="popup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    data-ocid="newsletter.email_input"
                    className="border font-body text-sm"
                    style={{
                      background: "oklch(0.20 0.06 22)",
                      borderColor: "oklch(0.78 0.14 75 / 0.25)",
                      color: "oklch(0.88 0.06 75)",
                    }}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={subscribe.isPending || !email}
                  data-ocid="newsletter.submit_button"
                  className="w-full font-heading font-semibold text-sm py-2 rounded-full transition-all disabled:opacity-50"
                  style={{
                    background: subscribe.isPending
                      ? "oklch(0.50 0.14 48)"
                      : "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                    color: "white",
                    border: "none",
                  }}
                >
                  {subscribe.isPending
                    ? "सदस्यता हो रही है..."
                    : "🔔 Subscribe Now / सदस्यता लें"}
                </Button>

                <p
                  className="text-center text-xs font-body"
                  style={{ color: "oklch(0.50 0.04 50)" }}
                >
                  No spam. Unsubscribe anytime. • कभी भी अनसब्सक्राइब करें।
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </dialog>
  );
}
