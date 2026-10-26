/* ============================================================
   core/paths.js — Helper de rutas
   ------------------------------------------------------------
   Todas las rutas se construyen desde la raíz del sitio.
   Así funcionan igual en Vercel (dominio raíz) que en un
   subdirectorio, siempre que se sirva desde el root.
   ============================================================ */

/**
 * Devuelve una ruta absoluta desde la raíz del sitio.
 * @param {string} path - Ruta relativa ej: 'pages/universidad/historia.html'
 * @returns {string}
 */
export function url(path = '') {
    if (!path) return '/';
    if (/^https?:\/\//.test(path)) return path;
    if (path.startsWith('#')) return path;
    return '/' + path.replace(/^\/+/, '');
}

/**
 * Indica si estamos en la home (para ajustar clases del header).
 * @returns {boolean}
 */
export function isHome() {
    const p = window.location.pathname.replace(/\/+$/, '') || '/';
    return p === '/' || p === '/index.html';
}