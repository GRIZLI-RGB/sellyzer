"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeroUIProvider } from "@heroui/react";
import { httpBatchLink } from "@trpc/react-query";
import { ThemeProvider } from "next-themes";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/ru";

import { trpc } from "./../../utils/trpc";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ru");

export default function Providers({ children }: { children: React.ReactNode }) {
	const queryClient = new QueryClient();

	const trpcClient = trpc.createClient({
		links: [
			httpBatchLink({
				url: "http://localhost:8000/api/trpc",
				fetch(url, options) {
					return fetch(url, {
						...options,
						credentials: "include",
					});
				},
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
