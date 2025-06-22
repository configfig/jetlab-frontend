import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomSelect = ({ 
  options = [], 
  value = '', 
  onChange, 
  placeholder = 'Select an option',
  className = '',
  required = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);
  const selectRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle option selection
  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange({ target: { value: option } });
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      {/* Select Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`w-full input-field flex items-center justify-between cursor-pointer ${
          isOpen ? 'ring-2 ring-light/20 border-light' : ''
        } ${!selectedOption && 'text-muted'}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        required={required}
      >
        <span className="truncate">
          {selectedOption || placeholder}
        </span>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <i className="bi bi-chevron-down text-light"></i>
        </motion.div>
      </button>

      {/* Options Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-2 bg-dark-600 border border-border rounded-lg shadow-dark overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto scrollbar-thin">
              {options.map((option, index) => (
                <motion.button
                  key={option}
                  type="button"
                  onClick={() => handleSelect(option)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.02 }}
                  className={`w-full px-4 py-3 text-left hover:bg-dark-500 transition-colors duration-200 focus:outline-none focus:bg-dark-500 ${
                    selectedOption === option 
                      ? 'bg-dark-500 text-light' 
                      : 'text-muted hover:text-light'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="chakra-medium">{option}</span>
                    {selectedOption === option && (
                      <i className="bi bi-check text-light"></i>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden input for form submission */}
      <input
        type="hidden"
        name="service"
        value={selectedOption}
        required={required}
      />
    </div>
  );
};

export default CustomSelect;