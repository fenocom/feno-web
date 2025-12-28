import { ratelimit } from "@/lib/ratelimit";
import { type NextRequest, NextResponse } from "next/server";

const GOOGLE_FONTS_API_KEY = process.env.GOOGLE_WEB_FONT_API_KEY;

export async function GET(request: NextRequest) {
    if (!GOOGLE_FONTS_API_KEY) {
        return NextResponse.json(
            { error: "Google Fonts API key is missing" },
            { status: 500 },
        );
    }

    if (ratelimit) {
        const identifier =
            request.headers.get("x-forwarded-for") || "anonymous";
        const { success } = await ratelimit.limit(identifier);
        if (!success) {
            return NextResponse.json(
                { error: "Too many requests" },
                { status: 429 },
            );
        }
    }

    const { searchParams } = new URL(request.url);
    const sort = searchParams.get("sort") || "popularity";

    try {
        const response = await fetch(
            `https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_FONTS_API_KEY}&sort=${sort}`,
            { next: { revalidate: 3600 } }, // Cache for 1 hour
        );

        if (!response.ok) {
            throw new Error("Failed to fetch fonts");
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (_error) {
        return NextResponse.json(
            { error: "Failed to fetch fonts" },
            { status: 500 },
        );
    }
}
