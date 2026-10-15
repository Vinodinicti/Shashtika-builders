import React, { useState, useEffect } from 'react';

// Project Database identical to the original archive
const galleryProjects = [
  {
    id: 'proj-1',
    category: 'plotted',
    categoryBadge: 'PLOTTED LAYOUT',
    verticalLabel: 'SHASHTIKA GOLDEN VISTAS',
    title: 'SHASHTIKA Golden Vistas',
    modalTitle: 'SHASHTIKA GOLDEN VISTAS',
    location: 'Pollachi Main Road, Coimbatore',
    locationTag: 'POLLACHI MAIN ROAD',
    tag: 'FLAGSHIP GATED COMMUNITY',
    status: '100% DTCP APPROVED',
    modalStatus: 'ONGOING LAYOUT',
    statusBadgeClass: 'bg-gold-primary text-[#1A0709]',
    img: '/Images/Hero_Arch.jpg',
    cadLabel: 'CAD BLUEPRINT ACTIVE',
    shortSpecs: '145 Units • 40ft Roads',
    totalPlots: '228 DTCP Approved Plots',
    roadWidth: '40 Ft Main Boulevard & 30 Ft Streets',
    plotSizes: '2.0 to 10.0+ Cents (1,200 - 4,500 Sq.Ft)',
    approval: 'DTCP Approval No. 123/2024 • RERA Registered',
    price: 'Starting ₹ 21.60 Lakhs',
    highlights: 'Grand architectural entrance arch, 24/7 security kiosk, underground drainage, solar streetlights, and 10% reserved landscape park area.',
    description: 'Our flagship 22-acre gated plotted layout strategically located on Pollachi Main Road. Designed with wide 40ft asphalt roads, lush coconut groves, and instant bank loan approval.'
  },
  {
    id: 'proj-2',
    category: 'villas',
    categoryBadge: 'LUXURY VILLAS',
    verticalLabel: 'SAKTHI PALM GROVE',
    title: 'Sakthi Palm Grove',
    modalTitle: 'SAKTHI PALM GROVE',
    location: 'Kovaipudur Bypass Corridor, Coimbatore',
    locationTag: 'KOVAIPUDUR ENCLAVE',
    tag: 'LUXURY VILLA ENCLAVE',
    status: 'LAUNCHING SOON',
    modalStatus: 'LAUNCHING SOON',
    statusBadgeClass: 'bg-gold-primary text-[#1A0709]',
    img: '/Images/Hero_Villa.jpg',
    cadLabel: 'VILLA ELEVATION CAD',
    shortSpecs: '85 Villa Sites • Mountain View',
    totalPlots: '85 Premium Villa Sites',
    roadWidth: '40 Ft Asphalt Avenues',
    plotSizes: '3.0 to 8.0 Cents (1,306 - 3,480 Sq.Ft)',
    approval: 'DTCP Approved Layout',
    price: 'Starting ₹ 28.50 Lakhs',
    highlights: 'Panoramic Western Ghats mountain views, gated compound perimeter wall, rainwater harvesting pits, and children play garden.',
    description: 'Exclusive villa plot enclave nestled in the serene foothills of Kovaipudur, featuring turnkey custom house construction by SHASHTIKA engineers.'
  },
  {
    id: 'proj-3',
    category: 'completed',
    categoryBadge: 'FARM PLOTS',
    verticalLabel: 'SHASHTIKA GREEN ENCLAVE',
    title: 'SHASHTIKA Green Enclave',
    modalTitle: 'SHASHTIKA GREEN ENCLAVE',
    location: 'Mahalingapuram, Pollachi',
    locationTag: 'MAHALINGAPURAM',
    tag: 'PREMIUM FARM PLOTS',
    status: 'DELIVERED',
    modalStatus: 'COMPLETED & DELIVERED',
    statusBadgeClass: 'bg-[#C6A15B] text-[#1A0709]',
    img: '/Images/Shashtika_Legacy_Appreciation.jpg',
    cadLabel: 'FARM BOUNDARY MAP',
    shortSpecs: '120 Farm Parcels • Sold Out',
    totalPlots: '120 Agricultural-to-Residential Plots',
    roadWidth: '30 Ft & 40 Ft Concrete Kerb Roads',
    plotSizes: '5.0 to 15.0 Cents',
    approval: '100% Clear Title • Parent Deed Verified',
    price: 'Sold Out (High ROI Appreciation)',
    highlights: 'Mature coconut plantations, drip irrigation, electricity connection to every plot boundary, and 24/7 water supply.',
    description: 'A benchmark green farm plot development in Pollachi delivered with complete legal verification and 100% customer satisfaction.'
  },
  {
    id: 'proj-4',
    category: 'infra',
    categoryBadge: 'INFRASTRUCTURE',
    verticalLabel: 'EACHANARI HERITAGE',
    title: 'Eachanari Heritage Layout',
    modalTitle: 'EACHANARI HERITAGE LAYOUT',
    location: 'Eachanari Bypass Highway, Coimbatore',
    locationTag: 'EACHANARI HIGHWAY',
    tag: 'HIGHWAY CORRIDOR ENCLAVE',
    status: 'FEW PLOTS LEFT',
    modalStatus: 'FEW PLOTS AVAILABLE',
    statusBadgeClass: 'bg-gold-primary text-[#1A0709]',
    img: '/Images/Shashtika_Engineered_Roads.jpg',
    cadLabel: 'HIGHWAY CORRIDOR CAD',
    shortSpecs: '64 Parcels • 40ft Highway Road',
    totalPlots: '64 Gated Layout Parcels',
    roadWidth: '40 Ft Heavy-Duty Asphalt Road',
    plotSizes: '2.5 to 6.0 Cents',
    approval: 'DTCP Approval No. 88/2023',
    price: 'Starting ₹ 24.80 Lakhs',
    highlights: 'Direct connectivity to NH-209, 5 mins from top engineering institutions, underground utilities, and 24/7 solar lighting.',
    description: 'Prime residential layout offering high connectivity to industrial corridors, top engineering colleges, and IT hubs.'
  },
  {
    id: 'proj-5',
    category: 'plotted',
    categoryBadge: 'URBAN PLOTS',
    verticalLabel: 'PEELAMEDU PARK VISTAS',
    title: 'Peelamedu Park Vistas',
    modalTitle: 'PEELAMEDU PARK VISTAS',
    location: 'Peelamedu Main Rd, Coimbatore',
    locationTag: 'PEELAMEDU ROAD',
    tag: 'URBAN PLOTTED COMMUNITY',
    status: 'COMPLETED',
    modalStatus: 'COMPLETED',
    statusBadgeClass: 'bg-gold-primary text-[#1A0709]',
    img: '/Images/Plots_Hero_Bg.jpg',
    cadLabel: 'URBAN SURVEY GRID',
    shortSpecs: '42 Urban Sites • Airport Corridor',
    totalPlots: '42 Urban Plots',
    roadWidth: '30 Ft Internal Roads',
    plotSizes: '2.0 to 4.5 Cents',
    approval: 'DTCP & Local Body Approved',
    price: 'Starting ₹ 32.00 Lakhs',
    highlights: 'Gated entrance, corporation water supply connection, proximity to Coimbatore International Airport & major hospitals.',
    description: 'Urban plotted layout offering prime city convenience near Coimbatore International Airport and major healthcare hubs.'
  },
  {
    id: 'proj-6',
    category: 'plotted',
    categoryBadge: 'PARK LAYOUT',
    verticalLabel: 'SHASHTIKA HERITAGE GARDENS',
    title: 'SHASHTIKA Heritage Gardens',
    modalTitle: 'SHASHTIKA HERITAGE GARDENS',
    location: 'Hope College Corridor, Coimbatore',
    locationTag: 'HOPE COLLEGE',
    tag: 'HERITAGE LANDSCAPE LAYOUT',
    status: 'ONGOING',
    modalStatus: 'ONGOING',
    statusBadgeClass: 'bg-gold-primary text-[#1A0709]',
    img: '/Images/Shashtika_Heritage_Story.jpg',
    cadLabel: 'PARK LAYOUT BLUEPRINT',
    shortSpecs: '96 Gated Sites • Park Included',
    totalPlots: '96 Gated Residential Plots',
    roadWidth: '40 Ft & 30 Ft Asphalt Roads',
    plotSizes: '2.75 to 7.5 Cents',
    approval: 'DTCP & RERA Approved',
    price: 'Starting ₹ 29.90 Lakhs',
    highlights: 'Lush avenue trees, compound wall security, underground drainage lines, and walking track.',
    description: 'Heritage residential community combining eco-friendly landscaping with robust civil infrastructure built under SHASHTIKA.'
  }
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCardId, setActiveCardId] = useState(null);
  const [selectedModalProject, setSelectedModalProject] = useState(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedModalProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredProjects = galleryProjects.filter(p => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  const handleCardClick = (proj) => {
    // If mobile or already active, open the full modal
    if (window.innerWidth <= 900) {
      if (activeCardId === proj.id) {
        setSelectedModalProject(proj);
      } else {
        setActiveCardId(proj.id);
      }
    } else {
      setSelectedModalProject(proj);
    }
  };

  return (
    <div className="bg-[#F8F3EA] min-h-screen text-[#1A0709]">
      {/* =========================================================================
          HERO COMPACT SECTION
          ========================================================================= */}
      <section className="gallery-hero-compact">
        {/* Full Edge-to-Edge Entrance Arch Background Image */}
        <div className="gallery-hero-bg-img" />

        {/* Rich Luxury Dark Vignette Overlay */}
        <div className="gallery-hero-fade" />

        {/* Main Container - Exact matching max-w-[1320px] and alignment as Plot Hero */}
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8 w-full flex flex-col justify-center h-full relative z-[3] flex-1">
          <div className="hero-fit-content">
            <div className="architectural-tag" style={{ marginBottom: '14px', color: '#E5D2A6' }}>
              ARCHITECTURAL PORTFOLIO &amp; GALLERY
            </div>

            <h1 className="hero-headline">
              <span className="gold-hero-badge">OUR PORTFOLIO</span>
              <br />
              <span style={{ color: '#E5D2A6' }}>REAL ESTATE</span>
              <br />
              <span style={{ color: '#E5D2A6' }}>DEVELOPMENTS</span>
            </h1>

            <p className="hero-subtext">
              Explore DTCP-approved layouts, entrance arches, 40 FT roads, and luxury villa projects across Coimbatore &amp; Pollachi.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-6">
              <a
                href="#gallery-grid-section"
                className="inline-flex items-center gap-2 px-5 py-3 rounded bg-gold-primary text-espresso-950 font-mono text-[0.78rem] font-extrabold tracking-[1.5px] border border-gold-light hover:bg-gold-light transition-all shadow-[0_6px_20px_rgba(0,0,0,0.4)] cursor-pointer"
              >
                EXPLORE GALLERY
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <a
                href="#plots"
                className="inline-flex items-center gap-2 px-5 py-3 rounded border-[1.8px] border-gold-primary text-cream font-mono text-[0.78rem] font-extrabold tracking-[1.5px] bg-gold-primary/20 backdrop-blur-md hover:bg-gold-primary hover:text-espresso-950 transition-all shadow-[0_4px_18px_rgba(0,0,0,0.4)] cursor-pointer"
              >
                VIEW PLOTS MAP
              </a>
            </div>
          </div>

          {/* FULL WIDTH ANIMATED EDITORIAL STATISTICS BANNER */}
          <div className="hero-stats-banner" style={{ maxWidth: '680px', gridTemplateColumns: 'repeat(4, 1fr)', marginTop: '28px' }}>
            <div className="stat-card">
              <span className="stat-number">6</span>
              <span className="stat-label">Master Projects</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">228+</span>
              <span className="stat-label">DTCP Plots</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">40 FT</span>
              <span className="stat-label">Asphalt Roads</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">100%</span>
              <span className="stat-label">Legal Clear</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          GALLERY GRID & CLASSIFYING FILTER SECTION
          ========================================================================= */}
      <section className="py-16 md:py-20" id="gallery-grid-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* CLASSIFYING FILTER BAR */}
          <div className="gallery-filter-bar">
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--gold-antique)',
              fontWeight: 700,
              letterSpacing: '1.5px',
              marginRight: '8px'
            }}>
              CLASSIFY PROJECTS:
            </span>
            <button
              onClick={() => { setActiveFilter('all'); setActiveCardId(null); }}
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            >
              ALL PROJECTS ({galleryProjects.length})
            </button>
            <button
              onClick={() => { setActiveFilter('plotted'); setActiveCardId(null); }}
              className={`filter-btn ${activeFilter === 'plotted' ? 'active' : ''}`}
            >
              PLOTTED LAYOUTS
            </button>
            <button
              onClick={() => { setActiveFilter('villas'); setActiveCardId(null); }}
              className={`filter-btn ${activeFilter === 'villas' ? 'active' : ''}`}
            >
              LUXURY VILLAS
            </button>
            <button
              onClick={() => { setActiveFilter('infra'); setActiveCardId(null); }}
              className={`filter-btn ${activeFilter === 'infra' ? 'active' : ''}`}
            >
              INFRASTRUCTURE
            </button>
            <button
              onClick={() => { setActiveFilter('completed'); setActiveCardId(null); }}
              className={`filter-btn ${activeFilter === 'completed' ? 'active' : ''}`}
            >
              DELIVERED
            </button>
          </div>

          {/* UIVERSE-INSPIRED ACCORDION EXPANDING CARDS ENGINE */}
          <div
            className="gallery-grid"
            onMouseLeave={() => setActiveCardId(null)}
          >
            {filteredProjects.map((proj) => {
              const isActive = activeCardId === proj.id;
              return (
                <div
                  key={proj.id}
                  className={`gallery-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleCardClick(proj)}
                  onMouseEnter={() => {
                    if (window.innerWidth > 900) setActiveCardId(proj.id);
                  }}
                >
                  {/* Collapsed Vertical Running Label */}
                  <div className="gallery-vertical-label">
                    <span>{proj.verticalLabel}</span>
                  </div>

                  {/* Dedicated Image Container */}
                  <div className="gallery-item-img-wrap">
                    <img src={proj.img} alt={proj.title} loading="lazy" />

                    {/* Top Classifying Bar Badges */}
                    <div className="gallery-classifying-bar">
                      <div className="gallery-badge-left">
                        <span className="gallery-classifying-badge">
                          {proj.categoryBadge}
                        </span>
                        <span className="gallery-cad-pill">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                          {proj.cadLabel}
                        </span>
                      </div>
                      <span className="gallery-status-badge">
                        {proj.status}
                      </span>
                    </div>
                  </div>

                  {/* Card Bottom Body */}
                  <div className="gallery-card-body">
                    <div>
                      <span className="architectural-tag">
                        — {proj.locationTag} —
                      </span>
                      <h4>{proj.title}</h4>
                    </div>
                    <div className="gallery-card-specs-footer">
                      <span>{proj.shortSpecs}</span>
                      <span className="specs-action">CLICK View Specs →</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CIVIL ENGINEERING STANDARDS SHOWCASE (3 DIAGRAMMATIC MOTION CARDS)
          ========================================================================= */}
      <section className="py-16 md:py-24 bg-[#FFFDF9]" style={{ borderTop: '1px solid var(--gold-border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="architectural-tag">ENGINEERING STANDARDS</span>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.4rem, 2.1vw, 1.85rem)',
              color: '#0A1325',
              marginTop: '6px',
              marginBottom: '10px',
              fontWeight: 800
            }}>
              CIVIL ENGINEERING EXCELLENCE
            </h2>
            <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.6' }}>
              Every photograph in our gallery reflects SHASHTIKA's commitment to rigorous civil construction, legal town planning, and environmental aesthetics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Realistic Road & Infrastructure Showcase */}
            <div className="diagrammatic-card">
              <div className="diagrammatic-canvas">
                <img
                  src="/Images/Shashtika_Engineered_Roads.jpg"
                  alt="40ft and 30ft Engineered Tar Roads"
                  className="realistic-showcase-img"
                />
                <div className="realistic-motion-tint" />
                <div className="realistic-canvas-badge">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>40FT DUAL CARRIAGEWAY</span>
                </div>
                <div className="road-perspective-laser" />
                <div className="road-headlight-glider" />
                <div className="realistic-callout-pill">
                  <span>|← 40 FT ROADWAY + 6 FT STORM DRAIN →|</span>
                  <span className="text-emerald-400 font-bold">● ACTIVE</span>
                </div>
              </div>
              <div className="diagrammatic-card-body">
                <span className="architectural-tag">01. INFRASTRUCTURE</span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: '#0A1325', margin: '10px 0 12px', fontWeight: 700 }}>
                  40FT &amp; 30FT HEAVY TAR ROADS
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: '1.65' }}>
                  Laying 4-layer asphalt compaction with concrete kerb stones and rainwater runoff channels for 30+ year road longevity.
                </p>
              </div>
            </div>

            {/* Card 2: Realistic Town Planning Blueprint Showcase */}
            <div className="diagrammatic-card">
              <div className="diagrammatic-canvas">
                <img
                  src="/Images/Shashtika_Process_2_DTCP.jpg"
                  alt="DTCP and RERA Approved Blueprints"
                  className="realistic-showcase-img"
                />
                <div className="realistic-motion-tint" />
                <div className="realistic-canvas-badge">
                  <span className="w-2 h-2 rounded-full bg-gold-primary animate-pulse" />
                  <span>DTCP / RERA VERIFIED</span>
                </div>
                <div className="blueprint-scanner-beam" />
                {/* Rotating Surveyor Reticle */}
                <svg className="blueprint-surveyor-reticle" viewBox="0 0 44 44" fill="none">
                  <circle cx="22" cy="22" r="18" stroke="#E5D2A6" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="22" cy="22" r="2.5" fill="#C6A15B" />
                  <line x1="2" y1="22" x2="42" y2="22" stroke="#C6A15B" strokeWidth="1" />
                  <line x1="22" y1="2" x2="22" y2="42" stroke="#C6A15B" strokeWidth="1" />
                </svg>
                <div className="realistic-callout-pill">
                  <span>✓ 100% DTCP APPROVED BLUEPRINTS</span>
                  <span className="text-gold-light font-bold">10% PARK</span>
                </div>
              </div>
              <div className="diagrammatic-card-body">
                <span className="architectural-tag">02. TOWN PLANNING</span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: '#0A1325', margin: '10px 0 12px', fontWeight: 700 }}>
                  DTCP &amp; RERA APPROVED BLUEPRINTS
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: '1.65' }}>
                  100% legal title clearance, 10% dedicated open space park reservation, and instant 80% bank loan approval across all layouts.
                </p>
              </div>
            </div>

            {/* Card 3: Realistic Entrance Arch Elevation Showcase */}
            <div className="diagrammatic-card">
              <div className="diagrammatic-canvas">
                <img
                  src="/Images/Hero_Arch.jpg"
                  alt="Architectural Entrance Arches"
                  className="realistic-showcase-img"
                />
                <div className="realistic-motion-tint" />
                <div className="realistic-canvas-badge">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>24/7 GATED SECURITY</span>
                </div>
                <div className="arch-spotlight-sheen" />
                <div className="realistic-callout-pill">
                  <span>GRAND ENTRANCE ARCH &amp; PALM AVENUE</span>
                  <span className="text-emerald-400 font-bold">SECURED</span>
                </div>
              </div>
              <div className="diagrammatic-card-body">
                <span className="architectural-tag">03. LANDSCAPING</span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: '#0A1325', margin: '10px 0 12px', fontWeight: 700 }}>
                  ARCHITECTURAL ENTRANCE ARCHES
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: '1.65' }}>
                  Grand entrance gates, 24/7 security kiosks, perimeter compound walling, and royal avenue palm trees.
                </p>
              </div>
            </div>
          </div>

          {/* CALL TO ACTION BANNER */}
          <div className="workflow-cta-banner mt-14">
            <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', color: '#FFFDF7', marginBottom: '6px', fontWeight: 700 }}>
                READY TO EXPLORE OUR DEVELOPMENTS IN PERSON?
              </h4>
              <p style={{ color: '#E5D2A6', fontSize: '0.92rem' }}>
                Book a complimentary site visit with our project engineers to inspect plot boundaries and road layouts.
              </p>
            </div>
            <a href="#quick-enquiry-section" className="btn-gold">
              SCHEDULE A SITE VISIT
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE PROJECT DETAIL MODAL POPUP
          ========================================================================= */}
      {selectedModalProject && (
        <div
          className={`project-modal-overlay open`}
          onClick={(e) => {
            if (e.target.classList.contains('project-modal-overlay')) {
              setSelectedModalProject(null);
            }
          }}
        >
          <div className="project-modal-card">
            {/* Close Button */}
            <button
              className="project-modal-close"
              onClick={() => setSelectedModalProject(null)}
              aria-label="Close Modal"
            >
              &times;
            </button>

            {/* Modal Image with Status Badge */}
            <div className="project-modal-img-wrap">
              <img src={selectedModalProject.img} alt={selectedModalProject.title} />
              <div className="project-modal-badge">
                <span className="font-mono text-xs font-bold px-3 py-1 rounded bg-gold-primary text-[#1A0709]">
                  {selectedModalProject.modalStatus}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="project-modal-body">
              <span className="architectural-tag">
                {selectedModalProject.tag}
              </span>
              <h2 className="project-modal-title">
                {selectedModalProject.modalTitle}
              </h2>
              <p className="project-modal-location">
                {selectedModalProject.location}
              </p>

              <p className="project-modal-desc">
                {selectedModalProject.description}
              </p>

              {/* Specification Grid */}
              <div className="project-spec-grid">
                <div className="project-spec-item">
                  <span className="project-spec-label">TOTAL PLOTS</span>
                  <span className="project-spec-val">{selectedModalProject.totalPlots}</span>
                </div>
                <div className="project-spec-item">
                  <span className="project-spec-label">ROAD WIDTHS</span>
                  <span className="project-spec-val">{selectedModalProject.roadWidth}</span>
                </div>
                <div className="project-spec-item">
                  <span className="project-spec-label">PLOT SIZES</span>
                  <span className="project-spec-val">{selectedModalProject.plotSizes}</span>
                </div>
                <div className="project-spec-item">
                  <span className="project-spec-label">APPROVAL STATUS</span>
                  <span className="project-spec-val">{selectedModalProject.approval}</span>
                </div>
                <div className="project-spec-item">
                  <span className="project-spec-label">PRICING</span>
                  <span className="project-spec-val text-gold-antique">{selectedModalProject.price}</span>
                </div>
              </div>

              {/* Project Highlights Callout Box */}
              <div className="project-modal-highlights-box">
                <strong style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--gold-antique)',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '4px'
                }}>
                  PROJECT HIGHLIGHTS
                </strong>
                <p style={{ lineHeight: '1.55', color: '#1A0709' }}>
                  {selectedModalProject.highlights}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#plots"
                  className="btn-primary"
                  onClick={() => setSelectedModalProject(null)}
                >
                  EXPLORE MASTER MAP
                </a>
                <a
                  href={`https://wa.me/919363599754?text=${encodeURIComponent(`Hello SHASHTIKA, I would like to enquire about ${selectedModalProject.modalTitle} (${selectedModalProject.location})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                >
                  ENQUIRE ON WHATSAPP →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
