"use client";

import { Suspense } from "react";

import { TemplateSelector } from "./components/TemplateSelector.jsx";
import { Sidebar } from "./components/Sidebar.jsx";
import { ResumeEditor } from "./editor/Editor.jsx";
import { ResumeProvider } from "./context/ResumeContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

function ResumeApp() {
  return (
    <ThemeProvider>
      <div className="flex flex-1 flex-col gap-6 md:flex-row">
        <div className="w-full md:w-80">
          <TemplateSelector />
          <Sidebar />
        </div>
        <div className="flex-1 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <ResumeEditor />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default function ResumePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center text-sm text-muted-foreground">
          Loading resume tools…
        </div>
      }
    >
      <ResumeProvider>
        <ResumeApp />
      </ResumeProvider>
    </Suspense>
  );
}
