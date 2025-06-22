// src/components/AIIntegrationPage.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import QuizModal from './QuizModal';

const AIIntegrationPage = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [showQuizModal, setShowQuizModal] = useState(false);

  const aiTechnologies = [
    { name: 'GPT-4 / ChatGPT', icon: 'bi-chat-dots', category: 'NLP' },
    { name: 'TensorFlow', icon: 'bi-diagram-3', category: 'ML Framework' },
    { name: 'PyTorch', icon: 'bi-lightning', category: 'Deep Learning' },
    { name: 'OpenAI API', icon: 'bi-cpu', category: 'AI Services' },
    { name: 'Computer Vision', icon: 'bi-eye', category: 'Image AI' },
    { name: 'Scikit-learn', icon: 'bi-graph-up', category: 'Machine Learning' },
    { name: 'AWS AI/ML', icon: 'bi-cloud', category: 'Cloud AI' },
    { name: 'Azure AI', icon: 'bi-microsoft', category: 'Enterprise AI' }
  ];

  const services = [
    {
      title: 'Intelligent Chatbots & Virtual Assistants',
      description: 'Deploy advanced AI-powered conversational interfaces that provide 24/7 customer support and engagement.',
      features: [
        'Natural language processing (NLP)',
        'Multi-language support',
        'Intent recognition and classification',
        'Integration with existing systems',
        'Voice and text interactions',
        'Continuous learning and improvement'
      ],
      icon: 'bi-robot',
      useCases: 'Customer service, Lead qualification, Internal help desk'
    },
    {
      title: 'Predictive Analytics & Forecasting',
      description: 'Leverage machine learning to predict trends, customer behavior, and business outcomes.',
      features: [
        'Sales forecasting models',
        'Customer churn prediction',
        'Demand planning algorithms',
        'Risk assessment systems',
        'Market trend analysis',
        'Real-time decision support'
      ],
      icon: 'bi-graph-up-arrow',
      useCases: 'Sales optimization, Inventory management, Financial planning'
    },
    {
      title: 'Computer Vision Solutions',
      description: 'Implement AI systems that can analyze, understand, and process visual information.',
      features: [
        'Object detection and recognition',
        'Image classification systems',
        'Facial recognition technology',
        'Quality control automation',
        'Document processing (OCR)',
        'Video analytics and monitoring'
      ],
      icon: 'bi-eye-fill',
      useCases: 'Quality control, Security systems, Medical imaging'
    },
    {
      title: 'Process Automation & RPA',
      description: 'Automate repetitive tasks and workflows using intelligent robotic process automation.',
      features: [
        'Workflow automation design',
        'Data entry automation',
        'Document processing systems',
        'Email and communication automation',
        'Integration with existing software',
        'Exception handling and reporting'
      ],
      icon: 'bi-gear-fill',
      useCases: 'HR processes, Finance operations, Data management'
    }
  ];

  const industries = [
    {
      name: 'Healthcare',
      applications: ['Medical diagnosis AI', 'Drug discovery', 'Patient monitoring', 'Telemedicine'],
      icon: 'bi-heart-pulse'
    },
    {
      name: 'Finance',
      applications: ['Fraud detection', 'Algorithmic trading', 'Risk assessment', 'Robo-advisors'],
      icon: 'bi-currency-dollar'
    },
    {
      name: 'Retail',
      applications: ['Recommendation engines', 'Inventory optimization', 'Price optimization', 'Customer analytics'],
      icon: 'bi-bag'
    },
    {
      name: 'Manufacturing',
      applications: ['Predictive maintenance', 'Quality control', 'Supply chain optimization', 'Robotics'],
      icon: 'bi-gear-wide-connected'
    }
  ];

  const caseStudies = [
    {
      client: 'Manufacturing Company',
      challenge: 'High equipment downtime and maintenance costs',
      solution: 'Predictive maintenance AI system using IoT sensors',
      results: '40% reduction in unplanned downtime, 25% cost savings',
      industry: 'Manufacturing'
    },
    {
      client: 'E-commerce Platform',
      challenge: 'Low customer engagement and conversion rates',
      solution: 'AI-powered recommendation engine and chatbot',
      results: '60% increase in sales, 80% reduction in support tickets',
      industry: 'Retail'
    },
    {
      client: 'Financial Services',
      challenge: 'Manual fraud detection taking too long',
      solution: 'Real-time AI fraud detection system',
      results: '95% fraud detection accuracy, 70% faster processing',
      industry: 'Finance'
    }
  ];

  const benefits = [
    {
      title: 'Cost Reduction',
      description: 'Automate manual processes and reduce operational costs by up to 40%',
      icon: 'bi-piggy-bank',
      percentage: '40%'
    },
    {
      title: 'Efficiency Boost',
      description: 'Increase productivity and process efficiency with intelligent automation',
      icon: 'bi-speedometer2',
      percentage: '60%'
    },
    {
      title: 'Better Decisions',
      description: 'Make data-driven decisions with AI-powered insights and analytics',
      icon: 'bi-lightbulb',
      percentage: '85%'
    },
    {
      title: 'Customer Experience',
      description: 'Enhance customer satisfaction with personalized AI-driven experiences',
      icon: 'bi-emoji-smile',
      percentage: '75%'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'AI Strategy Assessment',
      description: 'Analyze your business processes and identify the best AI implementation opportunities.',
      icon: 'bi-search'
    },
    {
      step: '02',
      title: 'Data Preparation',
      description: 'Clean, organize, and prepare your data for AI model training and implementation.',
      icon: 'bi-database'
    },
    {
      step: '03',
      title: 'Model Development',
      description: 'Design, train, and validate custom AI models tailored to your specific requirements.',
      icon: 'bi-cpu'
    },
    {
      step: '04',
      title: 'Integration & Deployment',
      description: 'Seamlessly integrate AI solutions into your existing systems and workflows.',
      icon: 'bi-cloud-upload'
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-dark">
        {/* Hero Section */}
        <section ref={ref} className="section-padding bg-dark">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center space-x-2 glass-light rounded-full px-6 py-3 mb-6">
                <i className="bi bi-robot text-light"></i>
                <span className="chakra-medium text-light">AI Integration</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl chakra-bold text-light mb-6">
                Intelligent AI{' '}
                <span className="text-light">Solutions</span>
              </h1>
              
              <p className="text-xl chakra-light text-muted max-w-4xl mx-auto leading-relaxed mb-8">
                Transform your business with cutting-edge artificial intelligence. From chatbots to predictive analytics, 
                we implement AI solutions that automate processes, enhance decision-making, and drive growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowQuizModal(true)}
                  className="btn-primary"
                >
                  Explore AI Solutions
                </button>
                <button className="btn-secondary">
                  AI Readiness Assessment
                </button>
              </div>
            </motion.div>

            {/* AI Technologies Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-20"
            >
              <h2 className="text-3xl chakra-semibold text-light text-center mb-12">
                AI Technologies We Work With
              </h2>
              
              <div className="grid md:grid-cols-4 gap-6">
                {aiTechnologies.map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                    className="card p-6 text-center hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-16 h-16 bg-dark-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <i className={`${tech.icon} text-light text-2xl`}></i>
                    </div>
                    <h3 className="chakra-semibold text-light mb-1 text-sm">{tech.name}</h3>
                    <p className="text-xs text-muted">{tech.category}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="section-padding bg-dark-800">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl chakra-semibold text-light mb-6">
                Our AI Integration Services
              </h2>
              <p className="text-lg chakra-light text-muted max-w-3xl mx-auto">
                Comprehensive AI solutions designed to transform your business operations and drive innovation.
              </p>
            </motion.div>

            <div className="space-y-12">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="card p-8"
                >
                  <div className="grid lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2">
                      <div className="flex items-start space-x-4 mb-6">
                        <div className="w-16 h-16 bg-light rounded-xl flex items-center justify-center flex-shrink-0">
                          <i className={`${service.icon} text-dark text-2xl`}></i>
                        </div>
                        <div>
                          <h3 className="text-2xl chakra-semibold text-light mb-3">{service.title}</h3>
                          <p className="chakra-light text-muted leading-relaxed">{service.description}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-3">
                            <i className="bi bi-check-circle text-light"></i>
                            <span className="chakra-medium text-muted text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-dark-600 p-6 rounded-xl">
                      <h4 className="chakra-semibold text-light mb-3">Common Use Cases</h4>
                      <p className="text-muted text-sm leading-relaxed">{service.useCases}</p>
                      <button
                        onClick={() => setShowQuizModal(true)}
                        className="btn-secondary w-full mt-4 text-sm py-2"
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="section-padding bg-dark">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl chakra-semibold text-light mb-6">
                AI Across Industries
              </h2>
              <p className="text-lg chakra-light text-muted max-w-3xl mx-auto">
                See how we're transforming different industries with tailored AI solutions.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {industries.map((industry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                  className="card-glass p-6"
                >
                  <div className="w-16 h-16 bg-light rounded-xl flex items-center justify-center mx-auto mb-4">
                    <i className={`${industry.icon} text-dark text-2xl`}></i>
                  </div>
                  <h3 className="text-xl chakra-semibold text-light mb-4 text-center">{industry.name}</h3>
                  <div className="space-y-2">
                    {industry.applications.map((app, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <i className="bi bi-dot text-light"></i>
                        <span className="text-muted text-sm">{app}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="section-padding bg-dark-800">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 1.2 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl chakra-semibold text-light mb-6">
                Benefits of AI Integration
              </h2>
              <p className="text-lg chakra-light text-muted max-w-3xl mx-auto">
                Discover the measurable impact AI can have on your business performance.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 1.3 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <i className={`${benefit.icon} text-dark text-2xl`}></i>
                    </div>
                    <div className="absolute -top-2 -right-2 bg-dark-600 rounded-full px-3 py-1 border-2 border-light">
                      <span className="text-light text-sm chakra-bold">{benefit.percentage}</span>
                    </div>
                  </div>
                  <h3 className="text-xl chakra-semibold text-light mb-3">{benefit.title}</h3>
                  <p className="chakra-light text-muted text-sm leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="section-padding bg-dark">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 1.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl chakra-semibold text-light mb-6">
                AI Success Stories
              </h2>
              <p className="text-lg chakra-light text-muted max-w-3xl mx-auto">
                Real-world AI implementations that delivered exceptional results.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 1.7 + index * 0.1 }}
                  className="card-glass p-8"
                >
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-light/10 rounded-full text-light text-sm chakra-medium">
                      {study.industry}
                    </span>
                  </div>
                  <h3 className="text-xl chakra-semibold text-light mb-4">{study.client}</h3>
                  <div className="space-y-3 mb-6">
                    <div>
                      <strong className="text-light text-sm">Challenge:</strong>
                      <p className="text-muted text-sm">{study.challenge}</p>
                    </div>
                    <div>
                      <strong className="text-light text-sm">AI Solution:</strong>
                      <p className="text-muted text-sm">{study.solution}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-light/5 rounded-lg">
                    <strong className="text-light text-sm">Results:</strong>
                    <p className="text-light chakra-semibold">{study.results}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="section-padding bg-dark-800">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 2.0 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl chakra-semibold text-light mb-6">
                Our AI Implementation Process
              </h2>
              <p className="text-lg chakra-light text-muted max-w-3xl mx-auto">
                A structured approach to AI integration that ensures successful outcomes.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 2.1 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <i className={`${step.icon} text-dark text-2xl`}></i>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-dark-600 rounded-full flex items-center justify-center border-2 border-light">
                      <span className="text-light text-sm chakra-bold">{step.step}</span>
                    </div>
                  </div>
                  <h3 className="text-xl chakra-semibold text-light mb-3">{step.title}</h3>
                  <p className="chakra-light text-muted text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-dark">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 2.4 }}
              className="text-center"
            >
              <div className="max-w-3xl mx-auto card-glass p-12">
                <h2 className="text-3xl lg:text-4xl chakra-semibold text-light mb-6">
                  Ready to Embrace AI?
                </h2>
                <p className="text-lg chakra-light text-muted mb-8">
                  Let's explore how artificial intelligence can transform your business processes and drive innovation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setShowQuizModal(true)}
                    className="btn-primary"
                  >
                    Start AI Consultation
                  </button>
                  <button className="btn-secondary">
                    Download AI Guide
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Quiz Modal */}
      <QuizModal
        isOpen={showQuizModal}
        onClose={() => setShowQuizModal(false)}
        service="AI Integration"
      />
    </>
  );
};

export default AIIntegrationPage;