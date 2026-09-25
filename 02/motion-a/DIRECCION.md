# Dirección A · «Claroscuro cinematográfico»

Presentación 02 · *Confiar sin controlar* · remaster en motion graphics sin audio para TV de 42" (1920×1080).

## Concepto (3 líneas)

1. Cada escena es una pintura al óleo nocturna, realista y tenebrista, que una cámara de cine recorre despacio: se acerca, enfoca, cruza de un lado al otro y se detiene cuando Rogelio habla.
2. La luz es el argumento: una sola fuente dentro del cuadro (farol, vela, luna, rendija de una puerta) y todo lo demás en sombra; la sospecha es una sombra que pasa, la confianza es una vela que sigue encendida.
3. Tres objetos viajan entre escenas y cargan la tesis: **la llave** (la clave para asegurar la vida), **la copa de barro** (el cáliz de Getsemaní que reaparece en la carta de Teresita) y **la vela** (fe sin consuelo sensible). El cierre suelta la llave y deja una mano abierta.

## Referencias investigadas

| Referencia | URL | Qué tomé |
|---|---|---|
| Caravaggio, *La vocación de san Mateo* (Contarelli) | https://en.wikipedia.org/wiki/The_Calling_of_Saint_Matthew | El haz diagonal de luz que entra por arriba y «señala»; lo usé en el Edén (haz que ilumina a Eva) y como estructura de revelación. |
| Georges de La Tour, *La Magdalena de la llama humeante* (LACMA) | https://collections.lacma.org/node/238963 · https://unframed.lacma.org/2015/04/06/collection-magdalen-smoking-flame | La vela como verdadero sujeto del cuadro: escena de Teresita, bodegones y oración final; parpadeo de llama y brasas. |
| Rembrandt, *Cristo en la tormenta del mar de Galilea* (Gardner, robado en 1990) | https://www.gardnermuseum.org/experience/collection/10953 | Única marina de Rembrandt: ola oscura, figura que forcejea con cabos; base de la obertura (alegoría del afán de control). |
| Zurbarán, *Bodegón con cacharros* (Prado) | https://www.museodelprado.es/en/the-collection/art-work/still-life-with-vessels/bdd71dfb-cde5-440e-87a2-48d8c64060dd | Objetos en fila, luz lateral, fondo negro: la galería «una promesa que cambia de idioma» es un bodegón que la cámara recorre. |
| Sánchez Cotán, *Membrillo, repollo, melón y pepino* (San Diego) | https://en.wikipedia.org/wiki/Quince,_Cabbage,_Melon_and_Cucumber | El negro como infinito, no como pared: objetos flotando (llave, copa, vela, puño, mano) sobre negro puro, fundidos por «trama». |
| Tarkovsky, *Nostalghia*, plano de la vela | https://filmmakermagazine.com/85124-tarkovskys-nostalghia-as-a-cinematic-candle/ | Plano largo sin cortes y una llama que hay que sostener: ritmo lento, travellings laterales, la vela como acción que se soporta. |
| Roger Deakins, *The Assassination of Jesse James* | https://www.rogerdeakins.com/jesse-james-x-3/ · https://infocusfilmschool.com/cinematographer-roger-deakins/ | Luz «motivada» por fuentes dentro del cuadro (faroles, velas), negros verdaderamente negros, viñeteado. |
| Malick / Jörg Widmer, *A Hidden Life* | https://www.red.com/stories/jorg-widmer-a-hidden-light | Fe bajo prueba contada con luz natural y preguntas en voz baja: el tono de las preguntas finales y del alba en la escena de la cuerda. |
| Cormorant Garamond (Christian Thalmann) | https://fonts.google.com/specimen/Cormorant+Garamond · https://github.com/CatharsisFonts/Cormorant | Garamond de display para títulos y citas: remite a imprenta del siglo XVI–XVII sin caer en tipografía «épica». |
| Spectral (Production Type) | https://fonts.google.com/specimen/Spectral | Serif diseñada para pantalla: texto largo y legible a distancia. |

## Paleta

| Token | Hex | Uso |
|---|---|---|
| negro betún | `#050407` | fondo, velos |
| sombra tostada | `#1a120c` | fondos cálidos |
| ocre | `#c89b4f` | etiquetas, fuentes, líneas |
| luz de vela | `#e8c67e` | énfasis cálido (confianza, «sí») |
| hueso | `#f2e8d5` | texto principal |
| hueso apagado | `#bfae92` | texto secundario |
| bermellón | `#b3402b` / `#c9412b` | sangre del pañuelo, hilo rojo |
| luna | `#aebfd0` | énfasis frío (sospecha, «no», Getsemaní) |

