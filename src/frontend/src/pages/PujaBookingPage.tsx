import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import {
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useCreatePujaBooking,
  useGetAllTemples,
  useGetUserPujaBookings,
} from "../hooks/useQueries";

// ─── Puja types with full metadata ───────────────────────────────────────────
const PUJA_CATALOG = [
  {
    id: "rudrabhishek",
    name: "Rudrabhishek",
    hindi: "रुद्राभिषेक",
    deity: "Shiva",
    icon: "🔱",
    duration: "60 min",
    price: 2101,
    benefit: "Cleanse karma, heal illness, invoke Shiva's grace",
  },
  {
    id: "satyanarayan",
    name: "Satyanarayan Katha",
    hindi: "सत्यनारायण कथा",
    deity: "Vishnu",
    icon: "🙏",
    duration: "90 min",
    price: 3101,
    benefit: "Prosperity, wish fulfillment, family harmony",
  },
  {
    id: "navgraha",
    name: "Navgraha Puja",
    hindi: "नवग्रह पूजा",
    deity: "नवग्रह",
    icon: "🪐",
    duration: "90 min",
    price: 3101,
    benefit: "Remove planetary afflictions, Shani/Rahu/Ketu peace",
  },
  {
    id: "ganesh",
    name: "Ganesh Puja",
    hindi: "गणेश पूजा",
    deity: "Ganesh",
    icon: "🐘",
    duration: "45 min",
    price: 1101,
    benefit: "Remove obstacles, bless new beginnings, wisdom",
  },
  {
    id: "durga",
    name: "Durga Puja",
    hindi: "दुर्गा पूजा",
    deity: "Durga",
    icon: "🌺",
    duration: "75 min",
    price: 3101,
    benefit: "Shakti, protection, victory over enemies",
  },
  {
    id: "lakshmi",
    name: "Lakshmi Puja",
    hindi: "लक्ष्मी पूजा",
    deity: "Lakshmi",
    icon: "💰",
    duration: "45 min",
    price: 1101,
    benefit: "Wealth, abundance, auspicious grace",
  },
  {
    id: "hanuman",
    name: "Hanuman Puja",
    hindi: "हनुमान पूजा",
    deity: "Hanuman",
    icon: "🐒",
    duration: "45 min",
    price: 1101,
    benefit: "Courage, protection, remove negative energy",
  },
  {
    id: "kaalsarp",
    name: "Kaal Sarp Dosh Nivaran",
    hindi: "काल सर्प दोष निवारण",
    deity: "Shiva/Nag",
    icon: "🐍",
    duration: "90 min",
    price: 5001,
    benefit: "Remove Kaal Sarp dosha, life obstacles relief",
  },
  {
    id: "grih-pravesh",
    name: "Grih Pravesh",
    hindi: "गृह प्रवेश",
    deity: "Vastu Dev",
    icon: "🏠",
    duration: "90 min",
    price: 5001,
    benefit: "New home blessings, Vastu harmony, prosperity",
  },
  {
    id: "janampatri",
    name: "Janampatri Puja",
    hindi: "जनमपत्री पूजा",
    deity: "ब्रह्मा",
    icon: "📜",
    duration: "60 min",
    price: 1501,
    benefit: "Nullify birth chart doshas, life path clarity",
  },
  {
    id: "pitru-tarpan",
    name: "Pitru Tarpan",
    hindi: "पितृ तर्पण",
    deity: "Pitru Dev",
    icon: "🙏",
    duration: "60 min",
    price: 2101,
    benefit: "Ancestor blessings, Pitru dosha removal, peace",
  },
  {
    id: "mahamrityunjaya",
    name: "Mahamrityunjaya Jaap",
    hindi: "महामृत्युञ्जय जाप",
    deity: "Shiva",
    icon: "🕉️",
    duration: "90 min",
    price: 3101,
    benefit: "Longevity, health, protection from sudden misfortunes",
  },
];

const TEMPLES = [
  {
    id: "kashi-vishwanath",
    name: "Kashi Vishwanath",
    location: "Varanasi, UP",
  },
  { id: "tirupati", name: "Tirupati Balaji", location: "Tirupati, AP" },
  { id: "shirdi", name: "Shirdi Sai Baba", location: "Shirdi, Maharashtra" },
  { id: "vaishno-devi", name: "Vaishno Devi", location: "Katra, J&K" },
  { id: "somnath", name: "Somnath Mandir", location: "Prabhas Patan, Gujarat" },
  { id: "kedarnath", name: "Kedarnath", location: "Rudraprayag, Uttarakhand" },
  {
    id: "siddhivinayak",
    name: "Siddhivinayak",
    location: "Mumbai, Maharashtra",
  },
  { id: "mahakaleshwar", name: "Mahakaleshwar", location: "Ujjain, MP" },
  { id: "kamakhya", name: "Kamakhya Devi", location: "Guwahati, Assam" },
  {
    id: "golden-temple",
    name: "Harmandir Sahib (Golden Temple)",
    location: "Amritsar, Punjab",
  },
];

const TIME_SLOTS = [
  { id: "morning", label: "Morning", time: "6:00 – 8:00 AM", icon: "🌅" },
  {
    id: "mid-morning",
    label: "Mid-Morning",
    time: "8:00 – 10:00 AM",
    icon: "☀️",
  },
  { id: "afternoon", label: "Afternoon", time: "12:00 – 2:00 PM", icon: "🌤️" },
  { id: "evening", label: "Evening", time: "5:00 – 7:00 PM", icon: "🌇" },
];

