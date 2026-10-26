/* ============================================================
   components/header.js — Header institucional UTU
   ------------------------------------------------------------
   Exporta:
     html()  → string con header + mobile menu + progress bar
     init()  → activa menú, dropdowns, scroll y progress
   ------------------------------------------------------------
   Cambio: los submenús móviles de Oferta educativa separan
   título (TSU) y descripción (Ing./Lic.) en líneas distintas
   con jerarquía visual clara, en lugar de concatenar con "—".
   ============================================================ */

import { CONFIG } from '../core/config.js';

const NAV = [
    {
        label: 'Universidad',
        href: '/pages/universidad/bienvenida.html',
        children: [
            { label: 'Bienvenida',      href: '/pages/universidad/bienvenida.html' },
            { label: 'Historia',        href: '/pages/universidad/historia.html' },
            { label: 'Misión y visión', href: '/pages/universidad/mision-vision.html' },
            { label: 'Autoridades',     href: '/pages/universidad/autoridades.html' },
            { label: 'Instalaciones',   href: '/pages/universidad/instalaciones.html' }
        ]
    },
    {
        label: 'Identidad',
        href: '/pages/identidad/himno.html',
        children: [
            { label: 'Himno',    href: '/pages/identidad/himno.html' },
            { label: 'Escudo',   href: '/pages/identidad/escudo.html' },
            { label: 'Lema',     href: '/pages/identidad/lema.html' },
            { label: 'Valores',  href: '/pages/identidad/valores.html' }
        ]
    },
    {
        label: 'Oferta educativa',
        href: '/pages/oferta-educativa/index.html',
        mega: true,
        groups: [
            {
                title: 'Ingenierías', badge: 'Ing', variant: 'ing',
                items: [
                    { title: 'TSU en Entornos Virtuales y Negocios Digitales', sub: 'Continuidad: Ing. en Tecnologías de la Información e Innovación Digital', href: '/pages/oferta-educativa/carrera-01.html' },
                    { title: 'TSU en Biotecnología', sub: 'Continuidad: Ing. en Biotecnología', href: '/pages/oferta-educativa/carrera-02.html' }
                ]
            },
            {
                title: 'Licenciaturas', badge: 'Lic', variant: 'lic',
                items: [
                    { title: 'TSU en Mercadotecnia', sub: 'Continuidad: Lic. en Negocios y Mercadotecnia', href: '/pages/oferta-educativa/carrera-03.html' },
                    { title: 'TSU en Gastronomía',    sub: 'Continuidad: Lic. en Gastronomía',              href: '/pages/oferta-educativa/carrera-04.html' },
                    { title: 'TSU en Turismo',        sub: 'Continuidad: Lic. en Gestión y Desarrollo Turístico', href: '/pages/oferta-educativa/carrera-05.html' },
                    { title: 'TSU en Paramédico',     sub: 'Continuidad: Lic. en Protección Civil',         href: '/pages/oferta-educativa/carrera-06.html' },
                    { title: 'TSU en Contaduría',     sub: 'Continuidad: Lic. en Contaduría',               href: '/pages/oferta-educativa/carrera-07.html' }
                ]
            }
        ]
    },
    {
        label: 'Comunidad',
        href: '/pages/comunidad/directorio.html',
        children: [
            { label: 'Directorio',    href: '/pages/comunidad/directorio.html' },
            { label: 'Paraescolares', href: '/pages/comunidad/paraescolares.html' },
            { label: 'Proyectos',     href: '/pages/comunidad/proyectos.html' },
            { label: 'Ubicación',     href: '/pages/comunidad/ubicacion.html' }
        ]
    },
    {
        label: 'Participación',
        href: '/pages/participacion/quejas-sugerencias.html',
        children: [
            { label: 'Quejas y sugerencias', href: '/pages/participacion/quejas-sugerencias.html' },
            { label: 'Encuestas',            href: '/pages/participacion/encuestas.html' }
        ]
    }
];

const CTA = { label: 'Contacto', href: '/pages/comunidad/ubicacion.html' };

