'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function PageBackButton() {
  const pathname = usePathname();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    setHasScrolled(false);

    const revealBackButton = () => {
      if (window.scrollY > 72) setHasScrolled(true);
    };

    window.addEventListener('scroll', revealBackButton, { passive: true });
    return () => window.removeEventListener('scroll', revealBackButton);
  }, [pathname]);

  if (pathname === '/' || pathname.startsWith('/packages/')) return null;

  return (
    <button
      type="button"
      onClick={() => {
        if (window.history.length > 1) window.history.back();
        else window.location.assign('/');
      }}
      className={`page-back-button ${pathname === '/projects' ? 'project-archive-back-button' : ''} fixed left-6 top-[calc(var(--site-header-height,72px)+14px)] z-[45] grid h-12 w-12 place-items-center rounded-full bg-white text-neutral-900 transition-[opacity,transform,background-color] duration-300 hover:bg-neutral-100 focus-visible:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 sm:left-10 md:left-14 ${
        hasScrolled ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
      }`}
      aria-label="Go back"
      title="Go back"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M19 12H5" />
        <path d="m11 18-6-6 6-6" />
      </svg>
    </button>
  );
}
