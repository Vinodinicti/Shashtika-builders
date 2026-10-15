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

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gold-primary/50 shadow-[0_4px_20px_rgba(0,0,0,0.08)] py-1.5'
          : 'bg-transparent border-b-0 shadow-none py-2 sm:py-2.5'
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between min-h-[48px] sm:min-h-[52px]">
          {/* Logo & Brand Identity */}
          <a
            href="#"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 no-underline group py-1"
          >
            <img
              src="/Images/Shashtika_Emblem.png"
              alt="SHASHTIKA Logo"
              className="h-[44px] sm:h-[50px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span
                className={`logo-title text-[1.25rem] sm:text-[1.38rem] leading-none transition-colors duration-200 ${
                  scrolled
                    ? 'font-heading font-extrabold text-[#1A0709] tracking-[1.5px]'
                    : 'gold-glow-letters'
                }`}
              >
                SHASHTIKA
              </span>
              <span
                className={`font-mono text-[0.54rem] sm:text-[0.60rem] tracking-[1.5px] uppercase mt-1 transition-colors duration-200 ${
                  scrolled ? 'text-[#99793B] font-bold' : 'text-gold-light font-bold'
                }`}
              >
                PLOT DEVELOPERS &amp; BUILDERS
              </span>
            </div>
          </a>

          {/* Right Header Action: Hamburger Button */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenNav}
              aria-label="Open Navigation Menu"
              className={`w-[32px] h-[32px] rounded border border-gold-primary flex flex-col items-center justify-center gap-[4px] transition-colors duration-200 cursor-pointer group ${
                scrolled
                  ? 'bg-gold-primary/15 hover:bg-gold-primary'
                  : 'bg-gold-primary/10 hover:bg-gold-primary'
              }`}
            >
              <span
                className={`block w-[17px] h-[1.8px] transition-colors ${
                  scrolled
                    ? 'bg-[#1A0709] group-hover:bg-white'
                    : 'bg-gold-primary group-hover:bg-[#1A0709]'
                }`}
              />
              <span
                className={`block w-[17px] h-[1.8px] transition-colors ${
                  scrolled
                    ? 'bg-[#1A0709] group-hover:bg-white'
                    : 'bg-gold-primary group-hover:bg-[#1A0709]'
                }`}
              />
              <span
                className={`block w-[17px] h-[1.8px] transition-colors ${
                  scrolled
                    ? 'bg-[#1A0709] group-hover:bg-white'
                    : 'bg-gold-primary group-hover:bg-[#1A0709]'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
