import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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
import { Link } from "@tanstack/react-router";
import { Filter, ShoppingCart, Star, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  KARTIK_CATEGORIES,
  KARTIK_PRODUCTS,
  type KartikProduct,
} from "../data/kartikJewelsData";
import { useCartStore } from "../stores/cartStore";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}

function StarRating({ rating }: { rating: number }) {
  if (rating === 0) return null;
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={`star-${i}`}
          size={11}
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

function KartikProductCard({
  product,
  index,
}: {
  product: KartikProduct;
  index: number;
}) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = useCallback(() => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.salePrice,
      category: product.category,
    });
    toast.success("Added to cart!", {
      description: `${product.name} — ${formatPrice(product.salePrice)}`,
      duration: 2500,
    });
  }, [addItem, product]);

  return (
    <Link
      to="/kartik-shop/$id"
      params={{ id: product.id }}
      data-ocid={`kartik-shop.product.${index}`}
      className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
    >
      {/* Image placeholder */}
      <div
        className="relative overflow-hidden aspect-square flex-shrink-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.97 0.025 75) 0%, oklch(0.93 0.05 55) 100%)",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
          <span className="text-4xl mb-1 opacity-70">🙏</span>
          <span className="text-xs text-muted-foreground px-2 text-center leading-tight">
            {product.category}
          </span>
        </div>
        {/* Discount badge */}
        {product.discountPercent > 0 && (
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500 text-white leading-none">
              -{product.discountPercent}%
            </span>
          </div>
        )}
        {/* Special badge */}
        {product.badge && (
          <div className="absolute top-2 left-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500 text-white leading-none max-w-[80px] text-center leading-tight">
              {product.badge}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3 gap-1.5">
        <h3
          className="font-semibold text-sm leading-tight line-clamp-2 min-h-[2.5rem]"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating > 0 && (
          <div className="flex items-center gap-1.5">
            <StarRating rating={product.rating} />
            {product.reviewCount > 0 && (
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount})
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto pt-1">
          <span
            className="font-bold text-base"
            style={{ color: "oklch(0.60 0.18 42)" }}
          >
            {formatPrice(product.salePrice)}
          </span>
          {product.regularPrice > product.salePrice && (
            <span className="text-xs line-through text-muted-foreground">
              {formatPrice(product.regularPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <Button
          size="sm"
          data-ocid={`kartik-shop.add_button.${index}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToCart();
          }}
          className="w-full text-xs h-8 mt-1 transition-opacity hover:opacity-90"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.2 48) 0%, oklch(0.60 0.18 38) 100%)",
            color: "white",
            border: "none",
          }}
        >
          <ShoppingCart size={13} className="mr-1.5" />
          Add to Cart
        </Button>
      </div>
    </Link>
  );
}

// ─── Filter Panel ─────────────────────────────────────────────────────────────

interface FilterPanelProps {
  showInStock: boolean;
  showOutOfStock: boolean;
  minPrice: number;
  maxPrice: number;
  onInStockChange: (v: boolean) => void;
  onOutOfStockChange: (v: boolean) => void;
  onMinPriceChange: (v: number) => void;
  onMaxPriceChange: (v: number) => void;
  onReset: () => void;
  hasFilters: boolean;
}

function FilterPanel({
  showInStock,
  showOutOfStock,
  minPrice,
  maxPrice,
  onInStockChange,
  onOutOfStockChange,
  onMinPriceChange,
  onMaxPriceChange,
  onReset,
  hasFilters,
}: FilterPanelProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2
          className="font-bold text-base"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          Filters
        </h2>
        {hasFilters && (
          <button
            type="button"
            onClick={onReset}
            data-ocid="kartik-shop.clear_filters"
            className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
          >
            <X size={12} /> Clear all
          </button>
        )}
      </div>

      {/* Availability */}
      <div>
        <p
          className="text-sm font-semibold mb-3"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          Availability
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="in-stock"
              checked={showInStock}
              onCheckedChange={(v) => onInStockChange(Boolean(v))}
              data-ocid="kartik-shop.filter_in_stock"
            />
            <Label htmlFor="in-stock" className="text-xs cursor-pointer">
              In Stock
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="out-of-stock"
              checked={showOutOfStock}
              onCheckedChange={(v) => onOutOfStockChange(Boolean(v))}
              data-ocid="kartik-shop.filter_out_of_stock"
            />
            <Label htmlFor="out-of-stock" className="text-xs cursor-pointer">
              Out of Stock
            </Label>
          </div>
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <p
          className="text-sm font-semibold mb-3"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          Price Range
        </p>
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-1 flex-1">
            <Label
              htmlFor="min-price"
              className="text-xs text-muted-foreground"
            >
              Min (₹)
            </Label>
            <Input
              id="min-price"
              type="number"
              min={0}
              value={minPrice}
              onChange={(e) => onMinPriceChange(Number(e.target.value))}
              className="h-8 text-xs"
              data-ocid="kartik-shop.min_price_input"
            />
          </div>
          <span className="text-muted-foreground mt-4">–</span>
          <div className="flex flex-col gap-1 flex-1">
            <Label
              htmlFor="max-price"
              className="text-xs text-muted-foreground"
            >
              Max (₹)
            </Label>
            <Input
              id="max-price"
              type="number"
              min={0}
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(Number(e.target.value))}
              className="h-8 text-xs"
              data-ocid="kartik-shop.max_price_input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function KartikJewelsShop() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("best-selling");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [showInStock, setShowInStock] = useState<boolean>(true);
  const [showOutOfStock, setShowOutOfStock] = useState<boolean>(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const resetFilters = useCallback(() => {
    setActiveCategory("All");
    setSortBy("best-selling");
    setMinPrice(0);
    setMaxPrice(2000);
    setShowInStock(true);
    setShowOutOfStock(true);
  }, []);

  const hasFilters =
    activeCategory !== "All" ||
    sortBy !== "best-selling" ||
    minPrice > 0 ||
    maxPrice < 2000 ||
    !showInStock ||
    !showOutOfStock;

  const filteredProducts = useMemo(() => {
    let list = KARTIK_PRODUCTS.filter((p) => {
      if (activeCategory !== "All" && p.category !== activeCategory)
        return false;
      if (!showInStock && p.inStock) return false;
      if (!showOutOfStock && !p.inStock) return false;
      if (p.salePrice < minPrice || p.salePrice > maxPrice) return false;
      return true;
    });

    if (sortBy === "price-asc")
      list = [...list].sort((a, b) => a.salePrice - b.salePrice);
    else if (sortBy === "price-desc")
      list = [...list].sort((a, b) => b.salePrice - a.salePrice);
    else if (sortBy === "discount-desc")
      list = [...list].sort((a, b) => b.discountPercent - a.discountPercent);

    return list;
  }, [activeCategory, sortBy, minPrice, maxPrice, showInStock, showOutOfStock]);

  const filterPanelProps: FilterPanelProps = {
    showInStock,
    showOutOfStock,
    minPrice,
    maxPrice,
    onInStockChange: setShowInStock,
    onOutOfStockChange: setShowOutOfStock,
    onMinPriceChange: setMinPrice,
    onMaxPriceChange: setMaxPrice,
    onReset: resetFilters,
    hasFilters,
  };

  return (
    <div className="min-h-screen bg-background" data-ocid="kartik-shop.page">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden py-14 md:py-20">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.35 0.12 25) 0%, oklch(0.28 0.10 22) 50%, oklch(0.22 0.08 20) 100%)",
          }}
        />
        <div
          className="absolute top-[-50px] right-[-50px] w-[280px] h-[280px] rounded-full opacity-10"
          style={{ border: "2px solid oklch(0.78 0.14 75)" }}
        />
        <div
          className="absolute bottom-[-30px] left-[-30px] w-[180px] h-[180px] rounded-full opacity-10"
          style={{ border: "2px solid oklch(0.78 0.14 75)" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-5 tracking-widest uppercase"
            style={{
              background: "oklch(0.78 0.14 75 / 0.15)",
              color: "oklch(0.88 0.12 75)",
              border: "1px solid oklch(0.78 0.14 75 / 0.3)",
            }}
          >
            ✦ Lab Certified & Energized ✦
          </div>
          <h1
            className="font-bold text-4xl md:text-5xl tracking-wide mb-3 leading-tight"
            style={{ color: "oklch(0.97 0.015 85)" }}
          >
            KartikJewels Collection
          </h1>
          <p
            className="text-lg md:text-xl mb-6"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Spiritual Jewelry & Sacred Items
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Bracelets", "Karungali", "Pendants", "Malas", "Anklets"].map(
              (tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => setActiveCategory(tag)}
                  className="text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-200 hover:scale-105"
                  style={{
                    background: "oklch(0.68 0.2 48 / 0.2)",
                    color: "oklch(0.90 0.10 65)",
                    border: "1px solid oklch(0.68 0.2 48 / 0.3)",
                  }}
                >
                  {tag}
                </button>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── CATEGORY TABS ── */}
      <div
        className="sticky top-0 z-30 bg-card border-b border-border shadow-sm"
        data-ocid="kartik-shop.category_nav"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-none">
            {KARTIK_CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat}
                data-ocid={`kartik-shop.category_tab.${cat.toLowerCase()}`}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                  activeCategory === cat
                    ? "text-white"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
                style={
                  activeCategory === cat
                    ? {
                        background:
                          "linear-gradient(135deg, oklch(0.68 0.2 48) 0%, oklch(0.60 0.18 38) 100%)",
                      }
                    : {}
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Top Bar */}
        <div
          className="flex flex-wrap items-center justify-between gap-3 mb-5"
          data-ocid="kartik-shop.toolbar"
        >
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {filteredProducts.length}
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
                  data-ocid="kartik-shop.mobile_filter_button"
                >
                  <Filter size={14} className="mr-1.5" />
                  Filters
                  {hasFilters && (
                    <Badge className="ml-1.5 text-[10px] px-1 py-0 h-4">
                      !
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-5">
                <h2
                  className="font-bold text-lg mb-4"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  Filters
                </h2>
                <ScrollArea className="h-[calc(100vh-6rem)]">
                  <FilterPanel {...filterPanelProps} />
                </ScrollArea>
              </SheetContent>
            </Sheet>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger
                className="w-48 h-9 text-xs"
                data-ocid="kartik-shop.sort_select"
              >
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="best-selling">Best Selling</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="discount-desc">
                  Discount: High to Low
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Clear */}
            {hasFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-xs"
                data-ocid="kartik-shop.reset_button"
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
              <FilterPanel {...filterPanelProps} />
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              <div
                data-ocid="kartik-shop.empty_state"
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <span className="text-6xl mb-4">🙏</span>
                <h3
                  className="font-bold text-xl mb-2"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  No products found
                </h3>
                <p className="text-muted-foreground text-sm mb-5">
                  Try adjusting your filters or browse all categories.
                </p>
                <Button
                  onClick={resetFilters}
                  data-ocid="kartik-shop.show_all_button"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.2 48) 0%, oklch(0.60 0.18 38) 100%)",
                    color: "white",
                    border: "none",
                  }}
                >
                  Show All Products
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((p, i) => (
                  <KartikProductCard key={p.id} product={p} index={i + 1} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ── TRUST BADGES ── */}
      <section className="bg-card border-t border-border py-10 px-4 mt-8">
        <div className="max-w-4xl mx-auto">
          <h2
            className="font-bold text-xl text-center mb-7"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            Why Choose KartikJewels
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "🔬", label: "Lab Certified", sub: "Authentic Products" },
              { icon: "🙏", label: "Energized", sub: "By Expert Priests" },
              { icon: "⭐", label: "50,000+", sub: "Happy Customers" },
              { icon: "🚚", label: "Free Shipping", sub: "Pan India" },
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
                  className="font-bold text-sm"
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
