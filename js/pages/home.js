/* ============================================================
   pages/home.js — Render dinámico de la portada
   ------------------------------------------------------------
   · Hero, hero facts, intro, ruta, oferta, vida, galería,
     collage y CTA se generan desde site-content.js.
   · Noticias y eventos usan services/api.js (SITE_CONTENT).
   ============================================================ */

import { SITE_CONTENT } from '../../site-content.js';
import { CONFIG } from '../core/config.js';
import { escapeHTML, formatDateParts, isRecent, prefersReducedMotion } from '../core/utils.js';
import { getNews, getEvents } from '../services/api.js';

/* ---------- Helpers ---------- */
const get = (path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), SITE_CONTENT);

function sortVisible(arr) {
    return (arr || [])
        .filter(x => x.visible !== false)
        .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
}

/* ============================================================
   A) Aplicar textos por data-content
   ============================================================ */
function applyTextContent() {
    document.querySelectorAll('[data-content]').forEach(el => {
        const value = get(el.getAttribute('data-content'));
        if (value != null) el.textContent = value;
    });
    document.querySelectorAll('[data-content-href]').forEach(el => {
        const value = get(el.getAttribute('data-content-href'));
        if (value) el.setAttribute('href', value);
    });
    document.querySelectorAll('[data-img-content]').forEach(el => {
        const obj = get(el.getAttribute('data-img-content'));
        if (!obj) return;
        if (obj.src) el.setAttribute('src', obj.src);
        if (obj.alt) el.setAttribute('alt', obj.alt);
    });
}

/* ============================================================
   B) Hero
   ============================================================ */
function renderHero() {
    const track = document.querySelector('[data-carousel-track]');
    if (!track) return;
    const slides = sortVisible(SITE_CONTENT.hero?.slides);
    const total  = slides.length;

    track.innerHTML = slides.map((s, i) => {
        const isFirst = i === 0;
        const Tag     = isFirst ? 'h1' : 'h2';
        const titleId = isFirst ? ' id="hero-title"' : '';
        return `
            <article class="hero__slide${isFirst ? ' is-active' : ''}"
                     data-carousel-slide role="group"
                     aria-roledescription="diapositiva"
                     aria-label="${i + 1} de ${total}"
                     ${isFirst ? '' : 'aria-hidden="true"'}>
                <div class="hero__media">
                    <img src="${escapeHTML(s.image)}" alt="${escapeHTML(s.alt)}"
                         width="1920" height="1080"
                         ${isFirst ? 'fetchpriority="high"' : 'loading="lazy"'}
                         decoding="async"
                         data-img-fallback="${escapeHTML(s.fallback || s.alt)}">
                </div>
                <div class="hero__overlay">
                    <div class="container hero__content">
                        <p class="eyebrow eyebrow--on-dark">${escapeHTML(s.eyebrow)}</p>
                        <${Tag} class="hero__title"${titleId}>
                            ${escapeHTML(s.titulo)}
                            <span class="hero__title-accent">${escapeHTML(s.tituloAccent)}</span>
                        </${Tag}>
                        <p class="hero__lead">${escapeHTML(s.lead)}</p>
                    </div>
                </div>
            </article>`;
    }).join('');
}

/* ============================================================
   C) Hero facts
   ============================================================ */
function renderHeroFacts() {
    const wrap = document.querySelector('[data-hero-facts]');
    if (!wrap) return;
    wrap.innerHTML = sortVisible(SITE_CONTENT.heroFacts).map(f => {
        if (f.count != null) {
            const suffix = f.suffix || '';
            return `<li class="hero__fact">
                <strong data-count="${f.count}" data-count-suffix="${escapeHTML(suffix)}">${f.count}${suffix}</strong>
                <span>${escapeHTML(f.label)}</span>
            </li>`;
        }
        return `<li class="hero__fact">
            <strong>${escapeHTML(f.display || '')}</strong>
            <span>${escapeHTML(f.label)}</span>
        </li>`;
    }).join('');
}

/* ============================================================
   D) Intro (facts + pillars)
   ============================================================ */
function renderIntroFacts() {
    const wrap = document.querySelector('[data-intro-facts]');
    if (!wrap) return;
    wrap.innerHTML = sortVisible(SITE_CONTENT.institucional?.intro?.facts).map(f => `
        <li class="intro__fact">
            <span class="intro__fact-icon" aria-hidden="true">
                <svg class="icon"><use href="#${escapeHTML(f.icon)}"></use></svg>
            </span>
            <div class="intro__fact-body">
                <span class="intro__fact-value">${escapeHTML(f.value)}</span>
                <span class="intro__fact-label">${escapeHTML(f.label)}</span>
            </div>
        </li>`).join('');
}

