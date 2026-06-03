import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AI_AGENT_REGEX = /(claude|anthropic|chatgpt|openai)/i;

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // direct .md/.mdx requests -> api route
  const mdMatch = pathname.match(/^\/blog\/(.+)\.(md|mdx)$/);
  if (mdMatch) {
    const slug = mdMatch[1];
    url.pathname = `/api/blog-raw/${slug}`;
    return NextResponse.rewrite(url);
  }

  // detect AI agents requesting blog pages without .md/.mdx
  const blogMatch = pathname.match(/^\/blog\/([^\/]+)\/?$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    const ua = req.headers.get('user-agent') || '';
    const match = ua.match(AI_AGENT_REGEX);
    if (match) {
      const agent = match[1].toLowerCase();
      url.pathname = `/api/blog-raw/${slug}`;
      url.searchParams.set('ai', agent);
      return NextResponse.rewrite(url);
    }
  }

  return undefined;
}

export const config = {
  matcher: ['/blog/:path*'],
};
