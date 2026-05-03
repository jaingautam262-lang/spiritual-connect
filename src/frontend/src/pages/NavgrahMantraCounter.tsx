import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, RotateCcw, Volume2 } from "lucide-react";
import { useState } from "react";

interface NavgrahMantra {
  id: string;
  planet: string;
  planetHi: string;
  deity: string;
  beejMantra: string;
  mulMantra: string;
  transliteration: string;
  meaning: string;
  color: string;
  day: string;
  youtubeQuery: string;
}

const NAVGRAH_MANTRAS: NavgrahMantra[] = [
  {
    id: "surya",
    planet: "Sun (Surya)",
    planetHi: "सूर्य",
    deity: "Lord Surya",
    beejMantra: "ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः",
    mulMantra:
      "ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः ॥ ॐ आदित्याय विद्महे मार्तण्डाय धीमहि तन्नः सूर्यः प्रचोदयात् ॥",
    transliteration: "Om Hraam Hreem Hroum Sah Suryaya Namah",
    meaning:
      "Salutations to the Sun God who is the source of all life and light",
    color: "oklch(0.75 0.22 65)",
    day: "Sunday / रविवार",
    youtubeQuery: "Surya Mul Mantra 108 times",
  },
  {
    id: "chandra",
    planet: "Moon (Chandra)",
    planetHi: "चंद्र",
    deity: "Lord Chandra",
    beejMantra: "ॐ श्रां श्रीं श्रौं सः चंद्रमसे नमः",
    mulMantra:
      "ॐ श्रां श्रीं श्रौं सः चंद्रमसे नमः ॥ ॐ क्षीरपुत्राय विद्महे अमृततत्त्वाय धीमहि तन्नः चंद्रः प्रचोदयात् ॥",
    transliteration: "Om Shraam Shreem Shraum Sah Chandramase Namah",
    meaning: "Salutations to the Moon God who governs the mind and emotions",
    color: "oklch(0.85 0.06 220)",
    day: "Monday / सोमवार",
    youtubeQuery: "Chandra Mul Mantra 108 times",
  },
  {
    id: "mangal",
    planet: "Mars (Mangal)",
    planetHi: "मंगल",
    deity: "Lord Mangal",
    beejMantra: "ॐ क्रां क्रीं क्रौं सः भौमाय नमः",
    mulMantra:
      "ॐ क्रां क्रीं क्रौं सः भौमाय नमः ॥ ॐ अंगारकाय विद्महे शक्तिहस्ताय धीमहि तन्नो भौमः प्रचोदयात् ॥",
    transliteration: "Om Kraam Kreem Kraum Sah Bhaumaya Namah",
    meaning: "Salutations to Mars, the planet of courage and energy",
    color: "oklch(0.60 0.22 32)",
    day: "Tuesday / मंगलवार",
    youtubeQuery: "Mangal Mul Mantra 108 times",
  },
  {
    id: "budha",
    planet: "Mercury (Budha)",
    planetHi: "बुध",
    deity: "Lord Budha",
    beejMantra: "ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः",
    mulMantra:
      "ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः ॥ ॐ गजध्वजाय विद्महे शुक्रहस्ताय धीमहि तन्नो बुधः प्रचोदयात् ॥",
    transliteration: "Om Braam Breem Braum Sah Budhaya Namah",
    meaning:
      "Salutations to Mercury, the planet of intellect and communication",
    color: "oklch(0.65 0.18 150)",
    day: "Wednesday / बुधवार",
    youtubeQuery: "Budha Mul Mantra 108 times",
  },
  {
    id: "brihaspati",
    planet: "Jupiter (Brihaspati)",
    planetHi: "बृहस्पति",
    deity: "Lord Brihaspati",
    beejMantra: "ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः",
    mulMantra:
      "ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः ॥ ॐ वृषभध्वजाय विद्महे घृणिहस्ताय धीमहि तन्नो गुरुः प्रचोदयात् ॥",
    transliteration: "Om Graam Greem Graum Sah Gurave Namah",
    meaning:
      "Salutations to Jupiter, the guru of the gods, the planet of wisdom",
    color: "oklch(0.80 0.18 90)",
    day: "Thursday / गुरुवार",
    youtubeQuery: "Brihaspati Guru Mul Mantra 108 times",
  },
  {
    id: "shukra",
    planet: "Venus (Shukra)",
    planetHi: "शुक्र",
    deity: "Lord Shukra",
    beejMantra: "ॐ द्रां द्रीं द्रौं सः शुक्राय नमः",
    mulMantra:
      "ॐ द्रां द्रीं द्रौं सः शुक्राय नमः ॥ ॐ अश्वध्वजाय विद्महे धनुर्हस्ताय धीमहि तन्नो शुक्रः प्रचोदयात् ॥",
    transliteration: "Om Draam Dreem Draum Sah Shukraya Namah",
    meaning: "Salutations to Venus, the planet of beauty, love and prosperity",
    color: "oklch(0.75 0.15 320)",
    day: "Friday / शुक्रवार",
    youtubeQuery: "Shukra Mul Mantra 108 times",
  },
  {
    id: "shani",
    planet: "Saturn (Shani)",
    planetHi: "शनि",
    deity: "Lord Shani",
    beejMantra: "ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः",
    mulMantra:
      "ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः ॥ ॐ काकध्वजाय विद्महे खड्गहस्ताय धीमहि तन्नो मंदः प्रचोदयात् ॥",
    transliteration: "Om Praam Preem Praum Sah Shanaischaraya Namah",
    meaning:
      "Salutations to Saturn, the planet of karma, discipline and justice",
    color: "oklch(0.45 0.08 260)",
    day: "Saturday / शनिवार",
    youtubeQuery: "Shani Mul Mantra 108 times",
  },
  {
    id: "rahu",
    planet: "Rahu (North Node)",
    planetHi: "राहु",
    deity: "Lord Rahu",
    beejMantra: "ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः",
    mulMantra:
      "ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः ॥ ॐ नागध्वजाय विद्महे पद्महस्ताय धीमहि तन्नो राहुः प्रचोदयात् ॥",
    transliteration: "Om Bhraam Bhreem Bhraum Sah Rahave Namah",
    meaning:
      "Salutations to Rahu, the shadow planet of worldly desires and karmic lessons",
    color: "oklch(0.50 0.15 20)",
    day: "Wednesday / बुधवार",
    youtubeQuery: "Rahu Mul Mantra 108 times",
  },
  {
    id: "ketu",
    planet: "Ketu (South Node)",
    planetHi: "केतु",
    deity: "Lord Ketu",
    beejMantra: "ॐ स्त्रां स्त्रीं स्त्रौं सः केतवे नमः",
    mulMantra:
      "ॐ स्त्रां स्त्रीं स्त्रौं सः केतवे नमः ॥ ॐ अश्वध्वजाय विद्महे शूलहस्ताय धीमहि तन्नो केतुः प्रचोदयात् ॥",
    transliteration: "Om Straam Streem Straum Sah Ketave Namah",
    meaning:
      "Salutations to Ketu, the shadow planet of moksha and spiritual liberation",
    color: "oklch(0.55 0.12 165)",
    day: "Tuesday / मंगलवार",
    youtubeQuery: "Ketu Mul Mantra 108 times",
  },
];

