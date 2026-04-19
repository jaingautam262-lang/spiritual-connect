import { part17aStotras } from "./part17aStotras";
import { part17bStotras } from "./part17bStotras";
// Thin re-export — content split into part17aStotras.ts and part17bStotras.ts
import type { Stotra } from "./stotraData";

export { part17aStotras, part17bStotras };

export const part17Stotras: Stotra[] = [...part17aStotras, ...part17bStotras];
