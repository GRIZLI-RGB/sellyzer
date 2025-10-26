import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "../server/src/utils/trpc/router";

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export type UserType = RouterOutputs["getCurrentUser"];
export type CurrentUserProductsType = RouterOutputs["getCurrentUserProducts"];
