import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  Filter,
  MessageCircle,
  ShoppingCart,
  Star,
  Watch,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  LUCK_WATCHES,
  type LuckWatch,
  WATCH_FILTER_CONFIG,
} from "../data/luckWatches";
import {
  ALL_SHOP_PRODUCTS,
  SHOP_BY_TEMPLE,
  SHOP_PURPOSES,
} from "../data/shop-products-data";
import {
  BOOK_DETAILS,
  GEMSTONE_DETAILS,
  RUDRAKSHA_DETAILS,
  SHOP_PRODUCTS,
  YANTRA_DETAILS,
} from "../data/shopData";
import { ASTROLOGY_SERVICES } from "../data/shopData_astrology_services";
import {
  BEST_SELLER_IDS,
  NEW_ARRIVAL_IDS,
  SHOP_PRODUCTS_C,
} from "../data/shopData_c";
import { herbCategories, herbsProducts } from "../data/shopData_herbs";
import {
  MISSING_PRODUCTS,
  MISSING_PRODUCT_CATEGORIES,
  type ProductWithMRP as MissingProductWithMRP,
} from "../data/shopData_missing_products";
import { ALL_NEW_PRODUCTS } from "../data/shopData_new";
import {
  ALL_NEW_CATEGORY_PRODUCTS,
  BRACELETS_GENERAL,
  GEMSTONE_RINGS,
  GOLD_JEWELLERY,
  IDOLS_PRODUCTS,
  LAMPS_3D,
  PENDANTS_GENERAL,
  RINGS_NON_GEM,
  SPIRITUAL_NECKLACES,
} from "../data/shopData_new_categories";
import {
  SILVER_PRODUCTS,
  SILVER_RAKHIS,
  SILVER_YANTRAS,
} from "../data/shopData_silver925";
import type { ShopProduct } from "../data/shopData_silver925";
import { useGetAllProducts } from "../hooks/useQueries";
import { useCartStore } from "../stores/cartStore";
import type { Product } from "../types/backend-types";

// ─── Types ─────────────────────────────────────────────────────────────────────

type Concern =
  | "Pregnancy"
  | "Abundance & Wealth"
  | "Love & Relationship"
  | "Health & Well Being"
  | "Education & Career"
  | "Mental Wellness";

interface RattiTier {
  label: string;
  price: number;
  isBest?: boolean;
}

// ─── Gemstone Ratti Pricing ────────────────────────────────────────────────────

const GEMSTONE_RATTI_PRICES: Record<string, RattiTier[]> = {
  Ruby: [
    { label: "3-4 Ratti", price: 4999 },
    { label: "4-5 Ratti", price: 6499, isBest: true },
    { label: "5-6 Ratti", price: 8999 },
    { label: "6-7 Ratti", price: 11499 },
    { label: "7-8 Ratti", price: 14999 },
    { label: "8-9 Ratti", price: 18499 },
    { label: "9-10 Ratti", price: 22999 },
    { label: "10-11 Ratti", price: 27499 },
    { label: "Above 11 Ratti", price: 32999 },
  ],
  Pearl: [
    { label: "3-4 Ratti", price: 2499 },
    { label: "4-5 Ratti", price: 3499, isBest: true },
    { label: "5-6 Ratti", price: 4999 },
    { label: "6-7 Ratti", price: 6499 },
    { label: "7-8 Ratti", price: 8499 },
    { label: "8-9 Ratti", price: 10999 },
    { label: "9-10 Ratti", price: 13499 },
    { label: "10-11 Ratti", price: 16499 },
    { label: "Above 11 Ratti", price: 19999 },
  ],
  Coral: [
    { label: "3-4 Ratti", price: 1999 },
    { label: "4-5 Ratti", price: 2799, isBest: true },
    { label: "5-6 Ratti", price: 3999 },
    { label: "6-7 Ratti", price: 5299 },
    { label: "7-8 Ratti", price: 6999 },
    { label: "8-9 Ratti", price: 8999 },
    { label: "9-10 Ratti", price: 10999 },
    { label: "10-11 Ratti", price: 13499 },
    { label: "Above 11 Ratti", price: 15999 },
  ],
  Emerald: [
    { label: "3-4 Ratti", price: 3999 },
    { label: "4-5 Ratti", price: 5499, isBest: true },
    { label: "5-6 Ratti", price: 7999 },
    { label: "6-7 Ratti", price: 10499 },
    { label: "7-8 Ratti", price: 13499 },
    { label: "8-9 Ratti", price: 16999 },
    { label: "9-10 Ratti", price: 20999 },
    { label: "10-11 Ratti", price: 24999 },
    { label: "Above 11 Ratti", price: 29999 },
  ],
  "Yellow Sapphire": [
    { label: "3-4 Ratti", price: 4499 },
    { label: "4-5 Ratti", price: 5999, isBest: true },
    { label: "5-6 Ratti", price: 8499 },
    { label: "6-7 Ratti", price: 10999 },
    { label: "7-8 Ratti", price: 14499 },
    { label: "8-9 Ratti", price: 17999 },
    { label: "9-10 Ratti", price: 22499 },
    { label: "10-11 Ratti", price: 26999 },
    { label: "Above 11 Ratti", price: 31999 },
  ],
  "Blue Sapphire": [
    { label: "3-4 Ratti", price: 5999 },
    { label: "4-5 Ratti", price: 7999, isBest: true },
    { label: "5-6 Ratti", price: 11499 },
    { label: "6-7 Ratti", price: 14999 },
    { label: "7-8 Ratti", price: 19499 },
    { label: "8-9 Ratti", price: 24499 },
    { label: "9-10 Ratti", price: 29999 },
    { label: "10-11 Ratti", price: 35999 },
    { label: "Above 11 Ratti", price: 42999 },
  ],
  Hessonite: [
    { label: "3-4 Ratti", price: 1499 },
    { label: "4-5 Ratti", price: 2199, isBest: true },
    { label: "5-6 Ratti", price: 2999 },
    { label: "6-7 Ratti", price: 3999 },
    { label: "7-8 Ratti", price: 4999 },
    { label: "8-9 Ratti", price: 6499 },
    { label: "9-10 Ratti", price: 7999 },
    { label: "10-11 Ratti", price: 9499 },
    { label: "Above 11 Ratti", price: 11999 },
  ],
  "Cat's Eye": [
    { label: "3-4 Ratti", price: 3499 },
    { label: "4-5 Ratti", price: 4999, isBest: true },
    { label: "5-6 Ratti", price: 6999 },
    { label: "6-7 Ratti", price: 8999 },
    { label: "7-8 Ratti", price: 11499 },
    { label: "8-9 Ratti", price: 14499 },
    { label: "9-10 Ratti", price: 17999 },
    { label: "10-11 Ratti", price: 21499 },
    { label: "Above 11 Ratti", price: 25999 },
  ],
  "Lapis Lazuli": [
    { label: "3-4 Ratti", price: 1299 },
    { label: "4-5 Ratti", price: 1799, isBest: true },
    { label: "5-6 Ratti", price: 2499 },
    { label: "6-7 Ratti", price: 3299 },
    { label: "7-8 Ratti", price: 4299 },
    { label: "8-9 Ratti", price: 5499 },
    { label: "9-10 Ratti", price: 6799 },
    { label: "10-11 Ratti", price: 7999 },
    { label: "Above 11 Ratti", price: 9999 },
  ],
};

// Map gemstone product names → ratti key
function getGemstoneKey(name: string): string | null {
  const lower = name.toLowerCase();
  if (lower.includes("ruby") || lower.includes("manik")) return "Ruby";
  if (lower.includes("pearl") || lower.includes("moti")) return "Pearl";
  if (lower.includes("coral") || lower.includes("moonga")) return "Coral";
  if (lower.includes("emerald") || lower.includes("panna")) return "Emerald";
  if (lower.includes("yellow sapphire") || lower.includes("pukhraj"))
    return "Yellow Sapphire";
  if (lower.includes("blue sapphire") || lower.includes("neelam"))
    return "Blue Sapphire";
  if (lower.includes("hessonite") || lower.includes("gomed"))
    return "Hessonite";
  if (lower.includes("cat's eye") || lower.includes("lahsuniya"))
    return "Cat's Eye";
  if (lower.includes("lapis lazuli")) return "Lapis Lazuli";
  return null;
}

// ─── Luck Watch Availability Badge ────────────────────────────────────────────

function AvailabilityBadge({
  availability,
}: { availability: LuckWatch["availability"] }) {
  if (availability === "in-stock")
    return (
      <span
        className="text-xs font-heading font-bold px-2 py-0.5 rounded-full"
        style={{
          background: "oklch(0.55 0.18 145 / 0.18)",
          color: "oklch(0.55 0.18 145)",
          border: "1px solid oklch(0.55 0.18 145 / 0.3)",
        }}
      >
        ✓ In Stock
      </span>
    );
  if (availability === "pre-order")
    return (
      <span
        className="text-xs font-heading font-bold px-2 py-0.5 rounded-full"
        style={{
          background: "oklch(0.72 0.16 75 / 0.18)",
          color: "oklch(0.68 0.16 68)",
          border: "1px solid oklch(0.68 0.16 68 / 0.3)",
        }}
      >
        ⏳ Pre-Order
      </span>
    );
  return (
    <span
      className="text-xs font-heading font-bold px-2 py-0.5 rounded-full"
      style={{
        background: "oklch(0.50 0.05 60 / 0.2)",
        color: "oklch(0.55 0.05 55)",
        border: "1px solid oklch(0.50 0.05 55 / 0.3)",
      }}
    >
      Sold Out
    </span>
  );
}

// ─── Luck Watch Card ────────────────────────────────────────────────────────────

