'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const DEFAULT_PROJECT_TITLES = [
  { title: 'Plug Media', category: 'Commercial fitout' },
  { title: 'MBR Kitchen', category: 'Residential fitout' },
  { title: 'Gemma', category: 'Retail fitout' },
  { title: 'Nora', category: 'Retail fitout' },
  { title: 'Samsara Tribe Yoga', category: 'Studio fitout' },
  { title: 'Mr. Khalid Villa', category: 'Villa interiors' },
];

export function SiteNav({ logo, projects = [], onSelectProject, onNavigate }) {
  const dialog = useRef(null);
  const [open, setOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const projectList = projects && projects.length > 0 ? projects : DEFAULT_PROJECT_TITLES;

  const close = () => {
    dialog.current?.close();
    setOpen(false);
  };

  const handleLinkClick = (id) => {
    close();
    if (onNavigate) {
      onNavigate(id);
    }
  };

  const handleProjectClick = (project) => {
    close();
    if (onSelectProject) {
      onSelectProject(project);
    }
  };

  return (
    <>
      {/* Top Minimalist Header (Full-Time Transparent) */}
      <header
        className="fixed top-0 inset-x-0 z-40 w-full flex items-center justify-between px-6 sm:px-10 md:px-14 py-3 md:py-4 bg-transparent pointer-events-auto mix-blend-difference"
      >
        <a
          href="#home"
          aria-label="ZXI home"
          className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
        >
          <Image
            src={logo?.src || logo || '/zxi-ae-logo.png'}
            alt="ZXI Interiors & Contracting"
            width={84}
            height={36}
            priority
            className="block w-[72px] md:w-[82px] h-auto object-contain brightness-0 invert transition-opacity duration-200 group-hover:opacity-80"
          />
        </a>

        {/* Minimal Two-Line Hamburger Button (=) */}
        <button
          className="group flex flex-col items-end justify-center gap-[5px] w-9 h-9 p-1 cursor-pointer text-white focus:outline-none hover:opacity-80 transition-opacity"
          aria-label="Open navigation menu"
          aria-expanded={open}
          aria-controls="navigation-panel"
          onClick={() => {
            dialog.current?.showModal();
            setOpen(true);
          }}
        >
          <span className="block h-[1.5px] w-5 bg-white transition-all duration-300 group-hover:w-6" />
          <span className="block h-[1.5px] w-5 bg-white transition-all duration-300 group-hover:w-4" />
        </button>
      </header>

      {/* Slide-over Drawer Menu Panel (Right Anchored) */}
      <dialog
        id="navigation-panel"
        ref={dialog}
        className="fixed inset-y-0 right-0 left-auto ml-auto mr-0 m-0 w-full max-w-[460px] md:max-w-[500px] h-dvh bg-white text-neutral-900 border-0 z-50 p-0 shadow-2xl backdrop:bg-black/65 backdrop:backdrop-blur-sm"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="h-full flex flex-col justify-between p-8 sm:p-12 md:p-14 relative bg-white overflow-y-auto">
          {/* Top-Right Close Button */}
          <button
            className="absolute right-6 top-6 md:right-8 md:top-8 w-10 h-10 flex items-center justify-center text-neutral-900 hover:text-neutral-500 cursor-pointer transition-transform duration-200 hover:rotate-90 focus:outline-none"
            aria-label="Close navigation"
            onClick={close}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Nav Menu Links */}
          <nav className="flex flex-col gap-4 sm:gap-5 mt-8 md:mt-10" aria-label="Main navigation">
            <button
              onClick={() => handleLinkClick('home')}
              className="text-left text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight text-neutral-900 hover:text-neutral-500 transition-colors cursor-pointer focus:outline-none"
            >
              Home
            </button>

            {/* Portfolio with Link to /projects and Expandable Project Titles */}
            <div>
              <div className="w-full flex items-center justify-between group">
                <Link
                  href="/projects"
                  onClick={close}
                  className="text-left text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight text-neutral-900 hover:text-neutral-500 transition-colors cursor-pointer focus:outline-none"
                >
                  Portfolio
                </Link>
                <button
                  onClick={() => setPortfolioOpen(!portfolioOpen)}
                  aria-label="Toggle projects list"
                  className="hidden"
                >
                  <svg
                    className={`w-5 h-5 text-neutral-700 transition-transform duration-300 ${
                      portfolioOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Sub-projects accordion dropdown */}
              <div
                className={`hidden grid transition-all duration-300 ease-in-out ${
                  portfolioOpen ? 'grid-rows-[1fr] opacity-100 mt-3 pt-2' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden flex flex-col gap-2.5 pl-4 border-l-2 border-neutral-200 text-base sm:text-lg font-light text-neutral-600 max-h-56 overflow-y-auto">
                  <Link
                    href="/projects"
                    onClick={close}
                    className="text-left font-medium text-neutral-900 hover:text-neutral-500 transition-colors cursor-pointer focus:outline-none"
                  >
                    All Projects Page →
                  </Link>
                  {projectList.map((project, idx) => (
                    <button
                      key={`${project.title}-${idx}`}
                      onClick={() => handleProjectClick(project)}
                      className="text-left hover:text-neutral-950 transition-colors cursor-pointer focus:outline-none flex items-center justify-between gap-3 group/item py-0.5"
                    >
                      <span className="truncate">{project.title}</span>
                      <span className="text-xs text-neutral-400 group-hover/item:text-neutral-600 whitespace-nowrap">
                        {project.category || project.location}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="w-full flex items-center justify-between text-left text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight text-neutral-900 hover:text-neutral-500 transition-colors cursor-pointer focus:outline-none group"
              >
                <span className="flex items-center gap-3">
                  Services
                  <svg
                    className={`w-4 h-4 md:w-5 md:h-5 text-neutral-700 transition-transform duration-300 ${
                      servicesOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              {/* Sub-services accordion dropdown */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  servicesOpen ? 'grid-rows-[1fr] opacity-100 mt-3 pt-2' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden flex flex-col gap-2.5 pl-4 border-l-2 border-neutral-200 text-lg sm:text-xl font-light text-neutral-600">
                  <button
                    onClick={() => handleLinkClick('services')}
                    className="text-left hover:text-neutral-950 transition-colors cursor-pointer focus:outline-none"
                  >
                    Interior Design
                  </button>
                  <button
                    onClick={() => handleLinkClick('services')}
                    className="text-left hover:text-neutral-950 transition-colors cursor-pointer focus:outline-none"
                  >
                    Commercial Fitouts
                  </button>
                  <button
                    onClick={() => handleLinkClick('services')}
                    className="text-left hover:text-neutral-950 transition-colors cursor-pointer focus:outline-none"
                  >
                    Residential Fitouts
                  </button>
                  <button
                    onClick={() => handleLinkClick('services')}
                    className="text-left hover:text-neutral-950 transition-colors cursor-pointer focus:outline-none"
                  >
                    Custom Furniture
                  </button>
                  <button
                    onClick={() => handleLinkClick('about')}
                    className="text-left hover:text-neutral-950 transition-colors cursor-pointer focus:outline-none"
                  >
                    About us & Process
                  </button>
                </div>
              </div>
            </div>

            <Link
              href="/blog"
              onClick={close}
              className="text-left text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight text-neutral-900 hover:text-neutral-500 transition-colors cursor-pointer focus:outline-none"
            >
              Blog
            </Link>

            <button
              onClick={() => handleLinkClick('contact')}
              className="text-left text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight text-neutral-900 hover:text-neutral-500 transition-colors cursor-pointer focus:outline-none"
            >
              Contacts
            </button>
          </nav>

          {/* Bottom CTA Section */}
          <div className="mt-auto pt-8 border-t border-neutral-100 flex flex-col gap-4">
            <p className="text-xl sm:text-2xl font-normal text-neutral-900 tracking-tight leading-snug">
              Let’s talk about your next project
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="tel:+971565499766"
                className="inline-flex items-center gap-2 bg-[#1c1c1c] text-white hover:bg-neutral-800 text-[14px] font-medium px-5 py-3.5 rounded-[4px] transition-colors"
              >
                <span>Schedule a call</span>
                <span className="text-sm font-light" aria-hidden="true">
                  ↗
                </span>
              </a>
              <button
                onClick={() => handleLinkClick('contact')}
                className="inline-flex items-center justify-center bg-[#1c1c1c] text-white hover:bg-neutral-800 text-[14px] font-medium px-5 py-3.5 rounded-[4px] transition-colors cursor-pointer focus:outline-none"
              >
                Discuss the project
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default SiteNav;
