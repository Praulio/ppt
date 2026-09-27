# Dirección B2 · «Libro de horas visionario» en secuencias

Misma estética que `motion-b/` (Blake, Redon, Hilma af Klint, iconos con pan de oro, libro de horas) y mismas fuentes. Referencias investigadas, paleta, tipografías y prompts de los 17 assets: ver `../motion-b/DIRECCION.md`. Esta versión reutiliza esos assets y no genera arte nuevo. Se descartaron 6 imágenes de estilo «cuento pintado» que ya se habían generado, por corrección de Rogelio; se guardan en `_gen/descartados-principito/`.

## Mecánica nueva

- **Un clic = un concepto.** Cada escena es una línea de tiempo que se reproduce sola y despacio:
  - entrada;
  - pistas espaciadas cada 5–14 s;
  - transformaciones: lo que apareció primero se borra, gira o se desplaza cuando el concepto lo pide;
  - estado final estable hasta el siguiente clic.
- Nunca queda congelada: la cámara deriva despacio sobre las pinturas, el oro respira, las velas parpadean y hay polvo de oro. Espacio pausa todo, incluso esto.
- **Pistas, no párrafos.** Palabras clave y frases breves de 42 px o más (títulos de 84–150 px). Las fuentes aparecen discretas en pantalla (29 px) y completas en las notas (N).
- **Giros:** dos escenas tienen un punto de espera que dispara Rogelio con un clic:
  - «El deseo y la entrega»: el clic dispara el «no / sí» de Benedicto XVI.
  - «Cierre»: el clic dispara la oración.

  Si da clic antes de llegar al punto de espera, salta a él y la segunda parte arranca.

### Controles

| Tecla | Acción |
|---|---|
| → · clic · PageDown · Enter | Siguiente escena (transición suave de 1,7 s, aunque la actual no haya terminado); en un giro, lo dispara |
| ← · PageUp · clic derecho | Escena anterior, en su estado final (determinista) |
| Espacio | Pausa / reanuda la secuencia |
| . | Salta al estado final de la escena actual |
| + / − | Tempo global de 0,5× a 2× (indicador discreto que se oculta) |
| N · F · B | Notas · pantalla completa · pantalla negra |
| `#escena` · `#escena@seg` · `#escena@end` | Enlace directo: `@seg` deja la escena congelada en ese segundo (útil para verificar; Espacio reanuda) |

La línea de progreso inferior muestra el avance global en dorado tenue y el avance de la secuencia actual como un tramo más brillante.

### Cómo ajustar duraciones

En `index.html`, cada `<section>` tiene:
- `data-dur`: segundos hasta el estado final.
- `data-t` / `data-tx` en cada pista: segundo en que aparece o sale.
- `data-ph`: fases de transformación (`segundo:nombre`).
- `data-hold`: punto de espera de un giro.

Para estirar o comprimir toda una escena sin tocar cada pista, basta con añadir `data-k="0.8"` (20 % más rápida) o `data-k="1.25"` en la `<section>`. El tempo global (+/−) se aplica encima.

## Escenas (20 secuencias · 21 clics · ≈ 19 min de secuencias a tempo 1×)

