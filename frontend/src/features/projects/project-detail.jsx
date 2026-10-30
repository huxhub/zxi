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
      gsap.fromTo(root.current.querySelector('.project-thumbnail'), { clipPath: 'inset(100% 0 0)' }, { clipPath: 'inset(0% 0 0)', duration: 1.2, ease: 'expo.out', clearProps: 'clipPath' });
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

  const detailImages = project.gallery.slice(1);
  const thumbImage = project.introImage
    || project.gallery.find((image) => (image.aspectRatio || image.width / image.height) >= 1.25)
    || detailImages[0]
    || project.image;
  const storyImages = detailImages.filter((image) => image.src !== thumbImage.src);

  return <>
    <div className="project-story" ref={root} style={{ '--project-color': project.color }}>
    <div className="project-track">
      <section className="project-cover">
        <div className="project-title-panel">
          <Link className="project-back" href="/projects">&#8598; All projects</Link>
          <div className="project-thumbnail">
            <div>
              <Photo image={thumbImage} alt={`${project.title} detail`} priority sizes="(max-width: 991px) 100vw, 60vw" />
            </div>
          </div>
          <div className="project-title-content">
            <h1>{project.title}</h1>
            <div className="project-thumbnail-meta" aria-label="Project details">
              <span>{project.location}</span>
              <span>{project.category}</span>
              <span>{project.scope}</span>
            </div>
          </div>
          <span className="project-scroll-cue">Scroll to discover &#8600;</span>
        </div>
      </section>
      <section className="project-information">
        <h2>{project.scope}<br />in {project.location}.</h2>
        <dl><div><dt>Project</dt><dd>{project.title}</dd></div><div><dt>Location</dt><dd>{project.location}</dd></div><div><dt>Category</dt><dd>{project.category}</dd></div>{project.area && <div><dt>Area</dt><dd>{project.area}</dd></div>}{project.timeline && <div><dt>Timeline</dt><dd>{project.timeline}</dd></div>}<div><dt>Studio</dt><dd>ZXI Interiors & Contracting</dd></div></dl>
        <Link href="/contact">Discuss your project &#8599;</Link>
      </section>
      {storyImages.map((image, index) => (
        <figure className="project-gallery-image" key={image.src}>
          <div>
            <Photo image={image} alt={`${project.title} — interior view ${index + 2}`} sizes="(max-width: 991px) 100vw, 45vw" />
          </div>
          <figcaption>
            {project.title}
            <span>{String(index + 2).padStart(2, '0')} / {String(storyImages.length + 1).padStart(2, '0')}</span>
          </figcaption>
        </figure>
      ))}
      <section className="project-next" style={{ background: next.color }}>
        <p className="folio-eyebrow">Next project</p>
        <Link href={`/projects/${next.slug}`}>
          <div className="project-next-image">
            <Photo image={next.image} alt={next.title} sizes="50vw" />
          </div>
          <h2>{next.title} <span>&#8599;</span></h2>
        </Link>
        <Link href="/projects">Back to all projects</Link>
      </section>
    </div>
  </div></>;
}
