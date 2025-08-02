// export default function HomePage() {
// 	return (
// 		<main className="px-6 md:px-12 py-16 space-y-24">
// 			{/* Hero Section */}
// 			<section className="max-w-4xl mx-auto text-center space-y-6">
// 				<h1 className="text-5xl font-bold tracking-tight">
// 					Sellyzer — AI-инструменты для маркетплейс-продавцов
// 				</h1>
// 				<p className="text-lg text-[--color-subtle]">
// 					Создавайте описания, анализируйте конкурентов, следите за карточками товаров — всё в одном месте.
// 				</p>
// 				<div className="flex justify-center gap-4 mt-6">
// 					<button className="bg-[--color-primary] text-white px-6 py-3 rounded-xl hover:bg-[--color-primary-hover] transition shadow-md">
// 						Начать бесплатно →
// 					</button>
// 					<button className="border border-[--color-primary] text-[--color-primary] px-6 py-3 rounded-xl hover:bg-indigo-50 transition">
// 						Посмотреть демо
// 					</button>
// 				</div>
// 			</section>
// 		</main>
// 	);
// }

import { Button, Card, CardBody } from "@heroui/react";
import { LineChart, Search, Bot } from "lucide-react";

export default function Home() {
	return (
		<div className="bg-white text-gray-900">
			{/* Hero Section */}
			<section className="py-24 px-6 text-center bg-gradient-to-b from-primary-light to-white">
				<h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto">
					Анализ карточек товаров на маркетплейсах за 5 секунд
				</h1>
				<p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
					Узнай, почему нет продаж. Sellyzer подскажет, что нужно
					улучшить, бесплатно и без авторизации.
				</p>
				<div className="mt-6 flex justify-center">
					<Button size="lg">Проверить карточку</Button>
				</div>
				{/* До / После сравнение */}
				<div className="mt-12 flex justify-center gap-4 max-w-4xl mx-auto">
					<Card className="w-1/2 shadow-card">
						<CardBody className="p-4">
							<p className="text-sm text-gray-500 mb-2">
								До Sellyzer
							</p>
							<img
								src="/bad-card.png"
								alt="Плохая карточка"
								className="rounded-xl"
							/>
						</CardBody>
					</Card>
					<Card className="w-1/2 shadow-card">
						<CardBody className="p-4">
							<p className="text-sm text-gray-500 mb-2">
								После Sellyzer
							</p>
							<img
								src="/good-card.png"
								alt="Хорошая карточка"
								className="rounded-xl"
							/>
						</CardBody>
					</Card>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-20 px-6 max-w-5xl mx-auto text-center">
				<h2 className="text-3xl md:text-4xl font-bold mb-6">
					Что умеет Sellyzer
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
					<Card className="shadow-card">
						<CardBody className="p-6">
							<Search className="w-6 h-6 text-primary mb-4" />
							<h3 className="text-xl font-semibold mb-2">
								Анализ карточки
							</h3>
							<p className="text-gray-600">
								Введи ссылку — и получи разбор по фото,
								описанию, цене, отзывам и т.д.
							</p>
						</CardBody>
					</Card>
					<Card className="shadow-card">
						<CardBody className="p-6">
							<Bot className="w-6 h-6 text-primary mb-4" />
							<h3 className="text-xl font-semibold mb-2">
								AI-рекомендации
							</h3>
							<p className="text-gray-600">
								Искусственный интеллект предложит улучшенные
								названия, описание и оформление.
							</p>
						</CardBody>
					</Card>
					<Card className="shadow-card">
						<CardBody className="p-6">
							<LineChart className="w-6 h-6 text-primary mb-4" />
							<h3 className="text-xl font-semibold mb-2">
								Сравнение с конкурентами
							</h3>
							<p className="text-gray-600">
								Проверь, как ты выглядишь на фоне других — по
								цене, рейтингу, фото и продажам.
							</p>
						</CardBody>
					</Card>
				</div>
			</section>

			{/* Final CTA */}
			<section className="py-20 px-6 bg-primary-light text-center">
				<h2 className="text-3xl md:text-4xl font-bold mb-4">
					Готов проверить свою карточку?
				</h2>
				<p className="text-gray-700 mb-6">
					Никакой регистрации. Просто вставь ссылку — и получи
					результат.
				</p>
				<Button size="lg">Начать бесплатно</Button>
			</section>
		</div>
	);
}
