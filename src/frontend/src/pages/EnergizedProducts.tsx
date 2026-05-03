import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import {
  MAHA_MERU_PRODUCTS,
  MALA_PRODUCTS,
  NAKSHATRA_INCENSE,
  PLANETARY_INCENSE,
  RUDRAKSHA_PRODUCTS,
  YANTRA_PRODUCTS,
} from "../data/energizedProductsData";
import { useCartStore } from "../stores/cartStore";

const CATEGORIES = [
  { id: "rudraksha", label: "Rudraksha", labelHi: "रुद्राक्ष", icon: "🌰" },
  { id: "yantras", label: "Yantras", labelHi: "यंत्र", icon: "🔯" },
  { id: "malas", label: "Malas & Japmalas", labelHi: "माला", icon: "📿" },
  {
    id: "planetary",
    label: "Planetary Incense",
    labelHi: "ग्रह धूप",
    icon: "🪐",
  },
  {
    id: "nakshatra",
    label: "Nakshatra Incense",
    labelHi: "नक्षत्र धूप",
    icon: "⭐",
  },
  { id: "maha-meru", label: "Maha Meru", labelHi: "महा मेरु", icon: "🔺" },
];

const PLANET_ICONS: Record<string, string> = {
  Sun: "☀️",
  Moon: "🌙",
  Mars: "♂️",
  Mercury: "☿️",
  Jupiter: "♃",
  Venus: "♀️",
  Saturn: "♄",
  Rahu: "☊",
  Ketu: "☋",
  "All planets": "🪐",
};

