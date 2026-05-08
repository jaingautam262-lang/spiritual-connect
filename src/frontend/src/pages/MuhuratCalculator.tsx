import { useState } from "react";
import {
  GRIHA_PRAVESH_MUHURAT_2026,
  type MuhuratData,
  type MuhuratMonth,
  PROPERTY_MUHURAT_2026,
  VEHICLE_MUHURAT_2026,
  VIVAH_MUHURAT_2026,
  getDayName,
  getMuhuratDetails,
} from "../data/muhuratData2026";

// ─── Types ────────────────────────────────────────────────────────────────────

type PurposeId =
  | "marriage"
  | "vehicle"
  | "griha-pravesh"
  | "business"
  | "travel"
  | "property";

interface Purpose {
  id: PurposeId;
  label: string;
  labelHi: string;
  emoji: string;
  data?: MuhuratData;
}

const PURPOSES: Purpose[] = [
  {
    id: "marriage",
    label: "Marriage",
    labelHi: "विवाह",
    emoji: "💍",
    data: VIVAH_MUHURAT_2026,
  },
  {
    id: "vehicle",
    label: "Vehicle Purchase",
    labelHi: "वाहन",
    emoji: "🚗",
    data: VEHICLE_MUHURAT_2026,
  },
  {
    id: "griha-pravesh",
    label: "Griha Pravesh",
    labelHi: "गृह प्रवेश",
    emoji: "🏠",
    data: GRIHA_PRAVESH_MUHURAT_2026,
  },
  {
    id: "property",
    label: "Property",
    labelHi: "संपत्ति",
    emoji: "🏗️",
    data: PROPERTY_MUHURAT_2026,
  },
  { id: "business", label: "Business", labelHi: "व्यापार", emoji: "💼" },
  { id: "travel", label: "Travel", labelHi: "यात्रा", emoji: "✈️" },
];

// ─── Detail Modal ─────────────────────────────────────────────────────────────

function MonthDetailModal({
  month,
  year,
  onClose,
}: {
  month: MuhuratMonth;
  year: number;
  onClose: () => void;
}) {
  const allDays = Array.from(
    { length: new Date(year, month.monthNum, 0).getDate() },
    (_, i) => i + 1,
  );
  const shubhSet = new Set(month.shubhDays);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "oklch(0 0 0 / 0.75)" }}
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      data-ocid="muhurat.detail.dialog"
    >
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
        style={{
          background: "oklch(0.14 0.06 22)",
          border: "1px solid oklch(0.35 0.12 48)",
        }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.20 0.10 28), oklch(0.18 0.08 24))",
            borderColor: "oklch(0.35 0.12 48)",
          }}
        >
          <div>
            <h3
              className="font-heading font-bold text-lg"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              {month.month} 2026
            </h3>
            <p className="text-xs" style={{ color: "oklch(0.55 0.06 55)" }}>
              {month.note}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-opacity hover:opacity-80"
            style={{
              background: "oklch(0.30 0.08 28)",
              color: "oklch(0.78 0.14 75)",
            }}
            data-ocid="muhurat.detail.close_button"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-4 space-y-2 flex-1">
          {month.shubhDays.length === 0 ? (
            <div
              className="rounded-xl p-6 text-center"
              style={{
                background: "oklch(0.18 0.05 22)",
                border: "1px solid oklch(0.28 0.06 28)",
              }}
              data-ocid="muhurat.detail.empty_state"
            >
              <p className="text-3xl mb-2">🚫</p>
              <p
                className="font-heading font-bold"
                style={{ color: "oklch(0.65 0.20 20)" }}
              >
                No Shubh Muhurat
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: "oklch(0.52 0.04 50)" }}
              >
                {month.note}
              </p>
            </div>
          ) : (
            allDays.map((day) => {
              const isShubh = shubhSet.has(day);
              const details = isShubh
                ? getMuhuratDetails(day, month.monthNum)
                : null;
              const dayName = getDayName(year, month.monthNum, day);
              return (
                <div
                  key={day}
                  className="flex items-start gap-3 rounded-xl px-3 py-2.5 border"
                  style={{
                    background: isShubh
                      ? "oklch(0.55 0.18 145 / 0.08)"
                      : "oklch(0.17 0.04 22)",
                    borderColor: isShubh
                      ? "oklch(0.55 0.18 145 / 0.30)"
                      : "oklch(0.24 0.05 24)",
                  }}
                >
                  <div className="text-right w-12 flex-shrink-0">
                    <p
                      className="font-bold text-sm"
                      style={{
                        color: isShubh
                          ? "oklch(0.78 0.14 75)"
                          : "oklch(0.45 0.04 48)",
                      }}
                    >
                      {day}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "oklch(0.50 0.04 50)" }}
                    >
                      {dayName}
                    </p>
                  </div>
                  <div className="flex-1 min-w-0">
                    {isShubh && details ? (
                      <>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-semibold"
                            style={{
                              background: "oklch(0.55 0.18 145 / 0.18)",
                              color: "oklch(0.65 0.18 145)",
                            }}
                          >
                            ✓ Auspicious
                          </span>
                          <span
                            className="text-xs"
                            style={{ color: "oklch(0.68 0.20 48)" }}
                          >
                            {details.timing}
                          </span>
                        </div>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: "oklch(0.60 0.04 55)" }}
                        >
                          {details.nakshatra} · {details.tithi}
                        </p>
                      </>
                    ) : (
                      <p
                        className="text-xs"
                        style={{ color: "oklch(0.38 0.04 40)" }}
                      >
                        —
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          )}
          <p
            className="text-center text-xs pt-2"
            style={{ color: "oklch(0.45 0.04 48)" }}
          >
            * Timings are approximate. Consult a Jyotishi for precise muhurat.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Month Card ───────────────────────────────────────────────────────────────

