import { getPostBySlug, getPosts, getPostContent, slugify, extractHeadings } from "@/lib/posts";
import { notFound } from "next/navigation";
import { makeSans } from "@/lib/fonts";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import ShareButton from "@/components/share-button";
import { CodeBlock } from "@/components/code-block";
import TableOfContents from "@/components/table-of-contents";

function getInnerText(children: any): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(getInnerText).join("");
  if (children?.props?.children) return getInnerText(children.props.children);
  return "";
}

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
    h2: (props: any) => <h2 id={slugify(getInnerText(props.children))} className="scroll-mt-8" {...props} />,
    h3: (props: any) => <h3 id={slugify(getInnerText(props.children))} className="scroll-mt-8" {...props} />,
    h4: (props: any) => <h4 id={slugify(getInnerText(props.children))} className="scroll-mt-8" {...props} />,
  };

  const content = post.source === "mdx" ? await getPostContent(slug) : null;
  const headings = content ? extractHeadings(content) : [];

  const shareUrl = `https://bananabas.dev/blog/${post.slug}`;

  return (
    <div className="max-w-6xl px-6 py-12">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        {/* main content */}
        <article className="flex-1 min-w-0">
          <header className="pb-4 mb-8">
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
          </header>

          <div className="prose prose-lg max-w-none">
            {content && <MDXRemote source={content} components={components} />}
          </div>
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
          <ShareButton title={post.title} url={shareUrl} />

          {/* toc */}
          {headings.length > 0 && <TableOfContents headings={headings} />}
        </aside>
      </div>
    </div>
  );
}
