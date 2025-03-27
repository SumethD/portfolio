// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FuzzyText from './formats/FuzzyText';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import ParticleBackground from './components/ParticleBackground';
import PageTransition from './components/PageTransition';
import DecryptedText from './formats/decrypted';

const App = () => {
  const [activeSection, setActiveSection] = useState('welcome');
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // For the mobile hamburger menu
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSectionChange = useCallback((section) => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    setIsTransitioning(true);
    setMenuOpen(false); // Close the menu when changing sections
    
    // Delay the section change to allow menu closing animation to complete
    setTimeout(() => {
      setActiveSection(section);
      scrollToTop();
      // Delay the transition completion to match the page transition
      setTimeout(() => {
        setIsTransitioning(false);
      }, 400);
    }, 300);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setContentVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-4xl text-white animate-pulse">LOADING...</div>
      </div>
    );
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'about':
        return (
          <PageTransition isVisible={activeSection === 'about'}>
            <About />
          </PageTransition>
        );
      case 'projects':
        return (
          <PageTransition isVisible={activeSection === 'projects'}>
            <Projects />
          </PageTransition>
        );
      case 'experience':
        return (
          <PageTransition isVisible={activeSection === 'experience'}>
            <Experience />
          </PageTransition>
        );
      case 'contact':
        return (
          <PageTransition isVisible={activeSection === 'contact'}>
            <Contact />
          </PageTransition>
        );
      default:
        return (
          <PageTransition isVisible={activeSection === 'welcome'}>
            <main
              className={`h-screen flex flex-col items-center justify-center relative transition-opacity duration-500 ${
                contentVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Solar Eclipse Circle Effect */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1]">
                {/* Dark eclipse center */}
                <div className="w-[80vw] h-[80vw] sm:w-[42vw] sm:h-[42vw] max-w-[520px] max-h-[520px] rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/90 -z-10"></div>
                
                {/* Enhanced pulsing glow ring */}
                <div className="w-[85vw] h-[85vw] sm:w-[45vw] sm:h-[45vw] max-w-[550px] max-h-[550px] rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent border-2 border-orange-500/60 shadow-[0_0_60px_rgba(249,115,22,0.3)] animate-[pulse_3s_infinite] -z-10"></div>
              </div>

              {/* Central Content */}
              <div className="text-center max-w-6xl mx-auto px-4 sm:px-8 relative z-[3] flex flex-col items-center">
                {/* Name Heading */}
                <h1 className="text-4xl sm:text-6xl tracking-[0.1em] opacity-80 font-light flex items-center justify-center flex-wrap gap-2 mb-16 sm:mb-24">
                  <span>MY NAME IS</span>
                  <FuzzyText
                    fontSize="4rem"
                    baseIntensity={0.2}
                    hoverIntensity={0.5}
                    enableHover={true}
                  >
                    SUMETH
                  </FuzzyText>
                </h1>
                
                {/* Enhanced Portfolio Access Button */}
                <div className="mt-4 flex flex-col items-center space-y-8">
                  <motion.a
                    href="/about"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSectionChange('about');
                    }}
                    className="relative overflow-hidden group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-10 py-4 border border-orange-500/30 backdrop-blur-sm bg-black/20 hover:bg-black/40 transition-all duration-300 group-hover:border-orange-500/70 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                      <DecryptedText
                        text="ACCESS PORTFOLIO"
                        speed={70}
                        maxIterations={10}
                        sequential={true}
                        revealDirection="center"
                        className="tracking-[0.4em] text-base sm:text-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                    <motion.div 
                      className="absolute bottom-0 left-0 h-[1px] w-0 bg-orange-500/70"
                      animate={{ width: "0%" }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.a>
                  <div className="flex justify-center">
                    <i className="fas fa-chevron-down animate-bounce opacity-50 text-lg sm:text-xl"></i>
                  </div>
                </div>
              </div>
            </main>
          </PageTransition>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Persistent Particle Background */}
      <div className="fixed inset-0 z-[1]">
        <ParticleBackground />
      </div>
      
      {/* Content with transitions */}
      <AnimatePresence mode="wait">
        <div className="relative z-[10]">{renderSection()}</div>
      </AnimatePresence>

      {/* MOBILE NAV (Hamburger) - Visible below 1600px */}
      <div className="fixed top-4 left-4 z-50 2xl:hidden">
        <motion.button
          className="text-gray-400 hover:text-white transition-colors p-2 border border-gray-700 bg-black bg-opacity-50 backdrop-blur-sm hover:border-gray-500"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open mobile menu"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Simple Hamburger Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </motion.button>
      </div>

      {/* MOBILE NAV OVERLAY - With Animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="fixed inset-0 bg-black z-50 2xl:hidden flex flex-col p-8"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { duration: 0.4, ease: "easeInOut" }
            }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.3, ease: "easeInOut" }
            }}
          >
            {/* Backdrop blur effect */}
            <motion.div 
              className="absolute inset-0 backdrop-blur-md bg-opacity-80 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            
            <div className="relative z-10 flex flex-col h-full">
              <motion.button
                className="self-end text-gray-400 hover:text-white transition-colors mb-8 border border-gray-700 bg-black bg-opacity-50 p-2 hover:border-gray-500"
                onClick={() => {
                  setMenuOpen(false);
                }}
                aria-label="Close mobile menu"
                whileHover={{ scale: 1.05, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {/* Close Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
              
              <div className="flex-1 flex flex-col justify-center items-center">
                <motion.ul 
                  className="flex flex-col space-y-6 text-center" 
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { 
                      transition: { 
                        staggerChildren: 0.1,
                        delayChildren: 0.2
                      } 
                    }
                  }}
                >
                  {['WELCOME', 'ABOUT', 'PROJECTS', 'EXPERIENCE', 'CONTACT'].map((item) => {
                    const itemKey = item.toLowerCase();
                    return (
                      <motion.li
                        key={item}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                        }}
                        className={`cursor-pointer relative text-xl tracking-widest ${
                          activeSection === itemKey ? 'text-white' : 'text-gray-500'
                        }`}
                        onClick={() => {
                          // First animate the menu closing
                          setMenuOpen(false);
                          // Then handle the section change after a delay
                          setTimeout(() => {
                            handleSectionChange(itemKey);
                          }, 300); // Increased delay to match menu closing animation
                        }}
                        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                      >
                        <span className="relative group">
                          {item}
                          <motion.div 
                            className={`absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full ${
                              activeSection === itemKey ? 'w-full' : 'w-0'
                            }`}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                          />
                        </span>
                        {activeSection === itemKey && (
                          <motion.div 
                            className="absolute -left-6 top-1/2 w-2 h-2 bg-orange-500 rounded-full -translate-y-1/2"
                            layoutId="navIndicator"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                      </motion.li>
                    );
                  })}
                </motion.ul>
                
                {/* Footer section for mobile nav */}
                <motion.div 
                  className="mt-16 text-xs text-gray-500 flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  <div className="mr-2 w-1 h-1 bg-orange-500 rounded-full animate-pulse"></div>
                  <span>CONNECTED {activeSection.toUpperCase()}</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESKTOP NAV - Visible only at 1600px and above */}
      <nav className="hidden 2xl:block fixed top-0 left-0 p-8 z-50 w-[400px]">
        <div className="border border-gray-800 bg-black bg-opacity-50 backdrop-blur-sm p-4">
          <div className="flex items-center justify-between mb-6">
            <button
              className="text-xs tracking-wider cursor-pointer hover:text-white transition-colors"
              onClick={() => {
                setMenuOpen(false);
                handleSectionChange('welcome');
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleSectionChange('welcome')}
              tabIndex={0}
            >
              WELCOME
            </button>
            <div className="flex items-center">
              <span className="text-orange-500 text-xs mr-2">
                CONNECTED {activeSection.toUpperCase()}
              </span>
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <ul className="space-y-4">
            {['ABOUT', 'PROJECTS', 'EXPERIENCE', 'CONTACT'].map((item) => {
              const itemKey = item.toLowerCase();
              return (
                <button
                  key={item}
                  className={`cursor-pointer group w-full text-left ${
                    isTransitioning ? 'pointer-events-none' : ''
                  }`}
                  onClick={() => {
                    setMenuOpen(false);
                    handleSectionChange(itemKey);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setMenuOpen(false);
                      handleSectionChange(itemKey);
                    }
                  }}
                  tabIndex={0}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs tracking-wider ${
                        activeSection === itemKey
                          ? 'text-white animate-pulse'
                          : 'text-gray-500'
                      }`}
                    >
                      {item}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] text-gray-600">IP 123.21.2</span>
                      <span className="text-[10px] text-gray-600">3.1</span>
                      <div className="w-1 h-3 bg-gray-800"></div>
                    </div>
                  </div>
                </button>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Corner Decorations */}
      <div className="fixed bottom-12 left-12 opacity-50 z-[1]">
        <div className="w-16 h-16 sm:w-20 sm:h-20 border-l border-b border-gray-800"></div>
      </div>
      <div className="fixed bottom-12 right-12 opacity-50 z-[1]">
        <div className="w-16 h-16 sm:w-20 sm:h-20 border-r border-b border-gray-800"></div>
      </div>
      <div className="fixed top-12 left-12 opacity-50 z-[1]">
        <div className="w-16 h-16 sm:w-20 sm:h-20 border-l border-t border-gray-800"></div>
      </div>
      <div className="fixed top-12 right-12 opacity-50 z-[1]">
        <div className="w-16 h-16 sm:w-20 sm:h-20 border-r border-t border-gray-800"></div>
      </div>
    </div>
  );
};

export default App;
