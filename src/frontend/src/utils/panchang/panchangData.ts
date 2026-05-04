import {
  CITIES,
  KARANAS,
  LUNAR_MONTHS,
  RASHIS,
  SAMVATSARAS,
  YOGAS,
} from "./panchangConstants";
import type { DailyPanchangData } from "./panchangTypes";

// ── Helper: build a single day's panchang entry ───────────────────────────────

type RawEntry = Omit<DailyPanchangData, "cityId">;

function tithiName(idx: number): string {
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
  return TITHIS[idx % 30];
}

function nakshatraName(idx: number): string {
  return [
    "Ashwini",
    "Bharani",
    "Krittika",
    "Rohini",
    "Mrigashira",
    "Ardra",
    "Punarvasu",
    "Pushya",
    "Ashlesha",
    "Magha",
    "Purva Phalguni",
    "Uttara Phalguni",
    "Hasta",
    "Chitra",
    "Swati",
    "Vishakha",
    "Anuradha",
    "Jyeshtha",
    "Mula",
    "Purva Ashadha",
    "Uttara Ashadha",
    "Shravana",
    "Dhanishtha",
    "Shatabhisha",
    "Purva Bhadrapada",
    "Uttara Bhadrapada",
    "Revati",
  ][idx % 27];
}

// Approximate sun sign based on Gregorian date (tropical zodiac)
function sunSign(month: number, day: number): string {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Mesha";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
    return "Vrishabha";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20))
    return "Mithuna";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Karka";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Simha";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Kanya";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Tula";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
    return "Vrischika";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
    return "Dhanu";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
    return "Makara";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Kumbha";
  return "Meena";
}

// Weekday: 0=Sun for given date string "YYYY-MM-DD"
function weekdayOf(dateStr: string): number {
  return new Date(dateStr).getDay();
}

// Rahu Kalam for Delhi by weekday (start–end in minutes)
const RAHU_KALAM_DELHI: Record<number, [string, string]> = {
  0: ["16:30", "18:00"],
  1: ["07:30", "09:00"],
  2: ["15:00", "16:30"],
  3: ["12:00", "13:30"],
  4: ["13:30", "15:00"],
  5: ["10:30", "12:00"],
  6: ["09:00", "10:30"],
};

// Gulika Kalam by weekday (start–end for Delhi approx)
const GULIKA_DELHI: Record<number, [string, string]> = {
  0: ["15:00", "16:30"],
  1: ["06:00", "07:30"],
  2: ["10:30", "12:00"],
  3: ["07:30", "09:00"],
  4: ["09:00", "10:30"],
  5: ["13:30", "15:00"],
  6: ["06:00", "07:30"],
};

// Yamaganda by weekday
const YAMAGANDA_DELHI: Record<number, [string, string]> = {
  0: ["12:00", "13:30"],
  1: ["10:30", "12:00"],
  2: ["09:00", "10:30"],
  3: ["07:30", "09:00"],
  4: ["06:00", "07:30"],
  5: ["15:00", "16:30"],
  6: ["13:30", "15:00"],
};

function addMinsToTime(t: string, mins: number): string {
  const [h, m] = t.split(":").map(Number);
  const total = h * 60 + m + mins;
  const nh = Math.floor((((total % 1440) + 1440) % 1440) / 60);
  const nm = (((total % 1440) + 1440) % 1440) % 60;
  return `${String(nh).padStart(2, "0")}:${String(nm).padStart(2, "0")}`;
}

function offsetTimes(
  base: [string, string],
  offsetMins: number,
): [string, string] {
  return [
    addMinsToTime(base[0], offsetMins),
    addMinsToTime(base[1], offsetMins),
  ];
}

