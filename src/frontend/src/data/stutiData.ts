export interface Stuti {
  id: string;
  name: string;
  deity: string;
  faith: string;
  text: string;
  meaning: string;
  benefits: string;
  deityInfo: string;
}

import { STUTI_FINAL_DATA } from "./stutiDataFinal";
import { stutiData_1 } from "./stutiData_1";
import { stutiData_2 } from "./stutiData_2";
import { stutiData_3 } from "./stutiData_3";
import { stutiData_4 } from "./stutiData_4";
import { stutiData_5 } from "./stutiData_5";
import { stutiData_6 } from "./stutiData_6";
import { stutiData_7 } from "./stutiData_7";
import { stutiData_8 } from "./stutiData_8";
import { stutiData_9 } from "./stutiData_9";
import { stutiNewBatch } from "./stutiData_new_batch";

export const stutiData: Stuti[] = [
  ...stutiData_1,
  ...stutiData_2,
  ...stutiData_3,
  ...stutiData_4,
  ...stutiData_5,
  ...stutiData_6,
  ...stutiData_7,
  ...stutiData_8,
  ...stutiData_9,
  ...stutiNewBatch,
  ...STUTI_FINAL_DATA,
];
