# Sistema de diseño — SISE

Instituto Superior SISE · sitio `sise-web-v2` · HTML/CSS/JS sin framework.
Documento autocontenido: con esto se puede razonar sobre la UI sin leer el código.

> **Cómo leerlo.** Todo lo que está aquí está extraído del código real
> (`assets/css/style.css`, 5.099 líneas), no es una propuesta. Donde el sistema
> tiene una grieta, lo dice la sección **Deuda conocida**.

---

## 1. La regla que manda: tres superficies

Es la ley de la casa y está escrita en el propio CSS. Antes de inventar una
caja nueva hay que encajarla en una de estas tres.

| | Superficie | Qué es | Dónde va |
|---|---|---|---|
| **1** | **Papel** | Tarjeta blanca, esquinas redondeadas, sombra suave | Toda tarjeta que se apoye en el fondo plano: hub de carreras, novedades, logos de convenios, fichas de documento, retratos |
| **2** | **Foto** | Imagen a sangre + velo hacia abajo + rótulo en pastilla blanca encima | Banner, pilares, laboratorios, experiencias, sede, cierre |
| **3** | **Vidrio** | Translúcido con desenfoque, **solo sobre una foto** | Formulario y botones del banner, franja de pilares, rótulos de laboratorio, datos de sede, cabecera |

**La restricción importante del vidrio:** necesita algo que desenfocar. Sobre el
gris plano no se ve como vidrio, se ve como un rectángulo gris. Si no hay foto
debajo, es papel.

El vidrio tiene dos versiones, **y se elige por el color del texto, no por el de
la foto**: clara para texto oscuro, oscura para texto blanco.

Una sola pareja de sombras para las tres, en reposo y al pasar por encima.

```css
--papel-sombra:       0 8px 24px rgba(18,19,26,.07);
--papel-sombra-alta:  0 18px 42px rgba(18,19,26,.13);
--vidrio-claro:          rgba(255,255,255,.72);
--vidrio-oscuro:         rgba(7,8,12,.34);
--vidrio-filete:         rgba(255,255,255,.65);
--vidrio-filete-oscuro:  rgba(255,255,255,.18);
--vidrio-blur:           blur(14px) saturate(1.3);
```

Todo vidrio lleva su `@supports not (backdrop-filter…)` con un color sólido
de respaldo.

**Excepción:** el rótulo de laboratorio y de sede (`.lab-nombre`) usa vidrio
al `.86` y texto en `--red-700`, no `--vidrio-claro` y `--red`. Es texto rojo
pequeño sobre foto: con el `.72` el fondo se quedaba gris en las fotos oscuras
y no pasaba de 3,8:1. Al `.86` llega a 4,5:1 aunque debajo haya negro.

---

## 2. Color

### Marca

| Token | Valor | Para qué |
|---|---|---|
| `--red` | `#FF0E49` | Superficies grandes, titulares, iconos y adornos |
| `--red-600` | `#E00040` | Fondo de botones y chips con letra blanca (4,95:1) |
| `--red-700` | `#C00036` | **Solo** hover y texto rojo pequeño que hay que poder leer |
| `--red-soft` | `#FFE4EC` | Pastilla rosa detrás de iconos |
| `--terciario` | `#FAD44F` | Tercer color de marca |
| `--crema` | `#FBF0C4` | Tinte claro del amarillo |
| `--indigo` | `#4642A6` | Idiomas, pinceladas de Sedes, panel de cifras, puntos de la malla |
| `--indigo-rgb` | `70,66,166` | El mismo color para los `rgba()`. **Si cambia uno, cambia el otro** |

**La regla del rojo, decidida expresamente:** el rojo oscuro (`--red-700`) se
reserva para *hover* y para texto funcional pequeño — migas de pan, etiquetas y
avisos del formulario, opciones del selector de sede, selector de modalidad.
**Todo lo demás va en el rojo primario.** El motivo es de contraste: `--red` da
3,9:1 sobre blanco, que basta para texto grande (mínimo 3:1) pero no para texto
pequeño (4,5:1). `--red-700` llega a 5,3:1.

### Grises

Había 17 sueltos; se redujeron a estos. Los tres primeros son de texto y todos
pasan 4,5:1 sobre blanco y sobre el gris de página.

