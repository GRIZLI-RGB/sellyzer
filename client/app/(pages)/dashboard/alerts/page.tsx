"use client";

import { useState } from "react";
import clsx from "clsx";
import {
	Bell,
	TrendingDown,
	TrendingUp,
	Star,
	DollarSign,
	PackageX,
} from "lucide-react";
import Image from "next/image";

import TopPanel from "@/app/components/shared/top-panel";
import Button from "@/app/components/shared/button";

const TRIGGERS = [
	{
		id: 1,
		name: "Падение позиций",
		description: "Уведомлять, если товар падает в выдаче",
		icon: <TrendingDown className="w-5 h-5 text-red-500" />,
		enabled: true,
	},
	{
		id: 2,
		name: "Рост позиций",
		description: "Уведомлять, если товар поднимается в выдаче",
		icon: <TrendingUp className="w-5 h-5 text-green-500" />,
		enabled: false,
	},
	{
		id: 3,
		name: "Новые отзывы",
		description: "Уведомлять о новых отзывах пользователей",
		icon: <Bell className="w-5 h-5 text-amber-500" />,
		enabled: true,
	},
	{
		id: 4,
		name: "Оценка товара",
		description: "Уведомлять, если средняя оценка изменилась",
		icon: <Star className="w-5 h-5 text-yellow-500" />,
		enabled: false,
	},
	{
		id: 5,
		name: "Изменение цены",
		description: "Уведомлять при снижении или повышении цены",
		icon: <DollarSign className="w-5 h-5 text-emerald-500" />,
		enabled: true,
	},
	{
		id: 6,
		name: "Доступность товара",
		description: "Уведомлять, если товар недоступен для покупки",
		icon: <PackageX className="w-5 h-5 text-slate-500" />,
		enabled: false,
	},
];

export default function DashboardAlertsPage() {
	const [triggers, setTriggers] = useState(TRIGGERS);
	const [connected, setConnected] = useState(false);

	const toggleTrigger = (id: number) => {
		setTriggers(
			triggers.map((trigger) =>
				trigger.id === id
					? { ...trigger, enabled: !trigger.enabled }
					: trigger
			)
		);
	};

	return (
		<div className="space-y-6">
			{/* Верхняя панель */}
			<TopPanel title="Оповещения" />

			{/* Telegram user block */}
			<div className="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 bg-gray-50 dark:bg-neutral-800">
				{connected ? (
					<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
						<div className="flex items-center gap-3">
							<Image
								quality={100}
								className="block min-w-11 h-11 rounded-full object-cover"
								src="/images/telegram-avatar.jpg"
								alt="Telegram"
								width={44}
								height={44}
							/>
							<div className="leading-[110%]">
								<p className="font-medium">
									Подключено к Telegram
								</p>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									@username
								</p>
							</div>
						</div>
						<Button
							variant="secondary"
							text="Отключить"
							onClick={() => setConnected(false)}
						/>
					</div>
				) : (
					<div className="flex flex-col items-center text-center">
						<Bell className="w-10 h-10 text-gray-400 mb-3" />
						<h3 className="font-medium mb-1">
							Подключите Telegram-бота
						</h3>
						<p className="text-sm text-gray-500 dark:text-gray-400 mb-3 max-w-2/3">
							Получайте уведомления об изменении уровня цен ваших
							товаров, позиций в выдаче, новых отзывах в Telegram.
						</p>
						<Button
							variant="accent"
							onClick={() => setConnected(true)}
							text="Подключить"
						/>
					</div>
				)}
			</div>

			{/* Cards grid */}
			{connected && (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{triggers.map((trigger) => (
						<div
							key={trigger.id}
							className="relative flex flex-col gap-3 p-4 border border-gray-200 rounded-lg dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-gray-300 dark:hover:border-neutral-600 transition-base"
						>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									{trigger.icon}
									<h3 className="text-sm font-medium text-gray-900 dark:text-white">
										{trigger.name}
									</h3>
								</div>
							</div>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								{trigger.description}
							</p>
							<div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100 dark:border-neutral-700">
								<button
									onClick={() => toggleTrigger(trigger.id)}
									className={clsx(
										"relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
										trigger.enabled
											? "bg-green-500 focus:ring-green-500"
											: "bg-gray-200 dark:bg-neutral-600 focus:ring-gray-500"
									)}
								>
									<span
										className={clsx(
											"inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
											trigger.enabled
												? "translate-x-6"
												: "translate-x-1"
										)}
									/>
								</button>
								<span
									className={clsx(
										"text-xs font-medium",
										trigger.enabled
											? "text-green-600 dark:text-green-400"
											: "text-gray-500 dark:text-gray-400"
									)}
								>
									{trigger.enabled ? "Активен" : "Выключен"}
								</span>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
