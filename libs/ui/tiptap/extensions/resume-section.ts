import { Node, mergeAttributes } from "@tiptap/core";

export interface ResumeSectionOptions {
    HTMLAttributes: Record<string, unknown>;
    editable: boolean;
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        resumeSection: {
            setResumeSection: (attributes: {
                type: string;
                editable: boolean;
            }) => ReturnType;
        };
    }
}

export const ResumeSection = Node.create<ResumeSectionOptions>({
    name: "resumeSection",

    addOptions() {
        return {
            HTMLAttributes: {},
            editable: true,
        };
    },

    content: "block+",

    group: "block",

    defining: true,

    addAttributes() {
        return {
            type: {
                default: "section",
                parseHTML: (element) => element.getAttribute("data-type"),
                renderHTML: (attributes) => {
                    if (!attributes.type) {
                        return {};
                    }
                    return {
                        "data-type": attributes.type,
                    };
                },
            },
            editable: {
                default: true,
                parseHTML: (element) =>
                    element.getAttribute("data-editable") === "true",
                renderHTML: (attributes) => {
                    if (!attributes.editable) {
                        return {
                            "data-editable": "false",
                            contenteditable: "false",
                        };
                    }
                    return {
                        "data-editable": "true",
                    };
                },
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-type="resume-section"]',
            },
        ];
    },

    renderHTML({ HTMLAttributes, node }) {
        return [
            "div",
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                "data-type": "resume-section",
                "data-editable": node.attrs.editable ? "true" : "false",
            }),
            0,
        ];
    },

    addCommands() {
        return {
            setResumeSection:
                (attributes) =>
                ({ commands }) => {
                    return commands.setNode(this.name, attributes);
                },
        };
    },
});