| Token | Valor | Para qué |
|---|---|---|
| `--ink` | `#12131A` | Títulos |
| `--ink-2` | `#2A2C36` | Texto fuerte |
| `--body` | `#5C6270` | Párrafos y controles |
| `--muted` | `#676D7B` | Texto secundario (4,7:1 sobre el gris de página) |
| `--gris-400` | `#9AA0AE` | Placeholder atenuado, adornos. **Nunca texto que haya que leer** |
| `--gris-300` | `#CBD0DA` | Bordes de controles, separadores |
| `--gris-100` | `#EDEFF4` | Rellenos: cajas de imagen, hueco de foto pendiente |

### Fondos y superficies oscuras

| Token | Valor | Para qué |
|---|---|---|
| `--bg` | `#F5F4F2` | Fondo general. Gris apenas cálido, conversa con el carbón del pie |
| `--bg-soft` | `#F6F7FA` | Variante más fría |
| `--line` | `#E7E9F0` | Separadores |
| `--white` | `#fff` | Papel |
| `--carbon` | `#272423` | Pie de página |
| `--negro` | `#07080C` | Paneles oscuros: "Por qué elegir SISE", "Experiencias", franja de misión |
| `--blanco-2` | `rgba(255,255,255,.88)` | Texto secundario sobre oscuro |
| `--blanco-3` | `rgba(255,255,255,.7)` | Texto terciario sobre oscuro |

Sobre fondo oscuro había ocho opacidades entre .62 y .92 que no se distinguían
entre sí. Quedan dos niveles. **No añadir un tercero.**

---

## 3. Tipografía

Cuatro familias, alojadas en local (`assets/fonts/`, woff2, `font-display:swap`),
no pedidas a Google: quita dos viajes antes de poder pintar texto.

| Familia | Pesos | Para qué |
|---|---|---|
| **Barlow Condensed** | 600 · 700 · 800 · 900 | Todos los títulos |
| **Barlow** | 400 · 500 · 600 · 700 · 800 | Todo el texto corrido, botones y controles |
| **Permanent Marker** | 400 | Lettering de marcador del banner del inicio ("COMO SE VIVE"). Solo tiene mayúsculas |
| **Caveat Brush** | 400 | Rotulador de la parte roja de los títulos de sección, que se reescribe al hacer scroll. Tiene minúsculas: los títulos van en tipo oración. A `1.04em` ocupa lo mismo que la Barlow Condensed que sustituye |

### Escala

Declarada: **12 · 14 · 16 · 18 · 22 · 28 · 40 · 52**. Los títulos grandes van
con `clamp()` entre dos pasos de esa escala (29 usos de `clamp` en `font-size`).

Tamaños fijos más usados en el código: 14px (57), 16px (34), 12px (24),
15px (18), 22px (13), 13px (13), 18px (11).

> **Grieta:** 15px y 13px no están en la escala declarada y se usan 31 veces
> entre los dos. O entran en la escala o se migran a 14/16 y 12/14.

### Reglas tipográficas conocidas

- Los títulos de sección van en **mayúsculas** (`text-transform:uppercase`).
- El acento del título va dentro de `<em>`, sin cursiva, en `--red`.
- En amarillo, el título sube a peso 900: la irradiación del fondo claro hace
  ver la tinta más fina que el blanco sobre rojo o azul.
- Los subtítulos de sección se cortan a **640px** — a 1.240 una línea son unos
  150 caracteres y el ojo se pierde al cambiar de renglón. *(Excepción expresa
  en `.pagina-nosotros`, donde van a todo el ancho.)*
- Medida de lectura objetivo en texto corrido: **62–72 caracteres**.

### Al mezclar Barlow Condensed con Permanent Marker

Dos datos medidos que condicionan cualquier combinación de las dos:

- A igual tamaño, la mayúscula de la condensada levanta **71** y la del
  marcador **74** → para igualar alturas, el marcador va a **0,96em**.
- A igual altura de mayúscula, el marcador ocupa **31% más de ancho por letra**.

**No se pueden cuadrar alto y ancho a la vez.** Entre los dos manda el ancho,
que es lo que se nota al leer la línea. El valor en uso es **0,86em**: la
mayúscula queda un 10% más baja, pero el trazo del rotulador es tan grueso que
a la vista pesan igual. El grosor real de ambos trazos es casi el mismo (el
marcador está al 93% del de la condensada).

---

## 4. Medidas, formas y espacio

| Token | Valor | Para qué |
|---|---|---|
| `--shell` | `1240px` | Ancho máximo del contenido |
| `--gut` | `24px` (14px en móvil) | Margen lateral |
| `--header-h` | `78px` (66px en móvil) | Alto de la cabecera flotante |
| `--tienda-lado` | `clamp(16px,4vw,72px)` | Margen lateral del catálogo |
| `--r-sm` · `--r-md` · `--r-lg` · `--r-xl` | 12 · 18 · 26 · 34px | Radios |
| `--shadow-sm` · `-md` · `-lg` | ver tokens | Elevación general |

