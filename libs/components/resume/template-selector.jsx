"use client";

import { useState } from "react";
import { template as defaultTemplate } from "./templates/default-1/template";
import { template as classicTemplate } from "./templates/classic/template";

export default function TemplateSelector({ onSelect }) {
  const [selected, setSelected] = useState("default");

  const templates = {
    default: defaultTemplate,
    classic: classicTemplate,
  };

  return (
    <div className="flex items-center gap-3 mb-4">
      <label className="font-medium text-sm text-slate-600">
        Select Template:
      </label>

      <select
        value={selected}
        onChange={(e) => {
          const key = e.target.value;
          setSelected(key);
          onSelect(templates[key]);
        }}
        className="border border-slate-300 rounded-md px-3 py-1 text-sm"
      >
        <option value="default">Default Template</option>
        <option value="classic">Classic Template</option>
      </select>
    </div>
  );
}
