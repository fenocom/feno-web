"use client";

import { useMemo } from "react";

import { templatesIndex } from "../data/templatesIndex.js";
import { useResumeContext } from "../context/ResumeContext.jsx";

export const useResumeThemes = () => {
  const { selectedTheme, setSelectedTheme } = useResumeContext();

  const themes = useMemo(
    () =>
      templatesIndex.map((template) => ({
        id: template.id,
        name: template.name,
        description: template.description,
        preview: template.preview,
      })),
    [],
  );

  return {
    themes,
    selectedTheme,
    setSelectedTheme,
  };
};


