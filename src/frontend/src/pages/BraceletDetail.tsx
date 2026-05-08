import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { BADGE_CONFIG, BRACELET_PRODUCTS } from "../data/braceletData";
import type { BadgeType } from "../data/braceletData";
import { useCartStore } from "../stores/cartStore";

const REVIEWS = [
  {
    name: "Priya Sharma",
    rating: 5,
    date: "12 April 2025",
    text: "Bahut sundar bracelet hai. Pehanne ke baad se energy bahut positive lag rahi hai.",
  },
  {
    name: "Rahul Mehta",
    rating: 5,
    date: "8 March 2025",
    text: "Excellent quality! The stone feels genuine and the bracelet looks premium. Fast delivery too.",
  },
  {
    name: "Sunita Devi",
    rating: 4,
    date: "22 February 2025",
    text: "Bahut acha product hai. Quality dekhkar laga paise vasool hain.",
  },
  {
    name: "Arjun Nair",
    rating: 5,
    date: "10 January 2025",
    text: "I bought this as a gift for my wife and she absolutely loves it. Very authentic and beautiful.",
  },
  {
    name: "Kavya Iyer",
    rating: 4,
    date: "5 December 2024",
    text: "Good quality bracelet, fits well. The stones are smooth and well-finished. Happy with the purchase!",
  },
];

