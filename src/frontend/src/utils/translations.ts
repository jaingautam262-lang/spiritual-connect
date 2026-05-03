/**
 * translations.ts
 * Unified language utilities for Spiritual Connect.
 * Provides LanguageKey, TranslationMap, useLanguage hook, and t() function.
 *
 * The primary language state lives in contexts/LanguageContext.tsx (the full
 * React context). This module re-exports the hook from there so consumers can
 * import from a single place, and also exposes a standalone t() helper that
 * works outside of React (e.g. in plain utility functions).
 */

export type LanguageKey = "en" | "hi";

export interface TranslationEntry {
  en: string;
  hi: string;
}

export type TranslationMap = Record<string, TranslationEntry>;

// ─── Core translations dictionary ─────────────────────────────────────────────
export const translations: TranslationMap = {
  // Navigation
  home: { en: "Home", hi: "मुखपृष्ठ" },
  shop: { en: "Shop", hi: "दुकान" },
  panchang: { en: "Panchang", hi: "पंचांग" },
  numerology: { en: "Numerology", hi: "अंकशास्त्र" },
  astrology: { en: "Astrology", hi: "ज्योतिष" },
  stotra: { en: "Stotras", hi: "स्तोत्र" },
  aarti: { en: "Aartis", hi: "आरती" },
  chalisa: { en: "Chalisas", hi: "चालीसा" },
  mantra: { en: "Mantras", hi: "मंत्र" },
  temples: { en: "Temples", hi: "मंदिर" },
  holyBooks: { en: "Holy Books", hi: "धर्मग्रंथ" },
  herbs: { en: "Herb Directory", hi: "जड़ी बूटी" },
  danSeva: { en: "Dan Seva", hi: "दान सेवा" },
  search: { en: "Search", hi: "खोजें" },
  login: { en: "Login", hi: "लॉगिन" },
  logout: { en: "Logout", hi: "लॉगआउट" },
  dashboard: { en: "Dashboard", hi: "डैशबोर्ड" },
  admin: { en: "Admin", hi: "व्यवस्थापक" },

  // Additional nav keys used in Layout.tsx
  kavach: { en: "Kavach", hi: "कवच" },
  ashtakam: { en: "Ashtakam", hi: "अष्टकम" },
  stuti: { en: "Stuti", hi: "स्तुति" },
  sahasranam: { en: "Sahasranam", hi: "सहस्रनाम" },
  navgrahMantra: {
    en: "Navgrah Mantra (108/1008)",
    hi: "नवग्रह मूल मंत्र (108/1008)",
  },
  energizedProducts: { en: "Energized Products", hi: "ऊर्जित उत्पाद" },
  more: { en: "More", hi: "और" },

  // Auth
  connecting: { en: "Connecting...", hi: "जोड़ रहे हैं..." },

  // Common UI
  explore: { en: "Explore", hi: "जानें" },
  viewAll: { en: "View All", hi: "सभी देखें" },
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

  // Footer
  allRightsReserved: { en: "All rights reserved.", hi: "सर्वाधिकार सुरक्षित।" },
  builtWith: { en: "Built with", hi: "निर्मित" },
  using: { en: "using", hi: "द्वारा" },

  // Spiritual categories
  hindu: { en: "Hindu", hi: "हिन्दू" },
  jain: { en: "Jain", hi: "जैन" },
  sikh: { en: "Sikh", hi: "सिख" },
  faith: { en: "Faith", hi: "धर्म" },
  deity: { en: "Deity", hi: "देवता" },
  category: { en: "Category", hi: "श्रेणी" },
};

// ─── Standalone t() function ───────────────────────────────────────────────────
/**
 * Translate a key to the given language.
 * Falls back to the key string if not found.
 *
 * @example
 *   t("home", "hi")  // "मुखपृष्ठ"
 *   t("home", "en")  // "Home"
 */
export function t(key: string, lang: LanguageKey): string {
  const entry = translations[key];
  if (!entry) return key;
  return lang === "en" ? entry.en : entry.hi;
}

// ─── useLanguage hook re-export ────────────────────────────────────────────────
// The actual React context lives in contexts/LanguageContext.tsx.
// Re-export here so pages can import from either location.
export { useLanguage } from "../contexts/LanguageContext";

