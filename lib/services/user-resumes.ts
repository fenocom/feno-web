import { createAdminClient } from "@/lib/supabase/admin";

export interface UserResume {
    id: string;
    user_id: string;
    name: string;
    resume_data: Record<string, unknown>;
    is_default: boolean;
    created_at: string;
    updated_at: string;
}

export interface CreateResumeInput {
    userId: string;
    name: string;
    resumeData: Record<string, unknown>;
    isDefault?: boolean;
}

export interface UpdateResumeInput {
    name?: string;
    resumeData?: Record<string, unknown>;
    isDefault?: boolean;
}

export async function getUserResumes(userId: string): Promise<UserResume[]> {
    const supabase = createAdminClient();

    // biome-ignore lint/suspicious/noExplicitAny: user_resumes table not in generated types yet
    const { data, error } = await (supabase as any)
        .from("user_resumes")
        .select("*")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false });

    if (error) {
        console.error("Failed to get user resumes:", error);
        throw new Error("Failed to get resumes");
    }

    return data || [];
}

export async function getResumeById(
    resumeId: string,
    userId: string,
): Promise<UserResume | null> {
    const supabase = createAdminClient();

    // biome-ignore lint/suspicious/noExplicitAny: user_resumes table not in generated types yet
    const { data, error } = await (supabase as any)
        .from("user_resumes")
        .select("*")
        .eq("id", resumeId)
        .eq("user_id", userId)
        .single();

    if (error) {
        if (error.code === "PGRST116") {
            return null;
        }
        console.error("Failed to get resume:", error);
        throw new Error("Failed to get resume");
    }

    return data;
}

export async function getDefaultResume(
    userId: string,
): Promise<UserResume | null> {
    const supabase = createAdminClient();

    // biome-ignore lint/suspicious/noExplicitAny: user_resumes table not in generated types yet
    const { data, error } = await (supabase as any)
        .from("user_resumes")
        .select("*")
        .eq("user_id", userId)
        .eq("is_default", true)
        .single();

    if (error) {
        if (error.code === "PGRST116") {
            return null;
        }
        console.error("Failed to get default resume:", error);
        throw new Error("Failed to get default resume");
    }

    return data;
}

export async function createResume(
    input: CreateResumeInput,
): Promise<UserResume> {
    const supabase = createAdminClient();

    // biome-ignore lint/suspicious/noExplicitAny: user_resumes table not in generated types yet
    const { data, error } = await (supabase as any)
        .from("user_resumes")
        .insert({
            user_id: input.userId,
            name: input.name,
            resume_data: input.resumeData,
            is_default: input.isDefault ?? false,
        })
        .select()
        .single();

    if (error) {
        console.error("Failed to create resume:", error);
        throw new Error("Failed to create resume");
    }

    return data;
}

export async function updateResume(
    resumeId: string,
    userId: string,
    input: UpdateResumeInput,
): Promise<UserResume> {
    const supabase = createAdminClient();

    const updateData: Record<string, unknown> = {};
    if (input.name !== undefined) updateData.name = input.name;
    if (input.resumeData !== undefined)
        updateData.resume_data = input.resumeData;
    if (input.isDefault !== undefined) updateData.is_default = input.isDefault;

    // biome-ignore lint/suspicious/noExplicitAny: user_resumes table not in generated types yet
    const { data, error } = await (supabase as any)
        .from("user_resumes")
        .update(updateData)
        .eq("id", resumeId)
        .eq("user_id", userId)
        .select()
        .single();

    if (error) {
        console.error("Failed to update resume:", error);
        throw new Error("Failed to update resume");
    }

    return data;
}

export async function deleteResume(
    resumeId: string,
    userId: string,
): Promise<void> {
    const supabase = createAdminClient();

    // biome-ignore lint/suspicious/noExplicitAny: user_resumes table not in generated types yet
    const { error } = await (supabase as any)
        .from("user_resumes")
        .delete()
        .eq("id", resumeId)
        .eq("user_id", userId);

    if (error) {
        console.error("Failed to delete resume:", error);
        throw new Error("Failed to delete resume");
    }
}
