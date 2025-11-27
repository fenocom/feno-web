import {
    FloatingPortal,
    autoUpdate,
    flip,
    offset,
    safePolygon,
    shift,
    useDismiss,
    useFloating,
    useHover,
    useInteractions,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const menuTriggerClassname =
    "rounded-lg px-3 py-2 hover:bg-[#1148b8] flex items-center text-white font-hero text-base";

interface ProductsMenuProps {
    triggerClassname?: string;
}

export const ProductsMenu = ({ triggerClassname }: ProductsMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const { refs, context, x, y, strategy } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: "bottom-start",
        strategy: "fixed",
        middleware: [offset({ mainAxis: 20, crossAxis: -50 }), flip(), shift()],
        whileElementsMounted: autoUpdate,
    });

    const hover = useHover(context, {
        handleClose: safePolygon({
            buffer: 1,
        }),
        delay: {
            close: 100,
        },
    });
    const dismiss = useDismiss(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
        hover,
        dismiss,
    ]);

    return (
        <>
            <div
                className={triggerClassname}
                ref={refs.setReference}
                {...getReferenceProps()}
            >
                Products
            </div>
            <FloatingPortal>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            ref={refs.setFloating}
                            style={{
                                position: strategy,
                                top: y ?? 0,
                                left: x ?? 0,
                            }}
                            initial={{ opacity: 0, x: "-20%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "-20%" }}
                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                            {...getFloatingProps()}
                            className="isolate px-3 py-3 rounded-2xl overflow-hidden w-[600px] h-[300px] backdrop-blur-xl z-60"
                        >
                            <div className="top-0 -z-1 left-0 absolute pointer-events-none w-full h-full bg-[url('/noise.png')] bg-repeat bg-size-[80px]" />
                            <div className="bg-white/5 top-0 left-0 absolute pointer-events-none z-50 w-full h-full" />
                            <div className="w-full grid grid-cols-[1fr_2fr] z-90 gap-2 h-full">
                                <div className="flex flex-col">
                                    <div className="font-serif text-white/60 font-bold italic text-2xl px-3 py-1 mb-1">
                                        <div className="border-b border-white/20 w-full">Builder</div>
                                    </div>
                                    <div className="px-5 border-b border-white/20 pb-3 mb-3">
                                        <div className={menuTriggerClassname}>Resume Builder</div>
                                        <div className={menuTriggerClassname}>Portfolio Builder</div>
                                    </div>
                                    <div className={menuTriggerClassname}>Analytics</div>
                                    <div className={menuTriggerClassname}>Extension</div>
                                </div>
                                <div className="bg-black rounded-lg w-full h-full"> </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </FloatingPortal>
        </>
    );
};
