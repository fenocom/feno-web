"use client";

import { motion } from "framer-motion";
import { Button } from "@radix-ui/themes";
import * as Tooltip from "@radix-ui/react-tooltip";

export default function Toolbar({ config }) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-neutral-900/90 backdrop-blur-md px-5 py-3 rounded-xl flex items-center gap-4 shadow-xl border border-neutral-700 z-999"
    >
      <Tooltip.Provider delayDuration={100}>
        {config.map((item) => (
          <Tooltip.Root key={item.id}>
            <Tooltip.Trigger asChild>
              <Button
                size="2"
                disabled={item.disabled}
                onClick={item.action}
                className={`flex items-center gap-2 text-white cursor-pointer ${item.className || ""}`}
              >
                {item.icon && <item.icon size={18} />}
                {item.label}
              </Button>
            </Tooltip.Trigger>

            {item.tooltip && (
              <Tooltip.Portal>
                <Tooltip.Content className="px-2 py-1 text-xs bg-black text-white rounded-md">
                  {item.tooltip}
                </Tooltip.Content>
              </Tooltip.Portal>
            )}
          </Tooltip.Root>
        ))}
      </Tooltip.Provider>
    </motion.div>
  );
}
