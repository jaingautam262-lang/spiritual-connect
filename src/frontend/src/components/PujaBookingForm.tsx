import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  Star,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCreatePujaBooking, useGetAllTemples } from "../hooks/useQueries";

const PUJA_TYPES = [
  "Ganesh Puja",
  "Lakshmi Puja",
  "Shiva Abhishek",
  "Satyanarayan Katha",
  "Navgraha Puja",
  "Rudrabhishek",
  "Sunderkand Path",
  "Hanuman Puja",
  "Durga Puja",
  "Kali Puja",
  "Saraswati Puja",
  "Vishnu Puja",
  "Ram Puja",
  "Krishna Puja",
  "Vastu Puja",
  "Griha Pravesh Puja",
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

// Auspicious dates (highlighted on calendar)
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

// Unavailable dates (blocked)
const UNAVAILABLE_DATES = new Set([
  "2026-04-13",
  "2026-04-15",
  "2026-05-01",
  "2026-05-02",
]);

interface DaanOption {
  id: string;
  label: string;
  labelHi: string;
  amounts: number[];
  allowCustom?: boolean;
  description: string;
}

const DAAN_OPTIONS: DaanOption[] = [
  {
    id: "brahman_bhojan",
    label: "Daan for Brahman Bhojan",
    labelHi: "ब्राह्मण भोजन दान",
    amounts: [501, 1001, 2001],
    allowCustom: true,
    description: "Feeds and honors Brahmin pandits performing the puja",
  },
  {
    id: "bhet_prasad",
    label: "Bhet/Prasad to Mandir",
    labelHi: "भेट/प्रसाद",
    amounts: [],
    description: "Coconut, flowers, fruits & samagri offered to the deity",
  },
  {
    id: "go_seva",
    label: "Go Seva",
    labelHi: "गो सेवा",
    amounts: [251, 501, 1001],
    description: "Supports care and feeding of sacred cows at the temple",
  },
  {
    id: "gau_daan",
    label: "Gau Daan",
    labelHi: "गौ दान",
    amounts: [5001, 11001],
    description: "Highly auspicious donation toward a sacred cow (Gau Mata)",
  },
];

const BHET_OPTIONS = [
  "Coconut (नारियल)",
  "Flowers (पुष्प)",
  "Fruits (फल)",
  "Samagri Kit (सामग्री)",
];

interface SelectedDaan {
  optionId: string;
  amount?: number;
  bhetItems?: string[];
}

interface BookingSummary {
  id: string;
  pujaType: string;
  date: string;
  devoteeName: string;
  fatherName: string;
  gotra: string;
  nakshatra: string;
  kamana: string;
  daan: SelectedDaan[];
  totalAmount: number;
}

function AuspiciousCalendar({
  value,
  onChange,
}: {
  value: string;
  onChange: (d: string) => void;
}) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const monthNames = [
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
      setViewYear(viewYear - 1);
    } else setViewMonth(viewMonth - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else setViewMonth(viewMonth + 1);
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "oklch(0.99 0.008 80)",
        border: "1px solid oklch(0.78 0.14 75 / 0.25)",
      }}
    >
      {/* Header */}
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
          {monthNames[viewMonth]} {viewYear}
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

      {/* Day names */}
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

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {Array.from({ length: firstDayOfMonth }, (_v, i) => (
          <div
            key={`sp-${viewYear}-${viewMonth}-slot-${viewYear * 12 * 31 + viewMonth * 31 + i}`}
          />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const dateStr = `${viewYear}-${pad(viewMonth + 1)}-${pad(day)}`;
          const isSelected = value === dateStr;
          const isAuspicious = !!AUSPICIOUS_DATES[dateStr];
          const isUnavailable = UNAVAILABLE_DATES.has(dateStr);
          const isPast =
            new Date(dateStr) < new Date(today.toISOString().split("T")[0]);

          return (
            <button
              key={day}
              type="button"
              disabled={isUnavailable || isPast}
              onClick={() => !isUnavailable && !isPast && onChange(dateStr)}
              className="relative aspect-square flex flex-col items-center justify-center rounded-lg text-xs font-body transition-all"
              style={{
                background: isSelected
                  ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                  : isAuspicious
                    ? "oklch(0.68 0.20 48 / 0.12)"
                    : "transparent",
                color: isSelected
                  ? "white"
                  : isUnavailable || isPast
                    ? "oklch(0.75 0.02 50)"
                    : isAuspicious
                      ? "oklch(0.40 0.16 40)"
                      : "oklch(0.30 0.06 30)",
                cursor: isUnavailable || isPast ? "not-allowed" : "pointer",
                opacity: isUnavailable || isPast ? 0.4 : 1,
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

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
        <div className="flex items-center gap-1.5">
          <div
            className="w-3 h-3 rounded-sm"
            style={{ background: "oklch(0.68 0.20 48 / 0.12)" }}
          />
          <span
            className="text-xs font-body"
            style={{ color: "oklch(0.55 0.06 50)" }}
          >
            Auspicious
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="w-3 h-3 rounded-sm"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
            }}
          />
          <span
            className="text-xs font-body"
            style={{ color: "oklch(0.55 0.06 50)" }}
          >
            Selected
          </span>
        </div>
      </div>

      {value && AUSPICIOUS_DATES[value] && (
        <div
          className="mt-2 p-2 rounded-lg flex items-center gap-2"
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

function DaanBhetSection({
  selected,
  onChange,
}: {
  selected: SelectedDaan[];
  onChange: (s: SelectedDaan[]) => void;
}) {
  const [customAmounts, setCustomAmounts] = useState<Record<string, string>>(
    {},
  );

  const isSelected = (id: string) => selected.some((s) => s.optionId === id);

  const toggle = (opt: DaanOption) => {
    if (isSelected(opt.id)) {
      onChange(selected.filter((s) => s.optionId !== opt.id));
    } else {
      onChange([
        ...selected,
        { optionId: opt.id, amount: opt.amounts[0], bhetItems: [] },
      ]);
    }
  };

  const setAmount = (id: string, amount: number) => {
    onChange(selected.map((s) => (s.optionId === id ? { ...s, amount } : s)));
  };

  const setCustomAmount = (id: string, val: string) => {
    setCustomAmounts({ ...customAmounts, [id]: val });
    const num = Number.parseInt(val, 10);
    if (!Number.isNaN(num) && num > 0) setAmount(id, num);
  };

  const toggleBhetItem = (item: string) => {
    const existing = selected.find((s) => s.optionId === "bhet_prasad");
    if (!existing) return;
    const items = existing.bhetItems ?? [];
    const next = items.includes(item)
      ? items.filter((i) => i !== item)
      : [...items, item];
    onChange(
      selected.map((s) =>
        s.optionId === "bhet_prasad" ? { ...s, bhetItems: next } : s,
      ),
    );
  };

  return (
    <div
      className="rounded-2xl p-4 space-y-3"
      style={{
        background: "oklch(0.68 0.20 48 / 0.04)",
        border: "1px solid oklch(0.68 0.20 48 / 0.15)",
      }}
    >
      <h3
        className="font-heading font-bold text-sm"
        style={{ color: "oklch(0.35 0.12 25)" }}
      >
        🪷 दान/भेट विकल्प{" "}
        <span
          className="font-body font-normal text-xs"
          style={{ color: "oklch(0.55 0.04 50)" }}
        >
          (वैकल्पिक)
        </span>
      </h3>
      {DAAN_OPTIONS.map((opt) => {
        const sel = selected.find((s) => s.optionId === opt.id);
        const active = !!sel;
        return (
          <div
            key={opt.id}
            className="rounded-xl p-3 transition-all"
            style={{
              background: active ? "oklch(0.99 0.008 80)" : "transparent",
              border: `1px solid ${active ? "oklch(0.68 0.20 48 / 0.3)" : "oklch(0.78 0.14 75 / 0.2)"}`,
            }}
          >
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={active}
                onChange={() => toggle(opt)}
                className="mt-0.5 accent-amber-600"
                data-ocid={`puja.daan.${opt.id}_checkbox`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-1.5">
                  <span
                    className="font-heading font-semibold text-sm"
                    style={{ color: "oklch(0.30 0.10 30)" }}
                  >
                    {opt.labelHi}
                  </span>
                  <span
                    className="font-body text-xs"
                    style={{ color: "oklch(0.55 0.04 50)" }}
                  >
                    ({opt.label})
                  </span>
                  {opt.amounts.length > 0 && (
                    <span
                      className="font-heading font-bold text-xs"
                      style={{ color: "oklch(0.68 0.20 48)" }}
                    >
                      ₹{opt.amounts[0]}+
                    </span>
                  )}
                </div>
                <p
                  className="text-xs font-body mt-0.5"
                  style={{ color: "oklch(0.55 0.06 50)" }}
                >
                  {opt.description}
                </p>

                {active && opt.amounts.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {opt.amounts.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setAmount(opt.id, amt)}
                        className="px-3 py-1 rounded-full text-xs font-heading font-semibold border transition-all"
                        style={{
                          background:
                            sel?.amount === amt
                              ? "oklch(0.68 0.20 48)"
                              : "transparent",
                          borderColor:
                            sel?.amount === amt
                              ? "oklch(0.68 0.20 48)"
                              : "oklch(0.78 0.14 75 / 0.3)",
                          color:
                            sel?.amount === amt
                              ? "white"
                              : "oklch(0.45 0.10 40)",
                        }}
                      >
                        ₹{amt.toLocaleString("en-IN")}
                      </button>
                    ))}
                    {opt.allowCustom && (
                      <input
                        type="number"
                        placeholder="Custom ₹"
                        value={customAmounts[opt.id] ?? ""}
                        onChange={(e) =>
                          setCustomAmount(opt.id, e.target.value)
                        }
                        className="px-2 py-1 rounded-full text-xs font-body border w-24 focus:outline-none bg-background"
                        style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                      />
                    )}
                  </div>
                )}

                {active && opt.id === "bhet_prasad" && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {BHET_OPTIONS.map((item) => {
                      const checked = sel?.bhetItems?.includes(item) ?? false;
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleBhetItem(item)}
                          className="px-2.5 py-1 rounded-full text-xs font-body border transition-all"
                          style={{
                            background: checked
                              ? "oklch(0.55 0.18 145 / 0.15)"
                              : "transparent",
                            borderColor: checked
                              ? "oklch(0.55 0.18 145 / 0.5)"
                              : "oklch(0.78 0.14 75 / 0.3)",
                            color: checked
                              ? "oklch(0.35 0.14 145)"
                              : "oklch(0.45 0.06 50)",
                          }}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </label>
          </div>
        );
      })}
    </div>
  );
}

function SankalpSection({
  values,
  onChange,
}: {
  values: {
    fullName: string;
    fatherName: string;
    gotravadi: string;
    kamana: string;
    nakshatra: string;
  };
  onChange: (k: keyof typeof values, v: string) => void;
}) {
  const inputClass =
    "w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background";
  const inputStyle = { borderColor: "oklch(0.78 0.14 75 / 0.3)" };
  const labelClass = "block text-sm font-heading font-semibold mb-1";
  const labelStyle = { color: "oklch(0.35 0.12 25)" };

  return (
    <div
      className="rounded-2xl p-4 space-y-3"
      style={{
        background: "oklch(0.55 0.16 220 / 0.03)",
        border: "1px solid oklch(0.55 0.16 220 / 0.15)",
      }}
    >
      <div>
        <h3
          className="font-heading font-bold text-sm"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          🕉️ संकल्प व्यक्तिगतकरण
        </h3>
        <p
          className="text-xs font-body mt-0.5"
          style={{ color: "oklch(0.55 0.06 50)" }}
        >
          आपका संकल्प पूजा के दौरान पंडित जी द्वारा पढ़ा जाएगा
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="sankalp-fullname"
            className={labelClass}
            style={labelStyle}
          >
            संकल्प नाम (Sanskrit name if known)
          </label>
          <input
            id="sankalp-fullname"
            type="text"
            value={values.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            placeholder="जैसे: श्री रामप्रसाद शर्मा"
            className={inputClass}
            style={inputStyle}
            data-ocid="puja.sankalp.full_name_input"
          />
        </div>
        <div>
          <label
            htmlFor="sankalp-father"
            className={labelClass}
            style={labelStyle}
          >
            पिता का नाम
          </label>
          <input
            id="sankalp-father"
            type="text"
            value={values.fatherName}
            onChange={(e) => onChange("fatherName", e.target.value)}
            placeholder="पिता का पूरा नाम"
            className={inputClass}
            style={inputStyle}
            data-ocid="puja.sankalp.father_name_input"
          />
        </div>
        <div>
          <label
            htmlFor="sankalp-gotravadi"
            className={labelClass}
            style={labelStyle}
          >
            गोत्रवादी (Gotravadi)
          </label>
          <input
            id="sankalp-gotravadi"
            type="text"
            value={values.gotravadi}
            onChange={(e) => onChange("gotravadi", e.target.value)}
            placeholder="जैसे: कश्यप गोत्रोत्पन्न"
            className={inputClass}
            style={inputStyle}
            data-ocid="puja.sankalp.gotravadi_input"
          />
        </div>
        <div>
          <label
            htmlFor="sankalp-nakshatra"
            className={labelClass}
            style={labelStyle}
          >
            जन्म नक्षत्र
          </label>
          <select
            id="sankalp-nakshatra"
            value={values.nakshatra}
            onChange={(e) => onChange("nakshatra", e.target.value)}
            className={inputClass}
            style={inputStyle}
            data-ocid="puja.sankalp.nakshatra_select"
          >
            <option value="">— नक्षत्र चुनें —</option>
            {NAKSHATRAS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="sankalp-kamana"
          className={labelClass}
          style={labelStyle}
        >
          संकल्प कामना — आप क्या आशीर्वाद चाहते हैं?
        </label>
        <textarea
          id="sankalp-kamana"
          value={values.kamana}
          onChange={(e) => onChange("kamana", e.target.value)}
          placeholder="जैसे: परिवार की सुख-समृद्धि, संतान सुख, स्वास्थ्य लाभ, व्यापार में सफलता..."
          rows={3}
          className={`${inputClass} resize-none`}
          style={inputStyle}
          data-ocid="puja.sankalp.kamana_textarea"
        />
      </div>
    </div>
  );
}

function BookingConfirmationDashboard({
  summary,
  onReset,
}: {
  summary: BookingSummary;
  onReset: () => void;
}) {
  const STATUS_STEPS = ["Booked", "Confirmed", "In Progress", "Completed"];
  const currentStep = 0;

  const handleDownload = () => {
    const text = [
      "═══════════════════════════════════",
      "       SPIRITUAL CONNECT           ",
      "    PUJA BOOKING CONFIRMATION      ",
      "═══════════════════════════════════",
      `Booking ID   : ${summary.id}`,
      `Puja Type    : ${summary.pujaType}`,
      `Date         : ${summary.date}`,
      `Devotee      : ${summary.devoteeName}`,
      summary.fatherName ? `Father's Name: ${summary.fatherName}` : "",
      summary.gotra ? `Gotra        : ${summary.gotra}` : "",
      summary.nakshatra ? `Nakshatra    : ${summary.nakshatra}` : "",
      summary.kamana ? `Kamana       : ${summary.kamana}` : "",
      `Total Amount : ₹${summary.totalAmount.toLocaleString("en-IN")}`,
      "───────────────────────────────────",
      "Status: BOOKED ✓",
      "Pandit will call within 24 hours.",
      "═══════════════════════════════════",
    ]
      .filter(Boolean)
      .join("\n");

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `puja-confirmation-${summary.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="max-w-lg mx-auto rounded-2xl overflow-hidden"
      style={{ border: "1px solid oklch(0.68 0.20 48 / 0.3)" }}
      data-ocid="puja.confirmation.dashboard"
    >
      {/* Header */}
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
          {summary.id}
        </div>
      </div>

      {/* Summary */}
      <div
        className="p-5 space-y-3"
        style={{ background: "oklch(0.99 0.008 80)" }}
      >
        <h3
          className="font-heading font-semibold text-sm"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          बुकिंग सारांश
        </h3>
        {[
          { label: "पूजा", value: summary.pujaType },
          { label: "तिथि", value: summary.date },
          { label: "भक्त", value: summary.devoteeName },
          summary.gotra && { label: "गोत्र", value: summary.gotra },
          summary.nakshatra && { label: "नक्षत्र", value: summary.nakshatra },
          summary.kamana && { label: "कामना", value: summary.kamana },
          summary.totalAmount > 0 && {
            label: "कुल राशि",
            value: `₹${summary.totalAmount.toLocaleString("en-IN")}`,
          },
        ]
          .filter(Boolean)
          .map((row) => {
            if (!row) return null;
            return (
              <div key={row.label} className="flex items-start gap-3">
                <span
                  className="text-xs font-heading font-semibold w-24 shrink-0 pt-0.5"
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
            );
          })}
      </div>

      {/* Status Tracker */}
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
                      i <= currentStep
                        ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                        : "oklch(0.88 0.02 50)",
                    color: i <= currentStep ? "white" : "oklch(0.60 0.04 50)",
                  }}
                >
                  {i <= currentStep ? "✓" : i + 1}
                </div>
                <span
                  className="text-xs font-body mt-1 text-center leading-tight"
                  style={{
                    color:
                      i <= currentStep
                        ? "oklch(0.45 0.14 40)"
                        : "oklch(0.65 0.04 50)",
                    maxWidth: "56px",
                  }}
                >
                  {step}
                </span>
              </div>
              {i < STATUS_STEPS.length - 1 && (
                <div
                  className="flex-1 h-0.5 mx-1 mb-5"
                  style={{
                    background:
                      i < currentStep
                        ? "oklch(0.68 0.20 48)"
                        : "oklch(0.85 0.02 50)",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
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
          data-ocid="puja.confirmation.download_button"
        >
          <Download className="h-4 w-4" />
          Download
        </button>
        <button
          type="button"
          onClick={onReset}
          className="flex-1 py-2.5 rounded-full font-heading font-bold text-sm text-white transition-all hover:scale-105"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
          }}
          data-ocid="puja.confirmation.book_another_button"
        >
          🙏 दूसरी पूजा बुक करें
        </button>
      </div>

      <p
        className="text-center text-xs font-body py-3"
        style={{
          color: "oklch(0.55 0.06 50)",
          background: "oklch(0.97 0.005 75)",
        }}
      >
        24 घंटे में पंडित जी का call आएगा — Dashboard में track करें
      </p>
    </div>
  );
}

export default function PujaBookingForm() {
  const { identity } = useInternetIdentity();
  const { data: temples = [] } = useGetAllTemples();
  const createBooking = useCreatePujaBooking();

  const [form, setForm] = useState({
    templeId: "",
    devoteeName: "",
    gotra: "",
    pujaType: "",
    preferredDate: "",
    specialWishes: "",
  });

  const [sankalp, setSankalp] = useState({
    fullName: "",
    fatherName: "",
    gotravadi: "",
    kamana: "",
    nakshatra: "",
  });

  const [daanSelected, setDaanSelected] = useState<SelectedDaan[]>([]);
  const [confirmed, setConfirmed] = useState<BookingSummary | null>(null);

  const totalDaan = daanSelected.reduce((sum, s) => sum + (s.amount ?? 0), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identity) {
      toast.error("Please login to book a puja");
      return;
    }
    if (
      !form.templeId ||
      !form.devoteeName ||
      !form.pujaType ||
      !form.preferredDate
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const id = `PB-${Date.now().toString(36).toUpperCase().slice(-8)}`;
    try {
      await createBooking.mutateAsync({
        id,
        userId: identity.getPrincipal(),
        templeId: form.templeId,
        devoteeName: form.devoteeName,
        gotra: form.gotra,
        pujaType: form.pujaType,
        preferredDate: form.preferredDate,
        specialWishes: `${form.specialWishes}\nSankalp: ${sankalp.kamana}\nFather: ${sankalp.fatherName}\nNakshatra: ${sankalp.nakshatra}`,
        status: "pending",
        createdAt: BigInt(Date.now()) * BigInt(1_000_000),
      });
      setConfirmed({
        id,
        pujaType: form.pujaType,
        date: form.preferredDate,
        devoteeName: form.devoteeName,
        fatherName: sankalp.fatherName,
        gotra: form.gotra,
        nakshatra: sankalp.nakshatra,
        kamana: sankalp.kamana,
        daan: daanSelected,
        totalAmount: totalDaan,
      });
      toast.success("Puja booked successfully! 🙏");
    } catch {
      toast.error("Failed to book puja. Please try again.");
    }
  };

  const resetForm = () => {
    setConfirmed(null);
    setForm({
      templeId: "",
      devoteeName: "",
      gotra: "",
      pujaType: "",
      preferredDate: "",
      specialWishes: "",
    });
    setSankalp({
      fullName: "",
      fatherName: "",
      gotravadi: "",
      kamana: "",
      nakshatra: "",
    });
    setDaanSelected([]);
  };

  if (confirmed) {
    return (
      <BookingConfirmationDashboard summary={confirmed} onReset={resetForm} />
    );
  }

  const inputStyle = { borderColor: "oklch(0.78 0.14 75 / 0.3)" };
  const labelClass = "block text-sm font-heading font-semibold mb-1";
  const labelStyle = { color: "oklch(0.35 0.12 25)" };
  const inputClass =
    "w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background";

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className="rounded-2xl p-6 md:p-8"
        style={{
          background: "oklch(0.99 0.008 80)",
          border: "1px solid oklch(0.78 0.14 75 / 0.25)",
        }}
      >
        <h2
          className="font-heading text-2xl font-bold mb-6 text-center"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          🙏 Book a Puja
        </h2>

        {!identity && (
          <div
            className="mb-4 p-3 rounded-lg text-sm font-body text-center"
            style={{
              background: "oklch(0.78 0.14 75 / 0.1)",
              color: "oklch(0.55 0.16 60)",
            }}
          >
            Please login to book a puja
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Temple */}
          <div>
            <label
              htmlFor="puja-temple"
              className={labelClass}
              style={labelStyle}
            >
              Select Temple *
            </label>
            <select
              id="puja-temple"
              value={form.templeId}
              onChange={(e) => setForm({ ...form, templeId: e.target.value })}
              className={inputClass}
              style={inputStyle}
              required
              data-ocid="puja.booking.temple_select"
            >
              <option value="">-- Select a Temple --</option>
              {temples.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} — {t.location}
                </option>
              ))}
            </select>
          </div>

          {/* Devotee + Gotra */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="puja-devotee"
                className={labelClass}
                style={labelStyle}
              >
                Devotee Name *
              </label>
              <input
                id="puja-devotee"
                type="text"
                value={form.devoteeName}
                onChange={(e) =>
                  setForm({ ...form, devoteeName: e.target.value })
                }
                placeholder="Full name"
                className={inputClass}
                style={inputStyle}
                required
                data-ocid="puja.booking.devotee_name_input"
              />
            </div>
            <div>
              <label
                htmlFor="puja-gotra"
                className={labelClass}
                style={labelStyle}
              >
                Gotra
              </label>
              <input
                id="puja-gotra"
                type="text"
                value={form.gotra}
                onChange={(e) => setForm({ ...form, gotra: e.target.value })}
                placeholder="e.g., Kashyap, Bharadwaj"
                className={inputClass}
                style={inputStyle}
                data-ocid="puja.booking.gotra_input"
              />
            </div>
          </div>

          {/* Puja Type */}
          <div>
            <label
              htmlFor="puja-type"
              className={labelClass}
              style={labelStyle}
            >
              Puja Type *
            </label>
            <select
              id="puja-type"
              value={form.pujaType}
              onChange={(e) => setForm({ ...form, pujaType: e.target.value })}
              className={inputClass}
              style={inputStyle}
              required
              data-ocid="puja.booking.puja_type_select"
            >
              <option value="">-- Select Puja --</option>
              {PUJA_TYPES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Daan/Bhet */}
          <DaanBhetSection selected={daanSelected} onChange={setDaanSelected} />

          {/* Sankalp Personalization */}
          <SankalpSection
            values={sankalp}
            onChange={(k, v) => setSankalp({ ...sankalp, [k]: v })}
          />

          {/* Auspicious Calendar */}
          <div>
            <p className={labelClass} style={labelStyle}>
              Preferred Date * — शुभ तिथि चुनें
            </p>
            <AuspiciousCalendar
              value={form.preferredDate}
              onChange={(d) => setForm({ ...form, preferredDate: d })}
            />
            {!form.preferredDate && (
              <p
                className="text-xs font-body mt-1"
                style={{ color: "oklch(0.65 0.06 50)" }}
              >
                सोने के circle वाली तिथियाँ शुभ मुहूर्त हैं
              </p>
            )}
          </div>

          {/* Special Wishes */}
          <div>
            <label
              htmlFor="puja-wishes"
              className={labelClass}
              style={labelStyle}
            >
              Special Wishes
            </label>
            <textarea
              id="puja-wishes"
              value={form.specialWishes}
              onChange={(e) =>
                setForm({ ...form, specialWishes: e.target.value })
              }
              placeholder="Any specific prayers or wishes..."
              rows={3}
              className={`${inputClass} resize-none`}
              style={inputStyle}
              data-ocid="puja.booking.wishes_textarea"
            />
          </div>

          {/* Amount summary */}
          {totalDaan > 0 && (
            <div
              className="flex items-center justify-between p-3 rounded-xl"
              style={{
                background: "oklch(0.68 0.20 48 / 0.08)",
                border: "1px solid oklch(0.68 0.20 48 / 0.2)",
              }}
            >
              <span
                className="font-heading font-semibold text-sm"
                style={{ color: "oklch(0.40 0.12 40)" }}
              >
                कुल दान/भेट राशि
              </span>
              <span
                className="font-heading font-bold text-base"
                style={{ color: "oklch(0.45 0.16 40)" }}
              >
                ₹{totalDaan.toLocaleString("en-IN")}
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={
              createBooking.isPending || !identity || !form.preferredDate
            }
            className="w-full py-3 rounded-full font-heading font-bold text-sm tracking-wide transition-all disabled:opacity-50 hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
            }}
            data-ocid="puja.booking.submit_button"
          >
            {createBooking.isPending ? "Booking..." : "🙏 Book Puja"}
          </button>
        </form>
      </div>
    </div>
  );
}
