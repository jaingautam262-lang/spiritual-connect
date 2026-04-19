import { part20aStotras } from "./part20aStotras";
import { part20bStotras } from "./part20bStotras";
// Thin re-export — content split into part20aStotras.ts and part20bStotras.ts
import type { Stotra } from "./stotraData";

export { part20aStotras, part20bStotras };

export const part20Stotras: Stotra[] = [...part20aStotras, ...part20bStotras];
