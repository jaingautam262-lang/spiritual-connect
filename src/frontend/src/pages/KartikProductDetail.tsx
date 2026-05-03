import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  RefreshCw,
  Shield,
  ShoppingCart,
  Star,
  Truck,
  Zap,
} from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { KARTIK_PRODUCTS, type KartikProduct } from "../data/kartikJewelsData";
import { useCartStore } from "../stores/cartStore";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}

function categoryToKeyword(category: string, name: string): string {
  const lname = name.toLowerCase();
  if (lname.includes("rudraksha")) return "rudraksha-mala-spiritual";
  if (lname.includes("karungali")) return "ebony-wood-mala-spiritual";
  if (lname.includes("bracelet")) return "crystal-healing-bracelet";
  if (lname.includes("anklet")) return "crystal-anklet-gemstone";
  if (lname.includes("mala")) return "prayer-mala-beads-spiritual";
  if (lname.includes("pendant") || lname.includes("locket"))
    return "spiritual-pendant-necklace";
  if (lname.includes("combo") || lname.includes("set"))
    return "spiritual-jewelry-set";
  if (
    lname.includes("horse") ||
    lname.includes("tortoise") ||
    lname.includes("pyrite")
  )
    return "vastu-lucky-charm";
  switch (category) {
    case "Bracelets":
      return "crystal-healing-bracelet";
    case "Karungali":
      return "ebony-wood-mala-spiritual";
    case "Pendants":
      return "spiritual-pendant-necklace";
    case "Malas":
      return "prayer-mala-beads-spiritual";
    case "Combos":
      return "spiritual-jewelry-set";
    case "Anklets":
      return "crystal-anklet-gemstone";
    default:
      return "spiritual-jewelry";
  }
}

function getProductDescription(product: KartikProduct): string {
  const lname = product.name.toLowerCase();
  if (lname.includes("rudraksha")) {
    return "Sacred Rudraksha beads, revered in Hindu traditions, carry the divine energy of Lord Shiva. Each bead is hand-selected for quality and energized through Vedic rituals to amplify spiritual protection, mental clarity, and inner peace. Wearing this piece daily promotes positive vibrations and helps ward off negative energies.";
  }
  if (lname.includes("karungali")) {
    return "Karungali (Ebony Wood) is a highly sacred wood in South Indian spiritual traditions, known for its powerful protective properties. This piece is crafted from authentic ebony wood beads and blessed by temple priests to create a spiritual shield around the wearer, attracting divine grace and removing obstacles from one's path.";
  }
  if (lname.includes("hanuman") || lname.includes("hanumanji")) {
    return "Lord Hanuman, the embodiment of strength, devotion, and courage, blesses this sacred piece with his divine energy. Wearing this pendant or jewelry invokes Hanuman's protection, removes fear, and grants immense physical and mental strength to overcome life's challenges. A must-have for devotees seeking divine courage.";
  }
  if (
    lname.includes("shiv") ||
    lname.includes("shiva") ||
    lname.includes("trishul")
  ) {
    return "Infused with the transcendental energy of Lord Shiva, this sacred piece represents cosmic consciousness and divine transformation. The Trishul (trident) symbolizes the three fundamental forces — creation, preservation, and destruction — bringing balance and spiritual awakening. Ideal for seekers on the path of self-realization.";
  }
  if (lname.includes("krishna")) {
    return "Lord Krishna's divine presence blesses this sacred piece with love, wisdom, and protection. Devotees who wear this experience an enhancement of intuition, joy, and spiritual alignment. The piece carries the vibration of Vrindavan and helps the wearer connect with the divine consciousness of Lord Krishna throughout daily life.";
  }
  if (lname.includes("khatushyam") || lname.includes("shyam")) {
    return "Shri Khatu Shyam Ji, the benevolent deity revered across North India, bestows his divine blessings through this sacred piece. Known as 'Haare Ka Sahara' — the support of the defeated — this piece brings hope, prosperity, and miraculous grace to those who wear it with sincere devotion.";
  }
  if (lname.includes("bracelet")) {
    return "Handcrafted with authentic natural crystals and sacred materials, this energized bracelet serves as a powerful spiritual companion for daily wear. Each bead is cleansed and charged according to Vedic traditions to maximize its healing and protective properties. Wear on the left hand to receive its full spiritual benefits.";
  }
  if (lname.includes("anklet")) {
    return "Crafted from genuine gemstone beads, this anklet combines aesthetic beauty with spiritual potency. Gemstone anklets in the Hindu tradition are believed to channel earth energies upward through the body's energy centers (chakras), promoting grounding, emotional stability, and overall well-being for the wearer.";
  }
  if (lname.includes("mala")) {
    return "This sacred mala is crafted from authentic materials and has been energized through traditional Vedic rituals. Malas are used for japa (mantra repetition), meditation, and as a protective amulet. Each bead has been carefully selected and strung to create a spiritually charged tool for deepening your sadhana practice.";
  }
  if (lname.includes("combo")) {
    return "This specially curated spiritual combo set brings together complementary sacred pieces to create a powerful synergy of divine energies. Each item in this set has been individually energized and together they form a comprehensive spiritual protection and blessing package, ideal as a devotional gift or personal sadhana tool.";
  }
  return `This sacred spiritual piece from KartikJewels has been crafted with authentic materials and energized through traditional Vedic rituals. Designed to invoke divine blessings, provide spiritual protection, and enhance positive energies in the wearer's life. Each piece is quality-certified and comes with the promise of authenticity and spiritual significance.`;
}

