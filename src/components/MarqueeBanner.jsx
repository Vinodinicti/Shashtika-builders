import React from 'react';

export default function MarqueeBanner() {
  const marqueeItems = [
    { badge: 'ONGOING', text: '4 ONGOING LAYOUTS • POLLACHI & COIMBATORE', type: 'primary' },
    { badge: 'UPCOMING', text: '5 NEW GATED FARM & RESIDENTIAL PROJECTS', type: 'terracotta' },
    { badge: 'FEATURED', text: 'SHASHTIKA GREEN ENCLAVE • MAHALINGAPURAM ROAD', type: 'primary' },
    { badge: 'LAUNCHING', text: 'SHASHTIKA PALM GROVE • KOVAIPUDUR ENCLAVE', type: 'terracotta' },
    { badge: 'COMPLETED', text: '8+ DTCP APPROVED LAYOUTS DELIVERED', type: 'primary' },
    { badge: 'HERITAGE', text: '20 YEARS TRUSTED DEVELOPMENT', type: 'terracotta' },
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
