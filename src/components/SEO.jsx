// src/components/SEO.jsx

import React, { useEffect } from 'react';

const SEO = () => {
  useEffect(() => {
    // Update document title
    document.title = "JetLab Digital Agency | Premium Web Development, AI Integration & Digital Marketing Services in Chicago";

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Leading Chicago digital agency specializing in custom web development, AI integration, digital marketing, and SEO optimization. Trusted by Fortune 500 companies. Get your free consultation today!');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Leading Chicago digital agency specializing in custom web development, AI integration, digital marketing, and SEO optimization. Trusted by Fortune 500 companies. Get your free consultation today!';
      document.head.appendChild(meta);
    }

    // Add keywords meta tag
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'digital agency chicago, web development, AI integration, digital marketing, SEO optimization, custom websites, React development, marketing automation, enterprise solutions');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'digital agency chicago, web development, AI integration, digital marketing, SEO optimization, custom websites, React development, marketing automation, enterprise solutions';
      document.head.appendChild(meta);
    }

    // Add Open Graph meta tags
    const ogTags = [
      { property: 'og:title', content: 'JetLab Digital Agency | Premium Digital Solutions Chicago' },
      { property: 'og:description', content: 'Transform your business with cutting-edge web development, AI integration, and digital marketing services. Chicago-based agency trusted by Fortune 500 companies.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://jetlabco.com' },
      { property: 'og:image', content: 'https://jetlabco.com/og-image.jpg' },
      { property: 'og:site_name', content: 'JetLab Digital Agency' },
      { property: 'og:locale', content: 'en_US' }
    ];

    ogTags.forEach(tag => {
      let existingTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (existingTag) {
        existingTag.setAttribute('content', tag.content);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', tag.property);
        meta.content = tag.content;
        document.head.appendChild(meta);
      }
    });

    // Add Twitter Card meta tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@jetlabagency' },
      { name: 'twitter:title', content: 'JetLab Digital Agency | Premium Digital Solutions Chicago' },
      { name: 'twitter:description', content: 'Transform your business with cutting-edge web development, AI integration, and digital marketing services.' },
      { name: 'twitter:image', content: 'https://jetlabco.com/twitter-image.jpg' }
    ];

    twitterTags.forEach(tag => {
      let existingTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (existingTag) {
        existingTag.setAttribute('content', tag.content);
      } else {
        const meta = document.createElement('meta');
        meta.name = tag.name;
        meta.content = tag.content;
        document.head.appendChild(meta);
      }
    });

    // Add additional SEO meta tags
    const additionalTags = [
      { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
      { name: 'author', content: 'JetLab Digital Agency' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'theme-color', content: '#000000' },
      { name: 'msapplication-TileColor', content: '#000000' },
      { name: 'geo.region', content: 'US-IL' },
      { name: 'geo.placename', content: 'Chicago' },
      { name: 'geo.position', content: '41.8781;-87.6298' },
      { name: 'ICBM', content: '41.8781, -87.6298' }
    ];

    additionalTags.forEach(tag => {
      let existingTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (!existingTag) {
        const meta = document.createElement('meta');
        meta.name = tag.name;
        meta.content = tag.content;
        document.head.appendChild(meta);
      }
    });

    // Add canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://jetlabco.com');
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = 'https://jetlabco.com';
      document.head.appendChild(link);
    }

    // Add JSON-LD Schema for Organization
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "JetLab Digital Agency",
      "alternateName": "JetLab",
      "url": "https://jetlabco.com",
      "logo": "https://jetlabco.com/logo.png",
      "description": "Premier digital agency in Chicago specializing in web development, AI integration, digital marketing, and SEO optimization.",
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
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "41.8781",
          "longitude": "-87.6298"
        },
        "geoRadius": "50000"
      },
      "priceRange": "$$$$",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "150",
        "bestRating": "5",
        "worstRating": "1"
      }
    };

    // Add Service Schema
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Digital Agency Services",
      "provider": {
        "@type": "Organization",
        "name": "JetLab Digital Agency"
      },
      "serviceType": [
        "Web Development",
        "Digital Marketing",
        "AI Integration",
        "SEO Optimization"
      ],
      "description": "Comprehensive digital services including custom web development, AI integration, digital marketing campaigns, and SEO optimization.",
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      }
    };

    // Add WebSite Schema
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "JetLab Digital Agency",
      "url": "https://jetlabco.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://jetlabco.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };

    // Add ProfessionalService Schema
    const professionalServiceSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "JetLab Digital Agency",
      "image": "https://jetlabco.com/logo.png",
      "url": "https://jetlabco.com",
      "telephone": "+1-555-123-4567",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Digital Street",
        "addressLocality": "Chicago",
        "addressRegion": "IL",
        "postalCode": "60601",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 41.8781,
        "longitude": -87.6298
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday", 
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      },
      "priceRange": "$$$$"
    };

    // Combine all schemas
    const combinedSchema = {
      "@context": "https://schema.org",
      "@graph": [
        organizationSchema,
        serviceSchema,
        websiteSchema,
        professionalServiceSchema
      ]
    };

    // Remove existing schema if present
    const existingSchema = document.querySelector('script[type="application/ld+json"]');
    if (existingSchema) {
      existingSchema.remove();
    }

    // Add new schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(combinedSchema);
    document.head.appendChild(script);

    // Add hreflang tags for internationalization
    const hreflangTags = [
      { rel: 'alternate', hreflang: 'en-us', href: 'https://jetlabco.com' },
      { rel: 'alternate', hreflang: 'x-default', href: 'https://jetlabco.com' }
    ];

    hreflangTags.forEach(tag => {
      let existingTag = document.querySelector(`link[hreflang="${tag.hreflang}"]`);
      if (!existingTag) {
        const link = document.createElement('link');
        link.rel = tag.rel;
        link.hreflang = tag.hreflang;
        link.href = tag.href;
        document.head.appendChild(link);
      }
    });

  }, []);

  return null; // This component doesn't render anything visible
};

export default SEO;