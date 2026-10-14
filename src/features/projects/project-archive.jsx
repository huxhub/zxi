'use client';
import { useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Photo } from '@/components/ui/photo';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export function ProjectArchive({ projects, standalone = false }) {
  const root = useRef(null);
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState(false);
  const controls = useRef({});
  const visible = filter === 'All' ? projects : projects.filter((project) => project.category === filter);
  useLayoutEffect(() => {
    const element = root.current;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (filter !== 'All') {
        gsap.fromTo(element.querySelectorAll('.folio-card'), { clipPath: 'inset(100% 0% 0% 0%)' }, {
          clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, stagger: .08, ease: 'expo.out', clearProps: 'clipPath',
        });
      }
    }, element);
    mm.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
      const links = [...element.querySelectorAll('.folio-image')];
      const slots = [...element.querySelectorAll('.folio-strip-slot')];
      const captions = element.querySelectorAll('.folio-caption');
      let isExpanded = filter !== 'All';
      let animation;
      const compact = () => {
        links.forEach((link, index) => {
          gsap.set(link, { clearProps: 'transform,width,height,opacity' });
          if (!slots[index]) { gsap.set(link, { opacity: 0 }); return; }
          const from = slots[index].getBoundingClientRect();
          const to = link.getBoundingClientRect();
          gsap.set(link, { x: from.left - to.left, y: from.top - to.top, width: from.width, height: from.height });
        });
        gsap.set(captions, { opacity: 0 });
      };
      const expand = () => {
        if (isExpanded) return;
        isExpanded = true;
        setExpanded(true);
        animation?.kill();
        animation = gsap.timeline()
          .to(links, { x: 0, y: 0, width: '100%', height: '100%', opacity: 1, duration: 2, stagger: .05, ease: 'expo.inOut', overwrite: true }, 0)
          .to(captions, { opacity: 1, duration: .6, stagger: .04 }, 1.2);
      };
      const collapse = () => {
        if (!isExpanded || filter !== 'All') return;
        isExpanded = false;
        setExpanded(false);
        animation?.kill();
        animation = gsap.timeline();
        links.forEach((link, index) => {
          if (!slots[index]) { animation.to(link, { opacity: 0, duration: .3 }, 0); return; }
          const from = slots[index].getBoundingClientRect();
          const to = link.parentElement.getBoundingClientRect();
          animation.to(link, { x: from.left - to.left, y: from.top - to.top, width: from.width, height: from.height, duration: 1.2, ease: 'power4.inOut' }, .05 + index * .04);
        });
        animation.to(captions, { opacity: 0, duration: .25 }, 0);
      };
      if (!isExpanded) compact();
      const trigger = ScrollTrigger.create({ trigger: element, start: 'top top-=12', end: '+=100%', onEnter: expand, onLeaveBack: collapse });
      controls.current = { expand };
      if (trigger.scroll() > trigger.start) expand();
      const resize = () => { if (!isExpanded) compact(); };
      window.addEventListener('resize', resize);
      return () => { animation?.kill(); trigger.kill(); window.removeEventListener('resize', resize); controls.current = {}; };
    }, element);
    return () => mm.revert();
  }, [filter, projects]);
  function selectCategory(category) {
    controls.current.expand?.();
    setExpanded(true);
    setFilter(category);
    requestAnimationFrame(() => root.current.querySelector('.folio-grid').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' }));
  }
  return (
    <section id="portfolio" ref={root} className={`folio ${expanded ? 'is-expanded' : ''}`}>
      <div className="folio-intro">
        <p className="folio-eyebrow">ZXI — Selected projects</p>
        {standalone ? <h1 className="folio-heading">Considered spaces.<br />Distinctive interiors.<br />Made for living.</h1> : <h2 className="folio-heading">Considered spaces.<br />Distinctive interiors.<br />Made for living.</h2>}
        <p className="folio-scroll-note">Scroll to explore <span aria-hidden="true">&#8595;</span></p>
      </div>
      <nav className="folio-filters" aria-label="Filter projects">
        {['All', 'Residential', 'Retail', 'Hospitality', 'Commercial'].map((category) => <button key={category} type="button" aria-pressed={filter === category} onClick={() => selectCategory(category)}>{category}</button>)}
      </nav>
      <div className="folio-strip" aria-hidden="true">{projects.slice(0, 10).map((project, index) => <div className="folio-strip-slot" key={`${project.slug}-${index}`} />)}</div>
      <div className="folio-grid" aria-label="Projects">
        {visible.map((project, index) => <article className="folio-card" key={`${filter}-${project.slug}-${index}`} style={{ '--project-color': project.color }}>
          <div className="folio-frame">
            <Link href={`/projects/${project.slug}`} className="folio-image" aria-label={`View ${project.title}, ${project.location}`}>
              <Photo image={project.image} alt={`${project.title} — ${project.scope}`} sizes="(max-width: 768px) 100vw, 34vw" />
              <span className="folio-hover"><span>{project.title}<small>{project.category}</small></span><span aria-hidden="true">&#8599;</span></span>
            </Link>
          </div>
          <div className="folio-caption"><h3>{project.title}</h3><span>{project.category}</span></div>
        </article>)}
      </div>
      <div className="folio-end"><span>{visible.length} views / {filter === 'All' ? 'All projects' : filter}</span>{!standalone && <Link href="/projects">Explore the project collection &#8599;</Link>}</div>
    </section>
  );
}
export default ProjectArchive;

