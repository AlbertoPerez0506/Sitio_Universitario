/* ============================================================
   pages/himno.js — Página del Himno institucional UTU (v3)
   ------------------------------------------------------------
   · Badge circular tipo vinilo (reemplaza la espiral)
   · Player con estados .is-playing / .is-unavailable correctos
   · Atajos de teclado solo en PC: Espacio, ←, →
   ============================================================ */

import { prefersReducedMotion } from '../core/utils.js';

// ═══════════════════════════════════════════════════════════
//  CONFIGURACIÓN
// ═══════════════════════════════════════════════════════════

const AUDIO_URL      = '/assets/audio/himno-utu.mp3';
const AUDIO_FILENAME = 'himno-utu.mp3';

const SPEEDS      = [1, 1.25, 1.5, 0.75];
const WAVE_BARS   = 88;
const KEYBOARD_SEEK_STEP = 5;   // segundos por flecha

const LYRICS_DATA = [
    { time: 9.01,   text: 'Universidad Tecnológica del Usumacinta' },
    { time: 17.90,  text: 'Fuerza que trabaja con espíritu y lealtad' },
    { time: 21.96,  text: 'Símbolo de mi Universidad' },
    { time: 25.23,  text: 'La herramienta técnica humanística y real' },
    { time: 29.37,  text: 'Que contribuye al desarrollo regional' },
    { time: 33.66,  text: 'Vamos por el rumbo del progreso y bienestar' },
    { time: 37.61,  text: 'Con profesionistas de un modelo innovador' },
    { time: 41.34,  text: 'Con un compromiso de cultural Nacional' },
    { time: 45.13,  text: 'En un nivel de educación muy superior.' },
    { time: 48.57,  text: 'Universidad Tecnológica del Usumacinta' },
    { time: 60.94,  text: 'En la misión voy a triunfar' },
    { time: 64.79,  text: 'Porque soy emprendedor' },
    { time: 68.96,  text: 'Con un sistema de gestión de calidad' },
    { time: 72.25,  text: 'Y con el sector productivo y social' },
    { time: 76.30,  text: 'Universidad Tecnológica del Usumacinta' },
    { time: 85.56,  text: 'Trabajamos para transformar' },
    { time: 89.13,  text: 'Un estado nuevo de excelencia y calidad.' },
    { time: 93.12,  text: 'Somos fuerza joven de un Tabasco ideal' },
    { time: 96.23,  text: 'Certificada a nivel internacional' },
    { time: 100.89, text: 'Con tecnología de excelente calidad' },
    { time: 104.81, text: 'Vinculando áreas del sistema empresarial' },
    { time: 108.83, text: 'Con profesionistas de una gran capacidad' },
    { time: 112.11, text: 'Contribuyendo al desarrollo nacional' },
    { time: 115.94, text: 'Universidad Tecnológica del Usumacinta' },
    { time: 129.64, text: 'Mi Universidad' }
];

const STANZAS = [
    {
        title: 'Primera estrofa',
        lines: [
            'Universidad Tecnológica del Usumacinta',
            'Fuerza que trabaja con espíritu y lealtad',
            'Símbolo de mi Universidad',
            'La herramienta técnica humanística y real',
            'Que contribuye al desarrollo regional',
            'Vamos por el rumbo del progreso y bienestar',
            'Con profesionistas de un modelo innovador',
            'Con un compromiso de cultural Nacional',
            'En un nivel de educación muy superior.'
        ]
    },
    {
        title: 'Segunda estrofa',
        lines: [
            'Universidad Tecnológica del Usumacinta',
            'En la misión voy a triunfar',
            'Porque soy emprendedor',
            'Con un sistema de gestión de calidad',
            'Y con el sector productivo y social',
            'Universidad Tecnológica del Usumacinta',
            'Trabajamos para transformar',
            'Un estado nuevo de excelencia y calidad.'
        ]
    },
    {
        title: 'Tercera estrofa',
        lines: [
            'Somos fuerza joven de un Tabasco ideal',
            'Certificada a nivel internacional',
            'Con tecnología de excelente calidad',
            'Vinculando áreas del sistema empresarial',
            'Con profesionistas de una gran capacidad',
            'Contribuyendo al desarrollo nacional',
            'Universidad Tecnológica del Usumacinta',
            'Mi Universidad'
        ]
    }
];

