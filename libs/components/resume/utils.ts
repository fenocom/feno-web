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