function MonthCard({
  month,
  onExpand,
}: {
  month: MuhuratMonth;
  year?: number;
  onExpand: (m: MuhuratMonth) => void;
}) {
  const [showDays, setShowDays] = useState(false);
  const hasNoDays = month.shubhDays.length === 0;

  return (
    <div
      className="rounded-2xl overflow-hidden border transition-all"
      style={{
        borderColor: hasNoDays ? "oklch(0.30 0.06 20)" : "oklch(0.35 0.12 48)",
        background: hasNoDays ? "oklch(0.16 0.04 20)" : "oklch(0.17 0.06 22)",
      }}
      data-ocid={`muhurat.month.${month.monthNum}`}
    >
      {/* Card header */}
      <div
        className="px-4 py-3"
        style={{
          background: hasNoDays
            ? "oklch(0.18 0.04 20)"
            : "linear-gradient(135deg, oklch(0.20 0.09 28), oklch(0.18 0.07 24))",
        }}
      >
        <div className="flex items-center justify-between">
          <h3
            className="font-heading font-bold text-sm"
            style={{
              color: hasNoDays ? "oklch(0.40 0.04 40)" : "oklch(0.78 0.14 75)",
            }}
          >
            {month.month}
          </h3>
          {hasNoDays ? (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{
                background: "oklch(0.50 0.20 20 / 0.15)",
                color: "oklch(0.60 0.20 20)",
              }}
            >
              Prohibited
            </span>
          ) : (
            <span
              className="text-2xl font-black font-heading"
              style={{ color: "oklch(0.68 0.20 48)" }}
            >
              {month.shubhDays.length}
            </span>
          )}
        </div>
        <p
          className="text-xs mt-0.5"
          style={{
            color: hasNoDays ? "oklch(0.40 0.06 22)" : "oklch(0.55 0.06 55)",
          }}
        >
          {hasNoDays ? month.note : `${month.shubhDays.length} shubh days`}
        </p>
      </div>

      {/* Actions */}
      {!hasNoDays && (
        <div
          className="px-4 py-2 border-t flex gap-2"
          style={{ borderColor: "oklch(0.26 0.07 26)" }}
        >
          <button
            type="button"
            onClick={() => setShowDays((v) => !v)}
            className="text-xs px-3 py-1 rounded-full border transition-all hover:opacity-90"
            style={{
              background: showDays
                ? "oklch(0.68 0.20 48 / 0.15)"
                : "transparent",
              borderColor: "oklch(0.40 0.14 48)",
              color: "oklch(0.68 0.20 48)",
            }}
            data-ocid={`muhurat.month.${month.monthNum}.toggle`}
          >
            {showDays ? "Hide Days" : "Show Days"}
          </button>
          <button
            type="button"
            onClick={() => onExpand(month)}
            className="text-xs px-3 py-1 rounded-full border transition-all hover:opacity-90"
            style={{
              background: "transparent",
              borderColor: "oklch(0.40 0.14 48)",
              color: "oklch(0.78 0.14 75)",
            }}
            data-ocid={`muhurat.month.${month.monthNum}.detail`}
          >
            Full Details
          </button>
        </div>
      )}

      {/* Day chips */}
      {showDays && !hasNoDays && (
        <div className="px-4 pb-3 flex flex-wrap gap-1.5">
          {month.shubhDays.map((day) => (
            <span
              key={day}
              className="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold"
              style={{
                background: "oklch(0.68 0.20 48 / 0.15)",
                border: "1px solid oklch(0.68 0.20 48 / 0.40)",
                color: "oklch(0.78 0.14 75)",
              }}
            >
              {day}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Consultation CTA ─────────────────────────────────────────────────────────

function ConsultationCTA({ purpose }: { purpose: string }) {
  return (
    <div
      className="rounded-2xl p-6 text-center border"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.18 0.08 28), oklch(0.16 0.06 24))",
        borderColor: "oklch(0.35 0.12 48)",
      }}
      data-ocid="muhurat.consultation.card"
    >
      <p className="text-4xl mb-3">🙏</p>
      <h3
        className="font-heading font-bold text-lg mb-2"
        style={{ color: "oklch(0.78 0.14 75)" }}
      >
        {purpose} Muhurat
      </h3>
      <p className="text-sm mb-4" style={{ color: "oklch(0.60 0.04 55)" }}>
        Select a date range and our expert pandits will calculate the precise
        muhurat for you. Based on your birth details and local planetary
        positions.
      </p>
      <button
        type="button"
        className="px-6 py-2.5 rounded-xl font-bold text-sm transition-all hover:opacity-90"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.60 0.22 42))",
          color: "white",
        }}
        data-ocid="muhurat.consultation.primary_button"
      >
        📞 Book Consultation
      </button>
    </div>
  );
}

