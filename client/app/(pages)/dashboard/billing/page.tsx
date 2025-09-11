// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import clsx from "clsx";
// import {
// 	DownloadIcon,
// 	PlusIcon,
// 	CheckIcon,
// 	AlertCircleIcon,
// } from "lucide-react";
// import TopPanel from "@/app/components/shared/top-panel";

// // Типы и моковые данные
// interface Transaction {
// 	id: string;
// 	date: Date;
// 	amount: number;
// 	type: "income" | "expense";
// 	description: string;
// 	status: "completed" | "pending" | "failed";
// 	method?: "yookassa" | "robokassa" | "nowpayments";
// }

// const mockTransactions: Transaction[] = [
// 	{
// 		id: "1",
// 		date: new Date("2024-01-15"),
// 		amount: 990,
// 		type: "expense",
// 		description: "PRO подписка",
// 		status: "completed",
// 		method: "yookassa",
// 	},
// 	{
// 		id: "2",
// 		date: new Date("2024-01-10"),
// 		amount: 5000,
// 		type: "income",
// 		description: "Пополнение баланса",
// 		status: "completed",
// 		method: "robokassa",
// 	},
// 	{
// 		id: "3",
// 		date: new Date("2024-01-05"),
// 		amount: 2000,
// 		type: "income",
// 		description: "Пополнение баланса",
// 		status: "completed",
// 		method: "nowpayments",
// 	},
// ];

// const paymentMethods = [
// 	{
// 		id: "yookassa",
// 		name: "ЮKassa",
// 		icon: "/images/payments/yookassa.svg",
// 		description: "Банковские карты, ЮMoney, интернет-банки",
// 	},
// 	{
// 		id: "robokassa",
// 		name: "Robokassa",
// 		icon: "/images/payments/robokassa.svg",
// 		description: "Банковские карты, электронные кошельки",
// 	},
// 	{
// 		id: "nowpayments",
// 		name: "NowPayments",
// 		icon: "/images/payments/nowpayments.svg",
// 		description: "Криптовалюты (BTC, ETH, USDT и другие)",
// 	},
// ];

// export default function BillingPage() {
// 	const [activeTab, setActiveTab] = useState<"balance" | "history">(
// 		"balance"
// 	);
// 	const [selectedAmount, setSelectedAmount] = useState<number | null>(500);
// 	const [customAmount, setCustomAmount] = useState("");
// 	const [selectedMethod, setSelectedMethod] = useState("yookassa");

// 	const balance = 3245; // Пример баланса
// 	const proActive = true; // Пример статуса PRO

// 	const handleTopUp = () => {
// 		// Логика пополнения баланса
// 		console.log("Пополнение на:", selectedAmount || customAmount);
// 		console.log("Метод:", selectedMethod);
// 	};

// 	const formatDate = (date: Date) => {
// 		return new Intl.DateTimeFormat("ru-RU", {
// 			day: "numeric",
// 			month: "long",
// 			year: "numeric",
// 		}).format(date);
// 	};

// 	return (
// 		<div className="space-y-6">
// 			<TopPanel title="Биллинг" />

// 			{/* Карточка баланса */}
// 			<div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white mb-8">
// 				<div className="flex justify-between items-start mb-6">
// 					<div>
// 						<h2 className="text-lg font-medium mb-1">
// 							Текущий баланс
// 						</h2>
// 						<p className="text-3xl font-bold">{balance}₽</p>
// 					</div>
// 					{proActive && (
// 						<span className="bg-yellow-300 text-black px-3 py-1 rounded-full text-sm font-medium">
// 							PRO активен
// 						</span>
// 					)}
// 				</div>

// 				<div className="flex gap-3">
// 					<button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2">
// 						<PlusIcon className="w-4 h-4" />
// 						Пополнить
// 					</button>
// 					<button className="border border-white/30 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/10 transition-colors">
// 						История операций
// 					</button>
// 				</div>
// 			</div>

// 			{/* Табы */}
// 			<div className="flex border-b border-gray-200 dark:border-neutral-700 mb-6">
// 				<button
// 					onClick={() => setActiveTab("balance")}
// 					className={clsx(
// 						"px-4 py-2 font-medium text-sm border-b-2 transition-colors",
// 						activeTab === "balance"
// 							? "border-blue-500 text-blue-600 dark:text-blue-400"
// 							: "border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
// 					)}
// 				>
// 					Пополнение баланса
// 				</button>
// 				<button
// 					onClick={() => setActiveTab("history")}
// 					className={clsx(
// 						"px-4 py-2 font-medium text-sm border-b-2 transition-colors",
// 						activeTab === "history"
// 							? "border-blue-500 text-blue-600 dark:text-blue-400"
// 							: "border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
// 					)}
// 				>
// 					История операций
// 				</button>
// 			</div>