## Tipografía (autoalojada en `assets/fonts/`)

- **Cormorant Garamond** 600/700 y cursiva 500/600: títulos (150/112/84 px) y citas (52–96 px).
- **Spectral** 400/600 y cursiva: texto (42 y 36 px), etiquetas y fuentes (27–28 px), versalitas espaciadas para los *kickers*.
- Mínimos a 1920×1080: nada por debajo de 27 px en pantalla; el cuerpo de texto va a 36–42 px.

## Lenguaje de movimiento

- **Cámara dentro de la pintura** (`k.cam`): acercamientos de 7–14 s con `sine.inOut`; la cámara sigue sola aunque el texto ya esté completo. La pintura también «respira» con una deriva mínima.
- **Rack focus**: las pinturas entran desenfocadas y se enfocan (Edén); los textos aparecen de desenfocado a nítido, como créditos de cine.
- **Susurro**: las citas y preguntas aparecen palabra por palabra.
- **Travelling lateral** entre los dos Edenes (el mismo jardín visto al revés) y por la galería de bodegones, con parallax (halo de fondo al 50 %).
- **Luz como transición**: relámpagos en la obertura; una sombra que cruza «el don» y lo vuelve «¿una prohibición celosa?»; la puerta que se ilumina al completar la receta; la vela que se apaga y el muro que sube y cubre las estrellas (imagen del Manuscrito C).
- **Letterbox** al abrir la obertura y Getsemaní; se retira cuando la escena pasa a la reflexión.
- Grano de película animado, viñeta, polvo en la luz, lluvia, brasas y estrellas por canvas.
- `prefers-reduced-motion`: sin cámara, sin desenfoques ni desplazamientos, grano apagado y timelines 2,5× más rápidos (sólo fundidos).

## Estructura (21 escenas · 89 beats)

Deep link: `#escena.beat` (por número o id, por ejemplo `#13.3` o `#getsemani.3`).

### Acto I · La sospecha
| # | id | Beats | Qué explica |
|---|---|---|---|
| 1 | tormenta | 4 | Relámpago y lluvia; título; pregunta central «¿Busco a Dios… o una manera espiritual de garantizar lo que deseo?»; «a veces llamo confianza a un control más sofisticado». |
| 2 | deseo | 3 | Cuatro velas: salud, amor, seguridad, sentido (deseos legítimos); «no sentirnos a merced de todo»; baja la llave: «Si conozco la clave…» (paráfrasis). |
| 3 | eden | 4 | Rack focus al Edén; Gn 3,1 textual; susurro «¿Y si Dios te está ocultando algo bueno?» (paráfrasis); una sombra cruza «el don» y deja «¿una prohibición celosa?». |
| 4 | grieta | 4 | Catecismo 397 textual; una grieta dibuja la línea de tiempo: primero la sospecha, después el fruto; CIC 398 «sin Dios, antes que Dios y no según Dios»; el puño que aprieta la llave: «busco asegurar mi bien por mi cuenta». |
| 5 | inversa | 4 | Travelling al mismo jardín en espejo, ahora la serpiente es la luz; tarjetas: *La hipóstasis de los arcontes* («la serpiente, la instructora», «por celos») e Ireneo I,30 como adversario; sello «ciertos textos, no todo el gnosticismo». |
| 6 | lecturas | 6 | Díptico Génesis / relectura: filas serpiente, sospecha, comer del fruto; «se conserva la escena, cambia quién parece digno de confianza»; vuelve la llave: «¿recibir mi vida o descubrir una clave que Él no me dio?». |

