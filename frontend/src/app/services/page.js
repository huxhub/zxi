import { ServicesIndexView } from '@/features/services/services-index-view';

export const metadata = {
  title: 'Interior Design & Fitout Services | ZXI Dubai',
  description:
    'Comprehensive interior disciplines: commercial fitouts, residential villas, turnkey contracting, custom millwork, and hospitality spaces in the UAE.',
  alternates: { canonical: '/services' },
  openGraph: {
    url: '/services',
    title: 'Interior Design & Fitout Disciplines | ZXI Dubai',
    description:
      'Turnkey commercial, residential, joinery, and architectural services delivered with precision across Dubai and the UAE.',
  },
};

export default function ServicesPage() {
  return <ServicesIndexView logo={{ src: '/zxi-ae-logo.png', width: 220, height: 80 }} />;
}
