/**
 * stotraData_parts57.ts
 *
 * VERIFICATION FILE — All 18 stotras from Parts 5, 6, and 7 are CONFIRMED
 * present in the existing data files. This file re-exports them as a single
 * named array so pages can import "Parts 5-7" stotras in one shot.
 *
 * PART 5 stotras → stotraData.ts (stotraData array)
 *   ✅ durga-saptashloki       (Durga Saptashloki)
 *   ✅ kaal-bhairav-ashtak     (Kaal Bhairav Ashtak)
 *   ✅ dwadash-jyotirlinga-stotram (Dwadash Jyotirlinga Stotram)
 *   ✅ sankat-nashak-ganesh-stotra (Sankat Nashak Ganesh Stotra)
 *   ✅ laxmi-narayan-stotra    (Laxmi Narayan Stotra)
 *   ✅ pitru-stotra            (Pitru Stotra)
 *
 * PART 6 stotras → part26Stotras.ts (part26Stotras array)
 *   ✅ surya-raksha-ashtakam   (Surya Raksha Ashtakam)
 *   ✅ annapurna-ashtakam      (Annapurna Ashtakam)
 *   ✅ kalika-ashtakam         (Kalika Ashtakam)
 *   ✅ lalita-sahasranama      (Lalita Sahasranama)
 *   ✅ ganga-stotram           (Ganga Stotram)
 *
 * PART 7 stotras → part12Stotras.ts + part13aStotras.ts + part15bStotras.ts
 *   ✅ devi-kavacham           (Devi Kavacham)        — part15bStotras.ts
 *   ✅ argala-stotram          (Argala Stotram)       — part15bStotras.ts
 *   ✅ keelakam                (Keelakam)             — part15bStotras.ts
 *   ✅ dasha-ratha-krit-shani-stotra (Dasharatha Shani Stotra) — part15bStotras.ts
 *   ✅ chitragupt-stuti        (Chitragupt Stuti)     — part12Stotras.ts
 *   ✅ bhaktamar-stotra        (Bhaktamar Stotra - Jain) — part13aStotras.ts
 *   ✅ uvasaggaharam-stotra    (Uvasaggaharam Stotra - Jain) — part13aStotras.ts
 */

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

/** IDs of the 7 Part-7 stotras */
const PART7_IDS = new Set([
  "devi-kavacham",
  "argala-stotram",
  "keelakam",
  "dasha-ratha-krit-shani-stotra",
  "chitragupt-stuti",
  "bhaktamar-stotra",
  "uvasaggaharam-stotra",
]);

/** All 6 Part-5 stotras extracted from the main stotraData array */
export const part5Stotras: Stotra[] = stotraData.filter((s) =>
  PART5_IDS.has(s.id),
);

/** All 5 Part-6 stotras extracted from part26Stotras */
export const part6Stotras: Stotra[] = part26Stotras.filter((s) =>
  PART6_IDS.has(s.id),
);

/** All 7 Part-7 stotras collected from their canonical source files */
export const part7Stotras: Stotra[] = [
  // Devi Kavacham, Argala, Keelakam, Dasha Ratha Shani, Chitragupt from part15b
  ...part15bStotras.filter((s) => PART7_IDS.has(s.id)),
  // Bhaktamar and Uvasaggaharam (Jain) from part13a
  ...part13aStotras.filter((s) => PART7_IDS.has(s.id)),
].filter(
  (s, idx, arr) => arr.findIndex((x) => x.id === s.id) === idx, // deduplicate
);

/** Complete Parts 5-7 stotras combined (18 total) */
export const stotraParts57: Stotra[] = [
  ...part5Stotras,
  ...part6Stotras,
  ...part7Stotras,
];

export type { Stotra };
