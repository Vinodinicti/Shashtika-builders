import React, { useState, useEffect, useMemo } from 'react';
import { LOCATION_MASTERPLANS } from '../data/homeData';
import { PROJECT_METADATA, PLOTS_DATA } from '../data/plotsKambalapattiData';

// Coordinates mapper for all 64 plots matching official blueprint
const getPlotCoordinates = (num) => {
  // Block 1: Top-Left (Plots 13..07 top row, 14..20 bottom row)
  if (num >= 7 && num <= 13) {
    const idx = 13 - num;
    return { x: 100 + idx * 49.28, y: 205, w: 48, h: 62 };
  }
  if (num >= 14 && num <= 20) {
    const idx = num - 14;
    return { x: 100 + idx * 49.28, y: 268, w: 48, h: 62 };
  }

  // Block 2: Top-Right (Plots 06..01 top row, 21..26 bottom row)
  if (num >= 1 && num <= 6) {
    const idx = 6 - num;
    return { x: 500 + idx * 52.5, y: 205, w: 51.5, h: 62 };
  }
  if (num >= 21 && num <= 26) {
    const idx = num - 21;
    return { x: 500 + idx * 52.5, y: 268, w: 51.5, h: 62 };
  }

  // Block 3: Middle-Left (Plots 39..33 top row, 40..46 bottom row)
  if (num >= 33 && num <= 39) {
    const idx = 39 - num;
    return { x: 100 + idx * 49.28, y: 370, w: 48, h: 64 };
  }
  if (num >= 40 && num <= 46) {
    const idx = num - 40;
    return { x: 100 + idx * 49.28, y: 435, w: 48, h: 64 };
  }

  // Block 4: Middle-Right (Plots 32..27 top row, 47..51 bottom row + Park/EB)
  if (num >= 27 && num <= 32) {
    const idx = 32 - num;
    return { x: 500 + idx * 52.5, y: 370, w: 51.5, h: 64 };
  }
  if (num >= 47 && num <= 51) {
    const idx = num - 47;
    return { x: 500 + idx * 46, y: 435, w: 45, h: 64 };
  }

  // Block 5: Bottom-Left (Plots 64..58 single deep row)
  if (num >= 58 && num <= 64) {
    if (num === 64) {
      return { x: 88, y: 550, w: 60, h: 96 };
    }
    const idx = 63 - num;
    return { x: 149 + idx * 49.33, y: 550, w: 48, h: 96 };
  }

  // Block 6: Bottom-Right (Plots 57..52 single deep row)
  if (num >= 52 && num <= 57) {
    const idx = 57 - num;
    return { x: 500 + idx * 52.5, y: 550, w: 51.5, h: 96 };
  }

  return { x: 0, y: 0, w: 48, h: 48 };
};

const getStatusColor = (status) => {
  switch (status) {
    case 'AVAILABLE':
      return {
        fill: '#1D4D27',
        stroke: '#2E7D32',
        text: '#FFFFFF',
        badgeClass: 'bg-[#1D4D27] text-white'
      };
    case 'PRE-BOOKED':
      return {
        fill: '#C99E5B',
        stroke: '#B38743',
        text: '#1A0709',
        badgeClass: 'bg-[#C99E5B] text-espresso-950'
      };
    case 'SOLD':
      return {
        fill: '#A63826',
        stroke: '#852718',
        text: '#FFFFFF',
        badgeClass: 'bg-[#A63826] text-white'
      };
    default:
      return {
        fill: '#E0DACB',
        stroke: '#B5AC98',
        text: '#1A0709',
        badgeClass: 'bg-biscuit-300 text-espresso-950'
      };
  }
};

