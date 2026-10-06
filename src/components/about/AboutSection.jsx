import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/about.css';

const aboutData = {
  title: "BEHIND THE INTERFACE",
  subtitle: "WHO IS DIAS?",
  role: "Creative React Developer",
  intro: "I build modern web experiences with React, combining clean interfaces, thoughtful interactions, and creative visual ideas.",
  principles: [
    {
      id: "01",
      title: "BUILD",
      description: "I turn ideas into functional web experiences."
    },
    {
      id: "02",
      title: "DESIGN",
      description: "I care about visual hierarchy, usability, and interaction."
    },
    {
      id: "03",
      title: "EXPLORE",
      description: "I experiment with creative ways to make websites memorable."
    }
  ],
  imagePlaceholder: "IMAGE AWAITING UPLOAD"
};

const AboutSection = () => {
  const [activePrinciple, setActivePrinciple] = useState(aboutData.principles[0].id);

  return (
    <section id="about" className="about-section">
      <div className="about-background">
        <div className="about-grid"></div>
        <div className="about-glow"></div>
      </div>

      <div className="about-container">
        
        <motion.div 
          className="about-visual"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            className="about-image-wrapper"
            whileHover={{ scale: 1.02, rotateY: 2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="about-image-placeholder">
              <span className="placeholder-text">{aboutData.imagePlaceholder}</span>
            </div>
            <div className="image-overlay-glow"></div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="about-content"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <div className="about-header">
            <h3 className="section-label">{aboutData.title}</h3>
            <h2 className="main-title">{aboutData.subtitle}</h2>
            <h4 className="role-title">{aboutData.role}</h4>
          </div>

          <p className="about-intro">{aboutData.intro}</p>

          <div className="about-principles">
            {aboutData.principles.map((principle) => {
              const isActive = activePrinciple === principle.id;
              
              return (
                <div 
                  key={principle.id}
                  className={`principle-item ${isActive ? 'active' : ''}`}
                  onMouseEnter={() => setActivePrinciple(principle.id)}
                  onFocus={() => setActivePrinciple(principle.id)}
                  tabIndex={0}
                  role="button"
                >
                  <div className="principle-header">
                    <span className="principle-id">{principle.id}</span>
                    <span className="principle-title">— {principle.title}</span>
                  </div>
                  
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        className="principle-description"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <p>{principle.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
