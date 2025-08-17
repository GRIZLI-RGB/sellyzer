"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import {
	BellIcon,
	Boxes as BoxesIcon,
	LineChartIcon,
	Megaphone,
} from "lucide-react";
import Image from "next/image";
import { FaTelegram } from "react-icons/fa";

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
		pro: true,
	},
	{
		title: "Оповещения",
		icon: <BellIcon className="w-5 h-5" />,
		href: "/dashboard/alerts",
	},
	{
		title: "Реклама",
		icon: <Megaphone className="w-5 h-5" />,
		href: "/dashboard/advertising",
		pro: true,
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
			<aside className="top-0 sticky h-screen w-60 border-r bg-neutral-50 p-4 hidden md:flex flex-col justify-between border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700">
				<div className="flex flex-col flex-grow overflow-y-auto pr-1">
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

						<nav className="flex flex-col gap-1 mb-4">
							{navItems.map(({ title, href, icon, pro }) => (
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
									<span className="flex items-center gap-1">
										{title}
										{pro && (
											<span className="text-[10px] font-semibold bg-yellow-300 text-black px-1.5 py-0.5 rounded">
												PRO
											</span>
										)}
									</span>
								</Link>
							))}
						</nav>
						<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 dark:bg-yellow-900 dark:border-yellow-700">
							<h4 className="text-sm font-semibold mb-1 text-yellow-900 dark:text-yellow-100">
								Откройте PRO-функции —{" "}
								<span className="font-bold">990₽/мес</span>
							</h4>
							<p className="text-xs text-yellow-800 dark:text-yellow-200 mb-2">
								Безлимит товаров, аналитика и реклама, анализ
								рынка конкурентов, расширенные уведомления в
								Telegram — всё в одном тарифе.
							</p>
							<button className="transition-base block w-full text-center text-sm font-medium bg-yellow-400 hover:bg-yellow-500 text-black py-1.5 rounded-md">
								Перейти на PRO
							</button>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-100 mt-6 items-start">
					<a
						href="https://blog.sellyzer.com"
						target="_blank"
						rel="noreferrer"
						className="hover:underline"
					>
						Блог
					</a>
					<a
						href="https://docs.sellyzer.com"
						target="_blank"
						rel="noreferrer"
						className="hover:underline"
					>
						Документация
					</a>
					<a
						href="https://t.me/sellyzer_support"
						target="_blank"
						rel="noreferrer"
						className="mt-4 hover:underline flex items-center gap-1 text-gray-500 dark:text-gray-400"
					>
						<FaTelegram className="w-4 h-4 text-blue-400 dark:text-blue-600 flex-shrink-0" />
						<span className="font-medium select-text">
							t.me/sellyzer_support
						</span>
					</a>
				</div>
			</aside>

			<main className="flex-1 min-h-screen p-4 overflow-auto">
				{children}
			</main>
		</div>
	);
}
