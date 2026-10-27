'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DEFAULT_PROJECT_TITLES = [
  { title: 'Samsara Tribe Yoga', category: 'Hospitality fitout' },
  { title: 'Ikigai Pilates Studio', category: 'Studio fitout' },
  { title: 'City Walk', category: 'Residential fitout' },
  { title: 'Gemma', category: 'Retail fitout' },
  { title: 'Nora', category: 'Retail fitout' },
  { title: 'Plug Media', category: 'Commercial fitout' },
  { title: 'MBR Kitchen', category: 'Residential fitout' },
  { title: 'Mr. Khalid Villa', category: 'Villa interiors' },
];


export function SiteNav({ logo, projects = [], onSelectProject, onNavigate, darkAtTop = false }) {
  const pathname = usePathname();
  const dialog = useRef(null);
  const header = useRef(null);
  const [open, setOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [packagesOpen, setPackagesOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero =
        document.getElementById('home') ||
        document.querySelector('.contact-hero') ||
        document.querySelector('main > header.relative') ||
        document.querySelector('[data-hero]');

      if (hero) {
        const heroBottom = hero.getBoundingClientRect().bottom;
        setIsPastHero(heroBottom <= 70);
      } else {
        setIsPastHero(window.scrollY > 40);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Keep sticky controls below the actual header at every responsive size.
  useEffect(() => {
    const updateHeight = () => {
      if (!header.current) return;
      document.documentElement.style.setProperty('--site-header-height', `${Math.ceil(header.current.getBoundingClientRect().height)}px`);
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(header.current);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty('--site-header-height');
    };
  }, []);

  const projectList = projects && projects.length > 0 ? projects : DEFAULT_PROJECT_TITLES;

  const close = () => {
    dialog.current?.close();
    setOpen(false);
  };

  const handleLinkClick = (id) => {
    close();
    if (onNavigate) {
      onNavigate(id);
      return;
    }
    const routes = { home: '/', portfolio: '/projects', services: '/services', contact: '/contact' };
    window.location.assign(routes[id] || `/#${id}`);
  };

  const handleProjectClick = (project) => {
    close();
    if (onSelectProject) {
      onSelectProject(project);
    }
  };

  return (
    <>
      {/* Top Header: Transparent in hero section, compact white background after */}
      <header
        ref={header}
        className={`fixed top-0 inset-x-0 z-40 w-full flex items-center justify-between px-6 sm:px-10 md:px-14 transition-all duration-300 pointer-events-auto ${pathname === '/' && !isPastHero ? 'home-hero-nav' : ''} ${
          isPastHero
            ? 'py-1 md:py-1.5 bg-white border-b border-neutral-100 shadow-xs'
            : 'py-3 md:py-4 bg-transparent'
        }`}
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
            width={160}
            height={40}
            priority
            className={`block ${isPastHero ? 'w-[120px] md:w-[130px]' : 'w-[140px]'} h-auto object-contain transition-all duration-300 group-hover:opacity-80 ${
            isPastHero || darkAtTop ? '' : 'brightness-0 invert'
            }`}
          />
        </a>

        {/* Minimal Two-Line Hamburger Button */}
        <button
          className={`group flex ${isPastHero ? 'h-8 md:h-8.5' : 'h-10 md:h-11'} items-center justify-end gap-3 p-1 cursor-pointer focus:outline-none transition-colors nav-menu-btn ${
            isPastHero || darkAtTop ? 'text-neutral-900 hover:opacity-70' : 'text-white hover:opacity-80'
          }`}
          aria-label="Open navigation menu"
          aria-expanded={open}
          aria-controls="navigation-panel"
          onClick={() => {
            dialog.current?.showModal();
            setOpen(true);
          }}
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] nav-menu-text">Menu</span>
          <span className="flex flex-col items-end gap-[6px] nav-menu-bars" aria-hidden="true">
            <span
              className={`block h-[2px] w-8 nav-menu-bar-top transition-all duration-300 ${
                isPastHero || darkAtTop ? 'bg-neutral-900' : 'bg-white'
              }`}
            />
            <span
              className={`block h-[2px] w-5 nav-menu-bar-bottom transition-all duration-300 group-hover:w-8 ${
                isPastHero || darkAtTop ? 'bg-neutral-900' : 'bg-white'
              }`}
            />
          </span>
        </button>
      </header>

      {/* Slide-over Drawer Menu Panel (Right Anchored) */}
      <dialog
        id="navigation-panel"
        ref={dialog}
        className="fixed inset-y-0 right-0 left-auto ml-auto mr-0 m-0 h-dvh w-[450px] max-w-[calc(100vw-24px)] border-0 bg-white p-0 text-neutral-900 shadow-2xl backdrop:bg-black/65 backdrop:backdrop-blur-sm z-50"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="h-full flex flex-col justify-between p-7 sm:p-9 md:p-11 relative bg-white overflow-y-auto">
          {/* Top-Right Close Button */}
          <button
            className="absolute right-5 top-5 md:right-7 md:top-7 w-9 h-9 flex items-center justify-center text-neutral-900 hover:text-neutral-500 cursor-pointer transition-transform duration-200 hover:rotate-90 focus:outline-none"
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
          <nav className="main-drawer-nav flex flex-col gap-2.5 sm:gap-3 mt-7 md:mt-8" aria-label="Main navigation">
            <button
              onClick={() => handleLinkClick('home')}
              className="text-left text-lg sm:text-xl md:text-2xl font-normal tracking-tight text-neutral-900 hover:text-[#c5a059] transition-colors cursor-pointer focus:outline-none"
            >
              Home
            </button>

            {/* Portfolio with Link to /projects and Expandable Project Titles */}
            <div>
              <div className="w-full flex items-center justify-between group">
                <Link
                  href="/projects"
                  onClick={close}
                  className="text-left text-lg sm:text-xl md:text-2xl font-normal tracking-tight text-neutral-900 hover:text-[#c5a059] transition-colors cursor-pointer focus:outline-none"
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
              <div className="relative flex items-stretch justify-between">
                <Link
                  href="/services"
                  onClick={close}
                  className="text-left text-lg sm:text-xl md:text-2xl font-normal tracking-tight text-neutral-900 hover:text-[#c5a059] transition-colors cursor-pointer focus:outline-none"
                >
                  Services
                </Link>
                <button
                  onClick={() => {
                    setServicesOpen((expanded) => {
                      const next = !expanded;
                      if (next) setPackagesOpen(false);
                      return next;
                    });
                  }}
                  aria-label="Toggle services list"
                  aria-expanded={servicesOpen}
                  aria-controls="navigation-services"
                  className="absolute right-0 top-1/2 flex min-h-11 min-w-11 -translate-y-1/2 cursor-pointer items-center justify-center text-neutral-700 transition-colors hover:text-[#c5a059] focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <svg
                    className={`h-4 w-4 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              </div>
              <div id="navigation-services" inert={!servicesOpen} className={`grid transition-all duration-300 ease-out ${servicesOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden border-l border-neutral-300 pl-4">
                  <div className="flex flex-col gap-2 pb-1 text-sm text-neutral-500 sm:text-base">
                    {[
                      ['Commercial Fitouts', 'commercial-fitouts'],
                      ['Residential Interiors', 'residential-interiors'],
                      ['Turnkey Contracting', 'turnkey-contracting'],
                      ['Custom Furniture', 'custom-furniture'],
                      ['Hospitality & Wellness', 'hospitality-wellness'],
                    ].map(([label, slug]) => (
                      <Link key={slug} href={`/services/${slug}`} onClick={close} className="w-fit transition-colors hover:text-[#c5a059] focus:outline-none">
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="relative flex items-stretch justify-between">
                <Link
                  href="/packages"
                  onClick={close}
                  className="text-left text-lg sm:text-xl md:text-2xl font-normal tracking-tight text-neutral-900 hover:text-[#c5a059] transition-colors cursor-pointer focus:outline-none"
                >
                  Packages
                </Link>
                <button
                  onClick={() => {
                    setPackagesOpen((expanded) => {
                      const next = !expanded;
                      if (next) setServicesOpen(false);
                      return next;
                    });
                  }}
                  aria-label="Toggle packages list"
                  aria-expanded={packagesOpen}
                  aria-controls="navigation-packages"
                  className="absolute right-0 top-1/2 flex min-h-11 min-w-11 -translate-y-1/2 cursor-pointer items-center justify-center text-neutral-700 transition-colors hover:text-[#c5a059] focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <svg
                    className={`h-4 w-4 transition-transform duration-300 ${packagesOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              </div>
              <div
                id="navigation-packages"
                inert={!packagesOpen}
                className={`grid transition-all duration-300 ease-out ${packagesOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden border-l border-neutral-300 pl-4">
                  <div className="flex flex-col gap-2 pb-1 text-sm text-neutral-500 sm:text-base">
                    {[
                      ['Interior Design', 'interior-design'],
                      ['F&B Shops', 'fb-shops'],
                      ['Premium Residential', 'premium'],
                      ['Office Fit-Out', 'office-fitout'],
                    ].map(([label, slug]) => (
                      <Link key={slug} href={`/packages/${slug}`} onClick={close} className="w-fit transition-colors hover:text-[#c5a059] focus:outline-none">
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/blog"
              onClick={close}
              className="text-left text-lg sm:text-xl md:text-2xl font-normal tracking-tight text-neutral-900 hover:text-[#c5a059] transition-colors cursor-pointer focus:outline-none"
            >
              Blog
            </Link>

            <button
              onClick={() => handleLinkClick('contact')}
              className="text-left text-lg sm:text-xl md:text-2xl font-normal tracking-tight text-neutral-900 hover:text-[#c5a059] transition-colors cursor-pointer focus:outline-none"
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
