'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { SiteNav } from '@/components/layout/site-nav';
import { Footer } from '@/components/layout/footer';
import { BLOG_POSTS, BLOG_CATEGORIES } from './blog-data';

export function BlogView({ logo }) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('All');

  // Initialize smooth Lenis scrolling
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

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

  const featuredPost = filteredPosts[0] || BLOG_POSTS[0];
  const gridPosts = filteredPosts.slice(1);

  return (
    <>
      <SiteNav logo={logo} onNavigate={handleNavigate} />

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
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-normal tracking-tight whitespace-nowrap cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Featured Hero Article */}
          {featuredPost && (
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block mb-20 md:mb-28 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              aria-label={`Read full article: ${featuredPost.title}`}
            >
              <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-xl bg-neutral-100">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              <div className="lg:col-span-5 flex flex-col items-start justify-center">
                <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-neutral-500 font-medium mb-4">
                  <span>{featuredPost.category}</span>
                  <span className="w-1 h-1 rounded-full bg-neutral-300" aria-hidden="true" />
                  <span>{featuredPost.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-neutral-900 leading-snug group-hover:text-neutral-600 transition-colors">
                  {featuredPost.title}
                </h2>

                <p className="text-sm sm:text-base text-neutral-500 font-light leading-relaxed mt-4 line-clamp-3">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center gap-4 mt-6 text-xs text-neutral-400">
                  <span>{featuredPost.date}</span>
                  <span className="text-neutral-900 font-normal inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read full article &rarr;
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Standard Blog Posts Grid (3 Columns) */}
          {gridPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 lg:gap-14">
              {gridPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col justify-between"
                  aria-label={`Read full article: ${post.title}`}
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-neutral-100 mb-6">
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