function RudrakshaCard({
  product,
  lang,
}: { product: (typeof RUDRAKSHA_PRODUCTS)[0]; lang: string }) {
  const { addItem } = useCartStore();
  const mukhiLabel =
    typeof product.mukhiCount === "number"
      ? `${product.mukhiCount} Mukhi`
      : product.mukhiCount;

  return (
    <div
      className="rounded-xl overflow-hidden border flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
      style={{
        borderColor: "oklch(0.78 0.14 75 / 0.25)",
        background: "oklch(0.98 0.012 80)",
      }}
      data-ocid={`rudraksha.item.${typeof product.mukhiCount === "number" ? product.mukhiCount : "special"}`}
    >
      <div
        className="h-40 flex items-center justify-center text-4xl font-bold relative"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.68 0.20 48 / 0.15), oklch(0.78 0.14 75 / 0.2))",
        }}
      >
        <span
          className="font-heading font-black text-5xl"
          style={{
            color: "oklch(0.68 0.20 48)",
            textShadow: "0 2px 8px oklch(0.68 0.20 48 / 0.3)",
          }}
        >
          {mukhiLabel}
        </span>
        <div
          className="absolute inset-0"
          style={{ boxShadow: "inset 0 0 0 2px oklch(0.78 0.14 75 / 0.2)" }}
        />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3
          className="font-heading font-bold text-base leading-tight"
          style={{ color: "oklch(0.22 0.08 22)" }}
        >
          {lang === "hi" ? product.nameHi : product.name}
        </h3>
        <div className="flex gap-1 flex-wrap">
          <Badge
            variant="outline"
            className="text-xs"
            style={{
              borderColor: "oklch(0.68 0.20 48 / 0.4)",
              color: "oklch(0.55 0.18 40)",
            }}
          >
            {PLANET_ICONS[product.planet] || "🪐"} {product.planet}
          </Badge>
          <Badge
            variant="outline"
            className="text-xs truncate max-w-[120px]"
            style={{
              borderColor: "oklch(0.78 0.14 75 / 0.4)",
              color: "oklch(0.45 0.12 35)",
            }}
          >
            {product.deity}
          </Badge>
        </div>
        <ul className="space-y-0.5 flex-1">
          {product.benefits.slice(0, 3).map((b) => (
            <li
              key={b}
              className="text-xs font-body flex gap-1.5 items-start"
              style={{ color: "oklch(0.45 0.08 40)" }}
            >
              <span style={{ color: "oklch(0.68 0.20 48)" }}>•</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <div className="mt-1 space-y-1">
          <div className="flex gap-2 text-xs font-body">
            <span style={{ color: "oklch(0.55 0.10 40)" }}>Nepal:</span>
            <span
              className="font-bold"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              ₹{product.prices.nepal.toLocaleString()}
            </span>
            <span className="ml-auto" style={{ color: "oklch(0.55 0.10 40)" }}>
              Java: ₹{product.prices.java}
            </span>
          </div>
          {product.prices.nepal >= 500 && (
            <span
              className="inline-block text-[10px] font-heading font-bold px-1.5 py-0.5 rounded-full"
              style={{
                background: "oklch(0.68 0.20 48 / 0.12)",
                color: "oklch(0.48 0.18 42)",
                border: "1px solid oklch(0.68 0.20 48 / 0.3)",
              }}
            >
              💰 100% Cashback
            </span>
          )}
          {product.prices.nepal >= 1000 && (
            <p
              className="text-[10px] font-body"
              style={{ color: "oklch(0.45 0.14 145)" }}
            >
              EMI ₹{Math.ceil(product.prices.nepal / 3).toLocaleString()}/mo
            </p>
          )}
        </div>
        <div className="flex gap-2 mt-2">
          <Link
            to="/energized-products/$productId"
            params={{ productId: product.id }}
            className="flex-1"
          >
            <button
              type="button"
              className="w-full py-1.5 text-xs font-heading font-semibold rounded-lg border transition-colors hover:bg-muted"
              style={{
                borderColor: "oklch(0.78 0.14 75 / 0.4)",
                color: "oklch(0.45 0.12 35)",
              }}
              data-ocid={`rudraksha.view_button.${product.id}`}
            >
              View Details
            </button>
          </Link>
          <button
            type="button"
            onClick={() =>
              addItem({
                id: product.id,
                name: product.name,
                price: product.prices.nepal,
                category: "Rudraksha",
                variantName: "Nepal",
              })
            }
            className="flex-1 py-1.5 text-xs font-heading font-semibold rounded-lg flex items-center justify-center gap-1 transition-all"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
            }}
            data-ocid={`rudraksha.add_button.${product.id}`}
          >
            <ShoppingCart className="h-3 w-3" /> Add
          </button>
        </div>
      </div>
    </div>
  );
}

