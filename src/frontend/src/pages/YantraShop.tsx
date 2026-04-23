import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { Info, Search, ShoppingCart, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ALL_YANTRA_PRODUCTS,
  type YantraProduct,
} from "../data/yantraShopData";
import { useCartStore } from "../stores/cartStore";

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORY_TABS = [
  { key: "all", label: "सभी / All" },
  { key: "puja-yantra", label: "पूजा यंत्र" },
  { key: "hanging-yantra", label: "हैंगिंग यंत्र" },
  { key: "chowki-yantra", label: "चौकी यंत्र" },
  { key: "frame-yantra", label: "फ्रेम यंत्र" },
] as const;

const MATERIAL_FILTERS = [
  "All",
  "Pure Copper",
  "Gold Plated",
  "Ashtadhatu",
  "Brass",
  "Silver",
  "Wood Frame",
] as const;

const CATEGORY_LABELS: Record<string, string> = {
  "puja-yantra": "पूजा यंत्र",
  "hanging-yantra": "हैंगिंग यंत्र",
  "chowki-yantra": "चौकी यंत्र",
  "frame-yantra": "फ्रेम यंत्र",
};

const CATEGORY_COLORS: Record<string, string> = {
  "puja-yantra": "oklch(0.68 0.20 48)",
  "hanging-yantra": "oklch(0.55 0.18 140)",
  "chowki-yantra": "oklch(0.55 0.18 260)",
  "frame-yantra": "oklch(0.60 0.16 35)",
};

type CategoryKey = (typeof CATEGORY_TABS)[number]["key"];