// 			{activeTab === "balance" ? (
// 				<div className="grid md:grid-cols-2 gap-8">
// 					{/* Сумма пополнения */}
// 					<div>
// 						<h3 className="font-medium mb-4 text-gray-900 dark:text-white">
// 							Сумма пополнения
// 						</h3>

// 						<div className="grid grid-cols-3 gap-2 mb-4">
// 							{[500, 1000, 2000, 5000, 10000].map((amount) => (
// 								<button
// 									key={amount}
// 									onClick={() => {
// 										setSelectedAmount(amount);
// 										setCustomAmount("");
// 									}}
// 									className={clsx(
// 										"p-3 rounded-lg border text-sm font-medium transition-colors",
// 										selectedAmount === amount
// 											? "border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
// 											: "border-gray-200 text-gray-700 hover:border-gray-300 dark:border-neutral-700 dark:text-gray-300 dark:hover:border-neutral-600"
// 									)}
// 								>
// 									{amount}₽
// 								</button>
// 							))}

// 							<button
// 								onClick={() => {
// 									setSelectedAmount(null);
// 									setCustomAmount("");
// 								}}
// 								className={clsx(
// 									"p-3 rounded-lg border text-sm font-medium transition-colors",
// 									selectedAmount === null
// 										? "border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
// 										: "border-gray-200 text-gray-700 hover:border-gray-300 dark:border-neutral-700 dark:text-gray-300 dark:hover:border-neutral-600"
// 								)}
// 							>
// 								Другая сумма
// 							</button>
// 						</div>

// 						{selectedAmount === null && (
// 							<div className="mb-4">
// 								<label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
// 									Введите сумму
// 								</label>
// 								<input
// 									type="number"
// 									value={customAmount}
// 									onChange={(e) =>
// 										setCustomAmount(e.target.value)
// 									}
// 									placeholder="Введите сумму"
// 									className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-base"
// 									min="100"
// 								/>
// 							</div>
// 						)}

// 						<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 dark:bg-yellow-900 dark:border-yellow-700">
// 							<div className="flex items-start gap-3">
// 								<AlertCircleIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
// 								<div className="text-sm text-yellow-800 dark:text-yellow-200">
// 									<p className="font-medium">
// 										Минимальная сумма пополнения — 500₽
// 									</p>
// 									<p className="mt-1">
// 										Баланс не списывается автоматически. Вы
// 										сами решаете, когда оплачивать услуги.
// 									</p>
// 								</div>
// 							</div>
// 						</div>
// 					</div>

// 					{/* Способ оплаты */}
// 					<div>
// 						<h3 className="font-medium mb-4 text-gray-900 dark:text-white">
// 							Способ оплаты
// 						</h3>

// 						<div className="space-y-3 mb-6">
// 							{paymentMethods.map((method) => (
// 								<label
// 									key={method.id}
// 									className={clsx(
// 										"flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors",
// 										selectedMethod === method.id
// 											? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
// 											: "border-gray-200 hover:border-gray-300 dark:border-neutral-700 dark:hover:border-neutral-600"
// 									)}
// 								>
// 									<input
// 										type="radio"
// 										name="payment-method"
// 										value={method.id}
// 										checked={selectedMethod === method.id}
// 										onChange={(e) =>
// 											setSelectedMethod(e.target.value)
// 										}
// 										className="mt-1 text-blue-600 focus:ring-blue-500"
// 									/>
// 									<div className="flex-1">
// 										<div className="flex items-center gap-3 mb-1">
// 											<Image
// 												src={method.icon}
// 												alt={method.name}
// 												width={24}
// 												height={24}
// 												className="object-contain"
// 											/>
// 											<span className="font-medium text-gray-900 dark:text-white">
// 												{method.name}
// 											</span>
// 										</div>
// 										<p className="text-sm text-gray-600 dark:text-gray-400">
// 											{method.description}
// 										</p>
// 									</div>
// 								</label>
// 							))}
// 						</div>

