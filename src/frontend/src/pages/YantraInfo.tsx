import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const YANTRA_CATEGORIES = [
  {
    key: "puja-yantra",
    emoji: "🔯",
    title: "पूजा यंत्र",
    titleEn: "Puja Yantra",
    desc: "छोटे तांबे/सोने के यंत्र जो दैनिक पूजा के लिए उपयुक्त हैं। ये 2x2 इंच के पूर्ण प्राण-प्रतिष्ठित यंत्र हैं।",
    descEn:
      "Small copper/gold plated yantras ideal for daily worship. These are 2×2 inch fully energized Prana-Pratishthit yantras.",
    color: "oklch(0.68 0.20 48)",
    count: "55+",
    benefits: [
      "Daily puja & worship",
      "Home & office protection",
      "Planetary remedies",
    ],
  },
  {
    key: "hanging-yantra",
    emoji: "🪬",
    title: "हैंगिंग यंत्र",
    titleEn: "Hanging Yantra",
    desc: "पीतल के हैंगिंग यंत्र जो दरवाजे, दीवार या पूजा कक्ष में लटकाए जाते हैं। आकार 5.5X4 इंच।",
    descEn:
      "Brass hanging yantras to be suspended at entrance, wall or puja room. Size 5.5×4 inch.",
    color: "oklch(0.55 0.18 140)",
    count: "10+",
    benefits: [
      "Home entrance protection",
      "Vastu correction",
      "Positive energy flow",
    ],
  },
  {
    key: "chowki-yantra",
    emoji: "🏺",
    title: "चौकी यंत्र",
    titleEn: "Chowki Yantra",
    desc: "अष्टधातु/पीतल के चौकी यंत्र जो पूजा वेदी पर स्थापित किए जाते हैं। आकार 3.5X5 इंच।",
    descEn:
      "Ashtadhatu/Brass chowki yantras installed on the puja altar. Sizes 3.5×5 inch.",
    color: "oklch(0.55 0.18 260)",
    count: "7+",
    benefits: [
      "Altar installation",
      "Powerful energized piece",
      "Long-lasting protection",
    ],
  },
  {
    key: "frame-yantra",
    emoji: "🖼️",
    title: "फ्रेम यंत्र",
    titleEn: "Frame Yantra",
    desc: "लकड़ी के फ्रेम में यंत्र जो दीवार पर लगाए जाते हैं। आकार 4X4 से 7X7 इंच।",
    descEn:
      "Yantras in wooden frames to be mounted on the wall. Sizes 4×4 to 7×7 inch.",
    color: "oklch(0.60 0.16 35)",
    count: "6+",
    benefits: ["Wall mounting", "Decorative & powerful", "Easy to install"],
  },
];

