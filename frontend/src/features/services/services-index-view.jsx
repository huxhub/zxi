'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { SiteNav } from '@/components/layout/site-nav';
import { Footer } from '@/components/layout/footer';
import { SERVICES_DATA } from './services-data';

export function ServicesIndexView({ logo }) {
  const router = useRouter();

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
        : id === 'services'
        ? '/services'
        : id === 'home'
        ? '/'
        : id === 'contact'
        ? '/contact'
        : `/#${id}`
    );
  };

  return (
    <>
      <SiteNav logo={logo} onNavigate={handleNavigate} />

      <main className="min-h-screen bg-[#f6f5f1] text-neutral-900 pt-28 sm:pt-36 md:pt-40 pb-12 sm:pb-16">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
          <header className="max-w-3xl px-2 sm:px-4 mb-14 sm:mb-20">
            <p className="text-[10px] uppercase tracking-[0.26em] text-neutral-500 mb-4">
              ZXI interiors & contracting
            </p>
            <h1 className="text-[clamp(42px,6vw,88px)] font-normal tracking-[-0.055em] leading-[.96] text-neutral-900">
              Spaces made to work beautifully.
            </h1>
            <p className="max-w-lg mt-6 text-sm sm:text-base leading-relaxed text-neutral-500">
              Design, fitout and craftsmanship for considered spaces across the UAE.
            </p>
          </header>

          <section aria-label="ZXI services" className="grid grid-cols-1 md:grid-cols-2 gap-px overflow-hidden rounded-sm bg-neutral-300 border border-neutral-300">
            {SERVICES_DATA.map((service, idx) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={`group relative min-h-[420px] sm:min-h-[500px] overflow-hidden bg-neutral-900 ${idx === SERVICES_DATA.length - 1 && SERVICES_DATA.length % 2 === 1 ? 'md:col-span-2' : ''}`}
              >
                <Image
                  src={service.heroImage.src}
                  alt={service.title}
                  fill
                  sizes={idx === SERVICES_DATA.length - 1 && SERVICES_DATA.length % 2 === 1 ? '100vw' : '(max-width: 767px) 100vw, 50vw'}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/5 transition-colors duration-500 group-hover:from-black/85 group-hover:via-black/25" />

                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-7 text-[10px] uppercase tracking-[0.22em] text-white/75">
                  <span>0{idx + 1}</span>
                  <span className="h-px w-8 bg-white/50 transition-all duration-500 group-hover:w-14" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 text-white">
                  <h2 className="max-w-md text-3xl sm:text-4xl lg:text-[42px] font-normal tracking-[-0.045em] leading-[.98]">
                    {service.title}
                  </h2>
                  <div className="mt-5 flex items-center justify-between border-t border-white/30 pt-3 text-[10px] uppercase tracking-[0.2em] text-white/80">
                    <span>Explore service</span>
                    <span className="text-base leading-none transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">↗</span>
                  </div>
                </div>
              </Link>
            ))}
          </section>

          <section className="flex flex-col gap-5 px-2 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-16">
            <p className="text-sm text-neutral-500">Have a project in mind?</p>
            <Link
              href="/contact"
              className="inline-flex w-fit items-center gap-8 border-b border-neutral-900 pb-2 text-xs uppercase tracking-[0.18em] text-neutral-900 transition-opacity hover:opacity-55"
            >
              Talk to ZXI <span aria-hidden="true">↗</span>
            </Link>
          </section>
        </div>
      </main>

      <Footer logo={logo} onNavigate={handleNavigate} />
    </>
  );
}

export default ServicesIndexView;
