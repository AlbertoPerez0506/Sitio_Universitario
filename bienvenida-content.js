/* ============================================================
   bienvenida-content.js — Contenido editable de la página
   de Bienvenida de la Universidad Tecnológica del Usumacinta.
   ============================================================ */

export const welcomeContent = {
  /* ---------- HERO ---------- */
  hero: {
    eyebrow: 'Bienvenida institucional',
    titleLine1: 'Bienvenidos a la UTU.',
    titleAccent: 'Formación que se vive.',
    lead:
      'Conocimiento que se aplica. Una universidad tecnológica donde el 60% ' +
      'de la formación es práctica, con dos estadías profesionales y una ruta ' +
      'clara de TSU a Ingeniería o Licenciatura.',
    ctaLabel: 'Conoce nuestra oferta',
    ctaHref: '/pages/oferta/index.html',
  },

  /* ---------- FRANJA DE DATOS (nueva) ---------- */
  highlights: {
    eyebrow: 'La UTU en datos',
    title: 'Nuestro modelo en cifras',
    items: [
      { value: 60, suffix: '%', label: 'Formación práctica' },
      { value: 40, suffix: '%', label: 'Formación teórica' },
      { value: 2, label: 'Estadías profesionales' },
      { text: 'TSU → Lic.', label: 'Continuidad académica' },
    ],
  },

  /* ---------- IDENTIDAD ---------- */
  identity: {
    eyebrow: 'Nuestra identidad',
    titleLine1: 'Una universidad',
    titleAccent: 'para el mundo real',
    text1:
      'La Universidad Tecnológica del Usumacinta forma profesionales a ' +
      'través de un modelo educativo que combina 60% de práctica y 40% de ' +
      'teoría, con dos estadías profesionales que conectan el aula con la ' +
      'industria, el campo y la comunidad.',
    text2:
      'Nuestra ruta académica permite a los estudiantes construir su ' +
      'trayectoria profesional de forma progresiva: del Técnico Superior ' +
      'Universitario (TSU) a la Ingeniería o Licenciatura, con un perfil de ' +
      'egreso orientado a la solución de problemas reales.',
  },

  /* ---------- RUTA ACADÉMICA (chips dentro de identidad) ---------- */
  route: {
    eyebrow: 'Ruta académica',
    stepTsu: 'TSU · 2 años',
    stepFinal: 'Ingeniería o Licenciatura',
  },

  /* ---------- MENSAJE DEL RECTOR ---------- */
  rector: {
    eyebrow: 'Mensaje del rector',
    title: 'Un mensaje para nuestra comunidad',

    message: [
      'Bienvenidos a la Universidad Tecnológica del Usumacinta, una ' +
      'institución donde el conocimiento cobra sentido cuando se lleva a la ' +
      'práctica. Aquí no solo se estudia: se experimenta, se construye y se ' +
      'transforma la realidad desde las aulas, los laboratorios y el campo.',

      'Nuestro modelo formativo —60% práctica y 40% teoría— es una ' +
      'convicción profunda: los profesionales se forman enfrentando retos ' +
      'reales. Las dos estadías profesionales que acompañan su trayectoria ' +
      'académica son la prueba de ese compromiso: aprender en el entorno ' +
      'productivo para egresar con experiencia.',

      'La ruta académica de la UTU les permite construir su futuro de manera ' +
      'progresiva, del Técnico Superior Universitario a la Ingeniería o ' +
      'Licenciatura, con la posibilidad de obtener dos títulos y dos cédulas ' +
      'profesionales. En la UTU encontrarán además una comunidad que valora ' +
      'el respeto, la responsabilidad, la ética y la solidaridad, con ' +
      'tutorías, asesorías, actividades culturales, deportivas y ' +
      'paraescolares, y una vinculación permanente con el sector productivo.',

      'Los invito a asumir este camino con disciplina, curiosidad y ' +
      'compromiso. Estoy convencido de que aquí no solo encontrarán una ' +
      'carrera: encontrarán la oportunidad de transformar su entorno. ' +
      'Bienvenidos, orgullosamente UTU.',
    ],

    // Datos oficiales del Rector — pendientes de validación institucional.
    name: 'Mtro. Darvin Daniel González Baños',
    position: 'Rector',

    // Institución (visible siempre).
    university: 'Universidad Tecnológica del Usumacinta',

    // Imágenes oficiales colocadas desde /assets/images/rector/
    photo: '/assets/images/rector/Rector.webp',
    photoAlt: 'Fotografía oficial del Rector de la UTU',
    signature: '/assets/images/rector/Firma_Falsa.webp',
  },

  /* ---------- CTA FINAL ---------- */
  cta: {
    eyebrow: 'Continúa tu camino',
    title: 'Conoce la oferta educativa de la UTU',
    texto:
      'Explora los programas de TSU, Ingeniería y Licenciatura que la ' +
      'Universidad Tecnológica del Usumacinta tiene para ti.',
    primaryLabel: 'Ver oferta educativa',
    primaryHref: '/pages/oferta/index.html',
    secondaryLabel: 'Contacto',
    secondaryHref: '/pages/contacto/index.html',
  },
};

if (typeof window !== 'undefined') {
  window.UTU_BIENVENIDA_CONTENT = welcomeContent;
}

export default welcomeContent;