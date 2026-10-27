import { notFound } from 'next/navigation';
import { PackageDetailView } from '@/features/packages/package-detail-view';
import { PACKAGES, getPackage } from '@/features/packages/packages-data';
export function generateStaticParams() { return PACKAGES.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }) { const { slug } = await params; const item = getPackage(slug); return item ? { title: `${item.title} Package | ZXI Dubai`, description: item.intro } : {}; }
export default async function PackagePage({ params }) { const { slug } = await params; const item = getPackage(slug); if (!item) notFound(); return <PackageDetailView item={item} />; }
