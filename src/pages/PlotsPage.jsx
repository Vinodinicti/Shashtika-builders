import React, { useState, useEffect, useMemo } from 'react';
import { PLOTS_DATA, PROJECT_METADATA } from '../data/plotsKambalapattiData';
import { KINATHUKADAVU_PLOTS_DATA, KINATHUKADAVU_METADATA } from '../data/plotsKinathukadavuData';
import KinathukadavuBlueprintSVG from '../components/KinathukadavuBlueprintSVG';

export default function PlotsPage() {
  // Active Layout Location: 'kambalampatti' | 'kinathukadavu'
  const [activeLocation, setActiveLocation] = useState('kambalampatti');

  // Kambalampatti plots with sync
  const [kambalampattiPlots, setKambalampattiPlots] = useState(() => {
    const saved = localStorage.getItem('shashtika_plots_inventory');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return PLOTS_DATA;
      }
    }
    return PLOTS_DATA;
  });

  // Kinathukadavu plots with sync
  const [kinathukadavuPlots, setKinathukadavuPlots] = useState(() => {
    const saved = localStorage.getItem('shashtika_plots_inventory_kinathukadavu');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return KINATHUKADAVU_PLOTS_DATA;
      }
    }
    return KINATHUKADAVU_PLOTS_DATA;
  });

  // Active dataset and metadata based on selected location
  const currentMetadata = activeLocation === 'kambalampatti' ? PROJECT_METADATA : KINATHUKADAVU_METADATA;
  const activePlots = activeLocation === 'kambalampatti' ? kambalampattiPlots : kinathukadavuPlots;

  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [tableFilter, setTableFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Sync with Admin Portal changes
  useEffect(() => {
    const handleSync = () => {
      const saved = localStorage.getItem('shashtika_plots_inventory');
      if (saved) {
        try {
          setKambalampattiPlots(JSON.parse(saved));
        } catch (e) {}
      }
      const savedKinathu = localStorage.getItem('shashtika_plots_inventory_kinathukadavu');
      if (savedKinathu) {
        try {
          setKinathukadavuPlots(JSON.parse(savedKinathu));
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

  const stats = useMemo(() => {
    const total = activePlots.length;
    const available = activePlots.filter((p) => p.status === 'AVAILABLE').length;
    const prebooked = activePlots.filter((p) => p.status === 'PRE-BOOKED').length;
    const sold = activePlots.filter((p) => p.status === 'SOLD').length;
    return { total, available, prebooked, sold };
  }, [activePlots]);

  // Filtered plots for table
  const filteredPlots = useMemo(() => {
    return activePlots.filter((p) => {
      const matchesFilter = tableFilter === 'ALL' || p.status === tableFilter;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        String(p.number).includes(query) ||
        p.facing.toLowerCase().includes(query) ||
        p.road.toLowerCase().includes(query) ||
        String(p.sqft).includes(query) ||
        String(p.cent).includes(query);
      return matchesFilter && matchesSearch;
    });
  }, [activePlots, tableFilter, searchQuery]);

  // Dynamic 4-Table chunking for 2x2 grid layout
  const tableChunks = useMemo(() => {
    if (activeLocation === 'kambalampatti') {
      return [
        { label: 'PLOTS 01 – 16', id: '01-16', plots: filteredPlots.filter((p) => p.number >= 1 && p.number <= 16) },
        { label: 'PLOTS 17 – 32', id: '17-32', plots: filteredPlots.filter((p) => p.number >= 17 && p.number <= 32) },
        { label: 'PLOTS 33 – 48', id: '33-48', plots: filteredPlots.filter((p) => p.number >= 33 && p.number <= 48) },
        { label: 'PLOTS 49 – 64', id: '49-64', plots: filteredPlots.filter((p) => p.number >= 49 && p.number <= 64) }
      ];
    } else {
      return [
        { label: 'PLOTS 01 – 11', id: '01-11', plots: filteredPlots.filter((p) => p.number >= 1 && p.number <= 11) },
        { label: 'PLOTS 12 – 22', id: '12-22', plots: filteredPlots.filter((p) => p.number >= 12 && p.number <= 22) },
        { label: 'PLOTS 23 – 32', id: '23-32', plots: filteredPlots.filter((p) => p.number >= 23 && p.number <= 32) },
        { label: 'PLOTS 33 – 42', id: '33-42', plots: filteredPlots.filter((p) => p.number >= 33 && p.number <= 42) }
      ];
    }
  }, [activeLocation, filteredPlots]);

  // WhatsApp enquiry handler
  const openWhatsApp = (plot) => {
    const text = encodeURIComponent(
      `Hello SHASHTIKA Plot Developers,\n\nI am interested in Plot #${plot.number} (${plot.sqft} Sq.Ft / ${plot.cent} Cents ${plot.remSqft > 0 ? `${plot.remSqft} Sq.Ft` : ''}) at ${currentMetadata.name}, ${currentMetadata.location}.\n\nApproval No: ${currentMetadata.approvalNo}\nSurvey No: ${currentMetadata.sfNumbers}\nFacing: ${plot.facing}\nRoad: ${plot.road}\n\nPlease share the detailed site visit schedule and booking assistance.`
    );
    window.open(`https://wa.me/919363599754?text=${text}`, '_blank');
  };

  // Accurate SVG coordinate mapper for all 64 plots matching the blueprint layout
  const getPlotCoordinates = (num) => {
    // Canvas: viewBox 0 0 1180 840
    // Central 10.00m Avenue: x = 445..500 (width 55)
    // Left blocks width: 345 (x = 100..445)
    // Right blocks width: 315 (x = 500..815)

    // Block 1: Top-Left (Plots 13..07 top row, 14..20 bottom row)
    if (num >= 7 && num <= 13) {
      const idx = 13 - num; // 13 is 0, 7 is 6
      return { x: 100 + idx * 49.28, y: 205, w: 48, h: 62 };
    }
    if (num >= 14 && num <= 20) {
      const idx = num - 14; // 14 is 0, 20 is 6
      return { x: 100 + idx * 49.28, y: 268, w: 48, h: 62 };
    }

    // Block 2: Top-Right (Plots 06..01 top row, 21..26 bottom row)
    if (num >= 1 && num <= 6) {
      const idx = 6 - num; // 6 is 0, 1 is 5
      return { x: 500 + idx * 52.5, y: 205, w: 51.5, h: 62 };
    }
    if (num >= 21 && num <= 26) {
      const idx = num - 21; // 21 is 0, 26 is 5
      return { x: 500 + idx * 52.5, y: 268, w: 51.5, h: 62 };
    }

    // Block 3: Middle-Left (Plots 39..33 top row, 40..46 bottom row)
    if (num >= 33 && num <= 39) {
      const idx = 39 - num; // 39 is 0, 33 is 6
      return { x: 100 + idx * 49.28, y: 370, w: 48, h: 64 };
    }
    if (num >= 40 && num <= 46) {
      const idx = num - 40; // 40 is 0, 46 is 6
      return { x: 100 + idx * 49.28, y: 435, w: 48, h: 64 };
    }

    // Block 4: Middle-Right (Plots 32..27 top row, 47..51 bottom row + Park/EB)
    if (num >= 27 && num <= 32) {
      const idx = 32 - num; // 32 is 0, 27 is 5
      return { x: 500 + idx * 52.5, y: 370, w: 51.5, h: 64 };
    }
    if (num >= 47 && num <= 51) {
      const idx = num - 47; // 47 is 0, 51 is 4
      return { x: 500 + idx * 46, y: 435, w: 45, h: 64 };
    }

    // Block 5: Bottom-Left (Plots 64..58 single deep row)
    if (num >= 58 && num <= 64) {
      if (num === 64) {
        return { x: 88, y: 550, w: 60, h: 96 };
      }
      const idx = 63 - num; // 63 is 0, 58 is 5
      return { x: 149 + idx * 49.33, y: 550, w: 48, h: 96 };
    }

    // Block 6: Bottom-Right (Plots 57..52 single deep row)
    if (num >= 52 && num <= 57) {
      const idx = 57 - num; // 57 is 0, 52 is 5
      return { x: 500 + idx * 52.5, y: 550, w: 51.5, h: 96 };
    }

    return { x: 0, y: 0, w: 48, h: 48 };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'AVAILABLE':
        return {
          fill: '#1D4D27',
          hoverFill: '#266434',
          stroke: '#C6A15B',
          text: '#FFFFFF',
          badgeClass: 'bg-[#1D4D27] text-white border border-[#163D1F] font-bold'
        };
      case 'PRE-BOOKED':
        return {
          fill: '#C99E5B',
          hoverFill: '#DBB06C',
          stroke: '#8C6F34',
          text: '#1A0709',
          badgeClass: 'bg-[#C99E5B] text-[#1A0709] border border-[#B38743] font-bold'
        };
      case 'SOLD':
        return {
          fill: '#A63826',
          hoverFill: '#BF432F',
          stroke: '#6E2012',
          text: '#FFFFFF',
          badgeClass: 'bg-[#A63826] text-white border border-[#852718] font-bold'
        };
      default:
        return {
          fill: '#2B211A',
          hoverFill: '#3D2F25',
          stroke: '#C6A15B',
          text: '#FFFFFF',
          badgeClass: 'bg-espresso-800 text-white'
        };
    }
  };

  const renderPlotTable = (title, plots, rangeSubtitle) => {
    return (
      <div className="plots-single-table-card border border-gold-border/40 rounded-lg bg-white shadow-xs flex flex-col overflow-hidden">
        {/* Compact Table Section Header */}
        <div className="bg-espresso-950 text-gold-light py-1.5 px-2 border-b border-gold-border/40 flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-primary flex-shrink-0"></span>
            <span className="font-heading font-bold text-[10px] sm:text-xs tracking-wider text-gold-light uppercase truncate">
              {title}
            </span>
          </div>
          <span className="text-[8px] sm:text-[9px] font-sans font-semibold text-gold-antique bg-espresso-900 px-1 py-0.2 rounded border border-gold-border/30 flex-shrink-0">
            {plots.length} {plots.length === 1 ? 'Plot' : 'Plots'}
          </span>
        </div>

        {/* Table Content - Single Header & Guaranteed 100% Fit */}
        <div className="w-full overflow-hidden">
          <table className="w-full text-left border-collapse table-fixed font-sans">
            <colgroup>
              <col style={{ width: '18%' }} />
              <col style={{ width: '26%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '17%' }} />
              <col style={{ width: '24%' }} />
            </colgroup>
            <thead className="bg-espresso-900 text-gold-light tracking-tight uppercase">
              <tr className="border-b border-espresso-800">
                <th className="py-1 px-0.5 text-center text-[8.5px] sm:text-[11px] font-bold border-r border-espresso-800">
                  PLOT
                </th>
                <th className="py-1 px-1 text-right text-[8.5px] sm:text-[11px] font-bold border-r border-espresso-800">
                  SQ.FT
                </th>
                <th className="py-1 px-0.5 text-center text-[8.5px] sm:text-[11px] font-bold border-r border-espresso-800">
                  CENT
                </th>
                <th className="py-1 px-0.5 text-center text-[8.5px] sm:text-[11px] font-bold border-r border-espresso-800">
                  EXT
                </th>
                <th className="py-1 px-0.5 text-center text-[8.5px] sm:text-[11px] font-bold">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-border/20 text-espresso-900">
              {plots.map((plot) => {
                const badge = getStatusColor(plot.status);
                const isSelected = selectedPlot?.number === plot.number;
                return (
                  <tr
                    key={plot.number}
                    onClick={() => setSelectedPlot(plot)}
                    className={`transition-colors cursor-pointer hover:bg-gold-primary/15 ${
                      isSelected ? 'bg-gold-primary/25 font-bold' : ''
                    }`}
                  >
                    <td className="py-1 px-0.5 font-bold text-[9.5px] sm:text-xs text-espresso-950 border-r border-gold-border/20 text-center truncate">
                      <span className="inline-flex items-center gap-1 justify-center">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: badge.fill }}
                        />
                        #{plot.number}
                      </span>
                    </td>
                    <td className="py-1 px-1 font-semibold text-[9px] sm:text-xs text-espresso-900 text-right border-r border-gold-border/20 truncate">
                      {plot.sqft.toLocaleString()}
                    </td>
                    <td className="py-1 px-0.5 font-medium text-[9px] sm:text-xs text-espresso-800 text-center border-r border-gold-border/20 truncate">
                      {plot.cent}
                    </td>
                    <td className="py-1 px-0.5 font-medium text-[8.5px] sm:text-xs text-espresso-700 text-center border-r border-gold-border/20 truncate">
                      {plot.remSqft}
                    </td>
                    <td className="py-1 px-0.5 text-center">
                      <span className={`inline-block w-full text-center py-0.5 rounded text-[7.5px] sm:text-[10px] font-bold tracking-tight uppercase leading-none truncate ${badge.badgeClass}`}>
                        <span className="hidden sm:inline">{plot.status}</span>
                        <span className="sm:hidden">
                          {plot.status === 'AVAILABLE' ? 'AVAIL' : plot.status === 'PRE-BOOKED' ? 'BOOK' : 'SOLD'}
                        </span>
                      </span>
                    </td>
                  </tr>
                );
              })}
              {plots.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-espresso-600 text-[9px] font-sans">
                    No plots found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="plots-page-container min-h-screen bg-biscuit-100 text-espresso-900 pb-20">
      
      {/* 1. HERO SECTION (ALIGNED EXACTLY LIKE HOME HERO) */}
      <section className="plots-hero-section">
        <div
          className="plots-full-image"
          style={{ backgroundImage: "url('/Images/Plots_Hero_Bg.jpg')" }}
        />
        <div className="hero-text-blend-overlay" />

        {/* Main Container - Exact matching max-w-[1320px] and alignment as Home Hero */}
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8 w-full flex flex-col justify-center h-full relative z-[3] flex-1">
          <div className="hero-fit-content">
            <h1 className="hero-headline">
              <span className="gold-hero-badge">FIND YOUR PLOT</span>
              <br />
              <span style={{ color: '#E5D2A6' }}>YOUR FUTURE</span>
              <br />
              <span style={{ color: '#E5D2A6' }}>STARTS HERE</span>
            </h1>

            <div className="flex flex-wrap items-center gap-4 mt-6">
              <a
                href="#plot-masterplan-card"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('plot-masterplan-card')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded bg-gold-primary text-espresso-950 font-mono text-[0.78rem] font-extrabold tracking-[1.5px] border border-gold-light hover:bg-gold-light transition-all shadow-[0_6px_20px_rgba(0,0,0,0.4)] cursor-pointer"
              >
                EXPLORE BLUEPRINT MAP ↓
              </a>
              <a
                href="#plots-directory-card"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('plots-directory-card')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded border-[1.8px] border-gold-primary text-cream font-mono text-[0.78rem] font-extrabold tracking-[1.5px] bg-gold-primary/20 backdrop-blur-md hover:bg-gold-primary hover:text-espresso-950 transition-all shadow-[0_4px_18px_rgba(0,0,0,0.4)] cursor-pointer"
              >
                VIEW PLOTS DIRECTORY
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN LAYOUT CONTAINER */}
      <div id="plot-masterplan-card" className="max-w-[1320px] mx-auto px-4 sm:px-8 mt-10">
        
        {/* Location Switcher Buttons */}
        <div className="location-switcher-wrapper mb-8">
          <div className="text-center mb-3">
            <span className="architectural-tag centered">— SELECT DTCP LAYOUT LOCATION —</span>
            <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-espresso-950 mt-1">
              CHOOSE RESIDENTIAL MASTER PLAN
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-2xl mx-auto p-2 bg-white border-2 border-gold-primary rounded-2xl shadow-[0_8px_25px_rgba(26,7,9,0.08)]">
            <button
              type="button"
              onClick={() => {
                setActiveLocation('kambalampatti');
                setSelectedPlot(null);
                setTableFilter('ALL');
                setSelectedFilter('ALL');
              }}
              className={`flex-1 w-full py-3 px-5 rounded-xl transition-all duration-300 flex items-center justify-between sm:justify-center gap-3 cursor-pointer ${
                activeLocation === 'kambalampatti'
                  ? 'bg-[#1A0709] text-white shadow-md border-2 border-[#1A0709]'
                  : 'bg-transparent text-[#1A0709] hover:bg-[#FAF7F2] border border-transparent'
              }`}
            >
              <span className="font-heading font-extrabold text-sm sm:text-base tracking-wide">
                KAMBALAMPATTI LAYOUT
              </span>
              <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-black uppercase ${
                activeLocation === 'kambalampatti' ? 'bg-gold-primary text-espresso-950' : 'bg-[#FAF7F2] text-[#1A0709] border border-gold-border/60'
              }`}>
                64 PLOTS
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveLocation('kinathukadavu');
                setSelectedPlot(null);
                setTableFilter('ALL');
                setSelectedFilter('ALL');
              }}
              className={`flex-1 w-full py-3 px-5 rounded-xl transition-all duration-300 flex items-center justify-between sm:justify-center gap-3 cursor-pointer ${
                activeLocation === 'kinathukadavu'
                  ? 'bg-[#1A0709] text-white shadow-md border-2 border-[#1A0709]'
                  : 'bg-transparent text-[#1A0709] hover:bg-[#FAF7F2] border border-transparent'
              }`}
            >
              <span className="font-heading font-extrabold text-sm sm:text-base tracking-wide">
                KINATHUKADAVU LAYOUT
              </span>
              <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-black uppercase ${
                activeLocation === 'kinathukadavu' ? 'bg-gold-primary text-espresso-950' : 'bg-[#FAF7F2] text-[#1A0709] border border-gold-border/60'
              }`}>
                42 PLOTS
              </span>
            </button>
          </div>
        </div>

        {/* Availability Filter Bar */}
        <div className="availability-bar flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
          <button
            type="button"
            onClick={() => setSelectedFilter('ALL')}
            className={`filter-chip ${selectedFilter === 'ALL' ? 'active' : ''}`}
          >
            <span>ALL PLOTS ({stats.total})</span>
          </button>
          
          <button
            type="button"
            onClick={() => setSelectedFilter('AVAILABLE')}
            className={`filter-chip chip-available ${selectedFilter === 'AVAILABLE' ? 'active' : ''}`}
          >
            <span className="status-dot dot-available bg-[#1D4D27] border border-[#276735]" />
            <span>AVAILABLE: <strong className="text-[#1D4D27]">{stats.available}</strong></span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedFilter('PRE-BOOKED')}
            className={`filter-chip chip-prebooked ${selectedFilter === 'PRE-BOOKED' ? 'active' : ''}`}
          >
            <span className="status-dot dot-prebooked bg-[#C99E5B] border border-[#B38743]" />
            <span>PRE-BOOKED: <strong className="text-[#9C7230]">{stats.prebooked}</strong></span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedFilter('SOLD')}
            className={`filter-chip chip-sold ${selectedFilter === 'SOLD' ? 'active' : ''}`}
          >
            <span className="status-dot dot-sold bg-[#A63826] border border-[#852718]" />
            <span>SOLD: <strong className="text-[#A63826]">{stats.sold}</strong></span>
          </button>
        </div>

        {/* 3. DUAL MASTER PLAN & LOCATION SHOWCASE GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: MASTER PLAN BLUEPRINT & LEGEND (xl:col-span-8) */}
          <div className="xl:col-span-8 space-y-6">
            <div className="masterplan-card bg-cream border border-gold-border rounded-xl p-4 sm:p-6 shadow-soft relative">
          
          {/* Masterplan Toolbar */}
          <div className="masterplan-toolbar flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gold-border/40">
            <div>
              <span className="architectural-tag">
                PROJECT: {currentMetadata.name}
              </span>
              <p className="font-body text-xs sm:text-sm text-espresso-700 mt-1">
                {currentMetadata.approvalNo} • {currentMetadata.sfNumbers} • {currentMetadata.location}
              </p>
            </div>

            {/* Zoom Controls & Compass */}
            <div className="flex items-center gap-3 flex-wrap">

              {/* Zoom Buttons */}
              <div className="flex items-center gap-1 bg-biscuit-100 rounded border border-gold-border px-2 py-1">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.15))}
                  className="px-2 font-mono font-bold text-sm text-espresso-900 hover:text-gold-antique cursor-pointer"
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
                  className="px-2 font-mono font-bold text-sm text-espresso-900 hover:text-gold-antique cursor-pointer"
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

              {/* Compass Direction */}
              <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-gold-antique font-bold pl-2 border-l border-gold-border">
                <span>SCALE 1:500</span>
                <span className="flex items-center gap-1 text-espresso-900">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2v20M12 2l-4 4M12 2l4 4"/>
                    <circle cx="12" cy="12" r="8"/>
                  </svg>
                  NORTH ↑
                </span>
              </div>
            </div>
          </div>

          {/* Masterplan Visual Canvas */}
          <div className="masterplan-svg-container relative bg-[#F9F7F1] border border-gold-border/60 rounded-lg p-2 sm:p-4 overflow-auto flex justify-center items-center md:min-h-[520px] w-full">
            {/* Exact Vector Blueprint Replication with Tamil Text, Numbers & Interactions */}
            <div
              className="masterplan-viewport-wrapper w-full flex justify-center transition-transform duration-200"
              style={{
                transform: zoomLevel !== 1 ? `scale(${zoomLevel})` : undefined,
                transformOrigin: 'top center',
                minWidth: zoomLevel > 1 ? `${zoomLevel * 100}%` : '100%'
              }}
            >
              {activeLocation === 'kambalampatti' ? (
                <svg
                  id="plot-masterplan-svg"
                  viewBox="0 0 1180 840"
                  className="w-full max-w-[1140px] h-auto select-none block"
                  style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.06))' }}
                >
                  <defs>
                    {/* Shadow Filter */}
                    <filter id="plot-shadow" x="-5%" y="-5%" width="110%" height="110%">
                      <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.18" />
                    </filter>
                    <filter id="selected-glow" x="-15%" y="-15%" width="130%" height="130%">
                      <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#FFE082" floodOpacity="1" />
                    </filter>
                    {/* Arrow Markers */}
                    <marker id="arrow-black" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#1A0709" />
                    </marker>
                    <marker id="arrow-red" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#D32F2F" />
                    </marker>
                  </defs>

                  {/* 1. Base Paper Blueprint Canvas */}
                  <rect x="0" y="0" width="1180" height="840" fill="#FCFAF5" />
                  
                  {/* Blueprint Outer Frame Lines (matching engineering drawings) */}
                  <rect x="12" y="12" width="1156" height="816" fill="none" stroke="#1A0709" strokeWidth="2.5" />
                  <rect x="18" y="18" width="1144" height="804" fill="none" stroke="#1A0709" strokeWidth="1" />

                  {/* 2. Top Header Title (Replicating exact layout drawing title) */}
                  <text x="35" y="44" fontFamily="sans-serif" fontSize="13" fontWeight="900" fill="#1A0709" letterSpacing="0.3">
                    LAYOUT PLAN SHOWING THE PROPOSED LAYOUT OF HOUSE SITES IN S.F.NO-209/1, 222/1A1 &amp; 222/2A1B1 AT KAMBALAPATTI VILLAGE, ANAIMALAI TALUK, COIMBATORE DISTRICT.
                  </text>

                  {/* 3. North Arrow Compass (top-right) */}
                  <g transform="translate(850, 48)">
                    {/* Compass Circle */}
                    <circle cx="20" cy="20" r="16" fill="none" stroke="#1A0709" strokeWidth="1.2" />
                    {/* North Needle */}
                    <polygon points="20,4 24,20 20,16 16,20" fill="#1A0709" />
                    <polygon points="20,36 24,20 20,24 16,20" fill="#888888" />
                    <polygon points="4,20 20,24 16,20 20,16" fill="#CCCCCC" />
                    <polygon points="36,20 20,24 24,20 20,16" fill="#CCCCCC" />
                    <text x="20" y="-3" textAnchor="middle" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#1A0709">N</text>
                  </g>

                  {/* 4. Notice on Electrical Line (Top Left with arrows) */}
                  <g>
                    <text x="190" y="85" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#1A0709" fontFamily="sans-serif">
                      மனுதாரர் சொந்த செலவில்
                    </text>
                    <text x="190" y="99" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#1A0709" fontFamily="sans-serif">
                      மாற்றியமைக்கப்பட வேண்டிய குறைந்த
                    </text>
                    <text x="190" y="113" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#1A0709" fontFamily="sans-serif">
                      அழுத்த மின்கம்பி பாதை
                    </text>
                    {/* Curved Electrical Line Path */}
                    <path
                      d="M 68,260 Q 180,95 240,160"
                      fill="none"
                      stroke="#1A0709"
                      strokeWidth="1.8"
                      strokeDasharray="5 3"
                      markerEnd="url(#arrow-black)"
                    />
                  </g>

                  {/* 5. Yellow Roads (12.00M Panchayat Tar Roads - Top & West) */}
                  {/* West Panchayat Road (Running Vertically) */}
                  <polygon
                    points="24,160 68,160 68,780 24,780"
                    fill="#F2DC6D"
                    stroke="#8B6D1B"
                    strokeWidth="1.6"
                  />
                  {/* West Road Text */}
                  <text
                    x="46"
                    y="470"
                    textAnchor="middle"
                    transform="rotate(-90, 46, 470)"
                    fontSize="10.5"
                    fontWeight="bold"
                    fill="#1A0709"
                    fontFamily="sans-serif"
                    letterSpacing="0.8"
                  >
                    நிலையான 12.00 மீ அகல பஞ்சாயத்து தார் சாலை
                  </text>
                  {/* Anaimalai Direction Arrow at Bottom of West Road */}
                  <text
                    x="46"
                    y="760"
                    textAnchor="middle"
                    transform="rotate(-90, 46, 760)"
                    fontSize="11"
                    fontWeight="bold"
                    fill="#1A0709"
                    fontFamily="sans-serif"
                  >
                    ← ஆனைமலை
                  </text>
                  {/* Survey 207 label near west road */}
                  <text
                    x="82"
                    y="460"
                    textAnchor="middle"
                    transform="rotate(-90, 82, 460)"
                    fontSize="9.5"
                    fontWeight="bold"
                    fill="#1A0709"
                    fontFamily="sans-serif"
                  >
                    க.ச.எண் 207
                  </text>

                  {/* Top Panchayat Road Corridor (Crossing horizontally & branching to Thondamuthur & Kodangipalayam) */}
                  <polygon
                    points="68,160 415,160 415,62 470,62 470,160 880,188 945,145 975,170 915,215 470,195 415,190 68,195"
                    fill="#F2DC6D"
                    stroke="#8B6D1B"
                    strokeWidth="1.6"
                  />
                  {/* Arm to Thondamuthur (Upwards) */}
                  <text
                    x="442"
                    y="115"
                    textAnchor="middle"
                    transform="rotate(-90, 442, 115)"
                    fontSize="10.5"
                    fontWeight="bold"
                    fill="#1A0709"
                    fontFamily="sans-serif"
                  >
                    ↑ தொண்டாமுத்தூர்
                  </text>
                  <text
                    x="442"
                    y="145"
                    textAnchor="middle"
                    transform="rotate(-90, 442, 145)"
                    fontSize="9"
                    fontWeight="bold"
                    fill="#1A0709"
                    fontFamily="sans-serif"
                  >
                    க.ச.எண் 184
                  </text>

                  {/* Text along Top Panchayat Road */}
                  <text
                    x="260"
                    y="178"
                    textAnchor="middle"
                    fontSize="10.5"
                    fontWeight="bold"
                    fill="#1A0709"
                    fontFamily="sans-serif"
                  >
                    நிலையான 12.00 மீ அகல பஞ்சாயத்து தார் சாலை
                  </text>
                  <text
                    x="260"
                    y="192"
                    textAnchor="middle"
                    fontSize="9.5"
                    fontWeight="bold"
                    fill="#1A0709"
                    fontFamily="sans-serif"
                  >
                    க.ச.எண் 208
                  </text>

                  {/* Arm to Kodangipalayam (Angled Top-Right) */}
                  <text
                    x="890"
                    y="165"
                    transform="rotate(-30, 890, 165)"
                    fontSize="10.5"
                    fontWeight="bold"
                    fill="#1A0709"
                    fontFamily="sans-serif"
                  >
                    கோடங்கிபாளையம் →
                  </text>

                  {/* 6. Proposed Internal Layout Roads (Warm Brown Asphalt) */}
                  {/* Central 10.00m Avenue (Vertical) */}
                  <rect
                    x="445"
                    y="195"
                    width="55"
                    height="515"
                    fill="#543D2B"
                    stroke="#8B6D1B"
                    strokeWidth="1.2"
                  />
                  <text
                    x="472"
                    y="450"
                    textAnchor="middle"
                    transform="rotate(90, 472, 450)"
                    fontSize="10.5"
                    fontWeight="bold"
                    fill="#FDF8EE"
                    fontFamily="sans-serif"
                    letterSpacing="1.2"
                  >
                    உத்தேச 10.00 மீ மனைப்பிரிவு சாலை
                  </text>

                  {/* Upper 7.20m Cross Road (Horizontal) */}
                  <rect
                    x="95"
                    y="330"
                    width="720"
                    height="40"
                    fill="#543D2B"
                    stroke="#8B6D1B"
                    strokeWidth="1.2"
                  />
                  <text
                    x="270"
                    y="354"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="bold"
                    fill="#FDF8EE"
                    fontFamily="sans-serif"
                  >
                    உத்தேச 7.20 மீ மனைப்பிரிவு சாலை
                  </text>
                  <text
                    x="640"
                    y="354"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="bold"
                    fill="#FDF8EE"
                    fontFamily="sans-serif"
                  >
                    உத்தேச 7.20 மீ மனைப்பிரிவு சாலை
                  </text>
                  <text
                    x="765"
                    y="354"
                    textAnchor="middle"
                    fontSize="8.5"
                    fontWeight="bold"
                    fill="#FDF8EE"
                    fontFamily="sans-serif"
                  >
                    க.ச.எண் 222/1அ1
                  </text>

                  {/* Lower 9.00m Cross Road (Horizontal) */}
                  <rect
                    x="85"
                    y="500"
                    width="730"
                    height="48"
                    fill="#543D2B"
                    stroke="#8B6D1B"
                    strokeWidth="1.2"
                  />
                  <text
                    x="250"
                    y="528"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="bold"
                    fill="#FDF8EE"
                    fontFamily="sans-serif"
                  >
                    உத்தேச 9.00 மீ மனைப்பிரிவு சாலை
                  </text>
                  <text
                    x="375"
                    y="528"
                    textAnchor="middle"
                    fontSize="8.5"
                    fontWeight="bold"
                    fill="#FDF8EE"
                    fontFamily="sans-serif"
                  >
                    க.ச.எண் 209/1
                  </text>
                  <text
                    x="640"
                    y="528"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="bold"
                    fill="#FDF8EE"
                    fontFamily="sans-serif"
                  >
                    உத்தேச 9.00 மீ மனைப்பிரிவு சாலை
                  </text>
                  <text
                    x="765"
                    y="528"
                    textAnchor="middle"
                    fontSize="8.5"
                    fontWeight="bold"
                    fill="#FDF8EE"
                    fontFamily="sans-serif"
                  >
                    க.ச.எண் 209/2அ1பி1
                  </text>

                  {/* 7. Public Purpose Amenities (Next to Plot 51) */}
                  {/* Park (பொது உபயோகம் - Purple) */}
                  <rect
                    x="730"
                    y="435"
                    width="44"
                    height="64"
                    fill="#7E57C2"
                    stroke="#5E35B1"
                    strokeWidth="1.2"
                    rx="1"
                  />
                  <text x="752" y="464" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#FFFFFF" fontFamily="sans-serif">
                    பொது
                  </text>
                  <text x="752" y="476" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#FFFFFF" fontFamily="sans-serif">
                    உபயோகம்
                  </text>

                  {/* EB (TANGEDCO - Green) */}
                  <rect
                    x="775"
                    y="435"
                    width="40"
                    height="64"
                    fill="#2E7D32"
                    stroke="#1B5E20"
                    strokeWidth="1.2"
                    rx="1"
                  />
                  <text x="795" y="464" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#FFFFFF" fontFamily="sans-serif">
                    EB
                  </text>
                  <text x="795" y="476" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#A7F3D0" fontFamily="sans-serif">
                    TANGEDCO
                  </text>

                  {/* Arrows pointing to Park & TANGEDCO */}
                  <g>
                    <path d="M 835,465 L 755,465" fill="none" stroke="#1A0709" strokeWidth="1.2" markerEnd="url(#arrow-black)" />
                    <text x="840" y="468" fontSize="9" fontWeight="bold" fill="#1A0709" fontFamily="sans-serif">
                      ← பொது உபயோகம்
                    </text>
                    <path d="M 835,488 L 798,488" fill="none" stroke="#1A0709" strokeWidth="1.2" markerEnd="url(#arrow-black)" />
                    <text x="840" y="491" fontSize="9" fontWeight="bold" fill="#1A0709" fontFamily="sans-serif">
                      ← TANGEDCO
                    </text>
                  </g>

                  {/* 8. Red Boundary Dimension Overlays (Exact numbers from blueprint) */}
                  <g fill="#D32F2F" fontFamily="monospace" fontWeight="bold" fontSize="9.5">
                    {/* North Boundary */}
                    <text x="270" y="202">113.6</text>
                    <text x="390" y="202">24'-9"</text>
                    <text x="745" y="202">17.6</text>
                    <text x="785" y="202">18.6</text>

                    {/* West Boundary */}
                    <text x="85" y="325" transform="rotate(-90, 85, 325)">81.0</text>

                    {/* East Boundary */}
                    <text x="825" y="415" transform="rotate(90, 825, 415)">60.4</text>

                    {/* South Boundary */}
                    <text x="270" y="660" fontSize="10.5">123.4</text>
                    <text x="750" y="660" fontSize="10.5">10.8</text>

                    {/* Plot Dimensions marked along roads */}
                    <text x="120" y="202" fontSize="8.5">30'-0"</text>
                    <text x="170" y="202" fontSize="8.5">30'-0"</text>
                    <text x="220" y="202" fontSize="8.5">30'-0"</text>
                    <text x="520" y="202" fontSize="8.5">25'-0"</text>
                    <text x="575" y="202" fontSize="8.5">30'-0"</text>
                    <text x="630" y="202" fontSize="8.5">30'-0"</text>
                    <text x="680" y="202" fontSize="8.5">30'-0"</text>

                    {/* Middle road dimensions */}
                    <text x="120" y="327" fontSize="8.5">30'-0"</text>
                    <text x="220" y="327" fontSize="8.5">30'-0"</text>
                    <text x="520" y="327" fontSize="8.5">25'-0"</text>
                    <text x="630" y="327" fontSize="8.5">30'-0"</text>

                    {/* Park/EB red dimensions */}
                    <text x="735" y="432" fontSize="8">23'-3"</text>
                    <text x="780" y="432" fontSize="8">13'-6"</text>
                  </g>

                  {/* Adjoining Survey Labels outside site */}
                  <g fill="#1A0709" fontFamily="sans-serif" fontWeight="bold" fontSize="9.5">
                    <text x="835" y="380">க.ச.எண் 222/1அ2</text>
                    <text x="835" y="570">க.ச.எண் 222/2அ1பி2</text>
                    <text x="270" y="675" fontSize="10">க.ச.எண் 209/2</text>
                    <text x="750" y="675" fontSize="10">க.ச.எண் 222/2அ1அ</text>
                  </g>

                  {/* 9. Render All 64 Plots */}
                  {kambalampattiPlots.map((plot) => {
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
                        {/* Plot Base Rectangle */}
                        <rect
                          x={coords.x}
                          y={coords.y}
                          width={coords.w}
                          height={coords.h}
                          fill={colors.fill}
                          stroke={isSelected ? '#FFE082' : colors.stroke}
                          strokeWidth={isSelected ? '3.5' : '1.2'}
                          rx="2"
                          filter={isSelected ? 'url(#selected-glow)' : 'url(#plot-shadow)'}
                        />

                        {/* Plot Number */}
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

                        {/* Plot Sq.Ft Area */}
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

                        {/* Selected Indicator Pin */}
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

                  {/* 10. Official DTCP Approval Stamp Box at Bottom Center */}
                  <g transform="translate(420, 725)">
                    {/* Double bordered red seal */}
                    <rect
                      x="0"
                      y="0"
                      width="270"
                      height="44"
                      rx="8"
                      fill="#FFFDF8"
                      stroke="#D32F2F"
                      strokeWidth="2.4"
                    />
                    <rect
                      x="4"
                      y="4"
                      width="262"
                      height="36"
                      rx="6"
                      fill="none"
                      stroke="#D32F2F"
                      strokeWidth="1"
                      strokeDasharray="5 3"
                    />
                    <text
                      x="135"
                      y="26"
                      fill="#D32F2F"
                      fontFamily="sans-serif"
                      fontSize="12.5"
                      fontWeight="bold"
                      textAnchor="middle"
                      letterSpacing="0.8"
                    >
                      {PROJECT_METADATA.approvalNo}
                    </text>
                  </g>
                </svg>
              ) : (
                <KinathukadavuBlueprintSVG
                  plots={activePlots}
                  selectedPlot={selectedPlot}
                  selectedFilter={selectedFilter}
                  onSelectPlot={setSelectedPlot}
                />
              )}
            </div>
          </div>
          
          {/* Mobile Interactive Hint */}
          <div className="flex sm:hidden items-center justify-between text-[11px] font-mono text-espresso-700 px-1 py-2 mt-2 border-t border-gold-border/30">
            <span className="flex items-center gap-1 text-gold-antique font-bold">
              <span>💡</span> Tap any plot to view specs &amp; book
            </span>
            <span className="text-espresso-600 font-semibold">
              Use + / - to zoom
            </span>
          </div>
        </div>

        {/* 4. PLOT STATUS COLOR CODE LEGEND NOTE */}
        <div className="plot-legend-banner mt-8 bg-[#FAF7F2] border border-gold-border/60 rounded-xl p-4 sm:p-6 shadow-sm">
          <div className="legend-title flex items-center gap-2 font-mono text-xs font-bold text-gold-antique uppercase tracking-widest mb-4">
            <span className="w-4 h-0.5 bg-gold-primary" />
            PLOT AVAILABILITY COLOR CODE NOTE
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* AVAILABLE (GREEN) */}
            <div className="flex items-start gap-3 bg-white p-3.5 rounded-lg border border-emerald-700/25 shadow-xs hover:border-emerald-600/50 transition-all">
              <span className="w-5 h-5 rounded-md bg-[#1D4D27] border border-[#276735] flex-shrink-0 mt-0.5 shadow-xs" />
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <strong className="font-heading text-sm text-[#1D4D27] font-bold tracking-wide">
                    AVAILABLE (GREEN)
                  </strong>
                  <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#1D4D27]/10 text-[#1D4D27] border border-[#1D4D27]/25">
                    {stats.available} Plots
                  </span>
                </div>
                <p className="font-body text-xs text-espresso-700 leading-relaxed">
                  100% DTCP Approved plot ready for immediate booking, registration &amp; construction.
                </p>
              </div>
            </div>

            {/* PRE-BOOKED (SANDAL) */}
            <div className="flex items-start gap-3 bg-white p-3.5 rounded-lg border border-amber-600/25 shadow-xs hover:border-amber-500/50 transition-all">
              <span className="w-5 h-5 rounded-md bg-[#C99E5B] border border-[#B38743] flex-shrink-0 mt-0.5 shadow-xs" />
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <strong className="font-heading text-sm text-[#9C7230] font-bold tracking-wide">
                    PRE-BOOKED (SANDAL)
                  </strong>
                  <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#C99E5B]/15 text-[#8A6324] border border-[#C99E5B]/30">
                    {stats.prebooked} Plots
                  </span>
                </div>
                <p className="font-body text-xs text-espresso-700 leading-relaxed">
                  Initial token advance received. Document verification &amp; bank loan in progress.
                </p>
              </div>
            </div>

            {/* SOLD (RED) */}
            <div className="flex items-start gap-3 bg-white p-3.5 rounded-lg border border-red-700/25 shadow-xs hover:border-red-600/50 transition-all">
              <span className="w-5 h-5 rounded-md bg-[#A63826] border border-[#852718] flex-shrink-0 mt-0.5 shadow-xs" />
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <strong className="font-heading text-sm text-[#A63826] font-bold tracking-wide">
                    SOLD (RED)
                  </strong>
                  <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#A63826]/10 text-[#A63826] border border-[#A63826]/25">
                    {stats.sold} Plots
                  </span>
                </div>
                <p className="font-body text-xs text-espresso-700 leading-relaxed">
                  Sale deed registered &amp; clear parent title transferred to plot owner.
                </p>
              </div>
            </div>
          </div>
        </div>
          </div>
          {/* END LEFT COLUMN */}

          {/* RIGHT COLUMN: LOCATION & AMENITIES CARD (xl:col-span-4) */}
          <div className="xl:col-span-4">
            {currentMetadata.locationHighlights && (
              <div className="bg-[#FFFDF8] border-2 border-gold-primary rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(10,19,37,0.12)]">
                
                {/* Single Clean Location Image */}
                <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-espresso-950">
                  <img
                    src={currentMetadata.locationHighlights.image}
                    alt={currentMetadata.locationHighlights.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0709]/85 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 px-3 py-1 rounded text-[11px] font-mono font-bold bg-[#1A0709] text-gold-light border border-gold-primary/50 shadow-sm">
                    {currentMetadata.locationHighlights.imageCaption}
                  </span>
                </div>

                {/* Details in Points (Without Emojis) */}
                <div className="p-5 sm:p-6">
                  <div className="mb-4 pb-3 border-b border-gold-border/50">
                    <span className="architectural-tag">
                      {currentMetadata.locationHighlights.tag}
                    </span>
                    <h3 className="font-heading font-extrabold text-lg sm:text-xl text-espresso-950 mt-1">
                      {currentMetadata.locationHighlights.title}
                    </h3>
                    <p className="font-body text-xs text-espresso-700 mt-0.5">
                      {currentMetadata.locationHighlights.subtitle}
                    </p>
                  </div>

                  {/* Clean Bullet Points */}
                  <ul className="space-y-3">
                    {currentMetadata.locationHighlights.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-espresso-900 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-primary mt-2 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Clean Action Button */}
                  <div className="mt-6 pt-4 border-t border-gold-border/40">
                    <button
                      type="button"
                      onClick={() => {
                        const text = encodeURIComponent(
                          `Hello SHASHTIKA Plot Developers,\n\nI am interested in plots at ${currentMetadata.name} (${currentMetadata.location}).\n\nPlease share layout availability and pricing details.`
                        );
                        window.open(`https://wa.me/919363599754?text=${text}`, '_blank');
                      }}
                      className="w-full py-3 px-4 rounded-lg bg-[#1A0709] hover:bg-gold-primary hover:text-espresso-950 border-2 border-gold-primary text-white font-mono text-xs font-bold tracking-wider uppercase text-center transition-all cursor-pointer shadow-md"
                    >
                      ENQUIRE ABOUT PLOTS →
                    </button>
                  </div>
                </div>

              </div>
            )}
          </div>
          {/* END RIGHT COLUMN */}

        </div>
        {/* END DUAL MASTER PLAN & LOCATION SHOWCASE GRID */}

        {/* 5. COMPLETE PLOTS DIRECTORY SPECIFICATION TABLE */}
        <div id="plots-directory-card" className="layout-summary-table-card mt-10 bg-cream border border-gold-border rounded-xl p-5 sm:p-7 shadow-soft">
          
          <div className="plots-table-header-bar flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gold-border/50">
            <div>
              <span className="architectural-tag">OFFICIAL MASTER PLAN EXTENT DIRECTORY</span>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-espresso-900 mt-1">
                HOUSE SITES EXTENT DETAILS (PLOTS 01 TO {activePlots.length})
              </h3>
              <p className="font-mono text-xs text-gold-dark mt-0.5">
                DTCP Approval: {currentMetadata.approvalNo} • {currentMetadata.sfNumbers}
              </p>
            </div>

            {/* Filter Chips with exact color coordination */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'ALL', label: 'ALL', count: stats.total, activeClass: 'bg-espresso-900 text-gold-light border-gold-primary' },
                { id: 'AVAILABLE', label: 'AVAILABLE', count: stats.available, activeClass: 'bg-[#1D4D27] text-white border-[#163D1F]' },
                { id: 'PRE-BOOKED', label: 'PRE-BOOKED', count: stats.prebooked, activeClass: 'bg-[#C99E5B] text-[#1A0709] border-[#B38743]' },
                { id: 'SOLD', label: 'SOLD', count: stats.sold, activeClass: 'bg-[#A63826] text-white border-[#852718]' }
              ].map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setTableFilter(btn.id)}
                  className={`px-3 py-1.5 rounded text-xs font-mono font-bold border transition-colors cursor-pointer ${
                    tableFilter === btn.id
                      ? btn.activeClass
                      : 'bg-biscuit-100 text-espresso-800 border-gold-border hover:bg-gold-primary/20'
                  }`}
                >
                  {btn.label} ({btn.count})
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 my-4">
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search plot #, facing, sqft, cent..."
                className="w-full bg-biscuit-100 border border-gold-border rounded px-3 py-2 pl-9 text-xs sm:text-sm text-espresso-900 placeholder:text-espresso-600 focus:outline-none focus:border-gold-primary"
              />
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="absolute left-3 top-2.5 text-espresso-600"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>

            <span className="font-mono text-xs text-espresso-700">
              Showing <strong>{filteredPlots.length}</strong> of {stats.total} plots
            </span>
          </div>

          {/* 4-Table 2x2 Grid (2 on screen and below 2 tables on mobile, 4-col on desktop) */}
          <div className="plots-tables-grid grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 border border-gold-border/40 rounded-lg p-1.5 sm:p-2 bg-[#FAF7F2]">
            {tableChunks.map((chunk) => renderPlotTable(chunk.label, chunk.plots, chunk.id))}
          </div>

          {/* Masterplan Summary Footnote */}
          <div className="mt-4 p-3 bg-biscuit-100 rounded border border-gold-border/40 flex flex-wrap items-center justify-between text-xs text-espresso-700 font-mono">
            <span>TOTAL PLOTS: <strong>{currentMetadata.totalPlots}</strong></span>
            <span>TOTAL AREA: <strong>{currentMetadata.totalArea}</strong></span>
            <span>DTCP NO: <strong>{currentMetadata.approvalNo}</strong></span>
          </div>

        </div>

      </div>

      {/* 6. PLOT INSPECTOR DRAWER / POPUP MODAL (NEATLY ALIGNED & VISIBLE FOR ALL AGE GROUPS) */}
      {selectedPlot && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-espresso-950/80 backdrop-blur-md"
          onClick={() => setSelectedPlot(null)}
        >
          <div
            className="w-full max-w-xl bg-[#FFFDF8] border-2 border-gold-primary rounded-2xl p-5 sm:p-7 shadow-[0_20px_60px_rgba(20,12,8,0.35)] relative animate-modalFadeIn max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Plot Badge, Status & Close Button */}
            <div className="flex items-center justify-between pb-3.5 border-b border-gold-border/50">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="px-3.5 py-1 bg-espresso-950 text-gold-light border border-gold-primary rounded-md font-mono font-black text-sm tracking-widest shadow-xs">
                  PLOT #{selectedPlot.number}
                </span>
                <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${getStatusColor(selectedPlot.status).badgeClass}`}>
                  {selectedPlot.status}
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPlot(null)}
                className="w-9 h-9 rounded-full border border-gold-primary/80 bg-espresso-900 text-white flex items-center justify-center text-2xl hover:bg-gold-primary hover:text-espresso-950 transition-colors cursor-pointer shadow-sm"
                title="Close"
              >
                &times;
              </button>
            </div>

            {/* Plot Heading & Location Subtitle */}
            <div className="mt-4 mb-5">
              <h3 className="font-heading font-extrabold text-2xl sm:text-[1.65rem] text-espresso-950 leading-tight">
                Plot #{selectedPlot.number} — {selectedPlot.facing}
              </h3>
              <p className="font-body text-xs sm:text-sm text-espresso-700 mt-1.5 flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-espresso-900">{currentMetadata.name}</span>
                <span>•</span>
                <span className="font-mono text-gold-dark font-bold">{currentMetadata.approvalNo}</span>
              </p>
            </div>

            {/* Primary Highlight Metrics (Large, High Contrast & Ultra-Legible for All Ages) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5">
              <div className="bg-[#FAF4EB] p-4 rounded-xl border border-gold-border/70 shadow-xs">
                <span className="block font-mono text-[11px] sm:text-xs font-bold text-espresso-700 uppercase tracking-wider">
                  TOTAL LAND EXTENT
                </span>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="font-sans text-2xl sm:text-3xl font-black text-espresso-950 tracking-tight">
                    {selectedPlot.sqft.toLocaleString()}
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-espresso-700 uppercase">
                    Sq.Ft
                  </span>
                </div>
                <span className="block text-[10.5px] text-espresso-600 mt-1">
                  100% DTCP Approved area
                </span>
              </div>

              <div className="bg-[#FAF4EB] p-4 rounded-xl border border-gold-border/70 shadow-xs">
                <span className="block font-mono text-[11px] sm:text-xs font-bold text-espresso-700 uppercase tracking-wider">
                  EXTENT IN CENTS
                </span>
                <div className="mt-1 flex items-baseline gap-1.5 flex-wrap">
                  <span className="font-sans text-xl sm:text-2xl font-black text-gold-dark tracking-tight">
                    {selectedPlot.cent} Cents
                  </span>
                  {selectedPlot.remSqft > 0 && (
                    <span className="text-xs sm:text-sm font-bold text-espresso-800">
                      {selectedPlot.remSqft} Sq.Ft
                    </span>
                  )}
                </div>
                <span className="block text-[10.5px] text-espresso-600 mt-1">
                  Revenue cent measurement
                </span>
              </div>
            </div>

            {/* Neatly Aligned Specification Rows (Clean Key-Value Spec Sheet) */}
            <div className="bg-[#FAF4EB] rounded-xl border border-gold-border/60 divide-y divide-gold-border/30 overflow-hidden mb-5">
              <div className="flex items-center justify-between px-4 py-3 text-xs sm:text-sm">
                <span className="font-semibold text-espresso-700">Dimensions</span>
                <strong className="font-bold text-espresso-950 font-mono text-sm">{selectedPlot.dim}</strong>
              </div>

              <div className="flex items-center justify-between px-4 py-3 text-xs sm:text-sm bg-white/60">
                <span className="font-semibold text-espresso-700">Facing Direction</span>
                <strong className="font-bold text-espresso-950">{selectedPlot.facing}</strong>
              </div>

              <div className="flex items-center justify-between px-4 py-3 text-xs sm:text-sm">
                <span className="font-semibold text-espresso-700">Road Width &amp; Access</span>
                <strong className="font-bold text-espresso-950 text-right">{selectedPlot.road}</strong>
              </div>

              <div className="flex items-center justify-between px-4 py-3 text-xs sm:text-sm bg-white/60">
                <span className="font-semibold text-espresso-700">Survey Numbers</span>
                <strong className="font-bold text-espresso-950 font-mono text-xs sm:text-sm">{currentMetadata.sfNumbers}</strong>
              </div>

              <div className="flex items-center justify-between px-4 py-3 text-xs sm:text-sm">
                <span className="font-semibold text-espresso-700">Taluk &amp; Village</span>
                <strong className="font-bold text-espresso-950 text-right">{currentMetadata.location}</strong>
              </div>
            </div>

            {/* Location Landmarks & Amenities Strip inside Modal (Clean, No Emojis) */}
            {currentMetadata.locationHighlights && (
              <div className="bg-[#FAF4EB] p-3.5 rounded-xl border border-gold-border/60 mb-5 shadow-2xs">
                <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-gold-border/40">
                  <span className="font-mono text-[10.5px] font-bold text-gold-dark uppercase tracking-wider">
                    LOCATION HIGHLIGHTS &amp; AMENITIES
                  </span>
                  <span className="font-mono text-[10px] font-extrabold text-espresso-900 bg-white border border-gold-border/40 px-2 py-0.5 rounded">
                    {currentMetadata.shortName || 'CORRIDOR'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 text-xs text-espresso-950 font-medium">
                  {currentMetadata.locationHighlights.points.slice(0, 4).map((pt, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-md border border-gold-border/50 text-[11px] shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-primary flex-shrink-0" />
                      <span>{pt}</span>
                    </span>
                  ))}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-md border border-gold-border/50 text-[11px] shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-primary flex-shrink-0" />
                    <span>Road: {selectedPlot.road}</span>
                  </span>
                </div>
              </div>
            )}

            {/* Government DTCP Approval Trust Card */}
            <div className="bg-espresso-950 text-gold-light p-4 rounded-xl border border-gold-primary mb-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-1 pb-2 border-b border-gold-primary/30">
                <span className="font-mono text-xs text-gold-antique uppercase font-extrabold tracking-wider">
                  GOVERNMENT DTCP APPROVAL
                </span>
                <span className="font-mono text-xs sm:text-sm text-gold-light font-bold">
                  {currentMetadata.approvalNo}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-cream/95 pt-2.5 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="text-gold-antique font-bold">✓</span> 100% Clear Title
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-gold-antique font-bold">✓</span> Individual Patta Eligible
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-gold-antique font-bold">✓</span> Ready for Immediate Registration
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                type="button"
                onClick={() => openWhatsApp(selectedPlot)}
                className="flex-1 btn btn-gold py-3 px-5 rounded-lg text-xs sm:text-sm font-mono font-bold tracking-wider text-center cursor-pointer shadow-md hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
              >
                <span>ENQUIRE VIA WHATSAPP →</span>
              </button>
              <a
                href="tel:+919842210542"
                className="btn btn-outline-gold py-3 px-6 rounded-lg text-xs sm:text-sm font-mono font-bold tracking-wider text-center cursor-pointer flex items-center justify-center gap-2"
              >
                <span>CALL NOW</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
