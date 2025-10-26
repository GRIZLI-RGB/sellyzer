"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { LayoutGrid, Table as TableIcon, Plus, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";
import { ProductMarketplaceType } from "@sellyzer/shared";

import { useDebounce } from "@/app/hooks/useDebounce";
import Modal from "@/app/components/shared/modal";
import { Tooltip } from "@heroui/react";
import TopPanel from "@/app/components/shared/top-panel";
import Button from "@/app/components/shared/button";
import { trpc } from "@/app/utils/trpc";
import Loader from "@/app/components/shared/loader";

const isUrl = (s?: string) => {
	if (!s) return false;

	try {
		new URL(s);
		return true;
	} catch {
		return false;
	}
};

type PriceWithChangeProps = {
	currentPrice: number;
	basePrice?: number;
};

const PriceWithChange = ({ currentPrice, basePrice }: PriceWithChangeProps) => {
	const diff = currentPrice - (basePrice || 0);
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
			<span>{currentPrice.toLocaleString("ru-RU")} ₽</span>
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
	platform: ProductMarketplaceType;
};

const platforms: {
	id: Product["platform"];
	name: string;
	img: string;
	available: boolean;
	color?: string;
}[] = [
	{
		id: "OZON",
		name: "Ozon",
		img: "/images/platforms/ozon.png",
		available: true,
		color: "blue",
	},
	{
		id: "WILDBERRIES",
		name: "Wildberries",
		img: "/images/platforms/wildberries.png",
		available: true,
		color: "purple",
	},
	{
		id: "AVITO",
		name: "Avito",
		img: "/images/platforms/avito.png",
		available: false,
	},
	{
		id: "YANDEX_MARKET",
		name: "Yandex Market",
		img: "/images/platforms/yandex-market.png",
		available: false,
	},
];

const ScoreDisplay = ({ score }: { score: string | null }) => {
	if (score === null) {
		return (
			<div
				role="status"
				aria-label="Оценка карточки не указана"
				className="bg-gray-50 dark:bg-neutral-800 text-gray-500 dark:text-gray-400 rounded-md px-3 py-1 font-semibold text-sm w-max select-none"
			>
				—
			</div>
		);
	}

	const numericScore = parseFloat(score);
	const bg =
		numericScore >= 4.2
			? "bg-green-50 dark:bg-green-900"
			: numericScore >= 3.5
			? "bg-yellow-50 dark:bg-yellow-900"
			: "bg-red-50 dark:bg-red-900";

	const textColor =
		numericScore >= 4.2
			? "text-green-700 dark:text-green-300"
			: numericScore >= 3.5
			? "text-yellow-700 dark:text-yellow-300"
			: "text-red-700 dark:text-red-300";

	return (
		<div
			role="status"
			aria-label={`Оценка карточки ${numericScore}`}
			className={`${bg} ${textColor} rounded-md px-3 py-1 font-semibold text-sm w-max select-none`}
		>
			{numericScore}
		</div>
	);
};

const ReviewsDisplay = ({
	rating,
	count,
}: {
	rating?: string | null;
	count?: number;
}) => {
	if (!rating || !count) {
		return (
			<div className="text-xs text-gray-500 dark:text-gray-400">
				Нет отзывов
			</div>
		);
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
					{+rating}
				</span>
				<span className="text-xs text-gray-500 dark:text-gray-400 ml-0.5 pt-px">
					({count.toLocaleString("ru-RU")} отзыв
					{count % 10 === 1 && count % 100 !== 11 ? "" : "ов"})
				</span>
			</div>
		</div>
	);
};

