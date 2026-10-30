'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const STANDARDS = [
  {
    tag: 'PROVEN LEGACY',
    title: '500+ PROJECTS DELIVERED',
    description:
      'More than 500 spaces delivered across the UAE and India.',
    image: '/about/projects-500-milestone.webp',
    stats: [
      { num: '500+', label: 'Completed projects' },
      { num: '12+', label: 'Years of excellence' },
      { num: 'UAE', label: 'Interiors & contracting' },
      { num: 'Dubai & Kochi', label: 'Design studios' },
    ],
  },
  {
    tag: 'THE ZXI STANDARD',
    title: 'SAFETY & ENGINEERING',
    description:
      'Structural integrity, disciplined engineering, and safety in every detail.',
    image: '/about/safety-engineering.webp',
  },
  {
    tag: 'BESPOKE LIVING',
    title: 'DESIGN PHILOSOPHY',
    description:
      'Timeless, welcoming interiors tailored to each client.',
    image: '/about/design-philosophy.webp',
  },
  {
    tag: 'UNCOMPROMISING SELECTION',
    title: 'TOP GRADE MATERIALS',
    description:
      'Lasting materials selected for quality, texture, and character.',
    image: '/about/top-grade-materials.webp',
  },
];

export function AboutStats({ intro, lenisRef }) {
  const containerRef = useRef(null);
  const slideRefs = useRef([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [inSection, setInSection] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Toggle visibility of indicator dots only when within this section
      ScrollTrigger.create({
        trigger: container,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setInSection(true),
        onLeave: () => setInSection(false),
        onEnterBack: () => setInSection(true),
        onLeaveBack: () => setInSection(false),
      });

      // Track active slide based on scroll position of each stacking card
      slideRefs.current.forEach((slide, index) => {
        if (!slide) return;

        ScrollTrigger.create({
          trigger: slide,
          start: 'top 55%',
          end: 'bottom 55%',
          onEnter: () => setActiveSlide(index),
          onEnterBack: () => setActiveSlide(index),
        });

        // Subtle scale and darkening of previous slide when next slide overlaps
        if (index < STANDARDS.length - 1) {
          const nextSlide = slideRefs.current[index + 1];
          if (nextSlide) {
            gsap.to(slide.querySelector('.slide-inner'), {
              scale: 0.95,
              opacity: 0.4,
              ease: 'none',
              scrollTrigger: {
                trigger: nextSlide,
                start: 'top bottom',
                end: 'top top',
                scrub: true,
              },
            });
          }
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const scrollToSlide = (index) => {
    setActiveSlide(index);
    const target = slideRefs.current[index];
    if (!target) return;

    if (lenisRef?.current) {
      lenisRef.current.scrollTo(target, { duration: 1.2, offset: 0 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" ref={containerRef} className="relative w-full bg-neutral-950">
      {/* Full Size Stacking Overlapping Cards Container */}
      <div className="relative w-full">
        {STANDARDS.map((item, index) => (
          <div
            key={item.title}
            ref={(el) => (slideRefs.current[index] = el)}
            className="sticky top-0 w-full h-screen min-h-[620px] overflow-hidden"
            style={{ zIndex: 10 + index }}
          >
            <div className="slide-inner relative w-full h-full will-change-transform flex items-center justify-center">
              {/* Background Full-Size Image */}
              <div className="absolute inset-0 bg-neutral-950">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Cinematic Vignette / Overlay matching Joyalukkas reference */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.55)_50%,rgba(0,0,0,0.85)_100%)]"
              />

              {/* Centered Content */}
              <div className="relative z-10 max-w-4xl px-6 text-center text-white flex flex-col items-center">
                <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#e8c887] font-medium mb-3">
                  {item.tag}
                </p>
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal tracking-[0.1em] uppercase text-white leading-tight drop-shadow-md">
                  {item.title}
                </h3>
                <p className="mt-5 max-w-xl text-sm sm:text-base md:text-lg text-white/90 leading-relaxed font-light drop-shadow">
                  {item.description}
                </p>

                {/* Embedded Stats Bar on Slide 4 */}
                {item.stats && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mt-10 pt-8 border-t border-white/20 w-full max-w-4xl">
                    {item.stats.map((stat) => (
                      <div key={stat.label} className="text-center min-w-[168px] lg:min-w-[216px]">
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-white tabular-nums">
                          {stat.num}
                        </div>
                        <p className="text-xs text-white/70 mt-1 uppercase tracking-wider font-light">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Right Floating Pagination Indicator Dots matching Joyalukkas */}
        <div
          className={`fixed right-6 sm:right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3.5 pointer-events-auto transition-all duration-400 ${
            inSection
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-4 pointer-events-none'
          }`}
        >
          {STANDARDS.map((_, i) => {
            const isActive = activeSlide === i;
            return (
              <button
                key={i}
                onClick={() => scrollToSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? 'w-2.5 h-2.5 bg-white ring-4 ring-white/30 scale-125'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/80'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AboutStats;
