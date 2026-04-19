import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMemo, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import type { BirthData } from "../hooks/useAstrology";
import { useAstrology } from "../hooks/useAstrology";
import { useNumerology } from "../hooks/useNumerology";
import { SpeakerButton } from "../hooks/useSpeaker";
import { NAKSHATRAS, ZODIAC_SIGNS } from "../utils/vedicAstrology";

interface PersonForm {
  name: string;
  dob: string;
  tob: string;
  pob: string;
  lat: string;
  lng: string;
  gender: "M" | "F" | "O";
}

const EMPTY_FORM: PersonForm = {
  name: "",
  dob: "",
  tob: "06:00",
  pob: "",
  lat: "23.0",
  lng: "72.5",
  gender: "M",
};

function parseBirthData(f: PersonForm): BirthData | null {
  if (!f.dob || !f.tob) return null;
  return {
    name: f.name,
    dob: f.dob,
    tob: f.tob,
    pob: f.pob,
    latitude: Number.parseFloat(f.lat) || 23.0,
    longitude: Number.parseFloat(f.lng) || 72.5,
    gender: f.gender,
  };
}

function OrnamentalCard({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-xl border-2 border-[#D4AF37] bg-card shadow-md p-4 ${className}`}
      style={{
        boxShadow:
          "inset 0 0 0 2px rgba(212,175,55,0.18), 0 2px 16px rgba(212,175,55,0.08)",
      }}
    >
      {children}
    </div>
  );
}

const GUNAS = [
  { name: "Varna", nameHi: "वर्ण", max: 1, desc: "Spiritual compatibility" },
  {
    name: "Vasya",
    nameHi: "वश्य",
    max: 2,
    desc: "Mutual attraction and control",
  },
  { name: "Tara", nameHi: "तारा", max: 3, desc: "Health harmony" },
  { name: "Yoni", nameHi: "योनि", max: 4, desc: "Physical compatibility" },
  { name: "Graha Maitri", nameHi: "ग्रह मैत्री", max: 5, desc: "Mental harmony" },
  { name: "Gana", nameHi: "गण", max: 6, desc: "Nature type" },
  { name: "Bhakoot", nameHi: "भकूट", max: 7, desc: "Family welfare" },
  { name: "Nadi", nameHi: "नाड़ी", max: 8, desc: "Health and progeny" },
];

function calcGunas(n1: number, n2: number, ms1: number, ms2: number): number[] {
  const d = Math.abs(n1 - n2) || 1;
  const sd = Math.abs(ms1 - ms2) || 1;
  return [
    d % 4 === 0 ? 1 : 0,
    sd <= 2 || sd >= 10 ? 2 : 1,
    d % 3 === 0 ? 3 : d % 3 === 1 ? 2 : 1,
    d % 4 <= 1 ? 4 : d % 4 <= 2 ? 3 : 2,
    sd <= 4 ? 5 : sd <= 7 ? 3 : 1,
    d % 9 < 3 ? 6 : d % 9 < 6 ? 4 : 2,
    sd === 0 ? 7 : [1, 3, 5, 7, 9, 11].includes(sd) ? 7 : sd === 6 ? 0 : 5,
    n1 % 3 !== n2 % 3 ? 8 : 0,
  ];
}

function getCompatLabel(
  score: number,
  hi: boolean,
): { label: string; color: string } {
  if (score >= 32)
    return { label: hi ? "उत्कृष्ट ✦" : "Excellent ✦", color: "#22c55e" };
  if (score >= 25) return { label: hi ? "अच्छा ✓" : "Good ✓", color: "#84cc16" };
  if (score >= 19)
    return { label: hi ? "स्वीकार्य" : "Acceptable", color: "#FF9933" };
  return { label: hi ? "चुनौतीपूर्ण" : "Challenging", color: "#ef4444" };
}

function getPredText(score: number, tab: string, hi: boolean): string {
  const ex = score >= 32;
  const go = score >= 25;
  const ok = score >= 19;
  if (tab === "marriage") {
    if (ex)
      return hi
        ? "यह संयोग अत्यंत शुभ और दुर्लभ है। गहरा प्रेम, आपसी सम्मान और आजीवन साथ निश्चित है।"
        : "This match is exceptionally auspicious and rare. Deep love, mutual respect, and lifelong companionship are indicated.";
    if (go)
      return hi
        ? "यह युगल एक संतुलित वैवाहिक जीवन की ओर अग्रसर है। समझ और प्रेम से सुलझाए जा सकते हैं।"
        : "This couple moves toward a balanced married life. Differences can be resolved with understanding and love.";
    if (ok)
      return hi
        ? "यह विवाह संभव है पर कुछ चुनौतियां आ सकती हैं। ज्योतिषीय उपाय और परस्पर समझ सहायक होगी।"
        : "This marriage is possible but some challenges may arise. Astrological remedies and mutual understanding will help.";
    return hi
      ? "यह संयोग कठिन माना जाता है। किसी अनुभवी ज्योतिषी से परामर्श अवश्य लें।"
      : "This match is considered challenging. Please consult an experienced astrologer for guidance and remedies.";
  }
  if (tab === "business") {
    if (ex || go)
      return hi
        ? "व्यावसायिक साझेदारी के लिए यह संयोग उत्तम है। मिलकर बड़े वित्तीय लक्ष्य प्राप्त कर सकते हैं।"
        : "An excellent combination for business. Together they can achieve great financial milestones.";
    if (ok)
      return hi
        ? "व्यापार में सहयोग संभव है पर सावधानी आवश्यक है। लिखित समझौता करें।"
        : "Business collaboration is possible but requires caution. Keep written agreements.";
    return hi
      ? "व्यापारिक साझेदारी से पहले सावधानी से विचार करें। मतभेद की संभावना है।"
      : "Exercise caution before business partnership. Differences in approach could cause conflicts.";
  }
  if (ex || go)
    return hi
      ? "यह मित्रता गहरी और आजीवन रहेगी। दोनों एक दूसरे को प्रेरित करते हैं।"
      : "This friendship will be deep and lifelong. Both inspire each other and share a strong soul connection.";
  return hi
    ? "मित्रता अच्छी रहेगी पर कभी-कभी मतभेद हो सकते हैं।"
    : "Friendship will be pleasant though occasional differences may surface.";
}

function NorthChart({
  personName,
  lagnaName,
}: { personName: string; lagnaName: string | undefined }) {
  const s = 260;
  const cx = s / 2;
  const cy = s / 2;
  const q = s / 4;
  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        role="img"
        width={s}
        height={s}
        viewBox={`0 0 ${s} ${s}`}
        className="rounded-lg border border-[#D4AF37]"
        aria-label={`Birth chart for ${personName}`}
      >
        <rect width={s} height={s} fill="var(--card)" rx={4} />
        <rect
          x={2}
          y={2}
          width={s - 4}
          height={s - 4}
          fill="none"
          stroke="#D4AF37"
          strokeWidth="1.5"
        />
        <line
          x1={0}
          y1={0}
          x2={s}
          y2={s}
          stroke="#D4AF37"
          strokeWidth="0.8"
          opacity={0.4}
        />
        <line
          x1={s}
          y1={0}
          x2={0}
          y2={s}
          stroke="#D4AF37"
          strokeWidth="0.8"
          opacity={0.4}
        />
        <polygon
          points={`${cx},${q} ${s - q},${cy} ${cx},${s - q} ${q},${cy}`}
          fill="none"
          stroke="#D4AF37"
          strokeWidth="0.8"
          opacity={0.5}
        />
        {lagnaName && (
          <>
            <text
              x={s - q + 10}
              y={cy - 10}
              textAnchor="middle"
              fontSize={9}
              fill="#FF9933"
              fontWeight="bold"
            >
              {lagnaName}
            </text>
            <text
              x={s - q + 10}
              y={cy + 5}
              textAnchor="middle"
              fontSize={7}
              fill="var(--muted-foreground)"
            >
              Lagna
            </text>
          </>
        )}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => {
          const angle = ((h - 1) * 30 - 90) * (Math.PI / 180);
          const r = s * 0.38;
          const tx = cx + r * Math.cos(angle);
          const ty = cy + r * Math.sin(angle);
          return (
            <text
              key={h}
              x={tx}
              y={ty}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={7}
              fill="var(--muted-foreground)"
              opacity={0.6}
            >
              {h}
            </text>
          );
        })}
      </svg>
      <div className="text-sm font-semibold text-center text-foreground">
        {personName || "—"}
      </div>
    </div>
  );
}

