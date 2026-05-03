// ── Panchang Type Definitions ────────────────────────────────────────────────

export interface PanchangCity {
  id: string;
  name: string;
  nameHi: string;
  lat: number;
  lng: number;
  timezone: string;
  offset: string; // e.g. "+5:30"
}

export interface TimeRange {
  start: string; // "HH:MM"
  end: string; // "HH:MM"
}

export interface TithiInfo {
  name: string;
  endTime: string;
}

export interface NakshatraInfo {
  name: string;
  endTime: string;
}

export interface YogaInfo {
  name: string;
  endTime: string;
}

export interface KaranaInfo {
  name: string;
  endTime: string;
}

export interface MoonSignInfo {
  name: string;
  endTime: string;
}

export interface AbhijitMuhuratInfo extends TimeRange {
  duration: string;
}

export interface DailyPanchangData {
  date: string; // "YYYY-MM-DD"
  cityId: string;
  sunrise: string; // "HH:MM"
  sunset: string; // "HH:MM"
  moonrise: string; // "HH:MM"
  moonset: string; // "HH:MM"
  nextSunrise: string; // "HH:MM" (next day, for night calculations)
  shakaSamvat: number;
  vikramSamvat: number;
  gujaratiSamvat: number;
  samvatsaraName: string;
  amantaMonth: string;
  purnimantaMonth: string;
  weekday: number; // 0=Sun … 6=Sat
  paksha: string; // "Shukla" | "Krishna"
  tithi: TithiInfo;
  nakshatra: NakshatraInfo;
  yoga: YogaInfo;
  karana1: KaranaInfo;
  karana2: KaranaInfo;
  sunSign: string;
  moonSign: MoonSignInfo;
  rahuKalam: TimeRange;
  gulikaiKalam: TimeRange;
  yamaganda: TimeRange;
  abhijitMuhurat: AbhijitMuhuratInfo;
  durMuhurtam1: TimeRange;
  durMuhurtam2: TimeRange;
  amritKalam: TimeRange;
  varjyam: TimeRange;
}

// ── Table Row Types ───────────────────────────────────────────────────────────

export interface ChoghadiyaSlot {
  name: string;
  type: "auspicious" | "inauspicious" | "neutral";
  start: string;
  end: string;
  isAuspicious: boolean;
  isInauspicious: boolean;
  isDay: boolean;
}

export interface HoraSlot {
  planet: string;
  character: string;
  start: string;
  end: string;
  isDay: boolean;
}

export interface LagnaSlot {
  rashi: string;
  start: string;
  end: string;
  pushkaraNavamshaTime: string;
}

export interface MuhuratSlot {
  name: string;
  quality: "good" | "bad" | "neutral";
  start: string;
  end: string;
  isDay: boolean;
}

export interface PanchakaSlot {
  type: string;
  start: string;
  end: string;
}

export interface JainPraharSlot {
  praharNumber: number; // 1–8
  isDay: boolean;
  start: string;
  end: string;
  keyMomentName: string;
  keyMomentTime: string;
}

export interface PanchaPakshiSubSlot {
  activity: string;
  quality: string;
  start: string;
  end: string;
}

export interface PanchaPakshiBlock {
  bird: string;
  activity: string;
  quality: string;
  start: string;
  end: string;
  isDay: boolean;
  subSlots: PanchaPakshiSubSlot[];
}

// ── Regional / Terminology ────────────────────────────────────────────────────

export interface RegionalTerminology {
  region: string;
  tithiNames: string[]; // 30 tithis (15 Shukla + 15 Krishna)
  nakshatraNames: string[]; // 27 nakshatras
  rashiNames: string[]; // 12 rashis
  weekdayNames: string[]; // 7 days
  pakshaNames: string[]; // [Shukla, Krishna]
  monthNames: string[]; // 12 months
}

// ── Festival ──────────────────────────────────────────────────────────────────

export interface FestivalEntry {
  date: string; // "YYYY-MM-DD"
  weekday: string;
  festivals: string[];
}

// ── Glossary ──────────────────────────────────────────────────────────────────

export interface GlossaryEntry {
  term: string;
  definition: string;
}

// ── Choghadiya / Hora quality helpers ────────────────────────────────────────

export interface ChoghadiyaQuality {
  isAuspicious: boolean;
  isInauspicious: boolean;
  color: string;
  description: string;
}

export interface HoraPlanetInfo {
  character: string;
  color: string;
}
