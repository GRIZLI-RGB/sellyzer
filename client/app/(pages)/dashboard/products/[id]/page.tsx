"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
	TrendingUp,
	CheckCircle,
	BarChart3,
	Eye,
	Zap,
	ChevronDown,
	ChevronUp,
	Target,
	Star,
	ThumbsUp,
	Archive,
	History,
} from "lucide-react";
import { RefreshCw, Trash2 } from "lucide-react";
import dayjs from "dayjs";

import TopPanel from "@/app/components/shared/top-panel";
import Button from "@/app/components/shared/button";
import { trpc } from "@/app/utils/trpc";
import Loader from "@/app/components/shared/loader";
import {
	positiveProductReviewPercent,
	truncateString,
} from "@/app/utils/functions";

interface PriceHistory {
	date: string;
	price: number;
	change: number;
}

interface Recommendation {
	id: number;
	title: string;
	description: string;
	priority: "high" | "medium" | "low";
	impact: number;
	completed: boolean;
}

const mockPriceHistory: PriceHistory[] = [
	{ date: "2023-11-20", price: 7990, change: -100 },
	{ date: "2023-11-19", price: 8090, change: 0 },
	{ date: "2023-11-18", price: 8090, change: -200 },
	{ date: "2023-11-17", price: 8290, change: 100 },
	{ date: "2023-11-16", price: 8190, change: -300 },
	{ date: "2023-11-15", price: 8490, change: 0 },
	{ date: "2023-11-14", price: 8490, change: -500 },
	{ date: "2023-11-13", price: 8990, change: 0 },
];

const mockRecommendations: Recommendation[] = [
	{
		id: 1,
		title: "Добавить видеообзор",
		description:
			"Товары с видео имеют на 35% больше просмотров и на 20% выше конверсию",
		priority: "high",
		impact: 20,
		completed: false,
	},
	{
		id: 2,
		title: "Оптимизировать заголовок",
		description:
			"Добавьте в заголовок ключевые слова: 'умный дом', 'голосовой помощник', 'беспроводная'",
		priority: "high",
		impact: 15,
		completed: false,
	},
	{
		id: 3,
		title: "Улучшить описания характеристик",
		description:
			"67% покупателей отмечают неполноту технических характеристик",
		priority: "medium",
		impact: 12,
		completed: true,
	},
	{
		id: 4,
		title: "Добавить больше фото под разными углами",
		description: "Товары с 7+ фотографиями имеют на 18% больше конверсию",
		priority: "medium",
		impact: 10,
		completed: false,
	},
	{
		id: 5,
		title: "Настроить рекламную кампанию",
		description:
			"Рекомендуем увеличить ставки на ключевые запросы в период с 19:00 до 23:00",
		priority: "low",
		impact: 8,
		completed: false,
	},
];

const tabs = [
	{ id: "analytics", label: "Аналитика" },
	{ id: "prices", label: "История цен" },
	{ id: "recommendations", label: "Рекомендации" },
	{ id: "competitors", label: "Конкуренты" },
];

const changes = [
	{
		color: "bg-blue-500",
		text: "Цена уменьшена на 100₽",
		time: "2025-10-10",
	},
	{
		color: "bg-green-500",
		text: "Добавлено 3 новых отзыва",
		time: "2025-06-10",
	},
	{
		color: "bg-yellow-500",
		text: "Рейтинг изменился с 4.6 до 4.7",
		time: "2025-01-09",
	},
];

function OnlyForPro({
	text,
	icon: Icon,
}: {
	text: string;
	icon: React.ComponentType<{ size?: number }>;
}) {
	return (
		<div className="bg-gray-50 dark:bg-neutral-700 p-6 rounded-lg text-center border border-dashed border-gray-300 dark:border-neutral-600">
			<div className="relative flex items-center justify-center h-32 mb-4">
				<div className="w-full h-full bg-gray-200 dark:bg-neutral-600 rounded-md flex items-center justify-center text-gray-400">
					<svg
						className="w-16 h-10 opacity-30"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							d="M3 17l6-6 4 4 8-8"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
			</div>
			<div className="flex items-center justify-center text-gray-500 dark:text-gray-400 gap-2">
				<Icon size={18} />
				<span>{text}</span>
			</div>
		</div>
	);
}

