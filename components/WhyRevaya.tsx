"use client";

import React, { useEffect, useRef } from 'react';
import styles from './WhyRevaya.module.css';

interface FeatureItem {
  id: string;
  title: string;
  description: string;
}

const featuresData: FeatureItem[] = [
  {
    id: '01',
    title: 'Built To Scale',
    description: 'Architecture that grows with you from your first ten users to your next 10,000, with no rebuild required.'
  },
  {
    id: '02',
    title: 'Truly Custom',
    description: 'No rigid templates. Every system is shaped around exactly how your business already works.'
  },
  {
    id: '03',
    title: 'Fast Delivery',
    description: 'From kickoff to live software in 4–6 weeks, with a working demo every single sprint.'
  },
  {
    id: '04',
    title: 'Always Supported',
    description: 'We don’t vanish at launch. Monitoring, updates, and optimization to keep you running.'
  }
];

export const WhyRevaya: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animateIn);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = sectionRef.current?.querySelectorAll(`.${styles.revealItem}`);
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.container} ref={sectionRef}>
      {/* Premium Ambient Background Mesh Gradients */}
      <div className={styles.gradientOrb1} />
      <div className={styles.gradientOrb2} />
      
      <div className={styles.wrapper}>
        
        {/* LEFT BLOCK: TYPOGRAPHY + IMAGES */}
        <div className={styles.leftColumn}>
          <div className={`${styles.headerBlock} ${styles.revealItem}`}>
            <h2 className={styles.mainHeading}>
              Why <span className={styles.brandText}>Revaya</span> ?
            </h2>
            <p className={styles.subText}>
              We don’t just ship software — we build systems that quietly run your business for years. 
              Here’s what sets us apart from a template and a freelancer.
            </p>
          </div>

          <div className={styles.collageGrid}>
            <div className={styles.collageColumn}>
              <div className={`${styles.whyImageTall} ${styles.revealItem}`} style={{ '--delay': '1' } as React.CSSProperties}>
                <img src="/Why1.png" alt="Analytics data overview chart" />
              </div>
              <div className={`${styles.whyImageShort} ${styles.revealItem}`} style={{ '--delay': '3' } as React.CSSProperties}>
                <img src="/Why4.png" alt="System distribution sales pipeline visualization" />
              </div>
            </div>
            <div className={styles.collageColumn}>
              <div className={`${styles.whyImageShort} ${styles.revealItem}`} style={{ '--delay': '2' } as React.CSSProperties}>
                <img src="/Why2.png" alt="Expense breakdown metrics dashboard" />
              </div>
              <div className={`${styles.whyImageTall} ${styles.revealItem}`} style={{ '--delay': '4' } as React.CSSProperties}>
                <img src="/Why3.png" alt="HR profile allocation management matrix" />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT BLOCK: ALIGNED VALUE GRID CONTAINER */}
        <div className={styles.rightColumn}>
          <div className={styles.featuresGrid}>
            {featuresData.map((feature, index) => (
              <div 
                key={feature.id} 
                className={`${styles.featureCard} ${styles.revealItem}`}
                style={{ '--delay': `${index + 2}` } as React.CSSProperties}
              >
                <div className={styles.badgeWrapper}>
                  <div className={styles.badgeBox}>
                    <span className={styles.badgeNumber}>{feature.id}</span>
                  </div>
                </div>
                <div className={styles.featureContent}>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyRevaya;