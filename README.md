# PPT · presentaciones para exponer

Colección de presentaciones HTML de Rogelio. El índice público vive en `https://praulio.github.io/ppt/`. Cada entrega tiene un número permanente y una dirección fácil de escribir:

| Nº | Presentación | Fecha | Enlace |
| --- | --- | --- | --- |
| 01 | Dinero, ego y verdad | 2026-09-15 | `https://praulio.github.io/ppt/01/` |
| 02 | Confiar sin controlar | 2026-09-23 | `https://praulio.github.io/ppt/02/` |

## Estructura

```text
index.html           Índice público
ESTANDAR.md          Reglas editoriales, visuales y de publicación
AGENTS.md            Instrucciones breves para futuras sesiones de Codex
01/
  BRIEF.md           Decisiones editoriales extraídas del chat
  index.html         Presentación de 21 láminas
  GUION.md           Texto para exponer, lámina por lámina
  ARTE.md            Dirección visual, imágenes y referencias
  assets/             Ocho imágenes horizontales originales
02/                 Presentación «Confiar sin controlar», con la misma estructura
03/                 Próxima presentación, cuando exista un nuevo chat
```

## Cómo pedir la siguiente

Pega el chat completo de contexto y di: «Haz la siguiente presentación siguiendo `ESTANDAR.md`». El chat sirve como insumo; en el repo público quedará el `BRIEF.md` de la nueva entrega con las ideas y decisiones necesarias para reproducir la presentación, sin publicar por defecto la conversación íntegra. El número siguiente se toma del último directorio publicado. El título y la fecha aparecen en este índice, de modo que el enlace sigue siendo corto.

## Para presentar

Abre `/01/` o `/02/`. Usa `→` y `←` para avanzar o retroceder, `F` para pantalla completa y `N` para las notas del presentador. El guion completo está en `NN/GUION.md`. Cada presentación funciona como sitio estático: no necesita cuenta, servidor de aplicación ni dependencias al abrirla en GitHub Pages.

## Publicación

GitHub Pages publica la rama `main` desde la raíz del repo. Al terminar una entrega, se actualiza el índice, se comprueba en navegador a 1920×1080 y 1366×768, se hace `git push` y se verifica la URL pública del número nuevo. El push por sí solo no confirma que la página se pueda presentar.
