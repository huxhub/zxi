'use client';

import Link from 'next/link';
import { Photo } from '@/components/ui/photo';
import { Action } from '@/components/ui/action';

export function Portfolio({ projects }) {
  const displayedProjects = (projects || []).slice(0, 5);
  return (
    <section id="portfolio" className="relative bg-[#f7f7f7] pt-24 md:pt-36 pb-16 md:pb-24">
      <div className="max-w-[1720px] mx-auto px-5 sm:px-10 lg:px-16 text-center mb-16 md:mb-20">
        <p className="text-xs uppercase tracking-widest text-neutral-500 font-medium mb-3">Selected Portfolio</p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-neutral-900">Featured Projects</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-2 px-2 max-w-[1920px] mx-auto">
        {displayedProjects.map((project, index) => {
          const isTwoCols = [2, 3, 4].includes(index);
          return (
            <Link key={`${project.slug}-${index}`} href={`/projects/${project.slug}`}
              className={`project-card group relative overflow-hidden bg-neutral-900 rounded-sm cursor-pointer will-change-transform col-span-1 ${isTwoCols ? 'md:col-span-2 aspect-[0.85]' : 'md:col-span-3 aspect-[0.84]'}`}
              aria-label={`View ${project.title}, ${project.location}`}>
              <div className="project-card-img-wrap absolute -inset-y-[10%] inset-x-0 h-[120%] w-full will-change-transform">
                <Photo image={project.image} alt={`${project.title} — ${project.category} by ZXI`}
                  sizes={isTwoCols ? '(max-width: 767px) 100vw, 33vw' : '(max-width: 767px) 100vw, 50vw'}
                  className="transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-90" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 inset-x-6 z-10 flex justify-between items-end gap-4">
                <div className="relative"><h3 className="text-lg sm:text-xl font-medium tracking-tight text-white">{project.title}</h3>
                  <div className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-white scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
                </div>
                <span className="text-sm text-white/80 whitespace-nowrap">{project.location}</span>
              </div>
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 px-6 py-3.5 rounded-full bg-white/95 text-neutral-900 text-sm font-medium shadow-xl pointer-events-none whitespace-nowrap" aria-hidden="true">View project &#8599;</span>
            </Link>
          );
        })}
      </div>
      <div className="flex justify-center items-center mt-12 md:mt-16"><Action dark href="/projects">View all projects</Action></div>
    </section>
  );
}
export default Portfolio;
