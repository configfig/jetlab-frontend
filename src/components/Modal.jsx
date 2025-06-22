// src/components/Modal.jsx

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop;
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.documentElement.style.overflow = 'hidden';
      
      // Add modal open class
      document.body.classList.add('modal-open');
      document.documentElement.classList.add('modal-open');
    } else {
      // Restore scroll
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.documentElement.style.overflow = '';
      
      // Remove classes
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('modal-open');
      
      // Restore scroll position
      if (scrollPositionRef.current) {
        window.scrollTo(0, scrollPositionRef.current);
        scrollPositionRef.current = 0;
      }
    }
    
    return () => {
      // Cleanup on unmount
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.documentElement.style.overflow = '';
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('modal-open');
      
      if (scrollPositionRef.current) {
        window.scrollTo(0, scrollPositionRef.current);
      }
    };
  }, [isOpen]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-portal-fixed">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="modal-backdrop-fixed"
          onClick={handleBackdropClick}
        >
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.3 }}
            className={`modal-content-fixed ${sizeClasses[size]}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="modal-header-fixed">
              <h3 className="text-xl lg:text-2xl chakra-semibold text-light">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="modal-close-btn-fixed"
                aria-label="Close modal"
              >
                <i className="bi bi-x text-xl"></i>
              </button>
            </div>
            
            {/* Body */}
            <div className="modal-body-fixed">
              {children}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Modal;