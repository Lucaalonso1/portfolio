import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const useLanguage = () => {
  const router = useRouter();

  useEffect(() => {
    // Verificar si ya se ha seleccionado un idioma
    const preferredLanguage = localStorage.getItem('preferred-language');
    
    if (preferredLanguage && router.locale !== preferredLanguage) {
      // Si hay un idioma preferido diferente al actual, redirigir
      router.push(router.asPath, router.asPath, { locale: preferredLanguage });
    }
    // Ya no mostramos el selector automáticamente
  }, [router]);

  return {
    currentLanguage: router.locale || 'en'
  };
};
