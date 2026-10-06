/* ============================================================
   SISE · Datos del sitio
   Todo el contenido editable vive aquí. Cambia textos, imágenes
   y enlaces sin tocar el HTML ni el CSS.
   ============================================================ */

/* ============================================================
   CONVENIOS — empresas que reciben a nuestros estudiantes
   ============================================================
   Los archivos se generan con scratchpad/convenios.py: recorta el
   margen, escala cada logo por AREA (no por alto, o los cuadrados se
   comerian a los alargados) y lo centra en un lienzo 480x180 igual
   para todos. Por eso la tira los puede pintar todos con la misma
   caja sin retocar nada aqui. */
const CONVENIOS = [
  { nombre: 'Interbank',             img: 'assets/img/convenios/interbank.webp' },
  { nombre: 'Scotiabank',            img: 'assets/img/convenios/scotiabank.webp' },
  { nombre: 'Santander',             img: 'assets/img/convenios/santander.webp' },
  { nombre: 'Caja Metropolitana',    img: 'assets/img/convenios/caja-metropolitana.webp' },
  { nombre: 'Caja Ica',              img: 'assets/img/convenios/caja-ica.webp' },
  { nombre: 'Financiera Proempresa', img: 'assets/img/convenios/financiera-proempresa.webp' },
  { nombre: 'Boticas Perú',          img: 'assets/img/convenios/boticas-peru.webp' },
  { nombre: 'Farmacias Peruanas',    img: 'assets/img/convenios/farmacias-peruanas.webp' },
  { nombre: 'Corporación EW',        img: 'assets/img/convenios/corporacion-ew.webp' },
  { nombre: 'Luz del Sur',           img: 'assets/img/convenios/luz-del-sur.webp' },
  { nombre: "Chili's",               img: 'assets/img/convenios/chilis.webp' },
  { nombre: 'La Bisteca',            img: 'assets/img/convenios/la-bisteca.webp' }
];

/* ============================================================
   BOTONES FLOTANTES
   ============================================================
   Cada opcion de WhatsApp lleva su enlace corto de wa.link: el numero
   de destino y el mensaje que aparece ya escrito se administran desde
   el panel de wa.link, no desde aqui. Para cambiar a quien le llega una
   consulta se edita ese enlace y la web no se toca.

   Si alguna vez hiciera falta apuntar a un numero directo, en lugar de
   "url" se le pone { numero: '51...', texto: '...' } a esa opcion. */
const FLOTANTES = {
  registro: {
    etiqueta: '¿Listo para comenzar?',
    url: 'index.html#form'
  },
  whatsapp: {
    opciones: [
      { label: 'Matricularme a Carreras', url: 'https://wa.link/g16qrt' },
      { label: 'Adquirir un Curso',       url: 'https://wa.link/zgq8zu' },
      { label: 'Soy Alumno SISE',         url: 'https://wa.link/8kjxf0' },
      /* Sin wa.link propio todavia: arma el enlace con el numero y el
         mensaje. Si se crea uno, basta con poner url y borrar lo demas. */
      { label: 'Retomar mi carrera',      numero: '51924298424', texto: 'Hola, quiero retomar mi carrera en SISE.' }
    ]
  }
};

/* ============================================================
   POPUP PROMOCIONAL (abajo a la izquierda)
   ============================================================
   Se minimiza a una pestaña y, con cerrable: true, tambien se puede
   cerrar (no vuelve en esa visita). Para quitarlo basta con borrar el
   bloque o dejar PROMO = null; pasada la fecha "hasta" deja de salir
   solo.

   "Conoce mas" lleva a url si la hay. Sin url abre el formulario con
   la carrera ya elegida (el nombre tiene que existir en CRM_CARRERAS). */
const PROMO = {
  imagen: 'assets/img/popup-interiores.webp',
  alt: 'Carrera Diseño de Interiores. Diseña proyectos reales desde tu primer año en SISE DECO. Inicio de clases: 5 de octubre. Conoce más aquí.',
  titulo: 'Diseño de Interiores',          // lo que se lee en la pestaña minimizada
  detalle: 'Inicio de clases',
  dato: '5 de octubre',
  carrera: 'Diseño de Interiores',
  url: '',
  hasta: '2026-12-31',                      // AAAA-MM-DD, ultimo dia que se muestra
  cerrable: true                            // true = lleva X para cerrarlo; false = solo se minimiza
};

/* ============================================================
   MENU DESPLEGADO (el que abre la hamburguesa)
   ============================================================
   Mapa del sitio completo. Es el unico menu en movil, asi que tiene
   que dar acceso a toda la oferta academica, no solo a las paginas
   sueltas. */
const MENU_PANEL = {
  /* Cuatro columnas con nombre propio. Antes habia una sola, llamada
     "Inicio", que mezclaba la oferta academica con el resto del sitio.

     areas:true anade bajo la columna los accesos por area. */
  columnas: [
    {
      titulo: 'Estudia en SISE',
      areas: true,
      admision: true,   // anade el subgrupo "Admision" (ADMISION_TIPOS)
      items: [
        { label: 'Carreras semipresenciales',  url: 'carreras-semipresenciales.html' },
        { label: 'Carreras virtuales',         url: 'carreras-virtuales.html' },
        { label: 'Cursos y Especializaciones', url: 'cursos.html' },
        { label: 'Idiomas',                    url: 'idiomas.html' }
      ]
    },
    {
      titulo: 'Conócenos',
      items: [
        { label: 'Home',      url: 'index.html' },
        { label: 'Nosotros',  url: '#' },
        { label: 'Sedes',     url: 'index.html#sedes' },
        { label: 'Blog',      url: 'index.html#novedades' },
        { label: 'Eventos',   url: '#' }
      ]
    },
    {
      titulo: 'Alumnos',
      items: [
        { label: 'Plataforma para alumnos',   url: '#' },
        { label: 'Plataforma para egresados', url: '#' },
        { label: 'Atención al estudiante',    url: '#' }
      ]
    },
    {
      titulo: 'Institucional',
      items: [
        { label: 'Repositorio',            url: '#' },
        { label: 'Bienestar',              url: '#' },
        { label: 'Responsabilidad Social', url: '#' },
        { label: 'Convenios',              url: 'index.html#convenios' },
        { label: 'Acreditación',           url: '#' }
      ]
    }
  ],

  /* Bloque principal de la columna derecha: a este menu entra sobre
     todo gente que quiere postular, no alumnos matriculados. */
  admision: {
    titulo: '¿Listo para empezar?',
    texto: 'Un asesor te orienta y resuelve tus dudas el mismo día.',
    cta: 'Solicitar información',
    url: 'index.html#form'
  },

  /* Soporte a quien ya estudia aqui: util, pero secundario. */
  tarjeta: {
    icono: 'soporte',
    titulo: 'Atención al estudiante',
    cta: 'Contactar',
    url: '#'
  },

  buscador: {
    etiqueta: 'Buscar en SISE',
    placeholder: 'Busca una carrera, curso o idioma',
    vacio: 'No encontramos nada con ese nombre.'
  },

  /* Con etiqueta: antes solo estaba el numero y no se leia como
     algo pulsable ni se sabia a donde llevaba. */
  telefono: { texto: 'Llámanos', dato: '(01) 625 5656', url: 'tel:+5116255656', icono: 'telefono' },
  whatsapp: { texto: 'Escríbenos', dato: '924 298 424', url: 'https://wa.me/51924298424', icono: 'whatsapp' },

  redes: [
    { nombre: 'Facebook',  icono: 'facebook',  url: '#' },
    { nombre: 'Instagram', icono: 'instagram', url: '#' },
    { nombre: 'TikTok',    icono: 'tiktok',    url: '#' },
    { nombre: 'YouTube',   icono: 'youtube',   url: '#' },
    { nombre: 'LinkedIn',  icono: 'linkedin',  url: '#' }
  ]
};

