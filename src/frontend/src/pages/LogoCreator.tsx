import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import type { BirthData } from "../hooks/useAstrology";
import { useAstrology } from "../hooks/useAstrology";
import { useNumerology } from "../hooks/useNumerology";
import {
  SACRED_SYMBOLS,
  getAstrologyAlignment,
  getLoShuActivation,
  getNumerologyAlignment,
} from "../utils/logoCreator";

// ─── Birth Data Guard ─────────────────────────────────────────────────────────
function useBirthData() {
  const [birthData, setBirthData] = useState<BirthData | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("spiritualConnect_birthData");
      if (raw) setBirthData(JSON.parse(raw));
    } catch {}
  }, []);
  return birthData;
}

// ─── Ornamental Card ─────────────────────────────────────────────────────────
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

// ─── Score Ring ───────────────────────────────────────────────────────────────
function ScoreRing({ score, label }: { score: number; label: string }) {
  const color = score >= 70 ? "#22c55e" : score >= 45 ? "#D4AF37" : "#ef4444";
  return (
    <div className="flex flex-col items-center gap-1">
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        role="img"
        aria-label={`${label}: ${score}%`}
      >
        <circle
          cx="28"
          cy="28"
          r="22"
          fill="none"
          stroke="#f3e9c2"
          strokeWidth="5"
        />
        <circle
          cx="28"
          cy="28"
          r="22"
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeDasharray={`${(score / 100) * 138.2} 138.2`}
          strokeLinecap="round"
          transform="rotate(-90 28 28)"
        />
        <text
          x="28"
          y="33"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={color}
        >
          {score}
        </text>
      </svg>
      <span className="text-xs text-muted-foreground text-center">{label}</span>
    </div>
  );
}

