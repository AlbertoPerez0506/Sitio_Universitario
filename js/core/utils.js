/* ============================================================
   core/utils.js — Utilidades reutilizables
   ============================================================ */

/** Escapa HTML para prevenir XSS al inyectar strings. */
export function escapeHTML(str) {
    return String(str ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/** Convierte '2026-09-15' en {day:'15', month:'sep', year:'2026'}. */
const MONTHS = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
export function formatDateParts(iso) {
    const [y, m, d] = iso.split('-').map(Number);
    return {
        day:   String(d).padStart(2, '0'),
        month: MONTHS[m - 1] ?? '',
        year:  String(y)
    };
}

/** true si la fecha está dentro de la ventana reciente (días). */
export function isRecent(iso, days = 7) {
    const [y, m, d] = iso.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    const now = new Date();
    const diff = (now - date) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= days;
}

/** Detecta preferencia de movimiento reducido. */
export function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Debounce básico. */
export function debounce(fn, wait = 100) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), wait);
    };
}

/** Espera a que el DOM esté listo. */
export function onReady(fn) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
        fn();
    }
}