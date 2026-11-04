'use client';

export function Hero({ heroRef, heroPicRef, heroCopyRef }) {
  return (
    <section
      id="home"
      className="relative h-[100svh] min-h-[660px] overflow-hidden text-white bg-neutral-950"
      ref={heroRef}
    >
      <div
        className="absolute -inset-y-[5%] inset-x-0 h-[110%] w-full will-change-transform"
        ref={heroPicRef}
      >
        <video
          className="hero-video"
          poster="/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/media/hero/ZXI_4K60_Homepage.webm" type="video/webm" />
        </video>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/80 pointer-events-none" />

      <div
        className="relative z-10 h-full max-w-[1720px] mx-auto px-5 sm:px-10 lg:px-16 pt-24 pb-16 flex flex-col md:flex-row md:items-end justify-end md:justify-between gap-8 md:gap-10 will-change-transform"
        ref={heroCopyRef}
      >
        <div className="hero-copy max-w-2xl min-w-0">
          <p className="hero-copy-sub text-base sm:text-lg font-medium text-white/90 mb-6 tracking-tight">
            Dubai’s leading interior fitout company
          </p>
          <div className="hero-split-line overflow-hidden py-0.5">
            <h1 className="hero-title block font-normal leading-[1.12]">
              <span className="hero-title-primary block whitespace-nowrap text-[clamp(1.5rem,4.1vw,55px)] tracking-[-0.04em]">
                Re-imagine your space with
              </span>
              <span className="hero-title-brand block text-[clamp(1.5rem,4.1vw,55px)] tracking-[-0.025em]">
                ZXI Interiors.
              </span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
