
// src/components/TrustPilot.jsx

import React from 'react';
import { motion } from 'framer-motion';

const TrustPilot = ({ className = '' }) => {
  const stars = Array(5).fill(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`flex items-center space-x-4 ${className}`}
    >
      {/* TrustPilot Logo */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-light rounded flex items-center justify-center">
          <span className="text-dark text-xs chakra-bold">T</span>
        </div>
        <span className="chakra-medium text-light text-sm">Trustpilot</span>
      </div>
      
      {/* Stars */}
      <div className="flex items-center space-x-1">
        {stars.map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
          >
            <i className="bi bi-star-fill text-yellow-400 text-lg"></i>
          </motion.div>
        ))}
      </div>
      
      {/* Rating */}
      <div className="flex items-center space-x-2">
        <span className="text-2xl chakra-bold text-light">5.0</span>
        <div className="text-sm text-muted">
          <div className="chakra-medium">Excellent</div>
          <div className="chakra-light">150+ reviews</div>
        </div>
      </div>
    </motion.div>
  );
};

export default TrustPilot;