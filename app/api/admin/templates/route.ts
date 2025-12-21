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
		const { resume_data } = body;

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

export async function GET() {
	try {
		const supabase = await createClient();

		const { data, error } = await supabase
			.from("resume_templates")
			.select("*")
			.order("created_at", { ascending: false });

		if (error) {
			console.error("Error fetching templates:", error);
			return NextResponse.json(
				{ error: "Failed to fetch templates" },
				{ status: 500 },
			);
		}

		return NextResponse.json({ data });
	} catch (error) {
		console.error("Error in GET /api/admin/templates:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