// Legacy typed t() for backward-compat with calculator pages
export type TranslationKey =
  | "nav.aarti"
  | "nav.chalisa"
  | "nav.mantra"
  | "nav.stotra"
  | "nav.kavach"
  | "nav.ashtakam"
  | "nav.stuti"
  | "nav.sahasranama"
  | "nav.bhajan"
  | "nav.blog"
  | "nav.temple"
  | "nav.astrology"
  | "nav.shop"
  | "nav.numerology"
  | "nav.more"
  | "nav.search"
  | "nav.login"
  | "nav.logout"
  | "ui.search"
  | "ui.filter"
  | "ui.category"
  | "ui.deity"
  | "ui.language"
  | "ui.faith"
  | "ui.all"
  | "ui.hindu"
  | "ui.jain"
  | "ui.sikh"
  | "ui.read"
  | "ui.back"
  | "ui.loading"
  | "ui.noResults"
  | "ui.benefits"
  | "ui.meaning"
  | "ui.text"
  | "ui.occasions"
  | "ui.repetitions"
  | "ui.bestTime"
  | "ui.deityBlessings"
  | "ui.significance"
  | "ui.originalScript"
  | "ui.roman"
  | "ui.english"
  | "ui.connecting"
  | "calculator.calculate"
  | "calculator.yourName"
  | "calculator.enterName"
  | "calculator.gender"
  | "calculator.selectGender"
  | "calculator.male"
  | "calculator.female"
  | "calculator.other"
  | "calculator.dateOfBirth"
  | "calculator.day"
  | "calculator.month"
  | "calculator.year"
  | "calculator.timeOfBirth"
  | "calculator.dontKnowTime"
  | "calculator.hour"
  | "calculator.minute"
  | "calculator.second"
  | "calculator.placeOfBirth"
  | "calculator.enterPlace"
  | "calculator.results"
  | "calculator.exportPdf"
  | "calculator.calculating"
  | "calculator.discoverMore"
  | "calculator.readyToUnlock"
  | "calculator.exploreCalculators"
  | "calculator.spiritualConnectStore"
  | "calculator.storeDesc"
  | "calculator.plusMore"
  | "calculator.plusMoreDesc"
  | "calculator.faqs"
  | "calculator.partnerName"
  | "calculator.enterPartnerName"
  | "calculator.viewResults"
  | "calculator.compatibility"
  | "calculator.yourResult"
  | "calculator.learnMore"
  | "calculator.moonPhase"
  | "calculator.currentMoonPhase"
  | "calculator.birthMoonPhase"
  | "calculator.kaalSarpDosh"
  | "calculator.doshPresent"
  | "calculator.doshAbsent"
  | "calculator.dasha"
  | "calculator.currentDasha"
  | "calculator.dashaEnd"
  | "calculator.flames"
  | "calculator.flamesResult"
  | "calculator.yourName.label"
  | "calculator.generatedOn";

