// src/components/Modal.jsx

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  
  useEffect(() => {
    if (isOpen) {
      // Блокируем скролл
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      // Восстанавливаем скролл
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    
    return () => {
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
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
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
          className={`${getSizeClass()} bg-dark-700 border border-border rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border bg-dark-700 flex-shrink-0">
            <h3 className="text-xl lg:text-2xl chakra-semibold text-light">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg bg-dark-600 hover:bg-dark-500 transition-colors duration-200 flex items-center justify-center text-light"
              aria-label="Close modal"
            >
              <i className="bi bi-x text-xl"></i>
            </button>
          </div>
          
          {/* Body */}
          <div className="p-6 overflow-y-auto flex-1">
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Modal;