/* ============================================================
   app.js — Bootstrap del sitio
   ------------------------------------------------------------
   Este es el ÚNICO script que cada página HTML necesita:
     <script type="module" src="/js/app.js"></script>
   El atributo data-page en <body> determina qué módulo
   específico se inicializa (home, historia, contacto…).
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

// Marca que JS está activo (evita parpadeos en animaciones)
document.documentElement.classList.add('js');

/** Monta un componente en su placeholder [data-component="nombre"]. */
function mount(name, component) {
    const placeholder = document.querySelector(`[data-component="${name}"]`);
    if (!placeholder) return;
    const tpl = document.createElement('template');
    tpl.innerHTML = component.html().trim();
    placeholder.replaceWith(tpl.content);
    if (typeof component.init === 'function') component.init();
}

/** Carga el módulo específico de la página. */
async function initPageModule() {
    const page = document.body.dataset.page;
    if (!page) return;
    try {
        const mod = await import(`./pages/${page}.js`);
        if (typeof mod.init === 'function') mod.init();
    } catch (err) {
        // Si la página no tiene módulo propio, no pasa nada
        console.debug(`[UTU] Sin módulo específico para la página "${page}".`);
    }
}

onReady(async () => {
    // 1. Sprite
    injectSprite();

    // 2. Header + footer
    mount('header', header);
    mount('footer', footer);

    // 3. Componentes globales
    initReveal();
    initCounters();
    initCarousels();
    initVintageGalleries();
    initLightbox();

    // 4. Módulo específico de la página
    await initPageModule();

    // 5. Notificar (útil para tests o extensiones futuras)
    document.dispatchEvent(new CustomEvent('utu:ready'));
});