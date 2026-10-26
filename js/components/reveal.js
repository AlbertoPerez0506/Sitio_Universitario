/* ============================================================
   components/reveal.js — Animación de entrada al scroll
   ============================================================ */

import { prefersReducedMotion } from '../core/utils.js';

let observer = null;

/**
 * Inicializa la observación de .reveal y [data-ratio].
 * Expone window.UTU.observeReveals(scope) para contenido dinámico.
 */
export function initReveal() {
    const targets = document.querySelectorAll('.reveal, [data-ratio]');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
        targets.forEach(el => el.classList.add('is-visible'));
        return;
    }

    observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const delay = el.getAttribute('data-reveal-delay');
            if (delay && !el.style.getPropertyValue('--reveal-delay')) {
                el.style.setProperty('--reveal-delay', `${delay}ms`);
            }
            el.classList.add('is-visible');
            obs.unobserve(el);
        });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    targets.forEach(el => observer.observe(el));

    window.UTU = window.UTU || {};
    window.UTU.observeReveals = (scope) => {
        if (!observer || !scope) return;
        scope.querySelectorAll('.reveal:not(.is-visible)').forEach(el => observer.observe(el));
    };
}