export default function LogoCreator() {
  const { language } = useLanguage();
  const hi = language === "hi";
  const birthData = useBirthData();
  const astro = useAstrology(birthData);
  const numerology = useNumerology(birthData);

  const [selectedSymbolIds, setSelectedSymbolIds] = useState<string[]>([]);
  const [bgColor, setBgColor] = useState("#FFFDF5");
  const [textContent, setTextContent] = useState("");
  const [textColor, setTextColor] = useState("#FF9933");
  const [fontSize, setFontSize] = useState(24);
  const [symbolSize, setSymbolSize] = useState(80);
  const [symbolX, setSymbolX] = useState(160);
  const [symbolY, setSymbolY] = useState(140);
  const [symbolColor, setSymbolColor] = useState("#D4AF37");
  const [fontChoice, setFontChoice] = useState<"devanagari" | "latin">("latin");
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const CATEGORIES = [
    { id: "vedic", label: hi ? "वैदिक" : "Vedic" },
    { id: "navgraha", label: hi ? "नवग्रह" : "Navgraha" },
    { id: "zodiac", label: hi ? "राशि" : "Zodiac" },
    { id: "geometry", label: hi ? "ज्यामिति" : "Geometry" },
  ] as const;
  const [activeCategory, setActiveCategory] = useState<string>("vedic");

  const filteredSymbols = useMemo(
    () =>
      SACRED_SYMBOLS.filter(
        (s) => s.category === activeCategory || activeCategory === "all",
      ),
    [activeCategory],
  );

  const toggleSymbol = useCallback((id: string) => {
    setSelectedSymbolIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const mulank = numerology.mulank || 1;
  const bhagyank = numerology.bhagyank || 1;
  const lagnaSign = astro.lagna?.sign || 1;
  const moonSign = astro.planetPositions?.Moon?.sign || 1;

  const numAlign = useMemo(
    () => getNumerologyAlignment(selectedSymbolIds, mulank, bhagyank),
    [selectedSymbolIds, mulank, bhagyank],
  );
  const astroAlign = useMemo(
    () =>
      getAstrologyAlignment(
        [symbolColor, bgColor],
        lagnaSign,
        Math.max(1, moonSign),
      ),
    [symbolColor, bgColor, lagnaSign, moonSign],
  );
  const loShuAct = useMemo(
    () => getLoShuActivation(selectedSymbolIds, numerology.missingNumbers),
    [selectedSymbolIds, numerology.missingNumbers],
  );

  const primarySymbol =
    selectedSymbolIds.length > 0
      ? SACRED_SYMBOLS.find((s) => s.id === selectedSymbolIds[0])
      : null;

  // Export PNG using canvas
  const handleExportPNG = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, 400, 400);
    if (textContent) {
      ctx.fillStyle = textColor;
      ctx.font = `${fontSize}px ${fontChoice === "devanagari" ? "'Noto Sans Devanagari'" : "Inter"}`;
      ctx.textAlign = "center";
      ctx.fillText(textContent, 200, 360);
    }
    const link = document.createElement("a");
    link.download = "spiritual-logo.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  if (!birthData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <OrnamentalCard className="max-w-md text-center p-8">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            {hi ? "जन्म विवरण आवश्यक" : "Birth Details Required"}
          </h2>
          <p className="text-muted-foreground mb-4">
            {hi
              ? "लोगो क्रिएटर उपयोग करने के लिए पहले अपना जन्म विवरण भरें।"
              : "Please fill your birth details to use the Logo Creator."}
          </p>
          <a href="/vedic-dashboard">
            <Button className="bg-[#FF9933] hover:bg-[#e8871e] text-white">
              {hi ? "जन्म विवरण भरें" : "Fill Birth Details"}
            </Button>
          </a>
        </OrnamentalCard>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-background py-6 px-4"
      data-ocid="logo_creator.page"
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <OrnamentalCard className="text-center py-5">
          <h1
            className="text-2xl md:text-3xl font-bold"
            style={{ color: "#FF9933" }}
          >
            {hi
              ? "✦ लोगो निर्माता — Sacred Logo Creator ✦"
              : "✦ Sacred Logo Creator — लोगो निर्माता ✦"}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {hi
              ? "अंक ज्योतिष + वैदिक ज्योतिष संरेखण के साथ पवित्र लोगो बनाएं"
              : "Build logos aligned with your Numerology + Vedic Astrology"}
          </p>
        </OrnamentalCard>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ─── LEFT: Canvas + Controls ─── */}
        <div className="space-y-4">
          {/* Canvas Preview */}
          <OrnamentalCard>
            <h2 className="text-sm font-semibold text-[#D4AF37] mb-3">
              {hi ? "लाइव प्रीव्यू" : "Live Preview"}
            </h2>
            <div
              ref={canvasContainerRef}
              className="relative mx-auto rounded-lg overflow-hidden border border-[#D4AF37]"
              style={{ width: 320, height: 320, background: bgColor }}
              data-ocid="logo_creator.canvas_target"
            >
              {/* Grid lines */}
              <svg
                aria-hidden="true"
                className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
              >
                {[1, 2, 3, 4, 5].map((i) => (
                  <g key={i}>
                    <line
                      x1={i * 53}
                      y1="0"
                      x2={i * 53}
                      y2="320"
                      stroke="#D4AF37"
                      strokeWidth="1"
                    />
                    <line
                      x1="0"
                      y1={i * 53}
                      x2="320"
                      y2={i * 53}
                      stroke="#D4AF37"
                      strokeWidth="1"
                    />
                  </g>
                ))}
              </svg>
              {/* Symbol overlay */}
              {primarySymbol && (
                <svg
                  aria-hidden="true"
                  className="absolute"
                  style={{
                    left: symbolX - symbolSize / 2,
                    top: symbolY - symbolSize / 2,
                    width: symbolSize,
                    height: symbolSize,
                  }}
                  viewBox="0 0 70 70"
                >
                  <path
                    d={primarySymbol.svgPath}
                    stroke={symbolColor}
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              )}
              {/* Text overlay */}
              {textContent && (
                <div
                  className="absolute bottom-4 w-full text-center px-2 truncate"
                  style={{
                    color: textColor,
                    fontSize: `${fontSize}px`,
                    fontFamily:
                      fontChoice === "devanagari"
                        ? "'Noto Sans Devanagari', sans-serif"
                        : "Inter, sans-serif",
                  }}
                >
                  {textContent}
                </div>
              )}
              {!primarySymbol && !textContent && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl opacity-20">✦</span>
                </div>
              )}
            </div>
          </OrnamentalCard>

          {/* Symbol Picker */}
          <OrnamentalCard>
            <h2 className="text-sm font-semibold text-[#D4AF37] mb-2">
              {hi ? "पवित्र प्रतीक चुनें" : "Choose Sacred Symbol"}
            </h2>
            <div
              className="flex gap-2 mb-3 flex-wrap"
              data-ocid="logo_creator.symbol_category_tabs"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  data-ocid={`logo_creator.symbol_tab.${cat.id}`}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                    activeCategory === cat.id
                      ? "bg-[#D4AF37] text-white border-[#D4AF37]"
                      : "border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
              {filteredSymbols.map((sym, i) => (
                <button
                  key={sym.id}
                  type="button"
                  onClick={() => toggleSymbol(sym.id)}
                  data-ocid={`logo_creator.symbol_card.${i + 1}`}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg border text-xs transition-all ${
                    selectedSymbolIds.includes(sym.id)
                      ? "border-[#FF9933] bg-[#FF9933]/10 shadow"
                      : "border-border hover:border-[#D4AF37]"
                  }`}
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 70 70"
                    className="w-8 h-8"
                  >
                    <path
                      d={sym.svgPath}
                      stroke={symbolColor}
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                  <span
                    className="truncate w-full text-center leading-tight"
                    title={hi ? sym.nameHi : sym.name}
                  >
                    {hi ? sym.nameHi : sym.name.split(" ")[0]}
                  </span>
                  <Badge
                    variant="outline"
                    className="text-[9px] px-1 py-0 border-[#D4AF37] text-[#D4AF37]"
                  >
                    {sym.numerologyNumber}
                  </Badge>
                </button>
              ))}
            </div>
          </OrnamentalCard>

          {/* Controls */}
          <OrnamentalCard>
            <h2 className="text-sm font-semibold text-[#D4AF37] mb-3">
              {hi ? "नियंत्रण" : "Controls"}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground">
                  {hi ? "प्रतीक X" : "Symbol X"}
                </Label>
                <Slider
                  min={0}
                  max={320}
                  value={[symbolX]}
                  onValueChange={([v]) => setSymbolX(v)}
                  className="mt-1"
                  data-ocid="logo_creator.symbol_x_slider"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">
                  {hi ? "प्रतीक Y" : "Symbol Y"}
                </Label>
                <Slider
                  min={0}
                  max={320}
                  value={[symbolY]}
                  onValueChange={([v]) => setSymbolY(v)}
                  className="mt-1"
                  data-ocid="logo_creator.symbol_y_slider"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">
                  {hi ? "आकार" : "Size"}
                </Label>
                <Slider
                  min={30}
                  max={200}
                  value={[symbolSize]}
                  onValueChange={([v]) => setSymbolSize(v)}
                  className="mt-1"
                  data-ocid="logo_creator.symbol_size_slider"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">
                  {hi ? "प्रतीक रंग" : "Symbol Color"}
                </Label>
                <input
                  type="color"
                  value={symbolColor}
                  onChange={(e) => setSymbolColor(e.target.value)}
                  className="mt-1 h-8 w-full rounded cursor-pointer"
                  data-ocid="logo_creator.symbol_color_input"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">
                  {hi ? "पृष्ठभूमि रंग" : "Background Color"}
                </Label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="mt-1 h-8 w-full rounded cursor-pointer"
                  data-ocid="logo_creator.bg_color_input"
                />
              </div>
            </div>

            <div className="mt-3 space-y-2">
              <Label className="text-xs text-muted-foreground">
                {hi ? "पाठ सामग्री" : "Text Content"}
              </Label>
              <Input
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder={
                  hi ? "अपना नाम / ब्रांड लिखें" : "Enter your name / brand"
                }
                data-ocid="logo_creator.text_input"
              />
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label className="text-xs text-muted-foreground">
                    {hi ? "फ़ॉन्ट साइज़" : "Font Size"}
                  </Label>
                  <Slider
                    min={10}
                    max={48}
                    value={[fontSize]}
                    onValueChange={([v]) => setFontSize(v)}
                    className="mt-1"
                    data-ocid="logo_creator.fontsize_slider"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">
                    {hi ? "पाठ रंग" : "Text Color"}
                  </Label>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="mt-1 h-8 w-full rounded cursor-pointer"
                    data-ocid="logo_creator.text_color_input"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">
                    {hi ? "फ़ॉन्ट" : "Font"}
                  </Label>
                  <select
                    value={fontChoice}
                    onChange={(e) =>
                      setFontChoice(e.target.value as "devanagari" | "latin")
                    }
                    className="mt-1 h-8 w-full rounded border border-input bg-background text-xs px-2"
                    data-ocid="logo_creator.font_select"
                  >
                    <option value="latin">Inter/Latin</option>
                    <option value="devanagari">Devanagari</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button
                onClick={handleExportPNG}
                className="flex-1 bg-[#FF9933] hover:bg-[#e8871e] text-white text-sm"
                data-ocid="logo_creator.export_png_button"
              >
                {hi ? "PNG डाउनलोड" : "Export PNG"}
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-[#D4AF37] text-[#D4AF37] text-sm"
                data-ocid="logo_creator.export_svg_button"
                onClick={() => {
                  if (!primarySymbol) return;
                  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" width="320" height="320"><rect width="320" height="320" fill="${bgColor}"/><svg x="${symbolX - symbolSize / 2}" y="${symbolY - symbolSize / 2}" width="${symbolSize}" height="${symbolSize}" viewBox="0 0 70 70"><path d="${primarySymbol.svgPath}" stroke="${symbolColor}" stroke-width="2" fill="none"/></svg>${textContent ? `<text x="160" y="310" text-anchor="middle" font-size="${fontSize}" fill="${textColor}">${textContent}</text>` : ""}</svg>`;
                  const blob = new Blob([svg], { type: "image/svg+xml" });
                  const link = document.createElement("a");
                  link.download = "spiritual-logo.svg";
                  link.href = URL.createObjectURL(blob);
                  link.click();
                }}
              >
                {hi ? "SVG डाउनलोड" : "Export SVG"}
              </Button>
            </div>
          </OrnamentalCard>
        </div>

        {/* ─── RIGHT: Alignment Panels ─── */}
        <div className="space-y-4">
          {/* Numerology Alignment */}
          <OrnamentalCard data-ocid="logo_creator.numerology_panel">
            <h2 className="text-sm font-semibold text-[#D4AF37] mb-3">
              {hi
                ? "📊 अंक संरेखण — Numerology Alignment"
                : "📊 Numerology Alignment — अंक संरेखण"}
            </h2>
            <div className="flex gap-6 mb-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FF9933]">
                  {mulank}
                </div>
                <div className="text-xs text-muted-foreground">
                  {hi ? "मूलांक" : "Mulank"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#D4AF37]">
                  {bhagyank}
                </div>
                <div className="text-xs text-muted-foreground">
                  {hi ? "भाग्यांक" : "Bhagyank"}
                </div>
              </div>
              <ScoreRing
                score={numAlign.score}
                label={hi ? "संरेखण" : "Alignment"}
              />
            </div>
            <p className="text-xs text-foreground bg-muted/40 rounded-lg p-2">
              {hi ? numAlign.descriptionHi : numAlign.description}
            </p>
            {selectedSymbolIds.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {SACRED_SYMBOLS.filter((s) =>
                  selectedSymbolIds.includes(s.id),
                ).map((sym) => (
                  <Badge
                    key={sym.id}
                    className={`text-xs ${
                      sym.numerologyNumber === mulank ||
                      sym.numerologyNumber === bhagyank
                        ? "bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {hi ? sym.nameHi : sym.name.split(" ")[0]} (
                    {sym.numerologyNumber})
                    {(sym.numerologyNumber === mulank ||
                      sym.numerologyNumber === bhagyank) &&
                      " ✓"}
                  </Badge>
                ))}
              </div>
            )}
          </OrnamentalCard>

          {/* Astrology Alignment */}
          <OrnamentalCard data-ocid="logo_creator.astrology_panel">
            <h2 className="text-sm font-semibold text-[#D4AF37] mb-3">
              {hi
                ? "🪐 ज्योतिष संरेखण — Astrology Alignment"
                : "🪐 Astrology Alignment — ज्योतिष संरेखण"}
            </h2>
            <div className="flex gap-4 mb-3 flex-wrap">
              <div className="text-center">
                <div className="text-sm font-bold text-[#FF9933]">
                  {astro.lagna?.sign ?? "—"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {hi ? "लग्न" : "Lagna"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-[#D4AF37]">
                  {astro.planetPositions?.Moon?.sign ?? "—"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {hi ? "चंद्र राशि" : "Moon Sign"}
                </div>
              </div>
              <ScoreRing
                score={astroAlign.score}
                label={hi ? "ग्रह संरेखण" : "Planet Align"}
              />
            </div>
            <p className="text-xs text-foreground bg-muted/40 rounded-lg p-2">
              {hi ? astroAlign.descriptionHi : astroAlign.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              {astroAlign.alignedPlanets.map((planet) => (
                <Badge
                  key={planet}
                  variant="outline"
                  className="text-xs border-[#D4AF37] text-[#D4AF37]"
                >
                  {planet}
                </Badge>
              ))}
            </div>
          </OrnamentalCard>

          {/* Lo Shu Activation */}
          <OrnamentalCard data-ocid="logo_creator.loshu_panel">
            <h2 className="text-sm font-semibold text-[#D4AF37] mb-3">
              {hi
                ? "🔲 लो शू चक्रीकरण — Lo Shu Activation"
                : "🔲 Lo Shu Grid Activation — लो शू चक्रीकरण"}
            </h2>
            {/* Mini 3x3 Lo Shu Grid */}
            <div className="grid grid-cols-3 gap-1 w-24 mb-3 mx-auto">
              {[4, 9, 2, 3, 5, 7, 8, 1, 6].map((n) => {
                const isPresent = numerology.loShuNumbers.includes(n);
                const isActivated = loShuAct.activatedNumbers.includes(n);
                const isMissing = numerology.missingNumbers.includes(n);
                return (
                  <div
                    key={n}
                    className={`w-7 h-7 flex items-center justify-center rounded text-xs font-bold transition-all ${
                      isActivated
                        ? "bg-[#22c55e] text-white scale-105 shadow"
                        : isPresent
                          ? "bg-[#D4AF37] text-white"
                          : isMissing
                            ? "bg-red-100 text-red-400 border border-red-200"
                            : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {n}
                  </div>
                );
              })}
            </div>
            <div className="flex gap-2 text-[10px] text-muted-foreground mb-2 flex-wrap">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-[#22c55e] inline-block" />
                {hi ? "सक्रिय" : "Activated"}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-[#D4AF37] inline-block" />
                {hi ? "उपस्थित" : "Present"}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-red-100 border border-red-200 inline-block" />
                {hi ? "अनुपस्थित" : "Missing"}
              </span>
            </div>
            <ScoreRing
              score={loShuAct.score}
              label={hi ? "सक्रियण" : "Activation"}
            />
            <p className="text-xs text-foreground bg-muted/40 rounded-lg p-2 mt-2">
              {hi ? loShuAct.descriptionHi : loShuAct.description}
            </p>
            {numerology.missingNumbers.length > 0 && (
              <div className="mt-2">
                <span className="text-xs text-muted-foreground">
                  {hi ? "अनुपस्थित संख्याएं: " : "Missing numbers: "}
                  {numerology.missingNumbers.join(", ")}
                </span>
              </div>
            )}
          </OrnamentalCard>
        </div>
      </div>
    </div>
  );
}