const CHEVRON = `<svg class="nav__chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

function renderNavItem(item) {
    if (!item.children && !item.groups) {
        return `<li class="nav__item"><a class="nav__link" href="${item.href}"><span class="nav__link-text">${item.label}</span></a></li>`;
    }
    if (item.groups?.length) {
        const groups = item.groups.map(g => `
            <div class="nav__mega-group">
                <div class="nav__mega-head">
                    <span class="nav__mega-badge nav__mega-badge--${g.variant}">${g.badge}</span>
                    <span class="nav__mega-title">${g.title}</span>
                </div>
                <ul class="nav__mega-list">
                    ${g.items.map(it => `
                        <li><a class="nav__mega-item" href="${it.href}">
                            <span class="nav__mega-item-title">${it.title}</span>
                            <span class="nav__mega-item-sub">
                                <svg viewBox="0 0 24 24" width="10" height="10" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                ${it.sub}
                            </span>
                        </a></li>
                    `).join('')}
                </ul>
            </div>
        `).join('');
        return `
            <li class="nav__item nav__item--has-children" data-dropdown-item>
                <button type="button" class="nav__link nav__trigger" data-dropdown-trigger aria-expanded="false" aria-haspopup="true">
                    <span class="nav__link-text">${item.label}</span>${CHEVRON}
                </button>
                <div class="nav__panel nav__panel--mega" data-dropdown-panel role="menu">
                    <div class="nav__mega">${groups}</div>
                </div>
            </li>`;
    }
    return `
        <li class="nav__item nav__item--has-children" data-dropdown-item>
            <button type="button" class="nav__link nav__trigger" data-dropdown-trigger aria-expanded="false" aria-haspopup="true">
                <span class="nav__link-text">${item.label}</span>${CHEVRON}
            </button>
            <div class="nav__panel" data-dropdown-panel role="menu">
                <ul class="nav__panel-list">
                    ${item.children.map(c => `<li><a href="${c.href}">${c.label}</a></li>`).join('')}
                </ul>
            </div>
        </li>`;
}

function flattenChildren(item) {
    if (item.children) {
        return item.children.map(c => ({ label: c.label, sub: null, href: c.href }));
    }
    if (item.groups) {
        return item.groups.flatMap(g =>
            g.items.map(it => ({
                label: it.title,
                sub: it.sub,
                href: it.href
            }))
        );
    }
    return [];
}

function renderMobileNavItem(item) {
    const children = flattenChildren(item);
    if (!children.length) {
        return `<li><a class="mobile-menu__link" href="${item.href}">${item.label}</a></li>`;
    }
    return `
        <li class="mobile-menu__group" data-mobile-dropdown-item>
            <button type="button" class="mobile-menu__link mobile-menu__trigger" data-mobile-dropdown-trigger aria-expanded="false">
                <span>${item.label}</span>
                ${CHEVRON.replace('nav__chevron', 'mobile-menu__chevron')}
            </button>
            <ul class="mobile-menu__sub" data-mobile-dropdown-panel hidden>
                ${children.map(c => `
                    <li>
                        <a class="mobile-menu__sub-link" href="${c.href}">
                            <span class="mobile-menu__sub-title">${c.label}</span>
                            ${c.sub ? `<span class="mobile-menu__sub-desc">${c.sub}</span>` : ''}
                        </a>
                    </li>
                `).join('')}
            </ul>
        </li>`;
}

/** Genera el HTML completo del header. */
export function html() {
    const navDesktop = NAV.map(renderNavItem).join('');
    const navMobile  = NAV.map(renderMobileNavItem).join('');
    return `
<div class="top-progress" data-top-progress aria-hidden="true">
    <span class="top-progress__bar" data-top-progress-bar></span>
</div>

<header class="site-header" data-header>
    <div class="site-header__inner">
        <a class="site-header__brand" href="/" aria-label="UTU — Inicio">
    <img class="site-header__logo" src="/assets/images/branding/logo-utu.png"
         alt="Universidad Tecnológica del Usumacinta"
         width="2000" height="800" decoding="async" data-img-fallback="Logotipo UTU">
    <span class="site-header__brand-text" aria-hidden="true">
        <span class="site-header__brand-name">Universidad Tecnológica</span>
        <span class="site-header__brand-name site-header__brand-name--accent">del Usumacinta</span>
    </span>
</a>

        <nav class="site-header__nav" aria-label="Navegación principal">
            <ul class="nav__list">${navDesktop}</ul>
        </nav>

        <div class="site-header__actions">
            <a class="header-cta" href="${CTA.href}">
                <span class="header-cta__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                <span class="header-cta__label">${CTA.label}</span>
                <span class="header-cta__arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </span>
            </a>
        </div>

        <button type="button" class="site-header__toggle" data-menu-toggle
                aria-expanded="false" aria-controls="mobile-menu" aria-label="Abrir menú de navegación">
            <svg class="icon" aria-hidden="true"><use href="#i-menu"></use></svg>
        </button>
    </div>
