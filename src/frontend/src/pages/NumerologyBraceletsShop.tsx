import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  ALL_NUMEROLOGY_BRACELETS,
  NUMEROLOGY_BRACELET_CATEGORIES,
  type NumerologyBracelet,
} from "../data/numerologyBraceletData";
import { useCartStore } from "../stores/cartStore";

const STONES = Array.from(
  new Set(ALL_NUMEROLOGY_BRACELETS.map((b) => b.stone.split(" + ")[0])),
).slice(0, 18);
const SORTS = [
  { id: "best", label: "Best Selling", labelHi: "सबसे अच्छा बिक्री" },
  { id: "low", label: "Price: Low to High", labelHi: "कीमत: कम से ज़्यादा" },
  { id: "high", label: "Price: High to Low", labelHi: "कीमत: ज़्यादा से कम" },
  { id: "new", label: "Newest", labelHi: "नएतम" },
];

function emiFor(price: number) {
  return Math.round(price / 12);
}

export default function NumerologyBraceletsShop() {
  const addItem = useCartStore((s) => s.addItem);
  const totalItems = useCartStore((s) => s.totalItems);
  const toggleCart = useCartStore((s) => s.toggleCart);

  const [lang, setLang] = useState<"en" | "hi">("en");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedStones, setSelectedStones] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState(2000);
  const [sort, setSort] = useState("best");
  const [search, setSearch] = useState("");
  const [addedId, setAddedId] = useState<string | null>(null);

  // Read URL search params for pre-filtering
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ml = params.get("moolank");
    const py = params.get("personalYear");
    if (ml) setActiveCategory("moolank");
    else if (py) setActiveCategory("personal-year");
  }, []);

  const filtered = useMemo(() => {
    let list = [...ALL_NUMEROLOGY_BRACELETS];
    if (activeCategory !== "all")
      list = list.filter((b) => b.category === activeCategory);
    if (selectedStones.length)
      list = list.filter((b) =>
        selectedStones.some((s) => b.stone.includes(s)),
      );
    list = list.filter((b) => b.price <= priceMax);
    if (search)
      list = list.filter(
        (b) =>
          b.name.toLowerCase().includes(search.toLowerCase()) ||
          b.nameHi.includes(search),
      );
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    else if (sort === "high") list.sort((a, b) => b.price - a.price);
    else if (sort === "new")
      list = list.filter((b) => b.isNew).concat(list.filter((b) => !b.isNew));
    return list;
  }, [activeCategory, selectedStones, priceMax, sort, search]);

  function handleAddCart(b: NumerologyBracelet) {
    addItem({ id: b.id, name: b.name, price: b.price, category: "bracelet" });
    setAddedId(b.id);
    setTimeout(() => setAddedId(null), 1500);
  }

  const t = (en: string, hi: string) => (lang === "hi" ? hi : en);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="spiritual-gradient py-12 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center gap-2 mb-4">
            <button
              type="button"
              data-ocid="bshop.lang.en"
              onClick={() => setLang("en")}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${lang === "en" ? "bg-amber-500 text-white border-amber-500" : "border-amber-400/50 text-amber-300"}`}
            >
              EN
            </button>
            <button
              type="button"
              data-ocid="bshop.lang.hi"
              onClick={() => setLang("hi")}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${lang === "hi" ? "bg-amber-500 text-white border-amber-500" : "border-amber-400/50 text-amber-300"}`}
            >
              हि
            </button>
          </div>
          <h1
            className="font-heading text-4xl md:text-5xl font-bold"
            style={{ color: "oklch(0.99 0.005 80)" }}
          >
            {t("Numerology Healing Bracelets", "अंकज्योतिष हीलिंग ब्रेसलेट")}
          </h1>
          <p className="mt-2 text-sm" style={{ color: "oklch(0.85 0.02 80)" }}>
            {t(
              "77 handpicked healing crystals aligned to your birth number",
              "77 हस्तचयनित हीलिंग क्रिस्टल आपके जन्म अंक से अनुकूलित",
            )}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0 space-y-6">
          <div>
            <h3
              className="font-heading font-bold text-sm mb-3"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              {t("Category", "श्रेणी")}
            </h3>
            <div className="space-y-1">
              <button
                type="button"
                data-ocid="bshop.filter.cat.all"
                onClick={() => setActiveCategory("all")}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeCategory === "all" ? "bg-amber-100 text-amber-700 font-semibold" : "hover:bg-muted"}`}
              >
                {t("All Bracelets", "सभी ब्रेसलेट")} (
                {ALL_NUMEROLOGY_BRACELETS.length})
              </button>
              {NUMEROLOGY_BRACELET_CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat.id}
                  data-ocid={`bshop.filter.cat.${cat.id}`}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeCategory === cat.id ? "bg-amber-100 text-amber-700 font-semibold" : "hover:bg-muted"}`}
                >
                  {cat.emoji} {lang === "hi" ? cat.labelHi : cat.label} (
                  {cat.count})
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3
              className="font-heading font-bold text-sm mb-3"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              {t("Stone Type", "पत्थर का प्रकार")}
            </h3>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {STONES.map((s) => (
                <label
                  key={s}
                  className="flex items-center gap-2 text-xs cursor-pointer hover:text-amber-600"
                >
                  <input
                    type="checkbox"
                    data-ocid={`bshop.filter.stone.${s.toLowerCase().replace(/ /g, "_")}`}
                    checked={selectedStones.includes(s)}
                    onChange={(e) =>
                      setSelectedStones(
                        e.target.checked
                          ? [...selectedStones, s]
                          : selectedStones.filter((x) => x !== s),
                      )
                    }
                    className="accent-amber-500"
                  />
                  {s}
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3
              className="font-heading font-bold text-sm mb-2"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              {t("Max Price", "अधिकतम मूल्य")} ₹{priceMax}
            </h3>
            <input
              type="range"
              min={300}
              max={2000}
              step={100}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>₹300</span>
              <span>₹2000</span>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Sort Bar */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Input
              placeholder={t("Search bracelets...", "ब्रेसलेट खोजें...")}
              data-ocid="bshop.search_input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs"
            />
            <div className="flex gap-2 flex-wrap">
              {SORTS.map((s) => (
                <button
                  type="button"
                  key={s.id}
                  data-ocid={`bshop.sort.${s.id}`}
                  onClick={() => setSort(s.id)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${sort === s.id ? "bg-amber-500 text-white border-amber-500" : "border-amber-200 text-amber-700 hover:bg-amber-50"}`}
                >
                  {lang === "hi" ? s.labelHi : s.label}
                </button>
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-auto">
              {filtered.length} {t("products", "उत्पाद")}
            </span>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div
              data-ocid="bshop.empty_state"
              className="text-center py-20 text-muted-foreground"
            >
              <p className="text-4xl mb-3">🔍</p>
              <p>
                {t(
                  "No bracelets match your filters.",
                  "आपके फ़िल्टर से कोई ब्रेसलेट मेल नहीं खाता।",
                )}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((b, i) => (
                <div
                  key={b.id}
                  data-ocid={`bshop.item.${i + 1}`}
                  className="temple-card p-4 flex flex-col"
                >
                  <div
                    className="w-full aspect-square rounded-lg flex items-center justify-center text-5xl mb-3"
                    style={{ background: "oklch(0.95 0.02 75)" }}
                  >
                    {b.emoji}
                  </div>
                  {b.badge && (
                    <Badge className="self-start mb-1 text-xs bg-amber-100 text-amber-700 border-amber-300">
                      {b.badge}
                    </Badge>
                  )}
                  <p
                    className="font-semibold text-sm leading-snug min-w-0 line-clamp-2"
                    style={{ color: "oklch(0.35 0.12 25)" }}
                  >
                    {lang === "hi" ? b.nameHi : b.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                    {b.stone}
                  </p>
                  <div className="mt-2 space-y-0.5">
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-amber-600">
                        ₹{b.price}
                      </span>
                      <span className="text-xs text-muted-foreground line-through">
                        ₹{b.mrp}
                      </span>
                      <Badge
                        variant="secondary"
                        className="text-xs text-green-700 bg-green-50 border-green-200"
                      >
                        {Math.round((1 - b.price / b.mrp) * 100)}% off
                      </Badge>
                    </div>
                    {b.emiEligible && (
                      <p className="text-xs text-amber-600">{`or ₹${emiFor(b.price)}/Month | Buy on EMI >`}</p>
                    )}
                  </div>
                  <Button
                    size="sm"
                    data-ocid={`bshop.add_cart.${i + 1}`}
                    className={`mt-auto w-full btn-spiritual ${addedId === b.id ? "opacity-70" : ""}`}
                    onClick={() => handleAddCart(b)}
                  >
                    {addedId === b.id
                      ? t("Added!", "जोड़ा!")
                      : t("Add to Cart", "कार्ट में जोड़ें")}
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Info Section */}
          <div className="mt-16 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
            <h2
              className="font-heading text-xl font-bold mb-4"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              {t("💜 How to Choose Your Bracelet", "💜 अपना ब्रेसलेट कैसे चुनें")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {[
                {
                  step: "1",
                  title: t("Know Your Moolank", "अपना मूलांक जानें"),
                  desc: t(
                    "Add the digits of your birth day. E.g. born on 29 → 2+9 = 11 → 1+1 = 2. Moolank is 2.",
                    "जन्म दिन के अंक जोड़ें। उदा. 29 को जन्मे → 2+9=11 → 1+1=2. मूलांक 2 है।",
                  ),
                },
                {
                  step: "2",
                  title: t("Match to Crystal", "क्रिस्टल से मिलाएं"),
                  desc: t(
                    "Each number 1-9 has a corresponding healing crystal chosen by Vedic numerology tradition.",
                    "वैदिक अंकज्योतिष परंपरा द्वारा चुने गए हीलिंग क्रिस्टल के साथ अंक 1-9 है।",
                  ),
                },
                {
                  step: "3",
                  title: t("Wear & Energize", "पहनें और उर्जावान करें"),
                  desc: t(
                    "All bracelets are cleansed and energized under moonlight before dispatch for maximum benefit.",
                    "सभी ब्रेसलेट अधिकतम लाभ के लिए भेजने से पहले चंद्रमा की रोशनी में शुद्ध और उर्जावान किए जाते हैं।",
                  ),
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ background: "oklch(0.62 0.18 48)" }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm"
                      style={{ color: "oklch(0.35 0.12 25)" }}
                    >
                      {item.title}
                    </p>
                    <p className="text-muted-foreground text-xs mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Cart */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          data-ocid="bshop.cart_button"
          onClick={toggleCart}
          className="gold-gradient text-white rounded-full shadow-xl w-14 h-14 flex items-center justify-center relative"
        >
          <ShoppingCart className="w-6 h-6" />
          {totalItems() > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {totalItems()}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
