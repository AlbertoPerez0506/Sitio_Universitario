/* ============================================================
   components/counters.js — Contadores animados
   ============================================================ */

import { prefersReducedMotion } from '../core/utils.js';

export function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    // Sin IntersectionObserver o con movimiento reducido:
    // escribir el valor final inmediatamente para evitar
    // que los contadores queden mostrando 0.
    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
        counters.forEach(el => {
            const target = parseFloat(el.getAttribute('data-count'));
            const suffix = el.getAttribute('data-count-suffix') || '';
            if (!Number.isNaN(target)) {
                el.textContent = Math.round(target) + suffix;
            }
        });
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseFloat(el.getAttribute('data-count'));
            const suffix = el.getAttribute('data-count-suffix') || '';
            const duration = 1400;
            const start = performance.now();

            const tick = (now) => {
                const t = Math.min(1, (now - start) / duration);
                const eased = 1 - Math.pow(1 - t, 3);
                el.textContent = Math.round(target * eased) + suffix;
                if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            obs.unobserve(el);
        });
    }, { threshold: 0.4 });

    counters.forEach(el => observer.observe(el));
}