import { notFound } from 'next/navigation';
import { SERVICES_DATA, SERVICE_SLUGS, getServiceBySlug } from '@/features/services/services-data';
import { ServiceDetailView } from '@/features/services/service-detail-view';

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return { title: 'Service Not Found | ZXI Interiors' };
  }
  return {
    title: `${service.title} | ZXI Interiors — Dubai`,
    description: service.subtitle,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      url: `/services/${service.slug}`,
      title: `${service.title} | ZXI Interiors Dubai`,
      description: service.subtitle,
      images: [service.heroImage.src],
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const index = SERVICES_DATA.findIndex((item) => item.slug === slug);
  if (index < 0) {
    notFound();
  }

  const service = SERVICES_DATA[index];
  const nextService = SERVICES_DATA[(index + 1) % SERVICES_DATA.length];

  return (
    <ServiceDetailView
      service={service}
      nextService={nextService}
      logo={{ src: '/zxi-ae-logo.png', width: 220, height: 80 }}
    />
  );
}