/* ============================================================
   IMÁGENES PARA MÓVIL
   Cualquier entrada con "img" admite además "imgMovil". Si existe,
   se usa por debajo de 820 px de ancho; si no, se usa la de siempre.
   Sirve en: HERO_SLIDES, PORQUE_SLIDES, SEDES, CARRERAS y NOVEDADES.
   En EXPERIENCIAS el campo es "poster" / "posterMovil".

     { img: 'assets/img/hero-01.webp',
       imgMovil: 'assets/img/hero-01-movil.webp', ... }

   Sin "imgMovil" todo sigue funcionando igual que ahora.
   ============================================================ */

/* ---------- 0. BANNER PRINCIPAL ----------
   Cada entrada es una diapositiva del hero. Pasan solas cada 6 s y
   también con los puntos. El formulario no se mueve: se queda fijo.

   img : foto de fondo (horizontal, 2000 px de ancho o más)
   l1  : primera línea del título, en caja normal
   l2  : segunda línea, la del lettering de marcador
   sub : frase de debajo

   Con una sola entrada no aparecen los puntos ni el paso automático.
*/
const HERO_SLIDES = [
  {
    // ?v=2: foto nueva con el mismo nombre; sin esto el navegador
    // seguiria mostrando la anterior que tiene guardada.
    img: 'assets/img/hero-01.webp?v=2',
    imgMovil: 'assets/img/hero-01-movil.webp?v=2',
    l1: 'Se estudia',
    l2: 'Como se vive',
    sub: 'Aquí no se ensaya, no se practica. Se vive.'
  },
  {
    // Sin texto: la imagen ya trae el suyo. Deja l1/l2/sub vacíos para eso.
    img: 'assets/img/hero-02.webp',
    imgMovil: 'assets/img/hero-02-movil.webp',
    // El rotulo va a la izquierda: en movil hay que anclarlo a ese lado
    posMovil: 'left 28%',
    l1: '',
    l2: '',
    sub: ''
  },
  {
    // Pieza de campana de Animacion Digital: tambien trae su texto.
    img: 'assets/img/hero-03.webp',
    imgMovil: 'assets/img/hero-03-movil.webp',
    l1: '',
    l2: '',
    sub: ''
  }
];

/* ---------- 1. CARRERAS ----------
   cat:  gestion | salud | tecnologia | publicidad | banca | diseno |
         hoteleria | ingenieria
   icon: clave de icons.js (los SVG exportados de Figma)

   descripcion: OPCIONAL. Una línea corta bajo el título. Si se deja
                vacía no se pinta: no invento textos de carrera.

   nuevo: OPCIONAL. true la marca como carrera nueva: sale la etiqueta
          "Nuevo" en el menú, en su tarjeta y un punto en "Carreras".
          Quitarlo cuando deje de ser novedad.

   modalidades: en qué formatos se puede estudiar. La duración de cada
   una sale de DURACION_POR_MODALIDAD, así no hay que repetirla en las
   24 carreras. Si alguna dura distinto, se sobreescribe con
   'duraciones' solo en esa carrera:

       modalidades: ['Semipresencial', 'Virtual'],
       duraciones:  { Virtual: '18 meses' }     // opcional
*/

/* Duración estándar de cada modalidad. Cambiar aquí afecta a todas
   las carreras que no la sobreescriban. */
const DURACION_POR_MODALIDAD = {
  'Semipresencial': '3 años',
  'Virtual': '2 años'
};

/* Nombre corto con el que aparece cada modalidad en la tarjeta:
   queda "3 años semi · 2 años virtual". */
const MODALIDAD_CORTA = {
  'Semipresencial': 'semi',
  'Virtual': 'virtual'
};

/* Las áreas y su orden. El filtro de la seccion y el desplegable del
   menú salen los dos de aquí, asi que no pueden desincronizarse. */
const AREAS = [
  { slug: 'gestion',    label: 'Gestión',                        icon: 'area-gestion' },
  { slug: 'tecnologia', label: 'Tecnología de la Información',   icon: 'area-tecnologia' },
  { slug: 'publicidad', label: 'Publicidad',                     icon: 'area-publicidad' },
  { slug: 'salud',      label: 'Salud',                          icon: 'area-salud' },
  { slug: 'banca',      label: 'Banca y Finanzas',               icon: 'area-banca' },
  { slug: 'diseno',     label: 'Diseño',                         icon: 'area-diseno' },
  { slug: 'hoteleria',  label: 'Hotelería y Arte Culinario',     icon: 'area-hoteleria' },
  { slug: 'ingenieria', label: 'Ingeniería',                     icon: 'area-ingenieria' }
];

