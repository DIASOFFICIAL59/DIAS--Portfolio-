import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomCursor from '../components/common/CustomCursor';
import BootSequence from '../components/hero/BootSequence';
import PortfolioNav from '../components/navigation/PortfolioNav';
import Hero from '../components/hero/Hero';
import DigitalCity from '../components/city/DigitalCity';
import AboutSection from '../components/about/AboutSection';
import DigitalCore from '../components/skills/DigitalCore';
import ContactSection from '../components/contact/ContactSection';
import Footer from '../components/common/Footer';
import ScrollToTop from '../components/navigation/ScrollToTop';

const PortfolioHome = () => {
  const [isBooting, setIsBooting] = useState(true);

  return (
    <>
      <CustomCursor />
      
      <AnimatePresence>
        {isBooting ? (
          <BootSequence key="boot" onComplete={() => setIsBooting(false)} />
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <PortfolioNav />
            <Hero />
            <DigitalCity />
            <AboutSection />
            <DigitalCore />
            <ContactSection />
            <Footer />
            <ScrollToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PortfolioHome;
