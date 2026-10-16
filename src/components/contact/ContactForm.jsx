import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
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
    if (isSubmitting) return; // Prevent duplicate submissions while in progress

    setErrors({ ...errors, submit: '' });
    
    if (validate()) {
      setIsSubmitting(true);
      onTransmitStart();
      
      try {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_zontezl';
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '1sbjiq7';
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!publicKey) {
          const configError = new Error('EmailJS Public Key is not configured. Please set VITE_EMAILJS_PUBLIC_KEY in your environment variables or .env file.');
          console.error('EmailJS Config Error:', configError);
          throw configError;
        }

        const templateParams = {
          // Visitor Name mappings (matches standard EmailJS templates)
          from_name: formData.name.trim(),
          name: formData.name.trim(),
          visitor_name: formData.name.trim(),
          user_name: formData.name.trim(),

          // Visitor Email mappings (matches standard EmailJS templates and reply-to)
          from_email: formData.email.trim(),
          email: formData.email.trim(),
          visitor_email: formData.email.trim(),
          user_email: formData.email.trim(),
          reply_to: formData.email.trim(),

          // Message mapping
          message: formData.message.trim(),

          // Title / Subject mappings
          title: `Portfolio Contact from ${formData.name.trim()}`,
          subject: `Portfolio Contact from ${formData.name.trim()}`,

          // Recipient mappings
          to_name: 'Dias',
          to_email: 'dondiasdondias@gmail.com',
          recipient: 'dondiasdondias@gmail.com',
          recipient_email: 'dondiasdondias@gmail.com',
        };

        const response = await emailjs.send(
          serviceId,
          templateId,
          templateParams,
          publicKey
        );

        if (response && (response.status === 200 || response.text === 'OK')) {
          setIsSubmitting(false);
          setIsSuccess(true);
          onTransmitSuccess();
          setFormData({ name: '', email: '', message: '' });
        } else {
          throw new Error(response?.text || 'Failed to transmit message via EmailJS.');
        }
      } catch (error) {
        console.error('EmailJS transmission error:', error);
        setIsSubmitting(false);
        const errorMessage = error?.text || error?.message || (typeof error === 'string' ? error : 'An error occurred during transmission. Please try again.');
        setErrors({ submit: errorMessage });
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
