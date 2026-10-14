'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SiteNav } from '@/components/layout/site-nav';
import { Footer } from '@/components/layout/footer';

const details = [
  { label: 'Email', value: 'info@zxi.ae', href: 'mailto:info@zxi.ae' },
  { label: 'Phone', value: '+971 565 499 766', href: 'tel:+971565499766' },
  { label: 'Office', value: 'Office #808, The Metropolis Tower\nBusiness Bay, Dubai, UAE', href: 'https://maps.google.com/?q=The+Metropolis+Tower+Business+Bay+Dubai' },
];

export function ContactView({ logo, image }) {
  const router = useRouter();
  const [sent, setSent] = useState(false);
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
      'Hello ZXI, I would like to discuss a project.',
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Phone: ${data.get('phone') || 'Not provided'}`,
      `Project type: ${data.get('projectType')}`,
      `Details: ${data.get('message')}`,
    ].join('\n');
    window.open(`https://wa.me/971565499766?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return (
    <>
      <SiteNav logo={logo} onNavigate={navigate} />
      <main id="main" className="contact-page">
        <section className="contact-hero">
          <div className="contact-hero-image">
            <Image src={image.src} alt="Contemporary ZXI interior" fill priority sizes="100vw" />
          </div>
          <div className="contact-hero-overlay" />
          <div className="contact-hero-copy">
            <p className="contact-eyebrow">Dubai · UAE</p>
            <h1>Let&rsquo;s create a space<br />that feels like yours.</h1>
            <p>Tell us what you&rsquo;re planning. We&rsquo;ll help you take it forward.</p>
          </div>
          <a href="#inquiry" className="contact-scroll">Start an enquiry <span>↓</span></a>
        </section>

        <section id="inquiry" className="contact-inquiry">
          <div className="contact-intro">
            <p className="contact-eyebrow">Project enquiry</p>
            <h2>Begin with a<br />conversation.</h2>
            <p>Share your space, scope, and timeline. We&rsquo;ll take it from there.</p>
          </div>

          <div className="contact-form-wrap">
            {sent ? (
              <div className="contact-success" role="status">
                <span>01</span>
                <h3>Thank you.</h3>
                <p>We&rsquo;ll be in touch shortly.</p>
                <button type="button" onClick={() => setSent(false)}>Send another enquiry ↗</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={submitEnquiry}>
                <label><span>Your name</span><input name="name" type="text" autoComplete="name" required placeholder="Full name" /></label>
                <label><span>Email address</span><input name="email" type="email" autoComplete="email" required placeholder="you@company.com" /></label>
                <label><span>Phone number <em>(optional)</em></span><input name="phone" type="tel" autoComplete="tel" placeholder="+971" /></label>
                <label><span>Project type</span><select name="projectType" defaultValue=""><option value="" disabled>Select an option</option><option>Residential interiors</option><option>Commercial fitout</option><option>Hospitality / retail</option><option>Custom furniture</option><option>Turnkey contracting</option></select></label>
                <label className="contact-message"><span>Project details</span><textarea name="message" required rows="4" placeholder="Scope, location, and timeline." /></label>
                <button className="contact-submit" type="submit"><span>Send enquiry</span><span aria-hidden="true">↗</span></button>
              </form>
            )}
          </div>
        </section>

        <section className="contact-details" aria-label="Contact details">
          <p className="contact-eyebrow">Reach us directly</p>
          <div className="contact-detail-grid">
            {details.map((detail, index) => (
              <a key={detail.label} href={detail.href} target={detail.label === 'Office' ? '_blank' : undefined} rel={detail.label === 'Office' ? 'noreferrer' : undefined} className="contact-detail">
                <span>0{index + 1} — {detail.label}</span>
                <strong>{detail.value}</strong>
                <i>↗</i>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer logo={logo} onNavigate={navigate} />
    </>
  );
}

export default ContactView;
