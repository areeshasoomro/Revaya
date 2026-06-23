"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './ContactSection.module.css';

export const ContactSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    discovery: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Fire pixel-perfect dark theme toast notification
    setShowToast(true);
    
    // Flush input fields safely
    setFormData({ name: '', email: '', phone: '', discovery: '' });
    
    // Automatic cleanup timeline
    setTimeout(() => {
      setShowToast(false);
    }, 4500);
  };

  const openBookingModal = () => setIsModalOpen(true);
  const closeBookingModal = () => setIsModalOpen(false);

  const whatsappNumber = "+923277862326";
  const whatsappMessage = encodeURIComponent("Hello Revaya team! I'd like to discuss a project layout.");
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${whatsappMessage}`;

  return (
    <section className={styles.sectionContainer}>
      {/* ─── CUSTOM SUCCESS TOAST POPUP ─── */}
      {showToast && (
        <div className={styles.toastPanel}>
          <div className={styles.toastStatusCircle}>
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
              <path d="M1 5L4.5 8.5L11 1.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={styles.toastTextFrame}>
            <span className={styles.toastHeader}>Message Sent</span>
            <span className={styles.toastDescription}>We'll review your details and contact you within 24 hours.</span>
          </div>
          <button className={styles.toastDismissBtn} onClick={() => setShowToast(false)}>&times;</button>
        </div>
      )}

      <div className={styles.mainCardFrame}>
        <div className={styles.cardGlowOverlay} />

        {/* Form Container Side */}
        <div className={styles.formSide}>
          <h2 className={styles.sectionTitle}>
            Get in <span className={styles.blueText}>Touch</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Tell us a little about your project and we'll get back to you within one business day.
          </p>

          <form onSubmit={handleFormSubmit} className={styles.contactForm}>
            <div className={styles.inputWrapper}>
              <input 
                type="text" 
                name="name"
                placeholder="Name *" 
                required 
                value={formData.name}
                onChange={handleInputChange}
                className={styles.formInput}
              />
            </div>

            <div className={styles.inputWrapper}>
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                value={formData.email}
                onChange={handleInputChange}
                className={styles.formInput}
              />
            </div>

            <div className={styles.inputWrapper}>
              <input 
                type="tel" 
                name="phone"
                placeholder="Phone number *" 
                required 
                value={formData.phone}
                onChange={handleInputChange}
                className={styles.formInput}
              />
            </div>

            <div className={styles.inputWrapper}>
              <select 
                name="discovery"
                value={formData.discovery}
                onChange={handleInputChange}
                required
                className={styles.formSelect}
              >
                <option value="" disabled hidden>How did you find us?</option>
                <option value="linkedin">LinkedIn</option>
                <option value="google">Google Search</option>
                <option value="recommendation">Word of Mouth / Recommendation</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Exact Figma Capitalized SEND Button with matching styling */}
            <button type="submit" className={styles.submitBtn}>
              SEND
            </button>
          </form>

          {/* Action Row Buttons Layout matching image_17ba40.jpg */}
          <div className={styles.actionRowContainer}>
            {/* Book a Call with customized phone/down-arrow combo */}
            <button type="button" className={styles.bookCallBtn} onClick={openBookingModal}>
              Book a Call 
              <span className={styles.btnIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  {/* Phone Receiver Base Graphic Layer */}
                  <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .3l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" fill="#FF4B4B"/>
                  {/* Downward Directional Indicator Arrow overlay */}
                  <path d="M12 4v8m0 0l-3-3m3 3l3-3" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>

            {/* Transparent Bordered Whatsapp Layout Asset */}
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.whatsappLink}
            >
              Whatsapp Us 
              <span className={styles.btnIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.855.001-2.633-1.02-5.107-2.875-6.964C16.547 1.978 14.08 1.958 11.45 1.958c-5.438 0-9.863 4.421-9.866 9.856-.001 1.762.481 3.479 1.396 5.01l-1.011 3.69 3.784-.992zM16.52 14.3c-.269-.135-1.594-.786-1.84-.876-.247-.09-.427-.135-.607.135-.18.269-.696.876-.853 1.056-.157.18-.314.202-.583.067-.27-.135-1.138-.419-2.167-1.338-.801-.715-1.342-1.598-1.5-1.867-.157-.269-.017-.415.118-.549.121-.121.27-.314.404-.471.135-.157.18-.27.27-.449.09-.18.045-.337-.022-.472-.067-.135-.607-1.46-.831-2.001-.219-.526-.44-.454-.607-.463-.157-.008-.337-.01-.517-.01-.18 0-.472.067-.719.337-.247.269-.943.921-.943 2.246s.965 2.605 1.1 2.785c.135.18 1.9 2.901 4.603 4.067.643.277 1.144.443 1.534.567.646.205 1.234.176 1.7.106.519-.078 1.594-.651 1.819-1.279.225-.628.225-1.167.157-1.279-.067-.112-.247-.18-.516-.315z"/>
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* Identity Graphics Asset Panel */}
        <div className={styles.logoSide}>
          <div className={styles.logoImageContainer}>
            <Image 
              src="/loogo.png" 
              alt="Revaya Logo Layout" 
              width={280} 
              height={280} 
              priority
              className={styles.brandLogoAsset}
            />
          </div>
        </div>
      </div>

      {/* Booking Modal Sheet Window */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeBookingModal}>
          <div className={styles.modalBody} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalCloseBtn} onClick={closeBookingModal}>&times;</button>
            <h3 className={styles.modalTitle}>Schedule a Discovery Call</h3>
            <p className={styles.modalText}>Select an available calendar allocation for system mapping updates.</p>
            <div className={styles.schedulerPlaceholder}>
              <p>nahi kiya implement :)</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactSection;