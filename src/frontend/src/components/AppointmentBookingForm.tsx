import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateConsultationAppointment } from "../hooks/useQueries";

// ─── Service Types ────────────────────────────────────────────────────────────
const SERVICE_TYPES = [
  {
    id: "talk-astrologer",
    icon: "🔭",
    title: "Talk To Astrologer",
    desc: "General Vedic astrology consultation",
  },
  {
    id: "talk-pandits",
    icon: "🙏",
    title: "Talk To Pandits",
    desc: "Traditional Vedic ritual consultation",
  },
  {
    id: "tantra-experts",
    icon: "🕉️",
    title: "Tantra Experts",
    desc: "Tantric spiritual guidance & energy work",
  },
  {
    id: "vastu-experts",
    icon: "🏛️",
    title: "Vastu Experts",
    desc: "Vastu Shastra for home & office",
  },
  {
    id: "horoscope-analysis",
    icon: "♈",
    title: "Horoscope Analysis",
    desc: "Detailed birth chart reading",
  },
  {
    id: "match-making",
    icon: "💞",
    title: "Match Making",
    desc: "Kundali compatibility & marriage matching",
  },
  {
    id: "horoscope-report",
    icon: "📜",
    title: "Horoscope Report",
    desc: "Comprehensive written horoscope report",
  },
  {
    id: "horoscope-rajyoga",
    icon: "👑",
    title: "Horoscope Rajyoga",
    desc: "Raja yoga analysis in your chart",
  },
  {
    id: "numerology-reading",
    icon: "🔢",
    title: "Numerology Reading",
    desc: "Name & number analysis for destiny",
  },
  {
    id: "prashna-kundali",
    icon: "❓",
    title: "Prashna Kundali",
    desc: "Question-based horoscope reading",
  },
  {
    id: "muhurat-selection",
    icon: "📅",
    title: "Muhurat Selection",
    desc: "Auspicious timing for events",
  },
  {
    id: "remedies-solutions",
    icon: "💊",
    title: "Remedies & Solutions",
    desc: "Personalized spiritual remedies",
  },
];

// ─── Problem Categories ───────────────────────────────────────────────────────
const PROBLEM_CATEGORIES = [
  "Health & Well Being",
  "Career & Job",
  "Education",
  "Business & Finance",
  "Loans & Debts",
  "Wealth & Prosperity",
  "Relationship Issues",
  "Marital Problems",
  "Pregnancy & Children",
  "Tantra Remedies",
  "Love & Vashikaran",
  "Enemies & Court Cases",
  "Negative Energies",
  "Vastu Dosha",
  "Kaalsarp Dosha",
  "Pitra Dosha",
  "Manglik Dosha",
  "Critical Life Issues",
];

// ─── Time Slots ───────────────────────────────────────────────────────────────
function generateSlots() {
  const slots: string[] = [];
  for (let h = 9; h < 19; h++) {
    const ampm = h < 12 ? "AM" : "PM";
    const h12 = h <= 12 ? h : h - 12;
    slots.push(`${String(h12).padStart(2, "0")}:00 ${ampm}`);
    slots.push(`${String(h12).padStart(2, "0")}:30 ${ampm}`);
  }
  return slots;
}
const ALL_SLOTS = generateSlots();
const MORNING = ALL_SLOTS.filter((s) => s.includes("AM"));
const AFTERNOON = ALL_SLOTS.filter((s) => {
  const h = Number.parseInt(s.split(":")[0], 10);
  const isPM = s.includes("PM");
  return isPM && h < 4;
});
const EVENING = ALL_SLOTS.filter((s) => {
  const h = Number.parseInt(s.split(":")[0], 10);
  return s.includes("PM") && h >= 4;
});

const DURATIONS = [
  { label: "30 min", value: 30 },
  { label: "60 min", value: 60 },
];

function getMinDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}
function getMaxDate() {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split("T")[0];
}