// ═══════════════════════════════════════════════════════════
//  IMPLEMENTACIÓN
// ═══════════════════════════════════════════════════════════

const SVG_NS = 'http://www.w3.org/2000/svg';

export function init() {
    const root = document.querySelector('[data-himno]');
    if (!root) return;

    initBadge(root);
    renderStaticLyrics(root);
    renderKaraokeLyrics(root);
    initPlayer(root);
    initTabs(root);
}

/* ------------------------------------------------------------
   1. BADGE CIRCULAR (portada tipo vinilo)
   ------------------------------------------------------------ */
function initBadge(root) {
    const wrap = root.querySelector('[data-himno-badge]');
    if (!wrap) return;

    wrap.appendChild(buildBadgeSVG());

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
        wrap.classList.add('is-visible');
        return;
    }
    const obs = new IntersectionObserver((entries, o) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('is-visible');
                o.unobserve(e.target);
            }
        });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    obs.observe(wrap);
}

function buildBadgeSVG() {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 500 500');
    svg.setAttribute('xmlns', SVG_NS);
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.classList.add('himno-badge-svg');

    /* ---------- Defs ---------- */
    const defs = document.createElementNS(SVG_NS, 'defs');

    const discGrad = document.createElementNS(SVG_NS, 'radialGradient');
    discGrad.setAttribute('id', 'hb-disc');
    discGrad.setAttribute('cx', '50%');
    discGrad.setAttribute('cy', '50%');
    discGrad.innerHTML = `
        <stop offset="0%"   stop-color="#232766"/>
        <stop offset="70%"  stop-color="#1a1d3d"/>
        <stop offset="100%" stop-color="#0f1226"/>
    `;
    defs.appendChild(discGrad);

    const centerGrad = document.createElementNS(SVG_NS, 'radialGradient');
    centerGrad.setAttribute('id', 'hb-center');
    centerGrad.setAttribute('cx', '38%');
    centerGrad.setAttribute('cy', '32%');
    centerGrad.innerHTML = `
        <stop offset="0%"   stop-color="#7EE0C2"/>
        <stop offset="55%"  stop-color="#30BF97"/>
        <stop offset="100%" stop-color="#30348C"/>
    `;
    defs.appendChild(centerGrad);

    const barGrad = document.createElementNS(SVG_NS, 'linearGradient');
    barGrad.setAttribute('id', 'hb-bar');
    barGrad.setAttribute('x1', '0%');
    barGrad.setAttribute('y1', '0%');
    barGrad.setAttribute('x2', '0%');
    barGrad.setAttribute('y2', '100%');
    barGrad.innerHTML = `
        <stop offset="0%"   stop-color="#7EE0C2"/>
        <stop offset="100%" stop-color="#30BF97" stop-opacity="0.4"/>
    `;
    defs.appendChild(barGrad);

    const shineGrad = document.createElementNS(SVG_NS, 'linearGradient');
    shineGrad.setAttribute('id', 'hb-shine');
    shineGrad.setAttribute('x1', '0%');
    shineGrad.setAttribute('y1', '0%');
    shineGrad.setAttribute('x2', '100%');
    shineGrad.setAttribute('y2', '100%');
    shineGrad.innerHTML = `
        <stop offset="0%"   stop-color="#FFFFFF" stop-opacity="0.14"/>
        <stop offset="55%"  stop-color="#FFFFFF" stop-opacity="0.02"/>
        <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    `;
    defs.appendChild(shineGrad);

    svg.appendChild(defs);

    /* ---------- Disco base ---------- */
    const disc = document.createElementNS(SVG_NS, 'circle');
    disc.setAttribute('cx', '250');
    disc.setAttribute('cy', '250');
    disc.setAttribute('r', '230');
    disc.setAttribute('fill', 'url(#hb-disc)');
    svg.appendChild(disc);

    /* ---------- Surcos estáticos ---------- */
    [222, 205, 188, 170, 152].forEach(r => {
        const g = document.createElementNS(SVG_NS, 'circle');
        g.setAttribute('cx', '250');
        g.setAttribute('cy', '250');
        g.setAttribute('r', String(r));
        g.setAttribute('fill', 'none');
        g.setAttribute('stroke', 'rgba(255,255,255,0.05)');
        g.setAttribute('stroke-width', '1');
        svg.appendChild(g);
    });

    /* ---------- Grupo rotatorio: aro + ticks + barras ---------- */
    const rotor = document.createElementNS(SVG_NS, 'g');
    rotor.classList.add('himno-badge-rotor');

    // Aro punteado exterior
    const outerRing = document.createElementNS(SVG_NS, 'circle');
    outerRing.setAttribute('cx', '250');
    outerRing.setAttribute('cy', '250');
    outerRing.setAttribute('r', '216');
    outerRing.setAttribute('fill', 'none');
    outerRing.setAttribute('stroke', 'rgba(126,224,194,0.18)');
    outerRing.setAttribute('stroke-width', '1');
    outerRing.setAttribute('stroke-dasharray', '2 8');
    rotor.appendChild(outerRing);

    // Barras radiales tipo ecualizador (72, patrón simétrico)
    const BAR_COUNT      = 72;
    const BAR_INNER_R    = 158;
    const BAR_OUTER_R    = 208;

    for (let i = 0; i < BAR_COUNT; i++) {
        const angle = (i / BAR_COUNT) * Math.PI * 2;
        const t = i / BAR_COUNT;

        const wave1 = Math.sin(t * Math.PI * 6);
        const wave2 = Math.sin(t * Math.PI * 18) * 0.5;
        const wave3 = Math.sin(t * Math.PI * 36) * 0.25;
        const combined = (wave1 + wave2 + wave3) / 1.75;
        const hNorm = 0.25 + 0.75 * Math.abs(combined);

        const endR = BAR_INNER_R + (BAR_OUTER_R - BAR_INNER_R) * hNorm;
        const x1 = 250 + BAR_INNER_R * Math.cos(angle);
        const y1 = 250 + BAR_INNER_R * Math.sin(angle);
        const x2 = 250 + endR * Math.cos(angle);
        const y2 = 250 + endR * Math.sin(angle);

        const line = document.createElementNS(SVG_NS, 'line');
        line.setAttribute('x1', x1.toFixed(2));
        line.setAttribute('y1', y1.toFixed(2));
        line.setAttribute('x2', x2.toFixed(2));
        line.setAttribute('y2', y2.toFixed(2));
        line.setAttribute('stroke', 'url(#hb-bar)');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('stroke-linecap', 'round');
        line.setAttribute('opacity', String(0.35 + 0.65 * hNorm));
        rotor.appendChild(line);
    }

    // Aro interior decorativo
    const innerRing = document.createElementNS(SVG_NS, 'circle');
    innerRing.setAttribute('cx', '250');
    innerRing.setAttribute('cy', '250');
    innerRing.setAttribute('r', String(BAR_INNER_R - 6));
    innerRing.setAttribute('fill', 'none');
    innerRing.setAttribute('stroke', 'rgba(126,224,194,0.22)');
    innerRing.setAttribute('stroke-width', '1');
    rotor.appendChild(innerRing);

    svg.appendChild(rotor);

    /* ---------- Centro estático ---------- */
    const center = document.createElementNS(SVG_NS, 'g');
    center.classList.add('himno-badge-center');

    const centerCircle = document.createElementNS(SVG_NS, 'circle');
    centerCircle.setAttribute('cx', '250');
    centerCircle.setAttribute('cy', '250');
    centerCircle.setAttribute('r', '95');
    centerCircle.setAttribute('fill', 'url(#hb-center)');
    center.appendChild(centerCircle);

    const centerRing = document.createElementNS(SVG_NS, 'circle');
    centerRing.setAttribute('cx', '250');
    centerRing.setAttribute('cy', '250');
    centerRing.setAttribute('r', '82');
    centerRing.setAttribute('fill', 'none');
    centerRing.setAttribute('stroke', 'rgba(255,255,255,0.3)');
    centerRing.setAttribute('stroke-width', '1');
    center.appendChild(centerRing);

    const utuText = document.createElementNS(SVG_NS, 'text');
    utuText.setAttribute('x', '250');
    utuText.setAttribute('y', '247');
    utuText.setAttribute('text-anchor', 'middle');
    utuText.setAttribute('font-size', '44');
    utuText.setAttribute('font-weight', '800');
    utuText.setAttribute('letter-spacing', '4');
    utuText.setAttribute('fill', '#FFFFFF');
    utuText.textContent = 'UTU';
    center.appendChild(utuText);

    const subText = document.createElementNS(SVG_NS, 'text');
    subText.setAttribute('x', '250');
    subText.setAttribute('y', '280');
    subText.setAttribute('text-anchor', 'middle');
    subText.setAttribute('font-family', 'Inter, sans-serif');
    subText.setAttribute('font-size', '13');
    subText.setAttribute('font-weight', '700');
    subText.setAttribute('letter-spacing', '6');
    subText.setAttribute('fill', 'rgba(255,255,255,0.9)');
    subText.textContent = 'HIMNO';
    center.appendChild(subText);

    svg.appendChild(center);

    /* ---------- Brillo estático ---------- */
    const shine = document.createElementNS(SVG_NS, 'circle');
    shine.setAttribute('cx', '250');
    shine.setAttribute('cy', '250');
    shine.setAttribute('r', '230');
    shine.setAttribute('fill', 'url(#hb-shine)');
    shine.setAttribute('pointer-events', 'none');
    svg.appendChild(shine);

    return svg;
}

