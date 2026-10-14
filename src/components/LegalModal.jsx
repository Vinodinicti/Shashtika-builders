import React from 'react';

export default function LegalModal({ type, onClose }) {
  if (!type) return null;

  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? 'PRIVACY POLICY' : 'TERMS & CONDITIONS';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-espresso-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-biscuit-50 rounded-xl border border-gold-primary shadow-2xl p-6 sm:p-8 z-10 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-gold-border/40 mb-4">
          <div className="flex items-center gap-2 text-espresso-900">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C6A15B" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <h3 className="font-heading font-bold text-lg text-espresso-900">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-gold-border flex items-center justify-center text-espresso-800 hover:bg-espresso-900 hover:text-cream text-xl transition-colors cursor-pointer"
          >
            &times;
          </button>
        </div>

        <div className="font-body text-xs sm:text-sm text-espresso-800 leading-relaxed space-y-4">
          {isPrivacy ? (
            <>
              <p>
                <strong>SHASHTIKA Plot Developers and Builders</strong> respects your privacy and is committed to protecting your personal information.
              </p>
              <p>
                <strong>1. Data Collection:</strong> We collect contact details (name, phone number, location preference) provided through our enquiry forms strictly for plot bookings, site visit scheduling, and legal deed verification.
              </p>
              <p>
                <strong>2. Data Usage:</strong> Your phone number is utilized solely to provide project engineer callbacks, site visits, and layout documentation. We do not sell or rent data to third-party telemarketers.
              </p>
              <p>
                <strong>3. Contact:</strong> For inquiries regarding your records, reach us at contact@shashtika.com or +91 98422 12345.
              </p>
            </>
          ) : (
            <>
              <p>
                Welcome to <strong>SHASHTIKA Plot Developers and Builders</strong>. By using this portal or submitting enquiries, you agree to our terms.
              </p>
              <p>
                <strong>1. Approvals & Titles:</strong> All layouts showcased are DTCP/RERA compliant with clear legal parent documentation available for inspection.
              </p>
              <p>
                <strong>2. Plot Allocation:</strong> Plot availability and prices are subject to confirmation at the time of token booking.
              </p>
              <p>
                <strong>3. Jurisdiction:</strong> Any legal inquiries or disputes are subject to the exclusive jurisdiction of the courts in Coimbatore, Tamil Nadu.
              </p>
            </>
          )}
        </div>

        <div className="pt-6 mt-6 border-t border-gold-border/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded bg-espresso-900 text-cream font-mono text-xs font-bold tracking-wider hover:bg-gold-primary hover:text-espresso-950 transition-all cursor-pointer"
          >
            READ & CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
