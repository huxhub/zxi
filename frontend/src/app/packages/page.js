import { PackagesIndexView } from '@/features/packages/packages-index-view';

export const metadata = {
  title: 'Interior Packages',
  description: 'Clear residential, office, F&B and interior design packages from ZXI.',
  alternates: { canonical: '/packages' },
  openGraph: {
    url: '/packages',
    title: 'Interior Packages | ZXI Interiors & Contracting',
    description: 'Clear residential, office, F&B and interior design packages from ZXI.',
  },
};

export default function PackagesPage() { return <PackagesIndexView />; }
