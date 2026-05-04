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

  // Common actions
  submit: { en: "Submit", hi: "जमा करें" },
  cancel: { en: "Cancel", hi: "रद्द करें" },
  save: { en: "Save", hi: "सहेजें" },
  edit: { en: "Edit", hi: "संपादित करें" },
  delete: { en: "Delete", hi: "हटाएं" },
  add: { en: "Add", hi: "जोड़ें" },
  reset: { en: "Reset", hi: "रीसेट करें" },
  calculate: { en: "Calculate", hi: "गणना करें" },
  share: { en: "Share", hi: "साझा करें" },
  download: { en: "Download", hi: "डाउनलोड करें" },
  loadMore: { en: "Load More", hi: "और लोड करें" },
  consult: { en: "Consult Expert", hi: "विशेषज्ञ से परामर्श" },
  inStockOnly: { en: "In Stock Only", hi: "केवल उपलब्ध" },
  outOfStock: { en: "Out of Stock", hi: "स्टॉक में नहीं" },
  maxPrice: { en: "Max price", hi: "अधिकतम मूल्य" },
  products: { en: "products", hi: "उत्पाद" },
  product: { en: "product", hi: "उत्पाद" },

  // Shop sub-categories
  frames: { en: "Frames", hi: "फ्रेम्स" },
  yantrasShop: { en: "Yantras", hi: "यंत्र" },
  shivling: { en: "Shivling", hi: "शिवलिंग" },
  bellsDiyas: { en: "Bells & Diyas", hi: "घंटी और दीये" },
  statues: { en: "Statues", hi: "मूर्तियाँ" },
  mala: { en: "Mala", hi: "माला" },
  pujaEssentials: { en: "Puja Essentials", hi: "पूजा सामग्री" },
  gemstonesShop: { en: "Gemstones", hi: "रत्न" },
  bracelets: { en: "Bracelets", hi: "ब्रेसलेट" },
  rings: { en: "Rings", hi: "अंगूठी" },
  noProductsFound: { en: "No products found", hi: "कोई उत्पाद नहीं मिला" },
  tryAdjustFilters: {
    en: "Try adjusting your filters or search query.",
    hi: "अपने फ़िल्टर या खोज को बदलें।",
  },
  resetFilters: { en: "Reset Filters", hi: "फ़िल्टर रीसेट करें" },
  browseByCategory: { en: "Browse by Category", hi: "श्रेणी द्वारा ब्राउज़ करें" },
  clearCategoryFilter: {
    en: "× Clear category filter",
    hi: "× श्रेणी फ़िल्टर हटाएं",
  },
  searchProducts: { en: "Search products, codes…", hi: "उत्पाद, कोड खोजें…" },
  addToCartAction: { en: "Add to Cart", hi: "कार्ट में डालें" },
  personalised: { en: "Personalised", hi: "व्यक्तिगत" },

  // Content filters
  byDeity: { en: "By Deity", hi: "देवता द्वारा" },
  byFaith: { en: "By Faith", hi: "धर्म द्वारा" },
  byCategory: { en: "By Category", hi: "श्रेणी द्वारा" },
  readStotra: { en: "Read Stotra", hi: "स्तोत्र पढ़ें" },
  backToStotras: { en: "Back to Stotras", hi: "स्तोत्र सूची" },
  noStotrasFound: { en: "No stotras found", hi: "कोई स्तोत्र नहीं मिला" },
  tryDifferentSearch: {
    en: "Try a different search or filter",
    hi: "अलग खोज या फ़िल्टर आज़माएं",
  },
  showing: { en: "Showing", hi: "दिखा रहे हैं" },
  of: { en: "of", hi: "में से" },
  stotras: { en: "stotras", hi: "स्तोत्र" },
  searchByTitleOrDeity: {
    en: "Search by title or deity...",
    hi: "शीर्षक या देवता से खोजें...",
  },

  // Chakra Assessment
  chakraAssessment: { en: "Chakra Assessment", hi: "चक्र आकलन" },
  chakraSubtitle: {
    en: "Discover Your Energy Balance · 7 Chakras · 49 Questions",
    hi: "अपनी ऊर्जा संतुलन जानें · 7 चक्र · 49 प्रश्न",
  },
  beginAssessment: { en: "Begin Assessment ✨", hi: "आकलन शुरू करें ✨" },
  question: { en: "Question", hi: "प्रश्न" },
  complete: { en: "complete", hi: "पूर्ण" },
  yourChakraReport: { en: "Your Chakra Report", hi: "आपकी चक्र रिपोर्ट" },
  energyBalanceResult: {
    en: "Based on your answers, here is your energy balance",
    hi: "आपके उत्तरों के आधार पर, यहाँ आपका ऊर्जा संतुलन है",
  },
  healingRecommendations: { en: "Healing Recommendations", hi: "उपचार सुझाव" },
  allChakrasBalanced: {
    en: "All chakras are well balanced!",
    hi: "सभी चक्र अच्छी तरह संतुलित हैं!",
  },
  takeAssessmentAgain: { en: "Take Assessment Again", hi: "फिर से आकलन करें" },
  balanced: { en: "Balanced ✓", hi: "संतुलित ✓" },
  moderate: { en: "Moderate", hi: "मध्यम" },
  needsHealing: { en: "Needs Healing", hi: "उपचार आवश्यक" },
  auspicious: { en: "Auspicious", hi: "शुभ" },
  inauspicious: { en: "Inauspicious", hi: "अशुभ" },
  neutral: { en: "Neutral", hi: "सामान्य" },

  // Puja Booking
  upcomingEvents: { en: "Upcoming Events", hi: "आगामी कार्यक्रम" },
  bookPujaTitle: { en: "Puja Booking", hi: "पूजा बुकिंग" },
  selectPuja: { en: "Select Puja", hi: "पूजा चुनें" },
  templeAndDate: { en: "Temple & Date", hi: "मंदिर और तिथि" },
  devoteeDetails: { en: "Devotee Details", hi: "भक्त विवरण" },
  daanAndSankalp: { en: "Daan & Sankalp", hi: "दान और संकल्प" },
  reviewAndBook: { en: "Review & Book", hi: "समीक्षा और बुकिंग" },
  fullName: { en: "Full Name *", hi: "पूरा नाम *" },
  gotra: { en: "Gotra", hi: "गोत्र" },
  mobileNumber: { en: "Mobile Number", hi: "मोबाइल नंबर" },
  emailConfirm: { en: "Email (for confirmation)", hi: "ईमेल (पुष्टि हेतु)" },
  howManyPeople: { en: "How many people?", hi: "कितने लोग?" },
  daanAmount: { en: "Daan Amount (Optional)", hi: "दान राशि (वैकल्पिक)" },
  sankalp: {
    en: "Sankalp — Your Prayer & Wish",
    hi: "संकल्प — आपकी प्रार्थना और मनोकामना",
  },
  specialRequests: { en: "Special Requests", hi: "विशेष निवेदन" },
  bookingHistory: { en: "Booking History", hi: "बुकिंग इतिहास" },
  noBookings: { en: "No bookings yet", hi: "अभी तक कोई बुकिंग नहीं" },

  // Holy Books & Temple Directory
  filterByFaith: { en: "Filter by Faith", hi: "धर्म द्वारा फ़िल्टर" },
  filterByState: { en: "Filter by State", hi: "राज्य द्वारा फ़िल्टर" },
  filterByDeity: { en: "Filter by Deity", hi: "देवता द्वारा फ़िल्टर" },
  visitingHours: { en: "Visiting Hours", hi: "दर्शन समय" },
  readFullText: { en: "Read Full Text", hi: "पूरा पाठ पढ़ें" },
  holyBooksOverview: { en: "Holy Books", hi: "पवित्र ग्रंथ" },

  // Calculators
  lifePathNumber: { en: "Life Path Number", hi: "जीवन पथ संख्या" },
  destinyNumber: { en: "Destiny Number", hi: "भाग्य संख्या" },
  nameNumber: { en: "Name Number", hi: "नाम संख्या" },
  luckyNumber: { en: "Lucky Number", hi: "भाग्यशाली संख्या" },
  luckyColor: { en: "Lucky Color", hi: "भाग्यशाली रंग" },
  luckyGemstone: { en: "Lucky Gemstone", hi: "भाग्यशाली रत्न" },
  birthChart: { en: "Birth Chart", hi: "जन्म कुंडली" },
  ascendant: { en: "Ascendant", hi: "लग्न" },
  moonSign: { en: "Moon Sign", hi: "चंद्र राशि" },
  sunSign: { en: "Sun Sign", hi: "सूर्य राशि" },
  planetaryPositions: { en: "Planetary Positions", hi: "ग्रह स्थिति" },
  houseAnalysis: { en: "House Analysis", hi: "भाव विश्लेषण" },
  dashaPeriod: { en: "Dasha Period", hi: "दशा काल" },
  rootChakra: { en: "Root Chakra", hi: "मूलाधार चक्र" },
  sacralChakra: { en: "Sacral Chakra", hi: "स्वाधिष्ठान चक्र" },
  solarPlexusChakra: { en: "Solar Plexus Chakra", hi: "मणिपुर चक्र" },
  heartChakra: { en: "Heart Chakra", hi: "अनाहत चक्र" },
  throatChakra: { en: "Throat Chakra", hi: "विशुद्ध चक्र" },
  thirdEyeChakra: { en: "Third Eye Chakra", hi: "आज्ञा चक्र" },
  crownChakra: { en: "Crown Chakra", hi: "सहस्रार चक्र" },
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
