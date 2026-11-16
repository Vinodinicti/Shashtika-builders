import React from 'react';

export default function MarqueeBanner() {
  const marqueeItems = [
    { badge: 'PRIME LOCATIONS', text: 'KAMBALAMPATTI • SIRUVANI • KOVILPALAYAM', type: 'primary' },
    { badge: 'ONGOING', text: 'KAMBALAMPATTI (64 PLOTS) • KOVILPALAYAM (32 PLOTS) • SIRUVANI (47 PLOTS)', type: 'terracotta' },
    { badge: 'DTCP APPROVED', text: '100% CLEAR TITLES & IMMEDIATE REGISTRATION IN COIMBATORE REGION', type: 'primary' },
    { badge: 'COMPLETED', text: '24 DTCP APPROVED LAYOUTS DELIVERED • 1500+ HAPPY CUSTOMERS', type: 'terracotta' },
    { badge: 'HERITAGE', text: 'SINCE 1999 • 25+ YEARS TRUSTED PLOT DEVELOPERS & BUILDERS', type: 'primary' },
  ];

  const renderContent = (ariaHidden = false) => (
    <div className="marquee-content" aria-hidden={ariaHidden}>
      {marqueeItems.map((item, idx) => (
        <React.Fragment key={idx}>
          <div className="flex items-center gap-3 font-heading text-xs sm:text-sm font-bold tracking-widest text-espresso-950 uppercase">
            <span
              className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold tracking-wider ${
                item.type === 'terracotta'
                  ? 'bg-terracotta text-cream'
                  : 'bg-gold-primary text-espresso-950'
              }`}
            >
              {item.badge}
            </span>
            <span>{item.text}</span>
          </div>
          <div className="marquee-divider text-gold-antique text-xs">◆</div>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="w-full creamy-smoky-sandal-canvas border-y border-gold-primary/60 py-3.5 overflow-hidden relative z-20 shadow-sm">
      <div className="marquee-track">
        {renderContent(false)}
        {renderContent(true)}
      </div>
    </div>
  );
}
