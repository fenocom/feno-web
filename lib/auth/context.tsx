"use client";

import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

interface AuthContextType {
    user: User | null;
    isAdmin: boolean;
    isLoading: boolean;
    signInWithGoogle: () => Promise<void>;
    signInWithEmail: (
        email: string,
        password: string,
    ) => Promise<{ error: string | null }>;
    signUpWithEmail: (
        email: string,
        password: string,
        fullName?: string,
    ) => Promise<{ error: string | null }>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClient();

    // Admin is determined by app_metadata.role set via Supabase
    const isAdmin = user?.app_metadata?.role === "admin";

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setIsLoading(false);
        });

        // Initial session check
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setIsLoading(false);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    const signInWithGoogle = useCallback(async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    }, [supabase]);

    const signInWithEmail = useCallback(
        async (email: string, password: string) => {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            return { error: error?.message ?? null };
        },
        [supabase],
    );

    const signUpWithEmail = useCallback(
        async (email: string, password: string, fullName?: string) => {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName || email,
                    },
                },
            });
            return { error: error?.message ?? null };
        },
        [supabase],
    );

    const signOut = useCallback(async () => {
        await supabase.auth.signOut();
    }, [supabase]);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAdmin,
                isLoading,
                signInWithGoogle,
                signInWithEmail,
                signUpWithEmail,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
