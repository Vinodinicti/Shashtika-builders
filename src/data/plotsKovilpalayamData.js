// ==========================================================================
// SHASHTIKA - KOVILPALAYAM (MAGIZHUM NAGAR) LAYOUT MASTERPLAN DATA
// DTCP Approved Individual Villas & Plots (32 Plots Only)
// Pollachi Main Road, Kovilpalayam, Coimbatore District, Tamil Nadu
// Exactly transcribed from official approved blueprint flyer
// Google Maps: https://maps.app.goo.gl/u5u8yJGThUuk6nq39?g_st=iw
// ==========================================================================

export const KOVILPALAYAM_METADATA = {
  id: "kovilpalayam",
  name: "SHASHTIKA MAGIZHUM NAGAR",
  shortName: "Kovilpalayam Layout",
  englishTitle: "LAYOUT PLAN SHOWING THE HOUSE SITES IN KOVILPALAYAM COIMBATORE",
  tamilTitle: "மகிழும் நகர் - பொள்ளாச்சி மெயின் ரோடு, கோவில்பாளையம்",
  subTitleBanner: "உங்கள் கனவு மனையை மகிழும் நகரில் இன்றே வாங்குங்கள்",
  location: "Pollachi Main Road, Kovilpalayam, Coimbatore District, Tamil Nadu",
  googleMapsUrl: "https://maps.app.goo.gl/u5u8yJGThUuk6nq39?g_st=iw",
  approvalNo: "DTCP APPROVED (32 மனைகள் மட்டும்)",
  sfNumbers: "Pollachi Main Road Corridor, Kovilpalayam",
  totalPlots: 32,
  totalArea: "76,500 SQ.FT (1 ACRE 75 CENTS)",
  boundaries: {
    north: "267'-1\" [81.40m]",
    east: "296'-4\" [90.32m]",
    south: "364'-11\" [111.22m]",
    west: "307'-9\" [93.80m] (40-0\" Wide Layout Road / Pollachi Main Road)"
  },
  roads: {
    panchayatNorth: "Proposed 7.20m (24 FT) Layout Tar Road",
    panchayatWest: "40'-0\" (12.20m) Wide Pollachi Main Road / State Highway",
    mainAvenue: "9.00m (30 FT) Wide Layout Entrance Tar Road",
    crossRoad1: "7.20m (24 FT) Wide Internal Tar Road",
    crossRoad2: "7.20m (24 FT) Wide Top Avenue Road"
  },
  amenities: {
    solar: "சோலார் மின் விளக்கு (Solar Street Lighting System)",
    road: "40 அடி பிரதான சாலை & 30 அடி / 24 அடி தார் சாலைகள்",
    gated: "Gated கம்யூனிட்டி & பாதுகாப்பு நுழைவு வளைவு",
    water: "ஏராளமான சுவை நிலத்தடி நீர் வசதி",
    vastu: "100% வாஸ்து முறைப்படி அமையப்பெற்ற வீட்டுமனைகள்"
  },
  contactPhones: ["63813 78235", "96296 75851", "93635 99754"],
  locationHighlights: {
    title: "Kovilpalayam Layout Highlights",
    subtitle: "Pollachi Main Road Corridor, Coimbatore District",
    image: "/Images/Kovilpalayam_Plan.jpg",
    imageCaption: "Magizhum Nagar - 32 DTCP Villa Plots",
    tag: "LOCATION & AMENITIES",
    mapsUrl: "https://maps.app.goo.gl/u5u8yJGThUuk6nq39?g_st=iw",
    points: [
      "Direct frontage on 40 FT (12.20m) Pollachi Main Road State Highway",
      "Just 10 minutes travel distance from Pollachi Town centre",
      "Very close to reputed schools, matriculation institutes & colleges",
      "Solar street lighting infrastructure across all layout avenues",
      "Wide 40 FT, 30 FT (9.00m) and 24 FT (7.20m) heavy-duty asphalt tar roads",
      "Fully secured Gated Community with grand entrance and compound",
      "Copious potable sweet groundwater with high sweet water table",
      "100% Vastu-compliant layout designed for immediate living & investment",
      "DTCP Approved with clear parent documents & bank loan support",
      "Instant spot registration & individual revenue Patta transfer"
    ]
  }
};

