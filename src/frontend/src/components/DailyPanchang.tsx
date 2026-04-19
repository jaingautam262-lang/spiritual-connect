import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { getTodayPanchang } from "../data/panchangData";

// TODO: Replace static data with live AstrologyAPI.com call:
// POST https://json.astrologyapi.com/v1/panchang
// Headers: Authorization: Basic base64(USER_ID:API_KEY)
// Body: { day, month, year, hour, min, lat, lon, tzone }

const INDIAN_CITIES = [
  { name: "New Delhi", state: "Delhi", lat: 28.6139, lon: 77.209 },
  { name: "Mumbai", state: "Maharashtra", lat: 19.076, lon: 72.8777 },
  { name: "Bengaluru", state: "Karnataka", lat: 12.9716, lon: 77.5946 },
  { name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lon: 80.2707 },
  { name: "Kolkata", state: "West Bengal", lat: 22.5726, lon: 88.3639 },
  { name: "Hyderabad", state: "Telangana", lat: 17.385, lon: 78.4867 },
  { name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lon: 72.5714 },
  { name: "Pune", state: "Maharashtra", lat: 18.5204, lon: 73.8567 },
  { name: "Jaipur", state: "Rajasthan", lat: 26.9124, lon: 75.7873 },
  { name: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lon: 80.9462 },
  { name: "Chandigarh", state: "Chandigarh", lat: 30.7333, lon: 76.7794 },
  { name: "Bhopal", state: "Madhya Pradesh", lat: 23.2599, lon: 77.4126 },
  { name: "Patna", state: "Bihar", lat: 25.5941, lon: 85.1376 },
  { name: "Bhubaneswar", state: "Odisha", lat: 20.2961, lon: 85.8245 },
  { name: "Guwahati", state: "Assam", lat: 26.1445, lon: 91.7362 },
  { name: "Srinagar", state: "J&K", lat: 34.0837, lon: 74.7973 },
  { name: "Shimla", state: "Himachal Pradesh", lat: 31.1048, lon: 77.1734 },
  { name: "Dehradun", state: "Uttarakhand", lat: 30.3165, lon: 78.0322 },
  { name: "Varanasi", state: "Uttar Pradesh", lat: 25.3176, lon: 82.9739 },
  { name: "Prayagraj", state: "Uttar Pradesh", lat: 25.4358, lon: 81.8463 },
  { name: "Indore", state: "Madhya Pradesh", lat: 22.7196, lon: 75.8577 },
  { name: "Nagpur", state: "Maharashtra", lat: 21.1458, lon: 79.0882 },
  { name: "Kochi", state: "Kerala", lat: 9.9312, lon: 76.2673 },
  { name: "Amritsar", state: "Punjab", lat: 31.634, lon: 74.8723 },
  { name: "Jodhpur", state: "Rajasthan", lat: 26.2389, lon: 73.0243 },
  { name: "Ujjain", state: "Madhya Pradesh", lat: 23.1765, lon: 75.7885 },
  { name: "Tiruchirappalli", state: "Tamil Nadu", lat: 10.7905, lon: 78.7047 },
  {
    name: "Visakhapatnam",
    state: "Andhra Pradesh",
    lat: 17.6868,
    lon: 83.2185,
  },
  { name: "Ranchi", state: "Jharkhand", lat: 23.3441, lon: 85.3096 },
  { name: "Raipur", state: "Chhattisgarh", lat: 21.2514, lon: 81.6296 },
];

// Delhi baseline: sunrise 6:06, sunset 18:42
// lon offset: (city.lon - 77.209) * 4 min
// lat offset for sunrise: (28.6139 - city.lat) * 1.5 min
function adjustTime(
  baseHour: number,
  baseMinute: number,
  lonOffsetMin: number,
  latOffsetMin: number,
  isSunrise: boolean,
): string {
  let totalMinutes = baseHour * 60 + baseMinute;
  totalMinutes -= lonOffsetMin; // east = earlier
  if (isSunrise)
    totalMinutes += latOffsetMin; // higher lat = later sunrise in summer
  else totalMinutes -= latOffsetMin; // higher lat = earlier sunset in summer
  totalMinutes = ((totalMinutes % (24 * 60)) + 24 * 60) % (24 * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  const ampm = h >= 12 ? "PM" : "AM";
  const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${displayH}:${m.toString().padStart(2, "0")} ${ampm}`;
}

function adjustRahuKaal(
  baseStart: string,
  baseEnd: string,
  lonOffsetMin: number,
): { start: string; end: string } {
  const parseTime = (t: string) => {
    const [h, rest] = t.split(":");
    const [m, period] = rest.split(" ");
    let hour = Number.parseInt(h);
    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;
    return hour * 60 + Number.parseInt(m);
  };
  const formatTime = (totalMin: number) => {
    const t = ((totalMin % (24 * 60)) + 24 * 60) % (24 * 60);
    const h = Math.floor(t / 60);
    const m = t % 60;
    const ampm = h >= 12 ? "PM" : "AM";
    const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${displayH}:${m.toString().padStart(2, "0")} ${ampm}`;
  };
  return {
    start: formatTime(parseTime(baseStart) - lonOffsetMin),
    end: formatTime(parseTime(baseEnd) - lonOffsetMin),
  };
}

