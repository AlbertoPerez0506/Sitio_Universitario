/* ============================================================
   app.js — Bootstrap del sitio
   ------------------------------------------------------------
   ORDEN IMPORTANTE:
     1. Sprite + header + footer (inyección estática).
     2. Módulo de página (renderiza contenido dinámico desde
        site-content.js).
     3. Componentes globales (reveal, counters, carousels…)
        que ahora observan el DOM ya poblado.
   ============================================================ */

import { onReady } from './core/utils.js';
import { injectSprite } from './components/sprite.js';
import * as header from './components/header.js';
import * as footer from './components/footer.js';
import { initReveal } from './components/reveal.js';
import { initCounters } from './components/counters.js';
import { initCarousels } from './components/carousel.js';
import { initVintageGalleries } from './components/gallery.js';
import { initLightbox } from './components/lightbox.js';

document.documentElement.classList.add('js');

function mount(name, component) {
    const placeholder = document.querySelector(`[data-component="${name}"]`);
    if (!placeholder) return;
    const tpl = document.createElement('template');
    tpl.innerHTML = component.html().trim();
    placeholder.replaceWith(tpl.content);
    if (typeof component.init === 'function') component.init();
}

async function initPageModule() {
    const page = document.body.dataset.page;
    if (!page) return;
    try {
        const mod = await import(`./pages/${page}.js`);
        if (typeof mod.init === 'function') mod.init();
    } catch (err) {
        console.debug(`[UTU] Sin módulo específico para la página "${page}".`);
    }
}

onReady(async () => {
    injectSprite();
    mount('header', header);
    mount('footer', footer);

    // 1) Render dinámico primero
    await initPageModule();

    // 2) Componentes globales después (el DOM ya contiene las listas)
    initReveal();
    initCounters();
    initCarousels();
    initVintageGalleries();
    initLightbox();

    document.dispatchEvent(new CustomEvent('utu:ready'));
});