const CARRERAS = [
  {
    nombre: 'Administración de Empresas (Gestión Administrativa)',
    descripcion: 'Dirige operaciones, equipos y presupuestos.',
    cat: 'gestion',
    modalidades: ['Semipresencial', 'Virtual'],
    img: 'assets/img/carrera-administracion.webp',
    icon: 'administracion',
    url: '#'
  },
  {
    nombre: 'Gestión Logística',
    descripcion: 'Mueve mercadería, almacenes y cadena de suministro.',
    cat: 'gestion',
    modalidades: ['Semipresencial', 'Virtual'],
    img: 'assets/img/carrera-logistica.webp',
    icon: 'logistica',
    url: 'carrera-logistica.html'
  },
  {
    nombre: 'Marketing',
    descripcion: 'Crea campañas y marcas que la gente recuerda.',
    cat: 'gestion',
    nuevo: true,
    modalidades: ['Semipresencial', 'Virtual'],
    img: 'assets/img/carrera-marketing.webp',
    icon: 'marketing',
    url: '#'
  },
  {
    nombre: 'Administración de Negocios Internacionales',
    descripcion: 'Importa, exporta y negocia con el mundo.',
    cat: 'gestion',
    modalidades: ['Semipresencial', 'Virtual'],
    img: 'assets/img/carrera-negocios-internacionales.webp',
    icon: 'negocios-internacionales',
    url: '#'
  },
  {
    nombre: 'Asistencia Administrativa',
    descripcion: 'Organiza la oficina, la agenda y los documentos.',
    cat: 'gestion',
    modalidades: ['Semipresencial', 'Virtual'],
    icon: 'administracion',
    url: '#'
  },
  {
    nombre: 'Administración y Dirección de Negocios',
    descripcion: 'Lidera proyectos y decide con datos.',
    cat: 'gestion',
    modalidades: ['Semipresencial'],
    img: 'assets/img/carrera-direccion-negocios.webp',
    icon: 'direccion-negocios',
    url: '#'
  },
  {
    nombre: 'Recursos Humanos',
    descripcion: 'Atrae, forma y retiene al mejor talento.',
    cat: 'gestion',
    modalidades: ['Semipresencial'],
    img: 'assets/img/carrera-recursos-humanos.webp',
    icon: 'recursos-humanos',
    url: '#'
  },
  {
    nombre: 'Administración de Negocios Bancarios y Financieros',
    descripcion: 'Gestiona productos, riesgo y cartera de clientes.',
    cat: 'banca',
    modalidades: ['Semipresencial', 'Virtual'],
    img: 'assets/img/carrera-administracion-de-negocios-bancarios-y-financieros.webp',
    icon: '',  // pendiente: falta el icono
    url: '#'
  },
  {
    nombre: 'Contabilidad',
    descripcion: 'Lleva libros, tributos y estados financieros.',
    cat: 'banca',
    modalidades: ['Semipresencial', 'Virtual'],
    img: 'assets/img/carrera-contabilidad.webp',
    icon: '',  // pendiente: falta el icono
    url: '#'
  },
  {
    nombre: 'Gestión y Dirección Financiera',
    descripcion: 'Planifica inversiones y controla el presupuesto.',
    cat: 'banca',
    modalidades: ['Semipresencial'],
    img: 'assets/img/carrera-gestion-y-direccion-financiera.webp',
    icon: '',  // pendiente: falta el icono
    url: '#'
  },
  {
    nombre: 'Enfermería Técnica',
    descripcion: 'Cuida y asiste al paciente junto al equipo médico.',
    cat: 'salud',
    modalidades: ['Semipresencial'],
    img: 'assets/img/carrera-enfermeria-tecnica.webp',
    icon: 'enfermeria',
    url: '#'
  },
  {
    nombre: 'Fisioterapia y Rehabilitación',
    descripcion: 'Recupera la movilidad con terapia y ejercicio.',
    cat: 'salud',
    modalidades: ['Semipresencial'],
    img: 'assets/img/carrera-fisioterapia-y-rehabilitacion.webp',
    icon: '',  // pendiente: falta el icono
    url: '#'
  },
  {
    nombre: 'Farmacia Técnica',
    descripcion: 'Dispensa, controla y orienta sobre medicamentos.',
    cat: 'salud',
    modalidades: ['Semipresencial'],
    img: 'assets/img/carrera-farmacia-tecnica.webp',
    icon: '',  // pendiente: falta el icono
    url: '#'
  },
  {
    nombre: 'Ciberseguridad',
    descripcion: 'Protege redes, datos y sistemas de ataques.',
    cat: 'tecnologia',
    modalidades: ['Semipresencial'],
    img: 'assets/img/carrera-ciberseguridad.webp',
    icon: '',  // pendiente: falta el icono
    url: '#'
  },
  {
    nombre: 'Desarrollo de Sistemas de Información',
    descripcion: 'Programa aplicaciones y bases de datos a medida.',
    cat: 'tecnologia',
    modalidades: ['Semipresencial', 'Virtual'],
    img: 'assets/img/carrera-desarrollo-de-sistemas-de-informacion.webp',
    icon: '',  // pendiente: falta el icono
    url: '#'
  },
  {
    nombre: 'Redes y Seguridad Informática',
    descripcion: 'Instala y protege las redes de una empresa.',
    cat: 'tecnologia',
    modalidades: ['Virtual'],
    icon: '',
    url: '#'
  },
  {
    nombre: 'Comunicación Audiovisual',
    descripcion: 'Graba, edita y produce contenido audiovisual.',
    cat: 'publicidad',
    modalidades: ['Semipresencial', 'Virtual'],
    img: 'assets/img/carrera-comunicacion-audiovisual.webp',
    icon: '',  // pendiente: falta el icono
    url: '#'
  },
  {
    nombre: 'Diseño Gráfico',
    descripcion: 'Construye identidad visual, piezas y marcas.',
    cat: 'publicidad',
    modalidades: ['Semipresencial', 'Virtual'],
    img: 'assets/img/carrera-diseno-grafico.webp',
    icon: '',  // pendiente: falta el icono
    url: '#'
  },
  {
    nombre: 'Publicidad y Medios Digitales',
    descripcion: 'Planifica campañas y pauta en medios digitales.',
    cat: 'publicidad',
    modalidades: ['Semipresencial'],
    img: 'assets/img/carrera-publicidad-y-medios-digitales.webp',
    icon: '',  // pendiente: falta el icono
    url: '#'
  },
  {
    nombre: 'Dirección de Diseño Gráfico Publicitario',
    descripcion: 'Lidera el concepto creativo de una campaña.',
    cat: 'publicidad',
    modalidades: ['Semipresencial'],
    img: 'assets/img/carrera-direccion-de-diseno-grafico-publicitario.webp',
    icon: '',  // pendiente: falta el icono
    url: '#'
  },
  {
    nombre: 'Diseño de Interiores',
    descripcion: 'Proyecta y ambienta espacios habitables.',
    cat: 'diseno',
    modalidades: ['Semipresencial'],
    img: 'assets/img/carrera-diseno-de-interiores.webp',
    icon: '',  // pendiente: falta el icono
    url: '#'
  },
  {
    nombre: 'Diseño de Modas',
    descripcion: 'Diseña, patrona y confecciona colecciones.',
    cat: 'diseno',
    modalidades: ['Semipresencial'],
    img: 'assets/img/carrera-diseno-de-modas.webp',
    icon: '',  // pendiente: falta el icono
    url: '#'
  },
  {
    nombre: 'Gastronomía',
    descripcion: 'Cocina, gestiona carta y dirige una cocina.',
    cat: 'hoteleria',
    modalidades: ['Semipresencial'],
    img: 'assets/img/carrera-gastronomia.webp',
    icon: '',  // pendiente: falta el icono
    url: '#'
  },
  {
    nombre: 'Administración de Hoteles y Restaurantes',
    descripcion: 'Opera hoteles y restaurantes de punta a punta.',
    cat: 'hoteleria',
    modalidades: ['Semipresencial'],
    img: 'assets/img/carrera-administracion-de-hoteles-y-restaurantes.webp',
    icon: '',  // pendiente: falta el icono
    url: '#'
  },
  {
    nombre: 'Administración Industrial',
    descripcion: 'Optimiza producción, calidad y procesos de planta.',
    cat: 'ingenieria',
    modalidades: ['Semipresencial'],
    img: 'assets/img/carrera-administracion-industrial.webp',
    icon: '',  // pendiente: falta el icono
    url: '#'
  },
  {
    nombre: 'Seguridad y Prevención de Riesgos',
    descripcion: 'Previene accidentes y audita seguridad laboral.',
    cat: 'ingenieria',
    modalidades: ['Semipresencial'],
    img: 'assets/img/carrera-seguridad-y-prevencion-de-riesgos.webp',
    icon: '',  // pendiente: falta el icono
    url: '#'
  }
];

