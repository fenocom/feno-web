import crypto from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";

interface PageViewRow {
    date: string;
    views: number;
    unique_visitors: number;
}

interface GeoStatRow {
    country_code: string;
    country_name: string;
    views: number;
}

interface ReferrerRow {
    referrer_domain: string;
    views: number;
}

interface DeviceStatRow {
    device_type: string;
    browser: string;
    views: number;
}

interface ClickRow {
    x_percent: number;
    y_percent: number;
    click_count: number;
    element_tag: string | null;
    element_text: string | null;
    element_href: string | null;
}

export interface PageViewEvent {
    portfolioId: string;
    visitorHash: string;
    countryCode?: string;
    countryName?: string;
    referrerDomain?: string;
    referrerUrl?: string;
    deviceType: "desktop" | "mobile" | "tablet";
    browser?: string;
    os?: string;
}

export interface ClickEvent {
    portfolioId: string;
    xPercent: number;
    yPercent: number;
    elementTag?: string;
    elementText?: string;
    elementHref?: string;
}

export interface AnalyticsSummary {
    totalViews: number;
    uniqueVisitors: number;
    viewsByDay: { date: string; views: number; unique: number }[];
    topCountries: { code: string; name: string; views: number }[];
    topReferrers: { domain: string; views: number }[];
    deviceBreakdown: { type: string; views: number }[];
    browserBreakdown: { browser: string; views: number }[];
}

export interface HeatmapData {
    clicks: { x: number; y: number; count: number }[];
    topElements: { tag: string; text: string; href?: string; clicks: number }[];
}

export function generateVisitorHash(ip: string, userAgent: string): string {
    const data = `${ip}:${userAgent}`;
    return crypto.createHash("sha256").update(data).digest("hex").slice(0, 32);
}

export function parseUserAgent(ua: string): {
    deviceType: "desktop" | "mobile" | "tablet";
    browser: string;
    os: string;
} {
    const uaLower = ua.toLowerCase();

    let deviceType: "desktop" | "mobile" | "tablet" = "desktop";
    if (/tablet|ipad|playbook|silk/i.test(ua)) {
        deviceType = "tablet";
    } else if (
        /mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)
    ) {
        deviceType = "mobile";
    }

    let browser = "Other";
    if (uaLower.includes("firefox")) browser = "Firefox";
    else if (uaLower.includes("edg")) browser = "Edge";
    else if (uaLower.includes("chrome")) browser = "Chrome";
    else if (uaLower.includes("safari")) browser = "Safari";
    else if (uaLower.includes("opera") || uaLower.includes("opr"))
        browser = "Opera";

    let os = "Other";
    if (uaLower.includes("windows")) os = "Windows";
    else if (uaLower.includes("mac os")) os = "macOS";
    else if (uaLower.includes("linux")) os = "Linux";
    else if (uaLower.includes("android")) os = "Android";
    else if (uaLower.includes("iphone") || uaLower.includes("ipad")) os = "iOS";

    return { deviceType, browser, os };
}

export function extractReferrerDomain(referrer: string): string | null {
    if (!referrer) return null;
    try {
        const url = new URL(referrer);
        return url.hostname;
    } catch {
        return null;
    }
}

export async function recordPageView(event: PageViewEvent): Promise<void> {
    const supabase = createAdminClient();
    const today = new Date().toISOString().split("T")[0];
    const currentHour = new Date().getHours();

    const { data: isUnique } = await (supabase.rpc as any)(
        "check_visitor_session",
        {
            p_portfolio_id: event.portfolioId,
            p_visitor_hash: event.visitorHash,
        },
    );

    await (supabase.rpc as any)("increment_page_view", {
        p_portfolio_id: event.portfolioId,
        p_date: today,
        p_hour: currentHour,
        p_is_unique: isUnique ?? false,
    });

    if (event.countryCode) {
        await (supabase.rpc as any)("increment_geo_stat", {
            p_portfolio_id: event.portfolioId,
            p_date: today,
            p_country_code: event.countryCode,
            p_country_name: event.countryName ?? event.countryCode,
            p_is_unique: isUnique ?? false,
        });
    }

    if (event.referrerDomain) {
        await (supabase.rpc as any)("increment_referrer_stat", {
            p_portfolio_id: event.portfolioId,
            p_date: today,
            p_referrer_domain: event.referrerDomain,
            p_referrer_url: event.referrerUrl ?? "",
        });
    }

    await (supabase.rpc as any)("increment_device_stat", {
        p_portfolio_id: event.portfolioId,
        p_date: today,
        p_device_type: event.deviceType,
        p_browser: event.browser ?? "Unknown",
        p_os: event.os ?? "Unknown",
    });
}

