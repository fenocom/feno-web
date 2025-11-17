"use client";

import { useCallback } from "react";

import { jsonToDOM } from "../renderer/jsonToDOM.js";
import { htmlToPDF } from "../renderer/htmlToPDF.js";
import { sanitizeHtml } from "../utils/sanitize.js";
import { useResumeContext } from "../context/ResumeContext.jsx";

export const usePDFExport = () => {
  const { document, selectedTheme } = useResumeContext();

  return useCallback(async () => {
    if (!document) return;
    const html = sanitizeHtml(jsonToDOM(document));
    await htmlToPDF({ html, fileName: `resume-${selectedTheme}.pdf` });
  }, [document, selectedTheme]);
};


