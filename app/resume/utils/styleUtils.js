export const mergeColors = (base = {}, override = {}) => ({
  primary: override.primary ?? base.primary ?? "#111827",
  secondary: override.secondary ?? base.secondary ?? "#6366F1",
  muted: override.muted ?? base.muted ?? "#6B7280",
});

export const getFontStack = (font) =>
  font
    ? `${font}, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
    : 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';


