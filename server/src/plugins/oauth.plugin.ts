import fp from "fastify-plugin";
import fastifyOauth2 from "@fastify/oauth2";

export default fp(async (fastify) => {
	fastify.register(fastifyOauth2, {
		name: "googleOAuth2",
		scope: ["profile", "email"],
		credentials: {
			client: {
				id: process.env.GOOGLE_CLIENT_ID!,
				secret: process.env.GOOGLE_CLIENT_SECRET!,
			},
			auth: fastifyOauth2.GOOGLE_CONFIGURATION,
		},
		startRedirectPath: "/api/auth/google",
		callbackUri: `${
			process.env.MODE === "development"
				? "http://localhost:8000"
				: "https://sellyzer.ru"
		}/api/auth/google/callback`,
	});
});
