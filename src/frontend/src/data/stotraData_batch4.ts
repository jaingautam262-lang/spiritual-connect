/**
 * stotraData_batch4.ts — Batch 4 Stotras (Part 7)
 *
 * These stotras live in stotraData.ts (canonical source) and are
 * re-exported here as stotraDataBatch4 for consumers that import by batch.
 *
 * Stotras included:
 *   1. Devi Kavacham                       (devi-kavacham)
 *   2. Argala Stotram                      (argala-stotram)
 *   3. Keelakam (Atha Kilakam)             (keelakam-atha-kilakam)
 *   4. Dasha Ratha Krit Shani Stotra       (dasha-ratha-krit-shani-stotra)
 *   5. Shri Chitragupt Stuti               (shri-chitragupt-stuti)
 *   6. Bhaktamar Stotra (Jain)             (bhaktamar-stotra-jain)
 *   7. Uvasaggaharam Stotra (Jain)         (uvasaggaharam-stotra-jain)
 *   8. Namokar Stotra Extended Commentary  (namokar-stotra-extended-jain)
 */
import { stotraData } from "./stotraData";
import type { Stotra } from "./stotraData";

const BATCH4_IDS = new Set([
  "devi-kavacham",
  "argala-stotram",
  "keelakam-atha-kilakam",
  "dasha-ratha-krit-shani-stotra",
  "shri-chitragupt-stuti",
  "bhaktamar-stotra-jain",
  "uvasaggaharam-stotra-jain",
  "namokar-stotra-extended-jain",
]);

export const stotraDataBatch4: Stotra[] = stotraData.filter((s) =>
  BATCH4_IDS.has(s.id),
);
