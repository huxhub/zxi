'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { SiteNav } from '@/components/layout/site-nav';
import { Footer } from '@/components/layout/footer';

export function ProjectShell({ logo, children }) {
  const router = useRouter();
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);
  const navigate = (id) => router.push(id === 'portfolio' ? '/projects' : id === 'home' ? '/' : id === 'contact' ? '/contact' : `/#${id}`);
  return <><SiteNav logo={logo} onNavigate={navigate} /><main id="main">{children}</main><Footer logo={logo} onNavigate={navigate} /></>;
}
