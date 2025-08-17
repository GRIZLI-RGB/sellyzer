"use client";

import { Search } from "lucide-react";

import { ThemeToggle } from "../features/theme-toggle";

export default function TopPanel({
	children,
	title,
	numberElements,
	searchQuery,
	setSearchQuery,
}: {
	children?: React.ReactNode;
	title: string;
	numberElements?: number;
	searchQuery?: string;
	setSearchQuery?: (newValue: string) => void;
}) {
	return (
		<div className="flex flex-col md:flex-row justify-between gap-2 md:items-center">
			<h1 className="text-2xl font-semibold">
				{title}
				{numberElements && (
					<span className="pl-1 text-sm text-gray-500 dark:text-gray-400">
						({numberElements})
					</span>
				)}
			</h1>

			<div className="flex gap-2 items-center">
				{/* Поиск */}
				{searchQuery && typeof setSearchQuery === "function" && (
					<div className="relative">
						<Search
							className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
							size={18}
						/>
						<input
							type="text"
							placeholder="Поиск..."
							className="pl-9 pr-3 py-2 rounded-lg border border-gray-200 dark:border-neutral-700 
						   bg-white dark:bg-neutral-800 text-sm w-full md:w-64
						   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
						   transition-base"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
				)}

				{children}

				<ThemeToggle />
			</div>
		</div>
	);
}
