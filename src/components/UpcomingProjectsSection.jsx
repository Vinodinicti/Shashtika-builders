import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { UPCOMING_PROJECTS } from '../data/homeData';

export default function UpcomingProjectsSection() {
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('shashtika_upcoming_projects');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return UPCOMING_PROJECTS;
  });

  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const totalCards = projects.length;

  // Synchronize with admin changes across tabs or windows
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem('shashtika_upcoming_projects');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setProjects(parsed);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('shashtika_upcoming_projects_updated', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('shashtika_upcoming_projects_updated', handleStorageChange);
    };
  }, []);

  // Auto-rotation every 4 seconds (paused when modal or card is selected)
  useEffect(() => {
    if (selectedProject || totalCards <= 1) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % totalCards);
    }, 4000);
    return () => clearInterval(timer);
  }, [totalCards, selectedProject]);

  // Lock body scroll and handle ESC key when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setSelectedProject(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedProject]);

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const threshold = 35;
    if (touchEndX.current < touchStartX.current - threshold) {
      setActiveIdx((prev) => (prev + 1) % totalCards);
    } else if (touchEndX.current > touchStartX.current + threshold) {
      setActiveIdx((prev) => (prev - 1 + totalCards) % totalCards);
    }
  };

  // Card transform calculation for 3D Flat Orbit
  const getCardStyle = (idx) => {
    if (totalCards === 0) return {};
    if (totalCards === 1) {
      return {
        transform: 'translateX(0px) scale(1)',
        opacity: 1,
        zIndex: 100,
        visibility: 'visible',
        pointerEvents: 'auto'
      };
    }
    let diff = (idx - activeIdx) % totalCards;
    if (diff < 0) diff += totalCards;

    const angle = diff * (360 / totalCards) * (Math.PI / 180);

    // Responsive radii based on window width approximation
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;
    const radiusX = isMobile ? 120 : 310;
    const radiusZ = isMobile ? 70 : 160;

    const x = Math.sin(angle) * radiusX;
    const z = Math.cos(angle) * radiusZ;
    const normalizedZ = (z + radiusZ) / (2 * radiusZ);

    if (normalizedZ < 0.35) {
      return {
        opacity: 0,
        visibility: 'hidden',
        pointerEvents: 'none',
        transform: `translateX(${x.toFixed(1)}px) scale(0.75)`
      };
    }

    const scale = 0.84 + (normalizedZ - 0.35) * 0.25;
    const zIndex = Math.round(normalizedZ * 100);

    return {
      transform: `translateX(${x.toFixed(1)}px) scale(${scale.toFixed(2)})`,
      opacity: 1,
      zIndex,
      visibility: 'visible',
      pointerEvents: 'auto'
    };
  };

  const openWhatsAppEnquiry = (project) => {
    const text = encodeURIComponent(
      `Hello SHASHTIKA, I want to enquire about ${project.title} (${project.city} - ${project.tag}). Please share details.`
    );
    window.open(`https://wa.me/919363599754?text=${text}`, '_blank');
  };

  return (
    <section className="project-showcase-section py-section upcoming-showcase-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="section-heading text-center max-w-2xl mx-auto mb-8">
          <span className="architectural-tag">READY TO LAUNCH</span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#1A0709] mt-2 mb-3 tracking-wide">
            Upcoming Projects
          </h2>
          <p className="section-heading-sub font-body text-xs sm:text-sm text-espresso-800 leading-relaxed">
            Explore our newly planned residential layouts and farm plot townships ready for early-bird priority bookings across Coimbatore &amp; Pollachi.
          </p>
        </div>

        {/* 3D Flat Orbit Carousel Wrapper */}
        <div
          className="upcoming-3d-wrapper"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="upcoming-3d-inner">
            {projects.map((proj, idx) => {
              const style = getCardStyle(idx);
              const isFront = (idx - activeIdx + totalCards) % totalCards === 0;

              return (
                <article
                  key={idx}
                  onClick={() => {
                    setActiveIdx(idx);
                    setSelectedProject(proj);
                  }}
                  style={style}
                  className={`project-card-3d ${isFront ? 'active-front-card' : ''}`}
                >
                  <div className="project-card-image-wrap">
                    <img
                      src={proj.image}
                      alt={proj.title}
                    />
                    <span className="project-badge">
                      {proj.badge}
                    </span>
                    <div className="card-3d-radial-glow" />
                  </div>

                  <div className="project-card-body">
                    <div>
                      <div className="project-card-meta">
                        <span className="project-city">{proj.city}</span>
                        <span className="meta-sep">•</span>
                        <span className="project-tag">{proj.tag}</span>
                      </div>
                      <h3>{proj.title}</h3>
                      <div className="card-mini-stats">
                        <span>{proj.area}</span>
                        <span className="stat-bullet">•</span>
                        <span>{proj.road}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn-more-details"
                    >
                      MORE DETAILS →
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Full-Screen Pop-up Modal rendered at body root */}
        {selectedProject && createPortal(
          <div
            id="upcoming-project-modal"
            className="upcoming-modal-overlay"
            onClick={(e) => {
              if (e.target.id === 'upcoming-project-modal') setSelectedProject(null);
            }}
          >
            <div className="upcoming-modal-card">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="upcoming-modal-close"
                aria-label="Close Modal"
              >
                &times;
              </button>

              {/* Hero Image */}
              <div className="upcoming-modal-hero">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                />
                <span className="upcoming-modal-badge">
                  {selectedProject.badge}
                </span>
              </div>

              {/* Modal Content */}
              <div className="upcoming-modal-content">
                <div className="upcoming-modal-meta">
                  <span className="upcoming-modal-loc-tag">
                    <span className="meta-dash">—</span> {selectedProject.city.toUpperCase()}
                  </span>
                  <span className="project-tag">
                    {selectedProject.tag.toUpperCase()}
                  </span>
                </div>

                <h2>{selectedProject.title}</h2>
                <p className="upcoming-modal-desc">{selectedProject.desc}</p>

                {/* Specs Grid */}
                <div className="upcoming-specs-grid">
                  <div className="upcoming-spec-item">
                    <span className="spec-label">TOTAL LAND AREA</span>
                    <strong>{selectedProject.area}</strong>
                  </div>
                  <div className="upcoming-spec-item">
                    <span className="spec-label">ROAD INFRASTRUCTURE</span>
                    <strong>{selectedProject.road}</strong>
                  </div>
                  <div className="upcoming-spec-item">
                    <span className="spec-label">APPROVAL &amp; STATUS</span>
                    <strong>{selectedProject.approval}</strong>
                  </div>
                  <div className="upcoming-spec-item">
                    <span className="spec-label">LOCATION CORRIDOR</span>
                    <strong>{selectedProject.location}</strong>
                  </div>
                </div>

                {/* Features Box */}
                <div className="upcoming-features-box">
                  <h4>PROJECT HIGHLIGHTS &amp; AMENITIES</h4>
                  <ul>
                    {selectedProject.features.map((feat, idx) => (
                      <li key={idx}>{feat}</li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="upcoming-modal-actions">
                  <button
                    type="button"
                    onClick={() => openWhatsAppEnquiry(selectedProject)}
                    className="btn btn-gold px-6 py-2.5 rounded font-mono text-xs font-bold tracking-wider cursor-pointer"
                  >
                    ENQUIRE &amp; BOOK SITE VISIT →
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="btn btn-outline-gold px-5 py-2.5 rounded font-mono text-xs font-bold tracking-wider cursor-pointer"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

        {/* Manual Indicator Dots */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                activeIdx === idx
                  ? 'bg-gold-primary scale-125'
                  : 'bg-gold-border/60 hover:bg-gold-primary/60'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
