import type { Metadata } from "next";

import Providers from "./components/features/providers";

import "./styles/globals.css";

export const metadata: Metadata = {
	title: "Sellyzer",
	icons: {
		icon: [
			{
				url: "/favicon-light.ico",
				media: "(prefers-color-scheme: light)",
			},
			{ url: "/favicon-dark.ico", media: "(prefers-color-scheme: dark)" },
		],
	},
};

import { Inter } from "next/font/google";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru" suppressHydrationWarning>
			<body className={`antialiased bg-neutral-50 ${inter.className}`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
