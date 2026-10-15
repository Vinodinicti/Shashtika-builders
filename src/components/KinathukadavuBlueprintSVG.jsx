import React from 'react';

export default function KinathukadavuBlueprintSVG({
  plots,
  selectedPlot,
  selectedFilter,
  onSelectPlot
}) {
  const getPlotObj = (num) => plots.find((p) => p.number === num);

  const getStatusColor = (status) => {
    switch (status) {
      case 'AVAILABLE':
        return { fill: '#E8F5E9', stroke: '#1D4D27', text: '#1D4D27' };
      case 'PRE-BOOKED':
        return { fill: '#FFF8E1', stroke: '#C99E5B', text: '#9C7230' };
      case 'SOLD':
        return { fill: '#FFEBEE', stroke: '#A63826', text: '#A63826' };
      default:
        return { fill: '#FFFFFF', stroke: '#777777', text: '#333333' };
    }
  };

  const isPlotVisible = (status) => {
    if (selectedFilter === 'ALL') return true;
    return status === selectedFilter;
  };

  // Render a clickable plot box
  const renderPlot = (plotNum, x, y, width, height, customLabel = null) => {
    const plot = getPlotObj(plotNum);
    if (!plot) return null;

    const colors = getStatusColor(plot.status);
    const visible = isPlotVisible(plot.status);
    const isSelected = selectedPlot && selectedPlot.number === plot.number;

    return (
      <g
        key={plotNum}
        onClick={() => onSelectPlot(plot)}
        style={{ cursor: 'pointer', opacity: visible ? 1 : 0.22, transition: 'all 0.2s ease' }}
        className="plot-group hover:filter hover:brightness-95"
      >
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={isSelected ? '#FFE082' : colors.fill}
          stroke={isSelected ? '#1A0709' : colors.stroke}
          strokeWidth={isSelected ? 3 : 1.5}
          rx={3}
          filter={isSelected ? 'url(#selected-glow)' : 'url(#plot-shadow)'}
        />

        {/* Plot Number badge */}
        <circle cx={x + 18} cy={y + 16} r={10} fill={colors.stroke} />
        <text
          x={x + 18}
          y={y + 20}
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="'Space Mono', monospace"
          fontSize="10"
          fontWeight="900"
        >
          {plotNum}
        </text>

        {/* Plot Details Text */}
        <text
          x={x + width / 2 + 6}
          y={y + 18}
          textAnchor="middle"
          fill="#1A0709"
          fontFamily="'Space Mono', monospace"
          fontSize="11"
          fontWeight="bold"
        >
          {plot.sqft} SQ.FT
        </text>
        <text
          x={x + width / 2}
          y={y + 34}
          textAnchor="middle"
          fill="#4A5568"
          fontFamily="sans-serif"
          fontSize="9.5"
          fontWeight="600"
        >
          {plot.cent} Cents • {customLabel || plot.dim}
        </text>
        <text
          x={x + width / 2}
          y={y + 48}
          textAnchor="middle"
          fill={colors.text}
          fontFamily="sans-serif"
          fontSize="9"
          fontWeight="800"
          letterSpacing="0.5"
        >
          {plot.status}
        </text>
      </g>
    );
  };

  return (
    <svg
      id="plot-masterplan-svg-kinathukadavu"
      viewBox="0 0 1180 840"
      className="w-full max-w-[1140px] h-auto select-none block"
      style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.06))' }}
    >
      <defs>
        <filter id="plot-shadow" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.16" />
        </filter>
        <filter id="selected-glow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#FFE082" floodOpacity="1" />
        </filter>
      </defs>

      {/* 1. Base Blueprint Canvas & Borders */}
      <rect x="0" y="0" width="1180" height="840" fill="#FCFAF5" />
      <rect x="12" y="12" width="1156" height="816" fill="none" stroke="#1A0709" strokeWidth="2.5" />
      <rect x="18" y="18" width="1144" height="804" fill="none" stroke="#1A0709" strokeWidth="1" />

      {/* 2. Engineering Header */}
      <text x="35" y="44" fontFamily="sans-serif" fontSize="13" fontWeight="900" fill="#1A0709" letterSpacing="0.3">
        LAYOUT PLAN SHOWING PROPOSED HOUSE SITES AT KINATHUKADAVU, POLLACHI HIGHWAY CORRIDOR, COIMBATORE DISTRICT.
      </text>

      {/* 3. North Arrow Compass */}
      <g transform="translate(1080, 48)">
        <circle cx="20" cy="20" r="16" fill="none" stroke="#1A0709" strokeWidth="1.2" />
        <polygon points="20,4 24,20 20,16 16,20" fill="#1A0709" />
        <polygon points="20,36 24,20 20,24 16,20" fill="#888888" />
        <polygon points="4,20 20,24 16,20 20,16" fill="#CCCCCC" />
        <polygon points="36,20 20,24 24,20 20,16" fill="#CCCCCC" />
        <text x="20" y="-3" textAnchor="middle" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#1A0709">N</text>
      </g>

      {/* 4. NORTH 40 FT MAIN HIGHWAY TAR ROAD */}
      <g id="north-highway">
        <rect x="35" y="62" width="1020" height="48" fill="#D9D5CA" stroke="#1A0709" strokeWidth="1.5" />
        <line x1="35" y1="86" x2="1055" y2="86" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="12 8" />
        <text x="545" y="91" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="11" fontWeight="bold" fill="#1A0709" letterSpacing="2">
          40.00 FT (12.00M) MAIN HIGHWAY CORRIDOR ACCESS ROAD (NORTH)
        </text>
      </g>

      {/* 5. ROW 1 (PLOTS 1 TO 6 - TOP ROW ALONG HIGHWAY) */}
      <g id="row-1">
        {renderPlot(1, 45, 122, 160, 58, "Corner Site")}
        {renderPlot(2, 215, 122, 160, 58)}
        {renderPlot(3, 385, 122, 160, 58)}
        {renderPlot(4, 555, 122, 160, 58)}
        {renderPlot(5, 725, 122, 160, 58)}
        {renderPlot(6, 895, 122, 160, 58, "Corner Site")}
      </g>

      {/* 6. INTERNAL 30 FT CROSS ROAD 1 */}
      <g id="cross-road-1">
        <rect x="35" y="192" width="1020" height="36" fill="#E8E5DD" stroke="#1A0709" strokeWidth="1.2" />
        <line x1="35" y1="210" x2="1055" y2="210" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="10 6" />
        <text x="545" y="214" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="10" fontWeight="bold" fill="#4A5568" letterSpacing="1.5">
          30.00 FT (9.00M) RESIDENTIAL LAYOUT ROAD A
        </text>
      </g>

      {/* 7. ROW 2 (PLOTS 7 TO 12) */}
      <g id="row-2">
        {renderPlot(7, 45, 240, 160, 58, "Corner Site")}
        {renderPlot(8, 215, 240, 160, 58)}
        {renderPlot(9, 385, 240, 160, 58)}
        {renderPlot(10, 555, 240, 160, 58)}
        {renderPlot(11, 725, 240, 160, 58)}
        {renderPlot(12, 895, 240, 160, 58, "Corner Site")}
      </g>

      {/* 8. ROW 3 (PLOTS 13 TO 18 - FACING CENTRAL BOULEVARD) */}
      <g id="row-3">
        {renderPlot(13, 45, 310, 160, 58)}
        {renderPlot(14, 215, 310, 160, 58)}
        {renderPlot(15, 385, 310, 160, 58)}
        {renderPlot(16, 555, 310, 160, 58)}
        {renderPlot(17, 725, 310, 160, 58)}
        {renderPlot(18, 895, 310, 160, 58, "Corner Site")}
      </g>

      {/* 9. CENTRAL 33 FT MAIN BOULEVARD AVENUE */}
      <g id="central-boulevard">
        <rect x="35" y="380" width="1020" height="44" fill="#D9D5CA" stroke="#1A0709" strokeWidth="1.5" />
        <line x1="35" y1="402" x2="1055" y2="402" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="12 8" />
        <text x="545" y="407" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="10.5" fontWeight="bold" fill="#1A0709" letterSpacing="2">
          33.00 FT (10.00M) CENTRAL AVENUE BOULEVARD
        </text>
      </g>

      {/* 10. ROW 4 (PLOTS 19 TO 24) */}
      <g id="row-4">
        {renderPlot(19, 45, 436, 160, 58)}
        {renderPlot(20, 215, 436, 160, 58)}
        {renderPlot(21, 385, 436, 160, 58)}
        {renderPlot(22, 555, 436, 160, 58)}
        {renderPlot(23, 725, 436, 160, 58, "Corner Site")}
        {renderPlot(24, 895, 436, 160, 58)}
      </g>

      {/* 11. ROW 5 (PLOTS 25 TO 30) */}
      <g id="row-5">
        {renderPlot(25, 45, 506, 160, 58)}
        {renderPlot(26, 215, 506, 160, 58)}
        {renderPlot(27, 385, 506, 160, 58)}
        {renderPlot(28, 555, 506, 160, 58, "Corner Site")}
        {renderPlot(29, 725, 506, 160, 58)}
        {renderPlot(30, 895, 506, 160, 58)}
      </g>

      {/* 12. INTERNAL 24 FT CROSS ROAD B */}
      <g id="cross-road-2">
        <rect x="35" y="576" width="1020" height="34" fill="#E8E5DD" stroke="#1A0709" strokeWidth="1.2" />
        <line x1="35" y1="593" x2="1055" y2="593" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="10 6" />
        <text x="545" y="597" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="10" fontWeight="bold" fill="#4A5568" letterSpacing="1.5">
          24.00 FT (7.20M) RESIDENTIAL LAYOUT ROAD B
        </text>
      </g>

      {/* 13. ROW 6 (PLOTS 31 TO 36) */}
      <g id="row-6">
        {renderPlot(31, 45, 622, 160, 58)}
        {renderPlot(32, 215, 622, 160, 58)}
        {renderPlot(33, 385, 622, 160, 58, "Corner Site")}
        {renderPlot(34, 555, 622, 160, 58)}
        {renderPlot(35, 725, 622, 160, 58)}
        {renderPlot(36, 895, 622, 160, 58)}
      </g>

      {/* 14. ROW 7 (PLOTS 37 TO 42 & GREEN PARK & TANGEDCO) */}
      <g id="row-7">
        {renderPlot(37, 45, 692, 160, 58)}
        {renderPlot(38, 215, 692, 160, 58)}
        {renderPlot(39, 385, 692, 160, 58)}
        {renderPlot(40, 555, 692, 160, 58)}
        {renderPlot(41, 725, 692, 160, 58, "Corner Site")}
        {renderPlot(42, 895, 692, 160, 58, "Corner Site")}
      </g>

      {/* 15. DEDICATED CHILDREN PARK & TANGEDCO YARD (BOTTOM BANNER) */}
      <g id="amenities-strip">
        {/* Children Park */}
        <rect x="45" y="760" width="670" height="42" fill="#E2F0D9" stroke="#38761D" strokeWidth="1.5" rx={4} />
        <text x="380" y="780" textAnchor="middle" fontFamily="sans-serif" fontSize="10.5" fontWeight="bold" fill="#274E13">
          பொது உபயோகம் — DEDICATED CHILDREN PARK &amp; OPEN GREEN SPACE (RESERVE)
        </text>
        <text x="380" y="794" textAnchor="middle" fontFamily="sans-serif" fontSize="8.5" fill="#38761D">
          Gated landscaped garden, children play equipments &amp; rainwater harvesting pits
        </text>

        {/* TANGEDCO Transformer Yard */}
        <rect x="725" y="760" width="330" height="42" fill="#FFF2CC" stroke="#B45F06" strokeWidth="1.5" rx={4} />
        <text x="890" y="780" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="#783F04">
          TANGEDCO TRANSFORMER YARD
        </text>
        <text x="890" y="794" textAnchor="middle" fontFamily="sans-serif" fontSize="8.5" fill="#B45F06">
          Dedicated electricity substation reservation
        </text>
      </g>

      {/* 16. Engineering Blueprint Stamp Notice */}
      <g transform="translate(45, 810)">
        <text x="0" y="10" fontFamily="sans-serif" fontSize="9" fill="#718096" fontWeight="bold">
          * SHASHTIKA BUILDERS &amp; PLOT DEVELOPERS — ALL PLOTS TITLES ARE 100% CLEAR WITH INDIVIDUAL REVENUE PATTA PROVISION
        </text>
      </g>
    </svg>
  );
}