const DAAN_PRESETS = [251, 501, 1001, 2001];

const AUSPICIOUS_DATES: Record<string, string> = {
  "2026-04-14": "राम नवमी",
  "2026-04-18": "हनुमान जयंती",
  "2026-04-26": "अक्षय तृतीया",
  "2026-05-04": "बुद्ध पूर्णिमा",
  "2026-07-02": "गुरु पूर्णिमा",
  "2026-08-20": "जन्माष्टमी",
  "2026-08-25": "गणेश चतुर्थी",
  "2026-09-28": "शारदीय नवरात्रि",
  "2026-10-10": "दशहरा",
  "2026-10-20": "दीपावली",
};

// ─── Types ─────────────────────────────────────────────────────────────────
interface BookingState {
  pujaId: string;
  templeId: string;
  date: string;
  timeSlot: string;
  devoteeName: string;
  gotra: string;
  phone: string;
  email: string;
  numPeople: number;
  daan: number;
  customDaan: string;
  sankalp: string;
  specialRequests: string;
}

const STEPS = [
  { id: 1, label: "Select Puja", icon: "🛕" },
  { id: 2, label: "Temple & Date", icon: "📅" },
  { id: 3, label: "Devotee Details", icon: "👤" },
  { id: 4, label: "Daan & Sankalp", icon: "🪷" },
  { id: 5, label: "Review & Book", icon: "✅" },
];

