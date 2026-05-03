import { ashtakamData_A1 } from "./ashtakamData_A1";
import { ashtakamData_A2 } from "./ashtakamData_A2";
import { ashtakamData_A3 } from "./ashtakamData_A3";
import { ashtakamData_A4 } from "./ashtakamData_A4";
import { ashtakamData_A5 } from "./ashtakamData_A5";
import { ashtakamData_A6 } from "./ashtakamData_A6";
import { ashtakamData_A7 } from "./ashtakamData_A7";
import { ashtakamData_A8 } from "./ashtakamData_A8";

export interface Ashtakam {
  id: string;
  name: string;
  deity: string;
  deityInfo: string;
  benefits: string;
  meaning: string;
  text: string;
}

export const ashtakamDataA: Ashtakam[] = [
  ...ashtakamData_A1,
  ...ashtakamData_A2,
  ...ashtakamData_A3,
  ...ashtakamData_A4,
  ...ashtakamData_A5,
  ...ashtakamData_A6,
  ...ashtakamData_A7,
  ...ashtakamData_A8,
];
