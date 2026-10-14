import React, { useState, useEffect, useRef } from 'react';
import { CUSTOMER_REVIEWS } from '../data/homeData';

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(2);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const totalCards = CUSTOMER_REVIEWS.length;

  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(window.innerWidth <= 991 ? 1 : 2);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, totalCards - cardsPerView);

  // Auto-play timer with 2200ms cycle (matching old project) and pause on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 2200);
    return () => clearInterval(timer);
  }, [maxIndex, isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const threshold = 35;
    if (touchEndX.current < touchStartX.current - threshold) {
      handleNext();
    } else if (touchEndX.current > touchStartX.current + threshold) {
      handlePrev();
    }
  };

  const cardWidthPercent = 100 / cardsPerView;
  const translateVal = currentIndex * cardWidthPercent;

  return (
    <section id="customer-reviews-section" className="py-section reviews-section-wrapper">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="reviews-header">
          <span className="architectural-tag centered">— VERIFIED PLOT BUYER TESTIMONIALS —</span>
          <h2 className="reviews-main-title">
            WHAT OUR CLIENTS SAY ABOUT SHASHTIKA
          </h2>
          <p className="reviews-sub-desc">
            Real experiences and trust stories from plot buyers and residents across Tamil Nadu.
          </p>
        </div>

        {/* Reviews Slider Viewport */}
        <div
          className="reviews-slider-viewport"
          id="reviews-slider-viewport"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="reviews-slider-track"
            id="reviews-slider-track"
            style={{ transform: `translateX(-${translateVal}%)` }}
          >
            {CUSTOMER_REVIEWS.map((rev, idx) => {
              const avatarClass =
                rev.theme === 'espresso'
                  ? 'avatar-espresso'
                  : rev.theme === 'gold'
                  ? 'avatar-gold'
                  : rev.theme === 'terracotta'
                  ? 'avatar-terracotta'
                  : 'avatar-mocha';

              return (
                <div
                  key={idx}
                  className="review-card-item"
                  style={{ width: `${cardWidthPercent}%` }}
                >
                  <div className="review-card">
                    {/* Top Row: User Icon & Glowing Gold Star Pill */}
                    <div className="review-card-top">
                      <div className="review-user-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                        </svg>
                      </div>

                      <div className="star-rating-pill">
                        <div className="stars-gold-wrap">
                          <span className="star-gold">★</span>
                          <span className="star-gold">★</span>
                          <span className="star-gold">★</span>
                          <span className="star-gold">★</span>
                          <span className="star-gold">★</span>
                        </div>
                        <span className="rating-num">{rev.rating || "5.0"}</span>
                      </div>
                    </div>

                    {/* Review Body */}
                    <p className="review-text">
                      "{rev.text}"
                    </p>

                    {/* Author Row */}
                    <div className="review-author-row">
                      <div className={`review-avatar ${avatarClass}`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                      <div className="author-details">
                        <h4 className="author-name">{rev.name}</h4>
                        <p className="author-role">
                          {rev.role} — <span className="text-gold-dark">{rev.location}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Slider Controls Row */}
        <div className="reviews-controls-row">
          <button
            type="button"
            className="reviews-nav-btn prev-btn"
            id="reviews-prev-btn"
            onClick={handlePrev}
            aria-label="Previous Reviews"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          <div className="reviews-dots-container" id="reviews-dots-container">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to review slide ${idx + 1}`}
                className={`review-dot ${idx === currentIndex ? 'active' : ''}`}
              />
            ))}
          </div>

          <button
            type="button"
            className="reviews-nav-btn next-btn"
            id="reviews-next-btn"
            onClick={handleNext}
            aria-label="Next Reviews"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
