import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  Calculator,
  Gem,
  Hash,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";
import {
  ALL_NUMEROLOGY_BRACELETS,
  MOOLANK_BRACELETS,
} from "../data/numerologyBraceletData";

// ————————————————— Helpers —————————————————
function sumDigits(n: number): number {
  let s = n;
  while (s > 9)
    s = String(s)
      .split("")
      .reduce((a, d) => a + Number(d), 0);
  return s;
}
function calcMoolank(dob: string): number {
  const day = Number(dob.split("-")[2]);
  return sumDigits(day);
}
function calcZodiac(dob: string): string {
  const [, m, d] = dob.split("-").map(Number);
  if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return "♈ Aries";
  if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return "♉ Taurus";
  if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return "♊ Gemini";
  if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return "♋ Cancer";
  if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return "♌ Leo";
  if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return "♍ Virgo";
  if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return "♎ Libra";
  if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return "♏ Scorpio";
  if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) return "♐ Sagittarius";
  if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return "♑ Capricorn";
  if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return "♒ Aquarius";
  return "♓ Pisces";
}
function calcPersonalYear(dob: string): number {
  const [, m, d] = dob.split("-").map(Number);
  const yr = new Date().getFullYear();
  return sumDigits(
    [...String(d), ...String(m), ...String(yr)].reduce(
      (a, c) => a + Number(c),
      0,
    ),
  );
}

const REPORT_SERVICES = [
  {
    icon: "📊",
    title: "Numerology Report",
    titleHi: "अंकज्योतिष रिपोर्ट",
    desc: "22 detailed sections analyzing your life path, name vibration, karmic debt & more",
    descHi: "22 विस्तृत खंड — जीवन पथ, नाम कंपन, कर्मिक हीनता आदिका विश्लेषण",
    price: 697,
    link: "/numerology-report",
  },
  {
    icon: "❤️",
    title: "Relationship Matchmaking",
    titleHi: "रिश्ता मिलान",
    desc: "Numerological compatibility analysis for couples and prospective partners",
    descHi: "जोड़ों के लिए अंकज्योतिष संगतता विश्लेषण",
    price: 997,
    link: "/reports",
  },
  {
    icon: "✏️",
    title: "Name Correction",
    titleHi: "नाम संशोधन",
    desc: "Scientific name correction for enhanced vibration and life alignment",
    descHi: "बेहतर कंपन और जीवन अनुकूलन के लिए वैज्ञानिक नाम संशोधन",
    price: 1297,
    link: "/reports",
  },
  {
    icon: "👨‍💼",
    title: "Prashant Rohilla Consultation",
    titleHi: "प्रशांत रोहिल्ला परामर्श",
    desc: "Personal 1-on-1 session with expert numerologist Prashant Rohilla",
    descHi: "विशेषज्ञ अंकज्योतिषी प्रशांत रोहिल्ला के साथ व्यक्तिगत 1-on-1 सेशन",
    price: 1497,
    link: "/reports",
  },
  {
    icon: "💎",
    title: "Divya Patthar Analysis",
    titleHi: "दिव्य पत्थर विश्लेषण",
    desc: "Gemstone recommendation based on your numerological birth chart",
    descHi: "आपकी अंकज्योतिष जन्म कुंडली के आधार पर रत्न अनुशंसा",
    price: 2497,
    link: "/reports",
  },
  {
    icon: "👶",
    title: "Baby Namkaran",
    titleHi: "शिशु नामकरण",
    desc: "Auspicious name selection for newborns based on numerology and Vedic principles",
    descHi: "अंकज्योतिष और वैदिक सिद्धांतों के आधार पर नवजातक का शुभ नामकरण",
    price: 997,
    link: "/reports",
  },
];

const METHODS = [
  {
    icon: "🌟",
    title: "Pythagorean",
    titleHi: "पायथागोरियन",
    desc: "Western system A=1 to Z=26. Most popular worldwide method for name analysis.",
    descHi:
      "पाश्चात्य प्रणाली A=1 से Z=26. नाम विश्लेषण की सर्वाधिक लोकप्रिय विश्व विधि।",
  },
  {
    icon: "🔯",
    title: "Chaldean",
    titleHi: "चाल्डियन",
    desc: "Ancient Babylonian system, considered most accurate for life events and karma.",
    descHi:
      "प्राचीन बाबिलोन प्रणाली, जीवन घटनाओं और कर्म के लिए सबसे सटीक मानी जाती है।",
  },
  {
    icon: "🧪",
    title: "Sepharial",
    titleHi: "सेफ़ैरियल",
    desc: "Blend of Pythagorean & Chaldean with Vedic planetary correspondences.",
    descHi: "वैदिक ग्रह संगतता के साथ पायथागोरियन और चाल्डियन का संष्टं।",
  },
  {
    icon: "🏠",
    title: "Modern Indian",
    titleHi: "आधुनिक भारतीय",
    desc: "Combines Vedic astrology numbers with Chaldean system for Indian contexts.",
    descHi:
      "भारतीय संदर्भों के लिए वैदिक ज्योतिष अंकों को चाल्डियन प्रणाली के साथ जोड़ता है।",
  },
];

