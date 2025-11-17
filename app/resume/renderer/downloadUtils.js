export const downloadAsJSON = (doc, fileName = "resume.json") => {
  if (typeof window === "undefined" || !doc) return;
  const blob = new Blob([JSON.stringify(doc, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = window.document?.createElement("a");
  if (!link) {
    URL.revokeObjectURL(url);
    return;
  }
  link.href = url;
  link.download = fileName;
  window.document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

export const readJSONFile = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result ?? "{}");
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });


