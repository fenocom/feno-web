"use client";

import { createContext, useContext, useMemo } from "react";

import { templatesIndex, defaultTemplateId } from "../data/templatesIndex.js";
import { useResumeContext } from "./ResumeContext.jsx";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const { selectedTheme } = useResumeContext();
  const activeTheme =
    templatesIndex.find((template) => template.id === selectedTheme) ??
    templatesIndex[0];

  const value = useMemo(
    () => ({
      themeId: activeTheme?.id ?? defaultTemplateId,
      fonts: activeTheme?.fonts ?? {},
      colors: activeTheme?.colors ?? {},
      renderer: activeTheme?.renderer,
    }),
    [activeTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return context;
};
