"use client";

import dynamic from "next/dynamic";

const ResumeBuilder = dynamic(
    () =>
        import("@/libs/components/resume-builder/resume-builder").then(
            (mod) => ({ default: mod.ResumeBuilder }),
        ),
    {
        ssr: false,
    },
);

export default function BuildResumePage() {
    return <ResumeBuilder />;
}
