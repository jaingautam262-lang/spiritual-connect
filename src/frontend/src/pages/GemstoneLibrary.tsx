import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useState } from "react";
import {
  type GemstoneEntry,
  navgrahGems,
  rashiGems,
} from "../data/gemstoneData";

const GEM_COLORS: Record<string, string> = {
  ruby: "from-red-900/40 to-red-800/20",
  pearl: "from-slate-600/40 to-slate-500/20",
  "red-coral": "from-orange-900/40 to-orange-800/20",
  emerald: "from-green-900/40 to-green-800/20",
  "yellow-sapphire": "from-yellow-900/40 to-yellow-800/20",
  diamond: "from-blue-900/30 to-blue-800/10",
  "blue-sapphire": "from-blue-900/40 to-blue-800/20",
  hessonite: "from-amber-900/40 to-amber-800/20",
  "cats-eye": "from-teal-900/40 to-teal-800/20",
};

function GemstoneCard({
  gem,
  onClick,
}: { gem: GemstoneEntry; onClick: () => void }) {
  const gradientClass =
    GEM_COLORS[gem.id] || "from-orange-900/30 to-orange-800/10";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`bg-gradient-to-br ${gradientClass} border rounded-xl p-5 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-lg w-full`}
      style={{ borderColor: "oklch(0.78 0.14 75 / 0.2)" }}
      data-ocid={`gemstone.item.${gem.id}`}
    >
      <div className="flex items-start gap-3 mb-3">
        <span className="text-3xl">{gem.emoji}</span>
        <div className="min-w-0 flex-1">
          <h3
            className="font-heading font-bold text-base leading-tight"
            style={{ color: "oklch(0.92 0.06 75)" }}
          >
            {gem.name}
          </h3>
          <p
            className="text-xs mt-0.5"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {gem.hindi_name}
          </p>
        </div>
      </div>
      <div className="space-y-1.5 mb-3">
        <div
          className="flex items-center gap-2 text-xs"
          style={{ color: "oklch(0.75 0.05 60)" }}
        >
          <span>🪐</span>
          <span>{gem.planet}</span>
        </div>
        <div
          className="flex items-center gap-2 text-xs"
          style={{ color: "oklch(0.75 0.05 60)" }}
        >
          <span>💍</span>
          <span>
            {gem.metal} · {gem.finger}
          </span>
        </div>
        <div
          className="flex items-center gap-2 text-xs"
          style={{ color: "oklch(0.75 0.05 60)" }}
        >
          <span>📅</span>
          <span>{gem.day_to_wear}</span>
        </div>
      </div>
      <p
        className="text-xs line-clamp-2 mb-3"
        style={{ color: "oklch(0.70 0.04 60)" }}
      >
        {gem.benefits[0]}
      </p>
      <Badge
        className="text-[10px] px-2 py-0.5"
        style={{
          background: "oklch(0.68 0.20 48 / 0.25)",
          color: "oklch(0.88 0.10 70)",
          border: "1px solid oklch(0.68 0.20 48 / 0.3)",
        }}
      >
        Uparatna: {gem.uparatna.split(",")[0]}
      </Badge>
    </button>
  );
}

