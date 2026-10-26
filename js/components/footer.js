/* ============================================================
   components/footer.js — Footer institucional UTU
   ============================================================ */

const GROUPS = [
    {
        title: 'Universidad',
        links: [
            { label: 'Bienvenida',      href: '/pages/universidad/bienvenida.html' },
            { label: 'Historia',        href: '/pages/universidad/historia.html' },
            { label: 'Misión y visión', href: '/pages/universidad/mision-vision.html' },
            { label: 'Himno',           href: '/pages/identidad/himno.html' },
            { label: 'Autoridades',     href: '/pages/universidad/autoridades.html' }
        ]
    },
    {
        title: 'Académico',
        links: [
            { label: 'Oferta educativa',   href: '/pages/oferta-educativa/index.html' },
            { label: 'Estadías',           href: '/pages/oferta-educativa/index.html' },
            { label: 'Calendario escolar', href: '/pages/servicios/calendario-escolar.html' },
            { label: 'Becas y apoyos',     href: '/pages/becas/index.html' }
        ]
    },
    {
        title: 'Comunidad',
        links: [
            { label: 'Directorio',           href: '/pages/comunidad/directorio.html' },
            { label: 'Ubicación',            href: '/pages/comunidad/ubicacion.html' },
            { label: 'Paraescolares',        href: '/pages/comunidad/paraescolares.html' },
            { label: 'Proyectos',            href: '/pages/comunidad/proyectos.html' },
            { label: 'Quejas y sugerencias', href: '/pages/participacion/quejas-sugerencias.html' }
        ]
    }
];

const SOCIAL = [
    { name: 'Facebook',  icon: 'i-facebook',  href: '#', color: '#1877F2' },
    { name: 'Instagram', icon: 'i-instagram', href: '#', color: '#E1306C' },
    { name: 'X',         icon: 'i-x',         href: '#', color: '#0F1226' },
    { name: 'YouTube',   icon: 'i-youtube',   href: '#', color: '#FF0000' }
];

const ICONS = {
    pin:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    phone:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    mail:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6 12 13 2 6"/></svg>`,
    arrowUp:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>`,
    arrowR: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
    radio:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49M7.76 16.24a6 6 0 0 1 0-8.49M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14"/></svg>`
};

const renderGroups = () => GROUPS.map(g => `
    <div class="site-footer__col">
        <h3 class="site-footer__title">
            <span class="site-footer__title-dot" aria-hidden="true"></span>${g.title}
        </h3>
        <ul class="site-footer__list">
            ${g.links.map(l => `
                <li><a class="site-footer__link" href="${l.href}">
                    <span class="site-footer__link-arrow" aria-hidden="true">${ICONS.arrowR}</span>
                    <span>${l.label}</span>
                </a></li>
            `).join('')}
        </ul>
    </div>
`).join('');

const renderSocial = () => SOCIAL.map(s => `
    <a class="site-footer__social-link" href="${s.href}" aria-label="${s.name} de la UTU"
       rel="noopener" style="--brand-color:${s.color}">
        <span class="site-footer__social-icon"><svg aria-hidden="true"><use href="#${s.icon}"></use></svg></span>
        <span class="site-footer__social-tip">${s.name}</span>
    </a>
`).join('');

export function html() {
    return `
<footer class="site-footer" role="contentinfo">
    <div class="site-footer__cta">
        <div class="container site-footer__cta-inner">
            <div class="site-footer__cta-text">
                <p class="site-footer__cta-eyebrow">#OrgullosamenteUTU · #ÚneteYa</p>
                <h2 class="site-footer__cta-title">Formación que se vive.<br><span>Conocimiento que se aplica.</span></h2>
                <p class="site-footer__cta-sub">Conoce la oferta académica de la UTU y forma parte de una ruta de formación con experiencia profesional.</p>
            </div>
            <div class="site-footer__cta-actions">
                <a class="footer-cta footer-cta--primary" href="/pages/oferta-educativa/index.html">
                    <span>Explora la oferta</span><span class="footer-cta__icon">${ICONS.arrowR}</span>
                </a>
                <a class="footer-cta footer-cta--ghost" href="/pages/comunidad/ubicacion.html"><span>Ubicación y contacto</span></a>
            </div>
        </div>
    </div>

    <div class="site-footer__body">
        <div class="container">
            <div class="site-footer__grid">
                <div class="site-footer__brand">
                    <img class="site-footer__logo" src="/assets/images/branding/logo-utu.png"
                         alt="Universidad Tecnológica del Usumacinta" width="2000" height="800"
                         loading="lazy" decoding="async" data-img-fallback="Logotipo UTU">
                    <p class="site-footer__about">
                        Institución de educación superior pública en Emiliano Zapata, Tabasco.
                        Formación con orientación práctica, vinculación con el sector productivo
                        y dos estadías profesionales.
                    </p>
                    <ul class="site-footer__contact">
                        <li class="site-footer__contact-item">
                            <span class="site-footer__contact-icon">${ICONS.pin}</span>
                            <span>Libramiento Glorieta Emiliano Zapata–Tenosique s/n<br>Col. Las Lomas, C.P. 86980<br>Emiliano Zapata, Tabasco, México</span>
                        </li>
                        <li class="site-footer__contact-item">
                            <span class="site-footer__contact-icon">${ICONS.phone}</span>
                            <span>Teléfonos institucionales — <em>próximamente</em></span>
                        </li>
                        <li class="site-footer__contact-item">
                            <span class="site-footer__contact-icon">${ICONS.mail}</span>
                            <span>Correos oficiales — <em>próximamente</em></span>
                        </li>
                    </ul>
                    <div class="site-footer__social" aria-label="Redes sociales oficiales">${renderSocial()}</div>
                    <div class="site-footer__radio">
                        <span class="site-footer__radio-icon">${ICONS.radio}</span>
                        <div>
                            <p class="site-footer__radio-title">Radio Universitaria <span class="site-footer__radio-badge">Próximamente</span></p>
                            <p class="site-footer__radio-sub">Cabina en proceso de acondicionamiento técnico.</p>
                        </div>
                    </div>
                </div>
                ${renderGroups()}
            </div>

            <div class="site-footer__bottom">
                <p class="site-footer__copy">© <span data-year>2026</span> Universidad Tecnológica del Usumacinta. Todos los derechos reservados.</p>
                <ul class="site-footer__legal">
                    <li><a href="#">Aviso de privacidad</a></li>
                    <li><a href="#">Términos de uso</a></li>
                    <li><a href="/pages/comunidad/ubicacion.html">Contacto</a></li>
                </ul>
                <p class="site-footer__made">Hecho en <span aria-hidden="true">Tabasco</span> <span class="site-footer__made-dot" aria-hidden="true"></span> México</p>
            </div>
        </div>
        <button type="button" class="site-footer__to-top" data-footer-top aria-label="Volver arriba">
            ${ICONS.arrowUp}
        </button>
    </div>
</footer>`;
}

export function init() {
    const btn = document.querySelector('[data-footer-top]');
    if (!btn) return;
    btn.addEventListener('click', () => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
    // Año dinámico
    const year = new Date().getFullYear();
    document.querySelectorAll('[data-year]').forEach(el => { el.textContent = year; });
}