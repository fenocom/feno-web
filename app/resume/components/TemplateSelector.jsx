"use client";

import { useResumeThemes } from "../hooks/useResumeThemes.js";
import { TemplateCard } from "./TemplateCard.jsx";

export function TemplateSelector() {
  const { themes, selectedTheme, setSelectedTheme } = useResumeThemes();

  return (
    <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
          Templates
        </p>
        <h2 className="text-lg font-semibold text-slate-900">Choose a theme</h2>
      </div>
      <div className="space-y-2">
        {themes.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isActive={template.id === selectedTheme}
            onSelect={setSelectedTheme}
          />
        ))}
      </div>
    </div>
  );
}
