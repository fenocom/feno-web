"use client";

import type {
    AnalyticsSummary,
    HeatmapData,
} from "@/lib/services/portfolio-analytics";
import { useCallback, useEffect, useState } from "react";

interface UsePortfolioAnalyticsOptions {
    portfolioId: string | null;
    days?: number;
    autoFetch?: boolean;
}

interface UsePortfolioAnalyticsResult {
    summary: AnalyticsSummary | null;
    heatmap: HeatmapData | null;
    isLoading: boolean;
    error: string | null;
    fetchSummary: () => Promise<void>;
    fetchHeatmap: () => Promise<void>;
    refetch: () => Promise<void>;
}

export function usePortfolioAnalytics({
    portfolioId,
    days = 30,
    autoFetch = true,
}: UsePortfolioAnalyticsOptions): UsePortfolioAnalyticsResult {
    const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
    const [heatmap, setHeatmap] = useState<HeatmapData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSummary = useCallback(async () => {
        if (!portfolioId) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `/api/analytics/stats?portfolioId=${portfolioId}&type=summary&days=${days}`,
            );

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to fetch analytics");
            }

            const data = await response.json();
            setSummary(data);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to fetch analytics",
            );
        } finally {
            setIsLoading(false);
        }
    }, [portfolioId, days]);

    const fetchHeatmap = useCallback(async () => {
        if (!portfolioId) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `/api/analytics/stats?portfolioId=${portfolioId}&type=heatmap&days=${days}`,
            );

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to fetch heatmap");
            }

            const data = await response.json();
            setHeatmap(data);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to fetch heatmap",
            );
        } finally {
            setIsLoading(false);
        }
    }, [portfolioId, days]);

    const refetch = useCallback(async () => {
        await Promise.all([fetchSummary(), fetchHeatmap()]);
    }, [fetchSummary, fetchHeatmap]);

    useEffect(() => {
        if (autoFetch && portfolioId) {
            fetchSummary();
        }
    }, [autoFetch, portfolioId, fetchSummary]);

    return {
        summary,
        heatmap,
        isLoading,
        error,
        fetchSummary,
        fetchHeatmap,
        refetch,
    };
}
