import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Code, Link } from 'lucide-react';
import { contactData } from '../../data/contact';
import ContactForm from './ContactForm';
import SignalAnimation from './SignalAnimation';
import '../../styles/contact.css';

const ContactSection = () => {
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <section id="contact" className="contact-section">
      <div className="contact-background">
        <div className="contact-grid"></div>
        <div className="contact-glow"></div>
      </div>

      <div className="contact-container">
        
        <div className="contact-left">
          <motion.div 
            className="contact-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="contact-title">{contactData.title}</h2>
            <p className="contact-subtitle">{contactData.subtitle}</p>
          </motion.div>

          <SignalAnimation isTransmitting={isTransmitting} isSuccess={isSuccess} />

          <motion.div 
            className="contact-links"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {contactData.email && (
              <a href={`mailto:${contactData.email}`} className="contact-link" aria-label="Email">
                <Mail size={18} />
                <span>EMAIL</span>
              </a>
            )}
            {contactData.github && (
              <a href={contactData.github} className="contact-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Code size={18} />
                <span>GITHUB</span>
              </a>
            )}
            {contactData.linkedin && (
              <a href={contactData.linkedin} className="contact-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Link size={18} />
                <span>LINKEDIN</span>
              </a>
            )}
          </motion.div>
        </div>

        <motion.div 
          className="contact-right"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="contact-form-container">
            <ContactForm 
              onTransmitStart={() => setIsTransmitting(true)}
              onTransmitSuccess={() => {
                setIsTransmitting(false);
                setIsSuccess(true);
              }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ContactSection;
