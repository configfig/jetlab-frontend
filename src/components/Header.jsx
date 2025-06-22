// ContactForm.jsx

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Detect scroll to change header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsServicesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
  }, [location.pathname]);

  const scrollToSection = (sectionId) => {
    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navigateToPage = (path) => {
    navigate(path);
    setIsServicesDropdownOpen(false);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const navItems = [
    { id: 'hero', label: 'Home', icon: 'bi-house', action: () => scrollToSection('hero') },
    { id: 'about', label: 'About', icon: 'bi-info-circle', action: () => scrollToSection('about') },
    { 
      id: 'services', 
      label: 'Services', 
      icon: 'bi-gear', 
      hasDropdown: true,
      dropdown: [
        { 
          label: 'Web Development', 
          path: '/services/web-development',
          icon: 'bi-code-slash',
          description: 'Custom websites & applications'
        },
        { 
          label: 'Digital Marketing', 
          path: '/services/digital-marketing',
          icon: 'bi-graph-up-arrow',
          description: 'Growth-driven marketing'
        },
        { 
          label: 'AI Integration', 
          path: '/services/ai-integration',
          icon: 'bi-robot',
          description: 'Intelligent automation'
        },
        { 
          label: 'SEO Optimization', 
          path: '/services/seo-optimization',
          icon: 'bi-search',
          description: 'Top search rankings'
        }
      ]
    },
    { id: 'contact', label: 'Contact', icon: 'bi-envelope', action: () => scrollToSection('contact') }
  ];

  const serviceItems = navItems.find(item => item.id === 'services')?.dropdown || [];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-dark shadow-dark' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigateToPage('/')}
          >
            <div className="w-12 h-12 bg-light rounded-xl flex items-center justify-center">
              <i className="bi bi-lightning-charge text-dark text-xl"></i>
            </div>
            <div>
              <h1 className="text-2xl chakra-bold text-light">JetLab</h1>
              <p className="text-xs text-muted chakra-light">Digital Agency</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div key={item.id} className="relative" ref={item.hasDropdown ? dropdownRef : null}>
                {item.hasDropdown ? (
                  // Services Dropdown
                  <div className="relative">
                    <motion.button
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                      className="flex items-center space-x-2 text-light hover:text-light/80 transition-colors duration-300 chakra-medium outline-none focus:outline-none"
                    >
                      <i className={`${item.icon} text-lg`}></i>
                      <span>{item.label}</span>
                      <motion.i 
                        className="bi bi-chevron-down text-sm"
                        animate={{ rotate: isServicesDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      ></motion.i>
                    </motion.button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isServicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-80 glass-dark rounded-2xl border border-border/50 shadow-dark overflow-hidden"
                        >
                          <div className="p-4">
                            <div className="space-y-2">
                              {serviceItems.map((service, idx) => (
                                <motion.button
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  onClick={() => navigateToPage(service.path)}
                                  className="w-full p-4 rounded-xl hover:bg-light/10 transition-all duration-300 text-left group outline-none focus:outline-none"
                                >
                                  <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-dark-600 rounded-lg flex items-center justify-center group-hover:bg-light group-hover:text-dark transition-all duration-300">
                                      <i className={`${service.icon} text-lg`}></i>
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="chakra-semibold text-light group-hover:text-light/90">
                                        {service.label}
                                      </h4>
                                      <p className="text-sm text-muted group-hover:text-light/70">
                                        {service.description}
                                      </p>
                                    </div>
                                    <i className="bi bi-arrow-right text-muted group-hover:text-light/70 transition-all duration-300"></i>
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                            
                            <div className="mt-4 pt-4 border-t border-border/50">
                              <button
                                onClick={() => scrollToSection('services')}
                                className="w-full p-3 text-center bg-light/10 hover:bg-light/20 rounded-lg transition-all duration-300 outline-none focus:outline-none"
                              >
                                <span className="chakra-medium text-light">View All Services</span>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  // Regular Navigation Items
                  <motion.button
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={item.action}
                    className="flex items-center space-x-2 text-light hover:text-light/80 transition-colors duration-300 chakra-medium outline-none focus:outline-none"
                  >
                    <i className={`${item.icon} text-lg`}></i>
                    <span>{item.label}</span>
                  </motion.button>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => scrollToSection('contact')}
            className="hidden md:block btn-primary outline-none focus:outline-none"
          >
            Get Started
          </motion.button>

          {/* Mobile Sidebar Button */}
          <button
            className="md:hidden text-2xl text-light hover:text-light/80 transition-colors duration-300 touch-target outline-none focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <i className={`bi ${isMobileMenuOpen ? 'bi-x' : 'bi-list'}`}></i>
          </button>
        </div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              {/* Sidebar */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-dark-700 border-l border-border z-50 md:hidden overflow-y-auto"
              >
                <div className="p-6">
                  {/* Sidebar Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-light rounded-lg flex items-center justify-center">
                        <i className="bi bi-lightning-charge text-dark text-lg"></i>
                      </div>
                      <div>
                        <h3 className="text-lg chakra-bold text-light">JetLab</h3>
                        <p className="text-xs text-muted chakra-light">Digital Agency</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-10 h-10 rounded-lg bg-dark-600 hover:bg-dark-500 transition-colors duration-200 flex items-center justify-center text-light touch-target outline-none focus:outline-none"
                      aria-label="Close sidebar"
                    >
                      <i className="bi bi-x text-xl"></i>
                    </button>
                  </div>

                  {/* Navigation Items */}
                  <div className="space-y-2">
                    {navItems.map((item) => (
                      <div key={item.id}>
                        {item.hasDropdown ? (
                          <div className="space-y-3">
                            {/* Services Header */}
                            <div className="flex items-center space-x-3 p-4 rounded-lg bg-dark-600">
                              <i className={`${item.icon} text-light text-lg`}></i>
                              <span className="chakra-medium text-light">{item.label}</span>
                            </div>
                            
                            {/* Services Submenu */}
                            <div className="ml-4 space-y-2">
                              {serviceItems.map((service, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => navigateToPage(service.path)}
                                  className="w-full flex items-center space-x-3 p-3 rounded-lg text-left text-light/80 hover:text-light hover:bg-dark-600 transition-all duration-300 touch-target outline-none focus:outline-none"
                                >
                                  <i className={`${service.icon} text-lg`}></i>
                                  <div className="flex-1">
                                    <span className="block chakra-medium">{service.label}</span>
                                    <span className="text-xs text-muted">{service.description}</span>
                                  </div>
                                  <i className="bi bi-arrow-right text-muted"></i>
                                </button>
                              ))}
                              
                              {/* View All Services */}
                              <button
                                onClick={() => scrollToSection('services')}
                                className="w-full p-3 mt-2 text-center bg-light/10 hover:bg-light/20 rounded-lg transition-all duration-300 touch-target outline-none focus:outline-none"
                              >
                                <span className="chakra-medium text-light">View All Services</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={item.action}
                            className="w-full flex items-center space-x-3 p-4 rounded-lg text-left text-light hover:text-light/80 hover:bg-dark-600 transition-all duration-300 touch-target outline-none focus:outline-none"
                          >
                            <i className={`${item.icon} text-lg`}></i>
                            <span className="chakra-medium">{item.label}</span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <div className="mt-8">
                    <button
                      onClick={() => scrollToSection('contact')}
                      className="w-full btn-primary touch-target outline-none focus:outline-none"
                    >
                      Get Started
                    </button>
                  </div>

                  {/* Contact Info */}
                  <div className="mt-8 p-4 bg-dark-600 rounded-lg">
                    <h4 className="chakra-semibold text-light mb-3">Contact Info</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <i className="bi bi-geo-alt text-light/60"></i>
                        <span className="text-sm text-muted">Chicago, IL</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <i className="bi bi-envelope text-light/60"></i>
                        <a 
                          href="mailto:info@jetlabco.com" 
                          className="text-sm text-muted hover:text-light transition-colors outline-none focus:outline-none"
                        >
                          info@jetlabco.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;