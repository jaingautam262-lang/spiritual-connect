// useAstrology — Custom React hook for Vedic astrology calculations

import { useMemo } from "react";
import {
  calculateAllDivisionalCharts,
  calculateAshtakvarga,
  calculateAstroScore,
  calculateAvkahada,
  calculateDashaBalance,
  calculateHouseCusps,
  calculateJulianDay,
  calculateLagna,
  calculateNavamsa,
  calculateShadowPlanets,
  calculateSiderealPositions,
  calculateVimshottariDasha,
} from "../utils/vedicAstrology";
import type {
  AshtakvargaTable,
  AvkahadaData,
  DashaBalance,
  DivisionalCharts,
  HouseCusp,
  MahaDasha,
  PlanetData,
  PlanetPositions,
  ShadowPlanetData,
} from "../utils/vedicAstrology";

export type {
  PlanetPositions,
  PlanetData,
  AvkahadaData,
  DashaBalance,
  MahaDasha,
  ShadowPlanetData,
  HouseCusp,
  DivisionalCharts,
  AshtakvargaTable,
};

export interface BirthData {
  name: string;
  dob: string; // YYYY-MM-DD
  tob: string; // HH:MM
  pob: string;
  latitude: number;
  longitude: number;
  gender: "M" | "F" | "O";
}

export interface AstrologyResult {
  planetPositions: PlanetPositions | null;
  lagna: PlanetData | null;
  avkahada: AvkahadaData | null;
  dashaBalance: DashaBalance | null;
  mahadashas: MahaDasha[];
  shadowPlanets: ShadowPlanetData | null;
  houseCusps: HouseCusp[];
  navamsa: Record<string, { sign: number }>;
  ashtakvarga: AshtakvargaTable | null;
  allDivisionalCharts: DivisionalCharts | null;
  astroScore: number;
  isCalculating: boolean;
  error: string | null;
}

export function useAstrology(birthData: BirthData | null): AstrologyResult {
  return useMemo<AstrologyResult>(() => {
    if (!birthData) {
      return {
        planetPositions: null,
        lagna: null,
        avkahada: null,
        dashaBalance: null,
        mahadashas: [],
        shadowPlanets: null,
        houseCusps: [],
        navamsa: {},
        ashtakvarga: null,
        allDivisionalCharts: null,
        astroScore: 0,
        isCalculating: false,
        error: null,
      };
    }

    try {
      const [year, month, day] = birthData.dob.split("-").map(Number);
      const [hour, minute] = birthData.tob.split(":").map(Number);
      const jd = calculateJulianDay(
        year,
        month,
        day,
        hour || 0,
        minute || 0,
        0,
      );

      const lagna = calculateLagna(jd, birthData.latitude, birthData.longitude);
      const planetPositions = calculateSiderealPositions(
        jd,
        birthData.latitude,
        birthData.longitude,
      );

      const moonNakshatra = planetPositions.Moon.nakshatra;
      const moonLongInNakshatra = planetPositions.Moon.longitude % (360 / 27);
      const avkahada = calculateAvkahada(
        moonNakshatra,
        planetPositions.Moon.pada,
        lagna.sign,
      );
      const birthDate = new Date(year, month - 1, day);
      const dashaBalance = calculateDashaBalance(
        moonNakshatra,
        moonLongInNakshatra,
        birthDate,
      );
      const mahadashas = calculateVimshottariDasha(
        birthDate,
        moonNakshatra,
        moonLongInNakshatra,
      );
      const shadowPlanets = calculateShadowPlanets(jd, lagna.longitude);
      const houseCusps = calculateHouseCusps(lagna.longitude);

      const planetNames = [
        "Sun",
        "Moon",
        "Mars",
        "Mercury",
        "Jupiter",
        "Venus",
        "Saturn",
        "Rahu",
        "Ketu",
      ] as const;
      const navamsa: Record<string, { sign: number }> = {};
      for (const p of planetNames) {
        navamsa[p] = calculateNavamsa(planetPositions[p].longitude);
      }

      const ashtakvarga = calculateAshtakvarga(planetPositions);
      const allDivisionalCharts = calculateAllDivisionalCharts(planetPositions);
      const currentDashaLord =
        mahadashas.find((d) => {
          const now = new Date();
          return d.startDate <= now && d.endDate >= now;
        })?.lord || dashaBalance.lord;
      const astroScore = calculateAstroScore(
        planetPositions,
        avkahada,
        currentDashaLord,
      );

      return {
        planetPositions,
        lagna,
        avkahada,
        dashaBalance,
        mahadashas,
        shadowPlanets,
        houseCusps,
        navamsa,
        ashtakvarga,
        allDivisionalCharts,
        astroScore,
        isCalculating: false,
        error: null,
      };
    } catch (err) {
      return {
        planetPositions: null,
        lagna: null,
        avkahada: null,
        dashaBalance: null,
        mahadashas: [],
        shadowPlanets: null,
        houseCusps: [],
        navamsa: {},
        ashtakvarga: null,
        allDivisionalCharts: null,
        astroScore: 0,
        isCalculating: false,
        error: err instanceof Error ? err.message : "Calculation error",
      };
    }
  }, [birthData]);
}
