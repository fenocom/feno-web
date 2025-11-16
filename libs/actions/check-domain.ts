"use server";

import logger from "@/libs/utils/logger";
import { createSupabaseServerClient } from "@/supabase/utils/client/server";
import { supabaseOption } from "@/supabase/utils/config";

/**
 * Check if a domain is available
 */
export async function checkDomainAvailability(domain: string) {
    try {
        const supabase = await createSupabaseServerClient(supabaseOption);

        // Check if domain exists in websites table
        const { data: websiteData, error: websiteError } = await supabase
            .from("websites")
            .select("id")
            .eq("domain", domain)
            .maybeSingle();

        if (websiteError) throw websiteError;

        // Check if domain exists in domains table
        const { data: domainData, error: domainError } = await supabase
            .from("domains")
            .select("id")
            .eq("domain", domain)
            .maybeSingle();

        if (domainError) throw domainError;

        // Domain is available if it doesn't exist in either table
        return {
            available: !websiteData && !domainData,
            message:
                !websiteData && !domainData
                    ? "Domain is available"
                    : "Domain is already taken",
        };
    } catch (error) {
        logger.error({ error }, "Error checking domain availability");
        return {
            available: false,
            message: "Error checking domain availability",
        };
    }
}
