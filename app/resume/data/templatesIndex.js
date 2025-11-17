import modernMeta from "../themes/modern/meta.json";
import { ModernRenderer } from "../themes/modern/ModernRenderer.jsx";

export const templatesIndex = [
  {
    id: modernMeta.id,
    name: modernMeta.name,
    description: modernMeta.description,
    preview: modernMeta.preview,
    renderer: ModernRenderer,
    fonts: modernMeta.fonts,
    colors: modernMeta.colors,
  },
];

export const defaultTemplateId = modernMeta.id;


