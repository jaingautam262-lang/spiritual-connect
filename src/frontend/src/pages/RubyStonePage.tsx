import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChevronDown,
  Crown,
  Eye,
  Flame,
  Gem,
  HeartPulse,
  Phone,
  Search,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCartStore } from "../stores/cartStore";

// ─── Product Data ──────────────────────────────────────────────────────────────

interface RubyProduct {
  name: string;
  sku: string;
  grade: "A" | "B" | "C";
  price: number;
  mrp: number;
  savings: number;
}

const RUBY_PRODUCTS: RubyProduct[] = [
  {
    name: "Ruby 3.25 Carat (Grade A)",
    sku: "Ruby24112025/4/21/3.25CT",
    grade: "A",
    price: 24937.5,
    mrp: 31171.88,
    savings: 6234.38,
  },
  {
    name: "Ruby 4.10 Carat (Grade A)",
    sku: "Ruby24112025/4/21/4.10CT",
    grade: "A",
    price: 31477.5,
    mrp: 39346.88,
    savings: 7869.38,
  },
  {
    name: "Ruby 3.52 Carat (Grade B)",
    sku: "Ruby24112025/4/21/3.52CT",
    grade: "B",
    price: 15488,
    mrp: 19360,
    savings: 3872,
  },
  {
    name: "Ruby 4.75 Carat (Grade B)",
    sku: "Ruby24112025/4/21/4.75CT",
    grade: "B",
    price: 19285,
    mrp: 24106.25,
    savings: 4821.25,
  },
  {
    name: "Ruby 5.10 Carat (Grade C)",
    sku: "Ruby24112025/4/21/5.10CT",
    grade: "C",
    price: 16830,
    mrp: 21037.5,
    savings: 4207.5,
  },
  {
    name: "Ruby 3.80 Carat (Grade A)",
    sku: "Ruby24112025/4/21/3.80CT",
    grade: "A",
    price: 29070,
    mrp: 36337.5,
    savings: 7267.5,
  },
  {
    name: "Ruby 5.60 Carat (Grade B)",
    sku: "Ruby24112025/4/21/5.60CT",
    grade: "B",
    price: 22736,
    mrp: 28420,
    savings: 5684,
  },
  {
    name: "Ruby 4.25 Carat (Grade A)",
    sku: "Ruby24112025/4/21/4.25CT",
    grade: "A",
    price: 32587.5,
    mrp: 40734.38,
    savings: 8146.88,
  },
  {
    name: "Ruby 6.20 Carat (Grade C)",
    sku: "Ruby24112025/4/21/6.20CT",
    grade: "C",
    price: 20460,
    mrp: 25575,
    savings: 5115,
  },
  {
    name: "Ruby 4.50 Carat (Grade B)",
    sku: "Ruby24112025/4/21/4.50CT",
    grade: "B",
    price: 18270,
    mrp: 22837.5,
    savings: 4567.5,
  },
  {
    name: "Ruby 5.85 Carat (Grade A)",
    sku: "Ruby24112025/4/21/5.85CT",
    grade: "A",
    price: 44887.5,
    mrp: 56109.38,
    savings: 11221.88,
  },
  {
    name: "Ruby 7.50 Carat (Grade B)",
    sku: "Ruby24112025/4/21/7.50CT",
    grade: "B",
    price: 30450,
    mrp: 38062.5,
    savings: 7612.5,
  },
];

// ─── Constants ────────────────────────────────────────────────────────────────

