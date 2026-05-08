import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  FileText,
  Gem,
  Hash,
  Home as HomeIcon,
  Shield,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import PanchangWidget from "../components/PanchangWidget";
import { useLanguage } from "../contexts/LanguageContext";
import { DEVOTIONAL_QUOTES } from "../data/devotionalQuotes";
import { RASHIS } from "../data/rashifalData";

const newAdditions = [
  {
    to: "/gemstones",
    icon: "💎",
    title: "Gemstone Library",
    titleHi: "रत्न पुस्तकालय",
    desc: "All 9 Navgrah gems + 12 Rashi gems with wearing procedure & mantras",
    color: "oklch(0.68 0.20 280)",
    gradient:
      "linear-gradient(135deg, oklch(0.18 0.12 270), oklch(0.24 0.10 290))",
  },
  {
    to: "/yantras",
    icon: "🔯",
    title: "Yantra Library",
    titleHi: "यंत्र पुस्तकालय",
    desc: "Shri Yantra, Kuber, Navgrah, Jain Yantras — activation mantras & placement",
    color: "oklch(0.78 0.14 75)",
    gradient:
      "linear-gradient(135deg, oklch(0.20 0.10 45), oklch(0.26 0.12 60))",
  },
  {
    to: "/guru-directory",
    icon: "🧘",
    title: "Guru Directory",
    titleHi: "गुरु निर्देशिका",
    desc: "Hindu, Jain & Sikh Gurus — life, teachings, lineage",
    color: "oklch(0.65 0.18 25)",
    gradient:
      "linear-gradient(135deg, oklch(0.18 0.10 20), oklch(0.24 0.08 35))",
  },
  {
    to: "/daan-seva",
    icon: "🤲",
    title: "Daan & Seva",
    titleHi: "दान और सेवा",
    desc: "Types of Daan, Jain Dana, Sikh Seva — significance & occasions",
    color: "oklch(0.55 0.18 160)",
    gradient:
      "linear-gradient(135deg, oklch(0.18 0.12 170), oklch(0.24 0.10 155))",
  },
  {
    to: "/shadow-planets",
    icon: "🌑",
    title: "Shadow Planets",
    titleHi: "छाया ग्रह (राहु-केतु)",
    desc: "Rahu & Ketu in all 12 houses, axis effects, Mahadasha & remedies",
    color: "oklch(0.70 0.14 280)",
    gradient:
      "linear-gradient(135deg, oklch(0.20 0.12 270), oklch(0.26 0.10 290))",
  },
  {
    to: "/tantra-remedies",
    icon: "🛡️",
    title: "Tantra Remedies",
    titleHi: "तंत्र उपाय",
    desc: "Kala Jadu, Nazar Dosh, Vashikaran — symptoms, mantras & kavach",
    color: "oklch(0.68 0.20 48)",
    gradient:
      "linear-gradient(135deg, oklch(0.22 0.10 30), oklch(0.28 0.12 45))",
  },
];

