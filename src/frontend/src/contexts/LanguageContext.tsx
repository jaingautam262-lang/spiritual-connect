// Named import only — avoids any ambiguity about which React instance is used.
// createContext is called at module level which is safe because this file is
// always imported AFTER react is registered (main.tsx imports React first).
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";

export type Language = "hi" | "en";
export type ScriptMode = "devanagari" | "transliteration" | "english";

interface LanguageContextType {
  language: Language;
  scriptMode: ScriptMode;
  setLanguage: (lang: Language) => void;
  setScriptMode: (mode: ScriptMode) => void;
  t: (key: string) => string;
}

// ─── Translations ─────────────────────────────────────────────────────────────
export const translations: Record<string, { en: string; hi: string }> = {
  // Navigation — Main
  home: { en: "Home", hi: "होम" },
  aarti: { en: "Aarti", hi: "आरती" },
  chalisa: { en: "Chalisa", hi: "चालीसा" },
  mantra: { en: "Mantra", hi: "मंत्र" },
  stotra: { en: "Stotra", hi: "स्तोत्र" },
  kavach: { en: "Kavach", hi: "कवच" },
  ashtakam: { en: "Ashtakam", hi: "अष्टकम" },
  stuti: { en: "Stuti", hi: "स्तुति" },
  sahasranam: { en: "Sahasranam", hi: "सहस्रनाम" },
  navgrahMantra: {
    en: "Navgrah Mantra (108/1008)",
    hi: "नवग्रह मूल मंत्र (108/1008)",
  },
  energizedProducts: { en: "Energized Products", hi: "ऊर्जित उत्पाद" },

  // Navigation — New Pages
  guruDirectory: { en: "Guru Directory", hi: "गुरु निर्देशिका" },
  mehndi: { en: "Mehndi Collection", hi: "मेहंदी संग्रह" },
  paintingsGreetings: { en: "Paintings & Greetings", hi: "चित्र और शुभकामनाएं" },
  daanSeva: { en: "Daan & Seva", hi: "दान और सेवा" },
  gemstones: { en: "Gemstone Library", hi: "रत्न पुस्तकालय" },
  yantras: { en: "Yantra Library", hi: "यंत्र पुस्तकालय" },
  pujaBooking: { en: "Puja Booking", hi: "पूजा बुकिंग" },
  shadowPlanets: { en: "Shadow Planets", hi: "छाया ग्रह (राहु-केतु)" },
  divisionalCharts: { en: "Divisional Charts", hi: "विभाजन चार्ट" },
  tantraRemedies: { en: "Tantra Remedies", hi: "तंत्र उपाय" },
  templeDirectory: { en: "Temple Directory", hi: "मंदिर निर्देशिका" },

  // Navigation — Existing
  bhajan: { en: "Bhajan Library", hi: "भजन संग्रह" },
  vratKatha: { en: "Vrat Katha", hi: "व्रत कथा" },
  holyBooks: { en: "Holy Books", hi: "पवित्र ग्रंथ" },
  festivalCalendar: { en: "Festival Calendar", hi: "त्योहार कैलेंडर" },
  panchang: { en: "Panchang", hi: "पंचांग" },
  horoscope: { en: "Horoscope", hi: "राशिफल" },
  astrologer: { en: "Astrologer", hi: "ज्योतिषी" },
  shop: { en: "Sacred Shop", hi: "पवित्र दुकान" },
  temples: { en: "Temples", hi: "मंदिर" },
  dashboard: { en: "Dashboard", hi: "डैशबोर्ड" },
  admin: { en: "Admin", hi: "व्यवस्थापक" },
  about: { en: "About", hi: "परिचय" },
  more: { en: "More", hi: "और" },

  // Common UI
  explore: { en: "Explore", hi: "जानें" },
  viewAll: { en: "View All", hi: "सभी देखें" },
  search: { en: "Search", hi: "खोजें" },
  searchPlaceholder: {
    en: "Search by name, deity...",
    hi: "नाम, देवता से खोजें...",
  },
  filter: { en: "Filter", hi: "फ़िल्टर" },
  all: { en: "All", hi: "सभी" },
  hindi: { en: "Hindi", hi: "हिन्दी" },
  english: { en: "English", hi: "अंग्रेज़ी" },
  close: { en: "Close", hi: "बंद करें" },
  back: { en: "Back", hi: "वापस" },
  loading: { en: "Loading…", hi: "लोड हो रहा है…" },
  noResults: { en: "No results found", hi: "कोई परिणाम नहीं मिला" },
  readMore: { en: "Read More", hi: "और पढ़ें" },
  bookNow: { en: "Book Now", hi: "अभी बुक करें" },
  buyNow: { en: "Buy Now", hi: "अभी खरीदें" },
  addToCart: { en: "Add to Cart", hi: "कार्ट में डालें" },
  login: { en: "Login", hi: "लॉगिन" },
  logout: { en: "Logout", hi: "लॉगआउट" },
  connecting: { en: "Connecting...", hi: "जोड़ रहे हैं..." },

  // Content-specific
  readFullAarti: { en: "Read Full Aarti →", hi: "पूरी आरती पढ़ें →" },
  readFullChalisa: { en: "Read Full Chalisa →", hi: "पूरी चालीसा पढ़ें →" },
  readFullMantra: { en: "Read Full Mantra →", hi: "पूरा मंत्र पढ़ें →" },
  readFullStotra: { en: "Read Full Stotra →", hi: "पूरा स्तोत्र पढ़ें →" },
  originalScript: { en: "Original Script", hi: "मूल लिपि" },
  prakritAvailable: { en: "Prakrit script available", hi: "प्राकृत लिपि उपलब्ध" },
  gurmukhiAvailable: { en: "Gurmukhi available", hi: "ਗੁਰਮੁਖੀ ਉਪਲਬਧ" },
  noAartisFound: {
    en: "No aartis found for your search.",
    hi: "आपकी खोज के लिए कोई आरती नहीं मिली।",
  },
  noChalisasFound: {
    en: "No chalisas found for your search.",
    hi: "आपकी खोज के लिए कोई चालीसा नहीं मिली।",
  },
  noMantrasFound: {
    en: "No mantras found for your search.",
    hi: "आपकी खोज के लिए कोई मंत्र नहीं मिला।",
  },

  // Section headings — Home
  devotionalSangrah: { en: "Devotional Sangrah", hi: "भक्ति संग्रह" },
  devotionalSangrahSub: {
    en: "Complete Collection — Aarti · Chalisa · Mantra · Temples",
    hi: "भक्ति का संपूर्ण संग्रह — आरती · चालीसा · मंत्र · मंदिर",
  },
  devotionalContent: { en: "Devotional Content", hi: "भक्ति सामग्री" },
  devotionalContentSub: {
    en: "Immerse yourself in sacred music, stories, and scriptures",
    hi: "पवित्र संगीत, कहानियों और शास्त्रों में डूबें",
  },
  featuredTemples: { en: "Featured Temples", hi: "प्रमुख मंदिर" },
  featuredTemplesSub: {
    en: "Book pujas at India's most sacred temples",
    hi: "भारत के सबसे पवित्र मंदिरों में पूजा बुक करें",
  },
  viewAllTemples: { en: "View All 50+ Temples", hi: "सभी 50+ मंदिर देखें" },
  yourRashifal: { en: "Your Rashifal", hi: "आपका राशिफल" },
  yourRashifalSub: {
    en: "Select your zodiac sign for today's predictions",
    hi: "आज की भविष्यवाणी के लिए अपनी राशि चुनें",
  },
  sacredShop: { en: "Sacred Shop", hi: "पवित्र दुकान" },
  sacredShopSub: {
    en: "Energized gemstones, Rudraksha, yantras & Nav Grah murtis",
    hi: "ऊर्जित रत्न, रुद्राक्ष, यंत्र और नवग्रह मूर्तियाँ",
  },
  browseAllProducts: { en: "Browse All Products", hi: "सभी उत्पाद देखें" },
  whyChooseUs: {
    en: "Why Choose SpiritualConnect?",
    hi: "SpiritualConnect क्यों चुनें?",
  },
  whyChooseUsSub: {
    en: "Your trusted platform for all spiritual needs",
    hi: "आपकी सभी आध्यात्मिक जरूरतों के लिए आपका विश्वसनीय मंच",
  },
  newAdditions: { en: "New Additions", hi: "नई सुविधाएं" },
  newAdditionsSub: {
    en: "Gemstones · Yantra · Guru · Daan · Shadow Planets · Tantra",
    hi: "रत्न · यंत्र · गुरु · दान · छाया ग्रह · तंत्र",
  },
  beginJourney: {
    en: "Begin Your Spiritual Journey",
    hi: "अपनी आध्यात्मिक यात्रा शुरू करें",
  },
  beginJourneySub: {
    en: "Join thousands of devotees who have found peace, guidance, and blessings through SpiritualConnect.",
    hi: "हजारों भक्तों से जुड़ें जिन्होंने SpiritualConnect के माध्यम से शांति, मार्गदर्शन और आशीर्वाद पाया है।",
  },
  getStarted: { en: "Get Started", hi: "शुरू करें" },
  talkToAstrologer: { en: "Talk to Astrologer", hi: "ज्योतिषी से बात करें" },
  bookPuja: { en: "Book Puja", hi: "पूजा बुक करें" },
  yourCompleteCompanion: {
    en: "Your Complete Spiritual Companion",
    hi: "आपका संपूर्ण आध्यात्मिक साथी",
  },
  heroSubtitle: {
    en: "Book pujas at 50+ temples, consult astrologers, explore your kundli, and shop sacred items — all in one divine platform.",
    hi: "50+ मंदिरों में पूजा बुक करें, ज्योतिषियों से परामर्श करें, अपनी कुंडली जानें, और पवित्र वस्तुएं खरीदें — एक ही दिव्य मंच पर।",
  },

  // Astrology
  numerology: { en: "Numerology", hi: "अंकज्योतिष" },
  kundali: { en: "Kundali", hi: "कुंडली" },
  rashifal: { en: "Rashifal", hi: "राशिफल" },
  astroScore: { en: "AstroScore", hi: "एस्ट्रोस्कोर" },

  // Spiritual categories
  hindu: { en: "Hindu", hi: "हिन्दू" },
  jain: { en: "Jain", hi: "जैन" },
  sikh: { en: "Sikh", hi: "सिख" },
  faith: { en: "Faith", hi: "धर्म" },
  deity: { en: "Deity", hi: "देवता" },
  category: { en: "Category", hi: "श्रेणी" },

  // Footer
  allRightsReserved: { en: "All rights reserved.", hi: "सर्वाधिकार सुरक्षित।" },
  builtWith: { en: "Built with", hi: "निर्मित" },
  using: { en: "using", hi: "द्वारा" },
};