function YantraCard({
  product,
  lang,
}: { product: (typeof YANTRA_PRODUCTS)[0]; lang: string }) {
  const { addItem } = useCartStore();
  return (
    <div
      className="rounded-xl overflow-hidden border flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
      style={{
        borderColor: "oklch(0.78 0.14 75 / 0.25)",
        background: "oklch(0.98 0.012 80)",
      }}
      data-ocid={`yantra.item.${product.id}`}
    >
      <div
        className="h-40 flex items-center justify-center text-6xl relative"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.78 0.14 75 / 0.2), oklch(0.68 0.20 48 / 0.1))",
        }}
      >
        🔯
        <div
          className="absolute inset-0"
          style={{ boxShadow: "inset 0 0 0 2px oklch(0.78 0.14 75 / 0.2)" }}
        />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3
          className="font-heading font-bold text-base"
          style={{ color: "oklch(0.22 0.08 22)" }}
        >
          {lang === "hi" ? product.nameHi : product.name}
        </h3>
        <div className="flex gap-1 flex-wrap">
          <Badge
            variant="outline"
            className="text-xs"
            style={{
              borderColor: "oklch(0.68 0.20 48 / 0.4)",
              color: "oklch(0.55 0.18 40)",
            }}
          >
            {PLANET_ICONS[product.planet] || "🪐"} {product.planet}
          </Badge>
        </div>
        <ul className="space-y-0.5 flex-1">
          {product.benefits.slice(0, 2).map((b) => (
            <li
              key={b}
              className="text-xs font-body flex gap-1.5"
              style={{ color: "oklch(0.45 0.08 40)" }}
            >
              <span style={{ color: "oklch(0.78 0.14 75)" }}>•</span> {b}
            </li>
          ))}
        </ul>
        <p
          className="font-heading font-bold text-base mt-1"
          style={{ color: "oklch(0.68 0.20 48)" }}
        >
          ₹{product.price.toLocaleString()}
        </p>
        {product.price >= 500 && (
          <span
            className="text-[10px] font-heading font-bold px-1.5 py-0.5 rounded-full self-start"
            style={{
              background: "oklch(0.68 0.20 48 / 0.12)",
              color: "oklch(0.48 0.18 42)",
              border: "1px solid oklch(0.68 0.20 48 / 0.3)",
            }}
          >
            💰 100% Cashback
          </span>
        )}
        {product.price >= 1000 && (
          <p
            className="text-[10px] font-body"
            style={{ color: "oklch(0.45 0.14 145)" }}
          >
            EMI ₹{Math.ceil(product.price / 3).toLocaleString()}/mo
          </p>
        )}
        <div className="flex gap-2">
          <Link
            to="/energized-products/$productId"
            params={{ productId: product.id }}
            className="flex-1"
          >
            <button
              type="button"
              className="w-full py-1.5 text-xs font-heading font-semibold rounded-lg border hover:bg-muted"
              style={{
                borderColor: "oklch(0.78 0.14 75 / 0.4)",
                color: "oklch(0.45 0.12 35)",
              }}
            >
              View Details
            </button>
          </Link>
          <button
            type="button"
            onClick={() =>
              addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                category: "Yantra",
              })
            }
            className="flex-1 py-1.5 text-xs font-heading font-semibold rounded-lg flex items-center justify-center gap-1"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
            }}
            data-ocid={`yantra.add_button.${product.id}`}
          >
            <ShoppingCart className="h-3 w-3" /> Add
          </button>
        </div>
      </div>
    </div>
  );
}

function MalaCard({
  product,
  lang,
}: { product: (typeof MALA_PRODUCTS)[0]; lang: string }) {
  const { addItem } = useCartStore();
  return (
    <div
      className="rounded-xl overflow-hidden border flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
      style={{
        borderColor: "oklch(0.78 0.14 75 / 0.25)",
        background: "oklch(0.98 0.012 80)",
      }}
      data-ocid={`mala.item.${product.id}`}
    >
      <div
        className="h-40 flex items-center justify-center text-6xl relative"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.55 0.14 28 / 0.15), oklch(0.78 0.14 75 / 0.1))",
        }}
      >
        📿
        <div
          className="absolute inset-0"
          style={{ boxShadow: "inset 0 0 0 2px oklch(0.78 0.14 75 / 0.2)" }}
        />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-1">
          <h3
            className="font-heading font-bold text-base"
            style={{ color: "oklch(0.22 0.08 22)" }}
          >
            {lang === "hi" ? product.nameHi : product.name}
          </h3>
          <Badge
            style={{
              background: "oklch(0.78 0.14 75 / 0.15)",
              color: "oklch(0.45 0.12 50)",
              border: "none",
            }}
            className="text-xs whitespace-nowrap shrink-0"
          >
            {product.beadCount} beads
          </Badge>
        </div>
        <ul className="space-y-0.5 flex-1">
          {product.benefits.slice(0, 2).map((b) => (
            <li
              key={b}
              className="text-xs font-body flex gap-1.5"
              style={{ color: "oklch(0.45 0.08 40)" }}
            >
              <span style={{ color: "oklch(0.68 0.20 48)" }}>•</span> {b}
            </li>
          ))}
        </ul>
        <p
          className="font-heading font-bold text-base"
          style={{ color: "oklch(0.68 0.20 48)" }}
        >
          ₹{product.price.toLocaleString()}
        </p>
        {product.price >= 500 && (
          <span
            className="text-[10px] font-heading font-bold px-1.5 py-0.5 rounded-full self-start"
            style={{
              background: "oklch(0.68 0.20 48 / 0.12)",
              color: "oklch(0.48 0.18 42)",
              border: "1px solid oklch(0.68 0.20 48 / 0.3)",
            }}
          >
            💰 100% Cashback
          </span>
        )}
        {product.price >= 1000 && (
          <p
            className="text-[10px] font-body"
            style={{ color: "oklch(0.45 0.14 145)" }}
          >
            EMI ₹{Math.ceil(product.price / 3).toLocaleString()}/mo
          </p>
        )}
        <button
          type="button"
          onClick={() =>
            addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              category: "Mala",
            })
          }
          className="w-full py-1.5 text-xs font-heading font-semibold rounded-lg flex items-center justify-center gap-1"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
            color: "white",
          }}
          data-ocid={`mala.add_button.${product.id}`}
        >
          <ShoppingCart className="h-3 w-3" /> Add to Cart
        </button>
      </div>
    </div>
  );
}