function categoryFromLabel(label: string): string {
  const lower = label.toLowerCase();
  if (lower.includes("puja yantra")) return "puja-yantra";
  if (lower.includes("hanging")) return "hanging-yantra";
  if (lower.includes("chowki")) return "chowki-yantra";
  if (lower.includes("frame")) return "frame-yantra";
  return "puja-yantra";
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function YantraCard({
  product,
  index,
}: {
  product: YantraProduct;
  index: number;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const catKey = categoryFromLabel(product.category);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
    });
    toast.success(`${product.name} — Cart में जोड़ा गया`, {
      description: `₹${product.price.toLocaleString("en-IN")}`,
    });
  };

  return (
    <Link
      to="/shop/$id"
      params={{ id: product.id }}
      className="rounded-2xl border overflow-hidden flex flex-col cursor-pointer group transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
      style={{
        background: "oklch(0.16 0.06 22)",
        borderColor: "oklch(0.78 0.14 75 / 0.18)",
      }}
      data-ocid={`yantra.item.${index + 1}`}
    >
      {/* Image */}
      <div
        className="relative aspect-square flex items-center justify-center"
        style={{ background: "oklch(0.12 0.05 22)" }}
      >
        <div className="text-6xl select-none">🔯</div>
        {!product.inStock && (
          <div
            className="absolute inset-0 flex items-center justify-center text-xs font-bold rounded-t-2xl"
            style={{
              background: "oklch(0.12 0.05 22 / 0.85)",
              color: "oklch(0.78 0.14 75)",
            }}
          >
            Sold Out / उपलब्ध नहीं
          </div>
        )}
        <div
          className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold"
          style={{
            background: `${CATEGORY_COLORS[catKey] ?? "oklch(0.68 0.20 48)"}20`,
            color: CATEGORY_COLORS[catKey] ?? "oklch(0.68 0.20 48)",
            border: `1px solid ${CATEGORY_COLORS[catKey] ?? "oklch(0.68 0.20 48)"}40`,
          }}
        >
          {CATEGORY_LABELS[catKey] ?? product.category}
        </div>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1 gap-1.5">
        <p
          className="text-xs font-body line-clamp-1"
          style={{ color: "oklch(0.65 0.08 60)" }}
        >
          {product.nameHi}
        </p>
        <h3
          className="font-heading text-sm font-semibold leading-snug line-clamp-2"
          style={{ color: "oklch(0.90 0.04 75)" }}
        >
          {product.name}
        </h3>

        <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
          <Badge
            className="text-[10px] px-1.5 py-0 font-body"
            style={{
              background: "oklch(0.78 0.14 75 / 0.12)",
              color: "oklch(0.78 0.14 75)",
              border: "none",
            }}
          >
            {product.material}
          </Badge>
          <span
            className="text-[10px] font-body"
            style={{ color: "oklch(0.55 0.05 60)" }}
          >
            {product.size}
          </span>
        </div>

        {/* Stars placeholder */}
        <div className="flex items-center gap-0.5">
          {["s1", "s2", "s3", "s4", "s5"].map((sk) => (
            <Star
              key={sk}
              className="h-2.5 w-2.5 fill-current"
              style={{ color: "oklch(0.78 0.14 75)" }}
            />
          ))}
          <span
            className="text-[10px] ml-1 font-body"
            style={{ color: "oklch(0.55 0.05 60)" }}
          >
            (4.8)
          </span>
        </div>

        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
          <div>
            <span
              className="font-heading font-bold text-base"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <span
                className="text-xs line-through ml-1.5 font-body"
                style={{ color: "oklch(0.50 0.04 60)" }}
              >
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>
          {product.inStock ? (
            <Button
              size="sm"
              className="text-xs px-2 h-7 gap-1"
              style={{ background: "oklch(0.68 0.20 48)", color: "white" }}
              onClick={handleAddToCart}
              data-ocid={`yantra.add_button.${index + 1}`}
            >
              <ShoppingCart className="h-3 w-3" /> Add
            </Button>
          ) : (
            <Button size="sm" disabled className="text-xs px-2 h-7">
              Sold Out
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function YantraShop() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [activeMaterial, setActiveMaterial] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return ALL_YANTRA_PRODUCTS.filter((p) => {
      const catLabel = p.category.toLowerCase().replace(" ", "-");
      const catOk =
        activeCategory === "all" ||
        catLabel === activeCategory ||
        p.category
          .toLowerCase()
          .replace("puja yantra", "puja-yantra")
          .replace("hanging yantra", "hanging-yantra")
          .replace("chowki yantra", "chowki-yantra")
          .replace("frame yantra", "frame-yantra") === activeCategory;
      const matOk =
        activeMaterial === "All" ||
        p.material.toLowerCase().includes(activeMaterial.toLowerCase());
      const search = searchQuery.toLowerCase();
      const searchOk =
        !search ||
        p.name.toLowerCase().includes(search) ||
        p.nameHi.includes(search) ||
        p.subcategory.toLowerCase().includes(search);
      return catOk && matOk && searchOk;
    });
  }, [activeCategory, activeMaterial, searchQuery]);

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.12 0.05 22)" }}>
      {/* ── Hero Section ── */}
      <section
        className="py-12 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.07 22) 0%, oklch(0.20 0.09 28) 60%, oklch(0.16 0.06 22) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.15)",
        }}
      >
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <p
                className="text-sm font-body mb-2"
                style={{ color: "oklch(0.68 0.20 48)" }}
              >
                🔯 प्राण-प्रतिष्ठित सिद्ध यंत्र
              </p>
              <h1
                className="font-heading text-3xl md:text-4xl font-bold mb-3 leading-tight"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                पूजा यंत्र शॉप
                <br />
                <span
                  className="text-xl md:text-2xl font-medium"
                  style={{ color: "oklch(0.88 0.06 75)" }}
                >
                  Puja Yantra Shop
                </span>
              </h1>
              <p
                className="font-body text-sm leading-relaxed mb-3"
                style={{ color: "oklch(0.70 0.04 60)" }}
              >
                ये सभी प्रकार के यंत्र{" "}
                <strong style={{ color: "oklch(0.78 0.14 75)" }}>
                  पूर्ण प्राण-प्रतिष्ठित सिद्ध
                </strong>{" "}
                किये जाते हैं। गुरु पुष्य योग, सिद्ध योग, रवि योग, ग्रहण, होली, दीपावली,
                नवरात्रि में सिद्ध।
              </p>
              <p
                className="font-body text-xs leading-relaxed"
                style={{ color: "oklch(0.60 0.04 55)" }}
              >
                Astro Mantra has been providing all types of Puja Yantra,
                Hanging Yantras and Chowki Yantras for many years. These Yantras
                are <strong>Purna Pran-Pratisthit Siddha</strong> — energized
                during auspicious Vedic timings.
              </p>
              <Link
                to="/yantra-info"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-heading font-semibold transition-all duration-200 hover:opacity-90"
                style={{
                  background: "oklch(0.68 0.20 48 / 0.15)",
                  color: "oklch(0.78 0.14 75)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.30)",
                }}
                data-ocid="yantra.info_link"
              >
                <Info className="h-4 w-4" />
                यंत्र जानकारी / Learn About Yantras
              </Link>
            </div>
            <div className="text-center hidden md:block">
              <div className="text-8xl mb-2">🔯</div>
              <p
                className="text-xs font-body"
                style={{ color: "oklch(0.55 0.05 60)" }}
              >
                {ALL_YANTRA_PRODUCTS.length}+ यंत्र उपलब्ध
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filters ── */}
      <section
        className="sticky top-16 z-40 py-3 px-4 border-b"
        style={{
          background: "oklch(0.14 0.06 22 / 0.95)",
          borderColor: "oklch(0.78 0.14 75 / 0.12)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="container mx-auto max-w-6xl space-y-2">
          {/* Category Tabs */}
          <div className="flex gap-1.5 flex-wrap" data-ocid="yantra.filter.tab">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className="px-3 py-1.5 rounded-full text-xs font-heading font-semibold transition-all duration-200"
                style={{
                  background:
                    activeCategory === tab.key
                      ? "oklch(0.68 0.20 48)"
                      : "oklch(0.20 0.07 22)",
                  color:
                    activeCategory === tab.key
                      ? "white"
                      : "oklch(0.78 0.14 75)",
                  border: `1px solid ${activeCategory === tab.key ? "oklch(0.68 0.20 48)" : "oklch(0.78 0.14 75 / 0.20)"}`,
                }}
                onClick={() => setActiveCategory(tab.key)}
                data-ocid={`yantra.category.${tab.key}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Material + Search Row */}
          <div className="flex gap-2 flex-wrap items-center">
            <div className="flex gap-1.5 flex-wrap">
              {MATERIAL_FILTERS.map((m) => (
                <button
                  key={m}
                  type="button"
                  className="px-2.5 py-1 rounded-full text-[10px] font-body transition-all"
                  style={{
                    background:
                      activeMaterial === m
                        ? "oklch(0.78 0.14 75 / 0.20)"
                        : "oklch(0.16 0.06 22)",
                    color:
                      activeMaterial === m
                        ? "oklch(0.78 0.14 75)"
                        : "oklch(0.60 0.05 60)",
                    border: `1px solid ${activeMaterial === m ? "oklch(0.78 0.14 75 / 0.40)" : "oklch(0.78 0.14 75 / 0.10)"}`,
                  }}
                  onClick={() => setActiveMaterial(m)}
                  data-ocid={`yantra.material.${m.toLowerCase().replace(" ", "-")}`}
                >
                  {m}
                </button>
              ))}
            </div>
            <div className="relative ml-auto min-w-[180px]">
              <Search
                className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5"
                style={{ color: "oklch(0.55 0.05 60)" }}
              />
              <Input
                placeholder="खोजें... (Ganesh, Kuber...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-8 text-xs font-body rounded-full"
                style={{
                  background: "oklch(0.18 0.06 22)",
                  borderColor: "oklch(0.78 0.14 75 / 0.20)",
                  color: "oklch(0.88 0.04 75)",
                }}
                data-ocid="yantra.search_input"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Info Banner ── */}
      <section
        className="py-3 px-4"
        style={{
          background: "oklch(0.68 0.20 48 / 0.08)",
          borderBottom: "1px solid oklch(0.68 0.20 48 / 0.15)",
        }}
      >
        <div className="container mx-auto max-w-6xl flex flex-wrap gap-4 items-center justify-between">
          <p
            className="text-xs font-body"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🔯 {filtered.length} यंत्र मिले &nbsp;|&nbsp; सभी यंत्र प्राण-प्रतिष्ठित
            सिद्ध
          </p>
          <div className="flex gap-2">
            {(
              [
                "puja-yantra",
                "hanging-yantra",
                "chowki-yantra",
                "frame-yantra",
              ] as const
            ).map((cat) => (
              <Link
                key={cat}
                to="/yantra-info/$category"
                params={{ category: cat }}
                className="text-[10px] font-body px-2.5 py-1 rounded-full transition-colors hover:opacity-80"
                style={{
                  background: "oklch(0.78 0.14 75 / 0.12)",
                  color: "oklch(0.78 0.14 75)",
                }}
                data-ocid={`yantra.info.${cat}`}
              >
                {CATEGORY_LABELS[cat]} Info
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {filtered.length === 0 ? (
            <div className="text-center py-16" data-ocid="yantra.empty_state">
              <div className="text-5xl mb-4">🔯</div>
              <p
                className="font-heading text-lg"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                कोई यंत्र नहीं मिला
              </p>
              <p
                className="text-sm font-body mt-2"
                style={{ color: "oklch(0.55 0.05 60)" }}
              >
                Try a different filter or search term
              </p>
              <Button
                className="mt-4"
                onClick={() => {
                  setActiveCategory("all");
                  setActiveMaterial("All");
                  setSearchQuery("");
                }}
                style={{ background: "oklch(0.68 0.20 48)", color: "white" }}
                data-ocid="yantra.reset_button"
              >
                सभी दिखाएं / Show All
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filtered.map((p, i) => (
                <YantraCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
