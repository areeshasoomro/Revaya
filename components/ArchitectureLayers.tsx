"use client";

import React, { useEffect, useRef } from 'react';
import styles from './ArchitectureLayers.module.css';

interface LayerItem {
  id: string;
  title: string;
  description: string;
}

const layersData: LayerItem[] = [
  { id: '01', title: 'Frontend', description: 'Responsive, fast, and intuitive interfaces built with modern web technologies.' },
  { id: '02', title: 'Backend', description: 'Robust and scalable server-side logic powering business processes and APIs.' },
  { id: '03', title: 'Database', description: 'Reliable and optimized data storage ensuring integrity, consistency, and speed.' },
  { id: '04', title: 'Automation', description: 'Intelligent workflows and job scheduling to automate repetitive tasks.' },
  { id: '05', title: 'Analytics', description: 'Real-time insights and advanced analytics for data-driven decision making.' },
  { id: '06', title: 'AI Layer', description: 'AI/ML capabilities embedded to enhance intelligence and automation.' }
];

export const ArchitectureLayers: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.isVisible);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className={styles.sectionContainer}>
      <div className={styles.ambientGlow} />

      <div className={styles.headerBlock}>
        <h2 className={styles.mainTitle}>
          <span className={styles.blueText}>Scalable.</span> Secure. <span className={styles.blueText}>Future</span> Ready.
        </h2>
        <p className={styles.subSubtitle}>
          Six layers, one cohesive system — each engineered to grow, adapt, and never become the thing that holds you back.
        </p>
      </div>

      <div className={styles.gridContainer}>
        
        {/* SVG Connector Network (Handles both Desktop & Mobile Line Paths) */}
        <div className={styles.svgPathWrapper}>
          {/* DESKTOP PATH */}
          <svg viewBox="0 0 1140 500" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${styles.connectorSvg} ${styles.desktopPath}`}>
            <path 
              d="M 190 60 
                 Q 360 -20, 570 60 
                 Q 780 -20, 950 60
                 Q 1080 120, 950 380
                 Q 780 300, 570 380
                 Q 360 300, 190 380" 
              className={styles.movingLine} 
            />
          </svg>

          {/* MOBILE & TABLET VERTICAL SNAKE PATH */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${styles.connectorSvg} ${styles.mobilePath}`}>
            <path 
              d="M 50 2 C 15 20, 85 40, 50 50 C 15 60, 85 80, 50 98" 
              className={styles.movingLine} 
            />
          </svg>
        </div>

        {/* 6 ARCHITECTURE NODES */}
        <div className={styles.layersGrid}>
          {layersData.map((layer, index) => (
            <div 
              key={layer.id} 
              className={styles.layerNode} 
              style={{ '--node-index': index } as React.CSSProperties}
            >
              <div className={styles.circleBadgeWrapper}>
                <div className={styles.glowingCircle}>
                  <span className={styles.nodeNumber}>{layer.id}</span>
                </div>
              </div>
              <div className={styles.nodeContent}>
                <h3 className={styles.nodeTitle}>{layer.title}</h3>
                <p className={styles.nodeDescription}>{layer.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchitectureLayers;