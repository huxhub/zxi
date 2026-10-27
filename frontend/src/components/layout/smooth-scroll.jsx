'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const lenis = new Lenis({
      duration: 1.25,
      easing: (progress) => Math.min(1, 1.001 - Math.pow(2, -10 * progress)),
      smoothWheel: true,
      touchMultiplier: 1.8,
    });
    const resetScroll = () => lenis.scrollTo(0, { immediate: true, force: true });
    const tick = (time) => lenis.raf(time * 1000);

    window.__lenis = lenis;
    window.dispatchEvent(new Event('zxi:lenis-ready'));
    window.addEventListener('app:reset-scroll', resetScroll);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      if (window.__lenis === lenis) window.__lenis = null;
      gsap.ticker.remove(tick);
      window.removeEventListener('app:reset-scroll', resetScroll);
      lenis.destroy();
    };
  }, []);

  return null;
}
