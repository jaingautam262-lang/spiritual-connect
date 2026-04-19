import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/cartStore";
import {
  AlertTriangle,
  Brain,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  Eye,
  Gem,
  GraduationCap,
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

// ─── Product Data ──────────────────────────────────────────────────────────────

interface BlueSapphireProduct {
  name: string;
  sku: string;
  grade: "A" | "B" | "C";
  price: number;
  mrp: number;
  savings: number;
}

const BLUE_SAPPHIRE_PRODUCTS: BlueSapphireProduct[] = [
  {
    name: "Blue Sapphire 3.10 Carat (Grade A)",
    sku: "BlueSapphire24112025/3.10CT",
    grade: "A",
    price: 27900,
    mrp: 34875,
    savings: 6975,
  },
  {
    name: "Blue Sapphire 4.25 Carat (Grade A)",
    sku: "BlueSapphire24112025/4.25CT",
    grade: "A",
    price: 38250,
    mrp: 47812.5,
    savings: 9562.5,
  },
  {
    name: "Blue Sapphire 3.55 Carat (Grade B)",
    sku: "BlueSapphire24112025/3.55CT",
    grade: "B",
    price: 17040,
    mrp: 21300,
    savings: 4260,
  },
  {
    name: "Blue Sapphire 5.00 Carat (Grade B)",
    sku: "BlueSapphire24112025/5.00CT",
    grade: "B",
    price: 24000,
    mrp: 30000,
    savings: 6000,
  },
  {
    name: "Blue Sapphire 4.70 Carat (Grade C)",
    sku: "BlueSapphire24112025/4.70CT",
    grade: "C",
    price: 16920,
    mrp: 21150,
    savings: 4230,
  },
  {
    name: "Blue Sapphire 3.85 Carat (Grade A)",
    sku: "BlueSapphire24112025/3.85CT",
    grade: "A",
    price: 34650,
    mrp: 43312.5,
    savings: 8662.5,
  },
  {
    name: "Blue Sapphire 5.50 Carat (Grade B)",
    sku: "BlueSapphire24112025/5.50CT",
    grade: "B",
    price: 26400,
    mrp: 33000,
    savings: 6600,
  },
  {
    name: "Blue Sapphire 4.40 Carat (Grade A)",
    sku: "BlueSapphire24112025/4.40CT",
    grade: "A",
    price: 39600,
    mrp: 49500,
    savings: 9900,
  },
  {
    name: "Blue Sapphire 6.10 Carat (Grade C)",
    sku: "BlueSapphire24112025/6.10CT",
    grade: "C",
    price: 21960,
    mrp: 27450,
    savings: 5490,
  },
  {
    name: "Blue Sapphire 4.60 Carat (Grade B)",
    sku: "BlueSapphire24112025/4.60CT",
    grade: "B",
    price: 22080,
    mrp: 27600,
    savings: 5520,
  },
  {
    name: "Blue Sapphire 5.95 Carat (Grade A)",
    sku: "BlueSapphire24112025/5.95CT",
    grade: "A",
    price: 53550,
    mrp: 66937.5,
    savings: 13387.5,
  },
  {
    name: "Blue Sapphire 7.25 Carat (Grade B)",
    sku: "BlueSapphire24112025/7.25CT",
    grade: "B",
    price: 34800,
    mrp: 43500,
    savings: 8700,
  },
];

// ─── Constants ────────────────────────────────────────────────────────────────

const HIGHLIGHTS = [
  "Wealth & Success",
  "Career Growth",
  "Mental Focus",
  "Protection",
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
    title: "Deepens Meditation",
    desc: "Accelerates karma resolution, strengthens intuition and psychic abilities",
    color: "text-blue-600",
  },
  {
    icon: Brain,
    title: "Emotional Discipline",
    desc: "Calms anxiety and overthinking, removes negative thought patterns",
    color: "text-indigo-600",
  },
  {
    icon: HeartPulse,
    title: "Physical Healing",
    desc: "Improves nervous system health, beneficial for bones, joints, and vision",
    color: "text-blue-700",
  },
  {
    icon: GraduationCap,
    title: "Exceptional Focus",
    desc: "Strategic thinking, academic excellence, overcomes procrastination",
    color: "text-indigo-700",
  },
  {
    icon: Briefcase,
    title: "Career Acceleration",
    desc: "Brings sudden wealth and windfalls, accelerates promotions and growth",
    color: "text-blue-600",
  },
  {
    icon: TrendingUp,
    title: "Financial Stability",
    desc: "Removes financial blockages, attracts stable and consistent income",
    color: "text-blue-800",
  },
];

