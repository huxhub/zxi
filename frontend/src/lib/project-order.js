// Move these lines to rearrange both the Projects page and detail-page navigation.
export const PROJECT_ORDER = [
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

export function orderProjects(projects) {
  const bySlug = new Map(projects.map((project) => [project.slug, project]));
  const ordered = PROJECT_ORDER.map((slug) => bySlug.get(slug)).filter(Boolean);
  const listed = new Set(PROJECT_ORDER);
  return [...ordered, ...projects.filter((project) => !listed.has(project.slug))];
}