// Build a complete day's record
function makeDay(
  dateStr: string,
  sunrise: string,
  sunset: string,
  moonrise: string,
  moonset: string,
  nextSunrise: string,
  tithiIdx: number,
  nakshatraIdx: number,
  yogaIdx: number,
  karanaIdx: number,
  moonSignIdx: number,
  rahuKalam: [string, string],
  gulika: [string, string],
  yamaganda: [string, string],
  paksha: "Shukla" | "Krishna",
): RawEntry {
  const wd = weekdayOf(dateStr);
  const [mn, dd] = dateStr.slice(5).split("-").map(Number);

  // Abhijit = solar noon ± 26.5 min
  const srMins =
    Number.parseInt(sunrise.split(":")[0], 10) * 60 +
    Number.parseInt(sunrise.split(":")[1], 10);
  const ssMins =
    Number.parseInt(sunset.split(":")[0], 10) * 60 +
    Number.parseInt(sunset.split(":")[1], 10);
  const noon = (srMins + ssMins) / 2;
  const abhijitStart = addMinsToTime("00:00", Math.round(noon - 26.5));
  const abhijitEnd = addMinsToTime("00:00", Math.round(noon + 26.5));

  // Dur muhurtam: 2 inauspicious periods ~15% and 65% through the day
  const dur1Start = addMinsToTime(
    sunrise,
    Math.round((ssMins - srMins) * 0.14),
  );
  const dur1End = addMinsToTime(sunrise, Math.round((ssMins - srMins) * 0.21));
  const dur2Start = addMinsToTime(
    sunrise,
    Math.round((ssMins - srMins) * 0.63),
  );
  const dur2End = addMinsToTime(sunrise, Math.round((ssMins - srMins) * 0.7));

  // Amrit Kalam: ~30 min block midway through the day
  const amritStart = addMinsToTime(
    sunrise,
    Math.round((ssMins - srMins) * 0.45),
  );
  const amritEnd = addMinsToTime(
    sunrise,
    Math.round((ssMins - srMins) * 0.45) + 30,
  );

  // Varjyam: ~30 min block early night
  const varjyamStart = addMinsToTime(sunset, 60);
  const varjyamEnd = addMinsToTime(sunset, 90);

  // Tithi end time = ~2 hrs after sunrise (simplified)
  const tithiEnd = addMinsToTime(sunrise, 120);
  const nakshatraEnd = addMinsToTime(sunrise, 840);
  const yogaEnd = addMinsToTime(sunrise, 960);
  const karanaEnd = addMinsToTime(sunrise, 360);
  const karana2End = addMinsToTime(sunrise, 720);
  const moonSignEnd = addMinsToTime(sunrise, 1440 * 2 + 20);

  return {
    date: dateStr,
    sunrise,
    sunset,
    moonrise,
    moonset,
    nextSunrise,
    shakaSamvat: 1948,
    vikramSamvat: 2083,
    gujaratiSamvat: 2082,
    samvatsaraName: SAMVATSARAS[(2083 - 1) % 60],
    amantaMonth: LUNAR_MONTHS[(mn - 1 + 11) % 12],
    purnimantaMonth: LUNAR_MONTHS[(mn - 1 + 10) % 12],
    weekday: wd,
    paksha,
    tithi: { name: tithiName(tithiIdx), endTime: tithiEnd },
    nakshatra: { name: nakshatraName(nakshatraIdx), endTime: nakshatraEnd },
    yoga: { name: YOGAS[yogaIdx % 27], endTime: yogaEnd },
    karana1: { name: KARANAS[karanaIdx % 11], endTime: karanaEnd },
    karana2: { name: KARANAS[(karanaIdx + 1) % 11], endTime: karana2End },
    sunSign: sunSign(mn, dd),
    moonSign: { name: RASHIS[moonSignIdx % 12], endTime: moonSignEnd },
    rahuKalam: { start: rahuKalam[0], end: rahuKalam[1] },
    gulikaiKalam: { start: gulika[0], end: gulika[1] },
    yamaganda: { start: yamaganda[0], end: yamaganda[1] },
    abhijitMuhurat: { start: abhijitStart, end: abhijitEnd, duration: "53m" },
    durMuhurtam1: { start: dur1Start, end: dur1End },
    durMuhurtam2: { start: dur2Start, end: dur2End },
    amritKalam: { start: amritStart, end: amritEnd },
    varjyam: { start: varjyamStart, end: varjyamEnd },
  };
}

