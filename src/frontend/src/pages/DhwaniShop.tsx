import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "@tanstack/react-router";
import { Filter, Mail, Phone, ShoppingCart, Star, X } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  type DhwaniProduct,
  dhwaniCategories,
  dhwaniConcerns,
  dhwaniProducts,
  dhwaniStones,
} from "../data/dhwaniShopData";
import { useCartStore } from "../stores/cartStore";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}

function StarRating({ rating, size = 12 }: { rating: number; size?: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={`star-pos-${i}`}
          size={size}
          className={
            i < full
              ? "fill-amber-400 text-amber-400"
              : i === full && half
                ? "fill-amber-200 text-amber-400"
                : "text-muted-foreground"
          }
        />
      ))}
    </span>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({
  product,
  index,
}: {
  product: DhwaniProduct;
  index: number;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const navigate = useNavigate();

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
      });
      toast.success(`${product.name} added to cart`, {
        description: formatPrice(product.price),
        duration: 2500,
      });
    },
    [addItem, product],
  );

  const handleCardClick = useCallback(() => {
    navigate({ to: "/dhwani-shop/$id", params: { id: product.id } });
  }, [navigate, product.id]);

  const discountLabel = product.discount
    ? `${product.discount}% off`
    : product.mrp && product.mrp > product.price
      ? `${Math.round((1 - product.price / product.mrp) * 100)}% off`
      : null;

  return (
    <a
      href={`/dhwani-shop/${product.id}`}
      data-ocid={`dhwani-shop.product.${index}`}
      className="product-card group flex flex-col"
      onClick={(e) => {
        e.preventDefault();
        handleCardClick();
      }}
    >
      {/* Image placeholder */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 aspect-square">
        <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
          <span className="text-4xl mb-1 opacity-60">
            {dhwaniCategories.find((c) => c.id === product.category)?.icon ??
              "✨"}
          </span>
          <span className="text-xs text-muted-foreground px-2 text-center leading-tight max-w-full truncate">
            {product.stone ?? product.category}
          </span>
        </div>
        {/* Badges overlay */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {discountLabel && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500 text-white leading-none">
              {discountLabel}
            </span>
          )}
          {product.badge && !discountLabel && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500 text-white leading-none">
              {product.badge}
            </span>
          )}
          {product.isNew && !product.badge && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500 text-white leading-none">
              New
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3 gap-2">
        <h3
          className="font-heading font-semibold text-sm leading-tight line-clamp-2"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          {product.name}
        </h3>

        {product.description && (
          <p className="text-xs text-muted-foreground line-clamp-1">
            {product.description}
          </p>
        )}

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1.5">
            <StarRating rating={product.rating} size={11} />
            {product.reviews ? (
              <span className="text-xs text-muted-foreground">
                ({product.reviews})
              </span>
            ) : null}
          </div>
        )}

        {/* Price row */}
        <div className="flex flex-col gap-1 mt-auto">
          <div className="flex items-baseline gap-2">
            <span
              className="font-heading font-bold text-base"
              style={{ color: "oklch(0.68 0.2 48)" }}
            >
              {formatPrice(product.price)}
            </span>
            {product.mrp && product.mrp > product.price && (
              <span className="text-xs line-through text-muted-foreground">
                {formatPrice(product.mrp)}
              </span>
            )}
          </div>
          {product.price >= 500 && (
            <span
              className="text-[10px] font-heading font-bold px-1.5 py-0.5 rounded-full self-start"
              style={{
                background: "oklch(0.68 0.20 48 / 0.12)",
                color: "oklch(0.48 0.18 42)",
                border: "1px solid oklch(0.68 0.20 48 / 0.32)",
              }}
              data-ocid={`dhwani-shop.cashback_badge.${index}`}
            >
              💰 100% Cashback
            </span>
          )}
          {product.price >= 1000 && (
            <span
              className="text-[10px] font-body"
              style={{ color: "oklch(0.45 0.14 145)" }}
              data-ocid={`dhwani-shop.emi_tag.${index}`}
            >
              3-mo EMI: ₹{Math.ceil(product.price / 3).toLocaleString()}/mo
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <Button
          size="sm"
          data-ocid={`dhwani-shop.add_button.${index}`}
          onClick={handleAddToCart}
          className="w-full btn-spiritual text-xs h-8 mt-1 hover:opacity-90 transition-opacity"
        >
          <ShoppingCart size={13} className="mr-1.5" />
          Add to Cart
        </Button>
      </div>
    </a>
  );
}

