import { useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  CheckCircle,
  Loader2,
  Shield,
  Smartphone,
  Star,
} from "lucide-react";
import { useCreateStripeSession } from "../hooks/useQueries";

const CHAPTERS = [
  { num: "१", title: "आकर्षण का नियम — परिचय" },
  { num: "२", title: "369 विधि — कैसे काम करती है" },
  { num: "३", title: "तीन बार लिखो — प्रातः की शक्ति" },
  { num: "४", title: "छः बार सुनो — दोपहर की ऊर्जा" },
  { num: "५", title: "नौ बार विचार करो — रात का ध्यान" },
  { num: "६", title: "अपनी इच्छाओं को शब्द दें" },
  { num: "७", title: "विश्वास और भाव की शक्ति" },
  { num: "८", title: "21 दिन का चमत्कार" },
];

const STEPS = [
  {
    num: "३",
    time: "प्रातः",
    label: "तीन बार लिखें",
    desc: "सुबह उठकर अपनी इच्छा को 3 बार लिखें। यह बीज बोने जैसा है।",
    color: "oklch(0.78 0.14 75)",
  },
  {
    num: "६",
    time: "दोपहर",
    label: "छः बार लिखें",
    desc: "दोपहर में 6 बार लिखकर उस ऊर्जा को और सशक्त बनाएं।",
    color: "oklch(0.68 0.2 48)",
  },
  {
    num: "९",
    time: "रात्रि",
    label: "नौ बार लिखें",
    desc: "सोने से पहले 9 बार लिखें और गहरे विश्वास के साथ सो जाएं।",
    color: "oklch(0.62 0.18 48)",
  },
];

const BENEFITS = [
  "इच्छाओं को वास्तविकता में बदलने की सिद्ध विधि",
  "निकोला टेस्ला का रहस्यमय 3-6-9 सिद्धांत",
  "वैदिक और Law of Attraction का अनोखा संगम",
  "दैनिक अभ्यास की step-by-step गाइड",
  "50+ पृष्ठों में सम्पूर्ण मार्गदर्शन",
  "Bonus: Manifestation Journal Template",
];

const TESTIMONIALS = [
  {
    name: "Priya S.",
    city: "Delhi",
    quote: "इस विधि से मेरा रिश्ता ठीक हुआ। 21 दिन में चमत्कार हुआ। सच में!",
    stars: 5,
  },
  {
    name: "Rahul M.",
    city: "Mumbai",
    quote: "नौकरी मिली 21 दिन में। रोज सुबह 3, दोपहर 6, रात 9 — बस यही किया।",
    stars: 5,
  },
  {
    name: "Sunita K.",
    city: "Jaipur",
    quote: "मेरा स्वास्थ्य सुधरा, बहुत धन्यवाद। पहले संशय था, अब पक्का विश्वास है।",
    stars: 5,
  },
];

