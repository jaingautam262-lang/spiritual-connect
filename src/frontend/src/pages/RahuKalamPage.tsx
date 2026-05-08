import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const RAHU_KALAM: Record<string, { hi: string; en: string }> = {
  Sunday: { hi: "04:30 - 06:00 अपराह्न", en: "4:30 PM – 6:00 PM" },
  Monday: { hi: "07:30 - 09:00 प्रातः", en: "7:30 AM – 9:00 AM" },
  Tuesday: { hi: "03:00 - 04:30 अपराह्न", en: "3:00 PM – 4:30 PM" },
  Wednesday: { hi: "12:00 - 01:30 दोपहर", en: "12:00 PM – 1:30 PM" },
  Thursday: { hi: "01:30 - 03:00 अपराह्न", en: "1:30 PM – 3:00 PM" },
  Friday: { hi: "10:30 - 12:00 दोपहर", en: "10:30 AM – 12:00 PM" },
  Saturday: { hi: "09:00 - 10:30 प्रातः", en: "9:00 AM – 10:30 AM" },
};

const CITIES = [
  "New Delhi",
  "Mumbai",
  "Chennai",
  "Kolkata",
  "Bengaluru",
  "Hyderabad",
  "Ahmedabad",
  "Pune",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
];

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function RahuKalamPage() {
  const { language } = useLanguage();
  const [selectedCity, setSelectedCity] = useState("New Delhi");
  const isHindi = language === "hi";

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
  }) as keyof typeof RAHU_KALAM;

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.14 0.06 20) 0%, oklch(0.12 0.04 20) 100%)",
      }}
    >
      {/* Hero */}
      <section
        className="py-12 px-4 text-center border-b"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.08 22), oklch(0.16 0.07 28))",
          borderColor: "oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-5xl mb-4">🚫</div>
          <h1
            className="font-heading font-bold text-3xl md:text-4xl mb-2"
            style={{ color: "oklch(0.90 0.05 65)" }}
          >
            {isHindi ? "राहु काल" : "Rahu Kalam"}
          </h1>
          <p
            className="text-sm md:text-base"
            style={{ color: "oklch(0.65 0.05 58)" }}
          >
            {isHindi
              ? "प्रत्येक दिन का अशुभ काल — नए कार्य इस समय न करें"
              : "Inauspicious period each day — avoid starting new ventures"}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
        {/* Today's Rahu Kalam */}
        <div
          className="rounded-2xl p-6 border"
          style={{
            background: "oklch(0.18 0.09 22)",
            borderColor: "oklch(0.68 0.20 48 / 0.5)",
          }}
          data-ocid="rahukalam.today.card"
        >
          <p
            className="text-xs font-semibold uppercase tracking-wider mb-1"
            style={{ color: "oklch(0.68 0.20 48)" }}
          >
            {isHindi ? "आज का राहु काल" : "Today's Rahu Kalam"} — {today}
          </p>
          <p
            className="font-heading font-bold text-2xl"
            style={{ color: "oklch(0.90 0.05 65)" }}
          >
            {RAHU_KALAM[today]?.[isHindi ? "hi" : "en"] ?? "N/A"}
          </p>
          <p className="text-xs mt-1" style={{ color: "oklch(0.55 0.04 50)" }}>
            {isHindi ? "नई दिल्ली के लिए (IST)" : "For New Delhi, India (IST)"}
          </p>
        </div>

        {/* City Selector */}
        <div
          className="rounded-2xl p-5 border"
          style={{
            background: "oklch(0.19 0.07 24)",
            borderColor: "oklch(0.32 0.10 35)",
          }}
        >
          <label
            htmlFor="rk-city"
            className="block text-xs font-semibold uppercase tracking-wider mb-2"
            style={{ color: "oklch(0.68 0.18 145)" }}
          >
            📍 {isHindi ? "शहर चुनें" : "Select City"}
          </label>
          <select
            id="rk-city"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full rounded-xl px-4 py-3 text-sm border outline-none"
            data-ocid="rahukalam.city.select"
            style={{
              background: "oklch(0.16 0.06 22)",
              borderColor: "oklch(0.38 0.14 145)",
              color: "oklch(0.88 0.06 65)",
            }}
          >
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Weekly Table */}
        <section
          className="rounded-2xl overflow-hidden border"
          style={{ borderColor: "oklch(0.28 0.08 30)" }}
          data-ocid="rahukalam.weekly.table"
        >
          <div
            className="p-4 border-b"
            style={{
              background: "oklch(0.18 0.07 22)",
              borderColor: "oklch(0.28 0.08 30)",
            }}
          >
            <h2
              className="font-heading font-bold text-lg"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              📅 {isHindi ? "साप्ताहिक राहु काल" : "Weekly Rahu Kalam"} —{" "}
              {selectedCity}
            </h2>
          </div>
          <div
            className="divide-y"
            style={{ borderColor: "oklch(0.24 0.06 24)" }}
          >
            {DAYS.map((day, i) => {
              const isToday = day === today;
              return (
                <div
                  key={day}
                  className="flex items-center justify-between px-5 py-4"
                  style={{
                    background: isToday
                      ? "oklch(0.68 0.20 48 / 0.08)"
                      : "oklch(0.16 0.05 22)",
                  }}
                  data-ocid={`rahukalam.day.item.${i + 1}`}
                >
                  <div>
                    <p
                      className="font-heading font-semibold text-sm"
                      style={{
                        color: isToday
                          ? "oklch(0.88 0.14 65)"
                          : "oklch(0.78 0.06 60)",
                      }}
                    >
                      {isToday ? "▶ " : ""}
                      {isHindi
                        ? [
                            "रविवार",
                            "सोमवार",
                            "मंगलवार",
                            "बुधवार",
                            "गुरुवार",
                            "शुक्रवार",
                            "शनिवार",
                          ][i]
                        : day}
                    </p>
                  </div>
                  <p
                    className="font-heading font-bold"
                    style={{
                      color: isToday
                        ? "oklch(0.78 0.14 75)"
                        : "oklch(0.68 0.20 48)",
                    }}
                  >
                    {RAHU_KALAM[day]?.[isHindi ? "hi" : "en"]}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* About */}
        <section
          className="rounded-2xl p-6 border space-y-4"
          style={{
            background: "oklch(0.17 0.06 22)",
            borderColor: "oklch(0.28 0.08 28)",
          }}
        >
          <h3
            className="font-heading font-bold text-base"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            📖 {isHindi ? "राहु काल के बारे में" : "About Rahu Kalam"}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "oklch(0.65 0.04 55)" }}
          >
            {isHindi
              ? "राहु काल प्रत्येक दिन का वह काल है जो राहु ग्रह के प्रभाव में होता है। इस समय में कोई भी नया और शुभ कार्य प्रारंभ नहीं करना चाहिए। यह समय प्रतिदिन डेढ़ घंटे का होता है और प्रत्येक वार के अनुसार बदलता है।"
              : "Rahu Kalam is the daily inauspicious period governed by the shadow planet Rahu. Vedic astrology recommends avoiding starting new ventures, signing contracts, traveling, or beginning important work during this time. It lasts approximately 1.5 hours each day and shifts according to the day of the week."}
          </p>
          <div
            className="rounded-xl p-4 border text-xs"
            style={{
              background: "oklch(0.18 0.06 22)",
              borderColor: "oklch(0.30 0.08 28)",
              color: "oklch(0.52 0.04 50)",
            }}
          >
            ⚠️{" "}
            {isHindi
              ? "ये समय नई दिल्ली (IST) के आधार पर हैं। अलग-अलग शहरों में सूर्योदय के अनुसार थोड़ा अंतर हो सकता है।"
              : "Timings are approximate for New Delhi (IST). Local sunrise differences may shift these times by a few minutes for other cities."}
          </div>
        </section>
      </div>
    </div>
  );
}