// ─── Filter Panel (desktop sidebar) ──────────────────────────────────────────

function FilterPanel({
  activeConcerns,
  activeStones,
  priceRange,
  onConcernToggle,
  onStoneToggle,
  onPriceChange,
  onReset,
}: {
  activeConcerns: string[];
  activeStones: string[];
  priceRange: [number, number];
  onConcernToggle: (id: string) => void;
  onStoneToggle: (id: string) => void;
  onPriceChange: (range: [number, number]) => void;
  onReset: () => void;
}) {
  const hasFilters =
    activeConcerns.length > 0 ||
    activeStones.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 15000;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2
          className="font-heading font-bold text-base"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          Filters
        </h2>
        {hasFilters && (
          <button
            type="button"
            onClick={onReset}
            data-ocid="dhwani-shop.clear_filters"
            className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
          >
            <X size={12} /> Clear all
          </button>
        )}
      </div>

      {/* Price Range */}
      <div>
        <p
          className="font-heading text-sm font-semibold mb-3"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          Price Range
        </p>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground min-w-0">
            {formatPrice(priceRange[0])}
          </span>
          <span className="text-xs text-muted-foreground mx-1">–</span>
          <span className="text-xs text-muted-foreground">
            {formatPrice(priceRange[1])}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={15000}
          step={100}
          value={priceRange[1]}
          onChange={(e) =>
            onPriceChange([priceRange[0], Number(e.target.value)])
          }
          data-ocid="dhwani-shop.price_max_slider"
          className="w-full accent-amber-500"
        />
      </div>

      <Separator />

      {/* Concerns */}
      <div>
        <p
          className="font-heading text-sm font-semibold mb-3"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          Shop by Concern
        </p>
        <div className="flex flex-col gap-2">
          {dhwaniConcerns.map((c) => (
            <div key={c.id} className="flex items-center gap-2">
              <Checkbox
                id={`concern-${c.id}`}
                checked={activeConcerns.includes(c.id)}
                onCheckedChange={() => onConcernToggle(c.id)}
                data-ocid={`dhwani-shop.concern_filter.${c.id}`}
              />
              <Label
                htmlFor={`concern-${c.id}`}
                className="text-xs cursor-pointer"
              >
                {c.icon} {c.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Stones */}
      <div>
        <p
          className="font-heading text-sm font-semibold mb-3"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          Shop by Stone
        </p>
        <div className="flex flex-col gap-2">
          {dhwaniStones.map((s) => (
            <div key={s.id} className="flex items-center gap-2">
              <Checkbox
                id={`stone-${s.id}`}
                checked={activeStones.includes(s.id)}
                onCheckedChange={() => onStoneToggle(s.id)}
                data-ocid={`dhwani-shop.stone_filter.${s.id}`}
              />
              <Label
                htmlFor={`stone-${s.id}`}
                className="text-xs cursor-pointer"
              >
                {s.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DhwaniShop() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeConcerns, setActiveConcerns] = useState<string[]>([]);
  const [activeStones, setActiveStones] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [sortOrder, setSortOrder] = useState<string>("default");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categoryTabsRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // ── filter logic ─────────────────────────────────────────────────────────

  const toggleConcern = useCallback((id: string) => {
    setActiveConcerns((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  }, []);

  const toggleStone = useCallback((id: string) => {
    setActiveStones((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  }, []);

  const resetFilters = useCallback(() => {
    setActiveCategory("all");
    setActiveConcerns([]);
    setActiveStones([]);
    setPriceRange([0, 15000]);
    setSortOrder("default");
  }, []);

  const filteredProducts = useMemo(() => {
    let list = dhwaniProducts.filter((p) => {
      if (activeCategory !== "all" && p.category !== activeCategory)
        return false;
      if (
        activeConcerns.length > 0 &&
        !activeConcerns.some((c) => p.concern?.includes(c))
      )
        return false;
      if (activeStones.length > 0 && !activeStones.includes(p.stone ?? ""))
        return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      return true;
    });

    if (sortOrder === "price-asc")
      list = [...list].sort((a, b) => a.price - b.price);
    else if (sortOrder === "price-desc")
      list = [...list].sort((a, b) => b.price - a.price);
    else if (sortOrder === "reviews")
      list = [...list].sort((a, b) => (b.reviews ?? 0) - (a.reviews ?? 0));

    return list;
  }, [activeCategory, activeConcerns, activeStones, priceRange, sortOrder]);

  const scrollToCategory = useCallback((catId: string) => {
    setActiveCategory(catId);
    if (catId !== "all") {
      const el = sectionRefs.current[catId];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);

  // ── products grouped by category (for section rendering) ─────────────────

  const groupedByCategory = useMemo(() => {
    const map: Record<string, DhwaniProduct[]> = {};
    if (
      activeCategory !== "all" ||
      activeConcerns.length > 0 ||
      activeStones.length > 0 ||
      priceRange[1] < 15000
    ) {
      map.filtered = filteredProducts;
      return map;
    }
    for (const p of filteredProducts) {
      if (!map[p.category]) map[p.category] = [];
      map[p.category].push(p);
    }
    return map;
  }, [
    filteredProducts,
    activeCategory,
    activeConcerns,
    activeStones,
    priceRange,
  ]);

  const isFiltered =
    activeCategory !== "all" ||
    activeConcerns.length > 0 ||
    activeStones.length > 0 ||
    priceRange[1] < 15000;

  return (
    <div className="min-h-screen bg-background" data-ocid="dhwani-shop.page">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.35 0.12 25) 0%, oklch(0.25 0.09 22) 40%, oklch(0.20 0.08 20) 100%)",
          }}
        />
        {/* decorative rings */}
        <div
          className="absolute top-[-60px] right-[-60px] w-[320px] h-[320px] rounded-full opacity-10"
          style={{ border: "2px solid oklch(0.78 0.14 75)" }}
        />
        <div
          className="absolute bottom-[-40px] left-[-40px] w-[200px] h-[200px] rounded-full opacity-10"
          style={{ border: "2px solid oklch(0.78 0.14 75)" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6 tracking-widest uppercase"
            style={{
              background: "oklch(0.78 0.14 75 / 0.15)",
              color: "oklch(0.88 0.12 75)",
              border: "1px solid oklch(0.78 0.14 75 / 0.3)",
            }}
          >
            ✦ Abhimantrit & Certified ✦
          </div>
          <h1
            className="font-heading font-bold text-4xl md:text-6xl tracking-wide mb-3 leading-tight"
            style={{ color: "oklch(0.97 0.015 85)" }}
          >
            Spiritual Connect Shop
          </h1>
          <p
            className="font-heading text-lg md:text-xl mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Curated & Energized by Spiritual Connect
          </p>
          <p
            className="font-body text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.82 0.03 80 / 0.85)" }}
          >
            Every product is personally Abhimantrit by Spiritual Connect with
            your Name & DOB — 20+ years expertise in Spiritual Healing,
            Astrology & Gemology
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              "Crystal Malas",
              "Yantras",
              "Rudraksha",
              "Crystal Trees",
              "Healing Pyramids",
            ].map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-full font-medium"
                style={{
                  background: "oklch(0.68 0.2 48 / 0.2)",
                  color: "oklch(0.88 0.12 65)",
                  border: "1px solid oklch(0.68 0.2 48 / 0.3)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SHOP BY CONCERN ── */}
      <section className="bg-card border-b border-border py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-xl mb-5">Shop by Concern</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {dhwaniConcerns.map((c) => (
              <button
                type="button"
                key={c.id}
                data-ocid={`dhwani-shop.concern_card.${c.id}`}
                onClick={() => {
                  toggleConcern(c.id);
                  setActiveCategory("all");
                }}
                className={`rounded-xl border p-3 flex flex-col items-center gap-1.5 text-center transition-all duration-200 hover:scale-105 ${
                  activeConcerns.includes(c.id)
                    ? `ring-2 ring-primary shadow-md ${c.bgColor}`
                    : `${c.bgColor} hover:shadow-sm`
                }`}
              >
                <span className="text-2xl">{c.icon}</span>
                <span
                  className={`text-xs font-semibold leading-tight font-heading ${c.color}`}
                >
                  {c.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── SHOP BY STONE chips ── */}
      <section className="bg-muted/30 border-b border-border py-5 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
            <span
              className="font-heading text-xs font-semibold whitespace-nowrap"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              By Stone:
            </span>
            {dhwaniStones.map((s) => (
              <button
                type="button"
                key={s.id}
                data-ocid={`dhwani-shop.stone_chip.${s.id}`}
                onClick={() => {
                  toggleStone(s.id);
                  setActiveCategory("all");
                }}
                className={`whitespace-nowrap text-xs px-3 py-1.5 rounded-full border font-medium transition-all duration-200 flex-shrink-0 ${
                  activeStones.includes(s.id)
                    ? "border-amber-500 bg-amber-50 text-amber-800"
                    : "border-border bg-card text-muted-foreground hover:border-amber-300 hover:text-foreground"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── STICKY CATEGORY NAV ── */}
      <div
        className="sticky top-0 z-30 bg-card border-b border-border shadow-sm"
        data-ocid="dhwani-shop.category_nav"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={categoryTabsRef}
            className="flex gap-1 overflow-x-auto py-2 scrollbar-none"
          >
            <button
              type="button"
              key="all"
              data-ocid="dhwani-shop.category_tab.all"
              onClick={() => scrollToCategory("all")}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-heading font-semibold transition-all duration-200 ${
                activeCategory === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              All Products
            </button>
            {dhwaniCategories.map((cat) => (
              <button
                type="button"
                key={cat.id}
                data-ocid={`dhwani-shop.category_tab.${cat.id}`}
                onClick={() => scrollToCategory(cat.id)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-heading font-semibold transition-all duration-200 whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Top Bar: count + sort + mobile filter */}
        <div
          className="flex flex-wrap items-center justify-between gap-3 mb-5"
          data-ocid="dhwani-shop.toolbar"
        >
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filteredProducts.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">
              {dhwaniProducts.length}
            </span>{" "}
            products
          </p>
          <div className="flex items-center gap-2">
            {/* Mobile filter trigger */}
            <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  data-ocid="dhwani-shop.mobile_filter_button"
                >
                  <Filter size={14} className="mr-1.5" />
                  Filters
                  {(activeConcerns.length > 0 || activeStones.length > 0) && (
                    <Badge className="ml-1.5 text-[10px] px-1 py-0 h-4">
                      {activeConcerns.length + activeStones.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-5">
                <h2
                  className="font-heading font-bold text-lg mb-4"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  Filters
                </h2>
                <ScrollArea className="h-[calc(100vh-6rem)]">
                  <FilterPanel
                    activeConcerns={activeConcerns}
                    activeStones={activeStones}
                    priceRange={priceRange}
                    onConcernToggle={toggleConcern}
                    onStoneToggle={toggleStone}
                    onPriceChange={setPriceRange}
                    onReset={resetFilters}
                  />
                </ScrollArea>
              </SheetContent>
            </Sheet>

            {/* Sort */}
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger
                className="w-44 h-9 text-xs"
                data-ocid="dhwani-shop.sort_select"
              >
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Best Selling</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="reviews">Most Reviewed</SelectItem>
              </SelectContent>
            </Select>

            {/* Clear */}
            {(activeCategory !== "all" ||
              activeConcerns.length > 0 ||
              activeStones.length > 0 ||
              priceRange[1] < 15000) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-xs"
                data-ocid="dhwani-shop.reset_button"
              >
                <X size={13} className="mr-1" /> Clear
              </Button>
            )}
          </div>
        </div>

        <div className="flex gap-6">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0 self-start sticky top-[3.25rem] max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="bg-card rounded-lg border border-border p-4">
              <FilterPanel
                activeConcerns={activeConcerns}
                activeStones={activeStones}
                priceRange={priceRange}
                onConcernToggle={toggleConcern}
                onStoneToggle={toggleStone}
                onPriceChange={setPriceRange}
                onReset={resetFilters}
              />
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              <div
                data-ocid="dhwani-shop.empty_state"
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <span className="text-6xl mb-4">🔮</span>
                <h3
                  className="font-heading font-bold text-xl mb-2"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  No products found
                </h3>
                <p className="text-muted-foreground text-sm mb-5">
                  Try adjusting your filters or browse all categories.
                </p>
                <Button
                  onClick={resetFilters}
                  data-ocid="dhwani-shop.show_all_button"
                >
                  Show All Products
                </Button>
              </div>
            ) : isFiltered ? (
              /* Flat filtered grid */
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i + 1} />
                ))}
              </div>
            ) : (
              /* Grouped by category */
              <div className="flex flex-col gap-10">
                {dhwaniCategories.map((cat) => {
                  const items = groupedByCategory[cat.id];
                  if (!items || items.length === 0) return null;
                  return (
                    <section
                      key={cat.id}
                      ref={(el) => {
                        sectionRefs.current[cat.id] = el;
                      }}
                      data-ocid={`dhwani-shop.category_section.${cat.id}`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">{cat.icon}</span>
                        <h2
                          className="font-heading font-bold text-lg md:text-xl"
                          style={{ color: "oklch(0.35 0.12 25)" }}
                        >
                          {cat.name}
                        </h2>
                        <span className="text-xs text-muted-foreground font-medium">
                          ({items.length} products)
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                        {items.map((p, i) => (
                          <ProductCard key={p.id} product={p} index={i + 1} />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ── ABOUT DHWANI JAIN ── */}
      <section className="bg-card border-t border-border py-14 px-4 mt-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-2xl mb-8">
            About Spiritual Connect
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Photo placeholder */}
            <div
              className="w-40 h-40 rounded-full flex-shrink-0 flex items-center justify-center mx-auto md:mx-0 border-4"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.78 0.14 75 / 0.2) 0%, oklch(0.68 0.2 48 / 0.1) 100%)",
                borderColor: "oklch(0.78 0.14 75 / 0.4)",
              }}
            >
              <span className="text-5xl">🧘‍♀️</span>
            </div>
            <div className="flex-1">
              <h3
                className="font-heading font-bold text-xl mb-1"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                Spiritual Connect
              </h3>
              <p
                className="font-heading text-sm mb-3"
                style={{ color: "oklch(0.68 0.2 48)" }}
              >
                Founder • Healer • Gemologist • Astrologer
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                With over <strong>20 years of expertise</strong> in Spiritual
                Healing, Astrology & Gemology, Spiritual Connect personally
                curates, energizes, and certifies every product. Unlike
                mass-produced alternatives, each item undergoes genuine
                procurement and ritual energization — making it a powerful
                source of positive energy aligned to your individual Name & DOB.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Once you receive your product, our experts guide you on the
                Shubh Muhurat for use, the mantras to chant, and the cleansing
                process — ensuring you receive maximum spiritual benefit.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="tel:+916366526901"
                  data-ocid="dhwani-shop.contact_phone"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                  style={{
                    background: "oklch(0.68 0.2 48 / 0.1)",
                    color: "oklch(0.55 0.18 40)",
                    border: "1px solid oklch(0.68 0.2 48 / 0.3)",
                  }}
                >
                  <Phone size={14} /> +91-6366526901
                </a>
                <a
                  href="mailto:support@spiritualconnect.app"
                  data-ocid="dhwani-shop.contact_email"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                  style={{
                    background: "oklch(0.68 0.2 48 / 0.1)",
                    color: "oklch(0.55 0.18 40)",
                    border: "1px solid oklch(0.68 0.2 48 / 0.3)",
                  }}
                >
                  <Mail size={14} /> support@spiritualconnect.app
                </a>
              </div>
            </div>
          </div>

          {/* Credential badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { icon: "⭐", label: "20+ Years", sub: "Expertise" },
              { icon: "💎", label: "AAA++ Quality", sub: "Gemstones" },
              { icon: "🙏", label: "Personal", sub: "Abhimantrit" },
              { icon: "🔯", label: "Certified", sub: "Products" },
            ].map((b) => (
              <div
                key={b.label}
                className="rounded-xl border p-4 text-center"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.97 0.015 85) 0%, oklch(0.94 0.025 80) 100%)",
                  borderColor: "oklch(0.78 0.14 75 / 0.3)",
                }}
              >
                <div className="text-2xl mb-1">{b.icon}</div>
                <div
                  className="font-heading font-bold text-sm"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  {b.label}
                </div>
                <div className="text-xs text-muted-foreground">{b.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
