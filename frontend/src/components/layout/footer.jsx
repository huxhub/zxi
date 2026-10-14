'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Action } from '@/components/ui/action';

export function Footer({ logo, onNavigate }) {
  return (
    <footer className="w-full m-0 rounded-none bg-neutral-900 text-neutral-300 pt-16 sm:pt-20 pb-8">
      <div className="footer-inner w-full max-w-[1720px] mx-auto px-5 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-12 pb-16">
        <div className="sm:col-span-2 lg:col-span-2">
          <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-white max-w-sm mb-8 leading-snug">
            Let’s talk about your next project
          </h2>
          <Action
            href="/contact"
            onClick={(event) => {
              event.preventDefault();
              onNavigate('contact');
            }}
          >
            Get in touch
          </Action>
        </div>

        <div className="flex flex-col items-start gap-3.5 text-sm">
          <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-2">
            Navigate
          </h3>
          <a
            href="#portfolio"
            className="hover:text-white transition-colors"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('portfolio');
            }}
          >
            Portfolio
          </a>
          <a
            href="#services"
            className="hover:text-white transition-colors"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('services');
            }}
          >
            Services
          </a>
          <Link href="/blog" className="hover:text-white transition-colors">
            Blog & Insights
          </Link>
          <a
            href="#about"
            className="hover:text-white transition-colors"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('about');
            }}
          >
            About us
          </a>
          <a
            href="#advantages"
            className="hover:text-white transition-colors"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('advantages');
            }}
          >
            Why ZXI
          </a>
          <a
            href="#contact"
            className="hover:text-white transition-colors"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('contact');
            }}
          >
            Contacts
          </a>
        </div>

        <div className="flex flex-col items-start gap-3.5 text-sm">
          <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-2">
            Contacts
          </h3>
          <a href="mailto:info@zxi.ae" className="hover:text-white transition-colors">
            info@zxi.ae
          </a>
          <a href="tel:+971565499766" className="hover:text-white transition-colors">
            +971 565 499 766
          </a>
          <a href="tel:+971562321031" className="hover:text-white transition-colors">
            +971 562 321 031
          </a>
          <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mt-4 mb-1">
            Address
          </h3>
          <p className="text-neutral-400">
            Office #808, The Metropolis Tower
            <br />
            Business Bay, Dubai, UAE
          </p>
        </div>

        <div className="flex flex-col items-start gap-3.5 text-sm">
          <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-2">
            Our expertise
          </h3>
          <Link
            href="/services/commercial-fitouts"
            className="hover:text-white transition-colors"
          >
            Commercial fitouts
          </Link>
          <Link
            href="/services/residential-interiors"
            className="hover:text-white transition-colors"
          >
            Residential interiors
          </Link>
          <Link
            href="/services/custom-furniture"
            className="hover:text-white transition-colors"
          >
            Custom furniture & joinery
          </Link>
          <Link
            href="/services/turnkey-contracting"
            className="hover:text-white transition-colors"
          >
            Turnkey Contracting
          </Link>
          <Link
            href="/services/hospitality-wellness"
            className="hover:text-white transition-colors"
          >
            Hospitality & wellness
          </Link>
        </div>
      </div>

      <div className="border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 pt-7 text-xs text-neutral-500">
        <Image
          src={logo?.src || logo || '/zxi-ae-logo.png'}
          alt="ZXI Interiors & Contracting"
          width={90}
          height={46}
          className="brightness-0 invert"
        />
        <span>© ZXI Interiors & Contracting. All rights reserved.</span>
        <a
          href="#home"
          className="hover:text-white transition-colors"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
        >
          Back to top ↑
        </a>
      </div>
    </div>
  </footer>
);
}

export default Footer;
