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

export function ServiceDetailView({ service, nextService, logo }) {
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

  if (!service) return null;

  return (
    <>
      <SiteNav logo={logo} onNavigate={handleNavigate} />

      <main className="min-h-screen bg-[#fcfcfc] text-neutral-900 pt-28 sm:pt-32 md:pt-36 pb-24 md:pb-36">
        <article className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          {/* Header Section */}
          <header className="max-w-4xl mb-12 sm:mb-16">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium mb-5">
              <span className="px-3.5 py-1.5 rounded-full bg-neutral-900 text-white tracking-widest text-[11px]">
                Expertise
              </span>
              <span className="w-1 h-1 rounded-full bg-neutral-300" aria-hidden="true" />
              <span>ZXI Practice</span>
              <span className="w-1 h-1 rounded-full bg-neutral-300" aria-hidden="true" />
              <span>Dubai & Abu Dhabi</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-neutral-900 leading-[1.08]">
              {service.title}
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-neutral-600 font-light leading-relaxed mt-6 sm:mt-8 max-w-3xl">
              {service.subtitle}
            </p>

            {/* Key Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mt-10 pt-8 border-t border-neutral-200">
              {service.metrics.map((metric) => (
                <div key={metric.label}>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-neutral-900">
                    {metric.num}
                  </div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider font-light mt-1">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </header>

          {/* Hero Cinematic Visual */}
          <div className="mb-20 sm:mb-28">
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-sm">
              <Image
                src={service.heroImage.src}
                alt={service.heroImage.alt}
                fill
                priority
                sizes="(max-width: 1500px) 100vw, 1500px"
                className="object-cover object-center"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-neutral-400 mt-3 px-1">
              <span>{service.heroImage.alt}</span>
              <span>{service.tagline}</span>
            </div>
          </div>

          {/* Narrative Overview & Consultation Column */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24 sm:mb-32">
            <div className="lg:col-span-8 space-y-6 sm:space-y-8 text-neutral-700 text-base sm:text-lg font-light leading-relaxed">
              <h2 className="text-xs uppercase tracking-[0.2em] font-medium text-neutral-400 mb-2">
                The Philosophy
              </h2>
              {service.overview.map((paragraph, index) => (
                <p
                  key={index}
                  className={
                    index === 0
                      ? 'text-xl sm:text-2xl text-neutral-900 font-normal leading-relaxed'
                      : ''
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-36 space-y-6">
                <div className="p-8 rounded-2xl bg-neutral-900 text-white">
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-3">
                    Consultation & Estimation
                  </p>
                  <h3 className="text-2xl font-normal leading-snug mb-3">
                    Commission this practice for your space.
                  </h3>
                  <p className="text-xs text-neutral-300 font-light leading-relaxed mb-6">
                    Our senior architectural engineering team provides feasibility studies, BOQ estimates, and site walkthroughs in Dubai.
                  </p>
                  <Action href="/contact" className="w-full justify-center">
                    Discuss your project
                  </Action>
                </div>

                <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100 text-xs text-neutral-600 leading-relaxed">
                  <p className="font-medium text-neutral-900 mb-1">Direct Assistance</p>
                  <p>Speak directly with our technical fitout director at <a href="tel:+971565499766" className="text-neutral-900 underline underline-offset-2">+971 565 499 766</a> or email <a href="mailto:info@zxi.ae" className="text-neutral-900 underline underline-offset-2">info@zxi.ae</a>.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Core Capabilities */}
          <section className="mb-24 sm:mb-32 pt-12 border-t border-neutral-200">
            <div className="max-w-xl mb-12 sm:mb-16">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium mb-3">
                Scope & Specializations
              </p>
              <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-neutral-900">
                Tailored capabilities under one roof.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
              {service.capabilities.map((cap, idx) => (
                <div
                  key={cap.title}
                  className="p-8 sm:p-10 rounded-2xl bg-neutral-50 border border-neutral-100 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-mono text-neutral-400 mb-4 block">
                      0{idx + 1}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-neutral-900 mb-3">
                      {cap.title}
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Image-Rich Visual Gallery */}
          <section className="mb-24 sm:mb-32 pt-12 border-t border-neutral-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium mb-3">
                  Visual Architecture
                </p>
                <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-neutral-900">
                  Executed Details & Spaces
                </h2>
              </div>
              <p className="text-xs text-neutral-400 uppercase tracking-widest">
                Realized Works Across UAE
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
              {service.gallery.map((item, idx) => (
                <figure key={item.src} className="flex flex-col">
                  <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-sm">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-center transition-transform duration-700 ease-out hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="mt-4 flex items-start justify-between gap-4 text-xs text-neutral-500 font-light">
                    <span>{item.caption}</span>
                    <span className="text-neutral-400 shrink-0 font-mono">
                      [0{idx + 1}]
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          {/* Technical Specifications Table */}
          <section className="mb-24 sm:mb-32 pt-12 border-t border-neutral-200">
            <div className="max-w-xl mb-12">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium mb-3">
                Standards & Parameters
              </p>
              <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-neutral-900">
                Technical Specifications
              </h2>
            </div>

            <div className="rounded-2xl border border-neutral-200 overflow-hidden bg-white">
              <dl className="divide-y divide-neutral-200">
                {service.specifications.map((spec) => (
                  <div
                    key={spec.label}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 p-6 sm:p-8"
                  >
                    <dt className="sm:col-span-4 text-xs uppercase tracking-wider font-medium text-neutral-500">
                      {spec.label}
                    </dt>
                    <dd className="sm:col-span-8 text-sm sm:text-base text-neutral-900 font-light">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* 4-Step Execution Workflow */}
          <section className="mb-24 sm:mb-32 pt-12 border-t border-neutral-200">
            <div className="max-w-xl mb-14">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium mb-3">
                Methodology
              </p>
              <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-neutral-900">
                The Turnkey Delivery Path
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.workflow.map((item) => (
                <div key={item.step} className="flex flex-col">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest pb-4 mb-4 border-b border-neutral-200">
                    Phase {item.step}
                  </span>
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Next Service Teaser Footer */}
          {nextService && (
            <section className="pt-16 border-t border-neutral-200 mb-20">
              <Link
                href={`/services/${nextService.slug}`}
                className="group block p-8 sm:p-14 rounded-2xl bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium block mb-2">
                      Next Capability
                    </span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-neutral-900">
                      {nextService.title}
                    </h3>
                    <p className="text-sm text-neutral-500 font-light mt-2 max-w-xl">
                      {nextService.subtitle}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-900 font-medium group-hover:translate-x-2 transition-transform">
                    Explore &rarr;
                  </span>
                </div>
              </Link>
            </section>
          )}
        </article>
      </main>

      <Footer logo={logo} onNavigate={handleNavigate} />
    </>
  );
}

export default ServiceDetailView;
