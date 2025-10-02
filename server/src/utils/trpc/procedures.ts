import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";

export const t = initTRPC.context<Context>().create();

export const router = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = publicProcedure.use(({ ctx, next }) => {
	if (!ctx.user)
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "Пользователь не авторизован",
		});

	return next({
		ctx: {
			...ctx,
			user: ctx.user,
		},
	});
});
