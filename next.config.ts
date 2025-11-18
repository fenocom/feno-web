import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "127.0.0.1",
                port: "54321",
            },
            {
                // TODO: Replace with your production supabase url
                protocol: "https",
                hostname: "*.supabase.co",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            }
        ],
    },
    turbopack: {
        rules: {
            "*.svg": {
                loaders: ["@svgr/webpack"],
                as: "*.js",
            },
        },
    },
    webpack: (config) => {
        // Enable WebAssembly
        config.experiments = { ...config.experiments, asyncWebAssembly: true };

        // Handle PDF.js worker and related files
        config.module.rules.push({
            test: /\.(wasm)$/i,
            type: "asset/resource",
        });

        return config;
    },
};

export default nextConfig;