export default function Book369Page() {
  const navigate = useNavigate();
  const stripeSession = useCreateStripeSession();

  async function handleBuy() {
    try {
      const url = await stripeSession.mutateAsync({
        productType: "369-book",
        amount: 96,
        metadata: "The 369 Law of Attraction PDF",
      });
      if (url.startsWith("http")) {
        window.location.href = url;
      } else {
        void navigate({
          to: "/payment-success",
          search: { type: "369-book", session: url } as Record<string, string>,
        });
      }
    } catch {
      // error handled by mutation state
    }
  }

  const isLoading = stripeSession.isPending;

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.97 0.015 85)" }}
    >
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section
        className="relative py-20 px-4 text-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.12 0.06 22), oklch(0.22 0.08 28), oklch(0.18 0.07 25))",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 30%, oklch(0.78 0.14 75 / 0.12), transparent)",
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{
              background: "oklch(0.78 0.14 75 / 0.15)",
              border: "1px solid oklch(0.78 0.14 75 / 0.35)",
            }}
          >
            <span
              className="text-xs font-body tracking-widest uppercase"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              Law of Attraction · Vedic Edition
            </span>
          </div>

          {/* Book cover mockup */}
          <div className="flex justify-center mb-8">
            <div
              className="relative w-44 h-60 rounded-xl flex flex-col items-center justify-center shadow-2xl animate-float"
              style={{
                background:
                  "linear-gradient(145deg, oklch(0.18 0.08 28), oklch(0.28 0.1 32))",
                border: "2px solid oklch(0.78 0.14 75 / 0.4)",
                boxShadow:
                  "0 20px 60px oklch(0.12 0.06 22 / 0.8), 0 0 40px oklch(0.78 0.14 75 / 0.15), inset 0 1px 0 oklch(0.78 0.14 75 / 0.2)",
              }}
            >
              <div
                className="absolute top-4 w-24 h-px"
                style={{ background: "oklch(0.78 0.14 75 / 0.4)" }}
              />
              <span
                className="animate-om-glow font-heading text-5xl"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                ॐ
              </span>
              <span
                className="font-heading font-black text-6xl mt-1 tracking-tight"
                style={{
                  background:
                    "linear-gradient(180deg, oklch(0.88 0.14 78), oklch(0.68 0.2 48))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                369
              </span>
              <span
                className="font-body text-xs tracking-widest uppercase mt-2"
                style={{ color: "oklch(0.78 0.14 75 / 0.8)" }}
              >
                आकर्षण का नियम
              </span>
              <div
                className="absolute bottom-4 w-24 h-px"
                style={{ background: "oklch(0.78 0.14 75 / 0.4)" }}
              />
            </div>
          </div>

          {/* Title */}
          <h1
            className="font-heading text-4xl md:text-5xl font-bold mb-2"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.88 0.14 78), oklch(0.78 0.14 75), oklch(0.68 0.2 48))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            369 आकर्षण का नियम
          </h1>
          <p
            className="font-body text-base mb-1 tracking-widest"
            style={{ color: "oklch(0.62 0.08 60)" }}
          >
            The 369 Law of Attraction
          </p>
          <p
            className="font-body text-lg mb-8"
            style={{ color: "oklch(0.72 0.08 65)" }}
          >
            इच्छाओं को वास्तविकता में बदलने की दिव्य विधि
          </p>

          {/* Price badge */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <div
              className="flex items-center gap-3 px-5 py-2 rounded-full"
              style={{
                background: "oklch(0.62 0.18 48 / 0.15)",
                border: "1px solid oklch(0.62 0.18 48 / 0.4)",
              }}
            >
              <span
                className="font-heading text-3xl font-black"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                मात्र ₹96
              </span>
              <span
                className="font-body text-base line-through"
                style={{ color: "oklch(0.52 0.05 50)" }}
              >
                ₹499
              </span>
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-heading font-bold"
                style={{
                  background: "oklch(0.55 0.20 25)",
                  color: "oklch(0.98 0.01 80)",
                }}
              >
                80% OFF
              </span>
            </div>
          </div>

          <button
            type="button"
            data-ocid="book369.hero_buy_button"
            onClick={() => void handleBuy()}
            disabled={isLoading}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-heading font-bold text-lg transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
            style={{
              background: isLoading
                ? "oklch(0.55 0.1 48)"
                : "linear-gradient(135deg, oklch(0.78 0.14 75), oklch(0.68 0.20 48))",
              color: "oklch(0.12 0.04 28)",
              boxShadow: isLoading
                ? "none"
                : "0 4px 24px oklch(0.78 0.14 75 / 0.4)",
            }}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                भुगतान प्रक्रिया में...
              </>
            ) : (
              <>
                <BookOpen className="h-5 w-5" />
                अभी खरीदें — PDF तुरंत मिलेगी
              </>
            )}
          </button>
          <p
            className="text-xs font-body mt-4"
            style={{ color: "oklch(0.52 0.04 50)" }}
          >
            🔒 Stripe Secure Payment · 📧 24 घंटे में WhatsApp / Email पर PDF
          </p>
        </div>
      </section>

      {/* ── WHAT IS 369 ──────────────────────────────────────────── */}
      <section
        className="py-16 px-4"
        style={{ background: "oklch(0.99 0.008 80)" }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title mb-3">369 विधि क्या है?</h2>
          <p
            className="section-subtitle max-w-2xl mx-auto mb-12 font-devanagari text-base"
            style={{ color: "oklch(0.40 0.06 35)" }}
          >
            निकोला टेस्ला ने कहा था — &quot;यदि आप 3, 6 और 9 की शक्ति को समझ लें, तो
            आप ब्रह्मांड की सभी रहस्यों की चाबी पा लेंगे।&quot; यही है 369 Manifestation
            Method।
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="rounded-2xl p-8 text-center transition-all duration-300 hover:scale-105"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.12 0.06 22), oklch(0.20 0.08 26))",
                  border: `1px solid ${step.color}40`,
                  boxShadow: `0 4px 24px ${step.color}20`,
                }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: `${step.color}18`,
                    border: `2px solid ${step.color}40`,
                  }}
                >
                  <span
                    className="font-heading font-black text-4xl"
                    style={{ color: step.color }}
                  >
                    {step.num}
                  </span>
                </div>
                <p
                  className="font-body text-xs uppercase tracking-widest mb-1"
                  style={{ color: `${step.color}99` }}
                >
                  {step.time}
                </p>
                <h3
                  className="font-heading font-bold text-lg mb-3"
                  style={{ color: step.color }}
                >
                  {step.label}
                </h3>
                <p
                  className="font-devanagari text-sm leading-relaxed"
                  style={{ color: "oklch(0.72 0.06 60)" }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            {BENEFITS.map((b) => (
              <div
                key={b.slice(0, 20)}
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{
                  background: "oklch(0.97 0.015 85)",
                  border: "1px solid oklch(0.85 0.04 70)",
                }}
              >
                <CheckCircle
                  className="h-5 w-5 flex-shrink-0 mt-0.5"
                  style={{ color: "oklch(0.62 0.18 48)" }}
                />
                <span
                  className="font-body text-sm"
                  style={{ color: "oklch(0.28 0.06 30)" }}
                >
                  {b}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOK CONTENTS ────────────────────────────────────────── */}
      <section
        className="py-16 px-4"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.97 0.015 85), oklch(0.95 0.02 82))",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title mb-2">पुस्तक की विषय-सूची</h2>
          <p className="section-subtitle mb-10">
            50+ पृष्ठों में सम्पूर्ण 369 विधि का रहस्य
          </p>

          <div className="space-y-3">
            {CHAPTERS.map((ch, i) => (
              <div
                key={ch.num}
                className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:scale-[1.01]"
                style={{
                  background: "oklch(0.99 0.008 80)",
                  border: "1px solid oklch(0.88 0.03 72)",
                  boxShadow: "0 2px 8px oklch(0.62 0.18 48 / 0.05)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-heading font-bold text-base"
                  style={{
                    background:
                      i % 2 === 0
                        ? "oklch(0.78 0.14 75 / 0.12)"
                        : "oklch(0.62 0.18 48 / 0.12)",
                    color:
                      i % 2 === 0
                        ? "oklch(0.58 0.14 65)"
                        : "oklch(0.52 0.18 40)",
                  }}
                >
                  {ch.num}
                </div>
                <span
                  className="font-devanagari text-sm md:text-base font-semibold"
                  style={{ color: "oklch(0.28 0.06 30)" }}
                >
                  {ch.title}
                </span>
              </div>
            ))}
          </div>

          {/* Bonus badge */}
          <div
            className="mt-6 rounded-xl p-4 flex items-center gap-3"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.78 0.14 75 / 0.1), oklch(0.62 0.18 48 / 0.08))",
              border: "1px solid oklch(0.78 0.14 75 / 0.3)",
            }}
          >
            <Star
              className="h-5 w-5 flex-shrink-0"
              style={{ color: "oklch(0.78 0.14 75)" }}
            />
            <span
              className="font-devanagari text-sm font-semibold"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              <strong>बोनस:</strong> Manifestation Journal Template — 30 पृष्ठ का
              दैनिक अभ्यास journal अलग से मिलेगा।
            </span>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <section
        className="py-16 px-4"
        style={{ background: "oklch(0.99 0.008 80)" }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title mb-2">पाठकों के अनुभव</h2>
          <p className="section-subtitle mb-10">
            2,300+ लोगों ने इसे अपनाया और जीवन बदला
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="testimonial-card">
                <div
                  className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center font-heading font-bold text-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.62 0.18 48), oklch(0.78 0.14 75))",
                    color: "oklch(0.12 0.04 28)",
                  }}
                >
                  {t.name[0]}
                </div>
                <div className="flex justify-center gap-0.5 mb-2">
                  {Array.from({ length: t.stars }).map((_, idx) => (
                    <Star
                      // biome-ignore lint/suspicious/noArrayIndexKey: static list
                      key={idx}
                      className="h-3.5 w-3.5 fill-current"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    />
                  ))}
                </div>
                <p className="testimonial-name">{t.name}</p>
                <p
                  className="text-xs font-body mt-0.5 mb-3"
                  style={{ color: "oklch(0.55 0.05 50)" }}
                >
                  {t.city}
                </p>
                <p className="testimonial-quote">&#8220;{t.quote}&#8221;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PURCHASE ─────────────────────────────────────────────── */}
      <section
        id="buy"
        className="py-16 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.13 0.06 22), oklch(0.20 0.08 26))",
        }}
      >
        <div className="max-w-lg mx-auto text-center">
          <div
            className="rounded-2xl p-8 md:p-10"
            style={{
              background: "oklch(0.17 0.07 25)",
              border: "1px solid oklch(0.78 0.14 75 / 0.25)",
              boxShadow: "0 0 60px oklch(0.78 0.14 75 / 0.08)",
            }}
          >
            <div className="flex justify-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className="h-4 w-4 fill-current"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                />
              ))}
            </div>
            <p
              className="font-body text-sm mb-6"
              style={{ color: "oklch(0.62 0.06 55)" }}
            >
              2,300+ संतुष्ट पाठक
            </p>

            {/* Price */}
            <div className="flex items-baseline justify-center gap-3 mb-4">
              <span
                className="font-heading text-6xl font-black"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.88 0.14 78), oklch(0.68 0.20 48))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ₹96
              </span>
              <div className="flex flex-col items-start">
                <span
                  className="font-body text-sm line-through"
                  style={{ color: "oklch(0.45 0.04 50)" }}
                >
                  ₹499
                </span>
                <span
                  className="font-heading text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{
                    background: "oklch(0.55 0.20 25)",
                    color: "oklch(0.96 0.01 80)",
                  }}
                >
                  80% OFF
                </span>
              </div>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {[
                { Icon: BookOpen, label: "50+ पृष्ठ" },
                { Icon: Smartphone, label: "Instant PDF" },
                { Icon: Shield, label: "Secure Payment" },
              ].map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body"
                  style={{
                    background: "oklch(0.78 0.14 75 / 0.1)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.2)",
                    color: "oklch(0.78 0.14 75)",
                  }}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </div>
              ))}
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body"
                style={{
                  background: "oklch(0.78 0.14 75 / 0.1)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.2)",
                  color: "oklch(0.78 0.14 75)",
                }}
              >
                <span>🇮🇳</span> Hindi Language
              </div>
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body"
                style={{
                  background: "oklch(0.78 0.14 75 / 0.1)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.2)",
                  color: "oklch(0.78 0.14 75)",
                }}
              >
                <span>🎁</span> Bonus Journal
              </div>
            </div>

            {/* CTA */}
            <button
              type="button"
              data-ocid="book369.checkout_button"
              onClick={() => void handleBuy()}
              disabled={isLoading}
              className="w-full py-4 rounded-full font-heading font-bold text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              style={{
                background: isLoading
                  ? "oklch(0.50 0.10 48)"
                  : "linear-gradient(135deg, oklch(0.78 0.14 75), oklch(0.68 0.20 48))",
                color: "oklch(0.12 0.04 28)",
                boxShadow: isLoading
                  ? "none"
                  : "0 4px 24px oklch(0.68 0.20 48 / 0.4)",
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>भुगतान प्रक्रिया में...</span>
                </>
              ) : (
                <>
                  <BookOpen className="h-5 w-5" />
                  <span>Stripe से सुरक्षित भुगतान करें</span>
                </>
              )}
            </button>

            {stripeSession.isError && (
              <p
                data-ocid="book369.error_state"
                className="text-xs font-body mt-3"
                style={{ color: "oklch(0.65 0.18 25)" }}
              >
                ⚠️ कुछ गड़बड़ी हुई। कृपया फिर से कोशिश करें।
              </p>
            )}

            <p
              className="text-xs font-body mt-4"
              style={{ color: "oklch(0.45 0.04 50)" }}
            >
              📧 PDF 24 घंटे में WhatsApp / Email पर भेजी जाएगी
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
