import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Code } from 'lucide-react';
import '../../styles/showcase.css';

const ProjectShowcase = ({ project, onClose }) => {
  // Prevent body scroll when showcase is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!project) return null;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.4, staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="showcase-overlay"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="showcase-container">
          
          <motion.div variants={itemVariants} className="showcase-header">
            <button 
              className="back-btn" 
              onClick={onClose}
              aria-label="Back to Digital City"
            >
              <ArrowLeft size={18} />
              <span>BACK TO CITY</span>
            </button>
          </motion.div>

          <div className="showcase-content">
            
            <motion.div variants={itemVariants} className="showcase-image-wrapper">
              {project.image ? (
                <motion.div 
                  className="showcase-image"
                  style={{ backgroundImage: `url(${project.image})` }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              ) : (
                <div className="showcase-image-placeholder">
                  <span className="placeholder-text">PROJECT IMAGE AWAITING UPLOAD</span>
                </div>
              )}
            </motion.div>

            <div className="showcase-details">
              
              <motion.div variants={itemVariants} className="showcase-title-section">
                {project.category && <div className="showcase-category">{project.category}</div>}
                <h2 className="showcase-title">{project.name || 'UNTITLED PROJECT'}</h2>
              </motion.div>

              {project.description && (
                <motion.div variants={itemVariants} className="showcase-description">
                  <h3 className="section-heading">WHAT I BUILT</h3>
                  <p>{project.description}</p>
                </motion.div>
              )}

              {project.technologies && project.technologies.length > 0 && (
                <motion.div variants={itemVariants} className="showcase-tech">
                  <h3 className="section-heading">TECHNOLOGIES</h3>
                  <div className="tech-tags">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </motion.div>
              )}

              {project.features && project.features.length > 0 && (
                <motion.div variants={itemVariants} className="showcase-features">
                  <h3 className="section-heading">KEY FEATURES</h3>
                  <ul className="feature-list">
                    {project.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </motion.div>
              )}

              <motion.div variants={itemVariants} className="showcase-actions">
                {project.liveUrl && (
                  <a href={project.liveUrl} className="action-btn primary" target="_blank" rel="noopener noreferrer">
                    <span>VIEW LIVE WEBSITE</span>
                    <ExternalLink size={16} />
                  </a>
                )}
                {project.sourceUrl && (
                  <a href={project.sourceUrl} className="action-btn secondary" target="_blank" rel="noopener noreferrer">
                    <span>VIEW SOURCE CODE</span>
                    <Code size={16} />
                  </a>
                )}
              </motion.div>
              
            </div>
          </div>
          
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectShowcase;
