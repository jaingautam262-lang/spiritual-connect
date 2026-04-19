import { part21aStotras } from "./part21aStotras";
import { part21bStotras } from "./part21bStotras";
// Thin re-export — content split into part21aStotras.ts and part21bStotras.ts
import type { Stotra } from "./stotraData";

export { part21aStotras, part21bStotras };

export const part21Stotras: Stotra[] = [...part21aStotras, ...part21bStotras];