// ── Delhi April 2026 ──────────────────────────────────────────────────────────
// Sunrise: ~06:09 on Apr 1, decreasing ~1min/day → 05:54 on Apr 30
// Sunset: ~18:41 on Apr 1, increasing ~1min/day → 19:07 on Apr 30
// Tithi cycle starts at index 18 (mid-cycle) on Apr 1
// Nakshatra starts at index 14 on Apr 1

const DELHI_APR_SR = [
  "06:09",
  "06:07",
  "06:06",
  "06:05",
  "06:04",
  "06:03",
  "06:01",
  "06:00",
  "05:59",
  "05:58",
  "05:57",
  "05:56",
  "05:55",
  "05:54",
  "05:53",
  "05:52",
  "05:51",
  "05:50",
  "05:49",
  "05:48",
  "05:47",
  "05:46",
  "05:45",
  "05:44",
  "05:43",
  "05:42",
  "05:41",
  "05:40",
  "05:39",
  "05:38",
];
const DELHI_APR_SS = [
  "18:41",
  "18:42",
  "18:43",
  "18:44",
  "18:45",
  "18:46",
  "18:46",
  "18:47",
  "18:48",
  "18:49",
  "18:50",
  "18:51",
  "18:51",
  "18:52",
  "18:53",
  "18:54",
  "18:55",
  "18:55",
  "18:56",
  "18:57",
  "18:58",
  "18:59",
  "19:00",
  "19:00",
  "19:01",
  "19:02",
  "19:03",
  "19:04",
  "19:05",
  "19:07",
];
const DELHI_APR_MR = [
  "02:25",
  "03:18",
  "04:12",
  "05:06",
  "06:00",
  "06:54",
  "07:48",
  "08:42",
  "09:36",
  "10:30",
  "11:24",
  "12:18",
  "13:12",
  "14:06",
  "15:00",
  "15:54",
  "16:48",
  "17:42",
  "18:36",
  "19:30",
  "20:24",
  "21:18",
  "22:12",
  "23:06",
  "00:00",
  "00:54",
  "01:48",
  "02:42",
  "03:36",
  "04:30",
];
const DELHI_APR_MS = [
  "13:45",
  "14:39",
  "15:33",
  "16:27",
  "17:21",
  "18:15",
  "19:09",
  "20:03",
  "20:57",
  "21:51",
  "22:45",
  "23:39",
  "00:33",
  "01:27",
  "02:21",
  "03:15",
  "04:09",
  "05:03",
  "05:57",
  "06:51",
  "07:45",
  "08:39",
  "09:33",
  "10:27",
  "11:21",
  "12:15",
  "13:09",
  "14:03",
  "14:57",
  "15:51",
];

// ── Helper to build a city's month array ──────────────────────────────────────