export default function BraceletDetail() {
  const { id } = useParams({ from: "/shop/bracelet/$id" });
  const { addItem } = useCartStore();
  const [qty, setQty] = useState(1);
  const product = BRACELET_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-6"
        style={{ background: "oklch(0.11 0.04 25)" }}
      >
        <div className="text-5xl">🔮</div>
        <p
          className="font-heading text-xl"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          Product not found
        </p>
        <Link
          to="/shop"
          className="font-heading font-semibold text-sm px-4 py-2 rounded-full"
          style={{
            background: "oklch(0.68 0.20 48)",
            color: "oklch(0.10 0.04 25)",
          }}
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const found = product;
  const isSoldOut = found.badges.includes("Sold out");
  const discount =
    found.originalPrice && found.price < found.originalPrice
      ? Math.round((1 - found.price / found.originalPrice) * 100)
      : null;

  function handleAddToCart() {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: found.id,
        name: found.name,
        price: found.price,
        category: found.category,
      });
    }
    toast.success(`${found.name} added to cart`, {
      description: `Qty: ${qty}`,
    });
  }

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.11 0.04 25)" }}>
      <div
        className="border-b"
        style={{
          background: "oklch(0.14 0.05 28)",
          borderColor: "oklch(0.28 0.08 35)",
        }}
      >
        <div className="container mx-auto px-4 py-3">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-heading font-semibold transition-opacity hover:opacity-70"
            style={{ color: "oklch(0.72 0.16 58)" }}
            data-ocid="bracelet-detail.back_link"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Bracelet Shop
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div
              className="rounded-2xl flex items-center justify-center aspect-square border"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.20 0.08 40), oklch(0.14 0.05 28))",
                borderColor: "oklch(0.32 0.08 42 / 0.5)",
              }}
            >
              <div className="text-center">
                <div className="text-7xl mb-3">📿</div>
                <p
                  className="font-heading text-sm font-semibold"
                  style={{ color: "oklch(0.68 0.12 58)" }}
                >
                  {found.material}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {found.badges.map((badge) => {
                const cfg = BADGE_CONFIG[badge as BadgeType];
                return (
                  <span
                    key={badge}
                    className="text-xs font-heading font-bold px-2.5 py-1 rounded-full"
                    style={{ background: cfg.bg, color: cfg.color }}
                  >
                    {cfg.label}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <span
              className="text-xs font-heading font-semibold uppercase tracking-widest"
              style={{ color: "oklch(0.72 0.14 55)" }}
            >
              {found.category}
            </span>
            <h1
              className="font-heading font-bold text-2xl md:text-3xl leading-tight"
              style={{ color: "oklch(0.88 0.10 75)" }}
            >
              {found.name}
            </h1>

            <div className="flex items-baseline gap-3">
              <span
                className="font-heading font-bold text-3xl"
                style={{ color: "oklch(0.72 0.20 52)" }}
              >
                Rs.{found.price.toLocaleString()}
              </span>
              {found.originalPrice && (
                <>
                  <span
                    className="font-body line-through text-lg"
                    style={{ color: "oklch(0.48 0.06 55)" }}
                  >
                    Rs.{found.originalPrice.toLocaleString()}
                  </span>
                  {discount && (
                    <Badge
                      className="font-heading font-bold"
                      style={{
                        background: "oklch(0.55 0.22 25)",
                        color: "white",
                        border: "none",
                      }}
                    >
                      {discount}% OFF
                    </Badge>
                  )}
                </>
              )}
            </div>

            {found.description && (
              <p
                className="font-body leading-relaxed"
                style={{ color: "oklch(0.68 0.06 55)" }}
              >
                {found.description}
              </p>
            )}

            <Separator style={{ background: "oklch(0.28 0.08 35 / 0.5)" }} />

            {!isSoldOut && (
              <div className="flex items-center gap-4">
                <span
                  className="font-heading font-semibold text-sm"
                  style={{ color: "oklch(0.72 0.10 58)" }}
                >
                  Qty:
                </span>
                <div
                  className="flex items-center border rounded-lg overflow-hidden"
                  style={{ borderColor: "oklch(0.32 0.08 42 / 0.5)" }}
                >
                  <button
                    type="button"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-9 h-9 flex items-center justify-center font-bold transition-colors hover:opacity-70"
                    style={{
                      background: "oklch(0.18 0.06 30)",
                      color: "oklch(0.78 0.14 75)",
                    }}
                    data-ocid="bracelet-detail.qty_decrement"
                  >
                    -
                  </button>
                  <span
                    className="w-10 text-center font-heading font-bold text-sm"
                    style={{ color: "oklch(0.88 0.08 70)" }}
                  >
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty(qty + 1)}
                    className="w-9 h-9 flex items-center justify-center font-bold transition-colors hover:opacity-70"
                    style={{
                      background: "oklch(0.18 0.06 30)",
                      color: "oklch(0.78 0.14 75)",
                    }}
                    data-ocid="bracelet-detail.qty_increment"
                  >
                    +
                  </button>
                </div>
                <span
                  className="font-heading text-sm"
                  style={{ color: "oklch(0.58 0.08 55)" }}
                >
                  Total: Rs.{(found.price * qty).toLocaleString()}
                </span>
              </div>
            )}

            <Button
              onClick={handleAddToCart}
              disabled={isSoldOut}
              className="w-full py-3 font-heading font-bold text-base transition-all hover:opacity-90"
              style={
                isSoldOut
                  ? {
                      background: "oklch(0.30 0.04 40)",
                      color: "oklch(0.55 0.04 50)",
                    }
                  : {
                      background:
                        "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.56 0.18 40))",
                      color: "white",
                    }
              }
              data-ocid="bracelet-detail.add_to_cart_button"
            >
              {isSoldOut ? (
                "Sold Out"
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </>
              )}
            </Button>

            <div className="flex flex-wrap gap-2">
              {["Energized", "Certified", "Fast Delivery", "Easy Returns"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-xs font-heading px-2.5 py-1 rounded-full"
                    style={{
                      background: "oklch(0.68 0.20 48 / 0.12)",
                      color: "oklch(0.75 0.14 58)",
                      border: "1px solid oklch(0.68 0.20 48 / 0.25)",
                    }}
                  >
                    OK {tag}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        <section className="mt-12">
          <h2
            className="font-heading font-bold text-xl mb-6"
            style={{ color: "oklch(0.84 0.14 72)" }}
          >
            Customer Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {REVIEWS.map((review, idx) => (
              <div
                key={review.name}
                className="rounded-xl border p-4 flex flex-col gap-2"
                style={{
                  background: "oklch(0.15 0.05 28)",
                  borderColor: "oklch(0.28 0.06 32)",
                }}
                data-ocid={`bracelet-detail.review.item.${idx + 1}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="font-heading font-bold text-sm"
                    style={{ color: "oklch(0.82 0.10 68)" }}
                  >
                    {review.name}
                  </span>
                  <span
                    className="text-xs font-body"
                    style={{ color: "oklch(0.52 0.05 55)" }}
                  >
                    {review.date}
                  </span>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-3.5 h-3.5"
                      fill={
                        star <= review.rating
                          ? "oklch(0.78 0.14 75)"
                          : "transparent"
                      }
                      style={{
                        color:
                          star <= review.rating
                            ? "oklch(0.78 0.14 75)"
                            : "oklch(0.40 0.04 50)",
                      }}
                    />
                  ))}
                </div>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "oklch(0.65 0.06 52)" }}
                >
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
