import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  ShoppingCart,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useCartStore } from "../stores/cartStore";
import LanguageToggle from "./LanguageToggle";
import ShoppingCartPanel from "./ShoppingCartPanel";
import StripePaymentSetup from "./StripePaymentSetup";
import UnifiedMediaPlayer from "./UnifiedMediaPlayer";

interface LayoutProps {
  children: React.ReactNode;
}

// Structured dropdown menus
const PANCHANG_MENU = [
  { to: "/panchang", labelEn: "Today's Panchang", labelHi: "आज का पंचांग" },
  { to: "/live-panchang", labelEn: "Live Panchang", labelHi: "लाइव पंचांग" },
  {
    to: "/tamil-panchangam",
    labelEn: "Tamil Panchangam",
    labelHi: "तमिल पंचांगम",
  },
  {
    to: "/malayalam-panchangam",
    labelEn: "Malayalam Panchangam",
    labelHi: "मलयालम पंचांगम",
  },
  {
    to: "/bengali-panjika",
    labelEn: "Bengali Panjika",
    labelHi: "बंगाली पंजिका",
  },
  {
    to: "/panchang/do-ghati",
    labelEn: "Do Ghati Panchang",
    labelHi: "दो घड़ी पंचांग",
  },
  { to: "/panchang/lagna", labelEn: "Lagna Calculator", labelHi: "लग्न कैल्कुलेटर" },
  { to: "/panchang/hora", labelEn: "Hora Calculator", labelHi: "होरा कैल्कुलेटर" },
  {
    to: "/panchang/pancha-pakshi",
    labelEn: "Pancha Pakshi",
    labelHi: "पंच पक्षी",
  },
  {
    to: "/panchang/auspicious-yogas",
    labelEn: "Auspicious Yogas",
    labelHi: "शुभ योग",
  },
  { to: "/panchang/shubha-dates", labelEn: "Shubha Dates", labelHi: "शुभ तिथि" },
  {
    to: "/panchang/jain-pachchakhaan",
    labelEn: "Jain Pachchakhaan",
    labelHi: "जैन पच्चक्खान",
  },
  {
    to: "/panchang/panchaka-rahita",
    labelEn: "Panchaka Rahita",
    labelHi: "पंचक रहित",
  },
];
const ASTRONOMY_MENU = [
  { to: "/solar-eclipse", labelEn: "Solar Eclipse 2026", labelHi: "सूर्य ग्रहण" },
  { to: "/lunar-eclipse", labelEn: "Lunar Eclipse 2026", labelHi: "चंद्र ग्रहण" },
  {
    to: "/planetary-positions",
    labelEn: "Planetary Positions",
    labelHi: "ग्रह स्थिति",
  },
  { to: "/graha-gochara", labelEn: "Graha Gochara", labelHi: "ग्रह गोचर" },
  {
    to: "/graha-asta-uday",
    labelEn: "Graha Asta/Uday",
    labelHi: "ग्रह अस्त/उदय",
  },
  {
    to: "/graha-vakri-margi",
    labelEn: "Vakri/Margi 2026",
    labelHi: "वक्री/मार्गी",
  },
  { to: "/vernal-equinox", labelEn: "Vernal Equinox", labelHi: "वसंत विषुव" },
  {
    to: "/summer-solstice",
    labelEn: "Summer Solstice",
    labelHi: "ग्रीष्म अयनांत",
  },
  { to: "/autumnal-equinox", labelEn: "Autumnal Equinox", labelHi: "शरद विषुव" },
  {
    to: "/winter-solstice",
    labelEn: "Winter Solstice",
    labelHi: "शीतकालीन अयनांत",
  },
  { to: "/indian-seasons", labelEn: "Six Indian Seasons", labelHi: "षट् ऋतुएं" },
  { to: "/hindu-sunrise", labelEn: "Sunrise Times", labelHi: "सूर्योदय" },
  { to: "/kumbha-mela", labelEn: "Kumbha Mela", labelHi: "कुंभ मेला" },
];
const AUSPICIOUS_YOGA_MENU = [
  { to: "/ravi-yoga", labelEn: "Ravi Yoga", labelHi: "रवि योग" },
  {
    to: "/sarvartha-siddhi-yoga",
    labelEn: "Sarvartha Siddhi Yoga",
    labelHi: "सर्वार्थ सिद्धि",
  },
  {
    to: "/amrit-siddhi-yoga",
    labelEn: "Amrit Siddhi Yoga",
    labelHi: "अमृत सिद्धि",
  },
  { to: "/dwipushkar-yoga", labelEn: "Dwipushkar Yoga", labelHi: "द्विपुष्कर" },
  { to: "/tripushkar-yoga", labelEn: "Tripushkar Yoga", labelHi: "त्रिपुष्कर" },
  { to: "/ravi-pushya-yoga", labelEn: "Ravi Pushya Yoga", labelHi: "रवि पुष्य" },
  { to: "/guru-pushya-yoga", labelEn: "Guru Pushya Yoga", labelHi: "गुरु पुष्य" },
  { to: "/maitreya-yoga", labelEn: "Maitreya Yoga", labelHi: "मैत्रेय" },
  {
    to: "/gajachchhaya-yoga",
    labelEn: "Gajachchhaya Yoga",
    labelHi: "गजच्छाया",
  },
  { to: "/rahu-kalam", labelEn: "Rahu Kalam", labelHi: "राहु काल" },
  { to: "/ganda-moola", labelEn: "Ganda Moola", labelHi: "गंड मूल" },
  { to: "/abhijit-nakshatra", labelEn: "Abhijit Nakshatra", labelHi: "अभिजित" },
  { to: "/panchak", labelEn: "Panchak", labelHi: "पंचक" },
];
const MUHURAT_MENU = [
  { to: "/vivah-muhurat", labelEn: "Vivah Muhurat", labelHi: "विवाह मुहूर्त" },
  {
    to: "/griha-pravesh-muhurat",
    labelEn: "Griha Pravesh",
    labelHi: "गृह प्रवेश",
  },
  {
    to: "/vehicle-purchase-muhurat",
    labelEn: "Vehicle Purchase",
    labelHi: "वाहन खरीद",
  },
  {
    to: "/property-purchase-muhurat",
    labelEn: "Property Purchase",
    labelHi: "संपत्ति",
  },
  {
    to: "/shop-opening-muhurat",
    labelEn: "Shop Opening",
    labelHi: "दुकान उद्घाटन",
  },
  { to: "/money-deposit-muhurat", labelEn: "Money Deposit", labelHi: "धन जमा" },
  { to: "/loan-taking-muhurat", labelEn: "Loan Taking", labelHi: "ऋण लेना" },
  { to: "/loan-giving-muhurat", labelEn: "Loan Giving", labelHi: "ऋण देना" },
  { to: "/garbhadhana", labelEn: "Garbhadhana", labelHi: "गर्भाधान" },
  { to: "/namakarana", labelEn: "Namakarana", labelHi: "नामकरण" },
  { to: "/annaprashana", labelEn: "Annaprashana", labelHi: "अन्नप्राशन" },
  { to: "/mundana", labelEn: "Mundana/Mundan", labelHi: "मुंडन" },
  { to: "/vidyarambha", labelEn: "Vidyarambha", labelHi: "विद्यारंभ" },
  { to: "/janeu-upanayana", labelEn: "Upanayana", labelHi: "उपनयन" },
  { to: "/vivaha-lagna", labelEn: "Vivaha Lagna", labelHi: "विवाह लग्न" },
];
const ASTROLOGY_MENU = [
  { to: "/free-kundli", labelEn: "Free Kundli", labelHi: "मुफ्त कुंडली" },
  { to: "/nakshatra", labelEn: "27 Nakshatras", labelHi: "27 नक्षत्र" },
  { to: "/full-moon-dates", labelEn: "Full Moon 2026", labelHi: "पूर्णिमा" },
  { to: "/new-moon-dates", labelEn: "Amavasya 2026", labelHi: "अमावस्या" },
  { to: "/marriage-dates", labelEn: "Marriage Dates", labelHi: "विवाह दिन" },
  { to: "/rahu-kalam", labelEn: "Rahu Kalam", labelHi: "राहु काल" },
  { to: "/panchak", labelEn: "Panchak", labelHi: "पंचक" },
  { to: "/calculator/rashi", labelEn: "Rashi Calculator", labelHi: "राशि" },
  {
    to: "/sunsign-calculator",
    labelEn: "Sunsign Calculator",
    labelHi: "सन साइन",
  },
  { to: "/ganda-moola", labelEn: "Ganda Moola", labelHi: "गंड मूल" },
  { to: "/abhijit-nakshatra", labelEn: "Abhijit Nakshatra", labelHi: "अभिजित" },
];

