# Configuración de Idiomas

Este proyecto ahora incluye soporte completo para múltiples idiomas (Español e Inglés).

## Características

- **Selector de idioma inicial**: Al entrar por primera vez, aparece un modal para seleccionar el idioma
- **Toggle de idioma**: Botón en el navbar para cambiar idioma en cualquier momento
- **Persistencia**: La preferencia de idioma se guarda en localStorage
- **Rutas localizadas**: Las URLs incluyen el prefijo del idioma (ej: `/es/`, `/en/`)

## Archivos principales

- `components/LanguageSelector.tsx` - Modal inicial de selección de idioma
- `components/LanguageToggle.tsx` - Botón para cambiar idioma en el navbar
- `hooks/useLanguage.ts` - Hook para manejar la lógica de idiomas
- `public/locales/` - Archivos de traducción JSON
- `next-i18next.config.js` - Configuración de i18n

## Cómo agregar nuevas traducciones

1. Agrega las nuevas claves en `public/locales/es/common.json`
2. Agrega las traducciones correspondientes en `public/locales/en/common.json`
3. Usa `t('clave.traduccion')` en los componentes

## Cómo agregar un nuevo idioma

1. Crea la carpeta `public/locales/[codigo-idioma]/`
2. Copia `common.json` y traduce el contenido
3. Agrega el código del idioma en `next.config.ts` y `next-i18next.config.js`
4. Actualiza los componentes de selección de idioma

## Uso en componentes

```tsx
import { useTranslation } from 'next-i18next';

function MiComponente() {
  const { t } = useTranslation('common');
  
  return <h1>{t('hero.greeting')}</h1>;
}
```

## Configuración de páginas

Cada página debe exportar `getStaticProps`:

```tsx
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
    },
  };
};
```
