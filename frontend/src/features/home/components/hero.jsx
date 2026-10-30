'use client';

import { useEffect, useRef, useState } from 'react';
import { selectHeroVideo } from './hero-video-source';

export function Hero({ hero, heroRef, heroPicRef, heroCopyRef }) {
  const videoRef = useRef(null);
  const [videoSource, setVideoSource] = useState(null);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
    const updateSource = () => setVideoSource(selectHeroVideo(window.innerWidth));

    updateSource();
    mobileQuery.addEventListener('change', updateSource);
    tabletQuery.addEventListener('change', updateSource);
    return () => {
      mobileQuery.removeEventListener('change', updateSource);
      tabletQuery.removeEventListener('change', updateSource);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video && videoSource) {
      video.muted = true;
      video.defaultMuted = true;
      video.load();
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [videoSource]);

  const verifyVideoRatio = (event) => {
    const video = event.currentTarget;
    if (window.innerWidth >= 1024 && video.videoHeight > video.videoWidth) {
      setVideoSource(`${selectHeroVideo(window.innerWidth)}?desktop=landscape-v4`);
    }
  };

  return (
    <section
      id="home"
      className="relative h-[100svh] min-h-[660px] overflow-hidden text-white bg-neutral-950"
      ref={heroRef}
    >
      <div
        className="absolute -inset-y-[5%] inset-x-0 h-[110%] w-full will-change-transform"
        ref={heroPicRef}
      >
        <video
          key={videoSource || 'hero-poster'}
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={hero?.src}
          className="hero-video w-full h-full object-cover"
          src={videoSource || undefined}
          onLoadedMetadata={verifyVideoRatio}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/80 pointer-events-none" />

      <div
        className="relative z-10 h-full max-w-[1720px] mx-auto px-5 sm:px-10 lg:px-16 pt-24 pb-16 flex flex-col md:flex-row md:items-end justify-end md:justify-between gap-8 md:gap-10 will-change-transform"
        ref={heroCopyRef}
      >
        <div className="max-w-2xl">
          <p className="hero-copy-sub text-base sm:text-lg font-medium text-white/90 mb-6 tracking-tight">
            Dubai’s leading interior fitout company
          </p>
          <div className="hero-split-line overflow-hidden py-0.5">
            <h1 className="block text-3xl sm:text-4xl md:text-5xl lg:text-[55px] font-normal leading-[1.18] tracking-[-0.025em]">
              Re-imagine your
            </h1>
          </div>
          <div className="hero-split-line overflow-hidden py-0.5">
            <h1 className="block text-3xl sm:text-4xl md:text-5xl lg:text-[55px] font-normal leading-[1.18] tracking-[-0.025em]">
              space with
            </h1>
          </div>
          <div className="hero-split-line overflow-hidden py-0.5">
            <h1 className="block text-3xl sm:text-4xl md:text-5xl lg:text-[55px] font-normal leading-[1.18] tracking-[-0.025em]">
              ZXI Interiors.
            </h1>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
