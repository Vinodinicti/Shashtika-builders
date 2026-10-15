import React, { useState } from 'react';
import LegalModal from './LegalModal';

export default function Footer() {
  const [legalModalType, setLegalModalType] = useState(null);

  return (
    <>
      <footer className="footer-section bg-[#070D1A] text-cream pt-16 pb-8 border-t border-gold-primary/70 shadow-[0_-8px_30px_rgba(7,13,26,0.6)] relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="footer-main-grid grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 mb-12">
            
            {/* Col 1: Brand & Identity */}
            <div className="footer-col-brand">
              <div className="flex items-center gap-3 mb-2 footer-brand-header">
                <img
                  src="/Images/Shashtika_Emblem.png"
                  alt="SHASHTIKA Emblem"
                  className="h-[34px] w-auto object-contain rounded border border-gold-primary/50 shadow-[0_2px_8px_rgba(10,19,37,0.5)] footer-brand-img"
                />
                <span className="font-heading font-extrabold text-2xl tracking-wider gold-glow-letters footer-brand-title">
                  SHASHTIKA
                </span>
              </div>
              <span className="font-mono text-[10px] tracking-[2px] text-gold-antique uppercase block mb-3 footer-brand-sub">
                PLOT DEVELOPERS &amp; BUILDERS • EST. 2004
              </span>
              <p className="font-body text-xs text-biscuit-200/80 leading-relaxed mb-4 footer-brand-desc">
                Pioneering premium DTCP &amp; RERA approved plot enclaves, farm residency layouts, and custom building construction across Coimbatore &amp; Pollachi.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#0F1C36] border border-gold-border/40 text-[10px] font-mono font-bold text-gold-light tracking-wider uppercase footer-cert-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C6A15B" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>100% LEGAL &amp; DTCP APPROVED</span>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="footer-col footer-col-links">
              <h4 className="font-mono text-xs font-bold tracking-widest text-gold-light uppercase mb-4 footer-col-title">
                QUICK LINKS
              </h4>
              <ul className="footer-nav-list space-y-2.5 font-body text-xs text-biscuit-200/80">
                <li><a href="#" className="hover:text-gold-primary transition-colors">Home</a></li>
                <li><a href="#plots" className="hover:text-gold-primary transition-colors">Find Plots</a></li>
                <li><a href="#about" className="hover:text-gold-primary transition-colors">About Us</a></li>
                <li><a href="#gallery" className="hover:text-gold-primary transition-colors">Gallery</a></li>
                <li><a href="#contact" className="hover:text-gold-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Col 3: Direct Contact & Socials */}
            <div className="footer-col footer-col-contact">
              <h4 className="font-mono text-xs font-bold tracking-widest text-gold-light uppercase mb-4 footer-col-title">
                DIRECT CONTACT
              </h4>
              <p className="font-body text-xs text-biscuit-200/80 leading-relaxed mb-4 footer-contact-desc">
                Connect with our advisors instantly via phone, WhatsApp, or follow our developments on social media.
              </p>
              
              {/* Sleek Luxury Icon Row */}
              <div className="footer-contact-icons flex items-center gap-3 flex-wrap">
                {/* Phone Call */}
                <a
                  href="tel:+919363599754"
                  className="w-10 h-10 rounded-full bg-[#0F1C36] border border-gold-border/40 text-gold-light hover:bg-gold-primary hover:text-[#0A1325] hover:border-gold-primary flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105"
                  title="Call Helpline (+91 93635 99754)"
                  aria-label="Call Helpline"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/919363599754?text=Hello%20SHASHTIKA,%20I%20want%20to%20enquire%20about%20plots"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#0F1C36] border border-gold-border/40 text-gold-light hover:bg-emerald-600 hover:text-white hover:border-emerald-500 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105"
                  title="Chat on WhatsApp (+91 93635 99754)"
                  aria-label="Chat on WhatsApp"
                >
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.031 0C5.385 0 0 5.386 0 12.031c0 2.124.553 4.197 1.604 6.02L0 24l6.155-1.614A11.968 11.968 0 0 0 12.03 24c6.645 0 12.03-5.385 12.03-12.031C24.06 5.386 18.675 0 12.031 0zm.012 22.012c-1.808 0-3.585-.486-5.143-1.408l-.369-.219-3.817 1.001 1.019-3.721-.241-.383A9.99 9.99 0 0 1 2.012 12.03c0-5.524 4.496-10.02 10.031-10.02 5.524 0 10.02 4.496 10.02 10.02 0 5.536-4.496 10.012-10.02 10.012zm5.503-7.519c-.302-.152-1.785-.881-2.062-.981-.277-.101-.479-.152-.68.152-.202.302-.782.981-.959 1.183-.176.201-.353.226-.655.075-1.745-.875-2.894-1.559-4.04-3.535-.302-.52.302-.482.864-1.608.101-.201.05-.378-.025-.529-.075-.152-.68-1.636-.932-2.24-.244-.588-.493-.508-.68-.518-.176-.009-.378-.009-.58-.009-.201 0-.528.075-.804.378-.277.302-1.057 1.032-1.057 2.518 0 1.486 1.082 2.92 1.233 3.122.151.201 2.128 3.25 5.156 4.558 2.164.935 2.809.845 3.791.7.636-.094 1.785-.73 2.037-1.435.252-.705.252-1.309.176-1.435-.076-.125-.278-.201-.58-.352z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#0F1C36] border border-gold-border/40 text-gold-light hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C] flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105"
                  title="Follow on Instagram"
                  aria-label="Follow on Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#0F1C36] border border-gold-border/40 text-gold-light hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105"
                  title="Follow on Facebook"
                  aria-label="Follow on Facebook"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Email */}
                <a
                  href="mailto:contact@shashtika.com"
                  className="w-10 h-10 rounded-full bg-[#0F1C36] border border-gold-border/40 text-gold-light hover:bg-gold-primary hover:text-[#0A1325] hover:border-gold-primary flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105"
                  title="Send Email"
                  aria-label="Send Email"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </a>
              </div>

              {/* Quick Contact Info */}
              <div className="mt-4 pt-3 border-t border-gold-border/20 font-mono text-[11px] text-biscuit-200/70 footer-helpline-box">
                <span>Helpline: </span>
                <a href="tel:+919363599754" className="text-gold-light font-bold hover:underline">
                  +91 93635 99754
                </a>
              </div>
            </div>

          </div>

          {/* Footer Bottom Bar */}
          <div className="footer-bottom-bar pt-8 border-t border-gold-border/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-biscuit-200/70 text-center sm:text-left">
            <span>© 2026 SHASHTIKA Plot Developers and Builders. All Rights Reserved.</span>
            
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setLegalModalType('privacy')}
                className="hover:text-gold-light underline cursor-pointer"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setLegalModalType('terms')}
                className="hover:text-gold-light underline cursor-pointer"
              >
                Terms & Conditions
              </button>
            </div>

            <span>Coimbatore & Pollachi, Tamil Nadu</span>
          </div>
        </div>
      </footer>

      {legalModalType && (
        <LegalModal
          type={legalModalType}
          onClose={() => setLegalModalType(null)}
        />
      )}
    </>
  );
}
