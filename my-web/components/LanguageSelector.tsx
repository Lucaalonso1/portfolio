"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

interface LanguageSelectorProps {
  onLanguageSelect?: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onLanguageSelect }) => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('common');

  useEffect(() => {
    // Mostrar el selector después de un pequeño delay para mejor UX
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleLanguageSelect = (locale: string) => {
    // Guardar la preferencia de idioma en localStorage
    localStorage.setItem('preferred-language', locale);
    
    // Redirigir a la página con el idioma seleccionado
    router.push(router.asPath, router.asPath, { locale });
    
    // Llamar al callback si existe
    if (onLanguageSelect) {
      onLanguageSelect();
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {t('languageSelector.title')}
            </h2>
            <p className="text-gray-600 text-lg">
              {t('languageSelector.subtitle')}
            </p>
          </div>

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLanguageSelect('es')}
              className="w-full p-6 bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3"
            >
              <span className="text-2xl">🇪🇸</span>
              <span>{t('languageSelector.spanish')}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLanguageSelect('en')}
              className="w-full p-6 bg-gradient-to-r from-blue-500 to-red-500 text-white rounded-xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3"
            >
              <span className="text-2xl">🇺🇸</span>
              <span>{t('languageSelector.english')}</span>
            </motion.button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Puedes cambiar el idioma en cualquier momento desde el menú
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LanguageSelector;
