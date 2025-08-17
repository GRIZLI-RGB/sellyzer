"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { LayoutGrid, Table as TableIcon, Plus, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";

import { useDebounce } from "@/app/hooks/useDebounce";
import Modal from "@/app/components/shared/modal";
import { Tooltip } from "@heroui/react";
import TopPanel from "@/app/components/shared/top-panel";
import Button from "@/app/components/shared/button";

const isUrl = (s?: string) => {
	if (!s) return false;
	try {
		// allow schemeless URLs by adding protocol if missing
		const maybe = s.startsWith("http") ? s : `https://${s}`;
		new URL(maybe);
		return true;
	} catch {
		return false;
	}
};

type PriceWithChangeProps = {
	currentPrice?: number;
	basePrice: number;
};

const PriceWithChange = ({ currentPrice, basePrice }: PriceWithChangeProps) => {
	const getRandomCurrentPrice = useMemo(() => {
		return basePrice + Math.floor(Math.random() * 1001) - 500;
	}, [basePrice]);

	const diff = (currentPrice || getRandomCurrentPrice) - basePrice;
	const diffPercent = basePrice
		? ((diff / basePrice) * 100).toFixed(1)
		: null;

	const isUp = diff > 0;
	const isDown = diff < 0;

	const color = isUp
		? "text-green-600 dark:text-green-400"
		: isDown
		? "text-red-600 dark:text-red-400"
		: "text-gray-500 dark:text-gray-400";

	return (
		<div className="flex items-center gap-1">
			<span>
				{(currentPrice || getRandomCurrentPrice).toLocaleString(
					"ru-RU"
				)}{" "}
				₽
			</span>
			{diffPercent && diffPercent !== "0.0" && (
				<span
					className={`text-xs font-semibold flex items-center gap-px ${color}`}
					title={`Изменение цены: ${diffPercent}%`}
				>
					{isUp && <FiArrowUpRight size={12} />}
					{isDown && <FiArrowDownRight size={12} />}
					{!isUp && !isDown && "–"} {Math.abs(+diffPercent)}%
				</span>
			)}
		</div>
	);
};

type Product = {
	id: number;
	name: string;
	price: number;
	image: string;
	cardScore: number;
	reviewsRating?: number;
	reviewsCount?: number;
	positiveReviews?: number;
	platform: "ozon" | "wildberries" | "avito" | "yandex";
};

