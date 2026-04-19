export type { StotraEntry } from "./part13aStotras";
export { part13aStotras } from "./part13aStotras";
export { part13bStotras } from "./part13bStotras";

import { part13aStotras } from "./part13aStotras";
import { part13bStotras } from "./part13bStotras";

export const part13Stotras = [...part13aStotras, ...part13bStotras];
