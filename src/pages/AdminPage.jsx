import React, { useState, useEffect, useMemo } from 'react';
import { PLOTS_DATA, PROJECT_METADATA } from '../data/plotsKambalapattiData';

// Default 5-Staff Roster matching old project
const DEFAULT_STAFF_ROSTER = [
  'Ramesh Kumar (Senior Sales Lead)',
  'Priya Sharma (Client Advisor)',
  'Karthik V (Site Manager)',
  'Anitha Raj (Relationship Manager)',
  'Suresh Babu (Executive Officer)'
];

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
    return localStorage.getItem('shashtika_admin_active_tab') || 'ai-leads';
  });

  // 5-Staff Roster
  const [staffRoster, setStaffRoster] = useState(() => {
    const saved = localStorage.getItem('shashtika_staff_roster') || localStorage.getItem('vels_staff_roster');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 5) return parsed;
      } catch (e) {}
    }
    return DEFAULT_STAFF_ROSTER;
  });

  const [staffModalOpen, setStaffModalOpen] = useState(false);
  const [tempStaff, setTempStaff] = useState([...staffRoster]);

  // AI Leads State
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('shashtika_admin_leads');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return DEFAULT_AI_LEADS;
  });

  const [leadCategoryFilter, setLeadCategoryFilter] = useState('ALL');
  const [leadSearchQuery, setLeadSearchQuery] = useState('');

  // Plot Inventory State (64 Kambalapatti DTCP plots)
  const [plots, setPlots] = useState(() => {
    const saved = localStorage.getItem('shashtika_plots_inventory');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return PLOTS_DATA;
  });

  const [plotStatusFilter, setPlotStatusFilter] = useState('ALL');
  const [plotSearchQuery, setPlotSearchQuery] = useState('');
  const [plotCurrentPage, setPlotCurrentPage] = useState(1);
  const plotPageSize = 25;

  // Customer Pipeline Registry State
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('shashtika_customers_registry') || localStorage.getItem('vels_manual_customers');
    if (saved) {
      try {
        return JSON.parse(saved);
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
    assignedStaff: DEFAULT_STAFF_ROSTER[0],
    stage: 'INQUIRY',
    notes: ''
  });

  // Persist State to localStorage
  useEffect(() => {
    localStorage.setItem('shashtika_admin_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('shashtika_plots_inventory', JSON.stringify(plots));
    window.dispatchEvent(new Event('shashtika_plot_updated'));
  }, [plots]);

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
          if (json.success && Array.isArray(json.data)) {
            backendList = json.data;
          }
        }
      } catch (err) {
        try {
          const res2 = await fetch('http://localhost:5000/api/enquiries');
          if (res2.ok) {
            const json2 = await res2.json();
            if (json2.success && Array.isArray(json2.data)) {
              backendList = json2.data;
            }
          }
        } catch (e2) {}
      }

      const localEnquiries = JSON.parse(localStorage.getItem('shashtika_enquiries') || '[]');
      
      // Combine unique enquiries
      const allRaw = [...backendList];
      localEnquiries.forEach((item) => {
        const cleanP = (item.phone || '').replace(/\D/g, '').slice(-10);
        if (!allRaw.some((b) => b.id === item.id || (cleanP && (b.phone || '').replace(/\D/g, '').slice(-10) === cleanP))) {
          allRaw.push(item);
        }
      });

      if (allRaw.length > 0) {
        // Map to leads format
        const convertedLeads = allRaw.map((item) => {
          const score = item.aiScore || 85;
          const cat = score >= 80 ? 'HOT' : score >= 60 ? 'WARM' : 'COLD';
          const plot = item.plotNumber || item.targetPlot || 'General Layout';
          const dt = item.createdAt 
            ? new Date(item.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
            : (item.date || 'Today');

          return {
            id: item.id || `LEAD-${Date.now()}`,
            name: item.customerName || item.name || 'Direct Enquirer',
            phone: item.phone || '',
            email: item.email || 'N/A',
            location: item.project || item.location || 'Coimbatore & Pollachi Corridors',
            purpose: item.purpose || 'Residential Construction',
            budget: item.budget || '₹ 25.00 - 40.00 Lakhs',
            timeline: item.timeline || 'Immediate',
            targetPlot: plot.startsWith('Plot') ? plot : `Plot #${plot}`,
            score: score,
            category: cat,
            assignedStaff: item.assignedStaff || DEFAULT_STAFF_ROSTER[0],
            recommendation: item.aiSummary || item.recommendedAction || item.recommendation || 'Direct call from Senior Project Engineer within 30 minutes',
            date: dt,
            notes: item.message || item.notes || 'Website Enquiry via Contact Page'
          };
        });

        setLeads((prev) => {
          const existingIds = new Set(prev.map((l) => l.id));
          const toAdd = convertedLeads.filter((nl) => !existingIds.has(nl.id));
          if (toAdd.length === 0) return prev;
          return [...toAdd, ...prev];
        });

        // Also ensure customer registry has them
        setCustomers((prev) => {
          const updated = [...prev];
          allRaw.forEach((item) => {
            const cPhone = (item.phone || '').replace(/\D/g, '').slice(-10);
            const exists = updated.some((c) => (c.phone || '').replace(/\D/g, '').slice(-10) === cPhone);
            if (!exists && cPhone) {
              const dt = item.createdAt 
                ? new Date(item.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                : (item.date || 'Today');
              updated.unshift({
                id: `CUST-WEB-${item.id ? item.id.replace(/[^0-9]/g, '').slice(-5) : Math.floor(10000 + Math.random() * 90000)}`,
                name: item.customerName || item.name || 'Website Client',
                phone: item.phone || '',
                email: item.email || 'N/A',
                requirement: `${item.plotNumber || 'General Layout'} (${item.project || 'Pollachi'})`,
                assignedStaff: DEFAULT_STAFF_ROSTER[0],
                stage: 'INQUIRY',
                source: 'WEB ENQUIRY',
                date: dt,
                notes: item.message || 'Website Enquiry via Contact Page'
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

  // Staff Roster Handlers
  const handleOpenStaffModal = () => {
    setTempStaff([...staffRoster]);
    setStaffModalOpen(true);
  };

  const handleSaveStaffRoster = () => {
    const valid = tempStaff.filter((s) => s.trim() !== '');
    if (valid.length === 5) {
      setStaffRoster(valid);
      setStaffModalOpen(false);
      alert('Staff Roster updated successfully! Dropdowns on all client enquiries have been refreshed.');
    } else {
      alert('Please enter names for all 5 staff members.');
    }
  };

  // Plot Status Updater
  const handlePlotStatusChange = (plotNumber, newStatus) => {
    setPlots((prev) =>
      prev.map((p) => (p.number === plotNumber ? { ...p, status: newStatus } : p))
    );
  };

  // Lead Actions
  const handleUpdateLeadStaff = (leadId, newStaff) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, assignedStaff: newStaff } : l))
    );
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
      `"${l.recommendation.replace(/"/g, '""')}"`,
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

  // Customer Registry Handlers
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
          assignedStaff: rec.assignedStaff || staffRoster[0],
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
        assignedStaff: staffRoster[0],
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
      alert('Customer record updated successfully!');
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
      alert('New walk-in customer added to directory!');
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

  const handleUpdateCustomerStaff = (id, newStaff) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, assignedStaff: newStaff } : c))
    );
  };

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchCat = leadCategoryFilter === 'ALL' || lead.category === leadCategoryFilter;
      const q = leadSearchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        lead.name.toLowerCase().includes(q) ||
        lead.phone.includes(q) ||
        lead.targetPlot.toLowerCase().includes(q) ||
        lead.assignedStaff.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [leads, leadCategoryFilter, leadSearchQuery]);

  // Lead Counts
  const hotLeadsCount = leads.filter((l) => l.category === 'HOT').length;
  const warmLeadsCount = leads.filter((l) => l.category === 'WARM').length;
  const coldLeadsCount = leads.filter((l) => l.category === 'COLD').length;
  const topScore = leads.length > 0 ? Math.max(...leads.map((l) => l.score)) : 98;

  // Filtered Plots
  const filteredPlots = useMemo(() => {
    const q = plotSearchQuery.toLowerCase().trim().replace(/^(plot|plot\s*#?)\s*/i, '');
    return plots.filter((plot) => {
      const matchStatus = plotStatusFilter === 'ALL' || plot.status === plotStatusFilter;
      const numStr = String(plot.number).toLowerCase();
      const facingStr = plot.facing.toLowerCase();
      const roadStr = plot.road.toLowerCase();
      const sqftStr = String(plot.sqft);
      const matchSearch =
        !q ||
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

  // Filtered Customers
  const filteredCustomers = useMemo(() => {
    const q = customerSearchQuery.toLowerCase().trim();
    return customers.filter((cust) => {
      const matchStage = customerFilter === 'ALL' || cust.stage === customerFilter;
      const matchSearch =
        !q ||
        cust.name.toLowerCase().includes(q) ||
        cust.phone.includes(q) ||
        cust.requirement.toLowerCase().includes(q) ||
        cust.notes.toLowerCase().includes(q) ||
        cust.assignedStaff.toLowerCase().includes(q);
      return matchStage && matchSearch;
    });
  }, [customers, customerFilter, customerSearchQuery]);

  // Customer Counts
  const custCountAll = customers.length;
  const custCountInquiry = customers.filter((c) => c.stage === 'INQUIRY').length;
  const custCountToken = customers.filter((c) => c.stage === 'TOKEN_PAID').length;
  const custCountBought = customers.filter((c) => c.stage === 'BOUGHT').length;
  const custCountRejected = customers.filter((c) => c.stage === 'REJECTED').length;

  // 1. RENDER LOGIN GATEWAY IF NOT AUTHENTICATED (MATCHING USER SCREENSHOT)
  if (!isAuthenticated) {
    return (
      <div className="admin-login-overlay">
        <div className="admin-login-card">
          {/* Top Logo & Title */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <img
              src="/Images/Shashtika_Emblem.png"
              alt="SHASHTIKA Logo"
              style={{
                height: '52px',
                width: 'auto',
                margin: '0 auto 12px',
                display: 'block',
                borderRadius: '6px'
              }}
            />
            <span
              className="architectural-tag"
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '6px',
                fontSize: '0.68rem',
                letterSpacing: '2px'
              }}
            >
              RESTRICTED ACCESS PORTAL
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                color: '#1A0709',
                fontSize: '1.6rem',
                fontWeight: 800,
                letterSpacing: '1px'
              }}
            >
              ADMIN LOGIN
            </h2>
            <p
              style={{
                fontSize: '0.86rem',
                color: 'rgba(26, 7, 9, 0.75)',
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
                  padding: '11px 14px',
                  borderRadius: '4px',
                  border: '1px solid #E5D2A6',
                  background: '#FFFDF9',
                  fontSize: '0.92rem',
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
                  padding: '11px 14px',
                  borderRadius: '4px',
                  border: '1px solid #E5D2A6',
                  background: '#FFFDF9',
                  fontSize: '0.92rem',
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
                padding: '13px 18px',
                marginTop: '6px',
                background: '#1A0709',
                color: '#E5D2A6',
                border: '1.5px solid #C6A15B',
                borderRadius: '4px',
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
                boxShadow: '0 4px 16px rgba(26, 7, 9, 0.3)',
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
              AUTHENTICATE &amp; ENTER DASHBOARD &rarr;
            </button>

            <div style={{ textAlign: 'center', marginTop: '4px' }}>
              <a
                href="#"
                style={{
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#A9823A',
                  textDecoration: 'none'
                }}
              >
                &larr; Return to Public Website
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // 2. RENDER FULL ADMIN DASHBOARD (MATCHING SAKTHIVEL-GROUPS.VERCEL.APP/ADMIN.HTML)
  return (
    <div className="admin-portal-page" style={{ backgroundColor: '#F8F3EA', minHeight: '100vh' }}>
      {/* HOMEPAGE-ALIGNED HERO SECTION FOR ADMIN PORTAL */}
      <section className="admin-hero-section">
        <div className="admin-hero-bg-img" />
        <div className="admin-hero-overlay" />

        <div className="max-w-[1320px] mx-auto px-4 sm:px-8 w-full relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="architectural-tag" style={{ marginBottom: '14px', color: 'var(--gold-antique)' }}>
                ADMINISTRATION &amp; DYNAMIC STATE CONTROL
              </div>

              <h1 className="hero-headline" style={{ margin: 0 }}>
                <span className="gold-hero-badge">ADMIN PORTAL</span>
                <br />
                <span style={{ color: '#E5D2A6', fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800 }}>
                  MANAGEMENT
                </span>
                <br />
                <span style={{ color: '#E5D2A6', fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800 }}>
                  &amp; LEAD INTELLIGENCE
                </span>
              </h1>
            </div>

            {/* Quick Header Buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="#plots"
                className="btn btn-outline-gold"
                style={{ fontSize: '0.75rem', padding: '8px 16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                &larr; PREVIEW LIVE PLOTS MAP
              </a>
              <button
                onClick={handleAdminLogout}
                className="btn btn-outline-gold"
                style={{ fontSize: '0.75rem', padding: '8px 16px', background: 'rgba(217, 83, 79, 0.2)', borderColor: '#d9534f', color: '#ffb3b0', cursor: 'pointer' }}
              >
                LOG OUT
              </button>
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

                {/* BUTTON 3: CUSTOMER DETAILS & TRACKER */}
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
                    <span className="tab-btn-title">Customer Details &amp; 3-Stage Tracker</span>
                    <span className="tab-btn-sub">Centralized Client Registry ({customers.length})</span>
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
                      <p style={{ fontSize: '0.92rem', color: 'rgba(26, 7, 9, 0.75)', lineHeight: 1.6, fontWeight: 500 }}>
                        Automated 0–100 AI Lead Scoring model evaluates budget, timeline, purpose, plot interest, and activity signals to recommend high-priority buyers to call first.
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', marginTop: '4px' }}>
                      <button
                        className="btn btn-gold"
                        onClick={() => setActiveTab('customer-tracker')}
                        style={{ fontSize: '0.74rem', padding: '9px 16px', fontWeight: 800, borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 15px rgba(198, 161, 91, 0.3)', cursor: 'pointer' }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                        CUSTOMER DIRECTORY &amp; TRACKER &rarr;
                      </button>

                      <button
                        className="btn btn-outline-gold"
                        onClick={() => {
                          syncLiveEnquiries();
                          alert('Live enquiries refreshed from backend API & web submissions!');
                        }}
                        style={{ fontSize: '0.74rem', padding: '9px 16px', fontWeight: 800, borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                        title="Fetch latest enquiries from Contact Page"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
                        REFRESH LIVE ENQUIRIES
                      </button>

                      <button
                        className="btn btn-outline-gold"
                        onClick={handleExportCSV}
                        style={{ fontSize: '0.74rem', padding: '9px 16px', fontWeight: 800, borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                        CSV EXPORT
                      </button>

                      <button
                        className="btn btn-outline-gold"
                        onClick={handleOpenStaffModal}
                        style={{ fontSize: '0.74rem', padding: '9px 16px', fontWeight: 800, borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                        MANAGE STAFF (5)
                      </button>

                      <button
                        className="btn btn-outline-gold"
                        onClick={handleResetLeads}
                        style={{ fontSize: '0.74rem', padding: '9px 16px', fontWeight: 800, borderRadius: '4px', cursor: 'pointer' }}
                      >
                        RESET DATA
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
                  <div style={{ overflowX: 'auto', borderRadius: '4px', border: '1.5px solid var(--gold-border)' }}>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th style={{ width: '11%', textAlign: 'center' }}>AI SCORE</th>
                          <th style={{ width: '18%' }}>CLIENT &amp; CONTACT</th>
                          <th style={{ width: '15%' }}>REQUIREMENTS &amp; BUDGET</th>
                          <th style={{ width: '15%' }}>TIMELINE &amp; TARGET PLOT</th>
                          <th style={{ width: '16%' }}>ASSIGNED STAFF</th>
                          <th style={{ width: '17%' }}>AI RECOMMENDATION</th>
                          <th style={{ width: '11%', minWidth: '135px', textAlign: 'center' }}>ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLeads.length === 0 ? (
                          <tr>
                            <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: 'rgba(26,7,9,0.6)', fontWeight: 600 }}>
                              No lead records found matching current criteria.
                            </td>
                          </tr>
                        ) : (
                          filteredLeads.map((lead) => {
                            const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
                            const isHot = lead.category === 'HOT';
                            const isWarm = lead.category === 'WARM';

                            return (
                              <tr key={lead.id} style={{ borderBottom: '1px solid rgba(198, 161, 91, 0.2)' }}>
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
                                  <div style={{ fontWeight: 800, color: '#1A0709', fontSize: '0.95rem', marginBottom: '4px' }}>
                                    {lead.name}
                                  </div>
                                  <div style={{ fontSize: '0.82rem', color: '#1A0709', fontWeight: 700, marginBottom: '2px' }}>
                                    <a href={`tel:${lead.phone}`} style={{ color: '#1A0709', textDecoration: 'none' }}>{lead.phone}</a>
                                  </div>
                                  <div style={{ fontSize: '0.78rem', color: 'rgba(26,7,9,0.65)' }}>{lead.email}</div>
                                  <div style={{ fontSize: '0.70rem', color: '#A9823A', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                                    {lead.date} &bull; {lead.id}
                                  </div>
                                </td>

                                <td style={{ verticalAlign: 'top' }}>
                                  <div style={{ fontWeight: 700, color: '#1A0709', fontSize: '0.86rem', marginBottom: '4px' }}>
                                    {lead.budget}
                                  </div>
                                  <div style={{ fontSize: '0.80rem', color: 'rgba(26,7,9,0.75)' }}>{lead.purpose}</div>
                                  <div style={{ fontSize: '0.74rem', color: 'rgba(26,7,9,0.6)', marginTop: '2px' }}>{lead.location}</div>
                                </td>

                                <td style={{ verticalAlign: 'top' }}>
                                  <div style={{ fontWeight: 700, color: '#1A0709', fontSize: '0.86rem', marginBottom: '4px' }}>
                                    {lead.targetPlot}
                                  </div>
                                  <div style={{ fontSize: '0.80rem', color: 'rgba(26,7,9,0.75)' }}>
                                    Timeline: <strong style={{ color: isHot ? '#C53030' : '#1A0709' }}>{lead.timeline}</strong>
                                  </div>
                                </td>

                                <td style={{ verticalAlign: 'top' }}>
                                  <select
                                    value={lead.assignedStaff}
                                    onChange={(e) => handleUpdateLeadStaff(lead.id, e.target.value)}
                                    style={{
                                      width: '100%',
                                      padding: '7px 10px',
                                      borderRadius: '4px',
                                      border: '1.5px solid var(--gold-border)',
                                      fontSize: '0.80rem',
                                      fontWeight: 700,
                                      background: 'var(--bg-cream)',
                                      color: '#1A0709',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    {staffRoster.map((s) => (
                                      <option key={s} value={s}>{s}</option>
                                    ))}
                                  </select>
                                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#A9823A', marginTop: '4px' }}>
                                    &check; {lead.assignedStaff.split(' ')[0]}
                                  </div>
                                </td>

                                <td style={{ verticalAlign: 'top' }}>
                                  <div className="ai-recommendation-box">
                                    &ldquo;{lead.recommendation}&rdquo;
                                  </div>
                                </td>

                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
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
                                      style={{ background: '#25D366', border: '1.5px solid #25D366', color: '#FFFFFF' }}
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
                      <p style={{ fontSize: '0.88rem', color: 'rgba(26, 7, 9, 0.75)', marginTop: '4px' }}>
                        Changes update client-side localStorage state and live SVG layout map instantly.
                      </p>
                    </div>
                    <a
                      href="#plots"
                      className="btn btn-outline-gold"
                      style={{ fontSize: '0.75rem', padding: '8px 16px', textDecoration: 'none' }}
                    >
                      PREVIEW PLOTS MAP &rarr;
                    </a>
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
                        <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', fill: 'rgba(26,7,9,0.5)' }} viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
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
                  <div style={{ overflowX: 'auto', borderRadius: '4px', border: '1.5px solid var(--gold-border)' }}>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th style={{ width: '12%', textAlign: 'center' }}>PLOT NO</th>
                          <th style={{ width: '18%' }}>SIZE</th>
                          <th style={{ width: '18%' }}>FACING</th>
                          <th style={{ width: '22%' }}>DIMENSION / ROAD</th>
                          <th style={{ width: '15%', textAlign: 'center' }}>STATUS BADGE</th>
                          <th style={{ width: '15%', textAlign: 'center' }}>CHANGE STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedPlots.length === 0 ? (
                          <tr>
                            <td colSpan="6" style={{ textAlign: 'center', padding: '24px', color: 'rgba(26,7,9,0.6)', fontWeight: 600 }}>
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
                                <td style={{ padding: '14px 12px', textAlign: 'center' }}>
                                  <strong style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1A0709', fontFamily: 'var(--font-mono)' }}>
                                    PLOT {plot.number}
                                  </strong>
                                </td>
                                <td style={{ padding: '14px 12px', color: '#1A0709', fontWeight: 600, fontSize: '0.88rem' }}>
                                  <strong>{plot.sqft} Sq.Ft</strong> ({plot.cent} Cents {plot.remSqft > 0 ? `${plot.remSqft} Sq.Ft` : ''})
                                </td>
                                <td style={{ padding: '14px 10px', color: '#1A0709', fontWeight: 600, fontSize: '0.88rem' }}>
                                  {plot.facing}
                                </td>
                                <td style={{ padding: '14px 12px', color: 'rgba(26,7,9,0.85)', fontSize: '0.85rem' }}>
                                  <div style={{ fontWeight: 700 }}>{plot.dim}</div>
                                  <div style={{ fontSize: '0.74rem', color: 'rgba(26,7,9,0.6)' }}>{plot.road}</div>
                                </td>
                                <td style={{ padding: '14px 10px', textAlign: 'center' }}>
                                  <span className={`badge-status ${badgeClass}`}>{plot.status}</span>
                                </td>
                                <td style={{ padding: '14px 10px', textAlign: 'center' }}>
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
                                      cursor: 'pointer'
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
                    <div style={{ fontSize: '0.88rem', color: 'rgba(26,7,9,0.7)', fontWeight: 600 }}>
                      Showing {totalPlotRecords === 0 ? 0 : plotStartIndex + 1} &ndash; {plotEndIndex} of {totalPlotRecords} plots
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        className="btn btn-outline-gold"
                        style={{ padding: '6px 12px', fontSize: '0.85rem', fontWeight: 700, borderRadius: '6px', cursor: safePlotPage <= 1 ? 'not-allowed' : 'pointer', opacity: safePlotPage <= 1 ? 0.4 : 1 }}
                        disabled={safePlotPage <= 1}
                        onClick={() => setPlotCurrentPage(safePlotPage - 1)}
                      >
                        &larr; Prev
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
                        Next &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* PANEL 3: CUSTOMER DETAILS & TRACKER TABLE */}
              {activeTab === 'customer-tracker' && (
                <div style={{ background: 'var(--bg-ivory)', border: '1.5px solid var(--gold-border)', borderRadius: 'var(--radius-md)', padding: '28px', boxShadow: 'var(--shadow-soft)' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1.5px solid var(--gold-border)' }}>
                    <div>
                      <span className="architectural-tag">CENTRALIZED CLIENT REGISTRY</span>
                      <h3 style={{ fontSize: '1.4rem', color: '#1A0709', marginTop: '4px', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                        Customer Details &amp; 3-Stage Conversion Tracker
                      </h3>
                      <p style={{ fontSize: '0.88rem', color: 'rgba(26, 7, 9, 0.75)', marginTop: '4px' }}>
                        Track all web enquiries &amp; manual walk-in clients with 3 editable conversion stages and staff assignment.
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <button
                        className="btn btn-outline-gold"
                        onClick={() => {
                          syncLiveEnquiries();
                          alert('Customer records synchronized with latest web submissions!');
                        }}
                        style={{ fontSize: '0.78rem', padding: '10px 16px', fontWeight: 800, borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                        title="Fetch latest enquiries from Contact Page"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
                        REFRESH LIVE LEADS
                      </button>

                      <button
                        className="btn btn-gold"
                        onClick={() => handleOpenAddCustomerModal()}
                        style={{ fontSize: '0.78rem', padding: '10px 18px', fontWeight: 800, borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(198, 161, 91, 0.3)', cursor: 'pointer' }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        + ADD NEW CUSTOMER RECORD
                      </button>
                    </div>
                  </div>

                  {/* Stage Filter Chips & Search Bar */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '20px', background: 'rgba(198, 161, 91, 0.08)', padding: '14px 18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gold-border)' }}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                      <button
                        className={`public-table-chip ${customerFilter === 'ALL' ? 'active' : ''}`}
                        onClick={() => setCustomerFilter('ALL')}
                      >
                        ALL CUSTOMERS ({custCountAll})
                      </button>
                      <button
                        className={`public-table-chip ${customerFilter === 'INQUIRY' ? 'active' : ''}`}
                        onClick={() => setCustomerFilter('INQUIRY')}
                      >
                        INQUIRY ({custCountInquiry})
                      </button>
                      <button
                        className={`public-table-chip ${customerFilter === 'TOKEN_PAID' ? 'active' : ''}`}
                        onClick={() => setCustomerFilter('TOKEN_PAID')}
                      >
                        TOKEN PAID ({custCountToken})
                      </button>
                      <button
                        className={`public-table-chip ${customerFilter === 'BOUGHT' ? 'active' : ''}`}
                        onClick={() => setCustomerFilter('BOUGHT')}
                      >
                        BOUGHT ({custCountBought})
                      </button>
                      <button
                        className={`public-table-chip ${customerFilter === 'REJECTED' ? 'active' : ''}`}
                        onClick={() => setCustomerFilter('REJECTED')}
                      >
                        REJECTED ({custCountRejected})
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
                  <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--gold-border)' }}>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th style={{ width: '13%' }}>DATE &amp; ID</th>
                          <th style={{ width: '20%' }}>CUSTOMER DETAILS</th>
                          <th style={{ width: '20%' }}>REQUIREMENT &amp; LOCATION</th>
                          <th style={{ width: '18%' }}>ASSIGNED STAFF</th>
                          <th style={{ width: '15%' }}>CONVERSION STAGE</th>
                          <th style={{ width: '7%', textAlign: 'center' }}>SOURCE</th>
                          <th style={{ width: '12%', minWidth: '135px', textAlign: 'center' }}>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCustomers.length === 0 ? (
                          <tr>
                            <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: 'rgba(26,7,9,0.6)', fontWeight: 600 }}>
                              No customer records found matching current criteria.
                            </td>
                          </tr>
                        ) : (
                          filteredCustomers.map((cust) => {
                            const isManual = cust.source === 'MANUAL WALK-IN';
                            const cleanPhone = cust.phone.replace(/[^0-9]/g, '');

                            let stageBadgeStyle = { background: 'rgba(43, 67, 96, 0.12)', color: '#2B4360', border: '1px solid #2B4360' };
                            let stageLabel = 'INQUIRY';
                            if (cust.stage === 'TOKEN_PAID') {
                              stageBadgeStyle = { background: 'rgba(198, 161, 91, 0.18)', color: '#8C6B28', border: '1px solid #C6A15B' };
                              stageLabel = 'TOKEN PAID';
                            } else if (cust.stage === 'BOUGHT') {
                              stageBadgeStyle = { background: 'rgba(40, 167, 69, 0.18)', color: '#1e7e34', border: '1px solid #28a745' };
                              stageLabel = 'BOUGHT';
                            } else if (cust.stage === 'REJECTED') {
                              stageBadgeStyle = { background: 'rgba(217, 83, 79, 0.15)', color: '#d9534f', border: '1px solid #d9534f' };
                              stageLabel = 'REJECTED';
                            }

                            return (
                              <tr key={cust.id} style={{ borderBottom: '1px solid rgba(198, 161, 91, 0.2)' }}>
                                <td style={{ verticalAlign: 'top' }}>
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
                                      <div style={{ color: 'rgba(26,7,9,0.7)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
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
                                    <div style={{ fontSize: '0.78rem', color: 'rgba(26,7,9,0.75)', lineHeight: 1.45, fontStyle: 'italic', background: 'rgba(0,0,0,0.03)', padding: '6px 10px', borderRadius: '4px', borderLeft: '3px solid var(--gold-primary)', marginTop: '4px' }}>
                                      &ldquo;{cust.notes}&rdquo;
                                    </div>
                                  )}
                                </td>

                                <td style={{ verticalAlign: 'top' }}>
                                  <select
                                    value={cust.assignedStaff}
                                    onChange={(e) => handleUpdateCustomerStaff(cust.id, e.target.value)}
                                    style={{ padding: '6px 10px', borderRadius: '4px', border: '1.5px solid var(--gold-border)', fontSize: '0.8rem', fontWeight: 700, background: 'var(--bg-cream)', color: '#1A0709', width: '100%', cursor: 'pointer' }}
                                  >
                                    {staffRoster.map((s) => (
                                      <option key={s} value={s}>{s}</option>
                                    ))}
                                  </select>
                                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#A9823A', marginTop: '4px' }}>
                                    &check; {cust.assignedStaff.split(' ')[0]}
                                  </div>
                                </td>

                                <td style={{ verticalAlign: 'top' }}>
                                  <select
                                    value={cust.stage}
                                    onChange={(e) => handleUpdateCustomerStage(cust.id, e.target.value)}
                                    style={{ padding: '6px 10px', borderRadius: '4px', border: '1.5px solid var(--gold-border)', fontSize: '0.8rem', fontWeight: 800, background: 'var(--bg-cream)', color: '#1A0709', width: '100%', marginBottom: '6px', cursor: 'pointer' }}
                                  >
                                    <option value="INQUIRY">INQUIRY</option>
                                    <option value="TOKEN_PAID">TOKEN PAID</option>
                                    <option value="BOUGHT">BOUGHT</option>
                                    <option value="REJECTED">REJECTED</option>
                                  </select>
                                  <span style={{ ...stageBadgeStyle, fontSize: '0.7rem', fontWeight: 800, padding: '4px 10px', borderRadius: '4px', display: 'inline-block', width: '100%', textAlign: 'center', boxSizing: 'border-box' }}>
                                    {stageLabel}
                                  </span>
                                </td>

                                <td style={{ verticalAlign: 'top', textAlign: 'center' }}>
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
                                      href={`https://wa.me/${cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone}?text=Hello%20${encodeURIComponent(cust.name)},%20this%20is%20SHASHTIKA%20Plot%20Developers%20regarding%20your%20requirement%20for%20${encodeURIComponent(cust.requirement)}.`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="admin-icon-btn"
                                      title={`WhatsApp ${cust.name}`}
                                      style={{ background: '#25D366', border: '1.5px solid #25D366', color: '#FFFFFF' }}
                                    >
                                      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 0C5.385 0 0 5.386 0 12.031c0 2.124.553 4.197 1.604 6.02L0 24l6.155-1.614A11.968 11.968 0 0 0 12.03 24c6.645 0 12.03-5.385 12.03-12.031C24.06 5.386 18.675 0 12.031 0zm.012 22.012c-1.808 0-3.585-.486-5.143-1.408l-.369-.219-3.817 1.001 1.019-3.721-.241-.383A9.99 9.99 0 0 1 2.012 12.03c0-5.524 4.496-10.02 10.031-10.02 5.524 0 10.02 4.496 10.02 10.02 0 5.536-4.496 10.012-10.02 10.012zm5.503-7.519c-.302-.152-1.785-.881-2.062-.981-.277-.101-.479-.152-.68.152-.202.302-.782.981-.959 1.183-.176.201-.353.226-.655.075-1.745-.875-2.894-1.559-4.04-3.535-.302-.52.302-.482.864-1.608.101-.201.05-.378-.025-.529-.075-.152-.68-1.636-.932-2.24-.244-.588-.493-.508-.68-.518-.176-.009-.378-.009-.58-.009-.201 0-.528.075-.804.378-.277.302-1.057 1.032-1.057 2.518 0 1.486 1.082 2.92 1.233 3.122.151.201 2.128 3.25 5.156 4.558 2.164.935 2.809.845 3.791.7.636-.094 1.785-.73 2.037-1.435.252-.705.252-1.309.176-1.435-.076-.125-.278-.201-.58-.352z" /></svg>
                                    </a>

                                    {/* Edit button */}
                                    <button
                                      onClick={() => handleOpenAddCustomerModal(cust.id)}
                                      className="admin-icon-btn"
                                      title={`Edit Customer ${cust.id}`}
                                      style={{ background: 'var(--bg-cream)', border: '1.5px solid var(--gold-border)', color: '#1A0709' }}
                                    >
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                    </button>

                                    {/* Delete button */}
                                    <button
                                      onClick={() => handleDeleteCustomer(cust.id)}
                                      className="admin-icon-btn"
                                      title={`Delete Customer ${cust.id}`}
                                      style={{ background: '#D9534F', border: '1.5px solid #D9534F', color: '#FFFFFF' }}
                                    >
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
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
            </div>
          </div>
        </div>
      </section>

      {/* STAFF ROSTER MANAGEMENT MODAL */}
      {staffModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: 'var(--bg-ivory)', border: '1.5px solid var(--gold-border)', borderRadius: 'var(--radius-md)', maxWidth: '480px', width: '100%', padding: '24px 28px', boxShadow: '0 20px 50px rgba(0,0,0,0.4)', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--gold-border)', paddingBottom: '10px' }}>
              <div>
                <span className="architectural-tag" style={{ fontSize: '0.65rem' }}>OWNER ADMIN CONTROL</span>
                <h3 style={{ color: '#1A0709', marginTop: '2px', fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                  Manage 5 Staff / Agent Roster
                </h3>
              </div>
              <button
                onClick={() => setStaffModalOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.6rem', color: '#1A0709', cursor: 'pointer' }}
              >
                &times;
              </button>
            </div>

            <p style={{ fontSize: '0.84rem', color: 'rgba(26,7,9,0.75)', marginBottom: '16px', lineHeight: 1.45 }}>
              Customize the 5 staff member/agent names. Owner can assign these names to every received customer enquiry from the dropdown box.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {tempStaff.map((staffVal, idx) => (
                <div key={idx}>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#1A0709', marginBottom: '3px' }}>
                    STAFF MEMBER #{idx + 1}
                  </label>
                  <input
                    type="text"
                    value={staffVal}
                    onChange={(e) => {
                      const updated = [...tempStaff];
                      updated[idx] = e.target.value;
                      setTempStaff(updated);
                    }}
                    placeholder={`Staff Name ${idx + 1}`}
                    required
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      fontSize: '0.88rem',
                      borderRadius: '4px',
                      border: '1px solid var(--gold-border)',
                      background: 'var(--bg-cream)',
                      color: '#1A0709',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              ))}
            </div>

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setStaffModalOpen(false)}
                className="btn btn-outline-gold"
                style={{ fontSize: '0.78rem', padding: '7px 14px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStaffRoster}
                className="btn btn-gold"
                style={{ fontSize: '0.78rem', padding: '7px 18px', fontWeight: 800, cursor: 'pointer' }}
              >
                SAVE STAFF ROSTER &check;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT CUSTOMER RECORD MODAL */}
      {customerModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: 'var(--bg-ivory)', border: '1.5px solid var(--gold-border)', borderRadius: 'var(--radius-md)', maxWidth: '540px', width: '100%', padding: '24px 28px', boxShadow: '0 20px 50px rgba(0,0,0,0.4)', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1A0709', display: 'block', marginBottom: '4px' }}>
                    ASSIGNED STAFF / AGENT
                  </label>
                  <select
                    value={custForm.assignedStaff}
                    onChange={(e) => setCustForm({ ...custForm, assignedStaff: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--gold-border)', background: 'var(--bg-cream)', fontSize: '0.88rem', color: '#1A0709', fontWeight: 600, boxSizing: 'border-box', cursor: 'pointer' }}
                  >
                    {staffRoster.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1A0709', display: 'block', marginBottom: '4px' }}>
                    CONVERSION STAGE / STATUS
                  </label>
                  <select
                    value={custForm.stage}
                    onChange={(e) => setCustForm({ ...custForm, stage: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--gold-border)', background: 'var(--bg-cream)', fontSize: '0.88rem', color: '#1A0709', fontWeight: 600, boxSizing: 'border-box', cursor: 'pointer' }}
                  >
                    <option value="INQUIRY">INQUIRY (Initial Stage)</option>
                    <option value="TOKEN_PAID">TOKEN PAID (Advance Paid)</option>
                    <option value="BOUGHT">BOUGHT (Registered &amp; Closed)</option>
                    <option value="REJECTED">REJECTED (Not Interested / Cancelled)</option>
                  </select>
                </div>
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
                  SAVE RECORD &check;
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
