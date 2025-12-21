import { AuthProvider } from "@/lib/auth/context";
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
	title: "Login — Feno",
	description: "Sign in to access your resume builder",
};

export const viewport: Viewport = {
	themeColor: "#ffffff",
};

export default function LoginLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			data-theme="light"
			className={`light bg-background font-host ${hostGrotesk.variable} ${serif.variable} ${jetbrains.variable} antialiased`}
		>
			<body>
				<AuthProvider>
					<main className="w-full min-h-screen h-full">{children}</main>
				</AuthProvider>
			</body>
			<SpeedInsights />
		</html>
	);
}
