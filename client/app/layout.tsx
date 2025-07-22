import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";

import "./globals.css";

export const metadata: Metadata = {
	title: "Sellyzer",
};

const inter = Inter({
	subsets: ["latin", "cyrillic"],
	variable: "--font-inter",
	display: "swap",
});

const robotoMono = Roboto_Mono({
	subsets: ["latin", "cyrillic"],
	variable: "--font-robotoMono",
	display: "swap",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<body
				className={`${inter.variable} ${robotoMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
