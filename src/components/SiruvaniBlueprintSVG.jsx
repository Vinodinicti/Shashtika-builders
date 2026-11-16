import React from 'react';

/**
 * SiruvaniBlueprintSVG
 * Recreated with exact road network, central 30-ft asphalt road,
 * East angled approach road from Siruvani Main Road, vertical dividing lanes,
 * water tank reservation, Commercial Spaces (89/1A2A, 89/1A3A1, 89/1A3B),
 * exact plot dimensions & status banners matching Sakthivel's Avenue master plan flyer.
 */
export default function SiruvaniBlueprintSVG({
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
          fill: '#246B34', // Rich grass green matching flyer
          hoverFill: '#2E803F',
          stroke: '#164A22',
          badgeBg: '#FDD835', // Yellow circle badge
          badgeText: '#1A0709',
          textColor: '#FFFFFF',
          subColor: '#FFE082',
          tag: 'AVAILABLE',
          tagBg: '#133E1D',
          tagText: '#A7F3D0'
        };
      case 'PRE-BOOKED':
        return {
          fill: '#D89E38', // Warm sandal/amber
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
          fill: '#B3382C', // Terracotta coral red matching flyer
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

  // Helper to render plot matching image flyer
  const renderPlot = (plotNum, x, y, width, height, watermark = null, edgeLabels = {}) => {
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
        {/* Base Rectangle */}
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={isSelected ? '#FFE082' : s.fill}
          stroke={isSelected ? '#1A0709' : s.stroke}
          strokeWidth={isSelected ? '3.5' : '1.2'}
          rx="2"
          filter={isSelected ? 'url(#selected-glow-siru)' : 'url(#plot-shadow-siru)'}
          className="transition-colors duration-150 hover:brightness-110"
        />

        {/* Yellow Circle Number Badge (matching image) */}
        <circle
          cx={x + (width > 55 ? 13 : width / 2)}
          cy={y + 13}
          r={width > 55 ? 8 : 7.5}
          fill={s.badgeBg}
          stroke="#1A0709"
          strokeWidth="0.8"
        />
        <text
          x={x + (width > 55 ? 13 : width / 2)}
          y={y + 16.5}
          textAnchor="middle"
          fill={s.badgeText}
          fontFamily="sans-serif"
          fontSize={width > 55 ? '8.5' : '8'}
          fontWeight="900"
        >
          {plotNum}
        </text>

        {/* Plot Sq.Ft Text */}
        {width > 55 ? (
          <text
            x={x + width / 2 + 6}
            y={y + 16}
            textAnchor="middle"
            fill={isSelected ? '#1A0709' : s.textColor}
            fontFamily="sans-serif"
            fontSize="9"
            fontWeight="bold"
          >
            {plot.sqft} SQ.FT
          </text>
        ) : (
          <text
            x={x + width / 2}
            y={y + 27}
            textAnchor="middle"
            fill={isSelected ? '#1A0709' : s.textColor}
            fontFamily="sans-serif"
            fontSize="7.5"
            fontWeight="bold"
          >
            {plot.sqft}
          </text>
        )}

        {/* Cent Label if height permits */}
        {height >= 60 && (
          <text
            x={x + width / 2}
            y={y + height / 2 + (width > 55 ? 4 : 8)}
            textAnchor="middle"
            fill={isSelected ? '#333333' : s.subColor}
            fontFamily="sans-serif"
            fontSize="7.5"
            fontWeight="bold"
          >
            {plot.cent}c {plot.remSqft > 0 ? `+${plot.remSqft}` : ''}
          </text>
        )}

        {/* Watermark (e.g. SOLD or BOOKED) */}
        {watermark && (
          <text
            x={x + width / 2}
            y={y + height - 8}
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="sans-serif"
            fontSize="8"
            fontWeight="900"
            letterSpacing="0.8"
          >
            {watermark}
          </text>
        )}

        {/* Edge Labels */}
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
      id="siruvani-blueprint-svg"
      viewBox="0 0 1200 860"
      className="w-full max-w-[1140px] h-auto select-none block"
      style={{ filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.08))' }}
    >
      <defs>
        <filter id="plot-shadow-siru" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.18" />
        </filter>
        <filter id="selected-glow-siru" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#FFE082" floodOpacity="1" />
        </filter>
      </defs>

      {/* 1. Base Blueprint Paper Canvas */}
      <rect x="0" y="0" width="1200" height="860" fill="#FCFAF5" />

      {/* Engineering Drawing Outer Borders */}
      <rect x="12" y="12" width="1176" height="836" fill="none" stroke="#1A0709" strokeWidth="2.5" />
      <rect x="18" y="18" width="1164" height="824" fill="none" stroke="#1A0709" strokeWidth="1" />

      {/* 2. Top Header Title */}
      <text x="35" y="44" fontFamily="sans-serif" fontSize="13.5" fontWeight="900" fill="#1A0709" letterSpacing="0.4">
        SAKTHIVEL'S AVENUE — SITE LAYOUT PLAN / தள வரைபடம்
      </text>
      <text x="35" y="63" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#543D2B" letterSpacing="0.2">
        சக்திவேல்ஸ் அவென்யூ — சிறுவாணி மெயின் ரோடு • DTCP 261/2025 • S.F. 89/1A2A, 89/1A3A1 &amp; 89/1A3B
      </text>

      {/* 3. North Arrow Compass (matching bottom-right orientation in flyer) */}
      <g transform="translate(1085, 715)">
        <circle cx="20" cy="20" r="18" fill="none" stroke="#1A0709" strokeWidth="1.2" />
        <polygon points="20,4 25,20 20,16 15,20" fill="#1A0709" />
        <polygon points="20,36 25,20 20,24 15,20" fill="#888888" />
        <polygon points="4,20 20,24 16,20 20,16" fill="#CCCCCC" />
        <polygon points="36,20 20,24 24,20 20,16" fill="#CCCCCC" />
        <text x="38" y="24" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#1A0709">N</text>
      </g>

      {/* 4. Decorative Trees along Perimeter Margins (matching flyer) */}
      <g opacity="0.85">
        <circle cx="200" cy="115" r="14" fill="#2E7D32" />
        <circle cx="195" cy="112" r="10" fill="#43A047" />
        <circle cx="340" cy="115" r="14" fill="#2E7D32" />
        <circle cx="335" cy="112" r="10" fill="#43A047" />
        <circle cx="780" cy="115" r="14" fill="#2E7D32" />
        <circle cx="775" cy="112" r="10" fill="#43A047" />

        <circle cx="160" cy="710" r="14" fill="#2E7D32" />
        <circle cx="155" cy="707" r="10" fill="#43A047" />
        <circle cx="420" cy="710" r="14" fill="#2E7D32" />
        <circle cx="415" cy="707" r="10" fill="#43A047" />
        <circle cx="680" cy="710" r="14" fill="#2E7D32" />
        <circle cx="675" cy="707" r="10" fill="#43A047" />
      </g>

      {/* 5. EAST MAIN HIGHWAY / RIVER APPROACH ROAD */}
      {/* Angled road corridor from East */}
      <polygon
        points="965,105 1015,105 1095,745 1045,745"
        fill="#262626"
        stroke="#1A0709"
        strokeWidth="1.6"
      />
      {/* Blue Canal/Water Wavy Lines at Top & Bottom */}
      <path
        d="M 945,105 Q 965,115 985,105 T 1025,105"
        fill="none"
        stroke="#0288D1"
        strokeWidth="3.5"
      />
      <path
        d="M 1025,745 Q 1045,755 1065,745 T 1105,745"
        fill="none"
        stroke="#0288D1"
        strokeWidth="3.5"
      />
      <line x1="990" y1="105" x2="1070" y2="745" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="10 6" />
      <text
        x="1045"
        y="430"
        textAnchor="middle"
        transform="rotate(82, 1045, 430)"
        fontSize="10"
        fontWeight="bold"
        fill="#FFFFFF"
        fontFamily="sans-serif"
        letterSpacing="0.8"
      >
        SIRUVANI MAIN ROAD ACCESS (30'-0" WIDE ROAD)
      </text>

      {/* 6. CENTRAL 30.00 FT WIDE ASPHALT ROAD */}
      <rect
        x="42"
        y="315"
        width="930"
        height="46"
        fill="#262626"
        stroke="#1A0709"
        strokeWidth="1.4"
      />
      <line
        x1="42"
        y1="338"
        x2="972"
        y2="338"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeDasharray="10 6"
      />
      <text
        x="490"
        y="342"
        textAnchor="middle"
        fontSize="9.5"
        fontWeight="bold"
        fill="#FFFFFF"
        fontFamily="sans-serif"
        letterSpacing="0.8"
      >
        30.00 FT CENTRAL ASPHALT BOULEVARD ROAD
      </text>

      {/* Vertical Cross Road dividing lanes between bottom plot blocks (matching flyer) */}
      <rect x="238" y="361" width="26" height="295" fill="#262626" stroke="#1A0709" strokeWidth="1" />
      <rect x="444" y="361" width="26" height="295" fill="#262626" stroke="#1A0709" strokeWidth="1" />
      <rect x="646" y="361" width="26" height="295" fill="#262626" stroke="#1A0709" strokeWidth="1" />
      <rect x="852" y="361" width="26" height="295" fill="#262626" stroke="#1A0709" strokeWidth="1" />

      {/* 7. TOP ROW PLOTS (Facing South to 30' Road) */}
      {/* Block 1 (West): Plots 1 to 8 & 9-10 */}
      {renderPlot(1, 42, 160, 48, 150, 'SOLD', { top: "32'-3\"" })}
      {renderPlot(2, 92, 160, 42, 150, 'SOLD', { top: "28'" })}
      {renderPlot(3, 136, 160, 42, 150, 'SOLD', { top: "28'" })}
      {renderPlot(4, 180, 160, 42, 150, 'SOLD', { top: "28'" })}

      {/* Overarching SOLD Banner across Plots 1-4 */}
      <rect x="52" y="210" width="160" height="26" rx="4" fill="#B3382C" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.95" />
      <text x="132" y="228" textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif" fontSize="13" fontWeight="900" letterSpacing="2">
        SOLD
      </text>

      {renderPlot(5, 224, 160, 44, 150, null, { top: "28'" })}
      {renderPlot(6, 270, 160, 44, 150, null, { top: "28'" })}
      {renderPlot(7, 316, 160, 46, 150, null, { top: "29'-6\"" })}
      {renderPlot(8, 364, 160, 48, 150, null, { top: "30'" })}
      {renderPlot(9, 414, 160, 44, 150, null, { top: "30'" })}
      {renderPlot(10, 460, 160, 44, 150, null, { top: "30'" })}

      {/* Overarching BOOKED Banner across Plots 8-10 */}
      <rect x="368" y="210" width="132" height="26" rx="4" fill="#D89E38" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.95" />
      <text x="434" y="228" textAnchor="middle" fill="#1A0709" fontFamily="sans-serif" fontSize="12" fontWeight="900" letterSpacing="1.5">
        BOOKED
      </text>

      {/* Block 2: Plots 28 to 36 */}
      {renderPlot(28, 510, 160, 42, 150, null, { top: "28'" })}
      {renderPlot(29, 554, 160, 42, 150, null, { top: "28'" })}
      {renderPlot(30, 598, 160, 42, 150, null, { top: "28'" })}
      {renderPlot(31, 642, 160, 44, 150, null, { top: "29'-6\"" })}
      {renderPlot(32, 688, 160, 42, 150, null, { top: "28'" })}
      {renderPlot(33, 732, 160, 42, 150, null, { top: "28'" })}
      {renderPlot(34, 776, 160, 42, 150, null, { top: "28'" })}
      {renderPlot(35, 820, 160, 44, 150, null, { top: "28'" })}
      {renderPlot(36, 866, 160, 48, 150, 'SOLD', { top: "31'" })}

      {/* East Commercial Space Reserve (Top) */}
      <rect x="918" y="160" width="54" height="150" fill="#E8EAF6" stroke="#3949AB" strokeWidth="1.5" rx="2" />
      <text x="945" y="225" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#1A237E" fontFamily="sans-serif">வணிக</text>
      <text x="945" y="238" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#1A237E" fontFamily="sans-serif">பயன்பாடு</text>
      <text x="945" y="250" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#3949AB" fontFamily="sans-serif">COMMERCIAL</text>
      <text x="945" y="262" textAnchor="middle" fontSize="6" fill="#3949AB" fontFamily="monospace">89/1A2A</text>
      <text x="945" y="274" textAnchor="middle" fontSize="6.5" fill="#D32F2F" fontFamily="monospace">17.1 x 31.6</text>

      {/* 8. BOTTOM BLOCKS (Below 30' Road) */}

      {/* Block 1 (West): Plots 47, 46, 45 facing West road */}
      {renderPlot(47, 42, 366, 52, 90, 'SOLD', { left: "24.6'" })}
      {renderPlot(46, 42, 460, 52, 92, null, { left: "24.6'" })}
      {renderPlot(45, 42, 556, 52, 96, null, { left: "24.6'" })}

      {/* Plots 44, 43, Water Tank, 42, 41, 40 */}
      {renderPlot(44, 98, 366, 64, 90, null, { top: "35'" })}
      {renderPlot(43, 98, 460, 64, 92, null, { top: "35'" })}

      {/* Water Tank Reservation (matching flyer) */}
      <rect x="98" y="556" width="64" height="96" fill="#B2EBF2" stroke="#00838F" strokeWidth="1.5" rx="2" />
      <circle cx="130" cy="595" r="14" fill="#00ACC1" opacity="0.8" />
      <text x="130" y="622" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#006064" fontFamily="sans-serif">Water Tank</text>
      <text x="130" y="634" textAnchor="middle" fontSize="6" fill="#006064" fontFamily="monospace">3.2 x 3.4</text>

      {renderPlot(42, 166, 366, 68, 90, null, { top: "45'" })}
      {renderPlot(41, 166, 460, 68, 92, null, { top: "45'" })}
      {renderPlot(40, 166, 556, 68, 96, null, { bottom: "50'" })}

      {/* Block 2: Plots 37, 38, 39, 36, 35, 34 */}
      {renderPlot(37, 268, 366, 56, 90, null, { top: "35'" })}
      {renderPlot(38, 268, 460, 56, 92, null, null)}
      {renderPlot(39, 268, 556, 56, 96, null, { bottom: "40'" })}

      {renderPlot(36, 328, 366, 56, 90, 'SOLD', { top: "45'" })}
      {renderPlot(35, 328, 460, 56, 92, null, null)}
      {renderPlot(34, 328, 556, 56, 96, null, { bottom: "50'" })}

      {/* Plots 27, 26, 25, 24, 23, 22 (Large BOOKED Group matching flyer) */}
      {renderPlot(27, 388, 366, 52, 90, null, { top: "35'" })}
      {renderPlot(26, 388, 460, 52, 92, null, null)}
      {renderPlot(25, 388, 556, 52, 96, null, { bottom: "40'" })}

      {renderPlot(24, 474, 366, 54, 90, null, { top: "45'" })}
      {renderPlot(23, 474, 460, 54, 92, null, null)}
      {renderPlot(22, 474, 556, 54, 96, null, { bottom: "50'" })}

      {/* Overarching BOOKED Banner across Block 3 */}
      <rect x="395" y="440" width="124" height="26" rx="4" fill="#D89E38" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.95" />
      <text x="457" y="458" textAnchor="middle" fill="#1A0709" fontFamily="sans-serif" fontSize="12" fontWeight="900" letterSpacing="1.5">
        BOOKED
      </text>

      {/* Block 4: Plots 17, 18, 19, 16, 15, 14, 13 */}
      {renderPlot(17, 532, 366, 54, 90, 'SOLD', { top: "35'" })}
      {renderPlot(18, 532, 460, 54, 92, null, null)}
      {renderPlot(19, 532, 556, 54, 96, null, { bottom: "40'" })}

      {renderPlot(16, 590, 366, 52, 90, 'SOLD', { top: "45'" })}
      {renderPlot(15, 590, 460, 52, 92, null, null)}
      {renderPlot(14, 590, 556, 52, 96, null, { bottom: "50'" })}

      {/* Overarching SOLD Banners on Plot 17 & 16 */}
      <rect x="536" y="398" width="46" height="18" rx="2" fill="#B3382C" stroke="#FFFFFF" strokeWidth="1" />
      <text x="559" y="411" textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif" fontSize="8.5" fontWeight="900">SOLD</text>
      <rect x="593" y="398" width="46" height="18" rx="2" fill="#B3382C" stroke="#FFFFFF" strokeWidth="1" />
      <text x="616" y="411" textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif" fontSize="8.5" fontWeight="900">SOLD</text>

      {/* Plots 13, 12, 11, 10, 9 */}
      {renderPlot(13, 676, 366, 54, 90, null, { top: "45'" })}
      {renderPlot(12, 676, 460, 54, 92, null, null)}
      {renderPlot(11, 676, 556, 54, 96, null, { bottom: "50'" })}

      {renderPlot(10, 734, 366, 54, 90, null, { top: "32'-9\"" })}
      {renderPlot(9, 734, 460, 54, 92, null, null)}

      {/* Cluster 5: East Commercial Spaces */}
      <rect x="792" y="366" width="56" height="135" fill="#E8EAF6" stroke="#3949AB" strokeWidth="1.5" rx="2" />
      <text x="820" y="425" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#1A237E" fontFamily="sans-serif">வணிக</text>
      <text x="820" y="438" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#1A237E" fontFamily="sans-serif">ஒதுக்கீடு</text>
      <text x="820" y="450" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#3949AB" fontFamily="sans-serif">COMMERCIAL</text>
      <text x="820" y="462" textAnchor="middle" fontSize="6" fill="#3949AB" fontFamily="monospace">89/1A3A1</text>
      <text x="820" y="474" textAnchor="middle" fontSize="6.5" fill="#D32F2F" fontFamily="monospace">21.6</text>

      <rect x="792" y="505" width="56" height="147" fill="#E8EAF6" stroke="#3949AB" strokeWidth="1.5" rx="2" />
      <text x="820" y="570" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#1A237E" fontFamily="sans-serif">வணிக</text>
      <text x="820" y="583" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#1A237E" fontFamily="sans-serif">ஒதுக்கீடு</text>
      <text x="820" y="595" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#3949AB" fontFamily="sans-serif">COMMERCIAL</text>
      <text x="820" y="607" textAnchor="middle" fontSize="6" fill="#3949AB" fontFamily="monospace">89/1A3B</text>

      {/* 9. RED BOUNDARY SURVEY DIMENSIONS (Exact from flyer) */}
      <g fill="#D32F2F" fontFamily="monospace" fontWeight="bold" fontSize="11">
        <text x="230" y="145" textAnchor="middle">64.6</text>
        <text x="690" y="145" textAnchor="middle">94.3</text>
        <text x="160" y="675" textAnchor="middle">58.4</text>
        <text x="620" y="675" textAnchor="middle">114.5</text>
        <text x="32" y="240" textAnchor="middle" transform="rotate(-90, 32, 240)">28.2</text>
        <text x="32" y="490" textAnchor="middle" transform="rotate(-90, 32, 490)">24.6</text>
      </g>

      {/* 10. Official DTCP Approval Stamp Box at Bottom */}
      <g transform="translate(425, 715)">
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
          DTCP APPROVAL NO: 261/2025
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
          சக்திவேல்ஸ் அவென்யூ — சிறுவாணி மெயின் ரோடு (47 மனைகள்)
        </text>
      </g>

      {/* 11. Amenities Bar */}
      <g transform="translate(42, 775)">
        <text
          x="0"
          y="10"
          fontFamily="sans-serif"
          fontSize="9"
          fill="#543D2B"
          fontWeight="bold"
        >
          வசதிகள்: 30 அடி தார் சாலை • வணிக இட ஒதுக்கீடு • மேல்நிலை நீர்த்தேக்கத் தொட்டி • 100% தூய நிலத்தடி நீர் • DTCP 261/2025
        </text>
        <text
          x="940"
          y="10"
          textAnchor="end"
          fontFamily="sans-serif"
          fontSize="8.5"
          fill="#888888"
          fontWeight="bold"
        >
          SHASHTIKA BUILDERS — ALL PLOTS TITLES 100% CLEAR WITH INDIVIDUAL REVENUE PATTA
        </text>
      </g>
    </svg>
  );
}
