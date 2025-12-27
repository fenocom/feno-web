import { ResumePage } from "@/components/resume/resume-page";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ResumeIdPage({ params }: PageProps) {
    const { id } = await params;
    return <ResumePage initialResumeId={id} />;
}
