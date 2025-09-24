module.exports = {
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    localeDetection: false, // Deshabilitamos la detección automática para mostrar nuestro selector
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}
