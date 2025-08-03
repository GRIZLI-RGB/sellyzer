import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { users } from "../schema/users";

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = new Pool({
	connectionString: `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
	ssl: process.env.MODE === "production",
});

export const db = drizzle(pool, {
	schema: {
		users,
	},
});
