import { getPosts } from "@/lib/posts";
import { makeSans } from "@/lib/fonts";
import Link from "next/link";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-6xl px-6 py-12">
      <article className="pb-4 mb-4">
        <header>
          <h1 className={`text-6xl font-black leading-none text-foreground mb-4 ${makeSans.className}`}>
            blog
          </h1>
        </header>
        <p className="text-sm text-foreground/60 m-0">where i scribble random stuff bc why not</p>
      </article>

      <main className="flex-1 min-w-0">
        {posts.length > 0 ? (
          <ul className="flex flex-col m-0 p-0 list-none divide-y-2 divide-foreground border-y-2 border-foreground">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex items-baseline justify-between gap-4 py-4 no-underline group"
                >
                  <span className="text-sm font-bold text-foreground group-hover:underline underline-offset-4 truncate">
                    {post.title}
                  </span>
                  <span className="text-xs text-foreground/50 shrink-0 font-mono">
                    {formatDate(post.date)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="border-2 border-foreground/30 border-dashed p-6">
            <p className="text-sm text-foreground/40 m-0">nothing here yet.</p>
          </div>
        )}
      </main>
    </div>
  );
}
