// src/components/Hero.jsx - ИСПРАВЛЕНО И УПРОЩЕНО

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

  // Упрощенный typewriter effect
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
          timeoutId = setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % phrases.length);
          }, 2000);
        }
      }, 100);
    };

    typePhrase(phrases[currentIndex]);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [currentIndex, phrases]);

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setShowProjectModal(false);
    setShowServicesModal(false);
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setShowProjectModal(false);
    setShowServicesModal(false);
  };

  return (
    <>
      <section 
        id="hero" 
        ref={ref}
        style={{
          position: 'relative',
          minHeight: '100vh',
          backgroundColor: '#000000',
          paddingTop: '100px',
          paddingBottom: '40px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* Simplified Background Effect */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
          pointerEvents: 'none'
        }} />

        {/* Main Content */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          width: '100%'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
            alignItems: 'center',
            width: '100%'
          }}
          className="lg:grid-cols-2 lg:gap-16"
          >
            
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem'
              }}
            >
              {/* Main Heading */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h1 style={{
                  fontSize: 'clamp(3rem, 8vw, 5rem)',
                  lineHeight: 1.1,
                  fontWeight: '700',
                  color: '#ffffff',
                  fontFamily: '"Chakra Petch", sans-serif',
                  margin: 0
                }}>
                  We Create:
                </h1>
                
                {/* Typewriter Container - Fixed height to prevent layout shift */}
                <div style={{
                  height: 'clamp(3.5rem, 8vw, 5.5rem)',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <span style={{
                    fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
                    fontWeight: '700',
                    color: '#ffffff',
                    fontFamily: '"Chakra Petch", sans-serif',
                    whiteSpace: 'nowrap'
                  }}>
                    {text}
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      style={{ color: '#ffffff', marginLeft: '0.25rem' }}
                    >
                      |
                    </motion.span>
                  </span>
                </div>
                
                <p style={{
                  fontSize: 'clamp(1.125rem, 4vw, 1.5rem)',
                  lineHeight: 1.6,
                  color: '#888888',
                  fontWeight: '300',
                  fontFamily: '"Chakra Petch", sans-serif',
                  maxWidth: '100%',
                  margin: 0
                }}>
                  Transform your business with cutting-edge digital solutions. We're a premier digital agency specializing in web development, AI integration, marketing automation, and SEO optimization.
                </p>
              </div>

              {/* Key Features - Simplified */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.5rem'
              }}>
                {[
                  { icon: 'bi-code-slash', text: 'Expert Development' },
                  { icon: 'bi-graph-up-arrow', text: 'Growth Marketing' },
                  { icon: 'bi-robot', text: 'AI Integration' },
                  { icon: 'bi-search', text: 'SEO Mastery' }
                ].map((feature, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <div style={{
                      width: '3rem',
                      height: '3rem',
                      backgroundColor: '#2a2a2a',
                      borderRadius: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <i className={`${feature.icon}`} style={{ color: '#ffffff', fontSize: '1.25rem' }}></i>
                    </div>
                    <span style={{
                      fontFamily: '"Chakra Petch", sans-serif',
                      fontWeight: '500',
                      color: '#ffffff',
                      fontSize: 'clamp(1rem, 3vw, 1.25rem)'
                    }}>{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                width: '100%'
              }}
              className="sm:flex-row"
              >
                <button
                  onClick={() => setShowProjectModal(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '1.25rem 2rem',
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    borderRadius: '0.5rem',
                    border: 'none',
                    fontWeight: '600',
                    fontFamily: '"Chakra Petch", sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '1.125rem',
                    width: '100%'
                  }}
                  className="sm:w-auto sm:flex-1"
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#ffffff';
                    e.target.style.transform = 'translateY(0px)';
                  }}
                >
                  <span>Start Your Project</span>
                  <i className="bi bi-arrow-right"></i>
                </button>
                
                <button
                  onClick={() => setShowServicesModal(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '1.25rem 2rem',
                    backgroundColor: 'transparent',
                    color: '#ffffff',
                    border: '2px solid #ffffff',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    fontFamily: '"Chakra Petch", sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '1.125rem',
                    width: '100%'
                  }}
                  className="sm:w-auto sm:flex-1"
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#ffffff';
                    e.target.style.color = '#000000';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#ffffff';
                    e.target.style.transform = 'translateY(0px)';
                  }}
                >
                  <span>View Services</span>
                  <i className="bi bi-play-circle"></i>
                </button>
              </div>

              {/* TrustPilot Rating */}
              <TrustPilot />
            </motion.div>

            {/* Right Column - Simplified Stats & Visual */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                position: 'relative',
                order: 2
              }}
              className="lg:order-2"
            >
              {/* Main Card */}
              <div style={{
                position: 'relative',
                backgroundColor: 'rgba(26, 26, 26, 0.8)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '1.5rem',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '4rem',
                    height: '4rem',
                    backgroundColor: '#ffffff',
                    borderRadius: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <i className="bi bi-lightning-charge" style={{ color: '#000000', fontSize: '1.5rem' }}></i>
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: '#ffffff',
                      fontFamily: '"Chakra Petch", sans-serif',
                      margin: 0
                    }}>JetLab Agency</h3>
                    <p style={{
                      color: '#888888',
                      fontFamily: '"Chakra Petch", sans-serif',
                      margin: 0
                    }}>Digital Excellence Partner</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{
                      fontFamily: '"Chakra Petch", sans-serif',
                      fontWeight: '500',
                      color: '#888888'
                    }}>Project Success Rate</span>
                    <span style={{
                      fontFamily: '"Chakra Petch", sans-serif',
                      fontWeight: '600',
                      color: '#ffffff'
                    }}>98%</span>
                  </div>
                  <div style={{
                    width: '100%',
                    backgroundColor: '#2a2a2a',
                    borderRadius: '9999px',
                    height: '0.75rem'
                  }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '98%' }}
                      transition={{ duration: 2, delay: 1 }}
                      style={{
                        backgroundColor: '#ffffff',
                        height: '0.75rem',
                        borderRadius: '9999px'
                      }}
                    />
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1rem'
                }}>
                  {[
                    { icon: 'bi-award', label: 'Premium Quality' },
                    { icon: 'bi-shield-check', label: 'Secure Solutions' },
                    { icon: 'bi-clock', label: 'On-Time Delivery' },
                    { icon: 'bi-headset', label: '24/7 Support' }
                  ].map((item, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <i className={`${item.icon}`} style={{ color: '#ffffff', fontSize: '1rem' }}></i>
                      <span style={{
                        fontSize: '0.875rem',
                        fontFamily: '"Chakra Petch", sans-serif',
                        fontWeight: '500',
                        color: '#888888'
                      }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                marginTop: '2rem'
              }}>
                {[
                  { number: '150+', label: 'Projects' },
                  { number: '50+', label: 'Clients' },
                  { number: '5+', label: 'Years' }
                ].map((stat, index) => (
                  <div key={index} style={{
                    textAlign: 'center',
                    backgroundColor: '#1a1a1a',
                    borderRadius: '1rem',
                    border: '1px solid #333333',
                    padding: '1rem'
                  }}>
                    <div style={{
                      fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                      fontWeight: '700',
                      color: '#ffffff',
                      fontFamily: '"Chakra Petch", sans-serif'
                    }}>{stat.number}</div>
                    <div style={{
                      fontSize: '0.75rem',
                      fontFamily: '"Chakra Petch", sans-serif',
                      fontWeight: '500',
                      color: '#888888'
                    }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project QuizModal */}
      <QuizModal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        service="Complete Digital Solution"
      />

      {/* Services Modal */}
      <Modal
        isOpen={showServicesModal}
        onClose={() => setShowServicesModal(false)}
        title="Our Services"
        size="lg"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
            <div key={index} style={{
              padding: '1.5rem',
              backgroundColor: '#2a2a2a',
              borderRadius: '0.75rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  backgroundColor: '#ffffff',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <i className={`${service.icon}`} style={{ color: '#000000', fontSize: '1.25rem' }}></i>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#ffffff',
                    fontFamily: '"Chakra Petch", sans-serif',
                    margin: 0,
                    marginBottom: '0.5rem'
                  }}>{service.title}</h3>
                  <p style={{
                    color: '#888888',
                    fontFamily: '"Chakra Petch", sans-serif',
                    fontWeight: '300',
                    margin: 0
                  }}>{service.description}</p>
                </div>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.5rem'
              }}>
                {service.features.map((feature, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <i className="bi bi-check" style={{ color: '#ffffff', fontSize: '0.875rem' }}></i>
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#888888',
                      fontFamily: '"Chakra Petch", sans-serif'
                    }}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div style={{
          marginTop: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid #333333'
        }}
        className="sm:flex-row"
        >
          <button 
            onClick={scrollToServices} 
            style={{
              flex: 1,
              backgroundColor: '#ffffff',
              color: '#000000',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontFamily: '"Chakra Petch", sans-serif'
            }}
          >
            View All Services
          </button>
          <button 
            onClick={scrollToContact} 
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              color: '#ffffff',
              border: '2px solid #ffffff',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: '600',
              fontFamily: '"Chakra Petch", sans-serif'
            }}
          >
            Get Quote
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Hero;