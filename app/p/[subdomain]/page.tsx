import { injectTrackingScript } from "@/lib/analytics/tracking-script";
import { createAdminClient } from "@/lib/supabase/admin";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ subdomain: string }>;
}

export default async function PortfolioPage({ params }: PageProps) {
    const { subdomain } = await params;

    const supabase = createAdminClient();

    const { data: portfolio, error } = await supabase
        .from("user_portfolios")
        .select("html_content, is_published")
        .eq("subdomain", subdomain)
        .eq("is_published", true)
        .single();

    if (error || !portfolio || !portfolio.html_content) {
        notFound();
    }

    // Get base URL for tracking
    const headersList = await headers();
    const host = headersList.get("host") || "localhost:3000";
    const protocol = headersList.get("x-forwarded-proto") || "https";
    const baseUrl = `${protocol}://${host}`;

    // Inject tracking script
    const htmlWithTracking = injectTrackingScript(
        portfolio.html_content,
        subdomain,
        baseUrl,
    );

    return (
        <iframe
            srcDoc={htmlWithTracking}
            className="w-full h-screen border-none"
            title={`Portfolio - ${subdomain}`}
        />
    );
}

export async function generateMetadata({ params }: PageProps) {
    const { subdomain } = await params;
    return {
        title: `${subdomain} - Portfolio`,
        robots: "index, follow",
    };
}
