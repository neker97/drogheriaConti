import React, { createContext, useContext, useState, ReactNode } from "react";

import en from "../config/index.en.json";
import it from "../config/index.it.json";

type LangType = "en" | "it";
const LANGUAGES = { en, it };

interface LanguageContextType {
  lang: LangType;
  setLang: (lang: LangType) => void;
  config: typeof en;
}
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<LangType>("it"); // default italiano
  const config = LANGUAGES[lang];
  return (
    <LanguageContext.Provider value={{ lang, setLang, config }}>
      {children}
    </LanguageContext.Provider>
  );
}
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
