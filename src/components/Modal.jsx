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
  const getMaxWidth = () => {
    switch (size) {
      case 'sm': return '28rem';      // 448px
      case 'md': return '42rem';      // 672px  
      case 'lg': return '56rem';      // 896px
      case 'xl': return '72rem';      // 1152px
      default: return '42rem';
    }
  };

  if (!isOpen) return null;

  // КРИТИЧНО: Инлайн стили с максимальным приоритетом
  const portalStyles = {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0', 
    bottom: '0',
    zIndex: '999999',
    width: '100vw',
    height: '100vh',
    pointerEvents: 'auto',
    overflow: 'hidden'
  };

  const backdropStyles = {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0', 
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    overscrollBehavior: 'contain'
  };

  const contentStyles = {
    position: 'relative',
    width: '100%',
    maxWidth: getMaxWidth(),
    maxHeight: 'calc(100vh - 2rem)',
    backgroundColor: '#1a1a1a',
    border: '1px solid #333333',
    borderRadius: '1rem',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
    transform: 'none',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column'
  };

  const headerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.5rem',
    borderBottom: '1px solid #333333',
    backgroundColor: '#1a1a1a',
    flexShrink: '0'
  };

  const bodyStyles = {
    padding: '1.5rem',
    overflowY: 'auto',
    flex: '1',
    maxHeight: 'calc(100vh - 8rem)',
    WebkitOverflowScrolling: 'touch',
    overscrollBehavior: 'contain'
  };

  const closeButtonStyles = {
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '0.5rem',
    backgroundColor: '#2a2a2a',
    color: '#ffffff',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.3s ease',
    cursor: 'pointer',
    outline: 'none'
  };

  const titleStyles = {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: '"Chakra Petch", sans-serif'
  };

  // Мобильные стили
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    backdropStyles.padding = '0.75rem';
    contentStyles.maxHeight = 'calc(100vh - 1.5rem)';
    contentStyles.borderRadius = '0.75rem';
    headerStyles.padding = '1rem';
    bodyStyles.padding = '1rem';
    bodyStyles.maxHeight = 'calc(100vh - 6rem)';
    titleStyles.fontSize = '1.25rem';
  }

  return (
    <div style={portalStyles}>
      <div 
        style={backdropStyles}
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
            style={contentStyles}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={headerStyles}>
              <h3 style={titleStyles}>
                {title}
              </h3>
              <button
                onClick={onClose}
                style={closeButtonStyles}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#3a3a3a'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#2a2a2a'}
                aria-label="Close modal"
              >
                <i className="bi bi-x" style={{ fontSize: '1.25rem' }}></i>
              </button>
            </div>
            
            {/* Body */}
            <div style={bodyStyles}>
              {children}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Modal;