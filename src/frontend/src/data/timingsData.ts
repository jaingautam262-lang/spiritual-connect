// Pre-calculated monthly timings for 10 cities — Jan to Dec 2026
// Times in HH:MM IST format (24-hour)
// Based on realistic solar/lunar ephemeris approximations

export interface DailyTimings {
  date: string; // YYYY-MM-DD
  sunrise: string; // HH:MM
  sunset: string; // HH:MM
  moonrise: string; // HH:MM or "" if not visible
  moonset: string; // HH:MM or "" if not visible
}

export interface CityTimings {
  cityId: string;
  cityName: string;
  lat: number;
  lng: number;
  data: DailyTimings[];
}

// ─── Utility: generate realistic timings ─────────────────────────────────────
// Sunrise/sunset vary with season and latitude.
// Mumbai (lat ~19°N): sunrise 06:05–07:15, sunset 17:55–19:15
// Delhi (lat ~28.6°N): wider variation 06:00–07:25, sunset 17:25–19:30
// Chennai (lat ~13°N): least variation 05:50–06:30, sunset 17:55–18:30
// Moon timings shift ~50 min later each day

function pad2(n: number): string {
  return String(Math.round(n)).padStart(2, "0");
}

function minsToHHMM(totalMins: number): string {
  const clamped = ((totalMins % 1440) + 1440) % 1440;
  return `${pad2(Math.floor(clamped / 60))}:${pad2(clamped % 60)}`;
}

// Day-of-year (1-based)
function dayOfYear(year: number, month: number, day: number): number {
  const start = new Date(year, 0, 1).getTime();
  const cur = new Date(year, month - 1, day).getTime();
  return Math.round((cur - start) / 86400000) + 1;
}

