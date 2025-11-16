"use client";

import { Button } from "@/libs/ui/button";
import { createSupabaseBrowserClient } from "@/supabase/utils/client/browser";
import { useState } from "react";

export function GoogleSignin() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const supabase = createSupabaseBrowserClient({
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    });

    const handleSignin = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const { error: oauthError } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/api/auth/callback`,
                    queryParams: {
                        access_type: "offline",
                        prompt: "consent",
                    },
                },
            });

            if (oauthError) {
                setError(oauthError.message);
                console.error("OAuth error:", oauthError);
            }
            // If successful, the user will be redirected automatically
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
            setError(errorMessage);
            console.error("Sign in error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <Button onClick={handleSignin} disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in with Google"}
            </Button>
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}