export default function DailyPanchang() {
  const panchang = getTodayPanchang();
  const [selectedCityName, setSelectedCityName] = useState("New Delhi");

  const selectedCity =
    INDIAN_CITIES.find((c) => c.name === selectedCityName) ?? INDIAN_CITIES[0];

  const lonOffsetMin = Math.round((selectedCity.lon - 77.209) * 4);
  const latOffsetMin = Math.round((28.6139 - selectedCity.lat) * 1.5);

  const sunrise = adjustTime(6, 6, lonOffsetMin, latOffsetMin, true);
  const sunset = adjustTime(18, 42, lonOffsetMin, latOffsetMin, false);

  const rahuKaalBase = { startTime: "8:00 AM", endTime: "9:30 AM" };
  const adjustedRahu = adjustRahuKaal(
    rahuKaalBase.startTime,
    rahuKaalBase.endTime,
    lonOffsetMin,
  );

  const cards = [
    {
      label: "Tithi",
      value: panchang.tithi.name,
      sub: panchang.tithi.paksha,
      icon: "🌙",
    },
    {
      label: "Nakshatra",
      value: panchang.nakshatra.name,
      sub: `Lord: ${panchang.nakshatra.lord}`,
      icon: "⭐",
    },
    {
      label: "Yoga",
      value: panchang.yoga.name,
      sub: `Ends: ${panchang.yoga.endTime}`,
      icon: "🔯",
    },
    {
      label: "Karan",
      value: panchang.karan.name,
      sub: `Ends: ${panchang.karan.endTime}`,
      icon: "📿",
    },
    { label: "Sunrise", value: sunrise, sub: "Suryoday", icon: "🌅" },
    { label: "Sunset", value: sunset, sub: "Suryast", icon: "🌇" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* City selector */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <span className="text-xl">📍</span>
          <div className="flex-1 max-w-xs">
            <Select
              value={selectedCityName}
              onValueChange={setSelectedCityName}
            >
              <SelectTrigger
                data-ocid="panchang.city.select"
                className="font-heading"
                style={{
                  background: "oklch(0.20 0.05 20)",
                  borderColor: "oklch(0.35 0.08 25)",
                  color: "oklch(0.90 0.04 60)",
                }}
              >
                <SelectValue placeholder="Select city..." />
              </SelectTrigger>
              <SelectContent
                style={{
                  background: "oklch(0.20 0.05 20)",
                  borderColor: "oklch(0.35 0.08 25)",
                  maxHeight: "280px",
                  overflowY: "auto",
                }}
              >
                {INDIAN_CITIES.map((city) => (
                  <SelectItem
                    key={city.name}
                    value={city.name}
                    style={{ color: "oklch(0.90 0.04 60)" }}
                  >
                    {city.name}, {city.state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <span
            className="font-body text-xs"
            style={{ color: "oklch(0.60 0.04 60)" }}
          >
            🌐 {selectedCity.lat.toFixed(2)}°N, {selectedCity.lon.toFixed(2)}°E
          </span>
        </div>
      </div>

      <div className="text-center mb-8">
        <h2
          className="font-heading text-2xl font-bold mb-1"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          📅 Aaj Ka Panchang
        </h2>
        <p className="font-body text-muted-foreground">
          {panchang.day}, {panchang.date}
        </p>
        <p
          className="text-xs font-body mt-1"
          style={{ color: "oklch(0.55 0.16 60)" }}
        >
          📍 {selectedCity.name}, {selectedCity.state}
        </p>
        <p
          className="text-xs font-body mt-1 px-3 py-1 rounded-full inline-block"
          style={{
            background: "oklch(0.78 0.14 75 / 0.1)",
            color: "oklch(0.55 0.16 60)",
          }}
        >
          📍 Placeholder data — Connect AstrologyAPI.com for live calculations
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {cards.map((card) => (
          <div
            key={card.label}
            className="ornamental-border rounded-xl p-4 bg-card text-center"
          >
            <div className="text-3xl mb-2">{card.icon}</div>
            <p className="font-heading text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              {card.label}
            </p>
            <p
              className="font-heading font-bold text-base"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              {card.value}
            </p>
            <p className="text-xs font-body text-muted-foreground">
              {card.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Shubh Muhurat */}
      <div className="ornamental-border rounded-xl p-6 bg-card mb-4">
        <h3
          className="font-heading font-bold text-lg mb-4"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          ✨ Shubh Muhurat
        </h3>
        <div className="space-y-3">
          {panchang.shubhMuhurat.map((m) => (
            <div
              key={m.name}
              className="flex items-center justify-between p-3 rounded-lg"
              style={{
                background: "oklch(0.65 0.16 140 / 0.08)",
                border: "1px solid oklch(0.65 0.16 140 / 0.2)",
              }}
            >
              <span
                className="font-heading font-semibold text-sm"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                {m.name}
              </span>
              <span className="font-body text-sm text-muted-foreground">
                {m.startTime} – {m.endTime}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Inauspicious Times */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            label: "Rahukaal",
            startTime: adjustedRahu.start,
            endTime: adjustedRahu.end,
            icon: "⚠️",
            color: "oklch(0.55 0.22 25)",
          },
          {
            label: "Yamaganda",
            ...panchang.yamaganda,
            icon: "🚫",
            color: "oklch(0.55 0.18 40)",
          },
          {
            label: "Gulika Kaal",
            ...panchang.gulika,
            icon: "⛔",
            color: "oklch(0.50 0.15 30)",
          },
        ].map((t) => (
          <div
            key={t.label}
            className="rounded-xl p-4 text-center border"
            style={{
              background: `${t.color}10`,
              borderColor: `${t.color}30`,
            }}
          >
            <div className="text-2xl mb-1">{t.icon}</div>
            <p
              className="font-heading font-bold text-sm mb-1"
              style={{ color: t.color }}
            >
              {t.label}
            </p>
            <p className="font-body text-xs text-muted-foreground">
              {t.startTime} – {t.endTime}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