function buildMonthData(
  cityId: string,
  year: number,
  month: number, // 1-indexed
  sunrises: string[],
  sunsets: string[],
  moonrises: string[],
  moonsets: string[],
  startTithi: number,
  startNakshatra: number,
  startYoga: number,
  startKarana: number,
  startMoonSign: number,
  rahuByWd: Record<number, [string, string]>,
  gulikaByWd: Record<number, [string, string]>,
  yamagandaByWd: Record<number, [string, string]>,
): Record<string, DailyPanchangData> {
  const days = new Date(year, month, 0).getDate();
  const result: Record<string, DailyPanchangData> = {};

  for (let d = 1; d <= days; d++) {
    const idx = d - 1;
    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const wd = weekdayOf(dateStr);

    const tithiIdx = (startTithi + idx) % 30;
    const nakshatraIdx = (startNakshatra + Math.floor(idx * 0.85)) % 27;
    const yogaIdx = (startYoga + Math.floor(idx * 0.85)) % 27;
    const karanaIdx = (startKarana + idx * 2) % 11;
    const moonSignIdx = (startMoonSign + Math.floor(idx / 2.3)) % 12;

    const paksha: "Shukla" | "Krishna" = tithiIdx < 15 ? "Shukla" : "Krishna";

    const sr = sunrises[idx] ?? sunrises[sunrises.length - 1];
    const ss = sunsets[idx] ?? sunsets[sunsets.length - 1];
    const mr = moonrises[idx] ?? "06:00";
    const ms = moonsets[idx] ?? "18:00";
    const nextSr = sunrises[idx + 1] ?? addMinsToTime(sr, -1);

    const rahu = offsetTimes(rahuByWd[wd] ?? rahuByWd[0], 0);
    const gulika = offsetTimes(gulikaByWd[wd] ?? gulikaByWd[0], 0);
    const yama = offsetTimes(yamagandaByWd[wd] ?? yamagandaByWd[0], 0);

    result[dateStr] = {
      cityId,
      ...makeDay(
        dateStr,
        sr,
        ss,
        mr,
        ms,
        nextSr,
        tithiIdx,
        nakshatraIdx,
        yogaIdx,
        karanaIdx,
        moonSignIdx,
        rahu,
        gulika,
        yama,
        paksha,
      ),
    };
  }

  return result;
}

// ── City sunrise/sunset offsets (minutes relative to Delhi) ───────────────────
// Mumbai: +15 later sunrise, +5 later sunset
// Bangalore: +5 later sunrise, -5 earlier sunset
// Chennai: -20 earlier sunrise (farther east), -15 earlier sunset
// Kolkata: -35 earlier sunrise (most eastward), -30 earlier sunset

function shiftTimes(arr: string[], offset: number): string[] {
  return arr.map((t) => addMinsToTime(t, offset));
}

// ── May 2026 base data for Delhi ──────────────────────────────────────────────
// Sunrise: ~05:37 on May 1, decreasing → 05:24 on May 31
// Sunset: ~19:08 on May 1, increasing → 19:23 on May 31

const DELHI_MAY_SR = [
  "05:37",
  "05:36",
  "05:35",
  "05:35",
  "05:34",
  "05:33",
  "05:32",
  "05:32",
  "05:31",
  "05:30",
  "05:30",
  "05:29",
  "05:28",
  "05:28",
  "05:27",
  "05:27",
  "05:26",
  "05:25",
  "05:25",
  "05:25",
  "05:24",
  "05:24",
  "05:23",
  "05:23",
  "05:23",
  "05:22",
  "05:22",
  "05:22",
  "05:22",
  "05:22",
  "05:21",
];
const DELHI_MAY_SS = [
  "19:08",
  "19:08",
  "19:09",
  "19:10",
  "19:10",
  "19:11",
  "19:12",
  "19:12",
  "19:13",
  "19:14",
  "19:14",
  "19:15",
  "19:15",
  "19:16",
  "19:16",
  "19:17",
  "19:17",
  "19:18",
  "19:18",
  "19:19",
  "19:19",
  "19:20",
  "19:20",
  "19:21",
  "19:21",
  "19:21",
  "19:22",
  "19:22",
  "19:23",
  "19:23",
  "19:23",
];
const DELHI_MAY_MR = [
  "05:24",
  "06:18",
  "07:12",
  "08:06",
  "09:00",
  "09:54",
  "10:48",
  "11:42",
  "12:36",
  "13:30",
  "14:24",
  "15:18",
  "16:12",
  "17:06",
  "18:00",
  "18:54",
  "19:48",
  "20:42",
  "21:36",
  "22:30",
  "23:24",
  "00:18",
  "01:12",
  "02:06",
  "03:00",
  "03:54",
  "04:48",
  "05:42",
  "06:36",
  "07:30",
  "08:24",
];
const DELHI_MAY_MS = [
  "16:45",
  "17:39",
  "18:33",
  "19:27",
  "20:21",
  "21:15",
  "22:09",
  "23:03",
  "23:57",
  "00:51",
  "01:45",
  "02:39",
  "03:33",
  "04:27",
  "05:21",
  "06:15",
  "07:09",
  "08:03",
  "08:57",
  "09:51",
  "10:45",
  "11:39",
  "12:33",
  "13:27",
  "14:21",
  "15:15",
  "16:09",
  "17:03",
  "17:57",
  "18:51",
  "19:45",
];

