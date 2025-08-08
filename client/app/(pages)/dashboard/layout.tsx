"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import {
	Boxes as BoxesIcon,
	LineChart as LineChartIcon,
	Plug as PlugIcon,
	Settings as SettingsIcon,
} from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "@/app/components/features/theme-toggle";

const navItems = [
	{
		title: "Товары",
		icon: <BoxesIcon className="w-5 h-5" />,
		href: "/dashboard/products",
	},
	{
		title: "Аналитика",
		icon: <LineChartIcon className="w-5 h-5" />,
		href: "/dashboard/analytics",
	},
	{
		title: "Интеграции",
		icon: <PlugIcon className="w-5 h-5" />,
		href: "/dashboard/integrations",
	},
	{
		title: "Настройки",
		icon: <SettingsIcon className="w-5 h-5" />,
		href: "/dashboard/settings",
	},
];

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	return (
		<div className="min-h-screen flex bg-white text-gray-800 dark:bg-neutral-900 dark:text-white">
			<aside className="w-60 border-r bg-neutral-50 p-4 hidden md:flex flex-col justify-between border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700">
				<div>
					<div className="flex items-center gap-2 mb-6 ml-2">
						<Image
							src="/logo-light.svg"
							alt="Sellyzer"
							width={36}
							height={36}
							className="block dark:hidden"
						/>
						<Image
							src="/logo-dark.svg"
							alt="Sellyzer"
							width={36}
							height={36}
							className="hidden dark:block"
						/>

						<span className="text-lg font-semibold hidden md:inline">
							Sellyzer
						</span>
					</div>

					<nav className="flex flex-col gap-1">
						{navItems.map(({ title, href, icon }) => (
							<Link
								key={href}
								href={href}
								className={clsx(
									"px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors",
									pathname === href
										? "bg-black text-white dark:bg-white dark:text-black"
										: "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-neutral-700"
								)}
							>
								<span>{icon}</span>
								{title}
							</Link>
						))}
					</nav>
				</div>

				<div className="flex flex-col gap-1 text-sm text-gray-500 dark:text-gray-100 mt-6 items-start">
					<a
						href="https://docs.sellyzer.com"
						target="_blank"
						rel="noreferrer"
						className="hover:underline"
					>
						Документация
					</a>
					<a
						href="https://blog.sellyzer.com"
						target="_blank"
						rel="noreferrer"
						className="hover:underline"
					>
						Блог
					</a>
				</div>
			</aside>

			<main className="flex-1 min-h-screen p-4 overflow-x-hidden relative">
				<div className="absolute top-4 right-4">
					<ThemeToggle />
				</div>

				{children}
			</main>
		</div>
	);
}