const HIGHLIGHTS = [
  "Leadership & Power",
  "Confidence & Vitality",
  "Passion & Energy",
  "Career Success",
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
    icon: Sparkles,
    title: "Spiritual Courage",
    desc: "Enhances connection with divine energy, promotes spiritual courage and inner strength",
    color: "text-red-700",
  },
  {
    icon: Crown,
    title: "Confidence & Authority",
    desc: "Builds self-esteem and confidence, removes fear and hesitation in all situations",
    color: "text-amber-600",
  },
  {
    icon: HeartPulse,
    title: "Vitality & Health",
    desc: "Boosts immunity and vitality, improves blood circulation and cardiovascular health",
    color: "text-red-600",
  },
  {
    icon: Zap,
    title: "Mental Clarity",
    desc: "Improves focus and decision-making, enhances leadership qualities and concentration",
    color: "text-orange-600",
  },
  {
    icon: Flame,
    title: "Passion & Love",
    desc: "Attracts love and passion, strengthens romantic bonds and promotes loyalty",
    color: "text-rose-600",
  },
  {
    icon: TrendingUp,
    title: "Career Success",
    desc: "Attracts career promotions, brings authority and recognition in professional life",
    color: "text-red-700",
  },
];

const HOW_TO_WEAR_ROWS = [
  { field: "Weight", value: "1/10th of body weight in Ratti" },
  { field: "Metal", value: "Gold (preferred) or Copper" },
  { field: "Finger", value: "Ring finger of the right hand" },
  { field: "Day & Time", value: "Sunday morning during Surya hora" },
  { field: "Mantra", value: "Om Suryaya Namah (108 times)" },
  { field: "Paksha", value: "Shukla Paksha (waxing moon)" },
];

