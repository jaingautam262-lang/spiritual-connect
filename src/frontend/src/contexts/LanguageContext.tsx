import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Language = "hi" | "en";
export type ScriptMode = "devanagari" | "transliteration" | "english";

interface LanguageContextType {
  language: Language;
  scriptMode: ScriptMode;
  setLanguage: (lang: Language) => void;
  setScriptMode: (mode: ScriptMode) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "hi",
  scriptMode: "devanagari",
  setLanguage: () => {},
  setScriptMode: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      return (localStorage.getItem("sc-language") as Language) || "hi";
    } catch {
      return "hi";
    }
  });

  const [scriptMode, setScriptModeState] = useState<ScriptMode>(() => {
    try {
      return (localStorage.getItem("sc-script") as ScriptMode) || "devanagari";
    } catch {
      return "devanagari";
    }
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("sc-language", lang);
    } catch {}
  }, []);

  const setScriptMode = useCallback((mode: ScriptMode) => {
    setScriptModeState(mode);
    try {
      localStorage.setItem("sc-script", mode);
    } catch {}
  }, []);

  // Apply font class on <html> for global Devanagari support
  useEffect(() => {
    document.documentElement.setAttribute("data-language", language);
    document.documentElement.setAttribute("data-script", scriptMode);
  }, [language, scriptMode]);

  return (
    <LanguageContext.Provider
      value={{ language, scriptMode, setLanguage, setScriptMode }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
