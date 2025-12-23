import { createTemplate, getTemplates } from "@/lib/services/templates";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
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

        if (user.app_metadata?.role !== "admin") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const body = await request.json();
        const {
            name,
            category,
            resume_data,
            tier = 0,
            is_anonymous = false,
        } = body;

        if (!resume_data) {
            return NextResponse.json(
                { error: "Missing data" },
                { status: 400 },
            );
        }

        const { data, error } = await createTemplate({
            creator_id: user.id,
            name,
            category,
            resume_data,
            tier,
            is_anonymous,
        });

        if (error) {
            console.error(error);
            return NextResponse.json(
                { error: "Failed to create" },
                { status: 500 },
            );
        }

        return NextResponse.json({ data }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = Number.parseInt(searchParams.get("page") || "1");
        const limit = Number.parseInt(searchParams.get("limit") || "10");

        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        let maxTier = 0;
        if (user) {
            // Default to 1 (Free Logged In)
            maxTier = 1;

            // Use tier from app_metadata if present
            const metadataTier = user.app_metadata?.tier;
            if (typeof metadataTier === "number") {
                maxTier = metadataTier;
            } else {
                // Backward compatibility: Check for plan 'premium'
                const isPremium =
                    user.app_metadata?.plan === "premium" ||
                    user.user_metadata?.plan === "premium";
                if (isPremium) maxTier = 2;
            }
        }

        const { data, count } = await getTemplates({
            page,
            limit,
            maxTier,
            userId: user?.id,
        });

        return NextResponse.json({
            data,
            metadata: {
                total: count,
                page,
                limit,
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
