/**
 * useLanguage.ts
 * Convenience re-export of the language hook from LanguageContext.
 * Import from here OR from contexts/LanguageContext — both are identical.
 *
 * Exports:
 *  - useLanguage()  → { language, setLanguage, scriptMode, setScriptMode, t }
 *  - isHindi(lang)  → boolean helper
 *  - tBilingual(en, hi, lang) → picks correct string without context
 */
export { useLanguage } from "../contexts/LanguageContext";
export type { Language, ScriptMode } from "../contexts/LanguageContext";

import type { Language } from "../contexts/LanguageContext";

/** Returns true when the active language is Hindi */
export function isHindi(lang: Language): boolean {
  return lang === "hi";
}

/**
 * Pick between an English and Hindi string without needing React context.
 * Useful in data-transform functions outside component trees.
 */
export function tBilingual(en: string, hi: string, lang: Language): string {
  return lang === "hi" ? hi : en;
}
