import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_BLOG_URL } from "../consts";

export async function GET() {
	const posts = await getCollection("blog");

	const entries = posts.map(
		(post) => `
		<entry>
			<title>${post.data.title}</title>
			<link href="${SITE_BLOG_URL}/${post.id}/" />
			<id>${SITE_BLOG_URL}/${post.id}/</id>
			<updated>${new Date(post.data.pubDate).toISOString()}</updated>
			<summary>${post.data.description ?? ""}</summary>
		</entry>
	`
	);

	const xml = `<?xml version="1.0" encoding="utf-8"?>
	<feed xmlns="http://www.w3.org/2005/Atom">
		<title>${SITE_TITLE}</title>
		<link href="${SITE_BLOG_URL}/atom.xml" rel="self" />
		<updated>${new Date().toISOString()}</updated>
		<id>${SITE_BLOG_URL}/</id>
		<author><name>Sellyzer</name></author>
		${entries.join("\n")}
	</feed>`;

	return new Response(xml, {
		headers: { "Content-Type": "application/atom+xml; charset=utf-8" },
	});
}
