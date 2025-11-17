"use client";

import { useMemo } from "react";

import { useResumeContext } from "../context/ResumeContext.jsx";
import { useThemeContext } from "../context/ThemeContext.jsx";

export function RendererEngine() {
  const { document } = useResumeContext();
  const { renderer: ActiveRenderer } = useThemeContext();

  const memoized = useMemo(() => ({ document }), [document]);

  if (!ActiveRenderer) return null;

  return <ActiveRenderer {...memoized} />;
}
