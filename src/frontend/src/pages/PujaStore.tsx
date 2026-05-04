import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  PUJA_STORE_PRODUCTS,
  PUJA_SUB_CATEGORIES,
  type PujaStoreProduct,
  type PujaSubCategory,
} from "@/data/pujaStoreData";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Home, ShoppingBag, ShoppingCart } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "../contexts/LanguageContext";

// ── Sub-category card ────────────────────────────────────────────
function SubCategoryCard({
  cat,
  isActive,
  onClick,
}: {
  cat: PujaSubCategory;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      data-ocid={`puja-store.subcategory.${cat.id}`}
      onClick={onClick}
      className={[
        "flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-200 text-center cursor-pointer",
        isActive
          ? "border-primary bg-primary/10 shadow-md"
          : "border-border bg-card hover:border-primary/50 hover:bg-primary/5",
      ].join(" ")}
    >
      <span className="text-2xl">{cat.iconEmoji}</span>
      <span
        className={`font-heading font-bold text-xs leading-tight ${
          isActive ? "text-primary" : "text-foreground"
        }`}
      >
        {cat.name}
      </span>
      <span className="text-[10px] font-devanagari text-muted-foreground leading-tight">
        {cat.nameHindi}
      </span>
      <Badge variant="secondary" className="text-[9px] px-1 py-0 mt-0.5 h-4">
        {cat.productCount}
      </Badge>
    </button>
  );
}

// ── Product card ───────────────────────────────────────────────
function ProductCard({
  product,
  index,
}: {
  product: PujaStoreProduct;
  index: number;
}) {
  const hasDiscount = product.mrp !== undefined && product.mrp > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.mrp! - product.price) / product.mrp!) * 100)
    : 0;

  function handleAddToCart() {
    toast.success(`${product.name} added to cart!`, {
      description: `₹${product.price.toLocaleString("en-IN")}`,
      duration: 3000,
    });
  }

  return (
    <div
      data-ocid={`puja-store.product.item.${index + 1}`}
      className="temple-card flex flex-col h-full group"
    >
      {/* Image area */}
      <div
        className="relative overflow-hidden bg-muted/30"
        style={{ aspectRatio: "1" }}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const t = e.currentTarget;
            t.style.display = "none";
            const parent = t.parentElement;
            if (parent && !parent.querySelector(".fallback-emoji")) {
              const em = document.createElement("div");
              em.className =
                "fallback-emoji absolute inset-0 flex items-center justify-center text-5xl bg-muted/30";
              em.textContent = "🪔";
              parent.appendChild(em);
            }
          }}
        />
        {/* Product code */}
        <div className="absolute top-2 left-2">
          <span className="inline-block bg-card/90 border border-primary/30 text-primary text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full shadow-sm">
            {product.productCode}
          </span>
        </div>
        {/* Discount */}
        {hasDiscount && (
          <div className="absolute top-2 right-2">
            <span className="inline-block bg-primary text-primary-foreground text-[9px] font-bold px-1.5 py-0.5 rounded-full">
              {discountPct}% OFF
            </span>
          </div>
        )}
        {/* Out of stock */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
            <span className="text-xs font-heading font-bold text-muted-foreground uppercase tracking-wider border border-border rounded-full px-3 py-1 bg-card">
              Out of Stock
            </span>
          </div>
        )}
        {/* Personalised */}
        {product.isPersonalised && (
          <div className="absolute bottom-2 left-2">
            <span
              className="inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{
                background: "oklch(0.78 0.14 75 / 0.18)",
                color: "oklch(0.45 0.14 60)",
                border: "1px solid oklch(0.78 0.14 75 / 0.35)",
              }}
            >
              Personalised
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3 gap-1.5">
        <p className="product-title text-sm leading-snug line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </p>
        {product.nameHindi && (
          <p className="text-[10px] font-devanagari text-muted-foreground leading-tight line-clamp-1">
            {product.nameHindi}
          </p>
        )}
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
          {product.description}
        </p>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="product-price text-base">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through">
              ₹{product.mrp!.toLocaleString("en-IN")}
            </span>
          )}
        </div>
        <Button
          data-ocid={`puja-store.product.add_button.${index + 1}`}
          size="sm"
          className="btn-spiritual w-full mt-1 text-xs h-8 gap-1 rounded-lg"
          disabled={!product.inStock}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-3 h-3" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </div>
  );
}