// ─── Calendar sub-component ───────────────────────────────────────────────────
function AuspiciousCalendar({
  value,
  onChange,
}: { value: string; onChange: (d: string) => void }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const pad = (n: number) => String(n).padStart(2, "0");
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };

  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "oklch(0.99 0.008 80)",
        border: "1px solid oklch(0.78 0.14 75 / 0.25)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={prevMonth}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft
            className="h-4 w-4"
            style={{ color: "oklch(0.68 0.20 48)" }}
          />
        </button>
        <span
          className="font-heading font-bold text-sm"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          aria-label="Next month"
        >
          <ChevronRight
            className="h-4 w-4"
            style={{ color: "oklch(0.68 0.20 48)" }}
          />
        </button>
      </div>
      <div className="grid grid-cols-7 mb-1">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div
            key={d}
            className="text-center text-xs font-heading font-semibold py-1"
            style={{ color: "oklch(0.55 0.06 50)" }}
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {Array.from({ length: firstDay }).map((_, i) => {
          const key = `${viewYear}-${viewMonth}-spacer-${firstDay}-${i}`;
          return <div key={key} />;
        })}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const dateStr = `${viewYear}-${pad(viewMonth + 1)}-${pad(day)}`;
          const isSelected = value === dateStr;
          const isAuspicious = !!AUSPICIOUS_DATES[dateStr];
          const isPast =
            new Date(dateStr) < new Date(today.toISOString().split("T")[0]);
          return (
            <button
              key={dateStr}
              type="button"
              disabled={isPast}
              onClick={() => !isPast && onChange(dateStr)}
              className="relative aspect-square flex flex-col items-center justify-center rounded-lg text-xs font-body transition-all"
              style={{
                background: isSelected
                  ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                  : isAuspicious
                    ? "oklch(0.68 0.20 48 / 0.12)"
                    : "transparent",
                color: isSelected
                  ? "white"
                  : isPast
                    ? "oklch(0.75 0.02 50)"
                    : isAuspicious
                      ? "oklch(0.40 0.16 40)"
                      : "oklch(0.30 0.06 30)",
                cursor: isPast ? "not-allowed" : "pointer",
                opacity: isPast ? 0.4 : 1,
              }}
              title={isAuspicious ? AUSPICIOUS_DATES[dateStr] : undefined}
            >
              {day}
              {isAuspicious && !isSelected && (
                <span
                  className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: "oklch(0.68 0.20 48)" }}
                />
              )}
            </button>
          );
        })}
      </div>
      {value && AUSPICIOUS_DATES[value] && (
        <div
          className="mt-3 p-2 rounded-lg flex items-center gap-2"
          style={{ background: "oklch(0.68 0.20 48 / 0.1)" }}
        >
          <Star
            className="h-3.5 w-3.5 shrink-0"
            style={{ color: "oklch(0.68 0.20 48)" }}
          />
          <span
            className="text-xs font-heading font-semibold"
            style={{ color: "oklch(0.40 0.16 40)" }}
          >
            {AUSPICIOUS_DATES[value]} — शुभ मुहूर्त
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Step Progress Bar ────────────────────────────────────────────────────────
function StepProgress({ current }: { current: number }) {
  return (
    <div
      className="flex items-center justify-between mb-8"
      data-ocid="puja_booking.step_progress"
    >
      {STEPS.map((step, i) => (
        <div key={step.id} className="flex items-center flex-1">
          <div className="flex flex-col items-center">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-heading font-bold transition-all"
              style={{
                background:
                  step.id <= current
                    ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                    : "oklch(0.88 0.02 50)",
                color: step.id <= current ? "white" : "oklch(0.60 0.04 50)",
                boxShadow:
                  step.id === current
                    ? "0 0 0 3px oklch(0.68 0.20 48 / 0.25)"
                    : "none",
              }}
            >
              {step.id < current ? "✓" : step.icon}
            </div>
            <span
              className="text-xs font-heading font-semibold mt-1 hidden sm:block"
              style={{
                color:
                  step.id <= current
                    ? "oklch(0.45 0.14 40)"
                    : "oklch(0.65 0.04 50)",
              }}
            >
              {step.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className="flex-1 h-0.5 mx-1 mb-5"
              style={{
                background:
                  step.id < current
                    ? "oklch(0.68 0.20 48)"
                    : "oklch(0.85 0.02 50)",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Booking Confirmation ─────────────────────────────────────────────────────
function BookingConfirmed({
  bookingId,
  puja,
  date,
  devoteeName,
  total,
  onReset,
}: {
  bookingId: string;
  puja: (typeof PUJA_CATALOG)[0];
  date: string;
  devoteeName: string;
  total: number;
  onReset: () => void;
}) {
  const handleDownload = () => {
    const lines = [
      "═══════════════════════════════════",
      "       SPIRITUAL CONNECT",
      "    PUJA BOOKING CONFIRMATION",
      "═══════════════════════════════════",
      `Booking ID   : ${bookingId}`,
      `Puja         : ${puja.name} (${puja.hindi})`,
      `Date         : ${date}`,
      `Devotee      : ${devoteeName}`,
      `Total        : ₹${total.toLocaleString("en-IN")}`,
      "───────────────────────────────────",
      "Status: BOOKED ✓",
      "Pandit will call within 24 hours.",
      "═══════════════════════════════════",
    ].join("\n");
    const blob = new Blob([lines], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `puja-${bookingId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const STATUS_STEPS = ["Booked", "Confirmed", "In Progress", "Completed"];
  return (
    <div
      className="max-w-lg mx-auto rounded-2xl overflow-hidden"
      style={{ border: "1px solid oklch(0.68 0.20 48 / 0.3)" }}
      data-ocid="puja_booking.confirmation.panel"
    >
      <div
        className="p-6 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.55 0.16 35))",
        }}
      >
        <CheckCircle className="h-14 w-14 mx-auto mb-3 text-white" />
        <h2 className="font-heading text-2xl font-bold text-white mb-1">
          🙏 पूजा बुकिंग सफल!
        </h2>
        <div className="inline-block px-4 py-1 rounded-full bg-white/20 text-white font-heading font-bold text-sm">
          {bookingId}
        </div>
      </div>
      <div
        className="p-5 space-y-2"
        style={{ background: "oklch(0.99 0.008 80)" }}
      >
        <h3
          className="font-heading font-semibold text-sm mb-3"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          बुकिंग सारांश
        </h3>
        {[
          { label: "पूजा", value: `${puja.icon} ${puja.hindi}` },
          { label: "तिथि", value: date },
          { label: "भक्त", value: devoteeName },
          { label: "कुल राशि", value: `₹${total.toLocaleString("en-IN")}` },
        ].map((row) => (
          <div key={row.label} className="flex items-center gap-3">
            <span
              className="text-xs font-heading font-semibold w-20 shrink-0"
              style={{ color: "oklch(0.55 0.08 45)" }}
            >
              {row.label}
            </span>
            <span
              className="text-sm font-body"
              style={{ color: "oklch(0.25 0.08 25)" }}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>
      <div className="px-5 pb-4" style={{ background: "oklch(0.99 0.008 80)" }}>
        <h3
          className="font-heading font-semibold text-sm mb-3"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          स्टेटस ट्रैकर
        </h3>
        <div className="flex items-center">
          {STATUS_STEPS.map((step, i) => (
            <div key={step} className="flex-1 flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-heading font-bold"
                  style={{
                    background:
                      i === 0
                        ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                        : "oklch(0.88 0.02 50)",
                    color: i === 0 ? "white" : "oklch(0.60 0.04 50)",
                  }}
                >
                  {i === 0 ? "✓" : i + 1}
                </div>
                <span
                  className="text-xs font-body mt-1 text-center"
                  style={{
                    color:
                      i === 0 ? "oklch(0.45 0.14 40)" : "oklch(0.65 0.04 50)",
                    maxWidth: "56px",
                  }}
                >
                  {step}
                </span>
              </div>
              {i < STATUS_STEPS.length - 1 && (
                <div
                  className="flex-1 h-0.5 mx-1 mb-5"
                  style={{ background: "oklch(0.85 0.02 50)" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div
        className="p-5 flex flex-col sm:flex-row gap-3 border-t"
        style={{
          borderColor: "oklch(0.78 0.14 75 / 0.2)",
          background: "oklch(0.99 0.008 80)",
        }}
      >
        <button
          type="button"
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full font-heading font-semibold text-sm border transition-all hover:scale-105"
          style={{
            borderColor: "oklch(0.68 0.20 48 / 0.4)",
            color: "oklch(0.45 0.14 40)",
          }}
          data-ocid="puja_booking.confirmation.download_button"
        >
          <Download className="h-4 w-4" /> Download
        </button>
        <button
          type="button"
          onClick={onReset}
          className="flex-1 py-2.5 rounded-full font-heading font-bold text-sm text-white transition-all hover:scale-105"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
          }}
          data-ocid="puja_booking.confirmation.book_another_button"
        >
          🙏 दूसरी पूजा बुक करें
        </button>
      </div>
      <div
        className="text-center py-3 text-xs font-body"
        style={{
          color: "oklch(0.55 0.06 50)",
          background: "oklch(0.97 0.005 75)",
        }}
      >
        24 घंटे में पंडित जी का call आएगा •{" "}
        <Link
          to="/dashboard"
          className="underline"
          style={{ color: "oklch(0.68 0.20 48)" }}
        >
          Dashboard में track करें
        </Link>
      </div>
    </div>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const isGood = status === "confirmed" || status === "completed";
  const isBad = status === "cancelled";
  return (
    <Badge
      className="text-xs capitalize"
      style={{
        background: isGood
          ? "oklch(0.55 0.18 145 / 0.12)"
          : isBad
            ? "oklch(0.55 0.18 20 / 0.12)"
            : "oklch(0.68 0.20 48 / 0.1)",
        color: isGood
          ? "oklch(0.40 0.14 145)"
          : isBad
            ? "oklch(0.45 0.14 20)"
            : "oklch(0.45 0.14 48)",
        border: `1px solid ${isGood ? "oklch(0.55 0.18 145 / 0.3)" : isBad ? "oklch(0.55 0.18 20 / 0.3)" : "oklch(0.68 0.20 48 / 0.25)"}`,
      }}
    >
      {status}
    </Badge>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PujaBookingPage() {
  const { identity } = useInternetIdentity();
  const { data: backendTemples = [] } = useGetAllTemples();
  const principal = identity?.getPrincipal() ?? null;
  const { data: bookingHistory = [], isLoading: loadingHistory } =
    useGetUserPujaBookings(principal);
  const createBooking = useCreatePujaBooking();

  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState<{
    id: string;
    puja: (typeof PUJA_CATALOG)[0];
    total: number;
  } | null>(null);
  const [booking, setBooking] = useState<BookingState>({
    pujaId: "",
    templeId: "",
    date: "",
    timeSlot: "",
    devoteeName: "",
    gotra: "",
    phone: "",
    email: "",
    numPeople: 1,
    daan: 0,
    customDaan: "",
    sankalp: "",
    specialRequests: "",
  });

  const set = (updates: Partial<BookingState>) =>
    setBooking((prev) => ({ ...prev, ...updates }));

  const selectedPuja = PUJA_CATALOG.find((p) => p.id === booking.pujaId);
  const templeList =
    backendTemples.length > 0
      ? backendTemples.map((t) => ({
          id: t.id,
          name: t.name,
          location: t.location,
        }))
      : TEMPLES;

  const totalDaan =
    booking.daan > 0 ? booking.daan : Number(booking.customDaan) || 0;
  const totalAmount = (selectedPuja?.price ?? 0) + totalDaan;
  const today = new Date().toISOString().split("T")[0];
  const isUpcoming = (date: string) => date >= today;

  const inputClass =
    "w-full px-3 py-2.5 rounded-lg border text-sm font-body focus:outline-none bg-background transition-colors";
  const inputStyle = { borderColor: "oklch(0.78 0.14 75 / 0.3)" };
  const labelClass = "block text-sm font-heading font-semibold mb-1.5";
  const labelStyle = { color: "oklch(0.35 0.12 25)" };

  const canProceed = (() => {
    if (step === 1) return !!booking.pujaId;
    if (step === 2)
      return !!booking.templeId && !!booking.date && !!booking.timeSlot;
    if (step === 3) return !!booking.devoteeName.trim();
    return true;
  })();

  const handleConfirm = async () => {
    if (!identity) {
      toast.error("Please login to book a puja");
      return;
    }
    if (!selectedPuja) return;
    const id = `PB-${Date.now().toString(36).toUpperCase().slice(-8)}`;
    try {
      await createBooking.mutateAsync({
        id,
        userId: identity.getPrincipal(),
        templeId: booking.templeId,
        devoteeName: booking.devoteeName,
        gotra: booking.gotra,
        pujaType: selectedPuja.name,
        preferredDate: booking.date,
        specialWishes: `Time: ${booking.timeSlot} | People: ${booking.numPeople} | Daan: ₹${totalDaan} | Sankalp: ${booking.sankalp}`,
        status: "pending",
        createdAt: BigInt(Date.now()) * BigInt(1_000_000),
      });
      setConfirmed({ id, puja: selectedPuja, total: totalAmount });
      toast.success("🙏 Puja booked successfully!");
    } catch {
      toast.error("Failed to book puja. Please try again.");
    }
  };

  const resetForm = () => {
    setConfirmed(null);
    setStep(1);
    setBooking({
      pujaId: "",
      templeId: "",
      date: "",
      timeSlot: "",
      devoteeName: "",
      gotra: "",
      phone: "",
      email: "",
      numPeople: 1,
      daan: 0,
      customDaan: "",
      sankalp: "",
      specialRequests: "",
    });
  };

  if (confirmed && selectedPuja) {
    return (
      <div className="container mx-auto px-4 py-10 max-w-2xl">
        <BookingConfirmed
          bookingId={confirmed.id}
          puja={confirmed.puja}
          date={booking.date}
          devoteeName={booking.devoteeName}
          total={confirmed.total}
          onReset={resetForm}
        />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(to bottom, oklch(0.97 0.010 75), oklch(0.99 0.004 80))",
      }}
    >
      {/* Hero Banner */}
      <div
        className="relative"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.08 22), oklch(0.18 0.06 18))",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url('/assets/generated/puja-banner.dim_1200x400.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative container mx-auto px-4 py-12 text-center">
          <div className="text-5xl mb-3">🛕</div>
          <h1
            className="font-heading text-3xl md:text-4xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            पूजा बुकिंग
          </h1>
          <p
            className="font-body text-base"
            style={{ color: "oklch(0.75 0.06 65)" }}
          >
            Book Sacred Puja Ceremonies — at major temples across India
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main booking form */}
          <div className="lg:col-span-2">
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{
                background: "oklch(0.99 0.008 80)",
                border: "1px solid oklch(0.78 0.14 75 / 0.25)",
              }}
            >
              <StepProgress current={step} />

              {/* STEP 1 — Select Puja */}
              {step === 1 && (
                <div data-ocid="puja_booking.step1.panel">
                  <h2
                    className="font-heading text-xl font-bold mb-2"
                    style={{ color: "oklch(0.35 0.12 25)" }}
                  >
                    🛕 पूजा चुनें
                  </h2>
                  <p className="font-body text-sm text-muted-foreground mb-5">
                    Select the sacred ceremony you wish to perform
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PUJA_CATALOG.map((puja, idx) => {
                      const isSelected = booking.pujaId === puja.id;
                      return (
                        <button
                          key={puja.id}
                          type="button"
                          onClick={() => set({ pujaId: puja.id })}
                          className="text-left p-4 rounded-xl border-2 transition-all hover:scale-[1.01]"
                          style={{
                            background: isSelected
                              ? "oklch(0.68 0.20 48 / 0.08)"
                              : "oklch(0.99 0.006 78)",
                            borderColor: isSelected
                              ? "oklch(0.68 0.20 48)"
                              : "oklch(0.78 0.14 75 / 0.2)",
                          }}
                          data-ocid={`puja_booking.puja_card.${idx + 1}`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">{puja.icon}</span>
                            <div className="flex-1 min-w-0">
                              <h3
                                className="font-heading font-bold text-sm"
                                style={{ color: "oklch(0.30 0.10 25)" }}
                              >
                                {puja.hindi}
                              </h3>
                              <p className="font-body text-xs text-muted-foreground">
                                {puja.name}
                              </p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <span
                                  className="inline-flex items-center gap-1 text-xs font-heading font-semibold"
                                  style={{ color: "oklch(0.68 0.20 48)" }}
                                >
                                  ₹{puja.price.toLocaleString("en-IN")}
                                </span>
                                <span
                                  className="inline-flex items-center gap-1 text-xs font-body"
                                  style={{ color: "oklch(0.55 0.06 50)" }}
                                >
                                  <Clock className="h-3 w-3" />
                                  {puja.duration}
                                </span>
                              </div>
                              <p
                                className="text-xs font-body mt-1.5 line-clamp-2"
                                style={{ color: "oklch(0.50 0.08 40)" }}
                              >
                                {puja.benefit}
                              </p>
                            </div>
                            {isSelected && (
                              <CheckCircle
                                className="h-4 w-4 shrink-0"
                                style={{ color: "oklch(0.68 0.20 48)" }}
                              />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2 — Temple & Date */}
              {step === 2 && (
                <div className="space-y-6" data-ocid="puja_booking.step2.panel">
                  <div>
                    <h2
                      className="font-heading text-xl font-bold mb-1"
                      style={{ color: "oklch(0.35 0.12 25)" }}
                    >
                      🏛️ मंदिर और तिथि
                    </h2>
                    <p className="font-body text-sm text-muted-foreground mb-5">
                      Choose your temple, date, and preferred time
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="pb-temple"
                      className={labelClass}
                      style={labelStyle}
                    >
                      मंदिर चुनें *
                    </label>
                    <select
                      id="pb-temple"
                      value={booking.templeId}
                      onChange={(e) => set({ templeId: e.target.value })}
                      className={inputClass}
                      style={inputStyle}
                      required
                      data-ocid="puja_booking.temple_select"
                    >
                      <option value="">— मंदिर चुनें —</option>
                      {templeList.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name} — {t.location}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <p className={labelClass} style={labelStyle}>
                      तिथि चुनें * — शुभ मुहूर्त
                    </p>
                    <AuspiciousCalendar
                      value={booking.date}
                      onChange={(d) => set({ date: d })}
                    />
                  </div>
                  <div>
                    <p className={labelClass} style={labelStyle}>
                      समय चुनें *
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => set({ timeSlot: slot.id })}
                          className="p-3 rounded-xl border-2 text-left transition-all"
                          style={{
                            background:
                              booking.timeSlot === slot.id
                                ? "oklch(0.68 0.20 48 / 0.08)"
                                : "transparent",
                            borderColor:
                              booking.timeSlot === slot.id
                                ? "oklch(0.68 0.20 48)"
                                : "oklch(0.78 0.14 75 / 0.2)",
                          }}
                          data-ocid={`puja_booking.time_slot.${slot.id}`}
                        >
                          <span
                            className="font-heading font-bold text-sm block"
                            style={{ color: "oklch(0.30 0.10 25)" }}
                          >
                            {slot.icon} {slot.label}
                          </span>
                          <span
                            className="text-xs font-body"
                            style={{ color: "oklch(0.55 0.06 50)" }}
                          >
                            {slot.time}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 — Devotee Details */}
              {step === 3 && (
                <div className="space-y-5" data-ocid="puja_booking.step3.panel">
                  <div>
                    <h2
                      className="font-heading text-xl font-bold mb-1"
                      style={{ color: "oklch(0.35 0.12 25)" }}
                    >
                      👤 भक्त विवरण
                    </h2>
                    <p className="font-body text-sm text-muted-foreground mb-5">
                      Your details for the puja sankalp
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="pb-devname"
                        className={labelClass}
                        style={labelStyle}
                      >
                        पूरा नाम *
                      </label>
                      <input
                        id="pb-devname"
                        type="text"
                        value={booking.devoteeName}
                        onChange={(e) => set({ devoteeName: e.target.value })}
                        placeholder="जैसे: श्री रामप्रसाद शर्मा"
                        className={inputClass}
                        style={inputStyle}
                        required
                        data-ocid="puja_booking.devotee_name_input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="pb-gotra"
                        className={labelClass}
                        style={labelStyle}
                      >
                        गोत्र (Gotra)
                      </label>
                      <input
                        id="pb-gotra"
                        type="text"
                        value={booking.gotra}
                        onChange={(e) => set({ gotra: e.target.value })}
                        placeholder="जैसे: कश्यप, भारद्वाज"
                        className={inputClass}
                        style={inputStyle}
                        data-ocid="puja_booking.gotra_input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="pb-phone"
                        className={labelClass}
                        style={labelStyle}
                      >
                        मोबाइल नंबर
                      </label>
                      <input
                        id="pb-phone"
                        type="tel"
                        value={booking.phone}
                        onChange={(e) => set({ phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className={inputClass}
                        style={inputStyle}
                        data-ocid="puja_booking.phone_input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="pb-email"
                        className={labelClass}
                        style={labelStyle}
                      >
                        ईमेल (पुष्टि हेतु)
                      </label>
                      <input
                        id="pb-email"
                        type="email"
                        value={booking.email}
                        onChange={(e) => set({ email: e.target.value })}
                        placeholder="name@example.com"
                        className={inputClass}
                        style={inputStyle}
                        data-ocid="puja_booking.email_input"
                      />
                    </div>
                  </div>
                  <div>
                    <p className={labelClass} style={labelStyle}>
                      <Users
                        className="h-4 w-4 inline mr-1"
                        style={{ color: "oklch(0.68 0.20 48)" }}
                      />
                      कितने लोग?
                    </p>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          set({ numPeople: Math.max(1, booking.numPeople - 1) })
                        }
                        className="w-9 h-9 rounded-full border flex items-center justify-center font-heading font-bold text-lg transition-all hover:bg-muted"
                        style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                        data-ocid="puja_booking.people_minus_button"
                      >
                        −
                      </button>
                      <span
                        className="font-heading font-bold text-xl w-8 text-center"
                        style={{ color: "oklch(0.35 0.12 25)" }}
                      >
                        {booking.numPeople}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          set({
                            numPeople: Math.min(20, booking.numPeople + 1),
                          })
                        }
                        className="w-9 h-9 rounded-full border flex items-center justify-center font-heading font-bold text-lg transition-all hover:bg-muted"
                        style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                        data-ocid="puja_booking.people_plus_button"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4 — Daan & Sankalp */}
              {step === 4 && (
                <div className="space-y-6" data-ocid="puja_booking.step4.panel">
                  <div>
                    <h2
                      className="font-heading text-xl font-bold mb-1"
                      style={{ color: "oklch(0.35 0.12 25)" }}
                    >
                      🪷 दान और संकल्प
                    </h2>
                    <p className="font-body text-sm text-muted-foreground mb-5">
                      Optional daan and personal intention for the puja
                    </p>
                  </div>
                  <div
                    className="rounded-2xl p-5"
                    style={{
                      background: "oklch(0.68 0.20 48 / 0.05)",
                      border: "1px solid oklch(0.68 0.20 48 / 0.15)",
                    }}
                  >
                    <h3
                      className="font-heading font-semibold text-sm mb-3"
                      style={{ color: "oklch(0.35 0.12 25)" }}
                    >
                      दान राशि (वैकल्पिक)
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {DAAN_PRESETS.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() =>
                            set({
                              daan: booking.daan === amt ? 0 : amt,
                              customDaan: "",
                            })
                          }
                          className="px-4 py-2 rounded-full text-sm font-heading font-semibold border transition-all"
                          style={{
                            background:
                              booking.daan === amt
                                ? "oklch(0.68 0.20 48)"
                                : "transparent",
                            borderColor:
                              booking.daan === amt
                                ? "oklch(0.68 0.20 48)"
                                : "oklch(0.78 0.14 75 / 0.3)",
                            color:
                              booking.daan === amt
                                ? "white"
                                : "oklch(0.45 0.10 40)",
                          }}
                          data-ocid={`puja_booking.daan_preset.${amt}`}
                        >
                          ₹{amt.toLocaleString("en-IN")}
                        </button>
                      ))}
                      <input
                        type="number"
                        placeholder="Custom ₹"
                        value={booking.customDaan}
                        onChange={(e) =>
                          set({ customDaan: e.target.value, daan: 0 })
                        }
                        className="px-3 py-2 rounded-full text-sm font-body border w-28 focus:outline-none bg-background"
                        style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                        data-ocid="puja_booking.daan_custom_input"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="pb-sankalp"
                      className={labelClass}
                      style={labelStyle}
                    >
                      🕉️ संकल्प — आपकी प्रार्थना और मनोकामना
                    </label>
                    <p
                      className="text-xs font-body mb-2"
                      style={{ color: "oklch(0.55 0.06 50)" }}
                    >
                      आपका संकल्प पूजा के दौरान पंडित जी द्वारा पढ़ा जाएगा
                    </p>
                    <textarea
                      id="pb-sankalp"
                      value={booking.sankalp}
                      onChange={(e) => set({ sankalp: e.target.value })}
                      placeholder="जैसे: परिवार की सुख-समृद्धि, संतान सुख, स्वास्थ्य लाभ, व्यापार में सफलता..."
                      rows={6}
                      className={`${inputClass} resize-none`}
                      style={inputStyle}
                      data-ocid="puja_booking.sankalp_textarea"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="pb-special"
                      className={labelClass}
                      style={labelStyle}
                    >
                      विशेष निवेदन
                    </label>
                    <textarea
                      id="pb-special"
                      value={booking.specialRequests}
                      onChange={(e) => set({ specialRequests: e.target.value })}
                      placeholder="कोई विशेष सामग्री, अनुष्ठान या अन्य निर्देश..."
                      rows={3}
                      className={`${inputClass} resize-none`}
                      style={inputStyle}
                      data-ocid="puja_booking.special_requests_textarea"
                    />
                  </div>
                </div>
              )}

              {/* STEP 5 — Review & Book */}
              {step === 5 && selectedPuja && (
                <div className="space-y-5" data-ocid="puja_booking.step5.panel">
                  <div>
                    <h2
                      className="font-heading text-xl font-bold mb-1"
                      style={{ color: "oklch(0.35 0.12 25)" }}
                    >
                      ✅ समीक्षा और बुकिंग
                    </h2>
                    <p className="font-body text-sm text-muted-foreground mb-5">
                      Review your booking before confirming
                    </p>
                  </div>
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{ border: "1px solid oklch(0.78 0.14 75 / 0.25)" }}
                  >
                    <div
                      className="px-5 py-3"
                      style={{ background: "oklch(0.68 0.20 48 / 0.08)" }}
                    >
                      <h3
                        className="font-heading font-semibold text-sm"
                        style={{ color: "oklch(0.35 0.12 25)" }}
                      >
                        बुकिंग सारांश
                      </h3>
                    </div>
                    <div
                      className="px-5 py-4 space-y-3"
                      style={{ background: "oklch(0.99 0.008 80)" }}
                    >
                      {[
                        {
                          label: "पूजा",
                          value: `${selectedPuja.icon} ${selectedPuja.hindi} (${selectedPuja.name})`,
                        },
                        {
                          label: "मंदिर",
                          value:
                            templeList.find((t) => t.id === booking.templeId)
                              ?.name ?? booking.templeId,
                        },
                        {
                          label: "तिथि",
                          value: `${booking.date}${AUSPICIOUS_DATES[booking.date] ? ` — ${AUSPICIOUS_DATES[booking.date]}` : ""}`,
                        },
                        {
                          label: "समय",
                          value:
                            TIME_SLOTS.find((s) => s.id === booking.timeSlot)
                              ?.label ?? "",
                        },
                        { label: "भक्त", value: booking.devoteeName },
                        booking.gotra
                          ? { label: "गोत्र", value: booking.gotra }
                          : null,
                        { label: "लोग", value: `${booking.numPeople}` },
                        booking.sankalp
                          ? { label: "संकल्प", value: booking.sankalp }
                          : null,
                      ]
                        .filter(Boolean)
                        .map(
                          (row) =>
                            row && (
                              <div
                                key={row.label}
                                className="flex items-start gap-3"
                              >
                                <span
                                  className="text-xs font-heading font-semibold w-20 shrink-0 pt-0.5"
                                  style={{ color: "oklch(0.55 0.08 45)" }}
                                >
                                  {row.label}
                                </span>
                                <span
                                  className="text-sm font-body flex-1 min-w-0"
                                  style={{ color: "oklch(0.25 0.08 25)" }}
                                >
                                  {row.value}
                                </span>
                              </div>
                            ),
                        )}
                    </div>
                    <div
                      className="px-5 py-4 border-t"
                      style={{
                        borderColor: "oklch(0.78 0.14 75 / 0.2)",
                        background: "oklch(0.98 0.006 78)",
                      }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className="font-body text-sm"
                          style={{ color: "oklch(0.45 0.06 45)" }}
                        >
                          पूजा शुल्क
                        </span>
                        <span
                          className="font-heading font-semibold text-sm"
                          style={{ color: "oklch(0.30 0.10 30)" }}
                        >
                          ₹{selectedPuja.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                      {totalDaan > 0 && (
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className="font-body text-sm"
                            style={{ color: "oklch(0.45 0.06 45)" }}
                          >
                            दान
                          </span>
                          <span
                            className="font-heading font-semibold text-sm"
                            style={{ color: "oklch(0.30 0.10 30)" }}
                          >
                            ₹{totalDaan.toLocaleString("en-IN")}
                          </span>
                        </div>
                      )}
                      <div
                        className="flex items-center justify-between pt-2 border-t"
                        style={{ borderColor: "oklch(0.78 0.14 75 / 0.2)" }}
                      >
                        <span
                          className="font-heading font-bold"
                          style={{ color: "oklch(0.35 0.12 25)" }}
                        >
                          कुल राशि
                        </span>
                        <span
                          className="font-heading font-bold text-lg"
                          style={{ color: "oklch(0.45 0.16 40)" }}
                        >
                          ₹{totalAmount.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {!identity && (
                    <div
                      className="p-4 rounded-xl text-center text-sm font-body"
                      style={{
                        background: "oklch(0.68 0.20 48 / 0.08)",
                        color: "oklch(0.45 0.12 40)",
                      }}
                    >
                      🔐 कृपया पूजा बुक करने के लिए login करें
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={handleConfirm}
                    disabled={createBooking.isPending || !identity}
                    className="w-full py-3.5 rounded-full font-heading font-bold text-base tracking-wide transition-all disabled:opacity-50 hover:scale-[1.02]"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                      color: "white",
                    }}
                    data-ocid="puja_booking.confirm_button"
                  >
                    {createBooking.isPending
                      ? "बुकिंग हो रही है..."
                      : "🙏 Confirm Booking"}
                  </button>
                </div>
              )}

              {/* Navigation */}
              <div
                className="flex justify-between mt-8 pt-6 border-t"
                style={{ borderColor: "oklch(0.78 0.14 75 / 0.15)" }}
              >
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-semibold text-sm border transition-all hover:bg-muted"
                    style={{
                      borderColor: "oklch(0.78 0.14 75 / 0.3)",
                      color: "oklch(0.45 0.10 40)",
                    }}
                    data-ocid="puja_booking.prev_button"
                  >
                    <ChevronLeft className="h-4 w-4" /> पिछला
                  </button>
                ) : (
                  <div />
                )}
                {step < 5 && (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s + 1)}
                    disabled={!canProceed}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full font-heading font-bold text-sm text-white transition-all disabled:opacity-40 hover:scale-105"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                    }}
                    data-ocid="puja_booking.next_button"
                  >
                    अगला <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right sidebar — booking history */}
          <aside className="space-y-4">
            <div
              className="rounded-2xl p-5"
              style={{
                background: "oklch(0.99 0.008 80)",
                border: "1px solid oklch(0.78 0.14 75 / 0.25)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Calendar
                  className="h-4 w-4"
                  style={{ color: "oklch(0.68 0.20 48)" }}
                />
                <h3
                  className="font-heading font-bold text-sm"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  मेरी बुकिंग्स
                </h3>
              </div>
              {!identity ? (
                <p className="text-xs font-body text-muted-foreground text-center py-4">
                  Login to see your bookings
                </p>
              ) : loadingHistory ? (
                <div className="space-y-2">
                  <Skeleton className="h-14 rounded-lg" />
                  <Skeleton className="h-14 rounded-lg" />
                </div>
              ) : bookingHistory.length === 0 ? (
                <div
                  className="text-center py-6"
                  data-ocid="puja_booking.history.empty_state"
                >
                  <div className="text-3xl mb-2">🛕</div>
                  <p className="text-xs font-body text-muted-foreground">
                    अभी तक कोई बुकिंग नहीं
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {bookingHistory.slice(0, 5).map((b, i) => {
                    const upcoming = isUpcoming(b.preferredDate);
                    return (
                      <div
                        key={b.id}
                        className="p-3 rounded-xl transition-all"
                        style={{
                          background: upcoming
                            ? "oklch(0.68 0.20 48 / 0.06)"
                            : "oklch(0.97 0.005 75)",
                          border: `1px solid ${upcoming ? "oklch(0.68 0.20 48 / 0.2)" : "oklch(0.88 0.02 50)"}`,
                        }}
                        data-ocid={`puja_booking.history.item.${i + 1}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p
                              className="font-heading font-bold text-xs truncate"
                              style={{ color: "oklch(0.30 0.10 25)" }}
                            >
                              {b.pujaType}
                            </p>
                            <div className="flex items-center gap-1.5 mt-1">
                              <MapPin
                                className="h-2.5 w-2.5 shrink-0"
                                style={{ color: "oklch(0.55 0.08 45)" }}
                              />
                              <p
                                className="text-xs font-body truncate"
                                style={{ color: "oklch(0.55 0.06 50)" }}
                              >
                                {b.templeId}
                              </p>
                            </div>
                            <p
                              className="text-xs font-body mt-0.5"
                              style={{ color: "oklch(0.60 0.04 50)" }}
                            >
                              {b.preferredDate}
                            </p>
                          </div>
                          <StatusBadge status={b.status} />
                        </div>
                        {upcoming && (
                          <div
                            className="mt-1.5 text-xs font-heading font-semibold"
                            style={{ color: "oklch(0.55 0.18 145)" }}
                          >
                            ⬆ Upcoming
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {bookingHistory.length > 5 && (
                    <Link
                      to="/dashboard"
                      className="block text-center text-xs font-heading font-semibold py-2 underline"
                      style={{ color: "oklch(0.68 0.20 48)" }}
                    >
                      सभी देखें ({bookingHistory.length})
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Info card */}
            <div
              className="rounded-2xl p-5"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.22 0.08 22 / 0.06), oklch(0.18 0.06 18 / 0.04))",
                border: "1px solid oklch(0.78 0.14 75 / 0.2)",
              }}
            >
              <h4
                className="font-heading font-bold text-sm mb-3"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                📋 बुकिंग जानकारी
              </h4>
              <ul className="space-y-2">
                {[
                  "बुकिंग के 24 घंटे में पंडित जी आपसे संपर्क करेंगे",
                  "शुभ तिथियों पर विशेष छूट उपलब्ध है",
                  "ऑनलाइन Video Darshan भी उपलब्ध है",
                  "रद्दीकरण 48 घंटे पहले करें",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs font-body"
                    style={{ color: "oklch(0.50 0.08 40)" }}
                  >
                    <span className="text-amber-500 mt-0.5 shrink-0">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
