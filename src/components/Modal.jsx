// src/components/Modal.jsx

import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
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

  if (!isOpen) {
    return null;
  }

  const sizeClasses = {
    sm: 'modal-size-sm',
    md: 'modal-size-md', 
    lg: 'modal-size-lg',
    xl: 'modal-size-xl'
  };

  // Use React Portal to render modal at the top level
  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="modal-backdrop-enhanced"
          onClick={handleBackdropClick}
        >
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`modal-container-enhanced ${sizeClasses[size]}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Enhanced Header with gradient */}
            <div className="modal-header-enhanced">
              <div className="modal-header-content">
                <div className="modal-title-wrapper">
                  <div className="modal-title-icon">
                    <i className="bi bi-lightning-charge text-dark text-lg"></i>
                  </div>
                  <h3 className="modal-title-text">
                    {title}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="modal-close-btn-enhanced"
                  aria-label="Close modal"
                >
                  <i className="bi bi-x text-xl"></i>
                </button>
              </div>
              <div className="modal-header-border"></div>
            </div>
            
            {/* Enhanced Body with custom scrollbar */}
            <div className="modal-body-enhanced">
              <div className="modal-content-inner">
                {children}
              </div>
            </div>

            {/* Gradient overlays for better visual hierarchy */}
            <div className="modal-gradient-top"></div>
            <div className="modal-gradient-bottom"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;