function renderIntroPillars() {
    const wrap = document.querySelector('[data-intro-pillars]');
    if (!wrap) return;
    wrap.innerHTML = sortVisible(SITE_CONTENT.institucional?.intro?.pillars).map((p, i) => `
        <li class="pillar reveal"${i ? ` data-reveal-delay="${i * 90}"` : ''}>
            <div class="pillar__head">
                <span class="pillar__icon"><svg class="icon" aria-hidden="true"><use href="#${escapeHTML(p.icon)}"></use></svg></span>
                <span class="pillar__num" aria-hidden="true">${escapeHTML(p.num)}</span>
            </div>
            <h3 class="pillar__title">${escapeHTML(p.title)}</h3>
            <p class="pillar__text">${escapeHTML(p.text)}</p>
        </li>`).join('');
}

/* ============================================================
   E) Ruta académica
   ============================================================ */
function renderRuta() {
    const wrap = document.querySelector('[data-ruta-steps]');
    if (!wrap) return;
    wrap.innerHTML = sortVisible(SITE_CONTENT.institucional?.ruta?.steps).map((s, i) => `
        <li class="route__step${s.final ? ' route__step--final' : ''} reveal"${i ? ` data-reveal-delay="${i * 80}"` : ''}>
            <div class="route__node" aria-hidden="true">${escapeHTML(s.num)}</div>
            <article class="route__body">
                <p class="route__meta">${escapeHTML(s.meta)}</p>
                <h3 class="route__title">${escapeHTML(s.title)}</h3>
                <p class="route__text">${escapeHTML(s.text)}</p>
            </article>
        </li>`).join('');
}

/* ============================================================
   F) Programas / Oferta educativa
   ============================================================ */
const FACT_ICONS = {
    clock:       '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    certificate: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>',
    bolt:        '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>'
};

const SPARKLE_SVG = `
    <svg class="program-card__sparkle" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.5l1.6 4.5 4.4 1.6-4.4 1.6L12 14.7l-1.6-4.5L6 8.6l4.4-1.6L12 2.5z"/>
        <path d="M19 13.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z"/>
        <path d="M5 14.5l.6 1.6 1.6.6-1.6.6L5 18.9l-.6-1.6L2.8 16.7l1.6-.6L5 14.5z"/>
    </svg>`;

function buildProgramCard(c, index) {
    const num = String(index + 1).padStart(2, '0');
    const isFeatured = !!c.featured;
    const levelBadge = isFeatured && c.badgeNuevo
        ? `<span class="program-card__level-badge program-card__level-badge--new">${SPARKLE_SVG}${escapeHTML(c.badgeNuevo)}</span>`
        : `<span class="program-card__level-badge">${escapeHTML(c.nivel)}</span>`;

    const factsHTML = (c.facts || []).map(f => {
        const icon = FACT_ICONS[f.icon] || '';
        return `<li>${icon}<span>${escapeHTML(f.text)}</span></li>`;
    }).join('');

    const delay = index * 60;

    return `
        <article class="program-card${isFeatured ? ' program-card--featured' : ''} reveal"
                 ${delay ? `data-reveal-delay="${delay}"` : ''}
                 ${isFeatured ? 'data-featured-card' : ''}>
            <figure class="program-card__media">
                <img src="${escapeHTML(c.imagen)}" alt="${escapeHTML(c.alt)}"
                     width="900" height="600" loading="lazy" decoding="async">
                <span class="program-card__num" aria-hidden="true">${num}</span>
                ${levelBadge}
                <span class="program-card__area-badge">
                    <span class="program-card__area-dot" aria-hidden="true"></span>
                    ${escapeHTML(c.area)}
                </span>
            </figure>
            <div class="program-card__body">
                <p class="program-card__eyebrow">
                    <span class="program-card__eyebrow-dot" aria-hidden="true"></span>
                    ${escapeHTML(c.eyebrow)}
                </p>
                <h3 class="program-card__title">${escapeHTML(c.nombre)}</h3>
                <p class="program-card__tagline">${escapeHTML(c.tagline)}</p>
                <ul class="program-card__facts" aria-label="Datos del programa">${factsHTML}</ul>
                <a class="program-card__cta" href="${escapeHTML(c.enlace)}">
                    <span class="program-card__cta-text">${escapeHTML(c.ctaLabel || 'Ver programa')}</span>
                    <span class="program-card__cta-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
                    </span>
                </a>
            </div>
        </article>`;
}

