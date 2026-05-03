import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  Calendar,
  CheckCircle,
  ChevronRight,
  Heart,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Puja Catalog ─────────────────────────────────────────────────────────────

const PUJA_TYPES = [
  {
    id: "durga-puja",
    name: "Durga Puja",
    hindi: "दुर्गा पूजा",
    icon: "🌺",
    deity: "Maa Durga",
    description:
      "Invokes Maa Durga's divine Shakti for strength, protection, and victory over obstacles. Performed with Navarna Mantra, Devi Mahatmya recitation, and sacred offerings.",
  },
  {
    id: "hanuman-puja",
    name: "Hanuman Puja",
    hindi: "हनुमान पूजा",
    icon: "🐒",
    deity: "Hanuman Ji",
    description:
      "Dedicated to Bajrangbali for courage, unwavering devotion, and protection from negative energies. Includes Hanuman Chalisa recitation and sindoor offering.",
  },
  {
    id: "lakshmi-puja",
    name: "Lakshmi Puja",
    hindi: "लक्ष्मी पूजा",
    icon: "💰",
    deity: "Maa Lakshmi",
    description:
      "Performed to invoke divine abundance, wealth, and prosperity. Includes lotus flowers, panchamrit abhishek, and Shree Sukta recitation for maximum grace.",
  },
  {
    id: "shiv-puja",
    name: "Shiv Puja / Rudrabhishek",
    hindi: "शिव पूजा / रुद्राभिषेक",
    icon: "🔱",
    deity: "Mahadev",
    description:
      "Sacred Rudrabhishek with milk, honey, and bel patra to invoke Lord Shiva's blessings for health, karma cleansing, and moksha-path guidance.",
  },
  {
    id: "saraswati-puja",
    name: "Saraswati Puja",
    hindi: "सरस्वती पूजा",
    icon: "📚",
    deity: "Maa Saraswati",
    description:
      "Invokes the goddess of knowledge, arts, and wisdom. Ideal for students, artists, and seekers of intellectual clarity before examinations or new endeavors.",
  },
  {
    id: "navgrah-puja",
    name: "Navgrah Puja",
    hindi: "नवग्रह पूजा",
    icon: "🪐",
    deity: "Navagraha",
    description:
      "Comprehensive puja of all 9 planets with planet-specific grains, colors, and mantras. Neutralizes planetary afflictions and strengthens benefic planetary positions.",
  },
  {
    id: "satyanarayan-katha",
    name: "Satyanarayan Katha",
    hindi: "सत्यनारायण कथा",
    icon: "🙏",
    deity: "Lord Vishnu",
    description:
      "The revered Vishnu narrative puja for family harmony, wish fulfillment, and blessings of truth. Includes full katha recitation with prasad distribution.",
  },
  {
    id: "sundarkand-path",
    name: "Sundarkand Path",
    hindi: "सुंदरकांड पाठ",
    icon: "🕊️",
    deity: "Hanuman Ji & Ram",
    description:
      "Complete recitation of Sundarkand from Ramcharitmanas — the most powerful chapter for removing obstacles, fulfilling prayers, and invoking divine intervention.",
  },
  {
    id: "bhagwat-katha",
    name: "Bhagwat Katha",
    hindi: "भागवत कथा",
    icon: "✨",
    deity: "Lord Krishna / Vishnu",
    description:
      "Seven-day or abbreviated sacred Bhagwat Purana katha for liberation, removal of ancestral debts, and invocation of Krishna's infinite grace and divine love.",
  },
] as const;

// ─── Daan Amount Options ───────────────────────────────────────────────────────

const DAAN_AMOUNTS = [251, 501, 1001, 2001, 5001, 11000];

// ─── Types ─────────────────────────────────────────────────────────────────────

type PujaId = (typeof PUJA_TYPES)[number]["id"];

interface BookingConfirmation {
  bookingId: string;
  pujaName: string;
  pujaHindi: string;
  pujaIcon: string;
  devoteeName: string;
  email: string;
  date: string;
  amount: number;
  sankalp: string;
}

// ─── Confirmation Component ────────────────────────────────────────────────────

