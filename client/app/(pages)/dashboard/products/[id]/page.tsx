"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
	Star,
	TrendingUp,
	CheckCircle,
	Download,
	BarChart3,
	Eye,
	Zap,
	ChevronDown,
	ChevronUp,
	HelpCircle,
	Target,
} from "lucide-react";
import { Tooltip } from "@heroui/react";
import TopPanel from "@/app/components/shared/top-panel";
import Button from "@/app/components/shared/button";

// Типы данных
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

// Моковые данные
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

export default function ProductDetailPage() {
	const params = useParams();
	const [product, setProduct] = useState<Product>(mockProduct);
	const [priceHistory, setPriceHistory] =
		useState<PriceHistory[]>(mockPriceHistory);
	const [analytics, setAnalytics] = useState<Analytics>(mockAnalytics);
	const [recommendations, setRecommendations] =
		useState<Recommendation[]>(mockRecommendations);
	const [activeTab, setActiveTab] = useState<string>("analytics");
	const [expandedRecommendations, setExpandedRecommendations] =
		useState<boolean>(true);

	// Загрузка данных товара (в реальном приложении - API запрос)
	useEffect(() => {
		// Здесь будет запрос к API для получения данных товара по ID
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

	return (
		<div className="space-y-6">
			<TopPanel title="Товар">
        <Button
					variant="accent"
					icon={<RefreshCw size={16} className="min-w-4" />}
					text="Обновить"
				/>
				<Button
					variant="accent"
					icon={<Trash2 size={16} className="min-w-4" />}
					text="Удалить"
				/>
			</TopPanel>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Основная информация о товаре */}
				<div className="lg:col-span-2">
					<div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 p-6 mb-6">
						<div className="flex flex-col md:flex-row gap-6">
							{/* Изображение товара */}
							<div className="flex-shrink-0">
								<div className="relative w-full md:w-64 h-64 rounded-lg overflow-hidden border border-gray-200 dark:border-neutral-700">
									<Image
										src={product.image}
										alt={product.name}
										fill
										className="object-cover"
									/>
								</div>
								<div className="flex items-center justify-center mt-4 gap-2">
									<span
										className={`text-sm font-medium ${
											product.inStock
												? "text-green-600"
												: "text-red-600"
										}`}
									>
										{product.inStock
											? "В наличии"
											: "Нет в наличии"}
									</span>
									<span className="text-sm text-gray-500 dark:text-gray-400">
										•
									</span>
									<span className="text-sm text-gray-500 dark:text-gray-400">
										{product.salesPerDay} продаж/день
									</span>
								</div>
							</div>

							{/* Информация о товаре */}
							<div className="flex-grow">
								<div className="flex items-start justify-between mb-2">
									<h1 className="text-2xl font-bold text-gray-900 dark:text-white pr-4">
										{product.name}
									</h1>
									<div className="whitespace-nowrap flex block items-center text-blue-600 dark:text-blue-400 text-sm">
										<Eye size={16} className="mr-1" /> На
										маркетплейсе
									</div>
								</div>

								<div className="flex items-center gap-2 mb-4">
									<span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs font-medium px-2 py-1 rounded-full">
										{product.platform === "ozon"
											? "Ozon"
											: product.platform === "wildberries"
											? "Wildberries"
											: product.platform === "avito"
											? "Avito"
											: "Yandex Market"}
									</span>
									<span className="text-sm text-gray-500 dark:text-gray-400">
										Артикул: {product.sku}
									</span>
								</div>

								<div className="flex items-center gap-4 mb-4">
									<div className="flex items-baseline gap-2">
										<span className="text-3xl font-bold text-gray-900 dark:text-white">
											{product.price.toLocaleString(
												"ru-RU"
											)}{" "}
											₽
										</span>
										{product.price < product.basePrice && (
											<span className="text-lg text-gray-500 dark:text-gray-400 line-through">
												{product.basePrice.toLocaleString(
													"ru-RU"
												)}{" "}
												₽
											</span>
										)}
									</div>
									{product.price < product.basePrice && (
										<span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-sm font-medium px-2 py-1 rounded">
											-
											{Math.round(
												(1 -
													product.price /
														product.basePrice) *
													100
											)}
											%
										</span>
									)}
								</div>

								{/* Рейтинг и отзывы */}
								<div className="flex items-center gap-4 mb-6">
									<div className="flex items-center gap-1">
										<div className="flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-md">
											<Star
												size={16}
												className="fill-yellow-400 text-yellow-400 mr-1"
											/>
											<span className="font-semibold">
												{product.reviewsRating}
											</span>
										</div>
										<span className="text-sm text-gray-600 dark:text-gray-400">
											{product.reviewsCount} отзывов
										</span>
									</div>

									<div className="flex items-center">
										<span className="text-sm text-gray-600 dark:text-gray-400">
											Положительных:{" "}
											<span className="font-medium text-green-600 dark:text-green-400">
												{product.positiveReviews}%
											</span>
										</span>
									</div>
								</div>

								{/* Оценка карточки */}
								<div className="mb-6">
									<div className="flex items-center justify-between mb-2">
										<h3 className="font-medium text-gray-900 dark:text-white">
											Оценка карточки товара
										</h3>
										<Tooltip
											content="Рассчитывается на основе анализа заполненности, SEO-оптимизации и конверсии"
											placement="top"
										>
											<HelpCircle
												size={16}
												className="text-gray-400 cursor-help"
											/>
										</Tooltip>
									</div>
									<div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-2.5">
										<div
											className="h-2.5 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
											style={{
												width: `${
													product.cardScore * 20
												}%`,
											}}
										></div>
									</div>
									<div className="flex justify-between items-center mt-1">
										<span className="text-xs text-gray-500 dark:text-gray-400">
											Низкая
										</span>
										<span className="text-xs font-medium text-gray-900 dark:text-white">
											{product.cardScore.toFixed(1)} из
											5.0
										</span>
										<span className="text-xs text-gray-500 dark:text-gray-400">
											Высокая
										</span>
									</div>
								</div>

								{/* Действия с товаром */}
								<div className="flex flex-wrap gap-2">
									<button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
										<BarChart3 size={16} className="mr-2" />{" "}
										Полная аналитика
									</button>
									<button className="flex items-center px-4 py-2 border border-gray-300 dark:border-neutral-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700 rounded-lg text-sm font-medium transition-colors">
										<Download size={16} className="mr-2" />{" "}
										CSV отчет
									</button>
									<button className="flex items-center px-4 py-2 border border-gray-300 dark:border-neutral-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700 rounded-lg text-sm font-medium transition-colors">
										<Zap size={16} className="mr-2" />{" "}
										Улучшить карточку
									</button>
								</div>
							</div>
						</div>
					</div>

					{/* Навигация по разделам */}
					<div className="border-b border-gray-200 dark:border-neutral-700 mb-6">
						<nav className="flex flex-wrap -mb-px">
							<button
								onClick={() => setActiveTab("analytics")}
								className={`py-3 px-4 font-medium text-sm border-b-2 ${
									activeTab === "analytics"
										? "border-blue-500 text-blue-600 dark:text-blue-400"
										: "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
								}`}
							>
								Аналитика
							</button>
							<button
								onClick={() => setActiveTab("prices")}
								className={`py-3 px-4 font-medium text-sm border-b-2 ${
									activeTab === "prices"
										? "border-blue-500 text-blue-600 dark:text-blue-400"
										: "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
								}`}
							>
								История цен
							</button>
							<button
								onClick={() => setActiveTab("recommendations")}
								className={`py-3 px-4 font-medium text-sm border-b-2 ${
									activeTab === "recommendations"
										? "border-blue-500 text-blue-600 dark:text-blue-400"
										: "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
								}`}
							>
								Рекомендации
							</button>
							<button
								onClick={() => setActiveTab("competitors")}
								className={`py-3 px-4 font-medium text-sm border-b-2 ${
									activeTab === "competitors"
										? "border-blue-500 text-blue-600 dark:text-blue-400"
										: "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
								}`}
							>
								Конкуренты
							</button>
						</nav>
					</div>

					{/* Контент вкладок */}
					{activeTab === "analytics" && (
						<div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 p-6 mb-6">
							<h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
								Аналитика товара
							</h2>

							<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
								<div className="bg-gray-50 dark:bg-neutral-700/30 p-4 rounded-lg">
									<div className="text-2xl font-bold text-gray-900 dark:text-white">
										{analytics.views}
									</div>
									<div className="text-sm text-gray-500 dark:text-gray-400">
										Просмотры
									</div>
								</div>
								<div className="bg-gray-50 dark:bg-neutral-700/30 p-4 rounded-lg">
									<div className="text-2xl font-bold text-gray-900 dark:text-white">
										{analytics.conversion}%
									</div>
									<div className="text-sm text-gray-500 dark:text-gray-400">
										Конверсия
									</div>
								</div>
								<div className="bg-gray-50 dark:bg-neutral-700/30 p-4 rounded-lg">
									<div className="text-2xl font-bold text-gray-900 dark:text-white">
										{analytics.cartAdds}
									</div>
									<div className="text-sm text-gray-500 dark:text-gray-400">
										В корзине
									</div>
								</div>
								<div className="bg-gray-50 dark:bg-neutral-700/30 p-4 rounded-lg">
									<div className="text-2xl font-bold text-gray-900 dark:text-white">
										{analytics.buyouts}
									</div>
									<div className="text-sm text-gray-500 dark:text-gray-400">
										Выкупы
									</div>
								</div>
							</div>

							<div className="bg-gray-100 dark:bg-neutral-700 p-4 rounded-lg text-center">
								<div className="flex items-center justify-center text-gray-500 dark:text-gray-400 mb-2">
									<Target size={18} className="mr-2" />
									<span>
										Графики и расширенная аналитика доступны
										в PRO-версии
									</span>
								</div>
								<button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">
									Перейти на PRO
								</button>
							</div>
						</div>
					)}

					{activeTab === "prices" && (
						<div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 p-6 mb-6">
							<h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
								История цен
							</h2>

							<div className="overflow-x-auto">
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
											</tr>
										))}
									</tbody>
								</table>
							</div>

							<div className="mt-6 bg-gray-100 dark:bg-neutral-700 p-4 rounded-lg text-center">
								<div className="flex items-center justify-center text-gray-500 dark:text-gray-400 mb-2">
									<TrendingUp size={18} className="mr-2" />
									<span>
										График изменения цены и прогнозы
										доступны в PRO-версии
									</span>
								</div>
								<button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">
									Перейти на PRO
								</button>
							</div>
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
												setExpandedRecommendations(
													!expandedRecommendations
												)
											}
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

										{expandedRecommendations && (
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

							<div className="bg-gray-100 dark:bg-neutral-700 p-6 rounded-lg text-center">
								<div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 mb-4">
									<BarChart3 size={32} className="mb-2" />
									<span className="text-lg font-medium">
										Анализ конкурентов доступен в PRO-версии
									</span>
									<p className="mt-2 max-w-md">
										Сравните цены, рейтинги и позиции в
										поиске среди конкурентов. Получайте
										рекомендации по улучшению
										позиционирования товара.
									</p>
								</div>
								<button className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors">
									Перейти на PRO
								</button>
							</div>
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
									<span className="inline-flex items-center text-sm font-medium text-green-600 dark:text-green-400">
										<CheckCircle
											size={14}
											className="mr-1"
										/>{" "}
										Активный
									</span>
								</div>

								<div className="flex items-center justify-between">
									<span className="text-sm text-gray-600 dark:text-gray-400">
										Мониторинг цен
									</span>
									<span className="inline-flex items-center text-sm font-medium text-green-600 dark:text-green-400">
										<CheckCircle
											size={14}
											className="mr-1"
										/>{" "}
										Включен
									</span>
								</div>
							</div>
						</div>

						{/* Последние изменения */}
						<div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 p-5">
							<h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
								Последние изменения
							</h3>

							<div className="space-y-3">
								<div className="flex items-start">
									<div className="flex-shrink-0 mt-0.5">
										<div className="w-2 h-2 rounded-full bg-blue-500"></div>
									</div>
									<div className="ml-3">
										<p className="text-sm text-gray-900 dark:text-white">
											Цена уменьшена на 100₽
										</p>
										<p className="text-xs text-gray-500 dark:text-gray-400">
											Сегодня в 14:30
										</p>
									</div>
								</div>

								<div className="flex items-start">
									<div className="flex-shrink-0 mt-0.5">
										<div className="w-2 h-2 rounded-full bg-green-500"></div>
									</div>
									<div className="ml-3">
										<p className="text-sm text-gray-900 dark:text-white">
											Добавлено 3 новых отзыва
										</p>
										<p className="text-xs text-gray-500 dark:text-gray-400">
											Вчера в 09:15
										</p>
									</div>
								</div>

								<div className="flex items-start">
									<div className="flex-shrink-0 mt-0.5">
										<div className="w-2 h-2 rounded-full bg-yellow-500"></div>
									</div>
									<div className="ml-3">
										<p className="text-sm text-gray-900 dark:text-white">
											Рейтинг изменился с 4.6 до 4.7
										</p>
										<p className="text-xs text-gray-500 dark:text-gray-400">
											20 ноября
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// Добавляем недостающие иконки
function RefreshCw(props: any) {
	return (
		<svg
			{...props}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
			<path d="M21 3v5h-5" />
			<path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
			<path d="M8 16H3v5" />
		</svg>
	);
}

function Trash2(props: any) {
	return (
		<svg
			{...props}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M3 6h18" />
			<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
			<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
		</svg>
	);
}
