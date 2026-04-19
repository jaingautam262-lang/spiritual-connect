// Split into part23aStotras.ts and part23bStotras.ts to fix deploy size limit.
// This file re-exports both for backward compatibility.
import { part23aStotras } from "./part23aStotras";
import { part23bStotras } from "./part23bStotras";

export const part23Stotras = [...part23aStotras, ...part23bStotras];
