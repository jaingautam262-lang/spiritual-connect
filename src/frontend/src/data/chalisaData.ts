export type { ChalisaItem } from "./chalisaData_1";

import { chalisaData_1a } from "./chalisaData_1";
import { chalisaData_2 } from "./chalisaData_2";
import { chalisaData_3 } from "./chalisaData_3";
import { chalisaData_4 } from "./chalisaData_4";
import { chalisaData_5 } from "./chalisaData_5";
import { SEED_NEW_CHALISAS_2 } from "./chalisaData_newBatch2";
import { SEED_NEW_CHALISAS_3 } from "./chalisaData_new_batch";

export { SEED_NEW_CHALISAS_2 } from "./chalisaData_newBatch2";
export { SEED_NEW_CHALISAS_3 } from "./chalisaData_new_batch";

export const SEED_CHALISAS = [
  ...chalisaData_1a,
  ...chalisaData_2,
  ...chalisaData_3,
  ...chalisaData_4,
  ...chalisaData_5,
  ...SEED_NEW_CHALISAS_2,
  ...SEED_NEW_CHALISAS_3,
];
