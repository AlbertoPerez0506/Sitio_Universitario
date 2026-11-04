/* ============================================================
   site-content.js — Fuente única de contenido editable
   ------------------------------------------------------------
   ▸ Toda modificación de contenido se hace aquí.
   ▸ El diseño y estructura viven en HTML/CSS.
   ▸ El logotipo del header, el favicon y el footer NO se
     centralizan aquí (viven en header.js / footer.js / index.html).
   ▸ Preparado para migrar a panel administrativo:
       - Toda la data es serializable (JSON-safe).
       - Expuesta en window.UTU_SITE_CONTENT para futuros editores.
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

                /* ------------------------------------------------------------
                   IMAGEN REAL — sustituye la URL de Unsplash original
                   ------------------------------------------------------------
                   ANTES (Unsplash):
                     'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=1080&q=80&auto=format&fit=crop'

                   AHORA (imagen local del campus):
                     '/assets/images/hero/campus1.webp'

                    Coloca el archivo en: /assets/images/hero/campus1.webp
                    Tamaño recomendado: 1920 × 1080 px
                    Peso recomendado: < 300 KB
                   ------------------------------------------------------------ */
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
       2. HERO FACTS — tarjeta debajo del carrusel
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
            lead: 'La Universidad Tecnológica del Usumacinta es una institución de educación superior ubicada en el municipio de Emiliano Zapata, Tabasco, cuya propuesta educativa se caracteriza por una formación orientada principalmente a la práctica y a la aplicación de conocimientos.',
            texto: 'Su modelo formativo combina conocimientos teóricos con una importante participación práctica: prácticas, proyectos, laboratorios, experiencias profesionales y participación en la vida universitaria.',
            linkCta: { label: 'Conoce más sobre la UTU', href: '/pages/universidad/bienvenida.html' },
            imagen: {
                src: '/assets/images/carreras/CONTADURIA/CONTA4.webp',
                alt: 'Estudiantes de la UTU durante una actividad práctica',
                fallback: 'Actividad práctica'
            },
            badge: { title: 'Educación pública', subtitle: 'de calidad' },
            facts: [
                { icon: 'i-calendar',    value: '2003',            label: 'Año de fundación', orden: 1 },
                { icon: 'i-location',    value: 'Emiliano Zapata', label: 'Tabasco, México',  orden: 2 },
                { icon: 'i-certificate', value: 'Pública',         label: 'Educación superior', orden: 3 }
            ],
            pillars: [
                { icon: 'i-practice', num: '01', title: 'Formación práctica', text: 'Competencias desarrolladas mediante prácticas, proyectos, laboratorios y experiencias profesionales.', orden: 1 },
                { icon: 'i-link',     num: '02', title: 'Vinculación con el sector productivo', text: 'Relación con empresas, organizaciones e instituciones que acerca a los estudiantes a su área profesional.', orden: 2 },
                { icon: 'i-users',    num: '03', title: 'Formación integral', text: 'Actividades culturales, deportivas y paraescolares que complementan la preparación profesional.', orden: 3 }
            ]
        },

        /* ---------- Ruta académica ---------- */
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
            eyebrow: 'Oferta educativa · 8 opciones',
            title: '8 programas,',
            titleAccent: 'una misma ruta',
            lead: 'TSU con continuidad a Ingeniería o Licenciatura. Dos estadías profesionales, 2 títulos y 2 cédulas profesionales.'
        },
        nota: 'La apertura de grupos está sujeta al cupo mínimo por cuatrimestre y a la disponibilidad docente. Consulta con Control Escolar antes de inscribirte.',

        /* ------------------------------------------------------------
           Para agregar una carrera: copia un objeto, pégalo al final,
           cambia id/orden/nombre/nivel/etc. La tarjeta se genera sola.

           💡 Para usar una imagen local en cualquier carrera,
              reemplaza la URL de Unsplash por una ruta como:
              imagen: '/assets/images/carreras/mi-carrera.webp',
           ------------------------------------------------------------ */
        carreras: [
            {
                id: 'carrera-01',
                orden: 1,
                visible: true,
                nombre: 'Entornos Virtuales y Negocios Digitales',
                nivel: 'Ingeniería',
                eyebrow: 'TSU + Continuidad a Ingeniería',
                tagline: 'Diseña soluciones digitales, plataformas y experiencias conectadas.',
                area: 'Tecnología',
                areaClass: 'tech',
                imagen: '/assets/images/carreras/TI/ti22.webp',
                alt: 'Entornos virtuales y negocios digitales',
                facts: [
                    { icon: 'clock',       text: '2 años + 1 año 4 meses' },
                    { icon: 'certificate', text: '2 títulos + 2 cédulas' }
                ],
                enlace: '/pages/oferta-educativa/carrera-01.html',
                ctaLabel: 'Ver programa',
                featured: false
            },
            {
                id: 'carrera-02',
                orden: 2,
                visible: true,
                nombre: 'Biotecnología',
                nivel: 'Ingeniería',
                eyebrow: 'TSU + Continuidad a Ingeniería',
                tagline: 'Investiga y aplica procesos biológicos en laboratorio y campo.',
                area: 'Ciencias de la vida',
                areaClass: 'bio',
                imagen: '/assets/images/carreras/BIO/BIO9.webp',
                alt: 'Biotecnología UTU',
                facts: [
                    { icon: 'clock',       text: '2 años + 1 año 4 meses' },
                    { icon: 'certificate', text: '2 títulos + 2 cédulas' }
                ],
                enlace: '/pages/oferta-educativa/carrera-02.html',
                ctaLabel: 'Ver programa',
                featured: false
            },
            {
                id: 'carrera-03',
                orden: 3,
                visible: true,
                nombre: 'Negocios y Mercadotecnia',
                nivel: 'Licenciatura',
                eyebrow: 'TSU + Continuidad a Licenciatura',
                tagline: 'Construye marcas, estrategias comerciales y experiencias de cliente.',
                area: 'Negocios',
                areaClass: 'biz',
                imagen: '/assets/images/carreras/NEGOCIOS/negocios.webp',
                alt: 'Negocios y Mercadotecnia UTU',
                facts: [
                    { icon: 'clock',       text: '2 años + 1 año 4 meses' },
                    { icon: 'certificate', text: '2 títulos + 2 cédulas' }
                ],
                enlace: '/pages/oferta-educativa/carrera-03.html',
                ctaLabel: 'Ver programa',
                featured: false
            },
            {
                id: 'carrera-04',
                orden: 4,
                visible: true,
                nombre: 'Gastronomía',
                nivel: 'Licenciatura',
                eyebrow: 'TSU + Continuidad a Licenciatura',
                tagline: 'Domina técnicas culinarias y gestión de servicios gastronómicos.',
                area: 'Gastronomía',
                areaClass: 'gas',
                imagen: '/assets/images/carreras/GASTRONOMIA/gastro11.webp',
                alt: 'Gastronomía UTU',
                facts: [
                    { icon: 'clock',       text: '2 años + 1 año 4 meses' },
                    { icon: 'certificate', text: '2 títulos + 2 cédulas' }
                ],
                enlace: '/pages/oferta-educativa/carrera-04.html',
                ctaLabel: 'Ver programa',
                featured: false
            },
            {
                id: 'carrera-05',
                orden: 5,
                visible: true,
                nombre: 'Gestión y Desarrollo Turístico',
                nivel: 'Licenciatura',
                eyebrow: 'TSU + Continuidad a Licenciatura',
                tagline: 'Diseña destinos, experiencias y proyectos turísticos sostenibles.',
                area: 'Turismo',
                areaClass: 'tur',
                imagen: '/assets/images/carreras/TURISMO/TURISMO5.webp',
                alt: 'Gestión y desarrollo turístico',
                facts: [
                    { icon: 'clock',       text: '2 años + 1 año 4 meses' },
                    { icon: 'certificate', text: '2 títulos + 2 cédulas' }
                ],
                enlace: '/pages/oferta-educativa/carrera-05.html',
                ctaLabel: 'Ver programa',
                featured: false
            },
            {
                id: 'carrera-06',
                orden: 6,
                visible: true,
                nombre: 'Protección Civil',
                nivel: 'Licenciatura',
                eyebrow: 'TSU + Continuidad a Licenciatura',
                tagline: 'Formación en atención prehospitalaria y gestión de riesgos.',
                area: 'Salud',
                areaClass: 'salud',
                imagen: '/assets/images/carreras/PARAMEDICO/paramedico.webp',
                alt: 'Paramédico y protección civil',
                facts: [
                    { icon: 'clock',       text: '2 años + 1 año 4 meses' },
                    { icon: 'certificate', text: '2 títulos + 2 cédulas' }
                ],
                enlace: '/pages/oferta-educativa/carrera-06.html',
                ctaLabel: 'Ver programa',
                featured: false
            },
            {
                id: 'carrera-07',
                orden: 7,
                visible: true,
                nombre: 'Contaduría',
                nivel: 'Licenciatura',
                eyebrow: 'TSU + Continuidad a Licenciatura',
                tagline: 'Domina la información financiera, fiscal y de auditoría.',
                area: 'Finanzas',
                areaClass: 'fin',
                imagen: '/assets/images/carreras/CONTADURIA/CONTA.2.webp',
                alt: 'Contaduría UTU',
                facts: [
                    { icon: 'clock',       text: '2 años + 1 año 4 meses' },
                    { icon: 'certificate', text: '2 títulos + 2 cédulas' }
                ],
                enlace: '/pages/oferta-educativa/carrera-07.html',
                ctaLabel: 'Ver programa',
                featured: false
            },
            {
                id: 'modalidad-mixta',
                orden: 8,
                visible: true,
                nombre: 'Contaduría Modalidad Mixta',
                nivel: 'Modalidad Mixta',
                eyebrow: 'TSU + Continuidad · Estudia y trabaja',
                tagline: 'Combina sesiones sabatinas y trabajo autónomo. Diseñada para quienes estudian y trabajan.',
                area: 'Modalidad Mixta',
                areaClass: 'mixta',
                imagen: '/assets/images/carreras/CONTADURIA/CONTA.webp',
                alt: 'Modalidad Mixta UTU — Estudia y trabaja',
                facts: [
                    { icon: 'clock', text: 'Horario sabatino' },
                    { icon: 'bolt',  text: 'Cupo limitado' }
                ],
                enlace: '/pages/oferta-educativa/index.html',
                ctaLabel: 'Consultar programas',
                featured: true,
                badgeNuevo: 'Nueva opción 2026'
            },
            {
                id: 'modalidad-mixta',
                orden: 9,
                visible: true,
                nombre: 'TI Modalidad Mixta',
                nivel: 'Modalidad Mixta',
                eyebrow: 'TSU + Continuidad · Estudia y trabaja',
                tagline: 'Combina sesiones sabatinas y trabajo autónomo. Diseñada para quienes estudian y trabajan.',
                area: 'Modalidad Mixta',
                areaClass: 'mixta',
                imagen: '/assets/images/carreras/TI/ti44.webp',
                alt: 'Modalidad Mixta UTU — Estudia y trabaja',
                facts: [
                    { icon: 'clock', text: 'Horario sabatino' },
                    { icon: 'bolt',  text: 'Cupo limitado' }
                ],
                enlace: '/pages/oferta-educativa/index.html',
                ctaLabel: 'Consultar programas',
                featured: true,
                badgeNuevo: 'Nueva opción 2027'
            },
            {
                id: 'modalidad-mixta',
                orden: 10,
                visible: true,
                nombre: 'Gastronomía Modalidad Mixta',
                nivel: 'Modalidad Mixta',
                eyebrow: 'TSU + Continuidad · Estudia y trabaja',
                tagline: 'Combina sesiones sabatinas y trabajo autónomo. Diseñada para quienes estudian y trabajan.',
                area: 'Modalidad Mixta',
                areaClass: 'mixta',
                imagen: '/assets/images/carreras/GASTRONOMIA/gastro.webp',
                alt: 'Modalidad Mixta UTU — Estudia y trabaja',
                facts: [
                    { icon: 'clock', text: 'Horario sabatino' },
                    { icon: 'bolt',  text: 'Cupo limitado' }
                ],
                enlace: '/pages/oferta-educativa/index.html',
                ctaLabel: 'Consultar programas',
                featured: true,
                badgeNuevo: 'Nueva opción 2027'
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
            // --- CULTURA ---
            { src: '/assets/images/paraescolares/tamborileros.webp', alt: 'Tamborileros de la UTU en presentación', categoria: 'Cultura', catSlug: 'culture', caption: 'Tamborileros', orden: 1 },
            { src: '/assets/images/paraescolares/banda-guerra.webp', alt: 'Banda de Guerra de la UTU', categoria: 'Cultura', catSlug: 'culture', caption: 'Banda de Guerra', orden: 2 },
            { src: '/assets/images/paraescolares/musica.webp', alt: 'Banda de música de la UTU', categoria: 'Cultura', catSlug: 'culture', caption: 'Música', orden: 3 },
            
            // --- DEPORTE ---
            { src: '/assets/images/paraescolares/taekwondo.webp', alt: 'Práctica de Taekwondo en la UTU', categoria: 'Deporte', catSlug: 'sport', caption: 'Taekwondo', orden: 4 },
            { src: '/assets/images/paraescolares/basquetbol.webp', alt: 'Entrenamiento de basquetbol en la UTU', categoria: 'Deporte', catSlug: 'sport', caption: 'Basquetbol', orden: 5 },
            
            // --- ARTE ---
            { src: '/assets/images/paraescolares/pintura.webp', alt: 'Taller de Pintura en la UTU', categoria: 'Arte', catSlug: 'art', caption: 'Pintura', orden: 6 },
            { src: '/assets/images/paraescolares/serigrafia.webp', alt: 'Taller de Serigrafía en la UTU', categoria: 'Arte', catSlug: 'art', caption: 'Serigrafía', orden: 7 }
        ]
    },

    /* ============================================================
       6. NOTICIAS
       ============================================================ */
    noticias: {
        head: {
            eyebrow: 'Noticias y eventos',
            title: 'Lo que ocurre en la',
            titleAccent: 'UTU',
            lead: 'Actividades académicas, culturales, deportivas e institucionales.',
            ctaLabel: 'Ver todas'
        },
        nota: 'Contenido demostrativo. Pendiente de sustituirse por publicaciones oficiales.',
        items: [
            { id: 'n-01', title: 'Presentación de proyectos integradores del cuatrimestre', excerpt: 'Estudiantes de todas las carreras expusieron sus proyectos finales ante docentes, invitados del sector productivo y la comunidad universitaria.', category: 'academico', categoryLabel: 'Académico', date: '2026-09-15', readMinutes: 4, image: '/assets/images/carreras/BIO/BIO2.webp', url: '/pages/noticias/proyectos-integradores.html' },
            { id: 'n-02', title: 'Concurso interno de inglés: edición 2026', excerpt: 'La UTU celebró su concurso anual de inglés con la participación de estudiantes de todos los niveles.', category: 'academico', categoryLabel: 'Académico', date: '2026-09-10', readMinutes: 3, image: '/assets/images/carreras/BIO/BIO3.webp', url: '/pages/noticias/concurso-ingles.html' },
            { id: 'n-03', title: 'Aniversario de la UTU: una trayectoria desde 2003', excerpt: 'La comunidad universitaria celebró un año más de historia institucional con actividades culturales y académicas.', category: 'institucional', categoryLabel: 'Institucional', date: '2026-09-05', readMinutes: 5, image: '/assets/images/carreras/BIO/BIO4.webp', url: '/pages/noticias/aniversario.html' },
            { id: 'n-04', title: 'Encuentro deportivo entre universidades tecnológicas', excerpt: 'Equipos de fútbol, básquetbol y voleibol de la región se reunieron en las instalaciones de la UTU.', category: 'deporte', categoryLabel: 'Deporte', date: '2026-09-02', readMinutes: 3, image: '/assets/images/carreras/BIO/BIO5.webp', url: '/pages/noticias/encuentro-deportivo.html' },
            { id: 'n-05', title: 'Taller de habilidades blandas para estudiantes de nuevo ingreso', excerpt: 'Comunicación efectiva, trabajo en equipo y liderazgo fueron algunos de los temas abordados.', category: 'academico', categoryLabel: 'Académico', date: '2026-08-28', readMinutes: 4, image: '/assets/images/carreras/BIO/BIO6.webp', url: '/pages/noticias/taller-habilidades.html' },
            { id: 'n-06', title: 'Exposición de proyectos de Biotecnología', excerpt: 'Estudiantes presentaron investigaciones y prototipos desarrollados durante el cuatrimestre.', category: 'academico', categoryLabel: 'Académico', date: '2026-08-22', readMinutes: 4, image: '/assets/images/carreras/BIO/BIO9.webp', url: '/pages/noticias/expo-biotecnologia.html' },
            { id: 'n-07', title: 'Bienvenida al nuevo ciclo escolar', excerpt: 'Autoridades universitarias dieron la bienvenida a la nueva generación de estudiantes.', category: 'institucional', categoryLabel: 'Institucional', date: '2026-08-19', readMinutes: 2, image: '/assets/images/carreras/CONTADURIA/CONTA4.webp', url: '/pages/noticias/bienvenida.html' },
            { id: 'n-08', title: 'Demostración gastronómica y operación de bar', excerpt: 'Estudiantes de Gastronomía mostraron técnicas de coctelería y montaje de servicios.', category: 'evento', categoryLabel: 'Evento', date: '2026-08-12', readMinutes: 3, image: '/assets/images/carreras/CONTADURIA/CONTA5.webp', url: '/pages/noticias/demostracion-gastronomica.html' },
            { id: 'n-09', title: 'Concierto de Tamborileros en el campus', excerpt: 'El grupo representativo de la UTU ofreció una presentación abierta a toda la comunidad.', category: 'cultura', categoryLabel: 'Cultura', date: '2026-08-06', readMinutes: 2, image: '/assets/images/carreras/CONTADURIA/CONTA9.webp', url: '/pages/noticias/concierto-tamborileros.html' }
        ]
    },

    /* ============================================================
       7. EVENTOS
       ============================================================ */
    eventos: {
        head: { eyebrow: 'Próximos eventos', title: 'Agenda institucional' },
        nota: 'Contenido demostrativo. Pendiente de sustituirse por eventos oficiales.',
        items: [
            { title: 'Ceremonia de bienvenida al ciclo 2026-B',    date: '12 OCT 2026', place: 'Auditorio de Turismo',           text: 'Presentación de autoridades y entrega de reconocimientos a estudiantes destacados.' },
            { title: 'Feria de vinculación con el sector productivo', date: '05 NOV 2026', place: 'Explanada principal',          text: 'Empresas de la región presentan oportunidades de estadía y colaboración.' },
            { title: 'Encuentro deportivo interfacultades',        date: '22 NOV 2026', place: 'Cancha techada',               text: 'Fútbol, básquetbol y voleibol con participación de todas las carreras.' },
            { title: 'Muestra gastronómica de fin de cuatrimestre', date: '06 DIC 2026', place: 'Laboratorio de Gastronomía',  text: 'Estudiantes presentan platillos y técnicas desarrolladas durante el cuatrimestre.' },
            { title: 'Concierto navideño de Tamborileros',         date: '15 DIC 2026', place: 'Auditorio Edificio 1',         text: 'Presentación abierta a la comunidad universitaria y público general.' }
        ]
    },

    /* ============================================================
       8. COLLAGE / COMUNIDAD
       ============================================================ */
    collage: {
        eyebrow: 'Somos',
        title: '#UTUSumacinta',
        lead: 'Comunidad, cultura, deporte, laboratorios, proyectos y vida universitaria.',
        imagenes: [
            { src: '/assets/images/carreras/CONTADURIA/CONTA4.webp', alt: 'Comunidad UTU 1', cell: 'a', orden: 1 },
            { src: '/assets/images/carreras/CONTADURIA/CONTA5.webp',  alt: 'Comunidad UTU 2', cell: 'b', orden: 2 },
            { src: '/assets/images/carreras/CONTADURIA/CONTA5.webp',  alt: 'Comunidad UTU 3', cell: 'c', orden: 3 },
            { src: '/assets/images/carreras/CONTADURIA/CONTA9.webp',   alt: 'Comunidad UTU 4', cell: 'd', orden: 4 },
            { src: '/assets/images/carreras/CONTADURIA/CONTA.2.webp', alt: 'Comunidad UTU 5', cell: 'e', orden: 5 },
            { src: '/assets/images/carreras/BIO/BIO11.webp', alt: 'Comunidad UTU 6', cell: 'f', orden: 6 }
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

/* Compatibilidad con el futuro panel administrativo.
   El módulo se puede importar (ESM) o leer desde window. */
if (typeof window !== 'undefined') {
    window.UTU_SITE_CONTENT = SITE_CONTENT;
}

export default SITE_CONTENT;