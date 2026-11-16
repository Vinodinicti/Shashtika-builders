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
            blockSvg += `<text x="${x + (3 * dx - 5) / 2}" y="${y + 25}" font-family="'Space Mono', monospace" font-size="9" fill="#FAF7F2" text-anchor="middle" font-weight="bold">CENTRAL PARK & CLUBHOUSE</text>`;
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
  kovilpalayam: {
    city: 'KOVILPALAYAM, COIMBATORE',
    tag: 'POLLACHI MAIN ROAD CORRIDOR',
    approvalBadge: 'DTCP APPROVED (32 PLOTS)',
    title: 'SHASHTIKA MAGIZHUM NAGAR',
    subtitle: 'Magizhum Nagar, Pollachi Main Road, Kovilpalayam, Coimbatore',
    englishTitle: 'LAYOUT PLAN SHOWING THE HOUSE SITES IN KOVILPALAYAM COIMBATORE',
    tamilTitle: 'மகிழும் நகர் - பொள்ளாச்சி மெயின் ரோடு, கோவில்பாளையம்',
    sfNumbers: 'Pollachi Main Road, Kovilpalayam',
    desc: '32 DTCP Approved Individual Villas & Plots • Pollachi Main Road State Highway Frontage',
    roadWidths: '40 FT, 30 FT & 24 FT Tar Roads',
    startingPrice: '₹ 15.00 Lakhs',
    approval: '100% DTCP Approved (32 மனைகள் மட்டும்)',
    totalPlots: '32 DTCP Plots',
    available: 24,
    prebooked: 4,
    sold: 4,
    plotSizes: '1,500 to 3,359 Sq.Ft (3.44 to 7.71 Cents)',
    dimensions: "31'×55', 33'×87', 40' Highway Corner Plots",
    blueprintImg: '/Images/Kovilpalayam_Plan.jpg',
    roads: {
      panchayatNorth: 'Proposed 7.20m (24 FT) Layout Tar Road',
      panchayatWest: '40-0" (12.20m) Wide Pollachi Main Road / State Highway',
      mainAvenue: '9.00m (30 FT) Wide Layout Entrance Boulevard',
      crossRoad1: '7.20m (24 FT) Wide Internal Tar Road',
      crossRoad2: '7.20m (24 FT) Wide Top Avenue Road'
    },
    amenities: {
      solar: 'சோலார் மின் விளக்கு (Solar Street Lighting System)',
      road: '40 அடி பிரதான சாலை & Gated கம்யூனிட்டி பாதுகாப்பு',
      water: 'ஏராளமான சுவை நிலத்தடி நீர் வசதி',
      vastu: '100% வாஸ்து முறைப்படி அமையப்பெற்ற வீட்டுமனைகள்'
    },
    highlights: 'Prime DTCP approved villa plots located directly on Pollachi Main Road, Kovilpalayam. 10 minutes journey to reputed schools and colleges, 40ft grand frontage entrance, 30ft & 24ft internal tar roads, solar street lighting, gated community with sweet groundwater and immediate registration.',
    svgBlueprint: generateMasterplanSVG('KP', '40 FT POLLACHI MAIN ROAD HIGHWAY', '30 FT MAGIZHUM NAGAR BOULEVARD')
  },
  siruvani: {
    city: 'SIRUVANI, COIMBATORE',
    tag: 'FOOTHILLS ECO CORRIDOR',
    approvalBadge: 'DTCP NO: 261/2025',
    title: "SHASHTIKA SAKTHIVEL'S AVENUE",
    subtitle: 'Siruvani Main Road, WQWH+W57 Madawarayapuram, Coimbatore',
    englishTitle: "LAYOUT PLAN SHOWING PROPOSED HOUSE SITES AT SAKTHIVEL'S AVENUE, SIRUVANI MAIN ROAD, MADHUVORAYAPURAM, COIMBATORE.",
    tamilTitle: 'சக்திவேல்ஸ் அவென்யூ - தள வரைபடம், சிறுவாணி மெயின் ரோடு, மதுவராயபுரம்',
    sfNumbers: 'S.F.NO-89/1A2A, 89/1A3A1 & 89/1A3B',
    desc: '47 DTCP Approved Plots • Siruvani Foothills • DTCP 261/2025',
    roadWidths: '30 FT & 28 FT Engineered Tar Roads',
    startingPrice: '₹ 14.50 Lakhs',
    approval: 'DTCP NO: 261/2025 Approved',
    totalPlots: '47 DTCP Plots',
    available: 35,
    prebooked: 3,
    sold: 9,
    plotSizes: '1,099 to 1,870 Sq.Ft (2.52 to 4.29 Cents)',
    dimensions: "28'×55', 30'×50', 35'×40', Commercial Frontage",
    blueprintImg: '/Images/Siruvani_Plan.jpg',
    roads: {
      panchayatNorth: '28 FT & 30 FT Layout Tar Road (North Row)',
      panchayatWest: 'Internal Layout Access Tar Road',
      mainAvenue: '30 FT & 28 FT Central Asphalt Boulevard',
      crossRoad1: '24 FT Internal Connecting Road',
      crossRoad2: '26 FT Commercial Access Avenue'
    },
    amenities: {
      water: 'Dedicated Layout Water Tank & Copious Pure Siruvani Groundwater',
      commercial: 'Exclusive Prime Commercial Space Reserve at Entrance',
      road: 'Engineered Blacktop Tar Roads with Concrete Curbs',
      green: 'Scenic Western Ghats Foothills Atmosphere & Vastu Compliance'
    },
    highlights: 'Situated on the scenic Siruvani Main Road corridor (WQWH+W57 Madawarayapuram) with direct views of Western Ghats. Features DTCP Approval 261/2025, commercial frontage, dedicated layout water tank, copiously pure sweet Siruvani water, and minutes from Siruvani eco-tourism hub.',
    svgBlueprint: generateMasterplanSVG('S', '30 FT SIRUVANI MAIN ROAD CORRIDOR', '28 FT SAKTHIVEL AVENUE BOULEVARD')
  },
  // Backward compatibility aliases
  coimbatore: {
    city: 'KOVILPALAYAM, COIMBATORE',
    tag: 'POLLACHI MAIN ROAD CORRIDOR',
    approvalBadge: 'DTCP APPROVED (32 PLOTS)',
    title: 'SHASHTIKA MAGIZHUM NAGAR',
    subtitle: 'Magizhum Nagar, Pollachi Main Road, Kovilpalayam, Coimbatore',
    desc: '32 DTCP Approved Individual Villas & Plots • Pollachi Main Road State Highway Frontage',
    roadWidths: '40 FT, 30 FT & 24 FT Tar Roads',
    startingPrice: '₹ 15.00 Lakhs',
    approval: '100% DTCP Approved',
    totalPlots: '32 DTCP Plots',
    available: 24,
    prebooked: 4,
    sold: 4,
    plotSizes: '3.44 to 7.71 Cents',
    dimensions: "31'×55', 33'×87'",
    highlights: 'Prime DTCP approved villa plots located on Pollachi Main Road, Kovilpalayam.',
    svgBlueprint: generateMasterplanSVG('KP', '40 FT POLLACHI MAIN ROAD', '30 FT MAGIZHUM NAGAR BOULEVARD')
  },
  pollachi: {
    city: 'KAMBALAMPATTI, POLLACHI',
    tag: 'FLAGSHIP DTCP LAYOUT',
    approvalBadge: 'DTCP NO: 02/2025',
    title: 'SHASHTIKA ANANYA PALMS & VISTAS',
    subtitle: 'Kambalampatti Village, Anaimalai Taluk, Coimbatore District',
    desc: '64 DTCP Approved House Sites • S.F.NO-209/1 • Anaimalai Taluk Corridor',
    roadWidths: '40 FT & 33 FT Tar Roads',
    startingPrice: '₹ 18.50 Lakhs',
    approval: 'DTCP NO: 02/2025 Approved',
    totalPlots: '64 DTCP Plots',
    available: 38,
    prebooked: 10,
    sold: 16,
    plotSizes: '2.38 to 3.71 Cents',
    dimensions: "28'×40', 30'×35', 30'×40'",
    highlights: 'Proposed layout in Kambalampatti Village, Anaimalai Taluk.',
    svgBlueprint: generateMasterplanSVG('K', '12.00M (40 FT) PANCHAYAT TAR ROAD', '10.00M (33 FT) MAIN AVENUE')
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
    city: "Kovilpalayam",
    tag: "Eco Vistas",
    badge: "Phase 1 Booking",
    area: "12.5 ACRES",
    road: "33 FT ROADS",
    image: "/Images/Upcoming_Emerald_Palms.jpg",
    desc: "Scenic eco-friendly plantation community surrounded by coconut groves with panoramic Western Ghats mountain views.",
    approval: "DTCP Layout Approval in Progress",
    location: "Kovilpalayam Green Belt",
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
    title: "SHASHTIKA Crest Villa 14",
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
    role: "IT Professional",
    location: "Coimbatore",
    text: "Very smooth registration process. All DTCP documents and parent deeds were 100% clear with zero hassle.",
    rating: "5.0",
    theme: "espresso"
  },
  {
    name: "Dr. Radhika Sundaram",
    role: "Doctor",
    location: "RS Puram, Coimbatore",
    text: "Great location with 40-ft wide tar roads and good sweet water. Very happy with our villa plot.",
    rating: "4.8",
    theme: "gold"
  },
  {
    name: "M. Balasubramaniam",
    role: "Senior Executive (Retd.)",
    location: "Pollachi",
    text: "Peaceful environment surrounded by coconut trees. Boundary stones were demarcated right on time.",
    rating: "5.0",
    theme: "terracotta"
  },
  {
    name: "K. Praveen Kumar",
    role: "Software Engineer",
    location: "Siruvani",
    text: "Bought 2 plots here. The team coordinated with HDFC bank for quick loan approval without any delays.",
    rating: "4.7",
    theme: "mocha"
  },
  {
    name: "V. Anand & Deepa",
    role: "Home Builders",
    location: "Saravanampatti",
    text: "High quality gated community with entrance arch and solar street lights. Ready for immediate construction.",
    rating: "4.9",
    theme: "espresso"
  },
  {
    name: "G. Venkatesh",
    role: "Business Owner",
    location: "Tiruppur",
    text: "Honest and transparent builders. Everything was clearly explained upfront with no hidden costs.",
    rating: "4.8",
    theme: "gold"
  },
  {
    name: "S. Meenakshi Sundaram",
    role: "Land Investor",
    location: "Udumalpet",
    text: "Fast appreciation corridor. DTCP approvals and revenue Patta are 100% verified and genuine.",
    rating: "5.0",
    theme: "terracotta"
  },
  {
    name: "C. Revathi",
    role: "Teacher",
    location: "Kovilpalayam",
    text: "Friendly staff who guided us through the entire sub-registrar registration. Highly recommended.",
    rating: "4.9",
    theme: "mocha"
  }
];

export const HERO_STATS = [
  { target: 20, suffix: "", label: "Years Experience" },
  { target: 24, suffix: "", label: "Completed Layouts" },
  { target: 1750, suffix: "+", label: "DTCP Plots" },
  { target: 150, suffix: "+", label: "Constructed Houses" },
  { target: 1500, suffix: "+", label: "Happy Customers" }
];
