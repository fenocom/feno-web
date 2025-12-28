"use client";

import type { AiUsageResponse } from "@/lib/ai/types";
import { useCallback, useEffect, useState } from "react";

export function useAiUsage() {
    const [usage, setUsage] = useState<AiUsageResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUsage = useCallback(async () => {
        try {
            const response = await fetch("/api/ai/usage");
            if (response.ok) {
                const data = await response.json();
                setUsage(data);
            }
        } catch {
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsage();
    }, [fetchUsage]);

    const hasAccess = usage?.hasAccess ?? false;
    const remaining = usage?.usage?.remaining ?? 0;
    const limit = usage?.usage?.limit ?? 0;
    const periodType = usage?.usage?.periodType;
    const isLimitReached = hasAccess && remaining === 0;

    return {
        usage,
        isLoading,
        hasAccess,
        remaining,
        limit,
        periodType,
        isLimitReached,
        refetch: fetchUsage,
    };
}
