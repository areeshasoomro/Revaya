"use client";
import React, { useState } from 'react';
import styles from './Roadmap.module.css';

interface RoadmapStep {
  id: number;
  title: string;
  phaseLabel: string;
  description: string;
  bullets: string[];
}

const stepsData: RoadmapStep[] = [
  {
    id: 1,
    title: 'Discovery',
    phaseLabel: 'Phase 01',
    description: 'Stakeholder interviews, workflow mapping, and goal-setting so we build for the real problem',
    bullets: ['Requirement audit', 'Workflow map', 'Success Metrics']
  },
  {
    id: 2,
    title: 'Planning',
    phaseLabel: 'Phase 02',
    description: 'Defining architecture, setting tech stacks, milestones, and scope guidelines to de-risk development.',
    bullets: ['Tech Stack Selection', 'Milestone Mapping', 'Risk Assessment']
  },
  {
    id: 3,
    title: 'UI/UX',
    phaseLabel: 'Phase 03',
    description: 'Creating high-fidelity wireframes, typography systems, and interaction models built for modern displays.',
    bullets: ['Wireframing', 'Design System', 'Interactive Prototype']
  },
  {
    id: 4,
    title: 'Development',
    phaseLabel: 'Phase 04',
    description: 'Writing high-quality, production-ready systems using scalable modular codebases and secure pipelines.',
    bullets: ['Frontend Assembly', 'API Integration', 'Performance Audit']
  },
  {
    id: 5,
    title: 'Testing',
    phaseLabel: 'Phase 05',
    description: 'Applying structural and functional testing metrics to guarantee seamless logic and comprehensive edge coverage.',
    bullets: ['Unit & Edge Coverage', 'Automation Scripts', 'Regression Checks']
  },
  {
    id: 6,
    title: 'Deployment',
    phaseLabel: 'Phase 06',
    description: 'Configuring continuous deployment environments, cloud instances, and monitoring setups safely.',
    bullets: ['CI/CD Orchestration', 'Live Rollout', 'SSL & Security Hardening']
  },
  {
    id: 7,
    title: 'Support',
    phaseLabel: 'Phase 07',
    description: 'Maintaining runtime logs, user optimization loops, and scheduled system upgrades over long periods.',
    bullets: ['24/7 Monitoring', 'Optimization Loops', 'Hotfix Schedules']
  }
];

export const Roadmap: React.FC = () => {
  const [activeId, setActiveId] = useState<number>(1);

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.mainHeading}>
          From first call to live system,<br />
          <span className={styles.gradientText}>one clear path.</span>
        </h2>
        <p className={styles.subText}>
          A proven seven-stage roadmap that takes your idea from rough sketch to<br />
          running software — with no surprises along the way.
        </p>
      </header>

      <div className={styles.roadmapTrack}>
        <div className={styles.connectingLine}></div>

        <div className={styles.pillarsContainer}>
          {stepsData.map((step) => {
            const isActive = step.id === activeId;
            return (
              <div
                key={step.id}
                className={`${styles.pillar} ${isActive ? styles.activePillar : ''}`}
                onClick={() => setActiveId(step.id)}
              >
                {/* 1. CLOSED CARD STATE (Always rendered, controlled via opacity) */}
                <div className={`${styles.closedContent} ${isActive ? styles.fadeOut : ''}`}>
                  <div className={styles.circleNumber}>{step.id}</div>
                  <div className={styles.glowOverlay}></div>
                  <div className={styles.verticalTitleWrapper}>
                    <span className={styles.verticalTitle}>{step.title}</span>
                  </div>
                </div>

                {/* 2. OPEN ACTIVE CARD STATE (Always rendered, hidden smoothly if inactive) */}
                <div className={`${styles.openContent} ${isActive ? styles.fadeIn : styles.fadeOut}`}>
                  <div className={styles.activeTopRow}>
                    <div className={styles.activeCircleNumber}>{step.id}</div>
                    <div className={styles.phaseBadge}>{step.phaseLabel}</div>
                  </div>
                  
                  <div className={styles.activeMainArea}>
                    <div className={styles.accentBar}></div>
                    <div className={styles.detailsBlock}>
                      <h3 className={styles.activeTitle}>{step.title}</h3>
                      <p className={styles.activeDescription}>{step.description}</p>
                      <ul className={styles.bulletList}>
                        {step.bullets.map((bullet, i) => (
                          <li key={i}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;