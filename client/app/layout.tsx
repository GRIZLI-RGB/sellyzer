import type { Metadata } from "next";

import Providers from "./components/providers";

import "./styles/globals.css";

export const metadata: Metadata = {
	title: "Sellyzer",
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
		<html lang="ru">
			<body
				className={`antialiased ${inter.className}`}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
