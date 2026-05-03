import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock, Gem, Star, Sunrise } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  NUMEROLOGY_WATCHES,
  type NumerologyWatch,
} from "../data/shopData_numerology_watches";

// ─── Life Path Calculator ────────────────────────────────────────────────────

function calcLifePath(dateStr: string): number | null {
  if (!dateStr) return null;
  const digits = dateStr.replace(/\D/g, "");
  if (digits.length < 8) return null;
  let sum = digits
    .split("")
    .reduce((acc, d) => acc + Number.parseInt(d, 10), 0);
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum
      .toString()
      .split("")
      .reduce((a, d) => a + Number.parseInt(d, 10), 0);
  }
  // For this collection we only have 1-9 + 11
  if (sum === 22 || sum === 33) return sum > 11 ? 9 : 11;
  return sum;
}

// ─── Dial Preview ────────────────────────────────────────────────────────────

function DialPreview({ watch }: { watch: NumerologyWatch }) {
  const isGradient = watch.dialColor.startsWith("linear");
  return (
    <div className="relative mx-auto" style={{ width: 120, height: 120 }}>
      {/* Outer ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.82 0.16 72), oklch(0.68 0.20 48))",
          padding: 4,
        }}
      >
        {/* Inner dial */}
        <div
          className="w-full h-full rounded-full flex items-center justify-center relative overflow-hidden"
          style={{
            background: isGradient ? watch.dialColor : watch.dialColor,
          }}
        >
          {/* Hour markers */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
            (deg) => (
              <div
                key={deg}
                className="absolute"
                style={{
                  width: deg % 90 === 0 ? 2 : 1,
                  height: deg % 90 === 0 ? 10 : 6,
                  background: "rgba(255,255,255,0.7)",
                  top: "8%",
                  left: "50%",
                  transformOrigin: "bottom center",
                  transform: `translateX(-50%) rotate(${deg}deg) translateY(-28px)`,
                }}
              />
            ),
          )}
          {/* Number badge */}
          <div
            className="relative z-10 rounded-full flex items-center justify-center"
            style={{
              width: 44,
              height: 44,
              background: "rgba(0,0,0,0.45)",
              border: "1.5px solid rgba(255,215,0,0.7)",
            }}
          >
            <span
              className="font-heading font-black"
              style={{
                fontSize: watch.number === 11 ? 16 : 20,
                color: "oklch(0.88 0.16 72)",
                letterSpacing: -1,
              }}
            >
              {watch.number}
            </span>
          </div>
        </div>
      </div>
      {/* Crown */}
      <div
        className="absolute rounded-sm"
        style={{
          width: 5,
          height: 12,
          right: -2,
          top: "50%",
          transform: "translateY(-50%)",
          background:
            "linear-gradient(180deg, oklch(0.82 0.16 72), oklch(0.62 0.14 48))",
        }}
      />
    </div>
  );
}

// ─── Watch Card ──────────────────────────────────────────────────────────────