/* ---------- 2. SEDES ----------
   Al hacer clic en una sede se cambia la foto de fondo de la sección.
   PENDIENTE: faltan las fotos de San Juan de Lurigancho, San Miguel,
   Comas y Puente Piedra (siguen con los .webp antiguos de baja calidad).
*/
/* Orden de los chips de zona de la sección de sedes */
const ZONAS_SEDE = ['Lima Norte', 'Lima Centro', 'Lima Sur', 'Lima Este', 'Callao'];

const SEDES = [
  { nombre: 'San Juan de Miraflores', dir: 'Av. San Juan 779',                                                    zona: 'Lima Sur', img: 'assets/img/sede-sjm.webp' },
  { nombre: 'San Juan de Lurigancho', dir: 'Calle Los Lirios, Esq. con Calle las Hobeas - Urb. San Silvestre',     zona: 'Lima Este', img: 'assets/img/sede_SJL.webp' },
  { nombre: 'San Miguel',             dir: 'Jr. Federico Gallese 647, Av. La Marina 1453',                        zona: 'Lima Centro', img: 'assets/img/sede_SAN-MIGUEL.webp' },
  { nombre: 'Comas',                  dir: 'Av. Universitaria 7085, Av. Universitaria 1240',                      zona: 'Lima Norte', img: 'assets/img/sede_COMAS.webp' },
  { nombre: 'Puente Piedra',          dir: 'Av. Santa Rosa 398, Calle la Victoria 509',                           zona: 'Lima Norte', img: 'assets/img/sede_PUENTE-PIEDRA.webp' },
  { nombre: 'Villa El Salvador',      dir: 'Av. Pachacútec Mz. 3, Lote 01',                                       zona: 'Lima Sur', img: 'assets/img/sede-ves.webp' },
  { nombre: 'Independencia',          dir: 'Av. Industrial 3728',                                                 zona: 'Lima Norte', img: 'assets/img/sede-independencia.webp' },
  { nombre: 'Ventanilla',             dir: 'Calle 11, Mz. C1 Lote 06',                                            zona: 'Callao', img: 'assets/img/sede-ventanilla.webp' },
  { nombre: 'Surco',                  dir: 'Av. Tomás Marsano 4847',                                              zona: 'Lima Centro', img: 'assets/img/sede-surco.webp' },
  { nombre: 'Ate',                    dir: 'Carretera Central km 9.2',                                            zona: 'Lima Este', img: 'assets/img/sede-ate.webp' },
  { nombre: 'Santa Beatriz',          dir: 'Av. Arequipa 1290, Lima',                                             zona: 'Lima Centro', img: 'assets/img/sede-santa-beatriz.webp' },
  { nombre: 'Miraflores',             dir: 'Calle Cantuarias 385',                                                zona: 'Lima Centro', img: 'assets/img/sede-miraflores.webp' }
];

/* Sede que se muestra al abrir. Va por nombre y no por indice para que
   reordenar el array de arriba no cambie cual sale por defecto. */
const SEDE_INICIAL = 'Santa Beatriz';

/* Contacto que se pinta en la ficha de cada sede.
   OJO: por ahora es el horario general del instituto, el mismo del pie
   de pagina. En cuanto una sede tenga el suyo propio, se le añade
   "horario" a su entrada de SEDES y ese manda sobre este. */
const SEDE_CONTACTO = {
  horario: [
    'Lunes a viernes de 8:00 am a 9:00 pm',
    'Sábados de 9:00 am a 6:00 pm'
  ]
};

/* ---------- 3. NUESTROS ESPACIOS ("¿Por qué elegir SISE?") ----------
   Carrusel horizontal de arrastre. Cada entrada es una tarjeta
   vertical con la foto y el nombre en una píldora.

   img      : recorte horizontal (queda de reserva, hoy no se pinta)
   imgMovil : recorte vertical 896x1200. ES EL QUE SE USA, en móvil y
              en escritorio: la tarjeta es vertical en las dos.
   titulo   : el texto de la píldora. Corto, sin HTML.
*/
const PORQUE_SLIDES = [
  {
    img: 'assets/img/porque-sise-1.webp',
    imgMovil: 'assets/img/porque-sise-1-movil.webp',
    titulo: 'Aulas equipadas',
    // No va en el carril de "Por que elegir SISE": solo laboratorios
    enPorque: false,
    texto: 'Ambientes modernos y cómodos para tus clases del día a día.'
  },
  {
    img: 'assets/img/porque-sise-02.webp',
    imgMovil: 'assets/img/porque-sise-02-movil.webp',
    titulo: 'Laboratorio de Mac',
    texto: 'Equipos Apple de última generación para diseño, edición y desarrollo.'
  },
  {
    img: 'assets/img/porque-sise-03.webp',
    imgMovil: 'assets/img/porque-sise-03-movil.webp',
    titulo: 'Laboratorio gastronómico',
    texto: 'Cocina profesional equipada para cocinar como en un restaurante real.'
  },
  {
    img: 'assets/img/porque-sise-04.webp',
    imgMovil: 'assets/img/porque-sise-04-movil.webp',
    titulo: 'Laboratorio de diseño gráfico',
    texto: 'Estaciones de alto rendimiento con monitores calibrados para creativos.'
  },
  {
    img: 'assets/img/porque-sise-05.webp',
    imgMovil: 'assets/img/porque-sise-05-movil.webp',
    titulo: 'Housekeeping',
    texto: 'Habitación-modelo para dominar los estándares reales de la hotelería.'
  }
];

/* Compatibilidad con el nombre anterior */
const PORQUE_IMGS = PORQUE_SLIDES;

/* ---------- 4. EXPERIENCIAS REALES (YouTube Shorts) ----------
   ytid: el identificador del Short.
   https://youtube.com/shorts/8NlgHDDVY2E  ->  ytid: '8NlgHDDVY2E'

   OJO con el formato: la maqueta es 9:16 y la portada se pide a "oar2",
   que es el fotograma vertical. Un video normal (watch?v=) NO tiene esa
   variante: devuelve 404 y la tarjeta se queda en negro. Para meter uno
   horizontal habria que pedir "maxresdefault" y cambiar la proporcion.
   Y no vale con "oardefault": hay Shorts para los que devuelve un
   marcador gris de 120x90 en vez del fotograma.

   titulo: el titulo del Short en YouTube. Va a mano porque el endpoint
   de oEmbed no manda cabecera CORS y el navegador no lo puede pedir.
   Se pinta sobre la portada y ademas es la etiqueta del boton.
   Para consultarlo sin entrar a YouTube:
   https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=ID&format=json

   poster: OPCIONAL. Solo si el fotograma de YouTube sale mal. Vertical.
*/
const EXPERIENCIAS = [
  {
    ytid: '-eFUfCDzb_U',
    titulo: 'Talent Week SISE: conectamos tu talento con nuevas oportunidades'
  },
  {
    ytid: 'yyr3EwjwA-M',
    titulo: 'Estudia Gastronomía en SISE'
  },
  {
    ytid: '8NlgHDDVY2E',
    titulo: 'Feria de carreras SISE'
  }
];

