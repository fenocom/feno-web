export const stringAttr = (defaults = "") => ({
  default: defaults,
});

export const listAttr = (defaults = []) => ({
  default: defaults,
  parseHTML: (element) => element.getAttribute("data-items")?.split(",") ?? defaults,
  renderHTML: (attributes) => ({
    "data-items": attributes?.join(",") ?? "",
  }),
});