export default function YantraInfo() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.12 0.05 22)" }}>
      {/* ── Hero ── */}
      <section
        className="py-14 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.08 22) 0%, oklch(0.20 0.10 28) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.15)",
        }}
      >
        <div className="container mx-auto max-w-3xl">
          <div className="text-7xl mb-4">🔯</div>
          <h1
            className="font-heading text-3xl md:text-4xl font-bold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            यंत्र जानकारी
          </h1>
          <p
            className="font-heading text-lg md:text-xl mb-4"
            style={{ color: "oklch(0.88 0.06 75)" }}
          >
            Yantra — Sacred Geometrical Divine Tools
          </p>
          <p
            className="font-body text-sm leading-relaxed max-w-2xl mx-auto"
            style={{ color: "oklch(0.65 0.04 60)" }}
          >
            यंत्र एक दिव्य ज्यामितीय संरचना है जो किसी देवता या ग्रह की शक्ति का प्रतीक है।
            ये विशेष शुभ मुहूर्तों जैसे गुरु पुष्य योग, नवरात्रि, दीपावली, होली आदि में
            <strong style={{ color: "oklch(0.78 0.14 75)" }}>
              {" "}
              पूर्ण प्राण-प्रतिष्ठित सिद्ध
            </strong>{" "}
            किए जाते हैं।
          </p>
          <p
            className="font-body text-xs mt-2 leading-relaxed max-w-2xl mx-auto"
            style={{ color: "oklch(0.55 0.04 55)" }}
          >
            A Yantra is a sacred geometrical tool representing the energy of a
            deity or planet. They are fully energized (Prana-Pratishthit) during
            auspicious Vedic timings like Guru Pushya Yoga, Navratri, Diwali,
            and eclipses.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link to="/yantra-shop" data-ocid="yantra-info.shop_link">
              <Button
                className="gap-2 font-heading font-semibold"
                style={{ background: "oklch(0.68 0.20 48)", color: "white" }}
              >
                <span>🛒</span> यंत्र शॉप देखें / Shop Yantras
              </Button>
            </Link>
            <Link to="/shop" data-ocid="yantra-info.all_shop_link">
              <Button
                variant="outline"
                className="gap-2 font-heading"
                style={{
                  borderColor: "oklch(0.78 0.14 75 / 0.30)",
                  color: "oklch(0.78 0.14 75)",
                  background: "transparent",
                }}
              >
                All Spiritual Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Category Cards ── */}
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2
            className="font-heading text-xl font-bold text-center mb-8"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            यंत्र के प्रकार / Types of Yantras
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {YANTRA_CATEGORIES.map((cat) => (
              <div
                key={cat.key}
                className="rounded-2xl border p-6 flex flex-col gap-4 transition-all duration-200 hover:shadow-lg"
                style={{
                  background: "oklch(0.16 0.06 22)",
                  borderColor: "oklch(0.78 0.14 75 / 0.18)",
                }}
                data-ocid={`yantra-info.card.${cat.key}`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0"
                    style={{ background: `${cat.color}18` }}
                  >
                    {cat.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3
                        className="font-heading text-base font-bold"
                        style={{ color: "oklch(0.88 0.06 75)" }}
                      >
                        {cat.title}
                      </h3>
                      <span
                        className="text-xs font-body px-2 py-0.5 rounded-full"
                        style={{
                          background: `${cat.color}18`,
                          color: cat.color,
                        }}
                      >
                        {cat.count} products
                      </span>
                    </div>
                    <p
                      className="text-xs font-body mt-0.5"
                      style={{ color: `${cat.color}cc` }}
                    >
                      {cat.titleEn}
                    </p>
                  </div>
                </div>

                <p
                  className="text-sm font-body leading-relaxed"
                  style={{ color: "oklch(0.70 0.04 60)" }}
                >
                  {cat.desc}
                </p>
                <p
                  className="text-xs font-body"
                  style={{ color: "oklch(0.55 0.04 55)" }}
                >
                  {cat.descEn}
                </p>

                <ul className="space-y-1">
                  {cat.benefits.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-2 text-xs font-body"
                      style={{ color: "oklch(0.65 0.04 60)" }}
                    >
                      <span style={{ color: cat.color }}>✓</span> {b}
                    </li>
                  ))}
                </ul>

                <div className="flex gap-2 mt-auto pt-2">
                  <Link
                    to="/yantra-info/$category"
                    params={{ category: cat.key }}
                    className="flex-1"
                    data-ocid={`yantra-info.learn.${cat.key}`}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-1 text-xs font-heading"
                      style={{
                        borderColor: `${cat.color}40`,
                        color: cat.color,
                        background: "transparent",
                      }}
                    >
                      और जानें / Learn More <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                  <Link
                    to="/yantra-shop"
                    data-ocid={`yantra-info.shop.${cat.key}`}
                  >
                    <Button
                      size="sm"
                      className="gap-1 text-xs font-heading"
                      style={{ background: cat.color, color: "white" }}
                    >
                      Shop
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits Grid ── */}
      <section
        className="py-10 px-4"
        style={{
          background: "oklch(0.16 0.06 22 / 0.50)",
          borderTop: "1px solid oklch(0.78 0.14 75 / 0.10)",
        }}
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h2
            className="font-heading text-xl font-bold mb-6"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            यंत्र के लाभ / Benefits of Yantras
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: "🛡️",
                label: "ग्रह दोष निवारण",
                sub: "Graha Dosha Removal",
              },
              { icon: "💰", label: "धन-समृद्धि", sub: "Wealth & Prosperity" },
              { icon: "🏥", label: "स्वास्थ्य लाभ", sub: "Health & Healing" },
              { icon: "🧘", label: "मानसिक शांति", sub: "Mental Peace" },
              { icon: "🏠", label: "वास्तु दोष", sub: "Vastu Correction" },
              { icon: "⚔️", label: "शत्रु बाधा निवारण", sub: "Enemy Protection" },
              { icon: "🎓", label: "शिक्षा सफलता", sub: "Academic Success" },
              { icon: "💑", label: "दांपत्य सुख", sub: "Marital Harmony" },
            ].map((b) => (
              <div
                key={b.label}
                className="rounded-xl p-4 flex flex-col items-center gap-2 text-center"
                style={{
                  background: "oklch(0.14 0.05 22)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.12)",
                }}
              >
                <div className="text-2xl">{b.icon}</div>
                <p
                  className="font-heading text-xs font-semibold"
                  style={{ color: "oklch(0.88 0.06 75)" }}
                >
                  {b.label}
                </p>
                <p
                  className="text-[10px] font-body"
                  style={{ color: "oklch(0.55 0.04 55)" }}
                >
                  {b.sub}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link to="/yantra-shop" data-ocid="yantra-info.bottom_shop_link">
              <Button
                className="gap-2 font-heading font-bold px-8"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                  color: "white",
                }}
              >
                🔯 सभी यंत्र देखें / Browse All Yantras
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
