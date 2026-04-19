import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  CheckCircle,
  ChevronRight,
  Clock,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  type PujaCategory,
  type PujaTypeData,
  pujaCategories,
  pujaTypesData,
} from "../data/pujaTypesData";

// ─── Puja Card ────────────────────────────────────────────────────────────────

function PujaCard({
  puja,
  onSelect,
}: { puja: PujaTypeData; onSelect: (p: PujaTypeData) => void }) {
  return (
    <button
      type="button"
      className="rounded-2xl p-5 flex flex-col cursor-pointer transition-all hover:scale-[1.02] text-left w-full"
      style={{
        background: "oklch(0.99 0.008 80)",
        border: "1px solid oklch(0.78 0.14 75 / 0.2)",
        boxShadow: "0 1px 6px oklch(0.68 0.20 48 / 0.06)",
      }}
      onClick={() => onSelect(puja)}
      data-ocid={`puja-types.card.${puja.id}`}
    >
      <div className="flex items-start gap-3 mb-3">
        <span className="text-3xl">{puja.imageEmoji}</span>
        <div className="flex-1 min-w-0">
          <h3
            className="font-heading font-bold text-base truncate"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            {puja.nameHindi}
          </h3>
          <p
            className="font-body text-xs truncate"
            style={{ color: "oklch(0.55 0.04 50)" }}
          >
            {puja.name}
          </p>
        </div>
        <Badge
          className="shrink-0 text-xs"
          style={{
            background: "oklch(0.68 0.20 48 / 0.12)",
            color: "oklch(0.45 0.14 40)",
          }}
        >
          {puja.category}
        </Badge>
      </div>

      <p className="font-body text-sm text-muted-foreground mb-3 flex-1 line-clamp-2">
        {puja.descriptionHindi}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Clock
            className="h-3.5 w-3.5 shrink-0"
            style={{ color: "oklch(0.68 0.20 48)" }}
          />
          <span
            className="text-xs font-body"
            style={{ color: "oklch(0.50 0.06 45)" }}
          >
            {puja.duration}
          </span>
        </div>
        <div
          className="flex items-center gap-1"
          style={{ color: "oklch(0.55 0.04 60)" }}
        >
          <span className="text-xs font-heading font-semibold">
            {puja.deityHindi}
          </span>
          <ChevronRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </button>
  );
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────

function PujaDetailPanel({
  puja,
  onClose,
}: { puja: PujaTypeData; onClose: () => void }) {
  const [lang, setLang] = useState<"hi" | "en">("hi");

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: "oklch(0.10 0.04 20 / 0.7)" }}
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      data-ocid="puja-types.detail_panel"
    >
      <div
        className="relative w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl"
        style={{
          background: "oklch(0.99 0.01 80)",
          border: "1px solid oklch(0.78 0.14 75 / 0.25)",
        }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b"
          style={{
            background: "oklch(0.99 0.01 80)",
            borderColor: "oklch(0.78 0.14 75 / 0.2)",
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">{puja.imageEmoji}</span>
            <div>
              <h2
                className="font-heading font-bold text-lg"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                {lang === "hi" ? puja.nameHindi : puja.name}
              </h2>
              <p className="text-xs text-muted-foreground">
                {lang === "hi" ? puja.deityHindi : puja.deity}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLang(lang === "hi" ? "en" : "hi")}
              className="px-2.5 py-1 rounded-full text-xs font-heading font-semibold border transition-all"
              style={{
                borderColor: "oklch(0.78 0.14 75 / 0.3)",
                color: "oklch(0.45 0.12 40)",
              }}
              data-ocid="puja-types.detail.lang_toggle"
            >
              {lang === "hi" ? "EN" : "हिं"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-muted/40"
              aria-label="Close"
              data-ocid="puja-types.detail.close_button"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Description */}
          <p className="font-body text-sm text-muted-foreground">
            {lang === "hi" ? puja.descriptionHindi : puja.description}
          </p>

          {/* Meta row */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className="rounded-xl p-3"
              style={{ background: "oklch(0.68 0.20 48 / 0.07)" }}
            >
              <p
                className="text-xs font-heading font-semibold mb-1"
                style={{ color: "oklch(0.45 0.14 40)" }}
              >
                ⏱ {lang === "hi" ? "अवधि" : "Duration"}
              </p>
              <p
                className="text-sm font-body"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                {puja.duration}
              </p>
            </div>
            <div
              className="rounded-xl p-3"
              style={{ background: "oklch(0.55 0.16 220 / 0.07)" }}
            >
              <p
                className="text-xs font-heading font-semibold mb-1"
                style={{ color: "oklch(0.35 0.14 220)" }}
              >
                📅 {lang === "hi" ? "कब करें" : "When"}
              </p>
              <p className="text-xs font-body text-muted-foreground line-clamp-2">
                {lang === "hi" ? puja.whenHindi : puja.when}
              </p>
            </div>
          </div>

          {/* Vidhi */}
          <div>
            <h3
              className="font-heading font-bold text-sm mb-3 flex items-center gap-2"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              <BookOpen
                className="h-4 w-4"
                style={{ color: "oklch(0.68 0.20 48)" }}
              />
              {lang === "hi" ? "पूजा विधि" : "Puja Procedure"}
            </h3>
            <ol className="space-y-2">
              {(lang === "hi" ? puja.vidhiHindi : puja.vidhi).map((step, i) => (
                <li
                  key={`vidhi-${step.slice(0, 20)}`}
                  className="flex gap-3 items-start"
                >
                  <span
                    className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-heading"
                    style={{
                      background: "oklch(0.68 0.20 48 / 0.12)",
                      color: "oklch(0.45 0.14 40)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="font-body text-sm text-foreground">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Samagri */}
          <div>
            <h3
              className="font-heading font-bold text-sm mb-3 flex items-center gap-2"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              🛍️ {lang === "hi" ? "पूजा सामग्री" : "Puja Items"}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {(lang === "hi" ? puja.samagriHindi : puja.samagri).map(
                (item) => (
                  <div
                    key={`samagri-${item.slice(0, 20)}`}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle
                      className="h-3.5 w-3.5 shrink-0"
                      style={{ color: "oklch(0.55 0.18 145)" }}
                    />
                    <span className="text-xs font-body text-foreground">
                      {item}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h3
              className="font-heading font-bold text-sm mb-3"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              ✨ {lang === "hi" ? "लाभ" : "Benefits"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {(lang === "hi" ? puja.benefitsHindi : puja.benefits).map((b) => (
                <span
                  key={`benefit-${b.slice(0, 20)}`}
                  className="px-3 py-1 rounded-full text-xs font-body"
                  style={{
                    background: "oklch(0.78 0.14 75 / 0.1)",
                    color: "oklch(0.40 0.10 50)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.2)",
                  }}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Link
            to="/temple-services"
            className="block"
            data-ocid="puja-types.detail.book_button"
          >
            <Button
              className="w-full py-3 font-heading font-bold rounded-full"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                color: "white",
              }}
            >
              🙏 {lang === "hi" ? "इस पूजा को बुक करें" : "Book This Puja"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PujaTypesList() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<PujaCategory>("All");
  const [selected, setSelected] = useState<PujaTypeData | null>(null);

  const filtered = pujaTypesData.filter((p) => {
    const matchesCategory =
      activeCategory === "All" || p.category === activeCategory;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.nameHindi.includes(q) ||
      p.deity.toLowerCase().includes(q) ||
      p.deityHindi.includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Banner */}
      <div
        className="relative py-14 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.26 0.08 28) 100%)",
        }}
      >
        <h1
          className="font-decorative text-3xl md:text-5xl font-bold mb-3"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          🛕 पूजा प्रकार
        </h1>
        <p
          className="font-body text-base"
          style={{ color: "oklch(0.70 0.04 60)" }}
        >
          {pujaTypesData.length} पूजाएं — विधि, सामग्री और लाभ सहित
        </p>
        <p
          className="font-body text-sm mt-1"
          style={{ color: "oklch(0.60 0.04 60)" }}
        >
          Puja Types Directory — Vidhi, Samagri & Benefits
        </p>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="max-w-lg mx-auto mb-6 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
            style={{ color: "oklch(0.68 0.20 48)" }}
          />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="पूजा खोजें... (Search puja type)"
            className="pl-10 h-11 font-body"
            data-ocid="puja-types.search_input"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              aria-label="Clear search"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Category Filter */}
        <Tabs
          value={activeCategory}
          onValueChange={(v) => setActiveCategory(v as PujaCategory)}
          className="mb-8"
        >
          <TabsList
            className="w-full max-w-2xl mx-auto flex flex-wrap h-auto gap-1 p-1 rounded-xl"
            style={{ background: "oklch(0.22 0.08 22)" }}
          >
            {pujaCategories.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className="font-heading text-xs font-semibold py-2 rounded-lg data-[state=active]:text-white"
                style={{ color: "oklch(0.70 0.04 60)" }}
                data-ocid={`puja-types.filter.${cat.toLowerCase().replace(/\s+/g, "_")}`}
              >
                {cat === "All" ? "🔍 All" : cat}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Grid */}
          {pujaCategories.map((cat) => (
            <TabsContent key={cat} value={cat}>
              {filtered.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-4xl mb-3">🙏</p>
                  <p className="font-heading font-semibold text-foreground">
                    कोई पूजा नहीं मिली
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try a different search or category
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearch("");
                      setActiveCategory("All");
                    }}
                  >
                    Reset filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filtered.map((puja) => (
                    <PujaCard
                      key={puja.id}
                      puja={puja}
                      onSelect={setSelected}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Quick link to booking */}
        <div
          className="mt-8 rounded-2xl p-6 text-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.20 48 / 0.08), oklch(0.78 0.14 75 / 0.06))",
            border: "1px solid oklch(0.78 0.14 75 / 0.2)",
          }}
        >
          <p
            className="font-heading font-bold text-base mb-1"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            पूजा बुकिंग के लिए तैयार हैं?
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            अनुभवी पुजारियों द्वारा घर या मंदिर में पूजा करवाएं
          </p>
          <Link to="/temple-services" data-ocid="puja-types.cta.booking_link">
            <Button
              className="font-heading font-semibold rounded-full px-8"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                color: "white",
              }}
            >
              🛕 पूजा बुकिंग करें
            </Button>
          </Link>
        </div>
      </div>

      {/* Detail Panel */}
      {selected && (
        <PujaDetailPanel puja={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
