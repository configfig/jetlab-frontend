import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import QuizModal from './QuizModal';

const DigitalMarketingPage = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [showQuizModal, setShowQuizModal] = useState(false);

  const platforms = [
    { name: 'Google Ads', icon: 'bi-google', reach: '4.3B+ Users' },
    { name: 'Facebook Ads', icon: 'bi-facebook', reach: '2.9B+ Users' },
    { name: 'LinkedIn Ads', icon: 'bi-linkedin', reach: '900M+ Professionals' },
    { name: 'Instagram', icon: 'bi-instagram', reach: '2B+ Users' },
    { name: 'TikTok Ads', icon: 'bi-tiktok', reach: '1B+ Users' },
    { name: 'YouTube Ads', icon: 'bi-youtube', reach: '2.7B+ Users' },
    { name: 'Amazon DSP', icon: 'bi-amazon', reach: '300M+ Shoppers' },
    { name: 'Twitter Ads', icon: 'bi-twitter', reach: '450M+ Users' }
  ];

  const services = [
    {
      title: 'Pay-Per-Click (PPC) Advertising',
      description: 'Maximize your ROI with data-driven PPC campaigns across all major platforms.',
      features: [
        'Google Ads campaign management',
        'Bing Ads optimization',
        'Shopping campaigns setup',
        'Conversion tracking implementation',
        'A/B testing and optimization',
        'Detailed performance reporting'
      ],
      icon: 'bi-cursor-fill',
      metrics: 'Average 300% ROI increase'
    },
    {
      title: 'Social Media Marketing',
      description: 'Build brand awareness and engage your audience across all social platforms.',
      features: [
        'Content strategy development',
        'Social media management',
        'Influencer partnerships',
        'Community management',
        'Social advertising campaigns',
        'Performance analytics'
      ],
      icon: 'bi-share-fill',
      metrics: '500% engagement growth'
    },
    {
      title: 'Search Engine Optimization',
      description: 'Dominate search results with comprehensive SEO strategies.',
      features: [
        'Technical SEO audits',
        'Keyword research & strategy',
        'On-page optimization',
        'Link building campaigns',
        'Local SEO optimization',
        'Content optimization'
      ],
      icon: 'bi-search',
      metrics: '250% organic traffic boost'
    },
    {
      title: 'Content Marketing',
      description: 'Create compelling content that converts prospects into customers.',
      features: [
        'Content strategy planning',
        'Blog writing & optimization',
        'Video content production',
        'Email marketing campaigns',
        'Lead magnets creation',
        'Content distribution'
      ],
      icon: 'bi-journal-text',
      metrics: '400% lead generation increase'
    }
  ];

  const caseStudies = [
    {
      client: 'E-commerce Retailer',
      challenge: 'Low online visibility and poor conversion rates',
      solution: 'Comprehensive PPC and SEO strategy',
      results: '850% increase in online sales within 6 months',
      industry: 'Retail'
    },
    {
      client: 'SaaS Startup',
      challenge: 'Need to acquire enterprise customers',
      solution: 'LinkedIn advertising and content marketing',
      results: '300% increase in qualified leads',
      industry: 'Technology'
    },
    {
      client: 'Healthcare Provider',
      challenge: 'Local market penetration',
      solution: 'Local SEO and social media marketing',
      results: '500% increase in appointment bookings',
      industry: 'Healthcare'
    }
  ];

  const marketingTools = [
    { name: 'Google Analytics', category: 'Analytics', icon: 'bi-bar-chart' },
    { name: 'SEMrush', category: 'SEO Tools', icon: 'bi-search' },
    { name: 'HubSpot', category: 'Marketing Automation', icon: 'bi-gear' },
    { name: 'Mailchimp', category: 'Email Marketing', icon: 'bi-envelope' },
    { name: 'Hootsuite', category: 'Social Media', icon: 'bi-share' },
    { name: 'Canva', category: 'Design', icon: 'bi-palette' }
  ];

  const process = [
    {
      step: '01',
      title: 'Market Research & Analysis',
      description: 'Deep dive into your market, competitors, and target audience to identify opportunities.',
      icon: 'bi-graph-up'
    },
    {
      step: '02',
      title: 'Strategy Development',
      description: 'Create a comprehensive marketing strategy tailored to your business goals and budget.',
      icon: 'bi-lightbulb'
    },
    {
      step: '03',
      title: 'Campaign Implementation',
      description: 'Launch and manage campaigns across multiple channels with continuous optimization.',
      icon: 'bi-rocket-takeoff'
    },
    {
      step: '04',
      title: 'Performance Tracking',
      description: 'Monitor results, analyze data, and refine strategies for maximum ROI.',
      icon: 'bi-speedometer2'
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
                <i className="bi bi-graph-up-arrow text-light"></i>
                <span className="chakra-medium text-light">Digital Marketing</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl chakra-bold text-light mb-6">
                Growth-Driven Digital{' '}
                <span className="text-light">Marketing</span>
              </h1>
              
              <p className="text-xl chakra-light text-muted max-w-4xl mx-auto leading-relaxed mb-8">
                Scale your business with data-driven marketing strategies that deliver measurable results. 
                From PPC campaigns to social media marketing, we drive growth across all digital channels.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowQuizModal(true)}
                  className="btn-primary"
                >
                  Boost Your Marketing
                </button>
                <button className="btn-secondary">
                  View Case Studies
                </button>
              </div>
            </motion.div>

            {/* Platforms Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-20"
            >
              <h2 className="text-3xl chakra-semibold text-light text-center mb-12">
                Platforms We Advertise On
              </h2>
              
              <div className="grid md:grid-cols-4 gap-6">
                {platforms.map((platform, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                    className="card p-6 text-center hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-16 h-16 bg-dark-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <i className={`${platform.icon} text-light text-2xl`}></i>
                    </div>
                    <h3 className="chakra-semibold text-light mb-1">{platform.name}</h3>
                    <p className="text-sm text-muted">{platform.reach}</p>
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
                Our Digital Marketing Services
              </h2>
              <p className="text-lg chakra-light text-muted max-w-3xl mx-auto">
                Comprehensive marketing solutions designed to accelerate your business growth.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="card p-8"
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-16 h-16 bg-light rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className={`${service.icon} text-dark text-2xl`}></i>
                    </div>
                    <div>
                      <h3 className="text-2xl chakra-semibold text-light mb-3">{service.title}</h3>
                      <p className="chakra-light text-muted leading-relaxed mb-3">{service.description}</p>
                      <div className="inline-block px-4 py-2 bg-light/10 rounded-lg">
                        <span className="text-light chakra-semibold text-sm">{service.metrics}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <i className="bi bi-check-circle text-light"></i>
                        <span className="chakra-medium text-muted">{feature}</span>
                      </div>
                    ))}
                  </div>
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
              transition={{ duration: 0.4, delay: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl chakra-semibold text-light mb-6">
                Success Stories
              </h2>
              <p className="text-lg chakra-light text-muted max-w-3xl mx-auto">
                Real results from real clients who trusted us with their digital marketing.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                  className="card-glass p-8"
                >
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-light/10 rounded-full text-light text-sm chakra-medium">
                      {study.industry}
                    </span>
                  </div>
                  <h3 className="text-xl chakra-semibold text-light mb-3">{study.client}</h3>
                  <div className="space-y-3 mb-6">
                    <div>
                      <strong className="text-light text-sm">Challenge:</strong>
                      <p className="text-muted text-sm">{study.challenge}</p>
                    </div>
                    <div>
                      <strong className="text-light text-sm">Solution:</strong>
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

        {/* Tools Section */}
        <section className="section-padding bg-dark-800">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 1.2 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl chakra-semibold text-light mb-6">
                Tools & Technologies
              </h2>
              <p className="text-lg chakra-light text-muted max-w-3xl mx-auto">
                We use industry-leading tools to deliver exceptional marketing results.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
              {marketingTools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 1.3 + index * 0.05 }}
                  className="card p-4 text-center"
                >
                  <div className="w-12 h-12 bg-dark-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <i className={`${tool.icon} text-light text-lg`}></i>
                  </div>
                  <h4 className="chakra-semibold text-light text-sm mb-1">{tool.name}</h4>
                  <p className="text-xs text-muted">{tool.category}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="section-padding bg-dark">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 1.4 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl chakra-semibold text-light mb-6">
                Our Marketing Process
              </h2>
              <p className="text-lg chakra-light text-muted max-w-3xl mx-auto">
                A systematic approach to marketing that delivers consistent results.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 1.5 + index * 0.1 }}
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
        <section className="section-padding bg-dark-800">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 1.8 }}
              className="text-center"
            >
              <div className="max-w-3xl mx-auto card-glass p-12">
                <h2 className="text-3xl lg:text-4xl chakra-semibold text-light mb-6">
                  Ready to Scale Your Marketing?
                </h2>
                <p className="text-lg chakra-light text-muted mb-8">
                  Let's create a custom marketing strategy that drives real growth for your business.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setShowQuizModal(true)}
                    className="btn-primary"
                  >
                    Get Marketing Audit
                  </button>
                  <button className="btn-secondary">
                    View Pricing
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
        service="Digital Marketing"
      />
    </>
  );
};

export default DigitalMarketingPage;