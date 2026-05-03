/**
 * stotraData_parts57.ts
 *
 * All stotras from Parts 5, 6, and 7 collected into typed arrays.
 *
 * PART 5 stotras → stotraData.ts
 *   ✅ durga-saptashloki
 *   ✅ kaal-bhairav-ashtak
 *   ✅ dwadash-jyotirlinga-stotram
 *   ✅ sankat-nashak-ganesh-stotra
 *   ✅ laxmi-narayan-stotra
 *   ✅ pitru-stotra
 *
 * PART 6 stotras → part26Stotras.ts
 *   ✅ surya-raksha-ashtakam
 *   ✅ annapurna-ashtakam
 *   ✅ kalika-ashtakam
 *   ✅ lalita-sahasranama
 *   ✅ ganga-stotram
 *
 * PART 7 stotras → part15bStotras.ts + part12Stotras.ts + part13aStotras.ts
 *   ✅ devi-kavacham           — part15bStotras.ts
 *   ✅ argala-stotram          — part15bStotras.ts
 *   ✅ keelakam                — part15bStotras.ts
 *   ✅ dasha-ratha-krit-shani-stotra — part15bStotras.ts
 *   ✅ chitragupt-stuti        — part12Stotras.ts
 *   ✅ bhaktamar-stotra        — part13aStotras.ts (Jain)
 *   ✅ uvasaggaharam-stotra    — part13aStotras.ts (Jain)
 *   ✅ namokar-stotra-extended — part13aStotras.ts (Jain)
 */

import { part12Stotras } from "./part12Stotras";
import { part13aStotras } from "./part13aStotras";
import { part15bStotras } from "./part15bStotras";
import { part26Stotras } from "./part26Stotras";
import { stotraData } from "./stotraData";
import type { Stotra } from "./stotraData";

/** IDs of the 6 Part-5 stotras living in stotraData */
const PART5_IDS = new Set([
  "durga-saptashloki",
  "kaal-bhairav-ashtak",
  "dwadash-jyotirlinga-stotram",
  "sankat-nashak-ganesh-stotra",
  "laxmi-narayan-stotra",
  "pitru-stotra",
]);

/** IDs of the 5 Part-6 stotras living in part26Stotras */
const PART6_IDS = new Set([
  "surya-raksha-ashtakam",
  "annapurna-ashtakam",
  "kalika-ashtakam",
  "lalita-sahasranama",
  "ganga-stotram",
]);

/** IDs of Part-7 stotras in part15bStotras */
const PART7_PART15B_IDS = new Set([
  "devi-kavacham",
  "argala-stotram",
  "keelakam",
  "dasha-ratha-krit-shani-stotra",
]);

/** IDs of Part-7 stotras in part12Stotras */
const PART7_PART12_IDS = new Set(["chitragupt-stuti"]);

/** IDs of Part-7 stotras in part13aStotras (Jain) */
const PART7_PART13A_IDS = new Set([
  "bhaktamar-stotra",
  "uvasaggaharam-stotra",
  "namokar-stotra-extended",
]);

/** All 6 Part-5 stotras extracted from the main stotraData array */
export const part5Stotras: Stotra[] = stotraData.filter((s) =>
  PART5_IDS.has(s.id),
);

/** All 5 Part-6 stotras extracted from part26Stotras */
export const part6Stotras: Stotra[] = part26Stotras.filter((s) =>
  PART6_IDS.has(s.id),
);

/** All Part-7 stotras collected from their canonical source files */
export const part7Stotras: Stotra[] = [
  // Devi Kavacham, Argala, Keelakam, Dasha Ratha Shani from part15b
  ...(part15bStotras as Stotra[]).filter((s) => PART7_PART15B_IDS.has(s.id)),
  // Chitragupt Stuti from part12
  ...(part12Stotras as Stotra[]).filter((s) => PART7_PART12_IDS.has(s.id)),
  // Bhaktamar, Uvasaggaharam, Namokar Extended (Jain) from part13a
  ...(part13aStotras as Stotra[]).filter((s) => PART7_PART13A_IDS.has(s.id)),
].filter(
  (s, idx, arr) => arr.findIndex((x) => x.id === s.id) === idx, // deduplicate
);

/** Complete Parts 5-7 stotras combined */
export const stotraParts57: Stotra[] = [
  ...part5Stotras,
  ...part6Stotras,
  ...part7Stotras,
];

export type { Stotra };
