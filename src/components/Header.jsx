// src/components/Header.jsx

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
    
    // Set initial state
    setIsScrolled(window.scrollY > 50);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
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

  // Prevent body scroll when mobile menu is open - FIXED
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Fix body
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      // Add class for additional styles
      document.body.classList.add('modal-open');
      document.documentElement.classList.add('modal-open');
    } else {
      // Restore scroll
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      
      // Remove classes
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('modal-open');
      
      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      // Cleanup on unmount
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('modal-open');
    };
  }, [isMobileMenuOpen]);

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
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`header-fixed ${
          isScrolled 
            ? 'header-scrolled' 
            : 'header-transparent'
        }`}
      >
        <div className="container-mobile">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 cursor-pointer z-50 relative"
              onClick={() => navigateToPage('/')}
            >
              <div className="w-12 h-12 bg-light rounded-xl flex items-center justify-center">
                <i className="bi bi-lightning-charge text-dark text-xl"></i>
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl chakra-bold text-light">JetLab</h1>
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
                        className="nav-button"
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
                            className="dropdown-menu"
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
                                    className="dropdown-item"
                                  >
                                    <div className="flex items-center space-x-4">
                                      <div className="dropdown-item-icon">
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
                                  className="dropdown-all-services-btn"
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
                      className="nav-button"
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
              className="hidden md:block btn-primary"
            >
              Get Started
            </motion.button>

            {/* Mobile Sidebar Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <motion.i 
                className={`bi ${isMobileMenuOpen ? 'bi-x' : 'bi-list'}`}
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              ></motion.i>
            </button>
          </div>
        </div>
      </motion.header>

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
              className="mobile-sidebar-backdrop"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="mobile-sidebar"
            >
              {/* Fixed Header */}
              <div className="mobile-sidebar-header">
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
                  className="mobile-sidebar-close-btn"
                  aria-label="Close sidebar"
                >
                  <i className="bi bi-x text-xl"></i>
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="mobile-sidebar-content">
                {/* Navigation Items */}
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <div key={item.id}>
                      {item.hasDropdown ? (
                        <div className="space-y-2">
                          {/* Services Header */}
                          <div className="mobile-nav-service-header">
                            <div className="w-9 h-9 bg-light rounded-lg flex items-center justify-center">
                              <i className={`${item.icon} text-dark text-base`}></i>
                            </div>
                            <div>
                              <span className="chakra-semibold text-light text-sm">{item.label}</span>
                              <p className="text-xs text-muted">Our digital solutions</p>
                            </div>
                          </div>
                          
                          {/* Services Submenu */}
                          <div className="space-y-1 pl-2">
                            {serviceItems.map((service, idx) => (
                              <motion.button
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={() => navigateToPage(service.path)}
                                className="mobile-nav-service-item"
                              >
                                <div className="mobile-nav-service-item-content">
                                  <div className="mobile-nav-service-item-icon">
                                    <i className={`${service.icon} text-base text-light group-hover:text-dark`}></i>
                                  </div>
                                  <div className="flex-1 text-left">
                                    <h4 className="chakra-semibold text-light group-hover:text-light text-sm">{service.label}</h4>
                                    <p className="text-xs text-muted group-hover:text-light/80 leading-relaxed">{service.description}</p>
                                  </div>
                                  <i className="bi bi-arrow-right text-muted group-hover:text-light transition-all duration-300 text-sm"></i>
                                </div>
                              </motion.button>
                            ))}
                            
                            {/* View All Services */}
                            <button
                              onClick={() => scrollToSection('services')}
                              className="mobile-nav-all-services-btn"
                            >
                              <span className="chakra-semibold text-light text-sm">View All Services</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={item.action}
                          className="mobile-nav-item"
                        >
                          <div className="mobile-nav-item-content">
                            <div className="mobile-nav-item-icon">
                              <i className={`${item.icon} text-base text-light group-hover:text-dark`}></i>
                            </div>
                            <span className="chakra-semibold text-light group-hover:text-light flex-1 text-left text-sm">{item.label}</span>
                            <i className="bi bi-arrow-right text-muted group-hover:text-light transition-all duration-300 text-sm"></i>
                          </div>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* CTA Button */}
                <div className="mt-6">
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="w-full btn-primary text-center py-3 text-base chakra-semibold"
                  >
                    Get Started
                  </button>
                </div>

                {/* Contact Info */}
                <div className="mobile-sidebar-contact">
                  <h4 className="chakra-semibold text-light mb-3 text-center text-sm">Contact Info</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 bg-light/10 rounded-lg flex items-center justify-center">
                        <i className="bi bi-geo-alt text-light/80 text-sm"></i>
                      </div>
                      <span className="text-xs text-muted">Chicago, Illinois, USA</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 bg-light/10 rounded-lg flex items-center justify-center">
                        <i className="bi bi-envelope text-light/80 text-sm"></i>
                      </div>
                      <a 
                        href="mailto:info@jetlabco.com" 
                        className="text-xs text-muted hover:text-light transition-colors"
                      >
                        info@jetlabco.com
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 bg-light/10 rounded-lg flex items-center justify-center">
                        <i className="bi bi-clock text-light/80 text-sm"></i>
                      </div>
                      <span className="text-xs text-muted">Mon - Fri: 9AM - 6PM</span>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mobile-sidebar-social">
                  <h5 className="chakra-medium text-light mb-3 text-sm">Follow Us</h5>
                  <div className="flex justify-center space-x-3">
                    {[
                      { icon: 'bi-linkedin', href: '#', label: 'LinkedIn' },
                      { icon: 'bi-twitter', href: '#', label: 'Twitter' },
                      { icon: 'bi-facebook', href: '#', label: 'Facebook' },
                      { icon: 'bi-instagram', href: '#', label: 'Instagram' }
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 bg-dark-600 rounded-lg flex items-center justify-center hover:bg-light hover:text-dark transition-all duration-300 text-light"
                        aria-label={social.label}
                      >
                        <i className={`${social.icon} text-sm`}></i>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Safe area for iOS - additional padding */}
                <div className="h-4"></div>
              </div>
            </motion.div>
          </>
        )} 
      </AnimatePresence> 
    </>
  );
};

export default Header;