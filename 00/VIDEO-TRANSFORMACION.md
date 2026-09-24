# Hijo pródigo · transición Pepe → Rogelio

Estado: **fotogramas preparados, video no generado ni validado**. La escena original de Pepe sigue publicada en la lámina 19; el fotograma humano es un asset de producción, no una lámina activa. No se cambia el orden de la presentación aquí.

## Entradas, en este orden

1. **Start frame:** [`assets/remaster-19.jpg`](assets/remaster-19.jpg), la pintura original de Pepe abrazado por el padre. No modificarla.
2. **End frame:** [`assets/remaster-19-human.jpg`](assets/remaster-19-human.jpg), misma composición con Rogelio como hijo.

Ambas imágenes miden **1672 × 941 px**, proporción horizontal aproximada 16:9. Usar el modo **First + Last Frame / Frames to Video** si está disponible en la versión de OmniFlash activa. No cargarlas como dos Ingredients independientes: eso no fija los extremos de la toma. Si solo hay Start Frame, detenerse y revisar el modo, no prometer un final idéntico.

## Intención de dirección

Una sola idea visible: el hijo, mientras es acogido por el padre, deja de ser Pepe y aparece Rogelio. La cámara queda fija porque ambos fotogramas comparten escala y encuadre. El padre, la túnica roja, las manos, la escalera, la vasija, la luz cálida y el espacio oscuro a la izquierda deben permanecer estables. El cambio ocurre **en el hijo**, no en toda la escena.

## Prompt para OmniFlash

```text
One continuous six-second shot, using the supplied first and last frames as exact visual endpoints. The camera is completely locked: no pan, zoom, orbit, dolly, crop change, or cut. Preserve the same Baroque oil painting, the elderly father in the red robe, his head and both hands, the kneeling son's body position and scale, the stone steps, clay jar, warm light from the upper right, and the deep dark space on the left.

0–1 s: hold the first painting nearly still; the father embraces Pepe, the prodigal son. Only subtle breathing and living oil-paint texture.
1–4.5 s: within that uninterrupted embrace, change only the kneeling son's frog features into the human son shown in the last frame. The green face, visible hand and foot gradually become human skin, dark hair with gray at the temple, moustache and short beard. The son's head stays tucked in the exact same place beneath the father's chin; his black clothing and kneeling silhouette do not shift. The father never releases him.
4.5–6 s: hold on the supplied human last frame, same embrace and exact composition. The transformation feels like mercy and rebirth, not comedy or a flashy spell.

Maintain hand-painted brushstrokes on every face and surface. No photorealistic face, no costume change, no extra person or limb, no duplicate head, no distorted hands, no dissolving father, no moving background, no glowing particles, no text, no subtitles, no music, no speech.
```

## Revisión del resultado

- Primer y último cuadro: comparar con los archivos de entrada; el último debe mostrar a Rogelio dentro del abrazo original, no en otra pose.
- Durante el cambio: padre, manos, ropa, escalera, vasija y luz no deben saltar, duplicarse ni disolverse.
- El rostro humano debe seguir siendo **pintura**, no un recorte fotográfico.
- Revisar el clip completo antes de integrarlo al HTML. Un prompt no demuestra que el modelo haya respetado la geometría o los tiempos.

La estructura de dirección sigue el skill `wan3-creative-director` y su skill común `creative-video-director` del repo Content Machine, con el modo de dos fotogramas de `google-omni-flow`. No se ejecutó Wan ni OmniFlash ni se gastaron créditos en esta entrega.
