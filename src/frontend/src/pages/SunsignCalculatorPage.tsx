import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const SUN_SIGNS = [
  { sign: "Aries", signHi: "मेष", start: "Mar 21", end: "Apr 19", symbol: "♈" },
  {
    sign: "Taurus",
    signHi: "वृषभ",
    start: "Apr 20",
    end: "May 20",
    symbol: "♉",
  },
  {
    sign: "Gemini",
    signHi: "मिथुन",
    start: "May 21",
    end: "Jun 20",
    symbol: "♊",
  },
  {
    sign: "Cancer",
    signHi: "कर्क",
    start: "Jun 21",
    end: "Jul 22",
    symbol: "♋",
  },
  { sign: "Leo", signHi: "सिंह", start: "Jul 23", end: "Aug 22", symbol: "♌" },
  {
    sign: "Virgo",
    signHi: "कन्या",
    start: "Aug 23",
    end: "Sep 22",
    symbol: "♍",
  },
  {
    sign: "Libra",
    signHi: "तुला",
    start: "Sep 23",
    end: "Oct 22",
    symbol: "♎",
  },
  {
    sign: "Scorpio",
    signHi: "वृश्चिक",
    start: "Oct 23",
    end: "Nov 21",
    symbol: "♏",
  },
  {
    sign: "Sagittarius",
    signHi: "धनु",
    start: "Nov 22",
    end: "Dec 21",
    symbol: "♐",
  },
  {
    sign: "Capricorn",
    signHi: "मकर",
    start: "Dec 22",
    end: "Jan 19",
    symbol: "♑",
  },
  {
    sign: "Aquarius",
    signHi: "कुंभ",
    start: "Jan 20",
    end: "Feb 18",
    symbol: "♒",
  },
  {
    sign: "Pisces",
    signHi: "मीन",
    start: "Feb 19",
    end: "Mar 20",
    symbol: "♓",
  },
];

const MONTHS_FULL = [
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
const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function SunsignCalculatorPage() {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [result, setResult] = useState<(typeof SUN_SIGNS)[0] | null>(null);

  const findSign = () => {
    const d = Number.parseInt(day);
    const m = Number.parseInt(month);
    if (!d || !m) return;
    const found = SUN_SIGNS.find((s) => {
      const sm = MONTHS_SHORT.indexOf(s.start.split(" ")[0]) + 1;
      const sd = Number.parseInt(s.start.split(" ")[1]);
      const em = MONTHS_SHORT.indexOf(s.end.split(" ")[0]) + 1;
      const ed = Number.parseInt(s.end.split(" ")[1]);
      if (sm === em) return m === sm && d >= sd && d <= ed;
      if (m === sm) return d >= sd;
      if (m === em) return d <= ed;
      return false;
    });
    setResult(found ?? null);
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.14 0.06 20) 0%, oklch(0.12 0.04 20) 100%)",
      }}
    >
      <section
        className="py-12 px-4 text-center border-b"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.08 22), oklch(0.16 0.07 28))",
          borderColor: "oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-5xl mb-4">☀️</div>
          <h1
            className="font-heading font-bold text-3xl md:text-4xl mb-2"
            style={{ color: "oklch(0.90 0.05 65)" }}
          >
            {isHindi ? "सन साइन कैलकुलेटर" : "Sun Sign Calculator"}
          </h1>
          <p className="text-sm" style={{ color: "oklch(0.65 0.05 58)" }}>
            {isHindi
              ? "अपनी जन्म तिथि से अपनी राशि जानें"
              : "Find your Western sun sign from your birth date"}
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8 max-w-2xl space-y-6">
        <div
          className="rounded-2xl p-6 border"
          style={{
            background: "oklch(0.18 0.09 22)",
            borderColor: "oklch(0.78 0.14 75 / 0.25)",
          }}
        >
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="sunsign-day"
                className="block text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: "oklch(0.68 0.18 145)" }}
              >
                {isHindi ? "दिन" : "Day"}
              </label>
              <input
                id="sunsign-day"
                type="number"
                min="1"
                max="31"
                placeholder="1-31"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm border outline-none"
                style={{
                  background: "oklch(0.16 0.06 22)",
                  borderColor: "oklch(0.38 0.14 145)",
                  color: "oklch(0.88 0.06 65)",
                }}
                data-ocid="sunsign.day.input"
              />
            </div>
            <div>
              <label
                htmlFor="sunsign-month"
                className="block text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: "oklch(0.68 0.18 145)" }}
              >
                {isHindi ? "माह" : "Month"}
              </label>
              <select
                id="sunsign-month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm border outline-none"
                style={{
                  background: "oklch(0.16 0.06 22)",
                  borderColor: "oklch(0.38 0.14 145)",
                  color: "oklch(0.88 0.06 65)",
                }}
                data-ocid="sunsign.month.select"
              >
                <option value="">{isHindi ? "माह चुनें" : "Select month"}</option>
                {MONTHS_FULL.map((m, i) => (
                  <option key={m} value={i + 1}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="button"
            onClick={findSign}
            className="w-full py-3 rounded-xl font-heading font-bold text-sm"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
            }}
            data-ocid="sunsign.submit_button"
          >
            {isHindi ? "राशि खोजें" : "Find My Sun Sign"}
          </button>
          {result && (
            <div
              className="mt-5 rounded-xl p-5 border text-center"
              style={{
                background: "oklch(0.55 0.18 145 / 0.08)",
                borderColor: "oklch(0.55 0.18 145 / 0.35)",
              }}
              data-ocid="sunsign.success_state"
            >
              <p className="text-4xl mb-2">{result.symbol}</p>
              <p
                className="font-heading font-bold text-2xl"
                style={{ color: "oklch(0.88 0.06 65)" }}
              >
                {isHindi ? result.signHi : result.sign}
              </p>
              <p
                className="text-sm mt-1"
                style={{ color: "oklch(0.68 0.14 75)" }}
              >
                {result.start} – {result.end}
              </p>
            </div>
          )}
        </div>
        <div
          className="rounded-2xl overflow-hidden border"
          style={{ borderColor: "oklch(0.28 0.08 30)" }}
          data-ocid="sunsign.table"
        >
          <div
            className="grid grid-cols-3 px-4 py-2 text-xs font-bold uppercase tracking-wider border-b"
            style={{
              background: "oklch(0.20 0.08 22)",
              borderColor: "oklch(0.28 0.08 28)",
              color: "oklch(0.68 0.14 75)",
            }}
          >
            <span>{isHindi ? "राशि" : "Sign"}</span>
            <span>{isHindi ? "शुरुआत" : "Start"}</span>
            <span>{isHindi ? "अंत" : "End"}</span>
          </div>
          {SUN_SIGNS.map((s, i) => (
            <div
              key={s.sign}
              className="grid grid-cols-3 px-4 py-3 text-xs border-b"
              style={{
                background:
                  i % 2 === 0 ? "oklch(0.16 0.05 22)" : "oklch(0.17 0.06 22)",
                borderColor: "oklch(0.22 0.05 22)",
              }}
              data-ocid={`sunsign.row.${i + 1}`}
            >
              <span
                className="font-semibold"
                style={{ color: "oklch(0.82 0.08 65)" }}
              >
                {s.symbol} {isHindi ? s.signHi : s.sign}
              </span>
              <span style={{ color: "oklch(0.68 0.04 55)" }}>{s.start}</span>
              <span style={{ color: "oklch(0.68 0.04 55)" }}>{s.end}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