// 						<button
// 							onClick={handleTopUp}
// 							disabled={!selectedAmount && !customAmount}
// 							className={clsx(
// 								"w-full py-3 rounded-lg font-medium transition-colors",
// 								selectedAmount || customAmount
// 									? "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
// 									: "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-neutral-700 dark:text-neutral-500"
// 							)}
// 						>
// 							Перейти к оплате
// 						</button>
// 					</div>
// 				</div>
// 			) : (
// 				/* История операций */
// 				<div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 overflow-hidden">
// 					<div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-neutral-700">
// 						<h3 className="font-medium text-gray-900 dark:text-white">
// 							История операций
// 						</h3>
// 						<button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
// 							<DownloadIcon className="w-4 h-4" />
// 							Экспорт
// 						</button>
// 					</div>

// 					<div className="divide-y divide-gray-200 dark:divide-neutral-700">
// 						{mockTransactions.map((transaction) => (
// 							<div key={transaction.id} className="p-4">
// 								<div className="flex items-center justify-between mb-2">
// 									<div className="flex items-center gap-3">
// 										<div
// 											className={clsx(
// 												"w-8 h-8 rounded-full flex items-center justify-center",
// 												transaction.type === "income"
// 													? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
// 													: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
// 											)}
// 										>
// 											{transaction.type === "income"
// 												? "+"
// 												: "−"}
// 										</div>
// 										<div>
// 											<p className="font-medium text-gray-900 dark:text-white">
// 												{transaction.description}
// 											</p>
// 											<p className="text-sm text-gray-500 dark:text-gray-400">
// 												{formatDate(transaction.date)}
// 											</p>
// 										</div>
// 									</div>

// 									<div className="text-right">
// 										<p
// 											className={clsx(
// 												"font-medium",
// 												transaction.type === "income"
// 													? "text-green-600 dark:text-green-400"
// 													: "text-red-600 dark:text-red-400"
// 											)}
// 										>
// 											{transaction.type === "income"
// 												? "+"
// 												: "−"}
// 											{Math.abs(transaction.amount)}₽
// 										</p>
// 										<div className="flex items-center gap-2 justify-end text-sm text-gray-500 dark:text-gray-400">
// 											{transaction.status ===
// 												"completed" && (
// 												<>
// 													<CheckIcon className="w-3 h-3 text-green-500" />
// 													<span>Завершено</span>
// 												</>
// 											)}
// 										</div>
// 									</div>
// 								</div>

// 								{transaction.method && (
// 									<div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-2">
// 										<Image
// 											src={
// 												paymentMethods.find(
// 													(m) =>
// 														m.id ===
// 														transaction.method
// 												)?.icon || ""
// 											}
// 											alt=""
// 											width={16}
// 											height={16}
// 											className="object-contain"
// 										/>
// 										{
// 											paymentMethods.find(
// 												(m) =>
// 													m.id === transaction.method
// 											)?.name
// 										}
// 									</div>
// 								)}
// 							</div>
// 						))}
// 					</div>
// 				</div>
// 			)}

// 			{/* Информация о подписке */}
// 			{proActive && (
// 				<div className="mt-8 bg-gray-50 dark:bg-neutral-800 rounded-lg p-6 border border-gray-200 dark:border-neutral-700">
// 					<h3 className="font-medium mb-4 text-gray-900 dark:text-white">
// 						Ваша PRO подписка
// 					</h3>

// 					<div className="grid md:grid-cols-2 gap-6">
// 						<div>
// 							<div className="flex items-center justify-between mb-2">
// 								<span className="text-gray-600 dark:text-gray-400">
// 									Статус
// 								</span>
// 								<span className="font-medium text-green-600 dark:text-green-400">
// 									Активна
// 								</span>
// 							</div>
// 							<div className="flex items-center justify-between mb-2">
// 								<span className="text-gray-600 dark:text-gray-400">
// 									Следующее списание
// 								</span>
// 								<span className="font-medium text-gray-900 dark:text-white">
// 									15 февраля 2024
// 								</span>
// 							</div>
// 							<div className="flex items-center justify-between">
// 								<span className="text-gray-600 dark:text-gray-400">
// 									Сумма
// 								</span>
// 								<span className="font-medium text-gray-900 dark:text-white">
// 									990₽/месяц
// 								</span>
// 							</div>
// 						</div>

// 						<div className="flex flex-col gap-2">
// 							<button className="px-4 py-2 border border-gray-200 dark:border-neutral-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors">
// 								Управление подпиской
// 							</button>
// 							<button className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
// 								Отменить подписку
// 							</button>
// 						</div>
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	);
// }
