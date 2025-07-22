import { FastifyInstance } from "fastify";

export default async function (app: FastifyInstance) {
	app.get("/", async () => {
		return { msg: "Hello from API" };
	});

	app.get("/users", async () => {
		return [{ id: 1, name: "Grizli" }];
	});
}
