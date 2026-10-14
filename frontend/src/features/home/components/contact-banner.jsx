'use client';

import { useRouter } from 'next/navigation';
import { Photo } from '@/components/ui/photo';
import { Action } from '@/components/ui/action';

export function ContactBanner({ cta, ctaPicRef }) {
  const router = useRouter();

  return (
    <section
      id="contact"
      className="relative h-[85svh] md:h-[100svh] min-h-[580px] overflow-hidden text-white bg-neutral-950 m-1 sm:m-2 rounded-lg"
    >
      <div
        className="absolute -inset-y-[30%] inset-x-0 h-[160%] w-full will-change-transform"
        ref={ctaPicRef}
      >
        <Photo
          image={cta}
          alt="Bright residential kitchen and dining interior by ZXI"
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 pointer-events-none" />

      <div className="relative z-10 h-full max-w-[1720px] mx-auto px-5 sm:px-10 lg:px-16 py-16 md:py-24 flex flex-col justify-end items-start gap-8">
        <p className="text-xs uppercase tracking-widest text-white/70 font-medium">
          Start Your Transformation
        </p>
        <h2 className="max-w-xl text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-tight">
          Your dream space is just a call away.
        </h2>
        <div className="flex gap-3 flex-wrap">
          <Action href="tel:+971565499766" muted>
            Schedule a call
          </Action>
          <Action
            href="/contact"
            onClick={(event) => {
              event.preventDefault();
              router.push('/contact');
            }}
          >
            Discuss the project
          </Action>
        </div>
      </div>
    </section>
  );
}

export default ContactBanner;
