import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ALL_BRACELETS } from "../data/bracelets-catalog-data";
import {
  ALL_SHOP_PRODUCTS,
  SHOP_PURPOSES,
  type ShopProduct,
} from "../data/shop-products-data";
import { useCartStore } from "../stores/cartStore";

const PURPOSE_DESCRIPTIONS: Record<string, string> = {
  protection:
    "Kavachs, blessed malas, Hanuman Gada, Black Tourmaline, Rudraksha — all energized for protection",
  wealth:
    "Lakshmi-Kubera combos, Pyrite, Citrine, 7 Mukhi Rudraksha, Dhanyog bracelets, Shri Yantra",
  love: "Rose Quartz, Soulmate bracelets, 2 Mukhi Rudraksha, Love spells and couples combos",
  career:
    "Tiger Eye, Citrine, Sun energy crystals, 12 Mukhi Rudraksha, career-activating yantras",
  peace:
    "Amethyst, Moonstone, Tulsi mala, Sphatik, meditation aids for mental peace and calm",
};

const FEATURED_CATEGORIES = [
  {
    id: "karungali",
    label: "Karungali",
    labelHindi: "करुंगली",
    emoji: "⚫",
    description:
      "Sacred Ebony Wood — South India's most powerful protection material",
  },
  {
    id: "dhanyog",
    label: "Dhanyog Bracelets",
    labelHindi: "धन्योग ब्रेसलेट",
    emoji: "💎",
    description: "7-bracelet series for targeted wealth manifestation",
  },
  {
    id: "rudraksha",
    label: "Rudraksha",
    labelHindi: "रुद्राक्ष",
    emoji: "🟤",
    description: "Nepal & Indonesia Rudraksha — 1 to 21 Mukhi",
  },
  {
    id: "yantra",
    label: "Yantras",
    labelHindi: "यंत्र",
    emoji: "🔯",
    description:
      "Sacred geometry tools for Vastu, wealth, and spiritual energy",
  },
  {
    id: "pyrite",
    label: "Pyrite",
    labelHindi: "पायराइट",
    emoji: "✨",
    description: "Fool's Gold — the merchant stone for continuous wealth flow",
  },
];

