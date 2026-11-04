const HERO_VIDEO = '/media/hero/ZXI_4K60_Homepage.webm';

export const HERO_VIDEOS = {
  mobile: HERO_VIDEO,
  tablet: HERO_VIDEO,
  desktop: HERO_VIDEO,
};

export function selectHeroVideo(width) {
  if (width < 768) return HERO_VIDEOS.mobile;
  if (width < 1024) return HERO_VIDEOS.tablet;
  return HERO_VIDEOS.desktop;
}
