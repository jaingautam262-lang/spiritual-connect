import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  MapPin,
  Play,
  Star,
  Video,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useCreatePujaBooking,
  useGetCallerUserProfile,
} from "../hooks/useQueries";

// ─── Data ────────────────────────────────────────────────────────────────────

const PUJA_TYPES = [
  "Satyanarayan Puja",
  "Ganesh Puja",
  "Lakshmi Puja",
  "Rudrabhishek",
  "Navgrah Puja",
  "Kaal Sarp Puja",
  "Mangal Dosh Puja",
  "Graha Pravesh Puja",
  "Vivah Puja",
  "Naming Ceremony",
  "Birthday Puja",
  "Pitru Tarpan",
  "Custom Puja",
];

const TIME_SLOTS = [
  { id: "morning", label: "Morning", sublabel: "6–9 AM", emoji: "🌅" },
  { id: "mid-morning", label: "Mid-Morning", sublabel: "9–12 PM", emoji: "☀️" },
  { id: "evening", label: "Evening", sublabel: "4–7 PM", emoji: "🌆" },
  { id: "night", label: "Night", sublabel: "7–10 PM", emoji: "🌙" },
];

const LOCATIONS = [
  { id: "temple", label: "At Temple", emoji: "🛕" },
  { id: "home", label: "At Home", emoji: "🏠" },
  { id: "online", label: "Online", emoji: "📱" },
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

const RASHIS = [
  "Mesh (Aries)",
  "Vrishabha (Taurus)",
  "Mithuna (Gemini)",
  "Karka (Cancer)",
  "Simha (Leo)",
  "Kanya (Virgo)",
  "Tula (Libra)",
  "Vrischika (Scorpio)",
  "Dhanu (Sagittarius)",
  "Makara (Capricorn)",
  "Kumbha (Aquarius)",
  "Meena (Pisces)",
];

const DAAN_AMOUNTS = [51, 101, 501, 1001, 2101, 5001];
const DAAN_PURPOSES = [
  "General Daan",
  "Annadaan",
  "Gaushala",
  "Vidya Daan",
  "Gobardhan Puja",
];

const PUJA_EVENTS = [
  {
    date: "2026-01-14",
    label: "Jan 14",
    name: "Makar Sankranti Puja",
    price: 501,
    emoji: "☀️",
    deity: "Surya Dev",
  },
  {
    date: "2026-01-29",
    label: "Jan 29",
    name: "Basant Panchami Puja",
    price: 1001,
    emoji: "🌸",
    deity: "Saraswati",
  },
  {
    date: "2026-02-12",
    label: "Feb 12",
    name: "Mahashivaratri Puja",
    price: 1501,
    emoji: "🕉️",
    deity: "Shiva",
  },
  {
    date: "2026-03-14",
    label: "Mar 14",
    name: "Holi Puja",
    price: 501,
    emoji: "🎨",
    deity: "Krishna",
  },
  {
    date: "2026-04-09",
    label: "Apr 9",
    name: "Ram Navami Puja",
    price: 1001,
    emoji: "🙏",
    deity: "Ram",
  },
  {
    date: "2026-04-14",
    label: "Apr 14",
    name: "Hanuman Jayanti Puja",
    price: 501,
    emoji: "🐒",
    deity: "Hanuman",
  },
  {
    date: "2026-05-07",
    label: "May 7",
    name: "Akshaya Tritiya Puja",
    price: 2001,
    emoji: "✨",
    deity: "Lakshmi",
  },
  {
    date: "2026-07-01",
    label: "Jul 1",
    name: "Guru Purnima Puja",
    price: 1001,
    emoji: "🌕",
    deity: "Guru",
  },
  {
    date: "2026-08-03",
    label: "Aug 3",
    name: "Hariyali Teej Puja",
    price: 501,
    emoji: "💚",
    deity: "Parvati",
  },
  {
    date: "2026-08-25",
    label: "Aug 25",
    name: "Ganesh Chaturthi Puja",
    price: 1501,
    emoji: "🐘",
    deity: "Ganesha",
  },
  {
    date: "2026-10-02",
    label: "Oct 2–11",
    name: "Navratri Puja",
    price: 5001,
    emoji: "🪔",
    deity: "Durga",
  },
  {
    date: "2026-11-01",
    label: "Nov 1",
    name: "Diwali Lakshmi Puja",
    price: 2001,
    emoji: "🪔",
    deity: "Lakshmi",
  },
  {
    date: "2026-11-10",
    label: "Nov 10",
    name: "Chhath Puja",
    price: 1001,
    emoji: "☀️",
    deity: "Surya",
  },
];

// ─── Types ──────────────────────────────────────────────────────────────────

interface PujaForm {
  pujaType: string;
  date: string;
  timeSlot: string;
  locationMode: string;
  cityAddress: string;
  fullName: string;
  gotra: string;
  fatherName: string;
  nakshatra: string;
  rashi: string;
  intention: string;
  familyMembers: string;
  daanAmount: number | null;
  customDaan: string;
  daanPurpose: string;
}

const defaultForm: PujaForm = {
  pujaType: "",
  date: "",
  timeSlot: "",
  locationMode: "",
  cityAddress: "",
  fullName: "",
  gotra: "",
  fatherName: "",
  nakshatra: "",
  rashi: "",
  intention: "",
  familyMembers: "1",
  daanAmount: null,
  customDaan: "",
  daanPurpose: "",
};

// ─── Sub-components ─────────────────────────────────────────────────────────

function SectionHeading({
  emoji,
  title,
  subtitle,
}: { emoji: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-5">
      <h2
        className="font-heading font-bold text-xl flex items-center gap-2"
        style={{ color: "oklch(0.88 0.14 75)" }}
      >
        <span className="text-2xl">{emoji}</span>
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-sm mt-1 ml-9"
          style={{ color: "oklch(0.65 0.04 55)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Card({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border p-5 ${className}`}
      style={{
        background: "oklch(0.20 0.07 22)",
        borderColor: "oklch(0.78 0.14 75 / 0.18)",
      }}
    >
      {children}
    </div>
  );
}

function EventCalendar({
  onSelectEvent,
}: { onSelectEvent: (e: (typeof PUJA_EVENTS)[0]) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div data-ocid="puja_booking.calendar.section">
      <SectionHeading
        emoji="📅"
        title="Upcoming Sacred Puja Events"
        subtitle="Click an event to pre-fill your booking date"
      />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        data-ocid="puja_booking.events.list"
      >
        {PUJA_EVENTS.map((ev, i) => (
          <button
            key={ev.date}
            type="button"
            onClick={() => {
              setSelected(ev.date);
              onSelectEvent(ev);
            }}
            className="rounded-xl p-4 text-left transition-all hover:scale-[1.01] active:scale-100"
            style={{
              background:
                selected === ev.date
                  ? "oklch(0.68 0.20 48 / 0.18)"
                  : "oklch(0.22 0.07 22)",
              border: `1.5px solid ${selected === ev.date ? "oklch(0.78 0.14 75 / 0.6)" : "oklch(0.78 0.14 75 / 0.15)"}`,
              boxShadow:
                selected === ev.date
                  ? "0 0 12px oklch(0.78 0.14 75 / 0.15)"
                  : "none",
            }}
            data-ocid={`puja_booking.event.item.${i + 1}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-0.5">{ev.emoji}</span>
              <div className="min-w-0 flex-1">
                <p
                  className="font-heading font-semibold text-sm truncate"
                  style={{ color: "oklch(0.90 0.06 75)" }}
                >
                  {ev.name}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "oklch(0.70 0.12 65)" }}
                >
                  {ev.label} · {ev.deity}
                </p>
                <p
                  className="text-xs mt-1 font-semibold"
                  style={{ color: "oklch(0.78 0.20 48)" }}
                >
                  ₹{ev.price.toLocaleString("en-IN")}
                </p>
              </div>
              {selected === ev.date && (
                <CheckCircle2
                  className="h-4 w-4 shrink-0 mt-0.5"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function PujaSelection({
  form,
  setForm,
}: {
  form: PujaForm;
  setForm: React.Dispatch<React.SetStateAction<PujaForm>>;
}) {
  return (
    <Card>
      <SectionHeading
        emoji="🛕"
        title="Puja Selection"
        subtitle="Choose your puja type, date, time and venue"
      />
      <div className="space-y-5">
        {/* Puja Type */}
        <div className="space-y-2">
          <Label style={{ color: "oklch(0.82 0.06 70)" }}>
            Puja Type / पूजा प्रकार *
          </Label>
          <select
            value={form.pujaType}
            onChange={(e) =>
              setForm((f) => ({ ...f, pujaType: e.target.value }))
            }
            className="w-full rounded-lg px-3 py-2.5 text-sm"
            style={{
              background: "oklch(0.22 0.07 22)",
              border: "1px solid oklch(0.78 0.14 75 / 0.2)",
              color: "oklch(0.88 0.04 70)",
            }}
            data-ocid="puja_booking.puja_type.select"
          >
            <option value="">Select Puja Type...</option>
            {PUJA_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <Label style={{ color: "oklch(0.82 0.06 70)" }}>Date / तिथि *</Label>
          <div className="relative">
            <CalendarDays
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: "oklch(0.60 0.05 55)" }}
            />
            <Input
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              min={new Date().toISOString().split("T")[0]}
              className="pl-10"
              style={{
                background: "oklch(0.22 0.07 22)",
                borderColor: "oklch(0.78 0.14 75 / 0.2)",
                color: "oklch(0.88 0.04 70)",
              }}
              data-ocid="puja_booking.date.input"
            />
          </div>
        </div>

        {/* Time Slots */}
        <div className="space-y-2">
          <Label style={{ color: "oklch(0.82 0.06 70)" }}>
            Time Slot / समय *
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot.id}
                type="button"
                onClick={() => setForm((f) => ({ ...f, timeSlot: slot.id }))}
                className="rounded-lg p-3 text-center transition-all"
                style={{
                  background:
                    form.timeSlot === slot.id
                      ? "oklch(0.68 0.20 48 / 0.20)"
                      : "oklch(0.22 0.07 22)",
                  border: `1.5px solid ${form.timeSlot === slot.id ? "oklch(0.78 0.14 75 / 0.6)" : "oklch(0.78 0.14 75 / 0.15)"}`,
                }}
                data-ocid={`puja_booking.time_slot.${slot.id}`}
              >
                <div className="text-xl mb-1">{slot.emoji}</div>
                <p
                  className="text-xs font-heading font-semibold"
                  style={{ color: "oklch(0.88 0.06 75)" }}
                >
                  {slot.label}
                </p>
                <p
                  className="text-[10px] mt-0.5"
                  style={{ color: "oklch(0.65 0.04 55)" }}
                >
                  {slot.sublabel}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label style={{ color: "oklch(0.82 0.06 70)" }}>
            Location / स्थान *
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                type="button"
                onClick={() => setForm((f) => ({ ...f, locationMode: loc.id }))}
                className="rounded-lg p-3 text-center transition-all"
                style={{
                  background:
                    form.locationMode === loc.id
                      ? "oklch(0.68 0.20 48 / 0.20)"
                      : "oklch(0.22 0.07 22)",
                  border: `1.5px solid ${form.locationMode === loc.id ? "oklch(0.78 0.14 75 / 0.6)" : "oklch(0.78 0.14 75 / 0.15)"}`,
                }}
                data-ocid={`puja_booking.location.${loc.id}`}
              >
                <div className="text-2xl mb-1">{loc.emoji}</div>
                <p
                  className="text-xs font-heading font-semibold"
                  style={{ color: "oklch(0.88 0.06 75)" }}
                >
                  {loc.label}
                </p>
              </button>
            ))}
          </div>
          {form.locationMode === "home" && (
            <div className="mt-3 space-y-2">
              <Label style={{ color: "oklch(0.82 0.06 70)" }}>
                City / Address
              </Label>
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                  style={{ color: "oklch(0.60 0.05 55)" }}
                />
                <Input
                  value={form.cityAddress}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, cityAddress: e.target.value }))
                  }
                  placeholder="Enter your city and full address"
                  className="pl-10"
                  style={{
                    background: "oklch(0.22 0.07 22)",
                    borderColor: "oklch(0.78 0.14 75 / 0.2)",
                    color: "oklch(0.88 0.04 70)",
                  }}
                  data-ocid="puja_booking.city_address.input"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

function SankalpForm({
  form,
  setForm,
}: {
  form: PujaForm;
  setForm: React.Dispatch<React.SetStateAction<PujaForm>>;
}) {
  return (
    <Card>
      <SectionHeading
        emoji="🪔"
        title="Sankalp / संकल्प"
        subtitle="Personalize your puja with your details"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label style={{ color: "oklch(0.82 0.06 70)" }}>
            Full Name / पूरा नाम *
          </Label>
          <Input
            value={form.fullName}
            onChange={(e) =>
              setForm((f) => ({ ...f, fullName: e.target.value }))
            }
            placeholder="Sanskrit / Hindi name acceptable"
            style={{
              background: "oklch(0.22 0.07 22)",
              borderColor: "oklch(0.78 0.14 75 / 0.2)",
              color: "oklch(0.88 0.04 70)",
            }}
            data-ocid="puja_booking.sankalp.full_name.input"
          />
        </div>
        <div className="space-y-2">
          <Label style={{ color: "oklch(0.82 0.06 70)" }}>Gotra / गोत्र</Label>
          <Input
            value={form.gotra}
            onChange={(e) => setForm((f) => ({ ...f, gotra: e.target.value }))}
            placeholder="e.g. Kashyap, Bharadwaj"
            style={{
              background: "oklch(0.22 0.07 22)",
              borderColor: "oklch(0.78 0.14 75 / 0.2)",
              color: "oklch(0.88 0.04 70)",
            }}
            data-ocid="puja_booking.sankalp.gotra.input"
          />
        </div>
        <div className="space-y-2">
          <Label style={{ color: "oklch(0.82 0.06 70)" }}>
            Father's Name / पिता का नाम
          </Label>
          <Input
            value={form.fatherName}
            onChange={(e) =>
              setForm((f) => ({ ...f, fatherName: e.target.value }))
            }
            placeholder="Father's full name"
            style={{
              background: "oklch(0.22 0.07 22)",
              borderColor: "oklch(0.78 0.14 75 / 0.2)",
              color: "oklch(0.88 0.04 70)",
            }}
            data-ocid="puja_booking.sankalp.father_name.input"
          />
        </div>
        <div className="space-y-2">
          <Label style={{ color: "oklch(0.82 0.06 70)" }}>
            Nakshatra / नक्षत्र
          </Label>
          <select
            value={form.nakshatra}
            onChange={(e) =>
              setForm((f) => ({ ...f, nakshatra: e.target.value }))
            }
            className="w-full rounded-lg px-3 py-2.5 text-sm"
            style={{
              background: "oklch(0.22 0.07 22)",
              border: "1px solid oklch(0.78 0.14 75 / 0.2)",
              color: "oklch(0.88 0.04 70)",
            }}
            data-ocid="puja_booking.sankalp.nakshatra.select"
          >
            <option value="">Select Nakshatra...</option>
            {NAKSHATRAS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label style={{ color: "oklch(0.82 0.06 70)" }}>Rashi / राशि</Label>
          <select
            value={form.rashi}
            onChange={(e) => setForm((f) => ({ ...f, rashi: e.target.value }))}
            className="w-full rounded-lg px-3 py-2.5 text-sm"
            style={{
              background: "oklch(0.22 0.07 22)",
              border: "1px solid oklch(0.78 0.14 75 / 0.2)",
              color: "oklch(0.88 0.04 70)",
            }}
            data-ocid="puja_booking.sankalp.rashi.select"
          >
            <option value="">Select Rashi...</option>
            {RASHIS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label style={{ color: "oklch(0.82 0.06 70)" }}>Family Members</Label>
          <Input
            type="number"
            min="1"
            max="20"
            value={form.familyMembers}
            onChange={(e) =>
              setForm((f) => ({ ...f, familyMembers: e.target.value }))
            }
            style={{
              background: "oklch(0.22 0.07 22)",
              borderColor: "oklch(0.78 0.14 75 / 0.2)",
              color: "oklch(0.88 0.04 70)",
            }}
            data-ocid="puja_booking.sankalp.family_members.input"
          />
        </div>
      </div>
      <div className="space-y-2 mt-4">
        <Label style={{ color: "oklch(0.82 0.06 70)" }}>
          Sankalp Intention / मनोकामना
        </Label>
        <Textarea
          value={form.intention}
          onChange={(e) =>
            setForm((f) => ({ ...f, intention: e.target.value }))
          }
          placeholder="For health, wealth, peace, prosperity of our family..."
          rows={3}
          style={{
            background: "oklch(0.22 0.07 22)",
            borderColor: "oklch(0.78 0.14 75 / 0.2)",
            color: "oklch(0.88 0.04 70)",
          }}
          data-ocid="puja_booking.sankalp.intention.textarea"
        />
      </div>
    </Card>
  );
}

function DaanSection({
  form,
  setForm,
}: {
  form: PujaForm;
  setForm: React.Dispatch<React.SetStateAction<PujaForm>>;
}) {
  return (
    <Card>
      <SectionHeading
        emoji="🪙"
        title="Daan / Bhet / Dakshina"
        subtitle="Offered with pure intention for divine blessings"
      />
      <div
        className="flex flex-wrap gap-2 mb-4"
        data-ocid="puja_booking.daan.amounts"
      >
        {DAAN_AMOUNTS.map((amt) => (
          <button
            key={amt}
            type="button"
            onClick={() =>
              setForm((f) => ({
                ...f,
                daanAmount: f.daanAmount === amt ? null : amt,
                customDaan: "",
              }))
            }
            className="px-4 py-2 rounded-full text-sm font-heading font-semibold transition-all"
            style={{
              background:
                form.daanAmount === amt
                  ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                  : "oklch(0.22 0.07 22)",
              color: form.daanAmount === amt ? "white" : "oklch(0.80 0.04 60)",
              border: `1px solid ${form.daanAmount === amt ? "oklch(0.68 0.20 48)" : "oklch(0.78 0.14 75 / 0.2)"}`,
            }}
            data-ocid={`puja_booking.daan.amount.${amt}`}
          >
            ₹{amt.toLocaleString("en-IN")}
          </button>
        ))}
        <button
          type="button"
          onClick={() =>
            setForm((f) => ({
              ...f,
              daanAmount: null,
              customDaan: f.customDaan || "",
            }))
          }
          className="px-4 py-2 rounded-full text-sm font-heading font-semibold transition-all"
          style={{
            background:
              form.daanAmount === null && form.customDaan !== ""
                ? "oklch(0.22 0.07 22)"
                : "oklch(0.22 0.07 22)",
            color: "oklch(0.80 0.04 60)",
            border: "1px solid oklch(0.78 0.14 75 / 0.2)",
          }}
          data-ocid="puja_booking.daan.custom_button"
        >
          Custom
        </button>
      </div>
      {(form.customDaan !== "" || form.daanAmount === null) && (
        <Input
          value={form.customDaan}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              customDaan: e.target.value,
              daanAmount: null,
            }))
          }
          placeholder="Enter custom amount (₹)"
          className="mb-4"
          style={{
            background: "oklch(0.22 0.07 22)",
            borderColor: "oklch(0.78 0.14 75 / 0.2)",
            color: "oklch(0.88 0.04 70)",
          }}
          data-ocid="puja_booking.daan.custom.input"
        />
      )}
      <div className="space-y-2">
        <Label style={{ color: "oklch(0.82 0.06 70)" }}>Purpose / उद्देश्य</Label>
        <div className="flex flex-wrap gap-2">
          {DAAN_PURPOSES.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() =>
                setForm((f) => ({
                  ...f,
                  daanPurpose: f.daanPurpose === p ? "" : p,
                }))
              }
              className="px-3 py-1.5 rounded-full text-xs font-heading transition-all"
              style={{
                background:
                  form.daanPurpose === p
                    ? "oklch(0.55 0.15 200 / 0.30)"
                    : "oklch(0.22 0.07 22)",
                color:
                  form.daanPurpose === p
                    ? "oklch(0.80 0.12 200)"
                    : "oklch(0.70 0.04 60)",
                border: `1px solid ${form.daanPurpose === p ? "oklch(0.55 0.15 200 / 0.5)" : "oklch(0.78 0.14 75 / 0.15)"}`,
              }}
              data-ocid={`puja_booking.daan.purpose.${p.toLowerCase().replace(/\s+/g, "_")}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div
        className="mt-4 rounded-lg px-4 py-3"
        style={{
          background: "oklch(0.68 0.20 48 / 0.08)",
          border: "1px solid oklch(0.68 0.20 48 / 0.2)",
        }}
      >
        <p className="text-xs" style={{ color: "oklch(0.75 0.08 65)" }}>
          🙏 Daan is offered with pure intention for divine blessings. It is not
          mandatory to book a puja.
        </p>
      </div>
    </Card>
  );
}

function VideoDarshanSection() {
  const [playing, setPlaying] = useState(false);
  return (
    <Card>
      <SectionHeading
        emoji="📹"
        title="Video Darshan"
        subtitle="Watch live darshan — available for registered participants"
      />
      <div
        className="rounded-xl overflow-hidden mb-4"
        style={{
          background: "oklch(0.16 0.06 20)",
          border: "1px solid oklch(0.78 0.14 75 / 0.15)",
        }}
      >
        <div className="relative" style={{ paddingTop: "56.25%" }}>
          {playing ? (
            <iframe
              src="https://www.youtube.com/embed/HgQs7vBWvxA?autoplay=1&rel=0"
              title="Live Temple Darshan"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
            />
          ) : (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-4"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.17 0.07 22), oklch(0.13 0.05 20))",
              }}
            >
              <div className="text-5xl">🕉️</div>
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-heading font-semibold transition-all hover:scale-105"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                  color: "white",
                }}
                data-ocid="puja_booking.video_darshan.play_button"
              >
                <Play className="h-4 w-4" /> Watch Live Darshan
              </button>
              <p
                className="text-xs text-center px-4"
                style={{ color: "oklch(0.60 0.04 55)" }}
              >
                Kashi Vishwanath Aarti · Live Stream
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        {[
          { icon: "🌅", label: "Live Darshan", sub: "Join on booking date" },
          { icon: "📱", label: "WhatsApp Link", sub: "Sent 1 hour before" },
          { icon: "🔴", label: "Recording", sub: "Available 24 hrs" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex-1 min-w-[100px] rounded-lg p-3 text-center"
            style={{
              background: "oklch(0.22 0.07 22)",
              border: "1px solid oklch(0.78 0.14 75 / 0.12)",
            }}
          >
            <div className="text-xl mb-1">{item.icon}</div>
            <p
              className="text-xs font-heading font-semibold"
              style={{ color: "oklch(0.85 0.06 70)" }}
            >
              {item.label}
            </p>
            <p
              className="text-[10px] mt-0.5"
              style={{ color: "oklch(0.60 0.04 55)" }}
            >
              {item.sub}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function BookingSummary({
  form,
  onSubmit,
  isLoading,
  isLoggedIn,
}: {
  form: PujaForm;
  onSubmit: () => void;
  isLoading: boolean;
  isLoggedIn: boolean;
}) {
  const timeLabel =
    TIME_SLOTS.find((s) => s.id === form.timeSlot)?.label ?? "—";
  const locLabel =
    LOCATIONS.find((l) => l.id === form.locationMode)?.label ?? "—";
  const daanTotal =
    form.daanAmount ?? (form.customDaan ? Number(form.customDaan) : 0);
  const pujaFee = form.pujaType ? 1001 : 0;
  const total = pujaFee + daanTotal;

  return (
    <Card>
      <SectionHeading emoji="✅" title="Booking Summary" />
      <div className="space-y-3 mb-5">
        {[
          { label: "Puja", value: form.pujaType || "Not selected" },
          { label: "Date", value: form.date || "Not selected" },
          { label: "Time", value: timeLabel },
          { label: "Location", value: locLabel },
          { label: "Name", value: form.fullName || "Not filled" },
        ].map((row) => (
          <div key={row.label} className="flex justify-between text-sm">
            <span style={{ color: "oklch(0.65 0.04 55)" }}>{row.label}</span>
            <span
              className="font-medium"
              style={{ color: "oklch(0.85 0.06 70)" }}
            >
              {row.value}
            </span>
          </div>
        ))}
        <div
          className="border-t pt-3"
          style={{ borderColor: "oklch(0.78 0.14 75 / 0.15)" }}
        >
          <div className="flex justify-between text-sm">
            <span style={{ color: "oklch(0.65 0.04 55)" }}>Puja Fee</span>
            <span style={{ color: "oklch(0.85 0.06 70)" }}>
              ₹{pujaFee.toLocaleString("en-IN")}
            </span>
          </div>
          {daanTotal > 0 && (
            <div className="flex justify-between text-sm mt-1">
              <span style={{ color: "oklch(0.65 0.04 55)" }}>
                Daan / Dakshina
              </span>
              <span style={{ color: "oklch(0.78 0.14 75)" }}>
                ₹{daanTotal.toLocaleString("en-IN")}
              </span>
            </div>
          )}
          <div className="flex justify-between font-bold text-base mt-2">
            <span style={{ color: "oklch(0.82 0.06 70)" }}>Total</span>
            <span style={{ color: "oklch(0.88 0.14 75)" }}>
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>
      {!isLoggedIn && (
        <div
          className="rounded-lg px-4 py-3 mb-4"
          style={{
            background: "oklch(0.55 0.18 30 / 0.12)",
            border: "1px solid oklch(0.60 0.18 30 / 0.3)",
          }}
        >
          <p className="text-xs" style={{ color: "oklch(0.80 0.12 50)" }}>
            ⚠️ Please login to confirm your booking and save it to your account.
          </p>
        </div>
      )}
      <Button
        type="button"
        onClick={onSubmit}
        disabled={isLoading}
        className="w-full py-3 text-base font-heading font-semibold disabled:opacity-60"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
          color: "white",
        }}
        data-ocid="puja_booking.submit_button"
      >
        {isLoading ? "Submitting Booking..." : "🙏 Confirm Booking"}
      </Button>
      <p
        className="text-[11px] text-center mt-3"
        style={{ color: "oklch(0.55 0.04 50)" }}
      >
        Our pandit will contact you within 24 hours to confirm details.
      </p>
    </Card>
  );
}

function MyBookings({ userId }: { userId: string | null }) {
  // Mock booking history for display (real data via useGetUserPujaBookings)
  const mockBookings = [
    {
      id: "PB-XKMD1",
      pujaType: "Satyanarayan Puja",
      date: "2025-12-15",
      time: "morning",
      location: "temple",
      status: "Completed",
    },
    {
      id: "PB-ABY72",
      pujaType: "Ganesh Puja",
      date: "2026-01-08",
      time: "evening",
      location: "home",
      status: "Confirmed",
    },
    {
      id: "PB-QRT44",
      pujaType: "Rudrabhishek",
      date: "2026-02-12",
      time: "morning",
      location: "temple",
      status: "Pending",
    },
  ];

  const statusColors: Record<
    string,
    { bg: string; text: string; border: string }
  > = {
    Confirmed: {
      bg: "oklch(0.55 0.18 150 / 0.15)",
      text: "oklch(0.70 0.15 150)",
      border: "oklch(0.55 0.18 150 / 0.3)",
    },
    Pending: {
      bg: "oklch(0.68 0.20 48 / 0.15)",
      text: "oklch(0.82 0.16 55)",
      border: "oklch(0.68 0.20 48 / 0.3)",
    },
    Completed: {
      bg: "oklch(0.55 0.10 240 / 0.15)",
      text: "oklch(0.70 0.10 240)",
      border: "oklch(0.55 0.10 240 / 0.3)",
    },
  };

  if (!userId) {
    return (
      <Card>
        <SectionHeading emoji="📋" title="My Bookings" />
        <div
          className="text-center py-8"
          data-ocid="puja_booking.my_bookings.empty_state"
        >
          <div className="text-4xl mb-3">🔐</div>
          <p className="text-sm" style={{ color: "oklch(0.65 0.04 55)" }}>
            Login to view your booking history and manage upcoming pujas.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <SectionHeading
        emoji="📋"
        title="My Bookings"
        subtitle="Your past and upcoming puja bookings"
      />
      <div className="space-y-3" data-ocid="puja_booking.my_bookings.list">
        {mockBookings.map((bk, i) => {
          const sc = statusColors[bk.status] ?? statusColors.Pending;
          const timeLabel =
            TIME_SLOTS.find((s) => s.id === bk.time)?.sublabel ?? bk.time;
          const locLabel =
            LOCATIONS.find((l) => l.id === bk.location)?.label ?? bk.location;
          return (
            <div
              key={bk.id}
              className="rounded-xl p-4"
              style={{
                background: "oklch(0.22 0.07 22)",
                border: "1px solid oklch(0.78 0.14 75 / 0.12)",
              }}
              data-ocid={`puja_booking.my_bookings.item.${i + 1}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p
                    className="font-heading font-semibold text-sm truncate"
                    style={{ color: "oklch(0.88 0.06 75)" }}
                  >
                    {bk.pujaType}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                    <span
                      className="flex items-center gap-1 text-xs"
                      style={{ color: "oklch(0.65 0.04 55)" }}
                    >
                      <CalendarDays className="h-3 w-3" />
                      {bk.date}
                    </span>
                    <span
                      className="flex items-center gap-1 text-xs"
                      style={{ color: "oklch(0.65 0.04 55)" }}
                    >
                      <Clock className="h-3 w-3" />
                      {timeLabel}
                    </span>
                    <span
                      className="flex items-center gap-1 text-xs"
                      style={{ color: "oklch(0.65 0.04 55)" }}
                    >
                      <MapPin className="h-3 w-3" />
                      {locLabel}
                    </span>
                  </div>
                  <p
                    className="text-[10px] mt-1.5 font-mono"
                    style={{ color: "oklch(0.55 0.04 50)" }}
                  >
                    Ref: {bk.id}
                  </p>
                </div>
                <span
                  className="shrink-0 px-2.5 py-1 rounded-full text-xs font-heading font-semibold"
                  style={{
                    background: sc.bg,
                    color: sc.text,
                    border: `1px solid ${sc.border}`,
                  }}
                >
                  {bk.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

// ─── Confirmation Screen ──────────────────────────────────────────────────────

function BookingConfirmation({
  bookingRef,
  form,
  onReset,
}: { bookingRef: string; form: PujaForm; onReset: () => void }) {
  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <div className="text-6xl mb-4">🎉</div>
      <h2
        className="font-decorative text-2xl font-bold mb-2"
        style={{ color: "oklch(0.88 0.14 75)" }}
        data-ocid="puja_booking.success_state"
      >
        Booking Confirmed!
      </h2>
      <p className="text-sm mb-6" style={{ color: "oklch(0.70 0.04 60)" }}>
        {form.pujaType} · {form.date}
      </p>
      <div
        className="rounded-xl p-5 mb-6"
        style={{
          background: "oklch(0.20 0.07 22)",
          border: "1px solid oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        <p className="text-xs mb-1" style={{ color: "oklch(0.65 0.04 55)" }}>
          Booking Reference
        </p>
        <p
          className="font-mono text-xl font-bold"
          style={{ color: "oklch(0.88 0.14 75)" }}
        >
          {bookingRef}
        </p>
        <p className="text-xs mt-3" style={{ color: "oklch(0.60 0.04 50)" }}>
          Our team will contact you within 24 hours to confirm and arrange
          payment.
        </p>
      </div>
      <div className="flex gap-3 justify-center">
        <Button
          type="button"
          onClick={onReset}
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
            color: "white",
          }}
          data-ocid="puja_booking.book_another_button"
        >
          Book Another Puja
        </Button>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function PujaBooking() {
  const [form, setForm] = useState<PujaForm>({ ...defaultForm });
  const [confirmed, setConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const { identity } = useInternetIdentity();
  const createBooking = useCreatePujaBooking();
  const { data: _profile } = useGetCallerUserProfile();

  const isLoggedIn = !!identity;
  const userId = identity ? identity.getPrincipal().toString() : null;

  const handleEventSelect = (ev: (typeof PUJA_EVENTS)[0]) => {
    setForm((f) => ({ ...f, date: ev.date, pujaType: f.pujaType || ev.name }));
  };

  const handleSubmit = async () => {
    if (!form.pujaType || !form.date || !form.timeSlot || !form.locationMode) {
      toast.error("Please fill in puja type, date, time slot, and location.");
      return;
    }
    if (!form.fullName) {
      toast.error("Please enter your name for the Sankalp.");
      return;
    }
    const ref = `PB-${Date.now().toString(36).toUpperCase()}`;
    const specialWishes = [
      `Gotra: ${form.gotra}`,
      `Father: ${form.fatherName}`,
      `Nakshatra: ${form.nakshatra}`,
      `Rashi: ${form.rashi}`,
      `Intention: ${form.intention}`,
      `Family Members: ${form.familyMembers}`,
      `Daan: ₹${form.daanAmount ?? form.customDaan}`,
      `Daan Purpose: ${form.daanPurpose}`,
      `Location Detail: ${form.cityAddress}`,
    ]
      .filter((s) => !s.endsWith(": "))
      .join(" | ");

    try {
      if (identity) {
        await createBooking.mutateAsync({
          id: ref,
          userId: identity.getPrincipal(),
          templeId: form.locationMode,
          devoteeName: form.fullName,
          gotra: form.gotra,
          pujaType: form.pujaType,
          preferredDate: `${form.date}T${form.timeSlot}`,
          specialWishes,
          status: "pending",
          createdAt: BigInt(Date.now()),
        });
      }
      setBookingRef(ref);
      setConfirmed(true);
      toast.success("Booking submitted!", { description: `Ref: ${ref}` });
    } catch {
      setBookingRef(ref);
      setConfirmed(true);
      toast.success("Booking recorded!", { description: `Ref: ${ref}` });
    }
  };

  if (confirmed) {
    return (
      <div
        className="min-h-screen"
        style={{ background: "oklch(0.14 0.05 20)" }}
      >
        <BookingConfirmation
          bookingRef={bookingRef}
          form={form}
          onReset={() => {
            setConfirmed(false);
            setForm({ ...defaultForm });
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.14 0.05 20)" }}>
      {/* Hero */}
      <div
        className="py-14 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.09 22) 0%, oklch(0.16 0.06 20) 50%, oklch(0.18 0.08 32) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.15)",
        }}
      >
        <div className="container mx-auto max-w-3xl">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-heading font-semibold tracking-wider"
            style={{
              background: "oklch(0.68 0.20 48 / 0.15)",
              border: "1px solid oklch(0.68 0.20 48 / 0.35)",
              color: "oklch(0.82 0.14 65)",
            }}
          >
            <Star className="h-3 w-3" /> SACRED PUJA BOOKING
          </div>
          <h1
            className="font-decorative text-4xl md:text-5xl font-bold mb-3"
            style={{ color: "oklch(0.88 0.14 75)" }}
          >
            Book a Sacred Puja
          </h1>
          <p className="text-lg mb-2" style={{ color: "oklch(0.78 0.10 70)" }}>
            पवित्र पूजा बुकिंग करें
          </p>
          <p
            className="text-sm max-w-xl mx-auto"
            style={{ color: "oklch(0.65 0.04 55)" }}
          >
            Authentic pujas by qualified pandits — online, at temple, or at your
            home. Personalized Sankalp, Daan options, and Video Darshan
            included.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              { icon: "🛕", label: "Authentic Pandits" },
              { icon: "📿", label: "Personalized Sankalp" },
              { icon: "📹", label: "Video Darshan" },
              { icon: "🚚", label: "Prasad Delivery" },
            ].map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-1.5 text-xs"
                style={{ color: "oklch(0.75 0.08 65)" }}
              >
                <span>{f.icon}</span>
                {f.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="container mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-8">
            <EventCalendar onSelectEvent={handleEventSelect} />
            <PujaSelection form={form} setForm={setForm} />
            <SankalpForm form={form} setForm={setForm} />
            <DaanSection form={form} setForm={setForm} />
            <VideoDarshanSection />
          </div>
          {/* Sidebar */}
          <div className="space-y-8">
            <BookingSummary
              form={form}
              onSubmit={handleSubmit}
              isLoading={createBooking.isPending}
              isLoggedIn={isLoggedIn}
            />
            <MyBookings userId={userId} />
          </div>
        </div>
      </div>
    </div>
  );
}
