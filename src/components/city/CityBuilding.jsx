import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CityBuilding = ({ project, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Position logic (alternating left/right of the road)
  const isLeft = index % 2 === 0;
  const sideOffset = isLeft ? -1 : 1;
  const depthIndex = Math.floor(index / 2);
  
  const zPosition = -depthIndex * 300 - 200; // Further back
  const xPosition = sideOffset * 250; // Left or Right
  
  // Staggered animation
  const delay = index * 0.2 + 0.5;

  return (
    <motion.div
      className={`building-container ${isHovered ? 'hovered' : ''}`}
      style={{
        transform: `translate3d(${xPosition}px, 0, ${zPosition}px)`
      }}
      initial={{ opacity: 0, y: 500 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, delay, type: 'spring', bounce: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(project)}
    >
      <div className="building-structure">
        <div className="building-face front">
          <div className="windows">
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`window ${Math.random() > 0.5 || isHovered ? 'lit' : ''}`}></div>
            ))}
          </div>
        </div>
        <div className={`building-face side ${isLeft ? 'right' : 'left'}`}></div>
        <div className="building-face top"></div>
      </div>
      
      <div className="building-sign">
        <span className="sign-text">{project.name || `PROJECT 0${index + 1}`}</span>
      </div>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            className="building-info-tooltip"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="tooltip-title">{project.name || `PROJECT 0${index + 1}`}</div>
            <div className="tooltip-category">{project.category || 'Development'}</div>
            <div className="tooltip-cta">Click to explore</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CityBuilding;