// ── Main page ───────────────────────────────────────────────
export default function PujaStore() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState<number>(200000);
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredProducts = useMemo<PujaStoreProduct[]>(() => {
    return PUJA_STORE_PRODUCTS.filter((p) => {
      if (selectedCategory && p.subCategoryId !== selectedCategory)
        return false;
      if (inStockOnly && !p.inStock) return false;
      if (p.price > maxPrice) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          (p.nameHindi ?? "").toLowerCase().includes(q) ||
          p.productCode.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCategory, inStockOnly, maxPrice, searchQuery]);

  const activeCatName = selectedCategory
    ? PUJA_SUB_CATEGORIES.find((c) => c.id === selectedCategory)?.name
    : null;

  function handleCategoryClick(id: string) {
    setSelectedCategory((prev) => (prev === id ? null : id));
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ── Banner ───────────────────────────────────────────── */}
      <div className="spiritual-gradient py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-1 text-xs mb-4 text-primary-foreground/70">
            <Link
              to="/"
              className="hover:text-primary-foreground flex items-center gap-1 transition-colors"
            >
              <Home className="w-3 h-3" />
              {t("home")}
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary-foreground font-semibold">
              Puja Store
            </span>
          </nav>
          <div className="flex items-center gap-3 mb-1">
            <ShoppingBag className="w-8 h-8 text-accent" />
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground">
              Puja Samagri Store
            </h1>
          </div>
          <p className="font-devanagari text-xl text-primary-foreground/80 mb-1">
            पूजा सामग्री स्टोर
          </p>
          <p className="text-primary-foreground/70 text-sm max-w-xl">
            Pure and authentic puja essentials — handpicked for your daily
            worship and special rituals.
          </p>
        </div>
      </div>

      {/* ── Sub-Category Grid ─────────────────────────────────── */}
      <div className="bg-muted/30 border-b border-border py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-3">
            {t("browseByCategory")}
          </p>
          <div
            data-ocid="puja-store.subcategory.list"
            className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2"
          >
            {PUJA_SUB_CATEGORIES.map((cat) => (
              <SubCategoryCard
                key={cat.id}
                cat={cat}
                isActive={selectedCategory === cat.id}
                onClick={() => handleCategoryClick(cat.id)}
              />
            ))}
          </div>
          {selectedCategory && (
            <button
              type="button"
              data-ocid="puja-store.clear_filter_button"
              onClick={() => setSelectedCategory(null)}
              className="mt-3 text-xs font-medium text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
            >
              {t("clearCategoryFilter")}
            </button>
          )}
        </div>
      </div>

      {/* ── Filter Bar ─────────────────────────────────────── */}
      <div className="bg-card border-b border-border py-4 px-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[180px] max-w-xs">
            <Input
              data-ocid="puja-store.search_input"
              placeholder={t("searchProducts")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-xs text-muted-foreground whitespace-nowrap">
              {t("maxPrice")}
            </Label>
            <select
              data-ocid="puja-store.price_filter_select"
              value="200000"
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="h-9 text-sm border border-input rounded-md px-2 bg-background cursor-pointer"
            >
              {[500, 1000, 2000, 5000, 10000, 25000, 200000].map((v) => (
                <option key={v} value={v}>
                  ₹{v.toLocaleString("en-IN")}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              data-ocid="puja-store.in_stock_toggle"
              id="in-stock"
              checked={inStockOnly}
              onCheckedChange={setInStockOnly}
            />
            <Label htmlFor="in-stock" className="text-xs cursor-pointer">
              {t("inStockOnly")}
            </Label>
          </div>
          <div className="ml-auto text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">
              {filteredProducts.length}
            </span>{" "}
            {t("products")}
            {activeCatName && (
              <span className="ml-1">
                in{" "}
                <span className="text-primary font-medium">
                  {activeCatName}
                </span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Product Grid ─────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {filteredProducts.length === 0 ? (
          <div data-ocid="puja-store.empty_state" className="text-center py-20">
            <p className="text-5xl mb-4">🪔</p>
            <p className="font-heading text-xl font-bold text-foreground mb-2">
              {t("noProductsFound")}
            </p>
            <p className="text-muted-foreground text-sm mb-6">
              {t("tryAdjustFilters")}
            </p>
            <Button
              data-ocid="puja-store.empty_state.reset_button"
              variant="outline"
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery("");
                setMaxPrice(200000);
                setInStockOnly(false);
              }}
            >
              {t("resetFilters")}
            </Button>
          </div>
        ) : (
          <div
            data-ocid="puja-store.product.list"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {filteredProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
