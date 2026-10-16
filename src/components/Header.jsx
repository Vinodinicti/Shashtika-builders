import React, { useState, useEffect } from 'react';

export default function Header({ onOpenNav }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.location.hash) {
      window.history.pushState(null, '', window.location.pathname);
      window.dispatchEvent(new Event('hashchange'));
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gold-primary/45 shadow-[0_4px_20px_rgba(0,0,0,0.08)] py-1.5 sm:py-2'
          : 'bg-gradient-to-b from-black/65 via-black/30 to-transparent border-b-0 shadow-none py-2 sm:py-2.5'
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[44px] sm:min-h-[50px]">
          {/* Logo & Brand Identity */}
          <a
            href="#"
            onClick={handleLogoClick}
            className="flex items-center gap-2 sm:gap-3 no-underline group py-1 select-none"
            aria-label="SHASHTIKA Plot Developers & Builders Home"
          >
            <img
              src="/Images/Shashtika_Emblem.png"
              alt="SHASHTIKA Logo"
              className="header-brand-logo h-[38px] w-[38px] sm:h-[46px] sm:w-[46px] lg:h-[50px] lg:w-[50px] object-contain flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col justify-center min-w-0">
              <span
                className={`logo-title text-[1.12rem] sm:text-[1.30rem] lg:text-[1.40rem] leading-none transition-colors duration-200 ${
                  scrolled
                    ? 'font-heading font-extrabold text-[#1A0709] tracking-[1.2px] sm:tracking-[1.5px]'
                    : 'gold-glow-letters drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]'
                }`}
              >
                SHASHTIKA
              </span>
              <span
                className={`font-mono text-[0.46rem] sm:text-[0.55rem] lg:text-[0.60rem] tracking-[1px] sm:tracking-[1.5px] uppercase mt-0.5 sm:mt-1 transition-colors duration-200 whitespace-nowrap ${
                  scrolled
                    ? 'text-[#99793B] font-bold'
                    : 'text-gold-light font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]'
                }`}
              >
                PLOT DEVELOPERS &amp; BUILDERS
              </span>
            </div>
          </a>

          {/* Right Header Action: Hamburger Button with Generous Mobile Touch Target */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenNav}
              aria-label="Open Navigation Menu"
              className={`w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] min-w-[38px] min-h-[38px] rounded-md border flex flex-col items-center justify-center gap-[4.5px] transition-all duration-200 cursor-pointer group active:scale-95 ${
                scrolled
                  ? 'border-gold-primary/60 bg-gold-primary/15 hover:bg-gold-primary hover:border-gold-primary text-[#1A0709]'
                  : 'border-gold-primary/70 bg-black/35 backdrop-blur-sm hover:bg-gold-primary hover:border-gold-primary text-gold-light shadow-[0_2px_10px_rgba(0,0,0,0.3)]'
              }`}
            >
              <span
                className={`block w-[18px] sm:w-[20px] h-[2px] rounded-full transition-colors ${
                  scrolled
                    ? 'bg-[#1A0709] group-hover:bg-white'
                    : 'bg-gold-light group-hover:bg-[#1A0709]'
                }`}
              />
              <span
                className={`block w-[18px] sm:w-[20px] h-[2px] rounded-full transition-colors ${
                  scrolled
                    ? 'bg-[#1A0709] group-hover:bg-white'
                    : 'bg-gold-light group-hover:bg-[#1A0709]'
                }`}
              />
              <span
                className={`block w-[18px] sm:w-[20px] h-[2px] rounded-full transition-colors ${
                  scrolled
                    ? 'bg-[#1A0709] group-hover:bg-white'
                    : 'bg-gold-light group-hover:bg-[#1A0709]'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
