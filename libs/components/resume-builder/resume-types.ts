export type ResumeStyle =
    | "modern"
    | "classic"
    | "sidebar"
    | "minimalist"
    | "two-column";

export interface ResumeSection {
    id: string;
    type:
        | "header"
        | "experience"
        | "education"
        | "skills"
        | "summary"
        | "contact";
    editable: boolean;
    content: string;
    order: number;
}

export interface ResumeTemplate {
    id: ResumeStyle;
    name: string;
    description: string;
    preview: string;
    layout: "single-column" | "two-column" | "sidebar";
}
