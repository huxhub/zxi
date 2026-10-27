'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SiteNav } from '@/components/layout/site-nav';
import { Footer } from '@/components/layout/footer';
import { getPackage } from './packages-data';

export function PackageCollectionView({ collection }) {
  return (
    <>
      <SiteNav logo={{ src: '/zxi-ae-logo.png' }} />
      <main className="package-collection">
        <header className="package-collection-hero">
          <Image src={collection.image} alt="" fill priority sizes="100vw" />
          <div className="package-collection-shade" />
          <div className="package-collection-copy" style={{ width: 'min(1200px, 100%)' }}>
            <p className="packages-eyebrow">Residential collection</p>
            <h1 style={{ width: 'max-content', maxWidth: '100%' }}>
              <span className="inline-block">{collection.title}</span><em> packages.</em>
            </h1>
            <p>{collection.intro}</p>
          </div>
        </header>

        <section className="package-tier-list" aria-label={`${collection.title} package tiers`}>
          <p className="packages-eyebrow">Choose your level</p>
          {collection.tiers.map((tier) => {
            const item = getPackage(tier.slug);

            return (
              <Link href={`/packages/${tier.slug}`} className="package-tier" key={tier.slug}>
                <span className="package-tier-index">{tier.label}</span>
                <div>
                  <h2>{tier.title}</h2>
                  <p>{tier.description}</p>
                </div>
                <span className="package-tier-price">{item.price}</span>
                <span className="package-tier-arrow" aria-hidden="true">→</span>
              </Link>
            );
          })}
        </section>
      </main>
      <Footer logo={{ src: '/zxi-ae-logo.png' }} />
    </>
  );
}
