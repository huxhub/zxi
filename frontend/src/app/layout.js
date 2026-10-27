import { Suspense } from 'react';
import { PageBackButton } from '@/components/layout/page-back-button';
import { RouteScrollReset } from '@/components/layout/route-scroll-reset';
import { SmoothScroll } from '@/components/layout/smooth-scroll';
import './globals.css';
import '../features/contact/contact.css';

export const metadata = {
  metadataBase: new URL('https://zxi.ae'),
  title: { default: 'Interior Design & Fitout Company in Dubai | ZXI', template: '%s | ZXI Interiors Dubai' },
  description: 'Dubai interior design and fitout company for residential, commercial, retail, and hospitality spaces. Design, contracting, and custom furniture.',
  keywords: ['interior design Dubai', 'fitout company Dubai', 'commercial fitout Dubai', 'residential interiors Dubai', 'turnkey contracting UAE'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website', locale: 'en_AE', url: 'https://zxi.ae', siteName: 'ZXI Interiors & Contracting',
    title: 'Interior Design & Fitout Company in Dubai | ZXI',
    description: 'Design, fitout, and turnkey contracting for distinctive spaces across Dubai and the UAE.',
    images: [{ url: '/why-work-with-us.png', width: 1200, height: 630, alt: 'ZXI interior design and fitout project in Dubai' }],
  },
  twitter: { card: 'summary_large_image', title: 'Interior Design & Fitout Company in Dubai | ZXI', description: 'Design, fitout, and turnkey contracting across Dubai and the UAE.', images: ['/why-work-with-us.png'] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  const schema = {
    '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'ZXI Interiors & Contracting',
    url: 'https://zxi.ae', logo: 'https://zxi.ae/zxi-ae-logo.png', image: 'https://zxi.ae/why-work-with-us.png',
    telephone: '+971565499766', email: 'info@zxi.ae', priceRange: '$$$',
    address: { '@type': 'PostalAddress', streetAddress: 'Office #808, The Metropolis Tower, Business Bay', addressLocality: 'Dubai', addressCountry: 'AE' },
    areaServed: ['Dubai', 'United Arab Emirates'],
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <SmoothScroll />
        <PageBackButton />
        <Suspense fallback={null}><RouteScrollReset /></Suspense>
        <a className="whatsapp-cta" href="https://wa.me/971565499766?text=Hello%20ZXI%2C%20I%27d%20like%20to%20discuss%20an%20interior%20project." target="_blank" rel="noopener noreferrer" aria-label="Chat with ZXI on WhatsApp" title="Chat with us on WhatsApp">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.45L3.5 20.5l1.38-4.22A8.5 8.5 0 1 1 20.5 11.7Z" />
            <path d="M8.2 7.5c.3-.3.8-.2 1 .2l1 2.1c.1.3.1.6-.2.8l-.8.7a7.3 7.3 0 0 0 3.6 3.6l.7-.9c.2-.2.5-.3.8-.1l2.1 1c.4.2.5.7.2 1-.6.7-1.5 1-2.4.9-3.7-.5-6.6-3.4-7.1-7.1-.1-.8.3-1.7 1.1-2.2Z" />
          </svg>
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </body>
    </html>
  );
}
