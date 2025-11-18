// app/context/ThemeContext.jsx
"use client";

import { createContext, useContext, useEffect, useMemo } from "react";
import { templatesIndex, defaultTemplateId } from "../data/templates-index.js";
import { useResumeContext } from "./ResumeContext.jsx";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const { selectedTheme } = useResumeContext();

  const activeTemplate =
    templatesIndex.find((t) => t.id === selectedTheme) ||
    templatesIndex.find((t) => t.id === defaultTemplateId) ||
    templatesIndex[0];

  // provide only themeId and colors + helpers
  const value = useMemo(() => {
    return {
      themeId: activeTemplate?.id,
      setThemeId: null, // set by ResumeContext via setSelectedTheme
      // default palette (can be overridden by user)
      colors: activeTemplate?.defaultColors ?? {
        primary: "#007BFF",
        secondary: "#6C757D",
      },
      cssPath: activeTemplate?.css, // path to template-specific CSS
      preview: activeTemplate?.preview,
    };
  }, [activeTemplate]);

  // apply template CSS (add <link>) and CSS variables
  useEffect(() => {
    if (!activeTemplate?.css) return;
    // attach <link> tag (avoid duplicates)
    const id = `template-css-${activeTemplate.id}`;
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = activeTemplate.css;
      document.head.appendChild(link);
    }
    // set CSS variables for colors from templatesIndex default
    const vars = activeTemplate.defaultColors || {};
    Object.entries(vars).forEach(([k, v]) => {
      document.documentElement.style.setProperty(`--color-${k}`, v);
    });

    return () => {
      // optional cleanup if you want to remove CSS on theme change:
      // const el = document.getElementById(id); el?.remove();
    };
  }, [activeTemplate]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error("useThemeContext must be used within ThemeProvider");
  return ctx;
};
