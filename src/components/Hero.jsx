// src/components/Hero.jsx

import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TrustPilot from './TrustPilot';
import Modal from './Modal';
import QuizModal from './QuizModal';

const Hero = () => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showServicesModal, setShowServicesModal] = useState(false);
  
  const phrases = useMemo(() => [
    'Digital Excellence',
    'Web Solutions',
    'AI Integration',
    'Marketing Growth'
  ], []);

  // Fixed typewriter effect - independent of other effects
  useEffect(() => {
    let timeoutId;
    let intervalId;
    
    const typePhrase = (phrase) => {
      let index = 0;
      
      intervalId = setInterval(() => {
        if (index <= phrase.length) {
          setText(phrase.slice(0, index));
          index++;
        } else {
          clearInterval(intervalId);
          // Wait before switching to next phrase
          timeoutId = setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % phrases.length);
          }, 2000);
        }
      }, 80); // Faster typing
    };

    typePhrase(phrases[currentIndex]);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [currentIndex, phrases]);

  // Independent floating elements with stable animation
  const floatingElements = useMemo(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    })), []
  );

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    // Close modals after scrolling
    setShowProjectModal(false);
    setShowServicesModal(false);
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    // Close modals after scrolling
    setShowProjectModal(false);
    setShowServicesModal(false);
  };

  return (
    <>
      <section id="hero" ref={ref} className="hero-section-fixed">
        {/* Independent Floating Elements Background */}
        <div className="absolute inset-0 pointer-events-none">
          {floatingElements.map((element) => (
            <motion.div
              key={element.id}
              className="absolute w-2 h-2 bg-light/20 rounded-full"
              style={{
                left: `${element.x}%`,
                top: `${element.y}%`,
              }}
              animate={{
                y: [-10, -20, -10],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: element.duration,
                delay: element.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 container-mobile hero-content-fixed">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
            
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="space-y-6 lg:space-y-8 order-1 lg:order-1"
            >
              {/* Main Heading with Fixed Typewriter Container */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="space-y-4 lg:space-y-6"
              >
                <div className="space-y-2 lg:space-y-4">
                  <h1 className="hero-main-title-fixed">
                    We Create:
                  </h1>
                  {/* Fixed width container for typewriter to prevent layout shifts */}
                  <div className="hero-typewriter-container-fixed">
                    <div className="w-full min-w-0"> {/* Prevent overflow */}
                      <span className="hero-typewriter-text-fixed">
                        {text}
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="text-light ml-1"
                        >
                          |
                        </motion.span>
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="hero-description-fixed">
                  Transform your business with cutting-edge digital solutions. We're a premier digital agency specializing in web development, AI integration, marketing automation, and SEO optimization.
                </p>
              </motion.div>

              {/* Key Features */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="hero-features-grid-fixed"
              >
                {[
                  { icon: 'bi-code-slash', text: 'Expert Development' },
                  { icon: 'bi-graph-up-arrow', text: 'Growth Marketing' },
                  { icon: 'bi-robot', text: 'AI Integration' },
                  { icon: 'bi-search', text: 'SEO Mastery' }
                ].map((feature, index) => (
                  <div key={index} className="hero-feature-item-fixed">
                    <div className="hero-feature-icon-fixed">
                      <i className={`${feature.icon} text-light text-lg lg:text-xl`}></i>
                    </div>
                    <span className="hero-feature-text-fixed">{feature.text}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="hero-cta-buttons-fixed"
              >
                <button
                  onClick={() => setShowProjectModal(true)}
                  className="btn-primary hero-btn-primary-fixed"
                >
                  <span>Start Your Project</span>
                  <i className="bi bi-arrow-right"></i>
                </button>
                
                <button
                  onClick={() => setShowServicesModal(true)}
                  className="btn-secondary hero-btn-secondary-fixed"
                >
                  <span>View Services</span>
                  <i className="bi bi-play-circle"></i>
                </button>
              </motion.div>

              {/* TrustPilot Rating */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <TrustPilot />
              </motion.div>
            </motion.div>

            {/* Right Column - Stats & Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="relative order-2 lg:order-2"
            >
              {/* Main Card with Glass Effect */}
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="card-glass p-6 lg:p-8 xl:p-12 space-y-4 lg:space-y-6"
                >
                  <div className="flex items-center space-x-3 lg:space-x-4">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-light rounded-2xl flex items-center justify-center">
                      <i className="bi bi-lightning-charge text-dark text-xl lg:text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl lg:text-2xl chakra-bold text-light">JetLab Agency</h3>
                      <p className="chakra-medium text-muted text-sm lg:text-base">Digital Excellence Partner</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 lg:space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="chakra-medium text-muted text-sm lg:text-base">Project Success Rate</span>
                      <span className="chakra-semibold text-light text-sm lg:text-base">98%</span>
                    </div>
                    <div className="w-full bg-dark-600 rounded-full h-2 lg:h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '98%' }}
                        transition={{ duration: 2, delay: 1 }}
                        className="bg-light h-2 lg:h-3 rounded-full"
                      ></motion.div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 lg:gap-4">
                    {[
                      { icon: 'bi-award', label: 'Premium Quality' },
                      { icon: 'bi-shield-check', label: 'Secure Solutions' },
                      { icon: 'bi-clock', label: 'On-Time Delivery' },
                      { icon: 'bi-headset', label: '24/7 Support' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <i className={`${item.icon} text-light text-sm lg:text-base`}></i>
                        <span className="text-xs lg:text-sm chakra-medium text-muted">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Floating Cards */}
                <motion.div
                  animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute -top-3 -right-3 lg:-top-4 lg:-right-4 w-24 h-24 lg:w-32 lg:h-32 bg-light rounded-2xl flex items-center justify-center shadow-dark"
                >
                  <i className="bi bi-graph-up text-dark text-2xl lg:text-3xl"></i>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0], rotate: [0, -3, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute -bottom-3 -left-3 lg:-bottom-4 lg:-left-4 w-20 h-20 lg:w-24 lg:h-24 bg-dark-600 rounded-xl flex items-center justify-center shadow-dark border border-border"
                >
                  <i className="bi bi-rocket text-light text-lg lg:text-xl"></i>
                </motion.div>
              </div>

              {/* Stats Grid - Better positioned */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="grid grid-cols-3 gap-3 lg:gap-4 mt-6 lg:mt-8"
              >
                {[
                  { number: '150+', label: 'Projects' },
                  { number: '50+', label: 'Clients' },
                  { number: '5+', label: 'Years' }
                ].map((stat, index) => (
                  <div key={index} className="text-center card p-3 lg:p-4">
                    <div className="text-xl lg:text-2xl xl:text-3xl chakra-bold text-light">{stat.number}</div>
                    <div className="text-xs chakra-medium text-muted">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator - Fixed positioning and improved mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 1 }}
            className="hero-scroll-indicator-fixed"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="hero-scroll-content-fixed"
              onClick={scrollToServices}
            >
              <span className="hero-scroll-text-fixed">Discover Our Services</span>
              <i className="bi bi-chevron-down text-light text-xl"></i>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Project QuizModal - Now opens quiz instead of info modal */}
      <QuizModal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        service="Complete Digital Solution"
      />

      {/* Services Modal - Improved for mobile */}
      <Modal
        isOpen={showServicesModal}
        onClose={() => setShowServicesModal(false)}
        title="Our Services"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid gap-6">
            {[
              {
                icon: 'bi-code-slash',
                title: 'Web Development',
                description: 'Custom websites and applications built with cutting-edge technologies.',
                features: ['React & Vue.js', 'Custom CMS', 'E-commerce', 'API Development']
              },
              {
                icon: 'bi-graph-up',
                title: 'Digital Marketing',
                description: 'Growth-driven marketing strategies that deliver measurable results.',
                features: ['PPC Campaigns', 'Social Media', 'Content Marketing', 'Analytics']
              },
              {
                icon: 'bi-robot',
                title: 'AI Integration',
                description: 'Intelligent automation solutions powered by artificial intelligence.',
                features: ['Machine Learning', 'Chatbots', 'Process Automation', 'Data Analysis']
              },
              {
                icon: 'bi-search',
                title: 'SEO Optimization',
                description: 'Comprehensive SEO strategies to dominate search rankings.',
                features: ['Technical SEO', 'Content Optimization', 'Link Building', 'Local SEO']
              }
            ].map((service, index) => (
              <div key={index} className="p-4 lg:p-6 bg-dark-600 rounded-lg">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-12 h-12 bg-light rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className={`${service.icon} text-dark text-xl`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg lg:text-xl chakra-semibold text-light mb-2">{service.title}</h3>
                    <p className="text-muted chakra-light mb-4 text-sm lg:text-base">{service.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <i className="bi bi-check text-light text-sm"></i>
                      <span className="text-xs lg:text-sm text-muted">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 flex flex-col sm:flex-row gap-4 pt-4 border-t border-border">
          <button onClick={scrollToServices} className="btn-primary flex-1">
            View All Services
          </button>
          <button onClick={scrollToContact} className="btn-secondary flex-1">
            Get Quote
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Hero;