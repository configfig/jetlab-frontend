import React from 'react';
import { motion } from 'framer-motion';

const TermsOfService = ({ onClose }) => {
  return (
    <div className="space-y-6 max-h-96 overflow-y-auto scrollbar-thin">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div>
          <h4 className="text-xl chakra-semibold text-light mb-3">Agreement to Terms</h4>
          <p className="text-muted chakra-light">
            By accessing and using JetLab Digital Agency's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
          </p>
        </div>

        <div>
          <h4 className="text-xl chakra-semibold text-light mb-3">Services Description</h4>
          <p className="text-muted chakra-light mb-4">
            JetLab provides comprehensive digital services including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted chakra-light">
            <li>Custom web development and design</li>
            <li>Digital marketing and SEO services</li>
            <li>AI integration and automation solutions</li>
            <li>Consulting and strategy development</li>
            <li>Ongoing maintenance and support</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl chakra-semibold text-light mb-3">Client Responsibilities</h4>
          <p className="text-muted chakra-light mb-4">As our client, you agree to:</p>
          <ul className="list-disc list-inside space-y-2 text-muted chakra-light">
            <li>Provide accurate and complete information</li>
            <li>Respond to requests for feedback within agreed timeframes</li>
            <li>Make timely payments as per agreed terms</li>
            <li>Provide necessary access and materials</li>
            <li>Use our services in compliance with applicable laws</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl chakra-semibold text-light mb-3">Payment Terms</h4>
          <div className="space-y-3 text-muted chakra-light">
            <p><strong className="text-light">Project Payments:</strong> Typically structured as 50% upfront, 50% upon completion unless otherwise agreed.</p>
            <p><strong className="text-light">Monthly Services:</strong> Billed in advance on a monthly basis.</p>
            <p><strong className="text-light">Late Payments:</strong> Interest may be charged on overdue amounts at 1.5% per month.</p>
            <p><strong className="text-light">Refunds:</strong> Available within 30 days if project has not commenced.</p>
          </div>
        </div>

        <div>
          <h4 className="text-xl chakra-semibold text-light mb-3">Intellectual Property</h4>
          <div className="space-y-3 text-muted chakra-light">
            <p><strong className="text-light">Client Content:</strong> You retain ownership of all content you provide.</p>
            <p><strong className="text-light">Developed Work:</strong> Upon full payment, you receive ownership of custom-developed work.</p>
            <p><strong className="text-light">Third-Party Tools:</strong> Licenses for third-party software remain with original owners.</p>
            <p><strong className="text-light">JetLab IP:</strong> Our methodologies, processes, and proprietary tools remain our property.</p>
          </div>
        </div>

        <div>
          <h4 className="text-xl chakra-semibold text-light mb-3">Confidentiality</h4>
          <p className="text-muted chakra-light">
            We maintain strict confidentiality of all client information and proprietary data. We will not disclose confidential information to third parties without written consent, except as required by law.
          </p>
        </div>

        <div>
          <h4 className="text-xl chakra-semibold text-light mb-3">Limitation of Liability</h4>
          <p className="text-muted chakra-light">
            JetLab's liability is limited to the amount paid for services. We are not liable for indirect, incidental, or consequential damages, including but not limited to loss of profits, data, or business opportunities.
          </p>
        </div>

        <div>
          <h4 className="text-xl chakra-semibold text-light mb-3">Termination</h4>
          <p className="text-muted chakra-light mb-4">
            Either party may terminate services with 30 days written notice. Immediate termination may occur for:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted chakra-light">
            <li>Material breach of agreement</li>
            <li>Non-payment of fees</li>
            <li>Illegal or unethical use of services</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl chakra-semibold text-light mb-3">Dispute Resolution</h4>
          <p className="text-muted chakra-light">
            Any disputes will be resolved through binding arbitration in Chicago, Illinois, under the rules of the American Arbitration Association. Illinois law governs these terms.
          </p>
        </div>

        <div>
          <h4 className="text-xl chakra-semibold text-light mb-3">Changes to Terms</h4>
          <p className="text-muted chakra-light">
            We reserve the right to modify these terms at any time. Significant changes will be communicated via email. Continued use of our services constitutes acceptance of revised terms.
          </p>
        </div>

        <div>
          <h4 className="text-xl chakra-semibold text-light mb-3">Contact Information</h4>
          <p className="text-muted chakra-light">
            For questions about these Terms of Service:
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

export default TermsOfService;