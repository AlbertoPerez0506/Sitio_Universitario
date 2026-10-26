/* ============================================================
   data/images.js — Catálogo central de imágenes provisionales
   ------------------------------------------------------------
   Todas las imágenes son de Unsplash como referencias visuales
   temporales. Sustituir por fotos oficiales de la UTU cuando
   estén disponibles.
   Cada URL incluye parámetros de optimización:
     ?w=...&q=80&auto=format&fit=crop
   ============================================================ */

const U = (id, w = 1200, h = 800) =>
    `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&q=80&auto=format&fit=crop`;

export const IMAGES = {
    /* Hero del home (4 slides) */
    hero: [
        { src: U('1523050854058-8df90110c9f1', 1920, 1080), alt: 'Campus universitario UTU' },
        { src: U('1532094349884-543bc11b234d', 1920, 1080), alt: 'Estudiantes en laboratorio de la UTU' },
        { src: U('1523240795612-9a054b0db644', 1920, 1080), alt: 'Vida universitaria en la UTU' },
        { src: U('1523580494863-6f3031224c94', 1920, 1080), alt: 'Egresados de la UTU' }
    ],

    /* Presentación institucional */
    intro: U('1523240795612-9a054b0db644', 1000, 800),

    /* Programas académicos (7) */
    programs: {
        ti:  U('1518770660439-4636190af475', 900, 600),
        bio: U('1532187863486-abf9dbad1b69', 900, 600),
        mer: U('1454165804606-c3d57bc86b40', 900, 600),
        gas: U('1556910103-1c02745aae4d',    900, 600),
        tur: U('1488646953014-85cb44e25828', 900, 600),
        par: U('1538108149393-fbbd81895907', 900, 600),
        con: U('1554224155-6726b3ff858f',    900, 600)
    },

    /* Campus e instalaciones */
    campus: {
        alberca:    U('1530549387789-4c1017266635', 1200, 700),
        labBio:     U('1532187863486-abf9dbad1b69',  900, 700),
        labComputo: U('1518770660439-4636190af475',  900, 700),
        aulas:      U('1523050854058-8df90110c9f1',  900, 700),
        auditorio:  U('1540575467063-178a50c2df87',  900, 700),
        deportes:   U('1571019613454-1cb2f99b2d8b', 1200, 700),
        biblioteca: U('1521587760476-6c12a4b040da', 1200, 700)
    },

    /* Vida universitaria (galería vintage) */
    life: [
        { src: U('1533174072545-7a4b6ad7a6c3', 900, 700), alt: 'Banda de Guerra' },
        { src: U('1516450360452-9312f5e86fc7', 900, 700), alt: 'Tamborileros' },
        { src: U('1555595764-6d6a3e5b8d8f',    900, 700), alt: 'Taekwondo' },
        { src: U('1546519638-68e109498ffc',    900, 700), alt: 'Fútbol' },
        { src: U('1513364776144-60967b0f800f', 900, 700), alt: 'Pintura' },
        { src: U('1513364776144-60967b0f800f', 900, 700), alt: 'Serigrafía' }
    ],

    /* Collage "Somos UTU" (6) */
    collage: [
        U('1523240795612-9a054b0db644', 1200, 1000),
        U('1523050854058-8df90110c9f1',  800,  800),
        U('1532094349884-543bc11b234d',  800,  800),
        U('1546519638-68e109498ffc',    1200,  800),
        U('1513364776144-60967b0f800f',  800, 1000),
        U('1518770660439-4636190af475', 1000,  800)
    ]
};