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
			const blockedResources = ["stylesheet", "font"];
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
			"div[data-widget='webSingleProductScore'] a div"
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
			"button[data-widget='webDetailSKU'] div"
		);
		if (articleEl) {
			const articleText =
				(
					await page.evaluate((el) => el.textContent, articleEl)
				)?.trim() || "";
			const match = articleText.match(/Артикул:\s*(\d+)/i);
			if (match) parsedArticle = match[1];
		}

		// === Изображения ===
		let images: string[] = [];

		try {
			await page.waitForSelector("div[data-widget='webGallery']", {
				timeout: 5000,
			});

			images = await page.$$eval(
				"div[data-widget='webGallery'] img",
				(imgs) => {
					const firstImg = imgs[0];

					const normalize = (url: string) => {
						if (!url) return "";
						if (url.includes("cover.jpg")) return "";
						return url.replace(/wc\d+/g, "wc1000");
					};

					const rest = imgs
						.slice(1)
						.map((img) => {
							const srcset = img.getAttribute("srcset");
							if (srcset) {
								const parts = srcset
									.split(",")
									.map((s) => s.trim());
								const last = parts[parts.length - 1];
								return normalize(last.split(" ")[0]);
							}
							return normalize(img.getAttribute("src") || "");
						})
						.filter((src) => src);

					const firstSrc = (() => {
						const srcset = firstImg.getAttribute("srcset");
						if (srcset) {
							const parts = srcset
								.split(",")
								.map((s) => s.trim());
							const last = parts[parts.length - 1];
							return normalize(last.split(" ")[0]);
						}
						return normalize(firstImg.getAttribute("src") || "");
					})();

					// Объединяем и фильтруем дубликаты
					const all = firstSrc ? [firstSrc, ...rest] : rest;
					return Array.from(new Set(all));
				}
			);
		} catch {}

		return {
			title,
			price,
			url: targetUrl,
			rating,
			totalCountReviews,
			article: parsedArticle || "unknown",
			images,
		};
	} finally {
		if (browser) await browser.close();
	}
}
