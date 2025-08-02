import { FastifyInstance } from "fastify";
import puppeteer from "puppeteer";

async function scrapeOzonProduct(url: string) {
	const browser = await puppeteer.launch({
		headless: true,
		args: [
			"--no-sandbox",
			"--disable-setuid-sandbox",
			"--disable-dev-shm-usage",
			"--disable-blink-features=AutomationControlled",
		],
	});
	const page = await browser.newPage();

	await page.setUserAgent(
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36"
	);

	await page.evaluateOnNewDocument(() => {
		Object.defineProperty(navigator, "webdriver", { get: () => false });
		Object.defineProperty(navigator, "languages", {
			get: () => ["ru-RU", "ru"],
		});
		Object.defineProperty(navigator, "platform", { get: () => "Win32" });
		Object.defineProperty(navigator, "userAgent", {
			get: () =>
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36",
		});
	});

	await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

	const data = await page.evaluate(() => {
		const getText = (selector: string) =>
			document.querySelector(selector)?.textContent?.trim() || null;

		return {
			title: getText("h1"),
			price: getText('[data-widget="webPrice"]'),

			images: Array.from(
				document.querySelectorAll('[data-widget="webGallery"] img')
			).map((img) => img.getAttribute("src")),
			features: Array.from(
				document.querySelectorAll(
					'[data-widget="webCharacteristics"] div'
				)
			).map((el) => el.textContent?.trim()),
		};
	});

	await browser.close();
	return data;
}

export default async function (app: FastifyInstance) {
	app.get("/parse-ozon/:id", async (request, _) => {
		// @ts-ignore
		const productId = request.params.id;
		const url = `https://www.ozon.ru/product/${productId}`;

		return await scrapeOzonProduct(url);
	});

	app.get("/ozon/search", async (request, reply) => {
		const query = (request.query as any).query || "";
		if (!query) return { error: "query parameter is required" };

		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();

		try {
			await page.goto(
				`https://www.ozon.ru/search/?from_global=true&text=${encodeURIComponent(
					query
				)}`,
				{ waitUntil: "networkidle2" }
			);

			// Ждём появление пагинатора
			await page.waitForSelector(
				'[data-widget="infiniteVirtualPaginator"]',
				{
					timeout: 15000,
				}
			);

			// Парсим данные
			const results = await page.evaluate(() => {
				const container = document.querySelector(
					'[data-widget="infiniteVirtualPaginator"]'
				);
				if (!container) return [];

				const items = Array.from(
					container.querySelectorAll(
						'[data-testid="tile-hover-target"]'
					)
				);

				return items.map((item) => {
					const title =
						item
							.querySelector("a > div > div > span")
							?.textContent?.trim() || "";
					const price =
						item
							.querySelector('[data-testid="price"] span')
							?.textContent?.trim() || "";
					const link = item.querySelector("a")?.href || "";
					return { title, price, link };
				});
			});

			await browser.close();

			return { query, results };
		} catch (e: any) {
			await browser.close();
			reply.status(500);
			return { error: e.message || String(e), query };
		}
	});
}
