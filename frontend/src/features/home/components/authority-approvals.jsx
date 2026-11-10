'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import './home-sections.css';

const AUTHORITIES = [
  { name: 'DEWA', image: '/partners/dewa.png', scale: 1.06 },
  { name: 'DIFC', image: '/partners/difc.png', scale: 1.04 },
  { name: 'DAMAC', image: '/partners/damac.webp', scale: 1.18 },
  { name: 'Emaar', image: '/partners/emaar.png', scale: 1.02 },
  { name: 'Trakhees', image: '/partners/trakhees.png', scale: 1.06 },
  { name: 'Dubai Municipality', image: '/partners/dubai-municipality.png', scale: 0.86 },
  { name: 'Nakheel', image: '/partners/nakheel.png', scale: 1.04 },
  { name: 'JAFZA', image: '/partners/jafza.png', scale: 1.04 },
  { name: 'TECOM Group', image: '/partners/tecom.png', scale: 1.06 },
  { name: 'Dubai Retail', image: '/partners/dubai-retail.png', scale: 1.08 },
  { name: 'Dubai Silicon Oasis', image: '/partners/dubai-silicon-oasis.png', scale: 1.02 },
  { name: 'Concordia', image: '/partners/concordia.png', scale: 1.08 },
];

export function AuthorityApprovals() {
  const viewportRef = useRef(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const mobile = window.matchMedia('(max-width: 767px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!viewport || !mobile.matches || reducedMotion.matches) return undefined;

    const rail = viewport.querySelector('.authority-approvals__rail');
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
      if (!width) return;
      position = width;
      ignoreScrollUntil = performance.now() + 80;
      viewport.scrollLeft = position;
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
    viewport.addEventListener('scroll', syncManualPosition, { passive: true });
    window.addEventListener('resize', positionAtMiddleSet);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      viewport.removeEventListener('pointerdown', pause);
      viewport.removeEventListener('pointerup', resume);
      viewport.removeEventListener('pointercancel', resume);
      viewport.removeEventListener('scroll', syncManualPosition);
      window.removeEventListener('resize', positionAtMiddleSet);
    };
  }, []);

  return (
    <section id="authorities" className="authority-approvals" aria-labelledby="authority-approvals-heading">
      <div className="authority-approvals__heading">
        <div>
          <p className="authority-approvals__eyebrow">Authority credentials</p>
          <h2 id="authority-approvals-heading">Authorities we coordinate with.</h2>
        </div>
      </div>

      <div className="authority-approvals__viewport" ref={viewportRef} aria-label="Accrediting authorities and approval bodies">
        <div className="authority-approvals__rail">
          {[['before', true], ['primary', false], ['after', true]].map(([key, isDuplicate]) => (
            <div className="authority-approvals__set" role={isDuplicate ? undefined : 'list'} aria-hidden={isDuplicate || undefined} key={key}>
              {AUTHORITIES.map((authority) => (
                <div className="authority-approvals__logo" role={isDuplicate ? undefined : 'listitem'} key={authority.name}>
                  <div className="authority-approvals__image">
                    <Image
                      src={authority.image}
                      alt={isDuplicate ? '' : authority.name}
                      fill
                      sizes="(max-width: 767px) 160px, 220px"
                      style={{ '--authority-logo-scale': authority.scale || 1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

export default AuthorityApprovals;