/* ------------------------------------------------------------
   2. LETRA ESTÁTICA
   ------------------------------------------------------------ */
function renderStaticLyrics(root) {
    const el = root.querySelector('[data-himno-lyrics="static"]');
    if (!el) return;
    el.innerHTML = STANZAS.map(st => `
        <article class="himno-stanza">
            <h3 class="himno-stanza__title">${escapeHTML(st.title)}</h3>
            <div class="himno-stanza__lines">
                ${st.lines.map(l => `<p class="himno-stanza__line">${escapeHTML(l)}</p>`).join('')}
            </div>
        </article>
    `).join('');
}

/* ------------------------------------------------------------
   3. LETRA KARAOKE
   ------------------------------------------------------------ */
function renderKaraokeLyrics(root) {
    const el = root.querySelector('[data-himno-lyrics="karaoke"]');
    if (!el) return;
    el.innerHTML = LYRICS_DATA.map((line, i) => `
        <p class="himno-karaoke__line" data-line-index="${i}">
            ${escapeHTML(line.text)}
        </p>
    `).join('');
}

/* ------------------------------------------------------------
   4. REPRODUCTOR
   ------------------------------------------------------------ */
function initPlayer(root) {
    const audio         = root.querySelector('[data-himno-audio]');
    const playerSection = root.querySelector('.himno-player');
    const playBtn       = root.querySelector('[data-himno-play]');
    const waveEl        = root.querySelector('[data-himno-wave]');
    const waveBars      = root.querySelector('[data-himno-wave-bars]');
    const curEl         = root.querySelector('[data-himno-current]');
    const durEl         = root.querySelector('[data-himno-duration]');
    const factDurEl     = root.querySelector('[data-himno-fact-duration]');
    const nowLine       = root.querySelector('[data-himno-now-line]');
    const nowLabel      = root.querySelector('[data-himno-now-label]');
    const noticeEl      = root.querySelector('[data-himno-notice]');
    const downloadEl    = root.querySelector('[data-himno-download]');
    const speedBtn      = root.querySelector('[data-himno-speed]');
    const speedLabel    = root.querySelector('[data-himno-speed-label]');
    const skipBtns      = root.querySelectorAll('[data-himno-skip]');

    if (!audio || !playBtn || !waveBars || !playerSection) return;

    audio.src = AUDIO_URL;
    if (downloadEl) {
        downloadEl.setAttribute('href', AUDIO_URL);
        downloadEl.setAttribute('download', AUDIO_FILENAME);
    }

    let available   = false;
    let seeking     = false;
    let speedIdx    = 0;
    let lastActiveN = -1;
    let lastKIdx    = -1;

    /* ---------- Waveform ---------- */
    const bars = [];
    for (let i = 0; i < WAVE_BARS; i++) {
        const b = document.createElement('span');
        b.className = 'himno-player__bar';
        waveBars.appendChild(b);
        bars.push(b);
    }

    function setPeaks(peaks) {
        peaks.forEach((p, i) => {
            const bar = bars[i];
            if (!bar) return;
            bar.style.height = Math.max(4, p * 100) + '%';
        });
        lastActiveN = -1;
        if (available) paintProgress(getPercent());
    }

    function paintProgress(percent) {
        const active = Math.floor(percent * bars.length);
        if (active === lastActiveN) return;
        lastActiveN = active;
        bars.forEach((b, i) => b.classList.toggle('is-active', i < active));
    }

    function getPercent() {
        const d = audio.duration || 0;
        return d > 0 ? Math.min(1, (audio.currentTime || 0) / d) : 0;
    }

    function fallbackPeaks(count) {
        let seed = 12345;
        const rand = () => {
            seed = (seed * 1103515245 + 12345) & 0x7fffffff;
            return seed / 0x7fffffff;
        };
        const out = [];
        for (let i = 0; i < count; i++) {
            const t = i / count;
            const env = 0.35 + 0.65 * Math.sin(Math.PI * t);
            out.push(Math.max(0.12, env * (0.45 + rand() * 0.55)));
        }
        return out;
    }

    setPeaks(fallbackPeaks(WAVE_BARS));

    analyzeAudio().then(peaks => {
        if (peaks && peaks.length) setPeaks(peaks);
    }).catch(() => {});

    /* ---------- Disponibilidad ---------- */
    function markAvailable() {
        if (available) return;
        available = true;
        root.classList.add('is-available');
        root.classList.remove('is-unavailable');
        if (noticeEl) noticeEl.hidden = true;
        if (downloadEl) downloadEl.removeAttribute('aria-disabled');
        if (durEl) durEl.textContent = fmtTime(audio.duration);
        if (factDurEl) factDurEl.textContent = fmtTime(audio.duration);
        if (waveEl) waveEl.setAttribute('aria-valuetext',
            `0:00 de ${fmtTime(audio.duration)}`);
    }

    function markUnavailable() {
        if (available) return;
        root.classList.add('is-unavailable');
        root.classList.remove('is-available');
        if (noticeEl) noticeEl.hidden = false;
        if (downloadEl) {
            downloadEl.setAttribute('aria-disabled', 'true');
            downloadEl.removeAttribute('href');
            downloadEl.title = 'El audio del himno aún no está disponible';
        }
    }

    audio.addEventListener('loadedmetadata', markAvailable);
    audio.addEventListener('canplay', markAvailable);
    audio.addEventListener('error', markUnavailable);
    setTimeout(() => {
        if (!available && (!audio.duration || Number.isNaN(audio.duration))) {
            markUnavailable();
        }
    }, 4000);

    /* ---------- Play / Pause ---------- */
    function togglePlay() {
        if (!available) return;
        if (audio.paused) audio.play().catch(markUnavailable);
        else audio.pause();
    }

    playBtn.addEventListener('click', togglePlay);

    audio.addEventListener('play', () => {
        playerSection.classList.add('is-playing');
        root.classList.add('is-playing');
        playBtn.setAttribute('aria-label', 'Pausar himno');
        nowLine?.classList.remove('is-idle');
        if (nowLabel) nowLabel.textContent = 'Ahora suena';
    });

    audio.addEventListener('pause', () => {
        playerSection.classList.remove('is-playing');
        root.classList.remove('is-playing');
        playBtn.setAttribute('aria-label', 'Reproducir himno');
    });

    audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        updateAll();
        updateKaraokeLine(0);
        if (nowLabel) nowLabel.textContent = 'Escucha y sigue la letra';
        nowLine?.classList.add('is-idle');
    });

    /* ---------- Skip ±10 s ---------- */
    skipBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!available || !audio.duration) return;
            const delta = parseInt(btn.dataset.himnoSkip, 10) || 0;
            audio.currentTime = Math.max(0, Math.min(audio.duration,
                audio.currentTime + delta));
            updateAll();
            updateKaraokeLine(audio.currentTime);
        });
    });

    /* ---------- Velocidad ---------- */
    if (speedBtn && speedLabel) {
        speedBtn.addEventListener('click', () => {
            speedIdx = (speedIdx + 1) % SPEEDS.length;
            const rate = SPEEDS[speedIdx];
            audio.playbackRate = rate;
            speedLabel.textContent = `${rate}×`;
            speedBtn.setAttribute('aria-label',
                `Velocidad de reproducción ${rate}×`);
        });
    }

    /* ---------- Progreso / seek ---------- */
    function updateAll() {
        const pct = getPercent();
        paintProgress(pct);
        if (curEl) curEl.textContent = fmtTime(audio.currentTime || 0);
        if (durEl) durEl.textContent = fmtTime(audio.duration || 0);
        if (waveEl) {
            const v = Math.round(pct * 100);
            waveEl.setAttribute('aria-valuenow', String(v));
            waveEl.setAttribute('aria-valuetext',
                `${fmtTime(audio.currentTime || 0)} de ${fmtTime(audio.duration || 0)}`);
        }
    }

    audio.addEventListener('timeupdate', () => {
        updateAll();
        updateKaraokeLine(audio.currentTime);
    });

    function seekFromX(clientX) {
        if (!available || !audio.duration) return;
        const rect = waveEl.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1,
            (clientX - rect.left) / rect.width));
        audio.currentTime = ratio * audio.duration;
        updateAll();
        updateKaraokeLine(audio.currentTime);
    }

    if (waveEl) {
        waveEl.addEventListener('pointerdown', e => {
            if (!available) return;
            e.preventDefault();
            seeking = true;
            waveEl.setPointerCapture?.(e.pointerId);
            seekFromX(e.clientX);
        });
        waveEl.addEventListener('pointermove', e => {
            if (!seeking) return;
            seekFromX(e.clientX);
        });
        const endSeek = e => {
            seeking = false;
            waveEl.releasePointerCapture?.(e.pointerId);
        };
        waveEl.addEventListener('pointerup', endSeek);
        waveEl.addEventListener('pointercancel', endSeek);

        waveEl.addEventListener('keydown', e => {
            if (!available || !audio.duration) return;
            const step = e.shiftKey ? 15 : 5;
            let handled = true;
            switch (e.key) {
                case 'ArrowRight': audio.currentTime = Math.min(audio.duration, audio.currentTime + step); break;
                case 'ArrowLeft':  audio.currentTime = Math.max(0, audio.currentTime - step); break;
                case 'Home':       audio.currentTime = 0; break;
                case 'End':        audio.currentTime = audio.duration; break;
                default: handled = false;
            }
            if (handled) {
                e.preventDefault();
                updateAll();
                updateKaraokeLine(audio.currentTime);
            }
        });
    }

    /* ---------- Karaoke en vivo ---------- */
    function updateKaraokeLine(currentTime) {
        if (!nowLine) return;
        let idx = 0;
        for (let i = 0; i < LYRICS_DATA.length; i++) {
            if (currentTime + 0.05 >= LYRICS_DATA[i].time) idx = i;
            else break;
        }
        if (idx === lastKIdx) return;
        lastKIdx = idx;

        nowLine.textContent = LYRICS_DATA[idx].text;
        nowLine.classList.remove('is-idle');

        const kLines = root.querySelectorAll('[data-himno-lyrics="karaoke"] .himno-karaoke__line');
        if (kLines.length) {
            kLines.forEach((line, i) => {
                line.classList.toggle('is-active', i === idx);
                line.classList.toggle('is-past', i < idx);
            });
            const target = kLines[idx];
            const container = target?.parentElement;
            if (container) {
                const cRect = container.getBoundingClientRect();
                const tRect = target.getBoundingClientRect();
                const offset = tRect.top - cRect.top - (cRect.height / 2) + (tRect.height / 2);
                container.scrollTo({
                    top: container.scrollTop + offset,
                    behavior: prefersReducedMotion() ? 'auto' : 'smooth'
                });
            }
        }

        const liveEl = root.querySelector('[data-himno-karaoke-live]');
        if (liveEl) liveEl.textContent = LYRICS_DATA[idx].text;
    }

    /* ---------- Atajos de teclado (solo PC) ---------- */
    initKeyboard({
        playerSection,
        audio,
        togglePlay,
        updateAll,
        updateKaraokeLine,
        isAvailable: () => available
    });

    updateAll();
}

