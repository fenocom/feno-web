export const extractSections = (document) => {
  if (!document || !Array.isArray(document.content)) return [];

  return document.content.map((node, index) => ({
    id: node.attrs?.id ?? `${node.type}-${index}`,
    type: node.type,
    attrs: node.attrs ?? {},
    content: node.content ?? [],
  }));
};

export const getTextContent = (nodes = []) =>
  nodes
    .map((node) => {
      if (node.type === "text") return node.text ?? "";
      if (Array.isArray(node.content)) return getTextContent(node.content);
      return "";
    })
    .join("");


