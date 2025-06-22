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

// Enhanced loading spinner component
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
        <div className="text-center p-8">
          <h1 className="text-2xl text-light mb-4 chakra-semibold">Something went wrong</h1>
          <p className="text-muted mb-6">We're sorry, but something went wrong loading the page.</p>
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

// Enhanced Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-dark flex items-center justify-center">
          <div className="text-center p-8 max-w-md mx-auto">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="bi bi-exclamation-triangle text-red-400 text-3xl"></i>
            </div>
            <h1 className="text-2xl text-light mb-4 chakra-semibold">Oops! Something went wrong</h1>
            <p className="text-muted mb-6">We're sorry, but something unexpected happened. Please try refreshing the page.</p>
            <div className="space-y-3">
              <button 
                onClick={() => window.location.reload()} 
                className="btn-primary w-full"
              >
                Refresh Page
              </button>
              <button 
                onClick={() => window.location.href = '/'} 
                className="btn-secondary w-full"
              >
                Go to Homepage
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

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

    // Analytics and performance tracking (only in production)
    if (process.env.NODE_ENV === 'production') {
      // Track page load performance
      if ('performance' in window && 'timing' in performance) {
        window.addEventListener('load', () => {
          setTimeout(() => {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            
            // Log performance metrics
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

    // Global error handling for unhandled errors
    const handleError = (event) => {
      console.error('Unhandled error:', event.error);
      // Send to error tracking service if available
      if (window.gtag) {
        window.gtag('event', 'exception', {
          description: event.error?.message || 'Unknown error',
          fatal: false
        });
      }
    };

    const handleRejection = (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      // Send to error tracking service if available
      if (window.gtag) {
        window.gtag('event', 'exception', {
          description: event.reason?.message || 'Promise rejection',
          fatal: false
        });
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    // Cleanup
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };

  }, []);

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}

export default App;