import media from '../../zxi-source/images.json';
export function projectImage(id) {
  const item = media.find((image) => image.id === id);
  if (!item) throw new Error(`Missing project image ${id}`);
  return { src: `/zxi/${item.local_file.replaceAll('\\', '/')}`, width: item.width, height: item.height };
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
export const projects = entries.map(([slug, title, location, category, scope, id, color]) => {
  const cover = media.find((item) => item.id === id);
  const parent = cover.source_page.split('/').slice(0, -2).join('/') + '/';
  const related = parent === 'https://zxi.ae/' ? [] : media.filter((item) => item.source_page?.startsWith(parent) && item.width >= 500 && item.height >= 400 && item.id !== id);
  const gallery = [projectImage(id), ...related.slice(0, 8).map((item) => projectImage(item.id))];
  return { slug, title, location, category, scope, color, image: projectImage(id), gallery };
});
export const portfolioProjects = [...projects.slice(0, 8), { ...projects[1], image: projectImage(2648) }, { ...projects[0], image: projectImage(2663) }, projects[8], { ...projects[4], image: projectImage(2625) }];

