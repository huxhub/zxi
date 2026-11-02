export function MidPageCta() {
  return (
    <section className="mid-page-cta" aria-labelledby="project-cta-heading">
      <div className="mid-page-cta__copy">
        <p>Have a space in mind?</p>
        <h2 id="project-cta-heading">Your Vision. Our Craft. Extraordinary Spaces.</h2>
      </div>
      <a
        href="/brochure.pdf"
        download="ZXI-Interiors-Brochure.pdf"
        aria-label="Download Brochure"
      >
        <span>Download Brochure</span>
        <span aria-hidden="true">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </span>
      </a>
    </section>
  );
}