// ── Export: Delhi April 2026 ──────────────────────────────────────────────────

export const DELHI_APRIL_2026: Record<string, DailyPanchangData> =
  buildMonthData(
    "delhi",
    2026,
    4,
    DELHI_APR_SR,
    DELHI_APR_SS,
    DELHI_APR_MR,
    DELHI_APR_MS,
    18,
    14,
    10,
    5,
    7,
    RAHU_KALAM_DELHI,
    GULIKA_DELHI,
    YAMAGANDA_DELHI,
  );

// ── Export: Delhi May 2026 ────────────────────────────────────────────────────

export const DELHI_MAY_2026: Record<string, DailyPanchangData> = buildMonthData(
  "delhi",
  2026,
  5,
  DELHI_MAY_SR,
  DELHI_MAY_SS,
  DELHI_MAY_MR,
  DELHI_MAY_MS,
  18,
  10,
  7,
  3,
  11,
  RAHU_KALAM_DELHI,
  GULIKA_DELHI,
  YAMAGANDA_DELHI,
);

// ── Mumbai (offset: SR+15, SS+5) ──────────────────────────────────────────────

const MUMBAI_RAHU: Record<number, [string, string]> = Object.fromEntries(
  Object.entries(RAHU_KALAM_DELHI).map(([wd, v]) => [wd, offsetTimes(v, 15)]),
) as Record<number, [string, string]>;
const MUMBAI_GULIKA: Record<number, [string, string]> = Object.fromEntries(
  Object.entries(GULIKA_DELHI).map(([wd, v]) => [wd, offsetTimes(v, 15)]),
) as Record<number, [string, string]>;
const MUMBAI_YAMA: Record<number, [string, string]> = Object.fromEntries(
  Object.entries(YAMAGANDA_DELHI).map(([wd, v]) => [wd, offsetTimes(v, 15)]),
) as Record<number, [string, string]>;

export const MUMBAI_APRIL_2026: Record<string, DailyPanchangData> =
  buildMonthData(
    "mumbai",
    2026,
    4,
    shiftTimes(DELHI_APR_SR, 15),
    shiftTimes(DELHI_APR_SS, 5),
    shiftTimes(DELHI_APR_MR, 10),
    shiftTimes(DELHI_APR_MS, 10),
    18,
    14,
    10,
    5,
    7,
    MUMBAI_RAHU,
    MUMBAI_GULIKA,
    MUMBAI_YAMA,
  );

export const MUMBAI_MAY_2026: Record<string, DailyPanchangData> =
  buildMonthData(
    "mumbai",
    2026,
    5,
    shiftTimes(DELHI_MAY_SR, 15),
    shiftTimes(DELHI_MAY_SS, 5),
    shiftTimes(DELHI_MAY_MR, 10),
    shiftTimes(DELHI_MAY_MS, 10),
    18,
    10,
    7,
    3,
    11,
    MUMBAI_RAHU,
    MUMBAI_GULIKA,
    MUMBAI_YAMA,
  );

// ── Bangalore (offset: SR+5, SS-5) ───────────────────────────────────────────

const BANG_RAHU: Record<number, [string, string]> = Object.fromEntries(
  Object.entries(RAHU_KALAM_DELHI).map(([wd, v]) => [wd, offsetTimes(v, 5)]),
) as Record<number, [string, string]>;
const BANG_GULIKA: Record<number, [string, string]> = Object.fromEntries(
  Object.entries(GULIKA_DELHI).map(([wd, v]) => [wd, offsetTimes(v, 5)]),
) as Record<number, [string, string]>;
const BANG_YAMA: Record<number, [string, string]> = Object.fromEntries(
  Object.entries(YAMAGANDA_DELHI).map(([wd, v]) => [wd, offsetTimes(v, 5)]),
) as Record<number, [string, string]>;

