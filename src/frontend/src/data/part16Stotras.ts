import { part16aStotras } from "./part16aStotras";
import { part16bStotras } from "./part16bStotras";
// Thin re-export — content split into part16aStotras.ts and part16bStotras.ts
import type { Stotra } from "./stotraData";

export { part16aStotras, part16bStotras };

export const part16Stotras: Stotra[] = [...part16aStotras, ...part16bStotras];