### Puntos de corte

Hay **16 valores distintos** de `@media` en la hoja. Los que realmente estructuran:

| Corte | Qué cambia |
|---|---|
| **1180px** | Rejillas de 4 columnas bajan a 3 |
| **1100px** | Las dos columnas de "historia" se apilan |
| **1024 / 1025px** | El banner deja de ser texto + formulario en fila |
| **900 / 901px** | Cifras de 4 a 2, rejillas a 1 columna |
| **820 / 821px** | El banner pasa a maqueta apilada sobre la foto |
| **700px** | Móvil: rejillas a 2 columnas, carriles a vertical |
| **600 / 560px** | Ajustes finos de tarjeta |

> **Grieta:** 1180/1181, 1024/1025, 900/901 y 820/821 son parejas de corte
> adyacentes que hacen el mismo trabajo. Deberían ser cuatro valores, no ocho.

---

## 5. Movimiento

| Token | Valor |
|---|---|
| `--ease` | `cubic-bezier(.22,.61,.36,1)` |

Duraciones en uso: **.18s–.25s** para estados (hover, foco), **.3s–.6s** para
entradas y transiciones de bloque, **.8s–1.6s** para relevos de foto.

El **94% de las transiciones** usan el token de curva. Es la parte más
disciplinada del sistema.

### Patrones de animación

- **`reveal`** — un bloque entra con `opacity 0 → 1` y `translateY(22px) → 0`.
  Lo dispara un barrido por scroll, no un `IntersectionObserver`: así también
  se muestran los bloques que quedaron por encima tras un salto de ancla.
  **Trampa conocida:** la lista de pendientes se arma una sola vez al cargar,
  así que lo que el guion pinte después debe apuntarse con `revelarNuevos(ctx)`
  o nace invisible para siempre.
- **`reveal-stagger`** — los hijos entran escalonados, 70ms entre uno y otro,
  con tope en el quinto.
- **Contadores** — `.counter[data-to]` cuenta al entrar en pantalla, con
  `easeOutCubic`. Se engancha por clase, no por id.
- **Carriles** — `montaCarril(carril, flechas, selectorHijos, etqAnt, etqSig)`.
  Trae arrastre con ratón, enganche (`scroll-snap: proximity`), flechas que se
  apagan en los extremos y colocación al soltar. Lo usan laboratorios, sedes y
  la línea de tiempo.
- **Pestañas que pasan solas** — pilares y valores. Se paran con el ratón
  encima y con el foco dentro, y se reanudan donde iban.

Todo lo anterior respeta `prefers-reduced-motion`, que el guion lee una vez en
`reduceMotion`.

---

## 6. Componentes

536 clases distintas. Las familias con peso propio:

| Prefijo | Componente | Reglas |
|---|---|---|
| `car-` | Ficha de carrera (banner, laboratorios, malla, certificaciones) | 98 |
| `pq-` | Panel "Por qué elegir SISE" con carril horizontal fijo | 79 |
| `sm-` | Menú desplegado / mapa del sitio | 78 |
| `pil-` | Pilares y tira de cifras | 68 |
| `lead-` | Formulario de admisión | 61 |
| `tienda-` | Catálogo de cursos | 59 |
| `section-` | Cabeceras de sección | 59 |
| `hero-` | Banner del inicio | 57 |
| `malla-` | Malla curricular | 49 |
| `tl-` | Línea de tiempo | 45 |
| `sede-` · `conv-` · `legal-` · `nos-` · `hub-` | Sedes, convenios, legales, nosotros, hub | 34–40 |
| `is-` | **Modificadores de estado** (`is-on`, `is-in`, `is-activa`, `is-open`, `is-dragging`, `is-pausada`) | 137 |

### Botones

| Clase | Qué es | Cuándo |
|---|---|---|
| `.btn` | Base: Barlow 700, 16px, 13/28px, radio 10px | — |
| `.btn-pill` | Radio 999px | Es lo que se usa siempre en la práctica |
| `.btn-primary` | Fondo `--red-600`, letra blanca, sombra roja | Acción principal |
| `.btn-ghost` | Solo perfil y letra en `--red` | Apoyo, no debe competir con la principal |
| `.btn-outline-light` | Vidrio oscuro con letra blanca | Apoyo **sobre foto** |
| `.btn-block` | Ancho completo | — |

