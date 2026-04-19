import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/cartStore";
import {
  Brain,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  Eye,
  Gem,
  GraduationCap,
  HeartPulse,
  MessageCircle,
  Palette,
  Phone,
  Search,
  Shield,
  Sparkles,
  Star,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Product Data ──────────────────────────────────────────────────────────────

interface EmeraldProduct {
  name: string;
  sku: string;
  grade: "A" | "B" | "C";
  price: number;
  mrp: number;
  savings: number;
}

const EMERALD_PRODUCTS: EmeraldProduct[] = [
  {
    name: "Emerald 4 Carat (Grade B)",
    sku: "Emeralad24112025/4/21/4.00CT",
    grade: "B",
    price: 16720,
    mrp: 20900,
    savings: 4180,
  },
  {
    name: "Emerald 5.0 Carat (Grade B)",
    sku: "Emeralad24112025/4/21/4.90CT",
    grade: "B",
    price: 20482,
    mrp: 25602.5,
    savings: 5120.5,
  },
  {
    name: "Emerald 4.25 Carat (Grade B)",
    sku: "Emeralad24112025/4/21/4.25CT",
    grade: "B",
    price: 17765,
    mrp: 22206.25,
    savings: 4441.25,
  },
  {
    name: "Emerald 5.65 Carat (Grade C)",
    sku: "Emeralad24112025/4/21/5.65CT",
    grade: "C",
    price: 21752.5,
    mrp: 27190.63,
    savings: 5438.13,
  },
  {
    name: "Emerald 3.41 Carat (Grade B)",
    sku: "Emeralad/03/SH/3.41",
    grade: "B",
    price: 7502,
    mrp: 9377.5,
    savings: 1875.5,
  },
  {
    name: "Emerald 4.7 Carat (Grade C)",
    sku: "Emeralad24112025/4/21/4.70CT",
    grade: "C",
    price: 18095,
    mrp: 22618.75,
    savings: 4523.75,
  },
  {
    name: "Emerald 5.95 Carat (Grade A)",
    sku: "Emeralad24112025/4/21/5.95CT",
    grade: "A",
    price: 29452.5,
    mrp: 36815.63,
    savings: 7363.13,
  },
  {
    name: "Emerald 3.52 Carat (Grade B)",
    sku: "Emeralad/03/SH/3.52",
    grade: "B",
    price: 7744,
    mrp: 9680,
    savings: 1936,
  },
  {
    name: "Emerald 3.78 Carat (Grade A)",
    sku: "Emeralad24112025/4/21/3.78CT",
    grade: "A",
    price: 18810,
    mrp: 23512.5,
    savings: 4702.5,
  },
  {
    name: "Emerald 7.5 Carat (Grade A)",
    sku: "Emeralad24112025/4/21/7.50CT",
    grade: "A",
    price: 31350,
    mrp: 39187.5,
    savings: 7837.5,
  },
  {
    name: "Emerald 3.52 Carat (Grade B) v2",
    sku: "Emeralad/03/SH/3.52-b",
    grade: "B",
    price: 7744,
    mrp: 9680,
    savings: 1936,
  },
  {
    name: "Emerald 4.75 Carat (Grade B)",
    sku: "Emeralad24112025/4/21/4.75CT",
    grade: "B",
    price: 19855,
    mrp: 24818.75,
    savings: 4963.75,
  },
  {
    name: "Emerald 3.82 Carat (Grade B)",
    sku: "Emeralad/03/SH/3.82",
    grade: "B",
    price: 8404,
    mrp: 10505,
    savings: 2101,
  },
  {
    name: "Emerald 5.25 Carat (Grade C)",
    sku: "Emeralad24112025/4/21/5.25CT",
    grade: "C",
    price: 20212.5,
    mrp: 25265.63,
    savings: 5053.13,
  },
  {
    name: "Emerald 5.02 Carat (Grade B)",
    sku: "Emeralad/03/SH/5.02",
    grade: "B",
    price: 11044,
    mrp: 13805,
    savings: 2761,
  },
  {
    name: "Emerald 4.6 Carat (Grade B)",
    sku: "Emeralad24112025/4/21/4.60CT",
    grade: "B",
    price: 20240,
    mrp: 25300,
    savings: 5060,
  },
  {
    name: "Emerald 5.13 Carat (Grade B)",
    sku: "Emeralad/03/SH/5.13",
    grade: "B",
    price: 11286,
    mrp: 14107.5,
    savings: 2821.5,
  },
  {
    name: "Emerald 5.4 Carat (Grade C)",
    sku: "Emeralad24112025/4/21/5.40CT",
    grade: "C",
    price: 20790,
    mrp: 25987.5,
    savings: 5197.5,
  },
  {
    name: "Emerald 5.28 Carat (Grade B)",
    sku: "Emeralad/03/SH/5.28",
    grade: "B",
    price: 11616,
    mrp: 14520,
    savings: 2904,
  },
  {
    name: "Emerald 4.2 Carat (Grade B)",
    sku: "Emeralad24112025/4/21/4.20CT",
    grade: "B",
    price: 21037.5,
    mrp: 26296.88,
    savings: 5259.38,
  },
  {
    name: "Emerald 5.7 Carat (Grade C)",
    sku: "Emeralad24112025/4/21/5.70CT-c",
    grade: "C",
    price: 21945,
    mrp: 27431.25,
    savings: 5486.25,
  },
  {
    name: "Emerald 2.85 Carat (Grade A)",
    sku: "Emeralad24112025/4/21/2.85CT",
    grade: "A",
    price: 13706,
    mrp: 17132.5,
    savings: 3426.5,
  },
  {
    name: "Emerald 4.75 Carat (Grade A)",
    sku: "Emeralad24112025/4/21/4.75CT-a",
    grade: "A",
    price: 23512.5,
    mrp: 29390.63,
    savings: 5878.13,
  },
  {
    name: "Emerald 3.8 Carat (Grade B)",
    sku: "Emeralad24112025/4/21/3.80CT",
    grade: "B",
    price: 15884,
    mrp: 19855,
    savings: 3971,
  },
  {
    name: "Emerald 5.7 Carat (Grade B)",
    sku: "Emeralad24112025/4/21/5.70CT-b",
    grade: "B",
    price: 23826,
    mrp: 29782.5,
    savings: 5956.5,
  },
  {
    name: "Emerald 3.95 Carat (Grade B)",
    sku: "Emeralad24112025/4/21/3.95CT",
    grade: "B",
    price: 16511,
    mrp: 20638.75,
    savings: 4127.75,
  },
  {
    name: "Emerald 5.8 Carat (Grade B)",
    sku: "Emeralad24112025/4/21/5.80CT-b",
    grade: "B",
    price: 24244,
    mrp: 30305,
    savings: 6061,
  },
  {
    name: "Emerald 4.05 Carat (Grade B)",
    sku: "Emeralad24112025/4/21/4.05CT",
    grade: "B",
    price: 16929,
    mrp: 21161.25,
    savings: 4232.25,
  },
  {
    name: "Emerald 5.88 Carat (Grade B)",
    sku: "Emeralad24112025/4/21/5.85CT",
    grade: "B",
    price: 24453,
    mrp: 30566.25,
    savings: 6113.25,
  },
  {
    name: "Emerald 4.25 Carat (Grade B) v2",
    sku: "Emeralad24112025/4/21/4.25CT-b",
    grade: "B",
    price: 17556,
    mrp: 21945,
    savings: 4389,
  },
  {
    name: "Emerald 4.45 Carat (Grade B)",
    sku: "Emeralad24112025/4/21/4.45CT",
    grade: "B",
    price: 18601,
    mrp: 23251.25,
    savings: 4650.25,
  },
  {
    name: "Emerald 4.65 Carat (Grade B)",
    sku: "Emeralad24112025/4/21/4.65CT",
    grade: "B",
    price: 19437,
    mrp: 24296.25,
    savings: 4859.25,
  },
  {
    name: "Emerald 6.95 Carat (Grade C)",
    sku: "Emeralad24112025/4/21/6.95CT",
    grade: "C",
    price: 26757.5,
    mrp: 33446.88,
    savings: 6689.38,
  },
  {
    name: "Emerald 4.85 Carat (Grade B)",
    sku: "Emeralad24112025/4/21/4.85CT",
    grade: "B",
    price: 20273,
    mrp: 25341.25,
    savings: 5068.25,
  },
  {
    name: "Emerald 5.7 Carat (Grade A)",
    sku: "Emeralad24112025/4/21/5.70CT-a",
    grade: "A",
    price: 28215,
    mrp: 35268.75,
    savings: 7053.75,
  },
  {
    name: "Emerald 4.10 Carat (Grade A)",
    sku: "Emeralad24112025/4/21/4.10CT",
    grade: "A",
    price: 20295,
    mrp: 25368.75,
    savings: 5073.75,
  },
  {
    name: "Emerald 5.8 Carat (Grade A)",
    sku: "Emeralad24112025/4/21/5.80CT-a",
    grade: "A",
    price: 28710,
    mrp: 35887.5,
    savings: 7177.5,
  },
  {
    name: "Emerald 4.95 Carat (Grade B)",
    sku: "Emeralad24112025/4/21/4.95CT",
    grade: "B",
    price: 20691,
    mrp: 25863.75,
    savings: 5172.75,
  },
  {
    name: "Emerald 6.2 Carat (Grade A)",
    sku: "Emeralad24112025/4/21/6.20CT",
    grade: "A",
    price: 30690,
    mrp: 38362.5,
    savings: 7672.5,
  },
  {
    name: "Emerald 4.43 Carat (Grade A)",
    sku: "Emeralad24112025/4/21/4.45CT-a",
    grade: "A",
    price: 22027.5,
    mrp: 27534.38,
    savings: 5506.88,
  },
  {
    name: "Emerald 6.75 Carat (Grade A)",
    sku: "Emeralad24112025/4/21/6.75CT",
    grade: "A",
    price: 33412.5,
    mrp: 41765.63,
    savings: 8353.13,
  },
  {
    name: "Emerald 4.8 Carat (Grade A)",
    sku: "Emeralad24112025/4/21/4.80CT",
    grade: "A",
    price: 23760,
    mrp: 29700,
    savings: 5940,
  },
  {
    name: "Emerald 7.55 Carat (Grade A)",
    sku: "Emeralad24112025/4/21/7.55CT",
    grade: "A",
    price: 37372.5,
    mrp: 46715.63,
    savings: 9343.13,
  },
  {
    name: "Emerald 3.75 Carat",
    sku: "Emeralad24112025/4/21/3.75CT",
    grade: "A",
    price: 24750,
    mrp: 30937.5,
    savings: 6187.5,
  },
  {
    name: "Emerald 9.75 Carat (Grade B)",
    sku: "Emeralad24112025/4/21/9.75CT",
    grade: "B",
    price: 40755,
    mrp: 50943.75,
    savings: 10188.75,
  },
  {
    name: "Emerald 8.5 Carat (Grade A)",
    sku: "Emeralad24112025/4/21/8.50CT",
    grade: "A",
    price: 42075,
    mrp: 52593.75,
    savings: 10518.75,
  },
];

// ─── Constants ────────────────────────────────────────────────────────────────

const HIGHLIGHTS = [
  "Intelligence & Wisdom",
  "Communication Skills",
  "Business Success",
  "Creative Expression",
];

const TABS = [
  { id: "about", label: "About" },
  { id: "who-should-wear", label: "Who Should Wear" },
  { id: "how-to-wear", label: "How to Wear" },
  { id: "benefits", label: "Benefits" },
  { id: "quality-price", label: "Quality & Price" },
  { id: "how-to-clean", label: "How to Clean" },
  { id: "how-to-care", label: "How to Care" },
  { id: "types", label: "Types" },
  { id: "faq", label: "People Also Ask" },
];

const BENEFITS = [
  {
    icon: Brain,
    title: "Enhanced Intelligence",
    desc: "Sharpens mind, improves memory and analytical thinking skills",
    color: "text-emerald-600",
  },
  {
    icon: MessageCircle,
    title: "Communication Skills",
    desc: "Improves speech, writing, and presentation abilities",
    color: "text-teal-600",
  },
  {
    icon: Briefcase,
    title: "Business Success",
    desc: "Attracts profitable opportunities and wise business decisions",
    color: "text-emerald-700",
  },
  {
    icon: Palette,
    title: "Creative Expression",
    desc: "Enhances artistic abilities and creative thinking capacity",
    color: "text-green-600",
  },
  {
    icon: GraduationCap,
    title: "Academic Excellence",
    desc: "Improves concentration and learning capacity for students",
    color: "text-teal-700",
  },
  {
    icon: HeartPulse,
    title: "Nervous System",
    desc: "Beneficial for nervous system health and skin conditions",
    color: "text-emerald-600",
  },
];

const HOW_TO_WEAR_ROWS = [
  { field: "Weight", value: "1/10th of body weight" },
  { field: "Color", value: "Deep green with good saturation" },
  { field: "Metal", value: "Gold or Silver" },
  { field: "Finger", value: "Little finger of the right hand" },
  { field: "Day & Time", value: "Wednesday morning during Mercury hora" },
  { field: "Mantra", value: "Om Bum Budhaya Namah (108 times)" },
];

const FAQ_ITEMS = [
  {
    q: "What is Emerald (Panna) gemstone?",
    a: "Emerald (Panna) is the precious green gemstone of Mercury (Budh), the planet of intellect and communication. It is a variety of the mineral beryl, colored green by trace amounts of chromium and vanadium. Emerald is one of the four recognized precious gemstones alongside diamond, ruby, and sapphire.",
  },
  {
    q: "What is the price of Emerald (Panna)?",
    a: "Emerald prices range from ₹2,000 to ₹1,00,000 per carat depending on origin, clarity, and treatment. Colombian emeralds are the most valuable (₹15,000–₹1,00,000+/ct), followed by Russian (₹8,000–₹40,000/ct), Zambian (₹5,000–₹50,000/ct), and Brazilian (₹3,000–₹25,000/ct).",
  },
  {
    q: "How to wear Emerald (Panna) stone?",
    a: "Emerald should be worn on the little finger of the right hand in gold or silver metal. The ideal time is Wednesday morning during Mercury hora. Before wearing, chant 'Om Bum Budhaya Namah' 108 times for activation. The recommended weight is 1/10th of your body weight in carats.",
  },
  {
    q: "Is treated emerald effective for astrology?",
    a: "Minor oil treatment is acceptable and natural for emeralds — most natural emeralds receive light oiling to enhance clarity. However, heavily treated or synthetic stones may have reduced astrological effects. Always opt for natural, lab-certified emeralds with minor or no treatment for astrological purposes.",
  },
  {
    q: "Who should wear Emerald (Panna)?",
    a: "Emerald is primarily recommended for Gemini (Mithun) and Virgo (Kanya) Rashi natives, as Mercury rules these signs. It also benefits writers, artists, business owners, students, and those in communication careers. Always consult a qualified astrologer before wearing any gemstone.",
  },
  {
    q: "What is the minimum carat for astrological effects?",
    a: "For astrological effects, a minimum of 3 Ratti (approximately 2.74 carats) is typically recommended. The traditional guideline is 1/10th to 1/12th of your body weight in Ratti. A 60 kg person would benefit from a 5–6 Ratti (4.5–5.5 carat) emerald. Quality matters more than size — a smaller high-quality stone is more effective.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function GradeTag({ grade }: { grade: "A" | "B" | "C" }) {
  const colors: Record<string, string> = {
    A: "bg-emerald-100 text-emerald-800 border-emerald-300",
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
  onAddToCart,
}: {
  product: EmeraldProduct;
  index: number;
  onAddToCart: (product: EmeraldProduct) => void;
}) {
  return (
    <motion.div
      data-ocid={`emerald.product.item.${index + 1}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: (index % 6) * 0.05 }}
      className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
    >
      {/* Card image area */}
      <div className="relative bg-gradient-to-br from-emerald-50 to-emerald-100 h-36 flex items-center justify-center">
        <div className="text-5xl select-none">💚</div>
        <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
          <Badge className="bg-emerald-700 text-white text-[10px] px-1.5 py-0.5 rounded">
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
            (112)
          </span>
        </div>

        {/* Pricing */}
        <div className="mt-auto pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-emerald-700 font-bold text-base font-body">
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
          <p className="text-[11px] text-emerald-600 font-medium">
            Save Rs.{" "}
            {product.savings.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        <Button
          data-ocid={`emerald.product.view_details.${index + 1}`}
          size="sm"
          onClick={() => onAddToCart(product)}
          className="w-full mt-1 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-body"
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
      data-ocid={`emerald.faq.item.${index + 1}`}
      className="border border-border rounded-xl overflow-hidden"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-card hover:bg-emerald-50/50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-body font-semibold text-foreground text-sm sm:text-base">
          {q}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-emerald-700 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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
            <div className="px-5 pb-4 pt-0 font-body text-muted-foreground text-sm leading-relaxed bg-emerald-50/30">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function EmeraldStonePage() {
  const [highlightIdx, setHighlightIdx] = useState(0);
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState<"All" | "A" | "B" | "C">(
    "All",
  );
  const [activeTab, setActiveTab] = useState("about");
  const [cartToast, setCartToast] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const cartToastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { addItem, setCartOpen } = useCartStore();

  function handleAddToCart(product: EmeraldProduct) {
    addItem({
      id: product.sku,
      name: product.name,
      price: product.price,
      category: "Gemstone",
      variantName: undefined,
    });
    setCartOpen(true);
    setCartToast(true);
    if (cartToastTimer.current) clearTimeout(cartToastTimer.current);
    cartToastTimer.current = setTimeout(() => setCartToast(false), 2000);
  }

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

  const filtered = EMERALD_PRODUCTS.filter((p) => {
    const matchSearch =
      search.trim() === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchGrade = gradeFilter === "All" || p.grade === gradeFilter;
    return matchSearch && matchGrade;
  });

  return (
    <div className="min-h-screen bg-background font-body">
      {/* ── Cart Added Toast ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {cartToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            data-ocid="emerald.cart.success_state"
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-full shadow-lg text-sm font-semibold text-white pointer-events-none"
            style={{ background: "oklch(0.42 0.15 150)" }}
          >
            <CheckCircle2 className="w-4 h-4" />
            Added to cart!
          </motion.div>
        )}
      </AnimatePresence>
      <section
        data-ocid="emerald.hero.section"
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.10 150) 0%, oklch(0.18 0.12 155) 40%, oklch(0.14 0.09 160) 100%)",
        }}
      >
        {/* Background image overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('/assets/generated/emerald-hero.dim_1200x600.jpg')",
          }}
        />
        {/* Gem decorations */}
        <div className="absolute top-8 right-8 text-6xl opacity-20 select-none">
          💎
        </div>
        <div className="absolute bottom-8 left-6 text-4xl opacity-15 select-none">
          ✨
        </div>
        <div className="absolute top-1/2 right-1/4 text-3xl opacity-10 select-none">
          🟢
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
            Emerald{" "}
            <span style={{ color: "oklch(0.82 0.14 80)" }}>(Panna)</span> Stone
          </h1>
          <p className="text-emerald-200 text-base sm:text-lg mb-5 max-w-xl leading-relaxed">
            The gemstone of Mercury — planet of intellect & communication.
            Handpicked, lab-certified, energized.
          </p>

          {/* Cycling highlight */}
          <div className="flex items-center gap-3 mb-6">
            <Gem className="w-4 h-4 text-emerald-300 flex-shrink-0" />
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
          <div className="flex flex-wrap gap-2 mb-7">
            {["R", "P", "A", "S"].map((badge) => (
              <span
                key={badge}
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                style={{
                  background: "oklch(0.78 0.14 80)",
                  color: "oklch(0.15 0.05 155)",
                }}
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Quote */}
          <blockquote
            className="italic text-sm text-emerald-200 border-l-2 pl-3 mb-8"
            style={{ borderColor: "oklch(0.78 0.14 80)" }}
          >
            "Unlock the power of your mind with Mercury's blessing."
          </blockquote>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Button
              data-ocid="emerald.hero.call_button"
              className="gap-2 text-sm font-semibold"
              style={{ background: "oklch(0.62 0.18 48)", color: "white" }}
              onClick={() => window.open("tel:+911234567890")}
            >
              <Phone className="w-4 h-4" />
              Call Now
            </Button>
            <Button
              data-ocid="emerald.hero.shop_button"
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
        data-ocid="emerald.tabs.nav"
        className="sticky top-0 z-40 bg-card border-b border-border shadow-sm"
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-none gap-0">
            {TABS.map((tab) => (
              <button
                type="button"
                key={tab.id}
                data-ocid={`emerald.tabs.${tab.id}`}
                onClick={() => scrollTo(tab.id)}
                className={`px-3 py-3 text-xs sm:text-sm font-body font-medium whitespace-nowrap border-b-2 transition-colors duration-150 ${
                  activeTab === tab.id
                    ? "border-emerald-600 text-emerald-700"
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
        data-ocid="emerald.collection.section"
        className="py-12 bg-background"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-7 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Emerald (Panna) Stone Online Collection
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Explore our handpicked collection of authentic, lab-certified
              Emeralds. Each stone is tested for quality and graded for
              astrological suitability.
            </p>
          </div>

          {/* Search + grade filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                data-ocid="emerald.collection.search_input"
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
                  data-ocid={`emerald.collection.grade_filter.${g.toLowerCase()}`}
                  variant={gradeFilter === g ? "default" : "outline"}
                  size="sm"
                  onClick={() => setGradeFilter(g)}
                  className={
                    gradeFilter === g
                      ? "bg-emerald-700 hover:bg-emerald-800 text-white"
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
            {EMERALD_PRODUCTS.length} emeralds
          </p>

          {filtered.length === 0 ? (
            <div
              data-ocid="emerald.collection.empty_state"
              className="text-center py-16 text-muted-foreground"
            >
              <Gem className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="font-body">
                No emeralds match your search. Try a different filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filtered.map((product, i) => (
                <ProductCard
                  key={product.sku}
                  product={product}
                  index={i}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Separator />

      {/* ── About ─────────────────────────────────────────────────────────────── */}
      <section
        id="about"
        data-ocid="emerald.about.section"
        className="py-12 bg-muted/30"
      >
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeading
            title="About Emerald (Panna)"
            subtitle="The sacred gemstone of Mercury, revered for millennia in Vedic astrology"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {[
              { label: "Hindi Name", value: "पन्ना", emoji: "📿" },
              { label: "Ruling Planet", value: "Mercury (Budh)", emoji: "☿" },
              { label: "Zodiac Signs", value: "Gemini, Virgo", emoji: "♊" },
              { label: "Chakra", value: "Heart (Anahata)", emoji: "💚" },
              {
                label: "Price Range",
                value: "₹2,000–₹1,00,000 / carat",
                emoji: "💰",
              },
              { label: "Hardness", value: "7.5–8 on Mohs scale", emoji: "💎" },
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
              <Gem className="w-5 h-5 text-emerald-600" />
              Price by Origin
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                {
                  origin: "Colombian Emerald",
                  range: "₹15,000–₹1,00,000+/ct",
                  quality: "Premium",
                  color: "bg-emerald-50 border-emerald-200",
                },
                {
                  origin: "Russian Emerald",
                  range: "₹8,000–₹40,000/ct",
                  quality: "High",
                  color: "bg-teal-50 border-teal-200",
                },
                {
                  origin: "Zambian Emerald",
                  range: "₹5,000–₹50,000/ct",
                  quality: "High",
                  color: "bg-green-50 border-green-200",
                },
                {
                  origin: "Brazilian Emerald",
                  range: "₹3,000–₹25,000/ct",
                  quality: "Standard",
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
                    <Badge className="text-[10px] bg-emerald-700 text-white">
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
        data-ocid="emerald.who_should_wear.section"
        className="py-12 bg-background"
      >
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeading
            title="Who Should Wear Emerald (Panna)?"
            subtitle="Discover if this powerful gemstone is aligned with your birth chart"
          />

          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {[
              {
                text: "Gemini (Mithun) and Virgo (Kanya) Rashi natives",
                icon: "♊",
              },
              {
                text: "Writers, artists, and creative professionals",
                icon: "🎨",
              },
              { text: "Business owners and entrepreneurs", icon: "💼" },
              { text: "Students preparing for competitive exams", icon: "📚" },
              { text: "Those in communication-related careers", icon: "🗣️" },
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
                "linear-gradient(135deg, oklch(0.24 0.10 152), oklch(0.20 0.12 158))",
            }}
          >
            <div className="flex-1">
              <p className="font-display font-semibold text-white text-base mb-1">
                Not Sure If It Suits You?
              </p>
              <p className="text-emerald-200 text-sm">
                Get personalized gemstone recommendation based on your birth
                chart from our expert astrologers.
              </p>
            </div>
            <Button
              data-ocid="emerald.consultation.cta_button"
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
        data-ocid="emerald.benefits.section"
        className="py-12 bg-muted/30"
      >
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeading
            title="Benefits of Emerald (Panna) Stone"
            subtitle="Harness the transformative power of Mercury's gemstone"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded-2xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-3">
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
        </div>
      </section>

      {/* ── How to Wear ───────────────────────────────────────────────────────── */}
      <section
        id="how-to-wear"
        data-ocid="emerald.how_to_wear.section"
        className="py-12 bg-background"
      >
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading
            title="How to Wear Emerald (Panna)"
            subtitle="Follow these Vedic guidelines for maximum astrological benefits"
          />
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {HOW_TO_WEAR_ROWS.map((row, i) => (
              <div
                key={row.field}
                className={`flex items-center gap-4 px-6 py-4 ${i % 2 === 0 ? "bg-card" : "bg-emerald-50/40"}`}
              >
                <span className="font-body font-semibold text-emerald-700 text-sm w-28 flex-shrink-0">
                  {row.field}
                </span>
                <Separator orientation="vertical" className="h-5" />
                <span className="font-body text-foreground text-sm">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quality & Price ───────────────────────────────────────────────────── */}
      <section
        id="quality-price"
        data-ocid="emerald.quality_price.section"
        className="py-12 bg-muted/30"
      >
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeading
            title="Quality & Price Guide"
            subtitle="Understanding emerald grades helps you make an informed purchase"
          />
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                grade: "A",
                title: "Grade A — Premium",
                desc: "Finest quality. Deep, vivid green color, excellent clarity, minimal inclusions. Best for astrological use. Colombian origin preferred.",
                price: "₹4,500–₹8,000+/ct",
                badge: "Best for Astrology",
                badgeColor: "bg-emerald-700",
              },
              {
                grade: "B",
                title: "Grade B — Standard",
                desc: "Good quality. Moderate green with acceptable inclusions. Suitable for both jewelry and astrological purposes.",
                price: "₹1,800–₹4,500/ct",
                badge: "Popular Choice",
                badgeColor: "bg-blue-600",
              },
              {
                grade: "C",
                title: "Grade C — Value",
                desc: "Entry-level quality. Lighter green with visible inclusions. Suitable for jewelry. Limited astrological use.",
                price: "₹700–₹1,800/ct",
                badge: "Budget Friendly",
                badgeColor: "bg-amber-600",
              },
            ].map((g) => (
              <motion.div
                key={g.grade}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-3"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-display font-semibold text-foreground text-base">
                    {g.title}
                  </h3>
                  <span
                    className={`${g.badgeColor} text-white text-[10px] font-bold px-2 py-0.5 rounded`}
                  >
                    {g.badge}
                  </span>
                </div>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  {g.desc}
                </p>
                <div className="mt-auto pt-2 border-t border-border">
                  <p className="font-body text-xs text-muted-foreground">
                    Price per carat
                  </p>
                  <p className="font-body font-bold text-emerald-700">
                    {g.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How to Clean ─────────────────────────────────────────────────────── */}
      <section
        id="how-to-clean"
        data-ocid="emerald.how_to_clean.section"
        className="py-12 bg-background"
      >
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading
            title="How to Clean Emerald"
            subtitle="Proper cleaning preserves your emerald's beauty and astrological properties"
          />
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: "Use Soft Cloth",
                desc: "Wipe gently with a soft, lint-free cloth after each wear. This removes oils and dust without scratching the surface.",
                do: true,
              },
              {
                title: "Mild Soapy Water",
                desc: "Occasionally soak in lukewarm water with a drop of mild dish soap. Use a soft toothbrush gently on the setting.",
                do: true,
              },
              {
                title: "Avoid Ultrasonic Cleaners",
                desc: "Never use ultrasonic or steam cleaners — they can crack the stone or remove natural oils that fill fractures.",
                do: false,
              },
              {
                title: "Avoid Harsh Chemicals",
                desc: "Keep emerald away from bleach, ammonia, acetone, and perfumes. These damage the natural filling and reduce luster.",
                do: false,
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`rounded-xl p-4 border flex gap-3 ${item.do ? "bg-emerald-50/50 border-emerald-200" : "bg-red-50/40 border-red-200"}`}
              >
                <span className="text-lg">{item.do ? "✅" : "❌"}</span>
                <div>
                  <p className="font-body font-semibold text-foreground text-sm mb-1">
                    {item.title}
                  </p>
                  <p className="font-body text-muted-foreground text-sm">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How to Care ──────────────────────────────────────────────────────── */}
      <section
        id="how-to-care"
        data-ocid="emerald.how_to_care.section"
        className="py-12 bg-muted/30"
      >
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading
            title="How to Care for Emerald"
            subtitle="Long-term care ensures your emerald retains its power and beauty"
          />
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: "🌡️",
                title: "Avoid Extreme Heat",
                desc: "Do not expose to direct sunlight for extended periods or place near heat sources. Thermal shock can cause fractures.",
              },
              {
                icon: "🧴",
                title: "Chemical-Free Wear",
                desc: "Apply perfumes, lotions, and hairsprays before wearing your emerald. Chemicals accelerate deterioration.",
              },
              {
                icon: "📦",
                title: "Store Separately",
                desc: "Store in a soft pouch or individual compartment. Harder stones like diamonds can scratch emerald (hardness 7.5–8).",
              },
              {
                icon: "💧",
                title: "Re-oiling Periodically",
                desc: "Natural emeralds benefit from occasional re-oiling with cedar oil to maintain clarity and luster. Consult a jeweler.",
              },
            ].map((item) => (
              <div
                key={item.icon}
                className="bg-card border border-border rounded-xl p-4 flex gap-3"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-body font-semibold text-foreground text-sm mb-1">
                    {item.title}
                  </p>
                  <p className="font-body text-muted-foreground text-sm">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Types ─────────────────────────────────────────────────────────────── */}
      <section
        id="types"
        data-ocid="emerald.types.section"
        className="py-12 bg-background"
      >
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeading
            title="Types of Emerald"
            subtitle="Understanding the different varieties helps you choose wisely"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Natural Emerald",
                desc: "Formed over millions of years naturally in the earth. Contains unique inclusions called 'jardin'. Strongest astrological properties.",
                badge: "Recommended",
                color: "border-emerald-300 bg-emerald-50/30",
              },
              {
                title: "Synthetic Emerald",
                desc: "Lab-created with identical chemical composition but no natural energy. Not recommended for astrological use — only for jewelry.",
                badge: "Not for Astrology",
                color: "border-red-200 bg-red-50/20",
              },
              {
                title: "Colombian Emerald",
                desc: "World's finest. Distinctive bluish-green hue with exceptional transparency. From Muzo, Chivor, and Coscuez mines.",
                badge: "Premium Origin",
                color: "border-emerald-300 bg-emerald-50/30",
              },
              {
                title: "Zambian Emerald",
                desc: "High-quality African emeralds with slightly bluish tone and fewer inclusions than Colombian. Excellent value for premium quality.",
                badge: "High Quality",
                color: "border-teal-200 bg-teal-50/20",
              },
              {
                title: "Minor Oil Treatment",
                desc: "Acceptable industry-standard treatment that fills natural fractures with cedar oil. Does not affect astrological properties significantly.",
                badge: "Acceptable",
                color: "border-amber-200 bg-amber-50/20",
              },
              {
                title: "Heavily Treated",
                desc: "Stones with resin filling or dye to mask poor quality. Significantly reduces or eliminates astrological effectiveness.",
                badge: "Avoid",
                color: "border-red-200 bg-red-50/20",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`rounded-xl p-4 border ${item.color}`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display font-semibold text-foreground text-sm">
                    {item.title}
                  </h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                      item.badge === "Recommended" ||
                      item.badge === "Premium Origin" ||
                      item.badge === "High Quality"
                        ? "bg-emerald-600 text-white"
                        : item.badge === "Acceptable"
                          ? "bg-amber-500 text-white"
                          : "bg-red-500 text-white"
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <section
        id="faq"
        data-ocid="emerald.faq.section"
        className="py-12 bg-muted/30"
      >
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeading
            title="People Also Ask"
            subtitle="Expert answers to your most important questions about Emerald (Panna)"
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
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-emerald-700" />
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
}: { title: string; subtitle: string }) {
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
