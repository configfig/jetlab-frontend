// src/components/Services.jsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Services = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      id: 'web-development',
      icon: 'bi-code-slash',
      title: 'Web Development',
      subtitle: 'Custom websites & applications',
      description: 'We create websites of any complexity using the latest technologies and frameworks. Our team of professionals has extensive experience working with major companies like Yandex, Aeroflot & Facebook.',
      fullDescription: 'Our web development services encompass everything from simple landing pages to complex enterprise applications. We specialize in modern frameworks including React, Vue.js, Angular, and Next.js for frontend development, while utilizing robust backend technologies like Node.js, Python Django, PHP Laravel, and .NET Core. We ensure every website is responsive, fast-loading, and optimized for search engines.',
      features: [
        'Custom CMS Development (WordPress, Drupal, Custom Solutions)',
        'E-commerce Platforms (Shopify, WooCommerce, Magento)',
        'Progressive Web Applications (PWA)',
        'API Development & Integration',
        'Database Design & Optimization',
        'Cloud Deployment & DevOps',
        'Performance Optimization',
        'Security Implementation'
      ],
      technologies: ['React', 'Vue.js', 'Node.js', 'PHP', 'Python', 'PostgreSQL', 'AWS', 'Docker']
    },
    {
      id: 'marketing',
      icon: 'bi-graph-up-arrow',
      title: 'Digital Marketing',
      subtitle: 'Growth-driven marketing solutions',
      description: 'Comprehensive marketing solutions including PPC, Amazon advertising, Google Ads, AI-powered advertising, SMM, and creative design services.',
      fullDescription: 'Our digital marketing expertise drives measurable growth through data-driven strategies and cutting-edge technologies. We combine traditional marketing wisdom with innovative AI-powered tools to maximize ROI and reach your target audience effectively. From pay-per-click campaigns to social media management, we create integrated marketing ecosystems that generate leads and drive conversions.',
      features: [
        'Pay-Per-Click (PPC) Advertising Management',
        'Amazon Marketplace Optimization & Advertising',
        'Google Ads Campaign Creation & Management',
        'AI-Powered Advertising Optimization',
        'Social Media Marketing (SMM) Strategy',
        'Content Marketing & Creation',
        'Email Marketing Automation',
        'Conversion Rate Optimization (CRO)',
        'Marketing Analytics & Reporting',
        'Brand Strategy & Creative Design'
      ],
      technologies: ['Google Ads', 'Facebook Ads', 'Amazon DSP', 'HubSpot', 'Mailchimp', 'Analytics', 'Semrush', 'Hootsuite']
    },
    {
      id: 'ai-development',
      icon: 'bi-robot',
      title: 'AI Integration',
      subtitle: 'Intelligent automation solutions',
      description: 'AI system development, machine learning model training, natural language processing, computer vision, and intelligent automation solutions.',
      fullDescription: 'We harness the power of artificial intelligence to transform business operations and create intelligent solutions. Our AI services include custom machine learning model development, natural language processing implementation, computer vision systems, and intelligent automation workflows. We help businesses leverage AI to improve efficiency, reduce costs, and gain competitive advantages.',
      features: [
        'Custom Machine Learning Model Development',
        'Natural Language Processing (NLP) Solutions',
        'Computer Vision & Image Recognition',
        'Chatbot Development & Integration',
        'Predictive Analytics & Forecasting',
        'AI-Powered Recommendation Systems',
        'Intelligent Process Automation (IPA)',
        'Data Mining & Analysis',
        'AI Model Training & Optimization',
        'AI Ethics & Compliance Consulting'
      ],
      technologies: ['TensorFlow', 'PyTorch', 'OpenAI GPT', 'Python', 'Scikit-learn', 'Keras', 'Apache Spark', 'AWS AI']
    },
    {
      id: 'seo',
      icon: 'bi-search',
      title: 'SEO Optimization',
      subtitle: 'First-page search rankings',
      description: 'Comprehensive SEO optimization services that get your website to the top of search results through proven strategies and advanced techniques.',
      fullDescription: 'Our SEO experts employ comprehensive strategies to improve your website\'s visibility and rankings in search engines. We conduct thorough keyword research, optimize on-page elements, build high-quality backlinks, and continuously monitor performance to ensure sustained growth in organic traffic. Our approach combines technical SEO, content optimization, and strategic link building.',
      features: [
        'Comprehensive SEO Audit & Analysis',
        'Keyword Research & Strategy Development',
        'On-Page SEO Optimization',
        'Technical SEO Implementation',
        'Content Optimization & Creation',
        'Link Building & Outreach',
        'Local SEO & Google My Business',
        'E-commerce SEO Optimization',
        'SEO Performance Monitoring',
        'Competitor Analysis & Strategy'
      ],
      technologies: ['Google Analytics', 'Search Console', 'Semrush', 'Ahrefs', 'Screaming Frog', 'GTM', 'Schema.org', 'PageSpeed']
    }
  ];

  const handleServiceClick = (index) => {
    setActiveService(index);
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" ref={ref} className="section-padding bg-dark">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 glass-light rounded-full px-6 py-3 mb-6">
            <i className="bi bi-gear text-light"></i>
            <span className="chakra-medium text-light">Our Services</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl chakra-bold text-light mb-6">
            Complete{' '}
            <span className="text-light">Digital Solutions</span>
          </h2>
          
          <p className="text-xl chakra-light text-muted max-w-4xl mx-auto leading-relaxed">
            From custom web development to AI integration, we provide comprehensive digital services that drive business growth and innovation.
          </p>
        </motion.div>

        {/* Services Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {services.map((service, index) => (
            <button
              key={service.id}
              onClick={() => handleServiceClick(index)}
              className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300 ${
                activeService === index
                  ? 'bg-light text-dark shadow-lg'
                  : 'bg-dark-600 text-light hover:bg-dark-500 border border-border'
              }`}
            >
              <i className={`${service.icon} text-xl`}></i>
              <span className="chakra-medium">{service.title}</span>
            </button>
          ))}
        </motion.div>

        {/* Active Service Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="card-glass p-8 lg:p-12 mb-12"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Service Info */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-light rounded-xl flex items-center justify-center">
                      <i className={`${services[activeService].icon} text-dark text-2xl`}></i>
                    </div>
                    <div>
                      <h3 className="text-3xl chakra-bold text-light">{services[activeService].title}</h3>
                      <p className="chakra-medium text-muted">{services[activeService].subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-lg chakra-light text-muted leading-relaxed">
                    {services[activeService].fullDescription}
                  </p>
                </div>

                {/* Technologies */}
                <div className="space-y-4">
                  <h4 className="text-xl chakra-semibold text-light">Technologies We Use</h4>
                  <div className="flex flex-wrap gap-3">
                    {services[activeService].technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-dark-600 rounded-full text-sm chakra-medium text-light border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={scrollToContact}
                  className="btn-primary"
                >
                  Get Started with {services[activeService].title}
                </button>
              </div>

              {/* Right Column - Features List */}
              <div className="space-y-6">
                <h4 className="text-2xl chakra-semibold text-light">What's Included</h4>
                <div className="space-y-4">
                  {services[activeService].features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.03 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-6 h-6 bg-light rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <i className="bi bi-check text-dark text-sm"></i>
                      </div>
                      <span className="chakra-medium text-light">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
              className={`card p-6 cursor-pointer transition-all duration-300 ${
                activeService === index ? 'ring-2 ring-light' : ''
              }`}
              onClick={() => handleServiceClick(index)}
            >
              <div className="w-16 h-16 bg-light rounded-xl flex items-center justify-center mb-4">
                <i className={`${service.icon} text-dark text-2xl`}></i>
              </div>
              
              <h3 className="text-xl chakra-semibold text-light mb-2">{service.title}</h3>
              <p className="chakra-medium text-muted text-sm mb-4">{service.subtitle}</p>
              <p className="chakra-light text-muted text-sm leading-relaxed">{service.description}</p>
              
              <div className="mt-4 flex items-center text-light chakra-medium text-sm">
                <span>Learn More</span>
                <i className="bi bi-arrow-right ml-2"></i>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="text-3xl lg:text-4xl chakra-semibold text-light mb-12">
            Our Development Process
          </h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: 'bi-lightbulb', title: 'Discovery', description: 'Understanding your business goals and requirements' },
              { icon: 'bi-pencil-square', title: 'Planning', description: 'Creating detailed project roadmaps and strategies' },
              { icon: 'bi-code-slash', title: 'Development', description: 'Building solutions with cutting-edge technologies' },
              { icon: 'bi-rocket-takeoff', title: 'Launch', description: 'Deploying and optimizing your digital solution' }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                className="space-y-4"
              >
                <div className="w-16 h-16 bg-light rounded-xl flex items-center justify-center mx-auto">
                  <i className={`${step.icon} text-dark text-2xl`}></i>
                </div>
                <h4 className="text-xl chakra-semibold text-light">{step.title}</h4>
                <p className="chakra-light text-muted">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;