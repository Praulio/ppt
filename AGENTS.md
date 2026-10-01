# Instrucciones para este repositorio

Antes de crear o editar una presentación, lee `ESTANDAR.md`. Este repositorio es una colección de presentaciones HTML para exponer en pantalla, con un guion Markdown por entrega.

- El número de entrega es secuencial: `01/`, `02/`, `03/`. La URL pública es `https://praulio.github.io/ppt/NN/`.
- Cuando Rogelio pegue un chat completo, úsalo como insumo y registra las decisiones publicables en `NN/BRIEF.md`; no subas la conversación íntegra a este repo público salvo indicación explícita. Conviértelo en 21 láminas, un guion de exposición y ocho imágenes horizontales originales. No inventes citas, hechos históricos ni referencias.
- Diseña para que se lea en una pantalla de 42 pulgadas. Acorta el texto visible antes de reducir la tipografía; traslada detalles al guion o a las notas.
- Investiga referencias artísticas y fuentes del tema. Documenta decisiones visuales y procedencia en `NN/ARTE.md`.
- Comprueba las 21 láminas, las ocho imágenes, la navegación, el encuadre, la legibilidad y la URL pública. Actualiza también el índice y `README.md`.
- Conserva las entregas anteriores y sus enlaces. Si una instrucción nueva de Rogelio cambia el estándar, prevalece su indicación.
- **Decks en motion (desde 03): el clic acelera por bloque de información, nunca por escena completa.** Toda `<section class="scene">` lleva `data-stops="seg,seg,..."` con los segundos donde la información de un bloque ya está completa en pantalla (justo antes de que entre el siguiente bloque o salga algo, respetando `data-tx`). El motor (`NN/js/deck.js`) acelera hasta la siguiente parada, se queda ahí y espera un clic; el siguiente clic reanuda a tempo normal; con la escena terminada pasa a la siguiente. Sin `data-stops` el clic salta toda la escena y Rogelio no puede detenerse a hablar en medio. Probar con un script de clics que cada parada se alcance y se respete (ver `03/index.html`). No cambiar animaciones, tempo ni estilo al agregarlas.
