import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

// ── Lookup tables ────────────────────────────────────────────────────────────

const VARS = [
  "Ravivar",
  "Somvar",
  "Mangalvar",
  "Budhvar",
  "Brihaspativar",
  "Shukravar",
  "Shanivar",
];

const VARS_HI = [
  "रविवार",
  "सोमवार",
  "मंगलवार",
  "बुधवार",
  "बृहस्पतिवार",
  "शुक्रवार",
  "शनिवार",
];

const TITHIS = [
  "Pratipada",
  "Dwitiya",
  "Tritiya",
  "Chaturthi",
  "Panchami",
  "Shashthi",
  "Saptami",
  "Ashtami",
  "Navami",
  "Dashami",
  "Ekadashi",
  "Dwadashi",
  "Trayodashi",
  "Chaturdashi",
  "Purnima",
  "Pratipada",
  "Dwitiya",
  "Tritiya",
  "Chaturthi",
  "Panchami",
  "Shashthi",
  "Saptami",
  "Ashtami",
  "Navami",
  "Dashami",
  "Ekadashi",
  "Dwadashi",
  "Trayodashi",
  "Chaturdashi",
  "Amavasya",
];

const TITHIS_HI = [
  "प्रतिपदा",
  "द्वितीया",
  "तृतीया",
  "चतुर्थी",
  "पंचमी",
  "षष्ठी",
  "सप्तमी",
  "अष्टमी",
  "नवमी",
  "दशमी",
  "एकादशी",
  "द्वादशी",
  "त्रयोदशी",
  "चतुर्दशी",
  "पूर्णिमा",
  "प्रतिपदा",
  "द्वितीया",
  "तृतीया",
  "चतुर्थी",
  "पंचमी",
  "षष्ठी",
  "सप्तमी",
  "अष्टमी",
  "नवमी",
  "दशमी",
  "एकादशी",
  "द्वादशी",
  "त्रयोदशी",
  "चतुर्दशी",
  "अमावस्या",
];

const NAKSHATRAS = [
  "Ashwini",
  "Bharani",
  "Krittika",
  "Rohini",
  "Mrigashira",
  "Ardra",
  "Punarvasu",
  "Pushya",
  "Ashlesha",
  "Magha",
  "Purva Phalguni",
  "Uttara Phalguni",
  "Hasta",
  "Chitra",
  "Swati",
  "Vishakha",
  "Anuradha",
  "Jyeshtha",
  "Mula",
  "Purva Ashadha",
  "Uttara Ashadha",
  "Shravana",
  "Dhanishtha",
  "Shatabhisha",
  "Purva Bhadrapada",
  "Uttara Bhadrapada",
  "Revati",
];

const YOGAS = [
  "Vishkambha",
  "Priti",
  "Ayushman",
  "Saubhagya",
  "Shobhana",
  "Atiganda",
  "Sukarma",
  "Dhriti",
  "Shula",
  "Ganda",
  "Vriddhi",
  "Dhruva",
  "Vyaghata",
  "Harshana",
  "Vajra",
  "Siddhi",
  "Vyatipata",
  "Variyan",
  "Parigha",
  "Shiva",
  "Siddha",
  "Sadhya",
  "Shubha",
  "Shukla",
  "Brahma",
  "Indra",
  "Vaidhriti",
];

// Rahu Kaal by weekday index (Sun=0 … Sat=6)
const RAHU_KAAL: Record<number, string> = {
  0: "17:00 – 18:00",
  1: "07:30 – 09:00",
  2: "15:00 – 16:30",
  3: "12:00 – 13:30",
  4: "13:30 – 15:00",
  5: "10:30 – 12:00",
  6: "09:00 – 10:30",
};

// ── Calculation helpers ──────────────────────────────────────────────────────

function getDayOfYear(d: Date): number {
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d.getTime() - start.getTime()) / 86_400_000);
}

function getPanchangData() {
  const today = new Date();
  const dayOfYear = getDayOfYear(today);
  const weekday = today.getDay(); // 0 = Sun

  const tithi = TITHIS[dayOfYear % 30];
  const tithiHi = TITHIS_HI[dayOfYear % 30];
  const nakshatra = NAKSHATRAS[dayOfYear % 27];
  const yoga = YOGAS[dayOfYear % 27];
  const var_ = VARS[weekday];
  const varHi = VARS_HI[weekday];
  const rahuKaal = RAHU_KAAL[weekday];

  return { tithi, tithiHi, nakshatra, yoga, var: var_, varHi, rahuKaal };
}

