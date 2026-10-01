/* Motor de secuencias autoplay · Confiar sin controlar (dirección B2)
   Cada .scene es una línea de tiempo (segundos):
     data-dur="90"            duración hasta el estado final estable
     data-ph="16:side,60:flip" fases: la escena recibe la clase ph-<nombre> a partir de ese segundo
     data-hold="70"           (opcional) la secuencia se detiene ahí hasta un clic (giro que dispara el presentador)
     data-stops="13,30,47"    segundos donde la información de un bloque ya está completa en pantalla. El clic que acelera
                              avanza SOLO hasta la siguiente parada y se queda ahí; otro clic reanuda. Obligatorio en toda
                              escena nueva: una parada justo antes de que entre el siguiente bloque (o salga algo).
   Elementos: data-t="12" aparece a los 12 s (.on); data-tx="40" sale a los 40 s (.off).
   data-k="1.2" escala todos los tiempos de la escena (ajuste rápido de duración).
   Estado en t = función pura de t → retroceder o saltar (#id@seg) reconstruye sin estados rotos. */
(() => {
  'use strict';
  const stage = document.getElementById('stage');
  const scenes = [...stage.querySelectorAll('.scene')];
  const sceneIdx = Object.fromEntries(scenes.map((s, i) => [s.id, i]));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // data-k (por escena) estira o comprime TODA la línea de tiempo de esa escena: k=1.2 → 20 % más lenta.
  const meta = scenes.map((s) => {
    const k = +s.dataset.k || 1;
    return {
      k,
      dur: (+s.dataset.dur || 60) * k,
      hold: s.dataset.hold !== undefined ? +s.dataset.hold * k : null,
      stops: (s.dataset.stops || '').split(',').filter(Boolean).map((v) => +v * k).sort((a, b) => a - b),
      ph: (s.dataset.ph || '').split(',').filter(Boolean).map((p) => { const [t, n] = p.split(':'); return [+t * k, n]; }),
      els: [...s.querySelectorAll('[data-t]')].map((el) => ({ el, t: +el.dataset.t * k, x: el.dataset.tx !== undefined ? +el.dataset.tx * k : Infinity })),
    };
  });

  let cur = -1, t = 0, playing = true, tempo = 2, released = false;
  let ff = false;            // avance rápido hacia la siguiente parada (clic mientras se anima)
  let ffTg = 0;              // destino fijo del avance rápido (se calcula una vez al empezar)
  let parked = null;         // segundo donde el avance rápido se detuvo: la escena espera un clic antes de seguir
  const FF = 9;
  const LEAVE_MS = 1800;
  const leaveTimers = new Map();

  /* escala: contenedor fijo (#vp) → cualquier proporción; en teléfono vertical el escenario gira 90° para aprovechar el largo */
  const vp = document.getElementById('vp');
  let rotated = false;
  const fit = () => {
    const w = vp.clientWidth || innerWidth, h = vp.clientHeight || innerHeight;
    rotated = false;      // nunca se gira: en vertical se ve igual, más pequeña, con la barra de flechas abajo
    const k = rotated ? Math.min(h / 1920, w / 1080) : Math.min(w / 1920, h / 1080);
    stage.style.transform = `translate(-50%, -50%) ${rotated ? 'rotate(90deg) ' : ''}scale(${k})`;
    document.body.classList.toggle('rotated', rotated);
  };
  addEventListener('resize', fit); addEventListener('orientationchange', () => setTimeout(fit, 250));
  if (window.visualViewport) window.visualViewport.addEventListener('resize', fit);
  fit();

  /* carga diferida de imágenes: solo la escena actual y las cercanas (memoria y datos en celular) */
  const imgsByScene = scenes.map((s) => [...s.querySelectorAll('img[data-src]')]);
  const loadScene = (k) => imgsByScene[k] && imgsByScene[k].forEach((im) => { if (!im.getAttribute('src')) im.setAttribute('src', im.dataset.src); });
  const unloadScene = (k) => imgsByScene[k] && imgsByScene[k].forEach((im) => { if (im.getAttribute('src')) im.removeAttribute('src'); });
  const loadAround = (i) => { for (let k = 0; k < scenes.length; k++) { if (k >= i - 1 && k <= i + 2) loadScene(k); else if (k < i - 3 || k > i + 4) unloadScene(k); } };

  /* palabras escalonadas */
  stage.querySelectorAll('.words').forEach((el) => {
    let i = 0;
    const walk = (node) => {
      for (const ch of [...node.childNodes]) {
        if (ch.nodeType === 3) {
          const frag = document.createDocumentFragment();
          for (const p of ch.textContent.split(/(\s+)/)) {
            if (!p) continue;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); continue; }
            const w = document.createElement('span'); w.className = 'w'; w.style.setProperty('--i', i++); w.textContent = p; frag.appendChild(w);
          }
          ch.replaceWith(frag);
        } else if (ch.nodeType === 1 && ch.tagName !== 'BR' && !ch.classList.contains('nosplit')) walk(ch);
      }
    };
    walk(el);
  });
  stage.querySelectorAll('[data-d]').forEach((el) => el.style.setProperty('--d', el.dataset.d + 'ms'));

  /* estado de una escena en el segundo tt (tt < 0 = vacía) */
  function apply(i, tt) {
    const m = meta[i], s = scenes[i];
    for (const [pt, n] of m.ph) s.classList.toggle('ph-' + n, tt >= pt);
    s.classList.toggle('started', tt >= 0);
    for (const e of m.els) {
      const on = tt >= e.t && tt < e.x;
      const off = tt >= e.x;
      if (e.el.classList.contains('on') !== on) e.el.classList.toggle('on', on);
      if (e.el.classList.contains('off') !== off) e.el.classList.toggle('off', off);
    }
  }

  function setTempoVar() { stage.style.setProperty('--t', String((reduce ? .35 : 1) / (tempo * (ff ? FF : 1)))); }
  setTempoVar();

  /* snap: reconstrucción instantánea */
  function snapTo(i, tt, opts = {}) {
    ff = false; parked = null; setTempoVar(); loadAround(i);
    stage.classList.add('snap');
    leaveTimers.forEach(clearTimeout); leaveTimers.clear();
    scenes.forEach((s, k) => { s.classList.toggle('is-active', k === i); s.classList.remove('is-leaving'); apply(k, k === i ? tt : -1); });
    cur = i; t = tt;
    const m = meta[i];
    released = m.hold === null || tt > m.hold || !!opts.release;
    void stage.offsetWidth; getComputedStyle(stage).opacity;
    requestAnimationFrame(() => requestAnimationFrame(() => stage.classList.remove('snap')));
    afterScene();
    if (!playing) pauseAnims(true);
  }

  function enterScene(i) {
    ff = false; parked = null; setTempoVar(); loadAround(i);
    const old = scenes[cur], nu = scenes[i], oi = cur;
    if (old && old !== nu) {
      old.classList.remove('is-active'); old.classList.add('is-leaving');
      clearTimeout(leaveTimers.get(oi));
      leaveTimers.set(oi, setTimeout(() => {
        if (cur === oi) return;
        old.classList.add('snap-local'); old.classList.remove('is-leaving'); apply(oi, -1); void old.offsetWidth; old.classList.remove('snap-local');
        leaveTimers.delete(oi);
      }, LEAVE_MS * (1 / tempo)));
    }
    clearTimeout(leaveTimers.get(i)); leaveTimers.delete(i);
    nu.classList.add('snap-local'); nu.classList.remove('is-leaving'); apply(i, -1); void nu.offsetWidth; nu.classList.remove('snap-local');
    nu.classList.add('is-active'); void nu.offsetWidth;
    cur = i; t = 0; released = meta[i].hold === null;
    if (!playing) { playing = true; pauseAnims(false); }
    apply(i, 0);
    afterScene();
  }

  /* reloj */
  let last = performance.now();
  function tick(now) {
    const dt = Math.min(.1, (now - last) / 1000); last = now;
    if (playing && cur >= 0 && parked === null) {
      const m = meta[cur];
      let nt = t + dt * tempo * (ff ? FF : 1);
      if (m.hold !== null && !released && nt >= m.hold) nt = m.hold;
      if (nt > m.dur) nt = m.dur;
      if (ff) { const tg = ffTg; if (nt >= tg) { nt = tg; ff = false; if (parksAt(m, tg)) parked = tg; setTempoVar(); } }
      if (nt !== t) { t = nt; apply(cur, t); }
    }
    progress();
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  /* navegación */
  /* siguiente parada después de tt: paradas de la escena, el giro (si aún no se dispara) y el final */
  function targetStop(m, tt) {
    const c = m.stops.filter((s) => s < m.dur);
    if (m.hold !== null && !released) c.push(m.hold);
    c.push(m.dur);
    return c.filter((s) => s > tt + .05).sort((a, b) => a - b)[0] ?? m.dur;
  }
  const parksAt = (m, tg) => tg < m.dur && !(m.hold !== null && !released && tg === m.hold);   // el giro y el final ya esperan por sí solos
  /* clic: mientras se anima, avanza rápido hasta que la información del bloque está completa y se queda ahí;
     2º clic durante el avance = salta a esa parada; en una parada, el clic reanuda a tempo normal;
     con la escena terminada, pasa a la siguiente */
  function next() {
    const m = meta[cur];
    if (parked !== null) { parked = null; if (!playing) togglePlay(false); return; }
    const tg = targetStop(m, t);
    if (t < tg - .05) {
      if (ff) { snapTo(cur, tg); if (parksAt(m, tg)) parked = tg; return; }
      if (!playing) togglePlay(false);
      ff = true; ffTg = tg; setTempoVar(); hud('▶▶');
      return;
    }
    if (m.hold !== null && !released) { released = true; return; }   // giro: el clic dispara la segunda parte
    if (cur + 1 < scenes.length) enterScene(cur + 1);
  }
  function prev() { if (cur > 0) snapTo(cur - 1, meta[cur - 1].dur, { release: true }); else snapTo(0, meta[0].dur, { release: true }); }
  function toEnd() { snapTo(cur, meta[cur].dur, { release: true }); }

  function pauseAnims(pause) {
    stage.getAnimations({ subtree: true }).forEach((a) => { try { pause ? a.pause() : a.play(); } catch (e) { /* */ } });
  }
  function togglePlay(showHud = true) {
    playing = !playing; pauseAnims(!playing);
    stage.classList.toggle('paused', !playing);
    if (showHud) hud(playing ? '▶' : '❚❚ pausa');
  }
  function setTempo(k) {
    tempo = Math.max(.5, Math.min(3, Math.round(k * 4) / 4));
    setTempoVar();
    hud(`tempo ${tempo.toFixed(2).replace(/0$/, '')}×`);
  }

  const hudEl = document.getElementById('hud');
  let hudT;
  function hud(txt) { hudEl.textContent = txt; hudEl.classList.add('show'); clearTimeout(hudT); hudT = setTimeout(() => hudEl.classList.remove('show'), 1600); }

  /* progreso de la escena: se llena de derecha a izquierda con el reloj de la secuencia
     (sigue el tempo porque t avanza con él); en la orilla izquierda la escena terminó */
  const progEl = document.getElementById('progress');
  const barScene = document.querySelector('#progress b');
  function progress() {
    if (cur < 0) return;
    const m = meta[cur];
    const f = Math.min(1, t / m.dur);
    barScene.style.width = (f * 100) + '%';
    progEl.classList.toggle('done', f >= 1);
    progEl.classList.toggle('hold', m.hold !== null && !released && t >= m.hold);
  }

  const notes = document.getElementById('notes');
  const NOTES = window.DECK_NOTES || {};
  function afterScene() {
    const id = scenes[cur].id;
    if (location.hash.replace(/@.*/, '') !== '#' + id || /@/.test(location.hash)) history.replaceState(null, '', '#' + id);
    notes.innerHTML = `<h4>${cur + 1}/${scenes.length} · ${scenes[cur].dataset.title || id} · ${Math.round(meta[cur].dur)} s${meta[cur].hold !== null ? ' · pausa de giro en ' + meta[cur].hold + ' s' : ''}</h4>${NOTES[id] || ''}`;
    document.dispatchEvent(new CustomEvent('scene', { detail: { id, i: cur } }));
  }

  function parseHash() {
    const h = decodeURIComponent(location.hash.replace(/^#/, ''));
    if (!h) return null;
    const [a, sec] = h.split('@');
    let i = sceneIdx[a];
    if (i === undefined && /^\d+$/.test(a)) i = Math.max(1, Math.min(scenes.length, +a)) - 1;
    if (i === undefined) return null;
    return { i, sec: sec === undefined ? null : (sec === 'end' ? meta[i].dur : Math.max(0, Math.min(meta[i].dur, +sec || 0))) };
  }

  addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key;
    if (['ArrowRight', 'PageDown', 'Enter', 'ArrowDown'].includes(k)) { e.preventDefault(); next(); }
    else if (['ArrowLeft', 'PageUp', 'ArrowUp', 'Backspace'].includes(k)) { e.preventDefault(); prev(); }
    else if (k === ' ') { e.preventDefault(); togglePlay(); }
    else if (k === '.') { e.preventDefault(); toEnd(); }
    else if (k === '+' || k === '=') setTempo(tempo + .25);
    else if (k === '-' || k === '_') setTempo(tempo - .25);
    else if (k === 'Home') snapTo(0, 0);
    else if (k === 'f' || k === 'F') { if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {}); else document.exitFullscreen?.(); }
    else if (k === 'n' || k === 'N') document.body.classList.toggle('show-notes');
    else if (k === 'b' || k === 'B') document.body.classList.toggle('blackout');
  });
  /* táctil: tocar = avanzar/acelerar; deslizar = siguiente (izquierda o arriba si está girado) o anterior */
  let tx = 0, ty = 0, tt0 = 0, swiped = 0;
  addEventListener('touchstart', (e) => { const t = e.changedTouches[0]; tx = t.clientX; ty = t.clientY; tt0 = Date.now(); }, { passive: true });
  addEventListener('touchend', (e) => {
    const t = e.changedTouches[0], dx = t.clientX - tx, dy = t.clientY - ty;
    const d = rotated ? dy : dx, o = rotated ? dx : dy;
    if (Math.abs(d) > 55 && Math.abs(d) > 1.5 * Math.abs(o) && Date.now() - tt0 < 900) { swiped = Date.now(); if (d > 0) prev(); else next(); }
  }, { passive: true });
  addEventListener('click', (e) => { if (Date.now() - swiped < 500) return; if (!e.target.closest('#notes') && !e.target.closest('.pm-nav')) next(); });
  addEventListener('contextmenu', (e) => { e.preventDefault(); prev(); });
  addEventListener('hashchange', () => {
    const p = parseHash(); if (!p) return;
    if (p.sec !== null) { if (playing) togglePlay(false); snapTo(p.i, p.sec, { release: p.sec > (meta[p.i].hold ?? Infinity) }); }
    else if (p.i !== cur) enterScene(p.i);
  });

  let idleT;
  const wake = () => { document.body.classList.remove('idle'); clearTimeout(idleT); idleT = setTimeout(() => document.body.classList.add('idle'), 1500); };
  addEventListener('mousemove', wake); wake();

  /* polvo de oro ambiental */
  const dust = document.getElementById('dust');
  if (dust && !reduce && getComputedStyle(dust).display !== 'none') {
    const ctx = dust.getContext('2d'); dust.width = 1920; dust.height = 1080;
    let seed = 11; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const P = Array.from({ length: 60 }, () => ({ x: rnd() * 1920, y: rnd() * 1080, r: .6 + rnd() * 2, v: .05 + rnd() * .18, p: rnd() * 6.28 }));
    const draw = (now) => {
      if (playing) {
        ctx.clearRect(0, 0, 1920, 1080);
        for (const q of P) {
          q.y -= q.v * tempo; q.x += Math.sin(now / 3200 + q.p) * .12;
          if (q.y < -10) { q.y = 1090; q.x = rnd() * 1920; }
          ctx.beginPath(); ctx.arc(q.x, q.y, q.r, 0, 6.283);
          ctx.fillStyle = `rgba(255,214,140,${.2 + .3 * (0.5 + 0.5 * Math.sin(now / 1100 + q.p * 3))})`; ctx.fill();
        }
      }
      requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  }

  const boot = () => {
    const p = parseHash();
    if (p && p.sec !== null) { playing = false; stage.classList.add('paused'); snapTo(p.i, p.sec, { release: p.sec > (meta[p.i].hold ?? Infinity) }); }
    else { cur = -1; enterScene(p ? p.i : 0); }
  };
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(boot);

  window.DECK = {
    next, prev, toEnd, snapTo: (id, s) => snapTo(sceneIdx[id] ?? id, s), togglePlay, setTempo,
    get state() { return { scene: scenes[cur]?.id, i: cur, t, dur: meta[cur]?.dur, playing, tempo, released, parked }; },
    scenes: scenes.map((s, i) => [s.id, meta[i].dur, meta[i].hold, meta[i].els.map((e) => e.t).concat(meta[i].ph.map((p) => p[0]))]),
  };
})();
