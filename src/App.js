import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SEO from './components/SEO';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import WebDevelopmentPage from './components/WebDevelopmentPage';
import DigitalMarketingPage from './components/DigitalMarketingPage';
import AIIntegrationPage from './components/AIIntegrationPage';
import SEOOptimizationPage from './components/SEOOptimizationPage';
import './App.css';

// Home Page Component
const HomePage = () => (
  <>
    <Hero />
    <About />
    <Services />
    <ContactForm />
  </>
);

function App() {
  return (
    <Router>
      <div className="App">
        {/* SEO Meta Tags and Schema */}
        <SEO />
        
        {/* Header - Fixed Navigation */}
        <Header />
        
        {/* Main Content with Routes */}
        <main>
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<HomePage />} />
            
            {/* Service Pages */}
            <Route path="/services/web-development" element={<WebDevelopmentPage />} />
            <Route path="/services/digital-marketing" element={<DigitalMarketingPage />} />
            <Route path="/services/ai-integration" element={<AIIntegrationPage />} />
            <Route path="/services/seo-optimization" element={<SEOOptimizationPage />} />
            
            {/* Fallback to home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        
        {/* Footer - Site Footer with Policy Modals */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;