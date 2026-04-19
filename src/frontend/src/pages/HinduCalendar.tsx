import { Link } from "@tanstack/react-router";
import { useState } from "react";

interface MonthFestival {
  name: string;
  about?: string;
}

interface LunarMonth {
  key: string;
  name: string;
  gregorian: string;
  emoji: string;
  festivals: MonthFestival[];
}

const lunarMonths: LunarMonth[] = [
  {
    key: "chaitra",
    name: "Chaitra",
    gregorian: "March / April",
    emoji: "🌸",
    festivals: [
      { name: "Sheetala Ashtami" },
      { name: "Ghatasthapana" },
      { name: "Ugadi", about: "About Ugadi" },
      { name: "Gudi Padwa", about: "About Gudi Padwa" },
      { name: "Rama Navami", about: "About Rama Navami" },
    ],
  },
  {
    key: "vaishakha",
    name: "Vaishakha",
    gregorian: "April / May",
    emoji: "🌺",
    festivals: [
      { name: "Parashurama Jayanti" },
      { name: "Akshaya Tritiya", about: "About Akshaya Tritiya" },
      { name: "Sita Navami" },
      { name: "Mohini Ekadashi" },
      { name: "Narasimha Jayanti" },
    ],
  },
  {
    key: "jyeshtha",
    name: "Jyeshtha",
    gregorian: "May / June",
    emoji: "☀️",
    festivals: [
      { name: "Narada Jayanti" },
      { name: "Vat Savitri Vrat" },
      { name: "Shani Jayanti" },
      { name: "Ganga Dussehra" },
      { name: "Vat Purnima Vrat" },
    ],
  },
  {
    key: "ashadha",
    name: "Ashadha",
    gregorian: "June / July",
    emoji: "🌊",
    festivals: [
      { name: "Jagannath Rathyatra" },
      { name: "Devshayani Ekadashi" },
      { name: "Guru Purnima" },
      { name: "Gauri Vrat (Gujarat)" },
      { name: "Jayapartvati Vrat" },
    ],
  },
  {
    key: "shravana",
    name: "Shravana",
    gregorian: "July / August",
    emoji: "🌧️",
    festivals: [
      { name: "Shravan Somwar Vrats" },
      { name: "Mangala Gauri Vrats" },
      { name: "Nag Panchami" },
      { name: "Varalakshmi Vrat" },
      { name: "Raksha Bandhan", about: "About Rakhi" },
    ],
  },
  {
    key: "bhadrapada",
    name: "Bhadrapada",
    gregorian: "August / September",
    emoji: "🐘",
    festivals: [
      { name: "Krishna Janmashtami", about: "About Janmashtami" },
      { name: "Hartalika Teej" },
      { name: "Ganesh Chaturthi", about: "About Ganesha Chaturthi" },
      { name: "Rishi Panchami" },
      { name: "Ganesh Visarjan" },
    ],
  },
  {
    key: "ashwin",
    name: "Ashwin",
    gregorian: "September / October",
    emoji: "🍂",
    festivals: [
      { name: "Pitrupaksha Begins" },
      { name: "Indira Ekadashi" },
      { name: "Sarva Pitru Amavasya" },
      { name: "Shardiya Navratri", about: "About Navratri" },
      { name: "Durga Ashtami", about: "About Durga Puja" },
    ],
  },
  {
    key: "kartik",
    name: "Kartik",
    gregorian: "October / November",
    emoji: "🪔",
    festivals: [
      { name: "Karwa Chauth", about: "About Karwa Chauth" },
      { name: "Dhanteras" },
      { name: "Diwali Puja", about: "About Diwali" },
      { name: "Bhaiya Dooj" },
      { name: "Chhath Puja" },
    ],
  },
  {
    key: "margashirsha",
    name: "Margashirsha",
    gregorian: "November / December",
    emoji: "❄️",
    festivals: [
      { name: "Kalabhairav Jayanti" },
      { name: "Utpanna Ekadashi" },
      { name: "Vivah Panchami" },
      { name: "Gita Jayanti" },
      { name: "Mokshada Ekadashi" },
    ],
  },
  {
    key: "paush",
    name: "Paush",
    gregorian: "December / January",
    emoji: "🌨️",
    festivals: [
      { name: "Saphala Ekadashi" },
      { name: "Pausha Putrada Ekadashi" },
      { name: "Banada Ashtami" },
      { name: "Shakambhari Purnima" },
      { name: "Pausha Purnima" },
    ],
  },
  {
    key: "magha",
    name: "Magha",
    gregorian: "January / February",
    emoji: "🌟",
    festivals: [
      { name: "Sakat Chauth" },
      { name: "Shattila Ekadashi" },
      { name: "Vasant Panchami", about: "About Vasant Panchami" },
      { name: "Ratha Saptami" },
      { name: "Bhishma Ashtami" },
    ],
  },
  {
    key: "phalguna",
    name: "Phalguna",
    gregorian: "February / March",
    emoji: "🎨",
    festivals: [
      { name: "Vijaya Ekadashi" },
      { name: "Maha Shivaratri", about: "About Maha Shivaratri" },
      { name: "Phulera Dooj" },
      { name: "Amalaki Ekadashi" },
      { name: "Holika Dahan" },
    ],
  },
];

