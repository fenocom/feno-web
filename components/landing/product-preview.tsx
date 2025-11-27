"use client";

import { motion } from "framer-motion";

export const ProductPreview = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full max-w-7xl mx-auto rounded-[24px] overflow-hidden p-2 bg-white/20 backdrop-blur-lg"
        >
            <div className="absolute -inset-4 bg-blue-500/10 blur-2xl rounded-[2rem] -z-10 bg-[url('/noise.png')] bg-repeat bg-size-[60px]" />

            <img src="/temp-product-demo.png" alt="Dashboard Preview" className="w-full h-full object-cover rounded-2xl" />
        </motion.div>
    );
};
