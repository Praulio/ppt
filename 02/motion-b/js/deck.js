/* Motor de beats · Confiar sin controlar (dirección B)
   - Cada .scene declara data-beats. Los elementos con data-b="k" aparecen en el beat k (clase .on)
     y, con data-x="m", salen en el beat m (clase .off). La escena recibe clases acumulativas b0..bk.
   - Avanzar con una animación en curso la completa (Web Animations: finish()).
   - Retroceder o saltar por hash reconstruye el estado de forma instantánea (snap). */
(() => {
  'use strict';
  const stage = document.getElementById('stage');
  const scenes = [...stage.querySelectorAll('.scene')];
  const beatsOf = (s) => Math.max(1, +s.dataset.beats || 1);
  const flat = [];
  scenes.forEach((s, i) => { for (let b = 0; b < beatsOf(s); b++) flat.push([i, b]); });
  const gIndex = (si, b) => flat.findIndex(([s, bb]) => s === si && bb === b);
  let cur = { s: -1, b: -1 };
  const LEAVE_MS = 1300;
  const leaveTimers = new Map();

  /* ---------- escala del escenario ---------- */
  function fit() {
    const k = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    stage.style.transform = `translate(-50%, -50%) scale(${k})`;
  }
  window.addEventListener('resize', fit); fit();

  /* ---------- palabras escalonadas ---------- */
  function splitWords(el) {
    let i = +(el.dataset.i0 || 0);
    const walk = (node) => {
      for (const ch of [...node.childNodes]) {
        if (ch.nodeType === 3) {
          const parts = ch.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          for (const p of parts) {
            if (!p) continue;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); continue; }
            const w = document.createElement('span');
            w.className = 'w'; w.style.setProperty('--i', i++); w.textContent = p;
            frag.appendChild(w);
          }
          ch.replaceWith(frag);
        } else if (ch.nodeType === 1 && !ch.classList.contains('nosplit') && ch.tagName !== 'BR') {
          walk(ch);
        }
      }
    };
    walk(el);
  }
  stage.querySelectorAll('.words').forEach(splitWords);
  stage.querySelectorAll('[data-d]').forEach((el) => el.style.setProperty('--d', el.dataset.d + 'ms'));

  /* ---------- estado de una escena ---------- */
  function applyScene(sEl, b) {
    for (let k = 0; k < 10; k++) sEl.classList.toggle('b' + k, b >= 0 && k <= b);
    sEl.dataset.beat = b;
    sEl.querySelectorAll('[data-b]').forEach((el) => {
      const inB = +el.dataset.b;
      const hasX = el.dataset.x !== undefined;
      const out = hasX && b >= +el.dataset.x;
      el.classList.toggle('on', b >= inB && !out);
      el.classList.toggle('off', b >= inB && out);
    });
  }

  /* ---------- objetos viajeros (llave, orbe, cáliz, vela, serpiente) ---------- */
  const OBJ = window.DECK_OBJECTS || {};
  const objLayer = document.getElementById('objects');
  const objEls = {};
  const sceneIdx = Object.fromEntries(scenes.map((s, i) => [s.id, i]));
  for (const [name, def] of Object.entries(OBJ)) {
    const d = document.createElement('div');
    d.className = 'obj' + (def.glow ? ' glow' : '');
    d.style.width = def.w + 'px';
    d.innerHTML = `<img src="${def.src}" alt="">`;
    objLayer.appendChild(d);
    objEls[name] = d;
    def._keys = def.keys.map(([sid, b, st]) => [gIndex(sceneIdx[sid], b), st]).sort((a, b) => a[0] - b[0]);
  }
  function placeObjects(g) {
    for (const [name, def] of Object.entries(OBJ)) {
      let st = null;
      for (const [gi, s] of def._keys) { if (gi <= g) st = s; else break; }
      const el = objEls[name];
      if (!st) { el.style.opacity = 0; continue; }
      const w = def.w, h = def.h || def.w;
      el.style.transform = `translate(${st.x - w / 2}px, ${st.y - h / 2}px) rotate(${st.r || 0}deg) scale(${st.s ?? 1})`;
      el.style.opacity = st.o ?? 1;
      el.style.filter = st.f || '';
      el.style.zIndex = st.z || '';
    }
  }

  /* ---------- navegación ---------- */
  const progress = document.querySelector('#progress i');
  const notes = document.getElementById('notes');
  const NOTES = window.DECK_NOTES || {};

  function snapTo(si, b) {
    stage.classList.add('snap');
    scenes.forEach((s, i) => {
      s.classList.toggle('is-active', i === si);
      s.classList.remove('is-leaving');
      applyScene(s, i === si ? b : -1);
    });
    leaveTimers.forEach((t) => clearTimeout(t)); leaveTimers.clear();
    cur = { s: si, b };
    after();
    void stage.offsetWidth; getComputedStyle(stage).opacity;
    requestAnimationFrame(() => requestAnimationFrame(() => stage.classList.remove('snap')));
  }

  function enterScene(si) {
    const old = scenes[cur.s];
    const nu = scenes[si];
    if (old && old !== nu) {
      old.classList.remove('is-active'); old.classList.add('is-leaving');
      const oi = cur.s;
      clearTimeout(leaveTimers.get(oi));
      leaveTimers.set(oi, setTimeout(() => {
        if (cur.s === oi) return;
        old.classList.add('snap-local');
        old.classList.remove('is-leaving');
        applyScene(old, -1);
        void old.offsetWidth;
        old.classList.remove('snap-local');
        leaveTimers.delete(oi);
      }, LEAVE_MS));
    }
    // la escena entrante parte de su estado vacío
    clearTimeout(leaveTimers.get(si)); leaveTimers.delete(si);
    nu.classList.add('snap-local'); nu.classList.remove('is-leaving'); applyScene(nu, -1); void nu.offsetWidth; nu.classList.remove('snap-local');
    nu.classList.add('is-active');
    void nu.offsetWidth;
    applyScene(nu, 0);
    cur = { s: si, b: 0 };
    after();
  }

  function step(b) { applyScene(scenes[cur.s], b); cur.b = b; after(); }

  function after() {
    const g = gIndex(cur.s, cur.b);
    placeObjects(g);
    progress.style.width = ((g + 1) / flat.length * 100) + '%';
    const id = scenes[cur.s].id;
    const h = `#${id}.${cur.b}`;
    if (location.hash !== h) history.replaceState(null, '', h);
    renderNotes();
    document.dispatchEvent(new CustomEvent('beat', { detail: { scene: id, beat: cur.b, g } }));
  }

  function running() {
    return stage.getAnimations({ subtree: true }).filter((a) => {
      if (a.playState !== 'running') return false;
      const t = a.effect && a.effect.getComputedTiming ? a.effect.getComputedTiming() : null;
      return t && Number.isFinite(t.endTime);
    });
  }

  function next() {
    const run = running();
    if (run.length) { run.forEach((a) => { try { a.finish(); } catch (e) { /* noop */ } }); return; }
    const s = scenes[cur.s];
    if (cur.b + 1 < beatsOf(s)) step(cur.b + 1);
    else if (cur.s + 1 < scenes.length) enterScene(cur.s + 1);
  }
  function prev() {
    if (cur.b > 0) snapTo(cur.s, cur.b - 1);
    else if (cur.s > 0) snapTo(cur.s - 1, beatsOf(scenes[cur.s - 1]) - 1);
  }

  function parseHash() {
    const h = decodeURIComponent(location.hash.replace(/^#/, ''));
    if (!h) return null;
    const [a, bb] = h.split('.');
    let si = sceneIdx[a];
    if (si === undefined && /^\d+$/.test(a)) si = Math.min(scenes.length, Math.max(1, +a)) - 1;
    if (si === undefined) return null;
    let b = bb === undefined || bb === '' ? 0 : (bb === 'end' ? beatsOf(scenes[si]) - 1 : +bb);
    b = Math.max(0, Math.min(beatsOf(scenes[si]) - 1, b || 0));
    return [si, b];
  }

  function renderNotes() {
    const s = scenes[cur.s];
    const n = NOTES[s.id] || '';
    const g = gIndex(cur.s, cur.b);
    notes.innerHTML = `<h4>${cur.s + 1}/${scenes.length} · ${s.dataset.title || s.id} · beat ${cur.b + 1}/${beatsOf(s)} · global ${g + 1}/${flat.length}</h4>${n}`;
  }

  /* ---------- entrada ---------- */
  window.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key;
    if (['ArrowRight', 'PageDown', ' ', 'Enter', 'ArrowDown'].includes(k)) { e.preventDefault(); next(); }
    else if (['ArrowLeft', 'PageUp', 'ArrowUp', 'Backspace'].includes(k)) { e.preventDefault(); prev(); }
    else if (k === 'Home') { e.preventDefault(); snapTo(0, 0); }
    else if (k === 'End') { e.preventDefault(); snapTo(scenes.length - 1, beatsOf(scenes[scenes.length - 1]) - 1); }
    else if (k === 'f' || k === 'F') { toggleFS(); }
    else if (k === 'n' || k === 'N') { document.body.classList.toggle('show-notes'); }
    else if (k === 'b' || k === 'B' || k === '.') { document.body.classList.toggle('blackout'); }
  });
  window.addEventListener('click', (e) => {
    if (e.target.closest('#notes')) return;
    if (e.shiftKey) prev(); else next();
  });
  window.addEventListener('contextmenu', (e) => { e.preventDefault(); prev(); });
  window.addEventListener('hashchange', () => { const p = parseHash(); if (p && (p[0] !== cur.s || p[1] !== cur.b)) snapTo(p[0], p[1]); });

  function toggleFS() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen?.();
  }

  let idleT;
  const wake = () => { document.body.classList.remove('idle'); clearTimeout(idleT); idleT = setTimeout(() => document.body.classList.add('idle'), 1500); };
  window.addEventListener('mousemove', wake); wake();

  /* ---------- polvo de oro ambiental (no es estado; sólo atmósfera) ---------- */
  const dust = document.getElementById('dust');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (dust && !reduce) {
    const ctx = dust.getContext('2d');
    dust.width = 1920; dust.height = 1080;
    let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const P = Array.from({ length: 70 }, () => ({ x: rnd() * 1920, y: rnd() * 1080, r: .6 + rnd() * 2.2, v: .08 + rnd() * .25, p: rnd() * 6.28 }));
    const tick = (t) => {
      ctx.clearRect(0, 0, 1920, 1080);
      for (const q of P) {
        q.y -= q.v; q.x += Math.sin(t / 3000 + q.p) * .15;
        if (q.y < -10) { q.y = 1090; q.x = rnd() * 1920; }
        const a = .25 + .35 * (0.5 + 0.5 * Math.sin(t / 900 + q.p * 3));
        ctx.beginPath(); ctx.arc(q.x, q.y, q.r, 0, 6.283);
        ctx.fillStyle = `rgba(255,214,140,${a})`; ctx.fill();
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- arranque ---------- */
  const start = parseHash();
  const boot = () => {
    if (start) snapTo(start[0], start[1]);
    else { cur = { s: -1, b: -1 }; enterScene(0); }
    document.documentElement.classList.add('ready');
  };
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(boot);

  window.DECK = { next, prev, snapTo, get state() { return { ...cur, g: gIndex(cur.s, cur.b), total: flat.length }; }, scenes: scenes.map((s) => [s.id, beatsOf(s)]), running };
})();
