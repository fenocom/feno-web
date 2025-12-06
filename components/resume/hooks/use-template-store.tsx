"use client";

import { useCallback } from "react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import {
  saveTemplate as saveTemplateToDB,
  getTemplate as getTemplateFromDB,
  deleteTemplate as deleteTemplateFromDB,
  clearAllTemplates,
  StoredTemplate,
} from "../template-store"

export function useTemplateStore(templateName: string, delay = 1200) {
  const saveImmediate = useCallback(async (payload: any) => {
    if (!templateName) return;
    await saveTemplateToDB(templateName, payload);
  }, [templateName]);

  const debouncedSave = useDebounce(async (payload: any) => {
    await saveImmediate(payload);
  }, delay);

  const load = useCallback(async (): Promise<StoredTemplate | null> => {
    if (!templateName) return null;
    return await getTemplateFromDB(templateName);
  }, [templateName]);

  const remove = useCallback(async () => {
    if (!templateName) return;
    await deleteTemplateFromDB(templateName);
  }, [templateName]);

  const clearAll = useCallback(async () => {
    await clearAllTemplates();
  }, []);

  return {
    saveTemplateDebounced: debouncedSave,
    saveTemplateImmediate: saveImmediate,
    loadTemplate: load,
    deleteTemplate: remove,
    clearAllTemplates: clearAll,
  };
}