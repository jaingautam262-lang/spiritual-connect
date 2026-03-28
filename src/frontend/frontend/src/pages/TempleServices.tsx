import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import PrasadDeliveryForm from "../components/PrasadDeliveryForm";
import PujaBookingForm from "../components/PujaBookingForm";
import VirtualAarti from "../components/VirtualAarti";
import VirtualChadhava from "../components/VirtualChadhava";

export default function TempleServices() {
  return (
    <div>
      {/* Banner */}
      <div
        className="relative w-full overflow-hidden"
        style={{ minHeight: "280px" }}
      >
        <img
          src="/assets/generated/puja-banner.dim_1200x400.png"
          alt="Temple Services"
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
            🛕 Temple Services
          </h1>
          <p
            className="font-body text-lg"
            style={{ color: "oklch(0.85 0.04 75)" }}
          >
            Book pujas, make offerings, and experience divine blessings
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <Tabs defaultValue="puja">
          <TabsList
            className="w-full max-w-2xl mx-auto grid grid-cols-4 mb-8 h-auto p-1 rounded-xl"
            style={{ background: "oklch(0.22 0.08 22)" }}
          >
            {[
              { value: "puja", label: "🙏 Puja Booking" },
              { value: "chadhava", label: "🌸 Chadhava" },
              { value: "prasad", label: "🍬 Prasad" },
              { value: "aarti", label: "🪔 Aarti" },
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

          <TabsContent value="puja">
            <PujaBookingForm />
          </TabsContent>
          <TabsContent value="chadhava">
            <VirtualChadhava />
          </TabsContent>
          <TabsContent value="prasad">
            <PrasadDeliveryForm />
          </TabsContent>
          <TabsContent value="aarti">
            <VirtualAarti />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
