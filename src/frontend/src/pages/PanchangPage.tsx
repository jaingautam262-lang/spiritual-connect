import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getAbhijitMuhurat,
  getChoghadiyaSlots,
  getDayMuhuratSlots,
  getHinduDate,
  getHoraSlots,
  getJainPraharSlots,
  getLagnaSlots,
  getNightMuhuratSlots,
  getPanchaPakshiBlocks,
  getPanchakaSlots,
  getSamvatsaraYear,
  getTimeRemaining,
  isCurrentSlot,
} from "../utils/panchang/panchangCalculations";
import {
  APRIL_2026_FESTIVALS,
  CHOGHADIYA_QUALITY,
  CITIES,
  GLOSSARY,
  HORA_PLANET_CHARACTER,
  PANCHAKA_TYPES,
  PANCHA_PAKSHI_BIRDS,
  REGIONAL_TERMINOLOGY,
} from "../utils/panchang/panchangConstants";
import { getPanchangData } from "../utils/panchang/panchangData";

// ── Constants ─────────────────────────────────────────────────────────────────

const REGIONS = [
  "Hindi",
  "Tamil",
  "Kannada",
  "Telugu",
  "Malayalam",
  "Gujarati",
  "Marathi",
  "Bengali",
  "Odia",
  "Nepali",
  "ISKCON",
];
const WEEKDAY_EN = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
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

function localRegionLabel(region: string): string {
  const labels: Record<string, string> = {
    Hindi: "हिन्दी",
    Tamil: "தமிழ்",
    Kannada: "ಕನ್ನಡ",
    Telugu: "తెలుగు",
    Malayalam: "മലയാളം",
    Gujarati: "ગુજરાતી",
    Marathi: "मराठी",
    Bengali: "বাংলা",
    Odia: "ଓଡ଼ିଆ",
    Nepali: "नेपाली",
    ISKCON: "ISKCON",
  };
  return labels[region] ?? region;
}

// ── Planet semantic color → oklch mapping ─────────────────────────────────────

function planetColor(semantic: string): string {
  const map: Record<string, string> = {
    sun: "oklch(0.72 0.18 62)",
    moon: "oklch(0.68 0.10 228)",
    mars: "oklch(0.60 0.22 20)",
    mercury: "oklch(0.62 0.16 145)",
    jupiter: "oklch(0.78 0.16 82)",
    venus: "oklch(0.70 0.18 330)",
    saturn: "oklch(0.60 0.12 260)",
  };
  return map[semantic] ?? "oklch(0.60 0.04 55)";
}

// ── Glossary Tooltip ──────────────────────────────────────────────────────────

function GlossaryTerm({
  term,
  children,
}: { term: string; children: React.ReactNode }) {
  const def = GLOSSARY[term] ?? "";
  if (!def) return <span>{children}</span>;
  return (
    <span className="relative group cursor-help inline-flex items-center gap-0.5">
      <span style={{ borderBottom: "1px dashed oklch(0.68 0.20 48 / 0.6)" }}>
        {children}
      </span>
      <span
        className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 rounded-lg px-3 py-2 text-xs leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-left"
        style={{
          background: "oklch(0.14 0.06 22)",
          border: "1px solid oklch(0.30 0.10 40)",
          color: "oklch(0.85 0.04 65)",
          boxShadow: "0 8px 24px oklch(0 0 0 / 0.5)",
        }}
      >
        <strong style={{ color: "oklch(0.78 0.14 75)" }}>{term}</strong>
        <br />
        {def}
      </span>
    </span>
  );
}

// ── Countdown Badge ───────────────────────────────────────────────────────────

function CountdownBadge({
  endTime,
  label,
}: { endTime: string; label?: string }) {
  const [remaining, setRemaining] = useState(() => getTimeRemaining(endTime));
  useEffect(() => {
    const id = setInterval(() => setRemaining(getTimeRemaining(endTime)), 1000);
    return () => clearInterval(id);
  }, [endTime]);
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold"
      style={{
        background: "oklch(0.68 0.20 48 / 0.15)",
        color: "oklch(0.68 0.20 48)",
        border: "1px solid oklch(0.68 0.20 48 / 0.3)",
      }}
    >
      {label && <span>{label}</span>}
      <span>{remaining}</span>
    </span>
  );
}

// ── Slot BG helper ────────────────────────────────────────────────────────────

type SlotBg = "green" | "red" | "yellow" | "neutral";

function slotBgStyle(bg: SlotBg, isCurrent: boolean): React.CSSProperties {
  const a = isCurrent ? "0.18" : "0.07";
  const ba = isCurrent ? "0.5" : "0.2";
  if (bg === "green")
    return {
      background: `oklch(0.55 0.18 145 / ${a})`,
      borderLeft: `3px solid oklch(0.55 0.18 145 / ${ba})`,
    };
  if (bg === "red")
    return {
      background: `oklch(0.50 0.20 20 / ${a})`,
      borderLeft: `3px solid oklch(0.50 0.20 20 / ${ba})`,
    };
  if (bg === "yellow")
    return {
      background: `oklch(0.80 0.16 82 / ${a})`,
      borderLeft: `3px solid oklch(0.80 0.16 82 / ${ba})`,
    };
  return { background: "oklch(0.17 0.05 22)" };
}

// ── Collapsible Section ───────────────────────────────────────────────────────

