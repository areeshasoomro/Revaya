"use client";

import React, { useState } from 'react';
import styles from './FaqSection.module.css';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    id: 1,
    question: "What industries do you work with?",
    answer: "We've shipped systems for manufacturing, logistics, healthcare, retail, and finance — but our approach works for any business with processes worth automating."
  },
  {
    id: 2,
    question: "How long does a project usually take?",
    answer: "A standard phase-one deployment takes between 4 to 6 weeks from strategy kickoff to production live release, structured in highly transparent weekly sprints."
  },
  {
    id: 3,
    question: "How much does a project cost?",
    answer: "Pricing depends strictly on your workflow complexity and integration surface area. After a scoping session, we offer a guaranteed fixed-price roadmap."
  },
  {
    id: 4,
    question: "Do you provide post-deployment support?",
    answer: "Yes, we don't vanish after launch. Every project includes ongoing server monitoring, performance tuning, and rapid updates to keep your business running smoothly."
  },
  {
    id: 5,
    question: "Can you integrate with our existing systems?",
    answer: "Absolutely. We build customized API hooks to bind into your legacy CRMs, ERP architectures, or financial ledgers without risking data loss or operational downtime."
  },
  {
    id: 6,
    question: "Who owns the code after delivery?",
    answer: "You do. Once the final milestone is deployed, full IP ownership, source code repositories, and access credentials transfer entirely over to your internal team."
  }
];

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.ambientTopGlow} />

      <div className={styles.headerBlock}>
        <h2 className={styles.mainTitle}>
          Frequently Asked <span className={styles.blueText}>Questions</span>
        </h2>
      </div>

      <div className={styles.faqLayoutGrid}>
        {faqData.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div 
              key={item.id} 
              className={`${styles.faqCard} ${isOpen ? styles.cardActive : ''}`}
              onClick={() => toggleFaq(item.id)}
            >
              <div className={styles.cardHeader}>
                <span className={`${styles.statusIcon} ${isOpen ? styles.iconMinus : styles.iconPlus}`}>
                  {isOpen ? '−' : '+'}
                </span>
                <h3 className={styles.questionText}>{item.question}</h3>
              </div>
              
              <div className={`${styles.answerWrapper} ${isOpen ? styles.wrapperExpanded : ''}`}>
                <div className={styles.answerContent}>
                  <p className={styles.answerText}>{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FaqSection;