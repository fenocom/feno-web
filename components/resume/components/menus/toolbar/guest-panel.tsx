"use client";

import { Button, Separator } from "@heroui/react";
import { IconCloudUpload, IconDownload, IconLogin } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface GuestPanelProps {
    onClose: () => void;
    onExport?: () => void;
}

export function GuestPanel({ onClose, onExport }: GuestPanelProps) {
    const router = useRouter();

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-black/5">
                <div className="flex items-center gap-2">
                    <IconCloudUpload size={20} />
                    <span className="font-semibold text-sm">Save Resume</span>
                </div>
            </div>
            <div className="flex-1 p-4 space-y-3">
                <p className="text-sm text-black/60">
                    Login to save your resume to the cloud and access it from anywhere.
                </p>
                <Button
                    className="w-full bg-black text-white flex items-center gap-2"
                    onPress={() => {
                        router.push("/login");
                        onClose();
                    }}
                >
                    <IconLogin size={18} />
                    Login to Save
                </Button>
                {onExport && (
                    <>
                        <Separator className="my-3" />
                        <Button
                            variant="ghost"
                            className="w-full flex items-center gap-2"
                            onPress={onExport}
                        >
                            <IconDownload size={18} />
                            Download as PDF
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}
