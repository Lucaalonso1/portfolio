"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

interface LanguageModalProps {
  onLanguageSelect?: () => void;
}

const LanguageModal: React.FC<LanguageModalProps> = ({ onLanguageSelect }) => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('common');

  useEffect(() => {
    // Verificar si ya se ha seleccionado un idioma previamente
    const hasSelectedLanguage = localStorage.getItem('language-selected');
    
    if (!hasSelectedLanguage) {
      // Mostrar el modal después de un pequeño delay para mejor UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleLanguageSelect = (locale: string) => {
    // Marcar que ya se seleccionó un idioma
    localStorage.setItem('language-selected', 'true');
    localStorage.setItem('preferred-language', locale);
    
    // Redirigir a la página con el idioma seleccionado
    router.push(router.asPath, router.asPath, { locale });
    
    // Cerrar el modal
    setIsVisible(false);
    
    // Llamar al callback si existe
    if (onLanguageSelect) {
      onLanguageSelect();
    }
  };

  const handleClose = () => {
    // Si cierra sin seleccionar, usar el idioma por defecto
    localStorage.setItem('language-selected', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl border border-gray-200/50"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: "backOut" }}
              className="w-16 h-16 mx-auto mb-4 bg-black rounded-full flex items-center justify-center"
            >
              <span className="text-2xl">🌍</span>
            </motion.div>
            <h2 className="text-2xl font-bold text-black mb-2">
              {t('languageSelector.title')}
            </h2>
            <p className="text-gray-500 text-sm">
              {t('languageSelector.subtitle')}
            </p>
          </div>

          {/* Language Options */}
          <div className="space-y-3">
            <motion.button
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              whileHover={{ scale: 1.02, backgroundColor: '#000' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLanguageSelect('es')}
              className="w-full p-4 bg-black text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3 group border-2 border-black"
            >
              <span className="text-xl group-hover:scale-110 transition-transform duration-200">🇪🇸</span>
              <span>{t('languageSelector.spanish')}</span>
            </motion.button>

            <motion.button
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              whileHover={{ scale: 1.02, backgroundColor: '#f9fafb' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLanguageSelect('en')}
              className="w-full p-4 bg-white text-black rounded-2xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3 group border-2 border-black"
            >
              <span className="text-xl group-hover:scale-110 transition-transform duration-200">🇺🇸</span>
              <span>{t('languageSelector.english')}</span>
            </motion.button>
          </div>

          {/* Footer */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-6 text-center"
          >
            <p className="text-xs text-gray-400">
              Puedes cambiar el idioma en cualquier momento desde el menú
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LanguageModal;
