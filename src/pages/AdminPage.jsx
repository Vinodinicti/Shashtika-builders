import React, { useState, useEffect, useMemo } from 'react';
import { PLOTS_DATA, PROJECT_METADATA } from '../data/plotsKambalapattiData';
import { KINATHUKADAVU_PLOTS_DATA, KINATHUKADAVU_METADATA } from '../data/plotsKinathukadavuData';
import {
  DEFAULT_GALLERY_IMAGES,
  GALLERY_CATEGORIES,
  CATEGORY_LABELS,
  loadMasterGalleryImages,
  saveMasterGalleryImages,
  resetMasterGalleryImages,
  compressImageFile
} from '../data/galleryData';

// Default Staff Roster with Names and WhatsApp Mobile Numbers
const DEFAULT_STAFF_ROSTER = [
  { id: 'STAFF-1', name: 'Ramesh Kumar (Senior Sales Lead)', phone: '9363599754' },
  { id: 'STAFF-2', name: 'Priya Sharma (Client Advisor)', phone: '9842218451' },
  { id: 'STAFF-3', name: 'Karthik V (Site Manager)', phone: '9789044321' },
  { id: 'STAFF-4', name: 'Anitha Raj (Relationship Manager)', phone: '9894031256' },
  { id: 'STAFF-5', name: 'Suresh Babu (Executive Officer)', phone: '9361088214' }
];

const normalizeStaffRoster = (raw) => {
  if (!Array.isArray(raw) || raw.length === 0) return DEFAULT_STAFF_ROSTER;
  return raw.map((item, idx) => {
    if (typeof item === 'string') {
      return {
        id: `STAFF-${idx + 1}`,
        name: item,
        phone: idx === 0 ? '9363599754' : `984220000${idx + 1}`
      };
    }
    return {
      id: item.id || `STAFF-${idx + 1}`,
      name: item.name || `Staff ${idx + 1}`,
      phone: item.phone || (idx === 0 ? '9363599754' : `984220000${idx + 1}`)
    };
  });
};

// Default Scored AI Leads matching old project format
const DEFAULT_AI_LEADS = [
  {
    id: 'LEAD-901',
    name: 'Rajesh Kumar',
    phone: '+91 98422 18450',
    email: 'rajesh.k@gmail.com',
    location: 'Coimbatore & Pollachi',
    purpose: 'Immediate Villa Construction',
    budget: '₹35L - ₹40L',
    timeline: 'Immediate (Within 7 Days)',
    targetPlot: 'Plot #01 Corner (1615 Sq.Ft)',
    score: 96,
    category: 'HOT',
    assignedStaff: 'Ramesh Kumar (Senior Sales Lead)',
    actionTaken: 'IN PROGRESS',
    recommendation: 'Call immediately with Kambalapatti corner plot layout blueprint; client visited site on Sunday and is ready to transfer booking token.',
    date: '14 Oct 2026, 11:30 AM',
    notes: 'Visited site with family. Ready to execute initial booking token agreement.'
  },
  {
    id: 'LEAD-902',
    name: 'Meenakshi Sundaram',
    phone: '+91 94433 72190',
    email: 'meenakshi.s@outlook.com',
    location: 'Anaimalai Highway Corridor',
    purpose: 'NRI Capital Investment',
    budget: '₹28L - ₹32L',
    timeline: 'Within 15 Days',
    targetPlot: 'Plot #14 East Facing (1142 Sq.Ft)',
    score: 92,
    category: 'HOT',
    assignedStaff: 'Priya Sharma (Client Advisor)',
    actionTaken: 'SITE VISIT SCHEDULED',
    recommendation: 'Arrange video walk-through with site engineer to inspect 12.00m Panchayat tar road and DTCP approval documents.',
    date: '14 Oct 2026, 09:15 AM',
    notes: 'Requested DTCP approval copy & guideline value document for NRI investment.'
  },
  {
    id: 'LEAD-903',
    name: 'Karthik Veeramani',
    phone: '+91 97890 44321',
    email: 'karthik.v@techcorp.in',
    location: 'Pollachi Green Vistas',
    purpose: 'Residential Farm Plot',
    budget: '₹22L - ₹26L',
    timeline: 'Within 30 Days',
    targetPlot: 'Plot #07 North Facing (1235 Sq.Ft)',
    score: 78,
    category: 'WARM',
    assignedStaff: 'Karthik V (Site Manager)',
    actionTaken: 'CONTACTED',
    recommendation: 'Send bank loan pre-approval calculation sheet (HDFC / SBI / Canara) and site photos.',
    date: '13 Oct 2026, 04:45 PM',
    notes: 'Software professional based in Pollachi, planning retirement villa.'
  },
  {
    id: 'LEAD-904',
    name: 'Anandhan Swaminathan',
    phone: '+91 98940 31256',
    email: 'anandhan.s@gmail.com',
    location: 'Kambalapatti Village',
    purpose: 'Long-Term Land Appreciation',
    budget: '₹20L - ₹25L',
    timeline: '45-60 Days',
    targetPlot: 'Plot #22 North Facing (1142 Sq.Ft)',
    score: 68,
    category: 'WARM',
    assignedStaff: 'Anitha Raj (Relationship Manager)',
    actionTaken: 'CONTACTED',
    recommendation: 'Follow up after 10 days; clarify TANGEDCO EB transformer reserve distance and water storage availability.',
    date: '13 Oct 2026, 02:10 PM',
    notes: 'Enquired about upcoming phase 2 development schedule.'
  },
  {
    id: 'LEAD-905',
    name: 'Dr. Priya Ramanathan',
    phone: '+91 93610 88214',
    email: 'priya.raman@apollohospital.org',
    location: 'Coimbatore District',
    purpose: 'Future Farmhouse Investment',
    budget: 'Flexible',
    timeline: '6+ Months',
    targetPlot: 'Open for recommendation (2-3 Cents)',
    score: 46,
    category: 'COLD',
    assignedStaff: 'Suresh Babu (Executive Officer)',
    actionTaken: 'REJECTED',
    recommendation: 'Add to quarterly brochure newsletter; long-term agricultural boundary investor.',
    date: '12 Oct 2026, 06:20 PM',
    notes: 'Enquired about park boundary & EB powerline height clearance.'
  }
];

