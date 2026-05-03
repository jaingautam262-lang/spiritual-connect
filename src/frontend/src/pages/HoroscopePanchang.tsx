import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
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
  { value: "calendar", label: "🗓 Calendar" },
  { value: "samvat", label: "📜 Samvat" },
  { value: "faq", label: "❓ FAQ" },
];

// ─── Vikram & Shaka Samvat ────────────────────────────────────────────────────

function getSamvatYear() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 1-12
  // Vikram Samvat: year + 57 (approx; +56 from Jan–Mar, +57 from Apr–Dec)
  const vikramSamvat = month >= 4 ? year + 57 : year + 56;
  // Shaka Samvat: year - 78 (approx; -79 from Jan–Mar, -78 from Apr–Dec)
  const shakaSamvat = month >= 4 ? year - 78 : year - 79;
  return { vikramSamvat, shakaSamvat, gregorianYear: year };
}

const HINDU_MONTHS = [
  { num: 1, name: "Chaitra", hindi: "चैत्र", approx: "Mar–Apr" },
  { num: 2, name: "Vaishakha", hindi: "वैशाख", approx: "Apr–May" },
  { num: 3, name: "Jyeshtha", hindi: "ज्येष्ठ", approx: "May–Jun" },
  { num: 4, name: "Ashadha", hindi: "आषाढ़", approx: "Jun–Jul" },
  { num: 5, name: "Shravana", hindi: "श्रावण", approx: "Jul–Aug" },
  { num: 6, name: "Bhadrapada", hindi: "भाद्रपद", approx: "Aug–Sep" },
  { num: 7, name: "Ashwin", hindi: "अश्विन", approx: "Sep–Oct" },
  { num: 8, name: "Kartik", hindi: "कार्तिक", approx: "Oct–Nov" },
  { num: 9, name: "Margashirsha", hindi: "मार्गशीर्ष", approx: "Nov–Dec" },
  { num: 10, name: "Pausha", hindi: "पौष", approx: "Dec–Jan" },
  { num: 11, name: "Magha", hindi: "माघ", approx: "Jan–Feb" },
  { num: 12, name: "Phalguna", hindi: "फाल्गुन", approx: "Feb–Mar" },
];

function SamvatSection() {
  const { vikramSamvat, shakaSamvat, gregorianYear } = getSamvatYear();
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Samvat Header */}
      <div
        className="rounded-2xl p-6 border text-center"
        style={{
          background: "oklch(0.16 0.06 22)",
          borderColor: "oklch(0.30 0.10 40)",
        }}
      >
        <div className="text-5xl mb-3">📜</div>
        <h2
          className="font-heading text-2xl font-bold mb-1"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          Hindu Samvat Calendars
        </h2>
        <p className="text-sm text-muted-foreground">
          Current Hindu Calendar Year
        </p>
      </div>

      {/* Samvat Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          {
            label: "Vikram Samvat",
            year: vikramSamvat,
            icon: "🔱",
            note: "Started by Raja Vikramaditya",
            color: "oklch(0.78 0.14 75)",
          },
          {
            label: "Shaka Samvat",
            year: shakaSamvat,
            icon: "🌙",
            note: "National Calendar of India",
            color: "oklch(0.68 0.20 200)",
          },
          {
            label: "Gregorian Year",
            year: gregorianYear,
            icon: "🗓",
            note: "Common Era Calendar",
            color: "oklch(0.70 0.04 60)",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-5 border text-center"
            style={{
              background: "oklch(0.18 0.06 22)",
              borderColor: "oklch(0.28 0.08 30)",
            }}
          >
            <div className="text-3xl mb-2">{s.icon}</div>
            <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
            <p
              className="font-heading text-3xl font-bold mb-1"
              style={{ color: s.color }}
            >
              {s.year}
            </p>
            <p className="text-xs text-muted-foreground">{s.note}</p>
          </div>
        ))}
      </div>

      {/* Hindu Months Table */}
      <div
        className="rounded-xl overflow-hidden border"
        style={{ borderColor: "oklch(0.28 0.06 28)" }}
      >
        <div
          className="px-5 py-3 border-b"
          style={{
            background: "oklch(0.20 0.07 24)",
            borderColor: "oklch(0.28 0.06 28)",
          }}
        >
          <h3
            className="font-heading font-bold"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            12 Hindu Months — हिन्दू माह
          </h3>
        </div>
        <div className="divide-y divide-border/20">
          {HINDU_MONTHS.map((m, i) => (
            <div
              key={m.num}
              className="flex items-center px-5 py-3 gap-4 text-sm"
              style={{
                background:
                  i % 2 === 0 ? "oklch(0.17 0.05 22)" : "oklch(0.15 0.04 20)",
              }}
            >
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{
                  background: "oklch(0.78 0.14 75 / 0.2)",
                  color: "oklch(0.78 0.14 75)",
                }}
              >
                {m.num}
              </span>
              <span className="font-semibold text-foreground flex-1">
                {m.name}
              </span>
              <span className="text-muted-foreground">{m.hindi}</span>
              <span className="text-xs text-muted-foreground ml-auto">
                {m.approx}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar System Comparison */}
      <div
        className="rounded-xl p-5 border space-y-3"
        style={{
          background: "oklch(0.16 0.06 22)",
          borderColor: "oklch(0.28 0.06 28)",
        }}
      >
        <h3
          className="font-heading font-bold text-sm uppercase tracking-wide"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          About Hindu Calendars
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Vikram Samvat</strong> is the most
          widely used Hindu calendar in North India. It was established by
          Emperor Vikramaditya and runs approximately 57 years ahead of the
          Common Era.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Shaka Samvat</strong> is India's
          National Calendar (official civil calendar). It runs approximately 78
          years behind the Common Era and begins with the month of Chaitra
          around March 22 each year.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The Hindu calendar is{" "}
          <strong className="text-foreground">lunisolar</strong> — lunar months
          (determined by Moon cycles) are synchronized with the solar year
          through a periodic intercalary (Adhik/Mal) month added approximately
          every 3 years.
        </p>
      </div>
    </div>
  );
}

