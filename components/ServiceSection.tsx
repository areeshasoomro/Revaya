// components/ServiceSection.tsx
import styles from './ServiceSection.module.css';

const services = [
  {
    title: 'Custom ERP Solutions',
    description: 'Unify systems, automate workflows, and manage your entire business from a single platform.',
    image: '/card1.png',
    gridClass: styles.erpCard,
    isBlueTheme: true,
  },
  {
    title: 'SaaS Platforms',
    description: 'Build, launch, and scale SaaS products that drive recurring revenue and long-term growth.',
    image: '/card2.png',
    gridClass: styles.saasCard,
    isBlueTheme: false,
  },
  /* ─── SWAPPED ORDER HERE ─── */
  {
    title: 'Web Applications',
    description: 'High-performance, scalable web applications designed to support modern business operations.',
    image: '/card3.png',
    gridClass: styles.webCard,
    isBlueTheme: false,
  },
  {
    title: 'UI/UX Design',
    description: 'Create intuitive digital experiences that delight users and drive engagement.',
    image: '/card4.png',
    gridClass: styles.uiuxCard,
    isBlueTheme: true,
  },
  /* ────────────────────────── */
  {
    title: 'Automation Systems',
    description: 'Eliminate repetitive tasks and streamline operations through intelligent workflow automation.',
    image: '/card5.png',
    gridClass: styles.automationCard,
    isBlueTheme: true,
  },
  {
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications built for performance, usability, and growth.',
    image: '/card6.png',
    gridClass: styles.mobileCard,
    isBlueTheme: false,
  },
];

export default function ServicesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>
          Technology Built Around <span className={styles.highlight}>Your Business</span>
        </h2>
        <p className={styles.subtext}>
          From custom ERP systems to scalable SaaS platforms, we build software that eliminates complexity and accelerates growth.
        </p>

        <div className={styles.grid}>
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`${styles.card} ${service.gridClass} ${service.isBlueTheme ? styles.blueGradientTheme : styles.darkTheme}`}
            >
              <div className={styles.cardTextContent}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>
              </div>

              <div className={styles.imageContainer}>
                <img src={service.image} alt={service.title} className={styles.cardImage} />
              </div>

              <button className={styles.arrowButton}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}