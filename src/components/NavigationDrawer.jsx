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

      {/* Drawer Container with Crisp White Theme & Gold Border - Matches Header & Footer */}
      <div className="nav-drawer-panel relative w-[52vw] min-w-[195px] max-w-[240px] sm:w-[350px] sm:max-w-[360px] bg-white h-full border-l-2 border-gold-primary/60 p-4 sm:p-7 flex flex-col justify-between shadow-[-15px_0_45px_rgba(26,7,9,0.18)] z-10 transition-transform duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3 sm:pb-4">
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-lg sm:text-2xl text-[#1A0709] tracking-[1.5px] sm:tracking-[2px]">
                SHASHTIKA
              </span>
              <span className="font-mono text-[7px] sm:text-[9px] tracking-[1px] sm:tracking-[2px] text-[#99793B] uppercase font-bold -mt-0.5">
                PREMIUM DEVELOPMENTS
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gold-primary/60 flex items-center justify-center text-[#1A0709] hover:bg-[#1A0709] hover:text-gold-light hover:border-gold-primary transition-all duration-200 text-lg sm:text-xl font-light cursor-pointer ml-2"
              aria-label="Close Navigation"
            >
              &times;
            </button>
          </div>

          {/* Gold Divider Line */}
          <div className="w-full h-[1px] bg-gold-border/40 mb-4 sm:mb-8" />

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2 sm:gap-3">
            {links.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <a
                  key={link.num}
                  href={link.href}
                  onClick={() => {
                    onClose();
                    if (link.route === 'home') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className={`group flex items-center px-3 py-2 sm:px-4 sm:py-3 rounded transition-all duration-200 font-heading font-semibold text-[0.88rem] sm:text-[1.18rem] tracking-[1px] sm:tracking-[1.5px] border ${
                    isActive
                      ? 'bg-[#1A0709] border-[#1A0709] text-white shadow-md'
                      : 'border-transparent text-[#1A0709] hover:text-gold-antique hover:bg-[#F5EFEB] hover:border-gold-primary/30'
                  }`}
                >
                  <span className={`font-mono text-[0.70rem] sm:text-[0.82rem] font-bold tracking-wider mr-2 sm:mr-4 transition-colors ${
                    isActive ? 'text-gold-light' : 'text-[#99793B] group-hover:text-gold-antique'
                  }`}>
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
            className="w-[40px] h-[40px] sm:w-[52px] sm:h-[52px] rounded-full flex items-center justify-center bg-gradient-to-br from-[#1A0709] via-[#2D0E12] to-[#1A0709] text-gold-light border border-gold-primary/50 shadow-[0_4px_16px_rgba(26,7,9,0.25)] hover:scale-110 hover:bg-gold-primary hover:text-espresso-950 transition-all duration-300 cursor-pointer group"
            title="Admin Portal"
            aria-label="Admin Portal"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
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
