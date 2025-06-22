// src/components/About.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const companies = [
    { name: 'Yandex', logo: 'bi-search', color: 'text-red-400' },
    { name: 'Aeroflot', logo: 'bi-airplane', color: 'text-blue-400' },
    { name: 'Facebook', logo: 'bi-facebook', color: 'text-blue-500' },
    { name: 'Google', logo: 'bi-google', color: 'text-green-400' }
  ];

  const teamStats = [
    { icon: 'bi-people', number: '15+', label: 'Expert Team Members' },
    { icon: 'bi-trophy', number: '150+', label: 'Successful Projects' },
    { icon: 'bi-globe', number: '25+', label: 'Countries Served' },
    { icon: 'bi-clock-history', number: '5+', label: 'Years of Excellence' }
  ];

  const values = [
    {
      icon: 'bi-lightbulb',
      title: 'Innovation First',
      description: 'We leverage cutting-edge technologies and creative solutions to stay ahead of industry trends and deliver exceptional results for our clients.'
    },
    {
      icon: 'bi-shield-check',
      title: 'Quality Assurance',
      description: 'Every project undergoes rigorous testing and quality control processes to ensure we deliver products that exceed expectations and industry standards.'
    },
    {
      icon: 'bi-speedometer2',
      title: 'Fast Delivery',
      description: 'Our streamlined processes and experienced team enable us to deliver high-quality solutions quickly without compromising on excellence.'
    },
    {
      icon: 'bi-headset',
      title: '24/7 Support',
      description: 'We provide round-the-clock support to ensure your digital solutions run smoothly and any issues are resolved immediately.'
    }
  ];

  return (
    <section id="about" ref={ref} className="section-padding bg-dark-800">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 glass-light rounded-full px-6 py-3 mb-6">
            <i className="bi bi-info-circle text-light"></i>
            <span className="chakra-medium text-light">About JetLab</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl chakra-bold text-light mb-6">
            Your Trusted{' '}
            <span className="text-light">Digital Partner</span>
          </h2>
          
          <p className="text-xl chakra-light text-muted max-w-4xl mx-auto leading-relaxed">
            We're a premier digital agency based in Chicago, dedicated to transforming businesses through innovative digital solutions. Our team of industry veterans has worked with global leaders to deliver exceptional results.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          
          {/* Left Column - Story */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-3xl chakra-semibold text-light">
                Expertise That Drives Results
              </h3>
              
              <p className="text-lg chakra-light text-muted leading-relaxed">
                Founded by a team of digital experts with extensive experience at top-tier technology companies, JetLab brings enterprise-level expertise to businesses of all sizes. Our professionals have contributed to major projects at industry leaders including Yandex, Aeroflot, and Facebook.
              </p>
              
              <p className="text-lg chakra-light text-muted leading-relaxed">
                We specialize in creating comprehensive digital ecosystems that not only meet current business needs but are also scalable for future growth. From custom web development and AI integration to advanced marketing automation and SEO optimization, we deliver solutions that drive measurable results.
              </p>
              
              <p className="text-lg chakra-light text-muted leading-relaxed">
                Our Chicago-based team combines technical excellence with creative innovation, ensuring every project we undertake sets new standards for digital excellence. We don't just build websites and applications – we craft digital experiences that transform how businesses connect with their audiences.
              </p>
            </div>

            {/* Company Experience */}
            <div className="space-y-4">
              <h4 className="text-xl chakra-semibold text-light">
                Trusted by Industry Leaders
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {companies.map((company, index) => (
                  <motion.div
                    key={company.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                    className="flex items-center space-x-3 p-4 bg-dark-600 rounded-xl border border-border"
                  >
                    <i className={`${company.logo} text-2xl ${company.color}`}></i>
                    <span className="chakra-medium text-light">{company.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Stats & Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {teamStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  className="card p-6 text-center"
                >
                  <div className="w-16 h-16 bg-dark-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <i className={`${stat.icon} text-light text-2xl`}></i>
                  </div>
                  <div className="text-3xl chakra-bold text-light mb-2">{stat.number}</div>
                  <div className="text-sm chakra-medium text-muted">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Mission Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="card-glass p-8"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="bi bi-rocket text-dark text-xl"></i>
                </div>
                <div>
                  <h4 className="text-xl chakra-semibold text-light mb-3">Our Mission</h4>
                  <p className="chakra-light text-muted leading-relaxed">
                    To empower businesses with innovative digital solutions that drive growth, enhance user experiences, and create lasting competitive advantages in the digital marketplace.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="space-y-12"
        >
          <div className="text-center">
            <h3 className="text-3xl lg:text-4xl chakra-semibold text-light mb-4">
              What Sets Us Apart
            </h3>
            <p className="text-lg chakra-light text-muted max-w-3xl mx-auto">
              Our core values drive everything we do, from project planning to final delivery and ongoing support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                className="card p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-dark-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className={`${value.icon} text-light text-2xl`}></i>
                </div>
                <h4 className="text-xl chakra-semibold text-light mb-3">{value.title}</h4>
                <p className="chakra-light text-muted text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;