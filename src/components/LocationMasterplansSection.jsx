import React, { useState } from 'react';
import { LOCATION_MASTERPLANS } from '../data/homeData';

export default function LocationMasterplansSection() {
  const [selectedCity, setSelectedCity] = useState(null);

  const locationKeys = ['coimbatore', 'pollachi', 'madurai', 'chennai'];
  const activePlan = selectedCity ? LOCATION_MASTERPLANS[selectedCity] : null;

  return (
    <section id="location-masterplans-section" className="py-20 creamy-smoky-sandal-canvas relative overflow-hidden">
      {/* Atmospheric Smokey Sandal/Biscuit Motion Overlay */}
      <div className="smokey-sandal-overlay" aria-hidden="true">
        <div className="smokey-sandal-cloud-1" />
        <div className="smokey-sandal-cloud-2" />
        <div className="smokey-sandal-cloud-3" />
        <div className="smokey-sandal-wisp" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="architectural-tag">TAMILNADU REGIONAL CORRIDORS</span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#1A0709] mt-2 mb-3 tracking-wide uppercase">
            REGIONAL LOCATION MASTER PLANS
          </h2>
          <p className="font-body text-xs sm:text-sm text-espresso-700 leading-relaxed">
            Select any of our 4 major location corridors below to open the corresponding layout masterplan blueprint, plot dimensions, live availability, and full summary details in a popup inspector.
          </p>
        </div>

        {/* Exact 4 Location Cards Grid (2x2 Desktop Format) */}
        <div className="location-cards-grid">
          {locationKeys.map((key) => {
            const item = LOCATION_MASTERPLANS[key];
            const imgSrc =
              key === 'coimbatore'
                ? '/Images/Coimbatore_Location.jpg'
                : key === 'pollachi'
                ? '/Images/Pollachi_Location.jpg'
                : key === 'madurai'
                ? '/Images/Madurai_Location.jpg'
                : '/Images/Chennai_Location.jpg';

            return (
              <div
                key={key}
                onClick={() => setSelectedCity(key)}
                className="location-card"
              >
                {/* Animated Moving Light Blob (Bouncing Glow Beam) */}
                <div className="location-card-blob" />

                {/* Card Image Wrap with Watermark City Text & Badges */}
                <div className="location-card-img-wrap">
                  <img
                    src={imgSrc}
                    alt={`${item.city} Location Masterplan`}
                  />
                  <span className="location-card-tag">
                    {item.tag}
                  </span>
                  <span className="location-approval-badge">
                    {item.approvalBadge}
                  </span>
                </div>

                {/* Card Body */}
                <div className="location-card-body">
                  <div>
                    <span className="architectural-tag text-gold">
                      {item.city}
                    </span>
                    <h3 className="location-card-title">
                      {item.title}
                    </h3>
                    <p className="location-card-desc">
                      {item.desc}
                    </p>
                  </div>

                  <div>
                    {/* Specs Row */}
                    <div className="location-card-specs-row">
                      <div className="location-spec-col-road">
                        <span className="location-spec-lbl">ROAD WIDTHS</span>
                        <strong className="location-spec-val">
                          {item.roadWidths}
                        </strong>
                      </div>
                      <div className="location-spec-col-price">
                        <span className="location-spec-lbl">STARTING PRICE</span>
                        <strong className="location-spec-val text-gold">
                          {item.startingPrice}
                        </strong>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn btn-outline-olive btn-sm location-card-btn"
                    >
                      <span className="hidden sm:inline">VIEW OVERALL LAYOUT &amp; SUMMARY →</span>
                      <span className="inline sm:hidden">VIEW PLAN →</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Location Masterplan Popup Modal */}
      {activePlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-espresso-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedCity(null)}
          />

          {/* Modal Card */}
          <div className="relative w-full max-w-4xl bg-biscuit-50 rounded-xl border border-gold-primary shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCity(null)}
              aria-label="Close Modal"
              className="absolute top-4 right-4 w-9 h-9 rounded-full border border-gold-border flex items-center justify-center text-espresso-800 hover:bg-espresso-900 hover:text-cream transition-colors text-xl cursor-pointer"
            >
              &times;
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <span className="architectural-tag text-gold-antique">
                {activePlan.city.toUpperCase()} — {activePlan.tag}
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1A0709] mt-1">
                {activePlan.title}
              </h2>
              <p className="font-mono text-xs text-gold-antique mt-1">
                {activePlan.subtitle} • {activePlan.approval}
              </p>
            </div>

            {/* SVG Masterplan Blueprint Canvas */}
            <div className="bg-biscuit-100 border border-gold-border p-4 rounded-lg mb-6 shadow-inner">
              <div className="flex justify-between items-center mb-2 font-mono text-xs text-gold-antique font-bold">
                <span>MASTER PLAN BLUEPRINT — {activePlan.totalPlots} ({activePlan.city.toUpperCase()})</span>
                <span className="hidden sm:inline text-espresso-600">👈 SWIPE TO EXPLORE PLOTS 👉</span>
                <span>NORTH ↑</span>
              </div>
              <div
                className="overflow-x-auto rounded border border-gold-border/40"
                dangerouslySetInnerHTML={{ __html: activePlan.svgBlueprint }}
              />
            </div>

            {/* Live Status Badges */}
            <div className="flex flex-wrap gap-2.5 mb-6">
              <span className="px-3.5 py-1.5 rounded bg-espresso-900 text-cream font-mono text-xs font-bold tracking-wider">
                {activePlan.available} AVAILABLE
              </span>
              <span className="px-3.5 py-1.5 rounded bg-gold-primary text-espresso-950 font-mono text-xs font-bold tracking-wider">
                {activePlan.prebooked} PRE-BOOKED
              </span>
              <span className="px-3.5 py-1.5 rounded bg-terracotta text-cream font-mono text-xs font-bold tracking-wider">
                {activePlan.sold} SOLD
              </span>
            </div>

            {/* Layout Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mb-6">
              <div className="p-3 rounded bg-biscuit-100 border border-gold-border/30">
                <span className="font-mono text-[10px] text-espresso-600 block uppercase">TOTAL LAYOUT</span>
                <strong className="font-mono text-xs sm:text-sm text-espresso-900">{activePlan.totalPlots}</strong>
              </div>
              <div className="p-3 rounded bg-biscuit-100 border border-gold-border/30">
                <span className="font-mono text-[10px] text-espresso-600 block uppercase">PLOT SIZES</span>
                <strong className="font-mono text-xs sm:text-sm text-espresso-900">{activePlan.plotSizes}</strong>
              </div>
              <div className="p-3 rounded bg-biscuit-100 border border-gold-border/30">
                <span className="font-mono text-[10px] text-espresso-600 block uppercase">STANDARD DIMENSIONS</span>
                <strong className="font-mono text-xs sm:text-sm text-espresso-900">{activePlan.dimensions}</strong>
              </div>
              <div className="p-3 rounded bg-biscuit-100 border border-gold-border/30">
                <span className="font-mono text-[10px] text-espresso-600 block uppercase">ROAD WIDTHS</span>
                <strong className="font-mono text-xs sm:text-sm text-espresso-900">{activePlan.roadWidths}</strong>
              </div>
              <div className="p-3 rounded bg-biscuit-100 border border-gold-border/30">
                <span className="font-mono text-[10px] text-espresso-600 block uppercase">APPROVAL STATUS</span>
                <strong className="font-mono text-xs sm:text-sm text-gold-antique">{activePlan.approval}</strong>
              </div>
              <div className="p-3 rounded bg-biscuit-100 border border-gold-border/30">
                <span className="font-mono text-[10px] text-espresso-600 block uppercase">STARTING PRICE</span>
                <strong className="font-mono text-xs sm:text-sm text-gold-antique">{activePlan.startingPrice}</strong>
              </div>
            </div>

            {/* Highlights Box */}
            <div className="p-4 rounded-lg bg-biscuit-200/60 border border-gold-border/40 mb-6">
              <strong className="font-mono text-[11px] text-gold-antique tracking-wider uppercase block mb-1.5">
                LOCATION HIGHLIGHTS &amp; CONNECTIVITY
              </strong>
              <p className="font-body text-xs sm:text-sm text-espresso-800 leading-relaxed">
                {activePlan.highlights}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#quick-enquiry-section"
                onClick={() => setSelectedCity(null)}
                className="px-6 py-2.5 rounded bg-espresso-900 hover:bg-espresso-800 text-cream font-mono text-xs font-bold tracking-wider transition-all"
              >
                ENQUIRE NOW
              </a>
              <button
                type="button"
                onClick={() => setSelectedCity(null)}
                className="px-6 py-2.5 rounded border border-gold-primary text-espresso-900 hover:bg-gold-primary/20 font-mono text-xs font-bold tracking-wider transition-all cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