const mockProducts: Product[] = [
	{
		id: 1,
		name: "Умная колонка Яндекс Станция Мини 2 с Алисой",
		price: 7990,
		image: "/images/products/smart-speaker.jpg",
		cardScore: 4.2,
		reviewsRating: 4.7,
		reviewsCount: 1245,
		positiveReviews: 17,
		platform: "ozon",
	},
	{
		id: 2,
		name: "Наушники беспроводные Realme Buds Air 5 Pro",
		price: 5490,
		image: "/images/products/earphones.jpg",
		cardScore: 3.8,
		reviewsRating: 4.3,
		reviewsCount: 892,
		positiveReviews: 780,
		platform: "wildberries",
	},
	{
		id: 3,
		name: "Смартфон Xiaomi Redmi Note 12 Pro",
		price: 18990,
		image: "/images/products/earphones.jpg",
		cardScore: 2.5,
		reviewsRating: 4.6,
		reviewsCount: 3250,
		positiveReviews: 2950,
		platform: "ozon",
	},
	{
		id: 4,
		name: "Пылесос робот Xiaomi Mi Robot Vacuum-Mop",
		price: 9990,
		image: "/images/products/earphones.jpg",
		cardScore: 3.9,
		reviewsRating: 4.1,
		reviewsCount: 1789,
		positiveReviews: 1340,
		platform: "wildberries",
	},
	{
		id: 5,
		name: "Игровая консоль Sony PlayStation 5",
		price: 49990,
		image: "/images/products/earphones.jpg",
		cardScore: 4.8,
		reviewsRating: 4.9,
		reviewsCount: 785,
		positiveReviews: 765,
		platform: "ozon",
	},
	{
		id: 6,
		name: "Смарт-часы Apple Watch Series 9",
		price: 34990,
		image: "/images/products/earphones.jpg",
		cardScore: 4.3,
		reviewsRating: 4.7,
		reviewsCount: 1500,
		positiveReviews: 140,
		platform: "wildberries",
	},
	{
		id: 7,
		name: "Камера GoPro HERO10 Black",
		price: 22990,
		image: "/images/products/earphones.jpg",
		cardScore: 4.0,
		reviewsRating: 4.2,
		reviewsCount: 675,
		positiveReviews: 620,
		platform: "avito",
	},
	{
		id: 8,
		name: "Наушники Bose QuietComfort 45",
		price: 19990,
		image: "/images/products/earphones.jpg",
		cardScore: 3.7,
		reviewsRating: 4.0,
		reviewsCount: 410,
		positiveReviews: 380,
		platform: "yandex",
	},
	{
		id: 9,
		name: "Планшет Samsung Galaxy Tab S8",
		price: 29990,
		image: "/images/products/earphones.jpg",
		cardScore: 4.4,
		reviewsRating: 4.5,
		reviewsCount: 1230,
		positiveReviews: 1150,
		platform: "ozon",
	},
	{
		id: 10,
		name: "Bluetooth-колонка JBL Flip 6",
		price: 7990,
		image: "/images/products/earphones.jpg",
		cardScore: 4.1,
		reviewsRating: 4.3,
		reviewsCount: 980,
		positiveReviews: 920,
		platform: "wildberries",
	},
];

const platforms: {
	id: Product["platform"];
	name: string;
	img: string;
	available: boolean;
	color?: string;
}[] = [
	{
		id: "ozon",
		name: "Ozon",
		img: "/images/platforms/ozon.png",
		available: true,
		color: "blue",
	},
	{
		id: "wildberries",
		name: "Wildberries",
		img: "/images/platforms/wildberries.png",
		available: true,
		color: "purple",
	},
	{
		id: "avito",
		name: "Avito",
		img: "/images/platforms/avito.png",
		available: false,
	},
	{
		id: "yandex",
		name: "Yandex Market",
		img: "/images/platforms/yandex-market.png",
		available: false,
	},
];

const ScoreDisplay = ({ score }: { score: number }) => {
	const bg =
		score >= 4.2
			? "bg-green-50 dark:bg-green-900"
			: score >= 3.5
			? "bg-yellow-50 dark:bg-yellow-900"
			: "bg-red-50 dark:bg-red-900";

	const textColor =
		score >= 4.2
			? "text-green-700 dark:text-green-300"
			: score >= 3.5
			? "text-yellow-700 dark:text-yellow-300"
			: "text-red-700 dark:text-red-300";

	return (
		<div
			role="status"
			aria-label={`Оценка карточки ${score.toFixed(1)}`}
			className={`${bg} ${textColor} rounded-md px-3 py-1 font-semibold text-sm w-max select-none`}
		>
			{score.toFixed(1)}
		</div>
	);
};

