'use client';

import { useEffect, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

export function RouteScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => { window.history.scrollRestoration = previous; };
  }, []);

  useLayoutEffect(() => {
    // Section links keep Next.js's normal anchor navigation.
    if (window.location.hash) return;
    const reset = () => {
      if (window.location.hash) return;
      window.dispatchEvent(new Event('app:reset-scroll'));
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };
    reset();
    // Run once after the new page's smooth-scroll and pinned sections mount.
    const frame = requestAnimationFrame(reset);
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
