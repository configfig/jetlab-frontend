import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LegalPages = ({ isOpen, onClose, pageType }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getPageContent = () => {
    switch (pageType) {
      case 'privacy':
        return {
          title: 'Privacy Policy',
          lastUpdated: 'December 2024',
          content: [
            {
              section: 'Information We Collect',
              content: 'At JetLab Digital Agency, we collect information you provide directly to us, such as when you create an account, fill out a form, or contact us. This includes your name, email address, phone number, company information, and any messages you send us. We also automatically collect certain information about your device and how you interact with our website, including your IP address, browser type, operating system, and pages visited.'
            },
            {
              section: 'How We Use Your Information',
              content: 'We use the information we collect to provide, maintain, and improve our services, communicate with you about our services, process transactions, send you marketing communications (with your consent), respond to your inquiries and support requests, protect against fraud and abuse, and comply with legal obligations.'
            },
            {
              section: 'Information Sharing',
              content: 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with trusted service providers who assist us in operating our website and conducting our business, as long as they agree to keep this information confidential.'
            },
            {
              section: 'Data Security',
              content: 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.'
            },
            {
              section: 'Your Rights',
              content: 'You have the right to access, update, or delete your personal information. You may also opt out of receiving marketing communications from us. If you are in the EU, you have additional rights under GDPR, including the right to data portability and the right to lodge a complaint with a supervisory authority.'
            },
            {
              section: 'Contact Information',
              content: 'If you have any questions about this Privacy Policy, please contact us at k.websupp@gmail.com or by mail at JetLab Digital Agency, Chicago, IL.'
            }
          ]
        };
      
      case 'terms':
        return {
          title: 'Terms of Service',
          lastUpdated: 'December 2024',
          content: [
            {
              section: 'Acceptance of Terms',
              content: 'By accessing and using JetLab Digital Agency\'s website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
            },
            {
              section: 'Services',
              content: 'JetLab Digital Agency provides digital marketing, web development, AI integration, and SEO optimization services. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without notice.'
            },
            {
              section: 'Client Responsibilities',
              content: 'Clients are responsible for providing accurate information, timely feedback, and necessary materials for project completion. Clients must also ensure they have the rights to any content they provide and that such content does not violate any laws or third-party rights.'
            },
            {
              section: 'Payment Terms',
              content: 'Payment terms are specified in individual contracts. Generally, we require a deposit before work begins, with remaining payments due according to project milestones. Late payments may incur additional fees and may result in project suspension.'
            },
            {
              section: 'Intellectual Property',
              content: 'Upon full payment, clients receive ownership of custom work created specifically for them. However, JetLab retains the right to use general methodologies, know-how, and experience gained during the project for future work.'
            },
            {
              section: 'Limitation of Liability',
              content: 'JetLab\'s liability is limited to the amount paid by the client for the specific service in question. We are not liable for any indirect, consequential, or punitive damages.'
            },
            {
              section: 'Termination',
              content: 'Either party may terminate services with written notice. Upon termination, the client is responsible for payment of all work completed up to the termination date.'
            }
          ]
        };
      
      case 'cookies':
        return {
          title: 'Cookie Policy',
          lastUpdated: 'December 2024',
          content: [
            {
              section: 'What Are Cookies',
              content: 'Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and to provide information to website owners.'
            },
            {
              section: 'How We Use Cookies',
              content: 'We use cookies to enhance your browsing experience, analyze website traffic, personalize content, and remember your preferences. Our cookies help us understand how visitors interact with our website and improve our services.'
            },
            {
              section: 'Types of Cookies We Use',
              content: 'Essential Cookies: Required for the website to function properly. Analytics Cookies: Help us understand how visitors use our website. Functional Cookies: Remember your preferences and settings. Marketing Cookies: Used to deliver relevant advertisements (with your consent).'
            },
            {
              section: 'Third-Party Cookies',
              content: 'We may use third-party services like Google Analytics that place their own cookies on your device. These third parties have their own privacy policies and cookie practices.'
            },
            {
              section: 'Managing Cookies',
              content: 'You can control and manage cookies through your browser settings. Most browsers allow you to block cookies, delete existing cookies, or be notified when new cookies are being placed. However, disabling cookies may affect the functionality of our website.'
            },
            {
              section: 'Cookie Consent',
              content: 'By continuing to use our website, you consent to our use of cookies as described in this policy. You can withdraw your consent at any time by adjusting your browser settings or contacting us directly.'
            }
          ]
        };
      
      default:
        return { title: '', content: [] };
    }
  };

  const pageData = getPageContent();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-4xl bg-dark-card border border-dark-border rounded-3xl max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-dark-border">
              <div>
                <h2 className="text-3xl chakra-bold text-white">{pageData.title}</h2>
                <p className="text-gray-light chakra-light mt-2">Last updated: {pageData.lastUpdated}</p>
              </div>
              <button
                onClick={onClose}
                className="w-12 h-12 flex items-center justify-center text-gray-light hover:text-white transition-colors duration-200 rounded-xl hover:bg-dark-hover"
              >
                <i className="bi bi-x text-2xl"></i>
              </button>
            </div>

            {/* Content */}
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-8">
                {pageData.content.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl chakra-semibold text-white">{section.section}</h3>
                    <p className="text-gray-light chakra-light leading-relaxed">{section.content}</p>
                  </motion.div>
                ))}
                
                {/* Contact Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: pageData.content.length * 0.1, duration: 0.3 }}
                  className="glass-light rounded-2xl p-6 mt-8"
                >
                  <h4 className="text-lg chakra-semibold text-white mb-3">Questions?</h4>
                  <p className="text-gray-light chakra-light mb-4">
                    If you have any questions about this {pageData.title.toLowerCase()}, please don't hesitate to contact us.
                  </p>
                  <div className="flex items-center space-x-2">
                    <i className="bi bi-envelope text-white"></i>
                    <a 
                      href="mailto:k.websupp@gmail.com"
                      className="text-white hover:text-gray-light transition-colors duration-200 chakra-medium"
                    >
                      k.websupp@gmail.com
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LegalPages;