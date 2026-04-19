// useNumerology — Custom React hook for numerology calculations

import { useMemo } from "react";
import {
  calculateBhagyank,
  calculateChaldeanNameNumber,
  calculateMoolank,
} from "../utils/chaldeanNumerology";
import {
  analyzePlanes,
  buildGrid,
  extractLoShuNumbers,
  getNumberFrequency,
} from "../utils/loShuGrid";
import type { PlaneAnalysis } from "../utils/loShuGrid";
import type { BirthData } from "./useAstrology";

export type { PlaneAnalysis };

export interface NumerologyResult {
  mulank: number;
  bhagyank: number;
  nameNumber: number;
  personalYear: number;
  runningAge: number;
  loShuNumbers: number[];
  loShuGrid: number[][];
  planeAnalysis: PlaneAnalysis[];
  numberFrequency: Record<number, number>;
  missingNumbers: number[];
  karmicDebt: number[];
}

function calculatePersonalYear(dob: string): number {
  const currentYear = new Date().getFullYear();
  const [, month, day] = dob.split("-").map(Number);
  const sum =
    day
      .toString()
      .split("")
      .reduce((a, d) => a + Number(d), 0) +
    month
      .toString()
      .split("")
      .reduce((a, d) => a + Number(d), 0) +
    currentYear
      .toString()
      .split("")
      .reduce((a, d) => a + Number(d), 0);
  let n = sum;
  while (n > 9) {
    n = n
      .toString()
      .split("")
      .reduce((a, d) => a + Number(d), 0);
  }
  return n;
}

function calculateRunningAge(dob: string): number {
  const [year, month, day] = dob.split("-").map(Number);
  const birth = new Date(year, month - 1, day);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  if (
    now.getMonth() < birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())
  ) {
    age--;
  }
  return age;
}

function getMissingNumbers(loShuNumbers: number[]): number[] {
  const present = new Set(loShuNumbers);
  return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((n) => !present.has(n));
}

function getKarmicDebt(dob: string): number[] {
  const digits = dob
    .replace(/[^0-9]/g, "")
    .split("")
    .map(Number);
  const karmicNumbers = [13, 14, 16, 19];
  const sums: number[] = [];
  // Day sum
  const parts = dob.split("-");
  if (parts.length === 3) {
    const day = Number.parseInt(parts[2]);
    if (karmicNumbers.includes(day)) sums.push(day);
    const month = Number.parseInt(parts[1]);
    if (karmicNumbers.includes(month)) sums.push(month);
  }
  const fullSum = digits.reduce((a, b) => a + b, 0);
  if (karmicNumbers.includes(fullSum)) sums.push(fullSum);
  return [...new Set(sums)];
}

export function useNumerology(birthData: BirthData | null): NumerologyResult {
  return useMemo<NumerologyResult>(() => {
    const empty: NumerologyResult = {
      mulank: 0,
      bhagyank: 0,
      nameNumber: 0,
      personalYear: 0,
      runningAge: 0,
      loShuNumbers: [],
      loShuGrid: [],
      planeAnalysis: [],
      numberFrequency: {},
      missingNumbers: [],
      karmicDebt: [],
    };

    if (!birthData) return empty;

    try {
      const dob = birthData.dob; // YYYY-MM-DD
      const mulank = calculateMoolank(dob);
      const bhagyank = calculateBhagyank(dob);
      const nameNumber = birthData.name
        ? calculateChaldeanNameNumber(birthData.name)
        : 0;
      const personalYear = calculatePersonalYear(dob);
      const runningAge = calculateRunningAge(dob);
      const loShuNumbers = extractLoShuNumbers(dob);
      const loShuGrid = buildGrid(loShuNumbers);
      const planeAnalysis = analyzePlanes(loShuNumbers);
      const numberFrequency = getNumberFrequency(loShuNumbers);
      const missingNumbers = getMissingNumbers(loShuNumbers);
      const karmicDebt = getKarmicDebt(dob);

      return {
        mulank,
        bhagyank,
        nameNumber,
        personalYear,
        runningAge,
        loShuNumbers,
        loShuGrid,
        planeAnalysis,
        numberFrequency,
        missingNumbers,
        karmicDebt,
      };
    } catch {
      return empty;
    }
  }, [birthData]);
}
