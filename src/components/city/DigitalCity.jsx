import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/projects';
import CityBuilding from './CityBuilding';
import ProjectShowcase from '../projects/ProjectShowcase';
import '../../styles/city.css';

const DigitalCity = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // If projects array is just 1 empty item, we'll duplicate it 3 times just for visual layout testing
  // But using the exact objects provided, without inventing names.
  const displayProjects = projects.length === 1 && !projects[0].name 
    ? [projects[0], { ...projects[0], id: "temp-2" }, { ...projects[0], id: "temp-3" }, { ...projects[0], id: "temp-4" }] 
    : projects;

  return (
    <section id="work" className="city-section">
      <div className="city-header">
        <motion.h2 
          className="city-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          DIAS DIGITAL CITY
        </motion.h2>
        <motion.p 
          className="city-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Explore my digital infrastructure
        </motion.p>
      </div>

      <div className="city-viewport">
        <div className="city-scene">
          <div className="city-road">
            <div className="road-lines"></div>
            <div className="road-glow"></div>
          </div>
          
          <div className="city-buildings">
            {displayProjects.map((project, index) => (
              <CityBuilding 
                key={project.id || index} 
                project={project} 
                index={index} 
                onClick={setSelectedProject}
              />
            ))}
          </div>
          
          <div className="city-atmosphere"></div>
        </div>
      </div>

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
