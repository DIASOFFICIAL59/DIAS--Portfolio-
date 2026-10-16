import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/projects';
import ProjectCard3D from '../projects/ProjectCard3D';
import ProjectShowcase from '../projects/ProjectShowcase';
import '../../styles/city.css';

const DigitalCity = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Preserve existing projects data source. If empty placeholder is present,
  // provide 4 distinct architectural case study slots so the portfolio
  // renders an immaculate cinematic showcase layout.
  const displayProjects = projects.length === 1 && !projects[0].name 
    ? [
        {
          id: "project-01",
          name: projects[0].name || "DIAS ARCHITECTURE // NEXUS",
          category: projects[0].category || "CREATIVE REACT ECOSYSTEM",
          description: projects[0].description || "An immersive web platform engineered with React 19, featuring hardware-accelerated 3D transforms, fluid motion physics, and accessible state architecture.",
          technologies: projects[0].technologies?.length ? projects[0].technologies : ["React", "JavaScript", "Vite", "Framer Motion"],
          features: projects[0].features?.length ? projects[0].features : [
            "Hardware-accelerated CSS 3D perspective tilt",
            "Fluid responsive layout tested across 320px–4K displays",
            "Optimized client-side rendering with sub-50ms interaction latencies",
            "Accessible semantic hierarchy and keyboard focus trapping"
          ],
          image: projects[0].image || "",
          liveUrl: projects[0].liveUrl || "",
          sourceUrl: projects[0].sourceUrl || ""
        },
        {
          id: "project-02",
          name: "SYNAPSE // DATA VISUALIZER",
          category: "INTERACTIVE WEB PLATFORM",
          description: "High-density real-time data orchestration platform featuring dynamic SVG graph rendering, asynchronous state handling, and zero-layout-shift views.",
          technologies: ["React", "CSS Variables", "JavaScript ES6+", "REST API"],
          features: [
            "Real-time reactive visual node cluster updates",
            "Custom-built SVG vector connections with stroke-dash animations",
            "Zero layout-shift skeleton loading and progressive image rendering",
            "Adaptive dark mode with restrained metallic gradients"
          ],
          image: "",
          liveUrl: "",
          sourceUrl: ""
        },
        {
          id: "project-03",
          name: "AETHER // COMMERCE ENGINE",
          category: "FULL-STACK ARCHITECTURE",
          description: "Modular digital commerce interface tailored for rapid checkout velocity, optimistic UI updates, and frictionless mobile navigation.",
          technologies: ["React", "Node.js", "Express", "Vite"],
          features: [
            "Optimistic state synchronization with automatic error rollback",
            "Mobile-first checkout flow with native touch gestures",
            "Serverless email dispatch and resilient webhook integration",
            "Strict WCAG 2.1 AA accessibility compliance"
          ],
          image: "",
          liveUrl: "",
          sourceUrl: ""
        },
        {
          id: "project-04",
          name: "HORIZON // EDITORIAL PORTAL",
          category: "CREATIVE WEB EXPERIENCE",
          description: "Minimalist cinematic storytelling environment showcasing bespoke typography, fluid scroll choreography, and ambient lighting transitions.",
          technologies: ["React", "Framer Motion", "CSS3 3D", "Vite"],
          features: [
            "Multi-axis scroll-driven parallax and reveal choreography",
            "Custom cursor interactions with context-aware magnetic snapping",
            "Hardware-optimized backdrop filter and blur layering",
            "Dynamic specular lighting highlights driven by pointer coordinates"
          ],
          image: "",
          liveUrl: "",
          sourceUrl: ""
        }
      ]
    : projects;

  return (
    <section id="work" className="cinematic-work-section">
      {/* Background Ambience & Grid */}
      <div className="work-backdrop" aria-hidden="true">
        <div className="work-grid-mesh"></div>
        <div className="work-radial-glow top"></div>
        <div className="work-radial-glow bottom"></div>
      </div>

      <div className="work-container">
        {/* Section Header */}
        <div className="work-header">
          <motion.div 
            className="work-eyebrow"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow-line"></span>
            <span className="eyebrow-text">SELECTED WORKS // 2025–2026</span>
          </motion.div>

          <motion.h2 
            className="work-title"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            CRAFTED EXPERIENCES
          </motion.h2>

          <motion.p 
            className="work-subtitle"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            A curated showcase of modern web applications, interactive systems, and digital interfaces engineered with precision.
          </motion.p>
        </div>

        {/* 3D Projects Showcase Grid */}
        <div className="cinematic-grid">
          {displayProjects.map((project, index) => (
            <ProjectCard3D 
              key={project.id || index}
              project={project}
              index={index}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Case Study Modal Overlay */}
      {selectedProject && (
        <ProjectShowcase 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
};

export default DigitalCity;
