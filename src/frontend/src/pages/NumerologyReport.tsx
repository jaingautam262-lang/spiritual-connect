import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Lock, Unlock } from "lucide-react";
import { useState } from "react";
import type { BirthData } from "../hooks/useAstrology";
import { useNumerology } from "../hooks/useNumerology";

// ————————————————— 22 sections list —————————————————
const SECTIONS = [
  {
    id: 1,
    icon: "🔢",
    title: "Moolank Overview",
    titleHi: "मूलांक विहंगावलोकन",
    free: true,
  },
  {
    id: 2,
    icon: "🛤️",
    title: "Life Path Number",
    titleHi: "जीवन पथ अंक",
    free: true,
  },
  {
    id: 3,
    icon: "🎂",
    title: "Birth Day Number",
    titleHi: "जन्म दिन अंक",
    free: true,
  },
  {
    id: 4,
    icon: "❤️",
    title: "Soul Urge Number",
    titleHi: "आत्मा की इच्छा अंक",
    free: false,
  },
  {
    id: 5,
    icon: "🎤",
    title: "Personality Number",
    titleHi: "व्यक्तित्व अंक",
    free: false,
  },
  {
    id: 6,
    icon: "✨",
    title: "Expression Number",
    titleHi: "अभिव्यक्ति अंक",
    free: false,
  },
  {
    id: 7,
    icon: "⚠️",
    title: "Challenge Numbers",
    titleHi: "चुनौती अंक",
    free: false,
  },
  {
    id: 8,
    icon: "📅",
    title: "Personal Year Cycle",
    titleHi: "व्यक्तिगत वर्ष चक्र",
    free: false,
  },
  {
    id: 9,
    icon: "📍",
    title: "Pinnacle Cycles",
    titleHi: "शिखर चक्र",
    free: false,
  },
  {
    id: 10,
    icon: "🎨",
    title: "Lucky Colors",
    titleHi: "भाग्यशाली रंग",
    free: false,
  },
  {
    id: 11,
    icon: "💎",
    title: "Lucky Gemstones",
    titleHi: "भाग्यशाली रत्न",
    free: false,
  },
  {
    id: 12,
    icon: "💼",
    title: "Career Path",
    titleHi: "कैरियर पथ",
    free: false,
  },
  {
    id: 13,
    icon: "♥️",
    title: "Love & Relationships",
    titleHi: "प्रेम और रिश्ते",
    free: false,
  },
  {
    id: 14,
    icon: "💰",
    title: "Finance & Wealth",
    titleHi: "वित्त और समृद्धि",
    free: false,
  },
  {
    id: 15,
    icon: "🌿",
    title: "Health Numerology",
    titleHi: "स्वास्थ्य अंकज्योतिष",
    free: false,
  },
  {
    id: 16,
    icon: "🕎",
    title: "Spiritual Growth",
    titleHi: "आध्यात्मिक विकास",
    free: false,
  },
  {
    id: 17,
    icon: "🔡",
    title: "Name Vibration",
    titleHi: "नाम कंपन",
    free: false,
  },
  {
    id: 18,
    icon: "🏢",
    title: "Business Numerology",
    titleHi: "व्यापार अंकज्योतिष",
    free: false,
  },
  {
    id: 19,
    icon: "✏️",
    title: "Name Correction",
    titleHi: "नाम संशोधन",
    free: false,
  },
  {
    id: 20,
    icon: "🚫",
    title: "Karmic Debt",
    titleHi: "कर्मिक हीनता",
    free: false,
  },
  {
    id: 21,
    icon: "🔄",
    title: "Compatibility Check",
    titleHi: "संगतता जांच",
    free: false,
  },
  {
    id: 22,
    icon: "🌟",
    title: "Power & Master Numbers",
    titleHi: "शक्ति और मास्टर अंक",
    free: false,
  },
];

const MOOLANK_MEANINGS: Record<
  number,
  { desc: string; descHi: string; traits: string[]; traitsHi: string[] }