function IncenseCard({
  product,
  lang,
  highlightBadge,
  category,
}: {
  product: (typeof PLANETARY_INCENSE)[0];
  lang: string;
  highlightBadge?: string;
  category: string;
}) {
  const { addItem } = useCartStore();
  const icon = product.planet ? PLANET_ICONS[product.planet] || "🌿" : "⭐";
  return (
    <div
      className="rounded-xl overflow-hidden border flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
      style={{
        borderColor: highlightBadge
          ? "oklch(0.68 0.20 48 / 0.5)"
          : "oklch(0.78 0.14 75 / 0.25)",
        background: "oklch(0.98 0.012 80)",
      }}
      data-ocid={`incense.item.${product.id}`}
    >
      <div
        className="h-32 flex items-center justify-center text-5xl relative"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.55 0.14 28 / 0.1), oklch(0.45 0.12 50 / 0.15))",
        }}
      >
        {icon}
        {highlightBadge && (
          <span
            className="absolute top-2 right-2 text-xs font-heading font-bold px-2 py-0.5 rounded-full"
            style={{ background: "oklch(0.68 0.20 48)", color: "white" }}
          >
            {highlightBadge}
          </span>
        )}
        <div
          className="absolute inset-0"
          style={{ boxShadow: "inset 0 0 0 2px oklch(0.78 0.14 75 / 0.15)" }}
        />
      </div>
      <div className="p-4 flex flex-col gap-1.5 flex-1">
        <h3
          className="font-heading font-bold text-sm"
          style={{ color: "oklch(0.22 0.08 22)" }}
        >
          {lang === "hi" ? product.nameHi : product.name}
        </h3>
        <p
          className="text-xs font-body"
          style={{ color: "oklch(0.55 0.10 40)" }}
        >
          {product.benefits[0]}
        </p>
        <p
          className="font-heading font-bold text-sm mt-auto pt-1"
          style={{ color: "oklch(0.68 0.20 48)" }}
        >
          ₹{product.price}
        </p>
        <button
          type="button"
          onClick={() =>
            addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              category,
            })
          }
          className="w-full py-1.5 text-xs font-heading font-semibold rounded-lg flex items-center justify-center gap-1 mt-1"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
            color: "white",
          }}
          data-ocid={`incense.add_button.${product.id}`}
        >
          <ShoppingCart className="h-3 w-3" /> Add to Cart
        </button>
      </div>
    </div>
  );
}

