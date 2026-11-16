// ==========================================================================
// SHASHTIKA - SIRUVANI (SAKTHIVEL'S AVENUE) LAYOUT MASTERPLAN DATA
// DTCP Approval No: 261/2025 | S.F.NO-89/1A2A, 89/1A3A1 & 89/1A3B
// Siruvani Main Road, Madawarayapuram (Madhuvorayapuram), Coimbatore, Tamil Nadu
// Google Maps: https://maps.app.goo.gl/n1LEUJfA8nMTBYZaA (WQWH+W57)
// Exactly transcribed from official approved blueprint table (Plots 1 to 47)
// ==========================================================================

export const SIRUVANI_METADATA = {
  id: "siruvani",
  name: "SHASHTIKA SAKTHIVEL'S AVENUE",
  shortName: "Siruvani Layout",
  englishTitle: "LAYOUT PLAN SHOWING PROPOSED HOUSE SITES AT SAKTHIVEL'S AVENUE, SIRUVANI MAIN ROAD, MADHUVORAYAPURAM, COIMBATORE.",
  tamilTitle: "சக்திவேல்ஸ் அவென்யூ - தள வரைபடம், சிறுவாணி மெயின் ரோடு, மதுவராயபுரம்",
  location: "Siruvani Main Road, WQWH+W57 Madawarayapuram, Coimbatore District, Tamil Nadu",
  googleMapsUrl: "https://maps.app.goo.gl/n1LEUJfA8nMTBYZaA",
  approvalNo: "DTCP APPROVED: 261/2025",
  sfNumbers: "S.F.NO-89/1A2A, 89/1A3A1 & 89/1A3B",
  totalPlots: 47,
  totalArea: "78,200 SQ.FT (1 ACRE 80 CENTS)",
  boundaries: {
    topNorth: "64.6m + 94.3m (158.90m)",
    bottomSouth: "58.4m + 114.5m (172.90m)",
    leftWest: "28.2m & 24.6m (52.80m)",
    rightEast: "Commercial Space Reserve (17.1m, 21.6m, 28.3m)"
  },
  roads: {
    panchayatNorth: "28 FT & 30 FT Layout Tar Road (North Row)",
    panchayatWest: "Internal Layout Access Tar Road",
    mainAvenue: "30 FT & 28 FT Central Asphalt Boulevard",
    crossRoad1: "24 FT Internal Connecting Road",
    crossRoad2: "26 FT Commercial Access Avenue"
  },
  amenities: {
    water: "Dedicated Layout Water Tank & Copious Pure Siruvani Groundwater",
    commercial: "Exclusive Prime Commercial Space Reserve at Entrance",
    road: "Engineered Blacktop Tar Roads with Concrete Curbs",
    eb: "TANGEDCO Electricity Transformer & Street Lighting",
    green: "Lush Western Ghats Foothills Atmosphere & Vastu Compliance"
  },
  locationHighlights: {
    title: "Siruvani Layout Highlights",
    subtitle: "WQWH+W57 Madawarayapuram, Siruvani Foothills Corridor",
    image: "/Images/Siruvani_Plan.jpg",
    imageCaption: "Sakthivel's Avenue - DTCP: 261/2025",
    tag: "LOCATION & AMENITIES",
    mapsUrl: "https://maps.app.goo.gl/n1LEUJfA8nMTBYZaA",
    points: [
      "Direct frontage on scenic Siruvani Main Road corridor (WQWH+W57 Madawarayapuram)",
      "Minutes away from pristine Siruvani Waterfalls & Kovai Kutralam Eco-Tourism Hub",
      "Close proximity to Isha Yoga Centre, Dhyanalinga & Velliangiri Foothills",
      "World-renowned sweet Siruvani drinking water table with high natural yield",
      "Dedicated overhead layout water tank & distribution piping network",
      "Prime Commercial Space reserve at entrance facing main traffic flow",
      "30 FT, 28 FT and 24 FT wide heavy-duty blacktop tar avenues",
      "100% DTCP Approved (No: 261/2025) with spotless parent document trail",
      "Every individual plot marked with numbered boundary demarcation stones",
      "Spot registration ready with immediate Patta transfer facility"
    ]
  }
};

