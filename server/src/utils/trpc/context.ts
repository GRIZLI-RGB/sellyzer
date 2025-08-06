import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

import { db } from "./../../plugins/database.plugin";

export function createContext({ req, res }: CreateFastifyContextOptions) {
	return { req, res, db };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
