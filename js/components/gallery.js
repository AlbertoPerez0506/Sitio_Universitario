/* ============================================================
   components/gallery.js — Galería vintage
   ------------------------------------------------------------
   Markup: [data-vintage-gallery] con [data-vintage-slide]
   dentro, botones prev/next, dots y contador.
   ============================================================ */

import { prefersReducedMotion } from '../core/utils.js';

export function initVintageGalleries() {
    document.querySelectorAll('[data-vintage-gallery]').forEach(root => {
        const slides = Array.from(root.querySelectorAll('[data-vintage-slide]'));
        if (slides.length < 2) return;

        const prevBtn        = root.querySelector('[data-vintage-prev]');
        const nextBtn        = root.querySelector('[data-vintage-next]');
        const dotsWrap       = root.querySelector('[data-vintage-dots]');
        const counterCurrent = root.querySelector('[data-vintage-current]');
        const counterTotal   = root.querySelector('[data-vintage-total]');

        let index = 0;
        const reduced = prefersReducedMotion();
        const pad = n => String(n).padStart(2, '0');

        if (counterTotal) counterTotal.textContent = pad(slides.length);

        if (dotsWrap) {
            dotsWrap.innerHTML = '';
            slides.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'vintage__dot';
                dot.setAttribute('aria-label', `Ver foto ${i + 1} de ${slides.length}`);
                dot.setAttribute('aria-current', i === 0 ? 'true' : 'false');
                dot.addEventListener('click', () => goTo(i));
                dotsWrap.appendChild(dot);
            });
        }
        const dots = dotsWrap ? Array.from(dotsWrap.children) : [];

        function updateUI() {
            if (counterCurrent) counterCurrent.textContent = pad(index + 1);
            dots.forEach((d, i) => d.setAttribute('aria-current', String(i === index)));
            slides.forEach((s, i) => {
                s.setAttribute('aria-hidden', String(i !== index));
                if ('inert' in s) {
                    i === index ? s.removeAttribute('inert') : s.setAttribute('inert', '');
                }
            });
        }

        function goTo(nextIndex) {
            nextIndex = (nextIndex + slides.length) % slides.length;
            if (nextIndex === index) return;

            const current = slides[index];
            const next    = slides[nextIndex];

            current.classList.remove('is-active');
            current.classList.add('is-leaving');
            next.classList.remove('is-leaving');
            next.classList.add('is-active');

            clearTimeout(current._vintageTimer);
            current._vintageTimer = setTimeout(() => {
                if (current !== slides[index]) current.classList.remove('is-leaving');
            }, reduced ? 60 : 780);

            index = nextIndex;
            updateUI();
        }
        const next = () => goTo(index + 1);
        const prev = () => goTo(index - 1);

        prevBtn?.addEventListener('click', prev);
        nextBtn?.addEventListener('click', next);

        if (!root.hasAttribute('tabindex')) root.setAttribute('tabindex', '0');
        root.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft')  { e.preventDefault(); prev(); }
            if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
            if (e.key === 'Home')       { e.preventDefault(); goTo(0); }
            if (e.key === 'End')        { e.preventDefault(); goTo(slides.length - 1); }
        });

        // Swipe táctil
        let startX = 0, startY = 0, dragging = false;
        root.addEventListener('touchstart', e => {
            const t = e.changedTouches[0];
            startX = t.clientX; startY = t.clientY; dragging = false;
        }, { passive: true });
        root.addEventListener('touchmove', e => {
            if (dragging) return;
            const t = e.changedTouches[0];
            const dx = Math.abs(t.clientX - startX);
            const dy = Math.abs(t.clientY - startY);
            if (dx > 40 && dx > dy) dragging = true;
        }, { passive: true });
        root.addEventListener('touchend', e => {
            if (!dragging) return;
            const t = e.changedTouches[0];
            (t.clientX - startX) < 0 ? next() : prev();
        }, { passive: true });

        // Autoplay opcional
        const autoplay = parseInt(root.getAttribute('data-vintage-autoplay') || '0', 10);
        if (autoplay && !reduced) {
            let timer = null;
            const startAuto = () => { stopAuto(); timer = setInterval(next, autoplay); };
            const stopAuto  = () => { if (timer) { clearInterval(timer); timer = null; } };
            root.addEventListener('mouseenter', stopAuto);
            root.addEventListener('mouseleave', startAuto);
            root.addEventListener('focusin',   stopAuto);
            root.addEventListener('focusout',  startAuto);
            document.addEventListener('visibilitychange', () => {
                document.hidden ? stopAuto() : startAuto();
            });
            startAuto();
        }

        updateUI();
    });
}