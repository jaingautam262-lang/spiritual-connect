import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  axisEffects,
  ketuHouseEffects,
  ketuMahadasha,
  ketuRemedies,
  ketuSignEffects,
  rahuHouseEffects,
  rahuMahadasha,
  rahuRemedies,
  rahuSignEffects,
  sadeSatiVsRahuKetu,
} from "../data/shadowPlanetsData";

// ─── Sub-components ───────────────────────────────────────────────────────────

function HouseEffectsGrid({
  effects,
  color,
}: { effects: typeof rahuHouseEffects; color: string }) {
  const [openHouse, setOpenHouse] = useState<number | null>(null);
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
      {effects.map((item) => (
        <button
          type="button"
          key={item.house}
          onClick={() =>
            setOpenHouse(openHouse === item.house ? null : item.house)
          }
          data-ocid={`shadow-house-${item.house}-btn`}
          className="text-left rounded-xl border p-4 transition-all hover:brightness-110"
          style={{
            background:
              openHouse === item.house ? `${color}18` : "oklch(0.18 0.05 22)",
            borderColor:
              openHouse === item.house ? `${color}66` : "oklch(0.28 0.06 28)",
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ background: `${color}30`, color }}
            >
              {item.house}
            </span>
            <span className="text-sm font-semibold text-foreground truncate">
              {item.title}
            </span>
          </div>
          {openHouse === item.house && (
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">
              {item.effect}
            </p>
          )}
          {openHouse !== item.house && (
            <p className="text-xs text-muted-foreground line-clamp-1">
              {item.effect}
            </p>
          )}
        </button>
      ))}
    </div>
  );
}