const BEAD_POSITIONS = Array.from({ length: 27 }, (_, i) => i);

function MalaBeads({ count, target }: { count: number; target: number }) {
  const pct = Math.min(count / target, 1);
  const filledBeads = Math.floor(pct * BEAD_POSITIONS.length);
  return (
    <div className="flex flex-wrap gap-1 justify-center my-3">
      {BEAD_POSITIONS.map((pos) => (
        <div
          key={pos}
          className="w-3 h-3 rounded-full transition-all duration-300"
          style={{
            background:
              pos < filledBeads
                ? "linear-gradient(135deg, oklch(0.78 0.14 75), oklch(0.68 0.20 48))"
                : "oklch(0.30 0.05 40)",
            boxShadow:
              pos < filledBeads ? "0 0 4px oklch(0.78 0.14 75 / 0.5)" : "none",
          }}
        />
      ))}
    </div>
  );
}

interface MantraCardProps {
  mantra: NavgrahMantra;
}

function MantraCard({ mantra }: MantraCardProps) {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState<108 | 1008>(108);
  const [completed, setCompleted] = useState(false);
  const [expanded, setExpanded] = useState(false);

  function increment() {
    if (completed) return;
    const next = count + 1;
    setCount(next);
    if (next >= target) setCompleted(true);
  }

  function reset() {
    setCount(0);
    setCompleted(false);
  }

  const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(mantra.youtubeQuery)}`;

  return (
    <div
      className="rounded-2xl border overflow-hidden transition-all hover:border-opacity-60"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.18 0.07 22), oklch(0.22 0.08 26))",
        borderColor: `${mantra.color}30`,
      }}
      data-ocid={`navgrah.card.${mantra.id}`}
    >
      {/* Header */}
      <button
        type="button"
        className="w-full p-4 flex items-center justify-between cursor-pointer text-left"
        style={{ borderBottom: `1px solid ${mantra.color}20` }}
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
            style={{
              background: `${mantra.color}15`,
              border: `2px solid ${mantra.color}40`,
            }}
          >
            🪐
          </div>
          <div>
            <h3
              className="font-heading font-bold text-base"
              style={{ color: mantra.color }}
            >
              {mantra.planetHi}
            </h3>
            <p
              className="text-xs font-body"
              style={{ color: "oklch(0.65 0.04 55)" }}
            >
              {mantra.planet} · {mantra.day}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            className="text-xs"
            style={{
              background: `${mantra.color}20`,
              color: mantra.color,
              border: `1px solid ${mantra.color}40`,
            }}
          >
            {count}/{target}
          </Badge>
          <span style={{ color: "oklch(0.60 0.04 55)" }}>
            {expanded ? "▲" : "▼"}
          </span>
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="p-4 space-y-4">
          {/* Mantra text */}
          <div
            className="p-4 rounded-xl text-center"
            style={{
              background: `${mantra.color}08`,
              border: `1px solid ${mantra.color}20`,
            }}
          >
            <p
              className="font-decorative text-lg leading-loose mb-2"
              style={{ color: "oklch(0.92 0.06 75)", fontFamily: "serif" }}
            >
              {mantra.beejMantra}
            </p>
            <p
              className="text-xs font-body italic"
              style={{ color: "oklch(0.65 0.04 55)" }}
            >
              {mantra.transliteration}
            </p>
          </div>

          {/* Full Mul Mantra */}
          <div>
            <p
              className="text-xs font-heading font-semibold mb-1"
              style={{ color: "oklch(0.70 0.04 60)" }}
            >
              🔔 Mul Mantra:
            </p>
            <p
              className="text-sm font-body leading-relaxed"
              style={{ color: "oklch(0.85 0.05 72)", fontFamily: "serif" }}
            >
              {mantra.mulMantra}
            </p>
          </div>

          <p
            className="text-xs font-body italic"
            style={{ color: "oklch(0.60 0.04 55)" }}
          >
            ✨ {mantra.meaning}
          </p>

          {/* Target selector */}
          <div className="flex gap-2 justify-center">
            {([108, 1008] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTarget(t);
                  setCount(0);
                  setCompleted(false);
                }}
                className="px-4 py-2 rounded-full text-sm font-heading font-semibold transition-all"
                style={{
                  background:
                    target === t
                      ? `linear-gradient(135deg, ${mantra.color}, oklch(0.68 0.20 48))`
                      : "oklch(0.28 0.05 35)",
                  color: target === t ? "white" : "oklch(0.70 0.04 60)",
                  border: `1px solid ${mantra.color}30`,
                }}
                data-ocid={`navgrah.target_${t}.${mantra.id}`}
              >
                {t} जप
              </button>
            ))}
          </div>

          {/* Progress */}
          {!completed && <MalaBeads count={count} target={target} />}

          {/* Completion celebration */}
          {completed && (
            <div
              className="text-center py-3 rounded-xl animate-pulse"
              style={{
                background: `${mantra.color}15`,
                border: `1px solid ${mantra.color}40`,
              }}
            >
              <p className="text-2xl mb-1">🎉</p>
              <p
                className="font-heading font-bold text-sm"
                style={{ color: mantra.color }}
              >
                {target} जप पूर्ण हुए! 🙏
              </p>
              <p
                className="text-xs font-body mt-1"
                style={{ color: "oklch(0.65 0.04 55)" }}
              >
                {target} repetitions completed
              </p>
            </div>
          )}

          {/* Counter display */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={increment}
              disabled={completed}
              className="flex-1 py-3 rounded-xl font-heading font-bold text-xl transition-all active:scale-95"
              style={{
                background: completed
                  ? "oklch(0.30 0.05 35)"
                  : `linear-gradient(135deg, ${mantra.color}, oklch(0.68 0.20 48))`,
                color: "white",
                cursor: completed ? "not-allowed" : "pointer",
                boxShadow: completed ? "none" : `0 4px 16px ${mantra.color}40`,
              }}
              data-ocid={`navgrah.count_button.${mantra.id}`}
            >
              {completed ? "✓ पूर्ण" : `🙏 जप करें (${count})`}
            </button>
            <button
              type="button"
              onClick={reset}
              className="p-3 rounded-xl transition-all hover:scale-110"
              style={{
                background: "oklch(0.28 0.05 35)",
                color: "oklch(0.70 0.04 60)",
              }}
              aria-label="Reset counter"
              data-ocid={`navgrah.reset_button.${mantra.id}`}
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>

          {/* Progress bar */}
          <div
            className="w-full h-2 rounded-full overflow-hidden"
            style={{ background: "oklch(0.28 0.05 35)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${Math.min((count / target) * 100, 100)}%`,
                background: `linear-gradient(90deg, ${mantra.color}, oklch(0.78 0.14 75))`,
              }}
            />
          </div>
          <p
            className="text-center text-xs font-body"
            style={{ color: "oklch(0.60 0.04 55)" }}
          >
            {count} / {target} — {Math.round((count / target) * 100)}% पूर्ण
          </p>

          {/* YouTube */}
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-heading font-semibold transition-all hover:scale-105 w-full"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
              border: "1px solid oklch(0.78 0.14 75 / 0.3)",
            }}
            data-ocid={`navgrah.youtube_button.${mantra.id}`}
          >
            <Volume2 className="h-4 w-4" />
            <ExternalLink className="h-3.5 w-3.5" />🎵 सुनें YouTube पर
          </a>
        </div>
      )}
    </div>
  );
}

