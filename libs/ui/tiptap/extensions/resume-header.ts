import { Node, mergeAttributes } from "@tiptap/core";

export interface ResumeHeaderOptions {
    HTMLAttributes: Record<string, unknown>;
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        resumeHeader: {
            setResumeHeader: () => ReturnType;
        };
    }
}

export const ResumeHeader = Node.create<ResumeHeaderOptions>({
    name: "resumeHeader",

    addOptions() {
        return {
            HTMLAttributes: {},
        };
    },

    content: "block+",

    group: "block",

    defining: true,

    parseHTML() {
        return [
            {
                tag: 'div[data-type="resume-header"]',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            "div",
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                "data-type": "resume-header",
                class: "resume-header",
            }),
        ];
    },

    addCommands() {
        return {
            setResumeHeader:
                () =>
                ({ commands }) => {
                    return commands.setNode(this.name);
                },
        };
    },
});
