/* ============================================================
   js/pages/bienvenida.js — Módulo de la página de Bienvenida
   ============================================================ */

import welcomeContent from '/bienvenida-content.js';

/* Cola de cleanups (particles, counters, etc.) */
let cleanups = [];

/* ------------------------------------------------------------
   API pública
   ------------------------------------------------------------ */
export function init() {
    applyContent(welcomeContent);
    renderRector(welcomeContent.rector);
    renderHighlights(welcomeContent.highlights);

    const particlesCleanup = initParticles();
    if (typeof particlesCleanup === 'function') cleanups.push(particlesCleanup);

    const countersCleanup = initCounters();
    if (typeof countersCleanup === 'function') cleanups.push(countersCleanup);
}

export function cleanup() {
    cleanups.forEach((fn) => fn());
    cleanups = [];
}

/* ------------------------------------------------------------
   1. Aplicación de contenido
   ------------------------------------------------------------ */
function applyContent(data) {
    document.querySelectorAll('[data-content]').forEach((el) => {
        const path = el.dataset.content;
        const value = getValue(data, path);
        if (value !== undefined && value !== null && value !== '') {
            el.textContent = value;
        }
    });

    document.querySelectorAll('[data-content-href]').forEach((el) => {
        const path = el.dataset.contentHref;
        const value = getValue(data, path);
        if (value) el.setAttribute('href', value);
    });
}

function getValue(obj, path) {
    if (!path) return undefined;
    return path.split('.').reduce((acc, key) => (acc && acc[key]), obj);
}

/* ------------------------------------------------------------
   2. Render del bloque del Rector
   ------------------------------------------------------------ */
function renderRector(rector) {
    if (!rector) return;

    /* --- Mensaje --- */
    const messageEl = document.querySelector('[data-rector-message]');
    if (messageEl) {
        const hasMessage =
            Array.isArray(rector.message) && rector.message.length > 0;

        if (hasMessage) {
            messageEl.innerHTML = rector.message
                .map((p) => `<p>${escapeHtml(p)}</p>`)
                .join('');
        } else {
            messageEl.innerHTML =
                '<p class="welcome-rector__placeholder">' +
                'El mensaje oficial del Rector de la Universidad ' +
                'Tecnológica del Usumacinta se incorporará próximamente.' +
                '</p>';
        }
    }

    /* --- Firma --- */
    const signatureEl = document.querySelector('[data-rector-signature]');
    if (signatureEl) {
        if (rector.signature) {
            signatureEl.innerHTML =
                `<img src="${escapeAttr(rector.signature)}" ` +
                `alt="Firma del Rector" loading="lazy" decoding="async">`;
        } else {
            signatureEl.innerHTML =
                '<span class="welcome-rector__signature-placeholder">' +
                'Espacio reservado para la firma oficial del Rector' +
                '</span>';
        }
    }

    /* --- Retrato --- */
    const portraitEl = document.querySelector('[data-rector-portrait]');
    if (portraitEl) {
        if (rector.photo) {
            portraitEl.innerHTML =
                `<img src="${escapeAttr(rector.photo)}" ` +
                `alt="${escapeAttr(rector.photoAlt || 'Rector')}" ` +
                `loading="lazy" decoding="async" width="800" height="1000">`;
        } else {
            portraitEl.innerHTML = `
                <div class="welcome-rector__portrait-placeholder"
                     role="img"
                     aria-label="Espacio reservado para la fotografía oficial del Rector">
                    <svg viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="1.4"
                         stroke-linecap="round" stroke-linejoin="round"
                         aria-hidden="true">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <span>Espacio reservado para la fotografía oficial del Rector</span>
                </div>
            `;
        }
    }

    /* --- Datos de identificación --- */
    const nameEl = document.querySelector('[data-content="rector.name"]');
    if (nameEl && !rector.name) {
        nameEl.textContent = 'Nombre del Rector';
        nameEl.classList.add('is-placeholder');
    }

    const positionEl = document.querySelector('[data-content="rector.position"]');
    if (positionEl && !rector.position) {
        positionEl.textContent =
            'Rector(a) de la Universidad Tecnológica del Usumacinta';
        positionEl.classList.add('is-placeholder');
    }
}

/* ------------------------------------------------------------
   3. Render de la franja de datos
   ------------------------------------------------------------ */
