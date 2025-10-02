import puppeteer, { Browser } from "puppeteer";
import { TRPCError } from "@trpc/server";

/* 
	Парсит товар с Озон по артикулу или ссылке
*/
export async function parseOzonProduct(article?: string, url?: string) {
	let browser: Browser | null = null;

	try {
		browser = await puppeteer.launch({
			headless: true,
			args: [
				"--no-sandbox",
				"--disable-setuid-sandbox",
				"--disable-dev-shm-usage",
				"--disable-blink-features=AutomationControlled",
				"--disable-extensions",
			],
		});

		const page = await browser.newPage();

		// === Блокировка лишних ресурсов ===
		await page.setRequestInterception(true);
		page.on("request", (req) => {
			const resourceType = req.resourceType();
			const blockedResources = ["image", "stylesheet", "font"];
			if (blockedResources.includes(resourceType)) {
				req.abort();
			} else {
				req.continue();
			}
		});

		// === UserAgent и anti-detect ===
		await page.setUserAgent(
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36"
		);

		await page.evaluateOnNewDocument(() => {
			Object.defineProperty(navigator, "webdriver", { get: () => false });
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

		const targetUrl = url || `https://www.ozon.ru/product/${article}`;
		await page.goto(targetUrl, {
			waitUntil: "networkidle2",
			timeout: 30000,
		});

		// === title ===
		const titleEl = await page.$("div[data-widget='webProductHeading'] h1");
		if (!titleEl)
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "Не удалось найти заголовок товара на Ozon",
			});
		const title =
			(await page.evaluate((el) => el.textContent, titleEl))?.trim() ||
			"";

		// === price ===
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

		// === rating и totalCountReviews ===
		const ratingEl = await page.$(
			"div[data-widget='webSingleProductScore'] div.ga5_3_7-a2"
		);
		let rating = 0;
		let totalCountReviews = 0;

		if (ratingEl) {
			const ratingText =
				(
					await page.evaluate((el) => el.textContent, ratingEl)
				)?.trim() || "";

			const match = ratingText.match(/([\d.]+)\s*•\s*([\d\s\u202F]+)/);
			if (match) {
				rating = parseFloat(match[1]);
				totalCountReviews = parseInt(
					match[2].replace(/[\s\u202F]/g, "")
				);
			}
		}

		// === Артикул ===
		let parsedArticle: string | null = null;
		const articleEl = await page.$(
			"button[data-widget='webDetailSKU'] div.ga5_3_7-a2"
		);
		if (articleEl) {
			const articleText =
				(
					await page.evaluate((el) => el.textContent, articleEl)
				)?.trim() || "";
			const match = articleText.match(/Артикул:\s*(\d+)/i);
			if (match) parsedArticle = match[1];
		}

		return {
			title,
			price,
			url: targetUrl,
			rating,
			totalCountReviews,
			article: parsedArticle || "unknown",
		};
	} finally {
		if (browser) await browser.close();
	}
}
