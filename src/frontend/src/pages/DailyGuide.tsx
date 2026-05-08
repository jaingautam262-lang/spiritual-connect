import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronUp, Share2 } from "lucide-react";
import { useState } from "react";
import {
  LUCKY_NUMBER_DATA,
  MOBILE_FEEDBACK,
  NAME_VIBRATION_MAP,
  PALM_MOUNTS,
  VASTU_GRID,
  VIBRATION_CAREERS,
  ZODIAC_DATA,
} from "../data/dailyGuideData";

// ———————— Helpers ————————
function sumDigits(n: number): number {
  let s = n;
  while (s > 9)
    s = String(s)
      .split("")
      .reduce((a, d) => a + Number(d), 0);
  return s;
}
function moolankFromDob(dob: string): number {
  const day = Number(dob.split("-")[2]);
  return sumDigits(day);
}
function nameVibration(name: string): number {
  const sum = name
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .split("")
    .reduce((a, c) => a + (NAME_VIBRATION_MAP[c] ?? 0), 0);
  return sumDigits(sum) || 0;
}
function shareResult(text: string) {
  if (navigator.share) {
    void navigator.share({ title: "Spiritual Connect — My Result", text });
  } else {
    void navigator.clipboard.writeText(text);
    alert("Result copied to clipboard!");
  }
}

