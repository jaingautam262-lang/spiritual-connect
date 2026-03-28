import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { Filter, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "../backend";
import { useGetAllProducts } from "../hooks/useQueries";
import { useCartStore } from "../stores/cartStore";

const CATEGORIES = [
  "All",
  "Gemstones",
  "Yantras",
  "Bracelets",
  "Ritual Items",
  "Rudraksha",
  "Nav Grah Murti",
  "Nav Grah Yatra",
  "Devi Devta Yatra",
];

const CATEGORY_ICONS: Record<string, string> = {
  Gemstones: "💎",
  Yantras: "🔯",
  Bracelets: "📿",
  "Ritual Items": "🪔",
  All: "✨",
  Rudraksha: "🟤",
  "Nav Grah Murti": "🪐",
  "Nav Grah Yatra": "🛕",
  "Devi Devta Yatra": "🌸",
};

const PLACEHOLDER_PRODUCTS: Product[] = [
  // Existing products
  {
    id: "p1",
    name: "Green Aventurine Pendant",
    category: "Gemstones",
    price: 799,
    description:
      "Known as the Stone of Opportunity, energized for 108 hours by top astrologers.",
    benefits: "Luck, prosperity, career growth",
    astrologicalPurpose: "Venus, Mercury",
    stock: BigInt(50),
    createdAt: BigInt(0),
  },
  {
    id: "p2",
    name: "Lapis Lazuli Tumble",
    category: "Gemstones",
    price: 599,
    description: "Enhances intuition, wisdom, and mental clarity.",
    benefits: "Wisdom, intuition, clarity",
    astrologicalPurpose: "Saturn, Jupiter",
    stock: BigInt(30),
    createdAt: BigInt(0),
  },
  {
    id: "p3",
    name: "Pyrite Cluster",
    category: "Gemstones",
    price: 1299,
    description:
      "Fool's Gold — attracts wealth and protects against negativity.",
    benefits: "Wealth, protection, confidence",
    astrologicalPurpose: "Sun, Mars",
    stock: BigInt(20),
    createdAt: BigInt(0),
  },
  {
    id: "p4",
    name: "Amethyst Crystal",
    category: "Gemstones",
    price: 899,
    description: "Reduces stress, increases focus and spiritual awareness.",
    benefits: "Stress relief, focus, spirituality",
    astrologicalPurpose: "Saturn, Jupiter",
    stock: BigInt(40),
    createdAt: BigInt(0),
  },
  {
    id: "p5",
    name: "Opal Pendant",
    category: "Gemstones",
    price: 1599,
    description:
      "Associated with Venus, boosts beauty, love, and emotional healing.",
    benefits: "Love, beauty, emotional healing",
    astrologicalPurpose: "Venus",
    stock: BigInt(15),
    createdAt: BigInt(0),
  },
  {
    id: "p6",
    name: "Tiger Eye Bracelet",
    category: "Bracelets",
    price: 699,
    description: "Enhances courage, confidence, and personal power.",
    benefits: "Courage, confidence, protection",
    astrologicalPurpose: "Sun, Mars",
    stock: BigInt(35),
    createdAt: BigInt(0),
  },
  {
    id: "p7",
    name: "Dhan Yog Bracelet",
    category: "Bracelets",
    price: 1999,
    description:
      "Combination of 6 crystals: Pyrite, Tiger Eye, Citrine, Quartz, Green Aventurine, Green Jade.",
    benefits: "Wealth attraction, prosperity",
    astrologicalPurpose: "Jupiter, Venus, Sun",
    stock: BigInt(25),
    createdAt: BigInt(0),
  },
  {
    id: "p8",
    name: "Navratna Bracelet",
    category: "Bracelets",
    price: 2499,
    description:
      "Nine gemstones representing all nine planets for complete astrological balance.",
    benefits: "Overall prosperity, planetary balance",
    astrologicalPurpose: "All 9 planets",
    stock: BigInt(10),
    createdAt: BigInt(0),
  },
  {
    id: "p9",
    name: "Shree Yantra",
    category: "Yantras",
    price: 1499,
    description:
      "Sacred geometry for wealth, prosperity, and spiritual growth.",
    benefits: "Wealth, prosperity, spiritual growth",
    astrologicalPurpose: "Venus, Jupiter",
    stock: BigInt(20),
    createdAt: BigInt(0),
  },
  {
    id: "p10",
    name: "Kuber Yantra",
    category: "Yantras",
    price: 999,
    description:
      "Yantra of Lord Kuber for financial abundance and business success.",
    benefits: "Financial abundance, business success",
    astrologicalPurpose: "Jupiter, Mercury",
    stock: BigInt(30),
    createdAt: BigInt(0),
  },
  {
    id: "p11",
    name: "Ganesh Yantra",
    category: "Yantras",
    price: 799,
    description: "Remove obstacles and bring success in all endeavors.",
    benefits: "Obstacle removal, success",
    astrologicalPurpose: "Ketu, Jupiter",
    stock: BigInt(40),
    createdAt: BigInt(0),
  },
  {
    id: "p12",
    name: "Vastu Yantra",
    category: "Yantras",
    price: 1199,
    description: "Harmonize the energy of your home or office.",
    benefits: "Vastu correction, harmony",
    astrologicalPurpose: "All planets",
    stock: BigInt(25),
    createdAt: BigInt(0),
  },
  {
    id: "p13",
    name: "Rudraksha Mala (108 beads)",
    category: "Ritual Items",
    price: 1299,
    description:
      "Sacred 5-mukhi Rudraksha mala for meditation and spiritual practice.",
    benefits: "Spiritual growth, meditation, peace",
    astrologicalPurpose: "Shiva, Jupiter",
    stock: BigInt(20),
    createdAt: BigInt(0),
  },
  {
    id: "p14",
    name: "Puja Kit Deluxe",
    category: "Ritual Items",
    price: 899,
    description: "Complete puja kit with incense, camphor, kumkum, and more.",
    benefits: "Complete puja essentials",
    astrologicalPurpose: "All deities",
    stock: BigInt(50),
    createdAt: BigInt(0),
  },
  {
    id: "p15",
    name: "Citrine Crystal Point",
    category: "Gemstones",
    price: 749,
    description: "The merchant's stone for abundance and positive energy.",
    benefits: "Abundance, positivity, creativity",
    astrologicalPurpose: "Sun, Jupiter",
    stock: BigInt(35),
    createdAt: BigInt(0),
  },
  {
    id: "p16",
    name: "Rose Quartz Heart",
    category: "Gemstones",
    price: 549,
    description: "Stone of unconditional love and emotional healing.",
    benefits: "Love, compassion, emotional healing",
    astrologicalPurpose: "Venus",
    stock: BigInt(45),
    createdAt: BigInt(0),
  },
  {
    id: "p17",
    name: "Black Tourmaline",
    category: "Gemstones",
    price: 699,
    description: "Powerful protection stone against negative energies.",
    benefits: "Protection, grounding, purification",
    astrologicalPurpose: "Saturn",
    stock: BigInt(30),
    createdAt: BigInt(0),
  },
  {
    id: "p18",
    name: "Raj Yog Bracelet",
    category: "Bracelets",
    price: 2999,
    description: "Premium bracelet for power, authority, and success.",
    benefits: "Power, authority, success",
    astrologicalPurpose: "Sun, Jupiter, Mars",
    stock: BigInt(15),
    createdAt: BigInt(0),
  },
  {
    id: "p19",
    name: "Dhoop Sticks Premium",
    category: "Ritual Items",
    price: 299,
    description: "Handmade premium dhoop sticks for puja and meditation.",
    benefits: "Purification, positive energy",
    astrologicalPurpose: "All deities",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "p20",
    name: "Brass Diya Set",
    category: "Ritual Items",
    price: 499,
    description: "Set of 5 brass diyas for daily puja and festivals.",
    benefits: "Auspiciousness, divine light",
    astrologicalPurpose: "Sun, Agni",
    stock: BigInt(60),
    createdAt: BigInt(0),
  },
  // Rudraksha products
  {
    id: "r1",
    name: "1 Mukhi Rudraksha",
    category: "Rudraksha",
    price: 5999,
    description:
      "Rare single-faced Rudraksha representing Lord Shiva. Bestows moksha and supreme consciousness.",
    benefits: "Moksha, supreme consciousness, divine blessings",
    astrologicalPurpose: "Sun, Shiva",
    stock: BigInt(5),
    createdAt: BigInt(0),
  },
  {
    id: "r2",
    name: "5 Mukhi Rudraksha",
    category: "Rudraksha",
    price: 299,
    description:
      "Most common and powerful Rudraksha for health, peace, and spiritual growth.",
    benefits: "Health, peace, spiritual growth, memory",
    astrologicalPurpose: "Jupiter, Shiva",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "r3",
    name: "7 Mukhi Rudraksha",
    category: "Rudraksha",
    price: 799,
    description:
      "Seven-faced Rudraksha for wealth, prosperity, and Goddess Lakshmi's blessings.",
    benefits: "Wealth, prosperity, business success",
    astrologicalPurpose: "Saturn, Lakshmi",
    stock: BigInt(40),
    createdAt: BigInt(0),
  },
  {
    id: "r4",
    name: "11 Mukhi Rudraksha",
    category: "Rudraksha",
    price: 2499,
    description:
      "Eleven-faced Rudraksha representing Lord Hanuman for courage and protection.",
    benefits: "Courage, protection, wisdom, adventure",
    astrologicalPurpose: "All planets, Hanuman",
    stock: BigInt(20),
    createdAt: BigInt(0),
  },
  {
    id: "r5",
    name: "14 Mukhi Rudraksha",
    category: "Rudraksha",
    price: 8999,
    description:
      "Fourteen-faced Rudraksha — the most powerful, representing Lord Hanuman and Shiva.",
    benefits: "Intuition, protection, spiritual power",
    astrologicalPurpose: "Saturn, Mars, Shiva",
    stock: BigInt(8),
    createdAt: BigInt(0),
  },
  {
    id: "r6",
    name: "Gauri Shankar Rudraksha",
    category: "Rudraksha",
    price: 3499,
    description:
      "Two naturally joined Rudrakshas representing Shiva and Parvati for marital harmony.",
    benefits: "Marital harmony, love, family peace",
    astrologicalPurpose: "Shiva, Parvati",
    stock: BigInt(15),
    createdAt: BigInt(0),
  },
  // Nav Grah Murti products
  {
    id: "ng1",
    name: "Surya (Sun) Murti",
    category: "Nav Grah Murti",
    price: 1299,
    description:
      "Brass idol of Lord Surya for health, vitality, and success. Energized with Surya mantras.",
    benefits: "Health, vitality, leadership, success",
    astrologicalPurpose: "Sun (Surya)",
    stock: BigInt(25),
    createdAt: BigInt(0),
  },
  {
    id: "ng2",
    name: "Chandra (Moon) Murti",
    category: "Nav Grah Murti",
    price: 1299,
    description:
      "Brass idol of Lord Chandra for mental peace, emotions, and intuition.",
    benefits: "Mental peace, emotional balance, intuition",
    astrologicalPurpose: "Moon (Chandra)",
    stock: BigInt(25),
    createdAt: BigInt(0),
  },
  {
    id: "ng3",
    name: "Mangal (Mars) Murti",
    category: "Nav Grah Murti",
    price: 1299,
    description:
      "Brass idol of Lord Mangal for courage, energy, and protection from Mangal dosha.",
    benefits: "Courage, energy, protection, property",
    astrologicalPurpose: "Mars (Mangal)",
    stock: BigInt(25),
    createdAt: BigInt(0),
  },
  {
    id: "ng4",
    name: "Budh (Mercury) Murti",
    category: "Nav Grah Murti",
    price: 1299,
    description:
      "Brass idol of Lord Budh for intelligence, communication, and business success.",
    benefits: "Intelligence, communication, business",
    astrologicalPurpose: "Mercury (Budh)",
    stock: BigInt(25),
    createdAt: BigInt(0),
  },
  {
    id: "ng5",
    name: "Guru (Jupiter) Murti",
    category: "Nav Grah Murti",
    price: 1499,
    description:
      "Brass idol of Lord Brihaspati for wisdom, knowledge, and spiritual growth.",
    benefits: "Wisdom, knowledge, prosperity, spirituality",
    astrologicalPurpose: "Jupiter (Guru)",
    stock: BigInt(25),
    createdAt: BigInt(0),
  },
  {
    id: "ng6",
    name: "Shukra (Venus) Murti",
    category: "Nav Grah Murti",
    price: 1299,
    description:
      "Brass idol of Lord Shukra for love, beauty, luxury, and artistic talents.",
    benefits: "Love, beauty, luxury, arts",
    astrologicalPurpose: "Venus (Shukra)",
    stock: BigInt(25),
    createdAt: BigInt(0),
  },
  {
    id: "ng7",
    name: "Shani (Saturn) Murti",
    category: "Nav Grah Murti",
    price: 1499,
    description:
      "Brass idol of Lord Shani for discipline, karma, and protection from Sade Sati.",
    benefits: "Discipline, karma balance, protection",
    astrologicalPurpose: "Saturn (Shani)",
    stock: BigInt(25),
    createdAt: BigInt(0),
  },
  {
    id: "ng8",
    name: "Rahu Murti",
    category: "Nav Grah Murti",
    price: 1299,
    description:
      "Brass idol of Rahu for protection from Rahu dosha and worldly success.",
    benefits: "Protection from Rahu dosha, ambition",
    astrologicalPurpose: "Rahu (North Node)",
    stock: BigInt(20),
    createdAt: BigInt(0),
  },
  {
    id: "ng9",
    name: "Ketu Murti",
    category: "Nav Grah Murti",
    price: 1299,
    description:
      "Brass idol of Ketu for spiritual liberation and protection from Ketu dosha.",
    benefits: "Spiritual liberation, moksha, intuition",
    astrologicalPurpose: "Ketu (South Node)",
    stock: BigInt(20),
    createdAt: BigInt(0),
  },
  // Nav Grah Yatra products
  {
    id: "ny1",
    name: "Surya Graha Yatra Photo",
    category: "Nav Grah Yatra",
    price: 499,
    description:
      "Sacred pilgrimage photo print of Surya Graha temple. Blessed and energized.",
    benefits: "Sun blessings, vitality, success",
    astrologicalPurpose: "Sun (Surya)",
    stock: BigInt(50),
    createdAt: BigInt(0),
  },
  {
    id: "ny2",
    name: "Navagraha Temple Yatra Set",
    category: "Nav Grah Yatra",
    price: 2999,
    description:
      "Complete set of 9 sacred Navagraha temple yatra photo prints from Tamil Nadu.",
    benefits: "All planetary blessings, complete harmony",
    astrologicalPurpose: "All 9 planets",
    stock: BigInt(30),
    createdAt: BigInt(0),
  },
  {
    id: "ny3",
    name: "Shani Shingnapur Yatra Photo",
    category: "Nav Grah Yatra",
    price: 599,
    description:
      "Sacred photo print from the famous Shani Shingnapur temple in Maharashtra.",
    benefits: "Saturn blessings, protection, karma",
    astrologicalPurpose: "Saturn (Shani)",
    stock: BigInt(40),
    createdAt: BigInt(0),
  },
  // Devi Devta Yatra products
  {
    id: "dd1",
    name: "Vaishno Devi Yatra Photo",
    category: "Devi Devta Yatra",
    price: 699,
    description:
      "Sacred photo print from the holy Vaishno Devi shrine in Jammu & Kashmir.",
    benefits: "Divine mother blessings, wish fulfillment",
    astrologicalPurpose: "Durga, Lakshmi, Saraswati",
    stock: BigInt(50),
    createdAt: BigInt(0),
  },
  {
    id: "dd2",
    name: "Tirupati Balaji Yatra Photo",
    category: "Devi Devta Yatra",
    price: 799,
    description:
      "Sacred photo print from the richest temple in the world — Tirupati Balaji.",
    benefits: "Wealth, prosperity, divine blessings",
    astrologicalPurpose: "Vishnu, Jupiter",
    stock: BigInt(50),
    createdAt: BigInt(0),
  },
  {
    id: "dd3",
    name: "Char Dham Yatra Photo Set",
    category: "Devi Devta Yatra",
    price: 1999,
    description:
      "Complete set of 4 sacred Char Dham yatra photo prints: Badrinath, Dwarka, Puri, Rameshwaram.",
    benefits: "Moksha, complete divine blessings",
    astrologicalPurpose: "All deities",
    stock: BigInt(25),
    createdAt: BigInt(0),
  },
  {
    id: "dd4",
    name: "Kashi Vishwanath Yatra Photo",
    category: "Devi Devta Yatra",
    price: 599,
    description:
      "Sacred photo print from the ancient Kashi Vishwanath temple in Varanasi.",
    benefits: "Shiva blessings, moksha, liberation",
    astrologicalPurpose: "Shiva, Saturn",
    stock: BigInt(45),
    createdAt: BigInt(0),
  },
];

export default function SpiritualShop() {
  const { data: products = [], isLoading } = useGetAllProducts();
  const addItem = useCartStore((s) => s.addItem);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const displayProducts = products.length > 0 ? products : PLACEHOLDER_PRODUCTS;
  const filtered =
    selectedCategory === "All"
      ? displayProducts
      : displayProducts.filter((p) => p.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div>
      <div
        className="relative w-full overflow-hidden"
        style={{ minHeight: "280px" }}
      >
        <img
          src="/assets/generated/shop-banner.dim_1200x400.png"
          alt="Spiritual Shop"
          className="w-full h-72 object-cover"
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.18 0.06 25 / 0.5), oklch(0.12 0.04 20 / 0.75))",
          }}
        >
          <h1
            className="font-decorative text-3xl md:text-5xl font-bold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            💎 Spiritual Shop
          </h1>
          <p
            className="font-body text-lg"
            style={{ color: "oklch(0.85 0.04 75)" }}
          >
            Energized gemstones, yantras, Rudraksha & sacred items
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-heading text-xs font-semibold transition-all"
              style={{
                background:
                  selectedCategory === cat
                    ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                    : "oklch(0.94 0.025 80)",
                color:
                  selectedCategory === cat ? "white" : "oklch(0.35 0.12 25)",
                border: `1px solid ${selectedCategory === cat ? "transparent" : "oklch(0.78 0.14 75 / 0.2)"}`,
              }}
            >
              {CATEGORY_ICONS[cat]} {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }, (_, i) => i).map((i) => (
              <Skeleton key={i} className="h-64 rounded-2xl" />
            ))}
          </div>
        ) : (
          <>
            <p className="text-center text-sm text-muted-foreground mb-4 font-body">
              Showing {filtered.length} product
              {filtered.length !== 1 ? "s" : ""}
              {selectedCategory !== "All" ? ` in ${selectedCategory}` : ""}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <div key={product.id} className="temple-card flex flex-col">
                  <Link to="/shop/$id" params={{ id: product.id }}>
                    <div
                      className="h-40 flex items-center justify-center text-5xl"
                      style={{ background: "oklch(0.94 0.025 80)" }}
                    >
                      {CATEGORY_ICONS[product.category] || "✨"}
                    </div>
                  </Link>
                  <div className="p-4 flex flex-col flex-1">
                    <span
                      className="text-xs font-heading px-2 py-0.5 rounded-full mb-2 self-start"
                      style={{
                        background: "oklch(0.68 0.20 48 / 0.1)",
                        color: "oklch(0.55 0.16 48)",
                      }}
                    >
                      {product.category}
                    </span>
                    <Link to="/shop/$id" params={{ id: product.id }}>
                      <h3
                        className="font-heading font-bold text-sm mb-1 hover:underline"
                        style={{ color: "oklch(0.22 0.08 22)" }}
                      >
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs font-body text-muted-foreground mb-3 flex-1 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className="font-heading font-bold"
                        style={{ color: "oklch(0.68 0.20 48)" }}
                      >
                        ₹{product.price.toFixed(0)}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-heading font-semibold transition-all hover:scale-105"
                        style={{
                          background:
                            "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                          color: "white",
                        }}
                      >
                        <ShoppingCart className="h-3 w-3" /> Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
