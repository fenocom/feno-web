import type { JSONContent } from "@tiptap/core";
import { RESUME_ATTRS } from "./attributes";
import type { ResumeData } from "./types";

export function injectResumeData(
    template: JSONContent,
    data: ResumeData,
): JSONContent {
    const newTemplate = JSON.parse(JSON.stringify(template));

    function replaceText(node: JSONContent, text: string) {
        if (node.type === "bulletList" || node.type === "orderedList") {
            const lines = text.split("\n").filter((l) => l.trim());
            node.content = lines.map((line) => ({
                type: "listItem",
                content: [
                    {
                        type: "paragraph",
                        content: [{ type: "text", text: line }],
                    },
                ],
            }));
            return;
        }

        let marks: any[] | undefined;
        if (node.content && node.content.length > 0) {
            const textNode = node.content.find((n) => n.type === "text");
            if (textNode?.marks) {
                marks = textNode.marks;
            }
        }

        node.content = [
            {
                type: "text",
                text: text,
                marks: marks && marks.length > 0 ? marks : undefined,
            },
        ];
    }

    function traverse(node: JSONContent) {
        const attrs = node.attrs || {};

        if (attrs[RESUME_ATTRS.FIELD]) {
            const fieldName = attrs[RESUME_ATTRS.FIELD];
            const val = data.fields[fieldName];
            if (val) {
                replaceText(node, val);
            }
        }

        if (attrs[RESUME_ATTRS.SECTION]) {
            const sectionName = attrs[RESUME_ATTRS.SECTION];
            const items = data.sections[sectionName];

            if (items && items.length > 0 && node.content) {
                const blueprintIndex = node.content.findIndex(
                    (c) => c.attrs && c.attrs[RESUME_ATTRS.SCOPE] === "item",
                );

                if (blueprintIndex !== -1) {
                    const blueprint = node.content[blueprintIndex];

                    const generatedItems = items.map((itemData) => {
                        const itemNode = JSON.parse(JSON.stringify(blueprint));

                        function traverseItem(n: JSONContent) {
                            const nAttrs = n.attrs || {};
                            if (nAttrs[RESUME_ATTRS.FIELD]) {
                                const fName = nAttrs[RESUME_ATTRS.FIELD];
                                if (itemData[fName]) {
                                    replaceText(n, itemData[fName]);
                                }
                            }
                            if (n.content) {
                                for (const child of n.content) {
                                    traverseItem(child);
                                }
                            }
                        }
                        traverseItem(itemNode);
                        return itemNode;
                    });

                    const finalContent: JSONContent[] = [];
                    let blueprintUsed = false;

                    for (const child of node.content) {
                        const isItem =
                            child.attrs &&
                            child.attrs[RESUME_ATTRS.SCOPE] === "item";
                        if (!isItem) {
                            finalContent.push(child);
                        } else if (!blueprintUsed) {
                            finalContent.push(...generatedItems);
                            blueprintUsed = true;
                        }
                    }

                    node.content = finalContent;
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

    traverse(newTemplate);
    return newTemplate;
}
