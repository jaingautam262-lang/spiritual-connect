import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCartStore } from "../stores/cartStore";
import LanguageToggle from "./LanguageToggle";
import ShoppingCartPanel from "./ShoppingCartPanel";
import StripePaymentSetup from "./StripePaymentSetup";
import UnifiedMediaPlayer from "./UnifiedMediaPlayer";

interface LayoutProps {
  children: React.ReactNode;
}

const navLinks = [
  { to: "/aarti", label: "🧘 Aarti" },
  { to: "/chalisa", label: "📖 Chalisa" },
  { to: "/mantra", label: "🔔 Mantra" },
  { to: "/stotra", label: "💿 Stotra" },
  { to: "/kavach", label: "🛡️ कवच" },
  { to: "/energized-products", label: "🌰 Energized Products" },
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
      { to: "/auspicious-times", label: "🌟 Auspicious Times | शुभ मुहूर्त" },
      { to: "/live-panchang", label: "📅 Live Panchang" },
      { to: "/shadow-planets", label: "☊ Shadow Planets" },
      { to: "/current-transits", label: "🪐 Current Transits" },
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
    title: "🕉️ सहस्रनाम",
    links: [
      { to: "/sahasranam-sangrah", label: "✨ सहस्रनाम संग्रह" },
      { to: "/sahasranam", label: "सहस्रनाम लाइब्रेरी" },
      { to: "/stuti", label: "स्तुति लाइब्रेरी" },
      { to: "/ashtakam", label: "अष्टकम लाइब्रेरी" },
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
    ],
  },
  {
    title: "🛕 मंदिर & सेवाएं",
    links: [
      { to: "/chadhava", label: "🪔 Chadhava & Sacred Bhet" },
      { to: "/virtual-temple", label: "My Temple" },
      { to: "/temples", label: "Temple Directory" },
      { to: "/temple-services", label: "Puja Services" },
      { to: "/pujas-catalog", label: "🙏 Book a Puja" },
      { to: "/puja-booking", label: "📋 Puja Booking" },
      { to: "/booking-history", label: "🕰️ बुकिंग इतिहास" },
      { to: "/puja-types", label: "📋 Puja Types Directory" },
      { to: "/puja-reports", label: "🗒️ Puja Reports" },
      { to: "/energized-products", label: "🌰 Energized Products" },
      { to: "/shop", label: "Shop" },
      { to: "/yantra-shop", label: "🔯 यंत्र शॉप / Yantra Shop" },
      { to: "/yantra-info", label: "📖 यंत्र जानकारी / Yantra Info" },
      { to: "/gemstones/emerald", label: "💚 Emerald (Panna) Stone" },
    ],
  },
  {
    title: "🔢 संख्या विज्ञान & व्यापार",
    links: [
      { to: "/calculator-index", label: "🔢 All Calculators" },
      { to: "/numerology", label: "Numerology" },
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
    ],
  },
  {
    title: "⚙️ Divine Tools & Admin",
    links: [
      { to: "/divine-info", label: "Divine Info" },
      { to: "/dashboard", label: "Dashboard" },
      { to: "/admin-cms", label: "Admin CMS" },
    ],
  },
  {
    title: "🌿 आयुर्वेद",
    links: [{ to: "/ayurveda", label: "✨ आयुर्वेद & घरेलू नुस्खे" }],
  },
  {
    title: "📝 Blog & Stories",
    links: [
      { to: "/blog", label: "📖 Spiritual Blog" },
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
  { to: "/shop", label: "Shop" },
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
  { to: "/divine-info", label: "Divine Info" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/astrologer-dashboard", label: "Admin Dashboard" },
  { to: "/admin-cms", label: "Admin CMS" },
  { to: "/ayurveda", label: "🌿 आयुर्वेद" },
  { to: "/blog", label: "📖 Spiritual Blog" },
  { to: "/web-stories", label: "✨ Web Stories" },
  { to: "/festival-calendar", label: "📅 Festival Calendar" },
  { to: "/surya-dev", label: "☀️ Surya Deva" },
  { to: "/hindu-calendar", label: "📅 Hindu Calendar" },
  { to: "/top-hindu-festivals", label: "🏆 Top 25 Hindu Festivals" },
  { to: "/top-hindu-festivals-20", label: "Top 20 Hindu Festivals" },
  { to: "/top-hindu-festivals-10", label: "Top 10 Hindu Festivals" },
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
                  {link.label}
                </Link>
              ))}

              {/* Mega Menu */}
              <div className="relative" ref={megaRef}>
                <button
                  type="button"
                  className="px-3 py-2 rounded-md text-xs font-heading font-medium tracking-wide flex items-center gap-1 hover:bg-white/10 transition-all"
                  style={{ color: "oklch(0.88 0.06 75)" }}
                  onClick={() => setMegaMenuOpen((v) => !v)}
                  data-ocid="nav.more_button"
                >
                  More{" "}
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
                  ? "Connecting..."
                  : isAuthenticated
                    ? "Logout"
                    : "Login"}
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
                ? "Connecting..."
                : isAuthenticated
                  ? "Logout"
                  : "Login"}
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
              © {new Date().getFullYear()} SpiritualConnect. All rights
              reserved.
            </p>

            <p
              className="text-xs font-body flex items-center gap-1"
              style={{ color: "oklch(0.55 0.04 50)" }}
            >
              Built with{" "}
              <Heart
                className="h-3 w-3 inline"
                style={{
                  color: "oklch(0.68 0.20 48)",
                  fill: "oklch(0.68 0.20 48)",
                }}
              />{" "}
              using{" "}
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