export default function NumerologyHub() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<{
    moolank: number;
    zodiac: string;
    personalYear: number;
  } | null>(null);

  function handleCalculate() {
    if (!dob) return;
    setResult({
      moolank: calcMoolank(dob),
      zodiac: calcZodiac(dob),
      personalYear: calcPersonalYear(dob),
    });
  }

  const matchedBracelets = result
    ? MOOLANK_BRACELETS.filter((b) =>
        b.moolank?.includes(result.moolank),
      ).slice(0, 3)
    : [];

  const t = (en: string, hi: string) => (lang === "hi" ? hi : en);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="spiritual-gradient py-14 px-4 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L55 50 L5 50 Z' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3C/svg%3E\")",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <div className="flex justify-center gap-2 mb-4">
            <button
              type="button"
              data-ocid="hub.lang.en"
              onClick={() => setLang("en")}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${lang === "en" ? "bg-amber-500 text-white border-amber-500" : "border-amber-400/50 text-amber-300 hover:border-amber-400"}`}
            >
              EN
            </button>
            <button
              type="button"
              data-ocid="hub.lang.hi"
              onClick={() => setLang("hi")}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${lang === "hi" ? "bg-amber-500 text-white border-amber-500" : "border-amber-400/50 text-amber-300 hover:border-amber-400"}`}
            >
              हि
            </button>
          </div>
          <p
            className="text-xs uppercase tracking-widest mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {t("Numerology Hub", "अंकज्योतिष केंद्र")}
          </p>
          <h1
            className="font-heading text-4xl md:text-6xl font-bold mb-3"
            style={{ color: "oklch(0.99 0.005 80)" }}
          >
            {t("Discover Your Numbers", "अपने अंक जानें")}
          </h1>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: "oklch(0.85 0.02 80)" }}
          >
            {t(
              "Unlock the ancient science of numbers to reveal your life path, soul purpose, and cosmic destiny.",
              "अपने जीवन पथ, आत्मा के उद्देश्य और ज्योतिषीय नियति जानने के लिए अंकों का प्राचीन विज्ञान खोजें।",
            )}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        {/* Report Services */}
        <section>
          <h2
            className="font-heading text-2xl font-bold text-center mb-2"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            {t("Numerology Report Services", "अंकज्योतिष रिपोर्ट सेवाएं")}
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            {t(
              "Expert-crafted reports delivered within 24 hours",
              "विशेषज्ञ रिपोर्ट 24 घंटे के अंदर डिलिवर की जाती हैं",
            )}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REPORT_SERVICES.map((svc, i) => (
              <div
                key={svc.title}
                data-ocid={`hub.service.${i + 1}`}
                className="temple-card p-5 flex flex-col gap-3"
              >
                <div className="text-3xl">{svc.icon}</div>
                <div>
                  <h3
                    className="font-heading font-bold text-base"
                    style={{ color: "oklch(0.35 0.12 25)" }}
                  >
                    {lang === "hi" ? svc.titleHi : svc.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {lang === "hi" ? svc.descHi : svc.desc}
                  </p>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-bold text-amber-600">
                    ₹{svc.price.toLocaleString()}
                  </span>
                  <Button
                    size="sm"
                    data-ocid={`hub.order.${i + 1}`}
                    className="btn-spiritual"
                    onClick={() =>
                      void navigate({
                        to: svc.link as Parameters<typeof navigate>[0]["to"],
                      })
                    }
                  >
                    {t("Order Now", "अभी ऑर्डर करें")}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Free Calculator */}
        <section className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
          <div className="text-center mb-8">
            <Badge className="bg-amber-100 text-amber-700 border-amber-300 mb-3">
              {t("Free Tool", "मुफ़्त उपकरण")}
            </Badge>
            <h2
              className="font-heading text-2xl font-bold"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              {t("3-in-1 Numerology Calculator", "3-इन-1 अंकज्योतिष कैलकुलेटर")}
            </h2>
            <p className="text-muted-foreground mt-1">
              {t(
                "Moolank + Zodiac + Personal Year in seconds",
                "मूलांक + राशि + व्यक्तिगत वर्ष सेकंडों में",
              )}
            </p>
          </div>
          <div className="max-w-lg mx-auto space-y-4">
            <div>
              <Label htmlFor="hub-name">
                {t("Full Name (optional)", "पूरा नाम (वैकल्पिक)")}
              </Label>
              <Input
                id="hub-name"
                data-ocid="hub.name_input"
                placeholder={t("Enter your full name", "अपना पूरा नाम दर्ज करें")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="hub-dob">{t("Date of Birth", "जन्म तिथि")}</Label>
              <Input
                id="hub-dob"
                type="date"
                data-ocid="hub.dob_input"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button
              data-ocid="hub.calculate_button"
              className="btn-spiritual w-full"
              onClick={handleCalculate}
              disabled={!dob}
            >
              <Calculator className="w-4 h-4 mr-2" />
              {t("Calculate Now", "अभी गणना करें")}
            </Button>
          </div>

          {result && (
            <div className="mt-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    label: t("Moolank", "मूलांक"),
                    value: String(result.moolank),
                    sub: t("Your birth day number", "आपकी जन्म दिन संख्या"),
                    color: "from-amber-400 to-orange-500",
                  },
                  {
                    label: t("Zodiac Sign", "राशि चिह्न"),
                    value: result.zodiac,
                    sub: t(
                      "Based on birth month & day",
                      "जन्म माह और दिन के आधार पर",
                    ),
                    color: "from-violet-400 to-purple-500",
                  },
                  {
                    label: t("Personal Year", "व्यक्तिगत वर्ष"),
                    value: String(result.personalYear),
                    sub: t(
                      `Your ${new Date().getFullYear()} energy cycle`,
                      `आपका ${new Date().getFullYear()} का उर्जा चक्र`,
                    ),
                    color: "from-emerald-400 to-teal-500",
                  },
                ].map((card) => (
                  <div
                    key={card.label}
                    className={`rounded-xl p-5 text-center text-white bg-gradient-to-br ${card.color}`}
                  >
                    <p className="text-xs uppercase tracking-wider opacity-80 mb-1">
                      {card.label}
                    </p>
                    <p className="font-heading font-bold text-3xl">
                      {card.value}
                    </p>
                    <p className="text-xs mt-1 opacity-80">{card.sub}</p>
                  </div>
                ))}
              </div>

              {/* Matched Bracelets */}
              {matchedBracelets.length > 0 && (
                <div>
                  <h3
                    className="font-heading font-bold text-lg mb-4"
                    style={{ color: "oklch(0.35 0.12 25)" }}
                  >
                    {t(
                      `💜 Your Personalised Bracelets for Moolank ${result.moolank}`,
                      `💜 मूलांक ${result.moolank} के लिए आपके व्यक्तिगत ब्रेसलेट`,
                    )}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {matchedBracelets.map((b, i) => (
                      <div
                        key={b.id}
                        data-ocid={`hub.bracelet.${i + 1}`}
                        className="bg-card rounded-xl p-4 border border-amber-200"
                      >
                        <div className="text-2xl mb-2">{b.emoji}</div>
                        <p
                          className="font-semibold text-sm"
                          style={{ color: "oklch(0.35 0.12 25)" }}
                        >
                          {lang === "hi" ? b.nameHi : b.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {b.stone}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="font-bold text-amber-600 text-sm">
                            ₹{b.price}
                          </span>
                          {b.emiEligible && (
                            <span className="text-xs text-amber-500">{`or ₹${Math.round(b.price / 12)}/mo`}</span>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          data-ocid={`hub.view_bracelet.${i + 1}`}
                          className="w-full mt-3 border-amber-300 text-amber-700"
                          onClick={() =>
                            void navigate({
                              to: "/numerology-bracelets" as Parameters<
                                typeof navigate
                              >[0]["to"],
                            })
                          }
                        >
                          {t("View Bracelet", "ब्रेसलेट देखें")}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Methods */}
        <section>
          <h2
            className="font-heading text-2xl font-bold text-center mb-2"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            {t("Explore Numerology Topics", "अंकज्योतिष विषय खोजें")}
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            {t(
              "Four major systems of numerological analysis",
              "अंकज्योतिषीय विश्लेषण की चार प्रमुख प्रणालियां",
            )}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {METHODS.map((m, i) => (
              <div
                key={m.title}
                data-ocid={`hub.method.${i + 1}`}
                className="temple-card p-5 text-center"
              >
                <div className="text-4xl mb-3">{m.icon}</div>
                <h3
                  className="font-heading font-bold text-sm"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  {lang === "hi" ? m.titleHi : m.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  {lang === "hi" ? m.descHi : m.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="spiritual-gradient rounded-2xl p-10 text-center relative overflow-hidden">
          <div className="relative z-10">
            <Sparkles
              className="w-12 h-12 mx-auto mb-4"
              style={{ color: "oklch(0.78 0.14 75)" }}
            />
            <h2
              className="font-heading text-3xl font-bold mb-3"
              style={{ color: "oklch(0.99 0.005 80)" }}
            >
              {t(
                "Get Your Complete Numerology Report",
                "अपनी संपूर्ण अंकज्योतिष रिपोर्ट पाएं",
              )}
            </h2>
            <p className="mb-6" style={{ color: "oklch(0.85 0.02 80)" }}>
              {t(
                "22 detailed sections • Personalized to your birth data • Expert crafted",
                "22 विस्तृत खंड • आपके जन्म डेटा के अनुसार व्यक्तिगत • विशेषज्ञ निर्मित",
              )}
            </p>
            <Button
              data-ocid="hub.report_cta"
              className="bg-amber-500 hover:bg-amber-400 text-white font-bold text-lg px-8 py-3 rounded-full shadow-lg"
              onClick={() =>
                void navigate({
                  to: "/numerology-report" as Parameters<
                    typeof navigate
                  >[0]["to"],
                })
              }
            >
              {t("Unlock Full Report \u20b9697", "पूरी रिपोर्ट अनलॉक करें ₹697")}
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
