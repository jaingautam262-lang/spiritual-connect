import { Button } from "@/components/ui/button";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, ShoppingBag } from "lucide-react";

type CategoryKey =
  | "puja-yantra"
  | "hanging-yantra"
  | "chowki-yantra"
  | "frame-yantra";

interface CategoryDetail {
  key: CategoryKey;
  emoji: string;
  title: string;
  titleEn: string;
  color: string;
  what: { hi: string; en: string };
  howEnergized: { hi: string; en: string };
  benefits: { hi: string[]; en: string[] };
  howToUse: { hi: string[]; en: string[] };
  mantra?: string;
  mantraName?: string;
}

const CATEGORY_DETAILS: Record<CategoryKey, CategoryDetail> = {
  "puja-yantra": {
    key: "puja-yantra",
    emoji: "🔯",
    title: "पूजा यंत्र",
    titleEn: "Puja Yantra (2×2 Copper/Gold)",
    color: "oklch(0.68 0.20 48)",
    what: {
      hi: "पूजा यंत्र छोटे, हल्के और दैनिक उपयोग के लिए उपयुक्त हैं। ये 2x2 इंच के शुद्ध तांबे या सोने की परत वाले यंत्र हैं जो किसी देवता या ग्रह की शक्ति को अपने भीतर धारण करते हैं। ये किसी भी पूजा स्थान, तिजोरी या व्यापार स्थल पर आसानी से रखे जा सकते हैं।",
      en: "Puja Yantras are small, lightweight yantras in 2×2 inch pure copper or gold-plated form, ideal for daily worship. They embody the energy of a specific deity or planet and can be placed easily in any puja space, safe, or workplace.",
    },
    howEnergized: {
      hi: "ये यंत्र विशेष शुभ मुहूर्तों में सिद्ध किए जाते हैं — गुरु पुष्य योग, सिद्ध योग, रवि योग, सूर्य ग्रहण, चंद्र ग्रहण, होली, दीपावली, नवरात्रि। प्राण-प्रतिष्ठा विधि से इनमें देवशक्ति का आवाहन किया जाता है।",
      en: "These yantras are energized (Prana-Pratishthit) during auspicious Vedic timings: Guru Pushya Yoga, Siddha Yoga, Ravi Yoga, solar/lunar eclipses, Holi, Diwali, and Navratri. Deity energy is invoked through Vedic rituals.",
    },
    benefits: {
      hi: [
        "ग्रह दोष निवारण — सभी ग्रहों के अशुभ प्रभाव से मुक्ति",
        "तंत्र दोष निवारण — काले जादू और बुरी नजर से सुरक्षा",
        "पितृ दोष शांति — पूर्वजों की आत्मा की शांति",
        "वास्तु दोष निवारण — घर और कार्यस्थल की नकारात्मकता दूर करना",
        "मानसिक शांति, स्वास्थ्य, धन और यश की प्राप्ति",
      ],
      en: [
        "Graha Dosha removal — relief from ill effects of all 9 planets",
        "Tantra Dosha removal — protection from black magic and evil eye",
        "Pitra Dosha remedy — peace for ancestral souls",
        "Vastu Dosha correction — removes negativity from home/office",
        "Mental peace, health, wealth and fame",
      ],
    },
    howToUse: {
      hi: [
        "लाल या पीले कपड़े पर यंत्र स्थापित करें",
        "स्थापना से पहले गंगाजल या शुद्ध जल से शुद्ध करें",
        "संबंधित देवता या ग्रह के मंत्र का 108 बार जाप करें",
        "प्रतिदिन धूप, दीपक और फूल चढ़ाएं",
        "शुभ मुहूर्त जैसे सूर्योदय या ब्रह्म मुहूर्त में पूजा करें",
      ],
      en: [
        "Install yantra on a red or yellow cloth",
        "Purify with Gangajal or clean water before installation",
        "Chant the related deity/planet mantra 108 times",
        "Offer incense, lamp and flowers daily",
        "Worship at auspicious times like sunrise or Brahma Muhurta",
      ],
    },
    mantra: "ॐ ह्रीं श्रीं क्लीं सर्वसिद्धि प्रदाय नमः",
    mantraName: "Sarva Siddhi Mantra",
  },
  "hanging-yantra": {
    key: "hanging-yantra",
    emoji: "🪬",
    title: "हैंगिंग यंत्र",
    titleEn: "Hanging Yantra (Brass 5.5×4)",
    color: "oklch(0.55 0.18 140)",
    what: {
      hi: "हैंगिंग यंत्र पीतल के बने 5.5x4 इंच के यंत्र हैं जो दरवाजे, दीवार या पूजा कक्ष में लटकाए जाते हैं। इनमें देवशक्ति का आवाहन करके घर को नकारात्मक ऊर्जा से बचाया जाता है। ये वास्तु दोष निवारण में भी अत्यंत प्रभावी हैं।",
      en: "Hanging Yantras are brass-made 5.5×4 inch yantras designed to be suspended at doorways, walls, or the puja room. They protect the home from negative energies and are highly effective for Vastu dosha correction.",
    },
    howEnergized: {
      hi: "हैंगिंग यंत्र भी पूर्ण प्राण-प्रतिष्ठित होते हैं। इन्हें नवरात्रि, दीपावली, होली, और ग्रहण जैसे विशेष अवसरों पर सिद्ध किया जाता है।",
      en: "Hanging Yantras are also fully Prana-Pratishthit. They are energized during Navratri, Diwali, Holi, and eclipses for maximum potency.",
    },
    benefits: {
      hi: [
        "मुख्य द्वार पर लगाने से नकारात्मक ऊर्जा प्रवेश नहीं कर पाती",
        "वास्तु दोष का प्रभावी निवारण",
        "घर में सकारात्मक ऊर्जा का प्रवाह बढ़ता है",
        "शत्रु और बुरी नजर से सुरक्षा",
        "पूरे परिवार पर देवशक्ति का आशीर्वाद",
      ],
      en: [
        "Blocks negative energy from entering the main door",
        "Effective Vastu dosha correction",
        "Increases positive energy flow throughout home",
        "Protection from enemies and evil eye",
        "Deity blessings upon the entire family",
      ],
    },
    howToUse: {
      hi: [
        "मुख्य द्वार के ऊपर या पूजा कक्ष की दीवार पर लटकाएं",
        "उत्तर या पूर्व दिशा में लगाना अधिक शुभ होता है",
        "स्थापना से पहले शुद्ध जल से साफ करें",
        "प्रति सप्ताह संबंधित देवता के दिन धूप और फूल चढ़ाएं",
        "यंत्र को क्षतिग्रस्त या धूल भरा न रहने दें",
      ],
      en: [
        "Hang above the main entrance or on the puja room wall",
        "North or East direction is most auspicious",
        "Clean with pure water before installation",
        "Offer incense and flowers weekly on deity's day",
        "Ensure yantra stays clean and undamaged",
      ],
    },
    mantra: "ॐ नमः शिवाय ॐ ह्रीं नमः",
    mantraName: "Griha Raksha Mantra",
  },
  "chowki-yantra": {
    key: "chowki-yantra",
    emoji: "🏺",
    title: "चौकी यंत्र",
    titleEn: "Chowki Yantra (Ashtadhatu/Brass)",
    color: "oklch(0.55 0.18 260)",
    what: {
      hi: "चौकी यंत्र अष्टधातु या पीतल से बने 3.5x5 इंच के भारी यंत्र हैं जो पूजा वेदी या तिजोरी पर स्थापित किए जाते हैं। अष्टधातु (आठ धातुओं का मिश्रण) में बने यंत्र अत्यंत शक्तिशाली माने जाते हैं।",
      en: "Chowki Yantras are heavy Ashtadhatu or Brass yantras in 3.5×5 inch size, installed on the puja altar or in the safe. Ashtadhatu (alloy of 8 metals) yantras are considered especially powerful.",
    },
    howEnergized: {
      hi: "चौकी यंत्र विशेष पंचोपचार या षोडशोपचार विधि से सिद्ध किए जाते हैं। इनमें देवता का आवाहन, प्राण-प्रतिष्ठा, और मंत्र जाप की पूर्ण विधि होती है।",
      en: "Chowki Yantras are energized through Panchopachar or Shodashopchar ritual methods. Complete procedures including deity invocation, Prana-Pratishtha, and mantra chanting are followed.",
    },
    benefits: {
      hi: [
        "धन और संपदा में वृद्धि",
        "व्यापार और करियर में उन्नति",
        "सभी ग्रह दोषों का एक साथ निवारण",
        "परिवार में सुख, शांति और समृद्धि",
        "स्थायी सुरक्षा और आशीर्वाद",
      ],
      en: [
        "Increase in wealth and assets",
        "Business and career advancement",
        "Simultaneous remedy for all planetary doshas",
        "Happiness, peace and prosperity in family",
        "Permanent protection and blessings",
      ],
    },
    howToUse: {
      hi: [
        "पूजा वेदी के केंद्र में स्थापित करें",
        "प्रतिदिन सुबह और संध्या पूजा करें",
        "यंत्र को कपड़े से ढककर न रखें — उजागर रखें",
        "तिजोरी में रखने पर प्रत्येक गुरुवार को पूजा करें",
        "महत्वपूर्ण पर्वों पर विशेष पूजा और मंत्र जाप करें",
      ],
      en: [
        "Install at the center of the puja altar",
        "Perform daily morning and evening puja",
        "Do not cover the yantra with cloth — keep exposed",
        "If in safe, perform puja every Thursday",
        "Perform special puja on important festivals",
      ],
    },
    mantra:
      "ॐ श्रीं ह्रीं क्लीं त्रिभुवन महालक्ष्म्यै अस्माकं दारिद्र्य नाशय प्रचुर धन देहि दापय स्वाहा",
    mantraName: "Mahalakshmi Dhana Mantra",
  },
  "frame-yantra": {
    key: "frame-yantra",
    emoji: "🖼️",
    title: "फ्रेम यंत्र",
    titleEn: "Frame Yantra (Wooden Frame)",
    color: "oklch(0.60 0.16 35)",
    what: {
      hi: "फ्रेम यंत्र लकड़ी के सुंदर फ्रेम में जड़े यंत्र हैं जिन्हें दीवार पर लगाया जाता है। ये सजावटी भी होते हैं और आध्यात्मिक भी। 4x4 से 7x7 इंच तक के आकार में उपलब्ध हैं।",
      en: "Frame Yantras are yantras mounted in beautiful wooden frames for wall hanging. They are both decorative and spiritually powerful. Available in sizes from 4×4 to 7×7 inches.",
    },
    howEnergized: {
      hi: "फ्रेम यंत्र भी उसी विधि से सिद्ध किए जाते हैं जैसे अन्य यंत्र। फ्रेम में जड़े जाने से पहले यंत्र को मंत्रोच्चारण से अभिमंत्रित किया जाता है।",
      en: "Frame Yantras are energized through the same method as other yantras. Before framing, the yantra is charged through mantra recitation and Vedic rituals.",
    },
    benefits: {
      hi: [
        "घर को सजाने के साथ-साथ आध्यात्मिक ऊर्जा भी",
        "दीवार पर लगाने से पूरे कमरे में सकारात्मकता फैलती है",
        "सार्वजनिक प्रदर्शन के लिए उपयुक्त",
        "कार्यालय और दुकान की सजावट में उपयोग",
        "लंबे समय तक टिकाऊ",
      ],
      en: [
        "Combines home decoration with spiritual energy",
        "Spreads positive energy throughout the room",
        "Suitable for public display",
        "Ideal for office and shop decoration",
        "Durable for long-term use",
      ],
    },
    howToUse: {
      hi: [
        "उत्तर या पूर्व दिशा की दीवार पर लगाएं",
        "यंत्र की आंखों के स्तर पर या ऊपर लगाएं",
        "नियमित रूप से साफ करें और धूप से शुद्ध करें",
        "प्रतिदिन प्रणाम करते समय मंत्र जाप करें",
        "दीपक या अगरबत्ती जलाकर पूजा करें",
      ],
      en: [
        "Mount on the North or East wall",
        "Install at eye level or above",
        "Clean regularly and purify with incense smoke",
        "Chant mantra while bowing to it daily",
        "Worship with lamp or incense stick",
      ],
    },
    mantra: "ॐ कुबेराय नमः ॐ श्रियै नमः",
    mantraName: "Griha Samriddhi Mantra",
  },
};

