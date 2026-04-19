import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Compass, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  ALL_VASTU_ITEMS,
  BRAHMA_STHANA,
  CATEGORY_CONFIG,
  COMPASS_POINTS,
  PANCH_BHUTA,
  VASTU_DIRECTIONS,
  VASTU_DOSHAS,
  VASTU_ROOMS,
  type VastuCategory,
  type VastuItem,
} from "../data/vastuData";
import { useVastuContents } from "../hooks/useQueries";

// ─── Types & Constants ────────────────────────────────────────────────────────

type CategoryFilter = "All" | VastuCategory;
type LangTab = "hindi" | "english";

const CATEGORY_TABS: {
  value: CategoryFilter;
  labelEn: string;
  labelHi: string;
}[] = [
  { value: "All", labelEn: "All", labelHi: "सभी" },
  { value: "direction", labelEn: "Directions", labelHi: "दिशाएं" },
  { value: "room", labelEn: "Rooms", labelHi: "कक्ष" },
  { value: "element", labelEn: "Elements", labelHi: "पंच भूत" },
  { value: "brahma_sthana", labelEn: "Brahma Sthana", labelHi: "ब्रह्म स्थान" },
  { value: "dosha", labelEn: "Doshas", labelHi: "दोष" },
];

// ─── Hero overview cards ──────────────────────────────────────────────────────

const OVERVIEW_CARDS = [
  {
    icon: "🏠",
    titleEn: "What is Vastu Shastra?",
    titleHi: "वास्तु शास्त्र क्या है?",
    descEn:
      "The ancient Indian science of architecture that aligns structures with cosmic energy, the five elements, and planetary influences for prosperity and health.",
    descHi:
      "प्राचीन भारतीय वास्तुकला का विज्ञान जो संरचनाओं को ब्रह्मांडीय ऊर्जा, पांच तत्वों और ग्रहों के प्रभाव के साथ संरेखित करता है।",
  },
  {
    icon: "🏛️",
    titleEn: "Brahma Sthana",
    titleHi: "ब्रह्म स्थान",
    descEn:
      "The sacred center of every structure, ruled by Lord Brahma, must remain free and unobstructed for cosmic energy to flow through all directions.",
    descHi:
      "प्रत्येक भवन का पवित्र केंद्र, भगवान ब्रह्मा द्वारा शासित, ब्रह्मांडीय ऊर्जा के प्रवाह के लिए मुक्त और अबाधित रहना चाहिए।",
  },
  {
    icon: "🌊",
    titleEn: "Panch Bhuta — 5 Elements",
    titleHi: "पंच भूत — पांच तत्व",
    descEn:
      "Prithvi (Earth), Jal (Water), Agni (Fire), Vayu (Air), and Akash (Space) — the five cosmic elements that Vastu Shastra harmonizes in every structure.",
    descHi:
      "पृथ्वी, जल, अग्नि, वायु और आकाश — पांच ब्रह्मांडीय तत्व जिन्हें वास्तु शास्त्र प्रत्येक संरचना में सामंजस्यपूर्ण बनाता है।",
  },
];

// ─── Compass Rose Component ────────────────────────────────────────────────────

