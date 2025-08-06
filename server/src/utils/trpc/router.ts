import { initTRPC } from "@trpc/server";

import type { Context } from "./context";

export const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
	getUsers: t.procedure.query(async ({ ctx }) => {
		const users = await ctx.db.query.users.findMany();
		return users;
	}),
});

export type AppRouter = typeof appRouter;
