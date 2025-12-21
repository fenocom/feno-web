"use client";

import { AiIcon } from "@/components/common/ai-icon";
import { useAuth } from "@/lib/auth/context";
import { Button, Separator } from "@heroui/react";
import { IconDownload, IconPalette, IconSettings } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PortfolioButton } from "../../components/portfolio-button";
import { SaveTemplateButton } from "./save-template-button";
import { SettingsPanel } from "./settings-panel";

interface ToolbarProps {
	onExport?: () => void;
	getEditorContent?: () => unknown;
}

export default function Toolbar({ onExport, getEditorContent }: ToolbarProps) {
	const { user, isAdmin } = useAuth();
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const toolbarRef = useRef<HTMLDivElement>(null);

	// Close settings when clicking outside
	useEffect(() => {
		if (!isSettingsOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (toolbarRef.current && !toolbarRef.current.contains(event.target as Node)) {
				setIsSettingsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isSettingsOpen]);

	return (
		<motion.div
			ref={toolbarRef}
			initial={{ y: 40, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
			className="fixed bottom-6 left-1/2 -translate-x-1/2 shadow-xl z-999 rounded-4xl bg-white overflow-hidden"
		>
			<div className="relative z-10 text-black">
				<div className="border border-black/10 rounded-4xl">
					{/* Settings Panel */}
					<AnimatePresence>
						{isSettingsOpen && user && (
							<SettingsPanel onClose={() => setIsSettingsOpen(false)} />
						)}
					</AnimatePresence>

					{/* Main Toolbar */}
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
									isSettingsOpen ? "bg-black/10" : ""
								} text-black`}
							>
								<IconSettings size={18} />
							</Button>
							{isAdmin && getEditorContent && (
								<SaveTemplateButton getEditorContent={getEditorContent} />
							)}
						</div>

						<Separator orientation="vertical" className="h-6" />
						<PortfolioButton />
					</div>
				</div>
			</div>

			{/* Noise texture overlay */}
			<div className="top-0 left-0 absolute pointer-events-none w-full h-full bg-[url('/noise.png')] bg-repeat bg-size-[50px] rounded-4xl opacity-50" />
		</motion.div>
	);
}
