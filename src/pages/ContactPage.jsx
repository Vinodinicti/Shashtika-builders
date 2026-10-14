import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: 'Coimbatore',
    purpose: 'Residential Construction',
    timeline: 'Within 15 Days (Immediate)',
    budget: 'Below ₹25 Lakhs',
    plot: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage('Please fill in your name and phone number.');
      return;
    }

    setSubmitting(true);

    const dateStr = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }) + ', ' + new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });

    let savedRecord = null;

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          project: formData.location,
          plotNumber: formData.plot.trim() || 'General Layout Enquiry',
          budget: formData.budget,
          timeline: formData.timeline,
          paymentMode: formData.purpose,
          siteVisitRequested: true,
          message: `${formData.purpose} • ${formData.message.trim() || 'Site visit request'}`
        })
      });

      const data = await res.json();
      if (data.success && data.lead) {
        savedRecord = {
          ...data.lead,
          date: dateStr
        };
      }
    } catch (err) {
      console.log('Backend API offline, saving locally to localStorage.');
    }

    if (!savedRecord) {
      savedRecord = {
        id: `ENQ-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || 'N/A',
        project: formData.location,
        purpose: formData.purpose,
        timeline: formData.timeline,
        budget: formData.budget,
        plotNumber: formData.plot.trim() || 'General Layout Enquiry',
        message: formData.message.trim() || 'Site visit request',
        aiScore: 85,
        aiPriority: 'HOT',
        status: 'NEW',
        date: dateStr
      };
    }

    // Save to local storage for persistence across customer and admin portals
    try {
      const existing = JSON.parse(localStorage.getItem('shashtika_enquiries') || '[]');
      const cleanPhone = formData.phone.replace(/[^0-9]/g, '').slice(-10);
      const filtered = existing.filter((item) => {
        const p = (item.phone || '').replace(/[^0-9]/g, '').slice(-10);
        return item.id !== savedRecord.id && (!cleanPhone || p !== cleanPhone);
      });
      filtered.unshift(savedRecord);
      localStorage.setItem('shashtika_enquiries', JSON.stringify(filtered));

      // Also directly add to Admin Leads for immediate visibility in Admin Portal
      const adminLeads = JSON.parse(localStorage.getItem('shashtika_admin_leads') || '[]');
      const newAdminLead = {
        id: savedRecord.id,
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || 'N/A',
        location: formData.location,
        purpose: formData.purpose,
        budget: formData.budget,
        timeline: formData.timeline,
        targetPlot: formData.plot.trim() || 'General Layout',
        score: savedRecord.aiScore || 85,
        category: (savedRecord.aiScore || 85) >= 80 ? 'HOT' : 'WARM',
        assignedStaff: 'Ramesh Kumar (Senior Sales Lead)',
        recommendation: savedRecord.aiSummary || 'Direct call from Senior Project Engineer within 30 minutes',
        date: dateStr,
        notes: `${formData.purpose} • ${formData.message.trim() || 'Site visit request via Contact Page'}`
      };
      const filteredAdmin = adminLeads.filter((item) => item.id !== newAdminLead.id);
      filteredAdmin.unshift(newAdminLead);
      localStorage.setItem('shashtika_admin_leads', JSON.stringify(filteredAdmin));
    } catch (e) {
      console.error(e);
    }

    setSubmitting(false);
    setSubmittedLead(savedRecord);

    alert(`Thank you, ${formData.name.trim()}!\n\nYour enquiry has been received. Our project engineer in ${formData.location} will get in touch with you shortly at +91 ${formData.phone.trim()} to confirm your site visit and plot layout details.`);

    // Reset form fields
    setFormData({
      name: '',
      phone: '',
      email: '',
      location: 'Coimbatore',
      purpose: 'Residential Construction',
      timeline: 'Within 15 Days (Immediate)',
      budget: 'Below ₹25 Lakhs',
      plot: '',
      message: ''
    });
  };

  return (
    <div className="bg-[#F8F3EA] min-h-screen text-[#1A0709]">
      {/* =========================================================================
          HERO COMPACT SECTION FOR CONTACT PAGE
          ========================================================================= */}
      <section className="contact-hero-section">
        {/* Full Edge-to-Edge Background Image */}
        <div className="contact-hero-bg-img" />

        {/* Rich Luxury Dark Vignette Overlay */}
        <div className="contact-hero-fade" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="hero-fit-content">
            <div className="architectural-tag mb-4 text-gold-light">
              PROPERTY & SITE VISIT ENQUIRIES
            </div>

            <h1 className="hero-headline">
              <span className="gold-hero-badge">CONTACT SHASHTIKA</span><br />
              <span style={{ color: '#E5D2A6' }}>LET'S BUILD</span><br />
              <span style={{ color: '#E5D2A6' }}>YOUR FUTURE</span>
            </h1>

            <p className="hero-subtext">
              Connect with our property advisors in Coimbatore & Pollachi to schedule site visits or discuss DTCP plot layouts.
            </p>

            <div className="flex flex-wrap gap-4 items-center mb-8">
              <a href="#enquiry-form-section" className="btn-primary">
                BOOK SITE VISIT
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <a href="#plots" className="btn-outline-gold">
                VIEW PLOTS MAP
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN CONTACT & SITE VISIT ENQUIRY SECTION (EXACT MATCH TO REFERENCE)
          ========================================================================= */}
      <section className="py-16 md:py-24" id="contact-main-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="contact-grid">
            
            {/* LEFT COLUMN: REGIONAL OFFICES */}
            <div className="contact-info-box">
              {/* Coimbatore Office */}
              <div className="office-card">
                <h3 className="office-city">COIMBATORE OFFICE</h3>
                <p className="office-address">
                  Peelamedu Main Road, Near Hope College, Coimbatore - 641004
                </p>
                <p className="office-phone">
                  <strong>Phone:</strong>{' '}
                  <a href="tel:+919842212345" className="hover:text-gold-primary transition-colors">
                    +91 98422 12345
                  </a>
                </p>
              </div>

              {/* Pollachi Office */}
              <div className="office-card">
                <h3 className="office-city">POLLACHI OFFICE</h3>
                <p className="office-address">
                  Mahalingapuram Main Road, Opp. Municipal Park, Pollachi - 642002
                </p>
                <p className="office-phone">
                  <strong>Phone:</strong>{' '}
                  <a href="tel:+919443367890" className="hover:text-gold-primary transition-colors">
                    +91 94433 67890
                  </a>
                </p>
              </div>

              {/* WhatsApp Quick Enquiry Button */}
              <div className="mt-8">
                <a
                  href="https://wa.me/919363599754?text=Hello%20SHASHTIKA,%20I%20am%20interested%20in%20plots/construction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  <span>WHATSAPP QUICK ENQUIRY</span>
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN: SITE VISIT & PLOT ENQUIRY FORM */}
            <div id="enquiry-form-section">
              <div className="mb-6">
                <span className="architectural-tag">PROPERTY & SITE VISIT ENQUIRY</span>
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.35rem, 2.1vw, 1.8rem)',
                  color: '#1A0709',
                  marginTop: '6px',
                  marginBottom: '8px',
                  fontWeight: 800
                }}>
                  SCHEDULE A SITE VISIT OR PLOT ENQUIRY
                </h2>
                <p style={{ color: '#521D24', fontSize: '0.88rem', lineHeight: '1.6' }}>
                  Fill out your requirement details below. Our project engineers will connect with you within 2 hours with verified plot layouts and pricing.
                </p>
              </div>

              {errorMessage && (
                <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-800 rounded text-sm">
                  {errorMessage}
                </div>
              )}

              {submittedLead && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-400 text-emerald-900 rounded-md">
                  <div className="flex items-center gap-2 font-bold mb-1">
                    <span className="text-lg">✓</span> Enquiry Successfully Submitted!
                  </div>
                  <p className="text-xs leading-relaxed">
                    Thank you, <strong>{submittedLead.customerName}</strong>! Your enquiry has been received. Our project engineer will call you at <strong>{submittedLead.phone}</strong> shortly to confirm your site visit.
                  </p>
                </div>
              )}

              <form id="contact-form" onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="form-group">
                  <label className="form-label">FULL NAME *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g. Ramesh Kumar"
                    required
                  />
                </div>

                {/* Phone & Email Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">PHONE NUMBER *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="ramesh@gmail.com"
                    />
                  </div>
                </div>

                {/* Preferred Location & Purpose Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">PREFERRED LOCATION *</label>
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="Coimbatore">Coimbatore Corridor</option>
                      <option value="Pollachi">Pollachi Corridor</option>
                      <option value="Both Locations">Both Coimbatore & Pollachi</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">BUYING PURPOSE *</label>
                    <select
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="Residential Construction">Residential Villa / Home</option>
                      <option value="Investment & Appreciation">Long-Term Investment & ROI</option>
                      <option value="Commercial / Office">Commercial / Office Space</option>
                      <option value="Farm Plot Retreat">Farm House / Weekend Retreat</option>
                    </select>
                  </div>
                </div>

                {/* Timeline & Budget Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">PURCHASE TIMELINE (WITHIN DAYS) *</label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="Within 15 Days (Immediate)">Within 15 Days (Immediate)</option>
                      <option value="1 to 3 Months">1 to 3 Months</option>
                      <option value="3 to 6 Months">3 to 6 Months</option>
                      <option value="6+ Months / Planning">6+ Months / Planning</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">ESTIMATED BUDGET *</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="Below ₹25 Lakhs">Below ₹ 25 Lakhs</option>
                      <option value="₹25 Lakhs - ₹50 Lakhs">₹ 25 Lakhs – ₹ 50 Lakhs</option>
                      <option value="₹50 Lakhs - ₹1 Crore">₹ 50 Lakhs – ₹ 1 Crore</option>
                      <option value="Above ₹1 Crore">Above ₹ 1 Crore (High Budget)</option>
                    </select>
                  </div>
                </div>

                {/* Project / Plot of Interest */}
                <div className="form-group">
                  <label className="form-label">PROJECT / PLOT OF INTEREST</label>
                  <input
                    type="text"
                    name="plot"
                    value={formData.plot}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g. Plot #104 - Pollachi Golden Vistas"
                  />
                </div>

                {/* Additional Specifications / Notes */}
                <div className="form-group">
                  <label className="form-label">ADDITIONAL SPECIFICATIONS / NOTES</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                    rows="3"
                    placeholder="Specify facing preferences, corner plot requirement, or construction needs..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full justify-center text-center cursor-pointer disabled:opacity-50"
                  style={{ width: '100%' }}
                >
                  {submitting ? 'PROCESSING ENQUIRY...' : 'SUBMIT ENQUIRY'}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
