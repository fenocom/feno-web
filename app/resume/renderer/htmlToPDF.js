const sheetStyles = `
body {
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  margin: 0;
  padding: 24px;
  background: #f3f4f6;
  color: #0f172a;
}
@page {
  size: A4;
  margin: 0;
}
.resume-sheet {
  width: 210mm;
  min-height: 297mm;
  margin: 0 auto;
  padding: 36mm 30mm;
  background: #fff;
  border-radius: 24px;
  box-shadow: none;
}
.resume-sheet h1 {
  font-size: 32px;
  margin-bottom: 4px;
  color: #0f172a;
}
.resume-sheet h2 {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: #6366f1;
  margin-bottom: 12px;
}
.resume-sheet section {
  margin-top: 22px;
}
.section-title {
  font-size: 11px;
  letter-spacing: 0.2em;
  color: #94a3b8;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.summary {
  font-size: 14px;
  line-height: 1.7;
  color: #475569;
}
.experience-card {
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 14px;
  margin-bottom: 14px;
}
.experience-card:last-child {
  border-bottom: none;
  margin-bottom: 0;
}
.experience-card h3 {
  margin: 0 0 4px;
  font-size: 16px;
}
.experience-card .metadata {
  font-size: 13px;
  color: #64748b;
  margin-bottom: 6px;
}
ul {
  padding-left: 18px;
  margin: 0;
}
li {
  margin-bottom: 6px;
}
.resume-sheet .skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  list-style: none;
}
.resume-sheet .skills-list li {
  margin: 0;
  padding: 6px 14px;
  background: #f1f5f9;
  border-radius: 999px;
  font-size: 12px;
}
`;

export const htmlToPDF = async ({ html, fileName = "resume.pdf" }) => {
  if (typeof window === "undefined") return;

  const printable = window.open("", "_blank", "noopener,noreferrer,width=1024,height=768");
  if (!printable) return;

  const sheetMarkup = `<div class="resume-sheet">${html}</div>`;

  printable.document.write(
    `<html><head><title>${fileName}</title><style>${sheetStyles}</style></head><body>${sheetMarkup}</body></html>`,
  );
  printable.document.close();
  printable.focus();
  printable.print();
};


