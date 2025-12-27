import { PORTFOLIO_TEMPLATES } from "@/lib/constants/portfolio-templates";

export function getImageTemplatePath(templateId: string): string {
    const template =
        PORTFOLIO_TEMPLATES.find((t) => t.id === templateId) ??
        PORTFOLIO_TEMPLATES[0];
    return template.image;
}

export function getImageMimeType(templateId: string): string {
    const template =
        PORTFOLIO_TEMPLATES.find((t) => t.id === templateId) ??
        PORTFOLIO_TEMPLATES[0];
    return template.mimeType;
}

export function getTemplatePrompt(templateId: string): string {
    const template =
        PORTFOLIO_TEMPLATES.find((t) => t.id === templateId) ??
        PORTFOLIO_TEMPLATES[0];
    return template.prompt;
}
