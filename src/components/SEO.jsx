// src/components/SEO.jsx

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = () => {
  const location = useLocation();

  useEffect(() => {
    // Page-specific meta data
    const getPageMeta = () => {
      switch (location.pathname) {
        case '/services/web-development':
          return {
            title: 'Custom Web Development Services | React, Node.js, Python | JetLab Chicago',
            description: 'Expert web development services in Chicago. Custom websites, web applications, e-commerce platforms, and PWAs. React, Vue.js, Node.js, Python. Free consultation.',
            keywords: 'web development chicago, custom websites, react development, node.js, python web development, progressive web apps, e-commerce development'
          };
        case '/services/digital-marketing':
          return {
            title: 'Digital Marketing Agency Chicago | PPC, SEO, Social Media | JetLab',
            description: 'Full-service digital marketing agency in Chicago. PPC advertising, social media marketing, content marketing, email campaigns. Proven ROI results.',
            keywords: 'digital marketing chicago, ppc advertising, social media marketing, content marketing, email marketing, google ads, facebook ads'
          };
        case '/services/ai-integration':
          return {
            title: 'AI Integration Services | Machine Learning, Automation | JetLab Chicago',
            description: 'Transform your business with AI integration services. Machine learning, chatbots, process automation, predictive analytics. Enterprise AI solutions.',
            keywords: 'ai integration, machine learning, artificial intelligence, chatbots, process automation, predictive analytics, ai development'
          };
        case '/services/seo-optimization':
          return {
            title: 'SEO Optimization Services Chicago | Top Google Rankings | JetLab',
            description: 'Professional SEO services in Chicago. Technical SEO, keyword research, on-page optimization, link building. Get to the top of Google search results.',
            keywords: 'seo services chicago, search engine optimization, google rankings, keyword research, technical seo, link building'
          };
        default:
          return {
            title: 'JetLab Digital Agency | Premium Web Development, AI Integration & Digital Marketing Services in Chicago',
            description: 'Leading Chicago digital agency specializing in custom web development, AI integration, digital marketing, and SEO optimization. Trusted by Fortune 500 companies. Get your free consultation today!',
            keywords: 'digital agency chicago, web development, AI integration, digital marketing, SEO optimization, custom websites, React development, marketing automation, enterprise solutions'
          };
      }
    };

    const { title, description, keywords } = getPageMeta();

    // Update document title
    document.title = title;

    // Update meta description
    const updateOrCreateMeta = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    const updateOrCreateProperty = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    // Update basic meta tags
    updateOrCreateMeta('description', description);
    updateOrCreateMeta('keywords', keywords);

    // Update Open Graph tags
    updateOrCreateProperty('og:title', title);
    updateOrCreateProperty('og:description', description);
    updateOrCreateProperty('og:url', `https://jetlabco.com${location.pathname}`);

    // Update Twitter tags
    updateOrCreateMeta('twitter:title', title);
    updateOrCreateMeta('twitter:description', description);

    // Update canonical URL - ИСПРАВЛЕНО: заменили let на const
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', `https://jetlabco.com${location.pathname}`);
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = `https://jetlabco.com${location.pathname}`;
      document.head.appendChild(link);
    }

    // Update structured data for specific pages
    const updateStructuredData = () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.remove();
      }

      let structuredData = {};

      if (location.pathname.startsWith('/services/')) {
        // Service-specific structured data
        const serviceName = location.pathname.split('/').pop().replace('-', ' ');
        structuredData = {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": serviceName.charAt(0).toUpperCase() + serviceName.slice(1),
          "provider": {
            "@type": "Organization",
            "name": "JetLab Digital Agency",
            "url": "https://jetlabco.com"
          },
          "description": description,
          "areaServed": {
            "@type": "Country",
            "name": "United States"
          },
          "url": `https://jetlabco.com${location.pathname}`
        };
      } else {
        // Homepage structured data
        structuredData = {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "name": "JetLab Digital Agency",
              "alternateName": "JetLab",
              "url": "https://jetlabco.com",
              "logo": "https://jetlabco.com/logo.png",
              "description": description,
              "foundingDate": "2019",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Chicago",
                "addressRegion": "IL",
                "addressCountry": "US"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-555-123-4567",
                "email": "info@jetlabco.com",
                "contactType": "customer service",
                "availableLanguage": "English"
              },
              "sameAs": [
                "https://linkedin.com/company/jetlab-agency",
                "https://twitter.com/jetlabagency",
                "https://facebook.com/jetlabagency",
                "https://instagram.com/jetlabagency"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "150",
                "bestRating": "5",
                "worstRating": "1"
              }
            },
            {
              "@type": "WebSite",
              "name": "JetLab Digital Agency",
              "url": "https://jetlabco.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://jetlabco.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          ]
        };
      }

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    };

    updateStructuredData();

    // Add page-specific CSS classes to body
    const addPageClass = () => {
      document.body.className = document.body.className.replace(/page-[\w-]+/g, '');
      const pageClass = location.pathname === '/' ? 'page-home' : `page-${location.pathname.split('/').pop()}`;
      document.body.classList.add(pageClass);
    };

    addPageClass();

    // Preload critical resources for better performance
    const preloadCriticalResources = () => {
      const preloadLink = (href, as, type = null) => {
        if (!document.querySelector(`link[href="${href}"]`)) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = href;
          link.as = as;
          if (type) link.type = type;
          document.head.appendChild(link);
        }
      };

      // Preload fonts
      preloadLink('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;500;600;700&display=swap', 'style');
    };

    preloadCriticalResources();

  }, [location]);

  return null; // This component doesn't render anything visible
};

export default SEO;