import Fastify, { FastifyInstance } from "fastify";

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

fastify.get("/", async function handler(request, reply) {
	return { message: "Hello World!" };
});

const startBackend = async () => {
	try {
		await fastify.listen({ port: 8000 });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

startBackend();
