import React from 'react';
import { WHY_CHOOSE_ITEMS } from '../data/homeData';

export default function WhyChooseSection() {
  const renderIcon = (type) => {
    switch (type) {
      case 'shield':
        // DTCP & RERA APPROVED: Realistic Hand-drawn Architectural Legal Deed & Wax Seal Rosette
        return (
          <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
            {/* Parchment Deed Scroll with Folded Edge */}
            <path d="M10 6h24l6 6v28a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" stroke="url(#goldDrawingGrad)" strokeWidth="1.3" fill="rgba(255, 253, 248, 0.65)" />
            {/* Folded Top-Right Corner */}
            <path d="M34 6v6h6" stroke="url(#goldDrawingGrad)" strokeWidth="1.3" fill="rgba(229, 210, 166, 0.45)" strokeLinejoin="round" />
            {/* Inner Architectural Drafting Border */}
            <rect x="11.5" y="9.5" width="25" height="29" fill="none" stroke="#C6A15B" strokeWidth="0.65" strokeDasharray="2 1.5" />
            {/* Legal Deed Clauses Hand-Drawn Linework */}
            <line x1="14.5" y1="13" x2="31.5" y2="13" stroke="#A9823A" strokeWidth="1.1" strokeLinecap="round" />
            <line x1="14.5" y1="16.5" x2="28" y2="16.5" stroke="#C6A15B" strokeWidth="0.8" strokeLinecap="round" />
            <line x1="14.5" y1="20" x2="22" y2="20" stroke="#C6A15B" strokeWidth="0.8" strokeLinecap="round" />
            {/* Official Embossed Wax Seal Rosette with Radiating Rays */}
            <circle cx="27.5" cy="27" r="7.5" fill="rgba(30, 21, 16, 0.08)" stroke="url(#goldDrawingGrad)" strokeWidth="1.3" />
            <circle cx="27.5" cy="27" r="5.5" fill="none" stroke="#A9823A" strokeWidth="0.7" strokeDasharray="1.5 1.2" />
            {/* Certified Government Checkmark */}
            <path d="M24.5 27l2 2 4.5-4.5" stroke="#7C5A20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Cascading Twin Silk Ribbon Tails */}
            <path d="M24.5 33.5l-3 8.5 4.5-2.5 4.5 2.5-3-8.5" fill="rgba(198, 161, 91, 0.25)" stroke="url(#goldDrawingGrad)" strokeWidth="1.1" strokeLinejoin="round" />
          </svg>
        );
      case 'lock':
        // LUXURY GATED COMMUNITY: Realistic Hand-drawn Grand Classical Gateway & Wrought Iron Filigree
        return (
          <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
            {/* Left Fluted Stone Pillar */}
            <rect x="5" y="38" width="8" height="3" rx="0.5" stroke="url(#goldDrawingGrad)" strokeWidth="1.2" fill="rgba(229, 210, 166, 0.25)" />
            <rect x="6.5" y="14" width="5" height="24" stroke="url(#goldDrawingGrad)" strokeWidth="1" fill="none" />
            <line x1="9" y1="15" x2="9" y2="37" stroke="#A9823A" strokeWidth="0.75" />
            <path d="M5 14h8l-1.5-3.5h-5z" stroke="url(#goldDrawingGrad)" strokeWidth="1.1" fill="rgba(229, 210, 166, 0.35)" />
            <circle cx="9" cy="8" r="1.8" stroke="url(#goldDrawingGrad)" strokeWidth="1.1" fill="#E5D2A6" />
            
            {/* Right Fluted Stone Pillar */}
            <rect x="35" y="38" width="8" height="3" rx="0.5" stroke="url(#goldDrawingGrad)" strokeWidth="1.2" fill="rgba(229, 210, 166, 0.25)" />
            <rect x="36.5" y="14" width="5" height="24" stroke="url(#goldDrawingGrad)" strokeWidth="1" fill="none" />
            <line x1="39" y1="15" x2="39" y2="37" stroke="#A9823A" strokeWidth="0.75" />
            <path d="M35 14h8l-1.5-3.5h-5z" stroke="url(#goldDrawingGrad)" strokeWidth="1.1" fill="rgba(229, 210, 166, 0.35)" />
            <circle cx="39" cy="8" r="1.8" stroke="url(#goldDrawingGrad)" strokeWidth="1.1" fill="#E5D2A6" />

            {/* Overhead Classical Transom Arch */}
            <path d="M11.5 14c3.5-6.5 21.5-6.5 25 0" stroke="url(#goldDrawingGrad)" strokeWidth="1.4" fill="none" />
            <path d="M11.5 17c3.5-4.5 21.5-4.5 25 0" stroke="#C6A15B" strokeWidth="0.8" fill="none" />
            {/* Central Architectural Keystone Medallion */}
            <circle cx="24" cy="9.5" r="2" stroke="url(#goldDrawingGrad)" strokeWidth="1" fill="#FFFDF8" />
            <path d="M24 5.5v2" stroke="url(#goldDrawingGrad)" strokeWidth="1.1" strokeLinecap="round" />

            {/* Twin Wrought Iron Ornamental Gates */}
            <path d="M12 21h11v18h-11z" stroke="#C6A15B" strokeWidth="1" fill="none" />
            <path d="M25 21h11v18h-11z" stroke="#C6A15B" strokeWidth="1" fill="none" />
            {/* Iron Spindles with Finial Spearheads */}
            <line x1="15.5" y1="19.5" x2="15.5" y2="39" stroke="#A9823A" strokeWidth="0.8" />
            <path d="M15.5 18l-1 2h2z" fill="#C6A15B" />
            <line x1="19.5" y1="19.5" x2="19.5" y2="39" stroke="#A9823A" strokeWidth="0.8" />
            <path d="M19.5 18l-1 2h2z" fill="#C6A15B" />
            <line x1="28.5" y1="19.5" x2="28.5" y2="39" stroke="#A9823A" strokeWidth="0.8" />
            <path d="M28.5 18l-1 2h2z" fill="#C6A15B" />
            <line x1="32.5" y1="19.5" x2="32.5" y2="39" stroke="#A9823A" strokeWidth="0.8" />
            <path d="M32.5 18l-1 2h2z" fill="#C6A15B" />

            {/* Decorative Iron Scrollwork Curves */}
            <path d="M12 27c3-3 6 0 9-3 M27 24c3 3 6 0 9 3" stroke="#C6A15B" strokeWidth="0.8" fill="none" />
            {/* Foundation Paved Base */}
            <line x1="3" y1="41" x2="45" y2="41" stroke="#A9823A" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        );
      case 'grid':
        // FLEXIBLE PLOT SIZES: Realistic Hand-drawn Surveyor's Blueprint & Brass Drafting Divider Compass
        return (
          <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
            {/* Architectural Layout Blueprint Sheet */}
            <rect x="7" y="16" width="34" height="26" rx="1.5" stroke="url(#goldDrawingGrad)" strokeWidth="1.2" fill="rgba(255, 253, 248, 0.45)" />
            {/* Internal Plot Division Grid Lines */}
            <line x1="7" y1="29" x2="41" y2="29" stroke="#C6A15B" strokeWidth="0.8" strokeDasharray="2 1.5" />
            <line x1="24" y1="16" x2="24" y2="42" stroke="#C6A15B" strokeWidth="0.8" strokeDasharray="2 1.5" />
            
            {/* Individual Plots */}
            <rect x="10" y="19" width="11" height="7.5" rx="0.5" stroke="#A9823A" strokeWidth="0.8" fill="none" />
            <rect x="27" y="19" width="11" height="7.5" rx="0.5" stroke="#A9823A" strokeWidth="0.8" fill="none" />
            <rect x="10" y="31.5" width="11" height="7.5" rx="0.5" stroke="#A9823A" strokeWidth="0.8" fill="none" />
            {/* Highlighted Plot with Coordinate Dimension Ticks */}
            <rect x="27" y="31.5" width="11" height="7.5" rx="0.5" stroke="url(#goldDrawingGrad)" strokeWidth="1.3" fill="rgba(198, 161, 91, 0.18)" />
            {/* Corner Survey Peg Markers */}
            <circle cx="27" cy="31.5" r="1.1" fill="#C6A15B" />
            <circle cx="38" cy="31.5" r="1.1" fill="#C6A15B" />
            <circle cx="27" cy="39" r="1.1" fill="#C6A15B" />
            <circle cx="38" cy="39" r="1.1" fill="#C6A15B" />

            {/* Surveyor's Brass Drafting Divider Compass */}
            <circle cx="24" cy="6" r="3.2" stroke="url(#goldDrawingGrad)" strokeWidth="1.4" fill="#FFFDF8" />
            <circle cx="24" cy="6" r="1.2" fill="#A9823A" />
            <line x1="24" y1="2.8" x2="24" y2="1" stroke="url(#goldDrawingGrad)" strokeWidth="1.6" strokeLinecap="round" />
            
            {/* Compass Legs Opening Over Site Grid */}
            <path d="M22 8.5L14 26l-3 12" stroke="url(#goldDrawingGrad)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M26 8.5L34 26l3 12" stroke="url(#goldDrawingGrad)" strokeWidth="1.5" strokeLinecap="round" />
            {/* Leg Adjustment Spindle & Dial */}
            <path d="M16 19.5h16" stroke="#E5D2A6" strokeWidth="1.1" />
            <circle cx="24" cy="19.5" r="1.8" stroke="url(#goldDrawingGrad)" strokeWidth="1" fill="#FFFDF8" />
          </svg>
        );
      case 'mapPin':
        // HIGH CONNECTIVITY CORRIDOR: Realistic Hand-drawn Antique Mariner's Compass Rose & Arterial Hub
        return (
          <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
            {/* Outer Cartographic Coordinate Ring */}
            <circle cx="24" cy="24" r="18.5" stroke="url(#goldDrawingGrad)" strokeWidth="1.3" />
            <circle cx="24" cy="24" r="15.5" stroke="#A9823A" strokeWidth="0.75" strokeDasharray="1.5 1.5" />
            
            {/* Cardinal Axis Crosshairs Extending Outside */}
            <line x1="24" y1="2" x2="24" y2="46" stroke="#C6A15B" strokeWidth="1" strokeLinecap="round" />
            <line x1="2" y1="24" x2="46" y2="24" stroke="#C6A15B" strokeWidth="1" strokeLinecap="round" />

            {/* Outer Degree Calibrations */}
            <line x1="24" y1="3" x2="24" y2="5.5" stroke="#E5D2A6" strokeWidth="1.6" />
            <line x1="24" y1="42.5" x2="24" y2="45" stroke="#E5D2A6" strokeWidth="1.6" />
            <line x1="3" y1="24" x2="5.5" y2="24" stroke="#E5D2A6" strokeWidth="1.6" />
            <line x1="42.5" y1="24" x2="45" y2="24" stroke="#E5D2A6" strokeWidth="1.6" />

            {/* 3D Faceted 8-Point Compass Rose Star */}
            {/* North Point */}
            <polygon points="24,6.5 24,24 20.5,24" fill="#C6A15B" stroke="#9C7730" strokeWidth="0.4" />
            <polygon points="24,6.5 24,24 27.5,24" fill="#E5D2A6" stroke="#9C7730" strokeWidth="0.4" />
            {/* South Point */}
            <polygon points="24,41.5 24,24 27.5,24" fill="#C6A15B" stroke="#9C7730" strokeWidth="0.4" />
            <polygon points="24,41.5 24,24 20.5,24" fill="#E5D2A6" stroke="#9C7730" strokeWidth="0.4" />
            {/* East Point */}
            <polygon points="41.5,24 24,24 24,20.5" fill="#C6A15B" stroke="#9C7730" strokeWidth="0.4" />
            <polygon points="41.5,24 24,24 24,27.5" fill="#E5D2A6" stroke="#9C7730" strokeWidth="0.4" />
            {/* West Point */}
            <polygon points="6.5,24 24,24 24,27.5" fill="#C6A15B" stroke="#9C7730" strokeWidth="0.4" />
            <polygon points="6.5,24 24,24 24,20.5" fill="#E5D2A6" stroke="#9C7730" strokeWidth="0.4" />
            {/* Diagonal Points (NE, NW, SE, SW) */}
            <polygon points="34,14 24,24 26,22" fill="#A9823A" />
            <polygon points="14,14 24,24 22,26" fill="#A9823A" />
            <polygon points="34,34 24,24 26,26" fill="#A9823A" />
            <polygon points="14,34 24,24 22,22" fill="#A9823A" />

            {/* Concentric Orbit Highway Waves */}
            <path d="M13 18c5-5 17-5 22 0" fill="none" stroke="#C6A15B" strokeWidth="0.8" strokeDasharray="2 2" />
            <path d="M13 30c5 5 17 5 22 0" fill="none" stroke="#C6A15B" strokeWidth="0.8" strokeDasharray="2 2" />

            {/* Central Hub Jewel */}
            <circle cx="24" cy="24" r="3.2" fill="#1A0709" stroke="url(#goldDrawingGrad)" strokeWidth="1.2" />
            <circle cx="24" cy="24" r="1.3" fill="#E5D2A6" />
          </svg>
        );
      case 'road':
      default:
        // 40 FT ENGINEERED ROADS: Realistic Civil Engineering Perspective Avenue & Infrastructure Sketch
        return (
          <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
            {/* Vanishing Point Horizon Line */}
            <line x1="10" y1="13" x2="38" y2="13" stroke="#A9823A" strokeWidth="0.75" strokeDasharray="2 2" />
            
            {/* Asphalt Roadway Perspective Curbs */}
            <path d="M22 13L5 45" stroke="url(#goldDrawingGrad)" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M26 13L43 45" stroke="url(#goldDrawingGrad)" strokeWidth="1.6" strokeLinecap="round" />
            {/* Sidewalk Gutter Edges */}
            <path d="M19 13L2 45" stroke="#A9823A" strokeWidth="0.9" />
            <path d="M29 13L46 45" stroke="#A9823A" strokeWidth="0.9" />

            {/* Stormwater Drainage Curb Cut Grating */}
            <line x1="5.5" y1="41" x2="9" y2="40" stroke="#C6A15B" strokeWidth="1.2" />
            <line x1="42.5" y1="41" x2="39" y2="40" stroke="#C6A15B" strokeWidth="1.2" />

            {/* Central Roadway Dashed Marking in Deepening Perspective */}
            <line x1="24" y1="14" x2="24" y2="17" stroke="#E5D2A6" strokeWidth="0.9" />
            <line x1="24" y1="20" x2="24" y2="24" stroke="#E5D2A6" strokeWidth="1.2" />
            <line x1="24" y1="28" x2="24" y2="34" stroke="#E5D2A6" strokeWidth="1.6" />
            <line x1="24" y1="38" x2="24" y2="45" stroke="#E5D2A6" strokeWidth="2.1" />

            {/* Flanking Avenue Plantation Trees (Architectural Elevation Linework) */}
            {/* Left Tree */}
            <line x1="11" y1="27" x2="11" y2="34" stroke="#A9823A" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M11 19c-3 0-5 2.5-5 5.5 0 2 2 3.5 5 3.5s5-1.5 5-3.5c0-3-2-5.5-5-5.5z" stroke="url(#goldDrawingGrad)" strokeWidth="1.1" fill="rgba(229, 210, 166, 0.2)" />
            {/* Smaller Distant Left Tree */}
            <line x1="16" y1="17" x2="16" y2="21" stroke="#A9823A" strokeWidth="0.8" />
            <circle cx="16" cy="16" r="2.5" stroke="#C6A15B" strokeWidth="0.8" fill="rgba(229, 210, 166, 0.15)" />

            {/* Right Tree */}
            <line x1="37" y1="27" x2="37" y2="34" stroke="#A9823A" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M37 19c-3 0-5 2.5-5 5.5 0 2 2 3.5 5 3.5s5-1.5 5-3.5c0-3-2-5.5-5-5.5z" stroke="url(#goldDrawingGrad)" strokeWidth="1.1" fill="rgba(229, 210, 166, 0.2)" />
            {/* Smaller Distant Right Tree */}
            <line x1="32" y1="17" x2="32" y2="21" stroke="#A9823A" strokeWidth="0.8" />
            <circle cx="32" cy="16" r="2.5" stroke="#C6A15B" strokeWidth="0.8" fill="rgba(229, 210, 166, 0.15)" />

            {/* Architectural Street Lighting Lamp Post */}
            <path d="M15 23v14 M15 23c0-3 3-4 5.5-2.5" stroke="#E5D2A6" strokeWidth="0.9" fill="none" />
            <circle cx="20.5" cy="20.5" r="1.1" fill="#E5D2A6" />

            {/* Dimension Measurement Callout "40 FT" */}
            <line x1="13" y1="39" x2="35" y2="39" stroke="#E5D2A6" strokeWidth="0.85" strokeDasharray="1.5 1" />
            <line x1="13" y1="37" x2="13" y2="41" stroke="#E5D2A6" strokeWidth="0.85" />
            <line x1="35" y1="37" x2="35" y2="41" stroke="#E5D2A6" strokeWidth="0.85" />
          </svg>
        );
    }
  };

  return (
    <section id="why-choose-section" className="why-choose-shashtika-section sandal-pale-section">
      {/* Multi-layered Sandal Wave Motion Background & Realistic Drawing Gradients */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <defs>
          {/* Hand-Drawn Gold Shading & Architectural Etching Gradients */}
          <linearGradient id="goldDrawingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E5C384" />
            <stop offset="45%" stopColor="#C6A15B" />
            <stop offset="100%" stopColor="#8A631E" />
          </linearGradient>
          <linearGradient id="goldDrawingLight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFF2D6" />
            <stop offset="50%" stopColor="#E5D2A6" />
            <stop offset="100%" stopColor="#C6A15B" />
          </linearGradient>

          <linearGradient id="sandalWaveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E5C384" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#C6A15B" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.30" />
          </linearGradient>
          <linearGradient id="sandalWaveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FAF4E6" stopOpacity="0.40" />
            <stop offset="60%" stopColor="#D8B974" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#C6A15B" stopOpacity="0.32" />
          </linearGradient>
          <linearGradient id="sandalWaveGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C6A15B" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#A88339" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#E5C384" stopOpacity="0.30" />
          </linearGradient>
          <linearGradient id="sandalWaveGrad4" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF7" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#F5E6BE" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#D8B974" stopOpacity="0.35" />
          </linearGradient>
        </defs>
      </svg>

      <div className="sandal-waves-container" aria-hidden="true">
        <svg className="sandal-wave-svg wave-layer-1" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="url(#sandalWaveGrad1)" d="M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,112C672,107,768,149,864,165.3C960,181,1056,171,1152,149.3C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
        <svg className="sandal-wave-svg wave-layer-2" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="url(#sandalWaveGrad2)" d="M0,128L48,149.3C96,171,192,213,288,224C384,235,480,213,576,170.7C672,128,768,64,864,69.3C960,75,1056,149,1152,176C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
        <svg className="sandal-wave-svg wave-layer-3" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="url(#sandalWaveGrad3)" d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,224C672,224,768,160,864,138.7C960,117,1056,139,1152,160C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
        <svg className="sandal-wave-svg wave-layer-4" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="url(#sandalWaveGrad4)" d="M0,64L48,96C96,128,192,192,288,208C384,224,480,192,576,149.3C672,107,768,53,864,64C960,75,1056,149,1152,176C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="why-choose-grid">
          
          {/* Left Column: Advantages */}
          <div>
            <span className="architectural-tag">THE SHASHTIKA BENCHMARK ADVANTAGE</span>
            <h2 className="why-choose-title">
              WHY CHOOSE <span style={{ color: 'var(--gold-antique)' }}>SHASHTIKA GROUP</span>
            </h2>
            <p className="why-choose-sub-desc">
              Pioneering 20 years of legal transparency, premier gated layout infrastructure, and strategic high-growth locations across Coimbatore &amp; Pollachi.
            </p>

            <div className="why-choose-features">
              {WHY_CHOOSE_ITEMS.map((item, idx) => (
                <div key={idx} className="why-choose-item">
                  <div className="why-choose-icon-wrap">
                    {renderIcon(item.icon)}
                  </div>
                  <div>
                    <h3 className="why-choose-item-title">
                      {item.title}
                    </h3>
                    <p className="why-choose-item-desc">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Grand Arch Showcase Frame */}
          <div className="why-choose-arch-wrapper">
            <div className="why-choose-arch-frame">
              <img
                src="/Images/Hero_Arch.jpg"
                alt="SHASHTIKA Entrance Grand Arch Layout"
                className="why-choose-arch-img"
              />
              {/* Luxury Floating Pill Badge */}
              <div className="why-choose-arch-badge">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="3.5" />
                </svg>
                SHASHTIKA GROUPS • 20 YEARS TRUST
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
