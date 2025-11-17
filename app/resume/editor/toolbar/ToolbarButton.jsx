"use client";

import clsx from "clsx";

export function ToolbarButton({
  icon,
  label,
  isActive = false,
  onClick,
  disabled = false,
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "inline-flex h-9 items-center justify-center rounded-md border border-transparent px-2 text-sm font-medium transition",
        isActive
          ? "bg-slate-900 text-white shadow"
          : "text-slate-700 hover:bg-slate-100",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      {icon ?? label}
    </button>
  );
}
