import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const DEITIES = [
  "All",
  "Ganesha",
  "Shiva",
  "Lakshmi",
  "Saraswati",
  "Durga",
  "Krishna",
  "Hanuman",
  "Ram",
  "Vishnu",
  "Brahma",
  "Radha",
  "Parvati",
];
const MATERIALS = [
  "All",
  "Brass",
  "Marble",
  "Panchdhatu",
  "Clay",
  "Resin",
  "Wood",
];
const SIZES = [
  "All",
  "Small (3-6 inch)",
  "Medium (6-12 inch)",
  "Large (12+ inch)",
];

interface Murti {
  id: string;
  deity: string;
  name: string;
  material: string;
  size: string;
  price: number;
  originalPrice: number;
  description: string;
  emoji: string;
}

const MURTIS: Murti[] = [
  {
    id: "m1",
    deity: "Ganesha",
    name: "Brass Ganesha Idol",
    material: "Brass",
    size: "Small (3-6 inch)",
    price: 899,
    originalPrice: 1499,
    description: "Handcrafted brass Ganesha, remover of obstacles",
    emoji: "🐘",
  },
  {
    id: "m2",
    deity: "Ganesha",
    name: "Marble Ganesha Murti",
    material: "Marble",
    size: "Medium (6-12 inch)",
    price: 2499,
    originalPrice: 3999,
    description: "Pristine white marble Ganesha for home temple",
    emoji: "🐘",
  },
  {
    id: "m3",
    deity: "Shiva",
    name: "Shivling Brass",
    material: "Brass",
    size: "Small (3-6 inch)",
    price: 699,
    originalPrice: 1199,
    description: "Sacred Shivling in pure brass",
    emoji: "🕉",
  },
  {
    id: "m4",
    deity: "Shiva",
    name: "Nataraja Panchdhatu",
    material: "Panchdhatu",
    size: "Large (12+ inch)",
    price: 5999,
    originalPrice: 8999,
    description: "Dancing Shiva in five-metal alloy",
    emoji: "💃",
  },
  {
    id: "m5",
    deity: "Lakshmi",
    name: "Lakshmi Brass Idol",
    material: "Brass",
    size: "Medium (6-12 inch)",
    price: 1899,
    originalPrice: 2999,
    description: "Goddess of wealth and prosperity",
    emoji: "🪷",
  },
  {
    id: "m6",
    deity: "Lakshmi",
    name: "Lakshmi-Ganesha Pair",
    material: "Panchdhatu",
    size: "Medium (6-12 inch)",
    price: 3499,
    originalPrice: 5499,
    description: "Auspicious pair for Diwali puja",
    emoji: "✨",
  },
  {
    id: "m7",
    deity: "Saraswati",
    name: "Saraswati Marble Murti",
    material: "Marble",
    size: "Medium (6-12 inch)",
    price: 2799,
    originalPrice: 4299,
    description: "Goddess of knowledge and arts",
    emoji: "🎵",
  },
  {
    id: "m8",
    deity: "Durga",
    name: "Mahishasuramardini Brass",
    material: "Brass",
    size: "Large (12+ inch)",
    price: 4999,
    originalPrice: 7499,
    description: "Durga Maa in victory posture",
    emoji: "⚔️",
  },
  {
    id: "m9",
    deity: "Krishna",
    name: "Bal Krishna Butter Thief",
    material: "Brass",
    size: "Small (3-6 inch)",
    price: 799,
    originalPrice: 1299,
    description: "Adorable Bal Krishna with makhan",
    emoji: "💛",
  },
  {
    id: "m10",
    deity: "Krishna",
    name: "Radha Krishna Pair",
    material: "Panchdhatu",
    size: "Large (12+ inch)",
    price: 6999,
    originalPrice: 10499,
    description: "Divine couple in eternal love",
    emoji: "💑",
  },
  {
    id: "m11",
    deity: "Hanuman",
    name: "Panchamukha Hanuman Brass",
    material: "Brass",
    size: "Medium (6-12 inch)",
    price: 2299,
    originalPrice: 3699,
    description: "Five-faced Hanuman for protection",
    emoji: "🙏",
  },
  {
    id: "m12",
    deity: "Ram",
    name: "Ram Darbar Panchdhatu",
    material: "Panchdhatu",
    size: "Large (12+ inch)",
    price: 7499,
    originalPrice: 11999,
    description: "Ram, Sita, Lakshman, and Hanuman",
    emoji: "👑",
  },
  {
    id: "m13",
    deity: "Vishnu",
    name: "Vishnu Shaligram Brass",
    material: "Brass",
    size: "Medium (6-12 inch)",
    price: 3299,
    originalPrice: 4999,
    description: "Lord Vishnu in cosmic form",
    emoji: "🐚",
  },
  {
    id: "m14",
    deity: "Brahma",
    name: "Brahma Clay Idol",
    material: "Clay",
    size: "Small (3-6 inch)",
    price: 599,
    originalPrice: 999,
    description: "The Creator in traditional clay",
    emoji: "📿",
  },
  {
    id: "m15",
    deity: "Radha",
    name: "Radha Rani Marble",
    material: "Marble",
    size: "Medium (6-12 inch)",
    price: 2199,
    originalPrice: 3499,
    description: "Beautiful Radha Rani in white marble",
    emoji: "🌸",
  },
  {
    id: "m16",
    deity: "Parvati",
    name: "Parvati Brass Murti",
    material: "Brass",
    size: "Medium (6-12 inch)",
    price: 1799,
    originalPrice: 2899,
    description: "Goddess Parvati, consort of Shiva",
    emoji: "🌺",
  },
  {
    id: "m17",
    deity: "Ganesha",
    name: "Ganesha Resin Showpiece",
    material: "Resin",
    size: "Small (3-6 inch)",
    price: 449,
    originalPrice: 799,
    description: "Colorful resin Ganesha for decor",
    emoji: "🎨",
  },
  {
    id: "m18",
    deity: "Krishna",
    name: "Flute Krishna Wood Carving",
    material: "Wood",
    size: "Medium (6-12 inch)",
    price: 1299,
    originalPrice: 2199,
    description: "Handcarved teakwood Krishna playing flute",
    emoji: "🎶",
  },
];

