"use client";

import React, { useState } from 'react';
import styles from './Portfolio.module.css';

interface CaseStudy {
  id: number;
  badge: string;
  title: string;
  shortDesc: string;
  cardImg: string;
  // Modal Data
  challenge: string;
  solution: string;
  stats: { value: string; label: string }[];
  techStack: string[];
  screenshots: string[];
}

const portfolioData: CaseStudy[] = [
  {
    id: 1,
    badge: 'Custom Solution',
    title: 'Meridian ERP',
    shortDesc: 'A unified ERP that replaced seven disconnected tools for a 400-person manufacturer.',
    cardImg: '/five1.png',
    challenge: 'Meridian ran finance, inventory, and HR across seven systems that never talked to each other. Month-end close took two weeks of manual reconciliation and errors were constant.',
    solution: 'We built a single modular ERP with shared data, role-based access, and automated workflows that connect every department in real time — one source of truth across the company.',
    stats: [
      { value: '85%', label: 'Manual data entry' },
      { value: '2 days', label: 'Month-end close' },
      { value: '7→1', label: 'Tools consolidated' }
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    screenshots: ['/des1.png', '/des2.png', '/des3.png']
  },
  {
    id: 2,
    badge: 'Mobile Development',
    title: 'FleetPulse',
    shortDesc: 'Real-time fleet tracking and dispatch, right in the drivers’ pockets.',
    cardImg: '/five2.png',
    challenge: 'Logistics operations suffered from delayed delivery updates, manually written transit logs, and poor communication gaps between dispatch hubs and regional drivers.',
    solution: 'Engineered a lightweight, offline-first mobile application featuring instantaneous location mapping, automatic route optimization updates, and cloud telemetry.',
    stats: [
      { value: '99.4%', label: 'Uptime tracking' },
      { value: '18%', label: 'Fuel optimization' },
      { value: '0', label: 'Paper logs required' }
    ],
    techStack: ['React Native', 'Node.js', 'GraphQL', 'MongoDB', 'Docker'],
    screenshots: ['/des1.png', '/des2.png', '/des3.png']
  },
  {
    id: 3,
    badge: 'SaaS Platform',
    title: 'NimbusPay',
    shortDesc: 'Multi-tenant billing & subscriptions infrastructure for B2B startups.',
    cardImg: '/five3.png',
    challenge: 'Growing scale platforms struggled to manage complex global localized tax compliance laws, custom consumption tiers, and multi-tenant ledger synchronization issues.',
    solution: 'Created an isolated subscription core engine handling high-throughput webhooks, instant ledger processing pipelines, and compliant localized invoicing automation.',
    stats: [
      { value: '<45ms', label: 'API Latency' },
      { value: '$12M+', label: 'Volume Processed' },
      { value: '100%', label: 'Tax Compliance' }
    ],
    techStack: ['Next.js', 'Go', 'PostgreSQL', 'Stripe API', 'Kubernetes'],
    screenshots: ['/des1.png', '/des2.png', '/des3.png']
  }
];

export const Portfolio: React.FC = () => {
  const [activeModal, setActiveModal] = useState<CaseStudy | null>(null);

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.mainHeading}>
          Software that quietly<br />
          runs <span className={styles.blueText}>real businesses.</span>
        </h2>
        <p className={styles.subText}>
          A look at systems we’ve shipped — and the measurable difference they made.
        </p>
      </header>

      {/* THREE COLUMN GRID */}
      <div className={styles.grid}>
        {portfolioData.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.imageContainer}>
              <span className={styles.badge}>{item.badge}</span>
              <img src={item.cardImg} alt={item.title} className={styles.cardImg} />
            </div>
            
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.shortDesc}</p>
              
              <button 
                className={styles.ctaButton}
                onClick={() => setActiveModal(item)}
              >
                View case study
                <span className={styles.arrowCircle}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FULL SCREEN MODAL OVERLAY */}
      {activeModal && (
        <div className={styles.modalOverlay} onClick={() => setActiveModal(null)}>
          <div className={styles.modalBody} onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header Row */}
            <div className={styles.modalHeader}>
              <span className={styles.modalBadge}>{activeModal.badge}</span>
              <button className={styles.closeButton} onClick={() => setActiveModal(null)} aria-label="Close Modal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Twin Pillars: Challenge and Solution */}
            <div className={styles.twinPillars}>
              <div className={styles.pillarBlueBox}>
                <h4>The Challenge</h4>
                <p>{activeModal.challenge}</p>
              </div>
              <div className={styles.pillarBlueBox}>
                <h4>The Solution</h4>
                <p>{activeModal.solution}</p>
              </div>
            </div>

            {/* Metrics Row */}
            <div className={styles.metricsRow}>
              {activeModal.stats.map((stat, index) => (
                <div key={index} className={styles.metricCard}>
                  <span className={styles.metricValue}>{stat.value}</span>
                  <span className={styles.metricLabel}>{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Technology Stack Tags */}
            <div className={styles.techSection}>
              <h4>Technology Stack</h4>
              <div className={styles.techGrid}>
                {activeModal.techStack.map((tech, index) => (
                  <span key={index} className={styles.techTag}>{tech}</span>
                ))}
              </div>
            </div>

            {/* Screenshots Blocks Section */}
            <div className={styles.screenshotsSection}>
              <h4>Screenshots</h4>
              <div className={styles.screenshotsGrid}>
                {activeModal.screenshots.map((screen, index) => (
                  <div key={index} className={styles.screenWrapper}>
                    <img src={screen} alt={`Dashboard interface display view sample ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;