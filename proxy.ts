import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { ratelimit } from "@/lib/ratelimit";

export async function proxy(request: NextRequest) {
    let response = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    for (const { name, value } of cookiesToSet) {
                        request.cookies.set(name, value);
                    }
                    response = NextResponse.next({
                        request,
                    });
                    for (const { name, value, options } of cookiesToSet) {
                        response.cookies.set(name, value, options);
                    }
                },
            },
        },
    );

    await supabase.auth.getUser();

    if (request.nextUrl.pathname.startsWith("/api")) {
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "127.0.0.1";
        try {
            const { success, limit, reset, remaining } = await ratelimit.limit(ip);

            if (!success) {
                return new NextResponse("Too Many Requests", {
                    status: 429,
                    headers: {
                        "X-RateLimit-Limit": limit.toString(),
                        "X-RateLimit-Remaining": remaining.toString(),
                        "X-RateLimit-Reset": reset.toString(),
                    },
                });
            }

            response.headers.set("X-RateLimit-Limit", limit.toString());
            response.headers.set("X-RateLimit-Remaining", remaining.toString());
            response.headers.set("X-RateLimit-Reset", reset.toString());
        } catch (error) {
            console.error("Rate limit error:", error);
        }
    }

    return response;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};