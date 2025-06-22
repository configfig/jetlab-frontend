// src/components/ContactForm.jsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { IMaskInput } from 'react-imask';
import CustomSelect from './CustomSelect';
import QuizModal from './QuizModal';
import { sendContactForm, validateEmail, validatePhone } from '../services/emailService';

const ContactForm = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [selectedQuizService, setSelectedQuizService] = useState('');
  const [errors, setErrors] = useState({});

  const services = [
    'Web Development',
    'Digital Marketing',
    'AI Integration',
    'SEO Optimization',
    'Complete Digital Solution'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleServiceChange = (e) => {
    setFormData(prev => ({
      ...prev,
      service: e.target.value
    }));
    
    if (errors.service) {
      setErrors(prev => ({
        ...prev,
        service: ''
      }));
    }
  };

  const handlePhoneChange = (value) => {
    setFormData(prev => ({
      ...prev,
      phone: value
    }));
    
    if (errors.phone) {
      setErrors(prev => ({
        ...prev,
        phone: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Service validation
    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const result = await sendContactForm(formData);
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          phone: '',
          email: '',
          service: '',
          message: ''
        });
        
        // Auto-hide success message after 8 seconds
        setTimeout(() => setSubmitStatus(null), 8000);
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
      
    } catch (error) {
      console.error('Error sending form:', error);
      setSubmitStatus('error');
      
      // Auto-hide error message after 8 seconds
      setTimeout(() => setSubmitStatus(null), 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuizClick = (service) => {
    setSelectedQuizService(service);
    setShowQuizModal(true);
  };

  const contactInfo = [
    {
      icon: 'bi-geo-alt',
      title: 'Location',
      details: 'Chicago, Illinois, USA'
    },
    {
      icon: 'bi-envelope',
      title: 'Email',
      details: 'info@jetlabco.com'
    },
    {
      icon: 'bi-clock',
      title: 'Hours',
      details: 'Mon - Fri: 9:00 AM - 6:00 PM'
    }
  ];

  return (
    <>
      <section id="contact" ref={ref} className="section-padding bg-dark-800">
        <div className="container-custom">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 glass-light rounded-full px-6 py-3 mb-6">
              <i className="bi bi-envelope text-light"></i>
              <span className="chakra-medium text-light">Get In Touch</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl chakra-bold text-light mb-6">
              Start Your{' '}
              <span className="text-light">Digital Journey</span>
            </h2>
            
            <p className="text-xl chakra-light text-muted max-w-3xl mx-auto leading-relaxed">
              Ready to transform your business? Contact our team for a free consultation.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12 items-start">
              
              {/* Contact Info - Left Column */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl chakra-semibold text-light mb-6">
                    Contact Information
                  </h3>
                  
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-dark-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <i className={`${info.icon} text-light text-xl`}></i>
                        </div>
                        <div>
                          <h4 className="chakra-semibold text-light mb-1">{info.title}</h4>
                          <p className="chakra-light text-muted text-sm">{info.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Service Buttons */}
                <div className="space-y-4">
                  <h4 className="text-xl chakra-semibold text-light">Quick Service Request</h4>
                  <div className="space-y-3">
                    {services.slice(0, 4).map((service, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizClick(service)}
                        className="w-full p-3 bg-dark-600 hover:bg-dark-500 rounded-lg transition-all duration-300 text-left border border-border hover:border-light/30"
                      >
                        <div className="flex items-center justify-between">
                          <span className="chakra-medium text-light text-sm">{service}</span>
                          <i className="bi bi-arrow-right text-muted"></i>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Why Choose Us */}
                <div className="card-glass p-6">
                  <h4 className="text-xl chakra-semibold text-light mb-4">
                    Why Choose JetLab?
                  </h4>
                  <div className="space-y-3">
                    {[
                      'Fortune 500 experience',
                      '150+ successful projects',
                      '24/7 support included',
                      'Transparent pricing'
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <i className="bi bi-check-circle text-light"></i>
                        <span className="chakra-light text-muted text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Contact Form - Right Columns */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <div className="card p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl chakra-semibold text-light mb-2">
                      Request Free Consultation
                    </h3>
                    <p className="chakra-light text-muted">
                      Get back to you within 24 hours.
                    </p>
                  </div>

                  {/* Success/Error Status Banner */}
                  <AnimatePresence>
                    {submitStatus && (
                      <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className={`p-6 rounded-2xl mb-8 border-2 ${
                          submitStatus === 'success' 
                            ? 'bg-green-900/20 border-green-500/50 backdrop-blur-sm' 
                            : 'bg-red-900/20 border-red-500/50 backdrop-blur-sm'
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                            submitStatus === 'success' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            <i className={`${
                              submitStatus === 'success' 
                                ? 'bi bi-check-circle-fill' 
                                : 'bi bi-exclamation-triangle-fill'
                            } text-xl`}></i>
                          </div>
                          <div className="flex-1">
                            <h4 className={`chakra-semibold text-lg mb-2 ${
                              submitStatus === 'success' ? 'text-green-300' : 'text-red-300'
                            }`}>
                              {submitStatus === 'success' ? 'Message Sent Successfully!' : 'Failed to Send Message'}
                            </h4>
                            <p className={`text-sm leading-relaxed ${
                              submitStatus === 'success' ? 'text-green-200' : 'text-red-200'
                            }`}>
                              {submitStatus === 'success' 
                                ? `Thank you ${formData.name || 'for your message'}! We've received your inquiry and will get back to you within 24 hours at ${formData.email || 'your email address'}. Our team is excited to discuss your project!` 
                                : 'There was an issue sending your message. Please check your information and try again, or contact us directly at info@jetlabco.com'
                              }
                            </p>
                            {submitStatus === 'success' && (
                              <div className="mt-3 text-xs text-green-300">
                                <i className="bi bi-info-circle mr-2"></i>
                                Check your email for a confirmation and next steps.
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => setSubmitStatus(null)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                              submitStatus === 'success' 
                                ? 'hover:bg-green-500/20 text-green-400' 
                                : 'hover:bg-red-500/20 text-red-400'
                            }`}
                          >
                            <i className="bi bi-x text-lg"></i>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name and Email Row */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block chakra-medium text-light mb-2 text-sm">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                          placeholder="Your name"
                        />
                        {errors.name && (
                          <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block chakra-medium text-light mb-2 text-sm">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                          placeholder="your@email.com"
                        />
                        {errors.email && (
                          <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Phone and Service Row */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block chakra-medium text-light mb-2 text-sm">
                          Phone *
                        </label>
                        <IMaskInput
                          mask="+1 (000) 000-0000"
                          value={formData.phone}
                          onAccept={handlePhoneChange}
                          placeholder="+1 (555) 123-4567"
                          className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
                        />
                        {errors.phone && (
                          <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block chakra-medium text-light mb-2 text-sm">
                          Service *
                        </label>
                        <CustomSelect
                          options={services}
                          value={formData.service}
                          onChange={handleServiceChange}
                          placeholder="Select service"
                          required={true}
                          className={errors.service ? 'border-red-500' : ''}
                        />
                        {errors.service && (
                          <p className="text-red-400 text-xs mt-1">{errors.service}</p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block chakra-medium text-light mb-2 text-sm">
                        Project Details
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="4"
                        className="input-field resize-none"
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || submitStatus === 'success'}
                      className={`w-full btn-primary flex items-center justify-center space-x-2 ${
                        isSubmitting || submitStatus === 'success' ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-dark border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : submitStatus === 'success' ? (
                        <>
                          <i className="bi bi-check-circle text-lg"></i>
                          <span>Message Sent!</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <i className="bi bi-send"></i>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Modal */}
      <QuizModal
        isOpen={showQuizModal}
        onClose={() => setShowQuizModal(false)}
        service={selectedQuizService}
      />
    </>
  );
};

export default ContactForm;