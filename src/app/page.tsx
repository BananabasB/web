import NowPlaying from "@/components/now-playing";
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

export default async function Home() {
  const posts = (await getPosts()).slice(0, 5);

  return (
    <div className="max-w-6xl px-6 py-12">

      {/* header */}
      <article className="pb-4 mb-4">
        <header>
          <h1 className={`text-6xl font-black leading-none text-foreground mb-4 ${makeSans.className}`}>
            hi there
          </h1>
        </header>
        <div className="">
          <p className="text-base leading-relaxed max-w-lg m-0">
            <strong>It's me, bananabas.</strong> I often like tinkering with electronics, sharing my (very strong) opinions, and just generally yapping. Sometimes I like to work on <Link href="https://jill-jimmy.com">
              Jill Jimmy
            </Link>, which is a little frog guy I make stories about - kinda like an OC.
            <br />
            <br />
            I often work on little side projects like my private Minecraft server and its infrastructure (there's a lot, don't worry) - and also just generally coding using AI. I'm comfortable with Next.js, Tailwind CSS, TypeScript and I've dabbled in Python and Swift.
            <br />
            <br />
            I use a lot of Apple products, including a Mac mini and an iPhone 14 that I've been using for a while now. I also have a Nintendo Switch 2 for when I want to play games with friends (Tomodachi Life anyone?).
          </p>
        </div>
      </article>

      <div className="flex flex-col-reverse gap-8 lg:flex-row lg:gap-12">

        {/* main — posts */}
        <main className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className={`text-xs uppercase tracking-widest font-bold text-foreground ${makeSans.className}`}>
              recent posts
            </h2>
            <a
              href="/blog"
              className="text-xs font-bold tracking-widest uppercase text-foreground/50 hover:text-foreground transition-colors no-underline"
            >
              all posts ↗
            </a>
          </div>

          {posts.length > 0 ? (
            <ul className="flex flex-col m-0 p-0 list-none divide-y-2 divide-foreground border-y-2 border-foreground">
              {posts.map((post) => (
                <li key={post.slug}>
                  <a
                    href={`/blog/${post.slug}`}
                    className="flex items-baseline justify-between gap-4 py-4 no-underline group"
                  >
                    <span className="text-sm font-bold text-foreground group-hover:underline underline-offset-4 truncate">
                      {post.title}
                    </span>
                    <span className="text-xs text-foreground/50 shrink-0 font-mono">
                      {formatDate(post.date)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="border-2 border-foreground/30 border-dashed p-6">
              <p className="text-sm text-foreground/40 m-0">nothing here yet.</p>
            </div>
          )}
        </main>

        {/* sidebar */}
        <aside className="lg:w-80 lg:shrink-0 flex flex-col gap-6 lg:sticky lg:top-8 lg:self-start">
          <div>
            <NowPlaying />
          </div>
          {/* future widgets go here */}
        </aside>

      </div>
    </div>
  );
}
