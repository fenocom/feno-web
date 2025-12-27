import {
    deleteResume,
    getResumeById,
    updateResume,
} from "@/lib/services/user-resumes";
import { createClient } from "@/lib/supabase/server";
import type { NextRequest } from "next/server";

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
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

    try {
        const { id } = await params;
        const resume = await getResumeById(id, user.id);

        if (!resume) {
            return new Response(JSON.stringify({ error: "Resume not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ resume }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Failed to get resume:", error);
        return new Response(JSON.stringify({ error: "Failed to get resume" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
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

    try {
        const { id } = await params;
        const body = await req.json();
        const { name, resumeData, isDefault } = body;

        const resume = await updateResume(id, user.id, {
            name,
            resumeData,
            isDefault,
        });

        return new Response(JSON.stringify({ resume }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Failed to update resume:", error);
        return new Response(
            JSON.stringify({ error: "Failed to update resume" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
        );
    }
}

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
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

    try {
        const { id } = await params;
        await deleteResume(id, user.id);

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Failed to delete resume:", error);
        return new Response(
            JSON.stringify({ error: "Failed to delete resume" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
        );
    }
}
