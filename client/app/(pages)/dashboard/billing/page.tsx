"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import Image from "next/image";

type PaymentMethod = "yookassa" | "robokassa" | "nowpayments";

function Balance() {
	return (
		<div className="bg-yellow-50 dark:bg-yellow-900 rounded-xl border border-yellow-300 dark:border-yellow-700 p-6 flex flex-col gap-4">
			<div className="flex items-center gap-4">
				<div className="w-12 h-12 relative">
					<Image
						src="/images/coin.png"
						alt="Баланс"
						fill
						className="object-contain"
					/>
				</div>
				<div>
					<p className="text-3xl font-bold text-gray-900 dark:text-white">
						0₽
					</p>
					<p className="text-xs text-gray-500 dark:text-gray-400">
						Хватит на 3 дня
					</p>
				</div>
			</div>
		</div>
	);
}

function PaymentMethods() {
	const [selectedMethod, setSelectedMethod] =
		useState<PaymentMethod>("yookassa");

	return (
		<div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 p-6">
			<h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
				Способ оплаты
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
				{[
					{ id: "yookassa", name: "ЮKassa", color: "blue" },
					{ id: "robokassa", name: "Robokassa", color: "purple" },
					{ id: "nowpayments", name: "NowPayments", color: "green" },
				].map((method) => {
					const activeClasses: Record<string, string> = {
						yookassa:
							"border-blue-500 bg-blue-50 dark:bg-blue-900/20",
						robokassa:
							"border-purple-500 bg-purple-50 dark:bg-purple-900/20",
						nowpayments:
							"border-green-500 bg-green-50 dark:bg-green-900/20",
					};

					return (
						<button
							key={method.id}
							onClick={() =>
								setSelectedMethod(method.id as PaymentMethod)
							}
							className={`border rounded-lg p-3 flex items-center gap-2 transition-all ${
								selectedMethod === method.id
									? activeClasses[method.id]
									: "border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600"
							}`}
						>
							<div className="w-8 h-8 relative bg-white rounded p-1">
								<Image
									src={`/images/payment-systems/${method.id}.png`}
									alt={method.name}
									fill
									className="object-contain"
								/>
							</div>
							<span className="font-medium text-gray-900 dark:text-white">
								{method.name}
							</span>
						</button>
					);
				})}
			</div>
		</div>
	);
}

