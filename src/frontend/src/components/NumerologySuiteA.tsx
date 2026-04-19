import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import {
  METHOD_DESCRIPTIONS,
  METHOD_LABELS,
  type NumerologyMethod,
  calculateDestinyNumber,
  calculateMulankMultiMethod,
  calculateNameNumber,
  calculatePersonalityNumber,
  calculateSoulNumber,
  getLuckyDay,
  getNumberMeaning,
} from "../utils/multiMethodNumerology";

const METHODS: NumerologyMethod[] = [
  "pythagorean",
  "chaldean",
  "sepharial",
  "modern",
];

const METHOD_COLOR: Record<NumerologyMethod, string> = {
  pythagorean: "oklch(0.60 0.18 200)",
  chaldean: "oklch(0.68 0.20 48)",
  sepharial: "oklch(0.58 0.18 300)",
  modern: "oklch(0.55 0.18 150)",
};

const METHOD_BG: Record<NumerologyMethod, string> = {
  pythagorean: "oklch(0.96 0.03 200)",
  chaldean: "oklch(0.97 0.03 60)",
  sepharial: "oklch(0.96 0.03 300)",
  modern: "oklch(0.96 0.03 150)",
};

interface NumberCardProps {
  label: string;
  value: number;
  subtitle?: string;
}

function NumberCard({ label, value, subtitle }: NumberCardProps) {
  const meaning = getNumberMeaning(value);
  return (
    <div
      className="rounded-2xl p-4 flex flex-col gap-2 border"
      style={{ background: "oklch(1 0 0)", borderColor: "oklch(0.90 0.04 75)" }}
    >
      <div
        className="text-xs font-heading font-semibold uppercase tracking-wide"
        style={{ color: "oklch(0.50 0.05 60)" }}
      >
        {label}
      </div>
      <div className="flex items-baseline gap-2">
        <span
          className="text-4xl font-black"
          style={{ color: "oklch(0.45 0.14 40)" }}
        >
          {value}
        </span>
        {meaning && (
          <span
            className="text-sm font-heading"
            style={{ color: "oklch(0.55 0.10 40)" }}
          >
            {meaning.title}
          </span>
        )}
      </div>
      {subtitle && (
        <div
          className="text-xs font-body"
          style={{ color: "oklch(0.60 0.04 60)" }}
        >
          {subtitle}
        </div>
      )}
      {meaning && (
        <div className="mt-1 grid grid-cols-2 gap-1 text-xs">
          <span style={{ color: "oklch(0.50 0.05 60)" }}>
            🪐 {meaning.planet}
          </span>
          <span style={{ color: "oklch(0.50 0.05 60)" }}>{meaning.color}</span>
          <span style={{ color: "oklch(0.50 0.05 60)" }}>{meaning.gem}</span>
          <span style={{ color: "oklch(0.50 0.05 60)" }}>
            📅 {getLuckyDay(value)}
          </span>
        </div>
      )}
      {meaning && (
        <p
          className="text-xs font-body mt-1 border-t pt-2"
          style={{
            color: "oklch(0.45 0.05 60)",
            borderColor: "oklch(0.92 0.02 75)",
          }}
        >
          {meaning.description}
        </p>
      )}
    </div>
  );
}

interface MethodResultCardProps {
  method: NumerologyMethod;
  name: string;
  fullName: string;
  dob: string;
  tab: "name" | "destiny" | "mulank";
}

