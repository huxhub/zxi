import { portfolioProjects } from '@/lib/projects';
import { ProjectArchive } from '@/features/projects/project-archive';
import { ProjectShell } from '@/features/projects/project-shell';

// Projects page order only. Move these lines to rearrange the listing.
const PROJECT_ORDER = [
  'samsara-tribe-yoga',
  'ikigai-pilates-studio',
  'city-walk',
  'gemma',
  'nora',
  'plug-media',
  'bread-basket',
  'mbr-kitchen',
  'elie-saab-meydan',
  'office-prism',
  'dubai-hills',
  'samiat-restaurant',
  'italica-cafe',
  'mr-khalid',
  'mr-jafar',
  'braschi',
  'royal-gallery',
  'orange-cafe',
  'lajjarri-art-gallery',
  'kir-kaiten',
  'laila-amraoui',
  'binoy-mercy',
  'mrs-najia-bibi',
];

export const metadata = { title: 'Interior Design & Fitout Projects', description: 'Explore ZXI residential, retail, commercial, and hospitality interior projects across Dubai and the UAE.', alternates: { canonical: '/projects' }, openGraph: { url: '/projects', title: 'Dubai Interior Design & Fitout Projects | ZXI' } };
export default function ProjectsPage() {
  const bySlug = new Map(portfolioProjects.map((project) => [project.slug, project]));
  const projects = PROJECT_ORDER.map((slug) => bySlug.get(slug)).filter(Boolean);
  const listed = new Set(PROJECT_ORDER);
  projects.push(...portfolioProjects.filter((project) => !listed.has(project.slug)));
  return <ProjectShell darkAtTop logo={{ src: '/zxi_dubailogo_black.svg', width: 220, height: 80 }}><ProjectArchive projects={projects} standalone /></ProjectShell>;
}