const PlatformBadge = ({ platform }: { platform: ProductMarketplaceType }) => {
	const platformData = {
		OZON: {
			name: "Ozon",
			color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
			logo: "/images/platforms/ozon.png",
		},
		WILDBERRIES: {
			name: "Wildberries",
			color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
			logo: "/images/platforms/wildberries.png",
		},
		AVITO: {
			name: "Avito",
			color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
			logo: "/images/platforms/avito.png",
		},
		YANDEX_MARKET: {
			name: "Yandex Market",
			color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
			logo: "/images/platforms/yandex-market.png",
		},
	};

	const data = platformData[platform] || {
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

export default function DashboardProductsPage() {
	const [page, setPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");

	const debouncedQuery = useDebounce(searchQuery);

	const currentUserProductsQuery = trpc.getCurrentUserProducts.useQuery(
		{
			page,
			limit: 10,
			search: debouncedQuery,
		},
		{
			retry: false,
			staleTime: 5 * 60 * 1000,
		}
	);
	const createProductMutation = trpc.createProduct.useMutation();

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

	const handleAddProduct = () => {
		if (!selectedPlatform || !productLink) return;

		createProductMutation.mutate(
			{
				marketplace: selectedPlatform,
				...(productLink.startsWith("http")
					? { url: productLink }
					: {
							article: productLink,
					  }),
			},
			{
				onSuccess: () => {
					currentUserProductsQuery.refetch();

					setIsModalOpen(false);
					setStep(1);
					setSelectedPlatform(null);
					setProductLink("");
				},
			}
		);
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
				numberElements={
					currentUserProductsQuery.data?.pagination.totalItems
				}
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
			{currentUserProductsQuery.isLoading ? (
				<div className="border border-gray-200 dark:border-neutral-700 rounded-lg px-10 py-16 text-center bg-gray-50 dark:bg-neutral-800">
					<div className="mx-auto max-w-sm flex flex-col items-center">
						<Loader size="lg" className="mb-4" />
						<h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
							Загружаем товары
						</h3>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							Пожалуйста, подождите...
						</p>
					</div>
				</div>
			) : (currentUserProductsQuery?.data?.products || []).length ===
			  0 ? (
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
								</th>
								<th className="font-semibold px-4 py-3 text-left">
									Конкуренты
								</th>
							</tr>
						</thead>
						<tbody>
							{currentUserProductsQuery.data?.products.map(
								(product) => (
									<tr
										key={product.id}
										className="border-t border-gray-200 dark:border-neutral-700 hover:bg-gray-50/50 dark:hover:bg-neutral-800/50 transition-base group cursor-pointer"
										onClick={() => {
											window.location.href = `/dashboard/products/${product.id}`;
										}}
										tabIndex={0}
									>
										<td className="px-4 py-3 flex items-center gap-3">
											<Image
												src={product.images[0]}
												alt={product.title}
												width={48}
												height={48}
												className="rounded-md border border-gray-200 dark:border-neutral-700 min-w-12 h-12 object-cover"
											/>
											<span className="font-medium group-hover:underline">
												{product.title}
											</span>
										</td>
										<td className="px-4 py-3 font-medium">
											<PriceWithChange
												currentPrice={product.price}
											/>
										</td>
										<td className="px-4 py-3 max-w-max">
											<ScoreDisplay
												score={product.rating}
											/>
										</td>
										<td className="px-4 py-3">
											<ReviewsDisplay
												rating={product.review?.rating}
												count={
													product.review?.totalCount
												}
											/>
										</td>
										<td className="px-4 py-3">
											{product.marketplace && (
												<PlatformBadge
													platform={
														product.marketplace
													}
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
								)
							)}
						</tbody>
					</table>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{currentUserProductsQuery.data?.products.map((product) => (
						<Link
							key={product.id}
							href={`/dashboard/products/${product.id}`}
							className="border border-gray-200 dark:border-neutral-700 rounded-lg p-4 flex flex-col hover:border-gray-300 dark:hover:border-neutral-600 transition-base group cursor-pointer"
						>
							<div className="relative aspect-square w-full mb-3 rounded-lg overflow-hidden border border-gray-200 dark:border-neutral-700">
								<Image
									src={product.images[0]}
									alt={product.title}
									fill
									className="object-cover"
								/>
							</div>
							<h3 className="font-medium line-clamp-2 mb-2 group-hover:underline text-gray-900 dark:text-white">
								{product.title}
							</h3>

							<div className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
								<PriceWithChange currentPrice={product.price} />
							</div>

							<div className="flex justify-between items-center mb-3">
								<ScoreDisplay score={product.rating} />
								<div className="text-xs text-right">
									<ReviewsDisplay
										rating={product.review?.rating}
										count={product.review?.totalCount}
									/>
								</div>
							</div>

							<div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100 dark:border-neutral-700 text-sm text-gray-500 dark:text-gray-400">
								{product.marketplace ? (
									<PlatformBadge
										platform={product.marketplace}
									/>
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
				{createProductMutation.isPending && (
					<Loader className="min-h-[33vh]" size="xl" />
				)}

				{!createProductMutation.isPending && (
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
														? selectedPlatform ===
														  p.id
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
											if (
												e.key === "Enter" &&
												canSubmit
											) {
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
				)}
			</Modal>
		</div>
	);
}
