// src/pages/feed.json.js
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION, SITE_BLOG_URL } from "../consts";

export async function GET() {
	const posts = await getCollection("blog");

	const items = posts.map((post) => ({
		id: `${SITE_BLOG_URL}/${post.id}/`,
		url: `${SITE_BLOG_URL}/${post.id}/`,
		title: post.data.title,
		content_text: post.data.description ?? "",
		date_published: post.data.pubDate,
	}));

	const feed = {
		version: "https://jsonfeed.org/version/1",
		title: SITE_TITLE,
		home_page_url: `${SITE_BLOG_URL}/`,
		feed_url: `${SITE_BLOG_URL}/feed.json`,
		description: SITE_DESCRIPTION,
		items,
	};

	return new Response(JSON.stringify(feed, null, 2), {
		headers: { "Content-Type": "application/feed+json; charset=utf-8" },
	});
}