| # | Escena (id) | Dur. | Pistas que aparecen (segundo) |
|---|---|---|---|
| 1 | Portada (`portada`) | 40 s | Pintura del hilo y el orbe · título en oro (2,5) · «¿Busco a Dios… o una manera de garantizar lo que deseo?» (12) · mapa: Edén, Getsemaní, Lisieux (24–31) |
| 2 | Querer que todo salga bien (`deseo`) | 62 s | Orbe · «es profundamente humano» (6) · medallones salud, amor, seguridad y sentido (9–21) · «explicación, práctica, promesa…» (27) · la llave cae del cielo al centro (38) y cuatro hilos rojos lo atan todo (39–42) · «Si conozco la clave…» (paráfrasis, 43) · la frase anterior se transforma en «¿Confianza… o un control más sofisticado?» (53) |
| 3 | El primer jardín (`eden`) | 68 s | El tondo del Edén se abre al centro y, a los 12 s, se desplaza a la derecha · título · Gn 3,1 textual (16) · se reemplaza por «¿Y si Dios te está ocultando algo bueno?» (paráfrasis, 31) · «El don de Dios… se recibe como regalo» (45) gira a «…parece una prohibición celosa» (50) · «No ofrece destrucción: siembra sospecha» (60) |
| 4 | La grieta (`grieta`) | 64 s | Lámina de oro del CEC 397 · se agrieta sobre «confianza» (12) · «primero la sospecha → después el fruto» (22–29; se borra a los 40) · «sin Dios / antes que Dios / no según Dios» (41–49, CEC 398) · «…y busco asegurar mi bien por mi cuenta» (56) |
| 5 | La historia al revés (`reves`) | 56 s | El tondo del Edén se voltea como moneda (5) y muestra la relectura gnóstica · *Hipóstasis*: «la instructora» (12), «por celos» (19) · Ireneo I,30 (28) · «No todo gnosticismo contó el jardín igual» (40) |
| 6 | Dos lecturas (`lecturas`) | 48 s | Díptico con la serpiente en espiral · tres filas comparadas (8–26) · «Misma escena: cambia quién parece digno de confianza» (31) · se sustituye por «¿Recibo mi vida de Dios… o descubro una clave?» con la llave (41) |
| 7 | La promesa cambia de idioma (`idioma`) | 70 s | La misma promesa (paráfrasis) con la llave · Gnosis (12) · Teosofía 1875 (20) · Nueva Era (28) · *The Secret* 2006 (36) · la fuente vaticana (21–50) · hilos de cada estación a la promesa (46) · «No es una línea recta…» (50) · «Escucha qué promete…» (60) |
| 8 | La receta espiritual (`receta`) | 58 s | Llave → llama → orbe (5–16) · «No hablo de toda meditación…» (25) · la receta se borra (36) y se reemplaza por «Técnica / Relación» (37–41) · «¿Escucho a Alguien… o aplico una técnica?» (49) |
| 9 | *The Secret* (`secret`) | 58 s | Espejo inundado · su página oficial (trad. libre; «propuesta del autor · no comprobada», 7–22) · pensar distinto → decisiones (23), frente a pensamiento → circunstancias (30) · el agua sube (40) · «vigilar cada temor por miedo a atraerlo» (45) |
| 10 | Tres lenguajes (`tres`) | 46 s | Arcos que se dibujan · *The Secret* (7) · Dispenza (15; «presentación editorial, no demostración») · metafísica esotérica, Conny Méndez (23) · «¿Qué espero que produzca mi práctica interior?» (33) |
| 11 | También dicen «suelta» (`suelta`) | 66 s | Manos y puerta · intención + emoción → entregar el «cómo» (8–14) · se tacha «ellos controlan, nosotros soltamos» (23) · el hilo se enciende (37): el cómo se suelta (41), el desenlace sigue atado (45) · «Suelta el cómo. Conserva el resultado» (síntesis, 51) · «¿entrego también el desenlace?» (59) |
| 12 | ¿Qué entrego? (`entrego`) | 58 s | Llave (el cómo) y orbe (el desenlace) · mandorla «en manos de Dios» (7) · «¿Mi futuro… o sólo la manera?» (14) · la llave viaja a la mandorla (22) mientras el orbe queda atado (28) · «Suelto detalles… y sigo exigiendo un resultado» (35) · el trato con sello de lacre (paráfrasis, 47) |
| 13 | El segundo jardín (`getsemani`) | 56 s | Pintura con halo que late · pide compañía, siente, ruega (Mc 14, 10–24) · sus amigos duermen (33) · las citas se borran y queda «La confianza empieza dentro del miedo» (43) |
| 14 | El deseo y la entrega (`caliz`) · **giro** | 68 s (espera en 42) | El cáliz baja desde la luz · el deseo (9) · la entrega (16, Mc 14,36) · «No borra el deseo: lo entrega» (26) · «¡Levantaos, vamos!» (35) · *[clic]* · **no** (46) / **sí** (53) de Benedicto XVI (textual, 2012) |
| 15 | Dos jardines (`jardines`) | 50 s | Dos tondos · quiasmo de color: abundancia/desconfianza frente a angustia/confianza (8–19) · «La comodidad no garantiza. La angustia no descalifica.» (27) · «Mi emoción no es la medida completa de mi fe» (41) |
| 16 | Teresita, 1896 (`teresita`) | 54 s | Pintura de la celda · 1888 (10) · Jueves Santo de 1896: sangre (18) · al principio, alegría (28) · después, prueba de la fe (38) |
| 17 | Cuando el cielo se oscurece (`noche`) | 58 s | Firmamento y vela · la oscuridad sube (14) · «No sólo perdía la salud» (10) / «Dejaba de sentir cercano el cielo» (18) · «las más densas tinieblas» (Ms C 5vº en CLC 25, 31) · «prueba contra la fe» (39) · «No abandonó la fe: describió un combate» (49) |
| 18 | Creer sin consuelo → el cáliz de Teresita (`canto`) | 70 s | La vela · Ms C 7vº textual, verso a verso hasta «lo que quiero creer» (8–25) · «No es una técnica para recuperar el consuelo» (33) · transformación (40): la vela se aparta y regresa el cáliz de Getsemaní · Carta 197 (paráfrasis, 48) · «La confianza, y nada más que la confianza…» (CLC 1, 57) · «No exige entusiasmo por sufrir» (64) |
| 19 | La pregunta (`pregunta`) | 50 s | Mano y cuerda · «¿Qué espero que Dios me garantice?» · dos preguntas (14, 26) · silencio: las preguntas se van y la pintura se acerca (40) |
| 20 | Cierre (`cierre`) · **giro** | 52 s (espera en 36) | Tres medallones: la sospecha, la entrega, la fidelidad · «Confiar no es aprender la fórmula» (15) · «…seguir viviendo como hijo» (21) · el alba cubre todo (30) · «Vivir como hijo, aun sin controlar el final» · *[clic]* · oración (38) · Amén (45) |