export const BANGALORE_APRIL_2026: Record<string, DailyPanchangData> =
  buildMonthData(
    "bangalore",
    2026,
    4,
    shiftTimes(DELHI_APR_SR, 5),
    shiftTimes(DELHI_APR_SS, -5),
    shiftTimes(DELHI_APR_MR, 5),
    shiftTimes(DELHI_APR_MS, 5),
    18,
    14,
    10,
    5,
    7,
    BANG_RAHU,
    BANG_GULIKA,
    BANG_YAMA,
  );

export const BANGALORE_MAY_2026: Record<string, DailyPanchangData> =
  buildMonthData(
    "bangalore",
    2026,
    5,
    shiftTimes(DELHI_MAY_SR, 5),
    shiftTimes(DELHI_MAY_SS, -5),
    shiftTimes(DELHI_MAY_MR, 5),
    shiftTimes(DELHI_MAY_MS, 5),
    18,
    10,
    7,
    3,
    11,
    BANG_RAHU,
    BANG_GULIKA,
    BANG_YAMA,
  );

// ── Chennai (offset: SR-20, SS-15) ────────────────────────────────────────────

const CHEN_RAHU: Record<number, [string, string]> = Object.fromEntries(
  Object.entries(RAHU_KALAM_DELHI).map(([wd, v]) => [wd, offsetTimes(v, -20)]),
) as Record<number, [string, string]>;
const CHEN_GULIKA: Record<number, [string, string]> = Object.fromEntries(
  Object.entries(GULIKA_DELHI).map(([wd, v]) => [wd, offsetTimes(v, -20)]),
) as Record<number, [string, string]>;
const CHEN_YAMA: Record<number, [string, string]> = Object.fromEntries(
  Object.entries(YAMAGANDA_DELHI).map(([wd, v]) => [wd, offsetTimes(v, -20)]),
) as Record<number, [string, string]>;

export const CHENNAI_APRIL_2026: Record<string, DailyPanchangData> =
  buildMonthData(
    "chennai",
    2026,
    4,
    shiftTimes(DELHI_APR_SR, -20),
    shiftTimes(DELHI_APR_SS, -15),
    shiftTimes(DELHI_APR_MR, -20),
    shiftTimes(DELHI_APR_MS, -20),
    18,
    14,
    10,
    5,
    7,
    CHEN_RAHU,
    CHEN_GULIKA,
    CHEN_YAMA,
  );

export const CHENNAI_MAY_2026: Record<string, DailyPanchangData> =
  buildMonthData(
    "chennai",
    2026,
    5,
    shiftTimes(DELHI_MAY_SR, -20),
    shiftTimes(DELHI_MAY_SS, -15),
    shiftTimes(DELHI_MAY_MR, -20),
    shiftTimes(DELHI_MAY_MS, -20),
    18,
    10,
    7,
    3,
    11,
    CHEN_RAHU,
    CHEN_GULIKA,
    CHEN_YAMA,
  );

// ── Kolkata (offset: SR-35, SS-30) ───────────────────────────────────────────

const KOLK_RAHU: Record<number, [string, string]> = Object.fromEntries(
  Object.entries(RAHU_KALAM_DELHI).map(([wd, v]) => [wd, offsetTimes(v, -35)]),
) as Record<number, [string, string]>;
const KOLK_GULIKA: Record<number, [string, string]> = Object.fromEntries(
  Object.entries(GULIKA_DELHI).map(([wd, v]) => [wd, offsetTimes(v, -35)]),
) as Record<number, [string, string]>;
const KOLK_YAMA: Record<number, [string, string]> = Object.fromEntries(
  Object.entries(YAMAGANDA_DELHI).map(([wd, v]) => [wd, offsetTimes(v, -35)]),
) as Record<number, [string, string]>;

