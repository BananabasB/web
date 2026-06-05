import { getPostBySlug, getPostContent } from '@/lib/posts';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || post.source !== 'mdx') {
    return new NextResponse(null, { status: 404 });
  }
  const md = await getPostContent(slug);
  if (!md) return new NextResponse(null, { status: 404 });

  // If middleware marked this as an AI request, prepend a notice
  try {
    const url = new URL(request.url);
    const agent = url.searchParams.get('ai');
    if (agent) {
      const notice = 'We detected an AI agent was trying to grab this page. Showing raw Markdown.\n\n';
      return new NextResponse(notice + md, {
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
        },
      });
    }
  } catch (e) {
    // ignore parsing errors
  }

  return new NextResponse(md, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}
