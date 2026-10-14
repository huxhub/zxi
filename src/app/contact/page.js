import { ContactView } from '@/features/contact/contact-view';

export const metadata = {
  title: 'Contact Interior Fitout Company in Dubai',
  description: 'Request a consultation for residential interiors, commercial fitouts, turnkey contracting, or custom furniture in Dubai.',
  alternates: { canonical: '/contact' },
  openGraph: { url: '/contact', title: 'Discuss Your Dubai Interior Project | ZXI', description: 'Request a consultation with ZXI Interiors & Contracting.' },
};

const logo = { src: '/zxi-ae-logo.png', width: 500, height: 128 };
const image = { src: '/zxi/assets/0245-banner1-1.webp', width: 1920, height: 1080 };

export default function ContactPage() {
  return <ContactView logo={logo} image={image} />;
}