/* ---------- 5. NOVEDADES ---------- */
const NOVEDADES = {
  blog: [
    { img: 'assets/img/blog-card.webp', titulo: '¡SISE ahora es Escuela!', extracto: 'Ya puedes obtener tu grado de bachiller equivalente al universitario.', tag: 'Marketing', url: '#' },
    { img: 'assets/img/blog-card.webp', titulo: '¡SISE ahora es Escuela!', extracto: 'Ya puedes obtener tu grado de bachiller equivalente al universitario.', tag: 'Administración Logística', url: '#' },
    { img: 'assets/img/blog-card.webp', titulo: '¡SISE ahora es Escuela!', extracto: 'Ya puedes obtener tu grado de bachiller equivalente al universitario.', tag: 'Enfermería', url: '#' },
    { img: 'assets/img/blog-card.webp', titulo: '¡SISE ahora es Escuela!', extracto: 'Ya puedes obtener tu grado de bachiller equivalente al universitario.', tag: 'Recursos Humanos', url: '#' }
  ],
  eventos: [
    { img: 'assets/img/blog-card.webp', titulo: 'Feria Laboral SISE 2026', extracto: 'Más de 30 empresas aliadas en un solo lugar. Trae tu CV y postula el mismo día.', tag: 'Empleabilidad', url: '#' },
    { img: 'assets/img/blog-card.webp', titulo: 'Open Day: Conoce tu sede', extracto: 'Recorre nuestros talleres y laboratorios antes de elegir tu carrera.', tag: 'Admisión', url: '#' },
    { img: 'assets/img/blog-card.webp', titulo: 'Semana de la Innovación', extracto: 'Charlas, retos y demos de proyectos creados por nuestros estudiantes.', tag: 'Tecnología', url: '#' },
    { img: 'assets/img/blog-card.webp', titulo: 'Concurso Gastronómico', extracto: 'Nuestros alumnos compiten con platos de autor frente a un jurado profesional.', tag: 'Gastronomía', url: '#' }
  ]
};

/* ---------- 6. MENÚ PRINCIPAL ----------
   Los ítems con "items" abren un dropdown. Edita libremente:
   quita "items" y queda como enlace simple.
   TODO: confirmar los enlaces reales de cada submenú.
*/
/* ---------- 2b. CURSOS Y ESPECIALIZACIONES ----------
   Mismo patrón que CARRERAS: el desplegable del menú se arma solo
   agrupando CURSOS por AREAS_CURSOS, en este orden. Añadir un curso
   aquí lo hace aparecer en el menu sin tocar nada más. */
/* ---------- CATALOGO DE CURSOS ----------
   Cada curso admite, ademas de nombre/img/cat/url:
     horas:  duracion, en numero (16 -> "16 horas")
     precio: precio actual, en soles
     antes:  precio tachado, si esta en oferta
     resumen: su propio texto
   Mientras no esten, la tarjeta se adapta: sin horas no pinta el reloj
   y sin precio pone "Consultar precio".

   Texto de apoyo de la tarjeta. Mientras no haya uno propio por curso,
   se usa el de su area: cada curso admite "resumen" y, si lo trae,
   manda sobre este. PROVISIONAL: reemplazar por el texto real. */
const RESUMEN_AREA_CURSOS = {
  'office':      'Domina las herramientas de oficina que piden hoy las empresas.',
  'negocios':    'Herramientas de gestión para vender, administrar y decidir mejor.',
  'gastronomia': 'Técnica de cocina y pastelería con práctica en taller.',
  'diseno-com':  'Diseño y comunicación para proyectos reales, de la idea al entregable.',
  'salud':       'Formación técnica para el cuidado y la atención del paciente.',
  'tecnologia':  'Tecnología aplicada: datos, redes y desarrollo con enfoque práctico.',
  'ingenieria':  'Procesos, seguridad y gestión aplicados a la industria.',
  'modas':       'Confección y diseño de moda con práctica en taller.'
};

/* La portada del catalogo y el carrito */
const TIENDA_CURSOS = {
  titulo: 'Suma una habilidad',
  destacado: 'este ciclo',
  texto: 'Cursos cortos y especializaciones con práctica desde la primera sesión. Elige por área y arma tu propia ruta.',
  cta: 'Ver el catálogo',
  cta2: 'Hablar con un asesor',
  urlCta2: 'https://wa.link/zgq8zu',
  img: 'assets/img/cursos-hero.webp',
  imgMovil: 'assets/img/cursos-hero-movil.webp',
  carrito: {
    titulo: 'Tu selección',
    vacio: 'Todavía no has añadido ningún curso.',
    cta: 'Enviar por WhatsApp',
    url: 'https://wa.link/zgq8zu'
  }
};

const AREAS_CURSOS = [
  { slug: 'office',     label: 'Office',                   icon: 'area-office' },
  { slug: 'negocios',   label: 'Negocios',                 icon: 'area-gestion' },
  { slug: 'gastronomia',label: 'Gastronomía',              icon: 'area-hoteleria' },
  { slug: 'diseno-com', label: 'Diseño y Comunicaciones',  icon: 'area-diseno' },
  { slug: 'salud',      label: 'Salud',                    icon: 'area-salud' },
  { slug: 'tecnologia', label: 'Tecnología',               icon: 'area-tecnologia' },
  { slug: 'ingenieria', label: 'Ingeniería',               icon: 'area-ingenieria' },
  { slug: 'modas',      label: 'Modas',                    icon: 'area-modas' }
];

