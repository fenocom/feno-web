import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export interface PortfolioTemplate {
    id: string;
    name: string;
    image_path: string;
    prompt: string;
    mime_type: string;
}

export function usePortfolioTemplates() {
    const [templates, setTemplates] = useState<PortfolioTemplate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchTemplates = async () => {
            const { data, error } = await supabase
                .from("portfolio_templates")
                .select("*")
                .order("created_at", { ascending: false });

            if (!error && data) {
                setTemplates(data);
            }
            setIsLoading(false);
        };

        fetchTemplates();
    }, [supabase]);

    return { templates, isLoading };
}

export async function createPortfolioTemplate(
    name: string,
    prompt: string,
    file: File,
) {
    const supabase = createClient();

    // 1. Upload image
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
        .from("portfolio-templates")
        .upload(fileName, file);

    if (uploadError) throw uploadError;

    // 2. Insert record
    const { data, error } = await supabase
        .from("portfolio_templates")
        .insert({
            name,
            prompt,
            image_path: uploadData.path,
            mime_type: file.type,
        })
        .select()
        .single();

    if (error) throw error;
    return data;
}

export function getTemplateImageUrl(path: string) {
    const supabase = createClient();
    const { data } = supabase.storage
        .from("portfolio-templates")
        .getPublicUrl(path);
    return data.publicUrl;
}
