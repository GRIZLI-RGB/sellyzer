import { FastifyInstance } from "fastify";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

import { db } from "./plugins/database.plugin";
import { users } from "./schema/users";

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
}
