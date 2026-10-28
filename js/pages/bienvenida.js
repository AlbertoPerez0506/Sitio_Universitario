/* ============================================================
   pages/bienvenida.js — Render dinámico de la página del Rector
   ------------------------------------------------------------
   ▸ Aplica textos desde [data-content].
   ▸ Renderiza párrafos del mensaje con marcas [destacado].
   ▸ Renderiza la cuadrícula de valores.
   ▸ Renderiza los botones del CTA.
   ============================================================ */

import { BIENVENIDA_CONTENT } from '../../bienvenida-content.js';
import { escapeHTML } from '../core/utils.js';

/* ---------- Helpers ---------- */
const get = (path) =>
    path.split('.').reduce((o, k) => (o == null ? o : o[k]), BIENVENIDA_CONTENT);

function applyTextContent() {
    document.querySelectorAll('[data-content]').forEach((el) => {
        const value = get(el.getAttribute('data-content'));
        if (value != null) el.textContent = value;
    });

    document.querySelectorAll('[data-content-href]').forEach((el) => {
        const value = get(el.getAttribute('data-content-href'));
        if (value) el.setAttribute('href', value);
    });

    document.querySelectorAll('[data-img-content]').forEach((el) => {
        const obj = get(el.getAttribute('data-img-content'));
        if (!obj) return;
        if (obj.src) el.setAttribute('src', obj.src);
        if (obj.alt) el.setAttribute('alt', obj.alt);
        if (obj.fallback) el.setAttribute('data-img-fallback', obj.fallback);
    });
}

/* ---------- Mensaje con marcas [destacado] ---------- */
function renderMensaje() {
    const wrap = document.querySelector('[data-mensaje-paragraphs]');
    if (!wrap) return;

    const parrafos = BIENVENIDA_CONTENT.mensaje?.parrafos || [];
    wrap.innerHTML = parrafos
        .map((p) => {
            let text = escapeHTML(p.texto);
            text = text.replace(
                /\[([^\]]+)\]/g,
                '<span class="bienvenida__highlight">$1</span>'
            );
            const cls =
                p.tipo === 'lead'
                    ? 'bienvenida__paragraph bienvenida__paragraph--lead'
                    : 'bienvenida__paragraph';
            return `<p class="${cls}">${text}</p>`;
        })
        .join('');
}

/* ---------- Valores ---------- */
function renderValores() {
    const wrap = document.querySelector('[data-valores-grid]');
    if (!wrap) return;

    const items = BIENVENIDA_CONTENT.valores?.items || [];
    wrap.innerHTML = items
        .map((v, i) => `
            <li class="valor-card reveal"${i ? ` data-reveal-delay="${i * 90}"` : ''}>
                <span class="valor-card__icon" aria-hidden="true">
                    <svg class="icon"><use href="#${escapeHTML(v.icon)}"></use></svg>
                </span>
                <div class="valor-card__body">
                    <h3 class="valor-card__title">${escapeHTML(v.title)}</h3>
                    <p class="valor-card__text">${escapeHTML(v.text)}</p>
                </div>
            </li>
        `)
        .join('');
}

/* ---------- CTA ---------- */
function renderCta() {
    const wrap = document.querySelector('[data-cta-buttons]');
    if (!wrap) return;

    const botones = BIENVENIDA_CONTENT.cta?.botones || [];
    wrap.innerHTML = botones
        .map((b) => `
            <a class="btn ${escapeHTML(b.style)}" href="${escapeHTML(b.href)}">
                ${escapeHTML(b.label)}
                ${b.icon ? '<svg class="icon btn__icon" aria-hidden="true"><use href="#i-arrow-right"></use></svg>' : ''}
            </a>
        `)
        .join('');
}

/* ---------- Init ---------- */
export function init() {
    applyTextContent();
    renderMensaje();
    renderValores();
    renderCta();
}