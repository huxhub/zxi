import Link from 'next/link';

export function MidPageCta() {
  return (
    <section className="mid-page-cta" aria-labelledby="project-cta-heading">
      <p>Have a space in mind?</p>
      <h2 id="project-cta-heading">Let&rsquo;s shape it together.</h2>
      <Link href="/contact">
        <span>Book a Consultation</span>
        <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
