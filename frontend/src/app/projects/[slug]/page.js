import { notFound } from 'next/navigation';
import { projects, projectImage } from '@/lib/projects';
import { ProjectShell } from '@/features/projects/project-shell';
import { ProjectDetail } from '@/features/projects/project-detail';
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: 'Project not found' };
  return {
    title: `${project.title} Interior Project`,
    description: `${project.scope} project by ZXI Interiors in ${project.location}.`,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { url: `/projects/${project.slug}`, title: `${project.title} | ZXI Interiors`, images: [project.image.src] },
  };
}
export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  return <ProjectShell logo={{ src: '/zxi-ae-logo.png', width: 220, height: 80 }}><ProjectDetail project={projects[index]} next={projects[(index + 1) % projects.length]} /></ProjectShell>;
}
