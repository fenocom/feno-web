/**
 * Set a user as admin
 * Usage: npx tsx scripts/set-admin.ts user@example.com
 */

import { createClient } from "@supabase/supabase-js";

const email = process.argv[2];

if (!email) {
	console.error("Usage: npx tsx scripts/set-admin.ts <email>");
	process.exit(1);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost:54321";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceRoleKey) {
	console.error("SUPABASE_SERVICE_ROLE_KEY is required");
	console.error("Run: source .env.local && npx tsx scripts/set-admin.ts <email>");
	process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
	auth: {
		autoRefreshToken: false,
		persistSession: false,
	},
});

async function setAdmin() {
	// Get user by email
	const { data: users, error: listError } = await supabase.auth.admin.listUsers();

	if (listError) {
		console.error("Error listing users:", listError.message);
		process.exit(1);
	}

	const user = users.users.find((u) => u.email === email);

	if (!user) {
		console.error(`User with email "${email}" not found`);
		process.exit(1);
	}

	// Update user metadata
	const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
		app_metadata: { ...user.app_metadata, role: "admin" },
	});

	if (updateError) {
		console.error("Error updating user:", updateError.message);
		process.exit(1);
	}

	console.log(`✓ User "${email}" is now an admin`);
	console.log(`  User ID: ${user.id}`);
}

setAdmin();
