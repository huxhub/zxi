'use client';
import './home-sections.css';
import { useLayoutEffect, useRef } from 'react';
import { Photo } from '@/components/ui/photo';
import { gsap } from '@/lib/gsap';

export function Services3D({ services, onSelect }) {
  const root = useRef(null);
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const carousel = root.current.querySelector('.bloom-carousel');
      const wrapper = root.current.querySelector('.bloom-scroll-track');
      const images = root.current.querySelectorAll('.carousel_card_img');
      const scrollTrigger = { trigger: wrapper, start: 'top 75%', end: 'bottom 25%', scrub: true, invalidateOnRefresh: true };
      gsap.fromTo(carousel, { rotationY: -102, yPercent: 0 }, { rotationY: -25, yPercent: 100, ease: 'power1.inOut', scrollTrigger });
      gsap.fromTo(images, { x: 100 }, { x: -100, ease: 'power1.inOut', scrollTrigger: { ...scrollTrigger } });
      gsap.fromTo(images, { y: -100 }, { y: 100, ease: 'none', scrollTrigger: { ...scrollTrigger, start: 'top bottom', end: 'bottom top' } });
    }, root);
    return () => mm.revert();
  }, []);
  return <section id="services" className="bloom-services" ref={root} aria-label="Interior services">
    <div className="bloom-services-heading"><p>Our capabilities</p><h2>Design, craftsmanship, and delivery—under one roof.</h2></div>
    <div className="bloom-scroll-track"><div className="bloom-stage"><div className="bloom-carousel">
      {services.map((service, index) => <button type="button" className="bloom-card" style={{ '--card-index': index + 1 }} key={service.title} onClick={() => onSelect(service)} aria-label={`View ${service.title}`}>
        <span className="bloom-card-surface"><span className="carousel_card_img"><Photo image={service.image} alt={service.title} sizes="(max-width: 767px) 100vw, 40vw" /></span><span className="bloom-card-shade" /><span className="bloom-card-copy"><span className="bloom-card-title">{service.title}</span><span className="bloom-card-link">View service <span aria-hidden="true">&#8599;</span></span></span></span>
      </button>)}
    </div></div></div>
  </section>;
}
export default Services3D;
