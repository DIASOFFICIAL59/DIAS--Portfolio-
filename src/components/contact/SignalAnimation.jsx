import React from 'react';
import { motion } from 'framer-motion';

const SignalAnimation = ({ isTransmitting, isSuccess }) => {
  return (
    <div className="signal-animation-container">
      <div className="signal-node-center">
        <motion.div
          className={`signal-core ${isTransmitting ? 'transmitting' : ''} ${isSuccess ? 'success' : ''}`}
          animate={{
            scale: isTransmitting ? [1, 1.2, 1] : isSuccess ? 1.5 : [1, 1.05, 1],
            backgroundColor: isSuccess ? 'rgba(16, 185, 129, 0.2)' : 'rgba(168, 85, 247, 0.2)',
            borderColor: isSuccess ? 'rgba(16, 185, 129, 0.5)' : 'rgba(168, 85, 247, 0.5)',
          }}
          transition={{
            duration: isTransmitting ? 0.5 : 2,
            repeat: isTransmitting ? Infinity : Infinity,
            repeatType: 'loop'
          }}
        />
        
        {/* Continuous idle ripples */}
        {!isSuccess && (
          <>
            <motion.div 
              className="signal-ripple"
              animate={{ scale: [1, 3], opacity: [0.5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.div 
              className="signal-ripple"
              animate={{ scale: [1, 3], opacity: [0.5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: 1.5 }}
            />
          </>
        )}

        {/* Transmitting active ripples */}
        {isTransmitting && (
          <>
            <motion.div 
              className="signal-ripple active"
              animate={{ scale: [1, 4], opacity: [0.8, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.div 
              className="signal-ripple active"
              animate={{ scale: [1, 4], opacity: [0.8, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
            />
          </>
        )}
        
        {/* Success pulse */}
        {isSuccess && (
          <motion.div 
            className="signal-ripple success"
            animate={{ scale: [1, 5], opacity: [0.6, 0] }}
            transition={{ duration: 2, ease: 'easeOut' }}
          />
        )}
      </div>

      <svg className="signal-connections" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
        <motion.path
          d="M100 100 L 20 20"
          stroke={isSuccess ? "rgba(16, 185, 129, 0.3)" : "rgba(168, 85, 247, 0.2)"}
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        />
        <motion.path
          d="M100 100 L 180 30"
          stroke={isSuccess ? "rgba(16, 185, 129, 0.3)" : "rgba(168, 85, 247, 0.2)"}
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
        <motion.path
          d="M100 100 L 40 180"
          stroke={isSuccess ? "rgba(16, 185, 129, 0.3)" : "rgba(168, 85, 247, 0.2)"}
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.4 }}
        />
      </svg>
    </div>
  );
};

export default SignalAnimation;
