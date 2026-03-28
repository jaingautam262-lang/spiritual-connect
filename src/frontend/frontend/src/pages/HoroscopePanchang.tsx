import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import DailyPanchang from "../components/DailyPanchang";
import KundliGenerator from "../components/KundliGenerator";
import Rashifal from "../components/Rashifal";
import VratCalendar from "../components/VratCalendar";

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
            Daily panchang, rashifal, kundli generation & vrat calendar
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <Tabs defaultValue="panchang">
          <TabsList
            className="w-full max-w-2xl mx-auto grid grid-cols-4 mb-8 h-auto p-1 rounded-xl"
            style={{ background: "oklch(0.22 0.08 22)" }}
          >
            {[
              { value: "panchang", label: "📅 Panchang" },
              { value: "vrat", label: "🌙 Vrat Calendar" },
              { value: "rashifal", label: "♈ Rashifal" },
              { value: "kundli", label: "⭐ Kundli" },
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
        </Tabs>
      </div>
    </div>
  );
}
