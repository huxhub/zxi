'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SiteNav } from '@/components/layout/site-nav';
import { Footer } from '@/components/layout/footer';

const details = [
  { label: 'Email', value: 'info@zxi.ae', href: 'mailto:info@zxi.ae' },
  { label: 'Phone', value: '+971 565 499 766', href: 'tel:+971565499766' },
  { label: 'Office', value: 'Office #808, The Metropolis Tower\nBusiness Bay, Dubai, UAE', href: 'https://maps.google.com/?q=The+Metropolis+Tower+Business+Bay+Dubai' },
];

export function ContactView({ logo, image, selectedPackage }) {
  const router = useRouter();
  const [sent, setSent] = useState(false);
  const inclusionCount = selectedPackage?.sections.reduce((total, section) => total + section.items.length, 0) || 0;

  const navigate = (id) => {
    if (id === 'home') router.push('/');
    else if (id === 'portfolio') router.push('/projects');
    else if (id === 'contact') router.push('/contact');
    else router.push(`/#${id}`);
  };

  const submitEnquiry = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      selectedPackage ? `Hello ZXI, I would like to discuss the ${selectedPackage.title} package (${selectedPackage.price}).` : 'Hello ZXI, I would like to discuss a project.',
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Phone: ${data.get('phone') || 'Not provided'}`,
      `Project type: ${data.get('projectType')}`,
      `Details: ${data.get('message')}`,
    ].join('\n');
    window.open(`https://wa.me/971565499766?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return <>
    <SiteNav logo={logo} onNavigate={navigate} />
    <main id="main" className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-image"><Image src={image.src} alt="Contemporary ZXI interior" fill priority sizes="100vw" /></div>
        <div className="contact-hero-overlay" />
        <div className="contact-hero-copy"><p className="contact-eyebrow">Dubai · UAE</p><h1>Let&rsquo;s create a space<br />that feels like yours.</h1><p>Tell us what you&rsquo;re planning. We&rsquo;ll help you take it forward.</p></div>
        <a href="#inquiry" className="contact-scroll">Start an enquiry <span>↓</span></a>
      </section>

      <section id="inquiry" className="contact-inquiry">
        <div className="contact-package-wrap">
          {selectedPackage ? <div className="contact-package-summary">
            <div className="contact-package-summary-head"><p className="contact-eyebrow">{selectedPackage.title} inclusions</p><span>{String(inclusionCount).padStart(2, '0')} items</span></div>
            <div className="contact-package-sections">{selectedPackage.sections.map((section, sectionIndex) => <article className="contact-package-section" key={section.title}><header><span>{String(sectionIndex + 1).padStart(2, '0')}</span><h3>{section.title}</h3></header><ol>{section.items.map((item, itemIndex) => <li key={item}><span>{String(itemIndex + 1).padStart(2, '0')}</span><p>{item}</p></li>)}</ol></article>)}</div>
          </div> : <div className="contact-package-empty"><h3>Select the right starting point.</h3><p>Choose a package to review its complete scope here, or send a general project enquiry.</p><Link href="/packages">Explore all packages <span aria-hidden="true">↗</span></Link></div>}
          <div className="contact-direct-list">
            <p className="contact-eyebrow">Reach us directly</p>
            <ul>
              {details.map((detail) => (
                <li key={detail.label}>
                  <a href={detail.href} target={detail.label === 'Office' ? '_blank' : undefined} rel={detail.label === 'Office' ? 'noreferrer' : undefined}>
                    <span>{detail.label}</span>
                    <strong>{detail.value}</strong>
                    <i aria-hidden="true">↗</i>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="contact-form-wrap">
          <div className="contact-form-heading"><p className="contact-eyebrow">Project enquiry</p><h2>{selectedPackage ? 'Discuss this package.' : 'Begin with a conversation.'}</h2><p>{selectedPackage ? `Tell us about your space and we’ll tailor the ${selectedPackage.title} package to your requirements.` : 'Share your space, scope, and timeline. We’ll take it from there.'}</p></div>
          {sent ? <div className="contact-success" role="status"><span>01</span><h3>Thank you.</h3><p>We&rsquo;ll be in touch shortly.</p><button type="button" onClick={() => setSent(false)}>Send another enquiry ↗</button></div> : <form className="contact-form" onSubmit={submitEnquiry}>
            <label><span>Your name</span><input name="name" type="text" autoComplete="name" required placeholder="Full name" /></label>
            <label><span>Email address</span><input name="email" type="email" autoComplete="email" required placeholder="you@company.com" /></label>
            <label><span>Phone number <em>(optional)</em></span><input name="phone" type="tel" autoComplete="tel" placeholder="+971" /></label>
            <label><span>Project type</span><select name="projectType" defaultValue={selectedPackage?.title || ''} required><option value="" disabled>Select an option</option>{selectedPackage && <option value={selectedPackage.title}>{selectedPackage.title}</option>}<option>Residential interiors</option><option>Commercial fitout</option><option>Hospitality / retail</option><option>Custom furniture</option><option>Turnkey contracting</option></select></label>
            <label className="contact-message"><span>Project details</span><textarea name="message" required rows="4" placeholder="Scope, location, and timeline." /></label>
            <button className="contact-submit" type="submit"><span>Send enquiry</span><span aria-hidden="true">↗</span></button>
          </form>}
        </div>
      </section>

      <section id="location" className="contact-details" aria-label="Contact details and office location">
        <div className="contact-details-inner">
          <div className="contact-map">
            <iframe
              title="ZXI Interiors office at The Metropolis Tower, Business Bay"
              src="https://www.google.com/maps?q=The%20Metropolis%20Tower%2C%20Business%20Bay%2C%20Dubai&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a href="https://maps.google.com/?q=The+Metropolis+Tower+Business+Bay+Dubai" target="_blank" rel="noreferrer" className="contact-map-link">
              Open in Google Maps <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </main>
    <Footer logo={logo} onNavigate={navigate} />
  </>;
}

export default ContactView;