const ReviewsDisplay = ({
	rating,
	count,
	positive,
}: {
	rating?: number;
	count?: number;
	positive?: number;
}) => {
	if (!rating || !count) {
		return (
			<div className="text-xs text-gray-500 dark:text-gray-400 italic">
				Нет отзывов
			</div>
		);
	}

	const positivePercent =
		positive && positive > 0 ? Math.round((positive / count) * 100) : null;

	let positiveColor = "text-green-600 dark:text-green-400";
	if (positivePercent !== null) {
		if (positivePercent < 50)
			positiveColor = "text-red-600 dark:text-red-400";
		else if (positivePercent < 80)
			positiveColor = "text-yellow-600 dark:text-yellow-400";
	}

	return (
		<div className="flex flex-col gap-1">
			<div className="flex items-center gap-1">
				<Star
					size={16}
					className="text-yellow-400 dark:text-yellow-300 flex-shrink-0"
					aria-hidden="true"
				/>
				<span className="font-semibold text-gray-800 dark:text-gray-200">
					{rating.toFixed(1)}
				</span>
				<span className="text-xs text-gray-500 dark:text-gray-400 ml-0.5 pt-px">
					({count.toLocaleString("ru-RU")} отзыв
					{count % 10 === 1 && count % 100 !== 11 ? "" : "ов"})
				</span>
			</div>
			{positivePercent !== null && (
				<div className={`text-xs font-medium ${positiveColor}`}>
					{positivePercent}% положительных
				</div>
			)}
		</div>
	);
};

const PlatformBadge = ({
	platform,
}: {
	platform: "ozon" | "wildberries" | "avito" | "yandex" | string;
}) => {
	const platformData = {
		ozon: {
			name: "Ozon",
			color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
			logo: "/images/platforms/ozon.png",
		},
		wildberries: {
			name: "Wildberries",
			color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
			logo: "/images/platforms/wildberries.png",
		},
		avito: {
			name: "Avito",
			color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
			logo: "/images/platforms/avito.png",
		},
		yandex: {
			name: "Yandex Market",
			color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
			logo: "/images/platforms/yandex-market.png",
		},
	};

	const data = platformData[platform as keyof typeof platformData] || {
		name: platform,
		color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
		logo: "/images/platforms/default.png",
	};

	return (
		<span
			className={`font-medium text-xs px-2 py-1 rounded-full ${data.color} inline-flex items-center gap-1`}
		>
			<Image
				src={data.logo}
				alt={data.name}
				width={16}
				height={16}
				className="w-4 h-4"
			/>
			{data.name}
		</span>
	);
};

