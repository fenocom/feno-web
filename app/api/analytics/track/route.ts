import {
    type ClickEvent,
    extractReferrerDomain,
    generateVisitorHash,
    getPortfolioIdBySubdomain,
    parseUserAgent,
    recordClicks,
    recordPageView,
} from "@/lib/services/portfolio-analytics";
import type { NextRequest } from "next/server";

interface TrackingPayload {
    type: "pageview" | "clicks";
    subdomain: string;
    referrer?: string;
    clicks?: {
        x: number;
        y: number;
        tag?: string;
        text?: string;
        href?: string;
    }[];
}

export async function POST(req: NextRequest) {
    try {
        const payload: TrackingPayload = await req.json();

        if (!payload.subdomain) {
            return new Response(
                JSON.stringify({ error: "Missing subdomain" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        const portfolioId = await getPortfolioIdBySubdomain(payload.subdomain);
        if (!portfolioId) {
            return new Response(
                JSON.stringify({ error: "Portfolio not found" }),
                {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        const countryCode =
            req.headers.get("x-vercel-ip-country") ||
            req.headers.get("cf-ipcountry") ||
            undefined;
        const countryName = countryCode
            ? getCountryName(countryCode)
            : undefined;

        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            req.headers.get("x-real-ip") ||
            "unknown";
        const userAgent = req.headers.get("user-agent") || "";
        const visitorHash = generateVisitorHash(ip, userAgent);

        const { deviceType, browser, os } = parseUserAgent(userAgent);

        if (payload.type === "pageview") {
            const referrerDomain = extractReferrerDomain(
                payload.referrer || "",
            );

            await recordPageView({
                portfolioId,
                visitorHash,
                countryCode,
                countryName,
                referrerDomain: referrerDomain || undefined,
                referrerUrl: payload.referrer,
                deviceType,
                browser,
                os,
            });
        } else if (payload.type === "clicks" && payload.clicks) {
            const clickEvents: ClickEvent[] = payload.clicks.map((click) => ({
                portfolioId,
                xPercent: click.x,
                yPercent: click.y,
                elementTag: click.tag,
                elementText: click.text,
                elementHref: click.href,
            }));

            await recordClicks(clickEvents);
        }

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        });
    } catch (error) {
        console.error("Analytics tracking error:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            },
        );
    }
}

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
}

function getCountryName(code: string): string {
    const countries: Record<string, string> = {
        US: "United States",
        GB: "United Kingdom",
        CA: "Canada",
        AU: "Australia",
        DE: "Germany",
        FR: "France",
        JP: "Japan",
        CN: "China",
        IN: "India",
        BR: "Brazil",
        MX: "Mexico",
        ES: "Spain",
        IT: "Italy",
        NL: "Netherlands",
        SE: "Sweden",
        NO: "Norway",
        DK: "Denmark",
        FI: "Finland",
        PL: "Poland",
        RU: "Russia",
        KR: "South Korea",
        SG: "Singapore",
        HK: "Hong Kong",
        TW: "Taiwan",
        NZ: "New Zealand",
        IE: "Ireland",
        CH: "Switzerland",
        AT: "Austria",
        BE: "Belgium",
        PT: "Portugal",
        AR: "Argentina",
        CL: "Chile",
        CO: "Colombia",
        ZA: "South Africa",
        AE: "United Arab Emirates",
        SA: "Saudi Arabia",
        IL: "Israel",
        TR: "Turkey",
        TH: "Thailand",
        MY: "Malaysia",
        ID: "Indonesia",
        PH: "Philippines",
        VN: "Vietnam",
    };
    return countries[code] || code;
}
