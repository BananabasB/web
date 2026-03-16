import { getPosts } from "@/lib/posts";
import { Feed } from "feed";

export async function GET() {
  const posts = await getPosts();

  const feed = new Feed({
    title: "bananabas",
    description: "bananabas's blog",
    id: "https://bananabas.dev/",
    link: "https://bananabas.dev/",
    language: "en",
    feedLinks: {
      rss: "https://bananabas.dev/feed.xml",
      atom: "https://bananabas.dev/atom.xml",
    },
    author: {
      name: "bananabas",
      email: "barnabas.bodily@icloud.com",
    },
    copyright: `© ${new Date().getFullYear()} bananabas`,
  });

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `https://bananabas.dev/blog/${post.slug}`,
      link: `https://bananabas.dev/blog/${post.slug}`,
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
