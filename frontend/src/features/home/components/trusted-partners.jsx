'use client';

import './home-sections.css';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const PARTNERS = [
  { name: 'Sobha Realty', image: '/partners/sobha.webp', scale: 1.18 },
  { name: 'Plug Media', image: '/partners/plug-media.webp', scale: 1.18 },
  { name: 'Braschi', image: '/partners/braschi.webp' },
  { name: 'Ikigai Studio', image: '/partners/ikigai.webp', scale: 1.14 },
  { name: 'Samsara Tribe', image: '/partners/samsara-tribe.webp', scale: 1.2 },
  { name: 'Gemma Fine Jewelry', image: '/partners/gemma.webp' },
  { name: 'NÓRA', image: '/partners/nora.webp', scale: 1.25 },
  { name: 'The Bread Basket', image: '/partners/bread-basket.webp' },
  { name: 'Calicut Notebook', image: '/partners/calicut-notebook.webp', scale: 1.75 },
  { name: 'Prestige Group', image: '/partners/prestige-group.webp', scale: 1.12 },
  { name: 'Guinness World Records', image: '/partners/guinness-world.webp', scale: 1.08 },
  { name: 'Lulie Fisher Design Studio', image: '/partners/lulie-fisher.webp', scale: 1.12 },
  { name: 'Wahat Al Zaweya', image: '/partners/wahat-al-zaweya.webp', scale: 1.12 },
  { name: 'Tritvam', image: '/partners/tritvam.webp', scale: 1.5 },
  { name: 'DAMAC', image: '/partners/damac.webp', scale: 1.18 },
  { name: 'Trakhees', image: '/partners/trakhees.png', scale: 1.06 },
  { name: 'Concordia', image: '/partners/concordia.png', scale: 1.08 },
  { name: 'Nakheel', image: '/partners/nakheel.png', scale: 1.04 },
  { name: 'TECOM Group', image: '/partners/tecom.png', scale: 1.06 },
  { name: 'JAFZA', image: '/partners/jafza.png', scale: 1.04 },
  { name: 'Dubai Retail', image: '/partners/dubai-retail.png', scale: 1.08 },
  { name: 'Dubai Silicon Oasis', image: '/partners/dubai-silicon-oasis.png', scale: 1.02 },
  { name: 'DEWA', image: '/partners/dewa.png', scale: 1.06 },
  { name: 'DIFC', image: '/partners/difc.png', scale: 1.04 },
];

export function TrustedPartners() {
  const viewportRef = useRef(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const mobile = window.matchMedia('(max-width: 767px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!viewport || !mobile.matches || reducedMotion.matches) return undefined;

    const rail = viewport.querySelector('.trusted-partners__rail');
    let frame;
    let previousTime = performance.now();
    let interacting = false;
    let resumeAt = 0;
    let position = 0;
    let ignoreScrollUntil = 0;

    const setWidth = () => rail.scrollWidth / 3;
    const keepInLoop = () => {
      const width = setWidth();
      if (!width) return;
      if (position >= width * 2) position -= width;
      if (position <= 0) position += width;
      ignoreScrollUntil = performance.now() + 80;
      viewport.scrollLeft = position;
    };
    const positionAtMiddleSet = () => {
      const width = setWidth();
      if (width) {
        position = width;
        ignoreScrollUntil = performance.now() + 80;
        viewport.scrollLeft = position;
      }
    };
    const pause = () => {
      interacting = true;
      position = viewport.scrollLeft;
    };
    const resume = () => {
      interacting = false;
      position = viewport.scrollLeft;
      resumeAt = performance.now() + 1100;
      keepInLoop();
    };
    const syncManualPosition = () => {
      if (performance.now() < ignoreScrollUntil) return;
      position = viewport.scrollLeft;
      resumeAt = performance.now() + 1100;
      keepInLoop();
    };
    const tick = (time) => {
      const elapsed = Math.min(time - previousTime, 40);
      previousTime = time;
      if (!interacting && time >= resumeAt) {
        position += elapsed * 0.032;
        keepInLoop();
      }
      frame = requestAnimationFrame(tick);
    };

    positionAtMiddleSet();
    viewport.addEventListener('pointerdown', pause, { passive: true });
    viewport.addEventListener('pointerup', resume, { passive: true });
    viewport.addEventListener('pointercancel', resume, { passive: true });
    viewport.addEventListener('touchstart', pause, { passive: true });
    viewport.addEventListener('touchend', resume, { passive: true });
    viewport.addEventListener('scroll', syncManualPosition, { passive: true });
    window.addEventListener('resize', positionAtMiddleSet);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      viewport.removeEventListener('pointerdown', pause);
      viewport.removeEventListener('pointerup', resume);
      viewport.removeEventListener('pointercancel', resume);
      viewport.removeEventListener('touchstart', pause);
      viewport.removeEventListener('touchend', resume);
      viewport.removeEventListener('scroll', syncManualPosition);
      window.removeEventListener('resize', positionAtMiddleSet);
    };
  }, []);

  return (
    <section className="trusted-partners" aria-labelledby="trusted-partners-heading">
      <div className="trusted-partners__heading">
        <div>
          <p className="trusted-partners__eyebrow">Trusted partners</p>
          <h2 id="trusted-partners-heading">Trusted by leaders.</h2>
        </div>
        <p className="trusted-partners__intro">The brands and teams we have worked alongside.</p>
      </div>
      <div className="trusted-partners__viewport" ref={viewportRef}>
        <div className="trusted-partners__rail">
          {[['before', true], ['primary', false], ['after', true]].map(([key, isDuplicate]) => (
            <div className="trusted-partners__set" role={isDuplicate ? undefined : 'list'} aria-hidden={isDuplicate || undefined} key={key}>
              {PARTNERS.map((partner) => (
                <div className="trusted-partners__logo" role={isDuplicate ? undefined : 'listitem'} key={partner.name}>
                  <Image
                    src={partner.image}
                    alt={isDuplicate ? '' : partner.name}
                    fill
                    sizes="(max-width: 767px) 160px, 220px"
                    style={{ '--partner-logo-scale': partner.scale || 1 }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustedPartners;
