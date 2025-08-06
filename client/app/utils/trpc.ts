import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "./../../../server/src/utils/trpc/router";

export const trpc = createTRPCReact<AppRouter>();
