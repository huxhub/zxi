import { BlogView } from '@/features/blog/blog-view';

export const metadata = {
  title: 'Dubai Interior Design & Fitout Insights',
  description: 'Practical insights on interior design, commercial and residential fitouts, materials, and turnkey contracting in Dubai.',
  alternates: { canonical: '/blog' },
  openGraph: { url: '/blog', title: 'Dubai Interior Design & Fitout Insights | ZXI' },
};

export default function BlogPage() {
  return <BlogView logo={{ src: '/zxi-ae-logo.png', width: 220, height: 80 }} />;
}
