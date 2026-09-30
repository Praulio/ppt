# Arte · Discernir

Misma dirección que `02/motion-b` («Libro de horas visionario», elegida por Rogelio): pintura simbólica en temple, acuarela y pan de oro sobre vitela; paleta lapislázuli, bermellón, esmeralda, oro y marfil; luminosa, **no** claroscuro realista. Fuentes, paleta y lenguaje de movimiento: ver `../02/motion-b/DIRECCION.md`. El estilo no se cambia.

## Mecánica (heredada de 02/motion-b2)

Un clic = un concepto. Cada escena es una línea de tiempo lenta que se reproduce sola; al final queda fija. Línea de progreso inferior: se llena de derecha a izquierda con el reloj de la escena; en el borde izquierdo la secuencia terminó; en un giro se detiene y pulsa hasta el clic. Controles: → / clic siguiente · ← anterior · Espacio pausa · `.` salta al final · `+`/`−` tempo · N notas · F pantalla completa · B negro · `#escena` y `#escena@seg` para enlaces directos.

## Referencias (qué se tomó)

| Referencia | URL | Qué se tomó |
|---|---|---|
| Armas de Oñaz-Loyola (dos lobos y una olla, en campo de plata; los siete palos de Oñaz) | https://www.luc.edu/jesuitheritage/thewolvesofloyola/ | El estandarte de Íñigo lleva los lobos y la olla, no una bandera moderna. Verificado también con la imagen regenerada. |
| Cueva de San Ignacio, Manresa (1522–23, junto al Cardener) | https://web.manresa.cat/filmoffice/en/menu/17924-la-cova-de-sant-ignasi | Cueva de roca abierta al valle y al río para la escena de Manresa. |
| Rembrandt, *La cena de Emaús* (1648, Louvre) | https://en.wikipedia.org/wiki/Supper_at_Emmaus_(Rembrandt,_Louvre) | El momento del reconocimiento al partir el pan, con la luz naciendo del pan. Adaptada al lenguaje luminoso del libro de horas. |
| *Très Riches Heures*, Limbourg (mapas y miniaturas) | https://geometriesofcreation.lib.uiowa.edu/painting/limbourg-brothers-tres-riches-heures-of-jean-de-berry/ | Mapa del Mediterráneo como miniatura iluminada para la ruta 1523–1540. |
| Blake, *The Agony in the Garden* | https://www.tate.org.uk/art/artworks/blake-the-agony-in-the-garden-n05894 | Halo de luz reverente en Getsemaní (se reutiliza la imagen de 02). |
| Hilma af Klint, *Tree of Knowledge* | https://www.guggenheim-bilbao.eus/en/exhibition/tree-of-knowledge-1913 | Geometría simbólica: brújula, balanza y líneas de ruta como diagramas. |

## Personajes y época

- Íñigo: caballero vasco en torno a 1510. Pamplona 1521: fortaleza con cadenas de Navarra y bombarda. Loyola: torre-casa, bola de libros. Manresa: hábito pardo. Cardoner: túnica clara, calabaza de peregrino. No se dibuja la confrontación de la mula: sólo la mula en la encrucijada.
- Emaús: Judea del siglo I; Jesús sin gesto extremo. Respeto a Jesús y a Ignacio.

## Assets (20 + 1 regeneración; Codex, costo 0; originales y logs en `_gen/`, ignorado por git)

Todas las pinturas llevan este sufijo de estilo (el mismo de 02) más la indicación de época vasca y castellana de 1491–1540; los objetos se piden sobre fondo transparente con esmalte de oro y joyas.

| Asset | Formato | Escena | Nota |
|---|---|---|---|
| `portada` | 3:2 | 1 | Peregrino en una bifurcación bajo una balanza dorada |
| `inigo` | 3:2 | 2 | **Regenerada:** la primera salió con bandera roja y gualda estilo moderno; se pidió estandarte heráldico con los lobos |
| `pamplona` | 3:2 | 3 | Bombarda y cadenas de Navarra (sin símbolos religiosos) |
| `loyola` | 3:2 | 4 | Convalecencia con dos visiones (corte / Francisco y Domingo) |
| `mula` | 3:2 | 5 | Mula en la encrucijada ante una montaña tipo Montserrat |
| `manresa` | 3:2 | 6 | Penitente en la cueva; bucles bermellón de ansiedad |
| `cardoner` | 3:2 | 7 | Sentado junto al río con el paisaje abriéndose |
| `mapa` | 3:2 | 7 | Mediterráneo iluminado con el camino del peregrino |
| `emaus-camino` | 3:2 | 8 | Dos discípulos y Jesús, camino a Emaús |
| `emaus-pan` | 3:2 | 10 | Fracción del pan; brasas sobre los corazones |
| `noche` | 3:2 | 12 | Peregrino con linterna bajo nubes |
| `compania` | 3:2 | 17 | Dos personas ante la lámpara; nudo rojo que se desenreda |
| `examen` | 3:2 | 20 | Persona revisando el día ante tres láminas de luz |
| `alba` | 3:2 | 22 | Peregrino caminando hacia el alba; balanza al fondo |
| `balanza`, `lampara`, `corazon`, `pan`, `baston`, `espada` | 1:1, alfa real | 15, 18, 10 (balanza, lámpara, corazón) | `pan`, `baston` y `espada` quedaron generados y **sin usar** por ahora |

Se reutilizan de 02: `lapis`, `vitela`, `getsemani` y las fuentes.

### Observaciones

- `manresa`: unos figurines rojos diminutos arriba a la derecha se leen como «espíritus» de los escrúpulos; se dejan porque acompañan la idea.
- `corazon` se parece a la iconografía del Sagrado Corazón; se usa pequeño como símbolo del ardor (Lc 24,32), con leyenda.
- Verificación: 22 escenas × 4 momentos a 1920×1080, sin errores de consola; navegación con teclado (21 pasos, giro del cierre, pausa, retroceso) probada a 1366×768.
