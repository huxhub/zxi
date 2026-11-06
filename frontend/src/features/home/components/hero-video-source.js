const HERO_VIDEO = '/media/hero/ZXI_4K60_Homepage.webm';
const HERO_MOBILE_VIDEO = '/media/hero/ZXI_Mobile_1080x1920_60fps.webm';

export const HERO_VIDEOS = {
  mobile: HERO_MOBILE_VIDEO,
  tablet: HERO_VIDEO,
  desktop: HERO_VIDEO,
};

export function selectHeroVideo(width) {
  if (width < 768) return HERO_VIDEOS.mobile;
  if (width < 1024) return HERO_VIDEOS.tablet;
  return HERO_VIDEOS.desktop;
}