// ─── Step Indicator ───────────────────────────────────────────────────────────
const STEPS = ["Service Type", "Problem Area", "Date & Time", "Your Details"];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-between mb-8 relative">
      <div
        className="absolute top-4 left-0 right-0 h-0.5"
        style={{ background: "oklch(0.78 0.14 75 / 0.2)" }}
      />
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div
            key={label}
            className="flex flex-col items-center gap-1.5 relative z-10"
            style={{ flex: 1 }}
          >
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-heading font-bold border-2 transition-all"
              style={
                done
                  ? {
                      background: "oklch(0.68 0.20 48)",
                      borderColor: "oklch(0.68 0.20 48)",
                      color: "white",
                    }
                  : active
                    ? {
                        background: "oklch(0.78 0.14 75)",
                        borderColor: "oklch(0.68 0.20 48)",
                        color: "white",
                      }
                    : {
                        background: "var(--background)",
                        borderColor: "oklch(0.78 0.14 75 / 0.4)",
                        color: "oklch(0.55 0.10 60)",
                      }
              }
            >
              {done ? "✓" : i + 1}
            </div>
            <span
              className="text-xs font-heading font-medium text-center hidden sm:block"
              style={{
                color: active ? "oklch(0.55 0.16 48)" : "oklch(0.60 0.08 60)",
              }}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface Props {
  astrologerId?: string;
  astrologerName?: string;
  perMinuteRate?: number;
  onSuccess?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function AppointmentBookingForm({
  astrologerId = "general",
  astrologerName = "Any Available Expert",
  perMinuteRate = 20,
  onSuccess,
}: Props) {
  const { identity } = useInternetIdentity();
  const createAppointment = useCreateConsultationAppointment();

  const [step, setStep] = useState(0);
  const [serviceType, setServiceType] = useState("");
  const [problems, setProblems] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [duration, setDuration] = useState(30);
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    dob: "",
    email: "",
    city: "",
    questions: "",
  });
  const [bookingRef, setBookingRef] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const estimatedCost = perMinuteRate * duration;

  const toggleProblem = (p: string) => {
    setProblems((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p],
    );
  };

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.name || !details.phone || !details.dob || !details.city) {
      toast.error("Please fill all required fields");
      return;
    }
    const ref = `BK-${Date.now()}`;
    const topicStr = `${serviceType} | Problems: ${problems.join(", ")} | Duration: ${duration}min`;
    const specialQ = `Name: ${details.name}, Phone: ${details.phone}, DOB: ${details.dob}, City: ${details.city}, Email: ${details.email || "N/A"}${details.questions ? ` | Questions: ${details.questions}` : ""}`;

    const id = `appt-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    try {
      await createAppointment.mutateAsync({
        id,
        userId:
          identity?.getPrincipal() ??
          (undefined as unknown as ReturnType<
            NonNullable<typeof identity>["getPrincipal"]
          >),
        astrologerId,
        preferredDateTime: `${date} ${timeSlot}`,
        topic: topicStr,
        specialQuestions: specialQ,
        status: "pending",
        notes: "",
        createdAt: BigInt(Date.now()) * BigInt(1_000_000),
      });
      setBookingRef(ref);
      setConfirmed(true);
      toast.success("Consultation booked successfully!");
      onSuccess?.();
    } catch {
      toast.error("Failed to book consultation. Please try again.");
    }
  };

  // ── Confirmation ───────────────────────────────────────────────────────────
  if (confirmed) {
    const selectedService = SERVICE_TYPES.find((s) => s.id === serviceType);
    return (
      <div
        className="rounded-2xl p-6 border"
        style={{
          borderColor: "oklch(0.65 0.16 140 / 0.3)",
          background: "oklch(0.65 0.16 140 / 0.05)",
        }}
      >
        <div className="text-center mb-6">
          <CheckCircle
            className="h-14 w-14 mx-auto mb-3"
            style={{ color: "oklch(0.55 0.18 140)" }}
          />
          <h3
            className="font-heading font-bold text-xl"
            style={{ color: "oklch(0.30 0.12 25)" }}
          >
            Booking Confirmed! 🎉
          </h3>
          <p className="text-sm font-body text-muted-foreground mt-1">
            Your consultation has been successfully scheduled.
          </p>
        </div>
        <div
          className="rounded-xl p-4 space-y-2.5 text-sm font-body mb-5"
          style={{
            background: "oklch(0.78 0.14 75 / 0.08)",
            borderLeft: "3px solid oklch(0.68 0.20 48)",
          }}
        >
          <div className="flex justify-between">
            <span className="text-muted-foreground">Booking Ref</span>
            <span
              className="font-heading font-bold"
              style={{ color: "oklch(0.55 0.16 48)" }}
            >
              {bookingRef}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Service</span>
            <span className="font-semibold">
              {selectedService?.icon} {selectedService?.title}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Problem Areas</span>
            <span className="font-semibold text-right max-w-[60%]">
              {problems.slice(0, 3).join(", ")}
              {problems.length > 3 ? ` +${problems.length - 3} more` : ""}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Astrologer</span>
            <span className="font-semibold">{astrologerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date & Time</span>
            <span className="font-semibold">
              {date} at {timeSlot}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Duration</span>
            <span className="font-semibold">{duration} minutes</span>
          </div>
          <div
            className="flex justify-between border-t pt-2"
            style={{ borderColor: "oklch(0.78 0.14 75 / 0.2)" }}
          >
            <span className="text-muted-foreground">Estimated Cost</span>
            <span
              className="font-heading font-bold text-base"
              style={{ color: "oklch(0.55 0.16 48)" }}
            >
              ₹{estimatedCost}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setConfirmed(false);
            setStep(0);
            setServiceType("");
            setProblems([]);
            setDate("");
            setTimeSlot("");
            setDuration(30);
            setDetails({
              name: "",
              phone: "",
              dob: "",
              email: "",
              city: "",
              questions: "",
            });
          }}
          className="w-full py-3 rounded-full font-heading font-bold text-sm border-2 transition-all"
          style={{
            borderColor: "oklch(0.68 0.20 48)",
            color: "oklch(0.55 0.16 48)",
          }}
        >
          Book Another Consultation
        </button>
      </div>
    );
  }

  return (
    <div>
      <StepIndicator current={step} />

      {/* ── STEP 1: Service Type ────────────────────────────────────────────── */}
      {step === 0 && (
        <div>
          <h3
            className="font-heading font-bold text-base mb-1"
            style={{ color: "oklch(0.30 0.12 25)" }}
          >
            Choose Service Type
          </h3>
          <p className="text-sm font-body text-muted-foreground mb-4">
            Select the type of consultation you need
          </p>
          <div className="grid grid-cols-2 gap-2.5 mb-6">
            {SERVICE_TYPES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setServiceType(s.id)}
                data-ocid={`service-type-${s.id}`}
                className="p-3 rounded-xl border-2 text-left transition-all"
                style={
                  serviceType === s.id
                    ? {
                        borderColor: "oklch(0.68 0.20 48)",
                        background: "oklch(0.68 0.20 48 / 0.1)",
                      }
                    : {
                        borderColor: "oklch(0.78 0.14 75 / 0.3)",
                        background: "transparent",
                      }
                }
              >
                <span className="text-xl block mb-1">{s.icon}</span>
                <span
                  className="block text-xs font-heading font-bold"
                  style={{
                    color:
                      serviceType === s.id
                        ? "oklch(0.50 0.18 45)"
                        : "oklch(0.28 0.10 25)",
                  }}
                >
                  {s.title}
                </span>
                <span className="block text-xs font-body text-muted-foreground mt-0.5 line-clamp-2">
                  {s.desc}
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={!serviceType}
            onClick={next}
            data-ocid="step1-next"
            className="w-full py-3 rounded-full font-heading font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-40"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
            }}
          >
            Continue <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* ── STEP 2: Problem Categories ──────────────────────────────────────── */}
      {step === 1 && (
        <div>
          <h3
            className="font-heading font-bold text-base mb-1"
            style={{ color: "oklch(0.30 0.12 25)" }}
          >
            Select Problem Area(s)
          </h3>
          <p className="text-sm font-body text-muted-foreground mb-4">
            Choose one or more areas you need help with
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {PROBLEM_CATEGORIES.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => toggleProblem(p)}
                data-ocid={`problem-${p
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9-]/g, "")}`}
                className="px-3 py-1.5 rounded-full text-xs font-heading font-semibold border-2 transition-all"
                style={
                  problems.includes(p)
                    ? {
                        borderColor: "oklch(0.68 0.20 48)",
                        background: "oklch(0.68 0.20 48)",
                        color: "white",
                      }
                    : {
                        borderColor: "oklch(0.78 0.14 75 / 0.4)",
                        background: "transparent",
                        color: "oklch(0.40 0.10 30)",
                      }
                }
              >
                {p}
              </button>
            ))}
          </div>
          {problems.length > 0 && (
            <p
              className="text-xs font-body mb-4"
              style={{ color: "oklch(0.55 0.16 48)" }}
            >
              ✓ {problems.length} area{problems.length > 1 ? "s" : ""} selected
            </p>
          )}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={back}
              className="flex-1 py-3 rounded-full font-heading font-bold text-sm border-2 flex items-center justify-center gap-1 transition-all"
              style={{
                borderColor: "oklch(0.68 0.20 48 / 0.5)",
                color: "oklch(0.55 0.16 48)",
              }}
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            <button
              type="button"
              disabled={problems.length === 0}
              onClick={next}
              data-ocid="step2-next"
              className="flex-1 py-3 rounded-full font-heading font-bold text-sm transition-all flex items-center justify-center gap-1 disabled:opacity-40"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                color: "white",
              }}
            >
              Continue <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: Date & Time ─────────────────────────────────────────────── */}
      {step === 2 && (
        <div>
          <h3
            className="font-heading font-bold text-base mb-1"
            style={{ color: "oklch(0.30 0.12 25)" }}
          >
            Pick Date & Time
          </h3>
          {/* Astrologer summary */}
          <div
            className="flex items-center gap-3 p-3 rounded-xl mb-4"
            style={{
              background: "oklch(0.78 0.14 75 / 0.1)",
              border: "1px solid oklch(0.78 0.14 75 / 0.3)",
            }}
          >
            <span className="text-2xl">🧘</span>
            <div className="flex-1 min-w-0">
              <p
                className="text-xs font-heading font-bold truncate"
                style={{ color: "oklch(0.30 0.12 25)" }}
              >
                {astrologerName}
              </p>
              <p className="text-xs font-body text-muted-foreground">
                ₹{perMinuteRate}/min
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Est. Total</p>
              <p
                className="font-heading font-bold text-sm"
                style={{ color: "oklch(0.55 0.16 48)" }}
              >
                ₹{perMinuteRate * duration}
              </p>
            </div>
          </div>
          {/* Date picker */}
          <label
            htmlFor="booking-date"
            className="block text-xs font-heading font-semibold mb-1.5"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            Select Date *
          </label>
          <input
            id="booking-date"
            type="date"
            value={date}
            min={getMinDate()}
            max={getMaxDate()}
            onChange={(e) => setDate(e.target.value)}
            data-ocid="booking-date"
            className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background mb-4"
            style={{ borderColor: "oklch(0.78 0.14 75 / 0.4)" }}
          />
          {/* Duration */}
          <p
            className="block text-xs font-heading font-semibold mb-1.5"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            Session Duration *
          </p>
          <div className="flex gap-2 mb-4">
            {DURATIONS.map((d) => (
              <button
                key={d.value}
                type="button"
                onClick={() => setDuration(d.value)}
                data-ocid={`duration-${d.value}`}
                className="flex-1 py-2 rounded-lg border-2 text-sm font-heading font-bold transition-all"
                style={
                  duration === d.value
                    ? {
                        borderColor: "oklch(0.68 0.20 48)",
                        background: "oklch(0.68 0.20 48)",
                        color: "white",
                      }
                    : {
                        borderColor: "oklch(0.78 0.14 75 / 0.3)",
                        color: "oklch(0.40 0.10 30)",
                      }
                }
              >
                {d.label} — ₹{perMinuteRate * d.value}
              </button>
            ))}
          </div>
          {/* Time slots */}
          {[
            { label: "Morning (9 AM – 12 PM)", slots: MORNING },
            { label: "Afternoon (12 PM – 4 PM)", slots: AFTERNOON },
            { label: "Evening (4 PM – 7 PM)", slots: EVENING },
          ].map(({ label, slots }) => (
            <div key={label} className="mb-3">
              <p className="text-xs font-heading font-semibold mb-1.5 text-muted-foreground">
                {label}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {slots.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setTimeSlot(s)}
                    data-ocid={`timeslot-${s.replace(/[:\s]/g, "-")}`}
                    className="px-2.5 py-1 rounded-lg border text-xs font-heading font-semibold transition-all"
                    style={
                      timeSlot === s
                        ? {
                            borderColor: "oklch(0.68 0.20 48)",
                            background: "oklch(0.68 0.20 48)",
                            color: "white",
                          }
                        : {
                            borderColor: "oklch(0.78 0.14 75 / 0.3)",
                            color: "oklch(0.45 0.10 30)",
                          }
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="flex gap-3 mt-5">
            <button
              type="button"
              onClick={back}
              className="flex-1 py-3 rounded-full font-heading font-bold text-sm border-2 flex items-center justify-center gap-1 transition-all"
              style={{
                borderColor: "oklch(0.68 0.20 48 / 0.5)",
                color: "oklch(0.55 0.16 48)",
              }}
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            <button
              type="button"
              disabled={!date || !timeSlot}
              onClick={next}
              data-ocid="step3-next"
              className="flex-1 py-3 rounded-full font-heading font-bold text-sm transition-all flex items-center justify-center gap-1 disabled:opacity-40"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                color: "white",
              }}
            >
              Continue <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 4: Details & Submit ────────────────────────────────────────── */}
      {step === 3 && (
        <form onSubmit={handleSubmit}>
          <h3
            className="font-heading font-bold text-base mb-1"
            style={{ color: "oklch(0.30 0.12 25)" }}
          >
            Your Details
          </h3>
          <p className="text-sm font-body text-muted-foreground mb-4">
            We'll use this to confirm your booking
          </p>
          {!identity && (
            <div
              className="p-3 rounded-lg text-sm font-body text-center mb-4"
              style={{
                background: "oklch(0.78 0.14 75 / 0.1)",
                color: "oklch(0.55 0.16 60)",
              }}
            >
              ⚠️ Please login to confirm your booking
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            {[
              {
                id: "det-name",
                label: "Full Name *",
                key: "name",
                type: "text",
                placeholder: "Your full name",
                required: true,
              },
              {
                id: "det-phone",
                label: "Phone *",
                key: "phone",
                type: "tel",
                placeholder: "+91 98765 43210",
                required: true,
              },
              {
                id: "det-dob",
                label: "Date of Birth *",
                key: "dob",
                type: "date",
                placeholder: "",
                required: true,
              },
              {
                id: "det-email",
                label: "Email (optional)",
                key: "email",
                type: "email",
                placeholder: "your@email.com",
                required: false,
              },
              {
                id: "det-city",
                label: "City *",
                key: "city",
                type: "text",
                placeholder: "Your city",
                required: true,
              },
            ].map(({ id, label, key, type, placeholder, required }) => (
              <div key={key}>
                <label
                  htmlFor={id}
                  className="block text-xs font-heading font-semibold mb-1"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  {label}
                </label>
                <input
                  id={id}
                  type={type}
                  placeholder={placeholder}
                  required={required}
                  value={details[key as keyof typeof details]}
                  onChange={(e) =>
                    setDetails({ ...details, [key]: e.target.value })
                  }
                  data-ocid={id}
                  className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
                  style={{ borderColor: "oklch(0.78 0.14 75 / 0.4)" }}
                />
              </div>
            ))}
          </div>
          <div>
            <label
              htmlFor="det-questions"
              className="block text-xs font-heading font-semibold mb-1"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              Special Questions / Concerns
            </label>
            <textarea
              id="det-questions"
              rows={3}
              placeholder="Any specific questions or concerns you'd like to address..."
              value={details.questions}
              onChange={(e) =>
                setDetails({ ...details, questions: e.target.value })
              }
              data-ocid="det-questions"
              className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background resize-none"
              style={{ borderColor: "oklch(0.78 0.14 75 / 0.4)" }}
            />
          </div>
          {/* Booking summary */}
          <div
            className="mt-4 p-3 rounded-xl text-xs font-body space-y-1"
            style={{
              background: "oklch(0.78 0.14 75 / 0.08)",
              border: "1px solid oklch(0.78 0.14 75 / 0.2)",
            }}
          >
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service</span>
              <span className="font-semibold">
                {SERVICE_TYPES.find((s) => s.id === serviceType)?.title}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Astrologer</span>
              <span className="font-semibold">{astrologerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">When</span>
              <span className="font-semibold">
                {date} · {timeSlot} · {duration} min
              </span>
            </div>
            <div
              className="flex justify-between font-heading font-bold"
              style={{ color: "oklch(0.55 0.16 48)" }}
            >
              <span>Estimated Total</span>
              <span>₹{estimatedCost}</span>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button
              type="button"
              onClick={back}
              className="flex-shrink-0 px-5 py-3 rounded-full font-heading font-bold text-sm border-2 flex items-center gap-1 transition-all"
              style={{
                borderColor: "oklch(0.68 0.20 48 / 0.5)",
                color: "oklch(0.55 0.16 48)",
              }}
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            <button
              type="submit"
              disabled={createAppointment.isPending || !identity}
              data-ocid="confirm-booking"
              className="flex-1 py-3 rounded-full font-heading font-bold text-sm transition-all disabled:opacity-40"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                color: "white",
              }}
            >
              {createAppointment.isPending
                ? "Booking..."
                : "✨ Confirm Booking"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
