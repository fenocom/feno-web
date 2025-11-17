"use client";

import { useMemo } from "react";

import { jsonToDOM } from "../../renderer/jsonToDOM.js";
import { sanitizeHtml } from "../../utils/sanitize.js";

import "./modern.css";

export function ModernRenderer({ document }) {
  const renderedHtml = useMemo(() => {
    if (!document) return "";
    const html = jsonToDOM(document);
    return sanitizeHtml(html);
  }, [document]);

  return (
    <div
      className="resume-modern"
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
}
