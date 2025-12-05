export const parseStyles = (element: HTMLElement) => {
  const data = element.getAttribute("data-styles");
  return data ? JSON.parse(data) : {};
};

export const renderStyles = (styles: Record<string, string | number>) => {
  if (!styles || Object.keys(styles).length === 0) {
    return {};
  }

  const styleString = Object.entries(styles)
    .map(([key, value]) => `${key}: ${value}`)
    .join("; ");

  return {
    "data-styles": JSON.stringify(styles),
    style: styleString,
  };
};

export const downloadPDF = async () => {
  const el = document.querySelector(".resume-page-export");
  if (!el) return;

  const html = el.outerHTML;

  const res = await fetch("/api/export-pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ html }),
  });

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "resume.pdf";
  a.click();

  URL.revokeObjectURL(url);
};