export async function recordClicks(clicks: ClickEvent[]): Promise<void> {
    if (clicks.length === 0) return;

    const supabase = createAdminClient();
    const today = new Date().toISOString().split("T")[0];

    const clicksData = clicks.map((click) => ({
        portfolio_id: click.portfolioId,
        date: today,
        x_percent: Math.round(click.xPercent),
        y_percent: Math.round(click.yPercent),
        element_tag: click.elementTag?.slice(0, 50),
        element_text: click.elementText?.slice(0, 255),
        element_href: click.elementHref?.slice(0, 500),
        click_count: 1,
    }));

    await (supabase.from as any)("portfolio_clicks").insert(clicksData);
}

export async function getAnalyticsSummary(
    portfolioId: string,
    days = 30,
): Promise<AnalyticsSummary> {
    const supabase = createAdminClient();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const startDateStr = startDate.toISOString().split("T")[0];

    const { data: viewsByDay } = (await (supabase.from as any)(
        "portfolio_page_views",
    )
        .select("date, views, unique_visitors")
        .eq("portfolio_id", portfolioId)
        .gte("date", startDateStr)
        .is("hour", null)
        .order("date", { ascending: true })) as { data: PageViewRow[] | null };

    let dailyViews: PageViewRow[] = viewsByDay || [];
    if (dailyViews.length === 0) {
        const { data: hourlyViews } = (await (supabase.from as any)(
            "portfolio_page_views",
        )
            .select("date, views, unique_visitors")
            .eq("portfolio_id", portfolioId)
            .gte("date", startDateStr)
            .order("date", { ascending: true })) as {
            data: PageViewRow[] | null;
        };

        const dailyMap = new Map<string, { views: number; unique: number }>();
        for (const hv of hourlyViews || []) {
            const existing = dailyMap.get(hv.date) || { views: 0, unique: 0 };
            dailyMap.set(hv.date, {
                views: existing.views + hv.views,
                unique: existing.unique + hv.unique_visitors,
            });
        }
        dailyViews = Array.from(dailyMap.entries()).map(([date, data]) => ({
            date,
            views: data.views,
            unique_visitors: data.unique,
        }));
    }

    const totalViews = dailyViews.reduce((sum, d) => sum + (d.views || 0), 0);
    const uniqueVisitors = dailyViews.reduce(
        (sum, d) => sum + (d.unique_visitors || 0),
        0,
    );

    const { data: geoStats } = (await (supabase.from as any)(
        "portfolio_geo_stats",
    )
        .select("country_code, country_name, views")
        .eq("portfolio_id", portfolioId)
        .gte("date", startDateStr)
        .order("views", { ascending: false })
        .limit(10)) as { data: GeoStatRow[] | null };

    const countryMap = new Map<string, { name: string; views: number }>();
    for (const gs of geoStats || []) {
        const existing = countryMap.get(gs.country_code) || {
            name: gs.country_name,
            views: 0,
        };
        countryMap.set(gs.country_code, {
            name: gs.country_name,
            views: existing.views + gs.views,
        });
    }
    const topCountries = Array.from(countryMap.entries())
        .map(([code, data]) => ({ code, name: data.name, views: data.views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10);

    const { data: referrerStats } = (await (supabase.from as any)(
        "portfolio_referrers",
    )
        .select("referrer_domain, views")
        .eq("portfolio_id", portfolioId)
        .gte("date", startDateStr)
        .order("views", { ascending: false })
        .limit(10)) as { data: ReferrerRow[] | null };

    const referrerMap = new Map<string, number>();
    for (const rs of referrerStats || []) {
        const existing = referrerMap.get(rs.referrer_domain) || 0;
        referrerMap.set(rs.referrer_domain, existing + rs.views);
    }
    const topReferrers = Array.from(referrerMap.entries())
        .map(([domain, views]) => ({ domain, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10);

    const { data: deviceStats } = (await (supabase.from as any)(
        "portfolio_device_stats",
    )
        .select("device_type, browser, views")
        .eq("portfolio_id", portfolioId)
        .gte("date", startDateStr)) as { data: DeviceStatRow[] | null };

    const deviceMap = new Map<string, number>();
    const browserMap = new Map<string, number>();
    for (const ds of deviceStats || []) {
        deviceMap.set(
            ds.device_type,
            (deviceMap.get(ds.device_type) || 0) + ds.views,
        );
        browserMap.set(
            ds.browser,
            (browserMap.get(ds.browser) || 0) + ds.views,
        );
    }

    const deviceBreakdown = Array.from(deviceMap.entries())
        .map(([type, views]) => ({ type, views }))
        .sort((a, b) => b.views - a.views);

    const browserBreakdown = Array.from(browserMap.entries())
        .map(([browser, views]) => ({ browser, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);

    return {
        totalViews,
        uniqueVisitors,
        viewsByDay: dailyViews.map((d) => ({
            date: d.date,
            views: d.views || 0,
            unique: d.unique_visitors || 0,
        })),
        topCountries,
        topReferrers,
        deviceBreakdown,
        browserBreakdown,
    };
}

export async function getHeatmapData(
    portfolioId: string,
    days = 30,
): Promise<HeatmapData> {
    const supabase = createAdminClient();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const startDateStr = startDate.toISOString().split("T")[0];

    const { data: clicks } = (await (supabase.from as any)("portfolio_clicks")
        .select(
            "x_percent, y_percent, click_count, element_tag, element_text, element_href",
        )
        .eq("portfolio_id", portfolioId)
        .gte("date", startDateStr)) as { data: ClickRow[] | null };

    const positionMap = new Map<string, number>();
    const elementMap = new Map<
        string,
        { tag: string; text: string; href?: string; clicks: number }
    >();

    for (const click of clicks || []) {
        const x = Math.round(click.x_percent / 2) * 2;
        const y = Math.round(click.y_percent / 2) * 2;
        const key = `${x},${y}`;
        positionMap.set(key, (positionMap.get(key) || 0) + click.click_count);

        if (click.element_tag) {
            const elemKey = `${click.element_tag}:${click.element_text || ""}:${click.element_href || ""}`;
            const existing = elementMap.get(elemKey);
            if (existing) {
                existing.clicks += click.click_count;
            } else {
                elementMap.set(elemKey, {
                    tag: click.element_tag,
                    text: click.element_text || "",
                    href: click.element_href || undefined,
                    clicks: click.click_count,
                });
            }
        }
    }

    const heatmapClicks = Array.from(positionMap.entries()).map(
        ([key, count]) => {
            const [x, y] = key.split(",").map(Number);
            return { x, y, count };
        },
    );

    const topElements = Array.from(elementMap.values())
        .sort((a, b) => b.clicks - a.clicks)
        .slice(0, 20);

    return {
        clicks: heatmapClicks,
        topElements,
    };
}

export async function getPortfolioIdBySubdomain(
    subdomain: string,
): Promise<string | null> {
    const supabase = createAdminClient();
    const { data } = await supabase
        .from("user_portfolios")
        .select("id")
        .eq("subdomain", subdomain)
        .eq("is_published", true)
        .single();

    return data?.id || null;
}
