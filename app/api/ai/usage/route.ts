import { ratelimit } from "@/lib/ratelimit";
import { getAiUsage } from "@/lib/services/ai-usage";
import { createClient } from "@/lib/supabase/server";

function getUserTier(user: {
    app_metadata?: Record<string, unknown>;
    user_metadata?: Record<string, unknown>;
}): number {
    const appMeta = user.app_metadata || {};
    const userMeta = user.user_metadata || {};

    if (typeof appMeta.tier === "number") {
        return appMeta.tier;
    }

    if (appMeta.plan === "premium" || userMeta.plan === "premium") {
        return 2;
    }

    return 1;
}

export async function GET() {
    const supabase = await createClient();
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        return new Response(
            JSON.stringify({ error: "Authentication required" }),
            { status: 401, headers: { "Content-Type": "application/json" } },
        );
    }

    if (ratelimit) {
        const { success } = await ratelimit.limit(user.id);
        if (!success) {
            return new Response(
                JSON.stringify({ error: "Too many requests" }),
                {
                    status: 429,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }
    }

    const tier = getUserTier(user);

    if (tier < 2) {
        return new Response(
            JSON.stringify({
                tier,
                hasAccess: false,
                usage: null,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } },
        );
    }

    try {
        const usage = await getAiUsage(user.id, tier);

        return new Response(
            JSON.stringify({
                tier,
                hasAccess: true,
                usage,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } },
        );
    } catch (error) {
        console.error("Failed to get AI usage:", error);
        return new Response(
            JSON.stringify({ error: "Failed to get usage data" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
        );
    }
}
