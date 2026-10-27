'use client';
import { useRouter } from 'next/navigation';
import { SiteNav } from '@/components/layout/site-nav';
import { Footer } from '@/components/layout/footer';

export function ProjectShell({ logo, children, darkAtTop = false }) {
  const router = useRouter();
  const navigate = (id) => router.push(id === 'portfolio' ? '/projects' : id === 'home' ? '/' : id === 'contact' ? '/contact' : `/#${id}`);
  return <><SiteNav logo={logo} onNavigate={navigate} darkAtTop={darkAtTop} /><main id="main" className="project-main">{children}</main><Footer logo={logo} onNavigate={navigate} /></>;
}
