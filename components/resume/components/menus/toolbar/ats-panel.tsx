"use client";

import { useAiUsage } from "@/lib/hooks/use-ai-usage";
import { Button } from "@heroui/react";
import {
    IconAlertCircle,
    IconCheck,
    IconChevronDown,
    IconChevronUp,
    IconLoader2,
    IconTargetArrow,
} from "@tabler/icons-react";
import type { Editor } from "@tiptap/core";
import { useCallback, useState } from "react";

interface AtsPanelProps {
    editor: Editor | null;
    onAnalyzingChange?: (isAnalyzing: boolean) => void;
}

interface AtsIssue {
    severity: "high" | "medium" | "low";
    issue: string;
    suggestion: string;
}

interface AtsAnalysis {
    score: number;
    summary: string;
    strengths: string[];
    issues: AtsIssue[];
    keywords: {
        found: string[];
        missing: string[];
    };
}

function extractTextFromEditor(editor: Editor): string {
    return editor.getText();
}

function getScoreColor(score: number): string {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
}

function getScoreBgColor(score: number): string {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-yellow-100";
    return "bg-red-100";
}

function getSeverityColor(severity: string): string {
    if (severity === "high") return "bg-red-100 text-red-700";
    if (severity === "medium") return "bg-yellow-100 text-yellow-700";
    return "bg-blue-100 text-blue-700";
}