const otherLinks = [
  { label: "🌞 Sankranti Festivals", path: "/festival-calendar" },
  { label: "🌺 Tamil Festivals", path: "/festival-calendar" },
  { label: "🪔 Malayalam Festivals", path: "/festival-calendar" },
  { label: "🏆 Top 25 Hindu Festivals", path: "/top-hindu-festivals" },
  { label: "Top 20 Hindu Festivals", path: "/top-hindu-festivals-20" },
  { label: "Top 10 Hindu Festivals", path: "/top-hindu-festivals-10" },
  { label: "🧘 Gurus and Saints", path: "/divine-info" },
];

export default function HinduCalendar() {
  const [activeMonth, setActiveMonth] = useState("chaitra");

  const current = lunarMonths.find((m) => m.key === activeMonth)!;

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.14 0.05 20)" }}>
      {/* Hero */}
      <div
        className="py-10 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.08 22) 0%, oklch(0.22 0.10 35) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.15)",
        }}
      >
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">📅</span>
            <div>
              <h1
                className="text-2xl sm:text-3xl font-heading font-bold"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                Hindu Calendar — Hindu Festivals Month by Month
              </h1>
              <p
                className="text-sm font-body mt-1"
                style={{ color: "oklch(0.65 0.04 60)" }}
              >
                The position of Sun and Moon determines the date and time of the
                Hindu festivals. Complete list of all Hindu festivals and
                celebrations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-8">
        {/* Month tabs — scrollable row */}
        <div
          className="rounded-2xl p-4 border mb-8 overflow-x-auto"
          style={{
            background: "oklch(0.18 0.07 22)",
            borderColor: "oklch(0.78 0.14 75 / 0.18)",
          }}
        >
          <div className="flex gap-2 min-w-max">
            {lunarMonths.map((m) => (
              <button
                key={m.key}
                type="button"
                onClick={() => setActiveMonth(m.key)}
                className="flex flex-col items-center px-3 py-2 rounded-xl text-xs font-heading transition-all border whitespace-nowrap"
                style={{
                  background:
                    activeMonth === m.key
                      ? "oklch(0.78 0.14 75 / 0.2)"
                      : "oklch(0.20 0.07 28)",
                  borderColor:
                    activeMonth === m.key
                      ? "oklch(0.78 0.14 75 / 0.5)"
                      : "oklch(0.78 0.14 75 / 0.1)",
                  color:
                    activeMonth === m.key
                      ? "oklch(0.82 0.14 70)"
                      : "oklch(0.70 0.04 58)",
                }}
                data-ocid="hindu_calendar.month_tab"
              >
                <span className="text-lg mb-0.5">{m.emoji}</span>
                <span className="font-bold">{m.name}</span>
                <span
                  className="text-xs"
                  style={{ color: "oklch(0.55 0.03 50)" }}
                >
                  {m.gregorian}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Month content */}
        <div
          className="rounded-2xl border overflow-hidden mb-8"
          style={{ borderColor: "oklch(0.78 0.14 75 / 0.2)" }}
        >
          {/* Month header */}
          <div
            className="px-6 py-4 flex items-center gap-3"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.22 0.10 40) 0%, oklch(0.18 0.08 30) 100%)",
              borderBottom: "1px solid oklch(0.78 0.14 75 / 0.18)",
            }}
          >
            <span className="text-4xl">{current.emoji}</span>
            <div>
              <h2
                className="text-xl font-heading font-bold"
                style={{ color: "oklch(0.82 0.14 70)" }}
              >
                {current.name} Month Hindu Festivals
              </h2>
              <p
                className="text-sm font-body"
                style={{ color: "oklch(0.65 0.04 58)" }}
              >
                [{current.gregorian}]
              </p>
            </div>
          </div>

          {/* Festivals grid */}
          <div
            className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            style={{ background: "oklch(0.17 0.06 22)" }}
          >
            {current.festivals.map((f) => (
              <div
                key={f.name}
                className="rounded-xl p-4 border hover:border-amber-500/30 transition-all"
                style={{
                  background: "oklch(0.20 0.07 28)",
                  borderColor: "oklch(0.78 0.14 75 / 0.12)",
                }}
                data-ocid="hindu_calendar.festival_card"
              >
                <h3
                  className="font-heading font-semibold text-sm mb-1"
                  style={{ color: "oklch(0.88 0.06 75)" }}
                >
                  {f.name}
                </h3>
                {f.about && (
                  <Link
                    to="/festival-calendar"
                    className="text-xs font-body transition-colors hover:underline"
                    style={{ color: "oklch(0.68 0.12 58)" }}
                    data-ocid="hindu_calendar.about_link"
                  >
                    {f.about} →
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* More festivals note */}
          <div
            className="px-6 py-3 text-xs font-body italic"
            style={{
              background: "oklch(0.16 0.06 22)",
              borderTop: "1px solid oklch(0.78 0.14 75 / 0.08)",
              color: "oklch(0.55 0.03 50)",
            }}
          >
            ...more {current.name} Festivals in the Festival Calendar
          </div>
        </div>

        {/* All Months overview cards */}
        <section className="mb-8">
          <h2
            className="text-lg font-heading font-bold mb-4"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            📋 All Lunar Month Festivals
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {lunarMonths.map((m) => (
              <button
                key={m.key}
                type="button"
                onClick={() => setActiveMonth(m.key)}
                className="rounded-xl p-4 border text-left transition-all hover:border-amber-500/40 hover:scale-[1.02]"
                style={{
                  background:
                    activeMonth === m.key
                      ? "oklch(0.20 0.10 35)"
                      : "oklch(0.18 0.06 22)",
                  borderColor:
                    activeMonth === m.key
                      ? "oklch(0.78 0.14 75 / 0.4)"
                      : "oklch(0.78 0.14 75 / 0.12)",
                }}
                data-ocid="hindu_calendar.month_card"
              >
                <div className="text-2xl mb-1">{m.emoji}</div>
                <div
                  className="font-heading font-semibold text-sm"
                  style={{ color: "oklch(0.88 0.06 75)" }}
                >
                  {m.name}
                </div>
                <div
                  className="text-xs font-body mt-0.5"
                  style={{ color: "oklch(0.55 0.03 50)" }}
                >
                  {m.gregorian}
                </div>
                <div
                  className="text-xs font-body mt-1"
                  style={{ color: "oklch(0.65 0.04 58)" }}
                >
                  {m.festivals.length} festivals
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Sankranti Festivals special section */}
        <section
          className="rounded-2xl p-5 border mb-8"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.20 0.10 40 / 0.5) 0%, oklch(0.17 0.07 28) 100%)",
            borderColor: "oklch(0.82 0.18 65 / 0.25)",
          }}
        >
          <div className="flex items-start gap-4">
            <span className="text-3xl">🌞</span>
            <div>
              <h3
                className="font-heading font-bold text-base mb-1"
                style={{ color: "oklch(0.82 0.18 65)" }}
              >
                Sankranti Festivals
              </h3>
              <p
                className="text-sm font-body mb-3"
                style={{ color: "oklch(0.65 0.04 58)" }}
              >
                According to the Hindu calendar, there are 12 Sankranti days in
                a year. The transit of the Sun from one zodiac sign to another
                is known as Sankranti. These days are very auspicious for
                charity and fasting.
              </p>
              <Link
                to="/festival-calendar"
                className="text-sm font-heading font-semibold"
                style={{ color: "oklch(0.78 0.14 75)" }}
                data-ocid="hindu_calendar.sankranti_link"
              >
                View Sankranti Festivals →
              </Link>
            </div>
          </div>
        </section>

        {/* Other Festival Lists */}
        <section>
          <h2
            className="text-lg font-heading font-bold mb-4"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Other Festival Lists
          </h2>
          <div className="flex flex-wrap gap-3">
            {otherLinks.map((ol) => (
              <Link
                key={ol.label}
                to={ol.path}
                className="px-4 py-2 rounded-full text-sm font-heading font-medium border transition-all hover:bg-white/10"
                style={{
                  borderColor: "oklch(0.78 0.14 75 / 0.25)",
                  color: "oklch(0.88 0.06 75)",
                  background: "oklch(0.18 0.06 22)",
                }}
                data-ocid="hindu_calendar.other_link"
              >
                {ol.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
