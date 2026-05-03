import type {
  ChoghadiyaSlot,
  HoraSlot,
  JainPraharSlot,
  LagnaSlot,
  MuhuratSlot,
  PanchaPakshiBlock,
  PanchaPakshiSubSlot,
  PanchakaSlot,
} from "./panchangTypes";

import {
  CHOGHADIYA_DAY_ORDER,
  CHOGHADIYA_NIGHT_ORDER,
  CHOGHADIYA_QUALITY,
  DAY_MUHURATS,
  HORA_PLANET_CHARACTER,
  HORA_PLANET_ORDER,
  HORA_WEEKDAY_LORDS,
  LUNAR_MONTHS,
  NIGHT_MUHURATS,
  PANCHAKA_TYPES,
  PANCHA_PAKSHI_ACTIVITIES,
  PANCHA_PAKSHI_BIRDS,
  RASHIS,
  SAMVATSARAS,
} from "./panchangConstants";

// ── Time Utilities ────────────────────────────────────────────────────────────

/** Parse "HH:MM" → minutes since midnight */
export function parseTime(timeStr: string): number {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

/** Format minutes since midnight → "HH:MM" */
export function formatTime(minutes: number): string {
  const totalMins = ((minutes % 1440) + 1440) % 1440;
  const h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Add minutes to a "HH:MM" string */
export function addMinutes(timeStr: string, mins: number): string {
  return formatTime(parseTime(timeStr) + mins);
}

/** Current time in minutes since midnight */
export function getCurrentTimeMinutes(): number {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

/** Return "Xh Ym remaining" until endTimeStr */
export function getTimeRemaining(endTimeStr: string): string {
  const now = getCurrentTimeMinutes();
  let end = parseTime(endTimeStr);
  if (end < now) end += 1440; // next day
  const diff = end - now;
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

/** True if current time is within [startStr, endStr) */
export function isCurrentSlot(startStr: string, endStr: string): boolean {
  const now = getCurrentTimeMinutes();
  const start = parseTime(startStr);
  let end = parseTime(endStr);
  if (end < start) end += 1440; // crosses midnight
  if (end < start) return false;
  return now >= start && now < end;
}

// ── Choghadiya ────────────────────────────────────────────────────────────────

/**
 * Returns 16 Choghadiya slots (8 day + 8 night).
 * Day: sunrise → sunset divided into 8 equal parts.
 * Night: sunset → next sunrise divided into 8 equal parts.
 */
export function getChoghadiyaSlots(
  sunriseStr: string,
  sunsetStr: string,
  weekday: number,
): ChoghadiyaSlot[] {
  const sunriseMins = parseTime(sunriseStr);
  const sunsetMins = parseTime(sunsetStr);
  const nextSunriseMins = sunriseMins + 1440; // approximate: same time next day

  const dayDuration = sunsetMins - sunriseMins;
  const nightDuration = nextSunriseMins - sunsetMins;
  const daySlotLen = dayDuration / 8;
  const nightSlotLen = nightDuration / 8;

  const dayOrder = CHOGHADIYA_DAY_ORDER[weekday] ?? CHOGHADIYA_DAY_ORDER[0];
  const nightOrder =
    CHOGHADIYA_NIGHT_ORDER[weekday] ?? CHOGHADIYA_NIGHT_ORDER[0];

  const slots: ChoghadiyaSlot[] = [];

  for (let i = 0; i < 8; i++) {
    const name = dayOrder[i];
    const q = CHOGHADIYA_QUALITY[name] ?? {
      isAuspicious: false,
      isInauspicious: false,
    };
    slots.push({
      name,
      type: q.isAuspicious
        ? "auspicious"
        : q.isInauspicious
          ? "inauspicious"
          : "neutral",
      start: formatTime(sunriseMins + i * daySlotLen),
      end: formatTime(sunriseMins + (i + 1) * daySlotLen),
      isAuspicious: q.isAuspicious,
      isInauspicious: q.isInauspicious,
      isDay: true,
    });
  }

  for (let i = 0; i < 8; i++) {
    const name = nightOrder[i];
    const q = CHOGHADIYA_QUALITY[name] ?? {
      isAuspicious: false,
      isInauspicious: false,
    };
    slots.push({
      name,
      type: q.isAuspicious
        ? "auspicious"
        : q.isInauspicious
          ? "inauspicious"
          : "neutral",
      start: formatTime(sunsetMins + i * nightSlotLen),
      end: formatTime(sunsetMins + (i + 1) * nightSlotLen),
      isAuspicious: q.isAuspicious,
      isInauspicious: q.isInauspicious,
      isDay: false,
    });
  }

  return slots;
}

// ── Hora ───────────────────────────────────────────────────────────────────────

/**
 * Returns 24 Hora slots (12 day + 12 night).
 * First day hora = weekday lord; rotates through HORA_PLANET_ORDER.
 */
export function getHoraSlots(
  sunriseStr: string,
  sunsetStr: string,
  nextSunriseStr: string,
  weekday: number,
): HoraSlot[] {
  const sunriseMins = parseTime(sunriseStr);
  const sunsetMins = parseTime(sunsetStr);
  const nextSunriseMins = parseTime(nextSunriseStr) + 1440;

  const dayDuration = sunsetMins - sunriseMins;
  const nightDuration = nextSunriseMins - sunsetMins;
  const dayHoraLen = dayDuration / 12;
  const nightHoraLen = nightDuration / 12;

  const lordName = HORA_WEEKDAY_LORDS[weekday];
  const lordIdx = HORA_PLANET_ORDER.indexOf(lordName);

  const slots: HoraSlot[] = [];

  for (let i = 0; i < 12; i++) {
    const planet = HORA_PLANET_ORDER[(lordIdx + i) % 7];
    const info = HORA_PLANET_CHARACTER[planet] ?? { character: "", color: "" };
    slots.push({
      planet,
      character: info.character,
      start: formatTime(sunriseMins + i * dayHoraLen),
      end: formatTime(sunriseMins + (i + 1) * dayHoraLen),
      isDay: true,
    });
  }

  // Night: first night hora = planet 12 positions after lord
  for (let i = 0; i < 12; i++) {
    const planet = HORA_PLANET_ORDER[(lordIdx + 12 + i) % 7];
    const info = HORA_PLANET_CHARACTER[planet] ?? { character: "", color: "" };
    slots.push({
      planet,
      character: info.character,
      start: formatTime(sunsetMins + i * nightHoraLen),
      end: formatTime(sunsetMins + (i + 1) * nightHoraLen),
      isDay: false,
    });
  }

  return slots;
}

// ── Lagna ─────────────────────────────────────────────────────────────────────

/**
 * Returns 12 Lagna slots starting from sunrise.
 * Each rashi rises for ~2 hours. Pushkara Navamsha time = slot start + 40% of duration.
 */
export function getLagnaSlots(sunriseStr: string): LagnaSlot[] {
  const sunriseMins = parseTime(sunriseStr);
  // Average lagna duration is ~2h (1440/12 = 120 min), but varies.
  // We use simplified equal-duration approach: 120 min each.
  const slotLen = 120;

  return RASHIS.map((rashi, i) => {
    const start = sunriseMins + i * slotLen;
    const end = start + slotLen;
    const pushkara = start + Math.round(slotLen * 0.4);
    return {
      rashi,
      start: formatTime(start),
      end: formatTime(end),
      pushkaraNavamshaTime: formatTime(pushkara),
    };
  });
}

// ── Muhurat ───────────────────────────────────────────────────────────────────

/** Returns 15 equal day muhurat slots from sunrise → sunset */
export function getDayMuhuratSlots(
  sunriseStr: string,
  sunsetStr: string,
): MuhuratSlot[] {
  const sunriseMins = parseTime(sunriseStr);
  const sunsetMins = parseTime(sunsetStr);
  const slotLen = (sunsetMins - sunriseMins) / 15;

  return DAY_MUHURATS.map((m, i) => ({
    name: m.name,
    quality: m.quality,
    start: formatTime(sunriseMins + i * slotLen),
    end: formatTime(sunriseMins + (i + 1) * slotLen),
    isDay: true,
  }));
}

/** Returns 15 equal night muhurat slots from sunset → next sunrise */
export function getNightMuhuratSlots(
  sunsetStr: string,
  nextSunriseStr: string,
): MuhuratSlot[] {
  const sunsetMins = parseTime(sunsetStr);
  const nextSunriseMins = parseTime(nextSunriseStr) + 1440;
  const slotLen = (nextSunriseMins - sunsetMins) / 15;

  return NIGHT_MUHURATS.map((m, i) => ({
    name: m.name,
    quality: m.quality,
    start: formatTime(sunsetMins + i * slotLen),
    end: formatTime(sunsetMins + (i + 1) * slotLen),
    isDay: false,
  }));
}

// ── Abhijit Muhurat ────────────────────────────────────────────────────────────

/** Returns the Abhijit Muhurat: solar noon ± 26.5 minutes */
export function getAbhijitMuhurat(
  sunriseStr: string,
  sunsetStr: string,
): { start: string; end: string; duration: string } {
  const sunriseMins = parseTime(sunriseStr);
  const sunsetMins = parseTime(sunsetStr);
  const noon = (sunriseMins + sunsetMins) / 2;
  const start = noon - 26.5;
  const end = noon + 26.5;
  const dur = end - start;
  const durH = Math.floor(dur / 60);
  const durM = Math.round(dur % 60);
  return {
    start: formatTime(start),
    end: formatTime(end),
    duration: durH > 0 ? `${durH}h ${durM}m` : `${durM}m`,
  };
}

// ── Panchaka ───────────────────────────────────────────────────────────────────

/**
 * Returns Panchaka slots for the day.
 * Panchaka type is based on (tithiIndex + nakshatraIndex) mod 6, mapped to type.
 */
export function getPanchakaSlots(
  sunriseStr: string,
  sunsetStr: string,
  nextSunriseStr: string,
  tithiIndex: number,
  nakshatraIndex: number,
): PanchakaSlot[] {
  const keys = Object.keys(PANCHAKA_TYPES);
  const idx = (tithiIndex + nakshatraIndex) % keys.length;

  const sunriseMins = parseTime(sunriseStr);
  const sunsetMins = parseTime(sunsetStr);
  const nextSunriseMins = parseTime(nextSunriseStr) + 1440;

  // Day Panchaka
  const daySlotLen = (sunsetMins - sunriseMins) / 5;
  const nightSlotLen = (nextSunriseMins - sunsetMins) / 5;

  const slots: PanchakaSlot[] = [];
  for (let i = 0; i < 5; i++) {
    const t = keys[(idx + i) % keys.length];
    slots.push({
      type: t,
      start: formatTime(sunriseMins + i * daySlotLen),
      end: formatTime(sunriseMins + (i + 1) * daySlotLen),
    });
  }
  for (let i = 0; i < 5; i++) {
    const t = keys[(idx + 5 + i) % keys.length];
    slots.push({
      type: t,
      start: formatTime(sunsetMins + i * nightSlotLen),
      end: formatTime(sunsetMins + (i + 1) * nightSlotLen),
    });
  }
  return slots;
}

// ── Jain Prahar ────────────────────────────────────────────────────────────────

/**
 * Returns 8 Jain prahars with key spiritual moments.
 * Day prahars: 4 equal parts of daylight.
 * Night prahars: 4 equal parts of night.
 * Key moments: Navkarshi (+48min), Porshi (+3h), Sadha Porshi (+4.5h),
 *              Purimaddha (12:00), Avaddha (sunset-48min), Chovihar (sunset).
 */
export function getJainPraharSlots(
  sunriseStr: string,
  sunsetStr: string,
): JainPraharSlot[] {
  const sunriseMins = parseTime(sunriseStr);
  const sunsetMins = parseTime(sunsetStr);
  const nextSunriseMins = sunriseMins + 1440;

  const dayLen = sunsetMins - sunriseMins;
  const nightLen = nextSunriseMins - sunsetMins;
  const dayPraharLen = dayLen / 4;
  const nightPraharLen = nightLen / 4;

  const KEY_MOMENTS: Array<{ name: string; time: number }> = [
    { name: "Navkarshi", time: sunriseMins + 48 },
    { name: "Porshi", time: sunriseMins + 180 },
    { name: "Sadha Porshi", time: sunriseMins + 270 },
    { name: "Purimaddha", time: 720 },
    { name: "Avaddha", time: sunsetMins - 48 },
    { name: "Chovihar", time: sunsetMins },
    { name: "Ratri Porshi", time: sunsetMins + 180 },
    { name: "Ratri Pachkhan", time: nextSunriseMins - 48 },
  ];

  const slots: JainPraharSlot[] = [];
  for (let i = 0; i < 4; i++) {
    const start = sunriseMins + i * dayPraharLen;
    const end = start + dayPraharLen;
    const km = KEY_MOMENTS[i];
    slots.push({
      praharNumber: i + 1,
      isDay: true,
      start: formatTime(start),
      end: formatTime(end),
      keyMomentName: km?.name ?? "",
      keyMomentTime: km ? formatTime(km.time) : "",
    });
  }
  for (let i = 0; i < 4; i++) {
    const start = sunsetMins + i * nightPraharLen;
    const end = start + nightPraharLen;
    const km = KEY_MOMENTS[4 + i];
    slots.push({
      praharNumber: i + 5,
      isDay: false,
      start: formatTime(start),
      end: formatTime(end),
      keyMomentName: km?.name ?? "",
      keyMomentTime: km ? formatTime(km.time) : "",
    });
  }
  return slots;
}

// ── Pancha Pakshi ──────────────────────────────────────────────────────────────

/**
 * Returns 10 Pancha Pakshi blocks (5 day + 5 night), each ~2h39m for day.
 * Bird activities rotate cyclically starting from rulingBird.
 * Each block has 5 sub-slots of equal size, each assigned one activity.
 */
export function getPanchaPakshiBlocks(
  sunriseStr: string,
  sunsetStr: string,
  rulingBird: string,
): PanchaPakshiBlock[] {
  const sunriseMins = parseTime(sunriseStr);
  const sunsetMins = parseTime(sunsetStr);
  const nextSunriseMins = sunriseMins + 1440;

  const dayLen = sunsetMins - sunriseMins;
  const nightLen = nextSunriseMins - sunsetMins;
  const dayBlockLen = dayLen / 5;
  const nightBlockLen = nightLen / 5;

  const birdIdx = PANCHA_PAKSHI_BIRDS.indexOf(rulingBird);
  const validBirdIdx = birdIdx === -1 ? 0 : birdIdx;
  const activities = Object.keys(PANCHA_PAKSHI_ACTIVITIES);

  const blocks: PanchaPakshiBlock[] = [];

  const buildBlock = (
    idx: number,
    blockStart: number,
    blockLen: number,
    isDay: boolean,
  ): PanchaPakshiBlock => {
    const bird = PANCHA_PAKSHI_BIRDS[(validBirdIdx + idx) % 5];
    const primaryActivity = activities[idx % activities.length];
    const quality = PANCHA_PAKSHI_ACTIVITIES[primaryActivity] ?? "Average";
    const subSlotLen = blockLen / 5;

    const subSlots: PanchaPakshiSubSlot[] = activities.map((act, si) => ({
      activity: act,
      quality: PANCHA_PAKSHI_ACTIVITIES[act] ?? "Average",
      start: formatTime(blockStart + si * subSlotLen),
      end: formatTime(blockStart + (si + 1) * subSlotLen),
    }));

    return {
      bird,
      activity: primaryActivity,
      quality,
      start: formatTime(blockStart),
      end: formatTime(blockStart + blockLen),
      isDay,
      subSlots,
    };
  };

  for (let i = 0; i < 5; i++) {
    blocks.push(
      buildBlock(i, sunriseMins + i * dayBlockLen, dayBlockLen, true),
    );
  }
  for (let i = 0; i < 5; i++) {
    blocks.push(
      buildBlock(i + 5, sunsetMins + i * nightBlockLen, nightBlockLen, false),
    );
  }

  return blocks;
}

// ── Hindu Calendar Helpers ─────────────────────────────────────────────────────

/**
 * Returns current Hindu year info based on Gregorian date.
 * Shaka = Gregorian - 78 (after March 22).
 * Vikram = Gregorian + 57 (after Jan/Feb boundary).
 * Gujarati Vikram = Vikram (different new year month but same year count).
 * Samvatsara = (Vikram - 1) mod 60.
 */
export function getSamvatsaraYear(date?: Date): {
  shaka: number;
  vikram: number;
  gujarati: number;
  samvatsaraName: string;
} {
  const d = date ?? new Date();
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();

  const shaka = m > 3 || (m === 3 && day >= 22) ? y - 78 : y - 79;
  const vikram = m >= 11 ? y + 57 : y + 56;
  const gujarati = vikram;

  // 60-year Samvatsara cycle: Prabhava = year 1 of the cycle.
  // Approximate: (Vikram - 1) mod 60
  const samvatsaraIdx = (vikram - 1) % 60;
  const samvatsaraName = SAMVATSARAS[samvatsaraIdx] ?? "Prabhava";

  return { shaka, vikram, gujarati, samvatsaraName };
}

/**
 * Approximate Hindu date from Gregorian.
 * Uses simplified formula; accurate within ±1 day.
 */
export function getHinduDate(date: Date): {
  paksha: string;
  tithiIndex: number;
  month: string;
} {
  // Approximate synodic month: 29.53059 days
  // New moon reference: Jan 11 2024 at 11:57 IST (JD 2460320.0)
  const refDate = new Date("2024-01-11T06:27:00Z");
  const diffMs = date.getTime() - refDate.getTime();
  const diffDays = diffMs / 86_400_000;
  const synodicMonth = 29.53059;

  const moonAge = ((diffDays % synodicMonth) + synodicMonth) % synodicMonth;
  const tithiIndex = Math.floor((moonAge / synodicMonth) * 30);
  const paksha = tithiIndex < 15 ? "Shukla" : "Krishna";

  // Approximate lunar month from Gregorian month
  const gMonth = date.getMonth(); // 0-indexed
  // Chaitra ~ April, Vaishakha ~ May, etc. (offset by ~1 month)
  const lunarMonthIdx = (gMonth + 11) % 12;
  const month = LUNAR_MONTHS[lunarMonthIdx] ?? "Chaitra";

  return { paksha, tithiIndex, month };
}
