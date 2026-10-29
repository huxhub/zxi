'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SiteNav } from '@/components/layout/site-nav';
import { Footer } from '@/components/layout/footer';
import { BLOG_POSTS, BLOG_CATEGORIES } from './blog-data';

export function BlogView({ logo }) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('All');

  const handleNavigate = (id) => {
    router.push(
      id === 'portfolio'
        ? '/projects'
        : id === 'home'
        ? '/'
        : id === 'contact'
        ? '/contact'
        : `/#${id}`
    );
  };

  const filteredPosts =
    activeCategory === 'All'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === activeCategory);

  return (
    <>
      <SiteNav logo={logo} onNavigate={handleNavigate} darkAtTop />

      <main className="min-h-screen bg-[#fcfcfc] text-neutral-900 pt-28 sm:pt-36 md:pt-40 pb-24 md:pb-36">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          {/* Editorial Header */}
          <header className="max-w-3xl mb-14 md:mb-20">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium mb-4">
              Journal & Insights
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-neutral-900 leading-[1.12]">
              Perspectives on design, architecture & contracting.
            </h1>
            <p className="text-base sm:text-lg text-neutral-500 font-light leading-relaxed mt-6">
              Curated case studies, engineering standards, and spatial concepts from our turnkey interior fitout practice in Dubai and the UAE.
            </p>
          </header>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-16 scrollbar-none">
            {BLOG_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-none text-xs sm:text-sm font-semibold tracking-tight whitespace-nowrap cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-[#E8DDCC] text-[#282722]'
                      : 'bg-[#F5F0E7] text-[#282722] hover:bg-[#E8DDCC]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Standard Blog Posts Grid */}
          {filteredPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 lg:gap-14">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col justify-between"
                  aria-label={`Read full article: ${post.title}`}
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-none bg-neutral-100 mb-6">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="flex items-center gap-2.5 text-xs uppercase tracking-widest text-neutral-500 font-medium mb-3">
                      <span>{post.category}</span>
                      <span className="w-1 h-1 rounded-full bg-neutral-300" aria-hidden="true" />
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-neutral-900 leading-snug group-hover:text-neutral-600 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-sm text-neutral-500 font-light leading-relaxed mt-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-neutral-400 mt-6 pt-4 border-t border-neutral-100">
                    <span>{post.date}</span>
                    <span className="text-neutral-800 font-normal inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read article &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer logo={logo} onNavigate={handleNavigate} />
    </>
  );
}

export default BlogView;
