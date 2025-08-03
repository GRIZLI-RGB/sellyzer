import { FastifyInstance } from "fastify";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { db } from "./plugins/database.plugin";
import { users } from "./schema/users";

interface TelegramAuthPayload {
	id: number;
	first_name: string;
	last_name?: string;
	username?: string;
	photo_url?: string;
	auth_date: number;
	hash: string;
	[key: string]: any;
}

export default async function (app: FastifyInstance) {
	app.get("/auth/google/callback", async (req, reply) => {
		const tokenResponse =
			await app.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);

		const { access_token } = tokenResponse.token;

		const userInfo = await fetch(
			"https://www.googleapis.com/oauth2/v2/userinfo",
			{
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			}
		).then((res) => res.json());

		console.log("Google userInfo:", userInfo);

		const { email, name, picture } = userInfo;

		let user = await db.query.users.findFirst({
			where: eq(users.email, email),
		});

		if (!user) {
			[user] = await db
				.insert(users)
				.values({
					email,
					name,
					avatarUrl: picture,
					authProvider: "google",
				})
				.returning();
		}

		const jwtToken = jwt.sign(
			{ id: user.id, email: user.email },
			process.env.JWT_SECRET!
		);

		reply
			.setCookie("token", jwtToken, {
				path: "/",
				httpOnly: true,
				sameSite: "lax",
				secure: process.env.MODE === "production",
			})
			.redirect(
				process.env.MODE === "development"
					? "http://localhost:3000/dashboard"
					: "https://sellyzer.ru/dashboard"
			);
	});
	app.post("/api/auth/telegram", async (req, reply) => {
		const payload = req.body as TelegramAuthPayload;

		// Верификация подписи
		const checkString = Object.keys(payload)
			.filter((key) => key !== "hash")
			.sort()
			.map((key) => `${key}=${payload[key]}`)
			.join("\n");

		const secret = crypto
			.createHash("sha256")
			.update(process.env.TELEGRAM_BOT_TOKEN!)
			.digest();

		const hash = crypto
			.createHmac("sha256", secret)
			.update(checkString)
			.digest("hex");

		if (hash !== payload.hash) {
			return reply.status(403).send({ error: "Invalid Telegram data" });
		}

		let user = await db.query.users.findFirst({
			where: eq(users.telegramId, String(payload.id)),
		});

		if (!user) {
			[user] = await db
				.insert(users)
				.values({
					name: payload.first_name,
					avatarUrl: payload.photo_url,
					authProvider: "telegram",
					telegramId: String(payload.id),
				})
				.returning();
		}

		const token = jwt.sign(
			{ id: user.id, telegramId: user.telegramId },
			process.env.JWT_SECRET!
		);

		reply.setCookie("token", token, {
			path: "/",
			httpOnly: true,
			sameSite: "lax",
			secure: process.env.MODE === "production",
		});

		reply.send({ token });
	});
}
