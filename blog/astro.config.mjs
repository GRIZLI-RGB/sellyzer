// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://sellyzer.ru",
	integrations: [mdx(), sitemap()],
	base: "/blog",
	server: {
		port: 4000,
	},
	devToolbar: {
		enabled: false,
	},
});