const FAQ_ITEMS = [
  {
    q: "What is Ruby (Manik) gemstone?",
    a: "Ruby (Manik) is the precious red gemstone of Sun (Surya), the planet of power and leadership. It is a variety of the mineral corundum (aluminium oxide) colored red by trace amounts of chromium. Ruby is one of the four recognized precious gemstones alongside diamond, emerald, and sapphire.",
  },
  {
    q: "What is the price of Ruby (Manik)?",
    a: "Ruby prices range from ₹5,000 to ₹2,00,000+ per carat depending on origin, color, and clarity. Burmese Rubies are the most valuable (₹50,000–₹2,00,000+/ct), followed by Mozambique (₹10,000–₹60,000/ct), African (₹8,000–₹40,000/ct), and Thai Ruby (₹5,000–₹30,000/ct).",
  },
  {
    q: "How to wear Ruby (Manik) stone?",
    a: "Ruby should be worn on the ring finger of the right hand in gold metal. The ideal time is Sunday morning during Surya hora after sunrise. Before wearing, chant 'Om Suryaya Namah' 108 times. The recommended weight is 1/10th of your body weight in Ratti.",
  },
  {
    q: "Who should wear Ruby (Manik)?",
    a: "Ruby is primarily recommended for Leo (Simha) and Aries (Mesh) Rashi natives, as Sun rules Leo. It also benefits leaders, executives, politicians, military personnel, and those with weak Sun in their Kundali. Always consult a qualified astrologer before wearing.",
  },
  {
    q: "What is the difference between Burmese and Mozambique Ruby?",
    a: "Burmese (Myanmar) Rubies are considered the finest, featuring the legendary 'pigeon blood' red color with fluorescence. Mozambique Rubies are darker, often with slightly more blue in them, and are significantly more affordable. Both are natural rubies with strong astrological properties.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function GradeTag({ grade }: { grade: "A" | "B" | "C" }) {
  const colors: Record<string, string> = {
    A: "bg-red-100 text-red-800 border-red-300",
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
  product: RubyProduct;
  index: number;
}) {
  const { addItem, setCartOpen } = useCartStore();

  const handleViewDetails = () => {
    addItem({
      id: product.sku,
      name: product.name,
      price: product.price,
      category: "Gemstone",
      variantName: `Grade ${product.grade}`,
      type: "product",
    });
    setCartOpen(true);
  };

  return (
    <motion.div
      data-ocid={`ruby.product.item.${index + 1}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: (index % 6) * 0.05 }}
      className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
    >
      {/* Card image area */}
      <div className="relative bg-gradient-to-br from-red-50 to-rose-100 h-36 flex items-center justify-center">
        <div className="text-5xl select-none">❤️</div>
        <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
          <Badge className="bg-red-700 text-white text-[10px] px-1.5 py-0.5 rounded">
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
          <Star className="w-3 h-3 fill-amber-200 text-amber-300" />
          <span className="text-[10px] text-muted-foreground ml-0.5">(89)</span>
        </div>

        {/* Pricing */}
        <div className="mt-auto pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-red-700 font-bold text-base font-body">
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
          <p className="text-[11px] text-red-600 font-medium">
            Save Rs.{" "}
            {product.savings.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        <Button
          data-ocid={`ruby.product.view_details.${index + 1}`}
          size="sm"
          className="w-full mt-1 bg-red-700 hover:bg-red-800 text-white text-xs font-body"
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
      data-ocid={`ruby.faq.item.${index + 1}`}
      className="border border-border rounded-xl overflow-hidden"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-card hover:bg-red-50/50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-body font-semibold text-foreground text-sm sm:text-base">
          {q}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-red-700 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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
            <div className="px-5 pb-4 pt-0 font-body text-muted-foreground text-sm leading-relaxed bg-red-50/30">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function RubyStonePage() {
  const [highlightIdx, setHighlightIdx] = useState(0);
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState<"All" | "A" | "B" | "C">(
    "All",
  );
  const [activeTab, setActiveTab] = useState("about");
  const tabsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  const filtered = RUBY_PRODUCTS.filter((p) => {
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
        data-ocid="ruby.hero.section"
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.12 20) 0%, oklch(0.18 0.14 18) 40%, oklch(0.14 0.10 15) 100%)",
        }}
      >
        {/* Decorations */}
        <div className="absolute top-8 right-8 text-6xl opacity-20 select-none">
          💎
        </div>
        <div className="absolute bottom-8 left-6 text-4xl opacity-15 select-none">
          ✨
        </div>
        <div className="absolute top-1/2 right-1/4 text-3xl opacity-10 select-none">
          🔴
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 sm:py-20">
          {/* Trust badge row */}
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
            Ruby <span style={{ color: "oklch(0.82 0.14 35)" }}>(Manik)</span>{" "}
            Stone
          </h1>
          <p className="text-red-200 text-base sm:text-lg mb-5 max-w-xl leading-relaxed">
            Manik is the gemstone of Sun (Surya) — planet of power and
            leadership. Handpicked, lab-certified, energized.
          </p>

          {/* Cycling highlight */}
          <div className="flex items-center gap-3 mb-6">
            <Gem className="w-4 h-4 text-red-300 flex-shrink-0" />
            <div className="overflow-hidden h-7">
              <AnimatePresence mode="wait">
                <motion.span
                  key={highlightIdx}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="block font-display text-base font-semibold"
                  style={{ color: "oklch(0.88 0.14 35)" }}
                >
                  {HIGHLIGHTS[highlightIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Quality badges row */}
          <div className="flex flex-wrap gap-2 mb-7">
            {["R", "P", "A", "S"].map((badge) => (
              <span
                key={badge}
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                style={{
                  background: "oklch(0.78 0.14 35)",
                  color: "oklch(0.15 0.05 20)",
                }}
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Quote */}
          <blockquote
            className="italic text-sm text-red-200 border-l-2 pl-3 mb-8"
            style={{ borderColor: "oklch(0.78 0.14 35)" }}
          >
            "Unlock the power of the Sun with Ruby's divine energy."
          </blockquote>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Button
              data-ocid="ruby.hero.call_button"
              className="gap-2 text-sm font-semibold"
              style={{ background: "oklch(0.62 0.18 48)", color: "white" }}
              onClick={() => window.open("tel:+911234567890")}
            >
              <Phone className="w-4 h-4" />
              Call Now
            </Button>
            <Button
              data-ocid="ruby.hero.shop_button"
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
        data-ocid="ruby.tabs.nav"
        className="sticky top-0 z-40 bg-card border-b border-border shadow-sm"
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-none gap-0">
            {TABS.map((tab) => (
              <button
                type="button"
                key={tab.id}
                data-ocid={`ruby.tabs.${tab.id}`}
                onClick={() => scrollTo(tab.id)}
                className={`px-3 py-3 text-xs sm:text-sm font-body font-medium whitespace-nowrap border-b-2 transition-colors duration-150 ${
                  activeTab === tab.id
                    ? "border-red-600 text-red-700"
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
        data-ocid="ruby.collection.section"
        className="py-12 bg-background"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-7 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Ruby (Manik) Stone Online Collection
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Explore our handpicked collection of authentic, lab-certified
              Rubies. Each stone is tested for quality and graded for
              astrological suitability.
            </p>
          </div>

          {/* Search + grade filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                data-ocid="ruby.collection.search_input"
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
                  data-ocid={`ruby.collection.grade_filter.${g.toLowerCase()}`}
                  variant={gradeFilter === g ? "default" : "outline"}
                  size="sm"
                  onClick={() => setGradeFilter(g)}
                  className={
                    gradeFilter === g
                      ? "bg-red-700 hover:bg-red-800 text-white"
                      : ""
                  }
                >
                  {g === "All" ? "All Grades" : `Grade ${g}`}
                </Button>
              ))}
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            Showing <strong>{filtered.length}</strong> of {RUBY_PRODUCTS.length}{" "}
            rubies
          </p>

          {filtered.length === 0 ? (
            <div
              data-ocid="ruby.collection.empty_state"
              className="text-center py-16 text-muted-foreground"
            >
              <Gem className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="font-body">
                No rubies match your search. Try a different filter.
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
        data-ocid="ruby.about.section"
        className="py-12 bg-muted/30"
      >
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeading
            title="About Ruby (Manik)"
            subtitle="The sacred gemstone of Sun, revered for millennia in Vedic astrology for power and authority"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {[
              { label: "Hindi Name", value: "माणिक", emoji: "📿" },
              { label: "Ruling Planet", value: "Sun (Surya)", emoji: "☀️" },
              {
                label: "Zodiac Signs",
                value: "Leo (Simha), Aries (Mesh)",
                emoji: "♌",
              },
              { label: "Chakra", value: "Root & Heart Chakra", emoji: "❤️" },
              {
                label: "Price Range",
                value: "₹5,000–₹2,00,000 / carat",
                emoji: "💰",
              },
              { label: "Hardness", value: "9.0 on Mohs scale", emoji: "💎" },
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
              <Gem className="w-5 h-5 text-red-600" />
              Price by Origin
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                {
                  origin: "Burmese Ruby",
                  range: "₹50,000–₹2,00,000+/ct",
                  quality: "Premium",
                  color: "bg-red-50 border-red-200",
                },
                {
                  origin: "Mozambique Ruby",
                  range: "₹10,000–₹60,000/ct",
                  quality: "High",
                  color: "bg-rose-50 border-rose-200",
                },
                {
                  origin: "Thai Ruby",
                  range: "₹5,000–₹30,000/ct",
                  quality: "Standard",
                  color: "bg-orange-50 border-orange-200",
                },
                {
                  origin: "African Ruby",
                  range: "₹8,000–₹40,000/ct",
                  quality: "High",
                  color: "bg-amber-50 border-amber-200",
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
                    <Badge className="text-[10px] bg-red-700 text-white">
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
        data-ocid="ruby.who_should_wear.section"
        className="py-12 bg-background"
      >
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeading
            title="Who Should Wear Ruby (Manik)?"
            subtitle="Discover if this powerful gemstone is aligned with your birth chart and Sun placement"
          />

          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {[
              {
                text: "Leo (Simha) and Aries (Mesh) Rashi natives",
                icon: "♌",
              },
              {
                text: "Leaders, executives, and entrepreneurs",
                icon: "👑",
              },
              { text: "Those seeking confidence and authority", icon: "💪" },
              {
                text: "People in politics, military, or government",
                icon: "🏛️",
              },
              {
                text: "Those with weak Sun in their birth chart",
                icon: "☀️",
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
                "linear-gradient(135deg, oklch(0.24 0.12 20), oklch(0.20 0.14 18))",
            }}
          >
            <div className="flex-1">
              <p className="font-display font-semibold text-white text-base mb-1">
                Not Sure If It Suits You?
              </p>
              <p className="text-red-200 text-sm">
                Get personalized gemstone recommendation based on your birth
                chart from our expert astrologers.
              </p>
            </div>
            <Button
              data-ocid="ruby.consultation.cta_button"
              className="font-semibold shrink-0"
              style={{ background: "oklch(0.62 0.18 48)", color: "white" }}
              onClick={() =>
                navigate({
                  to: "/book-consultation",
                  search: {
                    topic:
                      "I want to know if Ruby (Manik) is right for my birth chart",
                  },
                })
              }
            >
              Consult an Astrologer
            </Button>
          </div>
        </div>
      </section>

      {/* ── Benefits ──────────────────────────────────────────────────────────── */}
      <section
        id="benefits"
        data-ocid="ruby.benefits.section"
        className="py-12 bg-muted/30"
      >
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeading
            title="Benefits of Ruby (Manik) Stone"
            subtitle="Harness the transformative power of Sun's gemstone for vitality, success, and leadership"
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
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-3">
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

          {/* Benefit Categories */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                category: "Spiritual",
                emoji: "🕉️",
                items: [
                  "Enhances connection with divine energy",
                  "Promotes spiritual courage and willpower",
                  "Strengthens determination",
                  "Balances Root and Heart chakra",
                ],
              },
              {
                category: "Emotional",
                emoji: "💖",
                items: [
                  "Builds confidence and self-esteem",
                  "Removes fear and hesitation",
                  "Encourages passion and enthusiasm",
                  "Heals emotional wounds from the past",
                ],
              },
              {
                category: "Physical",
                emoji: "💪",
                items: [
                  "Boosts immunity and vitality",
                  "Improves blood circulation",
                  "Strengthens cardiovascular health",
                  "Enhances overall energy levels",
                ],
              },
              {
                category: "Mental",
                emoji: "🧠",
                items: [
                  "Improves focus and decision-making",
                  "Enhances leadership qualities",
                  "Increases mental clarity",
                  "Stimulates creative thinking",
                ],
              },
              {
                category: "Relationship",
                emoji: "❤️",
                items: [
                  "Attracts love and passion",
                  "Strengthens romantic bonds",
                  "Promotes loyalty and commitment",
                  "Brings harmony in relationships",
                ],
              },
              {
                category: "Financial",
                emoji: "💰",
                items: [
                  "Attracts career success and promotions",
                  "Brings authority and recognition",
                  "Opens doors to leadership positions",
                  "Creates wealth through hard work",
                ],
              },
            ].map((cat, i) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-card border border-border rounded-xl p-4"
              >
                <h4 className="font-display font-semibold text-foreground text-sm mb-2 flex items-center gap-2">
                  <span>{cat.emoji}</span> {cat.category}
                </h4>
                <ul className="space-y-1">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="font-body text-muted-foreground text-xs flex items-start gap-1.5"
                    >
                      <span className="text-red-500 mt-0.5 shrink-0">•</span>
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
        data-ocid="ruby.how_to_wear.section"
        className="py-12 bg-background"
      >
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading
            title="How to Wear Ruby (Manik)"
            subtitle="Follow these Vedic guidelines for maximum astrological benefits from the Sun's gemstone"
          />

          {/* Quick reference table */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden mb-8">
            {HOW_TO_WEAR_ROWS.map((row, i) => (
              <div
                key={row.field}
                className={`flex items-center gap-4 px-6 py-4 ${i % 2 === 0 ? "bg-card" : "bg-red-50/40"}`}
              >
                <span className="font-body font-semibold text-red-700 text-sm w-28 flex-shrink-0">
                  {row.field}
                </span>
                <Separator orientation="vertical" className="h-5" />
                <span className="font-body text-foreground text-sm">
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* Wearing guidance cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: "📅",
                title: "Best Day to Wear",
                desc: "Sunday morning during Surya (Sun) hora, after sunrise. Wearing during Shukla Paksha (waxing moon) is most auspicious for maximum Sun energy.",
              },
              {
                icon: "💍",
                title: "How to Wear",
                desc: "Ruby should be worn in gold on the ring finger of the right hand. It should touch your skin directly for maximum astrological benefits.",
              },
              {
                icon: "🌊",
                title: "Energization Process",
                desc: "Wash Ruby in Ganga Jal or clean water, apply saffron paste (kumkum), and chant 'Om Suryaya Namah' 108 times while holding the stone.",
              },
              {
                icon: "🕉️",
                title: "Mantra to Chant",
                desc: "Chant 'Om Suryaya Namah' 108 times OR the powerful 'Om Hrim Hraum Suryaya Namah' for enhanced Sun blessings before and after wearing.",
              },
              {
                icon: "👤",
                title: "Who Should Wear",
                desc: "Leo and Aries Rashi natives benefit most. Also recommended for those with weak Sun in their Kundali. Consult an astrologer before wearing.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-card border border-border rounded-xl p-4 flex gap-3"
              >
                <span className="text-2xl shrink-0">{card.icon}</span>
                <div>
                  <p className="font-body font-semibold text-foreground text-sm mb-1">
                    {card.title}
                  </p>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Care Guide ────────────────────────────────────────────────────────── */}
      <section
        id="care-guide"
        data-ocid="ruby.care_guide.section"
        className="py-12 bg-muted/30"
      >
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading
            title="Care Guide for Ruby (Manik)"
            subtitle="Proper care preserves your Ruby's radiance and maintains its astrological effectiveness"
          />

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                emoji: "🔆",
                title: "Daily Care",
                items: [
                  "Remove Ruby before swimming or strenuous activity",
                  "Keep away from harsh chemicals, perfumes, and cleaning agents",
                  "Store in a soft pouch or jewelry box when not wearing",
                  "Avoid exposing to extreme heat or sudden temperature changes",
                ],
                bg: "bg-card border-border",
              },
              {
                emoji: "🧹",
                title: "Cleaning Instructions",
                items: [
                  "Clean with lukewarm water and a soft cloth",
                  "Use a gentle brush for crevices in the setting",
                  "Avoid ultrasonic cleaners for treated rubies",
                  "Pat dry thoroughly before storing",
                ],
                bg: "bg-card border-border",
              },
              {
                emoji: "✨",
                title: "Energetic Cleansing",
                items: [
                  "Recharge under morning sunlight for 1-2 hours on Sundays",
                  "Wash with Ganga Jal or clean water on Sundays",
                  "Re-energize by chanting Om Suryaya Namah periodically",
                  "Keep near a Surya yantra or sacred space",
                ],
                bg: "bg-red-50/40 border-red-200",
              },
              {
                emoji: "🚫",
                title: "What to Avoid",
                items: [
                  "Don't wear during inauspicious periods without astrologer guidance",
                  "Avoid contact with bleach or harsh chemicals",
                  "Don't share your gemstone with others",
                  "Remove during heavy manual labor",
                ],
                bg: "bg-red-50/40 border-red-200",
              },
            ].map((section) => (
              <div
                key={section.title}
                className={`rounded-xl p-5 border ${section.bg}`}
              >
                <h4 className="font-display font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
                  <span>{section.emoji}</span> {section.title}
                </h4>
                <ul className="space-y-1.5">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="font-body text-muted-foreground text-sm flex items-start gap-1.5"
                    >
                      <span className="text-red-500 mt-0.5 shrink-0">•</span>
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
        data-ocid="ruby.faq.section"
        className="py-12 bg-background"
      >
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeading
            title="People Also Ask"
            subtitle="Expert answers to your most important questions about Ruby (Manik) gemstone"
          />
          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item, i) => (
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
                <div className="w-12 h-12 rounded-full bg-red-50 border border-red-200 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-red-700" />
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

// ─── Shared helper ────────────────────────────────────────────────────────────

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
