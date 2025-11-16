import type { Metadata } from "next";
import {
    Cormorant_Garamond,
    Host_Grotesk,
    JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const hostGrotesk = Host_Grotesk({
    variable: "--font-host",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
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
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="light">
            <head>
                <meta name="theme-color" content="#ffffff" />
            </head>
            <body
                className={`${hostGrotesk.variable} ${serif.variable} ${jetbrains.variable}  antialiased`}
            >
                <main className="w-full h-screen">{children}</main>
            </body>
        </html>
    );
}
