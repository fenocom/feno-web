import type { JSONContent } from "@tiptap/core";
import { RESUME_ATTRS } from "./attributes";
import type { ResumeData } from "./types";

export function extractResumeData(content: JSONContent): ResumeData {
    const data: ResumeData = {
        fields: {},
        sections: {},
    };

    function getText(node: JSONContent): string {
        if (node.type === "text") return node.text || "";
        if (node.content) {
            return node.content.map(getText).join("\n");
        }
        return "";
    }

    function traverse(node: JSONContent) {
        const attrs = node.attrs || {};

        if (attrs[RESUME_ATTRS.FIELD]) {
            const fieldName = attrs[RESUME_ATTRS.FIELD];
            data.fields[fieldName] = getText(node);
        }

        if (attrs[RESUME_ATTRS.SECTION]) {
            const sectionName = attrs[RESUME_ATTRS.SECTION];
            if (!data.sections[sectionName]) {
                data.sections[sectionName] = [];
            }

            if (node.content) {
                for (const child of node.content) {
                    const childAttrs = child.attrs || {};
                    if (childAttrs[RESUME_ATTRS.SCOPE] === "item") {
                        const itemData: Record<string, string> = {};

                        // eslint-disable-next-line no-inner-declarations
                        function traverseItem(itemNode: JSONContent) {
                            const iAttrs = itemNode.attrs || {};
                            if (iAttrs[RESUME_ATTRS.FIELD]) {
                                itemData[iAttrs[RESUME_ATTRS.FIELD]] =
                                    getText(itemNode);
                            }
                            if (itemNode.content) {
                                for (const subChild of itemNode.content) {
                                    traverseItem(subChild);
                                }
                            }
                        }
                        traverseItem(child);

                        if (Object.keys(itemData).length > 0) {
                            data.sections[sectionName].push(itemData);
                        }
                    }
                }
            }
            return;
        }

        if (node.content) {
            for (const child of node.content) {
                traverse(child);
            }
        }
    }

    traverse(content);
    return data;
}
