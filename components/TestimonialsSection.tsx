"use client";

import React, { useEffect, useState } from 'react';
import styles from './TestimonialsSection.module.css';

interface TestimonialCard {
  id: number;
  quote: string;
  name: string;
  role: string;
  avatarUrl: string;
}

const testimonialsData: TestimonialCard[] = [
  {
    id: 1,
    quote: "Revaya turned our messy, manual HR process into a fully automated system. What used to eat up two days every month now runs on its own — our team finally trusts the numbers.",
    name: "Ali Raza",
    role: "Executive Engineer",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 2,
    quote: "Their ERP brought finance, inventory, and reporting into one place. I get a real-time view of the whole business instead of chasing five different spreadsheets.",
    name: "Sana Ahmed",
    role: "Executive Engineer",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 3,
    quote: "We came to Revaya with a vague idea and left with a working product in six weeks. They didn't just build what we asked for — they pushed back where it mattered and made it better.",
    name: "Bilal Khan",
    role: "Executive Engineer",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 4,
    quote: "From first call to launch, the communication was flawless. The platform handles thousands of patient records daily without a hiccup, and support has been there every step since go-live.",
    name: "Hira Sheikh",
    role: "Executive Engineer",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

export const TestimonialsSection: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.leftCosmicGlow} />
      <div className={styles.rightCosmicGlow} />

      <div className={styles.headerBlock}>
        <h2 className={styles.mainTitle}>
          Real <span className={styles.blueText}>People.</span> Real <span className={styles.blueText}>Stories.</span>
        </h2>
        <p className={styles.subSubtitle}>What Our Clients Say About Us</p>
      </div>

      <div className={styles.cardsCanvas}>
        {isMounted && testimonialsData.map((item, idx) => (
          <div 
            key={item.id} 
            className={`${styles.glassCard} ${styles[`cardPosition${idx + 1}`]}`}
            style={{ '--card-idx': idx } as React.CSSProperties}
          >
            <div className={styles.avatarFrame}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.avatarUrl} alt={item.name} className={styles.avatarImage} />
            </div>

            <div className={styles.cardBody}>
              <p className={styles.quoteText}>“{item.quote}”</p>
              <div className={styles.metaContainer}>
                <h4 className={styles.clientName}>{item.name}</h4>
                <span className={styles.clientRole}>{item.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;