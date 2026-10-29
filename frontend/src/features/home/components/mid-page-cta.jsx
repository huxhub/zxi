import Link from 'next/link';

export function MidPageCta() {
  return (
    <section className="mid-page-cta" aria-labelledby="project-cta-heading">
      <div className="mid-page-cta__copy">
        <p>Have a space in mind?</p>
        <h2 id="project-cta-heading">Your Vision. Our Craft. Extraordinary Spaces.</h2>
      </div>
      <Link href="/contact">
        <span>Book a Consultation</span>
        <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
