import { getPosts } from "@/lib/posts";
import { Feed } from "feed";

export async function GET() {
  const posts = await getPosts();

  const feed = new Feed({
    title: "bananabas",
    description: "bananabas's blog",
    id: "https://barnabas.frg.network/",
    link: "https://barnabas.frg.network/",
    language: "en",
    feedLinks: {
      rss: "https://barnabas.frg.network/feed.xml",
      atom: "https://barnabas.frg.network/atom.xml",
    },
    author: {
      name: "bananabas",
      email: "barnabas@frg.network",
    },
    copyright: `Licensed under CC-BY-NC 4.0 ${new Date().getFullYear()} bananabas`,
  });

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `https://barnabas.frg.network/blog/${post.slug}`,
      link: `https://barnabas.frg.network/blog/${post.slug}`,
      description: post.description,
      date: new Date(post.date),
    });
  }

  return new Response(feed.atom1(), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