function CompassRose({
  activeId,
  onSelect,
  lang,
}: {
  activeId: string | null;
  onSelect: (id: string) => void;
  lang: LangTab;
}) {
  const SIZE = 280;
  const CENTER = SIZE / 2;
  const OUTER_R = 118;
  const INNER_R = 62;

  return (
    <div className="flex justify-center items-center py-4">
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="overflow-visible"
        role="img"
        aria-label="Vastu Shastra Compass"
      >
        {/* Outer ring */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={OUTER_R + 12}
          fill="none"
          stroke="oklch(0.78 0.14 75 / 0.18)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        {/* Center circle */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={INNER_R - 8}
          fill="oklch(0.22 0.07 24)"
          stroke="oklch(0.78 0.14 75 / 0.35)"
          strokeWidth="1.5"
        />
        <text
          x={CENTER}
          y={CENTER - 7}
          textAnchor="middle"
          fontSize="16"
          fill="oklch(0.78 0.14 75)"
        >
          🏛️
        </text>
        <text
          x={CENTER}
          y={CENTER + 9}
          textAnchor="middle"
          fontSize="7.5"
          fill="oklch(0.78 0.14 75)"
          fontWeight="600"
        >
          {lang === "hindi" ? "ब्रह्म स्थान" : "Brahma Sthana"}
        </text>

        {/* Direction segments */}
        {COMPASS_POINTS.map((cp) => {
          const rad = (cp.angle - 90) * (Math.PI / 180);
          const x = CENTER + OUTER_R * Math.cos(rad);
          const y = CENTER + OUTER_R * Math.sin(rad);
          const isActive = activeId === cp.itemId;

          // Line from inner to outer
          const innerX = CENTER + (INNER_R - 4) * Math.cos(rad);
          const innerY = CENTER + (INNER_R - 4) * Math.sin(rad);
          const outerLineX = CENTER + (OUTER_R - 18) * Math.cos(rad);
          const outerLineY = CENTER + (OUTER_R - 18) * Math.sin(rad);

          return (
            <g key={cp.id}>
              <line
                x1={innerX}
                y1={innerY}
                x2={outerLineX}
                y2={outerLineY}
                stroke={cp.color}
                strokeWidth={isActive ? 2 : 1}
                opacity={0.5}
              />
              <circle
                cx={x}
                cy={y}
                r={22}
                fill={isActive ? cp.color : "oklch(0.20 0.07 24)"}
                stroke={cp.color}
                strokeWidth={isActive ? 2.5 : 1.5}
                style={{ cursor: "pointer", transition: "all 0.2s" }}
                onClick={() => onSelect(cp.itemId)}
                onKeyDown={(e) => e.key === "Enter" && onSelect(cp.itemId)}
                role="button"
                tabIndex={0}
              />
              <text
                x={x}
                y={y - 6}
                textAnchor="middle"
                fontSize="10"
                fontWeight="700"
                fill={isActive ? "white" : cp.color}
                style={{ pointerEvents: "none" }}
              >
                {lang === "hindi" ? cp.directionHi : cp.directionEn}
              </text>
              <text
                x={x}
                y={y + 6}
                textAnchor="middle"
                fontSize="7.5"
                fill={isActive ? "white" : "oklch(0.72 0.06 65)"}
                style={{ pointerEvents: "none" }}
              >
                {lang === "hindi" ? cp.planetHi : cp.planetEn}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── Vastu Card Component ─────────────────────────────────────────────────────

function VastuCard({
  item,
  index,
  lang,
  onClick,
}: {
  item: VastuItem;
  index: number;
  lang: LangTab;
  onClick: () => void;
}) {
  const cat = CATEGORY_CONFIG[item.category];
  return (
    <button
      type="button"
      data-ocid={`vastu.item.${index + 1}`}
      onClick={onClick}
      className="text-left p-5 rounded-xl border transition-all duration-200 hover:scale-[1.02] group cursor-pointer w-full"
      style={{
        background: "oklch(0.20 0.07 24)",
        borderColor: "oklch(0.78 0.14 75 / 0.15)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = item.color;
        (e.currentTarget as HTMLElement).style.boxShadow =
          `0 0 18px ${item.color}22`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "oklch(0.78 0.14 75 / 0.15)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <div className="flex items-start justify-between mb-3 gap-2">
        <span className="text-2xl">{item.symbol}</span>
        <span
          className="text-[10px] font-heading font-semibold px-2 py-0.5 rounded-full border shrink-0"
          style={{
            background: cat.bg,
            color: cat.color,
            borderColor: cat.border,
          }}
        >
          {lang === "hindi" ? cat.labelHi : cat.label}
        </span>
      </div>

      <h3
        className="font-heading font-bold text-sm mb-1 group-hover:underline leading-snug"
        style={{ color: "oklch(0.88 0.06 75)" }}
      >
        {lang === "hindi" ? item.titleHi : item.titleEn}
      </h3>

      <p
        className="text-xs font-body mb-2"
        style={{ color: "oklch(0.70 0.06 65)", fontFamily: "serif" }}
      >
        {lang === "hindi" ? item.titleEn : item.titleHi}
      </p>

      <div className="flex items-center gap-1.5 mb-3 flex-wrap">
        <Badge
          variant="outline"
          className="text-[10px] font-body"
          style={{ borderColor: `${item.color}55`, color: item.color }}
        >
          {lang === "hindi" ? item.planetaryRulerHi : item.planetaryRuler}
        </Badge>
        <Badge
          variant="outline"
          className="text-[10px] font-body"
          style={{
            borderColor: "oklch(0.68 0.20 48 / 0.3)",
            color: "oklch(0.68 0.20 48)",
          }}
        >
          {item.directionOrRoom}
        </Badge>
      </div>

      <p
        className="font-body text-xs leading-relaxed line-clamp-2"
        style={{ color: "oklch(0.62 0.04 55)" }}
      >
        {lang === "hindi" ? item.shortDescHi : item.shortDesc}
      </p>

      <div
        className="mt-4 text-xs font-heading font-semibold"
        style={{ color: "oklch(0.78 0.14 75)" }}
      >
        {lang === "hindi" ? "पूरा विवरण देखें →" : "View Full Details →"}
      </div>
    </button>
  );
}

// ─── Room Accordion Component ─────────────────────────────────────────────────

function RoomAccordion({
  lang,
  onSelect,
}: { lang: LangTab; onSelect: (item: VastuItem) => void }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="space-y-3">
      {VASTU_ROOMS.map((room) => {
        const cat = CATEGORY_CONFIG[room.category];
        const isOpen = open === room.id;
        return (
          <div
            key={room.id}
            className="rounded-xl border overflow-hidden"
            style={{
              borderColor: isOpen ? room.color : "oklch(0.78 0.14 75 / 0.15)",
            }}
          >
            <button
              type="button"
              data-ocid={`vastu.room.${room.id}`}
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 transition-colors"
              style={{
                background: isOpen
                  ? "oklch(0.22 0.08 25)"
                  : "oklch(0.20 0.07 24)",
              }}
              onClick={() => setOpen(isOpen ? null : room.id)}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xl">{room.symbol}</span>
                <div className="min-w-0">
                  <p
                    className="font-heading font-bold text-sm"
                    style={{ color: "oklch(0.88 0.06 75)" }}
                  >
                    {lang === "hindi" ? room.titleHi : room.titleEn}
                  </p>
                  <p
                    className="text-xs font-body"
                    style={{ color: "oklch(0.65 0.06 60)" }}
                  >
                    {room.directionOrRoom}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className="text-[10px] font-heading px-2 py-0.5 rounded-full border"
                  style={{
                    background: cat.bg,
                    color: cat.color,
                    borderColor: cat.border,
                  }}
                >
                  {lang === "hindi"
                    ? room.planetaryRulerHi
                    : room.planetaryRuler}
                </span>
                <span
                  style={{
                    color: "oklch(0.78 0.14 75)",
                    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                >
                  ▶
                </span>
              </div>
            </button>
            {isOpen && (
              <div
                className="px-5 pb-5 pt-2"
                style={{ background: "oklch(0.18 0.07 22)" }}
              >
                <p
                  className="font-body text-sm leading-relaxed mb-4"
                  style={{ color: "oklch(0.80 0.04 65)" }}
                >
                  {lang === "hindi" ? room.effectsHi : room.effectsEn}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{
                      background: "oklch(0.22 0.07 24)",
                      border: "1px solid oklch(0.68 0.22 22 / 0.2)",
                    }}
                  >
                    <p
                      className="text-[10px] font-heading font-semibold mb-1"
                      style={{ color: "oklch(0.68 0.22 22)" }}
                    >
                      ⚠️ {lang === "hindi" ? "दोष" : "Dosha"}
                    </p>
                    <p
                      className="font-body text-xs leading-relaxed"
                      style={{ color: "oklch(0.72 0.04 55)" }}
                    >
                      {lang === "hindi" ? room.doshaHi : room.doshaEn}
                    </p>
                  </div>
                  <div
                    className="p-3 rounded-lg"
                    style={{
                      background: "oklch(0.22 0.07 24)",
                      border: "1px solid oklch(0.55 0.18 145 / 0.2)",
                    }}
                  >
                    <p
                      className="text-[10px] font-heading font-semibold mb-1"
                      style={{ color: "oklch(0.55 0.18 145)" }}
                    >
                      ✅ {lang === "hindi" ? "उपाय" : "Remedies"}
                    </p>
                    <p
                      className="font-body text-xs leading-relaxed"
                      style={{ color: "oklch(0.72 0.04 55)" }}
                    >
                      {lang === "hindi" ? room.remediesHi : room.remediesEn}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="text-xs font-heading"
                    style={{
                      background: "oklch(0.68 0.20 48)",
                      color: "white",
                    }}
                    onClick={() => onSelect(room)}
                    data-ocid={`vastu.room.details.${room.id}`}
                  >
                    {lang === "hindi" ? "पूरी जानकारी" : "Full Details"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Detail Modal Component ───────────────────────────────────────────────────

function DetailModal({
  item,
  lang,
  onClose,
}: {
  item: VastuItem | null;
  lang: LangTab;
  onClose: () => void;
}) {
  const [modalLang, setModalLang] = useState<LangTab>(lang);
  const cat = item ? CATEGORY_CONFIG[item.category] : null;

  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-2xl max-h-[88vh] overflow-y-auto"
        data-ocid="vastu.dialog"
        style={{
          background: "oklch(0.18 0.07 22)",
          border: "1px solid oklch(0.78 0.14 75 / 0.25)",
        }}
      >
        {item && cat && (
          <>
            <DialogHeader>
              <div className="flex items-start gap-3">
                <span className="text-3xl">{item.symbol}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span
                      className="text-[10px] font-heading font-semibold px-2 py-0.5 rounded-full border"
                      style={{
                        background: cat.bg,
                        color: cat.color,
                        borderColor: cat.border,
                      }}
                    >
                      {modalLang === "hindi" ? cat.labelHi : cat.label}
                    </span>
                    <Badge
                      variant="outline"
                      className="text-[10px] font-body"
                      style={{
                        borderColor: "oklch(0.68 0.20 48 / 0.4)",
                        color: "oklch(0.68 0.20 48)",
                      }}
                    >
                      {item.directionOrRoom}
                    </Badge>
                  </div>
                  <DialogTitle
                    className="font-decorative text-xl"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    {modalLang === "hindi" ? item.titleHi : item.titleEn}
                  </DialogTitle>
                  <p
                    className="font-body text-sm mt-0.5"
                    style={{
                      color: "oklch(0.65 0.06 60)",
                      fontFamily: "serif",
                    }}
                  >
                    {modalLang === "hindi" ? item.titleEn : item.titleHi}
                  </p>
                </div>
              </div>
            </DialogHeader>

            {/* Language toggle */}
            <div className="flex gap-2 mt-1">
              {(["hindi", "english"] as LangTab[]).map((l) => (
                <Button
                  key={l}
                  data-ocid={`vastu.lang.${l}`}
                  size="sm"
                  variant={modalLang === l ? "default" : "outline"}
                  onClick={() => setModalLang(l)}
                  className="font-heading text-xs"
                  style={
                    modalLang === l
                      ? { background: "oklch(0.68 0.20 48)", color: "white" }
                      : {
                          borderColor: "oklch(0.68 0.20 48 / 0.4)",
                          color: "oklch(0.68 0.20 48)",
                        }
                  }
                >
                  {l === "hindi" ? "हिंदी" : "English"}
                </Button>
              ))}
            </div>

            {/* Planetary Ruler */}
            <div
              className="p-3 rounded-xl flex items-center gap-3"
              style={{
                background: "oklch(0.22 0.07 24)",
                border: `1px solid ${item.color}33`,
              }}
            >
              <div className="text-2xl">🪐</div>
              <div>
                <p
                  className="text-[10px] font-heading font-semibold"
                  style={{ color: "oklch(0.65 0.06 60)" }}
                >
                  {modalLang === "hindi" ? "ग्रह स्वामी" : "Planetary Ruler"}
                </p>
                <p
                  className="font-heading font-bold text-sm"
                  style={{ color: item.color }}
                >
                  {modalLang === "hindi"
                    ? item.planetaryRulerHi
                    : item.planetaryRuler}
                </p>
              </div>
              <div className="ml-auto text-right">
                <p
                  className="text-[10px] font-heading"
                  style={{ color: "oklch(0.65 0.06 60)" }}
                >
                  {modalLang === "hindi" ? "तत्व" : "Elements"}
                </p>
                <p
                  className="font-body text-xs"
                  style={{ color: "oklch(0.72 0.06 65)" }}
                >
                  {item.elementsInvolved}
                </p>
              </div>
            </div>

            {/* Effects */}
            <div
              className="p-4 rounded-xl"
              style={{
                background: "oklch(0.22 0.07 24)",
                border: "1px solid oklch(0.78 0.14 75 / 0.12)",
              }}
            >
              <p
                className="text-xs font-heading font-semibold mb-2"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                ✨{" "}
                {modalLang === "hindi"
                  ? "प्रभाव एवं महत्व"
                  : "Effects & Significance"}
              </p>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "oklch(0.82 0.04 65)" }}
              >
                {modalLang === "hindi" ? item.effectsHi : item.effectsEn}
              </p>
            </div>

            {/* Dosha + Remedies grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                className="p-4 rounded-xl"
                style={{
                  background: "oklch(0.22 0.07 24)",
                  border: "1px solid oklch(0.62 0.22 22 / 0.25)",
                }}
              >
                <p
                  className="text-xs font-heading font-semibold mb-2"
                  style={{ color: "oklch(0.62 0.22 22)" }}
                >
                  ⚠️{" "}
                  {modalLang === "hindi" ? "दोष / समस्याएं" : "Dosha / Problems"}
                </p>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "oklch(0.78 0.04 60)" }}
                >
                  {modalLang === "hindi" ? item.doshaHi : item.doshaEn}
                </p>
              </div>
              <div
                className="p-4 rounded-xl"
                style={{
                  background: "oklch(0.22 0.07 24)",
                  border: "1px solid oklch(0.55 0.18 145 / 0.25)",
                }}
              >
                <p
                  className="text-xs font-heading font-semibold mb-2"
                  style={{ color: "oklch(0.55 0.18 145)" }}
                >
                  🌿{" "}
                  {modalLang === "hindi"
                    ? "उपाय एवं निवारण"
                    : "Remedies & Solutions"}
                </p>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "oklch(0.78 0.04 60)" }}
                >
                  {modalLang === "hindi" ? item.remediesHi : item.remediesEn}
                </p>
              </div>
            </div>

            {/* Yantra */}
            <div
              className="p-3 rounded-xl flex items-center gap-3"
              style={{
                background: "oklch(0.20 0.07 24)",
                border: "1px solid oklch(0.65 0.20 295 / 0.3)",
              }}
            >
              <span className="text-xl">🔯</span>
              <div>
                <p
                  className="text-[10px] font-heading"
                  style={{ color: "oklch(0.65 0.06 60)" }}
                >
                  {modalLang === "hindi" ? "यंत्र" : "Recommended Yantra"}
                </p>
                <p
                  className="font-heading font-semibold text-sm"
                  style={{ color: "oklch(0.65 0.20 295)" }}
                >
                  {item.yantra}
                </p>
              </div>
            </div>

            {/* Tips */}
            <div
              className="p-4 rounded-xl"
              style={{
                background: "oklch(0.20 0.07 24)",
                border: "1px solid oklch(0.68 0.20 48 / 0.2)",
              }}
            >
              <p
                className="text-xs font-heading font-semibold mb-2"
                style={{ color: "oklch(0.68 0.20 48)" }}
              >
                💡 {modalLang === "hindi" ? "व्यावहारिक सुझाव" : "Practical Tips"}
              </p>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "oklch(0.78 0.04 60)" }}
              >
                {modalLang === "hindi" ? item.tipsHi : item.tipsEn}
              </p>
            </div>

            <div className="flex justify-end mt-2">
              <Button
                data-ocid="vastu.close_button"
                variant="outline"
                onClick={onClose}
                className="font-heading text-sm"
                style={{
                  borderColor: "oklch(0.78 0.14 75 / 0.3)",
                  color: "oklch(0.78 0.14 75)",
                }}
              >
                <X className="h-3 w-3 mr-1.5" />
                {lang === "hindi" ? "बंद करें" : "Close"}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Page Component ───────────────────────────────────────────────────────

export default function VastuShastra() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("All");
  const [lang, setLang] = useState<LangTab>("hindi");
  const [selectedItem, setSelectedItem] = useState<VastuItem | null>(null);
  const [compassActive, setCompassActive] = useState<string | null>(null);

  const { data: backendContents = [] } = useVastuContents();

  // Merge backend data into VastuItem format
  const backendItems: VastuItem[] = useMemo(
    () =>
      backendContents.map((c) => ({
        id: c.id,
        category: (c.category as VastuCategory) ?? "direction",
        titleEn: c.title,
        titleHi: c.titleHi,
        directionOrRoom: c.directionOrRoom,
        planetaryRuler: c.planetaryRuler,
        planetaryRulerHi: c.planetaryRulerHi,
        shortDesc: c.effectsEn.slice(0, 100),
        shortDescHi: c.effectsHi.slice(0, 100),
        effectsEn: c.effectsEn,
        effectsHi: c.effectsHi,
        doshaEn: c.doshaEn,
        doshaHi: c.doshaHi,
        remediesEn: c.remediesEn,
        remediesHi: c.remediesHi,
        yantra: c.yantra,
        elementsInvolved: c.elementsInvolved,
        tipsEn: c.tipsEn,
        tipsHi: c.tipsHi,
        color: "oklch(0.78 0.14 75)",
        symbol: "🏠",
      })),
    [backendContents],
  );

  const allItems = useMemo(() => {
    const combined = [...ALL_VASTU_ITEMS, ...backendItems];
    const unique = new Map(combined.map((v) => [v.id, v]));
    return Array.from(unique.values());
  }, [backendItems]);

  const filtered = useMemo(() => {
    return allItems.filter((v) => {
      const matchesCat =
        categoryFilter === "All" || v.category === categoryFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        v.titleEn.toLowerCase().includes(q) ||
        v.titleHi.toLowerCase().includes(q) ||
        v.directionOrRoom.toLowerCase().includes(q) ||
        v.planetaryRuler.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [allItems, categoryFilter, searchQuery]);

  function handleCompassSelect(itemId: string) {
    setCompassActive(itemId);
    const found = allItems.find((v) => v.id === itemId);
    if (found) setSelectedItem(found);
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.14 0.05 22)" }}
      data-ocid="vastu.page"
    >
      {/* ── Hero Banner ──────────────────────────────────────────────── */}
      <section
        className="relative py-16 px-4 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.10 30) 0%, oklch(0.28 0.12 45) 50%, oklch(0.22 0.10 30) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.78 0.14 75) 0%, transparent 60%), radial-gradient(circle at 80% 50%, oklch(0.68 0.20 48) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto text-center relative z-10">
          <div className="flex justify-center mb-4">
            <Compass
              className="h-14 w-14"
              style={{ color: "oklch(0.78 0.14 75)" }}
            />
          </div>
          <h1
            className="font-decorative text-4xl md:text-5xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {lang === "hindi" ? "वास्तु शास्त्र" : "Vastu Shastra"}
          </h1>
          <p
            className="font-body text-xl mb-1"
            style={{ color: "oklch(0.88 0.08 65)" }}
          >
            {lang === "hindi"
              ? "Traditional Science of Architecture"
              : "पारंपरिक वास्तुकला का विज्ञान"}
          </p>
          <p
            className="font-body text-sm mt-3"
            style={{ color: "oklch(0.68 0.06 60)" }}
          >
            {allItems.length}{" "}
            {lang === "hindi"
              ? "वास्तु प्रविष्टियां — दिशाएं · कक्ष · तत्व · दोष"
              : "Vastu Entries — Directions · Rooms · Elements · Doshas"}
          </p>

          {/* Language toggle */}
          <div className="flex justify-center gap-2 mt-5">
            <Button
              data-ocid="vastu.lang_hindi.toggle"
              size="sm"
              onClick={() => setLang("hindi")}
              className="font-heading text-xs"
              style={
                lang === "hindi"
                  ? { background: "oklch(0.68 0.20 48)", color: "white" }
                  : {
                      borderColor: "oklch(0.68 0.20 48 / 0.4)",
                      color: "oklch(0.68 0.20 48)",
                      background: "transparent",
                      border: "1px solid",
                    }
              }
            >
              हिंदी
            </Button>
            <Button
              data-ocid="vastu.lang_english.toggle"
              size="sm"
              onClick={() => setLang("english")}
              className="font-heading text-xs"
              style={
                lang === "english"
                  ? { background: "oklch(0.68 0.20 48)", color: "white" }
                  : {
                      borderColor: "oklch(0.68 0.20 48 / 0.4)",
                      color: "oklch(0.68 0.20 48)",
                      background: "transparent",
                      border: "1px solid",
                    }
              }
            >
              English
            </Button>
          </div>
        </div>
      </section>

      {/* ── Overview Cards ────────────────────────────────────────────── */}
      <section
        className="py-10 px-4"
        style={{ background: "oklch(0.16 0.06 22)" }}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {OVERVIEW_CARDS.map((card) => (
              <div
                key={card.titleEn}
                className="p-5 rounded-xl border text-center"
                style={{
                  background: "oklch(0.20 0.07 24)",
                  borderColor: "oklch(0.78 0.14 75 / 0.18)",
                }}
              >
                <div className="text-4xl mb-3">{card.icon}</div>
                <h3
                  className="font-heading font-bold text-sm mb-2"
                  style={{ color: "oklch(0.88 0.06 75)" }}
                >
                  {lang === "hindi" ? card.titleHi : card.titleEn}
                </h3>
                <p
                  className="font-body text-xs leading-relaxed"
                  style={{ color: "oklch(0.65 0.04 55)" }}
                >
                  {lang === "hindi" ? card.descHi : card.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Directional Compass Section ──────────────────────────────── */}
      <section
        className="py-10 px-4"
        style={{ background: "oklch(0.18 0.07 22)" }}
        data-ocid="vastu.compass.section"
      >
        <div className="container mx-auto">
          <h2
            className="font-decorative text-2xl font-bold text-center mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {lang === "hindi"
              ? "दिशा-चक्र — ग्रह एवं दिशाएं"
              : "Vastu Compass — Directions & Planetary Rulers"}
          </h2>
          <p
            className="font-body text-sm text-center mb-8"
            style={{ color: "oklch(0.65 0.06 55)" }}
          >
            {lang === "hindi"
              ? "किसी भी दिशा पर क्लिक करके उसका विस्तृत विवरण देखें"
              : "Click any direction to view its detailed Vastu information"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <CompassRose
              activeId={compassActive}
              onSelect={handleCompassSelect}
              lang={lang}
            />

            {/* Direction quick list */}
            <div className="grid grid-cols-2 gap-2">
              {VASTU_DIRECTIONS.map((dir) => (
                <button
                  type="button"
                  key={dir.id}
                  data-ocid={`vastu.compass.dir.${dir.id}`}
                  className="text-left p-3 rounded-lg border transition-all"
                  style={{
                    background:
                      compassActive === dir.id
                        ? "oklch(0.22 0.08 25)"
                        : "oklch(0.20 0.07 24)",
                    borderColor:
                      compassActive === dir.id
                        ? dir.color
                        : "oklch(0.78 0.14 75 / 0.15)",
                  }}
                  onClick={() => handleCompassSelect(dir.id)}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-base">{dir.symbol}</span>
                    <span
                      className="font-heading font-bold text-xs"
                      style={{ color: dir.color }}
                    >
                      {lang === "hindi" ? dir.titleHi : dir.titleEn}
                    </span>
                  </div>
                  <p
                    className="font-body text-[10px]"
                    style={{ color: "oklch(0.65 0.06 55)" }}
                  >
                    {lang === "hindi"
                      ? dir.planetaryRulerHi
                      : dir.planetaryRuler}
                  </p>
                </button>
              ))}
              {/* Brahma Sthana tile */}
              <button
                type="button"
                data-ocid="vastu.compass.brahma_sthana"
                className="text-left p-3 rounded-lg border transition-all col-span-2"
                style={{
                  background:
                    compassActive === BRAHMA_STHANA.id
                      ? "oklch(0.22 0.08 25)"
                      : "oklch(0.20 0.07 24)",
                  borderColor:
                    compassActive === BRAHMA_STHANA.id
                      ? BRAHMA_STHANA.color
                      : "oklch(0.65 0.20 295 / 0.25)",
                }}
                onClick={() => {
                  setCompassActive(BRAHMA_STHANA.id);
                  setSelectedItem(BRAHMA_STHANA);
                }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-base">{BRAHMA_STHANA.symbol}</span>
                  <span
                    className="font-heading font-bold text-xs"
                    style={{ color: "oklch(0.65 0.20 295)" }}
                  >
                    {lang === "hindi"
                      ? BRAHMA_STHANA.titleHi
                      : BRAHMA_STHANA.titleEn}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Room-wise Vastu Section ───────────────────────────────────── */}
      <section
        className="py-10 px-4"
        style={{ background: "oklch(0.15 0.05 22)" }}
        data-ocid="vastu.rooms.section"
      >
        <div className="container mx-auto max-w-3xl">
          <h2
            className="font-decorative text-2xl font-bold text-center mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {lang === "hindi"
              ? "कक्ष-अनुसार वास्तु मार्गदर्शन"
              : "Room-wise Vastu Guidelines"}
          </h2>
          <p
            className="font-body text-sm text-center mb-8"
            style={{ color: "oklch(0.65 0.06 55)" }}
          >
            {lang === "hindi"
              ? "प्रत्येक कक्ष की सही दिशा और वास्तु नियम"
              : "Correct direction and Vastu rules for each room"}
          </p>
          <RoomAccordion lang={lang} onSelect={setSelectedItem} />
        </div>
      </section>

      {/* ── Panch Bhuta Section ───────────────────────────────────────── */}
      <section
        className="py-10 px-4"
        style={{ background: "oklch(0.17 0.06 22)" }}
        data-ocid="vastu.elements.section"
      >
        <div className="container mx-auto">
          <h2
            className="font-decorative text-2xl font-bold text-center mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {lang === "hindi"
              ? "पंच भूत — पांच तत्व"
              : "Panch Bhuta — The Five Elements"}
          </h2>
          <p
            className="font-body text-sm text-center mb-8"
            style={{ color: "oklch(0.65 0.06 55)" }}
          >
            {lang === "hindi"
              ? "प्रत्येक भवन इन पांच तत्वों का संतुलन है"
              : "Every structure is a balance of these five cosmic elements"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PANCH_BHUTA.map((el, idx) => (
              <button
                type="button"
                key={el.id}
                data-ocid={`vastu.element.item.${idx + 1}`}
                className="p-4 rounded-xl border text-center transition-all hover:scale-[1.03] cursor-pointer"
                style={{
                  background: "oklch(0.20 0.07 24)",
                  borderColor: `${el.color}33`,
                }}
                onClick={() => setSelectedItem(el)}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = el.color;
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    `0 0 16px ${el.color}22`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    `${el.color}33`;
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div className="text-3xl mb-2">{el.symbol}</div>
                <p
                  className="font-heading font-bold text-xs mb-1"
                  style={{ color: el.color }}
                >
                  {lang === "hindi" ? el.titleHi : el.titleEn}
                </p>
                <p
                  className="font-body text-[10px]"
                  style={{ color: "oklch(0.65 0.04 55)" }}
                >
                  {el.directionOrRoom}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Search + Filter Bar ───────────────────────────────────────── */}
      <section
        className="sticky top-16 z-30 py-4 px-4 border-b"
        style={{
          background: "oklch(0.18 0.07 22)",
          borderColor: "oklch(0.78 0.14 75 / 0.15)",
        }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                style={{ color: "oklch(0.60 0.06 55)" }}
              />
              <Input
                data-ocid="vastu.search_input"
                type="text"
                placeholder={
                  lang === "hindi"
                    ? "खोजें — दिशा, कक्ष, ग्रह..."
                    : "Search by direction, room, planet..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border font-body"
                style={{
                  background: "oklch(0.22 0.07 24)",
                  borderColor: "oklch(0.78 0.14 75 / 0.25)",
                  color: "oklch(0.90 0.04 70)",
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X
                    className="h-4 w-4"
                    style={{ color: "oklch(0.60 0.06 55)" }}
                  />
                </button>
              )}
            </div>
            <Tabs
              value={categoryFilter}
              onValueChange={(v) => setCategoryFilter(v as CategoryFilter)}
            >
              <TabsList
                style={{ background: "oklch(0.22 0.07 24)" }}
                className="flex-wrap h-auto gap-1"
              >
                {CATEGORY_TABS.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    data-ocid={`vastu.filter.${tab.value}`}
                    className="text-xs font-heading"
                  >
                    {lang === "hindi" ? tab.labelHi : tab.labelEn}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* ── Card Grid ─────────────────────────────────────────────────── */}
      <section className="py-10 px-4" data-ocid="vastu.list">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <p
              className="font-body text-sm"
              style={{ color: "oklch(0.60 0.06 55)" }}
            >
              {lang === "hindi"
                ? `${filtered.length} परिणाम`
                : `${filtered.length} results`}
            </p>
          </div>

          {filtered.length === 0 ? (
            <div data-ocid="vastu.empty_state" className="text-center py-20">
              <Compass
                className="h-12 w-12 mx-auto mb-4"
                style={{ color: "oklch(0.50 0.08 55)" }}
              />
              <p
                className="font-heading text-lg"
                style={{ color: "oklch(0.60 0.06 55)" }}
              >
                {lang === "hindi"
                  ? "कोई परिणाम नहीं मिला।"
                  : "No results found for your search."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((item, idx) => (
                <VastuCard
                  key={item.id}
                  item={item}
                  index={idx}
                  lang={lang}
                  onClick={() => setSelectedItem(item)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Dosha Section ────────────────────────────────────────────── */}
      <section
        className="py-10 px-4"
        style={{ background: "oklch(0.16 0.06 22)" }}
        data-ocid="vastu.doshas.section"
      >
        <div className="container mx-auto max-w-3xl">
          <h2
            className="font-decorative text-2xl font-bold text-center mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {lang === "hindi"
              ? "प्रमुख वास्तु दोष एवं उपाय"
              : "Major Vastu Doshas & Remedies"}
          </h2>
          <p
            className="font-body text-sm text-center mb-8"
            style={{ color: "oklch(0.65 0.06 55)" }}
          >
            {lang === "hindi"
              ? "सामान्य वास्तु दोषों की पहचान और उनके निवारण के उपाय"
              : "Identify common Vastu defects and their corrective remedies"}
          </p>
          <div className="space-y-4">
            {VASTU_DOSHAS.map((dosha, idx) => (
              <div
                key={dosha.id}
                className="p-5 rounded-xl border"
                style={{
                  background: "oklch(0.20 0.07 24)",
                  borderColor: "oklch(0.62 0.22 22 / 0.25)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{dosha.symbol}</span>
                  <div>
                    <p
                      className="font-heading font-bold text-sm"
                      style={{ color: "oklch(0.88 0.06 75)" }}
                    >
                      {lang === "hindi" ? dosha.titleHi : dosha.titleEn}
                    </p>
                    <p
                      className="font-body text-xs"
                      style={{ color: "oklch(0.65 0.06 60)" }}
                    >
                      {dosha.directionOrRoom} ·{" "}
                      {lang === "hindi"
                        ? dosha.planetaryRulerHi
                        : dosha.planetaryRuler}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="ml-auto text-xs font-heading"
                    style={{
                      background: "oklch(0.62 0.22 22 / 0.2)",
                      color: "oklch(0.62 0.22 22)",
                      border: "1px solid oklch(0.62 0.22 22 / 0.4)",
                    }}
                    data-ocid={`vastu.dosha.${idx + 1}`}
                    onClick={() => setSelectedItem(dosha)}
                  >
                    {lang === "hindi" ? "उपाय देखें" : "View Remedies"}
                  </Button>
                </div>
                <p
                  className="font-body text-xs leading-relaxed"
                  style={{ color: "oklch(0.70 0.04 55)" }}
                >
                  {lang === "hindi" ? dosha.shortDescHi : dosha.shortDesc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Detail Modal ─────────────────────────────────────────────── */}
      <DetailModal
        item={selectedItem}
        lang={lang}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}
