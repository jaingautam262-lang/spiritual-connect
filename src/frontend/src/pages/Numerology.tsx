import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import MobileNumerology from "../components/MobileNumerology";
import NameCompatibility from "../components/NameCompatibility";
import NumerologySuiteA from "../components/NumerologySuiteA";
import OccultYogisReport from "../components/OccultYogisReport";
import PersonalNumerology from "../components/PersonalNumerology";

// ─── Occult Yogis Report Tab ──────────────────────────────────────────────────

function OccultYogisTab() {
  const [rawDob, setRawDob] = useState("");
  const [submittedDob, setSubmittedDob] = useState<string | null>(null);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    // Expect DD/MM/YYYY
    const match = rawDob.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    if (!match) {
      setError("Please enter a valid date in DD/MM/YYYY format.");
      return;
    }
    const [, d, m, y] = match;
    const day = Number.parseInt(d, 10);
    const month = Number.parseInt(m, 10);
    const year = Number.parseInt(y, 10);
    if (
      day < 1 ||
      day > 31 ||
      month < 1 ||
      month > 12 ||
      year < 1900 ||
      year > 2100
    ) {
      setError("Please enter a valid date.");
      return;
    }
    setSubmittedDob(
      `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year}`,
    );
  }

  return (
    <div className="space-y-8">
      {/* DOB Input */}
      <div
        className="rounded-2xl ornamental-border p-6 max-w-md mx-auto"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.99 0.008 80), oklch(0.97 0.015 85 / 0.6))",
        }}
        data-ocid="occult_report.dob.panel"
      >
        <div className="text-center mb-4">
          <h2
            className="font-heading font-bold text-xl"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            🔢 Generate Your Numeroscope
          </h2>
          <p className="text-sm text-muted-foreground font-body mt-1">
            Enter your date of birth to reveal your complete numerology
            blueprint
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label
              htmlFor="dob-input"
              className="font-heading font-semibold text-sm"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              Date of Birth
            </Label>
            <Input
              id="dob-input"
              placeholder="DD/MM/YYYY (e.g. 15/08/1990)"
              value={rawDob}
              onChange={(e) => setRawDob(e.target.value)}
              className="font-heading text-center text-lg tracking-widest border-2 focus:ring-2"
              style={{ borderColor: "oklch(0.78 0.14 75 / 0.4)" }}
              data-ocid="occult_report.dob.input"
            />
            {error && (
              <p
                className="text-xs font-body"
                style={{ color: "oklch(0.45 0.18 25)" }}
                data-ocid="occult_report.dob.field_error"
              >
                {error}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="btn-spiritual w-full rounded-xl h-11 font-heading font-bold text-base"
            data-ocid="occult_report.generate.submit_button"
          >
            ✨ Reveal My Numeroscope
          </Button>
        </form>
      </div>

      {/* Report */}
      {submittedDob && (
        <div data-ocid="occult_report.result.card">
          <OccultYogisReport dob={submittedDob} />
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Numerology() {
  return (
    <div>
      {/* Banner */}
      <div
        className="relative w-full overflow-hidden"
        style={{ minHeight: "280px" }}
      >
        <img
          src="/assets/generated/numerology-banner.dim_1200x400.png"
          alt="Numerology"
          className="w-full h-72 object-cover"
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.18 0.06 25 / 0.5), oklch(0.12 0.04 20 / 0.75))",
          }}
        >
          <h1
            className="font-decorative text-3xl md:text-5xl font-bold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🔢 Numerology Suite
          </h1>
          <p
            className="font-body text-lg"
            style={{ color: "oklch(0.85 0.04 75)" }}
          >
            नाम अंक · भाग्यांक · मूलांक · Lo Shu Grid · Occult Yogis Report
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 py-10">
        <Tabs defaultValue="occult-report">
          <TabsList
            className="w-full max-w-3xl mx-auto grid grid-cols-5 mb-8 h-auto p-1 rounded-xl"
            style={{ background: "oklch(0.22 0.08 22)" }}
            data-ocid="numerology.tabs"
          >
            {[
              { value: "occult-report", label: "🔮 Full Report" },
              { value: "suite-a", label: "🔢 Suite A" },
              { value: "personal", label: "👤 Personal" },
              { value: "mobile", label: "📱 Mobile" },
              { value: "compatibility", label: "💑 Match" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="font-heading text-xs font-semibold py-2 rounded-lg data-[state=active]:text-white transition-all"
                style={{ color: "oklch(0.70 0.04 60)" }}
                data-ocid={`numerology.tab.${tab.value}`}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="occult-report">
            <OccultYogisTab />
          </TabsContent>
          <TabsContent value="suite-a">
            <NumerologySuiteA />
          </TabsContent>
          <TabsContent value="personal">
            <PersonalNumerology />
          </TabsContent>
          <TabsContent value="mobile">
            <MobileNumerology />
          </TabsContent>
          <TabsContent value="compatibility">
            <NameCompatibility />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
