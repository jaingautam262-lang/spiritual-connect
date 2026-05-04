import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Gem, X } from "lucide-react";
import { useMemo, useState } from "react";
import FavouriteButton from "../components/FavouriteButton";
import WhatsAppShare from "../components/WhatsAppShare";
import {
  ALL_COLORS,
  ALL_PLANETS,
  ALL_ZODIAC_SIGNS,
  GEMSTONES,
  type GemstoneInfo,
  formatINR,
} from "../data/gemstoneShopData";
import { useLanguage } from "../hooks/useLanguage";

function tx(en: string, hi: string, language: string) {
  return language === "hi" ? hi : en;
}

// ---- Planet symbol map ----
const PLANET_SYMBOLS: Record<string, string> = {
  Sun: "☀️",
  Moon: "🌙",
  Mars: "♂️",
  Mercury: "☿",
  Jupiter: "♃",
  Venus: "♀️",
  Saturn: "♄",
  Rahu: "☊",
  Ketu: "☋",
};

// ---- Gemstone Detail Modal ----
function GemstoneModal({
  stone,
  onClose,
}: {
  stone: GemstoneInfo;
  onClose: () => void;
}) {
  const { language } = useLanguage();
  const tx_ = (en: string, hi: string) => tx(en, hi, language);
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className="max-w-lg w-full p-0 overflow-hidden"
        data-ocid="gemstone_shop.detail_dialog"
      >
        {/* Header strip */}
        <div
          className="relative px-6 pt-8 pb-6 text-center"
          style={{
            background: `linear-gradient(135deg, ${stone.colorHex}22 0%, oklch(0.22 0.08 22) 100%)`,
            borderBottom: `2px solid ${stone.colorHex}44`,
          }}
        >
          <DialogTitle className="sr-only">{stone.name}</DialogTitle>
          <span className="text-6xl block mb-3">{stone.emoji}</span>
          <h2
            className="font-heading font-bold text-2xl"
            style={{ color: "oklch(0.97 0.015 85)" }}
          >
            {stone.name}
          </h2>
          <p
            className="font-devanagari text-base mt-0.5 opacity-80"
            style={{ color: "oklch(0.82 0.04 70)" }}
          >
            {stone.nameHindi} · {stone.alternateNames}
          </p>
          {/* Favourite + close */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <FavouriteButton
              item={{
                id: `gemstone-${stone.id}`,
                type: "product",
                title: stone.name,
                subtitle: stone.nameHindi,
                path: "/gemstone-shop",
                icon: stone.emoji,
              }}
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
              style={{ color: "oklch(0.82 0.04 70)" }}
              data-ocid="gemstone_shop.close_button"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4 bg-card">
          {/* Attribute badges */}
          <div className="flex flex-wrap gap-2">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
              style={{
                background: `${stone.colorHex}18`,
                borderColor: `${stone.colorHex}55`,
                color: stone.colorHex,
              }}
            >
              🎨 {stone.color}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 border border-primary/30 text-primary">
              {PLANET_SYMBOLS[stone.planet] ?? "★"} {stone.planet}
            </span>
            {stone.zodiacSigns.map((z) => (
              <Badge key={z} variant="outline" className="text-xs">
                ♈ {z}
              </Badge>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-muted-foreground">
            {stone.description}
          </p>

          {/* Benefits */}
          <div
            className="rounded-xl p-4 border"
            style={{
              background: "oklch(0.22 0.08 22 / 0.35)",
              borderColor: "oklch(0.78 0.14 75 / 0.2)",
            }}
          >
            <p
              className="font-heading font-semibold text-xs uppercase tracking-wider mb-2"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              {tx_("Benefits", "लाभ")}
            </p>
            <p className="text-sm text-muted-foreground">{stone.benefits}</p>
          </div>

          {/* Price row */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <span
                className="font-heading font-bold text-2xl"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                {formatINR(stone.price)}
              </span>
              <span className="ml-2 text-sm text-muted-foreground line-through">
                {formatINR(stone.mrp)}
              </span>
              <span
                className="ml-2 text-xs font-bold px-1.5 py-0.5 rounded"
                style={{
                  background: "oklch(0.55 0.18 145 / 0.15)",
                  color: "oklch(0.55 0.18 145)",
                }}
              >
                {Math.round(((stone.mrp - stone.price) / stone.mrp) * 100)}% off
              </span>
            </div>
          </div>

          {/* CTA row */}
          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              className="btn-spiritual flex-1"
              data-ocid="gemstone_shop.consult_button"
            >
              {tx_("Consult Spiritual Connect", "आध्यात्मिक परामर्श लें")}
            </Button>
            <WhatsAppShare
              title={`${stone.name} (${stone.alternateNames}) — ${formatINR(stone.price)} | Spiritual Connect`}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ---- Gemstone Card ----
function GemstoneCard({
  stone,
  index,
  onViewDetails,
}: {
  stone: GemstoneInfo;
  index: number;
  onViewDetails: (stone: GemstoneInfo) => void;
}) {
  const { language } = useLanguage();
  const tx_ = (en: string, hi: string) => tx(en, hi, language);

  return (
    <div
      className="relative bg-card border border-border rounded-2xl overflow-hidden flex flex-col group hover:shadow-lg hover:border-primary/30 transition-all duration-300"
      data-ocid={`gemstone_shop.item.${index + 1}`}
    >
      {/* Favourite (top-right) */}
      <div className="absolute top-3 right-3 z-10">
        <FavouriteButton
          item={{
            id: `gemstone-${stone.id}`,
            type: "product",
            title: stone.name,
            subtitle: stone.nameHindi,
            path: "/gemstone-shop",
            icon: stone.emoji,
          }}
        />
      </div>

      {/* Emoji / visual area */}
      <div
        className="flex items-center justify-center py-8 text-6xl relative"
        style={{
          background: `linear-gradient(135deg, ${stone.colorHex}12 0%, ${stone.colorHex}22 100%)`,
        }}
      >
        <span className="drop-shadow-sm">{stone.emoji}</span>
        {/* Planet tag */}
        <span
          className="absolute bottom-2 left-3 text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{
            background: `${stone.colorHex}25`,
            color: stone.colorHex,
            border: `1px solid ${stone.colorHex}50`,
          }}
        >
          {PLANET_SYMBOLS[stone.planet]} {stone.planet}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <div>
          <h3 className="font-heading font-bold text-sm leading-snug text-foreground">
            {stone.name}
          </h3>
          <p className="text-xs text-muted-foreground font-devanagari">
            {stone.nameHindi}
          </p>
        </div>

        {/* Badges row */}
        <div className="flex flex-wrap gap-1">
          <Badge
            variant="outline"
            className="text-xs"
            style={{
              borderColor: `${stone.colorHex}50`,
              color: stone.colorHex,
            }}
          >
            {stone.color}
          </Badge>
          {stone.zodiacSigns.map((z) => (
            <Badge key={z} variant="secondary" className="text-xs">
              {z}
            </Badge>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mt-auto pt-1">
          <span
            className="font-heading font-bold text-base"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {formatINR(stone.price)}
          </span>
          <span className="text-xs text-muted-foreground line-through">
            {formatINR(stone.mrp)}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-1">
          <Button
            type="button"
            size="sm"
            className="btn-spiritual flex-1 text-xs"
            onClick={() => onViewDetails(stone)}
            data-ocid={`gemstone_shop.view_details.${index + 1}`}
          >
            {tx_("View Details", "विवरण देखें")}
          </Button>
          <WhatsAppShare
            title={`${stone.name} — ${formatINR(stone.price)} | Spiritual Connect`}
            className="!px-2 !py-1.5"
          />
        </div>
      </div>
    </div>
  );
}

// ---- Main Page ----
export default function GemstoneShop() {
  const { language } = useLanguage();
  const tx_ = (en: string, hi: string) => tx(en, hi, language);
  const [filterName, setFilterName] = useState<string>("all");
  const [filterColor, setFilterColor] = useState<string>("all");
  const [filterPlanet, setFilterPlanet] = useState<string>("all");
  const [filterZodiac, setFilterZodiac] = useState<string>("all");
  const [selectedStone, setSelectedStone] = useState<GemstoneInfo | null>(null);

  const hasActiveFilters =
    filterName !== "all" ||
    filterColor !== "all" ||
    filterPlanet !== "all" ||
    filterZodiac !== "all";

  const clearFilters = () => {
    setFilterName("all");
    setFilterColor("all");
    setFilterPlanet("all");
    setFilterZodiac("all");
  };

  const filtered = useMemo(() => {
    return GEMSTONES.filter((s) => {
      if (filterName !== "all" && s.id !== filterName) return false;
      if (filterColor !== "all" && s.color !== filterColor) return false;
      if (filterPlanet !== "all" && s.planet !== filterPlanet) return false;
      if (filterZodiac !== "all" && !s.zodiacSigns.includes(filterZodiac))
        return false;
      return true;
    });
  }, [filterName, filterColor, filterPlanet, filterZodiac]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.08 22) 0%, oklch(0.35 0.12 25) 60%, oklch(0.45 0.14 35) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.78 0.14 75) 0%, transparent 50%), radial-gradient(circle at 80% 30%, oklch(0.68 0.2 48) 0%, transparent 40%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 py-14 md:py-20">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-1.5 text-xs mb-6 opacity-70"
            aria-label="Breadcrumb"
            data-ocid="gemstone_shop.breadcrumb"
          >
            <Link
              to="/"
              className="hover:opacity-100 transition-opacity"
              style={{ color: "oklch(0.85 0.06 75)" }}
            >
              Home
            </Link>
            <ChevronRight
              className="w-3 h-3"
              style={{ color: "oklch(0.78 0.14 75)" }}
            />
            <Link
              to="/shop"
              className="hover:opacity-100 transition-opacity"
              style={{ color: "oklch(0.85 0.06 75)" }}
            >
              Shop
            </Link>
            <ChevronRight
              className="w-3 h-3"
              style={{ color: "oklch(0.78 0.14 75)" }}
            />
            <span style={{ color: "oklch(0.92 0.06 75)" }}>Gemstones</span>
          </nav>

          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Gem
                className="w-8 h-8"
                style={{ color: "oklch(0.78 0.14 75)" }}
              />
              <span
                className="font-heading text-sm font-semibold uppercase tracking-widest"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                32 Vedic Gemstones
              </span>
            </div>
            <h1
              className="font-heading text-3xl md:text-5xl font-bold mb-4 leading-tight"
              style={{ color: "oklch(0.97 0.015 85)" }}
            >
              {tx_(
                "Shop gemstones that resonate with your energy",
                "अपनी ऊर्जा से मेल खाते रत्न खरीदें",
              )}
            </h1>
            <p
              className="text-base md:text-lg leading-relaxed mb-6"
              style={{ color: "oklch(0.82 0.04 70)" }}
            >
              {tx_(
                "Each gemstone is personally certified, lab-tested, and energised (abhimantrit) for its associated Navgrah planet.",
                "प्रत्येक रत्न प्रमाणित, प्रयोगशाला-परीक्षित और अभिमंत्रित है।",
              )}
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Lab Certified",
                "Abhimantrit",
                "Conflict Free",
                "Genuine Navgrah Stones",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-heading font-medium px-3 py-1.5 rounded-full border"
                  style={{
                    color: "oklch(0.78 0.14 75)",
                    borderColor: "oklch(0.78 0.14 75 / 0.4)",
                    background: "oklch(0.78 0.14 75 / 0.1)",
                  }}
                >
                  ✓ {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-card border-b border-border py-4 px-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-heading font-semibold text-muted-foreground whitespace-nowrap">
              {tx_("Filter by:", "फ़िल्टर:")}
            </span>

            {/* Name */}
            <Select value={filterName} onValueChange={setFilterName}>
              <SelectTrigger
                className="w-52"
                data-ocid="gemstone_shop.filter_name"
              >
                <SelectValue placeholder={tx_("Name", "नाम")} />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                <SelectItem value="all">
                  {tx_("All Gemstones", "सभी रत्न")}
                </SelectItem>
                {GEMSTONES.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.emoji} {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Color */}
            <Select value={filterColor} onValueChange={setFilterColor}>
              <SelectTrigger
                className="w-36"
                data-ocid="gemstone_shop.filter_color"
              >
                <SelectValue placeholder={tx_("Color", "रंग")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {tx_("All Colors", "सभी रंग")}
                </SelectItem>
                {ALL_COLORS.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Planet */}
            <Select value={filterPlanet} onValueChange={setFilterPlanet}>
              <SelectTrigger
                className="w-36"
                data-ocid="gemstone_shop.filter_planet"
              >
                <SelectValue placeholder={tx_("Planet", "ग्रह")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {tx_("All Planets", "सभी ग्रह")}
                </SelectItem>
                {ALL_PLANETS.map((p) => (
                  <SelectItem key={p} value={p}>
                    {PLANET_SYMBOLS[p]} {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Zodiac */}
            <Select value={filterZodiac} onValueChange={setFilterZodiac}>
              <SelectTrigger
                className="w-40"
                data-ocid="gemstone_shop.filter_zodiac"
              >
                <SelectValue placeholder={tx_("Zodiac", "राशि")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {tx_("All Zodiac Signs", "सभी राशियाँ")}
                </SelectItem>
                {ALL_ZODIAC_SIGNS.map((z) => (
                  <SelectItem key={z} value={z}>
                    {z}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Reset */}
            {hasActiveFilters && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="gap-1.5 text-xs"
                data-ocid="gemstone_shop.reset_filters_button"
              >
                <X className="w-3.5 h-3.5" />
                {tx_("Reset", "रीसेट")}
              </Button>
            )}

            <span className="ml-auto text-xs text-muted-foreground">
              <span className="font-bold text-foreground">
                {filtered.length}
              </span>{" "}
              {tx_("gemstones found", "रत्न मिले")}
            </span>
          </div>
        </div>
      </section>

      {/* Gemstone Grid */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        {filtered.length === 0 ? (
          <div
            className="text-center py-20"
            data-ocid="gemstone_shop.empty_state"
          >
            <Gem className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="font-heading font-bold text-lg text-muted-foreground">
              {tx_("No gemstones match your filters", "कोई रत्न नहीं मिला")}
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-4"
              onClick={clearFilters}
            >
              {tx_("Clear Filters", "फ़िल्टर हटाएँ")}
            </Button>
          </div>
        ) : (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-4"
            data-ocid="gemstone_shop.product_list"
          >
            {filtered.map((stone, idx) => (
              <GemstoneCard
                key={stone.id}
                stone={stone}
                index={idx}
                onViewDetails={setSelectedStone}
              />
            ))}
          </div>
        )}
      </section>

      {/* Gemstones & You — Vedic Wisdom Section */}
      <section
        className="py-14 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.08 22 / 0.6) 0%, oklch(0.18 0.05 20) 100%)",
          borderTop: "1px solid oklch(0.78 0.14 75 / 0.15)",
        }}
        data-ocid="gemstone_shop.vedic_wisdom_section"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Decorative OM */}
          <div
            className="text-4xl mb-4"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            ॐ
          </div>
          <h2
            className="font-heading text-2xl md:text-3xl font-bold mb-6"
            style={{ color: "oklch(0.97 0.015 85)" }}
          >
            {tx_("Gemstones & You", "रत्न और आप")}
          </h2>

          {/* Three wisdom paragraphs */}
          <div className="space-y-5 text-left max-w-3xl mx-auto">
            <p
              className="text-base leading-relaxed"
              style={{ color: "oklch(0.82 0.04 70)" }}
            >
              {tx_(
                "Through Vedic astrological wisdom, we understand that the universe\u2019s vibrations link our everyday lives to the planets. These planets include the seven visible ones\u2014Sun, Moon, Mars, Mercury, Jupiter, Venus, and Saturn\u2014and two invisible forces, Rahu and Ketu.",
                "वैदिक ज्योतिष ज्ञान के माध्यम से, हम समझते हैं कि ब्रह्मांड के कंपन हमारे दैनिक जीवन को ग्रहों से जोड़ते हैं। इन ग्रहों में सात दृश्य ग्रह\u2014सूर्य, चंद्र, मंगल, बुध, बृहस्पति, शुक्र और शनि\u2014तथा दो अदृश्य शक्तियाँ, राहु और केतु शामिल हैं।",
              )}
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "oklch(0.82 0.04 70)" }}
            >
              {tx_(
                "Gemstones, formed over millennia, share vibrational energies with these planets. Acting as conduits for cosmic forces, gemstones hold the power to balance planetary influences in your life.",
                "करोड़ों वर्षों में निर्मित रत्न, इन ग्रहों के साथ कंपन ऊर्जाएँ साझा करते हैं। ब्रह्मांडीय शक्तियों के वाहक के रूप में, रत्नों में आपके जीवन में ग्रहों के प्रभाव को संतुलित करने की शक्ति होती है।",
              )}
            </p>
          </div>

          {/* Navgrah grid */}
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3 mt-10 mb-10">
            {[
              { planet: "Sun", symbol: "☀️", hindi: "सूर्य" },
              { planet: "Moon", symbol: "🌙", hindi: "चंद्र" },
              { planet: "Mars", symbol: "♂️", hindi: "मंगल" },
              { planet: "Mercury", symbol: "☿", hindi: "बुध" },
              { planet: "Jupiter", symbol: "♃", hindi: "बृहस्पति" },
              { planet: "Venus", symbol: "♀️", hindi: "शुक्र" },
              { planet: "Saturn", symbol: "♄", hindi: "शनि" },
              { planet: "Rahu", symbol: "☊", hindi: "राहु" },
              { planet: "Ketu", symbol: "☋", hindi: "केतु" },
            ].map(({ planet, symbol, hindi }) => (
              <button
                key={planet}
                type="button"
                className="flex flex-col items-center gap-1 p-3 rounded-xl border cursor-pointer hover:border-primary/50 transition-colors"
                style={{
                  background: "oklch(0.22 0.08 22 / 0.5)",
                  borderColor: "oklch(0.78 0.14 75 / 0.15)",
                }}
                onClick={() => {
                  setFilterPlanet(planet);
                  setFilterName("all");
                  setFilterColor("all");
                  setFilterZodiac("all");
                  document
                    .getElementById("gemstone-grid-anchor")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="text-xl">{symbol}</span>
                <span
                  className="text-xs font-heading font-semibold"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {planet}
                </span>
                <span
                  className="text-xs font-devanagari opacity-70"
                  style={{ color: "oklch(0.82 0.04 70)" }}
                >
                  {hindi}
                </span>
              </button>
            ))}
          </div>

          {/* CTA */}
          <div
            className="rounded-2xl p-8 border text-center"
            style={{
              background: "oklch(0.22 0.08 22 / 0.6)",
              borderColor: "oklch(0.78 0.14 75 / 0.25)",
            }}
          >
            <p
              className="font-heading font-bold text-xl mb-2"
              style={{ color: "oklch(0.97 0.015 85)" }}
            >
              {tx_("Find Your Gemstone", "अपना रत्न खोजें")}
            </p>
            <p
              className="text-sm mb-5"
              style={{ color: "oklch(0.82 0.04 70)" }}
            >
              {tx_(
                "Use our free Gemstone Calculator to discover which stone aligns with your birth chart and life energy.",
                "हमारे मुफ़्त रत्न कैलकुलेटर का उपयोग करके जानें कि कौन-सा रत्न आपकी जन्म कुंडली से मेल खाता है।",
              )}
            </p>
            <Link to="/gemstone-calculator">
              <Button
                type="button"
                className="btn-spiritual gap-2"
                data-ocid="gemstone_shop.calculator_cta"
              >
                <Gem className="w-4 h-4" />
                {tx_("Use Our Gemstone Calculator →", "रत्न कैलकुलेटर →")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Certified Section */}
      <section className="bg-muted/40 border-t border-border py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title mb-3">
            {tx_(
              "Why Choose Certified Navgrah Gemstones?",
              "प्रमाणित नवग्रह रत्न क्यों चुनें?",
            )}
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            {tx_(
              "Every gemstone is hand-selected, lab-certified for authenticity, and energised through Vedic rituals to align its vibrations with your birth chart.",
              "प्रत्येक रत्न हस्तनिर्मित, प्रमाणित और वैदिक अनुष्ठानों द्वारा अभिमंत्रित है।",
            )}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              {
                icon: "🔬",
                title: "Lab Certified",
                desc: "Genuine stones tested by accredited gemological labs",
              },
              {
                icon: "🕉️",
                title: "Abhimantrit",
                desc: "Energised with Vedic mantras specific to each planet",
              },
              {
                icon: "🪐",
                title: "Navgrah Aligned",
                desc: "Each stone matched to its Navgrah planet and purpose",
              },
              {
                icon: "📦",
                title: "Secure Delivery",
                desc: "Insured shipping with authenticity certificate included",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-card rounded-xl border border-border p-4 text-center"
              >
                <span className="text-3xl">{item.icon}</span>
                <p
                  className="font-heading font-bold text-sm mt-2 mb-1"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Anchor for scroll target */}
      <div id="gemstone-grid-anchor" />

      {/* Detail Modal */}
      {selectedStone && (
        <GemstoneModal
          stone={selectedStone}
          onClose={() => setSelectedStone(null)}
        />
      )}
    </div>
  );
}