function LuckWatchCard({
  watch,
  onAddToCart,
  index,
}: {
  watch: LuckWatch;
  onAddToCart: (w: LuckWatch) => void;
  index: number;
}) {
  const isSoldOut = watch.availability === "sold-out";
  const isPreOrder = watch.availability === "pre-order";

  // Dial color to gradient mapping
  const dialGradients: Record<string, string> = {
    green:
      "linear-gradient(135deg, oklch(0.82 0.16 145), oklch(0.68 0.18 138))",
    white: "linear-gradient(135deg, oklch(0.96 0.02 80), oklch(0.90 0.03 75))",
    silver:
      "linear-gradient(135deg, oklch(0.88 0.02 200), oklch(0.80 0.03 210))",
    gold: "linear-gradient(135deg, oklch(0.82 0.18 68), oklch(0.72 0.20 55))",
  };
  const gradient =
    dialGradients[watch.dialColor] ??
    "linear-gradient(135deg, oklch(0.82 0.10 48), oklch(0.72 0.12 40))";

  return (
    <div
      className="rounded-2xl border overflow-hidden flex flex-col transition-all hover:shadow-lg hover:-translate-y-0.5"
      style={{
        background: "oklch(0.16 0.05 30)",
        borderColor: isSoldOut
          ? "oklch(0.30 0.04 40)"
          : "oklch(0.32 0.08 42 / 0.7)",
        opacity: isSoldOut ? 0.75 : 1,
      }}
      data-ocid={`shop.luck_watch.item.${index + 1}`}
    >
      {/* Watch Image / Dial Visualization */}
      <div
        className="relative h-44 flex items-center justify-center"
        style={{ background: "oklch(0.13 0.04 28)" }}
      >
        {/* Decorative watch face */}
        <div
          className="w-28 h-28 rounded-full flex items-center justify-center shadow-2xl border-4"
          style={{
            background: gradient,
            borderColor:
              watch.strapColor === "golden" || watch.strapColor === "gold"
                ? "oklch(0.72 0.20 55)"
                : watch.strapColor === "dual-tone"
                  ? "oklch(0.75 0.08 200)"
                  : "oklch(0.80 0.04 80)",
          }}
        >
          <Watch
            className="w-10 h-10"
            style={{ color: "oklch(0.14 0.04 22 / 0.6)" }}
          />
        </div>
        {/* Badges overlay */}
        <div className="absolute top-2.5 left-2.5">
          <AvailabilityBadge availability={watch.availability} />
        </div>
        {watch.gender === "female" && (
          <div className="absolute top-2.5 right-2.5">
            <span
              className="text-xs font-heading font-bold px-2 py-0.5 rounded-full"
              style={{
                background: "oklch(0.70 0.14 340 / 0.18)",
                color: "oklch(0.72 0.14 340)",
                border: "1px solid oklch(0.70 0.14 340 / 0.3)",
              }}
            >
              ♀ Female
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <h3
            className="font-heading font-bold text-sm leading-tight mb-1"
            style={{ color: "oklch(0.84 0.12 72)" }}
          >
            {watch.name}
          </h3>
          {/* Price row */}
          <div className="flex items-baseline gap-2">
            <span
              className="font-heading font-bold text-base"
              style={{ color: "oklch(0.72 0.20 52)" }}
            >
              ₹{watch.price.toLocaleString()}
            </span>
            {watch.originalPrice && (
              <span
                className="text-xs font-body line-through"
                style={{ color: "oklch(0.52 0.05 55)" }}
              >
                ₹{watch.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Numerology numbers */}
        <div>
          <p
            className="text-xs font-heading font-semibold mb-1.5"
            style={{ color: "oklch(0.68 0.10 55)" }}
          >
            🔢 Lucky for Moolank:
          </p>
          <div className="flex flex-wrap gap-1">
            {watch.numerologyNumbers.map((num) => (
              <span
                key={num}
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-heading font-bold"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                  color: "white",
                }}
              >
                {num}
              </span>
            ))}
          </div>
        </div>

        <p
          className="text-xs font-body leading-relaxed line-clamp-3 flex-1"
          style={{ color: "oklch(0.64 0.06 52)" }}
        >
          {watch.description}
        </p>

        {/* Add to cart */}
        <Button
          onClick={() => !isSoldOut && onAddToCart(watch)}
          disabled={isSoldOut}
          className="w-full font-heading font-semibold text-xs py-2 transition-all"
          style={
            isSoldOut
              ? {
                  background: "oklch(0.30 0.04 40)",
                  color: "oklch(0.55 0.04 50)",
                  cursor: "not-allowed",
                }
              : {
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.56 0.18 40))",
                  color: "white",
                }
          }
          data-ocid={`shop.luck_watch.add_to_cart.${index + 1}`}
        >
          {isSoldOut ? (
            "Sold Out"
          ) : isPreOrder ? (
            <>
              <ShoppingCart className="w-3 h-3 mr-1" /> Pre-Order Now
            </>
          ) : (
            <>
              <ShoppingCart className="w-3 h-3 mr-1" /> Add to Cart
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

// ─── Luck Watches Section ──────────────────────────────────────────────────────

function LuckWatchesSection({
  onAddToCart,
}: { onAddToCart: (w: LuckWatch) => void }) {
  const [availFilter, setAvailFilter] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState(24000);
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<
    "relevance" | "price-asc" | "price-desc"
  >("relevance");

  const filtered = useMemo(() => {
    let result = LUCK_WATCHES.filter((w) => {
      const availMatch =
        availFilter.length === 0 || availFilter.includes(w.availability);
      const priceMatch = w.price <= priceMax;
      const typeMatch =
        typeFilter.length === 0 ||
        typeFilter.some((t) => w.productType.includes(t));
      return availMatch && priceMatch && typeMatch;
    });
    if (sortBy === "price-asc")
      result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc")
      result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [availFilter, priceMax, typeFilter, sortBy]);

  const toggleAvail = (val: string) =>
    setAvailFilter((prev) =>
      prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val],
    );

  const toggleType = (val: string) =>
    setTypeFilter((prev) =>
      prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val],
    );

  const inStock = LUCK_WATCHES.filter(
    (w) => w.availability === "in-stock",
  ).length;
  const outOfStock = LUCK_WATCHES.filter(
    (w) => w.availability === "sold-out",
  ).length;

  return (
    <section
      className="border-b"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.14 0.06 28) 0%, oklch(0.12 0.04 26) 100%)",
        borderColor: "oklch(0.28 0.08 35)",
      }}
      id="luck-watches"
      data-ocid="shop.luck_watches.section"
    >
      <div className="container mx-auto px-4 py-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3"
            style={{
              background: "oklch(0.68 0.20 48 / 0.12)",
              border: "1px solid oklch(0.68 0.20 48 / 0.25)",
            }}
          >
            <span className="text-sm">⌚</span>
            <span
              className="text-xs font-heading font-semibold tracking-widest uppercase"
              style={{ color: "oklch(0.72 0.16 55)" }}
            >
              Numerology Exclusive Collection
            </span>
          </div>
          <h2
            className="font-heading text-3xl md:text-4xl font-bold mb-2"
            style={{ color: "oklch(0.84 0.16 72)" }}
          >
            🔢 Numerology Luck Watches
          </h2>
          <p
            className="font-heading text-base mb-1"
            style={{ color: "oklch(0.68 0.12 58)" }}
          >
            अंकशास्त्र लक घड़ियाँ
          </p>
          <p
            className="text-sm max-w-lg mx-auto"
            style={{ color: "oklch(0.58 0.06 52)" }}
          >
            Each watch is energetically aligned to specific Moolank (birth
            number) vibrations. Wear your lucky number, amplify your destiny.
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div
              className="h-px flex-1 max-w-16"
              style={{ background: "oklch(0.68 0.20 48 / 0.3)" }}
            />
            <span style={{ color: "oklch(0.68 0.20 48)" }}>⌚</span>
            <div
              className="h-px flex-1 max-w-16"
              style={{ background: "oklch(0.68 0.20 48 / 0.3)" }}
            />
          </div>
          <div className="mt-4 flex justify-center">
            <Link
              to="/shop/numerology-watches"
              data-ocid="shop.numerology_watches_link"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-heading font-semibold transition-colors hover:opacity-80"
              style={{
                background: "oklch(0.68 0.20 48 / 0.15)",
                border: "1px solid oklch(0.68 0.20 48 / 0.40)",
                color: "oklch(0.82 0.16 65)",
              }}
            >
              <Watch className="w-3.5 h-3.5" />
              Browse All Numerology Timepieces →
            </Link>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:w-52 shrink-0 space-y-5">
            {/* Availability */}
            <div
              className="rounded-xl border p-4 space-y-2.5"
              style={{
                background: "oklch(0.16 0.05 28)",
                borderColor: "oklch(0.28 0.06 32)",
              }}
            >
              <p
                className="text-xs font-heading font-bold uppercase tracking-wide"
                style={{ color: "oklch(0.72 0.12 58)" }}
              >
                Availability
              </p>
              {[
                { value: "in-stock", label: `In stock (${inStock})` },
                { value: "sold-out", label: `Out of stock (${outOfStock})` },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={availFilter.includes(opt.value)}
                    onChange={() => toggleAvail(opt.value)}
                    className="rounded"
                    data-ocid={`shop.luck_watches.avail_filter.${opt.value}`}
                  />
                  <span
                    className="text-xs font-body"
                    style={{ color: "oklch(0.72 0.06 55)" }}
                  >
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>

            {/* Price Range */}
            <div
              className="rounded-xl border p-4 space-y-3"
              style={{
                background: "oklch(0.16 0.05 28)",
                borderColor: "oklch(0.28 0.06 32)",
              }}
            >
              <p
                className="text-xs font-heading font-bold uppercase tracking-wide"
                style={{ color: "oklch(0.72 0.12 58)" }}
              >
                Price
              </p>
              <div
                className="flex items-center justify-between text-xs font-heading"
                style={{ color: "oklch(0.62 0.08 55)" }}
              >
                <span>₹0</span>
                <span>₹{priceMax.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={0}
                max={24000}
                step={1000}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-amber-500"
                data-ocid="shop.luck_watches.price_slider"
              />
              <div className="flex gap-2">
                <div
                  className="flex-1 text-center text-xs rounded px-2 py-1 font-heading font-semibold"
                  style={{
                    background: "oklch(0.20 0.06 30)",
                    color: "oklch(0.75 0.10 60)",
                  }}
                >
                  From ₹0
                </div>
                <div
                  className="flex-1 text-center text-xs rounded px-2 py-1 font-heading font-semibold"
                  style={{
                    background: "oklch(0.20 0.06 30)",
                    color: "oklch(0.75 0.10 60)",
                  }}
                >
                  To ₹{priceMax.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Product Type */}
            <div
              className="rounded-xl border p-4 space-y-2.5"
              style={{
                background: "oklch(0.16 0.05 28)",
                borderColor: "oklch(0.28 0.06 32)",
              }}
            >
              <p
                className="text-xs font-heading font-bold uppercase tracking-wide"
                style={{ color: "oklch(0.72 0.12 58)" }}
              >
                Filter on Product Type
              </p>
              {WATCH_FILTER_CONFIG.productTypes.map((pt) => (
                <label
                  key={pt.value}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={typeFilter.includes(pt.value)}
                    onChange={() => toggleType(pt.value)}
                    className="rounded"
                    data-ocid={`shop.luck_watches.type_filter.${pt.value.replace(/[^a-z0-9]/gi, "_").toLowerCase()}`}
                  />
                  <span
                    className="text-xs font-body"
                    style={{ color: "oklch(0.70 0.06 55)" }}
                  >
                    {pt.label} ({pt.count})
                  </span>
                </label>
              ))}
            </div>

            {/* Sort */}
            <div
              className="rounded-xl border p-4"
              style={{
                background: "oklch(0.16 0.05 28)",
                borderColor: "oklch(0.28 0.06 32)",
              }}
            >
              <p
                className="text-xs font-heading font-bold uppercase tracking-wide mb-2.5"
                style={{ color: "oklch(0.72 0.12 58)" }}
              >
                Sort by
              </p>
              {[
                { value: "relevance" as const, label: "Relevance" },
                { value: "price-asc" as const, label: "Price: Low to High" },
                { value: "price-desc" as const, label: "Price: High to Low" },
              ].map((s) => (
                <label
                  key={s.value}
                  className="flex items-center gap-2 cursor-pointer mb-2"
                >
                  <input
                    type="radio"
                    name="luck-watch-sort"
                    checked={sortBy === s.value}
                    onChange={() => setSortBy(s.value)}
                    data-ocid={`shop.luck_watches.sort.${s.value}`}
                  />
                  <span
                    className="text-xs font-body"
                    style={{ color: "oklch(0.70 0.06 55)" }}
                  >
                    {s.label}
                  </span>
                </label>
              ))}
            </div>
          </aside>

          {/* Watch Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p
                className="text-xs font-body"
                style={{ color: "oklch(0.58 0.06 52)" }}
              >
                Showing {filtered.length} of {LUCK_WATCHES.length} watches
              </p>
              {(availFilter.length > 0 ||
                typeFilter.length > 0 ||
                priceMax < 24000) && (
                <button
                  type="button"
                  onClick={() => {
                    setAvailFilter([]);
                    setTypeFilter([]);
                    setPriceMax(24000);
                    setSortBy("relevance");
                  }}
                  className="text-xs font-heading font-semibold"
                  style={{ color: "oklch(0.68 0.20 48)" }}
                  data-ocid="shop.luck_watches.clear_filters_button"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <div
                className="py-16 text-center rounded-xl border"
                style={{ borderColor: "oklch(0.28 0.06 32)" }}
                data-ocid="shop.luck_watches.empty_state"
              >
                <div className="text-4xl mb-3">⌚</div>
                <p
                  className="font-heading text-sm"
                  style={{ color: "oklch(0.65 0.08 55)" }}
                >
                  No watches match your filters
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setAvailFilter([]);
                    setTypeFilter([]);
                    setPriceMax(24000);
                  }}
                  className="mt-3 text-xs font-heading font-semibold"
                  style={{ color: "oklch(0.68 0.20 48)" }}
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((watch, i) => (
                  <LuckWatchCard
                    key={watch.id}
                    watch={watch}
                    onAddToCart={onAddToCart}
                    index={i}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Browse-by-Category Grid (18 featured categories) ─────────────────────────

interface BrowseCategory {
  id: string;
  label: string;
  labelHindi: string;
  emoji: string;
  mapToCategory: string; // which CATEGORIES value to set on click
  gradient: string;
}

const BROWSE_CATEGORIES: BrowseCategory[] = [
  {
    id: "rudraksha-1",
    label: "Rudraksha — 1 Mukhi",
    labelHindi: "एक मुखी रुद्राक्ष",
    emoji: "🟤",
    mapToCategory: "Rudraksha",
    gradient:
      "linear-gradient(135deg, oklch(0.85 0.10 48), oklch(0.78 0.14 38))",
  },
  {
    id: "rudraksha-2-5",
    label: "Rudraksha — 2–5 Mukhi",
    labelHindi: "2–5 मुखी रुद्राक्ष",
    emoji: "🪨",
    mapToCategory: "Rudraksha",
    gradient:
      "linear-gradient(135deg, oklch(0.82 0.12 45), oklch(0.75 0.14 40))",
  },
  {
    id: "rudraksha-6-10",
    label: "Rudraksha — 6–10 Mukhi",
    labelHindi: "6–10 मुखी रुद्राक्ष",
    emoji: "🔮",
    mapToCategory: "Rudraksha",
    gradient:
      "linear-gradient(135deg, oklch(0.80 0.14 50), oklch(0.72 0.16 44))",
  },
  {
    id: "rudraksha-rare",
    label: "Rudraksha — 11–21 Mukhi",
    labelHindi: "दुर्लभ रुद्राक्ष",
    emoji: "⭐",
    mapToCategory: "Rudraksha",
    gradient:
      "linear-gradient(135deg, oklch(0.78 0.18 52), oklch(0.68 0.20 46))",
  },
  {
    id: "gemstones",
    label: "Gemstones (Ratna)",
    labelHindi: "रत्न (नवरत्न)",
    emoji: "💎",
    mapToCategory: "Gemstones",
    gradient:
      "linear-gradient(135deg, oklch(0.82 0.10 200), oklch(0.72 0.14 195))",
  },
  {
    id: "rings",
    label: "Rings (Anguthi)",
    labelHindi: "अंगूठी / अंगुठी",
    emoji: "💍",
    mapToCategory: "Rings",
    gradient:
      "linear-gradient(135deg, oklch(0.84 0.08 75), oklch(0.76 0.12 68))",
  },
  {
    id: "yantras",
    label: "Yantras",
    labelHindi: "यंत्र (पवित्र ज्यामिति)",
    emoji: "🔯",
    mapToCategory: "Yantras",
    gradient:
      "linear-gradient(135deg, oklch(0.80 0.14 30), oklch(0.70 0.16 25))",
  },
  {
    id: "herbs",
    label: "Herbs & Aushadhi",
    labelHindi: "जड़ी-बूटियाँ",
    emoji: "🌿",
    mapToCategory: "Herbs",
    gradient:
      "linear-gradient(135deg, oklch(0.85 0.14 145), oklch(0.75 0.16 138))",
  },
  {
    id: "puja-items",
    label: "Puja Items & Samagri",
    labelHindi: "पूजा सामग्री",
    emoji: "🪔",
    mapToCategory: "Puja Items",
    gradient:
      "linear-gradient(135deg, oklch(0.84 0.16 55), oklch(0.74 0.18 48))",
  },
  {
    id: "books",
    label: "Books & Shastra",
    labelHindi: "पुस्तकें व शास्त्र",
    emoji: "📚",
    mapToCategory: "Books",
    gradient:
      "linear-gradient(135deg, oklch(0.80 0.10 260), oklch(0.70 0.14 255))",
  },
  {
    id: "idols",
    label: "Idols & Murtis",
    labelHindi: "देव प्रतिमाएं",
    emoji: "🪆",
    mapToCategory: "God Idols",
    gradient:
      "linear-gradient(135deg, oklch(0.82 0.12 30), oklch(0.72 0.14 25))",
  },
  {
    id: "malas",
    label: "Malas & Rosaries",
    labelHindi: "माला / मणका",
    emoji: "📿",
    mapToCategory: "Ritual Items",
    gradient:
      "linear-gradient(135deg, oklch(0.80 0.16 48), oklch(0.70 0.18 42))",
  },
  {
    id: "kavach",
    label: "Kavach & Pendants",
    labelHindi: "कवच व पेंडेंट",
    emoji: "🛡️",
    mapToCategory: "God Pendants",
    gradient:
      "linear-gradient(135deg, oklch(0.78 0.12 345), oklch(0.68 0.14 340))",
  },
  {
    id: "oils",
    label: "Essential Oils & Ittar",
    labelHindi: "इत्र व तेल",
    emoji: "🌸",
    mapToCategory: "Puja Samagri",
    gradient:
      "linear-gradient(135deg, oklch(0.84 0.12 320), oklch(0.74 0.14 315))",
  },
  {
    id: "incense",
    label: "Incense & Dhoop",
    labelHindi: "अगरबत्ती / धूप",
    emoji: "🕯️",
    mapToCategory: "Puja Items",
    gradient:
      "linear-gradient(135deg, oklch(0.82 0.10 60), oklch(0.72 0.12 55))",
  },
  {
    id: "copper-brass",
    label: "Copper & Brass Items",
    labelHindi: "तांबा व पीतल",
    emoji: "🥇",
    mapToCategory: "Puja Items",
    gradient:
      "linear-gradient(135deg, oklch(0.80 0.16 52), oklch(0.70 0.18 46))",
  },
  {
    id: "himalayan",
    label: "Himalayan Products",
    labelHindi: "हिमालयी उत्पाद",
    emoji: "🏔️",
    mapToCategory: "Crystals",
    gradient:
      "linear-gradient(135deg, oklch(0.84 0.10 195), oklch(0.74 0.12 188))",
  },
  {
    id: "gift-sets",
    label: "Gift Sets & Hampers",
    labelHindi: "उपहार सेट",
    emoji: "🎁",
    mapToCategory: "Combos",
    gradient:
      "linear-gradient(135deg, oklch(0.80 0.18 48), oklch(0.70 0.20 42))",
  },
];

// ─── Featured Collection Banners ───────────────────────────────────────────────

interface FeaturedCollection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  emoji: string;
  bg: string;
  accentColor: string;
  category: string;
  tags: string[];
}

const FEATURED_COLLECTIONS: FeaturedCollection[] = [
  {
    id: "rudraksha-collection",
    title: "Rudraksha Sangrah",
    subtitle: "रुद्राक्ष संग्रह",
    description: "1 Mukhi to 21 Mukhi — handpicked, energised & certified",
    emoji: "🟤",
    bg: "linear-gradient(135deg, oklch(0.32 0.10 25) 0%, oklch(0.22 0.08 22) 60%, oklch(0.18 0.06 20) 100%)",
    accentColor: "oklch(0.78 0.14 75)",
    category: "Rudraksha",
    tags: [
      "1 Mukhi",
      "5 Mukhi",
      "7 Mukhi",
      "11 Mukhi",
      "Gauri Shankar",
      "21 Mukhi",
    ],
  },
  {
    id: "gemstone-collection",
    title: "Navaratna Ratna",
    subtitle: "नवरत्न रत्न भंडार",
    description:
      "Certified, Prana-Pratishtha energised gemstones for all 9 planets",
    emoji: "💎",
    bg: "linear-gradient(135deg, oklch(0.25 0.12 200) 0%, oklch(0.18 0.08 195) 60%, oklch(0.14 0.06 190) 100%)",
    accentColor: "oklch(0.72 0.16 200)",
    category: "Gemstones",
    tags: ["Ruby", "Pearl", "Emerald", "Sapphire", "Coral", "Yellow Sapphire"],
  },
  {
    id: "yantra-collection",
    title: "Sacred Yantra Mandala",
    subtitle: "पवित्र यंत्र मंडल",
    description:
      "Copper, brass & silver yantras — consecrated with Vedic rituals",
    emoji: "🔯",
    bg: "linear-gradient(135deg, oklch(0.28 0.12 30) 0%, oklch(0.20 0.08 26) 60%, oklch(0.16 0.06 22) 100%)",
    accentColor: "oklch(0.75 0.18 55)",
    category: "Yantras",
    tags: [
      "Shree Yantra",
      "Kali Yantra",
      "Kuber Yantra",
      "Navgrah Yantra",
      "Vastu Yantra",
    ],
  },
];

// ─── Browse by Category Component ─────────────────────────────────────────────

function BrowseByCategorySection({
  onSelectCategory,
  productCounts,
}: {
  onSelectCategory: (mapCategory: string) => void;
  productCounts: Record<string, number>;
}) {
  return (
    <section
      className="border-b"
      style={{
        background: "oklch(0.97 0.015 82)",
        borderColor: "oklch(0.88 0.03 75)",
      }}
      data-ocid="shop.browse_by_category.section"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Section Header */}
        <div className="text-center mb-6">
          <h2
            className="font-heading text-2xl md:text-3xl font-bold mb-1"
            style={{ color: "oklch(0.32 0.10 25)" }}
          >
            ✨ श्रेणियाँ — Browse by Category
          </h2>
          <p className="font-body text-sm text-muted-foreground">
            अपनी पसंद की श्रेणी चुनें और सर्वोत्तम उत्पाद खोजें
          </p>
          {/* Ornamental divider */}
          <div className="flex items-center justify-center gap-3 mt-3">
            <div
              className="h-px flex-1 max-w-20"
              style={{ background: "oklch(0.78 0.14 75 / 0.4)" }}
            />
            <span className="text-lg" style={{ color: "oklch(0.68 0.20 48)" }}>
              🕉
            </span>
            <div
              className="h-px flex-1 max-w-20"
              style={{ background: "oklch(0.78 0.14 75 / 0.4)" }}
            />
          </div>
        </div>

        {/* 6-column category grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {BROWSE_CATEGORIES.map((cat, idx) => {
            const count = productCounts[cat.mapToCategory] ?? 0;
            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => onSelectCategory(cat.mapToCategory)}
                className="group flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all hover:scale-105 hover:shadow-md text-center cursor-pointer"
                style={{
                  background: "oklch(0.99 0.006 80)",
                  borderColor: "oklch(0.88 0.03 75)",
                }}
                data-ocid={`shop.browse_category.item.${idx + 1}`}
              >
                {/* Icon circle */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0 transition-transform group-hover:scale-110"
                  style={{ background: cat.gradient }}
                >
                  {cat.emoji}
                </div>
                {/* Label */}
                <div className="min-w-0">
                  <p
                    className="font-heading font-bold text-xs leading-tight line-clamp-2 mb-0.5"
                    style={{ color: "oklch(0.22 0.08 22)" }}
                  >
                    {cat.labelHindi}
                  </p>
                  <p
                    className="font-body text-xs line-clamp-1"
                    style={{ color: "oklch(0.50 0.06 40)" }}
                  >
                    {cat.label.split(" — ")[0]}
                  </p>
                </div>
                {/* Count badge */}
                {count > 0 && (
                  <span
                    className="text-xs font-heading font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: "oklch(0.68 0.20 48 / 0.12)",
                      color: "oklch(0.45 0.16 40)",
                    }}
                  >
                    {count}+
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Featured Collections Banners ─────────────────────────────────────────────

function FeaturedCollections({
  onSelectCategory,
}: {
  onSelectCategory: (cat: string) => void;
}) {
  return (
    <section
      className="border-b"
      style={{
        background: "oklch(0.14 0.04 22)",
        borderColor: "oklch(0.26 0.08 25)",
      }}
      data-ocid="shop.featured_collections.section"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h2
            className="font-heading text-2xl md:text-3xl font-bold mb-1"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🌟 Featured Collections
          </h2>
          <p
            className="font-body text-sm"
            style={{ color: "oklch(0.70 0.04 60)" }}
          >
            हमारे सर्वश्रेष्ठ और सर्वाधिक मांगे जाने वाले संग्रह
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEATURED_COLLECTIONS.map((col) => (
            <button
              type="button"
              key={col.id}
              onClick={() => onSelectCategory(col.category)}
              className="relative rounded-2xl overflow-hidden text-left hover:scale-[1.02] transition-all cursor-pointer border"
              style={{
                background: col.bg,
                borderColor: `${col.accentColor.replace(")", " / 0.3)")}`,
                minHeight: "180px",
              }}
              data-ocid={`shop.featured_collection.${col.id}`}
            >
              {/* Decorative corner ornament */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
                style={{
                  background: col.accentColor,
                  transform: "translate(30%, -30%)",
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-10"
                style={{
                  background: col.accentColor,
                  transform: "translate(-30%, 30%)",
                }}
              />

              <div className="relative z-10 p-5 flex flex-col h-full">
                {/* Emoji + subtitle */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl">{col.emoji}</span>
                  <span
                    className="font-body text-xs font-medium tracking-widest uppercase"
                    style={{
                      color: `${col.accentColor.replace(")", " / 0.75)")}`,
                    }}
                  >
                    {col.subtitle}
                  </span>
                </div>
                {/* Title */}
                <h3
                  className="font-heading font-bold text-xl mb-1"
                  style={{ color: col.accentColor }}
                >
                  {col.title}
                </h3>
                {/* Description */}
                <p
                  className="font-body text-xs mb-4"
                  style={{ color: "oklch(0.72 0.04 60)" }}
                >
                  {col.description}
                </p>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {col.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-heading px-2 py-0.5 rounded-full"
                      style={{
                        background: `${col.accentColor.replace(")", " / 0.12)")}`,
                        color: col.accentColor,
                        border: `1px solid ${col.accentColor.replace(")", " / 0.25)")}`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {/* CTA */}
                <div className="mt-auto">
                  <span
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full font-heading text-xs font-semibold"
                    style={{
                      background: col.accentColor,
                      color: "oklch(0.14 0.04 22)",
                    }}
                  >
                    Shop Now →
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Constants ─────────────────────────────────────────────────────────────────

const CATEGORIES = [
  "All",
  "Astrology Services",
  "Rudraksha",
  "Gemstones",
  "Energized Gemstones",
  "Rings",
  "Yantras",
  "Religious Yantras",
  "Puja Items",
  "Puja Samagri",
  "God Idols",
  "Feng Shui",
  "God Pendants",
  "Silver Adorns",
  "Combos",
  "Crystals",
  "Herbs",
  "Books",
  "Bracelets",
  "Zodiac Bracelets",
  "Kada Bracelets",
  "Ritual Items",
  "Conch & Shankh",
  "Gutika",
  "Parad Items",
  "Nav Grah Murti",
  "Nav Grah Yatra",
  "Devi Devta Yatra",
  // Missing product categories
  ...MISSING_PRODUCT_CATEGORIES,
];

const CATEGORY_ICONS: Record<string, string> = {
  All: "✨",
  "Astrology Services": "🔮",
  Rudraksha: "🟤",
  Gemstones: "💎",
  "Energized Gemstones": "🪨",
  Rings: "💍",
  Yantras: "🔯",
  "Religious Yantras": "📿",
  "Puja Items": "🪔",
  "Puja Samagri": "🏺",
  "God Idols": "🪆",
  "Feng Shui": "🐢",
  "God Pendants": "📿",
  "Silver Adorns": "🥈",
  Combos: "🎁",
  Crystals: "🔮",
  Herbs: "🌿",
  Books: "📚",
  Bracelets: "📿",
  "Zodiac Bracelets": "♈",
  "Kada Bracelets": "🔗",
  "Ritual Items": "🕯️",
  "Conch & Shankh": "🐚",
  Gutika: "⚫",
  "Parad Items": "🪙",
  "Nav Grah Murti": "🪐",
  "Nav Grah Yatra": "🛕",
  "Devi Devta Yatra": "🌸",
  "925 Silver": "🥈",
  "3D Lamps": "💡",
  Necklaces: "📿",
  "Gold Jewellery": "🪙",
  Idols: "🪆",
  Pendants: "💫",
  // Missing product category icons
  rings: "💍",
  "crystal-towers": "🗼",
  "coin-pendants": "🪙",
  owls: "🦉",
  "brass-murti": "🪆",
  elephants: "🐘",
  "puja-sets": "🪔",
  "vastu-frames": "🖼️",
  "yantra-coins": "🔯",
};

const MAX_PRICE = Number.POSITIVE_INFINITY;
const PRICE_RANGES = [
  { label: "सभी मूल्य", min: 0, max: MAX_PRICE },
  { label: "₹0 – ₹500", min: 0, max: 500 },
  { label: "₹500 – ₹1,500", min: 500, max: 1500 },
  { label: "₹1,500 – ₹5,000", min: 1500, max: 5000 },
  { label: "₹5,000 – ₹15,000", min: 5000, max: 15000 },
  { label: "₹15,000+", min: 15000, max: MAX_PRICE },
];

const CONCERNS: { id: Concern; label: string; emoji: string }[] = [
  { id: "Pregnancy", label: "Pregnancy", emoji: "🤰" },
  { id: "Abundance & Wealth", label: "Abundance & Wealth", emoji: "💰" },
  { id: "Love & Relationship", label: "Love & Relationship", emoji: "💕" },
  { id: "Health & Well Being", label: "Health & Well Being", emoji: "🌿" },
  { id: "Education & Career", label: "Education & Career", emoji: "📚" },
  { id: "Mental Wellness", label: "Mental Wellness", emoji: "🧘" },
];

// Map concern IDs to product concern strings
const CONCERN_PRODUCT_MAP: Record<Concern, string[]> = {
  Pregnancy: ["Pregnancy"],
  "Abundance & Wealth": ["Abundance, Wealth & Business"],
  "Love & Relationship": ["Love, Relationship & Marriage"],
  "Health & Well Being": ["Health & Well Being"],
  "Education & Career": ["Education, Job & Career"],
  "Mental Wellness": ["Depression, Confidence & Mental Wellness"],
};

// ─── New Tab Definitions ───────────────────────────────────────────────────────

const NEW_CATEGORY_TABS = [
  { id: "925 Silver", label: "925 Silver", emoji: "🥈" },
  { id: "3D Lamps", label: "3D Lamps", emoji: "💡" },
  { id: "Necklaces", label: "Necklaces", emoji: "📿" },
  { id: "Gold Jewellery", label: "Gold Jewellery", emoji: "🪙" },
  { id: "Idols", label: "Idols", emoji: "🪆" },
  { id: "Rings", label: "Rings", emoji: "💍" },
  { id: "Bracelets", label: "Bracelets", emoji: "📿" },
  { id: "Pendants", label: "Pendants", emoji: "💫" },
  { id: "Indian Herbs", label: "Indian Herbs", emoji: "🌿" },
  // Missing product category tabs
  { id: "rings", label: "Gemstone Rings", emoji: "💍" },
  { id: "crystal-towers", label: "Crystal Towers", emoji: "🗼" },
  { id: "coin-pendants", label: "Coin Pendants", emoji: "🪙" },
  { id: "owls", label: "Owls & Figurines", emoji: "🦉" },
  { id: "brass-murti", label: "Brass Murti", emoji: "🪆" },
  { id: "elephants", label: "Elephants", emoji: "🐘" },
  { id: "puja-sets", label: "Puja Sets", emoji: "🪔" },
  { id: "vastu-frames", label: "Vastu Frames", emoji: "🖼️" },
  { id: "yantra-coins", label: "Yantra Coins", emoji: "🔯" },
];

const RINGS_SUB = ["All", "Religious", "Gemstone", "Stylish"];
const BRACELETS_SUB = [
  "All",
  "Latest",
  "Popular",
  "Stylish",
  "Zodiac",
  "Gemstone",
  "Kada",
  "Rudraksha",
];
const PENDANTS_SUB = [
  "All",
  "Latest",
  "Gemstone",
  "Stylish",
  "Zodiac",
  "Lucky Charms",
];
const NECKLACES_SUB = ["All", "Gold Plated", "Silver Plated", "Regular"];
const SILVER_SUB = ["All", "Silver Yantras", "Silver Rakhis"];

// ─── Original Products ─────────────────────────────────────────────────────────

const ORIGINAL_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Green Aventurine Pendant",
    category: "Gemstones",
    price: 799,
    description: "Known as the Stone of Opportunity, energized for 108 hours.",
    benefits: "Luck, prosperity, career growth",
    astrologicalPurpose: "Venus, Mercury",
    stock: BigInt(50),
    createdAt: BigInt(0),
  },
  {
    id: "p2",
    name: "Lapis Lazuli Tumble",
    category: "Gemstones",
    price: 599,
    description: "Enhances intuition, wisdom, and mental clarity.",
    benefits: "Wisdom, intuition, clarity",
    astrologicalPurpose: "Saturn, Jupiter",
    stock: BigInt(30),
    createdAt: BigInt(0),
  },
  {
    id: "p3",
    name: "Pyrite Cluster",
    category: "Gemstones",
    price: 1299,
    description:
      "Fool's Gold — attracts wealth and protects against negativity.",
    benefits: "Wealth, protection, confidence",
    astrologicalPurpose: "Sun, Mars",
    stock: BigInt(20),
    createdAt: BigInt(0),
  },
  {
    id: "p4",
    name: "Amethyst Crystal",
    category: "Gemstones",
    price: 899,
    description: "Reduces stress, increases focus and spiritual awareness.",
    benefits: "Stress relief, focus, spirituality",
    astrologicalPurpose: "Saturn, Jupiter",
    stock: BigInt(40),
    createdAt: BigInt(0),
  },
  {
    id: "p6",
    name: "Tiger Eye Bracelet",
    category: "Bracelets",
    price: 699,
    description: "Enhances courage, confidence, and personal power.",
    benefits: "Courage, confidence, protection",
    astrologicalPurpose: "Sun, Mars",
    stock: BigInt(35),
    createdAt: BigInt(0),
  },
  {
    id: "p7",
    name: "Dhan Yog Bracelet",
    category: "Bracelets",
    price: 1999,
    description:
      "Combination of 6 crystals: Pyrite, Tiger Eye, Citrine, Quartz, Green Aventurine, Green Jade.",
    benefits: "Wealth attraction, prosperity",
    astrologicalPurpose: "Jupiter, Venus, Sun",
    stock: BigInt(25),
    createdAt: BigInt(0),
  },
  {
    id: "p8",
    name: "Navratna Bracelet",
    category: "Bracelets",
    price: 2499,
    description:
      "Nine gemstones representing all nine planets for complete astrological balance.",
    benefits: "Overall prosperity, planetary balance",
    astrologicalPurpose: "All 9 planets",
    stock: BigInt(10),
    createdAt: BigInt(0),
  },
  {
    id: "p9",
    name: "Shree Yantra",
    category: "Yantras",
    price: 1499,
    description:
      "Sacred geometry for wealth, prosperity, and spiritual growth.",
    benefits: "Wealth, prosperity, spiritual growth",
    astrologicalPurpose: "Venus, Jupiter",
    stock: BigInt(20),
    createdAt: BigInt(0),
  },
  {
    id: "p13",
    name: "Rudraksha Mala (108 beads)",
    category: "Ritual Items",
    price: 1299,
    description: "Sacred 5-mukhi Rudraksha mala for meditation.",
    benefits: "Spiritual growth, meditation, peace",
    astrologicalPurpose: "Shiva, Jupiter",
    stock: BigInt(20),
    createdAt: BigInt(0),
  },
  {
    id: "p14",
    name: "Puja Kit Deluxe",
    category: "Ritual Items",
    price: 899,
    description: "Complete puja kit with incense, camphor, kumkum, and more.",
    benefits: "Complete puja essentials",
    astrologicalPurpose: "All deities",
    stock: BigInt(50),
    createdAt: BigInt(0),
  },
  {
    id: "ng1",
    name: "Surya (Sun) Murti",
    category: "Nav Grah Murti",
    price: 1299,
    description: "Brass idol of Lord Surya for health, vitality, and success.",
    benefits: "Health, vitality, leadership, success",
    astrologicalPurpose: "Sun (Surya)",
    stock: BigInt(25),
    createdAt: BigInt(0),
  },
  {
    id: "ng2",
    name: "Chandra (Moon) Murti",
    category: "Nav Grah Murti",
    price: 1299,
    description: "Brass idol of Lord Chandra for mental peace and intuition.",
    benefits: "Mental peace, emotional balance",
    astrologicalPurpose: "Moon (Chandra)",
    stock: BigInt(25),
    createdAt: BigInt(0),
  },
  {
    id: "ng5",
    name: "Guru (Jupiter) Murti",
    category: "Nav Grah Murti",
    price: 1499,
    description:
      "Brass idol of Lord Brihaspati for wisdom and spiritual growth.",
    benefits: "Wisdom, knowledge, prosperity",
    astrologicalPurpose: "Jupiter (Guru)",
    stock: BigInt(25),
    createdAt: BigInt(0),
  },
  {
    id: "ny2",
    name: "Navagraha Temple Yatra Set",
    category: "Nav Grah Yatra",
    price: 2999,
    description:
      "Complete set of 9 sacred Navagraha temple yatra photo prints.",
    benefits: "All planetary blessings, complete harmony",
    astrologicalPurpose: "All 9 planets",
    stock: BigInt(30),
    createdAt: BigInt(0),
  },
  {
    id: "dd1",
    name: "Vaishno Devi Yatra Photo",
    category: "Devi Devta Yatra",
    price: 699,
    description: "Sacred photo print from the holy Vaishno Devi shrine.",
    benefits: "Divine mother blessings, wish fulfillment",
    astrologicalPurpose: "Durga, Lakshmi, Saraswati",
    stock: BigInt(50),
    createdAt: BigInt(0),
  },
  {
    id: "dd2",
    name: "Tirupati Balaji Yatra Photo",
    category: "Devi Devta Yatra",
    price: 799,
    description: "Sacred photo print from Tirupati Balaji.",
    benefits: "Wealth, prosperity, divine blessings",
    astrologicalPurpose: "Vishnu, Jupiter",
    stock: BigInt(50),
    createdAt: BigInt(0),
  },
];

// Adapt MISSING_PRODUCTS to the Product interface shape
const MISSING_AS_PRODUCTS: Product[] = (
  MISSING_PRODUCTS as unknown as MissingProductWithMRP[]
).map(
  (p) =>
    ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      description: p.description ?? "",
      benefits: (p.tags ?? []).join(", "),
      astrologicalPurpose: "",
      stock: p.inStock ? BigInt(50) : BigInt(0),
      createdAt: BigInt(0),
      // carry over extra fields
      mrp: p.mrp,
      discountPercent: p.discountPercent,
      badge: p.badge,
      material: p.material,
      size: p.size,
      image: p.image,
    }) as unknown as Product,
);

const ALL_PLACEHOLDER = [
  ...ORIGINAL_PRODUCTS,
  ...SHOP_PRODUCTS,
  ...SHOP_PRODUCTS_C,
  ...ALL_NEW_PRODUCTS,
  ...ASTROLOGY_SERVICES,
  ...ALL_NEW_CATEGORY_PRODUCTS,
  ...MISSING_AS_PRODUCTS,
];

const MOCK_REVIEWS = [
  {
    name: "Rajesh Kumar",
    rating: 5,
    date: "15 मार्च 2025",
    text: "बहुत अच्छा उत्पाद, ऊर्जा बहुत अच्छी है। पहनने के बाद से मन शांत रहता है।",
  },
  {
    name: "Priya Sharma",
    rating: 5,
    date: "28 फरवरी 2025",
    text: "सुन्दर पैकेजिंग और शुद्ध उत्पाद। जरूर खरीदें।",
  },
  {
    name: "Amit Verma",
    rating: 4,
    date: "10 जनवरी 2025",
    text: "अच्छी गुणवत्ता, तेज डिलीवरी। संतुष्ट हूँ।",
  },
];

const RUDRAKSHA_QUESTIONS = [
  {
    q: "आपकी मुख्य समस्या क्या है?",
    options: ["स्वास्थ्य", "धन", "प्रेम/विवाह", "शिक्षा", "व्यापार", "आध्यात्मिकता"],
  },
  {
    q: "आपकी राशि क्या है?",
    options: [
      "मेष",
      "वृषभ",
      "मिथुन",
      "कर्क",
      "सिंह",
      "कन्या",
      "तुला",
      "वृश्चिक",
      "धनु",
      "मकर",
      "कुम्भ",
      "मीन",
    ],
  },
  { q: "आपकी आयु वर्ग?", options: ["18-25", "26-35", "36-50", "50+"] },
];

const RUDRAKSHA_RECOMMENDATIONS: Record<string, string[]> = {
  स्वास्थ्य: ["rdk-5", "rdk-4", "rdk-8"],
  धन: ["rdk-7", "rdk-21", "rdk-11"],
  "प्रेम/विवाह": ["rdk-2", "rdk-13", "rdk-6"],
  शिक्षा: ["rdk-4", "rdk-5", "rdk-17"],
  व्यापार: ["rdk-7", "rdk-8", "rdk-12"],
  आध्यात्मिकता: ["rdk-1", "rdk-20", "rdk-21"],
};

// ─── Helper: check if product matches concern ──────────────────────────────────

function productMatchesConcerns(
  product: Product | ShopProduct,
  concerns: Concern[],
): boolean {
  if (concerns.length === 0) return true;
  const pWithConcerns = product as ShopProduct;
  if (!pWithConcerns.concerns || pWithConcerns.concerns.length === 0)
    return true; // show products without concern tags always
  const productConcernStrings = pWithConcerns.concerns as string[];
  return concerns.some((c) =>
    CONCERN_PRODUCT_MAP[c].some((str) => productConcernStrings.includes(str)),
  );
}

// ─── Sub-components ─────────────────────────────────────────────────────────────

function ProductBadges({ productId }: { productId: string }) {
  const isBestSeller = BEST_SELLER_IDS.has(productId);
  const isNew = NEW_ARRIVAL_IDS.has(productId);
  if (!isBestSeller && !isNew) return null;
  return (
    <div className="absolute top-2 left-2 flex flex-col gap-1">
      {isBestSeller && (
        <span
          className="text-xs font-heading font-bold px-2 py-0.5 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
            color: "white",
          }}
        >
          ⭐ Best Seller
        </span>
      )}
      {isNew && (
        <span
          className="text-xs font-heading font-bold px-2 py-0.5 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.55 0.18 145), oklch(0.45 0.16 140))",
            color: "white",
          }}
        >
          🆕 New
        </span>
      )}
    </div>
  );
}

// ─── Ratti Variant Selector ────────────────────────────────────────────────────

function RattiSelector({
  gemKey,
  selectedIdx,
  onChange,
}: {
  gemKey: string;
  selectedIdx: number;
  onChange: (idx: number) => void;
}) {
  const tiers = GEMSTONE_RATTI_PRICES[gemKey];
  if (!tiers) return null;
  return (
    <div className="mt-3">
      <p
        className="text-xs font-heading font-semibold mb-2"
        style={{ color: "oklch(0.78 0.14 75)" }}
      >
        💎 रत्ती वज़न चुनें
      </p>
      <div className="flex flex-wrap gap-1.5">
        {tiers.map((tier, idx) => (
          <button
            type="button"
            key={tier.label}
            onClick={() => onChange(idx)}
            className="px-2 py-1 rounded-full text-xs font-heading font-semibold transition-all"
            style={{
              background:
                selectedIdx === idx
                  ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                  : tier.isBest
                    ? "oklch(0.68 0.20 48 / 0.12)"
                    : "oklch(0.22 0.06 30)",
              color:
                selectedIdx === idx
                  ? "white"
                  : tier.isBest
                    ? "oklch(0.55 0.16 48)"
                    : "oklch(0.72 0.04 60)",
              border: `1px solid ${selectedIdx === idx ? "transparent" : tier.isBest ? "oklch(0.68 0.20 48 / 0.4)" : "oklch(0.30 0.06 25)"}`,
            }}
          >
            {tier.label}
            {tier.isBest && (
              <span
                className="ml-1 text-xs"
                style={{
                  color:
                    selectedIdx === idx
                      ? "rgba(255,255,255,0.8)"
                      : "oklch(0.68 0.20 48)",
                }}
              >
                ★
              </span>
            )}
          </button>
        ))}
      </div>
      {tiers[selectedIdx] && (
        <p
          className="mt-2 text-xs font-body"
          style={{ color: "oklch(0.60 0.04 60)" }}
        >
          चुना हुआ:{" "}
          <span
            className="font-heading font-bold"
            style={{ color: "oklch(0.68 0.20 48)" }}
          >
            ₹{tiers[selectedIdx].price.toLocaleString()}
          </span>
          {tiers[selectedIdx].isBest && (
            <span
              className="ml-1 text-xs px-1 py-0.5 rounded"
              style={{
                background: "oklch(0.68 0.20 48 / 0.15)",
                color: "oklch(0.55 0.16 48)",
              }}
            >
              BEST VALUE
            </span>
          )}
        </p>
      )}
    </div>
  );
}

// ─── Product Detail Dialog ─────────────────────────────────────────────────────

function ProductDetailDialog({
  product,
  open,
  onClose,
  onAddToCart,
}: {
  product: Product;
  open: boolean;
  onClose: () => void;
  onAddToCart: (
    p: Product,
    variantName?: string,
    variantPrice?: number,
  ) => void;
}) {
  const gemKey = getGemstoneKey(product.name);
  const defaultRattiIdx = gemKey
    ? (GEMSTONE_RATTI_PRICES[gemKey]?.findIndex((t) => t.isBest) ?? 1)
    : 1;
  const [selectedRattiIdx, setSelectedRattiIdx] = useState(defaultRattiIdx);

  const rudrakshaDetail =
    RUDRAKSHA_DETAILS[
      Object.keys(RUDRAKSHA_DETAILS).find((k) => k === product.id) ?? ""
    ] ?? null;
  const gemstoneDetail =
    GEMSTONE_DETAILS[
      Object.keys(GEMSTONE_DETAILS).find((k) => k === product.id) ?? ""
    ] ?? null;
  const yantraDetail =
    YANTRA_DETAILS[
      Object.keys(YANTRA_DETAILS).find((k) => k === product.id) ?? ""
    ] ?? null;
  const bookDetail =
    BOOK_DETAILS[
      Object.keys(BOOK_DETAILS).find((k) => k === product.id) ?? ""
    ] ?? null;

  const related = ALL_PLACEHOLDER.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, 3);

  const rattiTiers = gemKey ? GEMSTONE_RATTI_PRICES[gemKey] : null;
  const selectedRatti = rattiTiers?.[selectedRattiIdx];
  const displayPrice = selectedRatti ? selectedRatti.price : product.price;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-hidden p-0"
        data-ocid="shop.product_detail.dialog"
        style={{
          background: "oklch(0.14 0.04 20)",
          border: "1px solid oklch(0.30 0.08 25)",
        }}
      >
        <DialogHeader className="px-6 pt-6 pb-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <Badge
                className="text-xs mb-2"
                style={{
                  background: "oklch(0.68 0.20 48 / 0.15)",
                  color: "oklch(0.68 0.20 48)",
                }}
              >
                {CATEGORY_ICONS[product.category] ?? "✨"} {product.category}
              </Badge>
              <DialogTitle
                className="font-decorative text-xl"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                {product.name}
              </DialogTitle>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-full p-1"
              style={{ color: "oklch(0.60 0.04 60)" }}
              data-ocid="shop.product_detail.close_button"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 h-[65vh]">
          <div className="px-6 pb-6 space-y-4">
            <div
              className="h-32 rounded-xl flex items-center justify-center text-6xl"
              style={{ background: "oklch(0.20 0.06 30)" }}
            >
              {CATEGORY_ICONS[product.category] ?? "✨"}
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span
                  className="font-heading text-2xl font-bold"
                  style={{ color: "oklch(0.68 0.20 48)" }}
                >
                  ₹{displayPrice.toLocaleString()}
                </span>
                {selectedRatti && (
                  <span
                    className="ml-2 text-xs font-heading px-1.5 py-0.5 rounded"
                    style={{
                      background: "oklch(0.68 0.20 48 / 0.15)",
                      color: "oklch(0.55 0.16 48)",
                    }}
                  >
                    {selectedRatti.label}
                  </span>
                )}
                <Badge
                  className="ml-2 text-xs"
                  style={{
                    background: "oklch(0.55 0.18 145 / 0.2)",
                    color: "oklch(0.55 0.18 145)",
                  }}
                >
                  ✓ उपलब्ध
                </Badge>
                {BEST_SELLER_IDS.has(product.id) && (
                  <Badge
                    className="ml-1 text-xs"
                    style={{
                      background: "oklch(0.68 0.20 48 / 0.2)",
                      color: "oklch(0.68 0.20 48)",
                    }}
                  >
                    ⭐ Best Seller
                  </Badge>
                )}
              </div>
              <Button
                onClick={() => {
                  onAddToCart(
                    product,
                    selectedRatti?.label,
                    selectedRatti?.price,
                  );
                  onClose();
                }}
                data-ocid="shop.product_detail.add_to_cart_button"
                className="font-heading font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                  color: "white",
                }}
              >
                <ShoppingCart className="h-4 w-4 mr-2" /> कार्ट में जोड़ें
              </Button>
            </div>

            {/* Ratti selector for gemstone products */}
            {gemKey && (
              <div
                className="p-4 rounded-xl"
                style={{
                  background: "oklch(0.18 0.06 30)",
                  border: "1px solid oklch(0.68 0.20 48 / 0.2)",
                }}
              >
                <h3
                  className="font-heading font-semibold text-sm mb-1"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  💎 रत्न रत्ती भार एवं मूल्य
                </h3>
                <p
                  className="text-xs font-body mb-3"
                  style={{ color: "oklch(0.60 0.04 60)" }}
                >
                  4-5 Ratti सर्वोत्तम मूल्य है। अपनी आवश्यकता अनुसार चुनें।
                </p>
                <RattiSelector
                  gemKey={gemKey}
                  selectedIdx={selectedRattiIdx}
                  onChange={setSelectedRattiIdx}
                />
              </div>
            )}

            <Separator style={{ borderColor: "oklch(0.28 0.06 25)" }} />

            <div>
              <h3
                className="font-heading font-semibold text-sm mb-1"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                विवरण
              </h3>
              <p
                className="text-sm font-body"
                style={{ color: "oklch(0.72 0.04 60)" }}
              >
                {product.description}
              </p>
            </div>

            <div
              className="p-3 rounded-xl"
              style={{
                background: "oklch(0.18 0.06 30)",
                border: "1px solid oklch(0.30 0.08 25)",
              }}
            >
              <h3
                className="font-heading font-semibold text-sm mb-2"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                ✨ लाभ
              </h3>
              <p
                className="text-sm font-body"
                style={{ color: "oklch(0.72 0.04 60)" }}
              >
                {product.benefits}
              </p>
            </div>

            <div
              className="p-3 rounded-xl"
              style={{ background: "oklch(0.18 0.06 30)" }}
            >
              <h3
                className="font-heading font-semibold text-sm mb-1"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                🪐 ज्योतिषीय उद्देश्य
              </h3>
              <p
                className="text-sm font-body"
                style={{ color: "oklch(0.72 0.04 60)" }}
              >
                {product.astrologicalPurpose}
              </p>
            </div>

            {rudrakshaDetail && (
              <div className="space-y-3">
                <h3
                  className="font-heading font-semibold text-sm"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  🟤 रुद्राक्ष विशेष जानकारी
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "देवता", value: rudrakshaDetail.deity },
                    { label: "ग्रह", value: rudrakshaDetail.planet },
                    { label: "मंत्र", value: rudrakshaDetail.mantra },
                    { label: "श्रेष्ठ", value: rudrakshaDetail.bestFor },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="p-2 rounded-lg"
                      style={{ background: "oklch(0.20 0.05 22)" }}
                    >
                      <div
                        className="text-xs font-heading"
                        style={{ color: "oklch(0.60 0.04 60)" }}
                      >
                        {item.label}
                      </div>
                      <div
                        className="text-xs font-body mt-0.5"
                        style={{ color: "oklch(0.82 0.06 60)" }}
                      >
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="p-3 rounded-xl"
                  style={{ background: "oklch(0.18 0.06 30)" }}
                >
                  <h4
                    className="text-xs font-heading mb-1"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    धारण विधि
                  </h4>
                  <p
                    className="text-xs font-body"
                    style={{ color: "oklch(0.70 0.04 60)" }}
                  >
                    {rudrakshaDetail.wearingMethod}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {rudrakshaDetail.benefits.map((b) => (
                    <Badge
                      key={b}
                      className="text-xs"
                      style={{
                        background: "oklch(0.68 0.20 48 / 0.15)",
                        color: "oklch(0.68 0.20 48)",
                      }}
                    >
                      {b}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {gemstoneDetail && (
              <div className="space-y-3">
                <h3
                  className="font-heading font-semibold text-sm"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  💎 रत्न जानकारी
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "ग्रह", value: gemstoneDetail.planet },
                    { label: "कठोरता", value: gemstoneDetail.hardness },
                    { label: "उत्पत्ति", value: gemstoneDetail.origin },
                    { label: "उँगली", value: gemstoneDetail.wearingFinger },
                    { label: "शुभ दिन", value: gemstoneDetail.bestDay },
                    { label: "मंत्र", value: gemstoneDetail.mantra },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="p-2 rounded-lg"
                      style={{ background: "oklch(0.20 0.05 22)" }}
                    >
                      <div
                        className="text-xs font-heading"
                        style={{ color: "oklch(0.60 0.04 60)" }}
                      >
                        {item.label}
                      </div>
                      <div
                        className="text-xs font-body mt-0.5"
                        style={{ color: "oklch(0.82 0.06 60)" }}
                      >
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {yantraDetail && (
              <div className="space-y-3">
                <h3
                  className="font-heading font-semibold text-sm"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  🔯 यंत्र जानकारी
                </h3>
                <div
                  className="p-3 rounded-xl"
                  style={{ background: "oklch(0.18 0.06 30)" }}
                >
                  <p
                    className="text-xs font-body mb-2"
                    style={{ color: "oklch(0.70 0.04 60)" }}
                  >
                    <strong style={{ color: "oklch(0.80 0.08 60)" }}>
                      स्थापना:
                    </strong>{" "}
                    {yantraDetail.placement}
                  </p>
                  <p
                    className="text-xs font-body"
                    style={{ color: "oklch(0.70 0.04 60)" }}
                  >
                    <strong style={{ color: "oklch(0.80 0.08 60)" }}>
                      मंत्र:
                    </strong>{" "}
                    {yantraDetail.mantra}
                  </p>
                </div>
              </div>
            )}

            {bookDetail && (
              <div className="space-y-2">
                <h3
                  className="font-heading font-semibold text-sm"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  📚 पुस्तक जानकारी
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "लेखक", value: bookDetail.author },
                    { label: "भाषा", value: bookDetail.language },
                    { label: "पृष्ठ", value: `${bookDetail.pages}+` },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="p-2 rounded-lg"
                      style={{ background: "oklch(0.20 0.05 22)" }}
                    >
                      <div
                        className="text-xs font-heading"
                        style={{ color: "oklch(0.60 0.04 60)" }}
                      >
                        {item.label}
                      </div>
                      <div
                        className="text-xs font-body mt-0.5"
                        style={{ color: "oklch(0.82 0.06 60)" }}
                      >
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {bookDetail.highlights.map((h) => (
                    <Badge
                      key={h}
                      className="text-xs"
                      style={{
                        background: "oklch(0.68 0.20 48 / 0.15)",
                        color: "oklch(0.68 0.20 48)",
                      }}
                    >
                      {h}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Separator style={{ borderColor: "oklch(0.28 0.06 25)" }} />

            <div>
              <h3
                className="font-heading font-semibold text-sm mb-3"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                ⭐ ग्राहक समीक्षाएं
              </h3>
              <div className="space-y-3">
                {MOCK_REVIEWS.map((review) => (
                  <div
                    key={review.name}
                    className="p-3 rounded-xl"
                    style={{
                      background: "oklch(0.18 0.04 20)",
                      border: "1px solid oklch(0.26 0.06 25)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="text-xs font-heading font-semibold"
                        style={{ color: "oklch(0.82 0.06 60)" }}
                      >
                        {review.name}
                      </span>
                      <span
                        className="text-xs font-body"
                        style={{ color: "oklch(0.55 0.04 60)" }}
                      >
                        {review.date}
                      </span>
                    </div>
                    <div className="flex gap-0.5 mb-1">
                      {Array.from({ length: 5 }, (_, j) => j).map((j) => (
                        <Star
                          key={`star-${j}`}
                          className="h-3 w-3"
                          fill={
                            j < review.rating ? "oklch(0.78 0.14 75)" : "none"
                          }
                          style={{ color: "oklch(0.78 0.14 75)" }}
                        />
                      ))}
                    </div>
                    <p
                      className="text-xs font-body"
                      style={{ color: "oklch(0.68 0.04 60)" }}
                    >
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {related.length > 0 && (
              <div>
                <h3
                  className="font-heading font-semibold text-sm mb-3"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  🛍️ संबंधित उत्पाद
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {related.map((rp, i) => (
                    <button
                      type="button"
                      key={rp.id}
                      onClick={() => onAddToCart(rp)}
                      className="p-2 rounded-xl text-left transition-opacity hover:opacity-80"
                      style={{
                        background: "oklch(0.20 0.05 22)",
                        border: "1px solid oklch(0.30 0.06 25)",
                      }}
                      data-ocid={`shop.related.item.${i + 1}`}
                    >
                      <div className="text-2xl text-center mb-1">
                        {CATEGORY_ICONS[rp.category] ?? "✨"}
                      </div>
                      <div
                        className="text-xs font-heading line-clamp-1"
                        style={{ color: "oklch(0.82 0.06 60)" }}
                      >
                        {rp.name}
                      </div>
                      <div
                        className="text-xs font-heading font-bold"
                        style={{ color: "oklch(0.68 0.20 48)" }}
                      >
                        ₹{rp.price}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

// ─── Rudraksha Consultation ────────────────────────────────────────────────────

function RudrakshaConsultation({ products }: { products: Product[] }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const addItem = useCartStore((s) => s.addItem);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (step < RUDRAKSHA_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      const problem = newAnswers[0];
      const recIds = RUDRAKSHA_RECOMMENDATIONS[problem] ?? [
        "rdk-5",
        "rdk-7",
        "rdk-11",
      ];
      const recs = recIds
        .map((id) => products.find((p) => p.id === id))
        .filter(Boolean) as Product[];
      setRecommendations(recs);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setRecommendations([]);
  };

  if (recommendations.length > 0) {
    return (
      <div
        className="mb-6 p-5 rounded-2xl"
        style={{
          background: "oklch(0.16 0.06 30)",
          border: "1px solid oklch(0.68 0.20 48 / 0.3)",
        }}
        data-ocid="rudraksha.consultation.result"
      >
        <h3
          className="font-heading font-bold text-base mb-1"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          🟤 आपके लिए अनुशंसित रुद्राक्ष
        </h3>
        <p
          className="text-xs font-body mb-4"
          style={{ color: "oklch(0.60 0.04 60)" }}
        >
          आपकी जानकारी के अनुसार ये रुद्राक्ष श्रेष्ठ हैं:
        </p>
        <div className="space-y-2">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="flex items-center justify-between p-3 rounded-xl"
              style={{ background: "oklch(0.20 0.05 22)" }}
            >
              <div>
                <div
                  className="font-heading font-semibold text-sm"
                  style={{ color: "oklch(0.85 0.06 60)" }}
                >
                  {rec.name}
                </div>
                <div
                  className="text-xs font-body"
                  style={{ color: "oklch(0.60 0.04 60)" }}
                >
                  {rec.benefits}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="font-heading font-bold text-sm"
                  style={{ color: "oklch(0.68 0.20 48)" }}
                >
                  ₹{rec.price}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    addItem({
                      id: rec.id,
                      name: rec.name,
                      price: rec.price,
                      category: rec.category,
                    });
                    toast.success(`${rec.name} कार्ट में जोड़ा!`);
                  }}
                  className="px-2 py-1 rounded-full text-xs font-heading font-semibold"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                    color: "white",
                  }}
                  data-ocid="rudraksha.consultation.add_button"
                >
                  जोड़ें
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={reset}
          className="text-xs mt-3 font-body"
          style={{ color: "oklch(0.60 0.08 60)" }}
        >
          ↺ फिर से प्रयास करें
        </button>
      </div>
    );
  }

  const currentQ = RUDRAKSHA_QUESTIONS[step];
  return (
    <div
      className="mb-6 p-5 rounded-2xl"
      style={{
        background: "oklch(0.16 0.06 30)",
        border: "1px solid oklch(0.68 0.20 48 / 0.3)",
      }}
      data-ocid="rudraksha.consultation.panel"
    >
      <h3
        className="font-heading font-bold text-base mb-1"
        style={{ color: "oklch(0.78 0.14 75)" }}
      >
        🟤 रुद्राक्ष परामर्श
      </h3>
      <p
        className="text-xs font-body mb-4"
        style={{ color: "oklch(0.60 0.04 60)" }}
      >
        प्रश्न {step + 1}/{RUDRAKSHA_QUESTIONS.length}: {currentQ.q}
      </p>
      <div className="flex flex-wrap gap-2">
        {currentQ.options.map((opt) => (
          <button
            type="button"
            key={opt}
            onClick={() => handleAnswer(opt)}
            className="px-3 py-1.5 rounded-full text-xs font-heading font-semibold transition-all hover:scale-105"
            style={{
              background: "oklch(0.22 0.08 30)",
              color: "oklch(0.78 0.14 75)",
              border: "1px solid oklch(0.68 0.20 48 / 0.4)",
            }}
            data-ocid="rudraksha.consultation.option_button"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── New Category Product Card ─────────────────────────────────────────────────

function NewCategoryCard({
  product,
  onAddToCart,
  showRattiSelector,
}: {
  product: Product;
  onAddToCart: (p: Product, variantName?: string, price?: number) => void;
  showRattiSelector?: boolean;
}) {
  const isOutOfStock = Number(product.stock) === 0;
  const gemKey = showRattiSelector ? getGemstoneKey(product.name) : null;
  const defaultIdx = gemKey
    ? (GEMSTONE_RATTI_PRICES[gemKey]?.findIndex((t) => t.isBest) ?? 1)
    : 1;
  const [selectedRattiIdx, setSelectedRattiIdx] = useState(defaultIdx);
  const tiers = gemKey ? GEMSTONE_RATTI_PRICES[gemKey] : null;
  const selectedTier = tiers?.[selectedRattiIdx];
  const displayPrice = selectedTier ? selectedTier.price : product.price;
  const pWithMrp = product as { mrp?: number };

  return (
    <div
      className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col hover:shadow-md transition-shadow"
      data-ocid={`shop.newcat.${product.id}`}
    >
      <div
        className="h-32 flex items-center justify-center text-4xl relative"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.94 0.03 75), oklch(0.92 0.04 60))",
        }}
      >
        <span className="text-4xl">
          {CATEGORY_ICONS[product.category] ?? "✨"}
        </span>
        {isOutOfStock && (
          <span
            className="absolute top-2 right-2 text-xs font-bold px-1.5 py-0.5 rounded-full"
            style={{ background: "oklch(0.55 0.16 25)", color: "white" }}
          >
            Sold Out
          </span>
        )}
        {pWithMrp.mrp && (
          <span
            className="absolute top-2 left-2 text-xs font-bold px-1.5 py-0.5 rounded-full"
            style={{ background: "oklch(0.55 0.18 145)", color: "white" }}
          >
            -{Math.round(((pWithMrp.mrp - product.price) / pWithMrp.mrp) * 100)}
            %
          </span>
        )}
      </div>
      <div className="p-3 flex flex-col flex-1">
        <p
          className="font-heading font-bold text-xs line-clamp-2 mb-1"
          style={{ color: "oklch(0.22 0.08 22)" }}
        >
          {product.name}
        </p>
        <p className="text-xs font-body text-muted-foreground line-clamp-2 flex-1 mb-2">
          {product.description}
        </p>

        {gemKey && tiers && (
          <div className="mb-2">
            <div className="flex flex-wrap gap-1">
              {tiers.slice(0, 4).map((tier, idx) => (
                <button
                  type="button"
                  key={tier.label}
                  onClick={() => setSelectedRattiIdx(idx)}
                  className="px-1.5 py-0.5 rounded text-xs font-heading transition-all"
                  style={{
                    background:
                      selectedRattiIdx === idx
                        ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                        : "oklch(0.93 0.02 80)",
                    color:
                      selectedRattiIdx === idx
                        ? "white"
                        : "oklch(0.45 0.06 40)",
                    border: `1px solid ${selectedRattiIdx === idx ? "transparent" : "oklch(0.85 0.03 75)"}`,
                  }}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span
              className="font-heading font-bold text-sm"
              style={{ color: "oklch(0.68 0.20 48)" }}
            >
              ₹{displayPrice.toLocaleString()}
            </span>
            {pWithMrp.mrp && !gemKey && (
              <span
                className="text-xs font-body line-through ml-1"
                style={{ color: "oklch(0.58 0.04 60)" }}
              >
                ₹{pWithMrp.mrp.toLocaleString()}
              </span>
            )}
          </div>
          <div className="flex flex-col items-end gap-0.5">
            {displayPrice >= 500 && (
              <span
                className="text-[10px] font-heading font-bold px-1.5 py-0.5 rounded-full"
                style={{
                  background: "oklch(0.68 0.20 48 / 0.12)",
                  color: "oklch(0.50 0.18 42)",
                  border: "1px solid oklch(0.68 0.20 48 / 0.3)",
                }}
              >
                💰 Cashback
              </span>
            )}
            {displayPrice >= 1000 && (
              <span
                className="text-[10px] font-body"
                style={{ color: "oklch(0.50 0.14 145)" }}
              >
                EMI ₹{Math.ceil(displayPrice / 3)}/mo
              </span>
            )}
          </div>
          <button
            type="button"
            disabled={isOutOfStock}
            onClick={() =>
              onAddToCart(product, selectedTier?.label, selectedTier?.price)
            }
            className="flex items-center gap-1 px-2 py-1.5 rounded-full text-xs font-heading font-semibold transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: isOutOfStock
                ? "oklch(0.80 0.03 75)"
                : "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: isOutOfStock ? "oklch(0.50 0.02 75)" : "white",
            }}
            data-ocid="shop.newcat.add_to_cart"
          >
            <ShoppingCart className="h-3 w-3" />
            {isOutOfStock ? "Sold Out" : "जोड़ें"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-filter Bar ────────────────────────────────────────────────────────────

function SubFilterBar({
  options,
  active,
  onChange,
}: {
  options: string[];
  active: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 mb-4 scrollbar-hide">
      {options.map((opt) => (
        <button
          type="button"
          key={opt}
          onClick={() => onChange(opt)}
          className="shrink-0 px-3 py-1.5 rounded-full text-xs font-heading font-semibold transition-all whitespace-nowrap"
          style={{
            background:
              active === opt
                ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                : "oklch(0.93 0.02 80)",
            color: active === opt ? "white" : "oklch(0.35 0.12 25)",
            border: `1px solid ${active === opt ? "transparent" : "oklch(0.85 0.03 75)"}`,
          }}
          data-ocid={`shop.subfilter.${opt.replace(/\s/g, "_").toLowerCase()}`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

// ─── New Category Grid ─────────────────────────────────────────────────────────

function NewCategoryGrid({
  products,
  onAddToCart,
  showRattiSelector,
}: {
  products: Product[];
  onAddToCart: (p: Product, variantName?: string, price?: number) => void;
  showRattiSelector?: boolean;
}) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16" data-ocid="shop.newcat.empty_state">
        <div className="text-4xl mb-3">🔍</div>
        <p className="font-heading text-muted-foreground">
          इस श्रेणी में कोई उत्पाद नहीं मिला
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {products.map((p) => (
        <NewCategoryCard
          key={p.id}
          product={p}
          onAddToCart={onAddToCart}
          showRattiSelector={showRattiSelector}
        />
      ))}
    </div>
  );
}

// ─── Shop By Concern Filter Bar ────────────────────────────────────────────────

function ConcernFilterBar({
  selected,
  onToggle,
  onClear,
}: {
  selected: Concern[];
  onToggle: (c: Concern) => void;
  onClear: () => void;
}) {
  return (
    <div
      className="border-b px-4 py-3"
      style={{
        background: "oklch(0.97 0.015 80)",
        borderColor: "oklch(0.88 0.03 75)",
      }}
    >
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="font-heading font-bold text-xs"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            🎯 Shop By Concern
          </span>
          {selected.length > 0 && (
            <span
              className="text-xs font-heading font-bold px-1.5 py-0.5 rounded-full"
              style={{ background: "oklch(0.68 0.20 48)", color: "white" }}
            >
              {selected.length}
            </span>
          )}
          {selected.length > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="text-xs font-body underline ml-auto"
              style={{ color: "oklch(0.55 0.16 48)" }}
              data-ocid="shop.concern_filter.clear_button"
            >
              Clear All
            </button>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {CONCERNS.map((concern) => {
            const isActive = selected.includes(concern.id);
            return (
              <button
                type="button"
                key={concern.id}
                onClick={() => onToggle(concern.id)}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-heading font-semibold transition-all hover:scale-105 whitespace-nowrap"
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                    : "oklch(0.93 0.02 80)",
                  color: isActive ? "white" : "oklch(0.35 0.12 25)",
                  border: `1px solid ${isActive ? "transparent" : "oklch(0.85 0.03 75)"}`,
                }}
                data-ocid={`shop.concern.${concern.id.replace(/\s/g, "_").toLowerCase()}`}
              >
                <span>{concern.emoji}</span>
                <span>{concern.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function SpiritualShop() {
  const { data: products = [], isLoading } = useGetAllProducts();
  const addItem = useCartStore((s) => s.addItem);

  // Try to read URL search params for concerns (graceful fallback)
  let initialConcerns: Concern[] = [];
  let initialCategory = "All";
  let initialNewTab: string | null = null;
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const concernParam = urlParams.get("concerns");
    if (concernParam) {
      initialConcerns = concernParam
        .split(",")
        .filter((c): c is Concern =>
          CONCERNS.some((concern) => concern.id === c),
        );
    }
    const categoryParam = urlParams.get("category");
    if (categoryParam) {
      // If the category is one of the missing product categories, use it as a new tab
      if (MISSING_PRODUCT_CATEGORIES.includes(categoryParam)) {
        initialNewTab = categoryParam;
      } else {
        initialCategory = categoryParam;
      }
    }
  } catch {
    // no-op
  }

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [showConsultation, setShowConsultation] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProductTab, setSelectedProductTab] = useState("All");
  const [activeNewTab, setActiveNewTab] = useState<string | null>(
    initialNewTab,
  );
  const [silverSub, setSilverSub] = useState("All");
  const [ringsSub, setRingsSub] = useState("All");
  const [braceletsSub, setBraceletsSub] = useState("All");
  const [pendantsSub, setPendantsSub] = useState("All");
  const [necklacesSub, setNecklacesSub] = useState("All");
  const [herbSub, setHerbSub] = useState("All");
  const [selectedHerb, setSelectedHerb] = useState<
    (typeof herbsProducts)[0] | null
  >(null);
  const [selectedConcerns, setSelectedConcerns] =
    useState<Concern[]>(initialConcerns);

  // Persist concerns in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (selectedConcerns.length > 0) {
      params.set("concerns", selectedConcerns.join(","));
    } else {
      params.delete("concerns");
    }
    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    window.history.replaceState({}, "", newUrl);
  }, [selectedConcerns]);

  const toggleConcern = (c: Concern) => {
    setSelectedConcerns((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );
  };
  const clearConcerns = () => setSelectedConcerns([]);

  const displayProducts = products.length > 0 ? products : ALL_PLACEHOLDER;

  const priceRange = PRICE_RANGES[selectedPriceRange];
  const filtered = useMemo(() => {
    return displayProducts.filter((p) => {
      const catMatch =
        selectedCategory === "All" || p.category === selectedCategory;
      const priceMatch = p.price >= priceRange.min && p.price <= priceRange.max;
      const concernMatch = productMatchesConcerns(p, selectedConcerns);
      return catMatch && priceMatch && concernMatch;
    });
  }, [displayProducts, selectedCategory, priceRange, selectedConcerns]);

  const categoryCounts = useMemo(
    () =>
      CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
        acc[cat] =
          cat === "All"
            ? displayProducts.length
            : displayProducts.filter((p) => p.category === cat).length;
        return acc;
      }, {}),
    [displayProducts],
  );

  const handleAddToCart = (
    product: Product,
    variantName?: string,
    variantPrice?: number,
  ) => {
    addItem({
      id: product.id,
      name: product.name,
      price: variantPrice ?? product.price,
      category: product.category,
      variantName,
    });
    const label = variantName
      ? `${product.name} (${variantName})`
      : product.name;
    toast.success(`${label} कार्ट में जोड़ा!`);
  };

  // New category products filtered by sub-tab
  const silverProducts = useMemo(() => {
    if (silverSub === "Silver Yantras")
      return SILVER_YANTRAS as unknown as Product[];
    if (silverSub === "Silver Rakhis")
      return SILVER_RAKHIS as unknown as Product[];
    return SILVER_PRODUCTS as unknown as Product[];
  }, [silverSub]);

  const ringsProducts = useMemo(() => {
    const allRings = [
      ...(RINGS_NON_GEM as unknown as Product[]),
      ...(GEMSTONE_RINGS as unknown as Product[]),
    ];
    if (ringsSub === "Religious")
      return allRings.filter((p) =>
        p.name.match(/Om|Ganesh|Ram|Shiv|Durga|Sai|Rudraksha/i),
      );
    if (ringsSub === "Gemstone") return GEMSTONE_RINGS as unknown as Product[];
    if (ringsSub === "Stylish")
      return allRings.filter((p) =>
        p.name.match(/Silver|Gold Plated|Hamsa|Lotus|Band/i),
      );
    return allRings;
  }, [ringsSub]);

  const braceletsProducts = useMemo(() => {
    const all = BRACELETS_GENERAL as unknown as Product[];
    if (braceletsSub === "Zodiac")
      return all.filter((p) => p.name.match(/Zodiac|Leo|Virgo|Aries/i));
    if (braceletsSub === "Gemstone")
      return all.filter((p) =>
        p.name.match(/Amethyst|Rose Quartz|Tiger Eye|Crystal/i),
      );
    if (braceletsSub === "Kada")
      return all.filter((p) => p.name.match(/Kada/i));
    if (braceletsSub === "Rudraksha")
      return all.filter((p) => p.name.match(/Rudraksha/i));
    if (braceletsSub === "Stylish")
      return all.filter((p) => p.name.match(/Stainless|Copper|Lotus/i));
    if (braceletsSub === "Popular") return all.filter((p) => p.price >= 599);
    return all;
  }, [braceletsSub]);

  const pendantsProducts = useMemo(() => {
    const all = PENDANTS_GENERAL as unknown as Product[];
    if (pendantsSub === "Gemstone")
      return all.filter((p) => p.name.match(/Amethyst|Citrine|Ruby|Pearl/i));
    if (pendantsSub === "Zodiac")
      return all.filter((p) => p.name.match(/Aries|Leo|Zodiac/i));
    if (pendantsSub === "Lucky Charms")
      return all.filter((p) =>
        p.name.match(/Horseshoe|Evil Eye|Clover|Hamsa/i),
      );
    if (pendantsSub === "Stylish")
      return all.filter((p) => p.name.match(/Om|Trishul|Lotus/i));
    return all;
  }, [pendantsSub]);

  const necklacesProducts = useMemo(() => {
    const all = SPIRITUAL_NECKLACES as unknown as Product[];
    if (necklacesSub === "Gold Plated")
      return all.filter((p) => p.name.match(/Gold/i));
    if (necklacesSub === "Silver Plated")
      return all.filter((p) => p.name.match(/Silver/i));
    if (necklacesSub === "Regular")
      return all.filter((p) => !p.name.match(/Gold|Silver Plated/i));
    return all;
  }, [necklacesSub]);

  const herbsFiltered = useMemo(() => {
    if (herbSub === "All") return herbsProducts;
    return herbsProducts.filter((p) => p.category === herbSub);
  }, [herbSub]);

  const isNewCategoryActive = activeNewTab !== null;

  return (
    <div>
      {/* Hero Banner */}
      <div
        className="relative w-full overflow-hidden"
        style={{ minHeight: "280px" }}
      >
        <img
          src="/assets/generated/shop-banner.dim_1200x400.png"
          alt="Spiritual Shop"
          className="w-full h-72 object-cover"
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.18 0.06 25 / 0.5), oklch(0.12 0.04 20 / 0.75))",
          }}
        >
          <h1
            className="font-decorative text-3xl md:text-5xl font-bold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            💎 Spiritual Connect Mall
          </h1>
          <p
            className="font-body text-lg"
            style={{ color: "oklch(0.85 0.04 75)" }}
          >
            रुद्राक्ष, रत्न, यंत्र, पूजा सामग्री, देव प्रतिमाएं, पेंडेंट और बहुत कुछ
          </p>
        </div>
      </div>

      {/* Consultation CTA */}
      <div
        className="border-b"
        style={{
          background: "oklch(0.22 0.08 25)",
          borderColor: "oklch(0.30 0.08 25)",
        }}
      >
        <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="font-body text-sm"
            style={{ color: "oklch(0.85 0.04 75)" }}
          >
            <MessageCircle
              className="h-4 w-4 inline mr-1.5"
              style={{ color: "oklch(0.68 0.20 48)" }}
            />
            <span
              className="font-heading font-semibold"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              Not sure which Rudraksha or Gemstone suits you?
            </span>{" "}
            Get a free personalised recommendation.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("Rudraksha");
              setActiveNewTab(null);
              setShowConsultation(true);
              window.scrollTo({ top: 400, behavior: "smooth" });
            }}
            className="shrink-0 px-4 py-1.5 rounded-full font-heading font-semibold text-xs transition-all hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
            }}
            data-ocid="shop.consultation.cta_button"
          >
            🙏 Book Free Consultation
          </button>
        </div>
      </div>

      {/* Promo Banner */}
      <div
        className="border-b"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.55 0.18 145), oklch(0.45 0.16 140))",
          borderColor: "oklch(0.45 0.16 140)",
        }}
        data-ocid="shop.promo_banner"
      >
        <div className="container mx-auto px-4 py-2.5 text-center">
          <p className="font-heading font-bold text-sm text-white">
            🎁 FREE 5 Mukhi Rudraksh Pendant on ordering any Rudraksha product!
            | कोई भी रुद्राक्ष ऑर्डर करें, पाएं FREE पेंडेंट
          </p>
        </div>
      </div>

      {/* Cashback Banner */}
      <div
        className="border-b"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40), oklch(0.72 0.18 55))",
          borderColor: "oklch(0.58 0.18 40)",
        }}
        data-ocid="shop.cashback_banner"
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-center gap-3">
          <span className="text-lg">🎉</span>
          <p className="font-heading font-bold text-sm text-white">
            100% Cashback on Select Items — Limited Time Offer!
          </p>
          <span
            className="shrink-0 text-xs font-heading font-bold px-2 py-0.5 rounded-full cursor-pointer"
            style={{
              background: "oklch(0.99 0.01 80 / 0.25)",
              color: "white",
              border: "1px solid oklch(0.99 0.01 80 / 0.4)",
            }}
            title="Purchase eligible items and submit proof within 7 days of delivery. Cashback credited within 15 working days."
          >
            ℹ️ T&C
          </span>
        </div>
      </div>

      {/* ─── Special Collections Quick Link ─── */}
      <div
        className="border-b"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.62 0.18 45), oklch(0.52 0.16 38))",
          borderColor: "oklch(0.52 0.16 38)",
        }}
        data-ocid="shop.special_collections_banner"
      >
        <div className="container mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
          <p className="font-heading font-bold text-sm text-white">
            ✨ NEW: Kaka Items • Karungali • Sacred Frames • Combo Packs •
            Mother's Day Special
          </p>
          <Link
            to="/shop/special-collections"
            data-ocid="shop.special_collections_link"
            className="shrink-0 px-4 py-1.5 rounded-full font-heading font-semibold text-xs whitespace-nowrap transition-all hover:scale-105"
            style={{
              background: "oklch(0.99 0.01 80 / 0.25)",
              color: "white",
              border: "1px solid oklch(0.99 0.01 80 / 0.4)",
            }}
          >
            View Special Collections →
          </Link>
        </div>
      </div>

      {/* ─── Browse by Category Grid ─── */}
      <BrowseByCategorySection
        onSelectCategory={(cat) => {
          setActiveNewTab(null);
          setSelectedCategory(cat);
          // Scroll to product grid
          setTimeout(() => {
            const el = document.getElementById("shop-product-grid");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }}
        productCounts={categoryCounts}
      />

      {/* ─── Featured Collections ─── */}
      <FeaturedCollections
        onSelectCategory={(cat) => {
          setActiveNewTab(null);
          setSelectedCategory(cat);
          setTimeout(() => {
            const el = document.getElementById("shop-product-grid");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }}
      />

      {/* ─── Numerology Luck Watches ─── */}
      <LuckWatchesSection
        onAddToCart={(watch) => {
          addItem({
            id: watch.id,
            name: watch.name,
            price: watch.price,
            category: "Luck Watch",
          });
          toast.success(`${watch.name} added to cart! ⌚`);
        }}
      />

      {/* Category Tabs (top quick-nav) */}
      <div
        className="border-b sticky top-0 z-10"
        style={{
          background: "oklch(0.97 0.01 80)",
          borderColor: "oklch(0.88 0.03 75)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            {[
              { label: "All", emoji: "✨" },
              { label: "Temple Blessed Range", emoji: "🛕" },
              { label: "Bestsellers", emoji: "⭐" },
              { label: "Divine Box", emoji: "📦" },
              { label: "Siddh Combo", emoji: "🙏" },
              { label: "Siddh Murti", emoji: "🪆" },
              { label: "Bracelets", emoji: "📿" },
              { label: "New Launches", emoji: "🆕" },
            ].map((tab) => (
              <button
                type="button"
                key={tab.label}
                onClick={() => setSelectedProductTab(tab.label)}
                data-ocid={`shop.tab.${tab.label.replace(/\s/g, "_").toLowerCase()}`}
                className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full font-heading text-xs font-semibold transition-all whitespace-nowrap"
                style={{
                  background:
                    selectedProductTab === tab.label
                      ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                      : "oklch(0.93 0.02 80)",
                  color:
                    selectedProductTab === tab.label
                      ? "white"
                      : "oklch(0.35 0.12 25)",
                  border: `1px solid ${selectedProductTab === tab.label ? "transparent" : "oklch(0.85 0.03 75)"}`,
                }}
              >
                {tab.emoji} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Shop By Concern Filter Bar */}
      <ConcernFilterBar
        selected={selectedConcerns}
        onToggle={toggleConcern}
        onClear={clearConcerns}
      />

      {/* New Category Tabs (925 Silver, 3D Lamps, Rings, Bracelets, Pendants, etc.) */}
      <div
        className="border-b"
        style={{
          background: "oklch(0.96 0.015 80)",
          borderColor: "oklch(0.88 0.03 75)",
        }}
      >
        <div className="container mx-auto px-4 py-3">
          <p
            className="font-heading font-bold text-xs mb-2"
            style={{ color: "oklch(0.45 0.08 40)" }}
          >
            🛍️ Featured Categories
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {NEW_CATEGORY_TABS.map((tab) => (
              <button
                type="button"
                key={tab.id}
                onClick={() => {
                  setActiveNewTab(activeNewTab === tab.id ? null : tab.id);
                  setSelectedCategory("All");
                }}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full font-heading text-xs font-semibold transition-all whitespace-nowrap hover:scale-105"
                style={{
                  background:
                    activeNewTab === tab.id
                      ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                      : "oklch(0.93 0.02 80)",
                  color:
                    activeNewTab === tab.id ? "white" : "oklch(0.35 0.12 25)",
                  border: `1px solid ${activeNewTab === tab.id ? "transparent" : "oklch(0.85 0.03 75)"}`,
                }}
                data-ocid={`shop.newtab.${tab.id.replace(/\s/g, "_").toLowerCase()}`}
              >
                {tab.emoji} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Shop By Purpose Section */}
      <div
        className="border-b"
        style={{
          background: "oklch(0.96 0.015 80)",
          borderColor: "oklch(0.88 0.03 75)",
        }}
      >
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between mb-3">
            <h2
              className="font-heading font-bold text-base"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              🎯 Shop By Purpose
            </h2>
            <Link to="/shop/by-purpose">
              <span
                className="text-xs font-heading font-semibold underline cursor-pointer"
                style={{ color: "oklch(0.55 0.16 48)" }}
              >
                View All →
              </span>
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {SHOP_PURPOSES.map((purpose) => (
              <Link to="/shop/by-purpose" key={purpose.id}>
                <div
                  className="shrink-0 flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl border cursor-pointer hover:scale-105 transition-all"
                  style={{
                    background: "oklch(0.97 0.01 80)",
                    borderColor: "oklch(0.88 0.03 75)",
                    minWidth: "90px",
                  }}
                  data-ocid={`shop.purpose.${purpose.id}`}
                >
                  <span className="text-2xl">{purpose.emoji}</span>
                  <span
                    className="font-heading font-bold text-xs text-center"
                    style={{ color: "oklch(0.35 0.12 25)" }}
                  >
                    {purpose.labelHindi}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Shop By Temple Section */}
      <div
        className="border-b"
        style={{
          background: "oklch(0.97 0.01 80)",
          borderColor: "oklch(0.88 0.03 75)",
        }}
      >
        <div className="container mx-auto px-4 py-5">
          <h2
            className="font-heading font-bold text-base mb-3"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            🛕 Shop By Temple
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {SHOP_BY_TEMPLE.map((temple) => (
              <div
                key={temple.name}
                className="shrink-0 p-3 rounded-xl border cursor-pointer hover:shadow-sm transition-all"
                style={{
                  background: "oklch(0.93 0.02 80)",
                  borderColor: "oklch(0.85 0.03 75)",
                  minWidth: "160px",
                  maxWidth: "180px",
                }}
                data-ocid={`shop.temple.${temple.name.replace(/\s/g, "_").toLowerCase().slice(0, 20)}`}
              >
                <p
                  className="font-heading font-bold text-xs line-clamp-2 mb-1"
                  style={{ color: "oklch(0.22 0.08 22)" }}
                >
                  {temple.name}
                </p>
                <p className="text-xs text-muted-foreground font-body">
                  📍 {temple.location}
                </p>
                <Badge
                  className="mt-1.5 text-xs"
                  style={{
                    background: "oklch(0.68 0.20 48 / 0.1)",
                    color: "oklch(0.55 0.16 48)",
                  }}
                >
                  {temple.purpose}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Siddh Products Section */}
      {selectedProductTab !== "All" &&
        selectedProductTab !== "Bestsellers" &&
        selectedProductTab !== "Bracelets" && (
          <div className="container mx-auto px-4 py-6">
            <h2
              className="font-heading font-bold text-lg mb-4"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              {selectedProductTab === "Temple Blessed Range"
                ? "🛕 Temple Blessed Range"
                : selectedProductTab === "Divine Box"
                  ? "📦 Divine Box"
                  : selectedProductTab === "Siddh Combo"
                    ? "🙏 Siddh Combo"
                    : selectedProductTab === "Siddh Murti"
                      ? "🪆 Siddh Murti"
                      : selectedProductTab === "New Launches"
                        ? "🆕 New Launches"
                        : selectedProductTab}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
              {ALL_SHOP_PRODUCTS.filter((p) => {
                if (selectedProductTab === "Temple Blessed Range")
                  return p.category === "Temple Blessed Range";
                if (selectedProductTab === "Divine Box")
                  return p.category === "Divine Box";
                if (selectedProductTab === "Siddh Combo")
                  return p.category === "Siddh Combo";
                if (selectedProductTab === "Siddh Murti")
                  return p.category === "Siddh Murti";
                if (selectedProductTab === "New Launches")
                  return p.category === "New Launches";
                return true;
              }).map((product) => (
                <div
                  key={product.id}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
                  data-ocid={`shop.siddh.${product.id}`}
                >
                  <div
                    className="h-28 flex items-center justify-center text-4xl relative"
                    style={{ background: "oklch(0.94 0.025 80)" }}
                  >
                    {product.category === "Siddh Murti"
                      ? "🪆"
                      : product.category === "Divine Box"
                        ? "📦"
                        : "✨"}
                    {product.isBestSeller && (
                      <span
                        className="absolute top-2 left-2 text-xs font-bold px-1.5 py-0.5 rounded-full"
                        style={{
                          background: "oklch(0.68 0.20 48)",
                          color: "white",
                        }}
                      >
                        ⭐
                      </span>
                    )}
                    {product.templeBlessed && (
                      <span
                        className="absolute top-2 right-2 text-xs font-bold px-1.5 py-0.5 rounded-full"
                        style={{
                          background: "oklch(0.35 0.12 25)",
                          color: "white",
                        }}
                      >
                        🛕
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <p
                      className="font-heading font-bold text-xs line-clamp-2 mb-1"
                      style={{ color: "oklch(0.22 0.08 22)" }}
                    >
                      {product.name}
                    </p>
                    {product.reviewCount > 0 && (
                      <div className="flex items-center gap-0.5 mb-1">
                        <Star
                          className="h-3 w-3 fill-current"
                          style={{ color: "oklch(0.78 0.14 75)" }}
                        />
                        <span className="text-xs font-body text-muted-foreground">
                          {product.rating} ({product.reviewCount})
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-1">
                      <div>
                        <span
                          className="font-heading font-bold text-sm"
                          style={{ color: "oklch(0.68 0.20 48)" }}
                        >
                          ₹{product.price}
                        </span>
                        <span className="text-xs text-muted-foreground line-through ml-1">
                          ₹{product.originalPrice}
                        </span>
                      </div>
                      <Badge
                        className="text-xs"
                        style={{
                          background: "oklch(0.55 0.18 145 / 0.15)",
                          color: "oklch(0.45 0.16 140)",
                        }}
                      >
                        -{product.discountPercent}%
                      </Badge>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        addItem({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          category: product.category,
                        });
                        toast.success(`${product.name} कार्ट में जोड़ा!`);
                      }}
                      className="w-full mt-2 py-1.5 rounded-full font-heading text-xs font-semibold flex items-center justify-center gap-1"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                        color: "white",
                      }}
                      data-ocid="shop.siddh.add_to_cart"
                    >
                      <ShoppingCart className="h-3 w-3" /> जोड़ें
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* ─── New Category Panels ─────────────────────────────────────────── */}
      {isNewCategoryActive && (
        <div className="container mx-auto px-4 py-6">
          {/* 925 Silver Section */}
          {activeNewTab === "925 Silver" && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h2
                  className="font-heading font-bold text-lg"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  🥈 925 Silver Collection
                </h2>
                <Badge
                  style={{
                    background: "oklch(0.68 0.20 48 / 0.1)",
                    color: "oklch(0.55 0.16 48)",
                  }}
                >
                  {silverProducts.length} Products
                </Badge>
              </div>
              <SubFilterBar
                options={SILVER_SUB}
                active={silverSub}
                onChange={setSilverSub}
              />
              <NewCategoryGrid
                products={silverProducts}
                onAddToCart={handleAddToCart}
              />
            </div>
          )}

          {/* 3D Lamps Section */}
          {activeNewTab === "3D Lamps" && (
            <div>
              <h2
                className="font-heading font-bold text-lg mb-4"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                💡 3D Spiritual Lamps
              </h2>
              <NewCategoryGrid
                products={LAMPS_3D as unknown as Product[]}
                onAddToCart={handleAddToCart}
              />
            </div>
          )}

          {/* Necklaces Section */}
          {activeNewTab === "Necklaces" && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h2
                  className="font-heading font-bold text-lg"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  📿 Spiritual Necklaces
                </h2>
              </div>
              <SubFilterBar
                options={NECKLACES_SUB}
                active={necklacesSub}
                onChange={setNecklacesSub}
              />
              <NewCategoryGrid
                products={necklacesProducts}
                onAddToCart={handleAddToCart}
              />
            </div>
          )}

          {/* Gold Jewellery Section */}
          {activeNewTab === "Gold Jewellery" && (
            <div>
              <h2
                className="font-heading font-bold text-lg mb-4"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                🪙 Gold Jewellery
              </h2>
              <NewCategoryGrid
                products={GOLD_JEWELLERY as unknown as Product[]}
                onAddToCart={handleAddToCart}
              />
            </div>
          )}

          {/* Idols Section */}
          {activeNewTab === "Idols" && (
            <div>
              <h2
                className="font-heading font-bold text-lg mb-4"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                🪆 Sacred Idols
              </h2>
              <NewCategoryGrid
                products={IDOLS_PRODUCTS as unknown as Product[]}
                onAddToCart={handleAddToCart}
              />
            </div>
          )}

          {/* Rings Section */}
          {activeNewTab === "Rings" && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h2
                  className="font-heading font-bold text-lg"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  💍 Rings Collection
                </h2>
              </div>
              <SubFilterBar
                options={RINGS_SUB}
                active={ringsSub}
                onChange={setRingsSub}
              />
              <NewCategoryGrid
                products={ringsProducts}
                onAddToCart={handleAddToCart}
                showRattiSelector={
                  ringsSub === "Gemstone" || ringsSub === "All"
                }
              />
            </div>
          )}

          {/* Bracelets Section */}
          {activeNewTab === "Bracelets" && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h2
                  className="font-heading font-bold text-lg"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  📿 Bracelets Collection
                </h2>
              </div>
              <SubFilterBar
                options={BRACELETS_SUB}
                active={braceletsSub}
                onChange={setBraceletsSub}
              />
              <NewCategoryGrid
                products={braceletsProducts}
                onAddToCart={handleAddToCart}
              />
            </div>
          )}

          {/* Pendants Section */}
          {activeNewTab === "Pendants" && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h2
                  className="font-heading font-bold text-lg"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  💫 Pendants Collection
                </h2>
              </div>
              <SubFilterBar
                options={PENDANTS_SUB}
                active={pendantsSub}
                onChange={setPendantsSub}
              />
              <NewCategoryGrid
                products={pendantsProducts}
                onAddToCart={handleAddToCart}
              />
            </div>
          )}

          {/* Indian Herbs Section */}
          {activeNewTab === "Indian Herbs" && (
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2
                  className="font-heading font-bold text-lg"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  🌿 Indian Herbs & Spices
                </h2>
                <Badge
                  style={{
                    background: "oklch(0.52 0.16 145 / 0.12)",
                    color: "oklch(0.40 0.14 145)",
                  }}
                >
                  {herbsFiltered.length} Products
                </Badge>
              </div>
              <p
                className="text-xs font-body mb-4"
                style={{ color: "oklch(0.50 0.06 40)" }}
              >
                100% natural herbs, spices, seeds and flowers sourced directly
                from farmers
              </p>
              <SubFilterBar
                options={herbCategories}
                active={herbSub}
                onChange={setHerbSub}
              />
              {herbsFiltered.length === 0 ? (
                <div
                  className="text-center py-16"
                  data-ocid="shop.herbs.empty_state"
                >
                  <div className="text-4xl mb-3">🌿</div>
                  <p className="font-heading text-muted-foreground">
                    इस श्रेणी में कोई उत्पाद नहीं मिला
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {herbsFiltered.map((herb) => {
                    const pWithMrp = herb as { mrp?: number };
                    return (
                      <button
                        key={herb.id}
                        type="button"
                        className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col hover:shadow-md transition-shadow cursor-pointer text-left"
                        onClick={() => setSelectedHerb(herb)}
                        data-ocid={`shop.herb.${herb.id}`}
                      >
                        <div
                          className="h-32 flex items-center justify-center text-4xl relative"
                          style={{
                            background:
                              "linear-gradient(135deg, oklch(0.92 0.06 145), oklch(0.88 0.08 130))",
                          }}
                        >
                          <span className="text-4xl">🌿</span>
                          {pWithMrp.mrp && (
                            <span
                              className="absolute top-2 left-2 text-xs font-bold px-1.5 py-0.5 rounded-full"
                              style={{
                                background: "oklch(0.52 0.16 145)",
                                color: "white",
                              }}
                            >
                              -
                              {Math.round(
                                ((pWithMrp.mrp - herb.price) / pWithMrp.mrp) *
                                  100,
                              )}
                              %
                            </span>
                          )}
                          <span
                            className="absolute bottom-2 right-2 text-xs font-heading font-semibold px-1.5 py-0.5 rounded-full"
                            style={{
                              background: "oklch(0.52 0.16 145 / 0.2)",
                              color: "oklch(0.40 0.14 145)",
                            }}
                          >
                            {herb.category}
                          </span>
                        </div>
                        <div className="p-3 flex flex-col flex-1">
                          <p
                            className="font-heading font-bold text-xs line-clamp-2 mb-1"
                            style={{ color: "oklch(0.22 0.08 22)" }}
                          >
                            {herb.name}
                          </p>
                          <p className="text-xs font-body text-muted-foreground line-clamp-2 flex-1 mb-2">
                            {herb.description}
                          </p>
                          <div className="flex items-center justify-between mt-auto">
                            <div>
                              <span
                                className="font-heading font-bold text-sm"
                                style={{ color: "oklch(0.68 0.20 48)" }}
                              >
                                ₹{herb.price.toLocaleString()}
                              </span>
                              {pWithMrp.mrp && (
                                <span
                                  className="text-xs font-body line-through ml-1"
                                  style={{ color: "oklch(0.58 0.04 60)" }}
                                >
                                  ₹{pWithMrp.mrp.toLocaleString()}
                                </span>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                addItem({
                                  id: herb.id,
                                  name: herb.name,
                                  price: herb.price,
                                  category: herb.category,
                                  variantName: herb.category,
                                });
                                toast.success(`${herb.name} कार्ट में जोड़ा!`);
                              }}
                              className="flex items-center gap-1 px-2 py-1.5 rounded-full text-xs font-heading font-semibold transition-all hover:scale-105"
                              style={{
                                background:
                                  "linear-gradient(135deg, oklch(0.52 0.16 145), oklch(0.42 0.14 140))",
                                color: "white",
                              }}
                              data-ocid="shop.herb.add_to_cart"
                            >
                              <ShoppingCart className="h-3 w-3" />
                              जोड़ें
                            </button>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Gemstone Rings Section */}
          {activeNewTab === "rings" && (
            <div>
              <h2
                className="font-heading font-bold text-lg mb-4"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                💍 Gemstone Rings
              </h2>
              <NewCategoryGrid
                products={MISSING_AS_PRODUCTS.filter(
                  (p) => p.category === "rings",
                )}
                onAddToCart={handleAddToCart}
              />
            </div>
          )}

          {/* Crystal Towers Section */}
          {activeNewTab === "crystal-towers" && (
            <div>
              <h2
                className="font-heading font-bold text-lg mb-4"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                🗼 Crystal Towers
              </h2>
              <NewCategoryGrid
                products={MISSING_AS_PRODUCTS.filter(
                  (p) => p.category === "crystal-towers",
                )}
                onAddToCart={handleAddToCart}
              />
            </div>
          )}

          {/* Coin Pendants Section */}
          {activeNewTab === "coin-pendants" && (
            <div>
              <h2
                className="font-heading font-bold text-lg mb-4"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                🪙 Coin Pendants
              </h2>
              <NewCategoryGrid
                products={MISSING_AS_PRODUCTS.filter(
                  (p) => p.category === "coin-pendants",
                )}
                onAddToCart={handleAddToCart}
              />
            </div>
          )}

          {/* Owls & Figurines Section */}
          {activeNewTab === "owls" && (
            <div>
              <h2
                className="font-heading font-bold text-lg mb-4"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                🦉 Owls & Figurines
              </h2>
              <NewCategoryGrid
                products={MISSING_AS_PRODUCTS.filter(
                  (p) => p.category === "owls",
                )}
                onAddToCart={handleAddToCart}
              />
            </div>
          )}

          {/* Brass Murti Section */}
          {activeNewTab === "brass-murti" && (
            <div>
              <h2
                className="font-heading font-bold text-lg mb-4"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                🪆 Brass Murti
              </h2>
              <NewCategoryGrid
                products={MISSING_AS_PRODUCTS.filter(
                  (p) => p.category === "brass-murti",
                )}
                onAddToCart={handleAddToCart}
              />
            </div>
          )}

          {/* Elephants Section */}
          {activeNewTab === "elephants" && (
            <div>
              <h2
                className="font-heading font-bold text-lg mb-4"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                🐘 Elephants
              </h2>
              <NewCategoryGrid
                products={MISSING_AS_PRODUCTS.filter(
                  (p) => p.category === "elephants",
                )}
                onAddToCart={handleAddToCart}
              />
            </div>
          )}

          {/* Puja Sets Section */}
          {activeNewTab === "puja-sets" && (
            <div>
              <h2
                className="font-heading font-bold text-lg mb-4"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                🪔 Puja Sets
              </h2>
              <NewCategoryGrid
                products={MISSING_AS_PRODUCTS.filter(
                  (p) => p.category === "puja-sets",
                )}
                onAddToCart={handleAddToCart}
              />
            </div>
          )}

          {/* Vastu Frames Section */}
          {activeNewTab === "vastu-frames" && (
            <div>
              <h2
                className="font-heading font-bold text-lg mb-4"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                🖼️ Vastu Frames
              </h2>
              <NewCategoryGrid
                products={MISSING_AS_PRODUCTS.filter(
                  (p) => p.category === "vastu-frames",
                )}
                onAddToCart={handleAddToCart}
              />
            </div>
          )}

          {/* Yantra Coins Section */}
          {activeNewTab === "yantra-coins" && (
            <div>
              <h2
                className="font-heading font-bold text-lg mb-4"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                🔯 Yantra Coins
              </h2>
              <NewCategoryGrid
                products={MISSING_AS_PRODUCTS.filter(
                  (p) => p.category === "yantra-coins",
                )}
                onAddToCart={handleAddToCart}
              />
            </div>
          )}
        </div>
      )}

      {/* ─── Herb Product Detail Modal ─────────────────────────────────────── */}
      {selectedHerb && (
        <Dialog
          open={!!selectedHerb}
          onOpenChange={() => setSelectedHerb(null)}
        >
          <DialogContent
            className="max-w-lg max-h-[90vh] overflow-hidden p-0"
            data-ocid="shop.herb_detail.dialog"
            style={{
              background: "oklch(0.14 0.04 20)",
              border: "1px solid oklch(0.30 0.08 25)",
            }}
          >
            <DialogHeader className="px-6 pt-6 pb-0">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <Badge
                    className="text-xs mb-2"
                    style={{
                      background: "oklch(0.52 0.16 145 / 0.15)",
                      color: "oklch(0.40 0.14 145)",
                    }}
                  >
                    🌿 {selectedHerb.category}
                  </Badge>
                  <DialogTitle
                    className="font-decorative text-xl"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    {selectedHerb.name}
                  </DialogTitle>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedHerb(null)}
                  className="shrink-0 rounded-full p-1"
                  style={{ color: "oklch(0.60 0.04 60)" }}
                  data-ocid="shop.herb_detail.close_button"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </DialogHeader>
            <ScrollArea className="flex-1 h-[65vh]">
              <div className="px-6 pb-6 space-y-4">
                {/* Herb image placeholder with green tint */}
                <div
                  className="h-36 rounded-xl flex items-center justify-center text-6xl"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.88 0.10 145), oklch(0.82 0.12 130))",
                  }}
                >
                  🌿
                </div>

                {/* Price + Add to Cart */}
                <div className="flex items-center justify-between">
                  <div>
                    <span
                      className="font-heading text-2xl font-bold"
                      style={{ color: "oklch(0.68 0.20 48)" }}
                    >
                      ₹{selectedHerb.price.toLocaleString()}
                    </span>
                    {(selectedHerb as { mrp?: number }).mrp && (
                      <span
                        className="ml-2 text-sm font-body line-through"
                        style={{ color: "oklch(0.58 0.04 60)" }}
                      >
                        ₹
                        {(
                          selectedHerb as { mrp?: number }
                        ).mrp?.toLocaleString()}
                      </span>
                    )}
                    <Badge
                      className="ml-2 text-xs"
                      style={{
                        background: "oklch(0.52 0.16 145 / 0.2)",
                        color: "oklch(0.40 0.14 145)",
                      }}
                    >
                      ✓ उपलब्ध
                    </Badge>
                  </div>
                  <Button
                    onClick={() => {
                      addItem({
                        id: selectedHerb.id,
                        name: selectedHerb.name,
                        price: selectedHerb.price,
                        category: selectedHerb.category,
                        variantName: selectedHerb.category,
                      });
                      toast.success(`${selectedHerb.name} कार्ट में जोड़ा!`);
                      setSelectedHerb(null);
                    }}
                    data-ocid="shop.herb_detail.add_to_cart_button"
                    className="font-heading font-semibold"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.52 0.16 145), oklch(0.42 0.14 140))",
                      color: "white",
                    }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" /> कार्ट में जोड़ें
                  </Button>
                </div>

                <Separator style={{ borderColor: "oklch(0.28 0.06 25)" }} />

                {/* Description */}
                <div>
                  <h3
                    className="font-heading font-semibold text-sm mb-1"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    विवरण
                  </h3>
                  <p
                    className="text-sm font-body"
                    style={{ color: "oklch(0.72 0.04 60)" }}
                  >
                    {selectedHerb.description}
                  </p>
                </div>

                {/* Benefits */}
                <div
                  className="p-3 rounded-xl"
                  style={{
                    background: "oklch(0.52 0.16 145 / 0.08)",
                    border: "1px solid oklch(0.52 0.16 145 / 0.2)",
                  }}
                >
                  <h3
                    className="font-heading font-semibold text-sm mb-2"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    🌱 लाभ
                  </h3>
                  <p
                    className="text-sm font-body"
                    style={{ color: "oklch(0.72 0.04 60)" }}
                  >
                    {selectedHerb.benefits}
                  </p>
                </div>

                {/* Astrological Purpose */}
                <div
                  className="p-3 rounded-xl"
                  style={{ background: "oklch(0.18 0.06 30)" }}
                >
                  <h3
                    className="font-heading font-semibold text-sm mb-1"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    🪐 ज्योतिषीय उद्देश्य
                  </h3>
                  <p
                    className="text-sm font-body"
                    style={{ color: "oklch(0.72 0.04 60)" }}
                  >
                    {selectedHerb.astrologicalPurpose}
                  </p>
                </div>

                {/* View Details Link */}
                <Link to="/shop/$id" params={{ id: selectedHerb.id }}>
                  <button
                    type="button"
                    className="w-full py-2 rounded-xl font-heading text-sm font-semibold border transition-opacity hover:opacity-80"
                    style={{
                      borderColor: "oklch(0.52 0.16 145 / 0.4)",
                      color: "oklch(0.40 0.14 145)",
                      background: "oklch(0.52 0.16 145 / 0.06)",
                    }}
                    data-ocid="shop.herb_detail.view_details_button"
                  >
                    View Full Details →
                  </button>
                </Link>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}

      {/* ─── Main Shop Grid (original categories) ─── */}
      {!isNewCategoryActive && (
        <div className="container mx-auto px-4 py-8" id="shop-product-grid">
          <div className="flex gap-8">
            {/* Sidebar */}
            <aside
              className={`shrink-0 w-56 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}
              data-ocid="shop.sidebar"
            >
              <div>
                <h3
                  className="font-heading font-bold text-sm mb-3"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  📂 श्रेणियां
                </h3>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      data-ocid={`shop.sidebar.${cat.replace(/\s/g, "_").toLowerCase()}`}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-heading text-xs font-semibold transition-all text-left"
                      style={{
                        background:
                          selectedCategory === cat
                            ? "linear-gradient(135deg, oklch(0.68 0.20 48 / 0.15), oklch(0.58 0.18 40 / 0.1))"
                            : "transparent",
                        color:
                          selectedCategory === cat
                            ? "oklch(0.45 0.16 40)"
                            : "oklch(0.45 0.06 40)",
                        border: `1px solid ${selectedCategory === cat ? "oklch(0.68 0.20 48 / 0.3)" : "transparent"}`,
                      }}
                    >
                      <span>
                        {CATEGORY_ICONS[cat]} {cat}
                      </span>
                      <span
                        className="text-xs rounded-full px-1.5 py-0.5"
                        style={{
                          background: "oklch(0.90 0.03 75)",
                          color: "oklch(0.50 0.08 40)",
                        }}
                      >
                        {categoryCounts[cat] || 0}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3
                  className="font-heading font-bold text-sm mb-3"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  💰 मूल्य सीमा
                </h3>
                <div className="space-y-1">
                  {PRICE_RANGES.map((range, idx) => (
                    <button
                      type="button"
                      key={range.label}
                      onClick={() => setSelectedPriceRange(idx)}
                      data-ocid={`shop.price_filter.${idx}`}
                      className="w-full flex items-center px-3 py-2 rounded-lg font-body text-xs transition-all text-left"
                      style={{
                        background:
                          selectedPriceRange === idx
                            ? "oklch(0.68 0.20 48 / 0.12)"
                            : "transparent",
                        color:
                          selectedPriceRange === idx
                            ? "oklch(0.45 0.16 40)"
                            : "oklch(0.45 0.06 40)",
                        fontWeight: selectedPriceRange === idx ? "600" : "400",
                        border: `1px solid ${selectedPriceRange === idx ? "oklch(0.68 0.20 48 / 0.25)" : "transparent"}`,
                      }}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              <div
                className="p-3 rounded-xl text-center"
                style={{
                  background: "oklch(0.68 0.20 48 / 0.08)",
                  border: "1px solid oklch(0.68 0.20 48 / 0.2)",
                }}
              >
                <div className="text-2xl mb-1">🛕</div>
                <p
                  className="font-heading text-xs font-bold mb-2"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  पूजा बुकिंग
                </p>
                <p
                  className="font-body text-xs mb-3"
                  style={{ color: "oklch(0.50 0.06 40)" }}
                >
                  घर या मंदिर में पूजा बुक करें
                </p>
                <Link to="/temple-services">
                  <button
                    type="button"
                    className="w-full py-1.5 rounded-full font-heading text-xs font-semibold"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                      color: "white",
                    }}
                  >
                    बुक करें
                  </button>
                </Link>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Mobile filter + category pills */}
              <div className="flex items-center justify-between mb-4 gap-3">
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full font-heading text-xs font-semibold border"
                  style={{
                    borderColor: "oklch(0.78 0.14 75 / 0.3)",
                    color: "oklch(0.35 0.12 25)",
                  }}
                >
                  <Filter className="h-3.5 w-3.5" /> Filters
                </button>
                <div className="flex-1 overflow-x-auto">
                  <div className="flex flex-nowrap gap-2 lg:hidden pb-1">
                    {CATEGORIES.slice(0, 6).map((cat) => (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        data-ocid={`shop.${cat.replace(/\s/g, "_").toLowerCase()}.tab`}
                        className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full font-heading text-xs font-semibold transition-all"
                        style={{
                          background:
                            selectedCategory === cat
                              ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                              : "oklch(0.94 0.025 80)",
                          color:
                            selectedCategory === cat
                              ? "white"
                              : "oklch(0.35 0.12 25)",
                          border: `1px solid ${selectedCategory === cat ? "transparent" : "oklch(0.78 0.14 75 / 0.2)"}`,
                        }}
                      >
                        {CATEGORY_ICONS[cat]} {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Energized Gemstones Description Banner */}
              {selectedCategory === "Energized Gemstones" && (
                <div
                  className="mb-5 p-5 rounded-2xl space-y-4"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.22 0.08 40 / 0.12), oklch(0.18 0.06 30 / 0.08))",
                    border: "1px solid oklch(0.68 0.20 48 / 0.25)",
                  }}
                  data-ocid="shop.gemstones.description_banner"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">💎</span>
                    <h3
                      className="font-heading font-bold text-base"
                      style={{ color: "oklch(0.35 0.12 25)" }}
                    >
                      Astrology Certified Gemstones — Prana-Pratishtha Activated
                    </h3>
                  </div>
                  <p
                    className="font-body text-xs leading-relaxed"
                    style={{ color: "oklch(0.45 0.06 40)" }}
                  >
                    spiritual connect for all types of Astrology Certified
                    Gemstones like ruby, pearl, coral, emerald, crystal, yemini
                    hakik, Hessonite, Blue sapphire, cat&apos;s eye, lapis
                    lazuli, Green tourmaline, topaz, unakite, amethyst, blue
                    spinel, Yellow Sapphire which are of 84 types. Astro Mantra
                    has been providing such astrology gemstone online at
                    affordable prices for many years. First of all, all these
                    astrological gemstones are tested in a reliable lab
                    certified by the Government of India. So that these
                    astrological gems become authentic. Thereafter, the gems in
                    proven Muhurta like, Ravi Yoga, Deepushkar Yoga, Pushya
                    Yoga, eclipse period and Pran Pratistha in the dark night.
                    Due to which one can see immediate benefits as soon as one
                    wears these astrological gemstone and semi-precious stones.
                    Many types of Astrology Gemstone and semi-precious stones
                    are available in the market. Though they have lab
                    certificate but even then they are not effective. Unless the
                    astrological gemstone is complete with Pran Pratistha, it
                    becomes harmful instead of beneficial. Due to which there
                    are chances of contracting many types of diseases.
                    Therefore, wear only astrological Certified Gemstones and
                    semi-precious stones. Some people think that by washing the
                    stone with Ganga water, the stone becomes vital, but it is
                    not so at all. For accomplishment, the one has to chant
                    mantra using the ritual consecration during Pran Pratistha.
                    Only then the gemstone becomes usable. By wearing a
                    Prana-Pratishtha stone, the defects by the planet to which
                    it belongs will soon eliminates. Your aura starts changing,
                    positive energy circulates, and your personality starts
                    attracting people. Bad things ends and money starts raining
                    on you from all directions.
                  </p>
                  <div
                    className="pt-3 border-t"
                    style={{ borderColor: "oklch(0.68 0.20 48 / 0.15)" }}
                  >
                    <p
                      className="font-heading font-semibold text-xs mb-1"
                      style={{ color: "oklch(0.45 0.16 40)" }}
                    >
                      🕉 ज्योतिष रत्न — विशेष जानकारी
                    </p>
                    <p
                      className="font-body text-xs leading-relaxed"
                      style={{ color: "oklch(0.45 0.06 40)" }}
                    >
                      spiritual connect सभी प्रकार के ज्योतिष रत्न-उपरत्न जैसे, माणिक्य,
                      मोती, मूंगा, पन्ना, पुखराज, गोमेद, नीलम, लहसुनिया, येमिनी हकिक,
                      लाजवर्द, स्फटिक, ग्रीन टर्मोलिन, सुनेला, जरमोदा, कटेला, नीली जो
                      84 प्रकार के होते है। ऐसे ज्योतिष रत्न एस्ट्रो मंत्रा कई वर्षों से सुलभ
                      मूल्य में ऑनलाइन प्रदान करता आ रहा है। सर्वप्रथम इन सभी ज्योतिष
                      रत्नों को भारत सरकार द्वारा प्रमाणित विश्वसनीय लैब में टेस्ट किया
                      जाता है, जिससें इन ज्योतिष रत्न-उपरन को प्रामाणिक की परख हो, उसके
                      बाद रत्नों को सिद्ध मुहूर्त जैसे, रवि योग, दीपुष्कर योग, पुष्य योग,
                      ग्रहण काल, कात रात्रि, में प्राण-प्रतिष्ठित करके प्रदान किये जाता है।
                      जिससे इन ज्योतिष रत्न और उपरत्न को पहनते ही शीघ्र लाभ देखने को
                      मिलता है। बाजार में कई तरह के ज्योतिष रत्न-उपरत्न मिलते है, जो लैब
                      टेस्ट किये तो होते है, लेकिन प्रभावयुक्त नहीं होते। जब तक ज्योतिष रत्न
                      उपरत्न को पूर्ण प्राण प्रतिष्ठित नहीं किया जाये, तब तक यह लाभ की
                      जगह हानिकारक होते है। जिससें कई प्रकार की बीमारियाँ लगने की
                      सम्भावनायें बनती है। इसलिए सिद्ध ज्योतिष रत्न-उपरत्न ही धारण करें,
                      कुछ लोग सोचते है स्टोन को गंगा जल से धोने से स्टोन प्राण प्रतिष्ठित
                      होने लगता है, पर ऐसा बिलकुल भी नहीं है। सिद्धि के लिए
                      प्राण-प्रतिष्ठित विधान प्रयोग कर, मन्त्र जाप किया जाता है, तब जा
                      कर रत्न सिद्ध होते है। प्राण-प्रतिष्ठित स्टोन पहनने से जिस ग्रह का
                      रत्न होता है, उस ग्रह से बना हुआ दोष शीघ्र ही समाप्त होने लगता है,
                      आपके आभा मण्डल में बदलाव आने लगता है, सकारात्मक उर्जा का संचार होता
                      है, लोग आपके से आकर्षित होने लगते है। बिगड़े हुए कार्य बनने लगते है,
                      चारो दिशाओ से आपके उपर धन की वर्षा से होने लगती है।
                    </p>
                  </div>
                </div>
              )}

              {/* Astrology Services Banner */}
              {selectedCategory === "Astrology Services" && (
                <div
                  className="mb-5 p-5 rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.22 0.10 280 / 0.15), oklch(0.18 0.08 300 / 0.10))",
                    border: "1px solid oklch(0.55 0.18 280 / 0.35)",
                  }}
                  data-ocid="shop.astrology_services.banner"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl shrink-0">🔮</div>
                    <div>
                      <h3
                        className="font-heading font-bold text-base mb-1"
                        style={{ color: "oklch(0.35 0.12 25)" }}
                      >
                        ज्योतिष परामर्श सेवाएं — Expert Vedic Astrology Reports
                      </h3>
                      <p
                        className="font-body text-xs mb-2"
                        style={{ color: "oklch(0.50 0.06 40)" }}
                      >
                        हमारे वरिष्ठ ज्योतिषाचार्यों द्वारा 48–72 घंटे में ईमेल से रिपोर्ट
                        प्राप्त करें।
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "✉️ Email Delivery 48–72hrs",
                          "🎓 Certified Vedic Experts",
                          "🔒 100% Confidential",
                        ].map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-heading px-2 py-0.5 rounded-full"
                            style={{
                              background: "oklch(0.68 0.20 48 / 0.12)",
                              color: "oklch(0.45 0.16 40)",
                              border: "1px solid oklch(0.68 0.20 48 / 0.2)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Rudraksha Consultation */}
              {selectedCategory === "Rudraksha" && showConsultation && (
                <RudrakshaConsultation products={displayProducts} />
              )}
              {selectedCategory === "Rudraksha" && !showConsultation && (
                <div
                  className="mb-5 p-4 rounded-xl flex items-center justify-between gap-3"
                  style={{
                    background: "oklch(0.68 0.20 48 / 0.07)",
                    border: "1px solid oklch(0.68 0.20 48 / 0.2)",
                  }}
                >
                  <div>
                    <p
                      className="font-heading font-bold text-sm"
                      style={{ color: "oklch(0.35 0.12 25)" }}
                    >
                      🟤 सही रुद्राक्ष कौन सा है?
                    </p>
                    <p
                      className="font-body text-xs mt-0.5"
                      style={{ color: "oklch(0.50 0.06 40)" }}
                    >
                      तीन सरल प्रश्नों के उत्तर दें और अपने लिए सर्वोत्तम रुद्राक्ष जानें।
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowConsultation(true)}
                    className="shrink-0 px-3 py-1.5 rounded-full text-xs font-heading font-semibold"
                    style={{
                      background: "oklch(0.68 0.20 48)",
                      color: "white",
                    }}
                    data-ocid="shop.rudraksha.find_button"
                  >
                    जानें →
                  </button>
                </div>
              )}

              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  {Array.from({ length: 8 }, (_, i) => i).map((i) => (
                    <Skeleton
                      key={`loading-${i}`}
                      className="h-64 rounded-2xl"
                      data-ocid="shop.loading_state"
                    />
                  ))}
                </div>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-4 font-body">
                    <span
                      className="font-heading font-semibold"
                      style={{ color: "oklch(0.35 0.12 25)" }}
                    >
                      {filtered.length}
                    </span>{" "}
                    उत्पाद
                    {selectedCategory !== "All" ? ` — ${selectedCategory}` : ""}
                    {priceRange.min > 0 ||
                    priceRange.max < Number.POSITIVE_INFINITY
                      ? ` — ${priceRange.label}`
                      : ""}
                    {selectedConcerns.length > 0 && (
                      <span
                        className="ml-2 text-xs font-heading px-1.5 py-0.5 rounded-full"
                        style={{
                          background: "oklch(0.68 0.20 48 / 0.1)",
                          color: "oklch(0.55 0.16 48)",
                        }}
                      >
                        {selectedConcerns.length} concern filter
                        {selectedConcerns.length > 1 ? "s" : ""}
                      </span>
                    )}
                  </p>

                  {filtered.length === 0 ? (
                    <div
                      className="text-center py-20"
                      data-ocid="shop.empty_state"
                    >
                      <div className="text-4xl mb-3">🔍</div>
                      <p className="font-heading text-muted-foreground">
                        इस श्रेणी में कोई उत्पाद नहीं मिला
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCategory("All");
                          setSelectedPriceRange(0);
                          clearConcerns();
                        }}
                        className="mt-3 text-sm font-body underline"
                        style={{ color: "oklch(0.55 0.16 48)" }}
                      >
                        सभी उत्पाद देखें
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                      {filtered.map((product, idx) => {
                        const gemKey = getGemstoneKey(product.name);
                        return (
                          <div
                            key={product.id}
                            className="temple-card flex flex-col relative"
                            data-ocid={`shop.item.${idx + 1}`}
                          >
                            <button
                              type="button"
                              className="w-full text-left"
                              onClick={() => setSelectedProduct(product)}
                              data-ocid="shop.product.open_modal_button"
                            >
                              <div
                                className="h-40 flex items-center justify-center text-5xl"
                                style={{ background: "oklch(0.94 0.025 80)" }}
                              >
                                {CATEGORY_ICONS[product.category] ?? "✨"}
                              </div>
                            </button>

                            <ProductBadges productId={product.id} />

                            <div className="p-4 flex flex-col flex-1">
                              <span
                                className="text-xs font-heading px-2 py-0.5 rounded-full mb-2 self-start"
                                style={{
                                  background: "oklch(0.68 0.20 48 / 0.1)",
                                  color: "oklch(0.55 0.16 48)",
                                }}
                              >
                                {product.category}
                              </span>
                              <button
                                type="button"
                                onClick={() => setSelectedProduct(product)}
                                data-ocid="shop.product_name.button"
                              >
                                <h3
                                  className="font-heading font-bold text-sm mb-1 text-left hover:underline"
                                  style={{ color: "oklch(0.22 0.08 22)" }}
                                >
                                  {product.name}
                                </h3>
                              </button>
                              <p className="text-xs font-body text-muted-foreground mb-3 flex-1 line-clamp-2">
                                {product.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                  <span
                                    className="font-heading font-bold"
                                    style={{ color: "oklch(0.68 0.20 48)" }}
                                  >
                                    ₹{product.price.toLocaleString()}
                                  </span>
                                  {"mrp" in product &&
                                    (product as { mrp?: number }).mrp && (
                                      <span
                                        className="text-xs font-body line-through"
                                        style={{ color: "oklch(0.58 0.04 60)" }}
                                      >
                                        ₹
                                        {(
                                          product as { mrp?: number }
                                        ).mrp!.toLocaleString()}
                                      </span>
                                    )}
                                  {product.price >= 1000 && (
                                    <span
                                      className="text-xs font-body"
                                      style={{ color: "oklch(0.50 0.14 145)" }}
                                    >
                                      EMI ₹{Math.ceil(product.price / 3)}/mo
                                    </span>
                                  )}
                                  {product.price >= 500 && (
                                    <span
                                      className="text-xs font-heading font-bold px-1.5 py-0.5 rounded-full self-start mt-0.5"
                                      style={{
                                        background:
                                          "linear-gradient(135deg, oklch(0.68 0.20 48 / 0.15), oklch(0.72 0.18 55 / 0.15))",
                                        color: "oklch(0.50 0.18 42)",
                                        border:
                                          "1px solid oklch(0.68 0.20 48 / 0.35)",
                                      }}
                                    >
                                      💰 100% Cashback
                                    </span>
                                  )}
                                </div>
                                {product.category === "Astrology Services" ? (
                                  <button
                                    type="button"
                                    onClick={() => handleAddToCart(product)}
                                    data-ocid="shop.book_consultation.button"
                                    className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-heading font-semibold transition-all hover:scale-105"
                                    style={{
                                      background:
                                        "linear-gradient(135deg, oklch(0.50 0.18 280), oklch(0.42 0.16 270))",
                                      color: "white",
                                    }}
                                  >
                                    🔮 Book
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (gemKey) {
                                        setSelectedProduct(product);
                                      } else {
                                        handleAddToCart(product);
                                      }
                                    }}
                                    data-ocid="shop.add_to_cart.button"
                                    className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-heading font-semibold transition-all hover:scale-105"
                                    style={{
                                      background:
                                        "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                                      color: "white",
                                    }}
                                  >
                                    <ShoppingCart className="h-3 w-3" />
                                    {gemKey ? "चुनें" : "जोड़ें"}
                                  </button>
                                )}
                              </div>
                              {product.category === "Astrology Services" && (
                                <p
                                  className="text-xs font-body mt-1"
                                  style={{ color: "oklch(0.55 0.06 40)" }}
                                >
                                  📧 48–72 hrs email delivery
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedProduct && (
        <ProductDetailDialog
          product={selectedProduct}
          open={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}