export default function ProductsPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const debouncedQuery = useDebounce(searchQuery);
	const [view, setView] = useState<"table" | "cards">("table");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [step, setStep] = useState<1 | 2>(1);
	const [selectedPlatform, setSelectedPlatform] = useState<
		Product["platform"] | null
	>(null);
	const [productLink, setProductLink] = useState("");

	useEffect(() => {
		if (typeof window === "undefined") return;
		const saved = localStorage.getItem("products-view");
		if (saved) {
			setView(saved as "table" | "cards");
		} else {
			if (window.innerWidth < 768) {
				setView("cards");
			}
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("products-view", view);
	}, [view]);

	const filteredProducts = mockProducts.filter((product) =>
		product.name.toLowerCase().includes(debouncedQuery.toLowerCase())
	);

	const handleAddProduct = () => {
		console.log({ selectedPlatform, productLink });
		setIsModalOpen(false);
		setStep(1);
		setSelectedPlatform(null);
		setProductLink("");
	};

	const [inputMode, setInputMode] = useState<"url" | "sku">("url");
	const [userPickedMode, setUserPickedMode] = useState(false); // true если юзер явно нажал сегмент
	const inputRef = useRef<HTMLInputElement | null>(null);

	const isValidUrl = isUrl(productLink);
	const canSubmit =
		inputMode === "url" ? isValidUrl : productLink.trim().length > 0;

	useEffect(() => {
		if (userPickedMode && inputRef.current) {
			inputRef.current.focus();
		}
	}, [userPickedMode, inputMode]);

	return (
		<div className="space-y-4">
			{/* Верхняя панель */}
			<TopPanel
				title="Товары"
				numberElements={filteredProducts.length}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
			>
				{/* Переключатель вида */}
				<div className="flex border border-gray-200 dark:border-neutral-700 rounded-lg p-0.5">
					<button
						onClick={() => setView("table")}
						className={clsx(
							"p-1.5 rounded-md transition-base",
							view === "table"
								? "bg-black text-white dark:bg-white dark:text-black"
								: "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
						)}
						aria-label="Таблица"
					>
						<TableIcon size={18} />
					</button>
					<button
						onClick={() => setView("cards")}
						className={clsx(
							"p-1.5 rounded-md transition-base",
							view === "cards"
								? "bg-black text-white dark:bg-white dark:text-black"
								: "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
						)}
						aria-label="Карточки"
					>
						<LayoutGrid size={18} />
					</button>
				</div>

				{/* Добавить товар */}
				<Button
					variant="accent"
					icon={<Plus size={16} />}
					text="Добавить товар"
					onClick={() => setIsModalOpen(true)}
				/>
			</TopPanel>

			{/* Контент */}
			{filteredProducts.length === 0 ? (
				<div className="border border-gray-200 dark:border-neutral-700 rounded-lg p-10 text-center bg-gray-50 dark:bg-neutral-800">
					<div className="mx-auto max-w-sm flex flex-col items-center">
						<div className="mb-6">
							<Image
								quality={100}
								src="/images/empty-state-products.png"
								alt="Нет товаров"
								width={160}
								height={160}
							/>
						</div>

						<h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
							У вас пока нет товаров
						</h3>
						<p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
							Добавьте свой первый товар, чтобы начать
							анализировать карточку и отслеживать показатели.
						</p>

						<button
							onClick={() => setIsModalOpen(true)}
							className="transition-base px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md flex items-center gap-2 text-sm hover:opacity-90"
						>
							<Plus size={16} />
							Добавить товар
						</button>
					</div>
				</div>
			) : view === "table" ? (
				<div className="overflow-x-auto border border-gray-200 dark:border-neutral-700 rounded-lg">
					<table className="w-full text-sm">
						<thead className="bg-gray-50 dark:bg-neutral-800 text-gray-600 dark:text-gray-300">
							<tr>
								<th className="font-semibold px-4 py-3 text-left">
									Товар
								</th>
								<th className="font-semibold px-4 py-3 text-left">
									Цена
								</th>
								<th className="font-semibold px-4 py-3 text-left">
									Оценка
								</th>
								<th className="font-semibold px-4 py-3 text-left">
									Отзывы
								</th>
								<th className="font-semibold px-4 py-3 text-left">
									Платформа
								</th>{" "}
								<th className="font-semibold px-4 py-3 text-left">
									Конкуренты
								</th>
							</tr>
						</thead>
						<tbody>
							{filteredProducts.map((p) => (
								<tr
									key={p.id}
									className="border-t border-gray-200 dark:border-neutral-700 hover:bg-gray-50/50 dark:hover:bg-neutral-800/50 transition-base group cursor-pointer"
									onClick={() => {
										window.location.href = `/dashboard/products/${p.id}`;
									}}
									tabIndex={0}
									onKeyDown={(e) => {
										if (
											e.key === "Enter" ||
											e.key === " "
										) {
											window.location.href = `/dashboard/products/${p.id}`;
										}
									}}
								>
									<td className="px-4 py-3 flex items-center gap-3">
										<Image
											src={p.image}
											alt={p.name}
											width={48}
											height={48}
											className="rounded-md border border-gray-200 dark:border-neutral-700 min-w-12 h-12 object-cover"
										/>
										<span className="font-medium group-hover:underline">
											{p.name}
										</span>
									</td>
									<td className="px-4 py-3 font-medium">
										<PriceWithChange basePrice={p.price} />
									</td>
									<td className="px-4 py-3 max-w-max">
										<ScoreDisplay score={p.cardScore} />
									</td>
									<td className="px-4 py-3">
										<ReviewsDisplay
											rating={p.reviewsRating}
											count={p.reviewsCount}
											positive={p.positiveReviews}
										/>
									</td>
									<td className="px-4 py-3">
										{p.platform && (
											<PlatformBadge
												platform={p.platform}
											/>
										)}
									</td>
									<td className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
										<Tooltip
											size="sm"
											classNames={{
												base: "max-w-[134px]",
												content:
													"py-3 px-4 dark:border dark:border-gray-800",
											}}
											content="Доступно только в PRO-версии"
										>
											<span className="cursor-help underline decoration-dotted">
												Только в PRO
											</span>
										</Tooltip>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{filteredProducts.map((p) => (
						<Link
							key={p.id}
							href={`/dashboard/products/${p.id}`}
							className="border border-gray-200 dark:border-neutral-700 rounded-lg p-4 flex flex-col hover:border-gray-300 dark:hover:border-neutral-600 transition-base group cursor-pointer"
						>
							<div className="relative aspect-square w-full mb-3 rounded-lg overflow-hidden border border-gray-200 dark:border-neutral-700">
								<Image
									src={p.image}
									alt={p.name}
									fill
									className="object-cover"
								/>
							</div>
							<h3 className="font-medium line-clamp-2 mb-2 group-hover:underline text-gray-900 dark:text-white">
								{p.name}
							</h3>

							<div className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
								<PriceWithChange basePrice={p.price} />
							</div>

							<div className="flex justify-between items-center mb-3">
								<ScoreDisplay score={p.cardScore} />
								<div className="text-xs text-right">
									<ReviewsDisplay
										rating={p.reviewsRating}
										count={p.reviewsCount}
										positive={p.positiveReviews}
									/>
								</div>
							</div>

							<div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100 dark:border-neutral-700 text-sm text-gray-500 dark:text-gray-400">
								{p.platform ? (
									<PlatformBadge platform={p.platform} />
								) : (
									<span>—</span>
								)}

								<Tooltip
									size="sm"
									classNames={{
										base: "max-w-[140px]",
										content:
											"py-2 px-3 dark:border dark:border-gray-800",
									}}
									content="Только в PRO"
								>
									<span className="cursor-help underline decoration-dotted select-none">
										Анализ конкурентов
									</span>
								</Tooltip>
							</div>
						</Link>
					))}
				</div>
			)}

			{/* Модалка добавления товара */}
			<Modal
				open={isModalOpen}
				onClose={() => {
					setIsModalOpen(false);
					setTimeout(() => {
						setStep(1);
						setSelectedPlatform(null);
						setProductLink("");
					}, 200);
				}}
			>
				<div className="p-6">
					<h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
						Добавить товар
					</h2>

					{step === 1 ? (
						<div className="space-y-4">
							<div>
								<h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">
									Выберите платформу
								</h3>
								<div className="grid grid-cols-2 gap-2">
									{platforms.map((p) => (
										<button
											key={p.id}
											disabled={!p.available}
											onClick={() =>
												p.available &&
												setSelectedPlatform(p.id)
											}
											className={clsx(
												"p-3 border rounded-lg flex flex-col items-center transition-base",
												p.available
													? selectedPlatform === p.id
														? `border-${p.color}-500 bg-${p.color}-50 dark:bg-${p.color}-900/30`
														: "border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800"
													: "opacity-50 border-gray-200 dark:border-neutral-700 !cursor-not-allowed",
												"text-gray-800 dark:text-gray-200"
											)}
										>
											<Image
												src={p.img}
												alt={p.name}
												width={32}
												height={32}
												className="mb-1"
											/>
											<span className="font-medium">
												{p.name}
											</span>
											<span className="text-xs text-gray-500 dark:text-gray-400">
												{p.available
													? "Доступно"
													: "Скоро"}
											</span>
										</button>
									))}
								</div>
							</div>

							{selectedPlatform && (
								<div className="pt-2">
									<button
										onClick={() => setStep(2)}
										className="w-full py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-base"
									>
										Продолжить
									</button>
								</div>
							)}
						</div>
					) : (
						<div className="space-y-4">
							<div>
								<h3 className="font-medium mb-1 text-gray-800 dark:text-gray-200">
									Платформа
								</h3>

								<div className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-neutral-800 rounded-lg">
									<div className="flex items-center gap-2">
										<div className="w-8 h-8 rounded-md bg-white/60 dark:bg-black/20 flex items-center justify-center border border-gray-200 dark:border-neutral-700">
											<Image
												src={
													platforms.find(
														(p) =>
															p.id ===
															selectedPlatform
													)?.img ||
													"/images/platforms/default.png"
												}
												alt={
													platforms.find(
														(p) =>
															p.id ===
															selectedPlatform
													)?.name || "platform"
												}
												width={28}
												height={28}
												className="object-contain"
											/>
										</div>
										<div className="text-sm">
											<div className="font-medium text-gray-800 dark:text-gray-200">
												{platforms.find(
													(p) =>
														p.id ===
														selectedPlatform
												)?.name || selectedPlatform}
											</div>
										</div>
									</div>

									<button
										onClick={() => setStep(1)}
										className="ml-auto text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
										type="button"
									>
										Изменить
									</button>
								</div>
							</div>

							<div>
								<div className="text-sm font-medium mb-2 text-gray-800 dark:text-gray-200">
									Формат ввода
								</div>
								<div className="inline-flex rounded-md border border-gray-200 dark:border-neutral-700 p-1 bg-white dark:bg-neutral-800">
									<button
										type="button"
										onClick={() => setInputMode("url")}
										aria-pressed={inputMode === "url"}
										className={clsx(
											"px-3 py-1 rounded-md text-sm transition-base",
											inputMode === "url"
												? "bg-black text-white dark:bg-white dark:text-black"
												: "text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
										)}
									>
										Ссылка
									</button>
									<button
										type="button"
										onClick={() => setInputMode("sku")}
										aria-pressed={inputMode === "sku"}
										className={clsx(
											"px-3 py-1 rounded-md text-sm transition-base",
											inputMode === "sku"
												? "bg-black text-white dark:bg-white dark:text-black"
												: "text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
										)}
									>
										Артикул
									</button>
								</div>
							</div>

							<div>
								<label
									htmlFor="product-link"
									className="block font-medium mb-1 text-gray-800 dark:text-gray-200"
								>
									{inputMode === "url"
										? "Ссылка на товар"
										: "Артикул товара"}
								</label>

								<input
									ref={inputRef}
									id="product-link"
									value={productLink}
									onChange={(e) => {
										const v = e.target.value;
										setProductLink(v);

										if (!userPickedMode && isUrl(v)) {
											setInputMode("url");
										}
									}}
									onPaste={(e) => {
										const text =
											e.clipboardData.getData("text");
										if (isUrl(text)) {
											setInputMode("url");
											setProductLink(text);
											setUserPickedMode(false);
										}
									}}
									onKeyDown={(e) => {
										if (e.key === "Enter" && canSubmit) {
											handleAddProduct();
										}
									}}
									placeholder={
										inputMode === "url"
											? "https://www.ozon.ru/product/..."
											: "Введите артикул (например 123456)"
									}
									className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-base"
									autoFocus
								/>
							</div>

							<div className="flex gap-2 pt-2">
								<button
									onClick={() => setStep(1)}
									className="px-4 py-2 border border-gray-200 dark:border-neutral-700 rounded-lg flex-1 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-base"
									type="button"
								>
									Назад
								</button>

								<button
									onClick={() => handleAddProduct()}
									disabled={!canSubmit}
									className={clsx(
										"px-4 py-2 rounded-lg flex-1 transition-base",
										canSubmit
											? "bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
											: "bg-gray-100 text-gray-400 dark:bg-neutral-700 dark:text-neutral-500 cursor-not-allowed"
									)}
									type="button"
								>
									Добавить
								</button>
							</div>
						</div>
					)}
				</div>
			</Modal>
		</div>
	);
}