export const AtsPanel = ({ editor, onAnalyzingChange }: AtsPanelProps) => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<AtsAnalysis | null>(null);
    const [showDetails, setShowDetails] = useState(false);
    const {
        hasAccess,
        remaining,
        limit,
        periodType,
        isLimitReached,
        isLoading: isLoadingUsage,
        usage,
        refetch,
    } = useAiUsage();

    const handleAnalyze = useCallback(async () => {
        if (!editor) return;

        setError(null);
        setIsAnalyzing(true);
        setAnalysis(null);
        onAnalyzingChange?.(true);

        try {
            const resumeText = extractTextFromEditor(editor);

            if (!resumeText.trim()) {
                throw new Error("Resume is empty");
            }

            const response = await fetch("/api/ai/ats", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ resumeText }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to analyze resume");
            }

            setAnalysis(data.analysis);
            refetch();
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to analyze resume",
            );
        } finally {
            setIsAnalyzing(false);
            onAnalyzingChange?.(false);
        }
    }, [editor, onAnalyzingChange, refetch]);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-black/5">
                <div className="flex items-center gap-2">
                    <IconTargetArrow size={20} />
                    <span className="font-semibold text-sm">ATS Score</span>
                </div>
                {!isLoadingUsage && hasAccess && usage?.usage && (
                    <span
                        className={`text-xs px-2 py-1 rounded ${
                            remaining === 0
                                ? "bg-red-100 text-red-600"
                                : remaining <= 3
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-black/5 text-black/50"
                        }`}
                    >
                        {remaining}/{limit}{" "}
                        {periodType === "daily" ? "today" : "this month"}
                    </span>
                )}
            </div>

            {!isLoadingUsage && !hasAccess && (
                <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 text-sm text-purple-700">
                    Upgrade to Premium to use ATS analysis
                </div>
            )}

            {isLimitReached && (
                <div className="px-4 py-2 bg-red-50 text-red-600 text-xs">
                    You've reached your {periodType} limit. Resets{" "}
                    {periodType === "daily" ? "tomorrow" : "next month"}.
                </div>
            )}

            {error && (
                <div className="px-4 py-2 bg-red-50 text-red-600 text-xs">
                    {error}
                </div>
            )}

            <div className="flex-1 overflow-y-auto p-4">
                {!analysis && !isAnalyzing && (
                    <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                        <div className="text-black/40">
                            <IconTargetArrow size={48} stroke={1.5} />
                        </div>
                        <div className="text-sm text-black/60">
                            Analyze your resume for ATS compatibility
                        </div>
                        <Button
                            size="sm"
                            className="bg-black text-white"
                            onPress={handleAnalyze}
                            isDisabled={!editor || !hasAccess || isLimitReached}
                        >
                            Analyze Resume
                        </Button>
                    </div>
                )}

                {isAnalyzing && (
                    <div className="flex flex-col items-center justify-center h-full gap-3">
                        <IconLoader2
                            size={32}
                            className="animate-spin text-black/40"
                        />
                        <span className="text-sm text-black/60">
                            Analyzing your resume...
                        </span>
                    </div>
                )}

                {analysis && !isAnalyzing && (
                    <div className="space-y-4">
                        <div
                            className={`flex items-center justify-between p-4 rounded-xl ${getScoreBgColor(analysis.score)}`}
                        >
                            <div>
                                <div className="text-xs text-black/50 uppercase tracking-wide">
                                    ATS Score
                                </div>
                                <div
                                    className={`text-3xl font-bold ${getScoreColor(analysis.score)}`}
                                >
                                    {analysis.score}
                                    <span className="text-lg">/100</span>
                                </div>
                            </div>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="text-xs"
                                onPress={handleAnalyze}
                                isDisabled={!hasAccess || isLimitReached}
                            >
                                Re-analyze
                            </Button>
                        </div>

                        <p className="text-sm text-black/70">
                            {analysis.summary}
                        </p>

                        {analysis.strengths.length > 0 && (
                            <div>
                                <div className="text-xs font-medium text-black/50 uppercase tracking-wide mb-2">
                                    Strengths
                                </div>
                                <div className="space-y-1">
                                    {analysis.strengths.map((strength) => (
                                        <div
                                            key={strength}
                                            className="flex items-start gap-2 text-sm"
                                        >
                                            <IconCheck
                                                size={16}
                                                className="text-green-600 mt-0.5 shrink-0"
                                            />
                                            <span>{strength}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {analysis.issues.length > 0 && (
                            <div>
                                <div className="text-xs font-medium text-black/50 uppercase tracking-wide mb-2">
                                    Issues to Fix
                                </div>
                                <div className="space-y-2">
                                    {analysis.issues.map((issue) => (
                                        <div
                                            key={issue.issue}
                                            className="p-3 bg-black/5 rounded-lg"
                                        >
                                            <div className="flex items-start gap-2">
                                                <IconAlertCircle
                                                    size={16}
                                                    className="text-red-500 mt-0.5 shrink-0"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-sm font-medium">
                                                            {issue.issue}
                                                        </span>
                                                        <span
                                                            className={`text-xs px-1.5 py-0.5 rounded ${getSeverityColor(issue.severity)}`}
                                                        >
                                                            {issue.severity}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-black/60">
                                                        {issue.suggestion}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button
                            type="button"
                            className="flex items-center gap-1 text-xs text-black/50 hover:text-black/70"
                            onClick={() => setShowDetails(!showDetails)}
                        >
                            {showDetails ? (
                                <IconChevronUp size={14} />
                            ) : (
                                <IconChevronDown size={14} />
                            )}
                            {showDetails ? "Hide" : "Show"} keyword analysis
                        </button>

                        {showDetails && analysis.keywords && (
                            <div className="space-y-3 pt-2">
                                {analysis.keywords.found?.length > 0 && (
                                    <div>
                                        <div className="text-xs text-black/50 mb-1">
                                            Keywords Found
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {analysis.keywords.found.map(
                                                (kw) => (
                                                    <span
                                                        key={kw}
                                                        className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded"
                                                    >
                                                        {kw}
                                                    </span>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                )}
                                {analysis.keywords.missing?.length > 0 && (
                                    <div>
                                        <div className="text-xs text-black/50 mb-1">
                                            Consider Adding
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {analysis.keywords.missing.map(
                                                (kw) => (
                                                    <span
                                                        key={kw}
                                                        className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded"
                                                    >
                                                        {kw}
                                                    </span>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