function renderPrograms() {
    const grid = document.querySelector('[data-programs-grid]');
    if (!grid) return;
    grid.innerHTML = sortVisible(SITE_CONTENT.oferta?.carreras).map(buildProgramCard).join('');
}

/* ============================================================
   G) Vida universitaria
   ============================================================ */
function renderLifeStats() {
    const wrap = document.querySelector('[data-life-stats]');
    if (!wrap) return;
    wrap.innerHTML = sortVisible(SITE_CONTENT.vidaUniversitaria?.stats).map(s => `
        <li class="life__stat">
            <strong data-count="${s.count}">0</strong>
            <span>${escapeHTML(s.label)}</span>
        </li>`).join('');
}

function renderLifeCats() {
    const wrap = document.querySelector('[data-life-cats]');
    if (!wrap) return;
    wrap.innerHTML = (SITE_CONTENT.vidaUniversitaria?.categorias || []).map(c =>
        `<span class="life__cat ${escapeHTML(c.class)}">${escapeHTML(c.label)}</span>`
    ).join('');
}

/* ============================================================
   H) Galería vintage
   ============================================================ */
function renderVintageGallery() {
    const stage = document.querySelector('[data-vintage-stage]');
    if (!stage) return;

    // Idempotencia: eliminar slides previas si se re-renderiza
    stage.querySelectorAll('[data-vintage-slide]').forEach(el => el.remove());

    const items = sortVisible(SITE_CONTENT.vidaUniversitaria?.galeria);
    const total = items.length;
    const stamp = stage.querySelector('.vintage__stamp');

    const slidesHTML = items.map((g, i) => `
        <figure class="vintage__slide${i === 0 ? ' is-active' : ''}" data-vintage-slide>
            <div class="vintage__frame">
                <div class="vintage__photo">
                    <img src="${escapeHTML(g.src)}" alt="${escapeHTML(g.alt)}"
                         width="900" height="700" loading="lazy" decoding="async">
                    <span class="vintage__cat vintage__cat--${escapeHTML(g.catSlug)}">
                        <span class="vintage__cat-dot" aria-hidden="true"></span>${escapeHTML(g.categoria)}
                    </span>
                </div>
                <figcaption class="vintage__caption">
                    <span class="vintage__caption-num">${String(i + 1).padStart(2, '0')}</span>
                    <span class="vintage__caption-text">${escapeHTML(g.caption)}</span>
                </figcaption>
            </div>
        </figure>`).join('');

    if (stamp) stamp.insertAdjacentHTML('beforebegin', slidesHTML);
    else stage.insertAdjacentHTML('afterbegin', slidesHTML);

    const totalEl = stage.querySelector('[data-vintage-total]');
    if (totalEl) totalEl.textContent = String(total).padStart(2, '0');
}

/* ============================================================
   I) Collage
   ============================================================ */
function renderCollage() {
    const wrap = document.querySelector('[data-collage]');
    if (!wrap) return;
    const items = sortVisible(SITE_CONTENT.collage?.imagenes);
    wrap.innerHTML = items.map((img, i) => `
        <button class="collage__cell collage__cell--${escapeHTML(img.cell)}"
                data-lightbox-index="${i}" aria-label="Ampliar imagen ${i + 1}">
            <img src="${escapeHTML(img.src)}" alt="${escapeHTML(img.alt)}"
                 loading="lazy" decoding="async" width="1200" height="1000">
        </button>`).join('');
}

/* ============================================================
   J) CTA
   ============================================================ */
function renderCta() {
    const wrap = document.querySelector('[data-cta-buttons]');
    if (!wrap) return;
    wrap.innerHTML = (SITE_CONTENT.cta?.botones || []).map(b => `
        <a class="btn ${escapeHTML(b.style)}" href="${escapeHTML(b.href)}">
            ${escapeHTML(b.label)}
            ${b.icon ? '<svg class="icon btn__icon" aria-hidden="true"><use href="#i-arrow-right"></use></svg>' : ''}
        </a>`).join('');
}

/* ============================================================
   K) Noticias
   ============================================================ */
