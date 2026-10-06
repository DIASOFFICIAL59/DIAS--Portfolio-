import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "../../styles/boot.css";

const sequence = [
  "INITIALIZING DIGITAL WORLD...",
  "ESTABLISHING SECURE CONNECTION...",
  "SYSTEM ONLINE",
  "WELCOME"
];

const BootSequence = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step < sequence.length) {
      const timer = setTimeout(() => {
        setStep(prev => prev + 1);
      }, step === sequence.length - 1 ? 1200 : 800);
      return () => clearTimeout(timer);
    } else {
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(completeTimer);
    }
  }, [step, onComplete]);

  return (
    <motion.div 
      className="boot-container"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}
    >
      <div className="boot-content">
        <AnimatePresence mode="wait">
          {step < sequence.length && (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className={`boot-text ${step >= sequence.length - 2 ? 'boot-highlight' : ''}`}
            >
              {sequence[step]}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default BootSequence;
