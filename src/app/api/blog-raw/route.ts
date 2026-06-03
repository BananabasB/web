import { getPostBySlug, getPostContent } from '@/lib/posts';
import { NextResponse } from 'next/server';

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await getPostBySlug(slug);
  if (!post || post.source !== 'mdx') {
    return new NextResponse(null, { status: 404 });
  }
  const md = await getPostContent(slug);
  if (!md) return new NextResponse(null, { status: 404 });
  return new NextResponse(md, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}
