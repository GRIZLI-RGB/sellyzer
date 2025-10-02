import { TRPCError } from "@trpc/server";
import puppeteer, { Browser } from "puppeteer";

import { protectedProcedure, publicProcedure, router } from "./procedures";
import { products } from "./../../schema/products";
import { createProductInput } from "./inputs";

export const appRouter = router({
	// TODO: переделать как ниже со всеми автодетектами
	createProduct: protectedProcedure
		.input(createProductInput)
		.mutation(async ({ ctx, input }) => {
			const { marketplace, article, url } = input;

			let browser: Browser | null = null;
			let productData = {
				title: "",
				price: 0,
				url: url || "",
			};

			try {
				browser = await puppeteer.launch({ headless: true });
				const page = await browser.newPage();

				if (marketplace === "OZON") {
					const targetUrl =
						url || `https://www.ozon.ru/product/${article}`;
					await page.goto(targetUrl, {
						waitUntil: "domcontentloaded",
						timeout: 30000,
					});

					const title = await page.$eval(
						"h1",
						(el) => el.textContent?.trim() || ""
					);
					const price = await page.$eval(".price", (el) =>
						(el.textContent || "").replace(/\D/g, "")
					);

					if (!title)
						throw new TRPCError({
							code: "NOT_FOUND",
							message: "Не удалось найти товар на Ozon",
						});
					if (!price)
						throw new TRPCError({
							code: "BAD_REQUEST",
							message: "Не удалось получить цену товара",
						});

					productData = {
						title,
						price: parseInt(price),
						url: targetUrl,
					};
				}

				if (marketplace === "WILDBERRIES") {
					const targetUrl =
						url ||
						`https://www.wildberries.ru/catalog/${article}/detail.aspx`;
					await page.goto(targetUrl, {
						waitUntil: "domcontentloaded",
						timeout: 30000,
					});

					const title = await page.$eval(
						"h1",
						(el) => el.textContent?.trim() || ""
					);
					const price = await page.$eval(".price", (el) =>
						(el.textContent || "").replace(/\D/g, "")
					);

					if (!title)
						throw new TRPCError({
							code: "NOT_FOUND",
							message: "Не удалось найти товар на WB",
						});
					if (!price)
						throw new TRPCError({
							code: "BAD_REQUEST",
							message: "Не удалось получить цену товара",
						});

					productData = {
						title,
						price: parseInt(price),
						url: targetUrl,
					};
				}
			} catch (err) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Не удалось получить данные товара",
				});
			} finally {
				if (browser) await browser.close();
			}

			try {
				const [product] = await ctx.db
					.insert(products)
					.values({
						title: productData.title,
						price: productData.price,
						url: productData.url,
						marketplace,
						createdAt: new Date(),
						userId: ctx.user.id,
					})
					.returning();

				return product;
			} catch {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Ошибка сохранения товара в базу",
				});
			}
		}),

	// ! Публичные ендпоинты для тестов !
	testParseProduct: publicProcedure
		.input(createProductInput)
		.mutation(async ({ input }) => {
			const { marketplace, article, url } = input;

			let browser: Browser | null = null;
			let productData = {
				title: "",
				price: 0,
				url: url || "",
			};

			try {
				browser = await puppeteer.launch({
					headless: true,
					args: [
						"--no-sandbox", // отключаем песочницу для Linux/Docker
						"--disable-setuid-sandbox", // дополнительная защита прав
						"--disable-dev-shm-usage", // пишем временные файлы на диск
						"--disable-blink-features=AutomationControlled", // скрываем автоматизацию от сайтов
					],
				});
				const page = await browser.newPage();

				await page.setUserAgent(
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36"
				);

				await page.evaluateOnNewDocument(() => {
					Object.defineProperty(navigator, "webdriver", {
						get: () => false,
					});
					Object.defineProperty(navigator, "languages", {
						get: () => ["ru-RU", "ru"],
					});
					Object.defineProperty(navigator, "platform", {
						get: () => "Win32",
					});
					Object.defineProperty(navigator, "userAgent", {
						get: () =>
							"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36",
					});
				});

				// === OZON ===
				if (marketplace === "OZON") {
					const targetUrl =
						url || `https://www.ozon.ru/product/${article}`;

					await page.goto(targetUrl, {
						waitUntil: "networkidle2",
						timeout: 30000,
					});

					// Получаем title
					const titleEl = await page.$(
						"div[data-widget='webProductHeading'] h1"
					);
					if (!titleEl)
						throw new TRPCError({
							code: "NOT_FOUND",
							message:
								"Не удалось найти заголовок товара на Ozon",
						});
					const title =
						(
							await page.evaluate((el) => el.textContent, titleEl)
						)?.trim() || "";

					// Получаем цену (ищем актуальные классы)
					const priceEl = await page.$(
						"div[data-widget='webPrice'] span.tsHeadline600Large"
					);
					if (!priceEl)
						throw new TRPCError({
							code: "BAD_REQUEST",
							message: "Не удалось получить цену товара на Ozon",
						});
					const priceText = (
						await page.evaluate((el) => el.textContent, priceEl)
					).replace(/\D/g, "");
					const price = parseInt(priceText);

					productData.title = title;
					productData.price = price;
					productData.url = targetUrl;
				}

				// === WILDBERRIES ===
				if (marketplace === "WILDBERRIES") {
					const targetUrl =
						url ||
						`https://www.wildberries.ru/catalog/${article}/detail.aspx`;
					await page.goto(targetUrl, {
						waitUntil: "networkidle2",
						timeout: 30000,
					});

					const titleEl = await page.$("h1");
					if (!titleEl)
						throw new TRPCError({
							code: "NOT_FOUND",
							message: "Не удалось найти заголовок товара на WB",
						});
					const title =
						(
							await page.evaluate((el) => el.textContent, titleEl)
						)?.trim() || "";

					const priceEl = await page.$(
						"div[data-widget='webPrice'] span.tsHeadline600Large"
					);
					if (!priceEl)
						throw new TRPCError({
							code: "BAD_REQUEST",
							message: "Не удалось получить цену товара на WB",
						});
					const priceText = (
						await page.evaluate((el) => el.textContent, priceEl)
					).replace(/\D/g, "");
					const price = parseInt(priceText);

					productData.title = title;
					productData.price = price;
					productData.url = targetUrl;
				}
			} catch (err) {
				if (err instanceof TRPCError) throw err;
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Не удалось получить данные товара",
				});
			} finally {
				if (browser) await browser.close();
			}

			return {
				title: productData.title,
				price: productData.price,
				url: productData.url,
				marketplace,
			};
		}),
});

export type AppRouter = typeof appRouter;
