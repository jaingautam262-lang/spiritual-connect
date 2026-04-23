import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Clock, Star, User } from "lucide-react";
import { useState } from "react";
import { createActor } from "../backend";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BookingSearch {
  topic?: string;
}

interface Astrologer {
  id: string;
  name: string;
  specialty: string;
  years: number;
  rating: number;
  ratePerMin: number;
  specializes: string[];
  emoji: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ASTROLOGERS: Astrologer[] = [
  {
    id: "raghavendra",
    name: "Pandit Raghavendra Sharma",
    specialty: "Vedic Astrology",
    years: 22,
    rating: 4.9,
    ratePerMin: 30,
    specializes: ["Birth chart", "Career", "Marriage"],
    emoji: "🔮",
  },
  {
    id: "meena",
    name: "Dr. Meena Krishnamurthy",
    specialty: "Kundali Analysis",
    years: 18,
    rating: 4.8,
    ratePerMin: 25,
    specializes: ["Compatibility", "Navamsa", "Remedies"],
    emoji: "⭐",
  },
  {
    id: "vikas",
    name: "Acharya Vikas Joshi",
    specialty: "Numerology & Vastu",
    years: 15,
    rating: 4.7,
    ratePerMin: 20,
    specializes: ["Name correction", "Property", "Business"],
    emoji: "🏛️",
  },
  {
    id: "suresh",
    name: "Pandit Suresh Patel",
    specialty: "Vastu Consultant",
    years: 20,
    rating: 4.8,
    ratePerMin: 25,
    specializes: ["Home layout", "Office", "New construction"],
    emoji: "🏠",
  },
  {
    id: "priya",
    name: "Dr. Priya Nair",
    specialty: "Gemstone Advisor",
    years: 12,
    rating: 4.9,
    ratePerMin: 35,
    specializes: ["Planetary gems", "Chakra healing", "Doshas"],
    emoji: "💎",
  },
];

// ─── Actor hook ───────────────────────────────────────────────────────────────

function useActorDirect() {
  const result = useActor(createActor);
  return {
    actor: result.actor as unknown as {
      createBookingRequest: (
        fullName: string,
        email: string,
        phone: string,
        birthDate: string,
        birthTime: string,
        birthLocation: string,
        preferredDateTime: string,
        consultationMode: string,
        topic: string,
        specialQuestions: string,
      ) => Promise<string>;
    } | null,
    isFetching: result.isFetching,
  };
}

// ─── Astrologer Card ──────────────────────────────────────────────────────────

function AstrologerCard({
  astrologer,
  selected,
  onSelect,
}: {
  astrologer: Astrologer;
  selected: boolean;
  onSelect: (a: Astrologer) => void;
}) {
  return (
    <button
      type="button"
      data-ocid={`booking.astrologer.item.${astrologer.id}`}
      onClick={() => onSelect(astrologer)}
      className="text-left rounded-2xl border-2 p-4 transition-all duration-200 hover:shadow-md w-full"
      style={{
        borderColor: selected ? "oklch(0.62 0.18 48)" : "oklch(0.85 0.04 70)",
        background: selected ? "oklch(0.62 0.18 48 / 0.06)" : "var(--card)",
        boxShadow: selected
          ? "0 0 0 3px oklch(0.62 0.18 48 / 0.18)"
          : undefined,
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: "oklch(0.78 0.14 75 / 0.12)" }}
        >
          {astrologer.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <p className="font-body font-semibold text-foreground text-sm leading-tight">
              {astrologer.name}
            </p>
            {selected && (
              <CheckCircle2
                className="w-4 h-4 flex-shrink-0"
                style={{ color: "oklch(0.62 0.18 48)" }}
              />
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {astrologer.specialty}
          </p>
          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
            <span className="flex items-center gap-1 text-xs">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-foreground">
                {astrologer.rating}
              </span>
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {astrologer.years} yrs
            </span>
            <span
              className="text-xs font-bold"
              style={{ color: "oklch(0.62 0.18 48)" }}
            >
              ₹{astrologer.ratePerMin}/min
            </span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {astrologer.specializes.map((s) => (
              <span
                key={s}
                className="text-[10px] px-1.5 py-0.5 rounded-full font-body"
                style={{
                  background: "oklch(0.78 0.14 75 / 0.12)",
                  color: "oklch(0.45 0.12 38)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function AstrologerBookingPage() {
  const rawSearch = (useSearch({ strict: false }) ?? {}) as BookingSearch;
  const prefillTopic = rawSearch.topic
    ? decodeURIComponent(rawSearch.topic)
    : "";

  const navigate = useNavigate();
  const { actor, isFetching: actorLoading } = useActorDirect();

  const [selectedAstrologer, setSelectedAstrologer] =
    useState<Astrologer | null>(null);
  const [mode, setMode] = useState<"Call" | "Chat" | "Video">("Call");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    birthDate: "",
    birthTime: "",
    birthLocation: "",
    preferredDateTime: "",
    topic: prefillTopic,
    specialQuestions: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelect = (a: Astrologer) => {
    setSelectedAstrologer((prev) => (prev?.id === a.id ? null : a));
  };

  const update = (field: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !form.fullName ||
      !form.email ||
      !form.phone ||
      !form.birthDate ||
      !form.birthLocation ||
      !form.preferredDateTime ||
      !form.topic
    ) {
      setError("Please fill all required fields marked with *");
      return;
    }

    if (!actor) {
      setError("Connection not ready. Please wait a moment and try again.");
      return;
    }

    setSubmitting(true);
    try {
      const topicWithAstrologer = selectedAstrologer
        ? `${form.topic} [Requested astrologer: ${selectedAstrologer.name}]`
        : form.topic;

      const refId = await actor.createBookingRequest(
        form.fullName,
        form.email,
        form.phone,
        form.birthDate,
        form.birthTime || "",
        form.birthLocation,
        form.preferredDateTime,
        mode,
        topicWithAstrologer,
        form.specialQuestions || "",
      );

      navigate({
        to: "/booking-confirmation",
        search: { ref: refId },
      });
    } catch (err) {
      console.error("Booking error:", err);
      setError("Something went wrong. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ── Header band ──────────────────────────────────────────────────────── */}
      <div
        className="w-full py-10 px-4 text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.08 22), oklch(0.28 0.10 30))",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.78 0.14 75) 0%, transparent 50%), radial-gradient(circle at 80% 50%, oklch(0.68 0.20 48) 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <Link
            to="/astrologer"
            className="inline-flex items-center gap-1.5 text-sm font-body mb-4 transition-opacity hover:opacity-80"
            style={{ color: "oklch(0.78 0.14 75 / 0.8)" }}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Astrologers
          </Link>
          <h1
            className="font-decorative text-3xl md:text-4xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🙏 Consult an Astrologer
          </h1>
          <p
            className="font-body text-base"
            style={{ color: "oklch(0.82 0.06 60)" }}
          >
            Get personalized guidance from our expert Vedic astrologers
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-3xl">
        {/* ── Choose Astrologer ─────────────────────────────────────────────── */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <User
              className="w-5 h-5"
              style={{ color: "oklch(0.62 0.18 48)" }}
            />
            <h2 className="font-display text-lg font-semibold text-foreground">
              Choose Your Astrologer
            </h2>
            <span className="text-xs text-muted-foreground">(optional)</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {ASTROLOGERS.map((a) => (
              <AstrologerCard
                key={a.id}
                astrologer={a}
                selected={selectedAstrologer?.id === a.id}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </section>

        {/* ── Booking Form ──────────────────────────────────────────────────── */}
        <div
          className="rounded-2xl border shadow-sm overflow-hidden"
          style={{ borderColor: "oklch(0.78 0.14 75 / 0.2)" }}
        >
          <div
            className="px-6 py-4 border-b"
            style={{
              background: "oklch(0.62 0.18 48 / 0.06)",
              borderColor: "oklch(0.78 0.14 75 / 0.2)",
            }}
          >
            <h2 className="font-display text-lg font-semibold text-foreground">
              Your Consultation Details
            </h2>
            <p className="text-sm text-muted-foreground font-body mt-0.5">
              {selectedAstrologer
                ? `Booking with ${selectedAstrologer.name} · ₹${selectedAstrologer.ratePerMin}/min`
                : "Fill in your details for a personalized session"}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-card p-6 space-y-5"
            data-ocid="booking.form"
          >
            {/* Row 1: Full Name + Email */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="fullName" className="font-body text-sm">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="fullName"
                  data-ocid="booking.fullname.input"
                  placeholder="Rahul Sharma"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="font-body text-sm">
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  data-ocid="booking.email.input"
                  placeholder="rahul@example.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Row 2: Phone + Birth Date */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="phone" className="font-body text-sm">
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  data-ocid="booking.phone.input"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="birthDate" className="font-body text-sm">
                  Birth Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  data-ocid="booking.birthdate.input"
                  value={form.birthDate}
                  onChange={(e) => update("birthDate", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Row 3: Birth Time + Birth Location */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="birthTime" className="font-body text-sm">
                  Birth Time{" "}
                  <span className="text-muted-foreground text-xs font-normal">
                    (optional)
                  </span>
                </Label>
                <Input
                  id="birthTime"
                  type="time"
                  data-ocid="booking.birthtime.input"
                  value={form.birthTime}
                  onChange={(e) => update("birthTime", e.target.value)}
                />
                <p className="text-[11px] text-muted-foreground font-body">
                  Leave blank if unknown — we'll use sunrise chart
                </p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="birthLocation" className="font-body text-sm">
                  Birth Location (City){" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="birthLocation"
                  data-ocid="booking.birthlocation.input"
                  placeholder="e.g. Mumbai, Maharashtra"
                  value={form.birthLocation}
                  onChange={(e) => update("birthLocation", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Consultation Mode */}
            <div className="space-y-2">
              <Label className="font-body text-sm">
                Preferred Consultation Mode{" "}
                <span className="text-destructive">*</span>
              </Label>
              <div className="flex gap-3 flex-wrap">
                {(["Call", "Chat", "Video"] as const).map((m) => (
                  <button
                    type="button"
                    key={m}
                    data-ocid={`booking.mode.${m.toLowerCase()}`}
                    onClick={() => setMode(m)}
                    className="px-4 py-2 rounded-lg border-2 text-sm font-body font-medium transition-all duration-150"
                    style={{
                      borderColor:
                        mode === m
                          ? "oklch(0.62 0.18 48)"
                          : "oklch(0.85 0.04 70)",
                      background:
                        mode === m
                          ? "oklch(0.62 0.18 48 / 0.08)"
                          : "var(--card)",
                      color:
                        mode === m
                          ? "oklch(0.45 0.14 38)"
                          : "var(--muted-foreground)",
                    }}
                  >
                    {m === "Call" ? "📞" : m === "Chat" ? "💬" : "📹"} {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred Date & Time */}
            <div className="space-y-1.5">
              <Label htmlFor="preferredDateTime" className="font-body text-sm">
                Preferred Date & Time{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="preferredDateTime"
                type="datetime-local"
                data-ocid="booking.preferred-datetime.input"
                value={form.preferredDateTime}
                onChange={(e) => update("preferredDateTime", e.target.value)}
                required
              />
            </div>

            {/* Topic */}
            <div className="space-y-1.5">
              <Label htmlFor="topic" className="font-body text-sm">
                Topic / What's on your mind{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="topic"
                data-ocid="booking.topic.textarea"
                placeholder="Describe what you'd like guidance on — career, marriage, health, gemstones, etc."
                value={form.topic}
                onChange={(e) => update("topic", e.target.value)}
                rows={3}
                required
              />
            </div>

            {/* Special Questions */}
            <div className="space-y-1.5">
              <Label htmlFor="specialQuestions" className="font-body text-sm">
                Special Questions{" "}
                <span className="text-muted-foreground text-xs font-normal">
                  (optional)
                </span>
              </Label>
              <Textarea
                id="specialQuestions"
                data-ocid="booking.questions.textarea"
                placeholder="Any specific questions you'd like the astrologer to address..."
                value={form.specialQuestions}
                onChange={(e) => update("specialQuestions", e.target.value)}
                rows={2}
              />
            </div>

            {/* Error */}
            {error && (
              <div
                data-ocid="booking.error_state"
                className="rounded-lg px-4 py-3 text-sm font-body border"
                style={{
                  background: "oklch(0.95 0.03 25)",
                  color: "oklch(0.45 0.18 25)",
                  borderColor: "oklch(0.75 0.12 25)",
                }}
              >
                ⚠️ {error}
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              data-ocid="booking.submit_button"
              disabled={submitting || actorLoading}
              className="w-full h-11 text-base font-semibold font-body transition-all duration-200"
              style={{
                background: "oklch(0.62 0.18 48)",
                color: "white",
              }}
            >
              {submitting ? (
                <span
                  data-ocid="booking.loading_state"
                  className="flex items-center gap-2"
                >
                  <span className="animate-spin rounded-full w-4 h-4 border-2 border-white border-t-transparent" />
                  Submitting...
                </span>
              ) : (
                "📅 Book Consultation"
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground font-body">
              No login required · We'll contact you within 24 hours to confirm
            </p>
          </form>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          {[
            { icon: "🛡️", label: "Verified Experts" },
            { icon: "🔒", label: "Secure Booking" },
            { icon: "⭐", label: "4.8+ Rated" },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="rounded-xl py-3 text-center"
              style={{
                background: "oklch(0.78 0.14 75 / 0.07)",
                border: "1px solid oklch(0.78 0.14 75 / 0.2)",
              }}
            >
              <span className="text-xl block mb-1">{icon}</span>
              <span
                className="text-xs font-heading font-semibold"
                style={{ color: "oklch(0.45 0.12 30)" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