### Acto II · La clave
| # | id | Beats | Qué explica |
|---|---|---|---|
| 7 | idiomas | 6 | Galería de bodegones con travelling: gnosis (conocimiento oculto) → teosofía, Nueva York 1875 (leyes espirituales) → Nueva Era (conciencia y energía) → *The Secret* 2006 (pensamientos que atraen); vista general «una familia de motivos, no una línea recta»; fuente vaticana 2003. |
| 8 | receta | 5 | Receta en tres pasos (paráfrasis); la llave viaja a la cerradura y la puerta se ilumina; aviso de alcance; «¿Escucho a Alguien… o aplico una técnica para conseguir algo?». |
| 9 | secret | 4 | Alegoría del espejo; cita traducida de la página oficial; diagrama «no se limita a esto / propone esto»; el agua sube: la presión de vigilar cada temor (consecuencia posible). |
| 10 | lenguajes | 5 | Tríptico de velas: atracción (Byrne), intención y emoción (Dispenza), leyes mentales (Conny Méndez); «¿qué espero que produzca mi práctica interior?». |
| 11 | suelta | 4 | Dispenza: intención + emoción → «entregar el cómo»; «no basta decir ellos controlan, nosotros soltamos»; un hilo rojo une la mano abierta con la puerta: suelto el cómo, conservo el resultado; «¿entrego también el desenlace?». |
| 12 | entrego | 4 | Sobre el puño con la llave, «el cómo» se va flotando y «el desenlace» queda apretado; «¿mi futuro o sólo la manera?»; la oración como trato (paráfrasis); transición a Getsemaní. |

### Acto III · El segundo jardín
| # | id | Beats | Qué explica |
|---|---|---|---|
| 13 | getsemani | 4 | Letterbox y pintura completa; luz de luna sobre los discípulos dormidos «Quedaos aquí y velad»; paneo a Jesús: «espanto y angustia», «triste hasta la muerte»; «la confianza empieza dentro del miedo». |
| 14 | entrega | 4 | Copa de barro: el deseo dicho (Mc 14,36a) y el deseo entregado (14,36b); «¡Levantaos, vamos!»; Benedicto XVI con un «no» y un «sí» gigantes. |
| 15 | jardines | 5 | Díptico Edén / Getsemaní: alrededor (abundancia / angustia), en el corazón (desconfianza / confianza); «mi estado emocional no es la medida completa». |

### Acto IV · La noche de Teresita
| # | id | Beats | Qué explica |
|---|---|---|---|
| 16 | teresita | 4 | «Lisieux · 1896»; la celda a la luz de la vela; 15 años al entrar; Jueves Santo, 2 de abril de 1896: sangre; al principio, alegría; después, «una gran prueba de la fe». |
| 17 | oscuridad | 4 | Cielo estrellado; un muro de piedra sube y lo cubre (Manuscrito C, trad. libre); la tentación de la nada y el combate; *C'est la confiance* 25: «prueba contra la fe». |
| 18 | canto | 3 | Una vela ante el muro: «Canto lo que quiero creer» (síntesis) con el original francés; siente/canta; fe que no es técnica para recuperar el consuelo. |
| 19 | caliz | 4 | Carta 197 (17 sep 1896): los deseos no son el fundamento; «la confianza, y nada más que la confianza…»; regresa la copa: Getsemaní en su propia voz; la confianza no exige entusiasmo por sufrir. |

### Acto V · Nosotros
| # | id | Beats | Qué explica |
|---|---|---|---|
| 20 | pregunta | 3 | Manos que aflojan la cuerda (eco de la tormenta) ante el alba: «¿Qué espero que Dios me garantice?» y dos preguntas del guion. |
| 21 | cierre | 5 | Tríptico Edén / Getsemaní / Teresita; la llave cae; la mano abierta; tesis «Vivir como hijo, aun sin controlar el final»; vela y oración. |

## Precisión (límites del BRIEF)

- Paráfrasis marcadas en pantalla: la promesa de la clave, la insinuación de la serpiente, la receta y la oración como trato.
- Citas textuales verificadas: Gn 3,1 y Mc 14,33.34.36.42 (Biblia en vatican.va), Catecismo 397–398, Benedicto XVI (audiencia del 1 de febrero de 2012), *C'est la confiance* 1 y 25, Manuscrito C en francés.
- Traducciones libres rotuladas: *La hipóstasis de los arcontes* (versión inglesa de Bentley Layton), thesecret.tv, Dispenza, carta 197 y Manuscrito C.
- *The Secret* y Dispenza se presentan como lo que proponen, no como mecanismos comprobados; la pintura del espejo y el hilo rojo están rotulados como alegoría o interpretación visual.
- Fechas verificadas: Sociedad Teosófica, Nueva York 1875 (documento vaticano); *The Secret* 2006; hemoptisis del Jueves Santo, 2 de abril de 1896 (archivos del Carmelo de Lisieux).

## Assets (18 imágenes, Codex CLI, costo 0)