function getMaterial(product: KartikProduct): string {
  const lname = product.name.toLowerCase();
  if (lname.includes("silver")) return "Sterling Silver / Silver Plated";
  if (lname.includes("gold")) return "Gold Plated / Brass";
  if (lname.includes("karungali")) return "Ebony Wood (Karungali)";
  if (lname.includes("rudraksha")) return "Natural Rudraksha Beads";
  if (lname.includes("tulsi")) return "Tulsi Wood Beads";
  if (lname.includes("pyrite")) return "Natural Pyrite Stone";
  if (lname.includes("quartz") || lname.includes("crystal"))
    return "Natural Crystal / Quartz";
  if (lname.includes("lava")) return "Lava Stone";
  return "Natural Materials / Alloy";
}

// ─── Star Rating ──────────────────────────────────────────────────────────────

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  if (rating === 0) return null;
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={`star-${i}`}
          size={size}
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

// ─── Related Product Mini-Card ─────────────────────────────────────────────────

function RelatedCard({
  product,
  index,
}: {
  product: KartikProduct;
  index: number;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const keyword = categoryToKeyword(product.category, product.name);

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      addItem({
        id: product.id,
        name: product.name,
        price: product.salePrice,
        category: product.category,
      });
      toast.success("Added to cart!", {
        description: product.name,
        duration: 2500,
      });
    },
    [addItem, product],
  );

  return (
    <Link
      to="/kartik-shop/$id"
      params={{ id: product.id }}
      data-ocid={`kartik-product-detail.related_item.${index}`}
      className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={`https://source.unsplash.com/300x300/?${keyword}&sig=${product.id}`}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://placehold.co/300x300/f5e6c8/8b4513?text=${encodeURIComponent(product.category)}`;
          }}
        />
        {product.discountPercent > 0 && (
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500 text-white leading-none">
              -{product.discountPercent}%
            </span>
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col gap-2">
        <p
          className="text-xs font-semibold leading-tight line-clamp-2"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          {product.name}
        </p>
        <div className="flex items-center justify-between gap-1 mt-auto">
          <span
            className="font-bold text-sm"
            style={{ color: "oklch(0.60 0.18 42)" }}
          >
            {formatPrice(product.salePrice)}
          </span>
          <button
            type="button"
            onClick={handleAddToCart}
            data-ocid={`kartik-product-detail.related_add_button.${index}`}
            className="text-[10px] px-2 py-1 rounded text-white transition-opacity hover:opacity-90"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.2 48) 0%, oklch(0.60 0.18 38) 100%)",
            }}
          >
            + Cart
          </button>
        </div>
      </div>
    </Link>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function KartikProductDetail() {
  const { id } = useParams({ from: "/kartik-shop/$id" });
  const product = KARTIK_PRODUCTS.find((p) => p.id === id);
  const addItem = useCartStore((s) => s.addItem);
  const [activeThumb, setActiveThumb] = useState(0);

  if (!product) {
    return (
      <div
        data-ocid="kartik-product-detail.not_found"
        className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4"
      >
        <span className="text-6xl">🙏</span>
        <h1
          className="text-2xl font-bold"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          Product Not Found
        </h1>
        <p className="text-muted-foreground text-sm text-center max-w-xs">
          The product you're looking for doesn't exist or may have been removed.
        </p>
        <Link to="/kartik-shop">
          <Button
            data-ocid="kartik-product-detail.back_button"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.2 48) 0%, oklch(0.60 0.18 38) 100%)",
              color: "white",
              border: "none",
            }}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to KartikJewels
          </Button>
        </Link>
      </div>
    );
  }

  const keyword = categoryToKeyword(product.category, product.name);
  const thumbVariants = ["", "&portrait", "&landscape"];
  const description = getProductDescription(product);
  const material = getMaterial(product);

  const relatedProducts = KARTIK_PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category,
  ).slice(0, 4);

  const handleAddToCart = () => {
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
  };

  return (
    <div
      data-ocid="kartik-product-detail.page"
      className="min-h-screen bg-background"
    >
      {/* ── BREADCRUMB ── */}
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-foreground transition-colors">
            Shop
          </Link>
          <ChevronRight size={12} />
          <Link
            to="/kartik-shop"
            className="hover:text-foreground transition-colors"
          >
            KartikJewels
          </Link>
          <ChevronRight size={12} />
          <span className="text-foreground font-medium line-clamp-1 max-w-[200px]">
            {product.name}
          </span>
        </div>
      </div>

      {/* ── PRODUCT SECTION ── */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* ── LEFT: Images ── */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-square bg-muted">
              <img
                src={`https://source.unsplash.com/600x600/?${keyword}${thumbVariants[activeThumb]}&sig=${product.id}-${activeThumb}`}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    `https://placehold.co/600x600/f5e6c8/8b4513?text=${encodeURIComponent(product.category)}`;
                }}
              />
              {product.discountPercent > 0 && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-sm font-bold bg-red-500 text-white shadow">
                    -{product.discountPercent}% OFF
                  </span>
                </div>
              )}
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold shadow"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.78 0.14 75) 0%, oklch(0.68 0.2 48) 100%)",
                      color: "oklch(0.20 0.05 25)",
                    }}
                  >
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {thumbVariants.map((variant, i) => (
                <button
                  key={variant}
                  type="button"
                  onClick={() => setActiveThumb(i)}
                  data-ocid={`kartik-product-detail.thumb_${i + 1}`}
                  className={`flex-1 aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    activeThumb === i
                      ? "border-amber-500 shadow-md"
                      : "border-border hover:border-amber-300"
                  }`}
                >
                  <img
                    src={`https://source.unsplash.com/120x120/?${keyword}${variant}&sig=${product.id}-${i}`}
                    alt={`${product.name} view ${i + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        `https://placehold.co/120x120/f5e6c8/8b4513?text=${encodeURIComponent(product.category)}`;
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Product Info ── */}
          <div className="flex flex-col gap-5">
            {/* Category + Badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant="secondary"
                className="text-xs font-semibold"
                data-ocid="kartik-product-detail.category_badge"
              >
                {product.category}
              </Badge>
              {product.badge && (
                <span
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.78 0.14 75) 0%, oklch(0.68 0.2 48) 100%)",
                    color: "oklch(0.20 0.05 25)",
                  }}
                >
                  ✦ {product.badge}
                </span>
              )}
            </div>

            {/* Product Name */}
            <h1
              className="font-bold text-2xl md:text-3xl leading-tight"
              style={{ color: "oklch(0.25 0.10 22)" }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating > 0 && (
              <div className="flex items-center gap-2">
                <StarRating rating={product.rating} size={16} />
                <span
                  className="font-semibold text-sm"
                  style={{ color: "oklch(0.60 0.18 42)" }}
                >
                  {product.rating}
                </span>
                {product.reviewCount > 0 && (
                  <span className="text-sm text-muted-foreground">
                    ({product.reviewCount} reviews)
                  </span>
                )}
              </div>
            )}

            <Separator />

            {/* Pricing */}
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="font-bold text-3xl"
                style={{ color: "oklch(0.60 0.18 42)" }}
                data-ocid="kartik-product-detail.sale_price"
              >
                {formatPrice(product.salePrice)}
              </span>
              {product.regularPrice > product.salePrice && (
                <>
                  <span className="text-lg line-through text-muted-foreground">
                    {formatPrice(product.regularPrice)}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-600">
                    {product.discountPercent}% OFF
                  </span>
                </>
              )}
            </div>

            {/* EMI note */}
            {product.salePrice > 499 && (
              <p className="text-xs text-muted-foreground">
                ✓ or 3 interest-free EMI of{" "}
                <span className="font-semibold text-foreground">
                  {formatPrice(Math.ceil(product.salePrice / 3))}
                </span>{" "}
                /month
              </p>
            )}

            <Separator />

            {/* Description */}
            <div>
              <h2
                className="font-semibold text-sm mb-2"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                About this product
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>

            {/* Product Info Row */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Category", value: product.category },
                { label: "Material", value: material },
                {
                  label: "Availability",
                  value: product.inStock ? "In Stock" : "Out of Stock",
                },
                { label: "Product ID", value: product.id.toUpperCase() },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg bg-muted/40 border border-border px-3 py-2"
                >
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                    {item.label}
                  </p>
                  <p
                    className="text-xs font-semibold"
                    style={{
                      color:
                        item.label === "Availability" && product.inStock
                          ? "oklch(0.50 0.15 145)"
                          : "oklch(0.35 0.12 25)",
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleAddToCart}
                data-ocid="kartik-product-detail.add_to_cart_button"
                className="flex-1 h-12 text-base font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.2 48) 0%, oklch(0.60 0.18 38) 100%)",
                  color: "white",
                  border: "none",
                }}
              >
                <ShoppingCart size={18} className="mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                data-ocid="kartik-product-detail.buy_now_button"
                className="flex-1 h-12 text-base font-semibold border-amber-500 hover:bg-amber-50"
                style={{ color: "oklch(0.60 0.18 38)" }}
                onClick={handleAddToCart}
              >
                Buy Now
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { icon: <Shield size={16} />, label: "100% Authentic" },
                { icon: <Zap size={16} />, label: "Energized" },
                { icon: <Truck size={16} />, label: "Free Shipping" },
                { icon: <RefreshCw size={16} />, label: "7-Day Returns" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex flex-col items-center gap-1 rounded-lg border py-2.5 px-1 text-center"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.97 0.015 85) 0%, oklch(0.94 0.025 80) 100%)",
                    borderColor: "oklch(0.78 0.14 75 / 0.3)",
                    color: "oklch(0.55 0.15 42)",
                  }}
                >
                  {badge.icon}
                  <span
                    className="text-[10px] font-semibold leading-tight"
                    style={{ color: "oklch(0.35 0.12 25)" }}
                  >
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SPIRITUAL BENEFITS ── */}
        <div className="mt-12 rounded-2xl border border-border overflow-hidden">
          <div
            className="px-6 py-4"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.35 0.12 25) 0%, oklch(0.28 0.10 22) 100%)",
            }}
          >
            <h2
              className="font-bold text-lg"
              style={{ color: "oklch(0.97 0.015 85)" }}
            >
              ✦ Spiritual Benefits & Significance
            </h2>
          </div>
          <div className="bg-card p-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Energized through Vedic rituals by expert priests",
                "Promotes positive energy and spiritual protection",
                "Enhances focus during meditation and prayer",
                "Attracts blessings, prosperity, and divine grace",
                "Removes negative energies and obstacles",
                "Strengthens connection with chosen deity or tradition",
              ].map((benefit) => (
                <div key={benefit} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: "oklch(0.60 0.18 42)" }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RELATED PRODUCTS ── */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2
              className="font-bold text-xl mb-6"
              style={{ color: "oklch(0.35 0.12 25)" }}
              data-ocid="kartik-product-detail.related_section"
            >
              Related Products
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((rp, i) => (
                <RelatedCard key={rp.id} product={rp} index={i + 1} />
              ))}
            </div>
          </div>
        )}

        {/* ── BACK LINK ── */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/kartik-shop"
            data-ocid="kartik-product-detail.back_to_shop_link"
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: "oklch(0.60 0.18 42)" }}
          >
            <ArrowLeft size={16} />
            Back to KartikJewels Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
