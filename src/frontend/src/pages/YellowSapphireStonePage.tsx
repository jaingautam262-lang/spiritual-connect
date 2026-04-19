import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/cartStore";
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Eye,
  Gem,
  Heart,
  HeartPulse,
  Phone,
  Search,
  Shield,
  Sparkles,
  Star,
  Sun,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Product Data ──────────────────────────────────────────────────────────────

interface YellowSapphireProduct {
  name: string;
  sku: string;
  grade: "A" | "B" | "C";
  price: number;
  mrp: number;
  savings: number;
}

const YS_PRODUCTS: YellowSapphireProduct[] = [
  {
    name: "Yellow Sapphire 3.20 Carat (Grade A)",
    sku: "YellowSapphire24112025/3.20CT",
    grade: "A",
    price: 28800,
    mrp: 36000,
    savings: 7200,
  },
  {
    name: "Yellow Sapphire 4.05 Carat (Grade A)",
    sku: "YellowSapphire24112025/4.05CT",
    grade: "A",
    price: 36450,
    mrp: 45562.5,
    savings: 9112.5,
  },
  {
    name: "Yellow Sapphire 3.65 Carat (Grade B)",
    sku: "YellowSapphire24112025/3.65CT",
    grade: "B",
    price: 16425,
    mrp: 20531.25,
    savings: 4106.25,
  },
  {
    name: "Yellow Sapphire 4.80 Carat (Grade B)",
    sku: "YellowSapphire24112025/4.80CT",
    grade: "B",
    price: 21600,
    mrp: 27000,
    savings: 5400,
  },
  {
    name: "Yellow Sapphire 5.25 Carat (Grade C)",
    sku: "YellowSapphire24112025/5.25CT",
    grade: "C",
    price: 18375,
    mrp: 22968.75,
    savings: 4593.75,
  },
  {
    name: "Yellow Sapphire 3.90 Carat (Grade A)",
    sku: "YellowSapphire24112025/3.90CT",
    grade: "A",
    price: 35100,
    mrp: 43875,
    savings: 8775,
  },
  {
    name: "Yellow Sapphire 5.45 Carat (Grade B)",
    sku: "YellowSapphire24112025/5.45CT",
    grade: "B",
    price: 24525,
    mrp: 30656.25,
    savings: 6131.25,
  },
  {
    name: "Yellow Sapphire 4.30 Carat (Grade A)",
    sku: "YellowSapphire24112025/4.30CT",
    grade: "A",
    price: 38700,
    mrp: 48375,
    savings: 9675,
  },
  {
    name: "Yellow Sapphire 6.00 Carat (Grade C)",
    sku: "YellowSapphire24112025/6.00CT",
    grade: "C",
    price: 21000,
    mrp: 26250,
    savings: 5250,
  },
  {
    name: "Yellow Sapphire 4.55 Carat (Grade B)",
    sku: "YellowSapphire24112025/4.55CT",
    grade: "B",
    price: 20475,
    mrp: 25593.75,
    savings: 5118.75,
  },
  {
    name: "Yellow Sapphire 5.90 Carat (Grade A)",
    sku: "YellowSapphire24112025/5.90CT",
    grade: "A",
    price: 53100,
    mrp: 66375,
    savings: 13275,
  },
  {
    name: "Yellow Sapphire 7.10 Carat (Grade B)",
    sku: "YellowSapphire24112025/7.10CT",
    grade: "B",
    price: 31950,
    mrp: 39937.5,
    savings: 7987.5,
  },
];

// ─── Constants ────────────────────────────────────────────────────────────────

const HIGHLIGHTS = [
  "Wisdom & Knowledge",
  "Prosperity & Wealth",
  "Marriage & Harmony",
  "Education & Growth",
];

const TABS = [
  { id: "about", label: "About" },
  { id: "who-should-wear", label: "Who Should Wear" },
  { id: "benefits", label: "Benefits" },
  { id: "how-to-wear", label: "How to Wear" },
  { id: "care-guide", label: "Care Guide" },
];