function SignEffectsGrid({
  effects,
  color,
}: { effects: typeof rahuSignEffects; color: string }) {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
      {effects.map((item) => (
        <div
          key={item.sign}
          className="rounded-xl border p-4"
          style={{
            background: "oklch(0.18 0.05 22)",
            borderColor: "oklch(0.28 0.06 28)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{item.symbol}</span>
            <span className="font-semibold text-sm" style={{ color }}>
              {item.sign}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {item.effect}
          </p>
        </div>
      ))}
    </div>
  );
}

function MahadashCard({
  data,
  color,
}: { data: typeof rahuMahadasha; color: string }) {
  return (
    <div className="space-y-4">
      <div
        className="rounded-xl p-5 border"
        style={{ background: `${color}10`, borderColor: `${color}40` }}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl font-bold" style={{ color }}>
            {data.duration}
          </span>
          <span className="text-xs text-muted-foreground">
            Mahadasha Period
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {data.nature}
        </p>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        {data.phases.map((phase) => (
          <div
            key={phase.phase}
            className="rounded-lg p-3 border"
            style={{
              background: "oklch(0.17 0.05 22)",
              borderColor: "oklch(0.26 0.06 26)",
            }}
          >
            <p className="text-xs font-bold mb-1" style={{ color }}>
              {phase.phase}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {phase.effect}
            </p>
          </div>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold text-emerald-400 mb-2 uppercase tracking-wide">
            Positive Effects
          </p>
          <ul className="space-y-1">
            {data.positiveEffects.map((e) => (
              <li
                key={e}
                className="flex items-start gap-2 text-xs text-muted-foreground"
              >
                <span className="mt-1 text-emerald-500 flex-shrink-0">✓</span>{" "}
                {e}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold text-rose-400 mb-2 uppercase tracking-wide">
            Challenges
          </p>
          <ul className="space-y-1">
            {data.challenges.map((c) => (
              <li
                key={c}
                className="flex items-start gap-2 text-xs text-muted-foreground"
              >
                <span className="mt-1 text-rose-500 flex-shrink-0">!</span> {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function RemediesSection({
  remedies,
  color,
}: { remedies: typeof rahuRemedies; color: string; planet?: string }) {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {remedies.map((remedy) => (
        <div
          key={remedy.id}
          className="rounded-xl p-4 border"
          style={{
            background: "oklch(0.18 0.05 22)",
            borderColor: `${color}30`,
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ background: `${color}25`, color }}
            >
              {remedy.id}
            </span>
            <h4 className="text-sm font-semibold text-foreground leading-tight">
              {remedy.title}
            </h4>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {remedy.description}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── Planet Section ───────────────────────────────────────────────────────────

function PlanetSection({
  planet,
  color,
  symbol,
  badge,
  nature,
  significations,
  houseEffects,
  signEffects,
  mahadasha,
  remedies,
}: {
  planet: string;
  color: string;
  symbol: string;
  badge: string;
  nature: string;
  significations: string[];
  houseEffects: typeof rahuHouseEffects;
  signEffects: typeof rahuSignEffects;
  mahadasha: typeof rahuMahadasha;
  remedies: typeof rahuRemedies;
}) {
  const [section, setSection] = useState<
    "houses" | "signs" | "mahadasha" | "remedies"
  >("houses");
  const sections = [
    { id: "houses" as const, label: "12 Houses" },
    { id: "signs" as const, label: "12 Signs" },
    { id: "mahadasha" as const, label: "Mahadasha" },
    { id: "remedies" as const, label: "Remedies" },
  ];

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ borderColor: `${color}44` }}
      data-ocid={`shadow-${planet.toLowerCase()}-section`}
    >
      {/* Header */}
      <div
        className="px-6 py-5"
        style={{
          background: `linear-gradient(135deg, ${color}18, oklch(0.16 0.06 22))`,
        }}
      >
        <div className="flex items-center gap-4 mb-3">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg flex-shrink-0"
            style={{
              background: `${color}30`,
              border: `2px solid ${color}60`,
              color,
            }}
          >
            {symbol}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-display text-2xl font-bold text-foreground">
                {planet}
              </h2>
              <Badge
                variant="outline"
                style={{ borderColor: `${color}50`, color }}
                className="text-xs"
              >
                {badge}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{nature}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {significations.map((s) => (
            <span
              key={s}
              className="text-xs px-2 py-1 rounded-full"
              style={{ background: `${color}20`, color }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Section Tabs */}
      <div
        className="flex border-b overflow-x-auto"
        style={{
          background: "oklch(0.17 0.05 22)",
          borderColor: "oklch(0.25 0.06 26)",
        }}
      >
        {sections.map((s) => (
          <button
            type="button"
            key={s.id}
            onClick={() => setSection(s.id)}
            data-ocid={`${planet.toLowerCase()}-${s.id}-tab`}
            className="px-4 py-3 text-xs font-semibold whitespace-nowrap transition-colors flex-shrink-0 relative"
            style={{
              color: section === s.id ? color : "oklch(0.60 0.04 55)",
              borderBottom:
                section === s.id
                  ? `2px solid ${color}`
                  : "2px solid transparent",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Section Content */}
      <div className="p-5">
        {section === "houses" && (
          <HouseEffectsGrid effects={houseEffects} color={color} />
        )}
        {section === "signs" && (
          <SignEffectsGrid effects={signEffects} color={color} />
        )}
        {section === "mahadasha" && (
          <MahadashCard data={mahadasha} color={color} />
        )}
        {section === "remedies" && (
          <RemediesSection remedies={remedies} color={color} planet={planet} />
        )}
      </div>
    </div>
  );
}

// ─── Axis Effects ─────────────────────────────────────────────────────────────

function AxisSection() {
  return (
    <section>
      <div className="mb-4">
        <h2 className="font-display text-xl font-bold text-foreground mb-1">
          Rahu-Ketu Axis Effects
        </h2>
        <p className="text-sm text-muted-foreground">
          The nodal axis always spans two opposite houses, creating a tension
          between material desires (Rahu) and spiritual release (Ketu).
        </p>
      </div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {axisEffects.map((axis) => (
          <div
            key={axis.axis}
            className="rounded-xl border p-4"
            style={{
              background: "oklch(0.17 0.05 22)",
              borderColor: "oklch(0.28 0.06 28)",
            }}
            data-ocid={`axis-${axis.rahuHouse}-${axis.ketuHouse}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-1">
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: "oklch(0.55 0.20 45 / 0.3)",
                    color: "oklch(0.75 0.20 55)",
                  }}
                >
                  {axis.rahuHouse}
                </span>
                <span className="text-muted-foreground text-xs">↔</span>
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: "oklch(0.40 0.15 5 / 0.3)",
                    color: "oklch(0.70 0.18 10)",
                  }}
                >
                  {axis.ketuHouse}
                </span>
              </div>
              <span className="font-semibold text-sm text-foreground">
                {axis.axis}
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {axis.effect}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Sade Sati Comparison ────────────────────────────────────────────────────

function SadeSatiComparison() {
  return (
    <section>
      <div className="mb-4">
        <h2 className="font-display text-xl font-bold text-foreground mb-1">
          Sade Sati vs Rahu-Ketu
        </h2>
        <p className="text-sm text-muted-foreground">
          Two of the most commonly confused planetary periods — here's how they
          differ.
        </p>
      </div>
      <div
        className="rounded-xl border overflow-hidden"
        style={{ borderColor: "oklch(0.28 0.06 28)" }}
      >
        {/* Header */}
        <div
          className="grid grid-cols-3 text-xs font-semibold uppercase tracking-wide px-4 py-3"
          style={{
            background: "oklch(0.20 0.06 24)",
            color: "oklch(0.60 0.04 55)",
          }}
        >
          <span>Aspect</span>
          <span style={{ color: "oklch(0.68 0.12 240)" }}>
            Sade Sati (Saturn)
          </span>
          <span style={{ color: "oklch(0.75 0.20 55)" }}>Rahu / Ketu</span>
        </div>
        {sadeSatiVsRahuKetu.map((row, i) => (
          <div
            key={row.aspect}
            className="grid grid-cols-3 px-4 py-3 border-t text-xs"
            style={{
              background:
                i % 2 === 0 ? "oklch(0.17 0.05 22)" : "oklch(0.15 0.04 20)",
              borderColor: "oklch(0.23 0.05 24)",
            }}
            data-ocid={`sade-sati-row-${i + 1}`}
          >
            <span className="font-semibold text-foreground">{row.aspect}</span>
            <span className="text-muted-foreground pr-2">{row.sadeSati}</span>
            <span className="text-muted-foreground">{row.rahuKetu}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "What is Rahu and why is it called a shadow planet?",
    a: "Rahu is the North Lunar Node — the point where the Moon's orbit crosses the Sun's ecliptic plane going northward. It has no physical body and is visible only as a mathematical point, hence 'shadow planet'. In Vedic astrology, it represents karmic desires, illusions, and worldly ambitions.",
  },
  {
    q: "How does Ketu differ from Rahu in terms of effects?",
    a: "While Rahu represents future karma and unfulfilled desires pulling us toward the material world, Ketu represents past-life mastery and spiritual release. Rahu creates obsessive craving; Ketu creates detachment and liberation. Together they form the soul's evolutionary axis.",
  },
  {
    q: "Are Rahu and Ketu always in opposite houses?",
    a: "Yes, Rahu and Ketu are always exactly 180° apart in a birth chart. If Rahu is in the 1st house, Ketu will always be in the 7th. This nodal axis reveals the soul's karmic direction — the tension between what must be developed (Rahu) and what must be released (Ketu).",
  },
  {
    q: "Which gemstone is worn for Rahu and Ketu?",
    a: "For Rahu, Hessonite Garnet (Gomed) set in silver is worn on the middle finger. For Ketu, Cat's Eye (Vaiduryam/Lahsuniya) set in gold or panchdhatu is worn on the middle finger. Both should be worn after consulting a qualified Vedic astrologer.",
  },
  {
    q: "What is the difference between Rahu transit and Rahu Mahadasha?",
    a: "Rahu transit refers to Rahu's movement through signs in the sky (~1.5 years per sign), affecting everyone collectively. Rahu Mahadasha is an 18-year personal period activated based on your birth Nakshatra in the Vimshottari Dasha system — it produces much stronger and more personal effects than transit.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section>
      <h2 className="font-display text-xl font-bold text-foreground mb-4">
        Frequently Asked Questions
      </h2>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div
            key={faq.q}
            className="rounded-xl border overflow-hidden"
            style={{
              borderColor:
                open === i
                  ? "oklch(0.60 0.18 55 / 0.5)"
                  : "oklch(0.26 0.06 26)",
            }}
            data-ocid={`shadow-faq-${i + 1}`}
          >
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-3"
              style={{
                background:
                  open === i ? "oklch(0.19 0.07 24)" : "oklch(0.17 0.05 22)",
              }}
            >
              <span className="text-sm font-semibold text-foreground">
                {faq.q}
              </span>
              <span className="text-primary text-lg flex-shrink-0">
                {open === i ? "−" : "+"}
              </span>
            </button>
            {open === i && (
              <div
                className="px-5 pb-4"
                style={{ background: "oklch(0.16 0.05 22)" }}
              >
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

type Tab = "rahu-ketu" | "axis" | "sade-sati" | "faq";

const tabs: { id: Tab; label: string }[] = [
  { id: "rahu-ketu", label: "☊ Rahu & Ketu" },
  { id: "axis", label: "⟷ Nodal Axis" },
  { id: "sade-sati", label: "⚖ Sade Sati vs Rahu-Ketu" },
  { id: "faq", label: "❓ FAQ" },
];

export default function ShadowPlanets() {
  const [activeTab, setActiveTab] = useState<Tab>("rahu-ketu");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div
        className="border-b"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.16 0.07 22), oklch(0.12 0.04 20))",
          borderColor: "oklch(0.25 0.06 26)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-2xl shadow-lg flex-shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.55 0.20 45), oklch(0.40 0.15 5))",
              }}
            >
              ☊
            </div>
            <Badge
              variant="outline"
              className="text-xs"
              style={{
                borderColor: "oklch(0.55 0.15 45 / 0.5)",
                color: "oklch(0.75 0.18 55)",
              }}
            >
              Vedic Astrology — Shadow Planets
            </Badge>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Rahu & Ketu — Shadow Planets
          </h1>
          <p
            className="font-medium mb-2"
            style={{ color: "oklch(0.72 0.18 55)" }}
          >
            राहु और केतु — छाया ग्रह
          </p>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Rahu and Ketu are the lunar nodes — mathematical points that reveal
            your soul's karmic journey. Study their effects in all 12 houses and
            signs, understand the nodal axis, and explore Mahadasha periods and
            remedies.
          </p>
        </div>
      </div>

      {/* Tab Bar */}
      <div
        className="sticky top-0 z-10 border-b shadow-sm"
        style={{
          background: "oklch(0.16 0.05 22 / 0.95)",
          backdropFilter: "blur(8px)",
          borderColor: "oklch(0.24 0.06 26)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <div
            className="flex gap-0 overflow-x-auto"
            role="tablist"
            data-ocid="shadow-tab-bar"
          >
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                data-ocid={`shadow-tab-${tab.id}`}
                className="relative px-5 py-4 text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0"
                style={{
                  color:
                    activeTab === tab.id
                      ? "oklch(0.75 0.20 55)"
                      : "oklch(0.55 0.04 55)",
                }}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full"
                    style={{ background: "oklch(0.72 0.18 55)" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        {activeTab === "rahu-ketu" && (
          <>
            <PlanetSection
              planet="Rahu"
              color="oklch(0.72 0.20 55)"
              symbol="☊"
              badge="North Node — राहु"
              nature="Karmic desires, materialism, foreign connections, technology, illusions, sudden gains"
              significations={[
                "Foreign Lands",
                "Technology",
                "Illusion/Maya",
                "Sudden Events",
                "Karmic Desire",
                "Taboos",
              ]}
              houseEffects={rahuHouseEffects}
              signEffects={rahuSignEffects}
              mahadasha={rahuMahadasha}
              remedies={rahuRemedies}
            />
            <PlanetSection
              planet="Ketu"
              color="oklch(0.68 0.18 10)"
              symbol="☋"
              badge="South Node — केतु"
              nature="Past karma, spirituality, liberation (moksha), detachment, occult, psychic abilities"
              significations={[
                "Spirituality",
                "Past Life",
                "Occult",
                "Liberation",
                "Isolation",
                "Intuition",
              ]}
              houseEffects={ketuHouseEffects}
              signEffects={ketuSignEffects}
              mahadasha={ketuMahadasha}
              remedies={ketuRemedies}
            />
          </>
        )}
        {activeTab === "axis" && <AxisSection />}
        {activeTab === "sade-sati" && <SadeSatiComparison />}
        {activeTab === "faq" && <FAQSection />}
      </div>
    </div>
  );
}