// ─── Context ──────────────────────────────────────────────────────────────────
// createContext is safe here because this module is always imported after
// react is initialized (vite.config.js consolidates all react-ecosystem
// packages into one "react-vendor" chunk to guarantee init order).
const LanguageContext = createContext<LanguageContextType>({
  language: "hi",
  scriptMode: "devanagari",
  setLanguage: () => {},
  setScriptMode: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      return (localStorage.getItem("sc-language") as Language) || "hi";
    } catch {
      return "hi";
    }
  });

  const [scriptMode, setScriptModeState] = useState<ScriptMode>(() => {
    try {
      return (localStorage.getItem("sc-script") as ScriptMode) || "devanagari";
    } catch {
      return "devanagari";
    }
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("sc-language", lang);
    } catch {}
  }, []);

  const setScriptMode = useCallback((mode: ScriptMode) => {
    setScriptModeState(mode);
    try {
      localStorage.setItem("sc-script", mode);
    } catch {}
  }, []);

  const t = useCallback(
    (key: string): string => {
      const entry = translations[key];
      if (!entry) return key;
      return language === "en" ? entry.en : entry.hi;
    },
    [language],
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-language", language);
    document.documentElement.setAttribute("data-script", scriptMode);
    // Apply font helper class to body for Devanagari / Gurmukhi rendering
    document.body.classList.remove("lang-hi", "lang-gu");
    if (language === "hi") {
      document.body.classList.add("lang-hi");
    }
  }, [language, scriptMode]);

  return (
    <LanguageContext.Provider
      value={{ language, scriptMode, setLanguage, setScriptMode, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
