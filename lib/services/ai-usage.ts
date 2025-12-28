import { createAdminClient } from "@/lib/supabase/admin";

export interface TokenUsage {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
}

export interface UsageLimits {
    limit: number;
    used: number;
    remaining: number;
    periodType: "monthly" | "daily";
    resetsAt: Date;
    tokens: TokenUsage;
}

export interface TierLimits {
    tier: number;
    limit: number;
    periodType: "monthly" | "daily";
}

const TIER_LIMITS: Record<number, TierLimits> = {
    0: { tier: 0, limit: 0, periodType: "monthly" },
    1: { tier: 1, limit: 0, periodType: "monthly" },
    2: { tier: 2, limit: 10, periodType: "monthly" },
    3: { tier: 3, limit: 20, periodType: "daily" },
    4: { tier: 4, limit: 20, periodType: "daily" },
    5: { tier: 5, limit: 20, periodType: "daily" },
};

function getTierLimits(tier: number): TierLimits {
    if (tier >= 3) {
        return TIER_LIMITS[3];
    }
    return TIER_LIMITS[tier] || TIER_LIMITS[0];
}

function getPeriodStart(periodType: "monthly" | "daily"): Date {
    const now = new Date();
    if (periodType === "monthly") {
        return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    }
    return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
        0,
    );
}

function getResetDate(periodType: "monthly" | "daily"): Date {
    const now = new Date();
    if (periodType === "monthly") {
        return new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0);
    }
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow;
}

export async function getAiUsage(
    userId: string,
    tier: number,
): Promise<UsageLimits> {
    const tierLimits = getTierLimits(tier);
    const periodStart = getPeriodStart(tierLimits.periodType);
    const resetsAt = getResetDate(tierLimits.periodType);

    const supabase = createAdminClient();

    const { data, error } = await supabase
        .from("ai_usage")
        .select("calls_count, input_tokens, output_tokens, total_tokens")
        .eq("user_id", userId)
        .eq("period_type", tierLimits.periodType)
        .eq("period_start", periodStart.toISOString())
        .single();

    const record = data as { calls_count: number; input_tokens: number; output_tokens: number; total_tokens: number } | null;
    const used = error || !record ? 0 : record.calls_count;
    const tokens: TokenUsage = {
        inputTokens: record?.input_tokens ?? 0,
        outputTokens: record?.output_tokens ?? 0,
        totalTokens: record?.total_tokens ?? 0,
    };

    return {
        limit: tierLimits.limit,
        used,
        remaining: Math.max(0, tierLimits.limit - used),
        periodType: tierLimits.periodType,
        resetsAt,
        tokens,
    };
}

export async function incrementAiUsage(
    userId: string,
    tier: number,
    tokens?: TokenUsage,
): Promise<{ success: boolean; usage: UsageLimits }> {
    const tierLimits = getTierLimits(tier);
    const periodStart = getPeriodStart(tierLimits.periodType);
    const resetsAt = getResetDate(tierLimits.periodType);

    const supabase = createAdminClient();

    const { data, error } = await supabase.rpc("increment_ai_usage", {
        p_user_id: userId,
        p_period_type: tierLimits.periodType,
        p_period_start: periodStart.toISOString(),
        p_input_tokens: tokens?.inputTokens ?? 0,
        p_output_tokens: tokens?.outputTokens ?? 0,
        p_total_tokens: tokens?.totalTokens ?? 0,
    });

    if (error) {
        console.error("Failed to increment AI usage:", error);
        throw new Error("Failed to track usage");
    }

    const newCount = (data as number) || 0;

    return {
        success: newCount <= tierLimits.limit,
        usage: {
            limit: tierLimits.limit,
            used: newCount,
            remaining: Math.max(0, tierLimits.limit - newCount),
            periodType: tierLimits.periodType,
            resetsAt,
            tokens: tokens ?? { inputTokens: 0, outputTokens: 0, totalTokens: 0 },
        },
    };
}

export async function checkAiUsageLimit(
    userId: string,
    tier: number,
): Promise<{ allowed: boolean; usage: UsageLimits }> {
    const usage = await getAiUsage(userId, tier);

    if (tier < 2) {
        return { allowed: false, usage };
    }

    return {
        allowed: usage.remaining > 0,
        usage,
    };
}