> = {
  1: {
    desc: "You are a natural leader with strong willpower and independence.",
    descHi: "आप एक स्वाभाविक नेता हैं जिनमें राज्य निर्माण और स्वतंत्रता की शक्ति है।",
    traits: ["Leadership", "Independence", "Ambition"],
    traitsHi: ["नेतृत्व", "स्वतंत्रता", "महत्वाकांक्षा"],
  },
  2: {
    desc: "You are intuitive, diplomatic, and naturally seek harmony in all relationships.",
    descHi:
      "आप अंतर्ज्ञानी, कूटनीतिक हैं और सभी रिश्तों में स्वाभाविक रूप से सामंजस्य खोजते हैं।",
    traits: ["Intuition", "Diplomacy", "Harmony"],
    traitsHi: ["अंतर्ज्ञान", "कूटनीति", "सामंजस्य"],
  },
  3: {
    desc: "You possess great creativity, optimism, and the gift of self-expression.",
    descHi: "आपमें अदभुत रचनात्मकता, आशावाद और आत्मअभिव्यक्ति का वरदान है।",
    traits: ["Creativity", "Optimism", "Expression"],
    traitsHi: ["रचनात्मकता", "आशावाद", "अभिव्यक्ति"],
  },
  4: {
    desc: "You are practical, disciplined, and excel at building solid foundations.",
    descHi: "आप व्यावहारिक, अनुशासित हैं और ठोस नींव बनाने में उत्कृष्ट हैं।",
    traits: ["Discipline", "Practicality", "Stability"],
    traitsHi: ["अनुशासन", "व्यावहारिकता", "स्थिरता"],
  },
  5: {
    desc: "You are adventurous, versatile, and crave freedom and new experiences.",
    descHi: "आप साहसी, बहुमुखी हैं और स्वतंत्रता और नई अनुभवों की लींस रखते हैं।",
    traits: ["Adventure", "Versatility", "Freedom"],
    traitsHi: ["साहस", "बहुमुखता", "स्वतंत्रता"],
  },
  6: {
    desc: "You are nurturing, responsible, and deeply devoted to family and loved ones.",
    descHi:
      "आप पोषणशील, जिम्मेदार हैं और परिवार व प्रियजनों के प्रति गहराई से समर्पित हैं।",
    traits: ["Nurturing", "Responsibility", "Harmony"],
    traitsHi: ["पोषण", "जिम्मेदारी", "सामंजस्य"],
  },
  7: {
    desc: "You are deeply introspective, spiritual, and seek the deeper truths of existence.",
    descHi:
      "आप गहरे आत्म-निरीक्षणीय, आध्यात्मिक हैं और अस्तित्व के गहरे सत्यों की खोज करते हैं।",
    traits: ["Spirituality", "Introspection", "Wisdom"],
    traitsHi: ["आध्यात्मिकता", "आत्म-निरीक्षण", "ज्ञान"],
  },
  8: {
    desc: "You are ambitious, authoritative, and naturally drawn to positions of power and wealth.",
    descHi:
      "आप महत्वाकांक्षी, सत्तावान हैं और स्वाभाविक रूप से शक्ति और समृद्धि की ओर आकर्षित हैं।",
    traits: ["Ambition", "Authority", "Material Success"],
    traitsHi: ["महत्वाकांक्षा", "सत्ता", "भौतिक सफलता"],
  },
  9: {
    desc: "You are compassionate, humanitarian, and inspired to serve the greater good.",
    descHi: "आप दयालु, मानवतावादी हैं और व्यापक भले की सेवा करने से प्रेरित हैं।",
    traits: ["Compassion", "Humanitarian", "Wisdom"],
    traitsHi: ["करुणा", "मानवतावाद", "ज्ञान"],
  },
};

// @ts-ignore
function _sumDigits(n: number): number {
  let s = n;
  while (s > 9)
    s = String(s)
      .split("")
      .reduce((a, d) => a + Number(d), 0);
  return s;
}

