import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import jwt from "jsonwebtoken";

import { db } from "./../../plugins/database.plugin";

export function createContext({ req, res }: CreateFastifyContextOptions) {
	let user = null;

	const token = req.cookies?.token;
	if (token) {
		try {
			const payload = jwt.verify(token, process.env.JWT_SECRET!);

			if (typeof payload === "object" && "id" in payload) {
				user = {
					id: payload.id as number,
				};
			}
		} catch {}
	}

	return { req, res, db, user };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
