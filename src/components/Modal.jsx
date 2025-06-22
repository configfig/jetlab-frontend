// src/components/Modal.jsx

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  
  useEffect(() => {
    if (isOpen) {
      // Блокируем скролл и фиксируем позицию
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      // Восстанавливаем скролл
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  // Закрытие по Escape
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

  // Размеры модалки
  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'w-full max-w-md';
      case 'md': return 'w-full max-w-2xl';
      case 'lg': return 'w-full max-w-4xl';
      case 'xl': return 'w-full max-w-6xl';
      default: return 'w-full max-w-2xl';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-portal-fixed">
      <div 
        className="modal-backdrop-fixed"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.3 }}
            className={`${getSizeClass()} modal-content-fixed`}
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
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Modal;