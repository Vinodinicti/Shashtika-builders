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
          ? 'bg-[#0A1325]/95 backdrop-blur-md border-b border-gold-primary/80 shadow-[0_6px_26px_rgba(10,19,37,0.7)] py-2.5'
          : 'bg-transparent border-b-0 shadow-none py-3.5 sm:py-4'
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-[56px]">
          {/* Logo & Brand Identity */}
          <a href="#" className="flex items-center gap-3 no-underline group">
            <img
              src="/Images/Shashtika_Emblem.png"
              alt="SHASHTIKA Logo"
              className="h-[38px] w-auto object-contain rounded border border-gold-primary/50 shadow-[0_2px_10px_rgba(10,19,37,0.5)] transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="logo-title gold-glow-letters text-[1.45rem]">
                SHASHTIKA
              </span>
              <span className="font-mono text-[0.6rem] tracking-[2px] text-gold-light uppercase -mt-0.5">
                PLOT DEVELOPERS & BUILDERS
              </span>
            </div>
          </a>

          {/* Right Header Action: Hamburger Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenNav}
              aria-label="Open Navigation Menu"
              className="w-[38px] h-[38px] rounded border border-gold-primary bg-gold-primary/10 hover:bg-gold-primary flex flex-col items-center justify-center gap-[5px] transition-colors duration-200 cursor-pointer group"
            >
              <span className="block w-[20px] h-[2px] bg-gold-primary group-hover:bg-[#0A1325] transition-colors" />
              <span className="block w-[20px] h-[2px] bg-gold-primary group-hover:bg-[#0A1325] transition-colors" />
              <span className="block w-[20px] h-[2px] bg-gold-primary group-hover:bg-[#0A1325] transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
