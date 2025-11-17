import DOMPurify from "dompurify";

export const sanitizeHtml = (html) => {
  if (typeof window === "undefined") {
    return html ?? "";
  }

  return DOMPurify.sanitize(html ?? "", {
    ADD_ATTR: ["target", "rel", "style"],
    ADD_TAGS: ["section"],
  });
};


