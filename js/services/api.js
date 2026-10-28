/* ============================================================
   services/api.js — Capa de datos
   ------------------------------------------------------------
   Fuente actual: window.UTU_SITE_CONTENT (site-content.js)
   Futuro: migrar a fetch de CONFIG.API_BASE cuando exista backend.
   ============================================================ */

export async function getNews() {
    const items = window.UTU_SITE_CONTENT?.noticias?.items ?? [];
    return [...items].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getEvents() {
    return [...(window.UTU_SITE_CONTENT?.eventos?.items ?? [])];
}