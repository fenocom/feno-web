import { RESUME_ATTRS } from "@/lib/resume-parser/attributes";
import { Extension } from "@tiptap/core";

export const ResumeDataAttributes = Extension.create({
    name: "resumeDataAttributes",

    addGlobalAttributes() {
        return [
            {
                types: [
                    "heading",
                    "paragraph",
                    "bulletList",
                    "orderedList",
                    "listItem",
                    "image",
                    "gridColumn",
                    "page",
                    "grid",
                ],
                attributes: {
                    [RESUME_ATTRS.FIELD]: {
                        default: null,
                        parseHTML: (element) =>
                            element.getAttribute(RESUME_ATTRS.FIELD),
                        renderHTML: (attributes) => {
                            if (!attributes[RESUME_ATTRS.FIELD]) return {};
                            return {
                                [RESUME_ATTRS.FIELD]:
                                    attributes[RESUME_ATTRS.FIELD],
                            };
                        },
                    },
                    [RESUME_ATTRS.SECTION]: {
                        default: null,
                        parseHTML: (element) =>
                            element.getAttribute(RESUME_ATTRS.SECTION),
                        renderHTML: (attributes) => {
                            if (!attributes[RESUME_ATTRS.SECTION]) return {};
                            return {
                                [RESUME_ATTRS.SECTION]:
                                    attributes[RESUME_ATTRS.SECTION],
                            };
                        },
                    },
                    [RESUME_ATTRS.SCOPE]: {
                        default: null,
                        parseHTML: (element) =>
                            element.getAttribute(RESUME_ATTRS.SCOPE),
                        renderHTML: (attributes) => {
                            if (!attributes[RESUME_ATTRS.SCOPE]) return {};
                            return {
                                [RESUME_ATTRS.SCOPE]:
                                    attributes[RESUME_ATTRS.SCOPE],
                            };
                        },
                    },
                },
            },
        ];
    },
});
