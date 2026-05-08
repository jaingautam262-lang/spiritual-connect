import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  type EtchcraftCategory,
  type EtchcraftCollection,
  type EtchcraftProduct,
  collectionLabels,
  etchcraftProducts,
  etchcraftTestimonials,
} from "../data/etchcraftEmporiumData";
import { useCartStore } from "../stores/cartStore";

type Lang = "en" | "hi";
type SortKey = "best" | "new" | "asc" | "desc";
type PriceRange = "all" | "under500" | "500to1500" | "1500to3000" | "above3000";

const CATEGORIES: EtchcraftCategory[] = [
  "Bracelet",
  "Necklace",
  "Ring",
  "Earring",
  "Anklet",
  "Pen",
  "Diary",
];

function emi(price: number) {
  return Math.ceil(price / 12);
}

function StarRow({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  return (
    <span className="flex items-center gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          size={11}
          className={
            i < full
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground/30"
          }
        />
      ))}
      <span className="ml-1 text-xs text-muted-foreground">{rating}</span>
    </span>
  );
}

function ProductCard({
  product,
  lang,
}: {
  product: EtchcraftProduct;
  lang: Lang;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const discount = Math.round(
    ((product.mrp - product.price) / product.mrp) * 100,
  );

  return (
    <div
      data-ocid={`etchcraft.item.${product.id}`}
      className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
    >
      {/* Product image placeholder */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 h-36 flex items-center justify-center relative">
        <span className="text-4xl">
          {product.category === "Bracelet"
            ? "📿"
            : product.category === "Necklace"
              ? "🔮"
              : product.category === "Ring"
                ? "💍"
                : product.category === "Earring"
                  ? "💎"
                  : product.category === "Anklet"
                    ? "✨"
                    : product.category === "Pen"
                      ? "🖊️"
                      : "📒"}
        </span>
        {product.badge && (
          <Badge className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] px-1.5">
            {product.badge}
          </Badge>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <span className="text-xs font-semibold text-muted-foreground">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col flex-1 gap-1">
        {/* Collection badge */}
        <span className="text-[10px] uppercase tracking-wide text-amber-600 font-semibold">
          {collectionLabels[product.collection].en}
        </span>

        {/* Name */}
        <h3 className="text-sm font-semibold text-foreground leading-tight line-clamp-2">
          {lang === "hi" ? product.nameHindi : product.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Stars */}
        <StarRow rating={product.rating} />

        {/* Price */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-foreground text-sm">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <span className="text-xs text-muted-foreground line-through">
            ₹{product.mrp.toLocaleString("en-IN")}
          </span>
          {discount > 0 && (
            <Badge variant="secondary" className="text-[10px] px-1">
              {discount}% OFF
            </Badge>
          )}
        </div>

        {/* EMI badge */}
        {product.price >= 499 && (
          <span className="text-[10px] text-amber-700 font-medium">
            or ₹{emi(product.price)}/Month | Buy on EMI &gt;
          </span>
        )}

        {/* Mantra (for mantra collection) */}
        {product.mantraText && (
          <p className="text-[10px] text-amber-800 italic bg-amber-50 rounded p-1 line-clamp-2">
            {product.mantraText}
          </p>
        )}

        <Button
          type="button"
          size="sm"
          className="mt-auto w-full bg-amber-600 hover:bg-amber-700 text-white text-xs"
          disabled={!product.inStock}
          onClick={handleAdd}
          data-ocid={`etchcraft.add_button.${product.id}`}
        >
          <ShoppingCart size={12} className="mr-1" />
          {lang === "hi" ? "कार्ट में जोड़ें" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}

export default function EtchcraftEmporium() {
  const [lang, setLang] = useState<Lang>("en");
  const [activeTab, setActiveTab] = useState<EtchcraftCollection>("mens");
  const [filterCategory, setFilterCategory] = useState<
    EtchcraftCategory | "all"
  >("all");
  const [filterPrice, setFilterPrice] = useState<PriceRange>("all");
  const [filterInStock, setFilterInStock] = useState(false);
  const [sort, setSort] = useState<SortKey>("best");

  const filteredProducts = useMemo(() => {
    let list = etchcraftProducts.filter((p) => p.collection === activeTab);
    if (filterCategory !== "all")
      list = list.filter((p) => p.category === filterCategory);
    if (filterInStock) list = list.filter((p) => p.inStock);
    if (filterPrice === "under500") list = list.filter((p) => p.price < 500);
    else if (filterPrice === "500to1500")
      list = list.filter((p) => p.price >= 500 && p.price <= 1500);
    else if (filterPrice === "1500to3000")
      list = list.filter((p) => p.price > 1500 && p.price <= 3000);
    else if (filterPrice === "above3000")
      list = list.filter((p) => p.price > 3000);
    if (sort === "asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "desc")
      list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "best")
      list = [...list].sort((a, b) => (b.reviews ?? 0) - (a.reviews ?? 0));
    return list;
  }, [activeTab, filterCategory, filterPrice, filterInStock, sort]);

  const officeProducts = etchcraftProducts.filter((p) => p.isOfficeProduct);
  const mantraProducts = etchcraftProducts.filter(
    (p) => p.collection === "mantra-jewellery",
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-900 via-orange-800 to-amber-700 text-white py-14 px-4 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <Badge className="bg-amber-400/20 text-amber-200 border border-amber-400/30 mb-3">
            🪷 Premium Crystal &amp; Spiritual Jewellery
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Etchcraft Emporium
          </h1>
          <p className="text-amber-200 text-xl mb-1">
            Spirituality Meets Style
          </p>
          <p className="text-amber-300 text-base">
            {lang === "hi"
              ? "अध्यात्म और स्टाइल का अनोखा संगम"
              : "269 Handcrafted Crystal & Sacred Jewellery Pieces"}
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              type="button"
              onClick={() => setLang("en")}
              data-ocid="etchcraft.lang_toggle"
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                lang === "en"
                  ? "bg-white text-amber-800"
                  : "border border-white/50 text-white hover:bg-white/10"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang("hi")}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                lang === "hi"
                  ? "bg-white text-amber-800"
                  : "border border-white/50 text-white hover:bg-white/10"
              }`}
            >
              हिं
            </button>
          </div>
        </div>
      </div>

      {/* Collection tabs */}
      <div className="bg-card border-b border-border shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto flex gap-1 py-2">
          {(Object.keys(collectionLabels) as EtchcraftCollection[]).map(
            (col) => {
              const info = collectionLabels[col];
              return (
                <button
                  key={col}
                  type="button"
                  data-ocid={`etchcraft.tab.${col}`}
                  onClick={() => setActiveTab(col)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === col
                      ? "bg-amber-600 text-white shadow"
                      : "border border-border text-foreground hover:bg-muted"
                  }`}
                >
                  <span>{info.emoji}</span>
                  <span className="whitespace-nowrap">
                    {lang === "hi" ? info.hi : info.en}
                  </span>
                  <Badge variant="secondary" className="text-[10px] px-1 ml-1">
                    {info.count}
                  </Badge>
                </button>
              );
            },
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters + Sort */}
        <div className="flex flex-wrap gap-3 items-center mb-6 bg-muted/40 rounded-xl p-3">
          <Select
            value={filterCategory}
            onValueChange={(v) =>
              setFilterCategory(v as EtchcraftCategory | "all")
            }
          >
            <SelectTrigger
              className="w-40 h-8 text-xs"
              data-ocid="etchcraft.category_filter"
            >
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filterPrice}
            onValueChange={(v) => setFilterPrice(v as PriceRange)}
          >
            <SelectTrigger
              className="w-44 h-8 text-xs"
              data-ocid="etchcraft.price_filter"
            >
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="under500">Under ₹500</SelectItem>
              <SelectItem value="500to1500">₹500 – ₹1,500</SelectItem>
              <SelectItem value="1500to3000">₹1,500 – ₹3,000</SelectItem>
              <SelectItem value="above3000">Above ₹3,000</SelectItem>
            </SelectContent>
          </Select>

          <label className="flex items-center gap-1.5 text-xs cursor-pointer">
            <input
              type="checkbox"
              className="accent-amber-600"
              checked={filterInStock}
              onChange={(e) => setFilterInStock(e.target.checked)}
              data-ocid="etchcraft.instock_filter"
            />
            {lang === "hi" ? "स्टॉक में है" : "In Stock Only"}
          </label>

          <div className="ml-auto">
            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger
                className="w-40 h-8 text-xs"
                data-ocid="etchcraft.sort_select"
              >
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="best">Best Selling</SelectItem>
                <SelectItem value="new">New Arrivals</SelectItem>
                <SelectItem value="asc">Price: Low to High</SelectItem>
                <SelectItem value="desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <span className="text-xs text-muted-foreground">
            {filteredProducts.length} {lang === "hi" ? "उत्पाद" : "products"}
          </span>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div
            data-ocid="etchcraft.list"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} lang={lang} />
            ))}
          </div>
        ) : (
          <div
            data-ocid="etchcraft.empty_state"
            className="text-center py-16 text-muted-foreground"
          >
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-semibold">No products match your filters</p>
            <p className="text-sm mt-1">
              Try adjusting the category or price range
            </p>
          </div>
        )}

        {/* Office by Etchcraft special section */}
        {activeTab === "office" && (
          <div className="mt-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-1">🖊️ Office by Etchcraft</h2>
            <p className="text-slate-300 text-sm mb-5">
              Elevate your workspace with crystal energy. Pen + Diary combos
              that inspire.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {officeProducts
                .filter((p) => p.category === "Pen")
                .map((p) => (
                  <div
                    key={p.id}
                    className="bg-white/10 rounded-xl p-3 text-center"
                  >
                    <p className="text-3xl mb-1">🖊️</p>
                    <p className="text-xs font-semibold line-clamp-2">
                      {lang === "hi" ? p.nameHindi : p.name}
                    </p>
                    <p className="text-amber-300 text-sm font-bold mt-1">
                      ₹{p.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Mantra Jewellery spotlight */}
        {activeTab === "mantra-jewellery" && mantraProducts.length > 0 && (
          <div className="mt-8 space-y-4">
            <Separator />
            <h2 className="text-xl font-bold text-amber-700">
              📿 Mantra Jewellery — Sacred Inscriptions
            </h2>
            <p className="text-sm text-muted-foreground">
              Each piece is inscribed with a powerful mantra for constant divine
              connection.
            </p>
            <div className="grid gap-3">
              {mantraProducts
                .filter((p) => p.mantraText)
                .map((p) => (
                  <div
                    key={p.id}
                    className="border border-amber-200 bg-amber-50/50 rounded-xl p-4 flex gap-4 items-start"
                  >
                    <span className="text-3xl">📿</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm">
                        {lang === "hi" ? p.nameHindi : p.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {p.description}
                      </p>
                      <p className="mt-1 text-amber-800 italic text-sm font-medium">
                        {p.mantraText}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="font-bold text-foreground">
                          ₹{p.price.toLocaleString("en-IN")}
                        </span>
                        <span className="text-xs text-muted-foreground line-through">
                          ₹{p.mrp.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Testimonials */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-foreground mb-4">
            ⭐ Customer Love
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {etchcraftTestimonials.map((t, i) => (
              <div
                key={t.name}
                data-ocid={`etchcraft.review.item.${i + 1}`}
                className="bg-card border border-border rounded-xl p-4"
              >
                <div className="flex items-center gap-1 mb-2">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star
                      key={s}
                      size={12}
                      className={
                        s < t.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground/30"
                      }
                    />
                  ))}
                </div>
                <p className="text-sm text-foreground italic mb-2">
                  "{t.review}"
                </p>
                <p className="text-xs text-muted-foreground font-medium">
                  {t.name}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {t.product} · {t.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="bg-amber-950 text-white mt-8 py-6 px-4 text-center">
        <p className="text-amber-300 font-semibold mb-1">
          Dhwani Astro × Etchcraft Emporium
        </p>
        <p className="text-sm text-amber-200">
          Free returns within 7 days · 100% Authentic Stones · Pan-India
          Delivery
        </p>
        <p className="text-xs text-amber-300/70 mt-1">
          Support: +91 99999 00000 · etchcraft@dhwaniastro.com
        </p>
      </div>
    </div>
  );
}
