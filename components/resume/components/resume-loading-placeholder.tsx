import { Spinner } from "@heroui/react";

export function ResumeLoadingPlaceholder() {
    return (
        <div className="w-[210mm] h-[297mm] bg-white flex items-center justify-center shadow-2xl">
            <Spinner size="lg" color="default" className="text-black" />
        </div>
    );
}
