"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import {
	Bell,
	TrendingDown,
	TrendingUp,
	Star,
	DollarSign,
	PackageX,
	Plus,
	Unlink,
	MessageCircle,
} from "lucide-react";
import Image from "next/image";

import TopPanel from "@/app/components/shared/top-panel";
import Button from "@/app/components/shared/button";
import { useUser } from "@/app/store/useUser";
import { trpc } from "@/app/utils/trpc";
import Loader from "@/app/components/shared/loader";
import { TelegramNotificationsDataType } from "@sellyzer/shared";

const TRIGGERS: {
	key: keyof TelegramNotificationsDataType;
	name: string;
	description: string;
	icon: React.ReactNode;
}[] = [
	{
		key: "triggerPositionDown",
		name: "Падение позиций",
		description: "Уведомлять, если товар падает в выдаче",
		icon: <TrendingDown className="w-5 h-5 text-red-500" />,
	},
	{
		key: "triggerPositionUp",
		name: "Рост позиций",
		description: "Уведомлять, если товар поднимается в выдаче",
		icon: <TrendingUp className="w-5 h-5 text-green-500" />,
	},
	{
		key: "triggerNewReview",
		name: "Новые отзывы",
		description: "Уведомлять о новых отзывах пользователей",
		icon: <MessageCircle className="w-5 h-5 text-amber-500" />,
	},
	{
		key: "triggerRatingChange",
		name: "Оценка товара",
		description: "Уведомлять, если оценка на сайте изменилась",
		icon: <Star className="w-5 h-5 text-yellow-500" />,
	},
	{
		key: "triggerPriceChange",
		name: "Изменение цены",
		description: "Уведомлять при снижении или повышении цены",
		icon: <DollarSign className="w-5 h-5 text-emerald-500" />,
	},
	{
		key: "triggerAvailabilityChange",
		name: "Доступность товара",
		description: "Уведомлять, если товар недоступен для покупки",
		icon: <PackageX className="w-5 h-5 text-slate-500" />,
	},
];

export default function DashboardAlertsPage() {
	const [triggers, setTriggers] = useState(TRIGGERS);

	const toggleTrigger = (
		key: keyof TelegramNotificationsDataType,
		newValue: boolean
	) => {
		toggleTelegramTrigger.mutate({
			key,
			value: newValue,
		});
	};

	const { user } = useUser();

	const {
		data: telegramNotificationsData,
		isLoading: telegramNotificationsIsLoading,
		refetch: telegramNotificationsRefetch,
	} = trpc.getCurrentUserTelegramNotifications.useQuery(undefined, {
		retry: false,
		staleTime: 5 * 60 * 1000,
	});

	const toggleTelegramTrigger =
		trpc.toggleCurrentUserTelegramTrigger.useMutation({
			onSuccess: () => telegramNotificationsRefetch(),
		});

	const disableTelegramNotifications =
		trpc.disableCurrentUserTelegramNotifications.useMutation({
			onSuccess: () => {
				telegramNotificationsRefetch();
			},
		});

	const [isPolling, setIsPolling] = useState(false);

	useEffect(() => {
		if (!isPolling) return;

		const interval = setInterval(async () => {
			const data = await telegramNotificationsRefetch();
			if (data.data?.isConnected) {
				setIsPolling(false);
			}
		}, 3000);

		return () => clearInterval(interval);
	}, [isPolling, telegramNotificationsRefetch]);

	useEffect(() => {
		if (!telegramNotificationsData) return;

		setTriggers(
			TRIGGERS.map((t) => ({
				...t,
				enabled: telegramNotificationsData[t.key] ?? false,
			}))
		);
	}, [telegramNotificationsData]);

	const getStateOfNotify = (
		key: keyof TelegramNotificationsDataType
	): boolean => {
		return telegramNotificationsData &&
			typeof telegramNotificationsData[key] === "boolean"
			? telegramNotificationsData[key]
			: false;
	};

	return (
		<div className="space-y-6">
			{/* Верхняя панель */}
			<TopPanel title="Оповещения" />

			{/* Telegram user block */}
			<div className="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 bg-gray-50 dark:bg-neutral-800">
				{!telegramNotificationsData ||
				telegramNotificationsIsLoading ? (
					<div className="flex flex-col items-center justify-center gap-3">
						<Loader className="py-16" />
					</div>
				) : telegramNotificationsData.isConnected ? (
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
									@{user?.telegramUsername}
								</p>
							</div>
						</div>
						<Button
							variant="secondary"
							icon={<Unlink size={16} />}
							text="Отключить"
							onClick={() =>
								disableTelegramNotifications.mutate()
							}
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
							icon={<Plus size={16} />}
							onClick={() => {
								window.open(
									`https://t.me/sellyzer_bot?start=${user?.id}`,
									"_blank"
								);

								setIsPolling(true);
							}}
							text="Подключить"
						/>
					</div>
				)}
			</div>

			{/* Cards grid */}
			{telegramNotificationsData?.isConnected &&
				!telegramNotificationsIsLoading && (
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{triggers.map((trigger) => (
							<div
								key={trigger.key}
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
										onClick={() =>
											toggleTrigger(
												trigger.key,
												!getStateOfNotify(trigger.key)
											)
										}
										className={clsx(
											"relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
											getStateOfNotify(trigger.key)
												? "bg-green-500 focus:ring-green-500"
												: "bg-gray-200 dark:bg-neutral-600 focus:ring-gray-500"
										)}
									>
										<span
											className={clsx(
												"inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
												getStateOfNotify(trigger.key)
													? "translate-x-6"
													: "translate-x-1"
											)}
										/>
									</button>
									<span
										className={clsx(
											"text-xs font-medium",
											getStateOfNotify(trigger.key)
												? "text-green-600 dark:text-green-400"
												: "text-gray-500 dark:text-gray-400"
										)}
									>
										{getStateOfNotify(trigger.key)
											? "Активен"
											: "Выключен"}
									</span>
								</div>
							</div>
						))}
					</div>
				)}
		</div>
	);
}