/* ------------------------------------------------------------
   5. ATAJOS DE TECLADO (solo equipos con mouse)
   ------------------------------------------------------------
   · Espacio → play / pausa
   · ← / →    → retroceder / avanzar 5 s
   Solo actúa cuando el player está visible en pantalla
   y no se está escribiendo en un campo.
   ------------------------------------------------------------ */
function initKeyboard({ playerSection, audio, togglePlay, updateAll, updateKaraokeLine, isAvailable }) {
    // Equipos con mouse y hover (excluye móviles / tablets táctiles)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let inView = false;
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(entries => {
            inView = entries[0].isIntersecting;
        }, { threshold: 0.25 });
        io.observe(playerSection);
    } else {
        inView = true;
    }

    function seek(delta) {
        if (!audio.duration) return;
        audio.currentTime = Math.max(0, Math.min(audio.duration,
            audio.currentTime + delta));
        updateAll();
        updateKaraokeLine(audio.currentTime);
    }

    document.addEventListener('keydown', (e) => {
        if (!inView || !isAvailable()) return;
        if (e.altKey || e.ctrlKey || e.metaKey) return;

        const t = e.target;
        if (t instanceof HTMLElement) {
            if (t.matches('input, textarea, select, [contenteditable="true"]')) return;
            // Si el foco está en un botón/enlace ajeno al player,
            // no secuestramos la tecla (dejamos que su acción natural ocurra)
            if (!playerSection.contains(t) && t.matches('button, a[href]')) return;
        }

        if (e.code === 'Space' && !e.repeat) {
            e.preventDefault();
            togglePlay();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            seek(-KEYBOARD_SEEK_STEP);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            seek(KEYBOARD_SEEK_STEP);
        }
    });
}

