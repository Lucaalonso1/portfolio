"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

interface LanguageToggleProps {
  isLightHeader?: boolean;
  isMobile?: boolean;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ isLightHeader = false, isMobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLanguageChange = (locale: string) => {
    localStorage.setItem('preferred-language', locale);
    router.push(router.asPath, router.asPath, { locale });
    setIsOpen(false);
  };

  const getCurrentLanguage = () => {
    return router.locale === 'en' ? '🇺🇸' : '🇪🇸';
  };

  const getCurrentLanguageName = () => {
    return router.locale === 'en' ? 'English' : 'Español';
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: isMobile ? 1 : 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-300 ${
          isMobile 
            ? 'w-full justify-between border border-yellow-400/30 bg-yellow-400/10' 
            : ''
        } ${
          isLightHeader 
            ? 'text-black hover:bg-gray-100' 
            : 'text-white hover:bg-gray-800'
        }`}
      >
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getCurrentLanguage()}</span>
          {isMobile && (
            <span className="font-medium">{getCurrentLanguageName()}</span>
          )}
        </div>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full ${isMobile ? 'left-0 right-0' : 'right-0'} mt-2 ${isMobile ? 'w-full' : 'w-40'} rounded-lg shadow-lg border overflow-hidden z-50 ${
              isLightHeader 
                ? 'bg-white border-gray-200' 
                : 'bg-gray-800 border-gray-700'
            }`}
          >
            <button
              onClick={() => handleLanguageChange('es')}
              className={`w-full px-4 py-3 text-left transition-colors duration-200 flex items-center space-x-3 ${
                router.locale === 'es' 
                  ? (isLightHeader ? 'bg-blue-50 text-blue-600' : 'bg-blue-900/30 text-blue-400')
                  : (isLightHeader ? 'text-gray-700 hover:bg-gray-50' : 'text-gray-300 hover:bg-gray-700')
              }`}
            >
              <span className="text-lg">🇪🇸</span>
              <span className="font-medium">Español</span>
            </button>
            <button
              onClick={() => handleLanguageChange('en')}
              className={`w-full px-4 py-3 text-left transition-colors duration-200 flex items-center space-x-3 ${
                router.locale === 'en' 
                  ? (isLightHeader ? 'bg-blue-50 text-blue-600' : 'bg-blue-900/30 text-blue-400')
                  : (isLightHeader ? 'text-gray-700 hover:bg-gray-50' : 'text-gray-300 hover:bg-gray-700')
              }`}
            >
              <span className="text-lg">🇺🇸</span>
              <span className="font-medium">English</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageToggle;
