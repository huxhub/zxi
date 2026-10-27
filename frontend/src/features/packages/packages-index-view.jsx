'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SiteNav } from '@/components/layout/site-nav';
import { Footer } from '@/components/layout/footer';
import { PACKAGES } from './packages-data';

export function PackagesIndexView() {
  return (
    <>
      <SiteNav darkAtTop logo={{ src: '/zxi-ae-logo.png' }} />
      <main className="packages-page">
        <header className="packages-intro packages-intro--compact">
          <div>
            <p className="packages-eyebrow">ZXI interiors & contracting · Dubai</p>
            <h1>Our <em>packages.</em></h1>
          </div>
          <p>Four clear starting points—each with a defined scope, transparent offer price and complete list of inclusions.</p>
        </header>
        <section className="packages-grid" aria-label="Interior and fit-out packages">
          {PACKAGES.map((item, i) => (
            <Link className={`package-card package-card--${i + 1}`} href={`/packages/${item.slug}`} key={item.slug}>
              <div className="package-image">
                <Image src={item.image} alt={`${item.title} interior package`} fill sizes="(max-width: 800px) 100vw, 50vw" />
              </div>
              <div className="package-card-shade" />
              <div className="package-card-content">
                <div className="package-card-meta"><span>0{i + 1}</span><span>{item.audience}</span></div>
                <div>
                  <h2>{item.title}</h2>
                  <span className="package-link">View package <b aria-hidden="true">↗</b></span>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </main>
      <Footer logo={{ src: '/zxi-ae-logo.png' }} />
    </>
  );
}
