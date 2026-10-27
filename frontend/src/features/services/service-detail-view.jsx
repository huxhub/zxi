'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SiteNav } from '@/components/layout/site-nav';
import { Footer } from '@/components/layout/footer';

export function ServiceDetailView({ service, nextService, logo }) {
  const router = useRouter();

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

      <main className="min-h-screen bg-[#f6f5f1] text-neutral-900 pb-10 sm:pb-16">
        <article>
          <header className="relative min-h-[680px] h-[88svh] overflow-hidden bg-neutral-950 text-white">
            <Image
              src={service.heroImage.src}
              alt={service.heroImage.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.72)_0%,rgba(0,0,0,.22)_62%,rgba(0,0,0,.08)_100%)]" />
            <div className="relative z-10 flex h-full max-w-[1600px] mx-auto items-end px-6 pb-12 sm:px-10 sm:pb-16 lg:px-16 lg:pb-20">
              <div className="max-w-3xl">
                <p className="mb-5 text-[10px] uppercase tracking-[.28em] text-white/70">{service.tagline}</p>
                <h1 className="text-[clamp(45px,7vw,104px)] font-normal tracking-[-.06em] leading-[.9]">{service.title}</h1>
                <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">{service.subtitle}</p>
              </div>
            </div>
          </header>

          <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
            <section className="grid grid-cols-1 gap-10 py-16 sm:py-24 lg:grid-cols-12 lg:gap-16">
              <p className="lg:col-span-3 text-[10px] uppercase tracking-[.24em] text-neutral-500">The approach</p>
              <p className="lg:col-span-7 text-2xl leading-[1.25] tracking-[-.035em] text-neutral-900 sm:text-3xl lg:text-4xl">{service.overview[0]}</p>
            </section>

            <section className="border-t border-neutral-300 py-12 sm:py-16" aria-labelledby="scope-heading">
              <div className="mb-10 flex items-end justify-between gap-4 sm:mb-14">
                <h2 id="scope-heading" className="text-[10px] uppercase tracking-[.24em] text-neutral-500">Service scope</h2>
                <span className="text-xs text-neutral-400">0{service.capabilities.length} areas</span>
              </div>
              <div className="grid grid-cols-1 divide-y divide-neutral-300 border-y border-neutral-300 md:grid-cols-2 md:divide-x md:divide-y-0">
                {service.capabilities.map((cap, index) => (
                  <div key={cap.title} className="flex min-h-32 items-start gap-5 p-5 first:pt-5 md:p-7">
                    <span className="pt-1 text-[10px] tracking-widest text-neutral-400">0{index + 1}</span>
                    <h3 className="max-w-sm text-xl leading-tight tracking-[-.035em] text-neutral-900 sm:text-2xl">{cap.title}</h3>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid grid-cols-1 gap-3 pb-14 sm:grid-cols-5 sm:pb-20" aria-label="Selected service work">
              {service.gallery.slice(0, 2).map((item, index) => (
                <figure key={item.src} className={`relative overflow-hidden bg-neutral-200 ${index === 0 ? 'aspect-[4/3] sm:col-span-3' : 'aspect-[4/3] sm:col-span-2 sm:mt-20'}`}>
                  <Image src={item.src} alt={item.alt} fill sizes="(max-width: 640px) 100vw, 60vw" className="object-cover" />
                </figure>
              ))}
            </section>

            <section className="mb-10 flex flex-col gap-8 bg-neutral-900 px-6 py-10 text-white sm:mb-16 sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:py-14">
              <div>
                <p className="text-[10px] uppercase tracking-[.24em] text-white/55">Start a conversation</p>
                <h2 className="mt-4 max-w-lg text-3xl tracking-[-.045em] sm:text-4xl">Tell us what you are planning.</h2>
              </div>
              <Link href="/contact" className="inline-flex w-fit items-center gap-8 border-b border-white pb-2 text-xs uppercase tracking-[.18em] transition-opacity hover:opacity-60">Contact ZXI <span aria-hidden="true">↗</span></Link>
            </section>

            {nextService && (
              <Link href={`/services/${nextService.slug}`} className="group flex items-center justify-between gap-5 border-t border-neutral-300 py-8 text-neutral-900 sm:py-10">
                <span className="text-[10px] uppercase tracking-[.2em] text-neutral-500">Next service</span>
                <span className="text-right text-xl tracking-[-.035em] transition-transform group-hover:-translate-x-1 sm:text-2xl">{nextService.title} <span aria-hidden="true">↗</span></span>
              </Link>
            )}
          </div>
        </article>
      </main>

      <Footer logo={logo} onNavigate={handleNavigate} />
    </>
  );
}

export default ServiceDetailView;