export default function YantraInfoDetail() {
  const { category } = useParams({ from: "/yantra-info/$category" });
  const detail = CATEGORY_DETAILS[category as CategoryKey];

  if (!detail) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={{ background: "oklch(0.12 0.05 22)" }}
      >
        <div className="text-5xl mb-4">❓</div>
        <p
          className="font-heading text-lg"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          Category not found
        </p>
        <Link
          to="/yantra-info"
          className="mt-4"
          data-ocid="yantra-detail.back_link"
        >
          <Button style={{ background: "oklch(0.68 0.20 48)", color: "white" }}>
            ← Back to Yantra Info
          </Button>
        </Link>
      </div>
    );
  }

  const { color } = detail;

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.12 0.05 22)" }}>
      {/* ── Header ── */}
      <section
        className="py-10 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.08 22) 0%, oklch(0.20 0.09 28) 100%)",
          borderBottom: `1px solid ${color}30`,
        }}
      >
        <div className="container mx-auto max-w-4xl">
          <Link
            to="/yantra-info"
            className="inline-flex items-center gap-1.5 text-xs font-body mb-5 hover:opacity-80 transition-opacity"
            style={{ color: "oklch(0.65 0.04 60)" }}
            data-ocid="yantra-detail.back_link"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> यंत्र जानकारी / Yantra Info
          </Link>
          <div className="flex items-start gap-5">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shrink-0"
              style={{
                background: `${color}18`,
                border: `1px solid ${color}30`,
              }}
            >
              {detail.emoji}
            </div>
            <div>
              <h1
                className="font-heading text-2xl md:text-3xl font-bold"
                style={{ color: "oklch(0.88 0.06 75)" }}
              >
                {detail.title}
              </h1>
              <p className="font-body text-sm mt-1" style={{ color }}>
                {detail.titleEn}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-4xl px-4 py-8 space-y-8">
        {/* ── What is it? ── */}
        <InfoSection
          title="क्या होता है? / What is it?"
          color={color}
          data-ocid="yantra-detail.what_section"
        >
          <div className="space-y-2">
            <p
              className="font-body text-sm leading-relaxed"
              style={{ color: "oklch(0.75 0.04 65)" }}
            >
              {detail.what.hi}
            </p>
            <p
              className="font-body text-xs leading-relaxed"
              style={{ color: "oklch(0.55 0.04 55)" }}
            >
              {detail.what.en}
            </p>
          </div>
        </InfoSection>

        {/* ── How Energized ── */}
        <InfoSection title="सिद्धि / Energization Process" color={color}>
          <div className="space-y-2">
            <p
              className="font-body text-sm leading-relaxed"
              style={{ color: "oklch(0.75 0.04 65)" }}
            >
              {detail.howEnergized.hi}
            </p>
            <p
              className="font-body text-xs leading-relaxed"
              style={{ color: "oklch(0.55 0.04 55)" }}
            >
              {detail.howEnergized.en}
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-3">
              {[
                "गुरु पुष्य योग",
                "सिद्ध योग",
                "रवि योग",
                "ग्रहण",
                "होली",
                "दीपावली",
              ].map((m) => (
                <div
                  key={m}
                  className="rounded-lg px-2 py-1.5 text-center text-[10px] font-body"
                  style={{
                    background: `${color}15`,
                    color,
                    border: `1px solid ${color}25`,
                  }}
                >
                  {m}
                </div>
              ))}
            </div>
          </div>
        </InfoSection>

        {/* ── Benefits ── */}
        <InfoSection title="लाभ / Benefits" color={color}>
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-2">
            {detail.benefits.hi.map((b, i) => (
              <div key={b} className="flex items-start gap-2">
                <span style={{ color }} className="mt-0.5 text-sm shrink-0">
                  ✦
                </span>
                <div>
                  <p
                    className="font-body text-sm"
                    style={{ color: "oklch(0.78 0.04 65)" }}
                  >
                    {b}
                  </p>
                  <p
                    className="font-body text-xs"
                    style={{ color: "oklch(0.52 0.04 55)" }}
                  >
                    {detail.benefits.en[i]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </InfoSection>

        {/* ── How to Use ── */}
        <InfoSection title="स्थापना विधि / Installation Guide" color={color}>
          <ol className="space-y-3">
            {detail.howToUse.hi.map((step, i) => (
              <li key={step.slice(0, 20)} className="flex items-start gap-3">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                  style={{ background: `${color}20`, color }}
                >
                  {i + 1}
                </span>
                <div>
                  <p
                    className="font-body text-sm"
                    style={{ color: "oklch(0.78 0.04 65)" }}
                  >
                    {step}
                  </p>
                  <p
                    className="font-body text-xs"
                    style={{ color: "oklch(0.52 0.04 55)" }}
                  >
                    {detail.howToUse.en[i]}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </InfoSection>

        {/* ── Mantra ── */}
        {detail.mantra && (
          <InfoSection
            title={`मंत्र / Mantra — ${detail.mantraName ?? ""}`}
            color={color}
          >
            <div
              className="rounded-xl p-5 text-center"
              style={{
                background: `${color}10`,
                border: `1px solid ${color}25`,
              }}
            >
              <p
                className="font-heading text-base leading-relaxed"
                style={{ color, fontWeight: 600 }}
              >
                {detail.mantra}
              </p>
              <p
                className="text-xs font-body mt-2"
                style={{ color: "oklch(0.55 0.04 55)" }}
              >
                Chant 108 times daily for best results
              </p>
            </div>
          </InfoSection>
        )}

        {/* ── CTA ── */}
        <div
          className="rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 justify-between"
          style={{ background: `${color}12`, border: `1px solid ${color}25` }}
          data-ocid="yantra-detail.cta_section"
        >
          <div>
            <p
              className="font-heading font-bold text-base"
              style={{ color: "oklch(0.88 0.06 75)" }}
            >
              {detail.title} खरीदें / Shop {detail.titleEn.split("(")[0].trim()}
            </p>
            <p
              className="font-body text-xs mt-0.5"
              style={{ color: "oklch(0.60 0.04 60)" }}
            >
              Fully energized. Fast delivery. Genuine quality.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Link to="/yantra-shop" data-ocid="yantra-detail.shop_now_button">
              <Button
                className="gap-1.5 font-heading font-semibold"
                style={{ background: color, color: "white" }}
              >
                <ShoppingBag className="h-4 w-4" />
                Shop Now
              </Button>
            </Link>
            <Link
              to="/yantra-info"
              data-ocid="yantra-detail.all_categories_button"
            >
              <Button
                variant="outline"
                className="font-heading"
                style={{
                  borderColor: `${color}40`,
                  color,
                  background: "transparent",
                }}
              >
                All Categories
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function InfoSection({
  title,
  color,
  children,
  "data-ocid": dataOcid,
}: {
  title: string;
  color: string;
  children: React.ReactNode;
  "data-ocid"?: string;
}) {
  return (
    <div
      className="rounded-2xl border p-5"
      style={{
        background: "oklch(0.15 0.06 22)",
        borderColor: "oklch(0.78 0.14 75 / 0.15)",
      }}
      data-ocid={dataOcid}
    >
      <h2
        className="font-heading text-sm font-bold uppercase tracking-wider mb-4 pb-3 border-b"
        style={{ color, borderColor: `${color}25` }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
