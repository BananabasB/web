import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
  source: "mdx" | "payload";
};

const postsDir = path.join(process.cwd(), "src/content/posts");

async function getMdxPosts(): Promise<Post[]> {
  if (!fs.existsSync(postsDir)) return [];

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(postsDir, file), "utf-8");
    const { data } = matter(raw);
    return {
      slug: file.replace(/\.mdx$/, ""),
      title: data.title ?? "Untitled",
      description: data.description ?? "",
      date: data.date ?? new Date().toISOString(),
      tags: data.tags ?? [],
      source: "mdx",
    };
  });
}

async function getPayloadPosts(): Promise<Post[]> {
  const apiUrl = process.env.PAYLOAD_API_URL;
  if (!apiUrl) return [];

  try {
    const res = await fetch(`${apiUrl}/api/posts?limit=100`, {
      next: { revalidate: 60 },
    });
    const json = await res.json();
    return (json.docs ?? []).map((doc: any) => ({
      slug: doc.slug,
      title: doc.title,
      description: doc.description ?? "",
      date: doc.publishedAt ?? doc.createdAt,
      tags: doc.tags ?? [],
      source: "payload" as const,
    }));
  } catch {
    return [];
  }
}

export async function getPosts(): Promise<Post[]> {
  const [mdx, payload] = await Promise.all([getMdxPosts(), getPayloadPosts()]);
  return [...mdx, ...payload].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}
