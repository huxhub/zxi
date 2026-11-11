import { Suspense } from 'react';
import Script from 'next/script';
import { PageBackButton } from '@/components/layout/page-back-button';
import { RouteScrollReset } from '@/components/layout/route-scroll-reset';
import { SmoothScroll } from '@/components/layout/smooth-scroll';
// import { VisitEnquiryModal } from '@/components/layout/visit-enquiry-modal';
import './globals.css';
import '../components/layout/visit-enquiry-modal.css';
import '../features/contact/contact.css';

export const metadata = {
  metadataBase: new URL('https://zxi.ae'),
  title: { default: 'Dubai Interior Design, Fit-Out & Turnkey Contractor | ZXI Interiors & Contracting', template: '%s | ZXI Interiors & Contracting' },
  description: 'ZXI Interiors & Contracting is a Dubai interior design, fit-out and turnkey contractor for commercial offices, villas, retail, hospitality and bespoke joinery projects.',
  keywords: ['Dubai interior design company', 'Dubai fit-out contractor', 'turnkey interior contractor Dubai', 'commercial office fit-out Dubai', 'villa interior design Dubai', 'restaurant fit-out Dubai', 'bespoke joinery Dubai', 'interior contractors UAE'],
  openGraph: {
    type: 'website', locale: 'en_AE', url: 'https://zxi.ae', siteName: 'ZXI Interiors & Contracting',
    title: 'Dubai Interior Design, Fit-Out & Turnkey Contractor | ZXI Interiors & Contracting',
    description: 'Interior design, fit-out, turnkey contracting and bespoke joinery for distinctive Dubai and UAE spaces.',
    images: [{ url: '/why-work-with-us.png', width: 1200, height: 630, alt: 'ZXI interior design and fitout project in Dubai' }],
  },
  twitter: { card: 'summary_large_image', title: 'Dubai Interior Design, Fit-Out & Turnkey Contractor | ZXI Interiors & Contracting', description: 'Design, fit-out, turnkey contracting and bespoke joinery across Dubai and the UAE.', images: ['/why-work-with-us.png'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
};

export default function RootLayout({ children }) {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['ProfessionalService', 'LocalBusiness'],
        '@id': 'https://zxi.ae/#organization',
        name: 'ZXI Interiors & Contracting',
        url: 'https://zxi.ae',
        logo: 'https://zxi.ae/zxi_dubailogo_black.svg',
        image: 'https://zxi.ae/why-work-with-us.png',
        telephone: '+971565499766',
        email: 'info@zxi.ae',
        priceRange: '$$$',
        address: { '@type': 'PostalAddress', streetAddress: 'Office #808, The Metropolis Tower, Business Bay', addressLocality: 'Dubai', addressRegion: 'Dubai', addressCountry: 'AE' },
        areaServed: [{ '@type': 'City', name: 'Dubai' }, { '@type': 'Country', name: 'United Arab Emirates' }],
        knowsAbout: ['Interior design', 'Interior fit-out', 'Turnkey contracting', 'Commercial office fit-out', 'Residential interiors', 'Hospitality interiors', 'Bespoke joinery'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Interior design and fit-out services',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Commercial interior fit-outs', url: 'https://zxi.ae/services/commercial-fitouts' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Residential interiors', url: 'https://zxi.ae/services/residential-interiors' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Turnkey contracting', url: 'https://zxi.ae/services/turnkey-contracting' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom furniture and bespoke millwork', url: 'https://zxi.ae/services/custom-furniture' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Hospitality and wellness interiors', url: 'https://zxi.ae/services/hospitality-wellness' } },
          ],
        },
      },
      { '@type': 'WebSite', '@id': 'https://zxi.ae/#website', url: 'https://zxi.ae', name: 'ZXI Interiors & Contracting', publisher: { '@id': 'https://zxi.ae/#organization' }, inLanguage: 'en-AE' },
    ],
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K6QCCFZ5');`}
        </Script>
        {children}
        {/* <VisitEnquiryModal /> */}
        <SmoothScroll />
        <PageBackButton />
        <Suspense fallback={null}><RouteScrollReset /></Suspense>
        {/* Zoho SalesIQ is managed and loaded directly via GTM container GTM-K6QCCFZ5 */}
        {/* <Script id="zoho-salesiq-bootstrap" strategy="afterInteractive">
          {`window.$zoho = window.$zoho || {};
            $zoho.salesiq = $zoho.salesiq || { ready: function () {} };`}
        </Script>
        <Script
          id="zsiqscript"
          src="https://salesiq.zohopublic.in/widget?wc=siq9eb33b2da3c94fa857b15ab1fd922af0489183c7e9b4ff8d4293bcf317b6b8ca"
          strategy="afterInteractive"
        /> */}

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
