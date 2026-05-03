import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle,
  Package,
  RefreshCw,
  ShoppingCart,
  Star,
  Truck,
  Zap,
} from "lucide-react";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";
import {
  dhwaniCategories,
  dhwaniConcerns,
  dhwaniProducts,
} from "../data/dhwaniShopData";
import { useCartStore } from "../stores/cartStore";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
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

// ─── Category icon mapping (for display) ────────────────────────────────────

const STONE_GRADIENTS: Record<string, string> = {
  "Rose Quartz": "from-pink-50 to-rose-100",
  Amethyst: "from-purple-50 to-violet-100",
  Citrine: "from-yellow-50 to-amber-100",
  "Lapis Lazuli": "from-blue-50 to-indigo-100",
  Pyrite: "from-yellow-100 to-amber-200",
  "Green Aventurine": "from-green-50 to-emerald-100",
  Moonstone: "from-slate-50 to-blue-50",
  "Clear Quartz": "from-sky-50 to-cyan-100",
  "Seven Chakra": "from-red-50 via-yellow-50 to-violet-100",
  "Black Tourmaline": "from-neutral-100 to-slate-200",
  Selenite: "from-stone-50 to-neutral-100",
  "Green Jade": "from-green-50 to-emerald-100",
  Turquoise: "from-teal-50 to-cyan-100",
  Obsidian: "from-neutral-100 to-stone-200",
  Garnet: "from-red-50 to-rose-200",
  Labradorite: "from-indigo-50 to-slate-100",
  "Tiger Eye": "from-amber-50 to-orange-100",
  Carnelian: "from-orange-50 to-red-100",
  "Yellow Aventurine": "from-yellow-50 to-amber-100",
  Sodalite: "from-blue-50 to-indigo-100",
};

// ─── Concern color config ─────────────────────────────────────────────────────

const CONCERN_STYLES: Record<
  string,
  { label: string; icon: string; bg: string; text: string; border: string }