function WatchCard({
  watch,
  highlighted,
  onViewDetails,
}: {
  watch: NumerologyWatch;
  highlighted: boolean;
  onViewDetails: (w: NumerologyWatch) => void;
}) {
  const discount = Math.round(((watch.mrp - watch.price) / watch.mrp) * 100);

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
      data-ocid={`numerology_watches.card.${watch.number}`}
      style={{
        background: highlighted
          ? "linear-gradient(160deg, oklch(0.18 0.08 28), oklch(0.14 0.10 40))"
          : "linear-gradient(160deg, oklch(0.12 0.04 26), oklch(0.10 0.03 24))",
        border: highlighted
          ? "2px solid oklch(0.72 0.20 55)"
          : "1px solid oklch(0.22 0.06 30)",
        boxShadow: highlighted ? "0 0 24px oklch(0.72 0.20 55 / 0.35)" : "none",
      }}
    >
      {/* Highlighted badge */}
      {highlighted && (
        <div
          className="text-center py-1.5 text-xs font-heading font-bold tracking-widest"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.68 0.20 48), oklch(0.72 0.18 55))",
            color: "white",
          }}
        >
          ✨ YOUR LUCKY NUMBER
        </div>
      )}

      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* Dial */}
        <div className="flex justify-center">
          <DialPreview watch={watch} />
        </div>

        {/* Planet badge */}
        <div className="flex justify-center">
          <span
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-heading font-semibold"
            style={{
              background: "oklch(0.68 0.20 48 / 0.15)",
              border: "1px solid oklch(0.68 0.20 48 / 0.4)",
              color: "oklch(0.82 0.16 65)",
            }}
          >
            <Sunrise className="w-3 h-3" />
            {watch.rulingPlanet}
          </span>
        </div>

        {/* Name & price */}
        <div className="text-center">
          <p
            className="font-heading font-bold text-sm leading-tight mb-1"
            style={{ color: "oklch(0.88 0.12 72)" }}
          >
            {watch.name}
          </p>
          <div className="flex items-center justify-center gap-2">
            <span
              className="font-heading font-black text-lg"
              style={{ color: "oklch(0.75 0.18 60)" }}
            >
              ₹{watch.price.toLocaleString("en-IN")}
            </span>
            <span
              className="text-xs line-through"
              style={{ color: "oklch(0.50 0.05 50)" }}
            >
              ₹{watch.mrp.toLocaleString("en-IN")}
            </span>
            <Badge
              className="text-xs px-1.5 py-0"
              style={{
                background: "oklch(0.45 0.15 22)",
                color: "oklch(0.92 0.08 72)",
              }}
            >
              {discount}% off
            </Badge>
          </div>
        </div>

        {/* Gem */}
        <p
          className="text-center text-xs flex items-center justify-center gap-1"
          style={{ color: "oklch(0.62 0.08 55)" }}
        >
          <Gem className="w-3 h-3" />
          {watch.luckyGem}
        </p>

        {/* Action */}
        <Button
          type="button"
          size="sm"
          onClick={() => onViewDetails(watch)}
          data-ocid={`numerology_watches.view_button.${watch.number}`}
          className="w-full mt-auto font-heading font-semibold text-xs h-8"
          style={{
            background: highlighted
              ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
              : "oklch(0.20 0.06 28)",
            color: "oklch(0.90 0.10 72)",
            border: highlighted ? "none" : "1px solid oklch(0.32 0.08 35)",
          }}
        >
          View Details
        </Button>
      </div>
    </div>
  );
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────

