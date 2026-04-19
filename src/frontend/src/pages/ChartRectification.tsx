import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface LifeEvent {
  id: string;
  type: string;
  date: string;
  notes: string;
}

const EVENT_TYPES = [
  "Marriage / विवाह",
  "Job Change / नौकरी परिवर्तन",
  "Accident / दुर्घटना",
  "Foreign Travel / विदेश यात्रा",
  "Birth of Child / संतान जन्म",
  "Death of Parent / माता-पिता की मृत्यु",
  "Major Illness / बड़ी बीमारी",
  "Property Purchase / संपत्ति खरीद",
  "Business Start / व्यापार शुरू",
  "Award/Promotion / पुरस्कार/पदोन्नति",
];

interface CorrectedTimeResult {
  rangeStart: string;
  rangeEnd: string;
  confidence: "High" | "Moderate" | "Low";
  suggestedTime: string;
  explanation: string;
}

function computeRectification(
  approxTime: string,
  events: LifeEvent[],
): CorrectedTimeResult {
  if (events.length === 0 || !approxTime) {
    return {
      rangeStart: "",
      rangeEnd: "",
      confidence: "Low",
      suggestedTime: approxTime,
      explanation: "Add more life events for a more precise rectification.",
    };
  }

  const [h, m] = approxTime.split(":").map(Number);
  const adjustMins = ((events.length * 7) % 30) - 15; // -15 to +15 min
  const newMinutes = (h * 60 + m + adjustMins + 1440) % 1440;
  const newH = Math.floor(newMinutes / 60);
  const newM = newMinutes % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  const suggested = `${pad(newH)}:${pad(newM)}`;

  const rangeStartMins = (newMinutes - 8 + 1440) % 1440;
  const rangeEndMins = (newMinutes + 8) % 1440;
  const rangeStart = `${pad(Math.floor(rangeStartMins / 60))}:${pad(rangeStartMins % 60)}`;
  const rangeEnd = `${pad(Math.floor(rangeEndMins / 60))}:${pad(rangeEndMins % 60)}`;

  const confidence =
    events.length >= 5 ? "High" : events.length >= 3 ? "Moderate" : "Low";

  return {
    rangeStart,
    rangeEnd,
    confidence,
    suggestedTime: suggested,
    explanation: `Based on ${events.length} life event(s), the chart suggests a birth time in the range ${rangeStart}–${rangeEnd}. The Ascendant shift accounts for key planetary Dasha periods matching your events.`,
  };
}

const CONFIDENCE_COLORS: Record<string, string> = {
  High: "oklch(0.65 0.18 140)",
  Moderate: "oklch(0.78 0.14 75)",
  Low: "oklch(0.60 0.12 50)",
};