interface CollapsibleProps {
  id: string;
  title: React.ReactNode;
  subtitle?: string;
  activeSlotSummary?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

function CollapsibleSection({
  id,
  title,
  subtitle,
  activeSlotSummary,
  defaultOpen,
  children,
}: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  return (
    <div
      className="rounded-2xl overflow-hidden border"
      style={{ borderColor: "oklch(0.28 0.08 30)" }}
      data-ocid={`panchang.${id}.section`}
    >
      <button
        type="button"
        className="w-full flex items-center justify-between px-5 py-4 text-left gap-3 transition-colors hover:opacity-90"
        style={{
          background: open ? "oklch(0.22 0.09 25)" : "oklch(0.18 0.07 22)",
        }}
        onClick={() => setOpen((v) => !v)}
        data-ocid={`panchang.${id}.toggle`}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="font-heading font-bold text-base"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              {title}
            </span>
            {activeSlotSummary && (
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full"
                style={{
                  background: "oklch(0.68 0.20 48 / 0.12)",
                  color: "oklch(0.68 0.20 48)",
                  border: "1px solid oklch(0.68 0.20 48 / 0.25)",
                }}
              >
                {activeSlotSummary}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
        <span
          className="text-xl flex-shrink-0 transition-transform duration-200"
          style={{
            color: "oklch(0.68 0.20 48)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ▾
        </span>
      </button>
      {open && (
        <div style={{ background: "oklch(0.15 0.05 20)" }}>{children}</div>
      )}
    </div>
  );
}

// ── Sub-tabs ──────────────────────────────────────────────────────────────────

function SubTabs({
  tabs,
  active,
  onChange,
}: { tabs: string[]; active: string; onChange: (t: string) => void }) {
  return (
    <div
      className="flex gap-1 p-1 rounded-lg mx-5 mt-4"
      style={{ background: "oklch(0.20 0.07 22)" }}
    >
      {tabs.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => onChange(t)}
          className="flex-1 py-1.5 text-xs font-semibold rounded-md transition-all"
          style={
            active === t
              ? { background: "oklch(0.68 0.20 48)", color: "white" }
              : { color: "oklch(0.60 0.04 55)" }
          }
        >
          {t}
        </button>
      ))}
    </div>
  );
}

// ── Data Cell ─────────────────────────────────────────────────────────────────

function DataCell({
  label,
  value,
  sub,
}: { label: React.ReactNode; value: React.ReactNode; sub?: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-3 flex flex-col gap-0.5 border"
      style={{
        background: "oklch(0.17 0.05 22)",
        borderColor: "oklch(0.26 0.07 28)",
      }}
    >
      <span
        className="text-xs font-medium tracking-wide"
        style={{ color: "oklch(0.55 0.06 55)" }}
      >
        {label}
      </span>
      <span
        className="font-heading font-semibold text-sm leading-snug"
        style={{ color: "oklch(0.78 0.14 75)" }}
      >
        {value}
      </span>
      {sub && (
        <span className="text-xs" style={{ color: "oklch(0.50 0.04 50)" }}>
          {sub}
        </span>
      )}
    </div>
  );
}

// ── Section: Choghadiya ───────────────────────────────────────────────────────

function ChoghadiyaSection({
  sunrise,
  sunset,
  weekday,
}: { sunrise: string; sunset: string; weekday: number }) {
  const [tab, setTab] = useState("Day");
  const slots = useMemo(
    () => getChoghadiyaSlots(sunrise, sunset, weekday),
    [sunrise, sunset, weekday],
  );
  const display =
    tab === "Day"
      ? slots.filter((s) => s.isDay)
      : slots.filter((s) => !s.isDay);
  const active = display.find((s) => isCurrentSlot(s.start, s.end));

  return (
    <CollapsibleSection
      id="choghadiya"
      title={<GlossaryTerm term="Choghadiya">Choghadiya</GlossaryTerm>}
      subtitle="8 day + 8 night time slots for activity guidance"
      activeSlotSummary={
        active ? `${active.name} · ends ${active.end}` : undefined
      }
      defaultOpen
    >
      <SubTabs tabs={["Day", "Night"]} active={tab} onChange={setTab} />
      <div className="px-5 pb-5 pt-3 space-y-1.5">
        {display.map((slot, i) => {
          const isCurrent = isCurrentSlot(slot.start, slot.end);
          const bg: SlotBg = slot.isAuspicious
            ? "green"
            : slot.isInauspicious
              ? "red"
              : "yellow";
          const q = CHOGHADIYA_QUALITY[slot.name];
          return (
            <div
              key={`${slot.name}-${tab}-${i}`}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm"
              style={slotBgStyle(bg, isCurrent)}
              data-ocid={`panchang.choghadiya.item.${i + 1}`}
            >
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{
                  background: slot.isAuspicious
                    ? "oklch(0.55 0.18 145)"
                    : slot.isInauspicious
                      ? "oklch(0.50 0.20 20)"
                      : "oklch(0.80 0.16 82)",
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="font-heading font-bold"
                    style={{
                      color: isCurrent
                        ? "oklch(0.90 0.10 65)"
                        : "oklch(0.78 0.14 75)",
                    }}
                  >
                    {slot.name}
                  </span>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full"
                    style={{
                      background: slot.isAuspicious
                        ? "oklch(0.55 0.18 145 / 0.15)"
                        : slot.isInauspicious
                          ? "oklch(0.50 0.20 20 / 0.15)"
                          : "oklch(0.80 0.16 82 / 0.15)",
                      color: slot.isAuspicious
                        ? "oklch(0.65 0.18 145)"
                        : slot.isInauspicious
                          ? "oklch(0.65 0.20 20)"
                          : "oklch(0.75 0.14 82)",
                    }}
                  >
                    {slot.isAuspicious
                      ? "Auspicious"
                      : slot.isInauspicious
                        ? "Inauspicious"
                        : "Neutral"}
                  </span>
                  {isCurrent && (
                    <CountdownBadge endTime={slot.end} label="ends in" />
                  )}
                </div>
                {q?.description && (
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "oklch(0.55 0.04 50)" }}
                  >
                    {q.description}
                  </p>
                )}
              </div>
              <div
                className="text-right text-xs flex-shrink-0"
                style={{ color: "oklch(0.60 0.04 55)" }}
              >
                <div>{slot.start}</div>
                <div>{slot.end}</div>
              </div>
            </div>
          );
        })}
      </div>
    </CollapsibleSection>
  );
}

// ── Section: Hora ─────────────────────────────────────────────────────────────

function HoraSection({
  sunrise,
  sunset,
  nextSunrise,
  weekday,
}: { sunrise: string; sunset: string; nextSunrise: string; weekday: number }) {
  const [tab, setTab] = useState("Day Hora");
  const slots = useMemo(
    () => getHoraSlots(sunrise, sunset, nextSunrise, weekday),
    [sunrise, sunset, nextSunrise, weekday],
  );
  const display =
    tab === "Day Hora"
      ? slots.filter((s) => s.isDay)
      : slots.filter((s) => !s.isDay);
  const active = display.find((s) => isCurrentSlot(s.start, s.end));

  return (
    <CollapsibleSection
      id="hora"
      title={<GlossaryTerm term="Hora">Hora Chakra</GlossaryTerm>}
      subtitle="12 day + 12 night planetary hours"
      activeSlotSummary={
        active ? `${active.planet} Hora · ends ${active.end}` : undefined
      }
    >
      <SubTabs
        tabs={["Day Hora", "Night Hora"]}
        active={tab}
        onChange={setTab}
      />
      <div className="px-5 pb-5 pt-3 space-y-1.5">
        {display.map((slot, i) => {
          const isCurrent = isCurrentSlot(slot.start, slot.end);
          const pInfo = HORA_PLANET_CHARACTER[slot.planet];
          return (
            <div
              key={`${slot.planet}-${slot.start}`}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all"
              style={{
                background: isCurrent
                  ? "oklch(0.68 0.20 48 / 0.12)"
                  : "oklch(0.17 0.05 22)",
                border: isCurrent
                  ? "1px solid oklch(0.68 0.20 48 / 0.4)"
                  : "1px solid transparent",
              }}
              data-ocid={`panchang.hora.item.${i + 1}`}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{
                  background: "oklch(0.22 0.08 30)",
                  color: "oklch(0.78 0.14 75)",
                }}
              >
                {slot.planet.slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="font-heading font-bold"
                    style={{
                      color: isCurrent
                        ? "oklch(0.90 0.10 65)"
                        : "oklch(0.82 0.06 65)",
                    }}
                  >
                    {slot.planet}
                  </span>
                  {isCurrent && (
                    <CountdownBadge endTime={slot.end} label="ends in" />
                  )}
                </div>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: planetColor(pInfo?.color ?? "") }}
                >
                  {slot.character}
                </p>
              </div>
              <div
                className="text-right text-xs flex-shrink-0"
                style={{ color: "oklch(0.60 0.04 55)" }}
              >
                <div>{slot.start}</div>
                <div>{slot.end}</div>
              </div>
            </div>
          );
        })}
      </div>
    </CollapsibleSection>
  );
}