export default function BillingPage() {
	const [customAmount, setCustomAmount] = useState<number>(990);
	const [selectedOption, setSelectedOption] = useState<number>(0);
	const [isProcessing, setIsProcessing] = useState(false);

	const MIN_AMOUNT = 990;
	const MAX_AMOUNT = 50000;

	const topUpOptions: {
		months: number;
		amount: number;
		bonusPercent: number;
		popular?: boolean;
	}[] = [
		{ months: 1, amount: 990, bonusPercent: 0 },
		{ months: 3, amount: 2970, bonusPercent: 10, popular: true },
		{ months: 6, amount: 5940, bonusPercent: 12 },
		{ months: 12, amount: 11880, bonusPercent: 15 },
	];

	const calculateBonus = (amount: number): number => {
		if (amount >= 11880) return 15;
		if (amount >= 5940) return 12;
		if (amount >= 2970) return 10;
		return 0;
	};

	const bonusPercent = calculateBonus(customAmount);
	const bonusAmount = Math.floor((customAmount * bonusPercent) / 100);
	const finalAmount = customAmount + bonusAmount;

	const handlePayment = async () => {
		setIsProcessing(true);
		setTimeout(() => {
			setIsProcessing(false);
			alert("Перенаправление на страницу оплаты...");
		}, 1500);
	};

	const isAmountValid =
		customAmount >= MIN_AMOUNT && customAmount <= MAX_AMOUNT;

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
			{/* Левая часть */}
			<div className="lg:col-span-2 space-y-6">
				{/* Баланс */}
				<Balance />

				{/* Пополнение */}
				<div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 p-6">
					<h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
						Пополните баланс
					</h2>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
						{topUpOptions.map((option, index) => {
							const bonus = Math.floor(
								(option.amount * option.bonusPercent) / 100
							);
							return (
								<button
									key={index}
									onClick={() => {
										setSelectedOption(index);
										setCustomAmount(option.amount);
									}}
									className={`rounded-lg border p-3 text-left transition-all ${
										selectedOption === index
											? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
											: "border-gray-200 dark:border-neutral-700 hover:border-yellow-300 dark:hover:border-yellow-600"
									}`}
								>
									<div className="flex items-center justify-between">
										<span className="font-medium text-gray-900 dark:text-white">
											{option.months} мес
										</span>
										{option.popular && (
											<span className="text-[10px] font-semibold bg-yellow-200 text-yellow-900 px-1.5 py-0.5 rounded">
												Выгодно
											</span>
										)}
									</div>
									<div className="text-lg font-bold text-gray-900 dark:text-white">
										{option.amount.toLocaleString("ru-RU")}₽
									</div>
									<div
										className={`text-xs mt-1 ${
											option.bonusPercent > 0
												? "text-green-600 dark:text-green-400 font-medium"
												: "text-gray-500 dark:text-gray-400"
										}`}
									>
										{option.bonusPercent > 0
											? `+${bonus.toLocaleString(
													"ru-RU"
											  )}₽ бонус`
											: "Без бонуса"}
									</div>
								</button>
							);
						})}
					</div>

					{/* Своя сумма */}
					<div>
						<label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
							Своя сумма (от 990₽)
						</label>
						<div className="relative">
							<input
								type="number"
								value={customAmount}
								onChange={(e) => {
									setSelectedOption(-1);
									setCustomAmount(Number(e.target.value));
								}}
								min="990"
								max={MAX_AMOUNT}
								className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
							/>
							<span className="absolute right-3 top-2 text-gray-500 dark:text-gray-400">
								₽
							</span>
						</div>
						{!isAmountValid && customAmount > 0 && (
							<p className="text-red-500 text-sm mt-2">
								Сумма должна быть не меньше{" "}
								{MIN_AMOUNT.toLocaleString("ru-RU")}₽ и не
								больше {MAX_AMOUNT.toLocaleString("ru-RU")}₽
							</p>
						)}
					</div>

					{/* Итог */}
					<div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200 dark:border-neutral-700">
						<div className="text-sm text-gray-700 dark:text-gray-300">
							Вы платите{" "}
							<span className="font-medium">
								{customAmount.toLocaleString("ru-RU")}₽
							</span>
							{bonusPercent > 0 ? (
								<>
									{" "}
									→ получаете{" "}
									<span className="font-medium text-green-600 dark:text-green-400">
										{finalAmount.toLocaleString("ru-RU")}₽
									</span>
								</>
							) : (
								" → без бонуса"
							)}
						</div>
					</div>
				</div>

				{/* Способ оплаты */}
				<PaymentMethods />

				{/* Кнопка оплаты */}
				<button
					onClick={handlePayment}
					disabled={!isAmountValid || isProcessing}
					className="w-full py-3 px-4 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-black font-semibold rounded-lg transition-colors flex items-center justify-center"
				>
					{isProcessing ? (
						<>Обработка...</>
					) : (
						<>
							<Zap size={18} className="mr-2" />
							Перейти к оплате{" "}
							{finalAmount.toLocaleString("ru-RU")}₽
						</>
					)}
				</button>
			</div>

			{/* Правая колонка */}
			<div className="lg:col-span-1 space-y-6">
				<div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 p-6 sticky top-6">
					<h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
						Что вы получаете в PRO
					</h3>

					<div className="grid grid-cols-1 gap-4">
						{[
							{
								icon: "📦",
								text: "Безлимитное добавление товаров",
							},
							{
								icon: "📊",
								text: "Расширенная аналитика и отчеты",
							},
							{ icon: "📢", text: "Рекламные инструменты" },
							{ icon: "🕵️‍♂️", text: "Анализ конкурентов" },
							{ icon: "💬", text: "Уведомления в Telegram" },
						].map((item, idx) => (
							<div
								key={idx}
								className="flex items-center gap-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3"
							>
								<div className="text-2xl">{item.icon}</div>
								<span className="text-gray-700 dark:text-gray-300">
									{item.text}
								</span>
							</div>
						))}
					</div>

					<div className="mt-6 pt-4 border-t border-gray-200 dark:border-neutral-700 text-center">
						<h4 className="font-medium mb-2 text-gray-900 dark:text-white">
							Как это работает
						</h4>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							После оплаты ваш аккаунт обновится до PRO-статуса.
							<br />
							Средства списываются ежедневно с баланса.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
