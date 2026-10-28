Contexto del proyecto: Portal web de la Universidad Tecnológica del Usumacinta (UTU),
construido con HTML + CSS + JavaScript vanilla (ESM). No usa frameworks.

ARQUITECTURA DE IMÁGENES:

1. TODA la data editable (incluidas las URLs de imágenes) vive en un solo archivo:
   /site-content.js (raíz del proyecto). Este archivo exporta SITE_CONTENT y
   también lo expone en window.UTU_SITE_CONTENT.

2. Las imágenes del sitio son de 4 tipos:
   a) Imágenes de HERO (carrusel principal): 4 slides, 1920×1080 px, formato horizontal.
   b) Imágenes de CARRERAS (oferta educativa): 8 tarjetas, 900×600 px (16:10).
   c) Imágenes de GALERÍA VINTAGE (vida universitaria): 6 fotos, 900×700 px tipo polaroid.
   d) Imágenes de COLLAGE (comunidad): 6 fotos con diferentes aspect ratios.

3. Los componentes que RENDERIZAN imágenes leen de SITE_CONTENT:
   - /js/pages/home.js → renderHero(), renderPrograms(), renderVintageGallery(), renderCollage()
   - Cada imagen se inyecta con escapeHTML() por seguridad.
   - Se respeta el atributo `alt` para accesibilidad.

4. Se pueden usar URLs EXTERNAS (Unsplash) o RUTAS LOCALES:
   - Externas: 'https://images.unsplash.com/photo-XXXXX?w=1920&h=1080&q=80'
   - Locales: '/assets/images/hero/campus1.jpg'

5. Estructura de carpetas para imágenes locales:
   /assets/images/
   ├── branding/    (logo — NO TOCAR, vive en header.js/footer.js)
   ├── icons/       (favicon — NO TOCAR)
   ├── hero/        (imágenes del carrusel: campus1.jpg, campus2.jpg...)
   ├── carreras/    (imágenes de las carreras: carrera-01.jpg, carrera-02.jpg...)
   ├── galeria/     (fotos de paraescolares: tamborileros.jpg...)
   └── collage/     (fotos de comunidad: comunidad-01.jpg...)

6. ATRIBUTOS CLAVE en cada objeto de imagen:
   - image o imagen o src: la URL/ruta de la imagen
   - alt: descripción textual (obligatorio para accesibilidad)
   - fallback: texto que aparece si la imagen falla al cargar

7. ELEMENTOS EXCLUIDOS (no centralizados en site-content.js):
   - Logo del header → /js/components/header.js
   - Favicon → <link rel="icon"> en cada HTML
   - Imágenes del footer → /js/components/footer.js

8. Para cambiar una imagen: edita SITE_CONTENT en /site-content.js,
   guarda, recarga el navegador. No se toca HTML ni CSS.

9. Optimización recomendada:
   - Hero: 1920×1080 px, <300 KB
   - Carreras: 900×600 px, <150 KB
   - Galería: 900×700 px, <150 KB
   - Formato WebP preferido, JPG/PNG como fallback
   - Comprimir con squoosh.app o tinypng.com

10. Flujo de renderizado:
    onReady → injectSprite → mount(header/footer) → initPageModule (home.js)
    → renderHero/renderPrograms/etc. leen SITE_CONTENT
    → insertan HTML con las URLs → initCarousels/Gallery observa el DOM listo.

Documenta cualquier cambio a este flujo en /docs/administracion-contenido.md.