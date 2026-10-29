'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Photo } from '@/components/ui/photo';

export function ProjectArchive({ projects, standalone = false }) {
  const [filter, setFilter] = useState('All');
  const visible = filter === 'All' ? projects : projects.filter((project) => project.category === filter);
  function selectCategory(category) {
    setFilter(category);
  }
  return (
    <section id="portfolio" className="folio">
      <div className="folio-intro">
        <p className="folio-eyebrow">ZXI — Selected projects</p>
        {standalone ? <h1 className="folio-heading">Considered spaces. Distinctive interiors.<br />Made for living.</h1> : <h2 className="folio-heading">Considered spaces.<br />Distinctive interiors.<br />Made for living.</h2>}
      </div>
      <nav className="folio-filters" aria-label="Filter projects">
        {['All', 'Residential', 'Retail', 'Hospitality', 'Commercial'].map((category) => <button key={category} type="button" aria-pressed={filter === category} onClick={() => selectCategory(category)}>{category}</button>)}
      </nav>
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

