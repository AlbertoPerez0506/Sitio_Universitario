/* ============================================================
   pages/home.js — Lógica específica de la portada
   · Noticias con paginación
   · Eventos en carrusel horizontal
   · Celebración de la card destacada (confeti)
   ============================================================ */

import { CONFIG } from '../core/config.js';
import { escapeHTML, formatDateParts, isRecent, prefersReducedMotion } from '../core/utils.js';
import { getNews, getEvents } from '../services/api.js';

/* ---------- Confeti ligero ---------- */
function launchConfetti(originEl) {
    if (prefersReducedMotion() || !originEl) return;
    const rect = originEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const colors = ['#30BF97', '#7EE0C2', '#30348C', '#FFB800', '#FF8F00', '#FFFFFF'];
    const count = 34;

    for (let i = 0; i < count; i++) {
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

/* ---------- Noticias (sin cambios funcionales) ---------- */

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
        </div>
    `;
    return article;
}

function buildPageRange(current, total) {
    const range = [];
    if (total <= 7) {
        for (let i = 1; i <= total; i++) range.push(i);
        return range;
    }
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
    try {
        items = await getNews();
    } catch (err) {
        console.error(err);
        if (emptyEl) emptyEl.hidden = false;
        return;
    }

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
        if (window.UTU?.observeReveals) window.UTU.observeReveals(grid);
        else grid.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
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

/* ---------- Eventos ---------- */

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
        </li>
    `).join('');

    if (note) note.hidden = false;
    if (!viewport) return;

    const step = () => {
        const slide = track.querySelector('.events__slide');
        return slide ? slide.getBoundingClientRect().width + 24 : 320;
    };
    prev?.addEventListener('click', () => viewport.scrollBy({ left: -step(), behavior: 'smooth' }));
    next?.addEventListener('click', () => viewport.scrollBy({ left:  step(), behavior: 'smooth' }));
}

/* ---------- Celebración de la card destacada ---------- */
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

/* ---------- Init ---------- */
export function init() {
    initNews();
    initEvents();
    initFeaturedCard();
}