export default function NavgrahMantraCounter() {
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.14 0.05 20) 0%, oklch(0.18 0.07 22) 100%)",
      }}
    >
      {/* Hero */}
      <section
        className="py-12 px-4 text-center border-b"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 25), oklch(0.24 0.10 30))",
          borderColor: "oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        <div className="container mx-auto max-w-2xl">
          <p className="text-5xl mb-3">🪐</p>
          <h1
            className="font-decorative text-3xl md:text-4xl font-bold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            नवग्रह मूल मंत्र
          </h1>
          <p
            className="font-heading text-lg font-medium mb-2"
            style={{ color: "oklch(0.85 0.06 75)" }}
          >
            Navgrah Mul Mantra Japa Counter
          </p>
          <p
            className="font-body text-sm leading-relaxed"
            style={{ color: "oklch(0.65 0.04 55)" }}
          >
            सभी 9 ग्रहों के मूल मंत्रों का 108 या 1008 बार जप करें। काउंटर पर टैप करें, माला
            की प्रगति देखें और YouTube पर सुनें।
          </p>
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            <Badge
              style={{
                background: "oklch(0.68 0.20 48 / 0.2)",
                color: "oklch(0.78 0.14 75)",
                border: "1px solid oklch(0.68 0.20 48 / 0.4)",
              }}
            >
              9 Navgrah
            </Badge>
            <Badge
              style={{
                background: "oklch(0.55 0.18 160 / 0.2)",
                color: "oklch(0.65 0.14 160)",
                border: "1px solid oklch(0.55 0.18 160 / 0.4)",
              }}
            >
              108 जप
            </Badge>
            <Badge
              style={{
                background: "oklch(0.70 0.14 280 / 0.2)",
                color: "oklch(0.75 0.12 280)",
                border: "1px solid oklch(0.70 0.14 280 / 0.4)",
              }}
            >
              1008 जप
            </Badge>
          </div>
        </div>
      </section>

      {/* Instructions */}
      <section className="py-6 px-4">
        <div className="container mx-auto max-w-3xl">
          <div
            className="p-4 rounded-xl border text-center"
            style={{
              background: "oklch(0.20 0.08 25)",
              borderColor: "oklch(0.78 0.14 75 / 0.2)",
            }}
          >
            <p
              className="text-sm font-body"
              style={{ color: "oklch(0.78 0.06 65)" }}
            >
              🙏 किसी भी ग्रह कार्ड पर क्लिक करके खोलें · 108 या 1008 जप चुनें ·
              <strong> जप करें</strong> बटन दबाएं · पूर्ण होने पर 🎉 मिलेगा
            </p>
          </div>
        </div>
      </section>

      {/* Mantra Grid */}
      <section className="py-4 px-4 pb-16">
        <div className="container mx-auto max-w-3xl space-y-4">
          {NAVGRAH_MANTRAS.map((mantra) => (
            <MantraCard key={mantra.id} mantra={mantra} />
          ))}
        </div>
      </section>
    </div>
  );
}
