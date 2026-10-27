'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SiteNav } from '@/components/layout/site-nav';
import { Footer } from '@/components/layout/footer';

export function PackageDetailView({ item }) {
  return (
    <>
      <SiteNav darkAtTop logo={{ src: '/zxi-ae-logo.png' }} />
      <main className="package-detail">
        <section className="package-detail-hero">
          <div className="package-detail-copy">
            <Link href="/packages" className="package-back" aria-label="Back to all packages" title="Back to all packages">
              <span aria-hidden="true">←</span>
            </Link>
            <h1>{item.title}</h1>
            <p className="package-detail-intro">{item.intro}</p>
            <div className="package-price"><span>Special offer</span><strong>{item.price}</strong><del>{item.regular}</del></div>
            <Link href="/contact" className="package-cta">Discuss this package <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="package-detail-image"><Image src={item.image} alt={`${item.title} package`} fill priority sizes="(max-width: 900px) 100vw, 50vw" /></div>
        </section>
        <section className="package-scope">
          <div className="scope-heading">
            <p className="packages-eyebrow">What is included</p>
            <h2>Every line, <em>clear.</em></h2>
            <p>Every inclusion is presented below exactly by area, with quantities, brands and technical specifications retained from the package.</p>
          </div>
          <div className="scope-list">
            {item.sections.map((section, i) => (
              <article className="scope-section" key={section.title}>
                <div className="scope-number">{String(i + 1).padStart(2, '0')}</div>
                <div className="scope-title"><h3>{section.title}</h3><span>{section.items.length} {section.items.length === 1 ? 'item' : 'items'}</span></div>
                <ol>{section.items.map((entry, itemIndex) => <li key={entry}><span>{String(itemIndex + 1).padStart(2, '0')}</span><p>{entry}</p></li>)}</ol>
              </article>
            ))}
          </div>
          <p className="package-note">{item.note || '*Offer is subject to the agreed project scope and applicable terms.'}</p>
        </section>
      </main>
      <Footer logo={{ src: '/zxi-ae-logo.png' }} />
    </>
  );
}
