"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

interface WelcomeScreenProps {
  onLanguageSelect?: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onLanguageSelect }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('common');

  useEffect(() => {
    // Mostrar la pantalla de bienvenida siempre al cargar la página
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleLanguageSelect = async (locale: string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSelectedLanguage(locale);
    
    // Guardar la preferencia de idioma y marcar como visitado
    localStorage.setItem('preferred-language', locale);
    sessionStorage.setItem('has-visited', 'true');
    
    // Ocultar la pantalla de bienvenida primero
    setIsVisible(false);
    
    // Pequeño delay para la animación de salida
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Redirigir usando router.push con un callback
    router.push(router.asPath, router.asPath, { locale }).then(() => {
      // Llamar al callback si existe
      if (onLanguageSelect) {
        onLanguageSelect();
      }
    }).catch(() => {
      // Fallback si router.push falla
      const currentPath = router.asPath === '/' ? '' : router.asPath;
      window.location.href = `/${locale}${currentPath}`;
    });
  };

  // No renderizar nada hasta que esté listo para mostrarse
  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      >
        {/* Fondo con partículas animadas */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Contenido principal */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative z-10 text-center max-w-2xl mx-4"
        >
          {/* Logo/Título principal */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-12"
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold text-white mb-4"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(255,255,255,0.5)",
                  "0 0 40px rgba(255,255,255,0.8)",
                  "0 0 20px rgba(255,255,255,0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Luca Alonso
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Desarrollador Full Stack
            </motion.p>
          </motion.div>

          {/* Selector de idiomas */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h2 
              className="text-2xl md:text-3xl font-semibold text-white mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {t('languageSelector.title')}
            </motion.h2>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {/* Español */}
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255, 255, 255, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLanguageSelect('es')}
                disabled={isAnimating}
                className={`
                  relative group px-8 py-6 rounded-2xl font-bold text-xl text-white
                  bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900
                  hover:from-gray-700 hover:via-gray-600 hover:to-gray-800
                  border border-gray-600 hover:border-gray-500
                  transition-all duration-300 min-w-[200px]
                  ${isAnimating && selectedLanguage !== 'es' ? 'opacity-50' : ''}
                  ${selectedLanguage === 'es' ? 'ring-2 ring-white ring-opacity-30' : ''}
                `}
                animate={selectedLanguage === 'es' ? {
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 0 rgba(255, 255, 255, 0.1)",
                    "0 0 20px rgba(255, 255, 255, 0.2)",
                    "0 0 0 rgba(255, 255, 255, 0.1)"
                  ]
                } : {}}
                transition={{ duration: 0.6, repeat: selectedLanguage === 'es' ? Infinity : 0 }}
              >
                <div className="flex items-center justify-center space-x-3">
                  <motion.span 
                    className="text-3xl"
                    animate={selectedLanguage === 'es' ? { rotate: [0, 360] } : {}}
                    transition={{ duration: 0.8 }}
                  >
                    🇪🇸
                  </motion.span>
                  <span>{t('languageSelector.spanish')}</span>
                </div>
                
                {/* Efecto de brillo sutil */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
              </motion.button>

              {/* Inglés */}
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255, 255, 255, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLanguageSelect('en')}
                disabled={isAnimating}
                className={`
                  relative group px-8 py-6 rounded-2xl font-bold text-xl text-white
                  bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900
                  hover:from-gray-700 hover:via-gray-600 hover:to-gray-800
                  border border-gray-600 hover:border-gray-500
                  transition-all duration-300 min-w-[200px]
                  ${isAnimating && selectedLanguage !== 'en' ? 'opacity-50' : ''}
                  ${selectedLanguage === 'en' ? 'ring-2 ring-white ring-opacity-30' : ''}
                `}
                animate={selectedLanguage === 'en' ? {
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 0 rgba(255, 255, 255, 0.1)",
                    "0 0 20px rgba(255, 255, 255, 0.2)",
                    "0 0 0 rgba(255, 255, 255, 0.1)"
                  ]
                } : {}}
                transition={{ duration: 0.6, repeat: selectedLanguage === 'en' ? Infinity : 0 }}
              >
                <div className="flex items-center justify-center space-x-3">
                  <motion.span 
                    className="text-3xl"
                    animate={selectedLanguage === 'en' ? { rotate: [0, 360] } : {}}
                    transition={{ duration: 0.8 }}
                  >
                    🇺🇸
                  </motion.span>
                  <span>{t('languageSelector.english')}</span>
                </div>
                
                {/* Efecto de brillo sutil */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
              </motion.button>
            </div>

            {/* Texto informativo */}
            <motion.p 
              className="text-sm text-gray-400 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              Puedes cambiar el idioma en cualquier momento desde el menú
            </motion.p>
          </motion.div>

          {/* Efectos de fondo adicionales */}
          <motion.div
            className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-red-500/20 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-l from-blue-500/20 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WelcomeScreen;