const CURSOS = [
  { nombre: 'Especialista en Excel',                       img: 'assets/img/curso-especialista-en-excel.webp', cat: 'office',      url: '#',
    resumen: 'Fórmulas, tablas dinámicas y automatización para trabajar más rápido con datos.' },
  { nombre: 'Especialista en Office',                      img: 'assets/img/curso-especialista-en-office.webp', cat: 'office',      url: '#',
    resumen: 'Word, Excel y PowerPoint al nivel que piden las oficinas.' },

  { nombre: 'Asistente Contable',                          img: 'assets/img/curso-asistente-contable.webp', cat: 'negocios',    url: '#',
    resumen: 'Registro de operaciones, libros y apoyo en el cierre contable del mes.' },
  { nombre: 'Asistente de Gerencia',                       img: 'assets/img/curso-asistente-de-gerencia.webp', cat: 'negocios',    url: '#',
    resumen: 'Agenda, documentos y coordinación para sostener el día a día de una gerencia.' },
  { nombre: 'Asistente de Logística',                      img: 'assets/img/curso-asistente-de-logistica.webp', cat: 'negocios',    url: '#',
    resumen: 'Control de stock, órdenes de compra y seguimiento de despachos.' },
  { nombre: 'Asistente de Planillas',                      img: 'assets/img/curso-asistente-de-planillas.webp', cat: 'negocios',    url: '#',
    resumen: 'Cálculo de sueldos, beneficios sociales y aportes al día.' },
  { nombre: 'Cajero Financiero y Comercial',               img: 'assets/img/curso-cajero-financiero-y-comercial.webp', cat: 'negocios',    url: '#',
    resumen: 'Manejo de caja, arqueos y atención en ventanilla de banca y comercio.' },
  { nombre: 'Inversión en Bolsa',                          img: 'assets/img/curso-inversion-en-bolsa.webp', cat: 'negocios',    url: '#',
    resumen: 'Cómo funciona el mercado, qué instrumentos hay y cómo leer el riesgo.' },
  { nombre: 'IA para Negocios',                            img: 'assets/img/curso-ia-para-negocios.webp', cat: 'negocios',    url: '#',
    resumen: 'Herramientas de inteligencia artificial aplicadas a tareas reales de la empresa.' },
  { nombre: 'Gestión Tributaria Inteligente con IA',       img: 'assets/img/curso-gestion-tributaria-inteligente-con-ia.webp', cat: 'negocios',    url: '#',
    resumen: 'Obligaciones tributarias y declaraciones, con apoyo de herramientas de IA.' },
  { nombre: 'Aprende a importar de China y del mundo',     img: 'assets/img/curso-aprende-a-importar-de-china-y-del-mundo.webp', cat: 'negocios',    url: '#',
    resumen: 'Proveedores, costos, aduanas y el paso a paso de una importación.' },

  { nombre: 'Coctelería',                                  img: 'assets/img/curso-cocteleria.webp', cat: 'gastronomia', url: '#',
    resumen: 'Clásicos de la coctelería, técnicas de preparación y montaje de barra.' },
  { nombre: 'Bartender Professional',                      img: 'assets/img/curso-bartender-professional.webp', cat: 'gastronomia', url: '#',
    resumen: 'Servicio de barra, coctelería de autor y trato con el cliente.' },
  { nombre: 'Pastelería',                                  img: 'assets/img/curso-pasteleria.webp', cat: 'gastronomia', url: '#',
    resumen: 'Masas, cremas y decoración para postres de carta y de venta.' },
  { nombre: 'Cocina Peruana',                              img: 'assets/img/curso-cocina-peruana.webp', cat: 'gastronomia', url: '#',
    resumen: 'Los platos de siempre: fondos, guisos, cebiches y criollos.' },
  { nombre: 'Pescados y Mariscos',                         img: 'assets/img/curso-pescados-y-mariscos.webp', cat: 'gastronomia', url: '#',
    resumen: 'Selección, corte y cocción de los productos del mar.' },
  { nombre: 'Panadería',                                   img: 'assets/img/curso-panaderia.webp', cat: 'gastronomia', url: '#',
    resumen: 'Masas, fermentación y horneado de panes de consumo diario.' },

  { nombre: 'Diseño Gráfico',                              img: 'assets/img/curso-diseno-grafico.webp', cat: 'diseno-com',  url: '#',
    resumen: 'Composición, color y tipografía con las herramientas que usa el mercado.' },
  { nombre: 'Edición y postproducción de video',          img: 'assets/img/curso-edicion-y-postproduccion-de-video.webp', cat: 'diseno-com',  url: '#',
    resumen: 'Montaje, color y sonido para dejar un video listo para publicar.' },
  { nombre: 'Diseño Web',                                  img: 'assets/img/curso-diseno-web.webp', cat: 'diseno-com',  url: '#',
    resumen: 'Maquetación y diseño de páginas pensadas para verse bien en el celular.' },
  { nombre: 'Marketing Digital',                           img: 'assets/img/curso-marketing-digital.webp', cat: 'diseno-com',  url: '#',
    resumen: 'Campañas, redes y medición de resultados con presupuesto real.' },
  { nombre: 'Fotografía Profesional',                      img: 'assets/img/curso-fotografia-profesional.webp', cat: 'diseno-com',  url: '#',
    resumen: 'Cámara, luz y encuadre para foto de producto, retrato y evento.' },
  { nombre: 'Diseño en Autocad',                           img: 'assets/img/curso-diseno-en-autocad.webp', cat: 'diseno-com',  url: '#',
    resumen: 'Dibujo técnico en 2D y planos listos para obra.' },
  { nombre: 'Creación de contenido en plataformas Digitales', img: 'assets/img/curso-creacion-de-contenido-en-plataformas-digitales.webp', cat: 'diseno-com', url: '#',
    resumen: 'Idea, graba y edita contenido para redes con el celular.' },

  { nombre: 'Nutrición saludable, dietética y Deportiva',  img: 'assets/img/curso-nutricion-saludable-dietetica-y-deportiva.webp', cat: 'salud',       url: '#',
    resumen: 'Alimentación equilibrada y pautas para acompañar la actividad física.' },
  { nombre: 'Primeros Auxilios',                           img: 'assets/img/curso-primeros-auxilios.webp', cat: 'salud',       url: '#',
    resumen: 'Qué hacer en los primeros minutos de una emergencia.' },
  { nombre: 'Inyectoterapia',                              img: 'assets/img/curso-inyectoterapia.webp', cat: 'salud',       url: '#',
    resumen: 'Vías de administración, bioseguridad y técnica de aplicación.' },
  { nombre: 'Administración Endovenosa de Vitamina C',     img: 'assets/img/curso-administracion-endovenosa-de-vitamina-c.webp', cat: 'salud',       url: '#',
    resumen: 'Preparación, bioseguridad y técnica de la aplicación endovenosa.' },

  { nombre: 'Especialista en Power Bi',                    img: 'assets/img/curso-especialista-en-power-bi.webp', cat: 'tecnologia',  url: '#',
    resumen: 'Conecta datos, arma tableros y presenta resultados que se entienden.' },
  { nombre: 'Ciberseguridad',                              img: 'assets/img/curso-ciberseguridad.webp', cat: 'tecnologia',  url: '#',
    resumen: 'Amenazas frecuentes, buenas prácticas y cómo proteger la información.' },
  { nombre: 'Programación desde cero',                     img: 'assets/img/curso-programacion-desde-cero.webp', cat: 'tecnologia',  url: '#',
    resumen: 'Lógica, primeros programas y bases para seguir aprendiendo por tu cuenta.' },

  { nombre: 'Ensamblaje y Reparación de Equipos de Cómputo', img: 'assets/img/curso-ensamblaje-y-reparacion-de-equipos-de-computo.webp', cat: 'ingenieria', url: '#',
    resumen: 'Arma, diagnostica y repara computadoras y sus componentes.' },

  { nombre: 'Patronaje y confección',                      img: 'assets/img/curso-patronaje-y-confeccion.webp', cat: 'modas',       url: '#',
    resumen: 'Del molde a la prenda terminada: medidas, corte y costura.' }
];

