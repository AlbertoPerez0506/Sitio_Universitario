/* ============================================================
   components/lightbox.js — Visor de imágenes
   ------------------------------------------------------------
   Markup: [data-lightbox] con [data-lightbox-index] en los
   disparadores (botones .collage__cell).
   ============================================================ */

export function initLightbox() {
    const root = document.querySelector('[data-lightbox]');
    const cells = Array.from(document.querySelectorAll('[data-lightbox-index]'));
    if (!root || !cells.length) return;

    const imgEl     = root.querySelector('[data-lightbox-img]');
    const captionEl = root.querySelector('[data-lightbox-caption]');
    const closeEls  = root.querySelectorAll('[data-lightbox-close]');
    const prevBtn   = root.querySelector('[data-lightbox-prev]');
    const nextBtn   = root.querySelector('[data-lightbox-next]');

    const items = cells.map(cell => {
        const img = cell.querySelector('img');
        return {
            src:     img?.getAttribute('src') || '',
            alt:     img?.getAttribute('alt') || '',
            caption: img?.getAttribute('alt') || ''
        };
    });

    let current = 0;
    let lastFocused = null;

    function show(i) {
        current = (i + items.length) % items.length;
        const it = items[current];
        imgEl.src = it.src;
        imgEl.alt = it.alt;
        if (captionEl) captionEl.textContent = it.caption;
    }
    function open(i) {
        lastFocused = document.activeElement;
        root.hidden = false;
        document.body.style.overflow = 'hidden';
        show(i);
        setTimeout(() => root.querySelector('.lightbox__close')?.focus(), 50);
    }
    function close() {
        root.hidden = true;
        document.body.style.overflow = '';
        lastFocused?.focus?.({ preventScroll: true });
    }

    cells.forEach((cell, i) => cell.addEventListener('click', () => open(i)));
    closeEls.forEach(el => el.addEventListener('click', close));
    prevBtn?.addEventListener('click', () => show(current - 1));
    nextBtn?.addEventListener('click', () => show(current + 1));

    document.addEventListener('keydown', e => {
        if (root.hidden) return;
        if (e.key === 'Escape')     { e.preventDefault(); close(); }
        if (e.key === 'ArrowLeft')  { e.preventDefault(); show(current - 1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1); }
    });
}