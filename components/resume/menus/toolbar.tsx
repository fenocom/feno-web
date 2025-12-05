import { AiIcon } from "@/components/common/ai-icon";
import { Separator } from "@heroui/react";
import { motion } from "framer-motion";
import { IconDownload, IconPalette, IconSettings } from "@tabler/icons-react";

export default function Toolbar() {
    return (
        <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-4xl border border-white flex items-center gap-4 shadow-xl z-999 overflow-hidden"
        >
            <div className="flex gap-4 items-center backdrop-blur-sm px-4 py-3">
                <AiIcon size={32} />
                <Separator orientation="vertical" className="min-h-8" />
                <IconPalette size={20} />
                <IconDownload size={20} />
                <IconSettings size={20} />
                <Separator orientation="vertical" className="min-h-8" />
            </div>
            <div className="top-0 left-0 absolute pointer-events-none w-full h-full bg-[url('/noise.png')] bg-repeat bg-size-[50px]" />
            <div className="bg-black/15 top-0 left-0 absolute pointer-events-none z-50 w-full h-full" />
        </motion.div>
    );
}