const typedTranslations: Record<TranslationKey, { hi: string; en: string }> = {
  "nav.aarti": { hi: "Aarti", en: "Aarti" },
  "nav.chalisa": { hi: "Chalisa", en: "Chalisa" },
  "nav.mantra": { hi: "Mantra", en: "Mantra" },
  "nav.stotra": { hi: "Stotra", en: "Stotra" },
  "nav.kavach": { hi: "Kavach", en: "Kavach" },
  "nav.ashtakam": { hi: "Ashtakam", en: "Ashtakam" },
  "nav.stuti": { hi: "Stuti", en: "Stuti" },
  "nav.sahasranama": { hi: "Sahasranama", en: "Sahasranama" },
  "nav.bhajan": { hi: "Bhajan", en: "Bhajan" },
  "nav.blog": { hi: "Blog", en: "Blog" },
  "nav.temple": { hi: "Temple", en: "Temple" },
  "nav.astrology": { hi: "Astrology", en: "Astrology" },
  "nav.shop": { hi: "Shop", en: "Shop" },
  "nav.numerology": { hi: "Numerology", en: "Numerology" },
  "nav.more": { hi: "अधिक", en: "More" },
  "nav.search": { hi: "खोज", en: "Search" },
  "nav.login": { hi: "लॉगिन", en: "Login" },
  "nav.logout": { hi: "लॉगआउट", en: "Logout" },
  "ui.search": { hi: "खोज", en: "Search" },
  "ui.filter": { hi: "फ़िल्टर", en: "Filter" },
  "ui.category": { hi: "श्रेणी", en: "Category" },
  "ui.deity": { hi: "देवता", en: "Deity" },
  "ui.language": { hi: "भाषा", en: "Language" },
  "ui.faith": { hi: "धर्म", en: "Faith" },
  "ui.all": { hi: "सभी", en: "All" },
  "ui.hindu": { hi: "हिंदू", en: "Hindu" },
  "ui.jain": { hi: "जैन", en: "Jain" },
  "ui.sikh": { hi: "सिख", en: "Sikh" },
  "ui.read": { hi: "पढ़ें", en: "Read" },
  "ui.back": { hi: "वापस", en: "Back" },
  "ui.loading": { hi: "लोड हो रहा है...", en: "Loading..." },
  "ui.noResults": { hi: "कोई परिणाम नहीं मिला", en: "No results found" },
  "ui.benefits": { hi: "लाभ एवं महत्व", en: "Benefits & Significance" },
  "ui.meaning": { hi: "अर्थ", en: "Meaning" },
  "ui.text": { hi: "पाठ", en: "Text" },
  "ui.occasions": { hi: "अवसर", en: "Occasions" },
  "ui.repetitions": { hi: "जप संख्या", en: "Repetitions" },
  "ui.bestTime": { hi: "सर्वश्रेष्ठ समय", en: "Best Time" },
  "ui.deityBlessings": { hi: "देवता कृपा", en: "Deity Blessings" },
  "ui.significance": { hi: "महत्व", en: "Significance" },
  "ui.originalScript": { hi: "मूल लिपि", en: "Original" },
  "ui.roman": { hi: "रोमन", en: "Roman" },
  "ui.english": { hi: "अंग्रेज़ी", en: "English" },
  "ui.connecting": { hi: "जोड़ रहे हैं...", en: "Connecting..." },
  "calculator.calculate": { en: "Calculate", hi: "गणना करें" },
  "calculator.yourName": { en: "Your Name", hi: "आपका नाम" },
  "calculator.enterName": { en: "Enter your name", hi: "अपना नाम दर्ज करें" },
  "calculator.gender": { en: "Gender", hi: "लिंग" },
  "calculator.selectGender": { en: "Select Gender", hi: "लिंग चुनें" },
  "calculator.male": { en: "Male", hi: "पुरुष" },
  "calculator.female": { en: "Female", hi: "महिला" },
  "calculator.other": { en: "Other", hi: "अन्य" },
  "calculator.dateOfBirth": { en: "Date of Birth", hi: "जन्म तिथि" },
  "calculator.day": { en: "Day", hi: "दिन" },
  "calculator.month": { en: "Month", hi: "महीना" },
  "calculator.year": { en: "Year", hi: "वर्ष" },
  "calculator.timeOfBirth": { en: "Time of Birth", hi: "जन्म समय" },
  "calculator.dontKnowTime": {
    en: "I don't know my time of birth",
    hi: "मुझे अपना जन्म समय नहीं पता",
  },
  "calculator.hour": { en: "Hour", hi: "घंटा" },
  "calculator.minute": { en: "Minute", hi: "मिनट" },
  "calculator.second": { en: "Second", hi: "सेकंड" },
  "calculator.placeOfBirth": { en: "Place of Birth", hi: "जन्म स्थान" },
  "calculator.enterPlace": {
    en: "Enter your birth place",
    hi: "अपना जन्म स्थान दर्ज करें",
  },
  "calculator.results": { en: "Your Results", hi: "आपके परिणाम" },
  "calculator.exportPdf": { en: "Export as PDF", hi: "PDF में सहेजें" },
  "calculator.calculating": { en: "Calculating...", hi: "गणना हो रही है..." },
  "calculator.discoverMore": {
    en: "Discover More About Yourself",
    hi: "अपने बारे में और जानें",
  },
  "calculator.readyToUnlock": {
    en: "Ready to unlock deeper insights?",
    hi: "गहरी अंतर्दृष्टि अनलॉक करने के लिए तैयार हैं?",
  },
  "calculator.exploreCalculators": {
    en: "Explore our personalized calculators that reveal hidden aspects of your personality and destiny.",
    hi: "हमारे व्यक्तिगत कैलकुलेटर खोजें जो आपके व्यक्तित्व और भाग्य के छुपे पहलुओं को उजागर करते हैं।",
  },
  "calculator.spiritualConnectStore": {
    en: "Spiritual Connect Store",
    hi: "स्पिरिचुअल कनेक्ट स्टोर",
  },
  "calculator.storeDesc": {
    en: "Browse our spiritual marketplace featuring sacred idols, evil eye protection, Rudraksha beads, healing crystals, spiritual gifting & decor, Pooja essentials, love items, and zodiac collection to support your spiritual journey.",
    hi: "हमारे आध्यात्मिक बाजार में पवित्र मूर्तियां, बुरी नज़र से सुरक्षा, रुद्राक्ष, हीलिंग क्रिस्टल, आध्यात्मिक उपहार, पूजा सामग्री और राशि संग्रह देखें।",
  },
  "calculator.plusMore": { en: "Plus Much More", hi: "और भी बहुत कुछ" },
  "calculator.plusMoreDesc": {
    en: "Compatibility calculators, birth chart generators, and personality assessments await your discovery.",
    hi: "संगतता कैलकुलेटर, जन्म कुंडली जनरेटर, और व्यक्तित्व मूल्यांकन आपकी खोज की प्रतीक्षा कर रहे हैं।",
  },
  "calculator.faqs": {
    en: "Frequently Asked Questions",
    hi: "अक्सर पूछे जाने वाले प्रश्न",
  },
  "calculator.partnerName": { en: "Partner's Name", hi: "पार्टनर का नाम" },
  "calculator.enterPartnerName": {
    en: "Enter partner's name",
    hi: "पार्टनर का नाम दर्ज करें",
  },
  "calculator.viewResults": { en: "View Results", hi: "परिणाम देखें" },
  "calculator.compatibility": { en: "Compatibility", hi: "अनुकूलता" },
  "calculator.yourResult": { en: "Your Result", hi: "आपका परिणाम" },
  "calculator.learnMore": { en: "Learn More", hi: "अधिक जानें" },
  "calculator.moonPhase": { en: "Moon Phase", hi: "चंद्र चरण" },
  "calculator.currentMoonPhase": {
    en: "Current Moon Phase",
    hi: "वर्तमान चंद्र चरण",
  },
  "calculator.birthMoonPhase": { en: "Birth Moon Phase", hi: "जन्म चंद्र चरण" },
  "calculator.kaalSarpDosh": { en: "Kaal Sarp Dosh", hi: "काल सर्प दोष" },
  "calculator.doshPresent": { en: "Dosh Present", hi: "दोष उपस्थित" },
  "calculator.doshAbsent": { en: "No Dosh Detected", hi: "कोई दोष नहीं" },
  "calculator.dasha": { en: "Dasha", hi: "दशा" },
  "calculator.currentDasha": { en: "Current Dasha", hi: "वर्तमान दशा" },
  "calculator.dashaEnd": { en: "Dasha Ends", hi: "दशा समाप्ति" },
  "calculator.flames": { en: "FLAMES", hi: "फ्लेम्स" },
  "calculator.flamesResult": {
    en: "Your FLAMES Result",
    hi: "आपका FLAMES परिणाम",
  },
  "calculator.yourName.label": { en: "Name", hi: "नाम" },
  "calculator.generatedOn": { en: "Generated on", hi: "उत्पन्न तिथि" },
};

/**
 * Typed translate for calculator pages (backward compat).
 */
export function tTyped(key: TranslationKey, lang: "hi" | "en"): string {
  return typedTranslations[key]?.[lang] ?? typedTranslations[key]?.en ?? key;
}

export default typedTranslations;