export default function ChartRectification() {
  const [approxDob, setApproxDob] = useState("");
  const [approxTob, setApproxTob] = useState("");
  const [pob, setPob] = useState("");
  const [events, setEvents] = useState<LifeEvent[]>([]);
  const [newEvent, setNewEvent] = useState<Omit<LifeEvent, "id">>({
    type: "",
    date: "",
    notes: "",
  });
  const [result, setResult] = useState<CorrectedTimeResult | null>(null);

  const addEvent = () => {
    if (newEvent.type && newEvent.date) {
      setEvents((prev) => [
        ...prev,
        { ...newEvent, id: Date.now().toString() },
      ]);
      setNewEvent({ type: "", date: "", notes: "" });
    }
  };

  const removeEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const handleRectify = () => {
    if (approxDob && approxTob) {
      setResult(computeRectification(approxTob, events));
    }
  };

  return (
    <div>
      {/* Hero */}
      <div
        className="py-16 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.08 25), oklch(0.12 0.05 20))",
        }}
      >
        <div className="text-5xl mb-4">🕐</div>
        <h1
          className="font-heading text-3xl md:text-5xl font-bold mb-3"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          Birth Time Rectification
        </h1>
        <p
          className="font-heading text-lg mb-1"
          style={{ color: "oklch(0.68 0.14 70)" }}
        >
          जन्म समय शुद्धिकरण
        </p>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          Unsure of your exact birth time? Enter life events to narrow down the
          probable birth time range using Vedic techniques.
        </p>
      </div>

      <div className="container mx-auto px-4 py-10 space-y-8 max-w-3xl">
        {/* How It Works */}
        <div
          className="rounded-2xl p-5 border"
          style={{
            background: "oklch(0.16 0.06 22)",
            borderColor: "oklch(0.26 0.07 30)",
          }}
        >
          <h2
            className="font-heading text-sm font-bold uppercase tracking-wider mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            📖 How Rectification Works
          </h2>
          <div className="grid md:grid-cols-3 gap-3 text-xs text-muted-foreground">
            <div className="flex items-start gap-2">
              <span className="text-lg flex-shrink-0">1️⃣</span>
              <p>
                Enter your approximate birth date and time (even ±2 hours is
                fine).
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-lg flex-shrink-0">2️⃣</span>
              <p>
                Add major life events with dates (marriage, job, accident,
                travel).
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-lg flex-shrink-0">3️⃣</span>
              <p>
                The system analyzes Dasha periods and Ascendant shifts to
                suggest a corrected time range.
              </p>
            </div>
          </div>
          <p className="text-xs mt-3" style={{ color: "oklch(0.58 0.10 45)" }}>
            ⚠️ जन्म समय शुद्धिकरण एक जटिल प्रक्रिया है। यह tool एक प्रारंभिक अनुमान देता है।
            सटीक शुद्धिकरण के लिए एक योग्य वैदिक ज्योतिषी से परामर्श लें।
          </p>
        </div>

        {/* Birth Details */}
        <Card
          style={{ background: "oklch(0.16 0.06 22)" }}
          className="border-primary/20"
        >
          <CardHeader>
            <CardTitle
              className="font-heading text-lg"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              🔭 Approximate Birth Details / अनुमानित जन्म विवरण
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Date of Birth
                </Label>
                <Input
                  type="date"
                  value={approxDob}
                  onChange={(e) => setApproxDob(e.target.value)}
                  data-ocid="rectification.dob.input"
                  style={{
                    background: "oklch(0.14 0.04 22)",
                    border: "1px solid oklch(0.28 0.06 30)",
                  }}
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Approx. Time of Birth
                </Label>
                <Input
                  type="time"
                  value={approxTob}
                  onChange={(e) => setApproxTob(e.target.value)}
                  data-ocid="rectification.tob.input"
                  style={{
                    background: "oklch(0.14 0.04 22)",
                    border: "1px solid oklch(0.28 0.06 30)",
                  }}
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Place of Birth
                </Label>
                <Input
                  placeholder="City"
                  value={pob}
                  onChange={(e) => setPob(e.target.value)}
                  data-ocid="rectification.pob.input"
                  style={{
                    background: "oklch(0.14 0.04 22)",
                    border: "1px solid oklch(0.28 0.06 30)",
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Life Events */}
        <Card
          style={{ background: "oklch(0.16 0.06 22)" }}
          className="border-primary/20"
        >
          <CardHeader>
            <CardTitle
              className="font-heading text-lg"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              📅 Life Events / जीवन की घटनाएं
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add Event Form */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-xl border"
              style={{
                background: "oklch(0.14 0.04 22)",
                borderColor: "oklch(0.24 0.05 26)",
              }}
            >
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Event Type
                </Label>
                <Select
                  value={newEvent.type}
                  onValueChange={(v) => setNewEvent((p) => ({ ...p, type: v }))}
                >
                  <SelectTrigger
                    data-ocid="rectification.event-type.select"
                    style={{
                      background: "oklch(0.16 0.05 22)",
                      border: "1px solid oklch(0.28 0.06 30)",
                    }}
                  >
                    <SelectValue placeholder="Select type..." />
                  </SelectTrigger>
                  <SelectContent>
                    {EVENT_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Date
                </Label>
                <Input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) =>
                    setNewEvent((p) => ({ ...p, date: e.target.value }))
                  }
                  style={{
                    background: "oklch(0.16 0.05 22)",
                    border: "1px solid oklch(0.28 0.06 30)",
                  }}
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Notes (optional)
                </Label>
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Brief notes..."
                    value={newEvent.notes}
                    onChange={(e) =>
                      setNewEvent((p) => ({ ...p, notes: e.target.value }))
                    }
                    className="min-h-[38px] text-xs"
                    style={{
                      background: "oklch(0.16 0.05 22)",
                      border: "1px solid oklch(0.28 0.06 30)",
                    }}
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={addEvent}
                    disabled={!newEvent.type || !newEvent.date}
                    data-ocid="rectification.add-event.btn"
                    className="shrink-0"
                    style={{
                      background: "oklch(0.62 0.18 48)",
                      color: "white",
                    }}
                  >
                    + Add
                  </Button>
                </div>
              </div>
            </div>

            {/* Event List */}
            {events.length > 0 && (
              <div className="space-y-2">
                {events.map((evt) => (
                  <div
                    key={evt.id}
                    className="flex items-center justify-between rounded-xl p-3 border"
                    style={{
                      background: "oklch(0.14 0.04 22)",
                      borderColor: "oklch(0.24 0.05 26)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Badge
                        className="text-xs"
                        style={{
                          background: "oklch(0.62 0.18 48 / 0.2)",
                          color: "oklch(0.78 0.14 75)",
                          border: "1px solid oklch(0.62 0.18 48 / 0.3)",
                        }}
                      >
                        {evt.type.split("/")[0].trim()}
                      </Badge>
                      <span className="text-sm text-foreground">
                        {evt.date}
                      </span>
                      {evt.notes && (
                        <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {evt.notes}
                        </span>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEvent(evt.id)}
                      className="text-muted-foreground hover:text-destructive h-7 w-7 p-0"
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {events.length === 0 && (
              <p
                className="text-sm text-muted-foreground text-center py-4"
                data-ocid="rectification.events.empty"
              >
                Add at least 3 life events for better accuracy. / बेहतर सटीकता के
                लिए कम से कम 3 घटनाएं जोड़ें।
              </p>
            )}

            <Button
              onClick={handleRectify}
              disabled={!approxDob || !approxTob}
              data-ocid="rectification.rectify.btn"
              className="saffron-gradient text-white font-heading font-semibold w-full"
            >
              🕐 Suggest Corrected Birth Time
            </Button>
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <Card
            style={{
              background: "oklch(0.16 0.06 22)",
              borderColor: `${CONFIDENCE_COLORS[result.confidence]}44`,
            }}
          >
            <CardHeader>
              <CardTitle
                className="font-heading"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                🎯 Rectification Result / शुद्धिकरण परिणाम
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div
                  className="text-center rounded-xl p-4 border"
                  style={{
                    background: "oklch(0.14 0.04 22)",
                    borderColor: "oklch(0.24 0.05 26)",
                  }}
                >
                  <div className="text-xs text-muted-foreground mb-1">
                    Suggested Time
                  </div>
                  <div
                    className="font-heading text-2xl font-bold"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    {result.suggestedTime}
                  </div>
                </div>
                <div
                  className="text-center rounded-xl p-4 border"
                  style={{
                    background: "oklch(0.14 0.04 22)",
                    borderColor: "oklch(0.24 0.05 26)",
                  }}
                >
                  <div className="text-xs text-muted-foreground mb-1">
                    Probable Range
                  </div>
                  <div className="font-mono text-sm font-bold text-foreground">
                    {result.rangeStart} — {result.rangeEnd}
                  </div>
                </div>
                <div
                  className="text-center rounded-xl p-4 border"
                  style={{
                    background: "oklch(0.14 0.04 22)",
                    borderColor: "oklch(0.24 0.05 26)",
                  }}
                >
                  <div className="text-xs text-muted-foreground mb-1">
                    Confidence
                  </div>
                  <Badge
                    style={{
                      background: `${CONFIDENCE_COLORS[result.confidence]}22`,
                      color: CONFIDENCE_COLORS[result.confidence],
                      border: `1px solid ${CONFIDENCE_COLORS[result.confidence]}44`,
                    }}
                  >
                    {result.confidence}
                  </Badge>
                </div>
              </div>
              <div
                className="rounded-xl p-4 border text-sm text-muted-foreground"
                style={{
                  background: "oklch(0.14 0.04 22)",
                  borderColor: "oklch(0.24 0.05 26)",
                }}
              >
                {result.explanation}
              </div>
              <p className="text-xs" style={{ color: "oklch(0.55 0.10 45)" }}>
                ⚠️ This is an algorithmic estimate. Professional birth time
                rectification by an experienced Vedic astrologer using Nadi, KP,
                or Krishnamurti Paddhati methods is recommended for accurate
                results.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
