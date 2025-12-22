import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import {
    Cormorant_Garamond,
    Host_Grotesk,
    JetBrains_Mono,
} from "next/font/google";

import "../globals.css";

const hostGrotesk = Host_Grotesk({
    variable: "--font-host",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
    variable: "--font-jetbrains",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const serif = Cormorant_Garamond({
    variable: "--font-serif",
    subsets: ["latin"],
    weight: "400",
});

export const metadata: Metadata = {
    title: "Feno — Your Story, Beautifully Told",
    description:
        "Transform your resume into a stunning digital portfolio in minutes. Share your professional journey with style and impact.",
    icons: {
        icon: [
            {
                url: "/favicon/favicon-32x32.png",
                sizes: "32x32",
                type: "image/png",
            },
            {
                url: "/favicon/favicon-16x16.png",
                sizes: "16x16",
                type: "image/png",
            },
        ],
        apple: [
            {
                url: "/favicon/apple-touch-icon.png",
                sizes: "180x180",
                type: "image/png",
            },
        ],
    },
    manifest: "/favicon/site.webmanifest",
};

export const viewport: Viewport = {
    themeColor: "#ffffff",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`dark bg-black font-host ${hostGrotesk.variable} ${serif.variable} ${jetbrains.variable} antialiased`}
        >
            <body>
                <main className="w-full min-h-screen h-full">{children}</main>
            </body>
            <SpeedInsights />
        </html>
    );
}