> = {
  Pregnancy: {
    label: "Pregnancy",
    icon: "🤰",
    bg: "bg-pink-50",
    text: "text-pink-700",
    border: "border-pink-200",
  },
  "Abundance Wealth & Business": {
    label: "Wealth & Business",
    icon: "💰",
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-yellow-200",
  },
  "Love Relationship & Marriage": {
    label: "Love & Relationship",
    icon: "❤️",
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
  },
  "Health & Well Being": {
    label: "Health & Wellbeing",
    icon: "💚",
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
  },
  "Education Job & Career": {
    label: "Education & Career",
    icon: "🎓",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  "Depression Confidence & Mental Wellness": {
    label: "Mental Wellness",
    icon: "🧘",
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
  },
};

// ─── Deity compatibility by category/stone ───────────────────────────────────

function getDeities(
  category: string,
  stone?: string,
): { name: string; icon: string }[] {
  const stoneDeity: Record<string, { name: string; icon: string }[]> = {
    "Rose Quartz": [
      { name: "Lakshmi", icon: "🪷" },
      { name: "Radha", icon: "🌸" },
    ],
    Amethyst: [
      { name: "Shivaji", icon: "🕉️" },
      { name: "Durga", icon: "⚔️" },
    ],
    Citrine: [
      { name: "Lakshmi", icon: "🪷" },
      { name: "Ganeshji", icon: "🐘" },
    ],
    Pyrite: [
      { name: "Lakshmi", icon: "🪷" },
      { name: "Kubera", icon: "💛" },
    ],
    "Seven Chakra": [
      { name: "Shivaji", icon: "🕉️" },
      { name: "Ganeshji", icon: "🐘" },
    ],
    "Black Tourmaline": [
      { name: "Shivaji", icon: "🕉️" },
      { name: "Durga", icon: "⚔️" },
    ],
    Moonstone: [
      { name: "Durga", icon: "⚔️" },
      { name: "Lakshmi", icon: "🪷" },
    ],
    "Green Jade": [
      { name: "Lakshmi", icon: "🪷" },
      { name: "Ganeshji", icon: "🐘" },
    ],
    "Lapis Lazuli": [
      { name: "Shivaji", icon: "🕉️" },
      { name: "Saraswati", icon: "🎵" },
    ],
    "Green Aventurine": [
      { name: "Lakshmi", icon: "🪷" },
      { name: "Ganeshji", icon: "🐘" },
    ],
    Garnet: [
      { name: "Durga", icon: "⚔️" },
      { name: "Shivaji", icon: "🕉️" },
    ],
    Turquoise: [
      { name: "Shivaji", icon: "🕉️" },
      { name: "Durga", icon: "⚔️" },
    ],
    Selenite: [
      { name: "Lakshmi", icon: "🪷" },
      { name: "Saraswati", icon: "🎵" },
    ],
  };

  const categoryDeity: Record<string, { name: string; icon: string }[]> = {
    "crystal-malas": [
      { name: "Shivaji", icon: "🕉️" },
      { name: "Hanumanji", icon: "🙏" },
    ],
    pendants: [
      { name: "Ganeshji", icon: "🐘" },
      { name: "Hanumanji", icon: "🙏" },
    ],
    "puja-products": [
      { name: "Ganeshji", icon: "🐘" },
      { name: "Lakshmi", icon: "🪷" },
    ],
    owls: [
      { name: "Lakshmi", icon: "🪷" },
      { name: "Saraswati", icon: "🎵" },
    ],
    "parad-mercury": [
      { name: "Shivaji", icon: "🕉️" },
      { name: "Lakshmi", icon: "🪷" },
    ],
    "healing-pyramids": [
      { name: "Shivaji", icon: "🕉️" },
      { name: "Ganeshji", icon: "🐘" },
    ],
    rings: [
      { name: "Ganeshji", icon: "🐘" },
      { name: "Lakshmi", icon: "🪷" },
    ],
    rudraksha: [
      { name: "Shivaji", icon: "🕉️" },
      { name: "Hanumanji", icon: "🙏" },
    ],
    yantras: [
      { name: "Lakshmi", icon: "🪷" },
      { name: "Ganeshji", icon: "🐘" },
    ],
    shivling: [
      { name: "Shivaji", icon: "🕉️" },
      { name: "Parvati", icon: "🌺" },
    ],
    shankh: [
      { name: "Lakshmi", icon: "🪷" },
      { name: "Vishnu", icon: "🪈" },
    ],
    "kamdhenu-cow": [
      { name: "Lakshmi", icon: "🪷" },
      { name: "Ganeshji", icon: "🐘" },
    ],
    elephants: [
      { name: "Ganeshji", icon: "🐘" },
      { name: "Lakshmi", icon: "🪷" },
    ],
    "zodiac-sign": [
      { name: "Ganeshji", icon: "🐘" },
      { name: "Durga", icon: "⚔️" },
    ],
    "vastu-products": [
      { name: "Ganeshji", icon: "🐘" },
      { name: "Lakshmi", icon: "🪷" },
    ],
    turtles: [
      { name: "Lakshmi", icon: "🪷" },
      { name: "Vishnu", icon: "🪈" },
    ],
    "crystal-trees": [
      { name: "Lakshmi", icon: "🪷" },
      { name: "Ganeshji", icon: "🐘" },
    ],
    "selenite-plates": [
      { name: "Lakshmi", icon: "🪷" },
      { name: "Saraswati", icon: "🎵" },
    ],
  };

  if (stone && stoneDeity[stone]) return stoneDeity[stone];
  return (
    categoryDeity[category] ?? [
      { name: "Ganeshji", icon: "🐘" },
      { name: "Lakshmi", icon: "🪷" },
    ]
  );
}

// ─── Generate description if missing ─────────────────────────────────────────

function getDescription(
  name: string,
  category: string,
  stone?: string,
  concern?: string[],
): string {
  const concernLabel =
    concern && concern.length > 0
      ? (dhwaniConcerns.find((c) => c.id === concern[0])?.label ?? "")
      : "";
  const catLabel =
    dhwaniCategories.find((c) => c.id === category)?.name ?? category;
  if (stone) {
    return `This ${name} is crafted from genuine ${stone} — a powerful stone revered for its spiritual energy. Personally Abhimantrit by Dhwani Jain with your Name & DOB for maximum benefit. Ideal for ${concernLabel || catLabel}, it brings positive vibrations and cosmic alignment to your daily life.`;
  }
  return `The ${name} is a sacred ${catLabel} item carefully curated and energized by Dhwani Jain with 20+ years of expertise. Each piece undergoes genuine ritual energization${concernLabel ? `, making it especially powerful for ${concernLabel}` : ""}. Wear or place it to invite divine blessings, protection, and spiritual growth.`;
}

// ─── Mini Product Card for Related ────────────────────────────────────────────

function RelatedCard({
  id,
  name,
  category,
  price,
  mrp,
  rating,
  stone,
  index,
}: {
  id: string;
  name: string;
  category: string;
  price: number;
  mrp?: number;
  rating?: number;
  stone?: string;
  index: number;
}) {
  const catInfo = dhwaniCategories.find((c) => c.id === category);
  const gradient = stone
    ? (STONE_GRADIENTS[stone] ?? "from-amber-50 to-orange-100")
    : "from-amber-50 to-orange-100";
  const discountPct =
    mrp && mrp > price ? Math.round((1 - price / mrp) * 100) : null;

  return (
    <a
      href={`/dhwani-shop/${id}`}
      data-ocid={`dhwani-product.related.${index}`}
      className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:shadow-md transition-shadow duration-200"
    >
      <div
        className={`aspect-square bg-gradient-to-br ${gradient} flex flex-col items-center justify-center relative`}
      >
        <span className="text-3xl opacity-70">{catInfo?.icon ?? "✨"}</span>
        <span className="text-xs text-muted-foreground mt-1 px-2 text-center truncate max-w-full">
          {stone ?? catInfo?.name}
        </span>
        {discountPct && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            {discountPct}% off
          </span>
        )}
      </div>
      <div className="p-3 flex flex-col gap-1.5">
        <p
          className="font-heading font-semibold text-xs leading-tight line-clamp-2 group-hover:text-primary transition-colors"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          {name}
        </p>
        {rating && (
          <div className="flex items-center gap-1">
            <StarRating rating={rating} size={10} />
          </div>
        )}
        <div className="flex items-baseline gap-1.5">
          <span
            className="font-heading font-bold text-sm"
            style={{ color: "oklch(0.68 0.2 48)" }}
          >
            {formatPrice(price)}
          </span>
          {mrp && mrp > price && (
            <span className="text-xs line-through text-muted-foreground">
              {formatPrice(mrp)}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DhwaniProductDetail() {
  const { id } = useParams({ from: "/dhwani-shop/$id" });
  const addItem = useCartStore((s) => s.addItem);

  const product = useMemo(() => dhwaniProducts.find((p) => p.id === id), [id]);

  const related = useMemo(() => {
    if (!product) return [];
    return dhwaniProducts
      .filter(
        (p) =>
          p.id !== product.id &&
          (p.category === product.category ||
            (product.concern &&
              p.concern?.some((c) => product.concern?.includes(c)))),
      )
      .slice(0, 4);
  }, [product]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
    });
    toast.success(`${product.name} added to cart`, {
      description: formatPrice(product.price),
      duration: 2500,
    });
  }, [addItem, product]);

  if (!product) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        data-ocid="dhwani-product.not_found"
      >
        <span className="text-6xl">🔮</span>
        <h1
          className="font-heading font-bold text-2xl"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          Product not found
        </h1>
        <p className="text-muted-foreground text-sm">
          This product may no longer be available.
        </p>
        <a
          href="/dhwani-shop"
          data-ocid="dhwani-product.back_link"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft size={14} /> Back to Dhwani Astro
        </a>
      </div>
    );
  }

  const catInfo = dhwaniCategories.find((c) => c.id === product.category);
  const gradient = product.stone
    ? (STONE_GRADIENTS[product.stone] ?? "from-amber-50 to-orange-100")
    : "from-amber-50 to-orange-100";

  const discountPct =
    product.discount ??
    (product.mrp && product.mrp > product.price
      ? Math.round((1 - product.price / product.mrp) * 100)
      : null);

  const description =
    product.description ??
    getDescription(
      product.name,
      product.category,
      product.stone,
      product.concern,
    );

  const deities = getDeities(product.category, product.stone);

  const thumbnailSeeds = [1, 2, 3];

  return (
    <div className="min-h-screen bg-background" data-ocid="dhwani-product.page">
      {/* ── Breadcrumb ── */}
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs text-muted-foreground">
          <a href="/" className="hover:text-foreground transition-colors">
            Home
          </a>
          <span>/</span>
          <a href="/shop" className="hover:text-foreground transition-colors">
            Shop
          </a>
          <span>/</span>
          <a
            href="/dhwani-shop"
            className="hover:text-foreground transition-colors"
          >
            Dhwani Astro
          </a>
          <span>/</span>
          <span
            className="font-medium text-foreground truncate max-w-[180px]"
            title={product.name}
          >
            {product.name}
          </span>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back link */}
        <a
          href="/dhwani-shop"
          data-ocid="dhwani-product.back_link"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Back to Dhwani Astro
        </a>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* ── LEFT: Image column ── */}
          <div className="flex flex-col gap-4">
            {/* Main image */}
            <div
              className={`relative rounded-2xl overflow-hidden aspect-square bg-gradient-to-br ${gradient} flex flex-col items-center justify-center border border-border`}
              data-ocid="dhwani-product.main_image"
            >
              {/* Decorative rings */}
              <div
                className="absolute top-[-30px] right-[-30px] w-[180px] h-[180px] rounded-full opacity-10"
                style={{ border: "2px solid oklch(0.68 0.2 48)" }}
              />
              <div
                className="absolute bottom-[-20px] left-[-20px] w-[120px] h-[120px] rounded-full opacity-10"
                style={{ border: "2px solid oklch(0.78 0.14 75)" }}
              />
              <span className="text-8xl opacity-80 mb-2 relative z-10">
                {catInfo?.icon ?? "✨"}
              </span>
              {product.stone && (
                <span
                  className="relative z-10 text-sm font-heading font-semibold px-4 py-1.5 rounded-full"
                  style={{
                    background: "oklch(0.68 0.2 48 / 0.15)",
                    color: "oklch(0.45 0.15 35)",
                    border: "1px solid oklch(0.68 0.2 48 / 0.3)",
                  }}
                >
                  {product.stone}
                </span>
              )}
              {/* Abhimantrit badge */}
              <div
                className="absolute top-4 right-4 text-[10px] font-semibold px-2 py-1 rounded-full"
                style={{
                  background: "oklch(0.35 0.12 25 / 0.85)",
                  color: "oklch(0.88 0.12 75)",
                }}
              >
                ✦ Abhimantrit
              </div>
            </div>

            {/* Gallery thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              {thumbnailSeeds.map((i) => (
                <div
                  key={i}
                  data-ocid={`dhwani-product.thumbnail.${i}`}
                  className={`aspect-square rounded-lg overflow-hidden border-2 cursor-pointer bg-gradient-to-br ${gradient} flex items-center justify-center transition-all hover:scale-105`}
                  style={{
                    borderColor:
                      i === 1
                        ? "oklch(0.68 0.2 48)"
                        : "oklch(0.78 0.14 75 / 0.3)",
                  }}
                >
                  <span className="text-2xl opacity-60">
                    {catInfo?.icon ?? "✨"}
                  </span>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <CheckCircle size={15} />, label: "100% Natural" },
                { icon: <Zap size={15} />, label: "Astrologer Recommended" },
                { icon: <Truck size={15} />, label: "Free Shipping" },
                { icon: <RefreshCw size={15} />, label: "Easy Returns" },
              ].map((b) => (
                <div
                  key={b.label}
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-border bg-card text-xs font-medium text-muted-foreground"
                >
                  <span style={{ color: "oklch(0.68 0.2 48)" }}>{b.icon}</span>
                  {b.label}
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Product info column ── */}
          <div className="flex flex-col gap-5" data-ocid="dhwani-product.info">
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2">
              {catInfo && (
                <Badge
                  variant="secondary"
                  className="text-xs font-medium"
                  data-ocid="dhwani-product.category_badge"
                >
                  {catInfo.icon} {catInfo.name}
                </Badge>
              )}
              {product.isNew && (
                <Badge
                  className="text-xs bg-blue-500 hover:bg-blue-600"
                  data-ocid="dhwani-product.new_badge"
                >
                  New Arrival
                </Badge>
              )}
              {product.badge && !product.isNew && (
                <Badge
                  className="text-xs"
                  style={{
                    background: "oklch(0.68 0.2 48)",
                    color: "white",
                  }}
                  data-ocid="dhwani-product.badge"
                >
                  {product.badge}
                </Badge>
              )}
              {product.stone && (
                <span
                  className="inline-flex items-center text-xs px-2.5 py-0.5 rounded-full font-medium"
                  style={{
                    background: "oklch(0.75 0.12 295 / 0.12)",
                    color: "oklch(0.45 0.18 290)",
                    border: "1px solid oklch(0.75 0.12 295 / 0.3)",
                  }}
                  data-ocid="dhwani-product.stone_badge"
                >
                  💎 {product.stone}
                </span>
              )}
            </div>

            {/* Product name */}
            <h1
              className="font-heading font-bold text-2xl md:text-3xl leading-tight"
              style={{ color: "oklch(0.25 0.10 22)" }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div
                className="flex items-center gap-3"
                data-ocid="dhwani-product.rating"
              >
                <StarRating rating={product.rating} size={16} />
                <span
                  className="font-heading font-semibold text-sm"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  {product.rating.toFixed(1)}
                </span>
                {product.reviews && (
                  <span className="text-xs text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                )}
              </div>
            )}

            <Separator />

            {/* Pricing */}
            <div
              className="flex items-baseline gap-3"
              data-ocid="dhwani-product.price"
            >
              <span
                className="font-heading font-bold text-3xl"
                style={{ color: "oklch(0.68 0.2 48)" }}
              >
                {formatPrice(product.price)}
              </span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-base line-through text-muted-foreground">
                  {formatPrice(product.mrp)}
                </span>
              )}
              {discountPct && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-500 text-white">
                  {discountPct}% OFF
                </span>
              )}
            </div>
            {product.mrp && product.mrp > product.price && (
              <p className="text-xs text-green-600 font-medium -mt-3">
                You save {formatPrice(product.mrp - product.price)}
              </p>
            )}

            {/* Description */}
            <p
              className="text-sm leading-relaxed text-muted-foreground"
              data-ocid="dhwani-product.description"
            >
              {description}
            </p>

            {/* Concern tags */}
            {product.concern && product.concern.length > 0 && (
              <div>
                <p
                  className="font-heading text-xs font-semibold mb-2 uppercase tracking-wide"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  Works for
                </p>
                <div
                  className="flex flex-wrap gap-2"
                  data-ocid="dhwani-product.concern_tags"
                >
                  {product.concern.map((c) => {
                    const style = CONCERN_STYLES[c];
                    if (!style) return null;
                    return (
                      <span
                        key={c}
                        className={`inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border font-medium ${style.bg} ${style.text} ${style.border}`}
                      >
                        {style.icon} {style.label}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Deity compatibility */}
            <div>
              <p
                className="font-heading text-xs font-semibold mb-2 uppercase tracking-wide"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                Deity Compatibility
              </p>
              <div
                className="flex items-center gap-3"
                data-ocid="dhwani-product.deities"
              >
                {deities.map((d) => (
                  <div
                    key={d.name}
                    className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg border border-border bg-card min-w-[64px]"
                  >
                    <span className="text-xl">{d.icon}</span>
                    <span
                      className="text-xs font-heading font-semibold"
                      style={{ color: "oklch(0.35 0.12 25)" }}
                    >
                      {d.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                data-ocid="dhwani-product.add_to_cart_button"
                onClick={handleAddToCart}
                className="flex-1 btn-spiritual text-sm font-semibold h-12 hover:opacity-90 transition-opacity"
              >
                <ShoppingCart size={16} className="mr-2" />
                Add to Cart — {formatPrice(product.price)}
              </Button>
              <Button
                variant="outline"
                size="lg"
                data-ocid="dhwani-product.consult_button"
                asChild
                className="flex-1 h-12 text-sm font-semibold border-2"
                style={{
                  borderColor: "oklch(0.68 0.2 48 / 0.5)",
                  color: "oklch(0.45 0.15 35)",
                }}
              >
                <a href="/astrologer">
                  <Package size={16} className="mr-2" />
                  Consult Expert
                </a>
              </Button>
            </div>

            {/* Abhimantrit note */}
            <div
              className="rounded-xl p-4 text-sm flex gap-3 items-start"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.97 0.015 85) 0%, oklch(0.94 0.025 80) 100%)",
                border: "1px solid oklch(0.78 0.14 75 / 0.3)",
              }}
            >
              <span className="text-2xl flex-shrink-0">🙏</span>
              <div>
                <p
                  className="font-heading font-semibold text-xs mb-1"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  Personally Abhimantrit by Dhwani Jain
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Each product is energized with your Name & DOB for maximum
                  benefit. Our experts guide you on Shubh Muhurat, mantras, and
                  cleansing after delivery.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <section className="mt-14" data-ocid="dhwani-product.related_section">
            <div className="flex items-center gap-3 mb-6">
              <h2
                className="font-heading font-bold text-xl"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                You May Also Like
              </h2>
              <span className="text-xs text-muted-foreground">
                Similar products from Dhwani Astro
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((r, i) => (
                <RelatedCard
                  key={r.id}
                  id={r.id}
                  name={r.name}
                  category={r.category}
                  price={r.price}
                  mrp={r.mrp}
                  rating={r.rating}
                  stone={r.stone}
                  index={i + 1}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── Back link footer ── */}
        <div className="mt-10 pt-6 border-t border-border flex items-center justify-between">
          <a
            href="/dhwani-shop"
            data-ocid="dhwani-product.footer_back_link"
            className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            style={{ color: "oklch(0.45 0.15 35)" }}
          >
            <ArrowLeft size={14} />
            Back to Dhwani Astro Collection
          </a>
          <span className="text-xs text-muted-foreground">
            Product ID: {product.id}
          </span>
        </div>
      </div>
    </div>
  );
}
