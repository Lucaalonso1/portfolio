import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const useLanguage = () => {
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Verificar si ya se ha seleccionado un idioma
    const preferredLanguage = localStorage.getItem('preferred-language');
    
    if (preferredLanguage && router.locale !== preferredLanguage) {
      // Si hay un idioma preferido diferente al actual, redirigir
      router.push(router.asPath, router.asPath, { locale: preferredLanguage });
    } else if (!preferredLanguage) {
      // Si no hay idioma preferido, mostrar el selector
      setShowLanguageSelector(true);
    }
  }, [router]);

  const hideLanguageSelector = () => {
    setShowLanguageSelector(false);
  };

  return {
    showLanguageSelector,
    hideLanguageSelector
  };
};
