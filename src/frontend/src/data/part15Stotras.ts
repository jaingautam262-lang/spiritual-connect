import { part15aStotras } from "./part15aStotras";
import { part15bStotras } from "./part15bStotras";
// Thin re-export — content split into part15aStotras.ts and part15bStotras.ts
import type { Stotra } from "./stotraData";

export { part15aStotras, part15bStotras };

export const part15Stotras: Stotra[] = [...part15aStotras, ...part15bStotras];