export default function MurtiPage() {
  const [search, setSearch] = useState("");
  const [selectedDeity, setSelectedDeity] = useState("All");
  const [selectedMaterial, setSelectedMaterial] = useState("All");
  const [selectedSize, setSelectedSize] = useState("All");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return MURTIS.filter((m) => {
      const matchSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.deity.toLowerCase().includes(q);
      const matchDeity = selectedDeity === "All" || m.deity === selectedDeity;
      const matchMaterial =
        selectedMaterial === "All" || m.material === selectedMaterial;
      const matchSize = selectedSize === "All" || m.size === selectedSize;
      return matchSearch && matchDeity && matchMaterial && matchSize;
    });
  }, [search, selectedDeity, selectedMaterial, selectedSize]);

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.14 0.04 30)" }}>
      {/* Hero */}
      <div
        className="py-12 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.08 25) 0%, oklch(0.22 0.1 40) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-5xl mb-3">🪬</div>
          <h1
            className="text-4xl font-bold mb-2"
            style={{
              color: "oklch(0.78 0.14 75)",
              fontFamily: "Cinzel, serif",
            }}
          >
            Sacred Murti &amp; Deity Statues
          </h1>
          <p className="text-lg" style={{ color: "oklch(0.72 0.06 70)" }}>
            Brass · Marble · Panchdhatu · Hand-Crafted with Devotion
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-3 h-4 w-4"
              style={{ color: "oklch(0.55 0.05 60)" }}
            />
            <Input
              data-ocid="murti.search_input"
              placeholder="Search by deity or product name…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
              style={{
                background: "oklch(0.20 0.06 30)",
                border: "1px solid oklch(0.35 0.06 40)",
                color: "oklch(0.88 0.04 75)",
              }}
            />
          </div>

          <div className="overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              <span
                className="text-xs font-semibold py-2 px-1"
                style={{ color: "oklch(0.62 0.04 60)" }}
              >
                Deity:
              </span>
              {DEITIES.map((d) => (
                <Button
                  key={d}
                  data-ocid={`murti.deity_filter_${d.toLowerCase()}`}
                  size="sm"
                  onClick={() => setSelectedDeity(d)}
                  className="rounded-full text-xs"
                  style={{
                    background:
                      selectedDeity === d
                        ? "oklch(0.62 0.18 48)"
                        : "oklch(0.22 0.06 30)",
                    color:
                      selectedDeity === d ? "white" : "oklch(0.72 0.05 65)",
                    border: `1px solid ${selectedDeity === d ? "oklch(0.62 0.18 48)" : "oklch(0.35 0.05 35)"}`,
                  }}
                >
                  {d}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex gap-2 flex-wrap">
              <span
                className="text-xs font-semibold py-2 px-1"
                style={{ color: "oklch(0.62 0.04 60)" }}
              >
                Material:
              </span>
              {MATERIALS.map((m) => (
                <Button
                  key={m}
                  data-ocid={`murti.material_filter_${m.toLowerCase()}`}
                  size="sm"
                  onClick={() => setSelectedMaterial(m)}
                  className="rounded-full text-xs"
                  style={{
                    background:
                      selectedMaterial === m
                        ? "oklch(0.45 0.15 200)"
                        : "oklch(0.22 0.06 30)",
                    color:
                      selectedMaterial === m ? "white" : "oklch(0.72 0.05 65)",
                    border: `1px solid ${selectedMaterial === m ? "oklch(0.45 0.15 200)" : "oklch(0.35 0.05 35)"}`,
                  }}
                >
                  {m}
                </Button>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              <span
                className="text-xs font-semibold py-2 px-1"
                style={{ color: "oklch(0.62 0.04 60)" }}
              >
                Size:
              </span>
              {SIZES.map((s) => (
                <Button
                  key={s}
                  data-ocid={`murti.size_filter_${s.replace(/[^a-z]/gi, "_").toLowerCase()}`}
                  size="sm"
                  onClick={() => setSelectedSize(s)}
                  className="rounded-full text-xs"
                  style={{
                    background:
                      selectedSize === s
                        ? "oklch(0.35 0.12 25)"
                        : "oklch(0.22 0.06 30)",
                    color: selectedSize === s ? "white" : "oklch(0.72 0.05 65)",
                    border: `1px solid ${selectedSize === s ? "oklch(0.35 0.12 25)" : "oklch(0.35 0.05 35)"}`,
                  }}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm mb-6" style={{ color: "oklch(0.55 0.04 60)" }}>
          Showing {filtered.length} of {MURTIS.length} murtis
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div data-ocid="murti.empty_state" className="text-center py-20">
            <div className="text-5xl mb-4">🙏</div>
            <p className="text-lg" style={{ color: "oklch(0.55 0.04 60)" }}>
              No murtis match your filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((m, i) => (
              <motion.div
                key={m.id}
                data-ocid={`murti.item.${i + 1}`}
                className="rounded-xl overflow-hidden flex flex-col"
                style={{
                  background: "oklch(0.20 0.06 30)",
                  border: "1px solid oklch(0.30 0.07 35)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Image Placeholder */}
                <div
                  className="h-44 flex items-center justify-center text-6xl"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.16 0.06 30), oklch(0.24 0.09 40))",
                  }}
                >
                  {m.emoji}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3
                    className="font-semibold text-sm mb-1 line-clamp-2"
                    style={{ color: "oklch(0.88 0.05 75)" }}
                  >
                    {m.name}
                  </h3>
                  <p
                    className="text-xs mb-3 flex-1"
                    style={{ color: "oklch(0.58 0.04 60)" }}
                  >
                    {m.description}
                  </p>
                  <div className="flex gap-1 flex-wrap mb-3">
                    <Badge
                      className="text-xs px-2"
                      style={{
                        background: "oklch(0.62 0.18 48 / 0.2)",
                        color: "oklch(0.78 0.14 75)",
                      }}
                    >
                      {m.deity}
                    </Badge>
                    <Badge
                      className="text-xs px-2"
                      style={{
                        background: "oklch(0.30 0.08 35)",
                        color: "oklch(0.72 0.04 65)",
                      }}
                    >
                      {m.material}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span
                        className="font-bold"
                        style={{ color: "oklch(0.68 0.2 48)" }}
                      >
                        ₹{m.price.toLocaleString()}
                      </span>
                      <span
                        className="text-xs ml-1 line-through"
                        style={{ color: "oklch(0.42 0.04 50)" }}
                      >
                        ₹{m.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <span
                      className="text-xs"
                      style={{ color: "oklch(0.58 0.04 60)" }}
                    >
                      {m.size.split(" ")[0]}
                    </span>
                  </div>
                  <Button
                    data-ocid={`murti.add_to_cart.${i + 1}`}
                    size="sm"
                    className="w-full rounded-lg text-xs font-semibold"
                    style={{
                      background: "oklch(0.62 0.18 48)",
                      color: "white",
                    }}
                    onClick={() => toast.success(`${m.name} added to cart!`)}
                  >
                    <ShoppingCart size={12} className="mr-1" /> Add to Cart
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
