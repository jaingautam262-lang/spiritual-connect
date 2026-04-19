import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import DailyPanchang from "../components/DailyPanchang";
import DashaCalculator from "../components/DashaCalculator";
import HistoricalChartMatch from "../components/HistoricalChartMatch";
import KundliGenerator from "../components/KundliGenerator";
import MuhurtaCalculator from "../components/MuhurtaCalculator";
import NakshatraCalculator from "../components/NakshatraCalculator";
import PeriodAnalysis from "../components/PeriodAnalysis";
import PersonalDetailsForm from "../components/PersonalDetailsForm";
import RashiCalculators from "../components/RashiCalculators";
import Rashifal from "../components/Rashifal";
import VratCalendar from "../components/VratCalendar";

const TABS = [
  { value: "panchang", label: "📅 Panchang" },
  { value: "vrat", label: "🌙 Vrat" },
  { value: "rashifal", label: "♈ Rashifal" },
  { value: "kundli", label: "⭐ Kundli" },
  { value: "matching", label: "💑 Kundali Milan" },
  { value: "dasha", label: "⏳ Dasha" },
  { value: "nakshatra", label: "✨ Nakshatra" },
  { value: "rashi", label: "🪐 Rashi" },
  { value: "muhurta", label: "🕐 Muhurta" },
  { value: "period", label: "📊 Period" },
  { value: "samhita", label: "🔍 Samhita" },
  { value: "profile", label: "👤 Profile" },
];

export default function HoroscopePanchang() {
  return (
    <div>
      <div
        className="relative w-full overflow-hidden"
        style={{ minHeight: "280px" }}
      >
        <img
          src="/assets/generated/panchang-banner.dim_1200x400.png"
          alt="Horoscope & Panchang"
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
            🔭 Horoscope & Panchang
          </h1>
          <p
            className="font-body text-lg"
            style={{ color: "oklch(0.85 0.04 75)" }}
          >
            पंचांग, राशिफल, कुंडली, ग्रह दशा, नक्षत्र और राशि कैलकुलेटर
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <Tabs defaultValue="panchang">
          {/* Horizontally scrollable tab bar */}
          <div className="overflow-x-auto mb-8 -mx-4 px-4">
            <TabsList
              className="flex w-max min-w-full h-auto p-1 rounded-xl gap-1"
              style={{ background: "oklch(0.22 0.08 22)" }}
            >
              {TABS.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  data-ocid={`panchang.${tab.value}.tab`}
                  className="font-heading text-xs font-semibold py-2 px-3 rounded-lg data-[state=active]:text-white transition-all whitespace-nowrap"
                  style={{ color: "oklch(0.70 0.04 60)" }}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="panchang">
            <DailyPanchang />
          </TabsContent>
          <TabsContent value="vrat">
            <VratCalendar />
          </TabsContent>
          <TabsContent value="rashifal">
            <Rashifal />
          </TabsContent>
          <TabsContent value="kundli">
            <KundliGenerator />
          </TabsContent>
          <TabsContent value="matching">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Prominent link to the full standalone Kundali Matching page */}
              <div
                className="rounded-2xl overflow-hidden text-center py-10 px-6 space-y-4"
                style={{
                  background: "oklch(0.16 0.06 22)",
                  border: "1px solid oklch(0.30 0.10 40)",
                }}
              >
                <div className="text-5xl">💑</div>
                <h2
                  className="font-heading text-2xl font-bold"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  कुंडली मिलान
                </h2>
                <p
                  className="font-body text-sm"
                  style={{ color: "oklch(0.60 0.06 60)" }}
                >
                  36 गुण अष्टकूट मिलान — नाड़ी/भकूट/मंगलिक दोष विश्लेषण, D1 तुलना, SAV
                  स्कोर
                </p>
                <p
                  className="font-body text-xs"
                  style={{ color: "oklch(0.55 0.04 55)" }}
                >
                  Full Ashtakoot matching with Nadi/Bhakoot/Manglik Dosha
                  analysis and D1 comparison
                </p>
                <Link
                  to="/kundali-matching"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-semibold text-sm transition-opacity hover:opacity-90"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                    color: "white",
                  }}
                  data-ocid="panchang.kundali-milan.cta"
                >
                  🔮 कुंडली मिलान खोलें / Open Kundali Matching →
                </Link>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="dasha">
            <div className="max-w-2xl mx-auto">
              <DashaCalculator />
            </div>
          </TabsContent>
          <TabsContent value="nakshatra">
            <div className="max-w-2xl mx-auto">
              <NakshatraCalculator />
            </div>
          </TabsContent>
          <TabsContent value="rashi">
            <div className="max-w-2xl mx-auto">
              <RashiCalculators />
            </div>
          </TabsContent>
          <TabsContent value="muhurta">
            <div className="max-w-2xl mx-auto">
              <MuhurtaCalculator />
            </div>
          </TabsContent>
          <TabsContent value="period">
            <PeriodAnalysis />
          </TabsContent>
          <TabsContent value="samhita">
            <div className="max-w-2xl mx-auto">
              <HistoricalChartMatch />
            </div>
          </TabsContent>
          <TabsContent value="profile">
            <div className="max-w-2xl mx-auto">
              <PersonalDetailsForm />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
