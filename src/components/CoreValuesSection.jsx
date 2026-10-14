import React from 'react';

export default function CoreValuesSection() {
  return (
    <section id="core-values-section" className="py-16 sm:py-24 bg-[#FAF5EB] border-b border-gold-border/60 relative overflow-hidden">
      {/* Subtle Ambient Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[12vw] font-black text-gold-primary/[0.03] select-none pointer-events-none whitespace-nowrap">
        SHASHTIKA PILLARS
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="architectural-tag">CORE ARCHITECTURAL PILLARS</span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#1A0709] mt-2 mb-3 tracking-wide">
            OUR CORE VALUES
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#3D141A] leading-relaxed">
            The fundamental architectural, engineering, and legal benchmarks that guide every SHASHTIKA township development across Tamil Nadu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
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
              <svg width="44" height="44" viewBox="0 0 52 52" fill="none" className="transition-transform duration-500 group-hover:scale-110">
                <defs>
                  <linearGradient id="coreValGoldGrad1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#C6A15B" />
                    <stop offset="50%" stopColor="#E5D2A6" />
                    <stop offset="100%" stopColor="#8C6623" />
                  </linearGradient>
                </defs>
                {/* Architectural Parchment Deed with Folded Corner */}
                <polygon points="9,9 37,9 45,17 45,45 9,45" stroke="url(#coreValGoldGrad1)" strokeWidth="1.3" fill="rgba(255, 253, 248, 0.95)" />
                <polyline points="37,9 37,17 45,17" stroke="url(#coreValGoldGrad1)" strokeWidth="1.1" fill="rgba(229, 210, 166, 0.4)" />
                {/* Drafting Margin Dashes */}
                <rect x="12" y="12" width="28" height="29" stroke="#C6A15B" strokeWidth="0.65" strokeDasharray="2 1.5" fill="none" />
                {/* Deed Technical Clauses */}
                <line x1="15" y1="16" x2="33" y2="16" stroke="#A9823A" strokeWidth="1.1" strokeLinecap="round" />
                <line x1="15" y1="20" x2="31" y2="20" stroke="#C6A15B" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="15" y1="24" x2="27" y2="24" stroke="#C6A15B" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="15" y1="28" x2="22" y2="28" stroke="#C6A15B" strokeWidth="0.8" strokeLinecap="round" />
                {/* Embossed Royal Wax Seal Rosette */}
                <circle cx="33" cy="33" r="8" fill="#1A0709" stroke="url(#coreValGoldGrad1)" strokeWidth="1.3" />
                <circle cx="33" cy="33" r="6" stroke="#E5D2A6" strokeWidth="0.7" strokeDasharray="1.2 1.2" fill="none" />
                {/* Verified DTCP Checkmark */}
                <path d="M29.5 33l2.2 2.2 4.8-4.8" stroke="#E5D2A6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                {/* Twin Ribbon Tails */}
                <path d="M30 40.5l-3 7 4.5-2 4.5 2-3-7" fill="#1A0709" stroke="url(#coreValGoldGrad1)" strokeWidth="0.9" strokeLinejoin="round" />
                {/* Precision Drafting Ink Nib */}
                <path d="M12 38 L24 26" stroke="#A9823A" strokeWidth="1.6" strokeLinecap="round" />
                <polygon points="12,38 10,41 14,39" fill="#E5D2A6" stroke="#C6A15B" strokeWidth="0.7" />
              </svg>
            </div>

            {/* Card Body */}
            <div className="p-6 pt-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[10px] tracking-[1.5px] text-gold-antique uppercase font-bold">
                    PILLAR 01 // LEGAL CERTAINTY
                  </span>
                  <span className="font-mono text-[10px] text-gold-dark font-extrabold">
                    01 / 03
                  </span>
                </div>
                <h3 className="font-heading font-extrabold text-xl text-[#1A0709] tracking-wide mb-2">
                  CLEAR TITLE GUARANTEE
                </h3>
                <p className="font-body text-xs sm:text-[13px] text-[#3D141A] leading-relaxed mb-3">
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
              <svg width="44" height="44" viewBox="0 0 52 52" fill="none" className="transition-transform duration-500 group-hover:scale-110">
                <defs>
                  <linearGradient id="coreValGoldGrad2" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#C6A15B" />
                    <stop offset="50%" stopColor="#E5D2A6" />
                    <stop offset="100%" stopColor="#8C6623" />
                  </linearGradient>
                </defs>
                {/* Top Dimension Ruler: |← 40 FT →| */}
                <line x1="9" y1="7" x2="43" y2="7" stroke="url(#coreValGoldGrad2)" strokeWidth="0.9" />
                <path d="M11 5.5l-2.5 1.5 2.5 1.5 M41 5.5l2.5 1.5-2.5 1.5" stroke="#C6A15B" strokeWidth="0.9" fill="none" />
                <text x="26" y="5.2" fontFamily="'Space Mono', monospace" fontSize="4.8" fill="#1A0709" textAnchor="middle" fontWeight="bold">40 FT WIDTH</text>
                {/* Receding Perspective Avenue to Horizon */}
                <line x1="5" y1="12" x2="47" y2="12" stroke="#A9823A" strokeWidth="0.8" strokeDasharray="2 1.5" />
                <line x1="11" y1="42" x2="26" y2="12" stroke="url(#coreValGoldGrad2)" strokeWidth="1.5" />
                <line x1="41" y1="42" x2="26" y2="12" stroke="url(#coreValGoldGrad2)" strokeWidth="1.5" />
                {/* Dashed Centerline Perspective */}
                <line x1="26" y1="15" x2="26" y2="19" stroke="#E5D2A6" strokeWidth="0.9" />
                <line x1="26" y1="23" x2="26" y2="28" stroke="#E5D2A6" strokeWidth="1.2" />
                <line x1="26" y1="33" x2="26" y2="40" stroke="#E5D2A6" strokeWidth="1.6" />
                {/* Asphalt Subgrade Cross-Section Layer */}
                <rect x="7" y="42" width="38" height="6.5" rx="1" fill="#1A0709" stroke="url(#coreValGoldGrad2)" strokeWidth="1.1" />
                <line x1="7" y1="45.5" x2="45" y2="45.5" stroke="#C6A15B" strokeWidth="0.6" strokeDasharray="2 1" />
                {/* Stormwater Conduit Ring */}
                <circle cx="37" cy="45.5" r="2" stroke="#E5D2A6" strokeWidth="0.8" fill="rgba(198, 161, 91, 0.35)" />
                {/* Solar Luminaire Lamp Post */}
                <line x1="12" y1="40" x2="12" y2="20" stroke="url(#coreValGoldGrad2)" strokeWidth="1.1" />
                <path d="M12 20c0-2.5 3.5-2.5 4.5-0.5" stroke="url(#coreValGoldGrad2)" strokeWidth="0.9" fill="none" />
                <circle cx="16.5" cy="20" r="1.3" fill="#E5D2A6" />
                <line x1="14" y1="17.5" x2="19" y2="16.5" stroke="#C6A15B" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
            </div>

            {/* Card Body */}
            <div className="p-6 pt-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[10px] tracking-[1.5px] text-gold-antique uppercase font-bold">
                    PILLAR 02 // CIVIL ENGINEERING
                  </span>
                  <span className="font-mono text-[10px] text-gold-dark font-extrabold">
                    02 / 03
                  </span>
                </div>
                <h3 className="font-heading font-extrabold text-xl text-[#1A0709] tracking-wide mb-2">
                  ENGINEERED ROADS
                </h3>
                <p className="font-body text-xs sm:text-[13px] text-[#3D141A] leading-relaxed mb-3">
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
              <svg width="44" height="44" viewBox="0 0 52 52" fill="none" className="transition-transform duration-500 group-hover:scale-110">
                <defs>
                  <linearGradient id="coreValGoldGrad3" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#C6A15B" />
                    <stop offset="50%" stopColor="#E5D2A6" />
                    <stop offset="100%" stopColor="#8C6623" />
                  </linearGradient>
                </defs>
                {/* Surveyor's Astrolabe Degree Ring */}
                <circle cx="26" cy="26" r="22" stroke="#C6A15B" strokeWidth="0.65" strokeDasharray="1.5 2.5" fill="none" />
                <line x1="26" y1="3" x2="26" y2="6.5" stroke="url(#coreValGoldGrad3)" strokeWidth="1.1" />
                <line x1="49" y1="26" x2="45.5" y2="26" stroke="url(#coreValGoldGrad3)" strokeWidth="1.1" />
                <line x1="26" y1="49" x2="26" y2="45.5" stroke="url(#coreValGoldGrad3)" strokeWidth="1.1" />
                <line x1="3" y1="26" x2="6.5" y2="26" stroke="url(#coreValGoldGrad3)" strokeWidth="1.1" />
                {/* Stepped 3D Equity Pedestals */}
                <rect x="8" y="34" width="9" height="12" rx="1" fill="rgba(198, 161, 91, 0.18)" stroke="#A9823A" strokeWidth="0.8" />
                <rect x="21.5" y="25" width="9" height="21" rx="1" fill="rgba(198, 161, 91, 0.32)" stroke="#C6A15B" strokeWidth="0.9" />
                <rect x="35" y="15" width="9" height="31" rx="1" fill="#1A0709" stroke="url(#coreValGoldGrad3)" strokeWidth="1.2" />
                {/* Classical Pitch-Roof Villa Estate Elevation */}
                <polygon points="39.5,9.5 35.5,13.5 43.5,13.5" fill="#E5D2A6" stroke="url(#coreValGoldGrad3)" strokeWidth="0.8" />
                <rect x="37" y="13.5" width="5" height="1.5" fill="#E5D2A6" />
                {/* Compounding Exponential Growth Vector Arrow */}
                <path d="M7 42 C 17 40, 27 30, 44 8" stroke="url(#coreValGoldGrad3)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                <polygon points="44,8 39.5,9.5 42.5,12.5" fill="#1A0709" stroke="url(#coreValGoldGrad3)" strokeWidth="0.9" />
                {/* High ROI Diamond Seal */}
                <polygon points="26,22 28.5,25.5 26,29 23.5,25.5" fill="#E5D2A6" stroke="#A9823A" strokeWidth="0.8" />
              </svg>
            </div>

            {/* Card Body */}
            <div className="p-6 pt-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[10px] tracking-[1.5px] text-gold-antique uppercase font-bold">
                    PILLAR 03 // VALUE CREATION
                  </span>
                  <span className="font-mono text-[10px] text-gold-dark font-extrabold">
                    03 / 03
                  </span>
                </div>
                <h3 className="font-heading font-extrabold text-xl text-[#1A0709] tracking-wide mb-2">
                  LEGACY APPRECIATION
                </h3>
                <p className="font-body text-xs sm:text-[13px] text-[#3D141A] leading-relaxed mb-3">
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
  );
}
