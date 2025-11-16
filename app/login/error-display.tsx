"use client";

import { Alert, AlertDescription, AlertTitle } from "@/libs/ui/alert";
import { IconAlertCircle } from "@tabler/icons-react";

interface ErrorDisplayProps {
    error: string;
    description?: string;
}

export function ErrorDisplay({ error, description }: ErrorDisplayProps) {
    const errorMessages: Record<string, string> = {
        access_denied: "Access was denied. Please try again.",
        invalid_request: "Invalid request. Please try again.",
        exchange_failed: "Failed to complete authentication.",
        no_session: "Failed to create session. Please try again.",
        no_code: "No authorization code received.",
        unexpected_error: "An unexpected error occurred.",
    };

    const errorMessage =
        errorMessages[error] || description || "An error occurred during authentication.";

    return (
        <Alert variant="destructive" className="max-w-md">
            <IconAlertCircle className="h-4 w-4" />
            <AlertTitle>Authentication Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
    );
}

