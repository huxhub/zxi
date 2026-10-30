'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SiteNav } from '@/components/layout/site-nav';
import { Footer } from '@/components/layout/footer';
import categories from '@/features/products/products-data.json';
import '@/features/products/products.css';

export function ServiceDetailView({ service, nextService, logo }) {
  const router = useRouter();

  const dialog = useRef(null);
  const [selected, setSelected] = useState(null);
  const [index, setIndex] = useState(0);
  const category = selected === null ? null : categories[selected];
  const item = category?.items[index];

  useEffect(() => {
    const viewer = dialog.current;
    if (selected === null) {
      if (viewer?.open) viewer.close();
      return;
    }
    if (!viewer?.open) viewer?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  const openCategory = (categoryIndex) => {
    setIndex(0);
    setSelected(categoryIndex);
  };

  const move = (direction) => {
    if (!category) return;
    setIndex((current) => (current + direction + category.items.length) % category.items.length);
  };

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
              <div className="max-w-4xl">
                <p className="mb-4 sm:mb-5 text-[11px] sm:text-xs uppercase tracking-[.26em] text-white/75 font-medium">{service.tagline}</p>
                <h1 className="text-[32px] sm:text-[42px] lg:text-[55px] font-normal tracking-[-0.025em] leading-[1.14] text-white">{service.title}</h1>
                <p className="mt-5 sm:mt-6 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base font-light">{service.subtitle}</p>
              </div>
            </div>
          </header>

          <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
            {service.slug !== 'custom-furniture' && (
              <>
                <section className="pt-12 pb-8 sm:pt-16 sm:pb-10 lg:grid lg:grid-cols-12">
                  <div className="flex flex-col gap-4 lg:col-start-1 lg:col-span-9 sm:gap-5">
                    <p className="text-[10px] uppercase tracking-[.24em] text-neutral-500">The approach</p>
                    <p className="text-2xl font-[200] leading-[1.25] tracking-[-.035em] text-neutral-900 sm:text-3xl lg:text-[34px]">{service.overview[0]}</p>
                  </div>
                </section>

                <section className="border-t border-neutral-300 py-6 sm:py-8" aria-labelledby="scope-heading">
                  <div className="mb-5 flex items-end justify-between gap-4 sm:mb-6">
                    <h2 id="scope-heading" className="text-[10px] uppercase tracking-[.24em] text-neutral-500">Service scope</h2>
                    <span className="text-xs text-neutral-400">0{service.capabilities.length} areas</span>
                  </div>
                  <div className="grid grid-cols-1 divide-y divide-neutral-300 border-y border-neutral-300 md:grid-cols-2 md:divide-x md:divide-y-0">
                    {service.capabilities.map((cap, index) => (
                      <div key={cap.title} className="flex min-h-24 items-start gap-5 p-4 md:p-5">
                        <span className="pt-1 text-[10px] tracking-widest text-neutral-400">0{index + 1}</span>
                        <h3 className="max-w-sm text-xl leading-tight tracking-[-.035em] text-neutral-900 sm:text-2xl">{cap.title}</h3>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 pb-14 sm:pb-20" aria-label="Selected service work">
                  {service.gallery.slice(0, 2).map((item) => (
                    <figure key={item.src} className="relative overflow-hidden bg-neutral-200 aspect-[4/3]">
                      <Image src={item.src} alt={item.alt} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
                    </figure>
                  ))}
                </section>
              </>
            )}

            {service.slug === 'custom-furniture' && (
              <section className="pb-16 sm:pb-24 border-t border-neutral-300 pt-12 sm:pt-16" aria-labelledby="furniture-collection-heading">
                <div className="mb-10 sm:mb-14 flex flex-col gap-3">
                  <p className="text-[10px] uppercase tracking-[.24em] text-neutral-500">Custom furniture</p>
                  <h2 id="furniture-collection-heading" className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[-.045em] text-neutral-900">
                    Furniture made for you.
                  </h2>
                  <p className="max-w-xl text-sm sm:text-base text-neutral-600 leading-relaxed">
                    Explore pieces designed for your space and the way you live.
                  </p>
                </div>

                <div className="products-collection !w-full !max-w-full !p-0">
                  {categories.map((entry, categoryIndex) => (
                    <button
                      className={`products-card ${categoryIndex === 0 ? 'products-card--lead' : ''}`}
                      key={entry.slug}
                      type="button"
                      onClick={() => openCategory(categoryIndex)}
                      aria-label={`Explore ${entry.title}, ${entry.items.length} pieces`}
                    >
                      <span className="products-card__media">
                        <Image
                          src={entry.coverImage || entry.items[0].image}
                          alt={`${entry.title} furniture collection`}
                          fill
                          sizes={categoryIndex === 0 ? '(max-width: 700px) 100vw, 50vw' : '(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw'}
                          priority={categoryIndex === 0}
                        />
                        <span className="products-card__reveal" aria-hidden="true">
                          <span>Featured piece</span>
                          <strong>{entry.items[0].title}</strong>
                          <span className="products-card__description">{entry.items[0].description}</span>
                          <small>Explore collection <span>↗</span></small>
                        </span>
                        <span className="products-card__open" aria-hidden="true">↗</span>
                      </span>
                      <span className="products-card__meta">
                        <span className="products-card__name"><strong>{entry.title}</strong><small>{entry.items[0].title}</small></span>
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            )}

            <section className="mb-10 flex flex-col gap-8 bg-[#E8DDCC] px-6 py-10 text-[#282722] border border-[#D4C8B9] rounded-none sm:mb-16 sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:py-14">
              <div>
                <p className="text-[10px] uppercase tracking-[.24em] text-[#5C574E] font-semibold">Start a conversation</p>
                <h2 className="mt-4 max-w-lg text-3xl tracking-[-.045em] text-[#282722] sm:text-4xl">Tell us what you are planning.</h2>
              </div>
              <Link href="/contact" className="inline-flex w-fit items-center gap-8 border-0 bg-[#F5F0E7] px-5 py-4 text-xs uppercase tracking-[.18em] text-[#282722] font-semibold transition-colors hover:bg-[#F7F3ED]">Contact ZXI <span aria-hidden="true">↗</span></Link>
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

      {service.slug === 'custom-furniture' && (
        <dialog
          ref={dialog}
          className="products-viewer"
          aria-label={category ? `${category.title} product gallery` : 'Product gallery'}
          onClose={() => setSelected(null)}
          onClick={(event) => { if (event.target === dialog.current) setSelected(null); }}
          onKeyDown={(event) => {
            if (!category) return;
            if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
            if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
          }}
        >
          {category && item && (
            <div className="products-viewer__inner">
              <div className="products-viewer__top">
                <button className="products-viewer__back" type="button" onClick={() => setSelected(null)} aria-label="Back to products" title="Back to products">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <path d="M19 12H5" />
                    <path d="m11 18-6-6 6-6" />
                  </svg>
                </button>
              </div>
              <div className="products-viewer__content">
                <div className="products-viewer__stage">
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 800px) 100vw, 60vw" priority />
                </div>
                <div className="products-viewer__details" aria-live="polite">
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                  <div className="products-viewer__controls">
                    <span>{String(index + 1).padStart(2, '0')} <span aria-hidden="true">/</span> {String(category.items.length).padStart(2, '0')}</span>
                    <div>
                      <button type="button" onClick={() => move(-1)} aria-label="Previous product">←</button>
                      <button type="button" onClick={() => move(1)} aria-label="Next product">→</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </dialog>
      )}
    </>
  );
}

export default ServiceDetailView;
