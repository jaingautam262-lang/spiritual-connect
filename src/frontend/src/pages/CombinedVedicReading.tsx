import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Eye,
  Hand,
  History,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "../contexts/LanguageContext";
import {
  useCreateCombinedVedicReading,
  useGetMyCombinedVedicReadings,
} from "../hooks/useQueries";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CombinedReadingForm {
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  lagnaSign: string;
  moonSign: string;
  sunSign: string;
  activeDasha: string;
  doshas: string[];
  palmShape: string;
  dominantLine: string;
  heartLineStrength: string;
  headLineStrength: string;
  lifeLineStrength: string;
  fateLineStrength: string;
  palmDescription: string;
}

interface GeneratedReading {
  planetaryInfluence: { hi: string; en: string };
  palmMessage: { hi: string; en: string };
  combinedInsight: { hi: string; en: string };
  remedies: { hi: string; en: string };
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ZODIAC_SIGNS = [
  { value: "Aries", hi: "मेष", en: "Aries" },
  { value: "Taurus", hi: "वृषभ", en: "Taurus" },
  { value: "Gemini", hi: "मिथुन", en: "Gemini" },
  { value: "Cancer", hi: "कर्क", en: "Cancer" },
  { value: "Leo", hi: "सिंह", en: "Leo" },
  { value: "Virgo", hi: "कन्या", en: "Virgo" },
  { value: "Libra", hi: "तुला", en: "Libra" },
  { value: "Scorpio", hi: "वृश्चिक", en: "Scorpio" },
  { value: "Sagittarius", hi: "धनु", en: "Sagittarius" },
  { value: "Capricorn", hi: "मकर", en: "Capricorn" },
  { value: "Aquarius", hi: "कुंभ", en: "Aquarius" },
  { value: "Pisces", hi: "मीन", en: "Pisces" },
];

const DASHA_OPTIONS = [
  { value: "Ketu", hi: "केतु दशा", en: "Ketu Dasha" },
  { value: "Venus", hi: "शुक्र दशा", en: "Venus Dasha" },
  { value: "Sun", hi: "सूर्य दशा", en: "Sun Dasha" },
  { value: "Moon", hi: "चंद्र दशा", en: "Moon Dasha" },
  { value: "Mars", hi: "मंगल दशा", en: "Mars Dasha" },
  { value: "Rahu", hi: "राहु दशा", en: "Rahu Dasha" },
  { value: "Jupiter", hi: "गुरु दशा", en: "Jupiter Dasha" },
  { value: "Saturn", hi: "शनि दशा", en: "Saturn Dasha" },
  { value: "Mercury", hi: "बुध दशा", en: "Mercury Dasha" },
];

const DOSHAS = [
  { value: "Mangal Dosha", hi: "मंगल दोष", en: "Mangal Dosha" },
  { value: "Kalsarp Dosha", hi: "कालसर्प दोष", en: "Kalsarp Dosha" },
  { value: "Shani Sade Sati", hi: "शनि साढ़े साती", en: "Shani Sade Sati" },
  { value: "Pitra Dosha", hi: "पितृ दोष", en: "Pitra Dosha" },
  { value: "Nazar Dosha", hi: "नज़र दोष", en: "Nazar Dosha" },
];

const PALM_SHAPES = [
  { value: "Earth", hi: "पृथ्वी हस्त", en: "Earth Palm", icon: "🌍" },
  { value: "Air", hi: "वायु हस्त", en: "Air Palm", icon: "💨" },
  { value: "Fire", hi: "अग्नि हस्त", en: "Fire Palm", icon: "🔥" },
  { value: "Water", hi: "जल हस्त", en: "Water Palm", icon: "💧" },
];

const DOMINANT_LINES = [
  { value: "Heart", hi: "हृदय रेखा", en: "Heart Line" },
  { value: "Head", hi: "मस्तिष्क रेखा", en: "Head Line" },
  { value: "Life", hi: "जीवन रेखा", en: "Life Line" },
  { value: "Fate", hi: "भाग्य रेखा", en: "Fate Line" },
  { value: "Sun", hi: "सूर्य रेखा", en: "Sun Line" },
  { value: "Health", hi: "स्वास्थ्य रेखा", en: "Health Line" },
  { value: "Mercury", hi: "बुध रेखा", en: "Mercury Line" },
];

const STRENGTHS = [
  { value: "Strong", hi: "प्रबल", en: "Strong" },
  { value: "Medium", hi: "मध्यम", en: "Medium" },
  { value: "Weak", hi: "दुर्बल", en: "Weak" },
  { value: "Absent", hi: "अनुपस्थित", en: "Absent" },
];

// ─── Correlation Engine ────────────────────────────────────────────────────────

const MOON_ELEMENT: Record<string, string> = {
  Aries: "Fire",
  Leo: "Fire",
  Sagittarius: "Fire",
  Taurus: "Earth",
  Virgo: "Earth",
  Capricorn: "Earth",
  Gemini: "Air",
  Libra: "Air",
  Aquarius: "Air",
  Cancer: "Water",
  Scorpio: "Water",
  Pisces: "Water",
};

const MOON_QUALITY: Record<string, { hi: string; en: string }> = {
  Aries: { hi: "अग्नि ऊर्जा और साहस", en: "Fire energy and courage" },
  Taurus: {
    hi: "पृथ्वी स्थिरता और भौतिक समृद्धि",
    en: "Earth stability and material prosperity",
  },
  Gemini: {
    hi: "वायु बुद्धि और संचार कौशल",
    en: "Air intellect and communication skill",
  },
  Cancer: { hi: "जल भावनाएं और पालन-पोषण", en: "Water emotions and nurturing" },
  Leo: {
    hi: "अग्नि नेतृत्व और आत्म-अभिव्यक्ति",
    en: "Fire leadership and self-expression",
  },
  Virgo: { hi: "पृथ्वी सटीकता और सेवा भाव", en: "Earth precision and service" },
  Libra: { hi: "वायु संतुलन और सौंदर्यबोध", en: "Air balance and aesthetic sense" },
  Scorpio: {
    hi: "जल रहस्य और परिवर्तन शक्ति",
    en: "Water mystery and transformative power",
  },
  Sagittarius: {
    hi: "अग्नि ज्ञान और आध्यात्मिक खोज",
    en: "Fire wisdom and spiritual quest",
  },
  Capricorn: {
    hi: "पृथ्वी महत्वाकांक्षा और अनुशासन",
    en: "Earth ambition and discipline",
  },
  Aquarius: {
    hi: "वायु नवाचार और मानवीय दृष्टि",
    en: "Air innovation and humanitarian vision",
  },
  Pisces: {
    hi: "जल आध्यात्मिकता और सहानुभूति",
    en: "Water spirituality and empathy",
  },
};

const DASHA_THEME: Record<string, { hi: string; en: string }> = {
  Venus: {
    hi: "प्रेम, सौंदर्य और कलाओं का समय",
    en: "Time of love, beauty and arts",
  },
  Jupiter: {
    hi: "ज्ञान, विस्तार और धन का समय",
    en: "Time of wisdom, expansion and wealth",
  },
  Saturn: {
    hi: "कर्म, अनुशासन और कठिन परिश्रम का समय",
    en: "Time of karma, discipline and hard work",
  },
  Mars: {
    hi: "ऊर्जा, संघर्ष और साहस का समय",
    en: "Time of energy, conflict and courage",
  },
  Mercury: {
    hi: "बुद्धि, व्यापार और संचार का समय",
    en: "Time of intellect, business and communication",
  },
  Sun: {
    hi: "आत्मा, अधिकार और पहचान का समय",
    en: "Time of soul, authority and identity",
  },
  Moon: {
    hi: "मन, भावनाएं और सहज ज्ञान का समय",
    en: "Time of mind, emotions and intuition",
  },
  Rahu: {
    hi: "महत्वाकांक्षा, भ्रम और नई दिशाओं का समय",
    en: "Time of ambition, illusion and new directions",
  },
  Ketu: {
    hi: "आध्यात्मिकता, वैराग्य और पिछले जन्म का समय",
    en: "Time of spirituality, detachment and past karma",
  },
};

function generateCombinedReading(form: CombinedReadingForm): GeneratedReading {
  const moonEl = MOON_ELEMENT[form.moonSign] || "Unknown";
  const palmEl = form.palmShape;
  const moonQ = MOON_QUALITY[form.moonSign] || { hi: "अज्ञात", en: "Unknown" };
  const dashaT = DASHA_THEME[form.activeDasha] || {
    hi: "अज्ञात",
    en: "Unknown",
  };

  // Elemental synergy
  const elementMatch = moonEl === palmEl;
  const synergyHi = elementMatch
    ? `आपकी चंद्र राशि (${form.moonSign}) और हस्त तत्व (${palmEl}) दोनों एक ही तत्व के हैं — यह एक दुर्लभ और शक्तिशाली संरेखण है।`
    : `आपकी चंद्र राशि ${form.moonSign} (${moonEl} तत्व) और ${palmEl} हस्त में एक रोचक द्वंद्व है जो आपको बहुआयामी बनाता है।`;
  const synergyEn = elementMatch
    ? `Your Moon sign (${form.moonSign}) and Palm element (${palmEl}) share the same element — a rare and powerful alignment.`
    : `Your Moon sign ${form.moonSign} (${moonEl} element) and ${palmEl} palm create an interesting duality that makes you multidimensional.`;

  // Dosha-palm correlations
  const doshaWarnings: string[] = [];
  const doshaWarningsEn: string[] = [];
  if (
    form.doshas.includes("Mangal Dosha") &&
    (form.heartLineStrength === "Weak" || form.heartLineStrength === "Absent")
  ) {
    doshaWarnings.push(
      "मंगल दोष और कमज़ोर हृदय रेखा मिलकर विवाह में विलंब का संकेत देते हैं",
    );
    doshaWarningsEn.push(
      "Mangal Dosha combined with weak Heart line suggests delays in marriage",
    );
  }
  if (
    form.doshas.includes("Kalsarp Dosha") &&
    (form.fateLineStrength === "Absent" || form.fateLineStrength === "Weak")
  ) {
    doshaWarnings.push(
      "कालसर्प दोष और अनुपस्थित या कमज़ोर भाग्य रेखा छिपी बाधाओं की ओर संकेत करते हैं",
    );
    doshaWarningsEn.push(
      "Kalsarp Dosha with absent or weak Fate line points to hidden obstacles",
    );
  }
  if (form.doshas.includes("Shani Sade Sati")) {
    doshaWarnings.push("शनि साढ़े साती चल रही है — धैर्य और कर्म पर ध्यान दें");
    doshaWarningsEn.push(
      "Shani Sade Sati is active — focus on patience and righteous action",
    );
  }
  if (form.doshas.includes("Pitra Dosha")) {
    doshaWarnings.push("पितृ दोष — पितृ तर्पण और श्राद्ध से शांति संभव है");
    doshaWarningsEn.push(
      "Pitra Dosha present — Tarpan and Shraddha rituals can bring relief",
    );
  }

  // Dasha-line synergy
  let dashaLineHi = "";
  let dashaLineEn = "";
  if (form.activeDasha === "Venus" && form.dominantLine === "Heart") {
    dashaLineHi =
      "शुक्र दशा में प्रबल हृदय रेखा — यह रोमांस, प्रेम और कलात्मक सफलता का स्वर्णिम काल है।";
    dashaLineEn =
      "Venus Dasha with strong Heart line — a golden period for romance, love and artistic success.";
  } else if (form.activeDasha === "Saturn" && form.dominantLine === "Fate") {
    dashaLineHi =
      "शनि दशा में प्रबल भाग्य रेखा — कठिन परिश्रम से कर्मफल अवश्य मिलेगा, यह समय नींव रखने का है।";
    dashaLineEn =
      "Saturn Dasha with strong Fate line — hard work will yield karmic rewards; this is time to build foundations.";
  } else if (form.activeDasha === "Jupiter" && form.dominantLine === "Sun") {
    dashaLineHi =
      "गुरु दशा और सूर्य रेखा मिलकर नाम, प्रसिद्धि और आध्यात्मिक उत्थान का मार्ग प्रशस्त करते हैं।";
    dashaLineEn =
      "Jupiter Dasha with Sun line together pave the path to fame, recognition and spiritual elevation.";
  } else if (form.activeDasha === "Rahu") {
    dashaLineHi =
      "राहु दशा में अनपेक्षित परिवर्तन आते हैं — नई तकनीक और विदेश से अवसर मिल सकते हैं।";
    dashaLineEn =
      "Rahu Dasha brings unexpected changes — opportunities from new technology and foreign lands.";
  } else if (form.activeDasha === "Ketu") {
    dashaLineHi =
      "केतु दशा आत्म-ज्ञान और आध्यात्मिक गहराई का समय है — भौतिक इच्छाएं कम होंगी।";
    dashaLineEn =
      "Ketu Dasha is time for self-knowledge and spiritual depth — material desires will diminish.";
  } else {
    dashaLineHi = `${dashaT.hi} — यह काल आपके ${form.dominantLine === "Heart" ? "हृदय और भावनाओं" : form.dominantLine === "Head" ? "बुद्धि और निर्णय" : form.dominantLine === "Fate" ? "कर्म और भाग्य" : "जीवन शक्ति"} को प्रभावित करेगा।`;
    dashaLineEn = `${dashaT.en} — This period will impact your ${form.dominantLine === "Heart" ? "heart and emotions" : form.dominantLine === "Head" ? "intellect and decisions" : form.dominantLine === "Fate" ? "karma and destiny" : "life force"}.`;
  }

  // Remedies
  const remedyMap: Record<string, { hi: string; en: string }> = {
    Venus: {
      hi: "शुक्रवार को सफेद वस्तुएं दान करें, लक्ष्मी माता की पूजा करें",
      en: "Donate white items on Fridays, worship Goddess Lakshmi",
    },
    Jupiter: {
      hi: "गुरुवार को पीले वस्त्र पहनें, केले का दान करें",
      en: "Wear yellow on Thursdays, donate bananas",
    },
    Saturn: {
      hi: "शनिवार को काले तिल का दान करें, हनुमान चालीसा पढ़ें",
      en: "Donate black sesame on Saturdays, recite Hanuman Chalisa",
    },
    Mars: {
      hi: "मंगलवार को लाल वस्त्र पहनें, हनुमान जी की पूजा करें",
      en: "Wear red on Tuesdays, worship Lord Hanuman",
    },
    Mercury: {
      hi: "बुधवार को हरी सब्जियां दान करें, गणेश पूजा करें",
      en: "Donate green vegetables on Wednesdays, worship Lord Ganesha",
    },
    Sun: {
      hi: "रोज़ सूर्य को जल अर्पित करें, आदित्य हृदयम् पढ़ें",
      en: "Offer water to Sun daily, recite Aditya Hridayam",
    },
    Moon: {
      hi: "सोमवार को शिवलिंग पर जल चढ़ाएं, चांदी धारण करें",
      en: "Offer water on Shivling on Mondays, wear silver",
    },
    Rahu: {
      hi: "राहु काल में नए कार्य न करें, दुर्गा सप्तशती का पाठ करें",
      en: "Avoid new ventures during Rahu Kaal, recite Durga Saptashati",
    },
    Ketu: {
      hi: "केतु शांति हेतु गणपति अथर्वशीर्ष पढ़ें, ध्यान और योग करें",
      en: "For Ketu peace, recite Ganapati Atharvashirsha, practice meditation and yoga",
    },
  };
  const dashaRemedy = remedyMap[form.activeDasha] || {
    hi: "नियमित पूजा और सात्विक आहार अपनाएं",
    en: "Follow regular worship and sattvic diet",
  };

  const palmShapeRemedy: Record<string, { hi: string; en: string }> = {
    Fire: {
      hi: "अग्नि हस्त वाले व्यक्तियों को शीतल रत्न जैसे मोती या चंद्रकांत धारण करना लाभकारी है",
      en: "Fire palm individuals benefit from cooling gems like Pearl or Moonstone",
    },
    Earth: {
      hi: "पृथ्वी हस्त वाले पन्ना या पुखराज धारण करें, भूमि से जुड़े रहें",
      en: "Earth palm individuals should wear Emerald or Yellow Sapphire, stay grounded",
    },
    Air: {
      hi: "वायु हस्त वाले हरे रंग की वस्तुएं और बुध मंत्र का जाप करें",
      en: "Air palm individuals should use green items and chant Mercury mantras",
    },
    Water: {
      hi: "जल हस्त वाले मोती धारण करें और चंद्र उपासना करें",
      en: "Water palm individuals should wear Pearl and worship the Moon",
    },
  };
  const palmRemedy = palmShapeRemedy[form.palmShape] || {
    hi: "हाथों की नियमित रेखाओं का अवलोकन करें",
    en: "Regularly observe palm lines for changes",
  };

  return {
    planetaryInfluence: {
      hi: `आपकी जन्म कुंडली में ${form.moonSign} राशि (${moonQ.hi}) के साथ ${form.lagnaSign} लग्न का संयोग बना है। वर्तमान में ${DASHA_THEME[form.activeDasha]?.hi ?? `${form.activeDasha} दशा`} चल रही है। ${form.sunSign} सूर्य राशि आपकी आत्मा और जीवन उद्देश्य को दर्शाती है। ${doshaWarnings.length > 0 ? `⚠️ दोष संकेत: ${doshaWarnings.join("; ")}।` : "आपकी कुंडली में कोई गंभीर दोष नहीं पाया गया।"}`,
      en: `Your birth chart shows ${form.moonSign} Moon sign (${moonQ.en}) with ${form.lagnaSign} Ascendant. Currently ${DASHA_THEME[form.activeDasha]?.en ?? `${form.activeDasha} Dasha`} is active. ${form.sunSign} Sun sign reveals your soul purpose. ${doshaWarningsEn.length > 0 ? `⚠️ Dosha alerts: ${doshaWarningsEn.join("; ")}.` : "No serious doshas found in your chart."}`,
    },
    palmMessage: {
      hi: `आपका ${form.palmShape} हस्त ${palmEl === "Fire" ? "ऊर्जावान और नेतृत्वकारी" : palmEl === "Earth" ? "व्यावहारिक और स्थिर" : palmEl === "Air" ? "बौद्धिक और संचारक" : "संवेदनशील और सहज ज्ञानी"} स्वभाव दर्शाता है। प्रमुख ${form.dominantLine === "Heart" ? "हृदय रेखा भावनात्मक समृद्धि का संकेत देती है" : form.dominantLine === "Head" ? "मस्तिष्क रेखा तीव्र बुद्धि दर्शाती है" : form.dominantLine === "Fate" ? "भाग्य रेखा दृढ़ नियति का संकेत है" : form.dominantLine === "Life" ? "जीवन रेखा दीर्घ और सक्रिय जीवन का संकेत है" : "रेखा आपकी विशेष शक्ति को दर्शाती है"}। हृदय रेखा ${form.heartLineStrength}, मस्तिष्क रेखा ${form.headLineStrength}, जीवन रेखा ${form.lifeLineStrength} और भाग्य रेखा ${form.fateLineStrength} है।`,
      en: `Your ${form.palmShape} palm indicates a ${palmEl === "Fire" ? "dynamic and leadership-oriented" : palmEl === "Earth" ? "practical and stable" : palmEl === "Air" ? "intellectual and communicative" : "sensitive and intuitive"} nature. The dominant ${form.dominantLine} line ${form.dominantLine === "Heart" ? "indicates emotional richness" : form.dominantLine === "Head" ? "shows sharp intellect" : form.dominantLine === "Fate" ? "signals strong destiny" : form.dominantLine === "Life" ? "suggests a long, active life" : "reveals your unique strength"}. Heart line: ${form.heartLineStrength}, Head line: ${form.headLineStrength}, Life line: ${form.lifeLineStrength}, Fate line: ${form.fateLineStrength}.`,
    },
    combinedInsight: {
      hi: `${synergyHi} ${dashaLineHi} ${moonQ.hi} वाली आत्मा जब ${form.palmShape} हस्त में प्रकट होती है, तो यह संयोग ${elementMatch ? "असाधारण आत्म-जागरूकता और एकाग्रता" : "विविध क्षमताओं और अनुकूलनशीलता"} का निर्माण करता है। आपके जीवन का मुख्य पाठ: ${form.activeDasha === "Saturn" || form.doshas.includes("Shani Sade Sati") ? "कर्म और धैर्य से सफलता" : form.activeDasha === "Jupiter" ? "ज्ञान और सेवा से उत्थान" : form.activeDasha === "Ketu" ? "वैराग्य और आत्म-साक्षात्कार" : "अपनी प्रतिभा को निखारना और दूसरों की मदद करना"} है।`,
      en: `${synergyEn} ${dashaLineEn} A soul with ${moonQ.en} expressing through a ${form.palmShape} palm creates ${elementMatch ? "extraordinary self-awareness and focus" : "diverse capabilities and adaptability"}. Your life's main lesson: ${form.activeDasha === "Saturn" || form.doshas.includes("Shani Sade Sati") ? "Success through karma and patience" : form.activeDasha === "Jupiter" ? "Elevation through knowledge and service" : form.activeDasha === "Ketu" ? "Detachment and self-realization" : "Nurturing your talent and helping others"}.`,
    },
    remedies: {
      hi: `🌙 दशा उपाय: ${dashaRemedy.hi}। 🖐️ हस्त उपाय: ${palmRemedy.hi}। ${form.doshas.includes("Mangal Dosha") ? "🔴 मंगल शांति: हनुमान चालीसा का पाठ करें और मंगलवार को लाल वस्त्र धारण करें। " : ""}${form.doshas.includes("Kalsarp Dosha") ? "🐍 कालसर्प शांति: नागपंचमी पर नागपूजा करें। " : ""}${form.doshas.includes("Pitra Dosha") ? "🙏 पितृ शांति: अमावस्या पर तर्पण करें। " : ""}सुबह उठकर दोनों हाथों की रेखाओं को देखें और ईश्वर का स्मरण करें — यह सरल उपाय मन को सकारात्मक रखता है।`,
      en: `🌙 Dasha remedy: ${dashaRemedy.en}. 🖐️ Palm remedy: ${palmRemedy.en}. ${form.doshas.includes("Mangal Dosha") ? "🔴 Mangal peace: Recite Hanuman Chalisa, wear red on Tuesdays. " : ""}${form.doshas.includes("Kalsarp Dosha") ? "🐍 Kalsarp peace: Worship Naga on Nagpanchami. " : ""}${form.doshas.includes("Pitra Dosha") ? "🙏 Pitra peace: Perform Tarpan on Amavasya. " : ""}Each morning, look at your palm lines and remember the divine — this simple practice keeps the mind positive.`,
    },
  };
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function SelectField({
  label,
  value,
  onChange,
  options,
  ocid,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; hi: string; en: string }[];
  ocid: string;
}) {
  const { language } = useLanguage();
  return (
    <div className="space-y-1">
      <Label
        className="text-xs font-medium"
        style={{ color: "oklch(0.78 0.14 75)" }}
      >
        {label}
      </Label>
      <select
        className="w-full px-3 py-2 rounded-lg text-sm border outline-none focus:ring-2 focus:ring-[oklch(0.78_0.14_75/0.4)]"
        style={{
          background: "oklch(0.22 0.07 22)",
          borderColor: "oklch(0.78 0.14 75 / 0.3)",
          color: "oklch(0.88 0.06 75)",
        }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-ocid={ocid}
      >
        <option value="">{language === "hi" ? "चुनें..." : "Select..."}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {language === "hi" ? o.hi : o.en}
          </option>
        ))}
      </select>
    </div>
  );
}

