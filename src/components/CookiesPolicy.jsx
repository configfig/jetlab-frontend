// src/components/CookiesPolicy.jsx

import React from 'react';
import { motion } from 'framer-motion';

const CookiesPolicy = ({ onClose }) => {
  return (
    <div className="space-y-6 max-h-96 overflow-y-auto scrollbar-thin">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div>
          <h4 className="text-xl chakra-semibold text-light mb-3">What Are Cookies</h4>
          <p className="text-muted chakra-light">
            Cookies are small text files stored on your device when you visit our website. They help us provide you with a better browsing experience by remembering your preferences and analyzing site usage.
          </p>
        </div>

        <div>
          <h4 className="text-xl chakra-semibold text-light mb-3">Types of Cookies We Use</h4>
          
          <div className="space-y-4">
            <div className="p-4 bg-dark-600 rounded-lg">
              <h5 className="chakra-semibold text-light mb-2">Essential Cookies</h5>
              <p className="text-muted chakra-light text-sm">
                Required for basic website functionality, including security, navigation, and form submissions. These cannot be disabled.
              </p>
            </div>

            <div className="p-4 bg-dark-600 rounded-lg">
              <h5 className="chakra-semibold text-light mb-2">Performance Cookies</h5>
              <p className="text-muted chakra-light text-sm">
                Help us understand how visitors interact with our website by collecting anonymous analytics data about page views, bounce rates, and user behavior.
              </p>
            </div>

            <div className="p-4 bg-dark-600 rounded-lg">
              <h5 className="chakra-semibold text-light mb-2">Functional Cookies</h5>
              <p className="text-muted chakra-light text-sm">
                Remember your preferences such as language settings, contact form data, and customization options to enhance your user experience.
              </p>
            </div>

            <div className="p-4 bg-dark-600 rounded-lg">
              <h5 className="chakra-semibold text-light mb-2">Marketing Cookies</h5>
              <p className="text-muted chakra-light text-sm">
                Track your browsing habits to deliver relevant advertisements and measure the effectiveness of our marketing campaigns.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-xl chakra-semibold text-light mb-3">Third-Party Cookies</h4>
          <p className="text-muted chakra-light mb-4">
            We may use third-party services that set their own cookies:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted chakra-light">
            <li><strong className="text-light">Google Analytics:</strong> Website traffic and user behavior analysis</li>
            <li><strong className="text-light">Google Ads:</strong> Advertising and remarketing campaigns</li>
            <li><strong className="text-light">Facebook Pixel:</strong> Social media advertising and conversion tracking</li>
            <li><strong className="text-light">LinkedIn Insights:</strong> Professional network advertising</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl chakra-semibold text-light mb-3">Cookie Duration</h4>
          <div className="space-y-3 text-muted chakra-light">
            <p><strong className="text-light">Session Cookies:</strong> Deleted when you close your browser</p>
            <p><strong className="text-light">Persistent Cookies:</strong> Remain on your device for a set period (typically 1-2 years)</p>
            <p><strong className="text-light">Third-Party Cookies:</strong> Duration determined by the respective service provider</p>
          </div>
        </div>

        <div>
          <h4 className="text-xl chakra-semibold text-light mb-3">Managing Your Cookie Preferences</h4>
          <p className="text-muted chakra-light mb-4">
            You can control cookies through:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted chakra-light">
            <li>Browser settings - disable or delete cookies</li>
            <li>Our cookie consent banner when you first visit</li>
            <li>Opt-out links provided by third-party services</li>
            <li>Privacy settings in your browser</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl chakra-semibold text-light mb-3">Browser-Specific Instructions</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-dark-600 rounded">
              <h6 className="chakra-semibold text-light mb-1">Chrome</h6>
              <p className="text-muted chakra-light">Settings → Privacy → Cookies</p>
            </div>
            <div className="p-3 bg-dark-600 rounded">
              <h6 className="chakra-semibold text-light mb-1">Firefox</h6>
              <p className="text-muted chakra-light">Options → Privacy → Cookies</p>
            </div>
            <div className="p-3 bg-dark-600 rounded">
              <h6 className="chakra-semibold text-light mb-1">Safari</h6>
              <p className="text-muted chakra-light">Preferences → Privacy → Cookies</p>
            </div>
            <div className="p-3 bg-dark-600 rounded">
              <h6 className="chakra-semibold text-light mb-1">Edge</h6>
              <p className="text-muted chakra-light">Settings → Privacy → Cookies</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-xl chakra-semibold text-light mb-3">Impact of Disabling Cookies</h4>
          <p className="text-muted chakra-light mb-4">
            Disabling cookies may affect:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted chakra-light">
            <li>Website functionality and user experience</li>
            <li>Ability to remember your preferences</li>
            <li>Contact form functionality</li>
            <li>Analytics and improvement capabilities</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl chakra-semibold text-light mb-3">Updates to This Policy</h4>
          <p className="text-muted chakra-light">
            We may update this Cookies Policy periodically to reflect changes in our practices or applicable laws. We encourage you to review this page regularly for the latest information.
          </p>
        </div>

        <div>
          <h4 className="text-xl chakra-semibold text-light mb-3">Contact Us</h4>
          <p className="text-muted chakra-light">
            If you have questions about our use of cookies:
          </p>
          <div className="mt-2 text-light">
            <p>Email: k.websupp@gmail.com</p>
            <p>Address: Chicago, Illinois, USA</p>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <p className="text-sm text-muted chakra-light">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default CookiesPolicy;