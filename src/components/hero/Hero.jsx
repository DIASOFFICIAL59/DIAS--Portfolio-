import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import "../../styles/hero.css";

const Hero = () => {
  const [isEntering, setIsEntering] = useState(false);

  const handleEnterWorld = (e) => {
    if (e) e.preventDefault();
    if (isEntering) return;

    const workSection = document.getElementById('work');
    if (!workSection) return;

    setIsEntering(true);

    const isReduced = 
      typeof window !== 'undefined' && 
      (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth <= 768);

    if (isReduced) {
      workSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        setIsEntering(false);
      }, 700);
      return;
    }

    // Cinematic camera travel timing
    setTimeout(() => {
      const topOffset = workSection.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }, 240);

    // Reset hero transition state once smooth scrolling finishes
    setTimeout(() => {
      setIsEntering(false);
    }, 1200);
  };

  return (
    <div id="home" className="hero-section">
      <motion.div 
        className="hero-background"
        animate={isEntering ? {
          scale: 1.12,
          opacity: 0.75,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        } : {
          scale: 1,
          opacity: 1,
          transition: { duration: 0.8 }
        }}
      >
        <div className="bg-grid"></div>
        <div className="bg-glow"></div>
        <div className="bg-particles"></div>
      </motion.div>

      <motion.div 
        className="hero-content"
        animate={isEntering ? {
          scale: 1.05,
          y: -16,
          opacity: 0.45,
          filter: "blur(2px)",
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
        } : {
          scale: 1,
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          transition: { duration: 0.6, ease: "easeOut" }
        }}
      >
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
            className={`hero-cta ${isEntering ? 'is-entering' : ''}`}
            onClick={handleEnterWorld}
            disabled={isEntering}
            aria-label="Enter DIAS world and view projects"
            whileHover={!isEntering ? { scale: 1.04 } : undefined}
            whileTap={!isEntering ? { scale: 0.96 } : undefined}
          >
            <span className="cta-text">ENTER MY WORLD</span>
            <motion.span 
              className="cta-icon"
              animate={isEntering ? { 
                x: [0, 8, 4], 
                opacity: [1, 0.6, 1],
                transition: { repeat: Infinity, duration: 0.6 } 
              } : { x: 0 }}
            >
              <ArrowRight size={18} />
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        onClick={handleEnterWorld}
        role="button"
        tabIndex={0}
        aria-label="Scroll to explore projects"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleEnterWorld();
          }
        }}
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
