export const HERO_VIDEOS = {
  mobile: '/media/hero/hero-mobile.mp4',
  tablet: '/media/hero/hero-tablet.mp4',
  desktop: '/media/hero/hero-desktop-native-hq-v5.mp4',
};

export function selectHeroVideo(width) {
  if (width < 768) return HERO_VIDEOS.mobile;
  if (width < 1024) return HERO_VIDEOS.tablet;
  return HERO_VIDEOS.desktop;
}
