"use client";

import { createContext, useCallback, useContext, useMemo } from "react";

import defaultDocument from "../data/defaultDocument.json";
import { defaultTemplateId } from "../data/templatesIndex.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [document, setDocument] = useLocalStorage(
    "resume-document",
    defaultDocument
  );
  const [selectedTheme, setSelectedTheme] = useLocalStorage(
    "resume-theme",
    defaultTemplateId
  );

  const updateDocument = useCallback(
    (nextDoc) => {
      setDocument(typeof nextDoc === "function" ? nextDoc(document) : nextDoc);
    },
    [document, setDocument]
  );

  const value = useMemo(
    () => ({
      document,
      setDocument: updateDocument,
      selectedTheme,
      setSelectedTheme,
    }),
    [document, selectedTheme, updateDocument, setSelectedTheme]
  );

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  );
}

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResumeContext must be used within ResumeProvider");
  }
  return context;
};
