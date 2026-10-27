'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from '@/lib/gsap';

import { SiteNav } from '@/components/layout/site-nav';
import { Footer } from '@/components/layout/footer';
import { DetailModal } from '@/components/ui/detail-modal';

import { Hero } from './components/hero';
import { Portfolio } from './components/portfolio';
import { Services3D } from './components/services-3d';
import { MidPageCta } from './components/mid-page-cta';
import { AboutStats } from './components/about-stats';
import { Advantages } from './components/advantages';
import { ContactBanner } from './components/contact-banner';
import { FAQ } from './components/faq';

export function HomeView({ data }) {
  const router = useRouter();
  const detail = useRef(null);
  const [selected, setSelected] = useState(null);
  const lenisRef = useRef(null);
  const heroRef = useRef(null);
  const heroPicRef = useRef(null);
  const heroCopyRef = useRef(null);
  const ctaPicRef = useRef(null);

  useEffect(() => {
    const syncLenis = () => {
      lenisRef.current = window.__lenis || null;
    };

    syncLenis();
    window.addEventListener('zxi:lenis-ready', syncLenis);

    return () => window.removeEventListener('zxi:lenis-ready', syncLenis);
  }, []);

  // Hero entrance animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray('.hero-split-line h1');
      gsap.fromTo(
        lines,
        {
          yPercent: 110,
        },
        {
          yPercent: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: 'power4.out',
        }
      );

      gsap.fromTo(
        '.hero-copy-sub',
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.2,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        '.hero-actions',
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.35,
          ease: 'power3.out',
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // Parallax on Hero, Project Cards, and CTA banners
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Parallax Scrub
      if (heroRef.current && heroPicRef.current) {
        gsap.to(heroPicRef.current, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        gsap.to(heroCopyRef.current, {
          yPercent: -25,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '60% top',
            scrub: true,
          },
        });
      }

      // Featured Project Cards Stagger Entrance & Parallax
      const cards = gsap.utils.toArray('.project-card');
      cards.forEach((card) => {
        const imgWrap = card.querySelector('.project-card-img-wrap');
        if (imgWrap) {
          gsap.fromTo(
            imgWrap,
            {
              yPercent: -8,
            },
            {
              yPercent: 8,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 45,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Contact CTA Parallax
      if (ctaPicRef.current) {
        gsap.to(ctaPicRef.current, {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: '#contact',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const showDetail = (item) => {
    setSelected(item);
    detail.current?.showModal();
  };

  const handleSmoothNav = (id) => {
    if (id === 'portfolio') {
      router.push('/projects');
      return;
    }
    if (id === 'contact') {
      router.push('/contact');
      return;
    }
    const el = document.getElementById(id);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { duration: 1.3, offset: -40 });
    }
  };

  return (
    <>
      <a
        href="#main"
        className="fixed z-50 top-4 left-4 px-5 py-3 bg-white text-neutral-900 rounded-full shadow-lg -translate-y-24 focus:translate-y-0 transition-transform font-medium text-sm"
      >
        Skip to content
      </a>

      <SiteNav
        logo={data.logo}
        projects={data.projects}
        onSelectProject={showDetail}
        onNavigate={handleSmoothNav}
      />

      <main id="main">
        <Hero
          hero={data.hero}
          onNavigate={handleSmoothNav}
          heroRef={heroRef}
          heroPicRef={heroPicRef}
          heroCopyRef={heroCopyRef}
        />

        <Portfolio projects={data.projects} />

        <Services3D services={data.services} onSelect={showDetail} />

        <MidPageCta />

        <AboutStats intro={data.intro} lenisRef={lenisRef} />

        <Advantages items={data.advantages} lenisRef={lenisRef} />

        {/* <ContactBanner cta={data.cta} ctaPicRef={ctaPicRef} /> */}

        <FAQ items={data.faq} />
      </main>

      <Footer logo={data.logo} onNavigate={handleSmoothNav} />

      <DetailModal
        dialogRef={detail}
        item={selected}
        onClose={() => detail.current?.close()}
      />
    </>
  );
}

export default HomeView;
