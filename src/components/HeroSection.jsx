import React, { useState, useEffect } from 'react';
import { HERO_STATS } from '../data/homeData';

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [counts, setCounts] = useState(HERO_STATS.map(() => 0));

  // Dual slide auto-timer (6 seconds cycle)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev === 0 ? 1 : 0));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Running number counter animation with smooth cubic ease-out & stagger
  useEffect(() => {
    const startCounters = () => {
      const startTime = performance.now();

      const update = (now) => {
        const elapsed = now - startTime;
        let allCompleted = true;

        const nextCounts = HERO_STATS.map((stat, idx) => {
          const duration = 1600 + idx * 150; // Wave stagger
          const progress = Math.min(elapsed / duration, 1);
          if (progress < 1) allCompleted = false;

          const easeProgress = 1 - Math.pow(1 - progress, 3);
          return Math.floor(easeProgress * stat.target);
        });

        setCounts(nextCounts);

        if (!allCompleted) {
          requestAnimationFrame(update);
        } else {
          setCounts(HERO_STATS.map((s) => s.target));
        }
      };

      requestAnimationFrame(update);
    };

    // Trigger after a tiny initial delay for frame-1 visibility
    const timeout = setTimeout(startCounters, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
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
          <div className="architectural-tag" style={{ marginBottom: '14px', color: '#E5D2A6' }}>
            PREMIUM PLOTTED CONSTRUCTION
          </div>

          {/* Cormorant Garamond / Cinzel Editorial Headline */}
          <h1 className="hero-headline">
            <span className="gold-hero-badge">TAMILNADU NO 1</span>
            <br />
            <span style={{ color: '#E5D2A6' }}>BIGGEST FARM</span>
            <br />
            <span style={{ color: '#E5D2A6' }}>PLOTS</span>
          </h1>

          <p className="hero-subtext">
            Pioneering DTCP-approved residential layouts, custom villa building, and commercial construction across Coimbatore & Pollachi with 20 years of trust.
          </p>

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

        {/* FULL 100% WIDTH ANIMATED EDITORIAL STATISTICS BANNER */}
        <div className="hero-stats-banner">
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
  );
}
