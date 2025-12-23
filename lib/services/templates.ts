import { createClient } from "@/lib/supabase/server";
import type { JSONContent } from "@tiptap/core";

interface TemplateRow {
    id: string;
    creator_id: string;
    is_anonymous: boolean;
    resume_data: JSONContent;
    tier: number;
    created_at: string;
    updated_at: string;
    name: string;
    category: string;
}

export async function createTemplate(params: {
    creator_id: string;
    name: string;
    category: string;
    resume_data: JSONContent;
    tier: number;
    is_anonymous: boolean;
}) {
    const supabase = await createClient();
    return await supabase
        .from("resume_templates")
        .insert(params)
        .select()
        .single();
}

export async function getTemplates(params: {
    page: number;
    limit: number;
    maxTier: number;
}) {
    const supabase = await createClient();
    const { page, limit, maxTier } = params;

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const query = supabase
        .from("resume_templates")
        .select("*", { count: "exact" })
        .lte("tier", maxTier);

    const {
        data: templates,
        error,
        count,
    } = await query.order("created_at", { ascending: false }).range(from, to);

    if (error) {
        throw error;
    }

    return { data: templates as unknown as TemplateRow[], count };
}
