import { Badge } from "@/components/ui/badge";
import { useParams } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";
import {
  MAHA_MERU_PRODUCTS,
  MALA_PRODUCTS,
  NAKSHATRA_INCENSE,
  PLANETARY_INCENSE,
  RUDRAKSHA_PRODUCTS,
  YANTRA_PRODUCTS,
} from "../data/energizedProductsData";
import { SpeakerButton } from "../hooks/useSpeaker";
import { useCartStore } from "../stores/cartStore";

// Merge all products for lookup
type AnyProduct = {
  id: string;
  name: string;
  nameHi: string;
  benefits: string[];
  benefitsHi: string[];
  price?: number;
  prices?: { nepal: number; java: number; silverCapped: number };
  deity?: string;
  planet?: string;
  material?: string;
  dimensions?: string;
  weight?: string;
  specifications?: {
    size: string;
    origin: string;
    certification: string;
    shape: string;
  };
  careInstructions?: string;
  beadCount?: number;
  gemstone?: string;
  energizationDetails?: string;
  energizationProcess?: string;
  spiritualUse?: string;
  usageRitual?: string;
  ingredients?: string[];
  mukhiCount?: number | string;
  nakshatra?: string;
  _category: string;
};

function buildAllProducts(): AnyProduct[] {
  const rudraksha = RUDRAKSHA_PRODUCTS.map(
    (p) => ({ ...p, _category: "Rudraksha" }) as AnyProduct,
  );
  const yantras = YANTRA_PRODUCTS.map(
    (p) => ({ ...p, _category: "Yantra" }) as AnyProduct,
  );
  const malas = MALA_PRODUCTS.map(
    (p) => ({ ...p, _category: "Mala" }) as AnyProduct,
  );
  const planetary = PLANETARY_INCENSE.map(
    (p) => ({ ...p, _category: "Planetary Incense" }) as AnyProduct,
  );
  const nakshatra = NAKSHATRA_INCENSE.map(
    (p) => ({ ...p, _category: "Nakshatra Incense" }) as AnyProduct,
  );
  const meru = MAHA_MERU_PRODUCTS.map(
    (p) =>
      ({ ...p, benefitsHi: p.benefits, _category: "Maha Meru" }) as AnyProduct,
  );
  return [
    ...rudraksha,
    ...yantras,
    ...malas,
    ...planetary,
    ...nakshatra,
    ...meru,
  ];
}

const ALL_PRODUCTS = buildAllProducts();

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

const CATEGORY_COLORS: Record<string, string> = {
  Rudraksha: "oklch(0.68 0.20 48)",
  Yantra: "oklch(0.78 0.14 75)",
  Mala: "oklch(0.55 0.14 28)",
  "Planetary Incense": "oklch(0.45 0.12 50)",
  "Nakshatra Incense": "oklch(0.55 0.18 270)",
  "Maha Meru": "oklch(0.78 0.14 75)",
};

const PLACEHOLDER_EMOJIS: Record<string, string> = {
  Rudraksha: "🌰",
  Yantra: "🔯",
  Mala: "📿",
  "Planetary Incense": "🪐",
  "Nakshatra Incense": "⭐",
  "Maha Meru": "🔺",
};

const PLACEHOLDER_REVIEWS = [
  {
    name: "Priya Sharma",
    rating: 5,
    text: "Received beautifully packaged. The energization certificate was included. Feeling very positive energy since using it.",
    location: "Mumbai",
  },
  {
    name: "Rajesh Kumar",
    rating: 5,
    text: "Authentic product, exactly as described. The quality is excellent and I can feel the difference in my meditation practice.",
    location: "Delhi",
  },
  {
    name: "Anita Patel",
    rating: 4,
    text: "Good product, fast delivery. Would recommend to anyone seeking genuine spiritual products.",
    location: "Ahmedabad",
  },
];

