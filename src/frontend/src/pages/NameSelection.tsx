import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import type { BirthData } from "../hooks/useAstrology";
import { useAstrology } from "../hooks/useAstrology";
import { useNumerology } from "../hooks/useNumerology";
import { SpeakerButton } from "../hooks/useSpeaker";
import type { NameSuggestion } from "../utils/nameSelection";
import { suggestNames } from "../utils/nameSelection";

// ─── Alphabet Grid ───────────────────────────────────────────────────────────

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// ─── Score Bar Component ─────────────────────────────────────────────────────

function ScoreBar({
  label,
  value,
  max = 100,
  color = "#FF9933",
}: { label: string; value: number; max?: number; color?: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground w-24 shrink-0">
        {label}
      </span>
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-1.5 rounded-full transition-all"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className="text-xs font-semibold w-8 text-right" style={{ color }}>
        {value}
      </span>
    </div>
  );
}

// ─── Name Card ───────────────────────────────────────────────────────────────

function NameCard({
  suggestion,
  hi,
  isSaved,
  onSave,
}: {
  suggestion: NameSuggestion;
  hi: boolean;
  isSaved: boolean;
  onSave: () => void;
}) {
  const scoreColor =
    suggestion.overallScore >= 80
      ? "#22c55e"
      : suggestion.overallScore >= 60
        ? "#FF9933"
        : "#D4AF37";
  return (
    <div
      className="bg-card rounded-xl border border-[#D4AF37]/30 p-4 hover:border-[#FF9933]/50 transition-all"
      style={{ boxShadow: "inset 0 0 0 1px rgba(212,175,55,0.08)" }}
      data-ocid="name-selection.name.card"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <div
            className="text-xl font-bold text-foreground"
            style={{
              fontFamily: hi
                ? "Noto Sans Devanagari, sans-serif"
                : "Cinzel, serif",
            }}
          >
            {hi ? suggestion.nameHi : suggestion.name}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            {hi ? suggestion.meaningHi : suggestion.meaning}
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="text-center">
            <div className="text-lg font-bold" style={{ color: scoreColor }}>
              {suggestion.overallScore}%
            </div>
            <div className="text-[9px] text-muted-foreground">
              {hi ? "स्कोर" : "Score"}
            </div>
          </div>
          <SpeakerButton
            text={`${suggestion.name}. ${suggestion.meaning}`}
            lang={hi ? "hi-IN" : "en-IN"}
            size="sm"
          />
          <button
            type="button"
            onClick={onSave}
            aria-label={isSaved ? "Remove from wishlist" : "Save to wishlist"}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isSaved ? "text-red-500 bg-red-50" : "text-muted-foreground hover:text-[#FF9933] hover:bg-[#FF9933]/10"}`}
            data-ocid="name-selection.save.button"
          >
            {isSaved ? "♥" : "♡"}
          </button>
        </div>
      </div>

      <div className="space-y-1.5 mt-3">
        <ScoreBar
          label={hi ? "मूलांक" : "Mulank"}
          value={suggestion.mulankScore}
          color="#FF9933"
        />
        <ScoreBar
          label={hi ? "भाग्यांक" : "Bhagyank"}
          value={suggestion.bhagyankScore}
          color="#D4AF37"
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <Badge
          variant="outline"
          className="text-xs border-[#D4AF37]/40 text-[#D4AF37]"
        >
          {hi
            ? `चाल्डियन: ${suggestion.chaldeanNumber}`
            : `Chaldean: ${suggestion.chaldeanNumber}`}
        </Badge>
        <Badge
          variant="outline"
          className="text-xs border-muted-foreground/30 text-muted-foreground"
        >
          {suggestion.loShuImpact.replace(
            "Activates",
            hi ? "सक्रिय करता है" : "Activates",
          )}
        </Badge>
        <Badge
          variant="outline"
          className="text-xs border-muted-foreground/30 text-muted-foreground"
        >
          {suggestion.astroResonance}
        </Badge>
      </div>
      <div className="mt-2 text-xs text-muted-foreground">
        {hi ? "देवता: " : "Deity: "}
        <span className="font-medium text-foreground">{suggestion.deity}</span>
        {" · "}
        {hi ? "नक्षत्र: " : "Nakshatra: "}
        <span className="font-medium text-foreground">
          {suggestion.nakshatra}
        </span>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

type Gender = "M" | "F";
type Faith = "Hindu" | "Jain" | "Sikh" | "Neutral";
type LangPref = "Sanskrit" | "Hindi" | "English";

export default function NameSelection() {
  const { language } = useLanguage();
  const hi = language === "hi";

  const [birthData, setBirthData] = useState<BirthData | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("spiritualConnect_birthData");
      if (raw) setBirthData(JSON.parse(raw) as BirthData);
    } catch {}
  }, []);

  const numerology = useNumerology(birthData);
  const astrology = useAstrology(birthData);

  const [gender, setGender] = useState<Gender>("M");
  const [faith, setFaith] = useState<Faith>("Hindu");
  const [langPref, setLangPref] = useState<LangPref>("Sanskrit");
  const [startLetter, setStartLetter] = useState<string | null>(null);
  const [results, setResults] = useState<NameSuggestion[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      return JSON.parse(
        localStorage.getItem("sc_name_wishlist") || "[]",
      ) as string[];
    } catch {
      return [];
    }
  });
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const toggleWishlist = useCallback((name: string) => {
    setWishlist((prev) => {
      const next = prev.includes(name)
        ? prev.filter((n) => n !== name)
        : [...prev, name];
      try {
        localStorage.setItem("sc_name_wishlist", JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const findNames = useCallback(() => {
    if (!birthData) return;
    const suggestions = suggestNames({
      gender,
      faith,
      language: langPref,
      mulank: numerology.mulank,
      bhagyank: numerology.bhagyank,
      loShuMissing: numerology.missingNumbers,
      lagnaSign: astrology.lagna?.sign ?? 1,
      moonNakshatra: astrology.planetPositions?.Moon?.nakshatra ?? 1,
    });
    setResults(suggestions);
    setHasSearched(true);
  }, [birthData, gender, faith, langPref, numerology, astrology]);

  const filteredResults = useMemo(() => {
    let list = results;
    if (startLetter) list = list.filter((r) => r.name.startsWith(startLetter));
    if (searchQuery)
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.nameHi.includes(searchQuery) ||
          r.meaning.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return list;
  }, [results, startLetter, searchQuery]);

  const wishlistedSuggestions = useMemo(
    () => results.filter((r) => wishlist.includes(r.name)),
    [results, wishlist],
  );

  if (!birthData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">📛</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {hi ? "नाम चयन" : "Name Selection Tool"}
          </h1>
          <p className="text-muted-foreground mb-6">
            {hi
              ? "कृपया पहले अपना जन्म विवरण भरें"
              : "Please fill your birth details first"}
          </p>
          <a
            href="/vedic-dashboard"
            className="inline-block bg-[#FF9933] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#D4AF37] transition-colors"
          >
            {hi ? "जन्म विवरण भरें →" : "Fill Birth Details →"}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-[#D4AF37]/30 px-6 py-5">
        <h1
          className="text-2xl font-bold text-foreground"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          {hi ? "नाम चयन उपकरण" : "Name Selection Tool — नाम चयन"}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {hi
            ? `मूलांक ${numerology.mulank} · भाग्यांक ${numerology.bhagyank} के आधार पर शुभ नाम`
            : `Spiritually compatible names based on Mulank ${numerology.mulank} · Bhagyank ${numerology.bhagyank}`}
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Input Card */}
        <div className="bg-card rounded-xl border border-[#D4AF37]/30 p-5 space-y-5">
          {/* Gender */}
          <div>
            <div className="text-sm font-semibold text-foreground mb-2">
              {hi ? "लिंग" : "Gender"}
            </div>
            <div className="flex gap-3">
              {(["M", "F"] as Gender[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  data-ocid="name-selection.gender.radio"
                  className={`px-5 py-2 rounded-lg border text-sm font-medium transition-all ${gender === g ? "border-[#FF9933] bg-[#FF9933]/10 text-[#FF9933]" : "border-border text-muted-foreground hover:border-[#D4AF37]"}`}
                >
                  {g === "M" ? (hi ? "पुरुष" : "Male") : hi ? "महिला" : "Female"}
                </button>
              ))}
            </div>
          </div>

          {/* Faith */}
          <div>
            <div className="text-sm font-semibold text-foreground mb-2">
              {hi ? "धर्म" : "Faith"}
            </div>
            <div className="flex flex-wrap gap-2">
              {(["Hindu", "Jain", "Sikh", "Neutral"] as Faith[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFaith(f)}
                  data-ocid="name-selection.faith.tab"
                  className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-all ${faith === f ? "border-[#FF9933] bg-[#FF9933] text-white" : "border-border text-muted-foreground hover:border-[#D4AF37]"}`}
                >
                  {hi
                    ? {
                        Hindu: "हिंदू",
                        Jain: "जैन",
                        Sikh: "सिख",
                        Neutral: "निरपेक्ष",
                      }[f]
                    : f}
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div>
            <div className="text-sm font-semibold text-foreground mb-2">
              {hi ? "भाषा" : "Language"}
            </div>
            <div className="flex flex-wrap gap-2">
              {(["Sanskrit", "Hindi", "English"] as LangPref[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLangPref(l)}
                  data-ocid="name-selection.language.tab"
                  className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-all ${langPref === l ? "border-[#D4AF37] bg-[#D4AF37]/20 text-[#D4AF37]" : "border-border text-muted-foreground hover:border-[#D4AF37]"}`}
                >
                  {hi
                    ? { Sanskrit: "संस्कृत", Hindi: "हिंदी", English: "अंग्रेज़ी" }[l]
                    : l}
                </button>
              ))}
            </div>
          </div>

          {/* Starting Letter */}
          <div>
            <div className="text-sm font-semibold text-foreground mb-2">
              {hi ? "प्रारंभिक अक्षर (वैकल्पिक)" : "Starting Letter (optional)"}
            </div>
            <div className="flex flex-wrap gap-1">
              <button
                type="button"
                onClick={() => setStartLetter(null)}
                className={`w-8 h-8 rounded text-xs font-bold transition-all ${startLetter === null ? "bg-[#FF9933] text-white" : "bg-muted text-muted-foreground hover:bg-accent"}`}
                data-ocid="name-selection.letter_filter.button"
              >
                ALL
              </button>
              {ALPHABET.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setStartLetter(startLetter === l ? null : l)}
                  className={`w-8 h-8 rounded text-xs font-bold transition-all ${startLetter === l ? "bg-[#FF9933] text-white" : "bg-muted text-muted-foreground hover:bg-accent"}`}
                  data-ocid="name-selection.letter_filter.button"
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={findNames}
            className="w-full sm:w-auto bg-[#FF9933] hover:bg-[#D4AF37] text-white font-semibold py-2.5"
            data-ocid="name-selection.find.primary_button"
          >
            {hi ? "संगत नाम खोजें →" : "Find Compatible Names →"}
          </Button>
        </div>

        {/* Results */}
        {hasSearched && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <h2
                className="text-lg font-bold text-foreground"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                {hi
                  ? `${filteredResults.length} संगत नाम मिले`
                  : `${filteredResults.length} Compatible Names`}
              </h2>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={hi ? "नाम खोजें..." : "Search names..."}
                className="w-full sm:w-64"
                data-ocid="name-selection.search.search_input"
              />
            </div>

            {filteredResults.length === 0 ? (
              <div
                className="text-center py-10 text-muted-foreground"
                data-ocid="name-selection.empty_state"
              >
                {hi
                  ? "कोई नाम नहीं मिला। फ़िल्टर बदलें।"
                  : "No names found. Try changing filters."}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredResults.map((s, i) => (
                  <div key={s.name} data-ocid={`name-selection.item.${i + 1}`}>
                    <NameCard
                      suggestion={s}
                      hi={hi}
                      isSaved={wishlist.includes(s.name)}
                      onSave={() => toggleWishlist(s.name)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Wishlist */}
        {wishlist.length > 0 && (
          <div className="bg-card rounded-xl border border-[#D4AF37]/30 p-4">
            <button
              type="button"
              onClick={() => setWishlistOpen((p) => !p)}
              className="w-full flex items-center justify-between text-sm font-bold text-foreground"
              data-ocid="name-selection.wishlist.toggle"
            >
              <span>
                ♥ {hi ? "सहेजे गए नाम" : "Saved Names"} ({wishlist.length})
              </span>
              <span className="text-[#D4AF37]">{wishlistOpen ? "▲" : "▼"}</span>
            </button>
            {wishlistOpen && wishlistedSuggestions.length > 0 && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {wishlistedSuggestions.map((s, i) => (
                  <div
                    key={s.name}
                    data-ocid={`name-selection.wishlist.item.${i + 1}`}
                  >
                    <NameCard
                      suggestion={s}
                      hi={hi}
                      isSaved
                      onSave={() => toggleWishlist(s.name)}
                    />
                  </div>
                ))}
              </div>
            )}
            {wishlistOpen && wishlistedSuggestions.length === 0 && (
              <p className="mt-3 text-sm text-muted-foreground">
                {hi
                  ? "पहले नाम खोजें, फिर सहेजें।"
                  : "Search first to see your saved names here."}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
