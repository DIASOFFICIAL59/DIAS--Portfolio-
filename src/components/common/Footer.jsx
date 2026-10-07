import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaGithub, FaLinkedinIn } from 'react-icons/fa';
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
            <a href="https://www.instagram.com/dias_official59" target="_blank" rel="noopener noreferrer" className="social-link">
              <div className="social-icon-wrapper"><FaInstagram size={16} /></div>
              Instagram
            </a>
            <a href="https://github.com/DIASOFFICIAL59" target="_blank" rel="noopener noreferrer" className="social-link">
              <div className="social-icon-wrapper"><FaGithub size={16} /></div>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/dias-s-a400b33a7" target="_blank" rel="noopener noreferrer" className="social-link">
              <div className="social-icon-wrapper"><FaLinkedinIn size={16} /></div>
              LinkedIn
            </a>
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
