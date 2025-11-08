import { Bot } from "grammy";
import "dotenv/config";

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);

bot.command("start", async (ctx) => {
	const fullText = ctx.message?.text ?? "";
	const payload = fullText.split(" ")[1];

	if (!payload) {
		return ctx.reply("Не указан ID пользователя");
	}

	const userId = parseInt(payload);
	if (isNaN(userId)) {
		return ctx.reply("Некорректный ID пользователя");
	}

	const chatId = (ctx.from?.id || ctx.chat?.id).toString();
	const username = ctx.from?.username ?? null;

	const resp = await fetch(`${process.env.BACKEND_URL}/bot/connect`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ userId, chatId, username }),
	});

	if (!resp.ok) {
		console.error(await resp.text());
		return ctx.reply("Ошибка подключения Telegram 😢");
	}

	return ctx.reply("✅ Telegram успешно подключён!");
});

bot.start();