export default function NumerologyReport() {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({
    name: "",
    dob: "",
    timeOfBirth: "",
    placeOfBirth: "",
  });
  const [unlocked, setUnlocked] = useState(false);

  const birthData: BirthData | null = form.dob
    ? {
        name: form.name,
        dob: form.dob,
        tob: form.timeOfBirth,
        pob: form.placeOfBirth,
        latitude: 0,
        longitude: 0,
        gender: "O" as const,
      }
    : null;
  const num = useNumerology(birthData);

  const moolankMeaning = MOOLANK_MEANINGS[num.mulank] ?? MOOLANK_MEANINGS[1];
  const t = (en: string, hi: string) => (lang === "hi" ? hi : en);

  function handleStart() {
    if (!form.dob) return;
    setStep(2);
  }
  function handleUnlock() {
    // Simulated payment — in production this calls initStripePayment
    setUnlocked(true);
    setStep(3);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="spiritual-gradient py-12 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center gap-2 mb-4">
            <button
              type="button"
              data-ocid="report.lang.en"
              onClick={() => setLang("en")}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${lang === "en" ? "bg-amber-500 text-white border-amber-500" : "border-amber-400/50 text-amber-300"}`}
            >
              EN
            </button>
            <button
              type="button"
              data-ocid="report.lang.hi"
              onClick={() => setLang("hi")}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${lang === "hi" ? "bg-amber-500 text-white border-amber-500" : "border-amber-400/50 text-amber-300"}`}
            >
              हि
            </button>
          </div>
          <h1
            className="font-heading text-4xl md:text-5xl font-bold"
            style={{ color: "oklch(0.99 0.005 80)" }}
          >
            {t("Your Numerology Report", "आपकी अंकज्योतिष रिपोर्ट")}
          </h1>
          <p className="mt-2 text-sm" style={{ color: "oklch(0.85 0.02 80)" }}>
            {t(
              "22 personalised sections based on your birth data",
              "आपके जन्म डेटा के आधार पर 22 व्यक्तिगत खंड",
            )}
          </p>
          {/* Stepper */}
          <div className="flex justify-center items-center gap-3 mt-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? "bg-amber-500 text-white" : "bg-amber-900/30 text-amber-400"}`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-12 h-0.5 ${step > s ? "bg-amber-500" : "bg-amber-900/30"}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Step 1: Input Form */}
        {step === 1 && (
          <div className="temple-card p-8 space-y-5">
            <h2
              className="font-heading text-xl font-bold"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              {t("Step 1: Enter Your Details", "चरण 1: अपनी जानकारी दर्ज करें")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="r-name">{t("Full Name", "पूरा नाम")}</Label>
                <Input
                  id="r-name"
                  data-ocid="report.name_input"
                  placeholder="Rajesh Kumar"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="r-dob">
                  {t("Date of Birth", "जन्म तिथि")} *
                </Label>
                <Input
                  id="r-dob"
                  type="date"
                  data-ocid="report.dob_input"
                  value={form.dob}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, dob: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="r-time">{t("Time of Birth", "जन्म समय")}</Label>
                <Input
                  id="r-time"
                  type="time"
                  data-ocid="report.time_input"
                  value={form.timeOfBirth}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, timeOfBirth: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="r-place">
                  {t("Place of Birth", "जन्म स्थान")}
                </Label>
                <Input
                  id="r-place"
                  data-ocid="report.place_input"
                  placeholder="Mumbai, India"
                  value={form.placeOfBirth}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, placeOfBirth: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
            </div>
            <Button
              data-ocid="report.generate_button"
              className="btn-spiritual w-full"
              onClick={handleStart}
              disabled={!form.dob}
            >
              {t("Generate My Preview Report →", "मेरी प्रीव्यू रिपोर्ट जेनेरेट करें →")}
            </Button>
          </div>
        )}

        {/* Steps 2 & 3 */}
        {step >= 2 && (
          <div className="space-y-6">
            {/* Free preview sections */}
            {[
              {
                sec: SECTIONS[0],
                content: (
                  <div>
                    <p className="font-bold text-2xl text-amber-600 mb-2">
                      {t(`Moolank ${num.mulank}`, `मूलांक ${num.mulank}`)}
                    </p>
                    <p className="text-sm">
                      {lang === "hi"
                        ? moolankMeaning.descHi
                        : moolankMeaning.desc}
                    </p>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {(lang === "hi"
                        ? moolankMeaning.traitsHi
                        : moolankMeaning.traits
                      ).map((tr) => (
                        <Badge
                          key={tr}
                          className="bg-amber-100 text-amber-700 border-amber-300"
                        >
                          {tr}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ),
              },
              {
                sec: SECTIONS[1],
                content: (
                  <div>
                    <p className="font-bold text-2xl text-violet-600 mb-2">
                      {t(
                        `Life Path ${num.bhagyank}`,
                        `जीवन पथ ${num.bhagyank}`,
                      )}
                    </p>
                    <p className="text-sm">
                      {t(
                        "Your Bhagyank (Life Path number) reveals your major life lessons and the path your soul chose before birth. It represents your primary life mission.",
                        "आपका भाग्यांक (जीवन पथ अंक) आपके मुख्य जीवन पाठों और आत्मा द्वारा जन्म से पहले चुने गए मार्ग को प्रकट करता है।",
                      )}
                    </p>
                  </div>
                ),
              },
              {
                sec: SECTIONS[2],
                content: (
                  <div>
                    <p className="font-bold text-2xl text-emerald-600 mb-2">
                      {t(
                        `Birth Day: ${form.dob ? Number(form.dob.split("-")[2]) : "--"}`,
                        `जन्म दिन: ${form.dob ? Number(form.dob.split("-")[2]) : "--"}`,
                      )}
                    </p>
                    <p className="text-sm">
                      {t(
                        "Your birth day number indicates a special talent or gift you carry into this lifetime. It fine-tunes the qualities of your Life Path number.",
                        "आपका जन्म दिन अंक इस जीवन में आपके साथ लाई गई विशेष प्रतिभा को दर्शाता है।",
                      )}
                    </p>
                  </div>
                ),
              },
            ].map(({ sec, content }) => (
              <div
                key={sec.id}
                data-ocid={`report.section.${sec.id}`}
                className="temple-card p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{sec.icon}</span>
                  <div>
                    <Badge className="bg-green-100 text-green-700 border-green-300 text-xs mb-1">
                      {t("Free Preview", "मुफ्त प्रीव्यू")}
                    </Badge>
                    <h3
                      className="font-heading font-bold"
                      style={{ color: "oklch(0.35 0.12 25)" }}
                    >
                      {lang === "hi" ? sec.titleHi : sec.title}
                    </h3>
                  </div>
                </div>
                {content}
              </div>
            ))}

            {/* Locked sections */}
            {!unlocked && (
              <div className="space-y-3">
                {SECTIONS.slice(3).map((sec, i) => (
                  <div
                    key={sec.id}
                    data-ocid={`report.locked.${i + 1}`}
                    className="temple-card p-4 flex items-center gap-3 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 backdrop-blur-[2px] bg-card/60" />
                    <span className="text-xl relative z-10">{sec.icon}</span>
                    <p
                      className="font-semibold text-sm relative z-10"
                      style={{ color: "oklch(0.35 0.12 25)" }}
                    >
                      {lang === "hi" ? sec.titleHi : sec.title}
                    </p>
                    <Lock className="w-4 h-4 ml-auto text-amber-500 relative z-10 shrink-0" />
                  </div>
                ))}

                {/* Unlock CTA */}
                <div className="spiritual-gradient rounded-2xl p-8 text-center">
                  <Unlock
                    className="w-10 h-10 mx-auto mb-3"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  />
                  <h2
                    className="font-heading text-2xl font-bold mb-2"
                    style={{ color: "oklch(0.99 0.005 80)" }}
                  >
                    {t("Unlock All 22 Sections", "सभी 22 खंड अनलॉक करें")}
                  </h2>
                  <p className="mb-2" style={{ color: "oklch(0.85 0.02 80)" }}>
                    {t(
                      "Get your complete personalized numerology report",
                      "अपनी संपूर्ण व्यक्तिगत अंकज्योतिष रिपोर्ट पाएं",
                    )}
                  </p>
                  <p
                    className="text-xs mb-5"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    {t(
                      "Your report will be sent to your email within 24 hours",
                      "आपकी रिपोर्ट 24 घंटे के अंदर आपके ईमेल पर भेजी जाएगी",
                    )}
                  </p>
                  <Button
                    data-ocid="report.unlock_button"
                    className="bg-amber-500 hover:bg-amber-400 text-white font-bold text-lg px-8 py-3 rounded-full shadow-lg"
                    onClick={handleUnlock}
                  >
                    {t("Unlock Full Report ₹697", "पूरी रिपोर्ट अनलॉक करें ₹697")}
                  </Button>
                </div>
              </div>
            )}

            {/* Unlocked */}
            {unlocked && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                  <Unlock className="w-5 h-5 text-green-600" />
                  <p className="text-green-700 text-sm font-semibold">
                    {t(
                      "Full report unlocked! Your detailed report will be sent to your email within 24 hours.",
                      "पूरी रिपोर्ट अनलॉक हो गई! आपकी विस्तृत रिपोर्ट 24 घंटे के अंदर ईमेल पर भेजी जाएगी।",
                    )}
                  </p>
                </div>
                {SECTIONS.slice(3).map((sec, i) => (
                  <div
                    key={sec.id}
                    data-ocid={`report.unlocked.${i + 1}`}
                    className="temple-card p-5"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xl">{sec.icon}</span>
                      <h3
                        className="font-heading font-bold"
                        style={{ color: "oklch(0.35 0.12 25)" }}
                      >
                        {lang === "hi" ? sec.titleHi : sec.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t(
                        "This section contains personalized insights based on your birth data, numerological calculations, and Vedic correspondences.",
                        "इस खंड में आपके जन्म डेटा, अंकज्योतिषीय गणनाओं और वैदिक संगतताओं के आधार पर व्यक्तिगत अंतर्दृष्टि शामिल है।",
                      )}
                    </p>
                  </div>
                ))}
                <Button
                  data-ocid="report.download_button"
                  variant="outline"
                  className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t("Download PDF Report", "पीडीएफ रिपोर्ट डाउनलोड करें")}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
