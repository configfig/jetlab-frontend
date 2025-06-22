// src/components/Modal.jsx

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  const scrollPositionRef = useRef(0);
  const modalPortalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Сохраняем текущую позицию скролла
      scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop;
      
      // Блокируем скролл body
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.documentElement.style.overflow = 'hidden';
      
      // Добавляем класс для модалки
      document.body.classList.add('modal-open');
      document.documentElement.classList.add('modal-open');
    } else {
      // Восстанавливаем скролл
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.documentElement.style.overflow = '';
      
      // Убираем классы
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('modal-open');
      
      // Восстанавливаем позицию скролла
      if (scrollPositionRef.current) {
        window.scrollTo(0, scrollPositionRef.current);
        scrollPositionRef.current = 0;
      }
    }
    
    return () => {
      // Очищаем при размонтировании
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
    sm: 'modal-size-sm',
    md: 'modal-size-md',
    lg: 'modal-size-lg',
    xl: 'modal-size-xl'
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-portal" ref={modalPortalRef}>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="modal-overlay"
          onClick={handleBackdropClick}
        >
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.3 }}
            className={`modal-content ${sizeClasses[size]}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="modal-header">
              <h3 className="modal-title">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="modal-close-button"
                aria-label="Close modal"
              >
                <i className="bi bi-x"></i>
              </button>
            </div>
            
            {/* Body */}
            <div className="modal-body">
              {children}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Modal;