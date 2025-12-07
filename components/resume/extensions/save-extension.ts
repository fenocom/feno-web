// resume/extensions/save-extension.ts
import { Extension } from "@tiptap/core";
import type { Editor } from "@tiptap/core";
import {
  saveTemplate as saveTemplateToDB,
  getTemplate as getTemplateFromDB,
  StoredTemplate,
} from "../template-store";

export type SaveExtensionOptions = {
  templateName: string;
  delay?: number;
  loadOnInit?: boolean;
  saveOnInit?: boolean;
};

function debounce<T extends (...args: any[]) => void>(fn: T, wait = 1200) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn(...args);
    }, wait);
  };
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    saveExtension: {
      saveNow: (payload: any) => ReturnType;
      clearSaved: () => ReturnType;
    };
  }
}

export const SaveExtension = Extension.create<SaveExtensionOptions>({
  name: "saveExtension",

  addOptions() {
    return {
      templateName: "",
      delay: 1200,
      loadOnInit: true,
      saveOnInit: false,
    } as SaveExtensionOptions;
  },

  addCommands() {
    return {
      saveNow:
        (payload: any) =>
        ({ editor }) => {
          const name = this.options.templateName;
          if (!name) return false;
          saveTemplateToDB(name, payload).catch(() => {});
          return true;
        },
      clearSaved:
        () =>
        () => {
          const name = this.options.templateName;
          if (!name) return false;
          saveTemplateToDB(name, null).catch(() => {});
          return true;
        },
    };
  },

  onCreate() {
    const editor = this.editor as Editor;
    const { templateName, delay, loadOnInit, saveOnInit } = this.options;

    if (!templateName) {
      return;
    }

    let isApplyingRemote = false;

    const doSave = async (payload: any) => {
      try {
        await saveTemplateToDB(templateName, payload);
      } catch (err) {
        console.error("indexDB error : ", err)
      }
    };

    const debouncedSave = debounce(doSave, delay);

    const updateHandler = () => {
      if (isApplyingRemote) return;
      const json = editor.getJSON();
      debouncedSave(json);
    };

    editor.on("update", updateHandler);

    if (loadOnInit) {
      (async () => {
        try {
          const saved: StoredTemplate | null = await getTemplateFromDB(
            templateName
          );
          if (saved && saved.data) {
            isApplyingRemote = true;
            editor.commands.setContent(saved.data);
            isApplyingRemote = false;
            if (saveOnInit) {
              await doSave(saved.data);
            }
          }
        } catch (err) {}
      })();
    }

    this.storage.saveExtension = {
      _updateHandler: updateHandler,
      _debouncedSave: debouncedSave,
    } as any;
  },

  onDestroy() {
    const editor = this.editor as Editor;
    const storage: any = this.storage.saveExtension as any;
    if (storage && storage._updateHandler) {
      try {
        editor.off("update", storage._updateHandler);
      } catch {}
    }
  },
});