function PersonInput({
  label,
  form,
  onChange,
  color,
  ocidPrefix,
}: {
  label: string;
  form: PersonForm;
  onChange: (p: Partial<PersonForm>) => void;
  color: string;
  ocidPrefix: string;
}) {
  return (
    <OrnamentalCard>
      <h3 className="font-bold text-base mb-3" style={{ color }}>
        {label}
      </h3>
      <div className="space-y-2">
        <div>
          <label
            className="text-xs text-muted-foreground block mb-1"
            htmlFor={`${ocidPrefix}-name`}
          >
            Name
          </label>
          <Input
            id={`${ocidPrefix}-name`}
            value={form.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="Full Name"
            data-ocid={`${ocidPrefix}.name`}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label
              className="text-xs text-muted-foreground block mb-1"
              htmlFor={`${ocidPrefix}-dob`}
            >
              Date of Birth
            </label>
            <Input
              id={`${ocidPrefix}-dob`}
              type="date"
              value={form.dob}
              onChange={(e) => onChange({ dob: e.target.value })}
              data-ocid={`${ocidPrefix}.dob`}
            />
          </div>
          <div>
            <label
              className="text-xs text-muted-foreground block mb-1"
              htmlFor={`${ocidPrefix}-tob`}
            >
              Time (HH:MM)
            </label>
            <Input
              id={`${ocidPrefix}-tob`}
              type="time"
              value={form.tob}
              onChange={(e) => onChange({ tob: e.target.value })}
              data-ocid={`${ocidPrefix}.tob`}
            />
          </div>
        </div>
        <div>
          <label
            className="text-xs text-muted-foreground block mb-1"
            htmlFor={`${ocidPrefix}-pob`}
          >
            Place of Birth
          </label>
          <Input
            id={`${ocidPrefix}-pob`}
            value={form.pob}
            onChange={(e) => onChange({ pob: e.target.value })}
            placeholder="City, Country"
            data-ocid={`${ocidPrefix}.pob`}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label
              className="text-xs text-muted-foreground block mb-1"
              htmlFor={`${ocidPrefix}-lat`}
            >
              Latitude
            </label>
            <Input
              id={`${ocidPrefix}-lat`}
              value={form.lat}
              onChange={(e) => onChange({ lat: e.target.value })}
              placeholder="23.0"
              data-ocid={`${ocidPrefix}.lat`}
            />
          </div>
          <div>
            <label
              className="text-xs text-muted-foreground block mb-1"
              htmlFor={`${ocidPrefix}-lng`}
            >
              Longitude
            </label>
            <Input
              id={`${ocidPrefix}-lng`}
              value={form.lng}
              onChange={(e) => onChange({ lng: e.target.value })}
              placeholder="72.5"
              data-ocid={`${ocidPrefix}.lng`}
            />
          </div>
        </div>
        <div>
          <label
            className="text-xs text-muted-foreground block mb-2"
            htmlFor={`${ocidPrefix}-gender`}
          >
            Gender
          </label>
          <div className="flex gap-2" id={`${ocidPrefix}-gender`}>
            {(["M", "F", "O"] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => onChange({ gender: g })}
                className={`flex-1 py-1.5 rounded border text-xs font-medium transition-colors ${form.gender === g ? "border-[#FF9933] bg-[#FF9933]/10 text-[#FF9933]" : "border-border"}`}
                data-ocid={`${ocidPrefix}.gender`}
              >
                {g === "M" ? "Male" : g === "F" ? "Female" : "Other"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </OrnamentalCard>
  );
}

export default function HoroscopeComparison() {
  const { language } = useLanguage();
  const hi = language === "hi";
  const [form1, setForm1] = useState<PersonForm>({ ...EMPTY_FORM });
  const [form2, setForm2] = useState<PersonForm>({ ...EMPTY_FORM });
  const [compared, setCompared] = useState(false);

  const bd1 = useMemo(
    (): BirthData | null => (compared ? parseBirthData(form1) : null),
    [compared, form1],
  );
  const bd2 = useMemo(
    (): BirthData | null => (compared ? parseBirthData(form2) : null),
    [compared, form2],
  );

  const astro1 = useAstrology(bd1);
  const astro2 = useAstrology(bd2);
  const num1 = useNumerology(bd1);
  const num2 = useNumerology(bd2);

  const gunaScores = useMemo(() => {
    if (!compared || !bd1 || !bd2) return GUNAS.map(() => 0);
    const n1 = astro1.planetPositions?.Moon?.nakshatra ?? 1;
    const n2 = astro2.planetPositions?.Moon?.nakshatra ?? 1;
    const ms1 = astro1.planetPositions?.Moon?.sign ?? 1;
    const ms2 = astro2.planetPositions?.Moon?.sign ?? 1;
    return calcGunas(n1, n2, ms1, ms2);
  }, [compared, bd1, bd2, astro1, astro2]);

  const totalScore = gunaScores.reduce((a, b) => a + b, 0);
  const compat = getCompatLabel(totalScore, hi);
  const canCompare = !!form1.dob && !!form1.tob && !!form2.dob && !!form2.tob;

  function signName(sign: number | undefined): string {
    return ZODIAC_SIGNS.find((s) => s.num === (sign ?? 0))?.name ?? "—";
  }
  function nakshatraName(nak: number | undefined): string {
    return NAKSHATRAS.find((n) => n.num === (nak ?? 0))?.name ?? "—";
  }
  function nakshatraLord(nak: number | undefined): string {
    return NAKSHATRAS.find((n) => n.num === (nak ?? 0))?.lord ?? "—";
  }

  const detailRows = [
    {
      label: hi ? "लग्न" : "Lagna",
      v1: signName(astro1.lagna?.sign),
      v2: signName(astro2.lagna?.sign),
    },
    {
      label: hi ? "राशि" : "Rasi",
      v1: signName(astro1.planetPositions?.Moon?.sign),
      v2: signName(astro2.planetPositions?.Moon?.sign),
    },
    {
      label: hi ? "नक्षत्र" : "Nakshatra",
      v1: nakshatraName(astro1.planetPositions?.Moon?.nakshatra),
      v2: nakshatraName(astro2.planetPositions?.Moon?.nakshatra),
    },
    {
      label: hi ? "नक्षत्र स्वामी" : "Nakshatra Lord",
      v1: nakshatraLord(astro1.planetPositions?.Moon?.nakshatra),
      v2: nakshatraLord(astro2.planetPositions?.Moon?.nakshatra),
    },
    {
      label: hi ? "सूर्य राशि" : "Sun Sign",
      v1: signName(astro1.planetPositions?.Sun?.sign),
      v2: signName(astro2.planetPositions?.Sun?.sign),
    },
    {
      label: hi ? "चंद्र राशि" : "Moon Sign",
      v1: signName(astro1.planetPositions?.Moon?.sign),
      v2: signName(astro2.planetPositions?.Moon?.sign),
    },
    {
      label: hi ? "महादशा" : "Mahadasha",
      v1: astro1.dashaBalance?.lord ?? "—",
      v2: astro2.dashaBalance?.lord ?? "—",
    },
    {
      label: hi ? "मूलांक" : "Mulank",
      v1: String(num1.mulank || "—"),
      v2: String(num2.mulank || "—"),
    },
    {
      label: hi ? "भाग्यांक" : "Bhagyank",
      v1: String(num1.bhagyank || "—"),
      v2: String(num2.bhagyank || "—"),
    },
  ];

  return (
    <div
      className="min-h-screen bg-background py-6 px-4"
      data-ocid="horoscope_comparison.page"
    >
      <div className="max-w-5xl mx-auto space-y-6">
        <OrnamentalCard className="text-center py-5">
          <h1
            className="text-2xl md:text-3xl font-bold"
            style={{ color: "#FF9933" }}
          >
            {hi
              ? "✦ कुंडली मिलान — Horoscope Comparison ✦"
              : "✦ Horoscope Comparison — कुंडली मिलान ✦"}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {hi
              ? "दो व्यक्तियों की कुंडली का विस्तृत मिलान और अनुकूलता विश्लेषण"
              : "Side-by-side birth chart comparison with Ashtakoot compatibility analysis"}
          </p>
        </OrnamentalCard>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PersonInput
            label={hi ? "व्यक्ति १" : "Person 1"}
            form={form1}
            onChange={(p) => setForm1((prev) => ({ ...prev, ...p }))}
            color="#FF9933"
            ocidPrefix="horoscope_comparison.person1"
          />
          <PersonInput
            label={hi ? "व्यक्ति २" : "Person 2"}
            form={form2}
            onChange={(p) => setForm2((prev) => ({ ...prev, ...p }))}
            color="#D4AF37"
            ocidPrefix="horoscope_comparison.person2"
          />
        </div>

        <Button
          onClick={() => setCompared(true)}
          disabled={!canCompare}
          className="w-full bg-[#FF9933] hover:bg-[#e8871e] text-white text-base font-semibold py-3"
          data-ocid="horoscope_comparison.compare_button"
        >
          {hi ? "⚡ कुंडली मिलाएं" : "⚡ Compare Charts"}
        </Button>

        {!canCompare && !compared && (
          <div
            className="text-center py-4 text-sm text-muted-foreground"
            data-ocid="horoscope_comparison.empty_state"
          >
            {hi
              ? "कृपया दोनों व्यक्तियों का जन्म दिनांक और समय भरें।"
              : "Please fill date and time of birth for both persons."}
          </div>
        )}

        {compared && bd1 && bd2 && (
          <div className="space-y-6">
            <OrnamentalCard data-ocid="horoscope_comparison.basic_details">
              <h2 className="font-bold text-[#D4AF37] mb-3">
                {hi ? "१. मूल विवरण तुलना" : "1. Basic Details Comparison"}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-[#D4AF37]/40">
                      <th className="text-left p-2 text-muted-foreground">
                        {hi ? "विवरण" : "Detail"}
                      </th>
                      <th
                        className="text-center p-2 font-bold"
                        style={{ color: "#FF9933" }}
                      >
                        {form1.name || "Person 1"}
                      </th>
                      <th
                        className="text-center p-2 font-bold"
                        style={{ color: "#D4AF37" }}
                      >
                        {form2.name || "Person 2"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailRows.map((row, i) => (
                      <tr
                        key={row.label}
                        className={i % 2 === 0 ? "" : "bg-muted/20"}
                      >
                        <td className="p-2 text-muted-foreground text-xs">
                          {row.label}
                        </td>
                        <td className="p-2 text-center font-medium text-foreground text-xs">
                          {row.v1}
                        </td>
                        <td className="p-2 text-center font-medium text-foreground text-xs">
                          {row.v2}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </OrnamentalCard>

            <OrnamentalCard data-ocid="horoscope_comparison.ashtakoot">
              <h2 className="font-bold text-[#D4AF37] mb-4">
                {hi ? "२. अष्टकूट गुण मिलान" : "2. Ashtakoot Compatibility"}
              </h2>
              <div className="flex items-center gap-6 mb-4">
                <div className="relative w-24 h-24 shrink-0">
                  <svg
                    role="img"
                    viewBox="0 0 96 96"
                    className="w-24 h-24 -rotate-90"
                    aria-label={`Compatibility score: ${totalScore} out of 36`}
                  >
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      fill="none"
                      stroke="var(--muted)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      fill="none"
                      stroke={compat.color}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${(totalScore / 36) * 251} 251`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div
                      className="text-2xl font-black"
                      style={{ color: compat.color }}
                    >
                      {totalScore}
                    </div>
                    <div className="text-xs text-muted-foreground">/ 36</div>
                  </div>
                </div>
                <div>
                  <div
                    className="text-xl font-bold"
                    style={{ color: compat.color }}
                  >
                    {compat.label}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {hi
                      ? totalScore >= 32
                        ? "अत्यंत शुभ"
                        : totalScore >= 25
                          ? "अच्छा"
                          : totalScore >= 19
                            ? "स्वीकार्य"
                            : "उपाय करें"
                      : totalScore >= 32
                        ? "Highly auspicious"
                        : totalScore >= 25
                          ? "Good match"
                          : totalScore >= 19
                            ? "Acceptable"
                            : "Seek remedies"}
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-2 text-muted-foreground">
                        {hi ? "गुण" : "Guna"}
                      </th>
                      <th className="text-center p-2 text-muted-foreground">
                        Max
                      </th>
                      <th className="text-center p-2 text-muted-foreground">
                        {hi ? "प्राप्त" : "Score"}
                      </th>
                      <th className="hidden sm:table-cell text-left p-2 text-muted-foreground">
                        {hi ? "विवरण" : "Description"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {GUNAS.map((g, i) => (
                      <tr
                        key={g.name}
                        className={i % 2 === 0 ? "" : "bg-muted/20"}
                      >
                        <td className="p-2 font-medium">
                          {hi ? g.nameHi : g.name}
                        </td>
                        <td className="p-2 text-center text-muted-foreground">
                          {g.max}
                        </td>
                        <td
                          className="p-2 text-center font-bold"
                          style={{
                            color:
                              gunaScores[i] >= g.max * 0.7
                                ? "#22c55e"
                                : gunaScores[i] >= g.max * 0.4
                                  ? "#D4AF37"
                                  : "#ef4444",
                          }}
                        >
                          {gunaScores[i]}
                        </td>
                        <td className="hidden sm:table-cell p-2 text-muted-foreground">
                          {g.desc}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-[#D4AF37]/40 font-bold">
                      <td className="p-2">{hi ? "कुल" : "Total"}</td>
                      <td className="p-2 text-center">36</td>
                      <td
                        className="p-2 text-center text-base"
                        style={{ color: compat.color }}
                      >
                        {totalScore}
                      </td>
                      <td className="hidden sm:table-cell p-2" />
                    </tr>
                  </tfoot>
                </table>
              </div>
            </OrnamentalCard>

            <OrnamentalCard data-ocid="horoscope_comparison.charts">
              <h2 className="font-bold text-[#D4AF37] mb-4">
                {hi ? "३. जन्म कुंडली" : "3. Birth Charts"}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <NorthChart
                  personName={form1.name || "Person 1"}
                  lagnaName={signName(astro1.lagna?.sign)}
                />
                <NorthChart
                  personName={form2.name || "Person 2"}
                  lagnaName={signName(astro2.lagna?.sign)}
                />
              </div>
            </OrnamentalCard>

            <OrnamentalCard data-ocid="horoscope_comparison.predictions">
              <h2 className="font-bold text-[#D4AF37] mb-4">
                {hi ? "४. संबंध भविष्यवाणी" : "4. Relationship Predictions"}
              </h2>
              <Tabs defaultValue="marriage">
                <TabsList className="mb-4 w-full">
                  <TabsTrigger
                    value="marriage"
                    className="flex-1"
                    data-ocid="horoscope_comparison.tab_marriage"
                  >
                    {hi ? "💍 विवाह" : "💍 Marriage"}
                  </TabsTrigger>
                  <TabsTrigger
                    value="business"
                    className="flex-1"
                    data-ocid="horoscope_comparison.tab_business"
                  >
                    {hi ? "💼 व्यापार" : "💼 Business"}
                  </TabsTrigger>
                  <TabsTrigger
                    value="friendship"
                    className="flex-1"
                    data-ocid="horoscope_comparison.tab_friendship"
                  >
                    {hi ? "🤝 मित्रता" : "🤝 Friendship"}
                  </TabsTrigger>
                </TabsList>
                {(["marriage", "business", "friendship"] as const).map(
                  (tab) => (
                    <TabsContent key={tab} value={tab}>
                      <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl border border-[#D4AF37]/20">
                        <div className="flex-1">
                          <Badge
                            className="mb-2 text-xs"
                            style={{
                              background: `${compat.color}20`,
                              color: compat.color,
                              border: `1px solid ${compat.color}40`,
                            }}
                          >
                            {compat.label} — {totalScore}/36
                          </Badge>
                          <p className="text-sm text-foreground leading-relaxed">
                            {getPredText(totalScore, tab, hi)}
                          </p>
                        </div>
                        <SpeakerButton
                          text={getPredText(totalScore, tab, hi)}
                          lang={hi ? "hi-IN" : "en-IN"}
                          size="sm"
                        />
                      </div>
                    </TabsContent>
                  ),
                )}
              </Tabs>
            </OrnamentalCard>
          </div>
        )}
      </div>
    </div>
  );
}
