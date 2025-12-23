"use client";

import { Avatar, Button, ComboBox, Input, Label, ListBox, Switch } from "@heroui/react";

interface FormProps {
    name: string;
    setName: (name: string) => void;
    author: string;
    avatarUrl?: string;
    saveStatus: "idle" | "success" | "error";
    onSave: () => void;
    tier: number;
    setTier: (tier: number) => void;
    isAnonymous: boolean;
    setIsAnonymous: (val: boolean) => void;
}

const TIER_OPTIONS = [
    { key: 0, text: "Tier 0 - Public (Free)", description: "Free for everyone" },
    { key: 1, text: "Tier 1 - Logged In (Free)", description: "Free for signed up users" },
    { key: 2, text: "Tier 2 - Premium", description: "Paid subscribers only" },
];

export const Form = ({
    name,
    setName,
    author,
    avatarUrl,
    saveStatus,
    onSave,
    tier,
    setTier,
    isAnonymous,
    setIsAnonymous,
}: FormProps) => {
    return (
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
                    <ComboBox 
                        selectedKey={tier.toString()} 
                        onSelectionChange={(key) => key && setTier(Number(key))}
                        defaultSelectedKey="0"
                        aria-label="Access Tier"
                    >
                        <Label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 ml-1 mb-1.5">Access Tier</Label>
                        <ComboBox.InputGroup>
                            <Input className="w-full bg-neutral-50 hover:bg-neutral-100 focus-within:bg-white border-none shadow-none rounded-xl px-4 py-3 text-sm" />
                            <ComboBox.Trigger />
                        </ComboBox.InputGroup>
                        <ComboBox.Popover>
                            <ListBox>
                                {TIER_OPTIONS.map((option) => (
                                    <ListBox.Item id={option.key.toString()} key={option.key} textValue={option.text}>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{option.text}</span>
                                            <span className="text-xs text-neutral-500">{option.description}</span>
                                        </div>
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </ComboBox.Popover>
                    </ComboBox>
                </div>

                <div className="space-y-1.5">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 ml-1">
                        Author
                    </span>
                    <div className={`flex flex-col gap-4 p-3 bg-neutral-50 rounded-xl border border-neutral-100/50 transition-opacity ${isAnonymous ? 'opacity-50' : 'opacity-100'}`}>
                        <div className="flex items-center gap-3">
                            <Avatar size="sm">
                                <Avatar.Image src={isAnonymous ? undefined : avatarUrl} alt={author} />
                                <Avatar.Fallback>
                                    {isAnonymous ? "?" : author.slice(0, 2).toUpperCase()}
                                </Avatar.Fallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-neutral-900">
                                    {isAnonymous ? "Anonymous" : (author || "Unknown")}
                                </span>
                                <span className="text-xs text-neutral-500">
                                    Template Creator
                                </span>
                            </div>
                        </div>
                        
                        <div className="pt-2 border-t border-neutral-200/50">
                            <Switch isSelected={isAnonymous} onChange={setIsAnonymous}>
                                <Switch.Control>
                                    <Switch.Thumb />
                                </Switch.Control>
                                <Label className="text-sm font-medium text-neutral-700">Anonymous Author</Label>
                            </Switch>
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
                    {saveStatus === "success"
                        ? "Saved Successfully"
                        : "Save Template"}
                </Button>
            </div>
        </div>
    );
};