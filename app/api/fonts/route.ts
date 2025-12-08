import { NextResponse } from "next/server";

const GOOGLE_FONTS_API_KEY = process.env.GOOGLE_WEB_FONT_API_KEY;

export async function GET(request: Request) {
    if (!GOOGLE_FONTS_API_KEY) {
        return NextResponse.json(
            { error: "Google Fonts API key is missing" },
            { status: 500 },
        );
    }

    const { searchParams } = new URL(request.url);
    const sort = searchParams.get("sort") || "popularity";

    // Google Fonts API doesn't support server-side pagination efficiently in the basic endpoint,
    // it returns all fonts. We will fetch all and paginate manually or cache.
    // However, for performance, we can just return the top N fonts sorted by popularity.

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
