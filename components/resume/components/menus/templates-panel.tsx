"use client";

import { Avatar, Button, Input, Spinner, Tooltip } from "@heroui/react";
import {
	IconArrowsMaximize,
	IconArrowsMinimize,
	IconChevronLeft,
	IconChevronRight,
	IconSearch,
	IconX,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TemplatePreview } from "../template-preview";

interface Template {
	id: string;
	name: string;
	author: string;
	category: string;
	resume_data: any;
	created_at: string;
}

interface TemplatesPanelProps {
	onClose: () => void;
	onSelect?: (template: Template) => void;
}

export function TemplatesPanel({ onClose, onSelect }: TemplatesPanelProps) {
	const [templates, setTemplates] = useState<Template[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isExpanded, setIsExpanded] = useState(false);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [filterAuthor, setFilterAuthor] = useState("");
	const [debouncedAuthor, setDebouncedAuthor] = useState("");

	// Debounce author search
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedAuthor(filterAuthor);
			setPage(1); // Reset page on filter change
		}, 500);
		return () => clearTimeout(timer);
	}, [filterAuthor]);

	useEffect(() => {
		const fetchTemplates = async () => {
			setIsLoading(true);
			try {
				const params = new URLSearchParams({
					page: page.toString(),
					limit: isExpanded ? "20" : "10", // Load more items in expanded mode
					author: debouncedAuthor,
				});
				const res = await fetch(`/api/admin/templates?${params}`);
				const data = await res.json();
				if (data.data) {
					setTemplates(data.data);
					setTotalPages(
						Math.ceil((data.metadata?.total || 0) / (data.metadata?.limit || 10)),
					);
				}
			} catch (err) {
				console.error("Failed to fetch templates", err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchTemplates();
	}, [page, debouncedAuthor, isExpanded]);

	return (
		<motion.div
			layout
			initial={{ width: 320, opacity: 0 }}
			animate={{
				width: "90vw",
				height: isExpanded ? "85vh" : "340px",
				opacity: 1,
			}}
			exit={{ opacity: 0, scale: 0.9 }}
			transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
			className="bg-white rounded-3xl shadow-2xl border border-black/10 overflow-hidden flex flex-col"
		>
			{/* Header */}
			<div className="flex items-center justify-between gap-4 p-4 border-b border-black/5">
				<div className="flex items-center gap-4 flex-1">
					<h3 className="text-lg font-semibold whitespace-nowrap">Templates</h3>
					<div className="relative group w-full max-w-xs">
						<div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none z-10">
							<IconSearch size={16} />
						</div>
						<Input
							placeholder="Filter by creator..."
							value={filterAuthor}
							onChange={(e) => setFilterAuthor(e.target.value)}
							className="max-w-xs"
							classNames={{
								input: "pl-8 pr-8",
								inputWrapper: "pl-8 pr-8"
							}}
							size="sm"
							variant="bordered"
						/>
						{filterAuthor && (
							<button
								type="button"
								onClick={() => setFilterAuthor("")}
								className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 z-10 p-0.5 rounded-full hover:bg-neutral-100 transition-colors"
							>
								<IconX size={14} />
							</button>
						)}
					</div>
				</div>

				<div className="flex items-center gap-2">
					<Tooltip content={isExpanded ? "Collapse" : "Expand view"}>
						<Button
							isIconOnly
							size="sm"
							variant="light"
							onPress={() => setIsExpanded(!isExpanded)}
						>
							{isExpanded ? (
								<IconArrowsMinimize size={20} />
							) : (
								<IconArrowsMaximize size={20} />
							)}
						</Button>
					</Tooltip>
					<Button isIconOnly size="sm" variant="light" onPress={onClose}>
						<IconX size={20} />
					</Button>
				</div>
			</div>

			{/* Content */}
			<div
				className={`flex-1 relative ${
					isExpanded
						? "overflow-y-auto p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
						: "overflow-x-auto flex gap-6 p-4 scrollbar-hide items-center min-h-[300px]"
				}`}
			>
				{isLoading && templates.length === 0 ? (
					<div className="absolute inset-0 flex items-center justify-center">
						<Spinner label="Loading templates..." />
					</div>
				) : (
					<AnimatePresence mode="popLayout">
						{templates.map((template) => (
							<motion.div
								key={template.id}
								layout
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
								className={`group relative flex-shrink-0 bg-neutral-50 rounded-xl border border-black/5 hover:border-black/20 transition-all cursor-pointer overflow-hidden ${
									isExpanded ? "w-full aspect-[210/297]" : "w-[240px] aspect-[210/297]"
								}`}
								onClick={() => onSelect?.(template)}
							>
								<div className="absolute inset-0 pointer-events-none">
									<TemplatePreview
										content={template.resume_data}
										scale={isExpanded ? 0.45 : 0.28}
										className="w-full h-full origin-top-left"
									/>
								</div>
								
								{/* Hover Overlay */}
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
								
								{/* Info Overlay */}
								<div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-end justify-between">
									<div className="text-white">
										<p className="font-semibold text-sm truncate max-w-[150px]">{template.name}</p>
										<p className="text-xs text-white/70">{template.author}</p>
									</div>
                                    {template.author && (
                                        <Avatar
                                            name={template.author}
                                            size="sm"
                                            className="w-6 h-6 text-[10px]"
                                        />
                                    )}
								</div>
							</motion.div>
						))}
					</AnimatePresence>
				)}

				{!isLoading && templates.length === 0 && (
					<div className="w-full h-full flex items-center justify-center text-neutral-400">
						No templates found.
					</div>
				)}
			</div>

			{/* Pagination Footer */}
			<div className="p-4 border-t border-black/5 flex items-center justify-between bg-white z-10">
				<div className="text-xs text-neutral-500">
					Page {page} of {totalPages || 1}
				</div>
				<div className="flex gap-2">
					<Button
						isIconOnly
						size="sm"
						variant="flat"
						disabled={page <= 1}
						onPress={() => setPage((p) => Math.max(1, p - 1))}
					>
						<IconChevronLeft size={16} />
					</Button>
					<Button
						isIconOnly
						size="sm"
						variant="flat"
						disabled={page >= totalPages}
						onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
					>
						<IconChevronRight size={16} />
					</Button>
				</div>
			</div>
		</motion.div>
	);
}
