import type { User } from "@supabase/supabase-js";

export function getUserTier(user: User | null | undefined): number {
    if (!user) return 0;

    const appMeta = user.app_metadata || {};

    if (appMeta.tier !== undefined) {
        const parsed = Number(appMeta.tier);
        if (!Number.isNaN(parsed)) return parsed;
    }

    // Default for authenticated users
    return 1;
}
