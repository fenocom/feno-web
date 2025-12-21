import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const supabase = await createClient();

        // Get the current user
        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        // Check if user is admin (set via app_metadata.role)
        if (user.app_metadata?.role !== "admin") {
            return NextResponse.json(
                { error: "Forbidden: Admin access required" },
                { status: 403 },
            );
        }

        const body = await request.json();
        const { name, author, category, resume_data } = body;

        if (!resume_data) {
            return NextResponse.json(
                { error: "resume_data is required" },
                { status: 400 },
            );
        }

        // Insert the template
        const { data, error } = await supabase
            .from("resume_templates")
            .insert({
                creator_id: user.id,
                name,
                author,
                category,
                resume_data,
            })
            .select()
            .single();

        if (error) {
            console.error("Error creating template:", error);
            return NextResponse.json(
                { error: "Failed to create template" },
                { status: 500 },
            );
        }

        return NextResponse.json({ data }, { status: 201 });
    } catch (error) {
        console.error("Error in POST /api/admin/templates:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = Number.parseInt(searchParams.get("page") || "1");
        const limit = Number.parseInt(searchParams.get("limit") || "10");
        const author = searchParams.get("author");

        const supabase = await createClient();

        let query = supabase
            .from("resume_templates")
            .select("*, creator:profiles(avatar_url)", { count: "exact" });

        if (author) {
            query = query.ilike("author", `%${author}%`);
        }

        const from = (page - 1) * limit;
        const to = from + limit - 1;

        const { data, error, count } = await query
            .order("created_at", { ascending: false })
            .range(from, to);

        if (error) {
            console.error("Error fetching templates:", error);
            return NextResponse.json(
                { error: "Failed to fetch templates" },
                { status: 500 },
            );
        }

        return NextResponse.json({
            data,
            metadata: {
                total: count,
                page,
                limit,
            },
        });
    } catch (error) {
        console.error("Error in GET /api/admin/templates:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}
