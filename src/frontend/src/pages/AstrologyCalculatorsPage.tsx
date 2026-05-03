import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  Star,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import DashaCalculator from "../components/DashaCalculator";
import KundaliMatching from "../components/KundaliMatching";
import KundliGenerator from "../components/KundliGenerator";
import RashiCalculators from "../components/RashiCalculators";
import { CITIES } from "../utils/panchang/panchangConstants";
import type { PanchangCity } from "../utils/panchang/panchangTypes";
import {
  NAKSHATRAS,
  calculateJulianDay,
  calculateSiderealPositions,
  getZodiacSign,
} from "../utils/vedicAstrology";

// ── Types ──────────────────────────────────────────────────────────────────────

interface BirthForm {
  name: string;
  dob: string;
  tob: string;
  city: string;
}

interface BirthResult {
  rashi: string;
  rashiEn: string;
  rashiSymbol: string;
  rashiLord: string;
  sunSign: string;
  sunSignEn: string;
  nakshatra: string;
  nakshatraEn: string;
  nakshatraPada: number;
  nakshatraLord: string;
  lagna: string;
  lagnaEn: string;
  mangalDosha: "yes" | "no" | "partial";
  mangalDoshaReason: string;
  kalsarpaYoga: boolean;
  kalsarpaDesc: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function computeBirthResult(form: BirthForm): BirthResult | null {
  if (!form.dob || !form.tob || !form.city) return null;
  const city: PanchangCity | undefined = CITIES.find((c) => c.id === form.city);
  if (!city) return null;

  const [year, month, day] = form.dob.split("-").map(Number);
  const [hour, minute] = form.tob.split(":").map(Number);

  let positions: ReturnType<typeof calculateSiderealPositions>;
  try {
    const jd = calculateJulianDay(year, month, day, hour, minute, 0);
    positions = calculateSiderealPositions(jd, city.lat, city.lng);
  } catch {
    return null;
  }

  const moon = positions.Moon;
  const sun = positions.Sun;
  const asc = positions.ASC;

  const moonSign = getZodiacSign(moon.sign);
  const sunSign = getZodiacSign(sun.sign);
  const lagnaSign = getZodiacSign(asc.sign);
  const nakData = NAKSHATRAS ? NAKSHATRAS[moon.nakshatra - 1] : null;

  // Mangal Dosha — Mars in houses 1, 2, 4, 7, 8, 12 from ascendant
  const marsHouse = ((positions.Mars.sign - asc.sign + 12) % 12) + 1;
  const mangalHouses = [1, 2, 4, 7, 8, 12];
  const hasMangal = mangalHouses.includes(marsHouse);
  const isPartialMangal = [2, 12].includes(marsHouse);

  // Kalsarpa Yoga — all planets between Rahu and Ketu
  const rahu = positions.Rahu.longitude;
  const ketu = positions.Ketu.longitude;
  const planetLongitudes = [
    positions.Sun.longitude,
    positions.Moon.longitude,
    positions.Mars.longitude,
    positions.Mercury.longitude,
    positions.Jupiter.longitude,
    positions.Venus.longitude,
    positions.Saturn.longitude,
  ];
  const rahuKetu = rahu < ketu ? [rahu, ketu] : [ketu, rahu];
  const allBetween = planetLongitudes.every(
    (lon) => lon >= rahuKetu[0] && lon <= rahuKetu[1],
  );
  const allOutside = planetLongitudes.every(
    (lon) => lon < rahuKetu[0] || lon > rahuKetu[1],
  );
  const hasKalsarpa = allBetween || allOutside;

  return {
    rashi: moonSign.nameHi,
    rashiEn: moonSign.name,
    rashiSymbol:
      ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"][
        moon.sign - 1
      ] || "⭐",
    rashiLord: moonSign.lordHi,
    sunSign: sunSign.nameHi,
    sunSignEn: sunSign.name,
    nakshatra: nakData?.nameHi ?? "अश्विनी",
    nakshatraEn: nakData?.name ?? "Ashwini",
    nakshatraPada: moon.pada,
    nakshatraLord: nakData?.lord ?? "Ketu",
    lagna: lagnaSign.nameHi,
    lagnaEn: lagnaSign.name,
    mangalDosha: hasMangal ? (isPartialMangal ? "partial" : "yes") : "no",
    mangalDoshaReason: hasMangal
      ? `मंगल ${marsHouse}वें भाव में स्थित है (${isPartialMangal ? "आंशिक प्रभाव" : "पूर्ण मंगल दोष"})`
      : "मंगल दोष नहीं है — मंगल अनुकूल स्थान में है",
    kalsarpaYoga: hasKalsarpa,
    kalsarpaDesc: hasKalsarpa
      ? "काल सर्प योग उपस्थित — सभी ग्रह राहु-केतु के मध्य हैं"
      : "काल सर्प योग नहीं है",
  };
}