// ———————— Tool Cards ————————
interface ToolCardProps {
  id: string;
  emoji: string;
  title: string;
  titleHi: string;
  children: React.ReactNode;
  lang: "en" | "hi";
}
function ToolCard({
  id,
  emoji,
  title,
  titleHi,
  children,
  lang,
}: ToolCardProps) {
  const [open, setOpen] = useState(false);
  return (
    <div data-ocid={`dg.tool.${id}`} className="temple-card overflow-hidden">
      <button
        data-ocid={`dg.toggle.${id}`}
        className="w-full flex items-center gap-4 p-5 text-left"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0"
          style={{ background: "oklch(0.62 0.18 48 / 0.1)" }}
        >
          {emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="font-heading font-bold text-base"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            {lang === "hi" ? titleHi : title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {lang === "hi" ? "क्लिक करें और उपकरण खोलें" : "Click to open the tool"}
          </p>
        </div>
        {open ? (
          <ChevronUp className="w-5 h-5 text-amber-500 shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-amber-500 shrink-0" />
        )}
      </button>
      {open && (
        <div className="border-t border-border px-5 pb-6 pt-4">{children}</div>
      )}
    </div>
  );
}

// ———————— Tool 1: Lucky Number ————————
function LuckyNumberTool({ lang }: { lang: "en" | "hi" }) {
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<null | { moolank: number }>(null);
  const t = (en: string, hi: string) => (lang === "hi" ? hi : en);
  function calc() {
    if (dob) setResult({ moolank: moolankFromDob(dob) });
  }
  const data = result ? LUCKY_NUMBER_DATA[result.moolank] : null;
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="ln-dob">{t("Date of Birth", "जन्म तिथि")}</Label>
        <Input
          id="ln-dob"
          type="date"
          data-ocid="dg.lucky.dob_input"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="mt-1"
        />
      </div>
      <Button
        data-ocid="dg.lucky.submit"
        className="btn-spiritual w-full"
        onClick={calc}
        disabled={!dob}
      >
        {t("Calculate", "गणना करें")}
      </Button>
      {data && (
        <div
          data-ocid="dg.lucky.success_state"
          className="grid grid-cols-2 gap-3"
        >
          {[
            {
              label: t("Lucky Number", "भाग्यांक"),
              value: String(result!.moolank),
            },
            {
              label: t("Lucky Color", "भाग्यशाली रंग"),
              value: lang === "hi" ? data.colorHi : data.color,
            },
            {
              label: t("Lucky Day", "भाग्यशाली दिन"),
              value: lang === "hi" ? data.dayHi : data.day,
            },
            {
              label: t("Lucky Gem", "भाग्यशाली रत्न"),
              value: lang === "hi" ? data.gemHi : data.gem,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-3 border border-amber-200"
            >
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="font-bold text-amber-700">{item.value}</p>
            </div>
          ))}
          <div className="col-span-2 bg-amber-50 rounded-xl p-3 border border-amber-200">
            <p className="text-xs italic text-amber-700">
              &ldquo;{lang === "hi" ? data.affirmationHi : data.affirmation}
              &rdquo;
            </p>
          </div>
          <Button
            variant="outline"
            data-ocid="dg.lucky.share"
            size="sm"
            className="col-span-2 border-amber-300 text-amber-700"
            onClick={() =>
              shareResult(
                `My Lucky Number: ${result!.moolank} | Day: ${data.day} | Gem: ${data.gem}`,
              )
            }
          >
            <Share2 className="w-3 h-3 mr-2" />
            {t("Share Result", "परिणाम साझा करें")}
          </Button>
        </div>
      )}
    </div>
  );
}

// ———————— Tool 2: Mobile Numerology ————————
function MobileNumerologyTool({ lang }: { lang: "en" | "hi" }) {
  const [mobile, setMobile] = useState("");
  const [result, setResult] = useState<null | number>(null);
  const t = (en: string, hi: string) => (lang === "hi" ? hi : en);
  function calc() {
    const digits = mobile.replace(/\D/g, "");
    if (!digits.length) return;
    const sum = digits.split("").reduce((a, c) => a + Number(c), 0);
    setResult(sumDigits(sum));
  }
  const data =
    result != null ? (MOBILE_FEEDBACK[result] ?? MOBILE_FEEDBACK[0]) : null;
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="mob-num">{t("Mobile Number", "मोबाइल नंबर")}</Label>
        <Input
          id="mob-num"
          type="tel"
          data-ocid="dg.mobile.input"
          placeholder="9876543210"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="mt-1"
        />
      </div>
      <Button
        data-ocid="dg.mobile.submit"
        className="btn-spiritual w-full"
        onClick={calc}
        disabled={!mobile.replace(/\D/g, "").length}
      >
        {t("Analyze", "विश्लेषण करें")}
      </Button>
      {data && (
        <div data-ocid="dg.mobile.success_state" className="space-y-3">
          <div
            className={`rounded-xl p-4 border ${data.favorable ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{data.favorable ? "✅" : "⚠️"}</span>
              <Badge
                className={
                  data.favorable
                    ? "bg-green-100 text-green-700 border-green-300"
                    : "bg-red-100 text-red-700 border-red-300"
                }
              >
                {data.favorable
                  ? t("Favorable", "अनुकूल")
                  : t("Unfavorable", "प्रतिकूल")}
              </Badge>
              <span className="ml-auto font-bold text-lg">
                {t(`Sum: ${result}`, `योग: ${result}`)}
              </span>
            </div>
            <p className="text-sm">
              {lang === "hi" ? data.summaryHi : data.summary}
            </p>
          </div>
          {(lang === "hi" ? data.suggestionsHi : data.suggestions).map(
            (s, _i) => (
              <p key={s} className="text-sm text-muted-foreground">
                &#8226; {s}
              </p>
            ),
          )}
          <Button
            variant="outline"
            data-ocid="dg.mobile.share"
            size="sm"
            className="w-full border-amber-300 text-amber-700"
            onClick={() =>
              shareResult(`Mobile Number Sum: ${result} — ${data.summary}`)
            }
          >
            <Share2 className="w-3 h-3 mr-2" />
            {t("Share Result", "परिणाम साझा करें")}
          </Button>
        </div>
      )}
    </div>
  );
}

// ———————— Tool 3: Name Vibration ————————
function NameVibrationTool({ lang }: { lang: "en" | "hi" }) {
  const [name, setName] = useState("");
  const [result, setResult] = useState<null | number>(null);
  const t = (en: string, hi: string) => (lang === "hi" ? hi : en);
  function calc() {
    if (name.trim()) setResult(nameVibration(name));
  }
  const data = result ? VIBRATION_CAREERS[result] : null;
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="nv-name">
          {t("Full Name (English letters)", "पूरा नाम (अंग्रेज़ी अक्षरों में)")}
        </Label>
        <Input
          id="nv-name"
          data-ocid="dg.name.input"
          placeholder="Rajesh Kumar"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1"
        />
      </div>
      <Button
        data-ocid="dg.name.submit"
        className="btn-spiritual w-full"
        onClick={calc}
        disabled={!name.trim()}
      >
        {t("Calculate Vibration", "विंंबन गणना करें")}
      </Button>
      {data && result && (
        <div data-ocid="dg.name.success_state" className="space-y-3">
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200">
            <p className="text-xs text-muted-foreground">
              {t("Name Vibration Number", "नाम कंपन अंक")}
            </p>
            <p className="font-heading font-bold text-5xl text-violet-600">
              {result}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-amber-50 rounded-xl p-3 border border-amber-200">
              <p className="text-xs text-muted-foreground mb-1">
                {t("Compatible Careers", "उपयुक्त कैरियर")}
              </p>
              {(lang === "hi" ? data.careersHi : data.careers).map((c) => (
                <p key={c} className="text-xs font-semibold text-amber-700">
                  &#8226; {c}
                </p>
              ))}
            </div>
            <div className="bg-pink-50 rounded-xl p-3 border border-pink-200">
              <p className="text-xs text-muted-foreground mb-1">
                {t("Power Color", "शक्ति रंग")}
              </p>
              <p className="font-semibold text-sm text-pink-700">
                {lang === "hi" ? data.colorHi : data.color}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            data-ocid="dg.name.share"
            size="sm"
            className="w-full border-amber-300 text-amber-700"
            onClick={() =>
              shareResult(
                `${name}'s Vibration Number: ${result} | Careers: ${data.careers.join(", ")}`,
              )
            }
          >
            <Share2 className="w-3 h-3 mr-2" />
            {t("Share Result", "परिणाम साझा करें")}
          </Button>
        </div>
      )}
    </div>
  );
}

