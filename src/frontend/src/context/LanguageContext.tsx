/**
 * context/LanguageContext.tsx
 *
 * Re-exports everything from the canonical contexts/LanguageContext.tsx so
 * that both import paths work:
 *   import { useLanguage } from "@/context/LanguageContext"
 *   import { useLanguage } from "@/contexts/LanguageContext"
 *
 * The actual implementation lives in contexts/LanguageContext.tsx.
 */
export {
  LanguageProvider,
  useLanguage,
  translations,
  type Language,
  type ScriptMode,
} from "../contexts/LanguageContext";

// Convenience alias matching the requirements naming convention
export type { Language as LanguageKey } from "../contexts/LanguageContext";