function PurposeProductGrid({
  purposeId,
  onAddToCart,
}: {
  purposeId: string;
  onAddToCart: (p: ShopProduct) => void;
}) {
  const purposeLabel =
    SHOP_PURPOSES.find((p) => p.id === purposeId)?.label ?? "";

  const filteredProducts = ALL_SHOP_PRODUCTS.filter((p) =>
    p.purpose?.some((pur) =>
      pur
        .toLowerCase()
        .includes(
          purposeId === "protection"
            ? "protection"
            : purposeId === "wealth"
              ? "wealth"
              : purposeId === "love"
                ? "love"
                : purposeId === "career"
                  ? "career"
                  : "peace",
        ),
    ),
  );

  const braceletPurposeMap: Record<string, string[]> = {
    protection: ["Protection & Safety"],
    wealth: ["Wealth & Prosperity"],
    love: ["Love & Relationships"],
    career: ["Career & Success"],
    peace: ["Peace & Mental Wellbeing"],
  };

  const filteredBracelets = ALL_BRACELETS.filter((b) =>
    b.purpose.some((p) => (braceletPurposeMap[purposeId] ?? []).includes(p)),
  ).slice(0, 4);

  if (filteredProducts.length === 0 && filteredBracelets.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-3">🔍</div>
        <p className="text-muted-foreground font-body">
          इस श्रेणी के उत्पाद जल्द आ रहे हैं
        </p>
        <Link to="/shop">
          <Button variant="outline" className="mt-4">
            सभी उत्पाद देखें
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {filteredProducts.length > 0 && (
        <div>
          <h3
            className="font-heading font-semibold text-base mb-4"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            🛕 Temple Blessed & Siddh Products ({filteredProducts.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.slice(0, 8).map((product) => (
              <ShopProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>
      )}

      {filteredBracelets.length > 0 && (
        <div>
          <h3
            className="font-heading font-semibold text-base mb-4"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            📿 Related Bracelets ({filteredBracelets.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredBracelets.map((bracelet) => (
              <div
                key={bracelet.id}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
              >
                <div
                  className="h-28 flex items-center justify-center text-4xl"
                  style={{ background: "oklch(0.94 0.025 80)" }}
                >
                  📿
                </div>
                <div className="p-3">
                  <p
                    className="font-heading font-semibold text-xs line-clamp-2 mb-1"
                    style={{ color: "oklch(0.22 0.08 22)" }}
                  >
                    {bracelet.name}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <span
                        className="font-heading font-bold text-sm"
                        style={{ color: "oklch(0.68 0.20 48)" }}
                      >
                        ₹{bracelet.price}
                      </span>
                      {bracelet.originalPrice > bracelet.price && (
                        <span className="text-xs text-muted-foreground line-through ml-1">
                          ₹{bracelet.originalPrice}
                        </span>
                      )}
                    </div>
                    <Badge
                      className="text-xs"
                      style={{
                        background: "oklch(0.55 0.18 145 / 0.15)",
                        color: "oklch(0.45 0.16 140)",
                      }}
                    >
                      -{bracelet.discountPercent}%
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {filteredProducts.length > 0 && (
        <div className="text-center pt-4">
          <Link to="/shop">
            <Button
              variant="outline"
              style={{
                borderColor: "oklch(0.68 0.20 48 / 0.4)",
                color: "oklch(0.45 0.16 40)",
              }}
            >
              View All {purposeLabel} Products →
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

function ShopProductCard({
  product,
  onAddToCart,
}: {
  product: ShopProduct;
  onAddToCart: (p: ShopProduct) => void;
}) {
  return (
    <div
      className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
      data-ocid={`shop.purpose.product.${product.id}`}
    >
      <div
        className="h-32 flex items-center justify-center text-4xl relative"
        style={{ background: "oklch(0.94 0.025 80)" }}
      >
        {product.category === "Siddh Murti"
          ? "🪆"
          : product.category === "Divine Box"
            ? "📦"
            : product.category === "Bracelets"
              ? "📿"
              : product.category === "Rudraksha"
                ? "🟤"
                : product.category === "Yantra"
                  ? "🔯"
                  : "✨"}
        {product.isBestSeller && (
          <span
            className="absolute top-2 left-2 text-xs font-bold px-1.5 py-0.5 rounded-full"
            style={{ background: "oklch(0.68 0.20 48)", color: "white" }}
          >
            ⭐ Best
          </span>
        )}
        {product.templeBlessed && (
          <span
            className="absolute top-2 right-2 text-xs font-bold px-1.5 py-0.5 rounded-full"
            style={{ background: "oklch(0.35 0.12 25)", color: "white" }}
          >
            🛕
          </span>
        )}
      </div>
      <div className="p-3">
        <p
          className="font-heading font-semibold text-xs line-clamp-2 mb-2"
          style={{ color: "oklch(0.22 0.08 22)" }}
        >
          {product.name}
        </p>
        {product.blessedAt && (
          <p className="text-xs text-muted-foreground line-clamp-1 mb-1">
            🛕 {product.blessedAt}
          </p>
        )}
        <div className="flex items-center justify-between mt-2">
          <div>
            <span
              className="font-heading font-bold text-sm"
              style={{ color: "oklch(0.68 0.20 48)" }}
            >
              ₹{product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-muted-foreground line-through ml-1">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="p-1.5 rounded-full"
            style={{ background: "oklch(0.68 0.20 48)", color: "white" }}
            data-ocid="shop.purpose.add_to_cart"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ShopByPurpose() {
  const [activePurpose, setActivePurpose] = useState<string | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (product: ShopProduct) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
    });
    toast.success(`${product.name} कार्ट में जोड़ा!`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div
        className="border-b"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.06 25), oklch(0.22 0.08 30))",
          borderColor: "oklch(0.30 0.08 25)",
        }}
      >
        <div className="container mx-auto px-4 py-6">
          <Link to="/shop" className="flex items-center gap-2 mb-4">
            <ArrowLeft
              className="h-4 w-4"
              style={{ color: "oklch(0.68 0.20 48)" }}
            />
            <span
              className="text-sm font-body"
              style={{ color: "oklch(0.68 0.20 48)" }}
            >
              Back to Shop
            </span>
          </Link>
          <h1
            className="font-decorative text-2xl md:text-4xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🙏 Shop By Purpose
          </h1>
          <p
            className="font-body text-sm"
            style={{ color: "oklch(0.72 0.04 60)" }}
          >
            Choose your spiritual need — we'll show you the right products
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Purpose Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-10">
          {SHOP_PURPOSES.map((purpose) => (
            <button
              type="button"
              key={purpose.id}
              onClick={() =>
                setActivePurpose(
                  activePurpose === purpose.id ? null : purpose.id,
                )
              }
              data-ocid={`shop.purpose.${purpose.id}.card`}
              className="group flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all hover:scale-105"
              style={{
                background:
                  activePurpose === purpose.id
                    ? "linear-gradient(135deg, oklch(0.68 0.20 48 / 0.15), oklch(0.58 0.18 40 / 0.10))"
                    : "oklch(0.97 0.01 80)",
                borderColor:
                  activePurpose === purpose.id
                    ? "oklch(0.68 0.20 48 / 0.5)"
                    : "oklch(0.88 0.03 75)",
                boxShadow:
                  activePurpose === purpose.id
                    ? "0 4px 20px oklch(0.68 0.20 48 / 0.15)"
                    : "none",
              }}
            >
              <span className="text-3xl">{purpose.emoji}</span>
              <span
                className="font-heading font-bold text-xs text-center"
                style={{
                  color:
                    activePurpose === purpose.id
                      ? "oklch(0.45 0.16 40)"
                      : "oklch(0.35 0.12 25)",
                }}
              >
                {purpose.labelHindi}
              </span>
              <span className="text-xs text-muted-foreground text-center line-clamp-2 font-body">
                {purpose.label}
              </span>
            </button>
          ))}
        </div>

        {/* Purpose Description Banner */}
        {activePurpose && (
          <div
            className="mb-8 p-4 rounded-2xl"
            style={{
              background: "oklch(0.68 0.20 48 / 0.06)",
              border: "1px solid oklch(0.68 0.20 48 / 0.2)",
            }}
          >
            <p
              className="font-body text-sm"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              💡{" "}
              <strong>
                {SHOP_PURPOSES.find((p) => p.id === activePurpose)?.label}:
              </strong>{" "}
              {PURPOSE_DESCRIPTIONS[activePurpose]}
            </p>
          </div>
        )}

        {/* Products for selected purpose */}
        {activePurpose ? (
          <PurposeProductGrid
            purposeId={activePurpose}
            onAddToCart={handleAddToCart}
          />
        ) : (
          <>
            {/* Featured Categories */}
            <div className="mb-10">
              <h2
                className="font-heading font-bold text-xl mb-6"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                ✨ Featured Collections
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {FEATURED_CATEGORIES.map((cat) => (
                  <Link to="/shop" key={cat.id}>
                    <div
                      className="p-5 rounded-2xl border cursor-pointer hover:shadow-md transition-all hover:scale-[1.02]"
                      style={{
                        background: "oklch(0.97 0.01 80)",
                        borderColor: "oklch(0.88 0.03 75)",
                      }}
                      data-ocid={`shop.purpose.featured.${cat.id}`}
                    >
                      <div className="text-4xl mb-3">{cat.emoji}</div>
                      <h3
                        className="font-heading font-bold text-base mb-1"
                        style={{ color: "oklch(0.22 0.08 22)" }}
                      >
                        {cat.labelHindi}
                      </h3>
                      <p
                        className="font-heading text-xs mb-1"
                        style={{ color: "oklch(0.55 0.10 40)" }}
                      >
                        {cat.label}
                      </p>
                      <p className="font-body text-xs text-muted-foreground">
                        {cat.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* All Products Grid */}
            <div>
              <h2
                className="font-heading font-bold text-xl mb-6"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                🛕 All Siddh Products ({ALL_SHOP_PRODUCTS.length})
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {ALL_SHOP_PRODUCTS.slice(0, 12).map((product) => (
                  <ShopProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
              <div className="text-center mt-6">
                <Link to="/shop">
                  <Button
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                      color: "white",
                    }}
                  >
                    View All Products in Shop
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
