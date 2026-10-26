/* ============================================================
   components/carousel.js — Carrusel genérico del hero
   ------------------------------------------------------------
   Markup esperado:
     <div data-carousel data-autoplay="6500">
       <div data-carousel-track> ... slides ... </div>
       <button data-carousel-prev>
       <button data-carousel-next>
       <div data-carousel-dots>
       <button data-carousel-toggle>
       <span data-carousel-current> <span data-carousel-total>
       <div data-carousel-progress><span class="hero__progress-bar"></span></div>
     </div>
   ============================================================ */

import { prefersReducedMotion } from '../core/utils.js';

export function initCarousels() {
    document.querySelectorAll('[data-carousel]').forEach(root => {
        const track  = root.querySelector('[data-carousel-track]');
        const slides = Array.from(root.querySelectorAll('[data-carousel-slide]'));
        if (!track || slides.length < 2) return;

        const prevBtn        = root.querySelector('[data-carousel-prev]');
        const nextBtn        = root.querySelector('[data-carousel-next]');
        const dotsWrap       = root.querySelector('[data-carousel-dots]');
        const toggleBtn      = root.querySelector('[data-carousel-toggle]');
        const progressBar    = root.querySelector('[data-carousel-progress] .hero__progress-bar');
        const counterCurrent = root.querySelector('[data-carousel-current]');
        const counterTotal   = root.querySelector('[data-carousel-total]');
        const autoplay       = parseInt(root.getAttribute('data-autoplay') || '0', 10);

        let index = 0;
        let timer = null;
        let paused = false;
        const reduced = prefersReducedMotion();
        const pad = n => String(n).padStart(2, '0');

        if (counterTotal) counterTotal.textContent = pad(slides.length);

        // Dots
        if (dotsWrap) {
            dotsWrap.innerHTML = '';
            slides.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'hero__dot';
                dot.setAttribute('aria-label', `Ir a la diapositiva ${i + 1}`);
                dot.setAttribute('aria-current', i === 0 ? 'true' : 'false');
                dot.addEventListener('click', () => goTo(i));
                dotsWrap.appendChild(dot);
            });
        }
        const dots = dotsWrap ? Array.from(dotsWrap.children) : [];

        function update() {
            track.style.transform = `translateX(-${index * 100}%)`;
            slides.forEach((s, i) => {
                const active = i === index;
                s.classList.toggle('is-active', active);
                s.setAttribute('aria-hidden', String(!active));
                if ('inert' in s) {
                    active ? s.removeAttribute('inert') : s.setAttribute('inert', '');
                }
            });
            dots.forEach((d, i) => d.setAttribute('aria-current', String(i === index)));
            if (counterCurrent) counterCurrent.textContent = pad(index + 1);
            resetProgress();
        }

        function resetProgress() {
            if (!progressBar) return;
            progressBar.classList.remove('is-animating');
            void progressBar.offsetWidth;
            if (!paused && autoplay && !reduced) {
                progressBar.style.setProperty('--hero-autoplay-duration', `${autoplay}ms`);
                progressBar.classList.add('is-animating');
            }
        }

        function goTo(i) {
            index = (i + slides.length) % slides.length;
            update();
            if (!paused) restartAutoplay();
        }
        const next = () => goTo(index + 1);
        const prev = () => goTo(index - 1);

        function startAutoplay() {
            if (!autoplay || reduced) return;
            stopAutoplay();
            timer = setInterval(next, autoplay);
            resetProgress();
        }
        function stopAutoplay() {
            if (timer) { clearInterval(timer); timer = null; }
            if (progressBar) progressBar.classList.remove('is-animating');
        }
        function restartAutoplay() { stopAutoplay(); startAutoplay(); }

        prevBtn?.addEventListener('click', prev);
        nextBtn?.addEventListener('click', next);

        root.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft')  { e.preventDefault(); prev(); }
            if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
            if (e.key === 'Home')       { e.preventDefault(); goTo(0); }
            if (e.key === 'End')        { e.preventDefault(); goTo(slides.length - 1); }
        });

        root.addEventListener('mouseenter', stopAutoplay);
        root.addEventListener('mouseleave', () => { if (!paused) startAutoplay(); });
        root.addEventListener('focusin',   stopAutoplay);
        root.addEventListener('focusout',  () => { if (!paused) startAutoplay(); });

        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                paused = !paused;
                toggleBtn.setAttribute('aria-pressed', String(paused));
                toggleBtn.setAttribute('aria-label', paused ? 'Reanudar carrusel' : 'Pausar carrusel');
                paused ? stopAutoplay() : startAutoplay();
            });
        }

        // Swipe táctil
        let startX = 0, startY = 0, dragging = false;
        root.addEventListener('touchstart', e => {
            const t = e.changedTouches[0];
            startX = t.clientX; startY = t.clientY;
            dragging = false;
            stopAutoplay();
        }, { passive: true });
        root.addEventListener('touchmove', e => {
            if (dragging) return;
            const t = e.changedTouches[0];
            const dx = Math.abs(t.clientX - startX);
            const dy = Math.abs(t.clientY - startY);
            if (dx > 40 && dx > dy) dragging = true;
        }, { passive: true });
        root.addEventListener('touchend', e => {
            if (dragging) {
                const t = e.changedTouches[0];
                (t.clientX - startX) < 0 ? next() : prev();
            }
            if (!paused) startAutoplay();
        }, { passive: true });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) stopAutoplay();
            else if (!paused) startAutoplay();
        });

        update();
        startAutoplay();
    });
}

