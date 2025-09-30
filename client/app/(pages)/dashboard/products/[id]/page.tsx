"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";
import { RefreshCw, Trash2 } from "lucide-react";

import TopPanel from "@/app/components/shared/top-panel";
import Button from "@/app/components/shared/button";

interface Product {
	id: number;
	name: string;
	price: number;
	basePrice: number;
	image: string;
	cardScore: number;
	reviewsRating?: number;
	reviewsCount?: number;
	positiveReviews?: number;
	platform: "ozon" | "wildberries" | "avito" | "yandex";
	url: string;
	sku: string;
	addedDate: string;
	lastUpdated: string;
	category: string;
	seller: string;
	inStock: boolean;
	salesPerDay: number;
}

interface PriceHistory {
	date: string;
	price: number;
	change: number;
}

interface Analytics {
	views: number;
	conversion: number;
	cartAdds: number;
	buyouts: number;
}

interface Recommendation {
	id: number;
	title: string;
	description: string;
	priority: "high" | "medium" | "low";
	impact: number;
	completed: boolean;
}

const mockProduct: Product = {
	id: 1,
	name: "Умная колонка Яндекс Станция Мини 2 с Алисой, черный",
	price: 7990,
	basePrice: 8490,
	image: "/images/products/smart-speaker.jpg",
	cardScore: 4.2,
	reviewsRating: 4.7,
	reviewsCount: 1245,
	positiveReviews: 89,
	platform: "ozon",
	url: "https://www.ozon.ru/product/umnaya-kolonka-yandeks-stantsiya-mini-2-s-alisoy-chernyy-123456789/",
	sku: "123456789",
	addedDate: "2023-10-15",
	lastUpdated: "2023-11-20",
	category: "Электроника → Аудиотехника → Умные колонки",
	seller: "Яндекс Маркет",
	inStock: true,
	salesPerDay: 23,
};

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

const mockAnalytics: Analytics = {
	views: 1250,
	conversion: 4.2,
	cartAdds: 89,
	buyouts: 52,
};

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
		time: "Сегодня в 14:30",
	},
	{
		color: "bg-green-500",
		text: "Добавлено 3 новых отзыва",
		time: "Вчера в 09:15",
	},
	{
		color: "bg-yellow-500",
		text: "Рейтинг изменился с 4.6 до 4.7",
		time: "20 ноября",
	},
];