Hover de todos: `translateY(-2px)` + color más oscuro. La flecha (`.ico-arrow`)
se desplaza `translate(3px,-3px)`.

> **Grieta:** no hay estado `disabled` definido para `.btn`. Sí lo hay para
> `.labs-flecha` (opacidad .35 y `pointer-events:none`).

### Convenciones de nombre

- Prefijo por bloque, guion simple: `hub-card`, `hub-sello`, `hub-title`.
- Variantes con doble guion: `car-hero--ficha`, `hub--rojo`, `btn-ghost`.
- Estados siempre con `is-`: `is-on`, `is-in`, `is-activa`.
- **En castellano**, incluidos los comentarios. Mantenerlo.

---

## 7. Accesibilidad — lo que ya está resuelto

- Contrastes verificados y documentados en el propio CSS (ver la regla del rojo).
- `role="tablist"` / `role="tab"` / `aria-selected` en pilares, valores y
  certificaciones, con navegación por flechas.
- `aria-label` en todos los controles de icono.
- Foco visible propio en los carriles (`:focus-visible` con contorno rojo).
- Un solo reproductor de vídeo modal para toda la web, con `aria-modal`,
  cierre con Escape y devolución del foco al origen.
- La segunda copia de los carriles infinitos va con `aria-hidden` para que el
  lector de pantalla no lea la lista dos veces.

---

## 8. Deuda conocida

Por orden de lo que más cuesta mantener:

| # | Problema | Dato |
|---|---|---|
| 1 | **`gap` nunca usa token** | 176 usos, 0 con variable. Hace falta una escala de espaciado (`--sp-1…6`) |
| 2 | **`border-radius` casi nunca usa token** | 138 usos, solo 18 (13%) con variable, pese a existir cuatro radios |
| 3 | **Colores a pelo** | 187 hex y 170 rgba fuera de `:root`. `#fff` (142) y `#000` (19) son aceptables; el resto —`#1B9E5A`, `#0B4EA2`, `#FBDCE4`, `#111`— deberían ser tokens |
| 4 | **`box-shadow` a medias** | 85 usos, 31 (36%) con token |
| 5 | **Puntos de corte duplicados** | 16 valores donde bastarían 6–7 |
| 6 | **Escala tipográfica incompleta** | 15px y 13px se usan 31 veces y no están declarados |
| 7 | **Peleas de especificidad** | Varias reglas necesitan dos clases (`.car-hero.nos-hero`, `.egr-video.nos-video`, `.labs-nav.tl-nav`) solo para ganar por orden a una regla que vive más abajo en la hoja. Síntoma de que la hoja crece por el final |
| 8 | **Sin estado `disabled` en `.btn`** | — |

---

## 9. Dónde vive cada cosa

```
sise-web-v2/
├── assets/css/style.css     Hoja única, 5.099 líneas, comentada en castellano
├── assets/js/main.js        Un solo IIFE por secciones numeradas (1, 1a, 2, 2d, 3, 4…)
├── assets/js/data.js        TODO el contenido editable: carreras, cursos, sedes,
│                            convenios, hitos, valores, directivos, CRM, transparencia
├── assets/js/icons.js       Iconos exportados de Figma, con currentColor
├── assets/js/crm.js         Envío del formulario a Smart Sales
├── assets/fonts/            woff2, subconjunto latino
└── assets/img/              .webp; variantes `-movil` para los banners
```

**Regla de oro del contenido:** si es una lista que marketing va a editar, va en
`data.js`. Si es prosa de una página concreta (legales, descripciones), va en el
HTML.

**Invalidación de caché:** cada cambio sube el `?v=NNN` de *todos* los HTML a la
vez. Excepción: `hero-01.webp?v=3` lleva su propia versión y un `sed` global se
la come — hay que restaurarla.

---

## 10. Qué pedirle a quien revise esta UI

Lo que más ayudaría, en este orden:

1. Una **escala de espaciado** y la migración de los 176 `gap`.
2. Consolidar los **16 puntos de corte** en 6.
3. Cerrar la **escala tipográfica** (decidir qué pasa con 13 y 15px).
4. Criterio para el **lettering de marcador**: hoy la propuesta es "rotulador si
   el título le habla al lector, condensada si nombra una categoría". Falta
   validarlo.
5. Revisión de **jerarquía** en las páginas largas: el inicio mide 10.700px y
   la ficha de carrera 8.900px, con muchas secciones del mismo peso visual.
