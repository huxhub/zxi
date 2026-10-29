import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/features/blog/blog-data';
import { BlogDetailView } from '@/features/blog/blog-detail-view';

export function generateStaticParams() {
  return BLOG_POSTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((item) => item.slug === slug);
  if (!post) {
    return { title: 'Article Not Found | ZXI Interiors' };
  }
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: 'article', url: `/blog/${post.slug}`, title: post.title, description: post.excerpt, images: [post.image] },
  };
}

export default function BlogDetailPage({ params }) {
  return (
    <Suspense fallback={<main aria-busy="true" className="min-h-screen bg-[#F5F0E7]" />}>
      <BlogDetailContent params={params} />
    </Suspense>
  );
}

async function BlogDetailContent({ params }) {
  const { slug } = await params;
  const index = BLOG_POSTS.findIndex((item) => item.slug === slug);
  if (index < 0) {
    notFound();
  }

  const post = BLOG_POSTS[index];
  // Next 3 related posts (wrapping around)
  const nextPosts = BLOG_POSTS.filter((_, i) => i !== index).slice(0, 3);

  return (
    <BlogDetailView
      post={post}
      nextPosts={nextPosts}
      logo={{ src: '/zxi-ae-logo.png', width: 220, height: 80 }}
    />
  );
}
