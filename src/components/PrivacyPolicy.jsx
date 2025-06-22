import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = ({ onClose }) => {
  return (
    <div className="space-y-6 max-h-96 overflow-y-auto scrollbar-thin">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div>
          <h4 className="text-xl chakra-semibold text-light mb-3">Information We Collect</h4>
          <p className="text-muted chakra-light mb-4">
            JetLab Digital Agency ("we," "our," or "us") collects information you provide directly to us when you:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted chakra-light">
            <li>Contact us through our website forms</li>
            <li>Request consultations or quotes</li>
            <li>Subscribe to our newsletter</li>
            <li>Engage with our customer support</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl chakra-semibold text-light mb-3">Information Types</h4>
          <div className="space-y-3 text-muted chakra-light">
            <p><strong className="text-light">Personal Information:</strong> Name, email address, phone number, company name, and project details.</p>
            <p><strong className="text-light">Technical Information:</strong> IP address, browser type, device information, and website usage analytics.</p>
            <p><strong className="text-light">Communication Data:</strong> Records of correspondence and customer service interactions.</p>
          </div>
        </div>

        <div>
          <h4 className="text-xl chakra-semibold text-light mb-3">How We Use Your Information</h4>
          <ul className="list-disc list-inside space-y-2 text-muted chakra-light">
            <li>Provide and improve our digital services</li>
            <li>Respond to inquiries and provide customer support</li>
            <li>Send project updates and service notifications</li>
            <li>Analyze website usage and optimize user experience</li>
            <li>Comply with legal obligations</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl chakra-semibold text-light mb-3">Information Sharing</h4>
          <p className="text-muted chakra-light mb-4">
            We do not sell, rent, or share your personal information with third parties except:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted chakra-light">
            <li>With your explicit consent</li>
            <li>To trusted service providers who assist our operations</li>
            <li>When required by law or legal process</li>
            <li>To protect our rights and prevent fraud</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl chakra-semibold text-light mb-3">Data Security</h4>
          <p className="text-muted chakra-light">
            We implement industry-standard security measures including SSL encryption, secure servers, and access controls to protect your information. However, no internet transmission is 100% secure.
          </p>
        </div>

        <div>
          <h4 className="text-xl chakra-semibold text-light mb-3">Your Rights</h4>
          <p className="text-muted chakra-light mb-4">You have the right to:</p>
          <ul className="list-disc list-inside space-y-2 text-muted chakra-light">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
            <li>Data portability</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl chakra-semibold text-light mb-3">Cookies and Tracking</h4>
          <p className="text-muted chakra-light">
            We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and serve relevant content. You can control cookie settings through your browser.
          </p>
        </div>

        <div>
          <h4 className="text-xl chakra-semibold text-light mb-3">Contact Us</h4>
          <p className="text-muted chakra-light">
            For privacy-related questions or to exercise your rights, contact us at:
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

export default PrivacyPolicy;