function MetricCard({
	value,
	label,
	trend,
}: {
	value: string | number;
	label: string;
	trend?: "up" | "down" | "neutral";
}) {
	const colors = {
		up: "text-green-500",
		down: "text-red-500",
		neutral: "text-gray-400",
	};

	const icons = {
		up: "▲",
		down: "▼",
		neutral: "•",
	};

	return (
		<div className="bg-gray-50 dark:bg-neutral-700/30 p-4 rounded-lg">
			<div className="flex items-baseline gap-2">
				<div className="text-2xl font-bold text-gray-900 dark:text-white">
					{value}
				</div>
				{trend && (
					<span className={`text-sm ${colors[trend]}`}>
						{icons[trend]}
					</span>
				)}
			</div>
			<div className="text-sm text-gray-500 dark:text-gray-400">
				{label}
			</div>
		</div>
	);
}

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
	const [product] = useState<Product>(mockProduct);
	const [priceHistory] = useState<PriceHistory[]>(mockPriceHistory);
	const [analytics] = useState<Analytics>(mockAnalytics);
	const [recommendations, setRecommendations] =
		useState<Recommendation[]>(mockRecommendations);
	const [activeTab, setActiveTab] = useState<string>("analytics");
	const [expandedRecommendations, setExpandedRecommendations] =
		useState<boolean>(true);

	useEffect(() => {
		console.log("Loading product with ID:", params.id);
	}, [params.id]);

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

	return (
		<div className="space-y-6">
			<TopPanel title={`Товар «${product.name}»`}>
				<Button
					variant="danger"
					icon={<Trash2 size={16} className="min-w-4" />}
					text="Удалить товар"
				/>
			</TopPanel>

			<div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-6">
				{/* Основная информация о товаре */}
				<div className="lg:col-span-2">
					{/* Основная карточка */}
					<div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 p-6 mb-6">
						<div className="md:grid md:grid-cols-[260px_1fr] gap-6">
							<div className="relative">
								<div className="w-full h-64 overflow-hidden border border-gray-200 dark:border-neutral-700">
									<Image
										src={product.image}
										alt={product.name}
										fill
										className="object-cover rounded-lg"
										priority
									/>
								</div>

								{/* платформенный бейдж (в левом верхнем углу) */}
								<div className="absolute top-3 left-3">
									<span className="inline-flex items-center gap-1 px-1.5 py-1 rounded-md bg-white/90 dark:bg-neutral-900/80 text-xs font-medium shadow-sm">
										<img
											src={`/images/platforms/${product.platform}.png`}
											alt={product.platform}
											className="h-4"
										/>
										<span className="text-slate-700 dark:text-slate-200 text-xs">
											{product.platform === "ozon"
												? "Ozon"
												: product.platform ===
												  "wildberries"
												? "Wildberries"
												: product.platform === "avito"
												? "Avito"
												: "Yandex Market"}
										</span>
									</span>
								</div>
							</div>

							<div className="flex flex-col justify-between">
								<header className="flex items-start justify-between gap-4">
									<div className="min-w-0">
										<h1
											id={`product-${product.id}-title`}
											className="text-lg md:text-2xl font-semibold text-gray-900 dark:text-white leading-snug"
										>
											{product.name}
										</h1>
										<div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
											<span>
												Артикул:{" "}
												<span className="font-medium text-gray-700 dark:text-gray-200">
													{product.sku}
												</span>
											</span>
										</div>
									</div>

									<div className="text-right">
										<div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
											{product.price.toLocaleString(
												"ru-RU"
											)}{" "}
											₽
										</div>

										{product.price < product.basePrice ? (
											<div className="mt-1 flex items-center justify-end gap-2">
												<span className="text-sm text-gray-500 dark:text-gray-400 line-through">
													{product.basePrice.toLocaleString(
														"ru-RU"
													)}{" "}
													₽
												</span>
												<span className="text-sm font-medium text-green-600 dark:text-green-400">
													-
													{Math.round(
														(1 -
															product.price /
																product.basePrice) *
															100
													)}
													%
												</span>
											</div>
										) : (
											<div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
												Цена конкурентоспособна
											</div>
										)}
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
												{product.reviewsRating}
											</span>
										</div>
										<div className="text-xs text-gray-600 dark:text-gray-400">
											{product.reviewsCount} отзывов
										</div>
									</div>

									{/* Системный рейтинг */}
									<div className="relative flex flex-col items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-400 dark:border-blue-600 shadow-md">
										<div className="absolute -top-2">
											<span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold shadow">
												СИСТЕМА
											</span>
										</div>
										<div className="flex items-baseline justify-center gap-1 mt-2 mb-1">
											<span className="text-2xl font-bold text-gray-900 dark:text-white">
												{product.cardScore.toFixed(1)}
											</span>
											<span className="text-sm text-gray-500 dark:text-gray-400">
												/5
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
												{product.positiveReviews}%
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
										href={product.url}
										target="_blank"
										rel="noopener noreferrer"
										className="ml-auto text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
										aria-label="Открыть товар на маркетплейсе"
									>
										<Eye size={14} /> На маркетплейсе
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
						<div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 p-6 mb-6">
							<h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
								Аналитика товара
							</h2>

							<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
								<MetricCard
									value={analytics.views}
									label="Просмотры"
									trend="up"
								/>
								<MetricCard
									value={`${analytics.conversion}%`}
									label="Конверсия"
									trend="down"
								/>
								<MetricCard
									value={analytics.cartAdds}
									label="В корзине"
									trend="up"
								/>
								<MetricCard
									value={analytics.buyouts}
									label="Выкупы"
									trend="neutral"
								/>
							</div>

							<OnlyForPro
								text="Графики и расширенная аналитика доступны в PRO"
								icon={Target}
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
										{priceHistory.map((item, index) => (
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
														change={item.change}
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
										))}
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
											onClick={() => toggleExpand(rec.id)}
										>
											<div className="flex items-center">
												<div className="flex items-center justify-center w-5 h-5 rounded-full border border-gray-300 dark:border-neutral-600 mr-3">
													<input
														type="checkbox"
														checked={rec.completed}
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
													priority={rec.priority}
												/>
												<span className="text-sm font-medium text-blue-600 dark:text-blue-400">
													+{rec.impact}% к конверсии
												</span>
												{expandedRecommendations ? (
													<ChevronUp size={16} />
												) : (
													<ChevronDown size={16} />
												)}
											</div>
										</div>

										{expandedIds.includes(rec.id) && (
											<div className="p-4 border-t border-gray-200 dark:border-neutral-700">
												<p className="text-gray-700 dark:text-gray-300 mb-3">
													{rec.description}
												</p>
												<button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">
													Применить рекомендацию
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
						<div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 p-5">
							<h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
								Статус товара
							</h3>

							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<span className="text-sm text-gray-600 dark:text-gray-400">
										Добавлен
									</span>
									<span className="text-sm font-medium text-gray-900 dark:text-white">
										{product.addedDate}
									</span>
								</div>

								<div className="flex items-center justify-between">
									<span className="text-sm text-gray-600 dark:text-gray-400">
										Обновлен
									</span>
									<span className="text-sm font-medium text-gray-900 dark:text-white">
										{product.lastUpdated}
									</span>
								</div>

								<div className="flex items-center justify-between">
									<span className="text-sm text-gray-600 dark:text-gray-400">
										Статус
									</span>
									<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
										<CheckCircle
											size={14}
											className="mr-1"
										/>{" "}
										Активный
									</span>
								</div>
							</div>

							<button className="mt-4 w-full text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center justify-center">
								<RefreshCw size={14} className="mr-1" />{" "}
								Обновить данные
							</button>
						</div>

						{/* Последние изменения */}
						<div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 p-5">
							<h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
								Последние изменения
							</h3>

							<div className="relative pl-3 border-l border-gray-200 dark:border-neutral-700 space-y-4">
								{changes.map((ch, idx) => (
									<div key={idx} className="flex items-start">
										<div className="absolute -left-1.5 mt-1 w-3 h-3 rounded-full bg-blue-500" />
										<div>
											<p className="text-sm text-gray-900 dark:text-white">
												{ch.text}
											</p>
											<p className="text-xs text-gray-500 dark:text-gray-400">
												{ch.time}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
