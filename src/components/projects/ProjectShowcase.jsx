import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Code, X, CheckCircle2 } from 'lucide-react';
import '../../styles/showcase.css';

const ProjectShowcase = ({ project, onClose }) => {
  // Prevent body scroll and add Escape key listener
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow || 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  const projectTitle = project.name?.trim() || 'PROJECT ARCHITECTURE CASE STUDY';
  const projectCategory = project.category?.trim() || 'FRONTEND ARCHITECTURE';
  const projectDesc = project.description?.trim() || 
    'A high-performance interactive web application built with React, modular component architecture, and fluid responsive design.';
  const techList = project.technologies && project.technologies.length > 0
    ? project.technologies
    : ['React', 'JavaScript', 'CSS3', 'Vite'];
  const featureList = project.features && project.features.length > 0
    ? project.features
    : [
        'Modular Component Architecture with React 19',
        'Fluid Responsive Engineering across all viewports',
        'Hardware-accelerated CSS 3D Depth & Transitions',
        'Accessible Semantic HTML & Keyboard Navigation'
      ];

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.35, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.25, ease: 'easeIn' }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
    },
    exit: { 
      opacity: 0, 
      y: 20, 
      scale: 0.98,
      transition: { duration: 0.25, ease: 'easeIn' }
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="showcase-overlay"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
      >
        <motion.div 
          className="showcase-container"
          variants={modalVariants}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Navigation Bar */}
          <div className="showcase-header">
            <button 
              className="back-btn" 
              onClick={onClose}
              aria-label="Back to Projects"
            >
              <ArrowLeft size={16} />
              <span>BACK TO PROJECTS</span>
            </button>

            <button 
              className="close-icon-btn"
              onClick={onClose}
              aria-label="Close Case Study"
            >
              <X size={20} />
            </button>
          </div>

          <div className="showcase-content">
            {/* Cinematic Media Hero */}
            <div className="showcase-image-wrapper">
              {project.image ? (
                <div 
                  className="showcase-image"
                  style={{ backgroundImage: `url(${project.image})` }}
                  role="img"
                  aria-label={`${projectTitle} showcase screenshot`}
                />
              ) : (
                <div className="showcase-image-placeholder">
                  <div className="placeholder-blueprint-grid" />
                  <div className="placeholder-content">
                    <span className="placeholder-eyebrow">// CASE STUDY ARCHITECTURE</span>
                    <h3 className="placeholder-title">{projectTitle}</h3>
                    <span className="placeholder-text">HIGH-RESOLUTION SCREENSHOTS & ASSETS EMBEDDED DYNAMICALLY</span>
                  </div>
                </div>
              )}
            </div>

            {/* Case Study Details Grid */}
            <div className="showcase-details">
              
              <div className="showcase-title-section">
                <div className="showcase-category">{projectCategory}</div>
                <h2 id="case-study-title" className="showcase-title">{projectTitle}</h2>
              </div>

              <div className="showcase-description">
                <h3 className="section-heading">ARCHITECTURE & OVERVIEW</h3>
                <p>{projectDesc}</p>
              </div>

              <div className="showcase-tech">
                <h3 className="section-heading">TECHNOLOGIES & TOOLS</h3>
                <div className="tech-tags">
                  {techList.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="showcase-features">
                <h3 className="section-heading">KEY CAPABILITIES</h3>
                <ul className="feature-list">
                  {featureList.map((feature, i) => (
                    <li key={i}>
                      <CheckCircle2 size={16} className="feature-check" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="showcase-actions">
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    className="action-btn primary" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <span>LAUNCH LIVE SYSTEM</span>
                    <ExternalLink size={16} />
                  </a>
                )}
                
                {project.sourceUrl && (
                  <a 
                    href={project.sourceUrl} 
                    className="action-btn secondary" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <span>VIEW SOURCE REPOSITORY</span>
                    <Code size={16} />
                  </a>
                )}

                <button 
                  className="action-btn close-btn"
                  onClick={onClose}
                >
                  <span>RETURN TO WORK</span>
                </button>
              </div>
              
            </div>
          </div>
          
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectShowcase;
