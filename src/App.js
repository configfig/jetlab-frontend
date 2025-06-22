import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SEO from './components/SEO';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

// Lazy load components for better performance
const Hero = React.lazy(() => import('./components/Hero'));
const About = React.lazy(() => import('./components/About'));
const Services = React.lazy(() => import('./components/Services'));
const ContactForm = React.lazy(() => import('./components/ContactForm'));
const WebDevelopmentPage = React.lazy(() => import('./components/WebDevelopmentPage'));
const DigitalMarketingPage = React.lazy(() => import('./components/DigitalMarketingPage'));
const AIIntegrationPage = React.lazy(() => import('./components/AIIntegrationPage'));
const SEOOptimizationPage = React.lazy(() => import('./components/SEOOptimizationPage'));

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-dark">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-dark-600 border-t-light rounded-full animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <i className="bi bi-lightning-charge text-light text-xl"></i>
      </div>
    </div>
  </div>
);

// Home Page Component with error boundary
const HomePage = () => {
  try {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <Hero />
        <About />
        <Services />
        <ContactForm />
      </Suspense>
    );
  } catch (error) {
    console.error('Error loading home page:', error);
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-light mb-4">Something went wrong</h1>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }
};

function App() {
  useEffect(() => {
    // Remove loading screen on app mount
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.style.transition = 'opacity 0.3s ease-out';
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
          loadingScreen.remove();
        }, 300);
      }, 100);
    }

    // Add app-loaded class for animations
    document.body.classList.add('app-loaded');

    // Preload critical fonts
    const preloadFont = (href) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    };

    // Performance optimizations
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Preload service worker if available
        if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
          navigator.serviceWorker.register('/sw.js').catch(console.error);
        }
      });
    }

    // Analytics and performance tracking (only in production)
    if (process.env.NODE_ENV === 'production') {
      // Track page load performance
      if ('performance' in window && 'timing' in performance) {
        window.addEventListener('load', () => {
          setTimeout(() => {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            
            // Log performance metrics (replace with your analytics)
            console.log('Page Load Time:', loadTime + 'ms');
            
            // Send to analytics if available
            if (window.gtag) {
              window.gtag('event', 'timing_complete', {
                name: 'load',
                value: loadTime
              });
            }
          }, 0);
        });
      }
    }

    // Error boundary for unhandled errors
    window.addEventListener('error', (event) => {
      console.error('Unhandled error:', event.error);
      // Send to error tracking service if available
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      // Send to error tracking service if available
    });

  }, []);

  return (
    <Router>
      <div className="App">
        {/* SEO Meta Tags and Schema */}
        <SEO />
        
        {/* Header - Fixed Navigation */}
        <Header />
        
        {/* Main Content with Routes */}
        <main role="main">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Home Page */}
              <Route path="/" element={<HomePage />} />
              
              {/* Service Pages */}
              <Route 
                path="/services/web-development" 
                element={<WebDevelopmentPage />} 
              />
              <Route 
                path="/services/digital-marketing" 
                element={<DigitalMarketingPage />} 
              />
              <Route 
                path="/services/ai-integration" 
                element={<AIIntegrationPage />} 
              />
              <Route 
                path="/services/seo-optimization" 
                element={<SEOOptimizationPage />} 
              />
              
              {/* Fallback to home for any unmatched routes */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </Suspense>
        </main>
        
        {/* Footer - Site Footer with Policy Modals */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;