/* ---------- 2c. IDIOMAS ----------
   Una sola área con sus idiomas. Mismo patrón auto, pero al ser un
   único grupo el menú lo pinta compacto (una columna) en vez del
   panel ancho. */
const AREAS_IDIOMAS = [
  { slug: 'idiomas', label: 'Idiomas', icon: 'area-idiomas' }
];

const IDIOMAS_CURSO = [
  { nombre: 'Inglés',           cat: 'idiomas', url: '#' },
  { nombre: 'Lengua de señas',  cat: 'idiomas', url: '#' }
];

/* ---------- ESCUELA ----------
   Los programas con grado de bachiller, los mismos que anuncia la
   tarjeta "Escuela" del inicio. Comparten el icono de Idiomas hasta
   que haya uno propio. */
const AREAS_ESCUELA = [
  { slug: 'escuela', label: 'Escuela', icon: 'area-idiomas' }
];

const ESCUELA = [
  { nombre: 'Dirección de Diseño Gráfico Publicitario', cat: 'escuela', url: '#' },
  { nombre: 'Administración y Dirección de Negocios',   cat: 'escuela', url: '#' },
  { nombre: 'Gestión y Dirección Financiera',           cat: 'escuela', url: '#' }
];

/* ---------- ADMISION ----------
   Mismo formato que Escuela: alimenta el panel "Admision" del menu y el
   subgrupo del mismo nombre en la hamburguesa, asi que se edita aqui. */
const AREAS_ADMISION = [
  { slug: 'admision', label: 'Admisión', icon: 'matricula' }
];

const ADMISION_TIPOS = [
  { nombre: 'Admisión Regular', cat: 'admision', url: '#' },
  { nombre: 'Traslados',        cat: 'admision', url: '#' },
  { nombre: 'Reingresantes',    cat: 'admision', url: '#' }
];

const MENU = [
  {
    label: 'Carreras',
    url: '#carreras',
    /* Se arma solo a partir de CARRERAS y AREAS: al añadir una carrera
       arriba aparece aquí sin tocar nada más. */
    auto: 'carreras',
    cta: { label: 'Ver todas las carreras', url: '#carreras' }
  },
  {
    label: 'Cursos y Especializaciones',
    url: '#',
    auto: 'cursos',
    cta: { label: 'Ver toda la oferta', url: '#' }
  },
  {
    label: 'Escuela',
    url: '#',
    auto: 'escuela'
  },
  {
    label: 'Admisión',
    url: '#',
    auto: 'admision'
  },
  { label: '¿Por qué SISE?', url: '#porque' }
];
/* ============================================================
   10. CRM — envio del formulario de informes
   ============================================================
   El formulario manda a Smart Sales, que no entiende los nombres
   que se ven en pantalla sino sus codigos. Aqui viven las
   equivalencias y los datos fijos de la campaña; el guion
   (crm.js) solo traduce y envia.
   ------------------------------------------------------------ */
const CRM = {
  /* A donde va el lead */
  url: 'https://smartsalessise.sise.edu.pe/rest_api/add_informe2',
  origen: 'https://smartsalessise.sise.edu.pe/',
  plantilla: 'sise_lead_bridge_from_origin',

  /* Datos fijos de campaña. Los rellena marketing segun el
     periodo; en blanco viajan vacios y el CRM los da por
     ausentes, que es lo que hacia la plantilla anterior. */
  evento: '',
  fuente: '',
  periodo: '',
  detalleFuente: '',
  motivo: '01',

  /* Cuanto se espera al servidor antes de dar el envio por
     fallido, en milisegundos. */
  espera: 12000,

  /* Lo que se ve en el panel de confirmacion */
  cargando: 'Enviando tu solicitud...',
  /* Cuanto se queda el agradecimiento antes de recogerse y dejar el
     formulario listo otra vez, en milisegundos. En 0 se queda puesto. */
  graciasDura: 10000,
  gracias: {
    titulo: '¡Gracias por registrarte!',
    texto: 'Un asistente se pondrá en contacto contigo.'
  },
  error: {
    titulo: 'No pudimos enviar tu solicitud',
    texto: 'Revisa tu conexión e inténtalo otra vez, o escríbenos por WhatsApp.',
    boton: 'Intentar de nuevo'
  }
};

/* Carrera de la web -> codigo de producto del CRM.
   prgs = semipresencial, cpex = virtual. Vacio quiere decir que
   esa carrera no se ofrece en esa modalidad.

   PENDIENTE DE CONFIRMAR con Smart Sales: las tres que van con
   codigo vacio en las dos columnas no aparecen en las tablas que
   nos pasaron. Mientras no esten, el lead se envia igual pero sin
   producto, para no perderlo. */
const CRM_CARRERAS = {
  'Administración de Empresas (Gestión Administrativa)': { prgs: 'ADMNE', cpex: 'CPEAD' },
  'Gestión Logística':                                   { prgs: 'ADMLO', cpex: 'CPEAL' },
  'Marketing':                                           { prgs: 'MARKT', cpex: 'CPEMK' },
  'Administración de Negocios Internacionales':          { prgs: 'ADMNI', cpex: 'CPENI' },
  'Asistencia Administrativa':                           { prgs: 'SECRE', cpex: 'CPAAD' },
  'Administración y Dirección de Negocios':              { prgs: '',      cpex: '' },
  'Recursos Humanos':                                    { prgs: '',      cpex: 'GEHUM' },
  'Administración de Negocios Bancarios y Financieros':  { prgs: 'ADMBF', cpex: 'CPEAB' },
  'Contabilidad':                                        { prgs: 'CONTA', cpex: 'CPECO' },
  'Gestión y Dirección Financiera':                      { prgs: '',      cpex: '' },
  'Enfermería Técnica':                                  { prgs: 'SALUD', cpex: '' },
  'Fisioterapia y Rehabilitación':                       { prgs: 'FISIO', cpex: '' },
  'Farmacia Técnica':                                    { prgs: 'TECFA', cpex: '' },
  'Ciberseguridad':                                      { prgs: 'CIBER', cpex: 'CPCIB' },
  'Desarrollo de Sistemas de Información':               { prgs: 'SWSIS', cpex: 'CPSYS' },
  'Redes y Seguridad Informática':                       { prgs: 'REDES', cpex: 'CPRYS' },
  'Comunicación Audiovisual':                            { prgs: 'COMAU', cpex: 'CPCOA' },
  'Diseño Gráfico':                                      { prgs: 'DG',    cpex: 'CPDG'  },
  'Publicidad y Medios Digitales':                       { prgs: 'PUMD',  cpex: 'CPPMD' },
  'Dirección de Diseño Gráfico Publicitario':            { prgs: '',      cpex: '' },
  'Diseño de Interiores':                                { prgs: 'DISIN', cpex: '' },
  'Diseño de Modas':                                     { prgs: 'DYGMO', cpex: '' },
  'Gastronomía':                                         { prgs: 'GASTR', cpex: '' },
  'Administración de Hoteles y Restaurantes':            { prgs: 'ADHYR', cpex: '' },
  'Administración Industrial':                           { prgs: 'PRIND', cpex: '' },
  'Seguridad y Prevención de Riesgos':                   { prgs: 'SSTMA', cpex: '' }
};

