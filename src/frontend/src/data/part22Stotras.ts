// Thin re-export — content split into part22aStotras.ts and part22bStotras.ts
export { part22aStotras } from "./part22aStotras";
export { part22bStotras } from "./part22bStotras";

import { part22aStotras } from "./part22aStotras";
import { part22bStotras } from "./part22bStotras";

export const part22Stotras = [...part22aStotras, ...part22bStotras];
