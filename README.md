# Sellyzer

Sellyzer — AI-сервис для продавцов Wildberries и Ozon. Генерируй тексты, улучшай карточки и увеличивай продажи на маркетплейсах.

## 🚀 Стек

-   **Frontend:** Next.js 15 (App Router), Tailwind, Jotai, tRPC, React Hook Form, TanStack Query
-   **Backend:** Fastify, PostgreSQL, Drizzle ORM, Zod, node-cron
-   **Интеграции:** OpenAI, ЮKassa, Robokassa, NowPayments
-   **Блог:** Astro + Markdown
-   **Документация:** Mintlify

## 📁 Структура

-   `client/` — Next.js интерфейс
-   `server/` — Fastify сервер + API
-   `blog/` — Astro-блог

## 📦 Скрипты (из корня)

```bash
pnpm dev       # Запуск client и server в dev
pnpm prod      # Запуск в production
```