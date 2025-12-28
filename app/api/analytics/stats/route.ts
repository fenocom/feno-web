import {
    getAnalyticsSummary,
    getHeatmapData,
} from "@/lib/services/portfolio-analytics";
import { createClient } from "@/lib/supabase/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const supabase = await createClient();

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        return new Response(
            JSON.stringify({ error: "Authentication required" }),
            {
                status: 401,
                headers: { "Content-Type": "application/json" },
            },
        );
    }

    const { searchParams } = new URL(req.url);
    const portfolioId = searchParams.get("portfolioId");
    const type = searchParams.get("type") || "summary";
    const days = Number.parseInt(searchParams.get("days") || "30", 10);

    if (!portfolioId) {
        return new Response(JSON.stringify({ error: "Missing portfolioId" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const { data: portfolio } = await supabase
        .from("user_portfolios")
        .select("id, user_id")
        .eq("id", portfolioId)
        .single();

    if (!portfolio || portfolio.user_id !== user.id) {
        return new Response(JSON.stringify({ error: "Portfolio not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        if (type === "heatmap") {
            const heatmapData = await getHeatmapData(portfolioId, days);
            return new Response(JSON.stringify(heatmapData), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }

        const summary = await getAnalyticsSummary(portfolioId, days);
        return new Response(JSON.stringify(summary), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Analytics stats error:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch analytics" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            },
        );
    }
}