function MahaMeruCard({
  product,
  lang,
}: { product: (typeof MAHA_MERU_PRODUCTS)[0]; lang: string }) {
  const { addItem } = useCartStore();
  return (
    <div
      className="rounded-xl overflow-hidden border flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
      style={{
        borderColor: "oklch(0.78 0.14 75 / 0.3)",
        background: "oklch(0.98 0.012 80)",
      }}
      data-ocid={`maha_meru.item.${product.id}`}
    >
      <div
        className="h-40 flex flex-col items-center justify-center gap-1 relative"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.78 0.14 75 / 0.2), oklch(0.68 0.20 48 / 0.15))",
        }}
      >
        <span className="text-5xl">🔺</span>
        <span
          className="text-xs font-heading font-semibold"
          style={{ color: "oklch(0.45 0.12 50)" }}
        >
          {product.material}
        </span>
        <div
          className="absolute inset-0"
          style={{ boxShadow: "inset 0 0 0 2px oklch(0.78 0.14 75 / 0.3)" }}
        />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3
          className="font-heading font-bold text-sm"
          style={{ color: "oklch(0.22 0.08 22)" }}
        >
          {lang === "hi" ? product.nameHi : product.name}
        </h3>
        <div className="flex gap-2 text-xs font-body flex-wrap">
          <span style={{ color: "oklch(0.55 0.10 40)" }}>
            📐 {product.dimensions}
          </span>
          <span style={{ color: "oklch(0.55 0.10 40)" }}>
            ⚖️ {product.weight}
          </span>
        </div>
        <ul className="space-y-0.5 flex-1">
          {product.benefits.slice(0, 2).map((b) => (
            <li
              key={b}
              className="text-xs font-body flex gap-1.5"
              style={{ color: "oklch(0.45 0.08 40)" }}
            >
              <span style={{ color: "oklch(0.78 0.14 75)" }}>•</span> {b}
            </li>
          ))}
        </ul>
        <p
          className="font-heading font-bold text-lg"
          style={{ color: "oklch(0.68 0.20 48)" }}
        >
          ₹{product.price.toLocaleString()}
        </p>
        {product.price >= 500 && (
          <span
            className="text-[10px] font-heading font-bold px-1.5 py-0.5 rounded-full self-start"
            style={{
              background: "oklch(0.68 0.20 48 / 0.12)",
              color: "oklch(0.48 0.18 42)",
              border: "1px solid oklch(0.68 0.20 48 / 0.3)",
            }}
          >
            💰 100% Cashback
          </span>
        )}
        {product.price >= 1000 && (
          <p
            className="text-[10px] font-body"
            style={{ color: "oklch(0.45 0.14 145)" }}
          >
            EMI ₹{Math.ceil(product.price / 3).toLocaleString()}/mo
          </p>
        )}
        <button
          type="button"
          onClick={() =>
            addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              category: "Maha Meru",
            })
          }
          className="w-full py-2 text-xs font-heading font-semibold rounded-lg flex items-center justify-center gap-1"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.78 0.14 75), oklch(0.68 0.20 48))",
            color: "oklch(0.15 0.06 22)",
          }}
          data-ocid={`maha_meru.add_button.${product.id}`}
        >
          <ShoppingCart className="h-3 w-3" /> Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function EnergizedProducts() {
  const [activeCategory, setActiveCategory] = useState("rudraksha");
  const [lang] = useState(() => localStorage.getItem("lang") || "en");

  // Detect user's Nakshatra from localStorage if available
  const userNakshatra = (() => {
    try {
      const stored = localStorage.getItem("spiritualBirthData");
      if (stored) {
        const data = JSON.parse(stored);
        return data.nakshatra || null;
      }
    } catch {}
    return null;
  })();

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.97 0.015 85)" }}
    >
      {/* Hero */}
      <section
        className="py-12 px-4 text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.28 0.10 30) 100%)",
        }}
        data-ocid="energized_products.hero.section"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 50%, oklch(0.78 0.14 75) 0%, transparent 50%), radial-gradient(circle at 75% 50%, oklch(0.68 0.20 48) 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <div
            className="inline-flex items-center gap-2 text-xs font-heading font-semibold px-4 py-1.5 rounded-full mb-4"
            style={{
              background: "oklch(0.68 0.20 48 / 0.2)",
              color: "oklch(0.78 0.14 75)",
              border: "1px solid oklch(0.78 0.14 75 / 0.3)",
            }}
          >
            <Star className="h-3 w-3" /> Traditionally Energized & Lab Certified
          </div>
          <h1
            className="font-heading font-black text-3xl md:text-4xl mb-2 leading-tight"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Energized Sacred Products
          </h1>
          <p
            className="font-display text-lg md:text-xl mb-1"
            style={{ color: "oklch(0.68 0.20 48)" }}
          >
            ऊर्जावान आध्यात्मिक उत्पाद
          </p>
          <p
            className="font-body text-sm mt-3 max-w-xl mx-auto"
            style={{ color: "oklch(0.75 0.06 65)" }}
          >
            Authentic, traditionally energized items for spiritual protection,
            growth and divine blessings
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section
        className="sticky top-16 z-30 border-b px-4 py-2 overflow-x-auto"
        style={{
          background: "oklch(0.22 0.08 22)",
          borderColor: "oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        <div className="flex gap-1 max-w-6xl mx-auto min-w-max">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className="px-4 py-2 rounded-lg text-xs font-heading font-semibold transition-all whitespace-nowrap"
              style={
                activeCategory === cat.id
                  ? { background: "oklch(0.68 0.20 48)", color: "white" }
                  : { color: "oklch(0.75 0.06 65)", background: "transparent" }
              }
              data-ocid={`energized_products.category.tab.${cat.id}`}
            >
              {cat.icon} {lang === "hi" ? cat.labelHi : cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        {activeCategory === "rudraksha" && (
          <section data-ocid="energized_products.rudraksha.section">
            <div className="mb-6">
              <h2
                className="font-heading font-bold text-xl"
                style={{ color: "oklch(0.30 0.10 25)" }}
              >
                🌰 {lang === "hi" ? "रुद्राक्ष संग्रह" : "Rudraksha Collection"}
              </h2>
              <p
                className="text-sm font-body mt-1"
                style={{ color: "oklch(0.55 0.08 40)" }}
              >
                Authentic Nepal & Java Rudraksha — certified, energized with
                Vedic rituals
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {RUDRAKSHA_PRODUCTS.map((p) => (
                <RudrakshaCard key={p.id} product={p} lang={lang} />
              ))}
            </div>
          </section>
        )}

        {activeCategory === "yantras" && (
          <section data-ocid="energized_products.yantras.section">
            <div className="mb-6">
              <h2
                className="font-heading font-bold text-xl"
                style={{ color: "oklch(0.30 0.10 25)" }}
              >
                🔯 {lang === "hi" ? "यंत्र संग्रह" : "Yantra Collection"}
              </h2>
              <p
                className="text-sm font-body mt-1"
                style={{ color: "oklch(0.55 0.08 40)" }}
              >
                Pure copper, gold-plated and crystal yantras — energized with
                full puja rituals
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {YANTRA_PRODUCTS.map((p) => (
                <YantraCard key={p.id} product={p} lang={lang} />
              ))}
            </div>
          </section>
        )}

        {activeCategory === "malas" && (
          <section data-ocid="energized_products.malas.section">
            <div className="mb-6">
              <h2
                className="font-heading font-bold text-xl"
                style={{ color: "oklch(0.30 0.10 25)" }}
              >
                📿 {lang === "hi" ? "माला संग्रह" : "Mala & Japmala Collection"}
              </h2>
              <p
                className="text-sm font-body mt-1"
                style={{ color: "oklch(0.55 0.08 40)" }}
              >
                108-bead authentic gemstone malas for japa, meditation and
                spiritual practice
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {MALA_PRODUCTS.map((p) => (
                <MalaCard key={p.id} product={p} lang={lang} />
              ))}
            </div>
          </section>
        )}

        {activeCategory === "planetary" && (
          <section data-ocid="energized_products.planetary.section">
            <div className="mb-6">
              <h2
                className="font-heading font-bold text-xl"
                style={{ color: "oklch(0.30 0.10 25)" }}
              >
                🪐 {lang === "hi" ? "नवग्रह धूप" : "Navagraha Planetary Incense"}
              </h2>
              <p
                className="text-sm font-body mt-1"
                style={{ color: "oklch(0.55 0.08 40)" }}
              >
                All 9 Navagraha incenses — each formulated with herbs sacred to
                that planet
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PLANETARY_INCENSE.map((p) => (
                <IncenseCard
                  key={p.id}
                  product={p}
                  lang={lang}
                  category="Planetary Incense"
                />
              ))}
            </div>
          </section>
        )}

        {activeCategory === "nakshatra" && (
          <section data-ocid="energized_products.nakshatra.section">
            <div className="mb-6">
              <h2
                className="font-heading font-bold text-xl"
                style={{ color: "oklch(0.30 0.10 25)" }}
              >
                ⭐ {lang === "hi" ? "नक्षत्र धूप" : "Nakshatra Incense"}
              </h2>
              <p
                className="text-sm font-body mt-1"
                style={{ color: "oklch(0.55 0.08 40)" }}
              >
                Incense aligned with your birth nakshatra for maximum spiritual
                resonance
              </p>
              {userNakshatra && (
                <div
                  className="mt-3 inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full font-heading font-semibold"
                  style={{
                    background: "oklch(0.68 0.20 48 / 0.15)",
                    color: "oklch(0.68 0.20 48)",
                    border: "1px solid oklch(0.68 0.20 48 / 0.3)",
                  }}
                >
                  ✓ Your birth nakshatra: {userNakshatra}
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {NAKSHATRA_INCENSE.map((p) => (
                <IncenseCard
                  key={p.id}
                  product={p}
                  lang={lang}
                  category="Nakshatra Incense"
                  highlightBadge={
                    userNakshatra &&
                    p.nakshatra?.toLowerCase() === userNakshatra.toLowerCase()
                      ? "✓ Your Nakshatra"
                      : undefined
                  }
                />
              ))}
            </div>
          </section>
        )}

        {activeCategory === "maha-meru" && (
          <section data-ocid="energized_products.maha_meru.section">
            <div className="mb-6">
              <h2
                className="font-heading font-bold text-xl"
                style={{ color: "oklch(0.30 0.10 25)" }}
              >
                🔺 {lang === "hi" ? "महा मेरु संग्रह" : "Maha Meru Sri Yantra"}
              </h2>
              <p
                className="text-sm font-body mt-1"
                style={{ color: "oklch(0.55 0.08 40)" }}
              >
                The 3D form of Sri Yantra — the most powerful yantra for cosmic
                energy transformation
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {MAHA_MERU_PRODUCTS.map((p) => (
                <MahaMeruCard key={p.id} product={p} lang={lang} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Trust Badges */}
      <section
        className="py-8 px-4 border-t"
        style={{
          background: "oklch(0.95 0.020 78)",
          borderColor: "oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            {
              icon: "🔬",
              title: "Lab Certified",
              desc: "Authenticity guaranteed",
            },
            {
              icon: "🕉️",
              title: "Vedic Energized",
              desc: "Traditional puja rituals",
            },
            {
              icon: "📦",
              title: "Secure Packaging",
              desc: "Safe sacred delivery",
            },
            { icon: "↩️", title: "Easy Returns", desc: "7-day return policy" },
          ].map((b) => (
            <div key={b.title} className="flex flex-col items-center gap-1">
              <span className="text-2xl">{b.icon}</span>
              <p
                className="font-heading font-bold text-sm"
                style={{ color: "oklch(0.30 0.10 25)" }}
              >
                {b.title}
              </p>
              <p
                className="text-xs font-body"
                style={{ color: "oklch(0.55 0.08 40)" }}
              >
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
