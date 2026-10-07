import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillsData } from '../../data/skills';
import '../../styles/skills.css';

const DigitalCore = () => {
  const [selectedSkill, setSelectedSkill] = useState(skillsData[0]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate circular positions for desktop
  const radius = 280;
  const totalNodes = skillsData.length;

  return (
    <section id="skills" className="core-section">
      <div className="core-background">
        <div className="core-grid"></div>
        <div className="core-glow"></div>
      </div>

      <div className="core-header-container">
        <motion.h3 
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          TECHNOLOGY STACK
        </motion.h3>
        <motion.h2 
          className="core-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          DIGITAL CORE
        </motion.h2>
      </div>

      <div className="core-viewport">
        {/* Desktop Circular Layout */}
        {!isMobile && (
          <div className="core-system">
            
            {/* The Central Core Display */}
            <div className="central-core">
              <div className="core-rings">
                <div className="ring ring-1"></div>
                <div className="ring ring-2"></div>
                <div className="ring ring-3"></div>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={selectedSkill.id}
                  className="core-data"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="core-data-category">{selectedSkill.category}</div>
                  <div className="core-data-name">{selectedSkill.name}</div>
                  <div className="core-data-desc">{selectedSkill.description}</div>
                  
                  <div className="core-data-features">
                    {selectedSkill.features.map((feat, idx) => (
                      <span key={idx} className="core-feature-tag">{feat}</span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Orbiting Nodes */}
            {skillsData.map((skill, index) => {
              const angle = (index / totalNodes) * 2 * Math.PI - Math.PI / 2;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const isActive = selectedSkill.id === skill.id;

              return (
                <motion.button
                  key={skill.id}
                  className={`skill-node ${isActive ? 'active' : ''}`}
                  style={{ x, y }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1 }}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  whileHover={{ scale: 1.1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.2 + index * 0.1, 
                    type: "spring",
                    bounce: 0.4
                  }}
                  onClick={() => setSelectedSkill(skill)}
                  onMouseEnter={() => setSelectedSkill(skill)}
                  onFocus={() => setSelectedSkill(skill)}
                  aria-label={`View details for ${skill.name}`}
                >
                  <div className="node-pulse"></div>
                  <span className="node-label">{skill.name}</span>
                </motion.button>
              );
            })}
            
            {/* Connecting Lines */}
            <svg className="core-connections" viewBox="0 0 800 800" style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', pointerEvents: 'none' }}>
              {skillsData.map((skill, index) => {
                const angle = (index / totalNodes) * 2 * Math.PI - Math.PI / 2;
                const x = 400 + Math.cos(angle) * (radius - 40);
                const y = 400 + Math.sin(angle) * (radius - 40);
                const isActive = selectedSkill.id === skill.id;
                
                return (
                  <motion.line
                    key={`line-${skill.id}`}
                    x1="400"
                    y1="400"
                    x2={x}
                    y2={y}
                    stroke={isActive ? 'rgba(168, 85, 247, 0.6)' : 'rgba(255, 255, 255, 0.1)'}
                    strokeWidth={isActive ? "2" : "1"}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  />
                );
              })}
            </svg>
          </div>
        )}

        {/* Mobile Stacked Layout */}
        {isMobile && (
          <div className="mobile-core-system">
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={`mobile-${selectedSkill.id}`}
                className="mobile-core-display"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="core-rings mobile-rings">
                  <div className="ring ring-1"></div>
                  <div className="ring ring-2"></div>
                </div>
                
                <div className="core-data mobile-data">
                  <div className="core-data-category">{selectedSkill.category}</div>
                  <div className="core-data-name">{selectedSkill.name}</div>
                  <div className="core-data-desc">{selectedSkill.description}</div>
                  <div className="core-data-features">
                    {selectedSkill.features.map((feat, idx) => (
                      <span key={idx} className="core-feature-tag">{feat}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mobile-nodes-grid">
              {skillsData.map((skill, index) => {
                const isActive = selectedSkill.id === skill.id;
                
                return (
                  <motion.button
                    key={skill.id}
                    className={`mobile-node ${isActive ? 'active' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    onClick={() => setSelectedSkill(skill)}
                  >
                    {skill.name}
                  </motion.button>
                );
              })}
            </div>
            
          </div>
        )}
      </div>
    </section>
  );
};

export default DigitalCore;
