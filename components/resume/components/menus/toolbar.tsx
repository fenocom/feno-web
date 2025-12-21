"use client";

import { AiIcon } from "@/components/common/ai-icon";
import { useAuth } from "@/lib/auth/context";
import { Button, Separator } from "@heroui/react";
import {
	IconDeviceFloppy,
	IconDownload,
	IconLogout,
	IconPalette,
	IconSettings,
	IconX,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { PortfolioButton } from "../../components/portfolio-button";

interface ToolbarProps {
	onExport?: () => void;
	getEditorContent?: () => unknown;
}

export default function Toolbar({ onExport, getEditorContent }: ToolbarProps) {
	const { user, isAdmin, signOut } = useAuth();
	const [isSaving, setIsSaving] = useState(false);
	const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
		"idle",
	);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const toolbarRef = useRef<HTMLDivElement>(null);

	// Close settings when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				toolbarRef.current &&
				!toolbarRef.current.contains(event.target as Node)
			) {
				setIsSettingsOpen(false);
			}
		};

		if (isSettingsOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isSettingsOpen]);

	const handleSaveTemplate = useCallback(async () => {
		if (!getEditorContent) return;

		setIsSaving(true);
		setSaveStatus("idle");

		try {
			const content = getEditorContent();

			const response = await fetch("/api/admin/templates", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ resume_data: content }),
			});

			if (!response.ok) {
				throw new Error("Failed to save template");
			}

			setSaveStatus("success");
			setTimeout(() => setSaveStatus("idle"), 2000);
		} catch (error) {
			console.error("Error saving template:", error);
			setSaveStatus("error");
			setTimeout(() => setSaveStatus("idle"), 2000);
		} finally {
			setIsSaving(false);
		}
	}, [getEditorContent]);

	const handleSignOut = async () => {
		await signOut();
		setIsSettingsOpen(false);
	};

	const getUserInitials = () => {
		if (!user?.email) return "?";
		const name = user.user_metadata?.full_name || user.email;
		return name
			.split(" ")
			.map((n: string) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

	const getUserName = () => {
		if (!user) return "";
		return user.user_metadata?.full_name || user.email?.split("@")[0] || "";
	};

	return (
		<motion.div
			ref={toolbarRef}
			layout
			initial={{ y: 40, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{
				duration: 0.25,
				layout: { type: "spring", stiffness: 400, damping: 30 },
			}}
			className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center shadow-xl z-999 rounded-4xl bg-white overflow-hidden"
		>
			<div className="relative z-10 text-black w-full">
				<motion.div
					layout
					className="flex flex-col border border-black/10 rounded-4xl"
				>
					{/* Settings Panel - Expands Above */}
					<AnimatePresence>
						{isSettingsOpen && user && (
							<motion.div
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: "auto", opacity: 1 }}
								exit={{ height: 0, opacity: 0 }}
								transition={{ duration: 0.2, ease: "easeInOut" }}
								className="overflow-hidden"
							>
								<div className="px-4 py-4">
									<div className="flex items-center justify-between gap-4">
										{/* User Profile */}
										<div className="flex items-center gap-3">
											{user.user_metadata?.avatar_url ? (
												<img
													src={user.user_metadata.avatar_url}
													alt="Avatar"
													className="w-10 h-10 rounded-full object-cover"
												/>
											) : (
												<div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-medium">
													{getUserInitials()}
												</div>
											)}
											<div className="flex flex-col">
												<div className="flex items-center gap-2">
													<span className="text-sm font-medium text-neutral-900">
														{getUserName()}
													</span>
													{isAdmin && (
														<span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide bg-neutral-900 text-white rounded-full">
															Admin
														</span>
													)}
												</div>
												<span className="text-xs text-neutral-500">
													{user.email}
												</span>
											</div>
										</div>

										{/* Actions */}
										<div className="flex items-center gap-2">
											<Button
												size="sm"
												variant="ghost"
												onPress={handleSignOut}
												className="h-8 px-3 rounded-lg text-red-600 hover:bg-red-50 font-medium flex items-center gap-1.5"
											>
												<IconLogout size={16} />
												Sign out
											</Button>
											<Button
												isIconOnly
												size="sm"
												variant="ghost"
												onPress={() => setIsSettingsOpen(false)}
												className="p-1 min-w-8 h-8 rounded-full text-black hover:bg-black/10"
											>
												<IconX size={18} />
											</Button>
										</div>
									</div>
								</div>

								{/* Separator */}
								<div className="px-3">
									<Separator className="w-full" />
								</div>
							</motion.div>
						)}
					</AnimatePresence>

					{/* Main Toolbar - Always Visible */}
					<div className="flex gap-2 items-center px-3 py-2">
						<AiIcon size={28} />
						<Separator orientation="vertical" className="h-6" />
						<div className="flex gap-1 items-center">
							<Button
								isIconOnly
								size="sm"
								variant="ghost"
								className="p-1 min-w-8 h-8 rounded-md text-black hover:bg-black/10"
							>
								<IconPalette size={18} />
							</Button>
							<Button
								isIconOnly
								size="sm"
								variant="ghost"
								onPress={onExport}
								className="p-1 min-w-8 h-8 rounded-md text-black hover:bg-black/10"
							>
								<IconDownload size={18} />
							</Button>
							<Button
								isIconOnly
								size="sm"
								variant="ghost"
								onPress={() => setIsSettingsOpen(!isSettingsOpen)}
								className={`p-1 min-w-8 h-8 rounded-md hover:bg-black/10 ${
									isSettingsOpen ? "bg-black/10 text-black" : "text-black"
								}`}
							>
								<IconSettings size={18} />
							</Button>
							{isAdmin && (
								<span
									title={
										saveStatus === "success"
											? "Template saved!"
											: saveStatus === "error"
												? "Failed to save"
												: "Save as template"
									}
								>
									<Button
										isIconOnly
										size="sm"
										variant="ghost"
										isDisabled={isSaving}
										onPress={handleSaveTemplate}
										className={`p-1 min-w-8 h-8 rounded-md hover:bg-black/10 ${
											saveStatus === "success"
												? "text-green-600"
												: saveStatus === "error"
													? "text-red-600"
													: "text-black"
										}`}
									>
										{isSaving ? (
											<span className="animate-spin">
												<IconDeviceFloppy size={18} />
											</span>
										) : (
											<IconDeviceFloppy size={18} />
										)}
									</Button>
								</span>
							)}
						</div>
						<Separator orientation="vertical" className="h-6" />
						<PortfolioButton />
					</div>
				</motion.div>
			</div>
			<div className="top-0 left-0 absolute pointer-events-none w-full h-full bg-[url('/noise.png')] bg-repeat bg-size-[50px] rounded-4xl opacity-50" />
		</motion.div>
	);
}
