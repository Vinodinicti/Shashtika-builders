import React from 'react';
import { CONSTRUCTION_STAGES } from '../data/homeData';

export default function ConstructionSection() {
  const cardsList = [...CONSTRUCTION_STAGES, ...CONSTRUCTION_STAGES];

  return (
    <section className="project-showcase-section py-section construction-showcase-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="section-heading text-center max-w-2xl mx-auto mb-8">
          <span className="architectural-tag">CURRENTLY BUILDING</span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#1A0709] mt-2 mb-3 tracking-wide">
            Construction Details
          </h2>
          <p className="section-heading-sub font-body text-xs sm:text-sm text-espresso-800 leading-relaxed">
            Track live structural progress, foundation milestones, and site engineering updates across our active custom villa home developments.
          </p>
        </div>

        {/* Continuous Reverse Scroll Shell with Left/Right Fades */}
        <div className="project-scroll-shell" aria-label="Under construction home cards carousel">
          <div className="project-scroll-track-compact">
            {cardsList.map((card, idx) => (
              <article key={idx} className="project-card project-card-compact">
                <div className="project-card-image-wrap">
                  <img
                    src={card.image}
                    alt={card.title}
                  />
                  <span className="project-badge project-badge-alt">
                    {card.stage}
                  </span>

                  {/* Animated Striped Construction Progress Bar */}
                  <div className="construction-progress-bar">
                    <div
                      className="construction-progress-fill"
                      style={{ width: `${card.progress}%` }}
                    />
                  </div>
                </div>

                <div className="project-card-body">
                  <div className="project-card-meta">
                    <span className="project-city">{card.city}</span>
                    <span className="project-tag">{card.tag}</span>
                  </div>

                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>

                  <div className="project-card-stats">
                    <span>
                      <strong>{card.stat1.split(' ')[0]}</strong> {card.stat1.split(' ').slice(1).join(' ')}
                    </span>
                    <span>
                      <strong>{card.stat2.split(' ')[0]}</strong> {card.stat2.split(' ').slice(1).join(' ')}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
