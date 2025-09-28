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

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Check, Zap, Gift } from "lucide-react";

// Типы для платежных систем
type PaymentMethod = "yookassa" | "robokassa" | "nowpayments";

// Интерфейс для опций пополнения
interface TopUpOption {
  months: number;
  amount: number;
  discount: number;
  perMonth: number;
  popular?: boolean;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("yookassa");
  const [customAmount, setCustomAmount] = useState<number>(990);
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Опции пополнения с учетом скидок
  const topUpOptions: TopUpOption[] = [
    { months: 1, amount: 990, discount: 0, perMonth: 990 },
    { months: 3, amount: 2673, discount: 10, perMonth: 891, popular: true },
    { months: 6, amount: 5346, discount: 10, perMonth: 891 },
    { months: 12, amount: 10692, discount: 10, perMonth: 891 },
  ];

  // Рассчитать скидку для кастомной суммы
  const calculateDiscount = (amount: number): number => {
    const months = Math.floor(amount / 990);
    if (months >= 12) return 10;
    if (months >= 6) return 10;
    if (months >= 3) return 10;
    return 0;
  };

  const discount = calculateDiscount(customAmount);
  const finalAmount = customAmount - (customAmount * discount) / 100;

  // Обработка оплаты
  const handlePayment = async () => {
    setIsProcessing(true);
    // Здесь будет логика перенаправления на выбранную платежную систему
    // В реальном приложении здесь будет запрос к API для создания платежа
    
    // Имитация процесса оплаты
    setTimeout(() => {
      setIsProcessing(false);
      alert("Перенаправление на страницу оплаты...");
      // В реальном приложении здесь будет redirect на страницу платежной системы
    }, 1500);
  };

  // Проверка, что сумма кратна 990
  const isAmountValid = customAmount % 990 === 0 && customAmount >= 990;

  return (
    <>
      {/* Заголовок и навигация */}
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Пополнение баланса</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Основной контент */}
        <div className="lg:col-span-2">
          {/* Выбор суммы */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Выберите сумму пополнения</h2>
            
            {/* Готовые опции */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {topUpOptions.map((option, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedOption(index);
                    setCustomAmount(option.amount);
                  }}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedOption === index
                      ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                      : "border-gray-200 dark:border-neutral-700 hover:border-yellow-300 dark:hover:border-yellow-600"
                  } ${option.popular ? "ring-1 ring-yellow-400 dark:ring-yellow-500" : ""}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {option.months} мес
                    </span>
                    {option.popular && (
                      <span className="text-xs bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full">
                        Выгодно
                      </span>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {option.amount.toLocaleString("ru-RU")} ₽
                  </div>
                  {option.discount > 0 && (
                    <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                      Экономия {option.discount}%
                    </div>
                  )}
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {option.perMonth} ₽/мес
                  </div>
                </div>
              ))}
            </div>
            
            {/* Кастомная сумма */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Или укажите свою сумму (кратную 990 ₽)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(Number(e.target.value))}
                  step="990"
                  min="990"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
                <span className="absolute right-3 top-3 text-gray-500 dark:text-gray-400">₽</span>
              </div>
              {!isAmountValid && customAmount > 0 && (
                <p className="text-red-500 text-sm mt-2">
                  Сумма должна быть кратна 990 ₽
                </p>
              )}
            </div>
            
            {/* Информация о скидке */}
            {discount > 0 && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-4">
                <div className="flex items-center">
                  <Gift size={16} className="text-green-600 dark:text-green-400 mr-2" />
                  <span className="text-green-700 dark:text-green-300 font-medium">
                    Ваша скидка: {discount}% ({((customAmount * discount) / 100).toLocaleString("ru-RU")} ₽)
                  </span>
                </div>
              </div>
            )}
            
            {/* Итоговая сумма */}
            <div className="flex justify-between items-center py-3 border-t border-gray-200 dark:border-neutral-700">
              <span className="text-gray-700 dark:text-gray-300">К оплате:</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {finalAmount.toLocaleString("ru-RU")} ₽
              </span>
            </div>
          </div>
          
          {/* Выбор способа оплаты */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Способ оплаты</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div
                onClick={() => setSelectedMethod("yookassa")}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedMethod === "yookassa"
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600"
                }`}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 relative mr-3 bg-white rounded p-1">
                    <Image 
                      src="/images/payment-systems/yookassa.png" 
                      alt="ЮKassa" 
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">ЮKassa</span>
                </div>
              </div>
              
              <div
                onClick={() => setSelectedMethod("robokassa")}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedMethod === "robokassa"
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                    : "border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600"
                }`}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 relative mr-3 bg-white rounded p-1">
                    <Image 
                      src="/images/payment-systems/robokassa.png" 
                      alt="Robokassa" 
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">Robokassa</span>
                </div>
              </div>
              
              <div
                onClick={() => setSelectedMethod("nowpayments")}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedMethod === "nowpayments"
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : "border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600"
                }`}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 relative mr-3 bg-white rounded p-1">
                    <Image 
                      src="/images/payment-systems/nowpayments.png" 
                      alt="NowPayments" 
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">NowPayments</span>
                </div>
              </div>
            </div>
          </div>
          
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
                Перейти к оплате {finalAmount.toLocaleString("ru-RU")} ₽
              </>
            )}
          </button>
        </div>
        
        {/* Боковая панель с информацией */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 p-6 sticky top-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Что вы получаете</h3>
            
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check size={18} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">Безлимитное добавление товаров</span>
              </li>
              <li className="flex items-start">
                <Check size={18} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">Расширенная аналитика и отчеты</span>
              </li>
              <li className="flex items-start">
                <Check size={18} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">Рекламные инструменты</span>
              </li>
              <li className="flex items-start">
                <Check size={18} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">Анализ конкурентов</span>
              </li>
              <li className="flex items-start">
                <Check size={18} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">Расширенные уведомления в Telegram</span>
              </li>
            </ul>
            
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-neutral-700">
              <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Как это работает</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                После оплаты ваш аккаунт будет автоматически обновлен до PRO-статуса. 
                Средства зачисляются на баланс и списываются помесячно.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}