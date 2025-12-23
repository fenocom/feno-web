import { createClient } from "@/lib/supabase/server";

export async function createTemplate(params: {
    creator_id: string;
    name: string;
    category: string;
    resume_data: any;
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
    userId?: string;
}) {
    const supabase = await createClient();
    const { page, limit, maxTier, userId } = params;

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const query = supabase
        .from("resume_templates")
        .select("*", { count: "exact" })
        .lte("tier", maxTier);

    const { data: templates, error, count } = await query
        .order("created_at", { ascending: false })
        .range(from, to);

    if (error) {
        throw error;
    }

    let enrichedData = templates;

    if (userId && templates && templates.length > 0) {
        const creatorIds = [...new Set(templates
            .filter((t: any) => !t.is_anonymous && t.creator_id)
            .map((t: any) => t.creator_id))];

        if (creatorIds.length > 0) {
            const { data: creators } = await supabase
                .from("creators_view")
                .select("id, full_name, avatar_url")
                .in("id", creatorIds);
            
            const creatorsMap = new Map(creators?.map((c: any) => [c.id, c]) || []);

            enrichedData = templates.map((t: any) => {
                if (t.is_anonymous) return t;
                const creator = creatorsMap.get(t.creator_id);
                return {
                    ...t,
                    creator: creator || null,
                    author: creator?.full_name
                };
            });
        }
    }

    return { data: enrichedData, count };
}