// ── Ornamental Divider ─────────────────────────────────────────────────────────

function OrnamentalDivider({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      {label && (
        <span
          className="text-xs font-heading font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
          style={{
            background: "oklch(0.78 0.14 75 / 0.15)",
            color: "oklch(0.55 0.16 55)",
            border: "1px solid oklch(0.78 0.14 75 / 0.3)",
          }}
        >
          ✦ {label} ✦
        </span>
      )}
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-border to-transparent" />
    </div>
  );
}

// ── Birth Result Display ───────────────────────────────────────────────────────

function BirthResultCard({
  result,
  name,
}: { result: BirthResult; name: string }) {
  const mangalColor =
    result.mangalDosha === "yes"
      ? "oklch(0.55 0.22 20)"
      : result.mangalDosha === "partial"
        ? "oklch(0.65 0.18 65)"
        : "oklch(0.55 0.18 140)";
  const MangalIcon =
    result.mangalDosha === "yes"
      ? XCircle
      : result.mangalDosha === "partial"
        ? AlertTriangle
        : CheckCircle;

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* Header */}
      <div
        className="text-center py-5 px-4 rounded-2xl"
        style={{
          background: "oklch(0.78 0.14 75 / 0.12)",
          border: "1px solid oklch(0.78 0.14 75 / 0.3)",
        }}
      >
        <div className="text-4xl mb-2">🌟</div>
        <h3
          className="font-heading text-xl font-bold"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          {name || "आपकी"}
        </h3>
        <p className="font-body text-sm text-muted-foreground">
          जन्म कुंडली परिणाम
        </p>
      </div>

      {/* Primary Results Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          {
            icon: "🌙",
            label: "राशि (Rashi)",
            value: result.rashi,
            sub: result.rashiEn,
            symbol: result.rashiSymbol,
          },
          {
            icon: "☀️",
            label: "सूर्य राशि (Sun Sign)",
            value: result.sunSign,
            sub: result.sunSignEn,
            symbol: "",
          },
          {
            icon: "⭐",
            label: "नक्षत्र",
            value: result.nakshatra,
            sub: `Pada ${result.nakshatraPada}`,
            symbol: "",
          },
          {
            icon: "🌅",
            label: "लग्न (Ascendant)",
            value: result.lagna,
            sub: result.lagnaEn,
            symbol: "",
          },
          {
            icon: "🪐",
            label: "राशि स्वामी",
            value: result.rashiLord,
            sub: "Rashi Lord",
            symbol: "",
          },
          {
            icon: "💫",
            label: "नक्षत्र स्वामी",
            value: result.nakshatraLord,
            sub: `${result.nakshatraEn}`,
            symbol: "",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl p-4 text-center"
            style={{
              background: "oklch(0.99 0.008 80)",
              border: "1px solid oklch(0.85 0.04 70)",
            }}
          >
            <div className="text-2xl mb-1">{item.symbol || item.icon}</div>
            <div
              className="font-heading font-bold text-sm"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              {item.value}
            </div>
            <div className="text-xs text-muted-foreground">{item.sub}</div>
            <div
              className="text-xs mt-1 font-body"
              style={{ color: "oklch(0.55 0.16 55)" }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>

      <OrnamentalDivider label="Dosha Analysis" />

      {/* Mangal Dosha */}
      <div
        className="rounded-xl p-4 flex items-start gap-3"
        style={{
          background: `${mangalColor}15`,
          border: `1px solid ${mangalColor}40`,
        }}
      >
        <MangalIcon
          size={20}
          style={{ color: mangalColor, flexShrink: 0, marginTop: 2 }}
        />
        <div>
          <div
            className="font-heading font-bold text-sm"
            style={{ color: mangalColor }}
          >
            मंगल दोष:{" "}
            {result.mangalDosha === "yes"
              ? "उपस्थित"
              : result.mangalDosha === "partial"
                ? "आंशिक"
                : "नहीं है"}
          </div>
          <div className="font-body text-xs text-muted-foreground mt-0.5">
            {result.mangalDoshaReason}
          </div>
          {result.mangalDosha !== "no" && (
            <div className="text-xs mt-1" style={{ color: mangalColor }}>
              उपाय: मंगलवार को हनुमान चालीसा पाठ, लाल वस्त्र दान, मूंगा रत्न धारण करें
            </div>
          )}
        </div>
      </div>

      {/* Kalsarpa Yoga */}
      <div
        className="rounded-xl p-4 flex items-start gap-3"
        style={{
          background: result.kalsarpaYoga
            ? "oklch(0.55 0.18 270 / 0.1)"
            : "oklch(0.55 0.18 140 / 0.1)",
          border: result.kalsarpaYoga
            ? "1px solid oklch(0.55 0.18 270 / 0.35)"
            : "1px solid oklch(0.55 0.18 140 / 0.35)",
        }}
      >
        <span className="text-xl flex-shrink-0">🐍</span>
        <div>
          <div
            className="font-heading font-bold text-sm"
            style={{
              color: result.kalsarpaYoga
                ? "oklch(0.45 0.2 270)"
                : "oklch(0.45 0.18 140)",
            }}
          >
            काल सर्प योग: {result.kalsarpaYoga ? "उपस्थित" : "नहीं है"}
          </div>
          <div className="font-body text-xs text-muted-foreground mt-0.5">
            {result.kalsarpaDesc}
          </div>
          {result.kalsarpaYoga && (
            <div
              className="text-xs mt-1"
              style={{ color: "oklch(0.45 0.2 270)" }}
            >
              उपाय: नागपंचमी पर नाग देवता की पूजा, राहु-केतु मंत्र जाप करें
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Section Header ─────────────────────────────────────────────────────────────

function SectionHeader({
  icon,
  title,
  desc,
}: { icon: string; title: string; desc: string }) {
  return (
    <div
      className="text-center py-6 px-4 rounded-2xl mb-6"
      style={{
        background: "oklch(0.78 0.14 75 / 0.08)",
        border: "1px solid oklch(0.78 0.14 75 / 0.2)",
      }}
    >
      <div className="text-4xl mb-2">{icon}</div>
      <h2
        className="font-heading text-xl font-bold"
        style={{ color: "oklch(0.35 0.12 25)" }}
      >
        {title}
      </h2>
      <p className="font-body text-sm text-muted-foreground mt-1">{desc}</p>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function AstrologyCalculatorsPage() {
  const [form, setForm] = useState<BirthForm>({
    name: "",
    dob: "",
    tob: "",
    city: "delhi",
  });
  const [result, setResult] = useState<BirthResult | null>(null);
  const [computing, setComputing] = useState(false);
  const [activeTab, setActiveTab] = useState("birth");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setComputing(true);
    setTimeout(() => {
      const res = computeBirthResult(form);
      setResult(res);
      setComputing(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div
        className="py-10 px-4 text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.06 30) 0%, oklch(0.35 0.12 25) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.78 0.14 75) 0%, transparent 50%), radial-gradient(circle at 80% 50%, oklch(0.68 0.2 48) 0%, transparent 50%)",
          }}
        />
        <div className="relative">
          <div className="text-5xl mb-3">🪐</div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
            ज्योतिष कैलकुलेटर
          </h1>
          <p
            className="font-body text-sm md:text-base"
            style={{ color: "oklch(0.85 0.06 75)" }}
          >
            Vedic Astrology Calculators — Birth Chart, Kundali Matching, Dasha &
            More
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {["Birth Calculator", "Kundali", "Matching", "Dasha"].map((t) => (
              <Badge
                key={t}
                className="text-xs font-body"
                style={{
                  background: "oklch(0.78 0.14 75 / 0.25)",
                  color: "oklch(0.95 0.02 80)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.4)",
                }}
              >
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <Link
          to="/horoscope"
          className="inline-flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
          data-ocid="astro-calculators.back_link"
        >
          <ArrowLeft size={14} />
          Back to Astrology
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList
            className="grid grid-cols-4 w-full mb-8 rounded-2xl p-1"
            style={{ background: "oklch(0.22 0.06 30)", gap: "2px" }}
            data-ocid="astro-calculators.tab_list"
          >
            {[
              { value: "birth", icon: "🌙", label: "Birth Calculator" },
              { value: "kundali", icon: "📿", label: "Kundali Chart" },
              { value: "matching", icon: "💑", label: "Kundali Matching" },
              { value: "dasha", icon: "⏳", label: "Dasha Calculator" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-1.5 text-xs md:text-sm font-heading font-semibold rounded-xl transition-all data-[state=active]:text-foreground"
                style={{
                  color: "oklch(0.75 0.06 75)",
                }}
                data-ocid={`astro-calculators.${tab.value}_tab`}
              >
                <span className="hidden md:inline">{tab.icon}</span>
                <span>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ── Tab 1: Birth Calculator ───────────────────────────────────────── */}
          <TabsContent value="birth" data-ocid="astro-calculators.birth_panel">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Form */}
              <div>
                <SectionHeader
                  icon="🌙"
                  title="जन्म कुंडली कैलकुलेटर"
                  desc="Enter your birth details to discover your Rashi, Nakshatra, Lagna & doshas"
                />
                <Card
                  className="rounded-2xl"
                  style={{
                    border: "1px solid oklch(0.85 0.04 70)",
                    background: "oklch(0.99 0.008 80)",
                  }}
                >
                  <CardContent className="pt-6">
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-4"
                      data-ocid="astro-calculators.birth_form"
                    >
                      {/* Name */}
                      <div>
                        <Label
                          htmlFor="ac-name"
                          className="font-heading text-sm font-semibold flex items-center gap-1.5 mb-1.5"
                        >
                          <User
                            size={14}
                            style={{ color: "oklch(0.62 0.18 48)" }}
                          />
                          पूर्ण नाम (Full Name)
                        </Label>
                        <Input
                          id="ac-name"
                          placeholder="अपना नाम लिखें..."
                          value={form.name}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, name: e.target.value }))
                          }
                          className="font-body"
                          data-ocid="astro-calculators.name_input"
                        />
                      </div>

                      {/* Date of Birth */}
                      <div>
                        <Label
                          htmlFor="ac-dob"
                          className="font-heading text-sm font-semibold flex items-center gap-1.5 mb-1.5"
                        >
                          <Calendar
                            size={14}
                            style={{ color: "oklch(0.62 0.18 48)" }}
                          />
                          जन्म तिथि (Date of Birth) *
                        </Label>
                        <Input
                          id="ac-dob"
                          type="date"
                          value={form.dob}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, dob: e.target.value }))
                          }
                          className="font-body"
                          required
                          data-ocid="astro-calculators.dob_input"
                        />
                      </div>

                      {/* Time of Birth */}
                      <div>
                        <Label
                          htmlFor="ac-tob"
                          className="font-heading text-sm font-semibold flex items-center gap-1.5 mb-1.5"
                        >
                          <Clock
                            size={14}
                            style={{ color: "oklch(0.62 0.18 48)" }}
                          />
                          जन्म समय (Time of Birth) *
                        </Label>
                        <Input
                          id="ac-tob"
                          type="time"
                          value={form.tob}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, tob: e.target.value }))
                          }
                          className="font-body"
                          required
                          data-ocid="astro-calculators.tob_input"
                        />
                      </div>

                      {/* City */}
                      <div>
                        <Label
                          htmlFor="ac-city"
                          className="font-heading text-sm font-semibold flex items-center gap-1.5 mb-1.5"
                        >
                          <MapPin
                            size={14}
                            style={{ color: "oklch(0.62 0.18 48)" }}
                          />
                          जन्म स्थान (Birth City) *
                        </Label>
                        <select
                          id="ac-city"
                          value={form.city}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, city: e.target.value }))
                          }
                          className="w-full h-10 px-3 rounded-md border font-body text-sm bg-background focus:outline-none focus:ring-2"
                          style={{
                            borderColor: "oklch(0.85 0.04 70)",
                            color: "oklch(0.18 0.04 30)",
                          }}
                          required
                          data-ocid="astro-calculators.city_select"
                        >
                          <option value="">-- शहर चुनें --</option>
                          {CITIES.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name} — {c.nameHi}
                            </option>
                          ))}
                        </select>
                      </div>

                      <Button
                        type="submit"
                        disabled={
                          computing || !form.dob || !form.tob || !form.city
                        }
                        className="w-full font-heading font-bold text-base py-5 rounded-xl transition-all"
                        style={{
                          background:
                            "linear-gradient(135deg, oklch(0.62 0.18 48), oklch(0.78 0.14 75))",
                          color: "white",
                        }}
                        data-ocid="astro-calculators.calculate_button"
                      >
                        {computing ? (
                          <span className="flex items-center gap-2">
                            <span className="animate-spin">🪐</span> गणना हो रही
                            है...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Star size={16} />
                            कुंडली गणना करें
                          </span>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Quick Links */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {[
                    { to: "/calculator/rashi", label: "🌙 Rashi Calculator" },
                    {
                      to: "/calculator/nakshatra",
                      label: "⭐ Nakshatra Finder",
                    },
                    {
                      to: "/calculator/rising-ascendant",
                      label: "🌅 Ascendant Lagna",
                    },
                    { to: "/calculator/mangal-dosha", label: "♂ Mangal Dosha" },
                  ].map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="text-xs font-body text-center px-3 py-2 rounded-lg transition-colors hover:opacity-80"
                      style={{
                        background: "oklch(0.78 0.14 75 / 0.1)",
                        color: "oklch(0.45 0.15 45)",
                        border: "1px solid oklch(0.78 0.14 75 / 0.25)",
                      }}
                      data-ocid="astro-calculators.quick_link"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Result */}
              <div>
                {result ? (
                  <BirthResultCard result={result} name={form.name} />
                ) : (
                  <div
                    className="h-full flex flex-col items-center justify-center text-center py-16 rounded-2xl"
                    style={{
                      background: "oklch(0.78 0.14 75 / 0.06)",
                      border: "2px dashed oklch(0.78 0.14 75 / 0.3)",
                    }}
                    data-ocid="astro-calculators.result_empty_state"
                  >
                    <div className="text-5xl mb-4">🔮</div>
                    <h3
                      className="font-heading text-lg font-bold"
                      style={{ color: "oklch(0.35 0.12 25)" }}
                    >
                      अपनी कुंडली जानें
                    </h3>
                    <p className="font-body text-sm text-muted-foreground mt-2 max-w-xs">
                      जन्म विवरण भरें और गणना करें बटन दबाएं। आपकी राशि, नक्षत्र, लग्न एवं
                      दोष की जानकारी यहाँ दिखेगी।
                    </p>
                    <div className="mt-6 flex gap-3 flex-wrap justify-center text-2xl">
                      {["🌙", "⭐", "🌅", "♂", "🐍"].map((icon) => (
                        <span key={icon} className="animate-pulse">
                          {icon}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Rashi Calculators sub-section */}
            <OrnamentalDivider label="Rashi & Nakshatra Calculators" />
            <RashiCalculators />
          </TabsContent>

          {/* ── Tab 2: Kundali Chart ──────────────────────────────────────────── */}
          <TabsContent
            value="kundali"
            data-ocid="astro-calculators.kundali_panel"
          >
            <SectionHeader
              icon="📿"
              title="जन्म कुंडली चार्ट"
              desc="North Indian style birth chart with planetary positions"
            />
            <KundliGenerator />
          </TabsContent>

          {/* ── Tab 3: Kundali Matching ───────────────────────────────────────── */}
          <TabsContent
            value="matching"
            data-ocid="astro-calculators.matching_panel"
          >
            <SectionHeader
              icon="💑"
              title="कुंडली मिलान"
              desc="Ashta Kuta compatibility analysis — Guna Milan with 36-point scoring"
            />
            <KundaliMatching />
          </TabsContent>

          {/* ── Tab 4: Dasha Calculator ───────────────────────────────────────── */}
          <TabsContent value="dasha" data-ocid="astro-calculators.dasha_panel">
            <SectionHeader
              icon="⏳"
              title="विंशोत्तरी दशा कैलकुलेटर"
              desc="Vimshottari Mahadasha & Antardasha timeline from your birth date"
            />
            <DashaCalculator />
          </TabsContent>
        </Tabs>

        {/* Bottom CTA strip */}
        <OrnamentalDivider label="More Astrology Tools" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {
              to: "/calculator/birth-chart",
              icon: "📊",
              title: "Birth Chart",
              desc: "Full D1 chart",
            },
            {
              to: "/calculator/kaal-sarp-dosh",
              icon: "🐍",
              title: "Kaal Sarp Dosh",
              desc: "Dosha analysis",
            },
            {
              to: "/kundali-matching",
              icon: "💑",
              title: "Full Matching",
              desc: "36 guna report",
            },
            {
              to: "/vedic-dashboard",
              icon: "🏛️",
              title: "Vedic Dashboard",
              desc: "Complete suite",
            },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group rounded-xl p-4 text-center transition-all hover:scale-105"
              style={{
                background: "oklch(0.99 0.008 80)",
                border: "1px solid oklch(0.85 0.04 70)",
              }}
              data-ocid="astro-calculators.tool_link"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div
                className="font-heading text-sm font-bold"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                {item.title}
              </div>
              <div className="text-xs text-muted-foreground">{item.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
