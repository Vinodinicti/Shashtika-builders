// SHASHTIKA - Official Home Page Dataset & Masterplan SVG Generator

export function generateMasterplanSVG(prefix, highwayName, boulevardName) {
  let svg = `<svg width="100%" height="auto" viewBox="0 0 850 440" style="background: #F5EFEB; border-radius: 8px; display: block; min-width: 780px;">`;
  
  // Top Highway (Royal Burgundy Noir)
  svg += `<rect x="15" y="10" width="820" height="34" fill="#1A0709" rx="4"/>`;
  svg += `<line x1="15" y1="27" x2="835" y2="27" stroke="#C6A15B" stroke-dasharray="8 6" stroke-width="1.5"/>`;
  svg += `<text x="425" y="22" font-family="'Space Mono', monospace" font-size="10.5" fill="#FAF7F2" text-anchor="middle" font-weight="bold" letter-spacing="2">${highwayName}</text>`;
  
  // Central Main Boulevard (Horizontal)
  svg += `<rect x="15" y="210" width="820" height="28" fill="#2D0E12"/>`;
  svg += `<text x="425" y="228" font-family="'Space Mono', monospace" font-size="9.5" fill="#E5D2A6" text-anchor="middle" letter-spacing="2">${boulevardName}</text>`;
  
  // Central Avenue Street (Vertical)
  svg += `<rect x="410" y="44" width="30" height="385" fill="#2D0E12"/>`;
  
  // Entrance Gate Marker
  svg += `<rect x="402" y="44" width="46" height="8" fill="#C6A15B" rx="2"/>`;
  svg += `<text x="425" y="40" font-family="'Space Mono', monospace" font-size="7.5" fill="#1A0709" text-anchor="middle" font-weight="bold">GRAND ARCH ENTRY</text>`;
  
  function renderBlock(startX, startY, rows, cols, startNum, isBlockC = false) {
    let blockSvg = '';
    let currentNum = startNum;
    const w = 48, h = 42, dx = 53, dy = 47;
    
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = startX + c * dx;
        const y = startY + r * dy;
        
        if (isBlockC && r === 2 && c >= 4) {
          if (c === 4 && r === 2) {
            blockSvg += `<rect x="${x}" y="${y}" width="${3 * dx - 5}" height="${h}" fill="#A8664B" stroke="#2D0E12" rx="4"/>`;
            blockSvg += `<text x="${x + (3 * dx - 5) / 2}" y="${y + 25}" font-family="'Space Mono', monospace" font-size="9" fill="#FAF7F2" text-anchor="middle" font-weight="bold">🏛️ CENTRAL PARK & CLUBHOUSE</text>`;
          }
          continue;
        }
        
        const pId = `${prefix}-${currentNum}`;
        currentNum++;
        
        let fill = '#FAF7F2';
        let stroke = '#D8C5A7';
        let textFill = '#1A0709';
        let fontW = 'bold';
        
        if (currentNum % 5 === 0) {
          fill = '#C6A15B';
          stroke = '#8C6623';
          textFill = '#1A0709';
        } else if (currentNum % 7 === 0 || currentNum % 11 === 0) {
          fill = '#3D141A';
          stroke = '#230A0D';
          textFill = '#FAF7F2';
        }
        
        blockSvg += `<g class="plot-item" style="cursor: pointer;">`;
        blockSvg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="1.3" rx="3"/>`;
        blockSvg += `<text x="${x + w/2}" y="${y + h/2 + 3.5}" font-family="'Space Mono', monospace" font-size="9.5" fill="${textFill}" font-weight="${fontW}" text-anchor="middle">${pId}</text>`;
        blockSvg += `</g>`;
      }
    }
    return blockSvg;
  }
  
  svg += renderBlock(35, 54, 3, 7, 101);
  svg += renderBlock(455, 54, 3, 7, 122);
  svg += renderBlock(35, 248, 3, 7, 143, true);
  svg += renderBlock(455, 248, 3, 7, 161);
  
  svg += `</svg>`;
  return svg;
}

export const LOCATION_MASTERPLANS = {
  coimbatore: {
    city: 'COIMBATORE',
    tag: 'AIRPORT CORRIDOR',
    approvalBadge: 'DTCP & RERA',
    title: 'SHASHTIKA Heritage & Peelamedu',
    desc: '145 Gated Units • Hope College & Airport Highway Corridor',
    roadWidths: '40 FT & 30 FT',
    startingPrice: '₹ 24.50 Lakhs',
    approval: '100% DTCP & RERA Approved',
    totalPlots: '145 DTCP Plots',
    available: 95,
    prebooked: 18,
    sold: 32,
    plotSizes: '2.50 to 6.00 Cents',
    dimensions: "30'×40', 30'×50', 40'×60'",
    highlights: 'Located on Hope College Main Road near Coimbatore International Airport. Features 40ft & 30ft asphalt roads, underground drainage, solar street lights, gated security kiosk, and instant bank loan approval.',
    svgBlueprint: generateMasterplanSVG('C', '50 FT COIMBATORE AIRPORT CORRIDOR HIGHWAY', '40 FT PEELAMEDU MAIN BOULEVARD')
  },
  kambalampatti: {
    city: 'KAMBALAMPATTI, POLLACHI',
    tag: 'FLAGSHIP DTCP LAYOUT',
    approvalBadge: 'DTCP NO: 02/2025',
    title: 'SHASHTIKA ANANYA PALMS & VISTAS',
    subtitle: 'Kambalampatti Village, Anaimalai Taluk, Coimbatore District',
    englishTitle: 'LAYOUT PLAN SHOWING THE PROPOSED LAYOUT OF HOUSE SITES IN S.F.NO-209/1, 222/1A1 & 222/2A1B1 AT KAMBALAPATTI VILLAGE, ANAIMALAI TALUK, COIMBATORE DISTRICT.',
    tamilTitle: 'மனைப்பிரிவு வரைபடம் - கம்பளபட்டி கிராமம், ஆனைமலை வட்டம்',
    sfNumbers: 'S.F.NO-209/1, 222/1A1 & 222/2A1B1',
    desc: '64 DTCP Approved House Sites • S.F.NO-209/1 • Anaimalai Taluk Corridor',
    roadWidths: '40 FT & 33 FT Tar Roads',
    startingPrice: '₹ 18.50 Lakhs',
    approval: 'ம.வ / கோ.உ.தி.மு. எண் : 02/2025 (DTCP Approved)',
    totalPlots: '64 DTCP Plots',
    available: 38,
    prebooked: 10,
    sold: 16,
    plotSizes: '1,038 to 1,615 Sq.Ft (2.38 to 3.71 Cents)',
    dimensions: "28'×40', 30'×35', 30'×40', 30'×42', Corner Sites",
    blueprintImg: '/Images/Masterplan_Kambalapatti.png',
    roads: {
      panchayatNorth: '12.00m (40 FT) Panchayat Tar Road (North)',
      panchayatWest: '12.00m (40 FT) Panchayat Tar Road (West)',
      mainAvenue: '10.00m (33 FT) Main Avenue Road',
      crossRoad1: '7.20m Layout Cross Road',
      crossRoad2: '9.00m Layout Cross Road'
    },
    amenities: {
      park: 'Children Park & Open Space (பொது உபயோகம்)',
      eb: 'TANGEDCO Electricity Substation & Transformer Reserve',
      groundwater: 'Copiously Sweet Groundwater & Mountain Views'
    },
    highlights: 'Proposed layout of house sites in S.F.NO-209/1, 222/1A1 & 222/2A1B1 at Kambalampatti Village, Anaimalai Taluk, Coimbatore District. Directly accessible by 12.00m (40ft) Panchayat tar roads (North & West), 10.00m central avenue, 7.20m cross roads, dedicated Children Park & Open Space, TANGEDCO power transformer reserve, copiously sweet groundwater, and 100% clear parent title documentation for immediate DTCP registration.',
    svgBlueprint: generateMasterplanSVG('K', '12.00M (40 FT) PANCHAYAT TAR ROAD (NORTH)', '10.00M (33 FT) MAIN AVENUE')
  },
  pollachi: {
    city: 'KAMBALAMPATTI, POLLACHI',
    tag: 'FLAGSHIP DTCP LAYOUT',
    approvalBadge: 'DTCP NO: 02/2025',
    title: 'SHASHTIKA ANANYA PALMS & VISTAS',
    subtitle: 'Kambalampatti Village, Anaimalai Taluk, Coimbatore District',
    englishTitle: 'LAYOUT PLAN SHOWING THE PROPOSED LAYOUT OF HOUSE SITES IN S.F.NO-209/1, 222/1A1 & 222/2A1B1 AT KAMBALAPATTI VILLAGE, ANAIMALAI TALUK, COIMBATORE DISTRICT.',
    tamilTitle: 'மனைப்பிரிவு வரைபடம் - கம்பளபட்டி கிராமம், ஆனைமலை வட்டம்',
    sfNumbers: 'S.F.NO-209/1, 222/1A1 & 222/2A1B1',
    desc: '64 DTCP Approved House Sites • S.F.NO-209/1 • Anaimalai Taluk Corridor',
    roadWidths: '40 FT & 33 FT Tar Roads',
    startingPrice: '₹ 18.50 Lakhs',
    approval: 'ம.வ / கோ.உ.தி.மு. எண் : 02/2025 (DTCP Approved)',
    totalPlots: '64 DTCP Plots',
    available: 38,
    prebooked: 10,
    sold: 16,
    plotSizes: '1,038 to 1,615 Sq.Ft (2.38 to 3.71 Cents)',
    dimensions: "28'×40', 30'×35', 30'×40', 30'×42', Corner Sites",
    blueprintImg: '/Images/Masterplan_Kambalapatti.png',
    roads: {
      panchayatNorth: '12.00m (40 FT) Panchayat Tar Road (North)',
      panchayatWest: '12.00m (40 FT) Panchayat Tar Road (West)',
      mainAvenue: '10.00m (33 FT) Main Avenue Road',
      crossRoad1: '7.20m Layout Cross Road',
      crossRoad2: '9.00m Layout Cross Road'
    },
    amenities: {
      park: 'Children Park & Open Space (பொது உபயோகம்)',
      eb: 'TANGEDCO Electricity Substation & Transformer Reserve',
      groundwater: 'Copiously Sweet Groundwater & Mountain Views'
    },
    highlights: 'Proposed layout of house sites in S.F.NO-209/1, 222/1A1 & 222/2A1B1 at Kambalampatti Village, Anaimalai Taluk, Coimbatore District. Directly accessible by 12.00m (40ft) Panchayat tar roads (North & West), 10.00m central avenue, 7.20m cross roads, dedicated Children Park & Open Space, TANGEDCO power transformer reserve, copiously sweet groundwater, and 100% clear parent title documentation for immediate DTCP registration.',
    svgBlueprint: generateMasterplanSVG('K', '12.00M (40 FT) PANCHAYAT TAR ROAD (NORTH)', '10.00M (33 FT) MAIN AVENUE')
  },
  madurai: {
    city: 'MADURAI',
    tag: 'AIIMS & RING ROAD',
    approvalBadge: 'DTCP APPROVED',
    title: 'SHASHTIKA Temple City Heights',
    desc: '160 Gated Units • AIIMS Hospital & Ring Road Growth Zone',
    roadWidths: '40 FT Heavy Tar',
    startingPrice: '₹ 28.00 Lakhs',
    approval: 'DTCP & RERA Approved',
    totalPlots: '160 DTCP Plots',
    available: 110,
    prebooked: 22,
    sold: 28,
    plotSizes: '3.00 to 8.00 Cents',
    dimensions: "30'×45', 40'×60', 50'×70'",
    highlights: 'Strategically located on Madurai Ring Road & AIIMS Hospital Corridor. Designed for rapid asset appreciation, 40ft wide internal tar avenues, and complete clear parent deed documentation.',
    svgBlueprint: generateMasterplanSVG('M', '50 FT MADURAI RING ROAD EXPRESSWAY', '40 FT AIIMS HOSPITAL AVENUE')
  },
  chennai: {
    city: 'CHENNAI',
    tag: 'ECR & GST CORRIDOR',
    approvalBadge: 'CMDA & RERA',
    title: 'SHASHTIKA ECR Bay Vistas',
    desc: '195 Gated Units • ECR Coast & GST Metro Extension',
    roadWidths: '50 FT & 40 FT',
    startingPrice: '₹ 45.00 Lakhs',
    approval: 'CMDA & RERA Approved',
    totalPlots: '195 CMDA Plots',
    available: 120,
    prebooked: 35,
    sold: 40,
    plotSizes: '2.50 to 10.00 Cents',
    dimensions: "30'×40', 40'×60', 50'×80'",
    roadWidths: '50 FT Avenue & 40 FT Boulevards',
    startingPrice: '₹ 45.00 Lakhs',
    highlights: 'Coastal gated enclave near Chennai ECR & GST Metro extension. CMDA approved masterplan layout featuring 50ft avenues, underground power cables, rainwater runoff systems, and sea breeze environment.',
    svgBlueprint: generateMasterplanSVG('CH', '50 FT CHENNAI ECR BEACH BOULEVARD', '40 FT GST METRO EXTENSION AVENUE')
  }
};

export const UPCOMING_PROJECTS = [
  {
    title: "SHASHTIKA Green Valley",
    city: "Pollachi",
    tag: "Farm Plots",
    badge: "Ready to Launch",
    area: "5.9 ACRES",
    road: "40 FT ROADS",
    image: "/Images/Upcoming_Green_Valley.jpg",
    desc: "101 premium gated agro-residency units with drip irrigation, solar avenue lights, and organic plantation layouts near Pollachi Highway.",
    approval: "DTCP & RERA Approved Layout",
    location: "Pollachi Highway Corridor",
    features: [
      "101 Exclusive Farm Plot Units",
      "Individual Drip Irrigation Connections",
      "Solar Powered Street Lighting",
      "40 ft Wide Internal Tar Roads",
      "24/7 Gated Security & Perimeter Wall",
      "Abundant Water Source & Storage Tank"
    ]
  },
  {
    title: "SHASHTIKA Heritage Hills",
    city: "Coimbatore",
    tag: "Residential",
    badge: "Ready to Launch",
    area: "8.3 ACRES",
    road: "60 FT ENTRY",
    image: "/Images/Upcoming_Heritage_Hills.jpg",
    desc: "High-growth residential pocket near IT corridor with DTCP approval, underground electrical utilities, and wide boulevard entry.",
    approval: "DTCP & RERA Approved",
    location: "Saravanampatti-IT Corridor Link",
    features: [
      "Underground Electrical & Drainage Cables",
      "60 ft Wide Grand Entrance Avenue",
      "Landscaped Children's Play Park",
      "DTCP Approved & Clear Title",
      "Immediate House Construction Ready",
      "High Appreciation Capital Growth Zone"
    ]
  },
  {
    title: "SHASHTIKA Emerald Palms",
    city: "Kinathukadavu",
    tag: "Eco Vistas",
    badge: "Phase 1 Booking",
    area: "12.5 ACRES",
    road: "33 FT ROADS",
    image: "/Images/Upcoming_Emerald_Palms.jpg",
    desc: "Scenic eco-friendly plantation community surrounded by coconut groves with panoramic Western Ghats mountain views.",
    approval: "DTCP Layout Approval in Progress",
    location: "Kinathukadavu Green Belt",
    features: [
      "Panoramic Western Ghats Mountain Views",
      "Gated Perimeter Security Fence",
      "Blacktop Internal Tar Roads",
      "Avenue Tree Plantation throughout",
      "24/7 Overhead Water Tank Supply",
      "Ideal for Weekend Villa Homesteads"
    ]
  },
  {
    title: "SHASHTIKA Royal Enclave",
    city: "Kovaipudur",
    tag: "Villa Township",
    badge: "Pre-Launch",
    area: "15.0 ACRES",
    road: "50 FT ROAD",
    image: "/Images/Upcoming_Royal_Enclave.jpg",
    desc: "Exclusive hillside villa plot layout offering cool year-round climate, panoramic valley views, and private community clubhouse.",
    approval: "DTCP & RERA Registered",
    location: "Kovaipudur Hillside Enclave",
    features: [
      "Pleasant Year-Round Cool Hill Climate",
      "Private Gated Clubhouse & Community Park",
      "50 ft Main Entrance Road with LED Lights",
      "Storm Water Drainage Infrastructure",
      "High-Security Gated Arch Entrance",
      "Custom Architecture Villa Construction Support"
    ]
  },
  {
    title: "SHASHTIKA Sunrise Avenue",
    city: "Saravanampatti",
    tag: "Gated Layout",
    badge: "Upcoming",
    area: "6.8 ACRES",
    road: "40 FT ROADS",
    image: "/Images/Upcoming_Green_Valley.jpg",
    desc: "Prime investment plots adjacent to Saravanampatti IT Park SEZ with compound wall, avenue trees, and underground drainage.",
    approval: "DTCP Approved Layout",
    location: "Saravanampatti IT SEZ Hub",
    features: [
      "2 Minutes from IT SEZ Parks & Tech Companies",
      "40 ft Blacktop Tar Roads",
      "Gated Compound Wall",
      "LED Streetlights & Underground Drainage",
      "Walkable Distance to Top Schools & Hospitals",
      "High Rental & Commercial Resale Demand"
    ]
  },
  {
    title: "SHASHTIKA Signature Villas",
    city: "Kovaipudur",
    tag: "Luxury Villas",
    badge: "VIP Allocation",
    area: "10.2 ACRES",
    road: "50 FT BOULEVARD",
    image: "/Images/Upcoming_Heritage_Hills.jpg",
    desc: "Ultra-luxury contemporary villas with private courtyard gardens, smart home automation, and 24/7 security patrol.",
    approval: "DTCP Approved Luxury Villa Project",
    location: "Kovaipudur Prime Boulevard",
    features: [
      "Smart Home Automation Systems Options",
      "Private Landscaped Courtyard Gardens",
      "50 ft Wide Tree-Lined Boulevard",
      "Underground Electrical & Fiber Optics",
      "24/7 Security Patrol & CCTV Surveillance",
      "Turnkey Custom Villa Design & Build Services"
    ]
  }
];

export const CONSTRUCTION_STAGES = [
  {
    id: 1,
    stage: "Just Started",
    progress: 15,
    title: "SHASHTIKA Crest Villa #14",
    city: "Saravanampatti",
    tag: "Foundation Phase",
    desc: "Groundbreaking foundation work initiated with reinforced concrete footings, column rebar cages, and utility marking.",
    stat1: "15% Progress",
    stat2: "3BHK Build",
    image: "/Images/Construction_Started.jpg"
  },
  {
    id: 2,
    stage: "Under Construction",
    progress: 50,
    title: "Cornerstone Luxury Villa",
    city: "Mahalingapuram",
    tag: "Structure Phase",
    desc: "Active brickwork masonry, RCC beam slab casting, and electrical conduit piping under civil construction.",
    stat1: "50% Built",
    stat2: "4BHK Modern",
    image: "/Images/Construction_Underway.jpg"
  },
  {
    id: 3,
    stage: "75% Completed",
    progress: 75,
    title: "Heritage Hillside Villa",
    city: "Kovaipudur",
    tag: "Finishing Phase",
    desc: "Exterior smooth plastering, primer coat painting, glass balcony railings, and interior tile fitting in progress.",
    stat1: "75% Built",
    stat2: "4BHK Independent",
    image: "/Images/Construction_75_Percent.jpg"
  },
  {
    id: 4,
    stage: "Key Handover",
    progress: 100,
    title: "Oak Crest Residency",
    city: "Peelamedu",
    tag: "Ready to Move",
    desc: "100% completed luxury villa handed over to happy owners with ceremonial key presentation and move-in readiness.",
    stat1: "100% Ready",
    stat2: "Key Handover",
    image: "/Images/Construction_Key_Handover.jpg"
  }
];

export const WHY_CHOOSE_ITEMS = [
  {
    title: "DTCP & RERA APPROVED",
    desc: "100% legal title verification, clear parent document history, and instant bank loan eligibility.",
    icon: "shield"
  },
  {
    title: "LUXURY GATED COMMUNITY",
    desc: "Fully secured compound perimeter walls, 24/7 security entry booth, solar lighting, and avenue plantations.",
    icon: "lock"
  },
  {
    title: "FLEXIBLE PLOT SIZES",
    desc: "Flexible layout parcels from 2.0 to 10.0+ Cents (30'×40', 30'×50', 40'×60' & corner sites) for custom villa home plans.",
    icon: "grid"
  },
  {
    title: "HIGH CONNECTIVITY CORRIDOR",
    desc: "Strategically positioned on Pollachi Main Road & Coimbatore Bypass with strong annual land value appreciation.",
    icon: "mapPin"
  },
  {
    title: "40 FT ENGINEERED ROADS",
    desc: "Wide heavy-load asphalt avenues, underground stormwater drains, street lights, and rainwater harvesting pits.",
    icon: "road"
  }
];

export const CUSTOMER_REVIEWS = [
  {
    name: "S. Karthikeyan",
    role: "IT Professional (OMR, Chennai)",
    location: "Coimbatore Bypass Corridor",
    text: "Being based in Chennai, I couldn't travel down multiple times. Mr. Ramesh from Shashtika sent drone footage, survey sketches, and DTCP approval copies beforehand. We got the legal opinion through our advocate in Mylapore, all link documents from 1985 were crystal clear. Registration at Pollachi sub-registrar office took barely 2 hours. Very transparent team.",
    rating: "4.8",
    theme: "espresso"
  },
  {
    name: "Dr. Radhika Sundaram",
    role: "Healthcare Professional",
    location: "RS Puram, Coimbatore",
    text: "Visited 4 different layouts around Kinathukadavu before finalizing here. What convinced my husband and me was the groundwater sweet table test and the genuine 40-ft road width. The road was a bit dusty during early layout preparation, but the final bituminous layer and curb stones turned out solid. No hidden price escalation.",
    rating: "4.7",
    theme: "gold"
  },
  {
    name: "M. Balasubramaniam",
    role: "Senior Executive (Retd.)",
    location: "Pollachi Heritage Layout",
    text: "Purchased a 5.5-cent corner plot for our retirement home. Very calm coconut grove setting with good ventilation. Boundary stones were demarcated on the exact day our token advance was accepted. Genuine local reputation and respectful staff.",
    rating: "5.0",
    theme: "terracotta"
  },
  {
    name: "K. Praveen Kumar",
    role: "Tech Lead (Velachery, Chennai)",
    location: "Coimbatore South Ext.",
    text: "Booked 2 adjoining plots as a family investment. My bank (HDFC) took about 3 weeks for legal clearance, but Shashtika's documentation desk patiently coordinated with the bank officers, providing all parent deeds and FMB maps. Clear title and zero hassle.",
    rating: "4.6",
    theme: "mocha"
  },
  {
    name: "V. Anand & Deepa",
    role: "Villa Plot Buyers",
    location: "Saravanampatti, Coimbatore",
    text: "We wanted a secured gated community with solar street lighting so we can start house construction next year. The entrance arch and compound wall quality are top class. Ramesh & team were approachable on WhatsApp even on Sundays for our doubts.",
    rating: "4.9",
    theme: "espresso"
  },
  {
    name: "G. Venkatesh",
    role: "Business Owner",
    location: "Anna Nagar, Chennai",
    text: "Honest promoters. They didn't pressure us for immediate settlement before our lawyer verified the Encumbrance Certificate. Stormwater drainage work saw a slight delay due to monsoon rains in October, but they kept us posted with weekly video updates. Good value for money.",
    rating: "4.5",
    theme: "gold"
  },
  {
    name: "S. Meenakshi Sundaram",
    role: "Plot Investor",
    location: "Tiruppur Textile Corridor",
    text: "I invest in land regularly across the Coimbatore-Tiruppur-Pollachi belt. Shashtika stands out because their DTCP approvals are 100% genuine and verified on the government portal. Road quality and layout elevation are noticeably better than local brokers.",
    rating: "4.8",
    theme: "terracotta"
  },
  {
    name: "C. Revathi",
    role: "School Vice Principal",
    location: "Pollachi Town",
    text: "My brother living in Chennai recommended Shashtika. We were skeptical about buying land without intermediaries, but their office staff handled guideline value calculation, legal verification, and patta name transfer seamlessly. Trustworthy builder.",
    rating: "5.0",
    theme: "mocha"
  }
];

export const HERO_STATS = [
  { target: 20, suffix: "", label: "Years Experience" },
  { target: 8, suffix: "+", label: "Completed Layouts" },
  { target: 4, suffix: "", label: "Ongoing Layouts" },
  { target: 150, suffix: "+", label: "Constructed Houses" },
  { target: 850, suffix: "+", label: "Happy Customers" }
];
