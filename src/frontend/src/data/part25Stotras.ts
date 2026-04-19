import { part25aStotras } from "./part25aStotras";
import { part25bStotras } from "./part25bStotras";
// Thin re-export — content split into part25aStotras.ts and part25bStotras.ts
import type { Stotra } from "./stotraData";

export { part25aStotras, part25bStotras };

export const part25Stotras: Stotra[] = [...part25aStotras, ...part25bStotras];
