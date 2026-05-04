import { Badge } from "@/components/ui/badge";
import {
  ArrowUpDown,
  ChevronDown,
  Filter,
  ShoppingCart,
  Star,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import FavouriteButton from "../components/FavouriteButton";
import WhatsAppShare from "../components/WhatsAppShare";
import { useLanguage } from "../contexts/LanguageContext";
import { type MoolankOil, faqData, moolankOils } from "../data/moolankOilData";
import { useCartStore } from "../stores/cartStore";

const RASHIS = [
  "All",
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

const RASHIS_HINDI: Record<string, string> = {
  All: "सभी",
  Aries: "मेष",
  Taurus: "वृषभ",
  Gemini: "मिथुन",
  Cancer: "कर्क",
  Leo: "सिंह",
  Virgo: "कन्या",
  Libra: "तुला",
  Scorpio: "वृश्चिक",
  Sagittarius: "धनु",
  Capricorn: "मकर",
  Aquarius: "कुंभ",
  Pisces: "मीन",
};

export default function MoolankOilStore() {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const addItem = useCartStore((s) => s.addItem);

  const [sortOrder, setSortOrder] = useState<"low" | "high">("low");
  const [filterRashi, setFilterRashi] = useState("All");
  const [filterMoolank, setFilterMoolank] = useState<number | 0>(0);
  const [filterAvailability, setFilterAvailability] = useState("all");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    let list = [...moolankOils];
    if (filterRashi !== "All") {
      list = list.filter((o) => o.rashi.includes(filterRashi));
    }
    if (filterMoolank !== 0) {
      list = list.filter((o) => o.moolankNumber === filterMoolank);
    }
    list.sort((a, b) =>
      sortOrder === "low" ? a.price - b.price : b.price - a.price,
    );
    return list;
  }, [sortOrder, filterRashi, filterMoolank]);

  function handleAddToCart(oil: MoolankOil) {
    addItem({
      id: oil.id,
      name: isHindi ? oil.nameHindi : oil.name,
      price: oil.price,
      category: "Moolank Oil",
    });
    toast.success(
      isHindi ? `${oil.nameHindi} कार्ट में जोड़ा!` : `${oil.name} added to cart!`,
      { duration: 2500 },
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <section
        className="py-14 px-4 text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.26 0.08 28) 80%, oklch(0.28 0.10 35) 100%)",
        }}
        data-ocid="moolank_oil.header.section"
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, oklch(0.78 0.14 75 / 0.4) 0%, transparent 60%), radial-gradient(circle at 70% 30%, oklch(0.68 0.20 48 / 0.3) 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{
              background: "oklch(0.78 0.14 75 / 0.15)",
              border: "1px solid oklch(0.78 0.14 75 / 0.35)",
              color: "oklch(0.78 0.14 75)",
            }}
          >
            💧 {isHindi ? "ज्योतिष उपाय तेल" : "Astrology Remedy Oils"}
          </span>
          <h1
            className="text-4xl md:text-5xl font-decorative font-bold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {isHindi ? "मूलांक तेल" : "Moolank Oils"}
          </h1>
          <p
            className="text-lg font-body"
            style={{ color: "oklch(0.88 0.06 75 / 0.75)" }}
          >
            {isHindi
              ? "ऊर्जा संतुलन और स्वास्थ्य के लिए ज्योतिष उपाय तेल"
              : "Astrology Remedy Oils for Energy Balance & Wellness"}
          </p>
          <div className="flex items-center justify-center gap-6 mt-5 flex-wrap">
            {[
              { n: "9", label: isHindi ? "तेल" : "Oils" },
              { n: "₹999", label: isHindi ? "प्रत्येक" : "Each" },
              { n: "23%", label: isHindi ? "छूट" : "Discount" },
              { n: "50K+", label: isHindi ? "परामर्श" : "Consultations" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p
                  className="text-2xl font-decorative font-bold"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {stat.n}
                </p>
                <p
                  className="text-xs font-body"
                  style={{ color: "oklch(0.78 0.14 75 / 0.6)" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter + Sort Bar */}
      <section
        className="sticky top-16 z-30 border-b px-4 py-3"
        style={{
          background: "oklch(0.14 0.05 20 / 0.96)",
          borderColor: "oklch(0.78 0.14 75 / 0.18)",
          backdropFilter: "blur(12px)",
        }}
        data-ocid="moolank_oil.filter_bar"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3 items-center">
          {/* Sort */}
          <div className="flex items-center gap-2">
            <ArrowUpDown
              className="h-4 w-4"
              style={{ color: "oklch(0.78 0.14 75)" }}
            />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "low" | "high")}
              className="text-xs rounded-lg px-3 py-1.5 font-body border focus:outline-none"
              style={{
                background: "oklch(0.20 0.08 22)",
                border: "1px solid oklch(0.78 0.14 75 / 0.25)",
                color: "oklch(0.88 0.06 75)",
              }}
              data-ocid="moolank_oil.sort_select"
            >
              <option value="low">
                {isHindi ? "मूल्य: कम से अधिक" : "Price: Low to High"}
              </option>
              <option value="high">
                {isHindi ? "मूल्य: अधिक से कम" : "Price: High to Low"}
              </option>
            </select>
          </div>

          {/* Filter by Rashi */}
          <div className="flex items-center gap-2">
            <Filter
              className="h-4 w-4"
              style={{ color: "oklch(0.78 0.14 75)" }}
            />
            <select
              value={filterRashi}
              onChange={(e) => setFilterRashi(e.target.value)}
              className="text-xs rounded-lg px-3 py-1.5 font-body border focus:outline-none"
              style={{
                background: "oklch(0.20 0.08 22)",
                border: "1px solid oklch(0.78 0.14 75 / 0.25)",
                color: "oklch(0.88 0.06 75)",
              }}
              data-ocid="moolank_oil.rashi_filter"
            >
              {RASHIS.map((r) => (
                <option key={r} value={r}>
                  {isHindi ? RASHIS_HINDI[r] : r}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Moolank Number */}
          <select
            value={filterMoolank}
            onChange={(e) => setFilterMoolank(Number(e.target.value))}
            className="text-xs rounded-lg px-3 py-1.5 font-body border focus:outline-none"
            style={{
              background: "oklch(0.20 0.08 22)",
              border: "1px solid oklch(0.78 0.14 75 / 0.25)",
              color: "oklch(0.88 0.06 75)",
            }}
            data-ocid="moolank_oil.moolank_filter"
          >
            <option value={0}>
              {isHindi ? "सभी मूलांक" : "All Moolank Numbers"}
            </option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <option key={n} value={n}>
                {isHindi ? `मूलांक ${n}` : `Moolank ${n}`}
              </option>
            ))}
          </select>

          {/* Availability */}
          <select
            value={filterAvailability}
            onChange={(e) => setFilterAvailability(e.target.value)}
            className="text-xs rounded-lg px-3 py-1.5 font-body border focus:outline-none"
            style={{
              background: "oklch(0.20 0.08 22)",
              border: "1px solid oklch(0.78 0.14 75 / 0.25)",
              color: "oklch(0.88 0.06 75)",
            }}
            data-ocid="moolank_oil.availability_filter"
          >
            <option value="all">
              {isHindi ? "सभी उत्पाद" : "All Products"}
            </option>
            <option value="in_stock">{isHindi ? "उपलब्ध" : "In Stock"}</option>
          </select>

          <span
            className="ml-auto text-xs font-body"
            style={{ color: "oklch(0.68 0.12 65)" }}
          >
            {filtered.length} {isHindi ? "उत्पाद" : "products"}
          </span>
        </div>
      </section>

      {/* Products Grid */}
      <section
        className="max-w-7xl mx-auto px-4 py-10"
        data-ocid="moolank_oil.products.section"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((oil, idx) => (
            <OilCard
              key={oil.id}
              oil={oil}
              isHindi={isHindi}
              index={idx + 1}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div
            className="text-center py-20"
            data-ocid="moolank_oil.empty_state"
          >
            <p className="text-4xl mb-3">💧</p>
            <p
              className="font-body text-base"
              style={{ color: "oklch(0.68 0.12 65)" }}
            >
              {isHindi
                ? "चयनित फ़िल्टर के लिए कोई तेल नहीं मिला।"
                : "No oils found for the selected filters."}
            </p>
          </div>
        )}
      </section>

      {/* Description Section */}
      <section
        className="px-4 py-14"
        style={{ background: "oklch(0.16 0.06 22)" }}
        data-ocid="moolank_oil.description.section"
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-decorative font-bold mb-6"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {isHindi
              ? "मूलांक तेल — ऊर्जा संतुलन के लिए ज्योतिष उपाय तेल"
              : "Moolank Oils – Astrology Remedy Oils for Energy Balance & Wellness"}
          </h2>
          <div
            className="space-y-4 font-body text-base leading-relaxed"
            style={{ color: "oklch(0.80 0.05 60)" }}
          >
            <p>
              {isHindi
                ? "हमारे प्रीमियम मूलांक तेलों की श्रृंखला की खोज करें, विशेष रूप से तैयार किए गए ज्योतिष उपाय तेल जो ऊर्जा को संतुलित करने, व्यक्तिगत विकास को बढ़ाने और रोजमर्रा की भलाई का समर्थन करने के लिए डिज़ाइन किए गए हैं।"
                : "Discover our premium range of Moolank Oils, specially formulated astrology remedy oils designed to balance energy, enhance personal growth, and support everyday wellness. Each Moolank Oil in this collection is crafted to align your core birth number's energy, helping improve mental clarity, emotional peace, and overall life harmony."}
            </p>
            <p>
              {isHindi
                ? "चाहे आप सुरक्षा, वित्तीय स्थिरता, भावनात्मक संतुलन या आध्यात्मिक विकास के लिए तेल खोज रहे हों, ये प्राकृतिक ज्योतिष उपाय तेल अनुभवी साधकों के लिए आदर्श हैं। हमारे मूलांक तेल दैनिक अभिषेक, ध्यान, अनुष्ठान उपयोग और घर की ऊर्जा सफाई के लिए उपयुक्त हैं।"
                : "Whether you are seeking oils for protection, financial stability, emotional balance, or spiritual growth, these natural astrology remedy oils are ideal for experienced practitioners. Our Moolank Oils are suitable for daily anointing, meditation, ritual use, and home energy cleansing, making them easy to incorporate into your routine."}
            </p>
            <p>
              {isHindi
                ? "प्रत्येक तेल उनके ऊर्जावान और संतुलन गुणों के लिए जाने जाने वाले सावधानी से चुने गए प्राकृतिक अवयवों का उपयोग करके बनाया जाता है। पुरुषों और महिलाओं दोनों के लिए डिज़ाइन किए गए, मूलांक तेल उपयोग में सरल और अत्यधिक प्रभावी हैं।"
                : "Each oil is made using carefully selected natural ingredients known for their energetic and balancing properties. These astrology oils help soothe tension, attract positive vibrations, and support confidence, focus, and inner peace. Designed for men and women, Moolank Oils are simple to use and highly effective as part of a self-care, wellness, or spiritual practice."}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section
        className="max-w-3xl mx-auto px-4 py-14"
        data-ocid="moolank_oil.faq.section"
      >
        <h2
          className="text-2xl font-decorative font-bold mb-8 text-center"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          {isHindi ? "अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions"}
        </h2>
        <div className="space-y-3">
          {faqData.map((faq, idx) => (
            <div
              key={faq.question}
              className="rounded-xl overflow-hidden border"
              style={{
                border: "1px solid oklch(0.78 0.14 75 / 0.18)",
                background: "oklch(0.16 0.06 22)",
              }}
              data-ocid={`moolank_oil.faq.item.${idx + 1}`}
            >
              <button
                type="button"
                className="w-full flex items-center justify-between px-5 py-4 text-left font-heading font-semibold text-sm transition-colors hover:bg-white/5"
                style={{ color: "oklch(0.88 0.06 75)" }}
                onClick={() =>
                  setOpenFaqIndex(openFaqIndex === idx ? null : idx)
                }
                data-ocid={`moolank_oil.faq.toggle.${idx + 1}`}
              >
                <span>{isHindi ? faq.questionHindi : faq.question}</span>
                <ChevronDown
                  className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${
                    openFaqIndex === idx ? "rotate-180" : ""
                  }`}
                  style={{ color: "oklch(0.78 0.14 75)" }}
                />
              </button>
              {openFaqIndex === idx && (
                <div
                  className="px-5 pb-4 text-sm font-body leading-relaxed"
                  style={{ color: "oklch(0.75 0.05 60)" }}
                >
                  {isHindi ? faq.answerHindi : faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Oil Product Card ───────────────────────────────────────────────────────
interface OilCardProps {
  oil: MoolankOil;
  isHindi: boolean;
  index: number;
  onAddToCart: (oil: MoolankOil) => void;
}

function OilCard({ oil, isHindi, index, onAddToCart }: OilCardProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      style={{
        background: "oklch(0.16 0.06 22)",
        border: "1px solid oklch(0.78 0.14 75 / 0.18)",
        boxShadow: "0 4px 24px oklch(0.78 0.14 75 / 0.06)",
      }}
      data-ocid={`moolank_oil.item.${index}`}
    >
      {/* Image / Emoji area */}
      <div
        className="relative h-52 flex items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.10 30) 0%, oklch(0.28 0.12 45) 50%, oklch(0.25 0.09 35) 100%)",
        }}
      >
        {/* Discount badge */}
        <span
          className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-bold"
          style={{
            background: "oklch(0.55 0.22 27)",
            color: "white",
          }}
        >
          -{oil.discountPercent}%
        </span>

        {/* Favourite & Share buttons */}
        <div className="absolute top-3 right-3 flex gap-1.5">
          <FavouriteButton
            item={{
              id: oil.id,
              type: "product",
              title: isHindi ? oil.nameHindi : oil.name,
              subtitle: isHindi ? oil.planetHindi : oil.planet,
              path: "/moolank-oil",
              icon: oil.imageEmoji,
            }}
          />
        </div>

        {/* Large emoji */}
        <span className="text-7xl select-none drop-shadow-lg">
          {oil.imageEmoji}
        </span>

        {/* Moolank number badge */}
        <div
          className="absolute bottom-3 left-3 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
          style={{
            background: "oklch(0.78 0.14 75)",
            color: "oklch(0.14 0.05 20)",
          }}
        >
          {oil.moolankNumber}
        </div>
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Planet badge */}
        <Badge
          className="w-fit text-[10px] px-2 py-0.5"
          style={{
            background: "oklch(0.78 0.14 75 / 0.15)",
            border: "1px solid oklch(0.78 0.14 75 / 0.3)",
            color: "oklch(0.78 0.14 75)",
          }}
        >
          🪐 {isHindi ? oil.planetHindi : oil.planet}
        </Badge>

        {/* Name */}
        <h3
          className="font-heading font-bold text-base leading-tight"
          style={{ color: "oklch(0.92 0.04 75)" }}
        >
          {isHindi ? oil.nameHindi : oil.name}
        </h3>

        {/* Tagline */}
        <p
          className="text-xs font-body"
          style={{ color: "oklch(0.68 0.10 65)" }}
        >
          {isHindi ? oil.nameHindi : oil.name} {isHindi ? "के लिए" : "for"}{" "}
          {isHindi ? oil.energyTaglineHindi : oil.energyTagline}{" "}
          {isHindi ? "— Spiritual Connect" : "by Spiritual Connect"}
        </p>

        {/* Rashi tags */}
        <div className="flex flex-wrap gap-1">
          {oil.rashi.map((r) => (
            <span
              key={r}
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={{
                background: "oklch(0.22 0.08 28 / 0.6)",
                border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                color: "oklch(0.78 0.14 75 / 0.7)",
              }}
            >
              {r}
            </span>
          ))}
        </div>

        {/* Price row */}
        <div className="flex items-baseline gap-2 mt-auto">
          <span
            className="text-lg font-bold font-heading"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            ₹{oil.price}
          </span>
          <span
            className="text-sm font-body line-through"
            style={{ color: "oklch(0.55 0.05 50)" }}
          >
            ₹{oil.originalPrice}
          </span>
          <span
            className="text-xs font-semibold"
            style={{ color: "oklch(0.68 0.20 140)" }}
          >
            {oil.discountPercent}% {isHindi ? "छूट" : "off"}
          </span>
        </div>

        {/* EMI */}
        <p
          className="text-xs font-body"
          style={{ color: "oklch(0.68 0.10 65)" }}
        >
          {isHindi ? "या" : "or"}{" "}
          <span
            className="font-semibold"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            ₹{oil.emiAmount}/{isHindi ? "माह" : "Month"}
          </span>{" "}
          <button
            type="button"
            className="underline transition-colors hover:opacity-80"
            style={{ color: "oklch(0.78 0.14 75)" }}
            data-ocid={`moolank_oil.emi_link.${index}`}
          >
            {isHindi ? "EMI पर खरीदें ›" : "Buy on EMI ›"}
          </button>
        </p>

        {/* Reviews */}
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className="h-3.5 w-3.5"
              style={{
                color: "oklch(0.78 0.14 75)",
                fill: s <= 4 ? "oklch(0.78 0.14 75)" : "transparent",
              }}
            />
          ))}
          <span
            className="text-xs font-body"
            style={{ color: "oklch(0.68 0.10 65)" }}
          >
            ({oil.reviewCount} {isHindi ? "समीक्षाएं" : "Reviews"})
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-1 flex-wrap">
          <button
            type="button"
            onClick={() => onAddToCart(oil)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-heading font-semibold transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
            }}
            data-ocid={`moolank_oil.add_to_cart.${index}`}
          >
            <ShoppingCart className="h-4 w-4" />
            {isHindi ? "कार्ट में जोड़ें" : "Add to Cart"}
          </button>

          <WhatsAppShare
            title={`${isHindi ? oil.nameHindi : oil.name} — ₹${oil.price} — ${isHindi ? oil.energyTaglineHindi : oil.energyTagline}`}
            url={`${window.location.origin}/moolank-oil`}
            className="flex-shrink-0"
          />
        </div>
      </div>
    </div>
  );
}
