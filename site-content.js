/* ============================================================
   site-content.js — Fuente única de contenido editable
   ============================================================ */

export const SITE_CONTENT = {

    /* ============================================================
       1. CARRUSEL PRINCIPAL
       ============================================================ */
    hero: {
        autoplayMs: 6500,
        slides: [
            {
                id: 'hero-campus',
                orden: 1,
                visible: true,
                image: '/assets/images/hero/campus1.webp',
                alt: 'Campus de la UTU',
                fallback: 'Campus UTU',
                eyebrow: 'Universidad Tecnológica del Usumacinta',
                titulo: 'Formación que se vive.',
                tituloAccent: 'Conocimiento que se aplica.',
                lead: 'En la UTU la formación profesional combina el conocimiento académico con la práctica, los proyectos y las experiencias que te preparan para tu futuro profesional.'
            },
            {
                id: 'hero-modelo',
                orden: 2,
                visible: true,
                image: '/assets/images/carreras/BIO/BIO2.webp',
                alt: 'Estudiantes en laboratorio',
                fallback: 'Laboratorio UTU',
                eyebrow: 'Modelo académico 60 / 40',
                titulo: '60% práctica.',
                tituloAccent: '40% teoría.',
                lead: 'Un esquema que favorece que los conocimientos se utilicen y comprueben mediante ejercicios, prácticas, proyectos y actividades del área profesional.'
            },
            {
                id: 'hero-vida',
                orden: 3,
                visible: true,
                image: '/assets/images/carreras/TI/ti22.webp',
                alt: 'Vida universitaria UTU',
                fallback: 'Vida universitaria',
                eyebrow: 'Vida universitaria',
                titulo: 'La experiencia',
                tituloAccent: 'también se vive fuera del aula.',
                lead: 'Actividades culturales, deportivas y paraescolares que complementan tu formación profesional.'
            },
            {
                id: 'hero-ruta',
                orden: 4,
                visible: true,
                image: '/assets/images/carreras/NEGOCIOS/negocios9.webp',
                alt: 'Egresados UTU',
                fallback: 'Egresados UTU',
                eyebrow: 'Ruta académica',
                titulo: 'De TSU a',
                tituloAccent: 'Ingeniería o Licenciatura.',
                lead: 'Dos estadías profesionales y la posibilidad de obtener 2 títulos y 2 cédulas profesionales.'
            }
        ]
    },

    /* ============================================================
       2. HERO FACTS
       ============================================================ */
    heroFacts: [
        { count: 60, suffix: '%', label: 'Práctica', orden: 1, visible: true },
        { count: 40, suffix: '%', label: 'Teoría', orden: 2, visible: true },
        { count: 2, suffix: '', label: 'Estadías profesionales', orden: 3, visible: true },
        { count: null, display: '2 + 2', label: 'Títulos y cédulas', orden: 4, visible: true }
    ],

    /* ============================================================
       3. PRESENTACIÓN INSTITUCIONAL
       ============================================================ */
    institucional: {
        intro: {
            eyebrow: 'La universidad',
            title: 'Una universidad donde el conocimiento',
            titleAccent: 'se convierte en experiencia',
            lead: 'La Universidad Tecnológica del Usumacinta es una institución pública de educación superior ubicada en Emiliano Zapata, Tabasco. Su propuesta educativa se distingue por una formación orientada a la práctica profesional.',
            texto: 'El modelo articula teoría y experiencia mediante prácticas, proyectos, laboratorios y dos estadías profesionales, complementados con la vida universitaria.',
            linkCta: { label: 'Conoce más sobre la UTU', href: '/pages/universidad/bienvenida.html' },
            imagen: {
                src: '/assets/images/carreras/CONTADURIA/CONTA4.webp',
                alt: 'Estudiantes de la UTU durante una actividad práctica',
                fallback: 'Actividad práctica'
            },
            facts: [
                { value: '2003',            label: 'Año de fundación',   orden: 1 },
                { value: 'Emiliano Zapata', label: 'Tabasco, México',    orden: 2 },
                { value: 'Pública',         label: 'Educación superior', orden: 3 }
            ],
            pillars: [
                { num: '01', title: 'Formación práctica', text: 'Competencias desarrolladas mediante prácticas, proyectos, laboratorios y experiencias profesionales.', orden: 1 },
                { num: '02', title: 'Vinculación con el sector productivo', text: 'Relación con empresas, organizaciones e instituciones que acerca a los estudiantes a su área profesional.', orden: 2 },
                { num: '03', title: 'Formación integral', text: 'Actividades culturales, deportivas y paraescolares que complementan la preparación profesional.', orden: 3 }
            ]
        },

        ruta: {
            eyebrow: 'Ruta académica',
            titlePrefix: 'De',
            titleAccent: 'TSU',
            titleSuffix: 'a tu título profesional',
            lead: 'El TSU y la Ingeniería o Licenciatura forman parte de una misma ruta de formación, con dos estadías profesionales y la posibilidad de obtener 2 títulos y 2 cédulas.',
            steps: [
                { num: '01', meta: '2 años',                     title: 'Técnico Superior Universitario', text: 'Primera etapa de la ruta formativa universitaria.', orden: 1 },
                { num: '02', meta: 'Último cuatrimestre TSU',    title: 'Primera estadía',                text: 'Aplicación de conocimientos en el sector productivo.', orden: 2 },
                { num: '03', meta: '1 año 4 meses',              title: 'Ingeniería o Licenciatura',      text: 'Continuidad de estudios para completar la formación profesional.', orden: 3 },
                { num: '04', meta: 'Último cuatrimestre Ing./Lic.', title: 'Segunda estadía',             text: 'Cierre de la formación profesional vinculado al sector.', orden: 4 },
                { num: '05', meta: '2 títulos + 2 cédulas',      title: 'Egreso profesional',             text: 'Conclusión de la ruta completa con doble titulación.', orden: 5, final: true }
            ]
        }
    },

    /* ============================================================
       4. OFERTA EDUCATIVA
       ============================================================ */
    oferta: {
        head: {
            eyebrow: 'Oferta educativa',
            title: 'Programas con',
            titleAccent: 'continuidad',
            lead: 'TSU con continuidad a Ingeniería o Licenciatura. Dos estadías profesionales, 2 títulos y 2 cédulas profesionales.'
        },
        nota: 'La apertura de grupos está sujeta al cupo mínimo por cuatrimestre y a la disponibilidad docente. Consulta con Control Escolar antes de inscribirte.',

        carreras: [
            {
                id: 'carrera-01',
                orden: 1,
                visible: true,
                nombre: 'Entornos Virtuales y Negocios Digitales',
                nivel: 'Ingeniería',
                tagline: 'Diseña soluciones digitales, plataformas y experiencias conectadas.',
                area: 'Tecnología',
                areaClass: 'tech',
                imagen: '/assets/images/carreras/TI/ti22.webp',
                alt: 'Entornos virtuales y negocios digitales',
                facts: [
                    { text: '2 años + 1 año 4 meses' },
                    { text: '2 títulos + 2 cédulas' }
                ],
                enlace: '/pages/oferta-educativa/carrera-01.html',
                ctaLabel: 'Ver programa'
            },
            {
                id: 'carrera-02',
                orden: 2,
                visible: true,
                nombre: 'Biotecnología',
                nivel: 'Ingeniería',
                tagline: 'Investiga y aplica procesos biológicos en laboratorio y campo.',
                area: 'Ciencias de la vida',
                areaClass: 'bio',
                imagen: '/assets/images/carreras/BIO/BIO9.webp',
                alt: 'Biotecnología UTU',
                facts: [
                    { text: '2 años + 1 año 4 meses' },
                    { text: '2 títulos + 2 cédulas' }
                ],
                enlace: '/pages/oferta-educativa/carrera-02.html',
                ctaLabel: 'Ver programa'
            },
            {
                id: 'carrera-03',
                orden: 3,
                visible: true,
                nombre: 'Negocios y Mercadotecnia',
                nivel: 'Licenciatura',
                tagline: 'Construye marcas, estrategias comerciales y experiencias de cliente.',
                area: 'Negocios',
                areaClass: 'biz',
                imagen: '/assets/images/carreras/NEGOCIOS/negocios.webp',
                alt: 'Negocios y Mercadotecnia UTU',
                facts: [
                    { text: '2 años + 1 año 4 meses' },
                    { text: '2 títulos + 2 cédulas' }
                ],
                enlace: '/pages/oferta-educativa/carrera-03.html',
                ctaLabel: 'Ver programa'
            },
            {
                id: 'carrera-04',
                orden: 4,
                visible: true,
                nombre: 'Gastronomía',
                nivel: 'Licenciatura',
                tagline: 'Domina técnicas culinarias y gestión de servicios gastronómicos.',
                area: 'Gastronomía',
                areaClass: 'gas',
                imagen: '/assets/images/carreras/GASTRONOMIA/gastro11.webp',
                alt: 'Gastronomía UTU',
                facts: [
                    { text: '2 años + 1 año 4 meses' },
                    { text: '2 títulos + 2 cédulas' }
                ],
                enlace: '/pages/oferta-educativa/carrera-04.html',
                ctaLabel: 'Ver programa'
            },
            {
                id: 'carrera-05',
                orden: 5,
                visible: true,
                nombre: 'Gestión y Desarrollo Turístico',
                nivel: 'Licenciatura',
                tagline: 'Diseña destinos, experiencias y proyectos turísticos sostenibles.',
                area: 'Turismo',
                areaClass: 'tur',
                imagen: '/assets/images/carreras/TURISMO/TURISMO5.webp',
                alt: 'Gestión y desarrollo turístico',
                facts: [
                    { text: '2 años + 1 año 4 meses' },
                    { text: '2 títulos + 2 cédulas' }
                ],
                enlace: '/pages/oferta-educativa/carrera-05.html',
                ctaLabel: 'Ver programa'
            },
            {
                id: 'carrera-06',
                orden: 6,
                visible: true,
                nombre: 'Protección Civil',
                nivel: 'Licenciatura',
                tagline: 'Formación en atención prehospitalaria y gestión de riesgos.',
                area: 'Salud',
                areaClass: 'salud',
                imagen: '/assets/images/carreras/PARAMEDICO/paramedico.webp',
                alt: 'Paramédico y protección civil',
                facts: [
                    { text: '2 años + 1 año 4 meses' },
                    { text: '2 títulos + 2 cédulas' }
                ],
                enlace: '/pages/oferta-educativa/carrera-06.html',
                ctaLabel: 'Ver programa'
            },
            {
                id: 'carrera-07',
                orden: 7,
                visible: true,
                nombre: 'Contaduría',
                nivel: 'Licenciatura',
                tagline: 'Domina la información financiera, fiscal y de auditoría.',
                area: 'Finanzas',
                areaClass: 'fin',
                imagen: '/assets/images/carreras/CONTADURIA/CONTA.2.webp',
                alt: 'Contaduría UTU',
                facts: [
                    { text: '2 años + 1 año 4 meses' },
                    { text: '2 títulos + 2 cédulas' }
                ],
                enlace: '/pages/oferta-educativa/carrera-07.html',
                ctaLabel: 'Ver programa'
            },
            {
                id: 'modalidad-mixta-contaduria',
                orden: 8,
                visible: true,
                nombre: 'Contaduría Modalidad Mixta',
                nivel: 'Modalidad Mixta',
                tagline: 'Combina sesiones sabatinas y trabajo autónomo. Diseñada para quienes estudian y trabajan.',
                area: 'Modalidad Mixta',
                areaClass: 'mixta',
                imagen: '/assets/images/carreras/CONTADURIA/CONTA.webp',
                alt: 'Contaduría Modalidad Mixta UTU',
                facts: [
                    { text: 'Horario sabatino' },
                    { text: 'Cupo limitado' }
                ],
                enlace: '/pages/oferta-educativa/index.html',
                ctaLabel: 'Consultar programas'
            },
            {
                id: 'modalidad-mixta-ti',
                orden: 9,
                visible: true,
                nombre: 'TI Modalidad Mixta',
                nivel: 'Modalidad Mixta',
                tagline: 'Combina sesiones sabatinas y trabajo autónomo. Diseñada para quienes estudian y trabajan.',
                area: 'Modalidad Mixta',
                areaClass: 'mixta',
                imagen: '/assets/images/carreras/TI/ti44.webp',
                alt: 'TI Modalidad Mixta UTU',
                facts: [
                    { text: 'Horario sabatino' },
                    { text: 'Cupo limitado' }
                ],
                enlace: '/pages/oferta-educativa/index.html',
                ctaLabel: 'Consultar programas'
            },
            {
                id: 'modalidad-mixta-gastronomia',
                orden: 10,
                visible: true,
                nombre: 'Gastronomía Modalidad Mixta',
                nivel: 'Modalidad Mixta',
                tagline: 'Combina sesiones sabatinas y trabajo autónomo. Diseñada para quienes estudian y trabajan.',
                area: 'Modalidad Mixta',
                areaClass: 'mixta',
                imagen: '/assets/images/carreras/GASTRONOMIA/gastro.webp',
                alt: 'Gastronomía Modalidad Mixta UTU',
                facts: [
                    { text: 'Horario sabatino' },
                    { text: 'Cupo limitado' }
                ],
                enlace: '/pages/oferta-educativa/index.html',
                ctaLabel: 'Consultar programas'
            }
        ]
    },

    /* ============================================================
       5. VIDA UNIVERSITARIA + GALERÍA
       ============================================================ */
    vidaUniversitaria: {
        eyebrow: 'Vida universitaria',
        title: 'Paraescolares: la experiencia',
        titleAccent: 'también se vive fuera del aula',
        lead: 'La experiencia universitaria va más allá de las clases. Los paraescolares de la UTU son espacios para desarrollar disciplina, creatividad, trabajo en equipo y convivencia.',
        texto: 'Deporte, cultura y arte se reúnen en los talleres que forman parte de la vida universitaria. Al cierre de cada periodo se realizan demostraciones abiertas a toda la comunidad.',
        linkCta: { label: 'Conoce los paraescolares', href: '/pages/comunidad/paraescolares.html' },
        stats: [
            { count: 9,  label: 'Paraescolares',  orden: 1 },
            { count: 3,  label: 'Categorías',     orden: 2 },
            { count: 12, label: 'Eventos al año', orden: 3 }
        ],
        categorias: [
            { label: 'Deporte', class: 'life__cat--sport' },
            { label: 'Cultura', class: 'life__cat--culture' },
            { label: 'Arte',    class: 'life__cat--art' }
        ],
        galeria: [
            { src: '/assets/images/paraescolares/tamborileros.webp', alt: 'Tamborileros de la UTU en presentación', categoria: 'Cultura', catSlug: 'culture', caption: 'Tamborileros', orden: 1 },
            { src: '/assets/images/paraescolares/banda-guerra.webp', alt: 'Banda de Guerra de la UTU', categoria: 'Cultura', catSlug: 'culture', caption: 'Banda de Guerra', orden: 2 },
            { src: '/assets/images/paraescolares/musica.webp', alt: 'Banda de música de la UTU', categoria: 'Cultura', catSlug: 'culture', caption: 'Música', orden: 3 },
            { src: '/assets/images/paraescolares/taekwondo.webp', alt: 'Práctica de Taekwondo en la UTU', categoria: 'Deporte', catSlug: 'sport', caption: 'Taekwondo', orden: 4 },
            { src: '/assets/images/paraescolares/basquetbol.webp', alt: 'Entrenamiento de basquetbol en la UTU', categoria: 'Deporte', catSlug: 'sport', caption: 'Basquetbol', orden: 5 },
            { src: '/assets/images/paraescolares/pintura.webp', alt: 'Taller de Pintura en la UTU', categoria: 'Arte', catSlug: 'art', caption: 'Pintura', orden: 6 },
            { src: '/assets/images/paraescolares/serigrafia.webp', alt: 'Taller de Serigrafía en la UTU', categoria: 'Arte', catSlug: 'art', caption: 'Serigrafía', orden: 7 }
        ]
    },

    /* ============================================================
       6. NOTICIAS
       ------------------------------------------------------------
       La sección permanece oculta mientras no existan publicaciones
       oficiales verificadas. Cuando existan, llenar `items` y la
       portada mostrará automáticamente la sección.
       ============================================================ */
    noticias: {
        head: {
            eyebrow: 'Noticias y eventos',
            title: 'Lo que ocurre en la',
            titleAccent: 'UTU',
            lead: 'Actividades académicas, culturales, deportivas e institucionales.',
            ctaLabel: 'Ver todas'
        },
        nota: '',
        items: []
    },

    /* ============================================================
       7. EVENTOS
       ------------------------------------------------------------
       Igual que noticias: se muestra solo cuando existan eventos
       oficiales. No usar contenido demostrativo.
       ============================================================ */
    eventos: {
        head: { eyebrow: 'Próximos eventos', title: 'Agenda institucional' },
        nota: '',
        items: []
    },

    /* ============================================================
       8. COLLAGE / COMUNIDAD
       ============================================================ */
    collage: {
        eyebrow: 'Somos',
        title: '#UTUSumacinta',
        lead: 'Comunidad, cultura, deporte, laboratorios, proyectos y vida universitaria.',
        imagenes: [
            { src: '/assets/images/carreras/CONTADURIA/CONTA4.webp',  alt: 'Comunidad UTU 1', cell: 'a', orden: 1 },
            { src: '/assets/images/carreras/CONTADURIA/CONTA5.webp',  alt: 'Comunidad UTU 2', cell: 'b', orden: 2 },
            { src: '/assets/images/carreras/CONTADURIA/CONTA9.webp',  alt: 'Comunidad UTU 3', cell: 'c', orden: 3 },
            { src: '/assets/images/carreras/CONTADURIA/CONTA.2.webp', alt: 'Comunidad UTU 4', cell: 'd', orden: 4 },
            { src: '/assets/images/carreras/BIO/BIO11.webp',          alt: 'Comunidad UTU 5', cell: 'e', orden: 5 },
            { src: '/assets/images/carreras/BIO/BIO9.webp',           alt: 'Comunidad UTU 6', cell: 'f', orden: 6 }
        ]
    },

    /* ============================================================
       9. CTA FINAL
       ============================================================ */
    cta: {
        eyebrow: '#OrgullosamenteUTU · #ÚneteYa',
        title: 'Aquí, aprender no significa únicamente conocer.',
        texto: 'Significa practicar, desarrollar, participar y transformar. Conoce la oferta académica de la UTU y forma parte de una ruta de formación con experiencia profesional.',
        botones: [
            { label: 'Explora la oferta educativa', href: '/pages/oferta-educativa/index.html', style: 'btn--light',       icon: true },
            { label: 'Ubicación y contacto',        href: '/pages/comunidad/ubicacion.html',  style: 'btn--ghost-light', icon: false }
        ]
    }
};

if (typeof window !== 'undefined') {
    window.UTU_SITE_CONTENT = SITE_CONTENT;
}

export default SITE_CONTENT;