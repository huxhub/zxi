import { projects } from '@/lib/projects';
import { BLOG_POSTS } from '@/features/blog/blog-data';

export default function sitemap() {
  const lastModified = new Date();
  const pages = ['', '/projects', '/contact', '/blog'].map((path) => ({
    url: `https://zxi.ae${path}`, lastModified, changeFrequency: path === '' ? 'weekly' : 'monthly', priority: path === '' ? 1 : 0.8,
  }));
  const projectPages = projects.map(({ slug }) => ({ url: `https://zxi.ae/projects/${slug}`, lastModified, changeFrequency: 'monthly', priority: 0.7 }));
  const articles = BLOG_POSTS.map(({ slug }) => ({ url: `https://zxi.ae/blog/${slug}`, lastModified, changeFrequency: 'monthly', priority: 0.65 }));
  return [...pages, ...projectPages, ...articles];
}
