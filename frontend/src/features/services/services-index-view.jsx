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

      <main className="min-h-screen bg-[#fcfcfc] text-neutral-900 pt-28 sm:pt-36 md:pt-40 pb-24 md:pb-36">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          {/* Editorial Intro */}
          <header className="max-w-3xl mb-16 md:mb-24">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium mb-4">
              Capabilities & Practice
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-neutral-900 leading-[1.1]">
              Architectural design, craftsmanship & turnkey contracting.
            </h1>
            <p className="text-base sm:text-lg text-neutral-500 font-light leading-relaxed mt-6">
              From commercial headquarters in Business Bay to private villa sanctuaries in Emirates Hills, explore our dedicated disciplines across the United Arab Emirates.
            </p>
          </header>

          {/* Minimalist Image-Rich Services Strip */}
          <div className="space-y-16 sm:space-y-24">
            {SERVICES_DATA.map((service, idx) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group block border-t border-neutral-200 pt-10 sm:pt-14 cursor-pointer"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-neutral-400 font-mono mb-4">
                        <span>0{idx + 1}</span>
                        <span className="w-1 h-1 rounded-full bg-neutral-300" aria-hidden="true" />
                        <span>{service.tagline}</span>
                      </div>

                      <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-neutral-900 group-hover:text-neutral-600 transition-colors leading-snug">
                        {service.title}
                      </h2>

                      <p className="text-sm sm:text-base text-neutral-500 font-light leading-relaxed mt-4">
                        {service.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-8 text-xs uppercase tracking-widest text-neutral-900 font-medium group-hover:translate-x-1.5 transition-transform">
                      <span>Explore discipline</span>
                      <span aria-hidden="true">&rarr;</span>
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-sm">
                      <Image
                        src={service.heroImage.src}
                        alt={service.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer logo={logo} onNavigate={handleNavigate} />
    </>
  );
}

export default ServicesIndexView;
