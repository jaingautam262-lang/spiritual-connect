/**
 * stotraData_batch2.ts — Part 5 Stotras (Batch 2)
 *
 * These 6 stotras live in stotraData.ts (canonical source) and are
 * re-exported here as stotraDataBatch2 for consumers that import by batch.
 *
 * Stotras included:
 *   1. Durga Saptashloki     (durga-saptashloki)
 *   2. Kaal Bhairav Ashtak   (kaal-bhairav-ashtak)
 *   3. Dwadash Jyotirlinga   (dwadash-jyotirlinga-stotram)
 *   4. Sankat Nashak Ganesh  (sankat-nashak-ganesh-stotra)
 *   5. Laxmi Narayan Stotra  (laxmi-narayan-stotra)
 *   6. Pitru Stotra          (pitru-stotra)
 */
import { stotraData } from "./stotraData";
import type { Stotra } from "./stotraData";

const BATCH2_IDS = new Set([
  "durga-saptashloki",
  "kaal-bhairav-ashtak",
  "dwadash-jyotirlinga-stotram",
  "sankat-nashak-ganesh-stotra",
  "laxmi-narayan-stotra",
  "pitru-stotra",
]);

export const stotraDataBatch2: Stotra[] = stotraData.filter((s) =>
  BATCH2_IDS.has(s.id),
);
