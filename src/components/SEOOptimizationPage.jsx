import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import QuizModal from './QuizModal';

const SEOOptimizationPage = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [showQuizModal, setShowQuizModal] = useState(false);

  const seoTools = [
    { name: 'Google Analytics', icon: 'bi-graph-up', category: 'Analytics' },
    { name: 'Search Console', icon: 'bi-search', category: 'Google Tools' },
    { name: 'Semrush', icon: 'bi-bar-chart', category: 'SEO Platform' },
    { name: 'Ahrefs', icon: 'bi-link-45deg', category: 'Backlink Analysis' },
    { name: 'Screaming Frog', icon: 'bi-bug', category: 'Technical SEO' },
    { name: 'Schema.org', icon: 'bi-code-square', category: 'Structured Data' },
    { name: 'PageSpeed Insights', icon: 'bi-speedometer2', category: 'Performance' },
    { name: 'GTM', icon: 'bi-tag', category: 'Tag Management' }
  ];

  const services = [
    {
      title: 'Technical SEO Optimization',
      description: 'Fix technical issues that prevent search engines from properly crawling and indexing your website.',
      features: [
        'Site speed optimization',
        'Mobile-first indexing setup',
        'XML sitemap creation',
        'Robots.txt optimization',
        'Schema markup implementation',
        'Core Web Vitals improvement',
        'SSL certificate setup',
        'Canonical URL implementation'
      ],
      icon: 'bi-gear-wide-connected',
      timeline: '2-4 weeks'
    },
    {
      title: 'Keyword Research & Strategy',
      description: 'Identify high-value keywords and create content strategies that drive targeted traffic.',
      features: [
        'Comprehensive keyword analysis',
        'Competitor keyword research',
        'Search intent mapping',
        'Long-tail keyword identification',
        'Keyword difficulty assessment',
        'Content gap analysis',
        'Seasonal trend analysis',
        'Local keyword research'
      ],
      icon: 'bi-search',
      timeline: '1-2 weeks'
    },
    {
      title: 'On-Page SEO Optimization',
      description: 'Optimize individual pages to rank higher and earn more relevant traffic from search engines.',
      features: [
        'Title tag optimization',
        'Meta description enhancement',
        'Header structure improvement',
        'Internal linking strategy',
        'Image optimization & alt text',
        'URL structure optimization',
        'Content optimization',
        'Featured snippet optimization'
      ],
      icon: 'bi-file-text',
      timeline: '3-6 weeks'
    },
    {
      title: 'Link Building & Authority',
      description: 'Build high-quality backlinks to increase your domain authority and search rankings.',
      features: [
        'High-authority link acquisition',
        'Guest posting campaigns',
        'Broken link building',
        'Resource page outreach',
        'Digital PR campaigns',
        'Competitor backlink analysis',
        'Disavow toxic links',
        'Link building strategy'
      ],
      icon: 'bi-link-45deg',
      timeline: 'Ongoing'
    }
  ];

  const rankings = [
    {
      client: 'Local Restaurant Chain',
      keywords: '850+ keywords',
      position: 'Top 3 positions',
      traffic: '400% organic traffic increase',
      timeline: '6 months'
    },
    {
      client: 'SaaS Company',
      keywords: '1,200+ keywords',
      position: 'First page rankings',
      traffic: '600% organic lead increase',
      timeline: '8 months'
    },
    {
      client: 'E-commerce Store',
      keywords: '2,000+ keywords',
      position: 'Top 5 positions',
      traffic: '300% revenue increase',
      timeline: '12 months'
    }
  ];

  const seoMetrics = [
    {
      metric: 'Average Ranking Improvement',
      value: '+40 positions',
      description: 'Average keyword position improvement within 6 months',
      icon: 'bi-arrow-up-circle'
    },
    {
      metric: 'Organic Traffic Growth',
      value: '+350%',
      description: 'Average increase in organic website traffic',
      icon: 'bi-graph-up-arrow'
    },
    {
      metric: 'Conversion Rate Boost',
      value: '+85%',
      description: 'Improvement in organic traffic conversion rates',
      icon: 'bi-target'
    },
    {
      metric: 'Page Load Speed',
      value: '-60%',
      description: 'Reduction in page load times through optimization',
      icon: 'bi-speedometer2'
    }
  ];

  const auditChecklist = [
    { category: 'Technical SEO', items: ['Site Speed', 'Mobile Responsiveness', 'Crawlability', 'Indexability'] },
    { category: 'On-Page SEO', items: ['Title Tags', 'Meta Descriptions', 'Header Structure', 'Content Quality'] },
    { category: 'Content Analysis', items: ['Keyword Usage', 'Content Gaps', 'Duplicate Content', 'Readability'] },
    { category: 'Off-Page SEO', items: ['Backlink Profile', 'Domain Authority', 'Local Citations', 'Social Signals'] }
  ];

  const process = [
    {
      step: '01',
      title: 'SEO Audit & Analysis',
      description: 'Comprehensive analysis of your current SEO performance and identification of improvement opportunities.',
      icon: 'bi-search'
    },
    {
      step: '02',
      title: 'Strategy Development',
      description: 'Create a customized SEO strategy based on your business goals and competitive landscape.',
      icon: 'bi-diagram-3'
    },
    {
      step: '03',
      title: 'Implementation',
      description: 'Execute technical fixes, content optimization, and link building campaigns.',
      icon: 'bi-tools'
    },
    {
      step: '04',
      title: 'Monitoring & Reporting',
      description: 'Track progress, measure results, and continuously optimize for better performance.',
      icon: 'bi-graph-up'
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
                <i className="bi bi-search text-light"></i>
                <span className="chakra-medium text-light">SEO Optimization</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl chakra-bold text-light mb-6">
                Dominate Search{' '}
                <span className="text-light">Rankings</span>
              </h1>
              
              <p className="text-xl chakra-light text-muted max-w-4xl mx-auto leading-relaxed mb-8">
                Get your website to the top of Google with our comprehensive SEO strategies. 
                We combine technical optimization, content excellence, and authority building to drive organic growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowQuizModal(true)}
                  className="btn-primary"
                >
                  Get SEO Audit
                </button>
                <button className="btn-secondary">
                  View Rankings
                </button>
              </div>
            </motion.div>

            {/* SEO Tools Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-20"
            >
              <h2 className="text-3xl chakra-semibold text-light text-center mb-12">
                Professional SEO Tools We Use
              </h2>
              
              <div className="grid md:grid-cols-4 gap-6">
                {seoTools.map((tool, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                    className="card p-6 text-center hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-16 h-16 bg-dark-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <i className={`${tool.icon} text-light text-2xl`}></i>
                    </div>
                    <h3 className="chakra-semibold text-light mb-1 text-sm">{tool.name}</h3>
                    <p className="text-xs text-muted">{tool.category}</p>
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
                Complete SEO Services
              </h2>
              <p className="text-lg chakra-light text-muted max-w-3xl mx-auto">
                Everything you need to achieve and maintain top search engine rankings.
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
                  <div className="grid lg:grid-cols-4 gap-8 items-start">
                    <div className="lg:col-span-3">
                      <div className="flex items-start space-x-4 mb-6">
                        <div className="w-16 h-16 bg-light rounded-xl flex items-center justify-center flex-shrink-0">
                          <i className={`${service.icon} text-dark text-2xl`}></i>
                        </div>
                        <div>
                          <div className="flex items-center space-x-4 mb-3">
                            <h3 className="text-2xl chakra-semibold text-light">{service.title}</h3>
                            <span className="px-3 py-1 bg-light/10 rounded-full text-light text-sm chakra-medium">
                              {service.timeline}
                            </span>
                          </div>
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
                      <h4 className="chakra-semibold text-light mb-3">Get Started</h4>
                      <p className="text-muted text-sm mb-4">Ready to improve your search rankings?</p>
                      <button
                        onClick={() => setShowQuizModal(true)}
                        className="btn-secondary w-full text-sm py-2"
                      >
                        Request Quote
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="section-padding bg-dark">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl chakra-semibold text-light mb-6">
                Proven SEO Results
              </h2>
              <p className="text-lg chakra-light text-muted max-w-3xl mx-auto">
                Our data-driven approach delivers measurable improvements in search performance.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {seoMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                  className="text-center card-glass p-6"
                >
                  <div className="w-20 h-20 bg-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i className={`${metric.icon} text-dark text-2xl`}></i>
                  </div>
                  <div className="text-3xl chakra-bold text-light mb-2">{metric.value}</div>
                  <h3 className="chakra-semibold text-light mb-3">{metric.metric}</h3>
                  <p className="chakra-light text-muted text-sm">{metric.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Client Results */}
            <div className="grid md:grid-cols-3 gap-8">
              {rankings.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 1.3 + index * 0.1 }}
                  className="card p-8"
                >
                  <h3 className="text-xl chakra-semibold text-light mb-4">{result.client}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted text-sm">Keywords Ranked:</span>
                      <span className="text-light chakra-semibold text-sm">{result.keywords}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted text-sm">Average Position:</span>
                      <span className="text-light chakra-semibold text-sm">{result.position}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted text-sm">Results:</span>
                      <span className="text-light chakra-semibold text-sm">{result.traffic}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted text-sm">Timeline:</span>
                      <span className="text-light chakra-semibold text-sm">{result.timeline}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Audit Checklist Section */}
        <section className="section-padding bg-dark-800">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 1.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl chakra-semibold text-light mb-6">
                Free SEO Audit Checklist
              </h2>
              <p className="text-lg chakra-light text-muted max-w-3xl mx-auto">
                See what we analyze in our comprehensive SEO audit process.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {auditChecklist.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 1.7 + index * 0.1 }}
                  className="card p-6"
                >
                  <h3 className="text-xl chakra-semibold text-light mb-4">{category.category}</h3>
                  <div className="space-y-3">
                    {category.items.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <i className="bi bi-check-square text-light"></i>
                        <span className="chakra-medium text-muted text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
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
              transition={{ duration: 0.4, delay: 2.0 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl chakra-semibold text-light mb-6">
                Our SEO Process
              </h2>
              <p className="text-lg chakra-light text-muted max-w-3xl mx-auto">
                A proven methodology that consistently delivers top search rankings.
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
        <section className="section-padding bg-dark-800">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 2.4 }}
              className="text-center"
            >
              <div className="max-w-3xl mx-auto card-glass p-12">
                <h2 className="text-3xl lg:text-4xl chakra-semibold text-light mb-6">
                  Ready to Rank #1 on Google?
                </h2>
                <p className="text-lg chakra-light text-muted mb-8">
                  Get a free SEO audit and discover how we can improve your search rankings.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setShowQuizModal(true)}
                    className="btn-primary"
                  >
                    Get Free SEO Audit
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
        service="SEO Optimization"
      />
    </>
  );
};

export default SEOOptimizationPage;