</header>

<div class="mobile-menu" id="mobile-menu" data-mobile-menu aria-hidden="true" role="dialog" aria-modal="true" aria-label="Menú de navegación principal">
    <div class="mobile-menu__backdrop" data-menu-close></div>
    <div class="mobile-menu__panel">
        <div class="mobile-menu__head">
            <img class="mobile-menu__logo" src="/assets/images/branding/logo-utu.png"
                 alt="Universidad Tecnológica del Usumacinta" width="2000" height="800" decoding="async">
            <button type="button" class="mobile-menu__close" data-menu-close aria-label="Cerrar menú">
                <svg class="icon" aria-hidden="true"><use href="#i-close"></use></svg>
            </button>
        </div>
        <nav class="mobile-menu__nav" aria-label="Navegación móvil">
            <ul>${navMobile}</ul>
        </nav>
        <div class="mobile-menu__cta">
            <a class="header-cta header-cta--full" href="${CTA.href}">
                <span class="header-cta__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                <span class="header-cta__label">${CTA.label}</span>
            </a>
        </div>
    </div>
</div>`;
}

/* ---------- Lógica ---------- */

function initMobileMenu() {
    const toggle = document.querySelector('[data-menu-toggle]');
    const menu = document.querySelector('[data-mobile-menu]');
    if (!toggle || !menu) return;

    const closeTriggers = menu.querySelectorAll('[data-menu-close]');
    const navLinksOnly = menu.querySelectorAll('a[href]');
    const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    let lastFocused = null;

    function open() {
        lastFocused = document.activeElement;
        menu.classList.add('is-open');
        menu.setAttribute('aria-hidden', 'false');
        menu.removeAttribute('inert');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('menu-open');
        const first = menu.querySelector(FOCUSABLE);
        if (first) setTimeout(() => first.focus({ preventScroll: true }), 80);
    }
    function close() {
        menu.classList.remove('is-open');
        menu.setAttribute('aria-hidden', 'true');
        menu.setAttribute('inert', '');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
        (lastFocused || toggle).focus({ preventScroll: true });
    }

    if (!menu.classList.contains('is-open')) menu.setAttribute('inert', '');

    toggle.addEventListener('click', () => menu.classList.contains('is-open') ? close() : open());
    closeTriggers.forEach(el => el.addEventListener('click', close));
    navLinksOnly.forEach(el => el.addEventListener('click', close));

    document.addEventListener('keydown', e => {
        if (!menu.classList.contains('is-open')) return;
        if (e.key === 'Escape') { e.preventDefault(); close(); return; }
        if (e.key !== 'Tab') return;
        const focusables = Array.from(menu.querySelectorAll(FOCUSABLE)).filter(el => el.offsetParent !== null);
        if (!focusables.length) return;
        const first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    window.matchMedia('(min-width: 1024px)').addEventListener?.('change', e => {
        if (e.matches && menu.classList.contains('is-open')) close();
    });
}

function initDropdowns() {
    const items = Array.from(document.querySelectorAll('[data-dropdown-item]'));
    if (!items.length) return;
    const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches;

    function closeAll(except) {
        items.forEach(item => {
            if (item === except) return;
            item.classList.remove('is-open');
            item.querySelector('[data-dropdown-trigger]')?.setAttribute('aria-expanded', 'false');
        });
    }

    items.forEach(item => {
        const trigger = item.querySelector('[data-dropdown-trigger]');
        if (!trigger) return;
        let openTimer, closeTimer;
        const open  = () => { closeAll(item); item.classList.add('is-open'); trigger.setAttribute('aria-expanded', 'true'); };
        const close = () => { item.classList.remove('is-open'); trigger.setAttribute('aria-expanded', 'false'); };

        trigger.addEventListener('click', e => { e.preventDefault(); item.classList.contains('is-open') ? close() : open(); });
        item.addEventListener('mouseenter', () => { if (!isDesktop()) return; clearTimeout(closeTimer); openTimer = setTimeout(open, 80); });
        item.addEventListener('mouseleave', () => { if (!isDesktop()) return; clearTimeout(openTimer); closeTimer = setTimeout(close, 200); });
        item.addEventListener('keydown', e => {
            if (e.key === 'Escape' && item.classList.contains('is-open')) { e.preventDefault(); close(); trigger.focus(); }
        });
        item.querySelectorAll('[data-dropdown-panel] a').forEach(a => {
            a.addEventListener('focus', () => { closeAll(item); item.classList.add('is-open'); trigger.setAttribute('aria-expanded', 'true'); });
        });
        item.addEventListener('focusout', e => { if (!item.contains(e.relatedTarget)) close(); });
    });

    document.addEventListener('click', e => { if (!e.target.closest('[data-dropdown-item]')) closeAll(null); });
    window.matchMedia('(min-width: 1024px)').addEventListener?.('change', e => { if (!e.matches) closeAll(null); });
}

function initMobileAccordions() {
    document.querySelectorAll('[data-mobile-dropdown-trigger]').forEach(trigger => {
        const group = trigger.closest('[data-mobile-dropdown-item]');
        const panel = group?.querySelector('[data-mobile-dropdown-panel]');
        if (!group || !panel) return;
        trigger.addEventListener('click', () => {
            const isOpen = trigger.getAttribute('aria-expanded') === 'true';
            document.querySelectorAll('[data-mobile-dropdown-item].is-open').forEach(other => {
                if (other === group) return;
                other.classList.remove('is-open');
                other.querySelector('[data-mobile-dropdown-trigger]')?.setAttribute('aria-expanded', 'false');
                const p = other.querySelector('[data-mobile-dropdown-panel]');
                if (p) p.hidden = true;
            });
            trigger.setAttribute('aria-expanded', String(!isOpen));
            group.classList.toggle('is-open', !isOpen);
            panel.hidden = isOpen;
        });
    });
}

function initTopProgress() {
    const root = document.querySelector('[data-top-progress]');
    const bar = root?.querySelector('[data-top-progress-bar]');
    if (!root || !bar) return;

    let progress = 0, done = false, timer = null;
    const setProgress = v => { progress = Math.min(100, Math.max(0, v)); bar.style.transform = `scaleX(${progress / 100})`; };
    const tick = () => {
        if (done) return;
        setProgress(progress + Math.max(0.5, (90 - progress) * 0.08));
        timer = setTimeout(tick, 180);
    };
    const start = () => {
        done = false; clearTimeout(timer);
        root.classList.remove('is-hidden', 'is-done');
        root.removeAttribute('aria-hidden');
        setProgress(6);
        setTimeout(() => { if (!done) timer = setTimeout(tick, 120); }, 80);
    };
    const complete = () => {
        if (done) return;
        done = true; clearTimeout(timer);
        setProgress(100);
        root.classList.add('is-done');
        setTimeout(() => { root.classList.add('is-hidden'); root.setAttribute('aria-hidden', 'true'); }, 420);
    };

    start();
    if (document.readyState === 'complete') setTimeout(complete, 220);
    else {
        window.addEventListener('load', () => setTimeout(complete, 220), { once: true });
        setTimeout(() => { if (!done) complete(); }, 4500);
    }

    document.addEventListener('click', e => {
        const link = e.target.closest('a[href]');
        if (!link) return;
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || /^(mailto:|tel:|https?:)/.test(href) || link.target === '_blank' || link.hasAttribute('download')) return;
        start();
    });

    window.addEventListener('pageshow', e => {
        if (e.persisted) { root.classList.add('is-hidden'); root.setAttribute('aria-hidden', 'true'); }
    });
}

function initScrollBehavior() {
    const header = document.querySelector('[data-header]');
    if (!header) return;
    let lastY = window.scrollY, ticking = false;

    function update() {
        const y = window.scrollY;
        const delta = y - lastY;
        header.classList.toggle('is-scrolled', y > CONFIG.HEADER_SCROLLED_AT);
        const menuOpen = document.body.classList.contains('menu-open');
        if (!menuOpen && y > CONFIG.HEADER_HIDE_AFTER && delta > CONFIG.HEADER_DIRECTION_DELTA) header.classList.add('is-hidden');
        else if (delta < -CONFIG.HEADER_DIRECTION_DELTA || y <= CONFIG.HEADER_HIDE_AFTER) header.classList.remove('is-hidden');
        lastY = y;
        ticking = false;
    }
    window.addEventListener('scroll', () => {
        if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
}

/** Inicializa todos los comportamientos del header. */
export function init() {
    initMobileMenu();
    initDropdowns();
    initMobileAccordions();
    initScrollBehavior();
    initTopProgress();
}