// src/components/QuizModal.jsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IMaskInput } from 'react-imask';
import Modal from './Modal';
import { sendQuizForm, validateEmail, validatePhone } from '../services/emailService';

const QuizModal = ({ isOpen, onClose, service = 'General Inquiry' }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  
  const [quizData, setQuizData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: '',
    timeline: '',
    goals: [],
    description: '',
    service: service
  });

  // Update service when modal opens with different service
  React.useEffect(() => {
    if (isOpen && service !== quizData.service) {
      setQuizData(prev => ({ ...prev, service }));
    }
  }, [isOpen, service, quizData.service]);

  const quizSteps = [
    {
      title: "Let's Get Started",
      subtitle: "Tell us about yourself",
      fields: [
        { 
          key: 'name', 
          label: 'Your Name', 
          type: 'text', 
          placeholder: 'John Doe',
          required: true,
          icon: 'bi-person'
        },
        { 
          key: 'email', 
          label: 'Email Address', 
          type: 'email', 
          placeholder: 'john@company.com',
          required: true,
          icon: 'bi-envelope'
        },
        { 
          key: 'phone', 
          label: 'Phone Number', 
          type: 'phone', 
          placeholder: '+1 (555) 123-4567',
          required: true,
          icon: 'bi-telephone'
        }
      ]
    },
    {
      title: "About Your Company",
      subtitle: "Help us understand your business",
      fields: [
        { 
          key: 'company', 
          label: 'Company Name', 
          type: 'text', 
          placeholder: 'Acme Corporation',
          required: false,
          icon: 'bi-building'
        },
        { 
          key: 'budget', 
          label: 'Project Budget', 
          type: 'select', 
          options: [
            'Under $5,000',
            '$5,000 - $15,000',
            '$15,000 - $50,000',
            '$50,000 - $100,000',
            'Over $100,000',
            'Let\'s discuss'
          ],
          required: true,
          icon: 'bi-currency-dollar'
        },
        { 
          key: 'timeline', 
          label: 'Desired Timeline', 
          type: 'select', 
          options: [
            'ASAP (Rush job)',
            '1-2 months',
            '3-6 months',
            '6+ months',
            'Flexible timeline'
          ],
          required: true,
          icon: 'bi-calendar'
        }
      ]
    },
    {
      title: "Project Goals",
      subtitle: "What do you want to achieve?",
      type: 'checkbox',
      options: [
        { id: 'increase-sales', label: 'Increase Sales & Revenue', icon: 'bi-graph-up' },
        { id: 'brand-awareness', label: 'Build Brand Awareness', icon: 'bi-megaphone' },
        { id: 'customer-engagement', label: 'Improve Customer Engagement', icon: 'bi-people' },
        { id: 'automate-processes', label: 'Automate Business Processes', icon: 'bi-gear' },
        { id: 'competitive-advantage', label: 'Gain Competitive Advantage', icon: 'bi-trophy' },
        { id: 'digital-transformation', label: 'Digital Transformation', icon: 'bi-lightning' }
      ]
    },
    {
      title: "Project Details",
      subtitle: "Tell us more about your vision",
      fields: [
        { 
          key: 'description', 
          label: 'Project Description', 
          type: 'textarea', 
          placeholder: 'Describe your project requirements, challenges, and what success looks like to you...',
          required: true,
          icon: 'bi-chat-text'
        }
      ]
    }
  ];

  const handleInputChange = (key, value) => {
    setQuizData(prev => ({
      ...prev,
      [key]: value
    }));

    // Clear error when user starts typing
    if (errors[key]) {
      setErrors(prev => ({
        ...prev,
        [key]: ''
      }));
    }
  };

  const handleGoalToggle = (goalId) => {
    setQuizData(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter(id => id !== goalId)
        : [...prev.goals, goalId]
    }));

    // Clear goals error
    if (errors.goals) {
      setErrors(prev => ({
        ...prev,
        goals: ''
      }));
    }
  };

  const validateCurrentStep = () => {
    const step = quizSteps[currentStep];
    const newErrors = {};
    
    if (step.type === 'checkbox') {
      if (quizData.goals.length === 0) {
        newErrors.goals = 'Please select at least one goal';
      }
    } else if (step.fields) {
      step.fields.forEach(field => {
        if (field.required) {
          const value = quizData[field.key];
          
          if (!value || value.trim() === '') {
            newErrors[field.key] = `${field.label} is required`;
          } else {
            // Additional validation based on field type
            if (field.type === 'email' && !validateEmail(value)) {
              newErrors[field.key] = 'Please enter a valid email address';
            } else if (field.type === 'phone' && !validatePhone(value)) {
              newErrors[field.key] = 'Please enter a valid phone number';
            } else if (field.key === 'name' && value.trim().length < 2) {
              newErrors[field.key] = 'Name must be at least 2 characters';
            }
          }
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      return;
    }

    if (currentStep < quizSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setErrors({}); // Clear errors when going back
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await sendQuizForm(quizData);
      
      if (result.success) {
        setSubmitStatus('success');
        
        // Reset form after 3 seconds
        setTimeout(() => {
          onClose();
          setCurrentStep(0);
          setQuizData({
            name: '',
            email: '',
            phone: '',
            company: '',
            budget: '',
            timeline: '',
            goals: [],
            description: '',
            service: service
          });
          setSubmitStatus(null);
          setErrors({});
        }, 3000);
      } else {
        throw new Error(result.error || 'Failed to send consultation request');
      }
      
    } catch (error) {
      console.error('Error sending quiz form:', error);
      setSubmitStatus('error');
      
      // Auto-hide error after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset form when closing
    setTimeout(() => {
      setCurrentStep(0);
      setQuizData({
        name: '',
        email: '',
        phone: '',
        company: '',
        budget: '',
        timeline: '',
        goals: [],
        description: '',
        service: service
      });
      setSubmitStatus(null);
      setErrors({});
    }, 300);
  };

  const renderField = (field) => {
    const value = quizData[field.key] || '';
    const hasError = errors[field.key];
    
    if (field.type === 'phone') {
      return (
        <IMaskInput
          mask="+1 (000) 000-0000"
          value={value}
          onAccept={(val) => handleInputChange(field.key, val)}
          placeholder={field.placeholder}
          className={`input-field ${hasError ? 'border-red-500' : ''}`}
        />
      );
    }
    
    if (field.type === 'select') {
      return (
        <select
          value={value}
          onChange={(e) => handleInputChange(field.key, e.target.value)}
          className={`input-field ${hasError ? 'border-red-500' : ''}`}
          required={field.required}
        >
          <option value="">Select {field.label.toLowerCase()}</option>
          {field.options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      );
    }
    
    if (field.type === 'textarea') {
      return (
        <textarea
          value={value}
          onChange={(e) => handleInputChange(field.key, e.target.value)}
          placeholder={field.placeholder}
          rows="4"
          className={`input-field resize-none ${hasError ? 'border-red-500' : ''}`}
          required={field.required}
        />
      );
    }
    
    return (
      <input
        type={field.type}
        value={value}
        onChange={(e) => handleInputChange(field.key, e.target.value)}
        placeholder={field.placeholder}
        className={`input-field ${hasError ? 'border-red-500' : ''}`}
        required={field.required}
      />
    );
  };

  if (submitStatus === 'success') {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} title="Thank You!" size="md">
        <div className="text-center space-y-6 py-4">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
            <i className="bi bi-check-circle text-green-400 text-4xl"></i>
          </div>
          <div>
            <h3 className="text-2xl chakra-semibold text-light mb-2">Request Submitted!</h3>
            <p className="text-muted chakra-light leading-relaxed">
              Thank you for your interest in our {service.toLowerCase()} services. 
              We'll review your requirements and get back to you within 24 hours at {quizData.email}.
            </p>
          </div>
          <div className="p-4 bg-dark-600 rounded-lg text-left">
            <p className="text-sm text-muted">
              <strong className="text-light">Next Steps:</strong><br/>
              • Our team will review your requirements<br/>
              • We'll prepare a custom proposal<br/>
              • Schedule a consultation call<br/>
              • Begin your digital transformation
            </p>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={`${service} Consultation`} size="lg">
      <div className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm chakra-medium text-muted">
              Step {currentStep + 1} of {quizSteps.length}
            </span>
            <span className="text-sm chakra-medium text-muted">
              {Math.round(((currentStep + 1) / quizSteps.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-dark-600 rounded-full h-2">
            <motion.div
              className="bg-light h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / quizSteps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Step Header */}
            <div className="text-center space-y-2">
              <h3 className="text-xl lg:text-2xl chakra-semibold text-light">
                {quizSteps[currentStep].title}
              </h3>
              <p className="text-muted chakra-light text-sm lg:text-base">
                {quizSteps[currentStep].subtitle}
              </p>
            </div>

            {/* Step Fields */}
            {quizSteps[currentStep].type === 'checkbox' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                  {quizSteps[currentStep].options.map((option) => (
                    <motion.div
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleGoalToggle(option.id)}
                      className={`p-3 lg:p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                        quizData.goals.includes(option.id)
                          ? 'border-light bg-light/10'
                          : 'border-border bg-dark-600 hover:border-light/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 lg:w-6 lg:h-6 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          quizData.goals.includes(option.id)
                            ? 'border-light bg-light'
                            : 'border-border'
                        }`}>
                          {quizData.goals.includes(option.id) && (
                            <i className="bi bi-check text-dark text-xs lg:text-sm"></i>
                          )}
                        </div>
                        <i className={`${option.icon} text-light text-lg lg:text-xl flex-shrink-0`}></i>
                        <span className="chakra-medium text-light text-sm lg:text-base leading-tight">{option.label}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {errors.goals && (
                  <p className="text-red-400 text-sm text-center">{errors.goals}</p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {quizSteps[currentStep].fields?.map((field) => (
                  <div key={field.key} className="space-y-2">
                    <label className="flex items-center space-x-2 chakra-medium text-light text-sm lg:text-base">
                      <i className={`${field.icon} text-light flex-shrink-0`}></i>
                      <span>{field.label} {field.required && <span className="text-red-400">*</span>}</span>
                    </label>
                    {renderField(field)}
                    {errors[field.key] && (
                      <p className="text-red-400 text-xs">{errors[field.key]}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6 border-t border-border">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`btn-secondary text-sm lg:text-base py-2 lg:py-3 px-4 lg:px-6 ${
              currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <i className="bi bi-arrow-left mr-2"></i>
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={isSubmitting}
            className={`btn-primary text-sm lg:text-base py-2 lg:py-3 px-4 lg:px-6 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-dark border-t-transparent rounded-full animate-spin mr-2"></div>
                Submitting...
              </>
            ) : currentStep === quizSteps.length - 1 ? (
              <>
                Submit Request
                <i className="bi bi-send ml-2"></i>
              </>
            ) : (
              <>
                Next
                <i className="bi bi-arrow-right ml-2"></i>
              </>
            )}
          </button>
        </div>

        {/* Error Message */}
        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-900/50 border border-red-500/50 rounded-lg"
          >
            <div className="flex items-start space-x-3">
              <i className="bi bi-exclamation-triangle text-red-400 flex-shrink-0 mt-0.5"></i>
              <div>
                <h4 className="chakra-semibold text-red-400 text-sm mb-1">Submission Failed</h4>
                <p className="text-red-300 text-xs leading-relaxed">
                  Failed to submit consultation request. Please check your information and try again, or contact us directly at info@jetlabco.com
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Modal>
  );
}; 
 
export default QuizModal;