import { portfolioProjects, projectImage } from '@/lib/projects';
import { ProjectArchive } from '@/features/projects/project-archive';
import { ProjectShell } from '@/features/projects/project-shell';
export const metadata = { title: 'Interior Design & Fitout Projects', description: 'Explore ZXI residential, retail, commercial, and hospitality interior projects across Dubai and the UAE.', alternates: { canonical: '/projects' }, openGraph: { url: '/projects', title: 'Dubai Interior Design & Fitout Projects | ZXI' } };
export default function ProjectsPage() {
  return <ProjectShell darkAtTop logo={{ src: '/zxi-ae-logo.png', width: 220, height: 80 }}><ProjectArchive projects={portfolioProjects} standalone /></ProjectShell>;
}
