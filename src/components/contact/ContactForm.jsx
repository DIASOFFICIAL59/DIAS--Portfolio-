import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { contactData } from '../../data/contact';

const ContactForm = ({ onTransmitStart, onTransmitSuccess }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message is too short';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ ...errors, submit: '' });
    
    if (validate()) {
      setIsSubmitting(true);
      onTransmitStart();
      
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        
        const response = await fetch(`${apiUrl}/api/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message
          })
        });

        const result = await response.json();

        if (response.status === 200) {
          setIsSubmitting(false);
          setIsSuccess(true);
          onTransmitSuccess();
          setFormData({ name: '', email: '', message: '' });
        } else {
          throw new Error(result.error || 'Failed to transmit message.');
        }
      } catch (error) {
        setIsSubmitting(false);
        setErrors({ submit: error.message || 'An error occurred during transmission. Ensure backend is running.' });
      }
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        className="form-success-state"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <CheckCircle size={48} className="success-icon" />
        <h3>{contactData.successMessage}</h3>
        <p>{contactData.successDescription}</p>
        
        {/* If real email is provided, we can offer a fallback direct email link */}
        {contactData.email && (
          <a href={`mailto:${contactData.email}`} className="fallback-email">
            Send via email app instead
          </a>
        )}
      </motion.div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      
      <div className="form-group">
        <label htmlFor="name">NAME</label>
        <div className={`input-wrapper ${errors.name ? 'error' : ''}`}>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            disabled={isSubmitting}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
        </div>
        <AnimatePresence>
          {errors.name && (
            <motion.span 
              id="name-error"
              className="error-message"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              {errors.name}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="form-group">
        <label htmlFor="email">EMAIL</label>
        <div className={`input-wrapper ${errors.email ? 'error' : ''}`}>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            disabled={isSubmitting}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </div>
        <AnimatePresence>
          {errors.email && (
            <motion.span 
              id="email-error"
              className="error-message"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              {errors.email}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="form-group">
        <label htmlFor="message">MESSAGE</label>
        <div className={`input-wrapper ${errors.message ? 'error' : ''}`}>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Initialize connection..."
            rows="5"
            disabled={isSubmitting}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          ></textarea>
        </div>
        <AnimatePresence>
          {errors.message && (
            <motion.span 
              id="message-error"
              className="error-message"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              {errors.message}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {errors.submit && (
          <motion.div 
            className="submit-error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ color: '#ef4444', fontSize: '14px', marginBottom: '16px', textAlign: 'center' }}
          >
            {errors.submit}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        type="submit" 
        className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
        disabled={isSubmitting}
        whileHover={!isSubmitting ? { scale: 1.02 } : {}}
        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
      >
        <span className="btn-text">{isSubmitting ? 'TRANSMITTING...' : 'TRANSMIT'}</span>
        {!isSubmitting && (
          <motion.span 
            className="btn-icon"
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
          >
            <ArrowRight size={16} />
          </motion.span>
        )}
      </motion.button>
      
    </form>
  );
};

export default ContactForm;
