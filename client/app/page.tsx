export default function HomePage() {
	return (
		<main className="px-6 md:px-12 py-16 space-y-24">
			{/* Hero Section */}
			<section className="max-w-4xl mx-auto text-center space-y-6">
				<h1 className="text-5xl font-bold tracking-tight">
					Sellyzer — AI-инструменты для маркетплейс-продавцов
				</h1>
				<p className="text-lg text-[--color-subtle]">
					Создавайте описания, анализируйте конкурентов, следите за карточками товаров — всё в одном месте.
				</p>
				<div className="flex justify-center gap-4 mt-6">
					<button className="bg-[--color-primary] text-white px-6 py-3 rounded-xl hover:bg-[--color-primary-hover] transition shadow-md">
						Начать бесплатно →
					</button>
					<button className="border border-[--color-primary] text-[--color-primary] px-6 py-3 rounded-xl hover:bg-indigo-50 transition">
						Посмотреть демо
					</button>
				</div>
			</section>

			{/* Pricing Section */}
			<section className="max-w-6xl mx-auto">
				<h2 className="text-3xl font-semibold text-center mb-10">Тарифы</h2>
				<div className="grid md:grid-cols-3 gap-6">
					{[
						{ name: "Бесплатный", price: "0₽", desc: "Для старта" },
						{ name: "PRO", price: "490₽/мес", desc: "Для активных продавцов" },
						{ name: "Бизнес", price: "1 490₽/мес", desc: "Для команд" },
					].map((plan, i) => (
						<div
							key={i}
							className="bg-[--color-surface] border border-[--color-border] rounded-2xl p-6 shadow-sm hover:shadow-md transition"
						>
							<h3 className="text-xl font-bold">{plan.name}</h3>
							<p className="text-sm text-[--color-subtle] mt-1">{plan.desc}</p>
							<p className="text-3xl font-bold mt-4">{plan.price}</p>
							<ul className="mt-4 text-sm text-[--color-text] space-y-1">
								<li>✔ Генератор описаний</li>
								<li>✔ Анализ конкурентов</li>
								{i === 2 && <li>✔ Командный доступ</li>}
							</ul>
							<button className="mt-6 w-full bg-[--color-primary] text-white px-4 py-2 rounded-lg hover:bg-[--color-primary-hover] transition shadow-md">
								Выбрать
							</button>
						</div>
					))}
				</div>
			</section>
		</main>
	);
}
