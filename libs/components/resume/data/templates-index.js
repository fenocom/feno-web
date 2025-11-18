// app/data/templatesIndex.js
export const templatesIndex = [
    {
      id: "default-1",
      name: "Default 1",
      css: "/templates/default-1/styles.css",    // public path or built asset
      preview: "/templates/default-1/preview.png",
      defaultColors: { primary: "#007BFF", secondary: "#6C757D" },
      // rendererImport: () => import("../libs/components/resume/templates/default-1/renderer"),
    },
    {
      id: "classic",
      name: "Classic",
      css: "/templates/classic/styles.css",
      preview: "/templates/classic/preview.png",
      defaultColors: { primary: "#111", secondary: "#666" },
      // rendererImport: () => import("../libs/components/resume/templates/classic/renderer"),
    },
  ];
  
  export const defaultTemplateId = templatesIndex[0].id;
  