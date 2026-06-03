import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;
  const mdMatch = pathname.match(/^\/blog\/(.+)\.(md|mdx)$/);
  if (mdMatch) {
    const slug = mdMatch[1];
    url.pathname = `/api/blog-raw/${slug}`;
    return NextResponse.rewrite(url);
  }
  return undefined;
}

export const config = {
  matcher: ['/blog/:path*'],
};
