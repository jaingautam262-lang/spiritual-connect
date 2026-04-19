// Split into part24aStotras.ts and part24bStotras.ts to fix deploy size limit.
// This file re-exports both for backward compatibility.
import { part24aStotras } from "./part24aStotras";
import { part24bStotras } from "./part24bStotras";

export const part24Stotras = [...part24aStotras, ...part24bStotras];