function StrengthSelector({
  label,
  value,
  onChange,
  ocid,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  ocid: string;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-xs" style={{ color: "oklch(0.78 0.14 75 / 0.8)" }}>
        {label}
      </Label>
      <div className="flex gap-1 flex-wrap" data-ocid={ocid}>
        {STRENGTHS.map((s) => (
          <button
            key={s.value}
            type="button"
            onClick={() => onChange(s.value)}
            className="px-2 py-1 rounded text-xs font-medium transition-all"
            style={{
              background:
                value === s.value
                  ? "oklch(0.68 0.20 48)"
                  : "oklch(0.22 0.07 22)",
              color: value === s.value ? "white" : "oklch(0.78 0.14 75 / 0.7)",
              border: `1px solid ${value === s.value ? "oklch(0.68 0.20 48)" : "oklch(0.78 0.14 75 / 0.2)"}`,
            }}
          >
            {s.en}
          </button>
        ))}
      </div>
    </div>
  );
}

function ReadingCard({
  reading,
  language,
}: { reading: GeneratedReading; language: "hi" | "en" }) {
  const sections = [
    {
      icon: "🪐",
      titleHi: "ग्रहों का प्रभाव",
      titleEn: "Planetary Influence",
      textHi: reading.planetaryInfluence.hi,
      textEn: reading.planetaryInfluence.en,
      color: "oklch(0.45 0.18 280)",
    },
    {
      icon: "🖐️",
      titleHi: "हस्त रेखाओं का संदेश",
      titleEn: "Palm Line Message",
      textHi: reading.palmMessage.hi,
      textEn: reading.palmMessage.en,
      color: "oklch(0.50 0.18 140)",
    },
    {
      icon: "✨",
      titleHi: "संयुक्त अंतर्दृष्टि",
      titleEn: "Combined Insight",
      textHi: reading.combinedInsight.hi,
      textEn: reading.combinedInsight.en,
      color: "oklch(0.55 0.20 48)",
    },
    {
      icon: "🌿",
      titleHi: "उपाय व सुझाव",
      titleEn: "Remedies & Guidance",
      textHi: reading.remedies.hi,
      textEn: reading.remedies.en,
      color: "oklch(0.50 0.16 165)",
    },
  ];

  return (
    <div className="space-y-4">
      {sections.map((s) => (
        <div
          key={s.titleEn}
          className="rounded-xl p-5 border"
          style={{
            background: `${s.color}20`,
            borderColor: `${s.color}40`,
          }}
          data-ocid={`combined_reading.section.${s.titleEn.toLowerCase().replace(/\s/g, "_")}`}
        >
          <h3
            className="font-heading font-bold text-base mb-3 flex items-center gap-2"
            style={{ color: s.color }}
          >
            <span>{s.icon}</span>
            {language === "hi" ? s.titleHi : s.titleEn}
          </h3>
          <p
            className="text-sm leading-relaxed font-body"
            style={{ color: "oklch(0.85 0.05 70)" }}
          >
            {language === "hi" ? s.textHi : s.textEn}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

const defaultForm: CombinedReadingForm = {
  birthDate: "",
  birthTime: "",
  birthPlace: "",
  lagnaSign: "",
  moonSign: "",
  sunSign: "",
  activeDasha: "",
  doshas: [],
  palmShape: "",
  dominantLine: "",
  heartLineStrength: "Medium",
  headLineStrength: "Medium",
  lifeLineStrength: "Strong",
  fateLineStrength: "Medium",
  palmDescription: "",
};

export default function CombinedVedicReading() {
  const { language } = useLanguage();
  const [form, setForm] = useState<CombinedReadingForm>(defaultForm);
  const [generatedReading, setGeneratedReading] =
    useState<GeneratedReading | null>(null);
  const [activeTab, setActiveTab] = useState("generate");

  const createReading = useCreateCombinedVedicReading();
  const { data: pastReadings = [], isLoading: loadingHistory } =
    useGetMyCombinedVedicReadings();

  const updateField = <K extends keyof CombinedReadingForm>(
    key: K,
    value: CombinedReadingForm[K],
  ) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const toggleDosha = (dosha: string) => {
    setForm((f) => ({
      ...f,
      doshas: f.doshas.includes(dosha)
        ? f.doshas.filter((d) => d !== dosha)
        : [...f.doshas, dosha],
    }));
  };

  const isFormReady =
    form.moonSign &&
    form.lagnaSign &&
    form.activeDasha &&
    form.palmShape &&
    form.dominantLine;

  const handleGenerate = () => {
    if (!isFormReady) {
      toast.error(
        language === "hi"
          ? "कृपया सभी ज़रूरी फ़ील्ड भरें"
          : "Please fill all required fields",
      );
      return;
    }
    const reading = generateCombinedReading(form);
    setGeneratedReading(reading);
    toast.success(
      language === "hi" ? "पाठन तैयार हो गया!" : "Reading generated!",
    );
  };

  const handleSave = async () => {
    if (!generatedReading) return;
    try {
      await createReading.mutateAsync({
        palmReadingId: `palm-${Date.now()}`,
        birthDate: form.birthDate,
        birthTime: form.birthTime,
        birthPlace: form.birthPlace,
        lagnaSign: form.lagnaSign,
        moonSign: form.moonSign,
        sunSign: form.sunSign,
        activeDasha: form.activeDasha,
        doshasJson: JSON.stringify(form.doshas),
        palmInsightsJson: JSON.stringify({
          shape: form.palmShape,
          dominantLine: form.dominantLine,
        }),
        combinedInsightsText: generatedReading.combinedInsight.en,
        remediesText: generatedReading.remedies.en,
      });
      toast.success(language === "hi" ? "पाठन सहेजा गया!" : "Reading saved!");
      setActiveTab("history");
    } catch {
      toast.error(language === "hi" ? "सहेजने में त्रुटि" : "Error saving reading");
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.13 0.05 20)" }}>
      {/* Hero */}
      <div
        className="relative py-16 px-4 text-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.10 20) 0%, oklch(0.18 0.08 28) 50%, oklch(0.22 0.10 20) 100%)",
        }}
        data-ocid="combined_vedic.hero"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none flex items-center justify-center text-[20rem] leading-none">
          🕉️
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <Badge
            className="mb-4 text-xs font-medium px-3 py-1"
            style={{
              background: "oklch(0.68 0.20 48 / 0.2)",
              color: "oklch(0.78 0.14 75)",
              border: "1px solid oklch(0.68 0.20 48 / 0.4)",
            }}
          >
            ✨{" "}
            {language === "hi" ? "संयुक्त वैदिक विश्लेषण" : "Combined Vedic Analysis"}
          </Badge>
          <h1
            className="font-decorative text-3xl md:text-5xl font-bold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {language === "hi"
              ? "संयुक्त वैदिक-हस्त रेखा पाठन"
              : "Combined Vedic-Palmistry Reading"}
          </h1>
          <p
            className="text-base font-body"
            style={{ color: "oklch(0.70 0.05 60)" }}
          >
            {language === "hi"
              ? "कुंडली और हस्तरेखा का अद्भुत संयोग — अपनी आत्मा का पूर्ण परिचय पाएं"
              : "The profound union of Kundali and Palmistry — discover the complete portrait of your soul"}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList
            className="mb-8 w-full grid grid-cols-2"
            style={{
              background: "oklch(0.20 0.07 22)",
              border: "1px solid oklch(0.78 0.14 75 / 0.2)",
            }}
          >
            <TabsTrigger
              value="generate"
              data-ocid="combined_vedic.generate_tab"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {language === "hi" ? "नया पाठन बनाएं" : "New Reading"}
            </TabsTrigger>
            <TabsTrigger
              value="history"
              data-ocid="combined_vedic.history_tab"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              <History className="h-4 w-4 mr-2" />
              {language === "hi" ? "पिछले पाठन" : "Past Readings"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left — Birth Chart */}
              <div className="space-y-6">
                {/* Section 1 */}
                <Card
                  className="rounded-xl border"
                  style={{
                    background: "oklch(0.18 0.07 22)",
                    borderColor: "oklch(0.78 0.14 75 / 0.2)",
                  }}
                  data-ocid="combined_vedic.birth_chart_section"
                >
                  <CardHeader className="pb-3">
                    <CardTitle
                      className="text-sm font-heading flex items-center gap-2"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      <Star className="h-4 w-4" />
                      {language === "hi" ? "१. जन्म विवरण" : "1. Birth Details"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label
                          className="text-xs"
                          style={{ color: "oklch(0.78 0.14 75)" }}
                        >
                          {language === "hi" ? "जन्म तिथि" : "Birth Date"}
                        </Label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 rounded-lg text-sm border outline-none"
                          style={{
                            background: "oklch(0.22 0.07 22)",
                            borderColor: "oklch(0.78 0.14 75 / 0.3)",
                            color: "oklch(0.88 0.06 75)",
                          }}
                          value={form.birthDate}
                          onChange={(e) =>
                            updateField("birthDate", e.target.value)
                          }
                          data-ocid="combined_vedic.birth_date_input"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label
                          className="text-xs"
                          style={{ color: "oklch(0.78 0.14 75)" }}
                        >
                          {language === "hi" ? "जन्म समय" : "Birth Time"}
                        </Label>
                        <input
                          type="time"
                          className="w-full px-3 py-2 rounded-lg text-sm border outline-none"
                          style={{
                            background: "oklch(0.22 0.07 22)",
                            borderColor: "oklch(0.78 0.14 75 / 0.3)",
                            color: "oklch(0.88 0.06 75)",
                          }}
                          value={form.birthTime}
                          onChange={(e) =>
                            updateField("birthTime", e.target.value)
                          }
                          data-ocid="combined_vedic.birth_time_input"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label
                        className="text-xs"
                        style={{ color: "oklch(0.78 0.14 75)" }}
                      >
                        {language === "hi" ? "जन्म स्थान" : "Birth Place"}
                      </Label>
                      <input
                        type="text"
                        placeholder={
                          language === "hi"
                            ? "जैसे: दिल्ली, भारत"
                            : "e.g. Delhi, India"
                        }
                        className="w-full px-3 py-2 rounded-lg text-sm border outline-none"
                        style={{
                          background: "oklch(0.22 0.07 22)",
                          borderColor: "oklch(0.78 0.14 75 / 0.3)",
                          color: "oklch(0.88 0.06 75)",
                        }}
                        value={form.birthPlace}
                        onChange={(e) =>
                          updateField("birthPlace", e.target.value)
                        }
                        data-ocid="combined_vedic.birth_place_input"
                      />
                    </div>
                    <SelectField
                      label={
                        language === "hi"
                          ? "लग्न / उदयराशि *"
                          : "Lagna / Ascendant *"
                      }
                      value={form.lagnaSign}
                      onChange={(v) => updateField("lagnaSign", v)}
                      options={ZODIAC_SIGNS}
                      ocid="combined_vedic.lagna_select"
                    />
                    <SelectField
                      label={language === "hi" ? "चंद्र राशि *" : "Moon Sign *"}
                      value={form.moonSign}
                      onChange={(v) => updateField("moonSign", v)}
                      options={ZODIAC_SIGNS}
                      ocid="combined_vedic.moon_sign_select"
                    />
                    <SelectField
                      label={language === "hi" ? "सूर्य राशि" : "Sun Sign"}
                      value={form.sunSign}
                      onChange={(v) => updateField("sunSign", v)}
                      options={ZODIAC_SIGNS}
                      ocid="combined_vedic.sun_sign_select"
                    />
                    <SelectField
                      label={
                        language === "hi" ? "सक्रिय दशा *" : "Active Dasha *"
                      }
                      value={form.activeDasha}
                      onChange={(v) => updateField("activeDasha", v)}
                      options={DASHA_OPTIONS}
                      ocid="combined_vedic.dasha_select"
                    />
                    <div className="space-y-2">
                      <Label
                        className="text-xs font-medium"
                        style={{ color: "oklch(0.78 0.14 75)" }}
                      >
                        {language === "hi" ? "सक्रिय दोष" : "Active Doshas"}
                      </Label>
                      <div
                        className="space-y-2"
                        data-ocid="combined_vedic.doshas_checkboxes"
                      >
                        {DOSHAS.map((d) => (
                          <div
                            key={d.value}
                            className="flex items-center gap-2"
                          >
                            <Checkbox
                              id={d.value}
                              checked={form.doshas.includes(d.value)}
                              onCheckedChange={() => toggleDosha(d.value)}
                              data-ocid={`combined_vedic.dosha_checkbox.${d.value.replace(/\s/g, "_")}`}
                            />
                            <label
                              htmlFor={d.value}
                              className="text-sm cursor-pointer"
                              style={{ color: "oklch(0.85 0.05 70)" }}
                            >
                              {language === "hi" ? d.hi : d.en}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Links */}
                <Card
                  className="rounded-xl border"
                  style={{
                    background: "oklch(0.18 0.07 22)",
                    borderColor: "oklch(0.68 0.20 48 / 0.3)",
                  }}
                >
                  <CardContent className="pt-4">
                    <p
                      className="text-xs font-body mb-3"
                      style={{ color: "oklch(0.70 0.05 60)" }}
                    >
                      {language === "hi"
                        ? "🔗 अपना प्रोफाइल बनाने के लिए:"
                        : "🔗 Build your complete profile:"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        {
                          to: "/palmistry",
                          icon: "🖐️",
                          hi: "हस्तरेखा",
                          en: "Palmistry",
                        },
                        {
                          to: "/horoscope",
                          icon: "🪐",
                          hi: "राशिफल",
                          en: "Horoscope",
                        },
                        {
                          to: "/vedic-dashboard",
                          icon: "📊",
                          hi: "वैदिक डैशबोर्ड",
                          en: "Vedic Dashboard",
                        },
                      ].map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:opacity-80"
                          style={{
                            background: "oklch(0.68 0.20 48 / 0.15)",
                            color: "oklch(0.78 0.14 75)",
                            border: "1px solid oklch(0.68 0.20 48 / 0.3)",
                          }}
                          data-ocid={`combined_vedic.quick_link.${link.en.toLowerCase().replace(/\s/g, "_")}`}
                        >
                          {link.icon} {language === "hi" ? link.hi : link.en}
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right — Palm Insights */}
              <div className="space-y-6">
                <Card
                  className="rounded-xl border"
                  style={{
                    background: "oklch(0.18 0.07 22)",
                    borderColor: "oklch(0.78 0.14 75 / 0.2)",
                  }}
                  data-ocid="combined_vedic.palm_section"
                >
                  <CardHeader className="pb-3">
                    <CardTitle
                      className="text-sm font-heading flex items-center gap-2"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      <Hand className="h-4 w-4" />
                      {language === "hi"
                        ? "२. हस्त रेखा विवरण"
                        : "2. Palm Insights"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {/* Palm Shape */}
                    <div className="space-y-2">
                      <Label
                        className="text-xs font-medium"
                        style={{ color: "oklch(0.78 0.14 75)" }}
                      >
                        {language === "hi" ? "हस्त आकार *" : "Palm Shape *"}
                      </Label>
                      <div
                        className="grid grid-cols-2 gap-2"
                        data-ocid="combined_vedic.palm_shape_selector"
                      >
                        {PALM_SHAPES.map((s) => (
                          <button
                            key={s.value}
                            type="button"
                            onClick={() => updateField("palmShape", s.value)}
                            className="flex items-center gap-2 p-3 rounded-xl text-sm font-medium transition-all text-left"
                            style={{
                              background:
                                form.palmShape === s.value
                                  ? "oklch(0.68 0.20 48 / 0.25)"
                                  : "oklch(0.22 0.07 22)",
                              border: `2px solid ${form.palmShape === s.value ? "oklch(0.68 0.20 48)" : "oklch(0.78 0.14 75 / 0.15)"}`,
                              color:
                                form.palmShape === s.value
                                  ? "oklch(0.88 0.06 75)"
                                  : "oklch(0.75 0.05 65)",
                            }}
                            data-ocid={`combined_vedic.palm_shape.${s.value}`}
                          >
                            <span className="text-2xl">{s.icon}</span>
                            <span>{language === "hi" ? s.hi : s.en}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <SelectField
                      label={
                        language === "hi" ? "प्रमुख रेखा *" : "Dominant Line *"
                      }
                      value={form.dominantLine}
                      onChange={(v) => updateField("dominantLine", v)}
                      options={DOMINANT_LINES}
                      ocid="combined_vedic.dominant_line_select"
                    />

                    {/* Line Strengths */}
                    <div className="space-y-3">
                      <Label
                        className="text-xs font-bold"
                        style={{ color: "oklch(0.78 0.14 75)" }}
                      >
                        {language === "hi" ? "रेखाओं की शक्ति" : "Line Strengths"}
                      </Label>
                      <StrengthSelector
                        label={language === "hi" ? "हृदय रेखा" : "Heart Line"}
                        value={form.heartLineStrength}
                        onChange={(v) => updateField("heartLineStrength", v)}
                        ocid="combined_vedic.heart_line_strength"
                      />
                      <StrengthSelector
                        label={language === "hi" ? "मस्तिष्क रेखा" : "Head Line"}
                        value={form.headLineStrength}
                        onChange={(v) => updateField("headLineStrength", v)}
                        ocid="combined_vedic.head_line_strength"
                      />
                      <StrengthSelector
                        label={language === "hi" ? "जीवन रेखा" : "Life Line"}
                        value={form.lifeLineStrength}
                        onChange={(v) => updateField("lifeLineStrength", v)}
                        ocid="combined_vedic.life_line_strength"
                      />
                      <StrengthSelector
                        label={language === "hi" ? "भाग्य रेखा" : "Fate Line"}
                        value={form.fateLineStrength}
                        onChange={(v) => updateField("fateLineStrength", v)}
                        ocid="combined_vedic.fate_line_strength"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label
                        className="text-xs"
                        style={{ color: "oklch(0.78 0.14 75)" }}
                      >
                        {language === "hi"
                          ? "हाथ का विस्तृत विवरण (वैकल्पिक)"
                          : "Palm Description (Optional)"}
                      </Label>
                      <Textarea
                        placeholder={
                          language === "hi"
                            ? "हाथ की विशेषताएं, विशेष चिन्ह, मोल आदि..."
                            : "Special features, marks, moles etc..."
                        }
                        className="resize-none text-sm"
                        style={{
                          background: "oklch(0.22 0.07 22)",
                          borderColor: "oklch(0.78 0.14 75 / 0.3)",
                          color: "oklch(0.88 0.06 75)",
                        }}
                        rows={3}
                        value={form.palmDescription}
                        onChange={(e) =>
                          updateField("palmDescription", e.target.value)
                        }
                        data-ocid="combined_vedic.palm_description_textarea"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={!isFormReady}
                  className="w-full h-14 text-base font-heading font-bold rounded-xl transition-all"
                  style={{
                    background: isFormReady
                      ? "linear-gradient(135deg, oklch(0.65 0.22 35), oklch(0.58 0.20 28))"
                      : "oklch(0.30 0.05 22)",
                    color: "white",
                    border: "none",
                  }}
                  data-ocid="combined_vedic.generate_button"
                >
                  <Zap className="h-5 w-5 mr-2" />
                  {language === "hi"
                    ? "संयुक्त पाठन तैयार करें"
                    : "Generate Combined Reading"}
                </Button>
              </div>
            </div>

            {/* Generated Reading */}
            {generatedReading && (
              <div className="mt-8" data-ocid="combined_reading.result">
                <div
                  className="rounded-2xl border p-6"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.17 0.06 25) 100%)",
                    borderColor: "oklch(0.78 0.14 75 / 0.35)",
                  }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2
                      className="font-decorative text-xl font-bold flex items-center gap-2"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      <Sparkles className="h-5 w-5" />
                      {language === "hi"
                        ? "आपका संयुक्त वैदिक-हस्त पाठन"
                        : "Your Combined Vedic-Palm Reading"}
                    </h2>
                    <Button
                      onClick={handleSave}
                      disabled={createReading.isPending}
                      size="sm"
                      style={{
                        background: "oklch(0.68 0.20 48 / 0.2)",
                        color: "oklch(0.78 0.14 75)",
                        border: "1px solid oklch(0.68 0.20 48 / 0.4)",
                      }}
                      data-ocid="combined_vedic.save_button"
                    >
                      {createReading.isPending
                        ? "..."
                        : language === "hi"
                          ? "💾 सहेजें"
                          : "💾 Save"}
                    </Button>
                  </div>
                  <ReadingCard reading={generatedReading} language={language} />
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history">
            {loadingHistory ? (
              <div
                className="space-y-4"
                data-ocid="combined_vedic.loading_state"
              >
                {[1, 2, 3].map((i) => (
                  <Skeleton
                    key={i}
                    className="h-24 rounded-xl"
                    style={{ background: "oklch(0.20 0.07 22)" }}
                  />
                ))}
              </div>
            ) : pastReadings.length === 0 ? (
              <div
                className="text-center py-16 rounded-2xl border"
                style={{
                  background: "oklch(0.18 0.07 22)",
                  borderColor: "oklch(0.78 0.14 75 / 0.15)",
                }}
                data-ocid="combined_vedic.empty_state"
              >
                <BookOpen
                  className="h-12 w-12 mx-auto mb-4 opacity-30"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                />
                <h3
                  className="font-heading text-lg font-semibold mb-2"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {language === "hi" ? "कोई पाठन नहीं मिला" : "No readings yet"}
                </h3>
                <p
                  className="text-sm mb-4"
                  style={{ color: "oklch(0.60 0.04 55)" }}
                >
                  {language === "hi"
                    ? "अपना पहला संयुक्त पाठन बनाएं"
                    : "Create your first combined reading"}
                </p>
                <Button
                  onClick={() => setActiveTab("generate")}
                  style={{
                    background: "oklch(0.68 0.20 48 / 0.2)",
                    color: "oklch(0.78 0.14 75)",
                    border: "1px solid oklch(0.68 0.20 48 / 0.4)",
                  }}
                  data-ocid="combined_vedic.create_first_button"
                >
                  {language === "hi" ? "नया पाठन बनाएं" : "Create New Reading"}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {pastReadings.map((r, i) => (
                  <div
                    key={r.id}
                    className="rounded-xl border p-5"
                    style={{
                      background: "oklch(0.18 0.07 22)",
                      borderColor: "oklch(0.78 0.14 75 / 0.2)",
                    }}
                    data-ocid={`combined_vedic.history_item.${i + 1}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p
                          className="font-heading font-semibold text-sm"
                          style={{ color: "oklch(0.78 0.14 75)" }}
                        >
                          {r.moonSign}{" "}
                          {language === "hi" ? "चंद्र राशि" : "Moon Sign"} •{" "}
                          {r.lagnaSign}{" "}
                          {language === "hi" ? "लग्न" : "Ascendant"}
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: "oklch(0.60 0.04 55)" }}
                        >
                          {r.activeDasha} Dasha •{" "}
                          {new Date(
                            Number(r.createdAt) / 1_000_000,
                          ).toLocaleDateString("en-IN")}
                        </p>
                      </div>
                      <Badge
                        style={{
                          background: "oklch(0.68 0.20 48 / 0.15)",
                          color: "oklch(0.78 0.14 75)",
                          border: "1px solid oklch(0.68 0.20 48 / 0.3)",
                        }}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        {language === "hi" ? "संयुक्त" : "Combined"}
                      </Badge>
                    </div>
                    <p
                      className="text-xs leading-relaxed line-clamp-3"
                      style={{ color: "oklch(0.75 0.04 60)" }}
                    >
                      {r.combinedInsightsText}
                    </p>
                    {r.remediesText && (
                      <p
                        className="text-xs mt-2 leading-relaxed line-clamp-2"
                        style={{ color: "oklch(0.65 0.10 140)" }}
                      >
                        🌿 {r.remediesText}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