export default function LocationMasterplansSection() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [zoomLevel, setZoomLevel] = useState(1);

  // Kambalampatti on the left (index 0), Coimbatore on the right (index 1)
  const locationKeys = ['kambalampatti', 'coimbatore'];
  const activePlan = selectedCity ? LOCATION_MASTERPLANS[selectedCity] : null;
  const isKambalampatti = selectedCity === 'kambalampatti';

  // Synchronize live plot stats with PlotsPage & localStorage
  const [plotsInventory, setPlotsInventory] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('shashtika_plots_inventory');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return PLOTS_DATA;
  });

  useEffect(() => {
    const handleSync = () => {
      const saved = localStorage.getItem('shashtika_plots_inventory');
      if (saved) {
        try {
          setPlotsInventory(JSON.parse(saved));
        } catch (e) {}
      }
    };
    window.addEventListener('shashtika_plot_updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('shashtika_plot_updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const kambalampattiStats = useMemo(() => {
    const total = plotsInventory.length;
    const available = plotsInventory.filter((p) => p.status === 'AVAILABLE').length;
    const prebooked = plotsInventory.filter((p) => p.status === 'PRE-BOOKED').length;
    const sold = plotsInventory.filter((p) => p.status === 'SOLD').length;
    return { total, available, prebooked, sold };
  }, [plotsInventory]);

  // WhatsApp enquiry handler
  const openWhatsApp = (plot) => {
    const text = encodeURIComponent(
      `Hello SHASHTIKA Plot Developers,\n\nI am interested in DTCP Approved Plot #${plot.number} (${plot.sqft} Sq.Ft / ${plot.cent} Cents ${plot.remSqft > 0 ? `${plot.remSqft} Sq.Ft` : ''}) at ${PROJECT_METADATA.name}, Kambalapatti Village, Anaimalai Taluk.\n\nApproval No: ${PROJECT_METADATA.approvalNo}\nSurvey No: ${PROJECT_METADATA.sfNumbers}\nFacing: ${plot.facing}\nRoad: ${plot.road}\n\nPlease share booking assistance and site visit schedule.`
    );
    window.open(`https://wa.me/919363599754?text=${text}`, '_blank');
  };

  const closeModal = () => {
    setSelectedCity(null);
    setSelectedPlot(null);
    setSelectedFilter('ALL');
    setZoomLevel(1);
  };

  return (
    <section id="location-masterplans-section" className="py-20 creamy-smoky-sandal-canvas relative overflow-hidden">
      {/* Atmospheric Smokey Sandal/Biscuit Motion Overlay */}
      <div className="smokey-sandal-overlay" aria-hidden="true">
        <div className="smokey-sandal-cloud-1" />
        <div className="smokey-sandal-cloud-2" />
        <div className="smokey-sandal-cloud-3" />
        <div className="smokey-sandal-wisp" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="architectural-tag">TAMILNADU REGIONAL CORRIDORS</span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#1A0709] mt-2 mb-3 tracking-wide uppercase">
            REGIONAL LOCATION MASTER PLANS
          </h2>
          <p className="font-body text-xs sm:text-sm text-espresso-700 leading-relaxed">
            Select any of our 2 major location corridors below to open the corresponding layout masterplan blueprint, plot dimensions, live availability, and full summary details in a popup inspector.
          </p>
        </div>

        {/* Exact 2 Location Cards Grid (Left: Kambalampatti, Right: Coimbatore) */}
        <div className="location-cards-grid">
          {locationKeys.map((key) => {
            const item = LOCATION_MASTERPLANS[key];
            const imgSrc =
              key === 'kambalampatti'
                ? '/Images/Pollachi_Location.jpg'
                : '/Images/Coimbatore_Location.jpg';

            return (
              <div
                key={key}
                onClick={() => setSelectedCity(key)}
                className="location-card"
              >
                {/* Animated Moving Light Blob (Bouncing Glow Beam) */}
                <div className="location-card-blob" />

                {/* Card Image Wrap with Watermark City Text & Badges */}
                <div className="location-card-img-wrap">
                  <img
                    src={imgSrc}
                    alt={`${item.city} Location Masterplan`}
                  />
                  <span className="location-card-tag">
                    {item.tag}
                  </span>
                  <span className="location-approval-badge">
                    {item.approvalBadge}
                  </span>
                </div>

                {/* Card Body */}
                <div className="location-card-body">
                  <div>
                    <span className="architectural-tag text-gold">
                      {item.city}
                    </span>
                    <h3 className="location-card-title">
                      {item.title}
                    </h3>
                    <p className="location-card-desc">
                      {item.desc}
                    </p>
                  </div>

                  <div>
                    {/* Specs Row */}
                    <div className="location-card-specs-row">
                      <div className="location-spec-col-road">
                        <span className="location-spec-lbl">ROAD WIDTHS</span>
                        <strong className="location-spec-val">
                          {item.roadWidths}
                        </strong>
                      </div>
                      <div className="location-spec-col-price">
                        <span className="location-spec-lbl">
                          {key === 'kambalampatti' ? 'TOTAL PLOTS' : 'STARTING PRICE'}
                        </span>
                        <strong className="location-spec-val text-gold">
                          {key === 'kambalampatti' ? '64 DTCP Units' : item.startingPrice}
                        </strong>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn btn-outline-olive btn-sm location-card-btn"
                    >
                      <span className="hidden sm:inline">VIEW OVERALL LAYOUT &amp; SUMMARY →</span>
                      <span className="inline sm:hidden">VIEW PLAN →</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Location Masterplan Popup Modal */}
      {activePlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-espresso-950/80 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-5xl bg-biscuit-50 rounded-2xl border-2 border-gold-primary shadow-2xl p-4 sm:p-7 z-10 max-h-[92vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={closeModal}
              aria-label="Close Modal"
              className="absolute top-4 right-4 w-9 h-9 rounded-full border border-gold-border flex items-center justify-center text-espresso-800 hover:bg-espresso-900 hover:text-cream transition-colors text-xl cursor-pointer z-20"
            >
              &times;
            </button>

            {/* KAMBALAMPATTI INTERACTIVE 64-PLOT BLUEPRINT VIEW (MATCHING PLOTS PAGE) */}
            {isKambalampatti ? (
              <div>
                {/* Header */}
                <div className="mb-4 pr-10 border-b border-gold-border/30 pb-3">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="architectural-tag text-gold-antique">
                      {PROJECT_METADATA.name}
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-[#1D4D27]/15 text-[#1D4D27] border border-[#1D4D27]/30">
                      {PROJECT_METADATA.approvalNo}
                    </span>
                  </div>
                  <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[#1A0709]">
                    {PROJECT_METADATA.tamilTitle}
                  </h2>
                  <p className="font-mono text-xs text-espresso-700 mt-1">
                    <strong className="text-espresso-950">{PROJECT_METADATA.sfNumbers}</strong> • {PROJECT_METADATA.location}
                  </p>
                </div>

                {/* Availability Filter Chips */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setSelectedFilter('ALL')}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                      selectedFilter === 'ALL'
                        ? 'bg-espresso-950 text-cream shadow-sm'
                        : 'bg-biscuit-100 text-espresso-800 hover:bg-biscuit-200 border border-gold-border/40'
                    }`}
                  >
                    ALL ({kambalampattiStats.total})
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedFilter('AVAILABLE')}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedFilter === 'AVAILABLE'
                        ? 'bg-[#1D4D27] text-white shadow-sm'
                        : 'bg-emerald-50 text-[#1D4D27] hover:bg-emerald-100 border border-emerald-300'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#1D4D27]" />
                    AVAILABLE: {kambalampattiStats.available}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedFilter('PRE-BOOKED')}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedFilter === 'PRE-BOOKED'
                        ? 'bg-[#C99E5B] text-espresso-950 shadow-sm'
                        : 'bg-amber-50 text-[#9C7230] hover:bg-amber-100 border border-amber-300'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#C99E5B]" />
                    PRE-BOOKED: {kambalampattiStats.prebooked}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedFilter('SOLD')}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedFilter === 'SOLD'
                        ? 'bg-[#A63826] text-white shadow-sm'
                        : 'bg-rose-50 text-[#A63826] hover:bg-rose-100 border border-rose-300'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#A63826]" />
                    SOLD: {kambalampattiStats.sold}
                  </button>

                  {/* Zoom Controls */}
                  <div className="ml-auto hidden sm:flex items-center gap-1 bg-biscuit-100 rounded border border-gold-border px-2 py-1">
                    <button
                      type="button"
                      onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.15))}
                      className="px-1.5 font-mono font-bold text-sm text-espresso-900 hover:text-gold-antique cursor-pointer"
                      title="Zoom Out"
                    >
                      -
                    </button>
                    <span className="font-mono text-xs text-espresso-700 px-1">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      type="button"
                      onClick={() => setZoomLevel((z) => Math.min(1.8, z + 0.15))}
                      className="px-1.5 font-mono font-bold text-sm text-espresso-900 hover:text-gold-antique cursor-pointer"
                      title="Zoom In"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => setZoomLevel(1)}
                      className="text-[10px] font-mono text-gold-antique hover:underline ml-1 cursor-pointer"
                    >
                      RESET
                    </button>
                  </div>
                </div>

                {/* Interactive SVG Masterplan Blueprint Canvas */}
                <div className="relative bg-[#FCFAF5] border border-gold-border/70 rounded-xl p-2 sm:p-4 overflow-auto flex justify-center items-center shadow-inner min-h-[420px] max-h-[580px]">
                  <div
                    className="w-full flex justify-center transition-transform duration-200"
                    style={{
                      transform: zoomLevel !== 1 ? `scale(${zoomLevel})` : undefined,
                      transformOrigin: 'top center',
                      minWidth: zoomLevel > 1 ? `${zoomLevel * 100}%` : '100%'
                    }}
                  >
                    <svg
                      viewBox="0 0 1180 840"
                      className="w-full max-w-[1100px] h-auto select-none block"
                      style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.06))' }}
                    >
                      <defs>
                        <filter id="loc-plot-shadow" x="-5%" y="-5%" width="110%" height="110%">
                          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.18" />
                        </filter>
                        <filter id="loc-selected-glow" x="-15%" y="-15%" width="130%" height="130%">
                          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#FFE082" floodOpacity="1" />
                        </filter>
                        <marker id="loc-arrow-black" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#1A0709" />
                        </marker>
                      </defs>

                      {/* Blueprint Outer Frame Lines */}
                      <rect x="12" y="12" width="1156" height="816" fill="none" stroke="#1A0709" strokeWidth="2.5" />
                      <rect x="18" y="18" width="1144" height="804" fill="none" stroke="#1A0709" strokeWidth="1" />

                      {/* Top Header Title */}
                      <text x="35" y="44" fontFamily="sans-serif" fontSize="13" fontWeight="900" fill="#1A0709" letterSpacing="0.3">
                        LAYOUT PLAN SHOWING THE PROPOSED LAYOUT OF HOUSE SITES IN S.F.NO-209/1, 222/1A1 &amp; 222/2A1B1 AT KAMBALAPATTI VILLAGE
                      </text>

                      {/* North Arrow Compass */}
                      <g transform="translate(850, 48)">
                        <circle cx="20" cy="20" r="16" fill="none" stroke="#1A0709" strokeWidth="1.2" />
                        <polygon points="20,4 24,20 20,16 16,20" fill="#1A0709" />
                        <polygon points="20,36 24,20 20,24 16,20" fill="#888888" />
                        <polygon points="4,20 20,24 16,20 20,16" fill="#CCCCCC" />
                        <polygon points="36,20 20,24 24,20 20,16" fill="#CCCCCC" />
                        <text x="20" y="-3" textAnchor="middle" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#1A0709">N</text>
                      </g>

                      {/* Electrical Line Notice */}
                      <g>
                        <text x="190" y="85" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#1A0709" fontFamily="sans-serif">
                          மனுதாரர் சொந்த செலவில் மாற்றியமைக்கப்பட வேண்டிய
                        </text>
                        <text x="190" y="99" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#1A0709" fontFamily="sans-serif">
                          குறைந்த அழுத்த மின்கம்பி பாதை
                        </text>
                        <path
                          d="M 68,260 Q 180,95 240,160"
                          fill="none"
                          stroke="#1A0709"
                          strokeWidth="1.8"
                          strokeDasharray="5 3"
                          markerEnd="url(#loc-arrow-black)"
                        />
                      </g>

                      {/* West 12.00M Panchayat Tar Road */}
                      <polygon points="24,160 68,160 68,780 24,780" fill="#F2DC6D" stroke="#8B6D1B" strokeWidth="1.6" />
                      <text x="46" y="470" textAnchor="middle" transform="rotate(-90, 46, 470)" fontSize="10.5" fontWeight="bold" fill="#1A0709" fontFamily="sans-serif" letterSpacing="0.8">
                        நிலையான 12.00 மீ அகல பஞ்சாயத்து தார் சாலை
                      </text>
                      <text x="46" y="760" textAnchor="middle" transform="rotate(-90, 46, 760)" fontSize="11" fontWeight="bold" fill="#1A0709" fontFamily="sans-serif">
                        ← ஆனைமலை
                      </text>

                      {/* Top 12.00M Panchayat Tar Road */}
                      <polygon points="68,160 415,160 415,62 470,62 470,160 880,188 945,145 975,170 915,215 470,195 415,190 68,195" fill="#F2DC6D" stroke="#8B6D1B" strokeWidth="1.6" />
                      <text x="442" y="115" textAnchor="middle" transform="rotate(-90, 442, 115)" fontSize="10.5" fontWeight="bold" fill="#1A0709" fontFamily="sans-serif">
                        ↑ தொண்டாமுத்தூர்
                      </text>
                      <text x="260" y="178" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#1A0709" fontFamily="sans-serif">
                        நிலையான 12.00 மீ அகல பஞ்சாயத்து தார் சாலை
                      </text>
                      <text x="890" y="165" transform="rotate(-30, 890, 165)" fontSize="10.5" fontWeight="bold" fill="#1A0709" fontFamily="sans-serif">
                        கோடங்கிபாளையம் →
                      </text>

                      {/* Proposed Central 10.00m Avenue Road */}
                      <rect x="445" y="195" width="55" height="515" fill="#543D2B" stroke="#8B6D1B" strokeWidth="1.2" />
                      <text x="472" y="450" textAnchor="middle" transform="rotate(90, 472, 450)" fontSize="10.5" fontWeight="bold" fill="#FDF8EE" fontFamily="sans-serif" letterSpacing="1.2">
                        உத்தேச 10.00 மீ மனைப்பிரிவு சாலை
                      </text>

                      {/* Upper 7.20m Cross Road */}
                      <rect x="95" y="330" width="720" height="40" fill="#543D2B" stroke="#8B6D1B" strokeWidth="1.2" />
                      <text x="270" y="354" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#FDF8EE" fontFamily="sans-serif">
                        உத்தேச 7.20 மீ மனைப்பிரிவு சாலை
                      </text>
                      <text x="640" y="354" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#FDF8EE" fontFamily="sans-serif">
                        உத்தேச 7.20 மீ மனைப்பிரிவு சாலை
                      </text>

                      {/* Lower 9.00m Cross Road */}
                      <rect x="85" y="500" width="730" height="48" fill="#543D2B" stroke="#8B6D1B" strokeWidth="1.2" />
                      <text x="250" y="528" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#FDF8EE" fontFamily="sans-serif">
                        உத்தேச 9.00 மீ மனைப்பிரிவு சாலை
                      </text>
                      <text x="640" y="528" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#FDF8EE" fontFamily="sans-serif">
                        உத்தேச 9.00 மீ மனைப்பிரிவு சாலை
                      </text>

                      {/* Public Purpose Amenities: Park & EB */}
                      <rect x="730" y="435" width="44" height="64" fill="#7E57C2" stroke="#5E35B1" strokeWidth="1.2" rx="1" />
                      <text x="752" y="464" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#FFFFFF" fontFamily="sans-serif">
                        பொது
                      </text>
                      <text x="752" y="476" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#FFFFFF" fontFamily="sans-serif">
                        உபயோகம்
                      </text>

                      <rect x="775" y="435" width="40" height="64" fill="#2E7D32" stroke="#1B5E20" strokeWidth="1.2" rx="1" />
                      <text x="795" y="464" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#FFFFFF" fontFamily="sans-serif">
                        EB
                      </text>
                      <text x="795" y="476" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#A7F3D0" fontFamily="sans-serif">
                        TANGEDCO
                      </text>

                      {/* Red Boundary Dimensions */}
                      <g fill="#D32F2F" fontFamily="monospace" fontWeight="bold" fontSize="9.5">
                        <text x="270" y="202">113.6</text>
                        <text x="85" y="325" transform="rotate(-90, 85, 325)">81.0</text>
                        <text x="270" y="660" fontSize="10.5">123.4</text>
                      </g>

                      {/* Render All 64 Plots */}
                      {plotsInventory.map((plot) => {
                        const coords = getPlotCoordinates(plot.number);
                        const colors = getStatusColor(plot.status);
                        const isSelected = selectedPlot?.number === plot.number;
                        const isDimmed = selectedFilter !== 'ALL' && plot.status !== selectedFilter;

                        return (
                          <g
                            key={plot.number}
                            onClick={() => setSelectedPlot(plot)}
                            className="cursor-pointer transition-transform duration-150"
                            style={{
                              opacity: isDimmed ? 0.25 : 1,
                              transformOrigin: `${coords.x + coords.w / 2}px ${coords.y + coords.h / 2}px`
                            }}
                          >
                            <rect
                              x={coords.x}
                              y={coords.y}
                              width={coords.w}
                              height={coords.h}
                              fill={colors.fill}
                              stroke={isSelected ? '#FFE082' : colors.stroke}
                              strokeWidth={isSelected ? '3.5' : '1.2'}
                              rx="2"
                              filter={isSelected ? 'url(#loc-selected-glow)' : 'url(#loc-plot-shadow)'}
                            />
                            <text
                              x={coords.x + coords.w / 2}
                              y={coords.y + coords.h / 2 - 4}
                              fill={colors.text}
                              fontSize={coords.w < 50 ? '10' : '11'}
                              fontFamily="monospace"
                              fontWeight="bold"
                              textAnchor="middle"
                            >
                              {String(plot.number).padStart(2, '0')}
                            </text>
                            <text
                              x={coords.x + coords.w / 2}
                              y={coords.y + coords.h / 2 + 9}
                              fill={colors.text}
                              opacity="0.9"
                              fontSize="7.5"
                              fontFamily="sans-serif"
                              fontWeight="bold"
                              textAnchor="middle"
                            >
                              {plot.sqft}sft
                            </text>
                            {isSelected && (
                              <circle
                                cx={coords.x + coords.w / 2}
                                cy={coords.y + 7}
                                r="3"
                                fill="#FFE082"
                              />
                            )}
                          </g>
                        );
                      })}

                      {/* Official DTCP Seal */}
                      <g transform="translate(420, 725)">
                        <rect x="0" y="0" width="270" height="44" rx="8" fill="#FFFDF8" stroke="#D32F2F" strokeWidth="2.4" />
                        <rect x="4" y="4" width="262" height="36" rx="6" fill="none" stroke="#D32F2F" strokeWidth="1" strokeDasharray="5 3" />
                        <text x="135" y="26" fill="#D32F2F" fontFamily="sans-serif" fontSize="12.5" fontWeight="bold" textAnchor="middle" letterSpacing="0.8">
                          {PROJECT_METADATA.approvalNo}
                        </text>
                      </g>
                    </svg>
                  </div>
                </div>

                {/* Mobile Tap Hint */}
                <div className="flex sm:hidden items-center justify-between text-[11px] font-mono text-espresso-700 px-1 py-1.5 mt-1 border-t border-gold-border/20">
                  <span className="flex items-center gap-1.5 text-gold-antique font-bold">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                    Tap any plot to view details
                  </span>
                  <span className="text-espresso-600 font-semibold">Use + / - to zoom</span>
                </div>

                {/* Selected Plot Inspector Card */}
                {selectedPlot && (
                  <div className="mt-4 p-4 rounded-xl bg-white border-2 border-gold-primary shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-espresso-950 flex flex-col items-center justify-center text-gold-light font-mono flex-shrink-0">
                        <span className="text-[10px] uppercase text-espresso-300">PLOT</span>
                        <span className="text-base font-extrabold leading-none">#{selectedPlot.number}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="font-heading text-sm sm:text-base text-espresso-950">
                            {selectedPlot.sqft.toLocaleString()} Sq.Ft ({selectedPlot.cent} Cents {selectedPlot.remSqft > 0 ? `${selectedPlot.remSqft} Sq.Ft` : ''})
                          </strong>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${getStatusColor(selectedPlot.status).badgeClass}`}>
                            {selectedPlot.status}
                          </span>
                        </div>
                        <div className="text-xs font-mono text-espresso-700 mt-1 flex flex-wrap gap-x-3 gap-y-1">
                          <span>Facing: <strong className="text-espresso-900">{selectedPlot.facing}</strong></span>
                          <span>Road: <strong className="text-espresso-900">{selectedPlot.road}</strong></span>
                          <span>Dim: <strong className="text-espresso-900">{selectedPlot.dim}</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => openWhatsApp(selectedPlot)}
                        className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-[#1A0709] hover:bg-[#2D0E12] text-[#E5D2A6] hover:text-white border border-[#C6A15B] font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-lg"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[#C6A15B]">
                          <path d="M12.031 0C5.385 0 0 5.386 0 12.031c0 2.124.553 4.197 1.604 6.02L0 24l6.155-1.614A11.968 11.968 0 0 0 12.03 24c6.645 0 12.03-5.385 12.03-12.031C24.06 5.386 18.675 0 12.031 0zm.012 22.012c-1.808 0-3.585-.486-5.143-1.408l-.369-.219-3.817 1.001 1.019-3.721-.241-.383A9.99 9.99 0 0 1 2.012 12.03c0-5.524 4.496-10.02 10.031-10.02 5.524 0 10.02 4.496 10.02 10.02 0 5.536-4.496 10.012-10.02 10.012zm5.503-7.519c-.302-.152-1.785-.881-2.062-.981-.277-.101-.479-.152-.68.152-.202.302-.782.981-.959 1.183-.176.201-.353.226-.655.075-1.745-.875-2.894-1.559-4.04-3.535-.302-.52.302-.482.864-1.608.101-.201.05-.378-.025-.529-.075-.152-.68-1.636-.932-2.24-.244-.588-.493-.508-.68-.518-.176-.009-.378-.009-.58-.009-.201 0-.528.075-.804.378-.277.302-1.057 1.032-1.057 2.518 0 1.486 1.082 2.92 1.233 3.122.151.201 2.128 3.25 5.156 4.558 2.164.935 2.809.845 3.791.7.636-.094 1.785-.73 2.037-1.435.252-.705.252-1.309.176-1.435-.076-.125-.278-.201-.58-.352z" />
                        </svg>
                        <span>WHATSAPP ENQUIRY</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedPlot(null)}
                        className="px-3 py-2 rounded-lg border border-gold-border text-espresso-700 hover:bg-biscuit-100 font-mono text-xs cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}

                {/* Minimal Color Legend */}
                <div className="flex flex-wrap items-center justify-center gap-4 py-2.5 px-4 mt-3 bg-biscuit-100 rounded-lg border border-gold-border/40 text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-espresso-900 font-semibold">
                    <span className="w-3.5 h-3.5 rounded bg-[#1D4D27] inline-block" /> AVAILABLE ({kambalampattiStats.available})
                  </span>
                  <span className="flex items-center gap-1.5 text-espresso-900 font-semibold">
                    <span className="w-3.5 h-3.5 rounded bg-[#C99E5B] inline-block" /> PRE-BOOKED ({kambalampattiStats.prebooked})
                  </span>
                  <span className="flex items-center gap-1.5 text-espresso-900 font-semibold">
                    <span className="w-3.5 h-3.5 rounded bg-[#A63826] inline-block" /> SOLD ({kambalampattiStats.sold})
                  </span>
                </div>

                {/* Footer Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-gold-border/30">
                  <a
                    href="#plots"
                    onClick={closeModal}
                    className="px-5 py-2.5 rounded bg-gold-primary hover:bg-gold-light text-espresso-950 font-mono text-xs font-extrabold tracking-wider transition-all shadow-md flex items-center gap-1.5"
                  >
                    EXPLORE FULL 64 PLOTS DIRECTORY IN PLOTS PAGE →
                  </a>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-5 py-2.5 rounded border border-gold-primary text-espresso-900 hover:bg-gold-primary/20 font-mono text-xs font-bold tracking-wider transition-all cursor-pointer"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            ) : (
              /* COIMBATORE MASTERPLAN VIEW */
              <div>
                <div className="mb-6 border-b border-gold-border/30 pb-4">
                  <span className="architectural-tag text-gold-antique">
                    {activePlan.city.toUpperCase()} — {activePlan.tag}
                  </span>
                  <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1A0709] mt-1">
                    {activePlan.title}
                  </h2>
                  <p className="font-mono text-xs text-gold-antique mt-1">
                    {activePlan.subtitle} • {activePlan.approval}
                  </p>
                </div>

                {/* SVG Blueprint */}
                <div className="bg-biscuit-100 border border-gold-border p-4 rounded-lg mb-6 shadow-inner">
                  <div className="flex justify-between items-center mb-2 font-mono text-xs text-gold-antique font-bold">
                    <span>MASTER PLAN BLUEPRINT — {activePlan.totalPlots} ({activePlan.city.toUpperCase()})</span>
                    <span>NORTH ↑</span>
                  </div>
                  <div
                    className="overflow-x-auto rounded border border-gold-border/40"
                    dangerouslySetInnerHTML={{ __html: activePlan.svgBlueprint }}
                  />
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap gap-2.5 mb-6">
                  <span className="px-3.5 py-1.5 rounded bg-[#1D4D27] text-white font-mono text-xs font-bold tracking-wider">
                    {activePlan.available} AVAILABLE
                  </span>
                  <span className="px-3.5 py-1.5 rounded bg-[#C99E5B] text-espresso-950 font-mono text-xs font-bold tracking-wider">
                    {activePlan.prebooked} PRE-BOOKED
                  </span>
                  <span className="px-3.5 py-1.5 rounded bg-terracotta text-cream font-mono text-xs font-bold tracking-wider">
                    {activePlan.sold} SOLD
                  </span>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mb-6">
                  <div className="p-3 rounded bg-biscuit-100 border border-gold-border/30">
                    <span className="font-mono text-[10px] text-espresso-600 block uppercase">TOTAL LAYOUT</span>
                    <strong className="font-mono text-xs sm:text-sm text-espresso-900">{activePlan.totalPlots}</strong>
                  </div>
                  <div className="p-3 rounded bg-biscuit-100 border border-gold-border/30">
                    <span className="font-mono text-[10px] text-espresso-600 block uppercase">PLOT SIZES</span>
                    <strong className="font-mono text-xs sm:text-sm text-espresso-900">{activePlan.plotSizes}</strong>
                  </div>
                  <div className="p-3 rounded bg-biscuit-100 border border-gold-border/30">
                    <span className="font-mono text-[10px] text-espresso-600 block uppercase">ROAD WIDTHS</span>
                    <strong className="font-mono text-xs sm:text-sm text-espresso-900">{activePlan.roadWidths}</strong>
                  </div>
                  <div className="p-3 rounded bg-biscuit-100 border border-gold-border/30">
                    <span className="font-mono text-[10px] text-espresso-600 block uppercase">APPROVAL STATUS</span>
                    <strong className="font-mono text-xs sm:text-sm text-gold-antique">{activePlan.approval}</strong>
                  </div>
                  <div className="p-3 rounded bg-biscuit-100 border border-gold-border/30">
                    <span className="font-mono text-[10px] text-espresso-600 block uppercase">STARTING PRICE</span>
                    <strong className="font-mono text-xs sm:text-sm text-gold-antique">{activePlan.startingPrice}</strong>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="#quick-enquiry-section"
                    onClick={closeModal}
                    className="px-6 py-2.5 rounded bg-gold-primary hover:bg-gold-light text-espresso-950 font-mono text-xs font-bold tracking-wider transition-all"
                  >
                    ENQUIRE NOW
                  </a>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-2.5 rounded border border-gold-primary text-espresso-900 hover:bg-gold-primary/20 font-mono text-xs font-bold tracking-wider transition-all cursor-pointer"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