/* Sede de la web -> codigo del CRM. Se busca sin tildes y en
   mayusculas, asi que "Ate" encuentra "SEDE ATE". */
const CRM_SEDES = {
  'SEDE ATE': 'ATE',
  'SEDE INDEPENDENCIA': 'INDEP',
  'SEDE MIRAFLORES': 'CANTU',
  'SEDE SAN JUAN DE LURIGANCHO': 'SJL',
  'SEDE SAN JUAN DE MIRAFLORES': 'SJM',
  'SEDE SANTA BEATRIZ': 'STABE',
  'SEDE SURCO': 'SURCO',
  'SEDE VENTANILLA': 'VENTN',
  'SEDE VILLA EL SALVADOR': 'VILLA',
  'SEDE COMAS': 'COM',
  'SEDE PUENTE PIEDRA': 'PTP',
  'SEDE SAN MIGUEL': 'SM',
  'VIRTUAL': 'VIRTU'
};

/* Distrito -> codigo de ubicacion geografica. El formulario aun no
   pregunta el distrito; la tabla queda lista para cuando lo haga. */
const CRM_DISTRITOS = {
  'ANCON': '1283', 'ATE VITARTE': '1284', 'BARRANCO': '1285', 'BRENA': '1286',
  'CARABAYLLO': '1287', 'CERCADO DE LIMA': '1282', 'CHACLACAYO': '1288',
  'CHORRILLOS': '1289', 'CIENEGUILLA': '1290', 'COMAS': '1291',
  'EL AGUSTINO': '1292', 'INDEPENDENCIA': '1293', 'JESUS MARIA': '1294',
  'LA MOLINA': '1295', 'LA VICTORIA': '1296', 'LINCE': '1297',
  'LOS OLIVOS': '1298', 'LURIGANCHO': '1299', 'LURIN': '1300',
  'MAGDALENA': '1301', 'PUEBLO LIBRE': '1302', 'MIRAFLORES': '1303',
  'PACHACAMAC': '1304', 'PUCUSANA': '1305', 'PUENTE PIEDRA': '1306',
  'PUNTA HERMOSA': '1307', 'PUNTA NEGRA': '1308', 'RIMAC': '1309',
  'SAN BARTOLO': '1310', 'SAN BORJA': '1311', 'SAN ISIDRO': '1312',
  'SAN JUAN DE LURIGANCHO': '1313', 'SAN JUAN DE MIRAFLORES': '1314',
  'SAN LUIS': '1315', 'SAN MARTIN DE PORRES': '1316', 'SAN MIGUEL': '1317',
  'SANTA ANITA': '1318', 'SANTA ROSA': '1320', 'SANTIAGO DE SURCO': '1321',
  'SURQUILLO': '1322', 'VILLA EL SALVADOR': '1323',
  'VILLA MARIA DEL TRIUNFO': '1324', 'CALLAO': '691'
};
/* ============================================================
   11. PORTAL DE TRANSPARENCIA
   ============================================================
   Los documentos de informacion publica, agrupados por tipo.
   Para publicar uno nuevo basta con añadir su linea aqui y subir
   el archivo a assets/docs/.

   tipo: pdf, doc o xls. Decide el color y el rotulo de la hoja.

   fecha: en formato de maquina -AAAA, AAAA-MM o AAAA-MM-DD-, que es
   lo que permite ordenar por mas reciente. La pagina la escribe en
   castellano sola: 2026-03 sale como "Marzo 2026".

   peso es opcional; si falta, la tarjeta no lo pinta.

   OJO: los documentos de abajo son de ejemplo, para ver la pagina
   funcionando. Hay que reemplazarlos por los de verdad.
   ------------------------------------------------------------ */
const TRANSPARENCIA = {
  categorias: [
    { slug: 'comunicados',    label: 'Comunicados' },
    { slug: 'licenciamiento', label: 'Licenciamiento' },
    { slug: 'politicas',      label: 'Pol\u00edticas y reglamento' },
    { slug: 'manuales',       label: 'Manuales' },
    { slug: 'tarifarios',     label: 'Tarifarios' }
  ],

  documentos: [
    { nombre: 'Comunicado de inicio de ciclo', cat: 'comunicados', tipo: 'pdf', url: '#', fecha: '2026-03' },
    { nombre: 'Comunicado de matr\u00edcula',       cat: 'comunicados', tipo: 'pdf', url: '#', fecha: '2026-01' },

    { nombre: 'Resoluci\u00f3n de licenciamiento',  cat: 'licenciamiento', tipo: 'pdf', url: '#', fecha: '2024' },
    { nombre: 'Condiciones b\u00e1sicas de calidad', cat: 'licenciamiento', tipo: 'pdf', url: '#', fecha: '2024' },

    { nombre: 'Reglamento institucional',      cat: 'politicas', tipo: 'pdf', url: '#', fecha: '2025' },
    { nombre: 'Reglamento del estudiante',     cat: 'politicas', tipo: 'pdf', url: '#', fecha: '2025' },
    { nombre: 'Pol\u00edtica de protecci\u00f3n de datos', cat: 'politicas', tipo: 'pdf', url: 'politica-de-privacidad.html', fecha: '2025-11' },

    { nombre: 'Manual de organizaci\u00f3n y funciones', cat: 'manuales', tipo: 'pdf', url: '#', fecha: '2025' },
    { nombre: 'Manual del aula virtual',       cat: 'manuales', tipo: 'pdf', url: '#', fecha: '2025' },

    { nombre: 'Tarifario de servicios educativos', cat: 'tarifarios', tipo: 'pdf', url: '#', fecha: '2026' },
    { nombre: 'Tarifario de tr\u00e1mites',          cat: 'tarifarios', tipo: 'pdf', url: '#', fecha: '2026' }
  ],

  /* Salida para quien no encuentra lo que busca. La ley reconoce el
     derecho a pedir informacion que no este publicada, asi que la
     pagina no puede terminar en un callejon sin salida.
     OJO: cambiar por el canal que corresponda. */
  ayuda: {
    titulo: '\u00bfNo encuentras el documento que buscas?',
    texto: 'Puedes solicitar informaci\u00f3n p\u00fablica que no est\u00e9 publicada en este portal. Escr\u00edbenos y te la hacemos llegar.',
    cta: 'Solicitar informaci\u00f3n',
    url: 'https://wa.me/51924298424'
  },

  /* Fecha de actualizacion del portal. En blanco la calcula sola a
     partir del documento mas reciente, que es lo que no se olvida. */
  actualizado: ''
};