Rigor: se conservan las etiquetas «paráfrasis», «trad. libre» y «síntesis», las citas verificadas (vatican.va, CEC, Benedicto XVI 2012, *C'est la confiance*) y la advertencia sobre la genealogía y sobre «no todo gnosticismo». Las fuentes completas están en las notas (N, `js/notes.js`).

## Archivos

- `index.html`: 20 secuencias.
- `css/deck.css`: base y tiempos lentos.
- `css/scenes.css`: fases por escena.
- `js/deck.js`: motor de líneas de tiempo.
- `js/notes.js`: notas del presentador.
- `assets/`: los 17 assets de motion-b más las fuentes.

## Verificación (27 sep 2026, Chrome headless)

| Prueba | Resultado |
|---|---|
| Capturas: 4 momentos por escena a 1920×1080 | 80 capturas, 0 errores de consola o de red → `_review/contact.jpg` (4 columnas × 20 filas, en orden de tiempo) |
| Estados finales a 1366×768 | 20 capturas, 0 errores |
| Autoplay | El tiempo avanza solo; tempo 1,5× mide 1,5 s/s; se limita a 0,5× y 2× |
| Espacio | Congela el tiempo (Δt = 0 en 1,5 s) y reanuda |
| «.» | Deja t = duración |
| Recorrido con → | 20/20 escenas en 21 clics (19 cambios de escena más 2 giros); los giros se liberan al clic |
| ← | Arranca la escena anterior en su estado final; el estado DOM es idéntico al del enlace `#pregunta@50` |
| Clips de ritmo (15 fps, 960×540) | `_review/clips/eden.mp4` (74 s), `suelta.mp4` (72 s), `canto.mp4` (76 s), revisados cuadro a cuadro cada 3 s |

Scripts de verificación en `_gen/`:
- `capture.mjs`
- `navtest.mjs`
- `rec.mjs`
