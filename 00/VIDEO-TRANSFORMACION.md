# Hijo pródigo · transición Pepe → Rogelio

Estado: **fotogramas preparados, video no generado ni validado**. La escena original de Pepe sigue publicada en la lámina 19; el fotograma humano es un asset de producción, no una lámina activa. No se cambia el orden de la presentación aquí.

## Entradas, en este orden

1. **Start frame:** [`assets/remaster-19.jpg`](assets/remaster-19.jpg), la pintura original de Pepe abrazado por el padre. No modificarla.
2. **End frame:** [`assets/remaster-19-human.jpg`](assets/remaster-19-human.jpg), misma composición con Rogelio como hijo.

Ambas imágenes miden **1672 × 941 px**, proporción horizontal aproximada 16:9. Usar el modo **First + Last Frame / Frames to Video** si está disponible en la versión de OmniFlash activa. No cargarlas como dos Ingredients independientes: eso no fija los extremos de la toma. Si solo hay Start Frame, detenerse y revisar el modo, no prometer un final idéntico.

## Intención de dirección

Una sola idea visible en **4 segundos**: al apretar el abrazo, una onda de pintura nace bajo la mano del padre y recorre solo al hijo; Pepe se convierte en Rogelio dentro de la misma silueta. La cámara queda fija porque ambos fotogramas comparten escala y encuadre. El padre, la túnica roja, las manos, la escalera, la vasija, la luz cálida y el espacio oscuro a la izquierda permanecen estables. Es un morphing continuo de forma y material, no un fundido entre dos imágenes.

## Prompt para OmniFlash

```text
Four seconds, one unbroken shot. Use the supplied Pepe painting as the exact first frame and the human painting as the exact last frame. The camera and the father's embrace stay locked.

As the father gently tightens his hand on the son's shoulder, a subtle wave of living oil pigment travels through the kneeling son. His green frog face continuously reshapes into the human face in the last frame; the visible green hand and foot become human in the same flowing motion. This is a true in-place morph of form and painted material, not a dissolve, crossfade, face swap or sudden jump. His head stays under the father's chin, and his black clothing and body silhouette remain aligned. Let the transformation finish by 3 seconds, then hold the human end frame for the final second.

Keep the original painting's quiet matte finish, muted warm browns and soft contrast. The father, his red robe and hands, stone steps, clay jar, light and background do not transform. No camera move, cut, extra limbs, particles, glow, glossy texture, photographic face, text, music or speech.
```

## Revisión del resultado

- Primer y último cuadro: comparar con los archivos de entrada; el último debe mostrar a Rogelio dentro del abrazo original, no en otra pose.
- Durante el cambio: padre, manos, ropa, escalera, vasija y luz no deben saltar, duplicarse ni disolverse.
- El rostro humano debe seguir siendo **pintura**, no un recorte fotográfico.
- Revisar el clip completo antes de integrarlo al HTML. Un prompt no demuestra que el modelo haya respetado la geometría o los tiempos.

La estructura de dirección sigue el skill `wan3-creative-director` y su skill común `creative-video-director` del repo Content Machine, con el modo de dos fotogramas de `google-omni-flow`. No se ejecutó Wan ni OmniFlash ni se gastaron créditos en esta entrega.
