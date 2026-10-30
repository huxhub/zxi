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
            <Link href={`/contact?package=${item.slug}#inquiry`} className="package-cta">Discuss this package <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="package-detail-image"><Image src={item.image} alt={`${item.title} package`} fill priority sizes="(max-width: 900px) 100vw, 50vw" /></div>
        </section>
        <section className="package-journey" aria-labelledby="package-journey-title">
          <div className="package-journey-intro">
            <p className="packages-eyebrow">A considered beginning</p>
            <h2 id="package-journey-title">From package<br />to <em>your space.</em></h2>
            <p>Every project starts with clarity. We use this package as a foundation, then refine it around your property, priorities, and way of living.</p>
          </div>
          <ol className="package-journey-steps">
            <li>
              <span>01</span>
              <div><h3>Select your package</h3><p>Choose the scope that most closely matches your project and ambition.</p></div>
            </li>
            <li>
              <span>02</span>
              <div><h3>Share your space</h3><p>Tell us the location, scale, timeline, and details that matter to you.</p></div>
            </li>
            <li>
              <span>03</span>
              <div><h3>Receive a tailored proposal</h3><p>Our team reviews the brief and shapes the package into a precise project plan.</p></div>
            </li>
          </ol>
        </section>
        <section className="package-closing" aria-label="Start your package consultation">
          <p className="packages-eyebrow">Your project, considered</p>
          <div className="package-closing-row">
            <h2>Ready to make<br />the first move?</h2>
            <Link href={`/contact?package=${item.slug}#inquiry`} className="package-closing-link">
              <span>Discuss {item.title}</span><b aria-hidden="true">↗</b>
            </Link>
          </div>
        </section>
      </main>
      <Footer logo={{ src: '/zxi-ae-logo.png' }} />
    </>
  );
}
