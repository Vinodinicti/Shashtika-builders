import React, { useState } from 'react';

export default function AboutPage() {
  // Support tap-to-flip for touch devices
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (index) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const stages = [
    {
      num: '01',
      tag: 'LEGAL AUDIT',
      title: '30-Year Title Search & Land Audit',
      img: '/Images/Shashtika_Process_1_Title.jpg',
      desc: 'Before purchasing land, our senior legal team audits 30+ years of parent deeds, Encumbrance Certificates (EC), and revenue records (Patta, Chitta, FMB) to ensure 100% dispute-free ownership.',
      backTag: 'LEGAL CERTAINTY',
      backTitle: 'WHAT WE VERIFY FOR YOU',
      deliverables: [
        '30+ Years Clean Encumbrance Certificate (EC)',
        'Full Chain of Parent Deeds & Revenue Patta Audit',
        'Official Field Survey & Boundary Verification',
        'Zero Mortgages, Court Litigations or Disputes',
      ],
    },
    {
      num: '02',
      tag: 'GOVERNMENT APPROVAL',
      title: 'DTCP Sanction & Master Layout Design',
      img: '/Images/Shashtika_Process_2_DTCP.jpg',
      desc: 'We design practical, Vastu-compliant layouts with wide roads, officially gift 10% land to the local Panchayat for children parks, and secure full DTCP approval before sales begin.',
      backTag: 'TOWN PLANNING',
      backTitle: 'OFFICIAL APPROVAL STANDARDS',
      deliverables: [
        'Official DTCP Approved Layout Number (e.g. 02/2025)',
        'Wide 40ft & 33ft Main Roads + 23ft Cross Roads',
        '10% Land Gifted to Panchayat for Children Park & Green Space',
        'Pre-Approved Bank Loans up to 80% with Leading Banks',
      ],
    },
    {
      num: '03',
      tag: 'CIVIL INFRASTRUCTURE',
      title: 'Heavy-Duty Tar Roads & Rain Drainage',
      img: '/Images/Shashtika_Process_3_Infra.jpg',
      desc: 'We lay long-lasting black tar roads over a solid stone base and build underground stormwater drainage channels so rainwater flows away smoothly without waterlogging or road damage.',
      backTag: 'ROAD & DRAIN SPECS',
      backTitle: 'DURABLE INFRASTRUCTURE',
      deliverables: [
        'Durable Blacktop Tar Roads on Heavy Stone Base',
        'Solid Concrete Road Curbs on Both Sides for Clean Edges',
        'Underground Stormwater Drainage for Flood-Free Roads',
        'Rainwater Harvesting Pits to Naturally Recharge Groundwater',
      ],
    },
    {
      num: '04',
      tag: 'ESSENTIAL UTILITIES',
      title: 'Electricity, Sweet Water & Gated Security',
      img: '/Images/Shashtika_Process_4_Arch.jpg',
      desc: 'We install a dedicated TANGEDCO electricity transformer, bright automatic streetlights, arrange access to sweet drinking groundwater, and secure the layout with a grand arch and boundary fencing.',
      backTag: 'SITE UTILITIES',
      backTitle: 'ESSENTIAL SITE AMENITIES',
      deliverables: [
        'Dedicated TANGEDCO Electricity Transformer & Power Lines',
        'Automatic Streetlights for Bright Night-Time Safety',
        'Abundant Potable Sweet Groundwater for Household Use',
        'Grand Entrance Arch, Secure Fencing & Avenue Trees',
      ],
    },
    {
      num: '05',
      tag: 'PLOT HANDOVER',
      title: 'Boundary Stones & Spot Registration',
      img: '/Images/Shashtika_Process_5_Handover.jpg',
      desc: 'Every individual plot is demarcated with numbered concrete corner stones. We assist you with complete documentation, bank loan support, and hassle-free registration with individual Patta in your name.',
      backTag: 'IMMEDIATE OWNERSHIP',
      backTitle: 'LEGAL HANDOVER TO BUYER',
      deliverables: [
        'Numbered Concrete Boundary Stones on All 4 Corners',
        'Clear Sale Deed & Complete Parent Document Copies',
        'Hassle-Free Spot Registration at Sub-Registrar Office',
        'Individual Patta Transfer Support • 100% Ready for Construction',
      ],
    },
  ];

  const openWhatsAppEnquiry = (stageTitle) => {
    const text = encodeURIComponent(
      `Hello SHASHTIKA Developers,\n\nI am interested in learning more about your development process stage: "${stageTitle}". Please share more details and layout documentation.`
    );
    window.open(`https://wa.me/919363599754?text=${text}`, '_blank');
  };

  const renderStageCard = (stage, idx) => {
    const isFlipped = flippedCards[idx];
    return (
      <div
        key={stage.num}
        className={`flip-card cursor-pointer group ${isFlipped ? 'flipped' : ''}`}
        onClick={() => toggleFlip(idx)}
      >
        <div className="flip-card-inner">
          {/* Front Side */}
          <div className="flip-card-front bg-[#FAF5EB] border-1.5 border-gold-border/80 rounded-xl overflow-hidden shadow-md flex flex-col justify-between hover:border-gold-primary transition-all duration-300">
            <div>
              <div className="relative h-32 sm:h-36 overflow-hidden bg-espresso-950">
                <img
                  src={stage.img}
                  alt={stage.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded bg-espresso-950/90 backdrop-blur-md border border-gold-primary text-gold-light font-mono font-bold text-[10.5px] flex items-center gap-1 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-primary animate-pulse" />
                  STAGE {stage.num}
                </span>
              </div>
              <div className="p-3.5 sm:p-4">
                <span className="font-mono text-[9.5px] font-bold tracking-[1.2px] text-gold-dark uppercase block mb-1">
                  {stage.tag}
                </span>
                <h3 className="font-heading font-extrabold text-sm sm:text-base text-espresso-950 mb-1.5 leading-snug">
                  {stage.title}
                </h3>
                <p className="font-body text-[11px] sm:text-xs text-espresso-800 leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 pt-0">
              <div className="inline-flex items-center justify-between font-mono text-[10px] font-bold text-gold-dark border-t border-gold-border/50 pt-2 w-full group-hover:text-gold-primary transition-colors">
                <span>HOVER / TAP TO REVEAL KEY DELIVERABLES</span>
                <span className="text-xs">↺</span>
              </div>
            </div>
          </div>

          {/* Back Side */}
          <div className="flip-card-back bg-gradient-to-br from-[#1A0709] via-[#2D0E12] to-[#1A0709] text-cream p-3.5 sm:p-4 rounded-xl border-1.5 border-gold-primary shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-gold-primary/30">
                <span className="font-heading text-[11px] font-bold text-gold-light bg-gold-primary/20 px-2 py-0.5 rounded border border-gold-primary/50">
                  STAGE {stage.num}
                </span>
                <span className="font-mono text-[9px] text-gold-antique uppercase tracking-wider font-semibold">
                  {stage.backTag}
                </span>
              </div>

              <h4 className="font-heading font-extrabold text-xs sm:text-sm text-cream mb-2 tracking-wide">
                {stage.backTitle}
              </h4>

              <ul className="space-y-1.5 font-mono text-[10.5px] sm:text-[11px] text-cream/95">
                {stage.deliverables.map((item, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-1.5 bg-[#2D0E12]/80 p-1 rounded border border-gold-primary/20">
                    <span className="text-gold-primary font-bold text-xs leading-none mt-0.5">✓</span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openWhatsAppEnquiry(stage.title);
              }}
              className="w-full mt-2.5 py-1.5 px-3 rounded bg-gold-primary text-espresso-950 font-mono text-[11px] font-extrabold tracking-wider hover:bg-gold-light transition-all text-center cursor-pointer shadow-md active:scale-[0.98] flex items-center justify-center gap-1.5"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                <path d="M12.031 0C5.385 0 0 5.386 0 12.031c0 2.124.553 4.197 1.604 6.02L0 24l6.155-1.614A11.968 11.968 0 0 0 12.03 24c6.645 0 12.03-5.385 12.03-12.031C24.06 5.386 18.675 0 12.031 0zm.012 22.012c-1.808 0-3.585-.486-5.143-1.408l-.369-.219-3.817 1.001 1.019-3.721-.241-.383A9.99 9.99 0 0 1 2.012 12.03c0-5.524 4.496-10.02 10.031-10.02 5.524 0 10.02 4.496 10.02 10.02 0 5.536-4.496 10.012-10.02 10.012zm5.503-7.519c-.302-.152-1.785-.881-2.062-.981-.277-.101-.479-.152-.68.152-.202.302-.782.981-.959 1.183-.176.201-.353.226-.655.075-1.745-.875-2.894-1.559-4.04-3.535-.302-.52.302-.482.864-1.608.101-.201.05-.378-.025-.529-.075-.152-.68-1.636-.932-2.24-.244-.588-.493-.508-.68-.518-.176-.009-.378-.009-.58-.009-.201 0-.528.075-.804.378-.277.302-1.057 1.032-1.057 2.518 0 1.486 1.082 2.92 1.233 3.122.151.201 2.128 3.25 5.156 4.558 2.164.935 2.809.845 3.791.7.636-.094 1.785-.73 2.037-1.435.252-.705.252-1.309.176-1.435-.076-.125-.278-.201-.58-.352z" />
              </svg>
              <span>ENQUIRE STAGE {stage.num} ON WHATSAPP →</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="about-page-container min-h-screen bg-[#F8F3EA] text-espresso-900 pb-10">
      
      {/* 1. HERO VIDEO SECTION (CLEAN VIDEO PLAYER WITH NO TEXT OVERLAY) */}
      <section className="about-hero-video-section">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05]"
          poster="/Images/Shashtika_Heritage_Story.jpg"
          aria-label="SHASHTIKA residential communities"
        >
          <source src="/Images/about-hero.mp4" type="video/mp4" />
        </video>
        <div className="about-hero-video-overlay" />
      </section>

      {/* 2. HERO CONTENT SECTION (LOCATED BELOW THE VIDEO WITH ANIMATIONS & WATERMARK) */}
      <section className="about-hero-content-section">
        {/* Moving Wave Golden Glow SHASHTIKA Watermark */}
        <div className="shashtika-wave-watermark select-none pointer-events-none">
          SHASHTIKA
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-[3] flex flex-col items-center justify-center text-center">
          <div className="architectural-tag mb-2" style={{ color: '#E5D2A6' }}>
            SHASHTIKA HERITAGE
          </div>

          <h1 className="about-hero-title">
            <span className="gold-glow-letters">20+ YEARS OF TRUST</span>
          </h1>

          <p className="font-body text-xs sm:text-sm lg:text-base text-[#D4C3A3] max-w-xl mx-auto leading-relaxed">
            Transforming raw land into structured, clear-title residential communities across Coimbatore and Pollachi.
          </p>
        </div>
      </section>

      {/* 2. OUR STORY & 20-YEAR PROVENANCE */}
      <section id="our-story-section" className="py-8 sm:py-12 bg-[#FFFDF8] border-b border-gold-border/60 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Story Image Frame */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-gold-primary/30 to-gold-antique/20 rounded-2xl filter blur-lg opacity-75 group-hover:opacity-100 transition duration-500" />
              <div className="relative border-2 border-gold-primary/80 p-2 sm:p-2.5 bg-[#FAF5EC] rounded-2xl shadow-xl overflow-hidden flex flex-col">
                <img
                  src="/Images/Shashtika_Heritage_Story.jpg"
                  alt="20 Years SHASHTIKA Architectural Heritage"
                  className="w-full h-[220px] sm:h-[300px] lg:h-[320px] object-cover rounded-xl border border-gold-border/60 group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="story-heritage-badge relative mt-2.5 sm:mt-0 sm:absolute sm:bottom-5 sm:left-5 sm:right-5 bg-white sm:bg-white/95 backdrop-blur-md p-3 rounded-lg border-2 border-gold-primary text-[#1A0709] shadow-xl">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="font-mono text-[9px] text-[#99793B] uppercase tracking-widest block font-bold">
                        FOUNDED IN 2004 • 20 YEARS HERITAGE
                      </span>
                      <span className="font-heading text-xs sm:text-sm font-extrabold text-[#1A0709] tracking-wide">
                        POLLACHI &amp; COIMBATORE CORRIDORS
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded bg-[#1A0709] border border-gold-primary/50 text-gold-light font-mono text-[9.5px] font-bold flex-shrink-0 shadow-xs">
                      EST. 2004
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Story Text & Milestones */}
            <div>
              <span className="architectural-tag">
                FOUNDED IN 2004 • 20 YEARS PROVENANCE
              </span>

              <h2 className="font-heading font-extrabold text-xl sm:text-2xl lg:text-3xl text-[#1A0709] mt-1.5 mb-2.5 leading-tight tracking-wide">
                OUR STORY &amp; HERITAGE
              </h2>

              <p className="font-body text-xs sm:text-[13px] text-[#3D141A] leading-relaxed mb-4">
                Founded with unyielding commitment to legal excellence, <strong>SHASHTIKA</strong> has cultivated a 20-year legacy of 100% title transparency, DTCP/RERA approvals, and master-planned civil infrastructure across Tamil Nadu. We believe every piece of land should serve as a secure financial foundation and a tranquil sanctuary for families.
              </p>

              {/* Milestone Timeline Cards */}
              <div className="space-y-2 mt-4">
                <div className="p-2.5 sm:p-3 rounded-lg bg-biscuit-100/70 border border-gold-border/40 hover:border-gold-primary hover:bg-biscuit-100 transition-all flex items-start gap-3 group">
                  <span className="px-2 py-0.5 rounded bg-[#1A0709] text-gold-light border border-gold-primary/30 font-mono text-[10.5px] font-extrabold tracking-wider mt-0.5 shadow-xs">
                    2004
                  </span>
                  <div>
                    <h4 className="font-heading font-bold text-xs sm:text-[13px] text-[#1A0709] tracking-wide group-hover:text-gold-dark transition-colors">
                      INCEPTION IN POLLACHI
                    </h4>
                    <p className="font-body text-[11px] sm:text-xs text-[#521D24] mt-0.5 leading-relaxed">
                      Pioneered premium residential plotted enclaves along Mahalingapuram Main Road with 100% clear parent deeds.
                    </p>
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-lg bg-biscuit-100/70 border border-gold-border/40 hover:border-gold-primary hover:bg-biscuit-100 transition-all flex items-start gap-3 group">
                  <span className="px-2 py-0.5 rounded bg-[#1A0709] text-gold-light border border-gold-primary/30 font-mono text-[10.5px] font-extrabold tracking-wider mt-0.5 shadow-xs">
                    2015
                  </span>
                  <div>
                    <h4 className="font-heading font-bold text-xs sm:text-[13px] text-[#1A0709] tracking-wide group-hover:text-gold-dark transition-colors">
                      EXPANSION TO COIMBATORE
                    </h4>
                    <p className="font-body text-[11px] sm:text-xs text-[#521D24] mt-0.5 leading-relaxed">
                      Launched landmark gated layouts in Kovaipudur, Eachanari Bypass, and Peelamedu highway corridors.
                    </p>
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-lg bg-biscuit-100/70 border border-gold-border/40 hover:border-gold-primary hover:bg-biscuit-100 transition-all flex items-start gap-3 group">
                  <span className="px-2 py-0.5 rounded bg-[#1A0709] text-gold-light border border-gold-primary/30 font-mono text-[10.5px] font-extrabold tracking-wider mt-0.5 shadow-xs">
                    2024
                  </span>
                  <div>
                    <h4 className="font-heading font-bold text-xs sm:text-[13px] text-[#1A0709] tracking-wide group-hover:text-gold-dark transition-colors">
                      SHASHTIKA INTEGRATED BRAND
                    </h4>
                    <p className="font-body text-[11px] sm:text-xs text-[#521D24] mt-0.5 leading-relaxed">
                      Unified plotted township development, bespoke villa construction, and commercial building under one cohesive luxury brand.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES (3 LUXURY CARDS WITH REALISTIC DIAGRAMMATIC ICONS & 3D ANIMATION) */}
      <section id="core-values-section" className="py-8 sm:py-12 bg-[#FAF5EB] border-b border-gold-border/60 relative overflow-hidden">
        {/* Subtle Ambient Background Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[12vw] font-black text-gold-primary/[0.03] select-none pointer-events-none whitespace-nowrap">
          SHASHTIKA PILLARS
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-7">
            <span className="architectural-tag">CORE ARCHITECTURAL PILLARS</span>
            <h2 className="font-heading font-extrabold text-xl sm:text-2xl lg:text-3xl text-[#1A0709] mt-1.5 mb-2 tracking-wide">
              OUR CORE VALUES
            </h2>
            <p className="font-body text-xs sm:text-sm text-[#3D141A] leading-relaxed">
              The fundamental architectural, engineering, and legal benchmarks that guide every SHASHTIKA township development across Tamil Nadu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Value 1: CLEAR TITLE GUARANTEE */}
            <div className="core-value-card group">
              {/* Image Frame with Blueprint Grid Overlay */}
              <div className="core-value-img-wrap">
                <img
                  src="/Images/Shashtika_Clear_Title.jpg"
                  alt="Clear Title Guarantee"
                />
                <div className="core-value-grid-overlay" />
                <span className="core-value-badge">
                  100% DTCP APPROVED
                </span>
              </div>

              {/* Realistic Diagrammatic Icon Medallion */}
              <div className="core-value-icon-medallion">
                <svg width="36" height="36" viewBox="0 0 52 52" fill="none" className="transition-transform duration-500 group-hover:scale-110">
                  <defs>
                    <linearGradient id="valGoldGrad1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#C6A15B" />
                      <stop offset="50%" stopColor="#E5D2A6" />
                      <stop offset="100%" stopColor="#8C6623" />
                    </linearGradient>
                  </defs>
                  {/* Architectural Parchment Deed with Folded Corner */}
                  <polygon points="9,9 37,9 45,17 45,45 9,45" stroke="url(#valGoldGrad1)" strokeWidth="1.3" fill="rgba(255, 253, 248, 0.95)" />
                  <polyline points="37,9 37,17 45,17" stroke="url(#valGoldGrad1)" strokeWidth="1.1" fill="rgba(229, 210, 166, 0.4)" />
                  {/* Drafting Margin Dashes */}
                  <rect x="12" y="12" width="28" height="29" stroke="#C6A15B" strokeWidth="0.65" strokeDasharray="2 1.5" fill="none" />
                  {/* Deed Technical Clauses */}
                  <line x1="15" y1="16" x2="33" y2="16" stroke="#A9823A" strokeWidth="1.1" strokeLinecap="round" />
                  <line x1="15" y1="20" x2="31" y2="20" stroke="#C6A15B" strokeWidth="0.8" strokeLinecap="round" />
                  <line x1="15" y1="24" x2="27" y2="24" stroke="#C6A15B" strokeWidth="0.8" strokeLinecap="round" />
                  <line x1="15" y1="28" x2="22" y2="28" stroke="#C6A15B" strokeWidth="0.8" strokeLinecap="round" />
                  {/* Embossed Royal Wax Seal Rosette */}
                  <circle cx="33" cy="33" r="8" fill="#1A0709" stroke="url(#valGoldGrad1)" strokeWidth="1.3" />
                  <circle cx="33" cy="33" r="6" stroke="#E5D2A6" strokeWidth="0.7" strokeDasharray="1.2 1.2" fill="none" />
                  {/* Verified DTCP Checkmark */}
                  <path d="M29.5 33l2.2 2.2 4.8-4.8" stroke="#E5D2A6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Twin Ribbon Tails */}
                  <path d="M30 40.5l-3 7 4.5-2 4.5 2-3-7" fill="#1A0709" stroke="url(#valGoldGrad1)" strokeWidth="0.9" strokeLinejoin="round" />
                  {/* Precision Drafting Ink Nib */}
                  <path d="M12 38 L24 26" stroke="#A9823A" strokeWidth="1.6" strokeLinecap="round" />
                  <polygon points="12,38 10,41 14,39" fill="#E5D2A6" stroke="#C6A15B" strokeWidth="0.7" />
                </svg>
              </div>

              {/* Card Body */}
              <div className="p-4 pt-2 sm:p-5 sm:pt-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[9px] tracking-[1.2px] text-gold-antique uppercase font-bold">
                      PILLAR 01 // LEGAL CERTAINTY
                    </span>
                    <span className="font-mono text-[9px] text-gold-dark font-extrabold">
                      01 / 03
                    </span>
                  </div>
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#1A0709] tracking-wide mb-1.5">
                    CLEAR TITLE GUARANTEE
                  </h3>
                  <p className="font-body text-[11px] sm:text-xs text-[#3D141A] leading-relaxed mb-2.5">
                    100% legal verification, comprehensive parent document title searches, and official DTCP &amp; RERA approvals in hand prior to layout release.
                  </p>

                  {/* Technical Benchmark Tray */}
                  <div className="core-value-spec-box">
                    <div className="core-value-spec-line">
                      <span className="text-gold-primary font-bold">✓</span>
                      <span>30-Year Parent Deed &amp; EC History Audit</span>
                    </div>
                    <div className="core-value-spec-line">
                      <span className="text-gold-primary font-bold">✓</span>
                      <span>DTCP / RERA Sanctioned Boundary Markers</span>
                    </div>
                    <div className="core-value-spec-line">
                      <span className="text-gold-primary font-bold">✓</span>
                      <span>Zero Encumbrance Title Warranty</span>
                    </div>
                  </div>
                </div>

                {/* Animated Gold Ruler Accent */}
                <div className="core-value-ruler" />
              </div>
            </div>

            {/* Value 2: ENGINEERED ROADS */}
            <div className="core-value-card group">
              {/* Image Frame with Blueprint Grid Overlay */}
              <div className="core-value-img-wrap">
                <img
                  src="/Images/Shashtika_Engineered_Roads.jpg"
                  alt="Engineered Roads"
                />
                <div className="core-value-grid-overlay" />
                <span className="core-value-badge">
                  40FT INFRASTRUCTURE
                </span>
              </div>

              {/* Realistic Diagrammatic Icon Medallion */}
              <div className="core-value-icon-medallion">
                <svg width="36" height="36" viewBox="0 0 52 52" fill="none" className="transition-transform duration-500 group-hover:scale-110">
                  <defs>
                    <linearGradient id="valGoldGrad2" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#C6A15B" />
                      <stop offset="50%" stopColor="#E5D2A6" />
                      <stop offset="100%" stopColor="#8C6623" />
                    </linearGradient>
                  </defs>
                  {/* Top Dimension Ruler: |← 40 FT →| */}
                  <line x1="9" y1="7" x2="43" y2="7" stroke="url(#valGoldGrad2)" strokeWidth="0.9" />
                  <path d="M11 5.5l-2.5 1.5 2.5 1.5 M41 5.5l2.5 1.5-2.5 1.5" stroke="#C6A15B" strokeWidth="0.9" fill="none" />
                  <text x="26" y="5.2" fontFamily="'Space Mono', monospace" fontSize="4.8" fill="#1A0709" textAnchor="middle" fontWeight="bold">40 FT WIDTH</text>
                  {/* Receding Perspective Avenue to Horizon */}
                  <line x1="5" y1="12" x2="47" y2="12" stroke="#A9823A" strokeWidth="0.8" strokeDasharray="2 1.5" />
                  <line x1="11" y1="42" x2="26" y2="12" stroke="url(#valGoldGrad2)" strokeWidth="1.5" />
                  <line x1="41" y1="42" x2="26" y2="12" stroke="url(#valGoldGrad2)" strokeWidth="1.5" />
                  {/* Dashed Centerline Perspective */}
                  <line x1="26" y1="15" x2="26" y2="19" stroke="#E5D2A6" strokeWidth="0.9" />
                  <line x1="26" y1="23" x2="26" y2="28" stroke="#E5D2A6" strokeWidth="1.2" />
                  <line x1="26" y1="33" x2="26" y2="40" stroke="#E5D2A6" strokeWidth="1.6" />
                  {/* Asphalt Subgrade Cross-Section Layer */}
                  <rect x="7" y="42" width="38" height="6.5" rx="1" fill="#1A0709" stroke="url(#valGoldGrad2)" strokeWidth="1.1" />
                  <line x1="7" y1="45.5" x2="45" y2="45.5" stroke="#C6A15B" strokeWidth="0.6" strokeDasharray="2 1" />
                  {/* Stormwater Conduit Ring */}
                  <circle cx="37" cy="45.5" r="2" stroke="#E5D2A6" strokeWidth="0.8" fill="rgba(198, 161, 91, 0.35)" />
                  {/* Solar Luminaire Lamp Post */}
                  <line x1="12" y1="40" x2="12" y2="20" stroke="url(#valGoldGrad2)" strokeWidth="1.1" />
                  <path d="M12 20c0-2.5 3.5-2.5 4.5-0.5" stroke="url(#valGoldGrad2)" strokeWidth="0.9" fill="none" />
                  <circle cx="16.5" cy="20" r="1.3" fill="#E5D2A6" />
                  <line x1="14" y1="17.5" x2="19" y2="16.5" stroke="#C6A15B" strokeWidth="1.1" strokeLinecap="round" />
                </svg>
              </div>

              {/* Card Body */}
              <div className="p-4 pt-2 sm:p-5 sm:pt-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[9px] tracking-[1.2px] text-gold-antique uppercase font-bold">
                      PILLAR 02 // CIVIL ENGINEERING
                    </span>
                    <span className="font-mono text-[9px] text-gold-dark font-extrabold">
                      02 / 03
                    </span>
                  </div>
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#1A0709] tracking-wide mb-1.5">
                    ENGINEERED ROADS
                  </h3>
                  <p className="font-body text-[11px] sm:text-xs text-[#3D141A] leading-relaxed mb-2.5">
                    Wide multi-layered asphalt avenues, pre-cast concrete kerbstone drainage conduits, and heavy-duty street foundations designed for decades.
                  </p>

                  {/* Technical Benchmark Tray */}
                  <div className="core-value-spec-box">
                    <div className="core-value-spec-line">
                      <span className="text-gold-primary font-bold">✓</span>
                      <span>40FT &amp; 30FT Heavy Tar Asphalt Avenues</span>
                    </div>
                    <div className="core-value-spec-line">
                      <span className="text-gold-primary font-bold">✓</span>
                      <span>Underground Stormwater Drainage Network</span>
                    </div>
                    <div className="core-value-spec-line">
                      <span className="text-gold-primary font-bold">✓</span>
                      <span>Automatic Solar Luminaire Street Lights</span>
                    </div>
                  </div>
                </div>

                {/* Animated Gold Ruler Accent */}
                <div className="core-value-ruler" />
              </div>
            </div>

            {/* Value 3: LEGACY APPRECIATION */}
            <div className="core-value-card group">
              {/* Image Frame with Blueprint Grid Overlay */}
              <div className="core-value-img-wrap">
                <img
                  src="/Images/Shashtika_Legacy_Appreciation.jpg"
                  alt="Legacy Appreciation"
                />
                <div className="core-value-grid-overlay" />
                <span className="core-value-badge">
                  HIGH ROI GROWTH
                </span>
              </div>

              {/* Realistic Diagrammatic Icon Medallion */}
              <div className="core-value-icon-medallion">
                <svg width="36" height="36" viewBox="0 0 52 52" fill="none" className="transition-transform duration-500 group-hover:scale-110">
                  <defs>
                    <linearGradient id="valGoldGrad3" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#C6A15B" />
                      <stop offset="50%" stopColor="#E5D2A6" />
                      <stop offset="100%" stopColor="#8C6623" />
                    </linearGradient>
                  </defs>
                  {/* Surveyor's Astrolabe Degree Ring */}
                  <circle cx="26" cy="26" r="22" stroke="#C6A15B" strokeWidth="0.65" strokeDasharray="1.5 2.5" fill="none" />
                  <line x1="26" y1="3" x2="26" y2="6.5" stroke="url(#valGoldGrad3)" strokeWidth="1.1" />
                  <line x1="49" y1="26" x2="45.5" y2="26" stroke="url(#valGoldGrad3)" strokeWidth="1.1" />
                  <line x1="26" y1="49" x2="26" y2="45.5" stroke="url(#valGoldGrad3)" strokeWidth="1.1" />
                  <line x1="3" y1="26" x2="6.5" y2="26" stroke="url(#valGoldGrad3)" strokeWidth="1.1" />
                  {/* Stepped 3D Equity Pedestals */}
                  <rect x="8" y="34" width="9" height="12" rx="1" fill="rgba(198, 161, 91, 0.18)" stroke="#A9823A" strokeWidth="0.8" />
                  <rect x="21.5" y="25" width="9" height="21" rx="1" fill="rgba(198, 161, 91, 0.32)" stroke="#C6A15B" strokeWidth="0.9" />
                  <rect x="35" y="15" width="9" height="31" rx="1" fill="#1A0709" stroke="url(#valGoldGrad3)" strokeWidth="1.2" />
                  {/* Classical Pitch-Roof Villa Estate Elevation */}
                  <polygon points="39.5,9.5 35.5,13.5 43.5,13.5" fill="#E5D2A6" stroke="url(#valGoldGrad3)" strokeWidth="0.8" />
                  <rect x="37" y="13.5" width="5" height="1.5" fill="#E5D2A6" />
                  {/* Compounding Exponential Growth Vector Arrow */}
                  <path d="M7 42 C 17 40, 27 30, 44 8" stroke="url(#valGoldGrad3)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                  <polygon points="44,8 39.5,9.5 42.5,12.5" fill="#1A0709" stroke="url(#valGoldGrad3)" strokeWidth="0.9" />
                  {/* High ROI Diamond Seal */}
                  <polygon points="26,22 28.5,25.5 26,29 23.5,25.5" fill="#E5D2A6" stroke="#A9823A" strokeWidth="0.8" />
                </svg>
              </div>

              {/* Card Body */}
              <div className="p-4 pt-2 sm:p-5 sm:pt-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[9px] tracking-[1.2px] text-gold-antique uppercase font-bold">
                      PILLAR 03 // VALUE CREATION
                    </span>
                    <span className="font-mono text-[9px] text-gold-dark font-extrabold">
                      03 / 03
                    </span>
                  </div>
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#1A0709] tracking-wide mb-1.5">
                    LEGACY APPRECIATION
                  </h3>
                  <p className="font-body text-[11px] sm:text-xs text-[#3D141A] leading-relaxed mb-2.5">
                    Strategic parcel acquisition strictly along high-growth industrial belts, national highways, and future residential expansion zones in Tamil Nadu.
                  </p>

                  {/* Technical Benchmark Tray */}
                  <div className="core-value-spec-box">
                    <div className="core-value-spec-line">
                      <span className="text-gold-primary font-bold">✓</span>
                      <span>Strategic Highway &amp; AIIMS Corridor Belts</span>
                    </div>
                    <div className="core-value-spec-line">
                      <span className="text-gold-primary font-bold">✓</span>
                      <span>High Compounding Land Value Growth Index</span>
                    </div>
                    <div className="core-value-spec-line">
                      <span className="text-gold-primary font-bold">✓</span>
                      <span>Immediate Deed Registration &amp; Possession</span>
                    </div>
                  </div>
                </div>

                {/* Animated Gold Ruler Accent */}
                <div className="core-value-ruler" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 5-STAGE DEVELOPMENT PROCESS (INTERACTIVE 3D FLIP CARDS) */}
      <section id="process-section" className="py-8 sm:py-12 bg-[#FFFDF8] border-b border-gold-border/60">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-7">
            <span className="architectural-tag">ENGINEERING PRECISION</span>
            <h2 className="font-heading font-extrabold text-xl sm:text-2xl lg:text-3xl text-espresso-950 mt-1.5 mb-2">
              OUR 5-STAGE DEVELOPMENT PROCESS
            </h2>
            <p className="font-body text-xs sm:text-sm text-espresso-700 leading-relaxed">
              How SHASHTIKA transforms raw acreage into legal, fully-engineered, high-appreciation gated plot communities across Tamil Nadu — honest, verified, and transparent at every step.
            </p>
          </div>

          {/* 5-Stage Development Process (2 - 2 - 1 Cards Format) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-[1040px] mx-auto">
            {/* Row 1: 2 Cards (Stage 01 & 02) */}
            {stages.slice(0, 2).map((stage, idx) => renderStageCard(stage, idx))}

            {/* Row 2: 2 Cards (Stage 03 & 04) */}
            {stages.slice(2, 4).map((stage, idx) => renderStageCard(stage, idx + 2))}

            {/* Row 3: 1 Card Centered (Stage 05) */}
            <div className="md:col-span-2 flex justify-center">
              <div className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(50%-1rem)]">
                {renderStageCard(stages[4], 4)}
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="workflow-cta-banner mt-8 sm:mt-10 bg-gradient-to-r from-[#1A0709] via-[#2D0E12] to-[#1A0709] border border-gold-primary rounded-xl p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-5 shadow-xl">
            <div>
              <h4 className="font-heading font-extrabold text-base sm:text-lg text-cream mb-1">
                READY TO INVEST IN A CLEAR-TITLE PLOT?
              </h4>
              <p className="font-body text-[11px] sm:text-xs text-gold-light/80 max-w-xl">
                Explore 64 DTCP-approved plot layouts in Coimbatore &amp; Pollachi with interactive blueprint maps and instant booking details.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#plots"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gold-primary text-espresso-950 font-mono text-xs font-extrabold tracking-wider hover:bg-gold-light transition-all shadow-md flex-shrink-0 cursor-pointer"
              >
                <span>VIEW MASTER PLAN MAP</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
