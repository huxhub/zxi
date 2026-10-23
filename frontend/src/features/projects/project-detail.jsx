'use client';
import { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { Photo } from '@/components/ui/photo';
import { gsap } from '@/lib/gsap';

export function ProjectDetail({ project, next }) {
  const root = useRef(null);
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(root.current.querySelector('.project-cover-image'), { clipPath: 'inset(100% 0 0)' }, { clipPath: 'inset(0% 0 0)', duration: 1.2, ease: 'expo.out', clearProps: 'clipPath' });
      gsap.from(root.current.querySelector('h1'), { y: 30, opacity: 0, duration: 1, delay: .15, ease: 'power3.out' });
    }, root);
    mm.add('(min-width: 992px) and (prefers-reduced-motion: no-preference)', () => {
      const track = root.current.querySelector('.project-track');
      gsap.to(track, { x: () => -(track.scrollWidth - window.innerWidth), ease: 'none', scrollTrigger: {
        trigger: root.current, pin: true, scrub: 1, start: 'top top', end: () => `+=${track.scrollWidth - window.innerWidth}`, invalidateOnRefresh: true,
      } });
    }, root);
    return () => mm.revert();
  }, [project.slug]);
  return <>
    <Link className="project-close" href="/projects" aria-label="Close project and return to all projects" title="All projects">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
    </Link>
    <div className="project-story" ref={root} style={{ '--project-color': project.color }}>
    <div className="project-track">
      <section className="project-cover">
        <div className="project-title-panel">
          <Link className="project-back" href="/projects">&#8598; All projects</Link>
          <div className="project-thumbnail"><p>{project.location}<span>{project.category}</span></p><div><Photo image={project.gallery[1] || project.image} alt={`${project.title} detail`} sizes="30vw" /></div><p>{project.scope}</p></div>
          <h1>{project.title}</h1>
          <span className="project-scroll-cue">Scroll to discover &#8600;</span>
        </div>
        <div className="project-cover-image"><Photo image={project.image} alt={project.title} priority sizes="(max-width: 991px) 100vw, 50vw" /></div>
      </section>
      <section className="project-information">
        <p className="folio-eyebrow">The project</p>
        <h2>{project.scope}<br />in {project.location}.</h2>
        <dl><div><dt>Project</dt><dd>{project.title}</dd></div><div><dt>Location</dt><dd>{project.location}</dd></div><div><dt>Category</dt><dd>{project.category}</dd></div>{project.area && <div><dt>Area</dt><dd>{project.area}</dd></div>}{project.timeline && <div><dt>Timeline</dt><dd>{project.timeline}</dd></div>}<div><dt>Studio</dt><dd>ZXI Interiors & Contracting</dd></div></dl>
        <Link href="/contact">Discuss your project &#8599;</Link>
      </section>
      {project.gallery.slice(1).map((image, index) => <figure className={`project-gallery-image ${index % 3 === 1 ? 'is-small' : ''}`} key={image.src}><div><Photo image={image} alt={`${project.title} — interior view ${index + 2}`} sizes="(max-width: 991px) 100vw, 65vw" /></div><figcaption>{project.title}<span>{String(index + 2).padStart(2, '0')} / {String(project.gallery.length).padStart(2, '0')}</span></figcaption></figure>)}
      <section className="project-next" style={{ background: next.color }}><p className="folio-eyebrow">Next project</p><Link href={`/projects/${next.slug}`}><div className="project-next-image"><Photo image={next.image} alt={next.title} sizes="50vw" /></div><h2>{next.title} <span>&#8599;</span></h2></Link><Link href="/projects">Back to all projects</Link></section>
    </div>
  </div></>;
}

