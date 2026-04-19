import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { LIFE_PREDICTIONS } from "../data/lifePredictionsData";
import { NUMBER_INTERPRETATIONS } from "../data/numerologyInterpretations";
import type { BirthData } from "../hooks/useAstrology";
import { useAstrology } from "../hooks/useAstrology";
import { useNumerology } from "../hooks/useNumerology";
import { SpeakerButton } from "../hooks/useSpeaker";
import { getNumberMeaning, getPlaneRemedies } from "../utils/loShuGrid";
import { calculateNameCompatibilityScore } from "../utils/nameSelection";

function useBirthData() {
  const [birthData, setBirthData] = useState<BirthData | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("spiritualConnect_birthData");
      if (raw) setBirthData(JSON.parse(raw));
    } catch {}
  }, []);
  return birthData;
}

function OrnamentalCard({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-xl border-2 border-[#D4AF37] bg-card shadow-md p-4 ${className}`}
      style={{
        boxShadow:
          "inset 0 0 0 2px rgba(212,175,55,0.18), 0 2px 16px rgba(212,175,55,0.08)",
      }}
    >
      {children}
    </div>
  );
}

// ─── Personal Year Calculation ────────────────────────────────────────────────
function reduceToSingle(n: number): number {
  let x = n;
  while (x > 9)
    x = String(x)
      .split("")
      .reduce((a, d) => a + Number(d), 0);
  return x;
}

function personalYearForCalendarYear(dob: string, calYear: number): number {
  const parts = dob.split("-");
  if (parts.length < 3) return 0;
  const month = Number(parts[1]);
  const day = Number(parts[2]);
  const sum =
    reduceToSingle(day) + reduceToSingle(month) + reduceToSingle(calYear);
  return reduceToSingle(sum);
}

function getYearsMatchingPY(
  dob: string,
  target: number,
  fromYear: number,
  count = 4,
): number[] {
  const out: number[] = [];
  let y = fromYear;
  while (out.length < count) {
    if (personalYearForCalendarYear(dob, y) === target) out.push(y);
    y++;
  }
  return out;
}

function getPersonalMonths(
  dob: string,
  calYear: number,
): Array<{ month: string; monthHi: string; py: number }> {
  const MONTHS_EN = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const MONTHS_HI = [
    "जनवरी",
    "फ़रवरी",
    "मार्च",
    "अप्रैल",
    "मई",
    "जून",
    "जुलाई",
    "अगस्त",
    "सितम्बर",
    "अक्टूबर",
    "नवम्बर",
    "दिसम्बर",
  ];
  const py = personalYearForCalendarYear(dob, calYear);
  return MONTHS_EN.map((m, i) => ({
    month: m,
    monthHi: MONTHS_HI[i],
    py: reduceToSingle(py + (i + 1)),
  }));
}

// ─── Mulank-based data maps ───────────────────────────────────────────────────
const LUCKY_NUMBERS: Record<number, number[]> = {
  1: [1, 3, 5, 9],
  2: [2, 4, 7, 8],
  3: [1, 3, 6, 9],
  4: [2, 4, 7, 8],
  5: [1, 5, 6, 9],
  6: [3, 6, 9],
  7: [2, 4, 7],
  8: [2, 4, 8],
  9: [1, 3, 5, 6, 9],
};
const LUCKY_COLORS: Record<number, string[]> = {
  1: ["Saffron", "Orange", "Gold"],
  2: ["Silver", "White", "Cream"],
  3: ["Yellow", "Gold", "Orange"],
  4: ["Blue", "Purple", "Brown"],
  5: ["Green", "Gray", "Ivory"],
  6: ["Pink", "White", "Blue"],
  7: ["Violet", "Purple", "Gray"],
  8: ["Black", "Navy", "Dark Blue"],
  9: ["Red", "Crimson", "Saffron"],
};
const COMPATIBILITY_MAP: Record<number, number[]> = {
  1: [1, 3, 5, 9],
  2: [2, 4, 8],
  3: [1, 3, 6, 9],
  4: [2, 4, 7, 8],
  5: [1, 5, 9],
  6: [3, 6, 9],
  7: [2, 4, 7],
  8: [2, 4, 8],
  9: [1, 3, 9],
};
const CAREER_MAP: Record<number, string> = {
  1: "business",
  2: "job",
  3: "business",
  4: "job",
  5: "business",
  6: "job",
  7: "both",
  8: "both",
  9: "business",
};

// ─── LO SHU number meanings ───────────────────────────────────────────────────
const MISSING_AREAS: Record<number, string> = {
  1: "lack of confidence and leadership challenges",
  2: "emotional instability and relationship difficulties",
  3: "difficulty in self-expression and creativity blocks",
  4: "lack of stability and grounding in practical matters",
  5: "scattered direction and difficulty making decisions",
  6: "challenges in love and domestic harmony",
  7: "spiritual disconnection and analytical difficulties",
  8: "financial struggles and ambition blocks",
  9: "lack of compassion and completion challenges",
};

// ─── 19 AI Card Data ──────────────────────────────────────────────────────────
interface InsightCard {
  id: number;
  icon: string;
  titleEn: string;
  titleHi: string;
  getAnswer: (params: {
    mulank: number;
    bhagyank: number;
    dob: string;
    name: string;
    loShuNumbers: number[];
    missingNumbers: number[];
    loShuFrequency: Record<number, number>;
    lagnaSign: string;
    moonSign: string;
  }) => { en: string; hi: string };
}

const CARDS: InsightCard[] = [
  {
    id: 1,
    icon: "📛",
    titleEn: "Is My Name Correct?",
    titleHi: "क्या मेरा नाम सही है?",
    getAnswer: ({ name, mulank, bhagyank }) => {
      const score = name
        ? calculateNameCompatibilityScore(name, mulank, bhagyank, [])
        : 0;
      const nameNum = score > 70 ? mulank : mulank + 1 > 9 ? 1 : mulank + 1;
      const aligned = score >= 65;
      return {
        en: aligned
          ? `Your name "${name}" has a Chaldean name number of ${nameNum}, which strongly aligns with your Mulank (${mulank}). Your name vibration is favorable and supports your life path. No correction is needed.`
          : `Your name "${name}" (number ${nameNum}) does not perfectly align with your Mulank (${mulank}) or Bhagyank (${bhagyank}). Consider adding or slightly modifying your name to match number ${mulank} or ${bhagyank}. A numerologist can suggest the best spelling correction.`,
        hi: aligned
          ? `आपका नाम "${name}" का चाल्डियन नाम संख्या ${nameNum} है, जो आपके मूलांक (${mulank}) से मेल खाता है। आपका नाम ऊर्जा अनुकूल है।`
          : `आपका नाम "${name}" (संख्या ${nameNum}) आपके मूलांक (${mulank}) या भाग्यांक (${bhagyank}) से पूरी तरह मेल नहीं खाता। संख्या ${mulank} से मिलान के लिए नाम में हल्का बदलाव सहायक होगा।`,
      };
    },
  },
  {
    id: 2,
    icon: "💼",
    titleEn: "Job or Business?",
    titleHi: "नौकरी या व्यापार?",
    getAnswer: ({ mulank }) => {
      const pref = CAREER_MAP[mulank] || "both";
      return {
        en:
          pref === "business"
            ? `Your Mulank ${mulank} is a natural entrepreneur. Numbers 1, 3, 5, 9 thrive in leadership and business. You are self-driven, innovative, and work best when in control. Business, freelancing, or entrepreneurship is your calling.`
            : pref === "job"
              ? `Your Mulank ${mulank} is well-suited to stable employment and collaborative environments. You excel in organized settings where your skills are recognized. A career in government, healthcare, or education would suit you well.`
              : `Your Mulank ${mulank} is versatile — you can excel in both business and employment. You have the discipline for structured work and the creativity for entrepreneurship. Assess your current life phase to choose the best path.`,
        hi:
          pref === "business"
            ? `मूलांक ${mulank} उद्यमिता के लिए उपयुक्त है। नेतृत्व, स्वतंत्र कार्य और व्यापार आपके लिए श्रेष्ठ है।`
            : pref === "job"
              ? `मूलांक ${mulank} नियमित नौकरी के लिए अनुकूल है। सरकारी, शिक्षा या स्वास्थ्य क्षेत्र आपके लिए उत्तम है।`
              : `मूलांक ${mulank} बहुमुखी है। आप नौकरी और व्यापार दोनों में सफल हो सकते हैं।`,
      };
    },
  },
  {
    id: 3,
    icon: "🍀",
    titleEn: "Lucky Numbers & Colors",
    titleHi: "भाग्यशाली अंक और रंग",
    getAnswer: ({ mulank }) => {
      const nums = LUCKY_NUMBERS[mulank] || [1];
      const colors = LUCKY_COLORS[mulank] || ["Gold"];
      const interp = NUMBER_INTERPRETATIONS.find((n) => n.number === mulank);
      return {
        en: `Your Mulank ${mulank} (${interp?.planet || "Sun"}) gives you lucky numbers: ${nums.join(", ")}. Your lucky colors are ${colors.join(", ")}. Unlucky numbers to avoid: ${[
          1, 2, 3, 4, 5, 6, 7, 8, 9,
        ]
          .filter((n) => !nums.includes(n))
          .slice(0, 3)
          .join(", ")}.`,
        hi: `मूलांक ${mulank} के लिए भाग्यशाली अंक: ${nums.join(", ")}। शुभ रंग: ${colors.join(", ")}। अशुभ अंक: ${[
          1, 2, 3, 4, 5, 6, 7, 8, 9,
        ]
          .filter((n) => !nums.includes(n))
          .slice(0, 3)
          .join(", ")}।`,
      };
    },
  },
  {
    id: 4,
    icon: "⭐",
    titleEn: "Best Years of My Life",
    titleHi: "मेरे जीवन के सर्वोत्तम वर्ष",
    getAnswer: ({ mulank, bhagyank, dob }) => {
      const currentYear = new Date().getFullYear();
      const best1 = getYearsMatchingPY(dob, mulank, currentYear, 3);
      const best2 = getYearsMatchingPY(dob, bhagyank, currentYear, 2);
      const allBest = [...new Set([...best1, ...best2])].sort().slice(0, 5);
      return {
        en: `Based on your Mulank (${mulank}) and Bhagyank (${bhagyank}), your most powerful upcoming years are: ${allBest.join(", ")}. These Personal Years resonate with your core numbers and bring opportunities for growth, achievement, and fulfillment.`,
        hi: `मूलांक (${mulank}) और भाग्यांक (${bhagyank}) के आधार पर आपके सर्वोत्तम आगामी वर्ष हैं: ${allBest.join(", ")}। ये वर्ष उन्नति और सफलता के लिए अत्यंत अनुकूल हैं।`,
      };
    },
  },
  {
    id: 5,
    icon: "📅",
    titleEn: "Lucky Months This Year",
    titleHi: "इस वर्ष के शुभ महीने",
    getAnswer: ({ mulank, bhagyank, dob }) => {
      const year = new Date().getFullYear();
      const months = getPersonalMonths(dob, year);
      const lucky = months.filter((m) => m.py === mulank || m.py === bhagyank);
      const names = lucky.map((m) => m.month).join(", ");
      return {
        en:
          lucky.length > 0
            ? `Your lucky months in ${year} are: ${names}. These months have Personal Month numbers matching your Mulank (${mulank}) or Bhagyank (${bhagyank}). Focus major decisions and new ventures in these windows.`
            : `In ${year}, the months of ${months[0].month}, ${months[3].month}, and ${months[6].month} carry harmonious personal month vibrations for you. Plan important moves during these periods.`,
        hi:
          lucky.length > 0
            ? `${year} में आपके शुभ महीने हैं: ${lucky.map((m) => m.monthHi).join(", ")}। इन महीनों में व्यक्तिगत मास संख्या आपके मूलांक (${mulank}) से मेल खाती है।`
            : `${year} में ${months[0].monthHi}, ${months[3].monthHi} और ${months[6].monthHi} आपके लिए अनुकूल हैं।`,
      };
    },
  },
  {
    id: 6,
    icon: "🪐",
    titleEn: "Core Traits & Strengths",
    titleHi: "मूल गुण और शक्तियां",
    getAnswer: ({ mulank }) => {
      const pred = LIFE_PREDICTIONS[mulank];
      if (!pred) return { en: "Calculating...", hi: "गणना हो रही है..." };
      return {
        en: `${pred.character.en} Key strengths: ${NUMBER_INTERPRETATIONS.find((n) => n.number === mulank)?.strengths.join(", ") || "Leadership, determination"}. Challenges to watch: ${NUMBER_INTERPRETATIONS.find((n) => n.number === mulank)?.challenges.join(", ") || "Ego, stubbornness"}.`,
        hi: pred.character.hi,
      };
    },
  },
  {
    id: 7,
    icon: "🤝",
    titleEn: "Best Partnership Numbers",
    titleHi: "सर्वोत्तम साझेदारी अंक",
    getAnswer: ({ mulank }) => {
      const compat = COMPATIBILITY_MAP[mulank] || [1, 3, 9];
      const interp = NUMBER_INTERPRETATIONS.filter((n) =>
        compat.includes(n.number),
      );
      return {
        en: `For Mulank ${mulank}, the most compatible partners are those with Mulank ${compat.join(", ")}. ${interp
          .slice(0, 2)
          .map(
            (i) =>
              `Mulank ${i.number} (${i.name}) brings ${i.keywords[0].toLowerCase()} and ${i.keywords[1]?.toLowerCase() || "balance"} to the relationship`,
          )
          .join(". ")}.`,
        hi: `मूलांक ${mulank} के लिए सर्वोत्तम साझेदार मूलांक ${compat.join(", ")} वाले हैं। ये संबंध व्यापार और मित्रता दोनों में फलदायी हैं।`,
      };
    },
  },
  {
    id: 8,
    icon: "🏠",
    titleEn: "Best Years for Family",
    titleHi: "परिवार के लिए सर्वोत्तम वर्ष",
    getAnswer: ({ dob }) => {
      const currentYear = new Date().getFullYear();
      const familyYears = getYearsMatchingPY(dob, 6, currentYear, 3);
      return {
        en: `Personal Year 6 governs home, family, and domestic happiness. Your next Personal Year 6 periods fall in: ${familyYears.join(", ")}. These are ideal years for marriage, starting a family, home buying, or strengthening family bonds.`,
        hi: `व्यक्तिगत वर्ष 6 घर, परिवार और घरेलू सुख को नियंत्रित करता है। आपके अगले परिवार के वर्ष हैं: ${familyYears.join(", ")}। ये वर्ष विवाह, गृह क्रय के लिए आदर्श हैं।`,
      };
    },
  },
  {
    id: 9,
    icon: "⚠️",
    titleEn: "Caution Years",
    titleHi: "सतर्कता के वर्ष",
    getAnswer: ({ dob }) => {
      const currentYear = new Date().getFullYear();
      const caution8 = getYearsMatchingPY(dob, 8, currentYear, 2);
      const caution4 = getYearsMatchingPY(dob, 4, currentYear, 2);
      return {
        en: `Personal Year 8 (${caution8.join(", ")}) brings financial and karmic challenges — avoid high-risk ventures. Personal Year 4 (${caution4.join(", ")}) brings restrictions and delays — focus on foundations rather than new starts.`,
        hi: `व्यक्तिगत वर्ष 8 (${caution8.join(", ")}) वित्तीय चुनौतियां लाता है। व्यक्तिगत वर्ष 4 (${caution4.join(", ")}) में विलंब होता है — नई शुरुआत से बचें।`,
      };
    },
  },
  {
    id: 10,
    icon: "📱",
    titleEn: "Mobile Number Alignment",
    titleHi: "मोबाइल नंबर संरेखण",
    getAnswer: ({ mulank, bhagyank }) => {
      const ideal = [
        ...new Set([mulank, bhagyank, ...(LUCKY_NUMBERS[mulank] || [])]),
      ].slice(0, 4);
      return {
        en: `Based on your Mulank ${mulank}, your ideal mobile number should end in or sum to: ${ideal.join(", ")}. For a full analysis, enter your mobile number on the Numerology page. Numbers ending in ${mulank} or ${bhagyank} are most favorable for you.`,
        hi: `मूलांक ${mulank} के आधार पर आपका आदर्श मोबाइल नंबर ${ideal.join(", ")} पर समाप्त होना चाहिए। पूर्ण विश्लेषण के लिए अंकज्योतिष पृष्ठ पर अपना नंबर दर्ज करें।`,
      };
    },
  },
  {
    id: 11,
    icon: "🌱",
    titleEn: "Qualities to Adopt & Release",
    titleHi: "अपनाएं और छोड़ें",
    getAnswer: ({ mulank }) => {
      const interp = NUMBER_INTERPRETATIONS.find((n) => n.number === mulank);
      const adopt = interp?.keywords || ["wisdom", "clarity"];
      const release = interp?.challenges || ["ego", "stubbornness"];
      const pred = LIFE_PREDICTIONS[mulank];
      return {
        en: `Based on Mulank ${mulank}: Develop — ${adopt.join(", ")}. These qualities amplify your natural gifts. Release — ${release.join(", ")}. ${pred?.character.en.split(".")[0] || ""}.`,
        hi: `मूलांक ${mulank} के आधार पर: विकसित करें — ${adopt.join(", ")}। छोड़ें — ${release.join(", ")}।`,
      };
    },
  },
  {
    id: 12,
    icon: "🛤️",
    titleEn: "Life Path (Bhagyank) Meaning",
    titleHi: "जीवन पथ का अर्थ",
    getAnswer: ({ bhagyank }) => {
      const interp = NUMBER_INTERPRETATIONS.find((n) => n.number === bhagyank);
      const pred = LIFE_PREDICTIONS[bhagyank];
      return {
        en: interp
          ? `Your Bhagyank (Life Path) is ${bhagyank} — "${interp.name}". Ruled by ${interp.planet}. ${interp.description} ${pred?.career.en.split(".")[0] || ""}. Your life purpose involves: ${interp.keywords.join(", ")}.`
          : `Your Bhagyank ${bhagyank} guides your life destiny.`,
        hi: pred
          ? `आपका भाग्यांक ${bhagyank} — "${interp?.name || ""}". ${pred.career.hi}`
          : `भाग्यांक ${bhagyank} आपके जीवन के उद्देश्य को दर्शाता है।`,
      };
    },
  },
  {
    id: 13,
    icon: "🔲",
    titleEn: "Lo Shu Grid Analysis",
    titleHi: "लो शू ग्रिड विश्लेषण",
    getAnswer: ({ loShuNumbers, missingNumbers }) => {
      const present = [...new Set(loShuNumbers)];
      const missingAreas = missingNumbers.map(
        (n) => `${n} (${MISSING_AREAS[n] || "energy imbalance"})`,
      );
      return {
        en: `Present numbers in your grid: ${present.join(", ")} — these represent your natural strengths. Missing numbers: ${missingNumbers.length > 0 ? missingNumbers.join(", ") : "none"}. ${missingNumbers.length > 0 ? `Missing numbers indicate: ${missingAreas.slice(0, 3).join("; ")}.` : "Your grid has no missing numbers — a complete and balanced chart."}`,
        hi: `आपके ग्रिड में मौजूद अंक: ${present.join(", ")} — ये आपकी प्राकृतिक शक्तियां हैं। अनुपस्थित अंक: ${missingNumbers.length > 0 ? missingNumbers.join(", ") : "कोई नहीं"}। ${missingNumbers.length > 0 ? "इन क्षेत्रों में सुधार की आवश्यकता है।" : "आपका ग्रिड पूर्ण और संतुलित है।"}`,
      };
    },
  },
  {
    id: 14,
    icon: "🔢",
    titleEn: "Number Frequency Meaning",
    titleHi: "अंक आवृत्ति का अर्थ",
    getAnswer: ({ loShuNumbers, loShuFrequency }) => {
      const repeated = Object.entries(loShuFrequency)
        .filter(([, freq]) => (freq as number) >= 2)
        .map(([n, freq]) => {
          const meaning = getNumberMeaning(Number(n));
          return { n: Number(n), freq: freq as number, meaning };
        });
      if (repeated.length === 0) {
        return {
          en: `Your Lo Shu numbers (${[...new Set(loShuNumbers)].join(", ")}) appear once each. A balanced distribution of number frequencies indicates a well-rounded personality without extreme energies.`,
          hi: "आपके लो शू अंक एक-एक बार उपस्थित हैं। यह संतुलित व्यक्तित्व का संकेत है।",
        };
      }
      const descriptions = repeated
        .slice(0, 3)
        .map(
          (r) =>
            `Number ${r.n} appears ${r.freq}x — amplified ${r.meaning.planet} (${r.meaning.description.split(".")[0]})`,
        );
      return {
        en: `Repeated numbers in your chart: ${descriptions.join("; ")}.`,
        hi: `आपके चार्ट में बार-बार आने वाले अंक: ${repeated
          .slice(0, 3)
          .map((r) => `अंक ${r.n} (${r.freq} बार) — ${r.meaning.planetHi} प्रभाव`)
          .join("; ")}।`,
      };
    },
  },
  {
    id: 15,
    icon: "🌊",
    titleEn: "Element Balance in Chart",
    titleHi: "तत्व संतुलन",
    getAnswer: ({ loShuNumbers }) => {
      const elems: Record<string, number[]> = {
        Water: [1, 2],
        Wood: [3, 4],
        Metal: [6, 7],
        Earth: [8, 9],
        Center: [5],
      };
      const counts: Record<string, number> = {
        Water: 0,
        Wood: 0,
        Metal: 0,
        Earth: 0,
        Center: 0,
      };
      for (const n of loShuNumbers) {
        for (const [elem, nums] of Object.entries(elems)) {
          if (nums.includes(n)) counts[elem]++;
        }
      }
      const strong = Object.entries(counts)
        .filter(([, c]) => c >= 2)
        .map(([e]) => e);
      const missing = Object.entries(counts)
        .filter(([, c]) => c === 0)
        .map(([e]) => e);
      return {
        en: `Element analysis — Strong: ${strong.join(", ") || "balanced"}. Weak/missing: ${missing.join(", ") || "none"}. ${missing.length > 0 ? `Strengthen missing ${missing.join(", ")} elements through appropriate colors, foods, and environments.` : "Your elemental balance is excellent."}`,
        hi: `तत्व विश्लेषण — मजबूत: ${strong.join(", ") || "संतुलित"}। कमजोर: ${missing.join(", ") || "कोई नहीं"}। ${missing.length > 0 ? `${missing.join(", ")} तत्वों को संतुलित करना आवश्यक है।` : "आपका तत्व संतुलन उत्तम है।"}`,
      };
    },
  },
  {
    id: 16,
    icon: "🔮",
    titleEn: "Lo Shu Grid Remedies",
    titleHi: "लो शू ग्रिड के उपाय",
    getAnswer: ({ missingNumbers }) => {
      if (missingNumbers.length === 0) {
        return {
          en: "Your Lo Shu Grid has no missing numbers — congratulations! All nine energy centers are active. Focus on maintaining balance and channeling the strong energies you possess.",
          hi: "आपके लो शू ग्रिड में कोई अनुपस्थित अंक नहीं है। सभी नौ ऊर्जा केंद्र सक्रिय हैं।",
        };
      }
      const remedies = missingNumbers.slice(0, 3).map((n) => {
        const m = getNumberMeaning(n);
        return `Number ${n} (${m.planet}): ${getPlaneRemedies("Mental Plane", "PARTIAL")[0]}`;
      });
      return {
        en: `Remedies for missing numbers: ${remedies.join(". ")}. Wearing the color ${missingNumbers.map((n) => getNumberMeaning(n).color).join(", ")} and meditating on these numbers will help activate the missing energies.`,
        hi: `अनुपस्थित अंकों (${missingNumbers.join(", ")}) के उपाय: ${missingNumbers.map((n) => `${getNumberMeaning(n).planetHi} रंग (${getNumberMeaning(n).color}) पहनें`).join("; ")}।`,
      };
    },
  },
  {
    id: 17,
    icon: "🌀",
    titleEn: "Most Transitional Year",
    titleHi: "सबसे परिवर्तनकारी वर्ष",
    getAnswer: ({ dob }) => {
      const currentYear = new Date().getFullYear();
      const transitYears = getYearsMatchingPY(dob, 9, currentYear, 3);
      return {
        en: `Personal Year 9 represents completion, endings, and major life transitions. Your upcoming Personal Year 9 periods: ${transitYears.join(", ")}. These are years of closure, releasing what no longer serves you, and preparing for a new 9-year cycle.`,
        hi: `व्यक्तिगत वर्ष 9 पूर्णता और परिवर्तन का प्रतीक है। आपके आगामी संक्रमण वर्ष: ${transitYears.join(", ")}। ये वर्ष पुरानी चीजें छोड़ने और नए चक्र की तैयारी के लिए हैं।`,
      };
    },
  },
  {
    id: 18,
    icon: "🌟",
    titleEn: "Best Years for New Beginnings",
    titleHi: "नई शुरुआत के सर्वोत्तम वर्ष",
    getAnswer: ({ dob }) => {
      const currentYear = new Date().getFullYear();
      const newYears = getYearsMatchingPY(dob, 1, currentYear, 3);
      return {
        en: `Personal Year 1 marks fresh starts, independence, and new cycles. Your upcoming Personal Year 1 periods: ${newYears.join(", ")}. Launch businesses, relationships, projects, or any major life change in these years for maximum success.`,
        hi: `व्यक्तिगत वर्ष 1 नई शुरुआत का प्रतीक है। आपके आगामी नई शुरुआत के वर्ष: ${newYears.join(", ")}। इन वर्षों में व्यापार, नई परियोजना शुरू करना सर्वोत्तम है।`,
      };
    },
  },
  {
    id: 19,
    icon: "☯️",
    titleEn: "Do Mulank & Bhagyank Support Each Other?",
    titleHi: "मूलांक और भाग्यांक एक-दूसरे के पूरक हैं?",
    getAnswer: ({ mulank, bhagyank }) => {
      const harmonious = (COMPATIBILITY_MAP[mulank] || []).includes(bhagyank);
      const sum = reduceToSingle(mulank + bhagyank);
      return {
        en: harmonious
          ? `Your Mulank (${mulank}) and Bhagyank (${bhagyank}) are harmoniously compatible! Their combined vibration reduces to ${sum}. This alignment means your daily personality and life purpose work in synergy — you naturally attract opportunities aligned with your destiny.`
          : `Your Mulank (${mulank}) and Bhagyank (${bhagyank}) create a dynamic tension that can be both challenging and growth-inducing. Their sum reduces to ${sum}. This combination pushes you to grow beyond your comfort zone. Wearing your lucky colors and meditating on both numbers daily will help harmonize these energies.`,
        hi: harmonious
          ? `आपके मूलांक (${mulank}) और भाग्यांक (${bhagyank}) सुसंगत हैं! इनका संयुक्त कंपन ${sum} है। यह संरेखण दर्शाता है कि आपका व्यक्तित्व और जीवन उद्देश्य एक दूसरे के पूरक हैं।`
          : `मूलांक (${mulank}) और भाग्यांक (${bhagyank}) के बीच गतिशील तनाव है जो विकास को प्रेरित करता है। इनका योग ${sum} है। अपने शुभ रंग पहनें और दोनों अंकों का ध्यान करें।`,
      };
    },
  },
];

// ─── Single AI Insight Card Component ────────────────────────────────────────
interface CardData {
  id: number;
  icon: string;
  titleEn: string;
  titleHi: string;
  answerEn: string;
  answerHi: string;
}

function AICard({
  card,
  hi,
  idx,
}: { card: CardData; hi: boolean; idx: number }) {
  const [cardLang, setCardLang] = useState<"hi" | "en">(hi ? "hi" : "en");
  const answer = cardLang === "hi" ? card.answerHi : card.answerEn;

  return (
    <OrnamentalCard data-ocid={`ai_insights.card.${idx}`} className="relative">
      {/* FREE badge */}
      <div className="absolute top-3 right-3">
        <Badge className="bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e] text-xs font-bold">
          FREE ✓
        </Badge>
      </div>

      {/* Icon + Title */}
      <div className="flex items-start gap-3 mb-3 pr-16">
        <div className="text-2xl shrink-0">{card.icon}</div>
        <div>
          <div className="font-bold text-foreground text-sm">
            {hi ? card.titleHi : card.titleEn}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            {hi ? card.titleEn : card.titleHi}
          </div>
        </div>
      </div>

      {/* Answer */}
      <div className="bg-muted/40 rounded-lg p-3 mb-3">
        <p className="text-sm text-foreground leading-relaxed">{answer}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <SpeakerButton
          text={answer}
          lang={cardLang === "hi" ? "hi-IN" : "en-IN"}
          size="sm"
          data-ocid={`ai_insights.speaker.${idx}`}
        />
        <button
          type="button"
          onClick={() => setCardLang((prev) => (prev === "hi" ? "en" : "hi"))}
          data-ocid={`ai_insights.lang_toggle.${idx}`}
          className="px-3 py-1 rounded-full border border-[#D4AF37] text-[#D4AF37] text-xs font-medium hover:bg-[#D4AF37]/10 transition-colors"
        >
          {cardLang === "hi" ? "English" : "हिंदी"}
        </button>
        <div className="ml-auto text-xs text-muted-foreground">#{idx}</div>
      </div>
    </OrnamentalCard>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function AIInsights() {
  const { language } = useLanguage();
  const hi = language === "hi";
  const birthData = useBirthData();
  const astro = useAstrology(birthData);
  const numerology = useNumerology(birthData);

  const cards: CardData[] = useMemo(() => {
    if (!birthData) return [];
    const params = {
      mulank: numerology.mulank || 1,
      bhagyank: numerology.bhagyank || 1,
      dob: birthData.dob,
      name: birthData.name || "",
      loShuNumbers: numerology.loShuNumbers,
      missingNumbers: numerology.missingNumbers,
      loShuFrequency: numerology.numberFrequency,
      lagnaSign: String(astro.lagna?.sign || ""),
      moonSign: String(astro.planetPositions?.Moon?.sign || ""),
    };
    return CARDS.map((card) => {
      const { en, hi: hiText } = card.getAnswer(params);
      return {
        id: card.id,
        icon: card.icon,
        titleEn: card.titleEn,
        titleHi: card.titleHi,
        answerEn: en,
        answerHi: hiText,
      };
    });
  }, [birthData, numerology, astro]);

  if (!birthData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <OrnamentalCard className="max-w-md text-center p-8">
          <div className="text-5xl mb-4">🔮</div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            {hi
              ? "19 व्यक्तिगत अंतर्दृष्टि अनलॉक करें"
              : "Unlock 19 Personalized Insights"}
          </h2>
          <p className="text-muted-foreground mb-2">
            {hi
              ? "सभी 19 प्रश्न निःशुल्क हैं। पहले जन्म विवरण भरें।"
              : "All 19 insights are FREE. Fill your birth details to unlock them instantly."}
          </p>
          <div className="flex flex-wrap gap-1 justify-center mb-4">
            {[
              "📛 Name",
              "💼 Career",
              "🍀 Lucky",
              "⭐ Years",
              "📅 Months",
              "🪐 Traits",
              "🤝 Partners",
              "🏠 Family",
              "⚠️ Caution",
              "📱 Mobile",
            ].map((t) => (
              <Badge
                key={t}
                variant="outline"
                className="text-xs border-[#D4AF37] text-[#D4AF37]"
              >
                {t}
              </Badge>
            ))}
            <Badge
              variant="outline"
              className="text-xs border-[#D4AF37] text-[#D4AF37]"
            >
              + 9 more
            </Badge>
          </div>
          <a href="/vedic-dashboard">
            <Button className="bg-[#FF9933] hover:bg-[#e8871e] text-white w-full font-semibold">
              {hi ? "जन्म विवरण भरें — सभी FREE" : "Fill Birth Details — All FREE"}
            </Button>
          </a>
        </OrnamentalCard>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-background py-6 px-4"
      data-ocid="ai_insights.page"
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Hero Header */}
        <OrnamentalCard className="text-center py-6">
          <div className="text-4xl mb-2">🔮</div>
          <h1
            className="text-2xl md:text-3xl font-bold"
            style={{ color: "#FF9933" }}
          >
            {hi ? "आपकी व्यक्तिगत अंतर्दृष्टि" : "Your Personalized Insights"}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {hi
              ? "अंकशास्त्र + ज्योतिष + लो शू ग्रिड पर आधारित"
              : "Based on your Numerology + Astrology + Lo Shu Grid"}
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            <div className="text-center">
              <div className="text-xl font-black text-[#FF9933]">
                {numerology.mulank}
              </div>
              <div className="text-xs text-muted-foreground">
                {hi ? "मूलांक" : "Mulank"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-black text-[#D4AF37]">
                {numerology.bhagyank}
              </div>
              <div className="text-xs text-muted-foreground">
                {hi ? "भाग्यांक" : "Bhagyank"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-black text-foreground">
                {birthData.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {hi ? "नाम" : "Name"}
              </div>
            </div>
            <Badge className="bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e] font-bold self-center">
              19/19 FREE ✓
            </Badge>
          </div>
        </OrnamentalCard>

        {/* 19 Cards Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          data-ocid="ai_insights.cards_grid"
        >
          {cards.map((card, i) => (
            <AICard key={card.id} card={card} hi={hi} idx={i + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
