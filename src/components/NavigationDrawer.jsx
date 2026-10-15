import React, { useEffect } from 'react';

export default function NavigationDrawer({ isOpen, onClose, currentRoute = 'home' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const links = [
    { num: '01.', text: 'HOME PAGE', href: '#', route: 'home' },
    { num: '02.', text: 'FIND YOUR PLOT', href: '#plots', route: 'plots' },
    { num: '03.', text: 'ABOUT US', href: '#about', route: 'about' },
    { num: '04.', text: 'GALLERY', href: '#gallery', route: 'gallery' },
    { num: '05.', text: 'CONTACT', href: '#contact', route: 'contact' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer Container Matching Midnight Navy Theme - Opens Half Page on Mobile */}
      <div className="nav-drawer-panel relative w-[52vw] min-w-[195px] max-w-[240px] sm:w-[350px] sm:max-w-[360px] bg-[#0A1325] h-full border-l border-gold-primary/40 p-4 sm:p-7 flex flex-col justify-between shadow-[-15px_0_45px_rgba(10,19,37,0.85)] z-10 transition-transform duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3 sm:pb-4">
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg sm:text-2xl text-cream tracking-[1.5px] sm:tracking-[2px] gold-glow-letters">
                SHASHTIKA
              </span>
              <span className="font-mono text-[7px] sm:text-[9px] tracking-[1px] sm:tracking-[2px] text-gold-light uppercase -mt-0.5">
                PREMIUM DEVELOPMENTS
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gold-primary/60 flex items-center justify-center text-gold-light hover:bg-gold-primary hover:text-[#0A1325] transition-all duration-200 text-lg sm:text-xl font-light cursor-pointer ml-2"
              aria-label="Close Navigation"
            >
              &times;
            </button>
          </div>

          {/* Gold Divider Line */}
          <div className="w-full h-[1px] bg-gold-border/30 mb-4 sm:mb-8" />

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2 sm:gap-3">
            {links.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <a
                  key={link.num}
                  href={link.href}
                  onClick={onClose}
                  className={`group flex items-center px-3 py-2 sm:px-4 sm:py-3 rounded transition-all duration-200 font-heading font-semibold text-[0.88rem] sm:text-[1.18rem] tracking-[1px] sm:tracking-[1.5px] border ${
                    isActive
                      ? 'bg-[rgba(198,161,91,0.16)] border-gold-primary/40 text-gold-light shadow-[inset_0_0_12px_rgba(198,161,91,0.12)]'
                      : 'border-transparent text-cream/90 hover:text-gold-light hover:bg-[rgba(198,161,91,0.08)] hover:border-gold-primary/20'
                  }`}
                >
                  <span className="font-mono text-[0.70rem] sm:text-[0.82rem] font-bold text-gold-antique tracking-wider mr-2 sm:mr-4">
                    {link.num}
                  </span>
                  <span className="truncate">{link.text}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Bottom Left Architectural Circular Icon Medallion Directing to Admin Page */}
        <div className="pt-4 pb-2 sm:pt-6 sm:pb-2">
          <a
            href="#admin"
            onClick={onClose}
            className="w-[40px] h-[40px] sm:w-[52px] sm:h-[52px] rounded-full flex items-center justify-center bg-gradient-to-br from-[#E5D2A6] via-[#C6A15B] to-[#A9823A] text-[#0A1325] shadow-[0_0_24px_rgba(198,161,91,0.6),0_0_8px_rgba(198,161,91,0.35)] hover:scale-110 hover:shadow-[0_0_32px_rgba(198,161,91,0.9)] transition-all duration-300 cursor-pointer group"
            title="Admin Portal"
            aria-label="Admin Portal"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0A1325"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sm:w-6 sm:h-6 transition-transform group-hover:scale-105"
            >
              <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
              <path d="M6 12H4a2 2 0 0 0-2 2v8h4" />
              <path d="M18 9h2a2 2 0 0 1 2 2v11h-4" />
              <path d="M10 6h4" />
              <path d="M10 10h4" />
              <path d="M10 14h4" />
              <path d="M10 18h4" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