function GemstoneModal({
  gem,
  onClose,
}: { gem: GemstoneEntry; onClose: () => void }) {
  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent
        className="max-w-2xl max-h-[85vh] overflow-y-auto border"
        style={{
          background: "oklch(0.18 0.07 22)",
          borderColor: "oklch(0.78 0.14 75 / 0.25)",
        }}
      >
        <DialogHeader>
          <DialogTitle
            className="flex items-center gap-3 text-xl"
            style={{ color: "oklch(0.92 0.06 75)" }}
          >
            <span className="text-4xl">{gem.emoji}</span>
            <div>
              <div>{gem.name}</div>
              <div
                className="text-sm font-normal mt-0.5"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                {gem.hindi_name}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Key details */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          {[
            {
              label: "Planet / ग्रह",
              value: `${gem.planet} (${gem.planet_hindi})`,
            },
            { label: "Metal / धातु", value: gem.metal },
            { label: "Finger / उंगली", value: gem.finger },
            { label: "Day to Wear / वार", value: gem.day_to_wear },
            { label: "Color / रंग", value: gem.color },
            { label: "Rashi / राशि", value: gem.rashi.join(", ") },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg p-3"
              style={{ background: "oklch(0.22 0.07 22)" }}
            >
              <p
                className="text-[10px] uppercase tracking-wider mb-1"
                style={{ color: "oklch(0.68 0.12 65)" }}
              >
                {item.label}
              </p>
              <p
                className="text-sm font-medium"
                style={{ color: "oklch(0.88 0.06 75)" }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Mantra */}
        <div
          className="rounded-lg p-4 mt-2"
          style={{
            background: "oklch(0.22 0.07 22)",
            borderLeft: "3px solid oklch(0.78 0.14 75)",
          }}
        >
          <p
            className="text-xs uppercase tracking-wider mb-1"
            style={{ color: "oklch(0.68 0.12 65)" }}
          >
            Sacred Mantra
          </p>
          <p
            className="font-heading text-sm"
            style={{ color: "oklch(0.88 0.06 75)" }}
          >
            {gem.mantra}
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-2">
          <h4
            className="font-heading font-semibold text-sm mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            ✨ Benefits / लाभ
          </h4>
          <ul className="space-y-1.5">
            {gem.benefits.map((b) => (
              <li
                key={b.slice(0, 30)}
                className="flex items-start gap-2 text-sm"
                style={{ color: "oklch(0.80 0.04 60)" }}
              >
                <span
                  className="mt-0.5 text-xs"
                  style={{ color: "oklch(0.68 0.20 48)" }}
                >
                  ◆
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* How to Energize */}
        <div className="mt-2">
          <h4
            className="font-heading font-semibold text-sm mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🕯️ How to Energize / धारण विधि
          </h4>
          <ol className="space-y-1.5">
            {gem.how_to_energize.map((step, i) => (
              <li
                key={step.slice(0, 20)}
                className="flex items-start gap-2 text-sm"
                style={{ color: "oklch(0.80 0.04 60)" }}
              >
                <span
                  className="font-bold text-xs mt-0.5 shrink-0 w-5"
                  style={{ color: "oklch(0.68 0.20 48)" }}
                >
                  {i + 1}.
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Precautions */}
        <div className="mt-2">
          <h4
            className="font-heading font-semibold text-sm mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            ⚠️ Precautions / सावधानियाँ
          </h4>
          <ul className="space-y-1.5">
            {gem.precautions.map((p) => (
              <li
                key={p.slice(0, 30)}
                className="flex items-start gap-2 text-sm"
                style={{ color: "oklch(0.80 0.04 60)" }}
              >
                <span
                  className="mt-0.5 text-xs"
                  style={{ color: "oklch(0.65 0.20 25)" }}
                >
                  ▲
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Jain View */}
        <div
          className="rounded-lg p-4 mt-2"
          style={{
            background: "oklch(0.20 0.06 22)",
            border: "1px solid oklch(0.78 0.14 75 / 0.15)",
          }}
        >
          <h4
            className="font-heading font-semibold text-sm mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🕊️ Jain Perspective
          </h4>
          <p className="text-sm" style={{ color: "oklch(0.75 0.04 60)" }}>
            {gem.jain_view}
          </p>
        </div>

        {/* Substitute */}
        <div
          className="rounded-lg p-3 mt-2"
          style={{ background: "oklch(0.20 0.06 22)" }}
        >
          <p
            className="text-xs uppercase tracking-wider mb-1"
            style={{ color: "oklch(0.68 0.12 65)" }}
          >
            Uparatna (Substitute Gem)
          </p>
          <p className="text-sm" style={{ color: "oklch(0.80 0.04 60)" }}>
            {gem.uparatna}
          </p>
        </div>

        {/* CTA */}
        <div className="flex gap-3 mt-4">
          <Link to="/astrologer" className="flex-1">
            <Button
              className="w-full"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                color: "white",
              }}
              data-ocid="gemstone.consult_button"
            >
              🔮 Consult Gemstone Expert
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={onClose}
            style={{
              borderColor: "oklch(0.78 0.14 75 / 0.3)",
              color: "oklch(0.88 0.06 75)",
            }}
            data-ocid="gemstone.close_button"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function GemstoneLibrary() {
  const [search, setSearch] = useState("");
  const [selectedGem, setSelectedGem] = useState<GemstoneEntry | null>(null);

  const filter = (gems: GemstoneEntry[]) =>
    search
      ? gems.filter(
          (g) =>
            g.name.toLowerCase().includes(search.toLowerCase()) ||
            g.hindi_name.includes(search) ||
            g.planet.toLowerCase().includes(search.toLowerCase()) ||
            g.rashi.some((r) => r.toLowerCase().includes(search.toLowerCase())),
        )
      : gems;

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.14 0.05 20)" }}>
      {/* Hero */}
      <div
        className="py-12 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.16 0.06 20) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.15)",
        }}
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <h1
              className="font-decorative text-4xl md:text-5xl font-bold mb-3"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              💎 Gemstone Library
            </h1>
            <p
              className="text-lg mb-1"
              style={{ color: "oklch(0.88 0.06 75)" }}
            >
              रत्न पुस्तकालय — Navagraha & Rashi Gems
            </p>
            <p
              className="text-sm max-w-2xl mx-auto"
              style={{ color: "oklch(0.65 0.04 55)" }}
            >
              Sacred Vedic gemstones with full wearing rituals, benefits,
              mantras, and Jain perspectives. Consult an expert before wearing.
            </p>
          </div>
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: "oklch(0.60 0.05 55)" }}
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search gemstone, planet, or rashi..."
              className="pl-10 border"
              style={{
                background: "oklch(0.22 0.07 22)",
                borderColor: "oklch(0.78 0.14 75 / 0.2)",
                color: "oklch(0.90 0.04 70)",
              }}
              data-ocid="gemstone.search_input"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-6xl px-4 py-10">
        <Tabs defaultValue="navgrah">
          <TabsList
            className="mb-8 w-full max-w-sm mx-auto grid grid-cols-2"
            style={{
              background: "oklch(0.20 0.07 22)",
              border: "1px solid oklch(0.78 0.14 75 / 0.2)",
            }}
          >
            <TabsTrigger
              value="navgrah"
              style={{ color: "oklch(0.88 0.06 75)" }}
              data-ocid="gemstone.navgrah_tab"
            >
              🪐 Navgrah Gems (9)
            </TabsTrigger>
            <TabsTrigger
              value="rashi"
              style={{ color: "oklch(0.88 0.06 75)" }}
              data-ocid="gemstone.rashi_tab"
            >
              ♈ Rashi Gems (12)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="navgrah">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              data-ocid="gemstone.navgrah_list"
            >
              {filter(navgrahGems).map((gem) => (
                <GemstoneCard
                  key={gem.id}
                  gem={gem}
                  onClick={() => setSelectedGem(gem)}
                />
              ))}
              {filter(navgrahGems).length === 0 && (
                <div
                  className="col-span-3 text-center py-16"
                  data-ocid="gemstone.empty_state"
                >
                  <p
                    className="text-lg"
                    style={{ color: "oklch(0.65 0.04 55)" }}
                  >
                    No gemstones found for "{search}"
                  </p>
                  <Button
                    variant="link"
                    onClick={() => setSearch("")}
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    Clear search
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="rashi">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              data-ocid="gemstone.rashi_list"
            >
              {filter(rashiGems).map((gem) => (
                <GemstoneCard
                  key={gem.id}
                  gem={gem}
                  onClick={() => setSelectedGem(gem)}
                />
              ))}
              {filter(rashiGems).length === 0 && (
                <div
                  className="col-span-3 text-center py-16"
                  data-ocid="gemstone.empty_state"
                >
                  <p
                    className="text-lg"
                    style={{ color: "oklch(0.65 0.04 55)" }}
                  >
                    No gemstones found for "{search}"
                  </p>
                  <Button
                    variant="link"
                    onClick={() => setSearch("")}
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    Clear search
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Note */}
        <div
          className="mt-12 rounded-xl p-6 text-center"
          style={{
            background: "oklch(0.20 0.07 22)",
            border: "1px solid oklch(0.78 0.14 75 / 0.15)",
          }}
        >
          <p className="text-sm mb-3" style={{ color: "oklch(0.75 0.04 60)" }}>
            ⚠️ Always consult a qualified Vedic astrologer before wearing any
            gemstone. Wrong gemstones can have adverse effects.
          </p>
          <Link to="/astrologer">
            <Button
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                color: "white",
              }}
              data-ocid="gemstone.hero_consult_button"
            >
              🔮 Get Free Gemstone Consultation
            </Button>
          </Link>
        </div>
      </div>

      {selectedGem && (
        <GemstoneModal gem={selectedGem} onClose={() => setSelectedGem(null)} />
      )}
    </div>
  );
}