function MethodResultCard({
  method,
  name,
  fullName,
  dob,
  tab,
}: MethodResultCardProps) {
  const color = METHOD_COLOR[method];
  const bg = METHOD_BG[method];

  let mainNumber = 0;
  let subtitle = "";
  let breakdown = "";

  if (tab === "name") {
    const r = calculateNameNumber(name, method);
    mainNumber = r.reduced;
    subtitle = `कुल = ${r.total} → ${r.reduced}`;
    breakdown = r.breakdown;
  } else if (tab === "destiny") {
    const r = calculateDestinyNumber(fullName, method);
    mainNumber = r.reduced;
    subtitle = `कुल = ${r.total} → ${r.reduced}`;
    breakdown = "";
  } else if (tab === "mulank") {
    const r = calculateMulankMultiMethod(dob);
    mainNumber = r.mulank;
    subtitle = `मूलांक = ${r.mulank} | जीवन पथ = ${r.lifePath}`;
    breakdown = "";
  }

  const meaning = getNumberMeaning(mainNumber);

  return (
    <div
      className="rounded-2xl p-4 border"
      style={{ background: bg, borderColor: `${color}44` }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-heading font-bold" style={{ color }}>
          {METHOD_LABELS[method]}
        </span>
        <span className="text-3xl font-black" style={{ color }}>
          {mainNumber}
        </span>
      </div>
      {meaning && (
        <div className="flex flex-wrap gap-1 mb-2">
          <Badge
            variant="outline"
            style={{ borderColor: color, color }}
            className="text-xs"
          >
            {meaning.title}
          </Badge>
          <Badge
            variant="outline"
            style={{ borderColor: color, color }}
            className="text-xs"
          >
            {meaning.planet}
          </Badge>
        </div>
      )}
      <div
        className="text-xs font-body"
        style={{ color: "oklch(0.55 0.05 60)" }}
      >
        {subtitle}
      </div>
      {breakdown && (
        <div
          className="mt-2 p-2 rounded-lg text-xs font-mono break-all"
          style={{
            background: "oklch(1 0 0 / 0.6)",
            color: "oklch(0.45 0.05 60)",
          }}
        >
          {breakdown}
        </div>
      )}
      {meaning && (
        <p
          className="mt-2 text-xs font-body"
          style={{ color: "oklch(0.45 0.05 60)" }}
        >
          {meaning.description}
        </p>
      )}
      {meaning && (
        <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
          <span style={{ color: "oklch(0.55 0.08 60)" }}>
            🎨 {meaning.color}
          </span>
          <span style={{ color: "oklch(0.55 0.08 60)" }}>{meaning.gem}</span>
          <span style={{ color: "oklch(0.55 0.08 60)" }}>
            📅 {getLuckyDay(mainNumber)}
          </span>
        </div>
      )}
    </div>
  );
}

export default function NumerologySuiteA() {
  const [form, setForm] = useState({ firstName: "", fullName: "", dob: "" });
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"name" | "destiny" | "mulank">(
    "name",
  );

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.dob) return;
    setSubmitted(true);
  };

  const mulankResult = submitted ? calculateMulankMultiMethod(form.dob) : null;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Header */}
      <div
        className="rounded-3xl p-8 mb-8 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.08 22) 0%, oklch(0.28 0.12 40) 100%)",
        }}
      >
        <div className="text-5xl mb-3">🔢</div>
        <h1
          className="font-heading text-2xl md:text-3xl font-black mb-2"
          style={{ color: "oklch(0.88 0.14 75)" }}
        >
          अंक ज्योतिष सुइट A
        </h1>
        <p
          className="font-body text-sm"
          style={{ color: "oklch(0.72 0.06 65)" }}
        >
          नाम अंक · भाग्यांक · मूलांक — Pythagorean, Chaldean, Sepharial, Modern
        </p>
      </div>

      {/* Input Form */}
      <div
        className="rounded-2xl p-6 mb-8 border"
        style={{
          background: "oklch(1 0 0)",
          borderColor: "oklch(0.78 0.14 75 / 0.3)",
          boxShadow: "0 2px 20px oklch(0.45 0.10 40 / 0.10)",
        }}
      >
        <h2
          className="font-heading text-base font-bold mb-4"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          📝 जानकारी दर्ज करें
        </h2>
        <form
          onSubmit={handleCalculate}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="flex flex-col gap-1">
            <label
              htmlFor="firstName"
              className="text-xs font-heading font-semibold"
              style={{ color: "oklch(0.50 0.08 40)" }}
            >
              पहला नाम (First Name)
            </label>
            <input
              type="text"
              id="firstName"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              placeholder="जैसे: Rahul, Priya"
              className="px-4 py-2.5 rounded-xl border text-sm font-body focus:outline-none"
              style={{
                borderColor: "oklch(0.78 0.14 75 / 0.4)",
                background: "oklch(0.98 0.01 70)",
              }}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="fullName"
              className="text-xs font-heading font-semibold"
              style={{ color: "oklch(0.50 0.08 40)" }}
            >
              पूरा नाम (भाग्यांक के लिए)
            </label>
            <input
              type="text"
              id="fullName"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              placeholder="जैसे: Rahul Kumar Sharma"
              className="px-4 py-2.5 rounded-xl border text-sm font-body focus:outline-none"
              style={{
                borderColor: "oklch(0.78 0.14 75 / 0.4)",
                background: "oklch(0.98 0.01 70)",
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="dob"
              className="text-xs font-heading font-semibold"
              style={{ color: "oklch(0.50 0.08 40)" }}
            >
              जन्म तिथि (DOB)
            </label>
            <input
              type="date"
              id="dob"
              value={form.dob}
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
              className="px-4 py-2.5 rounded-xl border text-sm font-body focus:outline-none"
              style={{
                borderColor: "oklch(0.78 0.14 75 / 0.4)",
                background: "oklch(0.98 0.01 70)",
              }}
              required
            />
          </div>
          <div className="md:col-span-3">
            <Button
              type="submit"
              className="w-full md:w-auto px-8 py-3 rounded-full font-heading font-bold text-sm text-white"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.55 0.18 35))",
              }}
            >
              🔮 अंक गणना करें
            </Button>
          </div>
        </form>
      </div>

      {/* Method Info Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {METHODS.map((method) => (
          <div
            key={method}
            className="rounded-xl p-3 text-center border"
            style={{
              background: METHOD_BG[method],
              borderColor: `${METHOD_COLOR[method]}44`,
            }}
          >
            <div
              className="text-sm font-heading font-bold mb-1"
              style={{ color: METHOD_COLOR[method] }}
            >
              {METHOD_LABELS[method]}
            </div>
            <div
              className="text-xs font-body"
              style={{ color: "oklch(0.50 0.05 60)" }}
            >
              {METHOD_DESCRIPTIONS[method]}
            </div>
          </div>
        ))}
      </div>

      {/* Results */}
      {submitted && (
        <div>
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as typeof activeTab)}
          >
            <TabsList
              className="w-full max-w-md mx-auto grid grid-cols-3 mb-6 h-auto p-1 rounded-xl"
              style={{ background: "oklch(0.22 0.08 22)" }}
            >
              {[
                { value: "name", label: "🔤 नाम अंक" },
                { value: "destiny", label: "⭐ भाग्यांक" },
                { value: "mulank", label: "🌱 मूलांक" },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="font-heading text-xs font-semibold py-2 rounded-lg data-[state=active]:text-white transition-all"
                  style={{ color: "oklch(0.70 0.04 60)" }}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Name Number Tab */}
            <TabsContent value="name">
              <div
                className="mb-4 p-4 rounded-xl"
                style={{
                  background: "oklch(0.96 0.03 60)",
                  borderLeft: "4px solid oklch(0.68 0.20 48)",
                }}
              >
                <p
                  className="text-sm font-body"
                  style={{ color: "oklch(0.45 0.08 40)" }}
                >
                  <strong>नाम अंक</strong> (Name Number / Expression Number) =
                  आपके पहले नाम के सभी अक्षरों के मूल्यों का योग। यह आपकी प्रतिभाओं और जीवन
                  में अभिव्यक्ति को दर्शाता है।
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {METHODS.map((method) => (
                  <MethodResultCard
                    key={method}
                    method={method}
                    name={form.firstName}
                    fullName={form.fullName || form.firstName}
                    dob={form.dob}
                    tab="name"
                  />
                ))}
              </div>
            </TabsContent>

            {/* Destiny Number Tab */}
            <TabsContent value="destiny">
              <div
                className="mb-4 p-4 rounded-xl"
                style={{
                  background: "oklch(0.96 0.03 60)",
                  borderLeft: "4px solid oklch(0.58 0.18 300)",
                }}
              >
                <p
                  className="text-sm font-body"
                  style={{ color: "oklch(0.45 0.08 40)" }}
                >
                  <strong>भाग्यांक</strong> (Destiny Number) = पूरे नाम के सभी अक्षरों
                  का योग। यह आपकी जीवन-यात्रा का उद्देश्य और भाग्य को प्रकट करता है।
                  {!form.fullName && <em className="ml-1">(पूरा नाम दर्ज करें)</em>}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {METHODS.map((method) => (
                  <MethodResultCard
                    key={method}
                    method={method}
                    name={form.firstName}
                    fullName={form.fullName || form.firstName}
                    dob={form.dob}
                    tab="destiny"
                  />
                ))}
              </div>
            </TabsContent>

            {/* Mulank Tab */}
            <TabsContent value="mulank">
              <div
                className="mb-4 p-4 rounded-xl"
                style={{
                  background: "oklch(0.96 0.03 60)",
                  borderLeft: "4px solid oklch(0.55 0.18 150)",
                }}
              >
                <p
                  className="text-sm font-body"
                  style={{ color: "oklch(0.45 0.08 40)" }}
                >
                  <strong>मूलांक</strong> = जन्म तिथि के दिन के अंकों का योग।{" "}
                  <strong>जीवन पथ संख्या</strong> = पूरी जन्म तिथि के सभी अंकों का योग।
                  यह जन्मजात स्वभाव और जीवन पथ दर्शाता है।
                </p>
              </div>
              {mulankResult && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <NumberCard
                    label="मूलांक (Mulank)"
                    value={mulankResult.mulank}
                    subtitle="जन्म तिथि के दिन का अंक"
                  />
                  <NumberCard
                    label="जीवन पथ (Life Path)"
                    value={mulankResult.lifePath}
                    subtitle="पूर्ण जन्म तिथि का योग"
                  />
                </div>
              )}
              <div
                className="p-4 rounded-xl"
                style={{
                  background: "oklch(0.96 0.02 80)",
                  border: "1px solid oklch(0.85 0.04 75)",
                }}
              >
                <p
                  className="text-xs font-body"
                  style={{ color: "oklch(0.55 0.05 60)" }}
                >
                  💡 <strong>नोट:</strong> मूलांक सभी चार विधियों (Pythagorean,
                  Chaldean, Sepharial, Modern) में समान रहता है क्योंकि यह जन्म तिथि के
                  अंकों पर आधारित है, अक्षर मानचित्रण पर नहीं।
                </p>
              </div>

              {/* Soul & Personality numbers */}
              {form.firstName && (
                <div className="mt-6">
                  <h3
                    className="font-heading text-sm font-bold mb-4"
                    style={{ color: "oklch(0.40 0.12 30)" }}
                  >
                    🔤 नाम-आधारित विशेष अंक (Chaldean विधि)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <NumberCard
                      label="आत्मा अंक (Soul Number)"
                      value={calculateSoulNumber(form.firstName, "chaldean")}
                      subtitle="केवल स्वर अक्षरों का योग — आंतरिक इच्छाएँ"
                    />
                    <NumberCard
                      label="व्यक्तित्व अंक (Personality)"
                      value={calculatePersonalityNumber(
                        form.firstName,
                        "chaldean",
                      )}
                      subtitle="केवल व्यंजन अक्षरों का योग — बाहरी व्यक्तित्व"
                    />
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