// ─── Login Banner ─────────────────────────────────────────────────────────────

function LoginBanner() {
  return (
    <div
      className="rounded-xl px-4 py-3 flex items-center gap-3 border"
      style={{
        background: "oklch(0.68 0.20 48 / 0.08)",
        borderColor: "oklch(0.68 0.20 48 / 0.30)",
      }}
      data-ocid="muhurat.login.banner"
    >
      <span className="text-xl">🔒</span>
      <p className="text-sm flex-1" style={{ color: "oklch(0.75 0.08 65)" }}>
        <span
          className="font-semibold"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          Login
        </span>{" "}
        to unlock personalized muhurat for your Rashi, save dates, and set
        reminders.
      </p>
      <button
        type="button"
        className="text-xs px-3 py-1.5 rounded-lg font-bold flex-shrink-0 transition-opacity hover:opacity-80"
        style={{ background: "oklch(0.68 0.20 48)", color: "white" }}
        data-ocid="muhurat.login.button"
      >
        Login
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function MuhuratCalculator() {
  const [activePurpose, setActivePurpose] = useState<PurposeId>("marriage");
  const [detailMonth, setDetailMonth] = useState<MuhuratMonth | null>(null);

  const currentPurpose = PURPOSES.find((p) => p.id === activePurpose)!;
  const muhuratData = currentPurpose.data;

  const totalShubhDays = muhuratData
    ? muhuratData.months.reduce((acc, m) => acc + m.shubhDays.length, 0)
    : 0;

  return (
    <div style={{ background: "oklch(0.13 0.04 20)", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          minHeight: "200px",
          background:
            "linear-gradient(135deg, oklch(0.16 0.08 25), oklch(0.22 0.12 40), oklch(0.18 0.08 28))",
        }}
        data-ocid="muhurat.header"
      >
        <div
          className="absolute top-0 inset-x-0 h-1"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.68 0.20 48), oklch(0.78 0.14 75), oklch(0.68 0.20 48), transparent)",
          }}
        />
        <div className="flex flex-col items-center justify-center text-center px-4 py-8 gap-3">
          <div>
            <h1
              className="font-decorative text-3xl md:text-4xl font-bold"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              Shubh Muhurat Calculator 2026
            </h1>
            <p
              className="font-body text-lg md:text-xl mt-1"
              style={{ color: "oklch(0.68 0.10 65)" }}
            >
              शुभ मुहूर्त कैलकुलेटर
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "oklch(0.55 0.06 55)" }}
            >
              {totalShubhDays > 0
                ? `${totalShubhDays} auspicious days in 2026 for ${currentPurpose.label}`
                : "Select a purpose to view muhurat"}
            </p>
          </div>
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold"
            style={{
              background: "oklch(0.68 0.20 48 / 0.12)",
              border: "1px solid oklch(0.68 0.20 48 / 0.35)",
              color: "oklch(0.78 0.14 75)",
            }}
          >
            📍 New Delhi, India
          </div>
        </div>
        <div
          className="absolute bottom-0 inset-x-0 h-1"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.78 0.14 75 / 0.4), transparent)",
          }}
        />
      </div>

      {/* Purpose Selector */}
      <div
        className="border-b"
        style={{
          background: "oklch(0.16 0.06 22)",
          borderColor: "oklch(0.28 0.08 30)",
        }}
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex overflow-x-auto gap-1 py-3 no-scrollbar">
            {PURPOSES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePurpose(p.id)}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border"
                style={
                  activePurpose === p.id
                    ? {
                        background: "oklch(0.68 0.20 48)",
                        color: "white",
                        borderColor: "oklch(0.68 0.20 48)",
                      }
                    : {
                        background: "oklch(0.20 0.07 24)",
                        color: "oklch(0.65 0.04 55)",
                        borderColor: "oklch(0.28 0.08 30)",
                      }
                }
                data-ocid={`muhurat.purpose.${p.id}.tab`}
              >
                <span>{p.emoji}</span>
                <div className="text-left">
                  <div>{p.label}</div>
                  <div className="opacity-70 font-normal text-[10px]">
                    {p.labelHi}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-5xl py-6 space-y-5">
        <LoginBanner />

        {muhuratData ? (
          <>
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  label: "Total Shubh Days",
                  value: totalShubhDays,
                  icon: "✨",
                },
                {
                  label: "Best Month",
                  value: muhuratData.months
                    .reduce(
                      (a, b) =>
                        a.shubhDays.length >= b.shubhDays.length ? a : b,
                      muhuratData.months[0],
                    )
                    .month.slice(0, 3),
                  icon: "📅",
                },
                { label: "Year", value: "2026", icon: "🗓️" },
              ].map(({ label, value, icon }) => (
                <div
                  key={label}
                  className="rounded-2xl px-4 py-3 text-center border"
                  style={{
                    background: "oklch(0.17 0.06 22)",
                    borderColor: "oklch(0.30 0.10 40)",
                  }}
                >
                  <p className="text-xl">{icon}</p>
                  <p
                    className="font-heading font-black text-xl"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    {value}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "oklch(0.50 0.04 50)" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Month grid */}
            <div>
              <h2
                className="font-heading font-bold text-base mb-3"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                {currentPurpose.emoji} {currentPurpose.label} Muhurat — All 12
                Months
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {muhuratData.months.map((month) => (
                  <MonthCard
                    key={month.monthNum}
                    month={month}
                    year={muhuratData.year}
                    onExpand={setDetailMonth}
                  />
                ))}
              </div>
            </div>

            {/* Note */}
            <div
              className="rounded-xl px-4 py-3 text-xs border"
              style={{
                background: "oklch(0.17 0.05 22)",
                borderColor: "oklch(0.28 0.06 28)",
                color: "oklch(0.52 0.04 50)",
              }}
            >
              ⚠️ All dates are for{" "}
              <strong style={{ color: "oklch(0.65 0.06 55)" }}>
                New Delhi, India
              </strong>
              . Muhurat timings may vary by location. These are approximate
              calculations — consult a qualified Jyotishi for precise
              personalized muhurat.
            </div>
          </>
        ) : (
          <ConsultationCTA purpose={currentPurpose.label} />
        )}
      </div>

      {/* Detail Modal */}
      {detailMonth && (
        <MonthDetailModal
          month={detailMonth}
          year={2026}
          onClose={() => setDetailMonth(null)}
        />
      )}
    </div>
  );
}