export const KOLKATA_APRIL_2026: Record<string, DailyPanchangData> =
  buildMonthData(
    "kolkata",
    2026,
    4,
    shiftTimes(DELHI_APR_SR, -35),
    shiftTimes(DELHI_APR_SS, -30),
    shiftTimes(DELHI_APR_MR, -35),
    shiftTimes(DELHI_APR_MS, -35),
    18,
    14,
    10,
    5,
    7,
    KOLK_RAHU,
    KOLK_GULIKA,
    KOLK_YAMA,
  );

export const KOLKATA_MAY_2026: Record<string, DailyPanchangData> =
  buildMonthData(
    "kolkata",
    2026,
    5,
    shiftTimes(DELHI_MAY_SR, -35),
    shiftTimes(DELHI_MAY_SS, -30),
    shiftTimes(DELHI_MAY_MR, -35),
    shiftTimes(DELHI_MAY_MS, -35),
    18,
    10,
    7,
    3,
    11,
    KOLK_RAHU,
    KOLK_GULIKA,
    KOLK_YAMA,
  );

// ── All data index ─────────────────────────────────────────────────────────────

const ALL_DATA: Record<string, Record<string, DailyPanchangData>> = {
  delhi: { ...DELHI_APRIL_2026, ...DELHI_MAY_2026 },
  mumbai: { ...MUMBAI_APRIL_2026, ...MUMBAI_MAY_2026 },
  bangalore: { ...BANGALORE_APRIL_2026, ...BANGALORE_MAY_2026 },
  chennai: { ...CHENNAI_APRIL_2026, ...CHENNAI_MAY_2026 },
  kolkata: { ...KOLKATA_APRIL_2026, ...KOLKATA_MAY_2026 },
};

// Delhi reference longitude for offset calculations
const DELHI_LNG = 77.209;

/**
 * Compute panchang data for any city by applying a longitude-based time offset
 * to the Delhi base data. Each degree of longitude = 4 minutes of time.
 */
function computeCityPanchangData(
  cityId: string,
  date: Date,
): DailyPanchangData {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const dateStr = `${y}-${m}-${d}`;

  // Find city coordinates for offset calculation
  const city = CITIES.find((c) => c.id === cityId);
  const offsetMins = city ? Math.round((city.lng - DELHI_LNG) * 4) * -1 : 0;

  // Get Delhi base data for this date
  const delhiEntry = ALL_DATA.delhi?.[dateStr];

  if (delhiEntry) {
    // Apply longitude offset to all time fields
    return {
      ...delhiEntry,
      cityId,
      sunrise: addMinsToTime(delhiEntry.sunrise, offsetMins),
      sunset: addMinsToTime(delhiEntry.sunset, offsetMins),
      moonrise: addMinsToTime(delhiEntry.moonrise, offsetMins),
      moonset: addMinsToTime(delhiEntry.moonset, offsetMins),
      nextSunrise: addMinsToTime(delhiEntry.nextSunrise, offsetMins),
      rahuKalam: {
        start: addMinsToTime(delhiEntry.rahuKalam.start, offsetMins),
        end: addMinsToTime(delhiEntry.rahuKalam.end, offsetMins),
      },
      gulikaiKalam: {
        start: addMinsToTime(delhiEntry.gulikaiKalam.start, offsetMins),
        end: addMinsToTime(delhiEntry.gulikaiKalam.end, offsetMins),
      },
      yamaganda: {
        start: addMinsToTime(delhiEntry.yamaganda.start, offsetMins),
        end: addMinsToTime(delhiEntry.yamaganda.end, offsetMins),
      },
      abhijitMuhurat: {
        ...delhiEntry.abhijitMuhurat,
        start: addMinsToTime(delhiEntry.abhijitMuhurat.start, offsetMins),
        end: addMinsToTime(delhiEntry.abhijitMuhurat.end, offsetMins),
      },
      durMuhurtam1: {
        start: addMinsToTime(delhiEntry.durMuhurtam1.start, offsetMins),
        end: addMinsToTime(delhiEntry.durMuhurtam1.end, offsetMins),
      },
      durMuhurtam2: {
        start: addMinsToTime(delhiEntry.durMuhurtam2.start, offsetMins),
        end: addMinsToTime(delhiEntry.durMuhurtam2.end, offsetMins),
      },
      amritKalam: {
        start: addMinsToTime(delhiEntry.amritKalam.start, offsetMins),
        end: addMinsToTime(delhiEntry.amritKalam.end, offsetMins),
      },
      varjyam: {
        start: addMinsToTime(delhiEntry.varjyam.start, offsetMins),
        end: addMinsToTime(delhiEntry.varjyam.end, offsetMins),
      },
    };
  }

  // Build a default if even Delhi data is missing (date outside stored range)
  return buildDefault(cityId, date);
}

