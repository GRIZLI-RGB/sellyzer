import { FaTelegram, FaEnvelope } from "react-icons/fa";

import Logo from "@/app/components/shared/logo";

export default function PrivacyPolicy() {
	return (
		<div className="min-h-screen bg-neutral-50 py-12">
			<div className="container mx-auto px-4 max-w-6xl">
				{/* Header */}
				<div className="text-center mb-12">
					<div className="flex items-center justify-center gap-3 mb-6">
						<Logo />
					</div>
					<h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
						Политика конфиденциальности
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
								1.1. Настоящая Политика конфиденциальности
								(далее — «Политика») описывает, как
								<strong> Sellyzer</strong> (далее — «Мы»,
								«Сервис») собирает, использует и защищает
								персональные данные пользователей.
							</p>
							<p className="text-gray-700">
								1.2. Используя Сервис, Вы соглашаетесь с
								условиями настоящей Политики.
							</p>
						</section>

						<section className="mb-8">
							<h2 className="text-2xl font-semibold mb-4 text-gray-900">
								2. Собираемая информация
							</h2>
							<p className="text-gray-700 mb-4">
								2.1. Мы собираем следующую информацию:
							</p>
							<ul className="text-gray-700 list-disc list-inside space-y-2 mb-4">
								<li>
									<strong>Данные учетной записи:</strong> имя,
									email, идентификатор OAuth провайдера
									(Google, Telegram)
								</li>
								<li>
									<strong>Данные маркетплейсов:</strong>{" "}
									информация о товарах, заказах, отзывах,
									полученная через официальные API
								</li>
								<li>
									<strong>Технические данные:</strong>{" "}
									IP-адрес, тип браузера, информация об
									устройстве
								</li>
								<li>
									<strong>Данные использования:</strong>{" "}
									история действий в Сервисе, предпочтения
								</li>
							</ul>
							<p className="text-gray-700">
								2.2. Мы не храним пароли от ваших аккаунтов
								маркетплейсов. Доступ осуществляется через
								безопасные OAuth-токены.
							</p>
						</section>

						<section className="mb-8">
							<h2 className="text-2xl font-semibold mb-4 text-gray-900">
								3. Цели использования данных
							</h2>
							<p className="text-gray-700 mb-4">
								3.1. Мы используем собранные данные для:
							</p>
							<ul className="text-gray-700 list-disc list-inside space-y-2 mb-4">
								<li>
									Предоставления и улучшения функционала
									Сервиса
								</li>
								<li>Персонализации пользовательского опыта</li>
								<li>
									Обработки платежей и управления учетными
									записями
								</li>
								<li>
									Отправки уведомлений и технической поддержки
								</li>
								<li>
									Анализа использования Сервиса для улучшения
									качества
								</li>
							</ul>
							<p className="text-gray-700">
								3.2. Мы не используем данные пользователей для
								показа таргетированной рекламы третьим лицам.
							</p>
						</section>

						<section className="mb-8">
							<h2 className="text-2xl font-semibold mb-4 text-gray-900">
								4. Передача данных третьим лицам
							</h2>
							<p className="text-gray-700 mb-4">
								4.1. Мы не продаем и не передаем персональные
								данные пользователей третьим лицам, за
								исключением случаев:
							</p>
							<ul className="text-gray-700 list-disc list-inside space-y-2 mb-4">
								<li>
									Когда это требуется по закону или в ответ на
									законный запрос
								</li>
								<li>
									Для обработки платежей через платежные
									системы (ЮKassa, Robokassa, NowPayments)
								</li>
								<li>
									При использовании сервисов аналитики (Google
									Analytics) в обезличенной форме
								</li>
								<li>При явном согласии пользователя</li>
							</ul>
							<p className="text-gray-700">
								4.2. Мы заключаем соглашения о защите данных со
								всеми сторонними провайдерами.
							</p>
						</section>

						<section className="mb-8">
							<h2 className="text-2xl font-semibold mb-4 text-gray-900">
								5. Безопасность данных
							</h2>
							<p className="text-gray-700 mb-4">
								5.1. Мы применяем современные меры безопасности
								для защиты данных пользователей, включая:
							</p>
							<ul className="text-gray-700 list-disc list-inside space-y-2 mb-4">
								<li>
									Шифрование передаваемых данных (HTTPS/TLS)
								</li>
								<li>Защиту баз данных и серверов</li>
								<li>
									Регулярное обновление систем безопасности
								</li>
								<li>
									Ограниченный доступ к персональным данным
								</li>
							</ul>
							<p className="text-gray-700">
								5.2. Несмотря на наши усилия, ни один метод
								передачи данных через интернет не является
								абсолютно безопасным.
							</p>
						</section>

						<section className="mb-8">
							<h2 className="text-2xl font-semibold mb-4 text-gray-900">
								6. Хранение данных
							</h2>
							<p className="text-gray-700 mb-4">
								6.1. Мы храним персональные данные до тех пор,
								пока это необходимо для предоставления Сервиса
								или выполнения юридических обязательств.
							</p>
							<p className="text-gray-700">
								6.2. При удалении учетной записи все связанные
								персональные данные удаляются в течение 30 дней,
								за исключением данных, требующих хранения по
								закону.
							</p>
						</section>

						<section className="mb-8">
							<h2 className="text-2xl font-semibold mb-4 text-gray-900">
								7. Права пользователей
							</h2>
							<p className="text-gray-700 mb-4">
								Вы имеете право:
							</p>
							<ul className="text-gray-700 list-disc list-inside space-y-2 mb-4">
								<li>На доступ к своим персональным данным</li>
								<li>На исправление неточных данных</li>
								<li>На удаление своих данных</li>
								<li>На ограничение обработки данных</li>
								<li>На перенос данных</li>
								<li>На отзыв согласия на обработку данных</li>
							</ul>
							<p className="text-gray-700">
								Для реализации этих прав обращайтесь по
								контактам, указанным в разделе 9.
							</p>
						</section>

						<section className="mb-8">
							<h2 className="text-2xl font-semibold mb-4 text-gray-900">
								8. Файлы cookies
							</h2>
							<p className="text-gray-700 mb-4">
								8.1. Мы используем файлы cookies для:
							</p>
							<ul className="text-gray-700 list-disc list-inside space-y-2 mb-4">
								<li>Аутентификации пользователей</li>
								<li>Запоминания предпочтений</li>
								<li>Анализа использования Сервиса</li>
							</ul>
							<p className="text-gray-700">
								8.2. Вы можете отключить cookies в настройках
								браузера, но это может ограничить
								функциональность Сервиса.
							</p>
						</section>

						<section className="mb-8">
							<h2 className="text-2xl font-semibold mb-4 text-gray-900">
								9. Контакты
							</h2>
							<p className="text-gray-700 mb-4">
								По всем вопросам, связанным с защитой
								персональных данных, обращайтесь:
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

						<section>
							<h2 className="text-2xl font-semibold mb-4 text-gray-900">
								10. Изменения в политике
							</h2>
							<p className="text-gray-700 mb-4">
								10.1. Мы оставляем за собой право вносить
								изменения в настоящую Политику.
							</p>
							<p className="text-gray-700">
								10.2. Продолжение использования Сервиса после
								внесения изменений означает ваше согласие с
								новой версией Политики.
							</p>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
}
