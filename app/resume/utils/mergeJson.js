export const mergeJson = (baseDoc, overrideDoc) => {
  if (!baseDoc) return overrideDoc;
  if (!overrideDoc) return baseDoc;

  return {
    ...baseDoc,
    content: overrideDoc.content ?? baseDoc.content ?? [],
  };
};


