'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { SiteNav } from '@/components/layout/site-nav';
import { Footer } from '@/components/layout/footer';
import { Action } from '@/components/ui/action';

export function BlogDetailView({ post, nextPosts = [], logo }) {
  const router = useRouter();

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

  if (!post) return null;

  return (
    <>
      <SiteNav logo={logo} onNavigate={handleNavigate} />

      <main className="min-h-screen bg-[#fcfcfc] text-neutral-900 pt-28 sm:pt-32 md:pt-36 pb-24 md:pb-36">
        <article className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          {/* Top Hero Section */}
          <header className="max-w-4xl mb-12 sm:mb-16">
            {/* Category & Reading Metadata Badges */}
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest text-neutral-500 font-medium mb-6">
              <span className="px-3.5 py-1.5 rounded-full bg-neutral-900 text-white tracking-wider text-[11px]">
                {post.category}
              </span>
              <span className="w-1 h-1 rounded-full bg-neutral-300" aria-hidden="true" />
              <span>{post.readTime}</span>
              <span className="w-1 h-1 rounded-full bg-neutral-300" aria-hidden="true" />
              <time dateTime={post.date}>{post.date}</time>
            </div>

            {/* Editorial Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-neutral-900 leading-[1.12]">
              {post.title}
            </h1>

            {/* Subtitle / Standfirst */}
            <p className="text-lg sm:text-xl text-neutral-600 font-light leading-relaxed mt-6 sm:mt-8 max-w-3xl">
              {post.excerpt}
            </p>

            {/* Author & Studio Byline */}
            <div className="flex items-center gap-4 mt-8 pt-8 border-t border-neutral-200">
              <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-medium tracking-wider">
                ZXI
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 text-sm">
                <span className="font-medium text-neutral-900">
                  ZXI Architecture & Contracting Studio
                </span>
                <span className="hidden sm:inline text-neutral-300">•</span>
                <span className="text-xs text-neutral-500">Dubai, United Arab Emirates</span>
              </div>
            </div>
          </header>

          {/* Full Cinematic Hero Visual */}
          <div className="mb-16 sm:mb-20">
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-sm">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1440px) 100vw, 1440px"
                className="object-cover object-center"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-neutral-400 mt-3 px-1">
              <span>{post.title} — Architectural Case Study</span>
              <span>ZXI Interiors & Fitouts</span>
            </div>
          </div>

          {/* Editorial Article Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Sticky Overview Sidebar */}
            <aside className="lg:col-span-4 order-2 lg:order-1">
              <div className="lg:sticky lg:top-36 space-y-8">
                <div className="p-6 sm:p-8 rounded-2xl bg-neutral-50 border border-neutral-100">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-500 mb-5">
                    Overview & Scope
                  </h3>
                  <dl className="space-y-4 text-sm">
                    <div>
                      <dt className="text-xs text-neutral-400 uppercase tracking-wider">Domain</dt>
                      <dd className="font-normal text-neutral-900 mt-0.5">{post.category}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-neutral-400 uppercase tracking-wider">Region</dt>
                      <dd className="font-normal text-neutral-900 mt-0.5">Dubai & Abu Dhabi, UAE</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-neutral-400 uppercase tracking-wider">Scope</dt>
                      <dd className="font-normal text-neutral-900 mt-0.5">Design, Bespoke Joinery & Turnkey MEP</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-neutral-400 uppercase tracking-wider">Delivery Timeframe</dt>
                      <dd className="font-normal text-neutral-900 mt-0.5">Fast-track Authority Approved Execution</dd>
                    </div>
                  </dl>
                </div>

                <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900 text-white">
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3">
                    Project Feasibility
                  </p>
                  <h4 className="text-xl font-normal leading-snug mb-3">
                    Planning a fitout or architectural renovation?
                  </h4>
                  <p className="text-xs text-neutral-300 font-light leading-relaxed mb-6">
                    Our team provides comprehensive site surveys, technical feasibility assessments, and turnkey proposals.
                  </p>
                  <Action href="/contact" className="w-full justify-center">
                    Speak with an architect
                  </Action>
                </div>
              </div>
            </aside>

            {/* Main Reading Column */}
            <div className="lg:col-span-8 order-1 lg:order-2">
              <div className="max-w-2xl space-y-8 sm:space-y-10 text-neutral-700 text-base sm:text-lg font-light leading-relaxed">
                {post.content.map((paragraph, index) => (
                  <p
                    key={index}
                    className={
                      index === 0
                        ? 'text-lg sm:text-xl text-neutral-900 font-normal leading-relaxed first-letter:text-5xl first-letter:font-normal first-letter:mr-3 first-letter:float-left first-letter:leading-none first-letter:text-neutral-900'
                        : ''
                    }
                  >
                    {paragraph}
                  </p>
                ))}

                {/* Editorial Pullquote */}
                <blockquote className="my-10 pl-6 sm:pl-8 border-l-2 border-neutral-900 italic text-xl sm:text-2xl text-neutral-900 font-normal leading-snug">
                  &ldquo;Exceptional spaces are never an accident of construction; they are the consequence of meticulous alignment between spatial purpose and material honesty.&rdquo;
                </blockquote>

                {/* Technical Standards Section */}
                <div className="pt-6">
                  <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-900 mb-6">
                    Key Contracting Principles & Standards
                  </h2>
                  <p className="mb-6">
                    Delivering high-specification turnkey fitouts in the UAE requires harmonizing creative architectural intent with stringent authority compliance, structural validation, and custom in-house millwork.
                  </p>

                  <ul className="space-y-4 text-sm sm:text-base text-neutral-700 list-none pl-0">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 mt-2.5 shrink-0" />
                      <span>
                        <strong className="font-medium text-neutral-900">Integrated MEP Engineering:</strong> Seamless coordination of HVAC, acoustic baffling, and intelligent lighting control prior to drywall and ceiling closure.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 mt-2.5 shrink-0" />
                      <span>
                        <strong className="font-medium text-neutral-900">Bespoke Millwork Precision:</strong> Direct workshop manufacturing allowing millimeter-tight tolerances on stone counters, fluted timber panels, and flush reveals.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 mt-2.5 shrink-0" />
                      <span>
                        <strong className="font-medium text-neutral-900">Single-Point Authority Handover:</strong> Managing Dubai Municipality, Civil Defence, and master developer certifications to guarantee seamless handover.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Category & Journal Footer */}
              <div className="max-w-2xl mt-14 pt-8 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-500">
                <div className="flex items-center gap-2">
                  <span>Topic:</span>
                  <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 font-medium">
                    {post.category}
                  </span>
                </div>
                <Link
                  href="/blog"
                  className="hover:text-neutral-900 transition-colors inline-flex items-center gap-1 font-medium text-neutral-700"
                >
                  View all journal entries &rarr;
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Read Next Section */}
        {nextPosts.length > 0 && (
          <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 mt-28 sm:mt-36 pt-16 border-t border-neutral-200">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium mb-3">
                  Continue Reading
                </p>
                <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-900">
                  Related Perspectives
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden sm:inline-flex items-center gap-1 text-xs uppercase tracking-widest text-neutral-700 hover:text-neutral-950 font-medium transition-colors"
              >
                All articles &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
              {nextPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group flex flex-col justify-between"
                  aria-label={`Read ${relatedPost.title}`}
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-neutral-100 mb-6">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="flex items-center gap-2.5 text-xs uppercase tracking-widest text-neutral-500 font-medium mb-3">
                      <span>{relatedPost.category}</span>
                      <span className="w-1 h-1 rounded-full bg-neutral-300" aria-hidden="true" />
                      <span>{relatedPost.readTime}</span>
                    </div>

                    <h3 className="text-xl font-normal tracking-tight text-neutral-900 leading-snug group-hover:text-neutral-600 transition-colors">
                      {relatedPost.title}
                    </h3>

                    <p className="text-sm text-neutral-500 font-light leading-relaxed mt-3 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-neutral-400 mt-6 pt-4 border-t border-neutral-100">
                    <span>{relatedPost.date}</span>
                    <span className="text-neutral-800 font-normal inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read article &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer logo={logo} onNavigate={handleNavigate} />
    </>
  );
}

export default BlogDetailView;
