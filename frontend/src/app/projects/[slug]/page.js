import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { projects } from '@/lib/projects';
import { orderProjects } from '@/lib/project-order';
import { ProjectShell } from '@/features/projects/project-shell';
import { ProjectDetail } from '@/features/projects/project-detail';
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: 'Project not found' };
  return {
    title: `${project.title} Interior Project`,
    description: `${project.scope} project by ZXI Interiors & Contracting in ${project.location}.`,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { url: `/projects/${project.slug}`, title: `${project.title} | ZXI Interiors & Contracting`, images: [project.image.src] },
  };
}
export default function ProjectPage({ params }) {
  return (
    <Suspense fallback={<main aria-busy="true" className="min-h-screen bg-[#ede9e1]" />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

async function ProjectContent({ params }) {
  const { slug } = await params;
  const orderedProjects = orderProjects(projects);
  const index = orderedProjects.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  return <ProjectShell logo={{ src: '/zxi_dubailogo_black.svg', width: 220, height: 80 }}><ProjectDetail project={orderedProjects[index]} next={orderedProjects[(index + 1) % orderedProjects.length]} /></ProjectShell>;
}