/* ------------------------------------------------------------
   6. ANÁLISIS DE AUDIO
   ------------------------------------------------------------ */
async function analyzeAudio() {
    try {
        const res = await fetch(AUDIO_URL, { mode: 'cors' });
        if (!res.ok) throw new Error('audio unavailable');
        const buf = await res.arrayBuffer();
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return null;
        const ctx = new Ctx();
        const audioBuffer = await ctx.decodeAudioData(buf.slice(0));
        const channel = audioBuffer.getChannelData(0);
        const peaks = [];
        const step = Math.max(1, Math.floor(channel.length / WAVE_BARS));
        for (let i = 0; i < WAVE_BARS; i++) {
            let max = 0;
            const start = i * step;
            const end = Math.min(channel.length, start + step);
            for (let j = start; j < end; j += 64) {
                const v = Math.abs(channel[j] || 0);
                if (v > max) max = v;
            }
            peaks.push(max);
        }
        ctx.close();
        const top = Math.max(...peaks, 0.0001);
        return peaks.map(p => Math.max(0.08, p / top));
    } catch (_) {
        return null;
    }
}

/* ------------------------------------------------------------
   7. TABS
   ------------------------------------------------------------ */
function initTabs(root) {
    const tablist = root.querySelector('.himno-tabs');
    const tabs    = Array.from(root.querySelectorAll('[data-himno-tab]'));
    const panels  = Array.from(root.querySelectorAll('[data-himno-panel]'));
    if (!tabs.length || !panels.length) return;

    const activate = (target) => {
        tabs.forEach(t => {
            const on = t.dataset.himnoTab === target;
            t.setAttribute('aria-selected', String(on));
            t.tabIndex = on ? 0 : -1;
        });
        panels.forEach(p => {
            p.hidden = p.dataset.himnoPanel !== target;
        });
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => activate(tab.dataset.himnoTab));
    });

    if (tablist) {
        tablist.addEventListener('keydown', (e) => {
            if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
            e.preventDefault();
            const idx = tabs.indexOf(document.activeElement);
            if (idx < 0) return;
            const nextIdx = e.key === 'ArrowRight'
                ? (idx + 1) % tabs.length
                : (idx - 1 + tabs.length) % tabs.length;
            tabs[nextIdx].click();
            tabs[nextIdx].focus();
        });
    }
}

/* ------------------------------------------------------------
   Utilidades
   ------------------------------------------------------------ */
function fmtTime(s) {
    if (!isFinite(s) || s < 0) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${String(sec).padStart(2, '0')}`;
}

function escapeHTML(str) {
    return String(str ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}