export default function Home() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const { language, t } = useLanguage();

  useEffect(() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
        86400000,
    );
    setQuoteIndex(dayOfYear % DEVOTIONAL_QUOTES.length);
  }, []);

  const quote = DEVOTIONAL_QUOTES[quoteIndex];

  const features = [
    {
      icon: Users,
      title: "Authentic Astrologers",
      desc: "Verified experts with years of experience in Vedic astrology, numerology, and more.",
    },
    {
      icon: HomeIcon,
      title: "Verified Temples",
      desc: "50+ renowned temples across India for puja bookings and virtual offerings.",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      desc: "Stripe-powered secure checkout for all transactions and wallet recharges.",
    },
    {
      icon: FileText,
      title: "Personalized Reports",
      desc: "16+ detailed astrological reports tailored to your birth chart.",
    },
    {
      icon: Gem,
      title: "Energized Products",
      desc: "Certified gemstones, Rudraksha, yantras and Nav Grah murtis.",
    },
    {
      icon: Hash,
      title: "Numerology Tools",
      desc: "Chaldean numerology, Lo Shu Grid, and business name analysis.",
    },
  ];

  const devotionalCTAs = [
    {
      to: "/bhajan-library",
      icon: "🎵",
      title: "Bhajan Library",
      desc: "Full music player with 12+ bhajans, voice search, and playlist",
      color: "oklch(0.68 0.20 48)",
    },
    {
      to: "/vrat-katha",
      icon: "📿",
      title: "Vrat Katha",
      desc: "Sacred stories for major vrats & festivals with audio playback",
      color: "oklch(0.58 0.18 140)",
    },
    {
      to: "/holy-books",
      icon: "📖",
      title: "Holy Books Audio",
      desc: "All major Hindu scriptures with chapter-by-chapter audio player",
      color: "oklch(0.55 0.18 260)",
    },
  ];

  const phaseSections = [
    {
      to: "/aarti",
      icon: "🪔",
      title: "Aarti Sangrah",
      titleHi: "आरती संग्रह",
      desc: "16+ sacred aartis — Hindu, Jain & Sikh with full lyrics",
      color: "oklch(0.68 0.20 48)",
      gradient:
        "linear-gradient(135deg, oklch(0.22 0.10 30), oklch(0.28 0.12 45))",
    },
    {
      to: "/chalisa",
      icon: "📖",
      title: "Chalisa Sangrah",
      titleHi: "चालीसा संग्रह",
      desc: "12+ chalisas including full Hanuman Chalisa with 40 chaupais",
      color: "oklch(0.70 0.14 280)",
      gradient:
        "linear-gradient(135deg, oklch(0.20 0.12 270), oklch(0.26 0.10 290))",
    },
    {
      to: "/mantra",
      icon: "🔔",
      title: "Mantra Sangrah",
      titleHi: "मंत्र संग्रह",
      desc: "15+ mantras with Sanskrit text, transliteration & meanings",
      color: "oklch(0.55 0.18 160)",
      gradient:
        "linear-gradient(135deg, oklch(0.18 0.12 170), oklch(0.24 0.10 155))",
    },
    {
      to: "/temples",
      icon: "🛕",
      title: "Temple Directory",
      titleHi: "मंदिर निर्देशिका",
      desc: "20+ major temples with full history — Hindu, Jain & Sikh",
      color: "oklch(0.78 0.14 75)",
      gradient:
        "linear-gradient(135deg, oklch(0.20 0.08 30), oklch(0.26 0.10 50))",
    },
    {
      to: "/kavach",
      icon: "🛡️",
      title: "Kavach Sangrah",
      titleHi: "कवच संग्रह",
      desc: "76+ protective kavachs — Hindu deities with full Hindi text",
      color: "oklch(0.65 0.18 25)",
      gradient:
        "linear-gradient(135deg, oklch(0.18 0.10 20), oklch(0.24 0.08 35))",
    },
    {
      to: "/ashtakam",
      icon: "🕉️",
      title: "Ashtakam Sangrah",
      titleHi: "अष्टकम संग्रह",
      desc: "6+ Ashtakams with Hindi text, meaning, benefits & deity info",
      color: "oklch(0.68 0.20 75)",
      gradient:
        "linear-gradient(135deg, oklch(0.20 0.10 45), oklch(0.26 0.12 60))",
    },
    {
      to: "/stuti",
      icon: "🙏",
      title: "Stuti Sangrah",
      titleHi: "स्तुति संग्रह",
      desc: "25+ Stutis with Hindi text, meaning, benefits & deity info",
      color: "oklch(0.70 0.18 80)",
      gradient:
        "linear-gradient(135deg, oklch(0.18 0.08 40), oklch(0.24 0.10 55))",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "520px" }}
      >
        <img
          src="/assets/generated/hero-banner.dim_1400x600.png"
          alt="SpiritualConnect Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.18 0.06 25 / 0.55) 0%, oklch(0.12 0.04 20 / 0.80) 100%)",
          }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-24 min-h-[520px]">
          <div className="animate-om-glow mb-4">
            <span
              className="text-6xl md:text-8xl font-decorative"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              ॐ
            </span>
          </div>
          <h1
            className="font-decorative text-3xl md:text-5xl font-bold mb-4 leading-tight"
            style={{ color: "oklch(0.95 0.01 80)" }}
          >
            {t("yourCompleteCompanion")}
          </h1>
          <p
            className="font-body text-lg md:text-xl mb-8 max-w-2xl"
            style={{ color: "oklch(0.85 0.04 75)" }}
          >
            {t("heroSubtitle")}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { to: "/temple-services", label: `🛕 ${t("bookPuja")}` },
              { to: "/horoscope", label: `🔭 ${t("horoscope")}` },
              { to: "/astrologer", label: `🧘 ${t("astrologer")}` },
              { to: "/shop", label: `💎 ${t("shop")}` },
            ].map((cta) => (
              <Link
                key={cta.to}
                to={cta.to}
                className="px-6 py-3 rounded-full font-heading font-semibold text-sm tracking-wide transition-all duration-200 hover:scale-105"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                  color: "white",
                  border: "1px solid oklch(0.78 0.14 75 / 0.4)",
                  boxShadow: "0 4px 16px oklch(0.62 0.18 48 / 0.3)",
                }}
              >
                {cta.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lotus Divider */}
      <div className="w-full overflow-hidden" style={{ maxHeight: "60px" }}>
        <img
          src="/assets/generated/divider-lotus.dim_1200x80.png"
          alt=""
          className="w-full object-cover opacity-50"
        />
      </div>

      {/* Daily Panchang Widget */}
      <PanchangWidget />

      {/* Phase Sections — Aarti, Chalisa, Mantra, Temples */}
      <section
        className="py-14 px-4"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.16 0.06 22) 0%, oklch(0.20 0.08 26) 100%)",
        }}
      >
        <div className="container mx-auto">
          <h2
            className="font-decorative text-2xl md:text-3xl font-bold text-center mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {t("devotionalSangrah")}
          </h2>
          <p
            className="text-center font-body text-sm mb-8"
            style={{ color: "oklch(0.65 0.04 55)" }}
          >
            {t("devotionalSangrahSub")}
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {phaseSections.map((section) => (
              <Link
                key={section.to}
                to={section.to}
                className="group p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.03]"
                style={{
                  background: section.gradient,
                  borderColor: `${section.color}30`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    `${section.color}60`;
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    `0 8px 30px ${section.color}20`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    `${section.color}30`;
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {section.icon}
                </div>
                <h3
                  className="font-heading font-bold text-base mb-0.5 leading-tight"
                  style={{ color: section.color }}
                >
                  {language === "hi" ? section.titleHi : section.title}
                </h3>
                <p
                  className="font-body text-xs mb-2"
                  style={{ color: "oklch(0.70 0.06 65)", fontFamily: "serif" }}
                >
                  {language === "hi" ? section.title : section.titleHi}
                </p>
                <p
                  className="font-body text-xs leading-relaxed hidden sm:block"
                  style={{ color: "oklch(0.60 0.04 55)" }}
                >
                  {section.desc}
                </p>
                <div
                  className="flex items-center gap-1 mt-3 text-xs font-heading font-semibold"
                  style={{ color: section.color }}
                >
                  {t("explore")} <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Devotional Quote */}
      <section
        className="py-10 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.08 22), oklch(0.28 0.08 28))",
        }}
      >
        <div className="container mx-auto max-w-3xl text-center">
          <p
            className="font-heading text-xl md:text-2xl italic leading-relaxed mb-3"
            style={{ color: "oklch(0.88 0.06 75)" }}
          >
            "{quote.text}"
          </p>
          {quote.translation && (
            <p
              className="font-body text-sm mb-2"
              style={{ color: "oklch(0.70 0.06 65)" }}
            >
              {quote.translation}
            </p>
          )}
          <p
            className="font-heading text-xs tracking-widest uppercase"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            — {quote.source}
          </p>
        </div>
      </section>

      {/* New Devotional Sections CTA */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="section-title">🎵 {t("devotionalContent")}</h2>
          <p className="section-subtitle">{t("devotionalContentSub")}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {devotionalCTAs.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="temple-card p-6 group hover:scale-105 transition-transform"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3
                  className="font-heading font-bold text-lg mb-2 group-hover:underline"
                  style={{ color: item.color }}
                >
                  {item.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
                <div
                  className="flex items-center gap-1 mt-4 text-sm font-heading font-semibold"
                  style={{ color: item.color }}
                >
                  {t("explore")} <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Temples */}
      <section
        className="py-16 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 25), oklch(0.26 0.08 30))",
        }}
      >
        <div className="container mx-auto">
          <h2
            className="font-decorative text-2xl md:text-3xl font-bold text-center mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🛕 {t("featuredTemples")}
          </h2>
          <p
            className="text-center font-body text-sm mb-8"
            style={{ color: "oklch(0.65 0.04 55)" }}
          >
            {t("featuredTemplesSub")}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {[
              { name: "Tirupati Balaji", location: "Andhra Pradesh" },
              { name: "Golden Temple", location: "Amritsar, Punjab" },
              { name: "Kashi Vishwanath", location: "Varanasi, UP" },
              { name: "Somnath Temple", location: "Gujarat" },
              { name: "Meenakshi Amman", location: "Madurai, TN" },
              { name: "Shirdi Sai Baba", location: "Shirdi, MH" },
            ].map((temple) => (
              <Link
                key={temple.name}
                to="/temple-services"
                className="p-4 text-center group cursor-pointer rounded-xl border transition-all hover:scale-105"
                style={{
                  background: "oklch(0.24 0.08 28)",
                  borderColor: "oklch(0.78 0.14 75 / 0.2)",
                }}
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  🛕
                </div>
                <p
                  className="font-heading font-semibold text-xs leading-tight"
                  style={{ color: "oklch(0.88 0.06 75)" }}
                >
                  {temple.name}
                </p>
                <p
                  className="text-xs font-body mt-1"
                  style={{ color: "oklch(0.60 0.04 55)" }}
                >
                  {temple.location}
                </p>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/temple-services"
              className="inline-flex items-center gap-2 font-heading font-semibold text-sm"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              {t("viewAllTemples")} <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Zodiac Quick Selector */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="section-title">✨ {t("yourRashifal")}</h2>
          <p className="section-subtitle">{t("yourRashifalSub")}</p>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-3">
            {RASHIS.map((rashi) => (
              <Link
                key={rashi.id}
                to="/horoscope"
                search={{ rashi: rashi.id } as Record<string, string>}
                className="flex flex-col items-center p-3 rounded-xl border transition-all duration-200 hover:scale-105 cursor-pointer group"
                style={{
                  borderColor: "oklch(0.78 0.14 75 / 0.2)",
                  background: "oklch(0.99 0.008 80)",
                }}
              >
                <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                  {rashi.symbol}
                </span>
                <span
                  className="font-heading text-xs font-semibold text-center leading-tight"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  {rashi.hindiName}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section
        className="py-16 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.07 22), oklch(0.22 0.08 26))",
        }}
      >
        <div className="container mx-auto">
          <h2
            className="font-decorative text-2xl md:text-3xl font-bold text-center mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            💎 {t("sacredShop")}
          </h2>
          <p
            className="text-center font-body text-sm mb-8"
            style={{ color: "oklch(0.65 0.04 55)" }}
          >
            {t("sacredShopSub")}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            {[
              {
                icon: "💎",
                name: "Navgrah Gemstones",
                category: "Gemstones",
                price: "₹2,999",
              },
              {
                icon: "🔯",
                name: "Shri Yantra — Copper",
                category: "Yantras",
                price: "₹1,499",
              },
              {
                icon: "📿",
                name: "Rudraksha Mala (108)",
                category: "Rudraksha",
                price: "₹899",
              },
              {
                icon: "🪐",
                name: "Nav Grah Murti Set",
                category: "Murtis",
                price: "₹5,999",
              },
            ].map((product) => (
              <Link
                key={product.name}
                to="/shop"
                className="p-4 group rounded-xl border transition-all hover:scale-[1.03]"
                style={{
                  background: "oklch(0.22 0.08 26)",
                  borderColor: "oklch(0.78 0.14 75 / 0.2)",
                }}
              >
                <div
                  className="h-32 rounded-lg mb-3 flex items-center justify-center text-4xl"
                  style={{ background: "oklch(0.26 0.08 28)" }}
                >
                  {product.icon}
                </div>
                <p
                  className="font-heading font-semibold text-sm mb-1"
                  style={{ color: "oklch(0.92 0.06 75)" }}
                >
                  {product.name}
                </p>
                <p
                  className="text-xs font-body mb-2"
                  style={{ color: "oklch(0.60 0.04 55)" }}
                >
                  {product.category}
                </p>
                <p
                  className="font-heading font-bold"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {product.price}
                </p>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 font-heading font-semibold text-sm"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              {t("browseAllProducts")} <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        className="py-16 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.08 22), oklch(0.28 0.08 28))",
        }}
      >
        <div className="container mx-auto">
          <h2
            className="font-heading text-2xl md:text-3xl font-bold text-center mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {t("whyChooseUs")}
          </h2>
          <p
            className="text-center mb-10 font-body"
            style={{ color: "oklch(0.70 0.04 60)" }}
          >
            {t("whyChooseUsSub")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-xl border"
                style={{
                  background: "oklch(0.25 0.07 26)",
                  borderColor: "oklch(0.78 0.14 75 / 0.15)",
                }}
              >
                <div
                  className="h-12 w-12 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "oklch(0.78 0.14 75 / 0.15)" }}
                >
                  <f.icon
                    className="h-6 w-6"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  />
                </div>
                <h3
                  className="font-heading font-bold text-base mb-2"
                  style={{ color: "oklch(0.88 0.06 75)" }}
                >
                  {f.title}
                </h3>
                <p
                  className="font-body text-sm"
                  style={{ color: "oklch(0.65 0.04 55)" }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Additions */}
      <section
        className="py-16 px-4"
        data-ocid="new-additions.section"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.16 0.06 22) 0%, oklch(0.20 0.08 26) 100%)",
        }}
      >
        <div className="container mx-auto">
          <h2
            className="font-decorative text-2xl md:text-3xl font-bold text-center mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            ✨ {t("newAdditions")}
          </h2>
          <p
            className="text-center font-body text-sm mb-8"
            style={{ color: "oklch(0.65 0.04 55)" }}
          >
            {t("newAdditionsSub")}
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {newAdditions.map((item, i) => (
              <Link
                key={item.to}
                to={item.to}
                data-ocid={`new-additions.item.${i + 1}`}
                className="group p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.03]"
                style={{
                  background: item.gradient,
                  borderColor: `${item.color}30`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    `${item.color}60`;
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    `0 8px 30px ${item.color}20`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    `${item.color}30`;
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3
                  className="font-heading font-bold text-base mb-0.5 leading-tight"
                  style={{ color: item.color }}
                >
                  {language === "hi" ? item.titleHi : item.title}
                </h3>
                <p
                  className="font-body text-xs mb-2 hidden sm:block leading-relaxed"
                  style={{ color: "oklch(0.60 0.04 55)" }}
                >
                  {item.desc}
                </p>
                <div
                  className="flex items-center gap-1 mt-3 text-xs font-heading font-semibold"
                  style={{ color: item.color }}
                >
                  {t("explore")} <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ One App. Complete Vedic Guidance — 12-feature grid ═══ */}
      <section
        className="py-16 px-4"
        data-ocid="vedic-guidance.section"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.14 0.06 22) 0%, oklch(0.18 0.08 26) 50%, oklch(0.14 0.06 22) 100%)",
        }}
      >
        <div className="container mx-auto">
          {/* Ornamental top divider */}
          <div className="flex items-center gap-4 mb-10">
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, oklch(0.78 0.14 75 / 0.5), transparent)",
              }}
            />
            <span className="text-2xl" style={{ color: "oklch(0.78 0.14 75)" }}>
              ✦ ॐ ✦
            </span>
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, oklch(0.78 0.14 75 / 0.5), transparent)",
              }}
            />
          </div>

          <h2
            className="font-decorative text-2xl md:text-4xl font-bold text-center mb-2 leading-tight"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            एक ऐप। सम्पूर्ण वैदिक मार्गदर्शन
          </h2>
          <p
            className="text-center font-heading text-sm md:text-base tracking-widest uppercase mb-2"
            style={{ color: "oklch(0.68 0.20 48)" }}
          >
            One App. Complete Vedic Guidance
          </p>
          <p
            className="text-center font-body text-sm mb-10 max-w-xl mx-auto"
            style={{ color: "oklch(0.60 0.04 55)" }}
          >
            आरती से AI तक — आपकी आध्यात्मिक यात्रा का हर पड़ाव एक जगह
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              {
                icon: "🪔",
                titleHi: "आरती संग्रह",
                titleEn: "Aarti Library",
                desc: "66+ आरतियां सभी देवी-देवताओं की",
                to: "/aarti",
                accent: "oklch(0.68 0.20 48)",
              },
              {
                icon: "📿",
                titleHi: "चालीसा संग्रह",
                titleEn: "Chalisa Library",
                desc: "100+ चालीसा हिंदी अर्थ सहित",
                to: "/chalisa",
                accent: "oklch(0.70 0.14 280)",
              },
              {
                icon: "🕉",
                titleHi: "मंत्र संग्रह",
                titleEn: "Mantra Library",
                desc: "पवित्र मंत्र हिंदू, जैन और सिख परंपरा के",
                to: "/mantra",
                accent: "oklch(0.55 0.18 160)",
              },
              {
                icon: "📖",
                titleHi: "स्तोत्र संग्रह",
                titleEn: "Stotra Library",
                desc: "दिव्य स्तोत्र शक्ति और आशीर्वाद के लिए",
                to: "/stotra",
                accent: "oklch(0.65 0.18 25)",
              },
              {
                icon: "🌸",
                titleHi: "भगवद गीता",
                titleEn: "Bhagavad Gita",
                desc: "18 अध्याय | 700 श्लोक | 4 भाषाओं में",
                to: "/bhagavad-gita",
                accent: "oklch(0.72 0.16 140)",
              },
              {
                icon: "🤖",
                titleHi: "कृष्ण AI",
                titleEn: "Ask Krishna AI",
                desc: "गीता-आधारित जीवन मार्गदर्शन",
                to: "/ask-krishna",
                accent: "oklch(0.58 0.20 240)",
              },
              {
                icon: "📰",
                titleHi: "ब्लॉग",
                titleEn: "Blog & Articles",
                desc: "आध्यात्मिक लेख हिंदी में",
                to: "/blog",
                accent: "oklch(0.68 0.14 200)",
              },
              {
                icon: "🔮",
                titleHi: "जीवन रिपोर्ट",
                titleEn: "Life Reports",
                desc: "10 प्रकार की विस्तृत रिपोर्ट",
                to: "/life-reports",
                accent: "oklch(0.65 0.22 300)",
              },
              {
                icon: "🙏",
                titleHi: "पूजा बुकिंग",
                titleEn: "Puja Booking",
                desc: "ऑनलाइन पूजा बुक करें",
                to: "/puja-booking",
                accent: "oklch(0.68 0.20 48)",
              },
              {
                icon: "⭐",
                titleHi: "कुंडली रिपोर्ट",
                titleEn: "Kundli Report",
                desc: "200+ पेज व्यक्तिगत कुंडली",
                to: "/kundli-report",
                accent: "oklch(0.78 0.14 75)",
              },
              {
                icon: "📚",
                titleHi: "पवित्र ग्रंथ",
                titleEn: "Holy Books",
                desc: "हिंदू, जैन, सिख धर्मग्रंथ",
                to: "/holy-books",
                accent: "oklch(0.62 0.16 60)",
              },
              {
                icon: "🛕",
                titleHi: "मंदिर डायरेक्टरी",
                titleEn: "Temple Directory",
                desc: "भारत के प्रमुख मंदिर",
                to: "/temple-directory",
                accent: "oklch(0.68 0.18 30)",
              },
            ].map((card, i) => (
              <Link
                key={card.to}
                to={card.to}
                data-ocid={`vedic-guidance.item.${i + 1}`}
                className="group relative rounded-2xl p-4 flex flex-col transition-all duration-300 hover:scale-[1.04] hover:-translate-y-1"
                style={{
                  background:
                    "linear-gradient(145deg, oklch(0.20 0.08 26), oklch(0.24 0.09 30))",
                  border: `1px solid ${card.accent}25`,
                  boxShadow: "0 2px 12px oklch(0 0 0 / 0.3)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.border = `1px solid ${card.accent}60`;
                  el.style.boxShadow = `0 8px 32px ${card.accent}22`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.border = `1px solid ${card.accent}25`;
                  el.style.boxShadow = "0 2px 12px oklch(0 0 0 / 0.3)";
                }}
              >
                {/* Gold icon circle */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-3 transition-transform duration-200 group-hover:scale-110"
                  style={{
                    background: `${card.accent}18`,
                    border: `1px solid ${card.accent}35`,
                  }}
                >
                  {card.icon}
                </div>
                {/* Hindi title */}
                <h3
                  className="font-decorative font-bold text-sm leading-snug mb-0.5"
                  style={{ color: "oklch(0.88 0.06 40)" }}
                >
                  {card.titleHi}
                </h3>
                {/* English subtitle */}
                <p
                  className="font-heading text-xs mb-2 tracking-wide"
                  style={{ color: card.accent }}
                >
                  {card.titleEn}
                </p>
                {/* Description */}
                <p
                  className="font-body text-xs leading-relaxed flex-1 hidden sm:block"
                  style={{ color: "oklch(0.60 0.04 55)" }}
                >
                  {card.desc}
                </p>
                {/* देखें button */}
                <div
                  className="flex items-center gap-1 mt-3 text-xs font-heading font-semibold"
                  style={{ color: card.accent }}
                >
                  देखें <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>

          {/* Ornamental bottom divider */}
          <div className="flex items-center gap-4 mt-10">
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, oklch(0.78 0.14 75 / 0.5), transparent)",
              }}
            />
            <span className="text-xl" style={{ color: "oklch(0.68 0.20 48)" }}>
              🪷
            </span>
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, oklch(0.78 0.14 75 / 0.5), transparent)",
              }}
            />
          </div>
        </div>
      </section>

      {/* 369 Book Promo Banner */}
      <section
        className="py-6 px-4"
        data-ocid="book-promo.section"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.25 0.10 45) 0%, oklch(0.32 0.12 50) 50%, oklch(0.25 0.10 40) 100%)",
          borderTop: "1px solid oklch(0.78 0.14 75 / 0.3)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.3)",
        }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <span className="text-3xl">🌟</span>
              <div>
                <p
                  className="font-decorative font-bold text-base md:text-lg leading-tight"
                  style={{ color: "oklch(0.92 0.08 75)" }}
                >
                  369 आकर्षण का नियम — PDF बुक
                </p>
                <p
                  className="font-body text-xs"
                  style={{ color: "oklch(0.80 0.10 65)" }}
                >
                  Law of Attraction • 369 Method • Manifestation Guide
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span
                className="font-heading font-bold text-2xl"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                ₹96
              </span>
              <Link
                to="/369-book"
                data-ocid="book-promo.primary_button"
                className="px-6 py-2.5 rounded-full font-heading font-bold text-sm tracking-wide transition-all duration-200 hover:scale-105 whitespace-nowrap"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.78 0.14 75), oklch(0.68 0.20 48))",
                  color: "oklch(0.14 0.04 20)",
                  boxShadow: "0 4px 16px oklch(0.78 0.14 75 / 0.35)",
                }}
              >
                अभी खरीदें →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-background text-center">
        <div className="container mx-auto max-w-2xl">
          <div className="text-5xl mb-4 animate-float">🙏</div>
          <h2 className="section-title mb-4">{t("beginJourney")}</h2>
          <p className="section-subtitle mb-8">{t("beginJourneySub")}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/dashboard"
              className="px-8 py-3 rounded-full font-heading font-bold text-sm tracking-wide transition-all hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                color: "white",
              }}
            >
              {t("getStarted")}
            </Link>
            <Link
              to="/astrologer"
              className="px-8 py-3 rounded-full font-heading font-bold text-sm tracking-wide border transition-all hover:scale-105"
              style={{
                borderColor: "oklch(0.68 0.20 48)",
                color: "oklch(0.68 0.20 48)",
              }}
            >
              {t("talkToAstrologer")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