Estilo común añadido a cada prompt: *pintura al óleo realista sobre lienzo, tenebrismo barroco (Caravaggio, La Tour, Zurbarán, Rembrandt), una sola fuente de luz cálida y motivada, sombras casi negras, pincelada visible, paleta betún/ocre/carne/bermellón apagado, encuadre de cine (Deakins), sin texto, firmas ni marcos, manos correctas.* Los prompts completos están en `_gen/jobs1.txt` y `_gen/jobs2.txt`; los PNG originales, en `_gen/png/`; los logs, en `_gen/logs/`.

| Asset | Formato | Prompt (resumen) |
|---|---|---|
| p01-tormenta | 16:9 | Hombre solo en barca de pesca, de noche y en tormenta, tira de una cuerda tensa de vela rasgada; farol de aceite; ola enorme; mitad izquierda oscura. Ref.: Rembrandt 1633. |
| p02-eden | 16:9 | Edén al anochecer; Eva visible de hombros arriba, cubierta por hojas; haz diagonal de luz; serpiente real junto a su oído; un fruto que atrapa la luz; mitad izquierda en sombra. |
| p03-eden-inversa | 16:9 | Mismo jardín y misma mujer (ref. p02) en espejo; la única luz es la serpiente, como maestra; follaje opresivo arriba sin figura; mitad derecha oscura. |
| p04-puerta | 16:9 | Puerta maciza con cerradura; luz dorada por rendijas y ojo de la llave; muro de piedra a la izquierda (también se usa como textura del «muro»). |
| p05-espejo | 16:9 | Hombre de hoy empuja un gran espejo dorado hacia una habitación soleada ideal mientras su lado se inunda de agua oscura. |
| p07-getsemani | 16:9 | Jesús arrodillado junto a una roca entre olivos, angustia real, luz de luna; tres discípulos dormidos en la sombra; luces lejanas de Jerusalén. |
| p08-teresita | 16:9 | Carmelita de 23 años en su celda de Lisieux, 1896; vela en palmatoria; pañuelo con una mancha de sangre; ventana nocturna. Ref.: La Tour. |
| p10-cuerda | 16:9 | Manos curtidas que aflojan una cuerda pesada; sendero y valle con niebla antes del alba. |
| p11-firmamento | 16:9 | Cielo estrellado con Vía Láctea sobre la silueta de un convento (se encuadra sólo el cielo). |
| o-llave | 1:1 | Llave antigua de hierro forjado, luz rasante, negro puro. |
| o-caliz | 1:1 | Copa sencilla de barro del siglo I sobre una piedra, luz de luna, negro puro. |
| o-vela | 1:1 | Vela de cera en palmatoria de latón, negro puro. Ref.: La Tour. |
| o-codice | 1:1 | Códice de papiro encuadernado en cuero (tipo Nag Hammadi) sin escritura legible, lámpara de barro. |
| o-teosofia | 1:1 | Bodegón de 1875: libros con broches, lámpara de aceite de latón, esfera de cristal. |
| o-nuevaera | 1:1 | Cuarzo, incienso con humo, libros de bolsillo sin texto, vela. |
| o-pantalla | 1:1 | Teléfono con pantalla encendida en blanco (sin interfaz) junto a una vela consumida. |
| o-puno | 1:1 | Puño cerrado que aprieta una llave, luz rasante, negro puro. |
| o-mano-abierta | 1:1 | Mano abierta y vacía, palma arriba, luz desde arriba, negro puro. |

Regeneradas: ninguna (18 de 18 útiles a la primera). Se descartó una 19.ª, una puerta con hilo rojo: el hilo se dibuja en SVG sobre `p04` y la mano abierta, y así se anima.

## Técnica

- `index.html` + `css/deck.css` + `css/fonts.css` + `js/scenes.js` (escenas) + `js/engine.js` (motor) + `js/vendor/gsap.min.js` (GSAP 3.12.5 local). Todo funciona sin internet.
- Controles: clic, →, PageDown, Espacio o Enter avanzan; si hay una animación en curso, el clic la completa. ←, PageUp o clic derecho retroceden (reconstrucción determinista). F: pantalla completa. N: notas superpuestas. P: ventana de notas sincronizada (`notes.html`, para pantalla extendida). B o «.»: pantalla negra. Inicio/Fin.
- Verificación: `node _gen/verify.mjs shots nav small rm clip` (Playwright + Chrome headless). Capturas en `_review/`.