function renderHighlights(highlights) {
    const grid = document.querySelector('[data-highlights-grid]');
    if (!grid || !highlights || !Array.isArray(highlights.items)) return;

    grid.innerHTML = highlights.items
        .map((item) => {
            if (item.text) {
                return `
                    <div class="welcome-stat">
                        <span class="welcome-stat__value welcome-stat__value--text">${escapeHtml(item.text)}</span>
                        <span class="welcome-stat__label">${escapeHtml(item.label)}</span>
                    </div>
                `;
            }
            return `
                <div class="welcome-stat">
                    <span class="welcome-stat__value"
                          data-counter="${item.value}"
                          data-counter-suffix="${escapeAttr(item.suffix || '')}">${item.value}${escapeHtml(item.suffix || '')}</span>
                    <span class="welcome-stat__label">${escapeHtml(item.label)}</span>
                </div>
            `;
        })
        .join('');
}

/* ------------------------------------------------------------
   4. Contadores animados
   ------------------------------------------------------------ */
function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return null;

    const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    const activeRafs = new Set();

    const animate = (el) => {
        const target = parseInt(el.dataset.counter, 10) || 0;
        const suffix = el.dataset.counterSuffix || '';

        if (prefersReduced) {
            el.textContent = target + suffix;
            return;
        }

        const duration = 1400;
        const start = performance.now();

        const step = (now) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (t < 1) {
                const id = requestAnimationFrame(step);
                activeRafs.add(id);
            }
        };

        const id = requestAnimationFrame(step);
        activeRafs.add(id);
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animate(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.4, rootMargin: '0px 0px -10% 0px' }
    );

    counters.forEach((c) => observer.observe(c));

    return () => {
        observer.disconnect();
        activeRafs.forEach((id) => cancelAnimationFrame(id));
        activeRafs.clear();
    };
}

/* Utilidades de escape */
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
function escapeAttr(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

/* ------------------------------------------------------------
   5. Canvas de partículas tipo constelación
   ------------------------------------------------------------ */
function initParticles() {
    const canvas = document.querySelector('[data-welcome-particles]');
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    const PALETTE = [
        { r: 48, g: 52, b: 140 },
        { r: 48, g: 62, b: 140 },
        { r: 48, g: 191, b: 151 },
        { r: 126, g: 224, b: 194 },
    ];

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let animationId = null;
    let isVisible = true;

    const CONNECT_DIST = 140;
    const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;

    function computeCount() {
        const w = window.innerWidth;
        if (w < 640) return 28;
        if (w < 1024) return 45;
        return 70;
    }

    function resize() {
        const rect = canvas.getBoundingClientRect();
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = rect.width;
        height = rect.height;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createParticles() {
        particles = [];
        const count = computeCount();
        for (let i = 0; i < count; i++) {
            const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.28,
                vy: (Math.random() - 0.5) * 0.28,
                r: Math.random() * 1.6 + 0.8,
                color,
                opacity: Math.random() * 0.4 + 0.3,
            });
        }
    }

    function drawFrame() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const a = particles[i];
            for (let j = i + 1; j < particles.length; j++) {
                const b = particles[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const distSq = dx * dx + dy * dy;
                if (distSq < CONNECT_DIST_SQ) {
                    const alpha = (1 - distSq / CONNECT_DIST_SQ) * 0.18;
                    ctx.strokeStyle = `rgba(48, 52, 140, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        }

        for (const p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.opacity})`;
            ctx.fill();
        }
    }

    function update() {
        for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < -20) p.x = width + 20;
            else if (p.x > width + 20) p.x = -20;
            if (p.y < -20) p.y = height + 20;
            else if (p.y > height + 20) p.y = -20;
        }
    }

    function loop() {
        if (!isVisible) return;
        update();
        drawFrame();
        animationId = requestAnimationFrame(loop);
    }

    function start() {
        if (animationId || prefersReduced) return;
        isVisible = true;
        loop();
    }

    function stop() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }

    function handleVisibility() {
        if (document.hidden) {
            isVisible = false;
            stop();
        } else {
            isVisible = true;
            start();
        }
    }

    let resizeTimeout;
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resize();
            createParticles();
            if (prefersReduced) drawFrame();
        }, 200);
    }

    resize();
    createParticles();

    if (prefersReduced) {
        drawFrame();
    } else {
        start();
    }

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibility);

    return function cleanupParticles() {
        stop();
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('visibilitychange', handleVisibility);
    };
}

export default init;