// ── Section: Lagna ────────────────────────────────────────────────────────────

function LagnaSection({ sunrise }: { sunrise: string }) {
  const slots = useMemo(() => getLagnaSlots(sunrise), [sunrise]);
  const active = slots.find((s) => isCurrentSlot(s.start, s.end));

  return (
    <CollapsibleSection
      id="lagna"
      title={<GlossaryTerm term="Lagna">Lagna Table</GlossaryTerm>}
      subtitle="Rising sign (Ascendant) changes every ~2 hours"
      activeSlotSummary={
        active ? `${active.rashi} · ends ${active.end}` : undefined
      }
    >
      <div className="px-5 pb-5 pt-4">
        <div
          className="rounded-xl overflow-hidden border"
          style={{ borderColor: "oklch(0.26 0.07 28)" }}
        >
          <div
            className="grid grid-cols-4 text-xs font-semibold px-3 py-2"
            style={{
              background: "oklch(0.20 0.07 22)",
              color: "oklch(0.55 0.06 55)",
            }}
          >
            <span>Rashi</span>
            <span className="text-center">Start</span>
            <span className="text-center">End</span>
            <span className="text-center">Pushkara</span>
          </div>
          {slots.map((slot, i) => {
            const isCurrent = isCurrentSlot(slot.start, slot.end);
            return (
              <div
                key={slot.rashi}
                className="grid grid-cols-4 items-center px-3 py-2.5 text-sm border-t"
                style={{
                  background: isCurrent
                    ? "oklch(0.68 0.20 48 / 0.12)"
                    : i % 2 === 0
                      ? "oklch(0.17 0.05 22)"
                      : "oklch(0.15 0.04 20)",
                  borderColor: "oklch(0.22 0.06 24)",
                  borderLeft: isCurrent
                    ? "3px solid oklch(0.68 0.20 48)"
                    : "3px solid transparent",
                }}
                data-ocid={`panchang.lagna.item.${i + 1}`}
              >
                <span
                  className="font-heading font-semibold"
                  style={{
                    color: isCurrent
                      ? "oklch(0.90 0.10 65)"
                      : "oklch(0.78 0.14 75)",
                  }}
                >
                  {slot.rashi}
                  {isCurrent && (
                    <span
                      className="ml-1 text-xs"
                      style={{ color: "oklch(0.68 0.20 48)" }}
                    >
                      ⬤
                    </span>
                  )}
                </span>
                <span
                  className="text-center text-xs"
                  style={{ color: "oklch(0.65 0.04 55)" }}
                >
                  {slot.start}
                </span>
                <span
                  className="text-center text-xs"
                  style={{ color: "oklch(0.65 0.04 55)" }}
                >
                  {slot.end}
                </span>
                <span
                  className="text-center text-xs"
                  style={{ color: "oklch(0.55 0.08 60)" }}
                >
                  {slot.pushkaraNavamshaTime}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </CollapsibleSection>
  );
}

// ── Section: Abhijit ──────────────────────────────────────────────────────────

function AbhijitSection({
  sunrise,
  sunset,
  weekday,
}: { sunrise: string; sunset: string; weekday: number }) {
  const muhurat = useMemo(
    () => getAbhijitMuhurat(sunrise, sunset),
    [sunrise, sunset],
  );
  const isWed = weekday === 3;
  const isCurrent = isCurrentSlot(muhurat.start, muhurat.end);

  return (
    <CollapsibleSection
      id="abhijit"
      title={
        <GlossaryTerm term="Abhijit Muhurat">Abhijit Muhurat</GlossaryTerm>
      }
      subtitle="Most powerful auspicious time ~solar noon"
      activeSlotSummary={isCurrent ? `Active · ends ${muhurat.end}` : undefined}
    >
      <div className="px-5 pb-5 pt-4">
        <div
          className="rounded-xl p-5 border"
          style={{
            background:
              isCurrent && !isWed
                ? "oklch(0.55 0.18 145 / 0.12)"
                : "oklch(0.17 0.05 22)",
            borderColor: isWed
              ? "oklch(0.30 0.08 20 / 0.4)"
              : "oklch(0.55 0.18 145 / 0.3)",
          }}
          data-ocid="panchang.abhijit.card"
        >
          {isWed && (
            <div
              className="mb-3 text-sm px-3 py-2 rounded-lg border"
              style={{
                background: "oklch(0.50 0.20 20 / 0.1)",
                borderColor: "oklch(0.50 0.20 20 / 0.3)",
                color: "oklch(0.65 0.20 20)",
              }}
            >
              Note: Abhijit Muhurat is not considered auspicious on Wednesdays
            </div>
          )}
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { label: "Start", value: muhurat.start },
              { label: "End", value: muhurat.end },
              { label: "Duration", value: muhurat.duration },
            ].map(({ label, value }) => (
              <div key={label}>
                <p
                  className="text-xs mb-1"
                  style={{ color: "oklch(0.55 0.06 55)" }}
                >
                  {label}
                </p>
                <p
                  className="font-heading font-bold text-lg"
                  style={{
                    color: isWed
                      ? "oklch(0.60 0.04 55)"
                      : "oklch(0.78 0.14 75)",
                  }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
          {isCurrent && !isWed && (
            <div className="mt-4 flex justify-center">
              <CountdownBadge
                endTime={muhurat.end}
                label="Currently active · ends in"
              />
            </div>
          )}
        </div>
      </div>
    </CollapsibleSection>
  );
}

// ── Section: Do Ghati Muhurat ─────────────────────────────────────────────────

function MuhuratSection({
  sunrise,
  sunset,
  nextSunrise,
}: { sunrise: string; sunset: string; nextSunrise: string }) {
  const [tab, setTab] = useState("Day (15)");
  const daySlots = useMemo(
    () => getDayMuhuratSlots(sunrise, sunset),
    [sunrise, sunset],
  );
  const nightSlots = useMemo(
    () => getNightMuhuratSlots(sunset, nextSunrise),
    [sunset, nextSunrise],
  );
  const display = tab === "Day (15)" ? daySlots : nightSlots;
  const active = display.find((s) => isCurrentSlot(s.start, s.end));

  return (
    <CollapsibleSection
      id="muhurat"
      title={<GlossaryTerm term="Muhurat">Do Ghati Muhurat</GlossaryTerm>}
      subtitle="30 muhurat time slots (15 day + 15 night)"
      activeSlotSummary={
        active ? `${active.name} · ${active.quality}` : undefined
      }
    >
      <SubTabs
        tabs={["Day (15)", "Night (15)"]}
        active={tab}
        onChange={setTab}
      />
      <div className="px-5 pb-5 pt-3 space-y-1.5">
        {display.map((slot, i) => {
          const isCurrent = isCurrentSlot(slot.start, slot.end);
          const bg: SlotBg =
            slot.quality === "good"
              ? "green"
              : slot.quality === "bad"
                ? "red"
                : "neutral";
          return (
            <div
              key={`${slot.name}-${slot.start}`}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm"
              style={slotBgStyle(bg, isCurrent)}
              data-ocid={`panchang.muhurat.item.${i + 1}`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="font-heading font-semibold"
                    style={{
                      color: isCurrent
                        ? "oklch(0.90 0.10 65)"
                        : "oklch(0.78 0.14 75)",
                    }}
                  >
                    {slot.name}
                  </span>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full"
                    style={{
                      background:
                        slot.quality === "good"
                          ? "oklch(0.55 0.18 145 / 0.15)"
                          : "oklch(0.50 0.20 20 / 0.15)",
                      color:
                        slot.quality === "good"
                          ? "oklch(0.65 0.18 145)"
                          : "oklch(0.65 0.20 20)",
                    }}
                  >
                    {slot.quality === "good" ? "Auspicious" : "Inauspicious"}
                  </span>
                  {isCurrent && (
                    <CountdownBadge endTime={slot.end} label="ends in" />
                  )}
                </div>
              </div>
              <div
                className="text-right text-xs flex-shrink-0"
                style={{ color: "oklch(0.60 0.04 55)" }}
              >
                <div>{slot.start}</div>
                <div>{slot.end}</div>
              </div>
            </div>
          );
        })}
      </div>
    </CollapsibleSection>
  );
}

// ── Section: Panchaka ─────────────────────────────────────────────────────────

function PanchakaSection({
  sunrise,
  sunset,
  nextSunrise,
  tithiIdx,
  nakshatraIdx,
}: {
  sunrise: string;
  sunset: string;
  nextSunrise: string;
  tithiIdx: number;
  nakshatraIdx: number;
}) {
  const slots = useMemo(
    () =>
      getPanchakaSlots(sunrise, sunset, nextSunrise, tithiIdx, nakshatraIdx),
    [sunrise, sunset, nextSunrise, tithiIdx, nakshatraIdx],
  );
  const active = slots.find((s) => isCurrentSlot(s.start, s.end));

  return (
    <CollapsibleSection
      id="panchaka"
      title={
        <GlossaryTerm term="Panchaka">Panchaka Rahita Muhurat</GlossaryTerm>
      }
      subtitle="5+5 daily Panchaka-quality time blocks"
      activeSlotSummary={
        active ? `${active.type} · ends ${active.end}` : undefined
      }
    >
      <div className="px-5 pb-5 pt-4 grid sm:grid-cols-2 gap-2">
        {slots.map((slot, i) => {
          const pInfo = PANCHAKA_TYPES[slot.type];
          const isCurrent = isCurrentSlot(slot.start, slot.end);
          return (
            <div
              key={`${slot.type}-${slot.start}`}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm border"
              style={{
                background: isCurrent
                  ? "oklch(0.68 0.20 48 / 0.10)"
                  : "oklch(0.17 0.05 22)",
                borderColor: isCurrent
                  ? "oklch(0.68 0.20 48 / 0.35)"
                  : "oklch(0.24 0.06 25)",
              }}
              data-ocid={`panchang.panchaka.item.${i + 1}`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="font-heading font-semibold text-sm"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    {slot.type}
                  </span>
                  <span
                    className="text-xs"
                    style={{
                      color:
                        i < 5 ? "oklch(0.55 0.08 120)" : "oklch(0.55 0.08 240)",
                    }}
                  >
                    {i < 5 ? "Day" : "Night"}
                  </span>
                  {isCurrent && (
                    <CountdownBadge endTime={slot.end} label="ends in" />
                  )}
                </div>
                {pInfo?.description && (
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "oklch(0.52 0.04 50)" }}
                  >
                    {pInfo.description}
                  </p>
                )}
              </div>
              <div
                className="text-right text-xs"
                style={{ color: "oklch(0.60 0.04 55)" }}
              >
                <div>{slot.start}</div>
                <div>{slot.end}</div>
              </div>
            </div>
          );
        })}
      </div>
    </CollapsibleSection>
  );
}

// ── Section: Jain Prahar ──────────────────────────────────────────────────────

function JainPraharSection({
  sunrise,
  sunset,
}: { sunrise: string; sunset: string }) {
  const [tab, setTab] = useState("Day Prahar");
  const slots = useMemo(
    () => getJainPraharSlots(sunrise, sunset),
    [sunrise, sunset],
  );
  const display =
    tab === "Day Prahar"
      ? slots.filter((s) => s.isDay)
      : slots.filter((s) => !s.isDay);
  const active = display.find((s) => isCurrentSlot(s.start, s.end));

  return (
    <CollapsibleSection
      id="jain-prahar"
      title={<GlossaryTerm term="Jain Prahar">Jain Pachchakkhaan</GlossaryTerm>}
      subtitle="8 Prahars with key spiritual moments for Jain fasting vows"
      activeSlotSummary={
        active
          ? `Prahar ${active.praharNumber} · ${active.keyMomentName}`
          : undefined
      }
    >
      <SubTabs
        tabs={["Day Prahar", "Night Prahar"]}
        active={tab}
        onChange={setTab}
      />
      <div className="px-5 pb-5 pt-3 space-y-2">
        {display.map((slot, i) => {
          const isCurrent = isCurrentSlot(slot.start, slot.end);
          return (
            <div
              key={`prahar-${slot.praharNumber}-${slot.start}`}
              className="rounded-xl p-4 border text-sm"
              style={{
                background: isCurrent
                  ? "oklch(0.68 0.20 48 / 0.10)"
                  : "oklch(0.17 0.05 22)",
                borderColor: isCurrent
                  ? "oklch(0.68 0.20 48 / 0.40)"
                  : "oklch(0.24 0.06 25)",
              }}
              data-ocid={`panchang.jain-prahar.item.${i + 1}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="inline-flex items-center justify-center w-7 h-7 rounded-full font-bold text-xs"
                      style={{
                        background: "oklch(0.78 0.14 75 / 0.18)",
                        color: "oklch(0.78 0.14 75)",
                      }}
                    >
                      {slot.praharNumber}
                    </span>
                    <span
                      className="font-heading font-semibold"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      Prahar {slot.praharNumber}
                    </span>
                    {isCurrent && (
                      <CountdownBadge endTime={slot.end} label="ends in" />
                    )}
                  </div>
                  <p
                    className="text-xs ml-9"
                    style={{ color: "oklch(0.60 0.04 55)" }}
                  >
                    {slot.start} – {slot.end}
                  </p>
                </div>
                {slot.keyMomentName && (
                  <div className="text-right">
                    <p
                      className="text-xs font-semibold"
                      style={{ color: "oklch(0.68 0.20 48)" }}
                    >
                      {slot.keyMomentName}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "oklch(0.55 0.04 50)" }}
                    >
                      {slot.keyMomentTime}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </CollapsibleSection>
  );
}

// ── Section: Pancha Pakshi ────────────────────────────────────────────────────

function pakshiQStyle(quality: string): React.CSSProperties {
  if (quality === "Very Good")
    return {
      background: "oklch(0.25 0.12 145)",
      borderColor: "oklch(0.45 0.18 145 / 0.5)",
      color: "oklch(0.75 0.18 145)",
    };
  if (quality === "Good")
    return {
      background: "oklch(0.22 0.08 145)",
      borderColor: "oklch(0.45 0.15 145 / 0.35)",
      color: "oklch(0.70 0.14 145)",
    };
  if (quality === "Average/Bad")
    return {
      background: "oklch(0.22 0.07 40)",
      borderColor: "oklch(0.55 0.18 40 / 0.35)",
      color: "oklch(0.70 0.18 50)",
    };
  if (quality === "Very Bad")
    return {
      background: "oklch(0.20 0.08 20)",
      borderColor: "oklch(0.50 0.20 20 / 0.5)",
      color: "oklch(0.65 0.20 20)",
    };
  return {
    background: "oklch(0.22 0.07 82)",
    borderColor: "oklch(0.60 0.14 82 / 0.35)",
    color: "oklch(0.75 0.12 82)",
  };
}

function PanchaPakshiSection({
  sunrise,
  sunset,
}: { sunrise: string; sunset: string }) {
  const [bird, setBird] = useState("Vulture");
  const [expandedBlock, setExpandedBlock] = useState<number | null>(null);
  const blocks = useMemo(
    () => getPanchaPakshiBlocks(sunrise, sunset, bird),
    [sunrise, sunset, bird],
  );
  const active = blocks.find((b) => isCurrentSlot(b.start, b.end));

  return (
    <CollapsibleSection
      id="pancha-pakshi"
      title={
        <GlossaryTerm term="Pancha Pakshi">Pancha Pakshi System</GlossaryTerm>
      }
      subtitle="Five Bird System — South Indian activity timing"
      activeSlotSummary={
        active
          ? `${active.bird} · ${active.activity} · ${active.quality}`
          : undefined
      }
    >
      <div className="px-5 pt-4">
        <p
          className="text-xs mb-2 font-semibold"
          style={{ color: "oklch(0.55 0.06 55)" }}
        >
          Select Your Ruling Bird:
        </p>
        <div className="flex gap-1.5 flex-wrap">
          {PANCHA_PAKSHI_BIRDS.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBird(b)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border"
              style={
                bird === b
                  ? {
                      background: "oklch(0.68 0.20 48)",
                      color: "white",
                      borderColor: "oklch(0.68 0.20 48)",
                    }
                  : {
                      background: "oklch(0.20 0.07 22)",
                      color: "oklch(0.65 0.04 55)",
                      borderColor: "oklch(0.26 0.07 28)",
                    }
              }
              data-ocid={`panchang.pakshi.bird.${b.toLowerCase()}`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>
      <div className="px-5 pb-5 pt-3 space-y-2">
        {blocks.map((block, i) => {
          const isCurrent = isCurrentSlot(block.start, block.end);
          const qStyle = pakshiQStyle(block.quality);
          const isExpanded = expandedBlock === i;
          const blockKey = `${block.bird}-${block.start}-${i}`;
          return (
            <div
              key={blockKey}
              className="rounded-xl overflow-hidden border"
              style={{ borderColor: String(qStyle.borderColor) }}
              data-ocid={`panchang.pakshi.block.${i + 1}`}
            >
              <button
                type="button"
                className="w-full flex items-center gap-3 px-4 py-3 text-left"
                style={{ background: String(qStyle.background) }}
                onClick={() => setExpandedBlock(isExpanded ? null : i)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="font-heading font-semibold text-sm"
                      style={{ color: String(qStyle.color) }}
                    >
                      {block.bird}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: "oklch(0 0 0 / 0.2)",
                        color: String(qStyle.color),
                      }}
                    >
                      {block.activity}
                    </span>
                    <span
                      className="text-xs font-bold"
                      style={{ color: String(qStyle.color) }}
                    >
                      {block.quality}
                    </span>
                    {isCurrent && (
                      <CountdownBadge endTime={block.end} label="ends in" />
                    )}
                  </div>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "oklch(0.60 0.04 55)" }}
                  >
                    {block.isDay ? "Day" : "Night"} · {block.start} –{" "}
                    {block.end}
                  </p>
                </div>
                <span
                  style={{
                    color: String(qStyle.color),
                    transform: isExpanded ? "rotate(180deg)" : "none",
                    transition: "transform 0.2s",
                  }}
                >
                  ▾
                </span>
              </button>
              {isExpanded && (
                <div
                  className="px-4 pb-3 pt-2 space-y-1.5"
                  style={{ background: "oklch(0.15 0.04 20)" }}
                >
                  <p
                    className="text-xs font-semibold mb-2"
                    style={{ color: "oklch(0.55 0.06 55)" }}
                  >
                    All 5 Birds in this Block:
                  </p>
                  {block.subSlots.map((sub) => {
                    const subQ = pakshiQStyle(sub.quality);
                    return (
                      <div
                        key={sub.activity}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
                        style={{
                          background: String(subQ.background),
                          border: `1px solid ${String(subQ.borderColor)}`,
                        }}
                      >
                        <span
                          className="flex-1 font-semibold"
                          style={{ color: String(subQ.color) }}
                        >
                          {sub.activity}
                        </span>
                        <span style={{ color: String(subQ.color) }}>
                          {sub.quality}
                        </span>
                        <span style={{ color: "oklch(0.60 0.04 55)" }}>
                          {sub.start}–{sub.end}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </CollapsibleSection>
  );
}

// ── Monthly Calendar ──────────────────────────────────────────────────────────

function MonthlyCalendar({
  selectedDate,
  onDateSelect,
}: { selectedDate: Date; onDateSelect: (d: Date) => void }) {
  const [viewMonth, setViewMonth] = useState(selectedDate.getMonth());
  const [viewYear, setViewYear] = useState(selectedDate.getFullYear());
  const [showFestivals, setShowFestivals] = useState(false);
  const today = new Date();

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

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

  const festivalDates = useMemo(() => {
    const s = new Set<string>();
    for (const f of APRIL_2026_FESTIVALS) s.add(f.date);
    return s;
  }, []);
  const monthFestivals = APRIL_2026_FESTIVALS.filter((f) => {
    const d = new Date(f.date);
    return d.getMonth() === viewMonth && d.getFullYear() === viewYear;
  });

  // Build cells as tagged objects to avoid index-as-key
  type CalendarCell = { key: string; day: number | null };
  const cells: CalendarCell[] = [];
  for (let i = 0; i < firstDay; i++)
    cells.push({ key: `empty-${viewYear}-${viewMonth}-${i}`, day: null });
  for (let d = 1; d <= daysInMonth; d++)
    cells.push({ key: `day-${viewYear}-${viewMonth}-${d}`, day: d });

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ borderColor: "oklch(0.28 0.08 30)" }}
      data-ocid="panchang.calendar.section"
    >
      <div
        className="flex items-center justify-between px-5 py-4 border-b"
        style={{
          background: "oklch(0.20 0.08 24)",
          borderColor: "oklch(0.28 0.08 30)",
        }}
      >
        <button
          type="button"
          onClick={prevMonth}
          className="w-9 h-9 rounded-full flex items-center justify-center text-xl font-bold transition-colors hover:opacity-80"
          style={{
            background: "oklch(0.68 0.20 48 / 0.15)",
            color: "oklch(0.78 0.14 75)",
          }}
          data-ocid="panchang.calendar.prev"
          aria-label="Previous month"
        >
          ‹
        </button>
        <div className="text-center">
          <h3
            className="font-heading font-bold"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {MONTH_NAMES[viewMonth]} {viewYear}
          </h3>
          <p className="text-xs" style={{ color: "oklch(0.55 0.06 55)" }}>
            Vikram Samvat {viewMonth >= 3 ? viewYear + 57 : viewYear + 56}
          </p>
        </div>
        <button
          type="button"
          onClick={nextMonth}
          className="w-9 h-9 rounded-full flex items-center justify-center text-xl font-bold transition-colors hover:opacity-80"
          style={{
            background: "oklch(0.68 0.20 48 / 0.15)",
            color: "oklch(0.78 0.14 75)",
          }}
          data-ocid="panchang.calendar.next"
          aria-label="Next month"
        >
          ›
        </button>
      </div>
      <div
        className="grid grid-cols-7 border-b"
        style={{
          background: "oklch(0.18 0.07 22)",
          borderColor: "oklch(0.24 0.06 26)",
        }}
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div
            key={d}
            className="text-center text-xs font-semibold py-2"
            style={{ color: "oklch(0.55 0.06 55)" }}
          >
            {d}
          </div>
        ))}
      </div>
      <div
        className="grid grid-cols-7 gap-px"
        style={{ background: "oklch(0.22 0.06 24)" }}
      >
        {cells.map((cell) => {
          const { key, day } = cell;
          if (day === null)
            return (
              <div key={key} style={{ background: "oklch(0.15 0.04 20)" }} />
            );
          const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isToday =
            today.getDate() === day &&
            today.getMonth() === viewMonth &&
            today.getFullYear() === viewYear;
          const isSelected =
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === viewMonth &&
            selectedDate.getFullYear() === viewYear;
          const hasFestival = festivalDates.has(dateStr);
          const tithiIdx = (day + 17) % 30;
          const paksha = tithiIdx < 15 ? "S" : "K";
          const tithiNum = (tithiIdx % 15) + 1;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onDateSelect(new Date(viewYear, viewMonth, day))}
              className="p-1.5 text-center min-h-12 flex flex-col items-center justify-start gap-0.5 transition-all hover:opacity-90"
              style={{
                background: isSelected
                  ? "oklch(0.68 0.20 48 / 0.25)"
                  : "oklch(0.16 0.05 20)",
                outline: isToday ? "2px solid oklch(0.78 0.14 75)" : undefined,
                outlineOffset: "-2px",
              }}
              data-ocid={`panchang.calendar.day.${day}`}
              aria-label={`${day} ${MONTH_NAMES[viewMonth]}`}
            >
              <span
                className="font-bold text-sm"
                style={{
                  color: isSelected
                    ? "oklch(0.88 0.12 75)"
                    : isToday
                      ? "oklch(0.78 0.14 75)"
                      : "oklch(0.80 0.04 60)",
                }}
              >
                {day}
              </span>
              <span
                className="text-[9px] leading-none"
                style={{ color: "oklch(0.55 0.08 60)" }}
              >
                {paksha}
                {tithiNum}
              </span>
              {hasFestival && (
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "oklch(0.68 0.20 48)" }}
                />
              )}
            </button>
          );
        })}
      </div>
      <div
        className="flex items-center gap-4 px-5 py-2 border-t text-xs"
        style={{
          background: "oklch(0.16 0.05 20)",
          borderColor: "oklch(0.24 0.06 26)",
          color: "oklch(0.52 0.04 50)",
        }}
      >
        <span className="flex items-center gap-1">
          <span
            className="w-3 h-3 rounded-full"
            style={{ background: "oklch(0.68 0.20 48)" }}
          />{" "}
          Festival
        </span>
        <span>S = Shukla · K = Krishna</span>
      </div>
      {monthFestivals.length > 0 && (
        <div style={{ background: "oklch(0.15 0.04 20)" }}>
          <button
            type="button"
            onClick={() => setShowFestivals((v) => !v)}
            className="w-full flex items-center justify-between px-5 py-3 text-sm font-semibold border-t"
            style={{
              borderColor: "oklch(0.24 0.06 26)",
              color: "oklch(0.78 0.14 75)",
            }}
            data-ocid="panchang.festivals.toggle"
          >
            <span>Festivals this Month ({monthFestivals.length})</span>
            <span
              style={{
                transform: showFestivals ? "rotate(180deg)" : "none",
                transition: "transform 0.2s",
              }}
            >
              ▾
            </span>
          </button>
          {showFestivals && (
            <div className="px-5 pb-4 space-y-2">
              {monthFestivals.map((f, i) => (
                <div
                  key={f.date}
                  className="flex items-start gap-3 text-sm py-2 border-b last:border-b-0"
                  style={{ borderColor: "oklch(0.22 0.06 24)" }}
                  data-ocid={`panchang.festival.item.${i + 1}`}
                >
                  <div className="text-right flex-shrink-0 w-16">
                    <p
                      className="font-semibold"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      {new Date(f.date).getDate()}{" "}
                      {MONTH_NAMES[new Date(f.date).getMonth()].slice(0, 3)}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "oklch(0.55 0.04 50)" }}
                    >
                      {f.weekday.slice(0, 3)}
                    </p>
                  </div>
                  <div className="flex-1 min-w-0">
                    {f.festivals.map((name) => (
                      <p key={name} style={{ color: "oklch(0.82 0.06 65)" }}>
                        {name}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function PanchangPage() {
  const today = new Date();
  const [selectedCity, setSelectedCity] = useState("delhi");
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedRegion, setSelectedRegion] = useState("Hindi");
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const id = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const panchangData = useMemo(
    () => getPanchangData(selectedCity, selectedDate),
    [selectedCity, selectedDate],
  );
  const terminology = useMemo(
    () => REGIONAL_TERMINOLOGY[selectedRegion] ?? REGIONAL_TERMINOLOGY.Hindi,
    [selectedRegion],
  );
  const hinduDate = useMemo(() => getHinduDate(selectedDate), [selectedDate]);
  const samvatsara = useMemo(
    () => getSamvatsaraYear(selectedDate),
    [selectedDate],
  );
  const city = useMemo(
    () => CITIES.find((c) => c.id === selectedCity) ?? CITIES[0],
    [selectedCity],
  );

  const tithiIdx = hinduDate.tithiIndex;
  const nakshatraIdx = useMemo(() => {
    const idx = terminology.nakshatraNames.indexOf(panchangData.nakshatra.name);
    return idx !== -1 ? idx : 0;
  }, [panchangData.nakshatra.name, terminology.nakshatraNames]);

  const localTithi =
    terminology.tithiNames[tithiIdx] ?? panchangData.tithi.name;
  const localWeekday =
    terminology.weekdayNames[panchangData.weekday] ??
    WEEKDAY_EN[panchangData.weekday];
  const localPaksha =
    terminology.pakshaNames[panchangData.paksha === "Shukla" ? 0 : 1] ??
    panchangData.paksha;

  const prevDay = useCallback(() => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    setSelectedDate(d);
  }, [selectedDate]);
  const nextDay = useCallback(() => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    setSelectedDate(d);
  }, [selectedDate]);
  const goToday = useCallback(() => setSelectedDate(new Date()), []);

  const dateStr = selectedDate.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const hinduDateStr = `${localPaksha} ${localTithi}, ${hinduDate.month}`;
  const formattedTime = currentTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const dateInputVal = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

  return (
    <div style={{ background: "oklch(0.13 0.04 20)", minHeight: "100vh" }}>
      {/* ── Page Header ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          minHeight: "220px",
          background:
            "linear-gradient(135deg, oklch(0.16 0.08 25), oklch(0.22 0.12 40), oklch(0.18 0.08 28))",
        }}
        data-ocid="panchang.header"
      >
        <div
          className="absolute top-0 inset-x-0 h-1"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.68 0.20 48), oklch(0.78 0.14 75), oklch(0.68 0.20 48), transparent)",
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 py-8 gap-4">
          <div>
            <h1
              className="font-decorative text-3xl md:text-5xl font-bold mb-1"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              Panchang
            </h1>
            <p
              className="font-body text-xl md:text-2xl"
              style={{ color: "oklch(0.68 0.10 65)" }}
            >
              पंचांग
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "oklch(0.55 0.06 55)" }}
            >
              Hindu Calendar · Daily Timings · Muhurat
            </p>
          </div>

          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono"
            style={{
              background: "oklch(0.10 0.04 20 / 0.6)",
              border: "1px solid oklch(0.30 0.10 40)",
              color: "oklch(0.78 0.14 75)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "oklch(0.55 0.18 145)" }}
            />
            {formattedTime}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-wrap justify-center">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="rounded-xl px-4 py-2 text-sm font-semibold border cursor-pointer"
              style={{
                background: "oklch(0.18 0.07 24)",
                borderColor: "oklch(0.35 0.12 45)",
                color: "oklch(0.78 0.14 75)",
              }}
              data-ocid="panchang.city.select"
              aria-label="Select city"
            >
              {CITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <div
              className="flex items-center gap-1 rounded-xl border overflow-hidden"
              style={{
                borderColor: "oklch(0.35 0.12 45)",
                background: "oklch(0.18 0.07 24)",
              }}
            >
              <button
                type="button"
                onClick={prevDay}
                className="px-3 py-2 text-sm font-bold transition-colors hover:opacity-80"
                style={{ color: "oklch(0.78 0.14 75)" }}
                data-ocid="panchang.date.prev"
                aria-label="Previous day"
              >
                ‹
              </button>
              <input
                type="date"
                value={dateInputVal}
                onChange={(e) => {
                  const parts = e.target.value.split("-").map(Number);
                  if (parts.length === 3)
                    setSelectedDate(new Date(parts[0], parts[1] - 1, parts[2]));
                }}
                className="px-2 py-2 text-sm border-0 bg-transparent cursor-pointer"
                style={{ color: "oklch(0.82 0.08 65)", colorScheme: "dark" }}
                data-ocid="panchang.date.input"
                aria-label="Select date"
              />
              <button
                type="button"
                onClick={goToday}
                className="px-3 py-2 text-xs font-semibold transition-colors hover:opacity-80"
                style={{
                  color: "oklch(0.68 0.20 48)",
                  borderLeft: "1px solid oklch(0.28 0.08 30)",
                }}
                data-ocid="panchang.date.today"
              >
                Today
              </button>
              <button
                type="button"
                onClick={nextDay}
                className="px-3 py-2 text-sm font-bold transition-colors hover:opacity-80"
                style={{ color: "oklch(0.78 0.14 75)" }}
                data-ocid="panchang.date.next"
                aria-label="Next day"
              >
                ›
              </button>
            </div>
          </div>

          <div className="text-center space-y-1">
            <p
              className="text-sm font-semibold"
              style={{ color: "oklch(0.82 0.06 65)" }}
            >
              {dateStr}
            </p>
            <p className="text-xs" style={{ color: "oklch(0.65 0.10 60)" }}>
              {hinduDateStr}
            </p>
            <p className="text-xs" style={{ color: "oklch(0.50 0.04 50)" }}>
              All timings shown in {city.name} local time ({city.offset} IST)
            </p>
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

      {/* ── Quick Navigation to Sub-Pages ── */}
      <div
        className="w-full border-b"
        style={{
          background: "oklch(0.16 0.06 22)",
          borderColor: "oklch(0.28 0.08 30)",
        }}
      >
        <div className="container mx-auto px-4 max-w-5xl py-3 flex flex-wrap gap-3">
          <Link
            to="/panchang/timings"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors hover:opacity-90"
            style={{
              background: "oklch(0.22 0.10 48)",
              borderColor: "oklch(0.45 0.18 55)",
              color: "oklch(0.90 0.08 70)",
            }}
            data-ocid="panchang.timings_link"
          >
            ☀️ Monthly Timings (Sun &amp; Moon)
          </Link>
          <Link
            to="/panchang/festivals"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors hover:opacity-90"
            style={{
              background: "oklch(0.22 0.10 48)",
              borderColor: "oklch(0.45 0.18 55)",
              color: "oklch(0.90 0.08 70)",
            }}
            data-ocid="panchang.festivals_link"
          >
            🎉 Festival Calendar 2026
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl space-y-6">
        {/* ── Regional Terminology Tabs ── */}
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ borderColor: "oklch(0.28 0.08 30)" }}
          data-ocid="panchang.region.section"
        >
          <div
            className="px-5 py-3 border-b"
            style={{
              background: "oklch(0.20 0.08 24)",
              borderColor: "oklch(0.28 0.08 30)",
            }}
          >
            <p
              className="text-xs font-semibold"
              style={{ color: "oklch(0.55 0.06 55)" }}
            >
              Regional Terminology — select to localize terms below
            </p>
          </div>
          <div
            className="overflow-x-auto"
            style={{ background: "oklch(0.17 0.06 22)" }}
          >
            <div className="flex gap-1 p-2 w-max min-w-full">
              {REGIONS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSelectedRegion(r)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all"
                  style={
                    selectedRegion === r
                      ? { background: "oklch(0.68 0.20 48)", color: "white" }
                      : {
                          background: "oklch(0.22 0.07 24)",
                          color: "oklch(0.65 0.04 55)",
                          border: "1px solid oklch(0.26 0.07 28)",
                        }
                  }
                  data-ocid={`panchang.region.${r.toLowerCase()}.tab`}
                >
                  {r}{" "}
                  <span className="ml-1 opacity-60">{localRegionLabel(r)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Daily Summary Card ── */}
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ borderColor: "oklch(0.30 0.10 40)" }}
          data-ocid="panchang.summary.card"
        >
          <div
            className="px-5 py-4 border-b"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.20 0.09 25), oklch(0.18 0.07 22))",
              borderColor: "oklch(0.30 0.10 40)",
            }}
          >
            <h2
              className="font-heading font-bold text-base"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              Daily Summary — {dateStr}
            </h2>
            <p
              className="text-xs mt-0.5"
              style={{ color: "oklch(0.55 0.06 55)" }}
            >
              {city.name} · {city.nameHi} · {localRegionLabel(selectedRegion)}
            </p>
          </div>
          <div
            className="p-4 space-y-3"
            style={{ background: "oklch(0.15 0.05 20)" }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              <DataCell
                label={<GlossaryTerm term="Tithi">Tithi</GlossaryTerm>}
                value={localTithi}
                sub={`ends ${panchangData.tithi.endTime}`}
              />
              <DataCell
                label={<GlossaryTerm term="Nakshatra">Nakshatra</GlossaryTerm>}
                value={panchangData.nakshatra.name}
                sub={`ends ${panchangData.nakshatra.endTime}`}
              />
              <DataCell
                label={<GlossaryTerm term="Yoga">Yoga</GlossaryTerm>}
                value={panchangData.yoga.name}
                sub={`ends ${panchangData.yoga.endTime}`}
              />
              <DataCell
                label={<GlossaryTerm term="Karana">Karana 1</GlossaryTerm>}
                value={panchangData.karana1.name}
                sub={`ends ${panchangData.karana1.endTime}`}
              />
              <DataCell
                label={<GlossaryTerm term="Karana">Karana 2</GlossaryTerm>}
                value={panchangData.karana2.name}
                sub={`ends ${panchangData.karana2.endTime}`}
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <DataCell
                label={<GlossaryTerm term="Paksha">Paksha</GlossaryTerm>}
                value={localPaksha}
              />
              <DataCell
                label="Weekday"
                value={localWeekday}
                sub={WEEKDAY_EN[panchangData.weekday]}
              />
              <DataCell
                label={<GlossaryTerm term="Sun Sign">Sun Sign</GlossaryTerm>}
                value={panchangData.sunSign}
              />
              <DataCell
                label={<GlossaryTerm term="Moon Sign">Moon Sign</GlossaryTerm>}
                value={panchangData.moonSign.name}
                sub={`ends ${panchangData.moonSign.endTime}`}
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <DataCell
                label={
                  <GlossaryTerm term="Shaka Samvat">Shaka Samvat</GlossaryTerm>
                }
                value={`${panchangData.shakaSamvat}`}
                sub={panchangData.samvatsaraName}
              />
              <DataCell
                label={
                  <GlossaryTerm term="Vikram Samvat">
                    Vikram Samvat
                  </GlossaryTerm>
                }
                value={`${panchangData.vikramSamvat}`}
                sub={samvatsara.samvatsaraName}
              />
              <DataCell
                label="Gujarati Samvat"
                value={`${panchangData.gujaratiSamvat}`}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <DataCell
                label={<GlossaryTerm term="Amanta">Amanta Month</GlossaryTerm>}
                value={panchangData.amantaMonth}
              />
              <DataCell
                label={
                  <GlossaryTerm term="Purnimanta">
                    Purnimanta Month
                  </GlossaryTerm>
                }
                value={panchangData.purnimantaMonth}
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <DataCell label="Sunrise" value={panchangData.sunrise} />
              <DataCell label="Sunset" value={panchangData.sunset} />
              <DataCell label="Moonrise" value={panchangData.moonrise} />
              <DataCell label="Moonset" value={panchangData.moonset} />
            </div>
            <div>
              <p
                className="text-xs font-semibold mb-2 px-1"
                style={{ color: "oklch(0.55 0.20 20)" }}
              >
                Inauspicious Periods
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <DataCell
                  label={
                    <GlossaryTerm term="Rahu Kalam">Rahu Kalam</GlossaryTerm>
                  }
                  value={`${panchangData.rahuKalam.start} – ${panchangData.rahuKalam.end}`}
                />
                <DataCell
                  label={
                    <GlossaryTerm term="Gulikai Kalam">
                      Gulikai Kalam
                    </GlossaryTerm>
                  }
                  value={`${panchangData.gulikaiKalam.start} – ${panchangData.gulikaiKalam.end}`}
                />
                <DataCell
                  label={
                    <GlossaryTerm term="Yamaganda">Yamaganda</GlossaryTerm>
                  }
                  value={`${panchangData.yamaganda.start} – ${panchangData.yamaganda.end}`}
                />
              </div>
            </div>
            <div>
              <p
                className="text-xs font-semibold mb-2 px-1"
                style={{ color: "oklch(0.55 0.18 145)" }}
              >
                Auspicious Periods
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                <DataCell
                  label={
                    <GlossaryTerm term="Abhijit Muhurat">Abhijit</GlossaryTerm>
                  }
                  value={`${panchangData.abhijitMuhurat.start} – ${panchangData.abhijitMuhurat.end}`}
                />
                <DataCell
                  label={
                    <GlossaryTerm term="Dur Muhurtam">
                      Dur Muhurtam 1
                    </GlossaryTerm>
                  }
                  value={`${panchangData.durMuhurtam1.start} – ${panchangData.durMuhurtam1.end}`}
                />
                <DataCell
                  label={
                    <GlossaryTerm term="Dur Muhurtam">
                      Dur Muhurtam 2
                    </GlossaryTerm>
                  }
                  value={`${panchangData.durMuhurtam2.start} – ${panchangData.durMuhurtam2.end}`}
                />
                <DataCell
                  label={
                    <GlossaryTerm term="Amrit Kalam">Amrit Kalam</GlossaryTerm>
                  }
                  value={`${panchangData.amritKalam.start} – ${panchangData.amritKalam.end}`}
                />
                <DataCell
                  label={<GlossaryTerm term="Varjyam">Varjyam</GlossaryTerm>}
                  value={`${panchangData.varjyam.start} – ${panchangData.varjyam.end}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Monthly Calendar ── */}
        <MonthlyCalendar
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />

        {/* ── Collapsible Sub-Sections ── */}
        <div className="space-y-3" data-ocid="panchang.subsections">
          <ChoghadiyaSection
            sunrise={panchangData.sunrise}
            sunset={panchangData.sunset}
            weekday={panchangData.weekday}
          />
          <HoraSection
            sunrise={panchangData.sunrise}
            sunset={panchangData.sunset}
            nextSunrise={panchangData.nextSunrise}
            weekday={panchangData.weekday}
          />
          <LagnaSection sunrise={panchangData.sunrise} />
          <AbhijitSection
            sunrise={panchangData.sunrise}
            sunset={panchangData.sunset}
            weekday={panchangData.weekday}
          />
          <MuhuratSection
            sunrise={panchangData.sunrise}
            sunset={panchangData.sunset}
            nextSunrise={panchangData.nextSunrise}
          />
          <PanchakaSection
            sunrise={panchangData.sunrise}
            sunset={panchangData.sunset}
            nextSunrise={panchangData.nextSunrise}
            tithiIdx={tithiIdx}
            nakshatraIdx={nakshatraIdx}
          />
          <JainPraharSection
            sunrise={panchangData.sunrise}
            sunset={panchangData.sunset}
          />
          <PanchaPakshiSection
            sunrise={panchangData.sunrise}
            sunset={panchangData.sunset}
          />
        </div>
      </div>
    </div>
  );
}
