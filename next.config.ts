import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "54321",
            },
            {
                protocol: "https",
                hostname: "*.supabase.co",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
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
        config.experiments = { ...config.experiments, asyncWebAssembly: true };

        config.module.rules.push({
            test: /\.(wasm)$/i,
            type: "asset/resource",
        });

        return config;
    },
};

export default nextConfig;
