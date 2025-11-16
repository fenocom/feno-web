"use client";
import type { ResumeStyle, ResumeTemplate } from "./resume-types";

const templates: ResumeTemplate[] = [
    {
        id: "modern",
        name: "Modern",
        description: "Two-column layout with dark header and profile picture",
        preview: "modern",
        layout: "two-column",
    },
    {
        id: "classic",
        name: "Classic",
        description: "Single column, minimalist design",
        preview: "classic",
        layout: "single-column",
    },
    {
        id: "sidebar",
        name: "Sidebar",
        description: "Dark sidebar with light main content",
        preview: "sidebar",
        layout: "sidebar",
    },
    {
        id: "minimalist",
        name: "Minimalist",
        description: "Clean, simple design with profile picture",
        preview: "minimalist",
        layout: "two-column",
    },
    {
        id: "two-column",
        name: "Two Column",
        description: "Balanced two-column layout",
        preview: "two-column",
        layout: "two-column",
    },
];

interface ResumeStyleSelectorProps {
    selectedStyle: ResumeStyle;
    onStyleChange: (style: ResumeStyle) => void;
}

export function ResumeStyleSelector({
    selectedStyle,
    onStyleChange,
}: ResumeStyleSelectorProps) {
    const selectedTemplate = templates.find(t => t.id === selectedStyle);
    
    return (
        <div className="bg-white rounded-lg shadow-lg p-3">
            <label htmlFor="template-select" className="block text-xs font-medium text-gray-600 mb-1">
                Template
            </label>
            <select
                id="template-select"
                value={selectedStyle}
                onChange={(e) => onStyleChange(e.target.value as ResumeStyle)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
                {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                        {template.name}
                    </option>
                ))}
            </select>
            {selectedTemplate && (
                <p className="text-xs text-gray-500 mt-1">
                    {selectedTemplate.description}
                </p>
            )}
        </div>
    );
}
