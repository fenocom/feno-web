"use client";

import clsx from "clsx";

export function TemplateCard({ template, isActive, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(template.id)}
      className={clsx(
        "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition",
        isActive
          ? "border-slate-900 bg-slate-900 text-white"
          : "border-slate-200 bg-white hover:border-slate-900"
      )}
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-current">
          {template.name}
        </p>
        <p className={clsx("text-xs text-current/70")}>
          {template.description}
        </p>
      </div>
      <span className="text-xs">{isActive ? "Selected" : "Choose"}</span>
    </button>
  );
}
