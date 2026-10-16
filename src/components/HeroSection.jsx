import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HERO_STATS } from '../data/homeData';

export default function HeroSection({ isLoaded = true, homeNavCount = 0 }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [counts, setCounts] = useState(HERO_STATS.map(() => 0));
  const animFrameRef = useRef(null);
  const bannerRef = useRef(null);

  // Dual slide auto-timer (6 seconds cycle)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev === 0 ? 1 : 0));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Running number counter animation with smooth cubic ease-out & stagger
  const startCounters = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    // Reset to zero immediately so user clearly sees the odometer running motion
    setCounts(HERO_STATS.map(() => 0));

    const startTime = performance.now();
    // Wave stagger: 20 yrs (1300ms), 8+ layouts (1500ms), 4 ongoing (1200ms), 150+ houses (1700ms), 850+ customers (1900ms)
    const durations = [1300, 1500, 1200, 1700, 1900];

    const update = (now) => {
      const elapsed = now - startTime;
      let allCompleted = true;

      const nextCounts = HERO_STATS.map((stat, idx) => {
        const duration = durations[idx] || 1500;
        const progress = Math.min(elapsed / duration, 1);
        if (progress < 1) allCompleted = false;

        // Smooth cubic ease-out deceleration
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        return Math.floor(easeProgress * stat.target);
      });

      setCounts(nextCounts);

      if (!allCompleted) {
        animFrameRef.current = requestAnimationFrame(update);
      } else {
        setCounts(HERO_STATS.map((s) => s.target));
      }
    };

    animFrameRef.current = requestAnimationFrame(update);
  }, []);

  // Trigger running motion when LoadingScreen finishes (isLoaded=true) or on home navigation
  useEffect(() => {
    if (!isLoaded) return;

    // Small 180ms delay for visual clarity as the curtain lifts
    const timeout = setTimeout(() => {
      startCounters();
    }, 180);

    return () => {
      clearTimeout(timeout);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isLoaded, homeNavCount, startCounters]);

  // Re-run animation if user clicks "Home" directly in drawer/header via hash
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (!hash || hash === '#' || hash === '#home') {
        startCounters();
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [startCounters]);

  // IntersectionObserver: If user scrolls away and scrolls back into Hero stats, re-run smoothly
  useEffect(() => {
    if (!bannerRef.current || !window.IntersectionObserver) return;

    let hasBeenVisible = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasBeenVisible) {
            hasBeenVisible = true;
            startCounters();
          } else if (!entry.isIntersecting) {
            hasBeenVisible = false;
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(bannerRef.current);
    return () => observer.disconnect();
  }, [startCounters]);

  return (
    <>
      <section className="hero-100vh-section hero-section">
      {/* Full Entrance Arch & Villa Background Image Slides Edge-to-Edge */}
      <div className="hero-full-image">
        <div
          className={`hero-bg-slide hero-slide-1 ${activeSlide === 0 ? 'active' : ''}`}
          style={{ backgroundImage: "url('/Images/Hero_Arch.jpg')" }}
        />
        <div
          className={`hero-bg-slide hero-slide-2 ${activeSlide === 1 ? 'active' : ''}`}
          style={{ backgroundImage: "url('/Images/Hero_Villa.jpg')" }}
        />
      </div>

      {/* Dark Vignette Overlay for 100% Text Legibility */}
      <div className="hero-text-blend-overlay" />

      {/* Main Container - Exact matching max-w-[1320px] and alignment as Plot Hero */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 w-full flex flex-col justify-between h-full relative z-[3] flex-1">
        
        {/* Hero Fit Content */}
        <div className="hero-fit-content">
          {/* Cormorant Garamond / Cinzel Editorial Headline */}
          <h1 className="hero-headline">
            <span className="gold-hero-badge">TAMILNADU NO 1</span>
            <br />
            <span style={{ color: '#E5D2A6' }}>BIGGEST FARM</span>
            <br />
            <span style={{ color: '#E5D2A6' }}>PLOTS</span>
          </h1>

          <div className="flex flex-wrap items-center gap-4 mt-6">
            <a
              href="#plots"
              className="inline-flex items-center gap-2 px-5 py-3 rounded bg-gold-primary text-espresso-950 font-mono text-[0.78rem] font-extrabold tracking-[1.5px] border border-gold-light hover:bg-gold-light transition-all shadow-[0_6px_20px_rgba(0,0,0,0.4)] cursor-pointer"
            >
              EXPLORE PLOTS MAP
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            <a
              href="#gallery"
              className="inline-flex items-center gap-2 px-5 py-3 rounded border-[1.8px] border-gold-primary text-cream font-mono text-[0.78rem] font-extrabold tracking-[1.5px] bg-gold-primary/20 backdrop-blur-md hover:bg-gold-primary hover:text-espresso-950 transition-all shadow-[0_4px_18px_rgba(0,0,0,0.4)] cursor-pointer"
            >
              VIEW DEVELOPMENTS
            </a>

            {/* Dual BG Slide Indicators */}
            <div className="hero-slide-controls">
              <button
                type="button"
                onClick={() => setActiveSlide(0)}
                aria-label="Slide 1: Entrance Arch"
                className={`hero-dot ${activeSlide === 0 ? 'active' : ''}`}
              />
              <button
                type="button"
                onClick={() => setActiveSlide(1)}
                aria-label="Slide 2: Luxury Villa"
                className={`hero-dot ${activeSlide === 1 ? 'active' : ''}`}
              />
            </div>
          </div>
        </div>

          {/* FULL 100% WIDTH ANIMATED EDITORIAL STATISTICS BANNER (DESKTOP) */}
          <div ref={bannerRef} className="hero-stats-banner desktop-hero-stats">
            {HERO_STATS.map((stat, idx) => (
              <div key={idx} className="stat-card" style={{ animationDelay: `${(idx + 1) * 0.1}s` }}>
                <span className="stat-number">
                  {counts[idx]}
                  {stat.suffix}
                </span>
                <span className="stat-label">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* MOBILE HERO STATS (Brought down below hero image on mobile view alone) */}
      <div className="mobile-hero-stats-section">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
          <div className="hero-stats-banner mobile-hero-stats">
            {HERO_STATS.map((stat, idx) => (
              <div key={`mob-${idx}`} className="stat-card">
                <span className="stat-number">
                  {counts[idx]}
                  {stat.suffix}
                </span>
                <span className="stat-label">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
