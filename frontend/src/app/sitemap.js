import { projects } from '@/lib/projects';
import { BLOG_POSTS } from '@/features/blog/blog-data';
import { PACKAGES } from '@/features/packages/packages-data';

export default function sitemap() {
  const lastModified = new Date();
  const pages = ['', '/projects', '/services', '/packages', '/contact', '/blog'].map((path) => ({
    url: `https://zxi.ae${path}`, lastModified, changeFrequency: path === '' ? 'weekly' : 'monthly', priority: path === '' ? 1 : 0.8,
  }));
  const projectPages = projects.map(({ slug }) => ({ url: `https://zxi.ae/projects/${slug}`, lastModified, changeFrequency: 'monthly', priority: 0.7 }));
  const articles = BLOG_POSTS.map(({ slug }) => ({ url: `https://zxi.ae/blog/${slug}`, lastModified, changeFrequency: 'monthly', priority: 0.65 }));
  const packagePages = PACKAGES.map(({ slug }) => ({ url: `https://zxi.ae/packages/${slug}`, lastModified, changeFrequency: 'monthly', priority: 0.75 }));
  return [...pages, ...projectPages, ...packagePages, ...articles];
}