// Exact 47 plots matching the blueprint flyer table (Plot.No, Sq.Ft, Cent, Rem Sq.Ft)
// Markings: Plots 1..4 SOLD, Plot 8 BOOKED, Plot 16 SOLD, Plot 17 SOLD, Plots 25..27 BOOKED, Plot 36 SOLD, Plot 47 SOLD
export const SIRUVANI_PLOTS_DATA = [
  { number: 1,  sqft: 1756, cent: 4, remSqft: 14,  dim: "32'-3\" x 55'", facing: "North Facing / West", road: "28 FT Layout Avenue", status: "SOLD" },
  { number: 2,  sqft: 1561, cent: 3, remSqft: 254, dim: "28' x 55'",     facing: "North Facing", road: "28 FT Layout Avenue", status: "SOLD" },
  { number: 3,  sqft: 1561, cent: 3, remSqft: 254, dim: "28' x 55'",     facing: "North Facing", road: "28 FT Layout Avenue", status: "SOLD" },
  { number: 4,  sqft: 1561, cent: 3, remSqft: 254, dim: "28' x 55'",     facing: "North Facing", road: "28 FT Layout Avenue", status: "SOLD" },
  { number: 5,  sqft: 1645, cent: 3, remSqft: 338, dim: "28' x 55'",     facing: "North Facing", road: "28 FT Layout Avenue", status: "AVAILABLE" },
  { number: 6,  sqft: 1561, cent: 3, remSqft: 254, dim: "29'-6\" x 55'", facing: "North Facing", road: "28 FT Layout Avenue", status: "AVAILABLE" },
  { number: 7,  sqft: 1558, cent: 3, remSqft: 251, dim: "30' x 55'",     facing: "North Facing", road: "28 FT Layout Avenue", status: "AVAILABLE" },
  { number: 8,  sqft: 1542, cent: 3, remSqft: 235, dim: "30' x 55'",     facing: "North Facing", road: "28 FT Layout Avenue", status: "PRE-BOOKED" },
  { number: 9,  sqft: 1099, cent: 2, remSqft: 228, dim: "28' x 40'",     facing: "North Facing", road: "28 FT Layout Avenue", status: "AVAILABLE" },
  { number: 10, sqft: 1112, cent: 2, remSqft: 240, dim: "28' x 40'",     facing: "North Facing", road: "28 FT Layout Avenue", status: "AVAILABLE" },
  { number: 11, sqft: 1108, cent: 2, remSqft: 237, dim: "28' x 40'",     facing: "North Facing", road: "28 FT Layout Avenue", status: "AVAILABLE" },
  { number: 12, sqft: 1181, cent: 2, remSqft: 310, dim: "29'-6\" x 40'", facing: "North Facing", road: "28 FT Layout Avenue", status: "AVAILABLE" },
  { number: 13, sqft: 1731, cent: 3, remSqft: 425, dim: "28' x 55'",     facing: "North Facing", road: "28 FT Layout Avenue", status: "AVAILABLE" },
  { number: 14, sqft: 1750, cent: 4, remSqft: 8,   dim: "28' x 55'",     facing: "North Facing", road: "28 FT Layout Avenue", status: "AVAILABLE" },
  { number: 15, sqft: 1738, cent: 3, remSqft: 431, dim: "28' x 55'",     facing: "North Facing", road: "28 FT Layout Avenue", status: "AVAILABLE" },
  { number: 16, sqft: 1388, cent: 3, remSqft: 81,  dim: "Corner",        facing: "North-East Corner", road: "28 FT Avenue & Commercial Road", status: "SOLD" },
  { number: 17, sqft: 1400, cent: 3, remSqft: 93,  dim: "Corner",        facing: "South-East Corner", road: "30 FT Central Boulevard", status: "SOLD" },
  { number: 18, sqft: 1335, cent: 3, remSqft: 28,  dim: "30' x 45'",     facing: "South Facing", road: "30 FT Central Boulevard", status: "AVAILABLE" },
  { number: 19, sqft: 1750, cent: 4, remSqft: 8,   dim: "35' x 50'",     facing: "South Facing", road: "30 FT Central Boulevard", status: "AVAILABLE" },
  { number: 20, sqft: 1650, cent: 3, remSqft: 343, dim: "33' x 50'",     facing: "South Facing", road: "30 FT Central Boulevard", status: "AVAILABLE" },
  { number: 21, sqft: 1638, cent: 3, remSqft: 331, dim: "33' x 50'",     facing: "South Facing", road: "30 FT Central Boulevard", status: "AVAILABLE" },
  { number: 22, sqft: 1308, cent: 3, remSqft: 1,   dim: "30' x 44'",     facing: "South Facing", road: "30 FT Central Boulevard", status: "AVAILABLE" },
  { number: 23, sqft: 1320, cent: 3, remSqft: 13,  dim: "30' x 44'",     facing: "South Facing", road: "30 FT Central Boulevard", status: "AVAILABLE" },
  { number: 24, sqft: 1325, cent: 3, remSqft: 18,  dim: "30' x 44'",     facing: "South Facing", road: "30 FT Central Boulevard", status: "AVAILABLE" },
  { number: 25, sqft: 1653, cent: 3, remSqft: 346, dim: "35' x 47'",     facing: "North Facing", road: "30 FT Central Boulevard", status: "PRE-BOOKED" },
  { number: 26, sqft: 1661, cent: 3, remSqft: 355, dim: "35' x 47'",     facing: "North Facing", road: "30 FT Central Boulevard", status: "PRE-BOOKED" },
  { number: 27, sqft: 1658, cent: 3, remSqft: 351, dim: "35' x 47'",     facing: "North Facing", road: "30 FT Central Boulevard", status: "PRE-BOOKED" },
  { number: 28, sqft: 1630, cent: 3, remSqft: 323, dim: "35' x 47'",     facing: "North Facing", road: "30 FT Central Boulevard", status: "AVAILABLE" },
  { number: 29, sqft: 1547, cent: 3, remSqft: 240, dim: "33' x 47'",     facing: "North Facing", road: "30 FT Central Boulevard", status: "AVAILABLE" },
  { number: 30, sqft: 1544, cent: 3, remSqft: 237, dim: "33' x 47'",     facing: "North Facing", road: "30 FT Central Boulevard", status: "AVAILABLE" },
  { number: 31, sqft: 1540, cent: 3, remSqft: 233, dim: "33' x 47'",     facing: "North Facing", road: "30 FT Central Boulevard", status: "AVAILABLE" },
  { number: 32, sqft: 1540, cent: 3, remSqft: 233, dim: "33' x 47'",     facing: "North Facing", road: "30 FT Central Boulevard", status: "AVAILABLE" },
  { number: 33, sqft: 1870, cent: 4, remSqft: 128, dim: "35' x 53'",     facing: "South Facing", road: "30 FT Central Boulevard", status: "AVAILABLE" },
  { number: 34, sqft: 1594, cent: 3, remSqft: 287, dim: "32' x 50'",     facing: "South Facing", road: "30 FT Central Boulevard", status: "AVAILABLE" },
  { number: 35, sqft: 1600, cent: 3, remSqft: 293, dim: "32' x 50'",     facing: "South Facing", road: "30 FT Central Boulevard", status: "AVAILABLE" },
  { number: 36, sqft: 1588, cent: 3, remSqft: 281, dim: "Corner",        facing: "South Facing / Corner", road: "30 FT Central Boulevard", status: "SOLD" },
  { number: 37, sqft: 1268, cent: 2, remSqft: 396, dim: "30' x 42'",     facing: "South Facing", road: "30 FT Central Boulevard", status: "AVAILABLE" },
  { number: 38, sqft: 1280, cent: 2, remSqft: 409, dim: "30' x 43'",     facing: "South Facing", road: "30 FT Central Boulevard", status: "AVAILABLE" },
  { number: 39, sqft: 1200, cent: 2, remSqft: 329, dim: "30' x 40'",     facing: "South Facing", road: "30 FT Central Boulevard", status: "AVAILABLE" },
  { number: 40, sqft: 1500, cent: 3, remSqft: 193, dim: "30' x 50'",     facing: "South Facing", road: "30 FT Central Boulevard", status: "AVAILABLE" },
  { number: 41, sqft: 1500, cent: 3, remSqft: 193, dim: "30' x 50'",     facing: "South Facing", road: "30 FT Central Boulevard", status: "AVAILABLE" },
  { number: 42, sqft: 1538, cent: 3, remSqft: 231, dim: "30' x 51'",     facing: "South Facing", road: "30 FT Central Boulevard", status: "AVAILABLE" },
  { number: 43, sqft: 1388, cent: 3, remSqft: 81,  dim: "Corner / Tank", facing: "South-West Corner", road: "Water Tank & 30 FT Avenue", status: "AVAILABLE" },
  { number: 44, sqft: 1280, cent: 2, remSqft: 409, dim: "30' x 43'",     facing: "South Facing", road: "30 FT Central Boulevard", status: "AVAILABLE" },
  { number: 45, sqft: 1248, cent: 2, remSqft: 377, dim: "30' x 42'",     facing: "South Facing", road: "30 FT Central Boulevard", status: "AVAILABLE" },
  { number: 46, sqft: 1155, cent: 2, remSqft: 284, dim: "28' x 41'",     facing: "South Facing", road: "30 FT Central Boulevard", status: "AVAILABLE" },
  { number: 47, sqft: 1158, cent: 2, remSqft: 287, dim: "Corner",        facing: "South-West Corner", road: "30 FT Boulevard & West Access", status: "SOLD" }
];