const HOW_TO_WEAR_ROWS = [
  { field: "Weight", value: "1/10th of body weight in Ratti" },
  { field: "Metal", value: "Silver (preferred) or Gold" },
  { field: "Finger", value: "Middle finger of the right hand" },
  { field: "Day & Time", value: "Saturday evening during Shani hora" },
  { field: "Mantra", value: "Om Sham Shanicharaya Namah (108 times)" },
  { field: "Test Period", value: "Keep under pillow for 3 nights first" },
];

const FAQ_ITEMS = [
  {
    q: "What is Blue Sapphire (Neelam) gemstone?",
    a: "Blue Sapphire (Neelam) is the powerful gemstone of Saturn (Shani), the planet of discipline, karma, and justice. It is a variety of corundum mineral with blue coloring from iron and titanium. Blue Sapphire is one of the most potent gemstones in Vedic astrology, known for its fast and powerful effects.",
  },
  {
    q: "What is the price of Blue Sapphire (Neelam)?",
    a: "Blue Sapphire prices range from ₹3,000 to ₹1,50,000 per carat. Kashmir Blue Sapphires are the rarest and most valuable (₹1,00,000–₹1,50,000+/ct), followed by Ceylon (₹30,000–₹1,00,000/ct), Burma (₹20,000–₹80,000/ct), and Australian (₹3,000–₹15,000/ct).",
  },
  {
    q: "How to wear Blue Sapphire (Neelam) stone?",
    a: "Blue Sapphire should be worn on the middle finger of the right hand in silver or gold. The ideal time is Saturday evening during Shani hora. Always test by keeping under your pillow for 3 nights first. Chant 'Om Sham Shanicharaya Namah' 108 times before wearing.",
  },
  {
    q: "Who should wear Blue Sapphire (Neelam)?",
    a: "Blue Sapphire is primarily recommended for Capricorn (Makar) and Aquarius (Kumbh) Rashi natives, and those undergoing Sade Sati or Shani Dasha. It also benefits people in law, philosophy, or spirituality. Always consult an astrologer first — this stone is very powerful and fast-acting.",
  },
  {
    q: "Is Blue Sapphire dangerous to wear without consultation?",
    a: "Yes — Blue Sapphire is considered one of the most powerful gemstones with very fast effects (within 3 days). If it suits you, it can bring sudden wealth and success; if it doesn't, it can cause harm. Always test it for 3 days before permanent wearing and consult a qualified Vedic astrologer.",
  },
  {
    q: "What is the minimum carat for astrological effects?",
    a: "For Blue Sapphire, a minimum of 3 Ratti (approximately 2.74 carats) is recommended for astrological effects. The traditional guideline is 1/10th of your body weight in Ratti. A 60 kg person would benefit from a 5–6 Ratti (4.5–5.5 carat) stone. Quality and natural origin matter more than size.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function GradeTag({ grade }: { grade: "A" | "B" | "C" }) {
  const colors: Record<string, string> = {
    A: "bg-blue-100 text-blue-800 border-blue-300",
    B: "bg-indigo-50 text-indigo-800 border-indigo-200",
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
  product: BlueSapphireProduct;
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
      data-ocid={`blue_sapphire.product.item.${index + 1}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: (index % 6) * 0.05 }}
      className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
    >
      {/* Card image area */}
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 h-36 flex items-center justify-center">
        <div className="text-5xl select-none">💙</div>
        <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
          <Badge className="bg-blue-700 text-white text-[10px] px-1.5 py-0.5 rounded">
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
          <span className="text-[10px] text-muted-foreground ml-0.5">(97)</span>
        </div>

        {/* Pricing */}
        <div className="mt-auto pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-blue-700 font-bold text-base font-body">
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
          <p className="text-[11px] text-blue-600 font-medium">
            Save Rs.{" "}
            {product.savings.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        <Button
          data-ocid={`blue_sapphire.product.view_details.${index + 1}`}
          size="sm"
          onClick={handleViewDetails}
          className="w-full mt-1 bg-blue-700 hover:bg-blue-800 text-white text-xs font-body"
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
      data-ocid={`blue_sapphire.faq.item.${index + 1}`}
      className="border border-border rounded-xl overflow-hidden"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-card hover:bg-blue-50/50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-body font-semibold text-foreground text-sm sm:text-base">
          {q}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-blue-700 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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
            <div className="px-5 pb-4 pt-0 font-body text-muted-foreground text-sm leading-relaxed bg-blue-50/30">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function BlueSapphireStonePage() {
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

  const filtered = BLUE_SAPPHIRE_PRODUCTS.filter((p) => {
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
        data-ocid="blue_sapphire.hero.section"
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.12 258) 0%, oklch(0.16 0.14 265) 40%, oklch(0.12 0.10 270) 100%)",
        }}
      >
        {/* Gem decorations */}
        <div className="absolute top-8 right-8 text-6xl opacity-20 select-none">
          💎
        </div>
        <div className="absolute bottom-8 left-6 text-4xl opacity-15 select-none">
          ✨
        </div>
        <div className="absolute top-1/2 right-1/4 text-3xl opacity-10 select-none">
          🔵
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
            Blue Sapphire{" "}
            <span style={{ color: "oklch(0.80 0.14 80)" }}>(Neelam)</span> Stone
          </h1>
          <p className="text-blue-200 text-base sm:text-lg mb-5 max-w-xl leading-relaxed">
            नीलम — The gemstone of Saturn (Shani), planet of discipline & karma.
            Certified, energized, potent.
          </p>

          {/* Cycling highlight */}
          <div className="flex items-center gap-3 mb-6">
            <Gem className="w-4 h-4 text-blue-300 flex-shrink-0" />
            <div className="overflow-hidden h-7">
              <AnimatePresence mode="wait">
                <motion.span
                  key={highlightIdx}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="block font-display text-base font-semibold"
                  style={{ color: "oklch(0.88 0.14 82)" }}
                >
                  {HIGHLIGHTS[highlightIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Quality badges row */}
          <div className="flex flex-wrap gap-2 mb-6">
            {["W", "C", "F", "P"].map((badge) => (
              <span
                key={badge}
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                style={{
                  background: "oklch(0.78 0.14 80)",
                  color: "oklch(0.15 0.05 258)",
                }}
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Quote */}
          <blockquote
            className="italic text-sm text-blue-200 border-l-2 pl-3 mb-5"
            style={{ borderColor: "oklch(0.78 0.14 80)" }}
          >
            "Harness Saturn's power with the Blue Sapphire's transformative
            energy."
          </blockquote>

          {/* WARNING */}
          <div className="flex items-start gap-2 bg-amber-500/20 border border-amber-400/40 rounded-xl px-4 py-3 mb-7 max-w-xl">
            <AlertTriangle className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
            <p className="text-amber-200 text-xs leading-relaxed">
              <strong className="text-amber-100">Important:</strong> Blue
              Sapphire is very powerful — always consult an astrologer before
              wearing. Test for 3 days first.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Button
              data-ocid="blue_sapphire.hero.call_button"
              className="gap-2 text-sm font-semibold"
              style={{ background: "oklch(0.62 0.18 48)", color: "white" }}
              onClick={() => window.open("tel:+911234567890")}
            >
              <Phone className="w-4 h-4" />
              Call Now
            </Button>
            <Button
              data-ocid="blue_sapphire.hero.shop_button"
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
        data-ocid="blue_sapphire.tabs.nav"
        className="sticky top-0 z-40 bg-card border-b border-border shadow-sm"
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-none gap-0">
            {TABS.map((tab) => (
              <button
                type="button"
                key={tab.id}
                data-ocid={`blue_sapphire.tabs.${tab.id}`}
                onClick={() => scrollTo(tab.id)}
                className={`px-3 py-3 text-xs sm:text-sm font-body font-medium whitespace-nowrap border-b-2 transition-colors duration-150 ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-700"
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
        data-ocid="blue_sapphire.collection.section"
        className="py-12 bg-background"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-7 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Blue Sapphire (Neelam) Stone Collection
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Explore our handpicked collection of authentic, lab-certified Blue
              Sapphires. Each stone is tested, graded, and energized for
              astrological suitability.
            </p>
          </div>

          {/* Search + grade filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                data-ocid="blue_sapphire.collection.search_input"
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
                  data-ocid={`blue_sapphire.collection.grade_filter.${g.toLowerCase()}`}
                  variant={gradeFilter === g ? "default" : "outline"}
                  size="sm"
                  onClick={() => setGradeFilter(g)}
                  className={
                    gradeFilter === g
                      ? "bg-blue-700 hover:bg-blue-800 text-white"
                      : ""
                  }
                >
                  {g === "All" ? "All Grades" : `Grade ${g}`}
                </Button>
              ))}
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            Showing <strong>{filtered.length}</strong> of{" "}
            {BLUE_SAPPHIRE_PRODUCTS.length} blue sapphires
          </p>

          {filtered.length === 0 ? (
            <div
              data-ocid="blue_sapphire.collection.empty_state"
              className="text-center py-16 text-muted-foreground"
            >
              <Gem className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="font-body">
                No blue sapphires match your search. Try a different filter.
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
        data-ocid="blue_sapphire.about.section"
        className="py-12 bg-muted/30"
      >
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeading
            title="About Blue Sapphire (Neelam)"
            subtitle="The sacred gemstone of Saturn, revered for its powerful karmic and transformative properties"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {[
              { label: "Hindi Name", value: "नीलम", emoji: "📿" },
              {
                label: "Ruling Planet",
                value: "Saturn (Shani)",
                emoji: "🪐",
              },
              {
                label: "Zodiac Signs",
                value: "Capricorn, Aquarius",
                emoji: "♑",
              },
              {
                label: "Chakra",
                value: "Third Eye & Throat",
                emoji: "💙",
              },
              {
                label: "Price Range",
                value: "₹3,000–₹1,50,000 / carat",
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
              <Gem className="w-5 h-5 text-blue-600" />
              Price by Origin
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                {
                  origin: "Kashmir Blue Sapphire",
                  range: "₹1,00,000–₹1,50,000+/ct",
                  quality: "Legendary",
                  color: "bg-blue-50 border-blue-200",
                },
                {
                  origin: "Ceylon (Sri Lanka)",
                  range: "₹30,000–₹1,00,000/ct",
                  quality: "Premium",
                  color: "bg-indigo-50 border-indigo-200",
                },
                {
                  origin: "Burma Blue Sapphire",
                  range: "₹20,000–₹80,000/ct",
                  quality: "High",
                  color: "bg-blue-50 border-blue-200",
                },
                {
                  origin: "Australian Blue Sapphire",
                  range: "₹3,000–₹15,000/ct",
                  quality: "Standard",
                  color: "bg-sky-50 border-sky-200",
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
                    <Badge className="text-[10px] bg-blue-700 text-white">
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
        data-ocid="blue_sapphire.who_should_wear.section"
        className="py-12 bg-background"
      >
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeading
            title="Who Should Wear Blue Sapphire (Neelam)?"
            subtitle="Consult an astrologer first — this gemstone has fast and powerful effects"
          />

          {/* Warning banner */}
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 mb-6">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-body font-semibold text-amber-800 text-sm mb-1">
                Important Notice
              </p>
              <p className="font-body text-amber-700 text-sm">
                Blue Sapphire must be tested before permanent wearing — it shows
                effects within 3 days. Test by keeping under your pillow for 3
                nights before wearing.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {[
              {
                text: "Capricorn (Makar) and Aquarius (Kumbh) Rashi natives",
                icon: "♑",
              },
              {
                text: "Those experiencing Sade Sati or Shani Dasha",
                icon: "🪐",
              },
              {
                text: "Business owners and executives seeking stability",
                icon: "💼",
              },
              {
                text: "People in law, philosophy, or spirituality",
                icon: "⚖️",
              },
              {
                text: "Those with weak Saturn in their birth chart",
                icon: "📊",
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
                "linear-gradient(135deg, oklch(0.20 0.12 258), oklch(0.16 0.14 265))",
            }}
          >
            <div className="flex-1">
              <p className="font-display font-semibold text-white text-base mb-1">
                Not Sure If It Suits You?
              </p>
              <p className="text-blue-200 text-sm">
                Get personalized gemstone recommendation based on your birth
                chart from our expert astrologers.
              </p>
            </div>
            <Button
              data-ocid="blue_sapphire.consultation.cta_button"
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
        data-ocid="blue_sapphire.benefits.section"
        className="py-12 bg-muted/30"
      >
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeading
            title="Benefits of Blue Sapphire (Neelam) Stone"
            subtitle="Harness the transformative power of Saturn's gemstone across all dimensions of life"
          />

          {/* 6 benefit categories */}
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
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
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

          {/* Detailed bullet list */}
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                title: "Spiritual Benefits",
                icon: "🧘",
                items: [
                  "Deepens meditation and spiritual awareness",
                  "Accelerates karma resolution",
                  "Strengthens intuition and psychic abilities",
                  "Balances Third Eye and Throat chakras",
                ],
              },
              {
                title: "Emotional Benefits",
                icon: "💙",
                items: [
                  "Brings emotional discipline and stability",
                  "Calms anxiety and overthinking",
                  "Removes negative thought patterns",
                  "Encourages patience and perseverance",
                ],
              },
              {
                title: "Physical Benefits",
                icon: "💪",
                items: [
                  "Improves nervous system health",
                  "Beneficial for bones and joints",
                  "Aids in detoxification and metabolism",
                  "Improves vision and cognitive function",
                ],
              },
              {
                title: "Financial Benefits",
                icon: "💰",
                items: [
                  "Brings sudden wealth and windfalls",
                  "Accelerates career growth and promotions",
                  "Removes financial blockages",
                  "Attracts stable and consistent income",
                ],
              },
            ].map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -12 : 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-card border border-border rounded-xl p-5"
              >
                <h4 className="font-display font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
                  <span>{cat.icon}</span>
                  {cat.title}
                </h4>
                <ul className="space-y-1.5">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-muted-foreground font-body"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
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
        data-ocid="blue_sapphire.how_to_wear.section"
        className="py-12 bg-background"
      >
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading
            title="How to Wear Blue Sapphire (Neelam)"
            subtitle="Follow these Vedic guidelines for maximum astrological benefits — always test first"
          />

          <div className="bg-card border border-border rounded-2xl overflow-hidden mb-8">
            {HOW_TO_WEAR_ROWS.map((row, i) => (
              <div
                key={row.field}
                className={`flex items-center gap-4 px-6 py-4 ${i % 2 === 0 ? "bg-card" : "bg-blue-50/40"}`}
              >
                <span className="font-body font-semibold text-blue-700 text-sm w-28 flex-shrink-0">
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
                title: "Best Day to Wear",
                icon: "📅",
                desc: "Saturday evening during Shani (Saturn) hora. Wearing during Shukla Paksha (waxing moon) Saturday is most auspicious. Test the stone for 3 days first.",
              },
              {
                title: "Energization Process",
                icon: "🌊",
                desc: "Wash in black sesame water or Ganga Jal, wrap in blue cloth, and chant 'Om Sham Shanicharaya Namah' 108 times while holding the stone.",
              },
              {
                title: "Mantra to Chant",
                icon: "🕉️",
                desc: "Om Sham Shanicharaya Namah (108 times) OR Om Pram Prim Praum Sah Shanaye Namah for enhanced activation.",
              },
              {
                title: "Who Should Wear",
                icon: "🪐",
                desc: "Capricorn and Aquarius Rashi natives benefit most. Always consult an astrologer as Blue Sapphire has very powerful and fast effects.",
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

      {/* ── Care Guide ────────────────────────────────────────────────────────── */}
      <section
        id="care-guide"
        data-ocid="blue_sapphire.care_guide.section"
        className="py-12 bg-muted/30"
      >
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading
            title="Care Guide for Blue Sapphire"
            subtitle="Proper care preserves your Blue Sapphire's beauty and astrological potency"
          />

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {[
              {
                icon: "🏊",
                title: "Daily Care",
                items: [
                  "Remove before swimming, bathing, or heavy exercise",
                  "Store separately to avoid scratches",
                  "Keep away from harsh chemicals and perfumes",
                  "Clean gently after each wear",
                ],
                positive: true,
              },
              {
                icon: "🧹",
                title: "Cleaning Instructions",
                items: [
                  "Clean with lukewarm soapy water and a soft brush",
                  "Rinse thoroughly and pat dry",
                  "Can use ultrasonic cleaner (no fracture-filled stones)",
                  "Avoid steam cleaning for treated stones",
                ],
                positive: true,
              },
              {
                icon: "🌙",
                title: "Energetic Cleansing",
                items: [
                  "Recharge under moonlight on Saturdays",
                  "Wash with black sesame water or Ganga Jal monthly",
                  "Re-energize by chanting mantra during Shani hora",
                  "Keep near a Shani yantra",
                ],
                positive: true,
              },
              {
                icon: "⚠️",
                title: "What to Avoid",
                items: [
                  "Never wear without astrological consultation",
                  "Don't wear Ruby and Blue Sapphire together",
                  "Avoid during Rahu/Ketu transit without guidance",
                  "Don't let others wear your stone",
                ],
                positive: false,
              },
            ].map((cat) => (
              <div
                key={cat.title}
                className={`rounded-xl p-4 border ${cat.positive ? "bg-blue-50/40 border-blue-200" : "bg-red-50/30 border-red-200"}`}
              >
                <h4 className="font-body font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
                  <span>{cat.icon}</span>
                  {cat.title}
                </h4>
                <ul className="space-y-1.5">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-1.5 text-sm text-muted-foreground font-body"
                    >
                      <span className="flex-shrink-0 mt-0.5">
                        {cat.positive ? "✅" : "❌"}
                      </span>
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
        data-ocid="blue_sapphire.faq.section"
        className="py-12 bg-background"
      >
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeading
            title="People Also Ask"
            subtitle="Expert answers to your most important questions about Blue Sapphire (Neelam)"
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
              { icon: Zap, label: "Energized", sub: "Vedic Activation" },
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
                <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-blue-700" />
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
