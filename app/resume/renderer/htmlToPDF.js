export const htmlToPDF = async ({ html, fileName = "resume.pdf" }) => {
  if (typeof window === "undefined") return;

  const printable = window.open("", "_blank", "noopener,noreferrer,width=1024,height=768");
  if (!printable) return;

  printable.document.write(
    `<html><head><title>${fileName}</title><style>body{font-family:Inter,system-ui,sans-serif;margin:0;padding:48px;background:#f8fafc;} @page { margin: 24px; }</style></head><body>${html}</body></html>`,
  );
  printable.document.close();
  printable.focus();
  printable.print();
};


