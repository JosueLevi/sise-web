# Cómo se trabaja en este proyecto

Web del Instituto Superior SISE. HTML, CSS y JavaScript a pelo, sin framework
ni paso de compilación. Se publica como estático en GitHub Pages.

**Antes de proponer nada, lee `SISTEMA-DE-DISENO.md`.** Está en esta misma
carpeta y recoge los tokens, la regla de las tres superficies, la tipografía,
los componentes y la deuda conocida, todo medido sobre el código.

---

## Reglas de la casa

**Push solo cuando se pida.** Los cambios se quedan en local. Nunca confirmar
ni subir sin que lo pidan expresamente.

**Todo en castellano**, incluidos los comentarios del código. Los comentarios
explican *por qué*, no *qué*: si una regla tiene un valor raro, el comentario
dice qué pasaba sin él.

**Contenido en `data.js`.** Si es una lista que marketing va a editar
—carreras, cursos, sedes, convenios, hitos, directivos—, va ahí. Si es prosa
de una página concreta (legales, descripciones), va en el HTML.

**Medir antes que mirar.** Contraste, anchos, posiciones y altos se comprueban
con números en el navegador, no a ojo en una captura. Las capturas son para
decidir estética, no para verificar.

---

## Trampas que ya han mordido

**El `?v=NNN`.** Cada cambio sube ese número en *todos* los HTML a la vez, o el
navegador sigue sirviendo lo viejo.
**Excepción:** `hero-01.webp?v=3` lleva su propia versión y un `sed` global
sobre `\?v=\d+` se la come. Hay que restaurarla después de cada subida.

**WebKit y `transform`.** Descarta la declaración entera —se queda en `none`—
cuando un `calc()` con variable aparece dentro de una función de transform. En
las propiedades `translate`, `scale` y `rotate` sueltas el mismo cálculo
funciona. Si una transformación "no hace nada", es esto.

**Los SVG en `data:` URI.** El `#` del color se escapa **una** vez (`%23`). Si
se pre-escapa y además se pasa por `quote()`, sale `%2523` y el navegador no
pinta nada, sin avisar.

**El barrido de `reveal` se arma una sola vez al cargar.** Lo que el guion
pinte después nace invisible para siempre: hay que apuntarlo con
`revelarNuevos(ctx)`.

**Cortar bloques de CSS por comentarios es peligroso.** Un corte "del comentario
A al comentario B" se llevó por delante 172 líneas del hub que estaban en medio.
Comprobar qué selectores desaparecen antes de dar por bueno el recorte.

---

## Comprobaciones antes de dar algo por bueno

Con Playwright (entorno en `C:/Users/JFRIAS/AppData/Local/pwv/`) y el servidor
local en `python -m http.server 5510`:

1. **Las 10 páginas sin errores de consola** ni desbordamiento horizontal.
2. **Ninguna pide una imagen que no existe** (404). Los únicos admitidos hoy son
   los 8 retratos de la plana directiva, las 27 fotos de curso y las 5 de la
   línea de tiempo: faltan por entregar.
3. **Contraste medido** sobre los píxeles pintados si hay texto sobre foto.
4. **Móvil (390) y escritorio (1440)**, y el corte intermedio si la pieza lo tiene.

---

## Lo que está a medias

- **25 fichas de carrera de 26.** Solo existe `carrera-logistica.html`. Cuando
  toque crearlas, es el momento de plantearse un generador estático —Astro
  antes que Next: esta web no tiene estado de aplicación y Astro manda cero
  JavaScript—. Hoy el 52% del HTML está copiado diez veces.
- **Fotos pendientes:** las 8 de la plana directiva (`assets/img/equipo/`, hay
  un LEEME con los nombres), las 27 de curso y las 5 reales de la línea de
  tiempo, que hoy son prestadas de otras secciones.
- **`experimentos/`** guarda la versión 2 del inicio (lettering de rotulador,
  hub con marco de color). Retirada, no borrada.
- **Códigos CRM** de tres carreras sin asignar, y CORS pendiente de habilitar en
  `smartsalessise.sise.edu.pe`.
