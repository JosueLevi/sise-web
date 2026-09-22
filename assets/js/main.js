/* ============================================================
   SISE · Lógica del sitio
   Requiere data.js cargado antes que este archivo.
   ============================================================ */
(function () {
  'use strict';

  const $  = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Iconos ----------
     Los reales vienen de icons.js (exportados de Figma, ya con
     currentColor). FALLBACK guarda los que aún no tengo del diseño:
     para sustituirlos basta con añadir esa clave a ICONOS. */
  const I = (typeof ICONOS !== 'undefined') ? ICONOS : {};

  const FALLBACK = {
    'chevron-simple': '<svg viewBox="0 0 12 16"><path fill="currentColor" d="M2.6 0h4.1L11.8 8l-5.1 8H2.6l5.1-8z"/></svg>',
    /* Provisional: falta el icono de duración del diseño */
    'reloj': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.4 2"/></svg>',
    /* Provisional: birrete neutro para las carreras cuyo icono
       todavia no ha llegado del diseno. */
    'carrera': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.6 22 8.4l-10 4.8L2 8.4z"/><path d="M6 10.6v4.6c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.6"/></svg>',
    /* Iconos de área del menú de carreras. Provisionales: hechos a mano
       para calzar con el diseño, listos para sustituir por los SVG reales. */
    'area-gestion': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.8 20.2 7.4v9.2L12 21.2 3.8 16.6V7.4z"/><path d="m3.8 7.4 8.2 4.6 8.2-4.6"/><path d="M12 12v9.2"/></svg>',
    'area-tecnologia': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.1"/><path d="M12 2.9c2.7 2.4 2.7 15.8 0 18.2M12 2.9c-2.7 2.4-2.7 15.8 0 18.2"/><path d="M3.3 9h17.4M3.3 15h17.4"/></svg>',
    'area-publicidad': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8.4" width="18" height="12.2" rx="2.1"/><path d="m3.6 8.4 3.3-4.5h3.2L6.8 8.4m4.4 0 3.3-4.5h3.2l-3.3 4.5"/></svg>',
    'area-salud': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M2.9 12.2h4.2l2-5.4 3.2 10.9 2.3-5.5h6.5"/></svg>',
    'area-banca': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3.6 19.4h16.8"/><path d="m4.8 15.4 4.4-4.7 3.1 3.1 5.6-6.3"/><path d="M14.2 7.5h3.7v3.8"/></svg>',
    'area-diseno': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m4 20 1.7-4.6L15.9 5.2a2.2 2.2 0 0 1 3.1 3.1L8.6 18.3z"/><path d="m14.6 6.5 2.9 2.9"/></svg>',
    'area-hoteleria': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7.2 3.1v7a2.1 2.1 0 0 0 4.2 0v-7"/><path d="M9.3 12.1V21"/><path d="M17.6 3.1c-1.6 2-2.3 4.1-2.3 6.2 0 1.6.8 2.4 2.3 2.4V21"/></svg>',
    'area-ingenieria': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3.2 18.6h17.6"/><path d="M5.4 18.6v-2.3a6.6 6.6 0 0 1 13.2 0v2.3"/><path d="M9.8 5.4h4.4v4.1"/></svg>',
    'area-office': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3.2" width="16" height="17.6" rx="2"/><path d="M8.2 8h7.6M8.2 12h7.6M8.2 16h4.6"/></svg>',
    'area-modas': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3.2 12 6l3-2.8"/><path d="M9 3.2c-.4 1.8-1.7 2.7-3.4 3.6L8 9.3v10.5h8V9.3l2.4-2.5C16.7 5.9 15.4 5 15 3.2"/></svg>',
    'area-idiomas': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3.2v17.6"/><path d="M5 4.2c3.5-1.8 6.5 1.8 10 0v8.4c-3.5 1.8-6.5-1.8-10 0"/></svg>',
    'caret': '<svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    /* Logo de YouTube Shorts: el cuerpo toma el color del contenedor
       y el triángulo va calado en blanco. */
    'shorts': '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M17.77 10.32c1.36.56 2.18 1.79 2.19 3.15.01 1.37-.76 2.63-2 3.23l-8.5 4.57c-.52.29-1.1.44-1.7.44-1.38 0-2.67-.77-3.32-2-.97-1.83-.27-4.1 1.56-5.07l1.27-.68-1.2-.5A3.63 3.63 0 0 1 4 10.24c0-1.37.76-2.64 2-3.23l8.49-4.57c1.83-.97 4.1-.27 5.07 1.56s.28 4.1-1.56 5.06l-1.43.76 1.2.5Z"/><path fill="#fff" d="M9.9 9.2 15.4 12l-5.5 2.8z"/></svg>'
  };

  const ico = (k) => I[k] || FALLBACK[k] || '';

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  /* ---------- Carga diferida de fondos ----------
     Las imágenes van como background-image en elementos que existen desde
     el primer momento, así que el navegador se bajaba las 28 de golpe.
     Con data-bg solo se piden cuando su bloque se acerca a la pantalla.

     Se usa un barrido por scroll en vez de IntersectionObserver: si el
     navegador pausa los frames, los callbacks del observer no llegan y
     los huecos se quedarían vacíos. Un barrido no depende de eso. */
  let porCargar = [];
  let lazyTick = false;

  function cargaFondo(el) {
    el.style.backgroundImage = `url('${el.dataset.bg}')`;
    el.removeAttribute('data-bg');
  }

  /* Fondos declarados en el HTML con data-bg (tarjetas del hub, panel
     de pilares, cierre): entran en la misma cola que los de data.js. */
  function recogeFondosDelHtml() {
    document.querySelectorAll('[data-bg]').forEach((el) => {
      if (porCargar.indexOf(el) === -1) porCargar.push(el);
    });
  }

  /* Cuanto se adelanta la carga. Al entrar solo una pantalla por
     delante -lo demas competiria con la foto del banner, que es la que
     mide el rendimiento-; cuando la pagina ya esta lista, dos y media,
     para que nada llegue tarde al hacer scroll. */
  let margenLazy = 1;
  window.addEventListener('load', () => {
    setTimeout(() => { margenLazy = 1.6; barrerFondos(); }, 700);
  });

  function barrerFondos() {
    const limite = window.innerHeight * margenLazy;
    porCargar = porCargar.filter((el) => {
      const r = el.getBoundingClientRect();
      if (r.top > limite || r.bottom < -limite) return true;
      cargaFondo(el);
      return false;
    });
  }

  function onScrollLazy() {
    if (lazyTick) return;
    lazyTick = true;
    setTimeout(() => { lazyTick = false; barrerFondos(); }, 90);
  }
  recogeFondosDelHtml();
  window.addEventListener('scroll', onScrollLazy, { passive: true });
  window.addEventListener('resize', onScrollLazy, { passive: true });

  /* ---------- Imagen según el tamaño de pantalla ----------
     Cualquier entrada de data.js admite 'imgMovil' además de 'img'.
     Si existe, se usa en pantallas estrechas: así no hay que recortar
     una foto apaisada a cuadrada y perder los laterales. */
  const MQ_MOVIL = window.matchMedia('(max-width: 820px)');
  const imgDe = (d, campo) => {
    const base = campo || 'img';
    const movil = d[base + 'Movil'] || d[base + 'movil'];
    return (MQ_MOVIL.matches && movil) ? movil : d[base];
  };

  // Elementos que hay que repintar si se cruza el punto de corte
  const conFondoDinamico = [];

  function fondo(el, url, yaMismo) {
    if (yaMismo) { el.style.backgroundImage = `url('${url}')`; return; }
    el.dataset.bg = url;
    porCargar.push(el);
    barrerFondos();
  }

  function fondoDato(el, d, campo, yaMismo) {
    conFondoDinamico.push({ el, d, campo });
    fondo(el, imgDe(d, campo), yaMismo);
  }

  /* Al cruzar el punto de corte se cambian las imágenes ya pintadas.
     Se comprueba tanto con el evento de matchMedia como en cada resize:
     algunos navegadores y vistas embebidas no emiten el primero. */
  let eraMovil = MQ_MOVIL.matches;

  function revisaCorte() {
    if (MQ_MOVIL.matches === eraMovil) return;
    eraMovil = MQ_MOVIL.matches;
    conFondoDinamico.forEach(({ el, d, campo }) => {
      const url = imgDe(d, campo);
      if (el.dataset.bg) el.dataset.bg = url;
      else el.style.backgroundImage = `url('${url}')`;
    });
    if (typeof window.__repintarRejillas === 'function') window.__repintarRejillas();
  }

  MQ_MOVIL.addEventListener('change', revisaCorte);
  window.addEventListener('resize', revisaCorte, { passive: true });
  window.addEventListener('orientationchange', revisaCorte);
  // Para el HTML generado con plantillas
  function attrFondo(url, yaMismo) {
    return yaMismo ? `style="background-image:url('${esc(url)}')"` : `data-bg="${esc(url)}"`;
  }
  function observarNuevos(ctx) {
    $$('[data-bg]', ctx).forEach((el) => {
      if (!porCargar.includes(el)) porCargar.push(el);
    });
    barrerFondos();
  }
  // Red de seguridad: lo que siga pendiente tras cargar la página entra igual
  window.addEventListener('load', () => setTimeout(barrerFondos, 400));

  /* ============================================================
     1. HEADER — fondo sólido al hacer scroll
     ============================================================ */
  let menuLateralAbierto = null;

  const header = $('#siteHeader');

  /* --- Paginas internas (carreras.html, cursos.html, idiomas.html) ---
     Los enlaces a secciones del home tienen que apuntar al index, y el
     fondo de pagina es el claro.

     El panel solido de la cabecera solo se fuerza donde la pagina abre
     con una seccion clara: ahi el texto blanco seria invisible. Si abre
     con banner -.hero o .car-hero- la cabecera va transparente sobre la
     foto, como en el inicio, y el panel aparece al bajar. */
  const esInterna = !$('#inicio');
  const conBanner = !!$('.hero, .car-hero');
  if (esInterna) {
    document.body.classList.add('pagina-interna');
    if (!conBanner) header.classList.add('is-stuck');
    // Reescribe los anclas cuyo destino no existe en esta pagina
    $$('a[href^="#"]').forEach((a) => {
      const id = a.getAttribute('href').slice(1);
      if (id && !document.getElementById(id)) a.setAttribute('href', 'index.html#' + id);
    });
  }


  /* Al bajar el menu se aparta y al subir vuelve, para devolverle
     pantalla al contenido sin perder el acceso a la navegacion.
     Reglas: nunca se esconde en la cabecera de la pagina, ni con un
     desplegable o el menu lateral abiertos, ni si el gesto es un
     temblor de trackpad de un par de pixeles. */
  const CABECERA_SEGURA = 260;   // por encima de esto siempre visible
  const GESTO_MINIMO    = 6;     // px que hay que mover para contar

  let ultimoY = window.scrollY;

  const hayAlgoAbierto = () => !!(
    $('.nav-item.is-open') ||
    (menuLateralAbierto && menuLateralAbierto())
  );

  function mostrarMenu() { header.classList.remove('is-hidden'); }

  /* Si el salto lo ha provocado un enlace del propio menu, esconderlo
     seria castigar al que acaba de usarlo: se mantiene a la vista
     mientras dura el desplazamiento. */
  let treguaHasta = 0;
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (a && a.getAttribute('href').length > 1) treguaHasta = Date.now() + 1100;
  }, true);

  function onScrollHeader() {
    const y = Math.max(0, window.scrollY);
    if (!esInterna || conBanner) header.classList.toggle('is-stuck', y > 40);

    const salto = y - ultimoY;
    if (Math.abs(salto) < GESTO_MINIMO) return;
    ultimoY = y;

    if (y < CABECERA_SEGURA || hayAlgoAbierto() || Date.now() < treguaHasta) {
      mostrarMenu();
      return;
    }
    header.classList.toggle('is-hidden', salto > 0);
  }

  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* Si se llega al menu con el tabulador tiene que estar a la vista */
  header.addEventListener('focusin', mostrarMenu);

  /* Rellena cualquier elemento con data-ico usando icons.js */
  $$('[data-ico]').forEach((el) => {
    const svg = ico(el.dataset.ico);
    if (svg) el.innerHTML = svg;
  });

  /* ============================================================
     1a. BANNER PRINCIPAL — carrusel
     ============================================================ */
  const heroStage = $('#heroStage');
  const heroDots  = $('#heroDots');
  const heroSec   = $('.hero');

  if (heroStage && typeof HERO_SLIDES !== 'undefined' && HERO_SLIDES.length) {
    const hs = HERO_SLIDES;
    const elL1  = $('.hero-title .l1');
    const elL2  = $('.hero-title .l2');
    const elSub = $('.hero-sub');
    const elCopy = $('.hero-copy');

    if (elCopy) {
      const d0 = hs[0];
      elCopy.classList.toggle('sin-texto', !(d0.l1 || d0.l2 || d0.sub));
    }

    /* Solo la primera diapositiva se pide de inmediato: es la que mide
       el rendimiento. Las demas esperan a que la pagina este lista, y
       hasta entonces ni siquiera estan en la cola de carga. */
    const pendientes = [];
    const capas = hs.map((d, i) => {
      const c = document.createElement('div');
      c.className = 'hero-slide' + (i === 0 ? ' is-on' : '');
      if (i === 0) fondoDato(c, d, 'img', true);
      else pendientes.push(() => fondoDato(c, d, 'img', false));
      /* Encuadre propio de la diapositiva. La misma foto apaisada tiene
         que aguantar el banner ancho del escritorio y la caja casi
         cuadrada del movil, y el sujeto no siempre esta al centro: en
         la segunda el rotulo va pegado a la izquierda y con el encuadre
         normal se quedaba cortado a la mitad. */
      if (d.pos || d.posMovil) {
        const encuadra = () => {
          c.style.backgroundPosition =
            (MQ_MOVIL.matches && d.posMovil) ? d.posMovil : (d.pos || '');
        };
        encuadra();
        MQ_MOVIL.addEventListener('change', encuadra);
      }
      heroStage.appendChild(c);
      return c;
    });

    const cargaResto = () => pendientes.forEach((f) => f());
    if (document.readyState === 'complete') setTimeout(cargaResto, 600);
    else window.addEventListener('load', () => setTimeout(cargaResto, 600));

    // Con una sola diapositiva no hay carrusel que valga
    if (hs.length > 1) {
      $('#heroNav').hidden = false;
      heroDots.innerHTML = hs.map((d, i) =>
        `<button class="hero-dot${i === 0 ? ' is-on' : ''}" type="button" role="tab"
                 aria-selected="${i === 0}" aria-label="Diapositiva ${i + 1} de ${hs.length}"></button>`
      ).join('');
      const puntos = $$('.hero-dot', heroDots);

      let actual = 0;

      function verHero(i) {
        i = (i + hs.length) % hs.length;
        if (i === actual) return;
        capas[actual].classList.remove('is-on');
        puntos[actual].classList.remove('is-on');
        puntos[actual].setAttribute('aria-selected', 'false');
        capas[i].classList.add('is-on');
        puntos[i].classList.add('is-on');
        puntos[i].setAttribute('aria-selected', 'true');
        actual = i;

        const d = hs[i];
        const pinta = () => {
          if (elL1)  elL1.textContent  = d.l1  || '';
          if (elL2)  elL2.textContent  = d.l2  || '';
          if (elSub) elSub.textContent = d.sub || '';
          // Sin texto no debe quedar el hueco del título
          elCopy.classList.toggle('sin-texto', !(d.l1 || d.l2 || d.sub));
        };
        if (reduceMotion || !elCopy) pinta();
        else {
          elCopy.classList.add('is-swap');
          setTimeout(() => { pinta(); elCopy.classList.remove('is-swap'); }, 200);
        }
      }

      puntos.forEach((b, i) => b.addEventListener('click', () => verHero(i)));
      heroDots.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        const sig = (actual + (e.key === 'ArrowRight' ? 1 : -1) + hs.length) % hs.length;
        verHero(sig);
        puntos[sig].focus();
      });

      /* ---- Arrastre con ratón y dedo ----
         El formulario y los controles quedan fuera: dentro de ellos se
         escribe y se pulsa, no se arrastra. */
      const UMBRAL = 60;
      let x0 = 0, dx = 0, arrastrando = false, pid = null;

      function puedeArrastrar(t) {
        return !t.closest('.lead-card') && !t.closest('.hero-nav') &&
               !t.closest('a') && !t.closest('button');
      }

      heroSec.addEventListener('pointerdown', (e) => {
        if (e.button !== 0 || !puedeArrastrar(e.target)) return;
        arrastrando = true; x0 = e.clientX; dx = 0; pid = e.pointerId;
        heroSec.classList.add('is-dragging');
        heroStage.style.transition = 'none';
        // Con captura, el gesto sigue llegando aunque el dedo salga del
        // banner a media pasada.
        try { heroSec.setPointerCapture(pid); } catch (_) {}
      });

      heroSec.addEventListener('pointermove', (e) => {
        if (!arrastrando || e.pointerId !== pid) return;
        dx = e.clientX - x0;
        // Acompaña el gesto sin desplazarse tanto como el dedo
        const seguir = Math.max(-70, Math.min(70, dx * 0.28));
        heroStage.style.transform = `translateX(${seguir}px)`;
      });

      function sueltaHero(e) {
        if (!arrastrando || (e && e.pointerId !== pid)) return;
        arrastrando = false;
        heroSec.classList.remove('is-dragging');
        heroStage.style.transition = 'transform .35s var(--ease)';
        heroStage.style.transform = '';
        if (Math.abs(dx) > UMBRAL) verHero(actual + (dx < 0 ? 1 : -1));
        dx = 0;
      }
      heroSec.addEventListener('pointerup', sueltaHero);
      heroSec.addEventListener('pointercancel', sueltaHero);
      /* Ya no hace falta escuchar pointerleave: con la captura el puntero
         no "sale" del banner, y en tactil ese evento cortaba el gesto en
         cuanto el dedo pasaba por encima de otro elemento. */

      // Un arrastre no debe acabar abriendo un enlace
      heroSec.addEventListener('click', (e) => {
        if (Math.abs(dx) > 8) { e.preventDefault(); e.stopPropagation(); }
      }, true);
    }
  }

  /* ============================================================
     1b. NAVEGACIÓN CON DROPDOWNS
     ============================================================ */

  const mainNav = $('#mainNav');
  const menuNav = $('#menuNav');

  /* Agrupa carreras o cursos por su area, respetando el orden del array
     de areas. Las areas sin ningun item no se pintan. Mismo panel para
     los dos: solo cambian las listas de origen. */
  function grupos(tipo) {
    const cfg = {
      carreras: { areas: (typeof AREAS !== 'undefined') ? AREAS : [],
                  items: (typeof CARRERAS !== 'undefined') ? CARRERAS : [] },
      cursos:   { areas: (typeof AREAS_CURSOS !== 'undefined') ? AREAS_CURSOS : [],
                  items: (typeof CURSOS !== 'undefined') ? CURSOS : [] },
      idiomas:  { areas: (typeof AREAS_IDIOMAS !== 'undefined') ? AREAS_IDIOMAS : [],
                  items: (typeof IDIOMAS_CURSO !== 'undefined') ? IDIOMAS_CURSO : [] },
      escuela:  { areas: (typeof AREAS_ESCUELA !== 'undefined') ? AREAS_ESCUELA : [],
                  items: (typeof ESCUELA !== 'undefined') ? ESCUELA : [] }
    }[tipo] || { areas: [], items: [] };
    return cfg.areas
      .map((a) => ({ label: a.label, icon: a.icon, items: cfg.items.filter((c) => c.cat === a.slug) }))
      .filter((a) => a.items.length);
  }

  if (typeof MENU !== 'undefined') {
    if (mainNav) {
      mainNav.innerHTML = MENU.map((m, i) => {
        if (!m.items && !m.auto) return `<a class="nav-link" href="${esc(m.url)}">${esc(m.label)}</a>`;

        // Un solo grupo (Idiomas) -> panel compacto bajo su boton, no el
        // panel ancho centrado sobre la pildora.
        const compacto = m.auto && grupos(m.auto).length === 1;

        const cuerpo = m.auto
          ? `${grupos(m.auto).map((a) => `
                <div class="mega-col">
                  <p class="mega-area">
                    <span class="mega-ico" aria-hidden="true">${ico(a.icon)}</span>${esc(a.label)}
                  </p>
                  ${a.items.map((c) => `<a role="menuitem" href="${esc(c.url || '#')}">${esc(c.nombre)}${c.nuevo ? ' <span class="tag-nuevo">Nuevo</span>' : ''}</a>`).join('')}
                </div>`).join('')}`
          : m.items.map((it) => `<a role="menuitem" href="${esc(it.url)}"${it.destacado ? ' class="is-cta"' : ''}>${esc(it.label)}</a>`).join('');

        return `
          <div class="nav-item${m.auto && !compacto ? ' has-mega' : ''}">
            <button class="nav-link nav-toggle" type="button"
                    aria-expanded="false" aria-controls="drop-${i}">
              ${esc(m.label)}${m.auto && grupos(m.auto).some((a) => a.items.some((c) => c.nuevo)) ? '<span class="nav-punto" aria-label="Hay novedades"></span>' : ''}<span class="caret" aria-hidden="true">${ico('caret')}</span>
            </button>
            <div class="drop${m.auto ? ' drop-mega' : ''}${compacto ? ' is-compact' : ''}" id="drop-${i}" role="menu">
              ${cuerpo}
            </div>
          </div>`;
      }).join('');
    }

  }

  /* Abrir / cerrar dropdowns de escritorio */
  function closeDrops(except) {
    $$('.nav-item.is-open').forEach((el) => {
      if (el === except) return;
      el.classList.remove('is-open');
      const t = $('.nav-toggle', el);
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  }

  if (mainNav) {
    mainNav.addEventListener('click', (e) => {
      const btn = e.target.closest('.nav-toggle');
      if (!btn) return;
      const item = btn.parentElement;
      const open = !item.classList.contains('is-open');
      closeDrops(item);
      item.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    });

    // El hover abre en escritorio; el foco de teclado también
    mainNav.addEventListener('focusout', (e) => {
      const item = e.target.closest('.nav-item');
      if (item && !item.contains(e.relatedTarget)) {
        item.classList.remove('is-open');
        $('.nav-toggle', item).setAttribute('aria-expanded', 'false');
      }
    });
    $$('.drop a', mainNav).forEach((a) => a.addEventListener('click', () => closeDrops()));
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item')) closeDrops();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrops();
  });

  /* ============================================================
     1c. MENU DESPLEGADO - mapa del sitio + buscador
     ============================================================
     Se arma desde MENU_PANEL para que las cinco paginas muestren
     exactamente lo mismo sin repetir el marcado en cada HTML. */

  /* Nombre del archivo que se esta viendo, para marcar donde estas.
     Una ruta que acaba en / es el index. */
  const pagActual = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  if (menuNav && typeof MENU_PANEL !== 'undefined') {
    /* Areas de carrera, para llegar a lo que se busca sin pasar por el
       listado entero. El enlace lleva la area en la direccion y la
       pagina de carreras abre ya filtrada. */
    const areasMenu = (typeof AREAS !== 'undefined') ? AREAS : [];
    const hayNueva = (typeof CARRERAS !== 'undefined') && CARRERAS.some((c) => c.nuevo);

    menuNav.innerHTML = MENU_PANEL.columnas.map((c) => `
      <div class="sm-col">
        <p class="sm-col-t">${esc(c.titulo)}</p>
        ${c.items.map((it) => {
          const archivo = it.url.split('#')[0].toLowerCase();
          // Solo se marca el enlace a la pagina entera. Los que llevan a
          // una seccion (index.html#sedes) no: no estas "en" Sedes.
          const aqui = archivo === pagActual && it.url.indexOf('#') === -1;
          const nueva = hayNueva && archivo === 'carreras-semipresenciales.html';
          return `<a href="${esc(it.url)}"${aqui ? ' aria-current="page"' : ''}>${esc(it.label)}${nueva ? ' <span class="tag-nuevo">Nuevo</span>' : ''}</a>`;
        }).join('')}
        ${c.areas && areasMenu.length ? `
          <p class="sm-sub-t">Por área</p>
          <div class="sm-areas">
            ${areasMenu.map((a) => `<a href="carreras-semipresenciales.html?area=${esc(a.slug)}">${esc(a.label)}</a>`).join('')}
          </div>` : ''}
      </div>`).join('');

    const menuSide = $('#menuSide');
    if (menuSide) {
      const ad = MENU_PANEL.admision;
      const t  = MENU_PANEL.tarjeta;
      menuSide.innerHTML = `
        ${ad ? `
        <div class="sm-cta">
          <p class="sm-cta-t">${esc(ad.titulo)}</p>
          <p class="sm-cta-p">${esc(ad.texto)}</p>
          <a class="btn btn-pill sm-cta-btn" href="${esc(ad.url)}">
            <span>${esc(ad.cta)}</span>
            <span class="sm-fl" aria-hidden="true">${ico('flecha-circulo')}</span>
          </a>
        </div>` : ''}
        ${t ? `
        <div class="sm-card">
          <span class="sm-card-ico" aria-hidden="true">${ico(t.icono)}</span>
          <div class="sm-card-txt">
            <p class="sm-card-t">${esc(t.titulo)}</p>
            <a class="sm-card-link" href="${esc(t.url)}">${esc(t.cta)}</a>
          </div>
        </div>` : ''}`;
    }

    const menuContacto = $('#menuContacto');
    if (menuContacto) {
      const vias = [MENU_PANEL.whatsapp, MENU_PANEL.telefono].filter(Boolean);
      menuContacto.innerHTML = vias.map((v) => `
        <a class="sm-via" href="${esc(v.url)}"${v.url.indexOf('http') === 0 ? ' target="_blank" rel="noopener"' : ''}>
          <span class="sm-via-ico" aria-hidden="true">${ico(v.icono)}</span>
          <span class="sm-via-txt"><b>${esc(v.texto)}</b>${v.dato ? `<span>${esc(v.dato)}</span>` : ''}</span>
        </a>`).join('');
    }

    const menuRedes = $('#menuRedes');
    if (menuRedes && MENU_PANEL.redes) {
      menuRedes.innerHTML = MENU_PANEL.redes.map((r) =>
        `<li><a href="${esc(r.url)}" aria-label="${esc(r.nombre)}" target="_blank" rel="noopener">${ico(r.icono)}</a></li>`
      ).join('');
    }

  }

  /* ============================================================
     2. MENÚ LATERAL
     ============================================================ */
  const burger  = $('#burger');
  const menu    = $('#mobileMenu');

  /* Lo consulta el header para no esconderse con el menu desplegado */
  menuLateralAbierto = () => menu.classList.contains('is-open');

  function setMenu(open) {
    if (open) mostrarMenu();
    menu.classList.toggle('is-open', open);
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';

    if (open) {
      menu.scrollTop = 0;
      $('#menuClose').focus();
    } else if (menu.contains(document.activeElement)) {
      // Solo se devuelve el foco si estaba dentro del menu: al cerrarse
      // por un enlace ya se esta navegando y robarlo seria un salto raro.
      burger.focus();
    }
  }

  /* El menu tapa la pagina, pero el tabulador la seguia recorriendo por
     detras: sin esto el foco desaparecia de la vista. */
  menu.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focos = $$('a[href], button:not([disabled])', menu)
      .filter((el) => el.offsetWidth || el.offsetHeight || el.getClientRects().length);
    if (!focos.length) return;
    const primero = focos[0], ultimo = focos[focos.length - 1];
    if (e.shiftKey && document.activeElement === primero) {
      e.preventDefault(); ultimo.focus();
    } else if (!e.shiftKey && document.activeElement === ultimo) {
      e.preventDefault(); primero.focus();
    }
  });
  burger.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
  $('#menuClose').addEventListener('click', () => setMenu(false));
  // Delegado: los enlaces se pintan despues, no existen al enganchar
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false);
  });

  /* ============================================================
     2b. FORMULARIO EMERGENTE (movil)
     ============================================================
     La tarjeta es la misma de siempre: no se mueve del DOM ni se
     duplica, solo cambia de sitio por CSS. Asi todo lo que ya tiene
     enganchado -desplegables a medida, validacion, envio- sigue
     funcionando sin tocar una linea. */
  /* ---- Etiqueta del boton de registro y menu de WhatsApp ---- */
  if (typeof FLOTANTES !== 'undefined') {
    const txtReg = $('#txtRegistro');
    if (txtReg && FLOTANTES.registro) {
      txtReg.innerHTML = `<span>${esc(FLOTANTES.registro.etiqueta)}</span>`;
      const btnReg = txtReg.closest('.floater-form');
      if (btnReg) {
        btnReg.setAttribute('aria-label', FLOTANTES.registro.etiqueta);
        /* Se mide el ancho real del texto para que la apertura termine
           justo donde acaba la palabra.

           Se mide con un Range sobre el texto y no con scrollWidth: la
           etiqueta vive dentro de una caja con max-width:0, asi que
           mientras esta cerrada el navegador da anchos que no valen y la
           medida se quedaba con el ancho que hubiera en ese momento. El
           Range devuelve lo que ocupa la linea de texto tal cual, este
           la pastilla abierta o cerrada.

           Hay que repetirla: la tipografia tarda en llegar y el cuerpo
           de letra cambia en movil, de modo que una sola medida se queda
           corta y el texto sale cortado. */
        const mide = () => {
          const linea = txtReg.firstElementChild;
          if (!linea) return;
          const r = document.createRange();
          r.selectNodeContents(linea);
          const aire = parseFloat(getComputedStyle(linea).paddingRight) || 0;
          const ancho = Math.ceil(r.getBoundingClientRect().width + aire);
          if (ancho > 0) btnReg.style.setProperty('--wtxt', ancho + 'px');
        };
        mide();
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(mide);
        window.addEventListener('load', mide);
        window.addEventListener('resize', mide, { passive: true });
        /* Y justo antes de abrirla, por si el ancho cambio sin que
           saltara ninguno de los avisos de arriba. */
        btnReg.addEventListener('pointerenter', mide);
        btnReg.addEventListener('focus', mide);
      }
    }

    const waBtn  = $('#abrirWa');
    const waMenu = $('#waMenu');
    if (waBtn && waMenu && FLOTANTES.whatsapp) {
      const wa = FLOTANTES.whatsapp;
      waMenu.innerHTML = (wa.opciones || []).map((o) => {
        /* Manda el enlace corto de wa.link si lo hay; si no, se arma el
           de siempre con el numero y el mensaje. */
        const num = (o.numero || wa.numero || '').replace(/\D/g, '');
        const url = o.url || ('https://wa.me/' + num +
          (o.texto ? '?text=' + encodeURIComponent(o.texto) : ''));
        return `<a class="wa-op" role="menuitem" href="${esc(url)}" target="_blank" rel="noopener">
                  ${ico('whatsapp')}<span>${esc(o.label)}</span>
                </a>`;
      }).join('');

      function abreWa(v) {
        waMenu.hidden = !v;
        waBtn.setAttribute('aria-expanded', String(v));
      }
      waBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        abreWa(waMenu.hidden);
      });
      // Pulsar fuera o Escape lo cierra
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.wa-caja')) abreWa(false);
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') abreWa(false);
      });
      // Al elegir una opcion se abre WhatsApp: el menu ya no pinta nada
      waMenu.addEventListener('click', () => abreWa(false));
    }
  }

  const abrirForm  = $('#abrirForm');
  const cerrarForm = $('#cerrarForm');
  const formVelo   = $('#formVelo');
  const tarjetaForm = $('.lead-card');

  /* El emergente es cosa de movil. En escritorio el formulario ya esta
     a la vista dentro del banner, asi que el flotante solo tiene que
     llevar hasta el. Antes se disparaba el emergente en las dos: en
     escritorio no se movia nada -las reglas que lo convierten en
     emergente viven en la media query- pero si dejaba el body con
     overflow:hidden, o sea la pagina bloqueada y sin forma de
     desbloquearla salvo con Escape, porque el aspa esta oculta y el
     velo no tiene alto. */
  const esEmergente = () => window.matchMedia('(max-width: 820px)').matches;

  /* En las paginas que no llevan formulario propio -carreras, cursos e
     idiomas- se va al del inicio. */
  const destinoForm = (typeof FLOTANTES !== 'undefined' && FLOTANTES.registro &&
                       FLOTANTES.registro.url) || 'index.html#form';

  function vaAlForm() {
    if (!tarjetaForm) { window.location.href = destinoForm; return; }
    /* El margen deja el formulario por debajo de la cabecera, que va
       fija y si no le tapa el titulo. */
    const y = tarjetaForm.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: Math.max(y, 0), behavior: 'smooth' });
    /* Un destello para que el ojo sepa donde ha aterrizado: sin el, en
       el inicio el formulario ya estaba en pantalla y el boton parecia
       no hacer nada. Se reinicia a mano por si se pulsa dos veces. */
    tarjetaForm.classList.remove('is-marcada');
    void tarjetaForm.offsetWidth;
    tarjetaForm.classList.add('is-marcada');
  }

  if (abrirForm && !tarjetaForm) abrirForm.addEventListener('click', vaAlForm);

  if (abrirForm && formVelo && tarjetaForm) {
    let formDesde = null;

    function abreForm() {
      formDesde = document.activeElement;
      document.body.classList.add('form-abierto');
      formVelo.hidden = false;
      document.body.style.overflow = 'hidden';
      abrirForm.setAttribute('aria-expanded', 'true');
      tarjetaForm.scrollTop = 0;
      const primero = $('input, select, button', tarjetaForm);
      if (primero) primero.focus();
    }

    function cierraForm() {
      if (!document.body.classList.contains('form-abierto')) return;
      document.body.classList.remove('form-abierto');
      /* El velo se apaga con transicion, asi que se oculta al final y no
         de golpe: si se quita el hidden ahora desaparece de una y la
         tarjeta se queda sola desvaneciendose sobre la pagina. */
      setTimeout(() => {
        if (!document.body.classList.contains('form-abierto')) formVelo.hidden = true;
      }, 240);
      document.body.style.overflow = '';
      abrirForm.setAttribute('aria-expanded', 'false');
      if (formDesde && document.contains(formDesde)) formDesde.focus();
      formDesde = null;
    }

    abrirForm.addEventListener('click', () => {
      if (esEmergente()) abreForm(); else vaAlForm();
    });
    if (cerrarForm) cerrarForm.addEventListener('click', cierraForm);
    formVelo.addEventListener('click', cierraForm);
    document.addEventListener('keydown', (e) => {
      // Escape cierra, salvo que lo este usando un desplegable abierto
      if (e.key === 'Escape' && !$('.lead-card .field.is-open')) cierraForm();
    });

    /* Se llega con #form desde el flotante de carreras, cursos e
       idiomas, que no llevan formulario propio. En escritorio el ancla
       ya basta, pero en movil la tarjeta es un emergente oculto: sin
       esto el usuario aterrizaba en el inicio sin ver ningun
       formulario, que es justo lo que habia pedido. */
    if (location.hash === '#form') {
      if (esEmergente()) abreForm(); else vaAlForm();
    }

    /* Si se pasa a escritorio con el emergente abierto, la tarjeta
       vuelve al banner y el estado sobra. */
    window.matchMedia('(min-width: 821px)').addEventListener('change', (e) => {
      if (e.matches) cierraForm();
    });
  }

  /* ============================================================
     2d. CARRIL DE LABORATORIOS
     ============================================================
     El carril se desplazaba solo con gesto tactil: con raton la rueda
     mueve la pagina en vertical y no habia ni puntos ni arrastre, asi
     que en escritorio parecia roto. Se le anaden las dos cosas. */
  const labsRail = $('#labsRail');
  const labsNav  = $('#labsNav');

  if (labsRail && labsNav) {
    const slides = $$('.lab-slide', labsRail);

    if (slides.length > 1) {
      const flecha = (dir, etiqueta, d) =>
        `<button class="labs-flecha" type="button" data-dir="${dir}" aria-label="${etiqueta}">
           <svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d}" fill="none"
                stroke="currentColor" stroke-width="2.2" stroke-linecap="round"
                stroke-linejoin="round"/></svg>
         </button>`;
      labsNav.innerHTML =
        flecha(-1, 'Foto anterior', 'M15 5l-7 7 7 7') +
        flecha(1,  'Foto siguiente', 'M9 5l7 7-7 7');
      const botones = $$('.labs-flecha', labsNav);

      const paso = () => slides[1].offsetLeft - slides[0].offsetLeft;

      function marca(i) {
        // La primera flecha se apaga en la primera foto y la otra en la ultima
        botones[0].disabled = i <= 0;
        botones[1].disabled = i >= slides.length - 1;
      }

      botones.forEach((b) => b.addEventListener('click', () => {
        labsRail.scrollBy({ left: paso() * Number(b.dataset.dir), behavior: 'smooth' });
      }));

      marca(0);   // de salida no hay foto anterior

      /* En que foto estamos se deduce de la posicion real y no de la
         ultima pulsacion: asi tambien acierta cuando se arrastra o se
         desliza con el dedo. */
      labsRail.addEventListener('scroll', () => {
        const x = labsRail.scrollLeft;
        let cerca = 0, dist = Infinity;
        slides.forEach((sl, i) => {
          const d = Math.abs((sl.offsetLeft - slides[0].offsetLeft) - x);
          if (d < dist) { dist = d; cerca = i; }
        });
        marca(cerca);
      }, { passive: true });

      /* Arrastre con el raton. El umbral de 4px evita que un clic
         normal se interprete como arrastre. */
      let baja = false, x0 = 0, s0 = 0, movido = false;
      labsRail.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'touch') return;   // el tactil ya lo hace el navegador
        baja = true; movido = false;
        x0 = e.clientX; s0 = labsRail.scrollLeft;
        /* Capturar el puntero puede fallar si para cuando llega aqui ya
           se solto: no es motivo para tirar el resto del gesto. */
        try { labsRail.setPointerCapture(e.pointerId); } catch (_) {}
      });
      labsRail.addEventListener('pointermove', (e) => {
        if (!baja) return;
        const d = e.clientX - x0;
        if (!movido && Math.abs(d) > 4) { movido = true; labsRail.classList.add('is-dragging'); }
        if (movido) labsRail.scrollLeft = s0 - d;
      });
      /* Al soltar, el carril se coloca en la foto mas cercana.

         Sin esto se quedaba a medio camino: el enganche esta en
         "proximity" -que solo ajusta si ya estas cerca- y ademas se
         desactiva durante el arrastre para que la foto siga al raton.
         Asi que al soltar no habia nada que terminara el gesto. */
      const encaja = () => {
        const x = labsRail.scrollLeft;
        let cerca = slides[0], dist = Infinity;
        slides.forEach((sl) => {
          const d = Math.abs((sl.offsetLeft - slides[0].offsetLeft) - x);
          if (d < dist) { dist = d; cerca = sl; }
        });
        labsRail.scrollTo({ left: cerca.offsetLeft - slides[0].offsetLeft, behavior: 'smooth' });
      };

      const suelta = () => {
        if (!baja) return;
        baja = false;
        labsRail.classList.remove('is-dragging');
        if (movido) encaja();
      };
      labsRail.addEventListener('pointerup', suelta);
      labsRail.addEventListener('pointercancel', suelta);
    }
  }

  /* ============================================================
     3. REVEAL AL HACER SCROLL
     ============================================================ */
  /* Barrido por scroll en lugar de IntersectionObserver: así también se
     muestran los bloques que quedaron por encima tras un salto de ancla
     o un scroll instantáneo (el IO no dispara en ese caso). */
  let pending = $$('.reveal');

  /* Sin candado de requestAnimationFrame: si el navegador deja de emitir
     frames (pestaña en segundo plano, vista incrustada), el candado se
     queda en true y el barrido no vuelve a ejecutarse nunca; los bloques
     se quedan invisibles para siempre. El cálculo es una sola medida por
     elemento pendiente, no hace falta estrangularlo. */
  function sweepReveal() {
    if (!pending.length) return;
    const limit = window.innerHeight * 0.9;
    pending = pending.filter((el) => {
      if (el.getBoundingClientRect().top >= limit) return true;
      el.classList.add('is-in');
      return false;
    });
    if (!pending.length) window.removeEventListener('scroll', sweepReveal);
  }

  window.addEventListener('scroll', sweepReveal, { passive: true });
  window.addEventListener('resize', sweepReveal, { passive: true });
  sweepReveal();
  // Red de seguridad: al terminar de cargar puede haber cambiado el alto
  window.addEventListener('load', sweepReveal);

  /* ============================================================
     4. CARRERAS — grilla + filtros
     ============================================================ */
  const grid = $('#careerGrid');

  /* Datos por tipo de oferta. La misma grilla sirve para carreras,
     cursos e idiomas segun el data-tipo del contenedor. */
  function datosDe(tipo) {
    return {
      carreras: { areas: (typeof AREAS !== 'undefined') ? AREAS : [],
                  items: (typeof CARRERAS !== 'undefined') ? CARRERAS : [] },
      cursos:   { areas: (typeof AREAS_CURSOS !== 'undefined') ? AREAS_CURSOS : [],
                  items: (typeof CURSOS !== 'undefined') ? CURSOS : [] },
      idiomas:  { areas: (typeof AREAS_IDIOMAS !== 'undefined') ? AREAS_IDIOMAS : [],
                  items: (typeof IDIOMAS_CURSO !== 'undefined') ? IDIOMAS_CURSO : [] },
      escuela:  { areas: (typeof AREAS_ESCUELA !== 'undefined') ? AREAS_ESCUELA : [],
                  items: (typeof ESCUELA !== 'undefined') ? ESCUELA : [] }
    }[tipo] || { areas: [], items: [] };
  }

  /* Una etiqueta por modalidad: "3 años semi", "2 años virtual" */
  function etiquetasModalidad(c) {
    const base = (typeof DURACION_POR_MODALIDAD !== 'undefined') ? DURACION_POR_MODALIDAD : {};
    const corto = (typeof MODALIDAD_CORTA !== 'undefined') ? MODALIDAD_CORTA : {};

    if (!Array.isArray(c.modalidades)) {
      return c.modalidad ? `<div class="cc-tags"><span class="cc-tag">${esc(c.modalidad)}</span></div>` : '';
    }
    const tags = c.modalidades.map((m, i) => {
      const dur = (c.duraciones && c.duraciones[m]) || base[m] || '';
      const nom = corto[m] || m;
      return `<span class="cc-tag t-${i % 2}">${esc(dur ? `${dur} ${nom}` : nom)}</span>`;
    });
    return `<div class="cc-tags">${tags.join('')}</div>`;
  }

  /* Icono del area de una tarjeta, buscado en las tres listas. */
  function iconoArea(c) {
    const listas = [
      (typeof AREAS !== 'undefined') ? AREAS : [],
      (typeof AREAS_CURSOS !== 'undefined') ? AREAS_CURSOS : [],
      (typeof AREAS_IDIOMAS !== 'undefined') ? AREAS_IDIOMAS : []
    ];
    for (const l of listas) {
      const a = l.find((x) => x.slug === c.cat);
      if (a && ico(a.icon)) return ico(a.icon);
    }
    return '';
  }

  function cardHTML(c, i) {
    const icon = ico(c.icon) || ico('carrera');
    return `
      <a class="career-card" href="${esc(c.url || '#')}" data-cat="${esc(c.cat)}" style="animation-delay:${i * 60}ms">
        <div class="cc-top">
          <div class="cc-media">
            ${c.nuevo ? '<span class="cc-nuevo">Nuevo</span>' : ''}
            <div class="cc-vacia" aria-hidden="true">${iconoArea(c) || icon}</div>
            ${imgDe(c) ? `<div class="cc-img" ${attrFondo(imgDe(c), i < 4)}></div>` : ''}
          </div>
          <span class="cc-go" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M8 16 16 8m0 0H9.5M16 8v6.5" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
        </div>
        <div class="cc-body">
          <div class="cc-head">
            <span class="cc-icon">${icon}</span>
            <h3 class="cc-name">${esc(c.nombre)}</h3>
          </div>
          ${c.descripcion ? `<p class="cc-desc">${esc(c.descripcion)}</p>` : ''}
          ${etiquetasModalidad(c)}
        </div>
      </a>`;
  }

  /* Solo corre donde hay grilla (paginas internas). En el home no existe. */
  if (grid) {
    const TIPO = grid.dataset.tipo || 'carreras';
    const D = datosDe(TIPO);
    /* Paginas por modalidad: data-modalidad deja solo las carreras que
       la ofrecen, y en la tarjeta solo su etiqueta. */
    const MOD = grid.dataset.modalidad;
    if (MOD) {
      D.items = D.items
        .filter((c) => !Array.isArray(c.modalidades) || c.modalidades.includes(MOD))
        .map((c) => Array.isArray(c.modalidades) ? { ...c, modalidades: [MOD] } : c);
    }
    const cajaChips = $('#areaChips');

    function render(filter) {
      const list = (!filter || filter === 'todas')
        ? D.items
        : D.items.filter((c) => c.cat === filter);
      grid.innerHTML = list.length
        ? list.map(cardHTML).join('')
        : '<p class="grid-empty">Pronto publicaremos esta area.</p>';
      // Con una o dos tarjetas la fila se centra en vez de dejar un hueco
      grid.classList.toggle('is-corta', list.length > 0 && list.length < 3);
      observarNuevos(grid);
    }
    // Se expone para el repintado al cruzar el punto de corte movil
    window.__render = render;

    // Chips: un area por cada categoria con contenido
    if (cajaChips) {
      const conItems = D.areas.filter((a) => D.items.some((c) => c.cat === a.slug));
      cajaChips.innerHTML = conItems.map((a, n) => `
        <button class="chip${n === 0 ? ' is-active' : ''}" data-filter="${esc(a.slug)}"
                role="tab" aria-selected="${n === 0}">${esc(a.label)}</button>`).join('');
      cajaChips.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-filter]');
        if (!btn) return;
        $$('[data-filter]', cajaChips).forEach((b) => {
          b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active'); btn.setAttribute('aria-selected', 'true');
        render(btn.dataset.filter);
      });
    }

    /* ?area=gestion en la direccion abre esa area marcada: es lo que
       usan los accesos por area del menu desplegado. */
    const areaPedida = new URLSearchParams(location.search).get('area');
    if (areaPedida && cajaChips) {
      const chip = $(`[data-filter="${CSS.escape(areaPedida)}"]`, cajaChips);
      if (chip) {
        $$('[data-filter]', cajaChips).forEach((b) => {
          b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false');
        });
        chip.classList.add('is-active'); chip.setAttribute('aria-selected', 'true');
      }
    }
    const chipInicial = cajaChips ? $('.chip.is-active', cajaChips) : null;
    render(chipInicial ? chipInicial.dataset.filter : 'todas');
  }

  /* ============================================================
     4b. PILARES — la foto y la pestana se relevan solas
     ============================================================
     Cada pilar dura --pil-paso (CSS): cambia la foto, se abre su texto
     y su linea avanza. El raton no lo detiene -solo sirve para elegir
     pestana-; si lo pausa el foco del teclado dentro, para quien navega
     asi, y al reanudar la linea sigue desde donde iba. */
  const pilEscena = $('#pilEscena');
  if (pilEscena && !reduceMotion) {
    const capas = $$('.pil-capa', pilEscena);
    const tabs  = $$('.pil-tab', pilEscena);
    const PASO = (parseFloat(getComputedStyle(pilEscena).getPropertyValue('--pil-paso')) || 4) * 1000;
    const estado = { visible: false, teclado: false };
    let actualPil = 0, reloj = null, restante = PASO, inicio = 0;

    function reiniciaLinea(t) {
      const barra = $('.pil-linea > span', t);
      if (!barra) return;
      barra.style.animation = 'none';
      void barra.offsetWidth;
      barra.style.animation = '';
    }

    /* Corre solo si se ve y nadie lo esta mirando de cerca */
    function evalua() {
      const corre = estado.visible && !estado.teclado;
      if (corre && !reloj) {
        inicio = performance.now();
        reloj = setTimeout(siguiente, restante);
        pilEscena.classList.remove('is-pausada');
      } else if (!corre && reloj) {
        clearTimeout(reloj); reloj = null;
        restante = Math.max(0, restante - (performance.now() - inicio));
        pilEscena.classList.add('is-pausada');
      } else if (!corre) {
        pilEscena.classList.add('is-pausada');
      }
    }

    function muestraPilar(i) {
      actualPil = (i + tabs.length) % tabs.length;
      capas.forEach((c, n) => c.classList.toggle('is-activa', n === actualPil));
      tabs.forEach((t, n) => {
        const on = n === actualPil;
        t.classList.toggle('is-activa', on);
        t.setAttribute('aria-selected', String(on));
        if (on) reiniciaLinea(t);
      });
      // cada pilar empieza con su tiempo completo
      clearTimeout(reloj); reloj = null; restante = PASO;
      evalua();
    }
    function siguiente() { reloj = null; muestraPilar(actualPil + 1); }

    tabs.forEach((t, n) => t.addEventListener('click', () => muestraPilar(n)));

    /* Solo el foco de teclado pausa: el de un clic o un toque no */
    pilEscena.addEventListener('focusin', () => {
      estado.teclado = !!pilEscena.querySelector(':focus-visible'); evalua();
    });
    pilEscena.addEventListener('focusout', (e) => {
      if (!pilEscena.contains(e.relatedTarget)) { estado.teclado = false; evalua(); }
    });

    /* Solo corre mientras se ve. Al entrar por primera vez la linea del
       primero arranca desde cero, en sincronia con el reloj. */
    new IntersectionObserver((es) => {
      es.forEach((e) => { estado.visible = e.isIntersecting; evalua(); });
    }, { threshold: 0.25 }).observe(pilEscena);

    pilEscena.classList.add('is-pausada');
    muestraPilar(0);
  }

  /* ============================================================
     5. CONTADORES ANIMADOS
     ============================================================ */
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  function runCounter(el) {
    const to  = parseFloat(el.dataset.to) || 0;
    const dur = parseInt(el.dataset.dur, 10) || 1600;
    const sep = el.dataset.sep === '1';
    // El diseño usa punto como separador de miles (150.000).
    // toLocaleString('es-PE') devolvería coma, así que se fuerza el punto.
    const fmt = (n) => sep ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.') : String(n);

    if (reduceMotion) { el.textContent = fmt(to); return; }

    const t0 = performance.now();
    function frame(now) {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = fmt(Math.round(to * easeOutCubic(p)));
      if (p < 1) { requestAnimationFrame(frame); }
      else {
        // Pequeno rebote al terminar el conteo
        const box = el.closest('.stat-num') || el;
        box.classList.remove('is-pop');
        void box.offsetWidth;
        box.classList.add('is-pop');
      }
    }
    requestAnimationFrame(frame);
  }

  const statsIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      $$('.counter', en.target).forEach(runCounter);
      statsIO.unobserve(en.target);
    });
  }, { threshold: 0.35 });

  const statsCard = $('#statsCard');
  if (statsCard) statsIO.observe(statsCard);
  /* ============================================================
     5b. "POR QUE ESTUDIARLA": UN MOTIVO CADA VEZ
     ============================================================
     Cuatro tarjetas a la vez se leian como un muro. Ahora el personaje
     dice uno y las flechas pasan al siguiente. */
  const whyEscena = $('#whyEscena');
  const whyNav    = $('#whyNav');

  if (whyEscena && whyNav) {
    const motivos = $$('.why-slide', whyEscena);

    if (motivos.length > 1) {
      // Las mismas flechas del carril de laboratorios, clase incluida
      const flecha = (dir, etiqueta, d) =>
        `<button class="labs-flecha" type="button" data-dir="${dir}" aria-label="${etiqueta}">
           <svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d}" fill="none"
                stroke="currentColor" stroke-width="2.2" stroke-linecap="round"
                stroke-linejoin="round"/></svg>
         </button>`;
      whyNav.innerHTML =
        flecha(-1, 'Motivo anterior', 'M15 5l-7 7 7 7') +
        flecha(1,  'Motivo siguiente', 'M9 5l7 7-7 7');
      const botones = $$('.labs-flecha', whyNav);

      let actual = 0, aLaVista = false;

      /* El contador de un motivo arranca cuando ese motivo se ve, no al
         cargar: si no, los tres escondidos se contaban solos y al llegar
         a ellos ya estaban en su cifra final. */
      function cuenta(i) {
        if (!aLaVista) return;
        $$('.counter', motivos[i]).forEach((c) => {
          if (c.dataset.contado) return;
          c.dataset.contado = '1';
          runCounter(c);
        });
      }

      function muestra(i) {
        actual = Math.max(0, Math.min(i, motivos.length - 1));
        motivos.forEach((m, k) => m.classList.toggle('is-activa', k === actual));
        // Como en laboratorios: en los extremos la flecha se apaga pero
        // se queda en su sitio, para que la pareja no baile.
        botones[0].disabled = actual <= 0;
        botones[1].disabled = actual >= motivos.length - 1;
        cuenta(actual);
      }

      botones.forEach((b) => b.addEventListener('click', () => {
        muestra(actual + Number(b.dataset.dir));
      }));

      muestra(0);

      const whyIO = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          aLaVista = true;
          cuenta(actual);
          whyIO.unobserve(en.target);
        });
      }, { threshold: 0.35 });
      whyIO.observe(whyEscena);
    }
  }

    /* ============================================================
     6. ¿POR QUÉ ELEGIR SISE? — panel con carril horizontal
     ============================================================
     El video y las tarjetas de los laboratorios van en una fila. En
     escritorio el panel se queda fijo y el scroll la desplaza (lo hace
     el CSS); aqui solo se pinta, se mide cuanto tiene que viajar y se
     abre cada laboratorio en la ventana compartida (7d). */
  const pqSeccion = $('#porque');
  const pqCarril  = $('#pqCarril');
  const PQ = (typeof PORQUE_SLIDES !== 'undefined') ? PORQUE_SLIDES
           : (typeof PORQUE_IMGS !== 'undefined') ? PORQUE_IMGS : [];

  if (pqSeccion && pqCarril) {
    // "Aulas equipadas" no va en el carril: solo laboratorios
    const slides = PQ.map((s) => (typeof s === 'string' ? { img: s } : s))
                     .filter((s) => s.enPorque !== false);
    const videoView = $('#pqVideoView');
    const pqCaja = $('#pqCaja');
    const pqPin  = $('.pq-pin', pqSeccion);
    const dos = (n) => String(n).padStart(2, '0');

    /* --- Video: portada propia, sin autoplay --- */
    const idYT    = videoView.dataset.yt;
    const poster  = $('#pqPoster', videoView);
    const btnPlay = $('#pqPlay', videoView);
    if (poster) {
      poster.style.backgroundImage =
        `url('https://i.ytimg.com/vi/${idYT}/maxresdefault.jpg'),` +
        `url('https://i.ytimg.com/vi/${idYT}/hqdefault.jpg')`;
    }

    let ytCargado = false;
    function cargaYT() {
      if (ytCargado) return; ytCargado = true;
      const f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + idYT +
        '?autoplay=1&playsinline=1&rel=0&modestbranding=1&controls=1&enablejsapi=1';
      f.allow = 'autoplay; encrypted-media; picture-in-picture';
      f.setAttribute('allowfullscreen', '');
      f.title = 'Video SISE';
      videoView.insertBefore(f, videoView.firstChild);
      if (poster) poster.remove();
      if (btnPlay) btnPlay.remove();
    }
    // Abrir un laboratorio pausa el video si estaba sonando
    function pausaYT() {
      const f = ytCargado && videoView.querySelector('iframe');
      if (f && f.contentWindow) f.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'pauseVideo', args: '' }), '*');
    }
    if (btnPlay) btnPlay.addEventListener('click', cargaYT);

    /* --- Tarjetas --- */
    pqCarril.insertAdjacentHTML('beforeend', slides.map((s, i) => `
      <button class="pq-lab" type="button" data-i="${i}"
              aria-label="Ver ${esc(s.titulo || 'laboratorio')} en grande">
        <span class="pq-lab-foto" ${attrFondo(s.imgMovil || s.img, false)}></span>
        <span class="pq-texto">
          <span class="pq-nombre">${esc(s.titulo || '')}</span>
          ${s.texto ? `<span class="pq-desc">${esc(s.texto)}</span>` : ''}
        </span>
      </button>`).join(''));
    observarNuevos(pqCarril);

    /* --- Cuanto tiene que viajar la fila ---
       Es el ancho de la fila menos el hueco visible. De ese numero
       salen el alto del recorrido y el final de la animacion. Se
       recalcula si cambia el tamano: en escritorio las tarjetas se
       miden por el alto de pantalla. */
    pqSeccion.classList.add('is-carril');
    const fijo = () => getComputedStyle(pqPin).position === 'sticky';
    function mideViaje() {
      const cs = getComputedStyle(pqCaja);
      const visible = pqCaja.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const viaje = Math.max(0, Math.round(pqCarril.offsetWidth - visible));
      pqSeccion.style.setProperty('--pq-dist', viaje + 'px');
      return viaje;
    }
    mideViaje();
    if ('ResizeObserver' in window) new ResizeObserver(mideViaje).observe(pqCarril);
    window.addEventListener('resize', mideViaje, { passive: true });

    /* Deslizamiento con el dedo (movil): la barra de la guia y el fondo
       siguen a la fila. Cuanto se ve de la fila y cuanto se ha
       recorrido van en dos variables que usa el CSS. */
    const pqPanel = $('.pq-panel', pqSeccion);
    let pqTick = false;
    function sigueFila() {
      pqTick = false;
      const total = pqCaja.scrollWidth, visto = pqCaja.clientWidth;
      const rango = Math.max(1, total - visto);
      pqPanel.style.setProperty('--pq-vista', Math.min(1, visto / total).toFixed(3));
      pqPanel.style.setProperty('--pq-prog', Math.min(1, pqCaja.scrollLeft / rango).toFixed(3));
      if (pqCaja.scrollLeft > 8) pqPanel.classList.add('is-movida');
    }
    pqCaja.addEventListener('scroll', () => {
      if (!pqTick) { pqTick = true; requestAnimationFrame(sigueFila); }
    }, { passive: true });
    sigueFila();
    window.addEventListener('resize', sigueFila, { passive: true });

    /* Con teclado, una tarjeta que aun no ha llegado estaria fuera de la
       ventana: se baja la pagina lo justo para traerla. */
    pqCarril.addEventListener('focusin', (e) => {
      const t = e.target.closest('.pq-lab, .pq-video, .pq-play');
      if (!t || !fijo()) return;
      const tarjeta = t.closest('.pq-lab, .pq-video');
      const cs = getComputedStyle(pqCaja);
      const visible = pqCaja.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const viaje = mideViaje();
      const hace = Math.min(viaje, Math.max(0, tarjeta.offsetLeft + tarjeta.offsetWidth - visible));
      // el tramo fijo empieza donde empieza el recorrido, no la seccion
      const inicio = $('.pq-recorrido', pqSeccion).getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: inicio + hace, behavior: 'instant' });
    });

    /* --- Laboratorio en grande, en la ventana compartida ---
       vModal, vCaja, vCerrar y vDesde se declaran en 7d: aqui solo se
       usan al pulsar, cuando ya existen. */
    const flechaNav = (dir, etiqueta, d) =>
      `<button class="labs-flecha" type="button" data-dir="${dir}" aria-label="${etiqueta}">
         <svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d}" fill="none"
              stroke="currentColor" stroke-width="2.2" stroke-linecap="round"
              stroke-linejoin="round"/></svg>
       </button>`;
    let actual = 0;

    function pintaEspacio(i) {
      actual = (i + slides.length) % slides.length;
      const s = slides[actual];
      const foto = $('.vm-foto', vCaja);
      foto.src = s.img;
      foto.alt = s.titulo || '';
      $('.pq-now-name', vCaja).textContent = s.titulo || '';
      $('.pq-now-count', vCaja).textContent = dos(actual + 1) + ' / ' + dos(slides.length);
      $('.pq-now-desc', vCaja).textContent = s.texto || '';
      vModal.setAttribute('aria-label', s.titulo || 'Laboratorio SISE');
    }

    function abreEspacio(i, desde) {
      if (!vModal || !vCaja) return;
      pausaYT();
      vDesde = desde;
      vCaja.classList.remove('vm-caja--ancha');
      vCaja.classList.add('vm-caja--foto');
      vCaja.innerHTML = `
        <img class="vm-foto" alt="" decoding="async">
        <div class="vm-pie">
          <div class="vm-pie-txt">
            <p class="pq-now"><span class="pq-now-name"></span><span class="pq-now-count"></span></p>
            <p class="pq-now-desc"></p>
          </div>
          <div class="vm-pie-acc">
            <a class="btn btn-pill pq-cta" href="#contacto">Agenda tu visita
              <svg class="ico-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7m0 0H9m8 0v8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <div class="vm-nav">
              ${flechaNav(-1, 'Laboratorio anterior', 'M15 5l-7 7 7 7')}
              ${flechaNav(1, 'Laboratorio siguiente', 'M9 5l7 7-7 7')}
            </div>
          </div>
        </div>`;
      $$('.vm-nav .labs-flecha', vCaja).forEach((b) => b.addEventListener('click', () => {
        pintaEspacio(actual + Number(b.dataset.dir));
      }));
      // El boton lleva al pie de pagina: la ventana tiene que irse
      $('.pq-cta', vCaja).addEventListener('click', cierraVideo);
      pintaEspacio(i);
      vModal.hidden = false;
      document.body.style.overflow = 'hidden';
      vCerrar.focus();
    }

    pqCarril.addEventListener('click', (e) => {
      const b = e.target.closest('.pq-lab');
      if (b) abreEspacio(parseInt(b.dataset.i, 10), b);
    });

    // Con un laboratorio abierto, las flechas del teclado pasan de foto
    document.addEventListener('keydown', (e) => {
      if (!vModal || vModal.hidden || !vCaja.classList.contains('vm-caja--foto')) return;
      if (e.key === 'ArrowRight') pintaEspacio(actual + 1);
      if (e.key === 'ArrowLeft')  pintaEspacio(actual - 1);
    });
  }

  /* ============================================================
     7. SEDES — clic cambia la foto de fondo
     ============================================================ */
  const sedeChips = $('#sedeChips');
  const sedeInfo  = $('#sedeInfo');
  const sedeMapa  = $('#sedeMapa');

  if (sedeChips && sedeInfo && sedeMapa && typeof SEDES !== 'undefined' && SEDES.length) {
    const contacto = (typeof SEDE_CONTACTO !== 'undefined') ? SEDE_CONTACTO : {};

    const consulta = (s) => 'SISE ' + s.nombre + ', ' + s.dir + ', Lima, Peru';
    /* El mapa incrustado no necesita clave de API: es el buscador de
       Maps en modo embed. Si una sede trae "mapa" propio, manda ese. */
    const mapsEmbed = (s) => s.mapa ||
      ('https://www.google.com/maps?q=' + encodeURIComponent(consulta(s)) + '&z=16&hl=es&output=embed');

    sedeChips.innerHTML = SEDES.map((s, i) =>
      `<button class="chip" type="button" role="tab" aria-selected="false"
               aria-controls="sedeInfo" data-sede="${i}">${esc(s.nombre)}</button>`).join('');
    const chips = $$('[data-sede]', sedeChips);

    /* En movil las 12 pastillas ocupan media pantalla, asi que ahi se
       usa un desplegable nativo: abre el selector del propio sistema,
       que es lo comodo con el pulgar. Los dos conviven en el DOM y el
       CSS ensena uno u otro; pintaSede mantiene sincronizados ambos. */
    /* Se declara aqui arriba a proposito: montaSedeSelect() se llama
       unas lineas mas abajo pero antes de su propio bloque, y con la
       declaracion alli dentro la asignacion caia en la zona muerta del
       let ("Cannot access before initialization"). */
    let sincroSedeBtn = null;

    const sedeSelect = $('#sedeSelect');
    if (sedeSelect) {
      const zonas = (typeof ZONAS_SEDE !== 'undefined') ? ZONAS_SEDE : [];
      const porZona = zonas.filter((z) => SEDES.some((s) => s.zona === z));
      const sueltas = SEDES.filter((s) => porZona.indexOf(s.zona) === -1);

      sedeSelect.innerHTML =
        porZona.map((z) => `
          <optgroup label="${esc(z)}">
            ${SEDES.map((s, i) => s.zona === z
              ? `<option value="${i}">Sede ${esc(s.nombre)}</option>` : '').join('')}
          </optgroup>`).join('') +
        sueltas.map((s) => `<option value="${SEDES.indexOf(s)}">Sede ${esc(s.nombre)}</option>`).join('');

      sedeSelect.addEventListener('change', () => pintaSede(parseInt(sedeSelect.value, 10)));
      montaSedeSelect();
    }

    /* ---- Desplegable de sede a medida ----
       Mismo componente que los campos del formulario. El <select> se
       queda debajo guardando el valor; el CSS lo esconde solo cuando
       este ya esta montado. */
    function montaSedeSelect() {
      const caja = sedeSelect.closest('.sede-caja');
      if (!caja || caja.querySelector('.sede-btn')) return;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'sede-btn';
      btn.setAttribute('role', 'combobox');
      btn.setAttribute('aria-haspopup', 'listbox');
      btn.setAttribute('aria-expanded', 'false');
      btn.innerHTML = '<span class="sel-val"></span>';

      const rotulo = $('.sede-q');
      if (rotulo) {
        rotulo.id = rotulo.id || 'sedeQ';
        btn.setAttribute('aria-labelledby', rotulo.id);
      }

      const lista = document.createElement('div');
      lista.className = 'sel-list sede-list';
      lista.id = 'sedeLista';
      lista.setAttribute('role', 'listbox');
      btn.setAttribute('aria-controls', lista.id);

      /* La lista conserva los grupos por zona del <select>: con doce
         sedes seguidas cuesta encontrar la propia. */
      const pinto = (o, i) =>
        `<div class="sel-opt" role="option" id="sede-o${i}" data-val="${esc(o.value)}"
              aria-selected="false">${esc(o.textContent)}</div>`;
      let n = 0, html = '';
      Array.from(sedeSelect.children).forEach((hijo) => {
        if (hijo.tagName === 'OPTGROUP') {
          html += `<p class="sel-group">${esc(hijo.label)}</p>`;
          Array.from(hijo.children).forEach((o) => { html += pinto(o, n++); });
        } else {
          html += pinto(hijo, n++);
        }
      });
      lista.innerHTML = html;

      caja.append(btn, lista);
      caja.classList.add('is-custom');
      sedeSelect.setAttribute('tabindex', '-1');
      sedeSelect.setAttribute('aria-hidden', 'true');

      const items = $$('.sel-opt', lista);
      let abierto = false, marcado = -1;

      function pinta() {
        const v = sedeSelect.value;
        const elegido = items.find((it) => it.dataset.val === v);
        btn.querySelector('.sel-val').textContent = elegido ? elegido.textContent : '';
        items.forEach((it) => it.setAttribute('aria-selected', String(it === elegido)));
      }
      sincroSedeBtn = pinta;

      function marca(i) {
        if (!items.length) return;
        marcado = Math.max(0, Math.min(i, items.length - 1));
        items.forEach((it, k) => it.classList.toggle('is-on', k === marcado));
        btn.setAttribute('aria-activedescendant', items[marcado].id);
        items[marcado].scrollIntoView({ block: 'nearest' });
      }

      function abre() {
        if (abierto) return;
        abierto = true;
        caja.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        marca(Math.max(0, items.findIndex((it) => it.dataset.val === sedeSelect.value)));
      }

      function cierra(devolverFoco) {
        if (!abierto) return;
        abierto = false;
        caja.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        btn.removeAttribute('aria-activedescendant');
        if (devolverFoco) btn.focus();
      }

      function elige(i) {
        if (!items[i]) return;
        sedeSelect.value = items[i].dataset.val;
        pintaSede(parseInt(items[i].dataset.val, 10));
        cierra(true);
      }

      btn.addEventListener('click', () => (abierto ? cierra(false) : abre()));
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          if (!abierto) return abre();
          marca(marcado + (e.key === 'ArrowDown' ? 1 : -1));
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          abierto ? elige(marcado) : abre();
        } else if (e.key === 'Escape') {
          cierra(true);
        } else if (e.key === 'Home' || e.key === 'End') {
          if (abierto) { e.preventDefault(); marca(e.key === 'Home' ? 0 : items.length - 1); }
        } else if (e.key.length === 1) {
          // Busqueda por la primera letra, como en el <select> nativo
          const t = e.key.toLowerCase();
          const desde = marcado + 1;
          const orden = items.slice(desde).concat(items.slice(0, desde));
          const hit = orden.find((it) =>
            it.textContent.trim().toLowerCase().replace(/^sede /, '').startsWith(t));
          if (hit) { if (!abierto) abre(); marca(items.indexOf(hit)); }
        }
      });

      /* mousedown y no click: el click llega despues del blur del boton
         y para entonces la lista ya se habria cerrado. */
      lista.addEventListener('mousedown', (e) => {
        const it = e.target.closest('.sel-opt');
        if (it) { e.preventDefault(); elige(items.indexOf(it)); }
      });
      lista.addEventListener('mousemove', (e) => {
        const it = e.target.closest('.sel-opt');
        if (it) marca(items.indexOf(it));
      });
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.sede-caja')) cierra(false);
      });

      pinta();
    }

    let mapaListo = false;   // el iframe solo se crea cuando hace falta

    function pintaSede(i) {
      const s = SEDES[i];
      if (!s) return;

      chips.forEach((c, k) => {
        const on = k === i;
        c.classList.toggle('is-active', on);
        c.setAttribute('aria-selected', String(on));
      });
      if (sedeSelect) sedeSelect.value = String(i);
      if (sincroSedeBtn) sincroSedeBtn();

      const hor = s.horario || contacto.horario || [];

      sedeInfo.innerHTML = `
        <div class="sede-foto${s.img ? '' : ' sede-foto-vacia'}" ${s.img ? attrFondo(imgDe(s), false) : ''}></div>
        <div class="sede-datos">
          <h3 class="sede-nombre">Sede ${esc(s.nombre)}</h3>
          <p class="sede-dato">
            <span class="sede-dato-ico" aria-hidden="true">${ico('pin')}</span>
            <span>${esc(s.dir)}</span>
          </p>
          ${hor.length ? `
          <div class="sede-dato">
            <span class="sede-dato-ico" aria-hidden="true">${ico('calendario')}</span>
            <span>
              <b>Horario de atenci&oacute;n:</b>
              ${hor.map((h) => `<span class="sede-hora">${esc(h)}</span>`).join('')}
            </span>
          </div>` : ''}
        </div>`;
      observarNuevos(sedeInfo);

      if (mapaListo) {
        sedeMapa.querySelector('iframe').src = mapsEmbed(s);
      } else {
        sedeMapa.dataset.src = mapsEmbed(s);
      }
    }

    /* El mapa pesa y son 12: no se carga ninguno hasta que la seccion
       esta a punto de verse. Con el barrido por scroll y no con un
       IntersectionObserver, por lo mismo que el resto de la pagina:
       tambien cubre el caso de llegar aqui de un salto de ancla. */
    function cargaMapa() {
      if (mapaListo) return;
      const r = sedeMapa.getBoundingClientRect();
      if (r.top > window.innerHeight * 1.2) return;
      mapaListo = true;
      const f = document.createElement('iframe');
      f.src = sedeMapa.dataset.src;
      f.title = 'Mapa de la sede';
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.setAttribute('allowfullscreen', '');
      sedeMapa.appendChild(f);
      window.removeEventListener('scroll', cargaMapa);
    }
    window.addEventListener('scroll', cargaMapa, { passive: true });
    window.addEventListener('resize', cargaMapa, { passive: true });
    window.addEventListener('load', cargaMapa);

    sedeChips.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-sede]');
      if (btn) pintaSede(parseInt(btn.dataset.sede, 10));
    });
    // Flechas para moverse entre sedes con el teclado
    sedeChips.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const actual = chips.findIndex((c) => c.classList.contains('is-active'));
      const paso = e.key === 'ArrowRight' ? 1 : -1;
      const sig = (actual + paso + chips.length) % chips.length;
      e.preventDefault();
      pintaSede(sig);
      chips[sig].focus();
    });

    // Sede por defecto: por nombre, o el indice si aun es un numero
    let inicial = 0;
    if (typeof SEDE_INICIAL !== 'undefined') {
      inicial = (typeof SEDE_INICIAL === 'string')
        ? SEDES.findIndex((s) => s.nombre === SEDE_INICIAL)
        : SEDE_INICIAL;
    }
    if (inicial < 0 || inicial >= SEDES.length) inicial = 0;
    pintaSede(inicial);
    cargaMapa();
  }

  /* ============================================================
     7b. PAGINA DE CARRERA — acordeon de malla + video egresado
     ============================================================ */
  /* Un ano abierto cada vez: con varios desplegados a la vez la seccion
     crecia hasta tres pantallas y se perdia la comparacion entre anos,
     que es para lo que uno mira una malla. */
  $$('.malla-toggle').forEach((btn, _, todos) => {
    btn.addEventListener('click', () => {
      const y = btn.closest('.malla-year');
      const open = !y.classList.contains('is-open');
      todos.forEach((otro) => {
        const suyo = otro.closest('.malla-year');
        suyo.classList.remove('is-open');
        otro.setAttribute('aria-expanded', 'false');
      });
      y.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  /* ---- Pestanas genericas ----
     Cualquier grupo marcado con data-tabs: cada boton enseña el panel
     que dice su aria-controls y esconde los demas. Se lleva tambien el
     foco por teclado -flechas- porque un tablist sin eso obliga a
     tabular por todas las pestanas una a una. */
  $$('[data-tabs]').forEach((grupo) => {
    const botones = $$('[role="tab"]', grupo);
    if (botones.length < 2) return;

    function activa(btn, mueveFoco) {
      botones.forEach((o) => {
        const on = o === btn;
        o.classList.toggle('is-active', on);
        o.setAttribute('aria-selected', String(on));
        o.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(o.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
      if (mueveFoco) btn.focus();
    }

    botones.forEach((b, i) => {
      b.addEventListener('click', () => activa(b, false));
      b.addEventListener('keydown', (e) => {
        const salto = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!salto) return;
        e.preventDefault();
        activa(botones[(i + salto + botones.length) % botones.length], true);
      });
    });
  });

  /* Conmutador de modalidad de la ficha: cambia el dato rápido y deja
     el valor listo en el formulario, que vive en la columna pegajosa. */
  const carModos = $('.car-modos');
  if (carModos) {
    const opciones = $$('.mod-opt', carModos);
    opciones.forEach((opt) => {
      opt.addEventListener('click', () => {
        opciones.forEach((o) => {
          o.classList.remove('is-on');
          o.setAttribute('aria-checked', 'false');
        });
        opt.classList.add('is-on');
        opt.setAttribute('aria-checked', 'true');

        const modo = opt.querySelector('span').textContent.trim();
        const oculto = $('#f-modalidad');
        // setAttribute además de .value: así el form.reset() posterior al
        // envío no devuelve la modalidad a la que venía en el HTML.
        if (oculto) { oculto.value = modo; oculto.setAttribute('value', modo); }
        const dato = $('[data-fact="modalidad"]');
        if (dato) dato.textContent = modo;
      });
    });
  }

  const egr = $('#egrVideo');
  if (egr) {
    const play = $('.egr-play', egr);
    if (play) play.addEventListener('click', () => abreVideo(egr));
  }

  /* ============================================================
     7c. CONVENIOS - dos columnas verticales
     ============================================================
     Los logos se reparten en dos columnas que corren en sentidos
     opuestos. Cada columna lleva su lista DOS veces y el CSS la
     desplaza justo la mitad: al terminar, la segunda copia esta donde
     arranco la primera y el ciclo no tiene costura. Para que esa mitad
     sea exacta, la separacion entre tarjetas va con margin y no con
     gap: el gap de una rejilla no se reparte igual entre las dos
     copias y el bucle daria un salto. */
  const convA = $('#convTrackA');
  const convB = $('#convTrackB');

  if (convA && convB && typeof CONVENIOS !== 'undefined' && CONVENIOS.length) {
    /* Se pinta primero el nombre y solo se cambia por el logo cuando la
       imagen ha cargado de verdad. Al reves (imagen y si falla, texto)
       el navegador enseña un instante el icono de imagen rota. */
    function itemConvenio(c) {
      const item = document.createElement('div');
      item.className = 'conv-item';

      const txt = document.createElement('span');
      txt.className = 'conv-word';
      txt.textContent = c.nombre;
      item.appendChild(txt);

      const img = new Image();
      img.alt = c.nombre;
      img.decoding = 'async';
      img.addEventListener('load', () => txt.replaceWith(img));
      img.src = c.img;

      return item;
    }

    const mitad = Math.ceil(CONVENIOS.length / 2);
    const grupos = [CONVENIOS.slice(0, mitad), CONVENIOS.slice(mitad)];

    [convA, convB].forEach((track, i) => {
      const lista = grupos[i];
      if (!lista.length) return;
      // Dos pasadas: la segunda solo decora, no se lee dos veces
      lista.forEach((c) => track.appendChild(itemConvenio(c)));
      const copia = document.createElement('div');
      copia.style.display = 'contents';
      copia.setAttribute('aria-hidden', 'true');
      lista.forEach((c) => copia.appendChild(itemConvenio(c)));
      track.appendChild(copia);
      // Mismo ritmo por tarjeta en las dos columnas, tengan las que tengan
      track.style.animationDuration = (lista.length * 5.2) + 's';
    });
  }

  /* Rejilla de convenios de la ficha de carrera: misma fuente de datos.
     Se arma por DOM y no con innerHTML para poder colgar el mismo
     respaldo de 'si el logo no carga, queda el nombre' sin meter un
     onerror en linea con el texto interpolado dentro. */
  const convGrid = $('#convGrid');
  if (convGrid && typeof CONVENIOS !== 'undefined') {
    convGrid.innerHTML = '';

    function cajaConvenio(c) {
      const caja = document.createElement('div');
      caja.className = 'conv-logo';
      caja.textContent = c.nombre;
      const img = new Image();
      img.alt = c.nombre;
      img.addEventListener('load', () => { caja.textContent = ''; caja.appendChild(img); });
      img.src = c.img;
      return caja;
    }

    CONVENIOS.forEach((c) => convGrid.appendChild(cajaConvenio(c)));
    /* Segunda pasada solo para que el bucle no tenga costura: se oculta
       a los lectores de pantalla para que no lea la lista dos veces. */
    const copia = document.createElement('div');
    copia.style.display = 'contents';
    copia.setAttribute('aria-hidden', 'true');
    CONVENIOS.forEach((c) => copia.appendChild(cajaConvenio(c)));
    convGrid.appendChild(copia);
    // Mismo ritmo por logo, tenga los que tenga la lista
    convGrid.style.animationDuration = (CONVENIOS.length * 2.9) + 's';
  }

  /* ============================================================
     8. EXPERIENCIAS REALES — Shorts de YouTube (carga diferida)
     ============================================================ */
  /* ============================================================
     7d. VISOR DE VIDEO (compartido)
     ============================================================
     Una sola ventana para toda la web. Estaba metida dentro del bloque
     de Experiencias, que solo existe en el inicio, asi que la ficha de
     carrera no podia usarla y tenia su propio incrustado dentro de la
     tarjeta. En movil ese incrustado se quedaba en blanco.

     Abrir en ventana tiene ademas dos ventajas: solo hay un iframe a la
     vez, y el video se ve al tamano que pide en vez de dentro de un
     hueco de tarjeta. */
  const vModal  = $('#videoModal');
  const vCaja   = $('#vmCaja');
  const vCerrar = $('#vmCerrar');
  let vDesde = null;   // a donde devolver el foco al cerrar

  function abreVideo(box) {
    if (!vModal || !vCaja) return;
    vDesde = box;
    const id = box.dataset.yt;
    // 9:16 para los Shorts, 16:9 para lo demas
    vCaja.classList.toggle('vm-caja--ancha', box.dataset.forma === 'ancha');
    vCaja.classList.remove('vm-caja--foto');
    vModal.setAttribute('aria-label', 'Video');
    const f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) +
            '?autoplay=1&rel=0&playsinline=1';
    f.title = 'Testimonio SISE';
    f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    f.allowFullscreen = true;
    vCaja.innerHTML = '';
    vCaja.appendChild(f);
    vModal.hidden = false;
    document.body.style.overflow = 'hidden';
    vCerrar.focus();
  }

  function cierraVideo() {
    if (!vModal || vModal.hidden) return;
    vModal.hidden = true;
    vCaja.innerHTML = '';          // quitar el iframe corta el sonido
    vCaja.classList.remove('vm-caja--foto');
    document.body.style.overflow = '';
    if (vDesde) { vDesde.focus(); vDesde = null; }
  }

  if (vModal) {
    vCerrar.addEventListener('click', cierraVideo);
    // Pulsar el fondo cierra; pulsar el video, no
    vModal.addEventListener('click', (e) => { if (e.target === vModal) cierraVideo(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') cierraVideo();
    });
  }

  const expGrid = $('#expGrid');

  if (expGrid && typeof EXPERIENCIAS !== 'undefined') {
    /* Portada del Short en su proporcion original (1080x1920). Se pide
       "oar2" y no "oardefault": son la misma imagen, pero hay Shorts
       para los que oardefault devuelve un marcador gris de 120x90 en
       vez del fotograma (le pasa a -eFUfCDzb_U). */
    const portada = (t) => imgDe(t, 'poster') ||
      ('https://i.ytimg.com/vi/' + encodeURIComponent(t.ytid) + '/oar2.jpg');

    expGrid.innerHTML = EXPERIENCIAS.map((t) => `
      <article class="exp-card">
        <div class="exp-media" role="button" tabindex="0"
             data-yt="${esc(t.ytid)}"
             aria-label="Reproducir: ${esc(t.titulo || 'testimonio SISE')}"
             ${attrFondo(portada(t), false)}>
          <span class="exp-play">${ico('shorts')}</span>
          ${t.titulo ? `<p class="exp-titulo">${esc(t.titulo)}</p>` : ''}
        </div>
      </article>`).join('');
    observarNuevos(expGrid);

    const playVideo = abreVideo;

    /* Pulsa la tarjeta entera, no solo la miniatura: es lo que el raton
       espera de una tarjeta y ademas da mas superficie en movil. El
       foco de teclado sigue viviendo en .exp-media, que es la que
       anuncia la accion. */
    expGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.exp-card');
      if (card) playVideo($('.exp-media', card));
    });
    expGrid.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const box = e.target.closest('.exp-media');
      if (!box) return;
      e.preventDefault();
      playVideo(box);
    });
  }

  /* ============================================================
     9. NOVEDADES — pestañas Blog / Eventos
     ============================================================ */
  const newsGrid = $('#newsGrid');

  function renderNews(kind) {
    const list = (NOVEDADES && NOVEDADES[kind]) || [];
    newsGrid.innerHTML = list.map((n, i) => `
      <a class="news-card" href="${esc(n.url || '#')}" style="animation-delay:${i * 70}ms">
        <div class="news-media">
          <div class="news-thumb" ${attrFondo(imgDe(n), false)}></div>
          <span class="news-go" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M8 16 16 8m0 0H9.5M16 8v6.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
        </div>
        <div class="news-body">
          <h3 class="news-title">${esc(n.titulo)}</h3>
          <p class="news-excerpt">${esc(n.extracto)}</p>
          <span class="news-tag">${esc(n.tag)}</span>
        </div>
      </a>`).join('');
    observarNuevos(newsGrid);
  }

  if (newsGrid && typeof NOVEDADES !== 'undefined') {
    renderNews('blog');
    $$('.chips [data-news]').forEach((btn) => {
      btn.addEventListener('click', () => {
        $$('.chips [data-news]').forEach((b) => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');
        renderNews(btn.dataset.news);
      });
    });
  }

  /* ============================================================
     10. FORMULARIO — opciones dinámicas + validación
     ============================================================ */
  const form = $('#leadForm');

  if (form) {
    /* Marco con muesca: un <fieldset>/<legend> por campo. El navegador
       recorta el borde superior justo donde va la etiqueta, así no hace
       falta taparlo con un parche de color (la tarjeta es translúcida). */
    $$('.field', form).forEach((f) => {
      const label = f.querySelector('label');
      if (!label || f.querySelector('.notch')) return;
      const fs = document.createElement('fieldset');
      fs.className = 'notch';
      fs.setAttribute('aria-hidden', 'true');
      const lg = document.createElement('legend');
      const sp = document.createElement('span');
      sp.innerHTML = label.innerHTML;
      lg.appendChild(sp);
      fs.appendChild(lg);
      f.appendChild(fs);
    });

    /* ---- Desplegables a medida ----
       El <select> nativo no permite dar estilo a su lista de opciones,
       así que se oculta (sigue siendo el que guarda el valor y el que
       valida) y encima se monta un listbox propio. */
    function montarSelect(sel) {
      const field = sel.closest('.field');
      if (!field || field.querySelector('.sel-btn')) return;

      sel.setAttribute('tabindex', '-1');
      sel.setAttribute('aria-hidden', 'true');

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'sel-btn';
      btn.setAttribute('role', 'combobox');
      btn.setAttribute('aria-haspopup', 'listbox');
      btn.setAttribute('aria-expanded', 'false');
      const lbl = field.querySelector('label');
      if (lbl) btn.setAttribute('aria-labelledby', (lbl.id = lbl.id || sel.id + '-lbl'));
      btn.innerHTML = '<span class="sel-val"></span>';
      sel.insertAdjacentElement('afterend', btn);

      const list = document.createElement('div');
      list.className = 'sel-list';
      list.setAttribute('role', 'listbox');
      list.id = sel.id + '-list';
      btn.setAttribute('aria-controls', list.id);
      field.appendChild(list);

      const opciones = Array.from(sel.options).filter((o) => o.value !== '');
      list.innerHTML = opciones.map((o, i) =>
        `<div class="sel-opt" role="option" id="${sel.id}-o${i}" data-val="${esc(o.value)}" aria-selected="false">${esc(o.textContent)}</div>`
      ).join('');
      const items = Array.from(list.children);

      let abierto = false, marcado = -1;

      function pinta() {
        const v = sel.value;
        btn.querySelector('.sel-val').textContent = v;
        field.classList.toggle('is-filled', !!v);
        items.forEach((it) => it.setAttribute('aria-selected', String(it.dataset.val === v)));
      }

      function marca(i) {
        if (!items.length) return;
        marcado = Math.max(0, Math.min(i, items.length - 1));
        items.forEach((it, k) => it.classList.toggle('is-on', k === marcado));
        btn.setAttribute('aria-activedescendant', items[marcado].id);
        items[marcado].scrollIntoView({ block: 'nearest' });
      }

      function abre() {
        if (abierto) return;
        cerrarTodos();
        abierto = true;
        field.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        marca(Math.max(0, items.findIndex((it) => it.dataset.val === sel.value)));
      }

      function cierra(devolverFoco) {
        if (!abierto) return;
        abierto = false;
        field.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        btn.removeAttribute('aria-activedescendant');
        if (devolverFoco) btn.focus();
      }

      function elige(i) {
        if (!items[i]) return;
        sel.value = items[i].dataset.val;
        sel.dispatchEvent(new Event('change', { bubbles: true }));
        pinta();
        cierra(true);
      }

      btn.addEventListener('click', () => (abierto ? cierra(false) : abre()));
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          if (!abierto) return abre();
          marca(marcado + (e.key === 'ArrowDown' ? 1 : -1));
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          abierto ? elige(marcado) : abre();
        } else if (e.key === 'Escape') {
          cierra(true);
        } else if (e.key === 'Home' || e.key === 'End') {
          if (abierto) { e.preventDefault(); marca(e.key === 'Home' ? 0 : items.length - 1); }
        } else if (e.key.length === 1) {
          // Búsqueda por primera letra
          const t = e.key.toLowerCase();
          const desde = marcado + 1;
          const orden = items.slice(desde).concat(items.slice(0, desde));
          const hit = orden.find((it) => it.textContent.toLowerCase().startsWith(t));
          if (hit) { if (!abierto) abre(); marca(items.indexOf(hit)); }
        }
      });

      list.addEventListener('mousedown', (e) => {
        const it = e.target.closest('.sel-opt');
        if (it) { e.preventDefault(); elige(items.indexOf(it)); }
      });
      list.addEventListener('mousemove', (e) => {
        const it = e.target.closest('.sel-opt');
        if (it) marca(items.indexOf(it));
      });
      btn.addEventListener('blur', () => { if (!field.matches(':hover')) cierra(false); });

      field._cerrarSelect = () => cierra(false);
      pinta();
    }

    function cerrarTodos() {
      $$('.field.is-open', form).forEach((f) => f._cerrarSelect && f._cerrarSelect());
    }
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.field.is-open')) cerrarTodos();
    });

    // Selector de modalidad (Semipresencial / Virtual)
    const modInput = $('#f-modalidad');
    $$('.mod-opt', form).forEach((opt) => {
      opt.addEventListener('click', () => {
        $$('.mod-opt', form).forEach((o) => {
          o.classList.remove('is-on');
          o.setAttribute('aria-checked', 'false');
        });
        opt.classList.add('is-on');
        opt.setAttribute('aria-checked', 'true');
        if (modInput) modInput.value = opt.dataset.mod;
      });
    });

    const selSede = $('#f-sede');
    if (selSede && typeof SEDES !== 'undefined') {
      SEDES.forEach((s) => {
        const o = document.createElement('option');
        o.textContent = s.nombre;
        selSede.appendChild(o);
      });
    }

    const selCarrera = $('#f-carrera');
    if (selCarrera && typeof CARRERAS !== 'undefined') {
      CARRERAS.map((c) => c.nombre).sort((a, b) => a.localeCompare(b, 'es')).forEach((n) => {
        const o = document.createElement('option');
        o.textContent = n;
        selCarrera.appendChild(o);
      });
    }

    $$('.field select', form).forEach(montarSelect);

    // Solo dígitos en DNI y celular
    ['#f-dni', '#f-celular'].forEach((sel) => {
      const el = $(sel);
      if (el) el.addEventListener('input', () => { el.value = el.value.replace(/\D/g, ''); });
    });

    const msg = $('#formMsg');

    // Reglas propias por campo
    function fieldError(el) {
      const v = el.value.trim();
      if (el.type === 'checkbox') return el.checked ? '' : 'Debes aceptar la política de privacidad.';
      if (!v) return 'Completa este campo.';
      if (el.id === 'f-dni' && v.length !== 8) return 'El DNI debe tener 8 dígitos.';
      if (el.id === 'f-celular' && v.length !== 9) return 'El celular debe tener 9 dígitos.';
      return '';
    }

    /* El botón va siempre activo: apagado de salida parecía roto, y el
       que llega al formulario no sabía si el problema era suyo. Al
       enviar se señalan los campos que falten. */

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let firstBad = null;
      let firstMsg = '';

      $$('input[required], select[required]', form).forEach((el) => {
        const wrap = el.closest('.field') || el.closest('.check');
        const err = fieldError(el);
        if (wrap) wrap.classList.toggle('has-error', !!err);
        if (err && !firstBad) { firstBad = el; firstMsg = err; }
      });

      if (firstBad) {
        msg.textContent = firstMsg;
        msg.className = 'form-msg err';
        firstBad.focus();
        return;
      }

      // TODO: conectar aquí con el CRM / endpoint real.
      // fetch('/api/leads', { method:'POST', body: new FormData(form) })
      msg.textContent = '¡Gracias! Un asesor se comunicará contigo muy pronto.';
      msg.className = 'form-msg ok';
      form.reset();
      setTimeout(actualizaBoton, 0);
      // En la ficha de carrera el conmutador vive fuera del formulario:
      // si no hay ninguno dentro, el valor actual ya es el bueno.
      const modActiva = $('.mod-opt.is-on', form);
      if (modInput && modActiva) modInput.value = modActiva.dataset.mod;
      $$('.field select', form).forEach((sel) => {
        const f = sel.closest('.field');
        f.classList.remove('is-filled');
        f.querySelector('.sel-val').textContent = '';
        $$('.sel-opt', f).forEach((o) => o.setAttribute('aria-selected', 'false'));
      });
    });

    ['input', 'change'].forEach((ev) => {
      form.addEventListener(ev, (e) => {
        const wrap = e.target.closest('.field') || e.target.closest('.check');
        if (wrap) wrap.classList.remove('has-error');
      });
    });
  }

  /* ============================================================
     11. ICONOS ANIMADOS (Lottie)
     ============================================================
     El reproductor pesa 46 KB comprimido, así que se carga después
     de que la página esté lista: nunca bloquea el primer pintado.
     Los colores del JSON se ignoran; el CSS los pasa a currentColor
     para que el icono siga al botón (oscuro en reposo, blanco al
     pasar por encima).
     Va en bucle permanente, salvo con reduce-motion activado. */
  const lotties = $$('[data-lottie]');

  if (lotties.length) {
    const arranca = () => {
      if (typeof lottie === 'undefined') return;
      lotties.forEach((cont) => {
        const anim = lottie.loadAnimation({
          container: cont,
          renderer: 'svg',
          loop: true,
          autoplay: !reduceMotion,   // en bucle permanente
          path: cont.dataset.lottie
        });
        cont._anim = anim;

        // Se detiene mientras la pestaña no se ve: no gasta batería de balde
        document.addEventListener('visibilitychange', () => {
          if (reduceMotion) return;
          document.hidden ? anim.pause() : anim.play();
        });
      });
    };

    const cargaLottie = () => {
      if (typeof lottie !== 'undefined') return arranca();
      const sc = document.createElement('script');
      sc.src = 'assets/vendor/lottie_light.min.js';
      sc.onload = arranca;
      document.head.appendChild(sc);
    };

    /* 46 KB para un icono: se piden cuando el navegador esta ocioso, o
       antes si el raton o el teclado llegan al boton. */
    let pedido = false;
    const pideLottie = () => { if (!pedido) { pedido = true; cargaLottie(); } };
    lotties.forEach((c) => {
      const zona = c.closest('a, button') || c;
      zona.addEventListener('pointerenter', pideLottie, { once: true });
      zona.addEventListener('focusin', pideLottie, { once: true });
    });
    const enReposo = () => {
      if ('requestIdleCallback' in window) requestIdleCallback(pideLottie, { timeout: 4000 });
      else setTimeout(pideLottie, 2500);
    };
    if (document.readyState === 'complete') enReposo();
    else window.addEventListener('load', enReposo);
  }

  /* Repinta las rejillas al cruzar el punto de corte (imgMovil) */
  window.__repintarRejillas = () => {
    const chip = $('#areaChips .chip.is-active');
    if (typeof window.__render === 'function') window.__render(chip ? chip.dataset.filter : 'todas');
    const tab = $('.chips [data-news].is-active');
    if (newsGrid && typeof renderNews === 'function') renderNews(tab ? tab.dataset.news : 'blog');
  };

  /* ---------- Año del footer ---------- */
  const y = $('#year');
  if (y) y.textContent = new Date().getFullYear();
})();
