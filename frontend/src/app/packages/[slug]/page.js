import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { PackageDetailView } from '@/features/packages/package-detail-view';
import { PackageCollectionView } from '@/features/packages/package-collection-view';
import { PACKAGES, PACKAGE_COLLECTIONS, getPackage, getPackageCollection } from '@/features/packages/packages-data';

export function generateStaticParams() { return [...PACKAGES, ...PACKAGE_COLLECTIONS].map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = getPackage(slug) || getPackageCollection(slug);
  if (!item) return { title: 'Package Not Found' };
  return {
    title: `${item.title} Package`,
    description: item.intro,
    alternates: { canonical: `/packages/${slug}` },
    openGraph: {
      url: `/packages/${slug}`,
      title: `${item.title} Package | ZXI Interiors & Contracting`,
      description: item.intro,
      images: item.image ? [item.image] : undefined,
    },
  };
}

export default function PackagePage({ params }) {
  return (
    <Suspense fallback={<main aria-busy="true" className="min-h-screen bg-[#f3f1eb]" />}>
      <PackageContent params={params} />
    </Suspense>
  );
}

async function PackageContent({ params }) {
  const { slug } = await params;
  const collection = getPackageCollection(slug);
  if (collection) return <PackageCollectionView collection={collection} />;
  const item = getPackage(slug);
  if (!item) notFound();
  return <PackageDetailView item={item} />;
}
