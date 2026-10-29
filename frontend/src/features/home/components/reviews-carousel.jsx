'use client';

import { useState, useRef, useMemo, useEffect } from 'react';
import './reviews-carousel.css';
import { GOOGLE_REVIEWS, GOOGLE_RATING_SUMMARY } from '../reviews-data';

function StarIcon({ filled = true, className = 'review-star-svg' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? '#fabb05' : 'none'}
      stroke={filled ? '#fabb05' : '#cbd5e1'}
      strokeWidth="1.2"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ReviewAvatar({ author, avatarUrl }) {
  const [imageError, setImageError] = useState(false);
  const initial = (author || 'Z').trim().charAt(0).toUpperCase();

  if (!avatarUrl || imageError) {
    return <div className="reviewer-avatar-fallback">{initial}</div>;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={avatarUrl}
      alt={author}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setImageError(true)}
      className="reviewer-avatar-img"
    />
  );
}

function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false);
  const bodyRef = useRef(null);
  const text = review.text || '';
  const isLong = text.length > 130;

  const handleToggle = (nextState) => {
    setExpanded(nextState);
    if (!nextState && bodyRef.current) {
      bodyRef.current.scrollTop = 0;
    }
  };

  return (
    <article
      className={`review-card ${expanded ? 'is-expanded' : ''}`}
      aria-label={`Review by ${review.author}`}
    >
      <div className="review-card-header">
        <div className="reviewer-profile">
          <div className="reviewer-avatar-wrap">
            <ReviewAvatar author={review.author} avatarUrl={review.avatar} />
          </div>
          <div className="reviewer-info">
            <h3 className="reviewer-name" title={review.author}>
              {review.author}
            </h3>
            {review.time && <span className="reviewer-time">{review.time}</span>}
          </div>
        </div>

      </div>

      <div className="review-card-stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} filled={i < review.stars} />
        ))}
      </div>

      <div ref={bodyRef} className="review-card-body">
        <p className="review-card-text">
          {isLong && !expanded ? (
            <>
              {text.slice(0, 125).trimEnd().replace(/[\s,.;:!?-]+$/, '')}…{' '}
              <button
                type="button"
                className="review-more-link"
                onClick={() => handleToggle(true)}
              >
                More
              </button>
            </>
          ) : (
            <>
              {text}
              {isLong && expanded && (
                <>
                  {' '}
                  <button
                    type="button"
                    className="review-more-link"
                    onClick={() => handleToggle(false)}
                  >
                    Less
                  </button>
                </>
              )}
            </>
          )}
        </p>
      </div>
    </article>
  );
}

export function ReviewsCarousel() {
  const viewportRef = useRef(null);
  const isPausedRef = useRef(false);

  const displayedReviews = useMemo(() => GOOGLE_REVIEWS.slice(0, 20), []);
  const move = (direction) => {
    const viewport = viewportRef.current;
    const card = viewport?.querySelector('.review-card');
    if (!card) return;
    viewport.scrollBy({
      left: direction * (card.getBoundingClientRect().width + 12),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let inView = false;
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    }, { threshold: 0.25 });
    observer.observe(viewport);

    const timer = window.setInterval(() => {
      if (!inView || isPausedRef.current || reducedMotion.matches || document.hidden) return;
      const card = viewport.querySelector('.review-card');
      if (!card) return;
      const step = card.getBoundingClientRect().width + 12;
      const atEnd = viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - step / 2;
      viewport.scrollTo({ left: atEnd ? 0 : viewport.scrollLeft + step, behavior: 'smooth' });
    }, 4500);

    return () => {
      window.clearInterval(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="reviews"
      className="reviews-section"
      aria-labelledby="reviews-section-heading"
    >
      <div className="reviews-container">
        <div className="reviews-top-bar">
          <div className="reviews-top-title-wrap">
            <h2 id="reviews-section-heading" className="reviews-clean-title">
              Client stories.
            </h2>
          </div>
          <div className="reviews-top-actions">
            <a
              href={GOOGLE_RATING_SUMMARY.googleSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="reviews-clean-rating"
              aria-label={`${GOOGLE_RATING_SUMMARY.average} out of 5 from ${GOOGLE_RATING_SUMMARY.totalReviews} client reviews`}
            >
              <span className="reviews-clean-score">{GOOGLE_RATING_SUMMARY.average}</span>
              <div className="reviews-clean-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <span className="reviews-rating-count">{GOOGLE_RATING_SUMMARY.totalReviews} reviews ↗</span>
            </a>
            <div className="reviews-top-nav" aria-label="Review carousel direction">
              <button
                type="button"
                className="nav-arrow-btn"
                onClick={() => move(-1)}
                aria-label="Previous reviews"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                className="nav-arrow-btn"
                onClick={() => move(1)}
                aria-label="Next reviews"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          ref={viewportRef}
          className="reviews-carousel-viewport"
          role="region"
          aria-label="Client reviews"
          onMouseEnter={() => { isPausedRef.current = true; }}
          onMouseLeave={() => { isPausedRef.current = false; }}
          onFocusCapture={() => { isPausedRef.current = true; }}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) isPausedRef.current = false;
          }}
          onTouchStart={() => { isPausedRef.current = true; }}
          onTouchEnd={() => { window.setTimeout(() => { isPausedRef.current = false; }, 6000); }}
        >
          <div className="reviews-carousel-rail">
            {displayedReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReviewsCarousel;
