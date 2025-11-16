import { GoogleSignin } from "@/libs/components/auth/signin";
import type { Metadata } from "next";
import { ErrorDisplay } from "./error-display";

export const metadata: Metadata = {
    title: "Sign In | Feno — Your Story, Beautifully Told",
    description:
        "Access your Feno account to manage and create stunning digital portfolios from your resume.",
};

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string; error_description?: string }>;
}) {
    const params = await searchParams;

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            {params.error && (
                <ErrorDisplay
                    error={params.error}
                    description={params.error_description}
                />
            )}
            <GoogleSignin />
        </div>
    );
}
