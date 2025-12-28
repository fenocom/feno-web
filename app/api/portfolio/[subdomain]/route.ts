import { injectTrackingScript } from "@/lib/analytics/tracking-script";
import { createAdminClient } from "@/lib/supabase/admin";
import type { NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ subdomain: string }> },
) {
    const { subdomain } = await params;

    if (!subdomain) {
        return new Response("Portfolio not found", { status: 404 });
    }

    const supabase = createAdminClient();

    const { data: portfolio, error } = await supabase
        .from("user_portfolios")
        .select("html_content, is_published")
        .eq("subdomain", subdomain)
        .eq("is_published", true)
        .single();

    if (error || !portfolio || !portfolio.html_content) {
        return new Response("Portfolio not found", { status: 404 });
    }

    // Get the base URL for the tracking API
    const protocol = req.headers.get("x-forwarded-proto") || "https";
    const host = req.headers.get("host") || "localhost:3000";
    const baseUrl = `${protocol}://${host}`;

    // Inject tracking script
    const htmlWithTracking = injectTrackingScript(
        portfolio.html_content,
        subdomain,
        baseUrl,
    );

    return new Response(htmlWithTracking, {
        status: 200,
        headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "public, max-age=300", // Cache for 5 minutes
        },
    });
}
