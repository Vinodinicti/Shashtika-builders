// Master Gallery Database & Image Storage Service
// Handles predefined project developments and custom admin-uploaded site photographs with real-time localStorage sync

export const GALLERY_CATEGORIES = [
  { value: 'all', label: 'ALL CATEGORIES' },
  { value: 'arches', label: 'ENTRANCE ARCH' },
  { value: 'roads', label: 'TAR ROADS' },
  { value: 'construction', label: 'CONSTRUCTION' },
  { value: 'villas', label: 'LUXURY VILLA' },
  { value: 'planning', label: 'TOWN PLANNING' }
];

export const CATEGORY_LABELS = {
  arches: 'ENTRANCE ARCH',
  roads: 'TAR ROADS',
  construction: 'CONSTRUCTION',
  villas: 'LUXURY VILLA',
  planning: 'TOWN PLANNING'
};

export const DEFAULT_GALLERY_IMAGES = [
  {
    id: 'gal-1',
    src: '/Images/Hero_Arch.jpg',
    title: 'Grand Entrance Gate Arch & Palm Boulevard',
    category: 'arches',
    categoryLabel: 'ENTRANCE ARCH',
    location: 'Pollachi Main Road Enclave',
    desc: 'Majestic 40ft wide gated entrance with perimeter security kiosk and illuminated architectural signage.'
  },
  {
    id: 'gal-2',
    src: '/Images/Shashtika_Engineered_Roads.jpg',
    title: '40ft & 30ft Heavy-Duty Asphalt Tar Roads',
    category: 'roads',
    categoryLabel: 'TAR ROADS',
    location: 'Eachanari Bypass Corridor',
    desc: 'Heavy 4-layer bitumen compaction with concrete road kerbs and underground rainwater runoff lines.'
  },
  {
    id: 'gal-3',
    src: '/Images/Shashtika_Process_2_DTCP.jpg',
    title: 'Government DTCP & RERA Approved Blueprints',
    category: 'planning',
    categoryLabel: 'TOWN PLANNING',
    location: 'Kambalampatti, Pollachi',
    desc: '100% sanctioned layout blueprints with 10% dedicated public park space and wide road corridors.'
  },
  {
    id: 'gal-4',
    src: '/Images/Hero_Villa.jpg',
    title: 'Contemporary Luxury Villa Elevation',
    category: 'villas',
    categoryLabel: 'LUXURY VILLA',
    location: 'Kovaipudur Mountain View',
    desc: 'Custom-designed contemporary residential villa with Western Ghats backdrop and private landscaped lawn.'
  },
  {
    id: 'gal-5',
    src: '/Images/Shashtika_Process_4_Arch.jpg',
    title: 'Gated Security Arch & Boundary Enclosure',
    category: 'arches',
    categoryLabel: 'GATED SECURITY',
    location: 'Anaimalai Taluk Enclave',
    desc: 'Gated community perimeter wall with royal palm landscaping and 24/7 security checkpoint.'
  },
  {
    id: 'gal-6',
    src: '/Images/Shashtika_Process_3_Infra.jpg',
    title: 'Underground Stormwater Drainage Network',
    category: 'roads',
    categoryLabel: 'CIVIL INFRA',
    location: 'Coimbatore Regional Corridor',
    desc: 'Engineered drainage system to prevent waterlogging during monsoon seasons and ensure 30+ year road life.'
  },
  {
    id: 'gal-7',
    src: '/Images/Shashtika_Process_5_Handover.jpg',
    title: 'Numbered Concrete Boundary Corner Stones',
    category: 'construction',
    categoryLabel: 'HANDOVER',
    location: 'Kambalampatti Village Layout',
    desc: 'Clearly planted revenue boundary stones demarcating every individual plot for instant possession.'
  },
  {
    id: 'gal-8',
    src: '/Images/Shashtika_Heritage_Story.jpg',
    title: 'Site Engineering & Technical Layout Audit',
    category: 'planning',
    categoryLabel: 'SITE AUDIT',
    location: 'Pollachi Heritage Enclave',
    desc: 'On-site technical evaluation, groundwater quality testing, and contour mapping by senior civil engineers.'
  },
  {
    id: 'gal-9',
    src: '/Images/Upcoming_Emerald_Palms.jpg',
    title: 'Emerald Palms Gated Residential Layout',
    category: 'villas',
    categoryLabel: 'RESIDENTIAL',
    location: 'Kinathukadavu Bypass',
    desc: 'Scenic plotted enclave nestled amidst coconut groves with 33ft central avenue and sweet groundwater.'
  },
  {
    id: 'gal-10',
    src: '/Images/Construction_Underway.jpg',
    title: 'Road Sub-Base Compaction & Kerbing',
    category: 'construction',
    categoryLabel: 'CONSTRUCTION',
    location: 'Pollachi Corridor Layout',
    desc: 'Mechanical roller compaction of wet-mix macadam stone base prior to asphalt tar paving.'
  },
  {
    id: 'gal-11',
    src: '/Images/Upcoming_Royal_Enclave.jpg',
    title: 'Royal Enclave Master Plotted Township',
    category: 'arches',
    categoryLabel: 'COMMUNITY',
    location: 'Coimbatore Airport Corridor',
    desc: 'Master-planned layout with solar street lighting, underground utilities, and landscaped walkways.'
  },
  {
    id: 'gal-12',
    src: '/Images/Construction_75_Percent.jpg',
    title: 'Tar Road Paving & Solar Luminaire Installation',
    category: 'construction',
    categoryLabel: 'CONSTRUCTION',
    location: 'Anaimalai Highway',
    desc: 'Hot-mix asphalt surfacing and automatic solar street luminaire poles erected across all layout streets.'
  },
  {
    id: 'gal-13',
    src: '/Images/Shashtika_Legacy_Appreciation.jpg',
    title: 'Coconut Grove Agro-Residential Farm Layout',
    category: 'roads',
    categoryLabel: 'GREEN LAYOUT',
    location: 'Mahalingapuram, Pollachi',
    desc: 'Lush greenery, copiously sweet drinking groundwater, and scenic mountain views for tranquil living.'
  },
  {
    id: 'gal-14',
    src: '/Images/Masterplan_Kambalapatti.png',
    title: 'Approved DTCP No. 02/2025 Blueprint Plan',
    category: 'planning',
    categoryLabel: 'BLUEPRINT',
    location: 'S.F.No 209/1 & 222/1A1',
    desc: 'Official 64-plot DTCP approved layout map with 12m Panchayat tar roads and dedicated public park.'
  },
  {
    id: 'gal-15',
    src: '/Images/Upcoming_Green_Valley.jpg',
    title: 'Green Valley Foothill Residential Enclave',
    category: 'villas',
    categoryLabel: 'FOOTHILL ESTATE',
    location: 'Kovaipudur Foothills',
    desc: 'Boutique residential enclave surrounded by scenic hills, cool breeze, and 100% clear parent deeds.'
  },
  {
    id: 'gal-16',
    src: '/Images/Construction_Key_Handover.jpg',
    title: 'Plot Possession & Title Deed Handover',
    category: 'construction',
    categoryLabel: 'HANDOVER',
    location: 'Sub-Registrar Office, Pollachi',
    desc: 'Assisted registration, clear sale deed execution, and individual Patta transfer completed for plot owners.'
  }
];

export const STORAGE_KEY_GALLERY = 'shashtika_custom_gallery_images';

export function loadCustomGalleryImages() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_GALLERY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Error loading custom gallery images:', e);
    return [];
  }
}

export function saveCustomGalleryImages(images) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_GALLERY, JSON.stringify(images));
    window.dispatchEvent(new Event('shashtika_gallery_updated'));
  } catch (e) {
    console.error('Error saving custom gallery images:', e);
    throw e;
  }
}

// Compress uploaded client images so they fit efficiently into localStorage without quota issues
export function compressImageFile(file, maxWidth = 1200, maxHeight = 900, quality = 0.8) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error('No file provided'));
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}
