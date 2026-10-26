/* ============================================================
   services/api.js — Capa de datos desacoplada
   ------------------------------------------------------------
   Hoy: lee JSON estáticos en /js/data/*.json
   Mañana: apunta a https://api.utu.edu.mx/v1 (cambiando
   CONFIG.API_BASE en core/config.js). El resto del sitio
   no se entera.
   ============================================================ */

import { CONFIG } from '../core/config.js';

/** Fetch genérico con manejo de error uniforme. */
async function fetchJSON(path) {
    const url = `${CONFIG.API_BASE}/${path}`;
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error(`No se pudo cargar ${url} (${res.status})`);
    return res.json();
}

/** Lista de noticias ordenadas por fecha descendente. */
export async function getNews() {
    const data = await fetchJSON('news.json');
    return data
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date));
}

/** Lista de eventos. */
export async function getEvents() {
    return fetchJSON('events.json');
}

/**
 * Punto de extensión: cuando exista la API real,
 * añade aquí getPrograms(), getScholarships(), etc.
 */