import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import QuizModal from './QuizModal';

const WebDevelopmentPage = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [showQuizModal, setShowQuizModal] = useState(false);

  const technologies = [
    { name: 'React', icon: 'bi-code-slash', category: 'Frontend' },
    { name: 'Vue.js', icon: 'bi-code-square', category: 'Frontend' },
    { name: 'Angular', icon: 'bi-code', category: 'Frontend' },
    { name: 'Node.js', icon: 'bi-server', category: 'Backend' },
    { name: 'Python', icon: 'bi-braces', category: 'Backend' },
    { name: 'PHP', icon: 'bi-code-slash', category: 'Backend' },
    { name: 'MongoDB', icon: 'bi-database', category: 'Database' },
    { name: 'PostgreSQL', icon: 'bi-database-gear', category: 'Database' }
  ];

  const services = [
    {
      title: 'Custom Web Applications',
      description: 'Tailored web applications built from scratch to meet your specific business requirements.',
      features: [
        'Custom functionality development',
        'Database design and optimization',
        'API integrations',
        'Real-time features',
        'Admin panels and dashboards',
        'User authentication systems'
      ],
      icon: 'bi-window-desktop'
    },
    {
      title: 'E-commerce Solutions',
      description: 'Complete e-commerce platforms with advanced features for online businesses.',
      features: [
        'Shopping cart functionality',
        'Payment gateway integration',
        'Inventory management',
        'Order tracking systems',
        'Customer management',
        'Analytics and reporting'
      ],
      icon: 'bi-shop'
    },
    {
      title: 'Content Management Systems',
      description: 'User-friendly CMS solutions for easy content management and updates.',
      features: [
        'WordPress development',
        'Custom CMS solutions',
        'Content editing interfaces',
        'Multi-user management',
        'SEO optimization tools',
        'Plugin development'
      ],
      icon: 'bi-gear'
    },
    {
      title: 'Progressive Web Apps',
      description: 'Modern web applications with native app-like features and performance.',
      features: [
        'Offline functionality',
        'Push notifications',
        'App-like interface',
        'Fast loading times',
        'Cross-platform compatibility',
        'Installation prompts'
      ],
      icon: 'bi-phone'
    }
  ];

  const portfolio = [
    {
      title: 'E-commerce Platform',
      description: 'Multi-vendor marketplace with advanced features',
      tech: 'React, Node.js, MongoDB',
      metrics: '300% increase in sales'
    },
    {
      title: 'SaaS Dashboard',
      description: 'Real-time analytics platform for enterprise',
      tech: 'Vue.js, Python, PostgreSQL',
      metrics: '50% faster data processing'
    },
    {
      title: 'Healthcare Portal',
      description: 'Patient management system with telehealth',
      tech: 'Angular, .NET, SQL Server',
      metrics: '80% reduction in paperwork'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'We analyze your requirements, research your market, and create a detailed project roadmap.',
      icon: 'bi-lightbulb'
    },
    {
      step: '02',
      title: 'Design & Prototyping',
      description: 'Our designers create wireframes, mockups, and interactive prototypes for your approval.',
      icon: 'bi-palette'
    },
    {
      step: '03',
      title: 'Development & Testing',
      description: 'We build your application using best practices, with continuous testing and quality assurance.',
      icon: 'bi-code-slash'
    },
    {
      step: '04',
      title: 'Launch & Optimization',
      description: 'We deploy your application and provide ongoing support, monitoring, and optimization.',
      icon: 'bi-rocket-takeoff'
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
                <i className="bi bi-code-slash text-light"></i>
                <span className="chakra-medium text-light">Web Development</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl chakra-bold text-light mb-6">
                Custom Web Development{' '}
                <span className="text-light">Solutions</span>
              </h1>
              
              <p className="text-xl chakra-light text-muted max-w-4xl mx-auto leading-relaxed mb-8">
                Transform your ideas into powerful web applications with cutting-edge technologies. 
                We create scalable, secure, and user-friendly solutions that drive business growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowQuizModal(true)}
                  className="btn-primary"
                >
                  Start Your Project
                </button>
                <button className="btn-secondary">
                  View Portfolio
                </button>
              </div>
            </motion.div>

            {/* Technologies Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-20"
            >
              <h2 className="text-3xl chakra-semibold text-light text-center mb-12">
                Technologies We Master
              </h2>
              
              <div className="grid md:grid-cols-4 gap-6">
                {technologies.map((tech, index) => (
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
                    <h3 className="chakra-semibold text-light mb-1">{tech.name}</h3>
                    <p className="text-sm text-muted">{tech.category}</p>
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
                Our Web Development Services
              </h2>
              <p className="text-lg chakra-light text-muted max-w-3xl mx-auto">
                From simple websites to complex enterprise applications, we deliver solutions that exceed expectations.
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
                      <p className="chakra-light text-muted leading-relaxed">{service.description}</p>
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

        {/* Portfolio Section */}
        <section className="section-padding bg-dark">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl chakra-semibold text-light mb-6">
                Recent Projects
              </h2>
              <p className="text-lg chakra-light text-muted max-w-3xl mx-auto">
                Explore our latest web development projects and the results they delivered.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {portfolio.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                  className="card-glass p-8"
                >
                  <h3 className="text-xl chakra-semibold text-light mb-3">{project.title}</h3>
                  <p className="chakra-light text-muted mb-4">{project.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="text-sm text-muted">
                      <strong className="text-light">Tech Stack:</strong> {project.tech}
                    </div>
                    <div className="text-sm text-light font-semibold">
                      {project.metrics}
                    </div>
                  </div>
                  <button className="btn-secondary text-sm py-2 px-4">
                    View Case Study
                  </button>
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
              transition={{ duration: 0.4, delay: 1.2 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl chakra-semibold text-light mb-6">
                Our Development Process
              </h2>
              <p className="text-lg chakra-light text-muted max-w-3xl mx-auto">
                A proven methodology that ensures successful project delivery every time.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 1.3 + index * 0.1 }}
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
              transition={{ duration: 0.4, delay: 1.6 }}
              className="text-center"
            >
              <div className="max-w-3xl mx-auto card-glass p-12">
                <h2 className="text-3xl lg:text-4xl chakra-semibold text-light mb-6">
                  Ready to Build Your Web Application?
                </h2>
                <p className="text-lg chakra-light text-muted mb-8">
                  Let's discuss your project requirements and create a custom solution that drives your business forward.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setShowQuizModal(true)}
                    className="btn-primary"
                  >
                    Start Free Consultation
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
        service="Web Development"
      />
    </>
  );
};

export default WebDevelopmentPage;