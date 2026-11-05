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
  ['plug-media', 'Plug Media', 'Al Quoz, Dubai', 'Commercial', 'Office interiors', [2664, 2663, 2661, 2660, 2659, 2658, 2657, 2656, 2655], '#b2a290'],
  ['mbr-kitchen', 'MBR Kitchen', 'MBR City, Dubai', 'Residential', 'Kitchen interiors', [2646, 2650, 2648, 2647, 2645, 2644, 2643, 2642, 2641], '#c5b69d'],
  ['gemma', 'Gemma', 'Dubai Design District', 'Retail', 'Jewellery boutique', [2685, 2688, 2687, 2686, 2684, 2683, 2682, 2681, 2680], '#b6ad91'],
  ['nora', 'Nora', 'Dubai Design District', 'Retail', 'Fashion boutique', [2668, 2673, 2672, 2671, 2667], '#bfa697'],
  ['samsara-tribe-yoga', 'Samsara Tribe Yoga', 'Dubai Marina', 'Hospitality', 'Yoga studio', [1860, 1865, 1864, 1863, 1862, 1861], '#9caa97'],
  ['mr-khalid', 'Mr. Khalid', 'Dubai', 'Residential', 'Villa interiors', [1744], '#b2a080'],
  ['binoy-mercy', 'Dr. Binoy Thomas & Dr. Mercy', 'Kochi', 'Residential', 'Apartment interiors', [1716, 1788], '#b9b4a2'],
  ['bread-basket', 'Bread Basket', 'Jumeirah, Dubai', 'Hospitality', 'Café interiors', [1850, 1855, 1854, 1853, 1852, 1851], '#b28d70'],
  ['mr-jafar', 'Mr. Jafar', 'Dubai', 'Residential', 'Villa interiors', [1593], '#a2a793'],
];
const legacyProjects = entries.map(([slug, title, location, category, scope, imageIds, color]) => {
  const gallery = imageIds.map(projectImage);
  return { slug, title, location, category, scope, color, image: gallery[0], gallery };
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
  const { folder, files, introImage, imageDimensions = [], coverImage, ...metadata } = details;
  const folderDims = projectImageDimensions[folder] || {};
  const gallery = files.map((file, index) => {
    const [declaredWidth, declaredHeight] = imageDimensions[index] || [];
    const dim = folderDims[file] || {};
    const width = declaredWidth || dim.width || 1600;
    const height = declaredHeight || dim.height || 1067;
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
    image: gallery.find((image) => image.src.endsWith(`/${encodeURIComponent(coverImage)}`)) || gallery[0],
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