function buildNewsCard(item, isFeatured) {
    const date = formatDateParts(item.date);
    const recent = isRecent(item.date, CONFIG.NEW_WINDOW_DAYS);
    const catClass = `news-card__cat--${item.category}`;

    const article = document.createElement('article');
    article.className = 'news-card reveal' + (isFeatured ? ' news-card--feature' : '');
    article.setAttribute('data-news-id', item.id);

    article.innerHTML = `
        <figure class="news-card__media">
            <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title)}"
                 loading="lazy" decoding="async" data-img-fallback="${escapeHTML(item.title)}">
            <span class="news-card__cat ${catClass}">
                <span class="news-card__cat-dot" aria-hidden="true"></span>
                ${escapeHTML(item.categoryLabel)}
            </span>
            ${recent ? '<span class="news-card__new">Nuevo</span>' : ''}
        </figure>
        <div class="news-card__body">
            <div class="news-card__meta">
                <time class="news-card__date" datetime="${item.date}">
                    <span class="news-card__date-day">${date.day}</span>
                    <span class="news-card__date-month">${date.month}</span>
                    <span class="news-card__date-year">${date.year}</span>
                </time>
                <span class="news-card__read">${item.readMinutes} min de lectura</span>
            </div>
            <h3 class="news-card__title"><a href="${escapeHTML(item.url)}">${escapeHTML(item.title)}</a></h3>
            <p class="news-card__excerpt">${escapeHTML(item.excerpt)}</p>
            ${isFeatured ? `
                <a class="news-card__cta" href="${escapeHTML(item.url)}">
                    Leer noticia
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
                </a>` : ''}
        </div>`;
    return article;
}

function buildPageRange(current, total) {
    const range = [];
    if (total <= 7) { for (let i = 1; i <= total; i++) range.push(i); return range; }
    range.push(1);
    const start = Math.max(2, current - 1);
    const end   = Math.min(total - 1, current + 1);
    if (start > 2) range.push('gap-left');
    for (let i = start; i <= end; i++) range.push(i);
    if (end < total - 1) range.push('gap-right');
    range.push(total);
    return range;
}

async function initNews() {
    const grid       = document.querySelector('[data-news-grid]');
    const emptyEl    = document.querySelector('[data-news-empty]');
    const noteEl     = document.querySelector('[data-news-note]');
    const pagination = document.querySelector('[data-news-pagination]');
    const pagesWrap  = document.querySelector('[data-news-pages]');
    const prevBtn    = document.querySelector('[data-news-prev]');
    const nextBtn    = document.querySelector('[data-news-next]');
    const statusEl   = document.querySelector('[data-news-status]');
    if (!grid) return;

    let items;
    try { items = await getNews(); }
    catch (err) { console.error(err); if (emptyEl) emptyEl.hidden = false; return; }

    const totalItems = items.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / CONFIG.NEWS_PER_PAGE));
    let currentPage = 1;

    if (!totalItems) {
        if (emptyEl) emptyEl.hidden = false;
        if (pagination) pagination.hidden = true;
        if (noteEl) noteEl.hidden = true;
        return;
    }
    if (emptyEl) emptyEl.hidden = true;
    if (noteEl) noteEl.hidden = false;

    function renderPage(page) {
        const start = (page - 1) * CONFIG.NEWS_PER_PAGE;
        const pageItems = items.slice(start, start + CONFIG.NEWS_PER_PAGE);
        grid.innerHTML = '';
        pageItems.forEach((item, i) => {
            const card = buildNewsCard(item, i === 0);
            if (i > 0) card.setAttribute('data-reveal-delay', String(Math.min(i * 50, 400)));
            grid.appendChild(card);
        });

        // ✅ FIX: observar las tarjetas recién creadas para que sean visibles
        if (window.UTU?.observeReveals) {
            window.UTU.observeReveals(grid);
        } else {
            grid.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
        }
    }

    function renderPagination() {
        if (!pagination || !pagesWrap || totalPages <= 1) { if (pagination) pagination.hidden = true; return; }
        pagination.hidden = false;
        pagesWrap.innerHTML = '';
        buildPageRange(currentPage, totalPages).forEach(p => {
            const li = document.createElement('li');
            if (typeof p === 'string') {
                const span = document.createElement('span');
                span.className = 'news__page-gap';
                span.textContent = '…';
                span.setAttribute('aria-hidden', 'true');
                li.appendChild(span);
            } else {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'news__page-btn';
                btn.textContent = p;
                btn.setAttribute('aria-label', `Ir a la página ${p} de ${totalPages}`);
                if (p === currentPage) btn.setAttribute('aria-current', 'page');
                btn.addEventListener('click', () => goToPage(p));
                li.appendChild(btn);
            }
            pagesWrap.appendChild(li);
        });
        if (prevBtn) prevBtn.disabled = currentPage === 1;
        if (nextBtn) nextBtn.disabled = currentPage === totalPages;
        if (statusEl) statusEl.textContent = `Mostrando página ${currentPage} de ${totalPages}.`;
    }

    function goToPage(page) {
        if (page === currentPage) return;
        currentPage = page;
        renderPage(currentPage);
        renderPagination();
    }
    prevBtn?.addEventListener('click', () => currentPage > 1 && goToPage(currentPage - 1));
    nextBtn?.addEventListener('click', () => currentPage < totalPages && goToPage(currentPage + 1));

    renderPage(currentPage);
    renderPagination();
}

