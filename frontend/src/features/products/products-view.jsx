'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { SiteNav } from '@/components/layout/site-nav';
import { Footer } from '@/components/layout/footer';
import categories from './products-data.json';
import './products.css';

export function ProductsView() {
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
    if (!viewer.open) viewer.showModal();
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
    setIndex((current) => (current + direction + category.items.length) % category.items.length);
  };

  return (
    <>
      <SiteNav darkAtTop logo={{ src: '/zxi-ae-logo.png' }} />
      <main className="products-page">
        <header className="products-intro">
          <div className="products-intro__body">
            <h1>Objects for<br /><em>living.</em></h1>
            <p>A collection of furniture shaped by material, proportion and the way we live. Explore each family of pieces.</p>
          </div>
        </header>

        <section className="products-collection" aria-label="Furniture categories">
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
                  src={entry.items[0].image}
                  alt={entry.items[0].title}
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
        </section>
      </main>
      <Footer logo={{ src: '/zxi-ae-logo.png' }} />

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
    </>
  );
}
