# Estándar de presentación · PPT

## 1. Del chat al relato

El insumo es el chat completo que Rogelio preparó aparte. Separar hechos, citas, opiniones, preguntas y decisiones ya aprobadas. Registrar en `NN/BRIEF.md` un resumen editorial suficiente para reproducir la presentación. El repositorio es público: no incorporar por defecto la transcripción íntegra ni datos privados del chat. Identificar una pregunta central que el público recuerde al salir. Investigar los datos que sostienen afirmaciones históricas, técnicas o de actualidad y enlazar fuentes directas en el guion o en `ARTE.md`. Indicar lo que sea interpretación del presentador.

Proponer una secuencia de **21 láminas exactas**. El ritmo debe cambiar: escena, contexto, tensión, comparación, giro, aplicación y cierre. Una frase aislada no merece automáticamente una lámina. Las diapositivas llevan la idea que el público debe ver; el desarrollo oral vive en `GUION.md` y en las notas integradas del HTML.

Una estructura inicial útil, ajustable al tema:

| Láminas | Función |
| --- | --- |
| 01 | Portada y pregunta central |
| 02–05 | Mundo, personaje o problema concreto |
| 06–09 | Conflicto y decisión que lo cambia todo |
| 10–14 | Espejo, contraste o explicación |
| 15–18 | Conexión con la vida del grupo |
| 19–21 | Libertad o consecuencia, pregunta y cierre |

El guion debe incluir para cada número: qué se ve, qué conviene decir, transición y, si corresponde, una pausa o pregunta. Las indicaciones de conducción no deben aparecer en pantalla como «abrir conversación» o «compartir ahora». La pregunta misma debe abrir el diálogo con naturalidad.

## 2. Arte que cuenta la historia

Generar **ocho imágenes originales horizontales 16:9**. Su ubicación se decide por la narración; la presentación 01 usa las láminas 1, 3, 4, 7, 9, 13, 18 y 20. Cada imagen debe mostrar una acción, personaje, objeto o tensión reconocible en dos segundos. Buscar una escena que el público pueda recordar y describir después: quién está ahí, qué está pasando y qué cambió.

La dirección visual predeterminada es **pintura realista de aire barroco**, con rostros humanos, gesto legible, luz dirigida y sombra profunda. Adaptarla al tema y a la época representada. El tratamiento pictórico puede ser barroco aunque la escena ocurra en otro siglo; la vestimenta, los objetos y la arquitectura deben investigar su propia época. Para escenas contemporáneas, mantener el mismo lenguaje de luz y emoción sin disfrazarlas de época.

Antes de generar, investigar al menos dos referencias de museos o archivos fiables que expliquen una decisión concreta de composición. Anotar la URL y qué se aprendió. En la presentación 01, [*La cena en Emaús* de Caravaggio](https://www.nationalgallery.org.uk/paintings/michelangelo-merisi-da-caravaggio-the-supper-at-emmaus) orienta el uso de un instante de revelación, manos expresivas y luz sobre rostros; [*San Francisco en oración* de Zurbarán](https://www.museodelprado.es/coleccion/obra-de-arte/san-francisco-en-oracion/02ec1dc0-407a-413c-b02f-7082abedcfc4) orienta la soledad contemplativa. Son referencias de lenguaje visual, no imágenes para copiar.

Cada prompt debe especificar sujeto, acción, lugar, época, emoción, fuente de luz, composición horizontal y espacio oscuro o claro para texto. Evitar texto incrustado, iconografía sentimental, manos imposibles, detalles históricos inverosímiles y símbolos abstractos que sustituyan la escena. Revisar cada generación antes de incorporarla. Documentar las ocho en `NN/ARTE.md`.

## 3. Legibilidad en sala

Diseñar y probar a **1920×1080** y **1366×768**, ambas en 16:9. La referencia física es una televisión de 42 pulgadas vista desde una sala de conferencias. Como guía a 1920×1080: títulos de aproximadamente 70–100 px, texto principal de 34–42 px, texto secundario esencial de 28–34 px y etiquetas de 24 px o más. Los controles y notas ocultas pueden ser menores porque no forman parte del relato que debe leerse desde el fondo.

Si algo no cabe, recortar texto, reordenar la composición o pasar detalle al guion. No resolverlo haciendo ilegible la letra. Evitar párrafos sobre fotografías complejas; reservar una zona de bajo detalle y poner un velo de contraste detrás del texto. Respetar 16:9, márgenes de seguridad y consistencia de navegación.

## 4. Lectura en celular y tablet

La vista de sala conserva la composición horizontal 16:9. En pantallas estrechas o de poca altura, **no reducir la lámina completa como miniatura**: convertir cada lámina en una página vertical legible. La imagen debe seguir ocupando un momento visual claro —habitualmente el 40–45 % superior de la pantalla— y el texto principal debe quedar en una zona de contraste propio, no encima de una pintura cargada. Mantener el encuadre del sujeto al recortar; revisar cada imagen en móvil y ajustar `object-position` por escena cuando haga falta.

Los títulos móviles deben partir aproximadamente de 36–42 px, el texto principal de 21–25 px y el texto secundario de 17–19 px. Si hay mucho contenido, permitir desplazamiento **dentro de la lámina** sin que se pierda texto; no disminuir la fuente para encajarlo todo en un solo alto de pantalla. Respetar los márgenes laterales, la zona segura inferior y las preferencias de movimiento reducido. Reservar una franja inferior **fuera del área desplazable del contenido**: dos botones táctiles discretos de al menos 44×44 px pueden vivir ahí, pero nunca encima del texto, las tarjetas o la oración final. Evitar una barra sólida que domine la composición. El toque sobre el texto o el desplazamiento vertical no debe cambiar accidentalmente de lámina. Conservar teclado, notas, hash y pantalla completa para quien los use.

La adaptación móvil es parte de cada entrega, no una mejora opcional posterior. Comprobar portada, láminas visuales, láminas densas y cierre en **390×844**, **360×640**, **844×390** y una tablet vertical, además de los dos tamaños de sala. Verificar que no haya desplazamiento horizontal, texto tapado por navegación, imágenes aplastadas ni enlaces inaccesibles.

## 5. Paquete por entrega

```text
NN/
  BRIEF.md      Tesis, público, decisiones y fuentes publicables del chat
  GUION.md      Texto de exposición con 21 secciones numeradas
  ARTE.md       Ocho escenas, prompts, referencias y fuentes
  index.html    Presentación estática con notas y navegación
  mobile.css    Composición vertical y controles táctiles
  assets/       01-*.png ... 08-*.png
```

La transcripción completa se conserva en el chat de origen. Si hace falta guardar una copia privada, hacerlo fuera de este repositorio público. No reconstruir una transcripción fingida.

## 6. Comprobación y publicación

Antes de publicar, comprobar que hay 21 láminas, ocho imágenes locales 16:9, rutas relativas válidas, texto sin recortes ni solapamientos y tamaño suficiente en sala y móvil. Recorrer en navegador una selección de láminas densas, visuales y de cierre en todos los tamaños del apartado 4. Probar flechas, controles táctiles, desplazamiento vertical, pantalla completa, hash `#slide=N` y notas. Revisar que el índice enlaza a la entrega y que el guion está completo.

Publicar en `main` del repo `Praulio/ppt`, con GitHub Pages desde `/`. La forma pública es `https://praulio.github.io/ppt/NN/`; no se cambia por la fecha ni por el título. Después del push, esperar a que Pages termine y abrir esa URL pública para verificar HTML e imágenes. Sólo entonces decir que está lista para presentar.
