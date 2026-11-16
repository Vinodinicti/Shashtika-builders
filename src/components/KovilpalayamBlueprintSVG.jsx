import React from 'react';

/**
 * KovilpalayamBlueprintSVG
 * Recreated with exact road network, trapezoidal site geometry,
 * authentic relative plot sizes (Row 2 depth 87' vs Row 3 depth 55'),
 * West 40ft Highway, connecting 7.20m and 9.00m roads, and plot styling
 * matching the official Magizhum Nagar master plan image.
 */
export default function KovilpalayamBlueprintSVG({
  plots,
  selectedPlot,
  selectedFilter,
  onSelectPlot
}) {
  const getPlotObj = (num) => plots.find((p) => p.number === num);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'AVAILABLE':
        return {
          fill: '#1E5E2E', // Rich blueprint green
          hoverFill: '#27783B',
          stroke: '#144220',
          badgeBg: '#FDD835', // Yellow circle badge matching image
          badgeText: '#1A0709',
          textColor: '#FFFFFF',
          subColor: '#FFE082',
          tag: 'AVAILABLE',
          tagBg: '#133E1D',
          tagText: '#A7F3D0'
        };
      case 'PRE-BOOKED':
        return {
          fill: '#D89E38', // Warm sandal/gold
          hoverFill: '#E4AB47',
          stroke: '#9E6D18',
          badgeBg: '#FFF9C4',
          badgeText: '#1A0709',
          textColor: '#1A0709',
          subColor: '#2D1600',
          tag: 'BOOKED',
          tagBg: '#7A5200',
          tagText: '#FFF9C4'
        };
      case 'SOLD':
        return {
          fill: '#B3382C', // Terracotta red
          hoverFill: '#C44336',
          stroke: '#7E2017',
          badgeBg: '#FFCDD2',
          badgeText: '#1A0709',
          textColor: '#FFFFFF',
          subColor: '#FFEBEE',
          tag: 'SOLD',
          tagBg: '#5C140E',
          tagText: '#FFCDD2'
        };
      default:
        return {
          fill: '#2D3748',
          stroke: '#1A202C',
          badgeBg: '#ED8936',
          badgeText: '#FFFFFF',
          textColor: '#FFFFFF',
          subColor: '#CBD5E0',
          tag: 'ACTIVE',
          tagBg: '#1A202C',
          tagText: '#CBD5E0'
        };
    }
  };

  const isDimmed = (status) => {
    if (selectedFilter === 'ALL') return false;
    return status !== selectedFilter;
  };

  // Helper to render an authentic master plan plot matching the flyer image
  const renderPlot = (plotNum, x, y, width, height, customNote = null, edgeLabels = {}) => {
    const plot = getPlotObj(plotNum);
    if (!plot) return null;

    const edges = edgeLabels || {};
    const s = getStatusStyle(plot.status);
    const dimmed = isDimmed(plot.status);
    const isSelected = selectedPlot && selectedPlot.number === plot.number;

    return (
      <g
        key={plotNum}
        onClick={() => onSelectPlot(plot)}
        className="cursor-pointer transition-transform duration-150 group"
        style={{
          opacity: dimmed ? 0.22 : 1,
          transformOrigin: `${x + width / 2}px ${y + height / 2}px`
        }}
      >
        {/* Base Plot Rectangle */}
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={isSelected ? '#FFE082' : s.fill}
          stroke={isSelected ? '#1A0709' : s.stroke}
          strokeWidth={isSelected ? '3.5' : '1.3'}
          rx="2"
          filter={isSelected ? 'url(#selected-glow-kovil)' : 'url(#plot-shadow-kovil)'}
          className="transition-colors duration-150 hover:brightness-110"
        />

        {/* Yellow Circle Number Badge (Identical to flyer image) */}
        <circle
          cx={x + 14}
          cy={y + 14}
          r={9}
          fill={s.badgeBg}
          stroke="#1A0709"
          strokeWidth="0.8"
        />
        <text
          x={x + 14}
          y={y + 17.5}
          textAnchor="middle"
          fill={s.badgeText}
          fontFamily="sans-serif"
          fontSize="9.5"
          fontWeight="900"
        >
          {plotNum}
        </text>

        {/* Plot Sq.Ft Text */}
        <text
          x={x + width / 2 + 5}
          y={y + 17}
          textAnchor="middle"
          fill={isSelected ? '#1A0709' : s.textColor}
          fontFamily="sans-serif"
          fontSize={height > 75 ? '10' : '9'}
          fontWeight="bold"
          letterSpacing="0.2"
        >
          {plot.sqft} SQ.FT
        </text>

        {/* Cent & Dimensions if space permits */}
        {height >= 70 && (
          <text
            x={x + width / 2}
            y={y + height / 2 + (height > 90 ? 4 : 2)}
            textAnchor="middle"
            fill={isSelected ? '#333333' : s.subColor}
            fontFamily="sans-serif"
            fontSize="8"
            fontWeight="bold"
            opacity="0.95"
          >
            {plot.cent} Cents {plot.remSqft > 0 ? `+${plot.remSqft}` : ''}
          </text>
        )}

        {/* Dimension / Facing Tag */}
        {height >= 95 && plot.dim && (
          <text
            x={x + width / 2}
            y={y + height / 2 + 16}
            textAnchor="middle"
            fill={isSelected ? '#555555' : s.subColor}
            fontFamily="sans-serif"
            fontSize="7.5"
            opacity="0.85"
          >
            {plot.dim}
          </text>
        )}

        {/* Status Pill Badge at Bottom of Plot (like image) */}
        {height >= 55 && (
          <g transform={`translate(${x + width / 2 - 28}, ${y + height - 15})`}>
            <rect
              x="0"
              y="0"
              width="56"
              height="12"
              rx="2.5"
              fill={s.tagBg}
              stroke={s.stroke}
              strokeWidth="0.6"
            />
            <text
              x="28"
              y="9"
              textAnchor="middle"
              fill={s.tagText}
              fontFamily="sans-serif"
              fontSize="6.5"
              fontWeight="bold"
              letterSpacing="0.4"
            >
              {s.tag}
            </text>
          </g>
        )}

        {/* Optional Corner Tag */}
        {customNote && (
          <text
            x={x + width / 2}
            y={y + 27}
            textAnchor="middle"
            fill="#FFE082"
            fontFamily="sans-serif"
            fontSize="7"
            fontWeight="bold"
          >
            {customNote}
          </text>
        )}

        {/* Edge dimension markings in red */}
        {edges.top && (
          <text x={x + width / 2} y={y - 2.5} fill="#D32F2F" fontFamily="monospace" fontSize="6.5" fontWeight="bold" textAnchor="middle">
            {edges.top}
          </text>
        )}
        {edges.bottom && (
          <text x={x + width / 2} y={y + height + 7} fill="#D32F2F" fontFamily="monospace" fontSize="6.5" fontWeight="bold" textAnchor="middle">
            {edges.bottom}
          </text>
        )}
        {edges.left && (
          <text x={x - 2.5} y={y + height / 2} fill="#D32F2F" fontFamily="monospace" fontSize="6.5" fontWeight="bold" textAnchor="middle" transform={`rotate(-90, ${x - 2.5}, ${y + height / 2})`}>
            {edges.left}
          </text>
        )}
        {edges.right && (
          <text x={x + width + 3} y={y + height / 2} fill="#D32F2F" fontFamily="monospace" fontSize="6.5" fontWeight="bold" textAnchor="middle" transform={`rotate(90, ${x + width + 3}, ${y + height / 2})`}>
            {edges.right}
          </text>
        )}
      </g>
    );
  };

  return (
    <svg
      id="kovilpalayam-blueprint-svg"
      viewBox="0 0 1200 860"
      className="w-full max-w-[1140px] h-auto select-none block"
      style={{ filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.08))' }}
    >
      <defs>
        <filter id="plot-shadow-kovil" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.18" />
        </filter>
        <filter id="selected-glow-kovil" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#FFE082" floodOpacity="1" />
        </filter>
      </defs>

      {/* 1. Base Blueprint Drawing Canvas */}
      <rect x="0" y="0" width="1200" height="860" fill="#FCFAF5" />

      {/* Engineering Outer Double Borders */}
      <rect x="12" y="12" width="1176" height="836" fill="none" stroke="#1A0709" strokeWidth="2.5" />
      <rect x="18" y="18" width="1164" height="824" fill="none" stroke="#1A0709" strokeWidth="1" />

      {/* 2. Top Header Title (Replicating exact layout flyer) */}
      <text x="35" y="44" fontFamily="sans-serif" fontSize="13.5" fontWeight="900" fill="#1A0709" letterSpacing="0.4">
        LAYOUT PLAN SHOWING THE HOUSE SITES IN KOVILPALAYAM COIMBATORE
      </text>
      <text x="35" y="63" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#543D2B" letterSpacing="0.2">
        மகிழம் நகர் — உங்கள் கனவு மனையை மகிழும் நகரில் இன்றே வாங்குங்கள் (பொள்ளாச்சி மெயின் ரோடு)
      </text>

      {/* 3. North Arrow Compass (top-right) */}
      <g transform="translate(1105, 42)">
        <circle cx="20" cy="20" r="16" fill="none" stroke="#1A0709" strokeWidth="1.2" />
        <polygon points="20,4 24,20 20,16 16,20" fill="#1A0709" />
        <polygon points="20,36 24,20 20,24 16,20" fill="#888888" />
        <polygon points="4,20 20,24 16,20 20,16" fill="#CCCCCC" />
        <polygon points="36,20 20,24 24,20 20,16" fill="#CCCCCC" />
        <text x="20" y="-3" textAnchor="middle" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#1A0709">N</text>
      </g>

      {/* 4. Decorative Trees on Boundary Margins (matching flyer) */}
      <g opacity="0.85">
        {/* Top Boundary Trees */}
        <circle cx="260" cy="115" r="14" fill="#2E7D32" />
        <circle cx="255" cy="112" r="10" fill="#43A047" />
        <circle cx="390" cy="115" r="14" fill="#2E7D32" />
        <circle cx="385" cy="112" r="10" fill="#43A047" />
        <circle cx="950" cy="115" r="14" fill="#2E7D32" />
        <circle cx="945" cy="112" r="10" fill="#43A047" />

        {/* Bottom Boundary Trees */}
        <circle cx="220" cy="710" r="14" fill="#2E7D32" />
        <circle cx="215" cy="707" r="10" fill="#43A047" />
        <circle cx="350" cy="710" r="14" fill="#2E7D32" />
        <circle cx="345" cy="707" r="10" fill="#43A047" />
        <circle cx="500" cy="710" r="14" fill="#2E7D32" />
        <circle cx="495" cy="707" r="10" fill="#43A047" />
        <circle cx="920" cy="710" r="14" fill="#2E7D32" />
        <circle cx="915" cy="707" r="10" fill="#43A047" />

        {/* East Boundary Trees */}
        <circle cx="1065" cy="350" r="14" fill="#2E7D32" />
        <circle cx="1060" cy="347" r="10" fill="#43A047" />
        <circle cx="1065" cy="520" r="14" fill="#2E7D32" />
        <circle cx="1060" cy="517" r="10" fill="#43A047" />
      </g>

      {/* 5. West 40'-0" Pollachi Main Road (Dual Carriageway Highway with Trees) */}
      <polygon
        points="24,105 82,105 82,750 24,750"
        fill="#3A3A3A"
        stroke="#1A0709"
        strokeWidth="1.6"
      />
      {/* White Road Borders & Center dashed line */}
      <line x1="28" y1="105" x2="28" y2="750" stroke="#FFFFFF" strokeWidth="1.5" />
      <line x1="53" y1="105" x2="53" y2="750" stroke="#FFFFFF" strokeWidth="1.8" strokeDasharray="10 6" />
      <line x1="78" y1="105" x2="78" y2="750" stroke="#FFFFFF" strokeWidth="1.5" />
      {/* Highway Label */}
      <text
        x="53"
        y="420"
        textAnchor="middle"
        transform="rotate(-90, 53, 420)"
        fontSize="9.5"
        fontWeight="bold"
        fill="#FFFFFF"
        fontFamily="sans-serif"
        letterSpacing="0.8"
      >
        POLLACHI ROAD (Tar Carriageway) — 40'-0" WIDE
      </text>
      <text
        x="53"
        y="140"
        textAnchor="middle"
        transform="rotate(-90, 53, 140)"
        fontSize="9.5"
        fontWeight="bold"
        fill="#FFE082"
        fontFamily="sans-serif"
      >
        ▲ TO COIMBATORE
      </text>
      <text
        x="53"
        y="720"
        textAnchor="middle"
        transform="rotate(-90, 53, 720)"
        fontSize="9.5"
        fontWeight="bold"
        fill="#FFE082"
        fontFamily="sans-serif"
      >
        ▼ TO POLLACHI
      </text>

      {/* West Boundary Dimension (Red) */}
      <text
        x="96"
        y="420"
        textAnchor="middle"
        transform="rotate(-90, 96, 420)"
        fontSize="10"
        fontWeight="bold"
        fill="#D32F2F"
        fontFamily="monospace"
      >
        307'-9" [93.80]
      </text>

      {/* 6. INTERNAL ROAD NETWORK */}

      {/* West Connecting Road (7.20m Wide connecting top road to entrance road) */}
      <polygon
        points="108,266 142,266 142,516 108,516"
        fill="#4A4A4A"
        stroke="#1A0709"
        strokeWidth="1.2"
      />
      <line x1="125" y1="266" x2="125" y2="516" stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="7 4" />
      <text
        x="125"
        y="390"
        textAnchor="middle"
        transform="rotate(-90, 125, 390)"
        fontSize="7.5"
        fontWeight="bold"
        fill="#FFFFFF"
        fontFamily="sans-serif"
      >
        7.20m Wide Road
      </text>

      {/* Upper 7.20m Wide Layout Road (Horizontal) */}
      <rect
        x="108"
        y="266"
        width="928"
        height="34"
        fill="#4A4A4A"
        stroke="#1A0709"
        strokeWidth="1.2"
      />
      <line x1="108" y1="283" x2="1036" y2="283" stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="8 5" />
      <text
        x="570"
        y="287"
        textAnchor="middle"
        fontSize="9"
        fontWeight="bold"
        fill="#FFFFFF"
        fontFamily="sans-serif"
        letterSpacing="0.6"
      >
        7.20m WIDE TOP LAYOUT ROAD
      </text>

      {/* Lower 9.00m Wide Entrance Layout Road (Grand Entrance Boulevard from Pollachi Highway) */}
      <rect
        x="82"
        y="476"
        width="954"
        height="40"
        fill="#3A3A3A"
        stroke="#1A0709"
        strokeWidth="1.4"
      />
      <line x1="82" y1="496" x2="1036" y2="496" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="9 5" />
      <text
        x="570"
        y="500"
        textAnchor="middle"
        fontSize="9.5"
        fontWeight="bold"
        fill="#FFFFFF"
        fontFamily="sans-serif"
        letterSpacing="0.8"
      >
        9.00m WIDE LAYOUT ROAD (ENTRANCE BOULEVARD)
      </text>

      {/* Grand Entrance Arch Pillars on Pollachi Road */}
      <rect x="78" y="473" width="6" height="46" fill="#C6A15B" stroke="#1A0709" strokeWidth="1" />
      <text x="88" y="470" fontSize="7" fontWeight="bold" fill="#C6A15B" fontFamily="sans-serif">ENTRANCE ARCH</text>

      {/* 7. Public Purpose Park Reserve (Bottom-Left Corner next to Highway) */}
      <rect
        x="142"
        y="520"
        width="54"
        height="136"
        fill="#C8E6C9"
        stroke="#2E7D32"
        strokeWidth="1.5"
        rx="2"
      />
      <circle cx="169" cy="542" r="13" fill="#2E7D32" opacity="0.9" />
      <circle cx="165" cy="539" r="8" fill="#66BB6A" />
      <circle cx="169" cy="628" r="13" fill="#2E7D32" opacity="0.9" />
      <circle cx="165" cy="625" r="8" fill="#66BB6A" />
      <text x="169" y="574" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#1B5E20" fontFamily="sans-serif">பொது</text>
      <text x="169" y="586" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#1B5E20" fontFamily="sans-serif">உபயோகம்</text>
      <text x="169" y="598" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#2E7D32" fontFamily="sans-serif">PARK</text>

      {/* 8. ROW 1 (TOP ROW): PLOTS 32 DOWN TO 26 (Facing South to 7.20m Road) */}
      {/* Plot 32: Large Corner Site (3359 sq.ft, 7.71 Cent) */}
      {renderPlot(32, 142, 150, 150, 114, 'Corner Site', { left: "114'", top: "40'-0\"" })}
      {renderPlot(31, 294, 150, 106, 114, null, { top: "31'-2\"" })}
      {renderPlot(30, 402, 150, 106, 114, null, { top: "31'-2\"" })}
      {renderPlot(29, 510, 150, 106, 114, null, { top: "31'-2\"" })}
      {renderPlot(28, 618, 150, 106, 114, null, { top: "31'-2\"" })}
      {renderPlot(27, 726, 150, 106, 114, null, { top: "31'-2\"" })}
      {renderPlot(26, 834, 150, 106, 114, 'Corner Site', { right: "114'", top: "32'-0\"" })}

      {/* 9. ROW 2 (UPPER MIDDLE): PLOTS 19 TO 25 (Facing North to 7.20m Road) */}
      {/* Deeper Plots (87' depth) matching flyer proportion */}
      {/* Plot 19: HUGE NW Highway Corner (3895 sq.ft, 8.94 Cents - Largest in Layout) */}
      {renderPlot(19, 144, 302, 155, 92, 'NW Highway Corner', { left: "92'", top: "40'-0\"" })}
      {renderPlot(20, 301, 302, 112, 92, null, { top: "33'-0\"" })}
      {renderPlot(21, 415, 302, 112, 92, null, { top: "33'-0\"" })}
      {renderPlot(22, 529, 302, 112, 92, null, { top: "33'-0\"" })}
      {renderPlot(23, 643, 302, 112, 92, null, { top: "33'-0\"" })}
      {renderPlot(24, 757, 302, 112, 92, null, { top: "33'-0\"" })}
      {renderPlot(25, 871, 302, 112, 92, 'Corner Site', { right: "92'", top: "33'-6\"" })}

      {/* 10. ROW 3 (LOWER MIDDLE): PLOTS 18 DOWN TO 10 (Facing South to 9.00m Road) */}
      {/* Shorter Plots (55' depth) back-to-back with Row 2 */}
      {renderPlot(18, 144, 396, 140, 78, 'SW Corner', { left: "78'", bottom: "40'-0\"" })}
      {renderPlot(17, 286, 396, 82, 78, null, { bottom: "31'-0\"" })}
      {renderPlot(16, 370, 396, 82, 78, null, { bottom: "31'-0\"" })}
      {renderPlot(15, 454, 396, 82, 78, null, { bottom: "31'-0\"" })}
      {renderPlot(14, 538, 396, 82, 78, null, { bottom: "31'-0\"" })}
      {renderPlot(13, 622, 396, 82, 78, null, { bottom: "31'-0\"" })}
      {renderPlot(12, 706, 396, 82, 78, null, { bottom: "31'-0\"" })}
      {renderPlot(11, 790, 396, 82, 78, null, { bottom: "31'-0\"" })}
      {renderPlot(10, 874, 396, 76, 78, 'Corner Site', { right: "78'", bottom: "30'-0\"" })}

      {/* 11. ROW 4 (BOTTOM ROW): PLOTS 01 TO 09 (Facing North to 9.00m Road) */}
      {/* Plot 01: Highway Corner (2862 sq.ft, 6.57 Cents) */}
      {renderPlot(1, 198, 520, 112, 136, 'Highway Corner', { top: "35'-0\"", bottom: "35'-0\"" })}
      {renderPlot(2, 312, 520, 98, 136, null, { top: "31'-0\"", bottom: "31'-0\"" })}

      {/* Internal Cul-de-sac / Stacked Plots 03 (Upper) & 04 (Lower) */}
      {renderPlot(3, 412, 520, 96, 66, 'NE Facing', { top: "30'-0\"" })}
      {renderPlot(4, 412, 590, 96, 66, 'East Facing', { bottom: "30'-0\"" })}

      {renderPlot(5, 510, 520, 96, 136, null, { top: "31'-0\"", bottom: "31'-0\"" })}
      {renderPlot(6, 608, 520, 96, 136, null, { top: "31'-0\"", bottom: "31'-0\"" })}
      {renderPlot(7, 706, 520, 96, 136, null, { top: "31'-0\"", bottom: "31'-0\"" })}
      {renderPlot(8, 804, 520, 96, 136, null, { top: "31'-0\"", bottom: "31'-0\"" })}
      {renderPlot(9, 902, 520, 98, 136, 'Corner Site', { right: "136'", top: "31'-0\"", bottom: "31'-0\"" })}

      {/* 12. Boundary Dimensions (Exact red numbers from blueprint) */}
      <g fill="#D32F2F" fontFamily="monospace" fontWeight="bold">
        {/* North Boundary */}
        <text x="560" y="140" fontSize="11.5" textAnchor="middle">
          267'-1" [81.40]
        </text>

        {/* East Boundary */}
        <text
          x="1055"
          y="420"
          fontSize="11.5"
          textAnchor="middle"
          transform="rotate(90, 1055, 420)"
        >
          296'-4" [90.32]
        </text>

        {/* South Boundary */}
        <text x="560" y="675" fontSize="11.5" textAnchor="middle">
          364'-11" [111.22]
        </text>
      </g>

      {/* 13. Official DTCP Stamp Box at Bottom */}
      <g transform="translate(435, 715)">
        <rect
          x="0"
          y="0"
          width="330"
          height="46"
          rx="8"
          fill="#FFFDF8"
          stroke="#D32F2F"
          strokeWidth="2.4"
        />
        <rect
          x="4"
          y="4"
          width="322"
          height="38"
          rx="6"
          fill="none"
          stroke="#D32F2F"
          strokeWidth="1"
          strokeDasharray="5 3"
        />
        <text
          x="165"
          y="23"
          fill="#D32F2F"
          fontFamily="sans-serif"
          fontSize="11.5"
          fontWeight="bold"
          textAnchor="middle"
          letterSpacing="0.8"
        >
          DTCP APPROVED RESIDENTIAL SITES
        </text>
        <text
          x="165"
          y="37"
          fill="#852718"
          fontFamily="sans-serif"
          fontSize="9.5"
          fontWeight="bold"
          textAnchor="middle"
          letterSpacing="0.5"
        >
          ம.வ / கோ.உ.தி.மு. — கோவில்பாளையம் (32 மனைகள் மட்டும்)
        </text>
      </g>

      {/* 14. Amenities Bar at the very bottom */}
      <g transform="translate(108, 775)">
        <text
          x="0"
          y="10"
          fontFamily="sans-serif"
          fontSize="9"
          fill="#543D2B"
          fontWeight="bold"
        >
          வசதிகள்: சோலார் மின் விளக்கு • 40 அடி பிரதான சாலை • Gated கம்யூனிட்டி • ஏராளமான சுவை நிலத்தடி நீர் • 10 நிமிட பயணம்
        </text>
        <text
          x="890"
          y="10"
          textAnchor="end"
          fontFamily="sans-serif"
          fontSize="8.5"
          fill="#888888"
          fontWeight="bold"
        >
          SHASHTIKA BUILDERS — 100% CLEAR TITLE WITH INDIVIDUAL REVENUE PATTA
        </text>
      </g>
    </svg>
  );
}
