/* ============================================================
   bienvenida-content.js — Contenido editorial de la página
   "Bienvenida del Rector"
   ------------------------------------------------------------
   ▸ Todo el texto editable vive aquí.
   ▸ El diseño estructural (hero, retrato, firma, valores, CTA)
     vive en /css/pages/bienvenida.css y en el HTML.
   ▸ Preparado para migrar a un panel administrativo.
   ▸ Expuesto en window.UTU_BIENVENIDA_CONTENT.
   ============================================================ */

export const BIENVENIDA_CONTENT = {

    /* ------------------------------------------------------------
       META — usado por el módulo de página y por futuros editores
       ------------------------------------------------------------ */
    meta: {
        title: 'Bienvenida del Rector | UTU',
        description: 'Mensaje de bienvenida del Mtro. Darvin Daniel González Baños, Rector de la Universidad Tecnológica del Usumacinta.'
    },

    /* ------------------------------------------------------------
       HERO — cabecera interna
       ------------------------------------------------------------ */
    hero: {
        eyebrow: 'Bienvenida institucional',
        titlePrefix: 'Un mensaje de nuestro',
        titleAccent: 'Rector',
        lead: 'Conoce el mensaje de bienvenida del Mtro. Darvin Daniel González Baños, Rector de la Universidad Tecnológica del Usumacinta, para toda nuestra comunidad universitaria.'
    },

    /* ------------------------------------------------------------
       RECTOR — datos personales e imagen
       ------------------------------------------------------------ */
    rector: {
        nombre: 'Mtro. Darvin Daniel González Baños',
        cargo: 'Rector de la Universidad Tecnológica del Usumacinta',
        imagen: {
            src: '/assets/images/rector/Rector.webp',
            alt: 'Mtro. Darvin Daniel González Baños, Rector de la UTU',
            fallback: 'Retrato oficial del Rector'
        },
        badge: {
            title: 'Rector',
            subtitle: 'UT Usumacinta'
        }
    },

    /* ------------------------------------------------------------
       MENSAJE — carta del Rector
       ------------------------------------------------------------
       ▸ Usa [texto] para marcar fragmentos destacados.
         Se renderizarán como <span class="bienvenida__highlight">.
       ▸ tipo: 'lead' | 'normal'
       ------------------------------------------------------------ */
    mensaje: {
        titlePrefix: 'Un mensaje de nuestro',
        titleAccent: 'Rector',
        parrafos: [
            {
                tipo: 'lead',
                texto: 'Es un honor darles la más cordial bienvenida a nuestra comunidad universitaria. En la UT del Usumacinta nos dedicamos a formar profesionales de [excelencia con valores humanos], comprometidos con el desarrollo sostenible de nuestra región.'
            },
            {
                tipo: 'normal',
                texto: 'Nuestro compromiso es brindar una educación de calidad que combine la teoría con la práctica, preparando a nuestros estudiantes para los desafíos del mundo actual.'
            },
            {
                tipo: 'normal',
                texto: 'Los invito a ser parte activa de esta gran familia universitaria, donde juntos construiremos un futuro mejor para Tabasco y para México.'
            }
        ]
    },

    /* ------------------------------------------------------------
       VALORES — pilares que refuerzan el mensaje
       ------------------------------------------------------------ */
    valores: {
        eyebrow: 'Nuestro compromiso',
        title: 'Lo que nos',
        titleAccent: 'define',
        lead: 'Tres principios que guían la formación de cada estudiante en la UTU.',
        items: [
            {
                icon: 'i-users',
                title: 'Formación integral',
                text: 'Profesionales con excelencia académica y valores humanos, preparados para servir a su comunidad.'
            },
            {
                icon: 'i-practice',
                title: 'Teoría y práctica',
                text: 'Un modelo 60/40 que conecta el conocimiento con la realidad del sector productivo.'
            },
            {
                icon: 'i-globe',
                title: 'Compromiso regional',
                text: 'Desarrollo sostenible para Tabasco y México, con vinculación activa con el entorno.'
            }
        ]
    },

    /* ------------------------------------------------------------
       CTA FINAL — invita a seguir explorando
       ------------------------------------------------------------ */
    cta: {
        eyebrow: 'Siguiente paso',
        title: 'Conoce la universidad que te espera.',
        texto: 'Descubre nuestra oferta académica, nuestras instalaciones y todo lo que la UTU tiene para ti.',
        botones: [
            {
                label: 'Explora la oferta',
                href: '/pages/oferta-educativa/index.html',
                style: 'btn--light',
                icon: true
            },
            {
                label: 'Conoce la UTU',
                href: '/pages/universidad/historia.html',
                style: 'btn--ghost-light',
                icon: false
            }
        ]
    }
};

if (typeof window !== 'undefined') {
    window.UTU_BIENVENIDA_CONTENT = BIENVENIDA_CONTENT;
}

export default BIENVENIDA_CONTENT;