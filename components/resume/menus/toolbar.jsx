"use client";

import { motion } from "framer-motion";
import { Button } from "@radix-ui/themes";
import { FileDown, Shuffle, Globe } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";

export default function Toolbar({ onDownload, onSwitchTemplate, onCreatePortfolio }) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-neutral-900/90 backdrop-blur-md px-5 py-3 rounded-xl flex items-center gap-4 shadow-xl border border-neutral-700 z-999"
    >

      <Tooltip.Provider delayDuration={100}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button
              size="2"
              className="flex items-center gap-2 cursor-pointer text-white transition"
              onClick={onDownload}
            >
              <FileDown size={18} />
              Download PDF
            </Button>
          </Tooltip.Trigger>
          {/* <Tooltip.Portal>
            <Tooltip.Content className="px-2 py-1 text-xs bg-black text-white rounded-md">
              Export your resume
            </Tooltip.Content>
          </Tooltip.Portal> */}
        </Tooltip.Root>

        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button
              size="2"
              className="flex items-center gap-2 cursor-pointer text-white transition"
              onClick={onSwitchTemplate}
            >
              <Shuffle size={18} />
              Switch Template
            </Button>
          </Tooltip.Trigger>
          {/* <Tooltip.Portal>
            <Tooltip.Content className="px-2 py-1 text-xs bg-black text-white rounded-md">
              Change layout
            </Tooltip.Content>
          </Tooltip.Portal> */}
        </Tooltip.Root>

        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button
              size="2"
              className="flex items-center gap-2 cursor-pointer text-white transition"
              onClick={onCreatePortfolio}
            >
              <Globe size={18} />
              Create Portfolio
            </Button>
          </Tooltip.Trigger>
          {/* <Tooltip.Portal>
            <Tooltip.Content className="px-2 py-1 text-xs bg-black text-white rounded-md">
              Build your website
            </Tooltip.Content>
          </Tooltip.Portal> */}
        </Tooltip.Root>
      </Tooltip.Provider>

    </motion.div>
  );
}
