import { createAdminClient } from "@/lib/supabase/admin";

export interface UserPortfolio {
    id: string;
    user_id: string;
    subdomain: string | null;
    html_content: string | null;
    resume_id: string | null;
    template_id: string | null;
    is_published: boolean;
    created_at: string | null;
    updated_at: string | null;
}

export interface SavePortfolioInput {
    htmlContent: string;
    resumeId?: string;
    templateId?: string;
}

export async function getUserPortfolio(
    userId: string,
): Promise<UserPortfolio | null> {
    const supabase = createAdminClient();

    const { data, error } = await supabase
        .from("user_portfolios")
        .select("*")
        .eq("user_id", userId)
        .single();

    if (error) {
        if (error.code === "PGRST116") {
            return null;
        }
        console.error("Failed to get portfolio:", error);
        throw new Error("Failed to get portfolio");
    }

    return data as UserPortfolio;
}

export async function savePortfolio(
    userId: string,
    input: SavePortfolioInput,
): Promise<UserPortfolio> {
    const supabase = createAdminClient();

    const existing = await getUserPortfolio(userId);

    if (existing) {
        const { data, error } = await supabase
            .from("user_portfolios")
            .update({
                html_content: input.htmlContent,
                resume_id: input.resumeId ?? existing.resume_id,
                template_id: input.templateId ?? existing.template_id,
            })
            .eq("user_id", userId)
            .select()
            .single();

        if (error) {
            console.error("Failed to update portfolio:", error);
            throw new Error("Failed to update portfolio");
        }

        return data as UserPortfolio;
    }

    const { data, error } = await supabase
        .from("user_portfolios")
        .insert({
            user_id: userId,
            html_content: input.htmlContent,
            resume_id: input.resumeId,
            template_id: input.templateId,
        })
        .select()
        .single();

    if (error) {
        console.error("Failed to create portfolio:", error);
        throw new Error("Failed to create portfolio");
    }

    return data as UserPortfolio;
}

export async function publishPortfolio(
    userId: string,
    subdomain: string,
): Promise<UserPortfolio> {
    const supabase = createAdminClient();

    const { data: existing } = await supabase
        .from("user_portfolios")
        .select("id")
        .eq("subdomain", subdomain)
        .neq("user_id", userId)
        .single();

    if (existing) {
        throw new Error("Subdomain already taken");
    }

    const { data, error } = await supabase
        .from("user_portfolios")
        .update({
            subdomain,
            is_published: true,
        })
        .eq("user_id", userId)
        .select()
        .single();

    if (error) {
        console.error("Failed to publish portfolio:", error);
        throw new Error("Failed to publish portfolio");
    }

    return data as UserPortfolio;
}

export async function unpublishPortfolio(
    userId: string,
): Promise<UserPortfolio> {
    const supabase = createAdminClient();

    const { data, error } = await supabase
        .from("user_portfolios")
        .update({ is_published: false })
        .eq("user_id", userId)
        .select()
        .single();

    if (error) {
        console.error("Failed to unpublish portfolio:", error);
        throw new Error("Failed to unpublish portfolio");
    }

    return data as UserPortfolio;
}

export async function checkSubdomainAvailable(
    subdomain: string,
    userId: string,
): Promise<boolean> {
    const supabase = createAdminClient();

    const { data } = await supabase
        .from("user_portfolios")
        .select("id")
        .eq("subdomain", subdomain)
        .neq("user_id", userId)
        .single();

    return !data;
}
