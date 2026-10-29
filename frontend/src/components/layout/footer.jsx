'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Action } from '@/components/ui/action';

export function Footer({ logo, onNavigate }) {
  const navigate = (event, id) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(id);
  };
  return (
    <footer className="w-full m-0 rounded-none bg-[#E8DDCC] text-[#282722] border-t border-[#D4C8B9] pt-16 sm:pt-20 pb-8">
      <div className="footer-inner w-full max-w-[1720px] mx-auto px-5 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-12 pb-16">
        <div className="sm:col-span-2 lg:col-span-2">
          <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-[#282722] max-w-sm mb-8 leading-snug">
            Let’s talk about your next project
          </h2>
          <Action
            href="/contact"
            light
            onClick={(event) => {
              navigate(event, 'contact');
            }}
          >
            Get in touch
          </Action>
        </div>

        <div className="flex flex-col items-start gap-3.5 text-sm">
          <h3 className="text-xs uppercase tracking-widest text-[#4C4942] font-semibold mb-2">
            Navigate
          </h3>
          <Link
            href="/projects"
            className="text-[#282722] hover:text-[#5C574E] transition-colors"
            onClick={(e) => {
              navigate(e, 'portfolio');
            }}
          >
            Portfolio
          </Link>
          <Link
            href="/services"
            className="text-[#282722] hover:text-[#5C574E] transition-colors"
            onClick={(e) => {
              navigate(e, 'services');
            }}
          >
            Services
          </Link>
          <Link href="/blog" className="text-[#282722] hover:text-[#5C574E] transition-colors">
            Blog & Insights
          </Link>
          <Link href="/packages" className="text-[#282722] hover:text-[#5C574E] transition-colors">
            Packages
          </Link>
          <Link
            href="/#about"
            className="text-[#282722] hover:text-[#5C574E] transition-colors"
            onClick={(e) => {
              navigate(e, 'about');
            }}
          >
            About us
          </Link>
          <Link
            href="/#advantages"
            className="text-[#282722] hover:text-[#5C574E] transition-colors"
            onClick={(e) => {
              navigate(e, 'advantages');
            }}
          >
            Why ZXI
          </Link>
          <Link
            href="/contact"
            className="text-[#282722] hover:text-[#5C574E] transition-colors"
            onClick={(e) => {
              navigate(e, 'contact');
            }}
          >
            Contacts
          </Link>
        </div>

        <div className="flex flex-col items-start gap-3.5 text-sm">
          <h3 className="text-xs uppercase tracking-widest text-[#4C4942] font-semibold mb-2">
            Contacts
          </h3>
          <a href="mailto:info@zxi.ae" className="text-[#282722] hover:text-[#5C574E] transition-colors">
            info@zxi.ae
          </a>
          <a href="tel:+971565499766" className="text-[#282722] hover:text-[#5C574E] transition-colors">
            +971 565 499 766
          </a>
          <a href="tel:+971562321031" className="text-[#282722] hover:text-[#5C574E] transition-colors">
            +971 562 321 031
          </a>
          <h3 className="text-xs uppercase tracking-widest text-[#4C4942] font-semibold mt-4 mb-1">
            Address
          </h3>
          <p className="text-[#4C4942]">
            Office #808, The Metropolis Tower
            <br />
            Business Bay, Dubai, UAE
          </p>
        </div>

        <div className="flex flex-col items-start gap-3.5 text-sm">
          <h3 className="text-xs uppercase tracking-widest text-[#4C4942] font-semibold mb-2">
            Our expertise
          </h3>
          <Link
            href="/services/commercial-fitouts"
            className="text-[#282722] hover:text-[#5C574E] transition-colors"
          >
            Commercial fitouts
          </Link>
          <Link
            href="/services/residential-interiors"
            className="text-[#282722] hover:text-[#5C574E] transition-colors"
          >
            Residential interiors
          </Link>
          <Link
            href="/services/custom-furniture"
            className="text-[#282722] hover:text-[#5C574E] transition-colors"
          >
            Custom furniture & joinery
          </Link>
          <Link
            href="/services/turnkey-contracting"
            className="text-[#282722] hover:text-[#5C574E] transition-colors"
          >
            Turnkey Contracting
          </Link>
          <Link
            href="/services/hospitality-wellness"
            className="text-[#282722] hover:text-[#5C574E] transition-colors"
          >
            Hospitality & wellness
          </Link>
        </div>
      </div>

      <div className="border-t border-[#282722]/20 flex flex-col sm:flex-row items-center justify-between gap-4 pt-7 text-xs text-[#4C4942]">
        <Image
          src={logo?.src || logo || '/zxi-ae-logo.png'}
          alt="ZXI Interiors & Contracting"
          width={500}
          height={97}
          style={{ height: 'auto' }}
          className="h-auto w-[132px] sm:w-[156px] brightness-0"
        />
        <span>© ZXI Interiors & Contracting. All rights reserved.</span>
        <Link
          href="/"
          className="text-[#282722] hover:text-[#5C574E] transition-colors"
          onClick={(e) => {
            navigate(e, 'home');
          }}
        >
          Back to top ↑
        </Link>
      </div>
    </div>
  </footer>
);
}

export default Footer;