// ── Component ────────────────────────────────────────────────────────────────

interface PanchangItem {
  icon: string;
  label: string;
  labelHi: string;
  value: string;
  valueHi?: string;
}

export default function PanchangWidget() {
  const p = getPanchangData();
  const today = new Date();

  const dateStr = today.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const items: PanchangItem[] = [
    {
      icon: "🌙",
      label: "Tithi",
      labelHi: "तिथि",
      value: p.tithi,
      valueHi: p.tithiHi,
    },
    { icon: "☀️", label: "Var", labelHi: "वार", value: p.var, valueHi: p.varHi },
    { icon: "⭐", label: "Nakshatra", labelHi: "नक्षत्र", value: p.nakshatra },
    { icon: "🔱", label: "Yoga", labelHi: "योग", value: p.yoga },
    { icon: "🚫", label: "Rahu Kaal", labelHi: "राहु काल", value: p.rahuKaal },
    { icon: "🌅", label: "Sunrise", labelHi: "सूर्योदय", value: "~06:00 AM*" },
    { icon: "🌇", label: "Sunset", labelHi: "सूर्यास्त", value: "~06:30 PM*" },
    {
      icon: "🪔",
      label: "Abhijit",
      labelHi: "अभिजित",
      value: "11:48 AM – 12:36 PM",
    },
  ];

  return (
    <section
      className="py-10 px-4"
      data-ocid="panchang-widget.section"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.20 0.09 34) 0%, oklch(0.24 0.10 42) 50%, oklch(0.20 0.09 34) 100%)",
      }}
    >
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center mb-2">
            <span
              className="font-decorative text-5xl animate-om-glow"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              ॐ
            </span>
          </div>
          <h2
            className="font-decorative text-2xl font-bold"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Aaj Ka Panchang
          </h2>
          <p
            className="font-body text-sm mt-1"
            style={{ color: "oklch(0.70 0.06 65)", fontFamily: "serif" }}
          >
            आज का पंचांग
          </p>
          <p
            className="font-body text-xs mt-2"
            style={{ color: "oklch(0.60 0.04 55)" }}
          >
            {dateStr}
          </p>
        </div>

        {/* Grid of Panchang items */}
        <div
          className="rounded-2xl border p-5"
          style={{
            background: "oklch(0.17 0.07 26 / 0.9)",
            borderColor: "oklch(0.78 0.14 75 / 0.2)",
            boxShadow: "0 4px 32px oklch(0.62 0.18 48 / 0.12)",
          }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {items.map((item, i) => (
              <div
                key={item.label}
                data-ocid={`panchang-widget.item.${i + 1}`}
                className="rounded-xl p-3 text-center"
                style={{
                  background: "oklch(0.22 0.08 30 / 0.8)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.12)",
                }}
              >
                <div className="text-2xl mb-1">{item.icon}</div>
                <p
                  className="font-heading text-xs font-semibold uppercase tracking-wider mb-1"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {item.label}
                </p>
                <p
                  className="font-heading font-bold text-sm leading-tight"
                  style={{ color: "oklch(0.92 0.06 72)" }}
                >
                  {item.value}
                </p>
                {item.valueHi && (
                  <p
                    className="font-body text-xs mt-0.5"
                    style={{
                      color: "oklch(0.65 0.05 60)",
                      fontFamily: "serif",
                    }}
                  >
                    {item.valueHi}
                  </p>
                )}
              </div>
            ))}
          </div>

          <p
            className="font-body text-xs text-center mt-3"
            style={{ color: "oklch(0.50 0.04 50)" }}
          >
            * Sunrise & Sunset timings are approximate. Rahu Kaal is based on
            weekday.
          </p>
        </div>

        {/* View Full Panchang CTA */}
        <div className="text-center mt-5">
          <Link
            to="/live-panchang"
            data-ocid="panchang-widget.full_link"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-semibold text-sm transition-all duration-200 hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.78 0.14 75), oklch(0.68 0.20 48))",
              color: "oklch(0.18 0.04 30)",
              boxShadow: "0 4px 16px oklch(0.68 0.20 48 / 0.3)",
            }}
          >
            View Full Panchang <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