// ─── Monthly Calendar View ────────────────────────────────────────────────────

const TITHIS = [
  "Pratipada",
  "Dwitiya",
  "Tritiya",
  "Chaturthi",
  "Panchami",
  "Shashthi",
  "Saptami",
  "Ashtami",
  "Navami",
  "Dashami",
  "Ekadashi",
  "Dwadashi",
  "Trayodashi",
  "Chaturdashi",
  "Purnima",
  "Pratipada",
  "Dwitiya",
  "Tritiya",
  "Chaturthi",
  "Panchami",
  "Shashthi",
  "Saptami",
  "Ashtami",
  "Navami",
  "Dashami",
  "Ekadashi",
  "Dwadashi",
  "Trayodashi",
  "Chaturdashi",
  "Amavasya",
];

function MonthlyCalendar() {
  const now = new Date();
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [viewYear, setViewYear] = useState(now.getFullYear());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const today = now.getDate();
  const isCurrentMonth =
    viewMonth === now.getMonth() && viewYear === now.getFullYear();

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Month Nav */}
      <div
        className="flex items-center justify-between rounded-xl px-5 py-3 border"
        style={{
          background: "oklch(0.18 0.06 22)",
          borderColor: "oklch(0.30 0.10 40)",
        }}
      >
        <button
          type="button"
          onClick={prevMonth}
          data-ocid="panchang.calendar.prev"
          className="text-2xl px-2 hover:text-primary transition-colors"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          ‹
        </button>
        <div className="text-center">
          <h3
            className="font-heading font-bold text-lg"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {monthNames[viewMonth]} {viewYear}
          </h3>
          <p className="text-xs text-muted-foreground">
            Vikram Samvat {viewMonth >= 3 ? viewYear + 57 : viewYear + 56}
          </p>
        </div>
        <button
          type="button"
          onClick={nextMonth}
          data-ocid="panchang.calendar.next"
          className="text-2xl px-2 hover:text-primary transition-colors"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          ›
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1">
        {dayNames.map((d) => (
          <div
            key={d}
            className="text-center text-xs font-semibold py-2"
            style={{ color: "oklch(0.60 0.04 55)" }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day Cells */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          const cellKey = day === null ? `empty-${idx}` : `day-cell-${day}`;
          if (day === null) return <div key={cellKey} />;
          const tithiIdx = (day - 1) % 30;
          const paksha = tithiIdx < 15 ? "S" : "K";
          const isToday = isCurrentMonth && day === today;
          return (
            <div
              key={cellKey}
              className="rounded-lg p-2 text-center border cursor-default"
              style={{
                background: isToday
                  ? "oklch(0.68 0.20 48 / 0.3)"
                  : "oklch(0.17 0.05 22)",
                borderColor: isToday
                  ? "oklch(0.68 0.20 48)"
                  : "oklch(0.25 0.05 25)",
              }}
            >
              <p
                className="text-sm font-bold"
                style={{
                  color: isToday
                    ? "oklch(0.88 0.14 75)"
                    : "oklch(0.85 0.04 60)",
                }}
              >
                {day}
              </p>
              <p
                className="text-[9px] leading-tight"
                style={{ color: "oklch(0.55 0.14 60)" }}
              >
                {paksha}
                {(tithiIdx % 15) + 1}
              </p>
              <p className="text-[8px] leading-tight text-muted-foreground truncate">
                {TITHIS[tithiIdx].slice(0, 5)}
              </p>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-center text-muted-foreground">
        S = Shukla Paksha (Waxing Moon) · K = Krishna Paksha (Waning Moon) ·
        Numbers = Tithi
      </p>
    </div>
  );
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────

const PANCHANG_FAQ = [
  {
    q: "What is Tithi?",
    a: "Tithi is the lunar day in the Hindu calendar. There are 30 Tithis in a lunar month — 15 in Shukla Paksha (waxing moon, from new to full) and 15 in Krishna Paksha (waning moon, from full to new). Each Tithi has specific religious significance and auspicious/inauspicious properties.",
  },
  {
    q: "What is Nakshatra?",
    a: "The Moon's path (ecliptic) is divided into 27 equal segments of 13°20' each, called Nakshatras (lunar mansions). The Nakshatra occupied by the Moon at birth is the 'Janma Nakshatra' and determines the starting period in the Vimshottari Dasha system. Each Nakshatra has a ruling deity, planet, and specific qualities.",
  },
  {
    q: "What is Yoga in Panchang?",
    a: "Yoga is one of the five elements of Panchang. It is calculated by adding the longitudes of the Sun and Moon and dividing by 13°20'. There are 27 Yogas ranging from auspicious (like Siddhi, Shubha) to inauspicious (like Vishkambha, Ganda). Certain Yogas are avoided for important events.",
  },
  {
    q: "What is Karana?",
    a: "Karana is half a Tithi (approximately 6 hours). There are 11 Karanas — 4 fixed (Shakuni, Chatushpada, Naga, Kimstughna) and 7 movable (Bava, Balava, Kaulava, Taitila, Garaja, Vanija, Vishti/Bhadra). Vishti (Bhadra) Karana is considered inauspicious for auspicious activities.",
  },
  {
    q: "What is Rahu Kaal?",
    a: "Rahu Kaal is a period of approximately 1.5 hours each day considered inauspicious for starting new ventures. It is calculated based on the day of the week and sunrise/sunset times. Monday's Rahu Kaal is 7:30-9:00 AM, Tuesday's is 3:00-4:30 PM, Wednesday's is 12:00-1:30 PM, and so on.",
  },
  {
    q: "What is Abhijit Muhurta?",
    a: "Abhijit Muhurta is an auspicious time period of approximately 48 minutes centered around solar noon. It falls roughly 24 minutes before and after the local noon time. It is considered one of the most powerful and universally auspicious Muhurats for any important work, overriding even inauspicious Yogas.",
  },
  {
    q: "What is the difference between Vikram Samvat and Shaka Samvat?",
    a: "Vikram Samvat is the traditional Hindu calendar running ~57 years ahead of CE, widely used in North India. Shaka Samvat is India's official National Calendar running ~78 years behind CE, beginning with Chaitra Shukla Pratipada around March 22. Vikram Samvat begins on Chaitra Shukla Pratipada after Holi.",
  },
  {
    q: "What is Gulika Kaal and Yamaganda?",
    a: "Gulika Kaal is a ~1.5 hour period associated with Gulika (son of Saturn), considered inauspicious for new beginnings. Yamaganda Kaal is another malefic period associated with Yama (god of death). Both are calculated from sunrise based on the day of the week and should be avoided for auspicious activities like weddings, business starts, or travel.",
  },
];

function PanchangFAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="max-w-3xl mx-auto space-y-3">
      <div className="text-center mb-6">
        <h2
          className="font-heading text-2xl font-bold mb-2"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          पंचांग — Frequently Asked Questions
        </h2>
        <p className="text-sm text-muted-foreground">
          Common questions about Hindu Panchang, Tithi, Nakshatra, and Muhurta
        </p>
      </div>
      {PANCHANG_FAQ.map((faq, i) => (
        <div
          key={faq.q}
          className="rounded-xl border overflow-hidden"
          style={{
            borderColor:
              open === i ? "oklch(0.68 0.20 48 / 0.5)" : "oklch(0.28 0.06 28)",
          }}
          data-ocid={`panchang-faq-${i + 1}`}
        >
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left px-5 py-4 flex items-center justify-between gap-3"
            style={{
              background:
                open === i ? "oklch(0.20 0.08 24)" : "oklch(0.17 0.05 22)",
            }}
          >
            <span className="font-heading font-semibold text-sm text-foreground">
              {faq.q}
            </span>
            <span
              className="text-xl flex-shrink-0"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              {open === i ? "−" : "+"}
            </span>
          </button>
          {open === i && (
            <div
              className="px-5 pb-4"
              style={{ background: "oklch(0.15 0.04 20)" }}
            >
              <p className="text-sm text-muted-foreground leading-relaxed">
                {faq.a}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

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
          <TabsContent value="calendar">
            <MonthlyCalendar />
          </TabsContent>
          <TabsContent value="samvat">
            <SamvatSection />
          </TabsContent>
          <TabsContent value="faq">
            <PanchangFAQ />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
