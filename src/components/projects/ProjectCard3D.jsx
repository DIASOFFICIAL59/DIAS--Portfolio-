import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code, ArrowUpRight, Layers } from 'lucide-react';

const ProjectCard3D = ({ project, index, onSelect }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth <= 768 || 
        window.matchMedia('(hover: none)').matches ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Smooth tilt angles (-10deg to +10deg)
    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 9;
    
    setRotate({ x: rotateX, y: rotateY });
    setLightPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    if (!isMobile) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setLightPos({ x: 50, y: 50 });
  };

  const projectTitle = project.name?.trim() || `PROJECT 0${index + 1}`;
  const projectCategory = project.category?.trim() || 'FRONTEND ARCHITECTURE';
  const projectDesc = project.description?.trim() || 
    'A high-performance interactive web application built with React, modular component architecture, and fluid responsive design.';
  const techList = project.technologies && project.technologies.length > 0 
    ? project.technologies 
    : ['React', 'JavaScript', 'CSS3', 'Vite'];
  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <motion.article 
      ref={cardRef}
      className={`cinematic-card-wrapper ${isHovered ? 'is-active' : ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="cinematic-card"
        style={{
          transform: !isMobile && isHovered 
            ? `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.015, 1.015, 1.015)` 
            : 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        }}
      >
        {/* Dynamic Specular Sheen Layer */}
        {!isMobile && (
          <div 
            className="card-specular-light"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(circle 350px at ${lightPos.x}% ${lightPos.y}%, rgba(255, 255, 255, 0.08), transparent 70%)`,
            }}
            aria-hidden="true"
          />
        )}

        {/* Card Header Info */}
        <div className="card-top-bar">
          <div className="project-index-badge">
            <span className="mono-prefix">//</span>
            <span className="mono-number">{formattedIndex}</span>
          </div>
          
          <div className="category-pill">
            <span className="pill-dot"></span>
            <span className="pill-text">{projectCategory}</span>
          </div>

          <div className="status-indicator">
            <span className="status-dot"></span>
            <span className="status-label">ACTIVE</span>
          </div>
        </div>

        {/* Visual Showcase Viewport (Aspect 16:9) */}
        <div 
          className="card-media-viewport"
          onClick={() => onSelect(project)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelect(project);
            }
          }}
          aria-label={`Open case study for ${projectTitle}`}
        >
          {/* Viewfinder Registration Corners */}
          <span className="viewfinder-corner top-left" aria-hidden="true" />
          <span className="viewfinder-corner top-right" aria-hidden="true" />
          <span className="viewfinder-corner bottom-left" aria-hidden="true" />
          <span className="viewfinder-corner bottom-right" aria-hidden="true" />

          {project.image ? (
            <div className="media-image-container">
              <img 
                src={project.image} 
                alt={`${projectTitle} screenshot`} 
                className="project-image"
                loading="lazy"
              />
              <div className="media-gradient-overlay" />
            </div>
          ) : (
            <div className="media-schematic-blueprint">
              <div className="blueprint-grid" />
              <div className="blueprint-core">
                <div className="schematic-ring ring-outer" />
                <div className="schematic-ring ring-mid" />
                <div className="schematic-ring ring-inner" />
                <Layers size={28} className="schematic-icon" />
              </div>
              <div className="blueprint-meta">
                <span className="blueprint-tag">SYSTEM // 0{index + 1}</span>
                <span className="blueprint-label">EXPLORE INTERACTIVE ARCHITECTURE</span>
              </div>
            </div>
          )}

          {/* Hover CTA Banner */}
          <div className="media-hover-cta">
            <span>EXPLORE CASE STUDY</span>
            <ArrowUpRight size={16} />
          </div>
        </div>

        {/* Project Content & Typography */}
        <div className="card-body">
          <h3 
            className="project-title"
            onClick={() => onSelect(project)}
          >
            {projectTitle}
          </h3>

          <p className="project-description">
            {projectDesc}
          </p>

          {/* Technology Badges */}
          <div className="tech-badge-container">
            {techList.map((tech, i) => (
              <span key={i} className="tech-badge">
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links Bar */}
          <div className="card-actions-bar">
            <button 
              className="action-btn cta-primary"
              onClick={() => onSelect(project)}
              aria-label={`View case study details for ${projectTitle}`}
            >
              <span>CASE STUDY</span>
              <ArrowUpRight size={15} />
            </button>

            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                className="action-btn cta-secondary"
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`View live website for ${projectTitle}`}
              >
                <span>LIVE DEMO</span>
                <ExternalLink size={14} />
              </a>
            )}

            {project.sourceUrl && (
              <a 
                href={project.sourceUrl} 
                className="action-btn cta-secondary"
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`View source code on GitHub for ${projectTitle}`}
              >
                <span>CODE</span>
                <Code size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard3D;
