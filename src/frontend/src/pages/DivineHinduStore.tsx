import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, ShoppingCart, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  type DivineHinduProduct,
  cashbackSteps,
  divineHinduBestSellers,
  divineHinduCollections,
  divineHinduReviews,
} from "../data/divineHinduStoreData";
import { useCartStore } from "../stores/cartStore";

type Lang = "en" | "hi";
type ActiveAccordion = number | null;

function CashbackBadge() {
  return (
    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
      💰 100% Cashback
    </span>
  );
}

function EMIBadge({ price }: { price: number }) {
  const monthly = Math.ceil(price / 12);
  return (
    <span className="text-[10px] text-amber-700 font-medium">
      or ₹{monthly}/Month | Buy on EMI &gt;
    </span>
  );
}

function ProductCard({
  product,
  lang,
  index,
}: {
  product: DivineHinduProduct;
  lang: Lang;
  index: number;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const discount = Math.round(
    ((product.mrp - product.price) / product.mrp) * 100,
  );

  const categoryEmoji: Record<string, string> = {
    "Stone Bracelet": "📿",
    "Rashi Bracelet": "♋",
    "Rashi Combo": "⭐",
    Karungali: "🌑",
    "Jaap Mala": "📿",
    "Spiritual Jewellery": "💎",
    Idol: "🪔",
    Combo: "🎁",
    Pendant: "🔮",
    Anklet: "✨",
  };

  return (
    <div
      data-ocid={`divine-hindu.item.${index}`}
      className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
    >
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 h-32 flex items-center justify-center relative">
        <span className="text-4xl">
          {categoryEmoji[product.category] ?? "🙏"}
        </span>
        {product.badge && (
          <Badge className="absolute top-2 left-2 bg-amber-500 text-white text-[9px] px-1.5">
            {product.badge}
          </Badge>
        )}
        {product.cashback && (
          <div className="absolute top-2 right-2">
            <CashbackBadge />
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col flex-1 gap-1">
        <span className="text-[10px] text-amber-600 font-medium">
          {product.category}
        </span>
        <h3 className="text-sm font-semibold text-foreground leading-tight line-clamp-2">
          {lang === "hi" ? product.nameHindi : product.name}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2 flex-1">
          {product.description}
        </p>
        <div className="flex items-center gap-0.5">
          {[0, 1, 2, 3, 4].map((s) => (
            <Star
              key={s}
              size={10}
              className={
                s < Math.floor(product.rating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-muted-foreground/30"
              }
            />
          ))}
          <span className="text-[10px] text-muted-foreground ml-1">
            {product.rating} ({product.reviews})
          </span>
        </div>
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
        {product.price >= 499 && <EMIBadge price={product.price} />}
        {product.cashback && (
          <p className="text-[10px] text-green-700 font-semibold">
            ✅ Get ₹{product.cashbackAmount?.toLocaleString("en-IN")} back in
            Divine Wallet
          </p>
        )}
        <Button
          type="button"
          size="sm"
          className="mt-auto w-full bg-amber-600 hover:bg-amber-700 text-white text-xs"
          data-ocid={`divine-hindu.add_button.${index}`}
          onClick={() => {
            addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              category: product.category,
            });
            toast.success(`${product.name} added to cart!`);
          }}
        >
          <ShoppingCart size={12} className="mr-1" />
          {lang === "hi" ? "कार्ट में जोड़ें" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}

export default function DivineHinduStore() {
  const [lang, setLang] = useState<Lang>("en");
  const [openAccordion, setOpenAccordion] = useState<ActiveAccordion>(null);
  const [sortBy, setSortBy] = useState("best");

  const sortedProducts = useMemo(() => {
    const arr = [...divineHinduBestSellers];
    if (sortBy === "asc") return arr.sort((a, b) => a.price - b.price);
    if (sortBy === "desc") return arr.sort((a, b) => b.price - a.price);
    if (sortBy === "cashback")
      return arr.sort((a, b) => (b.cashback ? 1 : 0) - (a.cashback ? 1 : 0));
    return arr.sort(
      (a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0),
    );
  }, [sortBy]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero with Cashback Banner */}
      <div className="bg-gradient-to-br from-yellow-700 via-amber-600 to-yellow-500 text-white py-14 px-4 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <Badge className="bg-white/20 text-yellow-100 border border-white/30 mb-3">
            💰 India's First 100% Cashback Spiritual Store
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {lang === "hi" ? "डिवाइन हिन्दू स्टोर" : "Divine Hindu"}
          </h1>
          <p className="text-yellow-100 text-xl mb-1">
            {lang === "hi"
              ? "डिवाइन वॉलेट में 100% कैशबैक पाएं"
              : "Get 100% Cashback in Your Divine Wallet"}
          </p>
          <p className="text-yellow-200/80 text-sm mb-5">
            {lang === "hi"
              ? "असली रुद्राक्ष | करुंगाली | पायराइट | आध्यात्मिक आभूषण"
              : "Authentic Rudraksha · Karungali · Pyrite · Spiritual Jewellery"}
          </p>
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setLang("en")}
              data-ocid="divine-hindu.lang_toggle"
              className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
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
              className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
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

      {/* Mother's Day Banner */}
      <div className="bg-pink-600 text-white text-center py-2 px-4 text-sm font-medium">
        🌸 Mother's Day Special — Gift your mother a divine combo! Use code{" "}
        <strong>MOM20</strong> for 20% OFF
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-14">
        {/* How Cashback Works */}
        <section data-ocid="divine-hindu.cashback.section">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {lang === "hi" ? "कैशबैक कैसे काम करता है?" : "How Our Cashback Works"}
          </h2>
          <p className="text-sm text-muted-foreground mb-5">
            {lang === "hi"
              ? "4 सरल चरण"
              : "4 simple steps to earn 100% cashback"}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cashbackSteps.map((step, i) => (
              <button
                key={step.step}
                type="button"
                data-ocid={`divine-hindu.cashback.step.${i + 1}`}
                className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4 text-left hover:shadow-md transition-shadow cursor-pointer w-full"
                onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
              >
                <span className="text-3xl block mb-2">{step.icon}</span>
                <p className="text-sm font-bold text-foreground">
                  Step {step.step}:{" "}
                  {lang === "hi" ? step.titleHindi : step.title}
                </p>
                {openAccordion === i && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {lang === "hi" ? step.descHindi : step.desc}
                  </p>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Shop By Collection */}
        <section data-ocid="divine-hindu.collections.section">
          <h2 className="text-2xl font-bold text-foreground mb-5">
            {lang === "hi" ? "संग्रह के अनुसार खरीदें" : "Shop By Collection"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {divineHinduCollections.map((col, i) => (
              <a
                key={col.id}
                href={col.link}
                data-ocid={`divine-hindu.collection.item.${i + 1}`}
                className={`bg-gradient-to-br ${col.color} text-white rounded-2xl p-5 text-center hover:opacity-90 transition-opacity`}
              >
                <span className="text-4xl block mb-2">{col.emoji}</span>
                <p className="font-bold text-lg">{col.count}</p>
                <p className="text-sm font-semibold opacity-90">
                  {lang === "hi" ? col.nameHindi : col.name}
                </p>
                <Badge className="mt-2 bg-white/20 text-white border-white/30 text-xs">
                  {lang === "hi" ? "अभी देखें" : "Shop Now"}
                </Badge>
              </a>
            ))}
          </div>
        </section>

        {/* Best Sellers */}
        <section data-ocid="divine-hindu.bestsellers.section">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {lang === "hi" ? "सबसे ज़्यादा बिकने वाले" : "Shop Our Best Sellers"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {divineHinduBestSellers.length}{" "}
                {lang === "hi"
                  ? "उत्पाद"
                  : "products · includes cashback eligible items"}
              </p>
            </div>
            <select
              className="text-xs border border-border rounded-lg px-3 py-2 bg-background"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              data-ocid="divine-hindu.sort_select"
            >
              <option value="best">Best Selling</option>
              <option value="cashback">Cashback First</option>
              <option value="asc">Price: Low → High</option>
              <option value="desc">Price: High → Low</option>
            </select>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {sortedProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} lang={lang} index={i + 1} />
            ))}
          </div>
        </section>

        {/* Customer Reviews */}
        <section data-ocid="divine-hindu.reviews.section">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {lang === "hi"
              ? "20 सत्यापित ग्राहक समीक्षाएं"
              : "20 Verified Customer Reviews"}
          </h2>
          <p className="text-sm text-muted-foreground mb-5">
            {lang === "hi"
              ? "असली ग्राहकों की राय"
              : "Real reviews from verified buyers"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {divineHinduReviews.map((r, i) => (
              <div
                key={r.id}
                data-ocid={`divine-hindu.review.item.${i + 1}`}
                className="bg-card border border-border rounded-xl p-3"
              >
                <div className="flex items-center gap-0.5 mb-1">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star
                      key={s}
                      size={11}
                      className={
                        s < r.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground/30"
                      }
                    />
                  ))}
                </div>
                <p className="text-xs text-foreground italic line-clamp-3">
                  "{r.review}"
                </p>
                <Separator className="my-2" />
                <div className="flex items-center gap-1 justify-between">
                  <div>
                    <p className="text-xs font-semibold text-foreground">
                      {r.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {r.product}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {r.date}
                    </p>
                  </div>
                  {r.verified && (
                    <CheckCircle
                      size={14}
                      className="text-green-500 flex-shrink-0"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="bg-amber-950 text-white py-8 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 text-sm">
          <div>
            <h4 className="font-bold text-amber-300 mb-2">Discover More</h4>
            {[
              "Bestsellers",
              "Newest Items",
              "Energy Stones",
              "Rashi Ratna",
            ].map((l) => (
              <a
                key={l}
                href="/shop"
                className="block text-xs text-amber-200/70 hover:text-amber-200 mb-1"
              >
                {l}
              </a>
            ))}
          </div>
          <div>
            <h4 className="font-bold text-amber-300 mb-2">Collections</h4>
            {[
              "All Karungali",
              "All Rudraksha",
              "Pyrite Frames",
              "Rashi Ratna",
            ].map((l) => (
              <a
                key={l}
                href="/shop"
                className="block text-xs text-amber-200/70 hover:text-amber-200 mb-1"
              >
                {l}
              </a>
            ))}
          </div>
          <div>
            <h4 className="font-bold text-amber-300 mb-2">Policies</h4>
            {[
              "Return Policy",
              "Privacy Policy",
              "Shipping Info",
              "Contact Us",
            ].map((l) => (
              <a
                key={l}
                href="/"
                className="block text-xs text-amber-200/70 hover:text-amber-200 mb-1"
              >
                {l}
              </a>
            ))}
          </div>
          <div>
            <h4 className="font-bold text-amber-300 mb-2">Get Started</h4>
            <p className="text-xs text-amber-200/70 mb-3">
              Shop genuine spiritual products with 100% cashback guarantee.
            </p>
            <Button
              type="button"
              className="bg-amber-500 hover:bg-amber-400 text-white text-xs"
              data-ocid="divine-hindu.footer_cta"
            >
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
