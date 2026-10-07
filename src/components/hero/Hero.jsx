import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import "../../styles/hero.css";

const Hero = () => {
  return (
    <div id="home" className="hero-section">
      <div className="hero-background">
        <div className="bg-grid"></div>
        <div className="bg-glow"></div>
        <div className="bg-particles"></div>
      </div>

      <div className="hero-content">
        <motion.div 
          className="hero-identity"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, letterSpacing: "0.5em", y: 10 },
            visible: { 
              opacity: 1, 
              letterSpacing: "0.25em",
              y: 0,
              transition: { duration: 1.2, delay: 0.8, ease: "easeOut" }
            }
          }}
          whileHover={{ 
            scale: 1.05,
            letterSpacing: "0.3em",
            textShadow: "0px 0px 20px rgba(168, 85, 247, 0.8)",
            transition: { duration: 0.3 }
          }}
        >
          DIAS
        </motion.div>
        
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Creative <br /> React Developer
        </motion.h1>

        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          I build modern digital experiences,<br />
          interactive interfaces,<br />
          and creative web applications.
        </motion.p>

        <motion.div
          className="hero-cta-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.button 
            className="hero-cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="cta-text">ENTER MY WORLD</span>
            <motion.span 
              className="cta-icon"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
            >
              <ArrowRight size={18} />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>

      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <span className="scroll-text">SCROLL TO EXPLORE</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="scroll-icon" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
