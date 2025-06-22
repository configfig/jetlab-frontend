import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from './Modal';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import CookiesPolicy from './CookiesPolicy';
import { sendNewsletterSubscription, validateEmail } from '../services/emailService';

const Footer = () => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showCookiesModal, setShowCookiesModal] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(null);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

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
  };

  const navigateToPage = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const footerLinks = {
    Services: [
      { name: 'Web Development', action: () => navigateToPage('/services/web-development') },
      { name: 'Digital Marketing', action: () => navigateToPage('/services/digital-marketing') },
      { name: 'AI Integration', action: () => navigateToPage('/services/ai-integration') },
      { name: 'SEO Optimization', action: () => navigateToPage('/services/seo-optimization') }
    ],
    Company: [
      { name: 'About Us', action: () => scrollToSection('about') },
      { name: 'Our Process', action: () => scrollToSection('services') },
      { name: 'Contact', action: () => scrollToSection('contact') },
      { name: 'Get Started', action: () => scrollToSection('contact') }
    ]
  };

  const socialLinks = [
    { icon: 'bi-linkedin', href: 'https://linkedin.com/company/jetlab-agency', label: 'LinkedIn' },
    { icon: 'bi-twitter', href: 'https://twitter.com/jetlabagency', label: 'Twitter' },
    { icon: 'bi-facebook', href: 'https://facebook.com/jetlabagency', label: 'Facebook' },
    { icon: 'bi-instagram', href: 'https://instagram.com/jetlabagency', label: 'Instagram' }
  ];

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous states
    setNewsletterError('');
    setNewsletterStatus(null);

    // Validate email
    if (!newsletterEmail.trim()) {
      setNewsletterError('Email is required');
      return;
    }

    if (!validateEmail(newsletterEmail)) {
      setNewsletterError('Please enter a valid email address');
      return;
    }

    setIsSubscribing(true);

    try {
      const result = await sendNewsletterSubscription(newsletterEmail);
      
      if (result.success) {
        setNewsletterStatus('success');
        setNewsletterEmail('');
        
        // Auto-hide success message after 3 seconds
        setTimeout(() => setNewsletterStatus(null), 3000);
      } else {
        throw new Error(result.error || 'Failed to subscribe');
      }
      
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setNewsletterStatus('error');
      
      // Auto-hide error message after 5 seconds
      setTimeout(() => setNewsletterStatus(null), 5000);
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleEmailChange = (e) => {
    setNewsletterEmail(e.target.value);
    if (newsletterError) {
      setNewsletterError('');
    }
  };

  return (
    <>
      <footer className="bg-dark-800 text-light border-t border-border">
        {/* Main Footer Content */}
        <div className="container-custom section-padding">
          <div className="grid lg:grid-cols-4 gap-12">
            
            {/* Company Info */}
            <div className="lg:col-span-1 space-y-6">
              <div 
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => navigateToPage('/')}
              >
                <div className="w-12 h-12 bg-light rounded-xl flex items-center justify-center">
                  <i className="bi bi-lightning-charge text-dark text-xl"></i>
                </div>
                <div>
                  <h3 className="text-2xl chakra-bold text-light">JetLab</h3>
                  <p className="text-sm chakra-light text-muted">Digital Agency</p>
                </div>
              </div>
              
              <p className="chakra-light text-muted leading-relaxed">
                Premier digital agency based in Chicago, transforming businesses through innovative web development, AI integration, marketing automation, and SEO optimization.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <i className="bi bi-geo-alt text-light"></i>
                  <span className="chakra-light text-muted">Chicago, Illinois, USA</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="bi bi-envelope text-light"></i>
                  <a 
                    href="mailto:info@jetlabco.com"
                    className="chakra-light text-muted hover:text-light transition-colors duration-300"
                  >
                    info@jetlabco.com
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-dark-600 rounded-xl flex items-center justify-center hover:bg-light hover:text-dark transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <i className={`${social.icon} text-muted group-hover:text-dark`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Services Links */}
            <div className="space-y-6">
              <h4 className="text-xl chakra-semibold text-light">Services</h4>
              <div className="space-y-3">
                {footerLinks.Services.map((link, index) => (
                  <button
                    key={index}
                    onClick={link.action}
                    className="block chakra-light text-muted hover:text-light transition-colors duration-300 text-left"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Company Links */}
            <div className="space-y-6">
              <h4 className="text-xl chakra-semibold text-light">Company</h4>
              <div className="space-y-3">
                {footerLinks.Company.map((link, index) => (
                  <button
                    key={index}
                    onClick={link.action}
                    className="block chakra-light text-muted hover:text-light transition-colors duration-300 text-left"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter & Technologies */}
            <div className="space-y-6">
              <h4 className="text-xl chakra-semibold text-light">Stay Connected</h4>
              <p className="chakra-light text-muted">
                Get insights on digital trends and technology innovations.
              </p>
              
              <div className="space-y-4">
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="flex">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={handleEmailChange}
                      placeholder="Your email"
                      disabled={isSubscribing}
                      className={`flex-1 px-4 py-3 bg-dark-600 border border-border rounded-l-xl focus:outline-none focus:ring-2 focus:ring-light/20 focus:border-light text-light chakra-regular ${
                        newsletterError ? 'border-red-500' : ''
                      } ${isSubscribing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                    <button 
                      type="submit"
                      disabled={isSubscribing}
                      className={`px-6 py-3 bg-light text-dark rounded-r-xl hover:bg-light/90 transition-all duration-300 ${
                        isSubscribing ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubscribing ? (
                        <div className="w-5 h-5 border-2 border-dark border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <i className="bi bi-send"></i>
                      )}
                    </button>
                  </div>
                  
                  {newsletterError && (
                    <p className="text-red-400 text-xs">{newsletterError}</p>
                  )}

                  {newsletterStatus === 'success' && (
                    <p className="text-green-400 text-xs">Thank you for subscribing!</p>
                  )}

                  {newsletterStatus === 'error' && (
                    <p className="text-red-400 text-xs">Failed to subscribe. Please try again.</p>
                  )}
                </form>
                
                <p className="text-xs chakra-light text-muted">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </div>

              {/* Technologies */}
              <div className="space-y-3">
                <h5 className="chakra-semibold text-light">Technologies</h5>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Node.js', 'AI/ML', 'AWS', 'Python'].map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-dark-600 rounded-full text-xs chakra-medium text-muted border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border">
          <div className="container-custom py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              
              {/* Copyright */}
              <div className="flex items-center space-x-4">
                <p className="chakra-light text-muted">
                  © {new Date().getFullYear()} JetLab Digital Agency. All rights reserved.
                </p>
              </div>

              {/* Legal Links */}
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => setShowPrivacyModal(true)}
                  className="chakra-light text-muted hover:text-light transition-colors duration-300"
                >
                  Privacy Policy
                </button>
                <button 
                  onClick={() => setShowTermsModal(true)}
                  className="chakra-light text-muted hover:text-light transition-colors duration-300"
                >
                  Terms of Service
                </button>
                <button 
                  onClick={() => setShowCookiesModal(true)}
                  className="chakra-light text-muted hover:text-light transition-colors duration-300"
                >
                  Cookies Policy
                </button>
              </div>

              {/* Back to Top */}
              <button
                onClick={() => {
                  if (location.pathname !== '/') {
                    navigateToPage('/');
                  } else {
                    scrollToSection('hero');
                  }
                }}
                className="flex items-center space-x-2 text-muted hover:text-light transition-colors duration-300"
              >
                <span className="chakra-medium text-sm">Back to Top</span>
                <i className="bi bi-arrow-up"></i>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Policy Modals */}
      <Modal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
        title="Privacy Policy"
        size="lg"
      >
        <PrivacyPolicy />
      </Modal>

      <Modal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        title="Terms of Service"
        size="lg"
      >
        <TermsOfService />
      </Modal>

      <Modal
        isOpen={showCookiesModal}
        onClose={() => setShowCookiesModal(false)}
        title="Cookies Policy"
        size="lg"
      >
        <CookiesPolicy />
      </Modal>
    </>
  );
};

export default Footer;