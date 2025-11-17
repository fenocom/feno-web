"use client";

import { useRef } from "react";

import { downloadAsJSON, readJSONFile } from "../renderer/downloadUtils.js";
import { RendererEngine } from "../renderer/RendererEngine.jsx";
import { useResumeContext } from "../context/ResumeContext.jsx";
import { usePDFExport } from "../hooks/usePDFExport.js";

export function Sidebar() {
  const fileInputRef = useRef(null);
  const exportPDF = usePDFExport();
  const { document, setDocument } = useResumeContext();

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const parsed = await readJSONFile(file);
      setDocument(parsed);
    } catch (error) {
      console.error("Failed to parse resume JSON", error);
    } finally {
      // reset input
      event.target.value = "";
    }
  };

  return (
    <aside className="mt-6 space-y-4">
      {/* <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
          Preview
        </p>
        <div className="mt-3 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
          <RendererEngine document={document} />
        </div>
      </div> */}
      <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
          Exports
        </p>
        <button
          type="button"
          className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          onClick={() => downloadAsJSON(document)}
        >
          Download JSON
        </button>
        <button
          type="button"
          className="w-full rounded-xl border border-slate-900 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white"
          onClick={() => exportPDF()}
        >
          Export PDF
        </button>
        <button
          type="button"
          className="w-full rounded-xl border border-dashed border-slate-300 px-4 py-2 text-sm text-slate-600 hover:border-slate-900"
          onClick={() => fileInputRef.current?.click()}
        >
          Upload JSON
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={handleUpload}
        />
      </div>
    </aside>
  );
}
