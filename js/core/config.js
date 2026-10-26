/* ============================================================
   core/config.js — Configuración global del sitio
   ------------------------------------------------------------
   Punto único de verdad para constantes.
   Cambiar API_BASE de '/js/data' a 'https://api.utu.edu.mx'
   cuando el backend PHP/MySQL esté listo.
   ============================================================ */

export const CONFIG = {
    // Endpoint de datos. Hoy son JSON estáticos en /js/data/.
    // Mañana: 'https://api.utu.edu.mx/v1'
    API_BASE: '/js/data',

    // Metadatos del sitio
    SITE: {
        name: 'Universidad Tecnológica del Usumacinta',
        shortName: 'UTU',
        url: 'https://www.utu.edu.mx',
        locale: 'es_MX'
    },

    // Noticias: cuántas por página en el home
    NEWS_PER_PAGE: 7,

    // Ventana de "Nuevo" (días)
    NEW_WINDOW_DAYS: 7,

    // Preferencias de animación
    CAROUSEL_AUTOPLAY_MS: 6500,
    GALLERY_AUTOPLAY_MS: 5500,

    // Umbrales de header
    HEADER_SCROLLED_AT: 8,
    HEADER_HIDE_AFTER: 160,
    HEADER_DIRECTION_DELTA: 6
};