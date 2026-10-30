import projectGalleries from './project-galleries.json';
import media from '../../zxi-source/images.json';
import projectImageDimensions from './project-image-dimensions.json';

export function projectImage(id) {
  const item = media.find((image) => image.id === id);
  if (!item) throw new Error(`Missing project image ${id}`);
  const width = item.width || 1600;
  const height = item.height || 1067;
  return {
    src: `/zxi/${item.local_file.replaceAll('\\', '/')}`,
    width,
    height,
    aspectRatio: +(width / height).toFixed(4),
  };
}
const entries = [
  ['plug-media', 'Plug Media', 'Al Quoz, Dubai', 'Commercial', 'Office interiors', 2664, '#b2a290'],
  ['mbr-kitchen', 'MBR Kitchen', 'MBR City, Dubai', 'Residential', 'Kitchen interiors', 2646, '#c5b69d'],
  ['gemma', 'Gemma', 'Dubai Design District', 'Retail', 'Jewellery boutique', 2685, '#b6ad91'],
  ['nora', 'Nora', 'Dubai Design District', 'Retail', 'Fashion boutique', 2668, '#bfa697'],
  ['samsara-tribe-yoga', 'Samsara Tribe Yoga', 'Dubai Marina', 'Hospitality', 'Yoga studio', 1860, '#9caa97'],
  ['mr-khalid', 'Mr. Khalid', 'Dubai', 'Residential', 'Villa interiors', 1744, '#b2a080'],
  ['binoy-mercy', 'Dr. Binoy Thomas & Dr. Mercy', 'Kochi', 'Residential', 'Apartment interiors', 1716, '#b9b4a2'],
  ['bread-basket', 'Bread Basket', 'Jumeirah, Dubai', 'Hospitality', 'Café interiors', 1850, '#b28d70'],
  ['mr-jafar', 'Mr. Jafar', 'Dubai', 'Residential', 'Villa interiors', 1593, '#a2a793'],
];
const legacyProjects = entries.map(([slug, title, location, category, scope, id, color]) => {
  const cover = media.find((item) => item.id === id);
  const parent = cover.source_page.split('/').slice(0, -2).join('/') + '/';
  const related = parent === 'https://zxi.ae/' ? [] : media.filter((item) => item.source_page?.startsWith(parent) && item.width >= 500 && item.height >= 400 && item.id !== id);
  const gallery = [projectImage(id), ...related.slice(0, 8).map((item) => projectImage(item.id))];
  return { slug, title, location, category, scope, color, image: projectImage(id), gallery };
});
const projectColorPalette = {
  'samsara-tribe-yoga': '#9caa97',
  'ikigai-pilates-studio': '#a1ab9c',
  'city-walk': '#a69f94',
  'gemma': '#b6ad91',
  'nora': '#bfa697',
  'braschi': '#ab9d8f',
  'mrs-najia-bibi': '#b5aa9c',
  'royal-gallery': '#9fa69b',
  'orange-cafe': '#bfa188',
  'lajjarri-art-gallery': '#a39f99',
};

// Encode each segment so spaces, punctuation, and emoji in supplied filenames are safe URLs.
function suppliedProject(slug, details, existing) {
  const { folder, files, introImage, ...metadata } = details;
  const folderDims = projectImageDimensions[folder] || {};
  const gallery = files.map((file) => {
    const dim = folderDims[file] || {};
    const width = dim.width || 1600;
    const height = dim.height || 1067;
    const aspectRatio = dim.aspectRatio || +(width / height).toFixed(4);
    return {
      src: `/projects/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`,
      width,
      height,
      aspectRatio,
    };
  });
  const introDimensions = introImage ? (folderDims[introImage] || {}) : {};
  const introWidth = introDimensions.width || 1536;
  const introHeight = introDimensions.height || 864;
  const introAsset = introImage ? {
    src: `/projects/${encodeURIComponent(folder)}/${encodeURIComponent(introImage)}`,
    width: introWidth,
    height: introHeight,
    aspectRatio: introDimensions.aspectRatio || +(introWidth / introHeight).toFixed(4),
  } : null;
  return {
    ...existing,
    ...metadata,
    slug,
    color: existing?.color || projectColorPalette[slug] || '#b9b4a2',
    image: gallery[0],
    introImage: introAsset,
    gallery,
  };
}

const allProjects = [
  ...legacyProjects.map((project) => projectGalleries[project.slug]
    ? suppliedProject(project.slug, projectGalleries[project.slug], project)
    : project),
  ...Object.entries(projectGalleries)
    .filter(([slug]) => !legacyProjects.some((project) => project.slug === slug))
    .map(([slug, details]) => suppliedProject(slug, details)),
];

const prioritySlugs = [
  'samsara-tribe-yoga',
  'ikigai-pilates-studio',
  'city-walk',
  'gemma',
  'nora',
];

export const projects = [
  ...prioritySlugs.map((slug) => allProjects.find((project) => project.slug === slug)).filter(Boolean),
  ...allProjects.filter((project) => !prioritySlugs.includes(project.slug)),
];

export const portfolioProjects = projects;

