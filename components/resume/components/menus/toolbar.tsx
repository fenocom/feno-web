import { AiIcon } from "@/components/common/ai-icon";
import { Button, Separator } from "@heroui/react";
import { IconDownload, IconPalette, IconSettings } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { PortfolioButton } from "../../components/portfolio-button";

interface ToolbarProps {
        onExport?: () => void;
}

export default function Toolbar({ onExport }: ToolbarProps) {
        return (
                <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.25 }}
                        className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center shadow-xl z-999 rounded-4xl bg-white"
                >
                        <div className="relative z-10 text-black">
                                <div className="flex gap-2 items-center px-3 py-2 border border-black/10 rounded-4xl">
                                        <AiIcon size={28} />
                                        <Separator
                                                orientation="vertical"
                                                className="h-6"
                                        />
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
                                                        className="p-1 min-w-8 h-8 rounded-md text-black hover:bg-black/10"
                                                >
                                                        <IconSettings size={18} />
                                                </Button>
                                        </div>
                                        <Separator
                                                orientation="vertical"
                                                className="h-6"
                                        />
                                        <PortfolioButton />
                                </div>
                        </div>
                        <div className="top-0 left-0 absolute pointer-events-none w-full h-full bg-[url('/noise.png')] bg-repeat bg-size-[50px] rounded-4xl opacity-50" />
                </motion.div>
        );
}
