import { Suspense } from 'react';
import { ContactView } from '@/features/contact/contact-view';
import { getPackage } from '@/features/packages/packages-data';

export const metadata = {
  title: 'Contact Interior Fitout Company in Dubai',
  description: 'Request a consultation for residential interiors, commercial fitouts, turnkey contracting, or custom furniture in Dubai.',
  alternates: { canonical: '/contact' },
  openGraph: { url: '/contact', title: 'Discuss Your Dubai Interior Project | ZXI', description: 'Request a consultation with ZXI Interiors & Contracting.' },
};

const logo = { src: '/zxi-ae-logo.png', width: 500, height: 128 };
const defaultImage = { src: '/contact/contact-hero.webp', width: 1920, height: 1080 };

async function ContactContent({ searchParams }) {
  const query = await searchParams;
  const packageParam = Array.isArray(query?.package) ? query.package[0] : query?.package;
  const selectedPackage = packageParam ? getPackage(packageParam) : null;
  const image = selectedPackage?.contactHero || defaultImage;
  return <ContactView logo={logo} image={image} selectedPackage={selectedPackage} />;
}

export default function ContactPage({ searchParams }) {
  return (
    <Suspense fallback={<ContactView logo={logo} image={defaultImage} selectedPackage={null} />}>
      <ContactContent searchParams={searchParams} />
    </Suspense>
  );
}
