import React from 'react';
import { motion } from 'framer-motion';
import { contactData } from '../../data/contact';
import '../../styles/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="footer-glow"></div>
      <div className="footer-container">
        
        <div className="footer-content">
          <motion.div 
            className="footer-brand"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="footer-logo">DIAS</h2>
            <p className="footer-tagline">Building digital experiences.</p>
          </motion.div>

          <motion.div 
            className="footer-links"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {contactData.github && (
              <a href={contactData.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            )}
            {contactData.linkedin && (
              <a href={contactData.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            )}
            {contactData.email && (
              <a href={`mailto:${contactData.email}`}>Email</a>
            )}
          </motion.div>
        </div>

        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="footer-divider"></div>
          <div className="footer-credits">
            <span className="copyright">© {currentYear} Dias. All rights reserved.</span>
            <span className="end-transmission">END OF TRANSMISSION</span>
          </div>
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;