export default function ProductDetailPage() {
	const params = useParams();
	const [priceHistory] = useState<PriceHistory[]>(mockPriceHistory);
	const [recommendations, setRecommendations] =
		useState<Recommendation[]>(mockRecommendations);
	const [activeTab, setActiveTab] = useState<string>("analytics");
	const [expandedRecommendations, setExpandedRecommendations] =
		useState<boolean>(true);

	const {
		data: productData,
		refetch: productRefetch,
		isLoading: productIsLoading,
	} = trpc.getCurrentUserProductById.useQuery(
		{
			id: Number(params.id),
		},
		{
			retry: false,
			staleTime: 5 * 60 * 1000,
		}
	);

	const toggleRecommendationCompletion = (id: number) => {
		setRecommendations((recs) =>
			recs.map((rec) =>
				rec.id === id ? { ...rec, completed: !rec.completed } : rec
			)
		);
	};

	const PriceChangeDisplay = ({ change }: { change: number }) => {
		if (change === 0) return <span className="text-gray-500">0%</span>;

		const isPositive = change > 0;
		const Icon = isPositive ? ChevronUp : ChevronDown;

		return (
			<span
				className={`flex items-center ${
					isPositive ? "text-green-600" : "text-red-600"
				}`}
			>
				<Icon size={14} />
				{Math.abs(change)}₽
			</span>
		);
	};

	const PriorityBadge = ({
		priority,
	}: {
		priority: "high" | "medium" | "low";
	}) => {
		const config = {
			high: {
				color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
				text: "Высокий",
			},
			medium: {
				color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
				text: "Средний",
			},
			low: {
				color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
				text: "Низкий",
			},
		};

		return (
			<span
				className={`text-xs font-medium px-2 py-1 rounded-full ${config[priority].color}`}
			>
				{config[priority].text}
			</span>
		);
	};

	const [expandedIds, setExpandedIds] = useState<number[]>([]);

	function toggleExpand(id: number) {
		setExpandedIds((prev) =>
			prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
		);
	}

	const toggleArchiveProductMutation = trpc.toggleArchiveProduct.useMutation({
		onSuccess: () => {
			productRefetch();
		},
	});

	const handleToggleArchiveProduct = (id: number, archive: boolean) => {
		toggleArchiveProductMutation.mutate({
			id,
			archive,
		});
	};

	return (
		<div className="space-y-6">
			<TopPanel
				title={
					productData
						? `Товар «${truncateString(productData.title, 64)}»`
						: "Товар"
				}
			>
				{productData && (
					<Button
						onClick={() =>
							handleToggleArchiveProduct(
								productData.id,
								!productData.isArchived
							)
						}
						variant="danger"
						icon={<Trash2 size={16} className="min-w-4" />}
						text={
							productData.isArchived
								? "Вернуть из архива"
								: "Переместить в архив"
						}
					/>
				)}
			</TopPanel>

			<div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_320px] gap-6">
				{productIsLoading && !productData && <Loader />}

				{!productIsLoading && productData && (
					<>
						{/* Основная информация о товаре */}
						<div className="lg:col-span-2">
							{/* Основная карточка */}
							<div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 p-6 mb-6">
								<div className="md:grid md:grid-cols-[260px_1fr] gap-6">
									<div className="relative">
										<div className="w-full h-64 overflow-hidden border border-gray-200 dark:border-neutral-700">
											<Image
												src={productData.images[0]}
												alt={productData.title}
												fill
												className="object-cover rounded-lg"
												priority
											/>
										</div>

										{/* платформенный бейдж (в левом верхнем углу) */}
										<div className="absolute top-3 left-3">
											<span className="inline-flex items-center gap-1 px-1.5 py-1 rounded-md bg-white/90 dark:bg-neutral-900/80 text-xs font-medium shadow-sm">
												<img
													src={`/images/platforms/${
														productData.marketplace ===
														"YANDEX_MARKET"
															? "yandex-market"
															: productData.marketplace.toLowerCase()
													}.png`}
													alt={
														productData.marketplace
													}
													className="h-4"
												/>
												<span className="text-slate-700 dark:text-slate-200 text-xs">
													{productData.marketplace ===
													"OZON"
														? "Ozon"
														: productData.marketplace ===
														  "WILDBERRIES"
														? "Wildberries"
														: productData.marketplace ===
														  "AVITO"
														? "Avito"
														: "Yandex Market"}
												</span>
											</span>
										</div>
									</div>

									<div className="flex flex-col justify-between">
										<header className="flex items-start justify-between gap-6">
											<div className="min-w-0">
												<h1
													id={`product-${productData.id}-title`}
													className="text-lg md:text-2xl font-semibold text-gray-900 dark:text-white leading-snug"
												>
													{productData.title}
												</h1>
												<div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
													<span>
														Артикул:{" "}
														<span className="font-medium text-gray-700 dark:text-gray-200">
															{
																productData.article
															}
														</span>
													</span>
												</div>
											</div>

											<div className="text-right shrink-0">
												<div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
													{productData.price.toLocaleString(
														"ru-RU"
													)}{" "}
													₽
												</div>

												{/* {productData.price <
												productData.basePrice ? (
													<div className="mt-1 flex items-center justify-end gap-2">
														<span className="text-sm text-gray-500 dark:text-gray-400 line-through">
															{productData.basePrice.toLocaleString(
																"ru-RU"
															)}{" "}
															₽
														</span>
														<span className="text-sm font-medium text-green-600 dark:text-green-400">
															-
															{Math.round(
																(1 -
																	productData.price /
																		productData.basePrice) *
																	100
															)}
															%
														</span>
													</div>
												) : (
													<div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
														Цена конкурентоспособна
													</div>
												)} */}
											</div>
										</header>

										<div className="grid grid-cols-3 gap-3 mb-4 text-center">
											{/* Рейтинг отзывов */}
											<div className="flex flex-col items-center justify-center p-3 bg-orange-50 dark:bg-orange-900/10 rounded-lg border border-orange-200 dark:border-orange-800">
												<div className="flex items-center gap-1 mb-1">
													<Star
														size={16}
														className="text-orange-500 fill-orange-500"
													/>
													<span className="font-bold text-gray-900 dark:text-white">
														{
															productData.review
																?.rating
														}
													</span>
												</div>
												<div className="text-xs text-gray-600 dark:text-gray-400">
													{
														productData.review
															?.totalCount
													}{" "}
													отзывов
												</div>
											</div>

											{/* Системный рейтинг */}
											<div className="relative flex flex-col items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-400 dark:border-blue-600 shadow-md">
												<div className="absolute -top-3.5">
													<span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold shadow">
														СИСТЕМА
													</span>
												</div>
												<div className="flex items-baseline justify-center gap-1 mb-1">
													<span className="text-2xl font-bold text-gray-900 dark:text-white">
														{productData.rating}
													</span>
													<span className="text-sm text-gray-500 dark:text-gray-400">
														-/5
													</span>
												</div>
												<div className="text-xs text-gray-600 dark:text-gray-400">
													Качество карточки
												</div>
											</div>

											{/* Положительные отзывы */}
											<div className="flex flex-col items-center justify-center p-3 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-800">
												<div className="flex items-center gap-1 mb-1">
													<ThumbsUp
														size={16}
														className="text-green-600 dark:text-green-400"
													/>
													<span className="text-lg font-bold text-green-600 dark:text-green-400">
														{positiveProductReviewPercent(
															productData.review
														)}
														%
													</span>
												</div>
												<div className="text-xs text-gray-600 dark:text-gray-400">
													Довольных покупателей
												</div>
											</div>
										</div>

										<div className="flex flex-wrap gap-3">
											<Button
												text="Улучшить карточку"
												icon={<Zap size={16} />}
												variant="premium"
											/>
											<Button
												text="Полная аналитика"
												icon={<BarChart3 size={16} />}
												variant="premium"
											/>
											<a
												href={productData.url}
												target="_blank"
												rel="noopener noreferrer"
												className="ml-auto text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
												aria-label="Открыть товар на маркетплейсе"
											>
												<Eye size={14} /> На
												маркетплейсе
											</a>
										</div>
									</div>
								</div>
							</div>

							{/* Навигация по разделам */}
							<div className="border-b border-gray-200 dark:border-neutral-700 mb-6">
								<nav className="flex flex-wrap -mb-px">
									{tabs.map((tab) => (
										<button
											key={tab.id}
											onClick={() => setActiveTab(tab.id)}
											className={`py-3 px-4 font-medium text-sm border-b-2 ${
												activeTab === tab.id
													? "border-blue-500 text-blue-600 dark:text-blue-400"
													: "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
											}`}
										>
											{tab.label}
										</button>
									))}
								</nav>
							</div>

							{/* Контент вкладок */}
							{activeTab === "analytics" && (
								<div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 p-6">
									<h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
										Аналитика товара
									</h2>

									{/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
										<div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl border border-blue-200 dark:border-blue-700">
											<div className="flex items-center gap-2 mb-2">
												<Eye
													className="text-blue-600 dark:text-blue-400"
													size={18}
												/>
												<span className="text-sm font-medium text-gray-600 dark:text-gray-300">
													Просмотры
												</span>
											</div>
											<div className="flex items-baseline gap-2">
												<span className="text-2xl font-bold text-gray-900 dark:text-white">
													{analytics.views.toLocaleString(
														"ru-RU"
													)}
												</span>
												<span className="text-sm text-green-500 font-medium flex items-center">
													<TrendingUp
														size={14}
														className="mr-1"
													/>
													12%
												</span>
											</div>
										</div>

										<div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl border border-green-200 dark:border-green-700">
											<div className="flex items-center gap-2 mb-2">
												<Target
													className="text-green-600 dark:text-green-400"
													size={18}
												/>
												<span className="text-sm font-medium text-gray-600 dark:text-gray-300">
													Конверсия
												</span>
											</div>
											<div className="flex items-baseline gap-2">
												<span className="text-2xl font-bold text-gray-900 dark:text-white">
													{analytics.conversion}%
												</span>
												<span className="text-sm text-red-500 font-medium flex items-center">
													<TrendingUp
														size={14}
														className="mr-1 rotate-180"
													/>
													2.1%
												</span>
											</div>
										</div>

										<div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-xl border border-purple-200 dark:border-purple-700">
											<div className="flex items-center gap-2 mb-2">
												<svg
													className="w-4 h-4 text-purple-600 dark:text-purple-400"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
													/>
												</svg>
												<span className="text-sm font-medium text-gray-600 dark:text-gray-300">
													В корзине
												</span>
											</div>
											<div className="flex items-baseline gap-2">
												<span className="text-2xl font-bold text-gray-900 dark:text-white">
													{analytics.cartAdds}
												</span>
												<span className="text-sm text-green-500 font-medium flex items-center">
													<TrendingUp
														size={14}
														className="mr-1"
													/>
													8%
												</span>
											</div>
										</div>

										<div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-xl border border-orange-200 dark:border-orange-700">
											<div className="flex items-center gap-2 mb-2">
												<CheckCircle
													className="text-orange-600 dark:text-orange-400"
													size={18}
												/>
												<span className="text-sm font-medium text-gray-600 dark:text-gray-300">
													Выкупы
												</span>
											</div>
											<div className="flex items-baseline gap-2">
												<span className="text-2xl font-bold text-gray-900 dark:text-white">
													{analytics.buyouts}
												</span>
												<span className="text-sm text-gray-500 font-medium">
													±0%
												</span>
											</div>
										</div>
									</div> */}

									<OnlyForPro
										text="Аналитика и графики доступны в PRO"
										icon={BarChart3}
									/>
								</div>
							)}

							{activeTab === "prices" && (
								<div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 p-6 mb-6">
									<h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
										История цен
									</h2>

									<div className="overflow-x-auto mb-6">
										<table className="w-full text-sm">
											<thead className="bg-gray-50 dark:bg-neutral-700 text-left text-gray-600 dark:text-gray-300">
												<tr>
													<th className="px-4 py-3 font-semibold">
														Дата
													</th>
													<th className="px-4 py-3 font-semibold">
														Цена
													</th>
													<th className="px-4 py-3 font-semibold">
														Изменение
													</th>
													<th className="px-4 py-3 font-semibold">
														Тренд
													</th>
												</tr>
											</thead>
											<tbody>
												{priceHistory.map(
													(item, index) => (
														<tr
															key={index}
															className="border-t border-gray-200 dark:border-neutral-700"
														>
															<td className="px-4 py-3">
																{item.date}
															</td>
															<td className="px-4 py-3 font-medium">
																{item.price.toLocaleString(
																	"ru-RU"
																)}{" "}
																₽
															</td>
															<td className="px-4 py-3">
																<PriceChangeDisplay
																	change={
																		item.change
																	}
																/>
															</td>
															<td className="px-4 py-3 text-gray-400">
																{/* Мини-график-заглушка */}
																<svg
																	className="w-20 h-6 opacity-40"
																	fill="none"
																	stroke="currentColor"
																	viewBox="0 0 100 30"
																>
																	<path
																		d="M0,20 L20,10 L40,15 L60,5 L80,12 L100,8"
																		strokeWidth="2"
																	/>
																</svg>
															</td>
														</tr>
													)
												)}
											</tbody>
										</table>
									</div>

									<OnlyForPro
										text="График изменения цены и прогнозы доступны в PRO"
										icon={TrendingUp}
									/>
								</div>
							)}

							{activeTab === "recommendations" && (
								<div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 p-6 mb-6">
									<div className="flex items-center justify-between mb-6">
										<h2 className="text-xl font-semibold text-gray-900 dark:text-white">
											Рекомендации по улучшению
										</h2>
										<button
											onClick={() =>
												setExpandedRecommendations(
													!expandedRecommendations
												)
											}
											className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
										>
											{expandedRecommendations
												? "Свернуть все"
												: "Развернуть все"}
										</button>
									</div>

									<div className="space-y-4">
										{recommendations.map((rec) => (
											<div
												key={rec.id}
												className="border border-gray-200 dark:border-neutral-700 rounded-lg overflow-hidden"
											>
												<div
													className={`flex items-center justify-between p-4 cursor-pointer ${
														rec.completed
															? "bg-green-50 dark:bg-green-900/20"
															: "bg-gray-50 dark:bg-neutral-700/30"
													}`}
													onClick={() =>
														toggleExpand(rec.id)
													}
												>
													<div className="flex items-center">
														<div className="flex items-center justify-center w-5 h-5 rounded-full border border-gray-300 dark:border-neutral-600 mr-3">
															<input
																type="checkbox"
																checked={
																	rec.completed
																}
																onChange={() =>
																	toggleRecommendationCompletion(
																		rec.id
																	)
																}
																className="opacity-0 absolute w-5 h-5 cursor-pointer"
															/>
															{rec.completed && (
																<CheckCircle
																	size={16}
																	className="text-green-500 fill-green-500"
																/>
															)}
														</div>
														<span
															className={`font-medium ${
																rec.completed
																	? "text-green-700 dark:text-green-300 line-through"
																	: "text-gray-900 dark:text-white"
															}`}
														>
															{rec.title}
														</span>
													</div>
													<div className="flex items-center gap-2">
														<PriorityBadge
															priority={
																rec.priority
															}
														/>
														<span className="text-sm font-medium text-blue-600 dark:text-blue-400">
															+{rec.impact}% к
															конверсии
														</span>
														{expandedRecommendations ? (
															<ChevronUp
																size={16}
															/>
														) : (
															<ChevronDown
																size={16}
															/>
														)}
													</div>
												</div>

												{expandedIds.includes(
													rec.id
												) && (
													<div className="p-4 border-t border-gray-200 dark:border-neutral-700">
														<p className="text-gray-700 dark:text-gray-300 mb-3">
															{rec.description}
														</p>
														<button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">
															Применить
															рекомендацию
														</button>
													</div>
												)}
											</div>
										))}
									</div>
								</div>
							)}

							{activeTab === "competitors" && (
								<div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 p-6 mb-6">
									<h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
										Анализ конкурентов
									</h2>

									<OnlyForPro
										text="Анализ конкурентов доступен в PRO-версии"
										icon={BarChart3}
									/>
								</div>
							)}
						</div>

						{/* Боковая панель */}
						<div className="lg:col-span-1">
							<div className="sticky top-6 space-y-6">
								{/* Статус товара */}
								<div className="bg-white dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700 overflow-hidden">
									<div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-neutral-700 dark:to-neutral-800 px-5 py-4 border-b border-gray-200 dark:border-neutral-700">
										<h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2.5">
											<div
												className={`w-2 h-2 rounded-full ${
													productData.isArchived
														? "bg-gray-400"
														: "bg-green-500 animate-pulse"
												}`}
											/>
											Статус товара
										</h3>
									</div>

									<div className="p-5 space-y-4">
										<div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-neutral-700/50 rounded-lg">
											<div>
												<div className="text-sm font-medium text-gray-600 dark:text-gray-300">
													Добавлен
												</div>
												<div className="text-xs text-gray-500 dark:text-gray-400">
													{dayjs
														.utc(
															productData.createdAt
														)
														.local()
														.fromNow()}
												</div>
											</div>
											<div className="text-sm font-semibold text-gray-900 dark:text-white">
												{dayjs
													.utc(productData.createdAt)
													.local()
													.format("D MMM")}
											</div>
										</div>

										<div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-neutral-700/50 rounded-lg">
											<div>
												<div className="text-sm font-medium text-gray-600 dark:text-gray-300">
													Обновлен
												</div>
												<div className="text-xs text-gray-500 dark:text-gray-400">
													{dayjs
														.utc(
															productData.updatedAt
														)
														.local()
														.fromNow()}
												</div>
											</div>
											<div className="text-sm font-semibold text-gray-900 dark:text-white">
												{dayjs
													.utc(productData.updatedAt)
													.local()
													.format("D MMM")}
											</div>
										</div>

										<div
											className={`p-3 rounded-lg border ${
												productData.isArchived
													? "bg-gray-100 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600"
													: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
											}`}
										>
											<div className="flex items-center justify-between">
												<span className="text-sm font-medium text-gray-600 dark:text-gray-300">
													Статус
												</span>
												{productData.isArchived ? (
													<span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
														<Archive
															size={12}
															className="mr-1"
														/>
														В архиве
													</span>
												) : (
													<span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200">
														<CheckCircle
															size={12}
															className="mr-1"
														/>
														Активный
													</span>
												)}
											</div>
										</div>
									</div>

									{!productData.isArchived && (
										<div className="px-5 pb-4">
											<button className="w-full py-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg font-medium text-sm hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex items-center justify-center gap-2">
												<RefreshCw size={16} />
												Обновить данные
											</button>
										</div>
									)}
								</div>

								{/* Последние изменения */}
								<div className="bg-white dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700 overflow-hidden">
									<div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-neutral-700 dark:to-neutral-800 px-5 py-4 border-b border-gray-200 dark:border-neutral-700">
										<h3 className="font-semibold text-gray-900 dark:text-white">
											Последние изменения
										</h3>
									</div>

									<div className="p-5">
										<div className="space-y-4">
											{changes.map((change, idx) => (
												<div
													key={idx}
													className="flex items-start gap-3 group"
												>
													<div
														className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
															change.color ===
															"bg-blue-500"
																? "bg-blue-500"
																: change.color ===
																  "bg-green-500"
																? "bg-green-500"
																: "bg-yellow-500"
														}`}
													/>
													<div className="flex-1 min-w-0">
														<p className="text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
															{change.text}
														</p>
														<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
															{dayjs
																.utc(
																	change.time
																)
																.local()
																.fromNow()}
														</p>
													</div>
												</div>
											))}
										</div>

										<Button
											className="mt-4 w-full text-center h-10 justify-center"
											text="Полная история"
											icon={<History size={16} />}
											variant="premium"
										/>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