// ———————— Tool 4: Daily Horoscope ————————
function DailyHoroscopeTool({ lang }: { lang: "en" | "hi" }) {
  const [sign, setSign] = useState("");
  const t = (en: string, hi: string) => (lang === "hi" ? hi : en);
  const zodiac = ZODIAC_DATA.find((z) => z.sign === sign);
  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div className="space-y-4">
      <div>
        <Label>{t("Select Your Zodiac Sign", "अपनी राशि चुनें")}</Label>
        <Select value={sign} onValueChange={setSign}>
          <SelectTrigger data-ocid="dg.horoscope.select" className="mt-1">
            <SelectValue placeholder={t("Choose zodiac sign", "राशि चुनें")} />
          </SelectTrigger>
          <SelectContent>
            {ZODIAC_DATA.map((z) => (
              <SelectItem key={z.sign} value={z.sign}>
                {z.symbol} {lang === "hi" ? z.signHi : z.sign} ({z.dates})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {zodiac && (
        <div
          data-ocid="dg.horoscope.success_state"
          className="rounded-xl overflow-hidden border border-amber-200"
        >
          <div className="spiritual-gradient p-4 flex items-center gap-3">
            <span className="text-4xl">{zodiac.emoji}</span>
            <div>
              <p
                className="font-heading font-bold text-lg"
                style={{ color: "oklch(0.99 0.005 80)" }}
              >
                {lang === "hi" ? zodiac.signHi : zodiac.sign}
              </p>
              <p className="text-xs" style={{ color: "oklch(0.78 0.14 75)" }}>
                {today}
              </p>
            </div>
          </div>
          <div className="p-4 bg-amber-50">
            <p className="text-sm leading-relaxed">
              {lang === "hi" ? zodiac.predictionHi : zodiac.prediction}
            </p>
            <div className="flex gap-3 mt-3 text-xs text-muted-foreground">
              <span>
                {t("Element", "तत्व")}: <strong>{zodiac.element}</strong>
              </span>
              <span>
                {t("Lucky Day", "मंगल दिन")}: <strong>{zodiac.lucky}</strong>
              </span>
            </div>
          </div>
          <div className="px-4 pb-4 bg-amber-50">
            <Button
              variant="outline"
              data-ocid="dg.horoscope.share"
              size="sm"
              className="w-full border-amber-300 text-amber-700"
              onClick={() =>
                shareResult(`${zodiac.sign} Horoscope: ${zodiac.prediction}`)
              }
            >
              <Share2 className="w-3 h-3 mr-2" />
              {t("Share", "शेयर करें")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ———————— Tool 5: Palmistry ————————
function PalmistryTool({ lang }: { lang: "en" | "hi" }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "hand">("grid");
  const t = (en: string, hi: string) => (lang === "hi" ? hi : en);
  const mount = PALM_MOUNTS.find((m) => m.id === selected);
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          type="button"
          data-ocid="dg.palm.grid_toggle"
          onClick={() => setViewMode("grid")}
          className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${viewMode === "grid" ? "bg-amber-500 text-white border-amber-500" : "border-amber-200 text-amber-700"}`}
        >
          {t("Grid View", "ग्रिड दृश्य")}
        </button>
        <button
          type="button"
          data-ocid="dg.palm.hand_toggle"
          onClick={() => setViewMode("hand")}
          className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${viewMode === "hand" ? "bg-amber-500 text-white border-amber-500" : "border-amber-200 text-amber-700"}`}
        >
          {t("Hand View", "हस्त दृश्य")}
        </button>
      </div>

      {viewMode === "hand" ? (
        <div className="relative bg-amber-50 rounded-xl border border-amber-200 p-4">
          <p className="text-center text-sm text-muted-foreground mb-4">
            {t(
              "Tap a mount to learn its meaning",
              "अर्थ जानने के लिए किसी पर्वत पर टैप करें",
            )}
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {PALM_MOUNTS.map((m) => (
              <button
                key={m.id}
                type="button"
                data-ocid={`dg.palm.mount.${m.id}`}
                onClick={() => setSelected(m.id === selected ? null : m.id)}
                className="rounded-full px-3 py-1.5 text-xs font-semibold text-white transition-all"
                style={{
                  background:
                    selected === m.id ? "oklch(0.35 0.12 25)" : m.color,
                }}
              >
                {lang === "hi" ? m.nameHi : m.name}
              </button>
            ))}
          </div>
          {mount && (
            <div className="mt-4 bg-card rounded-xl p-4 border border-amber-200">
              <p
                className="font-heading font-bold text-sm mb-2"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                {lang === "hi" ? mount.nameHi : mount.name} —{" "}
                {lang === "hi" ? mount.planetHi : mount.planet}
              </p>
              <p className="text-sm text-muted-foreground">
                {lang === "hi" ? mount.meaningHi : mount.meaning}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-green-50 p-2 rounded-lg border border-green-100">
                  <p className="font-semibold text-green-700 mb-0.5">
                    {t("Well developed", "अच्छी तरह विकसित")}
                  </p>
                  <p className="text-muted-foreground">
                    {lang === "hi"
                      ? mount.wellDevelopedHi
                      : mount.wellDeveloped}
                  </p>
                </div>
                <div className="bg-red-50 p-2 rounded-lg border border-red-100">
                  <p className="font-semibold text-red-700 mb-0.5">
                    {t("Underdeveloped", "अविकसित")}
                  </p>
                  <p className="text-muted-foreground">
                    {lang === "hi"
                      ? mount.underdevelopedHi
                      : mount.underdeveloped}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {PALM_MOUNTS.map((m) => (
            <button
              key={m.id}
              type="button"
              data-ocid={`dg.palm.list.${m.id}`}
              onClick={() => setSelected(m.id === selected ? null : m.id)}
              className="w-full text-left rounded-xl p-3 border transition-colors hover:bg-amber-50"
              style={{
                borderColor:
                  selected === m.id ? m.color : "oklch(0.85 0.04 70)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ background: m.color }}
                />
                <div className="min-w-0 flex-1">
                  <p
                    className="font-semibold text-sm"
                    style={{ color: "oklch(0.35 0.12 25)" }}
                  >
                    {lang === "hi" ? m.nameHi : m.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {lang === "hi" ? m.locationHi : m.location}
                  </p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-amber-500 shrink-0 transition-transform ${selected === m.id ? "rotate-180" : ""}`}
                />
              </div>
              {selected === m.id && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-sm">
                    {lang === "hi" ? m.meaningHi : m.meaning}
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-green-50 p-2 rounded-lg">
                      <p className="font-semibold text-green-700">
                        {t("Well developed", "अच्छी")}
                      </p>
                      <p className="text-muted-foreground">
                        {lang === "hi" ? m.wellDevelopedHi : m.wellDeveloped}
                      </p>
                    </div>
                    <div className="bg-red-50 p-2 rounded-lg">
                      <p className="font-semibold text-red-700">
                        {t("Flat", "कम")}
                      </p>
                      <p className="text-muted-foreground">
                        {lang === "hi" ? m.underdevelopedHi : m.underdeveloped}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ———————— Tool 6: Vastu Check ————————
function VastuCheckTool({ lang }: { lang: "en" | "hi" }) {
  const [direction, setDirection] = useState("");
  const [roomType, setRoomType] = useState("");
  const t = (en: string, hi: string) => (lang === "hi" ? hi : en);
  const directions = Array.from(new Set(VASTU_GRID.map((v) => v.direction)));
  const roomTypes = Array.from(new Set(VASTU_GRID.map((v) => v.roomType)));
  const result = VASTU_GRID.find(
    (v) => v.direction === direction && v.roomType === roomType,
  );
  function scoreColor(score: number) {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-amber-600";
    return "text-red-600";
  }
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>{t("Direction", "दिशा")}</Label>
          <Select value={direction} onValueChange={setDirection}>
            <SelectTrigger
              data-ocid="dg.vastu.direction_select"
              className="mt-1"
            >
              <SelectValue placeholder={t("Direction", "दिशा")} />
            </SelectTrigger>
            <SelectContent>
              {directions.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>{t("Room Type", "कक्ष का प्रकार")}</Label>
          <Select value={roomType} onValueChange={setRoomType}>
            <SelectTrigger data-ocid="dg.vastu.room_select" className="mt-1">
              <SelectValue placeholder={t("Room Type", "कक्ष")} />
            </SelectTrigger>
            <SelectContent>
              {roomTypes.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {result && (
        <div data-ocid="dg.vastu.success_state" className="space-y-3">
          <div className="rounded-xl border border-amber-200 overflow-hidden">
            <div className="spiritual-gradient p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="font-heading font-bold"
                    style={{ color: "oklch(0.99 0.005 80)" }}
                  >
                    {lang === "hi" ? result.directionHi : result.direction} —{" "}
                    {lang === "hi" ? result.roomTypeHi : result.roomType}
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    {t("Deity", "देवता")}:{" "}
                    {lang === "hi" ? result.deityHi : result.deity}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className="text-xs"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    {t("Vastu Score", "वास्तु स्कोर")}
                  </p>
                  <p
                    className={`font-heading font-bold text-3xl ${scoreColor(result.score)}`}
                    style={{
                      color:
                        result.score >= 70 ? "oklch(0.78 0.14 75)" : undefined,
                    }}
                  >
                    {result.score}/100
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-amber-50 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">
                {t("Recommended Colors", "अनुशंसित रंग")}
              </p>
              <div className="flex gap-2">
                {result.colors.map((c) => (
                  <span
                    key={c}
                    className="w-8 h-8 rounded-full border-2 border-white shadow"
                    style={{ background: c }}
                    title={c}
                  />
                ))}
              </div>
              <p className="text-xs font-semibold text-muted-foreground mt-2">
                {t("Vastu Tips", "वास्तु सुझाव")}
              </p>
              {(lang === "hi" ? result.tipsHi : result.tips).map((tip, _i) => (
                <p key={tip} className="text-xs text-muted-foreground">
                  &#8226; {tip}
                </p>
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            data-ocid="dg.vastu.share"
            size="sm"
            className="w-full border-amber-300 text-amber-700"
            onClick={() =>
              shareResult(
                `Vastu Score for ${result.direction} ${result.roomType}: ${result.score}/100`,
              )
            }
          >
            <Share2 className="w-3 h-3 mr-2" />
            {t("Share Result", "परिणाम साझा करें")}
          </Button>
        </div>
      )}
    </div>
  );
}

// ———————— Main Page ————————
export default function DailyGuide() {
  const [lang, setLang] = useState<"en" | "hi">("en");
  return (
    <div className="min-h-screen bg-background">
      <div className="spiritual-gradient py-12 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center gap-2 mb-4">
            <button
              type="button"
              data-ocid="dg.lang.en"
              onClick={() => setLang("en")}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${lang === "en" ? "bg-amber-500 text-white border-amber-500" : "border-amber-400/50 text-amber-300"}`}
            >
              EN
            </button>
            <button
              type="button"
              data-ocid="dg.lang.hi"
              onClick={() => setLang("hi")}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${lang === "hi" ? "bg-amber-500 text-white border-amber-500" : "border-amber-400/50 text-amber-300"}`}
            >
              हि
            </button>
          </div>
          <p
            className="text-xs uppercase tracking-widest mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {lang === "hi" ? "निशुल्क उपकरण" : "Free Tools"}
          </p>
          <h1
            className="font-heading text-4xl md:text-5xl font-bold"
            style={{ color: "oklch(0.99 0.005 80)" }}
          >
            {lang === "hi" ? "दैनिक आध्यात्मिक मार्गदर्शन" : "Daily Spiritual Guide"}
          </h1>
          <p className="mt-2 text-sm" style={{ color: "oklch(0.85 0.02 80)" }}>
            {lang === "hi"
              ? "6 मुफ़्त उपकरण — लॉगिन की आवश्यकता नहीं"
              : "6 free tools — no login required"}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-4">
        <ToolCard
          id="lucky"
          emoji="🔢"
          title="Lucky Number"
          titleHi="भाग्यांक कैलकुलेटर"
          lang={lang}
        >
          <LuckyNumberTool lang={lang} />
        </ToolCard>
        <ToolCard
          id="mobile"
          emoji="📱"
          title="Mobile Numerology"
          titleHi="मोबाइल अंकज्योतिष"
          lang={lang}
        >
          <MobileNumerologyTool lang={lang} />
        </ToolCard>
        <ToolCard
          id="name"
          emoji="✍️"
          title="Name Vibration"
          titleHi="नाम कंपन"
          lang={lang}
        >
          <NameVibrationTool lang={lang} />
        </ToolCard>
        <ToolCard
          id="horoscope"
          emoji="✨"
          title="Daily Horoscope"
          titleHi="दैनिक राशिफल"
          lang={lang}
        >
          <DailyHoroscopeTool lang={lang} />
        </ToolCard>
        <ToolCard
          id="palmistry"
          emoji="✋"
          title="Palmistry Guide"
          titleHi="हस्तरेखा मार्गदर्शिका"
          lang={lang}
        >
          <PalmistryTool lang={lang} />
        </ToolCard>
        <ToolCard
          id="vastu"
          emoji="🏠"
          title="Vastu Check"
          titleHi="वास्तु जांच"
          lang={lang}
        >
          <VastuCheckTool lang={lang} />
        </ToolCard>

        {/* Login prompt */}
        <div className="text-center py-8 border-t border-border">
          <p className="text-muted-foreground text-sm">
            {lang === "hi"
              ? "इतिहास सहेजने और व्यक्तिगतकरण के लिए"
              : "To save your history & get personalized recommendations"}{" "}
            <button
              type="button"
              data-ocid="dg.login_prompt"
              className="text-amber-600 font-semibold hover:underline"
            >
              {lang === "hi" ? "लॉगिन करें" : "Login here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