function BookingConfirmed({ booking }: { booking: BookingConfirmation }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: "oklch(0.12 0.04 30)" }}
    >
      <div
        className="max-w-xl w-full rounded-2xl border overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.16 0.06 35) 0%, oklch(0.13 0.04 28) 100%)",
          borderColor: "oklch(0.72 0.20 55 / 0.25)",
        }}
        data-ocid="dan-seva.confirmation.card"
      >
        {/* Header */}
        <div
          className="px-6 py-5 text-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.20 48 / 0.15) 0%, oklch(0.72 0.16 55 / 0.08) 100%)",
            borderBottom: "1px solid oklch(0.72 0.20 55 / 0.2)",
          }}
        >
          <div
            className="flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-3"
            style={{
              background: "oklch(0.55 0.18 145 / 0.2)",
              border: "2px solid oklch(0.55 0.18 145 / 0.5)",
            }}
          >
            <CheckCircle
              className="w-8 h-8"
              style={{ color: "oklch(0.65 0.18 145)" }}
            />
          </div>
          <h2
            className="font-heading text-2xl font-bold mb-1"
            style={{ color: "oklch(0.82 0.14 75)" }}
          >
            Booking Confirmed! 🙏
          </h2>
          <p className="text-sm" style={{ color: "oklch(0.68 0.08 60)" }}>
            आपकी पूजा बुकिंग की पुष्टि हो गई है
          </p>
        </div>

        {/* Booking Details */}
        <div className="p-6 space-y-4">
          {/* Booking ID */}
          <div
            className="flex items-center justify-between px-4 py-3 rounded-xl"
            style={{
              background: "oklch(0.20 0.06 30)",
              border: "1px solid oklch(0.30 0.08 28)",
            }}
          >
            <span
              className="text-xs font-heading font-semibold"
              style={{ color: "oklch(0.65 0.08 55)" }}
            >
              BOOKING ID
            </span>
            <span
              className="text-sm font-heading font-bold"
              style={{ color: "oklch(0.80 0.14 75)" }}
            >
              {booking.bookingId}
            </span>
          </div>

          {/* Puja Details */}
          <div
            className="p-4 rounded-xl space-y-3"
            style={{
              background: "oklch(0.18 0.05 30)",
              border: "1px solid oklch(0.28 0.06 28)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{booking.pujaIcon}</span>
              <div>
                <div
                  className="font-heading font-bold"
                  style={{ color: "oklch(0.82 0.14 75)" }}
                >
                  {booking.pujaName}
                </div>
                <div
                  className="text-xs"
                  style={{ color: "oklch(0.62 0.08 55)" }}
                >
                  {booking.pujaHindi}
                </div>
              </div>
            </div>
            <Separator style={{ borderColor: "oklch(0.28 0.06 28)" }} />
            {[
              { label: "Devotee", value: booking.devoteeName, icon: "👤" },
              { label: "Email", value: booking.email, icon: "📧" },
              { label: "Puja Date", value: booking.date, icon: "📅" },
              {
                label: "Daan Amount",
                value: `₹${booking.amount.toLocaleString()}`,
                icon: "💰",
              },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between"
              >
                <span
                  className="text-xs flex items-center gap-1.5"
                  style={{ color: "oklch(0.60 0.06 55)" }}
                >
                  {row.icon} {row.label}
                </span>
                <span
                  className="text-sm font-heading font-semibold"
                  style={{ color: "oklch(0.78 0.10 65)" }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* Sankalp Display */}
          {booking.sankalp && (
            <div
              className="p-4 rounded-xl"
              style={{
                background: "oklch(0.68 0.20 48 / 0.08)",
                border: "1px solid oklch(0.68 0.20 48 / 0.2)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Heart
                  className="w-4 h-4"
                  style={{ color: "oklch(0.72 0.18 48)" }}
                />
                <span
                  className="text-xs font-heading font-semibold"
                  style={{ color: "oklch(0.72 0.18 48)" }}
                >
                  Your Sankalp / Prayer
                </span>
              </div>
              <p
                className="text-sm italic"
                style={{ color: "oklch(0.74 0.08 65)" }}
              >
                "{booking.sankalp}"
              </p>
            </div>
          )}

          {/* Confirmation Message */}
          <div
            className="p-4 rounded-xl text-center"
            style={{
              background: "oklch(0.55 0.18 145 / 0.08)",
              border: "1px solid oklch(0.55 0.18 145 / 0.2)",
            }}
          >
            <Sparkles
              className="w-5 h-5 mx-auto mb-2"
              style={{ color: "oklch(0.65 0.18 145)" }}
            />
            <p
              className="text-sm font-heading font-medium"
              style={{ color: "oklch(0.75 0.10 65)" }}
            >
              Your booking is confirmed. Our pandit will perform the puja on
              your behalf.
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "oklch(0.58 0.06 55)" }}
            >
              A confirmation will be sent to {booking.email}
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Link to="/shop" className="flex-1">
              <Button
                variant="outline"
                className="w-full font-heading text-sm"
                style={{
                  borderColor: "oklch(0.35 0.08 40)",
                  color: "oklch(0.72 0.08 55)",
                }}
              >
                Browse Shop
              </Button>
            </Link>
            <Link to="/puja-booking" className="flex-1">
              <Button
                className="w-full font-heading text-sm font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                  color: "white",
                }}
              >
                Book Another
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function DanSevaPage() {
  const [selectedPuja, setSelectedPuja] = useState<PujaId | "">("");
  const [date, setDate] = useState("");
  const [devoteeName, setDevoteeName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gotra, setGotra] = useState("");
  const [city, setCity] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [sankalp, setSankalp] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(
    null,
  );

  const effectiveAmount =
    selectedAmount ?? (customAmount ? Number(customAmount) : 0);
  const selectedPujaData = PUJA_TYPES.find((p) => p.id === selectedPuja);

  function generateBookingId() {
    const ts = Date.now().toString(36).toUpperCase();
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `DS-${ts}-${rand}`;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedPuja) {
      toast.error("Please select a Puja type");
      return;
    }
    if (!date) {
      toast.error("Please select a date");
      return;
    }
    if (!devoteeName.trim()) {
      toast.error("Please enter devotee name");
      return;
    }
    if (!email.trim()) {
      toast.error("Please enter email");
      return;
    }
    if (!phone.trim()) {
      toast.error("Please enter phone number");
      return;
    }
    if (effectiveAmount < 51) {
      toast.error("Please select or enter a valid Daan amount (minimum ₹51)");
      return;
    }

    setIsProcessing(true);

    // Simulate Stripe payment + booking confirmation
    setTimeout(() => {
      setIsProcessing(false);
      setConfirmation({
        bookingId: generateBookingId(),
        pujaName: selectedPujaData!.name,
        pujaHindi: selectedPujaData!.hindi,
        pujaIcon: selectedPujaData!.icon,
        devoteeName,
        email,
        date: new Date(date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        amount: effectiveAmount,
        sankalp,
      });
      toast.success("Puja Booking Confirmed! 🙏");
    }, 2000);
  }

  if (confirmation) return <BookingConfirmed booking={confirmation} />;

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.12 0.04 30)" }}>
      {/* Hero */}
      <div
        className="py-10 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.10 42 / 0.9) 0%, oklch(0.14 0.06 30) 100%)",
          borderBottom: "1px solid oklch(0.30 0.08 40 / 0.4)",
        }}
      >
        <div className="text-5xl mb-3">🙏</div>
        <h1
          className="font-heading text-3xl md:text-4xl font-bold mb-2"
          style={{ color: "oklch(0.88 0.14 75)" }}
        >
          Dan Seva & Chadava
        </h1>
        <p
          className="font-heading text-lg mb-1"
          style={{ color: "oklch(0.72 0.12 55)" }}
        >
          दान सेवा और चढावा
        </p>
        <p
          className="text-sm max-w-lg mx-auto"
          style={{ color: "oklch(0.62 0.06 55)" }}
        >
          Book a sacred puja performed on your behalf with a personalized
          Sankalp — your heartfelt prayer offered to the divine.
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-5">
          {[
            { icon: "🕉️", label: "Vedic Ritual" },
            { icon: "🧑‍⚕️", label: "Expert Pandits" },
            { icon: "🔒", label: "Secure Payment" },
            { icon: "📜", label: "Personalized Sankalp" },
          ].map((b) => (
            <div
              key={b.label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-heading font-semibold"
              style={{
                background: "oklch(0.68 0.20 48 / 0.12)",
                border: "1px solid oklch(0.68 0.20 48 / 0.25)",
                color: "oklch(0.78 0.14 60)",
              }}
            >
              <span>{b.icon}</span>
              {b.label}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Select Puja */}
          <div
            className="rounded-2xl border overflow-hidden"
            style={{
              background: "oklch(0.16 0.05 30)",
              borderColor: "oklch(0.28 0.08 35 / 0.6)",
            }}
          >
            <div
              className="px-5 py-4 flex items-center gap-3"
              style={{
                background: "oklch(0.68 0.20 48 / 0.08)",
                borderBottom: "1px solid oklch(0.28 0.08 35 / 0.4)",
              }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-heading font-bold"
                style={{ background: "oklch(0.68 0.20 48)", color: "white" }}
              >
                1
              </div>
              <h2
                className="font-heading font-bold"
                style={{ color: "oklch(0.82 0.14 72)" }}
              >
                Select Puja Type
              </h2>
            </div>

            <div className="p-5 space-y-3">
              {/* Puja Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PUJA_TYPES.map((puja) => (
                  <button
                    type="button"
                    key={puja.id}
                    onClick={() => setSelectedPuja(puja.id)}
                    className="flex items-start gap-3 p-3 rounded-xl border text-left transition-all hover:scale-[1.01]"
                    style={{
                      background:
                        selectedPuja === puja.id
                          ? "oklch(0.68 0.20 48 / 0.12)"
                          : "oklch(0.14 0.04 28)",
                      borderColor:
                        selectedPuja === puja.id
                          ? "oklch(0.68 0.20 48 / 0.5)"
                          : "oklch(0.26 0.06 30)",
                    }}
                    data-ocid={`dan-seva.puja_type.${puja.id}`}
                  >
                    <span className="text-2xl shrink-0">{puja.icon}</span>
                    <div className="min-w-0">
                      <div
                        className="text-sm font-heading font-semibold"
                        style={{
                          color:
                            selectedPuja === puja.id
                              ? "oklch(0.82 0.16 62)"
                              : "oklch(0.78 0.08 60)",
                        }}
                      >
                        {puja.name}
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: "oklch(0.55 0.06 50)" }}
                      >
                        {puja.hindi} · {puja.deity}
                      </div>
                    </div>
                    {selectedPuja === puja.id && (
                      <CheckCircle
                        className="w-4 h-4 shrink-0 ml-auto mt-0.5"
                        style={{ color: "oklch(0.68 0.20 48)" }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Selected Puja Description */}
              {selectedPujaData && (
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: "oklch(0.68 0.20 48 / 0.06)",
                    border: "1px solid oklch(0.68 0.20 48 / 0.15)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{selectedPujaData.icon}</span>
                    <span
                      className="text-sm font-heading font-bold"
                      style={{ color: "oklch(0.80 0.14 70)" }}
                    >
                      {selectedPujaData.name}
                    </span>
                  </div>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "oklch(0.66 0.06 55)" }}
                  >
                    {selectedPujaData.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Step 2: Booking Details */}
          <div
            className="rounded-2xl border overflow-hidden"
            style={{
              background: "oklch(0.16 0.05 30)",
              borderColor: "oklch(0.28 0.08 35 / 0.6)",
            }}
          >
            <div
              className="px-5 py-4 flex items-center gap-3"
              style={{
                background: "oklch(0.68 0.20 48 / 0.08)",
                borderBottom: "1px solid oklch(0.28 0.08 35 / 0.4)",
              }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-heading font-bold"
                style={{ background: "oklch(0.68 0.20 48)", color: "white" }}
              >
                2
              </div>
              <h2
                className="font-heading font-bold"
                style={{ color: "oklch(0.82 0.14 72)" }}
              >
                Devotee Details
              </h2>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Date */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="puja-date"
                    className="text-xs font-heading font-semibold"
                    style={{ color: "oklch(0.70 0.08 60)" }}
                  >
                    <Calendar className="w-3 h-3 inline mr-1" />
                    Puja Date *
                  </Label>
                  <Input
                    id="puja-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="font-body text-sm"
                    style={{
                      background: "oklch(0.14 0.04 28)",
                      borderColor: "oklch(0.30 0.06 32)",
                      color: "oklch(0.80 0.06 60)",
                    }}
                    data-ocid="dan-seva.date_input"
                  />
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="devotee-name"
                    className="text-xs font-heading font-semibold"
                    style={{ color: "oklch(0.70 0.08 60)" }}
                  >
                    Devotee Name *
                  </Label>
                  <Input
                    id="devotee-name"
                    type="text"
                    placeholder="Your full name"
                    value={devoteeName}
                    onChange={(e) => setDevoteeName(e.target.value)}
                    className="font-body text-sm"
                    style={{
                      background: "oklch(0.14 0.04 28)",
                      borderColor: "oklch(0.30 0.06 32)",
                      color: "oklch(0.80 0.06 60)",
                    }}
                    data-ocid="dan-seva.name_input"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="email"
                    className="text-xs font-heading font-semibold"
                    style={{ color: "oklch(0.70 0.08 60)" }}
                  >
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="font-body text-sm"
                    style={{
                      background: "oklch(0.14 0.04 28)",
                      borderColor: "oklch(0.30 0.06 32)",
                      color: "oklch(0.80 0.06 60)",
                    }}
                    data-ocid="dan-seva.email_input"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="phone"
                    className="text-xs font-heading font-semibold"
                    style={{ color: "oklch(0.70 0.08 60)" }}
                  >
                    Phone *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="font-body text-sm"
                    style={{
                      background: "oklch(0.14 0.04 28)",
                      borderColor: "oklch(0.30 0.06 32)",
                      color: "oklch(0.80 0.06 60)",
                    }}
                    data-ocid="dan-seva.phone_input"
                  />
                </div>

                {/* Gotra */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="gotra"
                    className="text-xs font-heading font-semibold"
                    style={{ color: "oklch(0.70 0.08 60)" }}
                  >
                    Gotra (Optional)
                  </Label>
                  <Input
                    id="gotra"
                    type="text"
                    placeholder="e.g., Kashyap, Bharadwaj…"
                    value={gotra}
                    onChange={(e) => setGotra(e.target.value)}
                    className="font-body text-sm"
                    style={{
                      background: "oklch(0.14 0.04 28)",
                      borderColor: "oklch(0.30 0.06 32)",
                      color: "oklch(0.80 0.06 60)",
                    }}
                    data-ocid="dan-seva.gotra_input"
                  />
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="city"
                    className="text-xs font-heading font-semibold"
                    style={{ color: "oklch(0.70 0.08 60)" }}
                  >
                    City (Optional)
                  </Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="Your city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="font-body text-sm"
                    style={{
                      background: "oklch(0.14 0.04 28)",
                      borderColor: "oklch(0.30 0.06 32)",
                      color: "oklch(0.80 0.06 60)",
                    }}
                    data-ocid="dan-seva.city_input"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Sankalp */}
          <div
            className="rounded-2xl border overflow-hidden"
            style={{
              background: "oklch(0.16 0.05 30)",
              borderColor: "oklch(0.28 0.08 35 / 0.6)",
            }}
          >
            <div
              className="px-5 py-4 flex items-center gap-3"
              style={{
                background: "oklch(0.68 0.20 48 / 0.08)",
                borderBottom: "1px solid oklch(0.28 0.08 35 / 0.4)",
              }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-heading font-bold"
                style={{ background: "oklch(0.68 0.20 48)", color: "white" }}
              >
                3
              </div>
              <div>
                <h2
                  className="font-heading font-bold"
                  style={{ color: "oklch(0.82 0.14 72)" }}
                >
                  Your Sankalp
                </h2>
                <p className="text-xs" style={{ color: "oklch(0.58 0.06 52)" }}>
                  संकल्प — Personalized prayer / wish for the puja
                </p>
              </div>
            </div>
            <div className="p-5">
              <Textarea
                placeholder="Share your prayer or wish for the puja — e.g., 'May my family be blessed with good health and harmony. May all obstacles in my business be removed. May divine grace guide our children's future.'"
                value={sankalp}
                onChange={(e) => setSankalp(e.target.value)}
                rows={4}
                className="font-body text-sm resize-none"
                style={{
                  background: "oklch(0.14 0.04 28)",
                  borderColor: "oklch(0.30 0.06 32)",
                  color: "oklch(0.80 0.06 60)",
                }}
                data-ocid="dan-seva.sankalp_textarea"
              />
              <p
                className="text-xs mt-2"
                style={{ color: "oklch(0.52 0.05 50)" }}
              >
                Your Sankalp will be recited by the pandit during the puja,
                making it personally dedicated to your wish.
              </p>
            </div>
          </div>

          {/* Step 4: Daan Amount */}
          <div
            className="rounded-2xl border overflow-hidden"
            style={{
              background: "oklch(0.16 0.05 30)",
              borderColor: "oklch(0.28 0.08 35 / 0.6)",
            }}
          >
            <div
              className="px-5 py-4 flex items-center gap-3"
              style={{
                background: "oklch(0.68 0.20 48 / 0.08)",
                borderBottom: "1px solid oklch(0.28 0.08 35 / 0.4)",
              }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-heading font-bold"
                style={{ background: "oklch(0.68 0.20 48)", color: "white" }}
              >
                4
              </div>
              <div>
                <h2
                  className="font-heading font-bold"
                  style={{ color: "oklch(0.82 0.14 72)" }}
                >
                  Daan / Chadava Amount
                </h2>
                <p className="text-xs" style={{ color: "oklch(0.58 0.06 52)" }}>
                  दान राशि — Sacred offering for the puja
                </p>
              </div>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
                {DAAN_AMOUNTS.map((amt) => (
                  <button
                    type="button"
                    key={amt}
                    onClick={() => {
                      setSelectedAmount(amt);
                      setCustomAmount("");
                    }}
                    className="px-3 py-2.5 rounded-xl text-sm font-heading font-bold transition-all hover:scale-105"
                    style={{
                      background:
                        selectedAmount === amt
                          ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                          : "oklch(0.14 0.04 28)",
                      color:
                        selectedAmount === amt
                          ? "white"
                          : "oklch(0.75 0.10 60)",
                      border: `1px solid ${selectedAmount === amt ? "transparent" : "oklch(0.28 0.06 30)"}`,
                    }}
                    data-ocid={`dan-seva.amount_button.${amt}`}
                  >
                    ₹{amt >= 1000 ? `${amt / 1000}k` : amt}
                    {amt === 1001 && (
                      <div className="text-xs font-normal opacity-80">
                        Popular
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="space-y-1.5">
                <Label
                  className="text-xs font-heading font-semibold"
                  style={{ color: "oklch(0.70 0.08 60)" }}
                >
                  Custom Amount
                </Label>
                <div className="flex items-center gap-2">
                  <span
                    className="text-sm font-heading font-bold"
                    style={{ color: "oklch(0.72 0.14 55)" }}
                  >
                    ₹
                  </span>
                  <Input
                    type="number"
                    placeholder="Enter amount (min ₹51)"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    min={51}
                    className="font-body text-sm"
                    style={{
                      background: "oklch(0.14 0.04 28)",
                      borderColor: "oklch(0.30 0.06 32)",
                      color: "oklch(0.80 0.06 60)",
                    }}
                    data-ocid="dan-seva.custom_amount_input"
                  />
                </div>
              </div>

              {effectiveAmount > 0 && (
                <div
                  className="mt-3 px-4 py-2 rounded-xl flex items-center justify-between"
                  style={{
                    background: "oklch(0.68 0.20 48 / 0.08)",
                    border: "1px solid oklch(0.68 0.20 48 / 0.2)",
                  }}
                >
                  <span
                    className="text-xs font-heading"
                    style={{ color: "oklch(0.65 0.08 55)" }}
                  >
                    Total Daan Amount
                  </span>
                  <span
                    className="text-lg font-heading font-bold"
                    style={{ color: "oklch(0.72 0.20 52)" }}
                  >
                    ₹{effectiveAmount.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Summary + Submit */}
          <div
            className="rounded-2xl border overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.20 0.08 40 / 0.5) 0%, oklch(0.15 0.05 30) 100%)",
              borderColor: "oklch(0.68 0.20 48 / 0.25)",
            }}
          >
            <div className="p-5 space-y-4">
              {selectedPujaData && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{selectedPujaData.icon}</span>
                    <div>
                      <div
                        className="text-sm font-heading font-semibold"
                        style={{ color: "oklch(0.80 0.12 68)" }}
                      >
                        {selectedPujaData.name}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: "oklch(0.58 0.06 52)" }}
                      >
                        {devoteeName || "Devotee name"} · {date || "Date TBD"}
                      </div>
                    </div>
                  </div>
                  {effectiveAmount > 0 && (
                    <div className="text-right">
                      <div
                        className="text-lg font-heading font-bold"
                        style={{ color: "oklch(0.72 0.20 52)" }}
                      >
                        ₹{effectiveAmount.toLocaleString()}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: "oklch(0.58 0.06 52)" }}
                      >
                        Daan Amount
                      </div>
                    </div>
                  )}
                </div>
              )}

              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full font-heading font-bold text-base py-4"
                style={{
                  background: isProcessing
                    ? "oklch(0.45 0.12 40)"
                    : "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.56 0.18 40))",
                  color: "white",
                  opacity: isProcessing ? 0.8 : 1,
                }}
                data-ocid="dan-seva.submit_button"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin text-base">⏳</span>
                    Processing Payment…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    🙏 Book Puja & Pay
                    {effectiveAmount > 0
                      ? ` ₹${effectiveAmount.toLocaleString()}`
                      : ""}
                    <ChevronRight className="w-4 h-4" />
                  </span>
                )}
              </Button>

              <p
                className="text-center text-xs"
                style={{ color: "oklch(0.52 0.04 50)" }}
              >
                🔒 Secure payment via Stripe. Your Sankalp is sacred and
                confidential.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
