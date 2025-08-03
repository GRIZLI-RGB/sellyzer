/// <reference types="node" />

import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/schema",
	out: "./drizzle",
	dbCredentials: {
		host: "localhost",
		port: 5432,
		user: "postgres",
		password: "postgres",
		database: "sellyzer",
		ssl: process.env.MODE === "production",
	},
});
