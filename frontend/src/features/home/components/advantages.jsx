'use client';
import './home-sections.css';
import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';

export function Advantages({ items = [], lenisRef }) {
  const root = useRef(null);
  const timeline = useRef(null);
  const [active, setActive] = useState(0);
  useLayoutEffect(() => {
    if (!items.length) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)', () => {
      const panels = [...root.current.querySelectorAll('.why-item')];
      const images = root.current.querySelectorAll('.why-image');
      const bodies = panels.map(panel => panel.querySelector('.why-body'));
      gsap.set(bodies, { height: 'auto' });
      const heights = bodies.map(body => body.offsetHeight);
      gsap.set(bodies.slice(1), { height: 0 });
      gsap.set(images, { opacity: 1 });
      gsap.set([...images].slice(1), { opacity: 0 });
      const tl = gsap.timeline({ scrollTrigger: {
        trigger: root.current, start: 'top top', end: '+=100%', pin: true, scrub: true,
        invalidateOnRefresh: true,
        snap: { snapTo: 1 / items.length, duration: { min: .3, max: 1 }, delay: .15, ease: 'power4.inOut' },
        onUpdate: self => setActive(Math.min(items.length - 1, Math.max(0, Math.ceil(self.progress * items.length) - 1))),
      } });
      panels.forEach((panel, i) => {
        if (i) {
          tl.to(bodies[i], { height: () => heights[i], duration: 1, ease: 'none' }, i)
            .to(bodies[i - 1], { height: 0, duration: 1, ease: 'none' }, i)
            .to(panels[i - 1].querySelector('.why-header'), { opacity: .3, duration: 1, ease: 'none' }, i)
            .to(panel.querySelector('.why-number'), { backgroundColor: '#fff', duration: 1, ease: 'none' }, i)
            .to(images[i], { opacity: 1, duration: .6, ease: 'none' }, i);
        }
        tl.to(panel.querySelector('.why-progress'), { scaleX: 1, duration: 1, ease: 'none' }, i);
      });
      timeline.current = tl;
      return () => { timeline.current = null; };
    }, root);
    return () => mm.revert();
  }, [items]);
  function select(index) {
    const trigger = timeline.current?.scrollTrigger;
    if (trigger) {
      const target = trigger.start + (trigger.end - trigger.start) * ((index + 1) / items.length);
      if (lenisRef?.current) lenisRef.current.scrollTo(target, { duration: 1, easing: t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2 });
      else window.scrollTo({ top: target, behavior: 'smooth' });
    } else setActive(index);
  }
  return <section id="advantages" className="why-section" ref={root} aria-labelledby="why-heading">
    <div className="why-content"><h2 id="why-heading">Why work with us?</h2><div className="why-list">
      {items.map((item, index) => <article className={`why-item ${active === index ? 'is-active' : ''}`} key={item.title}>
        <h3><button className="why-header" onClick={() => select(index)} aria-expanded={active === index} aria-controls={`why-body-${index}`}><span className="why-number">{String(index + 1).padStart(2, '0')}</span><span>{item.title}</span></button></h3>
        <div className="why-body" id={`why-body-${index}`}><p>{item.description}</p></div><span className="why-progress" />
      </article>)}
    </div></div>
    <div className="why-visual">{items.map((item, index) => <div className={`why-image ${active === index ? 'is-active' : ''}`} key={item.title} aria-hidden={active !== index}><Image src={item.image?.src || item.image} alt={item.title} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" /></div>)}</div>
  </section>;
}
export default Advantages;
