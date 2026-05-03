import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { ProductWithMRP } from "../data/shopData_new";
import { ALL_NEW_PRODUCTS } from "../data/shopData_new";
import { useGetProduct } from "../hooks/useQueries";
import { useCartStore } from "../stores/cartStore";

const CATEGORY_ICONS: Record<string, string> = {
  Gemstones: "💎",
  Yantras: "🔯",
  Bracelets: "📿",
  "Ritual Items": "🪔",
  "Puja Samagri": "🏺",
  "God Idols": "🪆",
  "Feng Shui": "🐢",
  "God Pendants": "📿",
  "Silver Adorns": "🥈",
  Combos: "🎁",
};

export default function ProductDetail() {
  const { id } = useParams({ from: "/shop/$id" });
  const { data: product, isLoading } = useGetProduct(id);
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null,
  );
  const [cashbackOpen, setCashbackOpen] = useState(false);

  // Look up local enriched product for MRP + variants
  const localProduct = ALL_NEW_PRODUCTS.find((p) => p.id === id) as
    | ProductWithMRP
    | undefined;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <Skeleton className="h-96 rounded-2xl" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <p
          className="font-heading text-xl"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          Product not found
        </p>
        <Link
          to="/shop"
          className="mt-4 inline-block font-heading text-sm"
          style={{ color: "oklch(0.68 0.20 48)" }}
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const variants = localProduct?.variants ?? [];
  const mrp = localProduct?.mrp;
  const selectedVariant = selectedVariantId
    ? variants.find((v) => v.id === selectedVariantId)
    : null;
  const activePrice = selectedVariant ? selectedVariant.price : product.price;
  const discountPct =
    mrp && mrp > activePrice
      ? Math.round(((mrp - activePrice) / mrp) * 100)
      : null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: selectedVariant
          ? `${product.name} — ${selectedVariant.name}`
          : product.name,
        price: activePrice,
        category: product.category,
      });
    }
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-sm font-heading mb-6 hover:underline"
        style={{ color: "oklch(0.68 0.20 48)" }}
      >
        <ArrowLeft className="h-4 w-4" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product image area */}
        <div className="ornamental-border rounded-2xl overflow-hidden">
          <div
            className="h-72 flex items-center justify-center text-8xl"
            style={{ background: "oklch(0.94 0.025 80)" }}
          >
            {CATEGORY_ICONS[product.category] || "✨"}
          </div>
        </div>

        <div className="space-y-4">
          <span
            className="text-xs font-heading px-3 py-1 rounded-full"
            style={{
              background: "oklch(0.68 0.20 48 / 0.1)",
              color: "oklch(0.55 0.16 48)",
            }}
          >
            {product.category}
          </span>
          <h1
            className="font-heading font-bold text-2xl"
            style={{ color: "oklch(0.22 0.08 22)" }}
          >
            {product.name}
          </h1>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => i).map((i) => (
              <Star
                key={`star-${i}`}
                className="h-4 w-4"
                style={{
                  fill: "oklch(0.78 0.14 75)",
                  color: "oklch(0.78 0.14 75)",
                }}
              />
            ))}
            <span className="text-sm font-body text-muted-foreground ml-1">
              (108 reviews)
            </span>
          </div>

          {/* Price block */}
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline gap-3 flex-wrap">
              <p
                className="font-heading font-bold text-3xl"
                style={{ color: "oklch(0.68 0.20 48)" }}
              >
                ₹{activePrice.toLocaleString()}
              </p>
              {mrp && mrp > activePrice && (
                <>
                  <p
                    className="font-body text-lg line-through"
                    style={{ color: "oklch(0.55 0.04 60)" }}
                  >
                    ₹{mrp.toLocaleString()}
                  </p>
                  {discountPct && (
                    <Badge
                      className="text-xs font-heading font-bold"
                      style={{
                        background: "oklch(0.55 0.18 145 / 0.15)",
                        color: "oklch(0.40 0.16 140)",
                      }}
                    >
                      {discountPct}% OFF
                    </Badge>
                  )}
                </>
              )}
              {activePrice >= 500 && (
                <span
                  className="text-xs font-heading font-bold px-2.5 py-1 rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.20 48 / 0.15), oklch(0.72 0.18 55 / 0.12))",
                    color: "oklch(0.45 0.18 42)",
                    border: "1px solid oklch(0.68 0.20 48 / 0.35)",
                  }}
                  data-ocid="product.cashback_badge"
                >
                  💰 100% Cashback Eligible
                </span>
              )}
            </div>

            {/* EMI block */}
            {activePrice >= 1000 && (
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg"
                style={{
                  background: "oklch(0.55 0.18 145 / 0.07)",
                  border: "1px solid oklch(0.55 0.18 145 / 0.2)",
                }}
                data-ocid="product.emi_section"
              >
                <span className="text-base">💳</span>
                <div>
                  <p
                    className="font-heading font-semibold text-xs"
                    style={{ color: "oklch(0.40 0.14 145)" }}
                  >
                    Easy EMI Available
                  </p>
                  <p
                    className="font-body text-xs"
                    style={{ color: "oklch(0.45 0.08 40)" }}
                  >
                    ₹{Math.ceil(activePrice / 3).toLocaleString()}/month for 3
                    months (0% interest)
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Gemstone weight / other variants */}
          {variants.length > 0 && (
            <div>
              <p
                className="font-heading font-semibold text-sm mb-2"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                Select Variant / Weight:
              </p>
              <div
                className="flex flex-wrap gap-2"
                data-ocid="product.variant_selector"
              >
                {variants.map((v) => {
                  const vKey = v.id ?? v.label ?? String(v.price);
                  return (
                    <button
                      key={vKey}
                      type="button"
                      onClick={() =>
                        setSelectedVariantId(
                          selectedVariantId === vKey ? null : vKey,
                        )
                      }
                      data-ocid={`product.variant.${vKey}`}
                      className="px-3 py-1.5 rounded-full text-xs font-heading font-semibold border transition-all"
                      style={{
                        background:
                          selectedVariantId === vKey
                            ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                            : "oklch(0.95 0.02 80)",
                        color:
                          selectedVariantId === vKey
                            ? "white"
                            : "oklch(0.35 0.12 25)",
                        borderColor:
                          selectedVariantId === vKey
                            ? "transparent"
                            : "oklch(0.80 0.04 75)",
                      }}
                    >
                      {v.name ?? v.label} — ₹{v.price.toLocaleString()}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <p
            className="font-body text-sm leading-relaxed"
            style={{ color: "oklch(0.30 0.06 30)" }}
          >
            {product.description}
          </p>

          {product.benefits && (
            <div
              className="p-3 rounded-lg"
              style={{
                background: "oklch(0.65 0.16 140 / 0.08)",
                border: "1px solid oklch(0.65 0.16 140 / 0.2)",
              }}
            >
              <p
                className="font-heading font-semibold text-xs mb-1"
                style={{ color: "oklch(0.45 0.14 140)" }}
              >
                Benefits
              </p>
              <p
                className="font-body text-sm"
                style={{ color: "oklch(0.30 0.06 30)" }}
              >
                {product.benefits}
              </p>
            </div>
          )}

          {product.astrologicalPurpose && (
            <div
              className="p-3 rounded-lg"
              style={{
                background: "oklch(0.78 0.14 75 / 0.08)",
                border: "1px solid oklch(0.78 0.14 75 / 0.2)",
              }}
            >
              <p
                className="font-heading font-semibold text-xs mb-1"
                style={{ color: "oklch(0.55 0.16 60)" }}
              >
                Astrological Purpose
              </p>
              <p
                className="font-body text-sm"
                style={{ color: "oklch(0.30 0.06 30)" }}
              >
                {product.astrologicalPurpose}
              </p>
            </div>
          )}

          {/* Cashback Terms collapsible */}
          {product.price >= 500 && (
            <div
              className="rounded-lg overflow-hidden"
              style={{
                border: "1px solid oklch(0.68 0.20 48 / 0.3)",
              }}
              data-ocid="product.cashback_terms"
            >
              <button
                type="button"
                onClick={() => setCashbackOpen((v) => !v)}
                className="w-full flex items-center justify-between px-3 py-2.5"
                style={{
                  background: "oklch(0.68 0.20 48 / 0.08)",
                  color: "oklch(0.45 0.18 42)",
                }}
                data-ocid="product.cashback_terms_toggle"
              >
                <span className="font-heading font-semibold text-xs">
                  💰 100% Cashback Terms
                </span>
                <span className="text-xs">{cashbackOpen ? "▲" : "▼"}</span>
              </button>
              {cashbackOpen && (
                <div
                  className="px-3 py-2.5 text-xs font-body"
                  style={{
                    background: "oklch(0.68 0.20 48 / 0.04)",
                    color: "oklch(0.35 0.08 35)",
                  }}
                >
                  <p>
                    This product is eligible for 100% cashback. Submit your
                    purchase proof within <strong>7 days</strong> of delivery.
                    Cashback credited within <strong>15 working days</strong> to
                    your registered account.
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center gap-3">
            <div
              className="flex items-center border rounded-full overflow-hidden"
              style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
            >
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-muted transition-colors font-heading"
              >
                −
              </button>
              <span className="px-4 py-2 font-heading font-semibold">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 hover:bg-muted transition-colors font-heading"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={handleAddToCart}
              data-ocid="product.add_to_cart_button"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-heading font-bold text-sm transition-all hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                color: "white",
              }}
            >
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </button>
          </div>

          <p className="text-xs font-body text-muted-foreground">
            ✅ 108 hours energized by top astrologers • 🚚 Free delivery above
            ₹999
          </p>
        </div>
      </div>
    </div>
  );
}