// Exact 32 plots matching the blueprint flyer table (Plot No, Facing, Cent, Area Sq.m, Area Sq.Ft)
export const KOVILPALAYAM_PLOTS_DATA = [
  { number: 1,  sqft: 2862, cent: 6, remSqft: 248, sqMtr: 265.89, dim: "Corner",    facing: "North Facing / West Highway", road: "40 FT Highway & 9.00m Road", status: "AVAILABLE" },
  { number: 2,  sqft: 2139, cent: 4, remSqft: 397, sqMtr: 198.72, dim: "31' x 69'",  facing: "North Facing", road: "9.00m Wide Layout Road", status: "AVAILABLE" },
  { number: 3,  sqft: 1526, cent: 3, remSqft: 219, sqMtr: 141.77, dim: "Corner",    facing: "North-East Corner", road: "9.00m Road & Arch Entry", status: "PRE-BOOKED" },
  { number: 4,  sqft: 1500, cent: 3, remSqft: 193, sqMtr: 139.35, dim: "30' x 50'",  facing: "East Facing", road: "9.00m Entrance Avenue", status: "AVAILABLE" },
  { number: 5,  sqft: 1912, cent: 4, remSqft: 170, sqMtr: 177.63, dim: "Corner",    facing: "North-West Corner", road: "9.00m Wide Layout Road", status: "AVAILABLE" },
  { number: 6,  sqft: 1898, cent: 4, remSqft: 156, sqMtr: 176.33, dim: "31' x 61'",  facing: "North Facing", road: "9.00m Wide Layout Road", status: "AVAILABLE" },
  { number: 7,  sqft: 1877, cent: 4, remSqft: 135, sqMtr: 174.38, dim: "31' x 60'",  facing: "North Facing", road: "9.00m Wide Layout Road", status: "SOLD" },
  { number: 8,  sqft: 1855, cent: 4, remSqft: 113, sqMtr: 172.33, dim: "31' x 60'",  facing: "North Facing", road: "9.00m Wide Layout Road", status: "AVAILABLE" },
  { number: 9,  sqft: 1875, cent: 4, remSqft: 133, sqMtr: 174.19, dim: "Corner",    facing: "North Facing / East", road: "9.00m Wide Layout Road", status: "AVAILABLE" },
  { number: 10, sqft: 1659, cent: 3, remSqft: 352, sqMtr: 154.12, dim: "Corner",    facing: "South Facing / East", road: "7.20m Wide Layout Road", status: "AVAILABLE" },
  { number: 11, sqft: 1722, cent: 3, remSqft: 415, sqMtr: 159.98, dim: "31' x 55'",  facing: "South Facing", road: "7.20m Wide Layout Road", status: "PRE-BOOKED" },
  { number: 12, sqft: 1722, cent: 3, remSqft: 415, sqMtr: 159.98, dim: "31' x 55'",  facing: "South Facing", road: "7.20m Wide Layout Road", status: "AVAILABLE" },
  { number: 13, sqft: 1722, cent: 3, remSqft: 415, sqMtr: 159.98, dim: "31' x 55'",  facing: "South Facing", road: "7.20m Wide Layout Road", status: "AVAILABLE" },
  { number: 14, sqft: 1722, cent: 3, remSqft: 415, sqMtr: 159.98, dim: "31' x 55'",  facing: "South Facing", road: "7.20m Wide Layout Road", status: "AVAILABLE" },
  { number: 15, sqft: 1722, cent: 3, remSqft: 415, sqMtr: 159.98, dim: "31' x 55'",  facing: "South Facing", road: "7.20m Wide Layout Road", status: "SOLD" },
  { number: 16, sqft: 1722, cent: 3, remSqft: 415, sqMtr: 159.98, dim: "31' x 55'",  facing: "South Facing", road: "7.20m Wide Layout Road", status: "AVAILABLE" },
  { number: 17, sqft: 1722, cent: 3, remSqft: 415, sqMtr: 159.98, dim: "31' x 55'",  facing: "South Facing", road: "7.20m Wide Layout Road", status: "AVAILABLE" },
  { number: 18, sqft: 2433, cent: 5, remSqft: 255, sqMtr: 226.03, dim: "Corner",    facing: "South-West Corner", road: "40 FT Highway & 7.20m Road", status: "AVAILABLE" },
  { number: 19, sqft: 3895, cent: 8, remSqft: 410, sqMtr: 361.85, dim: "Corner",    facing: "North-West Corner", road: "40 FT Highway & 7.20m Road", status: "AVAILABLE" },
  { number: 20, sqft: 2873, cent: 6, remSqft: 259, sqMtr: 266.91, dim: "33' x 87'",  facing: "North Facing", road: "7.20m Wide Layout Road", status: "PRE-BOOKED" },
  { number: 21, sqft: 2873, cent: 6, remSqft: 259, sqMtr: 266.91, dim: "33' x 87'",  facing: "North Facing", road: "7.20m Wide Layout Road", status: "AVAILABLE" },
  { number: 22, sqft: 2873, cent: 6, remSqft: 259, sqMtr: 266.91, dim: "33' x 87'",  facing: "North Facing", road: "7.20m Wide Layout Road", status: "AVAILABLE" },
  { number: 23, sqft: 2873, cent: 6, remSqft: 259, sqMtr: 266.91, dim: "33' x 87'",  facing: "North Facing", road: "7.20m Wide Layout Road", status: "SOLD" },
  { number: 24, sqft: 2873, cent: 6, remSqft: 259, sqMtr: 266.91, dim: "33' x 87'",  facing: "North Facing", road: "7.20m Wide Layout Road", status: "AVAILABLE" },
  { number: 25, sqft: 2937, cent: 6, remSqft: 323, sqMtr: 272.85, dim: "Corner",    facing: "North Facing / East", road: "7.20m Wide Layout Road", status: "AVAILABLE" },
  { number: 26, sqft: 1713, cent: 3, remSqft: 406, sqMtr: 159.14, dim: "Corner",    facing: "South Facing / East", road: "7.20m Top Layout Road", status: "AVAILABLE" },
  { number: 27, sqft: 1848, cent: 4, remSqft: 106, sqMtr: 171.68, dim: "30' x 61'",  facing: "South Facing", road: "7.20m Top Layout Road", status: "AVAILABLE" },
  { number: 28, sqft: 1938, cent: 4, remSqft: 196, sqMtr: 180.04, dim: "31' x 62'",  facing: "South Facing", road: "7.20m Top Layout Road", status: "AVAILABLE" },
  { number: 29, sqft: 2029, cent: 4, remSqft: 287, sqMtr: 188.50, dim: "31' x 65'",  facing: "South Facing", road: "7.20m Top Layout Road", status: "PRE-BOOKED" },
  { number: 30, sqft: 2119, cent: 4, remSqft: 377, sqMtr: 196.84, dim: "31' x 68'",  facing: "South Facing", road: "7.20m Top Layout Road", status: "AVAILABLE" },
  { number: 31, sqft: 2210, cent: 5, remSqft: 32,  sqMtr: 205.31, dim: "31' x 71'",  facing: "South Facing", road: "7.20m Top Layout Road", status: "AVAILABLE" },
  { number: 32, sqft: 3359, cent: 7, remSqft: 310, sqMtr: 312.08, dim: "Corner",    facing: "South-West Corner", road: "40 FT Highway & 7.20m Road", status: "AVAILABLE" }
];
