"use client";

import { Avatar, Button, Input } from "@heroui/react";

interface FormProps {
    name: string;
    setName: (name: string) => void;
    author: string;
    avatarUrl?: string;
    saveStatus: "idle" | "success" | "error";
    onSave: () => void;
}

export const Form = ({
    name,
    setName,
    author,
    avatarUrl,
    saveStatus,
    onSave,
}: FormProps) => (
    <div className="flex-1 flex flex-col gap-5">
        <div className="space-y-4 flex-1">
            <div className="space-y-1.5">
                <span className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 ml-1">
                    Template Name
                </span>
                <Input
                    aria-label="Template Name"
                    placeholder="e.g., Professional Modern"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-neutral-50 hover:bg-neutral-100 focus-within:bg-white border-none shadow-none rounded-xl px-4 py-3 text-sm"
                />
            </div>
            <div className="space-y-1.5">
                <span className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 ml-1">
                    Author
                </span>
                <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-100/50">
                    <Avatar size="sm">
                        <Avatar.Image src={avatarUrl} alt={author} />
                        <Avatar.Fallback>{author.slice(0, 2).toUpperCase()}</Avatar.Fallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-neutral-900">
                            {author || "Unknown"}
                        </span>
                        <span className="text-xs text-neutral-500">Template Creator</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="pt-4 mt-auto">
            <Button
                size="lg"
                className={`font-semibold rounded-xl text-white ${saveStatus === "success" ? "bg-green-600" : "bg-black"}`}
                onPress={onSave}
            >
                {saveStatus === "success" ? "Saved Successfully" : "Save Template"}
            </Button>
        </div>
    </div>
);
