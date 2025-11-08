"use client";

import Link from "next/link";
import { useState } from "react";
import { FaEnvelope, FaTelegram } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import ReactCompareImage from "react-compare-image";
import Image from "next/image";

import Logo from "../components/shared/logo";

export default function LandingPage() {
	const [isTelegramHover, setIsTelegramHover] = useState(false);

	const features = [
		{
			title: "Анализ карточки товара",
			description:
				"AI-помощник предложит улучшения для заголовков, описаний и изображений",
			pro: false,
		},
		{
			title: "Сравнение с конкурентами",
			description:
				"Узнайте, каким способом, вы можете достичь показателей лидеров категории",
			pro: true,
		},
		{
			title: "Поиск прибыльных ниш",
			description:
				"Мгновенно находите незанятые ниши с высоким потенциалом продаж",
			pro: true,
		},
		{
			title: "Мониторинг цен",
			description:
				"Следите за волатильностью цен ваших конкурентов в режиме реального времени",
			pro: true,
		},
		{
			title: "Анализ отзывов",
			description:
				"Система анализирует все отзывы, выделяет ключевые моменты и даёт рекомендации",
			pro: false,
		},
		{
			title: "Telegram-уведомления",
			description:
				"Получайте настраиваемые уведомления в режиме 24/7 прямо в Telegram",
			pro: false,
		},
	];

	const pricingPlans = [
		{
			name: "Бесплатно",
			price: "0₽",
			period: "навсегда",
			description: "Для начала работы",
			features: [
				"До 5 товаров",
				"Базовый анализ карточек",
				"Анализ отзывов",
				"Telegram-уведомления",
				"Поддержка Ozon и WB",
			],
			cta: "Начать бесплатно",
			popular: false,
		},
		{
			name: "PRO",
			price: "990₽",
			period: "в месяц",
			description: "Для роста продаж",
			features: [
				"Безлимитное количество товаров",
				"Сравнение с конкурентами",
				"Поиск прибыльных ниш",
				"Мониторинг цен",
				"Расширенная аналитика",
				"Приоритетная поддержка",
				"Все платформы (Ozon, WB, Avito, Я.Маркет)",
			],
			cta: "Попробовать 7 дней",
			popular: true,
		},
	];

	return (
		<div className="min-h-screen bg-neutral-50 text-gray-900">
			{/* Header */}
			<header className="border-b border-neutral-200 bg-white">
				<div className="container mx-auto px-4 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<Logo />
						</div>

						<nav className="hidden md:flex items-center gap-8">
							<a
								href="#features"
								className="text-sm font-medium hover:text-blue-600 transition-colors"
							>
								Возможности
							</a>
							<a
								href="#pricing"
								className="text-sm font-medium hover:text-blue-600 transition-colors"
							>
								Тарифы
							</a>
							<a
								href="#faq"
								className="text-sm font-medium hover:text-blue-600 transition-colors"
							>
								Вопросы
							</a>
						</nav>

						<div className="flex items-center gap-5">
							<Link
								href="/authorization"
								className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
							>
								Вход
							</Link>
							<Link
								href="/authorization"
								className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
							>
								Начать бесплатно
							</Link>
						</div>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section className="py-16 md:py-24 bg-white">
				<div className="container mx-auto px-4 text-center">
					<div className="max-w-4xl mx-auto">
						<h1 className="text-4xl md:text-6xl font-bold mb-6">
							Увеличивайте продажи на маркетплейсах с помощью{" "}
							<span className="text-blue-600">AI-аналитики</span>
						</h1>

						<p className="text-xl text-gray-600 mb-8 leading-relaxed">
							Sellyzer помогает продавцам улучшать карточки
							товаров, анализировать конкурентов и находить
							прибыльные ниши без больших затрат на дорогие
							сервисы.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
							<Link
								href="/authorization"
								className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors w-full sm:w-auto text-center"
							>
								Попробовать бесплатно
							</Link>
						</div>

						{/* Platforms */}
						<div className="mb-12">
							<p className="text-gray-500 text-sm mb-6 text-center">
								Поддерживаемые платформы:
							</p>
							<div className="flex justify-center items-center gap-6 flex-wrap">
								{/* Ozon */}
								<div className="bg-white border border-gray-200 rounded-xl px-6 py-4 shadow-sm flex items-center gap-3">
									<div className="w-6 h-6 relative">
										<Image
											src="/images/platforms/ozon.png"
											alt="Ozon"
											width={24}
											height={24}
											className="object-contain"
										/>
									</div>
									<span className="font-semibold text-gray-800">
										Ozon
									</span>
								</div>

								{/* Wildberries */}
								<div className="bg-white border border-gray-200 rounded-xl px-6 py-4 shadow-sm flex items-center gap-3">
									<div className="w-6 h-6 relative">
										<Image
											src="/images/platforms/wildberries.png"
											alt="Wildberries"
											width={24}
											height={24}
											className="object-contain"
										/>
									</div>
									<span className="font-semibold text-gray-800">
										Wildberries
									</span>
								</div>

								{/* Avito */}
								<div className="bg-gray-100 border border-gray-200 rounded-xl px-6 py-4 shadow-sm flex items-center gap-3 opacity-60">
									<div className="w-6 h-6 relative">
										<Image
											src="/images/platforms/avito.png"
											alt="Avito"
											width={24}
											height={24}
											className="object-contain"
										/>
									</div>
									<span className="font-semibold text-gray-600">
										Avito
									</span>
									<span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-semibold">
										СКОРО
									</span>
								</div>

								{/* Яндекс.Маркет */}
								<div className="bg-gray-100 border border-gray-200 rounded-xl px-6 py-4 shadow-sm flex items-center gap-3 opacity-60">
									<div className="w-6 h-6 relative">
										<Image
											src="/images/platforms/yandex-market.png"
											alt="Яндекс.Маркет"
											width={24}
											height={24}
											className="object-contain"
										/>
									</div>
									<span className="font-semibold text-gray-600">
										Яндекс.Маркет
									</span>
									<span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-semibold">
										СКОРО
									</span>
								</div>
							</div>
						</div>

						{/* Hero Image - Замените на реальный скриншот дашборда */}
						<div className="bg-gray-100 border border-gray-200 rounded-2xl p-2 shadow-lg">
							<div className="overflow-hidden bg-white rounded-xl aspect-video flex items-center justify-center">
								<ReactCompareImage
									sliderLineColor="#2563eb"
									sliderLineWidth={3}
									handle={
										<div className="w-12 h-12 bg-white border-2 border-blue-600 rounded-full shadow-lg flex items-center justify-center">
											<svg
												className="w-5 h-5 text-blue-600"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
												/>
											</svg>
										</div>
									}
									handleSize={48}
									leftImage="/images/screenshots/dashboard-products-light.png"
									rightImage="/images/screenshots/dashboard-products-dark.png"
									leftImageAlt="Sellyzer светлая тема"
									rightImageAlt="Sellyzer темная тема"
									hover={true}
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section id="features" className="py-16 bg-neutral-50">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							Все инструменты для роста продаж
						</h2>
						<p className="text-gray-600 max-w-2xl mx-auto">
							От анализа одной карточки до полного исследования
							рынка — всё в одном интерфейсе
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
						{features.map((feature, index) => (
							<div
								key={index}
								className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-colors shadow-sm"
							>
								<div className="flex items-start justify-between mb-3">
									<h3 className="font-semibold text-lg">
										{feature.title}
									</h3>
									{feature.pro && (
										<span className="text-[10px] font-semibold bg-yellow-300 text-black px-1.5 py-0.5 rounded">
											PRO
										</span>
									)}
								</div>
								<p className="text-gray-600 text-sm leading-relaxed">
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* How It Works */}
			<section className="py-16 bg-white">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							Как работает Sellyzer
						</h2>
						<p className="text-gray-600 max-w-2xl mx-auto">
							Всего 3 простых шага к увеличению ваших продаж
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
						<div className="text-center">
							<div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
								1
							</div>
							<h3 className="font-semibold text-lg mb-2">
								Добавьте товары
							</h3>
							<p className="text-gray-600 text-sm">
								Достаточно выбрать маркетплейс и указать артикул
								или прямую ссылку на товар
							</p>
						</div>

						<div className="text-center">
							<div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
								2
							</div>
							<h3 className="font-semibold text-lg mb-2">
								Получите AI-анализ
							</h3>
							<p className="text-gray-600 text-sm">
								Система проанализирует ваши карточки и покажет
								рекомендации для улучшения
							</p>
						</div>

						<div className="text-center">
							<div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
								3
							</div>
							<h3 className="font-semibold text-lg mb-2">
								Увеличивайте продажи
							</h3>
							<p className="text-gray-600 text-sm">
								Применяйте рекомендации и отслеживайте рост
								продаж и других показателей
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Pricing Section */}
			<section id="pricing" className="py-16 bg-neutral-50">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							Простые тарифы без скрытых платежей
						</h2>
						<p className="text-gray-600 max-w-2xl mx-auto">
							Начните бесплатно и переходите на PRO, когда будете
							готовы к росту
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-center">
						{pricingPlans.map((plan, index) => (
							<div
								key={index}
								className={`bg-white rounded-2xl p-8 border-2 relative ${
									plan.popular
										? "border-yellow-400 shadow-lg"
										: "border-gray-200 shadow-sm"
								}`}
							>
								{plan.popular && (
									<div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
										<span className="bg-yellow-400 text-black text-xs font-semibold px-4 py-1 rounded-full">
											ПОПУЛЯРНЫЙ
										</span>
									</div>
								)}

								<div className="text-center mb-6">
									<h3 className="text-2xl font-bold mb-2">
										{plan.name}
									</h3>
									<div className="flex items-baseline justify-center gap-1 mb-1">
										<span className="text-4xl font-bold">
											{plan.price}
										</span>
										<span className="text-gray-500">
											/{plan.period}
										</span>
									</div>
									<p className="text-gray-600 text-sm">
										{plan.description}
									</p>
								</div>

								<ul className="space-y-3 mb-8">
									{plan.features.map(
										(feature, featureIndex) => (
											<li
												key={featureIndex}
												className="flex items-center gap-3 text-sm"
											>
												<svg
													className="w-4 h-4 text-green-500 flex-shrink-0"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M5 13l4 4L19 7"
													></path>
												</svg>
												{feature}
											</li>
										)
									)}
								</ul>

								<button
									className={`w-full py-3 rounded-full font-semibold transition-colors ${
										plan.popular
											? "bg-yellow-400 hover:bg-yellow-500 text-black"
											: "bg-blue-600 hover:bg-blue-700 text-white"
									}`}
								>
									{plan.cta}
								</button>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 bg-blue-600 text-white">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Начните увеличивать продажи сегодня
					</h2>
					<p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
						Присоединяйтесь к тысячам продавцов, которые уже
						используют Sellyzer для роста своего бизнеса
					</p>

					<div className="flex flex-col items-center gap-4 w-full max-w-xs mx-auto">
						{/* Google кнопка */}
						<button
							className="
              cursor-pointer
              w-full flex items-center justify-center gap-3
              py-3 px-6
              bg-white rounded-full
              hover:bg-gray-50
              focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600
              group
            "
						>
							<FcGoogle className="w-5 h-5 flex-shrink-0" />
							<span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
								Начать с Google
							</span>
						</button>

						{/* Telegram кнопка */}
						<div className="overflow-hidden rounded-full cursor-pointer relative w-full">
							<div
								className="w-full block h-full left-0 right-0 bottom-0 top-0 absolute z-10 opacity-0 cursor-pointer"
								onMouseEnter={() => setIsTelegramHover(true)}
								onMouseLeave={() => setIsTelegramHover(false)}
							/>
							<button
								className={`
                  cursor-pointer
                  w-full flex items-center justify-center gap-3
                  py-3 px-6
                  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600
                  group
                  ${isTelegramHover ? "bg-[#1d99d6]" : "bg-[#27a7e7]"}
                `}
							>
								<FaTelegram className="w-5 h-5 flex-shrink-0 text-white" />
								<span className="text-sm font-medium text-white group-hover:text-blue-50 transition-colors">
									Начать с Telegram
								</span>
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section id="faq" className="py-16 bg-white">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							Частые вопросы
						</h2>
					</div>

					<div className="max-w-3xl mx-auto space-y-6">
						<div className="border border-gray-200 rounded-2xl p-6">
							<h3 className="font-semibold text-lg mb-2">
								Как подключить мой аккаунт маркетплейса?
							</h3>
							<p className="text-gray-600">
								Мы используем официальные API Ozon и
								Wildberries. Вам нужно только авторизоваться
								через аккаунт продавца — мы не получаем доступ к
								вашим паролям.
							</p>
						</div>

						<div className="border border-gray-200 rounded-2xl p-6">
							<h3 className="font-semibold text-lg mb-2">
								Можно ли использовать бесплатно постоянно?
							</h3>
							<p className="text-gray-600">
								Да, бесплатный тариф доступен всегда с
								ограничением до 5 товаров. Этого достаточно для
								тестирования и небольших магазинов.
							</p>
						</div>

						<div className="border border-gray-200 rounded-2xl p-6">
							<h3 className="font-semibold text-lg mb-2">
								Как происходит оплата PRO-тарифа?
							</h3>
							<p className="text-gray-600">
								Оплата картой, через ЮKassa или криптовалютой.
								Подписка помесячная, без автоматического
								списания — каждый месяц вы сами решаете,
								продлевать или нет.
							</p>
						</div>

						<div className="border border-gray-200 rounded-2xl p-6">
							<h3 className="font-semibold text-lg mb-2">
								Когда будут доступны Avito и Яндекс.Маркет?
							</h3>
							<p className="text-gray-600">
								Мы активно работаем над интеграцией. Avito
								планируем запустить в следующем квартале,
								Яндекс.Маркет — до конца года.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-neutral-50 text-neutral-700 pt-14 pb-10 border-t border-neutral-200">
				<div className="container mx-auto px-4">
					{/* Основной контент */}
					<div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12">
						{/* Лого и описание */}
						<div className="flex-1 max-w-md">
							<div className="flex items-center gap-3 mb-4">
								<Logo />
							</div>
							<p className="text-gray-600 text-sm leading-relaxed mb-6">
								AI-инструменты для продавцов маркетплейсов.
								Помогаем увеличить продажи через умный анализ
								товаров и конкурентов.
							</p>

							{/* Соцсети */}
							<div className="flex items-center gap-4">
								<a
									href="https://t.me/sellyzer_support"
									target="_blank"
									rel="noreferrer"
									className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
								>
									<FaTelegram size={18} />
									<span>Telegram</span>
								</a>
								<a
									href="mailto:support@sellyzer.ru"
									className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
								>
									<FaEnvelope size={16} />
									<span>Email</span>
								</a>
							</div>
						</div>

						{/* Навигация */}
						<div className="grid grid-cols-2 md:grid-cols-3 gap-8">
							<div>
								<h4 className="font-semibold mb-4 text-neutral-800">
									Продукт
								</h4>
								<ul className="space-y-3 text-sm text-gray-600">
									<li>
										<a
											href="#features"
											className="hover:text-black transition-colors"
										>
											Возможности
										</a>
									</li>
									<li>
										<a
											href="#pricing"
											className="hover:text-black transition-colors"
										>
											Тарифы
										</a>
									</li>
									<li>
										<a
											href="/dashboard/products"
											className="hover:text-black transition-colors"
										>
											Личный кабинет
										</a>
									</li>
								</ul>
							</div>

							<div>
								<h4 className="font-semibold mb-4 text-neutral-800">
									Ресурсы
								</h4>
								<ul className="space-y-3 text-sm text-gray-600">
									<li>
										<a
											href="https://blog.sellyzer.ru"
											target="_blank"
											rel="noreferrer"
											className="hover:text-black transition-colors"
										>
											Блог
										</a>
									</li>
									<li>
										<a
											href="https://docs.sellyzer.ru"
											target="_blank"
											rel="noreferrer"
											className="hover:text-black transition-colors"
										>
											Документация
										</a>
									</li>
								</ul>
							</div>

							<div>
								<h4 className="font-semibold mb-4 text-neutral-800">
									Платформы
								</h4>
								<ul className="space-y-3 text-sm text-gray-600">
									<li className="flex items-center gap-2">
										<span>Ozon</span>
									</li>
									<li className="flex items-center gap-2">
										<span>Wildberries</span>
									</li>
									<li className="flex items-center gap-2 text-gray-400">
										<span>Avito</span>
										<span className="text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded">
											Скоро
										</span>
									</li>
									<li className="flex items-center gap-2 text-gray-400">
										<span>Yandex Market</span>
										<span className="text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded">
											Скоро
										</span>
									</li>
								</ul>
							</div>
						</div>
					</div>

					{/* Нижняя часть с политиками */}
					<div className="border-t border-neutral-200 pt-8 flex flex-col-reverse md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
						<div className="flex items-center gap-6">
							<span>© 2025 Sellyzer. Все права защищены.</span>
						</div>
						<div className="flex items-center gap-1 md:gap-6 flex-col md:flex-row">
							<a
								href="/terms"
								className="hover:text-black transition-colors"
							>
								Условия использования
							</a>
							<a
								href="/privacy"
								className="hover:text-black transition-colors"
							>
								Политика конфиденциальности
							</a>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
