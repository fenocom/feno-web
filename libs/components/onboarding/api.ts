import { dataLayer } from "@/libs/utils/api/data-layer";
import logger from "@/libs/utils/logger";

export async function checkDomainAvailability(domain: string) {
    try {
        const response = await dataLayer.post<{
            available: boolean;
            message: string;
        }>("/api/domains/check", { domain });

        return response.data;
    } catch (error) {
        logger.error({ error }, "Error checking domain availability");
        return {
            available: false,
            message: "Error checking domain availability",
        };
    }
}

export async function createWebsite({
    name,
    domain,
    collaboratorEmails,
}: {
    name: string;
    domain: string;
    collaboratorEmails: string[];
}) {
    try {
        const response = await dataLayer.post<{
            message: string;
            websiteId: string;
        }>("/api/websites/create", {
            name,
            domain,
            collaboratorEmails,
        });

        return {
            success: true,
            message: response.data.message,
            websiteId: response.data.websiteId,
        };
    } catch (error) {
        return {
            success: false,
            message:
                (error as Error & { response?: { data?: { error?: string } } })
                    ?.response?.data?.error || "Failed to create website",
            websiteId: null,
        };
    }
}
