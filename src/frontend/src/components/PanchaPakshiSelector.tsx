import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, Star, XCircle } from "lucide-react";
import { useState } from "react";
import {
  NAKSHATRA_BIRD_MAP,
  PANCHA_PAKSHI_BIRDS,
  type PanchaPakshiBird,
  getBirdByNakshatra,
} from "../data/panchaPakshiData";

const ALL_NAKSHATRAS = Object.keys(NAKSHATRA_BIRD_MAP);

const BIRD_COLORS: Record<string, string> = {
  garuda: "from-amber-500/20 to-yellow-400/10 border-amber-400/40",
  owl: "from-slate-500/20 to-indigo-400/10 border-indigo-400/40",
  crow: "from-gray-600/20 to-slate-400/10 border-slate-400/40",
  cock: "from-red-500/20 to-orange-400/10 border-orange-400/40",
  peacock: "from-teal-500/20 to-emerald-400/10 border-emerald-400/40",
};

const BIRD_ICON: Record<string, string> = {
  garuda: "🦅",
  owl: "🦉",
  crow: "🐦‍⬛",
  cock: "🐓",
  peacock: "🦚",
};

interface PanchaPakshiSelectorProps {
  compact?: boolean;
}

export default function PanchaPakshiSelector({
  compact = false,
}: PanchaPakshiSelectorProps) {
  const [selectedNakshatra, setSelectedNakshatra] = useState<string>("");
  const bird: PanchaPakshiBird | undefined = selectedNakshatra
    ? getBirdByNakshatra(selectedNakshatra)
    : undefined;

  return (
    <div className="space-y-5" data-ocid="pancha_pakshi.panel">
      {/* Nakshatra selector */}
      <div>
        <label
          htmlFor="nakshatra-select"
          className="text-sm font-semibold text-foreground block mb-2"
        >
          Select Your Birth Nakshatra
        </label>
        <Select value={selectedNakshatra} onValueChange={setSelectedNakshatra}>
          <SelectTrigger
            id="nakshatra-select"
            className="w-full bg-card border-border"
            data-ocid="pancha_pakshi.nakshatra_select"
          >
            <SelectValue placeholder="Choose your Janma Nakshatra…" />
          </SelectTrigger>
          <SelectContent>
            {ALL_NAKSHATRAS.map((n) => (
              <SelectItem key={n} value={n}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground mt-1.5">
          Your Pancha Pakshi bird is determined by your birth star (Nakshatra).
        </p>
      </div>

      {/* All 5 birds overview (compact) */}
      {!compact && !bird && (
        <div>
          <p className="text-sm font-semibold text-foreground mb-3">
            The Five Sacred Birds
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {PANCHA_PAKSHI_BIRDS.map((b) => (
              <div
                key={b.id}
                className={`bg-gradient-to-br ${BIRD_COLORS[b.id] ?? ""} border rounded-xl p-3 text-center`}
                data-ocid={`pancha_pakshi.bird_card.${b.id}`}
              >
                <div className="text-3xl mb-1">{BIRD_ICON[b.id]}</div>
                <p className="text-xs font-bold text-foreground">{b.name}</p>
                <p className="text-[10px] text-muted-foreground">
                  {b.nameHindi}
                </p>
                <Badge variant="outline" className="mt-1 text-[9px] px-1">
                  {b.element}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected bird detail */}
      {bird && (
        <Card
          className={`bg-gradient-to-br ${BIRD_COLORS[bird.id] ?? ""} border-2`}
          data-ocid="pancha_pakshi.result_card"
        >
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-foreground">
              <span className="text-4xl">{BIRD_ICON[bird.id]}</span>
              <div>
                <div className="text-xl font-display">{bird.name}</div>
                <div className="text-sm font-body text-muted-foreground">
                  {bird.nameHindi} · {bird.nameTamil}
                </div>
              </div>
              <Badge className="ml-auto bg-primary/80 text-primary-foreground">
                {bird.element}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {bird.description}
            </p>

            <Separator className="opacity-40" />

            {/* Lucky / Unlucky */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Lucky days */}
              <div>
                <p className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-2">
                  <Star className="w-3.5 h-3.5 text-amber-500" /> Lucky Days
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {bird.luckyDays.map((d) => (
                    <Badge
                      key={d}
                      className="bg-amber-100 text-amber-800 text-[11px]"
                    >
                      {d}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Unlucky hours */}
              <div>
                <p className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-2">
                  <Clock className="w-3.5 h-3.5 text-rose-500" /> Unlucky Hours
                  (IST)
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {bird.unluckyHours.map((h) => (
                    <Badge
                      key={h}
                      variant="outline"
                      className="border-rose-300 text-rose-700 text-[11px]"
                    >
                      {h}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Favorable activities */}
            <div>
              <p className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />{" "}
                Favorable Activities
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {bird.favorableActivities.map((a) => (
                  <li
                    key={a}
                    className="text-xs text-muted-foreground flex items-start gap-1.5"
                  >
                    <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            {/* Unfavorable activities */}
            <div>
              <p className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-2">
                <XCircle className="w-3.5 h-3.5 text-rose-500" /> Avoid
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {bird.unfavorableActivities.map((a) => (
                  <li
                    key={a}
                    className="text-xs text-muted-foreground flex items-center gap-1"
                  >
                    <span className="text-rose-400">✗</span> {a}
                  </li>
                ))}
              </ul>
            </div>

            {/* Qualities */}
            <div>
              <p className="text-xs font-semibold text-foreground mb-2">
                Your Qualities
              </p>
              <div className="flex flex-wrap gap-1.5">
                {bird.qualities.map((q) => (
                  <Badge key={q} variant="secondary" className="text-[11px]">
                    {q}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Deity + Mantra */}
            <div className="bg-card/60 rounded-lg p-3 border border-border/40 text-center">
              <p className="text-xs text-muted-foreground mb-1">
                Presiding Deity:{" "}
                <strong className="text-foreground">{bird.deity}</strong>
              </p>
              <p className="text-sm font-display text-primary">{bird.mantra}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
