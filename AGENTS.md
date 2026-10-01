# Instrucciones para este repositorio

Antes de crear o editar una presentación, lee `ESTANDAR.md`. Este repositorio es una colección de presentaciones HTML para exponer en pantalla, con un guion Markdown por entrega.

- El número de entrega es secuencial: `01/`, `02/`, `03/`. La URL pública es `https://praulio.github.io/ppt/NN/`.
- Cuando Rogelio pegue un chat completo, úsalo como insumo y registra las decisiones publicables en `NN/BRIEF.md`; no subas la conversación íntegra a este repo público salvo indicación explícita. Conviértelo en 21 láminas, un guion de exposición y ocho imágenes horizontales originales. No inventes citas, hechos históricos ni referencias.
- Diseña para que se lea en una pantalla de 42 pulgadas. Acorta el texto visible antes de reducir la tipografía; traslada detalles al guion o a las notas.
- Investiga referencias artísticas y fuentes del tema. Documenta decisiones visuales y procedencia en `NN/ARTE.md`.
- Comprueba las 21 láminas, las ocho imágenes, la navegación, el encuadre, la legibilidad y la URL pública. Actualiza también el índice y `README.md`.
- Conserva las entregas anteriores y sus enlaces. Si una instrucción nueva de Rogelio cambia el estándar, prevalece su indicación.
- **Decks en motion (desde 03): un clic reproduce una PANTALLA completa, no cada pieza.** Una pantalla es todo lo que aparece junto antes de que otro contenido lo reemplace (`data-tx`) o cambie de lámina. El clic que acelera avanza hasta el final de esa pantalla y se queda ahí; el siguiente clic reanuda y, si hace falta, otro acelera la siguiente pantalla; con la escena terminada pasa a la siguiente. Se marca con `data-stops="seg,..."` en cada `<section class="scene">`: SOLO un punto justo antes de cada reemplazo de contenido. Si todo se acumula sin reemplazarse, la escena no lleva `data-stops` y un clic la completa. Nunca poner paradas por cada frase, chip o tarjeta que aparece (eso obligaba a muchos clics). No cambiar animaciones, tempo ni estilo. Probar con un script de clics que cada pantalla se complete con un solo clic.