function WatchDetailModal({
  watch,
  open,
  onClose,
}: {
  watch: NumerologyWatch | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!watch) return null;
  const discount = Math.round(((watch.mrp - watch.price) / watch.mrp) * 100);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-lg w-full max-h-[90vh] overflow-y-auto"
        data-ocid="numerology_watches.dialog"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.14 0.06 28), oklch(0.10 0.03 24))",
          border: "1px solid oklch(0.28 0.08 35)",
        }}
      >
        <DialogHeader>
          <DialogTitle
            className="font-heading text-xl"
            style={{ color: "oklch(0.88 0.14 72)" }}
          >
            Number {watch.number} — {watch.name.split(" — ")[0]}
          </DialogTitle>
        </DialogHeader>

        {/* Dial preview */}
        <div className="flex justify-center py-4">
          <DialPreview watch={watch} />
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-3 justify-center">
          <span
            className="font-heading font-black text-2xl"
            style={{ color: "oklch(0.75 0.18 60)" }}
          >
            ₹{watch.price.toLocaleString("en-IN")}
          </span>
          <span
            className="text-sm line-through"
            style={{ color: "oklch(0.50 0.05 50)" }}
          >
            ₹{watch.mrp.toLocaleString("en-IN")}
          </span>
          <Badge style={{ background: "oklch(0.45 0.15 22)", color: "white" }}>
            {discount}% OFF
          </Badge>
        </div>

        <Separator
          style={{ background: "oklch(0.25 0.06 32)" }}
          className="my-2"
        />

        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div
            className="rounded-xl p-3"
            style={{ background: "oklch(0.16 0.05 28)" }}
          >
            <p
              className="text-xs font-heading font-semibold mb-1"
              style={{ color: "oklch(0.65 0.12 55)" }}
            >
              Ruling Planet
            </p>
            <p style={{ color: "oklch(0.85 0.10 72)" }}>{watch.rulingPlanet}</p>
          </div>
          <div
            className="rounded-xl p-3"
            style={{ background: "oklch(0.16 0.05 28)" }}
          >
            <p
              className="text-xs font-heading font-semibold mb-1"
              style={{ color: "oklch(0.65 0.12 55)" }}
            >
              Lucky Gem
            </p>
            <p style={{ color: "oklch(0.85 0.10 72)" }}>{watch.luckyGem}</p>
          </div>
          <div
            className="rounded-xl p-3"
            style={{ background: "oklch(0.16 0.05 28)" }}
          >
            <p
              className="text-xs font-heading font-semibold mb-1"
              style={{ color: "oklch(0.65 0.12 55)" }}
            >
              Lucky Color
            </p>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full border border-white/20"
                style={{
                  background: watch.dialColor.startsWith("linear")
                    ? watch.dialColor
                    : watch.dialColor,
                }}
              />
              <span style={{ color: "oklch(0.85 0.10 72)" }}>
                {watch.luckyColor}
              </span>
            </div>
          </div>
          <div
            className="rounded-xl p-3"
            style={{ background: "oklch(0.16 0.05 28)" }}
          >
            <p
              className="text-xs font-heading font-semibold mb-1"
              style={{ color: "oklch(0.65 0.12 55)" }}
            >
              Case Size
            </p>
            <p style={{ color: "oklch(0.85 0.10 72)" }}>{watch.caseSize}</p>
          </div>
        </div>

        {/* Lucky days */}
        <div>
          <p
            className="text-xs font-heading font-semibold mb-2 flex items-center gap-1"
            style={{ color: "oklch(0.65 0.12 55)" }}
          >
            <Calendar className="w-3 h-3" /> Lucky Days
          </p>
          <div className="flex flex-wrap gap-1.5">
            {watch.luckyDays.map((day) => (
              <span
                key={day}
                className="px-2.5 py-0.5 rounded-full text-xs font-heading"
                style={{
                  background: "oklch(0.68 0.20 48 / 0.15)",
                  border: "1px solid oklch(0.68 0.20 48 / 0.35)",
                  color: "oklch(0.80 0.14 62)",
                }}
              >
                {day}
              </span>
            ))}
          </div>
        </div>

        {/* Personality */}
        <div
          className="rounded-xl p-3"
          style={{
            background: "oklch(0.16 0.05 28)",
            borderLeft: "3px solid oklch(0.68 0.20 48)",
          }}
        >
          <p
            className="text-xs font-heading font-semibold mb-1"
            style={{ color: "oklch(0.65 0.12 55)" }}
          >
            <Star className="w-3 h-3 inline mr-1" />
            Number {watch.number} Personality
          </p>
          <p
            className="text-sm italic"
            style={{ color: "oklch(0.80 0.08 65)" }}
          >
            {watch.personality}
          </p>
        </div>

        {/* Description */}
        <div>
          <p
            className="text-xs font-heading font-semibold mb-1"
            style={{ color: "oklch(0.65 0.12 55)" }}
          >
            About This Timepiece
          </p>
          <p className="text-sm" style={{ color: "oklch(0.72 0.06 60)" }}>
            {watch.description}
          </p>
        </div>

        {/* Benefits */}
        <div>
          <p
            className="text-xs font-heading font-semibold mb-1"
            style={{ color: "oklch(0.65 0.12 55)" }}
          >
            Benefits & Significance
          </p>
          <p className="text-sm" style={{ color: "oklch(0.72 0.06 60)" }}>
            {watch.benefits}
          </p>
        </div>

        {/* Material */}
        <div
          className="flex items-center gap-2 text-xs"
          style={{ color: "oklch(0.55 0.05 50)" }}
        >
          <Clock className="w-3 h-3" />
          <span>{watch.material}</span>
        </div>

        <Separator
          style={{ background: "oklch(0.25 0.06 32)" }}
          className="my-1"
        />

        <Button
          type="button"
          data-ocid="numerology_watches.add_to_cart_button"
          className="w-full font-heading font-bold"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
            color: "white",
          }}
          onClick={() => {
            toast.success(`${watch.name} added to cart! ⌚`);
            onClose();
          }}
        >
          Add to Cart — ₹{watch.price.toLocaleString("en-IN")}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NumerologyWatchesPage() {
  const [birthDate, setBirthDate] = useState("");
  const [lifePathNum, setLifePathNum] = useState<number | null>(null);
  const [selectedWatch, setSelectedWatch] = useState<NumerologyWatch | null>(
    null,
  );
  const [modalOpen, setModalOpen] = useState(false);

  function handleCalc() {
    const n = calcLifePath(birthDate);
    if (n === null) {
      toast.error("Please enter a valid birth date (DD/MM/YYYY or YYYY-MM-DD)");
      return;
    }
    setLifePathNum(n);
    const el = document.getElementById("watches-grid");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    toast.success(`Your Life Path Number is ${n}! ✨`);
  }

  function openDetail(watch: NumerologyWatch) {
    setSelectedWatch(watch);
    setModalOpen(true);
  }

  return (
    <main
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.10 0.04 26) 0%, oklch(0.14 0.05 28) 100%)",
      }}
    >
      {/* Back nav */}
      <div className="border-b" style={{ borderColor: "oklch(0.20 0.05 28)" }}>
        <div className="container mx-auto px-4 py-3">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-heading hover:underline"
            data-ocid="numerology_watches.back_link"
            style={{ color: "oklch(0.72 0.14 58)" }}
          >
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section
        className="relative overflow-hidden py-16 md:py-20"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.22 0.10 38 / 0.5), transparent)",
        }}
      >
        {/* Stars */}
        {Array.from({ length: 32 }, (_, i) => `star-${i}`).map((key, i) => (
          <div
            key={key}
            className="absolute rounded-full"
            style={{
              width: i % 5 === 0 ? 3 : 1.5,
              height: i % 5 === 0 ? 3 : 1.5,
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              background:
                i % 3 === 0 ? "oklch(0.88 0.16 72)" : "oklch(0.70 0.06 60)",
              opacity: 0.5 + (i % 5) * 0.1,
            }}
          />
        ))}

        <div className="container mx-auto px-4 text-center relative z-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
            style={{
              background: "oklch(0.68 0.20 48 / 0.12)",
              border: "1px solid oklch(0.68 0.20 48 / 0.30)",
            }}
          >
            <span className="text-sm">⌚</span>
            <span
              className="text-xs font-heading font-semibold tracking-widest uppercase"
              style={{ color: "oklch(0.72 0.16 55)" }}
            >
              Numerology Timepieces
            </span>
          </div>
          <h1
            className="font-heading text-4xl md:text-5xl font-black mb-3 leading-tight"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.88 0.16 72), oklch(0.72 0.18 55))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Numerology Timepieces
            <br />
            <span className="text-3xl md:text-4xl">Wear Your Destiny</span>
          </h1>
          <p
            className="font-heading text-base mb-1"
            style={{ color: "oklch(0.68 0.12 58)" }}
          >
            अंकशास्त्र टाइमपीस — अपनी नियति पहनें
          </p>
          <p
            className="text-sm max-w-md mx-auto"
            style={{ color: "oklch(0.58 0.06 52)" }}
          >
            Each watch tuned to your lucky number, ruling planet, and gemstone
            vibration
          </p>
        </div>
      </section>

      {/* Life Path Calculator */}
      <section
        className="py-8 border-y"
        style={{
          background: "oklch(0.13 0.05 27)",
          borderColor: "oklch(0.22 0.06 32)",
        }}
        data-ocid="numerology_watches.calculator_section"
      >
        <div className="container mx-auto px-4 max-w-lg">
          <h2
            className="font-heading text-xl font-bold text-center mb-1"
            style={{ color: "oklch(0.84 0.14 68)" }}
          >
            🔢 Find Your Lucky Number
          </h2>
          <p
            className="text-sm text-center mb-5"
            style={{ color: "oklch(0.58 0.06 52)" }}
          >
            Enter your birth date to discover your Life Path number and matching
            watch
          </p>
          <div className="flex gap-3">
            <div className="flex-1">
              <Label
                htmlFor="birthdate"
                className="text-xs font-heading"
                style={{ color: "oklch(0.65 0.10 55)" }}
              >
                Date of Birth
              </Label>
              <Input
                id="birthdate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                data-ocid="numerology_watches.birthdate_input"
                className="mt-1 font-heading"
                style={{
                  background: "oklch(0.16 0.05 28)",
                  border: "1px solid oklch(0.28 0.07 32)",
                  color: "oklch(0.85 0.10 70)",
                }}
              />
            </div>
            <div className="flex items-end">
              <Button
                type="button"
                onClick={handleCalc}
                data-ocid="numerology_watches.calc_button"
                className="font-heading font-bold"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                  color: "white",
                }}
              >
                Calculate
              </Button>
            </div>
          </div>
          {lifePathNum !== null && (
            <div
              className="mt-4 rounded-xl p-4 text-center"
              style={{
                background: "oklch(0.68 0.20 48 / 0.10)",
                border: "1px solid oklch(0.68 0.20 48 / 0.30)",
              }}
              data-ocid="numerology_watches.calc_result"
            >
              <p
                className="font-heading font-black text-3xl"
                style={{ color: "oklch(0.82 0.18 62)" }}
              >
                {lifePathNum}
              </p>
              <p
                className="text-sm font-heading"
                style={{ color: "oklch(0.70 0.10 58)" }}
              >
                Your Life Path Number
                {lifePathNum === 11 && " — Master Number"}
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: "oklch(0.58 0.06 52)" }}
              >
                ✨ Your matching watch is highlighted below
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Watch Grid */}
      <section
        className="py-10"
        id="watches-grid"
        data-ocid="numerology_watches.grid_section"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {NUMEROLOGY_WATCHES.map((watch) => (
              <WatchCard
                key={watch.id}
                watch={watch}
                highlighted={lifePathNum === watch.number}
                onViewDetails={openDetail}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Info strip */}
      <section
        className="py-8 border-t"
        style={{
          background: "oklch(0.12 0.04 26)",
          borderColor: "oklch(0.20 0.05 28)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              {
                icon: "⌚",
                title: "Sapphire Crystal Glass",
                desc: "Scratch-resistant, 10x harder than ordinary mineral glass",
              },
              {
                icon: "🔢",
                title: "Numerologically Tuned",
                desc: "Dial color and design aligned to each number's planetary vibration",
              },
              {
                icon: "💎",
                title: "Gemstone Synergy",
                desc: "Wear alongside your lucky gemstone for amplified results",
              },
            ].map((item) => (
              <div key={item.title}>
                <div className="text-2xl mb-2">{item.icon}</div>
                <p
                  className="font-heading font-bold text-sm mb-1"
                  style={{ color: "oklch(0.80 0.12 68)" }}
                >
                  {item.title}
                </p>
                <p className="text-xs" style={{ color: "oklch(0.58 0.05 52)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <WatchDetailModal
        watch={selectedWatch}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </main>
  );
}
