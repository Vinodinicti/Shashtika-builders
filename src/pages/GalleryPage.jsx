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

// Curated collection of available real project photographs
const availableGalleryImages = [
  {
    id: 'gal-1',
    src: '/Images/Hero_Arch.jpg',
    title: 'Grand Entrance Gate Arch & Palm Boulevard',
    category: 'arches',
    categoryLabel: 'ENTRANCE ARCH',
    location: 'Pollachi Main Road Enclave',
    desc: 'Majestic 40ft wide gated entrance with perimeter security kiosk and illuminated architectural signage.'
  },
  {
    id: 'gal-2',
    src: '/Images/Shashtika_Engineered_Roads.jpg',
    title: '40ft & 30ft Heavy-Duty Asphalt Tar Roads',
    category: 'roads',
    categoryLabel: 'TAR ROADS',
    location: 'Eachanari Bypass Corridor',
    desc: 'Heavy 4-layer bitumen compaction with concrete road kerbs and underground rainwater runoff lines.'
  },
  {
    id: 'gal-3',
    src: '/Images/Shashtika_Process_2_DTCP.jpg',
    title: 'Government DTCP & RERA Approved Blueprints',
    category: 'planning',
    categoryLabel: 'TOWN PLANNING',
    location: 'Kambalampatti, Pollachi',
    desc: '100% sanctioned layout blueprints with 10% dedicated public park space and wide road corridors.'
  },
  {
    id: 'gal-4',
    src: '/Images/Hero_Villa.jpg',
    title: 'Contemporary Luxury Villa Elevation',
    category: 'villas',
    categoryLabel: 'LUXURY VILLA',
    location: 'Kovaipudur Mountain View',
    desc: 'Custom-designed contemporary residential villa with Western Ghats backdrop and private landscaped lawn.'
  },
  {
    id: 'gal-5',
    src: '/Images/Shashtika_Process_4_Arch.jpg',
    title: 'Gated Security Arch & Boundary Enclosure',
    category: 'arches',
    categoryLabel: 'GATED SECURITY',
    location: 'Anaimalai Taluk Enclave',
    desc: 'Gated community perimeter wall with royal palm landscaping and 24/7 security checkpoint.'
  },
  {
    id: 'gal-6',
    src: '/Images/Shashtika_Process_3_Infra.jpg',
    title: 'Underground Stormwater Drainage Network',
    category: 'roads',
    categoryLabel: 'CIVIL INFRA',
    location: 'Coimbatore Regional Corridor',
    desc: 'Engineered drainage system to prevent waterlogging during monsoon seasons and ensure 30+ year road life.'
  },
  {
    id: 'gal-7',
    src: '/Images/Shashtika_Process_5_Handover.jpg',
    title: 'Numbered Concrete Boundary Corner Stones',
    category: 'construction',
    categoryLabel: 'HANDOVER',
    location: 'Kambalampatti Village Layout',
    desc: 'Clearly planted revenue boundary stones demarcating every individual plot for instant possession.'
  },
  {
    id: 'gal-8',
    src: '/Images/Shashtika_Heritage_Story.jpg',
    title: 'Site Engineering & Technical Layout Audit',
    category: 'planning',
    categoryLabel: 'SITE AUDIT',
    location: 'Pollachi Heritage Enclave',
    desc: 'On-site technical evaluation, groundwater quality testing, and contour mapping by senior civil engineers.'
  },
  {
    id: 'gal-9',
    src: '/Images/Upcoming_Emerald_Palms.jpg',
    title: 'Emerald Palms Gated Residential Layout',
    category: 'villas',
    categoryLabel: 'RESIDENTIAL',
    location: 'Kinathukadavu Bypass',
    desc: 'Scenic plotted enclave nestled amidst coconut groves with 33ft central avenue and sweet groundwater.'
  },
  {
    id: 'gal-10',
    src: '/Images/Construction_Underway.jpg',
    title: 'Road Sub-Base Compaction & Kerbing',
    category: 'construction',
    categoryLabel: 'CONSTRUCTION',
    location: 'Pollachi Corridor Layout',
    desc: 'Mechanical roller compaction of wet-mix macadam stone base prior to asphalt tar paving.'
  },
  {
    id: 'gal-11',
    src: '/Images/Upcoming_Royal_Enclave.jpg',
    title: 'Royal Enclave Master Plotted Township',
    category: 'arches',
    categoryLabel: 'COMMUNITY',
    location: 'Coimbatore Airport Corridor',
    desc: 'Master-planned layout with solar street lighting, underground utilities, and landscaped walkways.'
  },
  {
    id: 'gal-12',
    src: '/Images/Construction_75_Percent.jpg',
    title: 'Tar Road Paving & Solar Luminaire Installation',
    category: 'construction',
    categoryLabel: 'CONSTRUCTION',
    location: 'Anaimalai Highway',
    desc: 'Hot-mix asphalt surfacing and automatic solar street luminaire poles erected across all layout streets.'
  },
  {
    id: 'gal-13',
    src: '/Images/Shashtika_Legacy_Appreciation.jpg',
    title: 'Coconut Grove Agro-Residential Farm Layout',
    category: 'roads',
    categoryLabel: 'GREEN LAYOUT',
    location: 'Mahalingapuram, Pollachi',
    desc: 'Lush greenery, copiously sweet drinking groundwater, and scenic mountain views for tranquil living.'
  },
  {
    id: 'gal-14',
    src: '/Images/Masterplan_Kambalapatti.png',
    title: 'Approved DTCP No. 02/2025 Blueprint Plan',
    category: 'planning',
    categoryLabel: 'BLUEPRINT',
    location: 'S.F.No 209/1 & 222/1A1',
    desc: 'Official 64-plot DTCP approved layout map with 12m Panchayat tar roads and dedicated public park.'
  },
  {
    id: 'gal-15',
    src: '/Images/Upcoming_Green_Valley.jpg',
    title: 'Green Valley Foothill Residential Enclave',
    category: 'villas',
    categoryLabel: 'FOOTHILL ESTATE',
    location: 'Kovaipudur Foothills',
    desc: 'Boutique residential enclave surrounded by scenic hills, cool breeze, and 100% clear parent deeds.'
  },
  {
    id: 'gal-16',
    src: '/Images/Construction_Key_Handover.jpg',
    title: 'Plot Possession & Title Deed Handover',
    category: 'construction',
    categoryLabel: 'HANDOVER',
    location: 'Sub-Registrar Office, Pollachi',
    desc: 'Assisted registration, clear sale deed execution, and individual Patta transfer completed for plot owners.'
  }
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCardId, setActiveCardId] = useState(null);
  const [selectedModalProject, setSelectedModalProject] = useState(null);

  // Photo Gallery Template State
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Keyboard navigation for Lightbox and Project Modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedModalProject(null);
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight' && lightboxIndex !== null) {
        setLightboxIndex((prev) => (prev + 1) % availableGalleryImages.length);
      } else if (e.key === 'ArrowLeft' && lightboxIndex !== null) {
        setLightboxIndex((prev) => (prev - 1 + availableGalleryImages.length) % availableGalleryImages.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const filteredProjects = galleryProjects.filter(p => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  const handleCardClick = (proj) => {
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

  const openLightboxByImgId = (imgId) => {
    const index = availableGalleryImages.findIndex((item) => item.id === imgId);
    if (index !== -1) {
      setLightboxIndex(index);
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

            <div className="flex flex-wrap items-center gap-4 mt-6">
              <a
                href="#gallery-grid-section"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('gallery-grid-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
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
          CONTINUOUS SCROLLING REEL & INTERACTIVE PHOTO GALLERY TEMPLATE
          ========================================================================= */}
      <section className="py-16 md:py-24 bg-[#FFFDF9]" style={{ borderTop: '1px solid var(--gold-border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="architectural-tag">VISUAL ARCHIVE &amp; LIVE SITE REEL</span>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.5rem, 2.3vw, 2.2rem)',
              color: '#1A0709',
              marginTop: '6px',
              marginBottom: '10px',
              fontWeight: 800,
              letterSpacing: '0.5px'
            }}>
              PROJECT DEVELOPMENTS &amp; PHOTO GALLERY
            </h2>
            <p style={{ color: '#521D24', fontSize: '0.92rem', lineHeight: '1.6' }}>
              Explore real photographs from our completed and ongoing plotted layouts, grand entrance arches, 40ft blacktop tar roads, underground drainage, and landscape development across Coimbatore &amp; Pollachi.
            </p>
          </div>

          {/* 1. CONTINUOUS DUAL-TRACK AUTO-SCROLLING MARQUEE */}
          <div className="mb-14">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="font-mono text-xs font-bold text-gold-dark tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                LIVE SITE PHOTOGRAPHY REEL (AUTO-SCROLLING • HOVER TO PAUSE)
              </span>
              <span className="hidden sm:inline font-mono text-xs text-espresso-600">
                Click any image to enlarge 🔍
              </span>
            </div>

            {/* Scrolling Track 1 (Moves Left) */}
            <div className="gallery-marquee-container mb-4">
              <div className="gallery-marquee-track-left">
                {[...availableGalleryImages.slice(0, 8), ...availableGalleryImages.slice(0, 8)].map((item, idx) => (
                  <div
                    key={`track1-${item.id}-${idx}`}
                    className="gallery-marquee-card"
                    onClick={() => openLightboxByImgId(item.id)}
                  >
                    <img src={item.src} alt={item.title} loading="lazy" />
                    <div className="gallery-marquee-overlay">
                      <div className="flex justify-between items-start">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#1A0709] text-gold-light border border-gold-primary/50 shadow-xs">
                          {item.categoryLabel}
                        </span>
                        <span className="w-6 h-6 rounded-full bg-gold-primary text-espresso-950 flex items-center justify-center text-xs font-bold shadow-sm">
                          +
                        </span>
                      </div>
                      <div>
                        <h4 className="font-heading text-xs font-bold text-cream line-clamp-1 leading-snug">
                          {item.title}
                        </h4>
                        <span className="font-mono text-[10px] text-gold-light/90 block mt-0.5">
                          📍 {item.location}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scrolling Track 2 (Moves Right) */}
            <div className="gallery-marquee-container">
              <div className="gallery-marquee-track-right">
                {[...availableGalleryImages.slice(8, 16), ...availableGalleryImages.slice(8, 16)].map((item, idx) => (
                  <div
                    key={`track2-${item.id}-${idx}`}
                    className="gallery-marquee-card"
                    onClick={() => openLightboxByImgId(item.id)}
                  >
                    <img src={item.src} alt={item.title} loading="lazy" />
                    <div className="gallery-marquee-overlay">
                      <div className="flex justify-between items-start">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#1A0709] text-gold-light border border-gold-primary/50 shadow-xs">
                          {item.categoryLabel}
                        </span>
                        <span className="w-6 h-6 rounded-full bg-gold-primary text-espresso-950 flex items-center justify-center text-xs font-bold shadow-sm">
                          +
                        </span>
                      </div>
                      <div>
                        <h4 className="font-heading text-xs font-bold text-cream line-clamp-1 leading-snug">
                          {item.title}
                        </h4>
                        <span className="font-mono text-[10px] text-gold-light/90 block mt-0.5">
                          📍 {item.location}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CALL TO ACTION BANNER */}
          <div className="workflow-cta-banner mt-16 bg-gradient-to-r from-[#1A0709] via-[#2D0E12] to-[#1A0709] border border-gold-primary rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', color: '#FFFDF7', marginBottom: '6px', fontWeight: 700 }}>
                EXPLORE VERIFIED RESIDENTIAL PLOT LAYOUTS
              </h4>
              <p style={{ color: '#E5D2A6', fontSize: '0.92rem' }}>
                View complete DTCP approved layout blueprints, individual plot dimensions, and real-time availability across Coimbatore &amp; Pollachi.
              </p>
            </div>
            <a href="#plots" className="btn-gold whitespace-nowrap">
              VIEW MASTER PLAN BLUEPRINTS
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FULL-SCREEN HIGH-RESOLUTION LIGHTBOX MODAL
          ========================================================================= */}
      {lightboxIndex !== null && availableGalleryImages[lightboxIndex] && (
        <div
          className="gallery-lightbox-overlay"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#1A0709] rounded-2xl border-2 border-gold-primary shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Navigation & Close */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gold-primary/30 bg-[#100405] text-cream">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-[#1A0709] text-gold-light border border-gold-primary/50 shadow-xs">
                  {availableGalleryImages[lightboxIndex].categoryLabel}
                </span>
                <span className="font-mono text-xs text-gold-light/80">
                  {lightboxIndex + 1} / {availableGalleryImages.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev - 1 + availableGalleryImages.length) % availableGalleryImages.length);
                  }}
                  className="w-8 h-8 rounded-full border border-gold-border/40 text-cream hover:bg-gold-primary hover:text-espresso-950 flex items-center justify-center transition-all cursor-pointer font-bold"
                  title="Previous (Left Arrow)"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev + 1) % availableGalleryImages.length);
                  }}
                  className="w-8 h-8 rounded-full border border-gold-border/40 text-cream hover:bg-gold-primary hover:text-espresso-950 flex items-center justify-center transition-all cursor-pointer font-bold"
                  title="Next (Right Arrow)"
                >
                  →
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  className="w-8 h-8 rounded-full border border-gold-primary text-gold-light hover:bg-gold-primary hover:text-espresso-950 flex items-center justify-center text-lg font-bold transition-all ml-2 cursor-pointer"
                  title="Close (Esc)"
                >
                  &times;
                </button>
              </div>
            </div>

            {/* Lightbox Center Image Wrap */}
            <div className="relative bg-black flex items-center justify-center overflow-hidden flex-1 min-h-[300px] max-h-[60vh]">
              <img
                src={availableGalleryImages[lightboxIndex].src}
                alt={availableGalleryImages[lightboxIndex].title}
                className="max-h-[60vh] w-auto max-w-full object-contain mx-auto"
              />
            </div>

            {/* Bottom Caption & Action Footer */}
            <div className="p-4 sm:p-5 bg-gradient-to-b from-[#1A0709] to-[#100405] border-t border-gold-primary/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading font-bold text-base sm:text-lg text-cream leading-snug">
                  {availableGalleryImages[lightboxIndex].title}
                </h3>
                <p className="font-body text-xs text-gold-light/80 mt-1 max-w-xl">
                  {availableGalleryImages[lightboxIndex].desc}
                </p>
                <span className="font-mono text-xs text-gold-antique mt-1 block">
                  📍 {availableGalleryImages[lightboxIndex].location}
                </span>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <a
                  href={`https://wa.me/919363599754?text=${encodeURIComponent(`Hello SHASHTIKA, I am enquiring about photograph: "${availableGalleryImages[lightboxIndex].title}" (${availableGalleryImages[lightboxIndex].location}). Please share more project details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer whitespace-nowrap"
                >
                  💬 ENQUIRE ON WHATSAPP
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  WHATSAPP ENQUIRY →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
