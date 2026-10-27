import { notFound } from 'next/navigation';
import { PackageDetailView } from '@/features/packages/package-detail-view';
import { PackageCollectionView } from '@/features/packages/package-collection-view';
import { PACKAGES, PACKAGE_COLLECTIONS, getPackage, getPackageCollection } from '@/features/packages/packages-data';

export function generateStaticParams() { return [...PACKAGES, ...PACKAGE_COLLECTIONS].map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = getPackage(slug) || getPackageCollection(slug);
  return item ? { title: `${item.title} Package | ZXI Dubai`, description: item.intro } : {};
}

export default async function PackagePage({ params }) {
  const { slug } = await params;
  const collection = getPackageCollection(slug);
  if (collection) return <PackageCollectionView collection={collection} />;
  const item = getPackage(slug);
  if (!item) notFound();
  return <PackageDetailView item={item} />;
}
