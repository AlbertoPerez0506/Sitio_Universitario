# Sistema de imágenes y arquitectura del portal UTU

**Última actualización:** Octubre 2026  
**Mantenedor:** Equipo web UTU  
**Estado:** Activo

---

## 📋 Índice

1. [Visión general](#1-visión-general)
2. [Arquitectura del sitio](#2-arquitectura-del-sitio)
3. [Sistema de imágenes](#3-sistema-de-imágenes)
4. [Estructura de carpetas](#4-estructura-de-carpetas)
5. [Cómo cambiar una imagen](#5-cómo-cambiar-una-imagen)
6. [Tipos de imágenes y sus especificaciones](#6-tipos-de-imágenes-y-sus-especificaciones)
7. [Cómo se renderizan las imágenes](#7-cómo-se-renderizan-las-imágenes)
8. [Optimización y buenas prácticas](#8-optimización-y-buenas-prácticas)
9. [Migración a imágenes locales](#9-migración-a-imágenes-locales)
10. [Troubleshooting](#10-troubleshooting)
11. [Elementos fuera de esta centralización](#11-elementos-fuera-de-esta-centralización)

---

## 1. Visión general

El portal de la **Universidad Tecnológica del Usumacinta** es un sitio estático
construido con:

- **HTML5 semántico** como esqueleto
- **CSS3** con design tokens (variables CSS)
- **JavaScript ES Modules** (vanilla, sin frameworks)
- **Centralización de contenido** en `/site-content.js`

### Principio fundamental

> **Todo el contenido editable vive en un solo lugar: `/site-content.js`.**
> El HTML y CSS son solo estructura y presentación. Las imágenes, textos,
> carreras, noticias y eventos se administran desde un único archivo.

---

## 2. Arquitectura del sitio

### Flujo de arranque

### Archivos clave

| Archivo | Rol |
|---|---|
| `/site-content.js` | 🎯 **Fuente única de contenido** (textos + imágenes) |
| `/index.html` | Esqueleto semántico con `data-content` y contenedores |
| `/js/app.js` | Bootstrap: inicializa todo en orden correcto |
| `/js/pages/home.js` | Renderiza todo el contenido del home |
| `/js/components/header.js` | Header (logo protegido) |
| `/js/components/footer.js` | Footer (protegido) |
| `/js/components/sprite.js` | Iconos SVG inline |
| `/js/components/carousel.js` | Carrusel del hero |
| `/js/components/gallery.js` | Galería vintage |
| `/js/components/lightbox.js` | Visor de imágenes del collage |
| `/js/services/api.js` | Capa de datos (lee de `SITE_CONTENT`) |
| `/js/core/config.js` | Constantes globales |
| `/js/core/utils.js` | Utilidades (`escapeHTML`, `formatDateParts`) |

---

## 3. Sistema de imágenes

### Regla de oro

> **Las URLs de imágenes se editan SOLO en `/site-content.js`.**
> Nunca se editan en HTML, nunca se editan en JS de componentes.

### Objetos de imagen

Cada imagen vive dentro de un objeto en `SITE_CONTENT`, con esta estructura:

```javascript
{
    // La URL (puede ser externa o ruta local)
    image: '/assets/images/hero/campus1.jpg',   // o 'imagen:' o 'src:'
    
    // Texto alternativo (obligatorio para accesibilidad)
    alt: 'Campus de la UTU',
    
    // Texto de respaldo si la imagen falla
    fallback: 'Campus UTU'
}

/
├── site-content.js              ← 🎯 TODO el contenido editable
├── index.html
│
├── assets/
│   └── images/
│       ├── branding/
│       │   └── logo-utu.png     ← 🔒 NO TOCAR (header/footer)
│       ├── icons/
│       │   └── icon.png         ← 🔒 NO TOCAR (favicon)
│       │
│       ├── hero/                ← 🖼️ Imágenes del carrusel principal
│       │   ├── campus1.jpg
│       │   ├── campus2.jpg
│       │   └── campus3.jpg
│       │
│       ├── carreras/            ← 🖼️ Imágenes de la oferta educativa
│       │   ├── carrera-01.jpg
│       │   ├── carrera-02.jpg
│       │   └── ...
│       │
│       ├── galeria/             ← 🖼️ Fotos de paraescolares
│       │   ├── tamborileros.jpg
│       │   ├── banda-guerra.jpg
│       │   └── ...
│       │
│       └── collage/             ← 🖼️ Fotos de comunidad
│           ├── comunidad-01.jpg
│           ├── comunidad-02.jpg
│           └── ...
│
├── css/
│   ├── reset.css
│   ├── variables.css
│   ├── main.css
│   ├── components/
│   │   ├── buttons.css
│   │   ├── cards.css
│   │   ├── header.css
│   │   ├── footer.css
│   │   └── lightbox.css
│   └── pages/
│       ├── home.css
│       └── bienvenida.css
│
├── js/
│   ├── app.js
│   ├── core/
│   │   ├── config.js
│   │   ├── utils.js
│   │   └── paths.js
│   ├── components/
│   │   ├── header.js            ← 🔒 LOGO PROTEGIDO
│   │   ├── footer.js            ← 🔒 PROTEGIDO
│   │   ├── sprite.js
│   │   ├── carousel.js
│   │   ├── gallery.js
│   │   ├── lightbox.js
│   │   ├── counters.js
│   │   └── reveal.js
│   ├── pages/
│   │   └── home.js
│   └── services/
│       └── api.js
│
└── docs/
    ├── administracion-contenido.md
    └── imagenes-y-arquitectura.md   ← 📄 este archivo

    Cómo cambiar una imagen
Paso a paso (para el hero)
1. Prepara tu imagen

Tamaño: 1920 × 1080 px

Peso: < 300 KB (ideal < 200 KB)

Formato: .webp o .jpg

2. Colócala en la carpeta

text
/assets/images/hero/campus1.jpg
3. Abre /site-content.js y busca hero.slides

4. Localiza el slide que quieres cambiar (por id o orden)

5. Reemplaza la propiedad image:

javascript
// ANTES
{
    id: 'hero-campus',
    orden: 1,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=1080',
    alt: 'Campus de la UTU',
    // ...
}

// DESPUÉS
{
    id: 'hero-campus',
    orden: 1,
    image: '/assets/images/hero/campus1.jpg',
    alt: 'Campus de la UTU — foto oficial',
    // ...
}
6. Actualiza el alt para describir la nueva imagen
(importante para accesibilidad y SEO)

7. Guarda el archivo

8. Recarga el navegador con Ctrl+Shift+R (hard reload)

9. Verifica en DevTools → Network:

La imagen debe aparecer con status 200

Si aparece 404 → la ruta está mal

Ejemplo: cambiar imagen de una carrera
javascript
// En site-content.js → oferta.carreras
{
    id: 'carrera-01',
    nombre: 'Entornos Virtuales y Negocios Digitales',
    // ...
    imagen: '/assets/images/carreras/ti-entornos.jpg',  // ← CAMBIO
    alt: 'Laboratorio de cómputo de la carrera de TI',   // ← ACTUALIZA
    // ...
}
Ejemplo: cambiar imagen de la galería
javascript
// En site-content.js → vidaUniversitaria.galeria
{
    src: '/assets/images/galeria/tamborileros-oficial.jpg',  // ← CAMBIO
    alt: 'Grupo de Tamborileros de la UTU en el Día del Estudiante',
    categoria: 'Cultura',
    catSlug: 'culture',
    caption: 'Tamborileros',
    orden: 1
}
6. Tipos de imágenes y sus especificaciones
🎠 Hero (carrusel principal)
Especificación	Valor
Dimensiones	1920 × 1080 px (16:9)
Peso	< 300 KB (idealmente < 200 KB)
Formato	.webp preferido, .jpg aceptado
Cantidad	4 slides actualmente
Carpeta	/assets/images/hero/
Propiedad	hero.slides[N].image
Composición	Sujeto en tercio inferior (overlay oscuro tapa el top)
Texto	❌ NO incluir — el título se superpone
Carga	Primera slide: fetchpriority="high" (LCP); resto: lazy
🎓 Carreras (oferta educativa)
Especificación	Valor
Dimensiones	900 × 600 px (16:10)
Peso	< 150 KB
Formato	.webp o .jpg
Cantidad	8 tarjetas
Carpeta	/assets/images/carreras/
Propiedad	oferta.carreras[N].imagen
Composición	Foto horizontal, sujeto centrado
Carga	loading="lazy" (no bloquea render inicial)
📷 Galería vintage (vida universitaria)
Especificación	Valor
Dimensiones	900 × 700 px (aprox 9:7)
Peso	< 150 KB
Formato	.webp o .jpg
Cantidad	6 fotos
Carpeta	/assets/images/galeria/
Propiedad	vidaUniversitaria.galeria[N].src
Composición	Formato polaroid, la foto se recorta a 4:3 dentro
Detalle	Overlay sepia al 8-12% (se quita al hover)
Carga	loading="lazy"
🖼️ Collage (comunidad)
Especificación	Valor
Dimensiones variables	Según posición en el grid
Celda A	1200 × 1000 px
Celda B, C	800 × 800 px
Celda D	1200 × 800 px
Celda E	800 × 1000 px
Celda F	1000 × 800 px
Peso	< 200 KB cada una
Carpeta	/assets/images/collage/
Propiedad	collage.imagenes[N].src
Interacción	Click abre lightbox con todas las imágenes
📰 Noticias (miniaturas)
Especificación	Valor
Dimensiones	900 × 700 px (destacada: 1600 × 900)
Peso	< 150 KB
Propiedad	noticias.items[N].image
Carpeta	/assets/images/noticias/
7. Cómo se renderizan las imágenes
Flujo técnico paso a paso
1. site-content.js define la data:

javascript
export const SITE_CONTENT = {
    hero: {
        slides: [
            { id: 'hero-campus', image: '/assets/images/hero/campus1.jpg', alt: 'Campus' }
        ]
    }
};

// Se expone también en window para el futuro panel:
window.UTU_SITE_CONTENT = SITE_CONTENT;
2. home.js lee SITE_CONTENT y genera el HTML:

javascript
function renderHero() {
    const track = document.querySelector('[data-carousel-track]');
    const slides = sortVisible(SITE_CONTENT.hero?.slides);
    
    track.innerHTML = slides.map((s, i) => `
        <article class="hero__slide">
            <img src="${escapeHTML(s.image)}" 
                 alt="${escapeHTML(s.alt)}"
                 width="1920" height="1080"
                 ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}
                 decoding="async">
        </article>
    `).join('');
}
3. app.js ejecuta initPageModule() ANTES de los componentes globales:

javascript
onReady(async () => {
    injectSprite();
    mount('header', header);
    mount('footer', footer);
    
    await initPageModule();   // ← primero el DOM está poblado
    
    initReveal();             // ← observa lo que ya existe
    initCounters();
    initCarousels();
    initVintageGalleries();
    initLightbox();
});
4. Los componentes globales encuentran el DOM listo:

initCarousels() encuentra las slides del hero

initCounters() encuentra los [data-count]

initVintageGalleries() encuentra las [data-vintage-slide]

initLightbox() encuentra los .collage__cell

Función escapeHTML()
Todas las URLs y textos se escapan con escapeHTML() para prevenir XSS:

javascript
export function escapeHTML(str) {
    return String(str ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
Esto significa: si por error pones una URL con " o <, no rompe el HTML.