const BENEFITS = [
  {
    icon: Sun,
    title: "Wisdom & Knowledge",
    desc: "Connects with divine wisdom, enhances Vedic learning, and strengthens the guru-disciple bond",
    color: "text-yellow-600",
  },
  {
    icon: TrendingUp,
    title: "Prosperity & Wealth",
    desc: "Attracts abundant wealth, opens doors to high positions and life-changing opportunities",
    color: "text-amber-600",
  },
  {
    icon: Heart,
    title: "Marriage & Harmony",
    desc: "Blesses marriage, removes delays in finding a life partner, brings harmony in relationships",
    color: "text-rose-600",
  },
  {
    icon: BookOpen,
    title: "Academic Excellence",
    desc: "Expands philosophical thinking, improves academic performance and sound judgment",
    color: "text-blue-600",
  },
  {
    icon: HeartPulse,
    title: "Physical Health",
    desc: "Improves liver and digestive health, strengthens immunity and overall stamina",
    color: "text-green-600",
  },
  {
    icon: Trophy,
    title: "Recognition & Honours",
    desc: "Brings awards, recognition, and well-deserved honours in professional life",
    color: "text-yellow-700",
  },
];

const HOW_TO_WEAR_ROWS = [
  { field: "Weight", value: "1/10th of body weight in Ratti" },
  { field: "Metal", value: "Gold (only recommended metal)" },
  { field: "Finger", value: "Index finger of the right hand" },
  { field: "Day & Time", value: "Thursday morning during Guru hora" },
  { field: "Mantra", value: "Om Brim Brihaspataye Namah (108 times)" },
  { field: "Alt. Mantra", value: "Om Gram Grim Graum Sah Guruve Namah" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function GradeTag({ grade }: { grade: "A" | "B" | "C" }) {
  const colors: Record<string, string> = {
    A: "bg-yellow-100 text-yellow-800 border-yellow-300",
    B: "bg-blue-50 text-blue-800 border-blue-200",
    C: "bg-amber-50 text-amber-800 border-amber-200",
  };
  return (
    <span
      className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${colors[grade]}`}
    >
      Grade {grade}
    </span>
  );
}

function ProductCard({
  product,
  index,
}: {
  product: YellowSapphireProduct;
  index: number;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  function handleViewDetails() {
    addItem({
      id: product.sku,
      name: product.name,
      price: product.price,
      category: "Gemstone",
      variantName: `Grade ${product.grade}`,
    });
    setCartOpen(true);
  }

  return (
    <motion.div
      data-ocid={`yellow-sapphire.product.item.${index + 1}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: (index % 6) * 0.05 }}
      className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
    >
      {/* Card image area */}
      <div className="relative bg-gradient-to-br from-yellow-50 to-amber-100 h-36 flex items-center justify-center">
        <div className="text-5xl select-none">💛</div>
        <div className="absolute top-2 left-2">
          <Badge className="bg-yellow-700 text-white text-[10px] px-1.5 py-0.5 rounded">
            Certified
          </Badge>
        </div>
        <div className="absolute top-2 right-2">
          <Badge
            variant="destructive"
            className="text-[10px] px-1.5 py-0.5 font-bold"
          >
            20% OFF
          </Badge>
        </div>
      </div>

      {/* Card body */}
      <div className="p-3 flex flex-col flex-1 gap-1.5">
        <div className="flex items-start justify-between gap-1">
          <h3 className="font-body font-semibold text-foreground text-sm leading-snug line-clamp-2 flex-1">
            {product.name}
          </h3>
          <GradeTag grade={product.grade} />
        </div>
        <p className="text-[10px] text-muted-foreground font-mono truncate">
          SKU: {product.sku}
        </p>

        {/* Stars */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4].map((s) => (
            <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
          ))}
          <Star className="w-3 h-3 text-amber-300 fill-amber-100" />
          <span className="text-[10px] text-muted-foreground ml-0.5">
            (104)
          </span>
        </div>

        {/* Pricing */}
        <div className="mt-auto pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-yellow-700 font-bold text-base font-body">
              Rs.{" "}
              {product.price.toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}
            </span>
            <span className="text-muted-foreground text-xs line-through">
              Rs.{" "}
              {product.mrp.toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <p className="text-[11px] text-yellow-600 font-medium">
            Save Rs.{" "}
            {product.savings.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        <Button
          data-ocid={`yellow-sapphire.product.view_details.${index + 1}`}
          size="sm"
          className="w-full mt-1 bg-yellow-700 hover:bg-yellow-800 text-white text-xs font-body"
          onClick={handleViewDetails}
        >
          View Details
        </Button>
      </div>
    </motion.div>
  );
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      data-ocid={`yellow-sapphire.faq.item.${index + 1}`}
      className="border border-border rounded-xl overflow-hidden"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-card hover:bg-yellow-50/50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-body font-semibold text-foreground text-sm sm:text-base">
          {q}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-yellow-700 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-5 pb-4 pt-0 font-body text-muted-foreground text-sm leading-relaxed bg-yellow-50/30">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center mb-8">
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
        {title}
      </h2>
      <p className="font-body text-muted-foreground text-sm max-w-lg mx-auto">
        {subtitle}
      </p>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function YellowSapphireStonePage() {
  const [highlightIdx, setHighlightIdx] = useState(0);
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState<"All" | "A" | "B" | "C">(
    "All",
  );
  const [activeTab, setActiveTab] = useState("about");
  const tabsRef = useRef<HTMLDivElement>(null);

  // Cycle highlights
  useEffect(() => {
    const id = setInterval(
      () => setHighlightIdx((i) => (i + 1) % HIGHLIGHTS.length),
      2200,
    );
    return () => clearInterval(id);
  }, []);

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const { id } of TABS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const filtered = YS_PRODUCTS.filter((p) => {
    const matchSearch =
      search.trim() === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchGrade = gradeFilter === "All" || p.grade === gradeFilter;
    return matchSearch && matchGrade;
  });

  return (
    <div className="min-h-screen bg-background font-body">
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        data-ocid="yellow-sapphire.hero.section"
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.30 0.10 75) 0%, oklch(0.22 0.12 68) 40%, oklch(0.18 0.09 65) 100%)",
        }}
      >
        {/* Decorations */}
        <div className="absolute top-8 right-8 text-6xl opacity-20 select-none">
          💛
        </div>
        <div className="absolute bottom-8 left-6 text-4xl opacity-15 select-none">
          ✨
        </div>
        <div className="absolute top-1/2 right-1/4 text-3xl opacity-10 select-none">
          🌟
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 sm:py-20">
          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge className="bg-white/15 text-white border-white/30 text-xs backdrop-blur-sm">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              50,000+ Happy Customers
            </Badge>
            <Badge className="bg-white/15 text-white border-white/30 text-xs backdrop-blur-sm">
              <Eye className="w-3 h-3 mr-1" />
              45 people viewing now
            </Badge>
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">
            Yellow Sapphire{" "}
            <span style={{ color: "oklch(0.88 0.18 82)" }}>(Pukhraj)</span>{" "}
            Stone
          </h1>
          <p
            className="text-xl mb-2 font-display font-semibold"
            style={{ color: "oklch(0.84 0.12 78)" }}
          >
            पुखराज
          </p>
          <p
            className="text-base sm:text-lg mb-5 max-w-xl leading-relaxed"
            style={{ color: "oklch(0.88 0.06 75)" }}
          >
            Pukhraj is the gemstone of Jupiter, the planet of wisdom and
            prosperity. This precious yellow gemstone brings knowledge, good
            fortune, and marital bliss.
          </p>

          {/* Cycling highlight */}
          <div className="flex items-center gap-3 mb-4">
            <Gem
              className="w-4 h-4 flex-shrink-0"
              style={{ color: "oklch(0.88 0.18 82)" }}
            />
            <div className="overflow-hidden h-7">
              <AnimatePresence mode="wait">
                <motion.span
                  key={highlightIdx}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="block font-display text-base font-semibold"
                  style={{ color: "oklch(0.88 0.18 82)" }}
                >
                  {HIGHLIGHTS[highlightIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Benefit badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {HIGHLIGHTS.map((h) => (
              <span
                key={h}
                className="text-xs px-3 py-1 rounded-full border font-body"
                style={{
                  background: "oklch(0.88 0.18 82 / 0.15)",
                  borderColor: "oklch(0.88 0.18 82 / 0.35)",
                  color: "oklch(0.92 0.10 80)",
                }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Quote */}
          <blockquote
            className="italic text-sm border-l-2 pl-3 mb-8"
            style={{
              color: "oklch(0.82 0.08 76)",
              borderColor: "oklch(0.88 0.18 82)",
            }}
          >
            "Let Jupiter's blessings flow through the Yellow Sapphire's golden
            light."
          </blockquote>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Button
              data-ocid="yellow-sapphire.hero.call_button"
              className="gap-2 text-sm font-semibold"
              style={{ background: "oklch(0.62 0.18 48)", color: "white" }}
              onClick={() => window.open("tel:+911234567890")}
            >
              <Phone className="w-4 h-4" />
              Call Now
            </Button>
            <Button
              data-ocid="yellow-sapphire.hero.shop_button"
              variant="outline"
              className="gap-2 text-sm border-white/40 text-white bg-white/10 hover:bg-white/20"
              onClick={() =>
                document
                  .getElementById("collection")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Sparkles className="w-4 h-4" />
              Shop Collection
            </Button>
          </div>
        </div>
      </section>

      {/* ── Sticky Tabs ──────────────────────────────────────────────────────── */}
      <div
        ref={tabsRef}
        data-ocid="yellow-sapphire.tabs.nav"
        className="sticky top-0 z-40 bg-card border-b border-border shadow-sm"
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-none gap-0">
            {TABS.map((tab) => (
              <button
                type="button"
                key={tab.id}
                data-ocid={`yellow-sapphire.tabs.${tab.id}`}
                onClick={() => scrollTo(tab.id)}
                className={`px-3 py-3 text-xs sm:text-sm font-body font-medium whitespace-nowrap border-b-2 transition-colors duration-150 ${
                  activeTab === tab.id
                    ? "border-yellow-600 text-yellow-700"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Product Collection ────────────────────────────────────────────────── */}
      <section
        id="collection"
        data-ocid="yellow-sapphire.collection.section"
        className="py-12 bg-background"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-7 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Yellow Sapphire (Pukhraj) Online Collection
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Explore our handpicked collection of authentic, lab-certified
              Yellow Sapphires. Each stone is tested for quality and graded for
              astrological suitability.
            </p>
          </div>

          {/* Search + grade filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                data-ocid="yellow-sapphire.collection.search_input"
                placeholder="Search by name/carat..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 font-body"
              />
            </div>
            <div className="flex gap-2">
              {(["All", "A", "B", "C"] as const).map((g) => (
                <Button
                  key={g}
                  data-ocid={`yellow-sapphire.collection.grade_filter.${g.toLowerCase()}`}
                  variant={gradeFilter === g ? "default" : "outline"}
                  size="sm"
                  onClick={() => setGradeFilter(g)}
                  className={
                    gradeFilter === g
                      ? "bg-yellow-700 hover:bg-yellow-800 text-white"
                      : ""
                  }
                >
                  {g === "All" ? "All Grades" : `Grade ${g}`}
                </Button>
              ))}
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            Showing <strong>{filtered.length}</strong> of {YS_PRODUCTS.length}{" "}
            yellow sapphires
          </p>

          {filtered.length === 0 ? (
            <div
              data-ocid="yellow-sapphire.collection.empty_state"
              className="text-center py-16 text-muted-foreground"
            >
              <Gem className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="font-body">
                No yellow sapphires match your search. Try a different filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filtered.map((product, i) => (
                <ProductCard key={product.sku} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Separator />

      {/* ── About ─────────────────────────────────────────────────────────────── */}
      <section
        id="about"
        data-ocid="yellow-sapphire.about.section"
        className="py-12 bg-muted/30"
      >
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeading
            title="About Yellow Sapphire (Pukhraj)"
            subtitle="The sacred gemstone of Jupiter, revered for millennia in Vedic astrology"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {[
              { label: "Hindi Name", value: "पुखराज", emoji: "📿" },
              {
                label: "Ruling Planet",
                value: "Jupiter (Guru/Brihaspati)",
                emoji: "♃",
              },
              {
                label: "Zodiac Signs",
                value: "Sagittarius (Dhanu), Pisces (Meen)",
                emoji: "♐",
              },
              {
                label: "Chakra",
                value: "Solar Plexus (Manipura)",
                emoji: "🌟",
              },
              {
                label: "Price Range",
                value: "₹5,000–₹3,00,000 / carat",
                emoji: "💰",
              },
              { label: "Hardness", value: "9 on Mohs scale", emoji: "💎" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-card border border-border rounded-xl p-4 flex items-start gap-3"
              >
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">
                    {item.label}
                  </p>
                  <p className="font-body font-semibold text-foreground text-sm">
                    {item.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Price by Origin */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Gem className="w-5 h-5 text-yellow-600" />
              Price by Origin
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                {
                  origin: "Ceylon (Sri Lanka) Yellow Sapphire",
                  range: "₹50,000–₹3,00,000+/ct",
                  quality: "Premium",
                  color: "bg-yellow-50 border-yellow-200",
                },
                {
                  origin: "Bangkok Yellow Sapphire",
                  range: "₹10,000–₹50,000/ct",
                  quality: "High",
                  color: "bg-amber-50 border-amber-200",
                },
                {
                  origin: "African Yellow Sapphire",
                  range: "₹5,000–₹25,000/ct",
                  quality: "Standard",
                  color: "bg-orange-50 border-orange-200",
                },
                {
                  origin: "Australian Yellow Sapphire",
                  range: "₹8,000–₹35,000/ct",
                  quality: "Good",
                  color: "bg-lime-50 border-lime-200",
                },
              ].map((o) => (
                <div
                  key={o.origin}
                  className={`rounded-lg p-4 border ${o.color}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-body font-semibold text-foreground text-sm">
                        {o.origin}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {o.range}
                      </p>
                    </div>
                    <Badge className="text-[10px] bg-yellow-700 text-white">
                      {o.quality}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Who Should Wear ───────────────────────────────────────────────────── */}
      <section
        id="who-should-wear"
        data-ocid="yellow-sapphire.who_should_wear.section"
        className="py-12 bg-background"
      >
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeading
            title="Who Should Wear Yellow Sapphire (Pukhraj)?"
            subtitle="Discover if this powerful gemstone is aligned with your birth chart"
          />

          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {[
              {
                text: "Sagittarius (Dhanu) and Pisces (Meen) Rashi natives",
                icon: "♐",
              },
              {
                text: "Those seeking marriage and marital happiness",
                icon: "💍",
              },
              { text: "Students, teachers, and scholars", icon: "📚" },
              {
                text: "Lawyers, judges, and those in advisory roles",
                icon: "⚖️",
              },
              {
                text: "Those with weak Jupiter in their birth chart",
                icon: "♃",
              },
              {
                text: "Women seeking a good match or marital harmony",
                icon: "🌸",
              },
            ].map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-3 bg-card border border-border rounded-xl p-4"
              >
                <span className="text-xl">{item.icon}</span>
                <p className="font-body text-foreground text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Consultation CTA */}
          <div
            className="rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.28 0.10 72), oklch(0.22 0.12 68))",
            }}
          >
            <div className="flex-1">
              <p className="font-display font-semibold text-white text-base mb-1">
                Not Sure If It Suits You?
              </p>
              <p className="text-sm" style={{ color: "oklch(0.82 0.08 76)" }}>
                Get personalized gemstone recommendation based on your birth
                chart from our expert astrologers.
              </p>
            </div>
            <Button
              data-ocid="yellow-sapphire.consultation.cta_button"
              className="font-semibold shrink-0"
              style={{ background: "oklch(0.62 0.18 48)", color: "white" }}
            >
              Consult an Astrologer
            </Button>
          </div>
        </div>
      </section>

      {/* ── Benefits ──────────────────────────────────────────────────────────── */}
      <section
        id="benefits"
        data-ocid="yellow-sapphire.benefits.section"
        className="py-12 bg-muted/30"
      >
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeading
            title="Benefits of Yellow Sapphire (Pukhraj)"
            subtitle="Harness the transformative power of Jupiter's gemstone"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded-2xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center mb-3">
                  <b.icon className={`w-5 h-5 ${b.color}`} />
                </div>
                <h3 className="font-display font-semibold text-foreground text-base mb-1">
                  {b.title}
                </h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Detailed benefit lists */}
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                category: "Spiritual Benefits",
                emoji: "🕉️",
                items: [
                  "Connects with divine wisdom and higher consciousness",
                  "Enhances spiritual knowledge and Vedic learning",
                  "Strengthens guru-disciple relationships",
                  "Balances Solar Plexus chakra and personal power",
                ],
              },
              {
                category: "Emotional Benefits",
                emoji: "💛",
                items: [
                  "Brings optimism and positive thinking",
                  "Removes depression and hopelessness",
                  "Encourages generosity and gratitude",
                  "Promotes joyfulness and contentment",
                ],
              },
              {
                category: "Physical Benefits",
                emoji: "💪",
                items: [
                  "Improves liver and digestive health",
                  "Beneficial for skin and complexion",
                  "Strengthens immunity and stamina",
                  "Aids in weight management and metabolism",
                ],
              },
              {
                category: "Financial Benefits",
                emoji: "💰",
                items: [
                  "Attracts abundant wealth and prosperity",
                  "Opens doors to high positions and opportunities",
                  "Brings recognition, awards, and honours",
                  "Creates financial stability through wisdom",
                ],
              },
            ].map((section, i) => (
              <motion.div
                key={section.category}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-card border border-border rounded-xl p-5"
              >
                <h3 className="font-display font-semibold text-foreground text-base mb-3 flex items-center gap-2">
                  <span>{section.emoji}</span>
                  {section.category}
                </h3>
                <ul className="space-y-1.5">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 font-body text-sm text-muted-foreground"
                    >
                      <span className="text-yellow-600 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How to Wear ───────────────────────────────────────────────────────── */}
      <section
        id="how-to-wear"
        data-ocid="yellow-sapphire.how_to_wear.section"
        className="py-12 bg-background"
      >
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading
            title="How to Wear Yellow Sapphire (Pukhraj)"
            subtitle="Follow these Vedic guidelines for maximum astrological benefits"
          />

          <div className="bg-card border border-border rounded-2xl overflow-hidden mb-6">
            {HOW_TO_WEAR_ROWS.map((row, i) => (
              <div
                key={row.field}
                className={`flex items-center gap-4 px-6 py-4 ${i % 2 === 0 ? "bg-card" : "bg-yellow-50/40"}`}
              >
                <span className="font-body font-semibold text-yellow-700 text-sm w-32 flex-shrink-0">
                  {row.field}
                </span>
                <Separator orientation="vertical" className="h-5" />
                <span className="font-body text-foreground text-sm">
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: "🌅",
                title: "Best Day to Wear",
                desc: "Thursday morning during Guru (Jupiter) hora, after sunrise. Wearing during Shukla Paksha (waxing moon) Thursday is most auspicious.",
              },
              {
                icon: "💍",
                title: "How to Wear",
                desc: "Yellow Sapphire should be worn in gold on the index finger of the right hand. It should touch your skin for maximum astrological benefits.",
              },
              {
                icon: "🙏",
                title: "Energization Process",
                desc: 'Wash Yellow Sapphire in Ganga Jal or raw cow\'s milk, apply yellow turmeric paste, and chant "Om Brim Brihaspataye Namah" 108 times while holding the stone.',
              },
              {
                icon: "👥",
                title: "Who Should Wear",
                desc: "Sagittarius and Pisces Rashi natives benefit most. Also highly recommended for those seeking marriage, education, or professional success. Consult an astrologer for personalized guidance.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-card border border-border rounded-xl p-4 flex gap-3"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-body font-semibold text-foreground text-sm mb-1">
                    {item.title}
                  </p>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Care Guide ───────────────────────────────────────────────────────── */}
      <section
        id="care-guide"
        data-ocid="yellow-sapphire.care_guide.section"
        className="py-12 bg-muted/30"
      >
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading
            title="Care Guide for Yellow Sapphire"
            subtitle="Long-term care ensures your Pukhraj retains its radiance and astrological power"
          />
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: "🧴",
                title: "Daily Care",
                items: [
                  "Remove before swimming, bathing, or heavy exercise",
                  "Store in a yellow silk pouch when not wearing",
                  "Keep away from harsh chemicals, perfumes, and cleaning agents",
                  "Wear consistently for best results once activated",
                ],
              },
              {
                icon: "🫧",
                title: "Cleaning Instructions",
                items: [
                  "Clean with lukewarm water and a soft cloth",
                  "Use a gentle brush around the setting",
                  "Rinse thoroughly and pat dry with a soft towel",
                  "Avoid harsh detergents or acidic cleaners",
                ],
              },
              {
                icon: "🌞",
                title: "Energetic Cleansing",
                items: [
                  "Recharge under sunlight on Thursday mornings",
                  "Wash with Ganga Jal or raw cow's milk on Thursdays",
                  "Re-energize by chanting Guru mantra periodically",
                  "Keep near a Guru yantra or banana plant",
                ],
              },
              {
                icon: "⚠️",
                title: "What to Avoid",
                items: [
                  "Don't wear Diamond or Blue Sapphire with Yellow Sapphire without consultation",
                  "Avoid wearing during Guru Chandal Yoga without guidance",
                  "Don't let others wear your stone",
                  "Remove during health emergencies",
                ],
              },
            ].map((section) => (
              <div
                key={section.title}
                className="bg-card border border-border rounded-xl p-5"
              >
                <h3 className="font-display font-semibold text-foreground text-base mb-3 flex items-center gap-2">
                  <span>{section.icon}</span>
                  {section.title}
                </h3>
                <ul className="space-y-1.5">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 font-body text-sm text-muted-foreground"
                    >
                      <span className="text-yellow-600 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <section
        id="faq"
        data-ocid="yellow-sapphire.faq.section"
        className="py-12 bg-background"
      >
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeading
            title="People Also Ask"
            subtitle="Expert answers to your most important questions about Yellow Sapphire (Pukhraj)"
          />
          <div className="flex flex-col gap-3">
            {[
              {
                q: "What is Yellow Sapphire (Pukhraj)?",
                a: "Yellow Sapphire (Pukhraj / पुखराज) is the precious yellow gemstone of Jupiter (Guru/Brihaspati), the planet of wisdom, prosperity, and spirituality. It is a variety of corundum (aluminum oxide) colored yellow by iron traces. One of the most powerful and widely recommended gemstones in Vedic astrology.",
              },
              {
                q: "Who should wear Yellow Sapphire?",
                a: "Yellow Sapphire is primarily recommended for Sagittarius (Dhanu) and Pisces (Meen) Rashi natives. It is also beneficial for students, teachers, lawyers, judges, and those seeking marriage or marital harmony. Women looking for a suitable life partner are especially advised to wear Pukhraj after consulting an astrologer.",
              },
              {
                q: "What is the price of Yellow Sapphire (Pukhraj)?",
                a: "Yellow Sapphire prices range from ₹5,000 to ₹3,00,000 per carat depending on origin, quality, and treatment. Ceylon (Sri Lanka) sapphires are the most premium (₹50,000–₹3,00,000+/ct), followed by Bangkok and African origins. Always buy lab-certified natural stones for astrological use.",
              },
              {
                q: "How to wear Yellow Sapphire for astrological benefits?",
                a: "Yellow Sapphire should be worn in gold on the index finger of the right hand on a Thursday morning during Guru hora. Before wearing, chant 'Om Brim Brihaspataye Namah' 108 times. Wash the stone in Ganga Jal or raw cow's milk before wearing for the first time.",
              },
              {
                q: "Can Yellow Sapphire be worn with other gemstones?",
                a: "Yellow Sapphire is generally compatible with Ruby, Pearl, and Red Coral. It should NOT be worn with Diamond, Blue Sapphire, or Hessonite without expert astrological consultation, as these may have conflicting planetary energies. Always consult a qualified Vedic astrologer before combining gemstones.",
              },
              {
                q: "What are the signs that Yellow Sapphire is working?",
                a: "Positive signs include improved clarity in decision-making, unexpected opportunities for growth or marriage, increased optimism, better academic or professional performance, and a general sense of luck and divine blessings. These effects typically begin within 3–4 weeks of wearing a properly activated stone.",
              },
            ].map((item, i) => (
              <FAQItem key={item.q} q={item.q} a={item.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Certification strip ───────────────────────────────────────────────── */}
      <section className="py-10 bg-card border-t border-border">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8">
            {[
              {
                icon: Shield,
                label: "Lab Certified",
                sub: "IGI / GIA Certified",
              },
              {
                icon: CheckCircle2,
                label: "100% Natural",
                sub: "No Synthetics",
              },
              { icon: Sparkles, label: "Energized", sub: "Vedic Activation" },
              {
                icon: HeartPulse,
                label: "7-Day Guarantee",
                sub: "Full Refund",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-1 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-yellow-50 border border-yellow-200 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-yellow-700" />
                </div>
                <p className="font-body font-semibold text-foreground text-xs">
                  {item.label}
                </p>
                <p className="font-body text-muted-foreground text-[10px]">
                  {item.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
