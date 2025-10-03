import { FaTelegram, FaEnvelope } from "react-icons/fa";

import Logo from "@/app/components/shared/logo";

export default function TermsOfService() {
	return (
		<div className="min-h-screen bg-neutral-50 py-12">
			<div className="container mx-auto px-4 max-w-6xl">
				{/* Header */}
				<div className="text-center mb-12">
					<div className="flex items-center justify-center gap-3 mb-6">
						<Logo />
					</div>
					<h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
						Условия использования
					</h1>
					<p className="text-gray-600">
						Последнее обновление:{" "}
						{new Date().toLocaleDateString("ru-RU")}
					</p>
				</div>

				{/* Content */}
				<div className="bg-white rounded-2xl border border-gray-200 shadow-sm py-10 px-12">
					<div className="prose prose-lg max-w-none">
						<section className="mb-8">
							<h2 className="text-2xl font-semibold mb-4 text-gray-900">
								1. Общие положения
							</h2>
							<p className="text-gray-700 mb-4">
								1.1. Настоящие Условия использования (далее —
								«Условия») регулируют отношения между
								<strong> Sellyzer</strong> (далее — «Сервис»,
								«Мы») и пользователем (далее — «Пользователь»,
								«Вы») в связи с использованием веб-сайта
								sellyzer.com и связанных услуг.
							</p>
							<p className="text-gray-700 mb-4">
								1.2. Используя Сервис, Вы подтверждаете, что
								прочитали, поняли и соглашаетесь соблюдать
								настоящие Условия.
							</p>
							<p className="text-gray-700">
								1.3. Сервис предоставляет инструменты аналитики
								для продавцов на маркетплейсах Ozon, Wildberries
								и других платформах.
							</p>
						</section>

						<section className="mb-8">
							<h2 className="text-2xl font-semibold mb-4 text-gray-900">
								2. Регистрация и учетная запись
							</h2>
							<p className="text-gray-700 mb-4">
								2.1. Для использования полного функционала
								Сервиса требуется регистрация через OAuth 2.0
								провайдеров (Google, Telegram).
							</p>
							<p className="text-gray-700 mb-4">
								2.2. Вы гарантируете, что предоставляемая
								информация является точной и полной.
							</p>
							<p className="text-gray-700 mb-4">
								2.3. Вы несете ответственность за сохранность
								своих учетных данных и все действия, совершенные
								под вашей учетной записью.
							</p>
							<p className="text-gray-700">
								2.4. Мы оставляем за собой право приостановить
								или удалить учетную запись при нарушении
								настоящих Условий.
							</p>
						</section>

						<section className="mb-8">
							<h2 className="text-2xl font-semibold mb-4 text-gray-900">
								3. Условия использования
							</h2>
							<p className="text-gray-700 mb-4">
								3.1. Вы обязуетесь использовать Сервис только в
								законных целях и в соответствии с применимым
								законодательством.
							</p>
							<p className="text-gray-700 mb-4">
								3.2. Запрещается:
							</p>
							<ul className="text-gray-700 list-disc list-inside space-y-2 mb-4">
								<li>
									Использовать Сервис для мошеннических или
									незаконных действий
								</li>
								<li>Предоставлять недостоверную информацию</li>
								<li>
									Нарушать права интеллектуальной
									собственности
								</li>
								<li>
									Попытки взлома или несанкционированного
									доступа к системам Сервиса
								</li>
								<li>
									Передавать свои учетные данные третьим лицам
								</li>
							</ul>
							<p className="text-gray-700">
								3.3. Мы оставляем за собой право изменять
								функционал Сервиса в любое время.
							</p>
						</section>

						<section className="mb-8">
							<h2 className="text-2xl font-semibold mb-4 text-gray-900">
								4. Оплата и тарифы
							</h2>
							<p className="text-gray-700 mb-4">
								4.1. Сервис предлагает бесплатный и платный
								(PRO) тарифы.
							</p>
							<p className="text-gray-700 mb-4">
								4.2. Оплата PRO-тарифа производится помесячно.
								Автоматическое продление не предусмотрено.
							</p>
							<p className="text-gray-700 mb-4">
								4.3. Возврат средств возможен в течение 14 дней
								с момента оплаты при условии неиспользования
								платного функционала.
							</p>
							<p className="text-gray-700">
								4.4. Мы оставляем за собой право изменять тарифы
								с уведомлением пользователей за 30 дней.
							</p>
						</section>

						<section className="mb-8">
							<h2 className="text-2xl font-semibold mb-4 text-gray-900">
								5. Интеллектуальная собственность
							</h2>
							<p className="text-gray-700 mb-4">
								5.1. Все права на Сервис, включая программное
								обеспечение, дизайн, логотипы и контент,
								принадлежат Sellyzer.
							</p>
							<p className="text-gray-700">
								5.2. Вы получаете ограниченную, непередаваемую
								лицензию на использование Сервиса в соответствии
								с настоящими Условиями.
							</p>
						</section>

						<section className="mb-8">
							<h2 className="text-2xl font-semibold mb-4 text-gray-900">
								6. Ограничение ответственности
							</h2>
							<p className="text-gray-700 mb-4">
								6.1. Сервис предоставляется «как есть». Мы не
								гарантируем бесперебойную работу или отсутствие
								ошибок.
							</p>
							<p className="text-gray-700 mb-4">
								6.2. Мы не несем ответственности за прямые или
								косвенные убытки, возникшие в результате
								использования Сервиса.
							</p>
							<p className="text-gray-700">
								6.3. Вы несете полную ответственность за
								решения, принятые на основе данных, полученных
								через Сервис.
							</p>
						</section>

						<section className="mb-8">
							<h2 className="text-2xl font-semibold mb-4 text-gray-900">
								7. Изменение условий
							</h2>
							<p className="text-gray-700 mb-4">
								7.1. Мы оставляем за собой право изменять
								настоящие Условия.
							</p>
							<p className="text-gray-700">
								7.2. Продолжение использования Сервиса после
								внесения изменений означает ваше согласие с
								новыми Условиями.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold mb-4 text-gray-900">
								8. Контакты
							</h2>
							<p className="text-gray-700 mb-4">
								По всем вопросам, связанным с настоящими
								Условиями, обращайтесь:
							</p>
							<div className="flex flex-col gap-3">
								<a
									href="https://t.me/sellyzer_support"
									target="_blank"
									rel="noreferrer"
									className="inline-flex items-center gap-3 text-blue-600 hover:text-blue-700 transition-colors"
								>
									<FaTelegram size={18} />
									<span className="font-medium">
										@sellyzer_support
									</span>
								</a>
								<a
									href="mailto:support@sellyzer.ru"
									className="inline-flex items-center gap-3 text-blue-600 hover:text-blue-700 transition-colors"
								>
									<FaEnvelope size={16} />
									<span className="font-medium">
										support@sellyzer.ru
									</span>
								</a>
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
}
