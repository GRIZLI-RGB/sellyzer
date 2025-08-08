"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeroUIProvider } from "@heroui/react";
import { httpBatchLink } from "@trpc/react-query";

import { trpc } from "./../../utils/trpc";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
	const queryClient = new QueryClient();

	const trpcClient = trpc.createClient({
		links: [
			httpBatchLink({
				url: "http://localhost:8000/api/trpc",
			}),
		],
	});

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<HeroUIProvider>
					<ThemeProvider
						attribute={"class"}
						defaultTheme="system"
						enableSystem
						
					>
						{children}
					</ThemeProvider>
				</HeroUIProvider>
			</QueryClientProvider>
		</trpc.Provider>
	);
}
