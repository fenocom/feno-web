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
import { IconArrowRight } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const menuTriggerClassname =
    "rounded-lg px-3 py-2 flex items-center justify-between text-white font-hero cursor-pointer text-base transition-colors duration-200 group relative z-10";

const PRODUCTS = [
    {
        title: "Resume Builder",
        description:
            "Craft professional resumes effortlessly with our advanced WYSIWYT editor.",
    },
    {
        title: "Portfolio Builder",
        description:
            "Showcase your work with a professional and personal portfolio in one click.",
    },
    {
        title: "Analytics",
        description: "Track views and engagement on your resume and portfolio.",
    },
    {
        title: "Extension",
        description:
            "Save jobs and autofill applications with our browser extension.",
    },
];

interface ProductsMenuProps {
    triggerClassname?: string;
}

export const ProductsMenu = ({ triggerClassname }: ProductsMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(PRODUCTS[0]);

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

    const getItemProps = (product: (typeof PRODUCTS)[0]) => ({
        className: menuTriggerClassname,
        onClick: () => setActiveItem(product),
        onMouseEnter: () => setActiveItem(product),
    });

    const renderProductItem = (product: (typeof PRODUCTS)[0]) => (
        <div {...getItemProps(product)}>
            <span className="z-20 relative">{product.title}</span>
            {activeItem.title === product.title && (
                <motion.div
                    layoutId="active-product-bg"
                    className="absolute inset-0 bg-[#1148b8] rounded-lg z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
            )}
            {activeItem.title === product.title && (
                <motion.div
                    layoutId="active-product-arrow"
                    className="z-20 relative"
                >
                    <IconArrowRight className="w-4 h-4 text-white" />
                </motion.div>
            )}
        </div>
    );

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
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 25,
                            }}
                            {...getFloatingProps()}
                            className="isolate px-3 py-3 rounded-2xl overflow-hidden w-[600px] h-[300px] backdrop-blur-xl z-60"
                        >
                            <div className="top-0 -z-1 left-0 absolute pointer-events-none w-full h-full bg-[url('/noise.png')] bg-repeat bg-size-[70px]" />
                            <div className="bg-white/5 top-0 left-0 absolute pointer-events-none z-50 w-full h-full" />
                            <div className="w-full grid grid-cols-[1fr_2fr] z-90 gap-2 h-full">
                                <div className="flex flex-col">
                                    <div className="font-serif text-white/60 font-bold italic text-2xl py-1 mb-1">
                                        <div className="border-b border-white/20 w-full">
                                            builders
                                        </div>
                                    </div>
                                    <div className="pl-3 border-b border-white/20 pb-3 mb-3">
                                        {renderProductItem(PRODUCTS[0])}
                                        {renderProductItem(PRODUCTS[1])}
                                    </div>
                                    {renderProductItem(PRODUCTS[2])}
                                    {renderProductItem(PRODUCTS[3])}
                                </div>
                                <div className="bg-black/90 rounded-lg w-full h-full p-6 flex flex-col justify-center items-start">
                                    <h3 className="text-2xl font-bold text-white mb-2 font-host">
                                        {activeItem.title}
                                    </h3>
                                    <p className="text-white/70 text-lg leading-relaxed">
                                        {activeItem.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </FloatingPortal>
        </>
    );
};
