import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import helmet from "@fastify/helmet";

const fastify: FastifyInstance = Fastify({
	bodyLimit: 1024 * 1024 * 5,
	disableRequestLogging: true,
	logger: {
		transport: {
			target: "pino-pretty",
			options: {
				translateTime: "HH:MM:ss",
				ignore: "pid,hostname",
			},
		},
	},
});

const startBackend = async () => {
	await fastify.register(cors, {
		origin:
			process.env.MODE === "development"
				? "http://localhost:3000"
				: "https://sellyzer.ru",
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
		credentials: true,
	});

	await fastify.register(rateLimit, {
		max: 100,
		timeWindow: "1 minute",
		ban: 60 * 5,
	});

	await fastify.register(helmet, {
		contentSecurityPolicy: process.env.MODE === "production",
	});

	await fastify.register(import("./routes"), { prefix: "/api" });

	try {
		await fastify.listen({ port: 8000 });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

startBackend();
