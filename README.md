# SISE · Instituto Superior — web renovada

Sitio estático del Instituto SISE. HTML, CSS y JavaScript sin dependencias ni
paso de compilación: lo que hay en el repositorio es exactamente lo que se
publica.

## Cómo verlo en local

No hace falta instalar nada, pero sí un servidor: abrir los archivos con
`file://` rompe las rutas de los iconos y los fondos diferidos.

```bash
python -m http.server 5510
```

Y abrir <http://localhost:5510/>.

## Estructura

```
index.html               Portada
carreras.html            Listado de carreras por área
cursos.html              Cursos y especializaciones
idiomas.html             Idiomas
carrera-logistica.html   Ficha de carrera (modelo para las demás)

assets/
  css/style.css          Toda la hoja de estilos
  js/data.js             CONTENIDO EDITABLE (ver abajo)
  js/icons.js            Iconos SVG exportados de Figma
  js/main.js             Comportamiento
  img/                   Imágenes
  anim/                  Animaciones Lottie
  vendor/                Reproductor de Lottie
```

## Dónde se edita el contenido

Casi todo vive en **`assets/js/data.js`**: carreras, cursos, idiomas, sedes,
convenios, testimonios, novedades y el menú. Cambiar un texto, una imagen o
añadir una carrera se hace ahí, sin tocar el HTML ni el CSS. El archivo está
comentado sección por sección, con las advertencias de cada formato.

Las páginas comparten cabecera, menú y pie: si se tocan, hay que replicarlo en
las cinco.

## Caché

Todas las referencias a CSS y JS llevan `?v=NNN`. Al publicar un cambio hay que
subir ese número en las cinco páginas, o los navegadores seguirán sirviendo la
versión anterior.

## Pendiente

- Faltan fotos de varias carreras, cursos y sedes.
- Bastantes enlaces siguen en `#` (Nosotros, Eventos, plataformas, Repositorio,
  Bienestar, Acreditación y casi todas las fichas de carrera).
- El formulario valida y muestra confirmación, pero **no envía a ningún sitio**:
  falta conectar el CRM en `main.js`.
- El WhatsApp flotante apunta a un número de prueba.