// Default Customers Registry matching old project format
const DEFAULT_CUSTOMERS = [
  {
    id: 'CUST-MAN-10294',
    name: 'Rajesh Kumar',
    phone: '+91 98422 18450',
    email: 'rajesh.k@gmail.com',
    requirement: 'Plot #01 Corner (1615 Sq.Ft), Kambalapatti',
    assignedStaff: 'Ramesh Kumar (Senior Sales Lead)',
    actionTaken: 'TOKEN PAID',
    stage: 'TOKEN_PAID',
    source: 'MANUAL WALK-IN',
    date: '14 Oct 2026, 11:30 AM',
    notes: 'Token ₹1,00,000 received via RTGS. Document drafting for registration in progress.'
  },
  {
    id: 'CUST-WEB-10381',
    name: 'Meenakshi Sundaram',
    phone: '+91 94433 72190',
    email: 'meenakshi.s@outlook.com',
    requirement: 'Plot #14 East Facing (1142 Sq.Ft), Kambalapatti',
    assignedStaff: 'Priya Sharma (Client Advisor)',
    actionTaken: 'SITE VISIT SCHEDULED',
    stage: 'INQUIRY',
    source: 'WEB ENQUIRY',
    date: '14 Oct 2026, 09:15 AM',
    notes: 'Site visit scheduled for upcoming Saturday 10:30 AM with family.'
  },
  {
    id: 'CUST-MAN-10115',
    name: 'V. Balasubramaniam',
    phone: '+91 98428 55102',
    email: 'balu.pollachi@gmail.com',
    requirement: 'Plot #05 North Facing (1178 Sq.Ft), Kambalapatti',
    assignedStaff: 'Ramesh Kumar (Senior Sales Lead)',
    actionTaken: 'TOKEN PAID',
    stage: 'BOUGHT',
    source: 'MANUAL WALK-IN',
    date: '10 Oct 2026, 03:00 PM',
    notes: 'Full payment completed. Registration deed executed at Pollachi Sub-Registrar office.'
  },
  {
    id: 'CUST-WEB-10082',
    name: 'Dr. Priya Ramanathan',
    phone: '+91 93610 88214',
    email: 'priya.raman@apollohospital.org',
    requirement: 'General Layout Enquiry, Kambalapatti',
    assignedStaff: 'Suresh Babu (Executive Officer)',
    actionTaken: 'REJECTED',
    stage: 'REJECTED',
    source: 'WEB ENQUIRY',
    date: '08 Oct 2026, 05:40 PM',
    notes: 'Looking for 1 acre agricultural farmland; not interested in residential plots currently.'
  }
];

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return (
      sessionStorage.getItem('shashtika_admin_auth') === 'true' ||
      sessionStorage.getItem('vels_admin_authenticated') === 'true'
    );
  });

  // Login Form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab: 'ai-leads' | 'plot-management' | 'customer-tracker'
  const [activeTab, setActiveTab] = useState(() => {
    const saved = localStorage.getItem('shashtika_admin_active_tab');
    if (saved && saved !== 'upcoming-projects') return saved;
    return 'ai-leads';
  });

  // Staff & Agent Roster with WhatsApp Mobile Numbers
  const [staffRoster, setStaffRoster] = useState(() => {
    const saved = localStorage.getItem('shashtika_staff_roster') || localStorage.getItem('vels_staff_roster');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return normalizeStaffRoster(parsed);
      } catch (e) {}
    }
    return DEFAULT_STAFF_ROSTER;
  });

  const [staffModalOpen, setStaffModalOpen] = useState(false);
  const [tempStaff, setTempStaff] = useState(() => normalizeStaffRoster(staffRoster));

  const defaultStaffName = (staffRoster[0] && (typeof staffRoster[0] === 'string' ? staffRoster[0] : staffRoster[0].name)) || 'Ramesh Kumar (Senior Sales Lead)';

  // AI Leads State
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('shashtika_admin_leads');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return DEFAULT_AI_LEADS;
  });

  const [leadCategoryFilter, setLeadCategoryFilter] = useState('ALL');
  const [leadSearchQuery, setLeadSearchQuery] = useState('');

  // Active Plot Location for Admin Management
  const [adminPlotLocation, setAdminPlotLocation] = useState('kambalampatti');

  // Kambalampatti Plots State
  const [kambalaPlots, setKambalaPlots] = useState(() => {
    const saved = localStorage.getItem('shashtika_plots_inventory');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return PLOTS_DATA;
  });

  // Kinathukadavu Plots State
  const [kinathuPlots, setKinathuPlots] = useState(() => {
    const saved = localStorage.getItem('shashtika_plots_inventory_kinathukadavu');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return KINATHUKADAVU_PLOTS_DATA;
  });

  // Active plot list and metadata
  const plots = adminPlotLocation === 'kambalampatti' ? kambalaPlots : kinathuPlots;
  const currentAdminMetadata = adminPlotLocation === 'kambalampatti' ? PROJECT_METADATA : KINATHUKADAVU_METADATA;

  const [plotStatusFilter, setPlotStatusFilter] = useState('ALL');
  const [plotSearchQuery, setPlotSearchQuery] = useState('');
  const [plotCurrentPage, setPlotCurrentPage] = useState(1);
  const plotPageSize = 25;

  // Customer Pipeline Registry State
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('shashtika_customers_registry') || localStorage.getItem('vels_manual_customers');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return DEFAULT_CUSTOMERS;
  });

  const [customerFilter, setCustomerFilter] = useState('ALL');
  const [customerSearchQuery, setCustomerSearchQuery] = useState('');
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [editingCustId, setEditingCustId] = useState(null);

  const [custForm, setCustForm] = useState({
    name: '',
    phone: '',
    email: '',
    requirement: '',
    assignedStaff: DEFAULT_STAFF_ROSTER[0].name,
    stage: 'INQUIRY',
    notes: ''
  });

  // Project Developments & Photo Gallery State (Master editable list)
  const [galleryList, setGalleryList] = useState(() => loadMasterGalleryImages());
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [gallerySearchQuery, setGallerySearchQuery] = useState('');
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [galleryUploadSuccess, setGalleryUploadSuccess] = useState('');
  const [galleryUploadError, setGalleryUploadError] = useState('');
  
  // Add new photo form
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'arches',
    location: 'Kambalampatti, Pollachi',
    desc: '',
    src: ''
  });
  const [galleryPreview, setGalleryPreview] = useState('');

  // Edit photo modal state
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [editForm, setEditForm] = useState({
    id: '',
    title: '',
    category: 'arches',
    categoryLabel: '',
    location: '',
    desc: '',
    src: ''
  });
  const [editPreview, setEditPreview] = useState('');
  const [editUploading, setEditUploading] = useState(false);
  const [editError, setEditError] = useState('');

  // Lightbox preview modal state
  const [adminGalleryLightboxImg, setAdminGalleryLightboxImg] = useState(null);

  // Sync gallery images across tabs / windows
  useEffect(() => {
    const handleGallerySync = () => {
      setGalleryList(loadMasterGalleryImages());
    };
    window.addEventListener('shashtika_gallery_updated', handleGallerySync);
    window.addEventListener('storage', handleGallerySync);
    return () => {
      window.removeEventListener('shashtika_gallery_updated', handleGallerySync);
      window.removeEventListener('storage', handleGallerySync);
    };
  }, []);

  const handleGalleryFileChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setGalleryUploadError('Please select a valid image file (JPEG, PNG, WebP).');
      return;
    }

    setGalleryUploading(true);
    setGalleryUploadError('');
    try {
      const compressedDataUrl = await compressImageFile(file, 1200, 900, 0.82);
      setGalleryPreview(compressedDataUrl);
      setGalleryForm((prev) => ({ ...prev, src: compressedDataUrl }));
    } catch (err) {
      console.error('Image compression failed:', err);
      setGalleryUploadError('Failed to process image. You can also paste an image URL directly.');
    } finally {
      setGalleryUploading(false);
    }
  };

  const handleAddGalleryPhoto = (e) => {
    e.preventDefault();
    const finalSrc = galleryPreview || galleryForm.src.trim();
    if (!finalSrc) {
      setGalleryUploadError('Please choose a photo file or provide an image URL.');
      return;
    }
    if (!galleryForm.title.trim()) {
      setGalleryUploadError('Please enter a title for this site photo.');
      return;
    }

    const newPhoto = {
      id: `gal-${Date.now()}`,
      src: finalSrc,
      title: galleryForm.title.trim(),
      category: galleryForm.category,
      categoryLabel: CATEGORY_LABELS[galleryForm.category] || 'PROJECT UPDATE',
      location: galleryForm.location.trim() || 'Pollachi & Coimbatore Corridor',
      desc: galleryForm.desc.trim() || 'Live on-site layout progress update captured by SHASHTIKA site team.',
      dateAdded: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      isCustom: true
    };

    try {
      const updated = [newPhoto, ...galleryList];
      saveMasterGalleryImages(updated);
      setGalleryList(updated);
      setGalleryPreview('');
      setGalleryForm({
        title: '',
        category: 'arches',
        location: 'Kambalampatti, Pollachi',
        desc: '',
        src: ''
      });
      setGalleryUploadError('');
      setGalleryUploadSuccess(`Photo "${newPhoto.title}" added to gallery! Visible immediately on the public gallery page.`);
      setTimeout(() => setGalleryUploadSuccess(''), 6000);
    } catch (err) {
      setGalleryUploadError('Storage quota exceeded. Please remove older photos or use smaller files.');
    }
  };

  // Open Edit Photo Modal
  const handleOpenEditPhoto = (photo) => {
    setEditingPhoto(photo);
    setEditForm({
      id: photo.id,
      title: photo.title || '',
      category: photo.category || 'arches',
      categoryLabel: photo.categoryLabel || CATEGORY_LABELS[photo.category] || 'PROJECT UPDATE',
      location: photo.location || '',
      desc: photo.desc || '',
      src: photo.src || ''
    });
    setEditPreview(photo.src || '');
    setEditError('');
  };

  const handleEditFileChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setEditError('Please select a valid image file (JPEG, PNG, WebP).');
      return;
    }

    setEditUploading(true);
    setEditError('');
    try {
      const compressedDataUrl = await compressImageFile(file, 1200, 900, 0.82);
      setEditPreview(compressedDataUrl);
      setEditForm((prev) => ({ ...prev, src: compressedDataUrl }));
    } catch (err) {
      console.error('Image compression failed:', err);
      setEditError('Failed to process image file.');
    } finally {
      setEditUploading(false);
    }
  };

  const handleSaveEditPhoto = (e) => {
    e.preventDefault();
    const finalSrc = editPreview || editForm.src.trim();
    if (!finalSrc) {
      setEditError('Image cannot be empty. Please select a photo or enter an image URL.');
      return;
    }
    if (!editForm.title.trim()) {
      setEditError('Title cannot be empty.');
      return;
    }

    try {
      const updated = galleryList.map((item) => {
        if (item.id === editingPhoto.id) {
          return {
            ...item,
            title: editForm.title.trim(),
            category: editForm.category,
            categoryLabel: editForm.categoryLabel.trim() || CATEGORY_LABELS[editForm.category] || 'PROJECT UPDATE',
            location: editForm.location.trim() || 'Pollachi & Coimbatore Corridor',
            desc: editForm.desc.trim(),
            src: finalSrc,
            lastEdited: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
          };
        }
        return item;
      });

      saveMasterGalleryImages(updated);
      setGalleryList(updated);
      setEditingPhoto(null);
      setGalleryUploadSuccess(`Photo "${editForm.title}" updated successfully!`);
      setTimeout(() => setGalleryUploadSuccess(''), 5000);
    } catch (err) {
      setEditError('Storage quota exceeded. Please use smaller image files.');
    }
  };

  // Remove ANY photo from gallery (current default or custom added)
  const handleDeleteGalleryPhoto = (photoId, photoTitle) => {
    if (window.confirm(`Are you sure you want to remove "${photoTitle}" from the public gallery?`)) {
      const updated = galleryList.filter((img) => img.id !== photoId);
      saveMasterGalleryImages(updated);
      setGalleryList(updated);
      setGalleryUploadSuccess(`Photo "${photoTitle}" removed from gallery.`);
      setTimeout(() => setGalleryUploadSuccess(''), 4000);
    }
  };

  // Restore the original 16 default catalog photos
  const handleResetGalleryToDefault = () => {
    if (window.confirm('Are you sure you want to restore the original 16 default catalog photos? Any custom additions or edits will be reset.')) {
      const restored = resetMasterGalleryImages();
      setGalleryList(restored);
      setGalleryUploadSuccess('Gallery reset to original 16 default layout photos.');
      setTimeout(() => setGalleryUploadSuccess(''), 5000);
    }
  };

  const allAdminGalleryImages = galleryList;

  const filteredAdminGalleryImages = useMemo(() => {
    return allAdminGalleryImages.filter((item) => {
      const matchCat = galleryFilter === 'all' || item.category === galleryFilter;
      const q = gallerySearchQuery.toLowerCase().trim();
      if (!q) return matchCat;
      const matchSearch =
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.location && item.location.toLowerCase().includes(q)) ||
        (item.desc && item.desc.toLowerCase().includes(q)) ||
        (item.categoryLabel && item.categoryLabel.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [allAdminGalleryImages, galleryFilter, gallerySearchQuery]);

  // Persist State to localStorage
  useEffect(() => {
    localStorage.setItem('shashtika_admin_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('shashtika_plots_inventory', JSON.stringify(kambalaPlots));
    window.dispatchEvent(new Event('shashtika_plot_updated'));
  }, [kambalaPlots]);

  useEffect(() => {
    localStorage.setItem('shashtika_plots_inventory_kinathukadavu', JSON.stringify(kinathuPlots));
    window.dispatchEvent(new Event('shashtika_plot_updated'));
  }, [kinathuPlots]);

  useEffect(() => {
    localStorage.setItem('shashtika_customers_registry', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('shashtika_staff_roster', JSON.stringify(staffRoster));
  }, [staffRoster]);

  useEffect(() => {
    localStorage.setItem('shashtika_admin_active_tab', activeTab);
  }, [activeTab]);

  // Synchronize live incoming enquiries from backend API and localStorage
  const syncLiveEnquiries = async () => {
    try {
      let backendList = [];
      try {
        const res = await fetch('/api/enquiries');
        if (res.ok) {
          const json = await res.json();
          if (json && json.success && Array.isArray(json.data)) {
            backendList = json.data;
          }
        }
      } catch (err) {
        try {
          const res2 = await fetch('http://localhost:5000/api/enquiries');
          if (res2.ok) {
            const json2 = await res2.json();
            if (json2 && json2.success && Array.isArray(json2.data)) {
              backendList = json2.data;
            }
          }
        } catch (e2) {}
      }

      let localEnquiries = [];
      try {
        const parsed = JSON.parse(localStorage.getItem('shashtika_enquiries') || '[]');
        if (Array.isArray(parsed)) localEnquiries = parsed;
      } catch (e) {}
      
      // Combine unique enquiries safely
      const allRaw = [...backendList];
      localEnquiries.forEach((item) => {
        if (!item) return;
        const cleanP = String(item.phone || '').replace(/\D/g, '').slice(-10);
        const itemId = String(item.id || '');
        if (!allRaw.some((b) => b && (String(b.id || '') === itemId || (cleanP && String(b.phone || '').replace(/\D/g, '').slice(-10) === cleanP)))) {
          allRaw.push(item);
        }
      });

      if (allRaw.length > 0) {
        let readSet = new Set();
        try {
          readSet = new Set(JSON.parse(localStorage.getItem('shashtika_read_enquiries') || '[]'));
        } catch (e) {}

        // Map to leads format with strict type guards
        const convertedLeads = allRaw.map((item) => {
          const plotRaw = String(item.plotNumber || item.targetPlot || 'General Layout');
          const msgRaw = String(item.message || item.notes || '');
          const hasSpecificPlot = plotRaw && !/general|layout|any/i.test(plotRaw);
          const hasCustomNotes = msgRaw && msgRaw.length >= 8 && !/^(site visit request)$/i.test(msgRaw);

          let score = Number(item.aiScore);
          if (!score || isNaN(score)) {
            score = 75;
            if (hasSpecificPlot) score += 10;
            if (hasCustomNotes) score += 10;
          }
          // If specific plot and custom notes provided -> AUTOMATIC HIGH PRIORITY HOT LEAD (92-98)
          if (hasSpecificPlot && hasCustomNotes) {
            score = Math.max(score, 94);
          }
          const cat = score >= 80 ? 'HOT' : score >= 60 ? 'WARM' : 'COLD';
          const dt = item.createdAt 
            ? new Date(item.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
            : String(item.date || 'Today');

          const isAlreadyRead = readSet.has(String(item.id)) || item.isNew === false;

          return {
            id: String(item.id || `LEAD-${Date.now()}`),
            name: String(item.customerName || item.name || 'Direct Enquirer'),
            phone: String(item.phone || ''),
            email: String(item.email || 'N/A'),
            location: String(item.project || item.location || 'Coimbatore & Pollachi Corridors'),
            purpose: String(item.purpose || 'Residential Construction'),
            budget: String(item.budget || '₹ 25.00 - 40.00 Lakhs'),
            timeline: String(item.timeline || 'Immediate'),
            targetPlot: plotRaw.toLowerCase().startsWith('plot') ? plotRaw : `Plot #${plotRaw}`,
            score: score,
            category: cat,
            assignedStaff: String(item.assignedStaff || DEFAULT_STAFF_ROSTER[0].name),
            actionTaken: String(item.actionTaken || 'NEW LEAD'),
            recommendation: String(item.aiSummary || item.recommendedAction || item.recommendation || 'Direct call from Senior Project Engineer within 30 minutes'),
            date: dt,
            isNew: !isAlreadyRead && Boolean(item.isNew || item.actionTaken === 'NEW LEAD' || !item.actionTaken),
            notes: String(item.message || item.notes || 'Website Enquiry via Contact Page')
          };
        }).filter(Boolean);

        setLeads((prev) => {
          const list = Array.isArray(prev) ? prev : [];
          const existingIds = new Set(list.map((l) => l && l.id));
          const toAdd = convertedLeads.filter((nl) => nl && !existingIds.has(nl.id));
          if (toAdd.length === 0) return list;
          return [...toAdd, ...list];
        });

        // Also ensure customer registry has them safely on top
        setCustomers((prev) => {
          const list = Array.isArray(prev) ? prev : [];
          const updated = [...list];
          allRaw.forEach((item) => {
            if (!item) return;
            const cPhone = String(item.phone || '').replace(/\D/g, '').slice(-10);
            const exists = updated.some((c) => c && String(c.phone || '').replace(/\D/g, '').slice(-10) === cPhone);
            if (!exists && cPhone) {
              const dt = item.createdAt 
                ? new Date(item.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                : String(item.date || 'Today');
              const rawId = String(item.id || '');
              const cleanNum = rawId.replace(/[^0-9]/g, '').slice(-5) || Math.floor(10000 + Math.random() * 90000);
              const isCustRead = readSet.has(String(item.id)) || readSet.has(String(rawId)) || item.isNew === false;
              updated.unshift({
                id: `CUST-WEB-${cleanNum}`,
                name: String(item.customerName || item.name || 'Website Client'),
                phone: String(item.phone || ''),
                email: String(item.email || 'N/A'),
                requirement: `${String(item.plotNumber || 'General Layout')} (${String(item.project || 'Pollachi')})`,
                assignedStaff: DEFAULT_STAFF_ROSTER[0].name,
                actionTaken: String(item.actionTaken || 'NEW LEAD'),
                stage: 'INQUIRY',
                source: 'WEB ENQUIRY',
                isNew: !isCustRead && Boolean(item.isNew !== false),
                date: dt,
                notes: String(item.message || 'Website Enquiry via Contact Page')
              });
            }
          });
          return updated;
        });
      }
    } catch (e) {
      console.error('Error syncing live enquiries:', e);
    }
  };

  useEffect(() => {
    syncLiveEnquiries();
    const handleNewEnq = () => {
      syncLiveEnquiries();
    };
    window.addEventListener('shashtika_new_enquiry', handleNewEnq);
    window.addEventListener('storage', handleNewEnq);
    return () => {
      window.removeEventListener('shashtika_new_enquiry', handleNewEnq);
      window.removeEventListener('storage', handleNewEnq);
    };
  }, []);

  // Handle Login Authentication
  const handleAdminLogin = (e) => {
    if (e) e.preventDefault();
    const u = username.trim().toLowerCase();
    const p = password.trim();

    const isValidUser = u === 'admin' || u === 'shashtika' || u === 'vels';
    const isValidPass =
      p === 'admin123' ||
      p === 'Admin123' ||
      p === 'ShashtikaAdmin@2026!' ||
      p === 'VelsAdmin@2026!' ||
      p === 'admin';

    if (isValidUser && isValidPass) {
      sessionStorage.setItem('shashtika_admin_auth', 'true');
      sessionStorage.setItem('vels_admin_authenticated', 'true');
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid admin credentials. Access denied.');
    }
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('shashtika_admin_auth');
    sessionStorage.removeItem('vels_admin_authenticated');
    setIsAuthenticated(false);
  };

  // WhatsApp Notification Helper for Assigned Staff
  const notifyStaffViaWhatsApp = (staffName, clientInfo) => {
    if (!staffName) return;
    const staffMember = staffRoster.find((s) => {
      const sName = typeof s === 'string' ? s : s.name;
      return sName === staffName;
    });

    const staffPhone = staffMember && typeof staffMember === 'object' ? staffMember.phone : '';
    if (!staffPhone) {
      console.warn('No mobile number registered for staff:', staffName);
      return;
    }

    const cleanStaffPhone = String(staffPhone).replace(/\D/g, '');
    const fullStaffPhone = cleanStaffPhone.length === 10 ? '91' + cleanStaffPhone : cleanStaffPhone;

    const messageText = 
`*NEW CUSTOMER LEAD ASSIGNED*
*SHASHTIKA PLOT DEVELOPERS*

*Customer Name:* ${clientInfo.customerName || 'N/A'}
*Phone Number:* ${clientInfo.phone || 'N/A'}
*Email:* ${clientInfo.email && clientInfo.email !== 'N/A' ? clientInfo.email : 'Not provided'}
*Requirement / Plot:* ${clientInfo.requirement || 'Kambalapatti DTCP Layout'}
*Budget / Status:* ${clientInfo.budget || 'Standard'}
*Date:* ${clientInfo.date || 'Today'}
*Remarks / Notes:* ${clientInfo.notes || 'Immediate follow-up required'}

_Please contact this client immediately and arrange site inspection / discussion._`;

    const waUrl = `https://wa.me/${fullStaffPhone}?text=${encodeURIComponent(messageText)}`;
    window.open(waUrl, '_blank');
  };

  // Staff Roster Handlers
  const handleOpenStaffModal = () => {
    setTempStaff(staffRoster.map((s) => ({ ...s })));
    setStaffModalOpen(true);
  };

  const handleSaveStaffRoster = () => {
    const valid = tempStaff.filter((s) => s.name && s.name.trim() !== '');
    if (valid.length === 0) {
      alert('Please enter at least one staff member with a name.');
      return;
    }
    const formatted = valid.map((s, idx) => ({
      id: s.id || `STAFF-${idx + 1}`,
      name: s.name.trim(),
      phone: String(s.phone || '9363599754').trim()
    }));
    setStaffRoster(formatted);
    setStaffModalOpen(false);
    alert(`Staff Roster updated! ${formatted.length} staff members saved with WhatsApp notification numbers.`);
  };

  // Plot Status Updater
  const handlePlotStatusChange = (plotNumber, newStatus) => {
    if (adminPlotLocation === 'kambalampatti') {
      setKambalaPlots((prev) =>
        prev.map((p) => (p.number === plotNumber ? { ...p, status: newStatus } : p))
      );
    } else {
      setKinathuPlots((prev) =>
        prev.map((p) => (p.number === plotNumber ? { ...p, status: newStatus } : p))
      );
    }
  };

  // Lead Actions with Automatic Cross-Sync & WhatsApp Notification
  const handleUpdateLeadStaff = (leadId, newStaff, triggerWhatsapp = true) => {
    const targetLead = (Array.isArray(leads) ? leads : []).find((l) => l.id === leadId);
    const cleanLeadPhone = targetLead ? String(targetLead.phone || '').replace(/\D/g, '').slice(-10) : '';
    const leadName = targetLead ? String(targetLead.name || '').trim().toLowerCase() : '';

    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, assignedStaff: newStaff } : l))
    );

    // Synchronize to Customer Details everywhere
    setCustomers((prev) =>
      prev.map((c) => {
        const cPhone = String(c.phone || '').replace(/\D/g, '').slice(-10);
        const cName = String(c.name || '').trim().toLowerCase();
        if (
          (cleanLeadPhone && cPhone === cleanLeadPhone) ||
          c.id === leadId ||
          (leadName && cName === leadName)
        ) {
          return { ...c, assignedStaff: newStaff };
        }
        return c;
      })
    );

    if (triggerWhatsapp && targetLead) {
      notifyStaffViaWhatsApp(newStaff, {
        customerName: targetLead.name,
        phone: targetLead.phone,
        email: targetLead.email,
        requirement: targetLead.targetPlot || targetLead.location || 'Plot Enquiry',
        budget: targetLead.budget,
        notes: targetLead.notes || targetLead.recommendation,
        date: targetLead.date
      });
    }
  };

  const handleUpdateLeadAction = (leadId, newAction) => {
    const targetLead = (Array.isArray(leads) ? leads : []).find((l) => l.id === leadId);
    const cleanLeadPhone = targetLead ? String(targetLead.phone || '').replace(/\D/g, '').slice(-10) : '';

    if (newAction !== 'NEW LEAD') {
      try {
        const readSet = new Set(JSON.parse(localStorage.getItem('shashtika_read_enquiries') || '[]'));
        readSet.add(String(leadId));
        localStorage.setItem('shashtika_read_enquiries', JSON.stringify(Array.from(readSet)));
      } catch (e) {}
    }

    setLeads((prev) =>
      (Array.isArray(prev) ? prev : []).map((l) => (l.id === leadId ? { ...l, actionTaken: newAction, isNew: newAction === 'NEW LEAD' ? l.isNew : false } : l))
    );

    setCustomers((prev) =>
      (Array.isArray(prev) ? prev : []).map((c) => {
        const cleanCustPhone = String(c.phone || '').replace(/\D/g, '').slice(-10);
        if (c.id === leadId || (cleanLeadPhone && cleanLeadPhone === cleanCustPhone)) {
          return { ...c, actionTaken: newAction, isNew: newAction === 'NEW LEAD' ? c.isNew : false };
        }
        return c;
      })
    );
  };

  const handleUpdateCustomerAction = (custId, newAction) => {
    const targetCust = (Array.isArray(customers) ? customers : []).find((c) => c.id === custId);
    const cleanCustPhone = targetCust ? String(targetCust.phone || '').replace(/\D/g, '').slice(-10) : '';

    if (newAction !== 'NEW LEAD') {
      try {
        const readSet = new Set(JSON.parse(localStorage.getItem('shashtika_read_enquiries') || '[]'));
        readSet.add(String(custId));
        localStorage.setItem('shashtika_read_enquiries', JSON.stringify(Array.from(readSet)));
      } catch (e) {}
    }

    setCustomers((prev) =>
      (Array.isArray(prev) ? prev : []).map((c) => (c.id === custId ? { ...c, actionTaken: newAction, isNew: newAction === 'NEW LEAD' ? c.isNew : false } : c))
    );

    setLeads((prev) =>
      (Array.isArray(prev) ? prev : []).map((l) => {
        const cleanLeadPhone = String(l.phone || '').replace(/\D/g, '').slice(-10);
        if (l.id === custId || (cleanCustPhone && cleanCustPhone === cleanLeadPhone)) {
          return { ...l, actionTaken: newAction, isNew: newAction === 'NEW LEAD' ? l.isNew : false };
        }
        return l;
      })
    );
  };

  // Mark an incoming enquiry as read: removes the NEW ENQUIRY tag and restores normal row styling
  const handleMarkAsRead = (id) => {
    // 1. Add ID to read set in localStorage
    try {
      const readSet = new Set(JSON.parse(localStorage.getItem('shashtika_read_enquiries') || '[]'));
      readSet.add(String(id));
      localStorage.setItem('shashtika_read_enquiries', JSON.stringify(Array.from(readSet)));
    } catch (e) {}

    // 2. Update local enquiries cache if present
    try {
      const localEnqs = JSON.parse(localStorage.getItem('shashtika_enquiries') || '[]');
      if (Array.isArray(localEnqs)) {
        const updatedLocal = localEnqs.map((item) => (item.id === id ? { ...item, isNew: false } : item));
        localStorage.setItem('shashtika_enquiries', JSON.stringify(updatedLocal));
      }
    } catch (e) {}

    // 3. Update leads state
    const targetLead = (Array.isArray(leads) ? leads : []).find((l) => l.id === id);
    const cleanLeadPhone = targetLead ? String(targetLead.phone || '').replace(/\D/g, '').slice(-10) : '';

    setLeads((prev) =>
      (Array.isArray(prev) ? prev : []).map((l) => {
        const lPhone = String(l.phone || '').replace(/\D/g, '').slice(-10);
        if (l.id === id || (cleanLeadPhone && cleanLeadPhone === lPhone)) {
          return {
            ...l,
            isNew: false,
            actionTaken: l.actionTaken === 'NEW LEAD' ? 'ACKNOWLEDGED' : l.actionTaken
          };
        }
        return l;
      })
    );

    // 4. Update customers state
    setCustomers((prev) =>
      (Array.isArray(prev) ? prev : []).map((c) => {
        const cPhone = String(c.phone || '').replace(/\D/g, '').slice(-10);
        if (c.id === id || (cleanLeadPhone && cleanLeadPhone === cPhone)) {
          return {
            ...c,
            isNew: false,
            actionTaken: c.actionTaken === 'NEW LEAD' ? 'ACKNOWLEDGED' : c.actionTaken
          };
        }
        return c;
      })
    );

    // 5. Notify backend API / MongoDB
    try {
      fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isNew: false, status: 'CONTACTED' })
      }).catch(() => {});
    } catch (e) {}
  };

  const handleDeleteLead = (leadId) => {
    if (window.confirm(`Are you sure you want to delete lead record ${leadId}?`)) {
      setLeads((prev) => prev.filter((l) => l.id !== leadId));
    }
  };

  const handleResetLeads = () => {
    if (window.confirm('Reset all AI leads to default verified records?')) {
      setLeads(DEFAULT_AI_LEADS);
    }
  };

  // CSV Export for Leads
  const handleExportCSV = () => {
    const headers = [
      'Lead ID',
      'Name',
      'Phone',
      'Email',
      'AI Score',
      'Category',
      'Budget',
      'Timeline',
      'Target Plot',
      'Assigned Staff',
      'Recommendation',
      'Date'
    ];

    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      l.score,
      `"${l.category}"`,
      `"${l.budget}"`,
      `"${l.timeline}"`,
      `"${l.targetPlot}"`,
      `"${l.assignedStaff}"`,
      `"${String(l.recommendation || '').replace(/"/g, '""')}"`,
      `"${l.date}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `shashtika_ai_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Customer Registry Handlers with Automatic Lead Sync & WhatsApp Notification
  const handleOpenAddCustomerModal = (editId = null) => {
    if (editId) {
      const rec = customers.find((c) => c.id === editId);
      if (rec) {
        setEditingCustId(rec.id);
        setCustForm({
          name: rec.name || '',
          phone: rec.phone || '',
          email: rec.email === 'N/A' ? '' : rec.email || '',
          requirement: rec.requirement || '',
          assignedStaff: rec.assignedStaff || defaultStaffName,
          stage: rec.stage || 'INQUIRY',
          notes: rec.notes || ''
        });
      }
    } else {
      setEditingCustId(null);
      setCustForm({
        name: '',
        phone: '',
        email: '',
        requirement: '',
        assignedStaff: defaultStaffName,
        stage: 'INQUIRY',
        notes: ''
      });
    }
    setCustomerModalOpen(true);
  };

  const handleSaveCustomer = (e) => {
    e.preventDefault();
    if (!custForm.name.trim() || !custForm.phone.trim()) {
      alert('Customer name and phone number are required.');
      return;
    }

    const now = new Date();
    const dateStr =
      now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) +
      ', ' +
      now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

    const cleanCustPhone = custForm.phone.replace(/\D/g, '').slice(-10);

    if (editingCustId) {
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === editingCustId
            ? {
                ...c,
                name: custForm.name.trim(),
                phone: custForm.phone.trim(),
                email: custForm.email.trim() || 'N/A',
                requirement: custForm.requirement.trim() || 'General Layout Enquiry',
                assignedStaff: custForm.assignedStaff,
                stage: custForm.stage,
                notes: custForm.notes.trim(),
                date: `${c.date} (Updated: ${dateStr})`
              }
            : c
        )
      );

      // Automatically sync assigned staff to matching lead everywhere
      setLeads((prev) =>
        prev.map((l) => {
          const lPhone = String(l.phone || '').replace(/\D/g, '').slice(-10);
          if (lPhone === cleanCustPhone || l.id === editingCustId) {
            return { ...l, assignedStaff: custForm.assignedStaff };
          }
          return l;
        })
      );

      notifyStaffViaWhatsApp(custForm.assignedStaff, {
        customerName: custForm.name,
        phone: custForm.phone,
        email: custForm.email,
        requirement: custForm.requirement,
        budget: 'Standard',
        notes: custForm.notes,
        date: dateStr
      });

      alert(`Customer record updated and assigned to ${custForm.assignedStaff}! Details sent to staff WhatsApp.`);
    } else {
      const newRec = {
        id: `CUST-MAN-${Math.floor(10000 + Math.random() * 90000)}`,
        name: custForm.name.trim(),
        phone: custForm.phone.trim(),
        email: custForm.email.trim() || 'N/A',
        requirement: custForm.requirement.trim() || 'General Layout Enquiry',
        assignedStaff: custForm.assignedStaff,
        stage: custForm.stage,
        notes: custForm.notes.trim(),
        source: 'MANUAL WALK-IN',
        date: dateStr
      };
      setCustomers([newRec, ...customers]);

      notifyStaffViaWhatsApp(custForm.assignedStaff, {
        customerName: custForm.name,
        phone: custForm.phone,
        email: custForm.email,
        requirement: custForm.requirement,
        budget: 'Standard',
        notes: custForm.notes,
        date: dateStr
      });

      alert(`New walk-in customer added and assigned to ${custForm.assignedStaff}! Details sent to staff WhatsApp.`);
    }
    setCustomerModalOpen(false);
  };

  const handleDeleteCustomer = (id) => {
    if (window.confirm('Are you sure you want to delete this customer record?')) {
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleUpdateCustomerStage = (id, newStage) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, stage: newStage } : c))
    );
  };

  const handleUpdateCustomerStaff = (customerId, newStaff, triggerWhatsapp = true) => {
    const targetCust = (Array.isArray(customers) ? customers : []).find((c) => c.id === customerId);
    const cleanCustPhone = targetCust ? String(targetCust.phone || '').replace(/\D/g, '').slice(-10) : '';
    const custName = targetCust ? String(targetCust.name || '').trim().toLowerCase() : '';

    setCustomers((prev) =>
      prev.map((c) => (c.id === customerId ? { ...c, assignedStaff: newStaff } : c))
    );

    // Synchronize to AI Leads everywhere
    setLeads((prev) =>
      prev.map((l) => {
        const lPhone = String(l.phone || '').replace(/\D/g, '').slice(-10);
        const lName = String(l.name || '').trim().toLowerCase();
        if (
          (cleanCustPhone && lPhone === cleanCustPhone) ||
          l.id === customerId ||
          (custName && lName === custName)
        ) {
          return { ...l, assignedStaff: newStaff };
        }
        return l;
      })
    );

    if (triggerWhatsapp && targetCust) {
      notifyStaffViaWhatsApp(newStaff, {
        customerName: targetCust.name,
        phone: targetCust.phone,
        email: targetCust.email,
        requirement: targetCust.requirement,
        budget: 'Standard',
        notes: targetCust.notes,
        date: targetCust.date
      });
    }
  };

  // Filtered Leads (Safe against null/undefined)
  const filteredLeads = useMemo(() => {
    const list = Array.isArray(leads) ? leads : [];
    return list.filter((lead) => {
      if (!lead) return false;
      const matchCat = leadCategoryFilter === 'ALL' || lead.category === leadCategoryFilter;
      const q = (leadSearchQuery || '').toLowerCase().trim();
      if (!q) return matchCat;
      const name = String(lead.name || '').toLowerCase();
      const phone = String(lead.phone || '');
      const targetPlot = String(lead.targetPlot || '').toLowerCase();
      const staff = String(lead.assignedStaff || '').toLowerCase();
      const email = String(lead.email || '').toLowerCase();
      const matchSearch =
        name.includes(q) ||
        phone.includes(q) ||
        targetPlot.includes(q) ||
        staff.includes(q) ||
        email.includes(q);
      return matchCat && matchSearch;
    });

    return [...filtered].sort((a, b) => {
      const aNew = Boolean(a && a.isNew);
      const bNew = Boolean(b && b.isNew);
      if (aNew && !bNew) return -1;
      if (!aNew && bNew) return 1;
      return 0;
    });
  }, [leads, leadCategoryFilter, leadSearchQuery]);

  // Lead Counts
  const hotLeadsCount = (Array.isArray(leads) ? leads : []).filter((l) => l && l.category === 'HOT').length;
  const warmLeadsCount = (Array.isArray(leads) ? leads : []).filter((l) => l && l.category === 'WARM').length;
  const coldLeadsCount = (Array.isArray(leads) ? leads : []).filter((l) => l && l.category === 'COLD').length;
  const topScore = Array.isArray(leads) && leads.length > 0 
    ? Math.max(...leads.map((l) => Number(l && l.score) || 0)) 
    : 98;

  // Filtered Plots (Safe against null/undefined)
  const filteredPlots = useMemo(() => {
    const list = Array.isArray(plots) ? plots : [];
    const q = (plotSearchQuery || '').toLowerCase().trim().replace(/^(plot|plot\s*#?)\s*/i, '');
    return list.filter((plot) => {
      if (!plot) return false;
      const matchStatus = plotStatusFilter === 'ALL' || plot.status === plotStatusFilter;
      if (!q) return matchStatus;
      const numStr = String(plot.number || '').toLowerCase();
      const facingStr = String(plot.facing || '').toLowerCase();
      const roadStr = String(plot.road || '').toLowerCase();
      const sqftStr = String(plot.sqft || '');
      const matchSearch =
        numStr === q ||
        numStr.includes(q) ||
        facingStr.includes(q) ||
        roadStr.includes(q) ||
        sqftStr.includes(q);
      return matchStatus && matchSearch;
    });
  }, [plots, plotStatusFilter, plotSearchQuery]);

  // Paginated Plots
  const totalPlotRecords = filteredPlots.length;
  const totalPlotPages = Math.max(1, Math.ceil(totalPlotRecords / plotPageSize));
  const safePlotPage = Math.min(Math.max(plotCurrentPage, 1), totalPlotPages);
  const plotStartIndex = (safePlotPage - 1) * plotPageSize;
  const plotEndIndex = Math.min(plotStartIndex + plotPageSize, totalPlotRecords);
  const paginatedPlots = filteredPlots.slice(plotStartIndex, plotEndIndex);

  // Filtered Customers (Safe against null/undefined)
  const filteredCustomers = useMemo(() => {
    const list = Array.isArray(customers) ? customers : [];
    const q = (customerSearchQuery || '').toLowerCase().trim();
    const filtered = list.filter((cust) => {
      if (!cust) return false;
      const isManual = cust.source === 'MANUAL WALK-IN';
      const matchSource =
        customerFilter === 'ALL' ||
        (customerFilter === 'WEB' && !isManual) ||
        (customerFilter === 'WALK_IN' && isManual);
      if (!q) return matchSource;
      const name = String(cust.name || '').toLowerCase();
      const phone = String(cust.phone || '');
      const req = String(cust.requirement || '').toLowerCase();
      const notes = String(cust.notes || '').toLowerCase();
      const staff = String(cust.assignedStaff || '').toLowerCase();
      const matchSearch =
        name.includes(q) ||
        phone.includes(q) ||
        req.includes(q) ||
        notes.includes(q) ||
        staff.includes(q);
      return matchSource && matchSearch;
    });

    return [...filtered].sort((a, b) => {
      const aNew = Boolean(a && a.isNew);
      const bNew = Boolean(b && b.isNew);
      if (aNew && !bNew) return -1;
      if (!aNew && bNew) return 1;
      return 0;
    });
  }, [customers, customerFilter, customerSearchQuery]);

  // Customer Counts
  const custCountAll = (Array.isArray(customers) ? customers : []).length;
  const custCountWeb = (Array.isArray(customers) ? customers : []).filter((c) => c && c.source !== 'MANUAL WALK-IN').length;
  const custCountWalkIn = (Array.isArray(customers) ? customers : []).filter((c) => c && c.source === 'MANUAL WALK-IN').length;

  // 1. RENDER LOGIN GATEWAY IF NOT AUTHENTICATED (MATCHING USER SCREENSHOT)
  if (!isAuthenticated) {
    return (
      <div className="admin-login-overlay">
        <div className="admin-login-card">
          {/* Top Logo & Title */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '14px' }}>
              <img
                src="/Images/Shashtika_Emblem.png"
                alt="SHASHTIKA Emblem"
                style={{
                  height: '46px',
                  width: 'auto',
                  display: 'block',
                  borderRadius: '6px',
                  border: '1.2px solid rgba(198, 161, 91, 0.6)',
                  boxShadow: '0 4px 12px rgba(10, 19, 37, 0.35)'
                }}
              />
              <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                <span className="logo-title gold-glow-letters" style={{ fontSize: '1.45rem', lineHeight: 1 }}>
                  SHASHTIKA
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', letterSpacing: '1.5px', color: '#A9823A', textTransform: 'uppercase', marginTop: '3px', fontWeight: 700 }}>
                  PLOT DEVELOPERS &amp; BUILDERS
                </span>
              </div>
            </div>

            <span
              className="architectural-tag"
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '8px',
                fontSize: '0.66rem',
                letterSpacing: '2px',
                color: '#C6A15B'
              }}
            >
              RESTRICTED ACCESS PORTAL
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                color: '#1A0709',
                fontSize: '1.65rem',
                fontWeight: 900,
                letterSpacing: '1px'
              }}
            >
              ADMIN LOGIN
            </h2>
            <p
              style={{
                fontSize: '0.86rem',
                color: 'rgba(10, 19, 37, 0.75)',
                marginTop: '6px',
                lineHeight: 1.5
              }}
            >
              Authenticate to access real-time plot inventory, pricing, and AI lead portal.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: '#1A0709',
                  letterSpacing: '1px',
                  marginBottom: '6px',
                  textTransform: 'uppercase'
                }}
              >
                USERNAME
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                autoComplete="username"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '6px',
                  border: '1.5px solid #CCD8E8',
                  background: '#F0F5FA',
                  fontSize: '0.94rem',
                  color: '#1A0709',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: '#1A0709',
                  letterSpacing: '1px',
                  marginBottom: '6px',
                  textTransform: 'uppercase'
                }}
              >
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                autoComplete="current-password"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '6px',
                  border: '1.5px solid #CCD8E8',
                  background: '#F0F5FA',
                  fontSize: '0.94rem',
                  color: '#1A0709',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {loginError && (
              <div
                style={{
                  color: '#A8664B',
                  background: 'rgba(168, 102, 75, 0.1)',
                  border: '1px solid #A8664B',
                  padding: '10px 14px',
                  borderRadius: '4px',
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-mono)',
                  textAlign: 'center'
                }}
              >
                {loginError}
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px 18px',
                marginTop: '6px',
                background: 'linear-gradient(135deg, #1A0709 0%, #2D0E12 50%, #1A0709 100%)',
                color: '#E5D2A6',
                border: '1.5px solid #C6A15B',
                borderRadius: '6px',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontWeight: 800,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 6px 20px rgba(10, 19, 37, 0.45), 0 0 15px rgba(198, 161, 91, 0.25)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2D0E12';
                e.currentTarget.style.color = '#FFFDF7';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#1A0709';
                e.currentTarget.style.color = '#E5D2A6';
              }}
            >
              AUTHENTICATE &amp; ENTER DASHBOARD
            </button>

            <div style={{ textAlign: 'center', marginTop: '6px' }}>
              <a
                href="#plots"
                style={{
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#1A0709',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                Return to Public Website
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // 2. RENDER FULL ADMIN DASHBOARD (MATCHING SAKTHIVEL-GROUPS.VERCEL.APP/ADMIN.HTML)
  return (
    <div
      className="admin-portal-page"
      style={{
        backgroundColor: '#1A0709',
        backgroundImage: `
          radial-gradient(circle at 50% 15%, rgba(198, 161, 91, 0.12) 0%, transparent 60%),
          linear-gradient(rgba(198, 161, 91, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(198, 161, 91, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 36px 36px, 36px 36px',
        minHeight: '100vh'
      }}
    >
      {/* HOMEPAGE-ALIGNED HERO SECTION FOR ADMIN PORTAL */}
      <section className="admin-hero-section">
        {/* Full Edge-to-Edge Background Image */}
        <div className="admin-hero-bg-img" />

        {/* Rich Luxury Dark Vignette Overlay */}
        <div className="admin-hero-overlay" />

        {/* Main Container - Exact matching max-w-[1320px] and alignment as Home, Plots, Contact & Gallery Hero */}
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8 w-full flex flex-col justify-center h-full relative z-[3] flex-1">
          <div className="hero-fit-content w-full">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="hero-headline" style={{ margin: 0 }}>
                  <span className="gold-hero-badge">ADMIN PORTAL</span>
                  <br />
                  <span style={{ color: '#E5D2A6' }}>MANAGEMENT</span>
                  <br />
                  <span style={{ color: '#E5D2A6' }}>&amp; LEAD INTELLIGENCE</span>
                </h1>
                <p className="hero-description-block" style={{ marginTop: '12px', maxWidth: '640px', color: 'rgba(255, 253, 247, 0.85)', fontSize: '0.92rem' }}>
                  Real-time DTCP inventory state control, customer enquiries, plot bookings, and AI-powered lead scoring dashboard.
                </p>
              </div>

              {/* Quick Header Buttons */}
              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href="#plots"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded border-[1.8px] border-gold-primary text-cream font-mono text-[0.78rem] font-extrabold tracking-[1.5px] bg-gold-primary/20 backdrop-blur-md hover:bg-gold-primary hover:text-espresso-950 transition-all shadow-[0_4px_18px_rgba(0,0,0,0.4)] cursor-pointer"
                >
                  PREVIEW LIVE PLOTS MAP
                </a>
                <button
                  onClick={handleAdminLogout}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded border-[1.8px] border-[#d9534f] text-[#ffb3b0] font-mono text-[0.78rem] font-extrabold tracking-[1.5px] bg-[#d9534f]/20 backdrop-blur-md hover:bg-[#d9534f] hover:text-white transition-all shadow-[0_4px_18px_rgba(0,0,0,0.4)] cursor-pointer"
                >
                  LOG OUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD CONTENT PANELS AREA */}
      <section style={{ padding: '36px 0 60px' }}>
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
          <div className="admin-dashboard-layout">
            {/* TOP HORIZONTAL BUTTON MENU BAR */}
            <div className="admin-horizontal-menu">
              <div className="horizontal-menu-header">
                <span className="architectural-tag" style={{ fontSize: '0.62rem' }}>
                  ADMIN NAVIGATION
                </span>
                <h4>DASHBOARD PANELS</h4>
              </div>

              <nav className="horizontal-menu-nav">
                {/* BUTTON 1: AI LEAD INTELLIGENCE */}
                <button
                  type="button"
                  className={`admin-nav-tab-btn ${activeTab === 'ai-leads' ? 'active' : ''}`}
                  onClick={() => setActiveTab('ai-leads')}
                >
                  <div className="tab-btn-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="tab-btn-text">
                    <span className="tab-btn-title">AI Lead Intelligence &amp; Action Priority</span>
                    <span className="tab-btn-sub">Scoring &amp; Priority Dashboard ({leads.length})</span>
                  </div>
                </button>

                {/* BUTTON 2: PLOT MANAGEMENT */}
                <button
                  type="button"
                  className={`admin-nav-tab-btn ${activeTab === 'plot-management' ? 'active' : ''}`}
                  onClick={() => setActiveTab('plot-management')}
                >
                  <div className="tab-btn-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <line x1="3" y1="9" x2="21" y2="9" />
                      <line x1="9" y1="21" x2="9" y2="9" />
                    </svg>
                  </div>
                  <div className="tab-btn-text">
                    <span className="tab-btn-title">Plot Management Table</span>
                    <span className="tab-btn-sub">Real-Time Inventory Control (64 Plots)</span>
                  </div>
                </button>

                {/* BUTTON 3: CUSTOMER DETAILS */}
                <button
                  type="button"
                  className={`admin-nav-tab-btn ${activeTab === 'customer-tracker' ? 'active' : ''}`}
                  onClick={() => setActiveTab('customer-tracker')}
                >
                  <div className="tab-btn-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div className="tab-btn-text">
                    <span className="tab-btn-title">Customer Details</span>
                    <span className="tab-btn-sub">Centralized Client Registry ({customers.length})</span>
                  </div>
                </button>

                {/* BUTTON 4: PROJECT DEVELOPMENTS & PHOTO GALLERY */}
                <button
                  type="button"
                  className={`admin-nav-tab-btn ${activeTab === 'gallery-manager' ? 'active' : ''}`}
                  onClick={() => setActiveTab('gallery-manager')}
                >
                  <div className="tab-btn-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                  <div className="tab-btn-text">
                    <span className="tab-btn-title">Photo Gallery</span>
                    <span className="tab-btn-sub">Project Developments ({allAdminGalleryImages.length})</span>
                  </div>
                </button>
              </nav>
            </div>

            {/* FULL WIDTH CONTENT PANELS AREA */}
            <div className="admin-content-panels">
              {/* PANEL 1: AI LEAD INTELLIGENCE */}
              {activeTab === 'ai-leads' && (
                <div style={{ background: 'var(--bg-cream)', border: '1.8px solid var(--gold-primary)', borderRadius: 'var(--radius-md)', padding: '28px', boxShadow: '0 12px 35px rgba(26, 7, 9, 0.12), 0 0 20px rgba(198, 161, 91, 0.18)', position: 'relative', overflow: 'hidden' }}>
                  {/* TOP METALLIC GOLD ACCENT STRIP */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #A9823A, #C6A15B, #E5D2A6, #C6A15B, #A9823A)' }} />

                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid rgba(198, 161, 91, 0.3)' }}>
                    <div style={{ maxWidth: '760px' }}>
                      <div className="architectural-tag" style={{ marginBottom: '8px', color: 'var(--gold-antique)', fontWeight: 700 }}>
                        AI ASSISTANT LEAD SCORING ENGINE
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.4rem, 2.5vw, 2.0rem)', color: '#1A0709', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>
                        AI Lead Intelligence &amp; Action Priority
                      </h3>
                      <p style={{ fontSize: '0.92rem', color: 'rgba(10, 19, 37, 0.75)', lineHeight: 1.6, fontWeight: 500 }}>
                        Automated 0–100 AI Lead Scoring model evaluates budget, timeline, purpose, plot interest, and activity signals to recommend high-priority buyers to call first.
                      </p>
                    </div>

                    <div className="admin-action-toolbar" style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginTop: '6px' }}>
                      <button
                        onClick={() => setActiveTab('customer-tracker')}
                        style={{
                          fontSize: '0.80rem',
                          padding: '10px 18px',
                          fontWeight: 800,
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          background: '#1A0709',
                          color: '#F3E5AB',
                          border: '1.5px solid #C6A15B',
                          boxShadow: '0 4px 14px rgba(10, 19, 37, 0.35)',
                          cursor: 'pointer',
                          letterSpacing: '0.4px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C6A15B" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                        CUSTOMER DETAILS
                      </button>

                      <button
                        onClick={handleExportCSV}
                        style={{
                          fontSize: '0.80rem',
                          padding: '10px 18px',
                          fontWeight: 800,
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          background: '#065F46',
                          color: '#FFFFFF',
                          border: '1.5px solid #047857',
                          boxShadow: '0 4px 12px rgba(6, 95, 70, 0.25)',
                          cursor: 'pointer',
                          letterSpacing: '0.4px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                        CSV EXPORT
                      </button>

                      <button
                        onClick={handleOpenStaffModal}
                        style={{
                          fontSize: '0.80rem',
                          padding: '10px 18px',
                          fontWeight: 800,
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          background: '#DC2626',
                          color: '#FFFFFF',
                          border: '1.5px solid #B91C1C',
                          boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)',
                          cursor: 'pointer',
                          letterSpacing: '0.4px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.4"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                        MANAGE STAFF
                      </button>
                    </div>
                  </div>

                  {/* Lead Category Summary Counters */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '16px', marginBottom: '28px' }}>
                    {/* HOT LEADS CARD */}
                    <div className="lead-summary-card lead-card-hot">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C53030" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>
                          <span className="card-label">HOT LEADS (80-100)</span>
                        </div>
                        <div className="card-status-dot dot-hot" />
                      </div>
                      <h4>{hotLeadsCount}</h4>
                      <span className="card-desc" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#9B2C2C' }}>
                        Call Immediately &mdash; Ready Buyer
                      </span>
                    </div>

                    {/* WARM LEADS CARD */}
                    <div className="lead-summary-card lead-card-warm">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A9823A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
                          <span className="card-label">WARM LEADS (50-79)</span>
                        </div>
                        <div className="card-status-dot dot-warm" />
                      </div>
                      <h4>{warmLeadsCount}</h4>
                      <span className="card-desc" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#8C6B28' }}>
                        Follow Up Within 24 Hours
                      </span>
                    </div>

                    {/* COLD LEADS CARD */}
                    <div className="lead-summary-card lead-card-cold">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2C4A6F" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="2" y1="12" x2="22" y2="12" /><line x1="12" y1="2" x2="12" y2="22" /><path d="m20 16-4-4 4-4" /><path d="m4 8 4 4-4 4" /><path d="m16 4-4 4-4-4" /><path d="m8 20 4-4 4 4" /></svg>
                          <span className="card-label">COLD LEADS (&lt;50)</span>
                        </div>
                        <div className="card-status-dot dot-cold" />
                      </div>
                      <h4>{coldLeadsCount}</h4>
                      <span className="card-desc" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#2B4360' }}>
                        Future Pipeline &mdash; Nurture
                      </span>
                    </div>

                    {/* TOP LEAD SCORE CARD */}
                    <div className="lead-summary-card lead-card-top">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E5D2A6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>
                          <span className="card-label" style={{ color: '#E5D2A6' }}>TOP LEAD SCORE</span>
                        </div>
                        <div className="card-status-dot dot-top" />
                      </div>
                      <h4>{topScore}/100</h4>
                      <span className="card-desc" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#E5D2A6' }}>
                        #1 Highest Buying Intent
                      </span>
                    </div>
                  </div>

                  {/* Filter Chips & Search Bar */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <button
                        className={`filter-chip ${leadCategoryFilter === 'ALL' ? 'active' : ''}`}
                        onClick={() => setLeadCategoryFilter('ALL')}
                      >
                        ALL SCORED LEADS ({leads.length})
                      </button>
                      <button
                        className={`filter-chip ${leadCategoryFilter === 'HOT' ? 'active' : ''}`}
                        onClick={() => setLeadCategoryFilter('HOT')}
                      >
                        HOT LEADS ({hotLeadsCount})
                      </button>
                      <button
                        className={`filter-chip ${leadCategoryFilter === 'WARM' ? 'active' : ''}`}
                        onClick={() => setLeadCategoryFilter('WARM')}
                      >
                        WARM LEADS ({warmLeadsCount})
                      </button>
                      <button
                        className={`filter-chip ${leadCategoryFilter === 'COLD' ? 'active' : ''}`}
                        onClick={() => setLeadCategoryFilter('COLD')}
                      >
                        COLD LEADS ({coldLeadsCount})
                      </button>
                    </div>

                    <div style={{ position: 'relative', minWidth: '240px', maxWidth: '340px', flex: 1 }}>
                      <input
                        type="text"
                        placeholder="Search by name, phone, plot, staff..."
                        value={leadSearchQuery}
                        onChange={(e) => setLeadSearchQuery(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '9px 12px 9px 34px',
                          borderRadius: '4px',
                          border: '1px solid var(--gold-border)',
                          background: 'var(--bg-cream)',
                          fontSize: '0.88rem',
                          color: '#1A0709',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ position: 'absolute', left: '11px', top: '12px', opacity: 0.5 }}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    </div>
                  </div>

                  {/* Scored Leads Table */}
                  <div className="admin-table-container" style={{ overflowX: 'auto', borderRadius: '4px', border: '1.5px solid var(--gold-border)' }}>
                    <div className="mobile-table-scroll-hint">
                      <span>Swipe horizontally to view full lead details &amp; contact actions</span>
                    </div>
                    <table className="admin-table" style={{ width: '100%', minWidth: '1060px' }}>
                      <thead>
                        <tr>
                          <th style={{ width: '9%', minWidth: '85px', textAlign: 'center', whiteSpace: 'nowrap' }}>AI SCORE</th>
                          <th style={{ width: '18%', minWidth: '180px', whiteSpace: 'nowrap' }}>CLIENT &amp; CONTACT</th>
                          <th style={{ width: '15%', minWidth: '160px', whiteSpace: 'nowrap' }}>REQUIREMENTS &amp; BUDGET</th>
                          <th style={{ width: '14%', minWidth: '150px', whiteSpace: 'nowrap' }}>TIMELINE &amp; TARGET PLOT</th>
                          <th style={{ width: '15%', minWidth: '160px', whiteSpace: 'nowrap' }}>ASSIGNED STAFF</th>
                          <th style={{ width: '16%', minWidth: '165px', whiteSpace: 'nowrap' }}>ACTIONS TAKEN</th>
                          <th style={{ width: '13%', minWidth: '130px', textAlign: 'center', whiteSpace: 'nowrap' }}>CONTACT</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLeads.length === 0 ? (
                          <tr>
                            <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: 'rgba(10,19,37,0.6)', fontWeight: 600 }}>
                              No lead records found matching current criteria.
                            </td>
                          </tr>
                        ) : (
                          filteredLeads.map((lead) => {
                            const cleanPhone = String(lead.phone || '').replace(/[^0-9]/g, '');
                            const isHot = lead.category === 'HOT';
                            const isWarm = lead.category === 'WARM';
                            const currentAction = lead.actionTaken || 'NEW LEAD';

                            return (
                              <tr
                                key={lead.id}
                                style={{
                                  borderBottom: '1px solid rgba(198, 161, 91, 0.2)',
                                  background: lead.isNew ? 'rgba(37, 211, 102, 0.06)' : undefined,
                                  borderLeft: lead.isNew ? '4px solid #10B981' : 'none',
                                  transition: 'all 0.3s ease'
                                }}
                              >
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                  <div
                                    style={{
                                      display: 'inline-flex',
                                      flexDirection: 'column',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      width: '54px',
                                      height: '54px',
                                      borderRadius: '50%',
                                      background: isHot
                                        ? 'rgba(217, 83, 79, 0.15)'
                                        : isWarm
                                        ? 'rgba(198, 161, 91, 0.18)'
                                        : 'rgba(60, 90, 120, 0.15)',
                                      border: `2px solid ${isHot ? '#d9534f' : isWarm ? '#C6A15B' : '#3c5a78'}`
                                    }}
                                  >
                                    <span style={{ fontSize: '1rem', fontWeight: 800, color: isHot ? '#C53030' : isWarm ? '#A9823A' : '#2C4A6F' }}>
                                      {lead.score}
                                    </span>
                                    <span style={{ fontSize: '0.55rem', fontWeight: 800, letterSpacing: '0.5px', textTransform: 'uppercase', color: isHot ? '#C53030' : isWarm ? '#A9823A' : '#2C4A6F' }}>
                                      {lead.category}
                                    </span>
                                  </div>
                                </td>

                                <td style={{ verticalAlign: 'top' }}>
                                  {lead.isNew && (
                                    <div style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                                      <span
                                        style={{
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          gap: '4px',
                                          background: 'linear-gradient(135deg, #10B981, #059669)',
                                          color: '#FFFFFF',
                                          fontSize: '0.64rem',
                                          fontWeight: 800,
                                          padding: '2px 8px',
                                          borderRadius: '12px',
                                          letterSpacing: '0.6px',
                                          boxShadow: '0 2px 6px rgba(16, 185, 129, 0.35)',
                                          textTransform: 'uppercase'
                                        }}
                                      >
                                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#FFFFFF' }}></span>
                                        NEW ENQUIRY
                                      </span>

                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleMarkAsRead(lead.id);
                                        }}
                                        title="Mark as read (remove New Enquiry tag)"
                                        style={{
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          gap: '4px',
                                          background: '#FAF6EE',
                                          border: '1.2px solid #10B981',
                                          color: '#065F46',
                                          fontSize: '0.66rem',
                                          fontWeight: 700,
                                          padding: '2px 8px',
                                          borderRadius: '8px',
                                          cursor: 'pointer',
                                          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                                          transition: 'all 0.18s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                          e.currentTarget.style.background = '#10B981';
                                          e.currentTarget.style.color = '#FFFFFF';
                                        }}
                                        onMouseLeave={(e) => {
                                          e.currentTarget.style.background = '#FAF6EE';
                                          e.currentTarget.style.color = '#065F46';
                                        }}
                                      >
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                          <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        <span>Mark as read</span>
                                      </button>
                                    </div>
                                  )}
                                  <div style={{ fontWeight: 800, color: '#1A0709', fontSize: '0.95rem', marginBottom: '4px' }}>
                                    {lead.name}
                                  </div>
                                  <div style={{ fontSize: '0.82rem', color: '#1A0709', fontWeight: 700, marginBottom: '2px' }}>
                                    <a href={`tel:${lead.phone}`} style={{ color: '#1A0709', textDecoration: 'none' }}>{lead.phone}</a>
                                  </div>
                                  <div style={{ fontSize: '0.78rem', color: 'rgba(10,19,37,0.65)' }}>{lead.email}</div>
                                  <div style={{ fontSize: '0.70rem', color: '#A9823A', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                                    {lead.date} &bull; {lead.id}
                                  </div>
                                </td>

                                <td style={{ verticalAlign: 'top' }}>
                                  <div style={{ fontWeight: 700, color: '#1A0709', fontSize: '0.86rem', marginBottom: '4px' }}>
                                    {lead.budget}
                                  </div>
                                  <div style={{ fontSize: '0.80rem', color: 'rgba(10,19,37,0.75)' }}>{lead.purpose}</div>
                                  <div style={{ fontSize: '0.74rem', color: 'rgba(10,19,37,0.6)', marginTop: '2px' }}>{lead.location}</div>
                                </td>

                                <td style={{ verticalAlign: 'top' }}>
                                  <div style={{ fontWeight: 700, color: '#1A0709', fontSize: '0.86rem', marginBottom: '4px' }}>
                                    {lead.targetPlot}
                                  </div>
                                  <div style={{ fontSize: '0.80rem', color: 'rgba(10,19,37,0.75)' }}>
                                    Timeline: <strong style={{ color: isHot ? '#C53030' : '#1A0709' }}>{lead.timeline}</strong>
                                  </div>
                                </td>

                                <td style={{ verticalAlign: 'middle' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <select
                                      value={lead.assignedStaff || defaultStaffName}
                                      onChange={(e) => handleUpdateLeadStaff(lead.id, e.target.value)}
                                      style={{
                                        flex: 1,
                                        padding: '8px 10px',
                                        borderRadius: '4px',
                                        border: '1.5px solid var(--gold-border)',
                                        fontSize: '0.82rem',
                                        fontWeight: 700,
                                        background: 'var(--bg-cream)',
                                        color: '#1A0709',
                                        cursor: 'pointer'
                                      }}
                                    >
                                      {staffRoster.map((s) => {
                                        const sName = typeof s === 'string' ? s : s.name;
                                        return (
                                          <option key={sName} value={sName}>
                                            {sName}
                                          </option>
                                        );
                                      })}
                                    </select>
                                    <button
                                      type="button"
                                      className="admin-icon-btn"
                                      onClick={() => {
                                        const staffToNotify = lead.assignedStaff || defaultStaffName;
                                        notifyStaffViaWhatsApp(staffToNotify, {
                                          customerName: lead.name,
                                          phone: lead.phone,
                                          email: lead.email,
                                          requirement: lead.targetPlot || 'Plot Enquiry',
                                          budget: lead.budget || 'Standard',
                                          notes: lead.notes || lead.recommendation,
                                          date: lead.date
                                        });
                                      }}
                                      title={`Send lead details directly to assigned staff (${lead.assignedStaff || defaultStaffName}) via WhatsApp`}
                                      style={{ background: '#1A0709', border: '1.5px solid var(--gold-primary)', color: '#C6A15B', flexShrink: 0, width: '32px', height: '32px' }}
                                    >
                                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 0C5.385 0 0 5.386 0 12.031c0 2.124.553 4.197 1.604 6.02L0 24l6.155-1.614A11.968 11.968 0 0 0 12.03 24c6.645 0 12.03-5.385 12.03-12.031C24.06 5.386 18.675 0 12.031 0zm.012 22.012c-1.808 0-3.585-.486-5.143-1.408l-.369-.219-3.817 1.001 1.019-3.721-.241-.383A9.99 9.99 0 0 1 2.012 12.03c0-5.524 4.496-10.02 10.031-10.02 5.524 0 10.02 4.496 10.02 10.02 0 5.536-4.496 10.012-10.02 10.012zm5.503-7.519c-.302-.152-1.785-.881-2.062-.981-.277-.101-.479-.152-.68.152-.202.302-.782.981-.959 1.183-.176.201-.353.226-.655.075-1.745-.875-2.894-1.559-4.04-3.535-.302-.52.302-.482.864-1.608.101-.201.05-.378-.025-.529-.075-.152-.68-1.636-.932-2.24-.244-.588-.493-.508-.68-.518-.176-.009-.378-.009-.58-.009-.201 0-.528.075-.804.378-.277.302-1.057 1.032-1.057 2.518 0 1.486 1.082 2.92 1.233 3.122.151.201 2.128 3.25 5.156 4.558 2.164.935 2.809.845 3.791.7.636-.094 1.785-.73 2.037-1.435.252-.705.252-1.309.176-1.435-.076-.125-.278-.201-.58-.352z" /></svg>
                                    </button>
                                  </div>
                                </td>

                                <td style={{ verticalAlign: 'middle' }}>
                                  <select
                                    value={currentAction}
                                    onChange={(e) => handleUpdateLeadAction(lead.id, e.target.value)}
                                    style={{
                                      width: '100%',
                                      padding: '8px 10px',
                                      borderRadius: '4px',
                                      border: '1.5px solid var(--gold-border)',
                                      fontSize: '0.80rem',
                                      fontWeight: 800,
                                      letterSpacing: '0.4px',
                                      cursor: 'pointer',
                                      background:
                                        currentAction === 'CONTACTED' ? 'rgba(198, 161, 91, 0.22)' :
                                        currentAction === 'IN PROGRESS' ? 'rgba(44, 74, 111, 0.2)' :
                                        currentAction === 'SITE VISIT SCHEDULED' ? 'rgba(40, 167, 69, 0.2)' :
                                        currentAction === 'TOKEN PAID' ? 'rgba(169, 130, 58, 0.28)' :
                                        currentAction === 'REJECTED' ? 'rgba(217, 83, 79, 0.2)' :
                                        'rgba(10, 19, 37, 0.08)',
                                      color:
                                        currentAction === 'CONTACTED' ? '#8C6B28' :
                                        currentAction === 'IN PROGRESS' ? '#2C4A6F' :
                                        currentAction === 'SITE VISIT SCHEDULED' ? '#1e7e34' :
                                        currentAction === 'TOKEN PAID' ? '#8C6B28' :
                                        currentAction === 'REJECTED' ? '#C53030' :
                                        '#1A0709'
                                    }}
                                  >
                                    <option value="NEW LEAD">NEW LEAD</option>
                                    <option value="CONTACTED">CONTACTED</option>
                                    <option value="IN PROGRESS">IN PROGRESS</option>
                                    <option value="SITE VISIT SCHEDULED">SITE VISIT SCHEDULED</option>
                                    <option value="TOKEN PAID">TOKEN PAID</option>
                                    <option value="REJECTED">REJECTED</option>
                                  </select>
                                </td>

                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    {/* Call button */}
                                    <a
                                      href={`tel:${lead.phone}`}
                                      className="admin-icon-btn"
                                      title={`Call ${lead.name} (${lead.phone})`}
                                      style={{ background: '#1A0709', border: '1.5px solid var(--gold-primary)', color: '#FFFDF8' }}
                                    >
                                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C6A15B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                    </a>

                                    {/* WhatsApp button */}
                                    <a
                                      href={`https://wa.me/${cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone}?text=Hello%20${encodeURIComponent(lead.name)},%20this%20is%20SHASHTIKA%20Plot%20Developers%20regarding%20your%20interest%20in%20${encodeURIComponent(lead.targetPlot)}.`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="admin-icon-btn"
                                      title={`WhatsApp ${lead.name}`}
                                      style={{ background: '#1A0709', border: '1.5px solid var(--gold-primary)', color: '#C6A15B' }}
                                    >
                                      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 0C5.385 0 0 5.386 0 12.031c0 2.124.553 4.197 1.604 6.02L0 24l6.155-1.614A11.968 11.968 0 0 0 12.03 24c6.645 0 12.03-5.385 12.03-12.031C24.06 5.386 18.675 0 12.031 0zm.012 22.012c-1.808 0-3.585-.486-5.143-1.408l-.369-.219-3.817 1.001 1.019-3.721-.241-.383A9.99 9.99 0 0 1 2.012 12.03c0-5.524 4.496-10.02 10.031-10.02 5.524 0 10.02 4.496 10.02 10.02 0 5.536-4.496 10.012-10.02 10.012zm5.503-7.519c-.302-.152-1.785-.881-2.062-.981-.277-.101-.479-.152-.68.152-.202.302-.782.981-.959 1.183-.176.201-.353.226-.655.075-1.745-.875-2.894-1.559-4.04-3.535-.302-.52.302-.482.864-1.608.101-.201.05-.378-.025-.529-.075-.152-.68-1.636-.932-2.24-.244-.588-.493-.508-.68-.518-.176-.009-.378-.009-.58-.009-.201 0-.528.075-.804.378-.277.302-1.057 1.032-1.057 2.518 0 1.486 1.082 2.92 1.233 3.122.151.201 2.128 3.25 5.156 4.558 2.164.935 2.809.845 3.791.7.636-.094 1.785-.73 2.037-1.435.252-.705.252-1.309.176-1.435-.076-.125-.278-.201-.58-.352z" /></svg>
                                    </a>

                                    {/* Delete button */}
                                    <button
                                      onClick={() => handleDeleteLead(lead.id)}
                                      className="admin-icon-btn"
                                      title={`Delete Lead ${lead.id}`}
                                      style={{ background: '#D9534F', border: '1.5px solid #D9534F', color: '#FFFFFF' }}
                                    >
                                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* PANEL 2: PLOT MANAGEMENT TABLE */}
              {activeTab === 'plot-management' && (
                <div style={{ background: 'var(--bg-ivory)', border: '1.5px solid var(--gold-border)', borderRadius: 'var(--radius-md)', padding: '28px', boxShadow: 'var(--shadow-soft)' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '20px' }}>
                    <div>
                      <span className="architectural-tag">LIVE LAYOUT INVENTORY CONTROL</span>
                      <h3 style={{ fontSize: '1.4rem', color: '#1A0709', marginTop: '4px', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                        Plot Management Table
                      </h3>
                      <p style={{ fontSize: '0.88rem', color: 'rgba(10, 19, 37, 0.75)', marginTop: '4px' }}>
                        Changes update client-side localStorage state and live SVG layout map instantly.
                      </p>
                    </div>
                    <a
                      href="#plots"
                      className="btn btn-outline-gold"
                      style={{ fontSize: '0.75rem', padding: '8px 16px', textDecoration: 'none' }}
                    >
                      PREVIEW PLOTS MAP
                    </a>
                  </div>

                  {/* Location Selector Tabs */}
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setAdminPlotLocation('kambalampatti');
                        setPlotCurrentPage(1);
                        setPlotSearchQuery('');
                        setPlotStatusFilter('ALL');
                      }}
                      style={{
                        padding: '10px 20px',
                        borderRadius: '8px',
                        border: adminPlotLocation === 'kambalampatti' ? '2px solid #C6A15B' : '1px solid rgba(198,161,91,0.3)',
                        background: adminPlotLocation === 'kambalampatti' ? '#1A0709' : '#FFFDF8',
                        color: adminPlotLocation === 'kambalampatti' ? '#F3E5AB' : '#1A0709',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: adminPlotLocation === 'kambalampatti' ? '0 4px 14px rgba(10,19,37,0.35)' : 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span>KAMBALAMPATTI LAYOUT</span>
                      <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: '4px', background: adminPlotLocation === 'kambalampatti' ? '#C6A15B' : '#FAF4EB', color: adminPlotLocation === 'kambalampatti' ? '#1A0709' : '#8A6324', fontWeight: 900 }}>
                        64 PLOTS
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setAdminPlotLocation('kinathukadavu');
                        setPlotCurrentPage(1);
                        setPlotSearchQuery('');
                        setPlotStatusFilter('ALL');
                      }}
                      style={{
                        padding: '10px 20px',
                        borderRadius: '8px',
                        border: adminPlotLocation === 'kinathukadavu' ? '2px solid #C6A15B' : '1px solid rgba(198,161,91,0.3)',
                        background: adminPlotLocation === 'kinathukadavu' ? '#1A0709' : '#FFFDF8',
                        color: adminPlotLocation === 'kinathukadavu' ? '#F3E5AB' : '#1A0709',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: adminPlotLocation === 'kinathukadavu' ? '0 4px 14px rgba(10,19,37,0.35)' : 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span>KINATHUKADAVU LAYOUT</span>
                      <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: '4px', background: adminPlotLocation === 'kinathukadavu' ? '#C6A15B' : '#FAF4EB', color: adminPlotLocation === 'kinathukadavu' ? '#1A0709' : '#8A6324', fontWeight: 900 }}>
                        42 PLOTS
                      </span>
                    </button>
                  </div>

                  {/* Real-time Plot Search Bar & Status Filter */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '20px', background: 'rgba(198, 161, 91, 0.08)', padding: '14px 18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gold-border)' }}>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', flex: 1 }}>
                      <div style={{ position: 'relative', minWidth: '240px', flex: 1, maxWidth: '380px' }}>
                        <input
                          type="text"
                          placeholder="Search plot number (e.g. 14)..."
                          value={plotSearchQuery}
                          onChange={(e) => {
                            setPlotSearchQuery(e.target.value);
                            setPlotCurrentPage(1);
                          }}
                          style={{
                            width: '100%',
                            padding: '10px 14px 10px 38px',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--gold-border)',
                            background: 'var(--bg-cream)',
                            fontSize: '0.9rem',
                            color: '#1A0709',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        />
                        <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', fill: 'rgba(10,19,37,0.5)' }} viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
                      </div>

                      <select
                        value={plotStatusFilter}
                        onChange={(e) => {
                          setPlotStatusFilter(e.target.value);
                          setPlotCurrentPage(1);
                        }}
                        style={{
                          padding: '10px 14px',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--gold-border)',
                          background: 'var(--bg-cream)',
                          fontSize: '0.88rem',
                          color: '#1A0709',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        <option value="ALL">All Statuses ({plots.length})</option>
                        <option value="AVAILABLE">AVAILABLE ({plots.filter((p) => p.status === 'AVAILABLE').length})</option>
                        <option value="PRE-BOOKED">PRE-BOOKED ({plots.filter((p) => p.status === 'PRE-BOOKED').length})</option>
                        <option value="SOLD">SOLD ({plots.filter((p) => p.status === 'SOLD').length})</option>
                      </select>
                    </div>

                    <div style={{ fontSize: '0.82rem', fontWeight: 800, background: 'var(--gold-primary)', color: '#1A0709', padding: '5px 14px', borderRadius: '12px' }}>
                      {plotPageSize} / page
                    </div>
                  </div>

                  {/* Plots Table */}
                  <div className="admin-table-container" style={{ overflowX: 'auto', borderRadius: '4px', border: '1.5px solid var(--gold-border)' }}>
                    <div className="mobile-table-scroll-hint">
                      <span>Swipe horizontally to view all plot specifications &amp; status</span>
                    </div>
                    <table className="admin-table" style={{ width: '100%', minWidth: '880px' }}>
                      <thead>
                        <tr>
                          <th style={{ width: '12%', minWidth: '95px', textAlign: 'center', whiteSpace: 'nowrap' }}>PLOT NO</th>
                          <th style={{ width: '22%', minWidth: '190px', whiteSpace: 'nowrap' }}>SIZE</th>
                          <th style={{ width: '16%', minWidth: '150px', whiteSpace: 'nowrap' }}>FACING</th>
                          <th style={{ width: '22%', minWidth: '190px', whiteSpace: 'nowrap' }}>DIMENSION / ROAD</th>
                          <th style={{ width: '14%', minWidth: '125px', textAlign: 'center', whiteSpace: 'nowrap' }}>STATUS BADGE</th>
                          <th style={{ width: '14%', minWidth: '135px', textAlign: 'center', whiteSpace: 'nowrap' }}>CHANGE STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedPlots.length === 0 ? (
                          <tr>
                            <td colSpan="6" style={{ textAlign: 'center', padding: '24px', color: 'rgba(10,19,37,0.6)', fontWeight: 600 }}>
                              No plots found matching current search or filter criteria.
                            </td>
                          </tr>
                        ) : (
                          paginatedPlots.map((plot) => {
                            let badgeClass = 'badge-available';
                            if (plot.status === 'PRE-BOOKED') badgeClass = 'badge-prebooked';
                            if (plot.status === 'SOLD') badgeClass = 'badge-sold';

                            return (
                              <tr key={plot.number} style={{ borderBottom: '1px solid rgba(198, 161, 91, 0.2)' }}>
                                <td style={{ padding: '14px 12px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                                  <strong style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1A0709', fontFamily: 'var(--font-mono)' }}>
                                    PLOT {plot.number}
                                  </strong>
                                </td>
                                <td style={{ padding: '14px 12px', color: '#1A0709', fontWeight: 600, fontSize: '0.88rem', whiteSpace: 'nowrap' }}>
                                  <strong>{plot.sqft} Sq.Ft</strong> ({plot.cent} Cents {plot.remSqft > 0 ? `${plot.remSqft} Sq.Ft` : ''})
                                </td>
                                <td style={{ padding: '14px 12px', color: '#1A0709', fontWeight: 600, fontSize: '0.88rem', whiteSpace: 'nowrap' }}>
                                  {plot.facing}
                                </td>
                                <td style={{ padding: '14px 12px', color: 'rgba(10,19,37,0.85)', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                                  <div style={{ fontWeight: 700 }}>{plot.dim}</div>
                                  <div style={{ fontSize: '0.74rem', color: 'rgba(10,19,37,0.6)' }}>{plot.road}</div>
                                </td>
                                <td style={{ padding: '14px 12px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                                  <span className={`badge-status ${badgeClass}`}>{plot.status}</span>
                                </td>
                                <td style={{ padding: '14px 12px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                                  <select
                                    value={plot.status}
                                    onChange={(e) => handlePlotStatusChange(plot.number, e.target.value)}
                                    style={{
                                      padding: '6px 10px',
                                      borderRadius: '4px',
                                      border: '1.5px solid var(--gold-border)',
                                      fontSize: '0.82rem',
                                      fontWeight: 700,
                                      background: 'var(--bg-cream)',
                                      color: '#1A0709',
                                      cursor: 'pointer',
                                      whiteSpace: 'nowrap'
                                    }}
                                  >
                                    <option value="AVAILABLE">AVAILABLE</option>
                                    <option value="PRE-BOOKED">PRE-BOOKED</option>
                                    <option value="SOLD">SOLD</option>
                                  </select>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination Bar with Arrow Format */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--gold-border)' }}>
                    <div style={{ fontSize: '0.88rem', color: 'rgba(10,19,37,0.7)', fontWeight: 600 }}>
                      Showing {totalPlotRecords === 0 ? 0 : plotStartIndex + 1} &ndash; {plotEndIndex} of {totalPlotRecords} plots
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        className="btn btn-outline-gold"
                        style={{ padding: '6px 12px', fontSize: '0.85rem', fontWeight: 700, borderRadius: '6px', cursor: safePlotPage <= 1 ? 'not-allowed' : 'pointer', opacity: safePlotPage <= 1 ? 0.4 : 1 }}
                        disabled={safePlotPage <= 1}
                        onClick={() => setPlotCurrentPage(safePlotPage - 1)}
                      >
                        Prev
                      </button>

                      <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1A0709', padding: '0 10px' }}>
                        Page {safePlotPage} of {totalPlotPages}
                      </span>

                      <button
                        className="btn btn-outline-gold"
                        style={{ padding: '6px 12px', fontSize: '0.85rem', fontWeight: 700, borderRadius: '6px', cursor: safePlotPage >= totalPlotPages ? 'not-allowed' : 'pointer', opacity: safePlotPage >= totalPlotPages ? 0.4 : 1 }}
                        disabled={safePlotPage >= totalPlotPages}
                        onClick={() => setPlotCurrentPage(safePlotPage + 1)}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* PANEL 3: CUSTOMER DETAILS TABLE */}
              {activeTab === 'customer-tracker' && (
                <div style={{ background: 'var(--bg-ivory)', border: '1.5px solid var(--gold-border)', borderRadius: 'var(--radius-md)', padding: '28px', boxShadow: 'var(--shadow-soft)' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1.5px solid var(--gold-border)' }}>
                    <div>
                      <span className="architectural-tag">CENTRALIZED CLIENT REGISTRY</span>
                      <h3 style={{ fontSize: '1.4rem', color: '#1A0709', marginTop: '4px', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                        Customer Details
                      </h3>
                      <p style={{ fontSize: '0.88rem', color: 'rgba(10, 19, 37, 0.75)', marginTop: '4px' }}>
                        Complete directory of web enquiries and walk-in clients with requirements, contact information, and assigned staff.
                      </p>
                    </div>
                    <div className="admin-action-toolbar" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                      <button
                        onClick={() => setActiveTab('ai-leads')}
                        style={{
                          fontSize: '0.80rem',
                          padding: '10px 18px',
                          fontWeight: 800,
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          background: '#1A0709',
                          color: '#F3E5AB',
                          border: '1.5px solid #C6A15B',
                          boxShadow: '0 4px 14px rgba(10, 19, 37, 0.25)',
                          cursor: 'pointer',
                          letterSpacing: '0.4px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C6A15B" strokeWidth="2.2"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" /><circle cx="12" cy="10" r="3" /></svg>
                        AI LEADS PORTAL
                      </button>

                      <button
                        onClick={handleOpenStaffModal}
                        style={{
                          fontSize: '0.80rem',
                          padding: '10px 18px',
                          fontWeight: 800,
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          background: '#DC2626',
                          color: '#FFFFFF',
                          border: '1.5px solid #B91C1C',
                          boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)',
                          cursor: 'pointer',
                          letterSpacing: '0.4px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.4"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                        MANAGE STAFF
                      </button>

                      <button
                        onClick={() => handleOpenAddCustomerModal()}
                        style={{
                          fontSize: '0.80rem',
                          padding: '10px 18px',
                          fontWeight: 800,
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          background: 'linear-gradient(135deg, #C6A15B 0%, #AA7C11 100%)',
                          color: '#1A0709',
                          border: '1.5px solid #8C6B28',
                          boxShadow: '0 4px 14px rgba(198, 161, 91, 0.35)',
                          cursor: 'pointer',
                          letterSpacing: '0.4px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A0709" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        ADD NEW CUSTOMER RECORD
                      </button>

                      <button
                        onClick={() => setActiveTab('gallery-manager')}
                        style={{
                          fontSize: '0.80rem',
                          padding: '10px 18px',
                          fontWeight: 800,
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          background: '#800000',
                          color: '#FFFFFF',
                          border: '1.5px solid #C6A15B',
                          boxShadow: '0 4px 14px rgba(128, 0, 0, 0.25)',
                          cursor: 'pointer',
                          letterSpacing: '0.4px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.4">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                        PHOTO GALLERY ({allAdminGalleryImages.length})
                      </button>
                    </div>
                  </div>

                  {/* Filter Chips & Search Bar */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '20px', background: 'rgba(198, 161, 91, 0.08)', padding: '14px 18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gold-border)' }}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                      <button
                        className={`public-table-chip ${customerFilter === 'ALL' ? 'active' : ''}`}
                        onClick={() => setCustomerFilter('ALL')}
                      >
                        ALL CUSTOMERS ({custCountAll})
                      </button>
                      <button
                        className={`public-table-chip ${customerFilter === 'WEB' ? 'active' : ''}`}
                        onClick={() => setCustomerFilter('WEB')}
                      >
                        WEB ENQUIRIES ({custCountWeb})
                      </button>
                      <button
                        className={`public-table-chip ${customerFilter === 'WALK_IN' ? 'active' : ''}`}
                        onClick={() => setCustomerFilter('WALK_IN')}
                      >
                        WALK-IN CLIENTS ({custCountWalkIn})
                      </button>
                    </div>

                    <div style={{ position: 'relative', minWidth: '220px', maxWidth: '340px', flex: 1 }}>
                      <input
                        type="text"
                        placeholder="Search by name, phone, or plot..."
                        value={customerSearchQuery}
                        onChange={(e) => setCustomerSearchQuery(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 12px 8px 34px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--gold-border)',
                          background: 'var(--bg-cream)',
                          fontSize: '0.88rem',
                          color: '#1A0709',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ position: 'absolute', left: '10px', top: '10px', opacity: 0.5 }}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    </div>
                  </div>

                  {/* Customer Registry Table */}
                  <div className="admin-table-container" style={{ overflowX: 'auto', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--gold-border)' }}>
                    <div className="mobile-table-scroll-hint">
                      <span>Swipe horizontally to view full customer records &amp; pipeline</span>
                    </div>
                    <table className="admin-table" style={{ width: '100%', minWidth: '1060px' }}>
                      <thead>
                        <tr>
                          <th style={{ width: '11%', minWidth: '110px', whiteSpace: 'nowrap' }}>DATE &amp; ID</th>
                          <th style={{ width: '20%', minWidth: '180px', whiteSpace: 'nowrap' }}>CUSTOMER DETAILS</th>
                          <th style={{ width: '21%', minWidth: '190px', whiteSpace: 'nowrap' }}>REQUIREMENT &amp; NOTES</th>
                          <th style={{ width: '15%', minWidth: '160px', whiteSpace: 'nowrap' }}>ASSIGNED STAFF</th>
                          <th style={{ width: '15%', minWidth: '165px', whiteSpace: 'nowrap' }}>ACTIONS TAKEN</th>
                          <th style={{ width: '8%', minWidth: '85px', textAlign: 'center', whiteSpace: 'nowrap' }}>SOURCE</th>
                          <th style={{ width: '10%', minWidth: '110px', textAlign: 'center', whiteSpace: 'nowrap' }}>CONTACT</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCustomers.length === 0 ? (
                          <tr>
                            <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: 'rgba(10,19,37,0.6)', fontWeight: 600 }}>
                              No customer records found matching current criteria.
                            </td>
                          </tr>
                        ) : (
                          filteredCustomers.map((cust) => {
                            const isManual = cust.source === 'MANUAL WALK-IN';
                            const cleanPhone = String(cust.phone || '').replace(/[^0-9]/g, '');
                            return (
                              <tr
                                key={cust.id}
                                style={{
                                  borderBottom: '1px solid rgba(198, 161, 91, 0.2)',
                                  background: cust.isNew ? 'rgba(37, 211, 102, 0.06)' : undefined,
                                  borderLeft: cust.isNew ? '4px solid #10B981' : 'none',
                                  transition: 'all 0.3s ease'
                                }}
                              >
                                <td style={{ verticalAlign: 'top' }}>
                                  {cust.isNew && (
                                    <div style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                                      <span
                                        style={{
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          gap: '4px',
                                          background: 'linear-gradient(135deg, #10B981, #059669)',
                                          color: '#FFFFFF',
                                          fontSize: '0.64rem',
                                          fontWeight: 800,
                                          padding: '2px 8px',
                                          borderRadius: '12px',
                                          letterSpacing: '0.6px',
                                          boxShadow: '0 2px 6px rgba(16, 185, 129, 0.35)',
                                          textTransform: 'uppercase'
                                        }}
                                      >
                                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#FFFFFF' }}></span>
                                        NEW ENQUIRY
                                      </span>

                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleMarkAsRead(cust.id);
                                        }}
                                        title="Mark as read (remove New Enquiry tag)"
                                        style={{
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          gap: '4px',
                                          background: '#FAF6EE',
                                          border: '1.2px solid #10B981',
                                          color: '#065F46',
                                          fontSize: '0.66rem',
                                          fontWeight: 700,
                                          padding: '2px 8px',
                                          borderRadius: '8px',
                                          cursor: 'pointer',
                                          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                                          transition: 'all 0.18s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                          e.currentTarget.style.background = '#10B981';
                                          e.currentTarget.style.color = '#FFFFFF';
                                        }}
                                        onMouseLeave={(e) => {
                                          e.currentTarget.style.background = '#FAF6EE';
                                          e.currentTarget.style.color = '#065F46';
                                        }}
                                      >
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                          <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        <span>Mark as read</span>
                                      </button>
                                    </div>
                                  )}
                                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1A0709', marginBottom: '4px' }}>
                                    {cust.date}
                                  </div>
                                  <span style={{ fontSize: '0.7rem', fontWeight: 700, fontFamily: 'var(--font-mono)', padding: '2px 7px', background: 'rgba(198, 161, 91, 0.15)', border: '1px solid var(--gold-border)', color: '#8C6B28', borderRadius: '4px', display: 'inline-block' }}>
                                    {cust.id}
                                  </span>
                                </td>

                                <td style={{ verticalAlign: 'top' }}>
                                  <div style={{ fontWeight: 800, color: '#1A0709', fontSize: '0.95rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C6A15B" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                    <span>{cust.name}</span>
                                  </div>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '0.82rem' }}>
                                    <div style={{ color: '#1A0709', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                      <a href={`tel:${cust.phone}`} style={{ color: '#1A0709', textDecoration: 'none' }}>{cust.phone}</a>
                                    </div>
                                    {cust.email && cust.email !== 'N/A' && (
                                      <div style={{ color: 'rgba(10,19,37,0.7)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                        <span>{cust.email}</span>
                                      </div>
                                    )}
                                  </div>
                                </td>

                                <td style={{ verticalAlign: 'top' }}>
                                  <div style={{ fontWeight: 700, color: '#1A0709', fontSize: '0.86rem', marginBottom: '6px', display: 'inline-block', padding: '4px 10px', background: 'rgba(198, 161, 91, 0.15)', border: '1px solid #C6A15B', borderRadius: '4px' }}>
                                    {cust.requirement}
                                  </div>
                                  {cust.notes && (
                                    <div style={{ fontSize: '0.78rem', color: 'rgba(10,19,37,0.75)', lineHeight: 1.45, fontStyle: 'italic', background: 'rgba(0,0,0,0.03)', padding: '6px 10px', borderRadius: '4px', borderLeft: '3px solid var(--gold-primary)', marginTop: '4px' }}>
                                      &ldquo;{cust.notes}&rdquo;
                                    </div>
                                  )}
                                </td>

                                <td style={{ verticalAlign: 'middle', minWidth: '160px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <select
                                      value={cust.assignedStaff || defaultStaffName}
                                      onChange={(e) => handleUpdateCustomerStaff(cust.id, e.target.value)}
                                      style={{ padding: '8px 10px', borderRadius: '4px', border: '1.5px solid var(--gold-border)', fontSize: '0.8rem', fontWeight: 700, background: 'var(--bg-cream)', color: '#1A0709', flex: 1, cursor: 'pointer' }}
                                    >
                                      {staffRoster.map((s) => {
                                        const sName = typeof s === 'string' ? s : s.name;
                                        return (
                                          <option key={sName} value={sName}>
                                            {sName}
                                          </option>
                                        );
                                      })}
                                    </select>
                                    <button
                                      type="button"
                                      className="admin-icon-btn"
                                      onClick={() => {
                                        const staffToNotify = cust.assignedStaff || defaultStaffName;
                                        notifyStaffViaWhatsApp(staffToNotify, {
                                          customerName: cust.name,
                                          phone: cust.phone,
                                          email: cust.email,
                                          requirement: cust.requirement,
                                          budget: 'Standard',
                                          notes: cust.notes,
                                          date: cust.date
                                        });
                                      }}
                                      title={`Send customer details directly to assigned staff (${cust.assignedStaff || defaultStaffName}) via WhatsApp`}
                                      style={{ background: '#1A0709', border: '1.5px solid var(--gold-primary)', color: '#C6A15B', flexShrink: 0, width: '32px', height: '32px' }}
                                    >
                                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 0C5.385 0 0 5.386 0 12.031c0 2.124.553 4.197 1.604 6.02L0 24l6.155-1.614A11.968 11.968 0 0 0 12.03 24c6.645 0 12.03-5.385 12.03-12.031C24.06 5.386 18.675 0 12.031 0zm.012 22.012c-1.808 0-3.585-.486-5.143-1.408l-.369-.219-3.817 1.001 1.019-3.721-.241-.383A9.99 9.99 0 0 1 2.012 12.03c0-5.524 4.496-10.02 10.031-10.02 5.524 0 10.02 4.496 10.02 10.02 0 5.536-4.496 10.012-10.02 10.012zm5.503-7.519c-.302-.152-1.785-.881-2.062-.981-.277-.101-.479-.152-.68.152-.202.302-.782.981-.959 1.183-.176.201-.353.226-.655.075-1.745-.875-2.894-1.559-4.04-3.535-.302-.52.302-.482.864-1.608.101-.201.05-.378-.025-.529-.075-.152-.68-1.636-.932-2.24-.244-.588-.493-.508-.68-.518-.176-.009-.378-.009-.58-.009-.201 0-.528.075-.804.378-.277.302-1.057 1.032-1.057 2.518 0 1.486 1.082 2.92 1.233 3.122.151.201 2.128 3.25 5.156 4.558 2.164.935 2.809.845 3.791.7.636-.094 1.785-.73 2.037-1.435.252-.705.252-1.309.176-1.435-.076-.125-.278-.201-.58-.352z" /></svg>
                                    </button>
                                  </div>
                                </td>

                                <td style={{ verticalAlign: 'middle', minWidth: '165px' }}>
                                  <select
                                    value={cust.actionTaken || 'NEW LEAD'}
                                    onChange={(e) => handleUpdateCustomerAction(cust.id, e.target.value)}
                                    style={{
                                      width: '100%',
                                      padding: '8px 10px',
                                      borderRadius: '4px',
                                      border: '1.5px solid var(--gold-border)',
                                      fontSize: '0.80rem',
                                      fontWeight: 800,
                                      letterSpacing: '0.4px',
                                      cursor: 'pointer',
                                      background:
                                        (cust.actionTaken || 'NEW LEAD') === 'CONTACTED' ? 'rgba(198, 161, 91, 0.22)' :
                                        (cust.actionTaken || 'NEW LEAD') === 'IN PROGRESS' ? 'rgba(44, 74, 111, 0.2)' :
                                        (cust.actionTaken || 'NEW LEAD') === 'SITE VISIT SCHEDULED' ? 'rgba(40, 167, 69, 0.2)' :
                                        (cust.actionTaken || 'NEW LEAD') === 'TOKEN PAID' ? 'rgba(169, 130, 58, 0.28)' :
                                        (cust.actionTaken || 'NEW LEAD') === 'REJECTED' ? 'rgba(217, 83, 79, 0.2)' :
                                        'rgba(10, 19, 37, 0.08)',
                                      color:
                                        (cust.actionTaken || 'NEW LEAD') === 'CONTACTED' ? '#8C6B28' :
                                        (cust.actionTaken || 'NEW LEAD') === 'IN PROGRESS' ? '#2C4A6F' :
                                        (cust.actionTaken || 'NEW LEAD') === 'SITE VISIT SCHEDULED' ? '#1e7e34' :
                                        (cust.actionTaken || 'NEW LEAD') === 'TOKEN PAID' ? '#8C6B28' :
                                        (cust.actionTaken || 'NEW LEAD') === 'REJECTED' ? '#C53030' :
                                        '#1A0709'
                                    }}
                                  >
                                    <option value="NEW LEAD">NEW LEAD</option>
                                    <option value="CONTACTED">CONTACTED</option>
                                    <option value="IN PROGRESS">IN PROGRESS</option>
                                    <option value="SITE VISIT SCHEDULED">SITE VISIT SCHEDULED</option>
                                    <option value="TOKEN PAID">TOKEN PAID</option>
                                    <option value="REJECTED">REJECTED</option>
                                  </select>
                                </td>

                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                  <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '4px 8px', borderRadius: '12px', background: isManual ? 'rgba(198, 161, 91, 0.2)' : 'rgba(43, 67, 96, 0.12)', color: isManual ? '#8C6B28' : '#2B4360', border: `1px solid ${isManual ? '#C6A15B' : '#2B4360'}`, display: 'inline-block' }}>
                                    {cust.source}
                                  </span>
                                </td>

                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                                    {/* Call button */}
                                    <a
                                      href={`tel:${cust.phone}`}
                                      className="admin-icon-btn"
                                      title={`Call ${cust.name} (${cust.phone})`}
                                      style={{ background: '#1A0709', border: '1.5px solid var(--gold-primary)', color: '#FFFDF8' }}
                                    >
                                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C6A15B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                    </a>

                                    {/* WhatsApp button */}
                                    <a
                                      href={`https://wa.me/${cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone}?text=Hello%20${encodeURIComponent(cust.name)},%20this%20is%20SHASHTIKA%20Plot%20Developers%20regarding%20your%20property%20requirement.`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="admin-icon-btn"
                                      title={`WhatsApp ${cust.name}`}
                                      style={{ background: '#1A0709', border: '1.5px solid var(--gold-primary)', color: '#C6A15B' }}
                                    >
                                      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 0C5.385 0 0 5.386 0 12.031c0 2.124.553 4.197 1.604 6.02L0 24l6.155-1.614A11.968 11.968 0 0 0 12.03 24c6.645 0 12.03-5.385 12.03-12.031C24.06 5.386 18.675 0 12.031 0zm.012 22.012c-1.808 0-3.585-.486-5.143-1.408l-.369-.219-3.817 1.001 1.019-3.721-.241-.383A9.99 9.99 0 0 1 2.012 12.03c0-5.524 4.496-10.02 10.031-10.02 5.524 0 10.02 4.496 10.02 10.02 0 5.536-4.496 10.012-10.02 10.012zm5.503-7.519c-.302-.152-1.785-.881-2.062-.981-.277-.101-.479-.152-.68.152-.202.302-.782.981-.959 1.183-.176.201-.353.226-.655.075-1.745-.875-2.894-1.559-4.04-3.535-.302-.52.302-.482.864-1.608.101-.201.05-.378-.025-.529-.075-.152-.68-1.636-.932-2.24-.244-.588-.493-.508-.68-.518-.176-.009-.378-.009-.58-.009-.201 0-.528.075-.804.378-.277.302-1.057 1.032-1.057 2.518 0 1.486 1.082 2.92 1.233 3.122.151.201 2.128 3.25 5.156 4.558 2.164.935 2.809.845 3.791.7.636-.094 1.785-.73 2.037-1.435.252-.705.252-1.309.176-1.435-.076-.125-.278-.201-.58-.352z" /></svg>
                                    </a>

                                    {/* Edit button */}
                                    <button
                                      onClick={() => handleOpenAddCustomerModal(cust.id)}
                                      className="admin-icon-btn"
                                      title={`Edit ${cust.name}`}
                                      style={{ background: 'var(--gold-primary)', border: '1.5px solid var(--gold-primary)', color: '#1A0709' }}
                                    >
                                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1A0709" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                                    </button>

                                    {/* Delete button */}
                                    <button
                                      onClick={() => handleDeleteCustomer(cust.id)}
                                      className="admin-icon-btn"
                                      title={`Delete ${cust.name}`}
                                      style={{ background: '#D9534F', border: '1.5px solid #D9534F', color: '#FFFFFF' }}
                                    >
                                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* PANEL 4: PROJECT DEVELOPMENTS & PHOTO GALLERY */}
              {activeTab === 'gallery-manager' && (
                <div style={{ background: 'var(--bg-cream)', border: '1.8px solid var(--gold-primary)', borderRadius: 'var(--radius-md)', padding: '28px', boxShadow: '0 12px 35px rgba(26, 7, 9, 0.12), 0 0 20px rgba(198, 161, 91, 0.18)', position: 'relative', overflow: 'hidden' }}>
                  {/* TOP METALLIC GOLD ACCENT STRIP */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #A9823A, #C6A15B, #E5D2A6, #C6A15B, #A9823A)' }} />

                  {/* HEADER AREA */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid rgba(198, 161, 91, 0.3)' }}>
                    <div style={{ maxWidth: '780px' }}>
                      <div className="architectural-tag" style={{ marginBottom: '8px', color: 'var(--gold-antique)', fontWeight: 700 }}>
                        PROJECT DEVELOPMENTS &amp; PHOTO GALLERY
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.4rem, 2.5vw, 2.0rem)', color: '#1A0709', fontWeight: 800, letterSpacing: '0.5px', margin: 0 }}>
                        Project Developments &amp; Photo Gallery Manager
                      </h3>
                    </div>

                    <div className="admin-action-toolbar" style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginTop: '6px' }}>
                      <a
                        href="/gallery"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '0.80rem',
                          padding: '10px 18px',
                          fontWeight: 800,
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          background: '#1A0709',
                          color: '#F3E5AB',
                          border: '1.5px solid #C6A15B',
                          boxShadow: '0 4px 14px rgba(10, 19, 37, 0.35)',
                          cursor: 'pointer',
                          letterSpacing: '0.4px',
                          textDecoration: 'none',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C6A15B" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                        VIEW PUBLIC GALLERY PAGE ↗
                      </a>

                      <button
                        type="button"
                        onClick={handleResetGalleryToDefault}
                        title="Restore original 16 default layout photos"
                        style={{
                          fontSize: '0.80rem',
                          padding: '10px 16px',
                          fontWeight: 700,
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: '#FFFFFF',
                          color: '#800000',
                          border: '1.5px solid rgba(128, 0, 0, 0.35)',
                          cursor: 'pointer',
                          letterSpacing: '0.3px'
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                        RESET TO DEFAULTS
                      </button>

                      <button
                        onClick={() => setActiveTab('customer-tracker')}
                        style={{
                          fontSize: '0.80rem',
                          padding: '10px 18px',
                          fontWeight: 800,
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          background: 'rgba(255, 255, 255, 0.9)',
                          color: '#1A0709',
                          border: '1.5px solid rgba(198, 161, 91, 0.6)',
                          cursor: 'pointer',
                          letterSpacing: '0.4px'
                        }}
                      >
                        CUSTOMER DETAILS
                      </button>
                    </div>
                  </div>

                  {/* QUICK STATS CHIPS */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
                    <div style={{ background: '#FFFFFF', border: '1.5px solid rgba(198, 161, 91, 0.35)', borderRadius: '8px', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                      <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(198, 161, 91, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A9823A', flexShrink: 0 }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.70rem', fontWeight: 800, color: 'rgba(26, 7, 9, 0.6)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Gallery Photos</div>
                        <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1A0709', fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}>{allAdminGalleryImages.length}</div>
                      </div>
                    </div>

                    <div style={{ background: '#FFFFFF', border: '1.5px solid rgba(16, 185, 129, 0.4)', borderRadius: '8px', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                      <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669', flexShrink: 0 }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.70rem', fontWeight: 800, color: '#047857', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Customization</div>
                        <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#065F46', fontFamily: 'var(--font-heading)', lineHeight: 1.2 }}>100% Editable</div>
                      </div>
                    </div>

                    <div style={{ background: '#FFFFFF', border: '1.5px solid rgba(220, 38, 38, 0.35)', borderRadius: '8px', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                      <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(220, 38, 38, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#DC2626', flexShrink: 0 }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /></svg>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.70rem', fontWeight: 800, color: 'rgba(26, 7, 9, 0.6)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Removable</div>
                        <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#DC2626', fontFamily: 'var(--font-heading)', lineHeight: 1.2 }}>Delete Any Photo</div>
                      </div>
                    </div>

                    <div style={{ background: '#FFFFFF', border: '1.5px solid rgba(198, 161, 91, 0.35)', borderRadius: '8px', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                      <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(128, 0, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#800000', flexShrink: 0 }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.70rem', fontWeight: 800, color: 'rgba(26, 7, 9, 0.6)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active Pillars</div>
                        <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#800000', fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}>5 Categories</div>
                      </div>
                    </div>
                  </div>

                  {/* NOTIFICATIONS */}
                  {galleryUploadSuccess && (
                    <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1.5px solid #059669', color: '#065F46', padding: '12px 18px', borderRadius: '8px', marginBottom: '20px', fontWeight: 600, fontSize: '0.88rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                        <span>{galleryUploadSuccess}</span>
                      </div>
                      <button type="button" onClick={() => setGalleryUploadSuccess('')} style={{ background: 'none', border: 'none', color: '#065F46', fontSize: '1.2rem', cursor: 'pointer', lineHeight: 1 }}>&times;</button>
                    </div>
                  )}

                  {galleryUploadError && (
                    <div style={{ background: 'rgba(220, 38, 38, 0.12)', border: '1.5px solid #DC2626', color: '#991B1B', padding: '12px 18px', borderRadius: '8px', marginBottom: '20px', fontWeight: 600, fontSize: '0.88rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                        <span>{galleryUploadError}</span>
                      </div>
                      <button type="button" onClick={() => setGalleryUploadError('')} style={{ background: 'none', border: 'none', color: '#991B1B', fontSize: '1.2rem', cursor: 'pointer', lineHeight: 1 }}>&times;</button>
                    </div>
                  )}

                  {/* UPLOAD NEW SITE PHOTO CARD */}
                  <div style={{ background: '#FFFFFF', border: '1.5px solid var(--gold-border)', borderRadius: 'var(--radius-md)', padding: '24px', marginBottom: '28px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px', paddingBottom: '12px', borderBottom: '1.2px solid rgba(198, 161, 91, 0.25)' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'var(--gold-primary)', color: '#1A0709', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '1.15rem', color: '#1A0709', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>Upload New Site Photo</h4>
                        <span style={{ fontSize: '0.78rem', color: 'rgba(26, 7, 9, 0.65)' }}>Directly publish new progress photographs to the public photo gallery</span>
                      </div>
                    </div>

                    <form onSubmit={handleAddGalleryPhoto}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '22px', alignItems: 'start' }}>
                        {/* LEFT COLUMN: FILE DROPZONE & PREVIEW */}
                        <div>
                          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#1A0709', marginBottom: '8px', letterSpacing: '0.3px' }}>
                            PHOTO FILE (LOCAL DEVICE / CAMERA) *
                          </label>

                          {galleryPreview ? (
                            <div style={{ position: 'relative', border: '2px solid var(--gold-primary)', borderRadius: '8px', overflow: 'hidden', background: '#1A0709', maxHeight: '240px' }}>
                              <img
                                src={galleryPreview}
                                alt="Preview"
                                style={{ width: '100%', height: '240px', objectFit: 'cover', display: 'block' }}
                              />
                              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(26, 7, 9, 0.85)', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.74rem', color: '#F3E5AB', fontWeight: 600 }}>Optimized for Web (~120KB)</span>
                                <button
                                  type="button"
                                  onClick={() => { setGalleryPreview(''); setGalleryForm((p) => ({ ...p, src: '' })); }}
                                  style={{ background: '#DC2626', color: '#FFFFFF', border: 'none', borderRadius: '4px', padding: '4px 8px', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}
                                >
                                  Remove Photo
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div
                              style={{
                                border: '2px dashed var(--gold-primary)',
                                borderRadius: '8px',
                                background: 'rgba(198, 161, 91, 0.06)',
                                padding: '26px 16px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                position: 'relative'
                              }}
                            >
                              <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handleGalleryFileChange}
                                style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}
                              />
                              <div style={{ width: '48px', height: '48px', margin: '0 auto 10px', borderRadius: '50%', background: 'rgba(198, 161, 91, 0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A9823A' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                              </div>
                              <div style={{ fontSize: '0.90rem', fontWeight: 700, color: '#1A0709', marginBottom: '4px' }}>
                                {galleryUploading ? 'Compressing Image...' : 'Click to Browse or Drag Photo Here'}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: 'rgba(26, 7, 9, 0.65)' }}>
                                JPG, PNG, WEBP (Auto-optimized client side)
                              </div>
                            </div>
                          )}

                          <div style={{ marginTop: '12px' }}>
                            <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'rgba(26, 7, 9, 0.7)', marginBottom: '4px' }}>
                              OR Enter Direct Image URL / Static Path:
                            </label>
                            <input
                              type="text"
                              value={galleryForm.src}
                              placeholder="e.g. /Images/Hero_Arch.jpg or https://..."
                              onChange={(e) => {
                                setGalleryForm((p) => ({ ...p, src: e.target.value }));
                              }}
                              style={{
                                width: '100%',
                                padding: '9px 12px',
                                fontSize: '0.84rem',
                                borderRadius: '6px',
                                border: '1.2px solid rgba(198, 161, 91, 0.4)',
                                background: '#FFFFFF',
                                color: '#1A0709',
                                outline: 'none'
                              }}
                            />
                          </div>
                        </div>

                        {/* RIGHT COLUMN: METADATA FIELDS */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#1A0709', marginBottom: '6px' }}>
                              PHOTO TITLE *
                            </label>
                            <input
                              type="text"
                              required
                              value={galleryForm.title}
                              placeholder="e.g. 40ft Main Tar Road Bitumen Paving & Kerbs"
                              onChange={(e) => setGalleryForm((p) => ({ ...p, title: e.target.value }))}
                              style={{
                                width: '100%',
                                padding: '10px 14px',
                                fontSize: '0.88rem',
                                borderRadius: '6px',
                                border: '1.5px solid rgba(198, 161, 91, 0.5)',
                                background: '#FFFFFF',
                                color: '#1A0709',
                                outline: 'none',
                                fontWeight: 600
                              }}
                            />
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#1A0709', marginBottom: '6px' }}>
                                CATEGORY *
                              </label>
                              <select
                                value={galleryForm.category}
                                onChange={(e) => setGalleryForm((p) => ({ ...p, category: e.target.value }))}
                                style={{
                                  width: '100%',
                                  padding: '10px 14px',
                                  fontSize: '0.86rem',
                                  borderRadius: '6px',
                                  border: '1.5px solid rgba(198, 161, 91, 0.5)',
                                  background: '#FFFFFF',
                                  color: '#1A0709',
                                  outline: 'none',
                                  fontWeight: 600
                                }}
                              >
                                <option value="arches">ENTRANCE ARCH</option>
                                <option value="roads">TAR ROADS</option>
                                <option value="construction">CONSTRUCTION</option>
                                <option value="villas">LUXURY VILLA</option>
                                <option value="planning">TOWN PLANNING</option>
                              </select>
                            </div>

                            <div>
                              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#1A0709', marginBottom: '6px' }}>
                                SITE LOCATION
                              </label>
                              <input
                                type="text"
                                value={galleryForm.location}
                                placeholder="e.g. Kambalampatti, Pollachi"
                                onChange={(e) => setGalleryForm((p) => ({ ...p, location: e.target.value }))}
                                style={{
                                  width: '100%',
                                  padding: '10px 14px',
                                  fontSize: '0.86rem',
                                  borderRadius: '6px',
                                  border: '1.5px solid rgba(198, 161, 91, 0.5)',
                                  background: '#FFFFFF',
                                  color: '#1A0709',
                                  outline: 'none',
                                  fontWeight: 500
                                }}
                              />
                            </div>
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#1A0709', marginBottom: '6px' }}>
                              SHORT DESCRIPTION / REMARKS
                            </label>
                            <textarea
                              rows={3}
                              value={galleryForm.desc}
                              placeholder="e.g. 4-layer asphalt compaction with underground stormwater drainage lines completed by on-site civil team."
                              onChange={(e) => setGalleryForm((p) => ({ ...p, desc: e.target.value }))}
                              style={{
                                width: '100%',
                                padding: '10px 14px',
                                fontSize: '0.86rem',
                                borderRadius: '6px',
                                border: '1.5px solid rgba(198, 161, 91, 0.5)',
                                background: '#FFFFFF',
                                color: '#1A0709',
                                outline: 'none',
                                resize: 'vertical',
                                fontFamily: 'inherit'
                              }}
                            />
                          </div>

                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '6px' }}>
                            <button
                              type="submit"
                              disabled={galleryUploading || (!galleryPreview && !galleryForm.src.trim()) || !galleryForm.title.trim()}
                              style={{
                                padding: '12px 24px',
                                fontSize: '0.86rem',
                                fontWeight: 800,
                                borderRadius: '6px',
                                background: 'linear-gradient(135deg, #C6A15B 0%, #AA7C11 100%)',
                                color: '#1A0709',
                                border: '1.5px solid #8C6B28',
                                boxShadow: '0 4px 14px rgba(198, 161, 91, 0.35)',
                                cursor: 'pointer',
                                letterSpacing: '0.4px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                opacity: (galleryUploading || (!galleryPreview && !galleryForm.src.trim()) || !galleryForm.title.trim()) ? 0.5 : 1
                              }}
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A0709" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                              {galleryUploading ? 'PROCESSING...' : 'UPLOAD TO PUBLIC GALLERY'}
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setGalleryForm({ title: '', category: 'arches', location: 'Kambalampatti, Pollachi', desc: '', src: '' });
                                setGalleryPreview('');
                                setGalleryUploadError('');
                              }}
                              style={{
                                padding: '12px 18px',
                                fontSize: '0.84rem',
                                fontWeight: 700,
                                borderRadius: '6px',
                                background: 'transparent',
                                color: 'rgba(26, 7, 9, 0.7)',
                                border: '1.2px solid rgba(26, 7, 9, 0.25)',
                                cursor: 'pointer'
                              }}
                            >
                              Reset
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* GALLERY SEARCH & CATEGORY FILTER BAR */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '20px', background: 'rgba(198, 161, 91, 0.08)', padding: '14px 18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gold-border)' }}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                      {GALLERY_CATEGORIES.map((cat) => (
                        <button
                          key={cat.value}
                          type="button"
                          className={`public-table-chip ${galleryFilter === cat.value ? 'active' : ''}`}
                          onClick={() => setGalleryFilter(cat.value)}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    <div style={{ position: 'relative', minWidth: '260px' }}>
                      <input
                        type="text"
                        placeholder="Search photos by title, location..."
                        value={gallerySearchQuery}
                        onChange={(e) => setGallerySearchQuery(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '9px 14px 9px 36px',
                          fontSize: '0.84rem',
                          borderRadius: '6px',
                          border: '1.2px solid var(--gold-border)',
                          background: '#FFFFFF',
                          color: '#1A0709',
                          outline: 'none'
                        }}
                      />
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(26, 7, 9, 0.5)" strokeWidth="2.2" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      {gallerySearchQuery && (
                        <button
                          type="button"
                          onClick={() => setGallerySearchQuery('')}
                          style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '1rem' }}
                        >
                          &times;
                        </button>
                      )}
                    </div>
                  </div>

                  {/* GALLERY PHOTOS GRID */}
                  <div style={{ marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.80rem', fontWeight: 700, color: 'rgba(26, 7, 9, 0.7)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Showing {filteredAdminGalleryImages.length} of {allAdminGalleryImages.length} Photographs
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#047857', fontWeight: 700 }}>
                      ✓ All {allAdminGalleryImages.length} photos editable & removable
                    </span>
                  </div>

                  {filteredAdminGalleryImages.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 20px', background: '#FFFFFF', borderRadius: '8px', border: '1px dashed var(--gold-border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--gold-antique)' }}>
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                          <circle cx="12" cy="13" r="4"/>
                        </svg>
                      </div>
                      <h4 style={{ color: '#1A0709', margin: '0 0 6px', fontFamily: 'var(--font-heading)' }}>No Photos Found</h4>
                      <p style={{ color: 'rgba(26, 7, 9, 0.6)', fontSize: '0.86rem', margin: 0 }}>Try clearing your search query or switching categories.</p>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                      {filteredAdminGalleryImages.map((photo) => (
                        <div
                          key={photo.id}
                          style={{
                            background: '#FFFFFF',
                            border: photo.isCustom ? '1.8px solid #10B981' : '1.2px solid rgba(198, 161, 91, 0.35)',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: photo.isCustom ? '0 6px 18px rgba(16, 185, 129, 0.15)' : '0 4px 12px rgba(0,0,0,0.04)',
                            transition: 'all 0.2s ease',
                            position: 'relative'
                          }}
                        >
                          {/* IMAGE THUMBNAIL */}
                          <div style={{ position: 'relative', height: '180px', overflow: 'hidden', background: '#1A0709', cursor: 'pointer' }} onClick={() => setAdminGalleryLightboxImg(photo)}>
                            <img
                              src={photo.src}
                              alt={photo.title}
                              loading="lazy"
                              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                            />
                            {/* CATEGORY BADGE */}
                            <span
                              style={{
                                position: 'absolute',
                                top: '10px',
                                left: '10px',
                                background: '#1A0709',
                                color: 'var(--gold-light)',
                                border: '1px solid rgba(198, 161, 91, 0.5)',
                                padding: '3px 8px',
                                borderRadius: '4px',
                                fontSize: '0.68rem',
                                fontWeight: 800,
                                letterSpacing: '0.5px'
                              }}
                            >
                              {photo.categoryLabel || CATEGORY_LABELS[photo.category] || photo.category}
                            </span>

                            {/* CUSTOM OR DEFAULT BADGE */}
                            {photo.isCustom ? (
                              <span
                                style={{
                                  position: 'absolute',
                                  top: '10px',
                                  right: '10px',
                                  background: '#065F46',
                                  color: '#FFFFFF',
                                  border: '1px solid #10B981',
                                  padding: '3px 8px',
                                  borderRadius: '4px',
                                  fontSize: '0.68rem',
                                  fontWeight: 800,
                                  letterSpacing: '0.5px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                ★ CUSTOM
                              </span>
                            ) : (
                              <span
                                style={{
                                  position: 'absolute',
                                  top: '10px',
                                  right: '10px',
                                  background: 'rgba(26, 7, 9, 0.75)',
                                  color: 'rgba(255, 255, 255, 0.8)',
                                  padding: '3px 8px',
                                  borderRadius: '4px',
                                  fontSize: '0.65rem',
                                  fontWeight: 600
                                }}
                              >
                                CATALOG
                              </span>
                            )}
                          </div>

                          {/* BODY */}
                          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                            <h5 style={{ margin: '0 0 6px', fontSize: '0.94rem', color: '#1A0709', fontFamily: 'var(--font-heading)', fontWeight: 800, lineHeight: 1.3 }}>
                              {photo.title}
                            </h5>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#8C6B28', fontWeight: 600, marginBottom: '8px' }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{photo.location}</span>
                            </div>
                            <p style={{ margin: '0 0 14px', fontSize: '0.80rem', color: 'rgba(26, 7, 9, 0.7)', lineHeight: 1.5, flexGrow: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                              {photo.desc}
                            </p>

                            {/* CARD FOOTER WITH EDIT, PREVIEW, AND REMOVE */}
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid rgba(198, 161, 91, 0.2)', marginTop: 'auto', flexWrap: 'wrap' }}>
                              <div style={{ display: 'flex', gap: '6px' }}>
                                <button
                                  type="button"
                                  onClick={() => handleOpenEditPhoto(photo)}
                                  title="Edit details (title, category, location, remarks, or image)"
                                  style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    color: '#1A0709',
                                    background: 'linear-gradient(135deg, #E5D2A6 0%, #C6A15B 100%)',
                                    border: '1px solid #8C6B28',
                                    borderRadius: '5px',
                                    padding: '6px 11px',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                                  }}
                                >
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                                  Edit
                                </button>

                                <button
                                  type="button"
                                  onClick={() => setAdminGalleryLightboxImg(photo)}
                                  title="Enlarge photograph"
                                  style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    color: '#1A0709',
                                    background: 'rgba(198, 161, 91, 0.15)',
                                    border: '1px solid rgba(198, 161, 91, 0.4)',
                                    borderRadius: '5px',
                                    padding: '6px 10px',
                                    cursor: 'pointer'
                                  }}
                                >
                                  Preview
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleDeleteGalleryPhoto(photo.id, photo.title)}
                                title="Remove photo from public gallery"
                                style={{
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  color: '#DC2626',
                                  background: 'rgba(220, 38, 38, 0.08)',
                                  border: '1px solid rgba(220, 38, 38, 0.35)',
                                  borderRadius: '5px',
                                  padding: '6px 10px',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /></svg>
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* STAFF ROSTER MANAGEMENT MODAL WITH EDITABLE MOBILE NUMBERS */}
      {staffModalOpen && (
        <div className="admin-modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="admin-modal-card admin-staff-modal-card" style={{ background: 'var(--bg-ivory)', border: '1.5px solid var(--gold-border)', borderRadius: 'var(--radius-md)', maxWidth: '640px', width: '100%', padding: '24px 28px', boxShadow: '0 20px 50px rgba(0,0,0,0.4)', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--gold-border)', paddingBottom: '10px' }}>
              <div>
                <span className="architectural-tag" style={{ fontSize: '0.65rem' }}>TEAM MANAGEMENT &amp; WHATSAPP DISPATCH</span>
                <h3 style={{ color: '#1A0709', marginTop: '2px', fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                  Manage Staff
                </h3>
              </div>
              <button
                onClick={() => setStaffModalOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.6rem', color: '#1A0709', cursor: 'pointer' }}
              >
                &times;
              </button>
            </div>

            <div style={{ background: 'rgba(198, 161, 91, 0.12)', border: '1px solid rgba(198, 161, 91, 0.45)', borderRadius: '6px', padding: '10px 14px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#C6A15B" style={{ flexShrink: 0 }}><path d="M12.031 0C5.385 0 0 5.386 0 12.031c0 2.124.553 4.197 1.604 6.02L0 24l6.155-1.614A11.968 11.968 0 0 0 12.03 24c6.645 0 12.03-5.385 12.03-12.031C24.06 5.386 18.675 0 12.031 0zm.012 22.012c-1.808 0-3.585-.486-5.143-1.408l-.369-.219-3.817 1.001 1.019-3.721-.241-.383A9.99 9.99 0 0 1 2.012 12.03c0-5.524 4.496-10.02 10.031-10.02 5.524 0 10.02 4.496 10.02 10.02 0 5.536-4.496 10.012-10.02 10.012zm5.503-7.519c-.302-.152-1.785-.881-2.062-.981-.277-.101-.479-.152-.68.152-.202.302-.782.981-.959 1.183-.176.201-.353.226-.655.075-1.745-.875-2.894-1.559-4.04-3.535-.302-.52.302-.482.864-1.608.101-.201.05-.378-.025-.529-.075-.152-.68-1.636-.932-2.24-.244-.588-.493-.508-.68-.518-.176-.009-.378-.009-.58-.009-.201 0-.528.075-.804.378-.277.302-1.057 1.032-1.057 2.518 0 1.486 1.082 2.92 1.233 3.122.151.201 2.128 3.25 5.156 4.558 2.164.935 2.809.845 3.791.7.636-.094 1.785-.73 2.037-1.435.252-.705.252-1.309.176-1.435-.076-.125-.278-.201-.58-.352z" /></svg>
              <p style={{ margin: 0, fontSize: '0.80rem', color: '#1A0709', lineHeight: 1.4 }}>
                <strong>Automated WhatsApp Notifications:</strong> When a customer is assigned to a staff member, their enquiry details will automatically reach that staff member&apos;s WhatsApp number.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {tempStaff.map((staffObj, idx) => {
                const sName = typeof staffObj === 'string' ? staffObj : staffObj.name || '';
                const sPhone = typeof staffObj === 'string' ? '' : staffObj.phone || '';

                return (
                  <div
                    className="admin-staff-row"
                    key={staffObj.id || idx}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1.4fr 1.1fr auto',
                      gap: '10px',
                      alignItems: 'center',
                      background: 'var(--bg-cream)',
                      border: '1px solid var(--gold-border)',
                      borderRadius: '6px',
                      padding: '10px 12px'
                    }}
                  >
                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, color: '#1A0709', marginBottom: '3px' }}>
                        STAFF #{idx + 1} NAME &amp; DESIGNATION
                      </label>
                      <input
                        type="text"
                        value={sName}
                        onChange={(e) => {
                          const updated = [...tempStaff];
                          updated[idx] = {
                            id: staffObj.id || `STAFF-${idx + 1}`,
                            name: e.target.value,
                            phone: sPhone
                          };
                          setTempStaff(updated);
                        }}
                        placeholder="e.g. Ramesh Kumar (Sales Lead)"
                        required
                        style={{
                          width: '100%',
                          padding: '8px 10px',
                          fontSize: '0.86rem',
                          borderRadius: '4px',
                          border: '1px solid var(--gold-border)',
                          background: '#FFFDF8',
                          color: '#1A0709',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, color: '#1A0709', marginBottom: '3px' }}>
                        WHATSAPP NUMBER
                      </label>
                      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <span style={{ position: 'absolute', left: '8px', fontSize: '0.75rem', fontWeight: 800, color: '#C6A15B' }}>
                          +91
                        </span>
                        <input
                          type="tel"
                          value={sPhone}
                          onChange={(e) => {
                            const updated = [...tempStaff];
                            updated[idx] = {
                              id: staffObj.id || `STAFF-${idx + 1}`,
                              name: sName,
                              phone: e.target.value
                            };
                            setTempStaff(updated);
                          }}
                          placeholder="93635 99754"
                          required
                          style={{
                            width: '100%',
                            padding: '8px 10px 8px 36px',
                            fontSize: '0.86rem',
                            borderRadius: '4px',
                            border: '1px solid var(--gold-border)',
                            background: '#FFFDF8',
                            color: '#1A0709',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ paddingTop: '16px' }}>
                      <button
                        type="button"
                        onClick={() => {
                          if (tempStaff.length <= 1) {
                            alert('You must have at least one staff member in the roster.');
                            return;
                          }
                          setTempStaff(tempStaff.filter((_, i) => i !== idx));
                        }}
                        className="admin-icon-btn"
                        title={`Remove ${sName || 'Staff Member'}`}
                        style={{ background: '#D9534F', border: '1.5px solid #D9534F', color: '#FFF' }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add new staff member button */}
            <div style={{ marginTop: '14px' }}>
              <button
                type="button"
                onClick={() => {
                  setTempStaff([
                    ...tempStaff,
                    {
                      id: `STAFF-${Date.now()}`,
                      name: '',
                      phone: '9363599754'
                    }
                  ]);
                }}
                style={{
                  fontSize: '0.80rem',
                  padding: '9px 16px',
                  fontWeight: 800,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#1A0709',
                  color: '#F3E5AB',
                  border: '1.5px solid #C6A15B',
                  boxShadow: '0 2px 8px rgba(10, 19, 37, 0.2)'
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C6A15B" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                ADD STAFF MEMBER
              </button>
            </div>

            <div style={{ marginTop: '22px', display: 'flex', gap: '12px', justifyContent: 'flex-end', borderTop: '1px solid var(--gold-border)', paddingTop: '16px' }}>
              <button
                onClick={() => setStaffModalOpen(false)}
                style={{
                  fontSize: '0.80rem',
                  padding: '9px 18px',
                  fontWeight: 700,
                  borderRadius: '6px',
                  border: '1.5px solid #718096',
                  background: '#FFFFFF',
                  color: '#1A0709',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStaffRoster}
                style={{
                  fontSize: '0.80rem',
                  padding: '9px 22px',
                  fontWeight: 800,
                  borderRadius: '6px',
                  border: '1.5px solid #047857',
                  background: '#065F46',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(6, 95, 70, 0.25)'
                }}
              >
                SAVE STAFF ROSTER
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT CUSTOMER RECORD MODAL */}
      {customerModalOpen && (
        <div className="admin-modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="admin-modal-card admin-customer-modal-card" style={{ background: 'var(--bg-ivory)', border: '1.5px solid var(--gold-border)', borderRadius: 'var(--radius-md)', maxWidth: '540px', width: '100%', padding: '24px 28px', boxShadow: '0 20px 50px rgba(0,0,0,0.4)', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--gold-border)', paddingBottom: '10px' }}>
              <div>
                <span className="architectural-tag" style={{ fontSize: '0.65rem' }}>ADMIN CRM ENTRY</span>
                <h3 style={{ color: '#1A0709', marginTop: '2px', fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                  {editingCustId ? 'Edit Customer Record' : 'Add Walk-in / Direct Call Customer'}
                </h3>
              </div>
              <button
                onClick={() => setCustomerModalOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.6rem', color: '#1A0709', cursor: 'pointer' }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveCustomer} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1A0709', display: 'block', marginBottom: '4px' }}>
                  CUSTOMER FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Sundaram"
                  value={custForm.name}
                  onChange={(e) => setCustForm({ ...custForm, name: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--gold-border)', background: 'var(--bg-cream)', fontSize: '0.9rem', color: '#1A0709', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1A0709', display: 'block', marginBottom: '4px' }}>
                    PHONE NUMBER *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98422 00000"
                    value={custForm.phone}
                    onChange={(e) => setCustForm({ ...custForm, phone: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--gold-border)', background: 'var(--bg-cream)', fontSize: '0.9rem', color: '#1A0709', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1A0709', display: 'block', marginBottom: '4px' }}>
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    placeholder="client@example.com"
                    value={custForm.email}
                    onChange={(e) => setCustForm({ ...custForm, email: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--gold-border)', background: 'var(--bg-cream)', fontSize: '0.9rem', color: '#1A0709', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1A0709', display: 'block', marginBottom: '4px' }}>
                  REQUIREMENT / PREFERRED PLOT &amp; LOCATION
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1500 Sq.Ft East Facing Plot #14, Kambalapatti"
                  value={custForm.requirement}
                  onChange={(e) => setCustForm({ ...custForm, requirement: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--gold-border)', background: 'var(--bg-cream)', fontSize: '0.9rem', color: '#1A0709', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1A0709', display: 'block', marginBottom: '4px' }}>
                  ASSIGNED STAFF / AGENT
                </label>
                <select
                  value={custForm.assignedStaff}
                  onChange={(e) => setCustForm({ ...custForm, assignedStaff: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--gold-border)', background: 'var(--bg-cream)', fontSize: '0.88rem', color: '#1A0709', fontWeight: 600, boxSizing: 'border-box', cursor: 'pointer' }}
                >
                  {staffRoster.map((s) => {
                    const sName = typeof s === 'string' ? s : s.name;
                    return (
                      <option key={sName} value={sName}>
                        {sName}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1A0709', display: 'block', marginBottom: '4px' }}>
                  ADDITIONAL NOTES / REMARKS
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Visited Kambalapatti site on Sunday. Token amount ₹50,000 paid."
                  value={custForm.notes}
                  onChange={(e) => setCustForm({ ...custForm, notes: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--gold-border)', background: 'var(--bg-cream)', fontSize: '0.88rem', fontFamily: 'inherit', color: '#1A0709', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginTop: '10px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setCustomerModalOpen(false)}
                  className="btn btn-outline-gold"
                  style={{ fontSize: '0.78rem', padding: '8px 16px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-gold"
                  style={{ fontSize: '0.78rem', padding: '8px 20px', fontWeight: 800, cursor: 'pointer' }}
                >
                  SAVE RECORD
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADMIN PHOTO GALLERY LIGHTBOX MODAL */}
      {adminGalleryLightboxImg && (
        <div
          className="admin-modal-overlay"
          onClick={() => setAdminGalleryLightboxImg(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 19, 37, 0.88)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#1A0709',
              border: '2px solid var(--gold-primary)',
              borderRadius: '12px',
              maxWidth: '850px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
              position: 'relative'
            }}
          >
            <div style={{ position: 'relative', background: '#000000', maxHeight: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <img
                src={adminGalleryLightboxImg.src}
                alt={adminGalleryLightboxImg.title}
                style={{ width: '100%', maxHeight: '65vh', objectFit: 'contain' }}
              />
              <button
                type="button"
                onClick={() => setAdminGalleryLightboxImg(null)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(26, 7, 9, 0.85)',
                  border: '1.5px solid var(--gold-primary)',
                  color: 'var(--gold-light)',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  fontSize: '1.4rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  lineHeight: 1
                }}
              >
                &times;
              </button>
            </div>

            <div style={{ padding: '20px 24px', background: '#1A0709', color: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '14px', marginBottom: '8px' }}>
                <div>
                  <span style={{ display: 'inline-block', background: 'var(--gold-primary)', color: '#1A0709', fontWeight: 800, fontSize: '0.70rem', padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase', marginBottom: '6px' }}>
                    {adminGalleryLightboxImg.categoryLabel || CATEGORY_LABELS[adminGalleryLightboxImg.category] || adminGalleryLightboxImg.category}
                  </span>
                  <h4 style={{ margin: 0, fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: 'var(--gold-light)', fontWeight: 800 }}>
                    {adminGalleryLightboxImg.title}
                  </h4>
                </div>
                {adminGalleryLightboxImg.isCustom && (
                  <span style={{ background: '#065F46', color: '#FFFFFF', border: '1px solid #10B981', padding: '4px 10px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                    ★ Custom Upload
                  </span>
                )}
              </div>

              <div style={{ fontSize: '0.82rem', color: '#C6A15B', marginBottom: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>{adminGalleryLightboxImg.location}</span>
              </div>

              <p style={{ fontSize: '0.86rem', color: 'rgba(255, 255, 255, 0.8)', margin: 0, lineHeight: 1.5 }}>
                {adminGalleryLightboxImg.desc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* EDIT PHOTO DETAILS MODAL */}
      {editingPhoto && (
        <div
          className="admin-modal-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 19, 37, 0.75)',
            backdropFilter: 'blur(5px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            className="admin-modal-card"
            style={{
              background: 'var(--bg-ivory)',
              border: '2px solid var(--gold-primary)',
              borderRadius: 'var(--radius-md)',
              maxWidth: '680px',
              width: '100%',
              padding: '24px 28px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid var(--gold-border)', paddingBottom: '12px' }}>
              <div>
                <span className="architectural-tag" style={{ fontSize: '0.68rem', color: 'var(--gold-antique)', fontWeight: 800 }}>
                  PHOTO DETAILS EDITOR
                </span>
                <h3 style={{ color: '#1A0709', marginTop: '2px', fontSize: '1.3rem', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                  Edit Photo Details
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingPhoto(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.6rem', color: '#1A0709', cursor: 'pointer', lineHeight: 1 }}
              >
                &times;
              </button>
            </div>

            {editError && (
              <div style={{ background: 'rgba(220, 38, 38, 0.12)', border: '1px solid #DC2626', color: '#991B1B', padding: '10px 14px', borderRadius: '6px', marginBottom: '16px', fontSize: '0.84rem', fontWeight: 600 }}>
                {editError}
              </div>
            )}

            <form onSubmit={handleSaveEditPhoto} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* IMAGE PREVIEW & REPLACE */}
              <div>
                <label style={{ display: 'block', fontSize: '0.80rem', fontWeight: 700, color: '#1A0709', marginBottom: '6px' }}>
                  CURRENT IMAGE &amp; REPLACE
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ width: '130px', height: '90px', borderRadius: '8px', overflow: 'hidden', background: '#1A0709', border: '1.5px solid var(--gold-primary)', flexShrink: 0 }}>
                    <img
                      src={editPreview || editForm.src}
                      alt="Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <div style={{ flex: 1, minWidth: '220px' }}>
                    <label
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 14px',
                        background: '#1A0709',
                        color: '#F3E5AB',
                        border: '1.2px solid #C6A15B',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        marginBottom: '8px'
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                      {editUploading ? 'Compressing...' : 'Upload Replacement Image'}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleEditFileChange}
                        style={{ display: 'none' }}
                      />
                    </label>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '0.72rem', color: 'rgba(26, 7, 9, 0.65)' }}>OR Image URL/Path:</span>
                      <input
                        type="text"
                        value={editForm.src}
                        onChange={(e) => {
                          setEditForm({ ...editForm, src: e.target.value });
                          setEditPreview(e.target.value);
                        }}
                        style={{
                          flex: 1,
                          padding: '6px 10px',
                          fontSize: '0.80rem',
                          borderRadius: '4px',
                          border: '1px solid var(--gold-border)',
                          background: '#FFFFFF',
                          color: '#1A0709'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* TITLE */}
              <div>
                <label style={{ display: 'block', fontSize: '0.80rem', fontWeight: 700, color: '#1A0709', marginBottom: '6px' }}>
                  PHOTO TITLE *
                </label>
                <input
                  type="text"
                  required
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    fontSize: '0.88rem',
                    borderRadius: '6px',
                    border: '1.5px solid var(--gold-border)',
                    background: '#FFFFFF',
                    color: '#1A0709',
                    fontWeight: 600
                  }}
                />
              </div>

              {/* CATEGORY & LOCATION */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.80rem', fontWeight: 700, color: '#1A0709', marginBottom: '6px' }}>
                    CATEGORY *
                  </label>
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value, categoryLabel: CATEGORY_LABELS[e.target.value] || e.target.value })}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      fontSize: '0.86rem',
                      borderRadius: '6px',
                      border: '1.5px solid var(--gold-border)',
                      background: '#FFFFFF',
                      color: '#1A0709',
                      fontWeight: 600
                    }}
                  >
                    <option value="arches">ENTRANCE ARCH</option>
                    <option value="roads">TAR ROADS</option>
                    <option value="construction">CONSTRUCTION</option>
                    <option value="villas">LUXURY VILLA</option>
                    <option value="planning">TOWN PLANNING</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.80rem', fontWeight: 700, color: '#1A0709', marginBottom: '6px' }}>
                    SITE LOCATION
                  </label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      fontSize: '0.86rem',
                      borderRadius: '6px',
                      border: '1.5px solid var(--gold-border)',
                      background: '#FFFFFF',
                      color: '#1A0709'
                    }}
                  />
                </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label style={{ display: 'block', fontSize: '0.80rem', fontWeight: 700, color: '#1A0709', marginBottom: '6px' }}>
                  DESCRIPTION / REMARKS
                </label>
                <textarea
                  rows={3}
                  value={editForm.desc}
                  onChange={(e) => setEditForm({ ...editForm, desc: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    fontSize: '0.86rem',
                    borderRadius: '6px',
                    border: '1.5px solid var(--gold-border)',
                    background: '#FFFFFF',
                    color: '#1A0709',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setEditingPhoto(null)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '6px',
                    border: '1px solid rgba(26, 7, 9, 0.3)',
                    background: 'transparent',
                    color: '#1A0709',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={editUploading}
                  style={{
                    padding: '10px 22px',
                    borderRadius: '6px',
                    border: '1.5px solid #8C6B28',
                    background: 'linear-gradient(135deg, #C6A15B 0%, #AA7C11 100%)',
                    color: '#1A0709',
                    fontSize: '0.84rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(198, 161, 91, 0.35)'
                  }}
                >
                  SAVE CHANGES
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
