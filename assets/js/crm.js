/* ============================================================
   CRM — traduce el formulario y lo envia a Smart Sales
   ============================================================
   El formulario habla en nombres ("Gestión Logística", "Surco") y
   el CRM en codigos ("ADMLO", "SURCO"). Aqui se hace la traduccion
   y el envio; las tablas de equivalencias y los datos de campaña
   viven en data.js, bajo CRM, CRM_CARRERAS, CRM_SEDES y
   CRM_DISTRITOS, que es donde se editan sin tocar codigo.

   Ademas se recogen las señales que el CRM usa para priorizar el
   lead -si vio un video, si escribio por WhatsApp, si descargo la
   malla, cuanto bajo y cuanto tiempo estuvo-, porque el comercial
   no atiende igual a quien acaba de llegar que a quien lleva diez
   minutos mirando.

   Se expone una sola cosa: window.CRM_SISE.enviar(datos), que
   devuelve una promesa con {ok:true} o {ok:false, motivo}.
   ============================================================ */
(function () {
  'use strict';

  const cfg = (typeof CRM !== 'undefined') ? CRM : {};

  /* Sin tildes y en mayusculas: asi "Ate" encuentra "SEDE ATE" y
     "Diseño Gráfico" encuentra su codigo aunque venga escrito de
     otra manera. */
  function norm(t) {
    return String(t == null ? '' : t).trim().toUpperCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  /* ---------- Señales de interes ----------
     Cada una vale una vez. El CRM solo quiere saber si paso. */
  const senal = { video: false, whatsapp: false, brochure: false, scroll: false, tiempo: false };
  const abierto = Date.now();
  let cuantas = 0;

  function marca(clave) {
    if (senal[clave]) return;
    senal[clave] = true;
    cuantas++;
  }

  function escucha() {
    /* En captura y con un solo oyente: los flotantes y las tarjetas
       se pintan desde el guion y no existen todavia cuando esto
       corre. */
    document.addEventListener('click', function (e) {
      const t = e.target;
      if (t.closest('.floater-wa, .wa-op, [href*="wa.me"], [href*="api.whatsapp"]')) marca('whatsapp');
      if (t.closest('.egr-play, .egr-video, .exp-card, .pq-lab')) marca('video');
      if (t.closest('.malla-btn, [download]')) marca('brochure');
    }, true);

    const pie = document.querySelector('.site-footer');
    function alBajar() {
      if (!pie) return;
      if (window.scrollY + window.innerHeight >= pie.offsetTop) {
        marca('scroll');
        window.removeEventListener('scroll', alBajar);
      }
    }
    window.addEventListener('scroll', alBajar, { passive: true });

    // Tres minutos en la pagina ya es interes, aunque no toque nada
    setTimeout(function () { marca('tiempo'); }, 180000);
  }

  function prioridad() {
    if (cuantas >= 4) return '1';
    if (cuantas === 3) return '2';
    return '3';
  }

  function segundosEnPagina() {
    return Math.floor((Date.now() - abierto) / 1000);
  }

  /* ---------- Campaña ---------- */
  function utm() {
    const p = new URLSearchParams(location.search);
    const dame = (k) => (p.get(k) || '').toLowerCase();
    return {
      source: dame('utm_source'),
      medium: dame('utm_medium'),
      campaign: dame('utm_campaign'),
      term: dame('utm_term'),
      content: dame('utm_content')
    };
  }

  /* ---------- Traducciones ---------- */
  const UNIDADES = { SEMIPRESENCIAL: 'PRGS', VIRTUAL: 'CPEX' };

  function unidadDe(modalidad) {
    return UNIDADES[norm(modalidad)] || '';
  }

  /* La sede llega como "Surco" o como "Virtual"; en la tabla esta
     como "SEDE SURCO". */
  function codigoSede(sede) {
    const tabla = (typeof CRM_SEDES !== 'undefined') ? CRM_SEDES : {};
    const n = norm(sede);
    if (!n) return '';
    return tabla[n] || tabla['SEDE ' + n] || '';
  }

  function codigoDistrito(distrito) {
    const tabla = (typeof CRM_DISTRITOS !== 'undefined') ? CRM_DISTRITOS : {};
    return tabla[norm(distrito)] || '';
  }

  /* Devuelve el par de codigos de una carrera, buscandola sin
     tildes para que un acento de mas no deje el lead sin producto. */
  function fichaCarrera(nombre) {
    const tabla = (typeof CRM_CARRERAS !== 'undefined') ? CRM_CARRERAS : {};
    if (tabla[nombre]) return tabla[nombre];
    const n = norm(nombre);
    for (const clave in tabla) {
      if (norm(clave) === n) return tabla[clave];
    }
    return null;
  }

  function codigoProducto(carrera, unidad) {
    const ficha = fichaCarrera(carrera);
    if (!ficha) return '';
    return (unidad === 'CPEX' ? ficha.cpex : ficha.prgs) || '';
  }

  /* Que carreras tienen codigo en esa modalidad. Lo usa el
     formulario para no ofrecer una carrera que el CRM no puede
     registrar. */
  function carrerasDe(modalidad) {
    const tabla = (typeof CRM_CARRERAS !== 'undefined') ? CRM_CARRERAS : {};
    const unidad = unidadDe(modalidad);
    const fuera = [];
    for (const nombre in tabla) {
      const cod = unidad === 'CPEX' ? tabla[nombre].cpex : tabla[nombre].prgs;
      if (cod) fuera.push(nombre);
    }
    return fuera;
  }

  /* ---------- Envio ---------- */
  function arma(d) {
    const modalidad = d.modalidad || '';
    const unidad = unidadDe(modalidad);
    // En virtual la sede siempre es Virtual, la elija quien la elija
    const sede = norm(modalidad) === 'VIRTUAL' ? 'VIRTUAL' : (d.sede || '');
    const c = utm();
    const producto = codigoProducto(d.carrera, unidad);

    if (!producto && d.carrera) {
      console.warn('[CRM] Sin codigo de producto para "' + d.carrera +
                   '" en ' + (unidad || 'modalidad desconocida') +
                   '. El lead se envia sin producto.');
    }

    return {
      url: cfg.origen || '',
      Informe_Nombre: d.nombres || '',
      Informe_ApellidoPaterno: d.apellidos || '',
      Informe_NumDocumento: d.dni || '',
      Informe_TelefonoPrincipal: d.celular || '',
      Informe_AnnoEgreso: d.anio || '',
      /* PENDIENTE DE CONFIRMAR con Smart Sales: el nombre exacto del
         campo de correo. Si es otro, solo hay que cambiar esta clave. */
      Informe_Email: d.correo || '',
      Informe_RecibeInf: d.comerciales ? '1' : '0',
      comentario: d.comentario || '',
      evento_cod: cfg.evento || '',
      Sede_cod: codigoSede(sede),
      Producto_cod: producto,
      Unidad_cod: unidad,
      FuenteOr_cod: cfg.fuente || '',
      Periodo_cod: cfg.periodo || '',
      Motivo_Cod: cfg.motivo || '01',
      Informe_CodMig: '',
      Usuario_Id: 0,
      Curso_cod: '',
      Campaign_Source: c.source,
      Campaign_Medium: c.medium,
      Campaign_Name: c.campaign,
      Campaign_Term: c.term,
      Campaign_Content: c.content,
      DetalleFtOr_Nombre: cfg.detalleFuente || '',
      Colegio_IngresoPost: '',
      UbicGeog_Id: codigoDistrito(d.distrito),
      Informe_Modalidad: 'D',
      Informe_Prioridad: prioridad(),
      Clic_BotonWhatsapp: senal.whatsapp,
      Descarga_Brochure: senal.brochure,
      Tiempo_Pagina: segundosEnPagina(),
      Scroll_Depth: senal.scroll,
      Interaccion_Video: senal.video,
      Template_Plantilla: cfg.plantilla || ''
    };
  }

  /* Se espera la respuesta, al reves que la version anterior, que
     mandaba y daba las gracias sin mirar. Si el envio falla hay que
     poder decirselo al visitante: un lead perdido en silencio es
     una matricula perdida. */
  async function enviar(datos) {
    const cuerpo = arma(datos);
    const corta = new AbortController();
    const reloj = setTimeout(function () { corta.abort(); }, cfg.espera || 12000);

    try {
      const res = await fetch(cfg.url, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cuerpo),
        signal: corta.signal
      });
      clearTimeout(reloj);
      if (!res.ok) return { ok: false, motivo: 'respuesta ' + res.status, datos: cuerpo };
      return { ok: true, datos: cuerpo };
    } catch (err) {
      clearTimeout(reloj);
      console.error('[CRM] No se pudo enviar:', err);
      return { ok: false, motivo: String(err && err.message || err), datos: cuerpo };
    }
  }

  escucha();

  window.CRM_SISE = {
    enviar: enviar,
    carrerasDe: carrerasDe,
    codigoSede: codigoSede,
    codigoProducto: codigoProducto,
    unidadDe: unidadDe,
    /* Para comprobar desde la consola que las tablas cuadran sin
       mandar nada: CRM_SISE.previo({...}) */
    previo: arma
  };
})();
