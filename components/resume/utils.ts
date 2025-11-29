import { FileDown, Shuffle, Globe } from "lucide-react";
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

export const toolbarConfig = [
  {
    id: "download",
    label: "Download PDF",
    icon: FileDown,
    action: () => console.log("Download PDF"),
    disabled: false,
    // tooltip: "Export your resume",
  },
  {
    id: "switch-template",
    label: "Switch Template",
    icon: Shuffle,
    action: () => console.log("Switch template"),
    disabled: false,
    // tooltip: "Try a different resume layout",
  },
  {
    id: "create-portfolio",
    label: "Create Portfolio",
    icon: Globe,
    action: () => console.log("Go to portfolio builder"),
    disabled: true,
    // tooltip: "Coming soon",
    className: "opacity-50 cursor-not-allowed"
  }
];
