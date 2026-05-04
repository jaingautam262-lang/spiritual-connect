export interface Kavach {
  id: string;
  name: string;
  deity: string;
  faith: string;
  benefits: string;
  text: string;
}

import { KAVACH_FINAL_DATA } from "./kavachDataFinal";
import { kavachData_A1 } from "./kavachData_A1";
import { kavachData_A2 } from "./kavachData_A2";
import { kavachData_A3 } from "./kavachData_A3";
import { kavachData_A4 } from "./kavachData_A4";

export const kavachDataA: Kavach[] = [
  ...kavachData_A1,
  ...kavachData_A2,
  ...kavachData_A3,
  ...kavachData_A4,
  ...KAVACH_FINAL_DATA,
];
