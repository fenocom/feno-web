"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";

import defaultDocument from "../data/defaultDocument.json";
import { defaultTemplateId } from "../data/templatesIndex.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

const ResumeContext = createContext(null);

const isValidDocument = (doc) =>
  Array.isArray(doc?.content) && doc.content.length > 0;

export function ResumeProvider({ children }) {
  const [document, setDocument] = useLocalStorage(
    "resume-document",
    defaultDocument
  );
  const [selectedTheme, setSelectedTheme] = useLocalStorage(
    "resume-theme",
    defaultTemplateId
  );

  useEffect(() => {
    if (!isValidDocument(document)) {
      setDocument(defaultDocument);
    }
  }, [document, setDocument]);

  const updateDocument = useCallback(
    (nextDoc) => {
      setDocument((current) => {
        const resolved =
          typeof nextDoc === "function" ? nextDoc(current) : nextDoc;
        return isValidDocument(resolved) ? resolved : defaultDocument;
      });
    },
    [setDocument]
  );

  const value = useMemo(
    () => ({
      document: isValidDocument(document) ? document : defaultDocument,
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
