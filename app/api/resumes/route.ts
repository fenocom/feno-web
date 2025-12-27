import { ratelimit } from "@/lib/ratelimit";
import {
    createResume,
    getDefaultResume,
    getUserResumes,
} from "@/lib/services/user-resumes";
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

    try {
        const url = new URL(req.url);
        const defaultOnly = url.searchParams.get("default") === "true";

        if (defaultOnly) {
            const resume = await getDefaultResume(user.id);
            return new Response(JSON.stringify({ resume }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }

        const resumes = await getUserResumes(user.id);
        return new Response(JSON.stringify({ resumes }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Failed to get resumes:", error);
        return new Response(
            JSON.stringify({ error: "Failed to get resumes" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
        );
    }
}

export async function POST(req: NextRequest) {
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

    try {
        const body = await req.json();
        const { name, resumeData, isDefault } = body;

        if (!resumeData) {
            return new Response(
                JSON.stringify({ error: "Resume data is required" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        const resume = await createResume({
            userId: user.id,
            name: name || "Untitled Resume",
            resumeData,
            isDefault: isDefault ?? false,
        });

        return new Response(JSON.stringify({ resume }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Failed to create resume:", error);
        return new Response(
            JSON.stringify({ error: "Failed to create resume" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
        );
    }
}