function DropdownMenu({
  items,
  label,
  labelHi,
  isHindi,
  onClose,
}: {
  items: { to: string; labelEn: string; labelHi: string }[];
  label: string;
  labelHi: string;
  isHindi: boolean;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="px-3 py-2 rounded-md text-xs font-heading font-medium tracking-wide flex items-center gap-1 hover:bg-white/10 transition-all"
        style={{ color: "oklch(0.88 0.06 75)" }}
      >
        {isHindi ? labelHi : label}
        <ChevronDown
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div
          className="absolute top-full left-0 mt-2 rounded-xl shadow-2xl border z-50 overflow-auto"
          style={{
            background: "oklch(0.20 0.08 22)",
            borderColor: "oklch(0.78 0.14 75 / 0.2)",
            minWidth: "200px",
            maxHeight: "70vh",
          }}
        >
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => {
                setOpen(false);
                onClose();
              }}
              className="block px-4 py-2.5 text-xs hover:bg-white/10 transition-colors"
              style={{ color: "oklch(0.85 0.06 65)" }}
            >
              {isHindi ? item.labelHi : item.labelEn}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

const navLinks = [
  { to: "/ask-krishna", label: "🙏 Krishna AI", tKey: "krishnaAI" },
  { to: "/aarti", label: "🧘 Aarti", tKey: "aarti" },
  { to: "/chalisa", label: "📖 Chalisa", tKey: "chalisa" },
  { to: "/mantra", label: "🔔 Mantra", tKey: "mantra" },
  {
    to: "/navgrah-mantra",
    label: "🪐 Navgrah Mul Mantra (108/1008)",
    tKey: "navgrahMantra",
  },
  { to: "/stotra", label: "💿 Stotra", tKey: "stotra" },
  { to: "/kavach", label: "🛡️ कवच", tKey: "kavach" },
  {
    to: "/energized-products",
    label: "🌰 Energized Products",
    tKey: "energizedProducts",
  },
];

const jainDepartmentSection = {
  title: "🛕 जैन विभाग",
  isJain: true,
  groups: [
    {
      heading: "📚 ज्ञान",
      links: [
        { to: "/jain-pujan", label: "जैन पूजन" },
        { to: "/tirthankars", label: "24 तीर्थंकर" },
        { to: "/jain-encyclopedia", label: "जैन विश्वकोश" },
        { to: "/jain-knowledge-base", label: "जैन ज्ञान आधार" },
        { to: "/jainipedia", label: "Jainipedia" },
        { to: "/jain-books", label: "जैन ग्रन्थ भंडार" },
        { to: "/tattvartha-sutra", label: "तत्त्वार्थसूत्र" },
        { to: "/jain-content-index", label: "जैन सामग्री सूचकांक" },
        { to: "/jain-vrat-144-list", label: "144 जैन व्रत सूची" },
      ],
    },
    {
      heading: "🙏 भक्ति",
      links: [
        { to: "/jain-vrat-kathas", label: "जैन व्रत कथाएँ" },
        { to: "/padmavati-vrat-katha", label: "पद्मावती व्रत कथा" },
        { to: "/jain-kathayen", label: "जैन कथाएँ" },
        { to: "/jain-stories", label: "जैन कथा संग्रह" },
        { to: "/jain-stotra-sangrah", label: "जैन स्तोत्र संग्रह" },
        { to: "/jain-stuti-sangrah", label: "जैन स्तुति संग्रह" },
        { to: "/jain-poojas-sangreh", label: "जैन पूजा संग्रह" },
        { to: "/jain-stavan", label: "जैन स्तवन" },
        { to: "/jain-meri-bhavna", label: "मेरी भावना" },
        { to: "/jain-dev-shastra-guru-puja", label: "देव शास्त्र गुरु पूजा" },
      ],
    },
    {
      heading: "💬 विचार एवं उपदेश",
      links: [{ to: "/jain-vichaar", label: "जैन विचार" }],
    },
    {
      heading: "🧒 बाल विकास",
      links: [
        { to: "/jain-pathshala", label: "बाल विकास" },
        { to: "/jain-bal-vikas", label: "जैन बाल विकास केंद्र" },
        { to: "/jain-parv-calendar", label: "जैन धर्म पर्व कैलेंडर" },
      ],
    },
  ],
};

const shopSection = {
  title: "🛍️ Shop",
  links: [
    { to: "/shop", label: "🏪 Main Shop" },
    { to: "/shop/by-purpose", label: "🎯 Shop by Purpose" },
    { to: "/kartik-shop", label: "💍 KartikJewels Collection" },
    { to: "/dhwani-shop", label: "🔮 Spiritual Connect" },
    { to: "/yantra-shop", label: "🔯 Yantra Shop" },
    { to: "/etchcraft-emporium", label: "✨ Etchcraft Emporium" },
    { to: "/dhwani-astro", label: "🌙 Dhwani Astro" },
    { to: "/divine-hindu-store", label: "🕉️ Divine Hindu Store" },
    { to: "/shop?category=rings", label: "💍 Gemstone Rings" },
    { to: "/shop?category=crystal-towers", label: "🗼 Crystal Towers" },
    { to: "/shop?category=coin-pendants", label: "🪙 Coin Pendants" },
    { to: "/shop?category=owls", label: "🦉 Owls & Figurines" },
    { to: "/shop?category=brass-murti", label: "🪆 Brass Murti" },
    { to: "/shop?category=puja-sets", label: "🪔 Puja Sets" },
    { to: "/shop?category=vastu-frames", label: "🖼️ Vastu Frames" },
    { to: "/shop?category=yantra-coins", label: "🪙 Yantra Coins" },
    { to: "/shop?category=rudraksha", label: "🟤 Rudraksha" },
    { to: "/shop?category=gemstones", label: "💎 Gemstones" },
    { to: "/moolank-oil", label: "💧 Moolank Oils" },
    { to: "/pricing", label: "💰 Pricing & Plans" },
    { to: "/life-receipt", label: "🧠 LifeReceipt™ AI" },
  ] as { to: string; label: string; isGold?: boolean }[],
  isShop: true as const,
};

const megaMenuSections = [
  {
    title: "🛕 जैन विभाग",
    links: [] as { to: string; label: string }[],
    isJain: true as const,
  },
  {
    title: "🔮 ज्योतिष विभाग",
    links: [
      { to: "/vedic-dashboard", label: "🪐 Vedic Dashboard (कुंडली)" },
      { to: "/horoscope", label: "राशिफल/Horoscope" },
      { to: "/horoscope-comparison", label: "🌐 Tri-System Comparison" },
      { to: "/panchang", label: "🗓️ Panchang & Muhurat" },
      { to: "/auspicious-times", label: "🌟 Auspicious Times | शुभ मुहूर्त" },
      { to: "/live-panchang", label: "📅 Live Panchang" },
      { to: "/shadow-planets", label: "☊ Shadow Planets" },
      { to: "/current-transits", label: "🪐 Current Transits" },
      {
        to: "/astrologers-india",
        label: "\ud83c\uddee\ud83c\uddf3 Astrologers Across India",
      },
      { to: "/astrologer", label: "ज्योतिषी परामर्श" },
      { to: "/palmistry", label: "🖐️ हस्तरेखा विश्लेषण" },
      { to: "/palm-photo", label: "📸 हस्त फोटो विश्लेषण" },
      { to: "/combined-vedic-reading", label: "🔯 संयुक्त वैदिक पाठन" },
      { to: "/vastu", label: "🏛️ वास्तु शास्त्र" },
      { to: "/vastu-checker", label: "🏠 वास्तु कक्ष जांच" },
      { to: "/reports", label: "ज्योतिषी रिपोर्ट" },
      { to: "/astrologer-dashboard", label: "ज्योतिषी डैशबोर्ड" },
    ],
  },
  {
    title: "🔔 मंत्र संग्रह",
    links: [
      { to: "/mantra", label: "🔔 Mantra Library" },
      { to: "/navgrah-mantra", label: "🪐 Navgrah Mul Mantra (108/1008)" },
      { to: "/stotra", label: "📜 Stotra Library" },
      { to: "/kavach", label: "🛡️ Kavach Library" },
      { to: "/ashtakam", label: "🕉️ Ashtakam Library" },
      { to: "/stuti", label: "🙏 Stuti Library" },
      { to: "/sahasranam", label: "📿 Sahasranam Library" },
    ],
  },
  {
    title: "📚 भक्ति पुस्तकालय",
    links: [
      { to: "/bhajan-library", label: "भजन लाइब्रेरी" },
      { to: "/pathshala", label: "🏫 पाठशाला | Bal Sanskar" },
      { to: "/media-player", label: "🎵 Media Player" },
      { to: "/festival-calendar", label: "📅 Festival Calendar 2026" },
      { to: "/vrat-katha", label: "व्रत कथा" },
      { to: "/sikh-kirtans", label: "🕌 Sikh Kirtans & Nitnem" },
      { to: "/holy-books-reader", label: "📖 Holy Books Reader" },
      { to: "/holy-books-overview", label: "Holy Books Overview" },
      { to: "/vedas-suktam", label: "🕉️ Vedas & Suktam Library" },
      { to: "/suktam-library", label: "📜 सूक्तम् Library (43)" },
      { to: "/holy-books", label: "Holy Books" },
      { to: "/devotional", label: "Devotional" },
      { to: "/guru-directory", label: "🙏 Guru Directory" },
      { to: "/mehndi", label: "🌿 Mehndi Collection" },
      { to: "/paintings-greetings", label: "🎨 Paintings & Greetings" },
      { to: "/daan-seva", label: "💝 Daan & Seva" },
      { to: "/dan-seva", label: "🙏 Dan Seva / Puja Booking" },
    ],
  },
  {
    title: "🛕 मंदिर & सेवाएं",
    links: [
      { to: "/dan-seva", label: "🕉️ Dan Seva & Chadava (Stripe)" },
      { to: "/chadhava", label: "🪔 Chadhava & Sacred Bhet" },
      { to: "/virtual-temple", label: "My Temple" },
      { to: "/temples", label: "Temple Directory" },
      { to: "/temple-directory", label: "🛕 Temples & Tirthas" },
      { to: "/temple-services", label: "Puja Services" },
      { to: "/pujas-catalog", label: "🙏 Book a Puja" },
      { to: "/puja-karo", label: "🪔 PoojaKaro Services" },
      { to: "/puja-booking", label: "📋 Puja Booking" },
      { to: "/booking-history", label: "🕰️ बुकिंग इतिहास" },
      { to: "/puja-types", label: "📋 Puja Types Directory" },
      { to: "/puja-reports", label: "🗒️ Puja Reports" },
      { to: "/energized-products", label: "🌰 Energized Products" },
      { to: "/shop", label: "Shop" },
      { to: "/yantra-shop", label: "🔯 यंत्र शॉप / Yantra Shop" },
      { to: "/yantra-info", label: "📖 यंत्र जानकारी / Yantra Info" },
      { to: "/gemstones/emerald", label: "💚 Emerald (Panna) Stone" },
      { to: "/gemstones", label: "💎 Gemstone Library" },
      { to: "/yantras", label: "🔯 Yantra Library" },
      { to: "/puja-booking-new", label: "📿 Puja Booking (New)" },
      { to: "/tantra-remedies", label: "🕯️ Tantra Remedies" },
    ],
  },
  {
    title: "🔢 संख्या विज्ञान & व्यापार",
    links: [
      { to: "/calculator-index", label: "🔢 All Calculators" },
      { to: "/numerology", label: "Numerology" },
      { to: "/numerology-hub", label: "🔢 Numerology Hub" },
      { to: "/numerology-bracelets", label: "📿 Numerology Bracelets" },
      { to: "/numerology-report-full", label: "📋 Numerology Report" },
      { to: "/business-tools", label: "Business Tools" },
    ],
  },
  {
    title: "🧮 Calculators",
    links: [
      { to: "/calculator/love", label: "❤️ Love Calculator" },
      { to: "/calculator/name-numerology", label: "🔤 Name Numerology" },
      { to: "/calculator/sun-sign", label: "☀️ Sun Sign" },
      { to: "/calculator/rashi", label: "🌙 Rashi / Moon Sign" },
      { to: "/calculator/rising-ascendant", label: "⬆️ Rising / Ascendant" },
      { to: "/calculator/birth-chart", label: "🗺️ Birth Chart" },
      { to: "/calculator/mangal-dosha", label: "🔴 Mangal Dosha" },
      { to: "/calculator/sade-sati", label: "🪐 Shani Sade Sati" },
      { to: "/calculator/ishta-devata", label: "🕉️ Ishta Devata" },
      { to: "/calculator/nakshatra", label: "⭐ Nakshatra Finder" },
      {
        to: "/tools/carat-ratti-calculator",
        label: "⚖️ Carat ↔ Ratti Calculator",
      },
      { to: "/rudraksha-calculator", label: "📿 Rudraksha Calculator" },
      { to: "/gemstone-calculator", label: "💎 Gemstone Calculator" },
      { to: "/moolank-calculator", label: "🔢 Moolank Calculator" },
      { to: "/ratti-calculator", label: "⚖️ Ratti Converter" },
      { to: "/bracelet-calculator", label: "📿 Bracelet Calculator" },
      { to: "/daily-guide", label: "📅 Daily Guide" },
      { to: "/calculators/wealth-money", label: "💰 Wealth Calculator" },
      { to: "/calculators/govt-job-success", label: "🏛️ Govt Job Calculator" },
      { to: "/calculators/career-potential", label: "💼 Career Potential" },
    ],
  },
  {
    title: "⚙️ Divine Tools & Admin",
    links: [
      { to: "/favourites", label: "♥ My Favourites" },
      { to: "/divine-info", label: "Divine Info" },
      { to: "/dashboard", label: "Dashboard" },
      { to: "/admin-cms", label: "Admin CMS" },
    ],
  },
  {
    title: "🌿 आयुर्वेद",
    links: [
      { to: "/ayurveda", label: "✨ आयुर्वेद & घरेलू नुस्खे" },
      { to: "/herb-directory", label: "🌿 Jadi Buti — Sacred Herb Directory" },
    ],
  },
  {
    title: "📝 Blog & Stories",
    links: [
      { to: "/blog", label: "📖 Spiritual Blog" },
      { to: "/hindi-blog", label: "🕉️ दिव्य ज्ञान लेख" },
      { to: "/web-stories", label: "✨ Web Stories" },
      { to: "/festival-calendar", label: "📅 Festival Calendar" },
    ],
  },
  {
    title: "☀️ Hindu Festivals",
    links: [
      { to: "/surya-dev", label: "☀️ Surya Deva — Lord Surya" },
      { to: "/hindu-calendar", label: "📅 Hindu Calendar (Month-wise)" },
      { to: "/top-hindu-festivals", label: "🏆 Top 25 Hindu Festivals" },
      { to: "/top-hindu-festivals-20", label: "Top 20 Hindu Festivals" },
      { to: "/top-hindu-festivals-10", label: "Top 10 Hindu Festivals" },
      { to: "/festival-calendar", label: "🌞 Sankranti Festivals" },
    ],
  },
];

const allMobileLinks = [
  ...navLinks,
  { to: "/chadhava", label: "🪔 Chadhava & Sacred Bhet" },
  // Jain — Knowledge
  { to: "/jain-pujan", label: "🛕 जैन पूजन" },
  { to: "/tirthankars", label: "24 तीर्थंकर" },
  { to: "/jain-encyclopedia", label: "📚 जैन विश्वकोश" },
  { to: "/jain-knowledge-base", label: "जैन ज्ञान आधार" },
  { to: "/jainipedia", label: "Jainipedia" },
  { to: "/jain-books", label: "जैन ग्रन्थ भंडार" },
  { to: "/tattvartha-sutra", label: "तत्त्वार्थसूत्र" },
  { to: "/jain-content-index", label: "जैन सामग्री सूचकांक" },
  { to: "/jain-vrat-144-list", label: "📋 144 जैन व्रत सूची" },
  // Jain — Bhakti
  { to: "/jain-vrat-kathas", label: "🙏 जैन व्रत कथाएँ" },
  { to: "/jain-kathayen", label: "जैन कथाएँ" },
  { to: "/jain-stories", label: "जैन कथा संग्रह" },
  { to: "/jain-stotra-sangrah", label: "जैन स्तोत्र संग्रह" },
  { to: "/jain-stuti-sangrah", label: "जैन स्तुति संग्रह" },
  { to: "/jain-poojas-sangreh", label: "जैन पूजा संग्रह" },
  { to: "/jain-stavan", label: "जैन स्तवन" },
  { to: "/jain-meri-bhavna", label: "मेरी भावना" },
  { to: "/jain-dev-shastra-guru-puja", label: "देव शास्त्र गुरु पूजा" },
  // Jain — Vichaar & Bal Vikas
  { to: "/jain-vichaar", label: "जैन विचार" },
  { to: "/jain-pathshala", label: "🏫 बाल विकास" },
  { to: "/jain-bal-vikas", label: "जैन बाल विकास केंद्र" },
  { to: "/jain-parv-calendar", label: "जैन धर्म पर्व कैलेंडर" },
  { to: "/panchang", label: "🗓️ Panchang & Muhurat" },
  { to: "/horoscope", label: "🔮 राशिफल" },
  { to: "/horoscope-comparison", label: "🌐 Tri-System Comparison" },
  { to: "/auspicious-times", label: "🌟 शुभ मुहूर्त" },
  { to: "/live-panchang", label: "📅 Live Panchang" },
  { to: "/shadow-planets", label: "☊ Shadow Planets" },
  { to: "/current-transits", label: "🪐 Current Transits" },
  { to: "/astrologer", label: "ज्योतिषी" },
  { to: "/palmistry", label: "🖐️ हस्तरेखा" },
  { to: "/palm-photo", label: "📸 हस्त फोटो विश्लेषण" },
  { to: "/combined-vedic-reading", label: "🔯 संयुक्त वैदिक पाठन" },
  { to: "/vastu", label: "🏛️ वास्तु शास्त्र" },
  { to: "/vastu-checker", label: "🏠 वास्तु कक्ष जांच" },
  { to: "/reports", label: "ज्योतिषी रिपोर्ट" },
  { to: "/sahasranam-sangrah", label: "🕉️ सहस्रनाम संग्रह" },
  { to: "/sahasranam", label: "सहस्रनामलाइब्रेरी" },
  { to: "/stuti", label: "स्तुति" },
  { to: "/ashtakam", label: "अष्टकम" },
  { to: "/bhajan-library", label: "🎵 भजन" },
  { to: "/pathshala", label: "🏫 पाठशाला | Bal Sanskar" },
  { to: "/media-player", label: "🎵 Media Player" },
  { to: "/festival-calendar", label: "📅 Festival Calendar" },
  { to: "/vrat-katha", label: "व्रत कथा" },
  { to: "/sikh-kirtans", label: "🕌 Sikh Kirtans & Nitnem" },
  { to: "/holy-books-reader", label: "📖 Holy Books Reader" },
  { to: "/holy-books-overview", label: "Holy Books Overview" },
  { to: "/vedas-suktam", label: "🕉️ Vedas & Suktam" },
  { to: "/suktam-library", label: "📜 सूक्तम् Library" },
  { to: "/holy-books", label: "Holy Books" },
  { to: "/devotional", label: "Devotional" },
  { to: "/virtual-temple", label: "🛕 My Temple" },
  { to: "/temples", label: "Temples" },
  { to: "/temple-services", label: "Puja Services" },
  { to: "/pujas-catalog", label: "🙏 Book a Puja" },
  { to: "/puja-booking", label: "📋 Puja Booking Form" },
  { to: "/booking-history", label: "🕰️ बुकिंग इतिहास / Booking History" },
  { to: "/puja-types", label: "📋 Puja Types" },
  { to: "/puja-reports", label: "🗒️ Puja Reports" },
  { to: "/shop", label: "🏪 Shop — Main" },
  { to: "/shop/by-purpose", label: "🎯 Shop by Purpose" },
  { to: "/kartik-shop", label: "💍 KartikJewels Collection" },
  { to: "/dhwani-shop", label: "🔮 Spiritual Connect" },
  { to: "/moolank-oil", label: "💧 Moolank Oils" },
  { to: "/pricing", label: "💰 Pricing & Plans" },
  { to: "/life-receipt", label: "🧠 LifeReceipt™ AI" },
  { to: "/shop?category=rings", label: "💍 Gemstone Rings" },
  { to: "/shop?category=crystal-towers", label: "🗼 Crystal Towers" },
  { to: "/shop?category=coin-pendants", label: "🪙 Coin Pendants" },
  { to: "/shop?category=owls", label: "🦉 Owls & Figurines" },
  { to: "/shop?category=brass-murti", label: "🪆 Brass Murti" },
  { to: "/shop?category=puja-sets", label: "🪔 Puja Sets" },
  { to: "/shop?category=vastu-frames", label: "🖼️ Vastu Frames" },
  { to: "/shop?category=yantra-coins", label: "🪙 Yantra Coins" },
  { to: "/yantra-shop", label: "🔯 यंत्र शॉप / Yantra Shop" },
  { to: "/yantra-info", label: "📖 यंत्र जानकारी / Yantra Info" },
  { to: "/gemstones/emerald", label: "💚 Emerald (Panna) Stone" },
  { to: "/energized-products", label: "🌰 Energized Products" },
  { to: "/numerology", label: "🔢 Numerology" },
  { to: "/calculator-index", label: "🔢 All Calculators" },
  { to: "/business-tools", label: "Business Tools" },
  { to: "/calculator/love", label: "❤️ Love Calculator" },
  { to: "/calculator/name-numerology", label: "🔤 Name Numerology" },
  { to: "/calculator/sun-sign", label: "☀️ Sun Sign Calculator" },
  { to: "/calculator/rashi", label: "🌙 Rashi / Moon Sign" },
  { to: "/calculator/rising-ascendant", label: "⬆️ Rising / Ascendant" },
  { to: "/calculator/birth-chart", label: "🗺️ Birth Chart" },
  { to: "/calculator/mangal-dosha", label: "🔴 Mangal Dosha" },
  { to: "/calculator/sade-sati", label: "🪐 Shani Sade Sati" },
  { to: "/calculator/ishta-devata", label: "🕉️ Ishta Devata" },
  { to: "/calculator/nakshatra", label: "⭐ Nakshatra Finder" },
  { to: "/tools/carat-ratti-calculator", label: "⚖️ Carat ↔ Ratti Calculator" },
  { to: "/rudraksha-calculator", label: "📿 Rudraksha Calculator" },
  { to: "/gemstone-calculator", label: "💎 Gemstone Calculator" },
  { to: "/moolank-calculator", label: "🔢 Moolank Calculator" },
  { to: "/ratti-calculator", label: "⚖️ Ratti Converter" },
  { to: "/bracelet-calculator", label: "📿 Bracelet Calculator" },
  { to: "/favourites", label: "♥ My Favourites" },
  { to: "/divine-info", label: "Divine Info" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/astrologer-dashboard", label: "Admin Dashboard" },
  { to: "/admin-cms", label: "Admin CMS" },
  { to: "/ayurveda", label: "🌿 आयुर्वेद" },
  { to: "/herb-directory", label: "🌿 Jadi Buti — Herb Directory" },
  { to: "/blog", label: "📖 Spiritual Blog" },
  { to: "/web-stories", label: "✨ Web Stories" },
  { to: "/festival-calendar", label: "📅 Festival Calendar" },
  { to: "/surya-dev", label: "☀️ Surya Deva" },
  { to: "/hindu-calendar", label: "📅 Hindu Calendar" },
  { to: "/guru-directory", label: "🙏 Guru Directory" },
  { to: "/mehndi", label: "🌿 Mehndi Collection" },
  { to: "/paintings-greetings", label: "🎨 Paintings & Greetings" },
  { to: "/daan-seva", label: "💝 Daan & Seva" },
  { to: "/top-hindu-festivals", label: "🏆 Top 25 Hindu Festivals" },
  { to: "/top-hindu-festivals-20", label: "Top 20 Hindu Festivals" },
  { to: "/top-hindu-festivals-10", label: "Top 10 Hindu Festivals" },
  // New routes
  { to: "/panchang", label: "🗓️ Panchang" },
  { to: "/tamil-panchangam", label: "🌍 Tamil Panchangam" },
  { to: "/malayalam-panchangam", label: "🌴 Malayalam Panchangam" },
  { to: "/bengali-panjika", label: "🏵️ Bengali Panjika" },
  { to: "/solar-eclipse", label: "🌞 Solar Eclipse 2026" },
  { to: "/lunar-eclipse", label: "🌕 Lunar Eclipse 2026" },
  { to: "/planetary-positions", label: "🪐 Planetary Positions" },
  { to: "/graha-gochara", label: "🌍 Graha Gochara" },
  { to: "/graha-vakri-margi", label: "🔄 Vakri/Margi 2026" },
  { to: "/full-moon-dates", label: "🌕 Purnima 2026" },
  { to: "/new-moon-dates", label: "🌑 Amavasya 2026" },
  { to: "/marriage-dates", label: "💍 Marriage Dates" },
  { to: "/nakshatra", label: "🌟 27 Nakshatras" },
  { to: "/rahu-kalam", label: "🚫 Rahu Kalam" },
  { to: "/ganda-moola", label: "⚡ Ganda Moola" },
  { to: "/abhijit-nakshatra", label: "⭐ Abhijit Nakshatra" },
  { to: "/panchak", label: "🌙 Panchak" },
  { to: "/indian-seasons", label: "🌱 6 Indian Seasons" },
  { to: "/kumbha-mela", label: "🌊 Kumbha Mela" },
  { to: "/sunsign-calculator", label: "☀️ Sun Sign Calculator" },
  { to: "/ravi-yoga", label: "✨ Ravi Yoga" },
  { to: "/vivah-muhurat", label: "💍 Vivah Muhurat" },
  { to: "/griha-pravesh-muhurat", label: "🏠 Griha Pravesh Muhurat" },
  { to: "/vehicle-purchase-muhurat", label: "🚗 Vehicle Purchase Muhurat" },

  { to: "/etchcraft-emporium", label: "✨ Etchcraft Emporium" },
  { to: "/dhwani-astro", label: "🌙 Dhwani Astro" },
  { to: "/divine-hindu-store", label: "🕉️ Divine Hindu Store" },
  { to: "/puja-karo", label: "🪔 PoojaKaro" },
  { to: "/numerology-hub", label: "🔢 Numerology Hub" },
  { to: "/numerology-bracelets", label: "📿 Numerology Bracelets" },
  { to: "/numerology-report-full", label: "📋 Numerology Report" },
  { to: "/panchang/do-ghati", label: "🕖 Do Ghati Panchang" },
  { to: "/panchang/lagna", label: "🔮 Lagna Calculator" },
  { to: "/panchang/hora", label: "⏰ Hora Calculator" },
  { to: "/panchang/pancha-pakshi", label: "🐦 Pancha Pakshi" },
  { to: "/panchang/auspicious-yogas", label: "✨ Auspicious Yogas" },
  { to: "/panchang/shubha-dates", label: "📝 Shubha Dates" },
  { to: "/panchang/jain-pachchakhaan", label: "🛕 Jain Pachchakhaan" },
  { to: "/panchang/panchaka-rahita", label: "🌙 Panchaka Rahita" },
  { to: "/calculators/wealth-money", label: "💰 Wealth Calculator" },
  { to: "/calculators/govt-job-success", label: "🏛️ Govt Job Calculator" },
  { to: "/calculators/career-potential", label: "💼 Career Potential" },
  { to: "/shop-opening-muhurat", label: "🏪 Shop Opening Muhurat" },
];

const footerSections = [
  {
    title: "Temple Services",
    links: [
      { to: "/temple-services", label: "Puja Booking" },
      { to: "/pujas-catalog", label: "🙏 Book a Puja" },
      { to: "/puja-types", label: "Puja Types" },
      { to: "/puja-reports", label: "Puja Reports" },
      { to: "/virtual-temple", label: "My Temple" },
    ],
  },
  {
    title: "Astrology",
    links: [
      { to: "/horoscope", label: "Daily Panchang" },
      { to: "/live-panchang", label: "Live Panchang" },
      { to: "/horoscope", label: "Rashifal" },
      { to: "/auspicious-times", label: "🌟 Auspicious Times" },
      { to: "/shadow-planets", label: "Shadow Planets" },
      { to: "/current-transits", label: "Current Transits" },
      { to: "/horoscope-comparison", label: "Tri-System Comparison" },
      { to: "/palmistry", label: "Palmistry Reading" },
      { to: "/palm-photo", label: "📸 Palm Photo Reading" },
      { to: "/vastu", label: "Vastu Shastra" },
      { to: "/astrologer", label: "Consult Astrologer" },
      { to: "/reports", label: "Astro Reports" },
    ],
  },
  {
    title: "Devotional",
    links: [
      { to: "/aarti", label: "Aarti Library" },
      { to: "/chalisa", label: "Chalisa Library" },
      { to: "/mantra", label: "Mantra Library" },
      { to: "/pathshala", label: "🏫 पाठशाला | Bal Sanskar" },
      { to: "/sahasranam-sangrah", label: "सहस्रनाम संग्रह" },
      { to: "/jain-pujan", label: "जैन पूजन" },
      { to: "/jain-encyclopedia", label: "जैन विश्वकोश" },
      { to: "/ayurveda", label: "आयुर्वेद" },
      { to: "/herb-directory", label: "🌿 Jadi Buti" },
    ],
  },
  {
    title: "Tools & More",
    links: [
      { to: "/shop", label: "Spiritual Shop" },
      { to: "/calculator-index", label: "🔢 All Calculators" },
      { to: "/numerology", label: "Numerology" },
      { to: "/business-tools", label: "Business Tools" },
      { to: "/blog", label: "📖 Blog" },
      { to: "/web-stories", label: "✨ Web Stories" },
      { to: "/dashboard", label: "My Dashboard" },
      { to: "/favourites", label: "♥ My Favourites" },
      { to: "/booking-history", label: "🕰️ Booking History" },
      { to: "/admin-cms", label: "Admin CMS" },
    ],
  },
  {
    title: "Horoscope",
    links: [
      { to: "/horoscope?type=daily", label: "Daily Horoscope" },
      { to: "/horoscope?type=love", label: "Today's Love Horoscope" },
      { to: "/horoscope?type=yesterday", label: "Yesterday's Horoscope" },
      { to: "/horoscope?type=tomorrow", label: "Tomorrow's Horoscope" },
      { to: "/horoscope?type=weekly", label: "Weekly Horoscope" },
      { to: "/horoscope?type=monthly", label: "Monthly Horoscope" },
      { to: "/horoscope?type=yearly", label: "Yearly Horoscope" },
    ],
  },
  {
    title: "Shubh Muhurat 2026",
    links: [
      { to: "/panchang?ceremony=annaprashan", label: "Annanprashan" },
      { to: "/panchang?ceremony=naamkaran", label: "Naamkaran" },
      { to: "/panchang?ceremony=car-bike", label: "Car / Bike Muhurat" },
      { to: "/panchang?ceremony=marriage", label: "Marriage Muhurat" },
      { to: "/panchang?ceremony=bhoomi-pujan", label: "Bhoomi Pujan" },
      { to: "/panchang?ceremony=griha-pravesh", label: "Griha Pravesh" },
      { to: "/panchang?ceremony=mundan", label: "Mundan Muhurat" },
    ],
  },
  {
    title: "Important Links",
    links: [
      { to: "/shop", label: "Spiritual Connect Store" },
      { to: "/pricing", label: "💰 Pricing & Plans" },
      { to: "/live-panchang", label: "Today Panchang" },
      { to: "/astrologer", label: "Live Astrologers" },
      { to: "/horoscope", label: "Free Kundli" },
      { to: "/horoscope", label: "Kundli Matching" },
      { to: "/astrologer", label: "Chat with Astrologer" },
      { to: "/astrologer", label: "Talk to Astrologer" },
      { to: "/horoscope", label: "Astrology Yoga" },
      { to: "/horoscope", label: "Kaalsarp Dosha" },
      { to: "/calculator/nakshatra", label: "Nakshatras Constellations" },
      { to: "/numerology", label: "Numerology" },
      { to: "/mantra", label: "Mantras" },
      { to: "/horoscope", label: "Zodiac Signs" },
      { to: "/calculator/love", label: "Love Calculator" },
      { to: "/calculator/birth-chart", label: "Birth Chart" },
      { to: "/vastu", label: "Vastu Shastra" },
      { to: "/blog", label: "Spiritual Blog" },
      { to: "/calculator-index", label: "All Calculators" },
      { to: "/newsletter", label: "📧 न्यूज़लेटर / Newsletter" },
    ],
  },
  {
    title: "Shop Products",
    links: [
      { to: "/yantra-shop", label: "🔯 Puja Yantras" },
      { to: "/yantra-shop", label: "🪬 Hanging Yantras" },
      { to: "/yantra-shop", label: "🏺 Chowki Yantras" },
      { to: "/yantra-info", label: "📖 Yantra Info" },
      { to: "/shop?category=evil-eye", label: "Evil Eye" },
      { to: "/shop?category=rudraksha", label: "Rudraksha" },
      { to: "/shop?category=karungali", label: "Karungali" },
      {
        to: "/shop?category=gemstone-consultation",
        label: "Gemstone Consultation",
      },
      { to: "/shop?category=gemstones", label: "Buy Gemstones" },
      { to: "/gemstones", label: "💎 Gemstone Library" },
      { to: "/yantras", label: "🔯 Yantra Library" },
      { to: "/shop?category=pyrite", label: "Pyrite" },
      { to: "/shop?category=selenite", label: "Selenite" },
      {
        to: "/shop?category=rudraksha-bracelet-men",
        label: "Rudraksha Bracelet For Men",
      },
      {
        to: "/shop?category=rudraksha-bracelet-women",
        label: "Rudraksha Bracelet For Women",
      },
      { to: "/shop?category=murtis", label: "Murtis and Idols" },
      { to: "/shop?category=raw-pyrite", label: "Raw Pyrite Stone" },
      {
        to: "/shop?category=money-magnet-bracelet",
        label: "Money Magnet Bracelet",
      },
    ],
  },
];

export default function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems);
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;
  const megaRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (e: unknown) {
        const err = e as Error;
        if (err.message === "User is already authenticated") {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const appId = encodeURIComponent(
    window.location.hostname || "spiritual-connect",
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Stripe Setup */}
      <StripePaymentSetup />

      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.26 0.08 28) 100%)",
          borderColor: "oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/assets/generated/logo-om.dim_256x256.png"
                alt="SpiritualConnect"
                className="h-10 w-10 object-contain"
              />
              <div>
                <span
                  className="font-decorative text-lg font-bold block leading-tight"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  SpiritualConnect
                </span>
                <span
                  className="text-xs font-body block"
                  style={{ color: "oklch(0.78 0.14 75 / 0.6)" }}
                >
                  Your Divine Companion
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to + link.label}
                  to={link.to}
                  className="px-3 py-2 rounded-md text-xs font-heading font-medium tracking-wide transition-all duration-200 hover:bg-white/10"
                  style={{ color: "oklch(0.88 0.06 75)" }}
                  activeProps={{
                    style: {
                      color: "oklch(0.78 0.14 75)",
                      background: "oklch(0.78 0.14 75 / 0.12)",
                    },
                  }}
                >
                  {link.label.split(" ")[0]} {t(link.tKey)}
                </Link>
              ))}

              {/* Panchang Dropdown */}
              <DropdownMenu
                items={PANCHANG_MENU}
                label="Panchang"
                labelHi="पंचांग"
                isHindi={language === "hi"}
                onClose={() => setMegaMenuOpen(false)}
              />
              {/* Astronomy Dropdown */}
              <DropdownMenu
                items={ASTRONOMY_MENU}
                label="Astronomy"
                labelHi="खगोल"
                isHindi={language === "hi"}
                onClose={() => setMegaMenuOpen(false)}
              />
              {/* Yoga Dropdown */}
              <DropdownMenu
                items={AUSPICIOUS_YOGA_MENU}
                label="Yoga"
                labelHi="योग"
                isHindi={language === "hi"}
                onClose={() => setMegaMenuOpen(false)}
              />
              {/* Muhurat Dropdown */}
              <DropdownMenu
                items={MUHURAT_MENU}
                label="Muhurat"
                labelHi="मुहूर्त"
                isHindi={language === "hi"}
                onClose={() => setMegaMenuOpen(false)}
              />
              {/* Astrology Dropdown */}
              <DropdownMenu
                items={ASTROLOGY_MENU}
                label="Astrology"
                labelHi="ज्योतिष"
                isHindi={language === "hi"}
                onClose={() => setMegaMenuOpen(false)}
              />

              {/* Mega Menu */}
              <div className="relative" ref={megaRef}>
                <button
                  type="button"
                  className="px-3 py-2 rounded-md text-xs font-heading font-medium tracking-wide flex items-center gap-1 hover:bg-white/10 transition-all"
                  style={{ color: "oklch(0.88 0.06 75)" }}
                  onClick={() => setMegaMenuOpen((v) => !v)}
                  data-ocid="nav.more_button"
                >
                  {t("more")}{" "}
                  <ChevronDown
                    className={`h-3 w-3 transition-transform ${megaMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {megaMenuOpen && (
                  <div
                    className="absolute top-full right-0 mt-2 rounded-xl shadow-2xl border overflow-auto z-50"
                    style={{
                      background: "oklch(0.20 0.08 22)",
                      borderColor: "oklch(0.78 0.14 75 / 0.2)",
                      maxHeight: "82vh",
                      width: "760px",
                    }}
                    data-ocid="nav.dropdown_menu"
                  >
                    {/* Shop Section — featured grid */}
                    <div
                      className="p-4 border-b"
                      style={{ borderColor: "oklch(0.78 0.14 75 / 0.15)" }}
                    >
                      <p
                        className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5"
                        style={{ color: "oklch(0.78 0.14 75)" }}
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                        {shopSection.title}
                      </p>
                      <div className="grid grid-cols-4 gap-x-4 gap-y-0.5">
                        {shopSection.links.map((link) => {
                          const isGold = link.label.startsWith("🧠");
                          return (
                            <Link
                              key={link.to + link.label}
                              to={link.to}
                              onClick={() => setMegaMenuOpen(false)}
                              className="flex items-center px-2 py-1 text-xs rounded-lg transition-colors hover:bg-white/10 font-semibold"
                              style={{
                                color: isGold
                                  ? "oklch(0.78 0.14 75)"
                                  : "oklch(0.88 0.06 75)",
                              }}
                              data-ocid="nav.shop.link"
                            >
                              {link.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* Jain Department — full-width grouped section */}
                    <div
                      className="p-4 border-b"
                      style={{ borderColor: "oklch(0.78 0.14 75 / 0.15)" }}
                    >
                      <p
                        className="text-xs font-bold uppercase tracking-wider mb-3"
                        style={{ color: "oklch(0.78 0.14 75)" }}
                      >
                        {jainDepartmentSection.title}
                      </p>
                      <div className="grid grid-cols-4 gap-4">
                        {jainDepartmentSection.groups.map((group) => (
                          <div key={group.heading}>
                            <p
                              className="text-[10px] font-semibold uppercase tracking-wider mb-1.5"
                              style={{ color: "oklch(0.68 0.12 65)" }}
                            >
                              {group.heading}
                            </p>
                            <div className="space-y-0.5">
                              {group.links.map((link) => (
                                <Link
                                  key={link.to + link.label}
                                  to={link.to}
                                  onClick={() => setMegaMenuOpen(false)}
                                  className="flex items-center px-2 py-1 text-xs rounded-lg transition-colors hover:bg-white/10"
                                  style={{ color: "oklch(0.88 0.06 75)" }}
                                  data-ocid="nav.link"
                                >
                                  {link.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Other sections — 2-column grid */}
                    <div className="grid grid-cols-2 gap-0">
                      {megaMenuSections.slice(1).map((section, sIdx) => (
                        <div
                          key={section.title}
                          className="p-4 border-b"
                          style={{
                            borderColor: "oklch(0.78 0.14 75 / 0.12)",
                            borderRight:
                              sIdx % 2 === 0
                                ? "1px solid oklch(0.78 0.14 75 / 0.12)"
                                : "none",
                          }}
                        >
                          <p
                            className="text-xs font-bold uppercase tracking-wider mb-2"
                            style={{ color: "oklch(0.78 0.14 75)" }}
                          >
                            {section.title}
                          </p>
                          <div className="space-y-0.5">
                            {section.links.map((link) => (
                              <Link
                                key={link.to + link.label}
                                to={link.to}
                                onClick={() => setMegaMenuOpen(false)}
                                className="flex items-center px-2 py-1.5 text-xs rounded-lg transition-colors hover:bg-white/10"
                                style={{ color: "oklch(0.88 0.06 75)" }}
                                data-ocid="nav.link"
                              >
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <div className="hidden sm:block">
                <LanguageToggle />
              </div>

              {/* Search button */}
              <button
                type="button"
                onClick={() => navigate({ to: "/search" })}
                className="p-2 rounded-full transition-colors hover:bg-white/10"
                style={{ color: "oklch(0.88 0.06 75)" }}
                aria-label="Search"
                data-ocid="nav.search_button"
              >
                <Search className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className="relative p-2 rounded-full transition-colors hover:bg-white/10"
                style={{ color: "oklch(0.88 0.06 75)" }}
                aria-label="Shopping cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems() > 0 && (
                  <span
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full text-xs flex items-center justify-center font-bold"
                    style={{
                      background: "oklch(0.68 0.20 48)",
                      color: "white",
                    }}
                  >
                    {totalItems()}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={handleAuth}
                disabled={loginStatus === "logging-in"}
                className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-heading font-semibold transition-all duration-200 disabled:opacity-50"
                style={{
                  background: isAuthenticated
                    ? "oklch(0.78 0.14 75 / 0.15)"
                    : "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                  color: "oklch(0.95 0.01 80)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.3)",
                }}
              >
                {loginStatus === "logging-in"
                  ? t("connecting")
                  : isAuthenticated
                    ? t("logout")
                    : t("login")}
              </button>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-md transition-colors hover:bg-white/10"
                style={{ color: "oklch(0.88 0.06 75)" }}
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div
            className="lg:hidden border-t px-4 py-3"
            style={{
              background: "oklch(0.18 0.07 22)",
              borderColor: "oklch(0.78 0.14 75 / 0.15)",
            }}
          >
            <div className="space-y-1 max-h-[70vh] overflow-y-auto">
              {allMobileLinks.map((link) => (
                <Link
                  key={link.to + link.label}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-md text-sm font-heading transition-colors hover:bg-white/10"
                  style={{ color: "oklch(0.88 0.06 75)" }}
                  data-ocid="nav.mobile.link"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {/* Language toggle visible in mobile menu */}
            <div className="mt-3 flex justify-center sm:hidden">
              <LanguageToggle />
            </div>
            <button
              type="button"
              onClick={() => {
                handleAuth();
                setMobileOpen(false);
              }}
              disabled={loginStatus === "logging-in"}
              className="w-full mt-3 px-4 py-2 rounded-full text-sm font-heading font-semibold transition-all disabled:opacity-50"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                color: "white",
              }}
            >
              {loginStatus === "logging-in"
                ? t("connecting")
                : isAuthenticated
                  ? t("logout")
                  : t("login")}
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer
        className="border-t mt-16"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.07 22) 0%, oklch(0.14 0.05 20) 100%)",
          borderColor: "oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        {/* Lotus Divider */}
        <div className="w-full overflow-hidden" style={{ maxHeight: "60px" }}>
          <img
            src="/assets/generated/divider-lotus.dim_1200x80.png"
            alt=""
            className="w-full object-cover opacity-40"
          />
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4
                  className="font-heading font-semibold text-sm mb-4 tracking-wider uppercase"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm font-body transition-colors hover:text-gold"
                        style={{ color: "oklch(0.70 0.04 60)" }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderColor: "oklch(0.78 0.14 75 / 0.15)" }}
          >
            <div className="flex items-center gap-2">
              <img
                src="/assets/generated/logo-om.dim_256x256.png"
                alt="SpiritualConnect"
                className="h-8 w-8 object-contain opacity-80"
              />
              <span
                className="font-decorative text-sm"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                SpiritualConnect
              </span>
            </div>

            <p
              className="text-xs font-body text-center"
              style={{ color: "oklch(0.55 0.04 50)" }}
            >
              © {new Date().getFullYear()} SpiritualConnect.{" "}
              {t("allRightsReserved")}
            </p>

            <p
              className="text-xs font-body flex items-center gap-1"
              style={{ color: "oklch(0.55 0.04 50)" }}
            >
              {t("builtWith")}{" "}
              <Heart
                className="h-3 w-3 inline"
                style={{
                  color: "oklch(0.68 0.20 48)",
                  fill: "oklch(0.68 0.20 48)",
                }}
              />{" "}
              {t("using")}{" "}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Shopping Cart Panel */}
      <ShoppingCartPanel open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Unified Media Player — persistent across all pages */}
      <UnifiedMediaPlayer />
    </div>
  );
}