function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className="border-b"
      style={{ borderColor: "oklch(0.78 0.14 75 / 0.2)" }}
    >
      <button
        type="button"
        className="w-full flex items-center justify-between py-3 text-sm font-heading font-semibold text-left"
        style={{ color: "oklch(0.30 0.10 25)" }}
        onClick={() => setOpen(!open)}
        data-ocid={`product_detail.accordion.${title.toLowerCase().replace(/\s+/g, "_")}`}
      >
        {title}
        {open ? (
          <ChevronUp className="h-4 w-4 shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0" />
        )}
      </button>
      {open && (
        <div
          className="pb-4 text-sm font-body leading-relaxed"
          style={{ color: "oklch(0.45 0.08 40)" }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => i).map((i) => (
        <span
          key={i}
          style={{
            color: i < rating ? "oklch(0.78 0.14 75)" : "oklch(0.80 0.01 80)",
          }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function RelatedProductCard({ product }: { product: AnyProduct }) {
  const { addItem } = useCartStore();
  const price = product.price ?? product.prices?.nepal ?? 0;
  return (
    <div
      className="rounded-lg border p-3 flex flex-col gap-2 hover:shadow-md transition-shadow"
      style={{
        borderColor: "oklch(0.78 0.14 75 / 0.2)",
        background: "oklch(0.99 0.005 80)",
      }}
    >
      <div
        className="h-24 rounded-md flex items-center justify-center text-4xl"
        style={{
          background: `linear-gradient(135deg, ${CATEGORY_COLORS[product._category] || "oklch(0.68 0.20 48)"} / 0.15, oklch(0.78 0.14 75 / 0.1))`,
        }}
      >
        {PLACEHOLDER_EMOJIS[product._category] || "✨"}
      </div>
      <p
        className="text-xs font-heading font-semibold truncate"
        style={{ color: "oklch(0.22 0.08 22)" }}
      >
        {product.name}
      </p>
      <p
        className="text-xs font-heading font-bold"
        style={{ color: "oklch(0.68 0.20 48)" }}
      >
        ₹{price.toLocaleString()}
      </p>
      <button
        type="button"
        onClick={() =>
          addItem({
            id: product.id,
            name: product.name,
            price,
            category: product._category,
          })
        }
        className="w-full py-1 text-xs font-heading font-semibold rounded-md"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
          color: "white",
        }}
        data-ocid={`related.add_button.${product.id}`}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default function EnergizedProductDetail() {
  const { productId } = useParams({ from: "/energized-products/$productId" });
  const { addItem } = useCartStore();
  const [lang] = useState(() => localStorage.getItem("lang") || "en");
  const [selectedVariant, setSelectedVariant] = useState<
    "nepal" | "java" | "silverCapped"
  >("nepal");
  const [quantity, setQuantity] = useState(1);

  const product = ALL_PRODUCTS.find((p) => p.id === productId);

  if (!product) {
    return (
      <div
        className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4"
        data-ocid="product_detail.error_state"
      >
        <span className="text-5xl">🔍</span>
        <h1
          className="font-heading font-bold text-xl"
          style={{ color: "oklch(0.30 0.10 25)" }}
        >
          Product Not Found
        </h1>
        <a
          href="/energized-products"
          className="text-sm font-heading font-semibold px-6 py-2 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
            color: "white",
          }}
        >
          Back to Products
        </a>
      </div>
    );
  }

  const price = product.prices
    ? product.prices[selectedVariant]
    : (product.price ?? 0);

  const variantLabel = product.prices
    ? (
        {
          nepal: "Nepal (Authentic)",
          java: "Java (Standard)",
          silverCapped: "Silver Capped",
        } as const
      )[selectedVariant]
    : null;

  const benefitsText = (
    lang === "hi" ? product.benefitsHi : product.benefits
  ).join(". ");

  // Related products from same category (exclude current)
  const relatedProducts = ALL_PRODUCTS.filter(
    (p) => p._category === product._category && p.id !== product.id,
  ).slice(0, 3);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price,
      category: product._category,
      variantName: variantLabel ?? undefined,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // navigate to cart by triggering global cart open
    window.dispatchEvent(new CustomEvent("open-cart"));
  };

  const isRudraksha = product._category === "Rudraksha";
  const isYantra = product._category === "Yantra";
  const colorAccent =
    CATEGORY_COLORS[product._category] || "oklch(0.68 0.20 48)";
  const emoji = PLACEHOLDER_EMOJIS[product._category] || "✨";

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.97 0.015 85)" }}
    >
      {/* Breadcrumb */}
      <div
        className="px-4 py-2 border-b"
        style={{
          background: "oklch(0.95 0.02 78)",
          borderColor: "oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        <div
          className="max-w-6xl mx-auto flex items-center gap-1 text-xs font-body"
          style={{ color: "oklch(0.55 0.08 40)" }}
        >
          <a
            href="/"
            className="hover:underline"
            style={{ color: "oklch(0.68 0.20 48)" }}
          >
            Home
          </a>
          <ChevronRight className="h-3 w-3" />
          <a
            href="/energized-products"
            className="hover:underline"
            style={{ color: "oklch(0.68 0.20 48)" }}
          >
            Energized Products
          </a>
          <ChevronRight className="h-3 w-3" />
          <span style={{ color: "oklch(0.55 0.08 40)" }}>
            {product._category}
          </span>
          <ChevronRight className="h-3 w-3" />
          <span
            className="truncate max-w-[160px]"
            style={{ color: "oklch(0.35 0.10 25)" }}
          >
            {product.name}
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT: Image */}
          <div className="flex flex-col gap-4">
            <div
              className="rounded-2xl overflow-hidden border flex items-center justify-center relative"
              style={{
                height: "380px",
                borderColor: "oklch(0.78 0.14 75 / 0.3)",
                background: `linear-gradient(135deg, ${colorAccent} / 0.12, oklch(0.78 0.14 75 / 0.15))`,
                boxShadow: "inset 0 0 0 2px oklch(0.78 0.14 75 / 0.25)",
              }}
              data-ocid="product_detail.image_panel"
            >
              <span className="text-9xl">{emoji}</span>
              {isRudraksha && product.mukhiCount && (
                <div
                  className="absolute bottom-4 right-4 px-4 py-2 rounded-xl font-heading font-black text-2xl"
                  style={{
                    background: `${colorAccent}`,
                    color: "white",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                  }}
                >
                  {product.mukhiCount} Mukhi
                </div>
              )}
              {/* Ornamental border */}
              <div
                className="absolute inset-2 rounded-xl pointer-events-none"
                style={{
                  boxShadow: "inset 0 0 0 1px oklch(0.78 0.14 75 / 0.3)",
                }}
              />
            </div>

            {/* Thumbnail row */}
            <div className="flex gap-3">
              {(["main", "alt1", "alt2"] as const).map((thumbId, i) => (
                <div
                  key={thumbId}
                  className="w-20 h-20 rounded-lg border flex items-center justify-center text-2xl cursor-pointer transition-all hover:shadow-md"
                  style={{
                    borderColor:
                      i === 0 ? colorAccent : "oklch(0.78 0.14 75 / 0.25)",
                    background: "oklch(0.96 0.012 80)",
                    boxShadow: i === 0 ? `0 0 0 2px ${colorAccent}` : "none",
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>

            {/* Variant selector for Rudraksha */}
            {isRudraksha && product.prices && (
              <div
                className="rounded-xl border p-4"
                style={{
                  borderColor: "oklch(0.78 0.14 75 / 0.25)",
                  background: "oklch(0.98 0.010 80)",
                }}
              >
                <p
                  className="text-xs font-heading font-semibold mb-2"
                  style={{ color: "oklch(0.45 0.10 40)" }}
                >
                  Select Variant
                </p>
                <div className="flex gap-2 flex-wrap">
                  {(["nepal", "java", "silverCapped"] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className="px-3 py-2 rounded-lg text-xs font-heading font-semibold border transition-all"
                      style={{
                        borderColor:
                          selectedVariant === v
                            ? colorAccent
                            : "oklch(0.78 0.14 75 / 0.3)",
                        background:
                          selectedVariant === v
                            ? `${colorAccent}`
                            : "transparent",
                        color:
                          selectedVariant === v
                            ? "white"
                            : "oklch(0.45 0.10 40)",
                      }}
                      data-ocid={`product_detail.variant.${v}`}
                    >
                      {v === "nepal"
                        ? "Nepal"
                        : v === "java"
                          ? "Java"
                          : "Silver Capped"}
                      <span className="ml-1.5">
                        ₹
                        {(product.prices as Record<string, number>)[
                          v
                        ].toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Details */}
          <div className="flex flex-col gap-5">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h1
                    className="font-heading font-black text-2xl md:text-3xl leading-tight"
                    style={{ color: "oklch(0.22 0.08 22)" }}
                    data-ocid="product_detail.product_name"
                  >
                    {lang === "hi" ? product.nameHi : product.name}
                  </h1>
                  {lang !== "hi" && (
                    <p
                      className="text-base mt-0.5 font-display"
                      style={{ color: colorAccent }}
                    >
                      {product.nameHi}
                    </p>
                  )}
                </div>
                <SpeakerButton
                  text={benefitsText}
                  lang={lang === "hi" ? "hi-IN" : "en-IN"}
                  size="md"
                />
              </div>

              <div className="flex gap-2 flex-wrap mt-3">
                <Badge
                  style={{
                    background: `${colorAccent} / 0.15`,
                    border: `1px solid ${colorAccent} / 0.4`,
                    color: colorAccent,
                  }}
                >
                  {product._category}
                </Badge>
                {product.planet && (
                  <Badge
                    variant="outline"
                    style={{
                      borderColor: "oklch(0.78 0.14 75 / 0.4)",
                      color: "oklch(0.45 0.12 35)",
                    }}
                  >
                    {PLANET_ICONS[product.planet] || "🪐"} {product.planet}
                  </Badge>
                )}
                {product.deity && (
                  <Badge
                    variant="outline"
                    style={{
                      borderColor: "oklch(0.78 0.14 75 / 0.3)",
                      color: "oklch(0.45 0.10 40)",
                    }}
                  >
                    🕉️ {product.deity}
                  </Badge>
                )}
              </div>
            </div>

            {/* Price */}
            <div
              className="rounded-xl p-4 border"
              style={{
                borderColor: "oklch(0.78 0.14 75 / 0.25)",
                background: "oklch(0.99 0.008 80)",
              }}
              data-ocid="product_detail.price_panel"
            >
              <div className="flex items-baseline gap-2">
                <span
                  className="font-heading font-black text-3xl"
                  style={{ color: colorAccent }}
                >
                  ₹{price.toLocaleString()}
                </span>
                {variantLabel && (
                  <span
                    className="text-xs font-body"
                    style={{ color: "oklch(0.55 0.08 40)" }}
                  >
                    ({variantLabel})
                  </span>
                )}
              </div>
              <p
                className="text-xs font-body mt-1"
                style={{ color: "oklch(0.55 0.08 40)" }}
              >
                ✓ Inclusive of puja energization &amp; lab certification
              </p>
            </div>

            {/* Quantity + Actions */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span
                  className="text-sm font-heading font-semibold"
                  style={{ color: "oklch(0.45 0.10 40)" }}
                >
                  Qty:
                </span>
                <div
                  className="flex items-center border rounded-lg overflow-hidden"
                  style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                >
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 hover:bg-muted transition-colors font-bold text-sm"
                    data-ocid="product_detail.qty_minus"
                  >
                    −
                  </button>
                  <span
                    className="px-4 py-2 font-heading font-semibold text-sm border-x"
                    style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                  >
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2 hover:bg-muted transition-colors font-bold text-sm"
                    data-ocid="product_detail.qty_plus"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-3 rounded-xl font-heading font-bold text-sm flex items-center justify-center gap-2 border transition-all hover:shadow-md"
                  style={{
                    borderColor: colorAccent,
                    color: colorAccent,
                    background: "transparent",
                  }}
                  data-ocid="product_detail.add_to_cart_button"
                >
                  <ShoppingCart className="h-4 w-4" /> Add to Cart
                </button>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex-1 py-3 rounded-xl font-heading font-bold text-sm transition-all hover:shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${colorAccent}, oklch(0.58 0.18 40))`,
                    color: "white",
                  }}
                  data-ocid="product_detail.buy_now_button"
                >
                  Buy Now ⚡
                </button>
              </div>
            </div>

            {/* Accordion Details */}
            <div
              className="rounded-xl border overflow-hidden"
              style={{
                borderColor: "oklch(0.78 0.14 75 / 0.25)",
                background: "oklch(0.99 0.008 80)",
              }}
              data-ocid="product_detail.accordion_section"
            >
              <div className="px-4">
                <AccordionItem title="✨ Benefits & Significance" defaultOpen>
                  <ul className="space-y-1.5 pt-1">
                    {product.benefits.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span style={{ color: colorAccent }}>•</span> {b}
                      </li>
                    ))}
                  </ul>
                </AccordionItem>

                <AccordionItem title="🔥 Energization Details">
                  <p>
                    {product.energizationDetails ||
                      product.energizationProcess ||
                      "Energized by qualified priests through traditional Vedic puja rituals including mantra japa, abhishek and havan."}
                  </p>
                </AccordionItem>

                <AccordionItem title="📐 Specifications">
                  {product.specifications ? (
                    <table className="w-full text-xs">
                      <tbody>
                        {Object.entries(product.specifications).map(
                          ([k, v]) => (
                            <tr
                              key={k}
                              className="border-b"
                              style={{ borderColor: "oklch(0.90 0.01 80)" }}
                            >
                              <td
                                className="py-1.5 pr-4 font-heading font-semibold capitalize"
                                style={{ color: "oklch(0.35 0.10 25)" }}
                              >
                                {k}
                              </td>
                              <td className="py-1.5">{v}</td>
                            </tr>
                          ),
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <div className="space-y-1">
                      {product.material && (
                        <p>
                          <strong>Material:</strong> {product.material}
                        </p>
                      )}
                      {product.dimensions && (
                        <p>
                          <strong>Dimensions:</strong> {product.dimensions}
                        </p>
                      )}
                      {product.weight && (
                        <p>
                          <strong>Weight:</strong> {product.weight}
                        </p>
                      )}
                      {product.beadCount && (
                        <p>
                          <strong>Bead Count:</strong> {product.beadCount}
                        </p>
                      )}
                      {product.gemstone && (
                        <p>
                          <strong>Gemstone:</strong> {product.gemstone}
                        </p>
                      )}
                      {product.ingredients && (
                        <p>
                          <strong>Ingredients:</strong>{" "}
                          {product.ingredients.join(", ")}
                        </p>
                      )}
                    </div>
                  )}
                </AccordionItem>

                <AccordionItem title="🌿 Care Instructions">
                  <p>
                    {product.careInstructions ||
                      "Keep in a clean, sacred place. Avoid contact with harsh chemicals. Clean with pure water or milk."}
                  </p>
                </AccordionItem>

                <AccordionItem title="📿 How to Wear / Use">
                  <p>
                    {product.usageRitual ||
                      product.spiritualUse ||
                      "Use with devotion and a pure heart. Perform daily puja if possible. Maintain regular mantra practice while wearing."}
                  </p>
                </AccordionItem>

                {isYantra && (
                  <AccordionItem title="🏠 Placement & Mantra">
                    <div className="space-y-2">
                      <p>
                        <strong>Placement:</strong> Place on a raised platform
                        in the northeast (Ishan) corner of your home or office,
                        facing east or north.
                      </p>
                      <p>
                        <strong>Direction:</strong> The yantra should face you
                        when you sit for puja.
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <p
                          className="flex-1 text-xs font-body italic"
                          style={{ color: "oklch(0.40 0.10 30)" }}
                        >
                          "ॐ श्रीं ह्रीं क्लीं त्रिभुवनमहालक्ष्म्यै अस्माकं दारिद्र्यं नाशय प्रचुर
                          धन देहि देहि क्लीं ह्रीं श्रीं ॐ"
                        </p>
                        <SpeakerButton
                          text="Om Shreem Hreem Kleem Tribhuvanamahala kshmyai Asmakam Daaridriyam Nashaya Prachur Dhan Dehi Dehi Kleem Hreem Shreem Om"
                          size="sm"
                        />
                      </div>
                    </div>
                  </AccordionItem>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-12" data-ocid="product_detail.reviews_section">
          <h2
            className="font-heading font-bold text-xl mb-5"
            style={{ color: "oklch(0.30 0.10 25)" }}
          >
            ⭐ Customer Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PLACEHOLDER_REVIEWS.map((review, i) => (
              <div
                key={review.name}
                className="rounded-xl border p-5"
                style={{
                  borderColor: "oklch(0.78 0.14 75 / 0.2)",
                  background: "oklch(0.98 0.010 80)",
                }}
                data-ocid={`product_detail.review.item.${i + 1}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p
                      className="font-heading font-semibold text-sm"
                      style={{ color: "oklch(0.22 0.08 22)" }}
                    >
                      {review.name}
                    </p>
                    <p
                      className="text-xs font-body"
                      style={{ color: "oklch(0.60 0.06 50)" }}
                    >
                      {review.location}
                    </p>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <p
                  className="text-xs font-body leading-relaxed"
                  style={{ color: "oklch(0.45 0.08 40)" }}
                >
                  "{review.text}"
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-12" data-ocid="product_detail.related_section">
            <h2
              className="font-heading font-bold text-xl mb-5"
              style={{ color: "oklch(0.30 0.10 25)" }}
            >
              🌟 Related Products
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {relatedProducts.map((p) => (
                <RelatedProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
