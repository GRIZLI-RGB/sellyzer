# Sellyzer

Sellyzer — AI-сервис для продавцов Wildberries и Ozon. Генерируй тексты, улучшай карточки и увеличивай продажи на маркетплейсах.

| Раздел | Назначение | Технология | Путь / Подпуть |
|--------|-------------|-------------|----------------|
| Лендинг | Демонстрация продукта | Next.js | `/` |
| Платформа | Платформа для клиентов | Next.js | `/dashboard/*` |
| Блог | Контент-маркетинг | Astro | `/blog/*` |
| Документация | Справочные материалы | Mintlify | `/docs/*` |
| Админ-панель | Администрирование проекта | Next.js | `/admin/*` |

## 🚀 Стек

- **Frontend:** Next.js 15 (App Router), Tailwind, Zustand, tRPC, React Hook Form
- **Backend:** Fastify, PostgreSQL, Drizzle ORM, Zod, PG-Boss
- **Интеграции:** OpenAI, ЮKassa, Robokassa, NowPayments
- **Блог:** Astro + Markdown
- **Документация:** Mintlify
- **Автоматизация** n8n (?)

## 📁 Структура

- `client/` — Next.js интерфейс
- `server/` — Fastify сервер + API
- `blog/` — Astro-блог

## 📦 Скрипты (из корня)

```bash
pnpm dev       # Запуск client и server в dev
pnpm prod      # Запуск в production
```
