// src/components/Header.jsx - ИСПРАВЛЕНО

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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId) => {
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
      {/* Header - ПРАВИЛЬНО ЗАКРЕПЛЕННЫЙ */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          width: '100%',
          transition: 'all 0.3s ease',
          backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.95)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled ? '1px solid #333333' : 'none'
        }}
      >
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '80px'
          }}>
            {/* Logo */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                cursor: 'pointer',
                zIndex: 1001
              }}
              onClick={() => navigateToPage('/')}
            >
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <i className="bi bi-lightning-charge" style={{ color: '#000000', fontSize: '24px' }}></i>
              </div>
              <div>
                <h1 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#ffffff',
                  fontFamily: '"Chakra Petch", sans-serif',
                  margin: 0,
                  lineHeight: '1.2'
                }}>JetLab</h1>
                <p style={{
                  fontSize: '12px',
                  color: '#888888',
                  fontFamily: '"Chakra Petch", sans-serif',
                  margin: 0
                }}>Digital Agency</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav style={{
              display: 'none',
              alignItems: 'center',
              gap: '2rem'
            }} className="md:flex">
              {navItems.map((item) => (
                <div key={item.id} style={{ position: 'relative' }} ref={item.hasDropdown ? dropdownRef : null}>
                  {item.hasDropdown ? (
                    <div style={{ position: 'relative' }}>
                      <button
                        onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          color: '#ffffff',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0.75rem 1rem',
                          borderRadius: '0.5rem',
                          transition: 'all 0.3s ease',
                          fontFamily: '"Chakra Petch", sans-serif',
                          fontWeight: '500'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                        }}
                      >
                        <i className={`${item.icon}`} style={{ fontSize: '18px' }}></i>
                        <span>{item.label}</span>
                        <i 
                          className="bi bi-chevron-down" 
                          style={{ 
                            fontSize: '14px',
                            transform: isServicesDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease'
                          }}
                        ></i>
                      </button>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {isServicesDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            style={{
                              position: 'absolute',
                              top: '100%',
                              right: 0,
                              marginTop: '0.5rem',
                              width: '20rem',
                              backgroundColor: '#1a1a1a',
                              border: '1px solid #333333',
                              borderRadius: '12px',
                              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                              overflow: 'hidden',
                              zIndex: 1100
                            }}
                          >
                            <div style={{ padding: '1rem' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {serviceItems.map((service, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => navigateToPage(service.path)}
                                    style={{
                                      width: '100%',
                                      padding: '1rem',
                                      borderRadius: '12px',
                                      background: 'none',
                                      border: 'none',
                                      textAlign: 'left',
                                      cursor: 'pointer',
                                      transition: 'all 0.3s ease',
                                      color: '#ffffff'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.style.backgroundColor = 'transparent';
                                    }}
                                  >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                      <div style={{
                                        width: '48px',
                                        height: '48px',
                                        backgroundColor: '#2a2a2a',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                      }}>
                                        <i className={`${service.icon}`} style={{ fontSize: '18px' }}></i>
                                      </div>
                                      <div style={{ flex: 1 }}>
                                        <h4 style={{
                                          fontWeight: '600',
                                          color: '#ffffff',
                                          margin: 0,
                                          marginBottom: '0.25rem',
                                          fontFamily: '"Chakra Petch", sans-serif'
                                        }}>
                                          {service.label}
                                        </h4>
                                        <p style={{
                                          fontSize: '14px',
                                          color: '#888888',
                                          margin: 0,
                                          fontFamily: '"Chakra Petch", sans-serif'
                                        }}>
                                          {service.description}
                                        </p>
                                      </div>
                                      <i className="bi bi-arrow-right" style={{ fontSize: '14px', color: '#888888' }}></i>
                                    </div>
                                  </button>
                                ))}
                              </div>
                              
                              <div style={{
                                marginTop: '1rem',
                                paddingTop: '1rem',
                                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                              }}>
                                <button
                                  onClick={() => scrollToSection('services')}
                                  style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    textAlign: 'center',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    color: '#ffffff',
                                    fontFamily: '"Chakra Petch", sans-serif',
                                    fontWeight: '500'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                  }}
                                >
                                  View All Services
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <button
                      onClick={item.action}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#ffffff',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        transition: 'all 0.3s ease',
                        fontFamily: '"Chakra Petch", sans-serif',
                        fontWeight: '500'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                      }}
                    >
                      <i className={`${item.icon}`} style={{ fontSize: '18px' }}></i>
                      <span>{item.label}</span>
                    </button>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Button & Mobile Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                onClick={() => scrollToSection('contact')}
                style={{
                  display: 'none',
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontFamily: '"Chakra Petch", sans-serif',
                  transition: 'all 0.3s ease'
                }}
                className="md:block"
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#ffffff';
                  e.target.style.transform = 'translateY(0px)';
                }}
              >
                Get Started
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  color: '#ffffff',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  zIndex: 1001,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                <i 
                  className={`bi ${isMobileMenuOpen ? 'bi-x' : 'bi-list'}`} 
                  style={{ 
                    fontSize: '24px',
                    transform: isMobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                  }}
                ></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar - УПРОЩЕННЫЙ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                zIndex: 999
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                maxWidth: '24rem',
                backgroundColor: '#1a1a1a',
                border: '1px solid #333333',
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              {/* Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.5rem',
                borderBottom: '1px solid #333333'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <i className="bi bi-lightning-charge" style={{ color: '#000000', fontSize: '18px' }}></i>
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#ffffff',
                      margin: 0,
                      fontFamily: '"Chakra Petch", sans-serif'
                    }}>JetLab</h3>
                    <p style={{
                      fontSize: '12px',
                      color: '#888888',
                      margin: 0,
                      fontFamily: '"Chakra Petch", sans-serif'
                    }}>Digital Agency</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: '#2a2a2a',
                    color: '#ffffff',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <i className="bi bi-x" style={{ fontSize: '20px' }}></i>
                </button>
              </div>

              {/* Content */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {navItems.map((item) => (
                  <div key={item.id}>
                    {item.hasDropdown ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          padding: '1rem',
                          backgroundColor: '#2a2a2a',
                          borderRadius: '12px'
                        }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: '#ffffff',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <i className={`${item.icon}`} style={{ color: '#000000', fontSize: '18px' }}></i>
                          </div>
                          <div>
                            <span style={{
                              fontWeight: '600',
                              color: '#ffffff',
                              fontFamily: '"Chakra Petch", sans-serif'
                            }}>{item.label}</span>
                            <p style={{
                              fontSize: '12px',
                              color: '#888888',
                              margin: 0,
                              fontFamily: '"Chakra Petch", sans-serif'
                            }}>Our digital solutions</p>
                          </div>
                        </div>
                        
                        {serviceItems.map((service, idx) => (
                          <button
                            key={idx}
                            onClick={() => navigateToPage(service.path)}
                            style={{
                              width: '100%',
                              padding: '1rem',
                              backgroundColor: 'rgba(42, 42, 42, 0.5)',
                              border: '1px solid transparent',
                              borderRadius: '12px',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              textAlign: 'left'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#3a3a3a';
                              e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'rgba(42, 42, 42, 0.5)';
                              e.target.style.borderColor = 'transparent';
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                              <div style={{
                                width: '40px',
                                height: '40px',
                                backgroundColor: '#3a3a3a',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                <i className={`${service.icon}`} style={{ color: '#ffffff', fontSize: '18px' }}></i>
                              </div>
                              <div style={{ flex: 1 }}>
                                <h4 style={{
                                  fontWeight: '600',
                                  color: '#ffffff',
                                  margin: 0,
                                  marginBottom: '0.25rem',
                                  fontFamily: '"Chakra Petch", sans-serif',
                                  fontSize: '14px'
                                }}>{service.label}</h4>
                                <p style={{
                                  fontSize: '12px',
                                  color: '#888888',
                                  margin: 0,
                                  fontFamily: '"Chakra Petch", sans-serif'
                                }}>{service.description}</p>
                              </div>
                              <i className="bi bi-arrow-right" style={{ color: '#888888' }}></i>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <button
                        onClick={item.action}
                        style={{
                          width: '100%',
                          padding: '1rem',
                          backgroundColor: 'rgba(42, 42, 42, 0.3)',
                          border: '1px solid transparent',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          textAlign: 'left'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#3a3a3a';
                          e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'rgba(42, 42, 42, 0.3)';
                          e.target.style.borderColor = 'transparent';
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: '#3a3a3a',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <i className={`${item.icon}`} style={{ color: '#ffffff', fontSize: '18px' }}></i>
                          </div>
                          <span style={{
                            fontWeight: '600',
                            color: '#ffffff',
                            flex: 1,
                            fontFamily: '"Chakra Petch", sans-serif'
                          }}>{item.label}</span>
                          <i className="bi bi-arrow-right" style={{ color: '#888888' }}></i>
                        </div>
                      </button>
                    )}
                  </div>
                ))}
                
                {/* CTA Button */}
                <div style={{ marginTop: '2rem' }}>
                  <button
                    onClick={() => scrollToSection('contact')}
                    style={{
                      width: '100%',
                      backgroundColor: '#ffffff',
                      color: '#000000',
                      padding: '1rem',
                      borderRadius: '12px',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontFamily: '"Chakra Petch", sans-serif',
                      fontSize: '18px'
                    }}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence> 
    </>
  );
};

export default Header;