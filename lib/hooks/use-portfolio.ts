"use client";

import { createClient } from "@/lib/supabase/client";
import { useCallback, useEffect, useState } from "react";

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

export function usePortfolio() {
    const [portfolio, setPortfolio] = useState<UserPortfolio | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const supabase = createClient();

    const fetchPortfolio = useCallback(async () => {
        setIsLoading(true);
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            setIsLoading(false);
            return;
        }

        const { data, error: fetchError } = await supabase
            .from("user_portfolios")
            .select("*")
            .eq("user_id", user.id)
            .single();

        if (fetchError && fetchError.code !== "PGRST116") {
            setError(fetchError.message);
        } else {
            setPortfolio(data);
        }
        setIsLoading(false);
    }, [supabase]);

    useEffect(() => {
        fetchPortfolio();
    }, [fetchPortfolio]);

    const saveHtml = useCallback(
        async (htmlContent: string, resumeId?: string, templateId?: string) => {
            setIsSaving(true);
            setError(null);

            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                setError("Not authenticated");
                setIsSaving(false);
                return null;
            }

            if (portfolio) {
                const { data, error: updateError } = await supabase
                    .from("user_portfolios")
                    .update({
                        html_content: htmlContent,
                        resume_id: resumeId ?? portfolio.resume_id,
                        template_id: templateId ?? portfolio.template_id,
                    })
                    .eq("user_id", user.id)
                    .select()
                    .single();

                if (updateError) {
                    setError(updateError.message);
                    setIsSaving(false);
                    return null;
                }

                setPortfolio(data);
                setIsSaving(false);
                return data;
            }

            const { data, error: insertError } = await supabase
                .from("user_portfolios")
                .insert({
                    user_id: user.id,
                    html_content: htmlContent,
                    resume_id: resumeId,
                    template_id: templateId,
                })
                .select()
                .single();

            if (insertError) {
                setError(insertError.message);
                setIsSaving(false);
                return null;
            }

            setPortfolio(data);
            setIsSaving(false);
            return data;
        },
        [supabase, portfolio],
    );

    const publish = useCallback(
        async (subdomain: string) => {
            setIsSaving(true);
            setError(null);

            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                setError("Not authenticated");
                setIsSaving(false);
                return false;
            }

            const { data: existing } = await supabase
                .from("user_portfolios")
                .select("id")
                .eq("subdomain", subdomain)
                .neq("user_id", user.id)
                .single();

            if (existing) {
                setError("Subdomain already taken");
                setIsSaving(false);
                return false;
            }

            const { data, error: publishError } = await supabase
                .from("user_portfolios")
                .update({ subdomain, is_published: true })
                .eq("user_id", user.id)
                .select()
                .single();

            if (publishError) {
                setError(publishError.message);
                setIsSaving(false);
                return false;
            }

            setPortfolio(data);
            setIsSaving(false);
            return true;
        },
        [supabase],
    );

    const unpublish = useCallback(async () => {
        setIsSaving(true);

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            setIsSaving(false);
            return false;
        }

        const { data, error: unpublishError } = await supabase
            .from("user_portfolios")
            .update({ is_published: false })
            .eq("user_id", user.id)
            .select()
            .single();

        if (unpublishError) {
            setError(unpublishError.message);
            setIsSaving(false);
            return false;
        }

        setPortfolio(data);
        setIsSaving(false);
        return true;
    }, [supabase]);

    return {
        portfolio,
        isLoading,
        isSaving,
        error,
        saveHtml,
        publish,
        unpublish,
        refetch: fetchPortfolio,
    };
}
