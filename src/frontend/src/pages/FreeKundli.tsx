import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { Check, ChevronDown, ChevronUp, Star, X } from "lucide-react";
import { motion } from "motion/react";
import { type FormEvent, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";

const TRUST_BADGES = [
  { en: "100% Free", hi: "100% मुफ़्त", icon: "✨" },
  { en: "Accurate Vedic calculations", hi: "सटीक वैदिक गणना", icon: "🔭" },
  { en: "Instant generation", hi: "तुरंत जनरेशन", icon: "⚡" },
  { en: "Includes Krishna's guidance", hi: "कृष्ण का मार्गदर्शन", icon: "🪷" },
];

const KUNDLI_FEATURES = [
  {
    icon: "🌐",
    titleEn: "Birth Chart (Rashi Chakra)",
    titleHi: "जन्म कुंडली (राशि चक्र)",
    descEn:
      "Your complete D1 chart showing the positions of all planets across the 12 houses at the moment of your birth — the foundation of every Vedic reading.",
    descHi:
      "जन्म के समय सभी ग्रहों की 12 भावों में स्थिति दर्शाने वाली पूर्ण D1 कुंडली — प्रत्येक वैदिक पाठ की नींव।",
  },
  {
    icon: "⭐",
    titleEn: "Nakshatra Details",
    titleHi: "नक्षत्र विवरण",
    descEn:
      "Your janma nakshatra (birth star) with ruling deity, presiding planet, symbol, and pada — the lunar mansion that shapes your emotional blueprint.",
    descHi:
      "आपका जन्म नक्षत्र — स्वामी देवता, ग्रह, प्रतीक और पद के साथ — जो आपके भावनात्मक स्वभाव को आकार देता है।",
  },
  {
    icon: "🪐",
    titleEn: "Planetary Positions",
    titleHi: "ग्रह स्थिति",
    descEn:
      "Exact degree and sign of all 9 grahas — Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu — with aspects and house placements.",
    descHi:
      "9 ग्रहों की सटीक डिग्री और राशि — सूर्य, चंद्र, मंगल, बुध, गुरु, शुक्र, शनि, राहु और केतु — पहलुओं और भाव स्थान सहित।",
  },
  {
    icon: "🔄",
    titleEn: "Vimshottari Dasha",
    titleHi: "विंशोत्तरी दशा",
    descEn:
      "Your current planetary period (Mahadasha) and sub-period (Antardasha) — the 120-year cycle that times major life events.",
    descHi:
      "आपकी वर्तमान ग्रह महादशा और अंतर्दशा — 120 वर्षीय चक्र जो जीवन की प्रमुख घटनाओं का समय निर्धारित करता है।",
  },
  {
    icon: "🛡️",
    titleEn: "Doshas Analysis",
    titleHi: "दोष विश्लेषण",
    descEn:
      "Clear check for Manglik (Mangal) Dosha, Kaal Sarp Dosha, and Sade Sati — plus remedies rooted in dharma, not fear-based upsells.",
    descHi:
      "मांगलिक (मंगल) दोष, काल सर्प दोष और साढ़े साती की स्पष्ट जाँच — धर्म-आधारित उपाय सहित।",
  },
  {
    icon: "🪷",
    titleEn: "Krishna's Personalized Insights",
    titleHi: "कृष्ण की व्यक्तिगत अंतर्दृष्टि",
    descEn:
      "Your chart explained through the lens of the Bhagavad Gita — dharma, karma, and conscious choice-making alongside the astrological math.",
    descHi:
      "भगवद् गीता के दृष्टिकोण से आपकी कुंडली की व्याख्या — धर्म, कर्म और सचेत विकल्प निर्माण।",
  },
];

const KUNDLI_TYPES = [
  {
    badge: "Basic chart",
    nameEn: "Rashi Kundli (D1 Chart)",
    nameHi: "राशि कुंडली — आधार",
    subtitleEn: "राशि कुंडली — the foundation",
    subtitleHi: "समग्र व्यक्तित्व, करियर, स्वास्थ्य",
    descEn:
      "The primary birth chart showing planetary positions across 12 houses at birth. Used for overall personality, career, health, and life trajectory.",
    descHi:
      "जन्म के समय 12 भावों में ग्रहों की स्थिति दर्शाने वाली प्राथमिक कुंडली। समग्र व्यक्तित्व, करियर, स्वास्थ्य के लिए उपयोगी।",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    badge: "Marriage & soul",
    nameEn: "Navamsa Kundli (D9)",
    nameHi: "नवांश कुंडली — विवाह और धर्म",
    subtitleEn: "नवांश कुंडली — marriage & dharma",
    subtitleHi: "विवाह अनुकूलता, धर्म, ग्रहों की आंतरिक शक्ति",
    descEn:
      "The ninth-divisional chart — considered the soul of the horoscope. Primary tool for marriage compatibility, dharma, and inner strength of planets.",
    descHi:
      "नवम विभाग कुंडली — कुंडली की आत्मा मानी जाती है। विवाह अनुकूलता, धर्म और ग्रहों की आंतरिक शक्ति के लिए प्राथमिक उपकरण।",
    gradient: "from-accent/30 to-accent/10",
  },
  {
    badge: "Bhava-accurate",
    nameEn: "Chalit Kundli",
    nameHi: "चलित कुंडली — ग्रह पारगमन",
    subtitleEn: "चलित कुंडली — planetary transits",
    subtitleHi: "वास्तविक भाव स्वामित्व और वर्तमान पारगमन",
    descEn:
      "The movement-based chart showing planets in their actual houses (Bhava Chalit) — essential for accurate house lordship and current transit effects.",
    descHi:
      "ग्रहों को उनके वास्तविक भावों में दर्शाने वाली कुंडली — सटीक भाव स्वामित्व और वर्तमान पारगमन के लिए आवश्यक।",
    gradient: "from-chart-1/20 to-chart-1/5",
  },
];

const KEY_ELEMENTS = [
  { num: "12", labelEn: "Houses (Bhavas)", labelHi: "भाव" },
  { num: "12", labelEn: "Rashis (Signs)", labelHi: "राशियाँ" },
  { num: "27", labelEn: "Nakshatras", labelHi: "नक्षत्र" },
  { num: "9", labelEn: "Planets (Grahas)", labelHi: "ग्रह" },
  { num: "16", labelEn: "Divisional Charts", labelHi: "वर्ग कुंडलियाँ" },
  { num: "∞", labelEn: "Dashas", labelHi: "दशाएँ" },
  { num: "3+", labelEn: "Doshas", labelHi: "दोष" },
  { num: "300+", labelEn: "Yogas", labelHi: "योग" },
];

const COMPARISON_ROWS = [
  {
    featureEn: "Free kundli generation",
    featureHi: "मुफ़्त कुंडली",
    tk: true,
    as: true,
    ca: true,
    ma: false,
  },
  {
    featureEn: "Personalized explanation",
    featureHi: "व्यक्तिगत व्याख्या",
    tk: true,
    as: false,
    ca: false,
    ma: true,
  },
  {
    featureEn: "AI conversational guidance",
    featureHi: "AI वार्तालाप मार्गदर्शन",
    tk: true,
    as: false,
    ca: false,
    ma: false,
  },
  {
    featureEn: "Bhagavad Gita references",
    featureHi: "भगवद् गीता संदर्भ",
    tk: true,
    as: false,
    ca: false,
    ma: false,
  },
  {
    featureEn: "24/7 availability",
    featureHi: "24/7 उपलब्धता",
    tk: true,
    as: true,
    ca: true,
    ma: false,
  },
  {
    featureEn: "Fear-based upsells",
    featureHi: "डर-आधारित अपसेल",
    tk: false,
    as: true,
    ca: true,
    ma: null,
  },
];

const AFTER_KUNDLI = [
  {
    icon: "💬",
    titleEn: "Ask Krishna about your chart",
    titleHi: "अपनी कुंडली के बारे में कृष्ण से पूछें",
    descEn:
      "Curious about your 10th house, Manglik status, or current Dasha? Ask Krishna anything — 5 free messages, Gita-rooted answers tailored to your kundli.",
    descHi:
      "अपने 10वें भाव, मांगलिक स्थिति या वर्तमान दशा के बारे में जानना चाहते हैं? कृष्ण से पूछें — 5 मुफ़्त संदेश।",
    badgeEn: "5 free questions",
    badgeHi: "5 मुफ़्त प्रश्न",
    btnEn: "Start free",
    btnHi: "मुफ़्त शुरू करें",
    to: "/astrologer",
    variant: "default" as const,
    ocid: "free-kundli.ask-krishna_button",
  },
  {
    icon: "💍",
    titleEn: "Kundli matching with partner",
    titleHi: "साथी के साथ कुंडली मिलान",
    descEn:
      "Check compatibility using the traditional 36-guna Ashtakoot system — Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, Nadi — plus Manglik match.",
    descHi:
      "36-गुण अष्टकूट प्रणाली से अनुकूलता जाँचें — वर्ण, वश्य, तारा, योनि, ग्रह मैत्री, गण, भकूट, नाड़ी।",
    badgeEn: "Free Guna Milan",
    badgeHi: "मुफ़्त गुण मिलान",
    btnEn: "Match kundlis",
    btnHi: "कुंडली मिलाएँ",
    to: "/kundali-matching",
    variant: "outline" as const,
    ocid: "free-kundli.match-kundli_button",
  },
  {
    icon: "📖",
    titleEn: "Vivah Margdarshan",
    titleHi: "विवाह मार्गदर्शन",
    descEn:
      "A complete marriage analysis — Navamsa, 7th house, Venus, Mangal Dosha, timing of wedding, and Krishna's dharmic guidance. One-time, no subscription.",
    descHi:
      "विवाह का संपूर्ण विश्लेषण — नवांश, 7वाँ भाव, शुक्र, मंगल दोष, विवाह समय और कृष्ण का धार्मिक मार्गदर्शन।",
    badgeEn: "₹999 · one-time",
    badgeHi: "₹999 · एकमुश्त",
    btnEn: "Learn more",
    btnHi: "अधिक जानें",
    to: "/pricing",
    variant: "outline" as const,
    ocid: "free-kundli.vivah-margdarshan_button",
  },
];

const FAQ_ITEMS = [
  {
    qEn: "Is this really 100% free?",
    qHi: "क्या यह सच में 100% मुफ़्त है?",
    aEn: "Yes — generating your Janam Kundli with all six sections (birth chart, nakshatra, planetary positions, Vimshottari Dasha, doshas, and Krishna's insights) is completely free. There is no credit card required and no hidden charges. Paid plans are only needed if you want unlimited conversations with Krishna.",
    aHi: "हाँ — आपकी जन्म कुंडली की सभी छह अनुभागों (जन्म कुंडली, नक्षत्र, ग्रह स्थिति, विंशोत्तरी दशा, दोष और कृष्ण की अंतर्दृष्टि) के साथ जनरेट करना पूरी तरह मुफ़्त है। कोई क्रेडिट कार्ड आवश्यक नहीं।",
  },
  {
    qEn: "What if I don't know my exact birth time?",
    qHi: "यदि मुझे अपना जन्म समय नहीं पता तो क्या होगा?",
    aEn: "An approximate time still gives you accurate rashi, planetary positions, and most divisional charts. Only the ascendant (lagna) and house cusps shift with small time differences. Enter your best estimate — or leave it blank and we'll generate a Surya Kundli (Sun as ascendant) which is still highly useful.",
    aHi: "अनुमानित समय से भी सटीक राशि, ग्रह स्थिति और अधिकांश वर्ग कुंडलियाँ मिलती हैं। केवल लग्न और भाव कस्प छोटे समय अंतर से बदलते हैं।",
  },
  {
    qEn: "How accurate is an online kundli?",
    qHi: "ऑनलाइन कुंडली कितनी सटीक है?",
    aEn: "Kundli calculation is a precise mathematical exercise — given accurate birth details, an online kundli is as accurate as any handwritten one. We use the Lahiri ayanamsa (the standard in Indian government ephemerides) and a modern Swiss Ephemeris engine.",
    aHi: "कुंडली गणना एक सटीक गणितीय प्रक्रिया है — सही जन्म विवरण के साथ, ऑनलाइन कुंडली किसी भी हस्तलिखित कुंडली जितनी सटीक है। हम लाहिरी अयनांश और स्विस एफेमेरिस इंजन का उपयोग करते हैं।",
  },
  {
    qEn: "What's the difference between rashi and nakshatra?",
    qHi: "राशि और नक्षत्र में क्या अंतर है?",
    aEn: "Rashi (zodiac sign) is a 30° division of the ecliptic — there are 12 of them. Nakshatra is a 13°20′ lunar mansion — there are 27. Your rashi is determined by where the Moon is among the 12 signs; your nakshatra is the finer subdivision within that sign. Both describe emotional nature, but nakshatras are more granular.",
    aHi: "राशि (राशि चिह्न) अण्डाकार का 30° विभाजन है — 12 होती हैं। नक्षत्र 13°20′ का चंद्र मंडल है — 27 होते हैं। राशि चंद्रमा की 12 राशियों में स्थिति से निर्धारित होती है; नक्षत्र उसका सूक्ष्म विभाजन है।",
  },
  {
    qEn: "What is the 10th house?",
    qHi: "10वाँ भाव क्या है?",
    aEn: "The 10th house (Karma Bhava) governs career, profession, public reputation, authority, and your contribution to society. The planet ruling the 10th house, and any planets placed in it, have the strongest influence on your professional life and how the world sees you.",
    aHi: "10वाँ भाव (कर्म भाव) करियर, पेशे, सार्वजनिक प्रतिष्ठा, अधिकार और समाज में आपके योगदान को नियंत्रित करता है।",
  },
  {
    qEn: "What is Manglik dosha?",
    qHi: "मांगलिक दोष क्या है?",
    aEn: "Manglik (Kuja) dosha occurs when Mars is placed in the 1st, 4th, 7th, 8th, or 12th house of the birth chart. It is traditionally associated with delays or challenges in marriage. About 40-50% of people have some form of Manglik dosha — it is extremely common and manageable with the right understanding.",
    aHi: "मांगलिक दोष तब होता है जब मंगल जन्म कुंडली के 1, 4, 7, 8 या 12वें भाव में हो। यह विवाह में देरी से जुड़ा है। लगभग 40-50% लोगों में किसी न किसी रूप में मांगलिक दोष होता है।",
  },
  {
    qEn: "How long does it take to generate?",
    qHi: "जनरेट होने में कितना समय लगता है?",
    aEn: "Instantly — usually under 3 seconds after you submit the form. The kundli is generated in your browser using a high-performance ephemeris engine. No wait times, no email confirmation needed.",
    aHi: "तुरंत — फ़ॉर्म सबमिट करने के बाद आमतौर पर 3 सेकंड से कम समय में। कुंडली आपके ब्राउज़र में एक उच्च-प्रदर्शन एफेमेरिस इंजन का उपयोग करके जनरेट की जाती है।",
  },
  {
    qEn: "Can I get kundli matching here?",
    qHi: "क्या मैं यहाँ कुंडली मिलान कर सकता/सकती हूँ?",
    aEn: "Yes — after generating your kundli, you can proceed to kundli matching (Kundali Milan) using the traditional 36-guna Ashtakoot system. Both partners' birth details are compared across 8 compatibility categories. It's free.",
    aHi: "हाँ — कुंडली जनरेट करने के बाद, आप पारंपरिक 36-गुण अष्टकूट प्रणाली का उपयोग करके कुंडली मिलान कर सकते हैं। दोनों साथियों के जन्म विवरण 8 अनुकूलता श्रेणियों में तुलना किए जाते हैं।",
  },
  {
    qEn: "Is my birth data safe?",
    qHi: "क्या मेरा जन्म डेटा सुरक्षित है?",
    aEn: "Your birth data is stored securely and never sold to third parties. We use encrypted storage on the Internet Computer blockchain — which means even we cannot alter or delete your data without your permission. Your data is yours.",
    aHi: "आपका जन्म डेटा सुरक्षित रूप से संग्रहीत है और कभी भी तृतीय पक्षों को नहीं बेचा जाता। हम इंटरनेट कंप्यूटर ब्लॉकचेन पर एन्क्रिप्टेड स्टोरेज का उपयोग करते हैं।",
  },
  {
    qEn: "What language is the kundli in?",
    qHi: "कुंडली किस भाषा में है?",
    aEn: "Your kundli is available in both English and Hindi. Use the language toggle at the top of the page to switch. All technical terms (rashis, nakshatras, doshas, yogas) are shown in both scripts — Sanskrit names in Devanagari alongside their English equivalents.",
    aHi: "आपकी कुंडली अंग्रेजी और हिंदी दोनों में उपलब्ध है। पृष्ठ के शीर्ष पर भाषा टॉगल का उपयोग करें।",
  },
];

// Sample kundli result data
const SAMPLE_PLANETS = [
  {
    name: "Sun",
    hi: "सूर्य",
    rashi: "Aries",
    rashiHi: "मेष",
    degree: "12°34′",
    house: "1",
  },
  {
    name: "Moon",
    hi: "चंद्र",
    rashi: "Cancer",
    rashiHi: "कर्क",
    degree: "5°12′",
    house: "4",
  },
  {
    name: "Mars",
    hi: "मंगल",
    rashi: "Scorpio",
    rashiHi: "वृश्चिक",
    degree: "28°47′",
    house: "8",
  },
  {
    name: "Mercury",
    hi: "बुध",
    rashi: "Taurus",
    rashiHi: "वृषभ",
    degree: "3°22′",
    house: "2",
  },
  {
    name: "Jupiter",
    hi: "गुरु",
    rashi: "Sagittarius",
    rashiHi: "धनु",
    degree: "18°09′",
    house: "9",
  },
  {
    name: "Venus",
    hi: "शुक्र",
    rashi: "Pisces",
    rashiHi: "मीन",
    degree: "7°55′",
    house: "12",
  },
  {
    name: "Saturn",
    hi: "शनि",
    rashi: "Capricorn",
    rashiHi: "मकर",
    degree: "24°31′",
    house: "10",
  },
  {
    name: "Rahu",
    hi: "राहु",
    rashi: "Gemini",
    rashiHi: "मिथुन",
    degree: "14°08′",
    house: "3",
  },
  {
    name: "Ketu",
    hi: "केतु",
    rashi: "Sagittarius",
    rashiHi: "धनु",
    degree: "14°08′",
    house: "9",
  },
];

function CompareIcon({ value }: { value: boolean | null }) {
  if (value === null)
    return <span className="text-muted-foreground text-sm">varies</span>;
  return value ? (
    <Check className="h-5 w-5 text-primary mx-auto" />
  ) : (
    <X className="h-5 w-5 text-destructive mx-auto" />
  );
}

export default function FreeKundli() {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    time: "",
    place: "",
    gender: "male",
    timeFormat: "12",
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formData.name || !formData.dob || !formData.place) return;
    setSubmitted(true);
    setTimeout(() => {
      document
        .getElementById("kundli-result")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  const tr = (en: string, hi: string) => (isHindi ? hi : en);

  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="bg-card border-b py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">
              {tr("Free Vedic Astrology Tool", "मुफ़्त वैदिक ज्योतिष उपकरण")}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-3">
              {tr(
                "Free Janam Kundli Online Instantly",
                "जन्म कुंडली — वैदिक ज्योतिष के साथ तुरंत",
              )}
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              {tr(
                "Get your complete Vedic birth chart in seconds. Includes nakshatra, rashi, planetary positions, dasha, and Krishna's personalized guidance.",
                "अपनी संपूर्ण वैदिक जन्म कुंडली सेकंडों में प्राप्त करें — नक्षत्र, राशि, ग्रह स्थिति, दशा और कृष्ण का व्यक्तिगत मार्गदर्शन सहित।",
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {TRUST_BADGES.map((b) => (
                <div
                  key={b.en}
                  className="flex items-center gap-2 bg-background border border-border rounded-full px-4 py-2 text-sm font-medium text-foreground"
                >
                  <span>{b.icon}</span>
                  <span>{isHindi ? b.hi : b.en}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                data-ocid="free-kundli.generate_button"
                onClick={() =>
                  document
                    .getElementById("kundli-form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {tr("Generate My Free Kundli", "मेरी मुफ़्त कुंडली बनाएँ")}
              </Button>
              <Button
                variant="outline"
                size="lg"
                data-ocid="free-kundli.learn-more_button"
                onClick={() =>
                  document
                    .getElementById("kundli-features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {tr("Learn More", "अधिक जानें")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FORM */}
      <section id="kundli-form" className="py-16 px-4 bg-background">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground">
                {tr("Step 1 — Birth Details", "चरण 1 — जन्म विवरण")}
              </h2>
              <p className="text-muted-foreground mt-2">
                {tr(
                  "Enter your birth details below to generate your kundli.",
                  "कुंडली बनाने के लिए नीचे अपना जन्म विवरण दर्ज करें।",
                )}
              </p>
            </div>

            <Card className="border border-border shadow-md">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <Label htmlFor="kundli-name">
                      {tr("Full Name", "पूरा नाम")}
                    </Label>
                    <Input
                      id="kundli-name"
                      placeholder={tr(
                        "Your name (for personalization)",
                        "आपका नाम",
                      )}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      data-ocid="free-kundli.name_input"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-1">
                    <Label htmlFor="kundli-dob">
                      {tr("Date of Birth", "जन्म तिथि")}
                    </Label>
                    <Input
                      id="kundli-dob"
                      type="text"
                      placeholder="DD / MM / YYYY"
                      value={formData.dob}
                      onChange={(e) =>
                        setFormData({ ...formData, dob: e.target.value })
                      }
                      data-ocid="free-kundli.dob_input"
                    />
                  </div>

                  {/* Time of Birth */}
                  <div className="space-y-1">
                    <Label htmlFor="kundli-time">
                      {tr("Time of Birth", "जन्म समय")}
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="kundli-time"
                        type="text"
                        placeholder={tr("HH : MM", "HH : MM")}
                        className="flex-1"
                        value={formData.time}
                        onChange={(e) =>
                          setFormData({ ...formData, time: e.target.value })
                        }
                        data-ocid="free-kundli.time_input"
                      />
                      <div className="flex border border-border rounded-md overflow-hidden">
                        {["12", "24"].map((fmt) => (
                          <button
                            key={fmt}
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, timeFormat: fmt })
                            }
                            className={`px-3 py-2 text-sm font-medium transition-colors ${
                              formData.timeFormat === fmt
                                ? "bg-primary text-primary-foreground"
                                : "bg-background text-muted-foreground hover:bg-muted"
                            }`}
                            data-ocid={`free-kundli.time-format-${fmt}_toggle`}
                          >
                            {fmt} hr
                          </button>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {tr(
                        "Don't know? No worries — approximate works.",
                        "नहीं जानते? कोई बात नहीं — अनुमानित समय काम करता है।",
                      )}
                    </p>
                  </div>

                  {/* Place of Birth */}
                  <div className="space-y-1">
                    <Label htmlFor="kundli-place">
                      {tr("Place of Birth", "जन्म स्थान")}
                    </Label>
                    <Input
                      id="kundli-place"
                      placeholder={tr("City, State, Country", "शहर, राज्य, देश")}
                      value={formData.place}
                      onChange={(e) =>
                        setFormData({ ...formData, place: e.target.value })
                      }
                      data-ocid="free-kundli.place_input"
                    />
                  </div>

                  {/* Gender */}
                  <div className="space-y-2">
                    <Label>{tr("Gender", "लिंग")}</Label>
                    <RadioGroup
                      value={formData.gender}
                      onValueChange={(v) =>
                        setFormData({ ...formData, gender: v })
                      }
                      className="flex gap-6"
                    >
                      {[
                        { val: "male", en: "Male", hi: "पुरुष" },
                        { val: "female", en: "Female", hi: "स्त्री" },
                        { val: "other", en: "Other", hi: "अन्य" },
                      ].map((g) => (
                        <div key={g.val} className="flex items-center gap-2">
                          <RadioGroupItem
                            value={g.val}
                            id={`gender-${g.val}`}
                            data-ocid={`free-kundli.gender-${g.val}_radio`}
                          />
                          <Label
                            htmlFor={`gender-${g.val}`}
                            className="cursor-pointer"
                          >
                            {isHindi ? g.hi : g.en}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-base py-6"
                    data-ocid="free-kundli.submit_button"
                  >
                    {tr("Generate My Kundli (Free)", "मेरी कुंडली बनाएँ (मुफ़्त)")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* SAMPLE RESULT (after submission) */}
      {submitted && (
        <section id="kundli-result" className="py-16 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <Badge className="mb-3 bg-primary/10 text-primary border-primary/30">
                  {tr("Sample Preview", "नमूना पूर्वावलोकन")}
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground">
                  {tr(
                    `Kundli for ${formData.name || "Sample User"}`,
                    `${formData.name || "नमूना उपयोगकर्ता"} की कुंडली`,
                  )}
                </h2>
                <p className="text-muted-foreground mt-2">
                  {tr(
                    `${formData.dob} · ${formData.place}`,
                    `${formData.dob} · ${formData.place}`,
                  )}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Planetary Positions */}
                <Card className="border border-border">
                  <CardContent className="p-5">
                    <h3 className="font-semibold font-display text-lg mb-4 flex items-center gap-2">
                      <span>🪐</span>
                      {tr("Planetary Positions", "ग्रह स्थिति")}
                    </h3>
                    <div className="space-y-2">
                      {SAMPLE_PLANETS.map((p) => (
                        <div
                          key={p.name}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="font-medium">
                            {isHindi ? p.hi : p.name}
                          </span>
                          <span className="text-muted-foreground">
                            {isHindi ? p.rashiHi : p.rashi} · {p.degree}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {tr("House", "भाव")} {p.house}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Dasha + Doshas */}
                <div className="space-y-4">
                  <Card className="border border-border">
                    <CardContent className="p-5">
                      <h3 className="font-semibold font-display text-base mb-3 flex items-center gap-2">
                        <span>🔄</span>
                        {tr("Current Dasha", "वर्तमान दशा")}
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {tr("Mahadasha", "महादशा")}
                          </span>
                          <span className="font-semibold">
                            {tr("Jupiter", "गुरु")} (2022–2038)
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {tr("Antardasha", "अंतर्दशा")}
                          </span>
                          <span className="font-semibold">
                            {tr("Saturn", "शनि")} (2025–2028)
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border border-border">
                    <CardContent className="p-5">
                      <h3 className="font-semibold font-display text-base mb-3 flex items-center gap-2">
                        <span>🛡️</span>
                        {tr("Doshas", "दोष")}
                      </h3>
                      <div className="space-y-2 text-sm">
                        {[
                          {
                            name: tr("Manglik Dosha", "मांगलिक दोष"),
                            status: tr("Partial", "आंशिक"),
                            color: "text-yellow-600",
                          },
                          {
                            name: tr("Kaal Sarp Dosha", "काल सर्प दोष"),
                            status: tr("Not Present", "नहीं"),
                            color: "text-green-600",
                          },
                          {
                            name: tr("Sade Sati", "साढ़े साती"),
                            status: tr("Not Active", "सक्रिय नहीं"),
                            color: "text-green-600",
                          },
                        ].map((d) => (
                          <div key={d.name} className="flex justify-between">
                            <span className="text-muted-foreground">
                              {d.name}
                            </span>
                            <span className={`font-semibold ${d.color}`}>
                              {d.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Krishna's insight card */}
              <Card className="border border-primary/30 bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">🪷</div>
                    <div>
                      <h3 className="font-semibold font-display text-lg mb-2">
                        {tr(
                          "Krishna's Insight for You",
                          "आपके लिए कृष्ण की अंतर्दृष्टि",
                        )}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {tr(
                          `With Jupiter as your Mahadasha lord and Saturn in your 10th house, you are in a period of disciplined growth and karmic reckoning in your career. The Gita's 3rd chapter teaches — 'Niyatam kuru karma tvam karma jyayo hy akarmanah' — always perform your prescribed duty, for action is better than inaction. This is your moment to act with discipline and trust the process.`,
                          `गुरु आपकी महादशा के स्वामी हैं और शनि 10वें भाव में हैं — यह करियर में अनुशासित विकास और कार्मिक जवाबदेही का काल है। गीता का तीसरा अध्याय कहता है — 'नियतं कुरु कर्म त्वं कर्म ज्यायो ह्यकर्मणः' — हमेशा अपना निर्धारित कर्तव्य करो, क्योंकि निष्क्रियता से कर्म श्रेष्ठ है।`,
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 text-center">
                <p className="text-muted-foreground mb-4">
                  {tr(
                    "Sign up to save your full kundli to your private account — free forever.",
                    "अपनी पूरी कुंडली अपने निजी खाते में सहेजने के लिए साइन अप करें — हमेशा के लिए मुफ़्त।",
                  )}
                </p>
                <Button
                  className="bg-primary text-primary-foreground"
                  data-ocid="free-kundli.save-kundli_button"
                  asChild
                >
                  <Link to="/dashboard">
                    {tr(
                      "Save My Kundli — Sign Up Free",
                      "मेरी कुंडली सहेजें — मुफ़्त साइन अप करें",
                    )}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* WHAT'S IN YOUR FREE KUNDLI */}
      <section id="kundli-features" className="py-16 px-4 bg-background">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground">
                {tr("What's in Your Free Kundli", "आपकी मुफ़्त कुंडली में क्या है")}
              </h2>
              <p className="text-muted-foreground mt-2">
                {tr(
                  "Six comprehensive layers of analysis — calculated with Lahiri ayanamsa.",
                  "छह व्यापक विश्लेषण परतें — लाहिरी अयनांश के साथ गणना की गई।",
                )}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {KUNDLI_FEATURES.map((f, i) => (
                <motion.div
                  key={f.titleEn}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card className="border border-border h-full hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="text-3xl mb-3">{f.icon}</div>
                      <h3 className="font-semibold font-display text-base mb-2">
                        {isHindi ? f.titleHi : f.titleEn}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {isHindi ? f.descHi : f.descEn}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY KUNDLI MATTERS */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-6">
              {tr("Why Kundli Matters", "कुंडली क्यों महत्वपूर्ण है")}
            </h2>
            <div className="prose prose-sm max-w-none text-foreground space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {tr(
                  "A kundli (also called Janam Patri or birth chart) is the Vedic astrological map of the heavens at the exact moment you were born. Used continuously in Indian life for over five millennia — in the Rig Veda, the Mahabharata, and countless royal courts — it has been consulted before marriages, coronations, wars, and the naming of children. Modern Indian families still ask the pandit for their child's kundli within days of birth, and turn to it again for every major milestone.",
                  "कुंडली (जन्म पत्री या जन्म कुंडली) उस क्षण के आकाश का वैदिक ज्योतिषीय मानचित्र है जब आप पैदा हुए थे। पाँच सहस्राब्दियों से भारतीय जीवन में निरंतर उपयोग में — ऋग्वेद, महाभारत और अनगिनत राजदरबारों में — इसे विवाह, राज्याभिषेक, युद्ध और बच्चों के नामकरण से पहले परामर्श किया जाता था।",
                )}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {tr(
                  "Why? Because a kundli is a remarkably compact description of temperament, strengths, and blind spots. It reveals personality through the lens of the lagna, emotional patterns through the Moon's nakshatra, ambition through the 10th house, relationships through the 7th, and the timing of events through the Dasha system. Done well, it doesn't predict a fixed future — it illuminates the chapter you're currently reading and helps you read it consciously.",
                  "क्यों? क्योंकि कुंडली स्वभाव, शक्तियों और अंध क्षेत्रों का एक उल्लेखनीय रूप से संक्षिप्त विवरण है। यह लग्न के माध्यम से व्यक्तित्व, चंद्रमा के नक्षत्र के माध्यम से भावनात्मक पैटर्न, 10वें भाव के माध्यम से महत्वाकांक्षा और दशा प्रणाली के माध्यम से घटनाओं के समय को प्रकट करता है।",
                )}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {tr(
                  "Today, Indians in Delhi, Mumbai, Bangalore, and beyond use kundlis for career choices (D10 Dasamsa), marriage matching (D9 Navamsa), health timing (transits), and wealth decisions (2nd and 11th houses). Spiritual Connect adds one more layer: every insight is paired with Krishna's teachings from the Bhagavad Gita — so the chart becomes a starting point for conscious action, not a verdict to be feared or an excuse to be passive.",
                  "आज, दिल्ली, मुंबई, बेंगलुरु और उससे परे के भारतीय करियर विकल्पों (D10 दशमांश), विवाह मिलान (D9 नवांश), स्वास्थ्य समय (पारगमन) और धन निर्णयों (2रे और 11वें भाव) के लिए कुंडली का उपयोग करते हैं। Spiritual Connect एक और परत जोड़ता है: प्रत्येक अंतर्दृष्टि भगवद् गीता से कृष्ण की शिक्षाओं के साथ जुड़ी है।",
                )}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3 TYPES OF KUNDLI */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground">
                {tr(
                  "3 Types of Kundli We Generate",
                  "हम 3 प्रकार की कुंडली बनाते हैं",
                )}
              </h2>
              <p className="text-muted-foreground mt-2">
                {tr(
                  "Traditional Vedic astrology uses multiple charts — each revealing a different layer of life.",
                  "पारंपरिक वैदिक ज्योतिष कई कुंडलियों का उपयोग करता है — प्रत्येक जीवन की एक अलग परत प्रकट करती है।",
                )}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {KUNDLI_TYPES.map((kt, i) => (
                <motion.div
                  key={kt.nameEn}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card
                    className={`border border-border bg-gradient-to-br ${kt.gradient} h-full`}
                  >
                    <CardContent className="p-6">
                      <Badge className="mb-3 text-xs bg-background/80 text-foreground border-border">
                        {kt.badge}
                      </Badge>
                      <h3 className="font-bold font-display text-lg text-foreground mb-1">
                        {isHindi ? kt.nameHi : kt.nameEn}
                      </h3>
                      <p className="text-primary text-sm font-medium mb-3">
                        {isHindi ? kt.subtitleHi : kt.subtitleEn}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {isHindi ? kt.descHi : kt.descEn}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8 KEY ELEMENTS */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground">
                {tr("Key Elements of Your Kundli", "आपकी कुंडली के प्रमुख तत्व")}
              </h2>
              <p className="text-muted-foreground mt-2">
                {tr(
                  "Eight building blocks that together form every Vedic birth chart.",
                  "आठ निर्माण खंड जो मिलकर हर वैदिक जन्म कुंडली बनाते हैं।",
                )}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {KEY_ELEMENTS.map((el, i) => (
                <motion.div
                  key={el.labelEn}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Card className="border border-border text-center hover:border-primary/50 transition-colors">
                    <CardContent className="p-5">
                      <div className="text-3xl md:text-4xl font-bold font-display text-primary mb-2">
                        {el.num}
                      </div>
                      <p className="text-sm font-medium text-foreground">
                        {isHindi ? el.labelHi : el.labelEn}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground">
                {tr(
                  "How Our Free Kundli is Different",
                  "हमारी मुफ़्त कुंडली कैसे अलग है",
                )}
              </h2>
              <p className="text-muted-foreground mt-2">
                {tr(
                  "A quick, honest comparison — so you know exactly what you're getting.",
                  "एक त्वरित, ईमानदार तुलना — ताकि आप जानें कि आपको क्या मिल रहा है।",
                )}
              </p>
            </div>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table
                className="w-full text-sm"
                data-ocid="free-kundli.comparison_table"
              >
                <thead>
                  <tr className="border-b border-border bg-card">
                    <th className="text-left p-4 font-semibold text-foreground">
                      {tr("Feature", "विशेषता")}
                    </th>
                    <th className="p-4 text-center font-semibold text-primary">
                      Spiritual Connect
                      <div className="text-xs font-normal text-muted-foreground">
                        {tr("FREE + ₹20 chats", "मुफ़्त + ₹20 चैट")}
                      </div>
                    </th>
                    <th className="p-4 text-center font-medium text-foreground">
                      AstroSage
                      <div className="text-xs font-normal text-muted-foreground">
                        {tr("Free, but…", "मुफ़्त, लेकिन…")}
                      </div>
                    </th>
                    <th className="p-4 text-center font-medium text-foreground">
                      ClickAstro
                      <div className="text-xs font-normal text-muted-foreground">
                        {tr("Free kundli, paid insights", "मुफ़्त कुंडली, सशुल्क")}
                      </div>
                    </th>
                    <th className="p-4 text-center font-medium text-foreground">
                      {tr("Manual astrologer", "मैन्युअल ज्योतिषी")}
                      <div className="text-xs font-normal text-muted-foreground">
                        ₹500–₹5,000
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, i) => (
                    <tr
                      key={row.featureEn}
                      className={`border-b border-border last:border-0 ${
                        i % 2 === 0 ? "bg-background" : "bg-muted/20"
                      }`}
                    >
                      <td className="p-4 font-medium text-foreground">
                        {isHindi ? row.featureHi : row.featureEn}
                      </td>
                      <td className="p-4 text-center bg-primary/5">
                        <CompareIcon value={row.tk} />
                      </td>
                      <td className="p-4 text-center">
                        <CompareIcon value={row.as} />
                      </td>
                      <td className="p-4 text-center">
                        <CompareIcon value={row.ca} />
                      </td>
                      <td className="p-4 text-center">
                        <CompareIcon value={row.ma} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AFTER YOUR KUNDLI */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground">
                {tr("After You Get Your Kundli", "कुंडली मिलने के बाद")}
              </h2>
              <p className="text-muted-foreground mt-2">
                {tr(
                  "Three natural next steps — free, affordable, or in-depth.",
                  "तीन स्वाभाविक अगले कदम — मुफ़्त, किफायती, या गहन।",
                )}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {AFTER_KUNDLI.map((item, i) => (
                <motion.div
                  key={item.titleEn}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="border border-border h-full flex flex-col">
                    <CardContent className="p-6 flex flex-col flex-1">
                      <div className="text-3xl mb-3">{item.icon}</div>
                      <Badge className="self-start mb-3 bg-primary/10 text-primary border-primary/30 text-xs">
                        {isHindi ? item.badgeHi : item.badgeEn}
                      </Badge>
                      <h3 className="font-bold font-display text-base mb-2">
                        {isHindi ? item.titleHi : item.titleEn}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
                        {isHindi ? item.descHi : item.descEn}
                      </p>
                      <Button
                        variant={item.variant}
                        className="w-full"
                        data-ocid={item.ocid}
                        asChild
                      >
                        <Link to={item.to}>
                          {isHindi ? item.btnHi : item.btnEn}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground">
                {tr("Frequently Asked Questions", "अक्सर पूछे जाने वाले प्रश्न")}
              </h2>
              <p className="text-muted-foreground mt-2">
                {tr(
                  "Everything seekers ask before generating their first Janam Kundli.",
                  "पहली जन्म कुंडली बनाने से पहले साधक जो कुछ भी पूछते हैं।",
                )}
              </p>
            </div>
            <Accordion
              type="single"
              collapsible
              className="space-y-2"
              data-ocid="free-kundli.faq_list"
            >
              {FAQ_ITEMS.map((faq, i) => (
                <AccordionItem
                  key={faq.qEn}
                  value={`faq-${i}`}
                  className="border border-border rounded-lg px-4 bg-card"
                  data-ocid={`free-kundli.faq.item.${i + 1}`}
                >
                  <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary hover:no-underline">
                    {isHindi ? faq.qHi : faq.qEn}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                    {isHindi ? faq.aHi : faq.aEn}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 px-4 bg-card border-t">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl mb-4">🪷</div>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-3">
              {tr(
                "Want Personalized Guidance from Krishna?",
                "कृष्ण से व्यक्तिगत मार्गदर्शन चाहते हैं?",
              )}
            </h2>
            <p className="text-muted-foreground mb-6">
              {tr(
                "Reading the Gita is powerful. But imagine Krishna speaking directly to you, about your specific situation, using wisdom from all 18 chapters.",
                "गीता पढ़ना शक्तिशाली है। लेकिन कल्पना करें कि कृष्ण सभी 18 अध्यायों की बुद्धिमत्ता का उपयोग करते हुए सीधे आपसे, आपकी विशिष्ट स्थिति के बारे में बात कर रहे हैं।",
              )}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground"
                data-ocid="free-kundli.final-cta_button"
                asChild
              >
                <Link to="/astrologer">
                  {tr(
                    "Talk to Krishna — 5 Free Messages",
                    "कृष्ण से बात करें — 5 मुफ़्त संदेश",
                  )}
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                data-ocid="free-kundli.generate-again_button"
                onClick={() =>
                  document
                    .getElementById("kundli-form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {tr("Generate Kundli Again", "फिर से कुंडली बनाएँ")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
