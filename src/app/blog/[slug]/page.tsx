import { getPostBySlug, getPosts, getPostContent } from "@/lib/posts";
import { notFound } from "next/navigation";
import { makeSans } from "@/lib/fonts";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import ShareButton from "@/components/share-button";
import { CodeBlock } from "@/components/code-block";


export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — bananabas`,
    description: post.description,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const components = {
    pre: CodeBlock, // this replaces the default <pre> tag
  };
  const content = post.source === "mdx" ? await getPostContent(slug) : null;

  const shareUrl = `https://bananabas.dev/blog/${post.slug}`;
  const shareText = `${post.title} — ${shareUrl}`;

  return (
    <div className="max-w-6xl px-6 py-12">
      {/* header */}
      <div className="pb-4 mb-4">
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 object-cover mb-8 border-2 border-foreground"
          />
        )}
        <h1 className={`text-6xl font-black leading-none text-foreground mb-4 ${makeSans.className}`}>
          {post.title}
        </h1>
        <time
          dateTime={post.date}
          className="text-sm font-medium uppercase tracking-widest text-foreground opacity-60">
          {new Date(post.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
      </div>

      <div className="flex flex-col-reverse gap-8 lg:flex-row lg:gap-12">
        {/* main content */}
        <article className="flex-1 min-w-0 prose prose-lg max-w-none">
          {content && <MDXRemote source={content} components={components} />}
        </article>

        {/* sidebar */}
        <aside className="lg:w-64 lg:shrink-0 flex flex-col gap-6 lg:sticky lg:top-8 lg:self-start">
          {/* tags */}
          {post.tags && post.tags.length > 0 && (
            <div>
              <h2 className={`text-xs uppercase tracking-widest font-bold text-foreground mb-3 ${makeSans.className}`}>
                tags
              </h2>
              <ul className="flex flex-wrap gap-2" aria-label="post tags">
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <span className="border-2 border-foreground text-foreground text-xs font-bold uppercase tracking-wide px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* share */}
          <div>
            <h2 className={`text-xs uppercase tracking-widest font-bold mb-3 ${makeSans.className}`}>
              share
            </h2>
            <ShareButton title={post.title} url={shareUrl} />
          </div>

          {/* toc placeholder */}
          <div>
            <h2 className={`text-xs uppercase tracking-widest font-bold text-foreground mb-3 ${makeSans.className}`}>
              contents
            </h2>
            <p className="text-sm text-foreground opacity-60">coming soon</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
