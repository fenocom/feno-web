
import { createSupabaseServerClient } from "@/supabase/utils";
import { supabaseOption } from "@/supabase/utils/config";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const redirectTo = requestUrl.searchParams.get("redirectTo");
  const next = redirectTo || requestUrl.searchParams.get("next") || "/lobby";

  if (code) {
    const supabase = await createSupabaseServerClient(supabaseOption);
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      redirect(`/?error=${encodeURIComponent(error.message)}`);
    }
  }

  redirect(next);
}
