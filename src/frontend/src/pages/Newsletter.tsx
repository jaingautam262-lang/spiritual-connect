import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Bell, BookOpen, Calendar, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useAddNewsletterSubscription,
  useUnsubscribeNewsletter,
} from "../hooks/useQueries";

const benefits = [
  {
    icon: Bell,
    title: "दैनिक मंत्र / Daily Mantras",
    desc: "Start your day with powerful mantras handpicked by our priests.",
  },
  {
    icon: Calendar,
    title: "त्योहार अलर्ट / Festival Alerts",
    desc: "Never miss Ekadashi, Navratri, Diwali or any sacred day.",
  },
  {
    icon: Star,
    title: "ज्योतिषी अपडेट / Astrology Updates",
    desc: "Weekly planetary insights, muhurat recommendations & horoscope.",
  },
  {
    icon: BookOpen,
    title: "सप्ताह का मंत्र / Mantra of the Week",
    desc: "Deep dive into one mantra — meaning, benefits & how to chant.",
  },
  {
    icon: Sparkles,
    title: "आध्यात्मिक ज्ञान / Spiritual Wisdom",
    desc: "Curated articles on Vedic philosophy, Ayurveda & temple traditions.",
  },
];

export default function Newsletter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const [unsubEmail, setUnsubEmail] = useState("");
  const [unsubDone, setUnsubDone] = useState(false);

  const subscribe = useAddNewsletterSubscription();
  const unsubscribe = useUnsubscribeNewsletter();

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    try {
      await subscribe.mutateAsync({
        email,
        name: name || undefined,
        source: "newsletter-page",
      });
      setSubscribed(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
    }
  }

  async function handleUnsubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!unsubEmail) return;
    try {
      await unsubscribe.mutateAsync(unsubEmail);
      setUnsubDone(true);
      toast.success("Successfully unsubscribed.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not unsubscribe";
      toast.error(msg);
    }
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.13 0.06 22)" }}
      data-ocid="newsletter.page"
    >
      {/* Hero */}
      <section
        className="relative overflow-hidden py-20 px-4 text-center"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.22 0.10 40) 0%, oklch(0.15 0.07 28) 50%, oklch(0.12 0.05 22) 100%)",
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute top-8 left-1/4 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: "oklch(0.68 0.20 48)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ background: "oklch(0.78 0.14 75)" }}
        />

        <div className="relative max-w-2xl mx-auto">
          <div
            className="text-6xl mb-4 font-decorative"
            aria-hidden="true"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            ॐ
          </div>
          <h1
            className="font-heading font-bold text-3xl md:text-5xl mb-3"
            style={{ color: "oklch(0.90 0.08 75)" }}
          >
            आध्यात्मिक न्यूज़लेटर
          </h1>
          <p
            className="font-heading text-lg md:text-xl mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Spiritual Newsletter
          </p>
          <p
            className="font-body text-base max-w-lg mx-auto"
            style={{ color: "oklch(0.65 0.05 55)" }}
          >
            ज्ञान, भक्ति और आनंद का खजाना — सीधे आपके inbox में।
            <br />
            <span className="text-sm">
              A treasure of knowledge, devotion and joy — straight to your
              inbox.
            </span>
          </p>
        </div>
      </section>

      {/* Subscribe form */}
      <section
        className="py-14 px-4"
        style={{ background: "oklch(0.15 0.06 24)" }}
        data-ocid="newsletter.subscribe_section"
      >
        <div className="max-w-lg mx-auto">
          {subscribed ? (
            <div
              className="rounded-2xl p-10 text-center space-y-4"
              style={{
                background:
                  "linear-gradient(145deg, oklch(0.20 0.10 45), oklch(0.16 0.07 30))",
                border: "1px solid oklch(0.78 0.14 75 / 0.25)",
              }}
              data-ocid="newsletter.success_state"
            >
              <div className="text-5xl" aria-hidden="true">
                🙏
              </div>
              <h2
                className="font-heading font-bold text-2xl"
                style={{ color: "oklch(0.88 0.10 75)" }}
              >
                धन्यवाद! / Thank You!
              </h2>
              <p
                className="font-body text-sm"
                style={{ color: "oklch(0.68 0.06 55)" }}
              >
                आप हमारे आध्यात्मिक परिवार का हिस्सा बन गए हैं।
                <br />
                You have joined our spiritual family.
              </p>
              <div className="flex justify-center gap-3 pt-2 flex-wrap">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent("Join Spiritual Connect newsletter for daily mantras & astrology! https://spiritualconnect.app/newsletter")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full text-sm font-heading font-semibold transition-colors"
                  style={{ background: "oklch(0.55 0.18 145)", color: "white" }}
                  data-ocid="newsletter.share_whatsapp"
                >
                  Share on WhatsApp
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Joined @SpiritualConnect newsletter 🙏 Daily mantras, festival alerts & astrology updates!")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full text-sm font-heading font-semibold transition-colors"
                  style={{ background: "oklch(0.55 0.14 230)", color: "white" }}
                  data-ocid="newsletter.share_twitter"
                >
                  Share on X
                </a>
              </div>
            </div>
          ) : (
            <div
              className="rounded-2xl p-8"
              style={{
                background:
                  "linear-gradient(145deg, oklch(0.18 0.08 35), oklch(0.14 0.06 25))",
                border: "1px solid oklch(0.78 0.14 75 / 0.2)",
              }}
            >
              <h2
                className="font-heading font-bold text-xl mb-1 text-center"
                style={{ color: "oklch(0.88 0.10 75)" }}
              >
                सदस्यता लें / Subscribe
              </h2>
              <p
                className="text-center text-sm font-body mb-6"
                style={{ color: "oklch(0.60 0.05 50)" }}
              >
                Join 10,000+ devotees receiving spiritual wisdom weekly
              </p>

              <form onSubmit={handleSubscribe} className="space-y-4">
                <div>
                  <Label
                    htmlFor="nl-name"
                    className="text-sm font-body mb-1.5 block"
                    style={{ color: "oklch(0.72 0.06 60)" }}
                  >
                    नाम / Name (Optional)
                  </Label>
                  <Input
                    id="nl-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    data-ocid="newsletter.name_input"
                    className="border font-body"
                    style={{
                      background: "oklch(0.20 0.06 22)",
                      borderColor: "oklch(0.78 0.14 75 / 0.2)",
                      color: "oklch(0.88 0.06 75)",
                    }}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="nl-email"
                    className="text-sm font-body mb-1.5 block"
                    style={{ color: "oklch(0.72 0.06 60)" }}
                  >
                    ईमेल / Email{" "}
                    <span style={{ color: "oklch(0.68 0.20 48)" }}>*</span>
                  </Label>
                  <Input
                    id="nl-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    data-ocid="newsletter.email_input"
                    className="border font-body"
                    style={{
                      background: "oklch(0.20 0.06 22)",
                      borderColor: "oklch(0.78 0.14 75 / 0.2)",
                      color: "oklch(0.88 0.06 75)",
                    }}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={subscribe.isPending || !email}
                  data-ocid="newsletter.subscribe_button"
                  className="w-full rounded-full font-heading font-semibold py-3 text-base transition-all disabled:opacity-50"
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
                    : "🔔 सदस्यता लें / Subscribe Now"}
                </Button>

                <p
                  className="text-center text-xs font-body pt-1"
                  style={{ color: "oklch(0.48 0.04 50)" }}
                >
                  कोई स्पैम नहीं। कभी भी अनसब्सक्राइब करें।
                  <br />
                  No spam ever. Unsubscribe anytime.
                </p>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* Benefits */}
      <section
        className="py-14 px-4"
        style={{ background: "oklch(0.13 0.06 22)" }}
        data-ocid="newsletter.benefits_section"
      >
        <div className="max-w-3xl mx-auto">
          <h2
            className="font-heading font-bold text-2xl text-center mb-2"
            style={{ color: "oklch(0.88 0.10 75)" }}
          >
            सदस्यों को क्या मिलता है
          </h2>
          <p
            className="text-center text-sm font-body mb-10"
            style={{ color: "oklch(0.60 0.05 50)" }}
          >
            What subscribers receive
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="flex gap-4 p-5 rounded-xl"
                  style={{
                    background: "oklch(0.17 0.07 30)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.12)",
                  }}
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "oklch(0.25 0.12 48 / 0.5)" }}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    />
                  </div>
                  <div>
                    <h3
                      className="font-heading font-semibold text-sm mb-1"
                      style={{ color: "oklch(0.84 0.10 70)" }}
                    >
                      {b.title}
                    </h3>
                    <p
                      className="font-body text-sm leading-relaxed"
                      style={{ color: "oklch(0.60 0.04 50)" }}
                    >
                      {b.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Unsubscribe */}
      <section
        className="py-14 px-4"
        style={{ background: "oklch(0.15 0.06 24)" }}
        data-ocid="newsletter.unsubscribe_section"
      >
        <div className="max-w-md mx-auto">
          <Separator
            className="mb-10"
            style={{ background: "oklch(0.78 0.14 75 / 0.12)" }}
          />
          <h2
            className="font-heading font-semibold text-lg text-center mb-1"
            style={{ color: "oklch(0.70 0.06 55)" }}
          >
            अनसब्सक्राइब करें / Unsubscribe
          </h2>
          <p
            className="text-center text-xs font-body mb-6"
            style={{ color: "oklch(0.50 0.04 50)" }}
          >
            Enter your email to unsubscribe from our newsletter
          </p>

          {unsubDone ? (
            <p
              className="text-center font-body text-sm"
              style={{ color: "oklch(0.68 0.14 145)" }}
              data-ocid="newsletter.unsubscribe_success_state"
            >
              ✓ आपकी सदस्यता रद्द कर दी गई है। / You have been unsubscribed.
            </p>
          ) : (
            <form
              onSubmit={handleUnsubscribe}
              className="flex gap-2"
              data-ocid="newsletter.unsubscribe_form"
            >
              <Input
                type="email"
                value={unsubEmail}
                onChange={(e) => setUnsubEmail(e.target.value)}
                required
                placeholder="your@email.com"
                data-ocid="newsletter.unsubscribe_email_input"
                className="flex-1 border font-body text-sm"
                style={{
                  background: "oklch(0.18 0.06 22)",
                  borderColor: "oklch(0.78 0.14 75 / 0.15)",
                  color: "oklch(0.80 0.06 65)",
                }}
              />
              <Button
                type="submit"
                disabled={unsubscribe.isPending || !unsubEmail}
                data-ocid="newsletter.unsubscribe_button"
                className="rounded-full font-heading text-sm px-4 disabled:opacity-50"
                style={{
                  background: "oklch(0.35 0.06 30)",
                  color: "oklch(0.70 0.05 55)",
                  border: "1px solid oklch(0.50 0.05 35)",
                }}
              >
                {unsubscribe.isPending ? "..." : "Unsubscribe"}
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