// ── Default fallback for missing dates ────────────────────────────────────────

function buildDefault(cityId: string, date: Date): DailyPanchangData {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const dateStr = `${y}-${m}-${d}`;
  const wd = date.getDay();
  const rahu = RAHU_KALAM_DELHI[wd] ?? ["12:00", "13:30"];
  const gulika = GULIKA_DELHI[wd] ?? ["10:30", "12:00"];
  const yama = YAMAGANDA_DELHI[wd] ?? ["09:00", "10:30"];
  return {
    cityId,
    ...makeDay(
      dateStr,
      "06:00",
      "18:30",
      "03:00",
      "14:00",
      "05:59",
      0,
      0,
      0,
      0,
      0,
      rahu,
      gulika,
      yama,
      "Shukla",
    ),
  };
}

/**
 * Returns a static representative panchang sample for a city.
 * Pre-defined illustrative data showing a typical spring Shukla Panchami.
 */
export function getStaticPanchangSample(cityId: string): DailyPanchangData {
  const city = CITIES.find((c) => c.id === cityId);
  const offsetMins = city ? Math.round((city.lng - DELHI_LNG) * 4) * -1 : 0;
  const sampleDate = "2026-05-03";
  const wd = new Date(sampleDate).getDay();
  const base = makeDay(
    sampleDate,
    addMinsToTime("06:05", offsetMins),
    addMinsToTime("18:52", offsetMins),
    addMinsToTime("09:30", offsetMins),
    addMinsToTime("22:10", offsetMins),
    addMinsToTime("06:04", offsetMins),
    4, // Panchami
    6, // Punarvasu nakshatra
    3, // Saubhagya yoga
    2, // Balava karana
    2, // Mithuna moon sign
    offsetTimes(RAHU_KALAM_DELHI[wd] ?? ["09:00", "10:30"], offsetMins),
    offsetTimes(GULIKA_DELHI[wd] ?? ["06:00", "07:30"], offsetMins),
    offsetTimes(YAMAGANDA_DELHI[wd] ?? ["13:30", "15:00"], offsetMins),
    "Shukla",
  );
  return { ...base, cityId, date: sampleDate };
}

/**
 * Look up pre-computed panchang data for a city and date.
 * For cities with pre-computed data, returns that directly.
 * For all other cities in the 33-city list, computes approximate data
 * by applying a longitude-based offset to Delhi's data.
 * Falls back to computed defaults if date is outside April–May 2026.
 */
export function getPanchangData(cityId: string, date: Date): DailyPanchangData {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const dateStr = `${y}-${m}-${d}`;

  // Check pre-computed city data first
  const cityData = ALL_DATA[cityId];
  if (cityData?.[dateStr]) return cityData[dateStr];

  // For any known city (in CITIES array), compute from Delhi offset
  const knownCity = CITIES.find((c) => c.id === cityId);
  if (knownCity) return computeCityPanchangData(cityId, date);

  // Ultimate fallback
  return buildDefault(cityId, date);
}