/* ============================================================
   L) Eventos
   ============================================================ */
async function initEvents() {
    const track    = document.querySelector('[data-events-track]');
    const viewport = document.querySelector('[data-events-viewport]');
    const prev     = document.querySelector('[data-events-prev]');
    const next     = document.querySelector('[data-events-next]');
    const note     = document.querySelector('[data-events-note]');
    if (!track) return;

    let events;
    try { events = await getEvents(); }
    catch (err) { console.error(err); return; }

    track.innerHTML = events.map(ev => `
        <li class="events__slide">
            <div class="events__body">
                <p class="events__date">
                    <svg class="icon" aria-hidden="true" width="14" height="14"><use href="#i-calendar"></use></svg>
                    ${escapeHTML(ev.date)}
                </p>
                <h3 class="events__title">${escapeHTML(ev.title)}</h3>
                <p class="events__text">${escapeHTML(ev.text)}</p>
                <p class="events__meta">
                    <svg class="icon" aria-hidden="true" width="14" height="14"><use href="#i-location"></use></svg>
                    ${escapeHTML(ev.place)}
                </p>
            </div>
        </li>`).join('');

    if (note) note.hidden = false;
    if (!viewport) return;

    const step = () => {
        const slide = track.querySelector('.events__slide');
        return slide ? slide.getBoundingClientRect().width + 24 : 320;
    };
    prev?.addEventListener('click', () => viewport.scrollBy({ left: -step(), behavior: 'smooth' }));
    next?.addEventListener('click', () => viewport.scrollBy({ left:  step(), behavior: 'smooth' }));
}

/* ============================================================
   M) Confeti de la card destacada
   ============================================================ */
function launchConfetti(originEl) {
    if (prefersReducedMotion() || !originEl) return;
    const rect = originEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const colors = ['#30BF97', '#7EE0C2', '#30348C', '#FFB800', '#FF8F00', '#FFFFFF'];
    for (let i = 0; i < 34; i++) {
        const bit = document.createElement('span');
        bit.className = 'confetti-bit';
        bit.style.left = `${cx}px`;
        bit.style.top  = `${cy}px`;
        bit.style.background = colors[Math.floor(Math.random() * colors.length)];
        bit.style.setProperty('--x', `${(Math.random() - 0.5) * 460}px`);
        bit.style.setProperty('--y', `${-Math.random() * 280 - 80}px`);
        bit.style.setProperty('--r', `${Math.random() * 900 - 450}deg`);
        bit.style.setProperty('--d', `${0.95 + Math.random() * 0.7}s`);
        document.body.appendChild(bit);
        setTimeout(() => bit.remove(), 1800);
    }
}

function initFeaturedCard() {
    const card = document.querySelector('[data-featured-card]');
    if (!card || !('IntersectionObserver' in window) || prefersReducedMotion()) return;

    let fired = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!fired && entry.isIntersecting) {
                fired = true;
                setTimeout(() => {
                    const badge = card.querySelector('.program-card__level-badge--new');
                    launchConfetti(badge || card);
                }, 350);
                observer.disconnect();
            }
        });
    }, { threshold: 0.55 });
    observer.observe(card);
}

/* ============================================================
   N) Init
   ============================================================ */
export function init() {
    // ✅ FIX: sincronizar autoplay desde site-content.js
    const carouselRoot = document.querySelector('[data-carousel]');
    if (carouselRoot && SITE_CONTENT.hero?.autoplayMs) {
        carouselRoot.setAttribute('data-autoplay', String(SITE_CONTENT.hero.autoplayMs));
    }

    applyTextContent();
    renderHero();
    renderHeroFacts();
    renderIntroFacts();
    renderIntroPillars();
    renderRuta();
    renderPrograms();
    renderLifeStats();
    renderLifeCats();
    renderVintageGallery();
    renderCollage();
    renderCta();
    initNews();
    initEvents();
    initFeaturedCard();
}