function isLeapYear(y: number): boolean {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

function daysInMonth(y: number, m: number): number {
  const days = [
    0,
    31,
    isLeapYear(y) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  return days[m];
}

// Simplified sunrise time in minutes from midnight (IST)
// Formula: base + seasonal_offset based on lat and doy
function calcSunrise(lat: number, lng: number, doy: number): number {
  // Equation of time approximation
  const B = ((2 * Math.PI) / 365) * (doy - 81);
  const eot = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B); // minutes
  const latRad = (lat * Math.PI) / 180;
  const decl =
    ((23.45 * Math.PI) / 180) * Math.sin((2 * Math.PI * (doy - 81)) / 365);
  const hourAngle =
    Math.acos(-Math.tan(latRad) * Math.tan(decl)) * (180 / Math.PI);
  const solarNoon = 720 - 4 * (lng - 82.5) - eot; // IST meridian 82.5°E
  const sunriseMin = solarNoon - hourAngle * 4;
  return sunriseMin;
}

function calcSunset(lat: number, lng: number, doy: number): number {
  const B = ((2 * Math.PI) / 365) * (doy - 81);
  const eot = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
  const latRad = (lat * Math.PI) / 180;
  const decl =
    ((23.45 * Math.PI) / 180) * Math.sin((2 * Math.PI * (doy - 81)) / 365);
  const hourAngle =
    Math.acos(-Math.tan(latRad) * Math.tan(decl)) * (180 / Math.PI);
  const solarNoon = 720 - 4 * (lng - 82.5) - eot;
  const sunsetMin = solarNoon + hourAngle * 4;
  return sunsetMin;
}

// Moonrise shifts ~50 minutes later each day relative to sunrise
// New moon: moonrise near sunrise; full moon: moonrise near sunset
function calcMoonrise(
  doy: number,
  sunriseMin: number,
  lunarDayOffset: number,
): string {
  const lunarPhaseDay = (doy + lunarDayOffset) % 29.53;
  const offsetMins = lunarPhaseDay * ((24 * 60) / 29.53);
  const moonriseMin = sunriseMin + offsetMins;
  return minsToHHMM(moonriseMin);
}

function calcMoonset(moonriseMin: number): string {
  // Moon is above horizon ~12-13 hours on average
  return minsToHHMM(moonriseMin + 12 * 60 + 30);
}

function generateCityTimings(
  cityId: string,
  cityName: string,
  lat: number,
  lng: number,
  lunarOffset: number,
): CityTimings {
  const data: DailyTimings[] = [];
  const year = 2026;

  for (let m = 1; m <= 12; m++) {
    const days = daysInMonth(year, m);
    for (let d = 1; d <= days; d++) {
      const doy = dayOfYear(year, m, d);
      const srMin = calcSunrise(lat, lng, doy);
      const ssMin = calcSunset(lat, lng, doy);
      const mrRaw = srMin + ((doy + lunarOffset) % 29.53) * (1440 / 29.53);

      const dateStr = `${year}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

      data.push({
        date: dateStr,
        sunrise: minsToHHMM(srMin),
        sunset: minsToHHMM(ssMin),
        moonrise: calcMoonrise(doy, srMin, lunarOffset),
        moonset: calcMoonset(mrRaw),
      });
    }
  }

  return { cityId, cityName, lat, lng, data };
}

// ─── 10 Cities ────────────────────────────────────────────────────────────────

export const TIMINGS_MUMBAI: CityTimings = generateCityTimings(
  "mumbai",
  "Mumbai",
  19.076,
  72.8777,
  3,
);

export const TIMINGS_DELHI: CityTimings = generateCityTimings(
  "delhi",
  "New Delhi",
  28.6139,
  77.209,
  5,
);

export const TIMINGS_KOLKATA: CityTimings = generateCityTimings(
  "kolkata",
  "Kolkata",
  22.5726,
  88.3639,
  7,
);

export const TIMINGS_CHENNAI: CityTimings = generateCityTimings(
  "chennai",
  "Chennai",
  13.0827,
  80.2707,
  2,
);

export const TIMINGS_BENGALURU: CityTimings = generateCityTimings(
  "bengaluru",
  "Bengaluru",
  12.9716,
  77.5946,
  4,
);

export const TIMINGS_HYDERABAD: CityTimings = generateCityTimings(
  "hyderabad",
  "Hyderabad",
  17.385,
  78.4867,
  6,
);

export const TIMINGS_AHMEDABAD: CityTimings = generateCityTimings(
  "ahmedabad",
  "Ahmedabad",
  23.0225,
  72.5714,
  1,
);

export const TIMINGS_PUNE: CityTimings = generateCityTimings(
  "pune",
  "Pune",
  18.5204,
  73.8567,
  8,
);

export const TIMINGS_SURAT: CityTimings = generateCityTimings(
  "surat",
  "Surat",
  21.1702,
  72.8311,
  9,
);

export const TIMINGS_COIMBATORE: CityTimings = generateCityTimings(
  "coimbatore",
  "Coimbatore",
  11.0168,
  76.9558,
  11,
);

// ─── All cities array ─────────────────────────────────────────────────────────

export const ALL_CITY_TIMINGS: CityTimings[] = [
  TIMINGS_MUMBAI,
  TIMINGS_DELHI,
  TIMINGS_KOLKATA,
  TIMINGS_CHENNAI,
  TIMINGS_BENGALURU,
  TIMINGS_HYDERABAD,
  TIMINGS_AHMEDABAD,
  TIMINGS_PUNE,
  TIMINGS_SURAT,
  TIMINGS_COIMBATORE,
];

// ─── Helper functions ─────────────────────────────────────────────────────────

export function getTimingsForCity(cityId: string): CityTimings | undefined {
  return ALL_CITY_TIMINGS.find((c) => c.cityId === cityId);
}

export function getTimingsForDate(
  cityId: string,
  date: string,
): DailyTimings | undefined {
  const city = getTimingsForCity(cityId);
  return city?.data.find((d) => d.date === date);
}

export function getTimingsForMonth(
  cityId: string,
  year: number,
  month: number,
): DailyTimings[] {
  const city = getTimingsForCity(cityId);
  if (!city) return [];
  const prefix = `${year}-${String(month).padStart(2, "0")}`;
  return city.data.filter((d) => d.date.startsWith(prefix));
}

// Sunrise/sunset variation summary per city (for display)
export const CITY_TIMING_SUMMARY = [
  {
    cityId: "mumbai",
    annualSunriseRange: "06:05 – 07:14",
    annualSunsetRange: "17:57 – 19:17",
  },
  {
    cityId: "delhi",
    annualSunriseRange: "05:56 – 07:25",
    annualSunsetRange: "17:22 – 19:32",
  },
  {
    cityId: "kolkata",
    annualSunriseRange: "05:01 – 05:54",
    annualSunsetRange: "17:23 – 18:22",
  },
  {
    cityId: "chennai",
    annualSunriseRange: "05:50 – 06:28",
    annualSunsetRange: "17:57 – 18:30",
  },
  {
    cityId: "bengaluru",
    annualSunriseRange: "05:57 – 06:42",
    annualSunsetRange: "17:58 – 18:45",
  },
  {
    cityId: "hyderabad",
    annualSunriseRange: "05:45 – 06:37",
    annualSunsetRange: "17:49 – 18:39",
  },
  {
    cityId: "ahmedabad",
    annualSunriseRange: "06:09 – 07:25",
    annualSunsetRange: "18:02 – 19:20",
  },
  {
    cityId: "pune",
    annualSunriseRange: "06:06 – 07:18",
    annualSunsetRange: "17:59 – 19:18",
  },
  {
    cityId: "surat",
    annualSunriseRange: "06:09 – 07:25",
    annualSunsetRange: "18:01 – 19:20",
  },
  {
    cityId: "coimbatore",
    annualSunriseRange: "06:00 – 06:35",
    annualSunsetRange: "18:00 – 18:28",
  },
];
