import { part18aStotras } from "./part18aStotras";
import { part18bStotras } from "./part18bStotras";
// Thin re-export — content split into part18aStotras.ts and part18bStotras.ts
import type { Stotra } from "./stotraData";

export { part18aStotras, part18bStotras };

export const part18Stotras: Stotra[] = [...part18aStotras, ...part18bStotras];
