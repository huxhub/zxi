import { portfolioProjects } from '@/lib/projects';
import { orderProjects } from '@/lib/project-order';
import { ProjectArchive } from '@/features/projects/project-archive';
import { ProjectShell } from '@/features/projects/project-shell';

export const metadata = { title: 'Interior Design & Fitout Projects', description: 'Explore ZXI Interiors & Contracting residential, retail, commercial, and hospitality interior projects across Dubai and the UAE.', alternates: { canonical: '/projects' }, openGraph: { url: '/projects', title: 'Dubai Interior Design & Fitout Projects | ZXI Interiors & Contracting' } };
export default function ProjectsPage() {
  const projects = orderProjects(portfolioProjects);
  return <ProjectShell darkAtTop logo={{ src: '/zxi_dubailogo_black.svg', width: 220, height: 80 }}><ProjectArchive projects={projects} standalone /></ProjectShell>;
}
